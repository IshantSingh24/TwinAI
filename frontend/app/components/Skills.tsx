"use client";

import { useEffect, useRef } from "react";

const skillCategories = [
    {
        icon: "🧠",
        title: "AI / ML",
        skills: [
            "LangChain",
            "LangGraph",
            "OpenAI Agents SDK",
            "RAG",
            "FAISS",
            "TensorFlow",
            "Hugging Face",
            "QLoRA",
        ],
    },
    {
        icon: "⚙️",
        title: "Frameworks",
        skills: [
            "FastAPI",
            "LangChain",
            "LangGraph",
            "OpenAI Agents SDK",
            "Hugging Face",
        ],
    },
    {
        icon: "💻",
        title: "Languages",
        skills: ["Python", "C++", "C", "SQL"],
    },
    {
        icon: "🔧",
        title: "Tools",
        skills: [
            "Git",
            "GitHub",
            "VS Code",
            "Jupyter Notebook",
        ],
    },
    {
        icon: "☁️",
        title: "Cloud & Databases",
        skills: [
            "Vercel",
            "Railway",
            "Render",
            "MySQL",
            "SQLAlchemy",
            "FAISS",
        ],
    },
    {
        icon: "📚",
        title: "Core Concepts",
        skills: [
            "DSA",
            "OOP",
            "Machine Learning",
            "Generative AI",
            "Agentic AI",
            "Automation",
            "Probability & Statistics",
        ],
    },
];

export default function Skills() {
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
            { threshold: 0.1 }
        );

        const elements = ref.current?.querySelectorAll(".reveal");
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="section" id="skills" ref={ref}>
            <div className="reveal">
                <span className="section-label">Skills</span>
                <h2 className="section-title">Tech I work with</h2>
            </div>

            <div className="skills-grid">
                {skillCategories.map((category, i) => (
                    <div
                        className="skill-category reveal"
                        key={category.title}
                        style={{ animationDelay: `${i * 0.1}s` }}
                    >
                        <div className="skill-category-header">
                            <div className="skill-category-icon">{category.icon}</div>
                            <h3 className="skill-category-title">{category.title}</h3>
                        </div>
                        <div className="skill-tags">
                            {category.skills.map((skill) => (
                                <span className="skill-tag" key={skill}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
