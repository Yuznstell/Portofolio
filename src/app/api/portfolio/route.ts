import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const DATA_PATH = path.join(process.cwd(), "src", "data", "portfolio.json");

export async function GET() {
    try {
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
