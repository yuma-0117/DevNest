import * as React from "react"

import { cn } from "@/lib/utils"

const Field = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-2", className)} {...props} />
)
Field.displayName = "Field"

const FieldLabel = ({ className, ...props }: React.HTMLAttributes<HTMLLabelElement>) => (
  <label className={cn("text-sm font-medium leading-none", className)} {...props} />
)
FieldLabel.displayName = "FieldLabel"

const FieldDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-[0.8rem] text-muted-foreground", className)} {...props} />
)
FieldDescription.displayName = "FieldDescription"

const FieldError = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-[0.8rem] font-medium text-destructive", className)} {...props} />
)
FieldError.displayName = "FieldError"

const FieldGroup = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-4 md:grid-cols-2", className)} {...props} />
)
FieldGroup.displayName = "FieldGroup"

const FieldSet = ({ className, ...props }: React.HTMLAttributes<HTMLFieldSetElement>) => (
  <fieldset className={cn("space-y-4", className)} {...props} />
)
FieldSet.displayName = "FieldSet"

const FieldLegend = ({ className, ...props }: React.HTMLAttributes<HTMLLegendElement>) => (
  <legend className={cn("text-lg font-semibold text-foreground", className)} {...props} />
)
FieldLegend.displayName = "FieldLegend"

export { Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldSet, FieldLegend }
