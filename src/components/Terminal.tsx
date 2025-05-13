import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useStats } from '../context/StatContext'

type Option = {
  input: string
  response: string
  effects: {
    Academic: number
    Social: number
    Career: number
    Energy: number
  }
}

type Scenario = {
  title: string
  description: string
  decision: string
  options: Option[]
}

type Props = {
  messages: string[]
  setMessages: React.Dispatch<React.SetStateAction<string[]>>
  scenario?: Scenario
  allowStart?: boolean
  onStart?: () => void
  setShowHowToPlay?: (visible: boolean) => void
  onNext?: () => void
}

const Terminal = ({
  messages,
  setMessages,
  scenario,
  allowStart = false,
  onStart,
  setShowHowToPlay,
  onNext,
}: Props) => {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const [hasShownModal, setHasShownModal] = useState(false)
  const [waitingForKeyPress, setWaitingForKeyPress] = useState(false)
  const { updateStats } = useStats()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (location.pathname === '/game' && !hasShownModal) {
      setHasShownModal(true)
      setTimeout(() => {
        if (setShowHowToPlay) setShowHowToPlay(true)
      }, 600)
    }
  }, [location.pathname, hasShownModal])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim().toLowerCase()
    if (!trimmed) return

    if (scenario) {
      const match = scenario.options.find(
        (opt, i) =>
          trimmed === (i + 1).toString() || trimmed === opt.input.toLowerCase()
      )

      if (match) {
        updateStats(match.effects)
        setMessages(prev => [...prev, `> ${trimmed}`, match.response, '<em>Press Enter to continue...</em>'])
        setWaitingForKeyPress(true)
        setInput('')
        return
      } else {
        setMessages(prev => [...prev, `> ${trimmed}`, `Unknown command: "${trimmed}"`])
        setInput('')
        return
      }
    }

    setMessages(prev => [...prev, `> ${trimmed}`])
    if (trimmed === 'help') {
      setMessages(prev => [...prev, 'Available commands: "help", "start"'])
    } else if (trimmed === 'start' && allowStart) {
      if (onStart) onStart()
      if (setShowHowToPlay) setShowHowToPlay(true)
    } else {
      setMessages(prev => [...prev, `Unknown command: "${trimmed}"`])
    }
    setInput('')
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (waitingForKeyPress && e.key === 'Enter') {
      setWaitingForKeyPress(false)
      setMessages(prev => [...prev, 'Moving to the next scene...'])
      setTimeout(() => {
        setInput('')
        if (onNext) onNext()
        inputRef.current?.focus()
      }, 500)
    }
  }

  useEffect(() => {
    if (waitingForKeyPress) {
      const handle = (e: KeyboardEvent) => {
        handleKeyPress(e)
      }
      window.addEventListener('keydown', handle)
      return () => {
        window.removeEventListener('keydown', handle)
      }
    }
  }, [waitingForKeyPress])

  const formatMessage = (msg: string) => {
    return msg.replace(/\b(help|start)\b/gi, '<strong>$1</strong>')
  }

  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: 1 }}
      className="w-full max-w-4xl mx-auto p-2 rounded-xl bg-gradient-to-r from-[#80C7F2] via-[#E4C1F9] to-[#FFB5B5] shadow-[0_0_20px_#FFE8D6] transition-all"
    >
      <div className="rounded-xl bg-[#505050] backdrop-blur-md p-6">
        {/* Mac-style window buttons */}
      <div className="absolute top-3 left-3 flex space-x-2">
        <div
          className="w-2.5 h-2.5 bg-red-500 rounded-full cursor-pointer hover:scale-110 transition-transform"
          onClick={() => window.location.href = '/'} // or pass `onExit` as a prop
        ></div>
        <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
      </div>
        
        {/* Terminal Output */}
        <div className="h-[400px] overflow-y-auto whitespace-pre-wrap mb-4 mt-2 font-jetbrains text-[#FFE8D6] text-[17px] px-2">
          {messages.map((m, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: formatMessage(m) }} />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Box */}
        <form onSubmit={handleCommand}>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg font-jetbrains text-[17px] text-[#2E2E2E]
              bg-gradient-to-r from-[#80C7F2] via-[#E4C1F9] to-[#FFB5B5]
              placeholder:text-[#4A5759] shadow-inner border border-[#FFE8D6]/40 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your command..."
            autoFocus
            ref={inputRef}
            disabled={waitingForKeyPress}
          />
        </form>
      </div>
    </motion.div>
  )
}

export default Terminal
