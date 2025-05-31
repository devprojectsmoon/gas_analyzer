import { useState } from 'react'

interface GasAnalysisFormProps {
  onAnalyze: (address: string) => Promise<void>
  loading: boolean
}

export default function GasAnalysisForm({ onAnalyze, loading }: GasAnalysisFormProps) {
  const [address, setAddress] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return
    await onAnalyze(address.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Ethereum address (0x...)"
          className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 transition"
        >
          {loading ? 'Analyzing...' : 'Analyze Gas Usage'}
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Example: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
      </p>
    </form>
  )
}