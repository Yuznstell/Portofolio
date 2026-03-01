import { create } from "zustand";
import { useEffect } from "react";

type Lang = "en" | "id";

interface LanguageState {
    lang: Lang;
    _hydrated: boolean;
    setLang: (lang: Lang) => void;
    toggle: () => void;
    _hydrate: () => void;
}

export const useLanguage = create<LanguageState>((set) => ({
    lang: "en", // Always start with "en" to match SSR
    _hydrated: false,
    setLang: (lang) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("portfolio-lang", lang);
        }
        set({ lang });
    },
    toggle: () =>
        set((state) => {
            const next = state.lang === "en" ? "id" : "en";
            if (typeof window !== "undefined") {
                localStorage.setItem("portfolio-lang", next);
            }
            return { lang: next };
        }),
    _hydrate: () => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("portfolio-lang");
            if (saved === "id" || saved === "en") {
                set({ lang: saved, _hydrated: true });
            } else {
                set({ _hydrated: true });
            }
        }
    },
}));

/** Call this hook once in LanguageSwitcher to hydrate from localStorage after mount */
export function useHydrateLanguage() {
    const hydrate = useLanguage((s) => s._hydrate);
    const hydrated = useLanguage((s) => s._hydrated);
    useEffect(() => {
        if (!hydrated) hydrate();
    }, [hydrate, hydrated]);
}

/** Helper: pick the right language string from a bilingual object */
export function t(obj: { en: string; id: string } | string, lang: Lang): string {
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.en;
}
