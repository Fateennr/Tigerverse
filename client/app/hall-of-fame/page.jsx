"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronDown,
  Filter,
  Trophy,
  User,
  Users,
  Award,
  BarChart3,
  Zap,
  Target,
  Percent,
  Clock,
  Search,
  ArrowUpDown,
  TrendingUp,
  BarChart2,
  PieChart,
  ArrowRight,
} from "lucide-react"

export default function HallOfFamePage() {
  const [matchType, setMatchType] = useState("all")
  const [location, setLocation] = useState("all")
  const [opponent, setOpponent] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [showPlayerModal, setShowPlayerModal] = useState(false)

  // Filtered stats state
  const [generalStats, setGeneralStats] = useState(generalStatsData)
  const [battingStats, setBattingStats] = useState(battingStatsData)
  const [bowlingStats, setBowlingStats] = useState(bowlingStatsData)

  // Apply filters
  useEffect(() => {
    // Filter general stats
    const filteredGeneralStats = generalStatsData.filter((stat) => {
      // In a real app, you would have more detailed filtering logic
      // For this demo, we'll just simulate filtering
      if (matchType !== "all" && stat.matchType && stat.matchType !== matchType) {
        return false
      }
      if (location !== "all" && stat.location && stat.location !== location) {
        return false
      }
      return true
    })

    // Filter batting stats
    const filteredBattingStats = battingStatsData.filter((stat) => {
      if (matchType !== "all" && stat.matchType && stat.matchType !== matchType) {
        return false
      }
      if (location !== "all" && stat.location && stat.location !== location) {
        return false
      }
      return true
    })

    // Filter bowling stats
    const filteredBowlingStats = bowlingStatsData.filter((stat) => {
      if (matchType !== "all" && stat.matchType && stat.matchType !== matchType) {
        return false
      }
      if (location !== "all" && stat.location && stat.location !== location) {
        return false
      }
      return true
    })

    setGeneralStats(filteredGeneralStats.length > 0 ? filteredGeneralStats : generalStatsData)
    setBattingStats(filteredBattingStats.length > 0 ? filteredBattingStats : battingStatsData)
    setBowlingStats(filteredBowlingStats.length > 0 ? filteredBowlingStats : bowlingStatsData)
  }, [matchType, location, opponent])

  const openPlayerModal = (player) => {
    setSelectedPlayer(player)
    setShowPlayerModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-900 to-black">
      <header className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <h1 className="text-3xl font-bold">
              <span className="text-white">Tiger</span>
              <span className="text-red-500">Ver</span>
              <span className="text-yellow-400">se</span>
            </h1>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-gray-200">
              Home
            </Link>
            <Link href="/squad" className="text-white hover:text-gray-200">
              Squad
            </Link>
            <Link href="/head2head" className="text-white hover:text-gray-200">
              Head2Head
            </Link>
            <Link href="/best-of-bd" className="text-white hover:text-gray-200">
              Best of BD
            </Link>
            <Link href="/hall-of-fame" className="text-white hover:text-gray-200 font-bold">
              Hall of Fame
            </Link>
            <Link href="/gallery" className="text-white hover:text-gray-200">
              Gallery
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-10">
          <div className="h-64 md:h-80">
            <Image
              src="/placeholder.svg?height=400&width=1200"
              alt="Bangladesh Cricket Team"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/70 to-transparent flex items-center">
            <div className="px-6 md:px-10 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Hall of Fame</h1>
              <p className="text-gray-200 text-lg mb-6">
                Explore comprehensive statistics and records of the Bangladesh Cricket Team across all formats
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab("general")}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all"
                >
                  General Stats
                </button>
                <button
                  onClick={() => setActiveTab("batting")}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all"
                >
                  Batting Records
                </button>
                <button
                  onClick={() => setActiveTab("bowling")}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all"
                >
                  Bowling Records
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="bg-gradient-to-r from-emerald-900/80 to-emerald-800/50 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Filter className="h-5 w-5" /> Filter & Compare
            </h2>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              Filters <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className={`p-6 ${isFilterOpen ? "block" : "hidden md:block"}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white mb-2 font-medium">Match Format</label>
                  <select
                    value={matchType}
                    onChange={(e) => setMatchType(e.target.value)}
                    className="w-full bg-emerald-950 border border-emerald-800 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  >
                    <option value="all">All Formats</option>
                    <option value="test">Test</option>
                    <option value="odi">ODI</option>
                    <option value="t20i">T20I</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2 font-medium">Venue</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-emerald-950 border border-emerald-800 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
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
                    className="w-full bg-emerald-950 border border-emerald-800 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  >
                    <option value="all">All Teams</option>
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

              <div>
                <label className="block text-white mb-2 font-medium">Search Player</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by player name..."
                    className="w-full bg-emerald-950 border border-emerald-800 text-white rounded-md pl-10 pr-3 py-2 focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>
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
                  ? "bg-gradient-to-r from-emerald-700 to-emerald-600 text-white shadow-lg"
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
            <button
              onClick={() => setActiveTab("compare")}
              className={`px-6 py-3 rounded-t-lg font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === "compare"
                  ? "bg-gradient-to-r from-purple-700 to-purple-600 text-white shadow-lg"
                  : "bg-black/30 text-gray-300 hover:bg-black/40"
              }`}
            >
              <ArrowUpDown className="h-4 w-4" /> Compare
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
                  className="bg-gradient-to-br from-emerald-900/50 to-black/50 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-900/20 transition-all group"
                >
                  <div className="px-6 py-4 bg-emerald-800/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatIcon(stat.icon, "h-5 w-5 text-emerald-400")}
                      <h3 className="text-lg font-bold text-white">{stat.title}</h3>
                    </div>
                    <span className="bg-emerald-950/80 text-emerald-300 text-xs px-2 py-1 rounded">
                      {matchType === "all" ? "All Formats" : matchType.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-gray-300">{stat.description}</p>
                      <div className="text-4xl font-bold text-emerald-400">{stat.value}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-900/50 flex items-center justify-center overflow-hidden ring-2 ring-emerald-500/30 group-hover:ring-emerald-500/50 transition-all">
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
                        className="bg-emerald-800/50 hover:bg-emerald-700/50 text-white text-sm px-3 py-1 rounded flex items-center gap-1 transition-all"
                      >
                        Details <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Performance Chart */}
            <div className="bg-black/30 rounded-xl overflow-hidden mb-10">
              <div className="px-6 py-4 bg-emerald-800/30">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" /> Team Performance Trends
                </h3>
              </div>
              <div className="p-6">
                <div className="aspect-[21/9] bg-emerald-950/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart2 className="h-12 w-12 text-emerald-500/50 mx-auto mb-3" />
                    <p className="text-white font-medium">Performance Chart Visualization</p>
                    <p className="text-gray-400 text-sm">Win percentage across formats and years</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Most Recent Wins */}
            <div className="bg-black/30 rounded-xl overflow-hidden">
              <div className="px-6 py-4 bg-emerald-800/30">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-emerald-400" /> Most Recent Wins
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {recentWins
                    .filter((win) => {
                      // Filter by match type
                      if (matchType !== "all" && win.format.toLowerCase() !== matchType) {
                        return false
                      }
                      // Filter by location
                      if (location !== "all" && win.venue.toLowerCase() !== location) {
                        return false
                      }
                      return true
                    })
                    .map((win, index) => (
                      <div
                        key={index}
                        className="bg-emerald-900/20 rounded-lg p-4 hover:bg-emerald-900/30 transition-all"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-white font-bold text-lg flex items-center gap-2">
                              vs {win.opponent}
                              <span className="bg-emerald-700/70 text-white text-xs px-2 py-1 rounded-full">
                                {win.format}
                              </span>
                            </h4>
                            <p className="text-emerald-400 text-sm">
                              {win.date} • {win.venue}
                            </p>
                          </div>
                          <div className="bg-emerald-800/50 text-white text-xs px-2 py-1 rounded">{win.location}</div>
                        </div>
                        <div className="flex justify-between items-center mt-3 text-sm">
                          <div>
                            <p className="text-white font-medium">Bangladesh: {win.bangladeshScore}</p>
                            <p className="text-gray-300">
                              {win.opponent}: {win.opponentScore}
                            </p>
                          </div>
                          <div className="bg-emerald-700/50 text-white px-3 py-1 rounded-full text-xs">
                            {win.result}
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-emerald-800/30">
                          <p className="text-gray-300 text-sm">
                            <span className="text-white font-medium">Player of the Match:</span> {win.playerOfMatch}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
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
                  className="bg-gradient-to-br from-red-900/50 to-black/50 rounded-xl overflow-hidden shadow-lg hover:shadow-red-900/20 transition-all group"
                >
                  <div className="px-6 py-4 bg-red-800/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatIcon(stat.icon, "h-5 w-5 text-red-400")}
                      <h3 className="text-lg font-bold text-white">{stat.title}</h3>
                    </div>
                    <span className="bg-red-950/80 text-red-300 text-xs px-2 py-1 rounded">
                      {matchType === "all" ? "All Formats" : matchType.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-gray-300">{stat.description}</p>
                      <div className="text-4xl font-bold text-red-400">{stat.value}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-red-900/50 flex items-center justify-center overflow-hidden ring-2 ring-red-500/30 group-hover:ring-red-500/50 transition-all">
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
                        className="bg-red-800/50 hover:bg-red-700/50 text-white text-sm px-3 py-1 rounded flex items-center gap-1 transition-all"
                      >
                        Details <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Batting Distribution */}
            <div className="bg-black/30 rounded-xl overflow-hidden mb-10">
              <div className="px-6 py-4 bg-red-800/30">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-red-400" /> Run Distribution by Format
                </h3>
              </div>
              <div className="p-6">
                <div className="aspect-[21/9] bg-red-950/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-red-500/50 mx-auto mb-3" />
                    <p className="text-white font-medium">Run Distribution Chart</p>
                    <p className="text-gray-400 text-sm">Breakdown of runs by format and venue</p>
                  </div>
                </div>
              </div>
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
                  className="bg-gradient-to-br from-yellow-900/50 to-black/50 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-900/20 transition-all group"
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
                      <div className="w-16 h-16 rounded-full bg-yellow-900/50 flex items-center justify-center overflow-hidden ring-2 ring-yellow-500/30 group-hover:ring-yellow-500/50 transition-all">
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

            {/* Wicket Distribution */}
            <div className="bg-black/30 rounded-xl overflow-hidden mb-10">
              <div className="px-6 py-4 bg-yellow-800/30">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-yellow-400" /> Wicket Distribution by Format
                </h3>
              </div>
              <div className="p-6">
                <div className="aspect-[21/9] bg-yellow-950/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-yellow-500/50 mx-auto mb-3" />
                    <p className="text-white font-medium">Wicket Distribution Chart</p>
                    <p className="text-gray-400 text-sm">Breakdown of wickets by format and venue</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Compare Tab */}
        {activeTab === "compare" && (
          <section>
            <div className="bg-black/30 rounded-xl overflow-hidden mb-10">
              <div className="px-6 py-4 bg-purple-800/30">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5 text-purple-400" /> Player Comparison
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white mb-2 font-medium">Select First Player</label>
                    <select className="w-full bg-purple-950/50 border border-purple-800/50 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <option>Shakib Al Hasan</option>
                      <option>Tamim Iqbal</option>
                      <option>Mushfiqur Rahim</option>
                      <option>Mahmudullah</option>
                      <option>Mustafizur Rahman</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white mb-2 font-medium">Select Second Player</label>
                    <select className="w-full bg-purple-950/50 border border-purple-800/50 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <option>Tamim Iqbal</option>
                      <option>Shakib Al Hasan</option>
                      <option>Mushfiqur Rahim</option>
                      <option>Mahmudullah</option>
                      <option>Mustafizur Rahman</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-purple-950/20 rounded-lg p-6 border border-purple-800/30">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-full bg-purple-900/50 flex items-center justify-center overflow-hidden ring-2 ring-purple-500/30">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt="Shakib Al Hasan"
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Shakib Al Hasan</h4>
                        <p className="text-gray-300 text-sm">All-rounder • 2006-Present</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Matches</span>
                          <span className="text-white font-medium">412</span>
                        </div>
                        <div className="w-full bg-purple-950/50 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Runs</span>
                          <span className="text-white font-medium">12,467</span>
                        </div>
                        <div className="w-full bg-purple-950/50 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Wickets</span>
                          <span className="text-white font-medium">634</span>
                        </div>
                        <div className="w-full bg-purple-950/50 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Average</span>
                          <span className="text-white font-medium">36.5</span>
                        </div>
                        <div className="w-full bg-purple-950/50 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Strike Rate</span>
                          <span className="text-white font-medium">98.7</span>
                        </div>
                        <div className="w-full bg-purple-950/50 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-950/20 rounded-lg p-6 border border-purple-800/30">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-full bg-purple-900/50 flex items-center justify-center overflow-hidden ring-2 ring-purple-500/30">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt="Tamim Iqbal"
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Tamim Iqbal</h4>
                        <p className="text-gray-300 text-sm">Opening Batsman • 2007-Present</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Matches</span>
                          <span className="text-white font-medium">375</span>
                        </div>
                        <div className="w-full bg-purple-950/50 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Runs</span>
                          <span className="text-white font-medium">14,778</span>
                        </div>
                        <div className="w-full bg-purple-950/50 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Wickets</span>
                          <span className="text-white font-medium">0</span>
                        </div>
                        <div className="w-full bg-purple-950/50 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "0%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Average</span>
                          <span className="text-white font-medium">38.2</span>
                        </div>
                        <div className="w-full bg-purple-950/50 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "79%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Strike Rate</span>
                          <span className="text-white font-medium">78.3</span>
                        </div>
                        <div className="w-full bg-purple-950/50 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-purple-950/20 rounded-lg p-6 border border-purple-800/30">
                  <h4 className="text-lg font-bold text-white mb-4">Head-to-Head Comparison</h4>
                  <div className="aspect-[21/9] bg-purple-950/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart2 className="h-12 w-12 text-purple-500/50 mx-auto mb-3" />
                      <p className="text-white font-medium">Performance Comparison Chart</p>
                      <p className="text-gray-400 text-sm">Detailed statistical comparison between selected players</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Player Modal */}
        {showPlayerModal && selectedPlayer && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-emerald-900/90 to-black/90 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-emerald-900/50 flex items-center justify-center overflow-hidden ring-2 ring-emerald-500/30">
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-black/30 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-white mb-3">{selectedPlayer.title}</h3>
                    <div className="text-5xl font-bold text-emerald-400 mb-4">{selectedPlayer.value}</div>
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
                    <div className="bg-emerald-900/30 p-3 rounded-lg">
                      <h4 className="font-medium text-white">Test</h4>
                      <div className="text-2xl font-bold text-emerald-400 mt-1">127 Matches</div>
                      <p className="text-sm text-gray-300">Avg: 39.2</p>
                    </div>
                    <div className="bg-emerald-900/30 p-3 rounded-lg">
                      <h4 className="font-medium text-white">ODI</h4>
                      <div className="text-2xl font-bold text-emerald-400 mt-1">228 Matches</div>
                      <p className="text-sm text-gray-300">Avg: 37.8</p>
                    </div>
                    <div className="bg-emerald-900/30 p-3 rounded-lg">
                      <h4 className="font-medium text-white">T20I</h4>
                      <div className="text-2xl font-bold text-emerald-400 mt-1">112 Matches</div>
                      <p className="text-sm text-gray-300">Avg: 29.4</p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-white mb-3">Career Milestones</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center shrink-0">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">First century against Australia</p>
                        <p className="text-gray-300 text-sm">Melbourne Cricket Ground, 2017</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center shrink-0">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">5-wicket haul against India</p>
                        <p className="text-gray-300 text-sm">Shere Bangla Stadium, 2022</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center shrink-0">
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
    case "users":
      return <Users className={className} />
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

// Sample data
const generalStatsData = [
  {
    title: "Most Matches Played",
    description: "Total international matches across all formats",
    player: "Mushfiqur Rahim",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "412",
    additionalInfo: "2005-Present",
    icon: "users",
  },
  {
    title: "Most Matches as Captain",
    description: "Total matches led as captain",
    player: "Mashrafe Mortaza",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "134",
    additionalInfo: "2010-2020",
    icon: "user",
  },
]

const battingStatsData = [
  {
    title: "Highest Total Runs",
    description: "Career runs across all formats",
    player: "Tamim Iqbal",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "14,778",
    additionalInfo: "2007-Present",
    icon: "barChart",
  },
  {
    title: "Highest Score in a Match",
    description: "Most runs in a single innings",
    player: "Liton Das",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "176",
    additionalInfo: "vs Zimbabwe, 2020",
    icon: "trophy",
  },
  {
    title: "Most Centuries",
    description: "Total 100+ scores in international cricket",
    player: "Tamim Iqbal",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "25",
    additionalInfo: "13 in ODIs, 10 in Tests, 2 in T20Is",
    icon: "award",
  },
  {
    title: "Most Half-Centuries",
    description: "Total 50+ scores in international cricket",
    player: "Shakib Al Hasan",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "87",
    additionalInfo: "53 in ODIs, 30 in Tests, 4 in T20Is",
    icon: "target",
  },
  {
    title: "Highest Strike Rate",
    description: "Minimum 1000 runs",
    player: "Mahmudullah",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "127.8",
    additionalInfo: "T20 International format",
    icon: "zap",
  },
  {
    title: "Highest Average",
    description: "Minimum 20 innings",
    player: "Mushfiqur Rahim",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "36.78",
    additionalInfo: "All formats combined",
    icon: "percent",
  },
]

const bowlingStatsData = [
  {
    title: "Highest Wickets",
    description: "Career wickets across all formats",
    player: "Shakib Al Hasan",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "634",
    additionalInfo: "2006-Present",
    icon: "trophy",
  },
  {
    title: "Best Bowling Average",
    description: "Minimum 50 wickets",
    player: "Mustafizur Rahman",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "21.45",
    additionalInfo: "All formats combined",
    icon: "percent",
  },
  {
    title: "Best Bowling Figures",
    description: "Best performance in a single innings",
    player: "Taijul Islam",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "8/39",
    additionalInfo: "vs Zimbabwe, 2014",
    icon: "award",
  },
  {
    title: "Most 5-Wicket Hauls",
    description: "5+ wickets in a single innings",
    player: "Shakib Al Hasan",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "18",
    additionalInfo: "All formats combined",
    icon: "target",
  },
  {
    title: "Most 10-Wicket Matches",
    description: "10+ wickets in a single match",
    player: "Shakib Al Hasan",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "5",
    additionalInfo: "Test matches only",
    icon: "zap",
  },
  {
    title: "Best Economy Rate",
    description: "Minimum 50 wickets",
    player: "Mehidy Hasan",
    playerImage: "/placeholder.svg?height=64&width=64",
    value: "4.25",
    additionalInfo: "ODI format",
    icon: "clock",
  },
]

const recentWins = [
  {
    opponent: "India",
    format: "ODI",
    date: "March 19, 2023",
    venue: "home",
    location: "Dhaka",
    bangladeshScore: "242/7 (50 overs)",
    opponentScore: "238/10 (49.2 overs)",
    result: "Won by 4 runs",
    playerOfMatch: "Shakib Al Hasan (87 runs, 2 wickets)",
  },
  {
    opponent: "England",
    format: "Test",
    date: "March 12, 2023",
    venue: "home",
    location: "Chattogram",
    bangladeshScore: "382 & 245",
    opponentScore: "293 & 227",
    result: "Won by 107 runs",
    playerOfMatch: "Mehidy Hasan (6/82 & 4/84)",
  },
  {
    opponent: "South Africa",
    format: "ODI",
    date: "March 23, 2022",
    venue: "away",
    location: "Centurion",
    bangladeshScore: "314/7 (50 overs)",
    opponentScore: "276/10 (48.5 overs)",
    result: "Won by 38 runs",
    playerOfMatch: "Taskin Ahmed (5/35)",
  },
  {
    opponent: "New Zealand",
    format: "T20I",
    date: "September 8, 2021",
    venue: "neutral",
    location: "Dubai",
    bangladeshScore: "173/5 (20 overs)",
    opponentScore: "164/8 (20 overs)",
    result: "Won by 9 runs",
    playerOfMatch: "Mahmudullah (52 runs)",
  },
  {
    opponent: "Australia",
    format: "T20I",
    date: "August 7, 2021",
    venue: "home",
    location: "Dhaka",
    bangladeshScore: "131/7 (20 overs)",
    opponentScore: "108/10 (19.3 overs)",
    result: "Won by 23 runs",
    playerOfMatch: "Mustafizur Rahman (4/26)",
  },
]
