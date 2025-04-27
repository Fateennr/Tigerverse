export default function BattingStats({ stats }) {
    return (
      <div className="animate-fadeIn">
        <h3 className="text-xl font-bold text-white mb-4">Batting Statistics</h3>
  
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1c1c1c] border border-[#333] rounded-lg">
            <thead>
              <tr className="bg-[#006a4e]">
                <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Opponent</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Format</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Location</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Matches</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Innings</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Runs</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Highest</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">Average</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">SR</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">100s</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">50s</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">4s</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider">6s</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333]">
              {stats.map((stat, index) => (
                <tr key={index} className="hover:bg-[#333] transition-colors">
                  <td className="py-3 px-4 text-sm text-white">{stat.Opponent}</td>
                  <td className="py-3 px-4 text-sm text-white">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        stat.MatchType === "Test"
                          ? "bg-[#006a4e]"
                          : stat.MatchType === "ODI"
                            ? "bg-[#f42a41]"
                            : "bg-[#ffde00] text-[#1c1c1c]"
                      }`}
                    >
                      {stat.MatchType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-white">{stat.LocationType}</td>
                  <td className="py-3 px-4 text-sm text-white">{stat.Matches}</td>
                  <td className="py-3 px-4 text-sm text-white">{stat.Innings}</td>
                  <td className="py-3 px-4 text-sm font-bold text-[#ffde00]">{stat.Runs}</td>
                  <td className="py-3 px-4 text-sm text-white">{stat.HighestScore}</td>
                  <td className="py-3 px-4 text-sm text-white">{stat.Average}</td>
                  <td className="py-3 px-4 text-sm text-white">{stat.StrikeRate}</td>
                  <td className="py-3 px-4 text-sm text-white">{stat.Hundreds}</td>
                  <td className="py-3 px-4 text-sm text-white">{stat.Fifties}</td>
                  <td className="py-3 px-4 text-sm text-white">{stat.Fours}</td>
                  <td className="py-3 px-4 text-sm text-white">{stat.Sixes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#006a4e]/20 p-4 rounded-lg border-l-2 border-[#006a4e]">
            <h4 className="text-sm font-medium text-gray-400 mb-1">Total Runs</h4>
            <p className="text-2xl font-bold text-white">{stats.reduce((sum, stat) => sum + stat.Runs, 0)}</p>
          </div>
  
          <div className="bg-[#f42a41]/20 p-4 rounded-lg border-l-2 border-[#f42a41]">
            <h4 className="text-sm font-medium text-gray-400 mb-1">Highest Score</h4>
            <p className="text-2xl font-bold text-white">{Math.max(...stats.map((stat) => stat.HighestScore))}</p>
          </div>
  
          <div className="bg-[#ffde00]/10 p-4 rounded-lg border-l-2 border-[#ffde00]">
            <h4 className="text-sm font-medium text-gray-400 mb-1">Centuries / Half Centuries</h4>
            <p className="text-2xl font-bold text-white">
              {stats.reduce((sum, stat) => sum + stat.Hundreds, 0)} / {stats.reduce((sum, stat) => sum + stat.Fifties, 0)}
            </p>
          </div>
        </div>
      </div>
    )
  }
  