import * as React from "react"
import { cn } from "cn"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// Label and value rows: specs, a price breakdown, record fields. Rows are items inside one surface,
// so the lines between them are dotted; add `border-y` where the list ends a region.
function DescriptionList({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="description-list"
      className={cn("flex flex-col divide-y divide-dotted text-sm", className)}
      {...props}
    />
  )
}

function DescriptionListItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="description-list-item"
      className={cn("flex items-baseline justify-between gap-4 py-1.5", className)}
      {...props}
    />
  )
}

function DescriptionListTerm({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-list-term"
      className={cn("shrink-0 text-muted-foreground", className)}
      {...props}
    />
  )
}

// `tooltip` explains the value on hover: where it came from, how it was worked out.
function DescriptionListDetails({
  className,
  children,
  tooltip,
  ...props
}: React.ComponentProps<"dd"> & {
  tooltip?: React.ReactNode
}) {
  return (
    <dd
      data-slot="description-list-details"
      className={cn("min-w-0 text-right font-medium tabular-nums", className)}
      {...props}
    >
      {tooltip ? (
        <Tooltip>
          <TooltipTrigger render={<span />}>{children}</TooltipTrigger>
          <TooltipContent side="left">{tooltip}</TooltipContent>
        </Tooltip>
      ) : (
        children
      )}
    </dd>
  )
}

export { DescriptionList, DescriptionListItem, DescriptionListTerm, DescriptionListDetails }
