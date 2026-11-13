import type { Meta, StoryObj } from "@storybook/react-vite"
import { labelVariants } from "./label"
import { Slider } from "./slider"

const meta = {
    title: "Forms/Slider",
    component: Slider,
    args: { defaultValue: [70], min: 0, max: 100, step: 5, thumbAriaLabel: "Pressure alarm threshold" },
    parameters: {
        docs: {
            description: {
                component:
                    "Picks a number in a range when the exact value matters less than its position, like a pressure threshold. Show the label as visible text and give the same words to thumbAriaLabel, since the name of a slider lives on its thumbs. Inside a react-hook-form form prefer SliderField."
            }
        }
    },
    render: args => (
        <div className="grid max-w-md gap-2">
            <span className={labelVariants()}>
                Pressure alarm threshold
            </span>
            <Slider {...args} />
        </div>
    )
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
    args: { defaultValue: [200], min: 0, max: 500, step: 10, thumbAriaLabel: "Coal budget per day" },
    render: args => (
        <div className="grid max-w-md gap-2">
            <span className={labelVariants()}>
                Coal budget per day
            </span>
            <p className="text-sm text-foreground-secondary">Tonnes of coal the Boiler Houses may burn before the ledger warns you.</p>
            <Slider {...args} />
        </div>
    )
}

export const Range: Story = {
    args: { defaultValue: [30, 80], thumbAriaLabel: ["Minimum pressure", "Maximum pressure"] },
    render: args => (
        <div className="grid max-w-md gap-2">
            <span className={labelVariants()}>
                Safe pressure band
            </span>
            <Slider {...args} />
        </div>
    )
}

export const Disabled: Story = {
    args: { defaultValue: [40], disabled: true, thumbAriaLabel: "Automatons on night shift" },
    render: args => (
        <div className="grid max-w-md gap-2">
            <span className={labelVariants()}>
                Automatons on night shift
            </span>
            <Slider {...args} />
        </div>
    )
}

export const WithError: Story = {
    args: { defaultValue: [100], thumbAriaLabel: "Pressure alarm threshold" },
    render: args => (
        <div className="grid max-w-md gap-2">
            <span className={labelVariants({ className: "text-destructive" })}>
                Pressure alarm threshold
            </span>
            <Slider {...args} />
            <p role="alert" className="text-sm font-medium text-destructive">
                At 100% the alarm sounds only after the boiler bursts. Pick a lower threshold.
            </p>
        </div>
    )
}
