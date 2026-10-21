import os
from typing import Optional, List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "MindAtlas"
    PROJECT_TAGLINE: str = "The Ever-Growing Human Knowledge Library"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./mindatlas.db")
    
    # External research API settings
    OPENALEX_API_URL: str = "https://api.openalex.org"
    CROSSREF_API_URL: str = "https://api.crossref.org"
    ARXIV_API_URL: str = "https://export.arxiv.org/api/query"
    GUTENBERG_API_URL: str = "https://gutendex.com/books"
    
    # AI synthesis settings
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY", None)
    ANTHROPIC_API_KEY: Optional[str] = os.getenv("ANTHROPIC_API_KEY", None)
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY", None)
    DEFAULT_LLM_PROVIDER: str = os.getenv("DEFAULT_LLM_PROVIDER", "fallback")
    
    # Politeness and crawling
    USER_AGENT: str = "MindAtlas-ResearchCrawler/1.0 (+https://mindatlas.library; research@mindatlas.library)"
    CRAWL_POLITENESS_DELAY_SECONDS: float = 1.0
    MAX_CRAWL_RETRIES: int = 3
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env", extra="allow")

settings = Settings()
