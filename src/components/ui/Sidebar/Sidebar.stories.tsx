import type { Meta, StoryObj } from "@storybook/react-vite"
import { BookOpen, Coins, Database, Factory, Flame, LifeBuoy, Map as MapIcon, Rocket, Telescope } from "lucide-react"
import * as React from "react"
import { fn } from "storybook/test"
import { Sidebar, type SidebarNavItemProps } from "./Sidebar"

const mainNavItems: SidebarNavItemProps[] = [
    { name: "City map", path: "#city-map", icon: <MapIcon aria-hidden="true" />, active: true },
    { name: "Boiler Houses · compute", path: "#boiler-houses", icon: <Flame aria-hidden="true" /> },
    { name: "Factories · services", path: "#factories", icon: <Factory aria-hidden="true" /> },
    { name: "Vaults · databases", path: "#vaults", icon: <Database aria-hidden="true" /> },
    { name: "Airships · deploys", path: "#airships", icon: <Rocket aria-hidden="true" /> },
    { name: "Observatory · monitoring", path: "#observatory", icon: <Telescope aria-hidden="true" /> },
    { name: "Ledger · costs", path: "#ledger", icon: <Coins aria-hidden="true" />, disabled: true }
]

const secondaryNavItems: SidebarNavItemProps[] = [
    { name: "Field manual", path: "#field-manual", icon: <BookOpen aria-hidden="true" /> },
    { name: "Call the engineers", icon: <LifeBuoy aria-hidden="true" />, action: fn() }
]

/** A brand mark of the story's own: the default square shows letters that are not the product's. */
const logo = (
    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary font-bold text-primary-foreground" aria-hidden="true">
        O
    </div>
)

const meta = {
    title: "Patterns/Sidebar",
    component: Sidebar,
    args: {
        id: "story-sidebar",
        title: "Brassport",
        logo,
        mainNavItems,
        secondaryNavItems,
        isCollapsed: false,
        toggleCollapsed: fn(),
        mainNavLabel: "City",
        secondaryNavLabel: "Help",
        footer: ({ isCollapsed }) => (isCollapsed ? <span className="sr-only">Signed in as the mayor</span> : <p className="px-3 py-2 text-sm text-foreground-secondary">Signed in as the mayor</p>)
    },
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "The app's main navigation: one entry per district of the city, the current one marked with `active`, help links below and the user's slot at the bottom. Pass `renderLink` to route through the app's router; the collapsed state keeps every label for screen readers."
            }
        }
    },
    decorators: [
        Story => (
            <div className="min-h-[640px]">
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Collapsed: Story = {
    args: { isCollapsed: true }
}

export const Collapsible: Story = {
    parameters: {
        docs: { description: { story: "The page owns the collapsed state; the toggle at the bottom edge shows on hover and on keyboard focus." } }
    },
    render: function Render(args) {
        const [collapsed, setCollapsed] = React.useState(false)
        return (
            <div className="flex gap-4">
                <div className="shrink-0">
                    <Sidebar
                        {...args}
                        isCollapsed={collapsed}
                        toggleCollapsed={() => {
                            args.toggleCollapsed?.()
                            setCollapsed(c => !c)
                        }}
                    />
                </div>
                <main id="main_content" className="flex-1 p-4">
                    <h1 className="text-2xl font-bold">City map</h1>
                    <p className="text-primary-strong">Three Boiler Houses, five Factories and two Vaults on your own engine.</p>
                </main>
            </div>
        )
    }
}

export const WithSecondaryContent: Story = {
    args: {
        secondaryContent: ({ isCollapsed }) =>
            isCollapsed ? null : (
                <p className="px-3 py-1 text-sm text-foreground-secondary">
                    Day shift · <span className="font-medium text-foreground">all boilers lit</span>
                </p>
            )
    }
}

export const MainNavigationOnly: Story = {
    args: { secondaryNavItems: undefined, footer: undefined }
}

export const WithRouterLink: Story = {
    args: {
        renderLink: ({ href, className, children, onClick }) => (
            <a href={href} className={className} onClick={onClick} aria-current={href === "#city-map" ? "page" : undefined}>
                {children}
            </a>
        )
    },
    parameters: {
        docs: {
            description: {
                story: "With `renderLink` the router link renders the main items. It does not receive the active state, so it has to set `aria-current` on the current page itself."
            }
        }
    }
}
