import { useState } from "react"
import {
  ArchiveIcon,
  ClockIcon,
  FileTextIcon,
  ForwardIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  ReplyIcon,
  SearchIcon,
  SendIcon,
  StarIcon,
  Trash2Icon,
} from "lucide-react"

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/toast"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type Mail = {
  id: number
  from: string
  initials: string
  subject: string
  preview: string
  when: string
  unread: boolean
  labels: string[]
  body: string[]
}

const mails: Mail[] = [
  {
    id: 1,
    from: "Ruth Abernathy",
    initials: "RA",
    subject: "Revised ending for Low Tide Almanac",
    preview: "I took your note about the last chapter seriously and rewrote the final twelve pages…",
    when: "10:24",
    unread: true,
    labels: ["Author", "Needs reply"],
    body: [
      "Hi Ines,",
      "I took your note about the last chapter seriously and rewrote the final twelve pages. The harbour scene now happens before the letter arrives, which means Clara already knows when she reads it. I think it lands harder this way, but it does cost us the surprise.",
      "Two things I am unsure about: whether the almanac entries should keep their dates now that the timeline has shifted, and whether the epigraph still fits. I have attached the new chapter and a short note on what changed.",
      "No rush before the 21st. I would rather you read it slowly.",
      "Ruth",
    ],
  },
  {
    id: 2,
    from: "Northgate Printing",
    initials: "NP",
    subject: "Proof approval needed: The Salt Road",
    preview: "Wet proofs shipped this morning. Please confirm spine width of 18.5 mm before we plate…",
    when: "9:03",
    unread: true,
    labels: ["Production"],
    body: ["Wet proofs shipped this morning.", "Please confirm the spine width of 18.5 mm before we plate on Thursday."],
  },
  {
    id: 3,
    from: "Kwame Mensah",
    initials: "KM",
    subject: "Submission: Quiet Machinery (novel, 84k words)",
    preview: "Thank you for the open reading period. Attached is the full manuscript and a synopsis…",
    when: "Yesterday",
    unread: true,
    labels: ["Submission"],
    body: ["Thank you for the open reading period.", "Attached is the full manuscript and a one page synopsis."],
  },
  {
    id: 4,
    from: "Mei Tanaka",
    initials: "MT",
    subject: "Launch venue options for Glasshouse",
    preview: "Three venues can do the second week of March. The bookshop on Witte de Withstraat is…",
    when: "Yesterday",
    unread: false,
    labels: ["Publicity"],
    body: ["Three venues can do the second week of March.", "The bookshop on Witte de Withstraat is my pick: 80 seats and they handle sales."],
  },
  {
    id: 5,
    from: "Foreign Rights Desk",
    initials: "FR",
    subject: "German offer for Night Ferry",
    preview: "We have a five-figure offer from a Berlin house, with an option on the next book…",
    when: "Fri",
    unread: false,
    labels: ["Rights"],
    body: ["We have a five-figure offer from a Berlin house, with an option on the next book.", "They need an answer by the end of the month."],
  },
  {
    id: 6,
    from: "Tomas Lindqvist",
    initials: "TL",
    subject: "Paper stock is going up 9% in January",
    preview: "Heads up before we cost the spring list. I asked for a quote on the lighter cream…",
    when: "Thu",
    unread: false,
    labels: ["Production"],
    body: ["Heads up before we cost the spring list.", "I asked for a quote on the lighter cream stock as a fallback."],
  },
]

function IconAction({ label, children, onClick }: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label={label} onClick={onClick} />}>
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export function Inbox() {
  const [selectedId, setSelectedId] = useState(1)
  const [filter, setFilter] = useState("all")
  const [starred, setStarred] = useState(false)
  const visible = filter === "unread" ? mails.filter((mail) => mail.unread) : mails
  const mail = mails.find((item) => item.id === selectedId)!

  return (
    <ResizablePanelGroup orientation="horizontal" className="h-full">
      <ResizablePanel defaultSize="36%" minSize="26%" maxSize="50%" className="flex flex-col">
        <div className="flex items-center justify-between gap-3 px-4 pt-4">
          <h1 className="font-heading text-lg font-semibold">Inbox</h1>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="p-4">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search mail" />
          </InputGroup>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          <ul className="flex flex-col gap-1 px-2 pb-4">
            {visible.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    "flex w-full flex-col gap-1.5 rounded-lg px-3 py-3 text-left text-sm outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring",
                    item.id === selectedId && "bg-accent hover:bg-accent"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {item.unread && <span className="size-2 shrink-0 rounded-full bg-info" aria-label="Unread" />}
                    <span className={cn("truncate", item.unread && "font-semibold")}>{item.from}</span>
                    <time className="ml-auto shrink-0 text-xs text-muted-foreground">{item.when}</time>
                  </div>
                  <span className={cn("truncate", item.unread && "font-medium")}>{item.subject}</span>
                  <span className="line-clamp-2 text-muted-foreground">{item.preview}</span>
                  <div className="mt-1 flex gap-1.5">
                    {item.labels.map((label) => (
                      <Badge key={label} variant={label === "Needs reply" ? "default" : "outline"}>
                        {label}
                      </Badge>
                    ))}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize="64%" className="flex flex-col">
        <div className="flex items-center gap-1 border-b px-3 py-2">
          <IconAction label="Archive" onClick={() => toast.add({ title: "Conversation archived" })}>
            <ArchiveIcon />
          </IconAction>
          <IconAction label="Snooze">
            <ClockIcon />
          </IconAction>
          <IconAction label="Delete">
            <Trash2Icon />
          </IconAction>
          <Separator orientation="vertical" className="mx-1 data-vertical:h-5 data-vertical:self-center" />
          <IconAction label={starred ? "Unstar" : "Star"} onClick={() => setStarred(!starred)}>
            <StarIcon className={cn(starred && "fill-warning text-warning")} />
          </IconAction>
          <div className="ml-auto flex items-center gap-1">
            <IconAction label="Reply">
              <ReplyIcon />
            </IconAction>
            <IconAction label="Forward">
              <ForwardIcon />
            </IconAction>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="More" />}>
                <MoreHorizontalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                <DropdownMenuItem>Add label…</DropdownMenuItem>
                <DropdownMenuItem>Print</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Block sender</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ScrollArea className="min-h-0 flex-1">
          <article className="mx-auto flex max-w-3xl flex-col gap-6 px-8 py-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-balance">{mail.subject}</h2>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{mail.initials}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <HoverCard>
                  <HoverCardTrigger render={<button type="button" className="font-medium underline-offset-4 hover:underline" />}>
                    {mail.from}
                  </HoverCardTrigger>
                  <HoverCardContent className="w-72">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>{mail.initials}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{mail.from}</p>
                        <p className="text-muted-foreground">Author of two Halfmoon titles. Last wrote 6 days ago.</p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <p className="text-muted-foreground">to me, Priya · Oct 12, {mail.when}</p>
              </div>
              <div className="ml-auto flex gap-1.5">
                {mail.labels.map((label) => (
                  <Badge key={label} variant="secondary">
                    {label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 leading-relaxed">
              {mail.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Attachment>
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>chapter-14-revised.docx</AttachmentTitle>
                  <AttachmentDescription>48 KB</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
              <Attachment>
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>what-changed.pdf</AttachmentTitle>
                  <AttachmentDescription>112 KB</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
            </div>
          </article>
        </ScrollArea>

        <div className="border-t p-4">
          <InputGroup className="mx-auto max-w-3xl">
            <InputGroupTextarea placeholder={`Reply to ${mail.from.split(" ")[0]}…`} rows={3} />
            <InputGroupAddon align="block-end">
              <InputGroupButton size="icon-xs" aria-label="Attach file">
                <PaperclipIcon />
              </InputGroupButton>
              <span className="text-xs text-muted-foreground">Draft saved 2 min ago</span>
              <InputGroupButton
                variant="default"
                size="sm"
                className="ml-auto"
                onClick={() => toast.add({ type: "success", title: "Reply sent", description: `To ${mail.from}` })}
              >
                Send <SendIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
