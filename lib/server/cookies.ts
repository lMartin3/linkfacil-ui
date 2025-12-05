import { cookies } from 'next/headers'
import { JWT_COOKIE, USER_COOKIE } from './config'

export type UserInfo = {
  id: string
  username: string
  email: string
}

export async function setAuthCookies(token: string, user: UserInfo) {
  const c = await cookies()
  c.set(JWT_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',

  })
  c.set(USER_COOKIE, JSON.stringify(user), {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

export async function clearAuthCookies() {
  const c = await cookies()
  c.set(JWT_COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 })
  c.set(USER_COOKIE, '', { httpOnly: false, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 })
}

export async function getJwtFromCookie(): Promise<string | null> {
  try {
    const c = await cookies()
    const v = c.get(JWT_COOKIE)?.value
    return v || null
  } catch {
    return null
  }
}

export async function getUserFromCookie(): Promise<UserInfo | null> {
  try {
    const c = await cookies()
    const raw = c.get(USER_COOKIE)?.value
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}
