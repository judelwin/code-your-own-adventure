import React, { useEffect, useState } from 'react';
import Terminal from '../components/Terminal';
import TriangleStats from '../components/TriangleStats';
import EnergyBar from '../components/EnergyBar';
import { useStats } from '../context/StatContext';
import freshmanData from '../data/freshman.json';

const Game = () => {
    const { academic, social, career, energy } = useStats();
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [messages, setMessages] = useState<string[]>([]);
    const scenarios = freshmanData.freshman_fall;

    useEffect(() => {
        const scenario = scenarios[currentScenarioIndex];
        if (scenario) {
            const intro = `${scenario.title}\n${scenario.description}\n\n🟢 ${scenario.decision}`;
            const options = scenario.options.map((opt, i) => `(${i + 1}) ${opt.input}`).join('\n');
            setMessages([intro, options]);
        }
    }, [currentScenarioIndex]);

    const handleNext = () => {
        if (currentScenarioIndex < scenarios.length - 1) {
            setCurrentScenarioIndex(currentScenarioIndex + 1);
        }
    };

    const DebugStats = () => {
        const { academic, social, career, energy } = useStats()
        return (
            <div className="text-black text-sm mt-2 font-mono">
                <p>Academic: {academic}</p>
                <p>Social: {social}</p>
                <p>Career: {career}</p>
                <p>Energy: {energy}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-terminal-base p-4 space-y-6">
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
                <div className="flex-1">
                    <TriangleStats academic={academic} social={social} career={career} />
                    <EnergyBar energy={energy} />
                    <DebugStats />

                </div>
                <div className="flex-1">
                    <Terminal
                        messages={messages}
                        setMessages={setMessages}
                        scenario={scenarios[currentScenarioIndex]}
                        onNext={handleNext}
                    />
                </div>
            </div>
        </div>
    );
};

export default Game;
