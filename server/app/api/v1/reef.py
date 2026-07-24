from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from app.core.database import get_async_session
from app.models.reef import ReefLocation
from app.schemas.reef import ReefRead

router = APIRouter(prefix="/reef", tags=["Reef Conservation Data"])

@router.get("", response_model=List[ReefRead])
async def get_all_reefs(db: AsyncSession = Depends(get_async_session)):
    stmt = select(ReefLocation)
    result = await db.execute(stmt)
    reefs = result.scalars().all()
    
    # Fallback default seed objects if DB is empty
    if not reefs:
        return [
            ReefRead(
                id="reef-01",
                name="Great Barrier Guardian Sector Alpha",
                region="Coral Sea, Australia",
                coordinates=[-18.2871, 147.6992],
                healthIndex=78,
                restorationProgress=82,
                volunteerCount=1420,
                temperature="27.4°C",
                depth="12m",
                status="ACTIVE_RESTORATION",
                threatLevel="MODERATE",
                comicBadge="HEROIC SQUAD",
                speechBubble="Super-coral polyps are flourishing here! 82% restored!"
            ),
            ReefRead(
                id="reef-02",
                name="Mesoamerican Super-Reef Vanguard",
                region="Caribbean Coast, Honduras",
                coordinates=[16.4897, -86.5269],
                healthIndex=64,
                restorationProgress=69,
                volunteerCount=980,
                temperature="29.1°C",
                depth="18m",
                status="MONITORED",
                threatLevel="HIGH",
                comicBadge="HIGH ALERT",
                speechBubble="Heatwave detected! Deploy thermal-tolerant nursery frames!"
            )
        ]
    
    return [
        ReefRead(
            id=r.id,
            name=r.name,
            region=r.region,
            coordinates=[r.latitude, r.longitude],
            healthIndex=r.health_index,
            restorationProgress=r.restoration_progress,
            volunteerCount=r.volunteer_count,
            temperature=r.temperature,
            depth=r.depth,
            status=r.status,
            threatLevel=r.threat_level,
            comicBadge=r.comic_badge,
            speechBubble=r.speech_bubble
        ) for r in reefs
    ]

@router.get("/{location_id}", response_model=ReefRead)
async def get_reef_by_id(location_id: str, db: AsyncSession = Depends(get_async_session)):
    stmt = select(ReefLocation).where(ReefLocation.id == location_id)
    result = await db.execute(stmt)
    r = result.scalars().first()
    if not r:
        if location_id == "reef-01":
            return ReefRead(
                id="reef-01",
                name="Great Barrier Guardian Sector Alpha",
                region="Coral Sea, Australia",
                coordinates=[-18.2871, 147.6992],
                healthIndex=78,
                restorationProgress=82,
                volunteerCount=1420,
                temperature="27.4°C",
                depth="12m",
                status="ACTIVE_RESTORATION",
                threatLevel="MODERATE",
                comicBadge="HEROIC SQUAD",
                speechBubble="Super-coral polyps are flourishing here! 82% restored!"
            )
        raise HTTPException(status_code=404, detail="Reef sector location not found!")
    
    return ReefRead(
        id=r.id,
        name=r.name,
        region=r.region,
        coordinates=[r.latitude, r.longitude],
        healthIndex=r.health_index,
        restorationProgress=r.restoration_progress,
        volunteerCount=r.volunteer_count,
        temperature=r.temperature,
        depth=r.depth,
        status=r.status,
        threatLevel=r.threat_level,
        comicBadge=r.comic_badge,
        speechBubble=r.speech_bubble
    )
