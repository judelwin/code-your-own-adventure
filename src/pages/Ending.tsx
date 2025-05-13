import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStats } from '../context/StatContext'

const floatingWords = [
  { text: 'print("goodbye world")', top: '80%', left: '15%' },
  { text: 'CS degree?', top: '15%', left: '70%' },
  { text: 'debugging life', top: '20%', left: '90%' },
  { text: 'grad school?', top: '55%', left: '20%' },
  { text: '01101100', top: '50%', left: '80%' },
]

const FloatingCode = () => (
  <>
    {floatingWords.map((item, i) => (
      <motion.div
        key={i}
        className="absolute text-[#FFE8D6] font-ibm-mono pointer-events-none"
        style={{
          top: item.top,
          left: item.left,
          fontSize: '1rem',
          opacity: 0.3,
          zIndex: 0,
        }}
        animate={{ y: [-5, 5, -5] }}
        transition={{
          duration: 5 + Math.random() * 2,
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

const Ending = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { academic, social, career, energy } = state || {}
  const { resetStats } = useStats();

  let heading = 'You Made It!'
  if (energy <= 0) {
    heading = 'You Burned Out...'
  } else if (academic >= social && academic >= career) {
    heading = 'Academic Star'
  } else if (career >= academic && career >= social) {
    heading = 'Career-Oriented Champ'
  } else {
    heading = 'Social Butterfly'
  }

  const adviceBoard = [
    "Don't compare your path to others. Everyone's learning journey is unique.",
    "Take breaks and rest: burnout is real.",
    "Clubs can help you find community, not just credentials.",
    "Seek help early when classes get tough! Attend office hours!",
    "Enjoy the little wins. Every success is worth celebrating.",
    "Live in the moment!",
    "College is not just about getting a degree. It's about making friends, learning things that you are passionate about, and doing something that fulfills you!"
  ]

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center 
                 bg-[url('/b4.jpg')] bg-cover bg-center bg-no-repeat 
                 relative text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <FloatingCode />
      <div className="absolute inset-0 pointer-events-none z-0 crt-overlay" />

      {/* Heading */}
      <h1
        className="text-[36px] md:text-[56px] font-bold font-ibm-mono z-10 mb-6 tracking-wide 
          bg-gradient-to-r from-[#80C7F2] via-[#E4C1F9] to-[#FFB5B5] text-transparent bg-clip-text"
        style={{
          textShadow: '0 0 6px rgba(255, 255, 255, 0.2), 0 0 10px rgba(255, 200, 255, 0.2)',
        }}
      >
        {heading}
      </h1>

      {/* Final Stats Title */}
      <h2
        className="text-[24px] md:text-[28px] font-bold font-ibm-mono mb-4 tracking-wide 
          bg-gradient-to-r from-[#80C7F2] via-[#E4C1F9] to-[#FFB5B5] text-transparent bg-clip-text"
        style={{
          textShadow: '0 0 6px rgba(255, 255, 255, 0.25), 0 0 12px rgba(255, 200, 255, 0.25)',
        }}
      >
        Final Stats
      </h2>

      {/* Stats Grid */}
      <div className=" p-[2px] rounded-xl backdrop-blur-md bg-gradient-to-r from-[#80C7F2] via-[#E4C1F9] to-[#FFB5B5] shadow-[0_0_18px_#FFE8D6] z-10 mb-6">
        <div className="bg-[#505050] rounded-xl p-6 grid grid-cols-4 gap-y-3 gap-x-6 font-jetbrains text-[#FFE8D6] text-[16px] text-left">
          <div>
            <p className="text-sm text-[#FFE8D6]/70">Academic</p>
            <p className="text-lg font-semibold">{academic}</p>
          </div>
          <div>
            <p className="text-sm text-[#FFE8D6]/70">Social</p>
            <p className="text-lg font-semibold">{social}</p>
          </div>
          <div>
            <p className="text-sm text-[#FFE8D6]/70">Career</p>
            <p className="text-lg font-semibold">{career}</p>
          </div>
          <div>
            <p className="text-sm text-[#FFE8D6]/70">Energy</p>
            <p className="text-lg font-semibold">{energy}</p>
          </div>
        </div>
      </div>

      {/* Advice Box */}
      <div className="mt-4 w-full max-w-2xl p-[2px] rounded-xl backdrop-blur-md bg-gradient-to-r from-[#80C7F2] via-[#E4C1F9] to-[#FFB5B5] shadow-[0_0_18px_#FFE8D6] z-10">
        <div className="rounded-xl bg-[#505050] p-6">
          <h2
            className="text-2xl font-semibold mb-4 font-jetbrains 
              bg-gradient-to-r from-[#80C7F2] via-[#E4C1F9] to-[#FFB5B5] text-transparent bg-clip-text"
            style={{
              textShadow: '0 0 6px rgba(255, 255, 255, 0.15), 0 0 12px rgba(255, 200, 255, 0.15)',
            }}
          >
            Board of Advice
          </h2>
          <ul className="list-disc text-left text-[#FFE8D6] space-y-2 font-jetbrains text-[15px] pl-4">
          {adviceBoard.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.5 }}
              >
                {tip}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Play Again Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          resetStats();
          navigate('/');
        }}
        className="relative mt-10 px-10 py-3 text-lg font-jetbrains font-medium z-10 rounded-xl text-[#505050] bg-[#505050] backdrop-blur-md transition duration-300
          hover:scale-105 hover:shadow-[0_0_20px_#FFE8D6] border border-transparent
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E4C1F9]
          before:content-[''] before:absolute before:inset-0 before:rounded-xl before:p-[2px]
          before:bg-gradient-to-r before:from-[#80C7F2] before:via-[#E4C1F9] before:to-[#FFB5B5] before:z-[-1]"
      >
        Play Again
      </motion.button>
    </motion.div>
  )
}

export default Ending
