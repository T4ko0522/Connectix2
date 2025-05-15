"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  User,
  Shield,
  LogOut,
  HelpCircle,
  Save,
  FileText,
  MessageSquare,
  ExternalLink,
  X,
  AlertTriangle,
  Lightbulb,
  Globe,
} from "lucide-react"
import { toast } from "react-toastify"
import { ResourceLink } from "./resource-link"

type SettingsTabContentProps = {
  username: string
}

export function SettingsTabContent({ username }: SettingsTabContentProps) {
  const router = useRouter()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [vrchatConnected, setVrchatConnected] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [location, setLocation] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  // 初期データの読み込み
  useEffect(() => {
    // ローカルストレージからデータを取得
    const savedDisplayName = localStorage.getItem("display_name")
    const savedLocation = localStorage.getItem("user_location")
    const savedVrchatConnected = localStorage.getItem("vrchat_connected") === "true"

    if (savedDisplayName) setDisplayName(savedDisplayName)
    if (savedLocation) setLocation(savedLocation)
    if (savedVrchatConnected) setVrchatConnected(true)
  }, [])

  const handleLogout = () => {
    localStorage.setItem("is_logged_in", "false")

    // ログアウト成功のトースト通知
    toast.info("ログアウトしました", {
      icon: () => <span>👋</span>,
    })

    router.push("/")
  }

  const handleSaveSettings = () => {
    setIsSaving(true)

    // データをローカルストレージに保存
    if (displayName.trim()) localStorage.setItem("display_name", displayName)
    if (location.trim()) localStorage.setItem("user_location", location)

    // 保存完了を示すために少し遅延を入れる
    setTimeout(() => {
      setIsSaving(false)

      // 保存成功のトースト通知
      toast.success("アカウント設定を保存しました", {
        position: "bottom-right",
        autoClose: 3000,
      })
    }, 500)
  }

  const handleConnectVRChat = () => {
    if (vrchatConnected) {
      // 連携解除の処理
      setVrchatConnected(false)
      localStorage.removeItem("vrchat_connected")
      localStorage.removeItem("vrchat_username")

      toast.info("VRChatアカウントの連携を解除しました", {
        position: "bottom-right",
        autoClose: 3000,
      })
    } else {
      // 連携ページへ遷移
      router.push("/vrchat-login")
    }
  }

  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled)

    if (!twoFactorEnabled) {
      toast.success("二段階認証を有効にしました", {
        position: "bottom-right",
        autoClose: 3000,
      })
    } else {
      toast.info("二段階認証を無効にしました", {
        position: "bottom-right",
        autoClose: 3000,
      })
    }
  }

  return (
    <>
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-light mb-2">アカウント設定</h1>
            <p className="text-gray-400 text-sm">あなたのアカウントとプロフィールの設定を管理します。</p>
          </div>
        </div>
      </div>

      {/* 設定コンテンツ */}
      <div className="space-y-6">
        {/* プロフィール設定 */}
        <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6">
          <h2 className="text-xl font-light mb-6 flex items-center">
            <User size={18} className="text-yellow-500 mr-2" />
            プロフィール設定
          </h2>

          <div className="space-y-6">
            <div className="border-t border-yellow-900/10 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-light text-gray-400 mb-1">表示名</label>
                  <input
                    type="text"
                    placeholder="あなたの名前"
                    className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-400 mb-1">ユーザー名</label>
                  <div className="flex items-center">
                    <span className="bg-black/50 border border-yellow-900/20 border-r-0 rounded-l-md px-3 py-2 text-sm text-gray-500">
                      temp.tmp/
                    </span>
                    <input
                      type="text"
                      value={username}
                      readOnly
                      className="flex-grow bg-black/30 border border-yellow-900/20 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-400 mb-1">メールアドレス</label>
                  <div className="flex items-center">
                    <input
                      type="email"
                      placeholder="認証方法に応じて自動的に設定されます"
                      className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50 cursor-not-allowed opacity-70"
                      readOnly
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">メールアドレスは認証方法に基づいて自動的に設定されます</p>
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-400 mb-1">場所</label>
                  <input
                    type="text"
                    placeholder="東京, 日本"
                    className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-yellow-900/10 pt-6 flex justify-end">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={handleSaveSettings}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span>
                    保存中...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    変更を保存
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* アカウント連携 */}
        <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6">
          <h2 className="text-xl font-light mb-6 flex items-center">
            <Globe size={18} className="text-yellow-500 mr-2" />
            アカウント連携
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#0076FF]/10 rounded-lg border border-[#0076FF]/20 hover:border-[#0076FF]/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0076FF]/20 rounded-lg">
                  <Globe size={18} className="text-[#0076FF]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">VRChat</h3>
                  <p className="text-xs text-gray-500">
                    {vrchatConnected
                      ? `VRChatアカウント「${localStorage.getItem("vrchat_username") || "ユーザー"}」と連携済み`
                      : "VRChatアカウントと連携してステータスを表示"}
                  </p>
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  className={`border-yellow-900/20 hover:border-yellow-500/30 ${
                    vrchatConnected ? "text-red-400 hover:text-red-300" : "text-[#0076FF] hover:bg-[#0076FF]/10"
                  }`}
                  onClick={handleConnectVRChat}
                >
                  {vrchatConnected ? (
                    <>
                      <X size={16} className="mr-2" />
                      連携解除
                    </>
                  ) : (
                    <>
                      <ExternalLink size={16} className="mr-2" />
                      連携する
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 mt-6">
              <div className="flex items-start gap-3">
                <Lightbulb size={18} className="text-yellow-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-500 mb-1">VRChatアカウント連携</h3>
                  <p className="text-xs text-gray-400 mb-2">アカウントを連携すると、以下のメリットがあります：</p>
                  <ul className="text-xs text-gray-400 list-disc pl-4 space-y-1">
                    <li>プロフィールページに自動的に埋め込みが追加されます</li>
                    <li>Trust Rank、ステータスをプロフィールに表示できます</li>
                    <li>直接VRChatのアカウントのリンクへリダイレクトできます</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 二段階認証 */}
        <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6">
          <h2 className="text-xl font-light mb-6 flex items-center">
            <Shield size={18} className="text-yellow-500 mr-2" />
            二段階認証
          </h2>

          <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-yellow-900/10 mb-4">
            <div>
              <h3 className="text-sm font-medium mb-1">二段階認証</h3>
              <p className="text-xs text-gray-500">アカウントのセキュリティを強化するために二段階認証を有効にします</p>
            </div>
            <div className="flex items-center">
              <span className={`mr-3 text-sm ${twoFactorEnabled ? "text-green-500" : "text-gray-500"}`}>
                {twoFactorEnabled ? "有効" : "無効"}
              </span>
              <Button
                variant="outline"
                className={`border-yellow-900/20 hover:border-yellow-500/30 ${
                  twoFactorEnabled ? "text-red-400 hover:text-red-300" : "text-yellow-500 hover:text-yellow-400"
                }`}
                onClick={handleToggleTwoFactor}
              >
                {twoFactorEnabled ? (
                  <>
                    <X size={16} className="mr-2" />
                    無効にする
                  </>
                ) : (
                  <>
                    <Shield size={16} className="mr-2" />
                    有効にする
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-yellow-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-500 mb-1">セキュリティのヒント</h3>
                <p className="text-xs text-gray-400">
                  二段階認証を有効にすると、ログイン時にメールへ認証コードが送信されます。<br />
                  これにより、他の人があなたのアカウントにアクセスするのを防ぎます。<br />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ヘルプとサポート */}
        <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6">
          <h2 className="text-xl font-light mb-6 flex items-center" onClick={() => router.push("/help")}>
            <HelpCircle size={18} className="text-yellow-500 mr-2" />
            ヘルプとサポート
          </h2>
          <div className="space-y-3 mb-6">
            <ResourceLink icon={<FileText size={16} />} text="ヘルプを読む" href="/help" />
            <ResourceLink icon={<MessageSquare size={16} />} text="サポートに問い合わせ" href="/support" />
          </div>

          <Button
            variant="outline"
            className="w-full border-red-900/20 hover:border-red-500/30 text-red-400 hover:text-red-300 justify-start"
            onClick={handleLogout}
          >
            <LogOut size={16} className="mr-2" />
            ログアウト
          </Button>
        </div>
      </div>
    </>
  )
}
