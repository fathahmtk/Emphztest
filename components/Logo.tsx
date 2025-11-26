import React from 'react';

const Logo: React.FC<{ className?: string; variant?: 'light' | 'dark' }> = ({ className, variant = 'light' }) => {
  const eColor = variant === 'light' ? '#64748B' : '#475569'; // slate-500, slate-600
  const boltColor = '#0EA5E9'; // sky-500
  const textColor = variant === 'light' ? '#F1F5F9' : '#1E293B'; // slate-100, slate-800

  return (
    <svg 
      viewBox="0 0 180 50" // Adjusted for better aspect ratio
      className={className} 
      aria-labelledby="logo-title" 
      role="img"
    >
      <title id="logo-title">Emphz Logo</title>
      
      {/* Icon Part */}
      <g>
        <path
            d="M27 5 H10 C4.5 5 0 9.5 0 15 V35 C0 40.5 4.5 45 10 45 H27 V38 H10 V12 H27 V5 Z"
            fill={eColor}
        />
        <path
            d="M30 5 L47.5 25 L36.25 25 L52.5 45 L27.5 22.5 L38.75 22.5 L30 5 Z"
            fill={boltColor}
        />
      </g>
      
      {/* Text Part */}
      <g transform="translate(60, 12)">
        {/* Special 'E' */}
        <rect x="0" y="0" width="15" height="4" fill={boltColor} rx="1" />
        <rect x="0" y="8" width="15" height="4" fill={boltColor} rx="1" />
        <rect x="0" y="16" width="15" height="4" fill={boltColor} rx="1" />
        
        {/* 'mphz' text */}
        <text 
          x="22" 
          y="19" 
          fontFamily="Roboto, sans-serif" 
          fontSize="24" 
          fontWeight="900" 
          fill={textColor}
          letterSpacing="-0.5"
        >
          mphz
        </text>
      </g>
    </svg>
  );
};

export default Logo;
