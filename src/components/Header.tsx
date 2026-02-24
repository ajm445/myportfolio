import { motion } from 'framer-motion'
import { Sun, Moon, Menu, X, Download } from 'lucide-react'
import { useState } from 'react'
import { trackDarkModeToggle, trackNavigation, trackPdfDownload } from '../utils/analytics'

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: '홈', href: '#hero' },
    { name: '소개', href: '#about' },
    { name: '프로젝트', href: '#projects' },
    { name: '기술', href: '#skills' },
    { name: '연락처', href: '#contact' }
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // 네비게이션 클릭 이벤트 추적
      trackNavigation(href.replace('#', ''))
    }
    setIsMenuOpen(false)
  }

  const handleDarkModeToggle = () => {
    toggleDarkMode()
    // 다크모드 토글 이벤트 추적
    trackDarkModeToggle(!darkMode)
  }

  const handlePrint = () => {
    trackPdfDownload()
    window.print()
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-apple-dark dark:text-white"
          >
            안지민의 포트폴리오
          </motion.div>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-apple-gray-600 dark:text-apple-gray-300 hover:text-apple-blue dark:hover:text-apple-blue transition-colors duration-200"
              >
                {item.name}
              </motion.button>
            ))}

            {/* 다크모드 토글 */}
            <motion.button
              onClick={handleDarkModeToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-600 dark:text-apple-gray-300 hover:text-apple-blue dark:hover:text-apple-blue transition-all duration-200"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* PDF 다운로드 */}
            <motion.button
              onClick={handlePrint}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-print-hide="true"
              className="p-2 rounded-full bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-600 dark:text-apple-gray-300 hover:text-apple-blue dark:hover:text-apple-blue transition-all duration-200"
              aria-label="PDF로 저장"
            >
              <Download size={20} />
            </motion.button>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              onClick={handleDarkModeToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-600 dark:text-apple-gray-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              onClick={handlePrint}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-print-hide="true"
              className="p-2 rounded-full bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-600 dark:text-apple-gray-300"
              aria-label="PDF로 저장"
            >
              <Download size={20} />
            </motion.button>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-600 dark:text-apple-gray-300"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ x: 10 }}
                className="block w-full text-left px-4 py-2 text-apple-gray-600 dark:text-apple-gray-300 hover:text-apple-blue dark:hover:text-apple-blue transition-colors duration-200"
              >
                {item.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Header