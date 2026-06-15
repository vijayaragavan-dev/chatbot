from pydantic_settings import BaseSettings
from typing import List, Optional


class Settings(BaseSettings):
    app_name: str = "AI Chatbot API"
    app_version: str = "1.0.0"
    debug: bool = False
    api_key: Optional[str] = None

    cors_origins: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://your-frontend.vercel.app",
    ]

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "extra": "ignore",
    }


settings = Settings()
