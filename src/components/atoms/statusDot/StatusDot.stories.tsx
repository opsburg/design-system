import type { Meta, StoryObj } from "@storybook/react-vite"
import { StatusDot } from "./StatusDot"

const meta = {
    title: "Atoms/StatusDot",
    component: StatusDot,
    args: { tone: "success", size: "default", pulse: false },
    argTypes: {
        tone: { control: "select", options: ["primary", "accent", "success", "warning", "info", "destructive", "muted"] },
        size: { control: "select", options: ["sm", "default", "lg"] }
    },
    render: (args) => (
        <span className="inline-flex items-center gap-2 text-sm">
            <StatusDot {...args} />
            Boiler House 3 · compute node running
        </span>
    ),
    parameters: {
        docs: {
            description: {
                component:
                    "The light of a status, for dense places where a full badge is too much: a table cell, a map pin, a sidebar entry. It is hidden from screen readers, so always say the status in text next to it, visible or `sr-only`."
            }
        }
    }
} satisfies Meta<typeof StatusDot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tones: Story = {
    render: () => (
        <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
                <StatusDot tone="success" />
                Own engine · running
            </li>
            <li className="flex items-center gap-2">
                <StatusDot tone="info" />
                Reserve line · failover ready
            </li>
            <li className="flex items-center gap-2">
                <StatusDot tone="warning" />
                High pressure · load above 80%
            </li>
            <li className="flex items-center gap-2">
                <StatusDot tone="destructive" />
                Foreign power plant · outage
            </li>
            <li className="flex items-center gap-2">
                <StatusDot tone="muted" />
                Mothballed · stopped
            </li>
        </ul>
    )
}

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-2">
                <StatusDot size="sm" />
                Small
            </span>
            <span className="inline-flex items-center gap-2">
                <StatusDot />
                Default
            </span>
            <span className="inline-flex items-center gap-2">
                <StatusDot size="lg" />
                Large
            </span>
        </div>
    )
}

export const Pulse: Story = {
    args: { tone: "info", pulse: true },
    render: (args) => (
        <span className="inline-flex items-center gap-2 text-sm">
            <StatusDot {...args} />
            Airship in flight · deploying
        </span>
    )
}
