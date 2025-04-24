export interface CryptoData {
  id: string
  name: string
  symbol: string
  image: string
  price: number
  priceChange1h: number
  priceChange24h: number
  priceChange7d: number
  marketCap: number
  volume24h: number
  volume24hInCrypto: number
  circulatingSupply: number
  maxSupply: number | null
  sparkline7d: string
  sparklineData: number[]
  isFavorite: boolean
}
