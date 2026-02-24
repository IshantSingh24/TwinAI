"""
TwinAI Backend — FastAPI server with /api/chat endpoint.
Run: uv run uvicorn app.main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.rag import ask

app = FastAPI(
    title="TwinAI Backend",
    description="RAG-powered chatbot API for Ishant Singh's portfolio",
    version="1.0.0",
)

# CORS — allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


@app.get("/")
def root():
    return {"status": "ok", "service": "TwinAI Backend"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    answer = ask(req.message)
    return ChatResponse(response=answer)
