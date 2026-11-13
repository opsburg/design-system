import type { Meta, StoryObj } from "@storybook/react-vite"
import { Gauge, Ship } from "lucide-react"
import Button from "../atoms/button/Button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

const meta = {
    title: "Components/Tooltip",
    component: Tooltip,
    args: { defaultOpen: true, delayDuration: 300 },
    render: (args) => (
        <div className="flex justify-center py-16">
            <Tooltip {...args}>
                <TooltipTrigger asChild>
                    <Button size="icon" variant="secondary" aria-label="Pressure gauge">
                        <Gauge />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Pressure gauge · load of Boiler House 3</TooltipContent>
            </Tooltip>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                component:
                    "A short hint that appears on hover and focus: the name of an icon-only button, the real word behind a game word. Never put anything essential or interactive in it, it cannot be reached on touch. The trigger must be focusable and keep its own `aria-label`."
            }
        }
    }
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sides: Story = {
    render: () => (
        <div className="flex flex-wrap items-center justify-center gap-6 py-16">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
                <Tooltip key={side}>
                    <TooltipTrigger asChild>
                        <Button variant="secondary">Tooltip on the {side}</Button>
                    </TooltipTrigger>
                    <TooltipContent side={side}>Airship · deploy of Factory 2</TooltipContent>
                </Tooltip>
            ))}
        </div>
    )
}

export const ExplainsAGameWord: Story = {
    render: () => (
        <div className="flex justify-center py-16">
            <Tooltip defaultOpen>
                <TooltipTrigger asChild>
                    <Button variant="ghost">
                        <Ship />
                        Launch airship
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Deploys the new version of Factory 2 · service</TooltipContent>
            </Tooltip>
        </div>
    )
}
