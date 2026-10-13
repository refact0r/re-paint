import { useState } from "react"
import { CheckIcon, CreditCardIcon, EyeIcon, EyeOffIcon, MoreHorizontalIcon, UserPlusIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"

import { Page, PageHeader, people } from "../page"

const timezones = [
  { value: "ams", label: "Amsterdam (CET)" },
  { value: "lon", label: "London (GMT)" },
  { value: "nyc", label: "New York (EST)" },
  { value: "tyo", label: "Tokyo (JST)" },
]
const roles = [
  { value: "owner", label: "Owner" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
]
const plans = [
  { value: "chapbook", name: "Chapbook", price: "$0", detail: "Up to 5 titles, 2 seats" },
  { value: "press", name: "Press", price: "$29", detail: "Up to 100 titles, 10 seats" },
  { value: "house", name: "House", price: "$99", detail: "Unlimited titles and seats" },
]
const invoices = [
  { id: "INV-0042", date: "Oct 1, 2026", amount: "$29.00", status: "Paid" },
  { id: "INV-0041", date: "Sep 1, 2026", amount: "$29.00", status: "Paid" },
  { id: "INV-0040", date: "Aug 1, 2026", amount: "$29.00", status: "Refunded" },
]
const notificationRows = [
  { id: "submissions", title: "New submissions", description: "When a manuscript arrives during a reading period." },
  { id: "comments", title: "Comments and mentions", description: "When someone replies to you or mentions you in a manuscript." },
  { id: "deadlines", title: "Deadlines", description: "Two days before anything you own is due." },
  { id: "sales", title: "Weekly sales summary", description: "Every Monday morning." },
]

function Profile() {
  const [showKey, setShowKey] = useState(false)
  const [handle, setHandle] = useState("ines okafor")
  const handleInvalid = /[^a-z0-9-]/.test(handle)

  return (
    <form
      className="max-w-2xl"
      onSubmit={(event) => {
        event.preventDefault()
        toast.add({ type: "success", title: "Profile saved" })
      }}
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Profile</FieldLegend>
          <FieldDescription>How you appear to the rest of the team and to authors.</FieldDescription>
          <FieldGroup>
            <Field orientation="horizontal">
              <Avatar className="size-16">
                <AvatarFallback className="text-lg">IO</AvatarFallback>
              </Avatar>
              <FieldContent>
                <FieldTitle>Photo</FieldTitle>
                <FieldDescription>PNG or JPG, at least 256 px square.</FieldDescription>
              </FieldContent>
              <Button type="button" variant="outline" size="sm">
                Upload
              </Button>
              <Button type="button" variant="ghost" size="sm">
                Remove
              </Button>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="first-name">First name</FieldLabel>
                <Input id="first-name" defaultValue="Ines" autoComplete="given-name" />
              </Field>
              <Field>
                <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                <Input id="last-name" defaultValue="Okafor" autoComplete="family-name" />
              </Field>
            </div>
            <Field data-invalid={handleInvalid || undefined}>
              <FieldLabel htmlFor="handle">Handle</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>halfmoon.press/</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput id="handle" value={handle} onChange={(event) => setHandle(event.target.value)} aria-invalid={handleInvalid} />
                {!handleInvalid && (
                  <InputGroupAddon align="inline-end">
                    <CheckIcon className="text-success" />
                  </InputGroupAddon>
                )}
              </InputGroup>
              {handleInvalid ? (
                <FieldError>Use lowercase letters, numbers and hyphens only.</FieldError>
              ) : (
                <FieldDescription>This handle is available.</FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" defaultValue="ines@halfmoon.press" disabled />
              <FieldDescription>Managed by your workspace. Ask an owner to change it.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea id="bio" rows={4} defaultValue="Managing editor at Halfmoon Press. I acquire literary fiction and narrative nonfiction about place." />
              <FieldDescription>Shown on the public submissions page. 104 of 280 characters.</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Preferences</FieldLegend>
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Time zone</FieldLabel>
                <Select defaultValue="ams" items={timezones}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Europe</SelectLabel>
                      <SelectItem value="ams">Amsterdam (CET)</SelectItem>
                      <SelectItem value="lon">London (GMT)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Elsewhere</SelectLabel>
                      <SelectItem value="nyc">New York (EST)</SelectItem>
                      <SelectItem value="tyo">Tokyo (JST)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="week-start">Week starts on</FieldLabel>
                <NativeSelect id="week-start" defaultValue="mon" className="w-full">
                  <NativeSelectOption value="mon">Monday</NativeSelectOption>
                  <NativeSelectOption value="sun">Sunday</NativeSelectOption>
                </NativeSelect>
              </Field>
              <Field>
                <FieldLabel htmlFor="birthday">Start date</FieldLabel>
                <Input id="birthday" type="date" defaultValue="2019-04-01" />
              </Field>
              <Field>
                <FieldLabel htmlFor="seats">Reading quota per week</FieldLabel>
                <Input id="seats" type="number" min={0} max={40} defaultValue={8} />
              </Field>
            </div>
            <Field>
              <div className="flex items-baseline justify-between">
                <FieldLabel>Editor text size</FieldLabel>
                <span className="text-sm text-muted-foreground tabular-nums">17 px</span>
              </div>
              <Slider defaultValue={[17]} min={13} max={24} step={1} aria-label="Editor text size" />
            </Field>
            <FieldSet>
              <FieldLegend variant="label">Manuscript typeface</FieldLegend>
              <RadioGroup defaultValue="serif">
                {[
                  { value: "serif", title: "Serif", description: "Closer to how the book will be set." },
                  { value: "sans", title: "Sans serif", description: "Easier on low resolution screens." },
                  { value: "mono", title: "Monospace", description: "For counting characters and aligning verse." },
                ].map((option) => (
                  <FieldLabel key={option.value} htmlFor={`face-${option.value}`}>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>{option.title}</FieldTitle>
                        <FieldDescription>{option.description}</FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value={option.value} id={`face-${option.value}`} />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
            </FieldSet>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>API access</FieldLegend>
          <Field>
            <FieldLabel htmlFor="api-key">Personal key</FieldLabel>
            <InputGroup>
              <InputGroupInput id="api-key" readOnly type={showKey ? "text" : "password"} defaultValue="hm_live_8f2k19x7c4q0z5" className="font-mono" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-xs" aria-label={showKey ? "Hide key" : "Show key"} onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOffIcon /> : <EyeIcon />}
                </InputGroupButton>
                <InputGroupButton onClick={() => toast.add({ title: "Key copied to clipboard" })}>Copy</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit">Save changes</Button>
          <Button type="reset" variant="ghost">
            Discard
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

function Notifications() {
  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <FieldSet>
        <FieldLegend>Email notifications</FieldLegend>
        <FieldDescription>Choose what reaches your inbox. In-app notifications are always on.</FieldDescription>
        <FieldGroup className="gap-0 divide-y rounded-lg border">
          {notificationRows.map((row, index) => (
            <Field key={row.id} orientation="horizontal" className="p-4">
              <FieldContent>
                <FieldLabel htmlFor={`notify-${row.id}`}>{row.title}</FieldLabel>
                <FieldDescription>{row.description}</FieldDescription>
              </FieldContent>
              <Switch id={`notify-${row.id}`} defaultChecked={index !== 3} />
            </Field>
          ))}
          <Field orientation="horizontal" className="p-4" data-disabled>
            <FieldContent>
              <FieldLabel htmlFor="notify-sms">Text messages</FieldLabel>
              <FieldDescription>Available on the House plan.</FieldDescription>
            </FieldContent>
            <Switch id="notify-sms" disabled />
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend variant="label">Also notify me about</FieldLegend>
        <FieldGroup className="gap-3">
          {["Titles I follow", "Rights offers", "Printer status changes"].map((label, index) => (
            <Field key={label} orientation="horizontal">
              <Checkbox id={`also-${index}`} defaultChecked={index < 2} />
              <FieldLabel htmlFor={`also-${index}`} className="font-normal">
                {label}
              </FieldLabel>
            </Field>
          ))}
        </FieldGroup>
      </FieldSet>
    </div>
  )
}

function Team() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-2">
        <Field className="w-80">
          <FieldLabel htmlFor="invite">Invite by email</FieldLabel>
          <Input id="invite" type="email" placeholder="name@example.com" />
        </Field>
        <Select defaultValue="editor" items={roles}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => toast.add({ type: "info", title: "Invitation sent", description: "They have 7 days to accept." })}>
          <UserPlusIcon /> Send invite
        </Button>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last active</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.values(people).map((person, index) => (
              <TableRow key={person.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{person.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {person.name} {index === 0 && <Badge variant="outline">You</Badge>}
                      </p>
                      <p className="text-muted-foreground">{person.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{person.role}</TableCell>
                <TableCell>
                  <Select defaultValue={index === 0 ? "owner" : index === 4 ? "viewer" : "editor"} items={roles} disabled={index === 0}>
                    <SelectTrigger size="sm" className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-muted-foreground">{["Now", "2 hours ago", "Yesterday", "Oct 9", "Invited"][index]}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${person.name}`}>
                    <MoreHorizontalIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function Billing() {
  return (
    <div className="flex flex-col gap-8">
      <RadioGroup defaultValue="press" className="grid gap-4 md:grid-cols-3" aria-label="Plan">
        {plans.map((plan) => (
          <FieldLabel key={plan.value} htmlFor={`plan-${plan.value}`}>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>
                  {plan.name} {plan.value === "press" && <Badge variant="secondary">Current</Badge>}
                </FieldTitle>
                <p className="text-2xl font-semibold tabular-nums">
                  {plan.price}
                  <span className="text-sm font-normal text-muted-foreground"> / month</span>
                </p>
                <FieldDescription>{plan.detail}</FieldDescription>
              </FieldContent>
              <RadioGroupItem value={plan.value} id={`plan-${plan.value}`} />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Usage this month</CardTitle>
            <CardDescription>Resets on November 1</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {[
              { label: "Titles", used: 64, of: 100 },
              { label: "Seats", used: 5, of: 10 },
              { label: "Storage", used: 46, of: 50, unit: " GB" },
            ].map((meter) => (
              <div key={meter.label} className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span>{meter.label}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {meter.used} of {meter.of}
                    {meter.unit}
                  </span>
                </div>
                <Progress value={(meter.used / meter.of) * 100} aria-label={meter.label} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment method</CardTitle>
            <CardDescription>Charged on the first of each month</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md border">
              <CreditCardIcon className="size-5" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Visa ending 4242</p>
              <p className="text-muted-foreground">Expires 08/2028</p>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline" size="sm">
              Update card
            </Button>
            <Button variant="ghost" size="sm">
              Billing address
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  <Badge variant={invoice.status === "Paid" ? "secondary" : "outline"}>{invoice.status}</Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function Danger() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <Alert variant="destructive">
        <AlertTitle>These actions affect everyone in Halfmoon Press</AlertTitle>
        <AlertDescription>Only workspace owners can see this tab.</AlertDescription>
      </Alert>
      <div className="divide-y rounded-lg border">
        <div className="flex items-center justify-between gap-6 p-4">
          <div className="text-sm">
            <p className="font-medium">Transfer ownership</p>
            <p className="text-muted-foreground">Hand the workspace to another member. You become an editor.</p>
          </div>
          <Button variant="outline">Transfer</Button>
        </div>
        <div className="flex items-center justify-between gap-6 p-4">
          <div className="text-sm">
            <p className="font-medium">Delete workspace</p>
            <p className="text-muted-foreground">Removes all 64 titles, their files and sales history after 30 days.</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>Delete workspace</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Halfmoon Press?</AlertDialogTitle>
                <AlertDialogDescription>
                  All members lose access immediately. You have 30 days to restore the workspace before its data is erased.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep workspace</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Delete workspace</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}

export function Settings() {
  return (
    <Page>
      <PageHeader title="Settings" description="Manage your profile, your team and the workspace plan." />
      <Tabs defaultValue="profile" className="gap-8">
        <TabsList variant="line">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="danger">Danger zone</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Profile />
        </TabsContent>
        <TabsContent value="notifications">
          <Notifications />
        </TabsContent>
        <TabsContent value="team">
          <Team />
        </TabsContent>
        <TabsContent value="billing">
          <Billing />
        </TabsContent>
        <TabsContent value="danger">
          <Danger />
        </TabsContent>
      </Tabs>
    </Page>
  )
}
