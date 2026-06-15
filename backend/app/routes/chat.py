import json
import logging
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from datetime import datetime, timezone

from backend.app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    SessionListResponse,
    SessionSummary,
    HistoryResponse,
    MessageResponse,
    DeleteResponse,
    ErrorResponse,
)
from backend.app.services.groq_service import SessionManager

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["Chat"])

session_manager = SessionManager()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        session_id, _ = session_manager.get_or_create(request.session_id)
        reply = session_manager.process_message(session_id, request.message)
        return ChatResponse(
            session_id=session_id,
            reply=reply,
            timestamp=datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Chat error")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    try:
        session_id, _ = session_manager.get_or_create(request.session_id)

        async def event_generator():
            yield f"data: {json.dumps({'token': '', 'session_id': session_id})}\n\n"
            try:
                for token in session_manager.process_message_stream(session_id, request.message):
                    yield f"data: {json.dumps({'token': token})}\n\n"
                yield f"data: {json.dumps({'done': True, 'session_id': session_id})}\n\n"
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"

        return StreamingResponse(
            event_generator(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )
    except Exception as e:
        logger.exception("Stream error")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/sessions", response_model=SessionListResponse)
async def list_sessions():
    sessions = session_manager.list_sessions()
    return SessionListResponse(
        sessions=[SessionSummary(**s) for s in sessions]
    )


@router.get("/sessions/{session_id}/history", response_model=HistoryResponse)
async def get_history(session_id: str):
    messages = session_manager.get_history(session_id)
    return HistoryResponse(
        messages=[MessageResponse(**m) for m in messages]
    )


@router.delete("/sessions/{session_id}", response_model=DeleteResponse)
async def delete_session(session_id: str):
    session_manager.delete(session_id)
    return DeleteResponse()
