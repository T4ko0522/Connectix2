"use client"

import { useEffect, useRef, useState } from "react"

interface OptimizedNoiseBackgroundProps {
  opacity?: number
  speed?: number
  className?: string
  scale?: number
}

export function OptimizedNoiseBackground({
  opacity = 0.03,
  speed = 1,
  className = "",
  scale = 4, // ノイズのスケール（小さいほど細かいノイズ）
}: OptimizedNoiseBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 })
  const isMountedRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // キャンバスサイズをウィンドウサイズに設定
    const resizeCanvas = () => {
      if (!isMountedRef.current || !canvas) return

      const width = Math.max(window.innerWidth, 1)
      const height = Math.max(window.innerHeight, 1)

      canvas.width = width
      canvas.height = height
      setDimensions({ width, height })
    }

    // 初期サイズを設定
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // 最適化されたノイズ生成（低解像度で生成して拡大）
    const createNoise = () => {
      if (!isMountedRef.current || !ctx) return null

      // キャンバスのサイズが有効かチェック
      if (canvas.width <= 0 || canvas.height <= 0) {
        console.warn("Invalid canvas dimensions:", canvas.width, canvas.height)
        return null
      }

      try {
        // 低解像度のノイズを生成
        const smallCanvas = document.createElement("canvas")
        const smallCtx = smallCanvas.getContext("2d")
        if (!smallCtx) return null

        // 画面サイズを縮小（最小サイズを保証）
        const smallWidth = Math.max(Math.ceil(canvas.width / scale), 1)
        const smallHeight = Math.max(Math.ceil(canvas.height / scale), 1)

        smallCanvas.width = smallWidth
        smallCanvas.height = smallHeight

        const imageData = smallCtx.createImageData(smallWidth, smallHeight)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const value = Math.random() * 255
          data[i] = value // R
          data[i + 1] = value // G
          data[i + 2] = value // B
          data[i + 3] = Math.random() * 255 * opacity // A
        }

        smallCtx.putImageData(imageData, 0, 0)
        return smallCanvas
      } catch (error) {
        console.error("Error creating noise:", error)
        return null
      }
    }

    // 時間変数
    let time = 0

    // ノイズアニメーションを描画
    const animate = () => {
      if (!isMountedRef.current || !ctx) return

      try {
        // 時間を更新
        time += 0.01 * speed

        // 新しいノイズを生成
        const noiseCanvas = createNoise()
        if (!noiseCanvas) {
          // エラーが発生した場合は次のフレームをリクエスト
          animationFrameRef.current = requestAnimationFrame(animate)
          return
        }

        // キャンバスをクリア
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // 低解像度のノイズを拡大して描画
        ctx.drawImage(noiseCanvas, 0, 0, canvas.width, canvas.height)

        // 次のフレームをリクエスト
        animationFrameRef.current = requestAnimationFrame(animate)
      } catch (error) {
        console.error("Animation error:", error)
      }
    }

    // アニメーションを開始（サイズが有効な場合のみ）
    if (dimensions.width > 0 && dimensions.height > 0) {
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // クリーンアップ
    return () => {
      isMountedRef.current = false
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [opacity, speed, scale, dimensions.width, dimensions.height])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity }} />
  )
}
