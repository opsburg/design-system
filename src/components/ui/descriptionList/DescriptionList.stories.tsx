import type { Meta, StoryObj } from "@storybook/react-vite"
import { StatusBadge } from "../../atoms/statusBadge"
import DescriptionItem from "./DescriptionItem"
import DescriptionList from "./DescriptionList"

const meta = {
    title: "Components/DescriptionList",
    component: DescriptionList,
    args: { orientation: "stacked", children: null },
    argTypes: {
        orientation: { control: "inline-radio", options: ["stacked", "inline"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Label and value pairs that describe one thing, such as the details of a building. Use `stacked` in detail panels where values can wrap, `inline` for dense lists inside a card. Each row is a `DescriptionItem`."
            }
        }
    },
    render: args => (
        <DescriptionList {...args} className="max-w-md">
            <DescriptionItem label="Building">Boiler House 3 · compute node</DescriptionItem>
            <DescriptionItem label="District">eu-south-1</DescriptionItem>
            <DescriptionItem label="Status">
                <StatusBadge variant="success">Running</StatusBadge>
            </DescriptionItem>
            <DescriptionItem label="Node ID" monospace>
                node_3a91f0c2-7b4e-4f18-a6d2-91c0e5b7f843
            </DescriptionItem>
            <DescriptionItem label="Power source" hint="Set when the city was founded. Switch to your own engine from the settings.">
                Foreign power plant · US cloud provider
            </DescriptionItem>
        </DescriptionList>
    )
} satisfies Meta<typeof DescriptionList>

export default meta
type Story = StoryObj<typeof meta>

export const Stacked: Story = {}

export const Inline: Story = {
    args: { orientation: "inline" }
}

export const InsideACard: Story = {
    args: { orientation: "inline" },
    render: args => (
        <div className="max-w-sm rounded-lg border-2 border-border bg-card p-4 text-card-foreground">
            <DescriptionList {...args}>
                <DescriptionItem label="Pressure">62% · load</DescriptionItem>
                <DescriptionItem label="Coal">€418 / month · cost</DescriptionItem>
                <DescriptionItem label="Last airship">v2.14.3 · 2026-11-12 18:04</DescriptionItem>
                <DescriptionItem label="Automatons">2 AI agents on shift</DescriptionItem>
            </DescriptionList>
        </div>
    )
}
