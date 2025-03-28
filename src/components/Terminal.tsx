import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

type Props = {
    initialMessages: string[]
    allowStart?: boolean
    onStart?: () => void // 👈 callback to inform parent
}

const Terminal = ({ initialMessages, allowStart = false, onStart }: Props) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = input.trim().toLowerCase()
        if (!trimmed) return

        setMessages((prev) => [...prev, `> ${trimmed}`])

        if (trimmed === 'help') {
            setMessages((prev) => [...prev, 'Available commands: "start", "help"'])
        } else if (trimmed === 'start' && allowStart) {
            if (onStart) onStart() // 👈 trigger animation from parent
        } else {
            setMessages((prev) => [...prev, `Unknown command: "${trimmed}"`])
        }

        setInput('')
    }

    return (
        <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            className="bg-[#F7E1D7] p-4 rounded-lg w-full max-w-xl shadow-md border border-black"
        >
            <div className="h-60 overflow-y-auto text-sm whitespace-pre-wrap mb-4 font-mono text-black">
                {messages.map((m, i) => (
                    <div key={i}>{m}</div>
                ))}
                <div ref={bottomRef} />
            </div>
            <form onSubmit={handleCommand}>
                <input
                    type="text"
                    className="w-full px-2 py-1 bg-[#EDC7B7] border border-[#4A5759] text-sm shadow-inner rounded font-mono text-black"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="> Enter your command..."
                    autoFocus
                />
            </form>
        </motion.div>
    )
}

export default Terminal
