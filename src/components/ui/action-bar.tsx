"use client"

import * as React from "react"
import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"
import { cn } from "cn"

import { Button } from "@/components/ui/button"

// A floating toolbar for what is selected: a count, then actions on the selection. Position it where
// it should float (`fixed bottom-6 left-1/2 -translate-x-1/2`, say) and render it only while there is
// a selection; it rises in as it mounts.
function ActionBar({ className, ...props }: ToolbarPrimitive.Root.Props) {
  return (
    <ToolbarPrimitive.Root
      data-slot="action-bar"
      className={cn(
        "z-40 flex w-fit items-center gap-1 dot-shadow bg-popover p-1 text-sm text-popover-foreground ring-1 ring-border transition-[opacity,translate] duration-150 starting:translate-y-2 starting:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function ActionBarLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="action-bar-label"
      className={cn("px-2 whitespace-nowrap text-muted-foreground tabular-nums", className)}
      {...props}
    />
  )
}

function ActionBarButton({
  variant = "ghost",
  size = "sm",
  ...props
}: ToolbarPrimitive.Button.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <ToolbarPrimitive.Button
      data-slot="action-bar-button"
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

function ActionBarSeparator({ className, ...props }: ToolbarPrimitive.Separator.Props) {
  return (
    <ToolbarPrimitive.Separator
      data-slot="action-bar-separator"
      className={cn("mx-1 h-4 w-px shrink-0 bg-dotted-y", className)}
      {...props}
    />
  )
}

export { ActionBar, ActionBarLabel, ActionBarButton, ActionBarSeparator }
