import type React from "react"
import Image from "next/image"
import { Globe } from "lucide-react"

// ソーシャルメディアプラットフォームの定義
export type SocialPlatform = {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  urlPrefix: string
  placeholder: string
}

// ソーシャルメディアプラットフォームのテンプレート
export const socialPlatforms: SocialPlatform[] = [
  // 独自ドメインのオプションを最初に追加
  {
    id: "custom",
    name: "独自ドメイン",
    icon: <Globe size={16} />,
    color: "#4A90E2",
    urlPrefix: "https://",
    placeholder: "example.com/page",
  },
  {
    id: "discord",
    name: "Discord",
    icon: <Image src="/icons/discord-icon.png" alt="Discord" width={16} height={16} />,
    color: "#5865F2",
    urlPrefix: "https://discord.gg/",
    placeholder: "あなたのDiscordサーバーID",
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: <Image src="/icons/spotify-icon.png" alt="Spotify" width={16} height={16} />,
    color: "#1DB954",
    urlPrefix: "https://open.spotify.com/user/",
    placeholder: "あなたのSpotifyユーザー名",
  },
  {
    id: "steam",
    name: "Steam",
    icon: <Image src="/icons/steam-icon.png" alt="Steam" width={16} height={16} />,
    color: "#1b2838",
    urlPrefix: "https://steamcommunity.com/id/",
    placeholder: "あなたのSteamユーザー名",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: <Image src="/icons/twitter-icon.png" alt="Twitter" width={16} height={16} />,
    color: "#1DA1F2",
    urlPrefix: "https://twitter.com/",
    placeholder: "あなたのTwitterユーザー名",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: <Image src="/icons/youtube-icon.png" alt="YouTube" width={16} height={16} />,
    color: "#FF0000",
    urlPrefix: "https://youtube.com/",
    placeholder: "あなたのYouTubeチャンネル",
  },
  {
    id: "vrchat",
    name: "VRChat",
    icon: <Image src="/icons/vrchat-icon.png" alt="VRChat" width={16} height={16} />,
    color: "#0076FF",
    urlPrefix: "https://vrchat.com/home/user/",
    placeholder: "あなたのVRChatユーザーID",
  },
  {
    id: "twitch",
    name: "Twitch",
    icon: <Image src="/icons/twitch-icon.png" alt="Twitch" width={16} height={16} />,
    color: "#9146FF",
    urlPrefix: "https://twitch.tv/",
    placeholder: "あなたのTwitchユーザー名",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <Image src="/icons/instagram-icon.png" alt="Instagram" width={16} height={16} />,
    color: "#E1306C",
    urlPrefix: "https://instagram.com/",
    placeholder: "あなたのInstagramユーザー名",
  },
  {
    id: "github",
    name: "GitHub",
    icon: <Image src="/icons/github-icon.png" alt="GitHub" width={16} height={16} />,
    color: "#333333",
    urlPrefix: "https://github.com/",
    placeholder: "あなたのGitHubユーザー名",
  },
]

// プラットフォームIDからプラットフォーム情報を取得する関数
export function getPlatformById(id: string): SocialPlatform | undefined {
  return socialPlatforms.find((platform) => platform.id === id)
}

// リンクコンポーネント
export function SocialLinkIcon({ platform }: { platform: SocialPlatform }) {
  return (
    <div className="p-2 rounded-lg" style={{ backgroundColor: `${platform.color}20` }}>
      <div className="text-white" style={{ color: platform.color }}>
        {platform.icon}
      </div>
    </div>
  )
}
