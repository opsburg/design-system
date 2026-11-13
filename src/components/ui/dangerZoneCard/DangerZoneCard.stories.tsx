import type { Meta, StoryObj } from "@storybook/react-vite"
import { Trash2 } from "lucide-react"
import * as React from "react"
import { fn } from "storybook/test"
import { ConfirmByTypingDialog } from "../confirmByTypingDialog/ConfirmByTypingDialog"
import { DangerZoneCard } from "./DangerZoneCard"

const meta = {
    title: "Components/DangerZoneCard",
    component: DangerZoneCard,
    args: {
        title: "Danger zone",
        description: "Actions here cannot be undone. Read twice before you pull the lever.",
        titleAs: "h2",
        actionTitle: "Demolish the Ledger Factory",
        actionDescription: "Removes the service, its two Vaults · databases and every airship log.",
        actionTitleAs: "h3",
        actionLabel: "Demolish",
        actionIcon: <Trash2 />,
        onAction: fn(),
        disabled: false,
        className: "max-w-2xl"
    },
    argTypes: {
        titleAs: { control: "select", options: ["h2", "h3", "h4"] },
        actionTitleAs: { control: "select", options: ["h3", "h4", "h5"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Collects the irreversible actions on a resource at the bottom of its settings page. The card only calls `onAction`: pass the confirmation dialog as `children` and keep its open state in the page. Pick `titleAs` from the headings already on the page and keep `actionTitleAs` one level below."
            }
        }
    }
} satisfies Meta<typeof DangerZoneCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithConfirmation: Story = {
    render: function Render(args) {
        const [open, setOpen] = React.useState(false)
        return (
            <DangerZoneCard
                {...args}
                onAction={() => {
                    args.onAction?.()
                    setOpen(true)
                }}
            >
                <ConfirmByTypingDialog
                    open={open}
                    onOpenChange={setOpen}
                    expectedText="ledger-factory"
                    title="Demolish the Ledger Factory"
                    warningTitle="This cannot be undone"
                    warningDescription="The Ledger Factory · service, its two Vaults · databases and every airship log will be removed from the city."
                    confirmationHint="Type ledger-factory to confirm"
                    confirmLabel="Demolish"
                    confirmingLabel="Demolishing…"
                    cancelLabel="Keep the Factory"
                    onConfirm={fn()}
                />
            </DangerZoneCard>
        )
    }
}

export const Disabled: Story = {
    args: {
        disabled: true,
        actionDescription: "Airship 214 · deploy is still docking. Demolition opens again once it lands."
    }
}

export const ShutDownBoilerHouse: Story = {
    args: {
        actionTitle: "Shut down Boiler House 3",
        actionDescription: "The compute node stops burning coal · cost. The Factories it feeds move to Boiler House 4.",
        actionLabel: "Shut down",
        actionIcon: undefined
    }
}
