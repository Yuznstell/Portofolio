"use client";

import { useLanguage, useHydrateLanguage } from "@/lib/useLanguage";

export default function LanguageSwitcher() {
    const { lang, toggle } = useLanguage();
    useHydrateLanguage();

    return (
        <button
            onClick={toggle}
            className="px-3 py-1.5 text-[10px] font-mono font-semibold tracking-widest rounded-full border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-accent)] transition-all duration-300 uppercase"
            aria-label="Toggle language"
        >
            {lang === "en" ? "ID" : "EN"}
        </button>
    );
}
