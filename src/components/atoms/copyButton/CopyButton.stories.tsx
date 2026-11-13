import type { Meta, StoryObj } from "@storybook/react-vite"
import CopyButton from "./CopyButton"

const meta = {
    title: "Atoms/CopyButton",
    component: CopyButton,
    args: { value: "airship-manifest-7f3a9c2", label: "Copy airship manifest id", copiedLabel: "Copied" },
    argTypes: {
        variant: { control: "select", options: ["primary", "secondary", "accent", "ghost", "link", "destructive"] },
        size: { control: "select", options: ["default", "sm", "lg", "icon", "icon-sm"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Copies a value to the clipboard and shows a check for a moment: an id, a connection string, a command. Put it right next to the value it copies. Icon-only by default, so give it a `label` that names what it copies; the confirmation is announced to screen readers."
            }
        }
    }
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NextToAValue: Story = {
    render: () => (
        <div className="flex items-center gap-2">
            <code className="rounded-sm bg-muted px-2 py-1 font-mono text-sm">vault-7.opsburg.internal:5432</code>
            <CopyButton value="vault-7.opsburg.internal:5432" label="Copy Vault 7 · database address" />
        </div>
    )
}

export const WithLabel: Story = {
    args: { showLabel: true, variant: "secondary", size: "sm", label: "Copy command", value: "opsburg airship launch --to own-engine" }
}

export const Disabled: Story = {
    args: { disabled: true }
}
