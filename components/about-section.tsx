"use client"

import { motion } from "framer-motion"
import { Code2, Lightbulb, Rocket, Users, Award, Target, Zap, Heart } from "lucide-react"

export default function AboutSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const skills = [
    {
      name: "Problem Solving",
      icon: <Lightbulb className="h-6 w-6" />,
      color: "neon-yellow",
      description: "Creative solutions to complex challenges",
    },
    {
      name: "Clean Code",
      icon: <Code2 className="h-6 w-6" />,
      color: "neon-cyan",
      description: "Maintainable and scalable architecture",
    },
    {
      name: "Team Collaboration",
      icon: <Users className="h-6 w-6" />,
      color: "neon-green",
      description: "Effective communication and teamwork",
    },
    {
      name: "Fast Delivery",
      icon: <Rocket className="h-6 w-6" />,
      color: "neon-pink",
      description: "Rapid development without compromising quality",
    },
  ]

  const achievements = [
    { icon: <Award className="h-5 w-5" />, text: "5+ Years Experience", color: "neon-purple" },
    { icon: <Target className="h-5 w-5" />, text: "50+ Projects Delivered", color: "neon-cyan" },
    { icon: <Zap className="h-5 w-5" />, text: "100% Client Satisfaction", color: "neon-green" },
    { icon: <Heart className="h-5 w-5" />, text: "Passionate Developer", color: "neon-pink" },
  ]

  return (
    <section id="about" className="py-16 md:py-24 section-bg-2">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-cyan to-neon-green flex items-center justify-center mb-6 shadow-neumorphic"
          >
            <span className="text-2xl">👨‍💻</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan via-neon-green to-neon-blue rounded-full mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Passionate about creating digital experiences that make a difference
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience building modern web applications.
                I specialize in <span className="text-neon-cyan font-semibold">React</span>,
                <span className="text-neon-pink font-semibold"> Next.js</span>, and
                <span className="text-neon-green font-semibold"> Node.js</span>, creating responsive and performant user
                experiences.
              </p>
              <p className="text-lg leading-relaxed">
                My journey in web development started when I built my first website at 16. Since then, I've worked with
                startups and established companies to deliver high-quality software solutions that drive business
                growth.
              </p>
              <p className="text-lg leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing my knowledge through blog posts and community events.
              </p>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.text}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="flex items-center gap-3 p-3 rounded-lg glass-effect"
                >
                  <div className={`w-8 h-8 rounded-lg bg-${achievement.color}/20 flex items-center justify-center`}>
                    <div className={`text-${achievement.color}`}>{achievement.icon}</div>
                  </div>
                  <span className="text-sm font-medium">{achievement.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="group"
              >
                <div className="tech-card p-6 rounded-xl h-full flex flex-col items-center text-center space-y-4 group-hover:scale-105 transition-all duration-300">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${skill.color} to-${skill.color}/70 flex items-center justify-center shadow-neumorphic group-hover:shadow-neumorphic-hover transition-all`}
                  >
                    <div className="text-white">{skill.icon}</div>
                  </div>
                  <div className="space-y-2">
                    <h3 className={`font-bold text-lg group-hover:text-${skill.color} transition-colors`}>
                      {skill.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
