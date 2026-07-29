from pydantic import BaseModel
from typing import Optional


class IncidentMetadata(BaseModel):
    location: Optional[str] = None
    event_time: Optional[str] = None
    reporter_note: Optional[str] = None