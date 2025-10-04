import * as React from "react"

import { cn } from "@/lib/utils"

const Empty = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center py-12 text-center",
      className
    )}
    {...props}
  />
)
Empty.displayName = "Empty"

const EmptyTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn("mt-4 text-xl font-semibold text-foreground", className)}
    {...props}
  />
)
EmptyTitle.displayName = "EmptyTitle"

const EmptyDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("mt-2 text-sm text-muted-foreground", className)}
    {...props}
  />
)
EmptyDescription.displayName = "EmptyDescription"

const EmptyMedia = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
)
EmptyMedia.displayName = "EmptyMedia"

const EmptyContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-4 flex flex-col items-center gap-2", className)}
    {...props}
  />
)
EmptyContent.displayName = "EmptyContent"

export { Empty, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent }
