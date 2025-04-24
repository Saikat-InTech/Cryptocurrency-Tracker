"use client"

import { useEffect } from "react"

import { useSelector } from "react-redux"
import { selectAllCryptos, selectCryptoStatus } from "@/lib/features/crypto/crypto-selectors"
import CryptoRow from "@/components/crypto-row"
import { ChevronUp, Info } from "lucide-react"
import { useState } from "react"

export default function CryptoTable() {
  const cryptos = useSelector(selectAllCryptos)
  const status = useSelector(selectCryptoStatus)
  const [scrollVisible, setScrollVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (status === "loading" && cryptos.length === 0) {
    return <div className="text-center py-10">Loading cryptocurrency data...</div>
  }

  if (status === "failed") {
    return (
      <div className="text-center py-10 text-red-500">Failed to load cryptocurrency data. Please try again later.</div>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
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
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 flex items-center justify-end">
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
          {cryptos.map((crypto, index) => (
            <CryptoRow key={crypto.id} crypto={crypto} rank={index + 1} />
          ))}
        </tbody>
      </table>

      {scrollVisible && (
        <div className="fixed bottom-4 right-4">
          <button onClick={scrollToTop} className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-4 shadow-lg">
            <ChevronUp className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  )
}
