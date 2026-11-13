import type { Meta, StoryObj } from "@storybook/react-vite"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

const runbook = [
    {
        value: "blackout",
        title: "What happens in a blackout · provider outage?",
        body: "The foreign power plant · US cloud provider stops sending power. Every building wired only to it goes dark until the provider comes back."
    },
    {
        value: "reserve-line",
        title: "How does the reserve line · failover work?",
        body: "Buildings with a reserve line switch to a second source on their own. The Observatory records the switch and how long the city ran on it."
    },
    {
        value: "own-engine",
        title: "Why build your own engine · infrastructure you control?",
        body: "A Boiler House · compute node on your own engine keeps burning during a storm · incident at the provider. It costs more coal · cost up front and less sleep later."
    }
]

const meta = {
    title: "Components/Accordion",
    component: Accordion,
    args: { type: "single", collapsible: true, defaultValue: "blackout", className: "max-w-2xl" },
    parameters: {
        docs: {
            description: {
                component:
                    'Stacks related sections under short headings and lets the reader open only what they need, such as a runbook or a FAQ. Do not hide content everyone must read; with `type="multiple"` several sections can stay open together.'
            }
        }
    },
    render: args => (
        <Accordion {...args}>
            {runbook.map(item => (
                <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>
                        <p className="text-sm">{item.body}</p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllClosed: Story = {
    args: { type: "single", collapsible: true, defaultValue: undefined }
}

export const Multiple: Story = {
    args: { type: "multiple", defaultValue: ["blackout", "reserve-line"] }
}
