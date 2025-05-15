"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { ModernLayout } from "@/components/modern-layout"

export default function NewPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [accessToken, setAccessToken] = useState<string | null | undefined>(undefined)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [noiseOpacity, setNoiseOpacity] = useState(0.03)

  useEffect(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.replace(/^#/, "")) // '#' 除去

    const access = params.get("access_token")
    const refresh = params.get("refresh_token")

    if (access) {
      sessionStorage.setItem("reset_token", access)
    }
    if (refresh) {
      sessionStorage.setItem("reset_refresh_token", refresh)
    }

    setAccessToken(access)
    setRefreshToken(refresh)
    setLoading(false)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("パスワードが一致しません。")
      return
    }

    if (password.length < 8) {
      setError("パスワードは8文字以上である必要があります。")
      return
    }

    if (!accessToken) {
      setError("トークンが無効です。メールリンクから再度アクセスしてください。")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch("/api/auth/reset/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: accessToken, refresh_token: refreshToken, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "パスワードの更新に失敗しました。")
      } else {
        setIsSuccess(true)
        sessionStorage.removeItem("reset_token")
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      }
    } catch (err) {
      console.error(err)
      setError("ネットワークエラーが発生しました。")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <ModernLayout noiseOpacity={noiseOpacity}>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-white/70">確認中...</p>
        </div>
      </ModernLayout>
    )
  }

  if (!accessToken) {
    return (
      <ModernLayout noiseOpacity={noiseOpacity}>
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
          <div className="mb-10"><Logo size={56} /></div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-light tracking-wide">無効なリンク</h1>
            <p className="mt-2 text-sm text-white/70 font-light">
              このリンクは無効か期限切れです。
              <br />
              パスワードリセットプロセスをもう一度開始してください。
            </p>
          </div>
          <div className="mt-6">
            <Link href="/reset-password" className="flex items-center text-sm text-white/50 hover:text-yellow-400 font-light tracking-wide">
              <ArrowLeft className="mr-2 h-4 w-4" />
              パスワードリセットに戻る
            </Link>
          </div>
        </div>
      </ModernLayout>
    )
  }

  return (
    <ModernLayout noiseOpacity={noiseOpacity}>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mb-10"><Logo size={56} /></div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light tracking-wide">新しいパスワードを設定</h1>
          <p className="mt-2 text-sm text-white/70 font-light">安全な新しいパスワードを入力してください。</p>
        </div>

        {isSuccess ? (
          <div className="w-full max-w-[340px] border border-white/10 bg-green-500/20 backdrop-blur-sm p-6">
            <div className="text-center">
              <h2 className="text-xl font-light text-white">パスワードが更新されました！</h2>
              <p className="mt-2 text-sm text-white/70 font-light">
                新しいパスワードでログインできるようになりました。
                <br />
                ログインページに移動します...
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[340px] border border-white/10 bg-black/30 backdrop-blur-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-light tracking-wide text-white/70">
                  新しいパスワード
                </label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="modern-input pr-10"
                    placeholder="8文字以上"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-light tracking-wide text-white/70">
                  パスワードを確認
                </label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="modern-input pr-10"
                    placeholder="パスワードを再入力"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/50 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && <div className="rounded-md bg-red-500/20 p-3 text-sm text-red-200">{error}</div>}

              <Button
                type="submit"
                className="modern-button-primary w-full flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "更新中..." : "パスワードを更新"}
              </Button>
            </form>
          </div>
        )}

        <div className="mt-6">
          <Link href="/login" className="flex items-center text-sm text-white/50 hover:text-yellow-400 font-light tracking-wide">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ログインページに戻る
          </Link>
        </div>
      </div>
    </ModernLayout>
  )
}
