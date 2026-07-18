from pydantic import BaseModel, Field


class WorkloadScoreRequest(BaseModel):
    employee_id: str
    active_task_hours: float = Field(..., ge=0)
    priority_weight: float = Field(1.0, gt=0)
    available_capacity_hours: float = Field(..., gt=0)


class WorkloadScoreResponse(BaseModel):
    employee_id: str
    workload_score: float
    workload_level: str
