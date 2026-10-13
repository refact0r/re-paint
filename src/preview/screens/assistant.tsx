import { useState } from "react"
import { ArrowUpIcon, CopyIcon, PaperclipIcon, PlusIcon, RefreshCwIcon, SparklesIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group"
import { Marker, MarkerContent } from "@/components/ui/marker"
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "@/components/ui/message"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const history = [
  { group: "Today", items: ["Jacket copy for Glasshouse", "Costing a 3,000 copy reprint"] },
  { group: "Last week", items: ["Rejection letter, kind version", "Comp titles for Night Ferry", "Tide table formatting"] },
]

const suggestions = ["Shorten it to 60 words", "Make the tone drier", "Write three subtitle options"]

type Turn = { from: "user" | "assistant"; text: string }

export function Assistant() {
  const [turns, setTurns] = useState<Turn[]>([])
  const [draft, setDraft] = useState("")
  const [thinking, setThinking] = useState(false)

  const send = (text: string) => {
    if (!text.trim()) return
    setTurns((current) => [...current, { from: "user", text }])
    setDraft("")
    setThinking(true)
    setTimeout(() => {
      setTurns((current) => [...current, { from: "assistant", text: "This is a canned reply so you can see how a new message lands in the thread." }])
      setThinking(false)
    }, 1400)
  }

  return (
    <div className="flex h-full">
      <aside className="hidden w-64 shrink-0 flex-col gap-4 overflow-auto border-r p-3 lg:flex">
        <Button variant="outline" className="justify-start">
          <PlusIcon /> New chat
        </Button>
        {history.map((section) => (
          <div key={section.group}>
            <p className="px-2 pb-1 text-xs font-medium text-muted-foreground">{section.group}</p>
            {section.items.map((item, index) => (
              <button
                key={item}
                type="button"
                className={cn(
                  "block w-full truncate rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted",
                  section.group === "Today" && index === 0 && "bg-accent font-medium text-accent-foreground"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-auto">
          <MessageGroup className="mx-auto max-w-3xl gap-8 px-6 py-8">
            <Marker variant="separator">
              <MarkerContent>Today, 2:14 pm</MarkerContent>
            </Marker>
            <Message align="end">
              <MessageContent>
                <Bubble align="end">
                  <BubbleContent>
                    Draft jacket copy for Glasshouse. It is a novel about two sisters who inherit a failing plant nursery. Keep it under 120 words and do not give away the fire.
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>

            <Message>
              <MessageAvatar>
                <Avatar className="size-8">
                  <AvatarFallback>
                    <SparklesIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>Assistant</MessageHeader>
                <div className="prose text-base">
                  <p>Here is a first pass at 96 words:</p>
                  <blockquote>
                    <p>
                      When their mother dies, Anna and Lise inherit forty years of debt and eleven thousand seedlings. Anna wants to sell. Lise wants one more season. Neither has spoken to the other since the wedding.
                    </p>
                    <p>
                      Over a single summer under glass, the sisters relearn the work their mother never explained and the reasons she never did.
                    </p>
                  </blockquote>
                  <p>A few choices I made, in case you want them changed:</p>
                  <ul>
                    <li>
                      <strong>No plot past the midpoint.</strong> The copy stops before August.
                    </li>
                    <li>
                      <strong>Concrete numbers</strong> instead of adjectives, which matches the book's voice.
                    </li>
                    <li>
                      The last line hints at the secret without naming it. See <code>chapter-09.docx</code> if you want to check how much is safe to say.
                    </li>
                  </ul>
                </div>
                <MessageFooter>
                  {[
                    { label: "Copy", icon: CopyIcon },
                    { label: "Good response", icon: ThumbsUpIcon },
                    { label: "Bad response", icon: ThumbsDownIcon },
                    { label: "Regenerate", icon: RefreshCwIcon },
                  ].map((action) => (
                    <Tooltip key={action.label}>
                      <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label={action.label} />}>
                        <action.icon />
                      </TooltipTrigger>
                      <TooltipContent side="bottom">{action.label}</TooltipContent>
                    </Tooltip>
                  ))}
                </MessageFooter>
              </MessageContent>
            </Message>

            {turns.map((turn, index) =>
              turn.from === "user" ? (
                <Message key={index} align="end">
                  <MessageContent>
                    <Bubble align="end">
                      <BubbleContent>{turn.text}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              ) : (
                <Message key={index}>
                  <MessageAvatar>
                    <Avatar className="size-8">
                      <AvatarFallback>
                        <SparklesIcon className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent>
                    <p>{turn.text}</p>
                  </MessageContent>
                </Message>
              )
            )}

            {thinking && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
                <Spinner /> Thinking…
              </div>
            )}
          </MessageGroup>
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-6 pb-6">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Button key={suggestion} variant="outline" size="sm" className="rounded-full" onClick={() => send(suggestion)}>
                {suggestion}
              </Button>
            ))}
          </div>
          <InputGroup>
            <InputGroupTextarea
              placeholder="Ask about a title, or paste text to edit…"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  send(draft)
                }
              }}
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton size="icon-sm" variant="outline" className="rounded-full" aria-label="Attach">
                <PaperclipIcon />
              </InputGroupButton>
              <NativeSelect size="sm" className="ml-auto" aria-label="Model" defaultValue="careful">
                <NativeSelectOption value="quick">Quick</NativeSelectOption>
                <NativeSelectOption value="careful">Careful</NativeSelectOption>
              </NativeSelect>
              <InputGroupButton size="icon-sm" variant="default" className="rounded-full" aria-label="Send" disabled={!draft.trim() || thinking} onClick={() => send(draft)}>
                <ArrowUpIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <p className="text-center text-xs text-muted-foreground">Replies can be wrong. Check anything that goes to print.</p>
        </div>
      </div>
    </div>
  )
}
