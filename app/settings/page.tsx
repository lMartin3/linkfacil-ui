import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Another sample page to demonstrate routing and the navbar.</p>
      </div>
      <Separator />
      <div className="space-y-3">
        <div className="rounded-lg border p-4">
          <div className="mb-2 text-sm font-medium">Account</div>
          <Button size="sm">Update profile</Button>
        </div>
        <div className="rounded-lg border p-4">
          <div className="mb-2 text-sm font-medium">Notifications</div>
          <Button size="sm" variant="outline">Manage</Button>
        </div>
      </div>
    </div>
  )
}
