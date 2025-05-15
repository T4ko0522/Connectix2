"use client"

import Link from "next/link"
import { Lock, Home } from "lucide-react"
import { OptimizedNoiseBackground } from "@/components/optimized-noise-background"
import { Logo } from "@/components/logo"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <OptimizedNoiseBackground />
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <div className="mb-8">
          <Logo size={64} />
        </div>

        <div className="mb-6 flex items-center justify-center">
          <Lock className="mr-2 h-12 w-12 text-yellow-500" />
          <h1 className="text-4xl font-bold">アクセス権限がありません</h1>
        </div>

        <div className="mb-8 max-w-md">
          <p className="mb-4 text-lg text-gray-300">
            このページにアクセスするには、ログインが必要です。 アカウントをお持ちでない場合は、新規登録してください。
          </p>

          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              href="/login"
              className="flex w-full items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700 sm:w-auto"
            >
              ログイン
            </Link>

            <Link
              href="/signup"
              className="flex w-full items-center justify-center rounded-md border border-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-900/30 sm:w-auto"
            >
              新規登録
            </Link>

            <Link
              href="/"
              className="flex w-full items-center justify-center rounded-md border border-gray-700 px-6 py-3 text-white transition-colors hover:bg-gray-800 sm:w-auto"
            >
              <Home className="mr-2 h-4 w-4" />
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
