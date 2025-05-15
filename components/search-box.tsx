"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function SearchBox() {
  const [inputValue, setInputValue] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 入力が空でない場合のみリダイレクト
    if (inputValue.trim()) {
      // 入力されたテキストをユーザーパスとして使用
      const username = inputValue.trim()

      // サイト内のユーザープロフィールページにリダイレクト
      router.push(`/${username}`)
    }
  }

  return (
    <div className="relative w-64">
      <form onSubmit={handleSubmit}>
        <label className="flex items-center box-border relative border border-transparent rounded-xl overflow-hidden bg-[#3D3D3D] p-2 cursor-text hover:border-gray-600 focus-within:bg-[#464646] focus-within:border-gray-600">
          <input
            type="text"
            name="search"
            className={`outline-none w-full border-none bg-transparent text-[#a2a2a2] placeholder-[#7e7e7e] focus:outline-none ${
              inputValue ? "pl-6" : ""
            }`}
            required
            placeholder="ユーザー名を検索..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {!inputValue && (
            <kbd className="absolute right-2 border border-[#393838] bg-gradient-to-br from-[#343434] to-[#6d6d6d] rounded text-center shadow-[inset_0_-2px_0_0_#3f3f3f,inset_0_0_1px_1px_rgb(94,93,93),0_1px_2px_1px_rgba(28,28,29,0.4)] cursor-pointer text-xs w-4 h-5 flex items-center justify-center text-[#7e7e7e]">
              /
            </kbd>
          )}
          {inputValue && (
            <svg
              className="w-3 h-auto text-[#7e7e7e] absolute left-2.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 56.966 56.966"
            >
              <path
                d="M55.146 51.887 41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z"
                fill="currentColor"
              />
            </svg>
          )}
        </label>
      </form>
    </div>
  )
}
