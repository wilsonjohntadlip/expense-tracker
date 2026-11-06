// Expense Tracker UI Builder — Run 2
//
// Builds three pages in the open Figma file:
//   Foundations  color + number variables, text styles, effect styles, layout rules
//   Components   icons, buttons, badges, chips, rows, cards, nav bar, FAB, sheets, calendar
//   Screens      all 13 MVP screens (430 wide, iPhone 14/15 Pro Max), the 3 special-state
//                frames (7b-2, 7b-3, 7d-2) and the device checks (360, 412, 440 wide)
//
// Every value comes from the UI canvas mockups (design/ui-mockups/*.dc.html).
// Re-running is safe: it only removes and rebuilds layers this plugin created
// (tagged with plugin data). Variables and styles are updated in place by name.

const TAG = 'etub';
const RUN = 'run2';
const COLLECTION = 'Expense Tracker tokens';
const FONT = 'Manrope';
const WEIGHTS = { 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold' };
const SCREEN_W = 430;
const SCREEN_H = 932;
const NAV_H = 84;
const COL = 510;            // horizontal step between screens on the Screens page (as on the canvas)
const TODAY = 26;           // the mockups' "today" is Mon, Oct 26, 2026
const FIRST_WEEKDAY = 4;    // Oct 1, 2026 is a Thursday

// ---------------------------------------------------------------------------
// Tokens
// ---------------------------------------------------------------------------

// [key, hex, usage, alpha]
const COLORS = [
  ['primary', '#0F5F58', 'Actions, income, active tab, Pay and Save buttons'],
  ['primary-pressed', '#0B4842', 'Pressed / hover state of primary'],
  ['primary-tint', '#E3F0EE', 'Selected chip and tile background, paid and category tiles'],
  ['income-tint', '#DCEFEA', 'Income entry tile'],
  ['ink', '#12161C', 'Main text, expense amounts'],
  ['muted', '#5B6472', 'Secondary text, labels, transfers, inactive tabs'],
  ['background', '#F4F5F7', 'App background, keypad keys, mini stat cells'],
  ['surface', '#FFFFFF', 'Cards, sheets, nav bar'],
  ['divider', '#EEF0F3', 'Row dividers, neutral tags, Quick add segmented track'],
  ['track', '#E3E6EB', 'Progress track, nav top border, unselected chip border, Upcoming segmented track'],
  ['border', '#D5D9E0', 'Input, secondary button and filter chip borders'],
  ['input-border', '#C4CAD3', 'Form field borders, greyed-out calendar days and disabled arrows'],
  ['dashed', '#9AA3AF', 'Dashed "add" chips and buttons'],
  ['paper', '#FAFAFA', 'Receipt thumbnail'],
  ['viewer', '#2A2F37', 'Full-size receipt viewer'],
  ['on-dark-warning', '#F2C078', 'Amounts owed on the dark net-worth card'],
  ['overdue', '#B42318', 'Overdue, over budget, count badge'],
  ['overdue-tint', '#FBEBEB', 'Overdue tile background'],
  ['warning', '#8A5200', 'Due soon, budget at 80%+, card "Owed" label'],
  ['warning-tint', '#FBEBD3', 'Due soon tile background'],
  ['accent', '#E39B3A', 'Budget bar at 80%+, second member avatar, chart'],
  ['chart-1', '#134E4A', 'Chart series 1, category tile code'],
  ['chart-2', '#2F7F79', 'Chart series 2, progress fill (on track)'],
  ['chart-3', '#7FB8B1', 'Chart series 3'],
  ['chart-4', '#C9CED6', 'Chart series "Other"'],
  ['scrim', '#12161C', 'Overlay behind bottom sheets (45%)', 0.45],
];

const SPACE = [2, 4, 6, 8, 10, 12, 14, 16, 20, 24];

// [value, usage]
const RADII = [
  [6, 'Tags and badges'],
  [9, 'Segmented control item'],
  [10, 'Inputs, secondary and icon buttons'],
  [11, 'Due item tiles'],
  [12, 'Mini cells, category tiles, keypad keys, entry tiles, segmented track'],
  [14, 'Large buttons, sheet options'],
  [16, 'Lists, account cards'],
  [20, 'Cards, floating + button'],
  [24, 'Bottom sheet top corners'],
];

// Text styles created up front so the styles panel is ordered largest to smallest.
// [size, weight, letterSpacing]
const TYPE_SCALE = [
  [40, 800, -0.5], [36, 800, -0.5], [34, 800, -0.5], [32, 800, -0.5], [30, 800, -0.5], [30, 800],
  [26, 800], [24, 800], [22, 800], [22, 700], [20, 800], [18, 800], [18, 700],
  [17, 800], [17, 700], [16, 800], [16, 700], [16, 600], [16, 400], [15, 800], [15, 700], [15, 600], [15, 400],
  [14, 800], [14, 700], [14, 600], [14, 400], [13, 800], [13, 700], [13, 600], [13, 400],
  [12, 800, 0.4], [12, 800], [12, 700], [12, 600], [12, 400], [11, 800], [11, 700], [11, 600], [11, 400],
];

const ICONS = {
  Home: ['<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>', 2],
  Activity: ['<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>', 2],
  Upcoming: ['<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="m9 15 2 2 4-4"/>', 2],
  Budgets: ['<path d="M21 12A9 9 0 1 1 12 3v9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15z"/>', 2],
  Accounts: ['<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>', 2],
  Plus: ['<path d="M12 5v14M5 12h14"/>', 2.4],
  ChevronLeft: ['<path d="M15 18l-6-6 6-6"/>', 2],
  ChevronRight: ['<path d="M9 18l6-6-6-6"/>', 2],
  ChevronDown: ['<path d="m6 9 6 6 6-6"/>', 2],
  ChevronUp: ['<path d="m18 15-6-6-6 6"/>', 2],
  Search: ['<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', 2],
  Paperclip: ['<path d="M21 11.5 12.5 20a5 5 0 0 1-7-7L14 4.5a3.5 3.5 0 0 1 5 5L10.5 18a2 2 0 0 1-3-3l8-8"/>', 2.2],
  Warning: ['<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>', 2],
  Close: ['<path d="M6 6l12 12M18 6 6 18"/>', 2],
  Calendar: ['<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', 2],
  Camera: ['<path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/>', 2],
  Image: ['<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 17-5-5-9 8"/>', 2],
  Receipt: ['<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>', 2],
  Check: ['<path d="m5 12 5 5L20 7"/>', 2.4],
  Transfer: ['<path d="M7 7h13l-4-4M17 17H4l4 4"/>', 2],
  Backspace: ['<path d="M21 5H9l-6 7 6 7h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z"/><path d="m12 9 6 6M18 9l-6 6"/>', 2],
};

// ---------------------------------------------------------------------------
// Sample data (John and Janice, October 2026), copied from the mockups
// ---------------------------------------------------------------------------

const DASH_DUES = [
  ['Overdue', 'Mo', 'Motorcycle loan · 9 of 24', 'Overdue · was due Oct 25', 'Usually paid by John', '₱4,850'],
  ['Soon', 'Me', 'Meralco', 'Due Oct 28 · in 2 days', 'Usually paid by Janice', 'est. ₱4,200'],
  ['Soon', 'MC', 'Metrobank Mastercard SOA', 'Due Oct 30 · in 4 days', 'Usually paid by John', '₱3,215.50'],
  ['Auto', 'SS', 'SSS salary loan · 19 of 24', 'Deducted on Oct 30 payroll', 'John’s salary', '₱1,640'],
  ['Auto', 'PI', 'Pag-IBIG MPL · 13 of 24', 'Deducted on Oct 30 payroll', 'Janice’s salary', '₱1,850'],
];

const BREAKDOWN = [
  ['Food', '₱14,190', '37%', 0.369, 'chart-1'],
  ['Housing', '₱12,000', '31%', 0.312, 'chart-2'],
  ['Bills & Utilities', '₱6,230', '16%', 0.162, 'chart-3'],
  ['Other', '₱3,901', '10%', 0.102, 'chart-4'],
  ['Transportation', '₱2,100', '5%', 0.055, 'accent'],
];

const BUDGETS = [
  ['Groceries', '₱9,840', '₱12,000', 0.82, 'accent', '82% used · ₱2,160 left', 'warning'],
  ['Dining Out', '₱4,350', '₱4,000', 1, 'overdue', 'Over by ₱350', 'overdue'],
  ['Transportation', '₱2,100', '₱5,000', 0.42, 'chart-2', '42% used · ₱2,900 left', 'muted'],
];

const ACCOUNTS = [
  ['Balance', 'Bank', 'Joint', 'BDO Savings', 'Balance', '₱64,300.00'],
  ['Balance', 'E-wallet', 'Mine', 'GCash', 'Balance', '₱8,120.40'],
  ['Balance', 'Cash', 'Mine', 'Cash wallet', 'Balance', '₱3,250.00'],
  ['Owed', 'Credit card', 'Hers', 'BPI Visa', 'Owed', '₱12,480.00'],
];

const RECENT = [
  ['Expense', 'Gr', 'Puregold', 'Groceries · GCash', '−₱1,284.75', 'Today · John'],
  ['Transfer', '', 'ATM withdrawal', 'BDO Savings → Cash wallet', '₱5,000.00', 'Today · Janice'],
  ['Expense', 'Di', 'Jollibee', 'Dining Out · Cash wallet', '−₱389.00', 'Yesterday · John'],
  ['Income', 'Sa', 'October salary (2nd half)', 'Salary · BDO Savings', '+₱26,000.00', 'Oct 25 · John'],
];

const EXPENSE_CATS = [['Gr', 'Groceries'], ['Di', 'Dining Out'], ['De', 'Delivery'], ['Gb', 'Grab/Taxi'],
  ['Co', 'Commute'], ['El', 'Electricity'], ['Lo', 'Load'], ['···', 'More']];
const QA_ACCOUNTS = ['GCash', 'Cash wallet', 'BDO Savings', 'BPI Visa', 'Maya'];

const UPCOMING = [
  ['OVERDUE', 'overdue', [
    ['Overdue', 'Mo', 'Motorcycle loan · 9 of 24', 'Was due Oct 25 · 1 day late', 'Usually paid by John', '₱4,850'],
  ]],
  ['DUE SOON · NEXT 7 DAYS', 'warning', [
    ['Soon', 'Me', 'Meralco', 'Due Oct 28 · in 2 days', 'Usually paid by Janice', 'est. ₱4,200'],
    ['Soon', 'MC', 'Metrobank Mastercard SOA', 'Due Oct 30 · min ₱850', 'Usually paid by John', '₱3,215.50'],
  ]],
  ['SALARY DEDUCTIONS', 'muted', [
    ['Auto', 'SS', 'SSS salary loan · 19 of 24', 'Deducted on Oct 30 payroll', 'John’s salary', '₱1,640'],
    ['Auto', 'PI', 'Pag-IBIG MPL · 13 of 24', 'Deducted on Oct 30 payroll', 'Janice’s salary', '₱1,850'],
  ]],
  ['PAID', 'primary', [
    ['Paid', 'BP', 'BPI Visa SOA', 'Due Oct 25 · paid Oct 23 by Janice', 'Usually paid by Janice', '₱9,860'],
    ['Paid', 'PL', 'PLDT Fiber', 'Due Oct 20 · paid Oct 19 by Janice', 'Usually paid by Janice', '₱1,699'],
    ['Paid', 'CL', 'Car loan · 15 of 36', 'Due Oct 15 · paid Oct 14 by John', 'Usually paid by John', '₱15,320'],
  ]],
];

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const V = {};       // color key -> Variable
const NUMVAR = {};  // 'space:12' / 'radius:20' -> Variable
const TS = {};      // text style name -> TextStyle
const FX = {};      // effect style key -> EffectStyle
const C = {};       // component name -> { node, keys, isSet }
let existingTextStyles = [];
const stats = { components: 0, links: 0, linkFailures: 0, fixFailures: 0, warnings: [], sharedPages: false };

// ---------------------------------------------------------------------------
// Low-level helpers
// ---------------------------------------------------------------------------

function hex(h) {
  const s = h.replace('#', '');
  return { r: parseInt(s.slice(0, 2), 16) / 255, g: parseInt(s.slice(2, 4), 16) / 255, b: parseInt(s.slice(4, 6), 16) / 255 };
}

function colorDef(key) {
  const c = COLORS.find(x => x[0] === key);
  if (!c) throw new Error('Unknown color token: ' + key);
  return c;
}

function paint(key) {
  const c = colorDef(key);
  const p = { type: 'SOLID', color: hex(c[1]), opacity: c[3] == null ? 1 : c[3] };
  return figma.variables.setBoundVariableForPaint(p, 'color', V[key]);
}

function setFill(node, key) {
  node.fills = key ? [paint(key)] : [];
}

function setStroke(node, key, weight, topOnly) {
  node.strokes = [paint(key)];
  node.strokeAlign = 'INSIDE';
  if (topOnly) {
    node.strokeTopWeight = weight;
    node.strokeRightWeight = 0;
    node.strokeBottomWeight = 0;
    node.strokeLeftWeight = 0;
  } else {
    node.strokeWeight = weight;
  }
}

// Sets a number and binds it to a token variable when one with that exact value exists.
function bindNum(node, field, value, kind) {
  node[field] = value;
  const v = NUMVAR[kind + ':' + value];
  if (v) {
    try { node.setBoundVariable(field, v); } catch (e) { /* field not bindable on this node */ }
  }
}

function setRadius(node, r) {
  if (!r) return;
  node.cornerRadius = r;
  if (NUMVAR['radius:' + r]) {
    for (const f of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) bindNum(node, f, r, 'radius');
  }
}

function tag(node) {
  node.setPluginData(TAG, RUN);
  return node;
}

function isAutoLayout(node) {
  return 'layoutMode' in node && node.layoutMode !== 'NONE';
}

// w / h: number = fixed, 'fill' = fill container, 'hug' = hug contents,
// undefined = leave as created (new auto-layout frames hug; instances keep the component's size).
function size(node, w, h) {
  const parent = node.parent;
  const inAL = parent && parent.type !== 'PAGE' && isAutoLayout(parent);
  const canHug = isAutoLayout(node) || node.type === 'TEXT';
  const apply = (axis, v) => {
    const prop = 'layoutSizing' + axis;
    if (typeof v === 'number') {
      if (inAL || canHug) node[prop] = 'FIXED';
      if (axis === 'Horizontal') node.resize(v, node.height);
      else node.resize(node.width, v);
    } else if (v === 'fill') {
      if (inAL) node[prop] = 'FILL';
    } else if (v === 'hug' && canHug) {
      node[prop] = 'HUG';
    }
  };
  apply('Horizontal', w);
  apply('Vertical', h);
}

function place(parent, node, w, h) {
  if (parent) parent.appendChild(node);
  size(node, w, h);
  return node;
}

function pad4(p) {
  if (p == null) return [0, 0, 0, 0];
  if (typeof p === 'number') return [p, p, p, p];
  if (p.length === 2) return [p[0], p[1], p[0], p[1]];
  return p;
}

// o: dir 'H'|'V', gap, pad, main, cross, fill, r, clip, stroke [key, weight, topOnly], wrap
function applyBox(f, o) {
  f.fills = [];
  f.clipsContent = !!o.clip;
  if (o.dir) {
    f.layoutMode = o.dir === 'H' ? 'HORIZONTAL' : 'VERTICAL';
    f.primaryAxisSizingMode = 'AUTO';
    f.counterAxisSizingMode = 'AUTO';
    if (o.gap != null) {
      if (o.gap < 0) f.itemSpacing = o.gap;
      else bindNum(f, 'itemSpacing', o.gap, 'space');
    }
    const p = pad4(o.pad);
    bindNum(f, 'paddingTop', p[0], 'space');
    bindNum(f, 'paddingRight', p[1], 'space');
    bindNum(f, 'paddingBottom', p[2], 'space');
    bindNum(f, 'paddingLeft', p[3], 'space');
    f.primaryAxisAlignItems = o.main || 'MIN';
    f.counterAxisAlignItems = o.cross || 'MIN';
    if (o.wrap) {
      f.layoutWrap = 'WRAP';
      f.counterAxisSpacing = o.wrap;
    }
  }
  if (o.fill) setFill(f, o.fill);
  if (o.r) setRadius(f, o.r);
  if (o.stroke) setStroke(f, o.stroke[0], o.stroke[1], o.stroke[2]);
}

function box(name, o, parent) {
  const f = figma.createFrame();
  f.name = name;
  applyBox(f, o || {});
  return place(parent, f, o && o.w, o && o.h);
}

function spacer(parent, w, h) {
  return box('Spacer', { w: w, h: h }, parent);
}

function rect(parent, name, key, w, h, r) {
  const n = figma.createRectangle();
  n.name = name;
  setFill(n, key);
  if (parent) parent.appendChild(n);
  n.resize(Math.max(0.01, w), Math.max(0.01, h));
  if (r) setRadius(n, r);
  return n;
}

function styleName(s, w, ls) {
  const group = s >= 26 ? 'Display' : s >= 16 ? 'Title' : s >= 13 ? 'Body' : 'Caption';
  const suffix = ls ? (ls < 0 ? ' Tight' : ' Caps') : '';
  return group + '/' + s + ' ' + WEIGHTS[w] + suffix;
}

function textStyle(spec) {
  const s = spec[0], w = spec[1], ls = spec[2] || 0;
  const name = styleName(s, w, ls);
  if (TS[name]) return TS[name];
  const st = existingTextStyles.find(x => x.name === name) || figma.createTextStyle();
  st.name = name;
  st.fontName = { family: FONT, style: WEIGHTS[w] };
  st.fontSize = s;
  st.letterSpacing = { unit: 'PIXELS', value: ls };
  st.lineHeight = { unit: 'AUTO' };
  st.description = s + ' / ' + w + (ls ? ' / letter-spacing ' + ls + 'px' : '') + ' · Manrope';
  TS[name] = st;
  return st;
}

// o: name, w, h, trunc, align
async function text(parent, chars, spec, color, o) {
  o = o || {};
  const st = textStyle(spec);
  const t = figma.createText();
  t.fontName = st.fontName;
  t.characters = String(chars);
  await t.setTextStyleIdAsync(st.id);
  setFill(t, color || 'ink');
  t.name = o.name || String(chars).slice(0, 40);
  if (o.align) t.textAlignHorizontal = o.align;
  place(parent, t, o.w, o.h);
  if (o.w == null) t.textAutoResize = 'WIDTH_AND_HEIGHT';
  else if (o.h == null) t.textAutoResize = 'HEIGHT';
  if (o.trunc) {
    try { t.textTruncation = 'ENDING'; t.maxLines = 1; } catch (e) { /* older Figma */ }
  }
  return t;
}

function recolor(node, key) {
  const vectors = node.findAll(n => 'strokes' in n && n.strokes.length > 0 && n.type !== 'FRAME');
  for (const n of vectors) n.strokes = [paint(key)];
}

function icon(name, px, color, parent) {
  const c = C['Icon/' + name];
  if (!c) throw new Error('Unknown icon: ' + name);
  const i = c.node.createInstance();
  i.resize(px, px);
  recolor(i, color || 'ink');
  if (parent) parent.appendChild(i);
  return i;
}

// Thin divider pinned to the top edge, used by list rows (toggled by a boolean property).
function topLine(frame) {
  const r = rect(frame, 'Divider', 'divider', frame.width, 1);
  r.layoutPositioning = 'ABSOLUTE';
  r.x = 0;
  r.y = 0;
  r.constraints = { horizontal: 'STRETCH', vertical: 'MIN' };
  return r;
}

function progress(parent, pct, key, h, name) {
  const t = box(name || 'Progress', { fill: 'track', r: h / 2, clip: true, w: 'fill', h: h }, parent);
  const f = rect(t, 'Fill', key, Math.max(1, t.width * pct), h, h / 2);
  f.constraints = { horizontal: 'SCALE', vertical: 'STRETCH' };
  return t;
}

async function setEffect(node, key) {
  if (FX[key]) await node.setEffectStyleIdAsync(FX[key].id);
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function ownTexts(node) {
  const out = [];
  (function walk(n) {
    for (const ch of n.children || []) {
      if (ch.type === 'TEXT') out.push(ch);
      else if (ch.type !== 'INSTANCE' && 'children' in ch) walk(ch);
    }
  })(node);
  return out;
}

function ownNamed(node, name) {
  return node.findAll(n => n.name === name && !insideInstance(n, node));
}

function insideInstance(n, root) {
  let p = n.parent;
  while (p && p !== root) {
    if (p.type === 'INSTANCE') return true;
    p = p.parent;
  }
  return false;
}

// Adds TEXT properties for the named text layers and BOOLEAN properties for visibility toggles.
function defineProps(target, textNames, boolNames) {
  const keys = {};
  const variants = target.type === 'COMPONENT_SET' ? target.children : [target];
  for (const n of textNames || []) {
    let def = null;
    for (const v of variants) {
      const t = ownTexts(v).find(x => x.name === n);
      if (t && def == null) def = t.characters;
    }
    if (def == null) throw new Error('No text layer "' + n + '" in ' + target.name);
    const key = target.addComponentProperty(n, 'TEXT', def);
    for (const v of variants) for (const t of ownTexts(v).filter(x => x.name === n)) t.componentPropertyReferences = { characters: key };
    keys[n] = key;
  }
  // { prop, layer, def }: def is the default visibility (true when left out).
  for (const n of boolNames || []) {
    const def = n.def == null ? true : n.def;
    const key = target.addComponentProperty(n.prop, 'BOOLEAN', def);
    for (const v of variants) {
      for (const layer of ownNamed(v, n.layer)) {
        layer.visible = def;
        layer.componentPropertyReferences = { visible: key };
      }
    }
    keys[n.prop] = key;
  }
  return keys;
}

function register(name, node, keys) {
  C[name] = { node: node, keys: keys || {}, isSet: node.type === 'COMPONENT_SET' };
  stats.components++;
  if (node.type === 'COMPONENT') node.description = node.description || 'Expense Tracker · ' + name;
  return node;
}

function makeComponent(name, o, parent) {
  const c = figma.createComponent();
  c.name = name;
  applyBox(c, o || {});
  return place(parent, c, o && o.w, o && o.h);
}

// defs: [{ name: 'Kind=Overdue', ...extra }]; build(component, def) fills each variant.
async function variantSet(name, defs, parent, build, layout) {
  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.name;
    c.fills = [];
    parent.appendChild(c);
    await build(c, d);
    comps.push(c);
  }
  const set = figma.combineAsVariants(comps, parent);
  set.name = name;
  set.layoutMode = layout === 'V' ? 'VERTICAL' : 'HORIZONTAL';
  set.primaryAxisSizingMode = 'AUTO';
  set.counterAxisSizingMode = 'AUTO';
  set.itemSpacing = 16;
  set.paddingTop = set.paddingRight = set.paddingBottom = set.paddingLeft = 16;
  set.counterAxisAlignItems = 'MIN';
  set.fills = [];
  set.strokes = [{ type: 'SOLID', color: hex('#9747FF') }];
  set.strokeWeight = 1;
  set.dashPattern = [10, 5];
  set.cornerRadius = 5;
  return set;
}

// Creates an instance. props maps property names (variant names, or the text/boolean
// names passed to defineProps) to values.
function inst(name, props, parent, w, h) {
  const c = C[name];
  if (!c) throw new Error('Unknown component: ' + name);
  const base = c.isSet ? c.node.defaultVariant : c.node;
  const i = base.createInstance();
  const out = {};
  for (const k in props || {}) out[c.keys[k] || k] = props[k];
  if (Object.keys(out).length) i.setProperties(out);
  return place(parent, i, w, h);
}

async function section(root, title, note) {
  const s = box(title, { dir: 'V', gap: 16 }, root);
  await text(s, title, [22, 800]);
  if (note) await text(s, note, [13, 400], 'muted');
  return box('Items', { dir: 'H', gap: 32, cross: 'MIN', wrap: 32, w: 1640 }, s);
}

async function buildIcons(row) {
  const holder = box('Icons', { dir: 'H', gap: 16, wrap: 16, w: 640 }, row);
  for (const name in ICONS) {
    const def = ICONS[name];
    const c = makeComponent('Icon/' + name, {}, holder);
    c.resize(24, 24);
    const svg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#12161C" stroke-width="' + def[1] +
      '" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">' + def[0] + '</svg>';
    const v = figma.createNodeFromSvg(svg);
    v.name = 'Glyph';
    v.fills = [];
    c.appendChild(v);
    v.x = 0;
    v.y = 0;
    v.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    for (const ch of v.findAll(() => true)) if ('constraints' in ch) ch.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    recolor(c, 'ink');
    c.description = '24×24, ' + def[1] + 'px round stroke. Resize instances to 16 / 18 / 20 / 22 / 28.';
    register('Icon/' + name, c);
  }
}

const TILE_TONES = {
  Overdue: ['overdue-tint', 'overdue'],
  Soon: ['warning-tint', 'warning'],
  Neutral: ['divider', 'muted'],
  Paid: ['primary-tint', 'primary'],
  Category: ['primary-tint', 'chart-1'],
  Income: ['income-tint', 'primary'],
};

const DUE_LOOK = {
  Overdue: { tone: 'Overdue', status: 'overdue', sample: DASH_DUES[0] },
  Soon: { tone: 'Soon', status: 'warning', sample: DASH_DUES[1] },
  Auto: { tone: 'Neutral', status: 'muted', sample: DASH_DUES[3] },
  Paid: { tone: 'Paid', status: 'primary', sample: UPCOMING[3][2][2] },
};

const ENTRY_LOOK = {
  Expense: { tone: 'Category', amt: 'ink', sample: RECENT[0] },
  Transfer: { tone: 'Neutral', amt: 'muted', sample: RECENT[1] },
  Income: { tone: 'Income', amt: 'primary', sample: RECENT[3] },
};

async function buildComponents(page) {
  const root = tag(box('Components', { dir: 'V', gap: 56, pad: 48, fill: 'surface' }, page));
  root.x = 0;
  root.y = 0;
  await text(root, 'Expense Tracker — Components', [36, 800, -0.5]);
  await text(root, 'Run 2. Built from the UI canvas values. Instances in Screens update when these change.', [14, 400], 'muted');

  // Icons
  await buildIcons(await section(root, 'Icons', '24×24 line icons, round caps. Instances are recolored with color tokens.'));

  // Avatar, badges, buttons
  let row = await section(root, 'Avatars, badges and buttons');
  const avatar = await variantSet('Avatar', [{ name: 'Tone=Primary' }, { name: 'Tone=Accent' }], row, async (c, d) => {
    const primary = d.name === 'Tone=Primary';
    applyBox(c, { dir: 'H', main: 'CENTER', cross: 'CENTER', fill: primary ? 'primary' : 'accent', r: 18 });
    size(c, 36, 36);
    c.strokes = [paint('background')];
    c.strokeWeight = 2;
    c.strokeAlign = 'OUTSIDE';
    await text(c, primary ? 'Jo' : 'Ja', [13, 800], primary ? 'surface' : 'ink', { name: 'Initials' });
  });
  register('Avatar', avatar, defineProps(avatar, ['Initials']));
  avatar.description = '36×36 with a 2px background-colored ring (40 overall). Overlap −10 between avatars.';

  const badge = await variantSet('Badge', [{ name: 'Type=Tag' }, { name: 'Type=Owner' }, { name: 'Type=Paid' }, { name: 'Type=Count' }], row, async (c, d) => {
    const type = d.name.split('=')[1];
    if (type === 'Tag') {
      applyBox(c, { dir: 'H', pad: [3, 7], r: 6, fill: 'divider', cross: 'CENTER' });
      await text(c, 'Auto', [11, 700], 'ink', { name: 'Label' });
    } else if (type === 'Owner') {
      applyBox(c, { dir: 'H', pad: [2, 6], r: 6, fill: 'divider', cross: 'CENTER' });
      await text(c, 'Joint', [11, 700], 'ink', { name: 'Owner' });
    } else if (type === 'Paid') {
      applyBox(c, { dir: 'H', cross: 'CENTER' });
      await text(c, '✓ Paid', [11, 800], 'primary', { name: 'Paid' });
    } else {
      applyBox(c, { dir: 'H', pad: [0, 4], r: 9, fill: 'overdue', main: 'CENTER', cross: 'CENTER' });
      await text(c, '3', [11, 800], 'surface', { name: 'Count' });
      size(c, 'hug', 18);
      try { c.minWidth = 18; } catch (e) { /* older Figma */ }
    }
  });
  register('Badge', badge, defineProps(badge, ['Label', 'Owner', 'Count']));

  const pay = makeComponent('Button/Pay', { dir: 'H', pad: [0, 16], r: 17, fill: 'primary', cross: 'CENTER', h: 34 }, row);
  await text(pay, 'Pay', [13, 800], 'surface', { name: 'Label' });
  register('Button/Pay', pay, defineProps(pay, ['Label']));
  pay.description = 'Height 34, radius 17, padding 0 16, 13/800. Opens the Pay screen.';

  const primary = makeComponent('Button/Primary', { dir: 'H', r: 14, fill: 'primary', main: 'CENTER', cross: 'CENTER', w: 398, h: 52 }, row);
  await text(primary, 'Save expense', [16, 800], 'surface', { name: 'Label' });
  register('Button/Primary', primary, defineProps(primary, ['Label']));
  primary.description = 'Height 52, radius 14, 16/800. Full width on forms.';

  const secondary = makeComponent('Button/Secondary', { dir: 'H', gap: 6, pad: [0, 12], r: 10, fill: 'surface', cross: 'CENTER', stroke: ['border', 1], h: 40 }, row);
  icon('Calendar', 16, 'ink', secondary);
  await text(secondary, 'Today', [13, 700], 'ink', { name: 'Label' });
  register('Button/Secondary', secondary, defineProps(secondary, ['Label']));

  const light = makeComponent('Button/Light', { dir: 'H', pad: [0, 14], r: 12, fill: 'surface', cross: 'CENTER', h: 40 }, row);
  await text(light, '+ Loan or bill', [14, 800], 'primary', { name: 'Label' });
  register('Button/Light', light, defineProps(light, ['Label']));
  light.description = 'White button on the grey background. Height 40, radius 12.';

  const iconBtn = makeComponent('Button/Icon', { dir: 'H', r: 10, fill: 'surface', main: 'CENTER', cross: 'CENTER', stroke: ['border', 1], w: 40, h: 40 }, row);
  const camera = icon('Camera', 20, 'ink', iconBtn);
  const iconKeys = {};
  try {
    iconKeys.Icon = iconBtn.addComponentProperty('Icon', 'INSTANCE_SWAP', C['Icon/Camera'].node.id);
    camera.componentPropertyReferences = { mainComponent: iconKeys.Icon };
  } catch (e) {
    stats.warnings.push('Button/Icon: icon swap property not added (' + e.message + ')');
  }
  register('Button/Icon', iconBtn, iconKeys);

  const fab = makeComponent('FAB', { dir: 'H', r: 20, fill: 'primary', main: 'CENTER', cross: 'CENTER', w: 60, h: 60 }, row);
  icon('Plus', 28, 'surface', fab);
  await setEffect(fab, 'fab');
  register('FAB', fab);
  fab.description = 'Floating + : 60×60, radius 20, 16 from the right edge, 78 above the nav bar top. Hidden on forms.';

  // Tiles
  row = await section(root, 'Tiles', 'Two-letter code tiles. 38 (radius 11, 12/800) in due rows, 40 (radius 12, 13/800) in entry rows.');
  const tileDefs = [];
  for (const sz of ['38', '40']) for (const tone in TILE_TONES) tileDefs.push({ name: 'Size=' + sz + ', Tone=' + tone, sz: +sz, tone: tone });
  const tile = await variantSet('Tile', tileDefs, row, async (c, d) => {
    const t = TILE_TONES[d.tone];
    applyBox(c, { dir: 'H', main: 'CENTER', cross: 'CENTER', fill: t[0], r: d.sz === 38 ? 11 : 12 });
    size(c, d.sz, d.sz);
    await text(c, 'Gr', d.sz === 38 ? [12, 800] : [13, 800], t[1], { name: 'Code' });
  });
  register('Tile', tile, defineProps(tile, ['Code']));

  // Controls
  row = await section(root, 'Controls', 'Segmented control items, chips, category tiles, keypad keys, text input.');
  const segment = await variantSet('Segment', [
    { name: 'Size=Large, State=On' }, { name: 'Size=Large, State=Off' },
    { name: 'Size=Small, State=On' }, { name: 'Size=Small, State=Off' },
  ], row, async (c, d) => {
    const large = d.name.indexOf('Large') >= 0;
    const on = d.name.indexOf('=On') >= 0;
    applyBox(c, { dir: 'H', main: 'CENTER', cross: 'CENTER', r: 9, fill: on ? 'surface' : null });
    size(c, 120, large ? 36 : 34);
    if (on && large) await setEffect(c, 'segment');
    await text(c, large ? 'Expense' : 'All', large ? [14, 700] : [13, 700], on ? 'ink' : 'muted', { name: 'Label' });
  });
  register('Segment', segment, defineProps(segment, ['Label']));
  segment.description = 'Large: Quick add (36 tall, on = white + shadow, track divider). Small: Upcoming (34 tall, track color track). Track: padding 4, gap 4, radius 12.';

  const chip = await variantSet('Chip/Account', [{ name: 'State=Selected' }, { name: 'State=Default' }], row, async (c, d) => {
    const on = d.name.indexOf('Selected') >= 0;
    applyBox(c, { dir: 'H', pad: [0, 14], r: 20, cross: 'CENTER', fill: on ? 'primary-tint' : 'surface', stroke: [on ? 'primary' : 'track', 2] });
    size(c, 'hug', 40);
    await text(c, 'GCash', [13, 700], 'ink', { name: 'Label' });
  });
  register('Chip/Account', chip, defineProps(chip, ['Label']));

  const filter = await variantSet('Chip/Filter', [{ name: 'State=Selected' }, { name: 'State=Default' }], row, async (c, d) => {
    const on = d.name.indexOf('Selected') >= 0;
    applyBox(c, { dir: 'H', pad: [0, 14], r: 17, cross: 'CENTER', fill: on ? 'ink' : 'surface', stroke: [on ? 'ink' : 'border', 1] });
    size(c, 'hug', 34);
    await text(c, 'Everyone', [13, 700], on ? 'surface' : 'ink', { name: 'Label' });
  });
  register('Chip/Filter', filter, defineProps(filter, ['Label']));

  const cat = await variantSet('Category tile', [{ name: 'State=Selected' }, { name: 'State=Default' }], row, async (c, d) => {
    const on = d.name.indexOf('Selected') >= 0;
    applyBox(c, { dir: 'V', gap: 2, pad: [0, 2], r: 12, main: 'CENTER', cross: 'CENTER', fill: on ? 'primary-tint' : 'surface', stroke: [on ? 'primary' : 'track', 2] });
    size(c, 93, 60);
    await text(c, 'Gr', [13, 800], 'chart-1', { name: 'Code' });
    await text(c, 'Groceries', [11, 600], 'ink', { name: 'Name' });
  });
  register('Category tile', cat, defineProps(cat, ['Code', 'Name']));
  cat.description = 'Height 60 (52 on screens under 820 tall), radius 12, 2px border. 4 per row, gap 8.';

  const key = await variantSet('Keypad key', [{ name: 'Kind=Digit' }, { name: 'Kind=Delete' }], row, async (c, d) => {
    applyBox(c, { dir: 'H', r: 12, main: 'CENTER', cross: 'CENTER', fill: 'background' });
    size(c, 129, 48);
    if (d.name === 'Kind=Digit') await text(c, '1', [22, 700], 'ink', { name: 'Label' });
    else icon('Backspace', 24, 'ink', c);
  });
  register('Keypad key', key, defineProps(key, ['Label']));
  key.description = 'Height 48 (40 on screens under 820 tall), radius 12. 3 columns, gap 6.';

  const input = makeComponent('Input/Text', { dir: 'H', pad: [0, 12], r: 10, fill: 'surface', cross: 'CENTER', stroke: ['border', 1], w: 220, h: 40 }, row);
  await text(input, 'Add a note (optional)', [14, 400], 'muted', { name: 'Placeholder', w: 'fill', trunc: true });
  register('Input/Text', input, defineProps(input, ['Placeholder']));

  // Rows and cards
  row = await section(root, 'Rows and cards');
  const dueRow = await variantSet('Row/Due', ['Overdue', 'Soon', 'Auto', 'Paid'].map(k => ({ name: 'Kind=' + k, kind: k })), row, async (c, d) => {
    const L = DUE_LOOK[d.kind];
    const t = TILE_TONES[L.tone];
    const s = L.sample;
    applyBox(c, { dir: 'H', gap: 12, pad: [12, 0], cross: 'CENTER', fill: 'surface' });
    size(c, 366, 'hug');
    const tl = box('Tile', { dir: 'H', main: 'CENTER', cross: 'CENTER', fill: t[0], r: 11, w: 38, h: 38 }, c);
    await text(tl, s[1], [12, 800], t[1], { name: 'Code' });
    const info = box('Info', { dir: 'V', gap: 2, w: 'fill' }, c);
    await text(info, s[2], [14, 700], 'ink', { name: 'Name', w: 'fill', trunc: true });
    await text(info, s[3], [12, 700], L.status, { name: 'Status', w: 'fill' });
    await text(info, s[4], [11, 400], 'muted', { name: 'Who', w: 'fill' });
    const right = box('Right', { dir: 'V', gap: 6, cross: 'MAX' }, c);
    await text(right, s[5], [14, 800], 'ink', { name: 'Amount' });
    if (d.kind === 'Overdue' || d.kind === 'Soon') inst('Button/Pay', {}, right);
    else if (d.kind === 'Auto') inst('Badge', { Type: 'Tag' }, right);
    else inst('Badge', { Type: 'Paid' }, right);
    topLine(c);
  }, 'V');
  register('Row/Due', dueRow, defineProps(dueRow, ['Code', 'Name', 'Status', 'Who', 'Amount'], [{ prop: 'Divider', layer: 'Divider' }]));
  dueRow.description = 'Due item: 38 tile, gap 12, padding 12 0. Pay on Overdue/Soon, Auto tag on salary deductions, ✓ Paid when paid. Turn Divider off for the first row.';

  const entryRow = await variantSet('Row/Entry', ['Expense', 'Transfer', 'Income'].map(k => ({ name: 'Type=' + k, kind: k })), row, async (c, d) => {
    const L = ENTRY_LOOK[d.kind];
    const t = TILE_TONES[L.tone];
    const s = L.sample;
    applyBox(c, { dir: 'H', gap: 12, pad: [12, 0], cross: 'CENTER', fill: 'surface' });
    size(c, 366, 'hug');
    const tl = box('Tile', { dir: 'H', main: 'CENTER', cross: 'CENTER', fill: t[0], r: 12, w: 40, h: 40 }, c);
    const code = await text(tl, s[1] || 'Tr', [13, 800], t[1], { name: 'Code' });
    if (d.kind === 'Transfer') {
      code.visible = false;
      icon('Transfer', 18, 'muted', tl);
    }
    const info = box('Info', { dir: 'V', gap: 2, w: 'fill' }, c);
    const titleRow = box('Title row', { dir: 'H', gap: 6, cross: 'CENTER', w: 'fill' }, info);
    await text(titleRow, s[2], [15, 600], 'ink', { name: 'Title' });
    icon('Paperclip', 14, 'muted', titleRow).name = 'Receipt';
    await text(info, s[3], [12, 400], 'muted', { name: 'Detail', w: 'fill', trunc: true });
    const right = box('Right', { dir: 'V', gap: 2, cross: 'MAX' }, c);
    await text(right, s[4], [15, 700], L.amt, { name: 'Amount' });
    await text(right, s[5], [11, 400], 'muted', { name: 'Meta' });
    topLine(c);
  }, 'V');
  register('Row/Entry', entryRow, defineProps(entryRow, ['Code', 'Title', 'Detail', 'Amount', 'Meta'],
    [{ prop: 'Divider', layer: 'Divider' }, { prop: 'Receipt', layer: 'Receipt', def: false }]));
  entryRow.description = 'Activity / Recent row: 40 tile, 15/600 title, amount colored by type (expense ink, transfer muted, income primary). Receipt shows a paperclip after the title.';

  const card = await variantSet('Card/Account', [{ name: 'Kind=Balance' }, { name: 'Kind=Owed' }], row, async (c, d) => {
    const owed = d.name === 'Kind=Owed';
    const s = owed ? ACCOUNTS[3] : ACCOUNTS[0];
    applyBox(c, { dir: 'V', gap: 8, pad: 14, r: 16, fill: 'surface' });
    size(c, 148, 'hug');
    const top = box('Top', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', w: 'fill' }, c);
    await text(top, s[1], [12, 600], 'muted', { name: 'Type' });
    const own = box('Owner tag', { dir: 'H', pad: [2, 6], r: 6, fill: 'divider' }, top);
    await text(own, s[2], [11, 700], 'ink', { name: 'Owner' });
    await text(c, s[3], [15, 700], 'ink', { name: 'Name' });
    const bal = box('Balance', { dir: 'V' }, c);
    await text(bal, s[4], [11, 600], owed ? 'warning' : 'muted', { name: 'Label' });
    await text(bal, s[5], [16, 800], 'ink', { name: 'Amount' });
  });
  register('Card/Account', card, defineProps(card, ['Type', 'Owner', 'Name', 'Label', 'Amount']));
  card.description = '148 wide, padding 14, radius 16. Credit cards use Kind=Owed (amber label).';

  // Navigation
  row = await section(root, 'Navigation', 'Bottom nav: 84 tall + safe-area inset, five tabs share the width (max 80 each), 22 icons, 11/800 active and 11/600 inactive. Red count badge on Upcoming.');
  const tabs = [['Home', 'Home'], ['Activity', 'Activity'], ['Upcoming', 'Upcoming'], ['Budgets', 'Budgets'], ['Accounts', 'Accounts']];
  const nav = await variantSet('Nav bar', tabs.map(t => ({ name: 'Active=' + t[0], active: t[0] })), row, async (c, d) => {
    applyBox(c, { dir: 'H', main: 'SPACE_BETWEEN', cross: 'MIN', pad: [8, 4, 0, 4], fill: 'surface', stroke: ['track', 1, true] });
    size(c, SCREEN_W, 84);
    for (const t of tabs) {
      const on = t[0] === d.active;
      const tab = box('Tab/' + t[0], { dir: 'V', gap: 4, cross: 'CENTER', w: 'fill', h: 48 }, c);
      try { tab.maxWidth = 80; } catch (e) { tab.layoutSizingHorizontal = 'FIXED'; tab.resize(80, 48); }
      icon(t[1], 22, on ? 'primary' : 'muted', tab);
      await text(tab, t[0], [11, on ? 800 : 600], on ? 'primary' : 'muted', { name: 'Label' });
      if (t[0] === 'Upcoming') {
        const b = inst('Badge', { Type: 'Count' }, tab);
        b.name = 'Badge';
        b.layoutPositioning = 'ABSOLUTE';
        b.x = 40;
        b.y = -4;
      }
    }
  }, 'V');
  register('Nav bar', nav, defineProps(nav, [], [{ prop: 'Show badge', layer: 'Badge' }]));

  // Sheet
  row = await section(root, 'Sheets');
  const sheet = makeComponent('Sheet/Attach receipt', { dir: 'V', gap: 8, pad: [20, 16, 28, 16], fill: 'surface', w: SCREEN_W }, row);
  sheet.topLeftRadius = sheet.topRightRadius = 24;
  if (NUMVAR['radius:24']) { bindNum(sheet, 'topLeftRadius', 24, 'radius'); bindNum(sheet, 'topRightRadius', 24, 'radius'); }
  const sheetTitle = box('Title', { dir: 'H', pad: [0, 4, 6, 4], w: 'fill' }, sheet);
  await text(sheetTitle, 'Attach receipt or screenshot', [17, 800]);
  for (const opt of [['Camera', 'Take a photo'], ['Image', 'Choose screenshot or photo']]) {
    const b = box('Option/' + opt[1], { dir: 'H', gap: 12, pad: [0, 16], r: 14, fill: 'background', cross: 'CENTER', w: 'fill', h: 56 }, sheet);
    icon(opt[0], 22, 'ink', b);
    await text(b, opt[1], [15, 700]);
  }
  const cap = box('Caption', { dir: 'H', pad: [2, 4, 6, 4], w: 'fill' }, sheet);
  await text(cap, 'Useful for GCash/Maya receipts, bank transfer confirmations and store receipts. JPG or PNG, up to 5 MB.', [12, 400], 'muted', { w: 'fill' });
  const cancel = box('Cancel', { dir: 'H', r: 14, fill: 'surface', main: 'CENTER', cross: 'CENTER', stroke: ['border', 1], w: 'fill', h: 50 }, sheet);
  await text(cancel, 'Cancel', [15, 700]);
  register('Sheet/Attach receipt', sheet);
  sheet.description = 'Bottom sheet: radius 24 on top, padding 20 16 28, over a 45% ink scrim.';

  // Buttons used in sheets and detail screens
  row = await section(root, 'Sheet and detail buttons', 'Sheet buttons are 50 tall, radius 14; side by side the right one is twice as wide (Cancel | Save). Small buttons are 44 tall, radius 12.');
  const SHEET_BTN = {
    Solid: ['primary', null, 'surface', 800],
    Outline: ['surface', 'border', 'ink', 700],
    Danger: ['surface', 'border', 'overdue', 700],
    'Danger solid': ['overdue', null, 'surface', 800],
  };
  const sheetBtn = await variantSet('Button/Sheet', Object.keys(SHEET_BTN).map(k => ({ name: 'Kind=' + k, k: k })), row, async (c, d) => {
    const b = SHEET_BTN[d.k];
    applyBox(c, { dir: 'H', pad: [0, 12], r: 14, main: 'CENTER', cross: 'CENTER', fill: b[0], stroke: b[1] ? [b[1], 1] : null });
    size(c, 180, 50);
    await text(c, d.k === 'Solid' ? 'Save' : d.k === 'Outline' ? 'Cancel' : 'Delete', [15, b[3]], b[2], { name: 'Label' });
  });
  register('Button/Sheet', sheetBtn, defineProps(sheetBtn, ['Label']));

  const smallBtn = await variantSet('Button/Small', [{ name: 'Kind=Solid' }, { name: 'Kind=Outline' }], row, async (c, d) => {
    const solid = d.name === 'Kind=Solid';
    applyBox(c, { dir: 'H', pad: [0, 12], r: 12, main: 'CENTER', cross: 'CENTER', fill: solid ? 'primary' : 'surface', stroke: solid ? null : ['primary', 1] });
    size(c, 170, 44);
    await text(c, solid ? 'Add as Bank fees' : 'Add missed purchase', [14, 800], solid ? 'surface' : 'primary', { name: 'Label' });
  });
  register('Button/Small', smallBtn, defineProps(smallBtn, ['Label']));

  // Detail rows and calendar
  row = await section(root, 'Detail rows and calendar', 'Label / value rows for detail cards (padding 12 0; 14 0 on Entry details). Calendar days are 44 tall pills, 7 to a row with a gap of 2.');
  const fact = makeComponent('Row/Fact', { dir: 'H', main: 'SPACE_BETWEEN', gap: 12, pad: [12, 0], fill: 'surface', w: 366 }, row);
  await text(fact, 'Lender', [14, 600], 'muted', { name: 'Label' });
  await text(fact, 'BDO Auto Loan', [14, 700], 'ink', { name: 'Value', align: 'RIGHT' });
  topLine(fact);
  register('Row/Fact', fact, defineProps(fact, ['Label', 'Value'], [{ prop: 'Divider', layer: 'Divider' }]));

  const DAY = {
    Default: [null, 'ink', 600, null],
    Today: [null, 'ink', 800, 'primary'],
    Selected: ['primary', 'surface', 800, null],
    Disabled: [null, 'input-border', 600, null],
  };
  const day = await variantSet('Day', Object.keys(DAY).map(k => ({ name: 'State=' + k, k: k })), row, async (c, d) => {
    const st = DAY[d.k];
    applyBox(c, { dir: 'H', main: 'CENTER', cross: 'CENTER', fill: st[0], stroke: st[3] ? [st[3], 1] : null });
    c.cornerRadius = 22;
    size(c, 55, 44);
    await text(c, '26', [14, st[2]], st[1], { name: 'Label' });
  });
  register('Day', day, defineProps(day, ['Label']));
  day.description = 'Calendar day. Today has a 1px primary ring; Disabled is for days after today, and on Pay for days before the statement date.';

  const entryDate = makeComponent('Sheet/Entry date', { dir: 'V', gap: 10, pad: [20, 16, 28, 16], fill: 'surface', w: SCREEN_W }, row);
  topRadius(entryDate, 24);
  await datePicker(entryDate, {
    title: 'Entry date', selected: TODAY,
    note: 'The entry counts in the month of this date. Dates after today are greyed out.',
  });
  register('Sheet/Entry date', entryDate);
  entryDate.description = 'Opens from the date button on Quick add. Days after today are greyed out; the month arrow to next month is disabled.';
}

// ---------------------------------------------------------------------------
// Screens
// ---------------------------------------------------------------------------

function screenFrame(page, name, fill, x, h) {
  const s = figma.createFrame();
  s.name = name;
  applyBox(s, { dir: 'V', fill: fill, clip: true });
  place(page, s, SCREEN_W, h);
  s.x = x;
  s.y = 0;
  tag(s);
  return s;
}

// Screen without a nav bar, at the mockup's full height. o: gap, pad
function detailScreen(page, name, fill, x, h, o) {
  const s = screenFrame(page, name, fill, x);
  applyBox(s, Object.assign({ dir: 'V', fill: fill, clip: true }, o));
  s.primaryAxisSizingMode = 'FIXED';
  s.counterAxisSizingMode = 'FIXED';
  s.resize(SCREEN_W, h);
  return s;
}

async function label(page, chars, x, y) {
  const t = await text(page, chars, [16, 700], 'muted');
  t.x = x;
  t.y = (y || 0) - 40;
  tag(t);
}

function iconButton(parent, iconName, px, iconPx, name) {
  const b = box(name || iconName, { dir: 'H', main: 'CENTER', cross: 'CENTER', w: px, h: px }, parent);
  icon(iconName, iconPx, 'ink', b);
  return b;
}

function peso(n) {
  const v = Math.abs(n).toFixed(2).split('.');
  return (n < 0 ? '−' : '') + '₱' + v[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + v[1];
}

function dayLabel(d) {
  return d === TODAY ? 'Today' : d === TODAY - 1 ? 'Yesterday' : 'Oct ' + d;
}

function topRadius(f, r) {
  f.topLeftRadius = f.topRightRadius = r;
  f.bottomLeftRadius = f.bottomRightRadius = 0;
  bindNum(f, 'topLeftRadius', r, 'radius');
  bindNum(f, 'topRightRadius', r, 'radius');
}

function bottomLine(frame) {
  setStroke(frame, 'divider', 1);
  frame.strokeTopWeight = frame.strokeRightWeight = frame.strokeLeftWeight = 0;
  frame.strokeBottomWeight = 1;
}

// Header of a detail screen: back or close button pulled 10 left so its icon lines up with
// the edge, a centered title (or one right after the button), and an optional text action.
async function topBar(parent, o) {
  const h = box('Header', { w: 'fill', h: 44 }, parent);
  const back = iconButton(h, o.icon || 'ChevronLeft', 44, 22, o.icon === 'Close' ? 'Close' : 'Back');
  back.x = -10;
  back.y = 0;
  const t = await text(h, o.title, o.titleSpec || [17, 800]);
  t.y = Math.round((44 - t.height) / 2);
  if (o.left) {
    t.x = 38;
  } else {
    t.x = Math.round((h.width - t.width) / 2);
    t.constraints = { horizontal: 'CENTER', vertical: 'CENTER' };
  }
  let action = null;
  if (o.action) {
    action = await text(h, o.action, [15, 800], 'primary', { name: 'Action/' + o.action });
    action.x = h.width - action.width;
    action.y = Math.round((44 - action.height) / 2);
    action.constraints = { horizontal: 'MAX', vertical: 'CENTER' };
  }
  return { header: h, back: back, action: action };
}

// Labelled form field. o: h (46), spec of the value text, focus (2px primary border), w
async function field(parent, labelText, value, o) {
  o = o || {};
  const f = box(labelText, { dir: 'V', gap: 6, w: o.w || 'fill' }, parent);
  await text(f, labelText, [13, 700], 'muted', { w: 'fill' });
  const input = box('Input', {
    dir: 'H', pad: [0, 14], r: 12, fill: 'surface', cross: 'CENTER',
    stroke: [o.focus ? 'primary' : 'input-border', o.focus ? 2 : 1], w: 'fill', h: o.h || 46,
  }, f);
  if (value) await text(input, value, o.spec || [15, 400], 'ink', { name: 'Value', w: 'fill', trunc: true });
  return f;
}

// Selectable card: centered (Pay amount options) or left-aligned (o.left, Add loan methods).
async function optionCard(parent, title, sub, on, o) {
  o = o || {};
  const c = box(title, {
    dir: 'V', gap: 2, pad: o.left ? [0, 12] : 0, r: 12, main: 'CENTER', cross: o.left ? 'MIN' : 'CENTER',
    fill: on ? 'primary-tint' : 'surface', stroke: [on ? 'primary' : 'track', 2], w: 'fill', h: o.h || 56,
  }, parent);
  await text(c, title, [o.left ? 14 : 13, 800]);
  await text(c, sub, [o.left ? 11 : 12, 600], 'muted');
  return c;
}

async function labelTag(parent, chars, fill, color, pad, r) {
  const t = box(chars, { dir: 'H', pad: pad || [2, 6], r: r || 6, fill: fill || 'divider', cross: 'CENTER' }, parent);
  await text(t, chars, [r === 8 ? 12 : 11, r === 8 ? 800 : 700], color || 'ink');
  return t;
}

// Pill with a dashed border, for "+ Health" style add buttons.
async function dashedPill(parent, chars, o) {
  o = o || {};
  const p = box(chars, { dir: 'H', gap: 8, pad: [0, o.padX || 14], r: o.r || 18, fill: o.fill === undefined ? 'surface' : o.fill,
    main: 'CENTER', cross: 'CENTER', stroke: ['dashed', 1], w: o.w, h: o.h || 36 }, parent);
  p.dashPattern = [4, 3];
  await text(p, chars, [o.size || 13, 700], o.color || 'ink');
  return p;
}

function segTrack(parent, labels, on, o) {
  o = o || {};
  const t = box(o.name || 'Segmented', { dir: 'H', gap: 4, pad: 4, r: 12, fill: o.track || 'track', w: 'fill' }, parent);
  const items = labels.map(l => inst('Segment', { Size: o.large ? 'Large' : 'Small', State: l === on ? 'On' : 'Off', Label: l }, t, 'fill', o.h));
  if (o.flat) for (const i of items) i.effects = [];
  return t;
}

async function card(parent, name, o) {
  return box(name, Object.assign({ dir: 'V', r: 20, fill: 'surface', w: 'fill' }, o), parent);
}

function factRows(parent, rows, pad) {
  return rows.map((r, i) => {
    const f = inst('Row/Fact', { Label: r[0], Value: r[1], Divider: i > 0 }, parent, 'fill');
    f.name = r[0];
    if (pad) { f.paddingTop = pad; f.paddingBottom = pad; f.itemSpacing = 16; }
    return f;
  });
}

// Full-screen scrim with a bottom sheet in it, added on top of an auto-layout screen.
function overlay(screen, pad, gap, name) {
  const o = box('Overlay', { dir: 'V', main: 'MAX', fill: 'scrim' }, screen);
  o.layoutPositioning = 'ABSOLUTE';
  o.primaryAxisSizingMode = 'FIXED';
  o.counterAxisSizingMode = 'FIXED';
  o.resize(screen.width, screen.height);
  o.x = 0;
  o.y = 0;
  o.constraints = { horizontal: 'STRETCH', vertical: 'STRETCH' };
  const s = box(name || 'Sheet', { dir: 'V', gap: gap, pad: pad, fill: 'surface', w: 'fill' }, o);
  topRadius(s, 24);
  return s;
}

// Two sheet buttons side by side, the right one twice as wide.
function sheetButtons(parent, left, right, leftKind, rightKind) {
  const row = box('Buttons', { dir: 'H', gap: 10, w: 'fill' }, parent);
  const unit = (row.width - 10) / 3;
  const a = inst('Button/Sheet', { Kind: leftKind || 'Outline', Label: left }, row, unit);
  const b = inst('Button/Sheet', { Kind: rightKind || 'Solid', Label: right }, row, unit * 2);
  return { row: row, left: a, right: b };
}

function evenButtons(parent, defs) {
  const row = box('Buttons', { dir: 'H', gap: 10, w: 'fill' }, parent);
  return defs.map(d => inst('Button/Sheet', { Kind: d[0], Label: d[1] }, row, 'fill'));
}

// Calendar sheet content. Days after today are greyed out; minDay greys out the days before
// it too (Pay: days before the statement date belong to the previous statement).
async function datePicker(s, o) {
  const titleRow = box('Title row', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', gap: 8, w: 'fill' }, s);
  const tw = box('Title', { dir: 'H', pad: [0, 4] }, titleRow);
  await text(tw, o.title, [17, 800]);
  const quick = box('Quick picks', { dir: 'H', gap: 8 }, titleRow);
  for (const q of [TODAY, TODAY - 1]) inst('Chip/Filter', { State: o.selected === q ? 'Selected' : 'Default', Label: dayLabel(q) }, quick);

  const month = box('Month', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', w: 'fill' }, s);
  iconButton(month, 'ChevronLeft', 44, 20, 'Previous month');
  await text(month, 'October 2026', [15, 800]);
  recolor(iconButton(month, 'ChevronRight', 44, 20, 'Next month (not available)'), 'input-border');

  const grid = box('Days', { dir: 'V', gap: 2, w: 'fill' }, s);
  const head = box('Weekdays', { dir: 'H', gap: 2, w: 'fill' }, grid);
  for (const w of ['S', 'M', 'T', 'W', 'T', 'F', 'S']) {
    const c = box(w, { dir: 'H', main: 'CENTER', pad: [0, 0, 4, 0], w: 'fill' }, head);
    await text(c, w, [11, 700], 'muted');
  }
  const cells = [];
  for (let b = 0; b < FIRST_WEEKDAY; b++) cells.push(0);
  for (let d = 1; d <= 31; d++) cells.push(d);
  while (cells.length % 7) cells.push(0);
  for (let r = 0; r < cells.length / 7; r++) {
    const week = box('Week ' + (r + 1), { dir: 'H', gap: 2, w: 'fill' }, grid);
    for (const d of cells.slice(r * 7, r * 7 + 7)) {
      if (!d) { spacer(week, 'fill', 44); continue; }
      const off = d > TODAY || d < (o.minDay || 1);
      const state = d === o.selected ? 'Selected' : off ? 'Disabled' : d === TODAY ? 'Today' : 'Default';
      inst('Day', { State: state, Label: String(d) }, week, 'fill').name = 'Oct ' + d;
    }
  }
  if (o.status) {
    const st = box('Status', { dir: 'H', pad: [12, 14], r: 12, fill: 'primary-tint', w: 'fill' }, s);
    await text(st, o.status, [13, 700], 'primary', { w: 'fill' });
  }
  await text(s, o.note, [12, 400], 'muted', { w: 'fill' });
  return sheetButtons(s, 'Cancel', 'Use ' + dayLabel(o.selected));
}

// Keeps a layer in place while the frame scrolls in Present mode.
function fixWhileScrolling(node) {
  try { node.scrollBehavior = 'FIXED'; } catch (e) { /* older API: numberOfFixedChildren below covers it */ }
}

// Tab screens are phone height: only the content scrolls, the nav bar and + stay on screen.
// The screen becomes a plain frame (no auto layout) with the content at the bottom of the
// layer stack and the nav and + on top, which is how Figma pins layers while scrolling.
// The content gets room for the nav plus the usual 96 so the + never covers the last row.
function tabBar(screen, content, active) {
  bindNum(content, 'paddingBottom', NAV_H + 96, 'space');
  content.layoutSizingHorizontal = 'FIXED';
  screen.layoutMode = 'NONE';
  screen.resize(SCREEN_W, SCREEN_H);
  screen.clipsContent = true;
  screen.overflowDirection = 'VERTICAL';
  content.resize(SCREEN_W, content.height);
  content.x = 0;
  content.y = 0;
  content.constraints = { horizontal: 'STRETCH', vertical: 'MIN' };

  const nav = inst('Nav bar', { Active: active }, screen);
  nav.resize(SCREEN_W, nav.height);
  nav.x = 0;
  nav.y = SCREEN_H - nav.height;
  nav.constraints = { horizontal: 'STRETCH', vertical: 'MAX' };
  const fab = inst('FAB', {}, screen);
  fab.x = SCREEN_W - 16 - 60;
  fab.y = SCREEN_H - NAV_H - 78;
  fab.constraints = { horizontal: 'MAX', vertical: 'MAX' };

  fixWhileScrolling(nav);
  fixWhileScrolling(fab);
  try { screen.numberOfFixedChildren = 2; } catch (e) { /* scrollBehavior above covers it */ }
  for (const n of [nav, fab]) {
    const fixed = n.scrollBehavior === 'FIXED' || (screen.numberOfFixedChildren || 0) >= 2;
    if (!fixed) {
      stats.fixFailures++;
      console.warn('Could not fix ' + n.name + ' while scrolling.');
    }
  }
  return { nav: nav, fab: fab };
}

async function cardHeader(parent, title, linkText, pad) {
  const h = box('Header', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', pad: pad, w: 'fill' }, parent);
  await text(h, title, [16, 700]);
  let link = null;
  if (linkText) link = await text(h, linkText, [14, 700], 'primary', { name: 'Link/' + linkText });
  return link;
}

function dueRow(parent, d, divider) {
  const r = inst('Row/Due', {
    Kind: d[0], Code: d[1], Name: d[2], Status: d[3], Who: d[4], Amount: d[5], Divider: divider,
  }, parent, 'fill');
  r.name = 'Due/' + d[2];
  return r;
}

async function buildDashboard(page, x) {
  const s = screenFrame(page, '1 · Dashboard', 'background', x);
  const main = box('Content', { dir: 'V', gap: 20, pad: [20, 16, 96, 16], w: 'fill' }, s);

  // Header: household + month switcher, avatars
  const header = box('Header', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', w: 'fill' }, main);
  const hl = box('Title', { dir: 'V', gap: 2 }, header);
  await text(hl, 'Our household', [13, 600], 'muted');
  const month = box('Month', { dir: 'H', gap: 4, cross: 'CENTER' }, hl);
  iconButton(month, 'ChevronLeft', 32, 20, 'Previous month');
  await text(month, 'October 2026', [22, 800]);
  iconButton(month, 'ChevronRight', 32, 20, 'Next month');
  const avatars = box('Household', { dir: 'H', gap: -6, cross: 'CENTER' }, header);
  inst('Avatar', { Tone: 'Primary', Initials: 'Jo' }, avatars);
  inst('Avatar', { Tone: 'Accent', Initials: 'Ja' }, avatars);

  // Month summary
  const sum = box('Month summary', { dir: 'V', gap: 16, pad: 20, r: 20, fill: 'surface', w: 'fill' }, main);
  const spent = box('Spent', { dir: 'V', gap: 4, w: 'fill' }, sum);
  await text(spent, 'Spent this month', [13, 600], 'muted');
  await text(spent, '₱38,420.50', [36, 800, -0.5]);
  await text(spent, 'Day 26 of 31 · about ₱1,478 per day', [13, 400], 'muted');
  const cells = box('Totals', { dir: 'H', gap: 8, w: 'fill' }, sum);
  for (const c of [['Income', '₱52,000', 'primary'], ['Expenses', '₱38,421', 'ink'], ['Net', '+₱13,580', 'primary']]) {
    const cell = box(c[0], { dir: 'V', gap: 2, pad: [10, 12], r: 12, fill: 'background', w: 'fill' }, cells);
    await text(cell, c[0], [11, 600], 'muted');
    await text(cell, c[1], [15, 700], c[2]);
  }
  const nc = box('Not counted', { dir: 'V', gap: 4, pad: [12, 0, 0, 0], stroke: ['divider', 1, true], w: 'fill' }, sum);
  await text(nc, 'Not counted as spending', [12, 700], 'muted');
  for (const r of [['Loan payments', '₱15,320'], ['Salary deductions (SSS, Pag-IBIG)', '₱3,490']]) {
    const line = box(r[0], { dir: 'H', main: 'SPACE_BETWEEN', w: 'fill' }, nc);
    await text(line, r[0], [12, 400], 'muted');
    await text(line, r[1], [12, 700], 'ink');
  }

  // Due this month
  const due = box('Due this month', { dir: 'V', pad: [18, 16, 8, 16], r: 20, fill: 'surface', w: 'fill' }, main);
  const seeAll = await cardHeader(due, 'Due in October', 'See all 8');
  const stat = box('Paid summary', { dir: 'H', main: 'SPACE_BETWEEN', pad: [10, 0, 6, 0], w: 'fill' }, due);
  const paid = box('Paid', { dir: 'H', gap: 4 }, stat);
  await text(paid, '₱26,879', [13, 700], 'ink');
  await text(paid, 'of ₱42,635 paid', [13, 400], 'muted');
  await text(stat, '1 overdue · 2 due soon', [13, 700], 'overdue');
  const pw = box('Progress wrap', { dir: 'V', pad: [0, 0, 6, 0], w: 'fill' }, due);
  progress(pw, 0.63, 'chart-2', 8);
  DASH_DUES.forEach((d, i) => dueRow(due, d, i > 0));
  const pl = box('Paid line', { dir: 'H', gap: 8, cross: 'CENTER', stroke: ['divider', 1, true], w: 'fill', h: 44 }, due);
  icon('Check', 16, 'primary', pl);
  await text(pl, '3 paid: Car loan, BPI Visa SOA, PLDT Fiber', [13, 700], 'primary');

  // Where it went
  const where = box('Where it went', { dir: 'V', gap: 14, pad: 20, r: 20, fill: 'surface', w: 'fill' }, main);
  await text(where, 'Where it went', [16, 700]);
  const bar = box('Stacked bar', { dir: 'H', gap: 2, r: 6, clip: true, w: 'fill', h: 12 }, where);
  const usable = bar.width - 2 * (BREAKDOWN.length - 1);
  BREAKDOWN.forEach((b, i) => {
    const seg = rect(bar, b[0], b[4], usable * b[3], 12);
    if (i === BREAKDOWN.length - 1) seg.layoutSizingHorizontal = 'FILL';
    else seg.layoutSizingHorizontal = 'FIXED';
  });
  const legend = box('Legend', { dir: 'V', gap: 10, w: 'fill' }, where);
  for (const b of BREAKDOWN) {
    const r = box(b[0], { dir: 'H', gap: 10, cross: 'CENTER', w: 'fill' }, legend);
    rect(r, 'Swatch', b[4], 10, 10, 3);
    await text(r, b[0], [14, 600], 'ink', { w: 'fill' });
    await text(r, b[2], [14, 400], 'muted', { w: 40, align: 'RIGHT' });
    await text(r, b[1], [14, 700], 'ink', { w: 84, align: 'RIGHT' });
  }

  // Budgets
  const bud = box('Budgets', { dir: 'V', gap: 16, pad: 20, r: 20, fill: 'surface', w: 'fill' }, main);
  const budgetsLink = await cardHeader(bud, 'Budgets', 'See all');
  for (const b of BUDGETS) {
    const item = box(b[0], { dir: 'V', gap: 6, w: 'fill' }, bud);
    const top = box('Top', { dir: 'H', main: 'SPACE_BETWEEN', w: 'fill' }, item);
    await text(top, b[0], [14, 600]);
    const amt = box('Amount', { dir: 'H', gap: 4 }, top);
    await text(amt, b[1], [14, 700]);
    await text(amt, '/ ' + b[2], [14, 400], 'muted');
    progress(item, b[3], b[4], 8);
    await text(item, b[5], [12, 600], b[6]);
  }

  // Accounts (horizontal scroller bleeds to the right edge)
  const acc = box('Accounts', { dir: 'V', gap: 12, w: 'fill' }, main);
  const manage = await cardHeader(acc, 'Accounts', 'Manage', [0, 4]);
  const scroller = box('Scroller', { dir: 'H', gap: 10, clip: true, w: SCREEN_W - 16 }, acc);
  for (const a of ACCOUNTS) {
    inst('Card/Account', { Kind: a[0], Type: a[1], Owner: a[2], Name: a[3], Label: a[4], Amount: a[5] }, scroller);
  }

  // Recent
  const rec = box('Recent', { dir: 'V', pad: [8, 16], r: 20, fill: 'surface', w: 'fill' }, main);
  const recentLink = await cardHeader(rec, 'Recent', 'See all', [12, 0, 4, 0]);
  const recent = RECENT.map(r => {
    const e = inst('Row/Entry', { Type: r[0], Code: r[1] || 'Tr', Title: r[2], Detail: r[3], Amount: r[4], Meta: r[5] }, rec, 'fill');
    e.name = 'Entry/' + r[2];
    return e;
  });

  const tabs = tabBar(s, main, 'Home');
  return {
    frame: s, nav: tabs.nav, fab: tabs.fab, seeAll: seeAll, settings: avatars,
    budgetsLink: budgetsLink, manage: manage, recentLink: recentLink, recent: recent,
  };
}

async function buildQuickAdd(page, x) {
  const s = screenFrame(page, '2 · Quick add', 'surface', x, 932);
  bindNum(s, 'paddingLeft', 16, 'space');
  bindNum(s, 'paddingRight', 16, 'space');
  bindNum(s, 'itemSpacing', 12, 'space');
  bindNum(s, 'paddingTop', 12, 'space');
  bindNum(s, 'paddingBottom', 20, 'space');

  // Header (close button sits 10px outside the padding so its icon lines up with the edge)
  const header = box('Header', { w: 'fill', h: 44 }, s);
  const close = iconButton(header, 'Close', 44, 22, 'Close');
  close.x = -10;
  close.y = 0;
  const title = await text(header, 'New entry', [17, 800]);
  title.x = Math.round((header.width - title.width) / 2);
  title.y = Math.round((44 - title.height) / 2);
  title.constraints = { horizontal: 'CENTER', vertical: 'CENTER' };

  // Expense / Income / Transfer
  const seg = box('Entry type', { dir: 'H', gap: 4, pad: 4, r: 12, fill: 'divider', w: 'fill' }, s);
  for (const t of ['Expense', 'Income', 'Transfer']) inst('Segment', { Size: 'Large', State: t === 'Expense' ? 'On' : 'Off', Label: t }, seg, 'fill');

  // Amount
  const amount = box('Amount', { dir: 'V', gap: 2, pad: [4, 0], cross: 'CENTER', w: 'fill' }, s);
  await text(amount, 'Amount', [12, 600], 'muted');
  await text(amount, '₱1,284.75', [40, 800, -0.5]);

  // Date, note, receipt
  const meta = box('Date, note, receipt', { dir: 'H', gap: 8, cross: 'CENTER', w: 'fill' }, s);
  inst('Button/Secondary', { Label: 'Today' }, meta).name = 'Entry date';
  inst('Input/Text', { Placeholder: 'Add a note (optional)' }, meta, 'fill');
  inst('Button/Icon', {}, meta);

  // Category grid
  const catWrap = box('Category', { dir: 'V', gap: 8, w: 'fill' }, s);
  await text(catWrap, 'Category', [12, 700], 'muted');
  for (let r = 0; r < 2; r++) {
    const rowF = box('Row ' + (r + 1), { dir: 'H', gap: 8, w: 'fill' }, catWrap);
    for (const c of EXPENSE_CATS.slice(r * 4, r * 4 + 4)) {
      inst('Category tile', { State: c[1] === 'Groceries' ? 'Selected' : 'Default', Code: c[0], Name: c[1] }, rowF, 'fill').name = 'Category/' + c[1];
    }
  }

  // Account chips
  const accWrap = box('Paid from', { dir: 'V', gap: 8, w: 'fill' }, s);
  await text(accWrap, 'Paid from', [12, 700], 'muted');
  const chips = box('Chips', { dir: 'H', gap: 8, clip: true, w: 'fill' }, accWrap);
  for (const a of QA_ACCOUNTS) inst('Chip/Account', { State: a === 'GCash' ? 'Selected' : 'Default', Label: a }, chips);

  spacer(s, 'fill', 'fill');

  // Keypad
  const pad = box('Keypad', { dir: 'V', gap: 6, w: 'fill' }, s);
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'];
  for (let r = 0; r < 4; r++) {
    const rowF = box('Row ' + (r + 1), { dir: 'H', gap: 6, w: 'fill' }, pad);
    for (const k of keys.slice(r * 3, r * 3 + 3)) {
      if (k === 'del') inst('Keypad key', { Kind: 'Delete' }, rowF, 'fill').name = 'Key/Delete';
      else inst('Keypad key', { Kind: 'Digit', Label: k }, rowF, 'fill').name = 'Key/' + k;
    }
  }

  const save = inst('Button/Primary', { Label: 'Save expense' }, s, 'fill');
  return { frame: s, close: close, save: save };
}

async function buildUpcoming(page, x) {
  const s = screenFrame(page, '7 · Upcoming', 'background', x);
  const main = box('Content', { dir: 'V', gap: 14, pad: [20, 16, 96, 16], w: 'fill' }, s);

  // Header: title + month switcher (pulled 8px left), add button
  const header = box('Header', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', w: 'fill' }, main);
  const col = box('Title', {}, header);
  const title = await text(col, 'Upcoming', [24, 800]);
  title.x = 0;
  title.y = 0;
  const month = box('Month', { dir: 'H', gap: 2, cross: 'CENTER' }, col);
  iconButton(month, 'ChevronLeft', 32, 18, 'Previous month');
  await text(month, 'October 2026', [14, 700]);
  iconButton(month, 'ChevronRight', 32, 18, 'Next month');
  month.x = -8;
  month.y = title.height + 2;
  col.resize(Math.max(title.width, month.width - 8), title.height + 2 + month.height);
  const addDue = inst('Button/Light', { Label: '+ Loan or bill' }, header);

  // Month progress
  const prog = box('Month progress', { dir: 'V', gap: 10, pad: [18, 20], r: 20, fill: 'surface', w: 'fill' }, main);
  await text(prog, 'Paid this month', [13, 600], 'muted');
  const amt = box('Amount', { dir: 'H', gap: 6, w: 'fill' }, prog);
  try { amt.counterAxisAlignItems = 'BASELINE'; } catch (e) { amt.counterAxisAlignItems = 'MAX'; }
  await text(amt, '₱26,879', [26, 800]);
  await text(amt, 'of ₱42,635', [16, 600], 'muted');
  progress(prog, 0.63, 'chart-2', 10);
  const counts = box('Counts', { dir: 'H', gap: 6, w: 'fill' }, prog);
  for (const c of [['1', 'Overdue', 'overdue'], ['2', 'Due soon', 'warning'], ['2', 'Auto', 'ink'], ['3', 'Paid', 'primary']]) {
    const cell = box(c[1], { dir: 'V', cross: 'CENTER', w: 'fill' }, counts);
    await text(cell, c[0], [17, 800], c[2]);
    await text(cell, c[1], [11, 600], 'muted');
  }

  // Type filter + people filter
  const seg = box('Type', { dir: 'H', gap: 4, pad: 4, r: 12, fill: 'track', w: 'fill' }, main);
  for (const t of ['All', 'Cards', 'Loans', 'Bills']) inst('Segment', { Size: 'Small', State: t === 'All' ? 'On' : 'Off', Label: t }, seg, 'fill');
  const people = box('Usually paid by', { dir: 'H', gap: 8 }, main);
  for (const p of ['Everyone', 'John', 'Janice']) inst('Chip/Filter', { State: p === 'Everyone' ? 'Selected' : 'Default', Label: p }, people);

  // Sections
  for (const sec of UPCOMING) {
    const block = box(sec[0], { dir: 'V', gap: 6, w: 'fill' }, main);
    const h = box('Heading', { dir: 'H', pad: [4, 4, 0, 4], w: 'fill' }, block);
    await text(h, sec[0], [12, 800, 0.4], sec[1]);
    const list = box('List', { dir: 'V', pad: [0, 14], r: 16, fill: 'surface', w: 'fill' }, block);
    sec[2].forEach((d, i) => dueRow(list, d, i > 0));
  }

  const bar = tabBar(s, main, 'Upcoming');
  return { frame: s, nav: bar.nav, fab: bar.fab, addDue: addDue };
}

// ---------------------------------------------------------------------------
// Screens added in Run 2 (values from the matching .dc.html mockups)
// ---------------------------------------------------------------------------

const ACTIVITY = [
  ['Today · Mon, Oct 26', 'Spent ₱1,530.75', [
    ['Expense', 'Gr', 'Puregold', 'Groceries · GCash', '−₱1,284.75', 'John', true],
    ['Transfer', '', 'ATM withdrawal', 'BDO Savings → Cash wallet', '₱5,000.00', 'Janice', false],
    ['Expense', 'Gb', 'Grab to Makati', 'Grab/Taxi · GCash', '−₱246.00', 'Janice', false],
  ]],
  ['Yesterday · Sun, Oct 25', 'Spent ₱4,569.30', [
    ['Expense', 'Di', 'Jollibee', 'Dining Out · Cash wallet', '−₱389.00', 'John', false],
    ['Income', 'Sa', 'October salary (2nd half)', 'Salary · BDO Savings', '+₱26,000.00', 'John', false],
    ['Expense', 'El', 'Meralco', 'Electricity · BDO Savings', '−₱4,180.30', 'Janice', true],
  ]],
  ['Fri, Oct 23', 'Spent ₱848.00', [
    ['Transfer', '', 'BPI Visa SOA payment', 'BDO Savings → BPI Visa · Oct SOA paid', '₱9,860.00', 'Janice', true],
    ['Expense', 'Su', 'Netflix', 'Subscriptions · BPI Visa', '−₱549.00', 'Janice', false],
    ['Expense', 'Lo', 'Globe load', 'Mobile Load · GCash', '−₱299.00', 'John', false],
  ]],
];

// [name, spent, limit]
const BUDGET_LIST = [
  ['Groceries', 9840, 12000], ['Dining Out', 4350, 4000], ['Electricity', 4180, 4500],
  ['Internet', 1699, 1699], ['Transportation', 2100, 5000], ['Subscriptions', 549, 1000], ['Shopping', 0, 3000],
];

// [group, tile, name, owner, balance, kind, note, noteColor]
const ACCOUNT_LIST = [
  ['Cash & e-wallets', 'Ca', 'Cash wallet', 'Mine', 3250, '', ''],
  ['Cash & e-wallets', 'GC', 'GCash', 'Mine', 8120.40, '', ''],
  ['Cash & e-wallets', 'My', 'Maya', 'Hers', 1540, '', ''],
  ['Bank accounts', 'BD', 'BDO Savings', 'Joint', 64300, '', ''],
  ['Bank accounts', 'BP', 'BPI Savings', 'Hers', 13500, '', ''],
  ['Credit cards', 'MC', 'Metrobank Mastercard', 'Mine', -3215.50, 'card', 'SOA due Oct 30 · ₱16,000 installments', 'warning'],
  ['Credit cards', 'Vi', 'BPI Visa', 'Hers', -12480, 'card', 'Next SOA Nov 15 · Oct paid', 'muted'],
  ['Loans', 'CL', 'Car loan', 'Joint', -321720, 'loan', '15 of 36 paid', 'muted'],
  ['Loans', 'Mo', 'Motorcycle loan', 'Mine', -77600, 'loan', '8 of 24 · 1 overdue', 'overdue'],
  ['Loans', 'SS', 'SSS salary loan', 'Mine', -9840, 'loan', '18 of 24 · salary deduction', 'muted'],
  ['Loans', 'PI', 'Pag-IBIG MPL', 'Hers', -22200, 'loan', '12 of 24 · salary deduction', 'muted'],
];

const SETTINGS_DUES = [
  ['Car loan', 'Manual · 15th · John', 'loan'], ['Motorcycle loan', 'Manual · 25th · John', 'loan'],
  ['SSS salary loan', 'Salary deduction · 30th · John', 'loan'], ['Pag-IBIG MPL', 'Salary deduction · 30th · Janice', 'loan'],
  ['Meralco', 'Bill · 28th · Janice', 'bill'], ['PLDT Fiber', 'Bill · 20th · Janice', 'bill'],
];

const EXPENSE_PARENTS = [
  ['Fo', 'Food', ['Groceries', 'Dining Out', 'Food Delivery', 'Coffee & Snacks']],
  ['Tr', 'Transportation', ['Grab/Taxi', 'Commute', 'Fuel', 'Parking & Toll', 'Car Maintenance']],
  ['Bi', 'Bills & Utilities', ['Electricity', 'Water', 'Internet', 'Mobile Load/Postpaid', 'Subscriptions']],
  ['Ho', 'Housing', ['Rent/Amortization', 'Association Dues', 'Repairs & Maintenance']],
  ['Hh', 'Household', ['Household Supplies', 'Furniture & Appliances']],
  ['He', 'Health', ['Medicine', 'Check-ups & Labs', 'HMO/Insurance']],
  ['Pc', 'Personal Care', ['Haircut & Grooming', 'Toiletries']],
  ['Sh', 'Shopping', ['Clothing', 'Gadgets', 'Online Shopping']],
  ['Fa', 'Family & Giving', ['Padala/Family Support', 'Gifts', 'Church/Donations']],
  ['Ed', 'Education', ['Tuition', 'School Supplies', 'Courses/Books']],
  ['Le', 'Leisure', ['Travel', 'Entertainment', 'Hobbies']],
  ['Gv', 'Gov’t & Fees', ['SSS/PhilHealth/Pag-IBIG', 'Taxes', 'Bank & Transfer Fees']],
  ['Mi', 'Miscellaneous', ['Uncategorized cash']],
];

async function buildLogin(page, x) {
  const s = detailScreen(page, '0 · Login', 'surface', x, SCREEN_H, { gap: 28, pad: [72, 24, 32, 24] });

  const intro = box('Intro', { dir: 'V', gap: 14, w: 'fill' }, s);
  const logo = box('Logo', { dir: 'H', main: 'CENTER', cross: 'CENTER', fill: 'primary', w: 56, h: 56 }, intro);
  logo.cornerRadius = 18;
  await text(logo, '₱', [26, 800], 'surface');
  await text(intro, 'Welcome back', [30, 800, -0.5]);
  await text(intro, 'Log in to see this month’s spending.', [15, 400], 'muted', { w: 'fill' });

  segTrack(s, ['Log in', 'Create account'], 'Log in', { name: 'Mode', track: 'divider', large: true, h: 38, flat: true });

  const form = box('Form', { dir: 'V', gap: 14, w: 'fill' }, s);
  await field(form, 'Email', '', { h: 50 });
  await field(form, 'Password', '', { h: 50 });
  const ctaWrap = box('Log in button', { dir: 'V', pad: [6, 0, 0, 0], w: 'fill' }, form);
  const cta = inst('Button/Primary', { Label: 'Log in' }, ctaWrap, 'fill');
  return { frame: s, cta: cta };
}

async function buildActivity(page, x) {
  const s = screenFrame(page, '3 · Activity', 'background', x);
  const main = box('Content', { dir: 'V', gap: 14, pad: [20, 16, 96, 16], w: 'fill' }, s);

  const header = box('Header', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', w: 'fill' }, main);
  await text(header, 'Activity', [24, 800]);
  const search = box('Search notes', { dir: 'H', main: 'CENTER', cross: 'CENTER', r: 12, fill: 'surface', w: 44, h: 44 }, header);
  icon('Search', 20, 'ink', search);

  // Filter chips scroll sideways and bleed off the right edge
  const filters = box('Filters', { dir: 'H', gap: 8, clip: true, w: SCREEN_W - 16 }, main);
  ['October 2026 ▾', 'All accounts ▾', 'All categories ▾', 'Bills & loans', 'Logged by: Both ▾'].forEach((f, i) => {
    const c = inst('Chip/Filter', { State: i === 0 ? 'Selected' : 'Default', Label: f }, filters, undefined, 36);
    c.cornerRadius = 18;
  });

  segTrack(main, ['All', 'Expenses', 'Income', 'Transfers'], 'All', { name: 'Entry type' });

  const totals = box('Totals', { dir: 'H', gap: 8, w: 'fill' }, main);
  for (const t of [['Money in', '+₱52,000.00', 'primary'], ['Money out', '−₱38,420.50', 'ink']]) {
    const c = box(t[0], { dir: 'V', gap: 2, pad: [12, 14], r: 14, fill: 'surface', w: 'fill' }, totals);
    await text(c, t[0], [12, 600], 'muted');
    await text(c, t[1], [18, 800], t[2]);
  }

  const metaStyle = textStyle([11, 700]);
  const rows = [];
  for (const g of ACTIVITY) {
    const sec = box(g[0], { dir: 'V', gap: 6, w: 'fill' }, main);
    const h = box('Heading', { dir: 'H', main: 'SPACE_BETWEEN', pad: [4, 4, 0, 4], w: 'fill' }, sec);
    await text(h, g[0], [12, 700], 'muted');
    await text(h, g[1], [12, 700], 'muted');
    const list = box('List', { dir: 'V', pad: [0, 14], r: 16, fill: 'surface', w: 'fill' }, sec);
    for (let i = 0; i < g[2].length; i++) {
      const r = g[2][i];
      const e = inst('Row/Entry', {
        Type: r[0], Code: r[1] || 'Tr', Title: r[2], Detail: r[3], Amount: r[4], Meta: 'by ' + r[5], Divider: i > 0, Receipt: r[6],
      }, list, 'fill');
      e.name = 'Entry/' + r[2];
      const meta = e.findOne(n => n.name === 'Meta' && n.type === 'TEXT');
      if (meta) await meta.setTextStyleIdAsync(metaStyle.id);
      rows.push(e);
    }
  }

  const bar = tabBar(s, main, 'Activity');
  return { frame: s, nav: bar.nav, fab: bar.fab, rows: rows };
}

async function buildEntryDetails(page, x) {
  const s = detailScreen(page, '3b · Entry details', 'background', x, 1000, { gap: 16, pad: [12, 16, 24, 16] });
  const top = await topBar(s, { title: 'Entry details', action: 'Edit' });

  const sum = await card(s, 'Summary', { gap: 8, pad: [24, 20], cross: 'CENTER' });
  const tile = box('Tile', { dir: 'H', main: 'CENTER', cross: 'CENTER', fill: 'primary-tint', r: 16, w: 52, h: 52 }, sum);
  await text(tile, 'Gr', [16, 800], 'chart-1');
  await text(sum, 'Puregold', [17, 700]);
  await text(sum, '−₱1,284.75', [34, 800, -0.5]);
  await labelTag(sum, 'Expense', 'divider', 'ink', [3, 8]);

  const details = await card(s, 'Details', { pad: [0, 16] });
  factRows(details, [['Category', 'Food › Groceries'], ['Account', 'GCash · Mine'], ['Date', 'Mon, Oct 26, 2026'], ['Note', 'Weekly groceries + 25 kg rice']], 14);

  const rec = await card(s, 'Receipt', { dir: 'H', gap: 14, pad: 16, cross: 'CENTER' });
  const thumb = box('Thumbnail', { dir: 'V', gap: 5, pad: [10, 8], r: 10, fill: 'paper', stroke: ['border', 1], w: 72, h: 96 }, rec);
  for (const b of [[0.7, 5, 'chart-4'], [1, 4, 'track'], [0.85, 4, 'track'], [1, 4, 'track'], [0.6, 4, 'track']]) rect(thumb, 'Line', b[2], 56 * b[0], b[1], 2);
  spacer(thumb, 'fill', 'fill');
  const total = box('Total line', { dir: 'H', main: 'MAX', w: 'fill' }, thumb);
  rect(total, 'Line', 'chart-4', 28, 5, 2);
  const info = box('Info', { dir: 'V', gap: 4, w: 'fill' }, rec);
  await text(info, 'Receipt', [15, 700]);
  await text(info, 'Screenshot_2026-10-26.jpg · 1.2 MB', [12, 400], 'muted', { w: 'fill', trunc: true });
  const acts = box('Actions', { dir: 'H', gap: 14 }, info);
  for (const a of ['View', 'Replace']) {
    const b = box(a, { dir: 'H', cross: 'CENTER', h: 36 }, acts);
    await text(b, a, [13, 800], 'primary');
  }

  const hist = box('History', { dir: 'V', gap: 8, pad: [0, 4], w: 'fill' }, s);
  await text(hist, 'History', [12, 700], 'muted');
  for (const h of [['Jo', 'primary', 'surface', 'You (John) added this', 'Oct 26, 9:14 AM'], ['Ja', 'accent', 'ink', 'Janice changed the amount', 'Oct 26, 6:02 PM']]) {
    const r = box(h[3], { dir: 'H', gap: 10, cross: 'CENTER', w: 'fill' }, hist);
    const av = box('Avatar', { dir: 'H', main: 'CENTER', cross: 'CENTER', fill: h[1], w: 28, h: 28 }, r);
    av.cornerRadius = 14;
    await text(av, h[0], [11, 800], h[2]);
    const line = box('Text', { dir: 'H', gap: 4 }, r);
    await text(line, h[3], [13, 700]);
    await text(line, '· ' + h[4], [13, 400], 'muted');
  }

  spacer(s, 'fill', 'fill');
  const btns = evenButtons(s, [['Outline', 'Duplicate'], ['Danger', 'Delete']]);
  return { frame: s, back: top.back, edit: top.action, duplicate: btns[0] };
}

async function buildBudgets(page, x) {
  const s = screenFrame(page, '4 · Budgets', 'background', x);
  const main = box('Content', { dir: 'V', gap: 16, pad: [20, 16, 96, 16], w: 'fill' }, s);

  const header = box('Header', { dir: 'V', gap: 2, w: 'fill' }, main);
  await text(header, 'October 2026', [13, 600], 'muted');
  await text(header, 'Budgets', [24, 800]);

  const total = await card(main, 'Budget total', { gap: 10, pad: [18, 20] });
  const tr = box('Top', { dir: 'H', main: 'SPACE_BETWEEN', w: 'fill' }, total);
  await text(tr, 'Spent of budgeted', [13, 600], 'muted');
  await text(tr, '73%', [13, 700], 'muted');
  const amt = box('Amount', { dir: 'H', gap: 6, w: 'fill' }, total);
  try { amt.counterAxisAlignItems = 'BASELINE'; } catch (e) { amt.counterAxisAlignItems = 'MAX'; }
  await text(amt, '₱22,718', [26, 800]);
  await text(amt, '/ ₱31,199', [16, 600], 'muted');
  progress(total, 0.73, 'chart-2', 10);
  await text(total, '1 over · 3 near the limit · 5 days left', [12, 400], 'muted');

  const list = await card(main, 'Category budgets', { pad: [4, 16] });
  const fmt = n => '₱' + n.toLocaleString('en-US');
  for (let i = 0; i < BUDGET_LIST.length; i++) {
    const b = BUDGET_LIST[i];
    const pct = Math.round(b[1] / b[2] * 100);
    const over = b[1] > b[2];
    const barKey = over ? 'overdue' : pct >= 80 ? 'accent' : 'chart-2';
    const noteKey = over ? 'overdue' : pct >= 80 ? 'warning' : 'muted';
    const note = over ? 'Over by ' + fmt(b[1] - b[2]) : pct + '% used · ' + fmt(b[2] - b[1]) + ' left';
    const item = box(b[0], { dir: 'V', gap: 6, pad: [14, 0], fill: 'surface', w: 'fill' }, list);
    const top = box('Top', { dir: 'H', main: 'SPACE_BETWEEN', w: 'fill' }, item);
    await text(top, b[0], [14, 700]);
    const a = box('Amount', { dir: 'H', gap: 4 }, top);
    await text(a, fmt(b[1]), [14, 700]);
    await text(a, '/ ' + fmt(b[2]), [14, 400], 'muted');
    progress(item, Math.min(pct, 100) / 100, barKey, 8);
    await text(item, note, [12, 700], noteKey);
    if (i > 0) topLine(item);
  }

  const none = box('No limit set', { dir: 'V', gap: 8, w: 'fill' }, main);
  const nh = box('Heading', { dir: 'H', pad: [0, 4] }, none);
  await text(nh, 'No limit set', [14, 700], 'muted');
  const chips = box('Categories', { dir: 'H', gap: 8, wrap: 8, w: 'fill' }, none);
  for (const n of ['Health', 'Personal Care', 'Family & Giving', 'Leisure', 'Education']) await dashedPill(chips, '+ ' + n);

  const bar = tabBar(s, main, 'Budgets');
  return { frame: s, nav: bar.nav, fab: bar.fab };
}

async function buildAccounts(page, x) {
  const s = screenFrame(page, '5 · Accounts', 'background', x);
  const main = box('Content', { dir: 'V', gap: 16, pad: [20, 16, 96, 16], w: 'fill' }, s);

  const header = box('Header', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', w: 'fill' }, main);
  await text(header, 'Accounts', [24, 800]);
  const add = box('Add account', { dir: 'H', pad: [0, 14], r: 12, fill: 'primary', cross: 'CENTER', h: 40 }, header);
  await text(add, '+ Add account', [14, 800], 'surface');

  let assets = 0, cards = 0, loans = 0;
  for (const a of ACCOUNT_LIST) {
    if (a[5] === 'card') cards -= a[4];
    else if (a[5] === 'loan') loans -= a[4];
    else assets += a[4];
  }
  const whole = n => '₱' + Math.round(n).toLocaleString('en-US');
  const totals = await card(main, 'Totals', { gap: 14, pad: [18, 20], fill: 'ink' });
  const net = box('Net worth', { dir: 'V', gap: 2, w: 'fill' }, totals);
  await text(net, 'Net worth (household)', [13, 600], 'chart-4');
  await text(net, peso(assets - cards - loans), [30, 800], 'surface');
  const cells = box('Breakdown', { dir: 'H', gap: 8, w: 'fill' }, totals);
  for (const c of [['Cash & savings', whole(assets), 'surface'], ['Owed on cards', whole(cards), 'on-dark-warning'], ['Left on loans', whole(loans), 'on-dark-warning']]) {
    const cell = box(c[0], { dir: 'V', gap: 2, w: 'fill' }, cells);
    await text(cell, c[0], [12, 600], 'chart-4');
    await text(cell, c[1], [15, 700], c[2]);
  }

  segTrack(main, ['Everyone', 'Mine', 'Hers', 'Joint'], 'Everyone', { name: 'Owner' });

  const rows = {};
  for (const g of ['Cash & e-wallets', 'Bank accounts', 'Credit cards', 'Loans']) {
    const sec = box(g, { dir: 'V', gap: 6, w: 'fill' }, main);
    const h = box('Heading', { dir: 'H', pad: [0, 4] }, sec);
    await text(h, g, [12, 700], 'muted');
    const list = box('List', { dir: 'V', pad: [0, 14], r: 16, fill: 'surface', w: 'fill' }, sec);
    const items = ACCOUNT_LIST.filter(a => a[0] === g);
    for (let i = 0; i < items.length; i++) {
      const a = items[i];
      const debt = a[5] === 'card' || a[5] === 'loan';
      const r = box('Account/' + a[2], { dir: 'H', gap: 12, pad: [13, 0], cross: 'CENTER', fill: 'surface', w: 'fill' }, list);
      const tl = box('Tile', { dir: 'H', main: 'CENTER', cross: 'CENTER', fill: debt ? 'warning-tint' : 'primary-tint', r: 12, w: 40, h: 40 }, r);
      await text(tl, a[1], [13, 800], debt ? 'warning' : 'chart-1');
      const info = box('Info', { dir: 'V', gap: 3, w: 'fill' }, r);
      await text(info, a[2], [15, 700], 'ink', { w: 'fill', trunc: true });
      const meta = box('Meta', { dir: 'H', gap: 6, cross: 'CENTER', w: 'fill' }, info);
      await labelTag(meta, a[3]);
      if (a[6]) await text(meta, a[6], [11, 600], a[7], { w: 'fill', trunc: true });
      const right = box('Right', { dir: 'V', gap: 2, cross: 'MAX' }, r);
      await text(right, a[5] === 'loan' ? 'Left to pay' : a[5] === 'card' ? 'Owed' : 'Balance', [11, 700], debt ? 'warning' : 'muted');
      await text(right, peso(Math.abs(a[4])), [15, 800]);
      if (i > 0) topLine(r);
      rows[a[2]] = r;
    }
  }

  const arch = box('Archived', { dir: 'H', main: 'CENTER', cross: 'CENTER', w: 'fill', h: 44 }, main);
  await text(arch, 'Show archived accounts (1)', [13, 700], 'primary');

  const bar = tabBar(s, main, 'Accounts');
  return { frame: s, nav: bar.nav, fab: bar.fab, rows: rows };
}

async function buildSettings(page, x) {
  const s = detailScreen(page, '6 · Settings & categories', 'background', x, 1480, { gap: 16, pad: [12, 16, 24, 16] });
  const top = await topBar(s, { title: 'Settings', titleSpec: [20, 800], left: true });

  // Household
  const hh = await card(s, 'Household', { gap: 12, pad: 16 });
  const hr = box('Title', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', w: 'fill' }, hh);
  await text(hr, 'Our household', [16, 700]);
  await text(hr, 'Currency: PHP ₱', [12, 600], 'muted');
  const me = box('John', { dir: 'H', gap: 10, cross: 'CENTER', w: 'fill' }, hh);
  const av = box('Avatar', { dir: 'H', main: 'CENTER', cross: 'CENTER', fill: 'primary', w: 36, h: 36 }, me);
  av.cornerRadius = 18;
  await text(av, 'Jo', [13, 800], 'surface');
  const who = box('Info', { dir: 'V', w: 'fill' }, me);
  await text(who, 'John (you)', [14, 700]);
  await text(who, 'Owner · display name “John”', [12, 400], 'muted');
  await text(me, 'Edit', [13, 700], 'primary');
  const invite = await dashedPill(hh, '+ Invite Janice', { w: 'fill', h: 44, r: 12, size: 14 });
  await labelTag(invite, 'v1.1', 'divider', 'muted');

  // Bills & loans
  const bl = await card(s, 'Bills & loans', { gap: 4, pad: 16 });
  const bh = box('Title', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', pad: [0, 0, 4, 0], w: 'fill' }, bl);
  await text(bh, 'Bills & loans', [16, 700]);
  const addDue = await text(bh, '+ Add', [14, 700], 'primary', { name: 'Link/+ Add' });
  const dues = {};
  for (const d of SETTINGS_DUES) {
    const r = box('Due/' + d[0], { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', gap: 12, fill: 'surface', w: 'fill', h: 44 }, bl);
    await text(r, d[0], [14, 700]);
    await text(r, d[1], [12, 400], 'muted', { align: 'RIGHT' });
    topLine(r);
    dues[d[0]] = r;
  }

  // Reminders
  const rem = await card(s, 'Reminders', { gap: 10, pad: 16 });
  await text(rem, 'Reminders', [16, 700]);
  const win = box('Due soon window', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', gap: 12, w: 'fill' }, rem);
  const wl = box('Label', { dir: 'V', gap: 2, w: 'fill' }, win);
  await text(wl, '“Due soon” window', [14, 700]);
  await text(wl, 'Items turn orange this many days before they’re due', [12, 400], 'muted', { w: 'fill' });
  const step = box('Stepper', { dir: 'H', gap: 6, cross: 'CENTER' }, win);
  for (const part of ['−', '7 days', '+']) {
    if (part === '7 days') {
      const v = box('Value', { dir: 'H', main: 'CENTER', w: 54 }, step);
      await text(v, part, [14, 800]);
    } else {
      const b = box(part === '−' ? 'Fewer days' : 'More days', { dir: 'H', main: 'CENTER', cross: 'CENTER', r: 10, fill: 'surface', stroke: ['border', 1], w: 36, h: 36 }, step);
      await text(b, part, [18, 700]);
    }
  }
  await text(rem, 'Shared by everyone in the household. Dues show on the dashboard and in Upcoming; no phone notifications yet.', [12, 400], 'muted', { w: 'fill' });

  // Categories
  const cats = box('Categories', { dir: 'V', gap: 10, w: 'fill' }, s);
  const ch = box('Title', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', pad: [0, 4], w: 'fill', h: 36 }, cats);
  await text(ch, 'Categories', [16, 700]);
  await text(ch, '+ Add', [14, 700], 'primary');
  segTrack(cats, ['Expense', 'Income'], 'Expense', { name: 'Category kind' });
  const list = box('List', { dir: 'V', pad: [0, 14], r: 16, fill: 'surface', w: 'fill' }, cats);
  for (let i = 0; i < EXPENSE_PARENTS.length; i++) {
    const p = EXPENSE_PARENTS[i];
    const open = p[1] === 'Food';
    const blk = box(p[1], { dir: 'V', fill: 'surface', w: 'fill' }, list);
    const r = box('Row', { dir: 'H', gap: 12, cross: 'CENTER', w: 'fill', h: 48 }, blk);
    const tl = box('Tile', { dir: 'H', main: 'CENTER', cross: 'CENTER', fill: 'primary-tint', r: 10, w: 32, h: 32 }, r);
    await text(tl, p[0], [12, 800], 'chart-1');
    await text(r, p[1], [15, 700], 'ink', { w: 'fill' });
    await text(r, p[2].length + ' sub', [12, 600], 'muted');
    icon(open ? 'ChevronDown' : 'ChevronRight', 18, 'muted', r);
    if (open) {
      const subs = box('Sub-categories', { dir: 'H', gap: 6, wrap: 6, pad: [0, 0, 14, 44], w: 'fill' }, blk);
      for (const n of p[2]) {
        const pill = box(n, { dir: 'H', pad: [0, 12], r: 15, fill: 'background', cross: 'CENTER', h: 30 }, subs);
        await text(pill, n, [13, 600]);
      }
      await dashedPill(subs, '+ Sub-category', { h: 30, r: 15, padX: 12, fill: null, color: 'primary' });
    }
    if (i > 0) topLine(blk);
  }
  const foot = box('Footnote', { dir: 'H', pad: [0, 4], w: 'fill' }, cats);
  await text(foot, 'Archived categories stay in your history but are hidden when adding entries.', [12, 400], 'muted', { w: 'fill' });

  return { frame: s, back: top.back, addDue: addDue, dues: dues };
}

// Card SOA. o: name, h, editing (Match your SOA sheet open), fee (annual fee line),
// prev (unpaid balance carried from the September statement)
const SOA_PURCHASES = [
  ['Oct 3', 'Shopee', 'Online Shopping', 465.50, true],
  ['Oct 7', 'Grab', 'Grab/Taxi', 200.00, false],
  ['Oct 8', 'Lazada', 'Household Supplies', 120.00, true],
];
const SOA_BANK = 3215.50;

async function soaLine(parent, name, note, amount, color, chevron) {
  const r = box(name, { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', gap: 12, pad: [10, 0], w: 'fill', h: 58 }, parent);
  bottomLine(r);
  const l = box('Text', { dir: 'V', gap: 2 }, r);
  await text(l, name, [14, 600]);
  await text(l, note, [12, 400], 'muted');
  const right = box('Amount', { dir: 'H', gap: 6, cross: 'CENTER' }, r);
  await text(right, amount, [14, 700], color || 'ink');
  icon(chevron || 'ChevronRight', chevron ? 18 : 16, 'muted', right);
  return r;
}

async function buildCardStatement(page, x, o) {
  o = o || {};
  const fee = o.fee == null ? 550 : o.fee;
  const prev = o.prev || 0;
  const purchaseSum = SOA_PURCHASES.reduce((t, p) => t + p[3], 0);
  const calc = prev + purchaseSum + 2000 - 120 + fee;
  const gap = Math.round((SOA_BANK - calc) * 100) / 100;

  const s = detailScreen(page, o.name || '7b · Card SOA', 'background', x, o.h || 1180, { gap: 14, pad: [12, 16, 24, 16] });
  const top = await topBar(s, { title: 'Metrobank Mastercard', action: 'Edit' });

  const st = await card(s, 'Statement', { gap: 14, pad: 20 });
  const head = box('Total', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'MIN', w: 'fill' }, st);
  const ht = box('Text', { dir: 'V', gap: 2 }, head);
  await text(ht, 'Statement Oct 9 · due Oct 30', [13, 600], 'muted');
  await text(ht, peso(calc), [32, 800, -0.5]);
  const min = box('Minimum', { dir: 'H', gap: 4 }, ht);
  await text(min, 'Minimum due', [13, 400], 'muted');
  await text(min, '₱850.00', [13, 700]);
  await labelTag(head, 'Due in 4 days', 'warning-tint', 'warning', [4, 8], 8);

  const bd = box('Breakdown', { dir: 'V', stroke: ['divider', 1, true], w: 'fill' }, st);
  await soaLine(bd, 'New purchases', SOA_PURCHASES.length + ' entries · tap to hide', peso(purchaseSum), 'ink', 'ChevronUp');
  const list = box('Purchases', { dir: 'V', pad: [2, 0, 6, 12], w: 'fill' }, bd);
  bottomLine(list);
  const purchases = [];
  for (const p of SOA_PURCHASES) {
    const r = box('Purchase/' + p[1], { dir: 'H', gap: 10, cross: 'CENTER', w: 'fill', h: 44 }, list);
    await text(r, p[0], [12, 600], 'muted', { w: 40 });
    const nm = box('Name', { dir: 'H', gap: 4, cross: 'CENTER', clip: true, w: 'fill' }, r);
    await text(nm, p[1], [13, 700]);
    await text(nm, '· ' + p[2], [13, 400], 'muted', { w: 'fill', trunc: true });
    if (p[4]) icon('Paperclip', 16, 'muted', r).name = 'Receipt';
    await text(r, peso(p[3]), [13, 700]);
    icon('ChevronRight', 16, 'muted', r);
    purchases.push(r);
  }
  const lines = [];
  let prevRow = null;
  if (prev > 0) {
    prevRow = await soaLine(bd, 'Previous balance', 'September SOA not fully paid · tap to pay it', peso(prev), 'overdue');
    lines.push(prevRow);
  }
  lines.push(await soaLine(bd, 'iPhone 15 installment', '4 of 12 · added automatically Oct 9', peso(2000)));
  lines.push(await soaLine(bd, 'Refunds', '1 entry · Lazada return, Oct 9', peso(-120), 'primary'));
  if (fee > 0) lines.push(await soaLine(bd, 'Annual fee', 'Bank charge · Bank & Transfer Fees', peso(fee)));

  await text(st, 'Calculated from your entries up to Oct 9. Tap Edit to compare with your bank’s SOA.', [12, 400], 'muted', { w: 'fill' });
  const pays = evenButtons(st, [['Outline', 'Pay minimum'], ['Solid', 'Pay in full']]);

  const inst12 = await card(s, 'Installments', { gap: 10, pad: [18, 20] });
  const ih = box('Title', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', w: 'fill', h: 36 }, inst12);
  await text(ih, 'Installments', [16, 700]);
  await text(ih, '+ Add', [14, 700], 'primary');
  const ir = box('iPhone 15', { dir: 'H', main: 'SPACE_BETWEEN', w: 'fill' }, inst12);
  await text(ir, 'iPhone 15 · ₱2,000 × 12', [14, 700]);
  await text(ir, '₱16,000 left', [14, 700]);
  progress(inst12, 0.33, 'chart-2', 8);
  await text(inst12, '4 of 12 billed · last one Jun 2027 · each month’s ₱2,000 is added as a Gadgets expense at cut-off', [12, 400], 'muted', { w: 'fill' });

  const facts = await card(s, 'Card settings and history', { pad: [4, 20] });
  factRows(facts, [
    ['Owner', 'Mine · usually paid by John'], ['Cut-off day', '9th of each month'], ['Due day', '30th of each month'],
    ['Credit limit', '₱60,000'], ['September SOA', '₱5,410 · paid Sep 28 by John'], ['August SOA', '₱4,980 · paid Aug 29 by John'],
  ]);

  const out = { frame: s, back: top.back, edit: top.action, payMin: pays[0], payFull: pays[1], prevRow: prevRow, purchases: purchases, lines: lines };
  if (!o.editing) return out;

  // Match your SOA sheet
  const sh = overlay(s, [20, 20, 28, 20], 14, 'Sheet/Match your SOA');
  await text(sh, 'Match your SOA', [18, 800]);
  await text(sh, 'Type the totals from your bank’s statement. We’ll compare them with the entries you logged.', [13, 400], 'muted', { w: 'fill' });
  const cb = box('Calculated', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', pad: [12, 14], r: 12, fill: 'background', w: 'fill' }, sh);
  await text(cb, 'We calculated from your entries', [13, 700], 'muted');
  await text(cb, peso(calc), [17, 800]);
  await field(sh, 'Bank statement balance', '3,215.50', { h: 50, spec: [20, 800], focus: true });
  await field(sh, 'Minimum due', '850.00', { h: 50, spec: [18, 700] });

  const warn = box(gap > 0 ? 'Not in your entries' : 'More than the bank', { dir: 'V', gap: 10, pad: 14, r: 14, fill: 'warning-tint', w: 'fill' }, sh);
  if (gap > 0) {
    const wt = box('Message', { dir: 'H', gap: 8, cross: 'MIN', w: 'fill' }, warn);
    icon('Warning', 20, 'warning', wt);
    const wm = box('Text', { dir: 'V', gap: 2, w: 'fill' }, wt);
    await text(wm, peso(gap) + ' is not in your entries', [15, 800], 'warning', { w: 'fill' });
    await text(wm, 'Was it a bank fee or interest, or a card purchase you forgot to log?', [12, 400], 'muted', { w: 'fill' });
    const wb = box('Buttons', { dir: 'H', gap: 8, w: 'fill' }, warn);
    inst('Button/Small', { Kind: 'Solid', Label: 'Add as Bank fees' }, wb, 'fill');
    out.addMissed = inst('Button/Small', { Kind: 'Outline', Label: 'Add missed purchase' }, wb, 'fill');
    const leave = box('Leave it for now', { dir: 'H', main: 'CENTER', cross: 'CENTER', w: 'fill', h: 36 }, warn);
    await text(leave, 'Leave it for now', [13, 700], 'muted');
  } else {
    const wm = box('Text', { dir: 'V', gap: 2, w: 'fill' }, warn);
    await text(wm, 'Your entries are ' + peso(-gap) + ' more than the bank’s SOA', [15, 800], 'warning', { w: 'fill' });
    await text(wm, prev > 0
      ? 'Did you forget to log a payment? The September SOA shows ' + peso(prev) + ' unpaid. Otherwise, look for an entry logged twice.'
      : 'Look for an entry logged twice, or one that belongs on next month’s statement.', [12, 400], 'muted', { w: 'fill' });
    if (prev > 0) out.logPayment = inst('Button/Small', { Kind: 'Solid', Label: 'Log the September payment' }, warn, 'fill');
    inst('Button/Small', { Kind: 'Outline', Label: 'Check New purchases' }, warn, 'fill');
  }
  const btns = sheetButtons(sh, 'Cancel', 'Save');
  out.cancel = btns.left;
  out.save = btns.right;
  return out;
}

async function buildLoanDetail(page, x) {
  const s = detailScreen(page, '7c · Loan details', 'background', x, 1040, { gap: 14, pad: [12, 16, 24, 16] });
  const top = await topBar(s, { title: 'Car loan', action: 'Edit' });
  segTrack(s, ['Car loan (manual)', 'SSS (auto-deducted)'], 'Car loan (manual)', { name: 'Example loan' });

  const pr = await card(s, 'Progress', { gap: 12, pad: 20 });
  const ph = box('Top', { dir: 'H', main: 'SPACE_BETWEEN', cross: 'MIN', w: 'fill' }, pr);
  const pl = box('Left to pay', { dir: 'V', gap: 2 }, ph);
  await text(pl, 'Left to pay', [13, 600], 'muted');
  await text(pl, '₱321,720', [32, 800, -0.5]);
  await labelTag(ph, 'Manual payment', 'divider', 'ink', [4, 8], 8);
  progress(pr, 0.42, 'chart-2', 10);
  const pc = box('Count', { dir: 'H', main: 'SPACE_BETWEEN', w: 'fill' }, pr);
  await text(pc, '15 of 36 paid · 21 to go', [13, 700]);
  await text(pc, 'Last payment Jul 15, 2028', [13, 400], 'muted');

  const nx = await card(s, 'Next', { dir: 'H', gap: 12, pad: [16, 20], cross: 'CENTER' });
  const nt = box('Text', { dir: 'V', gap: 2, w: 'fill' }, nx);
  await text(nt, 'NEXT PAYMENT', [12, 700], 'muted');
  await text(nt, 'Nov 15 · ₱15,320', [16, 800]);
  await text(nt, 'Usually paid by John from BDO Savings', [12, 400], 'muted', { w: 'fill' });
  const pay = box('Pay', { dir: 'H', pad: [0, 18], r: 20, fill: 'primary', cross: 'CENTER', h: 40 }, nx);
  await text(pay, 'Pay', [14, 800], 'surface');

  const hist = await card(s, 'Payment history', { pad: [4, 20] });
  const hh = box('Title', { dir: 'H', pad: [14, 0, 6, 0], w: 'fill' }, hist);
  await text(hh, 'Payments', [16, 700]);
  const payments = [];
  for (const p of [['Payment 15 of 36', 'Oct 14 · John · BDO Savings'], ['Payment 14 of 36', 'Sep 15 · John · BDO Savings'], ['Payment 13 of 36', 'Aug 14 · Janice · BDO Savings']]) {
    const r = box(p[0], { dir: 'H', main: 'SPACE_BETWEEN', cross: 'CENTER', gap: 12, pad: [12, 0], w: 'fill' }, hist);
    const l = box('Text', { dir: 'V', gap: 2 }, r);
    await text(l, p[0], [14, 700]);
    await text(l, p[1], [12, 400], 'muted');
    await text(r, '₱15,320', [14, 700]);
    topLine(r);
    payments.push(r);
  }

  const facts = await card(s, 'Loan details', { pad: [4, 20] });
  factRows(facts, [['Lender', 'BDO Auto Loan'], ['Monthly amortization', '₱15,320'], ['Term', '36 months'],
    ['Due day', '15th of each month'], ['Owner', 'Joint · usually paid by John'], ['Pay from', 'BDO Savings']]);
  return { frame: s, back: top.back, edit: top.action, pay: pay, payments: payments };
}

// Pay (from a due item). o: name, dateOpen (date picker open), day (payment date)
async function buildPayDue(page, x, o) {
  o = o || {};
  const day = o.day || TODAY;
  const s = detailScreen(page, o.name || '7d · Pay (from a due item)', 'surface', x, SCREEN_H, { gap: 14, pad: [12, 16, 20, 16] });
  const top = await topBar(s, { icon: 'Close', title: 'Pay' });

  const due = box('Due item', { dir: 'H', gap: 12, cross: 'CENTER', pad: [12, 14], r: 14, fill: 'warning-tint', w: 'fill' }, s);
  const tl = box('Tile', { dir: 'H', main: 'CENTER', cross: 'CENTER', fill: 'surface', r: 11, w: 38, h: 38 }, due);
  await text(tl, 'MC', [12, 800], 'warning');
  const dt = box('Text', { dir: 'V', gap: 2 }, due);
  await text(dt, 'Metrobank Mastercard SOA', [14, 800]);
  await text(dt, 'Oct 9 statement · due Oct 30 · in 4 days', [12, 600], 'warning');

  const amt = box('Amount', { dir: 'V', gap: 2, pad: [4, 0], cross: 'CENTER', w: 'fill' }, s);
  await text(amt, 'Transfer amount', [12, 600], 'muted');
  await text(amt, '₱3,215.50', [40, 800, -0.5]);

  const opts = box('Amount to pay', { dir: 'H', gap: 8, w: 'fill' }, s);
  await optionCard(opts, 'Full', '₱3,215.50', true);
  await optionCard(opts, 'Minimum', '₱850.00', false);
  await optionCard(opts, 'Other', 'Type amount', false);

  const ft = box('From and to', { dir: 'V', gap: 8, w: 'fill' }, s);
  await text(ft, 'From', [12, 700], 'muted');
  const froms = box('From accounts', { dir: 'H', gap: 8, w: 'fill' }, ft);
  for (const a of ['BDO Savings', 'GCash', 'BPI Savings']) inst('Chip/Account', { State: a === 'BDO Savings' ? 'Selected' : 'Default', Label: a }, froms);
  const toL = box('To label', { dir: 'H', pad: [4, 0, 0, 0] }, ft);
  await text(toL, 'To', [12, 700], 'muted');
  const to = box('To account', { dir: 'H', pad: [0, 14], r: 20, fill: 'divider', cross: 'CENTER', h: 40 }, ft);
  await text(to, 'Metrobank Mastercard', [13, 700]);

  const meta = box('Date, note, receipt', { dir: 'H', gap: 8, cross: 'CENTER', w: 'fill' }, s);
  const dateBtn = inst('Button/Secondary', { Label: dayLabel(day) }, meta);
  dateBtn.name = 'Payment date';
  const note = inst('Input/Text', { Placeholder: 'Oct SOA payment' }, meta, 'fill');
  const nt = note.findOne(n => n.type === 'TEXT');
  if (nt) setFill(nt, 'ink');
  inst('Button/Icon', {}, meta);

  spacer(s, 'fill', 'fill');
  const ex = box('Explanation', { dir: 'H', pad: [12, 14], r: 12, fill: 'background', w: 'fill' }, s);
  await text(ex, 'Saves a transfer from BDO Savings to the card, dated ' + (day === TODAY ? 'today' : 'on Oct ' + day) +
    '. It shows in Activity, and this SOA turns Paid for both John and Janice. It is not counted as spending.', [12, 400], 'muted', { w: 'fill' });
  const save = inst('Button/Primary', { Label: 'Save payment' }, s, 'fill');

  const out = { frame: s, close: top.back, save: save, dateBtn: dateBtn };
  if (!o.dateOpen) return out;
  const sh = overlay(s, [20, 16, 28, 16], 10, 'Sheet/Payment date');
  const btns = await datePicker(sh, {
    title: 'Payment date', selected: day, minDay: 9, status: 'Counts as paid on time · due Oct 30',
    note: 'You can pick from the Oct 9 statement date to today. Earlier days belong to the previous statement; pay that one from its own Pay button.',
  });
  out.cancel = btns.left;
  out.use = btns.right;
  return out;
}

async function buildAddDue(page, x) {
  const s = detailScreen(page, '7e · Add loan or bill', 'surface', x, 1000, { gap: 14, pad: [12, 16, 20, 16] });
  const top = await topBar(s, { icon: 'Close', title: 'Add loan' });
  segTrack(s, ['Loan', 'Bill'], 'Loan', { name: 'What to add', track: 'divider', large: true, flat: true });

  const form = box('Loan', { dir: 'V', gap: 12, w: 'fill' }, s);
  await field(form, 'Name', 'Motorcycle loan');
  await field(form, 'Lender', 'Honda Finance');
  const how = box('How is it paid?', { dir: 'V', gap: 6, w: 'fill' }, form);
  await text(how, 'How is it paid?', [13, 700], 'muted');
  const methods = box('Payment method', { dir: 'H', gap: 8, w: 'fill' }, how);
  await optionCard(methods, 'I pay it', 'Bank, GCash or cash', true, { left: true, h: 58 });
  await optionCard(methods, 'Salary deduction', 'SSS, Pag-IBIG', false, { left: true, h: 58 });
  const grid = box('Amounts', { dir: 'V', gap: 10, w: 'fill' }, form);
  for (const pair of [[['Monthly amortization', '4,850', [15, 700]], ['Due day', '25']], [['Total months', '24'], ['Already paid', '8']]]) {
    const r = box(pair[0][0], { dir: 'H', gap: 10, w: 'fill' }, grid);
    for (const f of pair) await field(r, f[0], f[1], { spec: f[2] });
  }
  const pv = box('Preview', { dir: 'H', pad: [10, 12], r: 10, fill: 'primary-tint', w: 'fill' }, form);
  await text(pv, '₱77,600 left · 16 payments to go · last one Jan 25, 2028.', [12, 600], 'primary', { w: 'fill' });

  for (const g of [['Usually paid from', ['BDO Savings', 'GCash', 'Cash wallet']], ['Usually paid by', ['John', 'Janice', 'Either']]]) {
    const w = box(g[0], { dir: 'V', gap: 6, w: 'fill' }, s);
    await text(w, g[0], [13, 700], 'muted');
    const chips = box('Chips', { dir: 'H', gap: 8 }, w);
    g[1].forEach((c, i) => inst('Chip/Account', { State: i === 0 ? 'Selected' : 'Default', Label: c }, chips, undefined, 38));
  }

  spacer(s, 'fill', 'fill');
  const save = inst('Button/Primary', { Label: 'Save loan' }, s, 'fill');
  return { frame: s, close: top.back, save: save };
}

// Device check: a copy of a finished screen resized to another phone. Auto layout and
// constraints reflow it; below 820 tall, Quick add uses the compact keypad and category tiles.
function deviceCopy(frame, w, h, name) {
  const c = frame.clone();
  c.name = name;
  tag(c);
  const oldBars = c.findAll(n => n.name === 'Stacked bar').map(b => [b, b.width]);
  c.resize(w, h);
  for (const n of c.findAll(n => n.name === 'Scroller' || n.name === 'Filters')) n.resize(w - 16, n.height);
  // Scale the category bar's segments to the new width (the last one fills the rest)
  for (const pair of oldBars) {
    const bar = pair[0], k = bar.width / pair[1];
    for (const seg of bar.children) if (seg.layoutSizingHorizontal === 'FIXED') seg.resize(seg.width * k, seg.height);
  }
  if (h < 820) {
    const compact = (n, px) => {
      n.layoutSizingVertical = 'FIXED';
      n.resize(n.width, px);
      n.layoutSizingHorizontal = 'FILL';
    };
    for (const n of c.findAll(n => n.name.indexOf('Key/') === 0)) compact(n, 40);
    for (const n of c.findAll(n => n.name.indexOf('Category/') === 0)) compact(n, 52);
  }
  return c;
}

// ---------------------------------------------------------------------------
// Foundations page
// ---------------------------------------------------------------------------

async function buildFoundations(page) {
  const root = tag(box('Foundations', { dir: 'V', gap: 56, pad: 48, fill: 'surface', w: 1440 }, page));
  root.x = 0;
  root.y = 0;
  await text(root, 'Expense Tracker — Foundations', [36, 800, -0.5]);
  await text(root, 'Source of truth for color, type, spacing, radius and effects. Colors and numbers are Figma variables in the "' +
    COLLECTION + '" collection; type uses Manrope text styles. Amounts use tabular figures in code (font-variant-numeric: tabular-nums).',
  [14, 400], 'muted', { w: 'fill' });

  // Colors
  let sec = box('Colors', { dir: 'V', gap: 16, w: 'fill' }, root);
  await text(sec, 'Colors', [22, 800]);
  let grid = box('Swatches', { dir: 'H', gap: 24, wrap: 24, w: 'fill' }, sec);
  for (const c of COLORS) {
    const sw = box(c[0], { dir: 'V', gap: 6, w: 160 }, grid);
    const chip = rect(sw, 'Swatch', c[0], 160, 72, 12);
    if (c[0] === 'surface') setStroke(chip, 'track', 1);
    await text(sw, 'color/' + c[0], [13, 700]);
    await text(sw, c[1] + (c[3] != null ? ' · ' + Math.round(c[3] * 100) + '%' : ''), [12, 400], 'muted');
    await text(sw, c[2], [11, 400], 'muted', { w: 'fill' });
  }

  // Type
  sec = box('Typography', { dir: 'V', gap: 16, w: 'fill' }, root);
  await text(sec, 'Typography', [22, 800]);
  const list = box('Styles', { dir: 'V', gap: 12, w: 'fill' }, sec);
  for (const spec of TYPE_SCALE) {
    const r = box(styleName(spec[0], spec[1], spec[2] || 0), { dir: 'H', gap: 24, cross: 'CENTER', w: 'fill' }, list);
    const meta = box('Meta', { dir: 'V', gap: 2, w: 280 }, r);
    await text(meta, styleName(spec[0], spec[1], spec[2] || 0), [13, 700]);
    await text(meta, spec[0] + ' / ' + spec[1] + (spec[2] ? ' / ' + spec[2] + 'px' : ''), [12, 400], 'muted');
    await text(r, spec[2] > 0 ? 'DUE SOON · NEXT 7 DAYS' : '₱38,420.50 Spent this month', spec, 'ink', { w: 'fill', trunc: true });
  }

  // Spacing
  sec = box('Spacing', { dir: 'V', gap: 16, w: 'fill' }, root);
  await text(sec, 'Spacing', [22, 800]);
  grid = box('Steps', { dir: 'H', gap: 24, cross: 'MAX' }, sec);
  for (const v of SPACE) {
    const it = box('space/' + v, { dir: 'V', gap: 6, cross: 'CENTER' }, grid);
    rect(it, 'Block', 'chart-3', v, 24);
    await text(it, String(v), [12, 700]);
  }
  await text(sec, 'Side padding 16 · card padding 20 · section gap 20 (Dashboard) / 14 (Upcoming) · row padding 12 0 · tile-to-text gap 12.', [13, 400], 'muted');

  // Radius
  sec = box('Radius', { dir: 'V', gap: 16, w: 'fill' }, root);
  await text(sec, 'Corner radius', [22, 800]);
  grid = box('Radii', { dir: 'H', gap: 24, wrap: 24, w: 'fill' }, sec);
  for (const r of RADII) {
    const it = box('radius/' + r[0], { dir: 'V', gap: 6, w: 128 }, grid);
    const sq = rect(it, 'Shape', 'primary-tint', 72, 72, r[0]);
    setStroke(sq, 'primary', 1);
    await text(it, 'radius/' + r[0], [13, 700]);
    await text(it, r[1], [11, 400], 'muted', { w: 'fill' });
  }
  await text(sec, 'Pills use half their height: Pay 17, account chip 20, filter chip 17, count badge 9.', [13, 400], 'muted');

  // Effects
  sec = box('Effects', { dir: 'V', gap: 16, w: 'fill' }, root);
  await text(sec, 'Effects', [22, 800]);
  grid = box('Shadows', { dir: 'H', gap: 40, pad: 24, r: 16, fill: 'background' }, sec);
  for (const e of [['fab', 'Shadow/FAB', '0 8 20 · primary 35%'], ['segment', 'Shadow/Segment', '0 1 3 · ink 15%']]) {
    const it = box(e[1], { dir: 'V', gap: 10 }, grid);
    const sample = rect(it, 'Sample', e[0] === 'fab' ? 'primary' : 'surface', 96, 60, e[0] === 'fab' ? 20 : 9);
    await setEffect(sample, e[0]);
    await text(it, e[1], [13, 700]);
    await text(it, e[2], [12, 400], 'muted');
  }

  // Layout rules
  sec = box('Layout', { dir: 'V', gap: 12, w: 'fill' }, root);
  await text(sec, 'Layout and device rules', [22, 800]);
  const rules = [
    ['Design frame', '430 × 932 (iPhone 14/15 Pro Max). Fluid from 360 wide.'],
    ['Device checks', '360 × 780 small phone · 412 × 891 Galaxy S26 Ultra · 440 × 956 iPhone 16/17 Pro Max'],
    ['Side padding', '16 on every screen'],
    ['Bottom nav', '84 tall + bottom safe-area inset; five tabs share the width (max 80 each)'],
    ['Floating +', '60 × 60, radius 20, 16 from the right, 78 above the nav top. Hidden on forms.'],
    ['Scroll padding', 'Tab screens are 932 tall and scroll; the nav and + are fixed. Content ends 96 above the nav so the + never covers the last row'],
    ['Short screens', 'Below 820 tall: keypad keys 40, category tiles 52, so Save stays visible'],
    ['Touch targets', 'At least 44 × 44 (chevrons are 32 inside a 44 row)'],
    ['Contrast', 'Text at least 4.5:1; status always has text, never color alone'],
  ];
  for (const r of rules) {
    const line = box(r[0], { dir: 'H', gap: 24, pad: [10, 0], stroke: ['divider', 1, true], w: 'fill' }, sec);
    await text(line, r[0], [14, 700], 'ink', { w: 200 });
    await text(line, r[1], [14, 400], 'muted', { w: 'fill' });
  }
}

// ---------------------------------------------------------------------------
// Setup: fonts, variables, styles, pages
// ---------------------------------------------------------------------------

async function loadFonts() {
  for (const w in WEIGHTS) await figma.loadFontAsync({ family: FONT, style: WEIGHTS[w] });
}

async function setupVariables() {
  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const col = cols.find(c => c.name === COLLECTION) || figma.variables.createVariableCollection(COLLECTION);
  const modeId = col.modes[0].modeId;
  try { col.renameMode(modeId, 'Light'); } catch (e) { /* ignore */ }
  const existing = {};
  for (const id of col.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v) existing[v.name] = v;
  }
  const get = (name, type) => {
    const v = existing[name];
    if (v && v.resolvedType === type) return v;
    if (v) v.remove();
    return figma.variables.createVariable(name, col, type);
  };
  for (const c of COLORS) {
    const v = get('color/' + c[0], 'COLOR');
    const rgb = hex(c[1]);
    v.setValueForMode(modeId, { r: rgb.r, g: rgb.g, b: rgb.b, a: c[3] == null ? 1 : c[3] });
    v.description = c[2];
    V[c[0]] = v;
  }
  for (const s of SPACE) {
    const v = get('space/' + s, 'FLOAT');
    v.setValueForMode(modeId, s);
    try { v.scopes = ['GAP']; } catch (e) { /* ignore */ }
    NUMVAR['space:' + s] = v;
  }
  for (const r of RADII) {
    const v = get('radius/' + r[0], 'FLOAT');
    v.setValueForMode(modeId, r[0]);
    v.description = r[1];
    try { v.scopes = ['CORNER_RADIUS']; } catch (e) { /* ignore */ }
    NUMVAR['radius:' + r[0]] = v;
  }
}

async function setupStyles() {
  existingTextStyles = await figma.getLocalTextStylesAsync();
  for (const spec of TYPE_SCALE) textStyle(spec);

  const effects = await figma.getLocalEffectStylesAsync();
  const defs = [
    ['fab', 'Shadow/FAB', { r: 15 / 255, g: 95 / 255, b: 88 / 255, a: 0.35 }, 8, 20, 'Floating + button'],
    ['segment', 'Shadow/Segment', { r: 18 / 255, g: 22 / 255, b: 28 / 255, a: 0.15 }, 1, 3, 'Selected segment (Quick add)'],
  ];
  for (const d of defs) {
    const st = effects.find(e => e.name === d[1]) || figma.createEffectStyle();
    st.name = d[1];
    st.description = d[5];
    st.effects = [{ type: 'DROP_SHADOW', color: d[2], offset: { x: 0, y: d[3] }, radius: d[4], spread: 0, visible: true, blendMode: 'NORMAL' }];
    FX[d[0]] = st;
  }
}

// Finds this plugin's page for `key`. Otherwise it adopts an empty page the user isn't using
// (e.g. the default "Page 1"), and only then creates one. Figma's free Starter plan allows
// 3 pages per file, so if creating fails the section shares the last page this plugin got.
async function getPage(key, name, fallback) {
  let p = figma.root.children.find(pg => pg.getPluginData(TAG + '-page') === key);
  if (!p) {
    for (const pg of figma.root.children) {
      if (pg.getPluginData(TAG + '-page')) continue;
      await pg.loadAsync();
      if (pg.children.length === 0) { p = pg; break; }
    }
  }
  if (!p) {
    try {
      p = figma.createPage();
    } catch (e) {
      if (!fallback) throw e;
      stats.warnings.push('No room for a "' + name + '" page (' + e.message + '). It was built on "' + fallback.name + '" instead.');
      stats.sharedPages = true;
      return fallback;
    }
  }
  p.name = name;
  p.setPluginData(TAG + '-page', key);
  await p.loadAsync();
  for (const n of p.children.slice()) if (n.getPluginData(TAG)) n.remove();
  return p;
}

// Keeps the plugin's pages in order (Foundations, Components, Screens) after any existing pages.
function orderPages(pages) {
  const unique = pages.filter((p, i) => pages.indexOf(p) === i);
  try {
    const start = figma.root.children.length - unique.length;
    unique.forEach((p, i) => figma.root.insertChild(start + i, p));
  } catch (e) { /* order is cosmetic */ }
}

// When two sections share a page, moves the nodes built since `before` below what was already there.
function stackBelow(page, before) {
  const fresh = page.children.filter(n => before.indexOf(n) < 0);
  const old = before.filter(n => n.parent === page);
  if (!old.length || !fresh.length) return;
  const bottom = Math.max.apply(null, old.map(n => n.y + n.height));
  const top = Math.min.apply(null, fresh.map(n => n.y));
  for (const n of fresh) n.y += bottom + 400 - top;
}

async function link(node, dest) {
  if (!node || !dest) return;
  try {
    await node.setReactionsAsync([{
      trigger: { type: 'ON_CLICK' },
      actions: [{ type: 'NODE', destinationId: dest.id, navigation: 'NAVIGATE', transition: null, preserveScrollPosition: false }],
    }]);
    stats.links++;
  } catch (e) {
    stats.linkFailures++;
    console.warn('Prototype link failed on ' + node.name + ': ' + e.message);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  figma.notify('Building Expense Tracker UI (run 2)…', { timeout: 2500 });
  await loadFonts();
  await setupVariables();
  await setupStyles();

  const foundations = await getPage('foundations', 'Foundations');
  const components = await getPage('components', 'Components', foundations);
  const screens = await getPage('screens', 'Screens', components);
  orderPages([foundations, components, screens]);

  let before = components.children.slice();
  await buildComponents(components);
  stackBelow(components, before);

  // Screens, laid out like the UI canvas: main screens, then bills/loans, then device checks
  before = screens.children.slice();
  const frames = [];
  const place1 = async (r, y, title) => {
    r.frame.y = y;
    frames.push(r.frame);
    await label(screens, title, r.frame.x, y);
    return r;
  };
  const heading = async (chars, y) => {
    const t = await text(screens, chars, [36, 800, -0.5]);
    t.x = 0;
    t.y = y;
    tag(t);
  };

  const row1 = 0;
  await heading('Expense Tracker — MVP screens (designed at 430×932, iPhone 15 Pro Max)', row1 - 160);
  const login = await place1(await buildLogin(screens, 0), row1, '0 · Login');
  const dash = await place1(await buildDashboard(screens, COL), row1, '1 · Dashboard');
  const qa = await place1(await buildQuickAdd(screens, 2 * COL), row1, '2 · Quick add');
  const act = await place1(await buildActivity(screens, 3 * COL), row1, '3 · Activity');
  const det = await place1(await buildEntryDetails(screens, 4 * COL), row1, '3b · Entry details');
  const bud = await place1(await buildBudgets(screens, 5 * COL), row1, '4 · Budgets');
  const accs = await place1(await buildAccounts(screens, 6 * COL), row1, '5 · Accounts');
  const set = await place1(await buildSettings(screens, 7 * COL), row1, '6 · Settings & categories');

  const row2 = row1 + 1480 + 320;
  await heading('Bills, loans & upcoming dues', row2 - 160);
  const up = await place1(await buildUpcoming(screens, 0), row2, '7 · Upcoming');
  const soa = await place1(await buildCardStatement(screens, COL), row2, '7b · Card SOA');
  const match = await place1(await buildCardStatement(screens, 2 * COL, { name: '7b-2 · Match your SOA (bank total is higher)', editing: true, fee: 0 }), row2, '7b-2 · Match your SOA (bank total is higher)');
  const forgot = await place1(await buildCardStatement(screens, 3 * COL, { name: '7b-3 · Card SOA · September payment not logged', editing: true, prev: 5410, h: 1240 }), row2, '7b-3 · Card SOA · September payment not logged');
  const loan = await place1(await buildLoanDetail(screens, 4 * COL), row2, '7c · Loan details');
  const pay = await place1(await buildPayDue(screens, 5 * COL), row2, '7d · Pay (from a due item)');
  const payDate = await place1(await buildPayDue(screens, 6 * COL, { name: '7d-2 · Pay · picking the payment date', dateOpen: true, day: 20 }), row2, '7d-2 · Pay · picking the payment date');
  const addDue = await place1(await buildAddDue(screens, 7 * COL), row2, '7e · Add loan or bill');

  const row3 = row2 + 1240 + 320;
  await heading('Device check — same screens on a small phone, Galaxy S26 Ultra and iPhone 16/17 Pro Max', row3 - 160);
  const devices = [
    [qa, 0, 360, 780, 'Small phone 360×780 · Quick add'],
    [qa, 440, 412, 891, 'Galaxy S26 Ultra 412×891 · Quick add'],
    [qa, 932, 440, 956, 'iPhone 16/17 Pro Max 440×956 · Quick add'],
    [dash, 1532, 360, 780, 'Small phone 360×780 · Dashboard (first screen)'],
    [dash, 1972, 412, 891, 'Galaxy S26 Ultra 412×891 · Dashboard (first screen)'],
    [dash, 2464, 440, 956, 'iPhone 16/17 Pro Max 440×956 · Dashboard (first screen)'],
  ];
  for (const d of devices) {
    const c = deviceCopy(d[0].frame, d[2], d[3], d[4]);
    c.x = d[1];
    c.y = row3;
    await label(screens, d[4], d[1], row3);
  }
  stackBelow(screens, before);

  before = foundations.children.slice();
  await buildFoundations(foundations);
  stackBelow(foundations, before);

  // Prototype links (Present mode), following the canvas
  const tabScreens = { Home: dash, Activity: act, Upcoming: up, Budgets: bud, Accounts: accs };
  for (const t of [dash, act, up, bud, accs]) {
    await link(t.fab, qa.frame);
    for (const name in tabScreens) {
      if (tabScreens[name] !== t) await link(t.nav.findOne(n => n.name === 'Tab/' + name), tabScreens[name].frame);
    }
  }
  const dueTargets = { 'Motorcycle loan · 9 of 24': loan, 'Meralco': addDue, 'Metrobank Mastercard SOA': soa, 'SSS salary loan · 19 of 24': loan,
    'Pag-IBIG MPL · 13 of 24': loan, 'BPI Visa SOA': soa, 'PLDT Fiber': addDue, 'Car loan · 15 of 36': loan };
  for (const scr of [dash, up]) {
    for (const r of scr.frame.findAll(n => n.type === 'INSTANCE' && n.name.indexOf('Due/') === 0)) {
      const dest = dueTargets[r.name.slice(4)];
      await link(r, dest && dest.frame);
      await link(r.findOne(n => n.name === 'Button/Pay'), pay.frame);
    }
  }
  await link(login.cta, dash.frame);
  await link(dash.seeAll, up.frame);
  await link(dash.settings, set.frame);
  await link(dash.budgetsLink, bud.frame);
  await link(dash.manage, accs.frame);
  await link(dash.recentLink, act.frame);
  for (const r of dash.recent) await link(r, det.frame);
  await link(qa.close, dash.frame);
  await link(qa.save, dash.frame);
  for (const r of act.rows) await link(r, det.frame);
  await link(det.back, act.frame);
  await link(det.edit, qa.frame);
  await link(det.duplicate, qa.frame);
  await link(accs.rows['Metrobank Mastercard'], soa.frame);
  await link(accs.rows['BPI Visa'], soa.frame);
  for (const n of ['Car loan', 'Motorcycle loan', 'SSS salary loan', 'Pag-IBIG MPL']) await link(accs.rows[n], loan.frame);
  for (const n of ['Cash wallet', 'GCash', 'Maya', 'BDO Savings', 'BPI Savings']) await link(accs.rows[n], act.frame);
  await link(set.back, dash.frame);
  await link(set.addDue, addDue.frame);
  for (const d of SETTINGS_DUES) await link(set.dues[d[0]], d[2] === 'loan' ? loan.frame : addDue.frame);
  await link(up.addDue, addDue.frame);
  for (const c of [soa, match, forgot]) {
    await link(c.back, up.frame);
    await link(c.payMin, pay.frame);
    await link(c.payFull, pay.frame);
    for (const p of c.purchases.concat(c.lines)) await link(p, det.frame);
    if (c.prevRow) await link(c.prevRow, pay.frame);
  }
  await link(soa.edit, match.frame);
  for (const c of [match, forgot]) {
    await link(c.cancel, soa.frame);
    await link(c.save, soa.frame);
  }
  await link(match.addMissed, qa.frame);
  await link(forgot.logPayment, pay.frame);
  await link(loan.back, up.frame);
  await link(loan.edit, addDue.frame);
  await link(loan.pay, pay.frame);
  for (const p of loan.payments) await link(p, det.frame);
  for (const p of [pay, payDate]) {
    await link(p.close, up.frame);
    await link(p.save, up.frame);
  }
  await link(pay.dateBtn, payDate.frame);
  await link(payDate.cancel, pay.frame);
  await link(payDate.use, pay.frame);
  await link(addDue.close, up.frame);
  await link(addDue.save, up.frame);
  try {
    screens.flowStartingPoints = [{ nodeId: login.frame.id, name: 'Expense Tracker' }, { nodeId: dash.frame.id, name: 'Dashboard' }];
  } catch (e) { /* ignore */ }

  await figma.setCurrentPageAsync(screens);
  figma.viewport.scrollAndZoomIntoView(frames);

  let msg = 'Done: Foundations, ' + stats.components + ' components, ' + frames.length + ' screens + 6 device checks, ' + stats.links + ' prototype links.';
  if (stats.sharedPages) msg += ' Page limit reached, so some sections share a page.';
  if (stats.linkFailures) msg += ' ' + stats.linkFailures + ' links failed (see console).';
  if (stats.fixFailures) msg += ' ' + stats.fixFailures + ' layers could not be fixed while scrolling (see console).';
  if (stats.warnings.length) {
    msg += ' ' + stats.warnings.length + ' warning(s) in console.';
    stats.warnings.forEach(w => console.warn(w));
  }
  figma.closePlugin(msg);
}

main().catch(e => {
  console.error(e);
  figma.closePlugin('Expense Tracker UI Builder failed: ' + (e && e.message ? e.message : e));
});
