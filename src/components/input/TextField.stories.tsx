import type { Decorator, Meta, StoryObj } from "@storybook/react-vite"
import { type ReactNode, useEffect } from "react"
import { type FieldValues, FormProvider, useForm } from "react-hook-form"
import TextField from "./TextField.rhf"

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
    title: "Forms/TextField",
    component: TextField,
    decorators: [withForm],
    args: { name: "buildingName", label: "Building name", placeholder: "Boiler House north" },
    parameters: {
        docs: {
            description: {
                component:
                    "A single-line text field bound to react-hook-form: label, help text, required marker and error message are tied to the input for you. Use it inside a FormProvider for names and short values; for longer text use TextareaField, for secrets pass type=\"password\" to get the show/hide toggle."
            }
        }
    }
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
    args: { description: "Shown on the map and in every incident report." }
}

export const Disabled: Story = {
    args: { name: "vaultName", label: "Vault name", disabled: true },
    parameters: { form: { defaultValues: { vaultName: "Vault of the harbour" } } }
}

export const Required: Story = {
    args: { required: true, rules: { required: "Name the building before you raise it." } }
}

export const WithError: Story = {
    args: { name: "factoryName", label: "Factory name" },
    parameters: { form: { defaultValues: { factoryName: "Factory east" }, error: "A Factory with this name already stands on this island." } }
}

export const Secret: Story = {
    args: { name: "reserveProviderKey", label: "Reserve provider API key", type: "password", placeholder: undefined, description: "Stored in the Vault. Only the automatons on the reserve line can read it." },
    parameters: { form: { defaultValues: { reserveProviderKey: "rsv-7f3a-boiler-north" } } }
}
