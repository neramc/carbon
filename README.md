# CARBON

**Structural Minimalism + Soft Geometry.**
CARBON is an original, general-purpose, cross-platform design language for applications, operating systems, websites, productivity tools and utilities.

| | |
|---|---|
| Design Language | **1.0.0** |
| Spatial Design System | **1.0** |
| Design tokens | **1.0.0** (DTCG 2025.10 format) |
| Released | 2026-11-09 |
| Flagship platform | Desktop |
| Supported platforms | All: Windows, macOS, Linux, Web, iOS, Android, tablets and future platforms |

---

## What CARBON is

CARBON is a **design language**, not the design system of a single product. It defines how any digital product looks, feels and behaves when it is "built in Carbon": its philosophy, visual identity, foundations, spatial model, component principles and implementation rules. Product teams build their own component libraries on top of it, on any platform and in any UI technology.

The name comes from carbon fiber. CARBON translates the *properties* of carbon-fiber materials into interface design:

| Material property | Interface expression |
|---|---|
| Structural strength | Every element has a structural purpose; hierarchy is built, not decorated. |
| Precision | Exact alignment, a strict 4px spacing system, consistent geometry and behavior. |
| Lightweight construction | Minimal surfaces, no visual noise, nothing heavier than its job. |
| Durability | Stable, predictable interfaces that hold up across platforms and years. |
| Material sophistication | Hybrid Material: Soft Ceramic surfaces with Carbon Composite details. |
| Modularity | Reusable, composable primitives and tokens. |
| Engineering orientation | Every value is specified, measured and verifiable. |

CARBON is **not** a dark-only or black-only language, and it does not cover interfaces in carbon-fiber texture. It has two equally considered themes, **Soft White** and **Soft Black**. Its carbon-fiber reference shows up as structure, precision and a *subtle* material detail.

## Design philosophy

**Structural Minimalism + Soft Geometry.** Minimal presentation, structurally rich surfaces, carefully controlled spatial depth and precise interaction.

| Principle | In one line |
|---|---|
| Structural Integrity | Every element has a clear structural purpose; hierarchy is intentional and legible. |
| Essential Minimalism | Remove visual noise; keep useful information and functionality. |
| Precision | Consistent alignment, spacing, geometry and interaction behavior. |
| Resilience | Stable, predictable, reliable interfaces. |
| Modularity | Reusable, composable components and primitives. |
| Universality | One recognizable identity across platforms, without forcing identical implementations. |

Supporting maxims: *Strength through Structure · Less but Better · Consistency is Strength · Function Defines Form · Adaptability without Fragmentation.*
Full specification: [Design philosophy](docs/philosophy.md).

## Defining characteristics

These are established decisions. Do not reinterpret or replace them.

| Design dimension | Official direction |
|---|---|
| Overall style | Minimal |
| Design philosophy | Structural Minimalism |
| Geometry | Rounded Minimalism |
| Light theme | Soft White |
| Dark theme | Soft Black |
| Brand color | Monochrome |
| Carbon fiber pattern | Subtle |
| Spatial depth | Pronounced |
| Material | Hybrid Material |
| Lighting | Ambient |
| Spatial composition | Integrated |
| Brand personality | Balanced |
| Flagship platform | Desktop |
| Supported platforms | All |

## Themes

Both themes are first-class. Every token exists in both with the same name, and the token check fails if they differ ([theme parity](docs/tokens.md#theme-parity)).

| Role | Soft White (Light) | Soft Black (Dark) |
|---|---|---|
| Background | `#F0EFEB` | `#151719` |
| Surface | `#F8F7F4` | `#1C1F21` |
| Surface Secondary | `#EEEDE9` | `#222527` |
| Surface Elevated | `#FBFAF7` | `#292D30` |
| Surface Inset | `#E7E6E1` | `#111315` |
| Border | `#DEDDD7` | `#34383A` |
| Border Strong | `#CAC9C2` | `#494E50` |
| Text Primary | `#292927` | `#ECECE8` |
| Text Secondary | `#686861` | `#B0B2B0` |
| Text Tertiary | `#92918A` | `#858A8B` |

The brand is **monochrome**: emphasis comes from the Text Primary ink, not from an accent hue. Success, Warning, Error and Information colors are functional and appear only when they carry a real state. See [Colors](docs/foundations/colors.md) for semantic colors, measured WCAG contrast and the accessible variants.

## Spatial Design System 1.0

CARBON interfaces have physical structure: volume, thickness, edge curvature and spatial relationships. They are never flat cards with decorative drop shadows.

**Pronounced Depth + Hybrid Material + Ambient Lighting + Integrated Space**

| Level | Name | Usage | Fill |
|---|---|---|---|
| D0 | Foundation | Application foundation and background | Background |
| D1 | Integrated | Base surfaces and integrated regions | Surface |
| D2 | Raised | Cards and primary content panels | Surface |
| D3 | Floating | Toolbars, popovers, dropdowns | Surface Elevated |
| D4 | Elevated | Dialogs and top-level overlays | Surface Elevated |

Depth always comes from several cues together: surface tone, a structural edge, a bevel (B0–B3), and contact and ambient shadows. A shadow is never the only cue. Start with the [Spatial overview](docs/spatial/overview.md).

## How to read this guide

### Status labels

Every rule and value carries one of these labels, in the text, in a table column, or as token metadata (`$extensions.carbon.status`).

| Label | Meaning | Change policy |
|---|---|---|
| **Official** | An established CARBON decision. | Changing it is a major version. |
| **Reference** | An initial reference value. Platforms may tune it within the documented range. | Changes are minor versions. |
| **Proposed** | A conservative proposal made by this guide to complete the system. Use it: it is the current rule. It may change before ratification. | Ratification or change is a minor version. |
| **Platform note** | Implementation guidance for a specific platform or technology. | Updated as platforms evolve. |
| **Future** | Under consideration. Do not use. | — |

### Decision records

Important decisions use one format, so designers, developers and AI agents can find the same five answers in the same place:

> **Decision:** what is decided · **Why:** the reason · **Where:** the scope · **How:** the implementation · **Avoid:** the failure mode

### Units

`px` means density-independent pixels: CSS px, Apple points (pt), Android dp (sp for text) and Windows effective pixels (epx). Never physical pixels.

### Normative language

**Must** and **must not** are requirements. **Should** and **should not** are strong recommendations; deviate only with a documented reason. **May** is optional.

## Documentation map

| Section | Document | Contents |
|---|---|---|
| Identity | [Design philosophy](docs/philosophy.md) | Structural Minimalism, six principles, maxims, decision method |
| | [Brand identity](docs/brand-identity.md) | Name, positioning, personality, visual identity, voice |
| Foundations | [Colors](docs/foundations/colors.md) | Soft White, Soft Black, semantic colors, WCAG contrast, accessible variants |
| | [Typography](docs/foundations/typography.md) | Families, platform fonts, scale, line height, tracking, numerals, multilingual |
| | [Spacing](docs/foundations/spacing.md) | 4px scale, insets, gaps, seams, density, responsive layout |
| | [Geometry](docs/foundations/geometry.md) | Rounded Minimalism, radius scale, nesting rules, sizes, strokes, icons |
| Spatial Design System | [Overview](docs/spatial/overview.md) | Spatial philosophy and the four spatial decisions |
| | [Materials](docs/spatial/materials.md) | Hybrid Material: Soft Ceramic and Carbon Composite |
| | [Lighting](docs/spatial/lighting.md) | Ambient Lighting: ambient, diffuse, contact occlusion, edge highlight |
| | [Elevation](docs/spatial/elevation.md) | D0–D4, shadow construction, bevels B0–B3, interactive depth, layering |
| | [Composition](docs/spatial/composition.md) | Integrated Space: continuity, nesting, seams, grouping |
| Components | [Overview](docs/components/overview.md) | Component principles, the ten-point specification format |
| | [Surfaces](docs/components/surfaces.md) | Cards, panels, toolbars |
| | [Controls](docs/components/controls.md) | Buttons, text and search fields, selects, checkboxes, radios, switches |
| | [Navigation](docs/components/navigation.md) | Desktop navigation, sidebars, tabs, mobile navigation |
| | [Overlays](docs/components/overlays.md) | Popovers, dropdowns, tooltips, dialogs |
| Interaction | [States](docs/interaction/states.md) | Default, hover, pressed, selected, focused, disabled, error |
| | [Motion](docs/interaction/motion.md) | Durations, easing, spatial transitions, reduced motion |
| Quality | [Accessibility](docs/accessibility.md) | WCAG 2.2 AA requirements |
| | [Platforms](docs/platforms.md) | Desktop, Web, mobile, tablet; Windows, macOS, Linux, iOS, Android |
| | [Anti-patterns](docs/anti-patterns.md) | What CARBON avoids, and why |
| Implementation | [Design tokens](docs/tokens.md) | Token architecture, naming, spatial tokens, adapters, tooling |
| Reference | [Glossary](docs/glossary.md) | Canonical terminology |
| | [Changelog](CHANGELOG.md) | Versions and the versioning convention |

Suggested reading order: Philosophy → Brand identity → Foundations → Spatial Design System → Components → Interaction → Accessibility → Platforms → Tokens.

## Repository structure

```text
.
├── README.md                     Entry point (this file)
├── CHANGELOG.md                  Versions and versioning convention
├── docs/                         The CARBON design guide
│   ├── philosophy.md
│   ├── brand-identity.md
│   ├── foundations/              colors · typography · spacing · geometry
│   ├── spatial/                  overview · materials · lighting · elevation · composition
│   ├── components/               overview · surfaces · controls · navigation · overlays
│   ├── interaction/              states · motion
│   ├── accessibility.md
│   ├── platforms.md
│   ├── tokens.md
│   ├── anti-patterns.md
│   └── glossary.md
├── tokens/                       Authoritative, platform-neutral design tokens (DTCG JSON)
│   ├── primitive.tokens.json
│   ├── semantic.tokens.json
│   ├── component.tokens.json
│   └── themes/                   light.tokens.json (Soft White) · dark.tokens.json (Soft Black)
├── adapters/
│   └── css/carbon-tokens.css     Optional, generated CSS custom properties
└── tools/
    └── carbon-tokens.mjs         Zero-dependency check and build tool (Node.js 18+)
```

## Working with tokens

The JSON files in [`tokens/`](tokens/README.md) are the single source of truth. Platform adapters are generated from them and are never edited by hand.

```bash
node tools/carbon-tokens.mjs check
```

```bash
node tools/carbon-tokens.mjs build
```

`check` validates token structure and references, theme parity, contrast guarantees, documentation colors and links, and whether the CSS adapter is up to date. `build` regenerates the CSS adapter. `contrast` prints the contrast tables used in [Colors](docs/foundations/colors.md).

## Versioning and contributions

CARBON follows semantic versioning for the language and its tokens. See [CHANGELOG.md](CHANGELOG.md) for the convention and history. Every change must:

1. keep Soft White and Soft Black at parity;
2. label new rules and values **Official**, **Reference**, **Proposed**, **Platform note** or **Future**;
3. keep values in the token source and reference them from documentation, not copy them;
4. pass `node tools/carbon-tokens.mjs check`.
