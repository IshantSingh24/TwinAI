"""
TwinAI Backend — RAG chain using Groq LLM + FAISS retriever.
"""

import os
from pathlib import Path

from dotenv import load_dotenv

# Load .env from project root
env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(env_path)

from langchain_openai import OpenAIEmbeddings
from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate


VECTORSTORE_DIR = Path(__file__).resolve().parent.parent / "vectorstore"

SYSTEM_PROMPT = """You are TwinBot — Ishant Singh's AI twin on his portfolio website.
Your job is to answer questions about Ishant based on the provided context.

Rules:
- Be friendly, concise, and conversational.
- Answer in first person as if you ARE Ishant (e.g., "I built GroomAI..." not "Ishant built...").
- When someone asks "What has Ishant built?" or "Tell me about his projects", treat it the same as if they asked YOU directly. Refer to third-person questions about Ishant as questions about yourself.
- Use the context to give specific, detailed answers. Always look for relevant information in the context before falling back.
- Only say you don't know if the context truly has ZERO relevant information.
- Keep answers short (2-4 sentences) unless the user asks for detail.
- Be enthusiastic about AI topics.

Context:
{context}

Question: {question}

Answer:"""


def get_rag_chain():
    """Build and return the RAG chain."""
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    groq_key = os.getenv("GROQ_API_KEY", "").strip()

    if not api_key:
        raise ValueError("OPENAI_API_KEY not set")
    if not groq_key:
        raise ValueError("GROQ_API_KEY not set")

    # Load FAISS
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",
        openai_api_key=api_key,
    )
    vectorstore = FAISS.load_local(
        str(VECTORSTORE_DIR),
        embeddings,
        allow_dangerous_deserialization=True,
    )
    retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 8},
    )

    # Groq LLM (fast + free)
    llm = ChatGroq(
        model_name="llama-3.1-8b-instant",
        groq_api_key=groq_key,
        temperature=0.4,
        max_tokens=1024,
    )

    # Build chain
    prompt = PromptTemplate(
        template=SYSTEM_PROMPT,
        input_variables=["context", "question"],
    )

    chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt},
        return_source_documents=False,
    )

    return chain


# Singleton
_chain = None


def ask(question: str) -> str:
    """Ask a question to the RAG chain."""
    global _chain
    if _chain is None:
        _chain = get_rag_chain()
    
    result = _chain.invoke({"query": question})
    return result.get("result", "Sorry, I couldn't process that.")
