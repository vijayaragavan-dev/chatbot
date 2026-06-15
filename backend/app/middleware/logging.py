import time
import logging
from fastapi import Request

logger = logging.getLogger(__name__)


async def log_middleware(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    elapsed = time.perf_counter() - start
    logger.info(
        "%s %s -> %d (%.2fms)",
        request.method,
        request.url.path,
        response.status_code,
        elapsed * 1000,
    )
    return response
