from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AI Code Generation API",
    description="API for generating C++ code using Azure OpenAI.",
    version="1.0.0"
)

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

from app.api import generate, history, templates

app.include_router(generate.router, prefix="/api/generate", tags=["Generation"])
app.include_router(history.router, prefix="/api/history", tags=["History"])
app.include_router(templates.router, prefix="/api/templates", tags=["Templates"])
