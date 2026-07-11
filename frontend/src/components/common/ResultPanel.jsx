import { Card } from './Card';
import { Badge } from './Badge';
import { ScoreGauge } from './ScoreGauge';
import { EmptyState } from './EmptyState';
import { C } from '../../styles/theme';

// Shared "prediction result" card: gauge + badge + optional factor breakdown.
// Used by every predictor page so results always read the same way.
export function ResultPanel({ emptyIcon, emptyTitle, emptySubtitle, subjectLabel, subjectValue, score, level, breakdown }) {
  if (score === null || score === undefined) {
    return (
      <Card style={{ minHeight: 340, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <EmptyState icon={emptyIcon} title={emptyTitle} subtitle={emptySubtitle} />
      </Card>
    );
  }

  return (
    <Card className="tp-pop" style={{ minHeight: 340 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <div style={{ fontSize: 12, color: C.txtMut, fontWeight: 600 }}>{subjectLabel}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.txt }}>{subjectValue}</div>
        </div>
        <Badge level={level} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 24px' }}>
        <ScoreGauge score={score} level={level} />
      </div>

      {breakdown && breakdown.length > 0 && (
        <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {breakdown.map((row) => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 12.5, color: C.txtSub, width: 150, flexShrink: 0 }}>{row.label}</span>
              <div style={{ flex: 1, height: 6, borderRadius: 4, background: C.borderLight, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${Math.min(100, Math.max(0, row.value * 100))}%`,
                    height: '100%',
                    background: C.gradBtn,
                    borderRadius: 4,
                    transition: 'width 0.6s ease',
                  }}
                />
              </div>
              <span className="mono" style={{ fontSize: 12, color: C.txtMut, width: 42, textAlign: 'right' }}>
                {row.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
