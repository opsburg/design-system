import type { Meta, StoryObj } from "@storybook/react-vite"
import { Trash2 } from "lucide-react"
import * as React from "react"
import { fn } from "storybook/test"
import Button from "../atoms/button/Button"
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog"

type DialogArgs = React.ComponentProps<typeof DeleteConfirmationDialog>

/** Owns the open state, as the screen that uses the dialog would, and keeps the trigger next to it. */
const WithTrigger = (args: DialogArgs) => {
    const [open, setOpen] = React.useState(args.isOpen)
    return (
        <>
            <Button variant="destructive" onClick={() => setOpen(true)}>
                <Trash2 />
                Demolish Vault 2
            </Button>
            <DeleteConfirmationDialog
                {...args}
                isOpen={open}
                onOpenChange={next => {
                    setOpen(next)
                    args.onOpenChange(next)
                }}
            />
        </>
    )
}

/** Open overlays cover the page: in the docs they render in their own frame. */
const openInFrame = { docs: { story: { inline: false, height: "320px" } } }

// Annotated rather than `satisfies`: the props interface is not exported, so the inferred type could not be emitted
const meta: Meta<typeof DeleteConfirmationDialog> = {
    title: "Components/DeleteConfirmationDialog",
    component: DeleteConfirmationDialog,
    args: {
        isOpen: false,
        onOpenChange: fn(),
        onDelete: fn(),
        onDeleteSuccess: fn(),
        onCancel: fn(),
        title: "Demolish Vault 2?",
        description: "Vault 2 · database and its 14 days of ledgers will be removed from the city. This cannot be undone.",
        cancelLabel: "Keep the Vault",
        deleteLabel: "Demolish",
        deletingLabel: "Demolishing…"
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Asks once before something is removed for good. The parent owns `isOpen`; the dialog waits for `onDelete` to settle before closing. Name the thing in the title and say what is lost in the description; when the loss is large, ask the user to type the name with ConfirmByTypingDialog instead."
            }
        }
    },
    render: args => <WithTrigger {...args} />
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Open: Story = {
    args: { isOpen: true },
    parameters: openInFrame
}

export const SlowDemolition: Story = {
    args: {
        isOpen: true,
        onDelete: fn(() => new Promise<void>(resolve => setTimeout(resolve, 2500)))
    },
    parameters: {
        ...openInFrame,
        docs: {
            ...openInFrame.docs,
            description: { story: "While `onDelete` is in flight both buttons are disabled and the confirm button reads the `deletingLabel`." }
        }
    }
}
