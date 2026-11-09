[CARBON](../../README.md) › Spatial Design System › Lighting

# Lighting

> **Decision:** CARBON uses **Ambient Lighting**: one soft, coherent light environment for the entire interface. · **Official**

Lighting is what makes depth believable. In CARBON, light is a property of the *environment*, not of individual components. Every shadow, bevel and sheen is a consequence of the same light.

## The light environment

· **Proposed** (geometry of the environment)

| Property | Definition |
|---|---|
| Source | A large, diffuse, overhead environment, like an overcast sky or a softly lit studio ceiling |
| Direction | Broadly from above and slightly in front of the screen plane. Shadows fall **downward**, never sideways. Horizontal shadow offset is always 0. |
| Intensity | Constant across the interface; it does not change by component, region or state |
| Color | Neutral. Soft White shadows use the warm-neutral ink `#292927`; Soft Black shadows use the deep charcoal ink `#060708`. Highlights are neutral white (Soft White) or `#ECECE8` (Soft Black). |
| Consequence | Higher surfaces receive more light and are lighter; recessed surfaces receive less and are darker (see [Colors](../foundations/colors.md#the-tonal-logic-of-both-palettes)). |

## Lighting concepts

### Ambient Light

The base illumination that reaches every surface from all directions.

- **Visual effect.** Sets the overall tone of each surface level. Floating surfaces sit closer to the light and read lighter.
- **Token.** `light.ambient`: the lit tint at the top of a surface (Soft White: white at 40%; Soft Black: `#ECECE8` at 4%).
- **Rule.** Ambient light never creates hard edges or hotspots.

### Diffuse Light

Soft, directional-but-wide light that reveals the curvature of a surface.

- **Visual effect.** A subtle gradient across a Soft Ceramic surface: lit top, neutral middle, gently shaded bottom. This is how surfaces appear to have volume rather than being flat paper.
- **Token.** `light.diffuse`: a three-stop gradient from `light.ambient` (0%) to transparent (50%) to a faint shade (100%: Soft White ink at 2.5%, Soft Black ink at 12%).
- **Rule.** The diffuse gradient always runs top to bottom (180°) and is never stronger than the token. It is omitted on the foundation and on inset regions.

### Contact Occlusion

The darkening where light is blocked: where a surface touches the plane beneath it, and inside recesses.

- **Visual effect.** The thin, darker shadow directly under a resting surface (`shadow.contact`), and the inner shade at the top of an input well (`shadow.inset`) or at the lower inner edge of a bevel (`light.occlusion`).
- **Tokens.** `shadow.contact`, `shadow.inset`, `light.occlusion`.
- **Rule.** Contact occlusion exists only where surfaces touch. Floating surfaces (D3–D4) do not touch the plane, so they show a soft near-shadow (penumbra) instead of a sharp contact line.

### Edge Highlight

The thin line of light caught by the upper edge of a rounded surface.

- **Visual effect.** A 1px inner highlight along the top edge that tells the eye the edge is curved and catches light.
- **Tokens.** `light.edge` (on surface fills: Soft White white at 72%, Soft Black `#ECECE8` at 7%) and `light.edge-inverse` (on ink fills: Soft White white at 14%, Soft Black white at 55%).
- **Rule.** Edge highlights are restrained. They are always on top edges, never on all four sides, and never glow.

## Lighting rules

> **Decision:** · **Official**
>
> 1. Lighting must remain consistent throughout the interface.
> 2. Use soft ambient illumination rather than harsh directional spotlights.
> 3. Surface contact should create natural contact shadows.
> 4. Curved surfaces should reveal their geometry through subtle shading.
> 5. Edge highlights should remain restrained.
> 6. Avoid excessive glossy reflections.
> 7. Do not use shadows as the only means of expressing hierarchy.

How CARBON implements each rule:

| Rule | Implementation |
|---|---|
| 1. Consistency | All shadows use offsetX = 0 and offsets proportional to elevation; all highlights are top edges; one ink color per theme. |
| 2. Soft illumination | Large blur radii relative to offsets (blur ≥ 2 × offset in every layer; ≥ 3 × in every layer except the 1px contact line); no radial or spot gradients. |
| 3. Contact shadows | `shadow.contact` is part of every resting depth (D1, D2) and of the pressed state. |
| 4. Curvature | `light.diffuse` sheen and bevels B1–B3. |
| 5. Restrained highlights | Highlight tokens are low-alpha and 1px. |
| 6. No gloss | No specular hotspots, no reflections, no glass refraction. Maximum sheen is the diffuse gradient. |
| 7. Not shadow-only | Every level also differs in tone, edge or bevel (see [How the cues combine](elevation.md#how-the-cues-combine)). |

## Theme-specific lighting

### Soft White

- Soft gray contact shadows and gentle ambient shading using the warm-neutral ink `#292927`.
- Shadows carry most of the depth, because adjacent light surfaces differ little in tone (Surface ↔ Surface Elevated is 1.02:1).
- Edge highlights are near-invisible on the lightest surfaces and become visible on Surface Secondary, inset tones and ink-filled controls.

### Soft Black

- Subtle charcoal shadows using the deep ink `#060708`, at twice the Soft White opacity (shadows lose contrast against dark surfaces).
- **Visible surface separation** comes mainly from tone (each level is lighter: 7.6 → 11.5 → 18.2 L*) and from the edge highlight.
- Restrained highlights: at 7%, the edge highlight reads as a crisp lit rim, not a glow.

## Avoid

| Avoid | Why |
|---|---|
| Shadows offset sideways or in different directions per component | Breaks the single light environment |
| Colored shadows or glows (including semantic-colored glows) | Light is neutral; color is reserved for state |
| Inner glows, outer glows, neon | Glossy and futuristic; contradicts the brand personality |
| Specular hotspots, glass reflections, chrome | Contradicts matte materials |
| Lighting effects that animate on idle | Distracting; motion must reinforce interaction only |
| Darkening hierarchy with shadows alone | Inaccessible and fragile across renderers |

---

Previous: [Materials](materials.md) · Next: [Elevation](elevation.md)
