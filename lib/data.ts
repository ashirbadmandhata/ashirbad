// This will be dynamically loaded from localStorage in the actual components
export const getProjects = () => {
  if (typeof window !== "undefined") {
    const savedProjects = localStorage.getItem("portfolio-projects")
    if (savedProjects) {
      return JSON.parse(savedProjects)
    }
  }

  // Default projects for initial load
  return [
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
    },
  ]
}

export const projects = getProjects()
