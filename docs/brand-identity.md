[CARBON](../README.md) › Brand identity

# Brand identity

This document defines what CARBON is as a brand: its name, positioning, personality and visual identity. These are the decisions every product built in CARBON inherits.

## Name

> **Decision:** the design language is named **CARBON**. · **Official**

- **Inspiration.** Carbon fiber, a material valued for structural strength, precision, light weight, durability, material sophistication and modular construction.
- **Interpretation.** CARBON borrows the *properties* of the material, not its appearance. It must never be read as a black-only language, a dark-theme-first language or a carbon-fiber texture style.
- **Writing the name.** Write the language name as **CARBON** in titles, headings and references to the language. The material name **Carbon Composite** is a proper noun in title case. Do not translate the name or add a suffix ("Carbon UI", "CarbonOS") when referring to the language itself.

## Positioning

> **Decision:** CARBON is an original, general-purpose, cross-platform design language. · **Official**

| Aspect | Position |
|---|---|
| Category | Design language: philosophy, identity, foundations, spatial model, component principles, tokens |
| Scope | Applications, operating systems, websites, productivity tools, utilities and other digital products |
| Ownership | Independent of any single product or platform vendor |
| Flagship platform | Desktop: the reference environment where CARBON is designed first and expressed most fully |
| Supported platforms | Windows, macOS, Linux, Web, iOS, Android, tablets and future computing platforms |
| Relationship to platforms | Adapts to platform conventions without giving up its identity invariants (see [Philosophy](philosophy.md#identity-invariants-and-adaptable-conventions)) |

**Desktop first** means CARBON is designed and validated on desktop first: pointer and keyboard input, information-dense layouts, multiple windows, resizable panels. Every rule must still work on touch devices, small screens and inputs without hover. Desktop-first never means desktop-only.

## Brand personality

> **Decision:** CARBON's personality is **Balanced**: understated sophistication with clearly perceptible physical depth. · **Official**

CARBON should feel:

| Trait | How it shows in the interface |
|---|---|
| Minimal | Few elements, generous structure, no decoration without function |
| Refined | Precise edges, calm tones, carefully tuned shadows and bevels |
| Balanced | Neither cold nor playful; equal care for both themes |
| Precise | 4px grid, consistent radii, exact timing |
| Tactile | Surfaces with thickness, controls that press down, raised selection tiles |
| Modern | Clean type, current platform behaviors, Soft Geometry |
| Reliable | Stable layout, predictable states, readable in every condition |
| Structurally sophisticated | Integrated Space: surfaces built into one continuous environment |

CARBON must not feel:

| Avoid | Why it conflicts | Instead |
|---|---|---|
| Overly futuristic | Sci-fi chrome, neon and glow undermine reliability and age quickly. | Calm, durable forms. |
| Industrial | Rivets, heavy metal bevels and hazard styling are literal, not refined. | Restrained B1–B2 bevels and matte materials. |
| Decorative | Ornament competes with content. | Structure as the only ornament. |
| Playful | Bouncy motion, mascots and saturated color contradict precision. | Controlled motion, monochrome brand. |
| Visually aggressive | High-contrast flashing, heavy shadows and loud color tire users. | Ambient Lighting, comfortable contrast. |

## Visual identity

The [defining characteristics](../README.md#defining-characteristics) are fixed. This section explains how they work together.

| Element | Identity decision | Detailed specification |
|---|---|---|
| Style | Minimal: Structural Minimalism | [Philosophy](philosophy.md) |
| Geometry | Rounded Minimalism | [Geometry](foundations/geometry.md) |
| Light theme | Soft White: soft neutral whites, restrained warmth | [Colors](foundations/colors.md#soft-white-light-theme) |
| Dark theme | Soft Black: deep comfortable charcoal | [Colors](foundations/colors.md#soft-black-dark-theme) |
| Brand color | Monochrome | [Colors](foundations/colors.md#monochrome-brand) |
| Carbon fiber pattern | Subtle, limited to Carbon Composite | [Materials](spatial/materials.md#carbon-composite) |
| Depth | Pronounced | [Elevation](spatial/elevation.md) |
| Material | Hybrid Material | [Materials](spatial/materials.md) |
| Lighting | Ambient | [Lighting](spatial/lighting.md) |
| Composition | Integrated | [Composition](spatial/composition.md) |

### Monochrome brand expression

CARBON has no brand accent hue. The brand expresses itself through:

1. **Ink and paper.** The Text Primary ink (`#292927` in Soft White, `#ECECE8` in Soft Black) on soft surfaces. Primary actions, checked controls and selection indicators use this ink.
2. **Structure and depth.** The D0–D4 hierarchy, bevels and Integrated Space make a CARBON product recognizable even in grayscale.
3. **Carbon Composite.** The subtle twill microtexture on brand elements and selected structural surfaces.
4. **Typography.** A precise, restrained type scale with tabular numerals for data.

A product may add **one** product accent color only for product-identity elements (for example, an app icon or a marketing illustration), never for interactive states inside the interface. Interactive states remain monochrome plus functional semantic color. · **Proposed**

### Where the brand appears

| Location | Expression | Material |
|---|---|---|
| App icon, splash, about screen | Strongest: Carbon Composite plate, ink wordmark | Carbon Composite |
| Window foundation and chrome | Structural: D0 foundation with integrated D1 regions | Soft Ceramic |
| Content surfaces | Neutral: content first | Soft Ceramic |
| Primary actions and selection | Ink emphasis | Soft Ceramic |
| Technical visualization frames | Structural detail around (never behind) data | Carbon Composite |

### Logo and wordmark

· **Future.** CARBON does not yet define an official logo or wordmark. Until one is ratified, set the name as the text "CARBON" in the product's UI font at weight 600 with letter spacing +0.06em, in Text Primary. Do not create unofficial logo marks.

## Voice

· **Proposed.** Interface writing follows the brand personality.

| Quality | Guideline | Example |
|---|---|---|
| Precise | Name the exact object and action. | "Delete 3 files" rather than "Delete items" |
| Calm | State facts without alarm or exclamation marks. | "Connection lost. Retrying in 10 seconds." |
| Plain | Prefer common words; avoid internal jargon. | "Sign in" rather than "Authenticate" |
| Respectful | Never blame the user. | "That password doesn't match" rather than "You entered a wrong password" |
| Brief | Lead with the essential information. | "Saved" rather than "Your changes have been saved successfully" |

---

Previous: [Design philosophy](philosophy.md) · Next: [Colors](foundations/colors.md)
