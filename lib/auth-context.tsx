"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type {AuthUser, FirebaseLoginRequest, LoginRequest, SignupRequest} from './api'
import { api } from './api'

export type AuthState = {
  user: AuthUser | null
  initialized: boolean
}

export type AuthContextValue = AuthState & {
  signup: (body: SignupRequest) => Promise<void>
  signin: (body: LoginRequest) => Promise<void>
  signinWithFirebase: (body: FirebaseLoginRequest) => Promise<void>
  signout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, initialized: false })

  useEffect(() => {
    // Hydrate from server-side session via Next API
    api.me()
      .then((u) => setState({ user: u, initialized: true }))
      .catch(() => setState({ user: null, initialized: true }))
  }, [])

  const signin = useCallback(async (body: LoginRequest) => {
    const user = await api.signin(body)
    // Cookie with JWT is set by server; just store user in state
    setState({ user, initialized: true })
  }, [])

  const signinWithFirebase = useCallback(async (body: FirebaseLoginRequest) => {
    const user = await api.signinWithFirebase(body)
    setState({ user, initialized: true })
  }, [])

  const signup = useCallback(async (body: SignupRequest) => {
    await api.signup(body)
  }, [])

  const signout = useCallback(async () => {
    await api.signout()
    setState({ user: null, initialized: true })
  }, [])

  const value = useMemo<AuthContextValue>(() => ({ ...state, signin, signinWithFirebase, signup, signout }), [state, signin, signup, signout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
