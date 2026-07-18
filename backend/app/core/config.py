from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    APP_NAME: str = "TaskPulse AI - AI/ML Microservice"
    APP_DESCRIPTION: str = (
        "Handles task delay prediction, workload scoring, and sprint risk prediction for TaskPulse AI."
    )
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True

    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
