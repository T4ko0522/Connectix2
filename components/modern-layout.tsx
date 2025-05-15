"use client"

import type { ReactNode } from "react"
import { OptimizedNoiseBackground } from "./optimized-noise-background"

interface ModernLayoutProps {
  children: ReactNode
  className?: string
  noiseOpacity?: number
  noiseSpeed?: number
}

export function ModernLayout({ children, className = "", noiseOpacity = 0.03, noiseSpeed = 0.8 }: ModernLayoutProps) {
  return (
    <div className={`min-h-screen ${className || "bg-black"}`}>
      {/* 動くノイズ背景 - noiseOpacityが0より大きい場合のみ表示 */}
      {noiseOpacity > 0 && <OptimizedNoiseBackground opacity={noiseOpacity} speed={noiseSpeed} scale={4} />}

      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/5 via-transparent to-black/20 pointer-events-none"></div>

      {/* コンテンツ */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
