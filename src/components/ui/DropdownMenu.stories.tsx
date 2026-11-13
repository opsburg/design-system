import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronDown, Copy, Ellipsis, Pencil, Ship, Trash2, Wrench } from "lucide-react"
import * as React from "react"
import Button from "../atoms/button/Button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "./dropdown-menu"

/** Open overlays float over the page: in the docs they render in their own frame. */
const openInFrame = { docs: { story: { inline: false, height: "340px" } } }

const meta = {
    title: "Components/DropdownMenu",
    component: DropdownMenu,
    args: { defaultOpen: false, modal: true },
    argTypes: {
        defaultOpen: { control: "boolean" },
        modal: { control: "boolean" }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Gathers the secondary actions on one thing behind a single trigger, such as the row menu of a building. Keep the primary action visible as a button; group the items, verb first, and put destructive items last, after a separator."
            }
        }
    },
    render: args => (
        <DropdownMenu {...args}>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary">
                    Boiler House 3
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
                <DropdownMenuLabel>Boiler House 3 · compute node</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Wrench className="mr-2 size-4" />
                        Repair
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Pencil className="mr-2 size-4" />
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Copy className="mr-2 size-4" />
                        Copy node address
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <Ship className="mr-2 size-4" />
                        Launch airship (docking)
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 size-4" />
                    Demolish
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// The open stories use modal={false}: the menu is identical, but a modal menu hides the rest of the page from
// assistive tech, trigger included, which axe reports as focusable content inside aria-hidden.
export const Open: Story = {
    args: { defaultOpen: true, modal: false },
    parameters: openInFrame
}

export const IconTrigger: Story = {
    args: { defaultOpen: true, modal: false },
    parameters: openInFrame,
    render: args => (
        <DropdownMenu {...args}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Actions for Vault 2">
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Open in the Observatory</DropdownMenuItem>
                <DropdownMenuItem>Take a snapshot</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">Demolish Vault 2</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const CheckboxItems: Story = {
    args: { defaultOpen: true, modal: false },
    parameters: openInFrame,
    render: function Render(args) {
        const [shown, setShown] = React.useState({ boilerHouses: true, factories: true, vaults: false })
        return (
            <DropdownMenu {...args}>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary">
                        Show on the map
                        <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                    <DropdownMenuLabel>Buildings</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem checked={shown.boilerHouses} onCheckedChange={checked => setShown(s => ({ ...s, boilerHouses: checked === true }))}>
                        Boiler Houses · compute nodes
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={shown.factories} onCheckedChange={checked => setShown(s => ({ ...s, factories: checked === true }))}>
                        Factories · services
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={shown.vaults} onCheckedChange={checked => setShown(s => ({ ...s, vaults: checked === true }))}>
                        Vaults · databases
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
}

export const RadioItems: Story = {
    args: { defaultOpen: true, modal: false },
    parameters: openInFrame,
    render: function Render(args) {
        const [line, setLine] = React.useState("own-engine")
        return (
            <DropdownMenu {...args}>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary">
                        Power source
                        <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72">
                    <DropdownMenuLabel>Feed Boiler House 3 from</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={line} onValueChange={setLine}>
                        <DropdownMenuRadioItem value="own-engine">Own engine · infrastructure you control</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="foreign-plant">Foreign power plant · US cloud provider</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="reserve-line">Reserve line · failover</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
}

export const WithSubmenu: Story = {
    args: { defaultOpen: true, modal: false },
    parameters: openInFrame,
    render: args => (
        <DropdownMenu {...args}>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary">
                    Ledger Factory
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>Open logs</DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Assign an automaton</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem>Inspector · code review agent</DropdownMenuItem>
                        <DropdownMenuItem>Stoker · scaling agent</DropdownMenuItem>
                        <DropdownMenuItem>Night watch · on-call agent</DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
