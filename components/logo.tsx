"use client"

import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"

interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className = "", size = 40 }: LogoProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogoClick = () => {
    if (pathname === "/") {
      // 現在のページがホームページの場合、スムーズにトップにスクロール
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } else {
      // 他のページの場合はホームページに遷移
      router.push("/")
    }
  }

  return (
    <div className={`flex items-center justify-center ${className} cursor-pointer`} onClick={handleLogoClick}>
      <div className="relative">
        <Image src="/logo.png" alt="Connectix 2 Logo" width={size} height={size} />
      </div>
      <span className="ml-2 text-xl font-light tracking-widest text-white">CONNECTIX</span>
    </div>
  )
}
