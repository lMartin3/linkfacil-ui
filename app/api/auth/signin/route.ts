import { NextRequest, NextResponse } from 'next/server'
import { backendJson } from '@/lib/server/fetch'
import { setAuthCookies } from '@/lib/server/cookies'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const data = await backendJson<any>('/api/auth/signin', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  // Expecting backend to return { token, type, id, username, email }
  const { token, id, username, email } = data
  if (!token || !id) {
    return NextResponse.json({ error: 'Invalid auth response from backend' }, { status: 500 })
  }
  await setAuthCookies(token, { id, username, email })
  return NextResponse.json({ id, username, email })
}
