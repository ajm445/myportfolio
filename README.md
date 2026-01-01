# 지민이의 보물창고 - 포트폴리오

React + TypeScript + Vite로 제작된 개인 포트폴리오 웹사이트입니다.

## 🚀 배포 주소
- **프로덕션**: [Netlify 배포 주소]

## 🛠️ 기술 스택
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Google Analytics 4 (방문자 분석)

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 📊 Google Analytics 4 설정

이 포트폴리오는 방문자 분석을 위해 Google Analytics 4를 사용합니다.

### 환경 변수 설정

1. `.env` 파일 생성 (로컬 개발용)
   ```env
   VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. Netlify 환경 변수 설정 (배포용)
   - Site settings → Environment variables
   - Key: `VITE_GA4_MEASUREMENT_ID`
   - Value: `G-XXXXXXXXXX` (본인의 측정 ID)

**상세한 설정 방법은 [GA4_SETUP.md](./GA4_SETUP.md) 참조**

### 수집되는 데이터

- ✅ 방문자 수 및 페이지뷰
- ✅ 체류 시간 및 이탈률
- ✅ 지역/디바이스 정보
- ✅ 프로젝트 클릭 이벤트
- ✅ 연락처 클릭 이벤트
- ✅ UI 상호작용 (다크모드, 네비게이션)

## 🎨 프로젝트 소개
AI와 웹 풀스택 개발에 열정을 가진 개발자 안지민의 포트폴리오입니다.

