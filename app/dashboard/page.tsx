"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Logo } from "@/components/logo"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { OptimizedNoiseBackground } from "@/components/optimized-noise-background"
import {
  User,
  LinkIcon,
  PlusCircle,
  BarChart3,
  MousePointer,
  Bell,
  Search,
  ChevronRight,
  ExternalLink,
  Upload,
  FileText,
  MessageSquare,
  Share2,
  Zap,
  Clock,
  Layers,
  Palette,
  Eye,
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { LinksTabContent } from "@/components/dashboard/links-tab"
import { AppearanceTabContent } from "@/components/dashboard/appearance-tab"
import { SettingsTabContent } from "@/components/dashboard/settings-tab"

export default function DashboardPage() {
  const [username, setUsername] = useState("username")
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== "undefined") {
      // ローカルストレージからユーザー名を取得
      const savedUsername = localStorage.getItem("saved_username")
      if (savedUsername) {
        setUsername(savedUsername)
      }
    }
  }, [])

  // タブに応じたコンテンツを表示
  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountTabContent username={username} />
      case "links":
        return <LinksTabContent username={username} />
      case "appearance":
        return <AppearanceTabContent username={username} />
      case "analytics":
        return <AnalyticsTabContent />
      case "settings":
        return <SettingsTabContent username={username} />
      default:
        return <AccountTabContent username={username} />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 背景エフェクト */}
      <OptimizedNoiseBackground opacity={0.05} speed={0.8} scale={4} className="fixed inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/5 via-transparent to-black/20 pointer-events-none"></div>

      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-yellow-900/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo size={28} />
            <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-yellow-500/10 text-yellow-500">
              <Bell size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="検索..."
                className="bg-black/30 border border-yellow-900/20 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-yellow-500/50 w-48"
              />
            </div>
            <div className="flex items-center gap-2 bg-black/30 border border-yellow-900/20 rounded-full pl-2 pr-4 py-1">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <User size={16} className="text-yellow-500" />
              </div>
              <span className="text-sm font-light">{username}</span>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="pt-24 pb-16 container mx-auto px-4">
        {/* タブに応じたコンテンツを表示 */}
        {renderTabContent()}
      </main>

      {/* フッター */}
      <footer className="border-t border-yellow-900/20 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo size={24} />
          </div>
          <div className="text-sm text-gray-500">© {new Date().getFullYear()} Connectix 2. All rights reserved.</div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-gray-400 hover:text-yellow-500">
              利用規約
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-yellow-500">
              プライバシーポリシー
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-yellow-500">
              ヘルプ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// アカウントタブのコンテンツ
function AccountTabContent({ username }: { username: string }) {
  const router = useRouter()

  return (
    <>
      {/* ウェルカムセクション */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-light mb-2">こんにちは、{username}さん</h1>
            <p className="text-gray-400 text-sm">あなたのプロフィールを管理し、統計を確認しましょう。</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button
              className="bg-black/30 border border-yellow-900/20 hover:bg-black/50 hover:border-yellow-500/30 text-white"
              onClick={() => router.push(`/${username}`)}
            >
              <ExternalLink size={16} className="mr-2" />
              プロフィールを表示
            </Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <PlusCircle size={16} className="mr-2" />
              新規リンク追加
            </Button>
          </div>
        </div>
      </div>

      {/* クイックステータス */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <StatusCard
          icon={<MousePointer size={20} className="text-yellow-500" />}
          title="総クリック数"
          value="0"
          change="+0"
          period="過去7日間"
        />
        <StatusCard
          icon={<User size={20} className="text-yellow-500" />}
          title="プロフィール閲覧数"
          value="0"
          change="+0"
          period="過去7日間"
        />
        <StatusCard
          icon={<LinkIcon size={20} className="text-yellow-500" />}
          title="アクティブリンク"
          value="0"
          change="0%"
          period="完了"
        />
        <StatusCard
          icon={<Clock size={20} className="text-yellow-500" />}
          title="アカウント作成日"
          value={new Date().toLocaleDateString("ja-JP")}
          special
        />
      </div>

      {/* メインコンテンツグリッド */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左側のコンテンツ（2カラム分） */}
        <div className="lg:col-span-2 space-y-6">
          {/* アクティビティグラフ */}
          <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-light flex items-center">
                <BarChart3 size={18} className="text-yellow-500 mr-2" />
                アクティビティ
              </h2>
              <select className="bg-black/30 border border-yellow-900/20 rounded-md px-3 py-1 text-sm">
                <option>過去7日間</option>
                <option>過去30日間</option>
                <option>過去90日間</option>
              </select>
            </div>

            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Zap size={32} className="mx-auto mb-3 text-yellow-500/50" />
                <p className="mb-2">まだデータがありません</p>
                <p className="text-sm max-w-md">プロフィールを共有して、訪問者やクリック数のデータを収集しましょう。</p>
              </div>
            </div>
          </div>

          {/* 最近のアクティビティ */}
          <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-light flex items-center">
                <Clock size={18} className="text-yellow-500 mr-2" />
                最近のアクティビティ
              </h2>
              <Button variant="outline" className="text-xs h-8 px-3 border-yellow-900/20 hover:border-yellow-500/30">
                すべて表示
              </Button>
            </div>

            <div className="h-48 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <p className="mb-2">まだアクティビティがありません</p>
                <p className="text-sm">プロフィールを更新すると、ここに表示されます。</p>
              </div>
            </div>
          </div>
        </div>

        {/* 右側のサイドバー（1カラム分） */}
        <div className="space-y-6">
          {/* クイックアクション */}
          <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6">
            <h2 className="text-xl font-light mb-4 flex items-center">
              <Zap size={18} className="text-yellow-500 mr-2" />
              クイックアクション
            </h2>

            <div className="space-y-3">
              <ActionButton icon={<PlusCircle size={16} />} text="新規リンクを追加" />
              <ActionButton icon={<Upload size={16} />} text="画像をアップロード" />
              <ActionButton icon={<Palette size={16} />} text="テーマをカスタマイズ" />
              <ActionButton icon={<Share2 size={16} />} text="プロフィールを共有" />
            </div>
          </div>

          {/* ヘルプとリソース */}
          <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6">
            <h2 className="text-xl font-light mb-4 flex items-center">
              <MessageSquare size={18} className="text-yellow-500 mr-2" />
              ヘルプとリソース
            </h2>

            <div className="space-y-3">
              <ResourceLink icon={<FileText size={16} />} text="ガイドとチュートリアル" />
              <ResourceLink icon={<MessageSquare size={16} />} text="サポートに問い合わせ" />
              <ResourceLink icon={<Layers size={16} />} text="APIドキュメント" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// 分析タブのコンテンツ
function AnalyticsTabContent() {
  return (
    <>
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-light mb-2">分析データ</h1>
            <p className="text-gray-400 text-sm">あなたのプロフィールとリンクのパフォーマンスを分析します。</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <select className="bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50">
              <option>過去7日間</option>
              <option>過去30日間</option>
              <option>過去90日間</option>
              <option>カスタム期間</option>
            </select>
            <Button variant="outline" className="border-yellow-900/20 hover:border-yellow-500/30 text-white">
              <Share2 size={16} className="mr-2" />
              レポートを共有
            </Button>
          </div>
        </div>
      </div>

      {/* 主要指標 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <AnalyticsCard
          icon={<Eye size={20} className="text-yellow-500" />}
          title="総閲覧数"
          value="0"
          change="+0%"
          period="前期比"
        />
        <AnalyticsCard
          icon={<MousePointer size={20} className="text-yellow-500" />}
          title="総クリック数"
          value="0"
          change="+0%"
          period="前期比"
        />
        <AnalyticsCard
          icon={<BarChart3 size={20} className="text-yellow-500" />}
          title="クリック率"
          value="0%"
          change="+0%"
          period="前期比"
        />
        <AnalyticsCard
          icon={<Clock size={20} className="text-yellow-500" />}
          title="平均滞在時間"
          value="0秒"
          change="+0秒"
          period="前期比"
        />
      </div>

      {/* グラフとチャート */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* 訪問者グラフ */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6 h-80">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-light flex items-center">
                <BarChart3 size={18} className="text-yellow-500 mr-2" />
                訪問者数の推移
              </h2>
              <select className="bg-black/30 border border-yellow-900/20 rounded-md px-3 py-1 text-sm">
                <option>日別</option>
                <option>週別</option>
                <option>月別</option>
              </select>
            </div>

            <div className="h-52 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <BarChart3 size={32} className="mx-auto mb-3 text-yellow-500/50" />
                <p className="mb-2">まだデータがありません</p>
                <p className="text-sm max-w-md">プロフィールを共有して、訪問者データを収集しましょう。</p>
              </div>
            </div>
          </div>
        </div>

        {/* デバイス分布 */}
        <div>
          <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6 h-80">
            <h2 className="text-xl font-light mb-6 flex items-center">
              <Smartphone size={18} className="text-yellow-500 mr-2" />
              デバイス分布
            </h2>

            <div className="h-52 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="flex justify-center gap-4 mb-4">
                  <div className="flex flex-col items-center">
                    <Smartphone size={24} className="text-gray-500 mb-2" />
                    <span className="text-xs">0%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Tablet size={24} className="text-gray-500 mb-2" />
                    <span className="text-xs">0%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Monitor size={24} className="text-gray-500 mb-2" />
                    <span className="text-xs">0%</span>
                  </div>
                </div>
                <p className="text-sm">まだデータがありません</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* リンクパフォーマンス */}
      <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-light flex items-center">
            <LinkIcon size={18} className="text-yellow-500 mr-2" />
            リンクパフォーマンス
          </h2>
          <Button variant="outline" className="text-xs h-8 px-3 border-yellow-900/20 hover:border-yellow-500/30">
            詳細レポート
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-yellow-900/20">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">リンク</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">クリック数</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">クリック率</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">前期比</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-yellow-900/10">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-black/50 rounded-md text-yellow-500 mr-3">
                      <Globe size={14} />
                    </div>
                    <span className="text-sm">データなし</span>
                  </div>
                </td>
                <td className="text-center py-3 px-4 text-sm">-</td>
                <td className="text-center py-3 px-4 text-sm">-</td>
                <td className="text-center py-3 px-4 text-sm">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-sm">リンクを追加して、パフォーマンスデータを収集しましょう。</p>
          </div>
        </div>
      </div>

      {/* 地域分布 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6">
          <h2 className="text-xl font-light mb-6 flex items-center">
            <Globe size={18} className="text-yellow-500 mr-2" />
            地域分布
          </h2>

          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Globe size={32} className="mx-auto mb-3 text-yellow-500/50" />
              <p className="mb-2">まだデータがありません</p>
              <p className="text-sm">プロフィールを共有して、地域データを収集しましょう。</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6">
          <h2 className="text-xl font-light mb-6 flex items-center">
            <Clock size={18} className="text-yellow-500 mr-2" />
            時間帯別アクセス
          </h2>

          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Clock size={32} className="mx-auto mb-3 text-yellow-500/50" />
              <p className="mb-2">まだデータがありません</p>
              <p className="text-sm">プロフィールを共有して、時間帯データを収集しましょう。</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ステータスカードコンポーネント
function StatusCard({
  icon,
  title,
  value,
  change,
  period,
  special = false,
}: {
  icon: React.ReactNode
  title: string
  value: string
  change?: string
  period?: string
  special?: boolean
}) {
  return (
    <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-black/30 rounded-lg">{icon}</div>
          <h3 className="text-sm font-light text-gray-400">{title}</h3>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-light">{value}</div>
          {!special && change && period && (
            <div className="text-xs text-gray-500">
              <span className="text-yellow-500">{change}</span> {period}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 分析カードコンポーネント
function AnalyticsCard({
  icon,
  title,
  value,
  change,
  period,
}: {
  icon: React.ReactNode
  title: string
  value: string
  change: string
  period: string
}) {
  const isPositive = change.startsWith("+")
  const isNegative = change.startsWith("-")
  const changeColor = isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-yellow-500"

  return (
    <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-black/30 rounded-lg">{icon}</div>
          <h3 className="text-sm font-light text-gray-400">{title}</h3>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-light">{value}</div>
          <div className="flex items-center text-xs">
            <span className={changeColor}>
              {isPositive && <ArrowUp size={12} className="inline mr-0.5" />}
              {isNegative && <ArrowDown size={12} className="inline mr-0.5" />}
              {change}
            </span>
            <span className="text-gray-500 ml-1">{period}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// アクションボタンコンポーネント
function ActionButton({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <button className="w-full flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-yellow-900/10 hover:border-yellow-500/30 transition-colors text-left">
      <div className="p-2 bg-black/50 rounded-lg text-yellow-500">{icon}</div>
      <span className="text-sm">{text}</span>
      <ChevronRight size={16} className="ml-auto text-gray-600" />
    </button>
  )
}

// リソースリンクコンポーネント
function ResourceLink({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Link
      href="#"
      className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-yellow-900/10 hover:border-yellow-500/30 transition-colors"
    >
      <div className="p-2 bg-black/50 rounded-lg text-yellow-500">{icon}</div>
      <span className="text-sm">{text}</span>
      <ExternalLink size={14} className="ml-auto text-gray-600" />
    </Link>
  )
}
