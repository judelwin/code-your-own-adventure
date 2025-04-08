import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

type Props = {
    initialMessages: string[]
    allowStart?: boolean
    onStart?: () => void
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
            setMessages((prev) => [...prev, 'Available commands: "help", "start"'])
        } else if (trimmed === 'start' && allowStart) {
            if (onStart) onStart()
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
            className="bg-[#FFE8D6] p-4 rounded-lg w-full max-w-xl shadow-md border-5 border-[#B7B7A4]"
        >
            <div className="h-60 overflow-y-auto text-sm whitespace-pre-wrap mb-4 font-mono text-black text-[16px] font-jetbrains">
                {messages.map((m, i) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: formatMessage(m) }} />
                ))}
                <div ref={bottomRef} />
            </div>
            <form onSubmit={handleCommand}>
                <input
                    type="text"
                    className="w-full px-2 py-1 bg-[#DDBEA9] border border-[#4A5759] text-sm shadow-inner rounded font-mono text-black text-[16px] font-jetbrains"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your command..."
                    autoFocus
                />
            </form>
        </motion.div>
    )
}

export default Terminal
