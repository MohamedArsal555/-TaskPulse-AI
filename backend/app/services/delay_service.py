"""
Rule-based/weighted-formula implementation for the initial version, since no
historical training data exists yet. Once real usage data accumulates (task
completions, delays), this can be swapped for a trained ML model without
changing the API contract (same request/response schema).
"""

from app.utils.helpers import bucket_score, clamp_score
from app.utils.validators import safe_ratio

# Weights - tunable once real data is available
W_PROGRESS, W_TIME_PRESSURE, W_BLOCKERS, W_PAST_DELAY = 0.35, 0.30, 0.20, 0.15


def predict_task_delay(estimated_hours, hours_logged, days_remaining, total_days,
                        blocker_count, employee_past_delay_rate):
    progress_ratio = safe_ratio(hours_logged, estimated_hours)
    time_pressure = 1 - safe_ratio(days_remaining, total_days)
    blocker_factor = min(blocker_count / 5, 1.0)  # cap influence

    score = clamp_score(
        W_PROGRESS * min(progress_ratio, 1.5)
        + W_TIME_PRESSURE * time_pressure
        + W_BLOCKERS * blocker_factor
        + W_PAST_DELAY * employee_past_delay_rate
    )
    level = bucket_score(score, "Low", "Medium", "High")

    return score, level
