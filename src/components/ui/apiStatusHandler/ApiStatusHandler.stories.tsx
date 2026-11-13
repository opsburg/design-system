import type { Meta, StoryObj } from "@storybook/react-vite"
import { Alert, AlertDescription } from "../alert"
import { EmptyState } from "../emptyState"
import { ApiStatusHandler, type ApiStatusQuery } from "./ApiStatusHandler"

/** Plain objects shaped like the fields of a TanStack Query result that the handler reads. */
const loaded: ApiStatusQuery = { isEnabled: true, isLoading: false, isFetching: false, isPending: false, isError: false, data: { buildings: 3 } }
const loading: ApiStatusQuery = { isEnabled: true, isLoading: true, isFetching: true, isPending: true, isError: false, data: undefined }
const failed: ApiStatusQuery = {
    isEnabled: true,
    isLoading: false,
    isFetching: false,
    isPending: false,
    isError: true,
    error: new Error("Blackout at the foreign power plant: the US cloud provider answered 503 Service Unavailable."),
    data: undefined
}
const empty: ApiStatusQuery = { isEnabled: true, isLoading: false, isFetching: false, isPending: false, isError: false, data: null }

const CityContent = () => (
    <ul className="flex flex-col gap-1 text-sm">
        <li>Boiler House 3 · compute node</li>
        <li>Orders Factory · service</li>
        <li>Ledger Vault · database</li>
    </ul>
)

const meta = {
    title: "Components/ApiStatusHandler",
    component: ApiStatusHandler,
    args: { queries: [loaded], children: <CityContent /> },
    parameters: {
        docs: {
            description: {
                component:
                    "Wraps content that depends on one or more queries and shows loading, the first error or an empty state instead of it. Pass every query the content needs; a TanStack Query result fits as is. Override the default pieces when the page needs its own copy."
            }
        }
    }
} satisfies Meta<typeof ApiStatusHandler>

export default meta
type Story = StoryObj<typeof meta>

export const Loaded: Story = {}

export const Loading: Story = {
    args: { queries: [loaded, loading] }
}

export const ErrorState: Story = {
    args: { queries: [loaded, failed] }
}

export const ErrorWithoutMessage: Story = {
    args: { queries: [{ ...failed, error: { status: 503 } }], errorLabel: "The city lost power. Try again in a moment." }
}

export const Empty: Story = {
    args: { queries: [empty], emptyLabel: "No buildings in this district yet" }
}

export const CustomComponents: Story = {
    args: {
        queries: [failed],
        errorComponent: (error: unknown) => (
            <Alert variant="destructive">
                <AlertDescription>Storm in the city: {error instanceof Error ? error.message : "unknown incident"} The reserve line is taking the load.</AlertDescription>
            </Alert>
        ),
        emptyComponent: <EmptyState size="sm" titleAs="p" title="No airships yet" description="Launch the first deploy to see it here." />
    }
}

export const EmptyNotIntercepted: Story = {
    args: { queries: [empty], interceptEmpty: false }
}
