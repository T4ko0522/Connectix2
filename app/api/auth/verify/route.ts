import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json()
    if (!email || !code) {
      return NextResponse.json({ error: "emailとcodeは必須です" }, { status: 400 })
    }

    const supabase = createClient(supabaseUrl, serviceKey)

    // 1. verification_codes 照合
    const { data: row } = await supabase
      .from("verification_codes")
      .select("*")
      .eq("email", email)
      .maybeSingle()

    if (!row || row.code !== code) {
      return NextResponse.json({ error: "認証コードが無効です" }, { status: 401 })
    }

    const created = new Date(row.created_at)
    const now = new Date()
    const diff = (now.getTime() - created.getTime()) / 1000
    if (diff > 300) {
      return NextResponse.json({ error: "認証コードの有効期限が切れています" }, { status: 410 })
    }

    // 2. 全ユーザーから一致するemailを探す
    const { data: users, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
      return NextResponse.json({ error: "ユーザー一覧の取得に失敗しました" }, { status: 500 })
    }

    const user = users.users.find((u) => u.email === email)

    if (!user) {
      return NextResponse.json({ error: "該当するユーザーが見つかりません" }, { status: 404 })
    }

    // 3. メール確認状態を true にする（confirmUserが使えない代替）
    const { error: confirmError } = await supabase.auth.admin.updateUserById(user.id, {
      email_confirm: true,
    })

    if (confirmError) {
      return NextResponse.json({ error: "アカウントの有効化に失敗しました" }, { status: 500 })
    }

    // 4. 認証コード削除
    await supabase.from("verification_codes").delete().eq("email", email)

    return NextResponse.json({ message: "アカウントが有効化されました" }, { status: 200 })
  } catch (e) {
    console.error("verify error", e)
    return NextResponse.json({ error: "内部サーバーエラー" }, { status: 500 })
  }
}
