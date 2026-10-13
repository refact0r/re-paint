import type * as React from "react"

import { TabsList as CossTabsList } from "../coss-ui/tabs"

export * from "../coss-ui/tabs"

// shadcn's "line" variant is coss's "underline".
export function TabsList({
  variant,
  ...props
}: Omit<React.ComponentProps<typeof CossTabsList>, "variant"> & { variant?: "default" | "line" }) {
  return <CossTabsList variant={variant === "line" ? "underline" : "default"} {...props} />
}
