"use client";

import { useEffect, useRef } from "react";

export default function About() {
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
        <section className="section" id="about" ref={ref}>
            <div className="reveal">
                <span className="section-label">About</span>
                <h2 className="section-title">Building the future, one agent at a time.</h2>
            </div>

            <div className="about-content reveal">
                <div className="open-to-work-badge">
                    <span className="otw-dot" />
                    Open to Work
                </div>

                <p>
                    I&apos;m <strong>Ishant Singh</strong>, an AI Engineer and B.Tech student
                    at <strong>IIIT Bhagalpur</strong> (ECE, 2023–2027). I&apos;m fascinated
                    by how AI systems can reason, remember, and act autonomously — and I&apos;m
                    constantly exploring the bleeding edge of what&apos;s possible.
                </p>
                <p>
                    I build <strong>agentic AI systems</strong> — from fine-tuning LLaMA
                    models with QLoRA to architecting multi-agent workflows using LangGraph
                    and OpenAI Agents SDK. What excites me most is taking these systems from
                    notebooks to <strong>production deployments</strong> — making AI that
                    actually works in the real world.
                </p>
                <p>
                    My work has been recognized at the <strong>AI Cognithon &apos;26</strong>{" "}
                    (national winner), <strong>Smart India Hackathon</strong> (national
                    finalist), and I&apos;ve published research at{" "}
                    <strong>IEEE ICCCNT 2025</strong>. Previously interned at{" "}
                    <strong>Tip2Trip LLP</strong>, building RAG pipelines and data engineering
                    systems for 20k+ hotels.
                </p>
                <p>
                    I&apos;m always eager to learn new AI technologies, dive into research,
                    and collaborate on projects that push boundaries. If you&apos;re building
                    something intelligent, <strong>let&apos;s talk</strong>.
                </p>
            </div>
        </section>
    );
}
