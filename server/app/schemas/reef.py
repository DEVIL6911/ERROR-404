from typing import List, Optional
from pydantic import BaseModel

class ReefRead(BaseModel):
    id: str
    name: str
    region: str
    coordinates: List[float]
    healthIndex: int
    restorationProgress: int
    volunteerCount: int
    temperature: str
    depth: str
    status: str
    threatLevel: str
    comicBadge: str
    speechBubble: str
