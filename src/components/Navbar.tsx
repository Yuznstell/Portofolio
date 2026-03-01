"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/lib/useLanguage";
import tr from "@/lib/translations";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { lang } = useLanguage();

    const navLinks = [
        { label: tr.nav.about[lang], href: "#about" },
        { label: tr.nav.projects[lang], href: "#projects" },
        { label: tr.nav.stack[lang], href: "#stack" },
        { label: tr.nav.experience[lang], href: "#experience" },
        { label: tr.nav.contact[lang], href: "#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-400 ${scrolled
                    ? "bg-[var(--bg-elevated)]/80 backdrop-blur-xl border border-[var(--border)] shadow-lg shadow-[var(--shadow-color)]"
                    : "bg-transparent"
                    } rounded-full px-2 py-2`}
            >
                <div className="flex items-center gap-1">
                    <a
                        href="#"
                        className="px-4 py-2 font-display font-bold text-sm tracking-tight text-[var(--accent-light)] hover:text-[var(--accent)] transition-colors duration-300"
                    >
                        A.
                    </a>

                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-xs font-medium uppercase tracking-[0.06em] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-300 rounded-full hover:bg-[var(--surface)]"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center ml-1 gap-1">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>

                    <div className="flex md:hidden items-center gap-1">
                        <LanguageSwitcher />
                        <ThemeToggle />
                        <button
                            id="mobile-menu-toggle"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--surface)] transition-colors duration-300"
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileOpen}
                        >
                            <div className="w-5 flex flex-col gap-[5px]">
                                <span
                                    className={`block h-[1.5px] bg-[var(--fg)] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.25px]" : ""
                                        }`}
                                />
                                <span
                                    className={`block h-[1.5px] bg-[var(--fg)] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.25px]" : ""
                                        }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[var(--bg)]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-8"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: i * 0.08 }}
                                onClick={() => setMobileOpen(false)}
                                className="text-2xl font-display font-semibold tracking-tight text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-300"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
