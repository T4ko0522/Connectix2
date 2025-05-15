import { ExternalLink } from "lucide-react"
import { SocialLinkIcon, getPlatformById } from "./social-link-templates"

type ProfileLinkItemProps = {
  id: number
  title: string
  url: string
  icon: string
  description?: string
}

export function ProfileLinkItem({ id, title, url, icon, description }: ProfileLinkItemProps) {
  const platform = getPlatformById(icon)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 bg-black/30 border border-yellow-900/20 rounded-lg hover:border-yellow-500/30 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3">
        {platform && <SocialLinkIcon platform={platform} />}
        <div>
          <h3 className="text-sm font-medium group-hover:text-yellow-500 transition-colors">{title}</h3>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
      </div>
      <ExternalLink size={16} className="ml-auto text-gray-600 group-hover:text-yellow-500 transition-colors" />
    </a>
  )
}
