"use client"

import {RequireAuth} from "@/components/require-auth"
import Link from "next/link"
import {useEffect, useState} from "react"
import {api} from "@/lib/api"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

type PageSummary = {
    id: string
    code: string
    owner: string
    title?: string
    description?: string
    links?: any[]
    createdAt: string
    updatedAt: string
}

export default function MyPages() {
    const [pages, setPages] = useState<PageSummary[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                const res = await fetch("/api/proxy/api/page", {cache: "no-store"})
                if (!res.ok) throw new Error(`Failed to load pages: ${res.status}`)
                const data = (await res.json()) as PageSummary[]
                if (!cancelled) setPages(data)
            } catch (e: any) {
                if (!cancelled) setError(e?.message || "Failed to load pages")
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [])

    async function handleDelete(pageId: string) {
        try {
            await api.deletePage(pageId)
            setPages((prevPages) => prevPages?.filter(p => p.id !== pageId) ?? null)
        } catch (e: any) {
            setError(e?.message || "Failed to delete page")
        }
    }

    return (
        <RequireAuth>
            <div className="mx-auto max-w-xl space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">My Pages</h1>
                    <Link className="text-sm underline" href="/pages/new">New page</Link>
                </div>

                {!pages && !error && (
                    <div className="text-sm text-muted-foreground">Loading pages…</div>
                )}
                {error && (
                    <div className="text-sm text-red-600">{error}</div>
                )}
                {pages && pages.length === 0 && (
                    <div className="text-sm text-muted-foreground">
                        You don&apos;t have any pages yet. Create your first one.
                    </div>
                )}
                {pages && pages.length > 0 && (
                    <ul className="space-y-2">
                        {pages.map((p) => {
                            const title = p.title || p.code
                            return (
                                <li key={p.id} className="rounded-md border p-3 hover:bg-muted/50">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate text-sm font-medium">{title}</div>
                                            {p.description && (
                                                <div
                                                    className="truncate text-xs text-muted-foreground">{p.description}</div>
                                            )}
                                        </div>
                                        <div className="shrink-0 space-x-2 text-xs">
                                            <Link className="underline" href={`/p/${p.code}`} prefetch>
                                                Open
                                            </Link>
                                            <Link className="underline" href={`/pages/${p.id}`} prefetch>
                                                Edit
                                            </Link>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="underline text-red-600 cursor-pointer">
                                                        Delete
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-md">
                                                    <DialogHeader>
                                                        <DialogTitle>Delete {p.title}</DialogTitle>
                                                        <DialogDescription>
                                                            <span>
                                                                You&apos;re about to delete the page &quot;{p.title}&quot;.
                                                            </span>
                                                            <br/>
                                                            <span className={"mt-2 text-sm text-800 font-medium"}>
                                                            This action is permanent and cannot be undone.
                                                            </span>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter className="sm:justify-start">
                                                        <Button type="button" variant="destructive" onClick={()=>handleDelete(p.id)}>
                                                            Delete
                                                        </Button>
                                                        <DialogClose asChild>
                                                            <Button type="button" variant="secondary">
                                                                Close
                                                            </Button>
                                                        </DialogClose>

                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </RequireAuth>
    )
}