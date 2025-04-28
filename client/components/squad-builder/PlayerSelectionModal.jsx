"use client"
import { useState, useEffect } from "react"
import { X, Search, ChevronDown, SortAsc, SortDesc } from "lucide-react"
import Image from "next/image"

export default function PlayerSelectionModal({ onClose, onPlayerSelect }) {
  const [players, setPlayers] = useState([])
  const [filteredPlayers, setFilteredPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter states
  const [playerStatus, setPlayerStatus] = useState("playing")
  const [format, setFormat] = useState("all")
  const [role, setRole] = useState("all")
  const [sortBy, setSortBy] = useState("none")
  const [sortOrder, setSortOrder] = useState("DESC")

  useEffect(() => {
    fetchPlayers()
  }, [])

  const fetchPlayers = async () => {
    try {
      setLoading(true)
      // In a real app, this would be an actual API call
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/players/playersinfosquadgen`);
       const data = await response.json();

      // Mock data for players
      /* const data = [
        {
          id: 1,
          name: "Tanim Iqbal",
          role: "Batsman",
          status: "playing",
          formats: ["Test", "ODI", "T20"],
          stats: {
            highestRuns: 158,
            highestWickets: 0,
            matchesPlayed: 375,
            highestDismissals: 0,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 2,
          name: "Shakib Al Hasan",
          role: "All-rounder",
          status: "playing",
          formats: ["Test", "ODI", "T20"],
          stats: {
            highestRuns: 124,
            highestWickets: 5,
            matchesPlayed: 400,
            highestDismissals: 0,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 3,
          name: "Mushfiqur Rahim",
          role: "Wicketkeeper",
          status: "playing",
          formats: ["Test", "ODI", "T20"],
          stats: {
            highestRuns: 144,
            highestWickets: 0,
            matchesPlayed: 380,
            highestDismissals: 6,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 4,
          name: "Mashrafe Mortaza",
          role: "Bowler",
          status: "retired",
          formats: ["ODI", "T20"],
          stats: {
            highestRuns: 51,
            highestWickets: 6,
            matchesPlayed: 220,
            highestDismissals: 0,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 5,
          name: "Mustafizur Rahman",
          role: "Bowler",
          status: "playing",
          formats: ["Test", "ODI", "T20"],
          stats: {
            highestRuns: 29,
            highestWickets: 6,
            matchesPlayed: 150,
            highestDismissals: 0,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 6,
          name: "Liton Das",
          role: "Wicketkeeper",
          status: "playing",
          formats: ["Test", "ODI", "T20"],
          stats: {
            highestRuns: 176,
            highestWickets: 0,
            matchesPlayed: 155,
            highestDismissals: 6,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 7,
          name: "Mahmudullah",
          role: "All-rounder",
          status: "playing",
          formats: ["Test", "ODI", "T20"],
          stats: {
            highestRuns: 128,
            highestWickets: 4,
            matchesPlayed: 310,
            highestDismissals: 0,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 8,
          name: "Mohammad Ashraful",
          role: "Batsman",
          status: "retired",
          formats: ["Test", "ODI", "T20"],
          stats: {
            highestRuns: 158,
            highestWickets: 1,
            matchesPlayed: 261,
            highestDismissals: 0,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 9,
          name: "Taskin Ahmed",
          role: "Bowler",
          status: "playing",
          formats: ["Test", "ODI", "T20"],
          stats: {
            highestRuns: 33,
            highestWickets: 5,
            matchesPlayed: 110,
            highestDismissals: 0,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 10,
          name: "Mehidy Hasan Miraz",
          role: "All-rounder",
          status: "playing",
          formats: ["Test", "ODI", "T20"],
          stats: {
            highestRuns: 103,
            highestWickets: 7,
            matchesPlayed: 145,
            highestDismissals: 0,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 11,
          name: "Soumya Sarkar",
          role: "Batsman",
          status: "playing",
          formats: ["ODI", "T20"],
          stats: {
            highestRuns: 127,
            highestWickets: 1,
            matchesPlayed: 155,
            highestDismissals: 0,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 12,
          name: "Sabbir Rahman",
          role: "Batsman",
          status: "playing",
          formats: ["ODI", "T20"],
          stats: {
            highestRuns: 102,
            highestWickets: 0,
            matchesPlayed: 140,
            highestDismissals: 0,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 13,
          name: "Abdur Razzak",
          role: "Bowler",
          status: "retired",
          formats: ["Test", "ODI", "T20"],
          stats: {
            highestRuns: 43,
            highestWickets: 5,
            matchesPlayed: 153,
            highestDismissals: 0,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 14,
          name: "Rubel Hossain",
          role: "Bowler",
          status: "playing",
          formats: ["Test", "ODI", "T20"],
          stats: {
            highestRuns: 27,
            highestWickets: 6,
            matchesPlayed: 159,
            highestDismissals: 0,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 15,
          name: "Imrul Kayes",
          role: "Batsman",
          status: "retired",
          formats: ["Test", "ODI"],
          stats: {
            highestRuns: 144,
            highestWickets: 0,
            matchesPlayed: 134,
            highestDismissals: 0,
          },
          image: "/placeholder.svg?height=300&width=300",
        },
      ] */

      setPlayers(data)
      setFilteredPlayers(data)
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch players")
      setLoading(false)
      console.error(err)
    }
  }

  // Apply filters
  useEffect(() => {
    if (players.length === 0) return

    let result = [...players]

    // Filter by status
    if (playerStatus !== "both") {
      result = result.filter((player) => player.status === playerStatus)
    }

    // Filter by format
    if (format !== "all") {
      result = result.filter((player) => player.formats.includes(format))
    }

    // Filter by role
    if (role !== "all") {
      result = result.filter((player) => player.role === role)
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter((player) => player.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Sort by selected field
    if (sortBy !== "none") {
      result.sort((a, b) => {
        let valueA, valueB

        switch (sortBy) {
          case "highestruns":
            valueA = a.stats.highestRuns
            valueB = b.stats.highestRuns
            break
          case "highestwickets":
            valueA = a.stats.highestWickets
            valueB = b.stats.highestWickets
            break
          case "highestmatchesplayed":
            valueA = a.stats.matchesPlayed
            valueB = b.stats.matchesPlayed
            break
          case "highestdismissals":
            valueA = a.stats.highestDismissals
            valueB = b.stats.highestDismissals
            break
          default:
            return 0
        }

        if (sortOrder === "ASC") {
          return valueA - valueB
        } else {
          return valueB - valueA
        }
      })
    }

    setFilteredPlayers(result)
  }, [players, playerStatus, format, role, sortBy, sortOrder, searchQuery])

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#1c1c1c] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-slideInUp">
        {/* Header */}
        <div className="bg-[#006a4e] p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Select Player</h2>
          <button
            onClick={onClose}
            className="bg-black/20 text-white p-2 rounded-full hover:bg-black/40 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-[#333]">
          <div className="flex items-center mb-4 relative">
            <Search className="absolute left-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search players..."
              className="w-full bg-[#333] text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffde00]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* Player Status Filter */}
            <div className="relative">
              <label className="block text-xs font-medium text-[#ffde00] mb-1">Status</label>
              <div className="relative">
                <select
                  className="w-full bg-[#333] text-white border border-[#006a4e] rounded-md py-1.5 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ffde00] text-sm"
                  value={playerStatus}
                  onChange={(e) => setPlayerStatus(e.target.value)}
                >
                  <option value="playing">Playing</option>
                  <option value="retired">Retired</option>
                  <option value="both">Both</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                  size={14}
                />
              </div>
            </div>

            {/* Format Filter */}
            <div className="relative">
              <label className="block text-xs font-medium text-[#ffde00] mb-1">Format</label>
              <div className="relative">
                <select
                  className="w-full bg-[#333] text-white border border-[#006a4e] rounded-md py-1.5 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ffde00] text-sm"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <option value="all">All Formats</option>
                  <option value="Test">Test</option>
                  <option value="ODI">ODI</option>
                  <option value="T20">T20</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                  size={14}
                />
              </div>
            </div>

            {/* Role Filter */}
            <div className="relative">
              <label className="block text-xs font-medium text-[#ffde00] mb-1">Role</label>
              <div className="relative">
                <select
                  className="w-full bg-[#333] text-white border border-[#006a4e] rounded-md py-1.5 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ffde00] text-sm"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-rounder">All-rounder</option>
                  <option value="Wicketkeeper">Wicketkeeper</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                  size={14}
                />
              </div>
            </div>

            {/* Sort By */}
            <div className="relative">
              <label className="block text-xs font-medium text-[#ffde00] mb-1">Sort By</label>
              <div className="relative">
                <select
                  className="w-full bg-[#333] text-white border border-[#006a4e] rounded-md py-1.5 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ffde00] text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="none">None</option>
                  <option value="highestruns">Highest Runs</option>
                  <option value="highestwickets">Highest Wickets</option>
                  <option value="highestmatchesplayed">Matches Played</option>
                  <option value="highestdismissals">Highest Dismissals</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                  size={14}
                />
              </div>
            </div>

            {/* Sort Order */}
            <div className="relative">
              <label className="block text-xs font-medium text-[#ffde00] mb-1">Sort Order</label>
              <div className="relative">
                <select
                  className="w-full bg-[#333] text-white border border-[#006a4e] rounded-md py-1.5 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ffde00] text-sm"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="DESC">Descending</option>
                  <option value="ASC">Ascending</option>
                </select>
                {sortOrder === "DESC" ? (
                  <SortDesc
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                    size={14}
                  />
                ) : (
                  <SortAsc
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                    size={14}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Players List */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffde00]"></div>
            </div>
          ) : error ? (
            <div className="bg-[#f42a41]/20 text-white p-4 rounded-md">
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="text-sm text-gray-400 mb-4">
                Showing {filteredPlayers.length} of {players.length} players
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="bg-[#333] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-[#444]"
                    onClick={() => onPlayerSelect(player)}
                  >
                    <div className="relative h-32">
                      <Image
                        src={player.image || "/placeholder.svg?height=300&width=300"}
                        alt={player.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute top-2 right-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            player.status === "playing" ? "bg-[#006a4e] text-white" : "bg-[#f42a41]/70 text-white"
                          }`}
                        >
                          {player.status === "playing" ? "Active" : "Retired"}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-base font-bold text-white mb-0 truncate">{player.name}</h3>
                        <p className="text-xs text-gray-300">{player.role}</p>
                      </div>
                    </div>
                    <div className="p-2 border-t border-[#006a4e]">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-gray-400">Matches</p>
                          <p className="font-bold text-white">{player.stats.matchesPlayed}</p>
                        </div>
                        {player.role === "Batsman" ||
                        player.role === "All-rounder" ||
                        player.role === "Wicketkeeper" ? (
                          <div>
                            <p className="text-gray-400">Highest</p>
                            <p className="font-bold text-[#ffde00]">{player.stats.highestRuns}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-400">Wickets</p>
                            <p className="font-bold text-[#ffde00]">{player.stats.highestWickets}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPlayers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400">No players found matching your filters.</p>
                  <button
                    className="mt-4 px-4 py-2 bg-[#006a4e] text-white rounded-md hover:bg-[#005a42] transition-colors"
                    onClick={() => {
                      setPlayerStatus("both")
                      setFormat("all")
                      setRole("all")
                      setSortBy("none")
                      setSearchQuery("")
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
