import Terminal from '../components/Terminal';

const Landing = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#EDAFB8] p-6 border-8 border-[#4A5759] rounded-2xl shadow-lg">
            {/* <h1 className="text-5xl font-bold text-black mb-8 drop-shadow-md">Voices of Tech</h1> */}
            <h1>Voices of Tech</h1>
            <div className="bg-[#F7E1D7] p-6 rounded-lg shadow-md border-4 border-black w-full max-w-lg">
                <Terminal
                    allowStart
                    initialMessages={[
                        'Welcome to Voices of Tech!',
                        'Type "help" to see available commands.',
                        'Type "start" to begin your journey.',
                    ]}
                />
            </div>
            
            <button className="mt-6 bg-[#DEBDB2] text-black px-6 py-2 rounded-lg border-2 border-black shadow-md hover:bg-[#B0C4B1] transition duration-300">
                About
            </button>
        </div>
    );
};

export default Landing;
