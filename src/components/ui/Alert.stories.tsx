import type { Meta, StoryObj } from "@storybook/react-vite"
import { CircleCheck, CloudLightning, Info, TriangleAlert, Zap } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./alert"

const meta = {
    title: "Components/Alert",
    component: Alert,
    args: {
        variant: "info",
        children: (
            <>
                <Info />
                <AlertTitle>Reserve line ready</AlertTitle>
                <AlertDescription>If the foreign power plant goes dark, Boiler House 3 · compute node takes the load within a minute.</AlertDescription>
            </>
        )
    },
    argTypes: {
        variant: { control: "select", options: ["default", "destructive", "success", "warning", "info"] },
        children: { control: false }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A message inside the page about the state of the city: an outcome, a warning, a failure. It is `role=\"status\"`, and `role=\"alert\"` only for destructive, which interrupts the screen reader. Use it for messages that stay; for confirmations that disappear, use a toast."
            }
        }
    }
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
    render: () => (
        <div className="max-w-xl space-y-4">
            <Alert>
                <Zap />
                <AlertTitle>Two engines on the grid</AlertTitle>
                <AlertDescription>Your city draws power from its own engine and one foreign power plant · US cloud provider.</AlertDescription>
            </Alert>
            <Alert variant="success">
                <CircleCheck />
                <AlertTitle>Airship docked</AlertTitle>
                <AlertDescription>The deploy of Factory 2 · service finished in 3 minutes.</AlertDescription>
            </Alert>
            <Alert variant="warning">
                <TriangleAlert />
                <AlertTitle>High pressure on the Vault</AlertTitle>
                <AlertDescription>The Vault · database is at 92% load. Add a boiler before the evening shift.</AlertDescription>
            </Alert>
            <Alert variant="info">
                <Info />
                <AlertTitle>Automatons on night shift</AlertTitle>
                <AlertDescription>Four AI agents will keep working on the ledger until dawn.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
                <CloudLightning />
                <AlertTitle>Blackout at the foreign power plant</AlertTitle>
                <AlertDescription>The US AI provider is down. Three automatons stopped; switch them to the reserve line.</AlertDescription>
            </Alert>
        </div>
    )
}

export const WithoutIcon: Story = {
    args: {
        variant: "default",
        children: (
            <>
                <AlertTitle>Coal budget reset</AlertTitle>
                <AlertDescription>The cost counter starts again from zero on the first of the month.</AlertDescription>
            </>
        )
    }
}
