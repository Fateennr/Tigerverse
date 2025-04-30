"use client"
import { useState, useEffect } from "react"
import { X, BarChart3, TrendingUp, ChevronRight } from "lucide-react"
import Image from "next/image"
import BattingStats from "@/components/players/BattingStats"
import BowlingStats from "@/components/players/BowlingStats"
import FieldingStats from "@/components/players/FieldingStats"

export default function PlayerStats({ player, onClose }) {
  const [activeTab, setActiveTab] = useState("batting")
  const [battingStats, setBattingStats] = useState([])
  const [bowlingStats, setBowlingStats] = useState([])
  const [fieldingStats, setFieldingStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        setLoading(true)

        // In a real app, these would be actual API calls
        // const battingResponse = await fetch(`${process.env.BACKEND_URI}/players/batting?playerId=${player.id}`)
        // const bowlingResponse = await fetch(`${process.env.BACKEND_URI}/players/bowling?playerId=${player.id}`)
        // const fieldingResponse = await fetch(`${process.env.BACKEND_URI}/players/fielding?playerId=${player.id}`)

        // Mock data based on the provided sample
        const battingData = [
          {
            PlayerID: player.id,
            Opponent: "Australia",
            MatchType: "Test",
            LocationType: "Home",
            Matches: 3,
            Innings: 5,
            Runs: 270,
            BallsFaced: 440,
            HighestScore: 115,
            Average: "54.00",
            StrikeRate: "61.36",
            Hundreds: 1,
            Fifties: 1,
            Fours: 30,
            Sixes: 7,
            Ducks: 0,
            NotOuts: 2,
          },
          {
            PlayerID: player.id,
            Opponent: "India",
            MatchType: "ODI",
            LocationType: "Away",
            Matches: 5,
            Innings: 5,
            Runs: 180,
            BallsFaced: 220,
            HighestScore: 75,
            Average: "36.00",
            StrikeRate: "81.82",
            Hundreds: 0,
            Fifties: 1,
            Fours: 15,
            Sixes: 3,
            Ducks: 0,
            NotOuts: 0,
          },
        ]

        const bowlingData = [
          {
            PlayerID: player.id,
            Opponent: "Australia",
            MatchType: "Test",
            LocationType: "Home",
            Matches: 18,
            Innings: 2,
            OversBowled: 12,
            BallsBowled: 72,
            RunsConceded: 60,
            Wickets: 1,
            Economy: "5.00",
            Average: "60.00",
            StrikeRate: "72.00",
            FiveWicketHauls: 0,
            TenWicketHauls: 0,
            BestBowlingFigures: "1/30",
            Maidens: 0,
          },
        ]

        const fieldingData = [
          {
            PlayerID: player.id,
            MatchType: "Test",
            Opponent: "Australia",
            LocationType: "Home",
            Matches: 18,
            Innings: 36,
            Catches: 7,
            Stumpings: 0,
            RunOuts: 3,
            DirectHits: 1,
          },
        ]

        setBattingStats(battingData)
        setBowlingStats(bowlingData)
        setFieldingStats(fieldingData)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch player statistics")
        setLoading(false)
        console.error(err)
      }
    }

    fetchPlayerStats()
  }, [player.id])

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#1c1c1c] rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl animate-slideInUp">
        {/* Header */}
        <div className="relative h-40 bg-gradient-to-r from-[#006a4e] to-[#1c1c1c]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-[#f42a41] transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="absolute inset-0 flex items-end">
            <div className="container p-6 flex flex-col md:flex-row items-end md:items-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mr-4 -mb-12 md:mb-0">
                <Image
                  src={`/players/${player.Name.toLowerCase().replace(/\./g, '').replace(/\s+/g, '_')}.png`}
                  alt={player.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="md:ml-8 mt-4 md:mt-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white">{player.name}</h2>
                <p className="text-[#ffde00]">{player.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#1c1c1c] border-b border-[#333] pt-16 md:pt-0">
          <div className="container px-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center border-b-2 transition-colors ${
                  activeTab === "batting"
                    ? "border-[#f42a41] text-[#ffde00]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("batting")}
              >
                <TrendingUp size={16} className="mr-2" />
                Batting Stats
              </button>

              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center border-b-2 transition-colors ${
                  activeTab === "bowling"
                    ? "border-[#f42a41] text-[#ffde00]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("bowling")}
              >
                <ChevronRight size={16} className="mr-2" />
                Bowling Stats
              </button>

              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center border-b-2 transition-colors ${
                  activeTab === "fielding"
                    ? "border-[#f42a41] text-[#ffde00]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("fielding")}
              >
                <BarChart3 size={16} className="mr-2" />
                Fielding Stats
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
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
              {activeTab === "batting" && <BattingStats stats={battingStats} />}
              {activeTab === "bowling" && <BowlingStats stats={bowlingStats} />}
              {activeTab === "fielding" && <FieldingStats stats={fieldingStats} />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
