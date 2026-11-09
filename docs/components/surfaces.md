[CARBON](../../README.md) › Components › Surfaces

# Surfaces

Surfaces structure the interface: **cards** hold self-contained content objects, **panels** form working regions, and **toolbars** hold commands. All values reference tokens; unlabeled specifications are **Proposed** unless they restate an Official decision.

## Cards

**1. Purpose.** A card presents one self-contained content object: an entity summary, a metric, a media item, a task. Use a card when its content is independently meaningful and could be moved, reordered or opened on its own. Do not use cards to group form fields, wrap single lines of text, or build page layout (use panels and spacing).

**2. Anatomy.**

```text
╭────────────────────────────────────────────╮  container: D2, radius 12, B2, 1px edge
│ [media: full-bleed, clipped by the radius] │  optional
│ OVERLINE                                   │  optional
│ Title                              [⋯]     │  header: Title style, optional trailing action
│ Body content …                             │  body: gap 12
│ Metadata · metadata          [Action]      │  footer: Caption metadata, actions
╰────────────────────────────────────────────╯
```

**3. Variants.**

| Variant | Description |
|---|---|
| Static (default) | Displays content. Does not respond to the pointer as a whole. |
| Interactive | The entire card is one action (open, navigate). Responds with interactive depth. |
| Selectable | One of a set of cards the user selects (a plan, a template). |
| Comfortable | 24px padding for wide cards and reading content |

**4. States.**

| State | Static | Interactive | Selectable |
|---|---|---|---|
| Default | `card.elevation` | `card.elevation` | `card.elevation` |
| Hover | — | `card.elevation-hover` (half a level up; no movement) | same as interactive |
| Pressed | — | `card.elevation-pressed` (B1, D1) | same as interactive |
| Focused | — | Focus ring outside the card | Focus ring outside the card |
| Selected | — | — | 2px inner edge in `color.surface-inverse` and a check indicator in the top trailing corner |
| Disabled | — | Flattened: `depth.0`, B0, Surface Secondary fill, Text Tertiary content | same |

**5. Geometry.** Radius `card.radius` (12px) · **Official**. Padding `card.padding` (16px), or `card.padding-comfortable` (24px) for cards wider than 480px; 20px (`space.5`) is permitted for large dashboard cards. Content gap `card.gap` (12px). Media is clipped by the card's radius on its outer corners; inner elements are inset by the padding and use their own radii (independent corners, because the gap of 16px exceeds their radius).

**6. Surface behavior.** `surface.raised`: Surface fill with ceramic sheen, 1px Border edge, B2 soft bevel. The bevel and contact shadow express the card's **thickness**: it reads as a slab resting on the surface below, not a sheet of paper.

**7. Elevation.** D2 Raised by default · **Official**. Cards sit on the foundation (D0) or inside a D1 working region.

- **Nested cards:** do not place a card inside a card. Group content inside a card with a Surface Secondary region (radius 8px, no shadow) or an inset region.
- **Dragging:** a card being dragged detaches and rises to D3 (it now overlays content) and returns to D2 on drop, using `motion.elevation`.

**8. Interaction behavior.** An interactive card has exactly one primary target: the whole card. Secondary actions inside it (a menu button) are separate targets with their own focus and must not trigger the card's action. Hover changes only the shadow; cards never translate or scale.

**9. Accessibility.** An interactive card is exposed as one link or button whose accessible name is the card title. Its other content is its description. A selectable card is exposed as a checkbox or radio (`aria-checked`) within a labeled group. Keep heading structure inside cards (the title is a heading of the appropriate level). Never nest interactive elements inside an element that is itself a link or button.

**10. Platform adaptation.** Desktop and Web: hover responds as specified. Touch: no hover; pressed feedback appears on touch-down. Compact windows: cards span the content width minus the layout margin, with 16px padding. Large windows: arrange cards on the layout grid; do not stretch reading content beyond its measure.

## Panels

**1. Purpose.** A panel is a structural working region that holds related content and controls: the main content area, an inspector, a tool region, a settings group. Use cards for individual content objects inside panels.

**2. Anatomy.**

```text
╭────────────────────────────────────────────────╮  container: D1, radius 14, B1, 1px edge
│ Title                    [tool] [tool] [⋯]     │  header: 48px, Title style, attached toolbar
├────────────────────────────────────────────────┤  optional divider (or scroll-under shadow)
│ body: scrollable content, padding 16           │
│ ╭ Surface Secondary region (radius 8) ──────╮  │  optional nested group
│ ╰──────────────────────────────────────────╯   │
│ footer: status or actions (optional)           │
╰────────────────────────────────────────────────╯
```

**3. Variants.**

| Variant | Level | Use |
|---|---|---|
| Integrated (default) | D1 | Working regions within a window: content, sidebars of tools, inspectors |
| Raised | D2 | A primary content panel standing on the foundation, for example a document page in an editor |
| Collapsible | D1 | Panels the user can collapse to their header |
| Resizable | D1 | Side panels with a draggable edge |

**4. States.** A panel itself is not interactive. Its header controls follow the [state model](../interaction/states.md). In multi-pane desktop apps, the **active pane** may show its title in Text Primary while inactive panes show Text Secondary. A resize edge shows a 2px Border Strong line and a resize cursor on hover and while dragging.

**5. Geometry.** Radius `panel.radius` (14px) · **Official**. Padding `panel.padding` (16px). Header height `panel.header-height` (48px) with 16px horizontal padding. Nested Surface Secondary regions use radius 8px (independent corners, because the 16px padding exceeds the inner radius). Side panels: minimum 240px wide.

**6. Surface behavior.** `surface.integrated` (Surface fill, Border edge, B1) for integrated panels; `surface.raised` (B2) for raised panels. Nested regions use `panel.nested-fill` (Surface Secondary) with no shadow and no bevel. **Surface continuity:** sibling panels share fill, radius, edge and seam.

**7. Elevation.** D1 by default, D2 for raised panels · **Official**.

- D2 cards may sit inside D1 panels. D1 panels never sit inside D2 cards.
- **Nested panels:** a panel inside a panel is not a second raised layer. It becomes a Surface Secondary region or an inset region (see the [depth budget](../spatial/composition.md#spatial-hierarchy)).

**8. Interaction behavior.** The header is attached to the panel. When body content scrolls beneath it, the header gains `shadow.contact` ([scroll-under](../spatial/composition.md#scroll-under)). Collapse and expand use `motion.surface` (220ms); neighbors resize continuously and seams stay constant. Resizing respects minimum and maximum widths and snaps to whole pixels.

**9. Accessibility.** Expose each major panel as a region or landmark named by its heading. Collapse controls use `aria-expanded` and `aria-controls`. Resize handles are focusable separators with a value and keyboard support (arrow keys adjust the size). Provide a keyboard shortcut to move focus between panes (F6 is the convention on Windows and in browsers).

**10. Platform adaptation.** Desktop: multi-pane layouts with resizable panels. Tablets: inspectors become sheets or popovers in portrait; sidebars collapse to rails. Mobile: each panel becomes a full-screen page in a navigation stack, or a bottom sheet for secondary tools.

## Toolbars

**1. Purpose.** A toolbar holds frequently used commands for the current context. Do not use toolbars for navigation between destinations (use [navigation](navigation.md)) or for a form's primary submit action (place it with the form).

**2. Anatomy.** Container (absent when attached) · groups of controls (icon buttons, buttons, selects, toggle buttons) · group separators (a 16px gap, or a 1px × 20px Border divider) · overflow button.

**3. Variants.**

| Variant | Level | Use |
|---|---|---|
| Attached (default) | None: part of its parent | In panel headers and window headers |
| Floating | D3 | Only when it overlays content: canvas tools, media controls, contextual selection toolbars |
| Compact | Attached or D3 | 40px height for dense tools |

**4. States.** Toolbar buttons are tertiary by default and respond with state layers (`color.fill-hover`, `color.fill-pressed`). Toggle buttons in the *on* state become raised tiles (Surface Elevated, B1, `depth.1`) and expose a pressed state. Disabled items keep their position: never hide an unavailable command that the user expects to see.

**5. Geometry.** Height `toolbar.height` (48px; compact 40px). Horizontal padding 8px. Controls 32px; icon buttons are 32 × 32px. Gap within a group 8px; between groups 16px. Floating: radius `toolbar.floating.radius` (12px, concentric with 8px buttons and a 4px inset), padding 4px, offset from content edges by at least 16px.

**6. Surface behavior.** Attached toolbars have no fill, edge or shadow of their own; they share the parent surface. Floating toolbars use `surface.floating` (Surface Elevated, Border edge, B2).

**7. Elevation.** D3 floating behavior applies **only when appropriate**: when the toolbar overlays content · **Official**. A toolbar never floats for emphasis. Sticky attached toolbars use the scroll-under contact shadow.

**8. Interaction behavior.**

- Keyboard: a toolbar is one tab stop; arrow keys move between items (roving focus); Home and End jump to the first and last items.
- Every command shows its keyboard shortcut in its tooltip.
- Contextual floating toolbars appear with `motion.overlay-enter` near the selection, do not take focus, and never cover the selection itself.
- **Responsive adaptation:** when space shrinks, commands move into the overflow menu in reverse priority order. Text labels may collapse to icons only if each icon button keeps an accessible name and a tooltip.

**9. Accessibility.** Use the toolbar role with an accessible label. Icon buttons have accessible names. Toggle buttons expose pressed state (`aria-pressed`). Overflowed commands remain reachable by keyboard.

**10. Platform adaptation.** macOS: integrate with the unified title bar and toolbar. Windows: follows the command bar convention, with the overflow at the trailing end. Web: sticky header toolbars. Tablets: toolbars may move to the bottom edge for reach. Mobile: a bottom toolbar with up to five actions, or actions in the navigation bar plus an overflow menu; 44px targets.

---

Previous: [Components overview](overview.md) · Next: [Controls](controls.md)
