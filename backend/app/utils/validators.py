def safe_ratio(numerator: float, denominator: float) -> float:
    """Divide, guarding against a zero denominator (e.g. zero estimated hours
    or zero planned story points) instead of raising ZeroDivisionError."""
    return numerator / denominator if denominator else 0.0
