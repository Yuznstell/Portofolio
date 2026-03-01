"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/lib/useLanguage";
import tr from "@/lib/translations";

interface Skill {
    name: string;
    level: number;
}

interface SkillCategory {
    label: string;
    color: string;
    skills: Skill[];
}

const categories: SkillCategory[] = [
    {
        label: "Frontend",
        color: "#7c3aed",
        skills: [
            { name: "HTML / CSS / JavaScript", level: 90 },
            { name: "PWA (Progressive Web Apps)", level: 85 },
            { name: "WordPress", level: 80 },
            { name: "Figma / UI Design", level: 82 },
        ],
    },
    {
        label: "Backend",
        color: "#22d3ee",
        skills: [
            { name: "Python", level: 88 },
            { name: "RESTful API", level: 85 },
            { name: "Kotlin", level: 78 },
            { name: "Remix / Ethereum", level: 75 },
        ],
    },
    {
        label: "AI / ML",
        color: "#f59e0b",
        skills: [
            { name: "Machine Learning", level: 85 },
            { name: "Computer Vision (SRGAN)", level: 82 },
            { name: "Face Recognition (MTCNN)", level: 80 },
            { name: "Deep Learning / GAN", level: 83 },
        ],
    },
    {
        label: "Infrastructure",
        color: "#10b981",
        skills: [
            { name: "Android Development", level: 82 },
            { name: "IoT / Sensor Integration", level: 80 },
            { name: "Blockchain / Smart Contract", level: 75 },
            { name: "Embedded Systems / HUD", level: 78 },
        ],
    },
];

function SkillBar({
    skill,
    color,
    delay,
}: {
    skill: Skill;
    color: string;
    delay: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="group">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[var(--fg)] font-medium">
                    {skill.name}
                </span>
                <span className="font-mono text-xs text-[var(--fg-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {skill.level}%
                </span>
            </div>
            <div className="h-[3px] rounded-full bg-[var(--border)] overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
                    className="h-full rounded-full"
                    style={{ background: color }}
                />
            </div>
        </div>
    );
}

export default function TechStack() {
    const [activeCategory, setActiveCategory] = useState(0);
    const { lang } = useLanguage();

    return (
        <SectionWrapper
            id="stack"
            className="relative py-24 md:py-32 px-6 md:px-10 lg:px-16 2xl:px-24"
        >
            <div className="max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1700px] mx-auto">
                <div className="mb-16">
                    <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-3 block">
                        {tr.techStack.sectionLabel[lang]}
                    </span>
                    <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                        {tr.techStack.sectionTitle[lang]}{" "}
                        <span className="text-gradient">{tr.techStack.sectionTitleHighlight[lang]}</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-[280px_1fr] gap-10">
                    <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 -mx-2 px-2">
                        {categories.map((cat, i) => (
                            <button
                                key={cat.label}
                                id={`stack-tab-${cat.label.toLowerCase().replace(/\s|\//g, "-")}`}
                                onClick={() => setActiveCategory(i)}
                                className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-left whitespace-nowrap transition-all duration-300 min-w-fit ${activeCategory === i
                                    ? "bg-[var(--surface)] border border-[var(--border-accent)]"
                                    : "hover:bg-[var(--surface)] border border-transparent"
                                    }`}
                            >
                                <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-300"
                                    style={{
                                        background: cat.color,
                                        transform:
                                            activeCategory === i ? "scale(1.3)" : "scale(1)",
                                    }}
                                />
                                <span
                                    className={`font-display font-medium text-sm transition-colors duration-300 ${activeCategory === i
                                        ? "text-[var(--fg)]"
                                        : "text-[var(--fg-muted)]"
                                        }`}
                                >
                                    {cat.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ background: categories[activeCategory].color }}
                            />
                            <h3 className="font-display font-semibold text-lg">
                                {categories[activeCategory].label}
                            </h3>
                        </div>
                        <div className="space-y-5">
                            {categories[activeCategory].skills.map((skill, i) => (
                                <SkillBar
                                    key={skill.name}
                                    skill={skill}
                                    color={categories[activeCategory].color}
                                    delay={i * 0.1}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
