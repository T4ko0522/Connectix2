"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { OptimizedNoiseBackground } from "@/components/optimized-noise-background"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { toast } from "react-toastify"

export default function VRChat2FAPage() {
  const router = useRouter()
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // ローカルストレージからユーザー名を取得
    const savedUsername = localStorage.getItem("vrchat_temp_username")
    if (!savedUsername) {
      // ユーザー名がない場合はログインページにリダイレクト
      router.push("/vrchat-login")
      return
    }

    setUsername(savedUsername)

    // 最初の入力フィールドにフォーカス
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [router])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      // 複数の文字が入力された場合（コピペなど）
      const chars = value.split("")
      const newCode = [...code]

      for (let i = 0; i < Math.min(chars.length, 6 - index); i++) {
        if (/^[0-9]$/.test(chars[i])) {
          newCode[index + i] = chars[i]
        }
      }

      setCode(newCode)

      // 最後の入力フィールドにフォーカス
      const lastIndex = Math.min(index + chars.length, 5)
      if (inputRefs.current[lastIndex]) {
        inputRefs.current[lastIndex].focus()
      }
    } else if (/^[0-9]$/.test(value) || value === "") {
      // 単一の数字または削除の場合
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // 次の入力フィールドにフォーカス（削除の場合は移動しない）
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // バックスペースキーが押された場合、前の入力フィールドにフォーカス
    if (e.key === "Backspace" && !code[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const fullCode = code.join("")
    if (fullCode.length !== 6) {
      setError("6桁の認証コードを入力してください")
      return
    }

    setIsLoading(true)

    // 実際のアプリケーションでは、ここでVRChatのAPIを呼び出します
    // このデモでは、ローカルストレージに保存して、ダッシュボードに戻ります
    setTimeout(() => {
      localStorage.setItem("vrchat_connected", "true")
      localStorage.setItem("vrchat_username", username)
      localStorage.removeItem("vrchat_temp_username")

      setIsLoading(false)
      toast.success("VRChatアカウントを連携しました", {
        position: "bottom-right",
        autoClose: 3000,
      })

      router.push("/dashboard?tab=settings")
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
              onClick={() => router.push("/vrchat-login")}
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
              <h1 className="text-2xl font-light mb-2">二段階認証</h1>
              <p className="text-gray-400 text-sm">
                VRChatアプリまたは認証アプリに表示された6桁のコードを入力してください
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
                <AlertTriangle size={16} className="text-red-500 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-light text-gray-400 mb-3 text-center">認証コード</label>
                <div className="flex justify-center gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      className="w-10 h-12 bg-black/30 border border-[#0076FF]/20 rounded-md text-center text-lg focus:outline-none focus:border-[#0076FF]/50"
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-[#0076FF] hover:bg-[#0076FF]/80 text-white"
                  disabled={isLoading || code.join("").length !== 6}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      認証中...
                    </>
                  ) : (
                    "認証して連携する"
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-[#0076FF]/10 text-center">
              <p className="text-xs text-gray-500 mb-2">
                認証コードが届かない場合は、VRChatアプリを確認するか、
                <br />
                認証アプリに登録されているコードを入力してください。
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
