"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Filter, Trophy, BarChart3, TrendingUp, PieChartIcon } from "lucide-react"
import PieChart from "@/components/PieChart"
import LineChart from "@/components/LineChart"
import HorizontalBarChart from "@/components/HorizontalBarChart"

export default function Head2Head() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [opponents, setOpponents] = useState([])
  const [selectedOpponent, setSelectedOpponent] = useState("")
  const [opponentStats, setOpponentStats] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [matchType, setMatchType] = useState("all")
  const [location, setLocation] = useState("all")

  // Function to toggle the drawer state
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  // Fetch the list of opponents
  useEffect(() => {
    async function fetchOpponents() {
      try {
        // For demo purposes, we'll use mock data
        const mockOpponents = [
          { Opponent: "India" },
          { Opponent: "Pakistan" },
          { Opponent: "Australia" },
          { Opponent: "England" },
          { Opponent: "South Africa" },
          { Opponent: "New Zealand" },
          { Opponent: "Sri Lanka" },
          { Opponent: "West Indies" },
          { Opponent: "Afghanistan" },
          { Opponent: "Zimbabwe" },
        ]
        setOpponents(mockOpponents)

        // In a real app, you would fetch from API:
        // const response = await fetch("/api/matches");
        // const data = await response.json();
        // setOpponents(data);
      } catch (error) {
        console.error("Error fetching opponents:", error)
      }
    }
    fetchOpponents()
  }, [])

  // Fetch opponent stats when an opponent is selected
  useEffect(() => {
    if (!selectedOpponent) return

    async function fetchOpponentStats() {
      try {
        // For demo purposes, we'll use mock data
        const mockStats = {
          totalMatchesPlayed: 45,
          won: 18,
          lost: 25,
          tied: 2,
          highestInnings: 342,
          lowestInnings: 124,
          totalRunsAgainst: 8765,
          matchesData: [
            { date: "2020-01", runs: 245 },
            { date: "2020-02", runs: 267 },
            { date: "2020-03", runs: 312 },
            { date: "2020-04", runs: 289 },
            { date: "2020-05", runs: 342 },
            { date: "2020-06", runs: 276 },
          ],
          barData: [
            { label: "Runs Scored", value: 8765 },
            { label: "Wickets Taken", value: 342 },
            { label: "Centuries", value: 15 },
            { label: "Half Centuries", value: 47 },
            { label: "Highest Partnership", value: 224 },
          ],
        }
        setOpponentStats(mockStats)

        // In a real app, you would fetch from API:
        // const response = await fetch(`/api/matches/stats?opponent=${encodeURIComponent(selectedOpponent)}`);
        // const data = await response.json();
        // const stats = data[`GetOpponentStats(?)`];
        // if (stats) {
        //   setOpponentStats(stats);
        // }
      } catch (error) {
        console.error("Error fetching opponent stats:", error)
      }
    }
    fetchOpponentStats()
  }, [selectedOpponent])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-900 to-black">
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
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Head2Head Statistics</h1>
              <p className="text-gray-200 text-lg mb-6">
                Explore comprehensive statistics of Bangladesh Cricket Team against other teams
              </p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">Select Opponent</label>
                <select
                  value={selectedOpponent}
                  onChange={(e) => setSelectedOpponent(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-800 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                >
                  <option value="">Select Opponent</option>
                  {opponents.map((match) => (
                    <option key={match.Opponent} value={match.Opponent}>
                      {match.Opponent}
                    </option>
                  ))}
                </select>
              </div>

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
            </div>
          </div>
        </div>

        {/* Display selected opponent */}
        {selectedOpponent && (
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white">{selectedOpponent}</h2>
            <p className="text-gray-300 mt-2">Head to Head Statistics</p>
          </div>
        )}

        {/* Display opponent statistics */}
        {opponentStats && (
          <div className="mb-10">
            <div className="bg-emerald-800/30 rounded-xl overflow-hidden">
              <div className="px-6 py-4 bg-emerald-800/50">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-emerald-400" /> Match Statistics
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-emerald-900/30 rounded-lg p-4 text-center">
                    <p className="text-gray-300 mb-1">Total Matches</p>
                    <p className="text-3xl font-bold text-white">{opponentStats.totalMatchesPlayed}</p>
                  </div>
                  <div className="bg-emerald-900/30 rounded-lg p-4 text-center">
                    <p className="text-gray-300 mb-1">Matches Won</p>
                    <p className="text-3xl font-bold text-emerald-400">{opponentStats.won}</p>
                  </div>
                  <div className="bg-emerald-900/30 rounded-lg p-4 text-center">
                    <p className="text-gray-300 mb-1">Matches Lost</p>
                    <p className="text-3xl font-bold text-red-400">{opponentStats.lost}</p>
                  </div>
                  <div className="bg-emerald-900/30 rounded-lg p-4 text-center">
                    <p className="text-gray-300 mb-1">Matches Tied</p>
                    <p className="text-3xl font-bold text-yellow-400">{opponentStats.tied}</p>
                  </div>
                  <div className="bg-emerald-900/30 rounded-lg p-4 text-center">
                    <p className="text-gray-300 mb-1">Highest Innings</p>
                    <p className="text-3xl font-bold text-white">{opponentStats.highestInnings}</p>
                  </div>
                  <div className="bg-emerald-900/30 rounded-lg p-4 text-center">
                    <p className="text-gray-300 mb-1">Lowest Innings</p>
                    <p className="text-3xl font-bold text-white">{opponentStats.lowestInnings}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        {opponentStats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Win Loss Distribution */}
            <div className="bg-black/30 rounded-xl overflow-hidden">
              <div className="px-6 py-4 bg-emerald-800/30">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-emerald-400" /> Win Loss Distribution
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center">
                <div className="w-64 h-64">
                  <PieChart stats={opponentStats} />
                </div>
              </div>
            </div>

            {/* Innings Performance */}
            <div className="bg-black/30 rounded-xl overflow-hidden">
              <div className="px-6 py-4 bg-emerald-800/30">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" /> Innings Performance
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center">
                <div className="w-full h-64">
                  <LineChart stats={opponentStats} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Match Stats Overview */}
        {opponentStats && (
          <div className="bg-black/30 rounded-xl overflow-hidden mb-10">
            <div className="px-6 py-4 bg-emerald-800/30">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-400" /> Match Stats Overview
              </h3>
            </div>
            <div className="p-6 flex items-center justify-center">
              <div className="w-full h-80">
                <HorizontalBarChart stats={opponentStats} />
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
