"use client";

import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type ElementType,
    type ReactNode,
} from "react";

/**
 * Lightweight replacement for framer-motion's useInView.
 * Returns [ref, inView] — inView flips to true once the element
 * enters the viewport (and stays true).
 */
export function useInViewOnce<T extends HTMLElement>(rootMargin = "0px 0px -60px 0px") {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof IntersectionObserver === "undefined") {
            setInView(true);
            return;
        }
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setInView(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.1, rootMargin }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [rootMargin]);

    return [ref, inView] as const;
}

interface RevealProps {
    as?: ElementType;
    className?: string;
    style?: CSSProperties;
    /** transition delay in seconds */
    delay?: number;
    /** vertical offset in px while hidden */
    y?: number;
    /** horizontal offset in px while hidden */
    x?: number;
    /** scale while hidden */
    scale?: number;
    duration?: number;
    children?: ReactNode;
    id?: string;
}

/**
 * Fade-and-rise reveal on scroll into view.
 * Drop-in replacement for the common framer-motion pattern:
 *   initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
 */
export default function Reveal({
    as: Tag = "div",
    className,
    style,
    delay = 0,
    y = 28,
    x = 0,
    scale,
    duration = 0.7,
    children,
    id,
}: RevealProps) {
    const [ref, inView] = useInViewOnce<HTMLElement>();
    const hidden = `translate3d(${x}px, ${y}px, 0)${scale !== undefined ? ` scale(${scale})` : ""}`;

    return (
        <Tag
            ref={ref}
            id={id}
            className={className}
            style={{
                ...style,
                opacity: inView ? 1 : 0,
                transform: inView ? "translate3d(0, 0, 0)" : hidden,
                transitionProperty: "opacity, transform",
                transitionDuration: `${duration}s`,
                transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                transitionDelay: `${delay}s`,
            }}
        >
            {children}
        </Tag>
    );
}
