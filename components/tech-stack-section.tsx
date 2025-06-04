"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiAmazon,
  SiVercel,
  SiGraphql,
  SiPython,
  SiJavascript,
  SiExpress,
  SiRedis,
  SiTableau,
  SiJupyter,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiTensorflow,
  SiApachespark,
  SiMysql,
  SiElasticsearch,
} from "react-icons/si"
import { BarChart3, Brain, Cloud } from "lucide-react"

export default function TechStackSection() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const technologies = [
    // Frontend Technologies
    {
      name: "React",
      icon: <SiReact className="h-12 w-12" />,
      description: "UI Library",
      color: "text-blue-400",
      level: 95,
      category: "frontend",
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="h-12 w-12" />,
      description: "React Framework",
      color: "text-white",
      level: 90,
      category: "frontend",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="h-12 w-12" />,
      description: "Type Safety",
      color: "text-blue-500",
      level: 88,
      category: "frontend",
    },
    {
      name: "JavaScript",
      icon: <SiJavascript className="h-12 w-12" />,
      description: "Programming Language",
      color: "text-yellow-300",
      level: 92,
      category: "frontend",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="h-12 w-12" />,
      description: "CSS Framework",
      color: "text-cyan-400",
      level: 90,
      category: "frontend",
    },

    // Backend Technologies
    {
      name: "Node.js",
      icon: <SiNodedotjs className="h-12 w-12" />,
      description: "Runtime",
      color: "text-green-500",
      level: 85,
      category: "backend",
    },
    {
      name: "Python",
      icon: <SiPython className="h-12 w-12" />,
      description: "Backend & Data Science",
      color: "text-yellow-400",
      level: 92,
      category: "backend",
    },
    {
      name: "Express.js",
      icon: <SiExpress className="h-12 w-12" />,
      description: "Web Framework",
      color: "text-gray-300",
      level: 85,
      category: "backend",
    },
    {
      name: "GraphQL",
      icon: <SiGraphql className="h-12 w-12" />,
      description: "API Query Language",
      color: "text-pink-400",
      level: 75,
      category: "backend",
    },

    // Database Technologies
    {
      name: "MongoDB",
      icon: <SiMongodb className="h-12 w-12" />,
      description: "NoSQL Database",
      color: "text-green-400",
      level: 80,
      category: "database",
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql className="h-12 w-12" />,
      description: "SQL Database",
      color: "text-blue-300",
      level: 78,
      category: "database",
    },
    {
      name: "MySQL",
      icon: <SiMysql className="h-12 w-12" />,
      description: "Relational Database",
      color: "text-blue-400",
      level: 82,
      category: "database",
    },
    {
      name: "Redis",
      icon: <SiRedis className="h-12 w-12" />,
      description: "In-Memory Database",
      color: "text-red-400",
      level: 75,
      category: "database",
    },
    {
      name: "Elasticsearch",
      icon: <SiElasticsearch className="h-12 w-12" />,
      description: "Search Engine",
      color: "text-yellow-500",
      level: 70,
      category: "database",
    },

    // Data Science & Analytics
    {
      name: "Power BI",
      icon: <BarChart3 className="h-12 w-12" />,
      description: "Business Intelligence",
      color: "text-yellow-400",
      level: 88,
      category: "analytics",
    },
    {
      name: "Tableau",
      icon: <SiTableau className="h-12 w-12" />,
      description: "Data Visualization",
      color: "text-blue-500",
      level: 85,
      category: "analytics",
    },
    {
      name: "Jupyter",
      icon: <SiJupyter className="h-12 w-12" />,
      description: "Data Analysis",
      color: "text-orange-400",
      level: 90,
      category: "analytics",
    },
    {
      name: "Pandas",
      icon: <SiPandas className="h-12 w-12" />,
      description: "Data Manipulation",
      color: "text-blue-300",
      level: 87,
      category: "analytics",
    },
    {
      name: "NumPy",
      icon: <SiNumpy className="h-12 w-12" />,
      description: "Numerical Computing",
      color: "text-blue-400",
      level: 85,
      category: "analytics",
    },
    {
      name: "Scikit-learn",
      icon: <SiScikitlearn className="h-12 w-12" />,
      description: "Machine Learning",
      color: "text-orange-500",
      level: 80,
      category: "analytics",
    },
    {
      name: "TensorFlow",
      icon: <SiTensorflow className="h-12 w-12" />,
      description: "Deep Learning",
      color: "text-orange-400",
      level: 75,
      category: "analytics",
    },
    {
      name: "Apache Spark",
      icon: <SiApachespark className="h-12 w-12" />,
      description: "Big Data Processing",
      color: "text-orange-500",
      level: 72,
      category: "analytics",
    },
    {
      name: "PyTorch",
      icon: <Brain className="h-12 w-12" />,
      description: "Deep Learning",
      color: "text-red-400",
      level: 78,
      category: "analytics",
    },
    {
      name: "Matplotlib",
      icon: <BarChart3 className="h-12 w-12" />,
      description: "Data Visualization",
      color: "text-blue-400",
      level: 85,
      category: "analytics",
    },

    // DevOps & Tools
    {
      name: "Docker",
      icon: <SiDocker className="h-12 w-12" />,
      description: "Containerization",
      color: "text-blue-400",
      level: 70,
      category: "devops",
    },
    {
      name: "Git",
      icon: <SiGit className="h-12 w-12" />,
      description: "Version Control",
      color: "text-orange-500",
      level: 88,
      category: "devops",
    },
    {
      name: "AWS",
      icon: <SiAmazon className="h-12 w-12" />,
      description: "Cloud Services",
      color: "text-orange-400",
      level: 72,
      category: "devops",
    },
    {
      name: "Vercel",
      icon: <SiVercel className="h-12 w-12" />,
      description: "Deployment",
      color: "text-white",
      level: 85,
      category: "devops",
    },
    {
      name: "Azure",
      icon: <Cloud className="h-12 w-12" />,
      description: "Cloud Platform",
      color: "text-blue-500",
      level: 75,
      category: "devops",
    },
    {
      name: "Google Cloud",
      icon: <Cloud className="h-12 w-12" />,
      description: "Cloud Services",
      color: "text-red-400",
      level: 70,
      category: "devops",
    },
  ]

  const categories = [
    { id: "all", name: "All Technologies", count: technologies.length },
    { id: "frontend", name: "Frontend", count: technologies.filter((t) => t.category === "frontend").length },
    { id: "backend", name: "Backend", count: technologies.filter((t) => t.category === "backend").length },
    { id: "database", name: "Database", count: technologies.filter((t) => t.category === "database").length },
    { id: "analytics", name: "Data & Analytics", count: technologies.filter((t) => t.category === "analytics").length },
    { id: "devops", name: "DevOps & Cloud", count: technologies.filter((t) => t.category === "devops").length },
  ]

  const filteredTechnologies =
    selectedCategory === "all" ? technologies : technologies.filter((tech) => tech.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateY: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section id="tech-stack" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-cyan to-neon-green flex items-center justify-center mb-6 neon-glow"
          >
            <span className="text-2xl">⚡</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Tech Arsenal</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan via-neon-green to-neon-blue rounded-full mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Cutting-edge technologies spanning web development, data science, and cloud infrastructure
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-neon-purple to-neon-pink text-white shadow-lg"
                  : "bg-card/50 border border-border/40 text-muted-foreground hover:text-foreground hover:border-neon-purple/50"
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-70">({category.count})</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        >
          {filteredTechnologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                z: 50,
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <div className="tech-card p-6 rounded-2xl transition-all duration-500 h-full flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category badge */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 rounded-full bg-neon-purple"></div>
                </div>

                {/* Icon container */}
                <div className="relative z-10 mb-4 transition-transform duration-500 group-hover:scale-110">
                  <div
                    className={`${tech.color} transition-all duration-500 group-hover:drop-shadow-[0_0_10px_currentColor]`}
                  >
                    {tech.icon}
                  </div>
                </div>

                {/* Tech name */}
                <h3 className="font-bold text-lg text-center mb-2 relative z-10 group-hover:text-neon-cyan transition-colors duration-300">
                  {tech.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground text-center mb-3 relative z-10">{tech.description}</p>

                {/* Skill level bar */}
                <div className="w-full bg-muted/30 rounded-full h-2 relative z-10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-green rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs text-neon-cyan font-medium mt-1 relative z-10">{tech.level}%</span>

                {/* Hover effect particles */}
                {hoveredTech === tech.name && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-neon-cyan rounded-full"
                        initial={{
                          x: "50%",
                          y: "50%",
                          opacity: 0,
                          scale: 0,
                        }}
                        animate={{
                          x: `${Math.random() * 100}%`,
                          y: `${Math.random() * 100}%`,
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-neon-cyan/20 to-transparent rounded-bl-2xl rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-6"
        >
          {[
            {
              label: "Frontend",
              count: technologies.filter((t) => t.category === "frontend").length,
              color: "neon-blue",
            },
            {
              label: "Backend",
              count: technologies.filter((t) => t.category === "backend").length,
              color: "neon-green",
            },
            {
              label: "Database",
              count: technologies.filter((t) => t.category === "database").length,
              color: "neon-cyan",
            },
            {
              label: "Data & Analytics",
              count: technologies.filter((t) => t.category === "analytics").length,
              color: "neon-purple",
            },
            {
              label: "DevOps & Cloud",
              count: technologies.filter((t) => t.category === "devops").length,
              color: "neon-pink",
            },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className={`text-3xl font-bold text-${stat.color} mb-2`}>{stat.count}+</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">Ready to leverage these technologies for your project?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-neon-cyan to-neon-green text-background font-bold rounded-full neon-glow hover:shadow-2xl transition-all duration-300"
          >
            Let's Build Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
