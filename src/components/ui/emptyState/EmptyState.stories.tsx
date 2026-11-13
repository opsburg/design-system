import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bot, Plus, Ship, Warehouse } from "lucide-react"
import Button from "../../atoms/button/Button"
import EmptyState from "./EmptyState"

const meta = {
    title: "Components/EmptyState",
    component: EmptyState,
    args: {
        icon: <Warehouse />,
        tone: "primary",
        title: "No buildings in this district yet",
        description: "Every building is real infrastructure. Start with a Boiler House · compute node, then add the Factories · services that run on it.",
        variant: "outlined",
        size: "default"
    },
    argTypes: {
        icon: { control: false },
        actions: { control: false },
        iconVariant: { control: "select", options: ["circle", "bare"] },
        tone: { control: "select", options: ["primary", "accent", "destructive", "success", "warning", "info", "muted"] },
        titleAs: { control: "select", options: ["h2", "h3", "p"] },
        variant: { control: "select", options: ["plain", "outlined"] },
        size: { control: "select", options: ["sm", "default", "lg"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Takes the place of a list or a panel that has nothing to show: says why it is empty and what to do next. The title is a real heading; pick `titleAs` to fit the headings already on the page. Inside a table, use EmptyStateRow."
            }
        }
    }
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        actions: (
            <Button>
                <Plus />
                Build a Boiler House
            </Button>
        )
    }
}

export const Sizes: Story = {
    render: () => (
        <div className="grid gap-4 md:grid-cols-3">
            <EmptyState variant="outlined" size="sm" icon={<Ship />} title="No airships today" titleAs="h3" description="Deploys of the last 24 hours show up here." />
            <EmptyState variant="outlined" size="default" icon={<Ship />} title="No airships today" titleAs="h3" description="Deploys of the last 24 hours show up here." />
            <EmptyState variant="outlined" size="lg" icon={<Ship />} title="No airships today" titleAs="h3" description="Deploys of the last 24 hours show up here." />
        </div>
    )
}

export const BareIcon: Story = {
    args: {
        iconVariant: "bare",
        tone: "muted",
        icon: <Bot />,
        title: "No automatons hired",
        description: "AI agents you add to the city work here, on engines you control.",
        actions: <Button variant="secondary">Hire an automaton</Button>,
        variant: "plain"
    }
}

export const WithoutActions: Story = {
    args: {
        icon: <Ship />,
        tone: "muted",
        title: "No storms this week",
        description: "Incidents opened in the last seven days appear here.",
        size: "sm"
    }
}
