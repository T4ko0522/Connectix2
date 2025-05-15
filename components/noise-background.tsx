"use client"

import { useEffect, useRef } from "react"

interface NoiseBackgroundProps {
  opacity?: number
  speed?: number
  className?: string
}

export function NoiseBackground({ opacity = 0.03, speed = 1, className = "" }: NoiseBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // キャンバスサイズをウィンドウサイズに設定
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // ノイズデータを生成
    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value // R
        data[i + 1] = value // G
        data[i + 2] = value // B
        data[i + 3] = Math.random() * 255 * opacity // A
      }

      return imageData
    }

    // 前回のノイズデータ
    let previousNoiseData: ImageData | null = null
    // 現在のノイズデータ
    let currentNoiseData = createNoise()
    // 次のノイズデータ
    let nextNoiseData = createNoise()
    // 補間の進行度（0〜1）
    let interpolationProgress = 0

    // ノイズアニメーションを描画
    const animate = () => {
      // 補間の進行度を更新
      interpolationProgress += 0.01 * speed

      // 補間が完了したら次のノイズデータに移行
      if (interpolationProgress >= 1) {
        previousNoiseData = currentNoiseData
        currentNoiseData = nextNoiseData
        nextNoiseData = createNoise()
        interpolationProgress = 0
      }

      // 現在のノイズデータと次のノイズデータを補間
      const interpolatedData = ctx.createImageData(canvas.width, canvas.height)
      const data = interpolatedData.data
      const currentData = currentNoiseData.data
      const nextData = nextNoiseData.data

      for (let i = 0; i < data.length; i += 4) {
        // 線形補間
        data[i] = currentData[i] * (1 - interpolationProgress) + nextData[i] * interpolationProgress
        data[i + 1] = currentData[i + 1] * (1 - interpolationProgress) + nextData[i + 1] * interpolationProgress
        data[i + 2] = currentData[i + 2] * (1 - interpolationProgress) + nextData[i + 2] * interpolationProgress
        data[i + 3] = currentData[i + 3] * (1 - interpolationProgress) + nextData[i + 3] * interpolationProgress
      }

      // 補間したノイズデータを描画
      ctx.putImageData(interpolatedData, 0, 0)

      // 次のフレームをリクエスト
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // アニメーションを開始
    animationFrameRef.current = requestAnimationFrame(animate)

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [opacity, speed])

  return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 ${className}`} />
}
