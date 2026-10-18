import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

// A removable token: an applied filter, a lens, a tag. Unlike a badge it can hold a leading mark
// (a StatusMark or an icon), an inline control such as a small slider, and a remove button.
const chipVariants = cva(
  "group/chip inline-flex h-8 w-fit max-w-full shrink-0 items-center gap-2 rounded-full border pl-2.5 text-sm whitespace-nowrap transition-colors has-data-[slot=chip-remove]:pr-1 not-has-data-[slot=chip-remove]:pr-2.5 [&>svg]:pointer-events-none [&>svg:not([class*='size-'])]:size-3.5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        secondary: "border-border bg-secondary text-secondary-foreground",
        destructive: "border-destructive bg-destructive/10 text-destructive dark:bg-destructive/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Chip({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof chipVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(chipVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "chip",
      variant,
    },
  })
}

function ChipLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="chip-label"
      className={cn("min-w-0 truncate font-medium", className)}
      {...props}
    />
  )
}

// Sizes an inline control such as a Slider, which would otherwise take the chip's full width.
function ChipControl({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chip-control"
      className={cn("flex w-20 shrink-0 items-center", className)}
      {...props}
    />
  )
}

function ChipRemove({
  className,
  children,
  "aria-label": ariaLabel = "Remove",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="chip-remove"
      variant="ghost"
      size="icon-xs"
      aria-label={ariaLabel}
      className={cn("text-current", className)}
      {...props}
    >
      {children ?? <XIcon />}
    </Button>
  )
}

export { Chip, ChipLabel, ChipControl, ChipRemove, chipVariants }
