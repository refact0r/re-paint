import { useState } from "react"
import {
  BoldIcon,
  ChevronRightIcon,
  HistoryIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  MessageSquareIcon,
  QuoteIcon,
  Redo2Icon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

const styles = [
  { value: "body", label: "Body text" },
  { value: "h1", label: "Heading 1" },
  { value: "h2", label: "Heading 2" },
  { value: "quote", label: "Block quote" },
]

const outline = [
  { title: "On keeping an almanac", children: ["What gets written down", "What does not"] },
  { title: "A year of tides", children: ["Reading the table", "Spring and neap"] },
  { title: "Tools", children: [] },
  { title: "Notes", children: [] },
]

const versions = [
  { label: "Current draft", who: "Ruth Abernathy", when: "Today, 10:24", note: "Rewrote the closing section" },
  { label: "Copyedit pass", who: "Tomas Lindqvist", when: "Oct 8", note: "214 changes, 12 queries" },
  { label: "Second draft", who: "Ruth Abernathy", when: "Sep 19", note: "Added the tide table" },
  { label: "First draft", who: "Ruth Abernathy", when: "Aug 2", note: "Initial submission" },
]

export function Manuscript() {
  const [serif, setSerif] = useState(true)

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b px-4 py-2">
        <Menubar className="border-none p-0 shadow-none">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New chapter <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Duplicate</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Export as PDF <MenubarShortcut>⇧⌘E</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>Send to printer</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find and replace…</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked={serif} onCheckedChange={setSerif}>
                Serif typeface
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked>Show comments</MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <Separator orientation="vertical" className="data-vertical:h-5 data-vertical:self-center" />

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Undo">
            <Undo2Icon />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Redo" disabled>
            <Redo2Icon />
          </Button>
          <Select defaultValue="body" items={styles}>
            <SelectTrigger size="sm" className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {styles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ToggleGroup multiple defaultValue={["italic"]} size="sm" spacing={0} variant="outline">
            <ToggleGroupItem value="bold" aria-label="Bold">
              <BoldIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <ItalicIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <UnderlineIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="strike" aria-label="Strikethrough">
              <StrikethroughIcon />
            </ToggleGroupItem>
          </ToggleGroup>
          <Toggle size="sm" aria-label="Bulleted list">
            <ListIcon />
          </Toggle>
          <Toggle size="sm" aria-label="Numbered list">
            <ListOrderedIcon />
          </Toggle>
          <Toggle size="sm" aria-label="Quote">
            <QuoteIcon />
          </Toggle>
          <Toggle size="sm" aria-label="Link">
            <LinkIcon />
          </Toggle>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Badge variant="secondary">Copyedit</Badge>
          <span className="hidden text-sm text-muted-foreground lg:inline">2,140 words · saved</span>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="sm" />}>
              <HistoryIcon /> History
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Version history</SheetTitle>
                <SheetDescription>Restore or compare an earlier draft of this chapter.</SheetDescription>
              </SheetHeader>
              <ol className="flex flex-col gap-1 px-4">
                {versions.map((version, index) => (
                  <li key={version.label} className={cn("rounded-lg p-3 text-sm", index === 0 && "bg-secondary text-secondary-foreground")}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-medium">{version.label}</span>
                      <time className="text-xs text-muted-foreground">{version.when}</time>
                    </div>
                    <p className="text-muted-foreground">
                      {version.who} · {version.note}
                    </p>
                  </li>
                ))}
              </ol>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <nav className="hidden w-64 shrink-0 overflow-auto border-r p-4 lg:block" aria-label="Outline">
          <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">Outline</p>
          {outline.map((section, index) => (
            <Collapsible key={section.title} defaultOpen={index < 2}>
              <CollapsibleTrigger className="group flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted">
                <ChevronRightIcon
                  className={cn("size-4 text-muted-foreground transition-transform group-data-[panel-open]:rotate-90", !section.children.length && "invisible")}
                />
                {section.title}
              </CollapsibleTrigger>
              <CollapsibleContent>
                {section.children.map((child) => (
                  <a key={child} href="#" onClick={(event) => event.preventDefault()} className="block rounded-md py-1.5 pr-2 pl-9 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                    {child}
                  </a>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </nav>

        <div className="min-w-0 flex-1 overflow-auto">
          <ContextMenu>
            <ContextMenuTrigger render={<article className={cn("prose mx-auto px-8 py-12", serif && "prose-serif")} />}>
              <p>
                <small>Low Tide Almanac · Chapter 1</small>
              </p>
              <h1>On keeping an almanac</h1>
              <p className="lead">
                An almanac is a promise to pay attention on the days when nothing happens. This chapter is about how to
                keep that promise for a full year, and what to do when you break it.
              </p>
              <p>
                My grandmother kept hers in a ledger meant for shop accounts. The columns were ruled for pounds,
                shillings and pence, and she used them for <em>wind</em>, <em>water</em> and <em>what the birds were
                doing</em>. She never called it a diary. A diary, she said, is about the person holding the pen, and{" "}
                <strong>an almanac is about everything else</strong>.
              </p>
              <p>
                I started my own the winter I moved back to the coast. The first entries are embarrassing: long,
                anxious, full of adjectives. By March they had shrunk to a line or two, and by June they read like the
                ones in her ledger. If you want the short version of this book, it is that <mark>the entries get
                better as they get shorter</mark>. The <abbr title="Royal National Lifeboat Institution">RNLI</abbr>{" "}
                station log, which I read for comparison, has known this for two centuries.<sup><a href="#fn1">1</a></sup>
              </p>

              <h2>What gets written down</h2>
              <p>
                Every entry answers the same four questions. You can <a href="#">download the blank template</a> or rule
                your own, but keep the order, because the order is what makes a year of entries comparable.
              </p>
              <ol>
                <li>
                  <strong>The water.</strong> Height at the nearest mark, and whether it is coming or going.
                </li>
                <li>
                  <strong>The sky.</strong> Cloud cover in eighths, wind direction, anything unusual about the light.
                </li>
                <li>
                  <strong>The living.</strong> What you saw that was alive, in the order you saw it.
                  <ul>
                    <li>Birds first, since they leave first.</li>
                    <li>
                      Then whatever is in the pools.
                      <ul>
                        <li>Count if you can, estimate if you cannot.</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>One sentence.</strong> Anything else, but only one.
                </li>
              </ol>
              <blockquote>
                <p>Calm. Water like the back of a spoon. Eleven turnstones on the slip, then ten.</p>
                <footer>Ledger entry, 14 February 1961</footer>
              </blockquote>

              <h3>A sample week</h3>
              <p>
                Here is the first week of October from last year. Heights are in metres above chart datum, which is a
                fussy way of saying <q>above the lowest the sea usually gets</q>.
              </p>
              <table>
                <caption>Table 1. Morning observations, Ravensbay slip</caption>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>High water</th>
                    <th>Height</th>
                    <th>Wind</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["1 Oct", "06:12", "4.8 m", "SW 3", "First geese"],
                    ["2 Oct", "06:58", "5.1 m", "SW 4", "Rain by nine"],
                    ["3 Oct", "07:41", "5.3 m", "W 5", "Kelp on the road"],
                    ["4 Oct", "08:23", "5.2 m", "NW 2", "Seal, briefly"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => (
                        <td key={cell}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <figure>
                <div className="flex aspect-[16/9] items-center justify-center rounded-lg border bg-muted text-sm text-muted-foreground">
                  Photograph: the slip at low water
                </div>
                <figcaption>Figure 1. The mark on the third step is where every height in this book was read.</figcaption>
              </figure>

              <h2>What does not</h2>
              <p>
                Leave out how you feel about it. That sounds severe, and I broke the rule often enough that you will
                find the evidence in later chapters, but feelings make entries hard to compare. A cold morning you
                enjoyed and a cold morning you resented were the same temperature.
              </p>
              <h4>Before you begin</h4>
              <ul className="task-list">
                <li>
                  <Checkbox defaultChecked aria-label="Done" /> A notebook that opens flat
                </li>
                <li>
                  <Checkbox defaultChecked aria-label="Done" /> A pencil, because ink runs
                </li>
                <li>
                  <Checkbox aria-label="Done" /> A fixed place to stand
                </li>
              </ul>

              <h3>Terms used in this book</h3>
              <dl>
                <dt>Chart datum</dt>
                <dd>The reference level that tide heights are measured from.</dd>
                <dt>Neap tide</dt>
                <dd>The smallest range between high and low water, at half moon.</dd>
                <dt>Slack water</dt>
                <dd>The short stillness when the tide turns.</dd>
              </dl>

              <p>
                If you keep your notes on a computer, the whole format fits in a line of plain text. I use{" "}
                <code>date | water | sky | living | sentence</code> and search it with <kbd>⌘</kbd> <kbd>F</kbd>.
              </p>
              <pre>
                <code>{`2025-10-03 | HW 07:41 5.3m rising | 6/8 W5 | 40+ geese, 2 curlew | Kelp on the road.
2025-10-04 | HW 08:23 5.2m rising | 2/8 NW2 | seal, 9 turnstone | Quiet after the blow.`}</code>
              </pre>

              <details>
                <summary>A note on units</summary>
                <p>
                  The old ledger uses feet and the Beaufort scale. I have converted heights to metres and left the wind
                  alone, <del>since nobody has improved on it</del> <ins>since it is still what the forecast uses</ins>.
                </p>
              </details>

              <hr />
              <ol className="footnotes">
                <li id="fn1">
                  Station logs are public and surprisingly readable. The oldest surviving volume starts in 1824.
                </li>
              </ol>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
              <ContextMenuItem>
                Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Add comment <ContextMenuShortcut>⌥⌘M</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Suggest edit</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Look up</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>

        <aside className="hidden w-80 shrink-0 flex-col gap-4 overflow-auto border-l p-4 xl:flex">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Comments</p>
            <Badge variant="outline">2 open</Badge>
          </div>
          {[
            { initials: "TL", name: "Tomas Lindqvist", when: "Oct 8", text: "Query: 'eighths' or 'oktas'? The glossary uses oktas." },
            { initials: "IO", name: "Ines Okafor", when: "Oct 9", text: "Love the ledger detail. Could the quote come one paragraph earlier?" },
          ].map((comment) => (
            <div key={comment.name} className="flex flex-col gap-2 rounded-lg border p-3 text-sm">
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarFallback className="text-[10px]">{comment.initials}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{comment.name}</span>
                <time className="ml-auto text-xs text-muted-foreground">{comment.when}</time>
              </div>
              <p>{comment.text}</p>
              <div className="flex gap-2">
                <Button variant="ghost" size="xs">
                  Reply
                </Button>
                <Button variant="ghost" size="xs">
                  Resolve
                </Button>
              </div>
            </div>
          ))}
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              <MessageSquareIcon /> Add comment
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
              <Textarea placeholder="Comment on the selected text…" rows={3} />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Comment</Button>
              </div>
            </PopoverContent>
          </Popover>
        </aside>
      </div>
    </div>
  )
}
