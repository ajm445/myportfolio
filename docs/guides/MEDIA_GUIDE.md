# 📸 프로젝트 미디어 추가 가이드

이 가이드는 포트폴리오 프로젝트 모달에 이미지와 영상을 추가하는 방법을 설명합니다.

## 📋 목차
1. [개요](#개요)
2. [Supabase Storage 설정](#supabase-storage-설정)
3. [미디어 파일 업로드](#미디어-파일-업로드)
4. [공개 URL 얻기](#공개-url-얻기)
5. [프로젝트에 미디어 추가](#프로젝트에-미디어-추가)
6. [권장 사양](#권장-사양)
7. [예제](#예제)
8. [트러블슈팅](#트러블슈팅)

---

## 개요

프로젝트 상세 모달의 **"개요" 탭**에 이미지 갤러리와 영상 플레이어를 추가할 수 있습니다.

### 지원하는 미디어 유형
- **이미지**: PNG, JPG, JPEG, WebP
- **영상**: MP4

### 미디어 저장 위치
- **Supabase Storage**: 모든 미디어 파일은 Supabase Storage에 업로드됩니다.

---

## Supabase Storage 설정

### 1. Supabase 프로젝트 접속
1. [Supabase Dashboard](https://supabase.com/dashboard)에 로그인
2. 프로젝트 `ddilbfhvzadnlaabjfdr` (portpolio) 선택

### 2. Storage Bucket 생성
1. 왼쪽 사이드바에서 **Storage** 클릭
2. **New bucket** 버튼 클릭
3. Bucket 설정:
   ```
   Name: project-media
   Public bucket: ✅ (체크)
   Allowed MIME types: image/*, video/mp4
   File size limit: 50 MB
   ```
4. **Create bucket** 클릭

### 3. 정책 설정 (선택사항)
기본적으로 Public bucket은 누구나 읽을 수 있습니다. 추가 보안이 필요한 경우:

1. **Storage** → **Policies** 탭 이동
2. `project-media` bucket 선택
3. 필요에 따라 업로드/삭제 정책 추가

---

## 미디어 파일 업로드

### 방법 1: Supabase Dashboard 사용 (권장)

#### 이미지 업로드
1. **Storage** → `project-media` bucket 클릭
2. **Upload file** 버튼 클릭
3. 파일 선택 또는 드래그 앤 드롭
4. 폴더 구조 권장:
   ```
   project-media/
   ├── synapse-ai/
   │   ├── screenshot-1.webp
   │   ├── screenshot-2.webp
   │   └── screenshot-3.webp
   ├── convi/
   │   ├── dashboard.png
   │   └── mobile.png
   └── ...
   ```

#### 영상 업로드
1. 동일한 방법으로 MP4 파일 업로드
2. 파일명 예시:
   ```
   project-media/
   └── synapse-ai/
       └── demo.mp4
   ```

### 방법 2: 프로그래밍 방식 업로드

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ddilbfhvzadnlaabjfdr.supabase.co',
  'YOUR_SUPABASE_ANON_KEY'
)

// 이미지 업로드
const uploadImage = async (file: File, projectName: string) => {
  const fileName = `${projectName}/${file.name}`
  const { data, error } = await supabase.storage
    .from('project-media')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('업로드 실패:', error)
    return null
  }

  return data
}
```

---

## 공개 URL 얻기

### Dashboard에서 URL 복사

1. **Storage** → `project-media` bucket 이동
2. 업로드한 파일 찾기
3. 파일 옆의 **... 메뉴** 클릭
4. **Copy URL** 선택
5. 또는 **Get URL** 클릭하여 직접 URL 확인

### URL 형식
```
https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/{폴더명}/{파일명}
```

### 예시 URL
```
이미지:
https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/synapse-ai/screenshot-1.webp

영상:
https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/synapse-ai/demo.mp4
```

---

## 프로젝트에 미디어 추가

### 1. Projects.tsx 파일 열기
```bash
/Users/dev/minhyuk-portfolio 2/src/components/Projects.tsx
```

### 2. 프로젝트 객체에 media 필드 추가

프로젝트 배열에서 미디어를 추가하고 싶은 프로젝트를 찾아 `media` 속성을 추가합니다.

#### 기본 구조
```typescript
{
  id: 1,
  title: "프로젝트 이름",
  subtitle: "부제목",
  // ... 기존 필드들

  // 미디어 추가 (선택사항)
  media: {
    images: [
      "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/프로젝트명/이미지1.webp",
      "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/프로젝트명/이미지2.png"
    ],
    videos: [
      "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/프로젝트명/데모.mp4"
    ]
  }
}
```

### 3. 예시: Synapse AI 프로젝트에 미디어 추가

```typescript
const projects: Project[] = [
  {
    id: 1,
    title: "Synapse AI",
    subtitle: "지능형 지식 관리 시스템",
    description: "...",
    image: "/projects/synapse.png",

    // 미디어 추가
    media: {
      images: [
        "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/synapse-ai/knowledge-graph.webp",
        "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/synapse-ai/pdf-viewer.webp",
        "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/synapse-ai/ai-chat.webp",
        "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/synapse-ai/dashboard.webp"
      ],
      videos: [
        "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/synapse-ai/demo-full.mp4"
      ]
    },

    technologies: [...],
    features: [...],
    achievements: [...],
    github: "...",
    demo: "..."
  },
  // 다른 프로젝트들...
]
```

### 4. 이미지만 또는 영상만 추가하기

```typescript
// 이미지만 있는 경우
media: {
  images: [
    "https://..../screenshot-1.webp",
    "https://..../screenshot-2.webp"
  ]
}

// 영상만 있는 경우
media: {
  videos: [
    "https://..../demo.mp4"
  ]
}

// 미디어가 없는 경우
// media 필드를 아예 추가하지 않거나:
media: undefined
```

---

## 권장 사양

### 이미지
| 속성 | 권장 사항 |
|------|----------|
| **해상도** | 1920x1080px (Full HD) |
| **종횡비** | 16:9 (가로형) |
| **포맷** | WebP (최우선), PNG, JPG |
| **파일 크기** | < 2MB |
| **최적화** | [TinyPNG](https://tinypng.com/) 또는 [Squoosh](https://squoosh.app/) 사용 권장 |

### 영상
| 속성 | 권장 사항 |
|------|----------|
| **해상도** | 1920x1080px (Full HD) 또는 1280x720px (HD) |
| **종횡비** | 16:9 |
| **포맷** | MP4 (H.264 코덱) |
| **파일 크기** | < 50MB |
| **길이** | 30초 ~ 2분 |
| **비트레이트** | 5-10 Mbps |

### 파일명 규칙
- **소문자 사용**: `demo.mp4` (O), `Demo.MP4` (X)
- **하이픈 사용**: `knowledge-graph.webp` (O), `knowledge_graph.webp` (△)
- **특수문자 금지**: 공백, 한글 등은 피하세요
- **의미있는 이름**: `screenshot-1.webp` (O), `img1.webp` (△)

---

## 예제

### 완전한 프로젝트 예제 (Convi)

```typescript
{
  id: 2,
  title: "Convi",
  subtitle: "편의점 종합 솔루션",
  description: "고객, 점주, 본사를 위한 통합 편의점 관리 시스템...",
  image: "/projects/convi.png",

  // 5개 이미지 + 1개 영상
  media: {
    images: [
      "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/convi/customer-dashboard.webp",
      "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/convi/store-management.webp",
      "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/convi/hq-analytics.webp",
      "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/convi/order-flow.webp",
      "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/convi/mobile-responsive.webp"
    ],
    videos: [
      "https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/convi/full-demo.mp4"
    ]
  },

  technologies: [
    "React 19",
    "TypeScript",
    "Supabase",
    "Tailwind CSS",
    "Zustand",
    "Toss Payments"
  ],
  features: [
    "실시간 주문 관리",
    "토스페이먼츠 결제 연동",
    "재고 자동 관리",
    "매출 분석 대시보드"
  ],
  achievements: [
    "17개 핵심 테이블 완전 구축",
    "RLS 기반 보안 시스템",
    "Render 배포 완료"
  ],
  github: "https://github.com/yourusername/convi",
  demo: "https://convi-final.onrender.com"
}
```

### 미디어 없는 프로젝트

```typescript
{
  id: 6,
  title: "AI Doc Generator",
  subtitle: "개발 문서 자동 생성",
  description: "코드베이스를 분석하여 자동으로 문서를 생성하는 도구",
  image: "/projects/doc-gen.png",

  // media 필드 없음 (아직 스크린샷/영상이 준비되지 않음)

  technologies: ["Python", "OpenAI API", "FastAPI"],
  features: ["자동 문서 생성", "마크다운 출력"],
  achievements: ["개발 시간 50% 단축"],
  github: "https://github.com/yourusername/ai-doc-gen"
}
```

---

## 트러블슈팅

### 이미지/영상이 표시되지 않을 때

#### 1. URL이 올바른지 확인
```typescript
// ❌ 잘못된 URL 예시
"https://supabase.co/storage/..." // 프로젝트 ID 누락
"http://ddilbfhvzadnlaabjfdr..." // http 대신 https 사용

// ✅ 올바른 URL
"https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/프로젝트명/파일명"
```

#### 2. Bucket이 Public인지 확인
1. Supabase Dashboard → **Storage**
2. `project-media` bucket 선택
3. **Settings** → **Public bucket** 체크 확인

#### 3. 브라우저 콘솔 확인
```bash
# 개발 서버 실행
npm run dev

# 브라우저 콘솔(F12)에서 에러 확인
# Network 탭에서 파일 로딩 상태 확인
```

#### 4. CORS 이슈
Supabase Storage는 기본적으로 CORS를 허용합니다. 문제가 있다면:

1. Supabase Dashboard → **Storage** → **Settings**
2. **CORS Configuration** 확인
3. 필요시 도메인 추가:
   ```json
   {
     "allowedOrigins": ["http://localhost:5173", "https://yourdomain.com"]
   }
   ```

### 영상이 재생되지 않을 때

#### 1. 포맷 확인
- **지원**: MP4 (H.264 코덱)
- **미지원**: AVI, MOV, MKV 등

#### 2. 파일 크기 확인
- Supabase Storage 기본 제한: 50MB
- 더 큰 파일이 필요하면 bucket 설정에서 limit 증가

#### 3. 영상 변환 도구
```bash
# FFmpeg를 사용한 MP4 변환 (macOS)
brew install ffmpeg
ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4
```

### 개발 환경에서는 보이는데 빌드 후 안 보일 때

#### 1. 환경 변수 확인
```bash
# .env 파일
VITE_SUPABASE_URL=https://ddilbfhvzadnlaabjfdr.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

#### 2. 빌드 테스트
```bash
npm run build
npm run preview
# http://localhost:4173 에서 확인
```

---

## 추가 도움말

### 이미지 최적화 도구
- **온라인**: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
- **CLI**: [ImageMagick](https://imagemagick.org/), [Sharp](https://sharp.pixelplumbing.com/)

### 영상 편집/압축 도구
- **무료**: [HandBrake](https://handbrake.fr/), [FFmpeg](https://ffmpeg.org/)
- **온라인**: [CloudConvert](https://cloudconvert.com/), [Online-Convert](https://www.online-convert.com/)

### 스크린샷 캡처 팁
- **macOS**: `Cmd + Shift + 5` (화면 녹화 포함)
- **Windows**: `Win + Shift + S` (Snipping Tool)
- **브라우저**: Chrome DevTools → Device Toolbar (반응형 화면 캡처)

### 화면 녹화 팁
1. **시나리오 준비**: 녹화 전에 시연할 기능 순서 정리
2. **깔끔한 데이터**: 테스트 데이터는 의미있고 현실적으로
3. **브라우저 크기 고정**: 1920x1080 또는 1280x720
4. **시스템 알림 끄기**: 녹화 중 방해 요소 제거
5. **짧고 집중적으로**: 30초~2분 내로 핵심만 보여주기

---

## 문의

미디어 추가 과정에서 문제가 발생하면:
1. 브라우저 콘솔 에러 메시지 확인
2. Supabase Dashboard의 Storage 로그 확인
3. 이 가이드의 트러블슈팅 섹션 참고

**성공적인 포트폴리오 구축을 응원합니다! 🚀**
