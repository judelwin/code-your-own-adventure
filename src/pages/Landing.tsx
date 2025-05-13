import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import WelcomeTerminal from '../components/WelcomeTerminal'

const TypingTitle = ({ text }: { text: string }) => {
  const [index, setIndex] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [finishedTyping, setFinishedTyping] = useState(false)

  useEffect(() => {
    if (!text) return

    const typeInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(typeInterval)
          setFinishedTyping(true)
          return prev
        }
        return prev + 1
      })
    }, 100)

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typeInterval)
      clearInterval(cursorInterval)
    }
  }, [text])

  return (
    <h1
      className="text-[36px] md:text-[56px] font-bold font-ibm-mono z-10 mb-20 tracking-wide bg-gradient-to-r from-[#80C7F2] via-[#E4C1F9] to-[#FFB5B5] text-transparent bg-clip-text"
      style={{
        textShadow: '0 0 6px rgba(255, 255, 255, 0.2), 0 0 10px rgba(255, 200, 255, 0.2)',
      }}
    >
      {text.slice(0, index)}
      {!finishedTyping && cursorVisible && (
        <span className="inline-block w-[0.6ch] bg-[#FFE8D6] h-[1.1em] ml-[2px] align-middle" />
      )}
    </h1>
  )
}

const floatingWords = [
  { text: 'print("hello world!")', top: '8%', left: '50%' },
  { text: 'college', top: '14%', left: '80%' },
  { text: 'networking', top: '68%', left: '20%' },
  { text: '010101', top: '75%', left: '12%' },
  { text: 'internships', top: '82%', left: '25%' },
  { text: 'burnout', top: '88%', left: '8%' },
  { text: 'imposter syndrome', top: '90%', left: '35%' },
  { text: 'rejection', top: '5%', left: '88%' },
  { text: 'clubs', top: '72%', left: '30%' },
  { text: 'hackathons', top: '40%', left: '70%' },
  { text: 'diversity', top: '25%', left: '80%' },
  { text: 'support', top: '53%', left: '30%' },
  { text: '</>', top: '17%', left: '70%' },
  { text: '{}', top: '60%', left: '15%' },
  { text: 'java', top: '92%', left: '20%' },
  { text: 'python', top: '5%', left: '75%' },
]

const FloatingCode = () => {
  return (
    <>
      {floatingWords.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-[#FFE8D6] font-ibm-mono pointer-events-none"
          style={{
            top: item.top,
            left: item.left,
            fontSize: '1rem',
            opacity: 0.35,
            zIndex: 0,
          }}
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 6 + Math.random() * 2,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </>
  )
}

const Landing = () => {
  const navigate = useNavigate()
  const [starting, setStarting] = useState(false)

  const handleAbout = () => {
    navigate('/about')
  }

  const handleStart = () => {
    setStarting(true)
    setTimeout(() => {
      navigate('/game', { state: { showModal: true } }) // pass state!
    }, 800)
  }  

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: starting ? 0 : 1 }}
      transition={{ duration: 1 }}
      className={`min-h-screen flex flex-col items-center justify-center bg-[url('/b6.jpg')] bg-cover bg-center bg-no-repeat shadow-lg transition-all duration-1000 ${starting ? 'pointer-events-none' : ''}`}
    >
      {/* Background floating characters */}
      <FloatingCode />

      {/* CRT glow + scanlines */}
      <div className="absolute inset-0 pointer-events-none z-0 crt-overlay" />

      {/* Title */}
      {!starting && <TypingTitle text="Code Your Own Adventure" />}

      {/* Terminal Box + About button wrapper for synced fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 3.1 }}
        className="z-10 flex flex-col items-center gap-6"
      >
        <div className="mb-2 p-1 rounded-xl backdrop-blur-md shadow-[0_0_18px_#FFE8D6]">
          <WelcomeTerminal
            allowStart
            onStart={handleStart}
            initialMessages={[
              'A blank terminal. A new beginning.',
              'Are you ready to begin your new adventure?',
              '꩜ ✦ . ⁺  . ✦ . ⁺  ✦ . ✦  ⁺ . ✦ .  ⁺ . ✦ ꩜',
              "\n",
              'Type "help" to see available commands.',
              'Type "start" to begin your adventure!',
            ]}
          />
        </div>

        <motion.button
          onClick={handleAbout}
          className="relative px-10 py-3 text-lg font-jetbrains font-medium z-10 rounded-xl text-[#505050] bg-[#505050] backdrop-blur-md transition duration-300 mt-6
            hover:scale-105 hover:shadow-[0_0_20px_#FFE8D6] border border-transparent
            before:content-[''] before:absolute before:inset-0 before:rounded-xl before:p-[2px]
            before:bg-gradient-to-r before:from-[#80C7F2] before:via-[#E4C1F9] before:to-[#FFB5B5] before:z-[-1]"
        >
          About
        </motion.button>

      </motion.div>
    </motion.div>
  )
}

export default Landing