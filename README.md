# TwinAI 🤖

AI-powered portfolio website with a RAG-based chatbot twin.

**Live Demo:** _coming soon_

---

## ✨ Features

- **Terminal Noir** design — dark, cinematic, command-center aesthetic
- **Particle Network** animated hero background
- **TwinBot** — RAG chatbot that answers questions about me using my own data
- **Dynamic typewriter** effect, glassmorphic project cards, smooth scroll
- **Fully responsive** design

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| **Frontend** | Next.js, TypeScript, CSS (Terminal Noir) |
| **Backend** | FastAPI, LangChain, FAISS |
| **LLM** | Groq (LLaMA 3.1-8B Instant) |
| **Embeddings** | OpenAI text-embedding-3-small |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- [uv](https://docs.astral.sh/uv/) (Python package manager)

### Setup

```bash
# Clone
git clone https://github.com/IshantSingh24/TwinAI.git
cd TwinAI

# Create .env in project root
cat > .env << EOF
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
EOF

# Backend
cd backend
uv sync
uv run python app/ingest.py    # Build vector store
uv run uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

## 📁 Structure

```
TwinAI/
├── frontend/          ← Next.js app
│   ├── app/
│   │   ├── components/   (Navbar, Hero, About, Skills, Projects, Experience, Contact, ChatWidget)
│   │   ├── globals.css   (Terminal Noir design system)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── package.json
├── backend/           ← FastAPI + RAG
│   ├── app/
│   │   ├── main.py       (FastAPI server)
│   │   ├── rag.py        (RAG chain: Groq + FAISS)
│   │   └── ingest.py     (Document ingestion)
│   ├── docs/             (Knowledge base markdown files)
│   └── pyproject.toml
└── .env               (not committed)
```

## 🤖 TwinBot

The chatbot uses RAG to answer questions about me:
1. Knowledge docs (skills, projects, education, hobbies) → chunked → embedded
2. User question → FAISS similarity search → top 8 chunks retrieved
3. Groq LLaMA generates a conversational first-person response

---

Built by **Ishant Singh** · [LinkedIn](https://www.linkedin.com/in/ishant-singh-4a1163296/) · [GitHub](https://github.com/IshantSingh24)
