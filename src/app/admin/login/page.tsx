"use client";

import { useActionState } from "react";
import { loginAction } from "../auth";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(loginAction, null);

    return (
        <div className="min-h-screen bg-bg grid-background flex items-center justify-center px-6">
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="glow-orb w-[400px] h-[400px] bg-[var(--accent)] opacity-[0.05] top-1/4 left-1/4" />
                <div className="glow-orb w-[300px] h-[300px] bg-cyan-500 opacity-[0.04] bottom-1/4 right-1/4" />
            </div>

            <div className="relative w-full max-w-[380px]">
                <div className="text-center mb-8">
                    <a href="/" className="inline-block font-display font-bold text-2xl text-[var(--accent-light)] mb-2">
                        A.
                    </a>
                    <h1 className="font-display font-semibold text-xl text-[var(--fg)] tracking-tight">
                        Admin Access
                    </h1>
                    <p className="text-sm text-[var(--fg-muted)] mt-1">
                        Enter your password to continue
                    </p>
                </div>

                <form
                    action={formAction}
                    className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6"
                >
                    <label
                        htmlFor="password-input"
                        className="block text-xs font-mono text-[var(--fg-muted)] uppercase tracking-[0.08em] mb-2"
                    >
                        Password
                    </label>
                    <input
                        id="password-input"
                        name="password"
                        type="password"
                        required
                        placeholder="Enter admin password"
                        className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/40 focus:outline-none focus:border-[var(--accent-dim)] transition-colors duration-300"
                        suppressHydrationWarning
                    />

                    {state?.error && (
                        <div className="mt-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                            {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="mt-4 w-full py-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] disabled:opacity-50 disabled:cursor-wait text-white font-display font-semibold text-sm rounded-xl transition-all duration-300 hover:-translate-y-[1px]"
                        suppressHydrationWarning
                    >
                        {isPending ? "Authenticating..." : "Enter Dashboard"}
                    </button>
                </form>

                <p className="text-center text-xs text-[var(--fg-muted)]/30 mt-6 font-mono">
                    Protected route
                </p>
            </div>
        </div>
    );
}
