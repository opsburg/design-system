import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bot, CloudOff, Database, Factory, Flame, Plug, Server } from "lucide-react"
import IconTile from "./IconTile"

const meta = {
    title: "Atoms/IconTile",
    component: IconTile,
    args: { icon: <Factory />, tone: "primary", shape: "circle", size: "md" },
    argTypes: {
        icon: { control: false },
        tone: { control: "select", options: ["primary", "accent", "destructive", "success", "warning", "info", "muted"] },
        shape: { control: "select", options: ["circle", "square"] },
        size: { control: "select", options: ["sm", "md", "lg", "xl"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "An icon in a coloured tile that marks the kind of a building in a card, a list row or an empty state. Without `aria-label` it is decoration and hidden, so the kind must be in the text next to it; pass `aria-label` only when the tile stands alone and carries meaning."
            }
        }
    }
} satisfies Meta<typeof IconTile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tones: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <IconTile tone="primary" icon={<Factory />} aria-label="Factory · service" />
            <IconTile tone="accent" icon={<Bot />} aria-label="Automaton · AI agent" />
            <IconTile tone="success" icon={<Plug />} aria-label="Own engine · infrastructure you control" />
            <IconTile tone="warning" icon={<Flame />} aria-label="High pressure · load" />
            <IconTile tone="info" icon={<Server />} aria-label="Boiler House · compute node" />
            <IconTile tone="destructive" icon={<CloudOff />} aria-label="Blackout · provider outage" />
            <IconTile tone="muted" icon={<Database />} aria-label="Vault · database, mothballed" />
        </div>
    )
}

export const SizesAndShapes: Story = {
    render: () => (
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <IconTile size="sm" icon={<Database />} />
                <IconTile size="md" icon={<Database />} />
                <IconTile size="lg" icon={<Database />} />
                <IconTile size="xl" icon={<Database />} />
            </div>
            <div className="flex items-center gap-3">
                <IconTile shape="square" size="sm" icon={<Database />} />
                <IconTile shape="square" size="md" icon={<Database />} />
                <IconTile shape="square" size="lg" icon={<Database />} />
                <IconTile shape="square" size="xl" icon={<Database />} />
            </div>
        </div>
    )
}

export const WithText: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <IconTile shape="square" tone="info" icon={<Server />} />
            <div>
                <p className="font-medium">Boiler House 3</p>
                <p className="text-sm text-foreground-secondary">Compute node · 8 cores</p>
            </div>
        </div>
    )
}
