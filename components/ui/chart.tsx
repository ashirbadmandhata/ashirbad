"use client"

import type React from "react"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2"
import { useMemo } from "react"

// Register all the components we need
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

interface ChartProps {
  data: any
  options?: any
}

export const LineChart = ({ data, options }: ChartProps) => {
  const defaultOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
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
      plugins: {
        legend: {
          labels: {
            color: "rgba(255, 255, 255, 0.8)",
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "rgb(168, 85, 247)",
          bodyColor: "white",
          borderColor: "rgb(168, 85, 247)",
          borderWidth: 1,
          padding: 10,
        },
      },
    }),
    [],
  )

  const mergedOptions = useMemo(() => ({ ...defaultOptions, ...options }), [defaultOptions, options])

  return <Line data={data} options={mergedOptions} />
}

export const BarChart = ({ data, options }: ChartProps) => {
  const defaultOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
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
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "rgb(168, 85, 247)",
          bodyColor: "white",
          borderColor: "rgb(168, 85, 247)",
          borderWidth: 1,
          padding: 10,
        },
      },
    }),
    [],
  )

  const mergedOptions = useMemo(() => ({ ...defaultOptions, ...options }), [defaultOptions, options])

  return <Bar data={data} options={mergedOptions} />
}

export const PieChart = ({ data, options }: ChartProps) => {
  const defaultOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            color: "rgba(255, 255, 255, 0.8)",
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "rgb(168, 85, 247)",
          bodyColor: "white",
          borderColor: "rgb(168, 85, 247)",
          borderWidth: 1,
          padding: 10,
        },
      },
    }),
    [],
  )

  const mergedOptions = useMemo(() => ({ ...defaultOptions, ...options }), [defaultOptions, options])

  return <Pie data={data} options={mergedOptions} />
}

export const DoughnutChart = ({ data, options }: ChartProps) => {
  const defaultOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "60%",
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            color: "rgba(255, 255, 255, 0.8)",
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "rgb(168, 85, 247)",
          bodyColor: "white",
          borderColor: "rgb(168, 85, 247)",
          borderWidth: 1,
          padding: 10,
        },
      },
    }),
    [],
  )

  const mergedOptions = useMemo(() => ({ ...defaultOptions, ...options }), [defaultOptions, options])

  return <Doughnut data={data} options={mergedOptions} />
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full">{children}</div>
}

export const ChartTooltip = () => {
  return null
}

export const ChartTooltipContent = () => {
  return null
}

// Export the necessary components
export {
  Line,
  Bar,
  Pie,
  Doughnut,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  ArcElement,
}
