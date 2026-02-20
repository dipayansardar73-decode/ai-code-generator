from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from datetime import datetime

class GenerationOptions(BaseModel):
    split_files: bool = False
    with_comments: bool = True
    modern_cpp_version: str = "C++17"
    template_name: Optional[str] = None

class GenerationRequest(BaseModel):
    prompt: str = Field(..., min_length=5, description="Natural language description of the code to generate.")
    options: GenerationOptions = GenerationOptions()

class GeneratedFile(BaseModel):
    filename: str
    content: str
    
class GenerationResponse(BaseModel):
    id: int
    files: List[GeneratedFile]
    model_used: str

class HistoryResponse(BaseModel):
    id: int
    prompt: str
    generated_code: str
    rating: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class FeedbackRequest(BaseModel):
    rating: int = Field(..., description="1 for thumbs up, -1 for thumbs down")
