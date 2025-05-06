import React, { useEffect, useState } from 'react'
import Terminal from '../components/Terminal'
import TriangleStats from '../components/TriangleStats'
import EnergyBar from '../components/EnergyBar'
import { useStats } from '../context/StatContext'
import HowToPlayModal from '../components/HowToPlayModal'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import freshmanData from '../data/freshman.json'

const Game = () => {
  const navigate = useNavigate()
  const { academic, social, career, energy } = useStats()
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [messages, setMessages] = useState<string[]>([])
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const [exiting, setExiting] = useState(false)

  const scenarios = freshmanData.freshman_fall

  useEffect(() => {
    const scenario = scenarios[currentScenarioIndex]
    if (scenario) {
      const intro = `${scenario.title}\n${scenario.description}\n\n🟢 ${scenario.decision}`
      const options = scenario.options
        .map((opt, i) => `(${i + 1}) ${opt.input}`)
        .join('\n')
      setMessages([intro, options])
    }
  }, [currentScenarioIndex])

  const handleNext = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1)
    }
  }

  const handleExit = () => {
    setExiting(true)
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-terminal-base p-4 relative space-y-6"
    >
      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}

      {/* Window controls */}
      <div className="absolute top-4 left-4 flex space-x-2 z-50">
        <div
          className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:scale-110 transition-transform"
          onClick={handleExit}
        ></div>
        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl z-10">
        {/* Stats Section */}
        <div className="flex-1">
          <TriangleStats academic={academic} social={social} career={career} />
          <EnergyBar energy={energy} />
        </div>

        {/* Terminal Section */}
        <div className="flex-1">
          <Terminal
            messages={messages}
            setMessages={setMessages}
            scenario={scenarios[currentScenarioIndex]}
            onNext={handleNext}
            setShowHowToPlay={setShowHowToPlay}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Game