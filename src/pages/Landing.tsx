import Terminal from '../components/Terminal'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

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
            className={`min-h-screen flex flex-col items-center justify-center bg-[#6B705C] shadow-lg transition-all duration-1000 ${starting ? 'pointer-events-none' : ''
                }`}
        >
            {!starting && (
                <motion.h1
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[64px] font-bold text-[#FFE8D6] mb-8 font-mono z-10 mb-20"
                    style={{ textShadow: '0px 3px 3px #B7B7A4' }}
                >
                    Voices of Tech
                </motion.h1>
                
            )}


            <motion.div
                animate={
                    starting
                        ? { scale: 1.2, opacity: 1 }
                        : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 1 }}
                className="z-10 mb-4"
            >
                <Terminal
                    allowStart
                    onStart={handleStart}
                    initialMessages={[
                        'Welcome to Voices of Tech!',
                        'Type "help" to see available commands.',
                        'Type "start" to begin your journey.',
                    ]}
                />
            </motion.div>

            {!starting && (
                <motion.button
                    onClick={handleAbout}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-3 border-[#B7B7A4] mt-6 bg-[#FFE8D6] text-black text-[16px] w-[180px] h-[50px] rounded-[15px] shadow-md hover:bg-[#DDBEA9] transition duration-300"
                >
                    About
                </motion.button>
            )}
        </motion.div>
    )
}

export default Landing
