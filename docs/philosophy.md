[CARBON](../README.md) › Design philosophy

# Design philosophy

> **Structural Minimalism + Soft Geometry**: minimal visual presentation, structurally rich surfaces, carefully controlled spatial depth and precise interaction design. · **Official**

This document defines *why* CARBON looks and behaves the way it does. Every other document in this guide applies these principles. When a situation is not covered by a specific rule, decide it with the [decision method](#decision-method) at the end of this page.

## Structural Minimalism

Most minimal design languages remove things until the interface is flat. CARBON removes *noise* and keeps *structure*. The result is minimal in presentation and rich in construction.

| Structural Minimalism is | Structural Minimalism is not |
|---|---|
| Few elements, each with a clear structural role | Few elements, with structure hidden or flattened away |
| Hierarchy expressed through surfaces, depth, edges and spacing | Hierarchy expressed through color accents and decoration |
| Physical presence: surfaces have thickness, edges and contact | Flat rectangles with decorative drop shadows |
| A monochrome brand with functional color | A colorless interface that hides state |
| Restraint in every effect | No effects at all |

## Soft Geometry

The structure is softened by geometry. **Rounded Minimalism** gives every surface a coherent, moderate corner radius that follows nesting rules (see [Geometry](foundations/geometry.md)). Soft Geometry keeps a structurally rich interface approachable: strength without hardness.

Soft Geometry is moderate by definition. CARBON shapes are clearly rounded rectangles, never pills, blobs or circles, unless the element is inherently circular (radio button, switch, avatar).

## The six principles

### 1. Structural Integrity

> **Decision:** every interface element has a clear structural purpose, and visual hierarchy is intentional and understandable. · **Official**

- **Why.** Users read structure before content. When structure is consistent, users understand an unfamiliar screen without having to learn it.
- **Where.** Layout, grouping, surface hierarchy (D0–D4), headings, component anatomy.
- **How.** Give each element a role: foundation, container, content, control or overlay. Express that role through position, surface level and edge treatment. Make the reading order match the structural order.
- **Avoid.** Decorative containers that group nothing. Surfaces raised only to look important. Hierarchy that exists only in color.

### 2. Essential Minimalism

> **Decision:** remove unnecessary visual noise; preserve useful information and functionality. · **Official**

- **Why.** Every visual element costs attention. CARBON spends attention only on what the user needs.
- **Where.** Every screen and component.
- **How.** Before adding an element, effect, color or animation, name the user problem it solves. Prefer spacing over dividers, tone over borders, and position over color. Keep information density appropriate to the platform: dense on desktop, relaxed on touch.
- **Avoid.** Minimalism that hides functionality (icon-only actions without labels or tooltips, hover-only controls, missing state). Removing information that users need is not minimalism.

### 3. Precision

> **Decision:** alignment, spacing, geometry and interaction behavior are consistent and exact. · **Official**

- **Why.** Precision is how CARBON signals quality and reliability, the digital equivalent of an engineered part.
- **Where.** The 4px spacing grid, the radius scale and nesting rules, type metrics, motion timing, state behavior.
- **How.** Use tokens, never ad-hoc values. Align optical edges. Keep concentric corners concentric. Give identical interactions identical timing everywhere.
- **Avoid.** "Close enough" values (a 15px gap, a 9px radius), one-off animations, controls that respond differently to the same input.

### 4. Resilience

> **Decision:** interfaces feel stable, predictable and reliable. · **Official**

- **Why.** Trust comes from interfaces that do not shift, flicker or surprise.
- **Where.** Layout stability, state transitions, error handling, degradation on weak platforms.
- **How.** Reserve space so content does not jump. Use motion to explain change, never to decorate it. Degrade gracefully: when shadows, blur or textures are unavailable, structure must still read through tone, edges and spacing. Make errors recoverable and clearly stated.
- **Avoid.** Layout shift on hover, elements that move away from the pointer, effects that disappear and take meaning with them.

### 5. Modularity

> **Decision:** components and design primitives are reusable and composable. · **Official**

- **Why.** A design language must scale across products and teams without fragmenting.
- **Where.** Tokens, surface classes, component anatomy, spacing roles.
- **How.** Compose new components from existing primitives: surface classes, controls, spacing roles and states. Add tokens only when an existing semantic token cannot express the intent.
- **Avoid.** Bespoke components that duplicate an existing pattern with different values.

### 6. Universality

> **Decision:** CARBON maintains one recognizable identity across platforms without forcing identical platform implementations. · **Official**

- **Why.** Users should recognize a CARBON product on any device, and it should still feel at home on that device.
- **Where.** Every platform adaptation (see [Platforms](platforms.md)).
- **How.** Keep the identity invariants (themes, monochrome brand, Rounded Minimalism, the Spatial Design System, type scale, spacing) and adapt the conventions (navigation patterns, fonts, input methods, window chrome, target sizes) to each platform.
- **Avoid.** Pixel-identical ports that ignore platform behavior, and platform ports that drop the CARBON identity.

### Identity invariants and adaptable conventions

| Invariant on every platform (identity) | Adapted per platform (convention) |
|---|---|
| Soft White and Soft Black palettes | System font family (Segoe UI Variable, SF Pro, Inter) |
| Monochrome brand, functional semantic color | Navigation pattern (sidebar, tab bar, rail) |
| Rounded Minimalism radius relationships | Window chrome, title bars, native menus |
| D0–D4 hierarchy and its cues | Shadow rendering technique and exact blur values |
| Hybrid Material and Ambient Lighting | Target sizes and density |
| Type scale proportions and 4px spacing | Keyboard shortcuts and modifier keys |
| State model and motion character | Haptics, scroll physics, system gestures |

## Supporting maxims

| Maxim | Meaning in practice |
|---|---|
| **Strength through Structure** | Make an element strong by its position, surface and edge, not by color, size or effects. |
| **Less but Better** | Ship fewer elements, each finished to a high standard. |
| **Consistency is Strength** | A rule applied everywhere beats a better rule applied once. |
| **Function Defines Form** | Shape, depth and motion follow what the element does. A control looks operable; a container looks like it holds things. |
| **Adaptability without Fragmentation** | Adapt to platforms through the documented conventions, never through new one-off styles. |

## Decision method

When the guide does not answer a question directly, decide in this order. Stop at the first step that settles it.

1. **Accessibility.** Does an option fail [WCAG 2.2 AA](accessibility.md)? Discard it.
2. **Official decisions.** Does an option contradict an **Official** decision or a defining characteristic? Discard it.
3. **Structure.** Which option makes the element's structural role clearest?
4. **Essentiality.** Which option removes the most noise without removing function?
5. **Consistency.** Which option reuses existing tokens, surface classes and patterns?
6. **Platform.** Which option fits the platform's conventions without breaking an identity invariant?
7. **Minimum depth.** If depth is involved, which option uses the *lowest* elevation that still communicates the hierarchy?

Record any new recurring decision as a **Proposed** rule in the relevant document and in the [changelog](../CHANGELOG.md).

---

Next: [Brand identity](brand-identity.md)
