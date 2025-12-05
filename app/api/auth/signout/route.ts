import { NextResponse } from 'next/server'
import { clearAuthCookies } from '@/lib/server/cookies'

export async function POST() {
  await clearAuthCookies()
  return NextResponse.json({ message: 'signed out' })
}
