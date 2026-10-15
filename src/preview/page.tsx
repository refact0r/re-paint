import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function Page({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8 lg:px-10", className)}>{children}</div>
}

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </header>
  )
}

export const people = {
  ines: { name: "Ines Okafor", initials: "IO", role: "Managing editor", email: "ines@halfmoon.press" },
  tomas: { name: "Tomas Lindqvist", initials: "TL", role: "Production", email: "tomas@halfmoon.press" },
  priya: { name: "Priya Raman", initials: "PR", role: "Acquisitions", email: "priya@halfmoon.press" },
  daniel: { name: "Daniel Achterberg", initials: "DA", role: "Design", email: "daniel@halfmoon.press" },
  mei: { name: "Mei Tanaka", initials: "MT", role: "Publicity", email: "mei@halfmoon.press" },
} as const

export type PersonId = keyof typeof people
