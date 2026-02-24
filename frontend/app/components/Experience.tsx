"use client";

import { useEffect, useRef } from "react";

const experience = [
    {
        date: "Jun 2025 — Aug 2025",
        title: "AI Intern — Tip2Trip LLP",
        subtitle: "Remote",
        details: [
            "Engineered automated data pipelines to scrape, clean, and structure datasets for 20k+ hotels across multiple travel platforms",
            "Implemented RAG over 50+ internal documents using LangChain and FAISS for context-aware recommendations",
            "Collaborated within a 4-member engineering team to design, test, and deploy AI-driven features",
        ],
    },
];

const education = [
    {
        date: "Aug 2023 — Jul 2027",
        title: "Indian Institute of Information Technology, Bhagalpur",
        subtitle: "B.Tech in Electronics and Communication Engineering",
        highlight: "CGPA: 8.15",
    },
    {
        date: "Apr 2022 — Mar 2023",
        title: "Bruj Bhushan Lal Public School, Bareilly",
        subtitle: "Senior Secondary (Class 12) — Physics, Chemistry, Mathematics",
        highlight: "Score: 90.6%",
    },
    {
        date: "Apr 2020 — Mar 2021",
        title: "Bruj Bhushan Lal Public School, Bareilly",
        subtitle: "Secondary (Class 10)",
        highlight: "Score: 94.2%",
    },
];

const achievements = [
    {
        icon: "🏆",
        title: "AI Cognithon '26 — Winner",
        text: "National level, among 85+ teams",
    },
    {
        icon: "🥉",
        title: "SIH '25 — 3rd Position",
        text: "Internal hackathon among 65+ teams",
    },
    {
        icon: "📄",
        title: "IEEE ICCCNT 2025",
        text: "Research paper published (IIT Indore)",
    },
    {
        icon: "🏅",
        title: "SIH '24 — National Finalist",
        text: "Among 500+ teams nationwide",
    },
];

const certificates = [
    "Machine Learning A–Z: AI, Python & R",
    "LLM Engineering: Large Language Models & Agents",
    "AI Engineer Agentic Track: Agents & MCP",
];

export default function Experience() {
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
        <section className="section" id="experience" ref={ref}>
            {/* Experience */}
            <div className="reveal">
                <span className="section-label">Experience</span>
                <h2 className="section-title">Where I&apos;ve worked</h2>
            </div>

            <div className="timeline reveal">
                {experience.map((item, i) => (
                    <div className="timeline-item" key={i}>
                        <div className="timeline-dot" />
                        <span className="timeline-date">{item.date}</span>
                        <h3 className="timeline-title">{item.title}</h3>
                        <p className="timeline-subtitle">{item.subtitle}</p>
                        <ul className="timeline-details">
                            {item.details.map((detail, j) => (
                                <li key={j}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Education */}
            <div className="reveal" style={{ marginTop: "4rem" }}>
                <span className="section-label">Education</span>
                <h2 className="section-title">Academic Journey</h2>
            </div>

            <div className="edu-timeline reveal">
                {education.map((item, i) => (
                    <div className="edu-card" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
                        <div className="edu-card-glow" />
                        <div className="edu-card-content">
                            <div className="edu-card-left">
                                <span className="edu-date">{item.date}</span>
                                <div className="edu-connector">
                                    <div className="edu-dot" />
                                    {i < education.length - 1 && <div className="edu-line" />}
                                </div>
                            </div>
                            <div className="edu-card-right">
                                <h3 className="edu-title">{item.title}</h3>
                                <p className="edu-subtitle">{item.subtitle}</p>
                                <span className="edu-highlight">{item.highlight}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Achievements */}
            <div className="reveal" style={{ marginTop: "4rem" }}>
                <span className="section-label">Achievements</span>
            </div>
            <div className="achievements-grid reveal">
                {achievements.map((a, i) => (
                    <div className="achievement-card" key={i}>
                        <span className="achievement-icon">{a.icon}</span>
                        <div className="achievement-text">
                            <strong>{a.title}</strong>
                            <span>{a.text}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Certificates */}
            <div className="reveal" style={{ marginTop: "3rem" }}>
                <span className="section-label">Certificates</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.8rem" }}>
                    {certificates.map((cert, i) => (
                        <span className="skill-tag" key={i}>
                            {cert}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
