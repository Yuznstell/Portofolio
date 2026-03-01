"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/useLanguage";
import tr from "@/lib/translations";

const rotatingWords = [
    "AI Engineer",
    "System Arch",
    "Full-stack Dev",
    "ML Specialist",
    "Cloud Engineer",
];

export default function Hero() {
    const [currentWord, setCurrentWord] = useState(0);
    const { lang } = useLanguage();
    const words = tr.hero.rotatingWords[lang];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 2800);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden grid-background"
        >
            <div
                className="glow-orb w-[500px] h-[500px] bg-[var(--accent)] opacity-[0.07] -top-40 -left-40"
                aria-hidden="true"
            />
            <div
                className="glow-orb w-[400px] h-[400px] bg-cyan-500 opacity-[0.05] bottom-20 right-[-100px]"
                aria-hidden="true"
            />
            <div
                className="glow-orb w-[300px] h-[300px] bg-[var(--accent)] opacity-[0.04] top-1/2 left-1/2 -translate-x-1/2"
                aria-hidden="true"
            />

            <div className="relative z-10 w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1700px] mx-auto px-6 md:px-10 lg:px-16 2xl:px-24 py-32 2xl:py-48">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] 2xl:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-accent)] bg-[var(--accent-dim)]/10 mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-mono text-[var(--fg-muted)] tracking-wide">
                                {lang === "en" ? "Available for projects" : "Terbuka untuk proyek"}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="font-display font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.03em] mb-6 2xl:mb-10"
                        >
                            <span className="text-[var(--fg)]">Senior</span>
                            <br />
                            <span className="text-gradient">Full-stack</span>
                            <br />
                            <span className="text-[var(--fg)] opacity-70">&</span>{" "}
                            <span className="relative inline-block overflow-hidden h-[1.1em] align-bottom min-w-[510px]">
                                {words.map((word, i) => (
                                    <motion.span
                                        key={word}
                                        initial={false}
                                        animate={{
                                            y: (i - currentWord) * 100 + "%",
                                            opacity: i === currentWord ? 1 : 0,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                        className="absolute left-0 top-0 text-gradient whitespace-nowrap"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="text-[var(--fg-muted)] text-base md:text-lg 2xl:text-xl leading-relaxed text-justify max-w-[480px] 2xl:max-w-[600px] mb-10 2xl:mb-14"
                        >
                            {lang === "en"
                                ? "Crafting intelligent systems and scalable platforms. From multi-tenant architectures to production ML pipelines — I build things that think and things that scale."
                                : "Membangun sistem cerdas dan platform skalabel. Dari arsitektur multi-tenant hingga pipeline ML produksi — saya membangun hal yang berpikir dan berkembang."
                            }
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a
                                href="#projects"
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white text-sm font-medium rounded-full transition-all duration-300 hover:-translate-y-[2px]"
                            >
                                {tr.hero.cta[lang]}
                                <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--fg-muted)] hover:text-white hover:border-[var(--accent-dim)] text-sm font-medium rounded-full transition-all duration-300 hover:-translate-y-[2px]"
                            >
                                {tr.hero.ctaContact[lang]}
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative w-full aspect-square max-w-[400px] ml-auto">
                            <div className="absolute inset-0 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-sm overflow-hidden">
                                <div className="p-6 font-mono text-xs leading-relaxed">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-3 h-3 rounded-full bg-red-500/60" />
                                        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                        <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                                        <span className="ml-2 text-[var(--fg-muted)] text-[10px]">
                                            profile.ts
                                        </span>
                                    </div>
                                    <pre className="text-[var(--fg-muted)]">
                                        <code>
                                            <span className="text-[var(--accent-light)]">const</span>{" "}
                                            <span className="text-cyan-400">engineer</span> ={" "}
                                            {"{\n"}
                                            {"  "}
                                            <span className="text-emerald-400">name</span>:{" "}
                                            <span className="text-amber-300">
                                                &quot;Yudha&quot;
                                            </span>
                                            ,{"\n"}
                                            {"  "}
                                            <span className="text-emerald-400">role</span>:{" "}
                                            <span className="text-amber-300">
                                                &quot;Senior FS&quot;
                                            </span>
                                            ,{"\n"}
                                            {"  "}
                                            <span className="text-emerald-400">focus</span>: [{"\n"}
                                            {"    "}
                                            <span className="text-amber-300">
                                                &quot;AI/ML&quot;
                                            </span>
                                            ,{"\n"}
                                            {"    "}
                                            <span className="text-amber-300">
                                                &quot;Platforms&quot;
                                            </span>
                                            ,{"\n"}
                                            {"    "}
                                            <span className="text-amber-300">
                                                &quot;Systems&quot;
                                            </span>
                                            {"\n"}
                                            {"  "}],{"\n"}
                                            {"  "}
                                            <span className="text-emerald-400">coffee</span>:{" "}
                                            <span className="text-[var(--accent-light)]">
                                                Infinity
                                            </span>
                                            {"\n"}
                                            {"}"};
                                        </code>
                                    </pre>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl border border-[var(--border-accent)] bg-[var(--accent-dim)]/20 backdrop-blur-sm flex items-center justify-center animate-float">
                                <span className="font-display font-bold text-[var(--accent-light)] text-lg">
                                    3+
                                </span>
                                <span className="text-[10px] text-[var(--fg-muted)] ml-1">
                                    yrs
                                </span>
                            </div>

                            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-sm flex items-center justify-center animate-float [animation-delay:2s]">
                                <span className="font-mono text-emerald-400 text-xs">
                                    {"</>"}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="w-5 h-8 rounded-full border border-[var(--border)] flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1 h-1 rounded-full bg-[var(--accent-light)]"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
