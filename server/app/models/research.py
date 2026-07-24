from typing import Optional
from sqlmodel import SQLModel, Field

class ResearchPaper(SQLModel, table=True):
    id: str = Field(primary_key=True)
    title: str
    authors_str: str  # Comma separated
    journal: str
    year: int
    doi: str
    abstract: str
    tags_str: str  # Comma separated
    comic_summary: str
    downloads: int = Field(default=0)
