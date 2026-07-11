import { postJson } from './apiClient';

export function predictDelay(payload) {
  return postJson('/predict-delay', {
    task_id: payload.task_id,
    estimated_hours: Number(payload.estimated_hours),
    hours_logged: Number(payload.hours_logged),
    days_remaining: Number(payload.days_remaining),
    total_days: Number(payload.total_days),
    blocker_count: Number(payload.blocker_count || 0),
    employee_past_delay_rate: Number(payload.employee_past_delay_rate || 0),
  });
}
