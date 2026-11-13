import type { Decorator, Meta, StoryObj } from "@storybook/react-vite"
import { type ReactNode, useEffect } from "react"
import { type FieldValues, FormProvider, useForm } from "react-hook-form"
import SliderField from "./SliderField.rhf"

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
    title: "Forms/SliderField",
    component: SliderField,
    decorators: [withForm],
    args: { name: "coalBudget", label: "Coal budget per day", min: 0, max: 500, step: 10, unit: " t" },
    parameters: {
        form: { defaultValues: { coalBudget: 200 } },
        docs: {
            description: {
                component:
                    "Picks a number in a range, bound to react-hook-form, with the current value shown next to the label and the bounds underneath. Use it when position matters more than the exact digit, such as a coal budget or a pressure threshold; add presets for the values people pick most."
            }
        }
    }
} satisfies Meta<typeof SliderField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
    args: { description: "Tonnes of coal the Boiler Houses may burn before the ledger warns you." }
}

export const WithPresets: Story = {
    args: { name: "pressureAlarm", label: "Pressure alarm threshold", min: 0, max: 100, step: 5, unit: "%", presets: [60, 75, 90], presetsLabel: "Common thresholds" },
    parameters: { form: { defaultValues: { pressureAlarm: 75 } } }
}

export const Disabled: Story = {
    args: { disabled: true }
}

export const Required: Story = {
    args: { required: true, rules: { min: { value: 10, message: "The Boiler Houses need at least 10 t a day." } } }
}

export const WithError: Story = {
    parameters: { form: { defaultValues: { coalBudget: 490 }, error: "This budget is above what the city can mine in a day." } }
}
