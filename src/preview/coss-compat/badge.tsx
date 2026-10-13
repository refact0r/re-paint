import type * as React from "react"

import { Badge as CossBadge } from "../coss-ui/badge"

export * from "../coss-ui/badge"

type CossProps = React.ComponentProps<typeof CossBadge>

// coss has no "ghost" badge; outline is the closest.
export function Badge({ variant, ...props }: Omit<CossProps, "variant"> & { variant?: CossProps["variant"] | "ghost" }) {
  return <CossBadge variant={variant === "ghost" ? "outline" : variant} {...props} />
}
