import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Allowed: jpg, png, webp, gif" },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File too large. Max 5MB" },
                { status: 400 }
            );
        }

        // Generate a clean filename
        const ext = file.name.split(".").pop() || "png";
        const timestamp = Date.now();
        const safeName = (formData.get("projectId") as string || "project")
            .replace(/[^a-zA-Z0-9-_]/g, "-");
        const filename = `${safeName}-${timestamp}.${ext}`;

        // Save to public/projects/
        const uploadDir = path.join(process.cwd(), "public", "projects");
        await fs.mkdir(uploadDir, { recursive: true });

        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(path.join(uploadDir, filename), buffer);

        return NextResponse.json({ filename });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Upload failed" },
            { status: 500 }
        );
    }
}
