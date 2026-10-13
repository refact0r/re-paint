import type * as React from "react"

import { cn } from "@/lib/utils"

import { Avatar as CossAvatar } from "../coss-ui/avatar"

export * from "../coss-ui/avatar"
export { AvatarBadge, AvatarGroup, AvatarGroupCount } from "../stock-ui/avatar"

// coss sizes avatars with a class; shadcn has a size prop.
export function Avatar({
  size = "default",
  className,
  ...props
}: React.ComponentProps<typeof CossAvatar> & { size?: "default" | "sm" | "lg" }) {
  return (
    <CossAvatar
      data-size={size}
      className={cn("group/avatar", size === "sm" && "size-6", size === "lg" && "size-10", className)}
      {...props}
    />
  )
}
