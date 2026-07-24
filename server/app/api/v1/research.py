from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from app.core.database import get_async_session
from app.models.research import ResearchPaper

router = APIRouter(prefix="/research", tags=["Research Papers & Data"])

@router.get("")
async def list_papers(db: AsyncSession = Depends(get_async_session)):
    stmt = select(ResearchPaper)
    result = await db.execute(stmt)
    papers = result.scalars().all()
    if not papers:
        return [
            {
                "id": "paper-01",
                "title": "Cryopreservation & Micro-fragmentation in Super-Coral Nursery Networks",
                "authors": ["Dr. Maya Lin", "Prof. Arthur Thorne"],
                "journal": "Journal of Marine Biotechnology & Antigravity Science",
                "year": 2026,
                "doi": "10.1016/j.marbio.2026.04.012",
                "abstract": "Using high-frequency acoustic levitation and thermal-stress pre-conditioning, super-coral fragments exhibited 400% accelerated calcification rates.",
                "tags": ["Coral Restoration", "Super-Corals", "Micro-fragmentation"],
                "comicSummary": "KABOOM breakthrough! Sonic soundwaves speed up coral growth by 4x!",
                "downloads": 4210
            },
            {
                "id": "paper-02",
                "title": "3D Hydrodynamic Vector Modeling of Deep-Sea Microplastic Transport",
                "authors": ["Dr. Elena Rostova", "Kai Takahashi"],
                "journal": "Oceanic Fluid Dynamics Quarterly",
                "year": 2026,
                "doi": "10.1038/s41586-026-0881-x",
                "abstract": "Coupling satellite altimetry with submerged autonomous drifters reveals sub-surface current corridors trapping 80% of marine polymers.",
                "tags": ["Plastic Currents", "Fluid Dynamics", "Deep Sea"],
                "comicSummary": "DEEP DIVE ALERT! Microplastics trapped in underwater current highways!",
                "downloads": 3150
            }
        ]
    
    return [
        {
            "id": p.id,
            "title": p.title,
            "authors": p.authors_str.split(","),
            "journal": p.journal,
            "year": p.year,
            "doi": p.doi,
            "abstract": p.abstract,
            "tags": p.tags_str.split(","),
            "comicSummary": p.comic_summary,
            "downloads": p.downloads
        } for p in papers
    ]
