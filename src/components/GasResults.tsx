import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { GasAnalysisResult } from '@/lib/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface GasResultsProps {
  results: GasAnalysisResult
}

export default function GasResults({ results }: GasResultsProps) {
  const timeLabels = [
    '12AM-3AM', '3AM-6AM', '6AM-9AM', 
    '9AM-12PM', '12PM-3PM', '3PM-6PM', 
    '6PM-9PM', '9PM-12AM'
  ]

  const timeData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Transactions per time period',
        data: results.timeDistribution,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Transaction Time Distribution',
      },
    },
  }

  return (
    <div className="mt-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-gray-700">Total Gas Spent</h3>
          <p className="text-2xl font-bold text-gray-700">{results.totalGas.toLocaleString()} ETH</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-gray-700">Total Transactions</h3>
          <p className="text-2xl font-bold text-gray-700">{results.totalTransactions}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-gray-700">Average Gas per Tx</h3>
          <p className="text-2xl font-bold text-gray-700">{results.averageGasPerTransaction.toFixed(6)} ETH</p>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Time Distribution Analysis</h2>
        <div className="h-64">
          <Bar data={timeData} options={options} />
        </div>
        {results.likelyLocation && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800">Likely Location</h3>
            <p className="text-lg text-gray-700">
              Based on transaction times, this address is most likely from{' '}
              <span className="font-bold">{results.likelyLocation.timezone}</span> ({results.likelyLocation.country}) with{' '}
              <span className="font-bold">{Math.round(results.likelyLocation.confidence * 100)}%</span> confidence.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}