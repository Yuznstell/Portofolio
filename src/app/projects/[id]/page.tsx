"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLanguage, t } from "@/lib/useLanguage";
import tr from "@/lib/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface GalleryItem {
    src: string;
    caption: string | { en: string; id: string };
}

interface Project {
    id: string;
    title: string | { en: string; id: string };
    description: string | { en: string; id: string };
    tags: string[];
    link: string;
    accent: string;
    image?: string;
    gallery?: GalleryItem[];
    year?: number;
}

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const techIcons: Record<string, string> = {
    "JavaScript": `${DEVICON_BASE}/javascript/javascript-original.svg`,
    "Python": `${DEVICON_BASE}/python/python-original.svg`,
    "Kotlin": `${DEVICON_BASE}/kotlin/kotlin-original.svg`,
    "C++": `${DEVICON_BASE}/cplusplus/cplusplus-original.svg`,
    "TypeScript": `${DEVICON_BASE}/typescript/typescript-original.svg`,
    "PHP": `${DEVICON_BASE}/php/php-original.svg`,
    "HTML/CSS": `${DEVICON_BASE}/html5/html5-original.svg`,
    "HTML": `${DEVICON_BASE}/html5/html5-original.svg`,
    "CSS": `${DEVICON_BASE}/css3/css3-original.svg`,
    "React": `${DEVICON_BASE}/react/react-original.svg`,
    "Next.js": `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
    "WordPress": `${DEVICON_BASE}/wordpress/wordpress-plain.svg`,
    "Figma": `${DEVICON_BASE}/figma/figma-original.svg`,
    "Node.js": `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
    "Express": `${DEVICON_BASE}/express/express-original.svg`,
    "FastAPI": `${DEVICON_BASE}/fastapi/fastapi-original.svg`,
    "TensorFlow": `${DEVICON_BASE}/tensorflow/tensorflow-original.svg`,
    "Jupyter": `${DEVICON_BASE}/jupyter/jupyter-original.svg`,
    "PyTorch": `${DEVICON_BASE}/pytorch/pytorch-original.svg`,
    "Android": `${DEVICON_BASE}/android/android-original.svg`,
    "Flutter": `${DEVICON_BASE}/flutter/flutter-original.svg`,
    "PostgreSQL": `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
    "MongoDB": `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
    "MySQL": `${DEVICON_BASE}/mysql/mysql-original.svg`,
    "Docker": `${DEVICON_BASE}/docker/docker-original.svg`,
    "Arduino": `${DEVICON_BASE}/arduino/arduino-original.svg`,
    "Remix Ethereum": `${DEVICON_BASE}/solidity/solidity-original.svg`,
    "Blockchain": `${DEVICON_BASE}/solidity/solidity-original.svg`,
};

export default function ProjectDetailPage() {
    const params = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const { lang } = useLanguage();

    useEffect(() => {
        fetch("/api/portfolio")
            .then((r) => r.json())
            .then((data) => {
                const found = data.projects.find(
                    (p: Project) => p.id === params.id
                );
                setProject(found || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
                <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] gap-4">
                <h1 className="font-display text-2xl font-bold text-[var(--fg)]">
                    {tr.projectDetail.notFound[lang]}
                </h1>
                <Link
                    href="/#projects"
                    className="text-[var(--accent)] font-mono text-sm hover:underline"
                >
                    ← {tr.projectDetail.backToAll[lang]}
                </Link>
            </div>
        );
    }

    const title = t(project.title, lang);
    const description = t(project.description, lang);

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
            <div className="noise-overlay" aria-hidden="true" />

            {/* Header */}
            <nav className="sticky top-0 z-50 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]">
                <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/#projects"
                        className="flex items-center gap-2 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-300 font-mono text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        {tr.projectDetail.back[lang]}
                    </Link>
                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />
                        {project.year && (
                            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold border border-[var(--border)] text-[var(--accent)]">
                                {project.year}
                            </span>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-[900px] mx-auto px-6 py-12 md:py-20">
                {/* Hero Image */}
                {project.image && (
                    <div className="anim-rise w-full rounded-2xl overflow-hidden border border-[var(--border)] mb-10 bg-[var(--surface)]">
                        <div className="relative w-full aspect-video max-h-[480px]">
                            <Image
                                src={`/projects/${project.image}`}
                                alt={title}
                                fill
                                priority
                                sizes="(max-width: 900px) 100vw, 900px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                    <div
                        style={{ animationDelay: "0.05s" }}
                        className="anim-rise mb-10"
                    >
                        <h2 className="font-display font-semibold text-lg mb-4 text-[var(--fg)]">
                            {tr.projectDetail.gallery[lang]}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.gallery.map((item) => (
                                <figure
                                    key={item.src}
                                    className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] group"
                                >
                                    <div className="relative overflow-hidden aspect-video">
                                        <Image
                                            src={`/projects/${item.src}`}
                                            alt={t(item.caption, lang)}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <figcaption className="px-4 py-3 text-xs font-mono text-[var(--fg-muted)] border-t border-[var(--border)]">
                                        {t(item.caption, lang)}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                )}

                {/* Title & Year */}
                <div
                    style={{ animationDelay: "0.1s" }}
                    className="anim-rise"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: project.accent }}
                        />
                        <span className="font-mono text-xs text-[var(--fg-muted)] uppercase tracking-widest">
                            {tr.projectDetail.projectDetails[lang]}
                        </span>
                    </div>

                    <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-6">
                        {title}
                    </h1>
                </div>

                {/* Description */}
                <div style={{ animationDelay: "0.2s" }}
                        className="anim-rise bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8 mb-8"
                >
                    <h2 className="font-display font-semibold text-lg mb-4 text-[var(--fg)]">
                        {tr.projectDetail.overview[lang]}
                    </h2>
                    <p className="text-[var(--fg-muted)] leading-relaxed text-base">
                        {description}
                    </p>
                </div>

                {/* Tags */}
                <div style={{ animationDelay: "0.3s" }}
                        className="anim-rise mb-8"
                >
                    <h2 className="font-display font-semibold text-lg mb-4 text-[var(--fg)]">
                        {tr.projectDetail.keywords[lang]}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 text-xs font-mono font-medium tracking-wide rounded-full border border-[var(--border)] text-[var(--fg-muted)] bg-[var(--surface)]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Tech Stack Icons */}
                <div style={{ animationDelay: "0.4s" }}
                        className="anim-rise bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8 mb-8"
                >
                    <h2 className="font-display font-semibold text-lg mb-5 text-[var(--fg)]">
                        {tr.projectDetail.techStack[lang]}
                    </h2>
                    <div className="flex items-center gap-3 flex-wrap">
                        {project.tags.map((tag) => {
                            const iconUrl = techIcons[tag];
                            return (
                                <div
                                    key={tag}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--border-accent)] transition-all duration-300"
                                >
                                    {iconUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={iconUrl}
                                            alt={tag}
                                            className="w-5 h-5 object-contain"
                                        />
                                    ) : (
                                        <span
                                            className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold"
                                            style={{
                                                background: `${project.accent}20`,
                                                color: project.accent,
                                            }}
                                        >
                                            {tag.charAt(0)}
                                        </span>
                                    )}
                                    <span className="text-xs font-mono text-[var(--fg-muted)]">
                                        {tag}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Back Button */}
                <div style={{ animationDelay: "0.5s" }}
                        className="anim-fade pt-8 border-t border-[var(--border)]"
                >
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-accent)] transition-all duration-300 font-mono text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        {tr.projectDetail.backToAll[lang]}
                    </Link>
                </div>
            </main>
        </div>
    );
}
