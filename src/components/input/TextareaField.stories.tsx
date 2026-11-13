import type { Decorator, Meta, StoryObj } from "@storybook/react-vite"
import { type ReactNode, useEffect } from "react"
import { type FieldValues, FormProvider, useForm } from "react-hook-form"
import TextareaField from "./TextareaField.rhf"

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
    title: "Forms/TextareaField",
    component: TextareaField,
    decorators: [withForm],
    args: { name: "stormLog", label: "Storm log", placeholder: "What the storm hit, and how the city recovered" },
    parameters: {
        docs: {
            description: {
                component:
                    "A multi-line text field bound to react-hook-form, with label, help text, required marker and error message tied to the textarea. Use it for incident notes and briefs; pass maxLength to show a character counter, or secret to mask a multi-line credential."
            }
        }
    }
} satisfies Meta<typeof TextareaField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
    args: { name: "automatonBrief", label: "Brief for the automatons", placeholder: undefined, description: "The automatons read this before every shift. Say which Factories they may repair on their own." }
}

export const WithCounter: Story = {
    args: { maxLength: 280, description: "One short paragraph: it goes on the incident board." },
    parameters: { form: { defaultValues: { stormLog: "The foreign power plant went dark at dawn. The reserve line held and the Boiler House north took the load." } } }
}

export const Disabled: Story = {
    args: { disabled: true },
    parameters: { form: { defaultValues: { stormLog: "Closed. The Vault was restored from the morning snapshot." } } }
}

export const Required: Story = {
    args: { required: true, rules: { required: "Describe what the storm hit before you close the incident." } }
}

export const WithError: Story = {
    parameters: { form: { defaultValues: { stormLog: "Fixed." }, error: "Describe what the storm hit before you close the incident." } }
}

export const Secret: Story = {
    args: { name: "vaultCertificate", label: "Vault certificate", secret: true, placeholder: undefined },
    parameters: { form: { defaultValues: { vaultCertificate: "-----BEGIN CERTIFICATE-----\nMIIB...harbour-vault\n-----END CERTIFICATE-----" } } }
}
