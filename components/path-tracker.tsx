"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useLoading } from "@/contexts/loading-context"

export function PathTracker() {
  const pathname = usePathname()
  const { setPreviousPath } = useLoading()

  useEffect(() => {
    // 現在のパスを前のパスとして保存（次のナビゲーションのため）
    return () => {
      setPreviousPath(pathname)
    }
  }, [pathname, setPreviousPath])

  return null
}
