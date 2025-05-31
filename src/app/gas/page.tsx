'use client'

import { useState } from 'react'
import GasAnalysisForm from '@/components/GasAnalysisForm'
import GasResults from '@/components/GasResults'
import { analyzeGasUsage } from '@/lib/analysis'
import { GasAnalysisResult } from '@/lib/types'

export default function GasPage() {
  const [results, setResults] = useState<GasAnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (address: string) => {
    setLoading(true)
    setError(null)
    try {
      const analysisResults = await analyzeGasUsage(address)
      setResults(analysisResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gas Usage Analysis</h1>
      <GasAnalysisForm onAnalyze={handleAnalyze} loading={loading} />
      {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      {results && <GasResults results={results} />}
    </div>
  )
}