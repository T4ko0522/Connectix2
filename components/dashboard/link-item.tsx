"use client"
import { Edit2, Eye, EyeOff, GripVertical, Trash2 } from "lucide-react"
import { SocialLinkIcon, getPlatformById } from "../social-link-templates"
import { Draggable } from "@hello-pangea/dnd"
import { useEffect, useState } from "react"

export type LinkItemProps = {
  id: number
  index: number
  title: string
  url: string
  icon: string
  enabled: boolean
  onToggle: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  isEditing?: boolean // 編集中かどうか
}

export function LinkItem({
  id,
  index,
  title,
  url,
  icon,
  enabled,
  onToggle,
  onEdit,
  onDelete,
  isEditing = false,
}: LinkItemProps) {
  const platform = getPlatformById(icon)
  const [isMounted, setIsMounted] = useState(false)

  // ハイドレーション後にマウントフラグを設定
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // SSRとハイドレーションの不一致を防ぐため、マウント前は簡易表示
  if (!isMounted) {
    return (
      <div className="flex items-center justify-between p-4 bg-black/30 border border-yellow-900/10 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-black/50 rounded-lg text-yellow-500">
            <GripVertical size={16} />
          </div>
          <div className="flex items-center gap-3">
            {platform && <SocialLinkIcon platform={platform} />}
            <div>
              <h3 className="text-sm font-medium mb-1 flex items-center">
                {title}
                {!enabled && (
                  <span className="ml-2 text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full">無効</span>
                )}
              </h3>
              <p className="text-xs text-gray-500">{url}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md text-gray-400" type="button">
            {enabled ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <button className="p-2 rounded-md text-gray-400" type="button">
            <Edit2 size={16} />
          </button>
          <button className="p-2 rounded-md text-gray-400" type="button">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <Draggable draggableId={id.toString()} index={index} isDragDisabled={isEditing}>
      {(provided, snapshot) => {
        // ドラッグ中のスタイルをカスタマイズ
        const base = provided.draggableProps.style?.transform ?? ""
        const dragStyle = {
          ...provided.draggableProps.style,
          // ドラッグ中は少し透明度を下げる
          opacity: snapshot.isDragging ? 0.9 : 1,
          // ドラッグ中は少し拡大して目立たせる
          transform: snapshot.isDragging ? `scale(1.02) ${base}` : base,
          transformOrigin: snapshot.isDragging ? "top left" : undefined,
          // ドラッグ中は影をつける
          boxShadow: snapshot.isDragging
            ? "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)"
            : "none",
          // ドラッグ中はz-indexを上げる
          zIndex: snapshot.isDragging ? 9999 : "auto",
          // ドロップアニメーション中のみトランジションを適用
          transition: snapshot.isDropAnimating ? "all 0.25s cubic-bezier(0.2, 0, 0, 1)" : "none",
          // カーソル位置との同期を調整
          pointerEvents: snapshot.isDragging ? "none" : "auto",
        }

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={dragStyle as React.CSSProperties}
            className={`flex items-center justify-between p-4 bg-black/30 border rounded-lg ${
              isEditing
                ? "border-yellow-500 bg-yellow-500/5"
                : snapshot.isDragging
                  ? "border-yellow-500/50 bg-black/80 link-item-dragging cursor-grabbing"
                  : "border-yellow-900/10 hover:border-yellow-500/30"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                {...provided.dragHandleProps}
                className={`p-2 rounded-lg ${
                  isEditing
                    ? "bg-yellow-500/20 text-yellow-400 cursor-not-allowed"
                    : snapshot.isDragging
                      ? "bg-yellow-500/30 text-yellow-400 animate-pulse-slow cursor-grabbing"
                      : "bg-black/50 text-yellow-500 hover:bg-yellow-500/10 cursor-grab"
                }`}
              >
                <GripVertical size={16} />
              </div>
              <div className="flex items-center gap-3">
                {platform && <SocialLinkIcon platform={platform} />}
                <div>
                  <h3
                    className={`text-sm font-medium mb-1 flex items-center ${
                      isEditing ? "text-yellow-400" : snapshot.isDragging ? "text-yellow-400" : ""
                    }`}
                  >
                    {title}
                    {!enabled && (
                      <span className="ml-2 text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full">
                        無効
                      </span>
                    )}
                    {isEditing && (
                      <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full animate-pulse">
                        編集中
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-gray-500">{url}</p>
                </div>
              </div>
            </div>
            <div className={`flex items-center gap-2 ${snapshot.isDragging ? "opacity-80" : ""}`}>
              <button
                className="p-2 rounded-md hover:bg-yellow-500/10 text-gray-400 hover:text-yellow-500 transition-colors"
                onClick={() => onToggle(id)}
                type="button"
                disabled={isEditing}
              >
                {enabled ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button
                className={`p-2 rounded-md hover:bg-yellow-500/10 transition-colors ${
                  isEditing ? "bg-yellow-500/20 text-yellow-400" : "text-gray-400 hover:text-yellow-500"
                }`}
                onClick={() => onEdit(id)}
                type="button"
                disabled={isEditing}
              >
                <Edit2 size={16} />
              </button>
              <button
                className="p-2 rounded-md hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => onDelete(id)}
                type="button"
                disabled={isEditing}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )
      }}
    </Draggable>
  )
}
