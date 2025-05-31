import { fetchTransactions } from './api'
import { GasAnalysisResult } from './types'

export async function analyzeGasUsage(address: string): Promise<GasAnalysisResult> {
  const transactions = await fetchTransactions(address)
  
  // Calculate total gas spent in ETH (gasUsed * gasPrice)
  const totalGas = transactions.reduce((sum, tx) => {
    const gasUsed = parseFloat(tx.gasUsed)
    const gasPrice = parseFloat(tx.gasPrice) // in wei
    const ethValue = (gasUsed * gasPrice) / 1e18 // convert to ETH
    return sum + ethValue
  }, 0)

  // Calculate time distribution (8 periods of 3 hours each)
  const timeDistribution = Array(8).fill(0)
  
  // Track business hour transactions (9AM-5PM UTC)
  let businessHourTransactions = 0

  transactions.forEach(tx => {
    const timestamp = parseInt(tx.timeStamp) * 1000 // convert to milliseconds
    const date = new Date(timestamp)
    const hour = date.getUTCHours()
    
    // Count business hour transactions
    if (hour >= 9 && hour < 17) {
      businessHourTransactions++
    }

    // Count for global time distribution (UTC)
    const timePeriod = Math.floor(hour / 3)
    timeDistribution[timePeriod]++
  })

  // Determine likely location based on UTC business hours
  let likelyLocation = null
  const totalTxs = transactions.length
  
  if (totalTxs > 0) {
    const businessHourRatio = businessHourTransactions / totalTxs
    
    // If more than 50% of transactions are during UTC business hours
    if (businessHourRatio > 0.5) {
      likelyLocation = {
        timezone: 'UTC',
        country: 'Likely in UTC timezone (Europe/Africa)',
        confidence: businessHourRatio
      }
    } else {
      // If not in UTC business hours, make a simple guess based on most active period
      const maxPeriod = timeDistribution.indexOf(Math.max(...timeDistribution))
      const likelyHours = `${maxPeriod * 3}-${(maxPeriod + 1) * 3} UTC`
      
      likelyLocation = {
        timezone: 'UTC',
        country: `Active during ${likelyHours} (possibly ${getLikelyRegion(maxPeriod)})`,
        confidence: timeDistribution[maxPeriod] / totalTxs
      }
    }
  }

  return {
    totalGas,
    totalTransactions: transactions.length,
    averageGasPerTransaction: transactions.length > 0 ? totalGas / transactions.length : 0,
    timeDistribution,
    likelyLocation,
    transactions: transactions.map(tx => ({
      hash: tx.hash,
      timestamp: parseInt(tx.timeStamp),
      gasUsed: parseFloat(tx.gasUsed),
      gasPrice: parseFloat(tx.gasPrice),
    }))
  }
}

// Helper function to guess region based on UTC hour period
function getLikelyRegion(period: number): string {
  const regions = [
    'East Asia',         // 0-3 UTC
    'East Asia',         // 3-6 UTC
    'Asia/Australia',    // 6-9 UTC
    'Europe/Middle East',// 9-12 UTC
    'Europe/Africa',     // 12-15 UTC
    'Americas',          // 15-18 UTC
    'Americas',          // 18-21 UTC
    'Americas/Pacific'   // 21-24 UTC
  ]
  return regions[period] || 'unknown region'
}