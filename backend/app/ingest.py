"""
TwinAI Backend — Ingest knowledge docs into FAISS vector store.
Run: uv run python app/ingest.py
"""

import os
import sys
from pathlib import Path

from dotenv import load_dotenv

# Load .env from project root
env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(env_path)

from langchain_community.document_loaders import (
    DirectoryLoader,
    TextLoader,
    PyPDFLoader,
)
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS


DOCS_DIR = Path(__file__).resolve().parent.parent / "docs"
VECTORSTORE_DIR = Path(__file__).resolve().parent.parent / "vectorstore"


def ingest():
    print(f"📂 Loading docs from: {DOCS_DIR}")

    documents = []

    # Load markdown files
    md_loader = DirectoryLoader(
        str(DOCS_DIR),
        glob="**/*.md",
        loader_cls=TextLoader,
        loader_kwargs={"encoding": "utf-8"},
    )
    documents.extend(md_loader.load())

    # Load PDF files
    for pdf_file in DOCS_DIR.glob("*.pdf"):
        print(f"  📄 Loading PDF: {pdf_file.name}")
        pdf_loader = PyPDFLoader(str(pdf_file))
        documents.extend(pdf_loader.load())

    print(f"📝 Loaded {len(documents)} documents")

    # Split into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=80,
        separators=["\n## ", "\n### ", "\n---", "\n\n", "\n", " "],
    )
    chunks = splitter.split_documents(documents)
    print(f"✂️  Split into {len(chunks)} chunks")

    # Embed and store
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key:
        print("❌ OPENAI_API_KEY not found in .env")
        sys.exit(1)

    print("🧠 Embedding with OpenAI...")
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",
        openai_api_key=api_key,
    )

    vectorstore = FAISS.from_documents(chunks, embeddings)

    VECTORSTORE_DIR.mkdir(parents=True, exist_ok=True)
    vectorstore.save_local(str(VECTORSTORE_DIR))
    print(f"✅ Saved FAISS index to: {VECTORSTORE_DIR}")


if __name__ == "__main__":
    ingest()
