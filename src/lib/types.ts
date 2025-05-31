export interface BlockscoutTransaction {
    hash: string
    timeStamp: string
    gasUsed: string
    gasPrice: string
    // Add other fields you might need from the API response
  }
  
  export interface Transaction {
    hash: string
    timestamp: number
    gasUsed: number
    gasPrice: number
  }
  
  export interface LocationEstimate {
    timezone: string
    country: string
    confidence: number
  }
  
  export interface GasAnalysisResult {
    totalGas: number
    totalTransactions: number
    averageGasPerTransaction: number
    timeDistribution: number[]
    likelyLocation: LocationEstimate | null
    transactions: Transaction[]
  }