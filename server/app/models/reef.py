from typing import Optional
from sqlmodel import SQLModel, Field

class ReefLocation(SQLModel, table=True):
    id: str = Field(primary_key=True)
    name: str
    region: str
    latitude: float
    longitude: float
    health_index: int
    restoration_progress: int
    volunteer_count: int
    temperature: str
    depth: str
    status: str
    threat_level: str
    comic_badge: str
    speech_bubble: str
