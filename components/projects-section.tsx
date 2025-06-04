"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

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
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = localStorage.getItem("portfolio-projects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      // Set default projects if none exist
      const defaultProjects = [
        {
          id: "ecommerce-platform",
          title: "E-Commerce Platform",
          description: "A full-featured online store with product management, cart, and checkout functionality.",
          longDescription:
            "This e-commerce platform provides businesses with everything they need to sell products online.",
          image: "/placeholder.svg?height=400&width=600",
          additionalImages: ["/placeholder.svg?height=300&width=500"],
          technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          githubUrl: "https://github.com",
          liveUrl: "https://example.com",
        },
        {
          id: "ai-content-generator",
          title: "AI Content Generator",
          description: "An AI-powered tool that helps create blog posts, social media content, and more.",
          longDescription: "This AI content generator helps content creators produce high-quality content quickly.",
          image: "/placeholder.svg?height=400&width=600",
          additionalImages: ["/placeholder.svg?height=300&width=500"],
          technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "MongoDB"],
          githubUrl: "https://github.com",
          liveUrl: "https://example.com",
        },
      ]
      setProjects(defaultProjects)
      localStorage.setItem("portfolio-projects", JSON.stringify(defaultProjects))
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-transparent to-neon-green/5" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue flex items-center justify-center mb-6 neon-glow"
          >
            <span className="text-2xl">🚀</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan via-neon-green to-neon-blue rounded-full mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Explore my recent projects showcasing innovation, creativity, and technical excellence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <div className="tech-card rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:rotate-y-5">
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover overlay with links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Button size="sm" variant="secondary" asChild className="neon-glow-blue">
                      <Link href={project.githubUrl} target="_blank">
                        <Github className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="secondary" asChild className="neon-glow-green">
                      <Link href={project.liveUrl} target="_blank">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold group-hover:text-neon-cyan transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 leading-relaxed">{project.description}</p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="px-2 py-1 text-xs border-neon-cyan/30 bg-neon-cyan/10 hover:bg-neon-cyan/20 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="px-2 py-1 text-xs border-neon-green/50">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* View Project Link */}
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center text-sm font-medium text-neon-cyan hover:text-neon-green transition-colors duration-300 group/link relative overflow-hidden"
                  >
                    <span className="relative z-10">View Project Details</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 relative z-10" />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-green group-hover/link:w-full transition-all duration-300"></span>
                  </Link>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-neon-cyan/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Project number indicator */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-green flex items-center justify-center text-sm font-bold text-background neon-glow z-10">
                {String(index + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Admin Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button asChild variant="outline" className="border-neon-cyan/50 hover:bg-neon-cyan/10">
            <Link href="/admin">Manage Projects (Admin)</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
