from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from app.core.database import get_async_session
from app.models.forum import ForumTopic, ForumComment
from app.schemas.forum import TopicCreate, TopicRead, CommentCreate, CommentRead

router = APIRouter(prefix="/forum", tags=["Discussion Forum"])

@router.get("/topics", response_model=List[TopicRead])
async def list_topics(db: AsyncSession = Depends(get_async_session)):
    stmt = select(ForumTopic)
    result = await db.execute(stmt)
    topics = result.scalars().all()
    
    if not topics:
        return [
            TopicRead(
                id=1,
                title="Plastic Pollution: Deep Sea Current Analysis & Polymer Trajectory",
                category="PLASTIC_CURRENTS",
                author_name="Oceania Explorer",
                author_avatar="🌊",
                content="Our drifter sensors show abyssal currents concentrating plastic micro-debris in Mariana Sector 4. Visual model available in 3D mode!",
                visual_mode="DEEP_SEA_PLASTIC_CURRENT",
                likes=142,
                created_at="2026-07-24T02:00:00Z",
                comments=[
                    CommentRead(
                        id=101,
                        topic_id=1,
                        author_name="Dr. Elena",
                        author_badge="CHIEF SCIENTIST",
                        content="Confirmed! The 3D particle current visualization reproduces the abyssal drift perfectly.",
                        created_at="2026-07-24T03:15:00Z"
                    )
                ]
            ),
            TopicRead(
                id=2,
                title="Super-Coral Nursery Deployment in Sector Alpha",
                category="CORAL_GENETICS",
                author_name="Captain Coral",
                author_avatar="🪸",
                content="Calling all volunteer divers! Micro-fragmentation nursery frames are ready for deployment on Friday.",
                visual_mode="SURFACE_OCEAN",
                likes=98,
                created_at="2026-07-23T18:30:00Z",
                comments=[]
            )
        ]
    
    output = []
    for t in topics:
        c_stmt = select(ForumComment).where(ForumComment.topic_id == t.id)
        c_res = await db.execute(c_stmt)
        comments = c_res.scalars().all()
        
        output.append(
            TopicRead(
                id=t.id,
                title=t.title,
                category=t.category,
                author_name=t.author_name,
                author_avatar=t.author_avatar,
                content=t.content,
                visual_mode=t.visual_mode,
                likes=t.likes,
                created_at=t.created_at,
                comments=[
                    CommentRead(
                        id=c.id,
                        topic_id=c.topic_id,
                        author_name=c.author_name,
                        author_badge=c.author_badge,
                        content=c.content,
                        created_at=c.created_at
                    ) for c in comments
                ]
            )
        )
    return output

@router.post("/topics", response_model=TopicRead)
async def create_topic(topic_in: TopicCreate, db: AsyncSession = Depends(get_async_session)):
    new_topic = ForumTopic(
        title=topic_in.title,
        category=topic_in.category,
        author_name="Guardian Squad Member",
        author_avatar="🛡️",
        content=topic_in.content,
        visual_mode=topic_in.visual_mode or "SURFACE_OCEAN",
        likes=0
    )
    db.add(new_topic)
    await db.commit()
    await db.refresh(new_topic)
    
    return TopicRead(
        id=new_topic.id,
        title=new_topic.title,
        category=new_topic.category,
        author_name=new_topic.author_name,
        author_avatar=new_topic.author_avatar,
        content=new_topic.content,
        visual_mode=new_topic.visual_mode,
        likes=new_topic.likes,
        created_at=new_topic.created_at,
        comments=[]
    )
