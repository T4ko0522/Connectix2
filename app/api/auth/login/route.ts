import { createClient } from '@/lib/supabase';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();
  const origin = headers().get('origin');
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.redirect(data.url);
}
