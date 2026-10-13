import { useState } from "react"
import { ArrowLeftIcon, Building2Icon, KeyRoundIcon, MailIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"

export function SignIn() {
  const [step, setStep] = useState<"credentials" | "code">("credentials")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)

  return (
    <div className="grid min-h-full lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
        <span className="font-heading text-lg font-semibold">Halfmoon</span>
        <figure className="flex flex-col gap-4">
          <blockquote className="font-serif text-3xl leading-snug text-balance">“Authors tell us they finally know where their book is.”</blockquote>
          <figcaption className="text-sm opacity-70">Chiamaka Eze, Baobab Books</figcaption>
        </figure>
      </div>

      <div className="flex items-center justify-center p-8">
        {step === "credentials" ? (
          <form
            className="w-full max-w-sm"
            onSubmit={(event) => {
              event.preventDefault()
              if (password.length < 8) return setError(true)
              setBusy(true)
              setTimeout(() => {
                setBusy(false)
                setStep("code")
              }, 900)
            }}
          >
            <FieldGroup>
              <div className="flex flex-col gap-1">
                <h1 className="font-heading text-2xl font-semibold tracking-tight">Welcome back</h1>
                <p className="text-muted-foreground">Sign in to your press.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button type="button" variant="outline">
                  <Building2Icon /> Single sign-on
                </Button>
                <Button type="button" variant="outline">
                  <KeyRoundIcon /> Passkey
                </Button>
              </div>
              <FieldSeparator>or with email</FieldSeparator>
              <Field>
                <FieldLabel htmlFor="signin-email">Email</FieldLabel>
                <Input id="signin-email" type="email" autoComplete="email" defaultValue="ines@halfmoon.press" required />
              </Field>
              <Field data-invalid={error || undefined}>
                <div className="flex items-baseline justify-between">
                  <FieldLabel htmlFor="signin-password">Password</FieldLabel>
                  <a href="#" onClick={(event) => event.preventDefault()} className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="signin-password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={error}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    setError(false)
                  }}
                />
                {error ? <FieldError>Enter at least 8 characters to continue.</FieldError> : <FieldDescription>Any 8 characters work in this preview.</FieldDescription>}
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="remember" defaultChecked />
                <FieldLabel htmlFor="remember" className="font-normal">
                  Keep me signed in on this device
                </FieldLabel>
              </Field>
              <Button type="submit" disabled={busy}>
                {busy && <Spinner />} {busy ? "Signing in…" : "Sign in"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                New to Halfmoon?{" "}
                <a href="#" onClick={(event) => event.preventDefault()} className="text-foreground underline underline-offset-4">
                  Create a workspace
                </a>
              </p>
            </FieldGroup>
          </form>
        ) : (
          <div className="flex w-full max-w-sm flex-col gap-6">
            <Button variant="ghost" size="sm" className="-ml-2.5 self-start" onClick={() => setStep("credentials")}>
              <ArrowLeftIcon /> Back
            </Button>
            <div className="flex size-12 items-center justify-center rounded-full border bg-muted">
              <MailIcon className="size-5" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-heading text-2xl font-semibold tracking-tight">Check your email</h1>
              <p className="text-muted-foreground">We sent a six digit code to ines@halfmoon.press. It expires in 10 minutes.</p>
            </div>
            <InputOTP maxLength={6} autoFocus onComplete={() => toast.add({ type: "success", title: "Signed in", description: "This is where the app would open." })}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-sm text-muted-foreground">
              Nothing arrived?{" "}
              <button type="button" className="text-foreground underline underline-offset-4" onClick={() => toast.add({ title: "New code sent" })}>
                Send a new code
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
