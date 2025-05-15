"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { OptimizedNoiseBackground } from "@/components/optimized-noise-background"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, AlertTriangle, RefreshCw } from "lucide-react"
import { toast } from "react-toastify"
import Link from "next/link"

export default function VerifyPage() {
  const router = useRouter()
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [countdown, setCountdown] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // ローカルストレージから登録情報を取得
    const tempEmail = localStorage.getItem("signup_temp_email")
    const tempUsername = localStorage.getItem("signup_temp_username")

    if (!tempEmail || !tempUsername) {
      // 登録情報がない場合は登録ページにリダイレクト
      router.push("/signup")
      return
    }

    setEmail(tempEmail)
    setUsername(tempUsername)

    // 最初の入力フィールドにフォーカス
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }

    // カウントダウンタイマーを開始
    startCountdown()

    return () => {
      // コンポーネントのアンマウント時にタイマーをクリア
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [router])

  const startCountdown = () => {
    setCountdown(60)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

const handleInputChange = (index: number, value: string) => {
  const newCode = [...code]

  if (value.length > 1) {
    // 複数の文字が貼り付けられた場合
    const chars = value.split("")
    for (let i = 0; i < Math.min(chars.length, 6 - index); i++) {
      if (/^[0-9]$/.test(chars[i])) {
        newCode[index + i] = chars[i]
      }
    }
    setCode(newCode)

    const lastIndex = Math.min(index + chars.length, 5)
    inputRefs.current[lastIndex]?.focus()
  } else if (/^[0-9]$/.test(value)) {
    // 単一数字入力時 → 次へ移動
    newCode[index] = value
    setCode(newCode)
    if (index < 5) inputRefs.current[index + 1]?.focus()
  } else if (value === "") {
    // 削除時 → そのまま
    newCode[index] = ""
    setCode(newCode)
  }
}

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // バックスペースキーが押された場合、前の入力フィールドにフォーカス
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResendCode = () => {
    if (countdown > 0) return

    setIsResending(true)
    setError("")

    // 実際のアプリケーションでは、ここでAPIを呼び出して新しい認証コードを送信します
    setTimeout(() => {
      setIsResending(false)
      startCountdown()
      toast.info("新しい認証コードを送信しました", {
        position: "bottom-right",
        autoClose: 3000,
      })
    }, 1500)
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

    // 実際のアプリケーションでは、ここでAPIを呼び出して認証コードを検証します
    // このデモでは、コード "123456" を正しいコードとします
    setTimeout(() => {
      if (fullCode === "123456") {
        // 認証成功 - 直接アカウント登録を完了させる
        completeRegistration()
      } else {
        // 認証失敗
        setError("認証コードが正しくありません")
        setIsLoading(false)
      }
    }, 1500)
  }

  const completeRegistration = () => {
    // ローカルストレージから登録情報を取得
    const tempPassword = localStorage.getItem("signup_temp_password")

    if (!email || !username || !tempPassword) {
      toast.error("登録情報が不完全です", {
        position: "bottom-right",
      })
      setIsLoading(false)
      return
    }

    console.log("アカウント登録を完了します...")

    // 実際のアプリケーションでは、ここでAPIを呼び出してユーザーを登録します
    setTimeout(() => {
      try {
        // 登録成功
        localStorage.setItem("is_logged_in", "true")

        // 一時的な登録情報を削除
        localStorage.removeItem("signup_temp_email")
        localStorage.removeItem("signup_temp_username")
        localStorage.removeItem("signup_temp_password")

        toast.success(`${username}さん、アカウント登録が完了しました！`, {
          icon: () => <span>🎉</span>,
          position: "bottom-right",
        })

        // ダッシュボードに直接遷移
        window.location.href = "/dashboard"
      } catch (error) {
        console.error("登録完了エラー:", error)
        toast.error("登録の完了中にエラーが発生しました", {
          position: "bottom-right",
        })
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* 背景エフェクト */}
      <OptimizedNoiseBackground opacity={0.05} speed={0.8} scale={4} className="fixed inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-black/20 pointer-events-none"></div>

      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-yellow-500/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={() => router.push("/signup")}
            >
              <ArrowLeft size={20} />
            </Button>
            <Logo size={28} />
            <span className="text-sm font-light text-gray-400">| アカウント認証</span>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 flex items-center justify-center pt-16 pb-8 px-4">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 mb-4">
                <Shield size={32} className="text-yellow-500" />
              </div>
              <h1 className="text-2xl font-light mb-2">メールアドレスを確認</h1>
              <p className="text-gray-400 text-sm">{email} に送信された6桁の認証コードを入力してください</p>
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
                      className="w-10 h-12 bg-black/30 border border-yellow-500/20 rounded-md text-center text-lg focus:outline-none focus:border-yellow-500/50"
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
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                  disabled={isLoading || code.join("").length !== 6}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      処理中...
                    </>
                  ) : (
                    "認証する"
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-yellow-500/10 text-center">
              <p className="text-sm text-gray-400 mb-4">認証コードが届きませんか？</p>
              <Button
                type="button"
                variant="outline"
                className="text-sm border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
                onClick={handleResendCode}
                disabled={countdown > 0 || isResending}
              >
                {isResending ? (
                  <>
                    <RefreshCw size={14} className="mr-2 animate-spin" />
                    送信中...
                  </>
                ) : countdown > 0 ? (
                  `再送信 (${countdown}秒後に可能)`
                ) : (
                  "コードを再送信"
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
