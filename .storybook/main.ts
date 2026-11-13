import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
    addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
    framework: {
        name: "@storybook/react-vite",
        // A Vite config of its own: the library build (dts, theme copy) stays out of Storybook
        options: { builder: { viteConfigPath: ".storybook/vite.config.ts" } }
    },
    staticDirs: [{ from: "../docs/assets", to: "/assets" }],
    docs: { defaultName: "Docs" },
    core: { disableTelemetry: true }
}

export default config
