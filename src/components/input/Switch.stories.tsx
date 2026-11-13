import type { Decorator, Meta, StoryObj } from "@storybook/react-vite"
import { type ReactNode, useEffect } from "react"
import { type FieldValues, FormProvider, useForm } from "react-hook-form"
import SwitchField from "./Switch.rhf"

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
    title: "Forms/SwitchField",
    component: SwitchField,
    decorators: [withForm],
    args: { name: "reserveLine", label: "Reserve line" },
    parameters: {
        docs: {
            description: {
                component:
                    "An on/off setting bound to react-hook-form, with label, help text, required marker and error message tied to the switch. Use it for settings that read as a lever, such as turning failover on; for a consent or a choice in a list, use a Checkbox."
            }
        }
    }
} satisfies Meta<typeof SwitchField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const On: Story = {
    parameters: { form: { defaultValues: { reserveLine: true } } }
}

export const WithDescription: Story = {
    args: { name: "autoFailover", label: "Automatic failover", description: "When the foreign power plant goes dark, the city switches to its own engine on its own." }
}

export const Disabled: Story = {
    args: { name: "nightShift", label: "Night shift for the automatons", disabled: true },
    parameters: { form: { defaultValues: { nightShift: true } } }
}

export const Required: Story = {
    args: { name: "pressureAlarm", label: "Pressure alarm", required: true }
}

export const WithError: Story = {
    args: { name: "autoFailover", label: "Automatic failover" },
    parameters: { form: { defaultValues: { autoFailover: true }, error: "Add a reserve provider before you turn on failover." } }
}
