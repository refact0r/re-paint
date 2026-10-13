import type * as React from "react"

import { MenuCheckboxItem, MenuRadioItem } from "../coss-ui/menu"

export * from "../coss-ui/menu"

// coss puts the children of these two in a plain span, where an icon would sit on its own line; shadcn lays them out in a row.
const row = (children: React.ReactNode) => <span className="flex items-center gap-2">{children}</span>

export function DropdownMenuRadioItem({ children, ...props }: React.ComponentProps<typeof MenuRadioItem>) {
  return <MenuRadioItem {...props}>{row(children)}</MenuRadioItem>
}

export function DropdownMenuCheckboxItem({ children, ...props }: React.ComponentProps<typeof MenuCheckboxItem>) {
  return <MenuCheckboxItem {...props}>{row(children)}</MenuCheckboxItem>
}
