"""
TaskPulse AI - Scoring & Prediction Logic

NOTE: These are rule-based/weighted-formula implementations for the initial
version, since no historical training data exists yet. Once real usage data
accumulates (task completions, delays, workloads), these can be swapped for
trained ML models (e.g. XGBoost / Logistic Regression) without changing the
API contract (same request/response schema).
"""


def predict_task_delay(estimated_hours, hours_logged, days_remaining, total_days,
                        blocker_count, employee_past_delay_rate):
    # Weights - tunable once real data is available
    w1, w2, w3, w4 = 0.35, 0.30, 0.20, 0.15

    progress_ratio = hours_logged / estimated_hours if estimated_hours else 0
    time_pressure = 1 - (days_remaining / total_days) if total_days else 0
    blocker_factor = min(blocker_count / 5, 1.0)  # cap influence

    score = (
        w1 * min(progress_ratio, 1.5) +
        w2 * time_pressure +
        w3 * blocker_factor +
        w4 * employee_past_delay_rate
    )
    score = round(min(max(score, 0), 1), 2)

    if score < 0.4:
        level = "Low"
    elif score < 0.7:
        level = "Medium"
    else:
        level = "High"

    return score, level


def calculate_workload_score(active_task_hours, priority_weight, available_capacity_hours):
    score = round((active_task_hours * priority_weight) / available_capacity_hours, 2)

    if score < 0.6:
        level = "Underloaded"
    elif score <= 1.0:
        level = "Balanced"
    else:
        level = "Overloaded"

    return score, level


def predict_sprint_risk(avg_task_delay_risk, blocker_density, planned_story_points,
                         completed_story_points):
    velocity_gap = 1 - (completed_story_points / planned_story_points) if planned_story_points else 0
    velocity_gap = max(velocity_gap, 0)

    w1, w2, w3 = 0.5, 0.2, 0.3
    score = (
        w1 * avg_task_delay_risk +
        w2 * min(blocker_density / 5, 1.0) +
        w3 * velocity_gap
    )
    score = round(min(max(score, 0), 1), 2)

    if score < 0.4:
        level = "Healthy"
    elif score < 0.7:
        level = "At Risk"
    else:
        level = "Critical"

    return score, level
