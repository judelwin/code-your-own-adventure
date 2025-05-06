import React, { createContext, useContext, useState } from 'react';

type StatContextType = {
  academic: number;
  social: number;
  career: number;
  energy: number;
  updateStats: (changes: { Academic: number; Social: number; Career: number; Energy: number }) => void;
};

const defaultValues = {
  academic: 50,
  social: 50,
  career: 50,
  energy: 100,
  updateStats: () => {}
};

const StatContext = createContext<StatContextType>(defaultValues);

export const StatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [academic, setAcademic] = useState(50);
  const [social, setSocial] = useState(50);
  const [career, setCareer] = useState(50);
  const [energy, setEnergy] = useState(100);

  const updateStats = ({ Academic, Social, Career, Energy }: { Academic: number; Social: number; Career: number; Energy: number }) => {
    setAcademic(prev => Math.max(0, Math.min(100, prev + Academic)));
    setSocial(prev => Math.max(0, Math.min(100, prev + Social)));
    setCareer(prev => Math.max(0, Math.min(100, prev + Career)));
    setEnergy(prev => Math.max(0, Math.min(100, prev + Energy)));
  };

  return (
    <StatContext.Provider value={{ academic, social, career, energy, updateStats }}>
      {children}
    </StatContext.Provider>
  );
};

export const useStats = () => useContext(StatContext);