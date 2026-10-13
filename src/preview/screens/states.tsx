import { useEffect, useState } from "react"
import { CircleAlertIcon, CloudOffIcon, CompassIcon, InboxIcon, InfoIcon, PlusIcon, RefreshCwIcon, ScrollTextIcon, TriangleAlertIcon, UploadIcon } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/toast"

import { Page, PageHeader } from "../page"

function Loading() {
  const [progress, setProgress] = useState(12)
  useEffect(() => {
    const timer = setInterval(() => setProgress((value) => (value >= 100 ? 0 : value + 4)), 300)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Card key={index}>
            <CardHeader className="gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-40" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-5 rounded-lg border p-5">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-2/5" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6 rounded-lg border p-5">
          <Progress value={progress}>
            <ProgressLabel>Importing catalog</ProgressLabel>
            <ProgressValue />
          </Progress>
          <div className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
            <Spinner /> Matching ISBNs against existing records…
          </div>
          <div className="flex flex-wrap gap-2">
            <Button disabled>
              <Spinner /> Saving…
            </Button>
            <Button variant="outline" disabled>
              <Spinner /> Loading more
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function States() {
  return (
    <Page>
      <PageHeader title="Empty, loading and error" description="The screens people see when there is nothing to show yet, or something went wrong." />
      <Tabs defaultValue="empty" className="gap-8">
        <TabsList>
          <TabsTrigger value="empty">Empty</TabsTrigger>
          <TabsTrigger value="loading">Loading</TabsTrigger>
          <TabsTrigger value="error">Error</TabsTrigger>
          <TabsTrigger value="not-found">Not found</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="empty" className="grid gap-6 lg:grid-cols-2">
          <Empty className="border border-dashed py-20">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ScrollTextIcon />
              </EmptyMedia>
              <EmptyTitle>No submissions yet</EmptyTitle>
              <EmptyDescription>Open a reading period and manuscripts will arrive here. You can also add one by hand.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center">
              <Button>
                <PlusIcon /> Open a reading period
              </Button>
              <Button variant="outline">
                <UploadIcon /> Import
              </Button>
            </EmptyContent>
          </Empty>
          <Empty className="border border-dashed py-20">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <InboxIcon />
              </EmptyMedia>
              <EmptyTitle>Inbox zero</EmptyTitle>
              <EmptyDescription>Nothing needs a reply. New mail from authors and printers shows up here.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </TabsContent>

        <TabsContent value="loading">
          <Loading />
        </TabsContent>

        <TabsContent value="error" className="flex flex-col gap-6">
          <Alert variant="destructive">
            <CircleAlertIcon />
            <AlertTitle>Sales data could not be loaded</AlertTitle>
            <AlertDescription>The distributor feed timed out. Figures below are from yesterday at 6 pm.</AlertDescription>
            <AlertAction>
              <Button variant="outline" size="sm">
                Retry
              </Button>
            </AlertAction>
          </Alert>
          <Empty className="border py-20">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CloudOffIcon />
              </EmptyMedia>
              <EmptyTitle>You are offline</EmptyTitle>
              <EmptyDescription>Changes are saved on this device and will sync when the connection returns.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline">
                <RefreshCwIcon /> Try again
              </Button>
            </EmptyContent>
          </Empty>
        </TabsContent>

        <TabsContent value="not-found">
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <CompassIcon className="size-10 text-muted-foreground" strokeWidth={1.25} />
            <p className="font-mono text-sm text-muted-foreground">404</p>
            <h2 className="font-heading text-4xl font-semibold tracking-tight">This page is out of print</h2>
            <p className="max-w-md text-muted-foreground">The title may have been deleted, or the link is wrong. Check the address or go back to the catalog.</p>
            <div className="flex gap-2">
              <Button>Back to catalog</Button>
              <Button variant="ghost">Report a broken link</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="messages" className="flex max-w-3xl flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Alert>
              <InfoIcon />
              <AlertTitle>Reading period closes Sunday</AlertTitle>
              <AlertDescription>46 manuscripts are waiting. New submissions stop at midnight.</AlertDescription>
            </Alert>
            <Alert>
              <TriangleAlertIcon className="text-warning" />
              <AlertTitle>Storage is 92% full</AlertTitle>
              <AlertDescription>Archive finished titles or upgrade the plan before the next upload.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <CircleAlertIcon />
              <AlertTitle>Payment failed</AlertTitle>
              <AlertDescription>The card ending 4242 was declined. We will try again in three days.</AlertDescription>
            </Alert>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-muted-foreground">Toasts</h2>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => toast.add({ title: "Draft saved" })}>
                Default
              </Button>
              <Button variant="outline" onClick={() => toast.add({ type: "success", title: "Title published", description: "Glasshouse is now live in the catalog." })}>
                Success
              </Button>
              <Button variant="outline" onClick={() => toast.add({ type: "info", title: "New version available", description: "Reload to update." })}>
                Info
              </Button>
              <Button variant="outline" onClick={() => toast.add({ type: "warning", title: "Unsaved changes", description: "Your edits to chapter 4 are only on this device." })}>
                Warning
              </Button>
              <Button variant="outline" onClick={() => toast.add({ type: "error", title: "Upload failed", description: "fonts-licensed.zip is larger than 200 MB." })}>
                Error
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
                    loading: "Exporting catalog…",
                    success: "Export ready",
                    error: "Export failed",
                  })
                }
              >
                Promise
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Page>
  )
}
