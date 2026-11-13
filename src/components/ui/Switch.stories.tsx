import type { Meta, StoryObj } from "@storybook/react-vite"
import { Label } from "./label"
import { Switch } from "./switch"

const meta = {
    title: "Forms/Switch",
    component: Switch,
    args: { id: "reserve-line", defaultChecked: false },
    parameters: {
        docs: {
            description: {
                component:
                    "Turns a setting on or off with immediate effect, like a lever in the engine room. For a choice that waits for a save button, use Checkbox. Always put a Label next to it, tied through htmlFor and id."
            }
        }
    },
    render: args => (
        <div className="flex items-center gap-3">
            <Switch {...args} />
            <Label htmlFor={args.id}>Reserve line</Label>
        </div>
    )
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const On: Story = {
    args: { id: "reserve-line-on", defaultChecked: true }
}

export const WithDescription: Story = {
    args: { id: "auto-failover" },
    render: args => (
        <div className="flex items-start justify-between gap-4 max-w-md">
            <div className="grid gap-1">
                <Label htmlFor={args.id}>Automatic failover</Label>
                <p id="auto-failover-description" className="text-sm text-foreground-secondary">
                    When the foreign power plant goes dark, the city switches to its own engine on its own.
                </p>
            </div>
            <Switch {...args} aria-describedby="auto-failover-description" />
        </div>
    )
}

export const Disabled: Story = {
    args: { id: "disabled-switch", disabled: true, defaultChecked: true },
    render: args => (
        <div className="flex items-center gap-3">
            <Switch {...args} />
            <Label htmlFor={args.id}>Night shift for the automatons</Label>
        </div>
    )
}

export const Required: Story = {
    args: { id: "required-switch", required: true },
    render: args => (
        <div className="flex items-center gap-3">
            <Switch {...args} />
            <Label htmlFor={args.id}>
                Pressure alarm
                <span className="ml-1 text-destructive" aria-hidden="true">
                    *
                </span>
                <span className="sr-only"> (required)</span>
            </Label>
        </div>
    )
}

export const WithError: Story = {
    args: { id: "error-switch", "aria-invalid": true, className: "border-destructive focus-visible:ring-destructive" },
    render: args => (
        <div className="grid gap-1">
            <div className="flex items-center gap-3">
                <Switch {...args} aria-describedby="error-switch-message" />
                <Label htmlFor={args.id} className="text-destructive">
                    Automatic failover
                </Label>
            </div>
            <p id="error-switch-message" role="alert" className="text-sm font-medium text-destructive">
                Add a reserve provider before you turn on failover.
            </p>
        </div>
    )
}
