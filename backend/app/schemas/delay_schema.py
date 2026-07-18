from pydantic import BaseModel, Field


class DelayPredictionRequest(BaseModel):
    task_id: str
    estimated_hours: float = Field(..., gt=0)
    hours_logged: float = Field(..., ge=0)
    days_remaining: int = Field(..., ge=0)
    total_days: int = Field(..., gt=0)
    blocker_count: int = Field(0, ge=0)
    employee_past_delay_rate: float = Field(0.0, ge=0, le=1)


class DelayPredictionResponse(BaseModel):
    task_id: str
    delay_risk_score: float
    risk_level: str
