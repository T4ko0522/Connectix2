"use client"

import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"

type SettingsNavItemProps = {
  icon: ReactNode
  text: string
  active?: boolean
  onClick?: () => void
}

export function SettingsNavItem({ icon, text, active = false, onClick }: SettingsNavItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
        active
          ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
          : "text-gray-400 hover:text-white hover:bg-black/30"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm">{text}</span>
      {active && <ChevronRight size={16} className="ml-auto" />}
    </button>
  )
}
