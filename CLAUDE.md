# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 프로젝트 개요

이 프로젝트는 **React 19 + TypeScript + Vite**로 구축된 개인 포트폴리오 웹사이트입니다. **Apple Design System**을 모티브로 한 모던하고 인터랙티브한 단일 페이지 애플리케이션입니다.

## 🗄️ Supabase 백엔드

- **Project ID**: `tvbpgddjvnhmhegchfpc`
- **Project URL**: https://tvbpgddjvnhmhegchfpc.supabase.co
- **용도**: 비디오 스토리지, 분석 데이터 등

## 🚀 개발 명령어

### 일반적인 개발 명령어
```bash
# 개발 서버 시작 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 앱 미리보기
npm run preview

# ESLint를 사용한 코드 린팅
npm run lint
```

### 빌드 최적화
프로젝트는 성능 최적화를 위해 청크 분할이 설정되어 있습니다:
- `vendor`: React 핵심 라이브러리
- `animations`: Framer Motion, GSAP
- `ui`: Lucide React, React Type Animation

## 🏗️ 아키텍처 및 구조

### 핵심 기술 스택
- **React 19**: 최신 React 버전 사용
- **TypeScript**: 엄격한 타입 안전성 (`strict: true`)
- **Framer Motion**: 고급 애니메이션과 제스처 처리
- **GSAP**: 복잡한 타임라인 애니메이션
- **Tailwind CSS**: Apple 디자인 시스템 기반 커스텀 색상 팔레트
- **Lucide React**: 모던한 아이콘 세트

### 컴포넌트 아키텍처
```
src/
├── components/        # 페이지 섹션 컴포넌트
│   ├── Header.tsx    # 네비게이션과 다크모드 토글
│   ├── Hero.tsx      # 메인 히어로 섹션
│   ├── About.tsx     # 소개 섹션
│   ├── Skills.tsx    # 기술 스택 섹션
│   ├── Projects.tsx  # 프로젝트 쇼케이스
│   ├── Contact.tsx   # 연락처 정보
│   └── Footer.tsx    # 푸터
├── hooks/
│   └── useScrollProgress.ts  # 스크롤 진행률 훅
└── App.tsx           # 메인 앱 컴포넌트
```

### 스타일링 시스템
**Apple Design System** 기반으로 구축되었으며 다음 특징을 가집니다:
- **다크/라이트 모드**: 시스템 설정 자동 감지
- **Apple 색상 팔레트**: `apple-dark`, `apple-light`, `apple-blue` 등
- **SF Pro 폰트**: Apple 시스템 폰트 스택
- **유동 애니메이션**: `fade-in`, `slide-up`, `float` 키프레임

### 애니메이션 시스템
이 프로젝트는 두 가지 애니메이션 라이브러리를 전략적으로 사용합니다:

1. **Framer Motion**: React 컴포넌트 애니메이션
   - 스크롤 진행률 추적 (`useScroll`, `useSpring`)
   - 컴포넌트 진입/퇴장 애니메이션
   - 제스처 기반 상호작용

2. **GSAP**: 복잡한 타임라인과 고성능 애니메이션
   - 세밀한 애니메이션 제어가 필요한 경우

### 상태 관리 패턴
- **React Hooks**: `useState`, `useEffect`를 활용한 로컬 상태 관리
- **다크모드**: 시스템 환경설정과 동기화
- **스크롤 추적**: 커스텀 훅으로 스크롤 진행률 관리

## 📱 반응형 디자인 패턴

모바일 퍼스트 접근 방식으로 설계되었습니다:
- **Breakpoints**: Tailwind CSS 기본 브레이크포인트 사용
- **Flexible Layout**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` 패턴
- **모바일 최적화**: 터치 친화적인 버튼 크기와 간격

## 🎨 디자인 시스템 가이드라인

### 색상 사용 패턴
```css
/* 메인 배경 */
bg-apple-light dark:bg-apple-dark

/* 텍스트 색상 */
text-apple-gray-900 dark:text-apple-gray-100

/* 액센트 색상 */
bg-apple-blue (메인 브랜드 색상)
```

### 애니메이션 사용 가이드라인
- **진입 애니메이션**: `initial={{ opacity: 0, y: 50 }}` 패턴 사용
- **호버 효과**: `whileHover={{ scale: 1.05 }}` 등 미묘한 변화
- **전환 시간**: `duration: 0.8` (적당한 속도감)

## 🔧 TypeScript 설정

엄격한 TypeScript 설정을 사용합니다:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

모든 새로운 컴포넌트는 적절한 타입 정의를 포함해야 합니다.

## 📦 번들 최적화

Vite 설정에서 성능 최적화를 위한 청크 분할이 구성되어 있습니다:
- 자주 변경되지 않는 vendor 라이브러리들은 별도 청크로 분리
- 애니메이션과 UI 라이브러리도 각각 분리하여 캐싱 효율성 향상

## 🎯 개발 시 주의사항

### 컴포넌트 개발 패턴
1. **함수형 컴포넌트**: 클래스 컴포넌트 사용 금지
2. **타입 안전성**: 모든 props와 상태에 타입 정의 필수
3. **Apple 디자인**: 미니멀하고 깔끔한 디자인 언어 유지
4. **성능 고려**: 불필요한 리렌더링 방지를 위한 최적화

### 애니메이션 개발 가이드
- 과도한 애니메이션 지양 (Apple의 미니멀한 철학 준수)
- 사용자 경험을 방해하지 않는 자연스러운 전환
- 성능을 고려한 애니메이션 속성 사용 (transform, opacity 우선)

### 접근성 고려사항
- 다크모드 토글에 적절한 ARIA 레이블 제공
- 키보드 네비게이션 지원
- 충분한 색상 대비 유지

---

## 📋 현재 프로젝트 현황

### 등록된 프로젝트 (7개)

#### 주요 프로젝트 (featured: true)
1. **Sensor Game Hub** - 센서 기반 게임 플랫폼
   - 기술: Node.js, Socket.IO, Express.js, OpenAI API, Anthropic API, pgvector, Device Motion API, Railway

2. **Convi** - 편의점 종합 솔루션
   - 기술: React 19, TypeScript, Supabase, TailwindCSS, 토스페이먼츠, Supabase Realtime, Render

3. **VerseUp** - 메타버스 학습 플랫폼
   - 기술: React 19, Three.js, React Three Fiber, Rapier, Socket.IO, WebRTC, Node.js, Express, Supabase, 토스페이먼츠, Zustand, TanStack Query

4. **워킹홀리데이 가계부** - 워킹홀리데이 재정 관리 웹앱
   - 기술: React 19, TypeScript, Vite, Supabase, Tailwind CSS, Recharts, Google OAuth, ExchangeRate API, Vitest, Playwright

5. **막아라! 무너트려라!** - 실시간 멀티플레이어 웹 게임 (RTS + RPG)
   - 기술: React 19, TypeScript, Vite, Canvas 2D API, Zustand, Node.js, Express, WebSocket (ws), Supabase, JWT, Tailwind CSS, Recharts
   - 배포: https://makmu.kr

#### 기타 프로젝트 (featured: false)
6. **Budget Tracker** - 가계부 앱 (워킹홀리데이 가계부에서 파생)
   - 기술: React Native, Expo, TypeScript, Supabase, Zustand, TanStack Query, expo-router

7. **MSA Analyzer** - MSA 아키텍처 분리 AI 분석 서비스
   - 기술: React 19, Vite 7, Tailwind CSS 4, shadcn/ui, React Flow, Node.js 20, Express.js 4, Supabase, pgvector, Claude API, Voyage AI

### 스킬 카테고리 (4개)
- **Frontend**: React, TypeScript, JavaScript, HTML/CSS, Tailwind CSS, Zustand, Framer Motion
- **Backend**: Node.js, Express.js, Supabase, PostgreSQL, Socket.IO, WebSocket, JWT, RESTful API
- **AI & Tools**: OpenAI API, Anthropic API, Git, Vite, Recharts, Device APIs
- **Advanced**: Canvas 2D API, Three.js, React Native, Expo, WebRTC, Turborepo, pgvector

---

## 📁 문서 구조

```
docs/
├── projects_sample.tsx          # 프로젝트 샘플 코드
├── projects/
│   ├── budget-tracker.md        # Budget Tracker 프로젝트 문서
│   ├── defence-game.md          # 막아라! 무너트려라! 프로젝트 문서
│   ├── metavers_aducation.md    # VerseUp 프로젝트 문서
│   └── working.md               # 워킹홀리데이 가계부 문서
└── guides/
    ├── GA4_SETUP.md             # Google Analytics 설정 가이드
    ├── INTERVIEW_QUESTIONS.md   # 면접 질문 정리
    ├── MEDIA_GUIDE.md           # 미디어 가이드
    └── PORTFOLIO.md             # 포트폴리오 가이드
```

---

## 🎯 작업 참고사항

### 새로운 프로젝트 추가 시
1. `src/components/Projects.tsx`의 `projects` 배열에 새 객체 추가
2. 고유한 ID 부여 (현재 최대 ID: 7)
3. 필수 필드: `id`, `title`, `subtitle`, `description`, `image`, `technologies`, `features`, `achievements`, `github`, `demo`, `featured`
4. `featured: true`는 주요 프로젝트, `featured: false`는 기타 프로젝트
5. 이미지는 `/public/` 폴더에 저장 후 경로 참조

### 새로운 스킬 추가 시
1. `src/components/Skills.tsx`의 해당 카테고리 `skills` 배열에 추가
2. 필수 필드: `name`, `icon` (이모지)
3. 카테고리: `frontend`, `backend`, `ai`, `advanced` 중 선택

### 디자인 일관성 유지
- Apple Design System 컬러 팔레트 사용 (`apple-blue`, `apple-gray-*` 등)
- 과도한 애니메이션 지양, 미니멀한 인터랙션 선호
- 모든 새 컴포넌트는 다크모드 지원 필수
- TypeScript 타입 정의 필수