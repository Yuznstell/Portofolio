"use client";

import { useState, useEffect, useCallback } from "react";
import { readPortfolioData, updatePortfolioData } from "./actions";
import type { PortfolioData, Project, Experience, BilingualText } from "./actions";
import { logoutAction } from "./auth";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { useLanguage } from "@/lib/useLanguage";
import tr from "@/lib/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type Tab = "about" | "projects" | "experience" | "preview";

/** Safely get a string value from a bilingual or plain string field */
function getBi(val: string | BilingualText | undefined, key: "en" | "id"): string {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[key] || "";
}

/** Create a BilingualText object, preserving the other language */
function setBi(
    current: string | BilingualText | undefined,
    key: "en" | "id",
    value: string
): BilingualText {
    const existing =
        typeof current === "object" && current !== null
            ? current
            : { en: typeof current === "string" ? current : "", id: typeof current === "string" ? current : "" };
    return { ...existing, [key]: value };
}

const EMPTY_PROJECT: Project = {
    id: "",
    title: { en: "", id: "" },
    description: { en: "", id: "" },
    tags: [],
    link: "",
    accent: "#7c3aed",
    image: "",
    year: undefined,
    aiMetrics: null,
};

const EMPTY_EXPERIENCE: Experience = {
    id: "",
    period: "",
    role: { en: "", id: "" },
    company: "",
    description: { en: "", id: "" },
    tags: [],
};

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export default function AdminDashboard() {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>("projects");
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [editingExp, setEditingExp] = useState<Experience | null>(null);
    const [uploading, setUploading] = useState(false);
    const { lang } = useLanguage();

    const load = useCallback(async () => {
        const d = await readPortfolioData();
        setData(d);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        if (toast) {
            const t = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(t);
        }
    }, [toast]);

    const handleSave = async () => {
        if (!data) return;
        setSaving(true);
        const result = await updatePortfolioData(data);
        setSaving(false);
        if (result.success) {
            setToast({ type: "success", msg: tr.admin.saved[lang] });
        } else {
            setToast({ type: "error", msg: result.error || "Save failed" });
        }
    };

    const updateProject = (index: number, updated: Project) => {
        if (!data) return;
        const projects = [...data.projects];
        projects[index] = updated;
        setData({ ...data, projects });
    };

    const addProject = () => {
        const p = { ...EMPTY_PROJECT, id: generateId(), title: { en: "", id: "" }, description: { en: "", id: "" } };
        setEditingProject(p);
    };

    const deleteProject = (index: number) => {
        if (!data) return;
        const projects = data.projects.filter((_, i) => i !== index);
        setData({ ...data, projects });
    };

    const saveEditingProject = () => {
        if (!data || !editingProject) return;
        const idx = data.projects.findIndex((p) => p.id === editingProject.id);
        if (idx >= 0) {
            updateProject(idx, editingProject);
        } else {
            setData({ ...data, projects: [...data.projects, editingProject] });
        }
        setEditingProject(null);
    };

    const addExperience = () => {
        const e = { ...EMPTY_EXPERIENCE, id: generateId(), role: { en: "", id: "" }, description: { en: "", id: "" } };
        setEditingExp(e);
    };

    const deleteExperience = (index: number) => {
        if (!data) return;
        const experiences = data.experiences.filter((_, i) => i !== index);
        setData({ ...data, experiences });
    };

    const saveEditingExp = () => {
        if (!data || !editingExp) return;
        const idx = data.experiences.findIndex((e) => e.id === editingExp.id);
        if (idx >= 0) {
            const experiences = [...data.experiences];
            experiences[idx] = editingExp;
            setData({ ...data, experiences });
        } else {
            setData({ ...data, experiences: [...data.experiences, editingExp] });
        }
        setEditingExp(null);
    };

    if (!data) {
        return (
            <div className="min-h-screen bg-bg flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const aiChartData = data.projects
        .filter((p) => p.aiMetrics)
        .map((p) => ({
            name: getBi(p.title, lang).length > 18 ? getBi(p.title, lang).slice(0, 18) + "..." : getBi(p.title, lang),
            accuracy: p.aiMetrics!.accuracy,
            latency: p.aiMetrics!.latency,
            color: p.accent,
        }));

    const tabs: { key: Tab; label: string }[] = [
        { key: "about", label: tr.about.sectionLabel[lang] },
        { key: "projects", label: tr.nav.projects[lang] },
        { key: "experience", label: tr.nav.experience[lang] },
        { key: "preview", label: "JSON Preview" },
    ];

    const inputCls = "w-full px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--accent-dim)] transition-colors";
    const inputBgCls = "w-full px-4 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--accent-dim)] transition-colors";
    const labelCls = "block text-xs font-mono text-[var(--fg-muted)] uppercase tracking-wider mb-1.5";

    return (
        <div className="min-h-screen bg-bg">
            <header className="sticky top-0 z-40 bg-[var(--bg-elevated)]/80 backdrop-blur-xl border-b border-[var(--border)]">
                <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-lg text-[var(--accent-light)]">
                            A.
                        </span>
                        <span className="text-xs font-mono text-[var(--fg-muted)] bg-[var(--surface)] px-2 py-1 rounded-md border border-[var(--border)]">
                            Admin
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />
                        <button
                            id="save-all-btn"
                            onClick={handleSave}
                            disabled={saving}
                            className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-all duration-300"
                        >
                            {saving ? tr.admin.saving[lang] : tr.admin.save[lang]}
                        </button>
                        <form action={logoutAction}>
                            <button
                                id="logout-btn"
                                type="submit"
                                className="px-4 py-2 border border-[var(--border)] text-[var(--fg-muted)] hover:text-white hover:border-red-500/50 text-xs font-medium rounded-lg transition-all duration-300"
                            >
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            {toast && (
                <div
                    className={`fixed top-20 right-6 z-50 px-4 py-3 rounded-xl border text-sm font-medium animate-slide-up ${toast.type === "success"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                        }`}
                >
                    {toast.msg}
                </div>
            )}

            <div className="max-w-[1200px] mx-auto px-6 py-8">
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            id={`tab-${tab.key}`}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-5 py-2.5 text-xs font-display font-medium rounded-xl whitespace-nowrap transition-all duration-300 ${activeTab === tab.key
                                ? "bg-[var(--surface)] border border-[var(--border-accent)] text-white"
                                : "text-[var(--fg-muted)] hover:text-white border border-transparent hover:bg-[var(--surface)]"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ========== ABOUT TAB ========== */}
                {activeTab === "about" && (
                    <div className="space-y-6">
                        <h2 className="font-display font-semibold text-lg">{tr.about.sectionLabel[lang]}</h2>
                        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelCls}>{tr.admin.photoUrl[lang]}</label>
                                    <input
                                        id="about-photo-input"
                                        value={data.about.photoUrl}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                about: { ...data.about, photoUrl: e.target.value },
                                            })
                                        }
                                        placeholder="https://example.com/photo.jpg"
                                        className={inputBgCls}
                                    />
                                    <p className="text-[10px] text-[var(--fg-muted)]/50 mt-1">Leave empty for initials avatar</p>
                                </div>
                                <div>
                                    <label className={labelCls}>{tr.admin.location[lang]}</label>
                                    <input
                                        id="about-location-input"
                                        value={data.about.location}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                about: { ...data.about, location: e.target.value },
                                            })
                                        }
                                        className={inputBgCls}
                                    />
                                </div>
                            </div>

                            {/* Bio EN */}
                            <div>
                                <label className={labelCls}>{tr.admin.bioEn[lang]}</label>
                                <textarea
                                    id="about-bio-en"
                                    value={getBi(data.about.bio, "en")}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            about: { ...data.about, bio: setBi(data.about.bio, "en", e.target.value) },
                                        })
                                    }
                                    rows={4}
                                    className={`${inputBgCls} resize-none leading-relaxed`}
                                />
                            </div>

                            {/* Bio ID */}
                            <div>
                                <label className={labelCls}>{tr.admin.bioId[lang]}</label>
                                <textarea
                                    id="about-bio-id"
                                    value={getBi(data.about.bio, "id")}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            about: { ...data.about, bio: setBi(data.about.bio, "id", e.target.value) },
                                        })
                                    }
                                    rows={4}
                                    className={`${inputBgCls} resize-none leading-relaxed`}
                                />
                            </div>

                            {data.about.photoUrl && (
                                <div>
                                    <p className="text-xs font-mono text-[var(--fg-muted)] uppercase tracking-wider mb-2">{tr.admin.preview[lang]}</p>
                                    <div className="w-24 h-24 rounded-xl border border-[var(--border)] overflow-hidden">
                                        <img
                                            src={data.about.photoUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ========== PROJECTS TAB ========== */}
                {activeTab === "projects" && (
                    <div className="space-y-6">
                        {aiChartData.length > 0 && (
                            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
                                <h3 className="font-display font-semibold text-base mb-1">
                                    AI Model Performance
                                </h3>
                                <p className="text-xs text-[var(--fg-muted)] mb-6">
                                    Accuracy (%) and Latency (ms) across projects
                                </p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xs font-mono text-[var(--fg-muted)] mb-3 uppercase tracking-wider">
                                            Accuracy
                                        </p>
                                        <ResponsiveContainer width="100%" height={180}>
                                            <BarChart data={aiChartData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--fg-muted)" }} axisLine={{ stroke: "var(--border)" }} />
                                                <YAxis domain={[80, 100]} tick={{ fontSize: 10, fill: "var(--fg-muted)" }} axisLine={{ stroke: "var(--border)" }} />
                                                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                                                <Bar dataKey="accuracy" radius={[4, 4, 0, 0]}>
                                                    {aiChartData.map((entry, i) => (
                                                        <Cell key={i} fill={entry.color} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono text-[var(--fg-muted)] mb-3 uppercase tracking-wider">
                                            Latency (ms)
                                        </p>
                                        <ResponsiveContainer width="100%" height={180}>
                                            <BarChart data={aiChartData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--fg-muted)" }} axisLine={{ stroke: "var(--border)" }} />
                                                <YAxis tick={{ fontSize: 10, fill: "var(--fg-muted)" }} axisLine={{ stroke: "var(--border)" }} />
                                                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                                                <Bar dataKey="latency" radius={[4, 4, 0, 0]}>
                                                    {aiChartData.map((entry, i) => (
                                                        <Cell key={i} fill={entry.color + "80"} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <h2 className="font-display font-semibold text-lg">
                                {tr.nav.projects[lang]} ({data.projects.length})
                            </h2>
                            <button
                                id="add-project-btn"
                                onClick={addProject}
                                className="px-4 py-2 bg-[var(--accent)]/10 border border-[var(--accent-dim)] text-[var(--accent-light)] text-xs font-medium rounded-lg hover:bg-[var(--accent)]/20 transition-all duration-300"
                            >
                                {tr.admin.addProject[lang]}
                            </button>
                        </div>

                        {data.projects.map((project, i) => (
                            <div
                                key={project.id}
                                className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 flex items-start justify-between gap-4"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span
                                            className="w-2.5 h-2.5 rounded-full shrink-0"
                                            style={{ background: project.accent }}
                                        />
                                        <h3 className="font-display font-semibold text-sm truncate">
                                            {getBi(project.title, lang) || "Untitled"}
                                        </h3>
                                    </div>
                                    <p className="text-xs text-[var(--fg-muted)] line-clamp-2 mb-2">
                                        {getBi(project.description, lang)}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 text-[10px] font-mono rounded-full border border-[var(--border)] text-[var(--fg-muted)]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        id={`edit-project-${project.id}`}
                                        onClick={() => setEditingProject({ ...project })}
                                        className="px-3 py-1.5 text-[11px] font-medium border border-[var(--border)] rounded-lg text-[var(--fg-muted)] hover:text-white hover:border-[var(--accent-dim)] transition-all duration-300"
                                    >
                                        {tr.admin.edit[lang]}
                                    </button>
                                    <button
                                        id={`delete-project-${project.id}`}
                                        onClick={() => deleteProject(i)}
                                        className="px-3 py-1.5 text-[11px] font-medium border border-[var(--border)] rounded-lg text-[var(--fg-muted)] hover:text-red-400 hover:border-red-500/30 transition-all duration-300"
                                    >
                                        {tr.admin.delete[lang]}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ========== EXPERIENCE TAB ========== */}
                {activeTab === "experience" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display font-semibold text-lg">
                                {tr.nav.experience[lang]} ({data.experiences.length})
                            </h2>
                            <button
                                id="add-experience-btn"
                                onClick={addExperience}
                                className="px-4 py-2 bg-[var(--accent)]/10 border border-[var(--accent-dim)] text-[var(--accent-light)] text-xs font-medium rounded-lg hover:bg-[var(--accent)]/20 transition-all duration-300"
                            >
                                {tr.admin.addEntry[lang]}
                            </button>
                        </div>

                        {data.experiences.map((exp, i) => (
                            <div
                                key={exp.id}
                                className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 flex items-start justify-between gap-4"
                            >
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-display font-semibold text-sm">
                                        {getBi(exp.role, lang) || "Untitled Role"}
                                    </h3>
                                    <p className="text-xs text-[var(--accent-light)] mt-0.5">
                                        {exp.company}
                                    </p>
                                    <p className="text-xs text-[var(--fg-muted)] mt-1">
                                        {exp.period}
                                    </p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        id={`edit-exp-${exp.id}`}
                                        onClick={() => setEditingExp({ ...exp })}
                                        className="px-3 py-1.5 text-[11px] font-medium border border-[var(--border)] rounded-lg text-[var(--fg-muted)] hover:text-white hover:border-[var(--accent-dim)] transition-all duration-300"
                                    >
                                        {tr.admin.edit[lang]}
                                    </button>
                                    <button
                                        id={`delete-exp-${exp.id}`}
                                        onClick={() => deleteExperience(i)}
                                        className="px-3 py-1.5 text-[11px] font-medium border border-[var(--border)] rounded-lg text-[var(--fg-muted)] hover:text-red-400 hover:border-red-500/30 transition-all duration-300"
                                    >
                                        {tr.admin.delete[lang]}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ========== JSON PREVIEW TAB ========== */}
                {activeTab === "preview" && (
                    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                                <span className="ml-2 text-[10px] font-mono text-[var(--fg-muted)]">
                                    portfolio.json
                                </span>
                            </div>
                            <button
                                id="copy-json-btn"
                                onClick={() => navigator.clipboard.writeText(JSON.stringify(data, null, 2))}
                                className="text-[11px] font-mono text-[var(--fg-muted)] hover:text-white transition-colors duration-300"
                            >
                                Copy
                            </button>
                        </div>
                        <pre className="p-5 text-xs font-mono text-[var(--fg-muted)] overflow-auto max-h-[600px] leading-relaxed">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                )}
            </div>

            {/* ========== PROJECT EDIT MODAL ========== */}
            {editingProject && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto p-6">
                        <h3 className="font-display font-semibold text-lg mb-6">
                            {data.projects.find((p) => p.id === editingProject.id)
                                ? tr.admin.editProject[lang]
                                : tr.admin.newProject[lang]}
                        </h3>

                        <div className="space-y-4">
                            {/* Title EN */}
                            <div>
                                <label className={labelCls}>{tr.admin.title[lang]} (EN)</label>
                                <input
                                    id="project-title-en"
                                    value={getBi(editingProject.title, "en")}
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, title: setBi(editingProject.title, "en", e.target.value) })
                                    }
                                    className={inputCls}
                                />
                            </div>

                            {/* Title ID */}
                            <div>
                                <label className={labelCls}>{tr.admin.title[lang]} (ID)</label>
                                <input
                                    id="project-title-id"
                                    value={getBi(editingProject.title, "id")}
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, title: setBi(editingProject.title, "id", e.target.value) })
                                    }
                                    className={inputCls}
                                />
                            </div>

                            {/* Description EN */}
                            <div>
                                <label className={labelCls}>{tr.admin.descEn[lang]}</label>
                                <textarea
                                    id="project-desc-en"
                                    value={getBi(editingProject.description, "en")}
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, description: setBi(editingProject.description, "en", e.target.value) })
                                    }
                                    rows={3}
                                    className={`${inputCls} resize-none`}
                                />
                            </div>

                            {/* Description ID */}
                            <div>
                                <label className={labelCls}>{tr.admin.descId[lang]}</label>
                                <textarea
                                    id="project-desc-id"
                                    value={getBi(editingProject.description, "id")}
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, description: setBi(editingProject.description, "id", e.target.value) })
                                    }
                                    rows={3}
                                    className={`${inputCls} resize-none`}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>{tr.admin.link[lang]}</label>
                                    <input
                                        id="project-link-input"
                                        value={editingProject.link}
                                        onChange={(e) =>
                                            setEditingProject({ ...editingProject, link: e.target.value })
                                        }
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label className={labelCls}>{tr.admin.accent[lang]}</label>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            id="project-accent-input"
                                            type="color"
                                            value={editingProject.accent}
                                            onChange={(e) =>
                                                setEditingProject({ ...editingProject, accent: e.target.value })
                                            }
                                            className="w-10 h-10 rounded-lg border border-[var(--border)] bg-transparent cursor-pointer"
                                        />
                                        <span className="text-xs font-mono text-[var(--fg-muted)]">
                                            {editingProject.accent}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className={labelCls}>{tr.admin.tags[lang]}</label>
                                <input
                                    id="project-tags-input"
                                    value={editingProject.tags.join(", ")}
                                    onChange={(e) =>
                                        setEditingProject({
                                            ...editingProject,
                                            tags: e.target.value
                                                .split(",")
                                                .map((tg) => tg.trim())
                                                .filter(Boolean),
                                        })
                                    }
                                    className={inputCls}
                                    placeholder="Next.js, Python, Docker"
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="border-t border-[var(--border)] pt-4">
                                <label className={labelCls}>{tr.admin.projectImage[lang]}</label>
                                {editingProject.image && (
                                    <div className="mb-3 relative w-full h-40 rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--surface)]">
                                        <img
                                            src={`/projects/${editingProject.image}`}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setEditingProject({ ...editingProject, image: "" })}
                                            className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-red-400 text-xs transition-all duration-300"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <label
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-[var(--border)] text-xs font-mono text-[var(--fg-muted)] cursor-pointer hover:border-[var(--accent-dim)] hover:text-[var(--accent-light)] transition-all duration-300 ${uploading ? "opacity-50 pointer-events-none" : ""
                                            }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                        </svg>
                                        {uploading ? tr.admin.uploading[lang] : tr.admin.uploadImage[lang]}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                setUploading(true);
                                                try {
                                                    const form = new FormData();
                                                    form.append("file", file);
                                                    form.append("projectId", editingProject.id);
                                                    const res = await fetch("/api/upload", {
                                                        method: "POST",
                                                        body: form,
                                                    });
                                                    const result = await res.json();
                                                    if (result.filename) {
                                                        setEditingProject({
                                                            ...editingProject,
                                                            image: result.filename,
                                                        });
                                                        setToast({ type: "success", msg: "Image uploaded!" });
                                                    } else {
                                                        setToast({ type: "error", msg: result.error || "Upload failed" });
                                                    }
                                                } catch {
                                                    setToast({ type: "error", msg: "Upload failed" });
                                                }
                                                setUploading(false);
                                                e.target.value = "";
                                            }}
                                        />
                                    </label>
                                </div>
                                <p className="text-[10px] text-[var(--fg-muted)]/50 mt-1.5">Max 5MB. JPG, PNG, WebP, GIF</p>
                            </div>

                            {/* Year */}
                            <div>
                                <label className={labelCls}>{tr.admin.year[lang]}</label>
                                <input
                                    id="project-year-input"
                                    type="number"
                                    min="2000"
                                    max="2099"
                                    value={editingProject.year || ""}
                                    onChange={(e) =>
                                        setEditingProject({
                                            ...editingProject,
                                            year: e.target.value ? parseInt(e.target.value) : undefined,
                                        })
                                    }
                                    placeholder="2024"
                                    className={inputCls}
                                />
                            </div>

                            <div className="border-t border-[var(--border)] pt-4">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs font-mono text-[var(--fg-muted)] uppercase tracking-wider">
                                        {tr.admin.aiMetrics[lang]}
                                    </label>
                                    <button
                                        id="toggle-ai-metrics-btn"
                                        onClick={() =>
                                            setEditingProject({
                                                ...editingProject,
                                                aiMetrics: editingProject.aiMetrics
                                                    ? null
                                                    : { accuracy: 0, latency: 0 },
                                            })
                                        }
                                        className={`text-[11px] font-medium px-3 py-1 rounded-full border transition-all duration-300 ${editingProject.aiMetrics
                                            ? "border-emerald-500/30 text-emerald-400"
                                            : "border-[var(--border)] text-[var(--fg-muted)]"
                                            }`}
                                    >
                                        {editingProject.aiMetrics ? tr.admin.enabled[lang] : tr.admin.addMetrics[lang]}
                                    </button>
                                </div>

                                {editingProject.aiMetrics && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-mono text-[var(--fg-muted)] mb-1">
                                                Accuracy (%)
                                            </label>
                                            <input
                                                id="ai-accuracy-input"
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="100"
                                                value={editingProject.aiMetrics.accuracy}
                                                onChange={(e) =>
                                                    setEditingProject({
                                                        ...editingProject,
                                                        aiMetrics: {
                                                            ...editingProject.aiMetrics!,
                                                            accuracy: parseFloat(e.target.value) || 0,
                                                        },
                                                    })
                                                }
                                                className={inputCls}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-mono text-[var(--fg-muted)] mb-1">
                                                Latency (ms)
                                            </label>
                                            <input
                                                id="ai-latency-input"
                                                type="number"
                                                step="1"
                                                min="0"
                                                value={editingProject.aiMetrics.latency}
                                                onChange={(e) =>
                                                    setEditingProject({
                                                        ...editingProject,
                                                        aiMetrics: {
                                                            ...editingProject.aiMetrics!,
                                                            latency: parseInt(e.target.value) || 0,
                                                        },
                                                    })
                                                }
                                                className={inputCls}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                id="save-project-btn"
                                onClick={saveEditingProject}
                                className="flex-1 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white text-sm font-semibold rounded-xl transition-all duration-300"
                            >
                                Save
                            </button>
                            <button
                                id="cancel-project-btn"
                                onClick={() => setEditingProject(null)}
                                className="px-6 py-2.5 border border-[var(--border)] text-[var(--fg-muted)] text-sm font-medium rounded-xl hover:text-white transition-all duration-300"
                            >
                                {tr.admin.cancel[lang]}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========== EXPERIENCE EDIT MODAL ========== */}
            {editingExp && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto p-6">
                        <h3 className="font-display font-semibold text-lg mb-6">
                            {data.experiences.find((e) => e.id === editingExp.id)
                                ? tr.admin.editExperience[lang]
                                : tr.admin.newExperience[lang]}
                        </h3>

                        <div className="space-y-4">
                            {/* Role EN */}
                            <div>
                                <label className={labelCls}>{tr.admin.role[lang]} (EN)</label>
                                <input
                                    id="exp-role-en"
                                    value={getBi(editingExp.role, "en")}
                                    onChange={(e) =>
                                        setEditingExp({ ...editingExp, role: setBi(editingExp.role, "en", e.target.value) })
                                    }
                                    className={inputCls}
                                />
                            </div>

                            {/* Role ID */}
                            <div>
                                <label className={labelCls}>{tr.admin.role[lang]} (ID)</label>
                                <input
                                    id="exp-role-id"
                                    value={getBi(editingExp.role, "id")}
                                    onChange={(e) =>
                                        setEditingExp({ ...editingExp, role: setBi(editingExp.role, "id", e.target.value) })
                                    }
                                    className={inputCls}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>{tr.admin.company[lang]}</label>
                                    <input
                                        id="exp-company-input"
                                        value={editingExp.company}
                                        onChange={(e) =>
                                            setEditingExp({ ...editingExp, company: e.target.value })
                                        }
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label className={labelCls}>{tr.admin.period[lang]}</label>
                                    <input
                                        id="exp-period-input"
                                        value={editingExp.period}
                                        onChange={(e) =>
                                            setEditingExp({ ...editingExp, period: e.target.value })
                                        }
                                        placeholder="2023 — Present"
                                        className={inputCls}
                                    />
                                </div>
                            </div>

                            {/* Description EN */}
                            <div>
                                <label className={labelCls}>{tr.admin.descEn[lang]}</label>
                                <textarea
                                    id="exp-desc-en"
                                    value={getBi(editingExp.description, "en")}
                                    onChange={(e) =>
                                        setEditingExp({ ...editingExp, description: setBi(editingExp.description, "en", e.target.value) })
                                    }
                                    rows={3}
                                    className={`${inputCls} resize-none`}
                                />
                            </div>

                            {/* Description ID */}
                            <div>
                                <label className={labelCls}>{tr.admin.descId[lang]}</label>
                                <textarea
                                    id="exp-desc-id"
                                    value={getBi(editingExp.description, "id")}
                                    onChange={(e) =>
                                        setEditingExp({ ...editingExp, description: setBi(editingExp.description, "id", e.target.value) })
                                    }
                                    rows={3}
                                    className={`${inputCls} resize-none`}
                                />
                            </div>

                            <div>
                                <label className={labelCls}>{tr.admin.tags[lang]}</label>
                                <input
                                    id="exp-tags-input"
                                    value={editingExp.tags.join(", ")}
                                    onChange={(e) =>
                                        setEditingExp({
                                            ...editingExp,
                                            tags: e.target.value
                                                .split(",")
                                                .map((tg) => tg.trim())
                                                .filter(Boolean),
                                        })
                                    }
                                    className={inputCls}
                                    placeholder="React, Node.js, AWS"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                id="save-exp-btn"
                                onClick={saveEditingExp}
                                className="flex-1 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white text-sm font-semibold rounded-xl transition-all duration-300"
                            >
                                Save
                            </button>
                            <button
                                id="cancel-exp-btn"
                                onClick={() => setEditingExp(null)}
                                className="px-6 py-2.5 border border-[var(--border)] text-[var(--fg-muted)] text-sm font-medium rounded-xl hover:text-white transition-all duration-300"
                            >
                                {tr.admin.cancel[lang]}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
