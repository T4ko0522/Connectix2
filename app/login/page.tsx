"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { SocialButton } from "@/components/ui/social-button"
import { Logo } from "@/components/logo"
import { ModernLayout } from "@/components/modern-layout"
import { IconButton } from "@/components/ui/icon-button"
import { User, Lock, ArrowRight } from "lucide-react"
import { GoogleIcon } from "@/components/icons"
import { toast } from "react-toastify"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [noiseOpacity, setNoiseOpacity] = useState(0.03)
  const router = useRouter()

  // ページ読み込み時に保存されたユーザー名を取得
  useEffect(() => {
    const savedUsername = localStorage.getItem("saved_username")
    if (savedUsername) {
      setUsername(savedUsername)
    }

    // ノイズの設定を取得
    const savedNoiseOpacity = sessionStorage.getItem("noise_opacity")
    if (savedNoiseOpacity) {
      setNoiseOpacity(Number.parseFloat(savedNoiseOpacity))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "ログインに失敗しました")
      } else {
        toast.success(`${data.user.email} さん、ようこそ！`, {
          icon: () => <span>👋</span>,
        })
        router.push("/dashboard")
      }
    } catch (e) {
      console.error("ログインエラー:", e)
      toast.error("ネットワークエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)
    console.log(`${provider}でログイン`)

    // ダミーの処理
    setTimeout(() => {
      // ログイン状態をローカルストレージに保存
      localStorage.setItem("is_logged_in", "true")

      // ソーシャルログイン成功のトースト通知
      toast.success(`${provider}でログインしました！`, {
        icon: () => <span>🌐</span>,
      })

      setIsLoading(false)
      router.push("/")
    }, 1000)
  }

  return (
    <ModernLayout noiseOpacity={noiseOpacity}>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* ロゴ */}
        <div className="mb-10">
          <Logo size={56} />
        </div>

        {/* タイトル */}
        <h1 className="mb-10 text-2xl font-light tracking-wide">Connectix 2 にサインイン</h1>

        {/* ログインフォーム */}
        <div className="w-full max-w-[340px] border border-white/10 bg-black/30 backdrop-blur-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="mb-2 block text-sm font-light tracking-wide text-white/70">
                メールアドレス
              </Label>
              <div className="flex">
                <div className="mr-2">
                  <IconButton icon={<User size={16} />} type="button" tabIndex={-1} />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="modern-input flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password" className="text-sm font-light tracking-wide text-white/70">
                  パスワード
                </Label>
                <Link
                  href="/reset-password"
                  className="text-xs text-yellow-400/80 hover:text-yellow-400 font-light tracking-wide"
                >
                  パスワードをお忘れですか？
                </Link>
              </div>
              <div className="flex">
                <div className="mr-2">
                  <IconButton icon={<Lock size={16} />} type="button" tabIndex={-1} />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="modern-input flex-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="modern-button-primary w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? "サインイン中..." : "サインイン"}
              {!isLoading && <ArrowRight size={16} />}
            </Button>
          </form>
        </div>

        {/* ソーシャルログイン */}
        <div className="mt-4 w-full max-w-[340px] border border-white/10 bg-black/30 backdrop-blur-sm p-4">
          <div className="space-y-3">
            <SocialButton
              icon={<GoogleIcon />}
              onClick={() => handleSocialLogin("Google")}
              disabled={isLoading}
              className="modern-button w-full bg-transparent flex items-center gap-2"
            >
              Googleでサインイン
            </SocialButton>
          </div>
        </div>

        {/* アカウント作成リンク */}
        <div className="mt-4 w-full max-w-[340px] border border-white/10 bg-black/30 backdrop-blur-sm p-4 text-center">
          <p className="text-sm font-light tracking-wide text-white/70">
            アカウントをお持ちでない場合は{" "}
            <Link href="/signup" className="text-yellow-400/80 hover:text-yellow-400">
              こちらからサインアップ
            </Link>
          </p>
        </div>

        {/* フッター */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs font-light tracking-wide text-white/50">
          <Link href="#" className="hover:text-yellow-400">
            利用規約
          </Link>
          <Link href="#" className="hover:text-yellow-400">
            プライバシー
          </Link>
          <Link href="#" className="hover:text-yellow-400">
            ドキュメント
          </Link>
          <Link href="#" className="hover:text-yellow-400">
            お問い合わせ
          </Link>
        </div>
      </div>
    </ModernLayout>
  )
}
