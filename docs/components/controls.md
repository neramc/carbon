[CARBON](../../README.md) › Components › Controls

# Controls

Controls are the parts of the interface that users operate. CARBON controls follow one physical logic:

- **Actions are raised.** Buttons rest slightly above their surface (D1) and press down when activated.
- **Inputs are inset.** Fields, tracks and unchecked boxes are recessed into their surface, wells waiting to be filled.
- **Chosen states are raised and inked.** A checked box, a selected radio or an "on" switch fills with ink and rises out of its well.

Unlabeled specifications are **Proposed** unless they restate an Official decision.

## Buttons

**1. Purpose.** A button performs an action. Use links for navigation to another location and toggles or checkboxes for on/off settings.

**2. Anatomy.** Container · label (Label style) · optional leading icon · optional trailing indicator (a chevron for menu buttons). Icon-only buttons have an icon and an accessible name.

**3. Variants.**

| Variant | Use | Fill | Label | Edge | Shadow |
|---|---|---|---|---|---|
| Primary | The main action of a view region. At most one per region. | `color.surface-inverse` (ink) | `color.text-inverse` | — | inverse B1 + `depth.1` |
| Secondary | Standard actions | `color.surface-elevated` | `color.text-primary` | Border | B1 + `depth.1` |
| Tertiary | Low-emphasis actions, toolbar actions, inline actions | none | `color.text-primary` | — | none (state layers only) |
| Destructive | Irreversible or destructive actions | `color.error` | `color.text-inverse` | — | inverse B1 + `depth.1` |

Contrast: primary label 13.60:1 (Soft White) and 15.17:1 (Soft Black); destructive label 5.15:1 and 6.52:1.

For a less prominent destructive action (for example, in a list of settings), use a secondary button with an Error icon and `color.error-aa` label; confirm destructive actions in a dialog.

**4. States.**

| State | Primary / Destructive | Secondary | Tertiary |
|---|---|---|---|
| Default | Resting at D1 | Resting at D1 | Flat |
| Hover | `depth.hover.1`; optional −1px lift | `depth.hover.1`; optional −1px lift | `color.fill-hover` |
| Pressed | `depth.pressed`, +1px down, bevel flattens | `depth.pressed`, +1px down, `color.fill-pressed` layer | `color.fill-pressed` |
| Focused | Focus ring; depth unchanged | Focus ring | Focus ring |
| Disabled | Surface Secondary fill, Text Tertiary label, `depth.0`, B0 | same | Text Tertiary label |
| Loading | Label replaced by a progress indicator; width unchanged; non-interactive | same | same |

**5. Geometry.** Radius `button.radius` (8px), small buttons `button.radius-small` (6px) · **Official**. Heights 24 / 32 / 40px (small / medium / large). Horizontal padding 12px (8px small); with a leading icon, 8px on the icon side. Icon-to-label gap 8px. Icon-only buttons are square. Minimum width 64px for text buttons, so short labels ("OK") still read as buttons.

**6. Surface behavior.** Soft Ceramic. Ink-filled variants (primary, destructive) use `light.edge-inverse` for their B1 highlight. Secondary buttons are raised neutral tiles with a 1px Border edge. Tertiary buttons have no surface until hovered or pressed.

**7. Elevation.** D1 for primary, secondary and destructive buttons. Buttons never float (D3+), regardless of importance. Floating action buttons are not part of CARBON; use a primary button in the toolbar or the content.

**8. Interaction behavior.** Activation on pointer up inside the button, Enter and Space on keyboard. Press feedback is immediate (`motion.press`, 90ms); release returns with the same timing. A button that opens a menu shows a chevron and opens on press. Repeated activation of non-idempotent actions is prevented while loading.

**9. Accessibility.** Native button semantics (or the button role). The accessible name matches the visible label. Icon-only buttons have an accessible name and a tooltip. Toggle buttons expose `aria-pressed`. Disabled buttons that explain *why* they are disabled should remain focusable (`aria-disabled`) so users can discover the reason.

**10. Platform adaptation.** Desktop: 32px default; default button bound to Enter in dialogs; Escape bound to Cancel. macOS: in dialogs, the primary button is the trailing button; Windows: primary first (leading) by convention. Follow each platform's button order (see [Platforms](../platforms.md#operating-systems)). Touch: 44px targets (48dp on Android), no hover lift.

## Text fields

Covers single-line text fields, multi-line text areas and search fields.

**1. Purpose.** Let users enter and edit text. Use selects for choosing from a known short list, and search fields for querying content.

**2. Anatomy.**

```text
Label                                    (Label style, Text Primary)
╭────────────────────────────────────╮
│ [icon]  Value or placeholder  [⨯]  │   well: inset, radius 8, 1px Border edge
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯   baseline: 1px border-aa (≥ 3:1)
Helper text or message                   (Caption, Text Secondary, or the -aa state color)
```

**3. Variants.** Text field · text area (resizable vertically, minimum three lines) · search field · with prefix or suffix (units, currency) · with leading icon.

**Search fields:** a leading search icon; a clear button appears when the field has a value; on desktop, an optional shortcut hint (Ctrl K or ⌘K) inside the trailing edge while empty. Search fields use the same 8px radius as other inputs; they are never pill-shaped.

**4. States.**

| State | Well | Edge and baseline | Text |
|---|---|---|---|
| Default | `input.fill` + `input.shadow` | Border edge, `border-aa` baseline | Value in Text Primary; placeholder in `color.text-secondary-aa` |
| Hover | unchanged | Baseline becomes Text Secondary | — |
| Focused | unchanged | Focus ring (2px, offset 2px) | Caret in Text Primary |
| Filled | unchanged | unchanged | — |
| Error | unchanged | Edge and baseline in `color.error` | Message in `color.error-aa` with an error icon |
| Read-only | Surface Secondary fill, no inner shadow | Border edge only | Text Primary; selectable |
| Disabled | Surface Secondary fill, no inner shadow | Border edge only | Text Tertiary |

**5. Geometry.** Radius `input.radius` (8px) · **Official**. Height 32px (40px large, 44px touch). Horizontal padding 12px. Label-to-field gap 4px (8px touch). Field-to-helper gap 4px. Icons 16px (20px on touch).

**6. Surface behavior.** Inputs are **inset**: `surface.inset` fill (Surface Inset) with inner occlusion at the top edge, no sheen and no bevel. The **baseline** (a 1px bottom edge in `color.border-aa`) is the control boundary that meets WCAG non-text contrast (3.08:1 Soft White, 3.05:1 Soft Black, minimum across surfaces); the Border edge on the other sides is decorative.

**7. Elevation.** Inset regions are carved into their surface; they have no depth level and never cast shadows.

**8. Interaction behavior.** Clicking anywhere in the well, including on the icon area, focuses the input. Validate on blur or on submit, not on every keystroke, unless the user is correcting an existing error. Never clear user input on error. Search fields support Escape to clear.

**9. Accessibility.** A persistent visible label; placeholders are hints, never labels. Associate helper and error text programmatically (`aria-describedby`); set `aria-invalid` on error. State errors in text with an icon, never by color alone. The placeholder uses `color.text-secondary-aa`, which meets 4.5:1 on Surface Inset.

**10. Platform adaptation.** Use native text input for editing behavior, IME composition (Korean, Japanese, Chinese), spell-checking, autofill and accessibility; style its container. Mobile: request the appropriate keyboard type; labels above fields; 44px height. macOS and iOS: text selection and context menus are native.

## Select controls

**1. Purpose.** Choose one option from a list. For 2–5 options that should be visible at once, prefer radio buttons or tabs. For long lists, use a searchable select (combobox).

**2. Anatomy.** Trigger (an inset field showing the selected value and a trailing chevron) · list (a D3 [menu](overlays.md#dropdowns-and-menus)) · options (with a check indicator on the selected option).

**3. Variants.** Select · combobox (typing filters the list) · multi-select (options with checkboxes; selected values summarized in the trigger).

**4. States.** The trigger follows the text-field states; the open state rotates the chevron 180° (`motion.selection`) and keeps the focus ring on the trigger. Options: default, hover and keyboard-active (`color.fill-hover`), selected (check indicator plus Text Primary, weight 500), disabled (Text Tertiary).

**5. Geometry.** Trigger as text field (radius 8px, height 32px). List: radius 12px, padding 4px, 4px from the trigger, option height 32px with 8px radius; maximum height about eight options, then scroll; minimum width equals the trigger.

**6. Surface behavior.** Inset trigger; Soft Ceramic floating list.

**7. Elevation.** Trigger inset; list D3.

**8. Interaction behavior.** Opens on click, Enter, Space or Alt+Down. Arrow keys move the active option; typing jumps to matching options; Enter selects; Escape closes without changing the value. The list opens below the trigger, or above if there is not enough space, and never covers the trigger.

**9. Accessibility.** Native select where possible; otherwise the combobox and listbox pattern with `aria-expanded`, `aria-activedescendant` and selected state. The selected option is indicated by a check mark, not only by color.

**10. Platform adaptation.** Use native pickers on mobile (bottom sheets or wheels). On macOS, native pop-up buttons position the list over the trigger; CARBON custom selects open below. Either behavior is acceptable on macOS if consistent within the product.

## Checkboxes

**1. Purpose.** Select any number of options, or toggle a setting that takes effect on submit. For a setting that takes effect immediately, use a switch.

**2. Anatomy.** Box (20px) · check or indeterminate mark · label · optional description.

**3. Variants.** Standalone · in a group · indeterminate (parent of a partially selected group).

**4. States.**

| State | Box | Mark |
|---|---|---|
| Unchecked | Inset: `checkbox.fill`, `checkbox.edge` (`border-aa`), inner occlusion | — |
| Checked | Raised ink tile: `checkbox.fill-checked`, `checkbox.shadow-checked` | Check in `checkbox.mark` |
| Indeterminate | Raised ink tile | Horizontal bar |
| Hover | State layer on the target area | — |
| Pressed | Box presses down (`depth.pressed`) | — |
| Focused | Focus ring around the box | — |
| Error | Edge in `color.error` | Message below the group |
| Disabled | Surface Secondary fill, Border edge, no depth | Text Tertiary mark |

**5. Geometry.** Box 20px, radius `checkbox.radius` (4px). Check mark stroke 2px. Label gap 8px. Target ≥ 24px on desktop (the label is part of the target), 44px on touch.

**6. Surface behavior.** Unchecked: inset well. Checked: ink fill with the inverse B1 highlight.

**7. Elevation.** Unchecked: inset. Checked: D1. The state change is expressed by fill, mark *and* depth; the mark is the non-color cue.

**8. Interaction behavior.** Clicking the box or its label toggles it; Space toggles when focused. The mark draws in with `motion.selection` (180ms); under reduced motion it appears instantly.

**9. Accessibility.** Native checkbox semantics; `aria-checked="mixed"` for indeterminate. Groups have a group label (fieldset and legend). The unchecked box boundary meets 3:1 through `color.border-aa`.

**10. Platform adaptation.** Size stays 20px on all platforms; target sizes adapt. On iOS, where checkboxes are uncommon, use them in lists only when multiple selection is the task; otherwise use switches or check-mark list rows.

## Radio buttons

**1. Purpose.** Choose exactly one option from a small set (2–7) that should be visible at once.

**2. Anatomy.** Circle (20px) · inner dot (8px) · label · optional description.

**3. Variants.** Vertical group (default) · horizontal group (2–3 short options only).

**4. States.** Unselected: inset circle with `radio.edge` (`border-aa`). Selected: ink-filled circle at D1 with an 8px `radio.dot` in `color.text-inverse`. Hover, pressed, focused, error and disabled follow checkboxes.

**5. Geometry.** 20px circle, `radio.radius` (full: inherently circular). Label gap 8px. Group item gap 8px (12px on touch).

**6. Surface behavior.** As checkboxes.

**7. Elevation.** Unselected: inset. Selected: D1.

**8. Interaction behavior.** Tab moves into the group, focusing the selected option; arrow keys move *and select* within the group. A radio group always has one selected option once the user has chosen. Provide a sensible default where one exists.

**9. Accessibility.** Radio group semantics with a group label; `aria-checked`; the dot and fill are the non-color cues.

**10. Platform adaptation.** On mobile, prefer list rows with a trailing check mark for long option lists.

## Switches

**1. Purpose.** Turn a setting on or off with immediate effect. Use a checkbox when the change applies on submit.

**2. Anatomy.**

```text
 off  ╭───────────╮            on   ╭───────────╮
      │ (●)       │                 │       (●) │
      ╰───────────╯                 ╰───────────╯
  inset track, border-aa edge        ink track; thumb raised (B3 + D1)
```

**3. Variants.** Standalone with label · in a list row (the label is the row title).

**4. States.**

| State | Track | Thumb |
|---|---|---|
| Off | Inset: `switch.track-fill`, `switch.track-edge` (`border-aa`) | `switch.thumb-fill` (Text Secondary), leading position |
| On | Ink: `switch.track-fill-on` | `switch.thumb-fill-on` (Surface Elevated), trailing position |
| Hover | State layer on the target | Thumb `depth.hover.1` |
| Pressed | — | Thumb flattens to `depth.pressed` |
| Focused | Focus ring around the track | — |
| Disabled | Surface Secondary, Border edge | Text Tertiary, no depth |

**5. Geometry.** Track 36 × 20px, radius full; thumb 16px, 2px from the track edge. Target ≥ 24px desktop (with label), 44px touch.

**6. Surface behavior.** The thumb is a **tactile grip**: `switch.thumb-shadow` combines the B3 curved bevel with D1 depth.

**7. Elevation.** Track inset; thumb D1.

**8. Interaction behavior.** Click or tap toggles; Space toggles when focused; dragging the thumb toggles past the midpoint. The thumb travels with `motion.selection` (180ms); the track color changes with the same timing. Under reduced motion, the change is instant. Never require confirmation for a switch; if a change is risky, use a button and a dialog instead.

**9. Accessibility.** Switch role with `aria-checked`. The thumb position is the non-color cue: off is leading, on is trailing (mirrored in right-to-left layouts). In Soft White, the off thumb (Text Secondary) contrasts with the inset track at 4.49:1; in Soft Black at 8.72:1.

**10. Platform adaptation.** Use the native switch on iOS and Android when native behavior (haptics, accessibility) matters more than exact styling. Keep CARBON's monochrome on-state ink: do not adopt platform accent colors for the on state.

---

Previous: [Surfaces](surfaces.md) · Next: [Navigation](navigation.md)
