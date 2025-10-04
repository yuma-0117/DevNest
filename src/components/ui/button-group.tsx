import * as React from "react"

import { cn } from "@/lib/utils"

const ButtonGroup = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center gap-2", className)} {...props} />
)
ButtonGroup.displayName = "ButtonGroup"

const ButtonGroupSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("h-6 w-px bg-border", className)} {...props} />
)
ButtonGroupSeparator.displayName = "ButtonGroupSeparator"

const ButtonGroupText = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("text-sm text-muted-foreground", className)} {...props} />
)
ButtonGroupText.displayName = "ButtonGroupText"

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
