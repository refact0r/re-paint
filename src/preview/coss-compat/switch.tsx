import type * as React from "react"

import { cn } from "@/lib/utils"

import { Switch as CossSwitch } from "../coss-ui/switch"

export * from "../coss-ui/switch"

// coss sizes the switch through --thumb-size; shadcn has a size prop.
export function Switch({
  size = "default",
  className,
  ...props
}: React.ComponentProps<typeof CossSwitch> & { size?: "default" | "sm" }) {
  return (
    <CossSwitch
      className={cn(size === "sm" && "[--thumb-size:--spacing(4)] sm:[--thumb-size:--spacing(3)]", className)}
      {...props}
    />
  )
}
