"use client"

import { usePathname } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"

export default function Loading() {
  const pathname = usePathname()

  // ホームページ（"/"）以外では何も表示しない
  if (pathname !== "/") {
    return null
  }

  // ホームページの場合のみローディング画面を表示
  return <LoadingScreen />
}
