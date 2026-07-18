from pydantic import BaseModel, Field


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
