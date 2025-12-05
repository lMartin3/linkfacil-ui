"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export default function SignUpPage() {
  const router = useRouter()
  const { signup, user } = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (user) router.replace("/")
  }, [user, router])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      await signup({ username, email, password })
      setSuccess("Registered successfully. Please check your email to verify your account, then sign in.")
      setTimeout(() => router.push("/auth/signin"), 800)
    } catch (err: any) {
      setError(err.message || "Failed to sign up")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">A verification email may be required.</p>
      </div>
      <form className="space-y-3" onSubmit={onSubmit}>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="username">Username</label>
          <input id="username" className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={username} onChange={(e)=>setUsername(e.target.value)} required minLength={3} maxLength={20} />
        </div>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="email">Email</label>
          <input id="email" type="email" className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="password">Password</label>
          <input id="password" type="password" className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={password} onChange={(e)=>setPassword(e.target.value)} required minLength={6} maxLength={40} />
        </div>
        {error && <div className="text-sm text-destructive">{error}</div>}
        {success && <div className="text-sm text-green-600">{success}</div>}
        <Button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign up'}</Button>
      </form>
      <div className="text-sm">Already have an account? <a className="underline" href="/auth/signin">Log in</a></div>
    </div>
  )
}
