"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { RequireAuth } from "@/components/require-auth"

export default function NewPage() {
  return (
    <RequireAuth>
      <NewPageInner />
    </RequireAuth>
  )
}

function NewPageInner() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await api.createPage({ code, name, description })
      router.push("/pages")
    } catch (err: any) {
      setError(err.message || "Failed to create page")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">New Page</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="code">Code</label>
          <input id="code" className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={code} onChange={(e)=>setCode(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="name">Name</label>
          <input id="name" className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={name} onChange={(e)=>setName(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="description">Description</label>
          <textarea id="description" className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={description} onChange={(e)=>setDescription(e.target.value)} />
        </div>
        {error && <div className="text-sm text-destructive">{error}</div>}
        <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create page'}</Button>
      </form>
    </div>
  )
}
