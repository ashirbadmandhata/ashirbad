"use client"

import type React from "react"
import { ArrowRight } from "lucide-react" // Import ArrowRight here

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Check,
  Star,
  Zap,
  Users,
  Code,
  Rocket,
  Send,
  Calendar,
  Briefcase,
  DollarSign,
  FileText,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface HireMeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HireMeModal({ isOpen, onClose }: HireMeModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string>("full-stack")
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    company: "",
    phone: "",

    // Project Details
    projectTitle: "",
    projectType: "",
    projectDescription: "",
    targetAudience: "",
    keyFeatures: [] as string[],

    // Technical Requirements
    technologies: [] as string[],
    integrations: [] as string[],
    platforms: [] as string[],

    // Budget & Timeline
    budgetType: "fixed", // fixed or custom
    budgetRange: "",
    customBudget: "",
    timeline: "",
    deadline: "",
    urgency: "normal",

    // Additional Information
    additionalRequirements: "",
    communicationPreference: "email",
    referenceLinks: "",
    attachments: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const services = [
    {
      id: "full-stack",
      name: "Full-Stack Development",
      price: "₹2,50,000 - ₹8,00,000",
      duration: "4-12 weeks",
      description: "Complete web application with frontend and backend",
      features: [
        "React/Next.js Frontend",
        "Node.js/Python Backend",
        "Database Design",
        "API Development",
        "Deployment & Hosting",
      ],
      icon: <Code className="h-6 w-6" />,
      popular: true,
    },
    {
      id: "frontend",
      name: "Frontend Development",
      price: "₹1,50,000 - ₹4,00,000",
      duration: "2-6 weeks",
      description: "Modern, responsive user interfaces",
      features: ["React/Next.js", "Responsive Design", "Performance Optimization", "SEO Ready", "Modern UI/UX"],
      icon: <Zap className="h-6 w-6" />,
      popular: false,
    },
    {
      id: "backend",
      name: "Backend Development",
      price: "₹2,00,000 - ₹5,00,000",
      duration: "3-8 weeks",
      description: "Robust server-side solutions",
      features: ["API Development", "Database Design", "Authentication", "Payment Integration", "Cloud Deployment"],
      icon: <Rocket className="h-6 w-6" />,
      popular: false,
    },
    {
      id: "data-analytics",
      name: "Data Analytics & BI",
      price: "₹3,00,000 - ₹10,00,000",
      duration: "4-16 weeks",
      description: "Data visualization and business intelligence",
      features: ["Power BI Dashboards", "Python Data Analysis", "Tableau Reports", "Data Pipeline", "ML Models"],
      icon: <Users className="h-6 w-6" />,
      popular: false,
    },
    {
      id: "consultation",
      name: "Technical Consultation",
      price: "₹5,000 - ₹15,000/hour",
      duration: "Flexible",
      description: "Expert advice and code review",
      features: ["Architecture Review", "Code Audit", "Performance Analysis", "Best Practices", "Technology Stack"],
      icon: <Star className="h-6 w-6" />,
      popular: false,
    },
  ]

  const projectTypes = [
    "E-commerce Website",
    "Business Website",
    "Web Application",
    "Mobile App",
    "Data Dashboard",
    "API Development",
    "Database Design",
    "System Integration",
    "Performance Optimization",
    "Custom Software",
    "Portfolio Website",
    "Blog/CMS",
    "Learning Management System",
    "Booking System",
    "Social Media Platform",
    "Other",
  ]

  const budgetRanges = [
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹2,50,000",
    "₹2,50,000 - ₹5,00,000",
    "₹5,00,000 - ₹10,00,000",
    "₹10,00,000 - ₹25,00,000",
    "₹25,00,000 - ₹50,00,000",
    "₹50,00,000+",
  ]

  const timelineOptions = [
    "ASAP (Rush job - +50% fee)",
    "1-2 weeks",
    "3-4 weeks",
    "1-2 months",
    "3-6 months",
    "6+ months",
    "Flexible timeline",
  ]

  const keyFeatures = [
    "User Authentication",
    "Payment Gateway",
    "Admin Dashboard",
    "Mobile Responsive",
    "SEO Optimization",
    "Analytics Integration",
    "Email Integration",
    "Social Media Integration",
    "Multi-language Support",
    "Third-party API Integration",
    "Real-time Chat",
    "Push Notifications",
    "File Upload/Download",
    "Search Functionality",
    "User Profiles",
    "Content Management",
  ]

  const technologies = [
    "React.js",
    "Next.js",
    "Vue.js",
    "Angular",
    "Node.js",
    "Python",
    "PHP",
    "Java",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Firebase",
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
  ]

  const integrations = [
    "Stripe Payment",
    "PayPal",
    "Razorpay",
    "Google Analytics",
    "Facebook Pixel",
    "Mailchimp",
    "SendGrid",
    "Twilio SMS",
    "Google Maps",
    "Social Media APIs",
    "CRM Integration",
    "ERP Integration",
  ]

  const platforms = [
    "Web Application",
    "Mobile App (iOS)",
    "Mobile App (Android)",
    "Desktop Application",
    "Progressive Web App",
    "Chrome Extension",
    "API/Backend Only",
  ]

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleArrayToggle = (field: string, item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).includes(item)
        ? (prev[field as keyof typeof prev] as string[]).filter((f) => f !== item)
        : [...(prev[field as keyof typeof prev] as string[]), item],
    }))
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
        break
      case 2:
        if (!formData.projectTitle.trim()) newErrors.projectTitle = "Project title is required"
        if (!formData.projectType) newErrors.projectType = "Project type is required"
        if (!formData.projectDescription.trim()) newErrors.projectDescription = "Project description is required"
        break
      case 3:
        if (formData.budgetType === "fixed" && !formData.budgetRange) newErrors.budgetRange = "Budget range is required"
        if (formData.budgetType === "custom" && !formData.customBudget.trim())
          newErrors.customBudget = "Custom budget is required"
        if (!formData.timeline) newErrors.timeline = "Timeline is required"
        if (!formData.deadline) newErrors.deadline = "Deadline is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(currentStep)) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Save inquiry to localStorage for demo
      const inquiries = JSON.parse(localStorage.getItem("project-inquiries") || "[]")
      const newInquiry = {
        id: Date.now().toString(),
        ...formData,
        selectedService,
        submittedAt: new Date().toISOString(),
        status: "pending",
        estimatedValue: formData.budgetType === "custom" ? formData.customBudget : formData.budgetRange,
      }
      inquiries.push(newInquiry)
      localStorage.setItem("project-inquiries", JSON.stringify(inquiries))

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        onClose()
        setCurrentStep(1)
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          projectTitle: "",
          projectType: "",
          projectDescription: "",
          targetAudience: "",
          keyFeatures: [],
          technologies: [],
          integrations: [],
          platforms: [],
          budgetType: "fixed",
          budgetRange: "",
          customBudget: "",
          timeline: "",
          deadline: "",
          urgency: "normal",
          additionalRequirements: "",
          communicationPreference: "email",
          referenceLinks: "",
          attachments: "",
        })
        setSelectedService("full-stack")
        setErrors({})
      }, 4000)
    }, 2000)
  }

  const steps = [
    { number: 1, title: "Personal Info", icon: <Users className="w-4 h-4" /> },
    { number: 2, title: "Project Details", icon: <FileText className="w-4 h-4" /> },
    { number: 3, title: "Budget & Timeline", icon: <DollarSign className="w-4 h-4" /> },
    { number: 4, title: "Review & Submit", icon: <Target className="w-4 h-4" /> },
  ]

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl cyberpunk-card shadow-neumorphic"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan p-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 text-white/80 hover:text-white hover:bg-white/20 rounded-full"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>

              <div className="text-center text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <Briefcase className="w-8 h-8" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Project Inquiry Form</h2>
                <p className="text-white/80">Let's discuss your project requirements in detail</p>
              </div>

              {/* Progress Steps */}
              <div className="flex justify-center mt-6">
                <div className="flex items-center space-x-4">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          currentStep >= step.number ? "bg-white text-neon-purple" : "bg-white/20 text-white/60"
                        }`}
                      >
                        {currentStep > step.number ? <Check className="w-4 h-4" /> : step.number}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-8 h-0.5 mx-2 transition-all ${
                            currentStep > step.number ? "bg-white" : "bg-white/20"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-green to-neon-cyan flex items-center justify-center shadow-neumorphic"
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold gradient-text">Project Inquiry Submitted!</h3>
                    <p className="text-muted-foreground max-w-md">
                      Thank you for your detailed project information! I'll review everything and get back to you within
                      24 hours with a comprehensive proposal and timeline.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="text-neon-cyan">Reference ID: #{Date.now().toString().slice(-6)}</div>
                    <div className="text-muted-foreground">Expected response time: 24 hours</div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold gradient-text mb-2">Personal Information</h3>
                        <p className="text-muted-foreground">Tell us about yourself and your company</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="John Doe"
                            className={`input-enhanced ${errors.name ? "border-red-500" : ""}`}
                            required
                          />
                          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="john@company.com"
                            className={`input-enhanced ${errors.email ? "border-red-500" : ""}`}
                            required
                          />
                          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company/Organization</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            placeholder="Your Company Name"
                            className="input-enhanced"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+91 98765 43210"
                            className="input-enhanced"
                          />
                        </div>
                      </div>

                      {/* Service Selection */}
                      <div className="space-y-4">
                        <Label>Select Service Type</Label>
                        <RadioGroup value={selectedService} onValueChange={setSelectedService}>
                          <div className="grid md:grid-cols-2 gap-4">
                            {services.map((service) => (
                              <div key={service.id} className="relative">
                                {service.popular && (
                                  <div className="absolute -top-2 -right-2 bg-neon-yellow text-background text-xs font-bold px-2 py-1 rounded-full z-10">
                                    Popular
                                  </div>
                                )}
                                <Label
                                  htmlFor={service.id}
                                  className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    selectedService === service.id
                                      ? "border-neon-purple bg-neon-purple/10"
                                      : "border-surface-3 bg-surface-2 hover:border-neon-purple/50"
                                  }`}
                                >
                                  <div className="flex items-center gap-3 mb-2">
                                    <RadioGroupItem value={service.id} id={service.id} />
                                    <div className="text-neon-purple">{service.icon}</div>
                                    <div>
                                      <h4 className="font-bold text-sm">{service.name}</h4>
                                      <p className="text-xs text-neon-cyan">{service.price}</p>
                                    </div>
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Project Details */}
                  {currentStep === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold gradient-text mb-2">Project Details</h3>
                        <p className="text-muted-foreground">Describe your project requirements</p>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="projectTitle">Project Title *</Label>
                          <Input
                            id="projectTitle"
                            value={formData.projectTitle}
                            onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                            placeholder="My Awesome Project"
                            className={`input-enhanced ${errors.projectTitle ? "border-red-500" : ""}`}
                            required
                          />
                          {errors.projectTitle && <p className="text-red-400 text-sm">{errors.projectTitle}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="projectType">Project Type *</Label>
                          <Select
                            value={formData.projectType}
                            onValueChange={(value) => handleInputChange("projectType", value)}
                          >
                            <SelectTrigger className={`input-enhanced ${errors.projectType ? "border-red-500" : ""}`}>
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                              {projectTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.projectType && <p className="text-red-400 text-sm">{errors.projectType}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="projectDescription">Project Description *</Label>
                          <Textarea
                            id="projectDescription"
                            value={formData.projectDescription}
                            onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                            placeholder="Describe your project goals, target audience, and key requirements..."
                            rows={4}
                            className={`input-enhanced resize-none ${errors.projectDescription ? "border-red-500" : ""}`}
                            required
                          />
                          {errors.projectDescription && (
                            <p className="text-red-400 text-sm">{errors.projectDescription}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="targetAudience">Target Audience</Label>
                          <Input
                            id="targetAudience"
                            value={formData.targetAudience}
                            onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                            placeholder="Who will use this application?"
                            className="input-enhanced"
                          />
                        </div>

                        {/* Key Features */}
                        <div className="space-y-4">
                          <Label>Key Features (Select all that apply)</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {keyFeatures.map((feature) => (
                              <div key={feature} className="flex items-center space-x-2">
                                <Checkbox
                                  id={feature}
                                  checked={formData.keyFeatures.includes(feature)}
                                  onCheckedChange={() => handleArrayToggle("keyFeatures", feature)}
                                />
                                <Label htmlFor={feature} className="text-sm cursor-pointer">
                                  {feature}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div className="space-y-4">
                          <Label>Preferred Technologies (Optional)</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {technologies.map((tech) => (
                              <div key={tech} className="flex items-center space-x-2">
                                <Checkbox
                                  id={tech}
                                  checked={formData.technologies.includes(tech)}
                                  onCheckedChange={() => handleArrayToggle("technologies", tech)}
                                />
                                <Label htmlFor={tech} className="text-sm cursor-pointer">
                                  {tech}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Budget & Timeline */}
                  {currentStep === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold gradient-text mb-2">Budget & Timeline</h3>
                        <p className="text-muted-foreground">Let's discuss your budget and project timeline</p>
                      </div>

                      {/* Budget Type */}
                      <div className="space-y-4">
                        <Label>Budget Type</Label>
                        <RadioGroup
                          value={formData.budgetType}
                          onValueChange={(value) => handleInputChange("budgetType", value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fixed" id="fixed" />
                            <Label htmlFor="fixed">Fixed Budget Range</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="custom" />
                            <Label htmlFor="custom">Custom Budget (Let's discuss)</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Budget Range or Custom Budget */}
                      {formData.budgetType === "fixed" ? (
                        <div className="space-y-2">
                          <Label htmlFor="budgetRange">Budget Range *</Label>
                          <Select
                            value={formData.budgetRange}
                            onValueChange={(value) => handleInputChange("budgetRange", value)}
                          >
                            <SelectTrigger className={`input-enhanced ${errors.budgetRange ? "border-red-500" : ""}`}>
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.budgetRange && <p className="text-red-400 text-sm">{errors.budgetRange}</p>}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor="customBudget">Custom Budget Details *</Label>
                          <Textarea
                            id="customBudget"
                            value={formData.customBudget}
                            onChange={(e) => handleInputChange("customBudget", e.target.value)}
                            placeholder="Describe your budget constraints, payment terms, or any specific requirements..."
                            rows={3}
                            className={`input-enhanced resize-none ${errors.customBudget ? "border-red-500" : ""}`}
                            required
                          />
                          {errors.customBudget && <p className="text-red-400 text-sm">{errors.customBudget}</p>}
                        </div>
                      )}

                      {/* Timeline */}
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Project Timeline *</Label>
                        <Select
                          value={formData.timeline}
                          onValueChange={(value) => handleInputChange("timeline", value)}
                        >
                          <SelectTrigger className={`input-enhanced ${errors.timeline ? "border-red-500" : ""}`}>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            {timelineOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.timeline && <p className="text-red-400 text-sm">{errors.timeline}</p>}
                      </div>

                      {/* Deadline */}
                      <div className="space-y-2">
                        <Label htmlFor="deadline">Project Deadline *</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={formData.deadline}
                          onChange={(e) => handleInputChange("deadline", e.target.value)}
                          className={`input-enhanced ${errors.deadline ? "border-red-500" : ""}`}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                        {errors.deadline && <p className="text-red-400 text-sm">{errors.deadline}</p>}
                        <p className="text-xs text-muted-foreground">When do you need the project completed?</p>
                      </div>

                      {/* Urgency */}
                      <div className="space-y-4">
                        <Label>Project Urgency</Label>
                        <RadioGroup
                          value={formData.urgency}
                          onValueChange={(value) => handleInputChange("urgency", value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="normal" id="normal" />
                            <Label htmlFor="normal">Normal Priority</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="urgent" id="urgent" />
                            <Label htmlFor="urgent">Urgent (+20% fee)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="rush" id="rush" />
                            <Label htmlFor="rush">Rush Job (+50% fee)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Review & Submit */}
                  {currentStep === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold gradient-text mb-2">Review & Submit</h3>
                        <p className="text-muted-foreground">Review your project details and submit your inquiry</p>
                      </div>

                      {/* Project Summary */}
                      <div className="space-y-6">
                        <div className="bg-surface-2 rounded-xl p-6 space-y-4">
                          <h4 className="font-bold text-neon-cyan">Project Summary</h4>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Project Title:</span>
                              <p className="font-medium">{formData.projectTitle}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Project Type:</span>
                              <p className="font-medium">{formData.projectType}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Budget:</span>
                              <p className="font-medium">
                                {formData.budgetType === "fixed" ? formData.budgetRange : "Custom Budget"}
                              </p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Timeline:</span>
                              <p className="font-medium">{formData.timeline}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Deadline:</span>
                              <p className="font-medium">{formData.deadline}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Service:</span>
                              <p className="font-medium">{services.find((s) => s.id === selectedService)?.name}</p>
                            </div>
                          </div>
                        </div>

                        {/* Additional Requirements */}
                        <div className="space-y-2">
                          <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                          <Textarea
                            id="additionalRequirements"
                            value={formData.additionalRequirements}
                            onChange={(e) => handleInputChange("additionalRequirements", e.target.value)}
                            placeholder="Any additional requirements, special requests, or questions..."
                            rows={3}
                            className="input-enhanced resize-none"
                          />
                        </div>

                        {/* Communication Preference */}
                        <div className="space-y-4">
                          <Label>Preferred Communication Method</Label>
                          <RadioGroup
                            value={formData.communicationPreference}
                            onValueChange={(value) => handleInputChange("communicationPreference", value)}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="email" id="email" />
                              <Label htmlFor="email">Email</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="phone" id="phone" />
                              <Label htmlFor="phone">Phone Call</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="video" id="video" />
                              <Label htmlFor="video">Video Call</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Reference Links */}
                        <div className="space-y-2">
                          <Label htmlFor="referenceLinks">Reference Links (Optional)</Label>
                          <Textarea
                            id="referenceLinks"
                            value={formData.referenceLinks}
                            onChange={(e) => handleInputChange("referenceLinks", e.target.value)}
                            placeholder="Share any reference websites, designs, or inspiration links..."
                            rows={2}
                            className="input-enhanced resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-surface-3">
                    <div className="flex gap-4 flex-1">
                      {currentStep > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handlePrevious}
                          className="flex-1 sm:flex-none hover:border-neon-purple/50 hover:bg-neon-purple/5"
                          disabled={isSubmitting}
                        >
                          Previous
                        </Button>
                      )}

                      {currentStep < 4 ? (
                        <Button
                          type="button"
                          onClick={handleNext}
                          className="flex-1 bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple shadow-lg hover:shadow-xl hover:-translate-y-1"
                          disabled={isSubmitting}
                        >
                          Next Step
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple shadow-lg hover:shadow-xl hover:-translate-y-1"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Submit Project Inquiry
                            </>
                          )}
                        </Button>
                      )}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="border-neon-cyan/30 hover:border-neon-cyan/60 hover:bg-neon-cyan/5"
                      disabled={isSubmitting}
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule Call Instead
                    </Button>
                  </div>

                  {currentStep === 4 && (
                    <div className="text-center text-sm text-muted-foreground">
                      <p>I'll review your project details and respond within 24 hours with a detailed proposal</p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
