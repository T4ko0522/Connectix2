"use client"

import { useRef } from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { MapPin, Briefcase, ExternalLink, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SocialLinkIcon, getPlatformById } from "@/components/social-link-templates"
import { toast } from "react-toastify"

// プロフィールデータの型定義
type ProfileData = {
  displayName: string
  bio: string | null
  location: string | null
  occupation: string | null
  profileImage: string | null
  links: Array<{
    id: number
    title: string
    url: string
    icon: string
    enabled: boolean
    description?: string
  }>
  theme: {
    color: string
    background: string
    font: string
    buttonStyle: string
  }
  backgroundImage: string | null
  backgroundBlur: number
  backgroundBrightness: number
  backgroundOverlayOpacity: number
  fontFamily: string
  displayNameColor: string
  bioColor: string
  linkStyle: string
  showIcons: boolean
  showDescriptions: boolean
  // VRChat連携情報
  vrchat?: {
    connected: boolean
    displayName: string
    userId: string
    profilePicture: string | null
    status: "online" | "offline" | "ask me" | "join me" | "busy" | "away"
    trustRank: "visitor" | "new user" | "user" | "known user" | "trusted user" | "veteran"
  }
}

export default function ProfilePage() {
  const params = useParams()
  const username = params.username as string
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [noiseOpacity, setNoiseOpacity] = useState(0)

  useEffect(() => {
    // ローカルストレージからプロフィールデータを取得
    const fetchProfileData = () => {
      setLoading(true)

      // 実際のアプリケーションではAPIからデータを取得するが、
      // デモ用にローカルストレージから取得
      try {
        // リンクデータを取得
        const linksData = localStorage.getItem("user_links")
        const links = linksData ? JSON.parse(linksData) : []

        // 背景画像と設定を取得
        const backgroundImage = localStorage.getItem("background_image")
        const backgroundBlur = localStorage.getItem("background_blur")
          ? Number(localStorage.getItem("background_blur"))
          : 0
        const backgroundBrightness = localStorage.getItem("background_brightness")
          ? Number(localStorage.getItem("background_brightness"))
          : 100
        const backgroundOverlayOpacity = localStorage.getItem("background_overlay_opacity")
          ? Number(localStorage.getItem("background_overlay_opacity"))
          : 0

        // フォント設定を取得
        const fontFamily = localStorage.getItem("font_family") || "system-ui, sans-serif"

        // テキスト色の設定を取得
        const displayNameColor = localStorage.getItem("display_name_color") || "#FFFFFF"
        const bioColor = localStorage.getItem("bio_color") || "#F9FAFB"

        // リンク表示設定を取得
        const linkStyle = localStorage.getItem("link_style") || "list"
        const showIcons = localStorage.getItem("show_icons") ? localStorage.getItem("show_icons") === "true" : true
        const showDescriptions = localStorage.getItem("show_descriptions")
          ? localStorage.getItem("show_descriptions") === "true"
          : true

        // VRChat連携情報を取得
        const vrchatConnected = localStorage.getItem("vrchat_connected") === "true"
        let vrchatData = null

        if (vrchatConnected) {
          vrchatData = {
            connected: true,
            displayName: localStorage.getItem("vrchat_display_name") || "VRChatユーザー",
            userId: localStorage.getItem("vrchat_user_id") || "usr_00000000-0000-0000-0000-000000000000",
            profilePicture: localStorage.getItem("vrchat_profile_picture") || null,
            status:
              (localStorage.getItem("vrchat_status") as
                | "online"
                | "offline"
                | "busy"
                | "away"
                | "join me"
                | "ask me") || "offline",
            trustRank:
              (localStorage.getItem("vrchat_trust_rank") as
                | "visitor"
                | "new user"
                | "user"
                | "known user"
                | "trusted user"
                | "veteran") || "user",
          }
        }

        // プロフィールデータを作成（実際はAPIから取得）
        const profile: ProfileData = {
          displayName: localStorage.getItem("display_name") || username,
          bio: localStorage.getItem("user_bio") || "",
          location: localStorage.getItem("user_location") || "",
          occupation: localStorage.getItem("user_occupation") || "",
          profileImage: localStorage.getItem("profile_image") || "", // プロフィール画像のURLを取得
          links: links.filter((link: any) => link.enabled !== false), // 有効なリンクのみ表示
          theme: {
            color: localStorage.getItem("theme_color") || "yellow",
            background: localStorage.getItem("background_style") || "noise",
            font: localStorage.getItem("font_style") || "default",
            buttonStyle: localStorage.getItem("button_style") || "rounded",
          },
          backgroundImage: backgroundImage || null,
          backgroundBlur: backgroundBlur,
          backgroundBrightness: backgroundBrightness,
          backgroundOverlayOpacity: backgroundOverlayOpacity,
          fontFamily: fontFamily,
          displayNameColor: displayNameColor,
          bioColor: bioColor,
          linkStyle: linkStyle,
          showIcons: showIcons,
          showDescriptions: showDescriptions,
          vrchat: vrchatData ?? undefined,
        }

        // 空の値をnullに変換（APIからの取得を想定した処理）
        if (!profile.bio || profile.bio.trim() === "") profile.bio = null
        if (!profile.location || profile.location.trim() === "" || profile.location === "未設定")
          profile.location = null
        if (!profile.occupation || profile.occupation.trim() === "" || profile.occupation === "未設定")
          profile.occupation = null
        if (!profile.profileImage || profile.profileImage.trim() === "") profile.profileImage = null

        setProfileData(profile)
      } catch (error) {
        console.error("プロフィールデータの取得に失敗しました:", error)

        // デモ用のダミーデータ
        setProfileData({
          displayName: username,
          bio: "これはデモ用のプロフィールです。ダッシュボードでプロフィール情報を設定してください。",
          location: "東京, 日本",
          occupation: "デザイナー / エンジニア",
          profileImage: "", // デモ用は空に設定
          links: [
            {
              id: 1,
              title: "Twitter",
              url: "https://twitter.com/username",
              icon: "twitter",
              enabled: true,
            },
            {
              id: 2,
              title: "Instagram",
              url: "https://instagram.com/username",
              icon: "instagram",
              enabled: true,
            },
          ],
          theme: {
            color: "yellow",
            background: "noise",
            font: "default",
            buttonStyle: "rounded",
          },
          backgroundImage: null,
          backgroundBlur: 0,
          backgroundBrightness: 100,
          backgroundOverlayOpacity: 0,
          fontFamily: "system-ui, sans-serif",
          displayNameColor: "#FFFFFF",
          bioColor: "#F9FAFB",
          linkStyle: "list",
          showIcons: true,
          showDescriptions: true,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [username])

  // シェア機能
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${profileData?.displayName || username}のプロフィール`,
          text: `${profileData?.displayName || username}のプロフィールをチェックしてください！`,
          url: window.location.href,
        })
        .then(() => {
          console.log("共有に成功しました")
        })
        .catch((error) => {
          console.log("共有に失敗しました:", error)
        })
    } else {
      // クリップボードにURLをコピー
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success("URLをクリップボードにコピーしました", {
          position: "bottom-right",
          autoClose: 3000,
        })
      })
    }
  }

  // VRChatのステータスに応じた色とテキストを取得
  const getVRChatStatusInfo = (status: string) => {
    switch (status) {
      case "online":
        return { color: "#3ba55c", text: "オンライン" }
      case "join me":
        return { color: "#3ba55c", text: "Join Me" }
      case "ask me":
        return { color: "#faa61a", text: "Ask Me" }
      case "busy":
        return { color: "#ed4245", text: "取り込み中" }
      case "away":
        return { color: "#faa61a", text: "離席中" }
      default:
        return { color: "#747f8d", text: "オフライン" }
    }
  }

  // VRChatのTrust Rankに応じた色とテキストを取得
  const getTrustRankInfo = (rank: string) => {
    switch (rank) {
      case "vrchat team":
        return { color: "#FF2626", text: "VRChat Team" }
      case "trusted user":
        return { color: "#B18FFF", text: "Trusted User" }
      case "known user":
        return { color: "#FF7B42", text: "Known User" }
      case "user":
        return { color: "#2BCF5C", text: "User" }
      case "new user":
        return { color: "#1778FF", text: "New User" }
      case "visitor":
        return { color: "#CCCCCC", text: "Visitor" }
      case "nuisance":
        return { color: "#782F2F", text: "Nuisance" }
      default:
        return { color: "#2BCF5C", text: "User" }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-24 h-24 bg-yellow-500/20 rounded-full mb-4"></div>
            <div className="h-6 w-40 bg-yellow-500/20 rounded mb-2"></div>
            <div className="h-4 w-64 bg-yellow-500/10 rounded mb-8"></div>
            <div className="space-y-3 w-full max-w-md">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-yellow-500/10 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // リンクのレンダリング
  const renderLinks = () => {
    if (!profileData?.links || profileData.links.length === 0) {
      return null
    }

    switch (profileData.linkStyle) {
      case "icons-only":
        return (
          <div className="w-full flex justify-center mb-8 animate-slide-up delay-400">
            <div className="flex flex-wrap justify-center gap-0.5 max-w-md">
              {profileData.links.map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-3 aspect-square w-20 h-20 sm:w-24 sm:h-24 hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out animate-slide-up`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                  title={link.title} // ツールチップとしてタイトルを表示
                >
                  {link.icon && getPlatformById(link.icon) && (
                    <div className="flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                      <div
                        className="text-white hover:brightness-125 transition-all duration-300"
                        style={{
                          color: getPlatformById(link.icon)!.color,
                          transform: "scale(1.5)", // アイコンサイズを1.5倍に拡大
                        }}
                      >
                        {getPlatformById(link.icon)!.icon}
                      </div>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        )
      case "grid":
        return (
          <div className="w-full flex justify-center mb-8 animate-slide-up delay-400">
            <div className="flex flex-wrap justify-center gap-0.5 max-w-md">
              {profileData.links.map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-3 w-[calc(50%-2px)] sm:w-[calc(33.333%-2px)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out animate-slide-up`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  {profileData.showIcons && link.icon && getPlatformById(link.icon) && (
                    <div className="flex-shrink-0 mb-2 transform hover:scale-110 transition-transform duration-300">
                      <SocialLinkIcon platform={getPlatformById(link.icon)!} />
                    </div>
                  )}
                  <span className="text-sm font-medium text-center truncate w-full hover:text-yellow-400 transition-colors duration-300">
                    {link.title}
                  </span>
                  {profileData.showDescriptions && link.description && link.description.trim() !== "" && (
                    <p className="text-xs text-gray-500 text-center mt-1 truncate w-full hover:text-gray-300 transition-colors duration-300">
                      {link.description}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        )
      case "buttons":
        return (
          <div className="space-y-2 mb-8 w-full max-w-lg animate-slide-up delay-400">
            {profileData.links.map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-500/10 animate-slide-up`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                {profileData.showIcons && link.icon && getPlatformById(link.icon) && (
                  <div className="flex-shrink-0 mr-3 transform group-hover:scale-110 transition-transform duration-300">
                    <SocialLinkIcon platform={getPlatformById(link.icon)!} />
                  </div>
                )}
                <span className="text-sm font-medium text-center text-yellow-500">{link.title}</span>
                {profileData.showDescriptions && link.description && link.description.trim() !== "" && (
                  <p className="text-xs text-yellow-500/70 ml-2">{link.description}</p>
                )}
              </a>
            ))}
          </div>
        )
      case "minimal":
        return (
          <div className="flex flex-wrap justify-center gap-3 mb-8 w-full max-w-lg animate-slide-up delay-400">
            {profileData.links.map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center bg-transparent border-b border-gray-500/30 pb-1 px-2 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-110 animate-slide-up`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                {profileData.showIcons && link.icon && getPlatformById(link.icon) && (
                  <div className="flex-shrink-0 mr-2 transform group-hover:scale-110 transition-transform duration-300">
                    <div
                      className="text-sm hover:brightness-125 transition-all duration-300"
                      style={{ color: getPlatformById(link.icon)!.color }}
                    >
                      {getPlatformById(link.icon)!.icon}
                    </div>
                  </div>
                )}
                <span className="text-sm hover:text-yellow-400 transition-colors duration-300">{link.title}</span>
              </a>
            ))}
          </div>
        )
      default: // list
        return (
          <div className="space-y-3 mb-8 w-full max-w-lg animate-slide-up delay-400">
            {profileData.links.map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center p-4 bg-gradient-to-r from-black/40 to-black/30 border border-yellow-900/20 rounded-lg hover:border-yellow-500/50 transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.02] hover:-translate-y-1 hover:shadow-yellow-500/20 animate-slide-up`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                {/* ホバー時の背景エフェクト */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-yellow-400/5 rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300 group-hover:duration-200"></div>

                {/* リンクコンテンツ */}
                <div className="flex items-center justify-center gap-3 w-full relative z-10">
                  {profileData.showIcons && link.icon && getPlatformById(link.icon) && (
                    <div className="flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                      <SocialLinkIcon platform={getPlatformById(link.icon)!} />
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-sm font-medium group-hover:text-yellow-400 transition-colors">{link.title}</h3>
                    {profileData.showDescriptions && link.description && link.description.trim() !== "" && (
                      <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <ExternalLink
                    size={16}
                    className="flex-shrink-0 ml-auto text-gray-600 group-hover:text-yellow-400 transition-all duration-300 transform group-hover:translate-x-1"
                  />
                </div>

                {/* 下部のアクセントライン */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-yellow-500/50 to-yellow-300/50 group-hover:w-full transition-all duration-500"></div>
              </a>
            ))}
          </div>
        )
    }
  }

  // 背景スタイルを決定
  const getBackgroundStyles = () => {
    if (profileData?.backgroundImage) {
      return {
        backgroundImage: `url(${profileData.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: `blur(${(profileData.backgroundBlur || 0) / 10}px) brightness(${profileData.backgroundBrightness || 100}%)`,
      }
    }
    return {}
  }

  // オーバーレイの不透明度を決定
  const getOverlayOpacity = () => {
    if (profileData?.backgroundImage) {
      return (profileData.backgroundOverlayOpacity || 0) / 100
    }
    return 0
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* 背景画像コンテナ */}
      {profileData?.backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={getBackgroundStyles()}></div>
          <div className="absolute inset-0 bg-black" style={{ opacity: getOverlayOpacity() }}></div>
          <div className="absolute inset-0 bg-noise opacity-5"></div>
        </div>
      )}

      {/* ノイズ背景 - 背景画像がない場合のみ表示 */}
      {!profileData?.backgroundImage && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/5 via-transparent to-black/20 pointer-events-none"></div>
        </div>
      )}

      {/* ヘッダー */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-yellow-900/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size={28} />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-yellow-900/20 hover:border-yellow-500/30 text-white"
              onClick={handleShare}
            >
              <Share2 size={16} className="mr-2" />
              シェア
            </Button>
            <Button variant="outline" className="border-yellow-900/20 hover:border-yellow-500/30 text-white">
              <Link href="/dashboard" className="flex items-center">
                <ArrowLeft size={16} className="mr-2" />
                <span>ダッシュボード</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main
        className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center w-full pt-20 pb-10"
        style={{ fontFamily: profileData?.fontFamily || "system-ui, sans-serif" }}
      >
        <div className="w-full max-w-lg px-4 mx-auto flex flex-col items-center">
          {/* プロフィールヘッダー */}
          <div className="flex flex-col items-center text-center mb-8 w-full">
            {profileData?.profileImage && (
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 hover:scale-105 transition-transform duration-300 bg-black/30 backdrop-blur-sm animate-slide-up">
                <img
                  src={profileData.profileImage || "/placeholder.svg"}
                  alt={`${profileData.displayName || username}のプロフィール画像`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h1
              className="text-3xl font-light mb-2 hover:text-yellow-400 transition-colors duration-300 animate-slide-up delay-100"
              style={{ color: profileData?.displayNameColor || "#FFFFFF" }}
            >
              {profileData?.displayName || username}
            </h1>

            {/* bioが存在し、かつ空でない場合のみ表示 */}
            {profileData?.bio && profileData.bio.trim() !== "" && (
              <p
                className="text-sm max-w-lg mb-4 hover:opacity-90 transition-opacity duration-300 bg-black/20 backdrop-blur-sm p-2 rounded-md animate-slide-up delay-200"
                style={{ color: profileData?.bioColor || "#F9FAFB" }}
              >
                {profileData.bio}
              </p>
            )}

            {/* locationとoccupationが存在する場合のみ表示 */}
            {(profileData?.location || profileData?.occupation) && (
              <div className="flex flex-wrap justify-center gap-4 mb-4 bg-black/20 backdrop-blur-sm p-2 rounded-md animate-slide-up delay-300">
                {profileData?.location && (
                  <div className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                    <MapPin size={16} className="mr-2 text-yellow-500" />
                    <span>{profileData.location}</span>
                  </div>
                )}
                {profileData?.occupation && (
                  <div className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                    <Briefcase size={16} className="mr-2 text-yellow-500" />
                    <span>{profileData.occupation}</span>
                  </div>
                )}
              </div>
            )}

            {/* VRChat情報 - Discord埋め込みスタイル */}
            {profileData?.vrchat?.connected && (
              <div className="w-full mb-6 max-w-sm mx-auto animate-slide-up delay-400">
                <a
                  href={`https://vrchat.com/home/user/${profileData.vrchat.userId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full backdrop-blur-lg bg-[#2f3136]/60 rounded-md overflow-hidden hover:bg-[#36393f]/70 transition-colors duration-300 shadow-lg"
                >
                  <div className="flex items-center relative">
                    {/* 左側のアクセントバー */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1"
                      style={{ backgroundColor: getTrustRankInfo(profileData.vrchat.trustRank).color }}
                    ></div>

                    <div className="flex py-3 pl-4 pr-3 w-full items-center">
                      {/* アイコン */}
                      <div className="flex-shrink-0 mr-3">
                        {profileData.vrchat.profilePicture ? (
                          <img
                            src={profileData.vrchat.profilePicture || "/placeholder.svg"}
                            alt="VRChat"
                            className="w-14 h-14 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-[#5865f2] flex items-center justify-center">
                            <span className="text-white text-base font-bold">VRC</span>
                          </div>
                        )}
                      </div>

                      {/* ユーザー情報 */}
                      <div className="flex-grow min-w-0 flex items-center">
                        <div className="flex flex-col items-start">
                          <h3 className="text-white text-sm font-medium truncate">{profileData.vrchat.displayName}</h3>

                          {/* ステータス表示 */}
                          <div className="flex items-center">
                            <div
                              className="w-2 h-2 rounded-full mr-1.5"
                              style={{ backgroundColor: getVRChatStatusInfo(profileData.vrchat.status).color }}
                            ></div>
                            <span className="text-xs text-gray-300">
                              {getVRChatStatusInfo(profileData.vrchat.status).text}
                            </span>
                          </div>
                        </div>

                        {/* Trust Rank表示 */}
                        <div className="ml-3">
                          <span
                            className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                            style={{
                              backgroundColor: getTrustRankInfo(profileData.vrchat.trustRank).color + "33",
                              color: getTrustRankInfo(profileData.vrchat.trustRank).color,
                            }}
                          >
                            {getTrustRankInfo(profileData.vrchat.trustRank).text}
                          </span>
                        </div>
                      </div>

                      {/* Discord風の右矢印 */}
                      <div className="flex-shrink-0 ml-1 text-gray-400">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.25 4.5L15.75 12L8.25 19.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            )}

            {/* リンク一覧 */}
            {renderLinks()}
          </div>
        </div>
      </main>
    </div>
  )
}

// 最適化されたノイズ背景コンポーネント
function OptimizedNoiseBackground({
  opacity = 0.03,
  speed = 1,
  scale = 4,
}: {
  opacity?: number
  speed?: number
  scale?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 })
  const isMountedRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // キャンバスサイズをウィンドウサイズに設定
    const resizeCanvas = () => {
      if (!isMountedRef.current || !canvas) return

      const width = Math.max(window.innerWidth, 1)
      const height = Math.max(window.innerHeight, 1)

      canvas.width = width
      canvas.height = height
      setDimensions({ width, height })
    }

    // 初期サイズを設定
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // 最適化されたノイズ生成（低解像度で生成して拡大）
    const createNoise = () => {
      if (!isMountedRef.current || !ctx) return null

      // キャンバスのサイズが有効かチェック
      if (canvas.width <= 0 || canvas.height <= 0) {
        console.warn("Invalid canvas dimensions:", canvas.width, canvas.height)
        return null
      }

      try {
        // 低解像度のノイズを生成
        const smallCanvas = document.createElement("canvas")
        const smallCtx = smallCanvas.getContext("2d")
        if (!smallCtx) return null

        // 画面サイズを縮小（最小サイズを保証）
        const smallWidth = Math.max(Math.ceil(canvas.width / scale), 1)
        const smallHeight = Math.max(Math.ceil(canvas.height / scale), 1)

        smallCanvas.width = smallWidth
        smallCanvas.height = smallHeight

        const imageData = smallCtx.createImageData(smallWidth, smallHeight)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const value = Math.random() * 255
          data[i] = value // R
          data[i + 1] = value // G
          data[i + 2] = value // B
          data[i + 3] = Math.random() * 255 * opacity // A
        }

        smallCtx.putImageData(imageData, 0, 0)
        return smallCanvas
      } catch (error) {
        console.error("Error creating noise:", error)
        return null
      }
    }

    // 時間変数
    let time = 0

    // ノイズアニメーションを描画
    const animate = () => {
      if (!isMountedRef.current || !ctx) return

      try {
        // 時間を更新
        time += 0.01 * speed

        // 新しいノイズを生成
        const noiseCanvas = createNoise()
        if (!noiseCanvas) {
          // エラーが発生した場合は次のフレームをリクエスト
          animationFrameRef.current = requestAnimationFrame(animate)
          return
        }

        // キャンバスをクリア
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // 低解像度のノイズを拡大して描画
        ctx.drawImage(noiseCanvas, 0, 0, canvas.width, canvas.height)

        // 次のフレームをリクエスト
        animationFrameRef.current = requestAnimationFrame(animate)
      } catch (error) {
        console.error("Animation error:", error)
      }
    }

    // アニメーションを開始（サイズが有効な場合のみ）
    if (dimensions.width > 0 && dimensions.height > 0) {
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // クリーンアップ
    return () => {
      isMountedRef.current = false
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [opacity, speed, scale, dimensions.width, dimensions.height])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}
