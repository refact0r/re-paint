# re-paint

Personal UI library.

## Goals

- Make personal projects easier and faster.
- Provide a distinct visual identity shared across projects.
- Give LLMs a curated style to follow so generated interfaces don't look generic or "AI-like".
- Serve as a design showcase, and possibly gain traction publicly.

Priorities: simplicity, and compatibility with the ecosystem. The visual system is the deliverable; behavior and accessibility come from the primitive library.

## Architecture

1. **Tokens**: plain CSS variables (color, type, spacing, radii, shadows, motion) as the source of truth. Must work with no build step and no Tailwind. Use shadcn's token names (`background`, `foreground`, `primary`, `muted-foreground`, ...).
2. **Tailwind v4 theme**: maps the same variables into `@theme` so Tailwind projects get utilities.
3. **React components**: built on Base UI (`@base-ui/react`), styled with Tailwind classes. Keep shadcn's file layout, component names, compound structure and prop shapes; only the styling changes. Base UI composes with the `render` prop, not `asChild`.
4. **Svelte port** (later): same tokens and theme, components built on Bits UI following shadcn-svelte's shape.
5. **LLM rules file**: guidance for LLMs to generate interfaces that follow the design system.

To keep the Svelte port cheap, put as much of the look as possible in tokens rather than component class strings, and keep component markup close to stock shadcn.

Motion is CSS transitions only, no animation library. Use another library for a single component only where Base UI has no equivalent (e.g. date pickers).

## Scope

Hand-restyle a small core first: button, input, textarea, select, checkbox, switch, tabs, dialog, popover, dropdown menu, tooltip, toast, badge, card, avatar. Keep variants few. Other components stay stock shadcn, inheriting the tokens, until a project needs them.

## Visual direction (first pass, not settled)

Printed matter: yellow-green paper surfaces, one dark green-black ink for type and rules, and four spot inks defined once as `--spot-1/2/3/4` (currently teal, pink, yellow, and a strong green in the paper's hue). Each ink's tint is derived by mixing it into the paper. Primary, highlight, focus, status and chart colors all point at the inks, so there are no other hues. No blurred shadows; surfaces are separated by ink outlines, and floating ones add a halftone dot offset. Square corners (including `rounded-full`, except radio buttons). Small uppercase labels, halftone dot fill for tints on large areas. Aspekta for all text (files in `src/fonts/`), IBM Plex Mono only for code-like data.

### Print devices

Character comes from print's precise vocabulary, never from imitating its errors (no misregistration or distressed edges). No heavy ink rules or reversed (ink-filled) blocks either.

- Patterns carry meaning: solid is done or actual, halftone dots (`bg-halftone`) are a tint on a large area, hatching (`bg-hatch`) is pending or still to come (the remaining part of a progress track, skeletons).
- Highlighter: selected text and `<mark>` take `--highlight` (the yellow ink).
- Grain: a fine, flat noise over the whole page (`--grain`, `--grain-opacity`), overlay-blended. A tooth, not a photo of paper.
- Small details: floating surfaces (popovers, menus, selects, dialogs) get a halftone dot shadow offset below and right (`dot-shadow`, a border image outside the box, so it needs a ring outline rather than a border); the text caret is the focus teal; scrollbars use the border color.
- Type: big, tight display figures and page titles against small caps labels.

### Borders

Draw an ink line where the fill alone can't show the edge, and treat the same kind of thing the same way everywhere.

- Paper-family fills (card, muted, secondary) always get the standard border: they are too close to the paper to end cleanly on their own. Cards, columns, popovers, grey badges and chips, avatars, icon tiles, the active tab.
- Primary fills on a control, badge or tile get `border-primary-border` (ink in light mode): button, checked checkbox and radio, switch when on, teal badge, selected calendar day. Everything else with a line, including outline and secondary buttons, outline toggles and the switch when off, uses the standard border, so ink edges mean a primary fill. Destructive tints get `border-destructive`.
- Selected or current is the spot tint (`bg-accent`) with no border, never `bg-muted`: highlighted menu or command item, selected table row, calendar range. Navigation lists are the exception: the current item in the sidebar, or in a side list that picks what the page shows (a message, a chat, a version), is the neutral `bg-secondary` (`--sidebar-accent` in the sidebar), so navigation stays quiet next to the content.
- A selectable card (radio or checkbox card) keeps its border when chosen and turns it teal, with a teal wash.
- Toggles: the outline variant is an outline button. Pressing a toggle only changes its fill (`bg-secondary`, a stronger grey in dark mode) and never adds or changes a border, so it stays the same object.
- Hover is `bg-muted` with no border. Ghost buttons are unframed until hovered.
- No border: tracks and their fills inside a control, the tooltip (solid ink), skeletons, halftone and hatched areas, status dots. The exception is a small pending mark (`StatusMark`, a pending step): hatching that small reads as a stray slash, so it keeps a hairline edge.
- Members of one row get the same outline, and neighbours share a line instead of overlapping.
- Dotted between items, solid at edges. A line that separates items inside one surface is dotted: menu and command separators, the `Separator` component, list rows (`divide-y divide-dotted`), table body rows, accordion items. Lines that bound a surface or region stay solid: outlines, card footers, toolbar and header edges, the table head, page sections, and the joints inside a control (button group, calendar grid). Utilities: `bg-dotted` / `bg-dotted-y` for separator elements, `dotted-b` / `dotted-t` for a bottom or top border, `divide-dotted` alongside `divide-y`.

## Undecided

- Distribution. Not a concern yet.

## Status

A preview app is the testing surface (`pnpm dev`). It is a fictional publishing workspace with one screen per kind of interface, in `src/preview/screens/`.

- `pnpm dev` runs it. The theme menu in the header has a Components switch between re-paint, stock shadcn and coss ui.
- re-paint is the components in `src/components/ui/` with the tokens in `src/tokens.css`.
- Stock is the same screens with untouched shadcn, for comparison: the components in `src/preview/stock-ui/` with the token values in `src/preview/stock.css`. Never edit those two; refresh them from the registry if needed.
- coss is the same screens with coss ui, a second library on Base UI with its own styling: the components in `src/preview/coss-ui/` with the token values in `src/preview/coss.css`. Never edit `coss-ui/`; `node scripts/coss.mjs` refreshes it from the registry (restart `pnpm dev` afterwards). `src/preview/coss-compat/` holds the adapters that give coss shadcn's names and props (or hand a module to stock, as for field and command), and is the place to edit. Anything coss does not have falls back to stock.
- Components only re-paint has (listed below) fall back to re-paint's own in both comparisons: `vite.config.ts` and `tsconfig.coss.json` end their lists with `src/components/ui/`. Where coss has one too (meter, number field), a coss-compat adapter maps the props.
- Reading the three: a fault in re-paint only is ours; in re-paint and stock but not coss, it comes from shadcn's markup or classes; in all three, from Base UI or the screen.
- A small Vite plugin in `vite.config.ts` builds the extra copies of the screens against those folders. `pnpm typecheck` also checks the screens against coss (`tsconfig.coss.json`).
- `src/components/ui/` are the re-paint components. They started as shadcn (Base UI, nova preset) and are being restyled; so far button, badge, card, table, tabs, kbd, progress, slider, skeleton, radio, resizable, and the outlines on floating surfaces. The rest are still stock class strings and inherit the tokens.
- Beyond shadcn, re-paint adds common components in the same shape: `meter` (a score on a scale, with an `ink`), `status-mark`, `chip` (a removable token that can hold a mark and a control), `prompt-input`, `action-bar` (a floating selection toolbar), `description-list`, `steps`, `number-field`, `panel` (a non-modal side panel in the layout) and `sources` (numbered footnotes). `ItemMedia` takes `fit="contain"` for product shots and covers.
- `src/index.css` maps the tokens into the Tailwind theme, sets the page-wide touches (grain, selection and `<mark>`, caret, scrollbars), and defines the `label-caps`, `bg-halftone`, `bg-hatch`, `bg-dotted(-y)`, `dotted-b`, `dotted-t`, `divide-dotted` and `dot-shadow` utilities. `src/preview/kits.css` turns the page-wide touches and the dotted rules off for stock and coss.
- `src/preview/prose.css` is the stand-in for long-form typography.
