import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "REEF | Ocean Conservation Platform API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "KABOOM_SUPER_SECRET_POP_ART_KEY_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Defaults to SQLite async for immediate local dev, or asyncpg for PostgreSQL
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "sqlite+aiosqlite:///./reef_local.db"
    )

    class Config:
        case_sensitive = True

settings = Settings()
