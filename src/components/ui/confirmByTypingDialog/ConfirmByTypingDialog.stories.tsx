import type { Meta, StoryObj } from "@storybook/react-vite"
import { Trash2 } from "lucide-react"
import * as React from "react"
import { fn } from "storybook/test"
import Button from "../../atoms/button/Button"
import { ConfirmByTypingDialog, type IConfirmByTypingDialogProps } from "./ConfirmByTypingDialog"

/** Owns the open state, as the screen that uses the dialog would, and keeps the trigger next to it. */
const WithTrigger = (args: IConfirmByTypingDialogProps) => {
    const [open, setOpen] = React.useState(args.open)
    return (
        <>
            <Button variant="destructive" onClick={() => setOpen(true)}>
                <Trash2 />
                Demolish the Ledger Factory
            </Button>
            <ConfirmByTypingDialog
                {...args}
                open={open}
                onOpenChange={next => {
                    setOpen(next)
                    args.onOpenChange(next)
                }}
            />
        </>
    )
}

/** Open overlays cover the page: in the docs they render in their own frame. */
const openInFrame = { docs: { story: { inline: false, height: "560px" } } }

const meta = {
    title: "Components/ConfirmByTypingDialog",
    component: ConfirmByTypingDialog,
    args: {
        open: false,
        onOpenChange: fn(),
        onConfirm: fn(),
        expectedText: "ledger-factory",
        title: "Demolish the Ledger Factory",
        warningTitle: "This cannot be undone",
        warningDescription: "The Ledger Factory · service, its two Vaults · databases and every airship log will be removed from the city.",
        confirmationHint: "Type ledger-factory to confirm",
        confirmLabel: "Demolish",
        confirmingLabel: "Demolishing…",
        cancelLabel: "Keep the Factory"
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Guards an action that destroys a lot at once: the destructive button stays disabled until the user types `expectedText` exactly. Reserve it for the biggest losses, a whole Factory or a Vault; for everyday removals DeleteConfirmationDialog asks less."
            }
        }
    },
    render: args => <WithTrigger {...args} />
} satisfies Meta<typeof ConfirmByTypingDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Open: Story = {
    args: { open: true },
    parameters: openInFrame
}

export const WithExtraContent: Story = {
    args: {
        open: true,
        children: <p className="pb-4 text-sm text-foreground-secondary">Automatons that write to the Ledger Factory will stop at their next shift and wait for a new route.</p>
    },
    parameters: openInFrame
}

export const Pending: Story = {
    args: { open: true, isPending: true },
    parameters: {
        ...openInFrame,
        docs: {
            ...openInFrame.docs,
            description: { story: "With `isPending` the field and both buttons are disabled, and Escape or a click outside cannot close the dialog until the action settles." }
        }
    }
}
