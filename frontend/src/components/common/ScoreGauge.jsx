import { C, riskColor } from '../../styles/theme';

// Circular progress gauge for a 0..1 score, colored by risk level.
export function ScoreGauge({ score = 0, level, size = 132, stroke = 12 }) {
  const rc = riskColor(level);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, score));
  const offset = circumference * (1 - clamped);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={C.borderLight}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={rc.dot}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.32,0.72,0,1), stroke 0.3s ease' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="mono" style={{ fontSize: size * 0.22, fontWeight: 700, color: C.txt, lineHeight: 1 }}>
          {clamped.toFixed(2)}
        </span>
        <span style={{ fontSize: 10.5, color: C.txtMut, marginTop: 5, letterSpacing: 0.8, textTransform: 'uppercase' }}>Score</span>
      </div>
    </div>
  );
}
