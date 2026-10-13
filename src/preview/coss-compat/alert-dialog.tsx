import type * as React from "react"

import { AlertDialogClose } from "../coss-ui/alert-dialog"
import { Button } from "../coss-ui/button"

export * from "../coss-ui/alert-dialog"

export function AlertDialogAction(props: React.ComponentProps<typeof Button>) {
  return <Button data-slot="alert-dialog-action" {...props} />
}

export function AlertDialogCancel({
  variant = "outline",
  size,
  ...props
}: React.ComponentProps<typeof AlertDialogClose> & Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return <AlertDialogClose data-slot="alert-dialog-cancel" render={<Button variant={variant} size={size} />} {...props} />
}
