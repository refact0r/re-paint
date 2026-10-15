import { useEffect, useRef, useState, type ReactNode } from "react"
import { BoldIcon, ChevronDownIcon, PlusIcon, Trash2Icon } from "lucide-react"

import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import { Page, PageHeader } from "../page"

const colorGroups = [
  { name: "Surfaces", tokens: ["background", "card", "popover", "muted", "secondary", "accent", "sidebar"] },
  { name: "Text", tokens: ["foreground", "muted-foreground", "card-foreground", "primary-foreground", "secondary-foreground", "accent-foreground"] },
  { name: "Brand and lines", tokens: ["primary", "border", "input", "ring"] },
  { name: "Status", tokens: ["destructive", "success", "warning", "info"] },
  { name: "Charts", tokens: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"] },
]

const typeScale = [
  { cls: "text-6xl font-semibold tracking-tight", name: "6xl", sample: "Low Tide Almanac" },
  { cls: "text-4xl font-semibold tracking-tight", name: "4xl", sample: "On keeping an almanac" },
  { cls: "text-2xl font-semibold tracking-tight", name: "2xl", sample: "What gets written down" },
  { cls: "text-xl font-medium", name: "xl", sample: "Every entry answers the same four questions" },
  { cls: "text-lg", name: "lg", sample: "An almanac is a promise to pay attention on the days when nothing happens." },
  { cls: "text-base", name: "base", sample: "My grandmother kept hers in a ledger meant for shop accounts." },
  { cls: "text-sm", name: "sm", sample: "Height at the nearest mark, and whether it is coming or going." },
  { cls: "text-xs", name: "xs", sample: "Table 1. Morning observations, Ravensbay slip" },
]

const buttonVariants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const
const buttonSizes = ["xs", "sm", "default", "lg"] as const
const badgeVariants = ["default", "secondary", "outline", "destructive", "ghost"] as const

function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="grid gap-6 border-t pt-8 lg:grid-cols-[14rem_1fr]">
      <div>
        <h2 className="font-heading text-lg font-semibold">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex min-w-0 flex-col gap-8">{children}</div>
    </section>
  )
}

function Swatch({ token }: { token: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState("")

  useEffect(() => {
    const read = () => setValue(getComputedStyle(document.documentElement).getPropertyValue(`--${token}`).trim())
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] })
    return () => observer.disconnect()
  }, [token])

  return (
    <div className="flex flex-col gap-2">
      <div ref={ref} className="h-16 rounded-lg border" style={{ background: `var(--${token})` }} />
      <div className="text-xs">
        <p className="font-medium">{token}</p>
        <p className="truncate font-mono text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export function Foundations() {
  return (
    <Page>
      <PageHeader title="Foundations" description="Every theme variable and every control state on one page, for checking a change at a glance." />

      <Section title="Color" description="Values are read live from the page, so they follow the theme toggle.">
        {colorGroups.map((group) => (
          <div key={group.name} className="flex flex-col gap-3">
            <p className="text-xs font-medium text-muted-foreground">{group.name}</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-6">
              {group.tokens.map((token) => (
                <Swatch key={token} token={token} />
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Type" description="Sans for interface, serif for long reading, mono for data.">
        <div className="flex flex-col gap-5">
          {typeScale.map((step) => (
            <div key={step.name} className="flex items-baseline gap-6">
              <span className="w-10 shrink-0 font-mono text-xs text-muted-foreground">{step.name}</span>
              <p className={`min-w-0 truncate font-heading ${step.cls}`}>{step.sample}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { cls: "font-sans", name: "Sans" },
            { cls: "font-serif", name: "Serif" },
            { cls: "font-mono", name: "Mono" },
          ].map((family) => (
            <div key={family.name} className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">{family.name}</p>
              <p className={`${family.cls} text-3xl`}>Aa Gg Qq 0123</p>
              <p className={`${family.cls} text-sm text-muted-foreground`}>Calm. Water like the back of a spoon. Eleven turnstones on the slip, then ten.</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shape and depth">
        <Row label="Radius">
          {["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full"].map((radius) => (
            <div key={radius} className="flex flex-col items-center gap-2">
              <div className={`size-16 border bg-muted ${radius}`} />
              <span className="font-mono text-xs text-muted-foreground">{radius.replace("rounded-", "")}</span>
            </div>
          ))}
        </Row>
        <Row label="Shadow">
          {["shadow-xs", "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl"].map((shadow) => (
            <div key={shadow} className="flex flex-col items-center gap-2 p-2">
              <div className={`size-16 rounded-lg border bg-card ${shadow}`} />
              <span className="font-mono text-xs text-muted-foreground">{shadow.replace("shadow-", "")}</span>
            </div>
          ))}
        </Row>
        <Row label="Spacing">
          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4, 6, 8, 12, 16].map((step) => (
              <div key={step} className="flex items-center gap-3">
                <span className="w-6 font-mono text-xs text-muted-foreground">{step}</span>
                <div className="h-3 rounded-sm bg-primary" style={{ width: `calc(var(--spacing) * ${step})` }} />
              </div>
            ))}
          </div>
        </Row>
      </Section>

      <Section title="Print" description="The few devices borrowed from printed matter, and what each one means.">
        <Row label="Patterns: solid is done, dots are a tint, hatching is still to come">
          {[
            { cls: "border border-primary-border bg-primary", name: "solid" },
            { cls: "border bg-halftone", name: "dots" },
            { cls: "border bg-hatch", name: "hatch" },
          ].map((pattern) => (
            <div key={pattern.name} className="flex flex-col items-center gap-2">
              <div className={`size-16 ${pattern.cls}`} />
              <span className="font-mono text-xs text-muted-foreground">{pattern.name}</span>
            </div>
          ))}
        </Row>
        <Row label="Details: dot shadow on floating surfaces, dotted rules between items">
          <div className="h-16 w-40 bg-popover ring-1 ring-border dot-shadow" />
          <div className="flex w-40 flex-col gap-2 border bg-popover p-1">
            <div className="px-1.5 text-sm">Rename</div>
            <div className="-mx-1 h-px bg-dotted" />
            <div className="px-1.5 text-sm">Delete</div>
          </div>
        </Row>
        <Row label="Highlighter">
          <p className="text-sm">
            Selected text and <mark>marked passages</mark> take the yellow ink.
          </p>
        </Row>
      </Section>

      <Section title="Buttons" description="Each variant at each size, then the states.">
        {buttonVariants.map((variant) => (
          <Row key={variant} label={variant}>
            {buttonSizes.map((size) => (
              <Button key={size} variant={variant} size={size}>
                <PlusIcon /> Add title
              </Button>
            ))}
            <Button variant={variant} size="icon" aria-label="Delete">
              <Trash2Icon />
            </Button>
            <Button variant={variant} disabled>
              Disabled
            </Button>
            <Button variant={variant} disabled>
              <Spinner /> Saving
            </Button>
          </Row>
        ))}
        <Row label="Groups">
          <ButtonGroup>
            <Button variant="outline">Save draft</Button>
            <Button variant="outline" size="icon" aria-label="More save options">
              <ChevronDownIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Day</Button>
            <Button variant="outline">Week</Button>
            <Button variant="outline">Month</Button>
          </ButtonGroup>
        </Row>
      </Section>

      <Section title="Small pieces">
        <Row label="Badges">
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
          <Badge variant="outline" className="text-success">
            <span className="size-1.5 rounded-full bg-success" /> Published
          </Badge>
          <Badge variant="outline" className="text-warning">
            <span className="size-1.5 rounded-full bg-warning" /> At risk
          </Badge>
        </Row>
        <Row label="Avatars">
          <Avatar size="sm">
            <AvatarFallback>IO</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>TL</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>PR</AvatarFallback>
            <AvatarBadge className="bg-success" />
          </Avatar>
        </Row>
        <Row label="Keys and tooltips">
          <Kbd>Esc</Kbd>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>Hover or focus me</TooltipTrigger>
            <TooltipContent>
              Command palette <Kbd>⌘K</Kbd>
            </TooltipContent>
          </Tooltip>
        </Row>
        <Row label="Toggles and tabs">
          <Toggle aria-label="Bold">
            <BoldIcon />
          </Toggle>
          <Toggle aria-label="Bold" defaultPressed variant="outline">
            <BoldIcon /> Pressed
          </Toggle>
          <Toggle aria-label="Bold" disabled>
            <BoldIcon /> Disabled
          </Toggle>
          <Tabs defaultValue="a">
            <TabsList>
              <TabsTrigger value="a">Selected</TabsTrigger>
              <TabsTrigger value="b">Resting</TabsTrigger>
              <TabsTrigger value="c" disabled>
                Disabled
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue="a">
            <TabsList variant="line">
              <TabsTrigger value="a">Selected</TabsTrigger>
              <TabsTrigger value="b">Resting</TabsTrigger>
            </TabsList>
          </Tabs>
        </Row>
        <Row label="Separators">
          <div className="flex h-5 items-center gap-3 text-sm">
            Draft <Separator orientation="vertical" /> Copyedit <Separator orientation="vertical" /> Proof
          </div>
        </Row>
      </Section>

      <Section title="Form controls" description="Resting, filled, invalid and disabled.">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Input placeholder="Placeholder" aria-label="Empty input" />
          <Input defaultValue="Filled value" aria-label="Filled input" />
          <Input defaultValue="Invalid value" aria-invalid aria-label="Invalid input" />
          <Input defaultValue="Disabled" disabled aria-label="Disabled input" />
          <Textarea placeholder="Placeholder" aria-label="Empty textarea" />
          <Textarea defaultValue="Filled value that runs onto a second line when the box is narrow." aria-label="Filled textarea" />
          <Textarea defaultValue="Invalid value" aria-invalid aria-label="Invalid textarea" />
          <Textarea defaultValue="Disabled" disabled aria-label="Disabled textarea" />
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            {[
              { label: "Unchecked" },
              { label: "Checked", defaultChecked: true },
              { label: "Indeterminate", indeterminate: true },
              { label: "Invalid", "aria-invalid": true },
              { label: "Disabled", disabled: true, defaultChecked: true },
            ].map(({ label, ...props }) => (
              <Label key={label} className="font-normal">
                <Checkbox {...props} /> {label}
              </Label>
            ))}
          </div>
          <RadioGroup defaultValue="b">
            {[
              { value: "a", label: "Unselected" },
              { value: "b", label: "Selected" },
              { value: "c", label: "Disabled", disabled: true },
            ].map((option) => (
              <Label key={option.value} className="font-normal">
                <RadioGroupItem value={option.value} disabled={option.disabled} /> {option.label}
              </Label>
            ))}
          </RadioGroup>
          <div className="flex flex-col gap-3">
            <Label className="font-normal">
              <Switch /> Off
            </Label>
            <Label className="font-normal">
              <Switch defaultChecked /> On
            </Label>
            <Label className="font-normal">
              <Switch size="sm" defaultChecked /> Small
            </Label>
            <Label className="font-normal">
              <Switch disabled /> Disabled
            </Label>
          </div>
        </div>
        <div className="grid max-w-xl gap-6">
          <Slider defaultValue={[40]} aria-label="Single value" />
          <Slider defaultValue={[20, 70]} aria-label="Range" />
          <Slider defaultValue={[55]} disabled aria-label="Disabled" />
        </div>
      </Section>
    </Page>
  )
}
