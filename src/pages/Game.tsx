import Terminal from '../components/Terminal'

const Game = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-terminal-base">
            <div className="bg-terminal-shell rounded shadow-lg max-w-3xl w-full">
                <div className="flex items-center space-x-2 p-2 bg-terminal-dark rounded-t">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="p-4">
                    <Terminal initialMessages={['>> Your journey begins here...']} />
                </div>
            </div>
        </div>
    )
}

export default Game
