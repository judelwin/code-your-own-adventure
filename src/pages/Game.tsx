import Terminal from '../components/Terminal'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Game = () => {
    const navigate = useNavigate()
    const [exiting, setExiting] = useState(false)

    const handleExit = () => {
        setExiting(true)
        setTimeout(() => {
            navigate('/')
        }, 1000) // Match the Landing page fade-out duration
    }

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex items-center justify-center p-4 bg-terminal-base"
        >
            <div className="bg-terminal-shell rounded shadow-lg max-w-3xl w-full">
                <div className="flex items-center space-x-2 p-2 bg-terminal-dark rounded-t">
                    <div
                        className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:scale-110 transition-transform"
                        onClick={handleExit}
                    ></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="p-4">
                    <Terminal initialMessages={['>> Your journey begins here...']} />
                </div>
            </div>
        </motion.div>
    )
}

export default Game
