import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

const dir = (path: string) => decodeURIComponent(new URL(path, import.meta.url).pathname)
const stockUi = dir("./src/preview/stock-ui")

// Where each comparison kit looks for `@/components/ui/*`, first match wins.
const kits: Record<string, string[]> = {
  stock: [stockUi],
  coss: [dir("./src/preview/coss-compat"), dir("./src/preview/coss-ui"), stockUi],
}
const mark = /\?(stock|coss)$/

/**
 * Lets the preview load further copies of its screens that use another library's components.
 * Importing a module with `?stock` or `?coss` marks it, the mark carries over to the preview modules it imports,
 * and inside marked modules `@/components/ui/*` points at that kit's folders.
 */
function kitVariants(): Plugin {
  return {
    name: "kit-variants",
    enforce: "pre",
    async resolveId(source, importer, options) {
      if (!importer) return
      // Stock components only ever import each other, whichever kit pulled them in.
      const kit = importer.startsWith(stockUi) ? "stock" : (mark.exec(importer) ?? mark.exec(source))?.[1]
      if (!kit) return
      const target = source.replace(mark, "")
      const from = importer.replace(mark, "")
      // The `@` alias has already been applied by the time this runs.
      const ui = /^(@|\/src)\/components\/ui\//
      const candidates = ui.test(target) ? kits[kit].map((folder) => `${folder}/${target.replace(ui, "")}`) : [target]
      for (const candidate of candidates) {
        const resolved = await this.resolve(candidate, from, { ...options, skipSelf: true })
        if (!resolved) continue
        const isPreviewModule = /\/src\/preview\/(app|page|screens\/)/.test(resolved.id) && !resolved.id.includes("?")
        return isPreviewModule ? `${resolved.id}?${kit}` : resolved
      }
    },
  }
}

export default defineConfig({
  plugins: [kitVariants(), react(), tailwindcss()],
  resolve: {
    alias: { "@": "/src" },
  },
})
