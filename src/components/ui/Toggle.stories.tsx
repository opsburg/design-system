import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bot, Moon } from "lucide-react"
import { fn } from "storybook/test"
import { Toggle } from "./toggle"

const meta = {
    title: "Components/Toggle",
    component: Toggle,
    args: { children: "Night shift", defaultPressed: false, disabled: false, onPressedChange: fn() },
    argTypes: {
        variant: { control: "select", options: ["default", "outline"] },
        size: { control: "select", options: ["default", "sm", "lg"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A button that stays pressed: it switches one option on or off and the change applies at once, such as showing the automatons on the map. Keep the label the same in both states, since the pressed state is announced for it; for a setting in a form, use a Switch."
            }
        }
    }
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Pressed: Story = {
    args: { defaultPressed: true }
}

export const Variants: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            <Toggle {...args} variant="default">
                Night shift
            </Toggle>
            <Toggle {...args} variant="outline">
                Night shift
            </Toggle>
            <Toggle {...args} variant="outline" defaultPressed>
                Night shift
            </Toggle>
        </div>
    )
}

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            <Toggle {...args} variant="outline" size="sm">
                Night shift
            </Toggle>
            <Toggle {...args} variant="outline" size="default">
                Night shift
            </Toggle>
            <Toggle {...args} variant="outline" size="lg">
                Night shift
            </Toggle>
        </div>
    )
}

export const WithIcon: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            <Toggle {...args} variant="outline">
                <Bot className="mr-2 size-4" aria-hidden="true" />
                Show automatons
            </Toggle>
            <Toggle {...args} variant="outline" aria-label="Night shift">
                <Moon className="size-4" aria-hidden="true" />
            </Toggle>
        </div>
    ),
    parameters: {
        docs: { description: { story: "An icon-only toggle needs an `aria-label`; it names the option, not the state." } }
    }
}

export const Disabled: Story = {
    args: { disabled: true, variant: "outline" }
}
