"use client"
import { useState, useEffect } from "react"
import { X, ChevronRight, BarChart3, TrendingUp } from "lucide-react"
import Image from "next/image"
import BattingStats from "./BattingStats"
import BowlingStats from "./BowlingStats"
import FieldingStats from "./FieldingStats"
import OverallStats from "./OverallStats"

export default function PlayerDetails({ player, onClose }) {
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
        const battingResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/players/batting?playerId=${player.ID}`);
        const bowlingResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/players/bowling?playerId=${player.ID}`);
        const fieldingResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/players/fielding?playerId=${player.ID}`);

        
        // Parse the JSON responses
        const battingData = await battingResponse.json();
        const bowlingData = await bowlingResponse.json();
        const fieldingData = await fieldingResponse.json();

        console.log(battingData);
        console.log(bowlingData);
        console.log(fieldingData);
        
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

  const specs = player?.specs || player?.formats || []

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

          <div className="absolute inset-0 flex items-end">
            <div className="container p-6 flex flex-col md:flex-row items-end md:items-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mr-4 -mb-12 md:mb-0">
                <Image
                  src={
                    `/players/${player.Name}.png`
                    || '/placeholder.jpg'
                  }
                  alt={player.Name}
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover"
                />
              </div>

              <div className="md:ml-8 mt-4 md:mt-0">
                <h2 className="text-2xl md:text-4xl font-bold text-white">{player.Name || player.name}</h2>
                <div className="flex items-center mt-1">
                  <p className="text-[#ffde00] mr-4">{player.Role || player.role}</p>
                  <div className="flex space-x-2">
                    {specs.map((format) => (
                      <span
                        key={format}
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          format === "TEST" || format === "Test"
                            ? "bg-[#006a4e]"
                            : format === "ODI"
                              ? "bg-[#f42a41]"
                              : "bg-[#ffde00] text-[#1c1c1c]"
                        }`}
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
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
                Batting Career
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
                Bowling Career
              </button>

              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center border-b-2 transition-colors ${
                  activeTab === "fielding"
                    ? "border-[#f42a41] text-[#ffde00]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("fielding")}
              >
                <ChevronRight size={16} className="mr-2" />
                Fielding Career
              </button>

              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center border-b-2 transition-colors ${
                  activeTab === "overall"
                    ? "border-[#f42a41] text-[#ffde00]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("overall")}
              >
                <BarChart3 size={16} className="mr-2" />
                Overall Stats
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
              {activeTab === "overall" && (
                <OverallStats
                  battingStats={battingStats}
                  bowlingStats={bowlingStats}
                  fieldingStats={fieldingStats}
                  player={player}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
