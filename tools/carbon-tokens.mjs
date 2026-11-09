#!/usr/bin/env node
// CARBON token tool. Zero dependencies; requires Node.js 18 or later.
//
//   node tools/carbon-tokens.mjs check      Validate tokens, accessibility guarantees, docs and links
//   node tools/carbon-tokens.mjs build      Regenerate the optional CSS adapter from the token source
//   node tools/carbon-tokens.mjs contrast   Print WCAG contrast tables (Markdown) for both themes
//
// The JSON files in tokens/ are the single source of truth. Everything this tool
// writes is derived from them and must never be edited by hand.

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { dirname, join, relative, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCES = {
  primitive: 'tokens/primitive.tokens.json',
  semantic: 'tokens/semantic.tokens.json',
  component: 'tokens/component.tokens.json',
  themes: { light: 'tokens/themes/light.tokens.json', dark: 'tokens/themes/dark.tokens.json' },
};
const CSS_OUT = 'adapters/css/carbon-tokens.css';
const PREFIX = 'carbon';
const STATUSES = new Set(['official', 'reference', 'proposed']);
const SURFACES = ['background', 'surface', 'surface-secondary', 'surface-elevated', 'surface-inset'];
const REF = /^\{([^{}]+)\}$/;

// ------------------------------------------------------------------ loading

function readJson(rel) {
  return JSON.parse(readFileSync(join(ROOT, rel), 'utf8'));
}

function flatten(node, file, out, path = [], type, status = 'official') {
  const t = node.$type ?? type;
  const s = node.$extensions?.carbon?.status ?? status;
  if ('$value' in node) {
    const id = path.join('.');
    if (out.has(id)) throw new Error(`Duplicate token "${id}" in ${file} and ${out.get(id).file}`);
    out.set(id, { id, path, value: node.$value, type: t, status: s, ext: node.$extensions?.carbon ?? {}, file });
    return out;
  }
  const keys = Object.keys(node).filter((k) => !k.startsWith('$'));
  // JS reorders integer-like keys; sort all-numeric siblings (tone ramps, scales) explicitly.
  if (keys.every((k) => /^\d+$/.test(k))) keys.sort((a, b) => Number(a) - Number(b));
  for (const key of keys) {
    const child = node[key];
    if (!child || typeof child !== 'object' || Array.isArray(child)) {
      throw new Error(`${file}: "${[...path, key].join('.')}" is neither a token nor a group`);
    }
    flatten(child, file, out, [...path, key], t, s);
  }
  return out;
}

function loadSet(theme) {
  const set = new Map();
  for (const rel of [SOURCES.primitive, SOURCES.semantic, SOURCES.themes[theme], SOURCES.component]) {
    flatten(readJson(rel), rel, set);
  }
  return set;
}

// ------------------------------------------------------------------ resolution

function refTarget(v) {
  const m = typeof v === 'string' && v.match(REF);
  return m ? m[1] : null;
}

function resolveValue(value, set, stack = []) {
  const target = refTarget(value);
  if (target) {
    if (stack.includes(target)) throw new Error(`Reference cycle: ${[...stack, target].join(' -> ')}`);
    const tok = set.get(target);
    if (!tok) throw new Error(`Unresolved reference {${target}}${stack.length ? ` (from ${stack[stack.length - 1]})` : ''}`);
    return resolveValue(tok.value, set, [...stack, target]);
  }
  if (Array.isArray(value)) return value.flatMap((v) => {
    const r = resolveValue(v, set, stack);
    return Array.isArray(r) && refTarget(v) ? r : [r];
  });
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolveValue(v, set, stack)]));
  }
  return value;
}

// ------------------------------------------------------------------ color math

function rgbOf(c) {
  return c.hex ? [1, 3, 5].map((i) => parseInt(c.hex.slice(i, i + 2), 16) / 255) : c.components;
}
function luminance(c) {
  const [r, g, b] = rgbOf(c).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
function lstar(c) {
  const y = luminance(c);
  return y > 216 / 24389 ? 116 * Math.cbrt(y) - 16 : (y * 24389) / 27;
}
const floor2 = (n) => Math.floor(n * 100) / 100; // never round a failing ratio up to a pass

// ------------------------------------------------------------------ validation of value shapes

const isDim = (v) => v && typeof v === 'object' && typeof v.value === 'number' && ['px', 'rem'].includes(v.unit);
const isDur = (v) => v && typeof v === 'object' && typeof v.value === 'number' && ['ms', 's'].includes(v.unit);
const isColor = (v) => v && typeof v === 'object' && v.colorSpace === 'srgb' && Array.isArray(v.components) && v.components.length === 3;

function checkShape(tok, errors) {
  const where = `${tok.file}: ${tok.id}`;
  const ok = (cond, msg) => { if (!cond) errors.push(`${where}: ${msg}`); };
  const sub = (v, test, name) => refTarget(v) || ok(test(v), `invalid ${name}`);
  const v = tok.value;
  if (!tok.type) return ok(false, 'missing $type (on the token or an ancestor group)');
  ok(STATUSES.has(tok.status), `unknown status "${tok.status}"`);
  if (refTarget(v)) return;
  switch (tok.type) {
    case 'color':
      ok(isColor(v), 'color must be an sRGB color object');
      if (isColor(v) && v.hex) {
        const fromHex = rgbOf({ hex: v.hex });
        ok(v.components.every((c, i) => Math.abs(c - fromHex[i]) * 255 <= 0.5), `components do not match hex ${v.hex}`);
      }
      break;
    case 'dimension': ok(isDim(v), 'dimension must be {value, unit: px|rem}'); break;
    case 'duration': ok(isDur(v), 'duration must be {value, unit: ms|s}'); break;
    case 'number': ok(typeof v === 'number', 'number expected'); break;
    case 'fontWeight': ok(typeof v === 'number' && v >= 1 && v <= 1000, 'fontWeight must be 1–1000'); break;
    case 'fontFamily': ok(typeof v === 'string' || (Array.isArray(v) && v.every((s) => typeof s === 'string')), 'fontFamily must be a string or string[]'); break;
    case 'cubicBezier': ok(Array.isArray(v) && v.length === 4 && v[0] >= 0 && v[0] <= 1 && v[2] >= 0 && v[2] <= 1, 'cubicBezier must be [x1,y1,x2,y2] with x in 0–1'); break;
    case 'shadow':
      for (const layer of Array.isArray(v) ? v : [v]) {
        if (refTarget(layer)) continue;
        sub(layer.color, isColor, 'shadow color');
        for (const k of ['offsetX', 'offsetY', 'blur', 'spread']) sub(layer[k], isDim, `shadow ${k}`);
      }
      break;
    case 'gradient':
      ok(Array.isArray(v), 'gradient must be an array of stops');
      for (const stop of v) { sub(stop.color, isColor, 'gradient stop color'); ok(typeof stop.position === 'number', 'gradient stop position'); }
      break;
    case 'typography':
      for (const k of ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing']) ok(k in v, `typography missing ${k}`);
      sub(v.fontSize, isDim, 'fontSize'); sub(v.letterSpacing, isDim, 'letterSpacing');
      ok(typeof v.lineHeight === 'number', 'lineHeight must be a number');
      break;
    case 'transition':
      sub(v.duration, isDur, 'duration'); sub(v.delay, isDur, 'delay');
      ok(refTarget(v.timingFunction) || Array.isArray(v.timingFunction), 'timingFunction');
      break;
    default: ok(false, `unsupported $type "${tok.type}"`);
  }
}

// ------------------------------------------------------------------ CSS adapter

const varName = (id) => `--${PREFIX}-${id.replace(/\./g, '-')}`;
const fmtNum = (n) => String(Math.round(n * 10000) / 10000);

function cssColor(c) {
  if (refTarget(c)) return `var(${varName(refTarget(c))})`;
  const rgb = rgbOf(c).map((x) => Math.round(x * 255));
  const a = c.alpha ?? 1;
  return a === 1 ? c.hex.toUpperCase() : `rgb(${rgb.join(' ')} / ${fmtNum(a)})`;
}
function cssDim(d, rem = false) {
  if (refTarget(d)) return `var(${varName(refTarget(d))})`;
  if (rem && d.unit === 'px') return `${fmtNum(d.value / 16)}rem`;
  return `${fmtNum(d.value)}${d.value === 0 ? 'px' : d.unit}`;
}
function cssFamily(list) {
  const generic = new Set(['system-ui', '-apple-system', 'BlinkMacSystemFont', 'ui-monospace', 'sans-serif', 'serif', 'monospace']);
  return (Array.isArray(list) ? list : [list]).map((f) => (generic.has(f) ? f : `"${f}"`)).join(', ');
}
function cssShadow(v) {
  return (Array.isArray(v) ? v : [v]).map((l) => {
    if (refTarget(l)) return `var(${varName(refTarget(l))})`;
    const parts = [l.offsetX, l.offsetY, l.blur, l.spread].map((d) => cssDim(d));
    return `${l.inset ? 'inset ' : ''}${parts.join(' ')} ${cssColor(l.color)}`;
  }).join(', ');
}

function cssDeclarations(tok) {
  const name = varName(tok.id);
  const v = tok.value;
  if (refTarget(v)) {
    if (tok.type === 'typography') {
      return ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'text-transform', '']
        .map((p) => [`${name}${p ? '-' + p : ''}`, `var(${varName(refTarget(v))}${p ? '-' + p : ''})`]);
    }
    return [[name, `var(${varName(refTarget(v))})`]];
  }
  switch (tok.type) {
    case 'color': return [[name, cssColor(v)]];
    case 'dimension': return [[name, cssDim(v, tok.path[0] === 'font' && tok.path[1] === 'size')]];
    case 'duration': return [[name, `${fmtNum(v.value)}${v.unit}`]];
    case 'number': case 'fontWeight': return [[name, fmtNum(v)]];
    case 'fontFamily': return [[name, cssFamily(v)]];
    case 'cubicBezier': return [[name, `cubic-bezier(${v.map(fmtNum).join(', ')})`]];
    case 'shadow': return [[name, cssShadow(v)]];
    case 'gradient':
      return [[name, `linear-gradient(180deg, ${v.map((s) => `${cssColor(s.color)} ${fmtNum(s.position * 100)}%`).join(', ')})`]];
    case 'transition': {
      const d = (x) => (refTarget(x) ? `var(${varName(refTarget(x))})` : `${fmtNum(x.value)}${x.unit}`);
      const tf = refTarget(v.timingFunction) ? `var(${varName(refTarget(v.timingFunction))})` : `cubic-bezier(${v.timingFunction.join(', ')})`;
      return [[name, `${d(v.duration)} ${tf} ${d(v.delay)}`]];
    }
    case 'typography': {
      const ff = refTarget(v.fontFamily) ? `var(${varName(refTarget(v.fontFamily))})` : cssFamily(v.fontFamily);
      const fs = refTarget(v.fontSize) ? `var(${varName(refTarget(v.fontSize))})` : cssDim(v.fontSize, true);
      const fw = refTarget(v.fontWeight) ? `var(${varName(refTarget(v.fontWeight))})` : fmtNum(v.fontWeight);
      return [
        [`${name}-font-family`, ff], [`${name}-font-size`, fs], [`${name}-font-weight`, fw],
        [`${name}-line-height`, fmtNum(v.lineHeight)], [`${name}-letter-spacing`, cssDim(v.letterSpacing)],
        [`${name}-text-transform`, tok.ext.textTransform ?? 'none'],
        [name, `${fw} ${fs}/${fmtNum(v.lineHeight)} ${ff}`],
      ];
    }
    default: throw new Error(`No CSS mapping for ${tok.type}`);
  }
}

function cssBlock(selector, tokens, extra = [], indent = '') {
  const lines = [...extra, ...tokens.flatMap(cssDeclarations).map(([k, v]) => `${k}: ${v};`)];
  return `${indent}${selector} {\n${lines.map((l) => `${indent}  ${l}`).join('\n')}\n${indent}}\n`;
}

function buildCss() {
  const prim = [...flatten(readJson(SOURCES.primitive), SOURCES.primitive, new Map()).values()];
  const shared = [
    ...flatten(readJson(SOURCES.semantic), SOURCES.semantic, new Map()).values(),
    ...flatten(readJson(SOURCES.component), SOURCES.component, new Map()).values(),
  ];
  const theme = (t) => [...flatten(readJson(SOURCES.themes[t]), SOURCES.themes[t], new Map()).values()];
  return [
    '/*',
    ' * CARBON design tokens: CSS custom properties adapter.',
    ' * GENERATED FILE. Do not edit. Source: tokens/*.tokens.json',
    ' * Regenerate with: node tools/carbon-tokens.mjs build',
    ' *',
    ' * Theme selection: Soft White by default; Soft Black when the operating system prefers dark,',
    ' * or explicitly with data-carbon-theme="light" | "dark" on any element (scoped theming).',
    ' * Font sizes are emitted in rem so that browser text scaling is respected.',
    ' */',
    '',
    '/* Primitive tokens */',
    cssBlock(':root', prim),
    '/* Soft White (light) theme */',
    cssBlock(':root,\n[data-carbon-theme="light"]', theme('light'), ['color-scheme: light;']),
    '/* Soft Black (dark) theme */',
    cssBlock('[data-carbon-theme="dark"]', theme('dark'), ['color-scheme: dark;']),
    '@media (prefers-color-scheme: dark) {',
    cssBlock(':root:not([data-carbon-theme="light"])', theme('dark'), ['color-scheme: dark;'], '  ') + '}',
    '',
    '/* Theme-agnostic semantic and component tokens. Declared on every theme scope so that',
    '   references resolve against the nearest theme. */',
    cssBlock(':root,\n[data-carbon-theme]', shared),
    '/* Reduced motion: remove positional movement; keep state changes. */',
    '@media (prefers-reduced-motion: reduce) {',
    '  :root,\n  [data-carbon-theme] {',
    `    ${varName('lift.hover')}: 0px;`,
    `    ${varName('lift.pressed')}: 0px;`,
    '  }',
    '}',
    '',
  ].join('\n');
}

// ------------------------------------------------------------------ docs & links

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (extname(name) === '.md') acc.push(p);
  }
  return acc;
}

function slugs(markdown) {
  const seen = new Map();
  const out = new Set();
  let fenced = false;
  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
    if (fenced) continue;
    const m = line.match(/^#{1,6}\s+(.*?)\s*#*\s*$/);
    if (!m) continue;
    const text = m[1].replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
    const base = text.toLowerCase().replace(/[^\p{L}\p{M}\p{N}_ -]/gu, '').replace(/ /g, '-');
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.add(n ? `${base}-${n}` : base);
  }
  return out;
}

function checkDocs(knownHex, errors) {
  const files = walk(ROOT);
  let links = 0;
  for (const file of files) {
    const rel = relative(ROOT, file);
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(/#[0-9A-Fa-f]{6}\b/g)) {
      if (!knownHex.has(m[0].toUpperCase())) errors.push(`${rel}: color ${m[0]} is not defined in the token source`);
    }
    const prose = text.replace(/```[\s\S]*?```/g, '');
    for (const m of prose.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      const target = m[1];
      if (/^(https?:|mailto:)/.test(target)) continue;
      links++;
      const [pathPart, anchor] = target.split('#');
      const dest = pathPart ? resolve(dirname(file), decodeURIComponent(pathPart)) : file;
      if (!existsSync(dest)) { errors.push(`${rel}: broken link ${target}`); continue; }
      if (anchor !== undefined && extname(dest) === '.md' && !slugs(readFileSync(dest, 'utf8')).has(anchor)) {
        errors.push(`${rel}: missing anchor ${target}`);
      }
    }
  }
  return { files: files.length, links };
}

// ------------------------------------------------------------------ commands

function contrastReport(set) {
  const col = (id) => resolveValue(`{color.${id}}`, set);
  const fgs = ['text-primary', 'text-secondary', 'text-tertiary', 'text-secondary-aa', 'text-tertiary-aa',
    'success', 'warning', 'error', 'info', 'success-aa', 'warning-aa', 'error-aa', 'info-aa', 'border', 'border-strong', 'border-aa', 'focus'];
  return fgs.map((fg) => ({ fg, hex: col(fg).hex, ratios: SURFACES.map((s) => contrast(col(fg), col(s))) }));
}

function check() {
  const errors = [];
  const sets = {};
  for (const theme of Object.keys(SOURCES.themes)) {
    try { sets[theme] = loadSet(theme); } catch (e) { errors.push(e.message); }
  }
  if (errors.length) return report(errors);

  // 1. Value shapes and statuses.
  const seen = new Set();
  for (const set of Object.values(sets)) for (const tok of set.values()) {
    if (seen.has(tok.file + tok.id)) continue;
    seen.add(tok.file + tok.id);
    checkShape(tok, errors);
  }

  // 2. Every reference resolves in every theme, and aliases keep their type.
  for (const [theme, set] of Object.entries(sets)) for (const tok of set.values()) {
    try {
      resolveValue(tok.value, set);
      const target = refTarget(tok.value);
      if (target && set.get(target).type !== tok.type) errors.push(`${theme}: ${tok.id} (${tok.type}) aliases ${target} (${set.get(target).type})`);
    } catch (e) { errors.push(`${theme}: ${tok.id}: ${e.message}`); }
  }

  // 3. Theme parity: Soft White and Soft Black define exactly the same tokens.
  const paths = (t) => new Map([...flatten(readJson(SOURCES.themes[t]), t, new Map()).values()].map((x) => [x.id, x.type]));
  const [light, dark] = [paths('light'), paths('dark')];
  for (const [id, type] of light) if (dark.get(id) !== type) errors.push(`Theme parity: ${id} differs between light and dark`);
  for (const id of dark.keys()) if (!light.has(id)) errors.push(`Theme parity: ${id} exists only in dark`);

  // 4. Primitive tone keys equal round(L* x 10).
  for (const tok of sets.light.values()) {
    if (tok.file !== SOURCES.primitive || tok.type !== 'color' || !/^\d{3}$/.test(tok.path[2] ?? '')) continue;
    const expected = String(Math.round(lstar(tok.value) * 10)).padStart(3, '0');
    if (expected !== tok.path[2]) errors.push(`${tok.id}: tone key should be ${expected} (L* x 10)`);
  }

  // 5. Accessibility guarantees.
  const guarantees = [];
  for (const [theme, set] of Object.entries(sets)) {
    const col = (id) => resolveValue(`{color.${id}}`, set);
    const need = (fg, bg, min, label) => {
      const r = contrast(col(fg), col(bg));
      guarantees.push(1);
      if (r < min) errors.push(`${theme}: ${label ?? `${fg} on ${bg}`} is ${floor2(r)}:1, needs ${min}:1`);
    };
    for (const s of SURFACES) {
      for (const fg of ['text-primary', 'text-secondary-aa', 'text-tertiary-aa', 'success-aa', 'warning-aa', 'error-aa', 'info-aa']) need(fg, s, 4.5);
      for (const fg of ['border-aa', 'focus']) need(fg, s, 3);
    }
    need('text-inverse', 'surface-inverse', 4.5);
    for (const s of ['success', 'warning', 'error', 'info']) need('text-inverse', s, 4.5);
  }

  // 6. Docs: every hex value exists in the token source; every relative link and anchor resolves.
  const knownHex = new Set();
  for (const set of Object.values(sets)) for (const tok of set.values()) {
    JSON.stringify(tok.value, (k, v) => { if (k === 'hex') knownHex.add(v.toUpperCase()); return v; });
  }
  const docs = checkDocs(knownHex, errors);

  // 7. The CSS adapter is up to date.
  const css = existsSync(join(ROOT, CSS_OUT)) ? readFileSync(join(ROOT, CSS_OUT), 'utf8') : '';
  if (css !== buildCss()) errors.push(`${CSS_OUT} is stale. Run: node tools/carbon-tokens.mjs build`);

  report(errors, [
    `${sets.light.size} tokens per theme resolved (light and dark)`,
    `${guarantees.length} contrast guarantees verified`,
    `${docs.files} Markdown files scanned, ${docs.links} relative links verified`,
  ]);
}

function report(errors, notes = []) {
  if (errors.length) {
    console.error(`✗ ${errors.length} problem(s):\n` + errors.map((e) => `  - ${e}`).join('\n'));
    process.exit(1);
  }
  console.log('✓ CARBON token check passed\n' + notes.map((n) => `  - ${n}`).join('\n'));
}

function build() {
  mkdirSync(join(ROOT, dirname(CSS_OUT)), { recursive: true });
  writeFileSync(join(ROOT, CSS_OUT), buildCss());
  console.log(`Wrote ${CSS_OUT}`);
}

function printContrast() {
  for (const theme of Object.keys(SOURCES.themes)) {
    const rows = contrastReport(loadSet(theme));
    console.log(`\n### ${theme}\n\n| Foreground | ${SURFACES.join(' | ')} |\n|---|${SURFACES.map(() => '---:').join('|')}|`);
    for (const r of rows) console.log(`| ${r.fg} \`${r.hex}\` | ${r.ratios.map((x) => floor2(x).toFixed(2)).join(' | ')} |`);
  }
}

const command = process.argv[2];
if (command === 'check') check();
else if (command === 'build') build();
else if (command === 'contrast') printContrast();
else {
  console.log('Usage: node tools/carbon-tokens.mjs <check|build|contrast>');
  process.exit(command ? 1 : 0);
}
