"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Logo } from "@/components/logo"
import { LoadingScreen } from "@/components/loading-screen"
import { usePathname, useRouter } from "next/navigation"
import { ModernLayout } from "@/components/modern-layout"
import { IconButton } from "@/components/ui/icon-button"
import { HelpCircle, MessageCircle, User, Menu, LogOut } from "lucide-react"
import { SearchBox } from "@/components/search-box"
import { toast } from "react-toastify"

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [noiseOpacity, setNoiseOpacity] = useState(0.03)
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // 初期化時にローディング状態を設定
  useEffect(() => {
    // 最初のレンダリング時にローディングを表示
    const hasVisited = sessionStorage.getItem("visited_home")
    if (!hasVisited) {
      setLoading(true)
      sessionStorage.setItem("visited_home", "true")
    } else {
      setLoading(false)

      // 保存されたノイズ設定を取得
      const savedNoiseOpacity = sessionStorage.getItem("noise_opacity")
      if (savedNoiseOpacity) {
        setNoiseOpacity(Number.parseFloat(savedNoiseOpacity))
      }
    }

    // ログイン状態を確認
    const loggedInStatus = localStorage.getItem("is_logged_in")
    setIsLoggedIn(loggedInStatus === "true")

    // 保存されたユーザー名を取得
    const savedUsername = localStorage.getItem("saved_username")
    if (savedUsername) {
      setUsername(savedUsername)
    }
  }, [])

  const handleLoadingComplete = () => {
    setLoading(false)
  }

  const handleNoiseChange = (opacity: number) => {
    setNoiseOpacity(opacity)
    // ノイズ設定をセッションストレージに保存
    sessionStorage.setItem("noise_opacity", opacity.toString())
  }

  // ユーザー名の入力を処理
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsername(value)
    // ローカルストレージに保存
    localStorage.setItem("saved_username", value)
  }

  // ログインページに移動する際にユーザー名を保持
  const handleLoginClick = () => {
    if (username) {
      localStorage.setItem("saved_username", username)
    }
    router.push("/login")
  }

  // ダッシュボードに移動
  const handleDashboardClick = () => {
    router.push("/dashboard")
  }

  // ログアウト処理
  const handleLogout = () => {
    localStorage.setItem("is_logged_in", "false")
    setIsLoggedIn(false)

    // ログアウト成功のトースト通知
    toast.info("ログアウトしました", {
      icon: () => <span>👋</span>,
    })

    // オプション: ホームページをリロードする
    router.refresh()
  }

  return (
    <>
      {loading ? (
        <LoadingScreen
          onLoadingComplete={handleLoadingComplete}
          duration={5000}
          onNoiseChange={handleNoiseChange}
          noiseOpacity={noiseOpacity}
        />
      ) : (
        <ModernLayout noiseOpacity={noiseOpacity}>
          {/* ナビゲーションバー */}
          <nav className="modern-nav">
            <div className="modern-container flex h-20 items-center justify-between">
              <div className="flex items-center gap-2">
                <Logo size={32} />
              </div>
              <div className="hidden items-center gap-8 md:flex">
                <SearchBox />
                <Link href="/help" className="modern-link flex items-center gap-2">
                  <HelpCircle size={16} />
                  <span>ヘルプ</span>
                </Link>
                <Link
                  href="https://discord.gg/JP7uwGDv5T"
                  target="_blank"
                  className="modern-link flex items-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span>Discord</span>
                </Link>

                {isLoggedIn ? (
                  <>
                    <Button onClick={handleDashboardClick} className="modern-link flex items-center gap-2">
                      <User size={16} />
                      <span>ダッシュボード</span>
                    </Button>
                    <Button onClick={handleLogout} className="modern-button flex items-center gap-2">
                      <LogOut size={16} />
                      <span>ログアウト</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <button onClick={handleLoginClick} className="modern-link flex items-center gap-2">
                      <User size={16} />
                      <span>ログイン</span>
                    </button>
                    <Button asChild className="modern-button-primary">
                      <Link href="/signup">無料登録</Link>
                    </Button>
                  </>
                )}
              </div>
              <div className="md:hidden">
                <IconButton icon={<Menu size={18} />} aria-label="メニュー" />
              </div>
            </div>
          </nav>

          {/* メインコンテンツ */}
          <main className="pt-32 pb-20">
            <div className="modern-container text-center">
              <h1 className="modern-title mb-6">あなたの全てをここに</h1>
              <p className="modern-subtitle mx-auto mb-12 max-w-2xl">
                プロフィールを共有するならconnectix2
                <br />
                リンク一つで全てを共有できます。
              </p>

              {/* ユーザー名入力フィールド */}
              <div className="mx-auto mb-16 flex max-w-md flex-col items-center gap-4 sm:flex-row">
                <div className="relative flex w-full items-center overflow-hidden rounded-md border border-white/20 bg-black/50">
                  <span className="pl-4 pr-0 text-white/70 font-light">temp.tmp/</span>
                  <input
                    type="text"
                    placeholder="username"
                    className="flex-1 bg-transparent px-0 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-0 border-0"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <Button
                  className="modern-button-primary w-full sm:w-auto"
                  onClick={() => (isLoggedIn ? router.push("/dashboard") : router.push("/signup"))}
                >
                  {isLoggedIn ? "ダッシュボードへ" : "今すぐ登録"}
                </Button>
              </div>

              {/* スクリーンショット */}
              <div className="relative mt-20">
                <div className="absolute -left-4 -top-4 h-32 w-32 rounded-full bg-yellow-400/10 blur-3xl"></div>
                <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl"></div>

                <div className="relative mx-auto max-w-5xl overflow-hidden border border-white/10 bg-black/30 backdrop-blur-sm rounded-xl">
                  <img
                    src="/placeholder.svg?key=x6xcp"
                    alt="Connectix 2 ダッシュボード"
                    className="w-full rounded-xl"
                  />
                </div>

                <div className="absolute -bottom-16 left-10 w-48 -rotate-6 border border-white/10 bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden">
                  <img src="/placeholder.svg?key=i5njd" alt="モバイル表示" className="w-full rounded-xl" />
                </div>
              </div>
            </div>
          </main>

          {/* フッター */}
          <footer className="modern-footer">
            <div className="modern-container text-center">
              <p>© {new Date().getFullYear()} Connectix 2. All rights reserved.</p>
            </div>
          </footer>
        </ModernLayout>
      )}
    </>
  )
}
