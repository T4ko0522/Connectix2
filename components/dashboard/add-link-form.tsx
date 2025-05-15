"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PlusCircle, Save, X, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { socialPlatforms, type SocialPlatform } from "../social-link-templates"

export type LinkData = {
  id?: number
  title: string
  url: string
  icon: string
  description?: string
  enabled: boolean
}

export type AddLinkFormProps = {
  onCancel: () => void
  onSave: (linkData: LinkData) => void
  editLink?: LinkData | null // 編集対象のリンク（編集モードの場合）
  isEditMode?: boolean // 編集モードかどうか
}

export function AddLinkForm({ onCancel, onSave, editLink = null, isEditMode = false }: AddLinkFormProps) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [icon, setIcon] = useState(socialPlatforms[0].id)
  const [description, setDescription] = useState("")
  const [enabled, setEnabled] = useState(true)
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | undefined>(socialPlatforms[0])
  const [customDomain, setCustomDomain] = useState("")

  // 編集モードの場合、初期値を設定
  useEffect(() => {
    if (editLink) {
      setTitle(editLink.title || "")
      setUrl(editLink.url || "")
      setIcon(editLink.icon || socialPlatforms[0].id)
      setDescription(editLink.description || "")
      setEnabled(editLink.enabled)
    }
  }, [editLink])

  // アイコンが変更されたときに選択されたプラットフォームを更新
  useEffect(() => {
    const platform = socialPlatforms.find((p) => p.id === icon)
    setSelectedPlatform(platform)
  }, [icon])

  // URLからプレフィックスを除去する関数
  const removeUrlPrefix = (fullUrl: string, prefix: string): string => {
    if (fullUrl.startsWith(prefix)) {
      return fullUrl.substring(prefix.length)
    }
    return fullUrl
  }

  // 編集モード時にURLからプレフィックスを除去
  useEffect(() => {
    if (editLink && selectedPlatform) {
      // カスタムドメインの場合は特別な処理
      if (selectedPlatform.id === "custom") {
        setUrl(editLink.url)
      } else {
        const cleanUrl = removeUrlPrefix(editLink.url, selectedPlatform.urlPrefix)
        setUrl(cleanUrl)
      }
    }
  }, [editLink, selectedPlatform])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // タイトルが空の場合、選択されたプラットフォームの名前を使用
    const finalTitle = title.trim() === "" && selectedPlatform ? selectedPlatform.name : title

    // URLの処理
    let fullUrl = url

    // カスタムドメインの場合
    if (selectedPlatform?.id === "custom") {
      // URLにプロトコルがない場合は追加
      if (!url.includes("://")) {
        fullUrl = `https://${url}`
      }
    } else {
      // 通常のプラットフォームの場合
      fullUrl =
        selectedPlatform && !url.includes("://") && !url.startsWith(selectedPlatform.urlPrefix)
          ? `${selectedPlatform.urlPrefix}${url}`
          : url
    }

    onSave({
      id: editLink?.id, // 編集モードの場合はIDを保持
      title: finalTitle,
      url: fullUrl,
      icon,
      description,
      enabled,
    })
  }

  // カスタムドメインが選択されているかどうか
  const isCustomDomain = selectedPlatform?.id === "custom"

  return (
    <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6 mb-6">
      <h2 className="text-xl font-light mb-4 flex items-center">
        {isEditMode ? (
          <>
            <Edit2 size={18} className="text-yellow-500 mr-2" />
            リンクを編集
          </>
        ) : (
          <>
            <PlusCircle size={18} className="text-yellow-500 mr-2" />
            新規リンクを追加
          </>
        )}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-light text-gray-400 mb-1">プラットフォーム</label>
              <select
                className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              >
                {socialPlatforms.map((platform) => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-light text-gray-400 mb-1">タイトル</label>
              <input
                type="text"
                placeholder={selectedPlatform?.name || "タイトル"}
                className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="mt-1 text-xs text-yellow-500/70">空の場合は「{selectedPlatform?.name}」が使用されます</p>
            </div>

            <div>
              <label className="block text-sm font-light text-gray-400 mb-1">URL</label>
              {isCustomDomain ? (
                // カスタムドメインの場合はシンプルなURL入力フィールド
                <div className="flex items-center">
                  <span className="bg-black/50 border border-yellow-900/20 border-r-0 rounded-l-md px-3 py-2 text-sm text-gray-500">
                    https://
                  </span>
                  <input
                    type="text"
                    placeholder="example.com/page"
                    className="flex-grow bg-black/30 border border-yellow-900/20 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
              ) : (
                // 通常のプラットフォームの場合
                <div className="flex items-center">
                  <span className="bg-black/50 border border-yellow-900/20 border-r-0 rounded-l-md px-3 py-2 text-sm text-gray-500">
                    {selectedPlatform?.urlPrefix || "https://"}
                  </span>
                  <input
                    type="text"
                    placeholder={selectedPlatform?.placeholder || "username"}
                    className="flex-grow bg-black/30 border border-yellow-900/20 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
              )}
              {isCustomDomain && (
                <p className="mt-1 text-xs text-yellow-500/70">
                  完全なURLを入力してください。プロトコル（https://）は自動的に追加されます。
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-light text-gray-400 mb-1">説明（オプション）</label>
              <textarea
                placeholder="リンクの説明を入力してください"
                className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50 h-24"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="enabled"
                className="mr-2 h-4 w-4 rounded border-gray-600 bg-black/30 text-yellow-500 focus:ring-yellow-500"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
              />
              <label htmlFor="enabled" className="text-sm font-light text-gray-400">
                有効にする
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button
                type="button"
                variant="outline"
                className="border-yellow-900/20 hover:border-yellow-500/30 text-white"
                onClick={onCancel}
              >
                <X size={16} className="mr-2" />
                キャンセル
              </Button>
              <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Save size={16} className="mr-2" />
                {isEditMode ? "更新" : "保存"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
