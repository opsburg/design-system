import type { Meta, StoryObj } from "@storybook/react-vite"
import { Factory, Plus } from "lucide-react"
import { fn } from "storybook/test"
import AddTile from "./AddTile"

const meta = {
    title: "Patterns/AddTile",
    component: AddTile,
    args: {
        onClick: fn(),
        label: "Build a Factory",
        description: "Add a service to this district",
        icon: <Plus />,
        aspect: "auto"
    },
    argTypes: {
        aspect: { control: "inline-radio", options: ["auto", "square"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "The dashed tile at the end of a grid that starts creating a new item. Use `auto` next to a column of cards and `square` in a grid of square tiles. The label is a verb first, sentence case."
            }
        }
    },
    render: args => (
        <div className="max-w-xs">
            <AddTile {...args} />
        </div>
    )
} satisfies Meta<typeof AddTile>

export default meta
type Story = StoryObj<typeof meta>

export const Auto: Story = {}

export const Square: Story = {
    args: { aspect: "square", label: "Found a city", description: undefined },
    render: args => (
        <div className="w-44">
            <AddTile {...args} />
        </div>
    )
}

export const WithoutIcon: Story = {
    args: { icon: undefined, label: "Add a Boiler House", description: "Register a compute node you control" }
}

export const Disabled: Story = {
    args: { disabled: true, icon: <Factory />, label: "Build a Factory", description: "The district is at full pressure" }
}
