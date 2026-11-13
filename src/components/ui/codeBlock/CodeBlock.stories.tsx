import type { Meta, StoryObj } from "@storybook/react-vite"
import CodeBlock from "./CodeBlock"

const meta = {
    title: "Components/CodeBlock",
    component: CodeBlock,
    args: {
        code: "kubectl rollout restart deployment/orders-be -n city-core",
        label: "Restart the Orders Factory · service",
        copyable: true,
        language: "bash"
    },
    argTypes: {
        size: { control: "inline-radio", options: ["default", "sm"] }
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Shows a command, snippet or response exactly as it is, read-only. Turn on `copyable` when people are meant to paste it somewhere else; set `maxHeightClassName` for long output, which then scrolls and stays reachable from the keyboard."
            }
        }
    }
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Command: Story = {}

export const WithoutCopy: Story = {
    args: { copyable: false, label: "The engine room answered", code: '{ "status": "ok", "region": "on-prem-milan", "uptime": "41d 6h" }', language: "json" }
}

export const Small: Story = {
    args: { size: "sm", label: "Point the reserve line at your own engine", code: "export FAILOVER_ENDPOINT=https://engine.city.internal:8443" }
}

export const LongOutputScrolls: Story = {
    args: {
        label: "Airship manifest · deploy.yaml",
        language: "yaml",
        maxHeightClassName: "max-h-60",
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-be
  namespace: city-core
  labels:
    app.kubernetes.io/name: orders-be
    app.kubernetes.io/version: "2.14.3"
spec:
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/name: orders-be
  template:
    metadata:
      labels:
        app.kubernetes.io/name: orders-be
    spec:
      containers:
        - name: orders-be
          image: registry.city.internal/orders-be:2.14.3
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: 250m
              memory: 256Mi
            limits:
              cpu: "1"
              memory: 512Mi`
    }
}
