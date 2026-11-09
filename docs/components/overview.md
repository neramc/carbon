[CARBON](../../README.md) › Components › Overview

# Components

CARBON defines **component design principles**, not a component library. Product teams implement components in their own technology; these guidelines make every implementation look and behave like CARBON.

## Principles

1. **Composed from primitives.** Every component is built from the same parts: a [surface class](../spatial/elevation.md#how-the-cues-combine), a type style, spacing roles, a radius and the shared [state model](../interaction/states.md). New components are compositions of these parts, not new styles.
2. **Function defines form.** Controls look operable: raised, beveled, responsive to the pointer. Containers look like they hold things. Overlays look detached.
3. **Minimum depth.** A component uses the lowest depth level that communicates its relationship to its surroundings.
4. **One state model.** All interactive components use the same states with the same visual logic and timing.
5. **Monochrome emphasis.** Emphasis uses the ink (`color.surface-inverse`), never an accent hue. Semantic colors only for real state.
6. **Accessible by construction.** Contrast, focus, target size and semantics are part of the specification, not an afterthought.
7. **Native where it matters.** Use platform-native controls when they provide behavior users rely on (text editing, menus, pickers, accessibility). Style them toward CARBON as far as the platform allows; do not rebuild native behavior poorly.

## Specification format

Every component in this guide is specified with the same ten points:

| # | Point | Answers |
|---|---|---|
| 1 | Purpose | What is it for, and when should it not be used? |
| 2 | Anatomy | What are its named parts? |
| 3 | Variants | Which structural or emphasis variants exist? |
| 4 | States | How does each state look? |
| 5 | Geometry | Size, radius, padding, spacing |
| 6 | Surface behavior | Fill, material, edge, bevel |
| 7 | Elevation | Depth level and interactive depth |
| 8 | Interaction behavior | Pointer, touch, keyboard behavior; motion |
| 9 | Accessibility | Roles, names, keyboard, contrast, focus |
| 10 | Platform adaptation | Desktop, Web, mobile and OS-specific differences |

## Inventory

| Component | Document | Depth | Radius | Bevel | Material |
|---|---|---|---:|---|---|
| Card | [Surfaces](surfaces.md#cards) | D2 | 12px | B2 | Soft Ceramic |
| Panel | [Surfaces](surfaces.md#panels) | D1 (or D2) | 14px | B1 (B2 at D2) | Soft Ceramic |
| Toolbar | [Surfaces](surfaces.md#toolbars) | Attached, or D3 when floating | inherits / 12px | — / B2 | Soft Ceramic |
| Button | [Controls](controls.md#buttons) | D1 (tertiary: flat) | 8px (small 6px) | B1 | Soft Ceramic |
| Text field, search field | [Controls](controls.md#text-fields) | Inset | 8px | — | Soft Ceramic |
| Select | [Controls](controls.md#select-controls) | Inset trigger, D3 list | 8px / 12px | — / B2 | Soft Ceramic |
| Checkbox | [Controls](controls.md#checkboxes) | Inset → D1 when checked | 4px | — / B1 | Soft Ceramic |
| Radio button | [Controls](controls.md#radio-buttons) | Inset → D1 when checked | full | — / B1 | Soft Ceramic |
| Switch | [Controls](controls.md#switches) | Inset track, D1 thumb | full | B3 thumb | Soft Ceramic |
| Sidebar and desktop navigation | [Navigation](navigation.md#sidebars) | D0, raised selection tile | 8px items | B1 tile | Soft Ceramic |
| Tabs | [Navigation](navigation.md#tabs) | Inset track, raised tab | 12px / 8px | B1 | Soft Ceramic |
| Mobile navigation | [Navigation](navigation.md#mobile-navigation) | D1 (integrated) | — | B1 top edge | Soft Ceramic |
| Popover | [Overlays](overlays.md#popovers) | D3 | 16px | B2 | Soft Ceramic |
| Dropdown and menu | [Overlays](overlays.md#dropdowns-and-menus) | D3 | 12px | B2 | Soft Ceramic |
| Tooltip | [Overlays](overlays.md#tooltips) | D3 | 8px | — | Soft Ceramic (inverse) |
| Dialog | [Overlays](overlays.md#dialogs) | D4 | 16px | B2 | Soft Ceramic |

## Shared anatomy vocabulary

Use these names in design files, code and documentation:

| Part | Definition |
|---|---|
| Container | The component's outer surface (fill, edge, bevel, shadow) |
| Label | The text that names the component or its action |
| Icon | A leading or trailing glyph |
| Indicator | A mark that shows state: a check, dot, selection bar or chevron |
| Track | The inset channel of a switch, tab group or slider |
| Thumb | The movable part of a switch or slider |
| Well | The inset field area of an input |
| Helper text | Supporting text below a control |
| Message | Validation text (error, warning, success) below a control |
| Header, body, footer | The structural regions of panels and dialogs |

## Sizes

| Size | Height | Radius | Type | Use |
|---|---:|---:|---|---|
| Small | 24px | 6px | Label Small | Dense tables, inspectors, inline actions |
| Medium (default) | 32px | 8px | Label | Desktop and Web default |
| Large | 40px | 8px | Label | Prominent actions, touch-friendly desktop, tablets |
| Touch | 44px (Android 48dp) | 8px | Label | Mobile |

All sizes keep their visible shape. On touch platforms, targets extend to at least 44px (48dp on Android) through padding.

## Baseline requirements for every component

- A visible focus indicator (2px `color.focus` ring, 2px offset) on keyboard focus. See [Accessibility](../accessibility.md#visible-focus).
- Keyboard operability equivalent to pointer operability.
- An accessible name, role and state exposed to assistive technology.
- Text and control boundaries that meet contrast in both themes.
- No information conveyed by color, shadow or motion alone.
- Correct appearance in both Soft White and Soft Black, and with spatial effects disabled.

## Not yet specified

The following components are expected in a complete library and are not specified in version 1.0. Build them from the primitives and principles above, and contribute the specification back. · **Future**

Tables and data grids, lists, sliders, progress indicators, toasts and notifications, badges and tags, segmented controls (beyond tabs), date and time pickers, steppers, avatars, empty states, banners.

---

Previous: [Composition](../spatial/composition.md) · Next: [Surfaces](surfaces.md)
