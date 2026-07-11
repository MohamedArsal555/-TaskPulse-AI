import { riskColor } from '../../styles/theme';

export function Badge({ level, size = 'md' }) {
  const rc = riskColor(level);
  const pad = size === 'sm' ? '3px 7px' : '4px 9px';
  const font = size === 'sm' ? 10.5 : 11.5;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: pad,
        borderRadius: 4,
        background: rc.bg,
        color: rc.c,
        border: `1px solid ${rc.bd}`,
        fontSize: font,
        fontWeight: 600,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: rc.dot, flexShrink: 0 }} />
      {level}
    </span>
  );
}
