import { useMemo, useState } from "react"
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, DownloadIcon, MoreHorizontalIcon, PlusIcon, SearchIcon, SearchXIcon, XIcon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ActionBar, ActionBarButton, ActionBarLabel, ActionBarSeparator } from "@/components/ui/action-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import {
  DescriptionList,
  DescriptionListDetails,
  DescriptionListItem,
  DescriptionListTerm,
} from "@/components/ui/description-list"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Meter, MeterLabel, MeterValue } from "@/components/ui/meter"
import {
  NumberField,
  NumberFieldAddon,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Panel, PanelClose, PanelContent, PanelDescription, PanelFooter, PanelHeader, PanelTitle } from "@/components/ui/panel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"

import { Page, PageHeader } from "../page"

type Status = "Published" | "In production" | "Contracted" | "Out of print"
type Title = { isbn: string; title: string; author: string; status: Status; format: string; pubDate: string; price: number; units: number; printed: number }

const titles: Title[] = [
  { isbn: "978-1-915-40112-3", title: "The Salt Road", author: "Ines Varga", status: "Published", format: "Hardback", pubDate: "2025-03-06", price: 22, units: 4310, printed: 6000 },
  { isbn: "978-1-915-40118-5", title: "Night Ferry", author: "Tomas Berg", status: "Published", format: "Paperback", pubDate: "2025-06-12", price: 14, units: 3120, printed: 4000 },
  { isbn: "978-1-915-40121-5", title: "Borrowed Weather", author: "Daniel Okoro", status: "In production", format: "Paperback", pubDate: "2027-01-14", price: 15, units: 0, printed: 0 },
  { isbn: "978-1-915-40125-3", title: "Glasshouse", author: "Mei Sato", status: "In production", format: "Hardback", pubDate: "2027-03-11", price: 24, units: 0, printed: 0 },
  { isbn: "978-1-915-40109-3", title: "Low Tide Almanac", author: "Ruth Abernathy", status: "Published", format: "Hardback", pubDate: "2024-10-03", price: 20, units: 1980, printed: 3000 },
  { isbn: "978-1-915-40130-7", title: "A Field Guide to Small Hours", author: "Priya Nair", status: "In production", format: "Paperback", pubDate: "2027-05-20", price: 13, units: 0, printed: 0 },
  { isbn: "978-1-915-40133-8", title: "Quiet Machinery", author: "Kwame Mensah", status: "Contracted", format: "Hardback", pubDate: "2027-09-09", price: 22, units: 0, printed: 0 },
  { isbn: "978-1-915-40098-0", title: "Letters from the Interior", author: "Ruth Abernathy", status: "Out of print", format: "Paperback", pubDate: "2021-04-15", price: 12, units: 870, printed: 2500 },
  { isbn: "978-1-915-40104-8", title: "Understory", author: "Tomas Berg", status: "Published", format: "Paperback", pubDate: "2023-08-24", price: 14, units: 2240, printed: 3000 },
]

const statusVariant: Record<Status, "default" | "secondary" | "outline" | "destructive"> = {
  Published: "default",
  "In production": "secondary",
  Contracted: "outline",
  "Out of print": "destructive",
}

const statusItems = [{ value: "all", label: "All statuses" }, ...Object.keys(statusVariant).map((status) => ({ value: status, label: status }))]
const formatItems = [
  { value: "Hardback", label: "Hardback" },
  { value: "Paperback", label: "Paperback" },
  { value: "Ebook", label: "Ebook only" },
]
const authors = [...new Set(titles.map((title) => title.author))].sort()

// A flat cover in one of the spot inks, for the edition thumbnails.
const coverInks = ["oklch(0.74 0.1 210)", "oklch(0.7 0.17 5)", "oklch(0.85 0.14 92)", "oklch(0.78 0.15 118)"]
const cover = (isbn: string) => {
  const ink = coverInks[Number(isbn.at(-1)) % coverInks.length]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60"><rect width="40" height="60" fill="${ink}"/><rect x="6" y="9" width="28" height="3" fill="#19221b"/><rect x="6" y="15" width="17" height="3" fill="#19221b"/><rect x="6" y="50" width="12" height="2" fill="#19221b" opacity=".55"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
const editions = (title: Title) => [
  { format: title.format, isbn: title.isbn, price: title.price },
  { format: "Ebook", isbn: title.isbn.replace(/\d-\d$/, (end) => `${(Number(end[0]) + 1) % 10}-${end[2]}`), price: Math.round(title.price * 0.6) - 0.01 },
]
const date = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })

type SortKey = "title" | "pubDate" | "units"

export function Catalog() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")
  const [author, setAuthor] = useState<string | null>(null)
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "pubDate", dir: -1 })
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [detail, setDetail] = useState<Title | null>(null)
  const [deleting, setDeleting] = useState<Title | null>(null)

  const rows = useMemo(() => {
    const filtered = titles.filter(
      (title) =>
        (status === "all" || title.status === status) &&
        (!author || title.author === author) &&
        `${title.title} ${title.author} ${title.isbn}`.toLowerCase().includes(query.toLowerCase())
    )
    return filtered.sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : a[sort.key] < b[sort.key] ? -1 : 0) * sort.dir)
  }, [query, status, author, sort])

  const allSelected = rows.length > 0 && rows.every((row) => selected.has(row.isbn))
  const toggle = (isbn: string) => {
    const next = new Set(selected)
    if (!next.delete(isbn)) next.add(isbn)
    setSelected(next)
  }

  const SortHead = ({ label, sortKey, className }: { label: string; sortKey: SortKey; className?: string }) => {
    const active = sort.key === sortKey
    const Icon = !active ? ArrowUpDownIcon : sort.dir === 1 ? ArrowUpIcon : ArrowDownIcon
    return (
      <TableHead className={className} aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
        <Button variant="ghost" size="sm" className="-mx-2.5" onClick={() => setSort({ key: sortKey, dir: active && sort.dir === 1 ? -1 : 1 })}>
          {label} <Icon className={active ? "" : "text-muted-foreground"} />
        </Button>
      </TableHead>
    )
  }

  const selectedUnits = titles.reduce((sum, title) => sum + (selected.has(title.isbn) ? title.units : 0), 0)

  return (
    <div className="flex h-full">
      <div className="relative min-w-0 flex-1">
        <div className="h-full overflow-auto">
          <Page className={selected.size > 0 ? "pb-24" : undefined}>
            <PageHeader title="Catalog" description="Every title Halfmoon has published, is producing or has under contract.">
              <Button variant="outline">
                <DownloadIcon /> Export
              </Button>
              <Dialog>
                <DialogTrigger render={<Button />}>
                  <PlusIcon /> Add title
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add a title</DialogTitle>
                    <DialogDescription>Create the catalog record now. You can fill in production details later.</DialogDescription>
                  </DialogHeader>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="new-title">Title</FieldLabel>
                      <Input id="new-title" placeholder="Working title" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="new-author">Author</FieldLabel>
                      <Input id="new-author" placeholder="Name as it appears on the cover" />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel>Format</FieldLabel>
                        <Select defaultValue="Paperback" items={formatItems}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {formatItems.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="new-price">List price</FieldLabel>
                        <NumberField id="new-price" min={0} step={0.5} format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}>
                          <NumberFieldGroup>
                            <NumberFieldAddon>$</NumberFieldAddon>
                            <NumberFieldInput placeholder="0.00" />
                            <NumberFieldAddon align="inline-end">USD</NumberFieldAddon>
                          </NumberFieldGroup>
                        </NumberField>
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="new-printing">First printing</FieldLabel>
                        <NumberField id="new-printing" defaultValue={3000} min={500} step={500}>
                          <NumberFieldGroup>
                            <NumberFieldDecrement aria-label="500 fewer copies" />
                            <NumberFieldInput className="text-center" />
                            <NumberFieldIncrement aria-label="500 more copies" />
                          </NumberFieldGroup>
                        </NumberField>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="new-royalty">Royalty</FieldLabel>
                        <NumberField id="new-royalty" defaultValue={10} min={0} max={25} step={0.5}>
                          <NumberFieldGroup>
                            <NumberFieldInput />
                            <NumberFieldAddon align="inline-end">% of list</NumberFieldAddon>
                          </NumberFieldGroup>
                        </NumberField>
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel htmlFor="new-blurb">Catalog copy</FieldLabel>
                      <Textarea id="new-blurb" rows={3} placeholder="Two or three sentences for the seasonal catalog." />
                      <FieldDescription>Shown to booksellers. Aim for under 60 words.</FieldDescription>
                    </Field>
                  </FieldGroup>
                  <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                    <DialogClose render={<Button />} onClick={() => toast.add({ type: "success", title: "Title added to the catalog" })}>
                      Add title
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </PageHeader>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <InputGroup className="w-72">
                  <InputGroupAddon>
                    <SearchIcon />
                  </InputGroupAddon>
                  <InputGroupInput placeholder="Search title, author or ISBN" value={query} onChange={(event) => setQuery(event.target.value)} />
                </InputGroup>
                <Select value={status} onValueChange={(value) => setStatus(value as string)} items={statusItems}>
                  <SelectTrigger className="w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Combobox items={authors} value={author} onValueChange={setAuthor}>
                  <ComboboxInput placeholder="Any author" className="w-52" showClear />
                  <ComboboxContent>
                    <ComboboxEmpty>No author found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: string) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>

              </div>

              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">
                        <Checkbox
                          aria-label="Select all"
                          checked={allSelected}
                          indeterminate={!allSelected && rows.some((row) => selected.has(row.isbn))}
                          onCheckedChange={(checked) => setSelected(checked ? new Set(rows.map((row) => row.isbn)) : new Set())}
                        />
                      </TableHead>
                      <SortHead label="Title" sortKey="title" />
                      <TableHead>Status</TableHead>
                      <TableHead>Format</TableHead>
                      <SortHead label="Pub date" sortKey="pubDate" />
                      <TableHead className="text-right">Price</TableHead>
                      <SortHead label="Units" sortKey="units" className="text-right [&>button]:-mr-2.5 [&>button]:ml-0" />
                      <TableHead className="w-10" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.isbn} data-state={selected.has(row.isbn) ? "selected" : undefined}>
                        <TableCell>
                          <Checkbox aria-label={`Select ${row.title}`} checked={selected.has(row.isbn)} onCheckedChange={() => toggle(row.isbn)} />
                        </TableCell>
                        <TableCell>
                          <button type="button" className="text-left" onClick={() => setDetail(row)}>
                            <span className="block font-medium underline-offset-4 hover:underline">{row.title}</span>
                            <span className="text-muted-foreground">{row.author}</span>
                          </button>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
                        </TableCell>
                        <TableCell>{row.format}</TableCell>
                        <TableCell className="tabular-nums">{date.format(new Date(row.pubDate))}</TableCell>
                        <TableCell className="text-right tabular-nums">${row.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right tabular-nums">{row.units ? row.units.toLocaleString() : "–"}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${row.title}`} />}>
                              <MoreHorizontalIcon />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setDetail(row)}>View details</DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  navigator.clipboard?.writeText(row.isbn)
                                  toast.add({ title: "ISBN copied", description: row.isbn })
                                }}
                              >
                                Copy ISBN
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem variant="destructive" onClick={() => setDeleting(row)}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {rows.length === 0 && (
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <SearchXIcon />
                      </EmptyMedia>
                      <EmptyTitle>No titles match</EmptyTitle>
                      <EmptyDescription>Try a different search, or clear the filters to see the whole catalog.</EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setQuery("")
                          setStatus("all")
                          setAuthor(null)
                        }}
                      >
                        Clear filters
                      </Button>
                    </EmptyContent>
                  </Empty>
                )}
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="shrink-0 text-sm text-muted-foreground">
                  Showing {rows.length} of 64 titles
                </p>
                <Pagination className="mx-0 w-auto" onClick={(event) => event.preventDefault()}>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">8</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>


            <AlertDialog open={deleting !== null} onOpenChange={(open) => !open && setDeleting(null)}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete {deleting?.title}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This removes the catalog record and its sales history. Files in the production folder are kept. This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={() => {
                      toast.add({ type: "error", title: "Preview only", description: "Nothing was deleted." })
                      setDeleting(null)
                    }}
                  >
                    Delete title
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Page>
        </div>

        {selected.size > 0 && (
          <ActionBar aria-label="Selected titles" className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <ActionBarLabel>
              {selected.size} selected · {selectedUnits.toLocaleString()} units
            </ActionBarLabel>
            <ActionBarButton variant="default" onClick={() => toast.add({ title: "Preview only", description: "Statuses were not changed." })}>
              Change status
            </ActionBarButton>
            <ActionBarButton onClick={() => toast.add({ title: `Exported ${selected.size} titles`, description: "catalog-selection.csv" })}>
              <DownloadIcon /> Export
            </ActionBarButton>
            <ActionBarSeparator />
            <ActionBarButton size="icon-sm" aria-label="Clear selection" onClick={() => setSelected(new Set())}>
              <XIcon />
            </ActionBarButton>
          </ActionBar>
        )}
      </div>

      {detail && (
        <Panel aria-label={`${detail.title} details`}>
          <PanelHeader>
            <PanelTitle>{detail.title}</PanelTitle>
            <PanelDescription>{detail.author}</PanelDescription>
            <PanelClose onClick={() => setDetail(null)} />
          </PanelHeader>
          <PanelContent className="flex flex-col gap-6">
            <DescriptionList>
              <DescriptionListItem>
                <DescriptionListTerm>Status</DescriptionListTerm>
                <DescriptionListDetails>
                  <Badge variant={statusVariant[detail.status]}>{detail.status}</Badge>
                </DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>ISBN</DescriptionListTerm>
                <DescriptionListDetails className="font-mono text-xs font-normal">{detail.isbn}</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>Format</DescriptionListTerm>
                <DescriptionListDetails>{detail.format}</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>Publication</DescriptionListTerm>
                <DescriptionListDetails>{date.format(new Date(detail.pubDate))}</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>List price</DescriptionListTerm>
                <DescriptionListDetails tooltip="Before the 40% trade discount">${detail.price.toFixed(2)}</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>Lifetime units</DescriptionListTerm>
                <DescriptionListDetails tooltip="Net of returns, all channels">{detail.units ? detail.units.toLocaleString() : "–"}</DescriptionListDetails>
              </DescriptionListItem>
            </DescriptionList>

            {detail.printed > 0 && (
              <div className="flex flex-col gap-1.5">
                <Meter value={detail.units} max={detail.printed} className="gap-2">
                  <MeterLabel>Sell-through</MeterLabel>
                  <MeterValue />
                </Meter>
                <p className="text-xs text-muted-foreground">Of {detail.printed.toLocaleString()} copies printed</p>
              </div>
            )}

            <section className="flex flex-col gap-2">
              <h3 className="label-caps text-muted-foreground">Editions</h3>
              <ItemGroup className="gap-2">
                {editions(detail).map((edition) => (
                  <Item key={edition.isbn} variant="outline" size="sm">
                    <ItemMedia variant="image" fit="contain">
                      <img src={cover(detail.isbn)} alt="" />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{edition.format}</ItemTitle>
                      <ItemDescription className="font-mono text-xs">{edition.isbn}</ItemDescription>
                    </ItemContent>
                    <ItemActions className="tabular-nums">${edition.price.toFixed(2)}</ItemActions>
                  </Item>
                ))}
              </ItemGroup>
            </section>
          </PanelContent>
          <PanelFooter>
            <Button className="flex-1">Open record</Button>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard?.writeText(detail.isbn)
                toast.add({ title: "ISBN copied", description: detail.isbn })
              }}
            >
              Copy ISBN
            </Button>
          </PanelFooter>
        </Panel>
      )}
    </div>
  )
}
