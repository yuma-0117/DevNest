import * as React from "react"

import { cn } from "@/lib/utils"

const Item = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center space-x-4 rounded-md border p-4",
      className
    )}
    {...props}
  />
)
Item.displayName = "Item"

const ItemMedia = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
)
ItemMedia.displayName = "ItemMedia"

const ItemContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex-1 space-y-1", className)} {...props} />
)
ItemContent.displayName = "ItemContent"

const ItemTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-sm font-medium leading-none", className)} {...props} />
)
ItemTitle.displayName = "ItemTitle"

const ItemDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
)
ItemDescription.displayName = "ItemDescription"

const ItemGroup = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-2", className)} {...props} />
)
ItemGroup.displayName = "ItemGroup"

export { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemGroup }
