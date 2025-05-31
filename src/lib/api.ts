import axios from 'axios'
import { BlockscoutTransaction } from './types'

const BLOCKSCOUT_API_URL = 'https://eth.blockscout.com/api'

interface BlockscoutApiResponse {
  status?: string // Note: This appears to be optional in the response you shared
  message: string
  result: BlockscoutTransaction[]
}

export async function fetchTransactions(address: string): Promise<BlockscoutTransaction[]> {
  try {
    const response = await axios.get<BlockscoutApiResponse>(
      `${BLOCKSCOUT_API_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc`
    )
    
    // Changed condition to check for "OK" message since that's what the API returns
    if (response.data.message === 'OK') {
      return response.data.result
    } else {
      throw new Error(response.data.message || 'Failed to fetch transactions')
    }
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw new Error('Failed to fetch transactions from Blockscout API')
  }
}