"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, TrendingUp, Award, ShoppingCart, Github, DollarSign, Users } from "lucide-react"
import { LineChart, BarChart, PieChart, DoughnutChart } from "@/components/ui/chart"

interface Project {
  id: string
  title: string
  views?: number
}

interface AnalyticsDashboardProps {
  projects: Project[]
}

// Generate enhanced analytics data
const generateAnalyticsData = () => {
  const today = new Date()
  const data = []

  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(today.getDate() - i)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      views: Math.floor(Math.random() * 50) + 10,
      githubViews: Math.floor(Math.random() * 30) + 5,
      purchases: Math.floor(Math.random() * 3),
    })
  }

  return data
}

export default function AnalyticsDashboard({ projects }: AnalyticsDashboardProps) {
  const [analyticsData, setAnalyticsData] = useState<any[]>([])
  const [totalViews, setTotalViews] = useState(0)
  const [totalGithubViews, setTotalGithubViews] = useState(0)
  const [totalPurchases, setTotalPurchases] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [viewsToday, setViewsToday] = useState(0)
  const [viewsGrowth, setViewsGrowth] = useState(0)

  // Memoize the analytics data generation to prevent infinite re-renders
  const memoizedAnalyticsData = useMemo(() => {
    const savedAnalytics = localStorage.getItem("portfolio-analytics-enhanced")
    if (savedAnalytics) {
      return JSON.parse(savedAnalytics)
    } else {
      const data = generateAnalyticsData()
      localStorage.setItem("portfolio-analytics-enhanced", JSON.stringify(data))
      return data
    }
  }, []) // Empty dependency array since we only want this to run once

  useEffect(() => {
    setAnalyticsData(memoizedAnalyticsData)

    // Calculate metrics
    const projectViews = projects.reduce((sum, project) => sum + (project.views || 0), 0)
    const githubViews = memoizedAnalyticsData.reduce((sum: number, item: any) => sum + item.githubViews, 0)
    const purchases = memoizedAnalyticsData.reduce((sum: number, item: any) => sum + item.purchases, 0)

    setTotalViews(projectViews)
    setTotalGithubViews(githubViews)
    setTotalPurchases(purchases)
    setTotalRevenue(purchases * 8999) // Average price

    const today = memoizedAnalyticsData[memoizedAnalyticsData.length - 1]?.views || 0
    setViewsToday(today)

    const yesterday = memoizedAnalyticsData[memoizedAnalyticsData.length - 2]?.views || 1
    const growth = ((today - yesterday) / yesterday) * 100
    setViewsGrowth(growth)
  }, [projects, memoizedAnalyticsData])

  // Get top projects by views - memoized to prevent recalculation
  const topProjects = useMemo(() => {
    return [...projects].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)
  }, [projects])

  // Chart configurations - memoized to prevent recreation
  const lineChartData = useMemo(
    () => ({
      labels: analyticsData.map((item) => item.date),
      datasets: [
        {
          label: "Portfolio Views",
          data: analyticsData.map((item) => item.views),
          borderColor: "rgb(168, 85, 247)",
          backgroundColor: "rgba(168, 85, 247, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "GitHub Views",
          data: analyticsData.map((item) => item.githubViews),
          borderColor: "rgb(56, 189, 248)",
          backgroundColor: "rgba(56, 189, 248, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    }),
    [analyticsData],
  )

  const barChartData = useMemo(
    () => ({
      labels: topProjects.map((project) =>
        project.title.length > 15 ? project.title.substring(0, 15) + "..." : project.title,
      ),
      datasets: [
        {
          label: "Project Views",
          data: topProjects.map((project) => project.views || 0),
          backgroundColor: [
            "rgba(168, 85, 247, 0.8)",
            "rgba(236, 72, 153, 0.8)",
            "rgba(56, 189, 248, 0.8)",
            "rgba(34, 197, 94, 0.8)",
            "rgba(251, 191, 36, 0.8)",
          ],
          borderColor: [
            "rgb(168, 85, 247)",
            "rgb(236, 72, 153)",
            "rgb(56, 189, 248)",
            "rgb(34, 197, 94)",
            "rgb(251, 191, 36)",
          ],
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    }),
    [topProjects],
  )

  const pieChartData = useMemo(
    () => ({
      labels: ["Portfolio Views", "GitHub Views", "Direct Traffic"],
      datasets: [
        {
          data: [totalViews, totalGithubViews, Math.floor(totalViews * 0.3)],
          backgroundColor: ["rgba(168, 85, 247, 0.8)", "rgba(56, 189, 248, 0.8)", "rgba(34, 197, 94, 0.8)"],
          borderColor: ["rgb(168, 85, 247)", "rgb(56, 189, 248)", "rgb(34, 197, 94)"],
          borderWidth: 2,
        },
      ],
    }),
    [totalViews, totalGithubViews],
  )

  const doughnutChartData = useMemo(
    () => ({
      labels: ["Basic Package", "Pro Package", "Enterprise Package"],
      datasets: [
        {
          data: [Math.floor(totalPurchases * 0.3), Math.floor(totalPurchases * 0.5), Math.floor(totalPurchases * 0.2)],
          backgroundColor: ["rgba(56, 189, 248, 0.8)", "rgba(168, 85, 247, 0.8)", "rgba(236, 72, 153, 0.8)"],
          borderColor: ["rgb(56, 189, 248)", "rgb(168, 85, 247)", "rgb(236, 72, 153)"],
          borderWidth: 2,
        },
      ],
    }),
    [totalPurchases],
  )

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "rgba(255, 255, 255, 0.8)",
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          titleColor: "rgb(168, 85, 247)",
          bodyColor: "white",
          borderColor: "rgb(168, 85, 247)",
          borderWidth: 1,
          padding: 12,
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "rgba(255, 255, 255, 0.7)",
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "rgba(255, 255, 255, 0.7)",
          },
        },
      },
    }),
    [],
  )

  return (
    <div className="space-y-8">
      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="tech-card group hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-neon-purple" />
                Total Portfolio Views
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold gradient-text">{totalViews.toLocaleString()}</div>
                <div className="text-sm text-neon-green">+{viewsGrowth.toFixed(1)}%</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="tech-card group hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Github className="h-4 w-4 text-neon-cyan" />
                GitHub Profile Views
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-neon-cyan">{totalGithubViews.toLocaleString()}</div>
                <div className="text-sm text-neon-green">+12.5%</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="tech-card group hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-neon-green" />
                Total Purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-neon-green">{totalPurchases}</div>
                <div className="text-sm text-neon-green">+8.3%</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="tech-card group hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-neon-yellow" />
                Total Revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-neon-yellow">₹{totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-neon-green">+15.2%</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Over Time */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="tech-card">
            <CardHeader>
              <CardTitle className="gradient-text flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Views Over Time
              </CardTitle>
              <CardDescription>Portfolio and GitHub views for the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <LineChart data={lineChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Popularity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="tech-card">
            <CardHeader>
              <CardTitle className="gradient-text flex items-center gap-2">
                <Award className="h-5 w-5" />
                Project Popularity
              </CardTitle>
              <CardDescription>Most viewed projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BarChart data={barChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="tech-card">
            <CardHeader>
              <CardTitle className="gradient-text flex items-center gap-2">
                <Users className="h-5 w-5" />
                Traffic Sources
              </CardTitle>
              <CardDescription>Where your visitors come from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <PieChart data={pieChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="tech-card">
            <CardHeader>
              <CardTitle className="gradient-text flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Revenue by Package
              </CardTitle>
              <CardDescription>Sales distribution across packages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <DoughnutChart data={doughnutChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Performance Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <Card className="tech-card">
          <CardHeader>
            <CardTitle className="gradient-text">Performance Overview</CardTitle>
            <CardDescription>Detailed breakdown of your portfolio metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neon-purple/20">
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground">Metric</th>
                    <th className="text-right py-4 px-4 font-medium text-muted-foreground">Current</th>
                    <th className="text-right py-4 px-4 font-medium text-muted-foreground">Previous</th>
                    <th className="text-right py-4 px-4 font-medium text-muted-foreground">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      metric: "Portfolio Views",
                      current: totalViews,
                      previous: Math.floor(totalViews * 0.9),
                      change: "+11.1%",
                      positive: true,
                    },
                    {
                      metric: "GitHub Views",
                      current: totalGithubViews,
                      previous: Math.floor(totalGithubViews * 0.88),
                      change: "+13.6%",
                      positive: true,
                    },
                    {
                      metric: "Project Downloads",
                      current: totalPurchases,
                      previous: Math.floor(totalPurchases * 0.92),
                      change: "+8.7%",
                      positive: true,
                    },
                    {
                      metric: "Revenue (₹)",
                      current: totalRevenue,
                      previous: Math.floor(totalRevenue * 0.85),
                      change: "+17.6%",
                      positive: true,
                    },
                  ].map((row, index) => (
                    <tr key={row.metric} className="border-b border-accent/20 hover:bg-neon-purple/5 transition-colors">
                      <td className="py-4 px-4 font-medium">{row.metric}</td>
                      <td className="py-4 px-4 text-right text-neon-cyan font-bold">
                        {row.metric.includes("Revenue")
                          ? `₹${row.current.toLocaleString()}`
                          : row.current.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right text-muted-foreground">
                        {row.metric.includes("Revenue")
                          ? `₹${row.previous.toLocaleString()}`
                          : row.previous.toLocaleString()}
                      </td>
                      <td
                        className={`py-4 px-4 text-right font-medium ${row.positive ? "text-neon-green" : "text-red-400"}`}
                      >
                        {row.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
