"use client"

import { Meter as MeterPrimitive } from "@base-ui/react/meter"
import { cn } from "cn"

// A measurement on a known scale (a score, a share, a quota), not progress toward done.
// The fill is solid ink and the rest of the scale is a tint of the same ink, where Progress
// hatches what is still to come. `ink` takes any color, such as `var(--spot-2)`.
function Meter({
  className,
  children,
  ink,
  style,
  ...props
}: MeterPrimitive.Root.Props & { ink?: string }) {
  return (
    <MeterPrimitive.Root
      data-slot="meter"
      className={cn("flex flex-wrap gap-3 [--meter-ink:var(--primary)]", className)}
      style={ink ? { ...style, ["--meter-ink" as string]: ink } : style}
      {...props}
    >
      {children}
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </MeterPrimitive.Root>
  )
}

function MeterTrack({ className, ...props }: MeterPrimitive.Track.Props) {
  return (
    <MeterPrimitive.Track
      data-slot="meter-track"
      className={cn(
        "relative block h-1.5 w-full overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--meter-ink)_30%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

function MeterIndicator({ className, ...props }: MeterPrimitive.Indicator.Props) {
  return (
    <MeterPrimitive.Indicator
      data-slot="meter-indicator"
      className={cn("h-full bg-(--meter-ink) transition-all", className)}
      {...props}
    />
  )
}

function MeterLabel({ className, ...props }: MeterPrimitive.Label.Props) {
  return (
    <MeterPrimitive.Label
      data-slot="meter-label"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function MeterValue({ className, ...props }: MeterPrimitive.Value.Props) {
  return (
    <MeterPrimitive.Value
      data-slot="meter-value"
      className={cn("ml-auto text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    />
  )
}

export { Meter, MeterTrack, MeterIndicator, MeterLabel, MeterValue }
