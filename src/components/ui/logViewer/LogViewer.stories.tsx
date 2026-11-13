import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { fn } from "storybook/test"
import { Card, CardContent, CardHeader, CardTitle } from "../card"
import type { LogViewerLine } from "./LogLine"
import LogViewer, { type ILogViewerProps } from "./LogViewer"
import LogViewerActions from "./LogViewerActions"

const plainLines: LogViewerLine[] = [
    { timestamp: "2026-11-13T08:14:02Z", content: "Starting orders-be v2.14.3 (commit 9b2f1c4) on node boiler-house-3" },
    { timestamp: "2026-11-13T08:14:02Z", content: "Loaded config from /etc/orders-be/config.yaml (profile=prod)" },
    { timestamp: "2026-11-13T08:14:03Z", content: "Connected to postgres ledger-vault.city.internal:5432/orders (pool=20)" },
    { timestamp: "2026-11-13T08:14:03Z", content: "Connected to redis cache.city.internal:6379 (db=2)" },
    { timestamp: "2026-11-13T08:14:04Z", content: "HTTP server listening on 0.0.0.0:8080" },
    { timestamp: "2026-11-13T08:14:11Z", content: "GET /healthz 200 1.2ms" },
    { timestamp: "2026-11-13T08:15:47Z", content: "POST /v1/orders 201 48.7ms order_id=ord_81f2c" },
    { timestamp: "2026-11-13T08:16:20Z", content: "upstream api.us-provider.example timed out after 30000ms, retrying (1/3)" },
    { timestamp: "2026-11-13T08:16:50Z", content: "upstream api.us-provider.example unreachable, switching to failover engine.city.internal" },
    { timestamp: "2026-11-13T08:16:51Z", content: "POST /v1/orders 201 212.4ms order_id=ord_81f2d via=failover" }
]

const jsonLines: LogViewerLine[] = [
    { timestamp: "2026-11-13T08:14:04Z", content: '{"level":30,"time":1794730444000,"pid":1,"hostname":"orders-be-7f9c","msg":"server listening","port":8080}' },
    { timestamp: "2026-11-13T08:15:47Z", content: '{"level":30,"msg":"order created","orderId":"ord_81f2c","durationMs":48.7}' },
    { timestamp: "2026-11-13T08:16:20Z", content: '{"level":40,"msg":"upstream timeout","upstream":"api.us-provider.example","attempt":1,"timeoutMs":30000}' },
    { timestamp: "2026-11-13T08:16:50Z", content: '{"level":50,"msg":"upstream unreachable","upstream":"api.us-provider.example","err":"ECONNRESET"}' },
    { timestamp: "2026-11-13T08:16:51Z", content: '{"level":"debug","msg":"failover engaged","target":"engine.city.internal","agent":"automaton-7"}' },
    { timestamp: "2026-11-13T08:16:51Z", content: "plain text from a library that does not write JSON" }
]

/** Follow and number of lines belong to the app: here they live in local state. */
const StatefulLogViewer = (props: ILogViewerProps) => {
    const [tailLines, setTailLines] = useState(props.tailLines)
    const [follow, setFollow] = useState(props.follow)

    return (
        <LogViewer
            {...props}
            tailLines={tailLines}
            onTailLinesChange={value => {
                setTailLines(value)
                props.onTailLinesChange(value)
            }}
            follow={follow}
            onFollowChange={value => {
                setFollow(value)
                props.onFollowChange(value)
            }}
        />
    )
}

const meta = {
    title: "Components/LogViewer",
    component: LogViewer,
    args: {
        lines: plainLines,
        tailLines: 100,
        tailOptions: [100, 500, 1000, 5000],
        onTailLinesChange: fn(),
        follow: true,
        onFollowChange: fn(),
        outputLabel: "Telegraph tape · logs of orders-be",
        filterPlaceholder: "e.g. failover"
    },
    parameters: {
        docs: {
            description: {
                component:
                    "The telegraph tape of a building: the log lines of a service with a line count, a filter, follow and JSON formatting. It reads nothing by itself: lines, loading and error come from the app, and refresh and download live in `LogViewerActions`, usually in the card header."
            }
        }
    },
    render: args => <StatefulLogViewer {...args} />
} satisfies Meta<typeof LogViewer>

export default meta
type Story = StoryObj<typeof meta>

export const PlainText: Story = {}

export const JsonLines: Story = {
    args: { lines: jsonLines, formatJsonHint: "Reads JSON lines as level, message and fields; click a line to open the whole object." }
}

export const InACardWithActions: Story = {
    render: args => (
        <Card className="max-w-3xl">
            <CardHeader className="flex-row items-center justify-between gap-3">
                <CardTitle as="h2" className="mb-0">
                    Orders Factory · service
                </CardTitle>
                <LogViewerActions lines={args.lines} onRefresh={fn()} downloadFileName="orders-be-7f9c.log" />
            </CardHeader>
            <CardContent className="pt-3">
                <StatefulLogViewer {...args} />
            </CardContent>
        </Card>
    )
}

export const Loading: Story = {
    args: { lines: [], pending: true, loadingLabel: "Reading the telegraph tape…" }
}

export const Empty: Story = {
    args: { lines: [], emptyLabel: "No lines yet: the airship has not landed." }
}

export const ErrorState: Story = {
    args: { lines: [], error: "Could not read the logs: pod orders-be-7f9c is in CrashLoopBackOff." }
}

export const Refreshing: Story = {
    args: { placeholder: true }
}
