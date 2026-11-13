import type { Meta, StoryObj } from "@storybook/react-vite"
import { StatusBadge } from "../atoms/statusBadge"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./table"

const buildings = [
    { name: "Boiler House 3 · compute node", district: "eu-south-1", pressure: "62%", coal: "€418 / month", status: "Running", variant: "success" },
    { name: "Orders Factory · service", district: "eu-south-1", pressure: "81%", coal: "€126 / month", status: "High pressure", variant: "warning" },
    { name: "Ledger Vault · database", district: "eu-west-1", pressure: "34%", coal: "€590 / month", status: "Running", variant: "success" },
    { name: "Reserve line · failover", district: "on-prem-milan", pressure: "0%", coal: "€72 / month", status: "Standby", variant: "info" },
    { name: "Foreign power plant · US cloud provider", district: "us-east-1", pressure: "—", coal: "€1,240 / month", status: "Blackout", variant: "destructive" }
] as const

const BuildingRows = () => (
    <>
        <TableHeader>
            <TableRow>
                <TableHead>Building</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Pressure</TableHead>
                <TableHead>Coal</TableHead>
                <TableHead>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {buildings.map(building => (
                <TableRow key={building.name}>
                    <TableCell className="font-medium">{building.name}</TableCell>
                    <TableCell className="font-mono text-xs">{building.district}</TableCell>
                    <TableCell>{building.pressure}</TableCell>
                    <TableCell>{building.coal}</TableCell>
                    <TableCell>
                        <StatusBadge variant={building.variant}>{building.status}</StatusBadge>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </>
)

const meta = {
    title: "Components/Table",
    component: Table,
    args: { framed: true, scroll: "clip", scrollAreaLabel: "Buildings of the city" },
    argTypes: {
        scroll: { control: "inline-radio", options: ["clip", "x"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Lists records that people compare across columns: buildings, deploys, invoices. Always give it a header row; `framed` puts it in the rounded frame of list pages, and `scrollAreaLabel` names the scroll area so keyboard users can reach a wide table."
            }
        }
    },
    render: args => (
        <Table {...args}>
            <BuildingRows />
        </Table>
    )
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Framed: Story = {}

export const Unframed: Story = {
    args: { framed: false }
}

export const NeutralHeader: Story = {
    render: args => (
        <Table {...args}>
            <TableHeader tinted={false}>
                <TableRow>
                    <TableHead>Airship</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Launched</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>orders-be · deploy</TableCell>
                    <TableCell className="font-mono text-xs">v2.14.3</TableCell>
                    <TableCell>2026-11-12 18:04</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>ledger-vault · migration</TableCell>
                    <TableCell className="font-mono text-xs">v0.9.0</TableCell>
                    <TableCell>2026-11-12 09:41</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export const WithCaptionAndFooter: Story = {
    render: args => (
        <Table {...args}>
            <TableCaption>Coal burned last month, per building.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Building</TableHead>
                    <TableHead className="text-right">Coal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Boiler House 3 · compute node</TableCell>
                    <TableCell className="text-right">€418</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Ledger Vault · database</TableCell>
                    <TableCell className="text-right">€590</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Orders Factory · service</TableCell>
                    <TableCell className="text-right">€126</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">€1,134</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export const WideWithHorizontalScroll: Story = {
    args: { scroll: "x" },
    render: args => (
        <div className="max-w-md">
            <Table {...args}>
                <BuildingRows />
            </Table>
        </div>
    )
}
