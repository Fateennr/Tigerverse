"use client"

import { Plus } from "lucide-react"

export default function EmptySlot({ onClick }) {
  return (
    <div
      className="bg-[#1c1c1c]/50 border-2 border-dashed border-[#006a4e]/50 rounded-lg w-[160px] h-[180px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#ffde00] hover:bg-[#1c1c1c]/70"
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-full bg-[#006a4e]/30 flex items-center justify-center mb-2">
        <Plus className="text-[#ffde00]" size={24} />
      </div>
      <p className="text-gray-400 text-sm">Add Player</p>
    </div>
  )
}
