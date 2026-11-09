[CARBON](../../README.md) › Foundations › Spacing

# Spacing

> **Decision:** CARBON uses a 4px base spacing system with the official scale 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px. · **Official**

- **Why.** One base unit makes every distance a deliberate multiple, which is how CARBON achieves precision. 4px is fine-grained enough for dense desktop UI and coarse enough to stay consistent.
- **Where.** All padding, margins, gaps, offsets and layout dimensions. Component sizes (24, 32, 40, 48px) are multiples of the same unit.
- **How.** Use semantic spacing tokens (`inset.*`, `gap.*`, `seam.*`), which reference the scale. Never type raw values.
- **Avoid.** Off-grid values (6, 10, 14, 15px) for spacing. Geometry such as border widths (1px), focus offsets (2px) and the 6px and 14px radii are not spacing and are not bound by the scale.

## Spacing scale

| Token | Value | Multiple of 4px | Typical role |
|---|---:|---:|---|
| `space.1` | 4px | 1 | Tight insets, label-to-helper gaps |
| `space.2` | 8px | 2 | Icon-to-label gaps, related controls, seams |
| `space.3` | 12px | 3 | Control horizontal padding, content gaps |
| `space.4` | 16px | 4 | Card and panel padding, group gaps |
| `space.5` | 20px | 5 | Comfortable card padding on large surfaces |
| `space.6` | 24px | 6 | Dialog padding, section gaps |
| `space.8` | 32px | 8 | Major section gaps, page margins |
| `space.10` | 40px | 10 | Large layout gaps |
| `space.12` | 48px | 12 | Page-level separation |
| `space.16` | 64px | 16 | Hero and empty-state spacing |
| `space.20` | 80px | 20 | Marketing and onboarding layouts |

Token keys are multiples of the base unit, so `space.4` is 4 × 4px = 16px. The gaps in the key sequence (no `space.7`, `space.9`) are intentional: the scale gets coarser as values grow, because small differences between large spaces are not perceptible.

## Semantic spacing

Semantic tokens name the *relationship*, not the size. They are **Proposed** mappings onto the official scale.

### Insets: padding inside a surface or control

| Token | Value | Use |
|---|---:|---|
| `inset.tight` | 4px | Around clusters of controls: menus, floating toolbars, segmented tracks |
| `inset.compact` | 8px | Compact containers, tooltips, integrated toolbars, small-button padding |
| `inset.control-x` | 12px | Horizontal padding of buttons, inputs and navigation items |
| `inset.default` | 16px | Cards, panels, popovers |
| `inset.comfortable` | 24px | Dialogs, comfortable cards |
| `inset.spacious` | 32px | Page content regions, empty states |

### Gaps: space between siblings

| Token | Value | Use |
|---|---:|---|
| `gap.tight` | 4px | Label to helper text; stacked metadata lines |
| `gap.inline` | 8px | Icon to label; adjacent related controls (button groups) |
| `gap.content` | 12px | Content elements inside a card or panel |
| `gap.group` | 16px | Groups of controls; form fields |
| `gap.section` | 24px | Sections of a surface |
| `gap.section-large` | 32px | Major sections of a page |

### Seams: space between integrated surfaces

| Token | Value | Use |
|---|---:|---|
| `seam.compact` | 4px | Dense desktop layouts |
| `seam.default` | 8px | Standard window composition |
| `seam.comfortable` | 12px | Touch layouts and spacious windows |

A **seam** is the narrow, consistent gap between adjacent integrated surfaces, through which the foundation shows. Seams are the core spacing device of [Integrated Space](../spatial/composition.md#seams).

## Applying spacing

### Component internals

- Horizontal padding of text-bearing controls is `inset.control-x` (12px); small controls use `inset.compact` (8px).
- Height comes from the size tokens (24, 32, 40px), not from vertical padding. Text is centered vertically by line height.
- Icon to label: `gap.inline` (8px). Icon-only controls are square (width = height).
- Visual padding is optically balanced: a button with a leading icon may use 8px on the icon side and 12px on the text side. · **Proposed**

### Component gaps

- Related controls (a button pair, a segmented group): `gap.inline` (8px).
- Form fields stacked vertically: `gap.group` (16px). Label to field: `gap.tight` (4px) or 8px for touch.
- Separate groups by space before adding dividers. Add a divider only when space alone cannot show the boundary.

### Cards

- Padding: `inset.default` (16px) by default; `inset.comfortable` (24px) for cards wider than 480px or with reading content. Use 20px (`space.5`) only for large dashboard cards where 16px is too tight and 24px wastes space.
- Content gap inside a card: `gap.content` (12px). Title to content: 8–12px.
- Gap between cards in a grid: `gap.group` (16px), or `seam.default` (8px) when the cards form one integrated composition.

### Panels

- Padding: `inset.default` (16px). Header height 48px, with 16px horizontal padding.
- Panels in a window are separated by seams, not by gaps of arbitrary size.

### Application windows

- Window content is inset from the window edge by one seam (`seam.default`, 8px) on desktop, so the foundation frames the integrated panels.
- Title bar and toolbar regions follow platform metrics (see [Platforms](../platforms.md)).

### Navigation

- Sidebar padding: 8px horizontally around items, 12px item padding inside. Group spacing: 16px, overline to first item 4px.
- Navigation items stack with `gap.tight` (4px) on desktop, so raised selection tiles never touch their neighbors. · **Proposed**

### Content density

| Density | Control height | Item gap | Seam | Default for |
|---|---:|---:|---:|---|
| Compact | 24–28px | 4px | 4px | Data-dense desktop tools (tables, inspectors) |
| Default | 32px | 8px | 8px | Desktop and Web |
| Comfortable | 40–48px | 12px | 12px | Touch, tablets, accessibility settings |

Density changes *spacing and control height*, never type size. A product may offer a density setting; it must not make text smaller. · **Proposed**

## Vertical rhythm

- Text line heights are multiples of 4px, so stacked text aligns with the spacing grid.
- Space above a heading is about 1.5–2× the space below it (for example 24px above, 12px below an H2), so the heading groups with the content that follows.
- Paragraph spacing: 12px for Body, 16px for Body Large.

## Responsive layout

· **Proposed.** Layouts respond to **window size classes**, not device types. A desktop window can be compact; a tablet can be expanded.

| Size class | Window width | Columns | Margin | Gutter | Typical layout |
|---|---|---:|---:|---:|---|
| Compact | < 600px | 4 | 16px | 16px | Single column; bottom navigation; full-width sheets |
| Medium | 600–1023px | 8 | 24px | 16px | Navigation rail; one or two panes |
| Expanded | 1024–1439px | 12 | 24px | 24px | Sidebar plus content; optional inspector |
| Large | ≥ 1440px | 12 | 32px | 24px | Sidebar, content and inspector; content max-width for reading |

Tokens: `breakpoint.*`, `layout.margin.*`, `layout.gutter.*`, `layout.columns.*`.

Rules:

1. Reading content has a maximum measure (see [Typography](typography.md#body-text)). Do not stretch text across ultra-wide windows; center it, or use the extra width for secondary panes.
2. Panels collapse in priority order: inspector, then sidebar (to a rail), then secondary panes (into navigation).
3. Spacing tokens do not change between size classes, except margins, gutters and seams (comfortable seams on touch).
4. Respect safe areas (notches, home indicators, rounded display corners) in addition to margins.

---

Previous: [Typography](typography.md) · Next: [Geometry](geometry.md)
