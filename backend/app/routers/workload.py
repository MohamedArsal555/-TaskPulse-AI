from fastapi import APIRouter
from app.models.schemas import WorkloadScoreRequest, WorkloadScoreResponse
from app.services.scoring_logic import calculate_workload_score

router = APIRouter()


@router.post("/workload-score", response_model=WorkloadScoreResponse)
def workload_score(payload: WorkloadScoreRequest):
    score, level = calculate_workload_score(
        active_task_hours=payload.active_task_hours,
        priority_weight=payload.priority_weight,
        available_capacity_hours=payload.available_capacity_hours,
    )
    return WorkloadScoreResponse(
        employee_id=payload.employee_id,
        workload_score=score,
        workload_level=level,
    )
