"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
    role: "user" | "bot";
    content: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "bot",
            content:
                "Hey! I'm TwinBot — Ishant's AI twin. Ask me anything about his projects, skills, experience, or achievements.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading) return;

        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: text }]);
        setLoading(true);

        try {
            const res = await fetch(`${BACKEND_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });

            if (!res.ok) throw new Error("Backend error");

            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: "bot", content: data.response || "Sorry, I couldn't process that." },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    content: "Hmm, I'm having trouble connecting. Make sure the backend is running at " + BACKEND_URL,
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                className="chat-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle chat"
            >
                {isOpen ? "✕" : "🤖"}
            </button>

            {/* Chat Popup */}
            {isOpen && (
                <div className="chat-popup">
                    <div className="chat-header">
                        <div className="chat-header-info">
                            <div className="chat-avatar">🧠</div>
                            <div className="chat-header-text">
                                <h4>TwinBot</h4>
                                <span>Ishant&apos;s AI Twin · Online</span>
                            </div>
                        </div>
                        <button className="chat-close" onClick={() => setIsOpen(false)}>
                            ✕
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`chat-msg ${msg.role}`}>
                                {msg.content}
                            </div>
                        ))}
                        {loading && (
                            <div className="chat-msg bot typing">Thinking...</div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input-wrap">
                        <input
                            className="chat-input"
                            placeholder="Ask about Ishant..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                        />
                        <button
                            className="chat-send"
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
