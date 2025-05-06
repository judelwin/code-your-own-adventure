import React from 'react';

type Props = {
  energy: number;
};

const EnergyBar = ({ energy }: Props) => {
  const capped = Math.max(0, Math.min(100, energy));

  return (
    <div className="flex flex-col items-center">
      <div className="w-6 h-[180px] bg-[#505050] rounded-full flex items-end overflow-hidden border-2 border-black shadow-md">
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
          fontSize: '12px',
          fontWeight: 'bold',
          marginTop: '3px', // Adjust spacing between the bar and label
          color: 'white'    // You can customize the color if needed
        }}
      >
        Energy
      </span>
    </div>
  );
};

export default EnergyBar;
