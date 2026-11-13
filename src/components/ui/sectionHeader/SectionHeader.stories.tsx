import type { Meta, StoryObj } from "@storybook/react-vite"
import { Rocket, ScrollText } from "lucide-react"
import Button from "../../atoms/button/Button"
import { Checkbox } from "../checkbox"
import { Label } from "../label"
import { SectionHeader } from "./SectionHeader"

const meta = {
    title: "Patterns/SectionHeader",
    component: SectionHeader,
    args: {
        title: "Airship log · deploys",
        description: "The last 20 airships that left for the production city.",
        as: "h2"
    },
    argTypes: {
        as: { control: "select", options: ["h2", "h3"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Opens a section of a page, in a quieter tone than the page title, with an optional control on the right. Choose `as` from the headings already on the page; the look does not change with the level."
            }
        }
    }
} satisfies Meta<typeof SectionHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
    args: { icon: <Rocket /> }
}

export const WithAction: Story = {
    args: {
        icon: <Rocket />,
        actions: (
            <Button variant="secondary" size="sm">
                Launch airship
            </Button>
        )
    }
}

export const WithToggleAction: Story = {
    args: {
        title: "Storm reports · incidents",
        description: "What happened during each provider outage and how the reserve line held.",
        icon: <ScrollText />,
        actions: (
            <div className="flex items-center gap-2">
                <Checkbox id="show-resolved" />
                <Label htmlFor="show-resolved">Show resolved storms</Label>
            </div>
        )
    }
}

export const TitleOnly: Story = {
    args: { title: "Automatons on duty · AI agents", description: undefined }
}

export const AsSubsection: Story = {
    args: { as: "h3", title: "Night shift", description: "Automatons that keep the boilers lit until dawn." },
    render: args => (
        <section aria-labelledby="automatons-heading">
            <h2 id="automatons-heading" className="mb-4 text-2xl font-bold">
                Automatons · AI agents
            </h2>
            <SectionHeader {...args} />
        </section>
    )
}
