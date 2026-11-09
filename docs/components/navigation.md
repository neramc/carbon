[CARBON](../../README.md) › Components › Navigation

# Navigation

Navigation moves users between destinations: windows, sections, pages, views. CARBON navigation is **integrated**: it sits on the foundation or inside a working region, never floating by default. The current destination is marked by a **raised selection tile** and a **non-color indicator**. Unlabeled specifications are **Proposed**.

## Desktop navigation

Desktop is CARBON's flagship platform. Choose the navigation structure by the number and nature of destinations:

| Structure | Use when | Pattern |
|---|---|---|
| Sidebar | 5 or more top-level destinations, or hierarchical sections | [Sidebar](#sidebars) on the foundation |
| Tabs | 2–7 peer views of the same object or context | [Tabs](#tabs) in a panel header or above content |
| Rail | A sidebar collapsed for space; icon destinations with tooltips | Sidebar in its collapsed form, 64px |
| Breadcrumb | Deep hierarchies where users need to step back | Text links with chevron separators in the panel header |
| Window tabs | Multiple documents in one window | Platform document tabs (follow the OS) |

Desktop navigation principles:

1. **Persistent and predictable.** Navigation stays in place; it does not reflow when the user moves between destinations.
2. **Keyboard first-class.** Every destination is reachable by keyboard, and frequently used ones by shortcut (for example Ctrl/⌘ + 1–9 for the first nine sidebar items).
3. **Multi-window aware.** Each window has its own navigation state. Opening a destination in a new window must be possible where the platform supports it.

## Sidebars

**1. Purpose.** Primary navigation between top-level destinations and sections of a desktop or web application. Not for actions (use toolbars) or for switching views of one object (use tabs).

**2. Anatomy.**

```text
 sidebar on the D0 foundation (no container shadow)
 ┌────────────────────────┐
 │ [app or account]        │  header (optional)
 │ OVERLINE                │  group label (Overline)
 │ ▌[icon] Selected item   │  raised selection tile + indicator bar
 │  [icon] Item        12  │  item with optional trailing count (tabular numerals)
 │  [icon] Item            │
 │ OVERLINE                │
 │  [icon] Item            │
 │                         │
 │  [icon] Settings        │  footer items (optional)
 └────────────────────────┘
```

**3. Variants.** Expanded (240px default, resizable 200–320px) · collapsed rail (64px, icons with tooltips) · with collapsible groups.

**4. States.**

| State | Appearance |
|---|---|
| Default | Icon and label in Text Secondary; no fill |
| Hover | `nav.item-fill-hover` state layer; label in Text Primary |
| Pressed | `color.fill-pressed` state layer |
| Selected (current) | Raised tile: `nav.item-fill-selected` (Surface Elevated), `nav.item-shadow-selected` (B1 + `depth.1`); label in Text Primary at weight 500; a 3 × 16px indicator bar in `nav.indicator` at the leading edge; filled icon variant |
| Focused | Focus ring around the item |
| Disabled | Text Tertiary; not focusable unless an explanation is available |

**5. Geometry.** Item height 32px (44px touch), radius 8px, horizontal padding 12px, icon 20px, icon-to-label gap 8px, items stacked with 4px gaps, 8px sidebar padding. Group spacing 16px; overline to first item 4px.

**6. Surface behavior.** In the default [desktop composition](../spatial/composition.md#default-desktop-composition), the sidebar sits directly on the D0 foundation: no fill, no edge, no shadow. The selection tile is the only raised element in it. Alternatively, a sidebar may be a D1 integrated panel (Surface fill, 14px radius) when the window has no other D1 working region.

**7. Elevation.** Sidebar D0 (or D1). Selected item: D1 raised tile. A sidebar never floats, except as a temporary overlay drawer on compact windows (D3, with a scrim).

**8. Interaction behavior.** Single click navigates. Groups collapse with `motion.surface`. The selection tile moves between items with `motion.selection` (180ms), sliding to the new position. Under reduced motion it changes instantly. Collapsing to a rail keeps the selection tile and indicator.

**9. Accessibility.** A navigation landmark with an accessible name. The current item has `aria-current="page"`. Collapsed rail items have accessible names and tooltips. Group labels are headings or group labels, not focusable items. Arrow-key navigation within the list is recommended; Tab must still reach the list.

**10. Platform adaptation.** macOS: source-list conventions (sidebar on the window background, integrated with the title bar). Windows: the navigation-view convention, with an optional hamburger toggle for collapse. Web: collapses to a rail at the medium size class and to a drawer or bottom navigation at the compact size class. Tablets: see [Tablets](../platforms.md#tablets).

## Tabs

**1. Purpose.** Switch between peer views of the same context (Overview, Activity, Settings of one project). Do not use tabs for sequential steps or for navigation between unrelated destinations.

**2. Anatomy.**

```text
╭──────────────────────────────────────────────╮  track: inset, radius 12, padding 4
│ ╭────────────╮                               │
│ │ Overview   │  Activity    Members    Files │  selected tab: raised tile, radius 8
│ ╰────────────╯                               │
╰──────────────────────────────────────────────╯
```

**3. Variants.**

| Variant | Use |
|---|---|
| Segmented tabs (default) | View switching inside panels and above content: an inset track with a raised selected tab |
| Line tabs | Page-level or dense headers where a track would be heavy: no track; the selected tab has a 2px Text Primary bottom indicator and weight 500 |
| Scrollable | More tabs than fit: the track scrolls horizontally with edge fades and scroll buttons on desktop |

**4. States.**

| State | Segmented | Line |
|---|---|---|
| Default | Label in Text Secondary on the track | Label in Text Secondary |
| Hover | `color.fill-hover` on the tab | `color.fill-hover` on the tab |
| Selected | Raised tile: `tabs.tab-fill-selected`, `tabs.tab-shadow-selected`; label in Text Primary, weight 500 | 2px bottom indicator in Text Primary; label Text Primary, weight 500 |
| Focused | Focus ring around the tab | Focus ring around the tab |
| Disabled | Text Tertiary | Text Tertiary |

The selected tab differs by **fill, depth, weight and color**: never by color alone.

**5. Geometry.** Track: radius `tabs.track-radius` (12px), padding 4px, inset. Tabs: height 32px, radius 8px (concentric with the track), horizontal padding 12px, gap 4px. Line tabs: height 40px, indicator 2px, gap 24px.

**6. Surface behavior.** Track: `surface.inset` (Surface Inset fill, inner occlusion). Selected tab: Surface Elevated tile with B1 and `depth.1`: it is lifted out of the track.

**7. Elevation.** Track inset; selected tab D1. Tabs never float.

**8. Interaction behavior.** The selection tile slides between tabs with `motion.selection` (180ms). Content switches with a crossfade (`motion.surface`) and never slides sideways by default. Tab order is stable; tabs never reorder themselves.

**9. Accessibility.** Tab list, tab and tab panel roles. Arrow keys move between tabs; the tab list is one tab stop. Selection follows focus only if switching panels is instant; otherwise Enter or Space activates. `aria-selected` on the selected tab; panels labeled by their tabs.

**10. Platform adaptation.** iOS and macOS: segmented tabs correspond to segmented controls. Android: line tabs are closer to platform convention. Mobile: tabs span the full width when there are 2–4; scrollable otherwise. Touch: 44px tab height.

## Mobile navigation

**1. Purpose.** Primary navigation between 3–5 top-level destinations on compact windows (phones, small windows).

**2. Anatomy.** Bar container · 3–5 destinations (24px icon above a Caption label) · safe-area extension below.

**3. Variants.** Bottom navigation bar (default; integrated) · floating bar (D3, radius 16px per the anti-pill rule for a 56px bar, inset 12px from the screen edges) for media-led products where content runs edge to edge · top tab bar for secondary views within a destination.

**4. States.** Default: outline icon and label in Text Secondary. Selected: filled icon, label in Text Primary at weight 500, and a raised tile (Surface Elevated, 8px radius, B1, `depth.1`) behind the icon. Pressed: `color.fill-pressed`. Focused (keyboard and switch access): focus ring.

**5. Geometry.** Bar height `nav.bar-height` (56px) plus the bottom safe area. Each destination's target ≥ 48 × 48px. Icon 24px; label Caption (12px). Selection tile 56 × 32px behind the icon.

**6. Surface behavior.** The integrated bar is a D1 region attached to the bottom edge: Surface fill, a 1px Border top edge, B1 highlight on the top edge. It extends under the home indicator (safe area) with the same fill.

**7. Elevation.** D1 attached (default). The floating variant is D3 and is used only when content runs behind it.

**8. Interaction behavior.** Tapping a destination switches to it, preserving each destination's state and scroll position. Tapping the current destination scrolls to top or returns to its root. The bar stays visible while scrolling unless content is immersive (media, reading), where it may hide on scroll down and reappear on scroll up.

**9. Accessibility.** Tab bar semantics with selected state; labels are always visible (never icon-only); supports Dynamic Type and font scaling by growing the bar height, never by truncating labels to nothing.

**10. Platform adaptation.** iOS: the tab bar convention; Android: the navigation bar convention, including system back behavior. When the window grows to the medium size class, the bottom bar becomes a navigation rail; at expanded, a sidebar.

## Navigation state indication

> **Rule:** the current destination is indicated by at least two cues, one of which is not color: a raised selection tile, an indicator bar or underline, a filled icon variant, or a heavier label weight. · **Proposed**

| Context | Primary cue | Secondary cues |
|---|---|---|
| Sidebar | Raised selection tile | Indicator bar, weight 500, filled icon |
| Segmented tabs | Raised selected tab | Weight 500, Text Primary |
| Line tabs | 2px underline indicator | Weight 500, Text Primary |
| Mobile bar | Raised tile behind icon | Filled icon, weight 500 |
| Breadcrumb | Current page as plain text (not a link) | Text Primary vs Text Secondary links |

Programmatic state is always exposed (`aria-current`, `aria-selected`) so assistive technology announces the current location.

---

Previous: [Controls](controls.md) · Next: [Overlays](overlays.md)
