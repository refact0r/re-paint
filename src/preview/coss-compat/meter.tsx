import type * as React from "react"

import { Meter as CossMeter, MeterIndicator, MeterTrack } from "../coss-ui/meter"

export * from "../coss-ui/meter"

// coss replaces the track with its children; re-paint's Meter takes Progress's shape (label and value,
// then the track) and an `ink` for the fill.
export function Meter({ ink, children, style, ...props }: React.ComponentProps<typeof CossMeter> & { ink?: string }) {
  return (
    <CossMeter style={ink ? { ...style, ["--primary" as string]: ink } : style} {...props}>
      {children && <div className="flex items-center justify-between gap-2">{children}</div>}
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </CossMeter>
  )
}
