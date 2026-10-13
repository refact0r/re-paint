import { useState } from "react"
import { FileArchiveIcon, FileImageIcon, FileTextIcon, FolderIcon, LayoutGridIcon, ListIcon, MoreVerticalIcon, RotateCwIcon, UploadCloudIcon, XIcon, type LucideIcon } from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { Page } from "../page"

type FileEntry = { name: string; kind: string; size: string; modified: string; by: string; icon: LucideIcon }

const folders = [
  { name: "Cover", count: 12 },
  { name: "Interior", count: 8 },
  { name: "Marketing", count: 23 },
  { name: "Contracts", count: 4 },
]

const files: FileEntry[] = [
  { name: "cover-v3-front.png", kind: "PNG image", size: "4.2 MB", modified: "Today, 9:10", by: "Daniel", icon: FileImageIcon },
  { name: "cover-v3-full-wrap.pdf", kind: "PDF", size: "18.6 MB", modified: "Today, 9:08", by: "Daniel", icon: FileTextIcon },
  { name: "glasshouse-manuscript-final.docx", kind: "Word document", size: "612 KB", modified: "Oct 8", by: "Ines", icon: FileTextIcon },
  { name: "author-photo.jpg", kind: "JPEG image", size: "2.9 MB", modified: "Oct 2", by: "Mei", icon: FileImageIcon },
  { name: "typesetting-package.zip", kind: "Archive", size: "64 MB", modified: "Sep 28", by: "Tomas", icon: FileArchiveIcon },
  { name: "press-release-draft.docx", kind: "Word document", size: "88 KB", modified: "Sep 21", by: "Mei", icon: FileTextIcon },
]

function FileMenu({ children }: { children: React.ReactElement }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger render={children} />
      <ContextMenuContent className="w-48">
        <ContextMenuItem>
          Open <ContextMenuShortcut>↵</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Download</ContextMenuItem>
        <ContextMenuItem>
          Rename <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Share…</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Move to trash</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function Files() {
  const [view, setView] = useState("grid")

  return (
    <Page>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Breadcrumb>
          <BreadcrumbList className="text-base">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Files</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Spring list</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-heading font-semibold">Glasshouse</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-2">
          <ToggleGroup value={[view]} onValueChange={(value) => value[0] && setView(value[0])} variant="outline" spacing={0}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <LayoutGridIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <ListIcon />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button>
            <UploadCloudIcon /> Upload
          </Button>
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">Folders</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {folders.map((folder) => (
            <button key={folder.name} type="button" className="flex items-center gap-3 rounded-lg border p-3 text-left outline-none hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring">
              <FolderIcon className="size-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">{folder.name}</p>
                <p className="text-muted-foreground">{folder.count} files</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">Files</h2>
        {view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <FileMenu key={file.name}>
                <div className="group overflow-hidden rounded-lg border">
                  <AspectRatio ratio={16 / 10} className="flex items-center justify-center bg-muted">
                    <file.icon className="size-10 text-muted-foreground" strokeWidth={1.25} />
                  </AspectRatio>
                  <div className="flex items-center gap-2 border-t p-3">
                    <div className="min-w-0 flex-1 text-sm">
                      <p className="truncate font-medium">{file.name}</p>
                      <p className="text-muted-foreground">
                        {file.size} · {file.modified}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${file.name}`}>
                      <MoreVerticalIcon />
                    </Button>
                  </div>
                </div>
              </FileMenu>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Kind</TableHead>
                  <TableHead className="text-right">Size</TableHead>
                  <TableHead>Modified</TableHead>
                  <TableHead>By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file) => (
                  <FileMenu key={file.name}>
                    <TableRow>
                      <TableCell>
                        <span className="flex items-center gap-2 font-medium">
                          <file.icon className="size-4 text-muted-foreground" /> {file.name}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{file.kind}</TableCell>
                      <TableCell className="text-right tabular-nums">{file.size}</TableCell>
                      <TableCell>{file.modified}</TableCell>
                      <TableCell>{file.by}</TableCell>
                    </TableRow>
                  </FileMenu>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-10 text-center hover:bg-muted/40 has-focus-visible:ring-2 has-focus-visible:ring-ring">
          <UploadCloudIcon className="size-8 text-muted-foreground" strokeWidth={1.5} />
          <span className="font-medium">Drop files here or click to browse</span>
          <span className="text-sm text-muted-foreground">PDF, DOCX, PNG, JPG or ZIP up to 200 MB each</span>
          <input type="file" multiple className="sr-only" />
        </label>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-muted-foreground">Uploads</h2>
          <div className="flex flex-col gap-3">
            <Attachment state="uploading" className="w-full">
              <AttachmentMedia>
                <FileImageIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>cover-v4-front.png</AttachmentTitle>
                <AttachmentDescription>2.6 of 4.1 MB · 12 seconds left</AttachmentDescription>
                <Progress value={64} className="mt-1" aria-label="Upload progress" />
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Cancel upload">
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
            <Attachment state="done" className="w-full">
              <AttachmentMedia>
                <FileTextIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>spine-test-22mm.pdf</AttachmentTitle>
                <AttachmentDescription>1.1 MB · uploaded</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
            <Attachment state="error" className="w-full">
              <AttachmentMedia>
                <FileArchiveIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>fonts-licensed.zip</AttachmentTitle>
                <AttachmentDescription>Upload failed: file is larger than 200 MB</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Retry upload">
                  <RotateCwIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </div>
        </div>
      </section>
    </Page>
  )
}
