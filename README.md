<p align="center"><img src="docs/assets/logo.png" alt="Opsburg" width="96"></p>

# @opsburg/design-system

The React component library of Opsburg, built on Radix UI, Tailwind CSS v4 and class-variance-authority.

## Contents

- **Atoms:** `Button`, `Badge`, `StatusBadge` (status badge with a dot; `live` makes it pulse), `StatusDot`
- **Primitives:** `Accordion`, `Alert`, `Avatar`, `Card`, `Checkbox`, `Dialog`, `DropdownMenu`, `Form`, `Input`, `Label`, `Popover`, `RadioGroup`, `Select`, `Slider`, `Switch`, `Table`, `Tabs`, `Textarea`, `Toggle`, `ToggleGroup`, `Tooltip`, `Spinner`, `DeleteConfirmationDialog`
- **Patterns:** `ApiStatusHandler` (loading, error or empty from query state), `EntityPickerList` (searchable list to pick an entity), `LogViewer` and `LogViewerActions` (log lines with filter, follow and pretty JSON), `PageLayout` (page title, description and toolbar)
- **Navigation:** `Sidebar`, `NavItem` (router-agnostic: pass `renderLink` to plug in react-router)
- **Form fields** (react-hook-form): `TextField`, `TextareaField` (shows a character counter with `maxLength`), `TextareaChipsField`, `SelectField`, `SwitchField`, `SliderField`, `CalendarField`, `ColorPicker`
- **Theme:** `theme.css` with the light and dark design tokens for Tailwind v4

## Install

The package is published to GitHub Packages. In the consuming project add an `.npmrc`:

```
@opsburg:registry=https://npm.pkg.github.com
```

then:

```sh
pnpm add @opsburg/design-system
pnpm add -D tailwindcss @tailwindcss/vite tailwindcss-animate
```

## Tailwind v4 setup

In the app's main CSS:

```css
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..700;1,300..700&display=swap");
@import "tailwindcss";
@import "@opsburg/design-system/theme.css";
@source "../node_modules/@opsburg/design-system/dist";
```

`@source` makes Tailwind generate the utilities the library components use. Dark mode is class based: toggle the `dark` class on `<html>`.

## Palette and tokens

The palette is **Ottone e Notte** (brass and night), taken from the logo. Each color is exposed as a Tailwind 50–950 scale, with the original hex anchored to one step:

| Color | Hex | Role |
| --- | --- | --- |
| `notte` | `#0A1E35` | text on light, dark theme surfaces |
| `ottone` | `#C9952A` | primary action (`primary`) |
| `rame` | `#B4642E` | accent, illustrations, warnings |
| `crema` | `#F6ECD3` | light surfaces, text on dark |
| `verderame` | `#2F8A78` | `secondary`, `success` |

Components use **semantic tokens only**; the scales (`bg-ottone-100`, `text-verderame-700`, …) are for charts and illustrations.

| Token | Use |
| --- | --- |
| `primary` / `primary-foreground` | primary button fill, with notte text on top |
| `primary-strong` | primary as **text or glyph** on `background`/`card` (links, ghost buttons, icons) |
| `secondary`, `accent`, `muted` | soft surfaces and their `-foreground` |
| `destructive` | errors and destructive actions |
| `success`, `warning`, `info` | outcomes and states: `text-success` for text, `bg-success-subtle` for the background, `success-foreground` on a solid `bg-success` |

Solid brass on the light background has a 2.5:1 contrast: **do not use `text-primary` for text**, use `text-primary-strong`. Every text/background token pair meets WCAG AA (≥ 4.5:1) in both themes: the lowest is 5.4:1 in light and 5.8:1 in dark.

## Usage

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@opsburg/design-system"

export function Example() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Hello</CardTitle>
            </CardHeader>
            <CardContent>
                <Button variant="primary">Click me</Button>
            </CardContent>
        </Card>
    )
}
```

Form fields need a react-hook-form `FormProvider`:

```tsx
import { FormProvider, useForm } from "react-hook-form"
import { TextField } from "@opsburg/design-system"

export function ExampleForm() {
    const form = useForm()
    return (
        <FormProvider {...form}>
            <TextField name="email" label="Email" />
        </FormProvider>
    )
}
```

## Test ids

Every component emits a `data-testid`, resolved in this order:

1. `data-testid` passed as an HTML attribute
2. the `dataTestId` prop
3. the `id` prop
4. the `name` prop (where it exists: inputs, textareas, switches, sliders, form fields)

When none is set the attribute is not emitted.

```tsx
<Button dataTestId="save">Save</Button>   // data-testid="save"
<Button id="save">Save</Button>           // data-testid="save"
<Input name="email" />                    // data-testid="email"
<Button>Save</Button>                     // no data-testid
```

Composite components derive their children's ids from the resolved one: `SelectField` with `name="country"` emits `country`, `country-clear` and `country-option-<value>`; `SliderField` with `name="level"` emits `level`, `level-slider`, `level-value` and `level-preset-<n>`; secret fields expose `<name>-toggle-visibility`.

The same logic is exported for the consuming app:

```tsx
import { getTestId, type TestIdProps } from "@opsburg/design-system"

const MyField = ({ dataTestId, ...props }: MyFieldProps & TestIdProps) => (
    <input {...props} data-testid={getTestId({ dataTestId, ...props })} />
)
```

## Accessibility

Components target WCAG 2.1 AA:

- every interactive control is a native element (`button`, `a`, `input`), reachable by keyboard, with a visible focus ring;
- form fields wire label, description and error through `htmlFor`/`id`, `aria-describedby`, `aria-invalid` and `aria-required`; error messages have `role="alert"`;
- the required asterisk is `aria-hidden` and paired with screen-reader text;
- decorative icons are `aria-hidden`; icon-only controls require an `aria-label`;
- every string announced to screen readers can be overridden through props (`label`, `clearLabel`, `closeLabel`, `menuButtonLabel`, `showValueLabel`, `requiredLabel`, …) so the app can localize it.

## Development

```sh
pnpm install
pnpm build        # library build (dist/)
pnpm dev          # watch mode
pnpm typecheck
```

To use it locally from another project without publishing:

```sh
pnpm add link:../design-system
```

## Release

[release.yml](.github/workflows/release.yml) publishes to GitHub Packages on every tag push (with or without a `v` prefix):

```sh
git tag 1.0.0
git push origin 1.0.0
```

## License

Apache-2.0
