"use server";

import fs from "fs/promises";
import path from "path";

export interface BilingualText {
    en: string;
    id: string;
}

export interface AiMetrics {
    accuracy: number;
    latency: number;
}

export interface Project {
    id: string;
    title: string | BilingualText;
    description: string | BilingualText;
    tags: string[];
    link: string;
    accent: string;
    image?: string;
    year?: number;
    aiMetrics: AiMetrics | null;
}

export interface Experience {
    id: string;
    period: string;
    role: string | BilingualText;
    company: string;
    description: string | BilingualText;
    tags: string[];
}

export interface Profile {
    name: string;
    role: string | BilingualText;
    tagline: string | BilingualText;
}

export interface About {
    bio: string | BilingualText;
    photoUrl: string;
    location: string;
}

export interface PortfolioData {
    profile: Profile;
    about: About;
    projects: Project[];
    experiences: Experience[];
}

import os from "os";

const getFilePath = async () => {
    const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
    const tmpPath = path.join(os.tmpdir(), "portfolio.json");
    const defaultPath = path.join(process.cwd(), "src", "data", "portfolio.json");

    if (isProd) {
        try {
            await fs.access(tmpPath);
            return tmpPath;
        } catch {
            try {
                const raw = await fs.readFile(defaultPath, "utf-8");
                await fs.writeFile(tmpPath, raw, "utf-8");
            } catch (e) {
                // Ignore errors
            }
            return tmpPath;
        }
    }

    return defaultPath;
};

export async function readPortfolioData(): Promise<PortfolioData> {
    const DATA_PATH = await getFilePath();
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw) as PortfolioData;
}

export async function updatePortfolioData(
    data: PortfolioData
): Promise<{ success: boolean; error?: string }> {
    try {
        if (!data.profile || !data.projects || !data.experiences) {
            return { success: false, error: "Invalid data structure" };
        }

        for (const p of data.projects) {
            if (!p.id) {
                return { success: false, error: `Project missing id` };
            }
        }

        for (const e of data.experiences) {
            if (!e.id) {
                return { success: false, error: `Experience missing id` };
            }
        }

        const DATA_PATH = await getFilePath();
        const json = JSON.stringify(data, null, 2);
        await fs.writeFile(DATA_PATH, json, "utf-8");
        return { success: true };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : "Unknown error",
        };
    }
}
