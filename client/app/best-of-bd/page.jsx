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

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // In a real app, these would be actual API calls
        // const venuesResponse = await fetch(`${process.env.BACKEND_URI}/services/venues`)
        // const opponentsResponse = await fetch(`${process.env.BACKEND_URI}/services/opponents`)
        // const matchesResponse = await fetch(`${process.env.BACKEND_URI}/matches`)

        // Mock data for venues
        const venuesData = [
          { id: 1, name: "Shere Bangla National Stadium, Dhaka" },
          { id: 2, name: "Zahur Ahmed Chowdhury Stadium, Chattogram" },
          { id: 3, name: "Sylhet International Cricket Stadium" },
          { id: 4, name: "Sheikh Abu Naser Stadium, Khulna" },
          { id: 5, name: "Lords, London" },
          { id: 6, name: "Melbourne Cricket Ground" },
        ]

        // Mock data for opponents
        const opponentsData = [
          { id: 1, name: "India" },
          { id: 2, name: "Pakistan" },
          { id: 3, name: "Australia" },
          { id: 4, name: "England" },
          { id: 5, name: "New Zealand" },
          { id: 6, name: "South Africa" },
          { id: 7, name: "Sri Lanka" },
          { id: 8, name: "West Indies" },
          { id: 9, name: "Zimbabwe" },
          { id: 10, name: "Afghanistan" },
        ]

        // Mock data for matches
        const matchesData = [
          {
            id: 1,
            opponent: "India",
            format: "ODI",
            venue: "Shere Bangla National Stadium, Dhaka",
            date: "2023-12-10",
            result: "Bangladesh won by 6 wickets",
            bdScore: "256/4",
            opponentScore: "252/10",
            winrun: 6,
            winwicket: 6,
            matchLength: 87, // overs
            highestrun: 102, // highest individual score
            motm: "Shakib Al Hasan",
            image: "/placeholder.svg?height=300&width=500",
            highlights:
              "Bangladesh chased down India's total with 6 wickets in hand, thanks to a century from Shakib Al Hasan.",
          },
          {
            id: 2,
            opponent: "Pakistan",
            format: "T20",
            venue: "Zahur Ahmed Chowdhury Stadium, Chattogram",
            date: "2023-11-15",
            result: "Bangladesh won by 7 runs",
            bdScore: "176/7",
            opponentScore: "169/8",
            winrun: 7,
            winwicket: 2,
            matchLength: 40, // overs
            highestrun: 78, // highest individual score
            motm: "Mustafizur Rahman",
            image: "/placeholder.svg?height=300&width=500",
            highlights: "Mustafizur Rahman's 4 wickets helped Bangladesh defend their total against Pakistan.",
          },
          {
            id: 3,
            opponent: "Australia",
            format: "Test",
            venue: "Shere Bangla National Stadium, Dhaka",
            date: "2023-08-27",
            result: "Bangladesh won by 20 runs",
            bdScore: "260 & 200",
            opponentScore: "210 & 230",
            winrun: 20,
            winwicket: 0,
            matchLength: 4, // days
            highestrun: 114, // highest individual score
            motm: "Mehidy Hasan Miraz",
            image: "/placeholder.svg?height=300&width=500",
            highlights: "Historic Test win against Australia with Mehidy Hasan Miraz taking 8 wickets in the match.",
          },
          {
            id: 4,
            opponent: "England",
            format: "ODI",
            venue: "Lords, London",
            date: "2023-07-05",
            result: "Bangladesh won by 5 wickets",
            bdScore: "290/5",
            opponentScore: "289/8",
            winrun: 0,
            winwicket: 5,
            matchLength: 100, // overs
            highestrun: 95, // highest individual score
            motm: "Mushfiqur Rahim",
            image: "/placeholder.svg?height=300&width=500",
            highlights:
              "Bangladesh chased down England's total at the iconic Lord's stadium with Mushfiqur Rahim scoring 95.",
          },
          {
            id: 5,
            opponent: "New Zealand",
            format: "T20",
            venue: "Sylhet International Cricket Stadium",
            date: "2023-09-12",
            result: "Bangladesh won by 8 wickets",
            bdScore: "150/2",
            opponentScore: "147/8",
            winrun: 0,
            winwicket: 8,
            matchLength: 40, // overs
            highestrun: 72, // highest individual score
            motm: "Liton Das",
            image: "/placeholder.svg?height=300&width=500",
            highlights: "Liton Das's explosive 72 helped Bangladesh chase down New Zealand's total with ease.",
          },
          {
            id: 6,
            opponent: "South Africa",
            format: "Test",
            venue: "Sheikh Abu Naser Stadium, Khulna",
            date: "2023-10-21",
            result: "Bangladesh won by an innings and 40 runs",
            bdScore: "450/6d",
            opponentScore: "220 & 190",
            winrun: 40,
            winwicket: 10,
            matchLength: 3, // days
            highestrun: 150, // highest individual score
            motm: "Tamim Iqbal",
            image: "/placeholder.svg?height=300&width=500",
            highlights: "Dominant performance by Bangladesh, winning by an innings with Tamim Iqbal scoring 150.",
          },
          {
            id: 7,
            opponent: "Sri Lanka",
            format: "ODI",
            venue: "Shere Bangla National Stadium, Dhaka",
            date: "2023-05-25",
            result: "Bangladesh won by 33 runs",
            bdScore: "280/7",
            opponentScore: "247/10",
            winrun: 33,
            winwicket: 0,
            matchLength: 100, // overs
            highestrun: 87, // highest individual score
            motm: "Mahmudullah",
            image: "/placeholder.svg?height=300&width=500",
            highlights: "All-round performance by Bangladesh with Mahmudullah scoring 87 and taking 2 wickets.",
          },
          {
            id: 8,
            opponent: "Australia",
            format: "T20",
            venue: "Melbourne Cricket Ground",
            date: "2023-02-14",
            result: "Bangladesh won by 4 wickets",
            bdScore: "160/6",
            opponentScore: "159/8",
            winrun: 0,
            winwicket: 4,
            matchLength: 40, // overs
            highestrun: 65, // highest individual score
            motm: "Taskin Ahmed",
            image: "/placeholder.svg?height=300&width=500",
            highlights: "Historic win at the MCG with Taskin Ahmed's crucial 3 wickets restricting Australia.",
          },
        ]

        setVenues(venuesData)
        setOpponents(opponentsData)
        setMatches(matchesData)
        setFilteredMatches(matchesData)
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
    if (matches.length === 0) return

    let result = [...matches]

    // Filter by venue
    if (selectedVenue !== "all") {
      result = result.filter((match) => match.venue === selectedVenue)
    }

    // Filter by format
    if (selectedFormat !== "all") {
      result = result.filter((match) => match.format === selectedFormat)
    }

    // Filter by opponent
    if (selectedOpponent !== "all") {
      result = result.filter((match) => match.opponent === selectedOpponent)
    }

    // Filter by stat type
    if (statType !== "both") {
      if (statType === "run") {
        result = result.filter((match) => match.winrun > 0)
      } else if (statType === "wicket") {
        result = result.filter((match) => match.winwicket > 0)
      }
    }

    // Sort by selected field
    result.sort((a, b) => {
      if (sortOrder === "ASC") {
        return a[sortBy] - b[sortBy]
      } else {
        return b[sortBy] - a[sortBy]
      }
    })

    setFilteredMatches(result)
  }, [matches, selectedVenue, selectedFormat, selectedOpponent, statType, sortBy, sortOrder])

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
                  <option value="all">All Formats</option>
                  <option value="Test">Test</option>
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
                  <option value="matchLength">Match Length</option>
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
