export const revalidate = 60

type PageLink = {
  id: string
  title: string
  link: string
  createdAt: string
  updatedAt: string
}

type PublicPage = {
  id?: string
  code: string
  name?: string
  title?: string
  description?: string
  links?: PageLink[]
}

async function getPageByCode(code: string): Promise<PublicPage | null> {
  const base = process.env.API_BASE_URL || "http://localhost:8080"
  const res = await fetch(`${base}/api/page/code/${code}`, { next: { revalidate } })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to fetch page: ${res.status}`)
  return res.json()
}

export default async function PublicPage({ params }: { params: Promise<{code: string}> }) {
  const { code } = await params; // ✅ unwrap the Promise

  const data = await getPageByCode(code)
  if (!data) {
    return (
      <div className="mx-auto max-w-xl py-10">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-sm text-muted-foreground">We couldn&apos;t find a page for code &quot;{code}&quot;.</p>
      </div>
    )
  }
  const title = data.title || data.name || data.code
  return (
    <div className="mx-auto max-w-xl space-y-4 py-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {data.description && (
          <p className="mt-1 text-sm text-muted-foreground">{data.description}</p>
        )}
      </div>
      {data.links?.length ? (
        <ul className="space-y-2">
          {data.links.map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-3 rounded-md border p-3">
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{l.title}</div>
                <div className="truncate text-xs text-muted-foreground">{l.link}</div>
              </div>
              <a
                className="shrink-0 rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground hover:bg-primary/90"
                href={l.link}
                target="_blank"
                rel="noreferrer"
              >
                Visit
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-muted-foreground">No links yet.</div>
      )}
    </div>
  )
}

// export async function generateStaticParams() {
//   const codes = (process.env.NEXT_PUBLIC_PREBUILD_CODES || "").split(",").filter(Boolean)
//   return codes.map((code) => ({ code }))
// }
