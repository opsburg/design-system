import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"

addons.setConfig({
    theme: create({
        base: "light",
        brandTitle: "Opsburg Design System",
        brandUrl: "https://github.com/opsburg/design-system",
        brandImage: "/assets/logo.png",
        brandTarget: "_self",
        colorPrimary: "#7E5A0F",
        colorSecondary: "#C9952A",
        appBg: "#FBF7EE",
        appContentBg: "#FFFDF8",
        appBorderColor: "#E4D7B8",
        textColor: "#0A1E35",
        barBg: "#FFFDF8",
        barSelectedColor: "#7E5A0F",
        fontBase: '"IBM Plex Sans", system-ui, sans-serif',
        fontCode: '"IBM Plex Mono", ui-monospace, monospace'
    })
})
