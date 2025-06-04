"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PaymentModal from "@/components/payment-modal"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  additionalImages: string[]
  technologies: string[]
  githubUrl: string
  liveUrl: string
  views?: number
}

export default function ProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = localStorage.getItem("portfolio-projects")
    if (savedProjects) {
      const projects: Project[] = JSON.parse(savedProjects)
      const foundProject = projects.find((p) => p.id === id)

      if (foundProject) {
        setProject(foundProject)

        // Increment view count
        const updatedProjects = projects.map((p) => (p.id === id ? { ...p, views: (p.views || 0) + 1 } : p))
        localStorage.setItem("portfolio-projects", JSON.stringify(updatedProjects))
      }
    }
  }, [id])

  if (!project) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link href="/#projects">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-10 md:py-20 content-container">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to all projects</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="relative h-[300px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="space-y-4 flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground">{project.description}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:min-w-[200px]">
            <Button onClick={() => setShowPaymentModal(true)} className="w-full neon-glow">
              Buy Project
            </Button>
            <Button variant="outline" asChild>
              <Link href={project.liveUrl} target="_blank" className="w-full flex items-center gap-2">
                <ExternalLink size={16} />
                Live Demo
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={project.githubUrl} target="_blank" className="w-full flex items-center gap-2">
                <Github size={16} />
                Source Code
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-bold">Project Details</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-responsive leading-relaxed">{project.longDescription}</p>
          </div>

          {project.additionalImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {project.additionalImages.map((img, index) => (
                <div key={index} className="relative h-[200px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {showPaymentModal && <PaymentModal onClose={() => setShowPaymentModal(false)} />}
    </div>
  )
}
