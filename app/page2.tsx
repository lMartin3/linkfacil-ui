import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Barebones dashboard home using shadcn/ui.</p>
      </div>
      <Separator />
      <div className="flex items-center gap-2">
        <Button >
          <Link href="/analytics">Go to Analytics</Link>
        </Button>
        <Button variant="outline">
          <Link href="/settings">Open Settings</Link>
        </Button>
      </div>
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        Welcome! Use the navbar above to navigate between pages.
      </div>
    </div>
  );
}
