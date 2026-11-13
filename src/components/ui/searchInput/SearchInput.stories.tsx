import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { fn } from "storybook/test"
import { Label } from "../label"
import { type ISearchInputProps, SearchInput } from "./SearchInput"

/** Keeps the value in state, so typing and clearing work in the canvas. */
const SearchDemo = ({ label, description, error, ...args }: ISearchInputProps & { label: string; description?: string; error?: string }) => {
    const [value, setValue] = useState(args.value)
    const id = args.id ?? "search"
    const describedBy = [description ? `${id}-description` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined

    return (
        <div className="grid max-w-md gap-1">
            <Label htmlFor={id} className={error ? "text-destructive" : undefined}>
                {label}
            </Label>
            {description && (
                <p id={`${id}-description`} className="text-sm text-foreground-secondary">
                    {description}
                </p>
            )}
            <SearchInput
                {...args}
                id={id}
                value={value}
                aria-describedby={describedBy}
                aria-invalid={error ? true : undefined}
                onValueChange={next => {
                    setValue(next)
                    args.onValueChange(next)
                }}
                onClear={
                    args.onClear &&
                    (() => {
                        setValue("")
                        args.onClear?.()
                    })
                }
            />
            {error && (
                <p id={`${id}-error`} role="alert" className="text-sm font-medium text-destructive">
                    {error}
                </p>
            )}
        </div>
    )
}

const meta = {
    title: "Forms/SearchInput",
    component: SearchInput,
    args: { id: "search-buildings", value: "", placeholder: "Boiler House, Vault, Factory…", onValueChange: fn(), onClear: fn(), clearLabel: "Clear search" },
    parameters: {
        docs: {
            description: {
                component:
                    "Filters a list as you type, with a magnifier on the left and an optional clear button on the right (shown when you pass onClear). Use it above a list of buildings or incidents; give it a visible Label, since the placeholder disappears as soon as you type."
            }
        }
    },
    render: args => <SearchDemo {...args} label="Search buildings" />
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
    args: { id: "search-with-value", value: "Vault" }
}

export const WithoutClearButton: Story = {
    args: { id: "search-no-clear", value: "Factory", onClear: undefined }
}

export const WithDescription: Story = {
    args: { id: "search-help" },
    render: args => <SearchDemo {...args} label="Search incidents" description="Matches the storm name, the building hit and the island." />
}

export const Disabled: Story = {
    args: { id: "search-disabled", value: "Ironworks", disabled: true, onClear: undefined },
    render: args => <SearchDemo {...args} label="Search buildings (paused during the deploy)" />
}

export const Required: Story = {
    args: { id: "search-required", required: true },
    render: args => <SearchDemo {...args} label="Building to inspect (required)" />
}

export const WithError: Story = {
    args: { id: "search-error", value: "Boiler House 99" },
    render: args => <SearchDemo {...args} label="Search buildings" error="No building with this name stands in the city." />
}
