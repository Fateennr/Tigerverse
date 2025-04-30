"use client"
import { useState, useEffect } from "react"
import { Heart, Save, Clock, X } from "lucide-react"
import EmptySlot from "@/components/squad-builder/EmptySlot"
import PlayerSlot from "@/components/squad-builder/PlayerSlot"
import PlayerSelectionModal from "@/components/squad-builder/PlayerSelectionModal"
import SavedSquadsList from "@/components/squad-builder/SavedSquadsList"
import ConfirmationModal from "@/components/squad-builder/ConfirmationModal"

export default function MySquadPage() {
  const [squad, setSquad] = useState(Array(11).fill(null))
  const [savedSquads, setSavedSquads] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const [showSavedSquads, setShowSavedSquads] = useState(false)
  const [squadTitle, setSquadTitle] = useState("My Dream Team")
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSquadSaved, setIsSquadSaved] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [playerToRemove, setPlayerToRemove] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch saved squads on component mount
  useEffect(() => {
    fetchSavedSquads()
  }, [])

  const fetchSavedSquads = async () => {
    try {
      
      setLoading(true);
      
  
      // 1. Fetch squad list
      const squadListRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/mysquad/list`);
      
      const squadList = await squadListRes.json();
      
      
  
      // 2. For each squad, fetch players (id + index), then fetch full player details
      const squadsWithPlayers = await Promise.all(
        squadList.map(async (squad) => {
          try {
            
            const playersRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/mysquad/players/${squad.ID}`);
            const playersMeta = await playersRes.json(); // [{ PlayerID, Index }]
  
            const detailedPlayers = await Promise.all(
              playersMeta.map(async ({ PlayerID }) => {
                try {
                  const playerDetailRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/players/detaildata?playerId=${PlayerID}`);
                  const playerData = await playerDetailRes.json(); // { id, name, role, image }

                  
                  
  
                  return {
                    id: playerData.ID,
                    name: playerData.Name,
                    role: playerData.PlayerRole,                    
                    image: "/placeholder.svg?height=300&width=300",
                    
                  };
                } catch (err) {
                  console.error(`Failed to fetch player ${PlayerID}:`, err);
                  return {
                    id: PlayerID,
                    name: "Unknown Player",
                    role: "Unknown",
                    image: "/placeholder.svg?height=300&width=300",
                  };
                }
              })
            );
            
            
            return {
              ...squad,
              players: detailedPlayers,
            };
           
            
          } catch (err) {
            console.error(`Error fetching players for squad ${squad.id}:`, err);
            return { ...squad, players: [] };
          }
        })
      );
  
      // 3. Save full result
      console.log(squadsWithPlayers);
      setSavedSquads(squadsWithPlayers);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch saved squads:", err);
      setError("Failed to fetch saved squads");
      setLoading(false);
    }
  };
  

  const handleSlotClick = (index) => {
    setSelectedSlot(index)
    setShowPlayerModal(true)
  }

  const handlePlayerSelect = (player) => {
    const newSquad = [...squad]
    newSquad[selectedSlot] = player
    setSquad(newSquad)
    setShowPlayerModal(false)
    setIsSquadSaved(false)
  }

  const handleRemovePlayer = (index) => {
    setPlayerToRemove(index)
    setShowConfirmation(true)
  }

  const confirmRemovePlayer = async () => {
    if (playerToRemove !== null) {
      try {
        // In a real app, this would be an actual API call if the squad is already saved
        // if (isSquadSaved) {
        //   await fetch(`${process.env.BACKEND_URI}/mysquad/remove`, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       playerId: squad[playerToRemove].id,
        //     }),
        //   })
        // }

        const newSquad = [...squad]
        newSquad[playerToRemove] = null
        setSquad(newSquad)
        setIsSquadSaved(false)
        setShowConfirmation(false)
        setPlayerToRemove(null)
      } catch (err) {
        setError("Failed to remove player")
        console.error(err)
      }
    }
  }

  const handleSwapPlayers = (fromIndex, toIndex) => {
    const newSquad = [...squad]
    const temp = newSquad[fromIndex]
    newSquad[fromIndex] = newSquad[toIndex]
    newSquad[toIndex] = temp
    setSquad(newSquad)
    setIsSquadSaved(false)
  }

  
  const handleSaveSquad = async () => {
   
    setLoading(true)
    const payload = {
      squadName: squadTitle, // The title of the squad
      coachID: 1, // Replace with the actual selected coach ID
      captainID: 1, // Replace with the actual selected captain ID
      matchType: 'odi', // Match type like 'Test', 'ODI', etc.
      favourite: isFavorite, // Whether the squad is a favorite or not
      players: squad
        .filter(player => player !== null) // Filter out null values
        .map((player, index) => ({
          playerID: player.id, // This is the player ID
          index: index  // This is the player index (1-based)
        }))
    };
    
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/mysquad/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) // Send the payload as JSON
      });
  
      if (response.ok) {
        // Handle successful response
        const data = await response.json();
        console.log('Squad saved successfully:', data);
        fetchSavedSquads()
      } else {
        // Handle errors (if any)
        const error = await response.json();
        console.error('Error saving squad:', error);
      }
      setLoading(false)
    } catch (error) {
      console.error('Error in API request:', error);
    }

  };
  

  const handleToggleFavorite = async () => {
    setIsFavorite(!isFavorite)
    setIsSquadSaved(false)

    // In a real app, if the squad is already saved, update the favorite status
    // if (isSquadSaved) {
    //   try {
    //     await fetch(`${process.env.BACKEND_URI}/mysquad/favorite`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         isFavorite: !isFavorite,
    //       }),
    //     })
    //   } catch (err) {
    //     console.error(err)
    //   }
    // }
  }

  const loadSavedSquad = (savedSquad) => {
    // Create a new squad array with 11 slots
    const newSquad = Array(11).fill(null)

    // Fill in the players from the saved squad
    savedSquad.players.forEach((player, index) => {
      if (index < 11) {
        newSquad[index] = player
      }
    })

    setSquad(newSquad)
    setSquadTitle(savedSquad.title)
    setIsFavorite(savedSquad.isFavorite)
    setIsSquadSaved(true)
    setShowSavedSquads(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1c1c1c] to-[#006a4e]">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-start">
          {/* Main Squad Builder */}
          <div className="w-full md:w-3/4 pr-0 md:pr-6">
            <div className="bg-[#1c1c1c]/80 rounded-lg p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    value={squadTitle}
                    onChange={(e) => {
                      setSquadTitle(e.target.value)
                      setIsSquadSaved(false)
                    }}
                    className="bg-transparent border-b border-[#006a4e] text-white text-2xl font-bold focus:outline-none focus:border-[#ffde00] w-full md:w-auto"
                    placeholder="Squad Title"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite ? "bg-[#f42a41]/20 text-[#f42a41]" : "bg-[#333] text-gray-400 hover:text-white"
                    }`}
                    onClick={handleToggleFavorite}
                    title="Mark as favorite"
                  >
                    <Heart fill={isFavorite ? "#f42a41" : "none"} size={20} />
                  </button>

                  <button
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      isSquadSaved
                        ? "bg-[#006a4e]/50 text-gray-300 cursor-not-allowed"
                        : "bg-[#006a4e] text-white hover:bg-[#005a42]"
                    }`}
                    onClick={handleSaveSquad}
                    disabled={isSquadSaved || loading}
                  >
                    <Save size={16} className="mr-2" />
                    {loading ? "Saving..." : "Save Squad"}
                  </button>


                  <button
                    className="md:hidden flex items-center px-4 py-2 rounded-md bg-[#333] text-white hover:bg-[#444] transition-colors"
                    onClick={() => setShowSavedSquads(!showSavedSquads)}
                  >
                    <Clock size={16} className="mr-2" />
                    Saved Squads
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-[#f42a41]/20 text-white p-4 rounded-md mb-6">
                  <p>{error}</p>
                  <button className="text-sm text-[#ffde00] mt-2 hover:underline" onClick={() => setError(null)}>
                    Dismiss
                  </button>
                </div>
              )}

              <div className="relative">
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

                {/* First row - 3 players */}
                <div className="flex justify-center mb-16 z-10 relative">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="mx-4">
                      {squad[index] ? (
                        <PlayerSlot
                          player={squad[index]}
                          onRemove={() => handleRemovePlayer(index)}
                          onDragStart={(e) => e.dataTransfer.setData("text/plain", index)}
                          onDrop={(e) => {
                            e.preventDefault()
                            const fromIndex = Number.parseInt(e.dataTransfer.getData("text/plain"))
                            handleSwapPlayers(fromIndex, index)
                          }}
                          onDragOver={(e) => e.preventDefault()}
                        />
                      ) : (
                        <EmptySlot onClick={() => handleSlotClick(index)} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Second row - 5 players */}
                <div className="flex justify-center mb-16 z-10 relative">
                  {[3, 4, 5, 6, 7].map((index) => (
                    <div key={index} className="mx-4">
                      {squad[index] ? (
                        <PlayerSlot
                          player={squad[index]}
                          onRemove={() => handleRemovePlayer(index)}
                          onDragStart={(e) => e.dataTransfer.setData("text/plain", index)}
                          onDrop={(e) => {
                            e.preventDefault()
                            const fromIndex = Number.parseInt(e.dataTransfer.getData("text/plain"))
                            handleSwapPlayers(fromIndex, index)
                          }}
                          onDragOver={(e) => e.preventDefault()}
                        />
                      ) : (
                        <EmptySlot onClick={() => handleSlotClick(index)} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Third row - 3 players */}
                <div className="flex justify-center z-10 relative">
                  {[8, 9, 10].map((index) => (
                    <div key={index} className="mx-4">
                      {squad[index] ? (
                        <PlayerSlot
                          player={squad[index]}
                          onRemove={() => handleRemovePlayer(index)}
                          onDragStart={(e) => e.dataTransfer.setData("text/plain", index)}
                          onDrop={(e) => {
                            e.preventDefault()
                            const fromIndex = Number.parseInt(e.dataTransfer.getData("text/plain"))
                            handleSwapPlayers(fromIndex, index)
                          }}
                          onDragOver={(e) => e.preventDefault()}
                        />
                      ) : (
                        <EmptySlot onClick={() => handleSlotClick(index)} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#006a4e]/20 rounded-lg">
                <h3 className="text-white font-bold mb-2">Squad Builder Instructions:</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Click on any empty slot to add a player</li>
                  <li>• Drag and drop players to swap positions</li>
                  <li>• Click the X on a player card to remove them</li>
                  <li>• Give your squad a name and click Save Squad when done</li>
                  <li>• Click the heart icon to mark your squad as a favorite</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Saved Squads Sidebar - Desktop */}
          <div className="hidden md:block w-1/4 sticky top-20">
            <SavedSquadsList savedSquads={savedSquads} onSquadSelect={loadSavedSquad} loading={loading} />
          </div>

          {/* Saved Squads Modal - Mobile */}
          {showSavedSquads && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:hidden animate-fadeIn">
              <div className="bg-[#1c1c1c] rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl animate-slideInUp">
                <div className="flex justify-between items-center p-4 border-b border-[#333]">
                  <h2 className="text-xl font-bold text-white">Saved Squads</h2>
                  <button onClick={() => setShowSavedSquads(false)} className="text-gray-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4 overflow-y-auto max-h-[70vh]">
                  <SavedSquadsList
                    savedSquads={savedSquads}
                    onSquadSelect={(squad) => {
                      loadSavedSquad(squad)
                      setShowSavedSquads(false)
                    }}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Player Selection Modal */}
      {showPlayerModal && (
        <PlayerSelectionModal onClose={() => setShowPlayerModal(false)} onPlayerSelect={handlePlayerSelect} />
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to remove this player from your squad?"
          onConfirm={confirmRemovePlayer}
          onCancel={() => {
            setShowConfirmation(false)
            setPlayerToRemove(null)
          }}
        />
      )}
    </main>
  )
}
