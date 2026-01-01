# 워킹홀리데이 가계부 - 프로젝트 분석 문서

## 프로젝트 개요

일본 워킹홀리데이를 준비하고 있거나 진행 중인 사용자를 위한 전문 가계부 웹 애플리케이션입니다. 실시간 환율 정보, 다중 통화 지원, 초기비용 계산기 등 워킹홀리데이 특화 기능을 제공합니다.

---

## 기술 스택

### 핵심 프레임워크
| 기술 | 버전 | 용도 |
|------|------|------|
| React | 19.1.1 | UI 프레임워크 |
| TypeScript | 5.8.3 | 정적 타입 언어 |
| Vite | 7.1.7 | 빌드 도구 및 개발 서버 |
| Tailwind CSS | 3.3.0 | 유틸리티 기반 CSS 프레임워크 |

### 백엔드 및 데이터베이스
| 기술 | 버전 | 용도 |
|------|------|------|
| Supabase | 2.75.1 | BaaS (인증, DB, 실시간) |
| PostgreSQL | - | Supabase 기반 데이터베이스 |

### 주요 라이브러리
| 라이브러리 | 버전 | 용도 |
|------------|------|------|
| react-router-dom | 7.9.4 | 클라이언트 사이드 라우팅 |
| recharts | 3.2.1 | 차트 및 데이터 시각화 |
| axios | 1.12.2 | HTTP 클라이언트 (환율 API) |
| react-hot-toast | 2.6.0 | 알림 토스트 |
| lucide-react | 0.555.0 | 아이콘 라이브러리 |
| clsx | 2.0.0 | 조건부 CSS 클래스 관리 |
| react-ga4 | 2.1.0 | Google Analytics 4 연동 |

### 개발 도구
| 도구 | 버전 | 용도 |
|------|------|------|
| ESLint | 9.36.0 | 코드 린팅 |
| Prettier | 3.0.0 | 코드 포맷팅 |
| Vitest | 4.0.9 | 단위 테스트 |
| Playwright | 1.56.1 | E2E 테스트 |
| terser | 5.44.1 | JavaScript 압축 |

---

## 디렉토리 구조

```
src/
├── App.tsx                    # 메인 앱 컴포넌트 (라우팅, Provider 설정)
├── MainApp.tsx                # 메인 애플리케이션 로직
├── main.tsx                   # React 앱 진입점
├── index.css                  # 글로벌 스타일 및 Tailwind CSS
│
├── components/                # 재사용 가능한 컴포넌트
│   ├── Auth/                  # 인증 관련 컴포넌트
│   │   ├── LoginPage.tsx          # 로그인/회원가입 페이지
│   │   ├── AuthCallback.tsx       # OAuth 콜백 처리
│   │   ├── AccountManagementModal.tsx  # 계정 관리 모달
│   │   └── ProtectedRoute.tsx     # 보호된 라우트 (미사용)
│   │
│   ├── Dashboard/             # 대시보드 컴포넌트
│   │   ├── Dashboard.tsx          # 메인 대시보드
│   │   ├── BalanceCard.tsx        # 잔액 카드
│   │   ├── CurrencySelector.tsx   # 통화 선택기
│   │   └── CurrentTimeDisplay.tsx # 현재 시간 표시
│   │
│   ├── Calendar/              # 캘린더 컴포넌트
│   │   ├── TransactionCalendar.tsx  # 메인 캘린더
│   │   ├── CalendarHeader.tsx       # 월 네비게이션
│   │   ├── CalendarGrid.tsx         # 캘린더 그리드
│   │   ├── CalendarDay.tsx          # 개별 날짜 셀
│   │   ├── DayDetailModal.tsx       # 날짜 상세 모달
│   │   ├── SelectedDaySummary.tsx   # 선택 날짜 요약
│   │   └── YearMonthPicker.tsx      # 연월 선택기
│   │
│   ├── Statistics/            # 통계 컴포넌트
│   │   ├── StatisticsDashboard.tsx  # 통계 대시보드
│   │   ├── MonthlyTrendChart.tsx    # 월별 트렌드 차트
│   │   ├── CategoryPieChart.tsx     # 카테고리 파이 차트
│   │   └── WeekdayBarChart.tsx      # 요일별 바 차트
│   │
│   ├── TransactionForm/       # 거래 폼 컴포넌트
│   │   ├── TransactionForm.tsx      # 거래 입력 폼
│   │   └── TransactionFormModal.tsx # 거래 입력 모달
│   │
│   ├── TransactionList/       # 거래 목록 컴포넌트
│   │   ├── TransactionList.tsx      # 거래 목록
│   │   ├── TransactionItem.tsx      # 개별 거래 항목
│   │   └── TransactionSearch.tsx    # 거래 검색
│   │
│   ├── InitialCostCalculator/ # 초기비용 계산기
│   │   ├── InitialCostCalculator.tsx    # 메인 계산기
│   │   ├── JapanRegionSelector.tsx      # 도쿄/오사카 선택
│   │   ├── JapanCostCategoryCard.tsx    # 일본 비용 카테고리
│   │   └── JapanCostSummary.tsx         # 일본 비용 요약
│   │
│   ├── RecurringExpenses/     # 고정지출 컴포넌트
│   │   ├── RecurringExpenseManager.tsx  # 고정지출 관리
│   │   ├── RecurringExpenseForm.tsx     # 고정지출 폼
│   │   └── CategoryBudgetManager.tsx    # 카테고리 예산 관리
│   │
│   ├── SavingsGoals/          # 저축 목표 컴포넌트
│   │   ├── SavingsGoalManager.tsx   # 저축 목표 관리
│   │   ├── SavingsGoalForm.tsx      # 저축 목표 폼
│   │   └── SavingsGoalItem.tsx      # 저축 목표 항목
│   │
│   ├── Navigation/            # 네비게이션 컴포넌트
│   │   └── ModeNavigation.tsx       # 모드 전환 네비게이션
│   │
│   ├── Legal/                 # 법적 페이지
│   │   ├── TermsOfService.tsx       # 이용약관
│   │   └── PrivacyPolicy.tsx        # 개인정보처리방침
│   │
│   └── ui/                    # 공통 UI 컴포넌트
│       ├── Button.tsx               # 버튼
│       ├── ThemeToggle.tsx          # 다크모드 토글
│       └── ConfirmDialog.tsx        # 확인 다이얼로그
│
├── contexts/                  # React Context
│   ├── AuthContext.tsx            # 인증 상태 관리
│   ├── CurrencyContext.tsx        # 통화 상태 관리
│   ├── AppModeContext.tsx         # 앱 모드 상태 관리
│   ├── ThemeContext.tsx           # 테마 상태 관리
│   └── AnalyticsContext.tsx       # Google Analytics 관리
│
├── hooks/                     # 커스텀 훅
│   ├── useCurrency.ts             # 통화 관련 훅
│   ├── useCurrencyConversion.ts   # 환율 변환 훅
│   ├── useSwipe.ts                # 스와이프 제스처 훅
│   └── useAnalyticsEvent.ts       # GA 이벤트 추적 훅
│
├── services/                  # API 서비스
│   ├── transactionService.ts      # 거래 CRUD 서비스
│   ├── recurringExpenseService.ts # 고정지출 서비스
│   ├── categoryBudgetService.ts   # 카테고리 예산 서비스
│   └── savingsGoalService.ts      # 저축 목표 서비스
│
├── lib/                       # 외부 라이브러리 설정
│   └── supabase.ts                # Supabase 클라이언트
│
├── types/                     # TypeScript 타입 정의
│   ├── index.ts                   # 타입 배럴 익스포트
│   ├── database.ts                # Supabase DB 타입
│   ├── transaction.ts             # 거래 타입
│   ├── currency.ts                # 통화 타입
│   ├── calendar.ts                # 캘린더 타입
│   ├── statistics.ts              # 통계 타입
│   ├── savingsGoal.ts             # 저축 목표 타입
│   ├── search.ts                  # 검색 타입
│   ├── analytics.ts               # 분석 타입
│   ├── japanCost.ts               # 일본 초기비용 타입
│   ├── initialCost.ts             # 초기비용 타입
│   └── common.ts                  # 공통 타입
│
├── utils/                     # 유틸리티 함수
│   ├── calculations.ts            # 계산 관련 함수
│   ├── currency.ts                # 환율 API 및 포맷팅
│   ├── calendar.ts                # 캘린더 로직
│   ├── dateUtils.ts               # 날짜 유틸리티
│   ├── statistics.ts              # 통계 계산
│   ├── searchUtils.ts             # 검색 유틸리티
│   └── localStorageBudget.ts      # 로컬 스토리지 예산 관리
│
├── data/                      # 정적 데이터
│   ├── japanCostCategories.ts     # 일본 비용 카테고리
│   └── initialCostCategories.ts   # 초기비용 카테고리
│
├── constants/                 # 상수
│   └── routes.ts                  # 라우트 상수
│
└── test/                      # 테스트 설정
    └── setup.ts                   # Vitest 설정
```

---

## 데이터베이스 스키마

### 테이블 구조

#### 1. profiles (사용자 프로필)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | string (UUID) | 사용자 ID (Primary Key) |
| email | string | 이메일 |
| username | string? | 사용자명 |
| display_name | string? | 표시 이름 |
| avatar_url | string? | 프로필 이미지 URL |
| provider | enum | 인증 제공자 (google/line/email) |
| provider_id | string? | 제공자 ID |
| settings | JSON | 사용자 설정 |
| is_active | boolean | 활성화 여부 |
| last_sign_in_at | timestamp | 마지막 로그인 |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |

#### 2. transactions (거래 내역)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | string (UUID) | 거래 ID (Primary Key) |
| user_id | string | 사용자 ID (Foreign Key) |
| type | enum | 거래 유형 (income/expense) |
| amount | number | 금액 (원본 통화) |
| category | string | 카테고리 |
| description | string | 설명 |
| date | string | 거래 날짜 |
| currency | enum | 통화 (KRW/USD/JPY) |
| amount_in_krw | number | 원화 환산 금액 |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |

#### 3. recurring_expenses (고정지출)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | string (UUID) | 고정지출 ID (Primary Key) |
| user_id | string | 사용자 ID (Foreign Key) |
| name | string | 지출 이름 |
| amount | number | 금액 |
| currency | enum | 통화 (KRW/USD/JPY) |
| amount_in_krw | number | 원화 환산 금액 |
| category | string | 카테고리 |
| is_active | boolean | 활성화 여부 |
| day_of_month | number | 매월 지출 날짜 (1-31) |
| description | string? | 설명 |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |

#### 4. category_budgets (카테고리 예산)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | string (UUID) | 예산 ID (Primary Key) |
| user_id | string | 사용자 ID (Foreign Key) |
| category | string | 카테고리 |
| year | number | 연도 |
| month | number | 월 (1-12) |
| budget_amount | number | 예산 금액 |
| currency | string | 통화 |
| budget_amount_in_krw | number | 원화 환산 금액 |
| is_active | boolean | 활성화 여부 |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |

#### 5. savings_goals (저축 목표)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | string (UUID) | 저축 목표 ID (Primary Key) |
| user_id | string | 사용자 ID (Foreign Key) |
| name | string | 목표 이름 |
| target_amount | number | 목표 금액 |
| current_amount | number | 현재 저축액 |
| currency | enum | 통화 (KRW/USD/JPY) |
| target_amount_in_krw | number | 목표 금액 (원화) |
| current_amount_in_krw | number | 현재 저축액 (원화) |
| deadline | string? | 마감일 |
| category | string? | 카테고리 |
| description | string? | 설명 |
| is_completed | boolean | 완료 여부 |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |

---

## 주요 기능

### 1. 가계부 관리
- **거래 CRUD**: 수입/지출 내역 추가, 수정, 삭제
- **다중 통화 지원**: KRW, USD, JPY 지원
- **실시간 환율**: ExchangeRate API 연동
- **카테고리 분류**: 11개 지출 카테고리, 3개 수입 카테고리

#### 지출 카테고리
- 장보기, 외식비, 카페/간식, 쇼핑, 미용/뷰티, 경조사/선물
- 교통, 문화/여가, 의료, 교육/학습, 기타

#### 수입 카테고리
- 급여, 용돈, 기타수입

### 2. 대시보드 뷰 모드
| 모드 | 설명 |
|------|------|
| 요약 | 이번달 수입/지출/잔액 요약 |
| 캘린더 | 월별 거래 내역 캘린더 형식 |
| 고정지출 | 매월 반복 지출 관리 |
| 저축 | 저축 목표 관리 |
| 통계 | 차트 및 분석 데이터 |

### 3. 통계 분석
- **월별 트렌드 차트**: 수입/지출/순액 라인 차트
- **카테고리별 분석**: 파이 차트 및 상세 목록
- **요일별 분석**: 생활 패턴 분석 바 차트
- **기간별 필터링**: 1개월/3개월/6개월/1년/전체

### 4. 초기비용 계산기 (일본 특화)
- **지역별 비용**: 도쿄/오사카 차등 적용
- **16개 카테고리**: 필수 8개 + 선택 8개
- **7개 그룹**: 출국전준비, 입국후정착, 주거, 교통, 교육, 생활, 비상
- **한일 병기**: 모든 카테고리 한국어-일본어 동시 표시

### 5. 인증 시스템
- **이메일/비밀번호**: 기본 로그인
- **Google OAuth**: 소셜 로그인
- **선택적 로그인**: 비로그인으로도 앱 사용 가능 (임시 모드)
- **세션 관리**: sessionStorage 기반 (탭 종료 시 자동 로그아웃)

### 6. 다크 모드
- 시스템 설정 자동 감지
- 수동 토글 가능
- 모든 UI 컴포넌트 지원

---

## 라우팅 구조

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | MainApp | 메인 앱 (가계부/계산기) |
| `/login` | LoginPage | 로그인/회원가입 |
| `/auth/callback` | AuthCallback | OAuth 콜백 처리 |
| `/terms` | TermsOfService | 이용약관 |
| `/privacy` | PrivacyPolicy | 개인정보처리방침 |

---

## Context API 구조

### 1. AuthContext
- 사용자 인증 상태 관리
- Supabase Auth 연동
- 로그인/로그아웃/프로필 관리

### 2. CurrencyContext
- 현재 선택된 통화 상태
- 환율 정보 관리
- 1시간마다 자동 갱신

### 3. AppModeContext
- 앱 모드 상태 (expense-tracker / initial-cost-calculator)
- 모드 전환 애니메이션

### 4. ThemeContext
- 다크/라이트 모드 상태
- 시스템 설정 감지

### 5. AnalyticsContext
- Google Analytics 4 연동
- 페이지뷰/이벤트 추적

---

## 빌드 및 배포

### 빌드 최적화
- **코드 스플리팅**: 벤더 라이브러리 분리 (react, recharts, supabase)
- **Gzip 압축**: 10KB 이상 파일 자동 압축
- **Terser 압축**: 프로덕션에서 console.* 제거
- **번들 분석**: dist/stats.html 생성

### 스크립트
```bash
npm run dev          # 개발 서버 (포트 3000)
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 미리보기
npm run test         # 단위 테스트
npm run test:e2e     # E2E 테스트
npm run lint         # ESLint 검사
npm run type-check   # TypeScript 타입 검사
```

---

## 환경 변수

```env
VITE_SUPABASE_URL=<Supabase 프로젝트 URL>
VITE_SUPABASE_ANON_KEY=<Supabase Anon Key>
```

---

## 테스트

### 단위 테스트 (Vitest)
- `src/utils/calculations.test.ts` - 계산 함수 테스트
- `src/utils/dateUtils.test.ts` - 날짜 유틸 테스트
- `src/utils/currency.test.ts` - 통화 함수 테스트

### E2E 테스트 (Playwright)
- 크로스 브라우저 테스트 지원
- Chromium, Firefox, WebKit 지원

---

## 성능 최적화

### React 최적화
- `React.memo`: 불필요한 재렌더링 방지
- `useMemo`: 비용이 큰 계산 캐싱
- `useCallback`: 함수 재생성 방지
- `useRef`: 렌더링과 무관한 값 저장

### 네트워크 최적화
- Supabase Realtime: 실시간 데이터 동기화
- 환율 API 캐싱: 1시간 간격 갱신
- 낙관적 업데이트: UI 즉시 반응

---

## 보안

### Row Level Security (RLS)
- Supabase RLS로 사용자별 데이터 격리
- `user_id` 기반 접근 제어

### 세션 관리
- sessionStorage 사용
- 탭 종료 시 자동 로그아웃
- CSRF 보호 (Supabase 내장)

---

## 향후 개발 계획

1. **인증 확장**: LINE, Apple 로그인 추가
2. **다국어 지원**: 영어, 일본어 UI
3. **예산 알림**: 예산 초과 시 알림
4. **데이터 내보내기**: CSV/PDF 내보내기
5. **PWA 지원**: 오프라인 사용

---

*마지막 업데이트: 2026-01-01*
