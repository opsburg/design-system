import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { type EntityPickerLabels, EntityPickerList, type PickableEntity } from "./EntityPickerList"

const labels: EntityPickerLabels = {
    emptyTitle: "No cities yet",
    emptyDescription: "Found your first city to start building on infrastructure you control.",
    createNew: "Found a city",
    searchPlaceholder: "Search cities",
    noResults: "No city matches the search"
}

const cities: PickableEntity[] = [
    { _id: "brassport", name: "Brassport", description: "Production · own engine in Milan" },
    { _id: "cogsworth", name: "Cogsworth", description: "Staging · reserve line to eu-west-1" },
    { _id: "ironmere", name: "Ironmere", description: "Still on a foreign power plant · US cloud provider" }
]

const manyCities: PickableEntity[] = [
    ...cities,
    { _id: "steamhollow", name: "Steamhollow", description: "Data platform · three Ledger Vaults" },
    { _id: "gearford", name: "Gearford", description: "Automatons · AI agents sandbox" },
    { _id: "valvebury", name: "Valvebury", description: "Billing · coal ledger" },
    { _id: "pistonridge", name: "Pistonridge", description: "Edge · telegraph relays" },
    { _id: "copperfield", name: "Copperfield" }
]

const meta = {
    title: "Patterns/EntityPickerList",
    component: EntityPickerList,
    args: {
        items: cities,
        labels,
        activeId: "brassport",
        onSelect: fn(),
        onCreateNew: fn(),
        variant: "list"
    },
    argTypes: {
        variant: { control: "inline-radio", options: ["list", "grid"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Lets people pick one named entity, such as the city or the organization to work in, and create a new one. Use `list` in the switch dialog and `grid` on a full page. Above six entries a search box appears; the active entry is marked with a check, not by colour alone."
            }
        }
    },
    render: args => (
        <div className="max-w-md">
            <EntityPickerList {...args} />
        </div>
    )
} satisfies Meta<typeof EntityPickerList>

export default meta
type Story = StoryObj<typeof meta>

export const List: Story = {}

export const Grid: Story = {
    args: { variant: "grid" },
    render: args => (
        <div className="max-w-3xl">
            <EntityPickerList {...args} />
        </div>
    )
}

export const WithSearch: Story = {
    args: { items: manyCities, activeId: "gearford" }
}

export const InitialPick: Story = {
    args: { activeId: undefined, onCreateNew: undefined }
}

export const Empty: Story = {
    args: { items: [], activeId: undefined }
}
