import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function LineChart({ stats }) {
  // Generate mock labels for matches (you can replace this with actual match labels)
  const labels = Array.from({ length: stats.totalMatchesPlayed }, (_, i) => `Match ${i + 1}`);

  // Prepare data for the chart
  const lineData = {
    labels, // X-axis labels (match numbers)
    datasets: [
      {
        label: 'Lowest Innings',
        data: Array(stats.totalMatchesPlayed).fill(stats.lowestInnings), // Mock data: lowest innings constant
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Highest Innings',
        data: Array(stats.totalMatchesPlayed).fill(stats.highestInnings), // Mock data: highest innings constant
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bangladesh Innings Trends (Mock Data)',
      },
    },
  };

  return <Line data={lineData} options={options} />;
}


