"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ButtonLink } from "@/components/ui/button-link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

const publicLinks = [
  { href: "/", label: "Home" },
]

const authedLinks = [
  { href: "/pages", label: "My Pages" },
  { href: "/pages/new", label: "New Page" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signout } = useAuth()

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
              <Button variant="ghost" className="px-3" onClick={() => { signout(); router.push('/') }}>Logout</Button>
            </>
          ) : (
            <>
              <ButtonLink href="/auth/signin" variant={pathname === '/auth/signin' ? 'secondary' : 'ghost'} className={cn("px-3")}>Login</ButtonLink>
              <ButtonLink href="/auth/signup" variant={pathname === '/auth/signup' ? 'secondary' : 'ghost'} className={cn("px-3")}>Sign up</ButtonLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
