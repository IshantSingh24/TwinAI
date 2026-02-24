"use client";

import { useEffect, useRef } from "react";

const socials = [
    {
        label: "GitHub",
        icon: "⟨/⟩",
        href: "https://github.com/IshantSingh24",
    },
    {
        label: "LinkedIn",
        icon: "in",
        href: "https://www.linkedin.com/in/ishant-singh-4a1163296/",
    },
    {
        label: "LeetCode",
        icon: "LC",
        href: "https://leetcode.com/IshantSingh",
    },
];

export default function Contact() {
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
        <section className="section" id="contact" ref={ref}>
            <div className="contact-wrap">
                <div className="reveal">
                    <span className="section-label">Contact</span>
                    <h2 className="section-title">Let&apos;s build something intelligent.</h2>
                </div>

                <p className="reveal">
                    I&apos;m always open to interesting collaborations, AI projects, and
                    conversations about agentic systems. Feel free to reach out.
                </p>

                <div className="contact-info reveal">
                    <a href="mailto:ishant24singh@gmail.com" className="contact-email">
                        ishant24singh@gmail.com
                    </a>
                    <a href="tel:+919368264276" className="contact-phone">
                        📞 +91 9368264276
                    </a>
                </div>

                <div className="social-links reveal">
                    {socials.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            title={social.label}
                            style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", fontWeight: 700 }}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
