"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Palette, Upload, Eye, Save, RefreshCw, Monitor, User, FileText, Trash2, Type, Brush } from "lucide-react"
import { toast } from "react-toastify"
import { ProfileImageUpload } from "@/components/dashboard/profile-image-upload"
import { DevicePreview } from "./device-preview"

// フォントの選択肢を定義
const fontOptions = [
  { value: "default", label: "デフォルト", family: "system-ui, sans-serif" },
  { value: "noto-sans-jp", label: "Noto Sans JP", family: "'Noto Sans JP', sans-serif" },
  { value: "roboto", label: "Roboto", family: "'Roboto', sans-serif" },
  { value: "open-sans", label: "Open Sans", family: "'Open Sans', sans-serif" },
  { value: "montserrat", label: "Montserrat", family: "'Montserrat', sans-serif" },
  { value: "lato", label: "Lato", family: "'Lato', sans-serif" },
  { value: "poppins", label: "Poppins", family: "'Poppins', sans-serif" },
  { value: "raleway", label: "Raleway", family: "'Raleway', sans-serif" },
  { value: "playfair-display", label: "Playfair Display", family: "'Playfair Display', serif" },
  { value: "merriweather", label: "Merriweather", family: "'Merriweather', serif" },
  { value: "ubuntu", label: "Ubuntu", family: "'Ubuntu', sans-serif" },
  { value: "source-code-pro", label: "Source Code Pro", family: "'Source Code Pro', monospace" },
]

// カラーオプションを定義
const colorOptions = [
  { value: "#FFFFFF", label: "白" },
  { value: "#F9FAFB", label: "ライトグレー" },
  { value: "#000000", label: "黒" },
  { value: "#F59E0B", label: "黄色" },
  { value: "#10B981", label: "緑" },
  { value: "#3B82F6", label: "青" },
  { value: "#8B5CF6", label: "紫" },
  { value: "#EC4899", label: "ピンク" },
  { value: "#EF4444", label: "赤" },
  { value: "#F97316", label: "オレンジ" },
]

// リンク表示スタイルのオプション
const linkStyleOptions = [
  { value: "list", label: "リスト表示（デフォルト）" },
  { value: "buttons", label: "ボタン表示" },
  { value: "icons-only", label: "アイコンのみ表示" },
  { value: "minimal", label: "ミニマル表示" },
]

type AppearanceTabContentProps = {
  username: string
}

export function AppearanceTabContent({ username }: AppearanceTabContentProps) {
  const [fontStyle, setFontStyle] = useState("default")
  const [buttonStyle, setButtonStyle] = useState("rounded")
  const [showViewCount, setShowViewCount] = useState(true)
  const [showFooter, setShowFooter] = useState(true)
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [occupation, setOccupation] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0) // プレビューの更新を強制するためのキー
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [blurAmount, setBlurAmount] = useState(0)
  const [brightnessAmount, setBrightnessAmount] = useState(100)
  const [overlayOpacity, setOverlayOpacity] = useState(0)
  const [selectedFont, setSelectedFont] = useState(fontOptions[0])
  const [displayNameColor, setDisplayNameColor] = useState("#FFFFFF") // 表示名の色
  const [bioColor, setBioColor] = useState("#F9FAFB") // 自己紹介の色
  const [linkStyle, setLinkStyle] = useState("list") // リンク表示スタイル
  const [showIcons, setShowIcons] = useState(true) // アイコンを表示するかどうか
  const [showDescriptions, setShowDescriptions] = useState(true) // 説明を表示するかどうか

  // Google Fontsを読み込むためのリンク要素を追加
  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href =
      "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;700&family=Noto+Sans+JP:wght@400;700&family=Open+Sans:wght@400;700&family=Playfair+Display:wght@400;700&family=Poppins:wght@400;700&family=Raleway:wght@400;700&family=Roboto:wght@400;700&family=Source+Code+Pro:wght@400;700&family=Ubuntu:wght@400;700&display=swap"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  // 初期データの読み込み
  useEffect(() => {
    // ローカルストレージからデータを取得
    const savedBio = localStorage.getItem("user_bio")
    const savedLocation = localStorage.getItem("user_location")
    const savedOccupation = localStorage.getItem("user_occupation")
    const savedProfileImage = localStorage.getItem("profile_image")
    const savedBackgroundImage = localStorage.getItem("background_image")
    const savedBlurAmount = localStorage.getItem("background_blur")
    const savedBrightnessAmount = localStorage.getItem("background_brightness")
    const savedOverlayOpacity = localStorage.getItem("background_overlay_opacity")
    const savedFontStyle = localStorage.getItem("font_style")
    const savedDisplayNameColor = localStorage.getItem("display_name_color")
    const savedBioColor = localStorage.getItem("bio_color")
    const savedLinkStyle = localStorage.getItem("link_style")
    const savedShowIcons = localStorage.getItem("show_icons")
    const savedShowDescriptions = localStorage.getItem("show_descriptions")

    if (savedBio) setBio(savedBio)
    if (savedLocation) setLocation(savedLocation)
    if (savedOccupation) setOccupation(savedOccupation)
    if (savedProfileImage) setProfileImage(savedProfileImage)
    if (savedBackgroundImage) setBackgroundImage(savedBackgroundImage)
    if (savedBlurAmount) setBlurAmount(Number(savedBlurAmount))
    if (savedBrightnessAmount) setBrightnessAmount(Number(savedBrightnessAmount))
    if (savedOverlayOpacity) setOverlayOpacity(Number(savedOverlayOpacity))
    if (savedDisplayNameColor) setDisplayNameColor(savedDisplayNameColor)
    if (savedBioColor) setBioColor(savedBioColor)
    if (savedLinkStyle) setLinkStyle(savedLinkStyle)
    if (savedShowIcons) setShowIcons(savedShowIcons === "true")
    if (savedShowDescriptions) setShowDescriptions(savedShowDescriptions === "true")

    // フォントスタイルの設定
    if (savedFontStyle) {
      setFontStyle(savedFontStyle)
      const font = fontOptions.find((font) => font.value === savedFontStyle)
      if (font) {
        setSelectedFont(font)
      }
    }
  }, [])

  const handleSaveAppearance = () => {
    // フント設定をローカルストレージに保存
    localStorage.setItem("font_style", fontStyle)
    localStorage.setItem("font_family", selectedFont.family)

    // テキスト色の設定を保存
    localStorage.setItem("display_name_color", displayNameColor)
    localStorage.setItem("bio_color", bioColor)

    toast.success("外観設定を保存しました", {
      position: "bottom-right",
      autoClose: 3000,
    })

    // プレビューを更新
    setRefreshKey((prev) => prev + 1)
  }

  const handleSaveProfile = () => {
    // プロフィール情報をローカルストレージに保存
    if (bio) localStorage.setItem("user_bio", bio)
    if (location) localStorage.setItem("user_location", location)
    if (occupation) localStorage.setItem("user_occupation", occupation)

    toast.success("プロフィール設定を保存しました", {
      position: "bottom-right",
      autoClose: 3000,
    })

    // プレビューを更新
    setRefreshKey((prev) => prev + 1)
  }

  // プロフィール画像が変更されたときの処理
  const handleProfileImageChange = (imageData: string | null) => {
    setProfileImage(imageData)
  }

  // 背景画像が変更されたときの処理を追加
  const handleBackgroundImageChange = (imageData: string | null) => {
    setBackgroundImage(imageData)
    if (imageData) {
      localStorage.setItem("background_image", imageData)
    } else {
      localStorage.removeItem("background_image")
    }
    // プレビューを更新
    setRefreshKey((prev) => prev + 1)
  }

  // 背景設定を保存する関数を追加
  const handleSaveBackgroundSettings = () => {
    // ブラー、明るさ、オーバーレイの透明度を保存
    localStorage.setItem("background_blur", blurAmount.toString())
    localStorage.setItem("background_brightness", brightnessAmount.toString())
    localStorage.setItem("background_overlay_opacity", overlayOpacity.toString())

    toast.success("背景設定を保存しました", {
      position: "bottom-right",
      autoClose: 3000,
    })

    // プレビューを更新
    setRefreshKey((prev) => prev + 1)
  }

  // フォントが変更されたときの処理
  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setFontStyle(value)
    const font = fontOptions.find((font) => font.value === value)
    if (font) {
      setSelectedFont(font)
      // プレビューを即時更新
      setRefreshKey((prev) => prev + 1)
    }
  }

  // 表示名の色が変更されたときの処理
  const handleDisplayNameColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayNameColor(e.target.value)
    // プレビューを即時更新
    setRefreshKey((prev) => prev + 1)
  }

  // 自己紹介の色が変更されたときの処理
  const handleBioColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBioColor(e.target.value)
    // プレビューを即時更新
    setRefreshKey((prev) => prev + 1)
  }

  // リンク表示設定を保存する関数
  const handleSaveLinkSettings = () => {
    // リンク表示設定をローカルストレージに保存
    localStorage.setItem("link_style", linkStyle)
    localStorage.setItem("show_icons", showIcons.toString())
    localStorage.setItem("show_descriptions", showDescriptions.toString())

    toast.success("リンク表示設定を保存しました", {
      position: "bottom-right",
      autoClose: 3000,
    })

    // プレビューを更新
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <>
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-light mb-2">外観設定</h1>
            <p className="text-gray-400 text-sm">プロフィールページの見た目とプロフィール情報をカスタマイズします。</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              onClick={() => window.open(`/${username}`, "_blank")}
            >
              <Eye size={16} className="mr-2" />
              プロフィールをプレビュー
            </Button>
          </div>
        </div>
      </div>

      {/* プロフィール設定（移動された部分） */}
      <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-light mb-6 flex items-center">
          <User size={18} className="text-yellow-500 mr-2" />
          プロフィール設定
        </h2>

        <div className="space-y-6">
          {/* プロフィール画像 */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0 flex justify-center">
              <ProfileImageUpload
                initialImage={profileImage}
                onImageChange={handleProfileImageChange}
                onImageSave={() => setRefreshKey((prev) => prev + 1)} // 画像保存時にプレビューを更新
              />
            </div>
            <div className="flex-grow space-y-2">
              <h3 className="text-sm font-medium">プロフィール画像</h3>
              <p className="text-xs text-gray-500">推奨サイズ: 400x400ピクセル、最大ファイルサイズ: 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-light text-gray-400 mb-1">自己紹介</label>
              <textarea
                placeholder="あなた自身について簡単に説明してください"
                className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50 h-24"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-light text-gray-400 mb-1">場所</label>
              <input
                type="text"
                placeholder="東京, 日本"
                className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-light text-gray-400 mb-1">職業/肩書き</label>
              <input
                type="text"
                placeholder="デザイナー / エンジニア など"
                className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>
          </div>

          <div className="border-t border-yellow-900/10 pt-6 flex justify-end">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" onClick={handleSaveProfile}>
              <Save size={16} className="mr-2" />
              プロフィールを保存
            </Button>
          </div>
        </div>
      </div>

      {/* テーマ設定 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6">
            <h2 className="text-xl font-light mb-6 flex items-center">
              <Palette size={18} className="text-yellow-500 mr-2" />
              背景設定
            </h2>

            <div className="space-y-6">
              {/* 背景画像アップロード */}
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0 flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-yellow-500/30 group relative">
                      {backgroundImage ? (
                        <img
                          src={backgroundImage || "/placeholder.svg"}
                          alt="背景画像"
                          className="w-full h-full object-cover"
                          style={{
                            filter: `blur(${blurAmount / 10}px) brightness(${brightnessAmount}%)`,
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-black/50 flex items-center justify-center">
                          <Upload size={24} className="text-yellow-500" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity / 100 }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex-grow space-y-2">
                  <h3 className="text-sm font-medium">背景画像</h3>
                  <p className="text-xs text-gray-500">推奨サイズ: 1920x1080ピクセル、最大ファイルサイズ: 2MB</p>
                  <div className="flex gap-3 mt-3">
                    <input
                      type="file"
                      id="background-image"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return

                        // ファイルサイズのチェック (2MB以下)
                        if (file.size > 2 * 1024 * 1024) {
                          toast.error("画像サイズは2MB以下にしてください", {
                            position: "bottom-right",
                            autoClose: 3000,
                          })
                          return
                        }

                        // 画像ファイルのみ許可
                        if (!file.type.startsWith("image/")) {
                          toast.error("画像ファイルのみアップロードできます", {
                            position: "bottom-right",
                            autoClose: 3000,
                          })
                          return
                        }

                        const reader = new FileReader()
                        reader.onload = (event) => {
                          const imageData = event.target?.result as string
                          handleBackgroundImageChange(imageData)
                        }
                        reader.readAsDataURL(file)
                      }}
                    />
                    <Button
                      variant="outline"
                      className="text-sm border-yellow-900/20 hover:border-yellow-500/30"
                      onClick={() => document.getElementById("background-image")?.click()}
                    >
                      <Upload size={14} className="mr-2" />
                      アップロード
                    </Button>
                    {backgroundImage && (
                      <Button
                        variant="outline"
                        className="text-sm border-red-900/20 hover:border-red-500/30 text-red-400 hover:text-red-300"
                        onClick={() => handleBackgroundImageChange(null)}
                      >
                        <Trash2 size={14} className="mr-2" />
                        削除
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* 背景画像の設定 */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-light text-gray-400">ブラー効果</label>
                    <span className="text-xs text-gray-500">{blurAmount / 10}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={blurAmount}
                    onChange={(e) => setBlurAmount(Number(e.target.value))}
                    className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-light text-gray-400">明るさ</label>
                    <span className="text-xs text-gray-500">{brightnessAmount}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={brightnessAmount}
                    onChange={(e) => setBrightnessAmount(Number(e.target.value))}
                    className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-light text-gray-400">オーバーレイ不透明度</label>
                    <span className="text-xs text-gray-500">{overlayOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={overlayOpacity}
                    onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                    className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="border-t border-yellow-900/10 pt-6 flex justify-end">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" onClick={handleSaveBackgroundSettings}>
                  <Save size={16} className="mr-2" />
                  設定を保存
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6">
            <h2 className="text-xl font-light mb-4 flex items-center">
              <Monitor size={18} className="text-yellow-500 mr-2" />
              デバイスプレビュー
            </h2>

            <DevicePreview
              username={username}
              onViewProfile={() => window.open(`/${username}`, "_blank")}
              profileImage={profileImage}
              bio={bio}
              location={location}
              occupation={occupation}
              refreshKey={refreshKey} // 更新を強制するためのキー
              backgroundImage={backgroundImage}
              backgroundBlur={blurAmount}
              backgroundBrightness={brightnessAmount}
              backgroundOverlayOpacity={overlayOpacity}
              fontFamily={selectedFont.family}
              displayNameColor={displayNameColor}
              bioColor={bioColor}
              linkStyle={linkStyle}
              showIcons={showIcons}
              showDescriptions={showDescriptions}
            />

            <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex items-start gap-2">
                <RefreshCw size={16} className="text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">変更を保存すると、プロフィールページに反映されます。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* テキスト色設定 */}
      <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-light mb-6 flex items-center">
          <Brush size={18} className="text-yellow-500 mr-2" />
          テキスト色設定
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-light text-gray-400 mb-1">表示名の色</label>
            <div className="flex items-center gap-3">
              <select
                className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
                value={displayNameColor}
                onChange={handleDisplayNameColorChange}
              >
                {colorOptions.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </select>
              <div
                className="w-8 h-8 rounded-full border border-white/20 flex-shrink-0"
                style={{ backgroundColor: displayNameColor }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-500">プロフィールページの表示名の色を設定します</p>
          </div>

          <div>
            <label className="block text-sm font-light text-gray-400 mb-1">自己紹介の色</label>
            <div className="flex items-center gap-3">
              <select
                className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
                value={bioColor}
                onChange={handleBioColorChange}
              >
                {colorOptions.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </select>
              <div
                className="w-8 h-8 rounded-full border border-white/20 flex-shrink-0"
                style={{ backgroundColor: bioColor }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-500">プロフィールページの自己紹介文の色を設定します</p>
          </div>
        </div>

        <div className="mt-6 border-t border-yellow-900/10 pt-6 flex justify-end">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" onClick={handleSaveAppearance}>
            <Save size={16} className="mr-2" />
            変更を保存
          </Button>
        </div>
      </div>

      {/* フォント設定 */}
      <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-light mb-6 flex items-center">
          <Type size={18} className="text-yellow-500 mr-2" />
          フォント設定
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-light text-gray-400 mb-1">フォント</label>
            <select
              className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
              value={fontStyle}
              onChange={handleFontChange}
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.family }}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-light text-gray-400 mb-1">フォントプレビュー</label>
            <div
              className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-4 text-sm"
              style={{ fontFamily: selectedFont.family }}
            >
              <p className="mb-2 text-lg">あいうえお - ABCDE</p>
              <p className="text-xs">こんにちは、世界！Hello, World! 1234567890</p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-yellow-900/10 pt-6 flex justify-end">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" onClick={handleSaveAppearance}>
            <Save size={16} className="mr-2" />
            変更を保存
          </Button>
        </div>
      </div>

      {/* リンク表示設定 */}
      <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-light mb-6 flex items-center">
          <FileText size={18} className="text-yellow-500 mr-2" />
          リンク表示設定
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-light text-gray-400 mb-1">リンク表示スタイル</label>
            <select
              className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
              value={linkStyle}
              onChange={(e) => setLinkStyle(e.target.value)}
            >
              {linkStyleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show-icons"
                className="mr-2 h-4 w-4 rounded border-gray-600 bg-black/30 text-yellow-500 focus:ring-yellow-500"
                checked={showIcons}
                onChange={(e) => setShowIcons(e.target.checked)}
                disabled={linkStyle === "icons-only"} // アイコンのみ表示の場合は無効化
              />
              <label htmlFor="show-icons" className="text-sm font-light text-gray-400">
                アイコンを表示
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show-descriptions"
                className="mr-2 h-4 w-4 rounded border-gray-600 bg-black/30 text-yellow-500 focus:ring-yellow-500"
                checked={showDescriptions}
                onChange={(e) => setShowDescriptions(e.target.checked)}
                disabled={linkStyle === "icons-only"} // アイコンのみ表示の場合は無効化
              />
              <label htmlFor="show-descriptions" className="text-sm font-light text-gray-400">
                説明を表示
              </label>
            </div>
          </div>
        </div>

        {linkStyle === "icons-only" && (
          <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="flex items-start gap-2">
              <div>
                <p className="text-xs text-yellow-500 font-medium">アイコンのみ表示について</p>
                <p className="text-xs text-gray-400 mt-1">
                  このモードでは、リンクがアイコンのみでグリッド状に表示されます。アイコンにマウスを乗せると、リンク名がツールチップとして表示されます。
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 border-t border-yellow-900/10 pt-6 flex justify-end">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" onClick={handleSaveLinkSettings}>
            <Save size={16} className="mr-2" />
            変更を保存
          </Button>
        </div>
      </div>
    </>
  )
}
