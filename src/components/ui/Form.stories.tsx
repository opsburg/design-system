import type { Meta, StoryObj } from "@storybook/react-vite"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "../atoms/button/Button"
import { Checkbox } from "./checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Input } from "./input/input"
import { Textarea } from "./textarea"

type NewBuilding = {
    buildingName: string
    island: string
    reserveLine: boolean
    notes: string
}

type NewBuildingFormProps = {
    /** Shows the messages that a failed validation leaves behind */
    withErrors?: boolean
    /** Locks every field, as while the airship is launching */
    disabled?: boolean
}

/**
 * Every FormItem carries a FormDescription: FormControl always points aria-describedby
 * at the description id, so leaving it out would reference an element that does not exist.
 */
const NewBuildingForm = ({ withErrors = false, disabled = false }: NewBuildingFormProps) => {
    const form = useForm<NewBuilding>({
        defaultValues: { buildingName: withErrors ? "Factory east" : "", island: "", reserveLine: false, notes: "" },
        mode: "onTouched",
        disabled
    })

    useEffect(() => {
        if (!withErrors) return
        form.setError("buildingName", { type: "manual", message: "A Factory with this name already stands on this island." })
        form.setError("island", { type: "required", message: "Pick the island where the Factory will stand." })
    }, [form, withErrors])

    return (
        <Form {...form}>
            <form className="grid max-w-md gap-6" noValidate onSubmit={form.handleSubmit(() => undefined)}>
                <FormField
                    control={form.control}
                    name="buildingName"
                    rules={{ required: "Name the building before you raise it." }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Building name
                                <span className="ml-1 text-destructive" aria-hidden="true">
                                    *
                                </span>
                                <span className="sr-only"> (required)</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Boiler House north" fullWidth required {...field} />
                            </FormControl>
                            <FormDescription>Shown on the map and in every incident report.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="island"
                    rules={{ required: "Pick the island where the Factory will stand." }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Island
                                <span className="ml-1 text-destructive" aria-hidden="true">
                                    *
                                </span>
                                <span className="sr-only"> (required)</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Ironworks" fullWidth required {...field} />
                            </FormControl>
                            <FormDescription>Each island is one environment of the city.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="reserveLine"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-2">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={checked => field.onChange(checked === true)} onBlur={field.onBlur} disabled={field.disabled} />
                                </FormControl>
                                <FormLabel>Keep a reserve line to a second provider</FormLabel>
                            </div>
                            <FormDescription>If the foreign power plant has a blackout, the Factory keeps running on the reserve line.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes for the automatons</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Which repairs they may do on their own" {...field} />
                            </FormControl>
                            <FormDescription>Optional. The automatons read this before every shift.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button type="submit" disabled={disabled}>
                        Raise the building
                    </Button>
                </div>
            </form>
        </Form>
    )
}

const meta = {
    title: "Forms/Form",
    component: FormItem,
    subcomponents: { FormLabel, FormControl, FormDescription, FormMessage },
    parameters: {
        docs: {
            description: {
                component:
                    "The react-hook-form building blocks for a hand-composed form: Form provides the form, FormField binds a value, and inside each FormItem the FormLabel, FormControl, FormDescription and FormMessage are tied to the control for you. Use them when no ready-made field (TextField, SelectField…) fits the control you need."
            }
        }
    },
    render: () => <NewBuildingForm />
} satisfies Meta<typeof FormItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithErrors: Story = {
    render: () => <NewBuildingForm withErrors />
}

export const Disabled: Story = {
    render: () => <NewBuildingForm disabled />
}
