"use client"

export default function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#1c1c1c] rounded-lg w-full max-w-md overflow-hidden shadow-2xl animate-slideInUp">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Confirmation</h3>
          <p className="text-gray-300 mb-6">{message}</p>

          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444] transition-colors"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-[#f42a41] text-white rounded-md hover:bg-[#d42238] transition-colors"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
