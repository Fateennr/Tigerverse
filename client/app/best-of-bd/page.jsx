"use client"
import { useState, useEffect } from "react"
import { ChevronDown, Filter, Trophy, MapPin, SortAsc, SortDesc } from "lucide-react"
import MatchCard from "@/components/matches/MatchCard"
import MatchDetails from "@/components/matches/MatchDetails"

export default function BestOfBDPage() {
  const [matches, setMatches] = useState([])
  const [filteredMatches, setFilteredMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // Filter states
  const [venues, setVenues] = useState([])
  const [opponents, setOpponents] = useState([])
  const [selectedVenue, setSelectedVenue] = useState("all")
  const [selectedFormat, setSelectedFormat] = useState("all")
  const [selectedOpponent, setSelectedOpponent] = useState("all")
  const [statType, setStatType] = useState("both")
  const [sortBy, setSortBy] = useState("winrun")
  const [sortOrder, setSortOrder] = useState("DESC")

  const buildUrl = () => {
    const params = new URLSearchParams({
      selectedVenue,
      selectedOpponent,
      selectedFormat,
      statType,
      sortBy,
      sortOrder,
    })
    return `${process.env.NEXT_PUBLIC_BACKEND_URI}/matches/all?${params.toString()}`
  }

  const processString = () =>{

  };


  const fetchMatches = async () => {
    setLoading(true)
    try {
      const url = buildUrl()
      const res = await fetch(url)
      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
  
      const processMatch = (item) => {
        const byWicket = item.Wonbywicket === 1 && item.Wonbyrun === 0
        let description, highlights
  
        if (item.Result === 'Bangladesh') {
          if (byWicket) {
            description = `Bangladesh won by ${item.Winwicket} wickets`
            highlights = `Bangladesh chased down ${item.Opponent}'s total with ${item.Winwicket} wickets`
          } else {
            description = `Bangladesh won by ${item.Winrun} runs`
            highlights = `Bangladesh stopped ${item.Opponent} before ${item.Winrun} runs`
          }
        } else {
          if (byWicket) {
            description = `${item.Opponent} won by ${item.Winwicket} wickets`
            highlights = `${item.Opponent} chased down Bangladesh's total with ${item.Winwicket} wickets`
          } else {
            description = `${item.Opponent} won by ${item.Winrun} runs`
            highlights = `${item.Opponent} stopped Bangladesh before ${item.Winrun} runs`
          }
        }
  
        return {
          id:             item.ID,
          opponent:       item.Opponent,
          format:         item.Type,
          date:           item.Date,
          description,
          bdScore:        `${item.Score_BD_Run}/${item.Score_BD_wicket}`,
          opponentScore:  `${item.Score_Opp_Run}/${item.Score_Opp_wicket}`,
          winrun:         item.Winrun,
          winwicket:      item.Winwicket,
          matchLength:    item.Score_BD_Over_Played + item.Score_Opp_Over_Played,
          highestrun:     Math.max(item.Score_BD_Run, item.Score_Opp_Run),
          motm:           'Everyone',          // or derive this too
          image:          '/stadium.webp',
          highlights
        }
      }
  
      const matchesArray = data.map(processMatch)
      setMatches(matchesArray)
      setFilteredMatches(matchesArray)
      setError(null)
    } catch (err) {
      console.error("Failed to fetch matches data", err)
      setError("Could not load match")
    } finally {
      setLoading(false)
    }
  }
  


  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // const matchesResponse = await fetch(`${process.env.BACKEND_URI}/matches`)

        const venues = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/services/venues`
        ) || [];

  
        const opponents = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/services/opponents`
        ) || [];

        const rawVenue = await venues.json()
  
        const venueArray = rawVenue.map((item, idx) => ({
          id: idx + 1,
          name: item.Venue
        }))
  
        const rawOpponent = await opponents.json()
  
        const opponentArray = rawOpponent.map((item, idx) => ({
          id: idx + 1,
          name: item.Opponent
        }))

        setVenues(venueArray);
        setOpponents(opponentArray);
        fetchMatches();
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch data")
        setLoading(false)
        console.error(err)
      }
    }

    fetchData()
  }, [])

  // Apply filters
  useEffect(() => {
    fetchMatches();
  }, [selectedVenue, selectedFormat, selectedOpponent, statType, sortBy, sortOrder])

  const handleMatchClick = (match) => {
    setSelectedMatch(match)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1c1c1c] to-[#006a4e]">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          <span className="text-white">Best of </span>
          <span className="text-[#f42a41]">Bangladesh </span>
          <span className="text-[#ffde00]">Cricket</span>
        </h1>

        {/* Filters Section */}
        <div className="bg-[#006a4e]/30 backdrop-blur-sm rounded-lg p-6 mb-8 border-l-4 border-[#f42a41] shadow-lg animate-fadeIn">
          <div className="flex items-center mb-4">
            <Filter className="text-[#ffde00] mr-2" />
            <h2 className="text-xl font-semibold text-white">Filter Matches</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Venue Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#ffde00] mb-1">Venue</label>
              <div className="relative">
                <select
                  className="w-full bg-[#1c1c1c] text-white border border-[#006a4e] rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ffde00] transition-all"
                  value={selectedVenue}
                  onChange={(e) => setSelectedVenue(e.target.value)}
                >
                  <option value="all">All Venues</option>
                  {venues.map((venue) => (
                    <option key={venue.id} value={venue.name}>
                      {venue.name}
                    </option>
                  ))}
                </select>
                <MapPin
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* Format Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#ffde00] mb-1">Format</label>
              <div className="relative">
                <select
                  className="w-full bg-[#1c1c1c] text-white border border-[#006a4e] rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ffde00] transition-all"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                >
                  <option value="ALL">All Formats</option>
                  <option value="TEST">Test</option>
                  <option value="ODI">ODI</option>
                  <option value="T20">T20</option>
                </select>
                <Trophy
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* Opponent Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#ffde00] mb-1">Opponent</label>
              <div className="relative">
                <select
                  className="w-full bg-[#1c1c1c] text-white border border-[#006a4e] rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ffde00] transition-all"
                  value={selectedOpponent}
                  onChange={(e) => setSelectedOpponent(e.target.value)}
                >
                  <option value="all">All Opponents</option>
                  {opponents.map((opponent) => (
                    <option key={opponent.id} value={opponent.name}>
                      {opponent.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* Stat Type */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#ffde00] mb-1">Stat Type</label>
              <div className="relative">
                <select
                  className="w-full bg-[#1c1c1c] text-white border border-[#006a4e] rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ffde00] transition-all"
                  value={statType}
                  onChange={(e) => setStatType(e.target.value)}
                >
                  <option value="both">Both</option>
                  <option value="run">Run</option>
                  <option value="wicket">Wicket</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffde00] pointer-events-none"
                  size={16}
                />
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
                  <option value="winrun">Win by Runs</option>
                  <option value="winwicket">Win by Wickets</option>
                  <option value="longest">Match Length</option>
                  <option value="highestrun">Highest Run</option>
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
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-white">
          <p className="text-sm">
            Showing <span className="font-bold text-[#ffde00]">{filteredMatches.length}</span> matches
          </p>
        </div>

        {/* Matches Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffde00]"></div>
          </div>
        ) : error ? (
          <div className="bg-[#f42a41]/20 text-white p-4 rounded-md">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} onClick={() => handleMatchClick(match)} />
            ))}
          </div>
        )}

        {filteredMatches.length === 0 && !loading && !error && (
          <div className="bg-[#1c1c1c]/50 rounded-lg p-8 text-center">
            <p className="text-white text-lg">No matches found with the selected filters.</p>
            <button
              className="mt-4 px-4 py-2 bg-[#006a4e] hover:bg-[#005a42] text-white rounded-md transition-colors"
              onClick={() => {
                setSelectedVenue("all")
                setSelectedFormat("all")
                setSelectedOpponent("all")
                setStatType("both")
                setSortBy("winrun")
                setSortOrder("DESC")
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Match Details Modal */}
      {showDetails && selectedMatch && <MatchDetails match={selectedMatch} onClose={closeDetails} />}
    </main>
  )
}
