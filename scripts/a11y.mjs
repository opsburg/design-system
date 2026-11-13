// Accessibility check of every story, in Day and Night, with axe (WCAG 2.0/2.1/2.2 A and AA).
// Run after `pnpm build-storybook`: node scripts/a11y.mjs [storybook-static]
// A story with a known, accepted issue carries the tag "skip-a11y", with the reason in a comment next to it.
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs"
import { createServer } from "node:http"
import { extname, join, normalize, resolve } from "node:path"
import AxeBuilder from "@axe-core/playwright"
import { chromium } from "playwright"

const root = resolve(process.argv[2] ?? "storybook-static")
if (!existsSync(join(root, "index.json"))) {
    console.error(`No Storybook build in ${root}: run pnpm build-storybook first.`)
    process.exit(2)
}

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" }
const server = createServer((req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "")
    let file = join(root, path)
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html")
    if (!file.startsWith(root) || !existsSync(file)) {
        res.writeHead(404).end()
        return
    }
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" })
    createReadStream(file).pipe(res)
})
await new Promise((done) => server.listen(0, "127.0.0.1", done))
const base = `http://127.0.0.1:${server.address().port}`

const { entries } = JSON.parse(readFileSync(join(root, "index.json"), "utf8"))
const stories = Object.values(entries).filter((entry) => entry.type === "story" && !(entry.tags ?? []).includes("skip-a11y"))
const skipped = Object.values(entries).filter((entry) => entry.type === "story" && (entry.tags ?? []).includes("skip-a11y"))

const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" })
const failures = []
const jobs = stories.flatMap((story) => ["light", "dark"].map((theme) => ({ story, theme })))

async function check(page, { story, theme }) {
    try {
        await page.goto(`${base}/iframe.html?id=${story.id}&viewMode=story&globals=theme:${theme}`)
        // A story may render only into a portal (an open dialog), so either one counts as rendered
        await page.waitForSelector("#storybook-root > *, body > [data-radix-portal], [role='dialog']", { timeout: 15000 })
        await page.evaluate(() => document.fonts.ready)
        // Let enter animations (dialogs, popovers) finish, so axe sees the final colours
        // Only finite ones: a spinner or a pulsing lamp never finishes. Capped at one second either way.
        await page.evaluate(() =>
            Promise.race([
                Promise.all(
                    document
                        .getAnimations()
                        .filter((animation) => animation.effect?.getTiming().iterations !== Number.POSITIVE_INFINITY)
                        .map((animation) => animation.finished.catch(() => undefined))
                ),
                new Promise((done) => setTimeout(done, 1000))
            ])
        )
        await page.waitForTimeout(150)
        const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze()
        if (violations.length) failures.push({ story: `${story.title} / ${story.name}`, theme, violations })
        process.stdout.write(violations.length ? "x" : ".")
    } catch (error) {
        failures.push({ story: `${story.title} / ${story.name}`, theme, violations: [{ id: "render", impact: "error", help: String(error).split("\n")[0], nodes: [] }] })
        process.stdout.write("E")
    }
}

// Six pages at a time
const queue = [...jobs]
await Promise.all(
    Array.from({ length: 6 }, async () => {
        const page = await context.newPage()
        for (let job = queue.shift(); job; job = queue.shift()) await check(page, job)
        await page.close()
    })
)

await browser.close()
server.close()
process.stdout.write("\n")

for (const { story, theme, violations } of failures) {
    console.log(`\n${story} [${theme === "light" ? "Day" : "Night"}]`)
    for (const violation of violations) {
        console.log(`  ${violation.impact ?? "minor"} · ${violation.id}: ${violation.help}`)
        for (const node of violation.nodes.slice(0, 3)) console.log(`    ${node.target.join(" ")} — ${node.failureSummary?.split("\n").slice(1).join(" ").trim()}`)
    }
}

const checked = jobs.length
console.log(`\n${checked - failures.length}/${checked} story renders pass${skipped.length ? `, ${skipped.length} stories skipped (skip-a11y)` : ""}.`)
process.exit(failures.length ? 1 : 0)
