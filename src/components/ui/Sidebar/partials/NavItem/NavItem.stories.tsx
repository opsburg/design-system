import type { Meta, StoryObj } from "@storybook/react-vite"
import { BookOpen, Coins, Factory, Flame, LifeBuoy, Map as MapIcon, Telescope } from "lucide-react"
import { fn } from "storybook/test"
import { NavItem } from "./NavItem"

const meta = {
    title: "Patterns/NavItem",
    component: NavItem,
    args: {
        type: "main",
        name: "Observatory · monitoring",
        href: "#observatory",
        icon: <Telescope aria-hidden="true" />,
        active: false,
        disabled: false,
        isSidebarCollapsed: false
    },
    argTypes: {
        type: { control: "select", options: ["main", "secondary"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "One entry of the Sidebar. A main item is a link to a district of the city; a secondary item is a help link that opens in a new tab, or a button when it has an `action` and no `href`. Mark the current page with `active`, which also sets `aria-current`. Use it through Sidebar; render it alone only inside a `nav`."
            }
        }
    },
    decorators: [
        Story => (
            <nav aria-label="City" className="flex w-64 flex-col gap-1 rounded-md border-2 border-sidebar-border bg-sidebar p-3">
                <Story />
            </nav>
        )
    ]
} satisfies Meta<typeof NavItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const States: Story = {
    render: () => (
        <>
            <NavItem href="#city-map" name="City map" icon={<MapIcon aria-hidden="true" />} active />
            <NavItem href="#factories" name="Factories · services" icon={<Factory aria-hidden="true" />} />
            <NavItem href="#ledger" name="Ledger · costs (locked)" icon={<Coins aria-hidden="true" />} disabled />
        </>
    ),
    parameters: {
        docs: { description: { story: "Active, default and disabled. A disabled item drops its `href`, so it leaves the tab order." } }
    }
}

export const Collapsed: Story = {
    args: { isSidebarCollapsed: true },
    decorators: [
        Story => (
            <div className="w-20">
                <Story />
            </div>
        )
    ],
    parameters: {
        docs: { description: { story: "In a collapsed sidebar only the icon shows; the name stays for screen readers." } }
    }
}

export const Secondary: Story = {
    render: () => (
        <>
            <NavItem type="secondary" href="#field-manual" name="Field manual" icon={<BookOpen aria-hidden="true" />} />
            <NavItem type="secondary" name="Call the engineers" icon={<LifeBuoy aria-hidden="true" />} action={fn()} />
        </>
    )
}

export const WithRenderLink: Story = {
    args: {
        name: "Boiler Houses · compute",
        href: "#boiler-houses",
        icon: <Flame aria-hidden="true" />,
        active: true,
        renderLink: ({ href, className, children, onClick }) => (
            <a href={href} className={className} onClick={onClick} aria-current="page">
                {children}
            </a>
        )
    },
    parameters: {
        docs: {
            description: {
                story: "`renderLink` hands the markup to the app's router link. It receives only `href`, `className`, `children` and `onClick`: the router link has to set `aria-current` itself."
            }
        }
    }
}
