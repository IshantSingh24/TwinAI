"use client";

import { useState, useEffect, useCallback } from "react";

interface TypeWriterProps {
    strings: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

export default function TypeWriter({
    strings,
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDuration = 2000,
}: TypeWriterProps) {
    const [displayText, setDisplayText] = useState("");
    const [stringIndex, setStringIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const tick = useCallback(() => {
        const currentString = strings[stringIndex];

        if (!isDeleting) {
            // Typing
            if (displayText.length < currentString.length) {
                return typingSpeed + Math.random() * 40;
            } else {
                // Finished typing, pause then delete
                setIsDeleting(true);
                return pauseDuration;
            }
        } else {
            // Deleting
            if (displayText.length > 0) {
                return deletingSpeed;
            } else {
                // Move to next string
                setIsDeleting(false);
                setStringIndex((prev) => (prev + 1) % strings.length);
                return 500;
            }
        }
    }, [displayText, stringIndex, isDeleting, strings, typingSpeed, deletingSpeed, pauseDuration]);

    useEffect(() => {
        const currentString = strings[stringIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentString.length) {
                    setDisplayText(currentString.slice(0, displayText.length + 1));
                } else {
                    setIsDeleting(true);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(displayText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setStringIndex((prev) => (prev + 1) % strings.length);
                }
            }
        }, tick());

        return () => clearTimeout(timeout);
    }, [displayText, stringIndex, isDeleting, tick, strings]);

    return (
        <span>
            {displayText}
            <span className="cursor" />
        </span>
    );
}
