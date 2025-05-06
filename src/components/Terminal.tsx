// Terminal.tsx
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type Props = {
  initialMessages: string[]
  allowStart?: boolean
  onStart?: () => void
  setShowHowToPlay?: (visible: boolean) => void
}

const Terminal = ({ initialMessages, allowStart = false, onStart, setShowHowToPlay }: Props) => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const [hasShownModal, setHasShownModal] = useState(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Show modal if on game page for the first time
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
        <div className="h-60 overflow-y-auto text-sm whitespace-pre-wrap mb-4 font-jetbrains text-[#FFE8D6] text-[15px] px-1">
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
          />
        </form>
      </div>
    </motion.div>
  )
}

export default Terminal
