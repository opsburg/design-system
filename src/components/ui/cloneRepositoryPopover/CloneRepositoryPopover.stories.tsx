import type { Meta, StoryObj } from "@storybook/react-vite"
import { GitBranch } from "lucide-react"
import { expect, screen, userEvent, within } from "storybook/test"
import Button from "../../atoms/button/Button"
import CloneRepositoryPopover from "./CloneRepositoryPopover"

const meta = {
    title: "Patterns/CloneRepositoryPopover",
    component: CloneRepositoryPopover,
    args: {
        httpsUrl: "https://git.city.internal/engine-room/orders-factory.git",
        sshUrl: "git@git.city.internal:engine-room/orders-factory.git",
        webUrl: "https://git.city.internal/engine-room/orders-factory",
        align: "start",
        children: (
            <Button variant="secondary">
                <GitBranch />
                Clone repository
            </Button>
        )
    },
    argTypes: {
        align: { control: "inline-radio", options: ["start", "center", "end"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Opens from a button on a service card and offers the clone command over HTTPS and SSH, deep links into VS Code and IntelliJ IDEA, and the repository page. The trigger is passed as `children` and must forward ref and props, like `Button`. Without a clone URL nothing renders."
            }
        }
    }
} satisfies Meta<typeof CloneRepositoryPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {}

export const Open: Story = {
    play: async ({ canvasElement }) => {
        await userEvent.click(within(canvasElement).getByRole("button", { name: "Clone repository" }))
        await expect(await screen.findByRole("button", { name: "Clone over HTTPS" })).toBeVisible()
    }
}

export const HttpsOnly: Story = {
    args: { sshUrl: undefined, webUrl: undefined },
    play: async ({ canvasElement }) => {
        await userEvent.click(within(canvasElement).getByRole("button", { name: "Clone repository" }))
        await expect(await screen.findByRole("button", { name: "Clone over HTTPS" })).toBeVisible()
    }
}

export const CustomLabels: Story = {
    args: {
        labels: {
            title: "Bring the blueprints home",
            description: "Copy the clone command for the Orders Factory · service, or open it in your editor."
        }
    },
    play: async ({ canvasElement }) => {
        await userEvent.click(within(canvasElement).getByRole("button", { name: "Clone repository" }))
        await expect(await screen.findByText("Bring the blueprints home")).toBeVisible()
    }
}
