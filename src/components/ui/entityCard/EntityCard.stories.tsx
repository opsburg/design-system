import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bot, Factory, GitBranch, Ship, Warehouse } from "lucide-react"
import { Badge } from "../../atoms/badge"
import Button from "../../atoms/button/Button"
import { IconTile } from "../../atoms/iconTile"
import { StatusBadge } from "../../atoms/statusBadge"
import { DescriptionItem, DescriptionList } from "../descriptionList"
import EntityCard from "./EntityCard"

const meta = {
    title: "Patterns/EntityCard",
    component: EntityCard,
    args: {
        name: "Orders Factory",
        subtitle: "orders-be · service",
        nameAs: "h3",
        logo: <IconTile icon={<Factory />} size="sm" shape="square" />,
        badges: (
            <>
                <Badge variant="outline">v2.14.3</Badge>
                <Badge>Node 22</Badge>
            </>
        ),
        status: (
            <StatusBadge variant="info" icon={<Bot className="size-3.5" aria-hidden="true" />}>
                2 automatons at work
            </StatusBadge>
        ),
        primaryAction: (
            <Button className="w-full">
                <Ship />
                Launch airship
            </Button>
        ),
        actions: (
            <>
                <Button variant="secondary" size="sm">
                    Inspect
                </Button>
                <Button variant="secondary" size="sm">
                    Open telegraph
                </Button>
            </>
        ),
        children: (
            <DescriptionList orientation="inline">
                <DescriptionItem label="Pressure">62% · load</DescriptionItem>
                <DescriptionItem label="Coal">€126 / month</DescriptionItem>
                <DescriptionItem label="Last airship">2026-11-12 18:04</DescriptionItem>
            </DescriptionList>
        )
    },
    argTypes: {
        nameAs: { control: "inline-radio", options: ["h2", "h3", "h4"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "One building in a grid of buildings: name, slug and badges on top, details in the body, actions at the bottom. In a grid the body stretches, so actions line up across cards with different details. Pick `nameAs` from the headings already on the page."
            }
        }
    },
    render: args => (
        <div className="max-w-sm">
            <EntityCard {...args} />
        </div>
    )
} satisfies Meta<typeof EntityCard>

export default meta
type Story = StoryObj<typeof meta>

export const Service: Story = {}

export const Minimal: Story = {
    args: {
        name: "Ledger Vault",
        subtitle: "ledger-db · database",
        logo: undefined,
        badges: undefined,
        status: undefined,
        primaryAction: undefined,
        actions: undefined,
        children: <p className="text-foreground-secondary">PostgreSQL 17 on your own engine, with a reserve line to eu-west-1.</p>
    }
}

export const LongNameTruncates: Story = {
    args: {
        name: "Boiler House 3 for the overnight batch jobs of the northern district",
        subtitle: "boiler-house-3-northern-district-overnight-batch · compute node"
    }
}

export const Grid: Story = {
    render: () => (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            <EntityCard
                name="Orders Factory"
                subtitle="orders-be · service"
                logo={<IconTile icon={<Factory />} size="sm" shape="square" />}
                badges={<Badge variant="outline">v2.14.3</Badge>}
                status={<StatusBadge variant="success">Running</StatusBadge>}
                primaryAction={
                    <Button className="w-full">
                        <Ship />
                        Launch airship
                    </Button>
                }
            >
                <p>Takes orders from the market square and hands them to the Ledger Vault.</p>
            </EntityCard>
            <EntityCard
                name="Ledger Vault"
                subtitle="ledger-db · database"
                logo={<IconTile icon={<Warehouse />} size="sm" shape="square" />}
                badges={<Badge variant="outline">PostgreSQL 17</Badge>}
                status={<StatusBadge variant="warning">High pressure</StatusBadge>}
                primaryAction={
                    <Button variant="secondary" className="w-full">
                        Inspect
                    </Button>
                }
            >
                <p>Keeps every order. Runs on your own engine.</p>
                <p>Reserve line to eu-west-1 is armed.</p>
            </EntityCard>
            <EntityCard
                name="Storefront"
                subtitle="storefront-fe · service"
                logo={<IconTile icon={<GitBranch />} size="sm" shape="square" />}
                badges={<Badge variant="outline">v5.0.1</Badge>}
                status={<StatusBadge variant="destructive">Blackout</StatusBadge>}
                primaryAction={
                    <Button className="w-full">
                        <Ship />
                        Launch airship
                    </Button>
                }
            >
                <p>Still powered by a foreign power plant · US cloud provider.</p>
            </EntityCard>
        </div>
    )
}
