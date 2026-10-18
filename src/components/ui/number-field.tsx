"use client"

import * as React from "react"
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { MinusIcon, PlusIcon } from "lucide-react"

// A number input that parses, steps and formats its value: a price, a quantity, a rate.
// Put a currency sign or unit in a NumberFieldAddon, and pass `format` for decimals.
function NumberField({ className, ...props }: NumberFieldPrimitive.Root.Props) {
  return (
    <NumberFieldPrimitive.Root
      data-slot="number-field"
      className={cn("w-full", className)}
      {...props}
    />
  )
}

function NumberFieldGroup({ className, ...props }: NumberFieldPrimitive.Group.Props) {
  return (
    <NumberFieldPrimitive.Group
      data-slot="number-field-group"
      className={cn(
        "relative flex h-8 w-full min-w-0 items-center overflow-hidden rounded-lg border border-input bg-background transition-colors has-[[data-slot=number-field-input]:focus-visible]:border-ring has-[[data-slot=number-field-input]:focus-visible]:ring-1 has-[[data-slot=number-field-input]:focus-visible]:ring-ring has-aria-invalid:border-destructive has-aria-invalid:ring-1 has-aria-invalid:ring-destructive data-disabled:bg-muted data-disabled:opacity-50 has-[>[data-align=inline-start]]:[&>input]:pl-1 has-[>[data-align=inline-end]]:[&>input]:pr-1",
        className
      )}
      {...props}
    />
  )
}

function NumberFieldInput({ className, ...props }: NumberFieldPrimitive.Input.Props) {
  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent px-2.5 text-base tabular-nums outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed md:text-sm",
        className
      )}
      {...props}
    />
  )
}

// A prefix or suffix inside the field: a currency sign, a code, a unit.
const numberFieldAddonVariants = cva(
  "flex h-full shrink-0 cursor-text items-center gap-2 text-sm text-muted-foreground select-none [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-2.5",
        "inline-end": "order-last pr-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function NumberFieldAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof numberFieldAddonVariants>) {
  return (
    <span
      data-slot="number-field-addon"
      data-align={align}
      className={cn(numberFieldAddonVariants({ align }), className)}
      onClick={(event) => event.currentTarget.parentElement?.querySelector("input")?.focus()}
      {...props}
    />
  )
}

// Steppers sit at either end of the group; the joint between a stepper and the input is solid.
const stepperClassName =
  "flex h-full w-8 shrink-0 items-center justify-center text-muted-foreground transition-colors outline-none select-none first:border-e not-first:border-s hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-3.5"

function NumberFieldDecrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Decrement.Props) {
  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      className={cn(stepperClassName, className)}
      {...props}
    >
      {children ?? <MinusIcon />}
    </NumberFieldPrimitive.Decrement>
  )
}

function NumberFieldIncrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Increment.Props) {
  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      className={cn(stepperClassName, className)}
      {...props}
    >
      {children ?? <PlusIcon />}
    </NumberFieldPrimitive.Increment>
  )
}

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldAddon,
  NumberFieldDecrement,
  NumberFieldIncrement,
}
