import React from 'react';

type Props = {
  energy: number;
};

const EnergyBar = ({ energy }: Props) => {
  const capped = Math.max(0, Math.min(100, energy));

  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-[240px] bg-[#505050] rounded-full flex items-end overflow-hidden border-[#FFE8D6] shadow-[0_0_20px_#FFE8D6]">
        <div
          className="w-full transition-all duration-500"
          style={{
            height: `${capped}%`,
            background: `linear-gradient(to top, #80C7F2, #E4C1F9, #FFB5B5)`
          }}
        />
      </div>

      {/* Label Below EnergyBar */}
      <span
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '6px',
          color: '#FFE8D6'
        }}
      >
        Energy
      </span>
    </div>
  );
};

export default EnergyBar;
