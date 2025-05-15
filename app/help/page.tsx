"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronRight, ArrowLeft, Search } from "lucide-react"
import { ModernLayout } from "@/components/modern-layout"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

// FAQの型定義
type FAQItem = {
  question: string
  answer: string
}

// FAQカテゴリの型定義
type FAQCategory = {
  title: string
  items: FAQItem[]
}

// FAQデータ
const faqData: FAQCategory[] = [
  {
    title: "アカウントと登録",
    items: [
      {
        question: "Connectix 2のアカウントを作成するにはどうすればいいですか？",
        answer:
          "ホームページの「無料登録」ボタンをクリックし、メールアドレスを入力して登録プロセスを開始します。その後、確認コードを入力し、ユーザー名を設定すれば完了です。",
      },
      {
        question: "ユーザー名は後から変更できますか？",
        answer:
          "はい、ダッシュボードの設定タブからユーザー名を変更できます。ただし、変更すると以前のURLは機能しなくなりますのでご注意ください。",
      },
      {
        question: "アカウントを削除するにはどうすればいいですか？",
        answer:
          "ダッシュボードの設定タブの下部にある「アカウント削除」セクションから削除できます。削除すると全てのデータが完全に削除され、復元できませんのでご注意ください。",
      },
    ],
  },
  {
    title: "プロフィールとリンク",
    items: [
      {
        question: "プロフィール画像を変更するにはどうすればいいですか？",
        answer:
          "ダッシュボードのアカウントタブで、プロフィール画像をクリックして新しい画像をアップロードできます。JPG、PNG、GIF形式がサポートされています。",
      },
      {
        question: "リンクを追加するにはどうすればいいですか？",
        answer:
          "ダッシュボードのリンクタブで「新しいリンクを追加」ボタンをクリックし、タイトル、URL、アイコンを設定して追加できます。",
      },
      {
        question: "リンクの表示順序を変更できますか？",
        answer:
          "はい、ダッシュボードのリンクタブでリンクをドラッグ＆ドロップして順序を変更できます。変更は自動的に保存されます。",
      },
    ],
  },
  {
    title: "カスタマイズと外観",
    items: [
      {
        question: "プロフィールページのテーマを変更するにはどうすればいいですか？",
        answer:
          "ダッシュボードの外観タブで、さまざまなテーマオプションから選択できます。背景色、テキスト色、アクセントカラーなどをカスタマイズできます。",
      },
      {
        question: "カスタムCSSは使用できますか？",
        answer: "現在、カスタムCSSのサポートは限定的ですが、将来のアップデートで追加される予定です。",
      },
      {
        question: "リンクの表示スタイルを変更するにはどうすればいいですか？",
        answer:
          "ダッシュボードの外観タブで、リストスタイル、ボタンスタイル、アイコンのみ、ミニマルなど、さまざまな表示スタイルから選択できます。",
      },
    ],
  },
  {
    title: "統計と分析",
    items: [
      {
        question: "プロフィールの閲覧数を確認できますか？",
        answer:
          "はい、ダッシュボードのアカウントタブで、プロフィールの閲覧数やリンクのクリック数などの統計情報を確認できます。",
      },
      {
        question: "どのリンクが最も人気があるか確認できますか？",
        answer: "はい、ダッシュボードのアナリティクスセクションで、各リンクのクリック数やクリック率を確認できます。",
      },
      {
        question: "訪問者の地域情報は確認できますか？",
        answer:
          "現在、基本的な訪問者統計のみ提供していますが、地域情報などの詳細な分析は今後のアップデートで追加される予定です。",
      },
    ],
  },
  {
    title: "トラブルシューティング",
    items: [
      {
        question: "パスワードを忘れた場合はどうすればいいですか？",
        answer:
          "ログインページの「パスワードをお忘れですか？」リンクをクリックし、登録したメールアドレスを入力してパスワードリセットの手順に従ってください。",
      },
      {
        question: "リンクが正しく表示されない場合はどうすればいいですか？",
        answer:
          "リンクのURLが正しいことを確認し、httpsで始まっていることを確認してください。問題が解決しない場合は、リンクを削除して再度追加してみてください。",
      },
      {
        question: "アカウントにログインできない場合はどうすればいいですか？",
        answer:
          "正しいメールアドレスとパスワードを使用していることを確認してください。それでも問題が解決しない場合は、パスワードリセットを試すか、サポートにお問い合わせください。",
      },
    ],
  },
]

export default function HelpPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({})
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({})

  // カテゴリの展開状態を切り替える
  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle],
    }))
  }

  // 質問の展開状態を切り替える
  const toggleQuestion = (questionText: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionText]: !prev[questionText],
    }))
  }

  // 検索フィルター
  const filteredFAQs = searchQuery
    ? faqData
        .map((category) => ({
          ...category,
          items: category.items.filter(
            (item) =>
              item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.items.length > 0)
    : faqData

  return (
    <ModernLayout noiseOpacity={0.03}>
      {/* ヘッダー */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Logo size={32} />
            </Link>
            <h1 className="text-xl font-medium text-white">ヘルプセンター</h1>
          </div>
          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            className="flex items-center gap-2 text-white/70 hover:text-white"
          >
            <ArrowLeft size={16} />
            ホームに戻る
          </Button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* 検索バー */}
          <div className="mb-12">
            <h2 className="mb-6 text-center text-3xl font-bold text-white">どのようにお手伝いできますか？</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="質問を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 pl-10 text-white placeholder:text-white/50 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-white/50" />
            </div>
          </div>

          {/* FAQセクション */}
          <div className="space-y-6">
            {filteredFAQs.map((category) => (
              <div key={category.title} className="rounded-lg border border-white/10 bg-black/30 overflow-hidden">
                {/* カテゴリヘッダー */}
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="flex w-full items-center justify-between p-4 text-left font-medium text-white hover:bg-white/5"
                >
                  <span>{category.title}</span>
                  {expandedCategories[category.title] ? (
                    <ChevronDown className="h-5 w-5 text-white/70" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-white/70" />
                  )}
                </button>

                {/* 質問と回答 */}
                {expandedCategories[category.title] && (
                  <div className="border-t border-white/10 p-4">
                    <div className="space-y-4">
                      {category.items.map((item) => (
                        <div key={item.question} className="rounded-lg border border-white/10 overflow-hidden">
                          <button
                            onClick={() => toggleQuestion(item.question)}
                            className="flex w-full items-center justify-between p-3 text-left text-white hover:bg-white/5"
                          >
                            <span>{item.question}</span>
                            {expandedQuestions[item.question] ? (
                              <ChevronDown className="h-4 w-4 text-white/70" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-white/70" />
                            )}
                          </button>
                          {expandedQuestions[item.question] && (
                            <div className="border-t border-white/10 bg-white/5 p-3 text-white/80">{item.answer}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* お問い合わせセクション */}
          <div className="mt-12 rounded-lg border border-white/10 bg-black/30 p-6 text-center">
            <h3 className="mb-2 text-xl font-medium text-white">まだ質問がありますか？</h3>
            <p className="mb-4 text-white/70">お探しの情報が見つからない場合は、お気軽にお問い合わせください。</p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="https://discord.gg/JP7uwGDv5T" target="_blank">
                Discordでサポートに連絡する
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="border-t border-white/10 bg-black/30 py-6 text-center text-white/50">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Connectix 2. All rights reserved.</p>
        </div>
      </footer>
    </ModernLayout>
  )
}
