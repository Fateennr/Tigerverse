"use client"
import { useState } from "react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"

export default function BattingStats({ stats = [] }) {
  const [chartType, setChartType] = useState("radar")

  // Calculate aggregate stats by match type
  const aggregateByMatchType = () => {
    const aggregated = {}

    stats.forEach((stat) => {
      if (!aggregated[stat.MatchType]) {
        aggregated[stat.MatchType] = {
          MatchType: stat.MatchType,
          Matches: 0,
          Innings: 0,
          Runs: 0,
          BallsFaced: 0,
          Hundreds: 0,
          Fifties: 0,
          Fours: 0,
          Sixes: 0,
          HighestScore: 0,
        }
      }

      const current = aggregated[stat.MatchType]
      current.Matches += stat.Matches
      current.Innings += stat.Innings
      current.Runs += stat.Runs
      current.BallsFaced += stat.BallsFaced
      current.Hundreds += stat.Hundreds
      current.Fifties += stat.Fifties
      current.Fours += stat.Fours
      current.Sixes += stat.Sixes
      current.HighestScore = Math.max(current.HighestScore, stat.HighestScore)
    })

    return Object.values(aggregated)
  }

  // Prepare data for radar chart
  const prepareRadarData = () => {
    // Calculate total stats
    const totalMatches = stats.reduce((sum, stat) => sum + stat.Matches, 0)
    const totalRuns = stats.reduce((sum, stat) => sum + stat.Runs, 0)
    const totalBoundaries = stats.reduce((sum, stat) => sum + stat.Fours + stat.Sixes, 0)
    const avgStrikeRate = stats.reduce((sum, stat) => sum + Number.parseFloat(stat.StrikeRate), 0) / stats.length
    const avgAverage = stats.reduce((sum, stat) => sum + Number.parseFloat(stat.Average), 0) / stats.length

    // Find max values for normalization
    const maxMatches = Math.max(...stats.map((stat) => stat.Matches))
    const maxRuns = Math.max(...stats.map((stat) => stat.Runs))
    const maxBoundaries = Math.max(...stats.map((stat) => stat.Fours + stat.Sixes))
    const maxStrikeRate = Math.max(...stats.map((stat) => Number.parseFloat(stat.StrikeRate)))
    const maxAverage = Math.max(...stats.map((stat) => Number.parseFloat(stat.Average)))

    // Normalize values to 0-100 scale
    const normalizedData = [
      { subject: "Matches", A: (totalMatches / (maxMatches * stats.length)) * 100, fullMark: 100 },
      { subject: "Runs", A: (totalRuns / (maxRuns * stats.length)) * 100, fullMark: 100 },
      { subject: "Boundaries", A: (totalBoundaries / (maxBoundaries * stats.length)) * 100, fullMark: 100 },
      { subject: "Strike Rate", A: (avgStrikeRate / maxStrikeRate) * 100, fullMark: 100 },
      { subject: "Average", A: (avgAverage / maxAverage) * 100, fullMark: 100 },
    ]

    return normalizedData
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Batting Statistics</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              chartType === "radar" ? "bg-[#006a4e] text-white" : "bg-[#333] text-gray-300 hover:bg-[#444]"
            }`}
            onClick={() => setChartType("radar")}
          >
            Radar Chart
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              chartType === "bar" ? "bg-[#006a4e] text-white" : "bg-[#333] text-gray-300 hover:bg-[#444]"
            }`}
            onClick={() => setChartType("bar")}
          >
            Bar Chart
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              chartType === "table" ? "bg-[#006a4e] text-white" : "bg-[#333] text-gray-300 hover:bg-[#444]"
            }`}
            onClick={() => setChartType("table")}
          >
            Table View
          </button>
        </div>
      </div>

      {/* Visualization Section */}
      <div className="mb-8">
        {chartType === "radar" && (
          <div className="bg-[#1c1c1c] border border-[#333] rounded-lg p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={prepareRadarData()}>
                <PolarGrid stroke="#444" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#fff" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#fff" }} />
                <Radar name="Batting Performance" dataKey="A" stroke="#f42a41" fill="#f42a41" fillOpacity={0.6} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1c1c1c", borderColor: "#333" }}
                  formatter={(value) => [`${value.toFixed(1)}%`, "Performance"]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartType === "bar" && (
          <div className="bg-[#1c1c1c] border border-[#333] rounded-lg p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregateByMatchType()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="MatchType" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1c1c1c", borderColor: "#333" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Bar dataKey="Runs" name="Runs" fill="#f42a41" />
                <Bar dataKey="Matches" name="Matches" fill="#006a4e" />
                <Bar dataKey="Fifties" name="Fifties" fill="#ffde00" stackId="a" />
                <Bar dataKey="Hundreds" name="Hundreds" fill="#ff9900" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartType === "table" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#1c1c1c] border border-[#333] rounded-lg">
              <thead>
                <tr className="bg-[#006a4e]">
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Opponent
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Format
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Location
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Matches
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Innings
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Runs</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Highest
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Average
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">SR</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">100s</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">50s</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">4s</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">6s</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333]">
                {stats.map((stat, index) => (
                  <tr key={index} className="hover:bg-[#333] transition-colors">
                    <td className="py-3 px-4 text-sm text-white">{stat.Opponent}</td>
                    <td className="py-3 px-4 text-sm text-white">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          stat.MatchType === "Test"
                            ? "bg-[#006a4e]"
                            : stat.MatchType === "ODI"
                              ? "bg-[#f42a41]"
                              : "bg-[#ffde00] text-[#1c1c1c]"
                        }`}
                      >
                        {stat.MatchType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-white">{stat.LocationType}</td>
                    <td className="py-3 px-4 text-sm text-white">{stat.Matches}</td>
                    <td className="py-3 px-4 text-sm text-white">{stat.Innings}</td>
                    <td className="py-3 px-4 text-sm font-bold text-[#ffde00]">{stat.Runs}</td>
                    <td className="py-3 px-4 text-sm text-white">{stat.HighestScore}</td>
                    <td className="py-3 px-4 text-sm text-white">{stat.Average}</td>
                    <td className="py-3 px-4 text-sm text-white">{stat.StrikeRate}</td>
                    <td className="py-3 px-4 text-sm text-white">{stat.Hundreds}</td>
                    <td className="py-3 px-4 text-sm text-white">{stat.Fifties}</td>
                    <td className="py-3 px-4 text-sm text-white">{stat.Fours}</td>
                    <td className="py-3 px-4 text-sm text-white">{stat.Sixes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-[#006a4e]/20 p-4 rounded-lg border-l-2 border-[#006a4e]">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Total Runs</h4>
          <p className="text-2xl font-bold text-white">{stats.reduce((sum, stat) => sum + stat.Runs, 0)}</p>
        </div>

        <div className="bg-[#f42a41]/20 p-4 rounded-lg border-l-2 border-[#f42a41]">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Highest Score</h4>
          <p className="text-2xl font-bold text-white">{Math.max(...stats.map((stat) => stat.HighestScore))}</p>
        </div>

        <div className="bg-[#ffde00]/10 p-4 rounded-lg border-l-2 border-[#ffde00]">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Centuries / Half Centuries</h4>
          <p className="text-2xl font-bold text-white">
            {stats.reduce((sum, stat) => sum + stat.Hundreds, 0)} / {stats.reduce((sum, stat) => sum + stat.Fifties, 0)}
          </p>
        </div>
      </div>
    </div>
  )
}
