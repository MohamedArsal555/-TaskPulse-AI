import { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Field, Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ResultPanel } from '../../components/common/ResultPanel';
import { ReadOnlyNotice } from '../../components/common/ReadOnlyNotice';
import { scoreWorkload } from '../../services/workloadService';
import { useApiAction } from '../../hooks/useApiAction';
import { runValidators, required, gt, gte } from '../../utils/validators';
import { addHistoryEntry } from '../../utils/historyStore';
import { canEditNav } from '../../utils/roles';

const initialForm = {
  employee_id: '',
  active_task_hours: '',
  priority_weight: '1',
  available_capacity_hours: '',
};

const RULES = {
  employee_id: [required],
  active_task_hours: [required, (v) => gte(v, 0, 'Active task hours')],
  priority_weight: [required, (v) => gt(v, 0, 'Priority weight')],
  available_capacity_hours: [required, (v) => gt(v, 0, 'Available capacity')],
};

export function WorkloadScorePage({ role }) {
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const { data, error, loading, run } = useApiAction(scoreWorkload);
  const canEdit = canEditNav(role, 'workload');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = runValidators(form, RULES);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const result = await run(form);
    if (result) {
      addHistoryEntry({ type: 'workload', subject: result.employee_id, score: result.workload_score, level: result.workload_level });
    }
  };

  const breakdown = data
    ? [
        { label: 'Active hours', value: Math.min(Number(form.active_task_hours) / Number(form.available_capacity_hours), 1.5) },
        { label: 'Priority weight', value: Math.min(Number(form.priority_weight) / 2, 1) },
      ]
    : [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: 24, alignItems: 'start' }}>
      <Card>
        <h3 style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 20 }}>Employee capacity</h3>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {!canEdit && (
            <ReadOnlyNotice message={`${role.label} has ${role.permissions.workload === 'none' ? 'no' : 'view-only'} access to workload scoring.`} />
          )}
          <fieldset disabled={!canEdit} style={{ display: 'contents' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <Field label="Employee ID" error={fieldErrors.employee_id}>
              <Input placeholder="E203" value={form.employee_id} onChange={set('employee_id')} error={!!fieldErrors.employee_id} />
            </Field>
          </div>
          <Field label="Active task hours" error={fieldErrors.active_task_hours}>
            <Input type="number" step="0.5" placeholder="32" value={form.active_task_hours} onChange={set('active_task_hours')} error={!!fieldErrors.active_task_hours} />
          </Field>
          <Field label="Available capacity (hrs)" error={fieldErrors.available_capacity_hours}>
            <Input type="number" step="0.5" placeholder="40" value={form.available_capacity_hours} onChange={set('available_capacity_hours')} error={!!fieldErrors.available_capacity_hours} />
          </Field>
          <Field label="Priority weight" hint="1.0 = normal priority" error={fieldErrors.priority_weight}>
            <Input type="number" step="0.1" value={form.priority_weight} onChange={set('priority_weight')} error={!!fieldErrors.priority_weight} />
          </Field>

          <div style={{ gridColumn: '1 / -1', marginTop: 4 }}>
            <Button type="submit" loading={loading}>Calculate workload score</Button>
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
        emptyIcon="scale"
        emptyTitle="No score yet"
        emptySubtitle="Fill in the employee's capacity to see their workload level"
        subjectLabel="EMPLOYEE"
        subjectValue={data?.employee_id}
        score={data?.workload_score}
        level={data?.workload_level}
        breakdown={breakdown}
      />
    </div>
  );
}
