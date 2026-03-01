const translations = {
    // Navbar
    nav: {
        about: { en: "About", id: "Tentang" },
        projects: { en: "Projects", id: "Proyek" },
        stack: { en: "Stack", id: "Teknologi" },
        experience: { en: "Experience", id: "Pengalaman" },
        contact: { en: "Contact", id: "Kontak" },
    },

    // Hero
    hero: {
        greeting: { en: "Hello, I'm", id: "Halo, saya" },
        cta: { en: "View my work", id: "Lihat karya saya" },
        ctaContact: { en: "Get in touch", id: "Hubungi saya" },
        yearsExp: { en: "Years Exp", id: "Tahun Pengalaman" },
        projectsDone: { en: "Projects", id: "Proyek" },
        techUsed: { en: "Tech Used", id: "Teknologi" },
        rotatingWords: {
            en: ["AI Engineer", "System Arch", "Full-stack Dev", "ML Specialist", "Cloud Engineer"],
            id: ["AI Engineer", "Arsitek Sistem", "Full-stack Dev", "ML Specialist", "Cloud Engineer"],
        },
    },

    // About
    about: {
        sectionLabel: { en: "About Me", id: "Tentang Saya" },
        sectionTitle: { en: "Who I", id: "Siapa" },
        sectionTitleHighlight: { en: "am", id: "saya" },
        location: { en: "Based in", id: "Berbasis di" },
    },

    // Projects
    projects: {
        sectionLabel: { en: "Selected Work", id: "Karya Terpilih" },
        sectionTitle: { en: "Things I've", id: "Yang telah saya" },
        sectionTitleHighlight: { en: "built", id: "bangun" },
        filterLabel: { en: "Filter", id: "Filter" },
        all: { en: "All", id: "Semua" },
        projectsCount: { en: "projects", id: "proyek" },
        tech: { en: "Tech", id: "Teknologi" },
    },

    // Project Detail
    projectDetail: {
        back: { en: "Back", id: "Kembali" },
        overview: { en: "Overview", id: "Ringkasan" },
        keywords: { en: "Keywords", id: "Kata Kunci" },
        techStack: { en: "Tech Stack", id: "Teknologi" },
        backToAll: { en: "Back to All Projects", id: "Kembali ke Semua Proyek" },
        projectDetails: { en: "Project Details", id: "Detail Proyek" },
        notFound: { en: "Project Not Found", id: "Proyek Tidak Ditemukan" },
    },

    // Tech Stack
    techStack: {
        sectionLabel: { en: "Tech Arsenal", id: "Kemampuan Teknologi" },
        sectionTitle: { en: "Tools I", id: "Alat yang saya" },
        sectionTitleHighlight: { en: "wield", id: "kuasai" },
    },

    // Timeline / Experience
    timeline: {
        sectionLabel: { en: "Journey", id: "Perjalanan" },
        sectionTitle: { en: "Where I've", id: "Tempat saya" },
        sectionTitleHighlight: { en: "been", id: "berkarya" },
    },

    // Footer
    footer: {
        sectionLabel: { en: "Contact", id: "Kontak" },
        sectionTitle: { en: "Let's build", id: "Mari bangun" },
        sectionTitleHighlight: { en: "something", id: "sesuatu" },
        subtitle: {
            en: "Got a project that needs an engineer who thinks in systems? I'm always open to interesting conversations and collaborations.",
            id: "Punya proyek yang butuh engineer berpikir sistematis? Saya selalu terbuka untuk percakapan dan kolaborasi menarik.",
        },
        cta: { en: "Say hello", id: "Hubungi saya" },
        bottom: { en: "Designed & built with intention", id: "Dirancang & dibangun dengan tekad" },
    },

    // Admin
    admin: {
        save: { en: "Save All", id: "Simpan Semua" },
        saving: { en: "Saving...", id: "Menyimpan..." },
        saved: { en: "Saved successfully", id: "Berhasil disimpan" },
        addProject: { en: "+ Add Project", id: "+ Tambah Proyek" },
        addEntry: { en: "+ Add Entry", id: "+ Tambah" },
        edit: { en: "Edit", id: "Ubah" },
        delete: { en: "Delete", id: "Hapus" },
        cancel: { en: "Cancel", id: "Batal" },
        title: { en: "Title", id: "Judul" },
        description: { en: "Description", id: "Deskripsi" },
        descEn: { en: "Description (EN)", id: "Deskripsi (EN)" },
        descId: { en: "Description (ID)", id: "Deskripsi (ID)" },
        bioEn: { en: "Bio (EN)", id: "Bio (EN)" },
        bioId: { en: "Bio (ID)", id: "Bio (ID)" },
        tags: { en: "Tags (comma separated)", id: "Tag (dipisah koma)" },
        link: { en: "Link (URL)", id: "Link (URL)" },
        accent: { en: "Accent Color", id: "Warna Aksen" },
        year: { en: "Year", id: "Tahun" },
        projectImage: { en: "Project Image", id: "Gambar Proyek" },
        uploadImage: { en: "Upload Image", id: "Unggah Gambar" },
        uploading: { en: "Uploading...", id: "Mengunggah..." },
        role: { en: "Role", id: "Jabatan" },
        company: { en: "Company", id: "Perusahaan" },
        period: { en: "Period", id: "Periode" },
        photoUrl: { en: "Photo URL", id: "URL Foto" },
        location: { en: "Location", id: "Lokasi" },
        bio: { en: "Bio", id: "Bio" },
        preview: { en: "Preview", id: "Pratinjau" },
        newProject: { en: "New Project", id: "Proyek Baru" },
        editProject: { en: "Edit Project", id: "Ubah Proyek" },
        newExperience: { en: "New Experience", id: "Pengalaman Baru" },
        editExperience: { en: "Edit Experience", id: "Ubah Pengalaman" },
        aiMetrics: { en: "AI Metrics", id: "Metrik AI" },
        enabled: { en: "Enabled", id: "Aktif" },
        addMetrics: { en: "Add Metrics", id: "Tambah Metrik" },
    },
} as const;

export default translations;
