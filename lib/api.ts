export type MessageResponse = { message: string }

export type SignupRequest = {
  username: string
  email: string
  password: string
  profilePicture?: string
}

export type LoginRequest = {
  usernameOrEmail: string
  password: string
}

export type FirebaseLoginRequest = {
  idToken: string
}

export type AuthUser = {
  id: string
  username: string
  email: string
}

export type CreatePageRequest = {
  code: string
  name: string
  description?: string
}

export type PageLink = {
  id: string
  title: string
  link: string
}

export type UpdatePageRequest = {
  title?: string
  description?: string
  links?: UpdatePageRequestLink[]
}
export type UpdatePageRequestLink = {
  id?: string
  title?: string
  link?: string
}

export type PageByCode = {
  id?: string
  code: string
  name?: string
  title?: string
  description?: string
  links?: PageLink[]
}

async function request<T>(path: string, init: RequestInit = {}) {
  const url = path // relative to Next API
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(init.headers || {}),
  }
  console.log("AAAAAAAAAAAAAA")
  const res = await fetch(url, { ...init, headers, cache: 'no-store' })
  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  if (!res.ok) {
    console.log(`Res code ${res.status}`)
    const msg = (data && (data.message || data.error)) || `Request failed: ${res.status}`
    throw new Error(msg)
  }
  return data as T
}

export const api = {
  signup(body: SignupRequest) {
    return request<MessageResponse>(`/api/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },
  signin(body: LoginRequest) {
    return request<AuthUser>(`/api/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },
  signinWithFirebase(body: FirebaseLoginRequest) {
    return request<AuthUser>(`/api/auth/signin/firebase`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },
  me() {
    return request<AuthUser | null>(`/api/auth/me`)
  },
  signout() {
    return request<MessageResponse>(`/api/auth/signout`, { method: 'POST' })
  },
  verify(token: string) {
    const q = new URLSearchParams({ token }).toString()
    return request<MessageResponse>(`/api/auth/verify?${q}`)
  },
  createPage(body: CreatePageRequest) {
    return request<MessageResponse>(`/api/proxy/api/page`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },
  getPageById(pageId: string) {
    console.log("Getting page by id...")
    return request<any>(`/api/proxy/api/page/${pageId}`)
  },
  updatePage(pageId: string, body: UpdatePageRequest) {
    return request<MessageResponse>(`/api/proxy/api/page/${pageId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })

  },
  deletePage(pageId: string) {
    return request<MessageResponse>(`/api/proxy/api/page/${pageId}`, {
      method: 'DELETE'
    })

  },

  getPageByCode(pageCode: string) {
    return request<PageByCode>(`/api/proxy/api/page/code/${pageCode}`)
  },
}
