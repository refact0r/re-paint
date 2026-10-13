import type * as React from "react"

import { Alert as CossAlert } from "../coss-ui/alert"

export * from "../coss-ui/alert"

type CossProps = React.ComponentProps<typeof CossAlert>

// shadcn's "destructive" variant is coss's "error".
export function Alert({ variant, ...props }: Omit<CossProps, "variant"> & { variant?: CossProps["variant"] | "destructive" }) {
  return <CossAlert variant={variant === "destructive" ? "error" : variant} {...props} />
}
