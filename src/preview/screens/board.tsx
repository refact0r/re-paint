import { useState } from "react"
import { CalendarIcon, MessageSquareIcon, MoreHorizontalIcon, PaperclipIcon, PlusIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

import { people, type PersonId } from "../page"

type Card = { id: string; title: string; book: string; tag: string; due?: string; overdue?: boolean; owners: PersonId[]; comments: number; files: number; done: number; total: number }

const columns: { name: string; cards: Card[] }[] = [
  {
    name: "Editing",
    cards: [
      { id: "HM-212", title: "Structural edit, part two", book: "A Field Guide to Small Hours", tag: "Edit", due: "Oct 30", owners: ["ines", "priya"], comments: 6, files: 2, done: 3, total: 9 },
      { id: "HM-219", title: "Permissions for epigraphs", book: "Quiet Machinery", tag: "Legal", owners: ["priya"], comments: 1, files: 0, done: 0, total: 3 },
    ],
  },
  {
    name: "Design",
    cards: [
      { id: "HM-198", title: "Cover round three", book: "Glasshouse", tag: "Cover", due: "Oct 14", overdue: true, owners: ["daniel", "mei", "ines"], comments: 14, files: 7, done: 4, total: 5 },
      { id: "HM-204", title: "Interior sample spreads", book: "Glasshouse", tag: "Interior", due: "Oct 22", owners: ["daniel"], comments: 2, files: 3, done: 1, total: 4 },
      { id: "HM-221", title: "Map illustration brief", book: "Borrowed Weather", tag: "Art", owners: ["daniel", "tomas"], comments: 0, files: 1, done: 0, total: 2 },
    ],
  },
  {
    name: "Proofing",
    cards: [{ id: "HM-187", title: "Second proofread", book: "Borrowed Weather", tag: "Proof", due: "Oct 19", owners: ["tomas"], comments: 3, files: 1, done: 6, total: 8 }],
  },
  {
    name: "At printer",
    cards: [{ id: "HM-171", title: "Paperback reprint, 3,000 copies", book: "The Salt Road", tag: "Print", due: "Oct 16", owners: ["tomas", "ines"], comments: 9, files: 4, done: 7, total: 8 }],
  },
  { name: "Done", cards: [] },
]

const checklist = ["Collect author feedback", "Revise type lockup", "Test spine at 22 mm", "Export print-ready PDF", "Send to author for sign-off"]

export function Board() {
  const [open, setOpen] = useState<Card | null>(null)

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-10">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">Production board</h1>
          <p className="text-muted-foreground">Spring list · 7 open tasks across 5 titles</p>
        </div>
        <div className="flex items-center gap-3">
          <AvatarGroup>
            {(["ines", "tomas", "daniel"] as const).map((id) => (
              <Avatar key={id}>
                <AvatarFallback>{people[id].initials}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+2</AvatarGroupCount>
          </AvatarGroup>
          <ButtonGroup>
            <Button variant="outline">Filter</Button>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="Board options" />}>
                <MoreHorizontalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Show on cards</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem checked>Due date</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>Progress</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Task ID</DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Group by</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Stage</DropdownMenuItem>
                    <DropdownMenuItem>Title</DropdownMenuItem>
                    <DropdownMenuItem>Owner</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
          <Button>
            <PlusIcon /> New task
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-4 overflow-x-auto px-6 pb-6 lg:px-10">
        {columns.map((column) => (
          <section key={column.name} className="flex w-80 shrink-0 flex-col rounded-xl border bg-muted/50 p-2">
            <header className="flex items-center gap-2 px-2 py-2">
              <h2 className="text-sm font-medium">{column.name}</h2>
              <span className="text-sm text-muted-foreground tabular-nums">{column.cards.length}</span>
              <Button variant="ghost" size="icon-xs" className="ml-auto" aria-label={`Add task to ${column.name}`}>
                <PlusIcon />
              </Button>
            </header>
            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
              {column.cards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setOpen(card)}
                  className="flex flex-col gap-3 rounded-lg border bg-card p-3 text-left text-sm shadow-xs outline-none hover:border-ring focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{card.tag}</Badge>
                    <span className="font-mono text-xs text-muted-foreground">{card.id}</span>
                  </div>
                  <div>
                    <p className="font-medium">{card.title}</p>
                    <p className="text-muted-foreground">{card.book}</p>
                  </div>
                  <Progress value={(card.done / card.total) * 100} aria-label={`${card.done} of ${card.total} steps done`} />
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {card.due && (
                      <span className={`flex items-center gap-1 ${card.overdue ? "font-medium text-destructive" : ""}`}>
                        <CalendarIcon className="size-3.5" /> {card.due}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <MessageSquareIcon className="size-3.5" /> {card.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <PaperclipIcon className="size-3.5" /> {card.files}
                    </span>
                    <AvatarGroup className="ml-auto *:data-[slot=avatar]:ring-card">
                      {card.owners.map((owner) => (
                        <Avatar key={owner} size="sm">
                          <AvatarFallback>{people[owner].initials}</AvatarFallback>
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </div>
                </button>
              ))}
              {column.cards.length === 0 && (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  Nothing finished yet this week. Drag a task here when it ships.
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      <Drawer open={open !== null} onOpenChange={(next) => !next && setOpen(null)}>
        <DrawerContent>
          {open && (
            <div className="mx-auto w-full max-w-xl">
              <DrawerHeader>
                <DrawerTitle>{open.title}</DrawerTitle>
                <DrawerDescription>
                  {open.book} · {open.id}
                  {open.due && ` · due ${open.due}`}
                </DrawerDescription>
              </DrawerHeader>
              <ul className="flex flex-col gap-3 px-4 text-sm">
                {checklist.slice(0, Math.max(open.total, 3)).map((step, index) => (
                  <li key={step}>
                    <label className="flex items-center gap-3">
                      <Checkbox defaultChecked={index < open.done} />
                      {step}
                    </label>
                  </li>
                ))}
              </ul>
              <DrawerFooter>
                <Button>Mark task complete</Button>
                <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
              </DrawerFooter>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}
