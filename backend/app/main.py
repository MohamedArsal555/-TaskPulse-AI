from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import delay, workload, sprint_risk

app = FastAPI(
    title="TaskPulse AI - AI/ML Microservice",
    description="Handles task delay prediction, workload scoring, and sprint risk prediction for TaskPulse AI.",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(delay.router, prefix="/api/v1", tags=["Task Delay Prediction"])
app.include_router(workload.router, prefix="/api/v1", tags=["Workload Scoring"])
app.include_router(sprint_risk.router, prefix="/api/v1", tags=["Sprint Risk Prediction"])


@app.get("/")
def health_check():
    return {"status": "TaskPulse AI microservice is running"}
