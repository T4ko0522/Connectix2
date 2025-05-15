"use client"

import { useState, useEffect, useCallback } from "react"
import { PlusCircle, X, LinkIcon, Settings, HelpCircle, AlertCircle, ExternalLink, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddLinkForm, type LinkData } from "./add-link-form"
import { LinkItem } from "./link-item"
import { TipItem } from "./tip-item"
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd"
import { toast } from "react-toastify"

type LinksTabContentProps = {
  username: string
}

export function LinksTabContent({ username }: LinksTabContentProps) {
  const [showAddLinkForm, setShowAddLinkForm] = useState(false)
  const [links, setLinks] = useState<LinkData[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [editingLink, setEditingLink] = useState<LinkData | null>(null)
  const [saving, setSaving] = useState(false)

  // ハイドレーション後にマウントフラグを設定
  useEffect(() => {
    setIsMounted(true)

    // ローカルストレージからリンク順序を復元
    const savedLinks = localStorage.getItem("user_links")
    if (savedLinks) {
      try {
        const parsedLinks = JSON.parse(savedLinks)
        if (Array.isArray(parsedLinks) && parsedLinks.length > 0) {
          setLinks(parsedLinks)
        }
      } catch (e) {
        console.error("リンクの復元に失敗しました:", e)
      }
    }
  }, [])

  // リンク順序をローカルストレージに保存
  const saveLinksToStorage = useCallback((updatedLinks: LinkData[]) => {
    try {
      localStorage.setItem("user_links", JSON.stringify(updatedLinks))
    } catch (e) {
      console.error("リンクの保存に失敗しました:", e)
    }
  }, [])

  const handleToggleLink = (id: number) => {
    const updatedLinks = links.map((link) => (link.id === id ? { ...link, enabled: !link.enabled } : link))
    setLinks(updatedLinks)
    saveLinksToStorage(updatedLinks)
  }

  const handleEditLink = (id: number) => {
    // 編集対象のリンクを見つける
    const linkToEdit = links.find((link) => link.id === id)
    if (linkToEdit) {
      setEditingLink(linkToEdit)
      setShowAddLinkForm(false) // 新規追加フォームを閉じる
    }
  }

  const handleDeleteLink = (id: number) => {
    const updatedLinks = links.filter((link) => link.id !== id)
    setLinks(updatedLinks)
    saveLinksToStorage(updatedLinks)

    // 削除成功のトースト通知
    toast.success("リンクを削除しました", {
      position: "bottom-right",
      autoClose: 3000,
    })
  }

  const handleSaveLink = (linkData: LinkData) => {
    let updatedLinks: LinkData[]

    if (linkData.id) {
      // 既存リンクの編集
      updatedLinks = links.map((link) => (link.id === linkData.id ? { ...linkData } : link))

      // 編集成功のトースト通知
      toast.success("リンクを更新しました", {
        position: "bottom-right",
        autoClose: 3000,
      })
    } else {
      // 新規リンクの追加
      const newLink = {
        ...linkData,
        id: Date.now(), // 一意のIDを生成
      }
      updatedLinks = [...links, newLink]

      // 追加成功のトースト通知
      toast.success("新しいリンクを追加しました", {
        position: "bottom-right",
        autoClose: 3000,
      })
    }

    setLinks(updatedLinks)
    saveLinksToStorage(updatedLinks) // リンクをローカルストレージに保存
    setShowAddLinkForm(false)
    setEditingLink(null) // 編集モードを終了
  }

  const handleCancelEdit = () => {
    setEditingLink(null)
  }

  const handleCancelAdd = () => {
    setShowAddLinkForm(false)
  }

  // 明示的な保存ボタンの処理
  const handleSaveChanges = () => {
    // 現在のリンク状態をローカルストレージに保存
    saveLinksToStorage(links)

    // 保存中の状態を表示
    setSaving(true)

    // 少し遅延を入れて保存完了の演出（実際のAPIリクエストを模倣）
    setTimeout(() => {
      setSaving(false)

      // 保存成功のトースト通知
      toast.success("リンクの変更を保存しました", {
        position: "bottom-right",
        autoClose: 3000,
      })
    }, 500)
  }

  // ドラッグ開始時の処理
  const handleDragStart = () => {
    setIsDragging(true)

    // ドラッグ開始時に触覚フィードバックを提供（対応デバイスのみ）
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50)
    }

    // ドラッグ中はスクロールを無効化（iOS Safariでの問題対策）
    document.body.style.overflow = "hidden"

    // ドラッグ中はユーザー選択を無効化
    document.body.classList.add("dragging-active")

    // ドラッグ中のカーソルスタイルを変更
    document.documentElement.classList.add("dragging-cursor")
  }

  // ドラッグ&ドロップの処理
  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false)

    // スクロールを再度有効化
    document.body.style.overflow = ""

    // ユーザー選択を再度有効化
    document.body.classList.remove("dragging-active")

    // ドラッグ中のカーソルスタイルを元に戻す
    document.documentElement.classList.remove("dragging-cursor")

    // ドロップ先がない場合は何もしない
    if (!result.destination) return

    // リンクの順番を変更
    const items = Array.from(links)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // 順序変更成功時に触覚フィードバックを提供（対応デバイスのみ）
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([30, 50, 30])
    }

    setLinks(items)
    saveLinksToStorage(items)
  }

  // SSRとハイドレーションの不一致を防ぐため、マウント前は簡易表示
  if (!isMounted) {
    return (
      <div className="animate-pulse">
        <div className="mb-8">
          <div className="h-10 w-48 bg-gray-700/30 rounded mb-2"></div>
          <div className="h-5 w-72 bg-gray-700/20 rounded"></div>
        </div>
        <div className="bg-black/30 border border-yellow-900/20 rounded-xl p-6 mb-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-black/20 border border-yellow-900/10 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-light mb-2">リンク管理</h1>
            <p className="text-gray-400 text-sm">あなたのプロフィールに表示するリンクを管理します。</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              onClick={() => {
                setShowAddLinkForm(!showAddLinkForm)
                setEditingLink(null) // 編集モードをクリア
              }}
              disabled={!!editingLink} // 編集中は新規追加ボタンを無効化
            >
              {showAddLinkForm ? (
                <>
                  <X size={16} className="mr-2" />
                  キャンセル
                </>
              ) : (
                <>
                  <PlusCircle size={16} className="mr-2" />
                  新規リンク追加
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 編集フォーム */}
      {editingLink && (
        <AddLinkForm onCancel={handleCancelEdit} onSave={handleSaveLink} editLink={editingLink} isEditMode={true} />
      )}

      {/* 新規リンク追加フォーム */}
      {showAddLinkForm && !editingLink && <AddLinkForm onCancel={handleCancelAdd} onSave={handleSaveLink} />}

      {/* リンク一覧 */}
      <div
        className={`bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border rounded-xl p-6 mb-6 transition-all duration-300 ${
          isDragging ? "border-yellow-500/30 shadow-lg shadow-yellow-500/5" : "border-yellow-900/20"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-light flex items-center">
            <LinkIcon size={18} className="text-yellow-500 mr-2" />
            リンク一覧
          </h2>
          <div className="text-sm text-gray-400">合計: {links.length}件</div>
        </div>

        {links.length > 0 ? (
          <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <Droppable droppableId="links">
              {(provided, snapshot) => (
                <div
                  className={`space-y-4 transition-all duration-300 ${
                    snapshot.isDraggingOver ? "bg-yellow-500/5 rounded-lg p-4 -mx-2 drop-highlight" : ""
                  }`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {links.map((link, index) => (
                    <LinkItem
                      key={link.id}
                      id={link.id!}
                      index={index}
                      title={link.title}
                      url={link.url}
                      icon={link.icon}
                      enabled={link.enabled}
                      onToggle={handleToggleLink}
                      onEdit={handleEditLink}
                      onDelete={handleDeleteLink}
                      isEditing={editingLink?.id === link.id}
                    />
                  ))}
                  {provided.placeholder}
                  {links.length > 0 && (
                    <div className="mt-6 border-t border-yellow-900/10 pt-6 flex justify-end">
                      <Button
                        className="bg-yellow-500 hover:bg-yellow-600 text-black"
                        onClick={handleSaveChanges}
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <span className="animate-spin mr-2">⟳</span>
                            保存中...
                          </>
                        ) : (
                          <>
                            <Save size={16} className="mr-2" />
                            変更を保存
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-500">
            <div className="text-center">
              <p className="mb-2">まだリンクがありません</p>
              <p className="text-sm">「新規リンク追加」ボタンからリンクを追加してください。</p>
            </div>
          </div>
        )}
      </div>

      {/* リンク設定 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-6">
            <h2 className="text-xl font-light mb-4 flex items-center">
              <Settings size={18} className="text-yellow-500 mr-2" />
              リンク表示設定
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-light text-gray-400 mb-1">リンクの表示スタイル</label>
                <select
                  className="w-full bg-black/30 border border-yellow-900/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-yellow-500/50"
                  onChange={(e) => {
                    localStorage.setItem("link_style", e.target.value)
                    toast.success("表示スタイルを更新しました", {
                      position: "bottom-right",
                      autoClose: 2000,
                    })
                  }}
                  defaultValue={localStorage.getItem("link_style") || "list"}
                >
                  <option value="list">リスト表示（標準）</option>
                  <option value="buttons">ボタン表示</option>
                  <option value="icons-only">アイコンのみ表示</option>
                  <option value="minimal">ミニマル表示</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="show-icons"
                    className="mr-2 h-4 w-4 rounded border-gray-600 bg-black/30 text-yellow-500 focus:ring-yellow-500"
                    defaultChecked={localStorage.getItem("show_icons") !== "false"}
                    onChange={(e) => {
                      localStorage.setItem("show_icons", e.target.checked.toString())
                      toast.success("アイコン表示設定を更新しました", {
                        position: "bottom-right",
                        autoClose: 2000,
                      })
                    }}
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
                    defaultChecked={localStorage.getItem("show_descriptions") !== "false"}
                    onChange={(e) => {
                      localStorage.setItem("show_descriptions", e.target.checked.toString())
                      toast.success("説明表示設定を更新しました", {
                        position: "bottom-right",
                        autoClose: 2000,
                      })
                    }}
                  />
                  <label htmlFor="show-descriptions" className="text-sm font-light text-gray-400">
                    説明を表示
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  onClick={() => {
                    toast.success("リンク表示設定を保存しました", {
                      position: "bottom-right",
                      autoClose: 3000,
                    })
                  }}
                >
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
              <HelpCircle size={18} className="text-yellow-500 mr-2" />
              リンク管理のヒント
            </h2>

            <div className="space-y-3 mb-4">
              <TipItem text="最も重要なリンクを上部に配置しましょう" />
              <TipItem text="短く分かりやすいタイトルを使用しましょう" />
              <TipItem text="定期的に使用していないリンクを整理しましょう" />
              <TipItem text="リンクの説明を追加して詳細を提供しましょう" />
            </div>

            <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-yellow-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-500 mb-1">プロフィールのプレビュー</h3>
                  <p className="text-xs text-gray-400">
                    変更を保存した後、プロフィールページで実際の表示を確認できます。
                  </p>
                  <Button
                    variant="outline"
                    className="mt-3 text-xs h-8 border-yellow-900/20 hover:border-yellow-500/30"
                    onClick={() => window.open(`/${username}`, "_blank")}
                  >
                    <ExternalLink size={14} className="mr-2" />
                    プロフィールを表示
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
