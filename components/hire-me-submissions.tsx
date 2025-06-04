"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Mail,
  Calendar,
  DollarSign,
  Clock,
  Briefcase,
  Search,
  Eye,
  Building,
  Target,
  Code,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

interface HireMeSubmission {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  projectTitle: string
  projectType: string
  projectDescription: string
  targetAudience?: string
  keyFeatures: string[]
  technologies: string[]
  integrations: string[]
  platforms: string[]
  budgetType: string
  budgetRange?: string
  customBudget?: string
  timeline: string
  deadline: string
  urgency: string
  additionalRequirements?: string
  communicationPreference: string
  referenceLinks?: string
  selectedService: string
  submittedAt: string
  status: "pending" | "reviewed" | "responded" | "rejected"
  estimatedValue?: string
}

interface HireMeSubmissionsProps {
  submissions: HireMeSubmission[]
}

export default function HireMeSubmissions({ submissions }: HireMeSubmissionsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [serviceFilter, setServiceFilter] = useState<string>("all")
  const [selectedSubmission, setSelectedSubmission] = useState<HireMeSubmission | null>(null)

  // Filter and search submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => {
      const matchesSearch =
        submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.company?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || submission.status === statusFilter
      const matchesService = serviceFilter === "all" || submission.selectedService === serviceFilter

      return matchesSearch && matchesStatus && matchesService
    })
  }, [submissions, searchTerm, statusFilter, serviceFilter])

  // Calculate statistics
  const stats = useMemo(() => {
    const total = submissions.length
    const pending = submissions.filter((s) => s.status === "pending").length
    const reviewed = submissions.filter((s) => s.status === "reviewed").length
    const responded = submissions.filter((s) => s.status === "responded").length
    const rejected = submissions.filter((s) => s.status === "rejected").length

    const totalValue = submissions.reduce((sum, submission) => {
      if (submission.budgetType === "custom") return sum
      const range = submission.budgetRange || "₹0 - ₹0"
      const maxValue = Number.parseInt(range.split(" - ")[1]?.replace(/[₹,]/g, "") || "0")
      return sum + maxValue
    }, 0)

    return { total, pending, reviewed, responded, rejected, totalValue }
  }, [submissions])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "reviewed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "responded":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-3 h-3" />
      case "reviewed":
        return <Eye className="w-3 h-3" />
      case "responded":
        return <CheckCircle className="w-3 h-3" />
      case "rejected":
        return <XCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "rush":
        return "text-red-400"
      case "urgent":
        return "text-orange-400"
      default:
        return "text-green-400"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const updateSubmissionStatus = (id: string, newStatus: HireMeSubmission["status"]) => {
    const updatedSubmissions = submissions.map((submission) =>
      submission.id === id ? { ...submission, status: newStatus } : submission,
    )
    localStorage.setItem("project-inquiries", JSON.stringify(updatedSubmissions))
    // Force re-render by updating the parent component
    window.location.reload()
  }

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="tech-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
                <p className="text-2xl font-bold text-neon-purple">{stats.total}</p>
              </div>
              <Mail className="w-8 h-8 text-neon-purple" />
            </div>
          </CardContent>
        </Card>

        <Card className="tech-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="tech-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reviewed</p>
                <p className="text-2xl font-bold text-blue-400">{stats.reviewed}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="tech-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Responded</p>
                <p className="text-2xl font-bold text-green-400">{stats.responded}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="tech-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Potential Value</p>
                <p className="text-2xl font-bold text-neon-green">₹{stats.totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-neon-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="tech-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name, email, project title, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 input-enhanced"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 input-enhanced">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-40 input-enhanced">
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="full-stack">Full-Stack</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="data-analytics">Data Analytics</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions List */}
      {filteredSubmissions.length > 0 ? (
        <div className="grid gap-6">
          {filteredSubmissions.map((submission, index) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="tech-card hover:border-neon-purple/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-neon-cyan">{submission.name}</h3>
                            <Badge className={`text-xs ${getStatusColor(submission.status)}`}>
                              {getStatusIcon(submission.status)}
                              <span className="ml-1 capitalize">{submission.status}</span>
                            </Badge>
                            <Badge className={`text-xs ${getUrgencyColor(submission.urgency)}`}>
                              <Clock className="w-3 h-3 mr-1" />
                              {submission.urgency}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {submission.email}
                            </div>
                            {submission.company && (
                              <div className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                {submission.company}
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(submission.submittedAt)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-neon-pink">{submission.projectTitle}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{submission.projectDescription}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Briefcase className="w-3 h-3 mr-1" />
                          {submission.selectedService.replace("-", " ")}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Target className="w-3 h-3 mr-1" />
                          {submission.projectType}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {submission.budgetType === "custom" ? "Custom Budget" : submission.budgetRange}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {submission.timeline}
                        </Badge>
                      </div>

                      {submission.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {submission.technologies.slice(0, 5).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              <Code className="w-3 h-3 mr-1" />
                              {tech}
                            </Badge>
                          ))}
                          {submission.technologies.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{submission.technologies.length - 5} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 lg:w-48">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full border-neon-purple/30 hover:bg-neon-purple/10 hover:border-neon-purple/60 hover:-translate-y-1 transition-all"
                            onClick={() => setSelectedSubmission(submission)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto cyberpunk-card">
                          <DialogHeader>
                            <DialogTitle className="gradient-text text-xl">
                              Project Inquiry Details - {submission.name}
                            </DialogTitle>
                            <DialogDescription>Submitted on {formatDate(submission.submittedAt)}</DialogDescription>
                          </DialogHeader>

                          {selectedSubmission && (
                            <div className="space-y-6 p-6">
                              {/* Contact Information */}
                              <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-neon-cyan">Contact Information</h3>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Name:</span>
                                    <p className="font-medium">{selectedSubmission.name}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Email:</span>
                                    <p className="font-medium">{selectedSubmission.email}</p>
                                  </div>
                                  {selectedSubmission.company && (
                                    <div>
                                      <span className="text-muted-foreground">Company:</span>
                                      <p className="font-medium">{selectedSubmission.company}</p>
                                    </div>
                                  )}
                                  {selectedSubmission.phone && (
                                    <div>
                                      <span className="text-muted-foreground">Phone:</span>
                                      <p className="font-medium">{selectedSubmission.phone}</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Project Details */}
                              <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-neon-cyan">Project Details</h3>
                                <div className="space-y-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Project Title:</span>
                                    <p className="font-medium">{selectedSubmission.projectTitle}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Project Type:</span>
                                    <p className="font-medium">{selectedSubmission.projectType}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Description:</span>
                                    <p className="font-medium">{selectedSubmission.projectDescription}</p>
                                  </div>
                                  {selectedSubmission.targetAudience && (
                                    <div>
                                      <span className="text-muted-foreground">Target Audience:</span>
                                      <p className="font-medium">{selectedSubmission.targetAudience}</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Technical Requirements */}
                              {(selectedSubmission.keyFeatures.length > 0 ||
                                selectedSubmission.technologies.length > 0) && (
                                <div className="space-y-4">
                                  <h3 className="text-lg font-semibold text-neon-cyan">Technical Requirements</h3>
                                  {selectedSubmission.keyFeatures.length > 0 && (
                                    <div>
                                      <span className="text-muted-foreground text-sm">Key Features:</span>
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedSubmission.keyFeatures.map((feature) => (
                                          <Badge key={feature} variant="secondary" className="text-xs">
                                            {feature}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {selectedSubmission.technologies.length > 0 && (
                                    <div>
                                      <span className="text-muted-foreground text-sm">Technologies:</span>
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedSubmission.technologies.map((tech) => (
                                          <Badge key={tech} variant="outline" className="text-xs">
                                            {tech}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Budget & Timeline */}
                              <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-neon-cyan">Budget & Timeline</h3>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Budget:</span>
                                    <p className="font-medium">
                                      {selectedSubmission.budgetType === "custom"
                                        ? selectedSubmission.customBudget
                                        : selectedSubmission.budgetRange}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Timeline:</span>
                                    <p className="font-medium">{selectedSubmission.timeline}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Deadline:</span>
                                    <p className="font-medium">{selectedSubmission.deadline}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Urgency:</span>
                                    <p className={`font-medium ${getUrgencyColor(selectedSubmission.urgency)}`}>
                                      {selectedSubmission.urgency}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Additional Information */}
                              {(selectedSubmission.additionalRequirements || selectedSubmission.referenceLinks) && (
                                <div className="space-y-4">
                                  <h3 className="text-lg font-semibold text-neon-cyan">Additional Information</h3>
                                  {selectedSubmission.additionalRequirements && (
                                    <div>
                                      <span className="text-muted-foreground text-sm">Additional Requirements:</span>
                                      <p className="font-medium text-sm mt-1">
                                        {selectedSubmission.additionalRequirements}
                                      </p>
                                    </div>
                                  )}
                                  {selectedSubmission.referenceLinks && (
                                    <div>
                                      <span className="text-muted-foreground text-sm">Reference Links:</span>
                                      <p className="font-medium text-sm mt-1">{selectedSubmission.referenceLinks}</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Select
                        value={submission.status}
                        onValueChange={(value) =>
                          updateSubmissionStatus(submission.id, value as HireMeSubmission["status"])
                        }
                      >
                        <SelectTrigger className="w-full input-enhanced">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="responded">Responded</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-neon-green/30 hover:bg-neon-green/10"
                        onClick={() => (window.location.href = `mailto:${submission.email}`)}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="tech-card">
          <CardContent className="p-12 text-center">
            <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No submissions found</h3>
            <p className="text-muted-foreground">
              {submissions.length === 0
                ? "No hire me form submissions yet. When clients submit the form, they'll appear here."
                : "No submissions match your current filters. Try adjusting your search criteria."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
