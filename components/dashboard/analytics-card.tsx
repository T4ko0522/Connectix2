import type { ReactNode } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

type AnalyticsCardProps = {
  icon: ReactNode
  title: string
  value: string
  change: string
  period: string
}

export function AnalyticsCard({ icon, title, value, change, period }: AnalyticsCardProps) {
  const isPositive = change.startsWith("+")
  const isNegative = change.startsWith("-")
  const changeColor = isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-yellow-500"

  return (
    <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-black/30 rounded-lg">{icon}</div>
          <h3 className="text-sm font-light text-gray-400">{title}</h3>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-light">{value}</div>
          <div className="flex items-center text-xs">
            <span className={changeColor}>
              {isPositive && <ArrowUp size={12} className="inline mr-0.5" />}
              {isNegative && <ArrowDown size={12} className="inline mr-0.5" />}
              {change}
            </span>
            <span className="text-gray-500 ml-1">{period}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
