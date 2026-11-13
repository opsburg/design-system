import { Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/atoms"
import { cn } from "@/utils/styleUtils"
import type { LogViewerLine } from "./LogLine"

export interface ILogViewerActionsProps {
    /** Le righe scaricate dal bottone di download; senza righe il bottone è disabilitato */
    lines: LogViewerLine[]
    onRefresh: () => void
    /** Durante una lettura l'icona gira e il bottone di aggiornamento è disabilitato */
    refreshing?: boolean
    /** Nome del file scaricato, es. `orders-be-7f9c.log` */
    downloadFileName: string
    refreshLabel?: string
    downloadLabel?: string
    className?: string
    /** Prefisso dei test id: `<prefix>-refresh` e `<prefix>-download` */
    dataTestId?: string
}

const lineText = (line: LogViewerLine) => (line.timestamp ? `${line.timestamp} ${line.content}` : line.content)

/** Aggiorna e scarica le righe di un `LogViewer`: separati dal corpo perché l'app li mette nell'header della card. */
export const LogViewerActions: React.FC<ILogViewerActionsProps> = ({
    lines,
    onRefresh,
    refreshing = false,
    downloadFileName,
    refreshLabel = "Refresh",
    downloadLabel = "Download",
    className,
    dataTestId
}) => {
    const download = () => {
        const url = URL.createObjectURL(new Blob([lines.map(lineText).join("\n")], { type: "text/plain" }))
        const link = document.createElement("a")
        link.href = url
        link.download = downloadFileName
        link.click()
        // Revocato quando il browser ha già avviato il download: subito, alcuni lo annullano
        setTimeout(() => URL.revokeObjectURL(url), 1_000)
    }

    return (
        <div className={cn("flex shrink-0 gap-2", className)}>
            <Button variant="secondary" size="sm" onClick={onRefresh} disabled={refreshing} aria-label={refreshLabel} dataTestId={dataTestId && `${dataTestId}-refresh`}>
                <RefreshCw className={refreshing ? "animate-spin" : undefined} />
                {refreshLabel}
            </Button>
            <Button variant="secondary" size="sm" onClick={download} disabled={lines.length === 0} aria-label={downloadLabel} dataTestId={dataTestId && `${dataTestId}-download`}>
                <Download />
                {downloadLabel}
            </Button>
        </div>
    )
}

export default LogViewerActions
