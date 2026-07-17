import { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Field, Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ResultPanel } from '../../components/common/ResultPanel';
import { ReadOnlyNotice } from '../../components/common/ReadOnlyNotice';
import { predictDelay } from '../../services/delayService';
import { useApiAction } from '../../hooks/useApiAction';
import { runValidators, required, gt, gte, range } from '../../utils/validators';
import { addHistoryEntry } from '../../utils/historyStore';
import { canEditNav } from '../../utils/roles';

const initialForm = {
  task_id: '',
  estimated_hours: '',
  hours_logged: '',
  days_remaining: '',
  total_days: '',
  blocker_count: '0',
  employee_past_delay_rate: '0',
};

const RULES = {
  task_id: [required],
  estimated_hours: [required, (v) => gt(v, 0, 'Estimated hours')],
  hours_logged: [required, (v) => gte(v, 0, 'Hours logged')],
  days_remaining: [required, (v) => gte(v, 0, 'Days remaining')],
  total_days: [required, (v) => gt(v, 0, 'Total days')],
  blocker_count: [(v) => gte(v, 0, 'Blocker count')],
  employee_past_delay_rate: [(v) => range(v, 0, 1, 'Past delay rate')],
};

export function DelayPredictionPage({ role }) {
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const { data, error, loading, run } = useApiAction(predictDelay);
  const canEdit = canEditNav(role, 'delay');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = runValidators(form, RULES);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const result = await run(form);
    if (result) {
      addHistoryEntry({ type: 'delay', subject: result.task_id, score: result.delay_risk_score, level: result.risk_level });
    }
  };

  const breakdown = data
    ? [
        { label: 'Progress ratio', value: Math.min(Number(form.hours_logged) / Number(form.estimated_hours), 1.5) },
        { label: 'Time pressure', value: Math.max(1 - Number(form.days_remaining) / Number(form.total_days), 0) },
        { label: 'Blocker factor', value: Math.min(Number(form.blocker_count) / 5, 1) },
        { label: 'Past delay rate', value: Number(form.employee_past_delay_rate) },
      ]
    : [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: 24, alignItems: 'start' }}>
      <Card>
        <h3 style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 20 }}>Task details</h3>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {!canEdit && (
            <ReadOnlyNotice message={`${role.label} has view-only access to task delay predictions.`} />
          )}
          <fieldset disabled={!canEdit} style={{ display: 'contents' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <Field label="Task ID" error={fieldErrors.task_id}>
              <Input placeholder="T101" value={form.task_id} onChange={set('task_id')} error={!!fieldErrors.task_id} />
            </Field>
          </div>
          <Field label="Estimated hours" error={fieldErrors.estimated_hours}>
            <Input type="number" step="0.5" placeholder="20" value={form.estimated_hours} onChange={set('estimated_hours')} error={!!fieldErrors.estimated_hours} />
          </Field>
          <Field label="Hours logged" error={fieldErrors.hours_logged}>
            <Input type="number" step="0.5" placeholder="14" value={form.hours_logged} onChange={set('hours_logged')} error={!!fieldErrors.hours_logged} />
          </Field>
          <Field label="Days remaining" error={fieldErrors.days_remaining}>
            <Input type="number" placeholder="2" value={form.days_remaining} onChange={set('days_remaining')} error={!!fieldErrors.days_remaining} />
          </Field>
          <Field label="Total days" error={fieldErrors.total_days}>
            <Input type="number" placeholder="10" value={form.total_days} onChange={set('total_days')} error={!!fieldErrors.total_days} />
          </Field>
          <Field label="Blocker count" hint="Open blockers raised on this task" error={fieldErrors.blocker_count}>
            <Input type="number" value={form.blocker_count} onChange={set('blocker_count')} error={!!fieldErrors.blocker_count} />
          </Field>
          <Field label="Employee past delay rate" hint="0 – 1 historical delay ratio" error={fieldErrors.employee_past_delay_rate}>
            <Input type="number" step="0.05" min="0" max="1" value={form.employee_past_delay_rate} onChange={set('employee_past_delay_rate')} error={!!fieldErrors.employee_past_delay_rate} />
          </Field>

          <div style={{ gridColumn: '1 / -1', marginTop: 4 }}>
            <Button type="submit" loading={loading}>Predict delay risk</Button>
          </div>
          </fieldset>

          {error && (
            <div style={{ gridColumn: '1 / -1', padding: '10px 14px', borderRadius: 9, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>
              {error}
            </div>
          )}
        </form>
      </Card>

      <ResultPanel
        emptyIcon="clock"
        emptyTitle="No prediction yet"
        emptySubtitle="Fill in the task details and run a prediction"
        subjectLabel="TASK"
        subjectValue={data?.task_id}
        score={data?.delay_risk_score}
        level={data?.risk_level}
        breakdown={breakdown}
      />
    </div>
  );
}
