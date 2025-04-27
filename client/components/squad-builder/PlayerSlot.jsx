"use client"

import Image from "next/image"
import { X } from "lucide-react"

export default function PlayerSlot({ player, onRemove, onDragStart, onDrop, onDragOver }) {
  return (
    <div
      className="bg-[#1c1c1c]/90 rounded-lg overflow-hidden shadow-lg w-[160px] relative cursor-move transition-all duration-300 hover:shadow-xl"
      draggable
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <button
        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-[#f42a41] transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
      >
        <X size={14} />
      </button>

      <div className="relative h-[120px] overflow-hidden">
        <Image
          src={player.image || "/placeholder.svg?height=300&width=300"}
          alt={player.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-base font-bold text-white mb-0 truncate">{player.name}</h3>
          <p className="text-xs text-gray-300 truncate">{player.role}</p>
        </div>
      </div>

      <div className="p-2 border-t border-[#006a4e] bg-[#1c1c1c]">
        <div className="flex justify-between items-center text-xs">
          <div>
            <p className="text-gray-400">Drag to</p>
            <p className="text-[#ffde00]">Reposition</p>
          </div>
        </div>
      </div>
    </div>
  )
}
