import { ArrowRightIcon, BookMarkedIcon, CheckIcon, FeatherIcon, PrinterIcon, ScrollTextIcon, UsersIcon, WalletIcon } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/toast"

const features = [
  { icon: ScrollTextIcon, title: "Submissions that do not get lost", text: "One queue for every reading period, with reader reports attached to the manuscript instead of buried in email." },
  { icon: FeatherIcon, title: "Editing in the open", text: "Authors and editors work on the same draft. Every change is tracked and every version can be restored." },
  { icon: PrinterIcon, title: "Production you can see", text: "A board for each season shows what is at copyedit, at design and at the printer, and what is late." },
  { icon: WalletIcon, title: "Royalties without spreadsheets", text: "Import sales from your distributor and statements are drafted for you twice a year." },
  { icon: UsersIcon, title: "Roles that fit a small team", text: "Freelancers see only the titles they are working on. Owners see everything." },
  { icon: BookMarkedIcon, title: "A catalog that stays current", text: "Metadata changes flow to your website and to retailers the same day." },
]

const quotes = [
  { quote: "We publish nine books a year with four people. This is the first tool that did not assume we were forty.", name: "Aroha Ngata", role: "Publisher, Kōwhai Editions", initials: "AN" },
  { quote: "The production board replaced a whiteboard, two spreadsheets and my memory. I do not miss any of them.", name: "Lars Eriksen", role: "Production manager, Fjordlys", initials: "LE" },
  { quote: "Authors tell us they finally know where their book is. That alone was worth switching.", name: "Chiamaka Eze", role: "Managing editor, Baobab Books", initials: "CE" },
]

const tiers = [
  { name: "Chapbook", price: "$0", blurb: "For a first list.", features: ["5 titles", "2 seats", "Submissions queue"], cta: "Start free" },
  { name: "Press", price: "$29", blurb: "For a working small press.", features: ["100 titles", "10 seats", "Production boards", "Royalty statements"], cta: "Start 30 day trial", featured: true },
  { name: "House", price: "$99", blurb: "For several imprints.", features: ["Unlimited titles", "Unlimited seats", "Multiple imprints", "Priority support"], cta: "Talk to us" },
]

const faqs = [
  { q: "Can I import my existing catalog?", a: "Yes. Upload an ONIX file or a spreadsheet and we map the columns for you. Most presses are set up in an afternoon." },
  { q: "Do authors need an account?", a: "No. Authors get a private link to their manuscript and can comment or edit without signing up." },
  { q: "What happens to my files if I cancel?", a: "You can export everything as a ZIP at any time. We keep your data for 30 days after cancellation, then erase it." },
  { q: "Is there a discount for nonprofits?", a: "Registered nonprofit presses get 40% off every paid plan. Email us from your organisation's address." },
]

export function Landing() {
  return (
    <div className="flex flex-col">
      <header className="flex items-center gap-6 border-b px-6 py-3 lg:px-10">
        <span className="font-heading text-lg font-semibold">Halfmoon</span>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-96 gap-1">
                  {features.slice(0, 3).map((feature) => (
                    <li key={feature.title}>
                      <NavigationMenuLink href="#" onClick={(event) => event.preventDefault()}>
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">{feature.title}</span>
                          <span className="line-clamp-2 text-muted-foreground">{feature.text}</span>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" onClick={(event) => event.preventDefault()}>
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" onClick={(event) => event.preventDefault()}>
                Journal
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex gap-2">
          <Button variant="ghost">Sign in</Button>
          <Button>Start free</Button>
        </div>
      </header>

      <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center">
        <Badge variant="outline">New: royalty statements in one click</Badge>
        <h1 className="font-heading text-5xl font-semibold tracking-tight text-balance md:text-6xl">The back office for presses with more books than people</h1>
        <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
          Halfmoon keeps submissions, edits, production and royalties in one place, so a team of four can publish like a team of twenty.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg">
            Start free <ArrowRightIcon />
          </Button>
          <Button size="lg" variant="outline">
            See a sample workspace
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">No card needed. Free for up to five titles.</p>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-3">
              <feature.icon className="size-6" strokeWidth={1.5} />
              <h3 className="font-heading text-lg font-semibold">{feature.title}</h3>
              <p className="text-pretty text-muted-foreground">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-16 py-20">
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {quotes.map((item) => (
              <CarouselItem key={item.name}>
                <figure className="flex flex-col items-center gap-6 text-center">
                  <blockquote className="font-serif text-2xl leading-snug text-balance">“{item.quote}”</blockquote>
                  <figcaption className="flex items-center gap-3 text-left text-sm">
                    <Avatar>
                      <AvatarFallback>{item.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">{item.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 lg:px-10">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight">Priced for small lists</h2>
            <p className="text-muted-foreground">Per workspace, not per seat. Change or cancel whenever you like.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <Card key={tier.name} className={tier.featured ? "ring-2 ring-primary" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {tier.name} {tier.featured && <Badge>Most popular</Badge>}
                  </CardTitle>
                  <CardDescription>{tier.blurb}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-6">
                  <p className="text-4xl font-semibold tabular-nums">
                    {tier.price}
                    <span className="text-base font-normal text-muted-foreground"> / month</span>
                  </p>
                  <ul className="flex flex-col gap-2 text-sm">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckIcon className="size-4 text-muted-foreground" /> {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button className="w-full" variant={tier.featured ? "default" : "outline"}>
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_2fr] lg:px-10">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-3xl font-semibold tracking-tight">Questions</h2>
            <p className="text-muted-foreground">
              Something else? Write to <a href="#" className="text-foreground underline underline-offset-4">hello@halfmoon.press</a>.
            </p>
          </div>
          <Accordion defaultValue={[faqs[0].q]}>
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="text-base">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading text-xl font-semibold">The Halfmoon letter</h2>
              <p className="text-muted-foreground">One email a month on running a small press. No product news.</p>
            </div>
            <form
              className="flex w-full max-w-sm gap-2"
              onSubmit={(event) => {
                event.preventDefault()
                toast.add({ type: "success", title: "You are on the list" })
              }}
            >
              <Input type="email" required placeholder="you@yourpress.com" aria-label="Email address" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          <Separator />
          <div className="flex flex-wrap justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 Halfmoon Press Tools B.V.</p>
            <nav className="flex gap-6">
              {["Privacy", "Terms", "Status", "Contact"].map((link) => (
                <a key={link} href="#" onClick={(event) => event.preventDefault()} className="hover:text-foreground">
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
