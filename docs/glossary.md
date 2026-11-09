[CARBON](../README.md) › Glossary

# Glossary

Canonical CARBON terminology. Use these terms exactly, with this capitalization, in design files, code, documentation and prompts for AI agents.

## Official names

| Term | Definition |
|---|---|
| **CARBON** | The design language: an original, general-purpose, cross-platform design language inspired by the properties of carbon fiber. |
| **Structural Minimalism** | CARBON's design philosophy: minimal presentation with structurally rich surfaces. Combined with Soft Geometry: *Structural Minimalism + Soft Geometry*. |
| **Rounded Minimalism** | CARBON's geometry: clearly rounded, never excessively pill-shaped. |
| **Soft White** | The Light theme: soft, neutral whites with restrained warmth. |
| **Soft Black** | The Dark theme: deep, comfortable charcoal. |
| **Spatial Design System** | CARBON's system of depth, material, lighting and composition. Current version: 1.0. |
| **Pronounced Depth** | The depth intensity: clearly perceptible at a glance, yet restrained. |
| **Hybrid Material** | The material system that combines Soft Ceramic and Carbon Composite. |
| **Soft Ceramic** | The primary, general-purpose surface material: smooth, matte, diffuse. |
| **Carbon Composite** | The structural accent material: subtle twill microtexture, low gloss, refined edges. |
| **Ambient Lighting** | The lighting model: one soft, coherent environment, without spotlights. |
| **Integrated Space** | The composition model: surfaces form one continuous environment. |

## Spatial terms

| Term | Definition |
|---|---|
| Depth level | One of D0–D4. |
| D0 Foundation | The application background; the plane all depth refers to. |
| D1 Integrated | Base surfaces and integrated regions resting on the foundation. |
| D2 Raised | Cards and primary content panels. |
| D3 Floating | Detached transient surfaces: toolbars over content, popovers, dropdowns. |
| D4 Elevated | Dialogs and top-level overlays. Not to be confused with the *Surface Elevated* color, which D3 and D4 both use. |
| Resting surface | A D1 or D2 surface. It sits on the plane and shows a contact shadow. |
| Floating surface | A D3 or D4 surface. It is detached from the plane and shows a separation shadow. |
| Inset region | A recess carved into a surface (input well, track). Not a depth level. |
| Surface class | The composite token group (`surface.*`) of fill, edge and shadow for a level. |
| Contact shadow | The tight occlusion where a resting surface meets the plane. |
| Ambient shadow | The broad, soft occlusion around a raised body. |
| Separation shadow | The shadow of a floating surface: a penumbra plus a wide key layer, with no contact line. |
| Key layer / near layer | The two layers of each depth stack: the main soft shadow, and the contact or penumbra layer. |
| Bevel (B0–B3) | Inner edge treatment that reveals curvature: flat, subtle edge, soft bevel, clearly perceptible curved transition. |
| Edge highlight | The 1px line of light on a surface's top edge. |
| Sheen | The diffuse top-to-bottom shading of Soft Ceramic surfaces. |
| Structural edge | The 1px Border outline of raised surfaces and controls. |
| Seam | The consistent gap between integrated surfaces through which the foundation shows. |
| Depth budget | At most three stacked spatial layers per region (D0 → D1 → D2), plus inset regions and transient overlays. |
| Raised selection tile | The Surface Elevated, B1, D1 tile that marks a selected item. |
| Scroll-under | The contact shadow a sticky header gains while content scrolls beneath it. |
| Lift | The small vertical translation of controls on hover (−1px) and press (+1px). |

## Color terms

| Term | Definition |
|---|---|
| Ink | Text Primary used as an emphasis fill (`color.surface-inverse`). |
| Monochrome brand | The rule that brand emphasis uses ink and structure, never an accent hue. |
| Semantic color | Success, Warning, Error or Information: functional color for real state only. |
| `-aa` variant | A proposed token guaranteed to meet WCAG AA for its role on every surface of its theme. |
| State layer | A translucent ink overlay (`color.fill-hover`, `color.fill-pressed`) composited over a surface. |
| Tone | CIELAB lightness L*. Primitive palette keys are tone × 10. |
| Theme parity | The rule that both themes define exactly the same tokens. |

## Documentation terms

| Term | Definition |
|---|---|
| Official | An established decision. Changing it is a major version. |
| Reference | An initial reference value that platforms may tune within the documented range. |
| Proposed | A conservative proposal made by this guide to complete the system; the current rule until ratified. |
| Platform note | Implementation guidance for a specific platform or technology. |
| Future | Under consideration; not for use. |
| Identity invariant | A property that is the same on every platform. |
| Adaptable convention | A property that follows the platform. |
| Resolution set | The token files resolved together for one theme: primitive + semantic + theme + component. |
| Window size class | Compact, Medium, Expanded or Large, by window width. |

## Terms to avoid

| Avoid | Use |
|---|---|
| "Carbon dark mode" as a name for the language | CARBON (with Soft White and Soft Black themes) |
| "Light mode" / "Dark mode" as theme names in specifications | Soft White / Soft Black (Light / Dark in parentheses where helpful) |
| "Drop shadow" for CARBON depth | Depth level, contact shadow, ambient shadow, separation shadow |
| "Glass", "frosted" | Not part of CARBON |
| "Accent color" | Ink; semantic color |
| "Card" for any container | Card (content object), panel (working region), surface (generic) |

---

Previous: [Anti-patterns](anti-patterns.md) · Back to the [README](../README.md)
