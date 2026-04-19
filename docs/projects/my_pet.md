# com-chr (슬라임 펫) - 프로젝트 포트폴리오

## 프로젝트 소개

**Windows 작업표시줄 위에 사는 사이버틱 슬라임 데스크톱 펫 애플리케이션**

화면 하단을 돌아다니며, 먹이를 주고 쓰다듬고 놀아줄 수 있는 다마고치 스타일의 데스크톱 반려 슬라임입니다. 무한 레벨 성장 시스템, 감정 표현, 대사 시스템, 멀티 모니터 지원까지 갖춘 완성도 높은 Electron 기반 데스크톱 앱입니다.

- **버전**: v1.0.10
- **라이선스**: MIT
- **개발 기간**: 2026년 4월 ~
- **배포**: GitHub Releases (NSIS 인스톨러 + 자동 업데이트)

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| **Framework** | Electron 33 + React 18 |
| **Language** | TypeScript (strict mode) |
| **Build** | electron-vite + electron-builder |
| **Package Manager** | pnpm |
| **Styling** | Tailwind CSS v4 |
| **State Management** | Zustand (persist middleware) |
| **Data Persistence** | electron-store + localStorage 이중 저장 |
| **Auto Update** | electron-updater (GitHub Releases) |
| **Testing** | Jest + ts-jest (커버리지 90% 목표) |
| **CI/CD** | GitHub Actions (Windows 빌드 + ZIP 릴리스) |

---

## 아키텍처

### 4-Stack 구조

프로젝트를 4개의 기술 스택으로 분리하여 관심사를 명확히 구분했습니다.

```
┌─────────────────────────────────────────────────────┐
│                    Stack A: Electron Main            │
│  30fps 이동 엔진 · 윈도우 관리 · 시스템 트레이 · IPC │
│                    (src/main/)                       │
├──────────────────────┬──────────────────────────────┤
│   Stack B: UI/Anim   │     Stack C: State Engine     │
│  스프라이트 렌더링    │  Zustand 스토어 · 스탯 감소   │
│  대사 버블 · 이펙트   │  레벨업 · 감정 계산           │
│  (components/, hooks/)│  (store/, engine/)            │
├──────────────────────┴──────────────────────────────┤
│              Stack D: Test & QA                      │
│        Jest 테스트 스위트 · 커버리지 검증              │
│                 (src/__tests__/)                      │
└─────────────────────────────────────────────────────┘
```

### IPC 통신 흐름

```
Main Process                          Renderer Process
┌──────────────┐   movement:update    ┌──────────────┐
│  Movement    │ ──── 30fps ────────> │  Pet.tsx      │
│  Engine      │                      │  (스프라이트)  │
│              │ <── pet:force-jump ── │              │
│              │ <── pet:drag-start ── │              │
│              │ <── pet:interaction ─ │              │
├──────────────┤                      ├──────────────┤
│  Persistence │ <── pet:save-state ── │  petStore    │
│  (e-store)   │ ── pet:load-state ─> │  (Zustand)   │
├──────────────┤                      ├──────────────┤
│  Tray Menu   │ ── pet:do-feed ────> │  SpeechBubble│
│              │ ── pet:do-play ────> │              │
│              │ ── pet:do-clean ───> │              │
└──────────────┘                      └──────────────┘
         ↑ contextBridge (preload) ↑
         │    contextIsolation: true   │
```

---

## 핵심 기능

### 1. 30fps 이동 엔진 (Main Process)

메인 프로세스에서 `setInterval` 기반 30fps 게임 루프를 운영합니다. 렌더러가 아닌 메인 프로세스에서 물리를 처리하여 IPC 지연으로 인한 이동 떨림을 방지했습니다.

- **11가지 이동 상태**: idle, walking, jumping, dragging, falling, landing, petting, eating, sad, happy, sleeping
- **물리 시뮬레이션**: 중력, 속도 가속, 착지 충격
- **멀티 모니터 대응**: 모니터 간 경계 자동 전환, 모니터별 작업표시줄 높이 계산
- **디스플레이 변화 감지**: 모니터 추가/제거/DPI 변경 시 자동 재계산
- **전원 관리**: 절전 모드 복귀 시 z-order 및 위치 복원

### 2. 스프라이트 애니메이션 시스템 (Renderer)

CSS `steps()` 기반 10종의 스프라이트 시트 애니메이션을 구현했습니다.

| 애니메이션 | 프레임 | 재생 시간 | 반복 |
|-----------|--------|----------|------|
| Idle/Walk | 4프레임 | 600ms | 무한 |
| Jump | 6프레임 | 830ms | 1회 |
| Fall | 3프레임 | 500ms | 무한 |
| Landing | 4프레임 | 400ms | 1회 |
| Petting | 4프레임 | 1.2s | 1회 |
| Eating | 5프레임 | 2.4s | 1회 |
| Sad | 4프레임 | 1.6s | 무한 |
| Happy | 4프레임 | 800ms | 무한 |
| Sleeping | 5프레임 | 2.5s | 무한 |

- 모든 스프라이트에 `image-rendering: pixelated` 적용 (레트로 픽셀 감성 유지)
- 비반복 애니메이션은 React `key` prop으로 강제 리마운트하여 CSS 애니메이션 재시작

### 3. 인터랙션 시스템

사용자의 마우스 제스처를 감지하여 다양한 상호작용을 제공합니다.

- **드래그 앤 드롭**: 3px 임계값 감지, 잡기 포즈 → 자유 낙하 → 착지 충격
- **흔들기 감지**: 드래그 중 좌우 진동 패턴 감지 (방향 전환 카운트)
- **쓰다듬기**: 3회 이상 반대 방향 마우스 이동 = 쓰다듬기 인식
- **클릭 찌그러짐**: 단일 클릭 시 시각적 스쿼시 효과
- **더블 클릭 점프**: 강제 점프 트리거
- **우클릭 메뉴**: 먹이주기, 놀아주기, 씻기기, 종료 (액션별 5초 쿨다운)

### 4. 다마고치 상태 엔진

Zustand 기반 상태 관리로 6개 코어 스탯을 시뮬레이션합니다.

```
스탯 구성:
- 허기(hunger): 0-100, 10초마다 -0.5 (약 33분에 0)
- 행복(happiness): 0-100, 10초마다 -0.2 (약 83분에 0)
- 청결(cleanliness): 0-100, 10초마다 -0.3 (약 55분에 0)
- 경험치(exp): 레벨업 공식 = 15 × level × (level+1)
- 레벨(level): 무한 (상한 없음)
- 마지막 틱 시간(lastTickTime)

감정 연쇄 효과:
- 허기 < 30 → 행복 추가 감소
- 청결 < 30 → 행복 추가 감소
- 감정 상태가 이동 패턴에 반영 (무드 모디파이어)

경험치 배율:
- 평균 스탯 ≥ 70: 2배
- 평균 스탯 ≥ 40: 1배
- 평균 스탯 ≥ 20: 0.3배
- 평균 스탯 < 20: 0배 (성장 정지)
```

### 5. 대사 시스템

200개 이상의 조건부 대사 라인을 보유한 동적 대화 시스템입니다.

- **듀얼 슬롯 버블**: 랜덤 잡담 + 인터랙션 반응 동시 표시
- **레벨 게이팅**: 레벨에 따라 해금되는 대사
- **감정 가중치**: 현재 감정 상태에 따른 가중 랜덤 선택
- **페이드 아웃 애니메이션**: 자연스러운 소멸 효과
- **동적 위치 조정**: 이전 버블 위에 자동 스택

### 6. 이중 영속성 (Dual Persistence)

데이터 유실을 방지하기 위한 2단계 저장 전략을 사용합니다.

```
즉시 저장 (localStorage)         백업 저장 (electron-store)
  ↓ Zustand persist              ↓ 30초 간격
  ↓ 모든 상태 변경 시              ↓ IPC로 메인 프로세스에 전송
  ↓ 즉각 반영                     ↓ 크래시/강제 종료 대비
```

- 앱 종료 후 재시작 시 스탯이 소급 감소하지 않음 (오프라인 동결)
- `lastTickTime` 리셋으로 장기 미접속 페널티 방지

### 7. 레벨업 이펙트

레벨업 시 홀로그래픽 링 + 파티클 버스트 애니메이션이 재생됩니다.

- 2개의 확장 링 애니메이션
- 방사형 파티클 분산
- 글로우 텍스트 효과

### 8. 시각적 피드백

- **BinaryParticles**: 청결도 하락/흔들기 시 바이너리 데이터 파티클이 떠오르는 효과
- **DirtOverlay**: Canvas 기반 오염도 시각 표현 (파티클 누적)
- **스탯 디스플레이**: 호버 시 Lv/EXP/허기/행복/청결 오버레이

---

## 기술적 도전과 해결

### 1. 투명 윈도우 + 클릭 관통

**문제**: 투명 프레임리스 윈도우에서 슬라임 영역만 클릭 가능하게 하되, 투명 영역은 아래 윈도우로 클릭이 통과해야 함.

**해결**: `win.setIgnoreMouseEvents(true/false)` 동적 전환. 렌더러에서 마우스 위치 기반으로 히트 영역 판별 후 IPC로 메인 프로세스에 클릭 관통 여부 전달.

### 2. 멀티 모니터 작업표시줄 대응

**문제**: 모니터마다 작업표시줄 높이와 위치가 다르며, 슬라임이 모니터 경계를 넘을 때 정확한 앵커 Y 좌표가 필요함.

**해결**: `getEffectiveAnchorY()` 함수로 모니터별 안전 마진(6-48px) 계산. 디스플레이 변경 이벤트 구독으로 실시간 재계산.

### 3. 전원 복귀 시 윈도우 상태

**문제**: Windows 절전 모드 복귀 후 투명 윈도우가 다른 창 아래로 숨거나 위치가 어긋남.

**해결**: `powerMonitor.on('resume')` 이벤트에서 z-order 복원 및 위치 재계산. 지연 실행으로 시스템 안정화 후 처리.

### 4. 스프라이트 애니메이션 재시작

**문제**: CSS `steps()` 애니메이션은 DOM 요소가 유지되면 재시작이 불가능. 같은 애니메이션을 연속으로 트리거할 수 없음.

**해결**: React `key` prop에 애니메이션 모드를 포함시켜 모드 변경 시 강제 리마운트. CSS 애니메이션이 초기 상태에서 자동 재시작.

### 5. 오프라인 스탯 감소 방지

**문제**: 앱을 오래 꺼두면 재시작 시 경과 시간만큼 스탯이 일괄 감소하여 즉사.

**해결**: `lastTickTime`을 앱 시작 시 현재 시간으로 리셋. 오프라인 시간을 무시하여 공정한 게임플레이 보장.

---

## 프로젝트 규모

| 구분 | 코드 라인 수 | 파일 수 |
|------|------------|--------|
| Electron Main Process | 899 | 7 |
| Preload | 90 | 2 |
| Renderer Components | 1,250 | 5 |
| State Store / Engine | 201 | 3 |
| Type Definitions | 61 | 1 |
| **소스 코드 합계** | **2,501** | **18** |
| 테스트 코드 | 1,483 | 5 |
| **전체 합계** | **3,984** | **23** |

- **스프라이트 시트**: 10종 (총 2.4MB)
- **테스트 커버리지 목표**: 90% (branches, functions, lines)
- **릴리스 버전**: 9회 (v1.0.2 ~ v1.0.10)

---

## CI/CD 파이프라인

```
Git Tag Push (v*) → GitHub Actions (Windows Latest)
  ├── Checkout → pnpm 10.26.2 → Node.js 20
  ├── pnpm install (frozen-lockfile)
  ├── electron-vite build → electron-builder --win
  ├── ZIP 패키징
  └── GitHub Release 발행 (ZIP 첨부)
```

- **트리거**: `v*` 패턴의 Git 태그 푸시
- **아티팩트**: NSIS 인스톨러 + ZIP
- **자동 업데이트**: electron-updater가 4시간 간격으로 GitHub Releases 확인

---

## 프로젝트 구조

```
com-chr/
├── src/
│   ├── main/                    # Electron Main Process
│   │   ├── index.ts             # 앱 라이프사이클
│   │   ├── window.ts            # 투명 프레임리스 윈도우
│   │   ├── movement.ts          # 30fps 이동 엔진 (핵심)
│   │   ├── ipc.ts               # IPC 채널 핸들러
│   │   ├── persistence.ts       # electron-store 영속성
│   │   ├── tray.ts              # 시스템 트레이
│   │   └── updater.ts           # 자동 업데이트
│   ├── preload/
│   │   ├── index.ts             # Context Bridge API
│   │   └── index.d.ts           # 타입 정의
│   └── renderer/src/
│       ├── components/
│       │   ├── Pet.tsx           # 스프라이트 애니메이션
│       │   ├── SpeechBubble.tsx  # 대사 시스템
│       │   ├── BinaryParticles.tsx
│       │   ├── DirtOverlay.tsx
│       │   └── LevelUpEffect.tsx
│       ├── store/
│       │   └── petStore.ts      # Zustand 상태 관리
│       ├── engine/
│       │   └── stateTick.ts     # 스탯 감소 틱
│       ├── types/
│       │   └── pet.ts           # 공유 타입
│       └── assets/sprites/      # 스프라이트 시트 10종
├── docs/                        # 아키텍처 문서
├── .github/workflows/           # CI/CD
└── electron-builder.yml         # 패키징 설정
```

---

## 향후 계획

- **진화 시스템**: 슬라임 → 비트 → 스피릿 단계별 변신
- **미니게임**: 펫과 함께하는 인터랙티브 게임
- **사운드**: 효과음 및 배경 음악
- **커스터마이징**: 색상, 패턴, 액세서리
- **Framer Motion 통합**: 복잡한 파티클/모션 이펙트
