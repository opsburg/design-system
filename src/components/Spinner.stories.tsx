import type { Meta, StoryObj } from "@storybook/react-vite"
import Spinner from "./Spinner"

const meta = {
    title: "Atoms/Spinner",
    component: Spinner,
    args: { centerScreen: false, size: 24, label: "Loading the city ledger…" },
    parameters: {
        docs: {
            description: {
                component:
                    "Shows that something is loading when its length is unknown: a page, a panel, the result of an action. It announces its `label` to screen readers, so say what is loading. When you know how far along it is, use Meter instead."
            }
        }
    }
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Spinner centerScreen={false} size={16} label="Loading Boiler House 3 · compute node" />
            <Spinner centerScreen={false} size={24} label="Loading the Vault · database" />
            <Spinner centerScreen={false} size={40} label="Loading the map of Opsburg" />
        </div>
    )
}

export const CenteredInAPanel: Story = {
    args: { centerScreen: true, size: 32, label: "Checking the foreign power plants · providers" },
    render: (args) => (
        <div className="flex h-48 flex-col rounded-lg border-2 border-dashed border-divider">
            <Spinner {...args} />
        </div>
    )
}
