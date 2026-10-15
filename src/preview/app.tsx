import { useEffect, useState, type ComponentType } from "react"
import {
  BellIcon,
  BookOpenTextIcon,
  CalendarDaysIcon,
  ChevronsUpDownIcon,
  CircleDashedIcon,
  FolderIcon,
  GlobeIcon,
  InboxIcon,
  KanbanIcon,
  LayoutDashboardIcon,
  LibraryIcon,
  LogInIcon,
  LogOutIcon,
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
  SunIcon,
  type LucideIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Kbd } from "@/components/ui/kbd"
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster, toast } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"

import { Assistant } from "./screens/assistant"
import { Board } from "./screens/board"
import { Catalog } from "./screens/catalog"
import { Files } from "./screens/files"
import { Foundations } from "./screens/foundations"
import { Inbox } from "./screens/inbox"
import { Landing } from "./screens/landing"
import { Manuscript } from "./screens/manuscript"
import { Overview } from "./screens/overview"
import { Schedule } from "./screens/schedule"
import { Settings } from "./screens/settings"
import { SignIn } from "./screens/sign-in"
import { States } from "./screens/states"

type Screen = { id: string; label: string; icon: LucideIcon; component: ComponentType; badge?: string }

const groups: { label: string; screens: Screen[] }[] = [
  {
    label: "Workspace",
    screens: [
      { id: "overview", label: "Overview", icon: LayoutDashboardIcon, component: Overview },
      { id: "inbox", label: "Inbox", icon: InboxIcon, component: Inbox, badge: "4" },
      { id: "manuscript", label: "Manuscript", icon: BookOpenTextIcon, component: Manuscript },
      { id: "catalog", label: "Catalog", icon: LibraryIcon, component: Catalog },
      { id: "board", label: "Board", icon: KanbanIcon, component: Board },
      { id: "schedule", label: "Schedule", icon: CalendarDaysIcon, component: Schedule },
      { id: "files", label: "Files", icon: FolderIcon, component: Files },
      { id: "assistant", label: "Assistant", icon: SparklesIcon, component: Assistant },
      { id: "settings", label: "Settings", icon: SettingsIcon, component: Settings },
    ],
  },
  {
    label: "Pages",
    screens: [
      { id: "landing", label: "Landing page", icon: GlobeIcon, component: Landing },
      { id: "sign-in", label: "Sign in", icon: LogInIcon, component: SignIn },
      { id: "states", label: "Empty, loading, error", icon: CircleDashedIcon, component: States },
    ],
  },
  {
    label: "Reference",
    screens: [{ id: "foundations", label: "Foundations", icon: PaletteIcon, component: Foundations }],
  },
]

const screens = groups.flatMap((group) => group.screens)

type Theme = "light" | "dark" | "system"

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme | null) ?? "system")

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const apply = () =>
      document.documentElement.classList.toggle("dark", theme === "dark" || (theme === "system" && media.matches))
    apply()
    localStorage.setItem("theme", theme)
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [theme])

  return [theme, setTheme] as const
}

// "stock" and "coss" render the same screens with untouched shadcn or coss ui components and tokens, for comparison.
export type Kit = "re-paint" | "stock" | "coss"
const kitNames: Record<Kit, string> = { "re-paint": "re-paint preview", stock: "stock shadcn", coss: "coss ui" }

function useScreen() {
  const read = () => new URLSearchParams(location.search).get("screen") ?? "overview"
  const [id, setId] = useState(read)

  useEffect(() => {
    const onPop = () => setId(read())
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  const go = (next: string) => {
    history.pushState(null, "", `?screen=${next}`)
    setId(next)
  }

  return [screens.find((screen) => screen.id === id) ?? screens[0], go] as const
}

const notifications = [
  { who: "Priya Raman", what: "sent you the reader report for Night Ferry", when: "12 min ago", unread: true },
  { who: "Daniel Achterberg", what: "uploaded three cover options for Glasshouse", when: "1 hr ago", unread: true },
  { who: "Printer", what: "confirmed the 3,000 copy run of The Salt Road", when: "Yesterday", unread: false },
]

export function App({ kit, onKitChange }: { kit: Kit; onKitChange: (kit: Kit) => void }) {
  const [theme, setTheme] = useTheme()
  const [screen, go] = useScreen()
  const [commandOpen, setCommandOpen] = useState(false)
  const ScreenComponent = screen.component

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const ThemeIcon = theme === "light" ? SunIcon : theme === "dark" ? MoonIcon : MonitorIcon

  return (
    <TooltipProvider>
      <SidebarProvider className="h-svh">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg border border-primary-border bg-primary font-heading text-sm font-semibold text-primary-foreground">
                      H
                    </div>
                    <div className="grid flex-1 text-left leading-tight">
                      <span className="truncate font-medium">Halfmoon Press</span>
                      <span className="truncate text-xs text-muted-foreground">{kitNames[kit]}</span>
                    </div>
                    <ChevronsUpDownIcon className="ml-auto" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                      <DropdownMenuItem>
                        Halfmoon Press <DropdownMenuShortcut>⌘1</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Halfmoon Journal <DropdownMenuShortcut>⌘2</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusIcon /> New workspace
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            {groups.map((group) => (
              <SidebarGroup key={group.label}>
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.screens.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          isActive={item.id === screen.id}
                          tooltip={item.label}
                          onClick={() => go(item.id)}
                        >
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                        {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
                    <Avatar className="size-8">
                      <AvatarFallback>IO</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left leading-tight">
                      <span className="truncate font-medium">Ines Okafor</span>
                      <span className="truncate text-xs text-muted-foreground">ines@halfmoon.press</span>
                    </div>
                    <ChevronsUpDownIcon className="ml-auto" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" side="top" align="start">
                    <DropdownMenuItem onClick={() => go("settings")}>
                      <SettingsIcon /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => go("sign-in")}>
                      <LogOutIcon /> Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="min-w-0 overflow-hidden">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mx-1 data-vertical:h-4 data-vertical:self-center" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">Halfmoon Press</BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{screen.label}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-1">
              <Button
                variant="outline"
                className="mr-1 hidden w-64 justify-start text-muted-foreground sm:flex"
                onClick={() => setCommandOpen(true)}
              >
                <SearchIcon /> Search or jump to…
                <Kbd className="ml-auto">⌘K</Kbd>
              </Button>

              <Popover>
                <PopoverTrigger render={<Button variant="ghost" size="icon" aria-label="Notifications" />}>
                  <span className="relative">
                    <BellIcon />
                    <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
                  </span>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-88 gap-0 p-0">
                  <PopoverHeader className="flex-row items-center justify-between border-b px-4 py-3">
                    <PopoverTitle>Notifications</PopoverTitle>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0"
                      onClick={() => toast.add({ title: "All caught up", description: "2 notifications marked as read." })}
                    >
                      Mark all read
                    </Button>
                  </PopoverHeader>
                  <ul className="divide-y divide-dotted">
                    {notifications.map((item) => (
                      <li key={item.what} className="flex gap-3 px-4 py-3 text-sm">
                        <span
                          className={`mt-1.5 size-2 shrink-0 rounded-full ${item.unread ? "bg-info" : "bg-transparent"}`}
                        />
                        <div>
                          <p>
                            <span className="font-medium">{item.who}</span> {item.what}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{item.when}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Theme" />}>
                  <ThemeIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                  <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as Theme)}>
                    <DropdownMenuRadioItem value="light">
                      <SunIcon /> Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <MoonIcon /> Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <MonitorIcon /> System
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Components</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={kit} onValueChange={(value) => onKitChange(value as Kit)}>
                      <DropdownMenuRadioItem value="re-paint">re-paint</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="stock">Stock shadcn</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="coss">coss ui</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div key={screen.id} className="min-h-0 flex-1 overflow-auto">
            <ScreenComponent />
          </div>
        </SidebarInset>
      </SidebarProvider>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <Command>
          <CommandInput placeholder="Search screens, titles, people…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.screens.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => {
                      go(item.id)
                      setCommandOpen(false)
                    }}
                  >
                    <item.icon /> {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <MoonIcon /> Toggle dark mode <CommandShortcut>⇧⌘L</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>

      <Toaster />
    </TooltipProvider>
  )
}
