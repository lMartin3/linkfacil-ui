import * as React from "react"

import { cn } from "@/lib/utils"

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      data-orientation={orientation}
      role="none"
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
