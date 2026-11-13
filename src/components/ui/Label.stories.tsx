import type { Meta, StoryObj } from "@storybook/react-vite"
import { Checkbox } from "./checkbox"
import { Input } from "./input/input"
import { Label } from "./label"

const meta = {
    title: "Forms/Label",
    component: Label,
    args: { children: "Building name", htmlFor: "label-building-name", textSize: "default" },
    argTypes: {
        textSize: { control: "select", options: ["default", "sm", "lg"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Names a control. Every input, select, checkbox and switch needs one, tied to the control through htmlFor and id so clicking the label focuses the control and screen readers read it. Sentence case, no colon."
            }
        }
    },
    render: args => (
        <div className="grid max-w-md gap-1">
            <Label {...args} />
            <Input id={args.htmlFor} placeholder="Boiler House north" />
        </div>
    )
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
    render: () => (
        <div className="grid max-w-md gap-4">
            <div className="grid gap-1">
                <Label htmlFor="label-sm" textSize="sm">
                    Island (small)
                </Label>
                <Input id="label-sm" layoutSize="sm" placeholder="Ironworks" />
            </div>
            <div className="grid gap-1">
                <Label htmlFor="label-default">Island (default)</Label>
                <Input id="label-default" placeholder="Ironworks" />
            </div>
            <div className="grid gap-1">
                <Label htmlFor="label-lg" textSize="lg">
                    Island (large)
                </Label>
                <Input id="label-lg" layoutSize="lg" placeholder="Ironworks" />
            </div>
        </div>
    )
}

export const Required: Story = {
    render: () => (
        <div className="grid max-w-md gap-1">
            <Label htmlFor="label-required">
                Building name
                <span className="ml-1 text-destructive" aria-hidden="true">
                    *
                </span>
                <span className="sr-only"> (required)</span>
            </Label>
            <Input id="label-required" required />
        </div>
    )
}

export const NextToADisabledControl: Story = {
    render: () => (
        <div className="flex items-center gap-2">
            <Checkbox id="label-disabled" disabled />
            <Label htmlFor="label-disabled">Demolish the Vault on launch</Label>
        </div>
    )
}

export const WithError: Story = {
    render: () => (
        <div className="grid max-w-md gap-1">
            <Label htmlFor="label-error" className="text-destructive">
                Building name
            </Label>
            <Input id="label-error" aria-invalid aria-describedby="label-error-message" className="border-destructive" />
            <p id="label-error-message" role="alert" className="text-sm font-medium text-destructive">
                Name the building before you raise it.
            </p>
        </div>
    )
}
