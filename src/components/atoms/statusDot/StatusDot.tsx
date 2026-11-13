import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "@/utils/styleUtils"

export const StatusDotVariants = cva("inline-block shrink-0 rounded-full", {
    variants: {
        tone: {
            primary: "bg-primary",
            accent: "bg-accent",
            success: "bg-success",
            warning: "bg-warning",
            info: "bg-info",
            destructive: "bg-destructive",
            muted: "bg-foreground-secondary"
        },
        size: {
            sm: "size-1.5",
            default: "size-2",
            lg: "size-2.5"
        },
        pulse: {
            true: "animate-pulse motion-reduce:animate-none",
            false: ""
        }
    },
    defaultVariants: {
        tone: "primary",
        size: "default",
        pulse: false
    }
})

export interface IStatusDotProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof StatusDotVariants> {}

/**
 * The light of a status, e.g. a running job. It is decorative: the status has to be said in text next to it,
 * visible or `sr-only`. A colour outside the tones goes in `className`.
 */
export const StatusDot: React.FC<IStatusDotProps> = ({ tone, size, pulse, className, ...props }) => (
    <span aria-hidden="true" {...props} className={cn(StatusDotVariants({ tone, size, pulse }), className)} />
)

StatusDot.displayName = "StatusDot"
