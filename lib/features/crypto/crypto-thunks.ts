import type { AppDispatch } from "@/lib/store"
import { fetchCryptosStart, fetchCryptosSuccess, fetchCryptosFailed, updateCryptoData } from "./crypto-slice"
import { BinanceService } from "@/lib/services/binance-service"

// Initial data fetch
export const fetchCryptoData = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchCryptosStart())

    const binanceService = new BinanceService()
    const cryptoData = await binanceService.getCryptoData()

    dispatch(fetchCryptosSuccess(cryptoData))
  } catch (error) {
    dispatch(fetchCryptosFailed(error instanceof Error ? error.message : "Failed to fetch crypto data"))
  }
}

// Real-time updates using WebSocket
export const startRealTimeUpdates = () => (dispatch: AppDispatch) => {
  const binanceService = new BinanceService()

  // Start WebSocket connection for real-time price updates
  const stopWebSocket = binanceService.startRealTimeUpdates((update) => {
    dispatch(updateCryptoData(update))
  })

  return stopWebSocket
}
