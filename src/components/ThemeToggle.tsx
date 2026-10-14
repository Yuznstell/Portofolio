"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("theme") as "dark" | "light" | null;
        const initial = stored || "dark";
        setTheme(initial);
        document.documentElement.setAttribute("data-theme", initial);
    }, []);

    const toggle = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    };

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-full" aria-hidden="true" />
        );
    }

    return (
        <button
            id="theme-toggle"
            onClick={toggle}
            className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--surface)] border border-transparent hover:border-[var(--border)] transition-all duration-300"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            <span className="relative block w-[18px] h-[18px]">
                <svg
                    className="absolute inset-0 w-[18px] h-[18px] text-amber-400 transition-all duration-300"
                    style={{
                        opacity: theme === "dark" ? 1 : 0,
                        transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
                <svg
                    className="absolute inset-0 w-[18px] h-[18px] text-[var(--accent-light)] transition-all duration-300"
                    style={{
                        opacity: theme === "light" ? 1 : 0,
                        transform: theme === "light" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            </span>
        </button>
    );
}
