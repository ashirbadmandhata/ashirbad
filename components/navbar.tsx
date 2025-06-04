"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sparkles, Home, User, Briefcase, Code, Mail, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import HireMeModal from "@/components/hire-me-modal"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/#about", icon: User },
  { name: "Projects", href: "/#projects", icon: Briefcase },
  { name: "Tech Stack", href: "/#tech-stack", icon: Code },
  { name: "Contact", href: "/#contact", icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showHireMeModal, setShowHireMeModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMenu = () => setIsOpen(false)

  const handleHireMeClick = () => {
    console.log("Navbar Hire Me button clicked!")
    setShowHireMeModal(true)
    closeMenu() // Close mobile menu if open
  }

  return (
    <>
      <header
        className={`header-fixed transition-all duration-500 ${
          scrolled ? "bg-background/90 backdrop-blur-xl header-shadow border-b border-neon-purple/20" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan flex items-center justify-center overflow-hidden shadow-neumorphic group-hover:shadow-neumorphic-hover transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                <Sparkles className="w-7 h-7 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/0 to-neon-pink/30 group-hover:opacity-80 transition-opacity"></div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span
                className="text-xl md:text-2xl font-bold logo-text glitch group-hover:scale-105 transition-transform"
                data-text="Ashirbad Mandhata"
              >
                Ashirbad Mandhata
              </span>
              <span className="text-xs text-neon-pink/80 -mt-1 font-medium">Portfolio</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-neon-pink transition-all duration-300 relative group font-medium"
              >
                <span className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {item.name}
                </span>
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-pink group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Button
              className="bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple text-white shadow-neumorphic hover:shadow-neumorphic-hover transition-all duration-300"
              onClick={handleHireMeClick}
            >
              Hire Me
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden relative group" onClick={() => setIsOpen(true)}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 flex items-center justify-center group-hover:from-neon-purple/30 group-hover:to-neon-pink/30 transition-all">
              <Menu className="text-neon-purple group-hover:scale-110 transition-transform" />
            </div>
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </header>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.4, type: "spring", damping: 25 }}
              className="fixed right-0 top-0 h-full w-80 max-w-[85vw] mobile-nav-backdrop z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neon-purple/20">
                  <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold logo-text">Ashirbad Mandhata</span>
                      <span className="text-xs text-neon-pink/80 -mt-1">Portfolio</span>
                    </div>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={closeMenu} className="hover:bg-neon-purple/10">
                    <X className="text-neon-pink" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-6">
                  <div className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <Link
                          href={item.href}
                          className="mobile-nav-item flex items-center gap-4 py-4 px-4 text-lg rounded-lg transition-all duration-300"
                          onClick={closeMenu}
                        >
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 flex items-center justify-center">
                            <item.icon className="w-4 h-4 text-neon-purple" />
                          </div>
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Admin Access */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8 pt-6 border-t border-neon-purple/20"
                  >
                    <Link
                      href="/admin"
                      className="mobile-nav-item flex items-center gap-4 py-4 px-4 text-lg rounded-lg transition-all duration-300"
                      onClick={closeMenu}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-yellow/20 to-neon-orange/20 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-neon-yellow" />
                      </div>
                      <span className="font-medium">Admin Panel</span>
                    </Link>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8"
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple text-white shadow-neumorphic"
                      onClick={handleHireMeClick}
                    >
                      Hire Me
                    </Button>
                  </motion.div>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-neon-purple/20">
                  <p className="text-sm text-muted-foreground text-center">© 2024 Ashirbad Mandhata Portfolio</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hire Me Modal */}
      {showHireMeModal && <HireMeModal isOpen={showHireMeModal} onClose={() => setShowHireMeModal(false)} />}
    </>
  )
}
