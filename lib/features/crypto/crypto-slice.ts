import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CryptoData } from "@/lib/types"

interface CryptoState {
  cryptos: CryptoData[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  lastUpdated: number | null
}

const initialState: CryptoState = {
  cryptos: [],
  status: "idle",
  error: null,
  lastUpdated: null,
}

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    fetchCryptosStart(state) {
      state.status = "loading"
    },
    fetchCryptosSuccess(state, action: PayloadAction<CryptoData[]>) {
      state.status = "succeeded"
      state.cryptos = action.payload
      state.lastUpdated = Date.now()
    },
    fetchCryptosFailed(state, action: PayloadAction<string>) {
      state.status = "failed"
      state.error = action.payload
    },
    updateCryptoData(state, action: PayloadAction<Partial<CryptoData> & { id: string }>) {
      const index = state.cryptos.findIndex((crypto) => crypto.id === action.payload.id)
      if (index !== -1) {
        state.cryptos[index] = { ...state.cryptos[index], ...action.payload }
        state.lastUpdated = Date.now()
      }
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const index = state.cryptos.findIndex((crypto) => crypto.id === action.payload)
      if (index !== -1) {
        state.cryptos[index].isFavorite = !state.cryptos[index].isFavorite
      }
    },
  },
})

export const { fetchCryptosStart, fetchCryptosSuccess, fetchCryptosFailed, updateCryptoData, toggleFavorite } =
  cryptoSlice.actions

export default cryptoSlice.reducer
