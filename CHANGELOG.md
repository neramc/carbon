# Changelog

All notable changes to the CARBON design language, its documentation and its design tokens.

## Versioning convention

CARBON uses [Semantic Versioning](https://semver.org/) for the design language as a whole. Documentation and tokens share one version number, because tokens are the machine-readable form of the documented decisions.

| Bump | When |
|---|---|
| **Major** (X.0.0) | An **Official** decision changes or is removed; a token is removed or renamed; a value of an **official** token changes; theme or depth-level semantics change |
| **Minor** (1.X.0) | New guidance, components or tokens; a **Reference** or **Proposed** value changes; a **Proposed** rule is ratified as **Official** (a status promotion); a **Future** item is introduced as **Proposed** |
| **Patch** (1.0.X) | Clarifications, corrections of wording, typos, broken links and metadata that do not change any decision or value |

The **Spatial Design System** carries its own two-part version (currently 1.0). It increments its minor version with any change to depth, material, lighting or composition rules, and its major version when one of its four official decisions changes.

Every entry lists changes under **Added**, **Changed**, **Deprecated**, **Removed** and **Fixed**, and states the status of what changed. Deprecated tokens remain for at least one minor version before removal in the next major version.

## [1.0.0] — 2026-11-09

Initial release of the official CARBON design guide. Spatial Design System 1.0.

### Added

- **Documentation:** design philosophy, brand identity, foundations (colors, typography, spacing, geometry), Spatial Design System 1.0 (overview, materials, lighting, elevation, composition), component guidelines (surfaces, controls, navigation, overlays), interaction (states, motion), accessibility, platforms, design tokens, anti-patterns and glossary.
- **Official decisions recorded:** brand identity and positioning; the six principles and maxims; the visual identity table; the Soft White and Soft Black palettes; semantic colors; the font families and the type scale (sizes and weights); the 4px spacing scale; the radius scale and the component radius table; the four spatial decisions (Pronounced Depth, Hybrid Material, Ambient Lighting, Integrated Space); the D0–D4 hierarchy; the bevel levels B0–B3 and their preferred uses; the interactive depth behaviors; the motion reference durations; the WCAG 2.2 AA target.
- **Design tokens** in DTCG 2025.10 format: primitive, theme-agnostic semantic, Soft White, Soft Black and component layers (411 tokens per theme resolution set), with status metadata.
- **Tooling:** `tools/carbon-tokens.mjs` (`check`, `build`, `contrast`), with zero dependencies.
- **CSS adapter:** generated `adapters/css/carbon-tokens.css`.

### Proposed (introduced by this release to complete the system)

- Accessible `-aa` color variants: Soft White `text-secondary-aa` `#676760`, `border-aa` `#83827B`, `success-aa` `#1D7545`, `warning-aa` `#9C5400`, `error-aa` `#BD3233`, `info-aa` `#3066B0`; Soft Black `text-tertiary-aa` `#909596`, `border-aa` `#717779`.
- Interaction colors: focus, surface-inverse, text-inverse, state layers, scrim.
- Line heights, letter spacing, and the Label, Label Small and Code type styles.
- Semantic spacing roles (inset, gap, seam), density modes, window size classes and layout grid.
- Derived component radii (indicator, tooltip, menu, floating toolbar, popover), the nesting rule and the anti-pill rule.
- Shadow construction (key and near layers), Soft Black shadow opacities, hover and pressed depth, bevel construction, lighting tokens, material parameters, surface classes, stacking layers.
- Easing curves, overlay exit duration, instant focus transitions.
- Component specifications in the ten-point format.

### Assumptions and resolved ambiguities

1. **Floating surface radius.** The component radius table assigns 20px to floating surfaces, while the depth system places menus, dropdowns and toolbars at D3 Floating. Applying 20px to compact surfaces would contradict the anti-pill and concentric-nesting rules. Resolution: 20px applies to large floating surfaces (floating panels, palettes, sheets); compact floating surfaces derive 12–16px from their contents. · Proposed
2. **Shadow reference ranges.** The reference blur and opacity ranges are applied to each level's *key* layer. A second, tighter *near* layer (contact or penumbra) is added to every level. · Proposed
3. **Soft Black shadow opacity.** The reference opacity ranges produce barely visible shadows on dark surfaces. Soft Black doubles the Soft White opacity (exceeding the reference ranges) to keep the same perceived depth. · Proposed
4. **Depth-level fills.** D1 and D2 use Surface; D3 and D4 use Surface Elevated; Surface Secondary is a tonal region within a surface, not an elevation level, because it moves in opposite lightness directions in the two themes. · Proposed
5. **Checkbox radius.** "Small controls: 6px" is applied to 20–28px controls. Glyph-scale indicators (20px checkbox) use 4px so they do not read as circles. · Proposed
6. **Large text.** For contrast purposes, weight 600 is treated as regular, so only text ≥ 24px qualifies as large unless it is weight 700. · Proposed
7. **Platform fonts.** "General: Inter" is applied to Web, Android and cross-platform products; Windows and Apple platforms use their system fonts in native apps. · Proposed

### Known issues in the baseline palette (documented, not changed)

- Soft White Text Secondary on Surface Inset: 4.49:1.
- Soft White Text Tertiary: 2.53–3.03:1 on all surfaces.
- Soft Black Text Tertiary on Surface Secondary and Surface Elevated: 4.40:1 and 3.97:1.
- Soft White Warning on Background, Surface Secondary and Surface Inset, and Success, Error and Information on Surface Inset, are below 4.5:1 as text.
- Border and Border Strong are below 3:1 in both themes (decorative use only).

See [Colors › Findings](docs/foundations/colors.md#findings) for the accessible variants that resolve each issue.

### Future

- Adopt `#676760` as the baseline Soft White Text Secondary (visually identical; removes the only Text Secondary failure).
- High-contrast variants of both themes; Display-P3 semantic colors.
- Native token adapters (WinUI, SwiftUI, Android, GTK/Qt, Flutter).
- Specifications for tables, lists, sliders, progress indicators, toasts, badges, pickers and other components.
- An official logo and wordmark.
