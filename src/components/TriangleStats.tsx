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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {/* Academic label centered */}
      <span style={{
        fontWeight: 'bold',
        fontSize: '12px',
        color: '#FFE8D6',
        position: 'relative',
        marginBottom: '3px',
        left: '-7px',
      }}>
        Academic
      </span>

      {/* SVG for the triangle */}
      <svg width="220" height="220" className="mb-4">
        {/* Static triangle background */}
        <polygon
          points="100,0 0,173.2 200,173.2"
          fill="#505050"
          stroke="#FFE8D6"
          strokeWidth="2"
        />
        {/* Dynamic part with gradient */}
        <polygon
          points={points()}
          fill="url(#gradient)"
          stroke="#CB997E"
          strokeWidth="2"
        />
        <text x="5" y="190" fontWeight="bold" fill="#FFE8D6" fontSize="12">Social</text>
        <text x="160" y="190" fontWeight="bold" fill="#FFE8D6" fontSize="12">Career</text>

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#80C7F2", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#E4C1F9", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#FFB5B5", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default TriangleStats;
