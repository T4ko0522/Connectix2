"use client"

import { useState, useEffect } from "react"
import { Smartphone, Tablet, Monitor, User, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SocialLinkIcon, getPlatformById } from "@/components/social-link-templates"

type DeviceType = "mobile" | "tablet" | "desktop"

interface DevicePreviewProps {
  username: string
  onViewProfile?: () => void
  profileImage?: string | null
  bio?: string | null
  location?: string | null
  occupation?: string | null
  refreshKey?: number // 更新を強制するためのキー
  backgroundImage?: string | null
  backgroundBlur?: number
  backgroundBrightness?: number
  backgroundOverlayOpacity?: number
  fontFamily?: string
  displayNameColor?: string
  bioColor?: string
  linkStyle?: string // 追加
  animationEffect?: string // 追加
  showIcons?: boolean // 追加
  showDescriptions?: boolean // 追加
}

export function DevicePreview({
  username,
  onViewProfile,
  profileImage,
  bio,
  location,
  occupation,
  refreshKey = 0,
  backgroundImage,
  backgroundBlur,
  backgroundBrightness,
  backgroundOverlayOpacity,
  fontFamily,
  displayNameColor = "#FFFFFF",
  bioColor = "#F9FAFB",
  linkStyle = "list",
  animationEffect = "none",
  showIcons = true,
  showDescriptions = true,
}: DevicePreviewProps) {
  const [activeDevice, setActiveDevice] = useState<DeviceType>("mobile")
  const [profileData, setProfileData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // プロフィールデータを取得
  useEffect(() => {
    const fetchProfileData = () => {
      setLoading(true)

      try {
        // リンクデータを取得
        const linksData = localStorage.getItem("user_links")
        const links = linksData ? JSON.parse(linksData) : []

        // プロフィール画像を取得（propsから渡された値を優先）
        const profileImageValue =
          profileImage !== undefined ? profileImage : localStorage.getItem("profile_image") || null

        // 表示名を取得
        const displayName = localStorage.getItem("display_name") || username

        // 自己紹介を取得（propsから渡された値を優先）
        const bioValue = bio !== undefined ? bio : localStorage.getItem("user_bio") || ""

        // 場所を取得（propsから渡された値を優先）
        const locationValue = location !== undefined ? location : localStorage.getItem("user_location") || ""

        // 職業を取得（propsから渡された値を優先）
        const occupationValue = occupation !== undefined ? occupation : localStorage.getItem("user_occupation") || ""

        // 背景画像と設定を取得
        const backgroundImageValue =
          backgroundImage !== undefined ? backgroundImage : localStorage.getItem("background_image") || null

        const backgroundBlurValue =
          backgroundBlur !== undefined
            ? backgroundBlur
            : localStorage.getItem("background_blur")
              ? Number(localStorage.getItem("background_blur"))
              : 0

        const backgroundBrightnessValue =
          backgroundBrightness !== undefined
            ? backgroundBrightness
            : localStorage.getItem("background_brightness")
              ? Number(localStorage.getItem("background_brightness"))
              : 100

        const backgroundOverlayOpacityValue =
          backgroundOverlayOpacity !== undefined
            ? backgroundOverlayOpacity
            : localStorage.getItem("background_overlay_opacity")
              ? Number(localStorage.getItem("background_overlay_opacity"))
              : 0

        // フォント設定を取得
        const fontFamilyValue = fontFamily || localStorage.getItem("font_family") || "system-ui, sans-serif"

        // テキスト色の設定を取得
        const displayNameColorValue = displayNameColor || localStorage.getItem("display_name_color") || "#FFFFFF"
        const bioColorValue = bioColor || localStorage.getItem("bio_color") || "#F9FAFB"

        // リンク表示設定を取得
        const linkStyleValue = linkStyle || localStorage.getItem("link_style") || "list"
        const animationEffectValue = animationEffect || localStorage.getItem("animation_effect") || "none"
        const showIconsValue =
          showIcons !== undefined
            ? showIcons
            : localStorage.getItem("show_icons")
              ? localStorage.getItem("show_icons") === "true"
              : true
        const showDescriptionsValue =
          showDescriptions !== undefined
            ? showDescriptions
            : localStorage.getItem("show_descriptions")
              ? localStorage.getItem("show_descriptions") === "true"
              : true

        // プロフィールデータを作成
        const profile = {
          displayName,
          bio: bioValue,
          location: locationValue,
          occupation: occupationValue,
          profileImage: profileImageValue,
          links: links.filter((link: any) => link.enabled !== false).slice(0, 3), // 有効なリンクのみ表示（最大3つ）
          backgroundImage: backgroundImageValue,
          backgroundBlur: backgroundBlurValue,
          backgroundBrightness: backgroundBrightnessValue,
          backgroundOverlayOpacity: backgroundOverlayOpacityValue,
          fontFamily: fontFamilyValue,
          displayNameColor: displayNameColorValue,
          bioColor: bioColorValue,
          linkStyle: linkStyleValue,
          animationEffect: animationEffectValue,
          showIcons: showIconsValue,
          showDescriptions: showDescriptionsValue,
        }

        setProfileData(profile)
      } catch (error) {
        console.error("プロフィールデータの取得に失敗しました:", error)

        // デモ用のダミーデータ
        setProfileData({
          displayName: username,
          bio: "これはデモ用のプロフィールです。",
          location: "東京, 日本",
          occupation: "デザイナー / エンジニア",
          profileImage: profileImage || null,
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
          backgroundImage: null,
          backgroundBlur: 0,
          backgroundBrightness: 100,
          backgroundOverlayOpacity: 0,
          fontFamily: "system-ui, sans-serif",
          displayNameColor: "#FFFFFF",
          bioColor: "#F9FAFB",
          linkStyle: "list",
          animationEffect: "none",
          showIcons: true,
          showDescriptions: true,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [
    username,
    profileImage,
    bio,
    location,
    occupation,
    refreshKey,
    backgroundImage,
    backgroundBlur,
    backgroundBrightness,
    backgroundOverlayOpacity,
    fontFamily,
    displayNameColor,
    bioColor,
    linkStyle,
    animationEffect,
    showIcons,
    showDescriptions,
  ])

  // デバイスの寸法を取得
  const getDeviceDimensions = () => {
    switch (activeDevice) {
      case "mobile":
        return { width: "240px", height: "480px", aspectRatio: "9/16" }
      case "tablet":
        return { width: "360px", height: "480px", aspectRatio: "3/4" }
      case "desktop":
        return { width: "480px", height: "270px", aspectRatio: "16/9" }
      default:
        return { width: "240px", height: "480px", aspectRatio: "9/16" }
    }
  }

  const dimensions = getDeviceDimensions()

  // リンクのレンダリング
  const renderLinks = () => {
    if (!profileData?.links || profileData.links.length === 0) {
      return <div className="text-center text-xs text-gray-500 py-4">リンクがありません</div>
    }

    switch (profileData.linkStyle) {
      case "icons-only":
        return (
          <div className="w-full flex justify-center">
            <div className="flex flex-wrap justify-center gap-0.5 max-w-full">
              {profileData.links.map((link: any) => (
                <div
                  key={link.id}
                  className="flex flex-col items-center justify-center p-2 aspect-square w-14 h-14 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title={link.title} // ツールチップとしてタイトルを表示
                >
                  {link.icon && getPlatformById(link.icon) && (
                    <div className="flex-shrink-0">
                      <div
                        className="text-white hover:brightness-125 transition-all duration-300"
                        style={{ color: getPlatformById(link.icon)!.color }}
                      >
                        {getPlatformById(link.icon)!.icon}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      case "grid":
        return (
          <div className="w-full flex justify-center">
            <div className="flex flex-wrap justify-center gap-0.5 max-w-full">
              {profileData.links.map((link: any) => (
                <div
                  key={link.id}
                  className="flex flex-col items-center justify-center p-2 w-[calc(50%-4px)] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  {profileData.showIcons && link.icon && getPlatformById(link.icon) && (
                    <div className="flex-shrink-0 mb-1 transform hover:scale-110 transition-transform duration-300">
                      <SocialLinkIcon platform={getPlatformById(link.icon)!} />
                    </div>
                  )}
                  <span className="text-xs text-center truncate w-full transition-colors duration-300 hover:text-yellow-400">
                    {link.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      case "buttons":
        return (
          <div className="space-y-2 w-full">
            {profileData.links.map((link: any) => (
              <div
                key={link.id}
                className="flex items-center justify-center p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/20 transition-all duration-300 hover:scale-102 hover:-translate-y-0.5 cursor-pointer"
              >
                {profileData.showIcons && link.icon && getPlatformById(link.icon) && (
                  <div className="flex-shrink-0 mr-2">
                    <SocialLinkIcon platform={getPlatformById(link.icon)!} />
                  </div>
                )}
                <span className="text-xs text-center text-yellow-500">{link.title}</span>
              </div>
            ))}
          </div>
        )
      case "minimal":
        return (
          <div className="flex flex-wrap justify-center gap-2 w-full">
            {profileData.links.map((link: any) => (
              <div
                key={link.id}
                className="inline-flex items-center bg-transparent border-b border-gray-500/30 pb-1 px-1 hover:border-yellow-500 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                {profileData.showIcons && link.icon && getPlatformById(link.icon) && (
                  <div className="flex-shrink-0 mr-1">
                    <div className="text-xs" style={{ color: getPlatformById(link.icon)!.color }}>
                      {getPlatformById(link.icon)!.icon}
                    </div>
                  </div>
                )}
                <span className="text-xs hover:text-yellow-400 transition-colors duration-300">{link.title}</span>
              </div>
            ))}
          </div>
        )
      default: // list
        return (
          <div className="space-y-2 w-full">
            {profileData.links.map((link: any) => (
              <div
                key={link.id}
                className="flex items-center gap-2 p-2 bg-black/30 border border-yellow-900/20 rounded-lg hover:border-yellow-500/50 transition-all duration-300 hover:scale-102 hover:-translate-y-0.5 cursor-pointer"
              >
                {profileData.showIcons && link.icon && getPlatformById(link.icon) && (
                  <div className="flex-shrink-0">
                    <SocialLinkIcon platform={getPlatformById(link.icon)!} />
                  </div>
                )}
                <span className="text-xs hover:text-yellow-400 transition-colors duration-300">{link.title}</span>
                <ExternalLink
                  size={12}
                  className="ml-auto text-gray-500 group-hover:text-yellow-400 transition-colors duration-300"
                />
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          className={`p-2 rounded-md transition-colors ${
            activeDevice === "mobile"
              ? "bg-yellow-500/10 text-yellow-500"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
          onClick={() => setActiveDevice("mobile")}
          aria-label="スマートフォンプレビュー"
        >
          <Smartphone size={18} />
        </button>
        <button
          className={`p-2 rounded-md transition-colors ${
            activeDevice === "tablet"
              ? "bg-yellow-500/10 text-yellow-500"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
          onClick={() => setActiveDevice("tablet")}
          aria-label="タブレットプレビュー"
        >
          <Tablet size={18} />
        </button>
        <button
          className={`p-2 rounded-md transition-colors ${
            activeDevice === "desktop"
              ? "bg-yellow-500/10 text-yellow-500"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
          onClick={() => setActiveDevice("desktop")}
          aria-label="デスクトッププレビュー"
        >
          <Monitor size={18} />
        </button>
      </div>

      <div
        className="bg-black/50 rounded-lg border border-yellow-900/20 mx-auto overflow-hidden relative"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          maxWidth: "100%",
          transition: "width 0.3s ease, height 0.3s ease",
        }}
      >
        {/* デバイスフレーム */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            activeDevice === "mobile"
              ? "rounded-[32px] border-[8px]"
              : activeDevice === "tablet"
                ? "rounded-[16px] border-[8px]"
                : "rounded-[4px] border-[4px]"
          } border-gray-800`}
        ></div>

        {/* プレビューコンテンツ */}
        <div className="absolute inset-0 overflow-auto flex flex-col items-center">
          {/* 背景画像 */}
          {profileData?.backgroundImage && (
            <div className="absolute inset-0 z-0">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${profileData.backgroundImage})`,
                  filter: `blur(${(profileData.backgroundBlur || 0) / 10}px) brightness(${profileData.backgroundBrightness || 100}%)`,
                }}
              ></div>
              <div
                className="absolute inset-0 bg-black"
                style={{ opacity: (profileData.backgroundOverlayOpacity || 0) / 100 }}
              ></div>
            </div>
          )}

          {/* コンテンツ */}
          <div
            className="relative z-10 p-4 flex flex-col items-center w-full"
            style={{ fontFamily: profileData?.fontFamily || "system-ui, sans-serif" }}
          >
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full mb-4 mx-auto"></div>
                  <div className="h-4 w-32 bg-yellow-500/20 rounded mb-2 mx-auto"></div>
                  <div className="h-3 w-48 bg-yellow-500/10 rounded mb-6 mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-8 bg-yellow-500/10 rounded-lg"></div>
                    <div className="h-8 bg-yellow-500/10 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* プロフィールヘッダー */}
                <div className="flex flex-col items-center text-center mb-4 w-full">
                  {profileData?.profileImage ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                      <img
                        src={profileData.profileImage || "/placeholder.svg"}
                        alt={`${profileData.displayName}のプロフィール画像`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mb-3">
                      <User size={24} className="text-yellow-500" />
                    </div>
                  )}
                  <h3
                    className="text-sm font-medium mb-1"
                    style={{ color: profileData?.displayNameColor || "#FFFFFF" }}
                  >
                    {profileData?.displayName}
                  </h3>
                  {profileData?.bio && (
                    <p className="text-xs mb-2" style={{ color: profileData?.bioColor || "#F9FAFB" }}>
                      {profileData.bio}
                    </p>
                  )}

                  {(profileData?.location || profileData?.occupation) && (
                    <div className="flex justify-center gap-2 text-xs mb-3">
                      {profileData?.location && (
                        <span style={{ color: profileData?.bioColor || "#F9FAFB" }}>{profileData.location}</span>
                      )}
                      {profileData?.location && profileData?.occupation && (
                        <span style={{ color: profileData?.bioColor || "#F9FAFB" }}>•</span>
                      )}
                      {profileData?.occupation && (
                        <span style={{ color: profileData?.bioColor || "#F9FAFB" }}>{profileData.occupation}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* リンク一覧 */}
                {renderLinks()}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          className="text-xs h-8 border-yellow-900/20 hover:border-yellow-500/30"
          onClick={onViewProfile}
        >
          <ExternalLink size={14} className="mr-2" />
          実際のページを表示
        </Button>
      </div>
    </div>
  )
}
