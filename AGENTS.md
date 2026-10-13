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

Printed matter: yellow-green paper surfaces, one dark green-black ink for type and rules, and four spot inks defined once as `--spot-1/2/3/4` (currently teal, pink, yellow, and a strong green in the paper's hue). Each ink's tint is derived by mixing it into the paper. Primary, highlight, focus, status and chart colors all point at the inks, so there are no other hues. No shadows; surfaces are separated by ink outlines. Square corners (including `rounded-full`, except radio buttons). Small uppercase labels, halftone dot fill for tints on large areas. Aspekta for all text (files in `src/fonts/`), IBM Plex Mono only for code-like data.

### Borders

Draw an ink line where the fill alone can't show the edge, and treat the same kind of thing the same way everywhere.

- Paper-family fills (card, muted, secondary) always get the standard border: they are too close to the paper to end cleanly on their own. Cards, columns, popovers, grey badges and chips, avatars, icon tiles, the active tab.
- Primary fills on a control, badge or tile get `border-primary-border` (ink in light mode): button, checked checkbox and radio, switch when on, teal badge, selected calendar day. Everything else with a line, including outline and secondary buttons, outline toggles and the switch when off, uses the standard border, so ink edges mean a primary fill. Destructive tints get `border-destructive`.
- Selected or current is the spot tint (`bg-accent`) with no border, never `bg-muted`: current sidebar item, highlighted menu or command item, selected table row, calendar range.
- A selectable card (radio or checkbox card) keeps its border when chosen and turns it teal, with a teal wash.
- Toggles: the outline variant is an outline button. Pressing a toggle only changes its fill (`bg-secondary`, a stronger grey in dark mode) and never adds or changes a border, so it stays the same object.
- Hover is `bg-muted` with no border. Ghost buttons are unframed until hovered.
- No border: tracks and their fills inside a control, the tooltip (solid ink), skeletons and halftone areas, status dots.
- Members of one row get the same outline, and neighbours share a line instead of overlapping.

## Undecided

- Distribution. Not a concern yet.

## Status

A preview app is the testing surface (`pnpm dev`). It is a fictional publishing workspace with one screen per kind of interface, in `src/preview/screens/`.

- `pnpm dev` runs it. The theme menu in the header has a Components switch between re-paint, stock shadcn and coss ui.
- re-paint is the components in `src/components/ui/` with the tokens in `src/tokens.css`.
- Stock is the same screens with untouched shadcn, for comparison: the components in `src/preview/stock-ui/` with the token values in `src/preview/stock.css`. Never edit those two; refresh them from the registry if needed.
- coss is the same screens with coss ui, a second library on Base UI with its own styling: the components in `src/preview/coss-ui/` with the token values in `src/preview/coss.css`. Never edit `coss-ui/`; `node scripts/coss.mjs` refreshes it from the registry (restart `pnpm dev` afterwards). `src/preview/coss-compat/` holds the adapters that give coss shadcn's names and props (or hand a module to stock, as for field and command), and is the place to edit. Anything coss does not have falls back to stock.
- Reading the three: a fault in re-paint only is ours; in re-paint and stock but not coss, it comes from shadcn's markup or classes; in all three, from Base UI or the screen.
- A small Vite plugin in `vite.config.ts` builds the extra copies of the screens against those folders. `pnpm typecheck` also checks the screens against coss (`tsconfig.coss.json`).
- `src/components/ui/` are the re-paint components. They started as shadcn (Base UI, nova preset) and are being restyled; so far button, badge, card, table, tabs, kbd, progress, slider, skeleton, radio, resizable, and the outlines on floating surfaces. The rest are still stock class strings and inherit the tokens.
- `src/index.css` maps the tokens into the Tailwind theme and defines the `label-caps` and `bg-halftone` utilities.
- `src/preview/prose.css` is the stand-in for long-form typography.
