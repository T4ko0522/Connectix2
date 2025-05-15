"use client"

import { useEffect, useState } from "react"
import { Logo } from "./logo"
import { OptimizedNoiseBackground } from "./optimized-noise-background"

interface LoadingScreenProps {
  onLoadingComplete?: () => void
  duration?: number
  initialProgress?: number
  logoSize?: number
  noiseOpacity?: number
  onNoiseChange?: (opacity: number) => void
}

export function LoadingScreen({
  onLoadingComplete,
  duration = 3000, // ３秒に変更
  initialProgress = 0,
  logoSize = 50,
  noiseOpacity = 0.03,
  onNoiseChange,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(initialProgress)
  const incrementInterval = duration / 100 // 100%に到達するまでの時間を均等に分割
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // ローディングアニメーション
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsComplete(true)

          // onLoadingComplete プロパティをオプショナルにして、LoadingProvider がない場合でも動作するようにします
          const handleLoadingComplete = () => {
            if (onLoadingComplete) {
              onLoadingComplete()
            }
          }

          // ローディング完了後に少し待機してからコールバックを実行
          setTimeout(() => {
            const newNoiseOpacity = 0.08 // ノイズを濃くする
            if (onNoiseChange) {
              onNoiseChange(newNoiseOpacity)
            }
            // ノイズ設定をセッションストレージに保存
            sessionStorage.setItem("noise_opacity", newNoiseOpacity.toString())

            handleLoadingComplete()
          }, 500)
          return 100
        }
        return prev + 1
      })
    }, incrementInterval)

    return () => clearInterval(interval)
  }, [incrementInterval, onLoadingComplete, onNoiseChange])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black relative">
      {/* 動くノイズ背景（最適化版） */}
      <OptimizedNoiseBackground opacity={noiseOpacity} speed={0.8} scale={4} className="absolute inset-0" />

      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/5 via-transparent to-black/20 pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center">
        {/* ロゴ */}
        <div className="mb-12">
          <Logo size={logoSize} className="opacity-90" />
        </div>

        {/* ローディングバー */}
        <div className="relative mb-2 h-[1px] w-80 bg-white/20">
          <div
            className="absolute left-0 top-0 h-full bg-yellow-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* ローディングテキストとパーセンテージ - ノイズ背景付き */}
        <div className="flex w-80 justify-between relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="w-full h-full bg-black/50 backdrop-blur-sm"></div>
            <OptimizedNoiseBackground opacity={0.05} speed={1.2} scale={2} className="absolute inset-0" />
          </div>
          <span className="text-[10px] tracking-[0.2em] text-white/70 px-2 py-1 relative z-10">LOADING</span>
          <span className="text-[10px] tracking-[0.2em] text-white/70 px-2 py-1 relative z-10">{progress}%</span>
        </div>
      </div>

      {/* ローディング完了時のフェードアウトエフェクト */}
      {isComplete && (
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 transition-opacity duration-500"
          style={{ opacity: isComplete ? 0 : 1 }}
        ></div>
      )}
    </div>
  )
}
