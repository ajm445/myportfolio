import { motion } from 'framer-motion'
import { Heart, Code, Brain, Users } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: '효율적인 개발',
      description: 'AI 도구를 활용하여 개발 속도와 코드 품질을 동시에 높이는 스마트한 개발 방식'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: '풀스택 개발',
      description: 'React, TypeScript, Node.js를 중심으로 한 현대적인 웹 애플리케이션 풀스택 개발'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '사용자 중심',
      description: '실제 사용자의 니즈를 파악하고 직관적이며 효율적인 사용자 경험을 설계'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: '문제 해결',
      description: '복잡한 비즈니스 요구사항을 분석하고 창의적인 기술 솔루션으로 해결'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white dark:bg-apple-gray-800">
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
            개발자 <span className="text-gradient-apple">안지민</span>
          </h2>

        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* 왼쪽: 프로필 사진 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="relative mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src="/profile.png"
                  alt="안지민 프로필 사진"
                  className="w-64 h-80 rounded-3xl object-cover object-top shadow-2xl"
                />
                {/* 프로필 사진 테두리 그라데이션 */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-apple-blue/20 to-purple-500/20 -z-10 transform translate-x-2 translate-y-2"></div>
              </motion.div>
            </div>
            
            {/* 소셜 링크들 */}
            <div className="flex space-x-4">
              <motion.a
                href="mailto:anjimin1014@naver.com"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-600 dark:text-apple-gray-300 hover:text-apple-blue dark:hover:text-apple-blue transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </motion.a>

              <motion.a
                href="tel:010-8873-6296"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-600 dark:text-apple-gray-300 hover:text-apple-blue dark:hover:text-apple-blue transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* 중간: 소개 텍스트 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-apple-dark dark:text-white">
              안녕하세요, 안지민입니다!
            </h3>
            
            <div className="space-y-4 text-apple-gray-600 dark:text-apple-gray-300 leading-relaxed">
              <p>
                저는 웹 풀스택 개발에 집중하며,
                최신 기술을 활용해 사용자에게 실질적인 가치를 제공하는 서비스를 만들어왔습니다.
              </p>

              <p>
                <strong className="text-apple-blue">센서 게임 플랫폼</strong>,
                <strong className="text-apple-blue"> 편의점 종합 솔루션</strong>,
                <strong className="text-apple-blue"> 메타버스 학습 플랫폼</strong>,
                <strong className="text-apple-blue"> 워킹홀리데이 가계부 웹앱</strong> 등 다양한
                프로젝트를 통해 실제 환경에서 필요한 솔루션을 구현한 경험이 있습니다.
              </p>

              <p>
                특히 <strong className="text-apple-blue">React 19, TypeScript, Supabase</strong> 등의
                최신 기술 스택을 활용한 엔터프라이즈급 애플리케이션 개발에 전문성을 가지고 있으며,
                <strong className="text-apple-blue"> GitHub</strong>를 활용한 버전 관리와 팀 협업 경험을 보유하고 있습니다.
              </p>

               <p>
                또한 Claude Code, Gemini 등 다양한 <strong className="text-apple-blue">바이브 코딩(Vibe Coding) </strong>툴을 깊이 이해하고 능숙하게 활용하며,
                이를 통해 <strong className="text-apple-blue">개발 효율을 극대화</strong>하고 <strong className="text-apple-blue">빠른 프로토타이핑·아이디어 검증·실시간 협업</strong>이 가능한 개발 환경을 구축해왔습니다.
                이러한 워크플로우 혁신을 통해, 단순한 코드 작성이 아닌 <strong className="text-apple-blue">창의적 문제 해결 중심의 개발</strong>을 실천하고 있습니다.
              </p>
            </div>

          </motion.div>

        </div>

        {/* 특징 카드들 - 별도 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-apple-dark dark:text-white text-center mb-12">
            핵심 역량
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="p-6 bg-apple-gray-50 dark:bg-apple-gray-700 rounded-2xl card-hover text-center"
              >
                <div className="text-apple-blue mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-apple-dark dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-apple-gray-600 dark:text-apple-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        
        
      </div>
    </section>
  )
}

export default About