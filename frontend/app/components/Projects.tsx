"use client";

import { useEffect, useRef } from "react";

const projects = [
    {
        icon: "🧴",
        title: "GroomAI",
        description:
            "An agentic AI skincare advisor that remembers your skin profile, tracks your product inventory, and provides personalized recommendations — with image-based skin analysis.",
        highlights: [
            "Central orchestrator coordinating 4 specialized tools",
            "Image-based skin analysis extracting 4 structured attributes",
            "Long-term memory with user-isolated FAISS vector stores",
            "Real-time streaming responses",
        ],
        tags: ["OpenAI Agents SDK", "RAG", "FAISS", "FastAPI"],
        github: "https://github.com/IshantSingh24/GroomAI",
    },
    {
        icon: "🤖",
        title: "Sidekick AI",
        description:
            "A goal-driven autonomous AI co-worker that doesn't just answer — it finishes tasks. Uses executor–evaluator architecture with self-evaluation loops.",
        highlights: [
            "Multi-agent executor–evaluator workflow architecture",
            "Self-evaluation loop — completes tasks in ~3 LLM iterations",
            "6 external tools: browser, web search, Python REPL, Notion, files",
            "Structured feedback + automatic iteration decisions",
        ],
        tags: ["LangGraph", "Tool Calling", "Playwright", "Notion API"],
        github: "https://github.com/IshantSingh24/sidekick_AI",
    },
    {
        icon: "💰",
        title: "Amazon Price Predictor",
        description:
            "Fine-tuned LLaMA 3.1-8B to predict Amazon product prices from descriptions. Achieved 83.4% MAE reduction over the base model using parameter-efficient fine-tuning.",
        highlights: [
            "Fine-tuned LLaMA 3.1-8B using QLoRA",
            "Trained on 20k+ supervised product listings",
            "83.4% reduction in Mean Absolute Error",
            "Budget-friendly: trained on Kaggle free GPU quota",
        ],
        tags: ["LLaMA 3.1", "QLoRA", "Hugging Face", "Fine-Tuning"],
        github: "https://github.com/IshantSingh24/Amazon_price_predictor_LLM",
    },
    {
        icon: "🌿",
        title: "FarmGuard",
        description:
            "A CNN-based tomato leaf disease classifier using computer vision to detect and categorize plant diseases from leaf images, helping farmers with early detection.",
        highlights: [
            "Image classification for multiple disease categories",
            "Deep learning CNN architecture",
            "Built for real-world agricultural use cases",
        ],
        tags: ["TensorFlow", "CNN", "Computer Vision", "Python"],
        github: null,
    },
];

export default function Projects() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.05 }
        );

        const elements = ref.current?.querySelectorAll(".reveal");
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="section" id="projects" ref={ref}>
            <div className="reveal">
                <span className="section-label">Projects</span>
                <h2 className="section-title">What I&apos;ve built</h2>
            </div>

            <div className="projects-grid">
                {projects.map((project, i) => (
                    <article
                        className="project-card reveal"
                        key={project.title}
                        style={{ animationDelay: `${i * 0.1}s` }}
                    >
                        <div className="project-card-shimmer" />
                        <div className="project-card-header">
                            <span className="project-icon">{project.icon}</span>
                            <div className="project-links">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link"
                                        title="View on GitHub"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>

                        <a
                            href={project.github || "#"}
                            target={project.github ? "_blank" : undefined}
                            rel={project.github ? "noopener noreferrer" : undefined}
                            className="project-title-link"
                        >
                            <h3 className="project-title">{project.title}</h3>
                        </a>
                        <p className="project-description">{project.description}</p>

                        <ul className="project-highlights">
                            {project.highlights.map((h, j) => (
                                <li key={j}>{h}</li>
                            ))}
                        </ul>

                        <div className="project-tags">
                            {project.tags.map((tag) => (
                                <span className="project-tag" key={tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
