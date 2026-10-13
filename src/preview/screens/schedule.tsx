import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "@/components/ui/item"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Kind = "production" | "publicity" | "editorial"
type Event = { day: number; title: string; time: string; kind: Kind; where?: string }

const kinds: Record<Kind, { label: string; dot: string }> = {
  production: { label: "Production", dot: "bg-chart-1" },
  publicity: { label: "Publicity", dot: "bg-chart-2" },
  editorial: { label: "Editorial", dot: "bg-chart-3" },
}

const events: Event[] = [
  { day: 2, title: "Acquisitions meeting", time: "10:00", kind: "editorial", where: "Room 2" },
  { day: 6, title: "Cover review: Glasshouse", time: "14:00", kind: "production" },
  { day: 8, title: "Copyedit returned", time: "All day", kind: "editorial" },
  { day: 12, title: "List planning", time: "09:30", kind: "editorial", where: "Room 2" },
  { day: 12, title: "Bookseller call", time: "15:00", kind: "publicity" },
  { day: 14, title: "Cover round three due", time: "All day", kind: "production" },
  { day: 16, title: "Print files due: The Salt Road", time: "17:00", kind: "production" },
  { day: 16, title: "Podcast recording", time: "11:00", kind: "publicity", where: "Studio B" },
  { day: 21, title: "Author review ends", time: "All day", kind: "editorial" },
  { day: 23, title: "Rotterdam launch", time: "19:30", kind: "publicity", where: "Witte de Withstraat" },
  { day: 29, title: "Proofs to author", time: "All day", kind: "production" },
]

// October 2026 starts on a Thursday; the grid runs Monday 28 Sep to Sunday 1 Nov.
const cells = Array.from({ length: 35 }, (_, index) => index - 2)
const today = 12

export function Schedule() {
  const [selected, setSelected] = useState<Date | undefined>(new Date(2026, 9, 12))
  const [hidden, setHidden] = useState<Set<Kind>>(new Set())
  const shown = events.filter((event) => !hidden.has(event.kind))

  return (
    <div className="flex h-full">
      <aside className="hidden w-72 shrink-0 flex-col gap-6 overflow-auto border-r p-4 lg:flex">
        <Button>
          <PlusIcon /> New event
        </Button>
        <Calendar mode="single" selected={selected} onSelect={setSelected} defaultMonth={new Date(2026, 9)} weekStartsOn={1} className="w-full p-0" />
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 text-xs font-medium text-muted-foreground">Calendars</legend>
          {(Object.keys(kinds) as Kind[]).map((kind) => (
            <label key={kind} className="flex items-center gap-3 text-sm">
              <Checkbox
                checked={!hidden.has(kind)}
                onCheckedChange={(checked) => {
                  const next = new Set(hidden)
                  if (checked) next.delete(kind)
                  else next.add(kind)
                  setHidden(next)
                }}
              />
              {kinds[kind].label}
              <span className={cn("ml-auto size-2.5 rounded-full", kinds[kind].dot)} />
            </label>
          ))}
        </fieldset>
      </aside>

      <Tabs defaultValue="month" className="flex min-w-0 flex-1 flex-col gap-0">
        <div className="flex flex-wrap items-center gap-3 px-6 py-4">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">October 2026</h1>
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="Previous month">
              <ChevronLeftIcon />
            </Button>
            <Button variant="outline">Today</Button>
            <Button variant="outline" size="icon" aria-label="Next month">
              <ChevronRightIcon />
            </Button>
          </ButtonGroup>
          <TabsList className="ml-auto">
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="month" className="flex min-h-0 flex-1 flex-col px-6 pb-6">
          <div className="grid grid-cols-7 text-xs font-medium text-muted-foreground">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="px-2 pb-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid min-h-[36rem] flex-1 grid-cols-7 grid-rows-5 overflow-hidden rounded-lg border">
            {cells.map((day, index) => {
              const inMonth = day >= 1 && day <= 31
              const label = day < 1 ? 30 + day : day > 31 ? day - 31 : day
              return (
                <div
                  key={index}
                  className={cn(
                    "flex min-w-0 flex-col gap-1 border-r border-b p-1.5 [&:nth-child(7n)]:border-r-0 [&:nth-last-child(-n+7)]:border-b-0",
                    !inMonth && "bg-muted/40 text-muted-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full text-xs tabular-nums",
                      inMonth && day === today && "border border-primary-border bg-primary font-medium text-primary-foreground"
                    )}
                  >
                    {label}
                  </span>
                  {inMonth &&
                    shown
                      .filter((event) => event.day === day)
                      .map((event) => (
                        <Popover key={event.title}>
                          <PopoverTrigger className="flex items-center gap-1.5 rounded-sm border bg-muted px-1.5 py-1 text-left text-xs outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
                            <span className={cn("size-1.5 shrink-0 rounded-full", kinds[event.kind].dot)} />
                            <span className="truncate">{event.title}</span>
                          </PopoverTrigger>
                          <PopoverContent className="w-72">
                            <PopoverHeader>
                              <PopoverTitle>{event.title}</PopoverTitle>
                              <PopoverDescription>
                                Oct {event.day} · {event.time} · {kinds[event.kind].label}
                              </PopoverDescription>
                            </PopoverHeader>
                            {event.where && (
                              <p className="flex items-center gap-2 text-sm">
                                <MapPinIcon className="size-4 text-muted-foreground" /> {event.where}
                              </p>
                            )}
                            <div className="flex gap-2">
                              <Button size="sm">Open</Button>
                              <Button size="sm" variant="outline">
                                Reschedule
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      ))}
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="agenda" className="min-h-0 flex-1 overflow-auto px-6 pb-6">
          <ItemGroup className="max-w-2xl rounded-lg border">
            {shown.map((event, index) => (
              <div key={event.title}>
                {index > 0 && <ItemSeparator />}
                <Item>
                  <ItemMedia className="w-12 flex-col gap-0 self-center text-center">
                    <span className="text-xs text-muted-foreground">Oct</span>
                    <span className="text-lg leading-none font-semibold tabular-nums">{event.day}</span>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>
                      <span className={cn("size-2 rounded-full", kinds[event.kind].dot)} /> {event.title}
                    </ItemTitle>
                    <ItemDescription>
                      {event.time}
                      {event.where && ` · ${event.where}`} · {kinds[event.kind].label}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </div>
            ))}
          </ItemGroup>
        </TabsContent>
      </Tabs>
    </div>
  )
}
