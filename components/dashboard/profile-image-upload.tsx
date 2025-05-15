"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Trash2, User } from "lucide-react"
import { toast } from "react-toastify"

interface ProfileImageUploadProps {
  initialImage?: string | null
  onImageChange?: (imageData: string | null) => void
  onImageSave?: (imageData: string | null) => void // 保存時のコールバックを追加
}

export function ProfileImageUpload({ initialImage = null, onImageChange, onImageSave }: ProfileImageUploadProps) {
  const [image, setImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 初期画像を設定
  useEffect(() => {
    if (initialImage) {
      setImage(initialImage)
    } else {
      // ローカルストレージから画像を取得
      const savedImage = localStorage.getItem("profile_image")
      if (savedImage) {
        setImage(savedImage)
      }
    }
  }, [initialImage])

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target?.result as string
      setImage(imageData)

      // ローカルストレージに保存
      localStorage.setItem("profile_image", imageData)

      // 親コンポーネントに通知
      if (onImageChange) {
        onImageChange(imageData)
      }

      // 保存完了時のコールバックも呼び出す
      if (onImageSave) {
        onImageSave(imageData)
      }

      setIsUploading(false)

      toast.success("プロフィール画像をアップロードしました", {
        position: "bottom-right",
        autoClose: 3000,
      })
    }

    reader.onerror = () => {
      toast.error("画像の読み込みに失敗しました", {
        position: "bottom-right",
        autoClose: 3000,
      })
      setIsUploading(false)
    }

    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setImage(null)
    localStorage.removeItem("profile_image")

    // 親コンポーネントに通知
    if (onImageChange) {
      onImageChange(null)
    }

    // 保存完了時のコールバックも呼び出す
    if (onImageSave) {
      onImageSave(null)
    }

    toast.info("プロフィール画像を削除しました", {
      position: "bottom-right",
      autoClose: 3000,
    })

    // ファイル入力をリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        {image ? (
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500/30 group relative">
            <img
              src={image || "/placeholder.svg"}
              alt="プロフィール画像"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                variant="outline"
                size="sm"
                className="bg-black/70 border-yellow-500/50 text-yellow-500 hover:bg-black/90 hover:text-yellow-400"
                onClick={handleUploadClick}
              >
                <Upload size={14} className="mr-1" />
                変更
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="w-24 h-24 rounded-full bg-yellow-500/20 flex items-center justify-center border-2 border-yellow-500/30 cursor-pointer hover:bg-yellow-500/30 transition-colors duration-300"
            onClick={handleUploadClick}
          >
            <User size={32} className="text-yellow-500" />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="text-sm border-yellow-900/20 hover:border-yellow-500/30"
          onClick={handleUploadClick}
          disabled={isUploading}
        >
          <Upload size={14} className="mr-2" />
          {isUploading ? "アップロード中..." : "アップロード"}
        </Button>

        {image && (
          <Button
            variant="outline"
            className="text-sm border-red-900/20 hover:border-red-500/30 text-red-400 hover:text-red-300"
            onClick={handleRemoveImage}
            disabled={isUploading}
          >
            <Trash2 size={14} className="mr-2" />
            削除
          </Button>
        )}
      </div>

      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

      <p className="mt-2 text-xs text-gray-500 text-center">
        推奨サイズ: 400x400ピクセル
        <br />
        最大ファイルサイズ: 2MB
      </p>
    </div>
  )
}
