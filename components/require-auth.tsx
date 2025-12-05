"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, initialized } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (initialized && !user) router.replace("/auth/signin")
  }, [initialized, user, router])

  if (!initialized) return null
  if (!user) return null
  return <>{children}</>
}
