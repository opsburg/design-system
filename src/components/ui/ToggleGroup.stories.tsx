import type { Meta, StoryObj } from "@storybook/react-vite"
import { Database, Factory, Flame, LayoutGrid, List, Map as MapIcon } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

const meta = {
    title: "Components/ToggleGroup",
    component: ToggleGroup,
    args: { type: "single", defaultValue: "map", variant: "outline", size: "default", "aria-label": "City view" },
    argTypes: {
        variant: { control: "select", options: ["default", "outline"] },
        size: { control: "select", options: ["default", "sm", "lg"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    'A row of toggles that work together. With `type="single"` it picks one view out of a few, like a segmented control; with `type="multiple"` it turns filters on and off. Give the group an `aria-label` that says what it controls.'
            }
        }
    },
    render: args => (
        <ToggleGroup {...args}>
            <ToggleGroupItem value="map">Map</ToggleGroupItem>
            <ToggleGroupItem value="ledger">Ledger</ToggleGroupItem>
            <ToggleGroupItem value="logs">Logs</ToggleGroupItem>
        </ToggleGroup>
    )
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {}

export const Multiple: Story = {
    args: { type: "multiple", defaultValue: ["boiler-houses", "factories"], "aria-label": "Buildings shown on the map" },
    render: args => (
        <ToggleGroup {...args}>
            <ToggleGroupItem value="boiler-houses">
                <Flame className="mr-2 size-4" aria-hidden="true" />
                Boiler Houses
            </ToggleGroupItem>
            <ToggleGroupItem value="factories">
                <Factory className="mr-2 size-4" aria-hidden="true" />
                Factories
            </ToggleGroupItem>
            <ToggleGroupItem value="vaults">
                <Database className="mr-2 size-4" aria-hidden="true" />
                Vaults
            </ToggleGroupItem>
        </ToggleGroup>
    )
}

export const IconOnly: Story = {
    args: { type: "single", defaultValue: "grid", size: "sm", "aria-label": "Layout of the building list" },
    parameters: {
        docs: { description: { story: "Every icon-only item needs its own `aria-label`." } }
    },
    render: args => (
        <ToggleGroup {...args}>
            <ToggleGroupItem value="grid" aria-label="Grid">
                <LayoutGrid className="size-4" aria-hidden="true" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List">
                <List className="size-4" aria-hidden="true" />
            </ToggleGroupItem>
            <ToggleGroupItem value="map" aria-label="Map">
                <MapIcon className="size-4" aria-hidden="true" />
            </ToggleGroupItem>
        </ToggleGroup>
    )
}

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col items-start gap-4">
            {(["sm", "default", "lg"] as const).map(size => (
                <ToggleGroup key={size} {...args} size={size} aria-label={`City view, ${size}`}>
                    <ToggleGroupItem value="map">Map</ToggleGroupItem>
                    <ToggleGroupItem value="ledger">Ledger</ToggleGroupItem>
                    <ToggleGroupItem value="logs">Logs</ToggleGroupItem>
                </ToggleGroup>
            ))}
        </div>
    )
}

export const Disabled: Story = {
    args: { disabled: true }
}
