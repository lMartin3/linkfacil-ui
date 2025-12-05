import {redirect} from "next/navigation"
import Link from "next/link"
import {verifyAction} from "@/lib/server/actions/auth"

export const dynamic = "force-dynamic"

export default async function VerifyPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    console.log("searchParams:", searchParams)

    const token = (await searchParams)["token"]  || ""

    if (!token) {
        return (
            <div className="mx-auto max-w-md space-y-4">
                <h1 className="text-2xl font-semibold tracking-tight">Verification</h1>
                <p className="text-sm text-muted-foreground">Missing verification token.</p>
                <div className="text-sm">
                    Go back to <Link className="underline" href="/auth/signin">login</Link>.
                </div>
            </div>
        )
    }

    const result = await verifyAction(token)

    if (result.ok) {
        redirect("/auth/signin?verified=1")
    }

    return (
        <div className="mx-auto max-w-md space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">Verification failed</h1>
            <p className="text-sm text-destructive">{result.message || "We could not verify your email with the provided token."}</p>
            <div className="text-sm">
                Try again from the link in your email or go back to <Link className="underline"
                                                                          href="/auth/signin">login</Link>.
            </div>
        </div>
    )
}
