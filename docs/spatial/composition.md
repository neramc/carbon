[CARBON](../../README.md) › Spatial Design System › Composition

# Composition

> **Decision:** CARBON uses **Integrated Space**. UI elements form one continuous spatial composition, and the interface must not look like an arbitrary collection of unrelated floating objects. · **Official**

Integrated Space is what makes CARBON's depth feel *architectural* rather than decorative. Surfaces are built into a shared foundation, like fitted panels in a well-made object.

## Principles

### Surface continuity

The foundation (D0) is one continuous plane behind the whole window. Every surface is placed *on* or *into* it, and the plane remains visible between surfaces through consistent seams.

- **Rule.** Do not cover the entire foundation with surfaces. The foundation must show at least through the seams, so the composition reads as one object.
- **Rule.** Do not introduce a second background color behind part of the layout. Use a D1 region instead.

### Nested geometry

Nested surfaces follow the [nesting and concentric-corner rules](../foundations/geometry.md#nesting-and-concentric-corners). Inner surfaces are smaller in radius and never exceed their container's radius.

### Panel relationships

Panels that share a window are siblings on the same level: same fill, same radius, same edge, same seam between them. A sidebar, content panel and inspector are peers, not a stack.

### Surface transitions

When a surface changes (resizes, expands, collapses, reveals a detail pane), its neighbors adapt continuously. Seams stay constant, and edges move together. Use `motion.surface` (220ms). Never let surfaces overlap mid-transition unless one of them is floating.

### Contact relationships

Every surface has an explicit relationship to what is beneath it:

| Relationship | Meaning | Visual |
|---|---|---|
| Rests on | Sits on the surface below | Contact shadow (D1–D2) |
| Carved into | Recessed into the surface | Inset fill and inner occlusion |
| Attached to | Part of another surface (a toolbar in a panel header) | No own shadow; shares the parent's edge |
| Floats above | Overlays content, detached | Separation shadow (D3–D4), no contact |

### Component grouping

Group with the lightest tool that works, in this order:

1. **Proximity**: spacing (`gap.*`).
2. **Shared surface**: place items on one D1 or D2 surface.
3. **Tone**: a Surface Secondary region inside a surface.
4. **Divider**: a 1px Border line, when space and tone are not enough.
5. **Elevation**: a separate raised surface, only for self-contained objects.

### Spatial hierarchy

Depth increases toward the user's current focus: foundation → working regions → content objects → transient tools → modal decisions. A layout should have one clear **working region** at D1, with content objects at D2 inside or beside it.

> **Rule (depth budget):** a single region holds at most three stacked spatial layers: foundation, integrated region and raised object (D0 → D1 → D2), plus inset regions and transient D3/D4 overlays. Deeper grouping uses tone, spacing or dividers, never another raised layer. · **Proposed**

## Seams

> **Decision:** adjacent integrated surfaces are separated by a consistent **seam** through which the foundation shows. · **Proposed**

| Token | Value | Use |
|---|---:|---|
| `seam.compact` | 4px | Dense professional tools |
| `seam.default` | 8px | Standard desktop and web composition |
| `seam.comfortable` | 12px | Touch and spacious layouts |

- **Why.** A seam keeps each surface readable as its own object while showing that all surfaces belong to one foundation. It is the visual signature of Integrated Space: separation without isolation.
- **Where.** Between window edge and panels, between sibling panels, between cards that form one composition.
- **How.** Use one seam value per window. The window inset equals the seam.
- **Avoid.** Mixing seam values in one window; seams so wide that panels look like separate floating cards (more than 12px); zero seams between panels of the same fill (they merge).

## Default desktop composition

The flagship composition for desktop applications. · **Proposed**

```text
┌ window (platform frame and radius) ─────────────────────────────────────────────────────┐
│  D0 foundation · title bar region integrated with the foundation                         │
│ ┌ sidebar on D0 ─────┐ ┌ D1 content panel ─────────────────────┐ ┌ D1 inspector ───────┐ │
│ │ OVERLINE           │ │ Title                      [toolbar]  │ │ Properties          │ │
│ │ ▌ Selected item ⎯⎯ │ │ ┌ D2 card ─────────┐ ┌ D2 card ──────┐ │ │ ┌ inset input ────┐ │ │
│ │   Item             │ │ │                  │ │               │ │ │ └─────────────────┘ │ │
│ │   Item             │ │ └──────────────────┘ └───────────────┘ │ │                     │ │
│ └────────────────────┘ └───────────────────────────────────────┘ └─────────────────────┘ │
│        ↑ 8px seams between window edge, sidebar, content panel and inspector ↑           │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

| Region | Level | Notes |
|---|---|---|
| Window foundation and title bar region | D0 | The title bar blends into the foundation; window controls follow the platform |
| Sidebar | D0 (on the foundation) | Navigation sits directly on the foundation; the selected item is a raised tile |
| Content panel | D1 | The working region, inset by one seam |
| Inspector | D1 | Sibling of the content panel: same radius, fill, edge |
| Cards | D2 | Content objects inside the working region |
| Menus, popovers | D3 | Transient |
| Dialogs | D4 | Modal |

Alternative: in single-pane utilities, the whole content area may be one D1 panel inset by one seam, or content may sit directly on D0 with D2 cards.

## Common patterns

### Scroll-under

Sticky headers and toolbars are *attached* (no shadow) while content is at rest. When content scrolls beneath them, they gain a contact shadow (`shadow.contact`) to show that content is passing under them. They never gain a floating shadow. · **Proposed**

### Full-bleed content

Canvases, maps, media and editors fill their D1 panel edge to edge and are clipped by the panel's radius. Tools that hover over the content are D3 floating toolbars; tools that do not overlay content are integrated into the panel header.

### Dashboards

Cards (D2) sit on the foundation (D0) or in one D1 working region, aligned to the grid, separated by `gap.group` (16px), or by `seam.default` (8px) when they form one tight composition. Never wrap each card in its own panel.

### Settings and forms

One D1 surface per settings page. Groups are separated by spacing and Overline or H3 headings, not by individual cards per setting.

### Mobile

On compact windows, seams at the screen edge collapse to the layout margin. Sections become full-width D1 regions or 16px-inset D2 cards. Navigation integrates with the foundation at the bottom of the screen (see [Navigation](../components/navigation.md#mobile-navigation)).

## Avoid

| Avoid | Instead |
|---|---|
| Every card, section and toolbar on its own shadow | Group on shared integrated surfaces |
| Cards nested inside cards | Surface Secondary regions or inset regions inside one card |
| Wide gaps that make panels look unrelated | One consistent seam |
| Floating sidebars and floating headers by default | Integrated (D0/D1) navigation and headers |
| Overlapping surfaces without a floating relationship | Seams; or make the overlapping surface D3 |
| A second background color behind part of the UI | A D1 region on the single foundation |

---

Previous: [Elevation](elevation.md) · Next: [Components overview](../components/overview.md)
