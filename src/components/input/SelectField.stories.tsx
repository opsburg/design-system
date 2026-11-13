import type { Decorator, Meta, StoryObj } from "@storybook/react-vite"
import { type ReactNode, useEffect } from "react"
import { type FieldValues, FormProvider, useForm } from "react-hook-form"
import SelectField from "./SelectField.rhf"

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

const providers = [
    { value: "own-engine", label: "Own engine, Boiler House north" },
    { value: "second-plant", label: "Second foreign power plant" },
    { value: "none", label: "No reserve line" }
]

const meta = {
    title: "Forms/SelectField",
    component: SelectField,
    decorators: [withForm],
    args: { name: "reserveProvider", label: "Reserve provider", placeholder: "Pick the failover", options: providers },
    parameters: {
        docs: {
            description: {
                component:
                    "Picks one option from a list, bound to react-hook-form, with label, help text, required marker and error message tied to the trigger. Use it when there are too many options for a RadioGroup; addClearButton lets people go back to no choice."
            }
        }
    }
} satisfies Meta<typeof SelectField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
    args: { description: "Where the city draws power when the foreign power plant has a blackout." }
}

export const Clearable: Story = {
    args: { addClearButton: true, clearLabel: "Clear reserve provider" },
    parameters: { form: { defaultValues: { reserveProvider: "own-engine" } } }
}

export const Disabled: Story = {
    args: { disabled: true },
    parameters: { form: { defaultValues: { reserveProvider: "second-plant" } } }
}

export const Required: Story = {
    args: {
        name: "automatonModel",
        label: "AI model for the automatons",
        placeholder: "Pick a model",
        required: true,
        rules: { required: "Pick the model the automatons run on." },
        options: [
            { value: "open-weights-large", label: "Open-weights model on the own engine" },
            { value: "provider-a", label: "Hosted model, provider A" },
            { value: "provider-b", label: "Hosted model, provider B" }
        ]
    }
}

export const WithError: Story = {
    parameters: { form: { defaultValues: { reserveProvider: "none" }, error: "Without a reserve line the next blackout stops every automaton." } }
}
