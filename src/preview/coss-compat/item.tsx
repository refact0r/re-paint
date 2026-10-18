import type * as React from "react"

import { ItemMedia as StockItemMedia } from "../stock-ui/item"

export * from "../stock-ui/item"

// coss has no item, so it uses stock's, whose images always cover; re-paint's ItemMedia also takes `fit`.
export function ItemMedia({ fit: _fit, ...props }: React.ComponentProps<typeof StockItemMedia> & { fit?: "cover" | "contain" }) {
  return <StockItemMedia {...props} />
}
