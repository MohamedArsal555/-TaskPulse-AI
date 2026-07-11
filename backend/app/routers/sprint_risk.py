from fastapi import APIRouter
from app.models.schemas import SprintRiskRequest, SprintRiskResponse
from app.services.scoring_logic import predict_sprint_risk

router = APIRouter()


@router.post("/sprint-risk", response_model=SprintRiskResponse)
def sprint_risk(payload: SprintRiskRequest):
    score, level = predict_sprint_risk(
        avg_task_delay_risk=payload.avg_task_delay_risk,
        blocker_density=payload.blocker_density,
        planned_story_points=payload.planned_story_points,
        completed_story_points=payload.completed_story_points,
    )
    return SprintRiskResponse(
        sprint_id=payload.sprint_id,
        sprint_risk_score=score,
        risk_level=level,
    )
