import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendVerificationEmail } from "@/lib/sendMail"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "メールアドレスが必要です" }, { status: 400 })
    }

    const supabase = createClient(supabaseUrl, serviceKey)

    // ユーザー一覧から該当ユーザーを取得
    const { data: users, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) {
      return NextResponse.json({ error: "ユーザー確認に失敗しました" }, { status: 500 })
    }

    const user = users.users.find((u) => u.email === email)

    if (!user) {
      return NextResponse.json({ error: "該当するユーザーが見つかりません" }, { status: 404 })
    }

    if (user.email_confirmed_at) {
      return NextResponse.json({ error: "このユーザーは既に認証済みです" }, { status: 400 })
    }

    // 認証コードを再発行・保存
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    await supabase.from("verification_codes").upsert([
      { email, code, created_at: new Date().toISOString() }
    ])

    // メールを再送信
    await sendVerificationEmail(email, code)

    return NextResponse.json({ message: "認証コードを再送信しました" }, { status: 200 })
  } catch (error) {
    console.error("resend error", error)
    return NextResponse.json({ error: "内部サーバーエラー" }, { status: 500 })
  }
}
