import { useMemo } from 'react';
import { Card } from '../../components/common/Card';
import { Icon } from '../../components/common/Icon';
import { getHistory } from '../../utils/historyStore';
import { useCountUp } from '../../hooks/useCountUp';
import { C, riskTier } from '../../styles/theme';

const TOOLS = [
  {
    key: 'delay',
    icon: 'clock',
    title: 'Task Delay Prediction',
    desc: 'How likely a task is to miss its deadline, from progress, time pressure and open blockers.',
  },
  {
    key: 'workload',
    icon: 'scale',
    title: 'Workload Scoring',
    desc: 'An employee’s current load against their available capacity, weighted by task priority.',
  },
  {
    key: 'sprint',
    icon: 'target',
    title: 'Sprint Risk Prediction',
    desc: 'Task delay risk, blocker density and velocity gap combined into one sprint health score.',
  },
];

const TYPE_META = {
  delay: { label: 'Delay', icon: 'clock' },
  workload: { label: 'Workload', icon: 'scale' },
  sprint: { label: 'Sprint', icon: 'target' },
};

function KpiCard({ icon, label, value, suffix = '', delay = 0 }) {
  return (
    <Card className="tp-pop" padding={18} style={{ animationDelay: `${delay}ms` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 32, height: 32, borderRadius: 9, background: C.p50, color: C.p500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <Icon name={icon} size={16} />
        </div>
        <span style={{ fontSize: 12, color: C.txtMut, fontWeight: 600 }}>{label}</span>
      </div>
      <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: C.txt, marginTop: 12 }}>
        {value}{suffix}
      </div>
    </Card>
  );
}

const DASHBOARD_NOTE = {
  full: 'You have report-building access to this dashboard.',
  limited: 'Showing a limited, summary-level view for your role.',
};

export function Dashboard({ setView, role }) {
  const note = role && DASHBOARD_NOTE[role.permissions?.dashboard];
  const history = useMemo(() => getHistory(), []);
  const total = history.length;

  const avgScore = total ? history.reduce((sum, e) => sum + e.score, 0) / total : 0;

  const tierCounts = { good: 0, watch: 0, risk: 0 };
  history.forEach((e) => { tierCounts[riskTier(e.level)] += 1; });
  const healthyShare = total ? (tierCounts.good / total) * 100 : 0;

  const typeCounts = { delay: 0, workload: 0, sprint: 0 };
  history.forEach((e) => { if (typeCounts[e.type] !== undefined) typeCounts[e.type] += 1; });
  const [mostActiveType, mostActiveCount] = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0];

  const countDisplay = useCountUp(total);
  const avgDisplay = useCountUp(avgScore * 100);
  const healthyDisplay = useCountUp(healthyShare);

  return (
    <div>
      <div
        className="tp-hero"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 16,
          padding: '32px 34px',
          background: C.heroGrad,
          isolation: 'isolate',
        }}
      >
        <div
          className="tp-hero-blob-a"
          style={{ position: 'absolute', top: -60, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.16)', filter: 'blur(40px)', zIndex: 0 }}
        />
        <div
          className="tp-hero-blob-b"
          style={{ position: 'absolute', bottom: -70, left: 60, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', filter: 'blur(36px)', zIndex: 0 }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.78)', textTransform: 'uppercase', letterSpacing: 0.7, fontWeight: 600 }}>
            TaskPulse AI
          </div>
          <h2 className="tp-serif" style={{ fontSize: 26, fontWeight: 600, marginTop: 8, color: '#fff' }}>
            Good to see you — here's what's on watch
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 10, lineHeight: 1.65 }}>
            We keep an eye on delay risk, workload, and sprint health so nothing slips
            through quietly. Today that's three hand-tuned formulas; once a few sprints of
            real outcomes are logged, each one gets swapped for a trained model behind the
            exact same request and response shape — no rework for you later.
          </p>
          {note && (
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.75)', marginTop: 12, fontWeight: 600 }}>
              {note}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 22 }}>
        <KpiCard icon="grid" label="Predictions run" value={Math.round(countDisplay)} delay={0} />
        <KpiCard icon="target" label="Avg risk score" value={avgDisplay.toFixed(0)} suffix="%" delay={60} />
        <KpiCard icon="clock" label="Healthy share" value={healthyDisplay.toFixed(0)} suffix="%" delay={120} />
        <KpiCard
          icon={TYPE_META[mostActiveType].icon}
          label="Most-used tool"
          value={mostActiveCount > 0 ? TYPE_META[mostActiveType].label : '—'}
          delay={180}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 14 }}>
        {TOOLS.map((tool) => (
          <Card
            key={tool.key}
            className="tp-tool-card"
            onClick={() => setView(tool.key)}
            style={{ cursor: 'pointer' }}
            padding={20}
          >
            <div
              className="tp-tool-icon"
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: C.heroGrad,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <Icon name={tool.icon} size={17} />
            </div>

            <h3 style={{ fontSize: 15, fontWeight: 600, color: C.txt, marginTop: 14 }}>{tool.title}</h3>
            <p style={{ fontSize: 13, color: C.txtSub, marginTop: 6, lineHeight: 1.55 }}>{tool.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
