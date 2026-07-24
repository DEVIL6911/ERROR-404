from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field

class ForumTopic(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    category: str  # PLASTIC_CURRENTS, CORAL_GENETICS, VOLUNTEER_MISSIONS
    author_name: str
    author_avatar: str
    content: str
    visual_mode: str = Field(default="SURFACE_OCEAN") # SURFACE_OCEAN or DEEP_SEA_PLASTIC_CURRENT
    likes: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ForumComment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    topic_id: int = Field(foreign_key="forumtopic.id")
    author_name: str
    author_badge: str
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
