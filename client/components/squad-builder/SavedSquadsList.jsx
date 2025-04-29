"use client"

import { useState } from "react"
import { Calendar, Heart, ChevronRight } from "lucide-react"

export default function SavedSquadsList({ savedSquads, onSquadSelect, loading }) {
  const [activeTab, setActiveTab] = useState("all")

  const filteredSquads = activeTab === "favorites" ? savedSquads.filter((squad) => squad.isFavorite) : savedSquads

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="bg-[#1c1c1c]/80 rounded-lg overflow-hidden shadow-lg">
      <div className="bg-[#006a4e] p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Saved Squads</h2>
        <button
         className="bg-[#ffde00]/20 text-[#ffde00] p-2 rounded-full w-10 h-10 flex items-center justify-center"
         title="Add New Squad"
        >
         +
        </button>
      </div>


      <div className="flex border-b border-[#333]">
        <button
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === "all" ? "text-[#ffde00] border-b-2 border-[#ffde00]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Squads
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === "favorites" ? "text-[#ffde00] border-b-2 border-[#ffde00]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites
        </button>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ffde00]"></div>
          </div>
        ) : filteredSquads.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">
              {activeTab === "favorites" ? "No favorite squads yet." : "No saved squads yet."}
            </p>
            {activeTab === "favorites" && (
              <button className="mt-2 text-[#ffde00] text-sm hover:underline" onClick={() => setActiveTab("all")}>
                View all squads
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSquads.map((squad) => (
              <div
                key={squad.ID}
                className="bg-[#333] rounded-lg p-3 cursor-pointer hover:bg-[#444] transition-colors"
                onClick={() => onSquadSelect(squad)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-medium">{squad.Namee}</h3>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <Calendar size={12} className="mr-1" />
                      <span>{formatDate(squad.Creation)}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {squad.Favourite && <Heart size={14} className="text-[#f42a41] fill-[#f42a41] mr-1" />}
                    <ChevronRight size={16} className="text-[#ffde00]" />
                  </div>
                </div>
                <div className="mt-2 flex -space-x-2 overflow-hidden">
                  {squad?.players?.slice(0, 5).map((player, index) => (
                    <div
                      key={index}
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-[#1c1c1c] overflow-hidden relative"
                    >
                      <img
                        src={`/players/${player.name.toLowerCase().replace(/\./g, '').replace(/\s+/g, '_')}.png`}
                        alt={player.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                  {squad.players.length > 5 && (
                   <div
                   className="inline-block h-6 w-6 rounded-full bg-[#006a4e] ring-2 ring-[#1c1c1c] text-white text-xs flex items-center justify-center cursor-pointer"
                   onClick={() => setSquade([])}
                 >
                   +{squad.players.length - 5}
                 </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
