import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
    initialMessages: string[]
    allowStart?: boolean
}

const Terminal = ({ initialMessages, allowStart = false }: Props) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState(initialMessages)
    const navigate = useNavigate()

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = input.trim().toLowerCase()
        setMessages((prev) => [...prev, `> ${trimmed}`])

        if (trimmed === 'help') {
            setMessages((prev) => [...prev, 'Available commands: "start", "help"'])
        } else if (trimmed === 'start' && allowStart) {
            navigate('/game')
        } else {
            setMessages((prev) => [...prev, `Unknown command: "${trimmed}"`])
        }

        setInput('')
    }

    return (
        <div className="bg-terminal-shell p-4 rounded-lg w-full max-w-xl shadow-md">
            <div className="h-60 overflow-y-auto text-sm whitespace-pre-wrap mb-4">
                {messages.map((m, i) => (
                    <div key={i}>{m}</div>
                ))}
            </div>
            <form onSubmit={handleCommand}>
                <input
                    type="text"
                    className="w-full px-2 py-1 bg-terminal-secondary border border-terminal-dark text-sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="> Enter your command..."
                    autoFocus
                />
            </form>
        </div>
    )
}

export default Terminal
