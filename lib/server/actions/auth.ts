"use server"

import { backendJson } from "@/lib/server/fetch"
import { clearAuthCookies, setAuthCookies } from "@/lib/server/cookies"

export type BackendSigninResponse = {
  token: string
  id: string
  username: string
  email: string
}

export async function signinAction(body: { usernameOrEmail: string; password: string }) {
  const data = await backendJson<BackendSigninResponse>("/api/auth/signin", {
    method: "POST",
    body: JSON.stringify(body),
  })
  const { token, id, username, email } = data
  if (!token || !id) throw new Error("Invalid auth response from backend")
  await setAuthCookies(token, { id, username, email })
  // Return a user-like shape for the client state
  return { id, username, email } as any
}

export async function signinWithFirebaseAction(body: { idToken: string }) {
  const data = await backendJson<BackendSigninResponse>("/api/auth/signin/firebase", {
    method: "POST",
    body: JSON.stringify(body),
  })
  const { token, id, username, email } = data
  if (!token || !id) throw new Error("Invalid auth response from backend")
  await setAuthCookies(token, { id, username, email })
  return { id, username, email } as any
}

export async function signoutAction() {
  await clearAuthCookies()
  return { message: "signed out" }
}

export async function verifyAction(token: string) {
  const q = new URLSearchParams({ token }).toString()
  try {
    const data = await backendJson<{ message?: string }>(`/api/auth/verify?${q}`)
    return { ok: true as const, message: data?.message || "Email verified" }
  } catch (err: any) {
    return { ok: false as const, message: err?.message || "Verification failed" }
  }
}
