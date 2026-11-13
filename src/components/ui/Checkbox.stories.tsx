import type { Meta, StoryObj } from "@storybook/react-vite"
import { Checkbox } from "./checkbox"
import { Label } from "./label"

const meta = {
    title: "Forms/Checkbox",
    component: Checkbox,
    args: { id: "keep-reserve-line", defaultChecked: false },
    parameters: {
        docs: {
            description: {
                component:
                    "A yes or no choice that takes effect when the form is saved, or one of several independent options in a list. For a setting that applies at once, use Switch. Always put a Label next to it, tied through htmlFor and id."
            }
        }
    },
    render: args => (
        <div className="flex items-center gap-2">
            <Checkbox {...args} />
            <Label htmlFor={args.id}>Keep a reserve line to a second provider</Label>
        </div>
    )
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
    args: { id: "checked-reserve-line", defaultChecked: true }
}

export const WithDescription: Story = {
    args: { id: "automatons-repair" },
    render: args => (
        <div className="flex items-start gap-2">
            <Checkbox {...args} aria-describedby="automatons-repair-description" className="mt-0.5" />
            <div className="grid gap-1">
                <Label htmlFor={args.id}>Let the automatons repair Factories</Label>
                <p id="automatons-repair-description" className="text-sm text-foreground-secondary">
                    During a storm they restart a failed service without waiting for a person.
                </p>
            </div>
        </div>
    )
}

export const Disabled: Story = {
    args: { id: "disabled-reserve-line", disabled: true, defaultChecked: true },
    render: args => (
        <div className="flex items-center gap-2">
            <Checkbox {...args} />
            <Label htmlFor={args.id}>Keep a reserve line (set by the city charter)</Label>
        </div>
    )
}

export const Required: Story = {
    args: { id: "accept-charter", required: true },
    render: args => (
        <div className="flex items-center gap-2">
            <Checkbox {...args} />
            <Label htmlFor={args.id}>
                I understand that demolishing the Vault deletes its data
                <span className="ml-1 text-destructive" aria-hidden="true">
                    *
                </span>
                <span className="sr-only"> (required)</span>
            </Label>
        </div>
    )
}

export const WithError: Story = {
    args: { id: "error-charter", "aria-invalid": true, className: "border-destructive" },
    render: args => (
        <div className="grid gap-1">
            <div className="flex items-center gap-2">
                <Checkbox {...args} aria-describedby="error-charter-message" />
                <Label htmlFor={args.id} className="text-destructive">
                    I understand that demolishing the Vault deletes its data
                </Label>
            </div>
            <p id="error-charter-message" role="alert" className="text-sm font-medium text-destructive">
                Confirm before the Vault comes down.
            </p>
        </div>
    )
}
