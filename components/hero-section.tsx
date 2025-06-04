"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Code, Zap, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import ContactForm from "@/components/contact-form"
import HireMeModal from "@/components/hire-me-modal"

export default function HeroSection() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [showHireMeModal, setShowHireMeModal] = useState(false)

  // Debug logging
  useEffect(() => {
    console.log("HireMeModal state changed:", showHireMeModal)
  }, [showHireMeModal])

  const handleHireMeClick = () => {
    console.log("Hire Me button clicked!")
    setShowHireMeModal(true)
  }

  const handleCloseHireMe = () => {
    console.log("Closing Hire Me modal")
    setShowHireMeModal(false)
  }

  return (
    <section className="relative pt-20 md:pt-32 pb-16 overflow-hidden section-bg-1">
      {/* Enhanced background with multiple neon effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-neon" />
        <div
          className="absolute bottom-20 left-10 w-80 h-80 bg-neon-pink/20 rounded-full blur-3xl animate-pulse-neon-pink"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-60 h-60 bg-neon-cyan/15 rounded-full blur-3xl animate-pulse-neon"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-10 left-1/4 w-40 h-40 bg-neon-green/10 rounded-full blur-2xl animate-pulse-neon"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-purple rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Enhanced Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Enhanced Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect neon-border shadow-neumorphic"
            >
              <div className="relative">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-neon-green rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-sm font-medium">Available for hire</span>
              <Star className="w-4 h-4 text-neon-yellow animate-pulse" />
            </motion.div>

            {/* Enhanced Main heading */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="heading-responsive font-bold tracking-tight leading-tight"
              >
                Hi, I'm <span className="gradient-text">Ashirbad Mandhata</span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl">Full-Stack</span>{" "}
                <span className="gradient-text-alt">Developer</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-responsive text-muted-foreground leading-relaxed max-w-2xl"
              >
                I craft exceptional digital experiences with{" "}
                <span className="text-neon-cyan font-semibold">modern technologies</span> and{" "}
                <span className="text-neon-green font-semibold">innovative solutions</span>. Transforming ideas into
                powerful, scalable applications.
              </motion.p>
            </div>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-6 py-6"
            >
              {[
                { number: "50+", label: "Projects Completed", color: "neon-purple" },
                { number: "5+", label: "Years Experience", color: "neon-pink" },
                { number: "100%", label: "Client Satisfaction", color: "neon-cyan" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div
                    className={`text-2xl sm:text-3xl font-bold text-${stat.color} group-hover:scale-110 transition-transform`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button asChild size="lg" variant="gradient" className="shadow-lg hover:shadow-xl animate-pulse-border">
                <Link href="/#projects">
                  <Code className="w-5 h-5 mr-2" />
                  View My Work
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              {/* Fixed Hire Me Button */}
              <Button
                size="lg"
                variant="glow"
                className="bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple"
                onClick={handleHireMeClick}
                type="button"
              >
                <Download className="w-5 h-5 mr-2" />
                Hire Me
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-neon-green/50 text-neon-green hover:bg-neon-green/10 hover:border-neon-green"
                onClick={() => setShowContactForm(true)}
              >
                <Zap className="w-5 h-5 mr-2" />
                Let's Talk
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Enhanced Developer Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Enhanced main image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                {/* Multi-layered neon border effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan p-1 animate-pulse-neon shadow-neumorphic">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-surface-1 to-surface-2 p-3">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-surface-2 to-surface-3 shadow-neumorphic-inset">
                      <Image
                        src="/ashirbad.png"
                        alt="Ashirbad Mandhata - Full Stack Developer"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Enhanced floating tech icons */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 hidden sm:block"
                >
                  {[
                    { icon: "⚛️", position: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2", color: "neon-cyan" },
                    { icon: "🚀", position: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2", color: "neon-pink" },
                    { icon: "💻", position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2", color: "neon-green" },
                    { icon: "⚡", position: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2", color: "neon-yellow" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className={`absolute w-12 h-12 sm:w-14 sm:h-14 rounded-xl glass-effect border border-${item.color}/30 flex items-center justify-center text-xl backdrop-blur-sm shadow-neumorphic hover:shadow-neumorphic-hover transition-all ${item.position}`}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.icon}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Enhanced sparkle effects */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 2,
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-neon-purple" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Enhanced background glow effects */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-neon-purple/10 rounded-full blur-3xl animate-pulse" />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-neon-pink/5 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] bg-neon-cyan/3 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "2s" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && <ContactForm isOpen={showContactForm} onClose={() => setShowContactForm(false)} />}

      {/* Hire Me Modal - Fixed Implementation */}
      {showHireMeModal && <HireMeModal isOpen={showHireMeModal} onClose={handleCloseHireMe} />}
    </section>
  )
}
