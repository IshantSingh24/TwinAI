"use client";

import ParticleNetwork from "./ParticleNetwork";
import TypeWriter from "./TypeWriter";

const roles = [
    "AI Engineer",
    "LLM Agents Builder",
    "Agentic Systems Architect",
];

export default function Hero() {
    return (
        <section className="hero" id="hero">
            <ParticleNetwork />
            <div className="hero-overlay" />

            <div className="hero-content">
                <p className="hero-greeting">Hello, I&apos;m</p>
                <h1 className="hero-name">
                    Ishant <span className="name-highlight">Singh</span>
                </h1>
                <div className="hero-typewriter-wrap">
                    <TypeWriter strings={roles} />
                </div>
                <div className="hero-cta">
                    <a href="#projects" className="btn btn-primary">
                        View Projects
                    </a>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                    >
                        ↓ Resume
                    </a>
                </div>
            </div>

            <div className="hero-scroll-indicator">
                <div className="scroll-line" />
            </div>
        </section>
    );
}
