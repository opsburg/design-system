import tokens from "../tokens.json"

type ColorToken = { name: string; value: string | { light: string; dark: string }; usage: string }
const COLORS = tokens.color.tokens as ColorToken[]
const SEMANTIC = COLORS.filter((token) => typeof token.value !== "string")
const SCALES = ["notte", "ottone", "rame", "crema", "verderame"]

/** Every semantic color with its Day and Night value and where it is used. */
export const SemanticColors = () => (
    <table className="sb-unstyled w-full border-collapse text-sm">
        <thead>
            <tr className="text-left text-foreground-secondary">
                <th className="py-2 pr-4 font-medium">Token</th>
                <th className="py-2 pr-4 font-medium">Day</th>
                <th className="py-2 pr-4 font-medium">Night</th>
                <th className="py-2 font-medium">Use</th>
            </tr>
        </thead>
        <tbody>
            {SEMANTIC.map((token) => {
                const value = token.value as { light: string; dark: string }
                return (
                    <tr key={token.name} className="border-t border-divider align-top">
                        <td className="py-2 pr-4 font-mono">{token.name}</td>
                        {[value.light, value.dark].map((hex, index) => (
                            <td key={index} className="py-2 pr-4">
                                <span className="inline-flex items-center gap-2 font-mono">
                                    <span className="inline-block size-5 rounded-sm border border-border" style={{ background: hex }} />
                                    {hex}
                                </span>
                            </td>
                        ))}
                        <td className="py-2 text-foreground-secondary">{token.usage}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
)

/** The five brand scales, 50 to 950; the outlined step is the brand's own color. */
export const BrandScales = () => (
    <div className="grid gap-3">
        {SCALES.map((scale) => {
            const steps = COLORS.filter((token) => token.name.startsWith(`${scale}-`))
            return (
                <div key={scale} className="grid grid-cols-[96px_1fr] items-center gap-3">
                    <span className="font-medium">{scale}</span>
                    <div className="grid grid-cols-11 overflow-hidden rounded-sm">
                        {steps.map((token) => (
                            <div
                                key={token.name}
                                title={`${token.name} ${token.value}`}
                                className="h-12"
                                style={{
                                    background: token.value as string,
                                    outline: token.usage.includes("brand's own") ? "3px solid currentColor" : undefined,
                                    outlineOffset: -3
                                }}
                            />
                        ))}
                    </div>
                </div>
            )
        })}
    </div>
)

const TYPE_CLASS: Record<string, string> = {
    "title-xl": "type-title-xl",
    title: "type-title",
    plaque: "type-plaque",
    heading: "type-heading",
    body: "type-body",
    label: "type-label",
    caption: "type-caption",
    code: "type-code",
    gauge: "type-gauge"
}

/** The type scale as the type-* utilities render it. */
export const TypeScale = () => (
    <div className="grid gap-4">
        {tokens.type.groups.flatMap((group) =>
            group.styles.map((style) => (
                <div key={style.name} className="grid gap-1 border-b border-divider pb-3 md:grid-cols-[200px_1fr]">
                    <span className="font-mono text-sm text-foreground-secondary">
                        type-{style.name}
                        <br />
                        {style.fontSize} / {style.lineHeight} · {style.fontWeight}
                    </span>
                    <span>
                        <span className={TYPE_CLASS[style.name]}>{style.sample}</span>
                        <br />
                        <span className="text-sm text-foreground-secondary">{style.usage}</span>
                    </span>
                </div>
            ))
        )}
    </div>
)

/** Radii and shadows. */
export const Shape = () => (
    <div className="grid gap-6">
        <div className="flex flex-wrap gap-6">
            {[
                ["rounded-xs", "2px", "rounded-xs"],
                ["rounded-sm", "4px · badges, inputs", "rounded-sm"],
                ["rounded-md", "6px · buttons, cards", "rounded-md"],
                ["rounded-lg", "10px · dialogs, rails", "rounded-lg"],
                ["rounded-full", "lamps, tracks", "rounded-full"]
            ].map(([name, note, cls]) => (
                <div key={name} className="grid justify-items-center gap-1 text-center">
                    <div className={`size-16 border-2 border-primary-strong bg-accent ${cls}`} />
                    <span className="font-mono text-sm">{name}</span>
                    <span className="text-xs text-foreground-secondary">{note}</span>
                </div>
            ))}
        </div>
        <div className="flex flex-wrap gap-6">
            {[
                ["shadow-card", "shadow-card"],
                ["shadow-card-hover", "shadow-card-hover"],
                ["shadow-dialog", "shadow-dialog"],
                ["shadow-well", "shadow-well"],
                ["shadow-bevel", "shadow-bevel bg-primary"]
            ].map(([name, cls]) => (
                <div key={name} className="grid justify-items-center gap-1">
                    <div className={`size-16 rounded-md border border-border bg-card ${cls}`} />
                    <span className="font-mono text-sm">{name}</span>
                </div>
            ))}
        </div>
    </div>
)
