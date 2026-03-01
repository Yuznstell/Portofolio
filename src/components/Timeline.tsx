"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import { useLanguage, t } from "@/lib/useLanguage";
import tr from "@/lib/translations";

interface TimelineEntry {
    id: string;
    period: string;
    role: string | { en: string; id: string };
    company: string;
    description: string | { en: string; id: string };
    tags: string[];
}

function TimelineItem({
    entry,
    index,
    lang,
}: {
    entry: TimelineEntry;
    index: number;
    lang: "en" | "id";
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative pl-8 md:pl-10 pb-12 last:pb-0 group"
        >
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[var(--border)] group-last:bg-gradient-to-b group-last:from-[var(--border)] group-last:to-transparent">
                <motion.div
                    initial={{ height: 0 }}
                    animate={isInView ? { height: "100%" } : {}}
                    transition={{ duration: 0.8, delay: index * 0.12 + 0.3 }}
                    className="w-full bg-gradient-to-b from-[var(--accent)] to-transparent"
                    style={{ position: "absolute", top: 0 }}
                />
            </div>

            <div className="absolute left-[-4.5px] top-1.5 w-[10px] h-[10px] rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] z-10 group-hover:bg-[var(--accent)] transition-colors duration-300" />

            <div className="p-5 md:p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-accent)] transition-colors duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <h3 className="font-display font-semibold text-base md:text-lg tracking-tight text-[var(--fg)]">
                        {t(entry.role, lang)}
                    </h3>
                    <span className="font-mono text-xs text-[var(--fg-muted)] shrink-0">
                        {entry.period}
                    </span>
                </div>
                <p className="text-[var(--accent-light)] text-sm font-medium mb-3">
                    {entry.company}
                </p>
                <p className="text-[var(--fg-muted)] text-sm leading-relaxed text-justify mb-4">
                    {t(entry.description, lang)}
                </p>
                <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-0.5 text-[10px] font-mono tracking-wide rounded-full border border-[var(--border)] text-[var(--fg-muted)] bg-[var(--bg)]/50"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Timeline() {
    const [experiences, setExperiences] = useState<TimelineEntry[]>([]);
    const { lang } = useLanguage();

    useEffect(() => {
        fetch("/api/portfolio")
            .then((r) => r.json())
            .then((data) => setExperiences(data.experiences))
            .catch(() => { });
    }, []);

    return (
        <SectionWrapper
            id="experience"
            className="relative py-24 md:py-32 px-6 md:px-10 lg:px-16 2xl:px-24"
        >
            <div className="max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1200px] mx-auto">
                <div className="mb-16">
                    <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-3 block">
                        {tr.timeline.sectionLabel[lang]}
                    </span>
                    <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                        {tr.timeline.sectionTitle[lang]}{" "}
                        <span className="text-gradient">{tr.timeline.sectionTitleHighlight[lang]}</span>
                    </h2>
                </div>

                <div>
                    {experiences.map((entry, i) => (
                        <TimelineItem key={entry.id} entry={entry} index={i} lang={lang} />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
