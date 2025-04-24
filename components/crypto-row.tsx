"use client"
import { ChevronUp, ChevronDown, Star } from "lucide-react"
import { useDispatch } from "react-redux"
import { toggleFavorite } from "@/lib/features/crypto/crypto-slice"
import type { CryptoData } from "@/lib/types"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface CryptoRowProps {
  crypto: CryptoData
  rank: number
}

export default function CryptoRow({ crypto, rank }: CryptoRowProps) {
  const dispatch = useDispatch()

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(crypto.id))
  }

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
    return `$${price.toFixed(price < 0.1 ? 6 : 2)}`
  }

  const formatLargeNumber = (num: number) => {
    if (num >= 1_000_000_000_000) {
      return `$${(num / 1_000_000_000_000).toFixed(2)}T`
    }
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`
    }
    if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`
    }
    if (num >= 1_000) {
      return `$${(num / 1_000).toFixed(2)}K`
    }
    return `$${num.toFixed(2)}`
  }

  const formatSupply = (supply: number, symbol: string) => {
    if (supply >= 1_000_000_000) {
      return `${(supply / 1_000_000_000).toFixed(2)}B ${symbol}`
    }
    if (supply >= 1_000_000) {
      return `${(supply / 1_000_000).toFixed(2)}M ${symbol}`
    }
    return `${supply.toLocaleString()} ${symbol}`
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-4 whitespace-nowrap">
        <button onClick={handleToggleFavorite} className="mr-2">
          <Star className={cn("h-4 w-4", crypto.isFavorite ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} />
        </button>
        <span className="text-sm text-gray-500">{rank}</span>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3 relative">
            <Image
              src={crypto.image || "/placeholder.svg"}
              alt={crypto.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <div>
            <div className="font-medium">{crypto.name}</div>
            <div className="text-sm text-gray-500">{crypto.symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-right whitespace-nowrap font-medium">{formatPrice(crypto.price)}</td>
      <td className="px-4 py-4 text-right whitespace-nowrap">
        <PercentageChange value={crypto.priceChange1h} />
      </td>
      <td className="px-4 py-4 text-right whitespace-nowrap">
        <PercentageChange value={crypto.priceChange24h} />
      </td>
      <td className="px-4 py-4 text-right whitespace-nowrap">
        <PercentageChange value={crypto.priceChange7d} />
      </td>
      <td className="px-4 py-4 text-right whitespace-nowrap">{formatLargeNumber(crypto.marketCap)}</td>
      <td className="px-4 py-4 text-right whitespace-nowrap">
        <div>{formatLargeNumber(crypto.volume24h)}</div>
        <div className="text-sm text-gray-500">{formatSupply(crypto.volume24hInCrypto, crypto.symbol)}</div>
      </td>
      <td className="px-4 py-4 text-right whitespace-nowrap">
        <div>{formatSupply(crypto.circulatingSupply, crypto.symbol)}</div>
        {crypto.maxSupply && (
          <div className="w-24 h-2 bg-gray-200 rounded-full ml-auto mt-1">
            <div
              className="h-2 bg-gray-400 rounded-full"
              style={{ width: `${(crypto.circulatingSupply / crypto.maxSupply) * 100}%` }}
            ></div>
          </div>
        )}
      </td>
      <td className="px-4 py-4 text-right whitespace-nowrap">
        <SparklineChart data={crypto.sparklineData} width={150} height={50} />
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

function SparklineChart({ data, width, height }: { data: number[]; width: number; height: number }) {
  // Generate random data if not provided
  const chartData = data || Array.from({ length: 24 }, () => Math.random() * 100)

  // Find min and max values to scale the chart
  const minValue = Math.min(...chartData)
  const maxValue = Math.max(...chartData)
  const range = maxValue - minValue

  // Calculate points for the path
  const points = chartData
    .map((value, index) => {
      const x = (index / (chartData.length - 1)) * width
      const y = height - ((value - minValue) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  // Determine if the trend is positive (last value higher than first)
  const isPositive = chartData[chartData.length - 1] >= chartData[0]

  return (
    <svg width={width} height={height} className="ml-auto">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? "#10b981" : "#ef4444"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
