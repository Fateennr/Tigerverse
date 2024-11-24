import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function HorizontalBarChart({ stats }) {
  // Prepare the data for the bar chart
  const barData = {
    labels: ['Total Matches', 'Total Runs Against', 'Highest Innings'], // Categories for Y-axis
    datasets: [
      {
        label: 'Bangladesh Stats',
        data: [stats.totalMatchesPlayed, stats.totalRunsAgainst, stats.highestInnings], // Values
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Blue for Total Matches
          'rgba(255, 206, 86, 0.6)', // Yellow for Total Runs Against
          'rgba(75, 192, 192, 0.6)', // Teal for Highest Innings
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    indexAxis: 'y', // Horizontal bar chart
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bangladesh Overall Stats',
      },
    },
  };

  return <Bar data={barData} options={options} />;
}


