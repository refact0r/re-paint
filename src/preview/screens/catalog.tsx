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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
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
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"

import { Page, PageHeader } from "../page"

type Status = "Published" | "In production" | "Contracted" | "Out of print"
type Title = { isbn: string; title: string; author: string; status: Status; format: string; pubDate: string; price: number; units: number }

const titles: Title[] = [
  { isbn: "978-1-915-40112-3", title: "The Salt Road", author: "Ines Varga", status: "Published", format: "Hardback", pubDate: "2025-03-06", price: 22, units: 4310 },
  { isbn: "978-1-915-40118-5", title: "Night Ferry", author: "Tomas Berg", status: "Published", format: "Paperback", pubDate: "2025-06-12", price: 14, units: 3120 },
  { isbn: "978-1-915-40121-5", title: "Borrowed Weather", author: "Daniel Okoro", status: "In production", format: "Paperback", pubDate: "2027-01-14", price: 15, units: 0 },
  { isbn: "978-1-915-40125-3", title: "Glasshouse", author: "Mei Sato", status: "In production", format: "Hardback", pubDate: "2027-03-11", price: 24, units: 0 },
  { isbn: "978-1-915-40109-3", title: "Low Tide Almanac", author: "Ruth Abernathy", status: "Published", format: "Hardback", pubDate: "2024-10-03", price: 20, units: 1980 },
  { isbn: "978-1-915-40130-7", title: "A Field Guide to Small Hours", author: "Priya Nair", status: "In production", format: "Paperback", pubDate: "2027-05-20", price: 13, units: 0 },
  { isbn: "978-1-915-40133-8", title: "Quiet Machinery", author: "Kwame Mensah", status: "Contracted", format: "Hardback", pubDate: "2027-09-09", price: 22, units: 0 },
  { isbn: "978-1-915-40098-0", title: "Letters from the Interior", author: "Ruth Abernathy", status: "Out of print", format: "Paperback", pubDate: "2021-04-15", price: 12, units: 870 },
  { isbn: "978-1-915-40104-8", title: "Understory", author: "Tomas Berg", status: "Published", format: "Paperback", pubDate: "2023-08-24", price: 14, units: 2240 },
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

  return (
    <Page>
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
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput id="new-price" inputMode="decimal" placeholder="0.00" />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>USD</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
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

          {selected.size > 0 && (
            <div className="ml-auto flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{selected.size} selected</span>
              <Button variant="outline" size="sm">
                Change status
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Clear selection" onClick={() => setSelected(new Set())}>
                <XIcon />
              </Button>
            </div>
          )}
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

      <Sheet open={detail !== null} onOpenChange={(open) => !open && setDetail(null)}>
        <SheetContent className="sm:max-w-md">
          {detail && (
            <>
              <SheetHeader>
                <SheetTitle>{detail.title}</SheetTitle>
                <SheetDescription>{detail.author}</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6 px-4">
                <div className="flex aspect-[2/3] w-32 items-end rounded-md border bg-muted p-3 font-serif text-sm leading-tight">
                  {detail.title}
                </div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd>
                    <Badge variant={statusVariant[detail.status]}>{detail.status}</Badge>
                  </dd>
                  <dt className="text-muted-foreground">ISBN</dt>
                  <dd className="font-mono text-xs leading-5">{detail.isbn}</dd>
                  <dt className="text-muted-foreground">Format</dt>
                  <dd>{detail.format}</dd>
                  <dt className="text-muted-foreground">Publication</dt>
                  <dd>{date.format(new Date(detail.pubDate))}</dd>
                  <dt className="text-muted-foreground">List price</dt>
                  <dd className="tabular-nums">${detail.price.toFixed(2)}</dd>
                  <dt className="text-muted-foreground">Lifetime units</dt>
                  <dd className="tabular-nums">{detail.units.toLocaleString()}</dd>
                </dl>
              </div>
              <SheetFooter>
                <Button>Open record</Button>
                <Button variant="outline" onClick={() => setDetail(null)}>
                  Close
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

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
  )
}
