from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone


class ChatRequest(BaseModel):
    session_id: Optional[str] = Field(None, description="Existing session ID or null for new chat")
    message: str = Field(..., min_length=1, max_length=4096, description="User message")


class TokenData(BaseModel):
    token: str = ""


class StreamDone(BaseModel):
    done: bool = True
    session_id: str


class ChatResponse(BaseModel):
    session_id: str
    reply: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"))


class MessageResponse(BaseModel):
    role: str
    content: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"))


class SessionSummary(BaseModel):
    id: str
    title: str
    created_at: str
    message_count: int


class SessionListResponse(BaseModel):
    sessions: List[SessionSummary]


class HistoryResponse(BaseModel):
    messages: List[MessageResponse]


class DeleteResponse(BaseModel):
    status: str = "deleted"


class ErrorResponse(BaseModel):
    detail: str
    code: str = "error"
