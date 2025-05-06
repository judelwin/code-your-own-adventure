import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStats } from '../context/StatContext';

type Option = {
  input: string;
  response: string;
  effects: {
    Academic: number;
    Social: number;
    Career: number;
    Energy: number;
  };
};

type Scenario = {
  title: string;
  description: string;
  decision: string;
  options: Option[];
};

type Props = {
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  scenario: Scenario;
  onNext: () => void;
};

const Terminal = ({ messages, setMessages, scenario, onNext }: Props) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const { updateStats } = useStats();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (!trimmed || !scenario) return;

    const match = scenario.options.find((opt, i) =>
      trimmed === (i + 1).toString() || trimmed === opt.input.toLowerCase()
    );

    if (match) {
      updateStats(match.effects);
      setMessages((prev) => [...prev, `> ${trimmed}`, match.response]);

      setTimeout(() => {
        setInput('');
        onNext();
      }, 500);
    } else {
      setMessages((prev) => [...prev, `> ${trimmed}`, `Unknown command: "${trimmed}"`]);
      setInput('');
    }
  };


  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: 1 }}
      className="bg-[#FFE8D6] p-4 rounded-lg w-full shadow-md border-4 border-[#B7B7A4]"
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
          className="w-full px-2 py-1 bg-[#DDBEA9] border border-[#4A5759] text-sm shadow-inner rounded font-mono text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your choice..."
          autoFocus
        />
      </form>
    </motion.div>
  );
};

export default Terminal;
