import type { Decorator, Meta, StoryObj } from "@storybook/react-vite"
import { type ReactNode, useEffect } from "react"
import { type FieldValues, FormProvider, useForm } from "react-hook-form"
import CalendarField from "./CalendarField.rhf"

type FormParameters = { defaultValues?: FieldValues; error?: string }

/** Wraps the field in a react-hook-form provider; `parameters.form` sets the values and an optional error on the field. */
const FormHarness = ({ name, defaultValues, error, children }: FormParameters & { name: string; children: ReactNode }) => {
    const form = useForm({ defaultValues, mode: "onTouched" })

    useEffect(() => {
        if (error) form.setError(name, { type: "manual", message: error })
    }, [form, name, error])

    return (
        <FormProvider {...form}>
            <div className="max-w-md">{children}</div>
        </FormProvider>
    )
}

const withForm: Decorator = (Story, { args, parameters }) => {
    const { defaultValues, error } = (parameters.form ?? {}) as FormParameters

    return (
        <FormHarness name={String(args.name)} defaultValues={defaultValues} error={error}>
            <Story />
        </FormHarness>
    )
}

const meta = {
    title: "Forms/CalendarField",
    component: CalendarField,
    decorators: [withForm],
    args: { name: "launchDate", label: "Launch date", placeholder: "Pick a launch date" },
    parameters: {
        docs: {
            description: {
                component:
                    "Picks a single day from a calendar in a popover, bound to react-hook-form, with label, help text, required marker and error message tied to the trigger. Use it for dates people choose, such as when an airship launches; pass minDate to block days in the past."
            }
        }
    }
} satisfies Meta<typeof CalendarField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
    parameters: { form: { defaultValues: { launchDate: new Date(2026, 11, 3) } } }
}

export const WithDescription: Story = {
    args: { description: "The airship leaves at dawn. Days before today are closed.", minDate: new Date(2026, 10, 13) }
}

export const Disabled: Story = {
    args: { disabled: true },
    parameters: { form: { defaultValues: { launchDate: new Date(2026, 11, 3) } } }
}

export const Required: Story = {
    args: { required: true, rules: { required: "Pick the day the airship launches." } }
}

export const WithError: Story = {
    parameters: { form: { defaultValues: { launchDate: new Date(2026, 11, 24) }, error: "A storm is forecast that day. Pick another launch date." } }
}
