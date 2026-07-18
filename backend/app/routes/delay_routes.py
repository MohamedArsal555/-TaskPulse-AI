from fastapi import APIRouter

from app.schemas.delay_schema import DelayPredictionRequest, DelayPredictionResponse
from app.services.delay_service import predict_task_delay

router = APIRouter()


@router.post("/predict-delay", response_model=DelayPredictionResponse)
def predict_delay(payload: DelayPredictionRequest):
    score, level = predict_task_delay(
        estimated_hours=payload.estimated_hours,
        hours_logged=payload.hours_logged,
        days_remaining=payload.days_remaining,
        total_days=payload.total_days,
        blocker_count=payload.blocker_count,
        employee_past_delay_rate=payload.employee_past_delay_rate,
    )
    return DelayPredictionResponse(
        task_id=payload.task_id,
        delay_risk_score=score,
        risk_level=level,
    )
