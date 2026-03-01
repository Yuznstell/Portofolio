import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ["Space Grotesk", "sans-serif"],
                body: ["DM Sans", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            colors: {
                bg: {
                    DEFAULT: "#050505",
                    elevated: "#0a0a0f",
                },
                surface: {
                    DEFAULT: "#111118",
                    hover: "#16161f",
                },
                accent: {
                    DEFAULT: "#7c3aed",
                    light: "#a78bfa",
                    dim: "#4c1d95",
                },
                glow: {
                    violet: "rgba(124, 58, 237, 0.15)",
                    cyan: "rgba(34, 211, 238, 0.1)",
                },
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "glow-pulse": "glowPulse 4s ease-in-out infinite",
                "slide-up": "slideUp 0.5s ease-out",
                "text-rotate": "textRotate 8s infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glowPulse: {
                    "0%, 100%": { opacity: "0.4" },
                    "50%": { opacity: "0.8" },
                },
                slideUp: {
                    from: { opacity: "0", transform: "translateY(30px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                textRotate: {
                    "0%, 20%": { transform: "translateY(0)" },
                    "25%, 45%": { transform: "translateY(-100%)" },
                    "50%, 70%": { transform: "translateY(-200%)" },
                    "75%, 95%": { transform: "translateY(-300%)" },
                    "100%": { transform: "translateY(-400%)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
