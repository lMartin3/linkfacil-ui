"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import {GoogleButton} from "@/app/auth/signin/GoogleButton";

export default function SignInPage() {
  const router = useRouter()
  const { signin, user, signinWithFirebase } = useAuth()
  const [usernameOrEmail, setUsernameOrEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) router.replace('/')
  }, [user, router])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signin({ usernameOrEmail, password })
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setError(null)
    setLoading(true)

    const result = await signInWithPopup(auth, googleProvider);

    const idToken = await result.user.getIdToken();

    try {
      await signinWithFirebase({idToken: idToken})
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">Access your account</p>
      </div>
      <form className="space-y-3" onSubmit={onSubmit}>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="usernameOrEmail">Username or Email</label>
          <input
            id="usernameOrEmail"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-sm text-destructive">{error}</div>}
        <Button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
        <Button type="button" disabled={loading} onClick={signInWithGoogle}>{loading ? 'Signing in...' : 'Sign in with firebasae'}</Button>
        <GoogleButton disabled={loading} onClick={signInWithGoogle} />
      </form>
      <div className="text-sm">Don’t have an account? <a className="underline" href="/auth/signup">Sign up</a></div>
    </div>
  )
}
