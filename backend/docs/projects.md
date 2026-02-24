# Ishant Singh — Projects

## GroomAI
An agentic AI skincare advisor that remembers your skin profile, tracks product inventory, and provides personalized recommendations with image-based skin analysis.

**Architecture:**
- Central orchestrator agent coordinating 4 specialized tools
- Image-based skin analysis extracting 4 structured attributes (skin type, concerns, tone, sensitivity)
- Long-term memory with user-isolated FAISS vector stores
- Real-time streaming responses via WebSocket

**Tech Stack:** OpenAI Agents SDK, RAG, FAISS, FastAPI, Next.js, Clerk Auth

**GitHub:** https://github.com/IshantSingh24/GroomAI

---

## Sidekick AI
A goal-driven autonomous AI co-worker that doesn't just answer — it finishes tasks. Uses executor–evaluator architecture with self-evaluation loops.

**Architecture:**
- Multi-agent executor–evaluator workflow architecture built with LangGraph
- Self-evaluation loop — completes tasks in ~3 LLM iterations
- 6 external tools: browser (Playwright), web search, Python REPL, Notion API, file operations
- Structured feedback + automatic iteration decisions
- Human-in-the-loop approval for critical actions

**Tech Stack:** LangGraph, Tool Calling, Playwright, Notion API, Python

**GitHub:** https://github.com/IshantSingh24/sidekick_AI

---

## Amazon Price Predictor
Fine-tuned LLaMA 3.1-8B to predict Amazon product prices from descriptions. Achieved 83.4% MAE reduction over the base model using parameter-efficient fine-tuning.

**Key Results:**
- Fine-tuned LLaMA 3.1-8B using QLoRA (4-bit quantization)
- Trained on 20k+ supervised product listings from Amazon
- 83.4% reduction in Mean Absolute Error compared to base model
- Budget-friendly: trained on Kaggle free GPU quota

**Tech Stack:** LLaMA 3.1, QLoRA, Hugging Face, Fine-Tuning

**GitHub:** https://github.com/IshantSingh24/Amazon_price_predictor_LLM

---

## FarmGuard (Tomato Leaf Disease Classifier)
A CNN-based tomato leaf disease classifier using computer vision to detect and categorize plant diseases from leaf images, helping farmers with early detection.

**Key Features:**
- Image classification for multiple disease categories
- Deep learning CNN architecture
- Built for real-world agricultural use cases

**Tech Stack:** TensorFlow, CNN, Computer Vision, Python
