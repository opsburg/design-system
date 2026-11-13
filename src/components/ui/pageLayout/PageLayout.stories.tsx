import type { Meta, StoryObj } from "@storybook/react-vite"
import { Flame, Plus } from "lucide-react"
import Button from "../../atoms/button/Button"
import { StatusBadge } from "../../atoms/statusBadge"
import { Card, CardDescription, CardHeader, CardTitle } from "../card"
import { PageLayout } from "./PageLayout"

const buildings = [
    { name: "Boiler House 1", detail: "Pressure 48% · load" },
    { name: "Boiler House 2", detail: "Pressure 71% · load" },
    { name: "Boiler House 3", detail: "Pressure 62% · load" }
]

const BuildingGrid = () => (
    <section aria-labelledby="buildings-heading" className="space-y-3">
        <h2 id="buildings-heading" className="text-xl font-semibold">
            On your own engine
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
            {buildings.map(building => (
                <Card key={building.name}>
                    <CardHeader className="border-b-0 pb-0">
                        <CardTitle className="mb-0">{building.name}</CardTitle>
                        <CardDescription>{building.detail}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    </section>
)

const meta = {
    title: "Patterns/PageLayout",
    component: PageLayout,
    args: {
        title: "Boiler Houses · compute nodes",
        description: "Every Boiler House burns coal for the Factories around it. Three run on your own engine, one still on a foreign power plant.",
        children: <BuildingGrid />
    },
    parameters: {
        docs: {
            description: {
                component:
                    "The frame of a page: one `h1` title, a line that says what the page is for, and a toolbar under them, `left` for filters and status, `right` for the page's actions. The content goes in `children` and starts at `h2`; the document title stays with the app."
            }
        }
    }
} satisfies Meta<typeof PageLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithToolbar: Story = {
    args: {
        left: <StatusBadge variant="warning">Pressure high on Boiler House 2</StatusBadge>,
        right: (
            <Button>
                <Plus />
                Build a Boiler House
            </Button>
        )
    }
}

export const WithIcon: Story = {
    args: {
        icon: <Flame className="size-6" aria-hidden="true" />,
        right: <Button variant="secondary">Open the Observatory</Button>
    }
}

export const TitleOnly: Story = {
    args: {
        title: "Ledger · costs",
        description: undefined,
        children: <p className="text-sm">Coal this month · cost: 1,240 tons, 8% under the city budget.</p>
    }
}
