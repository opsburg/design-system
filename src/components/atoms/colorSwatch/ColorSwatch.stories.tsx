import type { Meta, StoryObj } from "@storybook/react-vite"
import ColorSwatch from "./ColorSwatch"

const meta = {
    title: "Atoms/ColorSwatch",
    component: ColorSwatch,
    args: { color: "#2f7d5b", title: "Colour of the Production district", size: "md" },
    argTypes: {
        size: { control: "select", options: ["sm", "md", "lg"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A round chip that shows a colour picked by the user, e.g. the colour of a district or an environment. The colour comes from the data, not from the theme. Always show the name in text too; pass `title` only when the chip stands alone."
            }
        }
    }
} satisfies Meta<typeof ColorSwatch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <ColorSwatch size="sm" color="#b5762a" title="Brass, small" />
            <ColorSwatch size="md" color="#b5762a" title="Brass, medium" />
            <ColorSwatch size="lg" color="#b5762a" title="Brass, large" />
        </div>
    )
}

export const NextToAName: Story = {
    render: () => (
        <ul className="space-y-2 text-sm">
            {[
                { name: "Production district", color: "#2f7d5b" },
                { name: "Staging district", color: "#b5762a" },
                { name: "Proving grounds · test", color: "#5b6bb5" }
            ].map((env) => (
                <li key={env.name} className="flex items-center gap-2">
                    <ColorSwatch color={env.color} />
                    {env.name}
                </li>
            ))}
        </ul>
    )
}
