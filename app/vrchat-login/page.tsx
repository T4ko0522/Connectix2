"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { OptimizedNoiseBackground } from "@/components/optimized-noise-background"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ArrowLeft, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function VRChatLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username.trim()) {
      setError("ユーザー名またはメールアドレスを入力してください")
      return
    }

    if (!password.trim()) {
      setError("パスワードを入力してください")
      return
    }

    setIsLoading(true)

    // 実際のアプリケーションでは、ここでVRChatのAPIを呼び出します
    // このデモでは、ローカルストレージに保存して、2FAページに遷移します
    setTimeout(() => {
      // 2FAが必要なユーザーとしてシミュレーション
      localStorage.setItem("vrchat_temp_username", username)

      setIsLoading(false)
      router.push("/vrchat-2fa")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* 背景エフェクト */}
      <OptimizedNoiseBackground opacity={0.05} speed={0.8} scale={4} className="fixed inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0076FF]/5 via-transparent to-black/20 pointer-events-none"></div>

      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-[#0076FF]/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={() => router.back()}
            >
              <ArrowLeft size={20} />
            </Button>
            <Logo size={28} />
            <span className="text-sm font-light text-gray-400">| VRChat連携</span>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 flex items-center justify-center pt-16 pb-8 px-4">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-[#0076FF]/20 rounded-xl p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0076FF]/10 mb-4">
                <Shield size={32} className="text-[#0076FF]" />
              </div>
              <h1 className="text-2xl font-light mb-2">VRChatアカウントにログイン</h1>
              <p className="text-gray-400 text-sm">VRChatアカウントを連携して、プロフィールにステータスを表示します</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
                <AlertTriangle size={16} className="text-red-500 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-light text-gray-400 mb-1">ユーザー名またはメールアドレス</label>
                <input
                  type="text"
                  className="w-full bg-black/30 border border-[#0076FF]/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0076FF]/50"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username_123"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-gray-400 mb-1">パスワード</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-black/30 border border-[#0076FF]/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0076FF]/50 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-[#0076FF] hover:bg-[#0076FF]/80 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      ログイン中...
                    </>
                  ) : (
                    "ログイン"
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-[#0076FF]/10 text-center">
              <p className="text-xs text-gray-500 mb-2">
                ログインすることで、VRChatのアカウント情報へのアクセスを許可します。
                <br />
                Connectix 2はあなたのパスワードを保存しません。
              </p>
              <Link href="/dashboard" className="text-xs text-[#0076FF] hover:underline">
                キャンセルして戻る
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
