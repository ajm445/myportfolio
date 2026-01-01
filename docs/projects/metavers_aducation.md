# VerseUp - 메타버스 학습 플랫폼

<div align="center">

**"편하게 놀고 소통하는 웹 메타버스 학습 플랫폼"**

전통적인 온라인 교육과 3D 가상 환경을 결합한 차세대 웹 기반 학습 플랫폼

[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r170-black?logo=three.js)](https://threejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)

</div>

---

## 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
- [API 문서](#api-문서)
- [데이터베이스 스키마](#데이터베이스-스키마)
- [Socket.IO 이벤트](#socketio-이벤트)
- [3D 메타버스 시스템](#3d-메타버스-시스템)
- [사용자 역할](#사용자-역할)

---

## 프로젝트 소개

VerseUp은 학생, 강사, 학부모가 함께 참여하는 3D 메타버스 학습 플랫폼입니다. 웹 브라우저에서 바로 접속하여 3D 가상 교실에서 실시간 강의를 수강하고, 과제를 제출하며, 다른 학습자들과 소통할 수 있습니다.

### 핵심 가치

- **몰입형 학습 환경**: 3D 가상 공간에서 실제 교실처럼 학습
- **실시간 상호작용**: WebRTC 기반 실시간 화상 강의 및 채팅
- **학부모 참관**: 부모가 자녀의 수업을 실시간으로 참관
- **체계적인 학습 관리**: 출석, 과제, 진도율 통합 관리

---

## 주요 기능

### 학습 관리 시스템 (LMS)

| 기능 | 설명 |
|------|------|
| **강의 관리** | 강의 생성, 수정, 삭제 / 주차별 커리큘럼 구성 (1-10주) |
| **수강 신청** | 토스페이먼츠 결제 연동 / 수강료 결제 및 환불 처리 |
| **과제 시스템** | 과제 출제, 제출, 채점 / 피드백 및 점수 관리 |
| **출석 관리** | 개별/일괄 출석 체크 / 출석률 통계 |
| **진도 관리** | 주차별 진도율 추적 / 학습 현황 대시보드 |
| **강의 자료** | 파일 업로드/다운로드 (50MB 제한) / Supabase Storage 연동 |

### 3D 메타버스

| 기능 | 설명 |
|------|------|
| **3D 캐릭터** | GLTF 모델 기반 아바타 / Idle, Walk, Run 애니메이션 |
| **물리 엔진** | Rapier 기반 충돌 감지 / 계단 오르기, 앉기 동작 |
| **가상 교실** | 교실별 시간표 / 좌석 시스템 / 교탁 상호작용 |
| **카메라 시스템** | 3인칭 포인터 락 / 1인칭 참관 모드 |
| **멀티플레이** | Socket.IO 기반 실시간 위치 동기화 |

### 실시간 소통

| 기능 | 설명 |
|------|------|
| **실시간 채팅** | 강의실별 채팅 / 이모지 지원 |
| **화상 강의** | WebRTC 기반 실시간 스트리밍 |
| **화면 공유** | 강사 화면 공유 기능 |
| **알림 시스템** | 실시간 알림 / 일괄 읽음 처리 |

### 학부모 시스템

| 기능 | 설명 |
|------|------|
| **자녀 연동** | 초대 코드 기반 연결 (7일 유효) |
| **학습 현황** | 출석률, 과제 현황, 진도율 조회 |
| **메타버스 참관** | 투명 모드로 실시간 수업 참관 |
| **상호작용 제한** | 참관 시 채팅/좌석 이용 불가 |

---

## 기술 스택

### Frontend

| 카테고리 | 기술 |
|----------|------|
| **프레임워크** | React 19, Vite 6 |
| **상태 관리** | Zustand |
| **서버 상태** | TanStack Query v5 |
| **라우팅** | React Router v7 |
| **스타일링** | Tailwind CSS |
| **3D 렌더링** | Three.js, React Three Fiber, React Three Drei |
| **물리 엔진** | Rapier (react-three/rapier) |
| **실시간 통신** | Socket.IO Client |
| **결제** | 토스페이먼츠 SDK |

### Backend

| 카테고리 | 기술 |
|----------|------|
| **런타임** | Node.js 22 |
| **프레임워크** | Express 5 |
| **실시간 통신** | Socket.IO 4 |
| **데이터베이스** | Supabase (PostgreSQL) |
| **인증** | Supabase Auth + JWT |
| **파일 스토리지** | Supabase Storage |
| **결제** | 토스페이먼츠 API |

### DevOps & Tools

| 카테고리 | 기술 |
|----------|------|
| **패키지 관리** | npm |
| **코드 품질** | ESLint, Prettier |
| **모노레포** | 단일 레포지토리 구조 |

---

## 프로젝트 구조

```
verseUp/
├── public/
│   └── models/                  # 3D 모델 파일 (GLTF, GLB, FBX)
│       ├── BaseCharacter.gltf   # 캐릭터 모델
│       └── maps/                # 맵 모델
│
├── src/                         # 프론트엔드 소스
│   ├── components/
│   │   ├── layout/              # Header, Layout
│   │   ├── metaverse/           # 3D 메타버스 컴포넌트
│   │   │   ├── MetaverseScene.jsx
│   │   │   ├── Player.jsx
│   │   │   ├── CharacterModel.jsx
│   │   │   ├── ThirdPersonCamera.jsx
│   │   │   └── MapModel.jsx
│   │   ├── dashboard/           # 대시보드 컴포넌트
│   │   ├── course/              # 강의 관련 컴포넌트
│   │   ├── assignment/          # 과제 컴포넌트
│   │   ├── attendance/          # 출석 컴포넌트
│   │   ├── materials/           # 강의 자료 컴포넌트
│   │   ├── parent/              # 학부모 관련 컴포넌트
│   │   └── admin/               # 관리자 컴포넌트
│   │
│   ├── pages/                   # 페이지 컴포넌트
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── Metaverse.jsx
│   │   └── Admin.jsx
│   │
│   ├── stores/                  # Zustand 스토어
│   │   ├── authStore.js
│   │   └── courseStore.js
│   │
│   ├── services/                # API 및 서비스
│   │   ├── api.js               # Axios 인스턴스
│   │   ├── socket.js            # Socket.IO 클라이언트
│   │   ├── courseService.js
│   │   └── paymentService.js
│   │
│   ├── lib/                     # 라이브러리 초기화
│   │   └── supabase.js
│   │
│   └── utils/                   # 유틸리티
│       └── constants.js
│
├── server/                      # 백엔드 소스
│   ├── server.js                # Express 서버 진입점
│   │
│   ├── routes/                  # API 라우트
│   │   ├── index.js             # 라우트 등록
│   │   ├── auth.js              # 인증 API
│   │   ├── courses.js           # 강의 CRUD
│   │   ├── payments.js          # 결제 API
│   │   ├── assignments.js       # 과제 API
│   │   ├── attendance.js        # 출석 API
│   │   ├── progress.js          # 진도 API
│   │   ├── materials.js         # 강의 자료 API
│   │   ├── classrooms.js        # 교실 API
│   │   ├── invites.js           # 초대 코드 API
│   │   └── parents.js           # 학부모 API
│   │
│   ├── middleware/              # Express 미들웨어
│   │   └── auth.js              # JWT 인증 미들웨어
│   │
│   ├── sockets/                 # Socket.IO 이벤트
│   │   └── index.js
│   │
│   └── utils/                   # 유틸리티
│       └── supabase.js          # Supabase 클라이언트
│
├── supabase/
│   └── migrations/              # 데이터베이스 마이그레이션
│       ├── 001_core_schema.sql
│       ├── 002_live_sessions.sql
│       ├── 003_classrooms_and_schedules.sql
│       ├── 004_payments_and_refunds.sql
│       ├── 005_course_materials.sql
│       ├── 006_assignments.sql
│       ├── 007_notifications.sql
│       ├── 008_audit_logs.sql
│       ├── 009_helper_functions.sql
│       ├── 010_initial_data.sql
│       ├── 011_test_accounts.sql
│       └── 012_parent_account_system.sql
│
├── package.json
├── vite.config.js
├── tailwind.config.js
├── CLAUDE.md                    # Claude Code 가이드
└── plan.md                      # 프로젝트 계획
```

---

## 시작하기

### 사전 요구사항

- Node.js 22.x 이상
- npm 10.x 이상
- Supabase 프로젝트 (PostgreSQL + Auth + Storage)
- 토스페이먼츠 계정 (결제 기능 사용 시)

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수를 설정합니다:

```env
# 서버 설정
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# JWT
JWT_SECRET=your_jwt_secret

# 토스페이먼츠
TOSS_SECRET_KEY=your_toss_secret_key
VITE_TOSS_CLIENT_KEY=your_toss_client_key

# API URL (프론트엔드용)
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (프론트엔드 + 백엔드 동시)
npm run dev:both

# 프론트엔드만 실행
npm run dev

# 백엔드만 실행
npm run dev:server

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### 개발 서버 접속

- **프론트엔드**: http://localhost:5173
- **백엔드 API**: http://localhost:3000/api
- **메타버스**: http://localhost:5173/metaverse

### 개발 명령어

```bash
# ESLint 검사
npm run lint

# Prettier 포맷팅
npm run format
```

---

## API 문서

### 인증 API (`/api/auth`)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|------------|------|------|
| GET | `/me` | 현재 사용자 정보 조회 | 필요 |
| GET | `/profile` | 상세 프로필 조회 | 필요 |
| PUT | `/profile` | 프로필 업데이트 | 필요 |

### 강의 API (`/api/courses`)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|------------|------|------|
| GET | `/` | 강의 목록 조회 | 불필요 |
| GET | `/:id` | 강의 상세 조회 | 불필요 |
| POST | `/` | 강의 생성 | 강사/관리자 |
| PUT | `/:id` | 강의 수정 | 강사/관리자 |
| DELETE | `/:id` | 강의 삭제 | 강사/관리자 |
| POST | `/:id/enroll` | 수강 신청 | 필요 |
| DELETE | `/:id/enroll` | 수강 취소 | 필요 |
| GET | `/my/enrolled` | 내 수강 목록 | 필요 |
| GET | `/my/teaching` | 내 강의 목록 (강사) | 강사 |

### 결제 API (`/api/payments`)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|------------|------|------|
| POST | `/confirm` | 결제 승인 | 필요 |
| GET | `/my` | 내 결제 내역 | 필요 |
| GET | `/:id` | 결제 상세 조회 | 필요 |
| POST | `/:id/refund` | 환불 요청 | 필요 |
| GET | `/admin/all` | 전체 결제 내역 | 관리자 |

### 과제 API (`/api/assignments`)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|------------|------|------|
| GET | `/course/:courseId` | 강의 과제 목록 | 필요 |
| POST | `/` | 과제 생성 | 강사 |
| PUT | `/:id` | 과제 수정 | 강사 |
| DELETE | `/:id` | 과제 삭제 | 강사 |
| POST | `/:id/submit` | 과제 제출 | 학생 |
| GET | `/:id/submissions` | 제출물 목록 | 강사 |
| PUT | `/submissions/:id/grade` | 채점 | 강사 |

### 출석 API (`/api/attendance`)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|------------|------|------|
| GET | `/course/:courseId` | 강의 출석 조회 | 강사 |
| GET | `/course/:courseId/session/:date` | 특정 날짜 출석 | 강사 |
| GET | `/course/:courseId/students` | 수강생 목록 | 강사 |
| POST | `/` | 출석 기록 | 강사 |
| POST | `/bulk` | 일괄 출석 기록 | 강사 |
| PUT | `/:id` | 출석 수정 | 강사 |
| DELETE | `/:id` | 출석 삭제 | 강사 |
| GET | `/course/:courseId/stats` | 출석 통계 | 강사 |

### 진도 API (`/api/progress`)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|------------|------|------|
| GET | `/course/:courseId` | 강의 진도 조회 | 강사 |
| GET | `/student/:studentId` | 학생 진도 조회 | 필요 |
| PUT | `/:id` | 진도 수정 | 강사 |
| POST | `/:id/complete-week` | 주차 완료 처리 | 강사 |
| POST | `/:id/uncomplete-week` | 주차 완료 취소 | 강사 |
| POST | `/course/:courseId/bulk-complete-week` | 일괄 주차 완료 | 강사 |

### 강의 자료 API (`/api/materials`)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|------------|------|------|
| GET | `/courses/:courseId/materials` | 자료 목록 | 수강생/강사 |
| POST | `/courses/:courseId/materials/upload` | 자료 업로드 | 강사 |
| GET | `/courses/:courseId/materials/:id/download` | 자료 다운로드 | 수강생/강사 |
| DELETE | `/courses/:courseId/materials/:id` | 자료 삭제 | 강사 |

### 교실 API (`/api/classrooms`)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|------------|------|------|
| GET | `/` | 교실 목록 | 불필요 |
| GET | `/:id` | 교실 상세 (시간표 포함) | 불필요 |
| POST | `/:id/available-slots` | 가용 시간대 조회 | 불필요 |
| POST | `/` | 교실 생성 | 관리자 |
| PUT | `/:id` | 교실 수정 | 관리자 |
| GET | `/:id/check-access` | 접근 권한 확인 | 필요 |

### 초대 코드 API (`/api/invites`)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|------------|------|------|
| POST | `/generate` | 초대 코드 생성 | 학생 |
| POST | `/validate` | 초대 코드 검증 | 불필요 |
| GET | `/my` | 내 초대 코드 목록 | 학생 |
| DELETE | `/:code` | 초대 코드 취소 | 학생 |
| GET | `/connected-parents` | 연결된 부모 목록 | 학생 |
| DELETE | `/disconnect/:linkId` | 부모 연결 해제 | 학생 |

### 학부모 API (`/api/parents`)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|------------|------|------|
| GET | `/children` | 자녀 목록 | 부모 |
| POST | `/children/:studentId/nickname` | 자녀 별명 설정 | 부모 |
| DELETE | `/children/:linkId` | 자녀 연결 해제 | 부모 |
| GET | `/children/:studentId/dashboard` | 자녀 대시보드 | 부모 |
| GET | `/children/:studentId/courses` | 자녀 수강 목록 | 부모 |
| GET | `/children/:studentId/assignments` | 자녀 과제 현황 | 부모 |
| GET | `/children/:studentId/attendance` | 자녀 출석 현황 | 부모 |
| GET | `/children/:studentId/progress` | 자녀 진도 현황 | 부모 |

---

## 데이터베이스 스키마

### 핵심 테이블

```sql
-- 사용자 프로필
profiles (
  id UUID PRIMARY KEY,          -- Supabase Auth ID
  email TEXT UNIQUE,
  name TEXT,
  role TEXT,                     -- 'student', 'instructor', 'admin', 'parent'
  avatar_url TEXT,
  bio TEXT
)

-- 강의
courses (
  id UUID PRIMARY KEY,
  title TEXT,
  description TEXT,
  instructor_id UUID,            -- 강사 ID
  code TEXT UNIQUE,              -- 수강 코드 (자동 생성)
  category TEXT,
  level TEXT,                    -- 'beginner', 'intermediate', 'advanced'
  status TEXT,                   -- 'draft', 'published', 'archived'
  price INTEGER,
  weeks INTEGER,                 -- 1-10주
  max_students INTEGER,
  enrolled_count INTEGER,
  classroom_id UUID,             -- 가상 교실
  time_slot_id UUID,             -- 수업 시간대
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ
)

-- 수강 신청
enrollments (
  id UUID PRIMARY KEY,
  course_id UUID,
  student_id UUID,
  payment_id UUID,
  status TEXT                    -- 'active', 'dropped', 'completed'
)

-- 결제
payments (
  id UUID PRIMARY KEY,
  user_id UUID,
  order_id TEXT,                 -- 토스페이먼츠 주문 ID
  payment_key TEXT,
  course_id UUID,
  amount INTEGER,
  status TEXT,                   -- 'completed', 'pending', 'cancelled'
  method TEXT,
  approved_at TIMESTAMPTZ,
  receipt_url TEXT
)
```

### 학습 관리 테이블

```sql
-- 과제
assignments (
  id UUID PRIMARY KEY,
  course_id UUID,
  title TEXT,
  description TEXT,
  due_date TIMESTAMPTZ,
  max_score INTEGER
)

-- 과제 제출
assignment_submissions (
  id UUID PRIMARY KEY,
  assignment_id UUID,
  student_id UUID,
  content TEXT,
  file_url TEXT,
  submitted_at TIMESTAMPTZ,
  score INTEGER,
  feedback TEXT
)

-- 출석
attendance (
  id UUID PRIMARY KEY,
  student_id UUID,
  course_id UUID,
  session_date DATE,
  week_number INTEGER,
  status TEXT,                   -- 'present', 'absent', 'late', 'excused'
  check_in_time TIMESTAMPTZ,
  notes TEXT
)

-- 강의 진도
course_progress (
  id UUID PRIMARY KEY,
  student_id UUID,
  course_id UUID,
  current_week INTEGER,
  completed_weeks INTEGER[],
  completion_percentage DECIMAL,
  total_study_hours DECIMAL,
  last_activity_at TIMESTAMPTZ
)

-- 강의 자료
course_materials (
  id UUID PRIMARY KEY,
  course_id UUID,
  title TEXT,
  description TEXT,
  file_url TEXT,
  file_name TEXT,
  file_size INTEGER,
  file_type TEXT,
  week_number INTEGER,
  uploaded_by UUID
)
```

### 교실/일정 테이블

```sql
-- 교실
classrooms (
  id UUID PRIMARY KEY,
  name TEXT,
  description TEXT,
  capacity INTEGER,
  status TEXT                    -- 'active', 'inactive'
)

-- 시간대
time_slots (
  id UUID PRIMARY KEY,
  classroom_id UUID,
  day_of_week INTEGER,           -- 0-6 (일-토)
  start_time TIME,
  end_time TIME,
  slot_order INTEGER,
  is_active BOOLEAN
)

-- 강의 일정
course_schedules (
  id UUID PRIMARY KEY,
  course_id UUID,
  classroom_id UUID,
  time_slot_id UUID,
  week_number INTEGER,
  session_date DATE,
  start_time TIME,
  end_time TIME,
  status TEXT                    -- 'scheduled', 'completed', 'cancelled'
)
```

### 학부모 시스템 테이블

```sql
-- 부모-자녀 연결
parent_student_links (
  id UUID PRIMARY KEY,
  parent_id UUID,
  student_id UUID,
  invite_code TEXT,
  status TEXT,                   -- 'pending', 'active', 'revoked'
  student_nickname TEXT,
  code_expires_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ
)

-- 자녀 목록 뷰 (부모용)
parent_children (
  parent_id UUID,
  student_id UUID,
  status TEXT
)
```

---

## Socket.IO 이벤트

### 연결/사용자 이벤트

| 이벤트 | 방향 | 설명 |
|--------|------|------|
| `user:join` | Client -> Server | 사용자 입장 |
| `user:leave` | Client -> Server | 사용자 퇴장 |
| `room:join` | Client -> Server | 방 입장 |
| `room:leave` | Client -> Server | 방 퇴장 |

### 채팅 이벤트

| 이벤트 | 방향 | 설명 |
|--------|------|------|
| `chat:message` | Client -> Server | 메시지 전송 |
| `chat:message` | Server -> Client | 메시지 수신 |
| `chat:history` | Server -> Client | 채팅 히스토리 |

### 메타버스 이벤트

| 이벤트 | 방향 | 설명 |
|--------|------|------|
| `player:move` | Client -> Server | 플레이어 위치 업데이트 |
| `player:moved` | Server -> Client | 다른 플레이어 위치 수신 |
| `player:sit` | Client -> Server | 앉기 동작 |
| `player:stand` | Client -> Server | 일어서기 동작 |
| `players:list` | Server -> Client | 현재 접속자 목록 |

### WebRTC 이벤트

| 이벤트 | 방향 | 설명 |
|--------|------|------|
| `webrtc:offer` | Client -> Server | SDP Offer 전송 |
| `webrtc:answer` | Client -> Server | SDP Answer 전송 |
| `webrtc:ice-candidate` | Client -> Server | ICE Candidate 전송 |

### 강의실 이벤트

| 이벤트 | 방향 | 설명 |
|--------|------|------|
| `classroom:join` | Client -> Server | 강의실 입장 |
| `classroom:leave` | Client -> Server | 강의실 퇴장 |
| `classroom:state` | Server -> Client | 강의실 상태 동기화 |

---

## 3D 메타버스 시스템

### 물리 설정

```javascript
// 플레이어 물리
const WALK_SPEED = 8
const RUN_SPEED = 18
const STEP_UP_SPEED = 4

// 캡슐 콜라이더 (scale 0.8 기준)
const CAPSULE_HALF_HEIGHT = 0.8
const CAPSULE_RADIUS = 0.52
const CAPSULE_Y_OFFSET = 1.28

// 중력
gravity={[0, -20, 0]}
```

### 맵별 시작 위치

```javascript
const START_POSITIONS = {
  main: [-1.91, 2, 32.55],     // 메인 맵
  school: [-1.32, 2, -14.63],  // 학교 맵
}
```

### 컨트롤

| 키 | 동작 |
|----|------|
| W / 방향키 위 | 앞으로 이동 |
| S / 방향키 아래 | 뒤로 이동 |
| A / 방향키 좌 | 왼쪽 이동 |
| D / 방향키 우 | 오른쪽 이동 |
| Shift | 달리기 |
| 마우스 클릭 | 포인터 락 (카메라 조작) |
| ESC | 포인터 락 해제 |

### 애니메이션 시스템

```javascript
// GLTF 모델에서 애니메이션 로드
const { scene, animations } = useGLTF('/models/BaseCharacter.gltf')
const { actions } = useAnimations(animations, group)

// 애니메이션 전환 (이름으로 접근)
const idleAction = actions['Idle']
const walkAction = actions['Walk'] || actions['Walking']
const runAction = actions['Run'] || actions['Running']

// 상태 기반 전환
if (isMoving) {
  if (isRunning) {
    runAction?.reset().fadeIn(0.2).play()
  } else {
    walkAction?.reset().fadeIn(0.2).play()
  }
} else {
  idleAction?.reset().fadeIn(0.2).play()
}
```

---

## 사용자 역할

### 학생 (Student)

- 강의 수강 신청 및 결제
- 과제 제출
- 메타버스 강의 참여
- 부모 초대 코드 생성
- 자신의 학습 현황 조회

### 강사 (Instructor)

- 강의 생성/수정/삭제
- 과제 출제 및 채점
- 출석 관리
- 진도 관리
- 강의 자료 업로드
- 실시간 강의 진행

### 관리자 (Admin)

- 모든 강의/사용자 관리
- 교실 생성/관리
- 결제 내역 조회
- 시스템 설정 관리
- 전체 통계 조회

### 학부모 (Parent)

- 자녀 연결 (초대 코드)
- 자녀 학습 현황 조회
- 메타버스 참관 모드
- 출석/과제/진도 확인

---

## 개발 가이드

### 주의사항

- Git 명령어는 직접 실행하지 않습니다 (사용자가 수동 처리)
- `.env` 파일은 `.env.example`을 참조하여 직접 생성합니다
- 3D 모델, 물리 설정, 카메라 설정은 튜닝된 값이므로 변경 시 주의가 필요합니다
- 바이너리 파일(FBX, GLB, 이미지 등)은 포맷팅하지 않습니다

### API 프록시

개발 모드에서 Vite는 `/api`와 `/socket.io` 요청을 백엔드 서버(포트 3000)로 프록시합니다.

### 코드 스타일

- ESLint와 Prettier 설정을 준수합니다
- 경로 별칭: `@/*` -> `./src/*`

### 추가 문서

- `CLAUDE.md`: Claude Code 개발 가이드
- `plan.md`: 프로젝트 계획 및 MVP 로드맵
- `BLENDER_EXPORT_GUIDE.md`: 3D 모델 내보내기 가이드
- `CHARACTER_GUIDE.md`: 캐릭터 모델 설정 가이드

---

## 라이선스

이 프로젝트는 비공개 프로젝트입니다.
