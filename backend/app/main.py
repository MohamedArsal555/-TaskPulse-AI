from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.core.exceptions import AppException
from app.routes import delay_routes, workload_routes, sprint_risk_routes

app = FastAPI(
    title=settings.APP_NAME,
    description=settings.APP_DESCRIPTION,
    version=settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(AppException)
def handle_app_exception(request: Request, exc: AppException):
    return JSONResponse(status_code=exc.status_code, content={"success": False, "message": exc.message})


app.include_router(delay_routes.router, prefix="/api/v1", tags=["Task Delay Prediction"])
app.include_router(workload_routes.router, prefix="/api/v1", tags=["Workload Scoring"])
app.include_router(sprint_risk_routes.router, prefix="/api/v1", tags=["Sprint Risk Prediction"])


@app.get("/")
def health_check():
    return {"status": "TaskPulse AI microservice is running"}
