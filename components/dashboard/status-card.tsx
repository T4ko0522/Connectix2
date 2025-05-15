import type { ReactNode } from "react"

type StatusCardProps = {
  icon: ReactNode
  title: string
  value: string
  change?: string
  period?: string
  special?: boolean
}

export function StatusCard({ icon, title, value, change, period, special = false }: StatusCardProps) {
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
          {!special && change && period && (
            <div className="text-xs text-gray-500">
              <span className="text-yellow-500">{change}</span> {period}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
