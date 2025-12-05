import { BACKEND_API_BASE } from './config'
import { getJwtFromCookie } from './cookies'

export async function backendFetch(path: string, init: RequestInit = {}, opts?: { withAuth?: boolean }) {
  const url = path.startsWith('http') ? path : `${BACKEND_API_BASE}${path}`
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(init.headers || {}),
  }
  if (opts?.withAuth) {
    const jwt = await getJwtFromCookie()
    if (jwt) (headers as any)['Authorization'] = `Bearer ${jwt}`
  }
  const res = await fetch(url, { ...init, headers, cache: 'no-store' })
  return res
}

export async function backendJson<T = never>(path: string, init: RequestInit = {}, opts?: { withAuth?: boolean }) {
  const res = await backendFetch(path, init, opts)
  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `Backend request failed: ${res.status}`
    throw new Error(msg)
  }
  return data as T
}
