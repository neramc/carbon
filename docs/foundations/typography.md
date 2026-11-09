[CARBON](../../README.md) › Foundations › Typography

# Typography

CARBON typography is precise, restrained and platform-aware. A single type scale defines the hierarchy everywhere. The font family adapts to each platform so that text renders at its best and feels native.

## Principles

1. **Hierarchy through size and weight, not color.** Use the scale; reserve color changes for the Text Primary / Secondary / Tertiary roles.
2. **One scale, every platform.** Sizes, weights and line heights are shared. Only the family changes per platform.
3. **Numbers are data.** Metrics, measurements and money use tabular numerals.
4. **Every script is first-class.** Latin and Korean are designed for explicitly; other scripts fall back gracefully.
5. **Text scales.** User text-size settings are always respected.

## Font families

> **Decision:** CARBON uses platform-aware font families. · **Official**

| Purpose | Preferred font | Token |
|---|---|---|
| General (Web, cross-platform) | Inter | `font.family.inter` |
| Windows | Segoe UI Variable | `font.family.segoe-ui-variable` |
| macOS | SF Pro | `font.family.sf-pro` |
| Linux | Inter | `font.family.inter` |
| Korean | Pretendard or Noto Sans KR | `font.family.pretendard`, `font.family.noto-sans-kr` |
| Monospace | JetBrains Mono | `font.family.jetbrains-mono` |

- **Why.** Inter gives CARBON a consistent identity wherever it controls the font. On Windows and macOS, the system fonts are optimized for each OS's rasterizer and accessibility features, so native CARBON apps use them.
- **Where.** Product UI text. Brand marketing may use Inter everywhere for consistency.
- **How.** See the platform mapping below.
- **Avoid.** Bundling SF Pro on non-Apple platforms (its license does not allow it), mixing two UI sans families in one view, and decorative display faces.

### Platform mapping

| Platform | UI family | Korean fallback | Monospace | Notes · **Proposed** where not in the table above |
|---|---|---|---|---|
| Windows (native) | Segoe UI Variable | Pretendard → Malgun Gothic | JetBrains Mono → Cascadia Mono | Use the optical sizes: *Small* ≤ 12px, *Text* 13–19px, *Display* ≥ 20px. |
| macOS (native) | SF Pro (system font) | Pretendard → Apple SD Gothic Neo | JetBrains Mono → SF Mono | Request the system font through platform APIs, not by name. SF Pro Text below 20pt, Display at 20pt and above, applied automatically by the system. |
| Linux | Inter | Pretendard → Noto Sans KR | JetBrains Mono | Bundle Inter with the app; do not depend on the distribution. |
| Web | Inter | Pretendard → Noto Sans KR | JetBrains Mono | Self-host Inter; use the default stack `font.family.sans`. |
| iOS / iPadOS | SF Pro (system font) | Apple SD Gothic Neo (system) | SF Mono | Support Dynamic Type. |
| Android | Inter (bundled) | Noto Sans KR (system) | JetBrains Mono | Roboto is an acceptable fallback if bundling is impossible. Use `sp` for text. |

The default stack for Web and cross-platform UI (`font.family.sans`):

```text
"Inter", "Pretendard Variable", "Pretendard", "Noto Sans KR", system-ui, -apple-system,
"Segoe UI Variable Text", "Segoe UI", "Roboto", sans-serif
```

Inter has no Hangul glyphs, so Korean text falls back glyph by glyph to Pretendard. That is the intended pairing. The two families share similar proportions and weights.

## Weights

| Token | Weight | Use | Status |
|---|---:|---|---|
| `font.weight.regular` | 400 | Body text, captions | **Official** |
| `font.weight.medium` | 500 | Labels, overlines, emphasis inside body text | **Official** |
| `font.weight.semibold` | 600 | Headings, titles | **Official** |
| `font.weight.bold` | 700 | Reserved: numeric emphasis, user-generated rich text | **Proposed** |

Never use weights below 400 for UI text: they break up under Windows ClearType and at small sizes on low-density displays.

## Type scale

> **Decision:** sizes and weights below are the official CARBON type scale. Line heights and letter spacing complete it. · Sizes and weights **Official** · line heights and letter spacing **Proposed**

| Style | Token | Size | Weight | Line height | Letter spacing | Use |
|---|---|---:|---:|---:|---:|---|
| Display | `type.display` | 40px | 600 | 48px | −0.02em (−0.8px) | Hero numbers, empty-state headlines, onboarding. At most one per view. |
| H1 | `type.h1` | 32px | 600 | 40px | −0.02em (−0.64px) | Page or window title |
| H2 | `type.h2` | 24px | 600 | 32px | −0.015em (−0.36px) | Section heading |
| H3 | `type.h3` | 20px | 600 | 28px | −0.01em (−0.2px) | Subsection heading, dialog title |
| Title | `type.title` | 16px | 600 | 24px | −0.01em (−0.16px) | Card, panel and list-group titles |
| Body Large | `type.body-large` | 16px | 400 | 24px | −0.01em (−0.16px) | Long-form reading content |
| Body | `type.body` | 14px | 400 | 20px | −0.005em (−0.07px) | Default UI text |
| Caption | `type.caption` | 12px | 400 | 16px | 0 | Metadata, timestamps, helper text |
| Overline | `type.overline` | 11px | 500 | 16px | +0.06em (+0.66px), uppercase | Section labels in sidebars and dense panels |
| Label | `type.label` | 14px | 500 | 20px | 0 | Buttons, menu items, navigation items · **Proposed** |
| Label Small | `type.label-small` | 12px | 500 | 16px | 0 | Small buttons, tags, compact table headers · **Proposed** |
| Code | `type.code` | 13px | 400 (mono) | 20px | 0 | Inline and block code · **Proposed** |

**Line heights** sit on the 4px grid, so text blocks align with the spacing system. They are stored as unitless ratios (for example 20 / 14 = 1.4286) so they scale with the user's text size.

**Letter spacing** follows Inter's size-dependent tracking: tighter for large text, neutral for small text, open for uppercase. On macOS and iOS, native text APIs apply SF Pro tracking automatically. Do not add Inter's values there. Segoe UI Variable's optical sizes include their own tracking; use 0 on Windows native.

**Code size.** JetBrains Mono at 13px matches the optical size of Inter at 14px. Inline code inside body text uses 13px on a Surface Inset background with radius 4px.

## Hierarchy

### Headings

1. Use one H1 per page or window: the title of the current context.
2. Do not skip semantic levels (H1 → H3). Visual style and semantic level are separate: a dialog title is styled H3 but is exposed to assistive technology as the dialog's heading.
3. Headings use Text Primary. Never use semantic colors for headings.
4. Keep headings short and front-loaded. Do not end them with periods.
5. Space above a heading is larger than below it (see [Spacing](spacing.md#vertical-rhythm)), so the heading belongs to the content it introduces.

### Body text

- **Body** (14px) is the default for UI text: descriptions, table cells, form values, list content.
- **Body Large** (16px) is for reading surfaces: documents, articles, onboarding text, settings explanations.
- Measure: 60–80 characters per line for Latin text, 30–45 for Korean. · **Proposed**
- Use Text Secondary for supporting copy and Text Tertiary only for non-essential text (see [Colors](colors.md#accessible-variants)).

### Captions

Captions (12px) carry metadata: timestamps, file sizes, helper text under fields, chart annotations. Captions must stay readable: use Text Secondary or `color.text-tertiary-aa`, never baseline Soft White Text Tertiary, for essential captions.

### Labels

Labels name controls and destinations: button text, menu items, tabs, navigation items, field labels. They use `type.label` (14px / 500), or `type.label-small` for small controls. Labels are sentence case ("Save changes"), never all caps.

### Overline

Overline (11px / 500, uppercase, +0.06em) labels groups in dense structures: sidebar sections, inspector groups. Use it sparingly, at most one overline level per region. In scripts without case (Korean, Japanese, Chinese), render the overline with weight 500, letter spacing 0, Text Secondary color, and no transformation.

## Numeric presentation

> **Decision:** metrics, measurements and financial values use tabular numerals. · **Official**

| Rule | Implementation |
|---|---|
| Tabular figures for any number that is compared, aligned or updated live (tables, timers, prices, counters, coordinates) | OpenType `tnum`; CSS `font-variant-numeric: tabular-nums` |
| Lining figures always | Inter's default figures are lining |
| Right-align numeric columns; align decimal separators | Fixed fraction digits per column |
| Proper minus sign for negative values | U+2212 `−`, not a hyphen |
| Space between value and unit | Narrow no-break space U+202F: `24 px`, `3.2 GB` |
| Slashed zero for identifiers, codes and hashes | OpenType `zero`; or use the monospace family |
| Locale-aware formatting | Platform number formatters, never manual string building |
| Proportional figures in running prose | Default `pnum` is fine in sentences |

## Multilingual content

| Topic | Rule · **Proposed** |
|---|---|
| Fallback order | UI family, then Korean family, then platform fallback. Never let the browser or OS pick an unrelated serif fallback; always end stacks with a sans-serif generic. |
| Korean line height | For multi-line paragraphs in Hangul, use relaxed line heights: Body 14/22, Body Large 16/26, Caption 12/18. Single-line UI text keeps the default heights so control sizes do not change. |
| Korean letter spacing | Do not apply Latin negative tracking to Hangul. Use 0, or at most −0.01em for headings ≥ 24px. |
| Korean line breaking | Break between words, not inside them (CSS `word-break: keep-all`; native equivalents). Allow `overflow-wrap: anywhere` for long URLs and identifiers. |
| Mixed-script weight | Pretendard and Inter weights match 1:1. With Noto Sans KR, check visually that 500 and 600 remain distinguishable. |
| Text expansion | Allow 30–40% expansion for translated labels (German, Finnish). Never fix widths to English text. |
| Right-to-left | Mirror layout direction, navigation order and directional icons. Do not mirror media controls, numbers or brand marks. |
| Uppercase | Apply uppercase transforms only to scripts with case. |

## Platform rendering

Font rendering differs by platform. Verify typography on each target platform, not only in design tools. · **Platform note**

| Platform | Behavior | Guidance |
|---|---|---|
| Windows | DirectWrite with ClearType; strong hinting; text looks lighter and crisper. | Use Segoe UI Variable optical sizes. Avoid weights below 400 and letter spacing below −0.02em. Test at 100%, 125% and 150% scale. |
| macOS | Grayscale antialiasing; no subpixel rendering; text looks heavier. | Native: system font. Web: do not force thin smoothing on Soft White text. Grayscale smoothing on light-on-dark Soft Black text is acceptable to reduce bloom. |
| Linux | FreeType; hinting and subpixel settings vary by distribution and user. | Bundle Inter. Respect system antialiasing settings. Test with slight hinting and with hinting off. |
| Web | Rendering follows the OS; variable fonts and optical sizing are supported. | Use Inter's variable font with `font-optical-sizing: auto`. Preload the regular and semibold instances to avoid layout shift. |
| iOS / Android | High-density screens; system-managed rendering. | Use Dynamic Type (iOS) and `sp` units (Android). |

## Text scaling

- Text must scale with user settings: browser zoom and default font size (Web), Dynamic Type (iOS), font scale (Android) and text scaling (Windows).
- Layouts must remain usable at **200%** text size: no clipped or overlapping text, no loss of functionality (WCAG 1.4.4).
- Controls grow in height when their labels wrap or scale. Never fix a control's height so that it clips scaled text.
- The CSS adapter emits font sizes in `rem` so that browser font-size preferences apply.

## Implementation

```css
body {
  font: var(--carbon-type-body);               /* 400 0.875rem/1.4286 Inter, … */
  letter-spacing: var(--carbon-type-body-letter-spacing);
}
h1 {
  font: var(--carbon-type-h1);
  letter-spacing: var(--carbon-type-h1-letter-spacing);
}
.metric { font-variant-numeric: tabular-nums; }
.overline {
  font: var(--carbon-type-overline);
  letter-spacing: var(--carbon-type-overline-letter-spacing);
  text-transform: var(--carbon-type-overline-text-transform);
}
```

Native platforms map each `type.*` token to a text style resource (WinUI `TextBlock` styles, SwiftUI custom `Font` extensions scaled with Dynamic Type, Android `TextAppearance` styles in `sp`).

---

Previous: [Colors](colors.md) · Next: [Spacing](spacing.md)
