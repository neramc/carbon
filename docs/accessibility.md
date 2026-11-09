[CARBON](../README.md) › Accessibility

# Accessibility

> **Decision:** CARBON targets **WCAG 2.2 Level AA** in both themes, on every platform. · **Official**

Accessibility is a constraint on every other decision in this guide: it is the first step of the [decision method](philosophy.md#decision-method). A CARBON design that fails AA is not a CARBON design.

## Core principles

> **Decision:** · **Official**
>
> - Never communicate essential information using color alone.
> - Never communicate essential interaction states using shadows alone.
> - Focus indication must remain visible even when spatial effects are disabled.
> - Both themes must remain readable.
> - Spatial decoration must never reduce content legibility.

## Text contrast

| Requirement | Threshold | CARBON implementation |
|---|---|---|
| Normal text (WCAG 1.4.3) | 4.5:1 | Text Primary everywhere (≥ 11.66:1). Text Secondary passes except Soft White on Surface Inset (4.49:1), where `color.text-secondary-aa` applies. |
| Large text: ≥ 24px, or ≥ 18.66px at weight 700 | 3:1 | Headings use Text Primary regardless |
| Placeholder text | 4.5:1 | `color.text-secondary-aa` (4.55:1 on Surface Inset) |
| Essential tertiary text | 4.5:1 | `color.text-tertiary-aa`; baseline Text Tertiary is for non-essential text only |
| Semantic text (errors, status) | 4.5:1 | `color.*-aa` semantic variants |
| Text on ink and semantic fills | 4.5:1 | `color.text-inverse` (4.67–15.17:1) |

Full measured tables: [Colors › Contrast](foundations/colors.md#contrast). The `-aa` guarantees are enforced by `node tools/carbon-tokens.mjs check`.

## Non-text contrast

WCAG 1.4.11 requires 3:1 for the visual information needed to identify components and their states.

| Element | CARBON implementation | Ratio (minimum across surfaces) |
|---|---|---|
| Text field boundary | 1px baseline in `color.border-aa` | 3.08 (Soft White) · 3.05 (Soft Black) |
| Checkbox, radio, switch-track boundaries | `color.border-aa` edge | 3.08 · 3.05 |
| Checked controls | Ink fill (`color.surface-inverse`) | ≥ 11.66 |
| Focus ring | `color.focus` | ≥ 11.66 |
| Switch thumb (off) against its track | Text Secondary on Surface Inset | 4.49 · 8.72 |
| Semantic icons | Baseline semantic colors | ≥ 4.00 · ≥ 5.04 |
| Selection indicators | Text Primary bar, underline, filled icon | ≥ 11.66 |

**Not boundaries:** Border, Border Strong, surface tone steps and shadows are below 3:1 by design. They support depth and structure but are never the *only* way to identify a control or a state.

## Color-independent communication

Every color-coded meaning has a second, non-color carrier.

| Meaning | Color | Required non-color cue · **Proposed** icon shapes |
|---|---|---|
| Success | `color.success` | Check-in-circle icon and text |
| Warning | `color.warning` | Triangle icon and text |
| Error | `color.error` | Octagon or exclamation-in-circle icon, text, and `aria-invalid` on fields |
| Information | `color.info` | "i"-in-circle icon and text |
| Selected | Ink, raised tile | Check mark, indicator bar, weight 500, filled icon |
| Current location | Raised tile | Indicator bar or underline, plus `aria-current` |
| Links in text | Text Primary | Underline |
| Chart series | Monochrome tones | Direct labels, patterns or distinct marker shapes |

## Keyboard navigation

1. All functionality is operable with a keyboard (WCAG 2.1.1), with no keyboard traps except the intentional focus trap of modal dialogs, which Escape releases.
2. Focus order follows the visual and structural order (WCAG 2.4.3).
3. Composite widgets (toolbars, tab lists, menus, radio groups, sidebars) are one tab stop with arrow-key navigation inside.
4. Escape closes the topmost overlay; Enter activates the default action in dialogs.
5. Provide shortcuts for frequent commands, show them in menus and tooltips, and never assign single-character shortcuts without a way to turn them off or remap them (WCAG 2.1.4).
6. Provide a skip link or landmark navigation on the Web, and a shortcut to cycle panes on desktop (F6 by convention).

## Visible focus

> **Decision:** focus is shown by a 2px ring in `color.focus` with a 2px offset, on every focusable element, in every theme, with spatial effects on or off. · **Proposed**

- The ring follows the component's shape (radius + offset) and is drawn **outside** the component, so it never covers content.
- It does not depend on elevation, shadow or motion, and appears instantly.
- It is never clipped by `overflow` and never hidden behind sticky headers, toolbars or overlays (WCAG 2.4.11 Focus Not Obscured).
- Its contrast against every surface is at least 11.66:1, and it encloses the component completely. It is designed to satisfy WCAG 2.4.13 Focus Appearance (AAA) as well as the AA requirements.
- **Web implementation:** draw the ring with `outline` and `outline-offset`, not `box-shadow`. Forced-colors modes remove box shadows but keep outlines.

```css
:focus-visible {
  outline: var(--carbon-focus-width) solid var(--carbon-color-focus);
  outline-offset: var(--carbon-focus-offset);
}
```

## Touch target sizing

| Context | Minimum | Recommended |
|---|---:|---:|
| Any pointer target (WCAG 2.5.8) | 24 × 24px, or enough spacing that a 24px circle on each target does not overlap another | — |
| Desktop pointer UI | 24px | 32px |
| Touch (iOS, iPadOS, Web on touch) | 44px | 44px |
| Android | 48dp | 48dp |

Visible size and target size are independent: a 20px checkbox has a 44px target on touch. Inline text links are exempt from the size requirement but need adequate line height.

## Screen reader semantics

- Use native elements and controls wherever possible; otherwise apply the correct role, name, state and value (WCAG 4.1.2).
- Structure: one H1, a logical heading hierarchy, and landmarks for navigation, main content, panels and search.
- Expose states: `aria-expanded`, `aria-selected`, `aria-checked`, `aria-pressed`, `aria-current`, `aria-invalid`, `aria-disabled`, and their native equivalents.
- Announce status messages (saved, errors after submit, progress) through live regions without moving focus (WCAG 4.1.3).
- Decorative elements (materials, textures, sheens, dividers, decorative icons) are hidden from assistive technology.
- Visual hierarchy (D0–D4) has no meaning for assistive technology. Structure must be conveyed through semantics: a dialog is a dialog because of its role, not its elevation.

## Reduced motion

Respect the platform preference. CARBON removes movement but keeps every state change. See [Motion › Reduced motion](interaction/motion.md#reduced-motion).

## Disabled state clarity

- Disabled controls are flat (no depth, no bevel), neutral in fill and Text Tertiary in content: distinguishable from enabled controls by shape, not only by color.
- Whenever possible, explain why a control is disabled. Use `aria-disabled` so the control remains discoverable.
- Do not disable a form's submit button to signal invalid input. Let users submit, then show errors.

## High-contrast environments

· **Proposed**

| Environment | CARBON behavior |
|---|---|
| Forced colors (Windows Contrast Themes; `forced-colors: active`) | The platform replaces colors. Shadows, sheens and textures disappear. CARBON surfaces still read because every raised surface and control has a 1px edge, and focus uses `outline`. Use system color keywords for any custom drawing. Do not override the user's colors. |
| Increased contrast (`prefers-contrast: more`, macOS and iOS Increase Contrast) | Use the `-aa` color variants for all text; replace Border with `color.border-aa` on all surfaces; remove the sheen and the Carbon Composite texture; keep shadows. |
| Reduced transparency | Replace state layers and the scrim with opaque equivalents; remove any background blur. |
| Grayscale and color-vision deficiencies | Nothing changes: no CARBON meaning depends on hue. |

## Text scaling and responsive content

- Text scales to 200% without loss of content or function (WCAG 1.4.4). Controls grow in height with their text; nothing is clipped.
- Content reflows to a 320px-wide viewport without two-dimensional scrolling, except for content that requires it, such as data tables and canvases (WCAG 1.4.10).
- Text spacing can be overridden (line height 1.5, paragraph spacing 2×, letter spacing 0.12em, word spacing 0.16em) without breaking layouts (WCAG 1.4.12).
- Both orientations are supported on mobile and tablets (WCAG 1.3.4).
- Information is not lost when panels collapse at smaller size classes; it moves into navigation, sheets or menus.

## Spatial design and legibility

- Text never sits on Carbon Composite texture, sheen highlights or shadows.
- Shadows never cover text of another surface in a way that lowers its contrast below AA (overlays are separated by their own opaque fill).
- Scrims dim the background only while a modal dialog is open, and the dialog itself is fully opaque.
- Translucent and blurred surfaces are not used for content (see [Anti-patterns](anti-patterns.md)).

## WCAG 2.2 additions

| Criterion | CARBON practice |
|---|---|
| 2.4.11 Focus Not Obscured (Minimum) | Scroll focused elements into view clear of sticky headers and toolbars; overlays never cover the element that has focus |
| 2.5.7 Dragging Movements | Every drag interaction (reordering, resizing, sliders) has a single-pointer alternative: buttons, menus or keyboard |
| 2.5.8 Target Size (Minimum) | `size.target.minimum` (24px) everywhere |
| 3.2.6 Consistent Help | Help entry points appear in the same place across a product |
| 3.3.7 Redundant Entry | Previously entered information is pre-filled or selectable |
| 3.3.8 Accessible Authentication (Minimum) | Allow paste and password managers; no cognitive puzzles |

## Review checklist

- [ ] Both themes reviewed; all text pairs meet 4.5:1 (or use `-aa` tokens)
- [ ] Control boundaries use `color.border-aa`
- [ ] Every state has a non-color, non-shadow cue
- [ ] Keyboard: full operation, logical order, visible focus, no traps
- [ ] Focus ring visible with shadows disabled and in forced colors
- [ ] Targets ≥ 24px (44px / 48dp on touch)
- [ ] Names, roles, states exposed; landmarks and headings present
- [ ] Reduced motion respected
- [ ] 200% text and 320px reflow verified
- [ ] No text on textures, sheens or translucent surfaces

---

Previous: [Motion](interaction/motion.md) · Next: [Platforms](platforms.md)
