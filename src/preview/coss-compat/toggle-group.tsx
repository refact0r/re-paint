import type * as React from "react"

import { ToggleGroup as CossToggleGroup } from "../coss-ui/toggle-group"

export * from "../coss-ui/toggle-group"

// coss joins the items of an outline group itself, so shadcn's spacing prop has nothing to do.
export function ToggleGroup({
  spacing: _spacing,
  ...props
}: React.ComponentProps<typeof CossToggleGroup> & { spacing?: number }) {
  return <CossToggleGroup {...props} />
}
