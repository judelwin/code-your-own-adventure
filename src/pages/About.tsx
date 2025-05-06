import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[url('/b6.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center text-[#505050] font-jetbrains relative">
      <div className="absolute inset-0 pointer-events-none z-0 crt-overlay" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl p-8 rounded-xl bg-[#484848]/80 backdrop-blur-md text-[16px] shadow-[0_0_18px_#FFE8D6]
          border border-transparent before:absolute before:inset-0 before:rounded-xl before:p-[2px]
          before:bg-gradient-to-r before:from-[#80C7F2] before:via-[#E4C1F9] before:to-[#FFB5B5] before:z-[-1]"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#80C7F2] via-[#E4C1F9] to-[#FFB5B5] text-transparent bg-clip-text">
          About Code Your Own Adventure
        </h1>

        <p className="mb-4 leading-relaxed">
          Welcome to <em><strong>Code Your Own Adventure</strong></em> — a story-driven experience designed to capture the chaos, curiosity, and occasional caffeine crashes of college life as a CS student. From debugging past midnight to questioning everything during exam season, it’s all here.
        </p>

        <p className="mb-4 leading-relaxed">
          But this isn’t just about the grind; it’s about the feelings. The doubts, the breakthroughs, the tiny wins that feel massive. We built this space with empathy in mind, hoping to remind you that you're not alone in this journey.
        </p>

        <p className="mb-4 leading-relaxed">
          Through four chapters — Freshman to Senior year — your choices shape your path. Some will lift you up. Others might leave you facepalming. But every one tells a story worth remembering.
        </p>

        <p className="mb-4 leading-relaxed">
          <em>Code Your Own Adventure</em> is built by two college students, <a href="https://www.linkedin.com/in/shiqicathywu/l" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#FFB5B5]"><strong>Cathy</strong></a> and <a href="https://www.linkedin.com/in/judelwin/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#FFB5B5]"><strong>Jude</strong></a>. We've lived it, coded it, and now we want to share it with <em>you</em>.
        </p>

        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          className="mt-4 px-8 py-2 rounded-full text-[#505050] bg-[#505050] font-medium transition shadow-lg backdrop-blur-md
            hover:shadow-[0_0_16px_#FFE8D6] border border-transparent
            before:content-[''] before:absolute before:inset-0 before:rounded-full before:p-[2px]
            before:bg-gradient-to-r before:from-[#80C7F2] before:via-[#E4C1F9] before:to-[#FFB5B5] before:z-[-1]"
        >
          ← Back to Home
        </motion.button>
      </motion.div>
    </div>
  )
}

export default About
