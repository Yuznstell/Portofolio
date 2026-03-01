"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const techIcons: Record<string, string> = {
    // Languages
    "JavaScript": `${DEVICON_BASE}/javascript/javascript-original.svg`,
    "Python": `${DEVICON_BASE}/python/python-original.svg`,
    "Kotlin": `${DEVICON_BASE}/kotlin/kotlin-original.svg`,
    "C++": `${DEVICON_BASE}/cplusplus/cplusplus-original.svg`,
    "Java": `${DEVICON_BASE}/java/java-original.svg`,
    "TypeScript": `${DEVICON_BASE}/typescript/typescript-original.svg`,
    "PHP": `${DEVICON_BASE}/php/php-original.svg`,

    // Frontend
    "HTML/CSS": `${DEVICON_BASE}/html5/html5-original.svg`,
    "HTML": `${DEVICON_BASE}/html5/html5-original.svg`,
    "CSS": `${DEVICON_BASE}/css3/css3-original.svg`,
    "React": `${DEVICON_BASE}/react/react-original.svg`,
    "Next.js": `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
    "WordPress": `${DEVICON_BASE}/wordpress/wordpress-plain.svg`,
    "Figma": `${DEVICON_BASE}/figma/figma-original.svg`,

    // Backend
    "Node.js": `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
    "Express": `${DEVICON_BASE}/express/express-original.svg`,
    "FastAPI": `${DEVICON_BASE}/fastapi/fastapi-original.svg`,

    // AI/ML
    "TensorFlow": `${DEVICON_BASE}/tensorflow/tensorflow-original.svg`,
    "Jupyter": `${DEVICON_BASE}/jupyter/jupyter-original.svg`,
    "PyTorch": `${DEVICON_BASE}/pytorch/pytorch-original.svg`,

    // Mobile
    "Android": `${DEVICON_BASE}/android/android-original.svg`,
    "Flutter": `${DEVICON_BASE}/flutter/flutter-original.svg`,

    // Database
    "PostgreSQL": `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
    "MongoDB": `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
    "MySQL": `${DEVICON_BASE}/mysql/mysql-original.svg`,

    // Infra
    "Docker": `${DEVICON_BASE}/docker/docker-original.svg`,
    "Arduino": `${DEVICON_BASE}/arduino/arduino-original.svg`,

    // Blockchain
    "Remix Ethereum": `${DEVICON_BASE}/solidity/solidity-original.svg`,
    "Blockchain": `${DEVICON_BASE}/solidity/solidity-original.svg`,
};

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    accent?: string;
    index: number;
    image?: string;
    year?: number;
    id: string;
}

export default function ProjectCard({
    title,
    description,
    tags,
    accent = "var(--accent)",
    index,
    image,
    year,
    id,
}: ProjectCardProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden transition-colors duration-400 hover:border-[var(--border-accent)] hover:bg-[var(--surface-hover)] border-glow"
        >
            <Link href={`/projects/${id}`} className="block cursor-pointer">
                <div
                    className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                    }}
                    aria-hidden="true"
                />

                {image && (
                    <div className="w-full h-48 overflow-hidden border-b border-[var(--border)] relative bg-[var(--surface-hover)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`/projects/${image}`}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                )}

                <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                                background: `${accent}15`,
                                border: `1px solid ${accent}30`,
                            }}
                        >
                            <svg
                                className="w-5 h-5"
                                style={{ color: accent }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                />
                            </svg>
                        </div>
                        {year && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wide border border-[var(--border)] text-[var(--accent)] bg-[var(--accent-dim)]/20">
                                {year}
                            </span>
                        )}
                        <svg
                            className="w-5 h-5 text-[var(--fg-muted)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                            />
                        </svg>
                    </div>

                    <h3 className="font-display font-semibold text-lg md:text-xl text-[var(--fg)] mb-2 tracking-tight">
                        {title}
                    </h3>

                    <p className="text-[var(--fg-muted)] text-sm leading-relaxed text-justify mb-6">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-[11px] font-mono font-medium tracking-wide rounded-full border border-[var(--border)] text-[var(--fg-muted)] bg-[var(--bg)]/50 group-hover:border-[var(--border-accent)] transition-colors duration-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Tech Icons Row */}
                    <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
                        <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mr-1">
                            Tech
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                            {tags.map((tag) => {
                                const iconUrl = techIcons[tag];
                                return iconUrl ? (
                                    <div
                                        key={tag}
                                        className="w-7 h-7 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center p-1 hover:border-[var(--border-accent)] hover:scale-110 transition-all duration-300"
                                        title={tag}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={iconUrl}
                                            alt={tag}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div
                                        key={tag}
                                        className="w-7 h-7 rounded-lg border border-[var(--border)] flex items-center justify-center hover:border-[var(--border-accent)] hover:scale-110 transition-all duration-300"
                                        style={{ background: `${accent}15` }}
                                        title={tag}
                                    >
                                        <span
                                            className="text-[10px] font-mono font-bold"
                                            style={{ color: accent }}
                                        >
                                            {tag.charAt(0)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
