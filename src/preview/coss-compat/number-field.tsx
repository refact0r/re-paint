import type * as React from "react"

import { cn } from "@/lib/utils"

export * from "../coss-ui/number-field"

// coss has no addons; a plain prefix or suffix inside the group.
export function NumberFieldAddon({
  align = "inline-start",
  className,
  ...props
}: React.ComponentProps<"span"> & { align?: "inline-start" | "inline-end" }) {
  return (
    <span
      data-slot="number-field-addon"
      className={cn(
        "flex shrink-0 items-center text-muted-foreground select-none",
        align === "inline-start" ? "order-first ps-3" : "order-last pe-3",
        className
      )}
      {...props}
    />
  )
}
