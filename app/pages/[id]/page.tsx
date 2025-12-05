"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { api, type UpdatePageRequest } from "@/lib/api"
import { RequireAuth } from "@/components/require-auth"

export default function EditPage() {
  return (
    <RequireAuth>
      <EditPageInner />
    </RequireAuth>
  )
}

function EditPageInner() {
  const params = useParams<{ id: string }>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [links, setLinks] = useState<{ title: string; link: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        const data = await api.getPageById(params.id)
        setTitle((data.title || data.name || "") as string)
        setDescription((data.description || "") as string)
        const ls = Array.isArray(data.links) ? data.links.map((l: any) => ({ title: l.title, link: l.link })) : []
        setLinks(ls)
      } catch (e: any) {
        setError(e.message || "Failed to load page")
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [params.id])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const t = title.trim()
    if (!t) {
      setError("Title is required.")
      return
    }
    // Validate links: each must have non-empty title and URL
    const cleanedLinks = links.map(l => ({ title: l.title.trim(), link: l.link.trim() }))
    const hasEmpty = cleanedLinks.some(l => !l.title || !l.link)
    if (hasEmpty) {
      setError("Each link must have a title and a URL.")
      return
    }

    setSaving(true)
    const body: UpdatePageRequest = { title: t, description, links: cleanedLinks }
    try {
      await api.updatePage(params.id, body)
    } catch (e: any) {
      setError(e.message || "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="mx-auto max-w-md">Loading...</div>
  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Edit Page</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <label className="text-sm" htmlFor="title">Title</label>
          <input id="title" className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div>
          <label className="text-sm" htmlFor="description">Description</label>
          <textarea id="description" className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={description} onChange={(e)=>setDescription(e.target.value)} />
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Links</div>
          {links.map((l, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input className="flex-1 rounded-md border px-2 py-1 text-sm" placeholder="Title" value={l.title} onChange={(e)=>{ const a=[...links]; a[idx].title=e.target.value; setLinks(a) }} />
              <input className="flex-1 rounded-md border px-2 py-1 text-sm" placeholder="URL" value={l.link} onChange={(e)=>{ const a=[...links]; a[idx].link=e.target.value; setLinks(a) }} />
              <Button type="button" variant="destructive" size="sm" onClick={()=> setLinks(links.filter((_, i) => i !== idx))} aria-label={`Remove link ${idx+1}`}>Remove</Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={()=>setLinks([...links, { title: "", link: "" }])}>Add link</Button>
        </div>
        {error && <div className="text-sm text-destructive">{error}</div>}
        <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
      </form>
    </div>
  )
}
