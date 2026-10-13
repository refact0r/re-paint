import { lazy, StrictMode, Suspense, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { App, type Kit } from "./preview/app"

// The same preview, built against other libraries' components: untouched shadcn in src/preview/stock-ui, coss ui in src/preview/coss-ui.
const variants = {
  stock: lazy(() => import("./preview/app?stock").then((module) => ({ default: module.App }))),
  coss: lazy(() => import("./preview/app?coss").then((module) => ({ default: module.App }))),
}

function Root() {
  const [kit, setKit] = useState<Kit>(() => (localStorage.getItem("kit") as Kit | null) ?? "re-paint")

  useEffect(() => {
    localStorage.setItem("kit", kit)
    if (kit === "re-paint") delete document.documentElement.dataset.tokens
    else document.documentElement.dataset.tokens = kit
  }, [kit])

  if (kit === "re-paint") return <App kit={kit} onKitChange={setKit} />
  const Variant = variants[kit]
  return (
    <Suspense>
      <Variant key={kit} kit={kit} onKitChange={setKit} />
    </Suspense>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
