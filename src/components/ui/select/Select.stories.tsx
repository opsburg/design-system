import type { Meta, StoryObj } from "@storybook/react-vite"
import { SelectContent } from "./partials/selectContent/selectContent"
import { SelectControl } from "./partials/selectControl/selectControl"
import { SelectItem } from "./partials/selectItem/selectItem"
import { SelectLabel } from "./partials/selectLabel/selectLabel"
import { SelectSeparator } from "./partials/selectSeparator"
import { SelectTrigger } from "./partials/selectTrigger/selectTrigger"
import { Select, SelectGroup, SelectValue } from "./select"

const providers = [
    { value: "own-engine", label: "Own engine, Boiler House north" },
    { value: "second-plant", label: "Second foreign power plant" },
    { value: "none", label: "No reserve line" }
]

const ProviderItems = () => (
    <>
        {providers.map(provider => (
            <SelectItem key={provider.value} value={provider.value}>
                {provider.label}
            </SelectItem>
        ))}
    </>
)

const meta = {
    title: "Forms/Select",
    component: Select,
    args: { layoutSize: "default", fullWidth: true },
    argTypes: {
        layoutSize: { control: "select", options: ["default", "sm", "lg"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "The select primitives (Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator) for picking one option from a list too long for a RadioGroup. Wrap them in SelectControl, which ties label, help and error to the trigger; inside a react-hook-form form prefer SelectField."
            }
        }
    },
    render: args => (
        <SelectControl id="reserve-provider" label="Reserve provider" className="max-w-md">
            <Select {...args}>
                <SelectTrigger>
                    <SelectValue placeholder="Pick the failover" />
                </SelectTrigger>
                <SelectContent>
                    <ProviderItems />
                </SelectContent>
            </Select>
        </SelectControl>
    )
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
    args: { defaultValue: "own-engine" }
}

export const WithDescription: Story = {
    render: args => (
        <SelectControl id="reserve-provider-help" label="Reserve provider" description="Where the city draws power when the foreign power plant has a blackout." className="max-w-md">
            <Select {...args}>
                <SelectTrigger>
                    <SelectValue placeholder="Pick the failover" />
                </SelectTrigger>
                <SelectContent>
                    <ProviderItems />
                </SelectContent>
            </Select>
        </SelectControl>
    )
}

export const Disabled: Story = {
    args: { disabled: true, defaultValue: "second-plant" },
    render: args => (
        <SelectControl id="reserve-provider-disabled" label="Reserve provider" className="max-w-md">
            <Select {...args}>
                <SelectTrigger>
                    <SelectValue placeholder="Pick the failover" />
                </SelectTrigger>
                <SelectContent>
                    <ProviderItems />
                </SelectContent>
            </Select>
        </SelectControl>
    )
}

export const Required: Story = {
    args: { required: true },
    render: args => (
        <SelectControl id="reserve-provider-required" label="Reserve provider" required className="max-w-md">
            <Select {...args}>
                <SelectTrigger>
                    <SelectValue placeholder="Pick the failover" />
                </SelectTrigger>
                <SelectContent>
                    <ProviderItems />
                </SelectContent>
            </Select>
        </SelectControl>
    )
}

export const WithError: Story = {
    args: { defaultValue: "none" },
    render: args => (
        <SelectControl id="reserve-provider-error" label="Reserve provider" error="Without a reserve line the next blackout stops every automaton." className="max-w-md">
            <Select {...args}>
                <SelectTrigger aria-invalid className="border-destructive focus-visible:ring-destructive">
                    <SelectValue placeholder="Pick the failover" />
                </SelectTrigger>
                <SelectContent>
                    <ProviderItems />
                </SelectContent>
            </Select>
        </SelectControl>
    )
}

export const Grouped: Story = {
    render: args => (
        <SelectControl id="automaton-model" label="AI model for the automatons" className="max-w-md">
            <Select {...args}>
                <SelectTrigger>
                    <SelectValue placeholder="Pick a model" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Own engine</SelectLabel>
                        <SelectItem value="open-weights-large">Open-weights model, large</SelectItem>
                        <SelectItem value="open-weights-small">Open-weights model, small</SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                        <SelectLabel>Foreign power plants</SelectLabel>
                        <SelectItem value="provider-a">Hosted model, provider A</SelectItem>
                        <SelectItem value="provider-b" disabled>
                            Hosted model, provider B (in blackout)
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </SelectControl>
    )
}
