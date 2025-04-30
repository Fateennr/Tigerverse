"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Trophy,
  User,
  Clock,
  Filter,
  ChevronDown,
  BarChart3,
  Target,
  Percent,
  Award,
  Zap,
  ArrowRight,
  X,
} from "lucide-react"

export default function HallOfFamePage() {
  const [matchType, setMatchType] = useState("all")
  const [location, setLocation] = useState("all")
  const [opponent, setOpponent] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [showPlayerModal, setShowPlayerModal] = useState(false)

  const openPlayerModal = (player) => {
    setSelectedPlayer(player)
    setShowPlayerModal(true)
  }

  return (
    <div className="min-h-screen bg-[#1c1c1c]">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-10">
          <div className="h-64 md:h-80">
            <Image
              src={`/players/${player.name.toLowerCase().replace(/\./g, '').replace(/\s+/g, '_')}.png`}
              alt="Bangladesh Cricket Team"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[#004a37]/95 via-[#005a42]/80 to-transparent flex items-center">
            <div className="px-6 md:px-10 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Hall of Fame</h1>
              <p className="text-gray-200 text-lg mb-6">
                Explore comprehensive statistics and records of the Bangladesh Cricket Team across all formats
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all ${
                    activeTab === "general" ? "bg-[#006a4e] text-white" : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
                >
                  General Stats
                </button>
                <button
                  onClick={() => setActiveTab("batting")}
                  className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all ${
                    activeTab === "batting" ? "bg-red-700 text-white" : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
                >
                  Batting Records
                </button>
                <button
                  onClick={() => setActiveTab("bowling")}
                  className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all ${
                    activeTab === "bowling" ? "bg-yellow-700 text-white" : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
                >
                  Bowling Records
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="bg-gradient-to-r from-[#004a37]/90 to-[#006a4e]/60 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Filter className="h-5 w-5" /> Filter Records
            </h2>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden bg-[#006a4e] hover:bg-[#005a42] text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              Filters <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className={`p-6 ${isFilterOpen ? "block" : "hidden md:block"}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">Match Format</label>
                <select
                  value={matchType}
                  onChange={(e) => setMatchType(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#006a4e]/50 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-[#006a4e] focus:border-transparent"
                >
                  <option value="">All Formats</option>
                  <option value="Test">Test</option>
                  <option value="ODI">ODI</option>
                  <option value="T20">T20</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Venue</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#006a4e]/50 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-[#006a4e] focus:border-transparent"
                >
                  <option value="all">All Venues</option>
                  <option value="home">Home</option>
                  <option value="away">Away</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Opponent</label>
                <select
                  value={opponent}
                  onChange={(e) => setOpponent(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#006a4e]/50 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-[#006a4e] focus:border-transparent"
                >
                  <option value="">All Teams</option>
                  <option value="australia">Australia</option>
                  <option value="england">England</option>
                  <option value="india">India</option>
                  <option value="pakistan">Pakistan</option>
                  <option value="south-africa">South Africa</option>
                  <option value="sri-lanka">Sri Lanka</option>
                  <option value="west-indies">West Indies</option>
                  <option value="new-zealand">New Zealand</option>
                  <option value="afghanistan">Afghanistan</option>
                  <option value="zimbabwe">Zimbabwe</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex overflow-x-auto scrollbar-hide space-x-2">
            <button
              onClick={() => setActiveTab("general")}
              className={`px-6 py-3 rounded-t-lg font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === "general"
                  ? "bg-gradient-to-r from-[#006a4e] to-[#005a42] text-white shadow-lg"
                  : "bg-black/30 text-gray-300 hover:bg-black/40"
              }`}
            >
              <Trophy className="h-4 w-4" /> General
            </button>
            <button
              onClick={() => setActiveTab("batting")}
              className={`px-6 py-3 rounded-t-lg font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === "batting"
                  ? "bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg"
                  : "bg-black/30 text-gray-300 hover:bg-black/40"
              }`}
            >
              <BarChart3 className="h-4 w-4" /> Batting
            </button>
            <button
              onClick={() => setActiveTab("bowling")}
              className={`px-6 py-3 rounded-t-lg font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === "bowling"
                  ? "bg-gradient-to-r from-yellow-700 to-yellow-600 text-white shadow-lg"
                  : "bg-black/30 text-gray-300 hover:bg-black/40"
              }`}
            >
              <Zap className="h-4 w-4" /> Bowling
            </button>
          </div>
        </div>

        {/* General Stats */}
        {activeTab === "general" && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {generalStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#006a4e]/30 to-black/50 rounded-xl overflow-hidden shadow-lg hover:shadow-[#006a4e]/20 transition-all group"
                >
                  <div className="px-6 py-4 bg-[#006a4e]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatIcon(stat.icon, "h-5 w-5 text-[#00a878]")}
                      <h3 className="text-lg font-bold text-white">{stat.title}</h3>
                    </div>
                    <span className="bg-[#006a4e]/50 text-white text-xs px-2 py-1 rounded">
                      {matchType === "all" ? "All Formats" : matchType.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-gray-300">{stat.description}</p>
                      <div className="text-4xl font-bold text-[#00a878]">{stat.value}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-[#006a4e]/30 flex items-center justify-center overflow-hidden ring-2 ring-[#006a4e]/30 group-hover:ring-[#006a4e]/50 transition-all">
                        <Image
                          src={stat.playerImage || "/placeholder.svg?height=64&width=64"}
                          alt={stat.player}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white text-lg">{stat.player}</p>
                        <p className="text-gray-300 text-sm">{stat.additionalInfo}</p>
                      </div>
                      <button
                        onClick={() => openPlayerModal(stat)}
                        className="bg-[#006a4e]/50 hover:bg-[#006a4e]/70 text-white text-sm px-3 py-1 rounded flex items-center gap-1 transition-all"
                      >
                        Details <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Batting Stats */}
        {activeTab === "batting" && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {battingStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-red-700/30 to-black/50 rounded-xl overflow-hidden shadow-lg hover:shadow-red-900/20 transition-all group"
                >
                  <div className="px-6 py-4 bg-red-600/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatIcon(stat.icon, "h-5 w-5 text-red-300")}
                      <h3 className="text-lg font-bold text-white">{stat.title}</h3>
                    </div>
                    <span className="bg-red-800/80 text-red-300 text-xs px-2 py-1 rounded">
                      {matchType === "all" ? "All Formats" : matchType.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-gray-300">{stat.description}</p>
                      <div className="text-4xl font-bold text-red-300">{stat.value}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center overflow-hidden ring-2 ring-red-400/30 group-hover:ring-red-400/50 transition-all">
                        <Image
                          src={stat.playerImage || "/placeholder.svg?height=64&width=64"}
                          alt={stat.player}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white text-lg">{stat.player}</p>
                        <p className="text-gray-300 text-sm">{stat.additionalInfo}</p>
                      </div>
                      <button
                        onClick={() => openPlayerModal(stat)}
                        className="bg-red-600/50 hover:bg-red-500/50 text-white text-sm px-3 py-1 rounded flex items-center gap-1 transition-all"
                      >
                        Details <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bowling Stats */}
        {activeTab === "bowling" && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {bowlingStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-900/30 to-black/50 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-900/20 transition-all group"
                >
                  <div className="px-6 py-4 bg-yellow-800/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatIcon(stat.icon, "h-5 w-5 text-yellow-400")}
                      <h3 className="text-lg font-bold text-white">{stat.title}</h3>
                    </div>
                    <span className="bg-yellow-950/80 text-yellow-300 text-xs px-2 py-1 rounded">
                      {matchType === "all" ? "All Formats" : matchType.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-gray-300">{stat.description}</p>
                      <div className="text-4xl font-bold text-yellow-400">{stat.value}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-yellow-900/30 flex items-center justify-center overflow-hidden ring-2 ring-yellow-500/30 group-hover:ring-yellow-500/50 transition-all">
                        <Image
                          src={stat.playerImage || "/placeholder.svg?height=64&width=64"}
                          alt={stat.player}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white text-lg">{stat.player}</p>
                        <p className="text-gray-300 text-sm">{stat.additionalInfo}</p>
                      </div>
                      <button
                        onClick={() => openPlayerModal(stat)}
                        className="bg-yellow-800/50 hover:bg-yellow-700/50 text-white text-sm px-3 py-1 rounded flex items-center gap-1 transition-all"
                      >
                        Details <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Player Modal */}
        {showPlayerModal && selectedPlayer && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-[#006a4e]/90 to-black/90 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-[#006a4e]/50 flex items-center justify-center overflow-hidden ring-2 ring-[#006a4e]/30">
                      <Image
                        src={selectedPlayer.playerImage || "/placeholder.svg?height=80&width=80"}
                        alt={selectedPlayer.player}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedPlayer.player}</h2>
                      <p className="text-gray-300">{selectedPlayer.additionalInfo}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPlayerModal(false)}
                    className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-black/30 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-white mb-3">{selectedPlayer.title}</h3>
                    <div className="text-5xl font-bold text-[#00a878] mb-4">{selectedPlayer.value}</div>
                    <p className="text-gray-300">{selectedPlayer.description}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-white mb-3">Career Statistics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Matches</span>
                        <span className="text-white font-medium">375</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Runs</span>
                        <span className="text-white font-medium">12,467</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Wickets</span>
                        <span className="text-white font-medium">634</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Average</span>
                        <span className="text-white font-medium">36.5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">Performance by Format</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#006a4e]/30 p-3 rounded-lg">
                      <h4 className="font-medium text-white">Test</h4>
                      <div className="text-2xl font-bold text-[#00a878] mt-1">127 Matches</div>
                      <p className="text-sm text-gray-300">Avg: 39.2</p>
                    </div>
                    <div className="bg-[#006a4e]/30 p-3 rounded-lg">
                      <h4 className="font-medium text-white">ODI</h4>
                      <div className="text-2xl font-bold text-[#00a878] mt-1">228 Matches</div>
                      <p className="text-sm text-gray-300">Avg: 37.8</p>
                    </div>
                    <div className="bg-[#006a4e]/30 p-3 rounded-lg">
                      <h4 className="font-medium text-white">T20I</h4>
                      <div className="text-2xl font-bold text-[#00a878] mt-1">112 Matches</div>
                      <p className="text-sm text-gray-300">Avg: 29.4</p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-white mb-3">Career Milestones</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#006a4e]/50 flex items-center justify-center shrink-0">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">First century against Australia</p>
                        <p className="text-gray-300 text-sm">Melbourne Cricket Ground, 2017</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#006a4e]/50 flex items-center justify-center shrink-0">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">5-wicket haul against India</p>
                        <p className="text-gray-300 text-sm">Shere Bangla Stadium, 2022</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#006a4e]/50 flex items-center justify-center shrink-0">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Player of the Tournament</p>
                        <p className="text-gray-300 text-sm">Asia Cup, 2018</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-8 left-8">
        <div className="bg-black bg-opacity-50 w-12 h-12 rounded-full flex items-center justify-center">
          <span className="text-white font-medium">N</span>
        </div>
      </div>
    </div>
  )
}

// Helper function to render icons
function getStatIcon(iconName, className) {
  switch (iconName) {
    case "user":
      return <User className={className} />
    case "trophy":
      return <Trophy className={className} />
    case "award":
      return <Award className={className} />
    case "barChart":
      return <BarChart3 className={className} />
    case "target":
      return <Target className={className} />
    case "percent":
      return <Percent className={className} />
    case "clock":
      return <Clock className={className} />
    case "zap":
      return <Zap className={className} />
    default:
      return <Trophy className={className} />
  }
}

// Sample data aligned with backend services
const generalStats = [
  {
    title: "Most Matches Played",
    description: "Total international matches across all formats",
    player: "Mushfiqur Rahim",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "412",
    additionalInfo: "2005-Present",
    icon: "user",
    endpoint: "mostMatchesPlayed",
  },
  {
    title: "Longest Career",
    description: "Years active in international cricket",
    player: "Shakib Al Hasan",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "17 years",
    additionalInfo: "2006-Present",
    icon: "clock",
    endpoint: "longestCareer",
  },
]

const battingStats = [
  {
    title: "Highest Total Runs",
    description: "Career runs across all formats",
    player: "Tamim Iqbal",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "14,778",
    additionalInfo: "2007-Present",
    icon: "barChart",
    endpoint: "highestTotalRuns",
  },
  {
    title: "Highest Score",
    description: "Most runs in a single innings",
    player: "Liton Das",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "176",
    additionalInfo: "vs Zimbabwe, 2020",
    icon: "trophy",
    endpoint: "highestScore",
  },
  {
    title: "Most Centuries",
    description: "Total 100+ scores in international cricket",
    player: "Tamim Iqbal",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "25",
    additionalInfo: "13 in ODIs, 10 in Tests, 2 in T20Is",
    icon: "award",
    endpoint: "mostCenturies",
  },
  {
    title: "Most Half-Centuries",
    description: "Total 50+ scores in international cricket",
    player: "Shakib Al Hasan",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "87",
    additionalInfo: "53 in ODIs, 30 in Tests, 4 in T20Is",
    icon: "target",
    endpoint: "mostHalfCenturies",
  },
  {
    title: "Highest Strike Rate",
    description: "Minimum 1000 runs",
    player: "Mahmudullah",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "127.8",
    additionalInfo: "T20 International format",
    icon: "zap",
    endpoint: "highestStrikeRate",
  },
  {
    title: "Highest Average",
    description: "Minimum 20 innings",
    player: "Mushfiqur Rahim",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "36.78",
    additionalInfo: "All formats combined",
    icon: "percent",
    endpoint: "highestAverage",
  },
]

const bowlingStats = [
  {
    title: "Highest Career Wickets",
    description: "Career wickets across all formats",
    player: "Shakib Al Hasan",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "634",
    additionalInfo: "2006-Present",
    icon: "trophy",
    endpoint: "highestCareerWickets",
  },
  {
    title: "Best Bowling Average",
    description: "Minimum 50 wickets",
    player: "Mustafizur Rahman",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "21.45",
    additionalInfo: "All formats combined",
    icon: "percent",
    endpoint: "bestBowlingAverage",
  },
  {
    title: "Best Bowling Figures",
    description: "Best performance in a single innings",
    player: "Taijul Islam",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "8/39",
    additionalInfo: "vs Zimbabwe, 2014",
    icon: "award",
    endpoint: "bestBowlingFigures",
  },
  {
    title: "Highest Single Innings Wickets",
    description: "Most wickets in a single innings",
    player: "Taijul Islam",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "8",
    additionalInfo: "vs Zimbabwe, 2014",
    icon: "target",
    endpoint: "highestSingleInningsWickets",
  },
  {
    title: "Most 5-Wicket Hauls",
    description: "5+ wickets in a single innings",
    player: "Shakib Al Hasan",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "18",
    additionalInfo: "All formats combined",
    icon: "target",
    endpoint: "mostFiveWicketHauls",
  },
  {
    title: "Most 10-Wicket Matches",
    description: "10+ wickets in a single match",
    player: "Shakib Al Hasan",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "5",
    additionalInfo: "Test matches only",
    icon: "zap",
    endpoint: "mostTenWicketHauls",
  },
]
