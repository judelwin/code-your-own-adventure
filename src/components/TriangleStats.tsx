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
    const size = 115; // adjust radius so inner triangle fits well inside outer triangle
    const centerX = 140;
    const centerY = 150;
  
    const angleOffset = -Math.PI / 2;
    const angles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
  
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
        fontSize: '16px',
        color: '#FFE8D6',
        position: 'relative',
        marginBottom: '4px'
              }}>
        Academic
      </span>

      {/* SVG for the triangle */}
      <svg width="280" height="260">
      <polygon
        points="140,6 30,225 250,225"
        fill="#505050"
        filter="url(#triangleShadow)"
      />
      <polygon
        points={points()}
        fill="url(#gradient)"
      />

      <text x="35" y="250" fontWeight="bold" fill="#FFE8D6" fontSize="16">Social</text>
      <text x="205" y="250" fontWeight="bold" fill="#FFE8D6" fontSize="16">Career</text>

      <defs>
        <filter id="triangleShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#FFE8D6" flood-opacity="1" />
        </filter>

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
