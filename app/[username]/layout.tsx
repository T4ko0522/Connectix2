import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = {
  params: { username: string }
  children: ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username

  return {
    title: `${username} | Connectix 2`,
    description: `${username}のプロフィールページ - Connectix 2`,
  }
}

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return children
}
