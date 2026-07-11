import { postJson } from './apiClient';

export function scoreWorkload(payload) {
  return postJson('/workload-score', {
    employee_id: payload.employee_id,
    active_task_hours: Number(payload.active_task_hours),
    priority_weight: Number(payload.priority_weight || 1),
    available_capacity_hours: Number(payload.available_capacity_hours),
  });
}
