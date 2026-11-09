[CARBON](../../README.md) › Components › Overlays

# Overlays

Overlays are surfaces that appear above the composition: popovers, dropdowns and menus, and tooltips at **D3 Floating**, and dialogs at **D4 Elevated**. They are the only surfaces in CARBON that legitimately float. Unlabeled specifications are **Proposed**.

## Shared overlay behavior

### Spatial separation

An overlay is detached from the plane: it casts a separation shadow (no contact line), uses the Surface Elevated fill (lighter than anything beneath it in both themes), and keeps a visible gap from its anchor.

| Overlay | Gap from anchor |
|---|---:|
| Menu, dropdown | 4px |
| Popover | 8px |
| Tooltip | 8px |

### Layering and stacking

Overlays stack in the strata defined in [Elevation](../spatial/elevation.md#layering-and-stacking): floating (1000), overlay (2000), tooltip (3000). An overlay opened from within another overlay stacks directly above its opener, so a dropdown inside a dialog appears above the dialog. Shadows never accumulate: a menu inside a dialog uses the D3 shadow only.

### Shadow treatment

| Level | Shadow | Bevel | Edge |
|---|---|---|---|
| D3 | `depth.3`: penumbra 2px / 6px and floating 10px / 30px | B2 | 1px Border |
| D4 | `depth.4`: penumbra 4px / 12px and key 16px / 48px | B2 | 1px Border |

Overlays must remain distinguishable without shadows (forced colors, renderers without shadows): the 1px edge and the lighter fill guarantee that.

### Motion behavior

| Phase | Motion | Token |
|---|---|---|
| Enter | Fade in from 0 and move 4px from the anchor direction (D3) or scale from 0.98 (D4) | `motion.overlay-enter` (240ms, enter easing) |
| Exit | Fade out; no movement | `motion.overlay-exit` (180ms, exit easing) |
| Tooltip enter | Fade only, after a 500ms hover delay; immediately on keyboard focus | `motion.overlay-enter` |
| Reduced motion | Fade only, maximum 120ms, or instant | — |

Overlays originate from their anchor: a menu below a button enters moving downward, a menu above it moves upward. Nothing bounces or overshoots.

### Dismissal

Escape closes the topmost overlay. Clicking or tapping outside closes non-modal overlays (popovers, menus) and never closes dialogs that contain unsaved input. Closing returns focus to the element that opened the overlay.

## Popovers

**1. Purpose.** Show rich, transient content or a small set of controls related to an anchor: a filter form, a color picker, details on demand. For a list of commands, use a menu. For a short label, use a tooltip. For a blocking decision, use a dialog.

**2. Anatomy.** Container · optional header (Title style) · content · optional footer actions. No pointer arrow: the gap and the anchor alignment express the relationship.

**3. Variants.** Non-modal (default; focus moves into the popover when opened by keyboard) · with actions (Apply / Cancel footer).

**4. States.** Open and closed. Controls inside follow their own states.

**5. Geometry.** Radius `popover.radius` (16px). Padding `popover.padding` (16px). Width fits content, 240–400px. Offset 8px from the anchor; aligned to the anchor's leading edge; flips to the opposite side when space runs out; stays at least 8px inside the window.

**6. Surface behavior.** `surface.floating`: Surface Elevated fill, ceramic sheen, Border edge, B2.

**7. Elevation.** D3 Floating.

**8. Interaction behavior.** Opens on click or Enter. Closes on Escape, outside click, or when its anchor scrolls out of view. A popover does not open on hover.

**9. Accessibility.** The anchor exposes `aria-expanded` and `aria-controls`. The popover has a dialog role (non-modal) with an accessible name when it contains interactive content. Focus moves to the first control on keyboard open and returns to the anchor on close.

**10. Platform adaptation.** Desktop and Web: anchored popover. Compact windows: becomes a bottom sheet (D4, top corners 20px) with a drag handle. macOS: may use the native popover where appropriate; keep CARBON fill and edge.

## Dropdowns and menus

**1. Purpose.** Present a list of commands (menu) or options (the list of a [select](controls.md#select-controls)). Context menus are menus opened at the pointer.

**2. Anatomy.**

```text
╭──────────────────────────╮  container: radius 12, padding 4, D3
│ ╭──────────────────────╮ │
│ │ [icon] Item    Ctrl+C│ │  item: 32px, radius 8 (concentric), shortcut in Text Secondary
│ ╰──────────────────────╯ │
│   [icon] Item       ▸    │  submenu indicator
│ ──────────────────────── │  separator: 1px Border, 4px vertical margin
│ OVERLINE                 │  optional group label
│   [✓] Checkable item     │
╰──────────────────────────╯
```

**3. Variants.** Command menu · context menu · selectable menu (check marks) · menu with submenus.

**4. States.** Item default (Text Primary label, Text Secondary shortcut and icon) · active, by hover or keyboard (`menu.item-fill-hover`) · pressed (`color.fill-pressed`) · checked (check mark) · disabled (Text Tertiary; skipped by pointer, focusable only if the platform convention requires it) · destructive item (label and icon in `color.error-aa`).

**5. Geometry.** Radius `menu.radius` (12px), padding `menu.padding` (4px), item height 32px (44px touch), item radius 8px, item horizontal padding 8px, icon 16px. Width 200–320px. Offset 4px from the trigger. Submenus overlap their parent by 4px horizontally and align their first item with the parent item.

**6. Surface behavior.** `surface.floating`. Item states use state layers, so the menu surface itself never changes tone.

**7. Elevation.** D3. Submenus are also D3; their shadow does not accumulate.

**8. Interaction behavior.** Arrow keys move the active item; Right opens a submenu, Left closes it; Enter activates; typing jumps to items by first letter; Escape closes one level. Pointer movement toward an open submenu does not close it (diagonal-path tolerance). Activating an item closes the whole menu.

**9. Accessibility.** Menu, menu item, checkable menu item and separator semantics. Shortcuts are exposed as keyboard-shortcut properties where the platform supports them.

**10. Platform adaptation.** Use native menus for application menu bars (macOS) and native context menus where users expect system items (text editing). Custom CARBON menus are for in-content menus. Touch: context menus open on long press, with 44px items.

## Tooltips

**1. Purpose.** Name an icon-only control or reveal a keyboard shortcut. Tooltips never contain essential information that is unavailable elsewhere, and never contain interactive content.

**2. Anatomy.** Container · text (Caption) · optional shortcut.

**3. Variants.** Label tooltip · label with shortcut ("Bold  Ctrl+B").

**4. States.** Hidden; visible after 500ms hover or immediately on keyboard focus; stays visible while the pointer is over the tooltip (WCAG 1.4.13).

**5. Geometry.** Radius `tooltip.radius` (8px). Padding 4px vertical, 8px horizontal. Maximum width 280px. 8px from the anchor; placed above by default, flipped when space runs out.

**6. Surface behavior.** Inverse Soft Ceramic: `tooltip.fill` (ink) with `tooltip.text` (text-inverse), so tooltips are clearly distinct from content surfaces in both themes. No bevel.

**7. Elevation.** D3 shadow (`tooltip.elevation`); tooltip stratum (3000).

**8. Interaction behavior.** Dismissible with Escape without moving focus; hoverable; persistent until the pointer or focus leaves.

**9. Accessibility.** Referenced by the anchor through `aria-describedby` (or as the accessible name for icon-only controls). Contrast: 13.60:1 (Soft White) and 15.17:1 (Soft Black).

**10. Platform adaptation.** Touch platforms have no hover: tooltips appear on long press, and icon-only controls must be recognizable or labeled without them.

## Dialogs

**1. Purpose.** Ask for a decision or focused input that must be completed or dismissed before continuing. Do not use dialogs for content that could live inline, for non-blocking messages, or for multi-step workflows longer than three steps.

**2. Anatomy.**

```text
 ░░░░░░░░░░░░░░░ scrim (color.scrim) over the whole window ░░░░░░░░░░░░░░░░
 ░░░░  ╭─────────────────────────────────────────────╮  ░░░░
 ░░░░  │ Dialog title (H3)                      [✕]  │  ░░░░  header
 ░░░░  │ Supporting text (Body, Text Secondary)      │  ░░░░  body: padding 24, gap 16
 ░░░░  │ [ form controls … ]                         │  ░░░░
 ░░░░  │                     [Cancel]  [Primary]     │  ░░░░  footer: actions (platform order)
 ░░░░  ╰─────────────────────────────────────────────╯  ░░░░  D4, radius 16, B2
```

**3. Variants.**

| Variant | Width | Use |
|---|---:|---|
| Small | 400px | Confirmations, alerts |
| Medium | 560px | Forms, settings |
| Large | 720px | Rich content, previews |
| Alert dialog | Small | Destructive or critical confirmations; alert semantics |

**4. States.** Opening, open, closing. Busy (actions disabled with a progress indicator while submitting).

**5. Geometry.** Radius `dialog.radius` (16px) · **Official**. Padding `dialog.padding` (24px). Gap between header, body and footer `dialog.gap` (16px); 8px between footer buttons. Width per variant, never more than the window width minus 2 × 24px. Maximum height: the window height minus 48px; the body scrolls and the header and footer remain visible.

**6. Surface behavior.** `surface.elevated`: Surface Elevated fill, ceramic sheen, Border edge, B2.

**7. Elevation.** D4 Elevated · **Official**. The dialog is the only D4 surface on screen.

**8. Interaction behavior.**

- **Visual hierarchy:** title (H3), then supporting text, then controls, then actions. The primary action is the only primary button; destructive confirmations use the destructive button and name the action ("Delete project", never "OK").
- **Background relationship:** the scrim (`color.scrim`: Soft White ink at 32%, Soft Black ink at 56%) dims the composition behind the dialog, which stays visible and in place. Background blur is off by default; where performance allows, a blur of at most 8px may be added. Never use frosted-glass dialog surfaces.
- **Overlay treatment:** the scrim fades in with `motion.overlay-enter`; the dialog fades in and scales from 0.98 to 1. Exit is a fade with `motion.overlay-exit`.
- **Dismissal:** Escape and the close button dismiss non-destructive dialogs. Clicking the scrim dismisses only dialogs with no input. Alert dialogs require an explicit choice.

**9. Accessibility — modal focus behavior.**

- Dialog role (alert dialog for alerts) with `aria-modal`, labeled by its title and described by its supporting text.
- On open, focus moves to the first meaningful control, or to the least destructive action in alert dialogs.
- Focus is trapped inside the dialog while it is open; the background is inert (not focusable, hidden from assistive technology).
- On close, focus returns to the element that opened the dialog.
- The focus ring remains visible on every focused element within the dialog; elevation never substitutes for it.

**10. Platform adaptation.** Follow the platform's button order: trailing primary on macOS, iOS and the Web; leading primary on Windows. macOS: sheets attached to the window title bar are an acceptable native alternative. Compact windows: dialogs become full-width bottom sheets (top corners 20px) or full-screen pages for forms; alert dialogs stay centered.

---

Previous: [Navigation](navigation.md) · Next: [States](../interaction/states.md)
