import { postJson } from './apiClient';

export function predictSprintRisk(payload) {
  return postJson('/sprint-risk', {
    sprint_id: payload.sprint_id,
    avg_task_delay_risk: Number(payload.avg_task_delay_risk),
    blocker_density: Number(payload.blocker_density),
    planned_story_points: Number(payload.planned_story_points),
    completed_story_points: Number(payload.completed_story_points),
  });
}
