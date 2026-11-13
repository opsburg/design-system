import type { Meta, StoryObj } from "@storybook/react-vite"
import Meter from "./Meter"

const meta = {
    title: "Atoms/Meter",
    component: Meter,
    args: { value: 62, max: 100, label: "Pressure on Boiler House 3 · compute node load", size: "md", animated: true },
    argTypes: {
        size: { control: "select", options: ["sm", "md"] },
        value: { control: { type: "range", min: 0, max: 100, step: 1 } }
    },
    render: (args) => (
        <div className="max-w-sm space-y-2">
            <div className="flex justify-between text-sm">
                <span>Boiler House 3 · compute node</span>
                <span>
                    {args.value} of {args.max ?? 100}
                </span>
            </div>
            <Meter {...args} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                component:
                    "A thin bar for how full something is: pressure on a building, coal spent against the budget, progress of a deploy. It is always a `progressbar` with a required `label`; show the number in text too, the bar alone is hard to read exactly."
            }
        }
    }
} satisfies Meta<typeof Meter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
    render: () => (
        <div className="max-w-sm space-y-4">
            <div className="space-y-1">
                <p className="text-sm">Coal spent this month · cost, 4,120 of 6,000</p>
                <Meter value={4120} max={6000} label="Coal spent this month · cost" />
            </div>
            <div className="space-y-1">
                <p className="text-sm">Airship loading · deploy, 3 of 8 crates</p>
                <Meter size="sm" value={3} max={8} label="Airship loading · deploy" />
            </div>
        </div>
    )
}

export const InATable: Story = {
    render: () => (
        <table className="w-full max-w-md text-sm">
            <caption className="sr-only">Pressure by building</caption>
            <thead>
                <tr>
                    <th scope="col" className="text-left font-medium">
                        Building
                    </th>
                    <th scope="col" className="w-40 text-left font-medium">
                        Pressure · load
                    </th>
                </tr>
            </thead>
            <tbody>
                {[
                    { name: "Boiler House 1 · compute node", value: 34 },
                    { name: "Boiler House 2 · compute node", value: 71 },
                    { name: "Vault · database", value: 92 }
                ].map((row) => (
                    <tr key={row.name}>
                        <td className="py-2 pr-4">{row.name}</td>
                        <td className="py-2">
                            <div className="flex items-center gap-2">
                                <Meter animated={false} value={row.value} label={`Pressure on ${row.name}`} />
                                <span>{row.value}%</span>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
