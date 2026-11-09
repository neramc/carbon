[CARBON](../README.md) › Platforms

# Platforms

> **Decision:** CARBON is Desktop-first but platform-independent. It preserves its visual identity without unnecessarily fighting platform conventions. · **Official**

The [identity invariants and adaptable conventions](philosophy.md#identity-invariants-and-adaptable-conventions) define what must stay the same and what may change. This document applies that split to each platform.

**Do not assume** identical shadow rendering, font rendering, blur performance or native control behavior across platforms. Verify CARBON on each target platform, with real devices and system settings (scaling, contrast, reduced motion, dark mode), not only in design tools.

## Desktop

Desktop is CARBON's flagship environment.

| Topic | Guidance |
|---|---|
| Information density | Default density with 32px controls; compact density (24–28px controls) for data-heavy professional tools. Text size never shrinks with density. |
| Window layouts | The [default desktop composition](spatial/composition.md#default-desktop-composition): a sidebar on the D0 foundation, D1 working regions inset by seams, an optional inspector. Panels resize continuously and keep minimum widths. |
| Sidebars | Expanded at 240px, collapsible to a 64px rail; the user's width and collapse state persist per window. |
| Toolbars | Attached to panel or window headers; floating (D3) only over canvases or content. |
| Hover interactions | Hover elevation and tooltips are available and encouraged, but never required (see [States](interaction/states.md#input-without-hover)). |
| Keyboard shortcuts | Every frequent command has a shortcut, displayed in menus and tooltips. Use the platform modifier: Ctrl on Windows and Linux, ⌘ on macOS. Never override system shortcuts. |
| Multi-window behavior | Each window has its own navigation state and its own selection. The active window has full-contrast chrome; inactive windows may lower their chrome to Text Secondary (follow the OS). Dialogs are window-modal, not application-modal, where the platform allows. |
| Context menus | Available on secondary click wherever an object has actions. |
| Drag and drop | Dragged objects rise to D3; drop targets show an inset highlight; every drag has a non-drag alternative. |

## Web

| Topic | Guidance |
|---|---|
| Responsive layouts | Layouts respond to [window size classes](foundations/spacing.md#responsive-layout) with container-aware components. Never detect the device type to choose a layout. |
| CSS-based surfaces | The optional [CSS adapter](../adapters/css/carbon-tokens.css) exposes every token as a custom property. Surfaces combine `background` (fill + sheen), `border` (edge), `border-radius` and `box-shadow` (bevel + depth). |
| Theme | Follow `prefers-color-scheme` by default; allow an explicit choice through `data-carbon-theme="light"` or `"dark"`; declare `color-scheme` so native form controls and scrollbars match. |
| Browser rendering differences | Shadows are consistent across modern engines, but large blur radii are expensive in some. Font rendering follows the OS (see [Typography](foundations/typography.md#platform-rendering)). `backdrop-filter` performance varies widely: CARBON does not depend on it. |
| Responsive component behavior | Popovers become bottom sheets at the compact size class; sidebars become rails, then drawers or bottom navigation; toolbars overflow into menus; dialogs become sheets or full pages. |
| Focus | Use `:focus-visible` and `outline` for the focus ring. |
| Forced colors | Test in Windows Contrast Themes. Surfaces keep their 1px borders; avoid `forced-color-adjust: none`. |
| Performance | Avoid animating `box-shadow` and `filter`; crossfade pre-rendered shadow layers instead. Self-host and preload Inter. |

## Mobile

| Topic | Guidance |
|---|---|
| Touch interaction | Press feedback on touch down; no hover-dependent features; tooltips on long press; swipe actions always have a visible alternative. |
| Safe areas | Content and controls stay inside safe areas (notches, home indicators, rounded corners). Backgrounds and integrated bars extend under them with the same fill. |
| Reduced visual density | Comfortable density: 44px controls (48dp on Android), 12px seams, 16px layout margins, larger list rows. |
| Touch target sizing | 44 × 44px (iOS) and 48 × 48dp (Android) minimum, extended by padding beyond the visible shape. |
| Navigation adaptation | Bottom navigation for 3–5 destinations; a navigation stack for hierarchy; sheets for secondary tools (see [Navigation](components/navigation.md#mobile-navigation)). |
| Limited hover | Never hide actions behind hover. The resting depth of controls is the affordance. |
| Spatial expression | Keep the full depth hierarchy, but on small screens favor D1 integrated sections over many separate D2 cards. Bottom sheets are D4 with 20px top corners. |
| Haptics | · **Proposed.** Light haptic feedback on switches, selection changes and drop. No haptics on scroll or hover equivalents. Respect system haptic settings. |

### iOS and iPadOS

· **Platform note.** Use SF Pro through the system font with Dynamic Type. Use native navigation (stack navigation, tab bars, sheets) styled with CARBON colors, radii and depth. Do not adopt the system accent color for interactive states. Monochrome ink remains the emphasis. Where the system applies translucent materials to its own chrome (navigation and tab bars), accept them for system chrome; keep content surfaces opaque Soft Ceramic.

### Android

· **Platform note.** Bundle Inter and use `sp` for text sizes. Support predictive back and edge-to-edge layouts. Do not adopt wallpaper-derived dynamic color for CARBON surfaces or interactive states; the monochrome identity takes precedence. Map D1–D4 to elevation as described in [Elevation](spatial/elevation.md#platform-rendering), with theme-ink shadow colors.

## Tablets

| Topic | Guidance |
|---|---|
| Hybrid touch and pointer interaction | Support touch, trackpad or mouse, and keyboard at the same time. Show hover states when a pointer is present; keep 44px targets whenever touch is possible. |
| Adaptive navigation | Compact (split-screen narrow) uses bottom navigation; medium uses a rail; expanded uses a sidebar. Navigation follows the *window* size, not the device. |
| Expanded layouts | Two- and three-pane layouts like desktop, with comfortable seams (12px). Inspectors become sheets in portrait and panels in landscape. |
| Keyboard | Support hardware keyboard shortcuts, with the same shortcuts as desktop. |
| Multitasking | Layouts adapt continuously to split view and slide-over sizes. |

## Operating systems

Practical guidance for CARBON on the three desktop operating systems. · **Platform note**

| Topic | Windows | macOS | Linux |
|---|---|---|---|
| UI font | Segoe UI Variable (optical sizes) | SF Pro (system font) | Inter (bundled) |
| Window chrome | Custom title bar integrated with the D0 foundation; system caption buttons (minimize, maximize, close) at the trailing edge; Snap Layouts supported on the maximize button | Integrated title bar and toolbar; traffic-light buttons at the leading edge; full-screen and Stage Manager supported | Client-side decorations following the desktop environment's button layout (GNOME and KDE differ); support server-side decorations when the user's system requires them |
| Window corners | System-defined radius | System-defined radius | Compositor-dependent; square when not supported |
| System materials | Mica or Mica Alt may serve as the D0 foundation backdrop where available; content surfaces stay opaque | Window and sidebar vibrancy may be used for the D0 foundation only; content surfaces stay opaque | Opaque D0 foundation |
| Shadows | Composition shadows; validate at 100–200% scaling | Native layer shadows; validate on built-in and external displays | Draw in-app; fall back to edges and tone without a compositor |
| Dialog button order | Primary action leading (left) | Primary action trailing (right); Cancel to its left | Follow the desktop environment (GNOME: primary trailing; Qt applications follow the platform button layout) |
| Theme source | Windows app mode (light or dark) | macOS appearance | The `color-scheme` setting of the XDG desktop portal, falling back to the toolkit theme |
| Reduced motion | "Animation effects" setting | Reduce Motion | Desktop-environment animation settings |
| High contrast | Contrast Themes (forced colors) | Increase Contrast | High-contrast desktop themes |
| Shortcut modifier | Ctrl | ⌘ (Command) | Ctrl |
| Scaling | 100–300%; per-monitor DPI awareness required | 1× and 2× backing scale; "scaled" display modes render at 2× and downsample | Integer and fractional; test at 125% and 150% |

**Consistent identity, native behavior.** On every OS, keep the Soft White and Soft Black palettes, monochrome emphasis, Rounded Minimalism, D0–D4 and Integrated Space. Adopt the OS's window controls, menu placement (the macOS menu bar; in-window menus on Windows and Linux), dialog button order, shortcut modifiers, scroll behavior and accessibility services.

## Implementation technologies

CARBON does not depend on any UI framework. The same tokens map to any technology. These mappings are illustrative. · **Platform note**

| Technology family | Tokens become | Surfaces | Depth |
|---|---|---|---|
| CSS (Web, Electron, Tauri, webviews) | Custom properties from the CSS adapter | `background`, `border`, `border-radius` | `box-shadow` stacks |
| Native desktop frameworks (WinUI, AppKit, GTK, Qt) | Theme resource dictionaries, asset catalogs, style sheets | Native containers with corner radius and border | Native shadow APIs, or drawn shadows |
| Cross-platform frameworks (Flutter, .NET MAUI, Avalonia, Compose Multiplatform) | Theme objects generated from the token JSON | Decorated containers | Layered box shadows or elevation |
| Mobile frameworks (SwiftUI, UIKit, Jetpack Compose, Android Views) | Color sets with light and dark appearances; dimension resources | Shapes with corner radius and stroke | Layer shadows or elevation with shadow colors |

Generate platform resources from `tokens/*.tokens.json`. Never re-type values by hand (see [Design tokens](tokens.md)).

## Anti-patterns on platforms

- **Destroying the identity:** adopting the platform accent color for buttons and selection, or flattening D0–D4 into platform default cards.
- **Fighting the platform:** custom window controls in non-standard positions, overridden system shortcuts, re-implemented text input.
- **Assuming one renderer:** shadows tuned on one OS and shipped unchanged everywhere.

---

Previous: [Accessibility](accessibility.md) · Next: [Design tokens](tokens.md)
