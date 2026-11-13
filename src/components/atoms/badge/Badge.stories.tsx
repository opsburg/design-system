import type { Meta, StoryObj } from "@storybook/react-vite"
import Badge from "./Badge"

const meta = {
    title: "Atoms/Badge",
    component: Badge,
    args: { children: "Boiler House 3 · compute node" },
    argTypes: {
        variant: { control: "select", options: ["default", "accent", "destructive", "success", "warning", "info", "outline"] },
        size: { control: "select", options: ["default", "lg"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A short, static label on a building, a row or a card: a kind, a tag, a count. It is not interactive. When the label is a status, use StatusBadge, which leads with a dot; the word always carries the meaning, the colour only backs it up."
            }
        }
    }
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <Badge>Factory · service</Badge>
            <Badge variant="accent">Automaton · AI agent</Badge>
            <Badge variant="success">Own engine</Badge>
            <Badge variant="warning">High pressure</Badge>
            <Badge variant="info">Reserve line ready</Badge>
            <Badge variant="destructive">Blackout</Badge>
            <Badge variant="outline">Vault · database</Badge>
        </div>
    )
}

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <Badge>3 airships today</Badge>
            <Badge size="lg">3 airships today</Badge>
        </div>
    )
}
