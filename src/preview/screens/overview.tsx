import { ArrowDownRightIcon, ArrowUpRightIcon, CalendarClockIcon, PlusIcon, TruckIcon } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/toast"

import { Page, PageHeader, people, type PersonId } from "../page"

const ranges = [
  { value: "30d", label: "Last 30 days" },
  { value: "quarter", label: "This quarter" },
  { value: "year", label: "Last 12 months" },
]

const stats = [
  { label: "Units sold", value: "12,480", delta: "+8.2%", up: true, note: "vs. previous 12 months" },
  { label: "Net revenue", value: "$184,300", delta: "+3.1%", up: true, note: "after returns" },
  { label: "Return rate", value: "6.4%", delta: "+1.2 pts", up: false, note: "trade channel only" },
  { label: "Open submissions", value: "46", delta: "12 unread", up: null, note: "median wait 19 days" },
]

const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
const print = [620, 1180, 540, 480, 610, 720, 690, 810, 760, 700, 930, 1040]
const ebook = [210, 420, 260, 230, 250, 280, 300, 340, 330, 310, 380, 420]
const unitsByFormat = months.map((month, index) => ({ month, print: print[index], ebook: ebook[index] }))

const formatConfig = {
  print: { label: "Print", color: "var(--chart-1)" },
  ebook: { label: "Ebook", color: "var(--chart-2)" },
} satisfies ChartConfig

const revenueByTitle = [
  { title: "The Salt Road", revenue: 61200 },
  { title: "Night Ferry", revenue: 43800 },
  { title: "Borrowed Weather", revenue: 31500 },
  { title: "Glasshouse", revenue: 27900 },
  { title: "Low Tide Almanac", revenue: 19900 },
]

const revenueConfig = { revenue: { label: "Revenue", color: "var(--chart-1)" } } satisfies ChartConfig

const production = [
  { title: "A Field Guide to Small Hours", stage: "Copyedit", progress: 35 },
  { title: "Glasshouse", stage: "Typesetting", progress: 60 },
  { title: "The Salt Road (paperback)", stage: "At printer", progress: 90 },
  { title: "Borrowed Weather", stage: "Proofread", progress: 75 },
]

const activity: { who: PersonId; text: string; when: string }[] = [
  { who: "priya", text: "accepted a submission: Quiet Machinery", when: "9:42" },
  { who: "daniel", text: "uploaded cover-v3.pdf to Glasshouse", when: "9:10" },
  { who: "tomas", text: "moved Borrowed Weather to Proofread", when: "Yesterday" },
  { who: "mei", text: "scheduled a launch event in Rotterdam", when: "Yesterday" },
  { who: "ines", text: "commented on chapter 4 of Night Ferry", when: "Mon" },
]

const deadlines = [
  { date: "Oct 16", what: "Print files due", title: "The Salt Road", tone: "destructive" as const },
  { date: "Oct 21", what: "Author review ends", title: "Glasshouse", tone: "secondary" as const },
  { date: "Nov 03", what: "Catalog copy locked", title: "Spring list", tone: "secondary" as const },
]

export function Overview() {
  return (
    <Page>
      <PageHeader title="Good afternoon, Ines" description="Here is where the list stands on Monday, October 12.">
        <Select defaultValue="year" items={ranges}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ranges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => toast.add({ type: "success", title: "Draft title created" })}>
          <PlusIcon /> New title
        </Button>
      </PageHeader>

      <Alert>
        <TruckIcon />
        <AlertTitle>Print files for The Salt Road are due Friday</AlertTitle>
        <AlertDescription>The printer needs final interiors and cover by 5 pm to hold the November slot.</AlertDescription>
        <AlertAction>
          <Button variant="outline" size="sm">
            Review files
          </Button>
        </AlertAction>
      </Alert>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">{stat.value}</CardTitle>
              <CardAction>
                <Badge variant="outline" className={stat.up === true ? "text-success" : stat.up === false ? "text-destructive" : ""}>
                  {stat.up === true && <ArrowUpRightIcon />}
                  {stat.up === false && <ArrowDownRightIcon />}
                  {stat.delta}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="mt-auto text-sm text-muted-foreground">{stat.note}</CardFooter>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Units sold by format</CardTitle>
            <CardDescription>Monthly, all channels</CardDescription>
            <CardAction>
              <Tabs defaultValue="units">
                <TabsList>
                  <TabsTrigger value="units">Units</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ChartContainer config={formatConfig} className="aspect-auto h-72 w-full">
              <AreaChart data={unitsByFormat} margin={{ left: 0, right: 8, top: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} width={40} tickCount={4} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area dataKey="print" type="monotone" stroke="var(--color-print)" strokeWidth={2} fill="var(--color-print)" fillOpacity={0.12} />
                <Area dataKey="ebook" type="monotone" stroke="var(--color-ebook)" strokeWidth={2} fill="var(--color-ebook)" fillOpacity={0.12} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue by title</CardTitle>
            <CardDescription>Top five, last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueConfig} className="aspect-auto h-72 w-full">
              <BarChart data={revenueByTitle} layout="vertical" margin={{ left: 0, right: 16 }} barCategoryGap={10}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickCount={4} tickFormatter={(value) => `$${value / 1000}k`} />
                <YAxis type="category" dataKey="title" tickLine={false} axisLine={false} width={150} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel={false} />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>In production</CardTitle>
            <CardDescription>Four titles moving this month</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {production.map((item) => (
              <div key={item.title} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate font-medium">{item.title}</span>
                  <span className="shrink-0 text-muted-foreground">{item.stage}</span>
                </div>
                <Progress value={item.progress} aria-label={`${item.title} progress`} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Across the team</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-4">
              {activity.map((item) => (
                <li key={item.text} className="flex gap-3 text-sm">
                  <Avatar className="size-7">
                    <AvatarFallback className="text-xs">{people[item.who].initials}</AvatarFallback>
                  </Avatar>
                  <p className="flex-1">
                    <span className="font-medium">{people[item.who].name.split(" ")[0]}</span> {item.text}
                  </p>
                  <time className="shrink-0 text-xs text-muted-foreground">{item.when}</time>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deadlines</CardTitle>
            <CardDescription>Next three weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col divide-y">
              {deadlines.map((item) => (
                <li key={item.what} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <CalendarClockIcon className="size-4 text-muted-foreground" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{item.what}</p>
                    <p className="text-muted-foreground">{item.title}</p>
                  </div>
                  <Badge variant={item.tone}>{item.date}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button variant="ghost" size="sm" className="-ml-2">
              Open schedule
            </Button>
          </CardFooter>
        </Card>
      </section>
    </Page>
  )
}
