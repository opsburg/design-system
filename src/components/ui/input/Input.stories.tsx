import type { Meta, StoryObj } from "@storybook/react-vite"
import { Label } from "../label"
import { Input } from "./input"

const meta = {
    title: "Forms/Input",
    component: Input,
    args: { id: "building-name", placeholder: "Boiler House north", layoutSize: "default", fullWidth: true },
    argTypes: {
        layoutSize: { control: "select", options: ["default", "sm", "lg"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "The bare text input, with no label or validation of its own. Use it when you compose a field by hand (pair it with a Label through htmlFor and id); inside a react-hook-form form prefer TextField, which wires label, help and error for you."
            }
        }
    },
    render: args => (
        <div className="grid max-w-md gap-1">
            <Label htmlFor={args.id}>Building name</Label>
            <Input {...args} />
        </div>
    )
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
    args: { id: "island-name", placeholder: "Ironworks" },
    render: args => (
        <div className="grid max-w-md gap-1">
            <Label htmlFor={args.id}>Island</Label>
            <p id="island-name-description" className="text-sm text-foreground-secondary">
                The island where the Factory will stand. You can move it later, during a quiet tide.
            </p>
            <Input {...args} aria-describedby="island-name-description" />
        </div>
    )
}

export const Disabled: Story = {
    args: { id: "vault-name", defaultValue: "Vault of the harbour", disabled: true },
    render: args => (
        <div className="grid max-w-md gap-1">
            <Label htmlFor={args.id}>Vault name</Label>
            <Input {...args} />
        </div>
    )
}

export const Required: Story = {
    args: { id: "required-building-name", required: true },
    render: args => (
        <div className="grid max-w-md gap-1">
            <Label htmlFor={args.id}>
                Building name
                <span className="ml-1 text-destructive" aria-hidden="true">
                    *
                </span>
                <span className="sr-only"> (required)</span>
            </Label>
            <Input {...args} />
        </div>
    )
}

export const WithError: Story = {
    args: { id: "coal-budget", type: "number", defaultValue: "-40", "aria-invalid": true, className: "border-destructive focus-visible:ring-destructive" },
    render: args => (
        <div className="grid max-w-md gap-1">
            <Label htmlFor={args.id} className="text-destructive">
                Coal budget per day (tonnes)
            </Label>
            <Input {...args} aria-describedby="coal-budget-error" />
            <p id="coal-budget-error" role="alert" className="text-sm font-medium text-destructive">
                The coal budget cannot be negative.
            </p>
        </div>
    )
}

export const Sizes: Story = {
    render: () => (
        <div className="grid max-w-md gap-4">
            <div className="grid gap-1">
                <Label htmlFor="size-sm">Small</Label>
                <Input id="size-sm" layoutSize="sm" placeholder="Boiler House north" />
            </div>
            <div className="grid gap-1">
                <Label htmlFor="size-default">Default</Label>
                <Input id="size-default" placeholder="Boiler House north" />
            </div>
            <div className="grid gap-1">
                <Label htmlFor="size-lg">Large</Label>
                <Input id="size-lg" layoutSize="lg" placeholder="Boiler House north" />
            </div>
        </div>
    )
}
