import * as React from "react"
import { cn } from "cn"

// A small square that says where something stands: solid when done, hatched while pending,
// destructive when it failed. `ink` recolors the solid mark, such as a spot ink keyed to a series.
// At this size hatching alone reads as a stray slash, so the pending mark keeps a hairline edge.
function StatusMark({
  className,
  status = "done",
  ink,
  style,
  ...props
}: React.ComponentProps<"span"> & {
  status?: "done" | "pending" | "failed"
  ink?: string
}) {
  return (
    <span
      data-slot="status-mark"
      data-status={status}
      className={cn(
        "inline-block size-2 shrink-0 rounded-full data-[status=done]:bg-(--status-ink,var(--success)) data-[status=failed]:bg-destructive data-[status=pending]:bg-hatch data-[status=pending]:ring-1 data-[status=pending]:ring-border data-[status=pending]:ring-inset",
        className
      )}
      style={ink ? { ...style, ["--status-ink" as string]: ink } : style}
      {...props}
    />
  )
}

export { StatusMark }
