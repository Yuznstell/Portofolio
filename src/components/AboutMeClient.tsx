"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { useLanguage, t } from "@/lib/useLanguage";
import tr from "@/lib/translations";

interface AboutMeClientProps {
    name: string;
    role: string | { en: string; id: string };
    bio: string | { en: string; id: string };
    photoUrl: string;
    location: string;
}

export default function AboutMeClient({
    name,
    role,
    bio,
    photoUrl,
    location,
}: AboutMeClientProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const { lang } = useLanguage();

    const initials = name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <SectionWrapper
            id="about"
            className="relative py-20 md:py-28 lg:py-36 px-6 md:px-10 lg:px-16 2xl:px-24"
        >
            <div className="max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1700px] mx-auto">
                <div className="flex items-end justify-between mb-14">
                    <div>
                        <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-3 block">
                            {tr.about.sectionLabel[lang]}
                        </span>
                        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                            {tr.about.sectionTitle[lang]}{" "}
                            <span className="text-gradient">{tr.about.sectionTitleHighlight[lang]}</span>
                        </h2>
                    </div>
                </div>

                <div
                    ref={ref}
                    className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        className="relative mx-auto lg:mx-0"
                    >
                        <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] 2xl:w-[320px] 2xl:h-[320px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden relative">
                            {photoUrl ? (
                                <img
                                    src={photoUrl}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent-dim)] to-[var(--surface)]">
                                    <span className="font-display font-bold text-5xl md:text-6xl text-[var(--accent-light)]/60">
                                        {initials}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-lg border border-[var(--border-accent)] bg-[var(--bg-elevated)] backdrop-blur-sm">
                            <span className="text-[11px] font-mono text-[var(--fg-muted)]">
                                📍 {location}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.6,
                            delay: 0.15,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                    >
                        <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-1">
                            {name}
                        </h3>
                        <p className="text-sm text-[var(--accent-light)] font-medium mb-5">
                            {t(role, lang)}
                        </p>

                        <p className="text-[var(--fg-muted)] text-base md:text-lg leading-[1.8] mb-8">
                            {t(bio, lang)}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <div className="px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                                <span className="block font-mono text-[10px] text-[var(--fg-muted)] uppercase tracking-wider mb-0.5">
                                    Focus
                                </span>
                                <span className="text-sm font-medium text-[var(--fg)]">
                                    AI & Full-stack
                                </span>
                            </div>
                            <div className="px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                                <span className="block font-mono text-[10px] text-[var(--fg-muted)] uppercase tracking-wider mb-0.5">
                                    {lang === "en" ? "Experience" : "Pengalaman"}
                                </span>
                                <span className="text-sm font-medium text-[var(--fg)]">
                                    {lang === "en" ? "3+ Years" : "3+ Tahun"}
                                </span>
                            </div>
                            <div className="px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                                <span className="block font-mono text-[10px] text-[var(--fg-muted)] uppercase tracking-wider mb-0.5">
                                    Status
                                </span>
                                <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    {lang === "en" ? "Available" : "Tersedia"}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
