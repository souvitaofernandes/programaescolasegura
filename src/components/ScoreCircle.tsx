'use client';

import { ScoreBand } from '@/lib/types';
import { getBandColor, getBandLabel } from '@/lib/scoring';

interface ScoreCircleProps {
  score: number;
  band: ScoreBand;
  size?: 'sm' | 'lg';
}

export default function ScoreCircle({ score, band, size = 'lg' }: ScoreCircleProps) {
  const color = getBandColor(band);
  const label = getBandLabel(band);
  const isLarge = size === 'lg';
  const dim = isLarge ? 200 : 120;
  const strokeWidth = isLarge ? 10 : 6;
  const radius = (dim - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} className="-rotate-90">
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="score-circle-animated"
            style={{ '--score-offset': offset } as React.CSSProperties}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-bold text-navy-900 ${isLarge ? 'text-5xl' : 'text-2xl'}`}
          >
            {Math.round(score)}
          </span>
          <span className={`text-text-muted ${isLarge ? 'text-sm' : 'text-xs'}`}>
            de 100
          </span>
        </div>
      </div>
      <span
        className={`font-semibold ${isLarge ? 'text-lg' : 'text-sm'}`}
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}
