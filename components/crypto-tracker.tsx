"use client"

import { useEffect } from "react"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import CryptoTable from "@/components/crypto-table"
import { fetchCryptoData, startRealTimeUpdates } from "@/lib/features/crypto/crypto-thunks"

export default function CryptoTracker() {
  return (
    <Provider store={store}>
      <CryptoTrackerContent />
    </Provider>
  )
}

function CryptoTrackerContent() {
  useEffect(() => {
    // Initial data fetch
    store.dispatch(fetchCryptoData())

    // Start real-time updates
    const stopUpdates = store.dispatch(startRealTimeUpdates())

    return () => {
      if (typeof stopUpdates === "function") {
        stopUpdates()
      }
    }
  }, [])

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cryptocurrency Market</h1>
      <CryptoTable />
    </div>
  )
}
