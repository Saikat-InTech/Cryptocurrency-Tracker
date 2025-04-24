import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"

export const selectCryptoState = (state: RootState) => state.crypto

export const selectAllCryptos = createSelector([selectCryptoState], (cryptoState) => cryptoState.cryptos)

export const selectCryptoById = createSelector([selectAllCryptos, (_, id: string) => id], (cryptos, id) =>
  cryptos.find((crypto) => crypto.id === id),
)

export const selectCryptoStatus = createSelector([selectCryptoState], (cryptoState) => cryptoState.status)

export const selectLastUpdated = createSelector([selectCryptoState], (cryptoState) => cryptoState.lastUpdated)

export const selectFavoriteCryptos = createSelector([selectAllCryptos], (cryptos) =>
  cryptos.filter((crypto) => crypto.isFavorite),
)
