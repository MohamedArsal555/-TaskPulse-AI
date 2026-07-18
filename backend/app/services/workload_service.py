from app.utils.validators import safe_ratio


def calculate_workload_score(active_task_hours, priority_weight, available_capacity_hours):
    score = round(safe_ratio(active_task_hours * priority_weight, available_capacity_hours), 2)

    if score < 0.6:
        level = "Underloaded"
    elif score <= 1.0:
        level = "Balanced"
    else:
        level = "Overloaded"

    return score, level
