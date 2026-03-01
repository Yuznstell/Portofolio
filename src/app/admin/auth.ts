"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_NAME = "admin_session";
const SESSION_VALUE = "authenticated";
const MAX_AGE = 60 * 60 * 8; // 8 hours

export async function loginAction(
    _prevState: { error: string } | null,
    formData: FormData
): Promise<{ error: string } | null> {
    const password = formData.get("password") as string;

    if (!password) {
        return { error: "Password is required" };
    }

    if (password !== process.env.ADMIN_PASSWORD) {
        return { error: "Invalid password" };
    }

    const cookieStore = await cookies();
    cookieStore.set(SESSION_NAME, SESSION_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: MAX_AGE,
        path: "/",
    });

    redirect("/admin");
}

export async function logoutAction(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_NAME);
    redirect("/admin/login");
}
