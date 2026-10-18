import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

// A non-modal side panel: details for whatever is picked on the page, while the page stays usable.
// It sits in the layout instead of a portal, so there is no backdrop and no focus trap. The default
// docks it at a side of its container with a solid edge; `floating` lifts it over the content with
// an outline and a dot shadow, positioned by the caller. Render it while there is something to show.
const panelVariants = cva(
  "group/panel flex h-full w-80 shrink-0 flex-col overflow-hidden bg-popover text-sm text-popover-foreground transition-[opacity,translate] duration-200 ease-out starting:opacity-0",
  {
    variants: {
      variant: {
        default:
          "data-[side=left]:border-e data-[side=right]:border-s data-[side=left]:starting:-translate-x-4 data-[side=right]:starting:translate-x-4",
        floating:
          "dot-shadow rounded-xl ring-1 ring-border data-[side=left]:starting:-translate-x-4 data-[side=right]:starting:translate-x-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Panel({
  className,
  variant = "default",
  side = "right",
  ...props
}: React.ComponentProps<"aside"> &
  VariantProps<typeof panelVariants> & {
    side?: "left" | "right"
  }) {
  return (
    <aside
      data-slot="panel"
      data-variant={variant}
      data-side={side}
      className={cn(panelVariants({ variant }), className)}
      {...props}
    />
  )
}

function PanelHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-header"
      className={cn(
        "grid shrink-0 auto-rows-min items-start gap-0.5 border-b p-4 has-data-[slot=panel-close]:grid-cols-[1fr_auto]",
        className
      )}
      {...props}
    />
  )
}

function PanelTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="panel-title"
      className={cn("font-heading text-base font-medium text-foreground", className)}
      {...props}
    />
  )
}

function PanelDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="panel-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function PanelClose({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="panel-close"
      variant="ghost"
      size="icon-sm"
      className={cn("col-start-2 row-span-2 row-start-1 -mt-1 -mr-1 self-start justify-self-end", className)}
      {...props}
    >
      {children ?? (
        <>
          <XIcon />
          <span className="sr-only">Close</span>
        </>
      )}
    </Button>
  )
}

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-content"
      className={cn("min-h-0 flex-1 overflow-y-auto p-4", className)}
      {...props}
    />
  )
}

function PanelFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-footer"
      className={cn("flex shrink-0 items-center gap-2 border-t bg-halftone p-4", className)}
      {...props}
    />
  )
}

export {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelDescription,
  PanelClose,
  PanelContent,
  PanelFooter,
}
