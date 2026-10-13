import { ToastProvider, toastManager } from "../coss-ui/toast"

export * from "../coss-ui/toast"

export const toast = toastManager

export function Toaster() {
  return <ToastProvider />
}
