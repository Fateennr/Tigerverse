"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronDown,
  Filter,
  Trophy,
  BarChart3,
  TrendingUp,
  PieChartIcon,
} from "lucide-react"
import PieChart from "@/components/PieChart"
import LineChart from "@/components/LineChart"
import HorizontalBarChart from "@/components/HorizontalBarChart"

export default function Head2Head() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [opponents] = useState([
    "India",
    "Pakistan",
    "Sri Lanka",
    "Australia",
    "Zimbabwe",
  ])
  const [selectedOpponent, setSelectedOpponent] = useState("")
  const [matchType, setMatchType] = useState("all")
  const [location, setLocation] = useState("all")
  const [opponentStats, setOpponentStats] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!selectedOpponent) {
      setOpponentStats(null)
      setError("")
      return
    }

    const fetchStats = async () => {
      try {
        setError("")
        setOpponentStats(null)

        const params = new URLSearchParams()
        params.append("opponent", selectedOpponent)
        if (matchType !== "all") params.append("matchType", matchType)
        if (location !== "all") params.append("location", location)

        const url = `http://localhost:8080/h2h?${params.toString()}`
        const res = await fetch(url)
        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || `Status ${res.status}`)
        }
        const data = await res.json()

        setOpponentStats({
          totalMatchesPlayed: data.totalMatchesPlayed,
          won: data.won,
          lost: data.lost,
          tied: data.tied,
          highestInnings: data.highestInnings,
          lowestInnings: data.lowestInnings,
          totalRunsAgainst: data.totalRunsAgainst,
          matchesData: data.matchesData || [],
          barData:
            data.barData || [
              { label: "Runs Against", value: data.totalRunsAgainst },
              { label: "Won", value: data.won },
              { label: "Lost", value: data.lost },
            ],
        })
      } catch (err) {
        console.error(err)
        setError(err.message)
      }
    }

    fetchStats()
  }, [selectedOpponent, matchType, location])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-900 to-black">
      

      <main className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden mb-10">
          <div className="h-64 md:h-80">
            <Image
              src="/head2head.png"
              alt="Bangladesh Cricket Team"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/70 to-transparent flex items-center">
            <div className="px-6 md:px-10 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Head2Head Statistics
              </h1>
              <p className="text-gray-200 text-lg mb-6">
                Explore comprehensive stats of Bangladesh Cricket Team vs others
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="bg-gradient-to-r from-emerald-900/80 to-emerald-800/50 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Filter className="h-5 w-5" /> Filter & Compare
            </h2>
            <button
              onClick={() => setIsFilterOpen(o => !o)}
              className="md:hidden bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              Filters{" "}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          <div className={`p-6 ${isFilterOpen ? "block" : "hidden md:block"}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Opponent */}
              <div>
                <label className="block text-white mb-2 font-medium">
                  Select Opponent
                </label>
                <select
                  value={selectedOpponent}
                  onChange={e => setSelectedOpponent(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-800 text-white rounded-md px-3 py-2"
                >
                  <option value="">Select Opponent</option>
                  {opponents.map(o => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              {/* Match Format */}
              <div>
                <label className="block text-white mb-2 font-medium">
                  Match Format
                </label>
                <select
                  value={matchType}
                  onChange={e => setMatchType(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-800 text-white rounded-md px-3 py-2"
                >
                  <option value="all">All Formats</option>
                  <option value="test">Test</option>
                  <option value="odi">ODI</option>
                  <option value="t20i">T20I</option>
                </select>
              </div>

              {/* Venue */}
              <div>
                <label className="block text-white mb-2 font-medium">
                  Venue
                </label>
                <select
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-800 text-white rounded-md px-3 py-2"
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

        {/* Selected Opponent */}
        {selectedOpponent && (
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white">{selectedOpponent}</h2>
            <p className="text-gray-300 mt-2">Head to Head Statistics</p>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-red-400 text-center mb-6">Error: {error}</p>}

        {/* Stats & Charts */}
        {opponentStats ? (
          <div className="space-y-10">
            {/* Stat Cards */}
            <div className="bg-emerald-800/30 rounded-xl overflow-hidden">
              <div className="px-6 py-4 bg-emerald-800/50">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-emerald-400" /> Match Statistics
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  ["Total Matches", opponentStats.totalMatchesPlayed],
                  ["Matches Won", opponentStats.won],
                  ["Matches Lost", opponentStats.lost],
                  ["Matches Tied", opponentStats.tied],
                  ["Highest Innings", opponentStats.highestInnings],
                  ["Lowest Innings", opponentStats.lowestInnings],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="bg-emerald-900/30 rounded-lg p-4 text-center"
                  >
                    <p className="text-gray-300 mb-1">{label}</p>
                    <p className="text-3xl font-bold text-white">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Win/Loss & Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-black/30 rounded-xl overflow-hidden">
                <div className="px-6 py-4 bg-emerald-800/30">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-emerald-400" /> Win Loss Distribution
                  </h3>
                </div>
                <div className="p-6 flex justify-center">
                  <div className="w-64 h-64">
                    <PieChart stats={opponentStats} />
                  </div>
                </div>
              </div>

              <div className="bg-black/30 rounded-xl overflow-hidden">
                <div className="px-6 py-4 bg-emerald-800/30">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-400" /> Innings Performance
                  </h3>
                </div>
                <div className="p-6 flex justify-center">
                  <div className="w-full h-64">
                    <LineChart stats={opponentStats} />
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Chart */}
            <div className="bg-black/30 rounded-xl overflow-hidden">
              <div className="px-6 py-4 bg-emerald-800/30">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-400" /> Match Stats Overview
                </h3>
              </div>
              <div className="p-6 flex justify-center">
                <div className="w-full h-80">
                  <HorizontalBarChart stats={opponentStats} />
                </div>
              </div>
            </div>
          </div>
        ) : selectedOpponent && !error ? (
          <p className="text-center text-gray-400">Loading stats…</p>
        ) : null}
      </main>
    </div>
  )
}
