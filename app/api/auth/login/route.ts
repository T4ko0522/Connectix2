import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: "メールとパスワードは必須です" }, { status: 400 })
  }

  const supabase = createClient(supabaseUrl, anonKey)

  const { error, data } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }

  return NextResponse.json({ message: "ログイン成功", user: data.user }, { status: 200 })
}
