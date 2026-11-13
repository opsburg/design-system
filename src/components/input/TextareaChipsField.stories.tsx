import type { Decorator, Meta, StoryObj } from "@storybook/react-vite"
import { type ReactNode, useEffect } from "react"
import { type FieldValues, FormProvider, useForm } from "react-hook-form"
import TextareaChipsField from "./TextareaChipsField.rhf"

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
    title: "Forms/TextareaChipsField",
    component: TextareaChipsField,
    decorators: [withForm],
    args: { name: "islands", label: "Islands", placeholder: "Add an island" },
    parameters: {
        form: { defaultValues: { islands: ["North harbour", "Ironworks"] } },
        docs: {
            description: {
                component:
                    "Collects a list of short values as chips: Enter or a comma adds one, Backspace on the empty field removes the last. Use it for tags, hostnames or islands, where each entry is a word or two; the value in the form is an array of strings."
            }
        }
    }
} satisfies Meta<typeof TextareaChipsField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = {
    parameters: { form: { defaultValues: { islands: [] } } }
}

export const WithDescription: Story = {
    args: { description: "The automatons may deploy airships only to these islands." }
}

export const Disabled: Story = {
    args: { disabled: true }
}

export const Required: Story = {
    args: { required: true, rules: { validate: (value: unknown) => (Array.isArray(value) && value.length > 0) || "Add at least one island." } },
    parameters: { form: { defaultValues: { islands: [] } } }
}

export const WithError: Story = {
    parameters: { form: { defaultValues: { islands: ["North harbour", "Atlantis"] }, error: "Atlantis is not on the map. Remove it or found the island first." } }
}
