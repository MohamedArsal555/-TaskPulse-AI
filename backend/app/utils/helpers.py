def clamp_score(score: float) -> float:
    return round(min(max(score, 0.0), 1.0), 2)


def bucket_score(score: float, low_label: str, mid_label: str, high_label: str,
                  low_threshold: float = 0.4, high_threshold: float = 0.7) -> str:
    """Shared Low/Medium/High-style thresholding used by both delay and sprint
    risk scoring, which land on the same 0.4 / 0.7 cut points with different labels."""
    if score < low_threshold:
        return low_label
    if score < high_threshold:
        return mid_label
    return high_label
