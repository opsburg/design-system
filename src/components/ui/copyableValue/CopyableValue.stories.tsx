import type { Meta, StoryObj } from "@storybook/react-vite"
import CopyableValue from "./CopyableValue"

const meta = {
    title: "Components/CopyableValue",
    component: CopyableValue,
    args: { value: "city_7f3c9a12-4e8b-4d2a-9c61-0b5e2f8d4a17", copyLabel: "Copy city ID", copiedLabel: "City ID copied" },
    argTypes: {
        size: { control: "inline-radio", options: ["default", "sm"] },
        overflow: { control: "inline-radio", options: ["break", "truncate"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A single value people need to copy: an ID, an API key, a clone URL. The value stays selectable with one click even when the clipboard is not available. Give the copy button a label that names the value."
            }
        }
    },
    render: args => (
        <div className="max-w-md">
            <CopyableValue {...args} />
        </div>
    )
} satisfies Meta<typeof CopyableValue>

export default meta
type Story = StoryObj<typeof meta>

export const Identifier: Story = {}

export const TruncatedUrl: Story = {
    args: {
        value: "https://git.city.internal/engine-room/orders-factory-service.git",
        overflow: "truncate",
        copyLabel: "Copy clone URL",
        copiedLabel: "Clone URL copied"
    }
}

export const Small: Story = {
    args: { size: "sm", value: "boiler-house-3.eu-south-1.city.internal", copyLabel: "Copy hostname", copiedLabel: "Hostname copied" }
}

export const ReadOnly: Story = {
    args: { copyable: false, value: "sha256:9b2f1c4e7a3d6b8f0e5c2a1d4b7e9f3c6a8d2b5e1f4c7a9d3b6e8f2c5a1d4b7e" }
}
