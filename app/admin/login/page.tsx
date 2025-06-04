"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Lock, LogIn, AlertCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Check if already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin-authenticated") === "true"
    if (isAuthenticated) {
      router.push("/admin")
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Get stored password or use default
    const storedPassword = localStorage.getItem("admin-password") || "admin123"

    // Simulate API call
    setTimeout(() => {
      if (password === storedPassword) {
        localStorage.setItem("admin-authenticated", "true")
        router.push("/admin")
      } else {
        setError("Invalid password. Please try again.")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-neon -z-10" />
        <div
          className="absolute bottom-20 left-10 w-80 h-80 bg-neon-pink/20 rounded-full blur-3xl animate-pulse-neon-pink -z-10"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-cyberpunk-grid bg-cyberpunk-grid opacity-30"></div>
              <Sparkles className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/0 to-neon-pink/30"></div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold logo-text glitch" data-text="DevMatrix">
                DevMatrix
              </span>
              <span className="text-xs text-neon-pink/80 -mt-1">Admin Portal</span>
            </div>
          </Link>
        </div>

        <Card className="cyberpunk-card border-neon-purple/30">
          <CardHeader className="space-y-1">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-center gradient-text">Admin Access</CardTitle>
            <CardDescription className="text-center">Enter your password to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-md flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    className="border-neon-purple/30 focus:border-neon-purple"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gap-2 bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      Login
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t border-neon-purple/20 pt-4">
            <p className="text-xs text-center text-muted-foreground w-full">
              Hint: For demo purposes, the default password is "admin123"
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
