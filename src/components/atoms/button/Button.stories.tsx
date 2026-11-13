import type { Meta, StoryObj } from "@storybook/react-vite"
import { Ship, Wrench } from "lucide-react"
import Button from "./Button"

const meta = {
    title: "Atoms/Button",
    component: Button,
    args: { children: "Launch airship" },
    argTypes: {
        variant: { control: "select", options: ["primary", "secondary", "accent", "ghost", "link", "destructive"] },
        size: { control: "select", options: ["default", "sm", "lg", "icon", "icon-sm"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Starts an action. Primary is brass with a machined bevel and appears at most once per view; secondary for the alternatives; ghost and link for actions that read as text; destructive only for something that cannot be undone. Label: verb first, sentence case."
            }
        }
    }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: { variant: "primary", children: (<><Ship />Launch airship</>) }
}

export const Variants: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Launch airship</Button>
            <Button variant="secondary">Inspect</Button>
            <Button variant="accent">Add a boiler</Button>
            <Button variant="ghost">View in Observatory</Button>
            <Button variant="link">Open the ledger</Button>
            <Button variant="destructive">Demolish</Button>
        </div>
    )
}

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <Button size="lg">Found the city</Button>
            <Button>Launch airship</Button>
            <Button size="sm">Repair</Button>
            <Button size="icon" variant="secondary" aria-label="Repair">
                <Wrench />
            </Button>
            <Button size="icon-sm" variant="secondary" aria-label="Repair">
                <Wrench />
            </Button>
        </div>
    )
}

export const Disabled: Story = {
    args: { disabled: true, children: "Launching…" }
}
