import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">Simple sample page using shadcn/ui primitives.</p>
      </div>
      <Separator />
      <div className="flex items-center gap-2">
        <Button>Refresh</Button>
        <Button variant="outline">Export</Button>
      </div>
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        Chart/table content goes here.
      </div>
    </div>
  )
}
