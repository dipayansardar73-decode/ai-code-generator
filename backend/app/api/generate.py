from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.database import get_db
from app.schemas.generation import GenerationRequest, GenerationResponse
from app.services.openai_service import generate_cpp_code
from app.services.formatter import format_cpp_code
from app.models.generation import GenerationHistory

router = APIRouter()

@router.post("/", response_model=GenerationResponse)
async def generate_code(request: GenerationRequest, db: AsyncSession = Depends(get_db)):
    """
    Generate C++ code from a natural language prompt using Azure OpenAI.
    """
    try:
        # Call the OpenAI service (which handles caching)
        result = await generate_cpp_code(request.prompt, request.options)
        
        files = result["files"]
        model_used = result["model_used"]
        
        # Apply formatting
        for f in files:
            f.content = format_cpp_code(f.content)
            
        # Save to PostgreSQL Generation History
        history = GenerationHistory(
            prompt=request.prompt,
            generated_code="\\n//--snip--//\\n".join([f.content for f in files]),
            model_used=model_used,
            options=request.options.model_dump()
        )
        db.add(history)
        await db.commit()
        await db.refresh(history)
        
        return GenerationResponse(
            id=history.id,
            files=files,
            model_used=model_used
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
