import type { Decorator, Preview } from "@storybook/react-vite"
import { useEffect } from "react"
import { TooltipProvider } from "../src/components/ui/tooltip"
import "./storybook.css"

/** Day and Night: the theme lives on <html>, as in the apps that consume the system. */
const withTheme: Decorator = (Story, context) => {
    const dark = context.globals.theme === "dark"
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark)
    }, [dark])
    return (
        <TooltipProvider>
            <div className="bg-background p-6 text-foreground">
                <Story />
            </div>
        </TooltipProvider>
    )
}

const preview: Preview = {
    decorators: [withTheme],
    globalTypes: {
        theme: {
            description: "Theme",
            toolbar: {
                title: "Theme",
                icon: "mirror",
                items: [
                    { value: "light", title: "Day", icon: "sun" },
                    { value: "dark", title: "Night", icon: "moon" }
                ],
                dynamicTitle: true
            }
        }
    },
    initialGlobals: { theme: "light" },
    parameters: {
        layout: "fullscreen",
        controls: { expanded: true, matchers: { color: /(background|color)$/i } },
        // Accessibility: every story is checked with axe; a violation is an error, not a warning
        a11y: { test: "error" },
        options: {
            storySort: { order: ["Introduction", "Foundations", "Atoms", "Components", "Forms", "Patterns"] }
        }
    },
    tags: ["autodocs"]
}

export default preview
