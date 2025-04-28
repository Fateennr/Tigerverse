"use client"
import { useState, useEffect } from "react"
import { ChevronDown, Filter, SortAsc, SortDesc } from "lucide-react"
import PlayerCard from "@/components/players/PlayerCard"
import PlayerDetails from "@/components/players/PlayerDetails"

export default function SquadPage() {
  const [players, setPlayers] = useState([])
  const [filteredPlayers, setFilteredPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // Filter states
  const [format, setFormat] = useState("all")
  const [span, setSpan] = useState("all")
  const [sortOrder, setSortOrder] = useState("DESC")
  const [sortBy, setSortBy] = useState("rank")
  const [spans, setSpans] = useState([])

  // Fetch players data
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/squad/latest-squad`);
        console.log(process.env.NEXT_PUBLIC_BACKEND_URI);
        const data = await response.json()
        console.log(data);

        setPlayers(data)
        setFilteredPlayers(data);
        console.log("filtered player is ", filteredPlayers);
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch players data")
        setLoading(false)
        console.error(err)
      }
    }

    const fetchSpans = async () => {
      try {
        // const response = await fetch(`${process.env.BACKEND_URI}/services/span`)
        // const data = await response.json()

        // Mock data for demonstration
        const data = [
          { id: 1, value: "2005-2010", label: "2005-2010" },
          { id: 2, value: "2010-2015", label: "2010-2015" },
          { id: 3, value: "2015-2020", label: "2015-2020" },
          { id: 4, value: "2020-present", label: "2020-present" },
          { id: 5, value: "all", label: "All Time" },
        ]

        setSpans(data)
      } catch (err) {
        console.error("Failed to fetch spans", err)
      }
    }

    fetchPlayers()
    fetchSpans()
  }, [])

  useEffect(() => {
    if (players.length === 0) return

    let result = [...players]

    // if (format !== "all") {
    //   result = result.filter((player) => player.formats.includes(format))
    // }
    // if (span !== "all") {
    //   result = result.filter((player) => player.span.includes(span))
    // }

    result.sort((a, b) => {
      if (sortOrder === "ASC") {
        return a[sortBy] - b[sortBy]
      } else {
        return b[sortBy] - a[sortBy]
      }
    })

    setFilteredPlayers(result)
  }, [players, format, span, sortOrder, sortBy])

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1c1c1c] to-[#006a4e]">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          <span className="text-white">Bangladesh </span>
          <span className="text-[#f42a41]">Cricket </span>
          <span className="text-[#ffde00]">Squad</span>
        </h1>

        {/* Filters Section */}
        <div className="bg-[#006a4e]/30 backdrop-blur-sm rounded-lg p-6 mb-8 border-l-4 border-[#f42a41] shadow-lg animate-fadeIn">
          <div className="flex items-center mb-4">
            <Filter className="text-[#ffde00] mr-2" />
            <h2 className="text-xl font-semibold text-white">Filter Squad</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Format Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#ffde00] mb-1">Format</label>
              <div className="relative">
                <select
                  className="w-full bg-[#1c1c1c] text-white border border-[#006a4e] rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ffde00] transition-all"
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
                  size={16}
                />
              </div>
            </div>

            {/* Span Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#ffde00] mb-1">Time Span</label>
              <div className="relative">
                <select
                  className="w-full bg-[#1c1c1c] text-white border border-[#006a4e] rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ffde00] transition-all"
                  value={span}
                  onChange={(e) => setSpan(e.target.value)}
                >
                  <option value="all">All Time</option>
                  {spans.map((s) => (
                    <option key={s.id} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* Sort Order */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#ffde00] mb-1">Sort Order</label>
              <div className="relative">
                <select
                  className="w-full bg-[#1c1c1c] text-white border border-[#006a4e] rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ffde00] transition-all"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="DESC">Descending</option>
                  <option value="ASC">Ascending</option>
                </select>
                {sortOrder === "DESC" ? (
                  <SortDesc
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                    size={16}
                  />
                ) : (
                  <SortAsc
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                    size={16}
                  />
                )}
              </div>
            </div>

            {/* Sort By */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#ffde00] mb-1">Sort By</label>
              <div className="relative">
                <select
                  className="w-full bg-[#1c1c1c] text-white border border-[#006a4e] rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ffde00] transition-all"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rank">Rank</option>
                  <option value="highestrun">Highest Run</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-white">
          <p className="text-sm">
            Showing <span className="font-bold text-[#ffde00]">{filteredPlayers.length}</span> players
          </p>
        </div>

        {/* Players Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffde00]"></div>
          </div>
        ) : error ? (
          <div className="bg-[#f42a41]/20 text-white p-4 rounded-md">
            <p>{error}</p>
          </div>
        ) : (
          <div className="mt-8 relative">
            {/* Cricket field background */}
            <div
              className="absolute inset-0 bg-[#006a4e]/30 rounded-full mx-auto my-8"
              style={{ width: "90%", height: "90%", maxWidth: "1200px", zIndex: 0 }}
            ></div>
            <div
              className="absolute inset-0 border-2 border-white/20 rounded-full mx-auto my-8"
              style={{ width: "70%", height: "70%", maxWidth: "900px", zIndex: 0 }}
            ></div>
            <div
              className="absolute inset-0 border-2 border-white/20 rounded-full mx-auto my-8"
              style={{ width: "40%", height: "40%", maxWidth: "500px", zIndex: 0 }}
            ></div>

            {/* Formation text */}
            <div className="text-center mb-8">
              <h3 className="text-xl text-white">
                Bangladesh Cricket <span className="text-[#ffde00]">Starting XI</span>
              </h3>
              <p className="text-sm text-gray-300">
                Showing top {Math.min(11, filteredPlayers.length)} players based on current filters
              </p>
            </div>

            {/* First row - 4 players */}
            <div className="flex justify-center mb-16 z-10 relative">
              {filteredPlayers.slice(0, 3).map((player, index) => (
                <div key={player.ID} className="mx-4 transform hover:scale-105 transition-all duration-300">
                  <PlayerCard player={player} onClick={() => handlePlayerClick(player)} />
                </div>
              ))}
            </div>

            {/* Second row - 5 players */}
            <div className="flex justify-center mb-16 z-10 relative">
              {filteredPlayers.slice(3, 8).map((player, index) => (
                <div key={player.ID} className="mx-4 transform hover:scale-105 transition-all duration-300">
                  <PlayerCard player={player} onClick={() => handlePlayerClick(player)} />
                </div>
              ))}
            </div>

            {/* Third row - 2 players */}
            <div className="flex justify-center z-10 relative">
              {filteredPlayers.slice(8, 11).map((player, index) => (
                <div key={player.ID} className="mx-4 transform hover:scale-105 transition-all duration-300">
                  <PlayerCard player={player} onClick={() => handlePlayerClick(player)} />
                </div>
              ))}
            </div>

            {/* Show remaining players if any */}
            {filteredPlayers.length > 11 && (
              <div className="mt-16 pt-8 border-t border-[#006a4e]">
                <h3 className="text-xl text-white mb-6">Reserve Players</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredPlayers.slice(11).map((player) => (
                    <PlayerCard key={player.ID} player={player} onClick={() => handlePlayerClick(player)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Player Details Modal */}
      {showDetails && selectedPlayer && <PlayerDetails player={selectedPlayer} onClose={closeDetails} />}
    </main>
  )
}
