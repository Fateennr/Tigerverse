"use client"
import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function OverallStats({ battingStats, bowlingStats, fieldingStats, player }) {
  const [activeChart, setActiveChart] = useState("performance")

  // Calculate overall stats
  const totalRuns = battingStats.reduce((sum, stat) => sum + stat.Runs, 0)
  const totalWickets = bowlingStats.reduce((sum, stat) => sum + stat.Wickets, 0)
  const totalCatches = fieldingStats.reduce((sum, stat) => sum + stat.Catches, 0)
  const totalStumpings = fieldingStats.reduce((sum, stat) => sum + stat.Stumpings, 0)

  // Format data for charts
  const formatPerformanceData = () => {
    const testRuns = battingStats.filter((stat) => stat.MatchType === "Test").reduce((sum, stat) => sum + stat.Runs, 0)
    const odiRuns = battingStats.filter((stat) => stat.MatchType === "ODI").reduce((sum, stat) => sum + stat.Runs, 0)
    const t20Runs = battingStats.filter((stat) => stat.MatchType === "T20").reduce((sum, stat) => sum + stat.Runs, 0)

    const testWickets = bowlingStats
      .filter((stat) => stat.MatchType === "Test")
      .reduce((sum, stat) => sum + stat.Wickets, 0)
    const odiWickets = bowlingStats
      .filter((stat) => stat.MatchType === "ODI")
      .reduce((sum, stat) => sum + stat.Wickets, 0)
    const t20Wickets = bowlingStats
      .filter((stat) => stat.MatchType === "T20")
      .reduce((sum, stat) => sum + stat.Wickets, 0)

    return [
      { name: "Test", runs: testRuns, wickets: testWickets * 20 }, // Multiply wickets for better visualization
      { name: "ODI", runs: odiRuns, wickets: odiWickets * 20 },
      { name: "T20", runs: t20Runs, wickets: t20Wickets * 20 },
    ]
  }

  const formatRunDistribution = () => {
    const hundreds = battingStats.reduce((sum, stat) => sum + stat.Hundreds, 0)
    const fifties = battingStats.reduce((sum, stat) => sum + stat.Fifties, 0)
    const fours = battingStats.reduce((sum, stat) => sum + stat.Fours, 0)
    const sixes = battingStats.reduce((sum, stat) => sum + stat.Sixes, 0)

    // Calculate runs from boundaries
    const runsFromFours = fours * 4
    const runsFromSixes = sixes * 6
    const runsFromBoundaries = runsFromFours + runsFromSixes
    const otherRuns = totalRuns - runsFromBoundaries

    return [
      { name: "4s", value: runsFromFours, color: "#006a4e" },
      { name: "6s", value: runsFromSixes, color: "#f42a41" },
      { name: "Other", value: otherRuns, color: "#ffde00" },
    ]
  }

  const formatFieldingData = () => {
    return [
      { name: "Catches", value: totalCatches, color: "#006a4e" },
      { name: "Stumpings", value: totalStumpings, color: "#f42a41" },
      { name: "Run Outs", value: fieldingStats.reduce((sum, stat) => sum + stat.RunOuts, 0), color: "#ffde00" },
      { name: "Direct Hits", value: fieldingStats.reduce((sum, stat) => sum + stat.DirectHits, 0), color: "#ffffff" },
    ]
  }

  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl font-bold text-white mb-4">Overall Statistics</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#006a4e]/20 p-4 rounded-lg border-l-2 border-[#006a4e]">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Total Runs</h4>
          <p className="text-2xl font-bold text-white">{totalRuns}</p>
        </div>

        <div className="bg-[#f42a41]/20 p-4 rounded-lg border-l-2 border-[#f42a41]">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Total Wickets</h4>
          <p className="text-2xl font-bold text-white">{totalWickets}</p>
        </div>

        <div className="bg-[#ffde00]/10 p-4 rounded-lg border-l-2 border-[#ffde00]">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Catches</h4>
          <p className="text-2xl font-bold text-white">{totalCatches}</p>
        </div>

        <div className="bg-white/10 p-4 rounded-lg border-l-2 border-white">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Matches</h4>
          <p className="text-2xl font-bold text-white">
            {
              new Set([
                ...battingStats.map((s) => `${s.MatchType}-${s.Opponent}`),
                ...bowlingStats.map((s) => `${s.MatchType}-${s.Opponent}`),
                ...fieldingStats.map((s) => `${s.MatchType}-${s.Opponent}`),
              ]).size
            }
          </p>
        </div>
      </div>

      {/* Chart Selection */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            activeChart === "performance" ? "bg-[#006a4e] text-white" : "bg-[#333] text-gray-300 hover:bg-[#444]"
          }`}
          onClick={() => setActiveChart("performance")}
        >
          Format Performance
        </button>
        <button
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            activeChart === "runs" ? "bg-[#006a4e] text-white" : "bg-[#333] text-gray-300 hover:bg-[#444]"
          }`}
          onClick={() => setActiveChart("runs")}
        >
          Run Distribution
        </button>
        <button
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            activeChart === "fielding" ? "bg-[#006a4e] text-white" : "bg-[#333] text-gray-300 hover:bg-[#444]"
          }`}
          onClick={() => setActiveChart("fielding")}
        >
          Fielding Stats
        </button>
      </div>

      {/* Charts */}
      <div className="bg-[#1c1c1c] border border-[#333] rounded-lg p-4 h-80">
        {activeChart === "performance" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formatPerformanceData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1c1c1c", borderColor: "#333" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Bar dataKey="runs" name="Runs" fill="#f42a41" />
              <Bar dataKey="wickets" name="Wickets (x20)" fill="#006a4e" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeChart === "runs" && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formatRunDistribution()}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {formatRunDistribution().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1c1c1c", borderColor: "#333" }}
                labelStyle={{ color: "#fff" }}
                formatter={(value) => [`${value} runs`, ""]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}

        {activeChart === "fielding" && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formatFieldingData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {formatFieldingData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1c1c1c", borderColor: "#333" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-6 p-4 bg-[#006a4e]/20 rounded-lg border-l-2 border-[#006a4e]">
        <h4 className="text-lg font-bold text-white mb-2">Player Summary</h4>
        <p className="text-gray-300">
          {player.name} is a {player.role.toLowerCase()} who has represented Bangladesh in
          {player.formats.join(", ")} formats. With {totalRuns} runs and {totalWickets} wickets in international
          cricket, {player.name} has been a valuable asset to the Bangladesh cricket team since{" "}
          {player.span.split("-")[0]}.
        </p>
      </div>
    </div>
  )
}
