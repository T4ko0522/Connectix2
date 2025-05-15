"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, CheckCircle, RefreshCw } from "lucide-react"
import { Logo } from "@/components/logo"

export default function ResetPasswordVerifyPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* ロゴ */}
        <div className="mb-10">
          <Logo size={56} />
        </div>

        {/* タイトル */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-yellow-400" />
          </div>
          <h1 className="text-2xl font-light tracking-wide">メールを確認してください</h1>
          <p className="mt-2 text-sm text-white/70 font-light">
            {email ? `${email} に` : ""}パスワードリセット用のリンクを送信しました。
            <br />
            <span>
              <span className="font-bold text-yellow-400">Supabase Auth</span>
              からのメールを確認し、リンクをクリックして新しいパスワードを設定してください。
            </span>
          </p>
        </div>

        {/* 戻るリンク */}
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
  )
}
