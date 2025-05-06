import React from 'react';

type Props = {
  energy: number;
};

const EnergyBar = ({ energy }: Props) => {
  const capped = Math.max(0, Math.min(100, energy));

  const color = capped > 66 ? '#2E8B57' :
                capped > 33 ? '#FFD700' : '#FF4500';

  return (
    <div className="w-6 h-48 bg-gray-300 rounded-full flex items-end overflow-hidden border-2 border-black shadow-md">
      <div
        className="w-full transition-all duration-500"
        style={{
          height: `${capped}%`,
          background: color
        }}
      />
    </div>
  );
};

export default EnergyBar;