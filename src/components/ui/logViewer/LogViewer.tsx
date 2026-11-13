import * as React from "react"
import { useEffect, useId, useMemo, useRef, useState } from "react"
import Spinner from "@/components/Spinner"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input/input"
import { Label } from "@/components/ui/label"
import { SelectContent } from "@/components/ui/select/partials/selectContent/selectContent"
import { SelectItem } from "@/components/ui/select/partials/selectItem/selectItem"
import { SelectTrigger } from "@/components/ui/select/partials/selectTrigger/selectTrigger"
import { Select, SelectValue } from "@/components/ui/select/select"
import { cn } from "@/utils/styleUtils"
import { LogLine, type LogViewerLine } from "./LogLine"

/** Il filtro parte quando la digitazione si ferma */
const FILTER_DEBOUNCE_MS = 400

export interface ILogViewerProps {
    lines: LogViewerLine[]
    /** Selettori dell'app (applicazione, ambiente, pod, ...), in testa alla riga della toolbar */
    selectors?: React.ReactNode
    /** Checkbox aggiuntive dell'app, dopo "follow" e "format JSON" */
    toggles?: React.ReactNode
    tailLines: number
    tailOptions: number[]
    onTailLinesChange: (tailLines: number) => void
    tailLabel?: string
    /** Testo di un'opzione del numero di righe, es. `count => \`${count} lines\`` */
    tailOptionLabel?: (count: number) => string
    /**
     * Chiamata col filtro già ripulito dagli spazi, quando la digitazione si ferma: l'app lo applica (es. il server).
     * Senza, il filtro si applica qui, alle righe ricevute, senza distinguere maiuscole e minuscole.
     */
    onFilterChange?: (filter: string) => void
    filterLabel?: string
    filterPlaceholder?: string
    follow: boolean
    onFollowChange: (follow: boolean) => void
    followLabel?: string
    formatJsonLabel?: string
    /** Spiegazione di "format JSON", mostrata come title della label */
    formatJsonHint?: string
    /** Nome accessibile dell'area delle righe */
    outputLabel?: string
    /** Testo dell'area quando non c'è nessuna riga */
    emptyLabel?: string
    /** Testo dell'area quando il filtro applicato qui non lascia nessuna delle righe ricevute */
    noMatchLabel?: string
    /** Testo annunciato dagli screen reader durante il primo caricamento */
    loadingLabel?: string
    /** Mostrato con role="alert" al posto delle righe */
    error?: string
    /** Primo caricamento: uno spinner al posto delle righe */
    pending?: boolean
    /** Le righe mostrate sono quelle di prima, mentre arrivano le nuove: l'area resta, attenuata, e non salta */
    placeholder?: boolean
    /** Nasconde l'area delle righe quando l'app non ha ancora niente da leggere (es. nessun pod) */
    showOutput?: boolean
    className?: string
    /** Prefisso dei test id: `<prefix>-tail`, `<prefix>-filter`, `<prefix>-follow`, `<prefix>-format-json`, `<prefix>-output` */
    dataTestId?: string
}

/**
 * Il corpo di un visualizzatore di log: toolbar (selettori dell'app, righe da leggere, filtro), opzioni
 * (follow, format JSON e quelle dell'app) e l'area delle righe, che scorre sempre sull'ultima.
 *
 * Non legge niente da sé: le righe, il loro stato e le scelte di follow e numero di righe arrivano dall'app;
 * aggiorna e scarica stanno in `LogViewerActions`, che l'app mette dove vuole (di solito nell'header della card).
 */
export const LogViewer: React.FC<ILogViewerProps> = ({
    lines,
    selectors,
    toggles,
    tailLines,
    tailOptions,
    onTailLinesChange,
    tailLabel = "Lines",
    tailOptionLabel = count => `${count} lines`,
    onFilterChange,
    filterLabel = "Filter",
    filterPlaceholder,
    follow,
    onFollowChange,
    followLabel = "Follow",
    formatJsonLabel = "Format JSON",
    formatJsonHint,
    outputLabel = "Logs",
    emptyLabel = "No lines",
    noMatchLabel = "No line matches the filter",
    loadingLabel = "Loading…",
    error,
    pending = false,
    placeholder = false,
    showOutput = true,
    className,
    dataTestId
}) => {
    const id = useId()
    const [filterDraft, setFilterDraft] = useState("")
    const [filter, setFilter] = useState("")
    const [formatJson, setFormatJson] = useState(true)
    const outputRef = useRef<HTMLDivElement>(null)
    // In un ref: una callback nuova a ogni render dell'app non deve far ripartire l'attesa del filtro
    const onFilterChangeRef = useRef(onFilterChange)
    onFilterChangeRef.current = onFilterChange
    const testId = (suffix: string) => dataTestId && `${dataTestId}-${suffix}`

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilter(filterDraft.trim())
            onFilterChangeRef.current?.(filterDraft.trim())
        }, FILTER_DEBOUNCE_MS)
        return () => clearTimeout(timeout)
    }, [filterDraft])

    const filtersHere = !onFilterChange
    // Lo stesso array finché righe e filtro non cambiano: lo scorrimento sull'ultima riga parte solo allora
    const shownLines = useMemo(() => {
        if (!filtersHere || !filter) return lines
        const needle = filter.toLowerCase()
        return lines.filter(line => line.content.toLowerCase().includes(needle))
    }, [lines, filter, filtersHere])

    // L'ultima riga in vista, come un terminale che segue un log
    useEffect(() => {
        if (shownLines.length > 0 && outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
    }, [shownLines])

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            <div className="flex flex-wrap items-end gap-3">
                {selectors}
                <div className="flex flex-col gap-1">
                    <Label htmlFor={`${id}-tail`}>{tailLabel}</Label>
                    <Select layoutSize="sm" value={String(tailLines)} onValueChange={value => onTailLinesChange(Number(value))}>
                        <SelectTrigger id={`${id}-tail`} className="w-40" dataTestId={testId("tail")}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {tailOptions.map(option => (
                                <SelectItem key={option} value={String(option)}>
                                    {tailOptionLabel(option)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex min-w-48 flex-1 flex-col gap-1">
                    <Label htmlFor={`${id}-filter`}>{filterLabel}</Label>
                    <Input
                        id={`${id}-filter`}
                        value={filterDraft}
                        placeholder={filterPlaceholder}
                        onChange={event => setFilterDraft(event.target.value)}
                        maxLength={200}
                        fullWidth
                        dataTestId={testId("filter")}
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <Checkbox id={`${id}-follow`} checked={follow} onCheckedChange={checked => onFollowChange(checked === true)} dataTestId={testId("follow")} />
                    <Label htmlFor={`${id}-follow`} className="cursor-pointer">
                        {followLabel}
                    </Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id={`${id}-json`} checked={formatJson} onCheckedChange={checked => setFormatJson(checked === true)} dataTestId={testId("format-json")} />
                    <Label htmlFor={`${id}-json`} className="cursor-pointer" title={formatJsonHint}>
                        {formatJsonLabel}
                    </Label>
                </div>
                {toggles}
            </div>
            {error ? (
                <p className="text-sm text-destructive" role="alert">
                    {error}
                </p>
            ) : (
                showOutput &&
                (pending ? (
                    <div className="flex min-h-[96px] items-center justify-center">
                        <Spinner size={24} centerScreen={false} label={loadingLabel} />
                    </div>
                ) : (
                    // Un div, non un pre: una riga JSON formattata si apre come elemento details
                    <div
                        ref={outputRef}
                        role="log"
                        className={cn("max-h-[480px] min-h-[96px] overflow-auto rounded-md bg-muted p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-all", placeholder && "opacity-60")}
                        aria-label={outputLabel}
                        data-testid={testId("output")}
                    >
                        {shownLines.length === 0 ? (lines.length === 0 ? emptyLabel : noMatchLabel) : shownLines.map((line, index) => <LogLine key={index} line={line} formatJson={formatJson} />)}
                    </div>
                ))
            )}
        </div>
    )
}

export default LogViewer
