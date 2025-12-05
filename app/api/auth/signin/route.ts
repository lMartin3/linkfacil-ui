import { NextRequest, NextResponse } from 'next/server'
import { backendJson } from '@/lib/server/fetch'
import { setAuthCookies } from '@/lib/server/cookies'

export async function POST(req: NextRequest) {
  const body = await req.json()
  try {

  const data = await backendJson<any>('/api/auth/signin', {
    method: 'POST',
    body: JSON.stringify(body),
  })
    // Expecting backend to return { token, type, id, username, email }
    const { token, id, username, email } = data
    if (!token || !id) {
      return NextResponse.json({ message: `${data.message}` }, { status: 500 })
    }
    await setAuthCookies(token, { id, username, email })
    return NextResponse.json({ id, username, email })
  } catch(e : any) {
    return NextResponse.json({ message: `${e.message}`, status: 500 })
  }

}
