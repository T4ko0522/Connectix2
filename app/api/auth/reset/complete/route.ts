import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { ref } from "process"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(req: NextRequest) {
  const { token, refresh_token, password } = await req.json()

  if (!token || !refresh_token || !password) {
    return NextResponse.json({ error: "トークンと新しいパスワードが必要です" }, { status: 400 })
  }

  const supabase = createClient(supabaseUrl, anonKey)

  // ✅ recoveryトークンでセッションをセットする
  const { error: sessionError } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: refresh_token ?? "", // ← ここが必須
  })

  if (sessionError) {
    return NextResponse.json({ error: "セッションの確立に失敗しました" }, { status: 400 })
  }

  // ✅ パスワードを変更
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ message: "パスワードが更新されました" })
}
