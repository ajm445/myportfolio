import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useCallback } from 'react'
import {
  ExternalLink,
  Play,
  Database,
  Smartphone,
  FileText,
  ChevronDown,
  Award,
  TrendingUp,
  Bug,
  CheckCircle,
  X,
  Layers,
  Users,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Image as ImageIcon,
  Globe,
  Wallet,
  BarChart3
} from 'lucide-react'
import { trackProjectClick } from '../utils/analytics'

// 타입 정의
type ProjectStatus = 'LIVE' | 'BETA' | 'DEVELOPMENT'
type TabType = 'overview' | 'achievements' | 'troubleshooting' | 'metrics'

// 상수 정의
const DISPLAY_LIMITS = {
  MAIN_FEATURES: 4,
  MAIN_TECHNOLOGIES: 6,
  CARD_TECHNOLOGIES: 4,
  DESCRIPTION_LENGTH: 100
} as const

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  technologies: string[]
  features: string[]
  achievements: Array<{
    title: string
    description: string
  }>
  troubleshooting: Array<{
    problem: string
    solution: string
    impact: string
  }>
  metrics: {
    codeLines: string
    testCoverage?: string
    buildTime?: string
    users?: string
    performance?: string
  }
  deployUrl: string
  docsUrl?: string
  status: ProjectStatus
  color: string
  icon: React.ReactNode
  featured: boolean
  category: string
  period: string
  team: string
  media?: {
    images?: string[]  // Supabase Storage 이미지 URLs
    videos?: string[]  // Supabase Storage 영상 URLs
  }
}

// 재사용 가능한 컴포넌트들
const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const statusConfig = {
    LIVE: { bg: 'bg-green-100 text-green-800', dotBg: 'bg-green-400' },
    BETA: { bg: 'bg-blue-100 text-blue-800', dotBg: 'bg-blue-400' },
    DEVELOPMENT: { bg: 'bg-yellow-100 text-yellow-800', dotBg: 'bg-yellow-400' }
  }

  const config = statusConfig[status]

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg}`}>
      <span className={`w-2 h-2 rounded-full mr-1 animate-pulse ${config.dotBg}`} />
      {status}
    </span>
  )
}

const TechStack = ({
  technologies,
  maxItems,
  variant = 'default'
}: {
  technologies: string[]
  maxItems: number
  variant?: 'default' | 'compact'
}) => {
  const baseClasses = variant === 'compact'
    ? 'px-2 py-1 rounded text-xs bg-apple-gray-200 dark:bg-apple-gray-700 text-apple-gray-700 dark:text-apple-gray-300'
    : 'px-3 py-1 rounded-full text-sm font-medium bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-700 dark:text-apple-gray-300'

  return (
    <div className="flex flex-wrap gap-2">
      {technologies.slice(0, maxItems).map((tech, index) => (
        <motion.span
          key={tech}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className={baseClasses}
        >
          {tech}
        </motion.span>
      ))}
      {technologies.length > maxItems && (
        <span className={`${baseClasses} opacity-60`}>
          +{technologies.length - maxItems}
        </span>
      )}
    </div>
  )
}

// 이미지 갤러리 슬라이더 컴포넌트
const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (!images || images.length === 0) return null

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      {/* 메인 갤러리 */}
      <div className="relative group">
        {/* 이미지 컨테이너 */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-apple-gray-100 dark:bg-apple-gray-800">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-contain cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            />
          </AnimatePresence>

          {/* 좌우 화살표 (이미지가 2개 이상일 때만) */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-apple-gray-800/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-apple-gray-700"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-apple-gray-900 dark:text-white" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-apple-gray-800/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-apple-gray-700"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-apple-gray-900 dark:text-white" />
              </button>
            </>
          )}

          {/* 확대 아이콘 */}
          <div className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-apple-gray-800/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-5 h-5 text-apple-gray-900 dark:text-white" />
          </div>
        </div>

        {/* 인디케이터 (이미지가 2개 이상일 때만) */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-apple-blue'
                    : 'w-2 bg-apple-gray-300 dark:bg-apple-gray-600 hover:bg-apple-gray-400 dark:hover:bg-apple-gray-500'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox 모달 */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1} - full size`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevious()
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// 영상 플레이어 컴포넌트
const VideoPlayer = ({ videos }: { videos: string[] }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  if (!videos || videos.length === 0) return null

  return (
    <div className="space-y-4">
      {/* 비디오 플레이어 */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-apple-gray-900">
        <video
          key={videos[currentVideoIndex]}
          controls
          className="w-full h-full"
          preload="metadata"
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 비디오 선택 버튼 (영상이 2개 이상일 때만) */}
      {videos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                index === currentVideoIndex
                  ? 'bg-apple-blue text-white'
                  : 'bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-700 dark:text-apple-gray-300 hover:bg-apple-gray-200 dark:hover:bg-apple-gray-600'
              }`}
            >
              영상 {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const shouldShowLiveDemo = (deployUrl: string): boolean => deployUrl !== '#'

const ProjectActions = ({
  project,
  onViewDetails,
  showViewDetails = true
}: {
  project: Project
  onViewDetails: () => void
  showViewDetails?: boolean
}) => {
  const hasLiveDemo = shouldShowLiveDemo(project.deployUrl)

  if (!hasLiveDemo && !showViewDetails) {
    return (
      <div className="w-full px-6 py-3 rounded-xl font-semibold text-center bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-400 dark:text-apple-gray-500">
        개발 진행 중
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {showViewDetails && (
        <motion.button
          onClick={onViewDetails}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${
            hasLiveDemo ? 'flex-1' : 'w-full'
          } apple-button bg-gradient-to-r ${project.color} text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg`}
          aria-label={`${project.title} 상세 정보 보기`}
        >
          <Play size={20} />
          <span>상세 보기</span>
        </motion.button>
      )}

      {hasLiveDemo && (
        <motion.a
          href={project.deployUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackProjectClick(project.title, 'live_demo')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${
            showViewDetails ? 'flex-1' : 'w-full'
          } apple-button border-2 border-apple-gray-300 dark:border-apple-gray-600 text-apple-gray-700 dark:text-apple-gray-300 px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:border-apple-blue hover:text-apple-blue transition-colors duration-200`}
          aria-label={`${project.title} 라이브 데모 보기`}
        >
          <ExternalLink size={20} />
          <span>라이브 데모</span>
        </motion.a>
      )}

      {project.docsUrl && (
        <motion.a
          href={project.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackProjectClick(project.title, 'docs')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 apple-button border-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:border-purple-500 hover:text-purple-500"
          aria-label={`${project.title} 문서 보기`}
        >
          <FileText size={20} />
          <span>문서</span>
        </motion.a>
      )}
    </div>
  )
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const projects: Project[] = [
    {
      id: 1,
      title: 'Sensor Game Hub - 센서 게임 플랫폼',
      subtitle: '새로운 게임 경험의 창조',
      description: '모바일 센서를 활용한 게임 플랫폼입니다. 플레이 뿐 아니라, AI와 대화를 통해 게임 생성 및 유지보수 등 AI를 활용한 차세대 소프트웨어 개발 방법론을 제시합니다.',
      image: '/api/placeholder/800/500',
      category: '게임 플랫폼, AI',
      period: '2025.08 - 2025.10',
      team: '팀 프로젝트',
      technologies: ['Node.js', 'Socket.IO', 'Express.js', 'OpenAI API', 'Anthropic API', 'pgvector', 'Device Motion API', 'Railway'],
      features: [
        'AI와 멀티턴 대화를 통한 게임 생성 기능',
        'sonnet 4.5 model + 1M Token + Extended Thinking 사용하여 성능 극대화',
        '생성된 게임에 대한 기능/버그 수정 자동화',
        'ai 기반 대화형 매뉴얼 시스템(RAG)'
      ],
      achievements: [
        {
          title: 'Claude sonnet 4.5 model 1M Token, Extended Thinking 사용',
          description: '최신 LLM 모델, 구체적인 프롬프트 전략으로 AI를 검증된 프레임워크로 전환'
        },
        {
          title: '동시 접속자 10명 지원',
          description: 'Socket.IO를 활용한 실시간 멀티플레이어 게임 시스템 구현'
        },
        {
          title: '웹소켓 높은 연결 안정성',
          description: '재연결 로직과 heartbeat 시스템으로 안정적인 실시간 통신 보장'
        }
      ],
      troubleshooting: [
        {
          problem: 'ai api 불안정으로 인한 ai 서비스 제공 불가',
          solution: 'Anthropic Claude sonnet 4.5 + ChatGPT 4-turbo 풀백 시스템으로 안정성 강화',
          impact: 'ai 서비스 안정성 개선'
        },
        {
          problem: '센서 데이터 지연으로 인한 게임 반응성 저하',
          solution: '센서 데이터 버퍼링 및 예측 알고리즘 적용, 클라이언트 사이드 보간법 구현',
          impact: '게임 반응 속도 단축, 사용자 만족도 향상'
        },
        {
          problem: '다중 세션 관리 시 메모리 누수 문제',
          solution: '세션별 리소스 정리 자동화, 가비지 컬렉션 최적화, 메모리 사용량 모니터링 추가',
          impact: '메모리 사용량 감소, 서버 안정성 확보'
        }
      ],
      metrics: {
        codeLines: '15,000+',
        performance: '1,000+'
      },
      deployUrl: 'https://sensor.leejaewon.kr/',
      status: 'LIVE',
      color: 'from-orange-500 to-red-500',
      icon: <Smartphone className="w-8 h-8" />,
      featured: true,
      media: {
        images: [
          '/multimedias/sensor_game_hub/sensor_1.png',
          '/multimedias/sensor_game_hub/sensor_2.png',
          '/multimedias/sensor_game_hub/sensor_3.png',
          '/multimedias/sensor_game_hub/sonsor_4.png',
          '/multimedias/sensor_game_hub/sensor_5.png',
          '/multimedias/sensor_game_hub/sensor_6.png',
          '/multimedias/sensor_game_hub/sensor_7.png',
          '/multimedias/sensor_game_hub/sensor_8.png'
        ]
      }
    },
    {
      id: 2,
      title: 'Convi - 편의점 종합 솔루션',
      subtitle: '디지털 혁신으로 편의점을 재정의하다',
      description: '완전한 상용 수준의 편의점 통합 관리 플랫폼입니다. 고객, 점주, 본사가 실시간으로 연결되어 주문부터 재고 관리, 매출 분석까지 모든 비즈니스 프로세스를 자동화합니다.',
      image: '/api/placeholder/800/500',
      category: '웹 애플리케이션',
      period: '2025.08 - 2025.09',
      team: '팀 프로젝트',
      technologies: ['React 19', 'TypeScript', 'Supabase', 'TailwindCSS', '토스페이먼츠', 'Supabase Realtime', 'Render'],
      features: [
        '실시간 주문 및 재고 관리 시스템',
        '토스페이먼츠 결제 연동',
        '17개 테이블 엔터프라이즈급 데이터베이스',
        '본사-점주-고객 3자 실시간 통합 관리',
      ],
      achievements: [
        {
          title: '상용 수준 완성도 달성',
          description: '기획부터 배포까지 모든 과정을 완수하여 실제 서비스 가능한 수준으로 개발'
        },
        {
          title: '17개 데이터베이스 테이블 설계',
          description: '확장 가능한 엔터프라이즈급 데이터베이스 아키텍처 구축'
        },
        {
          title: '실시간 데이터 동기화 구현',
          description: 'Supabase Realtime을 활용한 실시간 주문 및 재고 관리 시스템'
        }
      ],
      troubleshooting: [
        {
          problem: 'RLS(Row Level Security) 정책 설정 복잡성',
          solution: 'Supabase의 RLS 정책을 사용자 역할별로 세분화하여 구현. 각 테이블마다 적절한 권한 설정으로 데이터 보안 강화',
          impact: '사용자별 데이터 접근 제어 100% 달성'
        },
        {
          problem: '실시간 데이터 동기화 성능 이슈',
          solution: 'Supabase Realtime을 활용한 선택적 구독 시스템 구현. 필요한 데이터만 실시간 업데이트하도록 최적화',
          impact: '실시간 업데이트 속도 개선'
        },
        {
          problem: '토스페이먼츠 결제 연동 중 상태 관리 복잡성',
          solution: 'React 상태 관리와 결제 상태를 동기화하는 커스텀 훅 개발. 결제 프로세스 전체를 추적 가능하게 구현',
          impact: '높은 결제 성공률 달성'
        }
      ],
      metrics: {
        codeLines: '25,000+',
        testCoverage: '85%',
        buildTime: '2.3min'
      },
      deployUrl: 'https://convi.minhyuk.kr',
      docsUrl: 'https://convi-final.onrender.com/wireframes/docs/index.html',
      status: 'LIVE',
      color: 'from-blue-500 to-indigo-600',
      icon: <Database className="w-8 h-8" />,
      featured: true,
      media: {
        videos: [
          'https://tvbpgddjvnhmhegchfpc.supabase.co/storage/v1/object/public/videos/SecondProjectPlay.mp4'
        ]
      }
    },
    {
      id: 3,
      title: 'VerseUp - 메타버스 학습 플랫폼',
      subtitle: '편하게 놀고 소통하는 웹 메타버스 학습 플랫폼',
      description: '학생, 강사, 학부모가 함께 참여하는 3D 메타버스 학습 플랫폼입니다. 웹 브라우저에서 바로 접속하여 3D 가상 교실에서 실시간 강의를 수강하고, 과제를 제출하며, 다른 학습자들과 소통할 수 있습니다.',
      image: '/api/placeholder/800/500',
      category: '교육 플랫폼, 메타버스',
      period: '2025.12 - 2026.01',
      team: '팀 프로젝트 (포지션 : 백엔드)',
      technologies: ['React 19', 'Three.js', 'React Three Fiber', 'Rapier', 'Socket.IO', 'WebRTC', 'Node.js', 'Express', 'Supabase', '토스페이먼츠', 'Zustand', 'TanStack Query'],
      features: [
        '3D 가상 교실에서 실시간 화상 강의 진행',
        'WebRTC 기반 실시간 스트리밍 및 화면 공유',
        '토스페이먼츠 연동 수강료 결제 시스템',
        '학부모 투명 모드로 실시간 수업 참관 기능'
      ],
      achievements: [
        {
          title: '3D 메타버스 환경 구축',
          description: 'Three.js와 React Three Fiber를 활용한 몰입형 3D 가상 교실 환경 구현'
        },
        {
          title: 'Rapier 물리 엔진 적용',
          description: '캐릭터 충돌 감지, 계단 오르기, 좌석 시스템 등 현실감 있는 물리 상호작용 구현'
        },
        {
          title: '실시간 멀티플레이어 동기화',
          description: 'Socket.IO 기반 플레이어 위치, 애니메이션, 채팅 실시간 동기화 시스템'
        }
      ],
      troubleshooting: [
        {
          problem: '다수 사용자 동시 접속 시 위치 동기화 지연',
          solution: 'Socket.IO 이벤트 최적화 및 보간법(Interpolation) 적용으로 부드러운 움직임 구현',
          impact: '동시 접속자 50명 이상 지원, 부드러운 실시간 동기화 달성'
        },
        {
          problem: 'WebRTC 연결 불안정으로 인한 화상 강의 끊김',
          solution: 'ICE Candidate 재협상 로직 및 TURN 서버 fallback 시스템 구현',
          impact: '화상 강의 연결 안정성 대폭 개선'
        },
        {
          problem: '3D 모델 로딩 시간으로 인한 초기 진입 지연',
          solution: 'GLTF 모델 압축, 프리로딩 시스템, 로딩 화면 UX 개선',
          impact: '초기 로딩 시간 단축, 사용자 경험 향상'
        }
      ],
      metrics: {
        codeLines: '20,000+',
        performance: '50+ 동시접속'
      },
      deployUrl: 'https://verseup.onrender.com/',
      status: 'BETA',
      color: 'from-purple-500 to-indigo-600',
      icon: <Globe className="w-8 h-8" />,
      featured: true
    },
    {
      id: 4,
      title: '워킹홀리데이 가계부',
      subtitle: '일본 워킹홀리데이 전문 가계부 웹앱',
      description: '일본 워킹홀리데이를 준비하거나 진행 중인 사용자를 위한 전문 가계부 웹 애플리케이션입니다. 실시간 환율 정보, 다중 통화 지원(KRW/USD/JPY), 초기비용 계산기 등 워킹홀리데이 특화 기능을 제공합니다.',
      image: '/api/placeholder/800/500',
      category: '핀테크, 생활',
      period: '2025.09 - 2025.11',
      team: '개인 프로젝트',
      technologies: ['React 19', 'TypeScript', 'Vite', 'Supabase', 'Tailwind CSS', 'Recharts', 'Google OAuth', 'ExchangeRate API', 'Vitest', 'Playwright'],
      features: [
        'KRW/USD/JPY 다중 통화 지원 및 실시간 환율 연동',
        '도쿄/오사카 지역별 초기비용 계산기 (16개 카테고리)',
        '월별 트렌드, 카테고리별 파이차트, 요일별 분석 통계',
        '고정지출 관리 및 저축 목표 설정 기능',
        '모바일/태블릿/데스크탑 완벽 반응형 지원'
      ],
      achievements: [
        {
          title: '다중 통화 실시간 환율 시스템',
          description: 'ExchangeRate API 연동으로 1시간마다 자동 갱신되는 실시간 환율 정보 제공'
        },
        {
          title: 'Supabase RLS 기반 데이터 보안',
          description: 'Row Level Security로 사용자별 데이터 완벽 격리 및 접근 제어 구현'
        },
        {
          title: '일본 초기비용 계산기 특화',
          description: '도쿄/오사카 지역별 차등 비용, 16개 카테고리 한일 병기 초기비용 계산 시스템'
        },
        {
          title: 'Google Analytics 4 사용자 분석',
          description: 'GA4로 사용자 흐름 및 이벤트 추적을 구현하여 서비스 개선에 활용'
        }
      ],
      troubleshooting: [
        {
          problem: '환율 API 호출 제한 및 실시간성 문제',
          solution: '1시간 간격 캐싱 시스템 구현, Context API로 전역 환율 상태 관리',
          impact: 'API 호출 횟수 95% 감소, 사용자 경험 유지'
        },
        {
          problem: '다중 통화 금액 계산 복잡성',
          solution: '모든 금액을 원화(KRW) 기준으로 환산 저장하는 정규화 전략 적용',
          impact: '통계 계산 로직 단순화, 일관된 데이터 관리'
        },
        {
          problem: '비로그인 사용자 데이터 처리',
          solution: 'sessionStorage 기반 임시 모드 구현, 로그인 시 데이터 마이그레이션 제공',
          impact: '진입 장벽 제거, 사용자 전환율 향상'
        }
      ],
      metrics: {
        codeLines: '12,000+',
        testCoverage: '80%'
      },
      deployUrl: 'https://working.jimin.it.kr',
      status: 'LIVE',
      color: 'from-green-500 to-teal-600',
      icon: <Wallet className="w-8 h-8" />,
      featured: true
    },
    {
      id: 5,
      title: 'Budget Tracker - 크로스플랫폼 가계부',
      subtitle: '웹 & 모바일 통합 재무 관리 앱',
      description: '워킹홀리데이 가계부의 핵심 가계부 기능을 분리하여 웹과 모바일 앱으로 확장한 크로스플랫폼 프로젝트입니다. pnpm + Turborepo 모노레포 구조로 React 웹과 React Native 모바일 간 코드를 공유하며, 실시간 환율, 고정지출, 저축 목표, 통계 대시보드 기능을 제공합니다.',
      image: '/api/placeholder/800/500',
      category: '핀테크, 모바일',
      period: '2025.10 - 2025.12',
      team: '개인 프로젝트',
      technologies: ['React 19', 'React Native', 'Expo SDK 54', 'TypeScript', 'Supabase', 'Tailwind CSS', 'NativeWind', 'Turborepo', 'pnpm', 'Recharts', 'Vitest', 'Playwright'],
      features: [
        '웹 + 모바일 크로스플랫폼 동시 지원',
        'pnpm + Turborepo 모노레포 아키텍처',
        '월별 카테고리 예산 관리 및 초과 알림',
        '저축 목표 설정 및 진행률 추적'
      ],
      achievements: [
        {
          title: '모노레포 아키텍처 구축',
          description: 'pnpm Workspaces + Turborepo로 웹/모바일/공유 패키지 통합 관리 시스템 구현'
        },
        {
          title: '크로스플랫폼 코드 공유',
          description: 'TypeScript 타입, 유틸리티 함수를 packages/shared로 분리하여 웹/모바일 간 100% 코드 재사용'
        },
        {
          title: 'Expo SDK 54 기반 모바일 앱',
          description: 'NativeWind로 Tailwind CSS 스타일 공유, Expo Router로 파일 기반 라우팅 구현'
        }
      ],
      troubleshooting: [
        {
          problem: '모노레포 환경에서 의존성 충돌 및 빌드 캐싱 문제',
          solution: 'pnpm hoisted 모드 설정, Turborepo 캐시 파이프라인 최적화, 패키지별 독립 빌드 스크립트 구성',
          impact: '빌드 시간 50% 단축, 의존성 충돌 해결'
        },
        {
          problem: 'React Native와 웹 간 스타일링 불일치',
          solution: 'NativeWind 4.0 도입으로 Tailwind CSS 클래스 통일, 플랫폼별 조건부 스타일링 추상화',
          impact: '웹/모바일 UI 일관성 확보, 스타일 코드 재사용률 향상'
        },
        {
          problem: 'Expo Go에서 Supabase 세션 유지 문제',
          solution: 'AsyncStorage 기반 세션 관리, 토큰 갱신 자동화 및 앱 재시작 시 복원 로직 구현',
          impact: '모바일 앱 인증 안정성 확보'
        }
      ],
      metrics: {
        codeLines: '15,000+',
        testCoverage: '75%'
      },
      deployUrl: '',
      status: 'DEVELOPMENT',
      color: 'from-cyan-500 to-blue-600',
      icon: <BarChart3 className="w-8 h-8" />,
      featured: false
    },
    {
      id: 6,
      title: 'MSA Analyzer',
      subtitle: 'MSA 아키텍처 분리 AI 분석 서비스',
      description: '사용자가 제공한 코드베이스 또는 프로젝트 설명을 Claude AI가 분석하여 최적의 MSA(Microservice Architecture) 서비스 분리 방안을 제안하는 웹 서비스입니다. RAG 파이프라인을 통해 MSA 가이드 문서를 검색하여 분석 품질을 향상시킵니다.',
      image: '/api/placeholder/800/500',
      category: 'AI, DevOps',
      period: '2025.12 - 진행중',
      team: '개인 프로젝트',
      technologies: ['React 19', 'Vite 7', 'Tailwind CSS 4', 'shadcn/ui', 'React Flow', 'Node.js 20', 'Express.js 4', 'Supabase', 'pgvector', 'Claude API', 'Voyage AI'],
      features: [
        'Claude Sonnet 4 모델을 활용한 지능형 MSA 설계 분석',
        'Voyage AI 임베딩 + pgvector 기반 RAG 파이프라인',
        'ZIP 파일 업로드 또는 텍스트 설명으로 분석 요청 가능',
        'React Flow 기반 MSA 구조 다이어그램 인터랙티브 시각화',
        'JSON 형식 분석 결과 내보내기로 AI 프로젝트 생성 연동'
      ],
      achievements: [
        {
          title: 'RAG 파이프라인 구현',
          description: 'Voyage AI voyage-3 모델과 pgvector를 활용한 MSA 가이드 문서 벡터 검색 시스템 구축'
        },
        {
          title: 'Claude API 비용 관리 시스템',
          description: '월간 한도 설정, 경고 임계값, 실시간 토큰 사용량 추적으로 API 비용 최적화'
        },
        {
          title: '문서 임베딩 CLI 도구 개발',
          description: 'Markdown 청킹 전략(H2/H3 기반 분할, 자동 태그 추출)을 적용한 문서 임베딩 자동화 스크립트'
        }
      ],
      troubleshooting: [
        {
          problem: 'Voyage AI 무료 플랜 Rate Limit(3 RPM) 제한',
          solution: '배치 처리(10개 청크씩)와 배치 간 21초 대기 시간 적용으로 Rate Limit 우회',
          impact: '안정적인 대용량 문서 임베딩 처리 가능'
        },
        {
          problem: 'Claude API 비용 급증 위험',
          solution: '요청별 토큰 사용량 추적, 월간 한도 설정, 경고 임계값 도달 시 API 호출 자동 거부',
          impact: '예산 내 안정적인 서비스 운영 보장'
        },
        {
          problem: 'MSA 분석 결과의 일관성 부족',
          solution: 'RAG 컨텍스트 추가로 MSA 가이드 문서 기반 분석 품질 향상, JSON 스키마 강제',
          impact: '분석 결과 품질 및 일관성 대폭 개선'
        }
      ],
      metrics: {
        codeLines: '8,000+',
        performance: 'RAG 검색'
      },
      deployUrl: 'https://msa-9gmc.onrender.com',
      status: 'BETA',
      color: 'from-violet-500 to-purple-600',
      icon: <Layers className="w-8 h-8" />,
      featured: false
    }
  ]


  // 성능 최적화: 메모이제이션
  const featuredProjects = useMemo(() => projects.filter(p => p.featured), [projects])
  const otherProjects = useMemo(() => projects.filter(p => !p.featured), [projects])

  // 콜백 메모이제이션
  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project)
    trackProjectClick(project.title, 'view_details')
  }, [])

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab)
  }, [])

  const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
      { id: 'overview', label: '개요', icon: <Layers size={16} /> },
      { id: 'achievements', label: '성과', icon: <Award size={16} /> },
      { id: 'troubleshooting', label: '트러블슈팅', icon: <Bug size={16} /> },
      { id: 'metrics', label: '지표', icon: <TrendingUp size={16} /> }
    ]

    const renderTabContent = () => {
      switch (activeTab) {
        case 'overview':
          return (
            <div className="space-y-6">
              {/* 미디어 섹션 (이미지 & 영상) */}
              {(project.media?.images || project.media?.videos) && (
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-apple-dark dark:text-white mb-4 flex items-center">
                    <ImageIcon className="mr-2" size={20} />
                    프로젝트 미디어
                  </h4>

                  {/* 이미지 갤러리 */}
                  {project.media.images && project.media.images.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-apple-gray-600 dark:text-apple-gray-400 mb-3">
                        프로젝트 스크린샷
                      </h5>
                      <ImageGallery images={project.media.images} />
                    </div>
                  )}

                  {/* 영상 플레이어 */}
                  {project.media.videos && project.media.videos.length > 0 && (
                    <div className="mt-6">
                      <h5 className="text-sm font-medium text-apple-gray-600 dark:text-apple-gray-400 mb-3">
                        데모 영상
                      </h5>
                      <VideoPlayer videos={project.media.videos} />
                    </div>
                  )}
                </div>
              )}

              <div>
                <h4 className="text-xl font-semibold text-apple-dark dark:text-white mb-4 flex items-center">
                  <Layers className="mr-2" size={20} />
                  프로젝트 개요
                </h4>
                <p className="text-apple-gray-600 dark:text-apple-gray-300 leading-relaxed text-lg mb-6">
                  {project.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-apple-gray-500 dark:text-apple-gray-400">
                      <Users className="mr-2" size={16} />
                      <span className="font-medium mr-2">팀:</span>
                      <span>{project.team}</span>
                    </div>
                    <div className="flex items-center text-sm text-apple-gray-500 dark:text-apple-gray-400">
                      <Clock className="mr-2" size={16} />
                      <span className="font-medium mr-2">기간:</span>
                      <span>{project.period}</span>
                    </div>
                    <div className="flex items-center text-sm text-apple-gray-500 dark:text-apple-gray-400">
                      <Star className="mr-2" size={16} />
                      <span className="font-medium mr-2">상태:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'LIVE' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        project.status === 'BETA' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-apple-dark dark:text-white mb-3">주요 기능</h5>
                    <div className="space-y-2">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-apple-gray-600 dark:text-apple-gray-300">
                          <CheckCircle className="mr-2 text-green-500" size={14} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-apple-dark dark:text-white mb-3">기술 스택</h5>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-700 dark:text-apple-gray-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        
        case 'achievements':
          return (
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-apple-dark dark:text-white mb-4 flex items-center">
                <Award className="mr-2" size={20} />
                주요 성과
              </h4>
              {project.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-apple-gray-50 dark:bg-apple-gray-800 rounded-xl border border-apple-gray-200 dark:border-apple-gray-700"
                >
                  <h5 className="font-semibold text-apple-dark dark:text-white mb-2 flex items-center">
                    <CheckCircle className="mr-2 text-green-500" size={16} />
                    {achievement.title}
                  </h5>
                  <p className="text-apple-gray-600 dark:text-apple-gray-300 leading-relaxed">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )
        
        case 'troubleshooting':
          return (
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-apple-dark dark:text-white mb-4 flex items-center">
                <Bug className="mr-2" size={20} />
                문제 해결 사례
              </h4>
              {project.troubleshooting.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-apple-gray-50 dark:bg-apple-gray-800 rounded-xl border border-apple-gray-200 dark:border-apple-gray-700"
                >
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-red-600 dark:text-red-400 mb-2">문제</h5>
                      <p className="text-apple-gray-700 dark:text-apple-gray-300">{item.problem}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">해결책</h5>
                      <p className="text-apple-gray-700 dark:text-apple-gray-300">{item.solution}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-green-600 dark:text-green-400 mb-2">결과</h5>
                      <p className="text-apple-gray-700 dark:text-apple-gray-300">{item.impact}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        
        case 'metrics':
          return (
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-apple-dark dark:text-white mb-4 flex items-center">
                <TrendingUp className="mr-2" size={20} />
                프로젝트 지표
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-4 bg-apple-gray-50 dark:bg-apple-gray-800 rounded-xl border border-apple-gray-200 dark:border-apple-gray-700"
                  >
                    <div className="text-2xl font-bold text-apple-blue mb-2">{value}</div>
                    <div className="text-sm text-apple-gray-600 dark:text-apple-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        
        default:
          return null
      }
    }

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-apple-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="p-6 border-b border-apple-gray-200 dark:border-apple-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${project.color} text-white`}>
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-apple-dark dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-apple-gray-600 dark:text-apple-gray-300">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 rounded-full transition-colors"
                >
                  <X size={24} className="text-apple-gray-600 dark:text-apple-gray-400" />
                </button>
              </div>
              
              {/* 탭 네비게이션 */}
              <div className="flex space-x-1 mt-6 bg-apple-gray-100 dark:bg-apple-gray-800 rounded-xl p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-apple-gray-700 text-apple-blue shadow-sm'
                        : 'text-apple-gray-600 dark:text-apple-gray-400 hover:text-apple-blue'
                    }`}
                  >
                    {tab.icon}
                    <span className="ml-2">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 모달 콘텐츠 */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {renderTabContent()}
            </div>

            {/* 모달 푸터 */}
            <div className="p-6 border-t border-apple-gray-200 dark:border-apple-gray-700 bg-apple-gray-50 dark:bg-apple-gray-800">
              <ProjectActions
                project={project}
                onViewDetails={() => {}}
                showViewDetails={false}
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <section id="projects" className="py-20 bg-white dark:bg-apple-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-apple-dark dark:text-white mb-6">
            주요 <span className="text-gradient-apple">프로젝트</span>
          </h2>
          <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 max-w-3xl mx-auto">
            상용 수준의 웹 서비스들을 소개합니다. 각 프로젝트를 클릭하여 상세 정보를 확인할 수 있습니다.
          </p>
        </motion.div>

        {/* 주요 프로젝트 */}
        <div className="space-y-32 mb-32">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* 프로젝트 이미지 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative cursor-pointer ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                  {/* 상태 배지 */}
                  <div className="absolute top-4 left-4 z-10">
                    <StatusBadge status={project.status} />
                  </div>
                  

                  {/* 이미지 플레이스홀더 */}
                  <div className={`aspect-video bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <div className="text-white text-center">
                      <div className="mb-4">{project.icon}</div>
                      <div className="text-2xl font-bold">{project.title}</div>
                      <div className="text-lg opacity-80">{project.subtitle}</div>
                    </div>
                  </div>
                  
                  {/* 호버 오버레이 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-center">
                      <Play className="w-16 h-16 mx-auto mb-2" />
                      <p className="font-semibold">상세 정보 보기</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 프로젝트 정보 */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
              >
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-apple-dark dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className={`text-lg font-medium bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-4`}>
                    {project.subtitle}
                  </p>
                  <p className="text-apple-gray-600 dark:text-apple-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* 주요 기능 미리보기 */}
                <div>
                  <h4 className="text-lg font-semibold text-apple-dark dark:text-white mb-3">
                     주요 기능
                  </h4>
                  <ul className="space-y-2">
                    {project.features.slice(0, 4).map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center text-apple-gray-600 dark:text-apple-gray-300"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  {project.features.length > DISPLAY_LIMITS.MAIN_FEATURES && (
                    <button
                      onClick={() => handleProjectSelect(project)}
                      className="text-apple-blue hover:text-apple-blue/80 text-sm mt-2 flex items-center"
                    >
                      +{project.features.length - DISPLAY_LIMITS.MAIN_FEATURES}개 더 보기
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                  )}
                </div>

                {/* 기술 스택 미리보기 */}
                <div>
                  <h4 className="text-lg font-semibold text-apple-dark dark:text-white mb-3">
                     기술 스택
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, DISPLAY_LIMITS.MAIN_TECHNOLOGIES).map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: techIndex * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-700 dark:text-apple-gray-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > DISPLAY_LIMITS.MAIN_TECHNOLOGIES && (
                      <span className="px-3 py-1 bg-apple-gray-200 dark:bg-apple-gray-600 text-apple-gray-600 dark:text-apple-gray-400 rounded-full text-sm">
                        +{project.technologies.length - DISPLAY_LIMITS.MAIN_TECHNOLOGIES}
                      </span>
                    )}
                  </div>
                </div>

                {/* 액션 버튼들 */}
                <ProjectActions
                  project={project}
                  onViewDetails={() => handleProjectSelect(project)}
                  showViewDetails={true}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* 기타 프로젝트 */}
        {otherProjects.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-apple-dark dark:text-white mb-12 text-center"
            >
              기타 프로젝트
            </motion.h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-apple-gray-50 dark:bg-apple-gray-800 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border border-apple-gray-200 dark:border-apple-gray-700"
                  onClick={() => handleProjectSelect(project)}
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${project.color} text-white flex-shrink-0`}>
                      {project.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl font-bold text-apple-dark dark:text-white mb-1">
                        {project.title}
                      </h4>
                      <p className="text-apple-gray-600 dark:text-apple-gray-300 text-sm mb-2">
                        {project.subtitle}
                      </p>
                      <StatusBadge status={project.status} />
                    </div>
                  </div>
                  
                  <p className="text-apple-gray-600 dark:text-apple-gray-400 text-sm leading-relaxed mb-4">
                    {project.description.length > DISPLAY_LIMITS.DESCRIPTION_LENGTH
                      ? `${project.description.substring(0, DISPLAY_LIMITS.DESCRIPTION_LENGTH)}...`
                      : project.description
                    }
                  </p>
                  
                  <div className="mb-4">
                    <TechStack
                      technologies={project.technologies}
                      maxItems={DISPLAY_LIMITS.CARD_TECHNOLOGIES}
                      variant="compact"
                    />
                  </div>

                  <div className="flex justify-end">
                    <div className="text-apple-blue hover:text-apple-blue/80 text-sm font-medium">
                      상세 보기 →
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 하단 Call-to-Action */}
      </div>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => {
            setSelectedProject(null)
            setActiveTab('overview')
          }}
        />
      )}
    </section>
  )
}

export default Projects