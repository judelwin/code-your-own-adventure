import React from 'react';

type Props = {
  academic: number;
  social: number;
  career: number;
};

const TriangleStats = ({ academic, social, career }: Props) => {
  const maxStat = 100;
  const percent = (val: number) => Math.min(1, val / maxStat);

  const points = () => {
    const size = 100;
    const centerX = 100;
    const centerY = 100;

    const angleOffset = -Math.PI / 2;
    const angles = [0, 2 * Math.PI / 3, 4 * Math.PI / 3];

    const stats = [academic, social, career];
    return stats.map((stat, i) => {
      const angle = angles[i] + angleOffset;
      const r = percent(stat) * size;
      return [
        centerX + r * Math.cos(angle),
        centerY + r * Math.sin(angle)
      ].join(',');
    }).join(' ');
  };

  return (
    <svg width="200" height="200" className="mb-4">
      <polygon
        points="100,0 0,173.2 200,173.2"
        fill="none"
        stroke="#ccc"
        strokeWidth="2"
      />
      <polygon
        points={points()}
        fill="#FFE8D6"
        stroke="#CB997E"
        strokeWidth="2"
      />
      <text x="95" y="10" fontSize="10">Academic</text>
      <text x="5" y="180" fontSize="10">Social</text>
      <text x="160" y="180" fontSize="10">Career</text>
    </svg>
  );
};

export default TriangleStats;