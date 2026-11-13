import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bot } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

/** A portrait drawn inline, so the story does not depend on the network */
const PORTRAIT =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#b5762a"/><circle cx="20" cy="15" r="7" fill="#f3e3c3"/><rect x="9" y="25" width="22" height="15" rx="7" fill="#f3e3c3"/></svg>'
    )

const meta = {
    title: "Components/Avatar",
    component: Avatar,
    render: (args) => (
        <div className="flex items-center gap-3">
            <Avatar {...args}>
                <AvatarImage src={PORTRAIT} />
                <AvatarFallback aria-hidden="true">AB</AvatarFallback>
            </Avatar>
            <span className="text-sm">Ada Brass · city engineer</span>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                component:
                    "The face of who did the work: a person or an automaton · AI agent. Initials show while the picture loads or when there is none. Put the name next to it; when the avatar stands alone, give the image an `alt` with the name."
            }
        }
    }
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Fallback: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarFallback aria-hidden="true">OT</AvatarFallback>
            </Avatar>
            <span className="text-sm">Otto Tinker · operator</span>
        </div>
    )
}

export const Automaton: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarFallback aria-hidden="true">
                    <Bot className="size-5" />
                </AvatarFallback>
            </Avatar>
            <span className="text-sm">Automaton 7 · AI agent</span>
        </div>
    )
}

export const Standalone: Story = {
    render: () => (
        <Avatar>
            <AvatarImage src={PORTRAIT} alt="Ada Brass" />
            <AvatarFallback>AB</AvatarFallback>
        </Avatar>
    )
}

export const Group: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
                <Avatar>
                    <AvatarImage src={PORTRAIT} />
                    <AvatarFallback aria-hidden="true">AB</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarFallback aria-hidden="true">OT</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarFallback aria-hidden="true">
                        <Bot className="size-5" />
                    </AvatarFallback>
                </Avatar>
            </div>
            <span className="text-sm">Ada Brass, Otto Tinker and Automaton 7 launched this airship</span>
        </div>
    )
}
