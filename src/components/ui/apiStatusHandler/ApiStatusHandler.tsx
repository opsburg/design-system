import type { ReactNode } from "react"
import Spinner from "@/components/Spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EmptyState } from "@/components/ui/emptyState"

/** The little of a query the handler reads: a `UseQueryResult` of TanStack Query fits it as is. */
export interface ApiStatusQuery {
    isLoading?: boolean
    isFetching?: boolean
    isPending?: boolean
    isEnabled?: boolean
    isError?: boolean
    error?: unknown
    data?: unknown
}

export interface IApiStatusHandlerProps {
    queries: ApiStatusQuery[]
    loadingComponent?: ReactNode
    errorComponent?: (error: unknown) => ReactNode
    emptyComponent?: ReactNode
    children: ReactNode
    interceptError?: boolean
    interceptEmpty?: boolean
    /** The text of the default empty state */
    emptyLabel?: string
    /** The text of the default error, when the error is no `Error` with its own message */
    errorLabel?: string
}

/** Loading, error, empty or the content, from the state of the queries the content needs. */
export const ApiStatusHandler: React.FC<IApiStatusHandlerProps> = ({
    queries,
    children,
    emptyLabel = "No data",
    errorLabel = "Something went wrong",
    loadingComponent = (
        <div className="flex items-center justify-center min-h-[200px]">
            <Spinner size={32} />
        </div>
    ),
    errorComponent = (error: unknown) => (
        <Alert variant="destructive">
            <AlertDescription>{error instanceof Error ? error.message : errorLabel}</AlertDescription>
        </Alert>
    ),
    emptyComponent = <EmptyState size="sm" description={emptyLabel} />,
    interceptError = true,
    interceptEmpty = true
}) => {
    const isLoading = queries.some(query => (query.isLoading || query.isFetching || query.isPending) && query.isEnabled)
    const error = interceptError ? queries.find(query => query.isError)?.error : undefined
    const isEmpty = interceptEmpty ? queries.some(query => query.data === undefined || query.data === null) : false

    if (isLoading) {
        return <>{loadingComponent}</>
    }

    if (error) {
        return <>{errorComponent(error)}</>
    }

    if (isEmpty) {
        return <>{emptyComponent}</>
    }

    return <>{children}</>
}
