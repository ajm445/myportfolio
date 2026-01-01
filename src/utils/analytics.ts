import ReactGA from 'react-ga4'

// GA4 측정 ID (환경 변수에서 가져오기)
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID

/**
 * Google Analytics 초기화
 * @returns boolean - 초기화 성공 여부
 */
export const initGA = (): boolean => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('GA4 Measurement ID가 설정되지 않았습니다.')
    return false
  }

  try {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      gaOptions: {
        // 쿠키 설정
        cookieFlags: 'SameSite=None;Secure',
      },
      gtagOptions: {
        // 익명화 IP 설정 (프라이버시 보호)
        anonymize_ip: true,
      },
    })

    console.log('Google Analytics 초기화 완료')
    return true
  } catch (error) {
    console.error('Google Analytics 초기화 실패:', error)
    return false
  }
}

/**
 * 페이지뷰 이벤트 전송
 * @param path - 페이지 경로
 * @param title - 페이지 제목 (선택)
 */
export const trackPageView = (path: string, title?: string) => {
  if (!GA_MEASUREMENT_ID) return

  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  })
}

/**
 * 커스텀 이벤트 전송
 * @param category - 이벤트 카테고리
 * @param action - 이벤트 액션
 * @param label - 이벤트 라벨 (선택)
 * @param value - 이벤트 값 (선택)
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (!GA_MEASUREMENT_ID) return

  ReactGA.event({
    category,
    action,
    label,
    value,
  })
}

/**
 * 프로젝트 클릭 이벤트 추적
 * @param projectName - 프로젝트 이름
 * @param action - 액션 ('view_details' | 'live_demo' | 'github' | 'docs')
 */
export const trackProjectClick = (
  projectName: string,
  action: 'view_details' | 'live_demo' | 'github' | 'docs'
) => {
  trackEvent('Project', action, projectName)
}

/**
 * 연락처 버튼 클릭 이벤트 추적
 * @param type - 연락 방법 ('email' | 'github' | 'linkedin' | 'phone')
 */
export const trackContactClick = (type: 'email' | 'github' | 'linkedin' | 'phone') => {
  trackEvent('Contact', 'click', type)
}

/**
 * 다크모드 토글 이벤트 추적
 * @param isDarkMode - 다크모드 활성화 여부
 */
export const trackDarkModeToggle = (isDarkMode: boolean) => {
  trackEvent('UI', 'dark_mode_toggle', isDarkMode ? 'dark' : 'light')
}

/**
 * 네비게이션 클릭 이벤트 추적
 * @param section - 섹션 이름
 */
export const trackNavigation = (section: string) => {
  trackEvent('Navigation', 'click', section)
}

/**
 * 외부 링크 클릭 이벤트 추적
 * @param url - 외부 링크 URL
 * @param label - 링크 라벨 (선택)
 */
export const trackExternalLink = (url: string, label?: string) => {
  trackEvent('External Link', 'click', label || url)
}
