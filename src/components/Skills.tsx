import { motion } from 'framer-motion'
import { useState } from 'react'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend')

  const skillCategories = {
    frontend: {
      title: 'Frontend',
      icon: '💻',
      skills: [
        { name: 'React', icon: '⚛️' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'JavaScript', icon: '🟨' },
        { name: 'HTML/CSS', icon: '🎨' },
        { name: 'Tailwind CSS', icon: '🎯' },
        { name: 'Zustand', icon: '🐻' },
        { name: 'Framer Motion', icon: '🎬' }
      ]
    },
    backend: {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'Express.js', icon: '🚂' },
        { name: 'Supabase', icon: '🗃️' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'Socket.IO', icon: '🔌' },
        { name: 'WebSocket', icon: '📡' },
        { name: 'JWT', icon: '🔑' },
        { name: 'RESTful API', icon: '🌐' }
      ]
    },
    ai: {
      title: 'AI & Tools',
      icon: '🤖',
      skills: [
        { name: 'OpenAI API', icon: '🧠' },
        { name: 'Anthropic API', icon: '🤖' },
        { name: 'Git', icon: '📁' },
        { name: 'Vite', icon: '⚡' },
        { name: 'Recharts', icon: '📊' },
        { name: 'Device APIs', icon: '📡' }
      ]
    },
    advanced: {
      title: 'Advanced',
      icon: '🚀',
      skills: [
        { name: 'Canvas 2D API', icon: '🖼️' },
        { name: 'Three.js', icon: '🎮' },
        { name: 'React Native', icon: '📱' },
        { name: 'Expo', icon: '📲' },
        { name: 'WebRTC', icon: '📹' },
        { name: 'Turborepo', icon: '⚙️' },
        { name: 'pgvector', icon: '🔍' },
        { name: 'Electron', icon: '🖥️' }
      ]
    }
  }

  const categories = Object.keys(skillCategories) as Array<keyof typeof skillCategories>
  
  type SkillCategory = keyof typeof skillCategories
  type Skill = typeof skillCategories[SkillCategory]['skills'][0]

  return (
    <section id="skills" className="py-20 bg-apple-gray-50 dark:bg-apple-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-apple-dark dark:text-white mb-6">
            기술 <span className="text-gradient-apple">스택</span>
          </h2>
          <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 max-w-3xl mx-auto">
            현대적인 웹 기술과 AI를 활용하여 혁신적인 솔루션을 구현합니다
          </p>
        </motion.div>

        {/* 카테고리 탭 (인쇄 시 숨김) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12 print:hidden"
        >
          <div className="flex bg-white dark:bg-apple-gray-800 rounded-2xl p-2 shadow-lg">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-apple-blue text-white shadow-lg'
                    : 'text-apple-gray-600 dark:text-apple-gray-300 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-700'
                }`}
              >
{skillCategories[category].icon}
                <span className="ml-2">{skillCategories[category].title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 스킬 리스트 — 인터랙티브 탭 (인쇄 시 숨김) */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto print:hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skillCategories[activeCategory as SkillCategory].skills.map((skill: Skill, index: number) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="
                  bg-white dark:bg-apple-gray-800
                  border border-apple-gray-200 dark:border-apple-gray-700
                  rounded-xl p-4 text-center
                  shadow-sm hover:shadow-md
                  transition-all duration-300
                  cursor-pointer group
                "
              >
                {/* 아이콘 */}
                <div className="text-2xl mb-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {skill.icon}
                </div>

                {/* 스킬 이름 */}
                <h3 className="text-sm md:text-base font-semibold text-apple-dark dark:text-white leading-tight">
                  {skill.name}
                </h3>

                {/* 미니멀한 액센트 */}
                <div className="mt-3 h-0.5 w-8 mx-auto bg-apple-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 스킬 리스트 — 인쇄 전용 (전체 카테고리 표시) */}
        <div className="hidden print:block max-w-6xl mx-auto">
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-bold text-apple-dark dark:text-white mb-4">
                {skillCategories[category].icon} {skillCategories[category].title}
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {skillCategories[category].skills.map((skill: Skill) => (
                  <div
                    key={skill.name}
                    className="border border-apple-gray-200 dark:border-apple-gray-700 rounded-xl p-3 text-center"
                  >
                    <div className="text-xl mb-1">{skill.icon}</div>
                    <div className="text-sm font-semibold text-apple-dark dark:text-white">{skill.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 특화 기술 소개 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-apple-blue/10 to-purple-500/10 dark:from-apple-blue/20 dark:to-purple-500/20 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-apple-dark dark:text-white mb-4">
              특화 분야
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-2">🔥</div>
                <h4 className="font-semibold text-apple-dark dark:text-white mb-1">
                  최신 기술 스택
                </h4>
                <p className="text-sm text-apple-gray-600 dark:text-apple-gray-300">
                  React 19, TypeScript 등 최신 기술 활용
                </p>
              </div>
              <div>
                <div className="text-4xl mb-2">🤝</div>
                <h4 className="font-semibold text-apple-dark dark:text-white mb-1">
                  팀 협업
                </h4>
                <p className="text-sm text-apple-gray-600 dark:text-apple-gray-300">
                  원활한 커뮤니케이션과 협업으로 팀 프로젝트 성공 경험
                </p>
              </div>
              <div>
                <div className="text-4xl mb-2">🚀</div>
                <h4 className="font-semibold text-apple-dark dark:text-white mb-1">
                  적극적인 바이브 코딩 툴 사용
                </h4>
                <p className="text-sm text-apple-gray-600 dark:text-apple-gray-300">
                  AI와 함께 생각하고, 함께 코딩하는 개발로 <br></br>
                   빠른 프로토타이핑·아이디어 검증·실시간 협업이 가능
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills