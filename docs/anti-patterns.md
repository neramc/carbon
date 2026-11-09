[CARBON](../README.md) › Anti-patterns

# Anti-patterns

This page lists what CARBON avoids and **why** each pattern conflicts with its philosophy. Use it in design reviews and code reviews. Each entry names the principle it violates (see [Design philosophy](philosophy.md)) and the CARBON alternative.

## Color

### 1. Pure black as the default Dark theme background

- **Looks like:** `#000000` window backgrounds, or surfaces that are nearly black.
- **Why it conflicts:** pure black leaves no room below the surface for shadows and inset regions, so Pronounced Depth collapses; light text on pure black halates. It also makes CARBON read as "the black design language", which it is not. *Violates: Resilience, Physical Presence.*
- **Instead:** Soft Black: Background `#151719`, Surface `#1C1F21`, Surface Inset `#111315`.

### 2. Harsh pure white as the default Light theme background

- **Looks like:** `#FFFFFF` backgrounds and surfaces.
- **Why it conflicts:** maximum glare, harsh shadows and no headroom for elevated surfaces to be lighter than their surroundings. *Violates: Essential Minimalism (comfort), Ambient Continuity.*
- **Instead:** Soft White: Background `#F0EFEB`, Surface `#F8F7F4`, Surface Elevated `#FBFAF7`.

### 3. Excessive accent colors

- **Looks like:** a brand blue on buttons, links, focus rings, selection and charts; several accent hues per screen.
- **Why it conflicts:** CARBON's brand is monochrome. Accents compete with content and dilute the meaning of semantic color. *Violates: Essential Minimalism, Consistency is Strength.*
- **Instead:** ink emphasis (`color.surface-inverse`), structure and depth; semantic colors only for real state.

## Material and lighting

### 4. Excessive carbon-fiber textures

- **Looks like:** carbon-fiber weave on backgrounds, cards, buttons and headers.
- **Why it conflicts:** turns a material *reference* into a literal costume, adds noise behind content and reads as dated or industrial. *Violates: Essential Minimalism, Hybrid Material rules.*
- **Instead:** Soft Ceramic everywhere; Carbon Composite only on brand elements and selected structural surfaces, at most 15% of the view (see [Materials](spatial/materials.md#rules)).

### 5. Strong directional spotlights

- **Looks like:** radial highlights, shadows thrown sideways, surfaces lit from different directions.
- **Why it conflicts:** CARBON lighting is ambient and coherent. Spotlights create drama and hotspots and break the single light environment. *Violates: Ambient Continuity.*
- **Instead:** [Ambient Lighting](spatial/lighting.md): soft, overhead, offsetX = 0 for every shadow.

### 6. Unnecessary glossy surfaces

- **Looks like:** specular highlights, glassy buttons, chrome, reflections.
- **Why it conflicts:** CARBON materials are matte or softly reflective. Gloss reads as decorative and futuristic, and it lowers legibility. *Violates: Hybrid Material, brand personality.*
- **Instead:** the diffuse sheen of Soft Ceramic and the low-gloss finish of Carbon Composite.

### 7. Excessive glassmorphism

- **Looks like:** frosted, translucent, blurred surfaces for panels, cards or dialogs.
- **Why it conflicts:** translucent content surfaces reduce text contrast unpredictably, depend on expensive blur that varies by platform, and contradict opaque matte materials. *Violates: Resilience, Accessibility.*
- **Instead:** opaque Soft Ceramic surfaces. Platform translucency is acceptable only for platform-owned chrome and the D0 backdrop (see [Platforms](platforms.md#operating-systems)).

### 8. Excessive neumorphism

- **Looks like:** surfaces the same color as the background, extruded only by paired light and dark shadows; controls with no edges.
- **Why it conflicts:** neumorphism has almost no contrast, so controls lose their boundaries and states become invisible. It relies on shadows as the *only* cue. *Violates: Accessibility, "never communicate essential interaction states using shadows alone".*
- **Instead:** CARBON combines tone steps, structural edges, `color.border-aa` boundaries and restrained bevels with shadows.

### 9. Uncontrolled drop shadows

- **Looks like:** ad-hoc shadows with arbitrary blur, offset, color and opacity per component.
- **Why it conflicts:** inconsistent shadows destroy the illusion of one environment and make hierarchy unreadable. *Violates: Precision, Ambient Continuity.*
- **Instead:** only `depth.*`, `shadow.*` and the component tokens built from them.

### 10. Inconsistent lighting

- **Looks like:** highlights on the bottom edge of some components and the top of others; different shadow inks per component; colored glows.
- **Why it conflicts:** the eye detects lighting inconsistencies instantly; the interface stops looking physical. *Violates: Ambient Continuity.*
- **Instead:** highlights on top edges only, one shadow ink per theme, neutral light.

### 11. Unnecessary gradients

- **Looks like:** colorful gradients on buttons, headers or backgrounds; gradient text.
- **Why it conflicts:** gradients that do not come from the lighting model are decoration. *Violates: Essential Minimalism, Function Defines Form.*
- **Instead:** the only gradient in CARBON is the lighting-derived diffuse sheen (`light.diffuse`).

## Depth and composition

### 12. Every component floating independently

- **Looks like:** every card, section, toolbar and button on its own large shadow with wide gaps; floating sidebars and headers by default.
- **Why it conflicts:** the interface becomes an arbitrary collection of objects with no structure. It also wastes the depth hierarchy: when everything floats, nothing does. *Violates: Structural Integration, minimum necessary elevation.*
- **Instead:** [Integrated Space](spatial/composition.md): a shared foundation, consistent seams, resting surfaces, and floating only for overlays.

### 13. Raising surfaces to signal importance

- **Looks like:** a "featured" card at D3, a primary button that floats.
- **Why it conflicts:** elevation expresses spatial relationship, not importance. *Violates: Structural Integrity.*
- **Instead:** position, size, typography and ink emphasis.

## Geometry

### 14. Excessively rounded, pill-shaped elements

- **Looks like:** pill buttons, pill search fields, cards with very large radii.
- **Why it conflicts:** CARBON is Rounded Minimalism: clearly rounded, never pill-shaped. Excessive rounding reads as playful and wastes space. *Violates: Rounded Minimalism, Precision.*
- **Instead:** the radius scale and the [anti-pill rule](foundations/geometry.md#the-anti-pill-rule); `radius.full` only for inherently circular elements.

### 15. Inconsistent bevels

- **Looks like:** heavy bevels on some buttons and none on others; B3 on containers; metallic chamfers.
- **Why it conflicts:** inconsistent edges make components look like they come from different products; heavy bevels look machined and industrial. *Violates: Consistency is Strength, brand personality.*
- **Instead:** B1 for controls, B2 for prominent surfaces, B3 only for tactile grips and brand plates (see [Bevel system](spatial/elevation.md#bevel-system)).

## Motion and effects

### 16. Decorative effects that reduce readability

- **Looks like:** text over textures, glows behind headings, low-contrast text on translucent panels, shadows bleeding over text.
- **Why it conflicts:** content legibility outranks decoration. *Violates: Accessibility, Essential Minimalism.*
- **Instead:** text always sits on opaque, texture-free surfaces in contrast-verified colors.

### 17. Animations that interfere with interaction

- **Looks like:** bounce and overshoot, long transitions that delay input, hover animations that move targets away from the pointer, animated focus rings, idle motion.
- **Why it conflicts:** CARBON motion is precise and controlled, and it must never get in the user's way. *Violates: Resilience, Precision.*
- **Instead:** [Motion](interaction/motion.md): 90–240ms, no overshoot, interruptible, reduced-motion aware.

## Platform

### 18. Platform implementations that destroy the CARBON identity

- **Looks like:** adopting the platform's accent color, default cards and flat surfaces wholesale; dropping Soft White and Soft Black for system grays.
- **Why it conflicts:** the product stops being recognizable as CARBON. *Violates: Universality.*
- **Instead:** keep the [identity invariants](philosophy.md#identity-invariants-and-adaptable-conventions); adapt only the conventions.

### 19. Platform implementations that fight the platform

- **Looks like:** custom window controls in the wrong place, overridden system shortcuts, re-implemented text fields without IME support.
- **Why it conflicts:** users lose behaviors they rely on. *Violates: Universality, Adaptability without Fragmentation.*
- **Instead:** native behavior with CARBON styling (see [Platforms](platforms.md)).

## Quick review list

| ✗ Avoid | ✓ CARBON |
|---|---|
| `#000000` / `#FFFFFF` backgrounds | Soft Black / Soft White |
| Accent-colored buttons and focus | Ink emphasis, Text Primary focus ring |
| Texture everywhere | Soft Ceramic; Composite ≤ 15% |
| Spotlights, gloss, glass, neumorphism | Ambient Lighting, matte Hybrid Material, real edges |
| Ad-hoc shadows | `depth.*` tokens |
| Everything floating | Integrated Space with seams |
| Pills | Rounded Minimalism |
| Mixed bevels | B1 controls, B2 surfaces |
| Bouncy, slow motion | 90–240ms, no overshoot |
| State by color or shadow alone | At least two cues, one non-color |

---

Previous: [Design tokens](tokens.md) · Next: [Glossary](glossary.md)
