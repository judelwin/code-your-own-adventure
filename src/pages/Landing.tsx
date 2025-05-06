import Terminal from '../components/Terminal'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const FloatingCode = () => {
    const items = ['print("hello world!)', 'college', 'networking', '010101', 'internships', 'stressed', 'overwhelmed', 'imposter syndrome']
  
    const count = 4
  
    const getPositionInDarkZone = () => {
      const zone = Math.floor(Math.random() * 3)
      if (zone === 0) {
        // top-right
        return {
          top: `${Math.random() * 40}%`,
          left: `${52 + Math.random() * 40}%`,
        }
      } else if (zone === 1) {
        // bottom-left
        return {
          top: `${60 + Math.random() * 40}%`,
          left: `${2 + Math.random() * 40}%`,
        }
      } else {
        // center vertical band
        return {
          top: `${30 + Math.random() * 40}%`,
          left: `${45 + Math.random() * 10}%`,
        }
      }
    }
  
    return (
      <>
        {[...Array(count)].map((_, i) => {
          const item = items[Math.floor(Math.random() * items.length)]
          const opacity = 0.25 + Math.random() * 0.1
          const size = 0.8 + Math.random() * 0.5
          const duration = 4 + Math.random() * 3
          const { top, left } = getPositionInDarkZone()
  
          return (
            <motion.div
              key={i}
              className="absolute text-[#FFE8D6] font-ibm-mono pointer-events-none"
              style={{
                top,
                left,
                fontSize: `${size}rem`,
                opacity,
                zIndex: 0,
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [opacity - 0.1, opacity, opacity - 0.1],
              }}
              transition={{
                duration,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            >
              {item}
            </motion.div>
          )
        })}
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
      navigate('/game')
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: starting ? 0 : 1 }}
      transition={{ duration: 1 }}
      className={`min-h-screen flex flex-col items-center justify-center bg-[url('/b6.jpg')] bg-cover bg-center bg-no-repeat shadow-lg transition-all duration-1000 ${starting ? 'pointer-events-none' : ''
      }`}
      
    >
      {/* Background floating characters */}
      <FloatingCode />

      {/* CRT glow + scanlines */}
      <div className="absolute inset-0 pointer-events-none z-0 crt-overlay" />

      {/* Title */}
      {!starting && (
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[48px] font-bold text-[#FFE8D6] z-10 mb-20"
          style={{ textShadow: '0px 3px 3px #B7B7A4' }}
        >
          &lt;Code Your Own Adventure/&gt;
        </motion.h1>
      )}

      {/* Terminal Box */}
      <motion.div
        animate={starting ? { scale: 1.2, opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 mb-4 relative rounded-xl border border-[#B7B7A4] shadow-lg bg-[#FFE8D6]"
      >
        <div className="p-1 w-full h-full">
          <Terminal
            allowStart
            onStart={handleStart}
            initialMessages={[
              'Welcome to Voices of Tech!',
              'Type "help" to see available commands.',
              'Type "start" to begin your journey.',
            ]}
          />
        </div>
      </motion.div>

      {/* Blinking Enter prompt (optional) */}
      {/* <div className="text-[#FFE8D6] font-mono animate-pulse mt-4">Press Enter to Start...</div> */}

      {/* About Button */}
      {!starting && (
        <motion.button
          onClick={handleAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-3 border-[#B7B7A4] mt-6 bg-[#FFE8D6] text-black text-[16px] w-[180px] h-[50px] rounded-[15px] shadow-md hover:bg-[#DDBEA9] transition duration-300 z-10"
        >
          About
        </motion.button>
      )}
    </motion.div>
  )
}

export default Landing