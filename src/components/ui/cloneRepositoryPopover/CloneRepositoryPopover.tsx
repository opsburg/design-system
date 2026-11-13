import { Code, ExternalLink, Terminal } from "lucide-react"
import type * as React from "react"
import { Button } from "@/components/atoms/button/Button"
import { CopyButton } from "@/components/atoms/copyButton/CopyButton"
import { buildGitCloneCommand, buildIntelliJCloneUrl, buildVsCodeCloneUrl } from "@/utils/repositoryCloneUrls"
import { cn } from "@/utils/styleUtils"
import { type TestIdProps } from "@/utils/testIdUtils"
import { Popover, PopoverContent, PopoverTrigger } from "../popover"

export interface ICloneRepositoryLabels {
    title: string
    description: string
    https: string
    ssh: string
    vscode: string
    intellij: string
    openWeb: string
}

const DEFAULT_LABELS: ICloneRepositoryLabels = {
    title: "Clone repository",
    description: "Copy the clone command or open the repository straight in VS Code or IntelliJ IDEA.",
    https: "Clone over HTTPS",
    ssh: "Clone over SSH",
    vscode: "Clone with VS Code",
    intellij: "Clone with IntelliJ IDEA",
    openWeb: "Open the repository"
}

export interface ICloneRepositoryPopoverProps extends TestIdProps {
    /** Il trigger del popover, passato con `asChild`: deve inoltrare ref e props, come un Button */
    children: React.ReactNode
    httpsUrl?: string
    sshUrl?: string
    /** La pagina della repository sul provider: senza, il link in fondo non c'è */
    webUrl?: string
    labels?: Partial<ICloneRepositoryLabels>
    align?: "start" | "center" | "end"
    className?: string
}

const CloneUrlRow: React.FC<{ label: string; url: string }> = ({ label, url }) => (
    <div className="flex flex-col gap-1">
        {/* Negli appunti finisce il comando completo, mentre il bottone mostra solo l'url */}
        <CopyButton value={buildGitCloneCommand(url)} label={label} copiedLabel={label} showLabel variant="secondary" size="sm" className="w-full justify-start" title={url} />
        <p className="truncate font-mono text-xs text-foreground-secondary" title={url}>
            {url}
        </p>
    </div>
)

const PopoverLinkButton: React.FC<{ label: string; href: string; icon: React.ReactNode; variant: "primary" | "secondary" | "ghost"; external?: boolean }> = ({
    label,
    href,
    icon,
    variant,
    external = false
}) => (
    <Button asChild variant={variant} size="sm" className="w-full justify-start">
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
            {icon}
            <span className="truncate">{label}</span>
        </a>
    </Button>
)

/**
 * Popover per clonare una repository: copia del comando di clone via HTTPS e SSH, apertura diretta in VS Code o
 * IntelliJ IDEA tramite i loro deep link e la pagina della repository sul provider. Senza url di clone non mostra nulla.
 */
export const CloneRepositoryPopover: React.FC<ICloneRepositoryPopoverProps> = ({ children, httpsUrl, sshUrl, webUrl, labels, align = "end", className, dataTestId }) => {
    const ideUrl = httpsUrl || sshUrl
    if (!ideUrl) return null

    const text = { ...DEFAULT_LABELS, ...labels }

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent align={align} className={cn("flex w-80 flex-col gap-3", className)} dataTestId={dataTestId}>
                <div>
                    <p className="font-semibold">{text.title}</p>
                    <p className="text-sm text-foreground-secondary">{text.description}</p>
                </div>

                {httpsUrl && <CloneUrlRow label={text.https} url={httpsUrl} />}
                {sshUrl && <CloneUrlRow label={text.ssh} url={sshUrl} />}

                <PopoverLinkButton label={text.vscode} href={buildVsCodeCloneUrl(ideUrl)} icon={<Terminal />} variant="primary" />
                <PopoverLinkButton label={text.intellij} href={buildIntelliJCloneUrl(ideUrl)} icon={<Code />} variant="secondary" />
                {webUrl && <PopoverLinkButton label={text.openWeb} href={webUrl} icon={<ExternalLink />} variant="ghost" external />}
            </PopoverContent>
        </Popover>
    )
}

CloneRepositoryPopover.displayName = "CloneRepositoryPopover"

export default CloneRepositoryPopover
