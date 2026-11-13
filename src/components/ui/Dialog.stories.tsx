import type { Meta, StoryObj } from "@storybook/react-vite"
import { Ship } from "lucide-react"
import Button from "../atoms/button/Button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Input } from "./input/input"
import { Label } from "./label"

/** Open overlays cover the page: in the docs they render in their own frame. */
const openInFrame = { docs: { story: { inline: false, height: "420px" } } }

const meta = {
    title: "Components/Dialog",
    component: Dialog,
    args: { defaultOpen: false, modal: true },
    argTypes: {
        defaultOpen: { control: "boolean" },
        modal: { control: "boolean" }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Interrupts the work for a decision or a short task that has to be finished before going on. Always give it a DialogTitle and a DialogDescription; for a quick look at details that does not block the page, use a Popover instead."
            }
        }
    },
    render: args => (
        <Dialog {...args}>
            <DialogTrigger asChild>
                <Button>
                    <Ship />
                    Launch airship
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Launch Airship 214 to production?</DialogTitle>
                    <DialogDescription>Airship 214 · deploy carries build 3f9c2a of the Ledger Factory · service to the production city.</DialogDescription>
                </DialogHeader>
                <p className="py-4 text-sm">The Factory keeps working while the airship docks. If the landing fails, the previous build takes over again.</p>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Stay moored</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button>Launch airship</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Open: Story = {
    args: { defaultOpen: true },
    parameters: openInFrame
}

export const WithForm: Story = {
    args: { defaultOpen: true },
    parameters: openInFrame,
    render: args => (
        <Dialog {...args}>
            <DialogTrigger asChild>
                <Button variant="accent">Rename Boiler House</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rename Boiler House 3</DialogTitle>
                    <DialogDescription>The name shows on the city map and in the Observatory. The compute node behind it does not change.</DialogDescription>
                </DialogHeader>
                <form
                    className="space-y-2 py-4"
                    onSubmit={event => {
                        event.preventDefault()
                    }}
                >
                    <Label htmlFor="boiler-house-name">Name</Label>
                    <Input id="boiler-house-name" fullWidth defaultValue="Boiler House 3" autoComplete="off" />
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button>Save name</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const WithoutCloseButton: Story = {
    args: { defaultOpen: true },
    parameters: {
        ...openInFrame,
        docs: {
            ...openInFrame.docs,
            description: { story: "With `hideCloseButton` the footer must still offer a way out: Escape alone is not enough for pointer users." }
        }
    },
    render: args => (
        <Dialog {...args}>
            <DialogTrigger asChild>
                <Button variant="secondary">Read the storm report</Button>
            </DialogTrigger>
            <DialogContent hideCloseButton>
                <DialogHeader>
                    <DialogTitle>Storm over the east quarter · incident</DialogTitle>
                    <DialogDescription>The foreign power plant went dark at 09:42: a provider outage. The reserve line · failover picked up the load in 40 seconds.</DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-4">
                    <DialogClose asChild>
                        <Button>Got it</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
