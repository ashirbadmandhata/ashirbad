"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Save, ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle, Shield, Key, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

export default function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const authStatus = localStorage.getItem("admin-authenticated") === "true"
    setIsAuthenticated(authStatus)

    if (!authStatus) {
      router.push("/admin/login")
    }
  }, [router])

  const validateForm = () => {
    setError("")
    setSuccess("")

    // Check if current password is correct
    const storedPassword = localStorage.getItem("admin-password") || "admin123"
    if (currentPassword !== storedPassword) {
      setError("Current password is incorrect")
      return false
    }

    // Check if new password is provided
    if (!newPassword) {
      setError("New password is required")
      return false
    }

    // Check if new password is at least 6 characters
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters")
      return false
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return false
    }

    // Check if new password is different from current
    if (newPassword === currentPassword) {
      setError("New password must be different from current password")
      return false
    }

    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        // Store new password
        localStorage.setItem("admin-password", newPassword)

        // Reset form
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setSuccess("Password changed successfully! Please use your new password for future logins.")
        setIsLoading(false)
      }, 1500)
    }
  }

  const handleResetPassword = () => {
    setIsLoading(true)

    // Reset to default password
    setTimeout(() => {
      localStorage.setItem("admin-password", "admin123")
      setSuccess("Password has been reset to default: admin123")
      setShowResetDialog(false)
      setIsLoading(false)

      // Clear form
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }, 1000)
  }

  const generateStrongPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewPassword(password)
    setConfirmPassword(password)
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container py-10 md:py-20 admin-content">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-neon-pink transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center shadow-neumorphic">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Security Settings</h1>
            <p className="text-muted-foreground">Manage your admin account security</p>
          </div>

          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-surface-2 border border-neon-purple/20">
              <TabsTrigger
                value="password"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple/20 data-[state=active]:to-neon-pink/20 data-[state=active]:text-neon-pink"
              >
                <Key className="w-4 h-4 mr-2" />
                Change Password
              </TabsTrigger>
              <TabsTrigger
                value="reset"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple/20 data-[state=active]:to-neon-pink/20 data-[state=active]:text-neon-pink"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Options
              </TabsTrigger>
            </TabsList>

            <TabsContent value="password">
              <Card className="cyberpunk-card">
                <CardHeader>
                  <CardTitle className="gradient-text">Change Password</CardTitle>
                  <CardDescription>Update your admin password for enhanced security</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>{success}</span>
                      </motion.div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
                          required
                          className="input-enhanced pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={generateStrongPassword}
                          className="text-xs text-neon-cyan hover:text-neon-pink"
                        >
                          Generate Strong Password
                        </Button>
                      </div>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          required
                          className="input-enhanced pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div
                          className={`w-2 h-2 rounded-full ${newPassword.length >= 6 ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <span>At least 6 characters</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          required
                          className="input-enhanced pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {confirmPassword && (
                        <div className="flex items-center gap-2 text-xs">
                          <div
                            className={`w-2 h-2 rounded-full ${newPassword === confirmPassword ? "bg-green-500" : "bg-red-500"}`}
                          />
                          <span className={newPassword === confirmPassword ? "text-green-400" : "text-red-400"}>
                            {newPassword === confirmPassword ? "Passwords match" : "Passwords do not match"}
                          </span>
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-primary shadow-neumorphic hover:shadow-neumorphic-hover"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                          Updating Password...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Update Password
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="border-t border-neon-purple/20 pt-4">
                  <p className="text-xs text-center text-muted-foreground w-full">
                    For security reasons, you'll need to use your new password the next time you log in
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="reset">
              <Card className="cyberpunk-card">
                <CardHeader>
                  <CardTitle className="gradient-text">Reset Options</CardTitle>
                  <CardDescription>Emergency password reset and recovery options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-yellow-400 mb-1">Password Reset</h3>
                          <p className="text-sm text-muted-foreground">
                            Reset your password to the default value. Use this option if you've forgotten your current
                            password.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full border-yellow-500/30 hover:bg-yellow-500/10 hover:text-yellow-400"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Reset Password to Default
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="cyberpunk-card">
                        <DialogHeader>
                          <DialogTitle className="gradient-text">Confirm Password Reset</DialogTitle>
                          <DialogDescription>
                            This will reset your password to the default value "admin123". You can change it again after
                            logging in.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                            <div className="flex items-center gap-2 text-red-400">
                              <AlertCircle className="w-4 h-4" />
                              <span className="font-medium">Warning</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              This action cannot be undone. Your current password will be permanently replaced.
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setShowResetDialog(false)}
                            className="border-neon-purple/30"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleResetPassword}
                            disabled={isLoading}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            {isLoading ? (
                              <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                                Resetting...
                              </>
                            ) : (
                              <>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Reset Password
                              </>
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-neon-cyan">Security Tips</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green mt-2" />
                        <span>Use a strong password with at least 8 characters</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green mt-2" />
                        <span>Include uppercase, lowercase, numbers, and special characters</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green mt-2" />
                        <span>Avoid using personal information in passwords</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green mt-2" />
                        <span>Change your password regularly for better security</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  )
}
