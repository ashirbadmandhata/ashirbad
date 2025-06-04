import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import TechStackSection from "@/components/tech-stack-section"

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20 content-container">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TechStackSection />
    </div>
  )
}
