
import React from 'react';

interface Coords {
  x: number;
  y: number;
}

interface WorldMapProps {
  userCoords: Coords;
  serverCoords: Coords | null;
}

const WorldMap: React.FC<WorldMapProps> = ({ userCoords, serverCoords }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 940 470" className="w-full h-auto">
        {/* Simplified World Map Path */}
        <path d="M470 0C210 0 0 105 0 235s210 235 470 235 470-105 470-235S730 0 470 0zm220 300c-60 0-110-25-140-60-20 40-70 70-130 70s-110-30-130-70c-30 35-80 60-140 60-100 0-180-80-180-180S150 20 250 20s180 80 180 180c0 50-20 95-50 130 30-35 80-60 140-60s110 25 140 60c-30-35-50-80-50-130 0-100 80-180 180-180s180 80 180 180-80 180-180 180z" fill="#374151" />
        <path d="M470,235 m-1,0 a1,1 0 1,0 2,0 a1,1 0 1,0 -2,0" fill="#4f46e5" /> {/* This is a placeholder for a central point, not visible */}
        
        {/* User Location */}
        <circle cx={userCoords.x} cy={userCoords.y} r="6" fill="#60a5fa" stroke="#0D1117" strokeWidth="2">
            <animate attributeName="r" from="6" to="10" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="1" to="0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Server Location and Connection Line */}
        {serverCoords && (
          <g>
            <circle cx={serverCoords.x} cy={serverCoords.y} r="6" fill="#34d399" stroke="#0D1117" strokeWidth="2">
                 <animate attributeName="r" from="6" to="10" dur="1.5s" repeatCount="indefinite" />
                 <animate attributeName="opacity" from="1" to="0.5" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <path
              key={`${serverCoords.x}-${serverCoords.y}`}
              className="connection-line"
              d={`M ${userCoords.x} ${userCoords.y} Q ${(userCoords.x + serverCoords.x) / 2} ${(userCoords.y + serverCoords.y) / 2 - 80} ${serverCoords.x} ${serverCoords.y}`}
              stroke="url(#line-gradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
             <defs>
              <linearGradient id="line-gradient" gradientUnits="userSpaceOnUse" x1={userCoords.x} y1={userCoords.y} x2={serverCoords.x} y2={serverCoords.y}>
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </g>
        )}
      </svg>
    </div>
  );
};

export default WorldMap;
