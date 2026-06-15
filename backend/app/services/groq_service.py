import uuid
import logging
from typing import Optional, Dict, List, Generator
from datetime import datetime, timezone

from bot import ChatBot

logger = logging.getLogger(__name__)


class SessionManager:
    def __init__(self):
        self._sessions: Dict[str, ChatBot] = {}
        self._timestamps: Dict[str, datetime] = {}

    def get_or_create(self, session_id: Optional[str] = None):
        if session_id and session_id in self._sessions:
            return session_id, self._sessions[session_id]

        new_id = str(uuid.uuid4())
        bot = ChatBot()
        self._sessions[new_id] = bot
        self._timestamps[new_id] = datetime.now(timezone.utc)
        logger.info("Created new session: %s", new_id)
        return new_id, bot

    def get(self, session_id: str) -> Optional[ChatBot]:
        return self._sessions.get(session_id)

    def delete(self, session_id: str):
        self._sessions.pop(session_id, None)
        self._timestamps.pop(session_id, None)
        logger.info("Deleted session: %s", session_id)

    def list_sessions(self) -> List[Dict]:
        result = []
        for sid, bot in self._sessions.items():
            user_msgs = [m for m in bot.messages if m["role"] == "user"]
            title = user_msgs[0]["content"][:60] if user_msgs else "New Chat"
            created = self._timestamps.get(sid, datetime.now(timezone.utc))
            result.append({
                "id": sid,
                "title": title,
                "created_at": created.isoformat().replace("+00:00", "Z"),
                "message_count": len(bot.messages) // 2,
            })
        result.sort(key=lambda s: s["created_at"], reverse=True)
        return result

    def get_history(self, session_id: str) -> List[Dict]:
        bot = self._sessions.get(session_id)
        if not bot:
            return []
        now = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
        return [
            {"role": m["role"], "content": m["content"], "timestamp": now}
            for m in bot.messages
        ]

    def process_message(self, session_id: str, message: str) -> str:
        _, bot = self.get_or_create(session_id)
        return bot.send_message(message)

    def process_message_stream(self, session_id: str, message: str) -> Generator[str, None, None]:
        _, bot = self.get_or_create(session_id)
        yield from bot.send_message_stream(message)
