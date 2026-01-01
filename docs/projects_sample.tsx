import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useCallback } from 'react'
import {
  ExternalLink,
  Play,
  Database,
  Brain,
  Smartphone,
  Code2,
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
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Image as ImageIcon
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
  githubUrl: string
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
      team: '팀 프로젝트 (포지션 : 팀 리더)',
      technologies: ['Node.js', 'Socket.IO', 'Express.js', 'OpenAI API', 'Anthropic API','pgvector', 'WebSocket', 'QR Code', 'Device Motion API', 'Railway'],
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
      deployUrl: 'https://aihub.minhyuk.kr',
      githubUrl: 'https://github.com/cmhblue1225/sensorchatbot',
      status: 'LIVE',
      color: 'from-orange-500 to-red-500',
      icon: <Smartphone className="w-8 h-8" />,
      featured: true,
      media: {
        images: [
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/sensorgamehub/sensor_1.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/sensorgamehub/sensor_2.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/sensorgamehub/sensor_3.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/sensorgamehub/sensor_4.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/sensorgamehub/sensor_5.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/sensorgamehub/sensor_6.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/sensorgamehub/sensor_7.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/sensorgamehub/sensor_8.png'
        ]
      }
    },
    {
      id: 2,
      title: 'Synapse AI - 지능형 지식 관리 시스템',
      subtitle: '개인 지식을 구조화하고 관리하는 차세대 AI 기반 시스템',
      description: '완전 자동화된 PDF 처리, AI 요약, 벡터 검색, 실시간 지식 그래프를 제공하는 혁신적인 지식 관리 플랫폼입니다. Supabase Edge Functions와 OpenAI를 활용한 엔터프라이즈급 솔루션입니다.',
      image: '/api/placeholder/800/500',
      category: 'AI 서비스, 지식 관리',
      period: '2025.09 - 현재',
      team: '개인 프로젝트',
      technologies: ['React 19', 'TypeScript', 'Supabase', 'OpenAI API', 'pgvector', 'D3.js', 'TailwindCSS', 'Vite', 'Netlify'],
      features: [
        'AI 기반 PDF 자동 텍스트 추출 및 요약 생성',
        'AI 기반 암기 노트, 퀴즈 생성 등 학습 기능 제공',
        '개인 지식 기반 AI 채팅 및 질의응답',
        'pgvector를 활용한 벡터 의미 검색 시스템'
      ],
      achievements: [
        {
          title: '혁신적 AI 통합 시스템 구축',
          description: 'OpenAI GPT-4o-mini와 임베딩 모델을 활용한 완전 자동화 지식 처리 시스템 구현'
        },
        {
          title: '엔터프라이즈급 아키텍처 설계',
          description: 'Supabase + pgvector를 활용한 확장 가능한 서버리스 백엔드 아키텍처 구축'
        },
        {
          title: '프로덕션 배포 및 운영',
          description: 'Netlify를 통한 실제 서비스 배포 완료 및 라이브 운영 중'
        }
      ],
      troubleshooting: [
        {
          problem: 'PDF 클라이언트 사이드 처리의 CSP 제약 문제',
          solution: 'Supabase Edge Functions를 활용한 서버사이드 PDF 텍스트 추출 시스템 구현',
          impact: '안정적이고 확장 가능한 PDF 처리 아키텍처 완성'
        },
        {
          problem: '대용량 벡터 데이터의 검색 성능 최적화',
          solution: 'pgvector 인덱스 최적화 및 하이브리드 검색 알고리즘 구현',
          impact: '의미 검색 정확도 및 속도 향상'
        },
        {
          problem: 'OpenAI API 비용 최적화 및 응답 속도 개선',
          solution: '텍스트 청킹, 캐싱 전략, 효율적 모델 선택으로 비용 및 성능 최적화',
          impact: 'API 호출 비용 절감 및 사용자 경험 향상'
        }
      ],
      metrics: {
        codeLines: '15,000+',
        testCoverage: '85%',
        buildTime: '2min'
      },
      deployUrl: 'https://synapse.minhyuk.kr',
      githubUrl: 'https://github.com/cmhblue1225/synapse-supabase',
      status: 'LIVE',
      color: 'from-purple-500 to-indigo-600',
      icon: <Brain className="w-8 h-8" />,
      featured: true,
      media: {
        images: [
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/synapse/synapse_1.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/synapse/synapse_2.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/synapse/synapse_3.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/synapse/synapse_4.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/synapse/synapse_5.png'
        ]
      }
    },
    {
      id: 3,
      title: 'Convi - 편의점 종합 솔루션',
      subtitle: '디지털 혁신으로 편의점을 재정의하다',
      description: '완전한 상용 수준의 편의점 통합 관리 플랫폼입니다. 고객, 점주, 본사가 실시간으로 연결되어 주문부터 재고 관리, 매출 분석까지 모든 비즈니스 프로세스를 자동화합니다.',
      image: '/api/placeholder/800/500',
      category: '웹 애플리케이션',
      period: '2025.08 - 2025.09',
      team: '팀 프로젝트',
      technologies: ['React 19', 'TypeScript', 'Supabase', 'TailwindCSS', '토스페이먼츠', 'PostgreSQL', 'RLS', 'Render'],
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
      githubUrl: 'https://github.com/cmhblue1225/convi',
      docsUrl: 'https://convi-final.onrender.com/wireframes/docs/index.html',
      status: 'LIVE',
      color: 'from-blue-500 to-indigo-600',
      icon: <Database className="w-8 h-8" />,
      featured: true,
      media: {
        videos: [
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/convi/convi-demo.mp4'
        ]
      }
    },
    {
      id: 4,
      title: '한 숨의 위로 - 감정 AI 상담 서비스',
      subtitle: '감정을 이해하는 인공지능 상담사',
      description: 'OpenAI GPT API를 활용한 감정 분석 및 AI 상담 서비스입니다. 사용자의 일기를 분석하여 감정 상태를 파악하고, 일기를 기반으로 상담 및 맞춤형 피드백과 음악 추천을 제공합니다.',
      image: '/api/placeholder/800/500',
      category: 'AI 서비스',
      period: '2025.03 - 2025.04',
      team: '개인 프로젝트',
      technologies: ['Vanilla JavaScript', 'Node.js', 'OpenAI GPT-4', 'Supabase', 'Spotify API', 'Express.js', 'Netlify', 'Render'],
      features: [
        'GPT-4 기반 고도화된 감정 분석',
        '커뮤니티 일기 공유 및 피드백',
        '자살·극단적 표현을 자동 감지해 위로 메시지와 상담 연락처를 안내하는 안전 대응 기능',
        '주간/월간 감정 패턴 분석',
      ],
      achievements: [
        {
          title: '완성도 100% 달성',
          description: '기획부터 배포까지 모든 기능을 완벽하게 구현하여 실서비스 운영 가능'
        },
        {
          title: '높은 감정 분석 정확도',
          description: '프롬프트 엔지니어링을 통해 한국어 특화 감정 분석 시스템 구축'
        },
        {
          title: 'Spotify API 음악 매칭',
          description: '사용자 감정에 맞는 맞춤형 음악 추천 기능'
        }
      ],
      troubleshooting: [
        {
          problem: 'OpenAI API 응답 속도 지연 문제',
          solution: 'API 요청을 청크 단위로 분할하고 스트리밍 방식으로 응답받도록 개선. 로딩 상태 UX 강화',
          impact: '응답 속도 향상, 사용자 이탈률 감소'
        },
        {
          problem: '감정 분석 정확도 편차 이슈',
          solution: '프롬프트 엔지니어링을 통해 일관된 감정 분석 결과 도출. 한국어 특화 프롬프트 설계',
          impact: '감정 분석 정확도 향상'
        },
        {
          problem: 'Spotify API 토큰 만료 및 재발급 처리',
          solution: '토큰 갱신 자동화 시스템 구축. Redis를 활용한 토큰 캐싱 및 백그라운드 갱신',
          impact: '음악 추천 서비스 가용성 향상'
        }
      ],
      metrics: {
        codeLines: '18,000+'
      },
      deployUrl: 'https://diary.minhyuk.kr',
      githubUrl: 'https://github.com/cmhblue1225/newmind1',
      status: 'LIVE',
      color: 'from-emerald-500 to-teal-600',
      icon: <Brain className="w-8 h-8" />,
      featured: true,
      media: {
        images: [
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/diary/diary_1.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/diary/diary_2.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/diary/diary_3.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/diary/diary_4.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/diary/diary_5.png',
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/diary/diary_6.png'
        ]
      }
    },
    {
      id: 5,
      title: '독독 (DockDock) - 독서 관리 플랫폼',
      subtitle: '똑똑한 독서 습관, 독독하자',
      description: '독서 기록, 진행 상황 추적, AI 기반 맞춤 책 추천까지 제공하는 종합 독서 관리 플랫폼입니다. React와 Supabase, OpenAI api를 활용한 웹 플랫폼 서비스입니다.',
      image: '/api/placeholder/800/500',
      category: '독서 관리, AI 추천',
      period: '2025.10 - 현재',
      team: '개인 프로젝트 (iOS 협업)',
      technologies: ['OpenAI GPT-4o', 'React 19', 'TypeScript', 'Node.js', 'Express', 'Supabase', 'TanStack Query', 'Zustand', 'Tailwind CSS', 'Aladin API', 'Swagger', 'Railway', 'Netlify'],
      features: [
        '알라딘 API 연동 국내 전체 도서 검색',
        '독서 진행률 추적 및 기록 시스템',
        'AI 기반 개인화 도서 추천 (OpenAI GPT-4o)',
        '독서 통계 및 분석 대시보드'
      ],
      achievements: [
        {
          title: 'MVP 프로덕션 배포 완료',
          description: '웹과 iOS를 위한 RESTful API 완전 구축 및 Railway/Netlify 배포 완료'
        },
        {
          title: 'API-First 설계 완성',
          description: '모든 엔드포인트에 Swift 구현 예시를 포함한 완벽한 Swagger 문서화로 iOS 개발자 협업 최적화'
        },
        {
          title: 'AI 추천 시스템 구현',
          description: 'OpenAI GPT-4o를 활용한 개인화 추천, 트렌딩 책, 유사 책 추천 시스템 및 24시간 캐싱 최적화'
        }
      ],
      troubleshooting: [
        {
          problem: '추천 API와 책 상세 API 간 ID 불일치 문제',
          solution: 'books 테이블에 aladin_id 컬럼 추가, 추천 응답에 aladinId 필드 포함하여 프론트엔드에서 유연하게 처리',
          impact: 'API 일관성 확보 및 프론트엔드 에러 완전 해결'
        },
        {
          problem: '소셜 로그인 iOS 연동 복잡성',
          solution: 'Supabase Auth를 활용한 통합 인증 시스템 구축, ID Token 기반 소셜 로그인 API 엔드포인트 추가',
          impact: 'Apple/Kakao 로그인 iOS 연동 완성'
        },
        {
          problem: 'AI 추천 성능 및 비용 최적화',
          solution: 'Redis 기반 24시간 캐싱 시스템, 청크 단위 텍스트 처리, 효율적 GPT 모델 선택 전략',
          impact: 'API 응답 속도 개선 및 OpenAI 비용 절감'
        }
      ],
      metrics: {
        codeLines: '20,000+',
        buildTime: '2.5min'
      },
      deployUrl: 'https://dockdock.minhyuk.kr',
      githubUrl: 'https://github.com/cmhblue1225/dockdock',
      docsUrl: 'https://dockdock-production.up.railway.app/api-docs',
      status: 'LIVE',
      color: 'from-green-500 to-emerald-600',
      icon: <BookOpen className="w-8 h-8" />,
      featured: true,
      media: {
        videos: [
          'https://ddilbfhvzadnlaabjfdr.supabase.co/storage/v1/object/public/project-media/dockdock/dockdock-demo-muted.mp4'
        ]
      }
    },
    {
      id: 6,
      title: 'ReviseAI - AI 코드 리뷰 도구',
      subtitle: 'AI가 제안하는 더 나은 코드',
      description: 'OpenAI API를 활용한 자동 코드 리뷰 및 최적화 제안 도구입니다. 코드 품질 향상과 베스트 프랙티스 준수를 위한 AI 어시스턴트 역할을 합니다.',
      image: '/api/placeholder/800/500',
      category: 'AI 도구',
      period: '2025.09 - 진행중',
      team: '개인 프로젝트',
      technologies: ['Python', 'FastAPI', 'OpenAI API', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
      features: [
        'AI 기반 자동 코드 리뷰',
        '성능 최적화 제안',
        '코드 품질 점수 산출',
        '베스트 프랙티스 가이드',
        '다중 프로그래밍 언어 지원',
        '실시간 코드 분석',
        '팀 협업 리포트 생성',
        'IDE 플러그인 제공'
      ],
      achievements: [
        {
          title: 'MVP 버전 완성',
          description: '핵심 기능이 포함된 최소 기능 제품(MVP) 개발 완료'
        },
        {
          title: '5개 언어 지원',
          description: 'Python, JavaScript, Java, C++, Go 등 주요 프로그래밍 언어 분석 지원'
        },
        {
          title: '높은 AI 분석 정확도',
          description: 'OpenAI GPT 모델을 활용한 코드 품질 분석 정확도 달성'
        }
      ],
      troubleshooting: [
        {
          problem: '대용량 코드 파일 처리 시 메모리 부족',
          solution: '청크 단위 코드 분석 시스템 구현, 스트리밍 방식 데이터 처리 적용',
          impact: '10MB 이상 파일 처리 가능, 메모리 사용량 절감'
        },
        {
          problem: '다양한 프로그래밍 언어별 문법 분석 복잡성',
          solution: 'Tree-sitter 파서 활용한 언어별 AST 생성, 공통 분석 인터페이스 구축',
          impact: '언어별 분석 정확도 통일, 새 언어 추가 시간 단축'
        }
      ],
      metrics: {
        codeLines: '12,000+',
        testCoverage: '5',
        performance: '88%'
      },
      deployUrl: '#',
      githubUrl: 'https://github.com/cmhblue1225/reviseAI',
      status: 'DEVELOPMENT',
      color: 'from-purple-500 to-pink-500',
      icon: <Code2 className="w-8 h-8" />,
      featured: false
    },
    {
      id: 7,
      title: 'AI Doc Generator - 문서 자동 생성',
      subtitle: '개발자를 위한 스마트 문서 도구',
      description: 'Next.js와 AI를 결합한 개발 문서 자동 생성 도구입니다. 코드 주석과 구조를 분석하여 API 문서, README, 기술 명세서를 자동으로 생성합니다.',
      image: '/api/placeholder/800/500',
      category: '문서화 도구',
      period: '2025.04 - 2024.07',
      team: '개인 프로젝트',
      technologies: ['Next.js 14', 'TypeScript', 'OpenAI API', 'Tailwind CSS', 'Prisma', 'Vercel', 'Markdown'],
      features: [
        'AI 기반 자동 문서 생성',
        '다양한 문서 템플릿 제공',
        '저장소 연동',
        'Markdown 실시간 미리보기',
        'PDF/HTML 내보내기',
        '문서 버전 관리',
        '팀 협업 기능',
        'API 문서 자동 생성'
      ],
      achievements: [
        {
          title: '베타 버전 완성',
          description: '핵심 기능이 모두 구현된 베타 버전 출시 완료'
        },
        {
          title: '10가지 문서 템플릿 제공',
          description: 'README, API 문서, 기술 명세서 등 다양한 개발 문서 템플릿 제공'
        },
        {
          title: '저장소 100% 연동',
          description: 'API를 완전히 활용하여 저장소 정보 자동 추출 및 문서 생성'
        }
      ],
      troubleshooting: [
        {
          problem: 'API 요청 제한으로 인한 데이터 수집 지연',
          solution: 'API 요청 캐싱 시스템 구축, 배치 처리로 요청 최적화',
          impact: 'API 요청량 50% 감소, 문서 생성 속도 2배 향상'
        },
        {
          problem: '복잡한 코드 구조 분석 시 AI 응답 불안정성',
          solution: '코드 복잡도 측정 후 단계별 분석, 프롬프트 최적화 및 fallback 로직 추가',
          impact: '문서 생성 성공률 95% 달성'
        }
      ],
      metrics: {
        codeLines: '8,000+',
        testCoverage: '10',
        performance: '30s'
      },
      deployUrl: '#',
      githubUrl: 'https://github.com/cmhblue1225/ai-doc-generator',
      status: 'BETA',
      color: 'from-cyan-500 to-blue-500',
      icon: <FileText className="w-8 h-8" />,
      featured: false
    },
    {
      id: 8,
      title: 'Trading Intelligence - AI 트레이딩 플랫폼',
      subtitle: '시니어를 위한 실시간 AI 주식 분석 서비스',
      description: '시니어 투자자를 위해 설계된 AI 기반 실시간 주식 분석 플랫폼입니다. WebSocket 기반 1초 단위 주가 갱신, Claude AI와 OpenAI 오케스트레이션을 통한 종합 분석, TTS 음성 알림으로 투자 의사결정을 지원합니다.',
      image: '/api/placeholder/800/500',
      category: 'AI 서비스, Fintech',
      period: '2025.10 - 현재',
      team: '개인 프로젝트',
      technologies: ['Claude AI', 'OpenAI API', 'React 19', 'TypeScript', 'Python', 'FastAPI', 'Supabase', 'Redis', 'Socket.IO', 'WebSocket', 'TailwindCSS 4', 'Zustand', 'Recharts', 'KIS API', 'Railway'],
      features: [
        '뉴스 크롤링 + AI 감성 분석 + 기술적 지표 기반 종합 레포트 생성',
        'Claude + OpenAI 오케스트레이션 AI 분석',
        '보유/관심 주식 자동 모니터링',
        'TTS 음성 알림 + 실시간 토스트 알림',
      ],
      achievements: [
        {
          title: '엔터프라이즈급 마이크로서비스 구축',
          description: '6개 독립 서비스(Frontend, Stream, AI, News Crawler, Report, Alert)를 Railway에 배포하여 확장 가능한 아키텍처 완성'
        },
        {
          title: 'AI 오케스트레이션 시스템 구현',
          description: 'Claude AI(메인)와 OpenAI(폴백) 이중화 시스템으로 안정적인 AI 분석 제공 및 비용 최적화'
        },
        {
          title: '실시간 시스템 최적화',
          description: 'WebSocket + Redis Pub/Sub 조합으로 1초 단위 주가 갱신 및 TTS 알림 자동화 달성'
        },
        {
          title: '시니어 접근성 특화 설계',
          description: '큰 폰트(18px+), 고대비 모드, 음성 읽기(TTS) 지원으로 시니어 사용자 경험 최적화'
        }
      ],
      troubleshooting: [
        {
          problem: 'WebSocket 연결 불안정 및 KIS API Rate Limit 문제',
          solution: 'Redis Pub/Sub 메시지 브로커 도입, 토큰 캐싱(.kis-token-cache.json), 재연결 로직 강화',
          impact: 'WebSocket 연결 안정성 향상, API 호출 횟수 절감'
        },
        {
          problem: 'AI API 비용 및 응답 속도 최적화 필요',
          solution: 'Claude(메인) + OpenAI(폴백) 오케스트레이션, Redis 24시간 캐싱, 효율적 프롬프트 설계',
          impact: 'AI 분석 비용 50% 절감, 응답 속도 개선'
        },
        {
          problem: 'Supabase RLS 정책으로 인한 데이터 접근 제어 문제',
          solution: 'JWT 토큰 기반 인증 시스템 구축, 사용자별 RLS 정책 세분화, Service Key와 Anon Key 분리',
          impact: '사용자별 데이터 보안 100% 달성, 인증 시스템 안정화'
        },
        {
          problem: '다수 마이크로서비스 배포 및 환경 변수 관리 복잡도',
          solution: 'Railway 서비스 간 참조(${{service.VAR}}) 활용, 자동 배포 파이프라인 구축, 통합 환경 변수 관리',
          impact: '배포 시간 단축, 환경 설정 오류 제거'
        }
      ],
      metrics: {
        codeLines: '30,000+',
        buildTime: '3~5min',
        performance: '1s'
      },
      deployUrl: 'https://jusik.minhyuk.kr',
      githubUrl: '#',
      status: 'LIVE',
      color: 'from-indigo-500 to-purple-600',
      icon: <TrendingUp className="w-8 h-8" />,
      featured: true
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
                      {project.features.slice(0, DISPLAY_LIMITS.MAIN_FEATURES).map((feature, index) => (
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