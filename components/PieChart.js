import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ stats }) {
  // Prepare data for the pie chart
  const chartData = {
    labels: ['Won', 'Lost', 'Tied'], // Labels for the pie chart sections
    datasets: [
      {
        label: 'Match Results',
        data: [stats.won, stats.lost, stats.tied], // Pass stats dynamically
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Green for Won
          'rgba(255, 99, 132, 0.6)', // Red for Lost
          'rgba(255, 205, 86, 0.6)', // Yellow for Tied
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
        ],
        borderWidth: 1,
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
        text: 'Bangladesh vs Opponent Winning Stats',
      },
    },
  };

  return <Pie data={chartData} options={options} />;
}

