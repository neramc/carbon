# CARBON design tokens

The authoritative, platform-neutral source of every CARBON design value, in the [W3C Design Tokens Community Group format](https://www.designtokens.org/) (version 2025.10).

| File | Layer | Contents |
|---|---|---|
| `primitive.tokens.json` | Primitive | Raw values: palettes, space, radius, fonts, durations, easing, elevation geometry |
| `semantic.tokens.json` | Semantic (theme-agnostic) | Type styles, spacing roles, radius roles, sizes, motion, bevels, surface classes, material parameters, layers, layout |
| `themes/light.tokens.json` | Semantic: Soft White | Colors, lighting, shadows, depth, material colors |
| `themes/dark.tokens.json` | Semantic: Soft Black | The same paths with Soft Black values |
| `component.tokens.json` | Component | Component decisions expressed through semantic tokens |

To resolve one theme, load **primitive + semantic + one theme file + component**.

## Rules

- Products consume **semantic** and **component** tokens, never primitives.
- Both theme files must define exactly the same paths (theme parity).
- Every value that is not official carries `$extensions.carbon.status`: `reference` or `proposed`. A status on a group applies to all tokens in it.
- Color values use the DTCG object form; `hex` must match `components`.
- After any change, regenerate adapters and validate:

```bash
node tools/carbon-tokens.mjs build
```

```bash
node tools/carbon-tokens.mjs check
```

Full documentation: [docs/tokens.md](../docs/tokens.md).
