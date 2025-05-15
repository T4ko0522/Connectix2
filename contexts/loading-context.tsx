"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface LoadingContextType {
  previousPath: string | null
  setPreviousPath: (path: string | null) => void
  shouldShowLoading: (currentPath: string) => boolean
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  // 前のページのパスを保存
  const [previousPath, setPreviousPath] = useState<string | null>(null)

  // ローディング画面を表示するかどうかを判断する関数
  const shouldShowLoading = (currentPath: string): boolean => {
    // ホームページ以外のパスではローディング画面を表示しない
    if (currentPath !== "/") {
      return false
    }

    // ログインページからホームページへの遷移の場合はローディング画面を表示しない
    if (previousPath === "/login" && currentPath === "/") {
      return false
    }

    // サインアップページからホームページへの遷移の場合もローディング画面を表示しない
    if (previousPath === "/signup" && currentPath === "/") {
      return false
    }

    // ホームページの場合はローディング画面を表示する（リロードや直接アクセスを含む）
    return true
  }

  return (
    <LoadingContext.Provider value={{ previousPath, setPreviousPath, shouldShowLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}
