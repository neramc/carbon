[CARBON](../../README.md) › Foundations › Colors

# Colors

CARBON's color system has two equally considered themes, **Soft White** (Light) and **Soft Black** (Dark), a **monochrome** brand, and a small set of **functional** semantic colors. Neither theme is secondary: both define every token, and the token check fails if they diverge.

All values on this page come from the token source ([`tokens/themes/`](../../tokens/themes)). Contrast ratios were computed with `node tools/carbon-tokens.mjs contrast`.

## Principles

1. **Two first-class themes.** Every decision is made and verified for both themes. A feature that works in only one theme is not finished.
2. **Soft, never absolute.** Soft White is not pure white (`#FFFFFF`), and Soft Black is not pure black (`#000000`). Pure values cause glare, halation and harsh edges.
3. **Monochrome brand.** Emphasis comes from the Text Primary ink and from structure, not from an accent hue.
4. **Color is functional.** Semantic colors appear only when they carry a real state.
5. **The palette encodes the light.** Surface tones follow [Ambient Lighting](../spatial/lighting.md): higher surfaces receive more light, recessed surfaces receive less.

## Color roles

| Role | Token | Purpose |
|---|---|---|
| Background | `color.background` | D0 Foundation: the application background |
| Surface | `color.surface` | D1 Integrated and D2 Raised surfaces |
| Surface Secondary | `color.surface-secondary` | Secondary regions *within* a Surface: headers, grouped areas, table headers |
| Surface Elevated | `color.surface-elevated` | D3 Floating and D4 Elevated surfaces; raised selection tiles |
| Surface Inset | `color.surface-inset` | Recessed regions: input wells, tracks, code blocks |
| Border | `color.border` | Structural edges and dividers |
| Border Strong | `color.border-strong` | Emphasized structural edges |
| Text Primary | `color.text-primary` | Primary text and icons; the brand ink |
| Text Secondary | `color.text-secondary` | Secondary text, descriptions, metadata |
| Text Tertiary | `color.text-tertiary` | Non-essential text, disabled text, decorative glyphs |

## Soft White (Light theme)

> **Decision:** the Light theme uses soft, neutral whites with restrained warmth, never harsh pure white. · **Official**

| Token | HEX | Primitive | L* |
|---|---|---|---:|
| Background | `#F0EFEB` | `color.soft-white.944` | 94.4 |
| Surface | `#F8F7F4` | `color.soft-white.972` | 97.2 |
| Surface Secondary | `#EEEDE9` | `color.soft-white.937` | 93.7 |
| Surface Elevated | `#FBFAF7` | `color.soft-white.983` | 98.3 |
| Surface Inset | `#E7E6E1` | `color.soft-white.912` | 91.2 |
| Border | `#DEDDD7` | `color.soft-white.880` | 88.0 |
| Border Strong | `#CAC9C2` | `color.soft-white.809` | 80.9 |
| Text Primary | `#292927` | `color.soft-white.165` | 16.5 |
| Text Secondary | `#686861` | `color.soft-white.438` | 43.8 |
| Text Tertiary | `#92918A` | `color.soft-white.601` | 60.1 |

**Character.** Soft, off-white surfaces on a neutral gray foundation, restrained warmth (a slight warm bias in the blue channel, never beige or yellow), clearly distinguishable elevations, comfortable contrast and natural soft-gray ambient shadows.

- **Why.** Pure white maximizes glare and makes every shadow look harsh. A slightly lowered, warm-neutral white reads as a physical material (Soft Ceramic) under ambient light and leaves headroom for Surface Elevated to be the lightest surface.
- **Avoid.** Adding more warmth (beige, cream, yellow) or using `#FFFFFF` as a surface.

## Soft Black (Dark theme)

> **Decision:** the Dark theme uses comfortable deep charcoal, never absolute black. · **Official**

| Token | HEX | Primitive | L* |
|---|---|---|---:|
| Background | `#151719` | `color.soft-black.076` | 7.6 |
| Surface | `#1C1F21` | `color.soft-black.115` | 11.5 |
| Surface Secondary | `#222527` | `color.soft-black.145` | 14.5 |
| Surface Elevated | `#292D30` | `color.soft-black.182` | 18.2 |
| Surface Inset | `#111315` | `color.soft-black.058` | 5.8 |
| Border | `#34383A` | `color.soft-black.232` | 23.2 |
| Border Strong | `#494E50` | `color.soft-black.328` | 32.8 |
| Text Primary | `#ECECE8` | `color.soft-black.933` | 93.3 |
| Text Secondary | `#B0B2B0` | `color.soft-black.724` | 72.4 |
| Text Tertiary | `#858A8B` | `color.soft-black.571` | 57.1 |

**Character.** Deep charcoal surfaces with a faint cool bias, restrained contrast between adjacent surfaces, subtle edge highlights, comfortable (not maximal) text contrast, visible physical depth and natural dark contact shadows.

- **Why.** Pure black removes the room needed to show depth below the surface (there is nothing darker than a black background for shadows or insets) and produces halation around light text. Charcoal keeps shadows, insets and elevation steps visible.
- **Avoid.** `#000000` backgrounds, near-black surfaces that collapse D0–D2 into one tone, and pure white text.

## The tonal logic of both palettes

Both palettes follow one rule set derived from Ambient Lighting. Apply it when extending the palette.

| Relationship | Soft White | Soft Black | Rule |
|---|---|---|---|
| Elevated vs Surface | 98.3 > 97.2 | 18.2 > 11.5 | Higher surfaces receive more light: **lighter** in both themes. |
| Surface vs Background | 97.2 > 94.4 | 11.5 > 7.6 | Surfaces sit above the foundation: **lighter**. |
| Inset vs Background | 91.2 < 94.4 | 5.8 < 7.6 | Recessed regions receive less light: **darker** in both themes. |
| Secondary vs Surface | 93.7 < 97.2 | 14.5 > 11.5 | Surface Secondary moves one step **toward the ink**: darker in Soft White, lighter in Soft Black. |

> **Usage rule (Surface Secondary):** Surface Secondary is a tone *within* a Surface, not an elevation level. In Soft White it is nearly identical to Background (1.01:1), so it must not be used directly on the foundation to create a visible region. Use it inside Surface or Surface Elevated containers. · **Proposed**

### Adjacent surface contrast

Tonal steps between surfaces are deliberately small. They support depth; they are **not** accessible boundaries on their own. Boundaries that identify interactive controls must use `color.border-aa` (see [Accessible variants](#accessible-variants)).

| Pair | Soft White | Soft Black |
|---|---:|---:|
| Background ↔ Surface | 1.07 | 1.08 |
| Background ↔ Surface Secondary | 1.01 | 1.16 |
| Background ↔ Surface Elevated | 1.10 | 1.29 |
| Background ↔ Surface Inset | 1.08 | 1.03 |
| Surface ↔ Surface Secondary | 1.09 | 1.07 |
| Surface ↔ Surface Elevated | 1.02 | 1.19 |
| Surface ↔ Surface Inset | 1.16 | 1.12 |

Because Surface and Surface Elevated are only 1.02:1 apart in Soft White, Soft White relies more on shadows and edges for elevation, and Soft Black relies more on tone and edge highlights. The [elevation system](../spatial/elevation.md#how-the-cues-combine) balances this per theme.

## Monochrome brand

> **Decision:** the CARBON brand color is monochrome. · **Official**

- **What.** Brand emphasis uses the Text Primary ink: `color.surface-inverse` (= Text Primary) as a fill, with `color.text-inverse` for content on that fill.
- **Why.** A monochrome brand keeps attention on content and structure, works in both themes without hue tuning, and leaves color free to mean *state*.
- **Where.** Primary buttons, checked checkboxes and radios, the "on" switch track, selection indicators, tooltips, focus rings.
- **How.** `color.surface-inverse` is `#292927` in Soft White and `#ECECE8` in Soft Black. `color.text-inverse` is Surface `#F8F7F4` in Soft White and Background `#151719` in Soft Black. Contrast is 13.60:1 and 15.17:1.
- **Avoid.** Introducing a brand accent for buttons, links, focus, selection or charts' default series. Links use Text Primary with an underline.

## Semantic colors

> **Decision:** semantic colors are functional, not brand colors. They appear only when conveying actual state or meaning. · **Official**

| Role | Token | Soft White | Soft Black |
|---|---|---|---|
| Success | `color.success` | `#237A49` | `#54C58A` |
| Warning | `color.warning` | `#A65D10` | `#F2B35E` |
| Error | `color.error` | `#C03535` | `#F27676` |
| Information | `color.info` | `#3268B2` | `#82A9F0` |

**Rules**

1. Use a semantic color only when the element communicates that state (a validation error, a completed operation, a warning condition, an informational notice).
2. Always pair a semantic color with a non-color cue: an icon with distinct shape, a text label, or both (see [Accessibility](../accessibility.md#color-independent-communication)).
3. Semantic colors may be used as icon color, indicator color, text color, edge color (an error outline) and solid fill (destructive button, status badge).
4. On solid semantic fills, place content in `color.text-inverse`: Soft White contrast is 4.67–5.21:1; Soft Black contrast is 6.52–9.74:1.
5. Do not tint large surfaces with semantic color. A status region is a neutral surface with a semantic icon, a semantic edge and clear text.
6. Do not use semantic hues decoratively: in illustrations, category labels, avatars or chart series that do not represent state.

## Interaction colors

These tokens complete the monochrome system. · **Proposed**

| Token | Soft White | Soft Black | Use |
|---|---|---|---|
| `color.focus` | `#292927` | `#ECECE8` | Focus ring (alias of Text Primary). At least 11.66:1 on every surface. |
| `color.surface-inverse` | `#292927` | `#ECECE8` | Ink fill for primary and checked controls |
| `color.text-inverse` | `#F8F7F4` | `#151719` | Content on ink and semantic fills |
| `color.fill-hover` | Text Primary at 6% | Text Primary at 6% | State layer composited over any surface on hover |
| `color.fill-pressed` | Text Primary at 10% | Text Primary at 10% | State layer composited over any surface while pressed |
| `color.scrim` | `#292927` at 32% | `#060708` at 56% | Modal backdrop behind D4 surfaces |

State layers are translucent so that one token works on every surface in both themes. Composite them over the element's fill (for example as a second background layer); do not replace the fill.

## Contrast

CARBON targets **WCAG 2.2 AA**: 4.5:1 for normal text, 3:1 for large text (≥ 24px, or ≥ 18.66px at weight 700; CARBON treats weight 600 as regular for this purpose), and 3:1 for non-text elements that identify components or states.

Method: WCAG 2.x relative-luminance contrast, computed from the token source. Ratios are **truncated** (not rounded) to two decimals, so a value shown as passing really passes. ✓ = meets 4.5:1 for text. △ = meets 3:1 only (large text and non-text). ✗ = below 3:1.

### Soft White

| Foreground | Background | Surface | Surface Secondary | Surface Elevated | Surface Inset |
|---|---:|---:|---:|---:|---:|
| Text Primary `#292927` | 12.66 ✓ | 13.60 ✓ | 12.44 ✓ | 13.96 ✓ | 11.66 ✓ |
| Text Secondary `#686861` | 4.87 ✓ | 5.23 ✓ | 4.79 ✓ | 5.37 ✓ | **4.49 △** |
| Text Tertiary `#92918A` | **2.74 ✗** | **2.95 ✗** | **2.69 ✗** | 3.03 △ | **2.53 ✗** |
| Success `#237A49` | 4.61 ✓ | 4.96 ✓ | 4.53 ✓ | 5.09 ✓ | **4.25 △** |
| Warning `#A65D10` | **4.35 △** | 4.67 ✓ | **4.27 △** | 4.79 ✓ | **4.00 △** |
| Error `#C03535` | 4.80 ✓ | 5.15 ✓ | 4.71 ✓ | 5.29 ✓ | **4.41 △** |
| Information `#3268B2` | 4.85 ✓ | 5.21 ✓ | 4.76 ✓ | 5.35 ✓ | **4.47 △** |
| Border `#DEDDD7` | 1.18 | 1.27 | 1.16 | 1.30 | 1.08 |
| Border Strong `#CAC9C2` | 1.44 | 1.55 | 1.41 | 1.59 | 1.32 |

### Soft Black

| Foreground | Background | Surface | Surface Secondary | Surface Elevated | Surface Inset |
|---|---:|---:|---:|---:|---:|
| Text Primary `#ECECE8` | 15.17 ✓ | 13.99 ✓ | 13.01 ✓ | 11.72 ✓ | 15.72 ✓ |
| Text Secondary `#B0B2B0` | 8.42 ✓ | 7.76 ✓ | 7.22 ✓ | 6.50 ✓ | 8.72 ✓ |
| Text Tertiary `#858A8B` | 5.13 ✓ | 4.73 ✓ | **4.40 △** | **3.97 △** | 5.32 ✓ |
| Success `#54C58A` | 8.32 ✓ | 7.67 ✓ | 7.14 ✓ | 6.43 ✓ | 8.62 ✓ |
| Warning `#F2B35E` | 9.74 ✓ | 8.98 ✓ | 8.35 ✓ | 7.52 ✓ | 10.09 ✓ |
| Error `#F27676` | 6.52 ✓ | 6.01 ✓ | 5.60 ✓ | 5.04 ✓ | 6.76 ✓ |
| Information `#82A9F0` | 7.60 ✓ | 7.00 ✓ | 6.52 ✓ | 5.87 ✓ | 7.87 ✓ |
| Border `#34383A` | 1.51 | 1.39 | 1.30 | 1.17 | 1.57 |
| Border Strong `#494E50` | 2.13 | 1.96 | 1.82 | 1.64 | 2.20 |

### Findings

| # | Finding | Impact | Resolution |
|---|---|---|---|
| 1 | Soft White Text Secondary on Surface Inset is 4.49:1, just under 4.5:1. | Placeholders and affixes inside input wells. | Use `color.text-secondary-aa` inside inset regions. |
| 2 | Soft White Text Tertiary is 2.53–3.03:1. No Soft White value can meet 4.5:1 and still be lighter than Text Secondary. | Any essential tertiary text. | Text Tertiary is for non-essential text only. Essential text uses `color.text-tertiary-aa`, which equals `color.text-secondary-aa`. |
| 3 | Soft Black Text Tertiary is 4.40:1 on Surface Secondary and 3.97:1 on Surface Elevated. | Metadata in menus, popovers and dialogs. | Use `color.text-tertiary-aa` (`#909596`) for essential tertiary text. |
| 4 | Soft White semantic colors fall below 4.5:1 as text on some surfaces (Warning on Background, Surface Secondary and Surface Inset; the others on Surface Inset). | Status text and error messages. | Use the `-aa` semantic variants for semantic *text*. Baseline colors remain correct for icons, indicators, edges and fills (all ≥ 4.00:1, above the 3:1 non-text minimum). |
| 5 | Border and Border Strong are below 3:1 in both themes. | Boundaries that identify interactive controls (WCAG 1.4.11). | Border and Border Strong stay decorative. Control boundaries use `color.border-aa`. |
| 6 | Text Primary, the focus color and all inverse pairs pass with large margins. | — | No action. |

The baseline palette is **not** changed. The accessible variants below are additional, **proposed** tokens.

## Accessible variants

> **Decision:** tokens with the suffix `-aa` are guaranteed to meet WCAG 2.2 AA for their role against **every** surface of their theme: 4.5:1 for text roles, 3:1 for non-text roles. `node tools/carbon-tokens.mjs check` enforces this. · **Proposed**

Variants were derived by changing only OKLab lightness (hue and chroma preserved) until every surface passed with a safety margin (≥ 4.55:1 for text, ≥ 3.05:1 for non-text), so no rounding in any tool can turn a pass into a fail.

| Token | Soft White | Min. ratio | Soft Black | Min. ratio | Use for |
|---|---|---:|---|---:|---|
| `color.text-secondary-aa` | `#676760` (was `#686861`) | 4.55 | = Text Secondary `#B0B2B0` | 6.50 | Essential secondary text anywhere, including inset regions |
| `color.text-tertiary-aa` | = `text-secondary-aa` `#676760` | 4.55 | `#909596` (was `#858A8B`) | 4.57 | Essential tertiary text |
| `color.border-aa` | `#83827B` | 3.08 | `#717779` | 3.05 | Boundaries of inputs, checkboxes, radios and switch tracks |
| `color.success-aa` | `#1D7545` | 4.56 | = Success `#54C58A` | 6.43 | Success text |
| `color.warning-aa` | `#9C5400` | 4.56 | = Warning `#F2B35E` | 7.52 | Warning text |
| `color.error-aa` | `#BD3233` | 4.58 | = Error `#F27676` | 5.04 | Error text and messages |
| `color.info-aa` | `#3066B0` | 4.59 | = Information `#82A9F0` | 5.87 | Information text |

The Soft White Text Secondary variant differs from the baseline by less than half an L* unit and is visually identical. Adopting `#676760` as the baseline Text Secondary is a candidate for a future minor version (see the [changelog](../../CHANGELOG.md)). · **Future**

## Usage rules

| Do | Don't |
|---|---|
| Use semantic tokens (`color.surface`) in products. | Use primitives (`color.soft-white.972`) or hex values in products. |
| Use the `-aa` variant whenever text is essential and the surface is not guaranteed. | Use Text Tertiary for placeholders, labels, instructions or error text. |
| Pair every semantic color with an icon or label. | Rely on red/green alone. |
| Use `color.border-aa` for control boundaries. | Use Border Strong to make a control "visible enough". |
| Use state layers for hover and pressed fills. | Create new hover colors per component. |
| Verify every new color pairing in both themes. | Tune one theme and copy values to the other. |

## Implementation

Products consume semantic and component tokens. For example, with the optional CSS adapter:

```css
.panel {
  background: var(--carbon-color-surface);
  color: var(--carbon-color-text-primary);
  border: var(--carbon-border-width) solid var(--carbon-color-border);
}
.panel .meta { color: var(--carbon-color-text-tertiary-aa); }
```

Native platforms map the same tokens to platform resources (for example WinUI theme dictionaries, Android `values/` and `values-night/` resources, or SwiftUI asset-catalog colors with Any/Dark appearances). See [Design tokens](../tokens.md).

## Future considerations

- **High-contrast theme.** A dedicated increased-contrast variant of both themes for `prefers-contrast: more` and OS high-contrast settings. Until then, follow [High-contrast environments](../accessibility.md#high-contrast-environments). · **Future**
- **Wide gamut.** Display-P3 versions of the semantic colors. The neutral palettes do not need them. · **Future**
- **APCA.** Re-evaluate the palette with the APCA contrast method if a future WCAG version adopts it. · **Future**

---

Previous: [Brand identity](../brand-identity.md) · Next: [Typography](typography.md)
