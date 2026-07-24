from fastapi import APIRouter
from app.api.v1.users import router as auth_router
from app.api.v1.reef import router as reef_router
from app.api.v1.research import router as research_router
from app.api.v1.forum import router as forum_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(reef_router)
api_router.include_router(research_router)
api_router.include_router(forum_router)
