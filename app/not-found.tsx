"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ModernLayout } from "@/components/modern-layout"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  const [noiseOpacity, setNoiseOpacity] = useState(0.05)
  const [randomDigits, setRandomDigits] = useState<string[]>([])

  // 数字のアニメーション用のランダムな数字を生成
  useEffect(() => {
    const generateRandomDigits = () => {
      const digits = []
      for (let i = 0; i < 20; i++) {
        digits.push(Math.floor(Math.random() * 10).toString())
      }
      return digits
    }

    // 初期の数字を設定
    setRandomDigits(generateRandomDigits())

    // 定期的に数字を更新
    const interval = setInterval(() => {
      setRandomDigits(generateRandomDigits())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // 両方のボタンに適用する共通クラス
  const buttonClass =
    "border border-yellow-900/20 text-white px-6 py-3 whitespace-nowrap inline-flex items-center justify-center transition-all duration-300 relative overflow-hidden group bg-black/20 backdrop-blur-sm"

  return (
    <ModernLayout noiseOpacity={noiseOpacity}>
      <div className="min-h-screen flex flex-col">
        {/* ヘッダー */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-yellow-900/20">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Logo size={28} />
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="flex-1 flex items-center justify-center px-4 pt-16">
          <div className="max-w-2xl w-full text-center">
            {/* 404アニメーション */}
            <div className="relative mb-8">
              <div className="text-[120px] md:text-[180px] font-bold text-yellow-500/20 select-none">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[120px] md:text-[180px] font-bold bg-clip-text text-transparent bg-gradient-to-b from-yellow-400 to-yellow-600 select-none">
                  404
                </div>
              </div>

              {/* 背景の数字 */}
              <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
                {randomDigits.map((digit, index) => (
                  <span
                    key={index}
                    className="absolute text-yellow-500 text-opacity-30 transition-all duration-1000"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      fontSize: `${Math.random() * 20 + 10}px`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                  >
                    {digit}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="text-3xl font-light mb-4">ページが見つかりません</h1>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              お探しのページは存在しないか、移動または削除された可能性があります。 URLが正しいかご確認ください。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className={buttonClass}>
                <Link href="/" className="flex items-center relative z-10">
                  <Home size={20} className="mr-2.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">ホームに戻る</span>
                </Link>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 border border-yellow-400/50 rounded-full opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-300"></span>
                <span className="absolute -inset-1 bg-yellow-400/10 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300 group-hover:duration-200"></span>
              </Button>

              <Button variant="outline" className={buttonClass}>
                <Link href="javascript:history.back()" className="flex items-center relative z-10">
                  <ArrowLeft size={20} className="mr-2.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">前のページに戻る</span>
                </Link>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 border border-yellow-400/50 rounded-full opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-300"></span>
                <span className="absolute -inset-1 bg-yellow-400/10 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300 group-hover:duration-200"></span>
              </Button>
            </div>
          </div>
        </main>

        {/* フッター */}
        <footer className="border-t border-yellow-900/20 py-6 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Connectix 2. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ModernLayout>
  )
}
