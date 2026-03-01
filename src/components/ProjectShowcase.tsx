"use client";

import { useState, useEffect, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import SectionWrapper from "./SectionWrapper";
import { useLanguage, t } from "@/lib/useLanguage";
import tr from "@/lib/translations";

interface Project {
    id: string;
    title: string | { en: string; id: string };
    description: string | { en: string; id: string };
    tags: string[];
    link: string;
    accent: string;
    image?: string;
    year?: number;
}

export default function ProjectShowcase() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeYear, setActiveYear] = useState<number | null>(null);
    const { lang } = useLanguage();

    useEffect(() => {
        fetch("/api/portfolio")
            .then((r) => r.json())
            .then((data) => setProjects(data.projects))
            .catch(() => { });
    }, []);

    const years = useMemo(() => {
        const uniqueYears = [...new Set(projects.map((p) => p.year).filter(Boolean))] as number[];
        return uniqueYears.sort((a, b) => b - a);
    }, [projects]);

    const filteredProjects = useMemo(() => {
        const sorted = [...projects].sort((a, b) => (b.year || 0) - (a.year || 0));
        if (activeYear === null) return sorted;
        return sorted.filter((p) => p.year === activeYear);
    }, [projects, activeYear]);

    return (
        <SectionWrapper
            id="projects"
            className="relative py-24 md:py-32 px-6 md:px-10"
        >
            <div className="max-w-[1200px] mx-auto">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-3 block">
                            {tr.projects.sectionLabel[lang]}
                        </span>
                        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                            {tr.projects.sectionTitle[lang]}{" "}
                            <span className="text-gradient">{tr.projects.sectionTitleHighlight[lang]}</span>
                        </h2>
                    </div>
                    {projects.length > 0 && (
                        <span className="hidden md:block font-mono text-xs text-[var(--fg-muted)]">
                            {String(filteredProjects.length).padStart(2, "0")} {tr.projects.projectsCount[lang]}
                        </span>
                    )}
                </div>

                {/* Year Filter */}
                {years.length > 0 && (
                    <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 -mx-2 px-2">
                        <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest shrink-0">
                            {tr.projects.filterLabel[lang]}
                        </span>
                        <button
                            onClick={() => setActiveYear(null)}
                            className={`px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wide border transition-all duration-300 whitespace-nowrap ${activeYear === null
                                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                                    : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--border-accent)] hover:text-[var(--fg)]"
                                }`}
                        >
                            {tr.projects.all[lang]}
                        </button>
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => setActiveYear(year)}
                                className={`px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wide border transition-all duration-300 whitespace-nowrap ${activeYear === year
                                        ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                                        : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--border-accent)] hover:text-[var(--fg)]"
                                    }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    {filteredProjects.map((project, i) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            title={t(project.title, lang)}
                            description={t(project.description, lang)}
                            tags={project.tags}
                            accent={project.accent}
                            index={i}
                            image={project.image}
                            year={project.year}
                        />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
