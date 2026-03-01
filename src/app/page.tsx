import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMeServer from "@/components/AboutMeServer";
import ProjectShowcase from "@/components/ProjectShowcase";
import TechStack from "@/components/TechStack";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <AboutMeServer />
                <ProjectShowcase />
                <TechStack />
                <Timeline />
                <Footer />
            </main>
        </>
    );
}
