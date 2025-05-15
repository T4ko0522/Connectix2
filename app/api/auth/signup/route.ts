import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendVerificationEmail } from "@/lib/sendMail"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: NextRequest) {
  try {
    const { email, password, username, displayName } = await req.json()

    if (!email || !password || !username || !displayName) {
      return NextResponse.json({ error: "すべての項目は必須です" }, { status: 400 })
    }

    const supabase = createClient(supabaseUrl, serviceKey)

    // 🔍 既存ユーザー確認（email一致）
    const { data: allUsers, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) {
      return NextResponse.json({ error: "ユーザー確認に失敗しました" }, { status: 500 })
    }

    const existing = allUsers.users.find(u => u.email === email)

    if (existing) {
      if (existing.email_confirmed_at) {
        return NextResponse.json({ error: "このメールアドレスは既に登録されています" }, { status: 409 })
      } else {
        // 🔁 未確認ユーザー → 再利用してコードのみ再送信
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        await supabase.from("verification_codes").upsert([
          { email, code, created_at: new Date().toISOString() }
        ])
        await sendVerificationEmail(email, code)

        return NextResponse.json({ message: "認証コードを再送信しました（未確認ユーザー）" }, { status: 200 })
      }
    }

    // 🆕 新規ユーザー登録（まだいない場合）
    const { data: userData, error: signupError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
    })

    if (signupError || !userData?.user) {
      return NextResponse.json({ error: signupError?.message ?? "ユーザー作成に失敗しました" }, { status: 400 })
    }

    // 認証コード生成・保存・送信
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    await supabase.from("verification_codes").upsert([
      { email, code, created_at: new Date().toISOString() }
    ])
    await sendVerificationEmail(email, code)

    return NextResponse.json({ message: "認証コードを送信しました", userId: userData.user.id }, { status: 200 })
  } catch (e) {
    console.error("signup error", e)
    return NextResponse.json({ error: "内部サーバーエラー" }, { status: 500 })
  }
}
