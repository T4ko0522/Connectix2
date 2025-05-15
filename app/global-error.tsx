"use client"

import { useEffect } from "react"
import { AlertTriangle, Home } from "lucide-react"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // エラーをログに記録
    console.error(error)
  }, [error])

  return (
    <html lang="ja" className="dark">
      <body>
        <div className="flex min-h-screen flex-col bg-black text-white">
          <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
            <div className="mb-6 flex items-center justify-center">
              <AlertTriangle className="mr-2 h-12 w-12 text-red-500" />
              <h1 className="text-4xl font-bold">致命的なエラー</h1>
            </div>

            <div className="mb-8 max-w-md">
              <p className="mb-4 text-lg text-gray-300">
                申し訳ありませんが、アプリケーションで致命的なエラーが発生しました。
                ページを再読み込みするか、しばらく経ってからもう一度お試しください。
              </p>

              {process.env.NODE_ENV === "development" && error.message && (
                <div className="mb-4 rounded-md bg-red-900/30 p-4 text-left">
                  <p className="font-mono text-sm text-red-300">{error.message}</p>
                  {error.digest && <p className="mt-2 font-mono text-xs text-red-400">エラーID: {error.digest}</p>}
                </div>
              )}

              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <button
                  onClick={reset}
                  className="flex w-full items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700 sm:w-auto"
                >
                  ページを再読み込み
                </button>

                <Link
                  href="/"
                  className="flex w-full items-center justify-center rounded-md border border-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-900/30 sm:w-auto"
                >
                  <Home className="mr-2 h-4 w-4" />
                  ホームに戻る
                </Link>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              <p>
                サポートが必要な場合は、
                <a
                  href="https://discord.gg/JP7uwGDv5T"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline"
                >
                  Discordサーバー
                </a>
                にお問い合わせください。
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
