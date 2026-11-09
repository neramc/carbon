[CARBON](../../README.md) › Interaction › Motion

# Motion

> **Decision:** CARBON motion is precise, controlled and physically plausible. It reinforces spatial relationships and never distracts from content. Exaggerated bouncing and unnecessary animation are not part of CARBON. Operating-system reduced-motion preferences are always respected. · **Official**

## Principles

1. **Motion explains space.** Every animation answers a spatial question: where did this come from, where did it go, what is above what?
2. **Short and decisive.** UI motion completes in 90–240ms. Users should never wait for an animation.
3. **Physically plausible.** Surfaces accelerate and decelerate like light, rigid objects. They do not stretch, wobble or overshoot.
4. **Interruptible.** Any animation can be interrupted and reversed from its current state. Input is never blocked by motion.
5. **Optional.** Every piece of information conveyed by motion is also conveyed by the end state.

## Durations

> **Decision:** initial motion references. · **Reference**

| Interaction | Duration | Token |
|---|---:|---|
| Hover | 160ms | `motion.hover` |
| Press | 90ms | `motion.press` |
| Selection | 180ms | `motion.selection` |
| Elevation | 200ms | `motion.elevation` |
| Surface transition | 220ms | `motion.surface` |
| Overlay | 240ms | `motion.overlay-enter` |

Additional durations · **Proposed**:

| Interaction | Duration | Token | Rationale |
|---|---:|---|---|
| Overlay exit | 180ms | `motion.overlay-exit` | Exits are about 75% of entrances: leaving should not delay the next action. |
| Focus indication | 0ms | `motion.focus` | Focus must be visible the instant it moves. |

Durations do not scale with distance for standard UI. Full-screen transitions on mobile follow the platform's navigation timing.

## Easing

· **Proposed.** No CARBON curve leaves the 0–1 range, so nothing overshoots or bounces.

| Token | Curve | Character | Use |
|---|---|---|---|
| `easing.standard` | `cubic-bezier(0.2, 0, 0, 1)` | Quick start, long, precise settle | In-place changes: hover, press, selection, elevation, surface |
| `easing.enter` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerate | Elements arriving: overlays, revealed content |
| `easing.exit` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerate | Elements leaving |
| `easing.linear` | `cubic-bezier(0, 0, 1, 1)` | Constant | Progress indicators and pure opacity crossfades |

Every `motion.*` token is a complete transition (duration, easing, delay 0) and can be used directly, for example `transition: box-shadow var(--carbon-motion-elevation)`.

## Spatial transitions

### Elevation changes

| Change | Animated properties | Token |
|---|---|---|
| Hover lift (controls) | Shadow and −1px translate | `motion.hover` |
| Hover elevation (interactive cards) | Shadow only | `motion.elevation` |
| Press | Shadow to contact only, +1px translate | `motion.press` |
| Drag lift (D2 → D3) | Shadow; optional scale to 1.01 | `motion.elevation` |
| Drop (D3 → D2) | Shadow, scale back | `motion.elevation` |

**Implementation note.** Animating multi-layer shadows directly is expensive on many renderers. Pre-render the target shadow on a separate layer and crossfade its opacity, or animate the platform's native elevation property. · **Platform note**

### Surface transitions

| Change | Behavior | Token |
|---|---|---|
| Panel resize, collapse, expand | Neighbors resize continuously; seams stay constant; content does not scale | `motion.surface` |
| Tone change (enable/disable, theme-independent state) | Crossfade of fill and edge colors | `motion.surface` |
| Selection tile moving between items | The tile slides from the old item to the new one | `motion.selection` |
| Content switching (tabs) | Crossfade between panels; no sideways sliding by default | `motion.surface` |
| Theme switch (Soft White ↔ Soft Black) | Instant, or a single crossfade of the whole window. Never animate tokens individually. | `motion.surface` |

### Entrance and exit

| Element | Enter | Exit |
|---|---|---|
| Menu, dropdown, popover | Fade in and move 4px from the anchor direction (`motion.overlay-enter`) | Fade out (`motion.overlay-exit`) |
| Tooltip | Fade in after a 500ms hover delay; immediately on focus | Fade out |
| Dialog | Scrim fades in; dialog fades in and scales from 0.98 to 1 | Fade out, no scale |
| Bottom sheet | Slides up from the bottom edge (platform timing) | Slides down |
| Inline revealed content | Height expands with `motion.surface`; content fades in after the space opens | Content fades, then height collapses |
| Toast | Fade in and move 8px from its edge | Fade out |

Elements enter **from where they come from** (their anchor or screen edge) and exit without travel. Nothing enters from an unrelated direction.

### Focus transitions

The focus ring appears and moves **instantly**. Do not fade, slide or delay it: users navigating by keyboard rely on knowing exactly where focus is at every moment.

## Reduced motion

> **Rule:** when the operating system or browser requests reduced motion, CARBON removes movement and keeps meaning. · **Official**

| Normal | Reduced motion |
|---|---|
| Hover lift and press translation | No movement (`lift.*` = 0); shadow and state-layer changes remain |
| Overlay movement and scale | Fade only, at most 120ms, or instant |
| Selection tile sliding | Instant change |
| Panel expand and collapse | Instant, or a crossfade of at most 120ms |
| Drag lift scale | No scale; shadow change only |
| Page and sheet transitions | Crossfade or instant |
| Progress and loading indicators | Keep, since they convey status, but use the slowest variant available |

Preferences to respect: `prefers-reduced-motion` (Web), Reduce Motion (macOS, iOS), "Animation effects" off (Windows), "Remove animations" (Android), and the desktop environment's animation settings on Linux. The CSS adapter already sets `lift.hover` and `lift.pressed` to 0 under `prefers-reduced-motion: reduce`.

## Performance

1. Animate transforms and opacity. Avoid animating layout (width, height, top), blur radii and multi-layer shadows directly.
2. Hold 60 frames per second (or the display's refresh rate). If a device cannot, remove the animation rather than letting it stutter.
3. Never animate on idle: no ambient pulsing, breathing shadows or animated textures.
4. Do not chain animations into sequences longer than the longest single duration (240ms).

## Avoid

| Avoid | Why |
|---|---|
| Bounce, overshoot, elastic and spring curves with visible oscillation | Exaggerated and playful; contradicts precision |
| Animations longer than 300ms for standard UI | Users wait for the interface |
| Motion on idle | Distracts from content |
| Parallax and scroll-linked decoration | Decorative; triggers motion sensitivity |
| Animating focus | Hides where focus is |
| Content that slides sideways when switching tabs | Implies spatial movement that does not exist |
| Scaling text | Blurs text and causes reflow |

---

Previous: [States](states.md) · Next: [Accessibility](../accessibility.md)
