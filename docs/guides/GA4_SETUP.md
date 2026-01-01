# 📊 Google Analytics 4 (GA4) 설정 가이드

이 포트폴리오는 Google Analytics 4를 통해 방문자 분석 기능을 제공합니다.

## 🚀 빠른 시작

### 1단계: Google Analytics 계정 생성

1. [Google Analytics](https://analytics.google.com/) 접속
2. "측정 시작" 버튼 클릭
3. 계정 이름 입력 (예: "포트폴리오")
4. "다음" 클릭

### 2단계: 속성 만들기

1. 속성 이름 입력 (예: "MinHyuk Portfolio")
2. 보고 시간대: "대한민국"
3. 통화: "대한민국 원 (₩)"
4. "다음" 클릭

### 3단계: 비즈니스 정보 입력

1. 업종: 적절한 카테고리 선택
2. 비즈니스 규모: "소규모" 선택
3. "만들기" 클릭

### 4단계: 데이터 스트림 설정

1. "웹" 플랫폼 선택
2. 웹사이트 URL 입력 (예: `https://minhyuk-portfolio.netlify.app`)
3. 스트림 이름 입력 (예: "포트폴리오 웹사이트")
4. "스트림 만들기" 클릭

### 5단계: 측정 ID 복사

1. 스트림 세부정보 페이지에서 **측정 ID** 확인
   - 형식: `G-XXXXXXXXXX`
2. 측정 ID를 복사합니다

### 6단계: 환경 변수 설정

#### 로컬 개발 환경

1. 프로젝트 루트의 `.env` 파일 열기
2. 측정 ID 입력:
   ```env
   VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

#### Netlify 배포 환경

1. Netlify 대시보드 접속
2. 해당 사이트 선택
3. "Site settings" → "Environment variables" 메뉴
4. "Add a variable" 클릭
5. 변수 추가:
   - **Key**: `VITE_GA4_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX` (본인의 측정 ID)
   - **Scopes**: Production, Deploy previews, Branch deploys 모두 체크
6. "Create variable" 클릭
7. 사이트 재배포 (Deploys → Trigger deploy → Deploy site)

## 📈 수집되는 데이터

### 자동 수집 데이터
- ✅ 페이지뷰 (방문자 수)
- ✅ 세션 시간 (체류 시간)
- ✅ 지리적 위치 (국가, 도시)
- ✅ 디바이스 정보 (모바일/데스크톱)
- ✅ 브라우저 정보
- ✅ 화면 해상도
- ✅ 유입 경로 (검색엔진, 직접 방문 등)

### 커스텀 이벤트 추적
- 🎯 **프로젝트 상호작용**
  - 프로젝트 상세 보기 클릭
  - 라이브 데모 클릭
  - GitHub 링크 클릭
  - 문서 링크 클릭

- 📞 **연락처 상호작용**
  - 이메일 클릭
  - 전화번호 클릭
  - LinkedIn 클릭
  - GitHub 클릭

- 🎨 **UI 상호작용**
  - 다크모드 토글
  - 네비게이션 클릭

## 🔍 데이터 확인 방법

### 실시간 데이터 확인
1. [Google Analytics](https://analytics.google.com/) 로그인
2. 해당 속성 선택
3. 왼쪽 메뉴 → "실시간" 클릭
4. 현재 사이트 방문자 실시간 확인

### 보고서 확인
1. **획득 보고서**: 방문자 유입 경로 분석
2. **참여도 보고서**: 페이지별 조회수, 체류 시간
3. **인구통계 보고서**: 방문자 지역, 연령, 성별
4. **기술 보고서**: 디바이스, 브라우저 정보
5. **이벤트 보고서**: 커스텀 이벤트 추적 데이터

## 🛠️ 개발 시 주의사항

### 로컬 개발 시 GA4 비활성화
`.env` 파일에서 측정 ID를 비워두면 GA4가 비활성화됩니다:
```env
VITE_GA4_MEASUREMENT_ID=
```

### 브라우저 확장 프로그램
광고 차단기나 프라이버시 확장 프로그램이 GA4를 차단할 수 있습니다. 테스트 시 이러한 확장 프로그램을 비활성화하세요.

## 🔒 프라이버시 설정

이 포트폴리오는 다음과 같은 프라이버시 보호 설정을 적용했습니다:

- ✅ **IP 익명화**: 방문자 IP 주소 익명화
- ✅ **쿠키 보안**: `SameSite=None;Secure` 플래그 적용
- ✅ **개인정보 미수집**: 이름, 이메일 등 개인 식별 정보 수집 안 함

## 📚 추가 리소스

- [Google Analytics 공식 문서](https://support.google.com/analytics)
- [GA4 시작 가이드](https://support.google.com/analytics/answer/9304153)
- [react-ga4 라이브러리](https://github.com/codler/react-ga4)

## 🆘 문제 해결

### GA4가 작동하지 않는 경우

1. **환경 변수 확인**
   ```bash
   # .env 파일에 측정 ID가 올바르게 설정되어 있는지 확인
   cat .env
   ```

2. **브라우저 콘솔 확인**
   - F12 → Console 탭
   - "Google Analytics 초기화 완료" 메시지 확인

3. **Netlify 환경 변수 확인**
   - Netlify 대시보드에서 환경 변수가 올바르게 설정되어 있는지 확인
   - 설정 후 반드시 재배포 필요

4. **광고 차단기 비활성화**
   - uBlock Origin, AdBlock 등 비활성화 후 테스트

5. **실시간 보고서 확인**
   - Google Analytics → 실시간 → 현재 활성 사용자 확인
   - 데이터가 표시되기까지 최대 24시간 소요될 수 있음

---

**설정이 완료되었다면 이제 포트폴리오의 방문자 데이터를 실시간으로 확인할 수 있습니다! 🎉**
