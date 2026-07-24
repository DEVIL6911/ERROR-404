from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class CommentCreate(BaseModel):
    content: str
    author_badge: Optional[str] = "SQUAD VOLUNTEER"

class CommentRead(BaseModel):
    id: int
    topic_id: int
    author_name: str
    author_badge: str
    content: str
    created_at: datetime

class TopicCreate(BaseModel):
    title: str
    category: str
    content: str
    visual_mode: Optional[str] = "SURFACE_OCEAN"

class TopicRead(BaseModel):
    id: int
    title: str
    category: str
    author_name: str
    author_avatar: str
    content: str
    visual_mode: str
    likes: int
    created_at: datetime
    comments: List[CommentRead] = []
