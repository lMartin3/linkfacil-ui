import { NextRequest, NextResponse } from 'next/server'
import { backendJson } from '@/lib/server/fetch'

// GET /api/page -> list pages (auth required)
// export async function GET() {
//   const data = await backendJson<any[]>('/api/page', { method: 'GET' }, { withAuth: true })
//   return NextResponse.json(data)
// }
//
// // POST /api/page -> create page (auth required)
// export async function POST(req: NextRequest) {
//   const body = await req.json()
//   const data = await backendJson<any>('/api/page', { method: 'POST', body: JSON.stringify(body) }, { withAuth: true })
//   return NextResponse.json(data)
// }
