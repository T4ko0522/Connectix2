"use client"

import type React from "react"

import { User, LinkIcon, BarChart3, Settings, Palette } from "lucide-react"

type NavLinkProps = {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}

export function NavLink({ children, active, onClick }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
        active ? "bg-yellow-500/10 text-yellow-500" : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  )
}

type DashboardTabsProps = {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <nav className="hidden md:flex space-x-6">
      <NavLink active={activeTab === "account"} onClick={() => onTabChange("account")}>
        <User size={16} />
        <span>アカウント</span>
      </NavLink>
      <NavLink active={activeTab === "links"} onClick={() => onTabChange("links")}>
        <LinkIcon size={16} />
        <span>リンク</span>
      </NavLink>
      <NavLink active={activeTab === "appearance"} onClick={() => onTabChange("appearance")}>
        <Palette size={16} />
        <span>外観</span>
      </NavLink>
      <NavLink active={activeTab === "analytics"} onClick={() => onTabChange("analytics")}>
        <BarChart3 size={16} />
        <span>分析</span>
      </NavLink>
      <NavLink active={activeTab === "settings"} onClick={() => onTabChange("settings")}>
        <Settings size={16} />
        <span>設定</span>
      </NavLink>
    </nav>
  )
}
