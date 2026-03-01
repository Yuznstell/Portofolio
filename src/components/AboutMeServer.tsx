import fs from "fs/promises";
import path from "path";
import AboutMeClient from "./AboutMeClient";

async function getPortfolioData() {
    const filePath = path.join(process.cwd(), "src", "data", "portfolio.json");
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
}

export default async function AboutMe() {
    const data = await getPortfolioData();

    return (
        <AboutMeClient
            name={data.profile.name}
            role={data.profile.role}
            bio={data.about.bio}
            photoUrl={data.about.photoUrl}
            location={data.about.location}
        />
    );
}
