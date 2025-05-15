import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { LoadingProvider } from "@/contexts/loading-context"
import { PathTracker } from "@/components/path-tracker"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const metadata: Metadata = {
  title: "Connectix 2 - あなたの全てのリンクを一つの場所に",
  description: "モダンで機能豊富なリンク共有と安全なプロフィール管理のためのプラットフォーム",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Connectix 2",
    description: "あなたの全てのリンクを一つの場所に。",
    url: "https://connectix2.example.com", // まだ実際のURLは決まっていないので仮のURLを使用
    siteName: "Connectix 2",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Connectix 2 のシェア画像"
      }
    ],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Connectix 2",
    description: "リンク共有とプロフィール管理を一つに。",
    images: ["/og-image.png"]
  },
  themeColor: "#ffffff"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="dark">
      <body>
        <LoadingProvider>
          <PathTracker />
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </LoadingProvider>
      </body>
    </html>
  )
}
