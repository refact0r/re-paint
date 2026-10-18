"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Button } from "@/components/ui/button"

// A large single-line prompt: ask, filter or command in plain words. It is outlined with a ring rather
// than a border, so it can take `dot-shadow` where it floats. Renders a form, so Enter submits.
function PromptInput({ className, render, ...props }: useRender.ComponentProps<"form">) {
  return useRender({
    defaultTagName: "form",
    props: mergeProps<"form">(
      {
        className: cn(
          "group/prompt-input flex h-12 w-full min-w-0 items-center gap-3 bg-popover px-4 text-popover-foreground ring-1 ring-border transition-shadow has-[[data-slot=prompt-input-control]:focus-visible]:ring-ring has-[[data-slot=prompt-input-control]:disabled]:opacity-50",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "prompt-input",
    },
  })
}

function PromptInputInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      data-slot="prompt-input-control"
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

// Holds a leading icon or spinner, or a trailing Kbd hint or button.
const promptInputAddonVariants = cva(
  "flex shrink-0 items-center gap-2 text-muted-foreground [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first",
        "inline-end": "order-last",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function PromptInputAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof promptInputAddonVariants>) {
  return (
    <div
      data-slot="prompt-input-addon"
      data-align={align}
      className={cn(promptInputAddonVariants({ align }), className)}
      {...props}
    />
  )
}

// The row of ready-made prompts under the input.
function PromptInputSuggestions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prompt-input-suggestions"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    />
  )
}

function PromptInputSuggestion({
  className,
  variant = "outline",
  size = "sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="prompt-input-suggestion"
      variant={variant}
      size={size}
      className={cn("font-normal", className)}
      {...props}
    />
  )
}

export {
  PromptInput,
  PromptInputInput,
  PromptInputAddon,
  PromptInputSuggestions,
  PromptInputSuggestion,
}
