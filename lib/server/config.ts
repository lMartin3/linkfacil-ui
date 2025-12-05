const _apiBase = process.env.API_BASE_URL || 'http://localhost:8080'

// Log the API base URL once when the server process/module initializes
if (typeof window === 'undefined') {
  // eslint-disable-next-line no-console
  console.log(`[Startup] API_BASE_URL: ${_apiBase}`)
}

export const BACKEND_API_BASE = _apiBase

export const JWT_COOKIE = 'lf_jwt'
export const USER_COOKIE = 'lf_user'

export function isProd() {
  return process.env.NODE_ENV === 'production'
}
