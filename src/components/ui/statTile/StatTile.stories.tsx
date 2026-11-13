import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bot, Coins, Gauge, Server } from "lucide-react"
import Button from "../../atoms/button/Button"
import StatTile from "./StatTile"

const meta = {
    title: "Components/StatTile",
    component: StatTile,
    args: { label: "Pressure · average load", value: "62%", size: "sm" },
    argTypes: {
        icon: { control: false },
        action: { control: false },
        size: { control: "select", options: ["sm", "lg"] },
        labelAs: { control: "select", options: ["p", "h3", "h4"] }
    },
    render: (args) => (
        <div className="max-w-xs">
            <StatTile {...args} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                component:
                    "One number that matters, with its label: the top of a dashboard, the summary of a district. Use them in a grid of a few tiles; put the unit in the value or the label, and add an `action` when the number leads somewhere."
            }
        }
    }
} satisfies Meta<typeof StatTile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { icon: <Gauge /> }
}

export const Grid: Story = {
    render: () => (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Boiler Houses · compute nodes" value="12" icon={<Server />} />
            <StatTile label="Pressure · average load" value="62%" icon={<Gauge />} />
            <StatTile label="Automatons · AI agents at work" value="7" icon={<Bot />} />
            <StatTile
                label="Coal this month · cost"
                value="€4,120"
                icon={<Coins />}
                action={
                    <Button variant="link" size="sm">
                        Open the ledger
                    </Button>
                }
            />
        </div>
    )
}

export const Large: Story = {
    args: {
        size: "lg",
        labelAs: "h3",
        label: "Work on your own engine",
        value: "74%",
        action: (
            <Button variant="link" size="sm">
                See what still runs on foreign power plants
            </Button>
        )
    }
}
