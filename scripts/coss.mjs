// Refreshes src/preview/coss-ui from the coss ui registry: `node scripts/coss.mjs`.
// The files are written as published; only their import paths are rewritten to fit this repo.
// Restart `pnpm dev` afterwards: a running server keeps resolving to the files it found before.
import { mkdir, rm, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"

const registry = "https://coss.com/ui/r"
const out = new URL("../src/preview/coss-ui/", import.meta.url).pathname

// Left out because it needs packages this repo does not have, and no screen uses it.
const skip = new Set(["composer"])

const get = async (name) => {
  const response = await fetch(`${registry}/${name}.json`)
  if (!response.ok) throw new Error(`${name}: ${response.status}`)
  return response.json()
}

const todo = (await get("ui")).registryDependencies.map((dep) => dep.replace("@coss/", ""))
const seen = new Set(["utils"])

await rm(out, { recursive: true, force: true })

while (todo.length) {
  const name = todo.pop()
  if (seen.has(name) || skip.has(name)) continue
  seen.add(name)
  const item = await get(name)
  for (const dep of item.registryDependencies ?? []) {
    if (dep.startsWith("@coss/")) todo.push(dep.replace("@coss/", ""))
  }
  for (const file of item.files ?? []) {
    // registry/default/ui/button.tsx -> button.tsx, registry/default/lib/x.ts -> lib/x.ts
    const path = file.path.replace(/^registry\/default\//, "").replace(/^ui\//, "")
    const up = path.includes("/") ? "../" : "./"
    const content = file.content
      .replaceAll("@/registry/default/lib/utils", "@/lib/utils")
      .replaceAll("@/registry/default/ui/", up)
      .replaceAll("@/registry/default/", up)
    await mkdir(dirname(join(out, path)), { recursive: true })
    await writeFile(join(out, path), content)
  }
}

console.log(`${seen.size - 1} items written to ${out}`)
