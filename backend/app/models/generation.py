from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Boolean
from app.database import Base

class GenerationHistory(Base):
    __tablename__ = "generation_history"

    id = Column(Integer, primary_key=True, index=True)
    prompt = Column(Text, nullable=False)
    generated_code = Column(Text, nullable=False)
    model_used = Column(String(50))
    options = Column(JSON)
    rating = Column(Integer, default=0) # 1 for up, -1 for down, 0 for neutral
    created_at = Column(DateTime, default=datetime.utcnow)

class Template(Base):
    __tablename__ = "templates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(Text)
    system_prompt_addition = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
