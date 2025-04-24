"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, Star, Info, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CryptoDashboard() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="fixed top-4 right-4">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">#</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Price</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">1h %</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">24h %</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">7d %</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 flex items-center justify-end">
              Market Cap
              <Info className="ml-1 h-4 w-4 text-gray-400" />
            </th>
            <th className=" px-4 py-3 text-right text-sm font-medium text-gray-500 flex items-center justify-end">
              Volume(24h)
              <Info className="ml-1 h-4 w-4 text-gray-400" />
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 flex items-center justify-end">
              Circulating Supply
              <Info className="ml-1 h-4 w-4 text-gray-400" />
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          <CryptoRow
            id={1}
            rank={1}
            name="Bitcoin"
            symbol="BTC"
            price="$93,759.48"
            change1h={0.43}
            change24h={0.93}
            change7d={11.11}
            marketCap="$1,861,618,902,186"
            volume="$43,874,950,947"
            volumeSymbol="467.81K BTC"
            supply="19.85M BTC"
            chartUrl="/placeholder.svg?height=50&width=150"
            isFavorite={favorites.includes(1)}
            toggleFavorite={() => toggleFavorite(1)}
            icon="🔶"
          />
          <CryptoRow
            id={2}
            rank={2}
            name="Ethereum"
            symbol="ETH"
            price="$1,802.46"
            change1h={0.6}
            change24h={3.21}
            change7d={13.68}
            marketCap="$217,581,279,327"
            volume="$23,547,469,307"
            volumeSymbol="13.05M ETH"
            supply="120.71M ETH"
            chartUrl="/placeholder.svg?height=50&width=150"
            isFavorite={favorites.includes(2)}
            toggleFavorite={() => toggleFavorite(2)}
            icon="💎"
          />
          <CryptoRow
            id={3}
            rank={3}
            name="Tether"
            symbol="USDT"
            price="$1.00"
            change1h={-0.0}
            change24h={-0.0}
            change7d={0.04}
            marketCap="$145,320,022,085"
            volume="$92,288,882,007"
            volumeSymbol="92.25B USDT"
            supply="145.27B USDT"
            chartUrl="/placeholder.svg?height=50&width=150"
            isFavorite={favorites.includes(3)}
            toggleFavorite={() => toggleFavorite(3)}
            icon="💵"
          />
          <CryptoRow
            id={4}
            rank={4}
            name="XRP"
            symbol="XRP"
            price="$2.22"
            change1h={0.46}
            change24h={0.54}
            change7d={6.18}
            marketCap="$130,073,814,966"
            volume="$5,131,481,491"
            volumeSymbol="2.30B XRP"
            supply="58.39B XRP"
            chartUrl="/placeholder.svg?height=50&width=150"
            isFavorite={favorites.includes(4)}
            toggleFavorite={() => toggleFavorite(4)}
            icon="⚫"
          />
          <CryptoRow
            id={5}
            rank={5}
            name="BNB"
            symbol="BNB"
            price="$606.65"
            change1h={0.09}
            change24h={-1.2}
            change7d={3.73}
            marketCap="$85,471,956,947"
            volume="$1,874,281,784"
            volumeSymbol="3.08M BNB"
            supply="140.89M BNB"
            chartUrl="/placeholder.svg?height=50&width=150"
            isFavorite={favorites.includes(5)}
            toggleFavorite={() => toggleFavorite(5)}
            icon="🟡"
          />
          <CryptoRow
            id={6}
            rank={6}
            name="Solana"
            symbol="SOL"
            price="$151.51"
            change1h={0.53}
            change24h={1.26}
            change7d={14.74}
            marketCap="$78,381,958,631"
            volume="$4,881,674,486"
            volumeSymbol="32.25M SOL"
            supply="517.31M SOL"
            chartUrl="/placeholder.svg?height=50&width=150"
            isFavorite={favorites.includes(6)}
            toggleFavorite={() => toggleFavorite(6)}
            icon="⚫"
          />
        </tbody>
      </table>
      <div className="fixed bottom-4 right-4">
        <button className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-4 shadow-lg">
          <ArrowUp className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

interface CryptoRowProps {
  id: number
  rank: number
  name: string
  symbol: string
  price: string
  change1h: number
  change24h: number
  change7d: number
  marketCap: string
  volume: string
  volumeSymbol: string
  supply: string
  chartUrl: string
  isFavorite: boolean
  toggleFavorite: () => void
  icon: string
}

function CryptoRow({
  id,
  rank,
  name,
  symbol,
  price,
  change1h,
  change24h,
  change7d,
  marketCap,
  volume,
  volumeSymbol,
  supply,
  chartUrl,
  isFavorite,
  toggleFavorite,
  icon,
}: CryptoRowProps) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-4 whitespace-nowrap">
        <button onClick={toggleFavorite} className="mr-2">
          <Star className={cn("h-4 w-4", isFavorite ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} />
        </button>
        <span className="text-sm text-gray-500">{rank}</span>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{icon}</span>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-500">{symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-right whitespace-nowrap font-medium">{price}</td>
      <td className="px-4 py-4 text-right whitespace-nowrap">
        <PercentageChange value={change1h} />
      </td>
      <td className="px-4 py-4 text-right whitespace-nowrap">
        <PercentageChange value={change24h} />
      </td>
      <td className="px-4 py-4 text-right whitespace-nowrap">
        <PercentageChange value={change7d} />
      </td>
      <td className="px-4 py-4 text-right whitespace-nowrap">{marketCap}</td>
      <td className="px-4 py-4 text-right whitespace-nowrap">
        <div>{volume}</div>
        <div className="text-sm text-gray-500">{volumeSymbol}</div>
      </td>
      <td className="px-4 py-4 text-right whitespace-nowrap">
        <div>{supply}</div>
        <div className="w-24 h-2 bg-gray-200 rounded-full ml-auto">
          <div className="h-2 bg-gray-400 rounded-full" style={{ width: "60%" }}></div>
        </div>
      </td>
      <td className="px-4 py-4 text-right whitespace-nowrap">
        <img src={chartUrl || "/placeholder.svg"} alt={`${name} 7-day chart`} className="h-12 w-32 ml-auto" />
      </td>
    </tr>
  )
}

function PercentageChange({ value }: { value: number }) {
  const isPositive = value > 0
  const isZero = value === 0

  return (
    <div
      className={cn("flex items-center justify-end", {
        "text-green-500": isPositive,
        "text-red-500": !isPositive && !isZero,
        "text-gray-500": isZero,
      })}
    >
      {!isZero && (isPositive ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />)}
      {Math.abs(value).toFixed(2)}%
    </div>
  )
}
