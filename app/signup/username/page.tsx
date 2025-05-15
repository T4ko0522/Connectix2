"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ModernLayout } from "@/components/modern-layout"
import { Logo } from "@/components/logo"
import { IconButton } from "@/components/ui/icon-button"
import { User, Check, AlertCircle, ArrowRight } from "lucide-react"
import { toast } from "react-toastify"

export default function UsernameSetupPage() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [noiseOpacity, setNoiseOpacity] = useState(0.03)
  const [googleName, setGoogleName] = useState("")
  const [googleEmail, setGoogleEmail] = useState("")
  const [googlePicture, setGooglePicture] = useState("")
  const router = useRouter()

  // Google認証情報をローカルストレージから取得
  useEffect(() => {
    const name = localStorage.getItem("google_auth_name")
    const email = localStorage.getItem("google_auth_email")
    const picture = localStorage.getItem("google_auth_picture")

    if (!name || !email) {
      // Google認証情報がない場合は登録ページにリダイレクト
      toast.error("Google認証情報が見つかりません", {
        position: "bottom-right",
      })
      router.push("/signup")
      return
    }

    setGoogleName(name)
    setGoogleEmail(email)
    if (picture) setGooglePicture(picture)

    // ユーザー名の初期値は設定しない（空のままにする）
    // 以前のコード：
    // const suggestedUsername = name
    //   .toLowerCase()
    //   .replace(/\s+/g, "")
    //   .replace(/[^a-z0-9-]/g, "")
    // setUsername(suggestedUsername)

    // ノイズの設定を取得
    const savedNoiseOpacity = sessionStorage.getItem("noise_opacity")
    if (savedNoiseOpacity) {
      setNoiseOpacity(Number.parseFloat(savedNoiseOpacity))
    }
  }, [router])

  // ユーザー名の入力を処理
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") // 英数字とハイフンのみ許可
    setUsername(value)

    // ユーザー名の可用性をチェック（デモでは単純な条件）
    if (value.length >= 1 && value.length <= 20 && /^[a-z0-9].*[a-z0-9]$/.test(value)) {
      setIsAvailable(true)
    } else {
      setIsAvailable(false)
    }
  }

  // ユーザー名の設定を完了
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // ユーザー名のバリデーション
      if (!username) {
        toast.error("ユーザー名を入力してください", {
          position: "bottom-right",
        })
        setIsLoading(false)
        return
      }

      if (username.length < 1 || username.length > 20) {
        toast.error("ユーザー名は1文字以上20文字以下である必要があります", {
          position: "bottom-right",
        })
        setIsLoading(false)
        return
      }

      if (!/^[a-z0-9].*[a-z0-9]$/.test(username)) {
        toast.error("ユーザー名はハイフンで始まったり終わったりすることはできません", {
          position: "bottom-right",
        })
        setIsLoading(false)
        return
      }

      // 実際のアプリケーションでは、ここでAPIを呼び出してユーザーを登録します
      setTimeout(() => {
        // 登録成功
        localStorage.setItem("is_logged_in", "true")
        localStorage.setItem("username", username)

        // Google認証情報を削除
        localStorage.removeItem("google_auth_name")
        localStorage.removeItem("google_auth_email")
        localStorage.removeItem("google_auth_picture")

        toast.success(`${username}さん、アカウント登録が完了しました！`, {
          icon: () => <span>🎉</span>,
          position: "bottom-right",
        })

        // ダッシュボードページに遷移
        window.location.href = "/dashboard"
      }, 1500)
    } catch (error) {
      console.error("ユーザー名設定エラー:", error)
      toast.error("ユーザー名の設定中にエラーが発生しました", {
        position: "bottom-right",
      })
      setIsLoading(false)
    }
  }

  return (
    <ModernLayout noiseOpacity={noiseOpacity}>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md p-6">
          <div className="mb-8 flex flex-col items-center">
            <Logo size={48} />
            <h2 className="mt-4 text-center text-2xl font-light tracking-wide">ユーザー名を設定</h2>
            <p className="mt-2 text-center text-sm text-white/60 font-light">
              Googleアカウントでの認証が完了しました。続けるにはユーザー名を設定してください。
            </p>
          </div>

          {/* Google認証情報の表示 */}
          <div className="mb-8 rounded-lg bg-white/5 p-4">
            <div className="flex items-center">
              {googlePicture ? (
                <img src={googlePicture || "/placeholder.svg"} alt="Profile" className="mr-3 h-10 w-10 rounded-full" />
              ) : (
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
                  <span className="text-lg font-medium text-yellow-400">{googleName.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div>
                <p className="font-medium text-white">{googleName}</p>
                <p className="text-sm text-white/60">{googleEmail}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="mb-2 block text-sm font-light tracking-wide text-white/70">
                ユーザー名<span className="text-yellow-400">*</span>
              </Label>
              <div className="flex">
                <div className="mr-2">
                  <IconButton icon={<User size={16} />} type="button" tabIndex={-1} />
                </div>
                <div className="relative flex-1">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="modern-input pr-10 w-full"
                    placeholder="username"
                    value={username}
                    onChange={handleUsernameChange}
                    maxLength={20}
                    autoFocus
                  />
                  {isAvailable !== null && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isAvailable ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <AlertCircle size={16} className="text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2">
                {isAvailable === true && <p className="text-xs text-green-500">このユーザー名は利用可能です</p>}
                {isAvailable === false && (
                  <p className="text-xs text-red-500">
                    ユーザー名は1〜20文字の英数字とハイフンで、ハイフンは先頭と末尾に使用できません
                  </p>
                )}
                {isAvailable === null && (
                  <p className="mt-1 text-xs text-white/50 font-light">
                    ユーザー名には英数字とハイフンのみ使用でき、1〜20文字である必要があります
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="modern-button-primary w-full flex items-center justify-center gap-2"
              disabled={isLoading || !isAvailable}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  処理中...
                </>
              ) : (
                <>
                  アカウント登録を完了する
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </ModernLayout>
  )
}
