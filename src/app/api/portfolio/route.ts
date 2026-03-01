import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";

export const dynamic = "force-dynamic";

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
                // If it fails to copy, ignore, handle gracefully later
            }
            return tmpPath;
        }
    }

    return defaultPath;
};

export async function GET() {
    try {
        const DATA_PATH = await getFilePath();
        const raw = await fs.readFile(DATA_PATH, "utf-8");
        const data = JSON.parse(raw);
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: "Failed to read portfolio data" },
            { status: 500 }
        );
    }
}
