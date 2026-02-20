import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Code Generation API"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5432/codegen")
    
    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    # Azure OpenAI
    AZURE_OPENAI_ENDPOINT: str = os.getenv("AZURE_OPENAI_ENDPOINT", "")
    AZURE_OPENAI_API_KEY: str = os.getenv("AZURE_OPENAI_API_KEY", "")
    AZURE_OPENAI_DEPLOYMENT_NAME: str = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME", "gpt-4")
    AZURE_OPENAI_API_VERSION: str = os.getenv("AZURE_OPENAI_API_VERSION", "2023-12-01-preview")
    
    class Config:
        env_file = ".env"

settings = Settings()
