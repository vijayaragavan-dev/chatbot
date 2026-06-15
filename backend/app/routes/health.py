import logging
from datetime import datetime, timezone
from fastapi import APIRouter

logger = logging.getLogger(__name__)
router = APIRouter(tags=["Health"])


@router.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "version": "1.0.0",
    }
