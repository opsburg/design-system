import type { Meta, StoryObj } from "@storybook/react-vite"
import NumberedSteps from "./NumberedSteps"

const meta = {
    title: "Patterns/NumberedSteps",
    component: NumberedSteps,
    args: {
        tone: "primary",
        steps: [
            { title: "Light your own engine", description: "Install the runtime on a server you control, so a blackout at the US cloud provider does not stop the city." },
            { title: "Connect the Boiler House", description: "Register the machine as a compute node and give it a district." },
            { title: "Arm the reserve line", description: "Point failover at a second region before the next storm." },
            { title: "Launch the first airship", description: "Deploy a service and watch it land on the telegraph tape." }
        ]
    },
    argTypes: {
        tone: { control: "inline-radio", options: ["primary", "accent"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A procedure people follow in order: a numbered marker, the step title and a short explanation. Use `startAt` to continue a long procedure in a second block; the order is carried by the list itself, so screen readers announce it once."
            }
        }
    }
} satisfies Meta<typeof NumberedSteps>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Accent: Story = {
    args: { tone: "accent" }
}

export const TitlesOnly: Story = {
    args: {
        steps: [{ title: "Copy the clone command" }, { title: "Open the repository in your editor" }, { title: "Run pnpm install" }]
    }
}

export const ContinuedBlock: Story = {
    args: {
        startAt: 5,
        steps: [
            { title: "Hand the shift to an automaton", description: "Assign an AI agent to watch pressure overnight." },
            { title: "Check the coal ledger", description: "Compare this month's cost with the foreign power plant you left." }
        ]
    }
}
