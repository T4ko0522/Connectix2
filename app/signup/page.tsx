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
import { Mail, Lock, User, ChevronDown, ArrowRight, Eye, EyeOff } from "lucide-react"
import { GoogleIcon } from "@/components/icons"
import { toast } from "react-toastify"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
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
      // 入力値の検証
      if (!email || !password || !username) {
        toast.error("すべての必須項目を入力してください", {
          position: "bottom-right",
        })
        setIsLoading(false)
        return
      }

      // パスワードの長さチェック
      if (password.length < 8) {
        toast.error("パスワードは8文字以上である必要があります", {
          position: "bottom-right",
        })
        setIsLoading(false)
        return
      }

      // 数字を含むかチェック
      if (!/\d/.test(password)) {
        toast.error("パスワードには少なくとも1つの数字を含める必要があります", {
          position: "bottom-right",
        })
        setIsLoading(false)
        return
      }

      // 小文字を含むかチェック
      if (!/[a-z]/.test(password)) {
        toast.error("パスワードには少なくとも1つの小文字を含める必要があります", {
          position: "bottom-right",
        })
        setIsLoading(false)
        return
      }

      // 登録情報を一時的にローカルストレージに保存
      localStorage.setItem("signup_temp_email", email)
      localStorage.setItem("signup_temp_username", username) //TODO - ユーザー名の保存 デバッグ用
      localStorage.setItem("signup_temp_password", password) // 実際のアプリではセキュリティ上の理由から保存しません。

      // 二段階認証ページに遷移
      setTimeout(() => {
        setIsLoading(false)
        router.push("/signup/verify")
      }, 1000)
    } catch (error) {
      console.error("登録エラー:", error)
      toast.error("アカウント登録中にエラーが発生しました", {
        position: "bottom-right",
      })
      setIsLoading(false)
    }
  }

  const handleSocialSignup = (provider: string) => {
    setIsLoading(true)
    console.log(`${provider}で登録処理を開始します...`)

    try {
      // Google認証情報をローカルストレージに保存
      localStorage.setItem("google_auth_email", "google_user@example.com")
      localStorage.setItem("google_auth_name", "Google User") // TODO - ユーザー名の保存 デバッグ用
      localStorage.setItem("google_auth_picture", "https://example.com/profile.jpg") // これはデバッグ用としてlocalStorageに保存していますが、実際のアプリではセキュリティ上の理由から保存しません。

      console.log("Google認証情報を保存しました。ユーザー名設定画面に遷移します...")

      // 直接window.locationを使用してリダイレクト
      window.location.href = "/signup/username"
    } catch (error) {
      console.error("ソーシャル登録エラー:", error)
      toast.error(`${provider}での登録中にエラーが発生しました`, {
        position: "bottom-right",
      })
      setIsLoading(false)
    }
  }

  // ユーザー名の入力を処理し、localStorageを更新
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsername(value)
    localStorage.setItem("saved_username", value)
  }

  return (
    <ModernLayout noiseOpacity={noiseOpacity}>
      <div className="flex min-h-screen">
        {/* 左側のセクション */}
        <div className="hidden w-1/2 flex-col justify-between p-12 md:flex">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Logo size={40} />
            </div>
            <p className="modern-subtitle">個人やチームのための、モダンなリンク共有プラットフォーム。</p>

            <button className="mt-8 flex items-center text-sm text-white/50 hover:text-yellow-400 font-light tracking-wide">
              <span>含まれる機能を見る</span>
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>

          {/* イラスト */}
          <div className="relative h-64">
            <div className="absolute bottom-0 left-0 h-32 w-32 animate-float">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-yellow-500/30 to-yellow-300/30 backdrop-blur-md"></div>
            </div>
            <div className="absolute right-12 top-0 h-24 w-24 animate-float-delay">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-yellow-400/30 to-yellow-200/30 backdrop-blur-md"></div>
            </div>
          </div>
        </div>

        {/* 右側のフォーム */}
        <div className="flex w-full flex-col items-center justify-center p-6 md:w-1/2">
          <div className="w-full max-w-md">
            <div className="mb-8 flex flex-col items-center md:hidden">
              <Logo size={48} />
              <h2 className="mt-4 text-center text-2xl font-light tracking-wide">Connectix 2 に登録</h2>
            </div>

            <h2 className="mb-10 hidden text-center text-2xl font-light tracking-wide md:block">Connectix 2 に登録</h2>

            {/* 通常のサインアップフォーム（上部に配置） */}
            <form onSubmit={handleSubmit} className="space-y-6 mb-6">
              <div>
                <Label htmlFor="email" className="mb-2 block text-sm font-light tracking-wide text-white/70">
                  メールアドレス<span className="text-yellow-400">*</span>
                </Label>
                <div className="flex">
                  <div className="mr-2">
                    <IconButton icon={<Mail size={16} />} type="button" tabIndex={-1} />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="modern-input flex-1"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="mb-2 block text-sm font-light tracking-wide text-white/70">
                  パスワード<span className="text-yellow-400">*</span>
                </Label>
                <div className="flex">
                  <div className="mr-2">
                    <IconButton icon={<Lock size={16} />} type="button" tabIndex={-1} />
                  </div>
                  <div className="relative flex-1">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="modern-input pr-10 w-full"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-xs text-white/50 font-light">
                  パスワードは8文字以上で、数字と小文字を含める必要があります。
                </p>
              </div>

              <div>
                <Label htmlFor="username" className="mb-2 block text-sm font-light tracking-wide text-white/70">
                  ユーザー名<span className="text-yellow-400">*</span>
                </Label>
                <div className="flex">
                  <div className="mr-2">
                    <IconButton icon={<User size={16} />} type="button" tabIndex={-1} />
                  </div>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="modern-input flex-1"
                    placeholder="username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <p className="mt-1 text-xs text-white/50 font-light">
                  ユーザー名には英数字とハイフンのみ使用でき、ハイフンで始まったり終わったりすることはできません。
                </p>
              </div>

              <Button
                type="submit"
                className="modern-button-primary w-full flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? "処理中..." : "続ける"}
                {!isLoading && <ArrowRight size={16} />}
              </Button>
            </form>

            {/* 区切り線 */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-black px-2 text-white/50 font-light">または</span>
              </div>
            </div>

            {/* ソーシャルサインアップ（下部に配置） */}
            <div className="space-y-3">
              <SocialButton
                icon={<GoogleIcon />}
                onClick={() => handleSocialSignup("Google")}
                disabled={isLoading}
                className="modern-button w-full bg-transparent flex items-center gap-2"
              >
                Googleで登録
              </SocialButton>
            </div>

            <p className="mt-6 text-xs text-white/50 font-light">
              アカウントを作成することで、
              <Link href="#" className="text-yellow-400/80 hover:text-yellow-400">
                利用規約
              </Link>
              に同意したことになります。プライバシーについての詳細は
              <Link href="#" className="text-yellow-400/80 hover:text-yellow-400">
                プライバシーポリシー
              </Link>
              をご覧ください。
            </p>
          </div>
        </div>
      </div>
    </ModernLayout>
  )
}
