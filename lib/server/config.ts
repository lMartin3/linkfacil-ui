export const BACKEND_API_BASE = process.env.API_BASE_URL || 'http://localhost:8080'

export const JWT_COOKIE = 'lf_jwt'
export const USER_COOKIE = 'lf_user'

export function isProd() {
  return process.env.NODE_ENV === 'production'
}
