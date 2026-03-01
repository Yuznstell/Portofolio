"use client";

import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/lib/useLanguage";
import tr from "@/lib/translations";

const links = [
    { label: "GitHub", href: "https://github.com/Yuznstell" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yudhanugraha/" },
    { label: "Email", href: "mailto:yudhanugraha.cr7@gmail.com" },
];

export default function Footer() {
    const { lang } = useLanguage();

    return (
        <SectionWrapper
            id="contact"
            className="relative py-24 md:py-32 px-6 md:px-10 border-t border-[var(--border)]"
        >
            <div className="max-w-[800px] mx-auto text-center">
                <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-3 block">
                    {tr.footer.sectionLabel[lang]}
                </span>
                <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-6">
                    {tr.footer.sectionTitle[lang]}{" "}
                    <span className="text-gradient">{tr.footer.sectionTitleHighlight[lang]}</span>
                </h2>
                <p className="text-[var(--fg-muted)] text-base md:text-lg max-w-[500px] mx-auto mb-10 leading-relaxed">
                    {tr.footer.subtitle[lang]}
                </p>

                <a
                    href="mailto:yudhanugraha.cr7@gmail.com"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-display font-semibold text-sm rounded-full transition-all duration-300 hover:-translate-y-[2px] mb-16"
                >
                    {tr.footer.cta[lang]}
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

                <div className="flex items-center justify-center gap-8 mb-12">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel={
                                link.href.startsWith("http")
                                    ? "noopener noreferrer"
                                    : undefined
                            }
                            className="text-xs font-mono text-[var(--fg-muted)] hover:text-[var(--accent-light)] transition-colors duration-300 tracking-wide uppercase"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="pt-8 border-t border-[var(--border)]">
                    <p className="font-mono text-xs text-[var(--fg-muted)]/50">
                        {tr.footer.bottom[lang]}
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}
