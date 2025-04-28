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
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function FieldingStats({ stats }) {
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
          Catches: 0,
          Stumpings: 0,
          RunOuts: 0,
          DirectHits: 0,
        }
      }

      const current = aggregated[stat.MatchType]
      current.Matches += stat.Matches
      current.Innings += stat.Innings
      current.Catches += stat.Catches || 0
      current.Stumpings += stat.Stumpings || 0
      current.RunOuts += stat.RunOuts || 0
      current.DirectHits += stat.DirectHits || 0
    })

    return Object.values(aggregated)
  }

  // Prepare data for radar chart
  const prepareRadarData = () => {
    // Calculate total stats
    const totalMatches = stats.reduce((sum, stat) => sum + stat.Matches, 0)
    const totalCatches = stats.reduce((sum, stat) => sum + (stat.Catches || 0), 0)
    const totalStumpings = stats.reduce((sum, stat) => sum + (stat.Stumpings || 0), 0)
    const totalRunOuts = stats.reduce((sum, stat) => sum + (stat.RunOuts || 0), 0)
    const totalDirectHits = stats.reduce((sum, stat) => sum + (stat.DirectHits || 0), 0)

    // Find max values for normalization
    const maxMatches = Math.max(...stats.map((stat) => stat.Matches))
    const maxCatches = Math.max(...stats.map((stat) => stat.Catches || 0))
    const maxStumpings = Math.max(...stats.map((stat) => stat.Stumpings || 0))
    const maxRunOuts = Math.max(...stats.map((stat) => stat.RunOuts || 0))
    const maxDirectHits = Math.max(...stats.map((stat) => stat.DirectHits || 0))

    // Normalize values to 0-100 scale
    const normalizedData = [
      { subject: "Matches", A: (totalMatches / (maxMatches * stats.length)) * 100, fullMark: 100 },
      { subject: "Catches", A: (totalCatches / (maxCatches * stats.length || 1)) * 100, fullMark: 100 },
      { subject: "Stumpings", A: (totalStumpings / (maxStumpings * stats.length || 1)) * 100, fullMark: 100 },
      { subject: "Run Outs", A: (totalRunOuts / (maxRunOuts * stats.length || 1)) * 100, fullMark: 100 },
      { subject: "Direct Hits", A: (totalDirectHits / (maxDirectHits * stats.length || 1)) * 100, fullMark: 100 },
    ]

    return normalizedData
  }

  // Prepare data for pie chart
  const preparePieData = () => {
    const totalCatches = stats.reduce((sum, stat) => sum + (stat.Catches || 0), 0)
    const totalStumpings = stats.reduce((sum, stat) => sum + (stat.Stumpings || 0), 0)
    const totalRunOuts = stats.reduce((sum, stat) => sum + (stat.RunOuts || 0), 0)
    const totalDirectHits = stats.reduce((sum, stat) => sum + (stat.DirectHits || 0), 0)

    return [
      { name: "Catches", value: totalCatches, color: "#006a4e" },
      { name: "Stumpings", value: totalStumpings, color: "#f42a41" },
      { name: "Run Outs", value: totalRunOuts, color: "#ffde00" },
      { name: "Direct Hits", value: totalDirectHits, color: "#ffffff" },
    ].filter((item) => item.value > 0)
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Fielding Statistics</h3>
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
              chartType === "pie" ? "bg-[#006a4e] text-white" : "bg-[#333] text-gray-300 hover:bg-[#444]"
            }`}
            onClick={() => setChartType("pie")}
          >
            Pie Chart
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
                <Radar name="Fielding Performance" dataKey="A" stroke="#ffde00" fill="#ffde00" fillOpacity={0.6} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1c1c1c", borderColor: "#333" }}
                  formatter={(value) => [`${value.toFixed(1)}%`, "Performance"]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartType === "pie" && (
          <div className="bg-[#1c1c1c] border border-[#333] rounded-lg p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={preparePieData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {preparePieData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1c1c1c", borderColor: "#333" }}
                  formatter={(value) => [value, ""]}
                />
                <Legend />
              </PieChart>
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
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Catches
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Stumpings
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Run Outs
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Direct Hits
                  </th>
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
                    <td className="py-3 px-4 text-sm font-bold text-[#ffde00]">{stat.Catches || 0}</td>
                    <td className="py-3 px-4 text-sm text-white">{stat.Stumpings || 0}</td>
                    <td className="py-3 px-4 text-sm text-white">{stat.RunOuts || 0}</td>
                    <td className="py-3 px-4 text-sm text-white">{stat.DirectHits || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-[#006a4e]/20 p-4 rounded-lg border-l-2 border-[#006a4e]">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Total Catches</h4>
          <p className="text-2xl font-bold text-white">{stats.reduce((sum, stat) => sum + (stat.Catches || 0), 0)}</p>
        </div>

        <div className="bg-[#f42a41]/20 p-4 rounded-lg border-l-2 border-[#f42a41]">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Total Stumpings</h4>
          <p className="text-2xl font-bold text-white">{stats.reduce((sum, stat) => sum + (stat.Stumpings || 0), 0)}</p>
        </div>

        <div className="bg-[#ffde00]/10 p-4 rounded-lg border-l-2 border-[#ffde00]">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Run Outs</h4>
          <p className="text-2xl font-bold text-white">{stats.reduce((sum, stat) => sum + (stat.RunOuts || 0), 0)}</p>
        </div>

        <div className="bg-white/10 p-4 rounded-lg border-l-2 border-white">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Direct Hits</h4>
          <p className="text-2xl font-bold text-white">
            {stats.reduce((sum, stat) => sum + (stat.DirectHits || 0), 0)}
          </p>
        </div>
      </div>
    </div>
  )
}
