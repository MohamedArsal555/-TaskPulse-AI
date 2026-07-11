from pydantic import BaseModel, Field
from typing import Optional


# ---------- Task Delay Prediction ----------

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


# ---------- Workload Scoring ----------

class WorkloadScoreRequest(BaseModel):
    employee_id: str
    active_task_hours: float = Field(..., ge=0)
    priority_weight: float = Field(1.0, gt=0)
    available_capacity_hours: float = Field(..., gt=0)


class WorkloadScoreResponse(BaseModel):
    employee_id: str
    workload_score: float
    workload_level: str


# ---------- Sprint Risk Prediction ----------

class SprintRiskRequest(BaseModel):
    sprint_id: str
    avg_task_delay_risk: float = Field(..., ge=0, le=1)
    blocker_density: float = Field(..., ge=0)
    planned_story_points: float = Field(..., gt=0)
    completed_story_points: float = Field(..., ge=0)


class SprintRiskResponse(BaseModel):
    sprint_id: str
    sprint_risk_score: float
    risk_level: str
