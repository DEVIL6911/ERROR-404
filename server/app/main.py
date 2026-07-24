from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import init_db
from app.api.v1.router import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="High-Performance Ocean Conservation Platform API built with FastAPI for REEF Monorepo."
)

# Enable CORS for Vite React client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await init_db()

@app.get("/health", tags=["Health Check"])
async def health_check():
    return {
        "status": "HEALTHY",
        "platform": "REEF Ocean Conservation Platform",
        "ide": "Antigravity IDE",
        "version": settings.VERSION
    }

app.include_router(api_router, prefix=settings.API_V1_STR)
