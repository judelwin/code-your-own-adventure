import Terminal from '../components/Terminal'

const Landing = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-6">Voices of Tech</h1>
            <Terminal
                allowStart
                initialMessages={[
                    'Welcome to Voices of Tech!',
                    'Type "help" to see available commands.',
                    'Type "start" to begin your journey.',
                ]}
            />
            <button className="mt-6 bg-terminal-secondary px-4 py-2 rounded shadow">
                About
            </button>
        </div>
    )
}

export default Landing
