"use client"
import { useState, useEffect } from "react"
import { X, Calendar, MapPin, Trophy, Users, Info, BarChart3 } from "lucide-react"
import Image from "next/image"
import MatchSquad from "./MatchSquad"

export default function MatchDetails({ match, onClose }) {
  const [activeTab, setActiveTab] = useState("info")
  const [squad, setSquad] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (activeTab === "squad") {
      fetchSquad()
    }
  }, [activeTab])

  const fetchSquad = async () => {
    try {
      setLoading(true)

      // In a real app, this would be an actual API call
      const response = await fetch(`${process.env.BACKEND_URI}/matches/${match.id}`)
      const data = await response.json()

      // Mock data for squad
      // const data = [
      //   {
      //     id: 1,
      //     name: "Tamim Iqbal",
      //     role: "Batsman",
      //     image: "/placeholder.svg?height=300&width=300",
      //     stats: { runs: 85, balls: 102, fours: 8, sixes: 2 },
      //   },
      //   {
      //     id: 2,
      //     name: "Liton Das",
      //     role: "Wicket-keeper Batsman",
      //     image: "/placeholder.svg?height=300&width=300",
      //     stats: { runs: 45, balls: 56, fours: 5, sixes: 0 },
      //   },
      //   {
      //     id: 3,
      //     name: "Shakib Al Hasan",
      //     role: "All-rounder",
      //     image: "/placeholder.svg?height=300&width=300",
      //     stats: { runs: 102, balls: 114, fours: 9, sixes: 3, wickets: 2, overs: 10, economy: 4.2 },
      //   },
      //   {
      //     id: 4,
      //     name: "Mushfiqur Rahim",
      //     role: "Wicket-keeper Batsman",
      //     image: "/placeholder.svg?height=300&width=300",
      //     stats: { runs: 65, balls: 75, fours: 6, sixes: 1 },
      //   },
      //   {
      //     id: 5,
      //     name: "Mahmudullah",
      //     role: "All-rounder",
      //     image: "/placeholder.svg?height=300&width=300",
      //     stats: { runs: 35, balls: 40, fours: 3, sixes: 1, wickets: 1, overs: 6, economy: 5.0 },
      //   },
      //   {
      //     id: 6,
      //     name: "Mehidy Hasan Miraz",
      //     role: "All-rounder",
      //     image: "/placeholder.svg?height=300&width=300",
      //     stats: { runs: 15, balls: 20, fours: 1, sixes: 0, wickets: 3, overs: 10, economy: 3.8 },
      //   },
      //   {
      //     id: 7,
      //     name: "Mustafizur Rahman",
      //     role: "Bowler",
      //     image: "/placeholder.svg?height=300&width=300",
      //     stats: { wickets: 3, overs: 9.2, economy: 4.5 },
      //   },
      //   {
      //     id: 8,
      //     name: "Taskin Ahmed",
      //     role: "Bowler",
      //     image: "/placeholder.svg?height=300&width=300",
      //     stats: { wickets: 2, overs: 8, economy: 5.1 },
      //   },
      //   {
      //     id: 9,
      //     name: "Shoriful Islam",
      //     role: "Bowler",
      //     image: "/placeholder.svg?height=300&width=300",
      //     stats: { wickets: 1, overs: 7, economy: 5.7 },
      //   },
      //   {
      //     id: 10,
      //     name: "Afif Hossain",
      //     role: "Batsman",
      //     image: "/placeholder.svg?height=300&width=300",
      //     stats: { runs: 25, balls: 30, fours: 2, sixes: 1 },
      //   },
      //   {
      //     id: 11,
      //     name: "Nasum Ahmed",
      //     role: "Bowler",
      //     image: "/placeholder.svg?height=300&width=300",
      //     stats: { wickets: 1, overs: 6, economy: 4.8 },
      //   },
      // ]

      const stats = data.map((item, idx) => ({
        id: item.id,
        name: item.name,
        role: item.role,
        image: '/placeholder.jpg',
        stats: item.stats
      }))

      setSquad(data)
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch squad data", err)
      setLoading(false)
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#1c1c1c] rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl animate-slideInUp">
        {/* Header */}
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-[#006a4e] to-[#1c1c1c]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-[#f42a41] transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="absolute inset-0">
            <Image
              src={match.image || "/placeholder.svg?height=500&width=1000"}
              alt={`Bangladesh vs ${match.opponent}`}
              fill
              className="object-cover opacity-40"
            />
          </div>

          <div className="absolute inset-0 flex items-end">
            <div className="container p-6">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  match.format === "Test"
                    ? "bg-[#006a4e]"
                    : match.format === "ODI"
                      ? "bg-[#f42a41]"
                      : "bg-[#ffde00] text-[#1c1c1c]"
                } mb-2 inline-block`}
              >
                {match.format}
              </span>

              <h2 className="text-2xl md:text-4xl font-bold text-white">Bangladesh vs {match.opponent}</h2>
              <p className="text-lg text-[#ffde00] mt-1">{match.result}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#1c1c1c] border-b border-[#333]">
          <div className="container px-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center border-b-2 transition-colors ${
                  activeTab === "info"
                    ? "border-[#f42a41] text-[#ffde00]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("info")}
              >
                <Info size={16} className="mr-2" />
                Match Info
              </button>

              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center border-b-2 transition-colors ${
                  activeTab === "squad"
                    ? "border-[#f42a41] text-[#ffde00]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("squad")}
              >
                <Users size={16} className="mr-2" />
                Squad
              </button>

              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center border-b-2 transition-colors ${
                  activeTab === "stats"
                    ? "border-[#f42a41] text-[#ffde00]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("stats")}
              >
                <BarChart3 size={16} className="mr-2" />
                Match Stats
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          {activeTab === "info" && (
            <div className="animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Match Details</h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="text-[#ffde00] mr-3 mt-1" size={18} />
                      <div>
                        <p className="text-sm text-gray-400">Date</p>
                        <p className="text-white">{formatDate(match.date)}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="text-[#ffde00] mr-3 mt-1" size={18} />
                      <div>
                        <p className="text-sm text-gray-400">Venue</p>
                        <p className="text-white">{match.venue}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Trophy className="text-[#ffde00] mr-3 mt-1" size={18} />
                      <div>
                        <p className="text-sm text-gray-400">Man of the Match</p>
                        <p className="text-white">{match.motm}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#006a4e]/20 rounded-lg">
                    <h4 className="font-bold text-white mb-2">Match Highlights</h4>
                    <p className="text-gray-300">{match.highlights}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Scorecard</h3>

                  <div className="bg-[#1c1c1c] border border-[#333] rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-[#333]">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-400">Bangladesh</p>
                          <p className="text-xl font-bold text-white">{match.bdScore}</p>
                        </div>
                        <div className="h-10 w-10 bg-[#006a4e] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">BD</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-400">{match.opponent}</p>
                          <p className="text-xl font-bold text-white">{match.opponentScore}</p>
                        </div>
                        <div className="h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{match.opponent.substring(0, 2).toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-[#f42a41]/20 p-4 rounded-lg">
                      <p className="text-sm text-gray-400">Win Margin</p>
                      <p className="text-xl font-bold text-white">
                        {match.winrun > 0 ? `${match.winrun} runs` : `${match.winwicket} wickets`}
                      </p>
                    </div>

                    <div className="bg-[#ffde00]/10 p-4 rounded-lg">
                      <p className="text-sm text-gray-400">Highest Score</p>
                      <p className="text-xl font-bold text-white">{match.highestrun}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "squad" && (
            <div className="animate-fadeIn">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffde00]"></div>
                </div>
              ) : (
                <MatchSquad squad={squad} />
              )}
            </div>
          )}

          {activeTab === "stats" && (
            <div className="animate-fadeIn">
              <h3 className="text-xl font-bold text-white mb-4">Match Statistics</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1c1c1c] border border-[#333] rounded-lg p-4">
                  <h4 className="font-bold text-white mb-3">Batting</h4>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-300">Top Scorer</p>
                      <p className="text-white font-bold">
                        {match.motm} ({match.highestrun})
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-gray-300">Team Strike Rate</p>
                      <p className="text-white font-bold">{match.format === "Test" ? "N/A" : "85.4"}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-gray-300">Boundaries</p>
                      <p className="text-white font-bold">24 fours, 6 sixes</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1c1c1c] border border-[#333] rounded-lg p-4">
                  <h4 className="font-bold text-white mb-3">Bowling</h4>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-300">Best Bowler</p>
                      <p className="text-white font-bold">Mehidy Hasan (3/42)</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-gray-300">Economy Rate</p>
                      <p className="text-white font-bold">4.8</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-gray-300">Wickets Taken</p>
                      <p className="text-white font-bold">10</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1c1c1c] border border-[#333] rounded-lg p-4 md:col-span-2">
                  <h4 className="font-bold text-white mb-3">Key Moments</h4>

                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-[#f42a41] mr-2">▶</span>
                      <span className="text-gray-300">
                        Shakib Al Hasan scored a century, reaching the milestone in 110 balls
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#f42a41] mr-2">▶</span>
                      <span className="text-gray-300">Mehidy Hasan took 3 crucial wickets in the middle overs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#f42a41] mr-2">▶</span>
                      <span className="text-gray-300">Mustafizur Rahman bowled a match-winning final over</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#f42a41] mr-2">▶</span>
                      <span className="text-gray-300">Bangladesh's fielding saved approximately 25 runs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
