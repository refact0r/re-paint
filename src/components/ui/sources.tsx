import * as React from "react"
import { cn } from "cn"

// Numbered footnotes under an answer: what it was drawn from. The numbers count themselves, so the
// order of the list is the order of the markers in the text. A dotted rule sets the list off from
// the answer above it, and dotted rules divide the sources.
function Sources({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="sources"
      className={cn(
        "flex flex-col divide-y divide-dotted border-t text-xs leading-snug text-muted-foreground [counter-reset:source] dotted-t",
        className
      )}
      {...props}
    />
  )
}

function Source({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="source"
      className={cn(
        "flex gap-2 py-1.5 [counter-increment:source] before:min-w-3 before:font-mono before:tabular-nums before:content-[counter(source)] [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-2 [&_a:hover]:text-foreground [&_a:hover]:decoration-primary",
        className
      )}
      {...props}
    />
  )
}

export { Sources, Source }
