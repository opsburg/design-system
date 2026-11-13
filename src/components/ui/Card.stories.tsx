import type { Meta, StoryObj } from "@storybook/react-vite"
import { Flame, Gauge } from "lucide-react"
import Button from "../atoms/button/Button"
import { StatusBadge } from "../atoms/statusBadge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

const meta = {
    title: "Components/Card",
    component: Card,
    args: {
        className: "max-w-sm",
        children: (
            <>
                <CardHeader>
                    <CardTitle className="mb-0">Boiler House 3 · compute node</CardTitle>
                    <CardDescription>Burns coal for the Factories of the east quarter.</CardDescription>
                </CardHeader>
                <CardContent className="pt-3">
                    <p className="text-sm">Pressure 62% · load. Two automatons on the night shift.</p>
                </CardContent>
            </>
        )
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Groups the facts about one thing, a building, a deploy, a bill, on a raised panel. Compose it from CardHeader, CardTitle, CardDescription, CardContent and CardFooter; pick the CardTitle level (`as`) from the headings already on the page."
            }
        }
    }
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithFooter: Story = {
    args: {
        children: (
            <>
                <CardHeader>
                    <CardTitle className="mb-0">Airship 214 · deploy</CardTitle>
                    <CardDescription>Ledger Factory · service, build 3f9c2a, bound for the production city.</CardDescription>
                </CardHeader>
                <CardContent className="py-3">
                    <p className="text-sm">Moored at the east mast. Cargo checked by the inspection automaton.</p>
                </CardContent>
                <CardFooter className="justify-end gap-2 border-t border-divider pt-3">
                    <Button variant="secondary" size="sm">
                        Inspect cargo
                    </Button>
                    <Button size="sm">Launch airship</Button>
                </CardFooter>
            </>
        )
    }
}

export const WithStatus: Story = {
    render: () => (
        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                        <CardTitle className="mb-0 flex items-center gap-2">
                            <Flame className="size-5" aria-hidden="true" />
                            Boiler House 3
                        </CardTitle>
                        <StatusBadge variant="success">Running</StatusBadge>
                    </div>
                    <CardDescription>Compute node on your own engine.</CardDescription>
                </CardHeader>
                <CardContent className="pt-3">
                    <p className="flex items-center gap-2 text-sm">
                        <Gauge className="size-4" aria-hidden="true" />
                        Pressure 62% · load
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                        <CardTitle className="mb-0 flex items-center gap-2">
                            <Flame className="size-5" aria-hidden="true" />
                            Boiler House 4
                        </CardTitle>
                        <StatusBadge variant="destructive">Blackout</StatusBadge>
                    </div>
                    <CardDescription>Compute node fed by a foreign power plant · US cloud provider.</CardDescription>
                </CardHeader>
                <CardContent className="pt-3">
                    <p className="text-sm">Provider outage since 09:42. The reserve line · failover carries its load.</p>
                </CardContent>
            </Card>
        </div>
    )
}

export const ContentOnly: Story = {
    args: {
        children: <p className="text-sm">Coal this month · cost: 1,240 tons, 8% under the city budget.</p>
    }
}
