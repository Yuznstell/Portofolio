import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-display",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
    weight: ["400", "500"],
});

export const metadata: Metadata = {
    title: "Yudha Nugraha — Full-stack Developer & AI Engineer",
    description:
        "Portfolio of a Full-stack Developer & AI Engineer specializing in React, Next.js, Python, AI/ML, and scalable cloud infrastructure.",
    openGraph: {
        title: "Yudha Nugraha — Full-stack Developer & AI Engineer",
        description:
            "Building intelligent systems, multi-tenant platforms, and production-grade AI solutions.",
        type: "website",
    },
};

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {}
})();
`;

const cleanupExtensionsScript = `
(function() {
  try {
    document.querySelectorAll('[bis_skin_checked]').forEach(function(el) {
      el.removeAttribute('bis_skin_checked');
    });
  } catch(e) {}
})();
`;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
            suppressHydrationWarning
        >
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
                <script dangerouslySetInnerHTML={{ __html: cleanupExtensionsScript }} />
            </head>
            <body className="bg-[var(--bg)] text-[var(--fg)] font-body antialiased" suppressHydrationWarning>
                <div className="noise-overlay" aria-hidden="true" suppressHydrationWarning />
                <div suppressHydrationWarning>
                    {children}
                </div>
            </body>
        </html>
    );
}
