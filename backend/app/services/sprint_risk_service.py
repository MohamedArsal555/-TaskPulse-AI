from app.utils.helpers import bucket_score, clamp_score
from app.utils.validators import safe_ratio

W_DELAY_RISK, W_BLOCKER_DENSITY, W_VELOCITY_GAP = 0.5, 0.2, 0.3


def predict_sprint_risk(avg_task_delay_risk, blocker_density, planned_story_points,
                         completed_story_points):
    velocity_gap = max(1 - safe_ratio(completed_story_points, planned_story_points), 0)

    score = clamp_score(
        W_DELAY_RISK * avg_task_delay_risk
        + W_BLOCKER_DENSITY * min(blocker_density / 5, 1.0)
        + W_VELOCITY_GAP * velocity_gap
    )
    level = bucket_score(score, "Healthy", "At Risk", "Critical")

    return score, level
