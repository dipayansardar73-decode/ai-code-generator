from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class TemplateResponse(BaseModel):
    id: int
    name: str
    description: str
    
# Mock templates for now (should be DB backed eventually)
MOCK_TEMPLATES = [
    TemplateResponse(id=1, name="Class", description="Standard modern C++ class with rule of 5."),
    TemplateResponse(id=2, name="Singleton", description="Thread-safe singleton pattern implementation."),
    TemplateResponse(id=3, name="Factory", description="Factory pattern for object creation.")
]

@router.get("/", response_model=List[TemplateResponse])
async def get_templates():
    """Retrieve available code templates."""
    return MOCK_TEMPLATES
