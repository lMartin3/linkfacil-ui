import { NextRequest, NextResponse } from 'next/server'
import { backendJson } from '@/lib/server/fetch'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const data = await backendJson<any>(`/api/auth/verify?${new URLSearchParams({ token: token || '' }).toString()}`)
  return NextResponse.json(data)
}
