import type { CryptoData } from "@/lib/types"

// Top cryptocurrencies to track
const TOP_CRYPTOS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", image: "btc.png" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", image: "eth.png" },
  { id: "tether", symbol: "USDT", name: "Tether", image: "usdt.png" },
  { id: "ripple", symbol: "XRP", name: "XRP", image: "xrp.png" },
  { id: "binancecoin", symbol: "BNB", name: "BNB", image: "bnb.png" },
  { id: "solana", symbol: "SOL", name: "Solana", image: "sol.png" },
]

export class BinanceService {
  private websocket: WebSocket | null = null
  private symbols: string[] = TOP_CRYPTOS.map((crypto) => `${crypto.symbol.toLowerCase()}usdt`)

  // Fetch initial crypto data
  async getCryptoData(): Promise<CryptoData[]> {
    try {
      // Fetch current prices
      const priceResponse = await fetch("https://api.binance.com/api/v3/ticker/price")
      const priceData = await priceResponse.json()

      // Fetch 24h stats
      const statsResponse = await fetch("https://api.binance.com/api/v3/ticker/24hr")
      const statsData = await statsResponse.json()

      // Map the data to our format
      return TOP_CRYPTOS.map((crypto) => {
        const symbol = `${crypto.symbol}USDT`
        const price = priceData.find((p: any) => p.symbol === symbol)
        const stats = statsData.find((s: any) => s.symbol === symbol)

        // Generate random data for fields not available from Binance API
        const marketCap = this.getRandomMarketCap(crypto.symbol)
        const circulatingSupply = this.getRandomSupply(crypto.symbol)
        const maxSupply =
          crypto.symbol === "BTC" ? 21000000 : crypto.symbol === "ETH" ? 0 : this.getRandomMaxSupply(crypto.symbol)

        return {
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          image: crypto.image,
          price: Number.parseFloat(price?.price || "0"),
          priceChange1h: this.getRandomPercentage(0.5),
          priceChange24h: stats ? Number.parseFloat(stats.priceChangePercent) : this.getRandomPercentage(2),
          priceChange7d: this.getRandomPercentage(5),
          marketCap,
          volume24h: stats ? Number.parseFloat(stats.quoteVolume) : this.getRandomVolume(),
          volume24hInCrypto: stats
            ? Number.parseFloat(stats.volume)
            : this.getRandomVolume() / Number.parseFloat(price?.price || "1"),
          circulatingSupply,
          maxSupply,
          sparkline7d: `/crypto-charts/${crypto.symbol.toLowerCase()}.svg`,
          sparklineData: this.generateSparklineData(
            crypto.symbol,
            crypto.symbol === "BTC" || crypto.symbol === "ETH" || crypto.symbol === "SOL"
              ? "up"
              : crypto.symbol === "USDT"
                ? "volatile"
                : "up",
          ),
          isFavorite: false,
        }
      })
    } catch (error) {
      console.error("Error fetching crypto data:", error)
      throw error
    }
  }

  // Start WebSocket connection for real-time updates
  startRealTimeUpdates(callback: (update: Partial<CryptoData> & { id: string }) => void): () => void {
    // Create a WebSocket connection to Binance
    const streams = this.symbols.map((symbol) => `${symbol}@ticker`).join("/")
    this.websocket = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`)

    this.websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)

      // Find the corresponding crypto
      const symbol = data.s.replace("USDT", "")
      const crypto = TOP_CRYPTOS.find((c) => c.symbol === symbol)

      if (crypto) {
        // Update the crypto data
        callback({
          id: crypto.id,
          price: Number.parseFloat(data.c),
          priceChange24h: Number.parseFloat(data.P),
          priceChange1h: this.getRandomPercentage(0.3), // Simulate 1h change
          volume24h: Number.parseFloat(data.q),
          volume24hInCrypto: Number.parseFloat(data.v),
        })
      }
    }

    this.websocket.onerror = (error) => {
      console.error("WebSocket error:", error)
      // Fallback to polling if WebSocket fails
      this.startPolling(callback)
    }

    // Return a function to stop the WebSocket
    return () => {
      if (this.websocket) {
        this.websocket.close()
        this.websocket = null
      }
    }
  }

  // Fallback to polling if WebSocket is not available
  private startPolling(callback: (update: Partial<CryptoData> & { id: string }) => void): () => void {
    const interval = setInterval(async () => {
      try {
        const priceResponse = await fetch("https://api.binance.com/api/v3/ticker/price")
        const priceData = await priceResponse.json()

        TOP_CRYPTOS.forEach((crypto) => {
          const symbol = `${crypto.symbol}USDT`
          const price = priceData.find((p: any) => p.symbol === symbol)

          if (price) {
            callback({
              id: crypto.id,
              price: Number.parseFloat(price.price),
              priceChange1h: this.getRandomPercentage(0.3),
              priceChange24h: this.getRandomPercentage(1),
            })
          }
        })
      } catch (error) {
        console.error("Error polling crypto data:", error)
      }
    }, 2000)

    return () => clearInterval(interval)
  }

  // Helper methods to generate random data
  private getRandomPercentage(max: number): number {
    return Math.random() * max * 2 - max
  }

  private getRandomVolume(): number {
    return Math.random() * 10000000000
  }

  private getRandomMarketCap(symbol: string): number {
    switch (symbol) {
      case "BTC":
        return 1800000000000 + Math.random() * 100000000000
      case "ETH":
        return 210000000000 + Math.random() * 10000000000
      case "USDT":
        return 140000000000 + Math.random() * 5000000000
      case "XRP":
        return 130000000000 + Math.random() * 5000000000
      case "BNB":
        return 85000000000 + Math.random() * 2000000000
      case "SOL":
        return 78000000000 + Math.random() * 2000000000
      default:
        return 10000000000 + Math.random() * 1000000000
    }
  }

  private getRandomSupply(symbol: string): number {
    switch (symbol) {
      case "BTC":
        return 19850000
      case "ETH":
        return 120710000
      case "USDT":
        return 145270000000
      case "XRP":
        return 58390000000
      case "BNB":
        return 140890000
      case "SOL":
        return 517310000
      default:
        return 1000000000
    }
  }

  private getRandomMaxSupply(symbol: string): number {
    switch (symbol) {
      case "BTC":
        return 21000000
      case "XRP":
        return 100000000000
      case "BNB":
        return 200000000
      case "SOL":
        return 700000000
      default:
        return 0
    }
  }

  private generateSparklineData(symbol: string, trend: "up" | "down" | "volatile"): number[] {
    const length = 24
    const result: number[] = []
    let value = 100

    for (let i = 0; i < length; i++) {
      if (trend === "up") {
        // Upward trend with small fluctuations
        value = value * (1 + (Math.random() * 0.03 - 0.01))
      } else if (trend === "down") {
        // Downward trend with small fluctuations
        value = value * (1 + (Math.random() * 0.02 - 0.03))
      } else {
        // Volatile with larger fluctuations
        value = value * (1 + (Math.random() * 0.08 - 0.04))
      }
      result.push(value)
    }

    return result
  }
}
