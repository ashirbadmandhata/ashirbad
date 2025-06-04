"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Save,
  X,
  BarChart2,
  LogOut,
  Settings,
  Eye,
  Calendar,
  TrendingUp,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import AnalyticsDashboard from "@/components/analytics-dashboard"
import HireMeSubmissions from "@/components/hire-me-submissions"
import Link from "next/link"

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

const defaultProjects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "A full-featured online store with product management, cart, and checkout functionality.",
    longDescription:
      "This e-commerce platform provides businesses with everything they need to sell products online. Built with Next.js and a headless CMS, it features a responsive design, product filtering, user accounts, shopping cart, secure checkout with Stripe, and an admin dashboard for managing products and orders. The platform is optimized for performance and SEO, ensuring fast load times and good search engine visibility.",
    image: "/placeholder.svg?height=400&width=600",
    additionalImages: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    views: 45,
  },
  {
    id: "task-management",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    longDescription:
      "This task management application helps teams organize their work efficiently. It includes features like task creation and assignment, due dates, priority levels, status tracking, and file attachments. The app supports team collaboration with shared workspaces, comments, and notifications. Built with React and Firebase, it provides real-time updates so team members always see the latest information. The intuitive drag-and-drop interface makes it easy to manage tasks and track progress.",
    image: "/placeholder.svg?height=400&width=600",
    additionalImages: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    technologies: ["React", "Firebase", "Tailwind CSS", "React DnD", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    views: 32,
  },
  {
    id: "ai-content-generator",
    title: "AI Content Generator",
    description: "An AI-powered tool that helps create blog posts, social media content, and more.",
    longDescription:
      "This AI content generator helps content creators and marketers produce high-quality content quickly. Powered by OpenAI's GPT models, it can generate blog posts, social media captions, product descriptions, and more based on simple prompts. The application includes features like content editing, tone adjustment, and export options. Users can save templates for recurring content needs and collaborate with team members. The intuitive interface makes it easy to generate, edit, and manage content all in one place.",
    image: "/placeholder.svg?height=400&width=600",
    additionalImages: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "Vercel AI SDK", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    views: 28,
  },
]

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    longDescription: "",
    image: "",
    additionalImages: [],
    technologies: [],
    githubUrl: "",
    liveUrl: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hireMeSubmissions, setHireMeSubmissions] = useState<any[]>([])
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const authStatus = localStorage.getItem("admin-authenticated") === "true"
    setIsAuthenticated(authStatus)

    if (!authStatus) {
      router.push("/admin/login")
      return
    }

    setIsLoading(false)
  }, [router])

  // Initialize projects data
  useEffect(() => {
    if (!isAuthenticated) return

    const initializeProjects = () => {
      try {
        const savedProjects = localStorage.getItem("portfolio-projects")

        if (savedProjects) {
          const parsedProjects = JSON.parse(savedProjects)
          if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
            setProjects(parsedProjects)
          } else {
            // If empty array or invalid data, set default projects
            setProjects(defaultProjects)
            localStorage.setItem("portfolio-projects", JSON.stringify(defaultProjects))
          }
        } else {
          // No saved projects, set defaults
          setProjects(defaultProjects)
          localStorage.setItem("portfolio-projects", JSON.stringify(defaultProjects))
        }
      } catch (error) {
        console.error("Error loading projects:", error)
        // Fallback to default projects
        setProjects(defaultProjects)
        localStorage.setItem("portfolio-projects", JSON.stringify(defaultProjects))
      }
    }

    initializeProjects()
  }, [isAuthenticated])

  // Load hire me submissions
  useEffect(() => {
    if (!isAuthenticated) return

    try {
      const savedSubmissions = localStorage.getItem("project-inquiries")
      if (savedSubmissions) {
        const parsedSubmissions = JSON.parse(savedSubmissions)
        setHireMeSubmissions(Array.isArray(parsedSubmissions) ? parsedSubmissions : [])
      }
    } catch (error) {
      console.error("Error loading hire me submissions:", error)
      setHireMeSubmissions([])
    }
  }, [isAuthenticated])

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    if (isAuthenticated && projects.length > 0) {
      try {
        localStorage.setItem("portfolio-projects", JSON.stringify(projects))
      } catch (error) {
        console.error("Error saving projects:", error)
      }
    }
  }, [projects, isAuthenticated])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.githubUrl?.trim()) {
      newErrors.githubUrl = "GitHub URL is required"
    }

    if (!formData.liveUrl?.trim()) {
      newErrors.liveUrl = "Live URL is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof Project, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleTechnologiesChange = (value: string) => {
    const techs = value
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean)
    setFormData((prev) => ({ ...prev, technologies: techs }))
  }

  const handleAdditionalImagesChange = (value: string) => {
    const images = value
      .split(",")
      .map((img) => img.trim())
      .filter(Boolean)
    setFormData((prev) => ({ ...prev, additionalImages: images }))
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    const projectData: Project = {
      id: editingProject?.id || `project-${Date.now()}`,
      title: formData.title!.trim(),
      description: formData.description!.trim(),
      longDescription: formData.longDescription?.trim() || formData.description!.trim(),
      image: formData.image?.trim() || "/placeholder.svg?height=400&width=600",
      additionalImages: formData.additionalImages || [],
      technologies: formData.technologies || [],
      githubUrl: formData.githubUrl!.trim(),
      liveUrl: formData.liveUrl!.trim(),
      views: editingProject?.views || Math.floor(Math.random() * 50) + 1,
    }

    if (editingProject) {
      setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? projectData : p)))
    } else {
      setProjects((prev) => [...prev, projectData])
    }

    resetForm()
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      ...project,
      technologies: project.technologies || [],
      additionalImages: project.additionalImages || [],
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      longDescription: "",
      image: "",
      additionalImages: [],
      technologies: [],
      githubUrl: "",
      liveUrl: "",
    })
    setEditingProject(null)
    setIsDialogOpen(false)
    setErrors({})
  }

  const handleLogout = () => {
    localStorage.removeItem("admin-authenticated")
    router.push("/admin/login")
  }

  // Calculate stats
  const totalViews = projects.reduce((sum, project) => sum + (project.views || 0), 0)
  const totalProjects = projects.length
  const avgViews = totalProjects > 0 ? Math.round(totalViews / totalProjects) : 0
  const totalSubmissions = hireMeSubmissions.length

  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin rounded-full border-2 border-neon-purple border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background admin-content">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your portfolio projects and analytics</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="gap-2 bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple shadow-lg"
                    onClick={() => {
                      resetForm()
                      setIsDialogOpen(true)
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader className="pb-6 border-b border-border/40">
                    <DialogTitle className="gradient-text text-2xl text-center">
                      {editingProject ? "Edit Project" : "Create New Project"}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="p-6 space-y-8">
                    {/* Basic Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center">
                          <span className="text-white text-sm font-bold">1</span>
                        </div>
                        <h3 className="text-lg font-semibold">Basic Information</h3>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                            Project Title <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="title"
                            value={formData.title || ""}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            placeholder="Enter project title"
                            className={`h-12 border-border/40 focus:border-neon-purple ${
                              errors.title ? "border-red-500" : ""
                            }`}
                          />
                          {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="image" className="text-sm font-medium">
                            Main Image URL
                          </Label>
                          <Input
                            id="image"
                            value={formData.image || ""}
                            onChange={(e) => handleInputChange("image", e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="h-12 border-border/40 focus:border-neon-purple"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-border/40" />

                    {/* Descriptions */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-green flex items-center justify-center">
                          <span className="text-white text-sm font-bold">2</span>
                        </div>
                        <h3 className="text-lg font-semibold">Project Description</h3>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                            Short Description <span className="text-red-400">*</span>
                          </Label>
                          <Textarea
                            id="description"
                            value={formData.description || ""}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            placeholder="Brief project description for cards and previews"
                            rows={3}
                            className={`border-border/40 focus:border-neon-purple resize-none ${
                              errors.description ? "border-red-500" : ""
                            }`}
                          />
                          {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="longDescription" className="text-sm font-medium">
                            Detailed Description
                          </Label>
                          <Textarea
                            id="longDescription"
                            value={formData.longDescription || ""}
                            onChange={(e) => handleInputChange("longDescription", e.target.value)}
                            placeholder="Comprehensive project description for the project detail page"
                            rows={6}
                            className="border-border/40 focus:border-neon-purple resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-border/40" />

                    {/* Technical Details */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-neon-pink to-neon-yellow flex items-center justify-center">
                          <span className="text-white text-sm font-bold">3</span>
                        </div>
                        <h3 className="text-lg font-semibold">Technical Details</h3>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label htmlFor="technologies" className="text-sm font-medium">
                            Technologies Used
                          </Label>
                          <Input
                            id="technologies"
                            value={formData.technologies?.join(", ") || ""}
                            onChange={(e) => handleTechnologiesChange(e.target.value)}
                            placeholder="React, Next.js, TypeScript, Tailwind CSS"
                            className="h-12 border-border/40 focus:border-neon-purple"
                          />
                          <p className="text-xs text-muted-foreground">Separate technologies with commas</p>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="additionalImages" className="text-sm font-medium">
                            Additional Images
                          </Label>
                          <Textarea
                            id="additionalImages"
                            value={formData.additionalImages?.join(", ") || ""}
                            onChange={(e) => handleAdditionalImagesChange(e.target.value)}
                            placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                            rows={3}
                            className="border-border/40 focus:border-neon-purple resize-none"
                          />
                          <p className="text-xs text-muted-foreground">Separate image URLs with commas</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="githubUrl" className="text-sm font-medium flex items-center gap-2">
                              GitHub Repository <span className="text-red-400">*</span>
                            </Label>
                            <Input
                              id="githubUrl"
                              value={formData.githubUrl || ""}
                              onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                              placeholder="https://github.com/username/repo"
                              className={`h-12 border-border/40 focus:border-neon-purple ${
                                errors.githubUrl ? "border-red-500" : ""
                              }`}
                            />
                            {errors.githubUrl && <p className="text-red-400 text-sm">{errors.githubUrl}</p>}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="liveUrl" className="text-sm font-medium flex items-center gap-2">
                              Live Demo URL <span className="text-red-400">*</span>
                            </Label>
                            <Input
                              id="liveUrl"
                              value={formData.liveUrl || ""}
                              onChange={(e) => handleInputChange("liveUrl", e.target.value)}
                              placeholder="https://project-demo.com"
                              className={`h-12 border-border/40 focus:border-neon-purple ${
                                errors.liveUrl ? "border-red-500" : ""
                              }`}
                            />
                            {errors.liveUrl && <p className="text-red-400 text-sm">{errors.liveUrl}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-border/40" />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        onClick={handleSubmit}
                        className="flex-1 gap-2 bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple h-12 text-base font-medium"
                      >
                        <Save className="w-5 h-5" />
                        {editingProject ? "Update Project" : "Create Project"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={resetForm}
                        className="flex-1 border-border/40 hover:bg-muted/50 h-12 text-base"
                      >
                        <X className="w-5 h-5 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" asChild className="gap-2 border-border/40 hover:bg-muted/50">
                <Link href="/admin/settings">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2 border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                  <p className="text-3xl font-bold text-neon-purple">{totalProjects}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-neon-purple" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-3xl font-bold text-neon-cyan">{totalViews.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-neon-cyan" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Views</p>
                  <p className="text-3xl font-bold text-neon-green">{avgViews}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-neon-green/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-neon-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hire Me Forms</p>
                  <p className="text-3xl font-bold text-neon-yellow">{totalSubmissions}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-neon-yellow/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-neon-yellow" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="projects" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-card/50 border border-border/40 p-1 h-14 backdrop-blur-sm">
              <TabsTrigger
                value="projects"
                className="gap-2 px-8 h-12 text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple/20 data-[state=active]:to-neon-pink/20 data-[state=active]:text-neon-pink"
              >
                <Upload className="w-5 h-5" />
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="gap-2 px-8 h-12 text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple/20 data-[state=active]:to-neon-pink/20 data-[state=active]:text-neon-pink"
              >
                <BarChart2 className="w-5 h-5" />
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="submissions"
                className="gap-2 px-8 h-12 text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple/20 data-[state=active]:to-neon-pink/20 data-[state=active]:text-neon-pink"
              >
                <Mail className="w-5 h-5" />
                Hire Me Forms
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="projects" className="space-y-8">
            {projects.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {projects.length} project{projects.length !== 1 ? "s" : ""}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group h-full"
                    >
                      <Card className="border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:border-neon-purple/50">
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* View count overlay */}
                          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                            <Eye className="w-3 h-3 text-neon-cyan" />
                            <span className="text-xs font-medium">{project.views || 0}</span>
                          </div>
                        </div>

                        <CardContent className="p-6 flex-1 flex flex-col">
                          <div className="space-y-4 flex-1">
                            <div>
                              <h3 className="text-xl font-bold group-hover:text-neon-pink transition-colors line-clamp-2 mb-2">
                                {project.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {project.technologies.slice(0, 4).map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="secondary"
                                  className="text-xs bg-neon-purple/10 border-neon-purple/20 text-neon-purple hover:bg-neon-purple/20"
                                >
                                  {tech}
                                </Badge>
                              ))}
                              {project.technologies.length > 4 && (
                                <Badge variant="outline" className="text-xs border-border/40">
                                  +{project.technologies.length - 4}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <Separator className="my-4 bg-border/40" />

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>Updated recently</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(project)}
                                className="gap-1 border-border/40 hover:bg-neon-purple/10 hover:text-neon-purple hover:border-neon-purple/50 h-9 px-4"
                              >
                                <Edit className="w-3 h-3" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(project.id)}
                                className="gap-1 h-9 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto space-y-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center mx-auto shadow-2xl">
                      <Upload className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink mx-auto animate-ping opacity-20"></div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold gradient-text">No projects yet</h3>
                    <p className="text-muted-foreground text-lg">
                      Start building your portfolio by adding your first project
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      resetForm()
                      setIsDialogOpen(true)
                    }}
                    size="lg"
                    className="bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple shadow-lg h-12 px-8 text-base"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Project
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <AnalyticsDashboard projects={projects} />
          </TabsContent>

          <TabsContent value="submissions" className="space-y-8">
            <HireMeSubmissions submissions={hireMeSubmissions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
