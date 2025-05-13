import React, { useEffect, useState } from 'react'
import Terminal from '../components/Terminal'
import TriangleStats from '../components/TriangleStats'
import EnergyBar from '../components/EnergyBar'
import { useStats } from '../context/StatContext'
import HowToPlayModal from '../components/HowToPlayModal'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import freshmanData from '../data/freshman.json'
import { useLocation } from 'react-router-dom'

const Game = () => {
    const navigate = useNavigate()
    const { academic, social, career, energy } = useStats()
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
    const [messages, setMessages] = useState<string[]>([])
    const [exiting, setExiting] = useState(false)
    const location = useLocation()  
    const showModalOnLoad = location.state?.showModal
    const scenarios = freshmanData.freshman_fall
    const [showHowToPlay, setShowHowToPlay] = useState<boolean>(showModalOnLoad ?? false)

    useEffect(() => {
        const scenario = scenarios[currentScenarioIndex]
        if (scenario) {
          const intro = `<strong>${scenario.title}</strong><br />${scenario.description}<br /><br /><strong>${scenario.decision}</strong>`
          const options = scenario.options
            .map((opt, i) => `(${i + 1}) ${opt.input}`)
            .join('<br />')
          setMessages([intro, options])
        }
      }, [currentScenarioIndex])      

      const handleNext = () => {
        const isLastScenario = currentScenarioIndex >= scenarios.length - 1
        const isOutOfEnergy = energy <= 0
      
        if (isLastScenario || isOutOfEnergy) {
            setExiting(true)
            setTimeout(() => {
              navigate('/ending', {
                state: {
                  academic,
                  social,
                  career,
                  energy,
                }
              })
            }, 1000)
          }
        
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
            className="min-h-screen flex items-center justify-center bg-terminal-base bg-[url('/b3.jpg')] bg-cover bg-center bg-no-repeat p-4 relative space-y-6"
        >
            {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}

            {/* Stats Section (Positioned in the top left using absolute positioning) */}
            <div className="absolute top-4 right-4 flex flex-row space-x-6">
                <TriangleStats academic={academic} social={social} career={career} />
                <div className="mt-4"><EnergyBar energy={energy} /></div>

            </div>
            <div className="absolute top-4 right-4 flex flex-row space-y-8">

            </div>
            {/* Terminal Section (Centered in the screen) */}
            <div className="flex-1 relative flex flex-col items-center">
                <div className="relative w-1/2 max-w-4xl">
                    {/* Window buttons inside the terminal */}
                    {/* <div className="absolute top-4 left-4 flex space-x-2 z-50">
                        <div
                            className="w-2.5 h-2.5 bg-red-500 rounded-full cursor-pointer hover:scale-110 transition-transform"
                            onClick={handleExit}
                        ></div>
                        <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                    </div> */}

                    {/* Terminal Component */}
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
