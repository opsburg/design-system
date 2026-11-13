import type { Meta, StoryObj } from "@storybook/react-vite"
import { Label, labelVariants } from "./label"
import { RadioGroup, RadioGroupItem } from "./radio-group"

const options = [
    { value: "own-engine", label: "Own engine, infrastructure you control" },
    { value: "foreign-plant", label: "Foreign power plant, a US cloud provider" },
    { value: "both", label: "Both, with a reserve line between them" }
]

const Options = ({ prefix, disabledValue }: { prefix: string; disabledValue?: string }) => (
    <>
        {options.map(option => (
            <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem id={`${prefix}-${option.value}`} value={option.value} disabled={option.value === disabledValue} />
                <Label htmlFor={`${prefix}-${option.value}`}>{option.label}</Label>
            </div>
        ))}
    </>
)

const meta = {
    title: "Forms/RadioGroup",
    component: RadioGroup,
    args: { defaultValue: "both", "aria-labelledby": "power-source-label" },
    argTypes: {
        orientation: { control: "select", options: ["vertical", "horizontal"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "One choice out of a few options that are all worth seeing at once (up to five or six). For longer lists use Select. Name the group with a visible heading referenced by aria-labelledby, and give every item its own Label."
            }
        }
    },
    render: args => (
        <div className="grid gap-2">
            <span id="power-source-label" className={labelVariants()}>
                Where the automatons draw their power
            </span>
            <RadioGroup {...args}>
                <Options prefix="power" />
            </RadioGroup>
        </div>
    )
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
    args: { "aria-labelledby": "power-help-label", "aria-describedby": "power-help-description" },
    render: args => (
        <div className="grid gap-2">
            <span id="power-help-label" className={labelVariants()}>
                Where the automatons draw their power
            </span>
            <p id="power-help-description" className="text-sm text-foreground-secondary">
                If the foreign power plant has a blackout, only the own engine keeps the automatons working.
            </p>
            <RadioGroup {...args}>
                <Options prefix="power-help" />
            </RadioGroup>
        </div>
    )
}

export const Disabled: Story = {
    args: { "aria-labelledby": "power-disabled-label", disabled: true },
    render: args => (
        <div className="grid gap-2">
            <span id="power-disabled-label" className={labelVariants()}>
                Where the automatons draw their power (locked during a storm)
            </span>
            <RadioGroup {...args}>
                <Options prefix="power-disabled" />
            </RadioGroup>
        </div>
    )
}

export const DisabledOption: Story = {
    args: { "aria-labelledby": "power-option-label", defaultValue: "foreign-plant" },
    render: args => (
        <div className="grid gap-2">
            <span id="power-option-label" className={labelVariants()}>
                Where the automatons draw their power
            </span>
            <RadioGroup {...args}>
                <Options prefix="power-option" disabledValue="own-engine" />
            </RadioGroup>
        </div>
    )
}

export const Required: Story = {
    args: { "aria-labelledby": "power-required-label", defaultValue: undefined, required: true, "aria-required": true },
    render: args => (
        <div className="grid gap-2">
            <span id="power-required-label" className={labelVariants()}>
                Where the automatons draw their power
                <span className="ml-1 text-destructive" aria-hidden="true">
                    *
                </span>
                <span className="sr-only"> (required)</span>
            </span>
            <RadioGroup {...args}>
                <Options prefix="power-required" />
            </RadioGroup>
        </div>
    )
}

export const WithError: Story = {
    args: { "aria-labelledby": "power-error-label", "aria-describedby": "power-error-message", defaultValue: undefined, "aria-invalid": true },
    render: args => (
        <div className="grid gap-2">
            <span id="power-error-label" className={labelVariants({ className: "text-destructive" })}>
                Where the automatons draw their power
            </span>
            <RadioGroup {...args}>
                <Options prefix="power-error" />
            </RadioGroup>
            <p id="power-error-message" role="alert" className="text-sm font-medium text-destructive">
                Choose a power source before the automatons start their shift.
            </p>
        </div>
    )
}
