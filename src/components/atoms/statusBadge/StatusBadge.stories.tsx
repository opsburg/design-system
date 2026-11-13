import type { Meta, StoryObj } from "@storybook/react-vite"
import { CloudLightning, Ship } from "lucide-react"
import { StatusBadge } from "./StatusBadge"

const meta = {
    title: "Atoms/StatusBadge",
    component: StatusBadge,
    args: { variant: "success", children: "Running" },
    argTypes: {
        variant: { control: "select", options: ["default", "accent", "destructive", "success", "warning", "info", "outline"] },
        size: { control: "select", options: ["default", "lg"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "The status of a building, a deploy or a provider, led by a dot in the colour of its variant. Use it wherever a status is shown in a list or a header; set `live` while something is in progress. The mapping from your statuses to the variants stays with your domain."
            }
        }
    }
} satisfies Meta<typeof StatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Statuses: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <StatusBadge variant="success">Running on own engine</StatusBadge>
            <StatusBadge variant="info">On reserve line</StatusBadge>
            <StatusBadge variant="warning">High pressure</StatusBadge>
            <StatusBadge variant="destructive">Blackout · provider outage</StatusBadge>
            <StatusBadge variant="outline">Mothballed</StatusBadge>
        </div>
    )
}

export const Live: Story = {
    args: { variant: "info", live: true, children: "Airship in flight · deploying" }
}

export const WithIcon: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <StatusBadge variant="info" icon={<Ship className="size-3.5" />}>
                Airship docked · deployed
            </StatusBadge>
            <StatusBadge variant="warning" icon={<CloudLightning className="size-3.5" />}>
                Storm · incident open
            </StatusBadge>
        </div>
    )
}
