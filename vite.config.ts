import { readdirSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
    plugins: [
        react(),
        dts({
            tsconfigPath: "./tsconfig.json",
            rollupTypes: false,
            copyDtsFiles: true,
            // Stories and the Storybook docs are not part of the published package
            exclude: ["src/**/*.stories.tsx", "src/docs/**"]
        }),
        {
            name: "copy-theme-css",
            apply: "build",
            generateBundle() {
                this.emitFile({
                    type: "asset",
                    fileName: "theme.css",
                    source: readFileSync(resolve(import.meta.dirname, "src/styles/theme.css"), "utf-8")
                })
                // theme.css loads the fonts from ./fonts, next to it in dist/
                const fontsDir = resolve(import.meta.dirname, "src/styles/fonts")
                for (const file of readdirSync(fontsDir)) {
                    this.emitFile({ type: "asset", fileName: `fonts/${file}`, source: readFileSync(resolve(fontsDir, file)) })
                }
                // Every token as data, for consumers that do not use Tailwind
                this.emitFile({
                    type: "asset",
                    fileName: "tokens.json",
                    source: readFileSync(resolve(import.meta.dirname, "src/tokens.json"), "utf-8")
                })
            }
        }
    ],
    resolve: {
        alias: {
            "@": resolve(import.meta.dirname, "./src")
        }
    },
    build: {
        lib: {
            entry: resolve(import.meta.dirname, "src/index.ts"),
            formats: ["es"],
            fileName: "index"
        },
        rollupOptions: {
            external: (id: string) => !id.startsWith(".") && !id.startsWith("/") && !id.startsWith("@/")
        },
        sourcemap: true,
        emptyOutDir: true
    }
})
