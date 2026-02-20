from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List

from app.database import get_db
from app.models.generation import GenerationHistory
from app.schemas.generation import HistoryResponse, FeedbackRequest

router = APIRouter()

@router.get("/", response_model=List[HistoryResponse])
async def get_history(limit: int = 50, db: AsyncSession = Depends(get_db)):
    """Retrieve code generation history."""
    query = select(GenerationHistory).order_by(desc(GenerationHistory.created_at)).limit(limit)
    result = await db.execute(query)
    history_items = result.scalars().all()
    return list(history_items)

@router.post("/{history_id}/feedback", response_model=dict)
async def submit_feedback(history_id: int, request: FeedbackRequest, db: AsyncSession = Depends(get_db)):
    """Submit upvote/downvote for a generation."""
    query = select(GenerationHistory).where(GenerationHistory.id == history_id)
    result = await db.execute(query)
    history_item = result.scalar_one_or_none()
    
    if not history_item:
        raise HTTPException(status_code=404, detail="History not found")
        
    history_item.rating = request.rating
    db.add(history_item)
    await db.commit()
    return {"message": "Feedback submitted successfully", "rating": history_item.rating}
