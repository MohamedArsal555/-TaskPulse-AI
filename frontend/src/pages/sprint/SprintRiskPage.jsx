import { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Field, Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ResultPanel } from '../../components/common/ResultPanel';
import { predictSprintRisk } from '../../services/sprintService';
import { useApiAction } from '../../hooks/useApiAction';
import { runValidators, required, gt, gte, range } from '../../utils/validators';

const initialForm = {
  sprint_id: '',
  avg_task_delay_risk: '',
  blocker_density: '',
  planned_story_points: '',
  completed_story_points: '',
};

const RULES = {
  sprint_id: [required],
  avg_task_delay_risk: [required, (v) => range(v, 0, 1, 'Avg task delay risk')],
  blocker_density: [required, (v) => gte(v, 0, 'Blocker density')],
  planned_story_points: [required, (v) => gt(v, 0, 'Planned story points')],
  completed_story_points: [required, (v) => gte(v, 0, 'Completed story points')],
};

export function SprintRiskPage() {
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const { data, error, loading, run } = useApiAction(predictSprintRisk);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = runValidators(form, RULES);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    run(form);
  };

  const breakdown = data
    ? [
        { label: 'Avg task delay risk', value: Number(form.avg_task_delay_risk) },
        { label: 'Blocker density', value: Math.min(Number(form.blocker_density) / 5, 1) },
        {
          label: 'Velocity gap',
          value: Math.max(1 - Number(form.completed_story_points) / Number(form.planned_story_points), 0),
        },
      ]
    : [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: 24, alignItems: 'start' }}>
      <Card>
        <h3 style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 20 }}>Sprint metrics</h3>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <Field label="Sprint ID" error={fieldErrors.sprint_id}>
              <Input placeholder="S12" value={form.sprint_id} onChange={set('sprint_id')} error={!!fieldErrors.sprint_id} />
            </Field>
          </div>
          <Field label="Avg task delay risk" hint="0 – 1, average across tasks" error={fieldErrors.avg_task_delay_risk}>
            <Input type="number" step="0.05" min="0" max="1" placeholder="0.55" value={form.avg_task_delay_risk} onChange={set('avg_task_delay_risk')} error={!!fieldErrors.avg_task_delay_risk} />
          </Field>
          <Field label="Blocker density" error={fieldErrors.blocker_density}>
            <Input type="number" step="0.5" placeholder="2" value={form.blocker_density} onChange={set('blocker_density')} error={!!fieldErrors.blocker_density} />
          </Field>
          <Field label="Planned story points" error={fieldErrors.planned_story_points}>
            <Input type="number" placeholder="40" value={form.planned_story_points} onChange={set('planned_story_points')} error={!!fieldErrors.planned_story_points} />
          </Field>
          <Field label="Completed story points" error={fieldErrors.completed_story_points}>
            <Input type="number" placeholder="25" value={form.completed_story_points} onChange={set('completed_story_points')} error={!!fieldErrors.completed_story_points} />
          </Field>

          <div style={{ gridColumn: '1 / -1', marginTop: 4 }}>
            <Button type="submit" loading={loading}>Predict sprint risk</Button>
          </div>

          {error && (
            <div style={{ gridColumn: '1 / -1', padding: '10px 14px', borderRadius: 9, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>
              {error}
            </div>
          )}
        </form>
      </Card>

      <ResultPanel
        emptyIcon="target"
        emptyTitle="No prediction yet"
        emptySubtitle="Fill in the sprint metrics to see its risk level"
        subjectLabel="SPRINT"
        subjectValue={data?.sprint_id}
        score={data?.sprint_risk_score}
        level={data?.risk_level}
        breakdown={breakdown}
      />
    </div>
  );
}
