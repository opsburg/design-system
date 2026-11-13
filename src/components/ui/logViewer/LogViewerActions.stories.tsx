import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import LogViewerActions from "./LogViewerActions"

const meta = {
    title: "Components/LogViewerActions",
    component: LogViewerActions,
    args: {
        lines: [
            { timestamp: "2026-11-13T08:14:04Z", content: "HTTP server listening on 0.0.0.0:8080" },
            { timestamp: "2026-11-13T08:16:50Z", content: "upstream api.us-provider.example unreachable, switching to failover engine.city.internal" }
        ],
        onRefresh: fn(),
        downloadFileName: "orders-be-7f9c.log"
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Refresh and download for a `LogViewer`, kept apart so the app can put them in the card header. Download saves the lines as a plain text file and is disabled when there is nothing to save."
            }
        }
    }
} satisfies Meta<typeof LogViewerActions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Refreshing: Story = {
    args: { refreshing: true }
}

export const NothingToDownload: Story = {
    args: { lines: [] }
}

export const CustomLabels: Story = {
    args: { refreshLabel: "Read the tape again", downloadLabel: "Save the tape" }
}
