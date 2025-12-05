import { NextRequest, NextResponse } from 'next/server'
import { backendJson } from '@/lib/server/fetch'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const data = await backendJson<any>('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  return NextResponse.json(data)
}
