import { NextResponse } from 'next/server'
import { getUserFromCookie, getJwtFromCookie } from '@/lib/server/cookies'
import { backendJson } from '@/lib/server/fetch'

export async function GET() {

  const user = await getUserFromCookie()
  if (user) return NextResponse.json(user)


  const jwt = await getJwtFromCookie()
  if (!jwt) return NextResponse.json(null)
  try {
    const me = await backendJson<any>('/api/auth/me', { method: 'GET' }, { withAuth: true })
    return NextResponse.json(me)
  } catch {
    return NextResponse.json(null)
  }
}
