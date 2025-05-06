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
  const inputRef = useRef<HTMLInputElement>(null) // Ref for focusing the input field
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

    // Scenario-based input (e.g., options 1, 2, etc.)
    if (scenario) {
      const match = scenario.options.find(
        (opt, i) =>
          trimmed === (i + 1).toString() || trimmed === opt.input.toLowerCase()
      )

      if (match) {
        updateStats(match.effects)
        setMessages((prev) => [...prev, `> ${trimmed}`, match.response, 'Press Enter to continue...'])
        setWaitingForKeyPress(true) // Set waiting for key press after response is shown
        setInput('') // Clear input immediately
        return
      } else {
        setMessages((prev) => [...prev, `> ${trimmed}`, `Unknown command: "${trimmed}"`])
        setInput('')
        return
      }
    }

    // Default behavior (Landing page)
    setMessages((prev) => [...prev, `> ${trimmed}`])
    if (trimmed === 'help') {
      setMessages((prev) => [...prev, 'Available commands: "help", "start"'])
    } else if (trimmed === 'start' && allowStart) {
      if (onStart) onStart()
      if (setShowHowToPlay) setShowHowToPlay(true)
    } else {
      setMessages((prev) => [...prev, `Unknown command: "${trimmed}"`])
    }
    setInput('')
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (waitingForKeyPress && e.key === 'Enter') {
      setWaitingForKeyPress(false)
      setMessages((prev) => [...prev, 'Moving to the next scene...'])
      setTimeout(() => {
        setInput('')
        if (onNext) onNext()
        inputRef.current?.focus() // Focus the input after the transition
      }, 500)
    }
  }

  useEffect(() => {
    // Listen for Enter key press to move to the next scene
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
      className="w-full p-1 rounded-xl bg-gradient-to-r from-[#80C7F2] via-[#E4C1F9] to-[#FFB5B5] shadow-[0_0_20px_#FFE8D6] transition-all"
    >
      <div className="rounded-xl bg-[#505050] backdrop-blur-md p-4">
        <div className="h-60 overflow-y-auto text-sm whitespace-pre-wrap mb-4 mt-2 font-jetbrains text-[#FFE8D6] text-[15px] px-1">
          {messages.map((m, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: formatMessage(m) }} />
          ))}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleCommand}>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md font-jetbrains text-[15px] text-[#2E2E2E]
              bg-gradient-to-r from-[#80C7F2] via-[#E4C1F9] to-[#FFB5B5]
              placeholder:text-[#4A5759] shadow-inner border border-[#FFE8D6]/40 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your command..."
            autoFocus
            ref={inputRef} // Set the ref here
            disabled={waitingForKeyPress} // Disable input while waiting for key press
          />
        </form>
      </div>
    </motion.div>
  )
}

export default Terminal
