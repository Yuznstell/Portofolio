"use client";

import Reveal from "./Reveal";
import { ReactNode } from "react";

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
    delay?: number;
}

export default function SectionWrapper({
    children,
    className = "",
    id,
    delay = 0,
}: SectionWrapperProps) {
    return (
        <Reveal as="section" id={id} y={40} delay={delay} className={className}>
            {children}
        </Reveal>
    );
}
