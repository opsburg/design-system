import type { Meta, StoryObj } from "@storybook/react-vite"
import { Label } from "./label"
import { Textarea } from "./textarea"

const meta = {
    title: "Forms/Textarea",
    component: Textarea,
    args: { id: "storm-log", placeholder: "What the storm hit, and how the city recovered" },
    parameters: {
        docs: {
            description: {
                component:
                    "The bare multi-line text input. Use it for free text longer than a line, such as incident notes, and pair it with a Label through htmlFor and id; inside a react-hook-form form prefer TextareaField."
            }
        }
    },
    render: args => (
        <div className="grid max-w-md gap-1">
            <Label htmlFor={args.id}>Storm log</Label>
            <Textarea {...args} />
        </div>
    )
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
    args: { id: "automaton-brief" },
    render: args => (
        <div className="grid max-w-md gap-1">
            <Label htmlFor={args.id}>Brief for the automatons</Label>
            <p id="automaton-brief-description" className="text-sm text-foreground-secondary">
                The automatons read this before every shift. Say which Factories they may repair on their own.
            </p>
            <Textarea {...args} aria-describedby="automaton-brief-description" />
        </div>
    )
}

export const Disabled: Story = {
    args: { id: "closed-log", disabled: true, defaultValue: "The foreign power plant went dark at dawn. The reserve line held." },
    render: args => (
        <div className="grid max-w-md gap-1">
            <Label htmlFor={args.id}>Storm log (closed)</Label>
            <Textarea {...args} />
        </div>
    )
}

export const Required: Story = {
    args: { id: "required-log", required: true },
    render: args => (
        <div className="grid max-w-md gap-1">
            <Label htmlFor={args.id}>
                Storm log
                <span className="ml-1 text-destructive" aria-hidden="true">
                    *
                </span>
                <span className="sr-only"> (required)</span>
            </Label>
            <Textarea {...args} />
        </div>
    )
}

export const WithError: Story = {
    args: { id: "short-log", defaultValue: "Fixed.", "aria-invalid": true, className: "border-destructive focus-visible:ring-destructive" },
    render: args => (
        <div className="grid max-w-md gap-1">
            <Label htmlFor={args.id} className="text-destructive">
                Storm log
            </Label>
            <Textarea {...args} aria-describedby="short-log-error" />
            <p id="short-log-error" role="alert" className="text-sm font-medium text-destructive">
                Describe what the storm hit before you close the incident.
            </p>
        </div>
    )
}
