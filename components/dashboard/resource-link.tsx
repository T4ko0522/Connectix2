import Link from "next/link"
import { ExternalLink } from "lucide-react"
import type { ReactNode } from "react"

type ResourceLinkProps = {
  icon: ReactNode
  text: string
  href?: string
}

export function ResourceLink({ icon, text, href }: ResourceLinkProps) {
  const content = (
    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-yellow-900/10 hover:border-yellow-500/30 transition-colors">
      <div className="p-2 bg-black/50 rounded-lg text-yellow-500">{icon}</div>
      <span className="text-sm">{text}</span>
      <ExternalLink size={14} className="ml-auto text-gray-600" />
    </div>
  )

  return href ? <Link href={href}>{content}</Link> : content
}
