"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { ModernLayout } from "@/components/modern-layout"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [noiseOpacity, setNoiseOpacity] = useState(0.03)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch("/api/auth/reset/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "パスワードリセットメールの送信に失敗しました。")
        return
      }

      window.location.href = "/reset-password/verify"
    } catch (err) {
      console.error(err)
      setError("ネットワークエラーが発生しました。もう一度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ModernLayout noiseOpacity={noiseOpacity}>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mb-10">
          <Logo size={56} />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-light tracking-wide">パスワードをリセット</h1>
          <p className="mt-2 text-sm text-white/70 font-light">
            アカウントに関連付けられたメールアドレスを入力してください。
            <br />
            パスワードリセット用のリンクをお送りします。
          </p>
        </div>

        <div className="w-full max-w-[340px] border border-white/10 bg-black/30 backdrop-blur-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-light tracking-wide text-white/70">
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="modern-input mt-1"
              />
            </div>

            {error && <div className="rounded-md bg-red-500/20 p-3 text-sm text-red-200">{error}</div>}

            <Button
              type="submit"
              className="modern-button-primary w-full flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "送信中..." : "リセットリンクを送信"}
            </Button>
          </form>
        </div>

        <div className="mt-6">
          <Link
            href="/login"
            className="flex items-center text-sm text-white/50 hover:text-yellow-400 font-light tracking-wide"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            ログインページに戻る
          </Link>
        </div>
      </div>
    </ModernLayout>
  )
}
