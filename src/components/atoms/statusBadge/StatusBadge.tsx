import type * as React from "react"
import { Badge, type IBadgeProps } from "@/components/atoms/badge"
import { type IStatusDotProps, StatusDot } from "@/components/atoms/statusDot"

type BadgeVariant = NonNullable<IBadgeProps["variant"]>

const DOT_TONE: Record<BadgeVariant, NonNullable<IStatusDotProps["tone"]>> = {
    default: "primary",
    accent: "accent",
    success: "success",
    warning: "warning",
    info: "info",
    destructive: "destructive",
    outline: "muted"
}

export interface IStatusBadgeProps extends IBadgeProps {
    /** In place of the dot, e.g. a glyph per status when several share a variant */
    icon?: React.ReactNode
    /** Something is going on, e.g. a running build: the dot pulses */
    live?: boolean
}

/**
 * A badge for a status, led by a dot in the colour of its variant. The mapping from the statuses of a domain
 * to the variants stays with the domain: `<StatusBadge variant={VARIANT_BY_STATUS[status]}>`.
 */
export const StatusBadge: React.FC<IStatusBadgeProps> = ({ variant, icon, live, children, ...props }) => (
    <Badge variant={variant} {...props}>
        {icon ?? <StatusDot tone={DOT_TONE[variant ?? "default"]} pulse={live} />}
        <span>{children}</span>
    </Badge>
)

StatusBadge.displayName = "StatusBadge"
