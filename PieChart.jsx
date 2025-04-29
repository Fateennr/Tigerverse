"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export default function PieChart({ stats }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!stats) return

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Create the chart
    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Won", "Lost", "Tied"],
        datasets: [
          {
            data: [stats.won, stats.lost, stats.tied],
            backgroundColor: ["rgba(75, 192, 192, 0.8)", "rgba(255, 99, 132, 0.8)", "rgba(255, 206, 86, 0.8)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "white",
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw || 0
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = Math.round((value / total) * 100)
                return `${label}: ${value} (${percentage}%)`
              },
            },
          },
        },
      },
    })

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [stats])

  return <canvas ref={chartRef} />
}
