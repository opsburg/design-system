import type { Meta, StoryObj } from "@storybook/react-vite"
import { Gauge } from "lucide-react"
import Button from "../atoms/button/Button"
import { StatusBadge } from "../atoms/statusBadge"
import { Input } from "./input/input"
import { Label } from "./label"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

/** Open overlays float over the page: in the docs they render in their own frame. */
const openInFrame = { docs: { story: { inline: false, height: "320px" } } }

const meta = {
    title: "Components/Popover",
    component: Popover,
    args: { defaultOpen: false },
    argTypes: { defaultOpen: { control: "boolean" } },
    parameters: {
        docs: {
            description: {
                component:
                    "Shows details or a small control next to the element that opened it, without blocking the page. Give the content a name with `aria-labelledby` pointing at its heading. For a decision that must be taken before going on, use a Dialog."
            }
        }
    },
    render: args => (
        <Popover {...args}>
            <PopoverTrigger asChild>
                <Button variant="secondary">
                    <Gauge />
                    Pressure details
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" aria-labelledby="pressure-heading">
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <h2 id="pressure-heading" className="text-base font-semibold">
                            Boiler House 3 · compute node
                        </h2>
                        <StatusBadge variant="warning">High</StatusBadge>
                    </div>
                    <p className="text-sm">Pressure 84% · load for the last 15 minutes. The Ledger Factory · service is drawing most of it.</p>
                </div>
            </PopoverContent>
        </Popover>
    )
} satisfies Meta<typeof Popover>

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
        <Popover {...args}>
            <PopoverTrigger asChild>
                <Button variant="secondary">Set pressure alarm</Button>
            </PopoverTrigger>
            <PopoverContent align="start" aria-labelledby="alarm-heading">
                <form
                    className="space-y-3"
                    onSubmit={event => {
                        event.preventDefault()
                    }}
                >
                    <h2 id="alarm-heading" className="text-base font-semibold">
                        Pressure alarm
                    </h2>
                    <div className="space-y-2">
                        <Label htmlFor="alarm-threshold">Ring the bell above (% load)</Label>
                        <Input id="alarm-threshold" type="number" min={1} max={100} defaultValue={80} fullWidth />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" size="sm">
                            Save alarm
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}
