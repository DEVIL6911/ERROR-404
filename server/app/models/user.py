from typing import Optional
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str
    full_name: Optional[str] = None
    role: str = Field(default="SQUAD_MEMBER") # SQUAD_MEMBER, SCIENTIST, GUARDIAN_LEAD
    comic_title: str = Field(default="Coral Cadet")
    is_active: bool = Field(default=True)
