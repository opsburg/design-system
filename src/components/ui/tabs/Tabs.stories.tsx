import type { Meta, StoryObj } from "@storybook/react-vite"
import { Coins, Gauge, ScrollText } from "lucide-react"
import { TabsContent } from "./partials/tabsContent/tabsContent"
import { TabsList } from "./partials/tabsList/tabsList"
import { TabsTrigger } from "./partials/tabsTrigger/tabsTrigger"
import { Tabs, type TabsProps } from "./tabs"

const Panels = () => (
    <>
        <TabsContent value="pressure">
            <p className="text-sm">Pressure 62% · load across the three Boiler Houses · compute nodes.</p>
        </TabsContent>
        <TabsContent value="coal">
            <p className="text-sm">Coal this month · cost: 1,240 tons, 8% under the city budget.</p>
        </TabsContent>
        <TabsContent value="logs">
            <p className="text-sm">Airship 214 · deploy landed at 10:12. No storms · incidents in the last 24 hours.</p>
        </TabsContent>
    </>
)

const sizes: NonNullable<TabsProps["layoutSize"]>[] = ["sm", "default", "lg"]

const meta = {
    title: "Components/Tabs",
    component: Tabs,
    args: { defaultValue: "pressure", layoutSize: "default", tabsListPosition: "start", iconButtons: false, className: "max-w-2xl" },
    argTypes: {
        layoutSize: { control: "select", options: ["default", "sm", "lg"] },
        tabsListPosition: { control: "select", options: ["start", "end", "center", "fullWidth"] },
        iconButtons: { control: "boolean" }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Switches between views of the same thing without leaving the page, such as the pressure, coal and logs of a building. Keep labels short and parallel; when the views must be compared side by side, show them together instead."
            }
        }
    },
    render: args => (
        <Tabs {...args}>
            <TabsList aria-label="Boiler House 3 · compute node">
                <TabsTrigger value="pressure">Pressure</TabsTrigger>
                <TabsTrigger value="coal">Coal · cost</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>
            <Panels />
        </Tabs>
    )
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-6">
            {sizes.map(size => (
                <Tabs key={size} {...args} layoutSize={size}>
                    <TabsList aria-label={`Boiler House 3, ${size} tabs`}>
                        <TabsTrigger value="pressure">Pressure</TabsTrigger>
                        <TabsTrigger value="coal">Coal · cost</TabsTrigger>
                        <TabsTrigger value="logs">Logs</TabsTrigger>
                    </TabsList>
                    {/* Every trigger points at its panel with aria-controls: the panels must exist */}
                    <Panels />
                </Tabs>
            ))}
        </div>
    )
}

export const FullWidth: Story = {
    args: { tabsListPosition: "fullWidth" }
}

export const Centered: Story = {
    args: { tabsListPosition: "center" }
}

export const IconButtons: Story = {
    args: { iconButtons: true },
    parameters: {
        docs: { description: { story: "Icon-only triggers need an `aria-label` each: the icon alone gives the tab no name." } }
    },
    render: args => (
        <Tabs {...args}>
            <TabsList aria-label="Boiler House 3 · compute node">
                <TabsTrigger value="pressure" aria-label="Pressure">
                    <Gauge aria-hidden="true" />
                </TabsTrigger>
                <TabsTrigger value="coal" aria-label="Coal · cost">
                    <Coins aria-hidden="true" />
                </TabsTrigger>
                <TabsTrigger value="logs" aria-label="Logs">
                    <ScrollText aria-hidden="true" />
                </TabsTrigger>
            </TabsList>
            <Panels />
        </Tabs>
    )
}

export const WithIcons: Story = {
    render: args => (
        <Tabs {...args}>
            <TabsList aria-label="Boiler House 3 · compute node">
                <TabsTrigger value="pressure">
                    <Gauge aria-hidden="true" />
                    Pressure
                </TabsTrigger>
                <TabsTrigger value="coal">
                    <Coins aria-hidden="true" />
                    Coal · cost
                </TabsTrigger>
                <TabsTrigger value="logs">
                    <ScrollText aria-hidden="true" />
                    Logs
                </TabsTrigger>
            </TabsList>
            <Panels />
        </Tabs>
    )
}
