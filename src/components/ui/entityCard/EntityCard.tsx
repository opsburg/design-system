import * as React from "react"
import { cn } from "@/utils/styleUtils"
import { type TestIdProps } from "@/utils/testIdUtils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card"

export interface IEntityCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, TestIdProps {
    /** Il nome dell'entità: troncato su una riga, intero nel tooltip */
    name: string
    /** Riga sotto il nome, di norma lo slug: troncata come il nome */
    subtitle?: string
    /** Tag del nome: va scelto in base ai titoli già presenti nella pagina */
    nameAs?: "h2" | "h3" | "h4"
    /** Logo prima del nome, es. quello della tecnologia */
    logo?: React.ReactNode
    /** In alto a destra, impilati: versione, tipo, runtime */
    badges?: React.ReactNode
    /** Sotto lo slug, es. gli agenti che ci stanno lavorando */
    status?: React.ReactNode
    /** L'azione principale, a tutta larghezza */
    primaryAction?: React.ReactNode
    /**
     * Le azioni secondarie, sulla stessa riga finché le etichette ci stanno intere: quando non ci stanno
     * ognuna va a capo a tutta larghezza invece di uscire dal bordo del bottone.
     */
    actions?: React.ReactNode
    /** In coda alle azioni, a tutta larghezza, es. il popover per clonare la repository */
    footer?: React.ReactNode
    id?: string
}

/**
 * Card di un'entità di una griglia (dominio, frontend, backend): nome, slug e badge in testa, i dettagli
 * nel corpo e le azioni in fondo. Il corpo si allunga, così in una griglia le azioni stanno tutte alla stessa
 * altezza anche quando le card hanno dettagli diversi.
 */
export const EntityCard = React.forwardRef<HTMLDivElement, IEntityCardProps>(
    ({ name, subtitle, nameAs = "h3", logo, badges, status, primaryAction, actions, footer, children, className, id, dataTestId, ...props }, ref) => {
        const hasFooter = Boolean(primaryAction || actions || footer)

        return (
            <Card ref={ref} {...props} id={id} className={cn("flex h-full flex-col transition-colors duration-200 hover:border-primary", className)} dataTestId={dataTestId}>
                <CardHeader className="flex-row items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-center gap-2">
                            {logo}
                            <CardTitle as={nameAs} className="mb-0 truncate" title={name}>
                                {name}
                            </CardTitle>
                        </div>
                        {subtitle && (
                            <p className="truncate text-sm text-foreground-secondary" title={subtitle}>
                                {subtitle}
                            </p>
                        )}
                        {status && <div className="mt-2 max-w-full">{status}</div>}
                    </div>
                    {badges && <div className="flex shrink-0 flex-col items-end gap-1.5">{badges}</div>}
                </CardHeader>
                <CardContent className="flex flex-grow flex-col gap-3 py-3 text-sm">{children}</CardContent>
                {hasFooter && (
                    <CardFooter className="flex-col items-stretch gap-2 border-t border-divider pt-3">
                        {primaryAction}
                        {actions && <div className="flex flex-wrap gap-2 *:flex-auto">{actions}</div>}
                        {footer}
                    </CardFooter>
                )}
            </Card>
        )
    }
)

EntityCard.displayName = "EntityCard"

export default EntityCard
