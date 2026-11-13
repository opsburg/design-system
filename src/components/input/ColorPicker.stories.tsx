import type { Decorator, Meta, StoryObj } from "@storybook/react-vite"
import { type ReactNode, useEffect } from "react"
import { type FieldValues, FormProvider, useForm } from "react-hook-form"
import ColorPicker from "./ColorPicker.rhf"

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
    title: "Forms/ColorPicker",
    component: ColorPicker,
    decorators: [withForm],
    args: { name: "districtColor", label: "District color", dialogTitle: "Pick the district color", triggerLabel: "District color" },
    parameters: {
        form: { defaultValues: { districtColor: "#1D4ED8" } },
        docs: {
            description: {
                component:
                    "Picks a color from a palette or a free wheel in a dialog, bound to react-hook-form. Use it to tell districts or islands apart on the map; the swatch shows the current color and opens the picker."
            }
        }
    }
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = {
    parameters: { form: { defaultValues: { districtColor: "" } } }
}

export const Required: Story = {
    args: { required: true, rules: { required: "Pick a color so the district shows on the map." } }
}

export const WithError: Story = {
    parameters: { form: { defaultValues: { districtColor: "#6B7280" }, error: "Grey is reserved for buildings in blackout. Pick another color." } }
}
