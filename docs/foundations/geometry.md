[CARBON](../../README.md) › Foundations › Geometry

# Geometry

> **Decision:** CARBON geometry is **Rounded Minimalism**: clearly rounded, never excessively pill-shaped. · **Official**

- **Why.** Moderate rounding softens a structurally rich interface (Soft Geometry) while keeping the precise, engineered character. Excessive rounding makes interfaces read as toy-like and wastes space at corners.
- **Where.** Every surface, control and indicator.
- **How.** Use the radius scale and the semantic component radii below; follow the [nesting rules](#nesting-and-concentric-corners) and the [anti-pill rule](#the-anti-pill-rule).
- **Avoid.** Pill-shaped buttons, inputs and containers; mixed radii among siblings; inner corners larger than their container's.

## Radius scale

| Token | Value | Status |
|---|---:|---|
| `radius.none` | 0px | **Proposed** (full-bleed edges only) |
| `radius.xs` | 4px | **Official** |
| `radius.sm` | 8px | **Official** |
| `radius.md` | 12px | **Official** |
| `radius.lg` | 16px | **Official** |
| `radius.xl` | 20px | **Official** |
| `radius.2xl` | 28px | **Official** |
| `radius.3xl` | 36px | **Official** |
| `radius.full` | 9999px | **Proposed** (inherently circular elements only) |

`radius.2xl` and `radius.3xl` are for very large surfaces: full-screen sheets, large media frames, marketing panels, and the outer frames of device-scale compositions. They are not used by standard components.

## Component radii

> **Decision:** the semantic component radii below are CARBON's initial values. They may use intermediate values (6px, 14px) where the scale is too coarse. · **Official**

| Component | Token | Radius |
|---|---|---:|
| Small controls (20–28px tall: small buttons, chips, segmented items) | `radius.control-small` | 6px |
| Buttons | `radius.control` | 8px |
| Inputs | `radius.control` | 8px |
| Cards | `radius.card` | 12px |
| Panels | `radius.panel` | 14px |
| Dialogs | `radius.dialog` | 16px |
| Large containers | `radius.container` | 20px |
| Floating surfaces | `radius.floating` | 20px |

The following component radii are derived with the nesting rules. · **Proposed**

| Component | Token | Radius | Derivation |
|---|---|---:|---|
| Checkbox and other glyph-scale indicators (≤ 20px) | `radius.indicator` | 4px | Anti-pill rule: 6px on a 20px box would read as nearly circular |
| Tooltips | `radius.tooltip` | 8px | Small text containers |
| Menus and dropdowns | `radius.menu` | 12px | Item 8px + menu inset 4px |
| Floating toolbars | `radius.toolbar-floating` | 12px | Button 8px + toolbar inset 4px |
| Popovers | `radius.popover` | 16px | Matches dialogs: transient content surfaces |
| Segmented and tab tracks | `tabs.track-radius` | 12px | Tab 8px + track inset 4px |

### Resolving "floating surfaces"

The official table gives floating surfaces 20px, and the depth system places menus, dropdowns and toolbars at D3 Floating. Applying 20px to a 32px-tall menu item container or a 40px toolbar would make them nearly pill-shaped and break concentric nesting. CARBON therefore applies the official 20px to **large** floating surfaces: floating panels, palettes, inspectors, command palettes and sheets. **Compact** floating surfaces derive their radius from their contents (12px for menus and floating toolbars, 16px for popovers). This resolution is documented as an assumption in the [changelog](../../CHANGELOG.md). · **Proposed**

## Nesting and concentric corners

When one rounded shape sits inside another, the corners must look like they belong together.

> **Rule:** if the gap between an inner and an outer surface is less than or equal to the inner radius, make the corners concentric: **R<sub>outer</sub> = R<sub>inner</sub> + gap**. If the gap is larger, each surface uses its own semantic radius. In every case, **R<sub>inner</sub> ≤ R<sub>outer</sub>**. · **Proposed**

```text
 gap ≤ inner radius → concentric               gap > inner radius → independent
 ╭──────────────────────╮  R = 12             ╭─────────────────────────────╮  R = 16 (dialog)
 │ ╭──────────────────╮ │  gap 4              │                             │
 │ │  menu item  R 8  │ │                     │   ╭─────────────────────╮   │  gap 24
 │ ╰──────────────────╯ │                     │   │  input  R 8         │   │
 ╰──────────────────────╯                     │   ╰─────────────────────╯   │
                                              ╰─────────────────────────────╯
```

| Outer | Inner | Gap | Result |
|---|---|---:|---|
| Menu | Menu item (8px) | 4px | Menu = 12px (concentric) |
| Floating toolbar | Button (8px) | 4px | Toolbar = 12px (concentric) |
| Tab track | Selected tab (8px) | 4px | Track = 12px (concentric) |
| Large container (20px) | Card (12px) | 8px seam | 12 + 8 = 20px (concentric) |
| Panel (14px) | Card (12px) | 16px | Independent: 14px and 12px |
| Dialog (16px) | Input (8px) | 24px | Independent: 16px and 8px |
| Card (12px) | Card (12px) | 8px | Not allowed: inner equals outer. Use Surface Secondary or an inset region instead of nesting cards. |

**Platform window corners.** Window corner radii belong to the operating system. Do not override them. If a panel sits closer to a window corner than its own radius, increase the seam to at least 8px rather than distorting the panel's radius.

## The anti-pill rule

> **Rule:** a rectangle's radius must not exceed **one third of its shorter side**. · **Proposed**

| Element | Shorter side | Maximum radius | CARBON radius |
|---|---:|---:|---:|
| Small button | 24px | 8px | 6px ✓ |
| Button / input | 32px | 10.7px | 8px ✓ |
| Large button | 40px | 13.3px | 8px ✓ |
| Checkbox | 20px | 6.7px | 4px ✓ |
| Floating toolbar | 40px | 13.3px | 12px ✓ |
| Popover | ≥ 48px | ≥ 16px | 16px ✓ |
| Large floating surface | ≥ 60px | ≥ 20px | 20px ✓ |

**Exceptions** (`radius.full`): elements that are inherently circular or whose circular form communicates function. These are radio buttons, switch tracks and thumbs, avatars, status dots, slider thumbs and progress-track ends. Buttons, tags, search fields and containers are never exceptions.

## Adjacent rounded surfaces

1. **Siblings share a radius.** Items in a row or grid use the same radius, even if their sizes differ.
2. **Separate rather than join.** Prefer a seam or gap between adjacent surfaces over fusing them. Separation keeps each surface's form readable and is the CARBON default.
3. **Joined groups** (a split button, an input with an attached button): the group's outer corners use the component radius; joined inner corners are square, with a 1px Border divider between segments.
4. **Surfaces against a straight edge** (a full-bleed panel meeting the window edge) use `radius.none` on the edge-facing corners only.
5. **Never chain radii of different sizes** along one continuous edge.

## Corner shape

Corners are circular arcs by default. Continuous-curvature (superellipse) corners are permitted where the platform provides them natively (for example SwiftUI `.continuous`). Do not emulate them with expensive path rendering. Radius values stay the same. · **Platform note**

## Sizes

· **Proposed**

| Token | Value | Use |
|---|---:|---|
| `size.control.small` | 24px | Small buttons, chips, compact table controls |
| `size.control.medium` | 32px | Default buttons, inputs, menu items, navigation items |
| `size.control.large` | 40px | Prominent actions, touch-friendly desktop controls |
| `size.header` | 48px | Panel headers, integrated toolbars |
| `size.target.minimum` | 24px | Minimum pointer target everywhere (WCAG 2.5.8) |
| `size.target.pointer` | 32px | Recommended desktop target |
| `size.target.touch` | 44px | Recommended touch target (Android: 48dp) |
| `size.icon.small` | 16px | Dense UI, inline with Caption text |
| `size.icon.medium` | 20px | Default UI icons |
| `size.icon.large` | 24px | Touch navigation, empty states |

A control's **target** can be larger than its visible shape. A 20px checkbox has at least a 24px target on desktop and a 44px target on touch, extended by padding that belongs to the control.

## Strokes

| Element | Width | Token |
|---|---:|---|
| Structural edges, dividers, input borders | 1px | `border.width` |
| Focus ring | 2px, offset 2px | `focus.width`, `focus.offset` |
| Selection indicator bar | 3px × 16px | `indicator.thickness`, `indicator.length` |

All strokes are **Proposed**. Use 1 logical pixel for edges on every display density. Do not use 0.5px hairlines except where a native platform separator already draws one.

## Icons

· **Proposed.** CARBON icons follow the same Rounded Minimalism as surfaces.

| Property | Rule |
|---|---|
| Grid | 16, 20 and 24px; 2px safe padding on every side |
| Stroke | 1.5px at 20 and 24px; 1.25px at 16px; never mix stroke widths in one view |
| Caps and joins | Rounded |
| Corners | Rounded, proportionate to the radius scale (about 2px at 20px) |
| Style | Outline by default; filled variant for selected navigation destinations only |
| Color | Inherits the text color (`currentColor`); semantic color only for state icons |
| Metaphor | Literal and functional; no decorative or skeuomorphic detail |

## Pixel precision

- Snap surface edges, borders and icons to whole logical pixels at rest. Fractional positions blur 1px edges and text.
- Animate with transforms, then settle on whole pixels.
- Center text optically in controls (cap-height centered), not by bounding box, when the font's metrics require it.

---

Previous: [Spacing](spacing.md) · Next: [Spatial Design System overview](../spatial/overview.md)
