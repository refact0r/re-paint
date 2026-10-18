import * as React from "react"
import { cn } from "cn"
import { CheckIcon, XIcon } from "lucide-react"

// An ordered record of steps: what an agent did, how an order went, where a title is in production.
// Each step is marked done (a checked primary tile), failed (a destructive tile with a cross) or
// pending (a hatched box, still to come). A dotted rule joins the marks.
function Steps({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="steps"
      className={cn("flex flex-col text-sm leading-snug", className)}
      {...props}
    />
  )
}

function Step({
  className,
  status = "done",
  children,
  ...props
}: React.ComponentProps<"li"> & {
  status?: "done" | "pending" | "failed"
}) {
  return (
    <li
      data-slot="step"
      data-status={status}
      className={cn(
        "group/step relative flex gap-2.5 pb-3 last:pb-0 not-last:before:absolute not-last:before:top-5.5 not-last:before:bottom-1 not-last:before:left-[calc(--spacing(2)-0.5px)] not-last:before:w-px not-last:before:bg-dotted-y",
        className
      )}
      {...props}
    >
      <span
        data-slot="step-mark"
        aria-hidden="true"
        className="mt-px flex size-4 shrink-0 items-center justify-center rounded-sm border group-data-[status=done]/step:border-primary-border group-data-[status=done]/step:bg-primary group-data-[status=done]/step:text-primary-foreground group-data-[status=failed]/step:border-destructive group-data-[status=failed]/step:bg-destructive/10 group-data-[status=failed]/step:text-destructive group-data-[status=pending]/step:border-border group-data-[status=pending]/step:bg-hatch [&_svg]:size-3"
      >
        {status === "done" && <CheckIcon />}
        {status === "failed" && <XIcon />}
      </span>
      <div data-slot="step-content" className="flex min-w-0 flex-col gap-0.5">
        {children}
      </div>
    </li>
  )
}

function StepTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="step-title"
      className={cn("group-data-[status=pending]/step:text-muted-foreground", className)}
      {...props}
    />
  )
}

function StepDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="step-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Steps, Step, StepTitle, StepDescription }
