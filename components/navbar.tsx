"use client"

import Link from "next/link"
import {usePathname, useRouter} from "next/navigation"
import {ButtonLink} from "@/components/ui/button-link"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useAuth} from "@/lib/auth-context"
import React, {useEffect, useRef, useState} from "react"

const publicLinks = [
    {href: "/", label: "Home"},
]

const authedLinks = [
    {href: "/pages", label: "My Pages"},
    {href: "/pages/new", label: "New Page"},
]

export function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const {user, signout} = useAuth()

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-3 px-4">
                <Link href="/" className="font-semibold">
                    LinkFacil
                </Link>
                <nav className="ml-auto flex items-center gap-1">
                    {user && publicLinks.map((l) => {
                        const active = pathname === l.href
                        return (
                            <ButtonLink
                                key={l.href}
                                href={l.href}
                                variant={active ? "secondary" : "ghost"}
                                className={cn("px-3")}
                            >
                                {l.label}
                            </ButtonLink>
                        )
                    })}
                    {user ? (
                        <>
                            {authedLinks.map((l) => {
                                const active = pathname === l.href
                                return (
                                    <ButtonLink
                                        key={l.href}
                                        href={l.href}
                                        variant={active ? "secondary" : "ghost"}
                                        className={cn("px-3")}
                                    >
                                        {l.label}
                                    </ButtonLink>
                                )
                            })}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"ghost"}>{user.username}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="start">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuGroup>
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>GitHub</DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem ><Link href={"https://github.com/lMartin3/linkfacil"} target= {"_blank"}>Front-end repo</Link></DropdownMenuItem>
                                                    <DropdownMenuItem ><Link href={"https://github.com/lMartin3/linkfacil-ui"} target={"_blank"}>Back-end repo</Link></DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                        <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={() => {
                                        signout();
                                        router.push('/')
                                    }}>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <ButtonLink href="/auth/signin"
                                        variant={pathname === '/auth/signin' ? 'secondary' : 'ghost'}
                                        className={cn("px-3")}>Login</ButtonLink>
                            <ButtonLink href="/auth/signup"
                                        variant={pathname === '/auth/signup' ? 'secondary' : 'ghost'}
                                        className={cn("px-3")}>Sign up</ButtonLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

function UserMenu({username, onLogout}: { username: string; onLogout: () => void | Promise<void> }) {
    const [open, setOpen] = useState(false)
    const btnRef = useRef<HTMLButtonElement | null>(null)
    const menuRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            const t = e.target as Node
            if (!menuRef.current || !btnRef.current) return
            if (menuRef.current.contains(t) || btnRef.current.contains(t)) return
            setOpen(false)
        }

        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false)
        }

        document.addEventListener('mousedown', onDocClick)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('mousedown', onDocClick)
            document.removeEventListener('keydown', onKey)
        }
    }, [])

    return (
        <div className="relative">
            <button
                ref={btnRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={cn(
                    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium",
                    "hover:bg-accent hover:text-accent-foreground",
                )}
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <span className="whitespace-nowrap">Welcome, {username}</span>
                <svg
                    className={cn("h-4 w-4 transition-transform", open ? "rotate-180" : "rotate-0")}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"/>
                </svg>
            </button>
            {open && (
                <div
                    ref={menuRef}
                    role="menu"
                    aria-label="User menu"
                    className="absolute right-0 mt-2 w-40 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
                >
                    <button
                        role="menuitem"
                        className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                        onClick={async () => {
                            setOpen(false)
                            await onLogout()
                        }}
                    >
                        Log out
                    </button>
                </div>
            )}
        </div>
    )
}
