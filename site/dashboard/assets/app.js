const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/dashboardpage.js",
      "assets/radix.js",
      "assets/react.js",
      "assets/pageheader.js",
      "assets/supabase.js",
      "assets/icons.js",
      "assets/orderspage.js",
      "assets/formerrorboundary.js",
      "assets/datafreshnesspill.js",
      "assets/audittrailpanel.js",
      "assets/activitytimeline.js",
      "assets/relatedpanel.js",
      "assets/consolidationspage.js",
      "assets/supplierspage.js",
      "assets/customerspage.js",
      "assets/paymentspage.js",
      "assets/shipmentspage.js",
    ]),
) => i.map((i) => d[i]);
import { _ as ze } from "./supabase.js";
import { j as l, r as x, S as zn } from "./radix.js";
import {
  L as Gn,
  C as Wn,
  B as Kn,
  T as Jn,
  a as Qn,
  W as Yn,
  U as Xn,
  M as Zn,
  b as Ws,
  c as Ks,
  X as Qr,
  E as eo,
  d as to,
  e as ro,
} from "./icons.js";
import { b as so, g as io } from "./react.js";
function $i(s) {
  var e,
    t,
    r = "";
  if (typeof s == "string" || typeof s == "number") r += s;
  else if (typeof s == "object")
    if (Array.isArray(s)) {
      var i = s.length;
      for (e = 0; e < i; e++)
        s[e] && (t = $i(s[e])) && (r && (r += " "), (r += t));
    } else for (t in s) s[t] && (r && (r += " "), (r += t));
  return r;
}
function Mi() {
  for (var s, e, t = 0, r = "", i = arguments.length; t < i; t++)
    (s = arguments[t]) && (e = $i(s)) && (r && (r += " "), (r += e));
  return r;
}
const Js = (s) => (typeof s == "boolean" ? `${s}` : s === 0 ? "0" : s),
  Qs = Mi,
  Li = (s, e) => (t) => {
    var r;
    if ((e == null ? void 0 : e.variants) == null)
      return Qs(
        s,
        t == null ? void 0 : t.class,
        t == null ? void 0 : t.className,
      );
    const { variants: i, defaultVariants: n } = e,
      o = Object.keys(i).map((u) => {
        const h = t == null ? void 0 : t[u],
          p = n == null ? void 0 : n[u];
        if (h === null) return null;
        const y = Js(h) || Js(p);
        return i[u][y];
      }),
      a =
        t &&
        Object.entries(t).reduce((u, h) => {
          let [p, y] = h;
          return (y === void 0 || (u[p] = y), u);
        }, {}),
      c =
        e == null || (r = e.compoundVariants) === null || r === void 0
          ? void 0
          : r.reduce((u, h) => {
              let { class: p, className: y, ...b } = h;
              return Object.entries(b).every((k) => {
                let [I, P] = k;
                return Array.isArray(P)
                  ? P.includes({ ...n, ...a }[I])
                  : { ...n, ...a }[I] === P;
              })
                ? [...u, p, y]
                : u;
            }, []);
    return Qs(
      s,
      o,
      c,
      t == null ? void 0 : t.class,
      t == null ? void 0 : t.className,
    );
  },
  bs = "-",
  no = (s) => {
    const e = ao(s),
      { conflictingClassGroups: t, conflictingClassGroupModifiers: r } = s;
    return {
      getClassGroupId: (o) => {
        const a = o.split(bs);
        return (a[0] === "" && a.length !== 1 && a.shift(), Fi(a, e) || oo(o));
      },
      getConflictingClassGroupIds: (o, a) => {
        const c = t[o] || [];
        return a && r[o] ? [...c, ...r[o]] : c;
      },
    };
  },
  Fi = (s, e) => {
    var o;
    if (s.length === 0) return e.classGroupId;
    const t = s[0],
      r = e.nextPart.get(t),
      i = r ? Fi(s.slice(1), r) : void 0;
    if (i) return i;
    if (e.validators.length === 0) return;
    const n = s.join(bs);
    return (o = e.validators.find(({ validator: a }) => a(n))) == null
      ? void 0
      : o.classGroupId;
  },
  Ys = /^\[(.+)\]$/,
  oo = (s) => {
    if (Ys.test(s)) {
      const e = Ys.exec(s)[1],
        t = e == null ? void 0 : e.substring(0, e.indexOf(":"));
      if (t) return "arbitrary.." + t;
    }
  },
  ao = (s) => {
    const { theme: e, classGroups: t } = s,
      r = { nextPart: new Map(), validators: [] };
    for (const i in t) ls(t[i], r, i, e);
    return r;
  },
  ls = (s, e, t, r) => {
    s.forEach((i) => {
      if (typeof i == "string") {
        const n = i === "" ? e : Xs(e, i);
        n.classGroupId = t;
        return;
      }
      if (typeof i == "function") {
        if (lo(i)) {
          ls(i(r), e, t, r);
          return;
        }
        e.validators.push({ validator: i, classGroupId: t });
        return;
      }
      Object.entries(i).forEach(([n, o]) => {
        ls(o, Xs(e, n), t, r);
      });
    });
  },
  Xs = (s, e) => {
    let t = s;
    return (
      e.split(bs).forEach((r) => {
        (t.nextPart.has(r) ||
          t.nextPart.set(r, { nextPart: new Map(), validators: [] }),
          (t = t.nextPart.get(r)));
      }),
      t
    );
  },
  lo = (s) => s.isThemeGetter,
  co = (s) => {
    if (s < 1) return { get: () => {}, set: () => {} };
    let e = 0,
      t = new Map(),
      r = new Map();
    const i = (n, o) => {
      (t.set(n, o), e++, e > s && ((e = 0), (r = t), (t = new Map())));
    };
    return {
      get(n) {
        let o = t.get(n);
        if (o !== void 0) return o;
        if ((o = r.get(n)) !== void 0) return (i(n, o), o);
      },
      set(n, o) {
        t.has(n) ? t.set(n, o) : i(n, o);
      },
    };
  },
  cs = "!",
  ds = ":",
  uo = ds.length,
  ho = (s) => {
    const { prefix: e, experimentalParseClassName: t } = s;
    let r = (i) => {
      const n = [];
      let o = 0,
        a = 0,
        c = 0,
        u;
      for (let k = 0; k < i.length; k++) {
        let I = i[k];
        if (o === 0 && a === 0) {
          if (I === ds) {
            (n.push(i.slice(c, k)), (c = k + uo));
            continue;
          }
          if (I === "/") {
            u = k;
            continue;
          }
        }
        I === "[" ? o++ : I === "]" ? o-- : I === "(" ? a++ : I === ")" && a--;
      }
      const h = n.length === 0 ? i : i.substring(c),
        p = mo(h),
        y = p !== h,
        b = u && u > c ? u - c : void 0;
      return {
        modifiers: n,
        hasImportantModifier: y,
        baseClassName: p,
        maybePostfixModifierPosition: b,
      };
    };
    if (e) {
      const i = e + ds,
        n = r;
      r = (o) =>
        o.startsWith(i)
          ? n(o.substring(i.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: o,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (t) {
      const i = r;
      r = (n) => t({ className: n, parseClassName: i });
    }
    return r;
  },
  mo = (s) =>
    s.endsWith(cs)
      ? s.substring(0, s.length - 1)
      : s.startsWith(cs)
        ? s.substring(1)
        : s,
  fo = (s) => {
    const e = Object.fromEntries(s.orderSensitiveModifiers.map((r) => [r, !0]));
    return (r) => {
      if (r.length <= 1) return r;
      const i = [];
      let n = [];
      return (
        r.forEach((o) => {
          o[0] === "[" || e[o] ? (i.push(...n.sort(), o), (n = [])) : n.push(o);
        }),
        i.push(...n.sort()),
        i
      );
    };
  },
  po = (s) => ({
    cache: co(s.cacheSize),
    parseClassName: ho(s),
    sortModifiers: fo(s),
    ...no(s),
  }),
  go = /\s+/,
  yo = (s, e) => {
    const {
        parseClassName: t,
        getClassGroupId: r,
        getConflictingClassGroupIds: i,
        sortModifiers: n,
      } = e,
      o = [],
      a = s.trim().split(go);
    let c = "";
    for (let u = a.length - 1; u >= 0; u -= 1) {
      const h = a[u],
        {
          isExternal: p,
          modifiers: y,
          hasImportantModifier: b,
          baseClassName: k,
          maybePostfixModifierPosition: I,
        } = t(h);
      if (p) {
        c = h + (c.length > 0 ? " " + c : c);
        continue;
      }
      let P = !!I,
        L = r(P ? k.substring(0, I) : k);
      if (!L) {
        if (!P) {
          c = h + (c.length > 0 ? " " + c : c);
          continue;
        }
        if (((L = r(k)), !L)) {
          c = h + (c.length > 0 ? " " + c : c);
          continue;
        }
        P = !1;
      }
      const G = n(y).join(":"),
        O = b ? G + cs : G,
        A = O + L;
      if (o.includes(A)) continue;
      o.push(A);
      const H = i(L, P);
      for (let J = 0; J < H.length; ++J) {
        const te = H[J];
        o.push(O + te);
      }
      c = h + (c.length > 0 ? " " + c : c);
    }
    return c;
  };
function vo() {
  let s = 0,
    e,
    t,
    r = "";
  for (; s < arguments.length; )
    (e = arguments[s++]) && (t = Ui(e)) && (r && (r += " "), (r += t));
  return r;
}
const Ui = (s) => {
  if (typeof s == "string") return s;
  let e,
    t = "";
  for (let r = 0; r < s.length; r++)
    s[r] && (e = Ui(s[r])) && (t && (t += " "), (t += e));
  return t;
};
function bo(s, ...e) {
  let t,
    r,
    i,
    n = o;
  function o(c) {
    const u = e.reduce((h, p) => p(h), s());
    return ((t = po(u)), (r = t.cache.get), (i = t.cache.set), (n = a), a(c));
  }
  function a(c) {
    const u = r(c);
    if (u) return u;
    const h = yo(c, t);
    return (i(c, h), h);
  }
  return function () {
    return n(vo.apply(null, arguments));
  };
}
const Te = (s) => {
    const e = (t) => t[s] || [];
    return ((e.isThemeGetter = !0), e);
  },
  Bi = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  qi = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  wo = /^\d+\/\d+$/,
  _o = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  xo =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  So = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Co = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  ko =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Pt = (s) => wo.test(s),
  ne = (s) => !!s && !Number.isNaN(Number(s)),
  mt = (s) => !!s && Number.isInteger(Number(s)),
  Yr = (s) => s.endsWith("%") && ne(s.slice(0, -1)),
  dt = (s) => _o.test(s),
  To = () => !0,
  Eo = (s) => xo.test(s) && !So.test(s),
  Vi = () => !1,
  Io = (s) => Co.test(s),
  Oo = (s) => ko.test(s),
  Po = (s) => !F(s) && !U(s),
  jo = (s) => Xt(s, Gi, Vi),
  F = (s) => Bi.test(s),
  _t = (s) => Xt(s, Wi, Eo),
  Xr = (s) => Xt(s, $o, ne),
  Zs = (s) => Xt(s, Hi, Vi),
  No = (s) => Xt(s, zi, Oo),
  Er = (s) => Xt(s, Ki, Io),
  U = (s) => qi.test(s),
  nr = (s) => Zt(s, Wi),
  Ao = (s) => Zt(s, Mo),
  ei = (s) => Zt(s, Hi),
  Do = (s) => Zt(s, Gi),
  Ro = (s) => Zt(s, zi),
  Ir = (s) => Zt(s, Ki, !0),
  Xt = (s, e, t) => {
    const r = Bi.exec(s);
    return r ? (r[1] ? e(r[1]) : t(r[2])) : !1;
  },
  Zt = (s, e, t = !1) => {
    const r = qi.exec(s);
    return r ? (r[1] ? e(r[1]) : t) : !1;
  },
  Hi = (s) => s === "position" || s === "percentage",
  zi = (s) => s === "image" || s === "url",
  Gi = (s) => s === "length" || s === "size" || s === "bg-size",
  Wi = (s) => s === "length",
  $o = (s) => s === "number",
  Mo = (s) => s === "family-name",
  Ki = (s) => s === "shadow",
  Lo = () => {
    const s = Te("color"),
      e = Te("font"),
      t = Te("text"),
      r = Te("font-weight"),
      i = Te("tracking"),
      n = Te("leading"),
      o = Te("breakpoint"),
      a = Te("container"),
      c = Te("spacing"),
      u = Te("radius"),
      h = Te("shadow"),
      p = Te("inset-shadow"),
      y = Te("text-shadow"),
      b = Te("drop-shadow"),
      k = Te("blur"),
      I = Te("perspective"),
      P = Te("aspect"),
      L = Te("ease"),
      G = Te("animate"),
      O = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      A = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      H = () => [...A(), U, F],
      J = () => ["auto", "hidden", "clip", "visible", "scroll"],
      te = () => ["auto", "contain", "none"],
      z = () => [U, F, c],
      he = () => [Pt, "full", "auto", ...z()],
      ce = () => [mt, "none", "subgrid", U, F],
      ge = () => ["auto", { span: ["full", mt, U, F] }, mt, U, F],
      Ne = () => [mt, "auto", U, F],
      Re = () => ["auto", "min", "max", "fr", U, F],
      Me = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      Ee = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      R = () => ["auto", ...z()],
      ue = () => [
        Pt,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...z(),
      ],
      q = () => [s, U, F],
      oe = () => [...A(), ei, Zs, { position: [U, F] }],
      Ce = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      ye = () => ["auto", "cover", "contain", Do, jo, { size: [U, F] }],
      Ze = () => [Yr, nr, _t],
      we = () => ["", "none", "full", u, U, F],
      je = () => ["", ne, nr, _t],
      et = () => ["solid", "dashed", "dotted", "double"],
      Et = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      N = () => [ne, Yr, ei, Zs],
      le = () => ["", "none", k, U, F],
      W = () => ["none", ne, U, F],
      Z = () => ["none", ne, U, F],
      _e = () => [ne, U, F],
      Le = () => [Pt, "full", ...z()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [dt],
        breakpoint: [dt],
        color: [To],
        container: [dt],
        "drop-shadow": [dt],
        ease: ["in", "out", "in-out"],
        font: [Po],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [dt],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [dt],
        shadow: [dt],
        spacing: ["px", ne],
        text: [dt],
        "text-shadow": [dt],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", Pt, F, U, P] }],
        container: ["container"],
        columns: [{ columns: [ne, F, U, a] }],
        "break-after": [{ "break-after": O() }],
        "break-before": [{ "break-before": O() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: H() }],
        overflow: [{ overflow: J() }],
        "overflow-x": [{ "overflow-x": J() }],
        "overflow-y": [{ "overflow-y": J() }],
        overscroll: [{ overscroll: te() }],
        "overscroll-x": [{ "overscroll-x": te() }],
        "overscroll-y": [{ "overscroll-y": te() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: he() }],
        "inset-x": [{ "inset-x": he() }],
        "inset-y": [{ "inset-y": he() }],
        start: [{ start: he() }],
        end: [{ end: he() }],
        top: [{ top: he() }],
        right: [{ right: he() }],
        bottom: [{ bottom: he() }],
        left: [{ left: he() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [mt, "auto", U, F] }],
        basis: [{ basis: [Pt, "full", "auto", a, ...z()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [ne, Pt, "auto", "initial", "none", F] }],
        grow: [{ grow: ["", ne, U, F] }],
        shrink: [{ shrink: ["", ne, U, F] }],
        order: [{ order: [mt, "first", "last", "none", U, F] }],
        "grid-cols": [{ "grid-cols": ce() }],
        "col-start-end": [{ col: ge() }],
        "col-start": [{ "col-start": Ne() }],
        "col-end": [{ "col-end": Ne() }],
        "grid-rows": [{ "grid-rows": ce() }],
        "row-start-end": [{ row: ge() }],
        "row-start": [{ "row-start": Ne() }],
        "row-end": [{ "row-end": Ne() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": Re() }],
        "auto-rows": [{ "auto-rows": Re() }],
        gap: [{ gap: z() }],
        "gap-x": [{ "gap-x": z() }],
        "gap-y": [{ "gap-y": z() }],
        "justify-content": [{ justify: [...Me(), "normal"] }],
        "justify-items": [{ "justify-items": [...Ee(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...Ee()] }],
        "align-content": [{ content: ["normal", ...Me()] }],
        "align-items": [{ items: [...Ee(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...Ee(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": Me() }],
        "place-items": [{ "place-items": [...Ee(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...Ee()] }],
        p: [{ p: z() }],
        px: [{ px: z() }],
        py: [{ py: z() }],
        ps: [{ ps: z() }],
        pe: [{ pe: z() }],
        pt: [{ pt: z() }],
        pr: [{ pr: z() }],
        pb: [{ pb: z() }],
        pl: [{ pl: z() }],
        m: [{ m: R() }],
        mx: [{ mx: R() }],
        my: [{ my: R() }],
        ms: [{ ms: R() }],
        me: [{ me: R() }],
        mt: [{ mt: R() }],
        mr: [{ mr: R() }],
        mb: [{ mb: R() }],
        ml: [{ ml: R() }],
        "space-x": [{ "space-x": z() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": z() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: ue() }],
        w: [{ w: [a, "screen", ...ue()] }],
        "min-w": [{ "min-w": [a, "screen", "none", ...ue()] }],
        "max-w": [
          { "max-w": [a, "screen", "none", "prose", { screen: [o] }, ...ue()] },
        ],
        h: [{ h: ["screen", "lh", ...ue()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...ue()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...ue()] }],
        "font-size": [{ text: ["base", t, nr, _t] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [r, U, Xr] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              Yr,
              F,
            ],
          },
        ],
        "font-family": [{ font: [Ao, F, e] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [i, U, F] }],
        "line-clamp": [{ "line-clamp": [ne, "none", U, Xr] }],
        leading: [{ leading: [n, ...z()] }],
        "list-image": [{ "list-image": ["none", U, F] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", U, F] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: q() }],
        "text-color": [{ text: q() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...et(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [ne, "from-font", "auto", U, _t] },
        ],
        "text-decoration-color": [{ decoration: q() }],
        "underline-offset": [{ "underline-offset": [ne, "auto", U, F] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: z() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              U,
              F,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", U, F] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: oe() }],
        "bg-repeat": [{ bg: Ce() }],
        "bg-size": [{ bg: ye() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  mt,
                  U,
                  F,
                ],
                radial: ["", U, F],
                conic: [mt, U, F],
              },
              Ro,
              No,
            ],
          },
        ],
        "bg-color": [{ bg: q() }],
        "gradient-from-pos": [{ from: Ze() }],
        "gradient-via-pos": [{ via: Ze() }],
        "gradient-to-pos": [{ to: Ze() }],
        "gradient-from": [{ from: q() }],
        "gradient-via": [{ via: q() }],
        "gradient-to": [{ to: q() }],
        rounded: [{ rounded: we() }],
        "rounded-s": [{ "rounded-s": we() }],
        "rounded-e": [{ "rounded-e": we() }],
        "rounded-t": [{ "rounded-t": we() }],
        "rounded-r": [{ "rounded-r": we() }],
        "rounded-b": [{ "rounded-b": we() }],
        "rounded-l": [{ "rounded-l": we() }],
        "rounded-ss": [{ "rounded-ss": we() }],
        "rounded-se": [{ "rounded-se": we() }],
        "rounded-ee": [{ "rounded-ee": we() }],
        "rounded-es": [{ "rounded-es": we() }],
        "rounded-tl": [{ "rounded-tl": we() }],
        "rounded-tr": [{ "rounded-tr": we() }],
        "rounded-br": [{ "rounded-br": we() }],
        "rounded-bl": [{ "rounded-bl": we() }],
        "border-w": [{ border: je() }],
        "border-w-x": [{ "border-x": je() }],
        "border-w-y": [{ "border-y": je() }],
        "border-w-s": [{ "border-s": je() }],
        "border-w-e": [{ "border-e": je() }],
        "border-w-t": [{ "border-t": je() }],
        "border-w-r": [{ "border-r": je() }],
        "border-w-b": [{ "border-b": je() }],
        "border-w-l": [{ "border-l": je() }],
        "divide-x": [{ "divide-x": je() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": je() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...et(), "hidden", "none"] }],
        "divide-style": [{ divide: [...et(), "hidden", "none"] }],
        "border-color": [{ border: q() }],
        "border-color-x": [{ "border-x": q() }],
        "border-color-y": [{ "border-y": q() }],
        "border-color-s": [{ "border-s": q() }],
        "border-color-e": [{ "border-e": q() }],
        "border-color-t": [{ "border-t": q() }],
        "border-color-r": [{ "border-r": q() }],
        "border-color-b": [{ "border-b": q() }],
        "border-color-l": [{ "border-l": q() }],
        "divide-color": [{ divide: q() }],
        "outline-style": [{ outline: [...et(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [ne, U, F] }],
        "outline-w": [{ outline: ["", ne, nr, _t] }],
        "outline-color": [{ outline: q() }],
        shadow: [{ shadow: ["", "none", h, Ir, Er] }],
        "shadow-color": [{ shadow: q() }],
        "inset-shadow": [{ "inset-shadow": ["none", p, Ir, Er] }],
        "inset-shadow-color": [{ "inset-shadow": q() }],
        "ring-w": [{ ring: je() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: q() }],
        "ring-offset-w": [{ "ring-offset": [ne, _t] }],
        "ring-offset-color": [{ "ring-offset": q() }],
        "inset-ring-w": [{ "inset-ring": je() }],
        "inset-ring-color": [{ "inset-ring": q() }],
        "text-shadow": [{ "text-shadow": ["none", y, Ir, Er] }],
        "text-shadow-color": [{ "text-shadow": q() }],
        opacity: [{ opacity: [ne, U, F] }],
        "mix-blend": [
          { "mix-blend": [...Et(), "plus-darker", "plus-lighter"] },
        ],
        "bg-blend": [{ "bg-blend": Et() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [ne] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": N() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": N() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": q() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": q() }],
        "mask-image-t-from-pos": [{ "mask-t-from": N() }],
        "mask-image-t-to-pos": [{ "mask-t-to": N() }],
        "mask-image-t-from-color": [{ "mask-t-from": q() }],
        "mask-image-t-to-color": [{ "mask-t-to": q() }],
        "mask-image-r-from-pos": [{ "mask-r-from": N() }],
        "mask-image-r-to-pos": [{ "mask-r-to": N() }],
        "mask-image-r-from-color": [{ "mask-r-from": q() }],
        "mask-image-r-to-color": [{ "mask-r-to": q() }],
        "mask-image-b-from-pos": [{ "mask-b-from": N() }],
        "mask-image-b-to-pos": [{ "mask-b-to": N() }],
        "mask-image-b-from-color": [{ "mask-b-from": q() }],
        "mask-image-b-to-color": [{ "mask-b-to": q() }],
        "mask-image-l-from-pos": [{ "mask-l-from": N() }],
        "mask-image-l-to-pos": [{ "mask-l-to": N() }],
        "mask-image-l-from-color": [{ "mask-l-from": q() }],
        "mask-image-l-to-color": [{ "mask-l-to": q() }],
        "mask-image-x-from-pos": [{ "mask-x-from": N() }],
        "mask-image-x-to-pos": [{ "mask-x-to": N() }],
        "mask-image-x-from-color": [{ "mask-x-from": q() }],
        "mask-image-x-to-color": [{ "mask-x-to": q() }],
        "mask-image-y-from-pos": [{ "mask-y-from": N() }],
        "mask-image-y-to-pos": [{ "mask-y-to": N() }],
        "mask-image-y-from-color": [{ "mask-y-from": q() }],
        "mask-image-y-to-color": [{ "mask-y-to": q() }],
        "mask-image-radial": [{ "mask-radial": [U, F] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": N() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": N() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": q() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": q() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": A() }],
        "mask-image-conic-pos": [{ "mask-conic": [ne] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": N() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": N() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": q() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": q() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: oe() }],
        "mask-repeat": [{ mask: Ce() }],
        "mask-size": [{ mask: ye() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", U, F] }],
        filter: [{ filter: ["", "none", U, F] }],
        blur: [{ blur: le() }],
        brightness: [{ brightness: [ne, U, F] }],
        contrast: [{ contrast: [ne, U, F] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", b, Ir, Er] }],
        "drop-shadow-color": [{ "drop-shadow": q() }],
        grayscale: [{ grayscale: ["", ne, U, F] }],
        "hue-rotate": [{ "hue-rotate": [ne, U, F] }],
        invert: [{ invert: ["", ne, U, F] }],
        saturate: [{ saturate: [ne, U, F] }],
        sepia: [{ sepia: ["", ne, U, F] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", U, F] }],
        "backdrop-blur": [{ "backdrop-blur": le() }],
        "backdrop-brightness": [{ "backdrop-brightness": [ne, U, F] }],
        "backdrop-contrast": [{ "backdrop-contrast": [ne, U, F] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", ne, U, F] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [ne, U, F] }],
        "backdrop-invert": [{ "backdrop-invert": ["", ne, U, F] }],
        "backdrop-opacity": [{ "backdrop-opacity": [ne, U, F] }],
        "backdrop-saturate": [{ "backdrop-saturate": [ne, U, F] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", ne, U, F] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": z() }],
        "border-spacing-x": [{ "border-spacing-x": z() }],
        "border-spacing-y": [{ "border-spacing-y": z() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              U,
              F,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [ne, "initial", U, F] }],
        ease: [{ ease: ["linear", "initial", L, U, F] }],
        delay: [{ delay: [ne, U, F] }],
        animate: [{ animate: ["none", G, U, F] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [I, U, F] }],
        "perspective-origin": [{ "perspective-origin": H() }],
        rotate: [{ rotate: W() }],
        "rotate-x": [{ "rotate-x": W() }],
        "rotate-y": [{ "rotate-y": W() }],
        "rotate-z": [{ "rotate-z": W() }],
        scale: [{ scale: Z() }],
        "scale-x": [{ "scale-x": Z() }],
        "scale-y": [{ "scale-y": Z() }],
        "scale-z": [{ "scale-z": Z() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: _e() }],
        "skew-x": [{ "skew-x": _e() }],
        "skew-y": [{ "skew-y": _e() }],
        transform: [{ transform: [U, F, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: H() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: Le() }],
        "translate-x": [{ "translate-x": Le() }],
        "translate-y": [{ "translate-y": Le() }],
        "translate-z": [{ "translate-z": Le() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: q() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: q() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              U,
              F,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": z() }],
        "scroll-mx": [{ "scroll-mx": z() }],
        "scroll-my": [{ "scroll-my": z() }],
        "scroll-ms": [{ "scroll-ms": z() }],
        "scroll-me": [{ "scroll-me": z() }],
        "scroll-mt": [{ "scroll-mt": z() }],
        "scroll-mr": [{ "scroll-mr": z() }],
        "scroll-mb": [{ "scroll-mb": z() }],
        "scroll-ml": [{ "scroll-ml": z() }],
        "scroll-p": [{ "scroll-p": z() }],
        "scroll-px": [{ "scroll-px": z() }],
        "scroll-py": [{ "scroll-py": z() }],
        "scroll-ps": [{ "scroll-ps": z() }],
        "scroll-pe": [{ "scroll-pe": z() }],
        "scroll-pt": [{ "scroll-pt": z() }],
        "scroll-pr": [{ "scroll-pr": z() }],
        "scroll-pb": [{ "scroll-pb": z() }],
        "scroll-pl": [{ "scroll-pl": z() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          { "will-change": ["auto", "scroll", "contents", "transform", U, F] },
        ],
        fill: [{ fill: ["none", ...q()] }],
        "stroke-w": [{ stroke: [ne, nr, _t, Xr] }],
        stroke: [{ stroke: ["none", ...q()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  Fo = bo(Lo);
function Ji(...s) {
  return Fo(Mi(s));
}
const Uo = Li(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-ring/20 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-emerald-700 text-white",
        secondary: "border-transparent bg-slate-100 text-slate-900",
        destructive: "border-transparent bg-rose-600 text-white",
        outline: "border-slate-200 text-slate-800",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
function Zr({ className: s, variant: e, ...t }) {
  return l.jsx("div", { className: Ji(Uo({ variant: e }), s), ...t });
}
const Bo = Li(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-[0.5px]",
    {
      variants: {
        variant: {
          default:
            "bg-emerald-700 text-white shadow-sm hover:bg-emerald-800 hover:shadow-md",
          destructive:
            "bg-rose-600 text-white shadow-sm hover:bg-rose-700 hover:shadow-md",
          outline:
            "border border-slate-300 bg-white text-slate-900 shadow-sm hover:bg-slate-50 hover:shadow-md",
          secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
          ghost:
            "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900",
          link: "text-emerald-700 underline-offset-4 hover:underline",
        },
        size: {
          default: "h-10 px-4",
          xs: "h-8 px-2.5 text-xs",
          sm: "h-9 px-3 text-sm",
          lg: "h-11 px-6 text-base",
          icon: "h-10 w-10 p-0",
          iconSm: "h-8 w-8 p-0",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    },
  ),
  nt = x.forwardRef(
    ({ className: s, variant: e, size: t, asChild: r = !1, ...i }, n) => {
      const o = r ? zn : "button";
      return l.jsx(o, {
        className: Ji(Bo({ variant: e, size: t, className: s })),
        ref: n,
        ...i,
      });
    },
  );
nt.displayName = "Button";
const dr = ({
    size: s = "md",
    className: e = "",
    showText: t = !0,
    markClassName: r = "",
    textClassName: i = "",
  }) => {
    const n = {
        xxs: "w-6 h-6",
        xs: "w-10 h-10",
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32",
      },
      o = {
        xxs: "text-xs",
        xs: "text-sm",
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-4xl",
      },
      a = r.trim() ? r : n[s],
      c = i.trim() ? i : o[s];
    return l.jsxs("div", {
      className: `flex items-center gap-2 ${e}`,
      role: "img",
      "aria-label": "Bundleist",
      children: [
        l.jsx("div", {
          className: [
            a,
            "rounded-2xl bg-gradient-to-br from-slate-950 to-slate-800",
            "ring-1 ring-white/10 shadow-sm",
            "flex items-center justify-center",
          ].join(" "),
          children: l.jsx("svg", {
            width: "100%",
            height: "100%",
            xmlns: "http://www.w3.org/2000/svg",
            className: "w-[78%] h-[78%]",
            viewBox: "0 0 64 64",
            "aria-hidden": "true",
            focusable: "false",
            children: l.jsx("path", {
              d: "M22 16v32M22 16h16a10 10 0 0 1 0 20H22M22 36h18a10 10 0 0 1 0 20H22",
              fill: "none",
              stroke: "#34d399",
              strokeWidth: "7.5",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }),
          }),
        }),
        t &&
          l.jsx("div", {
            className: `${c} leading-none`,
            children: l.jsxs("span", {
              className: "font-semibold tracking-tight text-slate-900",
              style: {
                fontFamily:
                  '"Space Grotesk", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
              },
              children: [
                l.jsx("span", { className: i, children: "Bundle" }),
                l.jsx("span", {
                  className: ["text-emerald-600", i].join(" "),
                  children: "ist",
                }),
              ],
            }),
          }),
      ],
    });
  },
  Qi = x.createContext(null);
function qo({ value: s, children: e }) {
  return l.jsx(Qi.Provider, { value: s, children: e });
}
function jc() {
  const s = x.useContext(Qi);
  if (!s) throw new Error("useAppShell must be used within <AppShellProvider>");
  return s;
}
function Vo(s, e, t) {
  const i = s
    .filter((n) =>
      t
        ? n.userId === null || n.userId === e
        : n.userId === e || n.userId === null,
    )
    .reduce((n, o) => {
      const a =
        o.eventType && o.relatedEntityId
          ? `${o.eventType}-${o.relatedEntityId}`
          : `${o.linkToPage}-${o.linkToId}-${o.message.substring(0, 50)}`;
      return (
        (!n[a] || new Date(o.timestamp) > new Date(n[a].timestamp)) &&
          (n[a] = o),
        n
      );
    }, {});
  return Object.values(i).sort(
    (n, o) => new Date(o.timestamp).getTime() - new Date(n.timestamp).getTime(),
  );
}
function Ho(s) {
  if (s.includes("status changed")) {
    const e = s.match(/^(.*?)\s+status changed/);
    return e ? e[1] : "Status update";
  }
  return s.toLowerCase().includes("payment")
    ? "Payment update"
    : s.toLowerCase().includes("consolidation")
      ? "Consolidation update"
      : s.toLowerCase().includes("shipment")
        ? "Shipment update"
        : s.toLowerCase().includes("order")
          ? "Order update"
          : s.length > 44
            ? s.substring(0, 44) + "..."
            : s;
}
function zo(s) {
  const t = Math.floor((new Date().getTime() - s.getTime()) / 1e3);
  return t < 60
    ? "now"
    : t < 3600
      ? `${Math.floor(t / 60)}m`
      : t < 86400
        ? `${Math.floor(t / 3600)}h`
        : t < 604800
          ? `${Math.floor(t / 86400)}d`
          : s.toLocaleDateString();
}
function Go(s) {
  const e = (s || "medium").toLowerCase();
  return e === "critical"
    ? { label: "Critical", cls: "bg-rose-100 text-rose-800 border-rose-200" }
    : e === "high"
      ? {
          label: "High",
          cls: "bg-orange-100 text-orange-800 border-orange-200",
        }
      : e === "low"
        ? { label: "Low", cls: "bg-slate-100 text-slate-700 border-slate-200" }
        : { label: "Med", cls: "bg-sky-100 text-sky-800 border-sky-200" };
}
var St = ((s) => ((s.Admin = "admin"), (s.Customer = "customer"), s))(St || {}),
  qe = ((s) => (
    (s.Trial = "trial"),
    (s.Growth = "growth"),
    (s.Corporate = "corporate"),
    s
  ))(qe || {}),
  d = ((s) => (
    (s.Pending = "Pending"),
    (s.Processing = "Processing"),
    (s.QualityCheck = "QualityCheck"),
    (s.ReadyToShip = "ReadyToShip"),
    (s.InConsolidation = "InConsolidation"),
    (s.InTransit = "InTransit"),
    (s.AtOriginPort = "AtOriginPort"),
    (s.InTransitSea = "InTransitSea"),
    (s.AtDestinationPort = "AtDestinationPort"),
    (s.CustomsClearance = "CustomsClearance"),
    (s.AwaitingDelivery = "AwaitingDelivery"),
    (s.OutForDelivery = "OutForDelivery"),
    (s.Delivered = "Delivered"),
    (s.Completed = "Completed"),
    (s.Cancelled = "Cancelled"),
    (s.OnHold = "OnHold"),
    s
  ))(d || {});
const $r = [
  {
    id: "20ft_std",
    name: "20ft Standard",
    maxVolumeM3: 33.2,
    maxWeightKG: 21600,
  },
  {
    id: "40ft_std",
    name: "40ft Standard",
    maxVolumeM3: 67.7,
    maxWeightKG: 26500,
  },
  {
    id: "40ft_hc",
    name: "40ft High Cube",
    maxVolumeM3: 76.4,
    maxWeightKG: 26500,
  },
  {
    id: "45ft_hc",
    name: "45ft High Cube",
    maxVolumeM3: 86,
    maxWeightKG: 27700,
  },
  {
    id: "20ft_open_top",
    name: "20ft Open Top",
    maxVolumeM3: 32.6,
    maxWeightKG: 21800,
  },
  {
    id: "40ft_open_top",
    name: "40ft Open Top",
    maxVolumeM3: 66.2,
    maxWeightKG: 26680,
  },
  {
    id: "20ft_flat_rack",
    name: "20ft Flat Rack",
    maxVolumeM3: 28,
    maxWeightKG: 27400,
  },
  {
    id: "40ft_flat_rack",
    name: "40ft Flat Rack",
    maxVolumeM3: 54,
    maxWeightKG: 3e4,
  },
  {
    id: "20ft_reefer",
    name: "20ft Refrigerated",
    maxVolumeM3: 28.1,
    maxWeightKG: 2e4,
  },
  {
    id: "40ft_reefer",
    name: "40ft Refrigerated",
    maxVolumeM3: 59.3,
    maxWeightKG: 22e3,
  },
  {
    id: "40ft_hc_reefer",
    name: "40ft HC Refrigerated",
    maxVolumeM3: 67.3,
    maxWeightKG: 22e3,
  },
  {
    id: "53ft_hc",
    name: "53ft High Cube",
    maxVolumeM3: 110,
    maxWeightKG: 34e3,
  },
];
var m = ((s) => (
    (s.Planning = "Planning"),
    (s.OrderCollection = "OrderCollection"),
    (s.DocumentPreparation = "DocumentPreparation"),
    (s.Loading = "Loading"),
    (s.QualityCheck = "QualityCheck"),
    (s.ReadyToShip = "ReadyToShip"),
    (s.InTransit = "InTransit"),
    (s.AtOriginPort = "AtOriginPort"),
    (s.InTransitSea = "InTransitSea"),
    (s.AtDestinationPort = "AtDestinationPort"),
    (s.CustomsClearance = "CustomsClearance"),
    (s.AwaitingDelivery = "AwaitingDelivery"),
    (s.OutForDelivery = "OutForDelivery"),
    (s.Delivered = "Delivered"),
    (s.Completed = "Completed"),
    (s.Cancelled = "Cancelled"),
    (s.OnHold = "OnHold"),
    s
  ))(m || {}),
  ee = ((s) => (
    (s.IncomingPayment = "IncomingPayment"),
    (s.RefundPayout = "RefundPayout"),
    (s.OrderCost = "OrderCost"),
    (s.ServiceFee = "ServiceFee"),
    (s.ShippingCost = "ShippingCost"),
    (s.MiscellaneousCost = "MiscellaneousCost"),
    (s.OrderCostAdjustment = "OrderCostAdjustment"),
    (s.ServiceFeeAdjustment = "ServiceFeeAdjustment"),
    (s.OrderCostReversal = "OrderCostReversal"),
    (s.ServiceFeeReversal = "ServiceFeeReversal"),
    (s.ShippingCostReversal = "ShippingCostReversal"),
    s
  ))(ee || {}),
  K = ((s) => (
    (s.Low = "low"),
    (s.Medium = "medium"),
    (s.High = "high"),
    (s.Critical = "critical"),
    s
  ))(K || {});
const ti = ["Processing", "QualityCheck", "ReadyToShip"],
  Wo = (s) => l.jsx(Gn, { ...s }),
  Ko = (s) => l.jsx(Wn, { ...s }),
  Jo = (s) => l.jsx(Kn, { ...s }),
  Qo = (s) => l.jsx(Jn, { ...s }),
  Yo = (s) => l.jsx(Qn, { ...s }),
  Xo = (s) => l.jsx(Xn, { ...s }),
  Zo = (s) => l.jsx(Yn, { ...s }),
  ri = (s) =>
    l.jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "w-6 h-6",
      ...s,
      children: l.jsx("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0",
      }),
    }),
  Yi = {
    [qe.Trial]: { name: "Trial", oneTimeFee: 499 },
    [qe.Growth]: { name: "Growth", percentageFee: 0.02 },
    [qe.Corporate]: { name: "Corporate", percentageFee: 0.015 },
  },
  Nc = {
    [d.Pending]: "bg-yellow-100 text-yellow-800",
    [d.Processing]: "bg-blue-100 text-blue-800",
    [d.QualityCheck]: "bg-indigo-100 text-indigo-800",
    [d.ReadyToShip]: "bg-purple-100 text-purple-800",
    [d.InConsolidation]: "bg-violet-100 text-violet-800",
    [d.InTransit]: "bg-teal-100 text-teal-800",
    [d.AtOriginPort]: "bg-cyan-100 text-cyan-800",
    [d.InTransitSea]: "bg-sky-100 text-sky-800",
    [d.AtDestinationPort]: "bg-lime-100 text-lime-800",
    [d.CustomsClearance]: "bg-orange-100 text-orange-800",
    [d.AwaitingDelivery]: "bg-amber-100 text-amber-800",
    [d.OutForDelivery]: "bg-emerald-100 text-emerald-800",
    [d.Delivered]: "bg-green-100 text-green-800",
    [d.Completed]: "bg-green-100 text-green-800",
    [d.Cancelled]: "bg-red-100 text-red-800",
    [d.OnHold]: "bg-gray-100 text-gray-800",
  },
  ea = {
    [d.Pending]: [d.Processing, d.OnHold, d.Cancelled],
    [d.Processing]: [d.QualityCheck, d.Pending, d.OnHold, d.Cancelled],
    [d.QualityCheck]: [d.ReadyToShip, d.Processing, d.OnHold, d.Cancelled],
    [d.ReadyToShip]: [d.InTransit, d.QualityCheck, d.OnHold, d.Cancelled],
    [d.InConsolidation]: [],
    [d.InTransit]: [d.AtOriginPort, d.AwaitingDelivery, d.OnHold],
    [d.AtOriginPort]: [d.InTransitSea, d.AwaitingDelivery, d.OnHold],
    [d.InTransitSea]: [d.AtDestinationPort, d.OnHold],
    [d.AtDestinationPort]: [d.CustomsClearance, d.AwaitingDelivery, d.OnHold],
    [d.CustomsClearance]: [d.AwaitingDelivery, d.OnHold],
    [d.AwaitingDelivery]: [d.OutForDelivery, d.OnHold],
    [d.OutForDelivery]: [d.Delivered, d.AwaitingDelivery, d.OnHold],
    [d.Delivered]: [],
    [d.Completed]: [],
    [d.Cancelled]: [d.ReadyToShip],
    [d.OnHold]: [
      d.Processing,
      d.QualityCheck,
      d.ReadyToShip,
      d.InTransit,
      d.AwaitingDelivery,
    ],
  },
  Ac = {
    [d.Pending]:
      "Order received and awaiting confirmation - No charges applied yet",
    [d.Processing]:
      "Order confirmed and charges applied - Being prepared for shipment",
    [d.QualityCheck]: "Order undergoes quality verification before shipping",
    [d.ReadyToShip]: "Order packed and ready for shipping arrangement",
    [d.InConsolidation]:
      "Order is in a consolidation - Status follows consolidation progress",
    [d.InTransit]: "Order shipped and in transit to destination",
    [d.AtOriginPort]: "Order at origin port/terminal awaiting departure",
    [d.InTransitSea]: "Order on sea/air freight in progress",
    [d.AtDestinationPort]: "Order arrived at destination port/terminal",
    [d.CustomsClearance]: "Order undergoing customs clearance process",
    [d.AwaitingDelivery]: "Order cleared and ready for final delivery",
    [d.OutForDelivery]: "Order out for delivery to customer",
    [d.Delivered]: "Order successfully delivered to customer",
    [d.Completed]: "Order completed",
    [d.Cancelled]: "Order has been cancelled",
    [d.OnHold]: "Order temporarily on hold awaiting resolution",
  },
  Dc = {
    Preparation: [d.Pending, d.Processing, d.QualityCheck, d.ReadyToShip],
    Shipping: [
      d.InConsolidation,
      d.InTransit,
      d.AtOriginPort,
      d.InTransitSea,
      d.AtDestinationPort,
      d.CustomsClearance,
    ],
    Delivery: [d.AwaitingDelivery, d.OutForDelivery],
    Final: [d.Delivered, d.Completed, d.Cancelled, d.OnHold],
  },
  Rc = (s) =>
    [
      d.InTransit,
      d.AtOriginPort,
      d.InTransitSea,
      d.AtDestinationPort,
      d.CustomsClearance,
      d.AwaitingDelivery,
      d.OutForDelivery,
      d.Delivered,
      d.Completed,
    ].includes(s)
      ? "shipments"
      : "orders",
  $c = (s) => ea[s] || [],
  Mc = {
    [m.Planning]: "bg-gray-100 text-gray-800",
    [m.OrderCollection]: "bg-amber-100 text-amber-800",
    [m.DocumentPreparation]: "bg-orange-100 text-orange-800",
    [m.Loading]: "bg-sky-100 text-sky-800",
    [m.QualityCheck]: "bg-indigo-100 text-indigo-800",
    [m.ReadyToShip]: "bg-blue-100 text-blue-800",
    [m.InTransit]: "bg-teal-100 text-teal-800",
    [m.AtOriginPort]: "bg-cyan-100 text-cyan-800",
    [m.InTransitSea]: "bg-blue-200 text-blue-900",
    [m.AtDestinationPort]: "bg-purple-100 text-purple-800",
    [m.CustomsClearance]: "bg-violet-100 text-violet-800",
    [m.AwaitingDelivery]: "bg-pink-100 text-pink-800",
    [m.OutForDelivery]: "bg-rose-100 text-rose-800",
    [m.Delivered]: "bg-lime-100 text-lime-800",
    [m.Completed]: "bg-emerald-100 text-emerald-800",
    [m.Cancelled]: "bg-red-100 text-red-800",
    [m.OnHold]: "bg-yellow-100 text-yellow-800",
  },
  ta = {
    [qe.Trial]:
      "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border border-orange-200 shadow-sm font-medium",
    [qe.Growth]:
      "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm font-medium",
    [qe.Corporate]:
      "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border border-slate-200 shadow-sm font-medium",
  };
(m.Planning,
  m.OrderCollection,
  m.DocumentPreparation,
  m.Loading,
  m.QualityCheck,
  m.ReadyToShip,
  m.InTransit,
  m.AtOriginPort,
  m.InTransitSea,
  m.AtDestinationPort,
  m.CustomsClearance,
  m.AwaitingDelivery,
  m.OutForDelivery,
  m.Delivered,
  m.Completed,
  m.Cancelled,
  m.OnHold);
const ra = {
  [m.Planning]: [m.OrderCollection, m.OnHold, m.Cancelled],
  [m.OrderCollection]: [
    m.DocumentPreparation,
    m.Planning,
    m.OnHold,
    m.Cancelled,
  ],
  [m.DocumentPreparation]: [
    m.Loading,
    m.OrderCollection,
    m.OnHold,
    m.Cancelled,
  ],
  [m.Loading]: [m.QualityCheck, m.DocumentPreparation, m.OnHold, m.Cancelled],
  [m.QualityCheck]: [m.ReadyToShip, m.Loading, m.OnHold, m.Cancelled],
  [m.ReadyToShip]: [m.InTransit, m.QualityCheck, m.OnHold, m.Cancelled],
  [m.InTransit]: [m.AtOriginPort, m.InTransitSea, m.OnHold],
  [m.AtOriginPort]: [m.InTransitSea, m.OnHold],
  [m.InTransitSea]: [m.AtDestinationPort, m.OnHold],
  [m.AtDestinationPort]: [m.CustomsClearance, m.AwaitingDelivery, m.OnHold],
  [m.CustomsClearance]: [m.AwaitingDelivery, m.AtDestinationPort, m.OnHold],
  [m.AwaitingDelivery]: [m.OutForDelivery, m.OnHold],
  [m.OutForDelivery]: [m.Delivered, m.AwaitingDelivery, m.OnHold],
  [m.Delivered]: [m.Completed],
  [m.Completed]: [],
  [m.Cancelled]: [],
  [m.OnHold]: [
    m.Planning,
    m.OrderCollection,
    m.DocumentPreparation,
    m.Loading,
    m.QualityCheck,
    m.ReadyToShip,
    m.InTransit,
    m.AtOriginPort,
    m.InTransitSea,
    m.AtDestinationPort,
    m.CustomsClearance,
    m.AwaitingDelivery,
    m.OutForDelivery,
    m.Cancelled,
  ],
};
(m.Planning + "",
  m.OrderCollection + "",
  m.DocumentPreparation + "",
  m.Loading + "",
  m.QualityCheck + "",
  m.ReadyToShip + "",
  m.InTransit + "",
  m.AtOriginPort + "",
  m.InTransitSea + "",
  m.AtDestinationPort + "",
  m.CustomsClearance + "",
  m.AwaitingDelivery + "",
  m.OutForDelivery + "",
  m.Delivered + "",
  m.Completed + "",
  m.Cancelled + "",
  m.OnHold + "");
const Lc = (s) => ra[s] || [],
  es = 3,
  Xi = [
    { id: "dashboard", label: "Dashboard", icon: Wo },
    { id: "orders", label: "Orders", icon: Ko },
    { id: "consolidations", label: "Consolidations", icon: Jo },
    { id: "shipments", label: "Shipments", icon: Qo },
    { id: "suppliers", label: "Suppliers", icon: Yo },
    { id: "payments", label: "Payments", icon: Zo },
  ],
  si = (s) => {
    const e = new Date(s),
      t = Math.floor((new Date().getTime() - e.getTime()) / 1e3);
    let r = t / 31536e3;
    return r > 1
      ? Math.floor(r) + "y ago"
      : ((r = t / 2592e3),
        r > 1
          ? Math.floor(r) + "mo ago"
          : ((r = t / 86400),
            r > 1
              ? Math.floor(r) + "d ago"
              : ((r = t / 3600),
                r > 1
                  ? Math.floor(r) + "h ago"
                  : ((r = t / 60),
                    r > 1
                      ? Math.floor(r) + "m ago"
                      : Math.floor(t) + "s ago"))));
  },
  ii = (s) => {
    var e;
    return (
      ((e = Xi.find((t) => t.id === s)) == null ? void 0 : e.label) ||
      (s === "customers" ? "Customers" : s.charAt(0).toUpperCase() + s.slice(1))
    );
  };
function ni({
  activePageId: s,
  onNavigate: e,
  customers: t,
  notifications: r,
  markNotificationAsRead: i,
  onSignOut: n,
  currentUserId: o,
  isAdmin: a,
  globalSearchItems: c = [],
  children: u,
}) {
  var Et;
  const [h, p] = x.useState(!1),
    [y, b] = x.useState(!1),
    [k, I] = x.useState(!1),
    [P, L] = x.useState(!1),
    [G, O] = x.useState("all"),
    [A, H] = x.useState(""),
    [J, te] = x.useState(""),
    [z, he] = x.useState(!1),
    ce = x.useRef(null),
    ge = x.useRef(null),
    Ne = x.useRef(null),
    Re = x.useRef(null),
    Me = x.useRef(null),
    Ee = x.useRef(null),
    R = x.useMemo(() => t.find((N) => N.id === o), [t, o]),
    ue = x.useMemo(() => {
      const N = [...Xi];
      return (
        R &&
          R.role === "admin" &&
          N.push({ id: "customers", label: "Customers", icon: Xo }),
        N
      );
    }, [R]);
  (x.useEffect(() => {
    const N = (le) => {
      const W = le.target,
        Z = Ne.current && Ne.current.contains(W),
        _e = Re.current && Re.current.contains(W);
      (!Z && !_e && b(!1),
        Me.current && !Me.current.contains(W) && I(!1),
        Ee.current && !Ee.current.contains(W) && p((Le) => Le && !1));
    };
    return (
      document.addEventListener("mousedown", N),
      () => document.removeEventListener("mousedown", N)
    );
  }, []),
    x.useEffect(() => {
      const N = (le) => {
        !(a && c.length) ||
          !(
            (le.ctrlKey || le.metaKey) &&
            String(le.key).toLowerCase() === "k"
          ) ||
          (le.preventDefault(),
          p(!1),
          b(!1),
          I(!1),
          he(!0),
          setTimeout(() => {
            var _e;
            (_e =
              typeof window < "u" && window.innerWidth < 768
                ? ge.current
                : ce.current) == null || _e.focus();
          }, 0));
      };
      return (
        document.addEventListener("keydown", N),
        () => document.removeEventListener("keydown", N)
      );
    }, [c.length, a]));
  const q = x.useMemo(() => {
      if (!a) return [];
      const N = J.trim().toLowerCase();
      return !N || N.length < es
        ? []
        : (c || [])
            .map((Z) => {
              const Le =
                (`${Z.kind} ${Z.id} ${Z.title} ${Z.subtitle || ""}`
                  .toLowerCase()
                  .includes(N)
                  ? 10
                  : 0) +
                (String(Z.id).toLowerCase().includes(N) ? 5 : 0) +
                (String(Z.title).toLowerCase().includes(N) ? 3 : 0);
              return { it: Z, score: Le };
            })
            .filter((Z) => Z.score > 0)
            .sort((Z, _e) => _e.score - Z.score)
            .slice(0, 10)
            .map((Z) => Z.it);
    }, [J, c, a]),
    oe = (N) => {
      if (!a || !c.length) return null;
      const le = z,
        W =
          N === "mobile"
            ? "mt-2 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
            : "absolute z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden";
      return l.jsxs("div", {
        className: "relative",
        children: [
          l.jsxs("div", {
            className: "relative flex items-center gap-2",
            children: [
              l.jsx("input", {
                ref: N === "mobile" ? ge : ce,
                value: J,
                onChange: (Z) => {
                  (te(Z.target.value), he(!0));
                },
                onFocus: () => he(!0),
                onBlur:
                  N === "sidebar"
                    ? () => setTimeout(() => he(!1), 120)
                    : void 0,
                placeholder: "Search ID or keyword",
                className: [
                  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm outline-none",
                  N === "mobile" ? "h-11 text-base" : "",
                ].join(" "),
              }),
              N === "mobile" &&
                l.jsx(nt, {
                  type: "button",
                  variant: "outline",
                  size: "iconSm",
                  onMouseDown: (Z) => Z.preventDefault(),
                  onClick: () => {
                    (he(!1), te(""));
                  },
                  "aria-label": "Close search",
                  title: "Close search",
                  children: l.jsx(Qr, { className: "h-4 w-4" }),
                }),
            ],
          }),
          le &&
            q.length > 0 &&
            l.jsxs("div", {
              className: W,
              children: [
                l.jsx("div", {
                  className:
                    "px-4 py-2 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200",
                  children: l.jsx("div", {
                    className:
                      "text-[11px] font-semibold uppercase tracking-wider text-slate-500",
                    children: "Jump to",
                  }),
                }),
                l.jsx("div", {
                  className: "max-h-[320px] overflow-y-auto",
                  children: q.map((Z) =>
                    l.jsxs(
                      "button",
                      {
                        type: "button",
                        className:
                          "w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0",
                        onMouseDown: (_e) => _e.preventDefault(),
                        onClick: () => {
                          (he(!1), te(""), e(Z.pageId, Z.itemId || Z.id));
                        },
                        children: [
                          l.jsxs("div", {
                            className:
                              "flex items-center justify-between gap-2",
                            children: [
                              l.jsx("div", {
                                className:
                                  "text-sm font-semibold text-slate-900 truncate",
                                children: Z.title,
                              }),
                              l.jsx("div", {
                                className:
                                  "text-[11px] font-semibold text-slate-500 shrink-0",
                                children: Z.kind,
                              }),
                            ],
                          }),
                          l.jsx("div", {
                            className: "mt-0.5 text-xs text-slate-600 truncate",
                            children: Z.subtitle || Z.id,
                          }),
                        ],
                      },
                      `${Z.kind}-${Z.id}`,
                    ),
                  ),
                }),
              ],
            }),
          le &&
            J.trim().length > 0 &&
            J.trim().length < es &&
            l.jsx("div", {
              className: W,
              children: l.jsxs("div", {
                className: "px-4 py-3 text-xs font-semibold text-slate-500",
                children: ["Type at least ", es, " characters"],
              }),
            }),
        ],
      });
    },
    Ce = x.useMemo(() => Vo(r, o, a), [r, a, o]),
    ye = x.useMemo(() => Ce.filter((N) => !N.isRead).length, [Ce]),
    Ze = (N) => {
      (i(N.id), N.linkToPage && e(N.linkToPage, N.linkToId), b(!1));
    },
    we = () => {
      if (!P) return null;
      const N = A.trim().toLowerCase(),
        le = Ce.filter((W) =>
          (G === "unread" && W.isRead) ||
          (G === "high" &&
            !["high", "critical"].includes(
              String(W.importance || "").toLowerCase(),
            ))
            ? !1
            : N
              ? W.message.toLowerCase().includes(N) ||
                (W.linkToPage || "").toLowerCase().includes(N) ||
                (W.linkToId || "").toLowerCase().includes(N)
              : !0,
        );
      return l.jsxs("div", {
        className: "fixed inset-0 z-[70]",
        children: [
          l.jsx("div", {
            className: "absolute inset-0 bg-black/35",
            onClick: () => L(!1),
          }),
          l.jsxs("div", {
            className:
              "absolute right-0 top-0 h-full w-full sm:w-[520px] bg-white shadow-2xl border-l border-slate-200 overflow-y-auto",
            children: [
              l.jsxs("div", {
                className:
                  "sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur",
                children: [
                  l.jsxs("div", {
                    className: "p-4 flex items-start justify-between gap-3",
                    children: [
                      l.jsxs("div", {
                        className: "min-w-0",
                        children: [
                          l.jsx("div", {
                            className:
                              "text-[11px] text-slate-500 font-semibold uppercase tracking-wider",
                            children: "Activity Center",
                          }),
                          l.jsx("div", {
                            className:
                              "text-lg font-extrabold text-slate-900 truncate",
                            children: a ? "Ops activity" : "Your updates",
                          }),
                        ],
                      }),
                      l.jsx("button", {
                        type: "button",
                        onClick: () => L(!1),
                        className:
                          "shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
                        "aria-label": "Close",
                        title: "Close",
                        children: l.jsx(Qr, { className: "h-5 w-5" }),
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "px-4 pb-4 space-y-3",
                    children: [
                      l.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          l.jsx("button", {
                            type: "button",
                            onClick: () => O("all"),
                            className: [
                              "px-3 py-1.5 rounded-full text-xs font-semibold border",
                              G === "all"
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                            ].join(" "),
                            children: "All",
                          }),
                          l.jsx("button", {
                            type: "button",
                            onClick: () => O("unread"),
                            className: [
                              "px-3 py-1.5 rounded-full text-xs font-semibold border",
                              G === "unread"
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                            ].join(" "),
                            children: "Unread",
                          }),
                          l.jsx("button", {
                            type: "button",
                            onClick: () => O("high"),
                            className: [
                              "px-3 py-1.5 rounded-full text-xs font-semibold border",
                              G === "high"
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                            ].join(" "),
                            children: "High",
                          }),
                        ],
                      }),
                      l.jsx("div", {
                        className: "relative",
                        children: l.jsx("input", {
                          type: "search",
                          value: A,
                          onChange: (W) => H(W.target.value),
                          placeholder: "Search activity (message, page, id)...",
                          className:
                            "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm outline-none",
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              l.jsxs("div", {
                className: "p-4 bg-slate-50 min-h-full",
                children: [
                  le.length === 0
                    ? l.jsx("div", {
                        className:
                          "rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600",
                        children: "No activity matches your filters.",
                      })
                    : l.jsx("div", {
                        className: "space-y-2",
                        children: le.slice(0, 100).map((W) => {
                          const Z = new Date(W.timestamp),
                            _e = Go(String(W.importance)),
                            Le = !W.isRead;
                          return l.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => {
                                (Le && i(W.id),
                                  W.linkToPage && e(W.linkToPage, W.linkToId),
                                  L(!1));
                              },
                              className: [
                                "w-full text-left rounded-2xl border px-4 py-3 bg-white hover:bg-slate-50 transition-colors",
                                Le
                                  ? "border-emerald-200 shadow-sm"
                                  : "border-slate-200",
                              ].join(" "),
                              children: l.jsxs("div", {
                                className:
                                  "flex items-start justify-between gap-3",
                                children: [
                                  l.jsxs("div", {
                                    className: "min-w-0",
                                    children: [
                                      l.jsxs("div", {
                                        className:
                                          "flex items-center gap-2 flex-wrap",
                                        children: [
                                          l.jsx("div", {
                                            className:
                                              "text-sm font-extrabold text-slate-900 truncate",
                                            children: Ho(W.message),
                                          }),
                                          l.jsx("span", {
                                            className: `inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${_e.cls}`,
                                            children: _e.label,
                                          }),
                                          Le
                                            ? l.jsx("span", {
                                                className:
                                                  "inline-flex items-center text-[11px] font-bold text-emerald-700",
                                                children: "New",
                                              })
                                            : null,
                                        ],
                                      }),
                                      l.jsx("div", {
                                        className:
                                          "mt-1 text-xs text-slate-600 line-clamp-2",
                                        children: W.message,
                                      }),
                                      W.linkToPage || W.linkToId
                                        ? l.jsxs("div", {
                                            className:
                                              "mt-2 text-[11px] font-semibold text-slate-500",
                                            children: [
                                              W.linkToPage ? W.linkToPage : "",
                                              W.linkToId
                                                ? ` • ${W.linkToId}`
                                                : "",
                                            ],
                                          })
                                        : null,
                                    ],
                                  }),
                                  l.jsx("div", {
                                    className:
                                      "shrink-0 text-xs text-slate-500 font-semibold",
                                    children: zo(Z),
                                  }),
                                ],
                              }),
                            },
                            W.id,
                          );
                        }),
                      }),
                  l.jsxs("div", {
                    className: "mt-4 text-[11px] text-slate-500",
                    children: [
                      "Showing ",
                      Math.min(le.length, 100),
                      " of ",
                      le.length,
                      ".",
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    },
    je = ({ item: N, dense: le }) => {
      const W = N.id === s,
        Z = N.icon;
      return l.jsxs("button", {
        type: "button",
        onClick: () => {
          (e(N.id), p(!1));
        },
        "aria-current": W ? "page" : void 0,
        className: [
          "group w-full flex items-center gap-3 rounded-2xl border text-left",
          le ? "px-3 py-2.5" : "px-4 py-3",
          W
            ? "border-slate-900/10 bg-white shadow-sm"
            : "border-transparent hover:border-slate-900/10 hover:bg-white/70",
          "transition-colors",
        ].join(" "),
        children: [
          l.jsx("span", {
            className: [
              "h-10 w-10 rounded-2xl flex items-center justify-center shrink-0",
              W
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white",
              "transition-colors",
            ].join(" "),
            "aria-hidden": "true",
            children: l.jsx(Z, { className: "h-5 w-5" }),
          }),
          l.jsxs("span", {
            className: "min-w-0 flex-1",
            children: [
              l.jsx("span", {
                className:
                  "block text-sm font-semibold text-slate-900 truncate",
                children: N.label,
              }),
              l.jsx("span", {
                className: "block text-[11px] text-slate-500 truncate",
                children: W ? "Active" : "Go to page",
              }),
            ],
          }),
        ],
      });
    },
    et = () => {
      var W, Z;
      const N = a
          ? "A"
          : ((Z =
              (W = R == null ? void 0 : R.contactPerson) == null
                ? void 0
                : W.charAt(0)) == null
              ? void 0
              : Z.toUpperCase()) || "U",
        le = a
          ? "Administrator"
          : (R == null ? void 0 : R.companyName) || "Customer";
      return l.jsxs("button", {
        type: "button",
        onClick: () => I((_e) => !_e),
        className:
          "w-full flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/70 hover:bg-white px-3 py-2.5 shadow-sm transition-colors",
        "aria-haspopup": "true",
        "aria-expanded": k,
        children: [
          l.jsx("span", {
            className:
              "h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold",
            children: N,
          }),
          l.jsxs("span", {
            className: "min-w-0 flex-1 text-left",
            children: [
              l.jsx("span", {
                className:
                  "block text-sm font-semibold text-slate-900 truncate",
                children: a
                  ? "Admin"
                  : (R == null ? void 0 : R.contactPerson) || "User",
              }),
              l.jsx("span", {
                className: "block text-xs text-slate-500 truncate",
                children: le,
              }),
            ],
          }),
        ],
      });
    };
  return l.jsx(qo, {
    value: {
      openActivityCenter: () => L(!0),
      closeActivityCenter: () => L(!1),
    },
    children: l.jsxs("div", {
      className:
        "min-h-screen app-shell-bg [--app-toast-left:0px] md:[--app-toast-left:calc(18rem+1.5rem)]",
      children: [
        l.jsx(we, {}),
        l.jsxs("div", {
          className:
            "md:hidden sticky top-0 z-50 border-b border-slate-900/10 bg-white/75 backdrop-blur",
          children: [
            l.jsxs("div", {
              className: "px-4 py-2 flex items-center justify-between gap-2",
              children: [
                l.jsxs("div", {
                  className: "flex items-center gap-2 shrink-0",
                  children: [
                    l.jsx(nt, {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      onClick: () => p(!0),
                      "aria-label": "Open navigation",
                      children: l.jsx(Zn, { className: "h-5 w-5" }),
                    }),
                    l.jsx("a", {
                      href: "/",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "hover:opacity-80",
                      children: l.jsx(dr, { size: "xs", showText: !1 }),
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "min-w-0 flex-1 px-2",
                  children: [
                    l.jsx("div", {
                      className:
                        "text-xs font-semibold uppercase tracking-wider text-slate-500",
                      children: a ? "Ops" : "Workspace",
                    }),
                    l.jsx("div", {
                      className:
                        "text-sm font-extrabold text-slate-900 truncate",
                      children: ii(s),
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "relative z-10 flex items-center gap-1 shrink-0",
                  children: [
                    a &&
                      c.length > 0 &&
                      l.jsx(nt, {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        onClick: () => {
                          (b(!1),
                            z
                              ? (he(!1), te(""))
                              : (he(!0),
                                setTimeout(() => {
                                  var N;
                                  return (N = ge.current) == null
                                    ? void 0
                                    : N.focus();
                                }, 0)));
                        },
                        "aria-label": "Search",
                        title: "Search",
                        children: l.jsx("svg", {
                          className: "h-5 w-5",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          children: l.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z",
                          }),
                        }),
                      }),
                    l.jsxs("div", {
                      className: "relative",
                      ref: Ne,
                      children: [
                        l.jsxs(nt, {
                          type: "button",
                          variant: "ghost",
                          size: "icon",
                          onClick: () => b((N) => !N),
                          "aria-label": "View notifications",
                          "aria-expanded": y,
                          "aria-haspopup": "true",
                          className: "relative",
                          children: [
                            l.jsx(Ws, { className: "h-5 w-5" }),
                            ye > 0 &&
                              l.jsx(Zr, {
                                variant: "destructive",
                                className:
                                  "absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]",
                                children: ye > 9 ? "9+" : ye,
                              }),
                          ],
                        }),
                        y &&
                          l.jsxs("div", {
                            className:
                              "absolute right-0 mt-2 w-[320px] max-w-[90vw] rounded-2xl shadow-xl bg-white ring-1 ring-black/5 z-50 overflow-hidden border border-slate-200",
                            role: "menu",
                            children: [
                              l.jsxs("div", {
                                className:
                                  "px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white",
                                children: [
                                  l.jsx("div", {
                                    className:
                                      "text-xs font-semibold uppercase tracking-wider text-slate-500",
                                    children: "Notifications",
                                  }),
                                  l.jsx("div", {
                                    className:
                                      "text-sm font-extrabold text-slate-900",
                                    children:
                                      ye > 0 ? `${ye} unread` : "All caught up",
                                  }),
                                ],
                              }),
                              l.jsx("div", {
                                className: "max-h-[60vh] overflow-y-auto",
                                children:
                                  Ce.length === 0
                                    ? l.jsxs("div", {
                                        className:
                                          "px-4 py-10 text-center text-sm text-slate-600",
                                        children: [
                                          l.jsx(ri, {
                                            className:
                                              "h-8 w-8 mx-auto opacity-40",
                                          }),
                                          l.jsx("div", {
                                            className: "mt-2",
                                            children: "No new notifications.",
                                          }),
                                        ],
                                      })
                                    : Ce.slice(0, 10).map((N) =>
                                        l.jsxs(
                                          "button",
                                          {
                                            onClick: () => Ze(N),
                                            className: [
                                              "w-full text-left px-4 py-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors",
                                              N.isRead
                                                ? "bg-white"
                                                : "bg-emerald-50/70",
                                            ].join(" "),
                                            role: "menuitem",
                                            children: [
                                              l.jsx("div", {
                                                className: [
                                                  "text-sm font-semibold leading-snug",
                                                  N.isRead
                                                    ? "text-slate-900"
                                                    : "text-emerald-800",
                                                ].join(" "),
                                                children: N.message,
                                              }),
                                              l.jsx("div", {
                                                className:
                                                  "mt-1 text-xs text-slate-500",
                                                children: si(N.timestamp),
                                              }),
                                            ],
                                          },
                                          N.id,
                                        ),
                                      ),
                              }),
                              l.jsx("div", {
                                className:
                                  "p-2 border-t border-slate-200 bg-white",
                                children: l.jsx("button", {
                                  type: "button",
                                  onClick: () => {
                                    (b(!1), L(!0));
                                  },
                                  className:
                                    "w-full px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left",
                                  children: "Open Activity Center",
                                }),
                              }),
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            a &&
              c.length > 0 &&
              z &&
              l.jsx("div", {
                className: "border-t border-slate-200/70 bg-white/95 px-4 py-3",
                children: oe("mobile"),
              }),
          ],
        }),
        l.jsxs("div", {
          className: "md:grid md:grid-cols-[18rem_1fr] md:gap-6",
          children: [
            l.jsx("aside", {
              className:
                "hidden md:flex md:flex-col md:sticky md:top-0 md:h-screen md:px-4 md:py-5",
              children: l.jsxs("div", {
                className:
                  "app-sidebar-surface rounded-3xl border border-slate-200/70 overflow-hidden h-full flex flex-col shadow-sm",
                children: [
                  l.jsxs("div", {
                    className: "px-5 py-4 border-b border-slate-200/70",
                    children: [
                      l.jsx("a", {
                        href: "/",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className:
                          "inline-flex items-center gap-2 hover:opacity-90",
                        children: l.jsx(dr, { size: "sm", showText: !0 }),
                      }),
                      l.jsx("div", {
                        className: "mt-3 text-xs text-slate-600",
                        children: a ? "Admin workspace" : "Customer workspace",
                      }),
                      l.jsx("div", {
                        className: "mt-3",
                        children: oe("sidebar"),
                      }),
                    ],
                  }),
                  l.jsx("nav", {
                    className: "p-3 space-y-1 overflow-y-auto",
                    children: ue.map((N) => l.jsx(je, { item: N }, N.id)),
                  }),
                  l.jsxs("div", {
                    className: "mt-auto p-3 border-t border-slate-200/70",
                    children: [
                      l.jsxs("div", {
                        className: "relative mb-2",
                        ref: Re,
                        children: [
                          l.jsxs(nt, {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            onClick: () => b((N) => !N),
                            "aria-label": "View notifications",
                            "aria-expanded": y,
                            "aria-haspopup": "true",
                            className: "w-full justify-between",
                            children: [
                              l.jsxs("span", {
                                className: "inline-flex items-center",
                                children: [
                                  l.jsx(Ws, { className: "h-4 w-4 mr-2" }),
                                  "Alerts",
                                ],
                              }),
                              ye > 0 &&
                                l.jsx(Zr, {
                                  variant: "destructive",
                                  className:
                                    "h-5 px-2 flex items-center justify-center text-[11px]",
                                  children: ye > 99 ? "99+" : ye,
                                }),
                            ],
                          }),
                          y &&
                            l.jsxs("div", {
                              className:
                                "origin-bottom-left absolute left-0 right-0 bottom-[2.8rem] rounded-2xl shadow-xl bg-white ring-1 ring-black/5 z-50 overflow-hidden border border-slate-200",
                              role: "menu",
                              children: [
                                l.jsxs("div", {
                                  className:
                                    "px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white",
                                  children: [
                                    l.jsx("div", {
                                      className:
                                        "text-xs font-semibold uppercase tracking-wider text-slate-500",
                                      children: "Notifications",
                                    }),
                                    l.jsx("div", {
                                      className:
                                        "text-sm font-extrabold text-slate-900",
                                      children:
                                        ye > 0
                                          ? `${ye} unread`
                                          : "All caught up",
                                    }),
                                  ],
                                }),
                                l.jsx("div", {
                                  className: "max-h-[420px] overflow-y-auto",
                                  children:
                                    Ce.length === 0
                                      ? l.jsxs("div", {
                                          className:
                                            "px-4 py-10 text-center text-sm text-slate-600",
                                          children: [
                                            l.jsx(ri, {
                                              className:
                                                "h-8 w-8 mx-auto opacity-40",
                                            }),
                                            l.jsx("div", {
                                              className: "mt-2",
                                              children: "No new notifications.",
                                            }),
                                          ],
                                        })
                                      : Ce.slice(0, 10).map((N) =>
                                          l.jsxs(
                                            "button",
                                            {
                                              onClick: () => Ze(N),
                                              className: [
                                                "w-full text-left px-4 py-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors",
                                                N.isRead
                                                  ? "bg-white"
                                                  : "bg-emerald-50/70",
                                              ].join(" "),
                                              role: "menuitem",
                                              children: [
                                                l.jsx("div", {
                                                  className: [
                                                    "text-sm font-semibold leading-snug",
                                                    N.isRead
                                                      ? "text-slate-900"
                                                      : "text-emerald-800",
                                                  ].join(" "),
                                                  children: N.message,
                                                }),
                                                l.jsx("div", {
                                                  className:
                                                    "mt-1 text-xs text-slate-500",
                                                  children: si(N.timestamp),
                                                }),
                                              ],
                                            },
                                            N.id,
                                          ),
                                        ),
                                }),
                                l.jsx("div", {
                                  className:
                                    "p-2 border-t border-slate-200 bg-white",
                                  children: l.jsx("button", {
                                    type: "button",
                                    onClick: () => {
                                      (b(!1), L(!0));
                                    },
                                    className:
                                      "w-full px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left",
                                    children: "Open Activity Center",
                                  }),
                                }),
                              ],
                            }),
                        ],
                      }),
                      l.jsxs("div", {
                        className: "relative",
                        ref: Me,
                        children: [
                          l.jsx(et, {}),
                          k &&
                            l.jsxs("div", {
                              className:
                                "absolute left-0 right-0 bottom-[3.25rem] rounded-2xl shadow-2xl bg-white border border-slate-200 overflow-hidden",
                              children: [
                                l.jsxs("div", {
                                  className:
                                    "px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white",
                                  children: [
                                    l.jsx("div", {
                                      className:
                                        "text-xs font-semibold uppercase tracking-wider text-slate-500",
                                      children: a ? "Admin" : "Company",
                                    }),
                                    l.jsx("div", {
                                      className:
                                        "text-sm font-extrabold text-slate-900 truncate",
                                      children: a
                                        ? "Administrator"
                                        : (R == null
                                            ? void 0
                                            : R.companyName) || "Customer",
                                    }),
                                  ],
                                }),
                                l.jsxs("div", {
                                  className:
                                    "px-4 py-3 text-sm text-slate-700 space-y-2",
                                  children: [
                                    !a &&
                                      R &&
                                      l.jsxs(l.Fragment, {
                                        children: [
                                          l.jsxs("div", {
                                            children: [
                                              l.jsx("span", {
                                                className:
                                                  "text-xs font-semibold uppercase tracking-wider text-slate-500",
                                                children: "Contact",
                                              }),
                                              l.jsx("div", {
                                                className:
                                                  "font-semibold text-slate-900",
                                                children: R.contactPerson,
                                              }),
                                            ],
                                          }),
                                          l.jsxs("div", {
                                            children: [
                                              l.jsx("span", {
                                                className:
                                                  "text-xs font-semibold uppercase tracking-wider text-slate-500",
                                                children: "Email",
                                              }),
                                              l.jsx("div", {
                                                className:
                                                  "font-semibold text-slate-900",
                                                children: R.email,
                                              }),
                                            ],
                                          }),
                                          l.jsxs("div", {
                                            className:
                                              "flex items-center justify-between gap-2",
                                            children: [
                                              l.jsxs("div", {
                                                children: [
                                                  l.jsx("span", {
                                                    className:
                                                      "text-xs font-semibold uppercase tracking-wider text-slate-500",
                                                    children: "Contract",
                                                  }),
                                                  l.jsx("div", {
                                                    className:
                                                      "text-xs text-slate-600 mt-0.5",
                                                    children:
                                                      ((Et =
                                                        Yi[R.contractType]) ==
                                                      null
                                                        ? void 0
                                                        : Et.name) ||
                                                      R.contractType,
                                                  }),
                                                ],
                                              }),
                                              l.jsx(Zr, {
                                                className: [
                                                  ta[R.contractType],
                                                  "px-2 py-1 rounded-xl text-xs font-semibold tracking-wide",
                                                ].join(" "),
                                                children: String(
                                                  R.contractType,
                                                ),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    l.jsxs(nt, {
                                      type: "button",
                                      variant: "outline",
                                      className:
                                        "w-full flex items-center justify-center gap-2",
                                      onClick: () => {
                                        (I(!1), n());
                                      },
                                      children: [
                                        l.jsx(Ks, { className: "h-4 w-4" }),
                                        "Sign Out",
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            h &&
              l.jsxs("div", {
                className: "md:hidden fixed inset-0 z-[60]",
                children: [
                  l.jsx("div", {
                    className: "absolute inset-0 bg-black/40",
                    onClick: () => p(!1),
                  }),
                  l.jsxs("div", {
                    ref: Ee,
                    className:
                      "absolute left-0 top-0 h-full w-[88vw] max-w-[360px] app-sidebar-surface border-r border-slate-200/70 shadow-2xl",
                    children: [
                      l.jsxs("div", {
                        className:
                          "px-4 py-3 border-b border-slate-200/70 flex items-center justify-between",
                        children: [
                          l.jsx("a", {
                            href: "/",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "hover:opacity-90",
                            children: l.jsx(dr, { size: "sm", showText: !0 }),
                          }),
                          l.jsx(nt, {
                            type: "button",
                            variant: "ghost",
                            size: "icon",
                            onClick: () => p(!1),
                            "aria-label": "Close navigation",
                            className: "text-slate-900 hover:bg-slate-100",
                            children: l.jsx(Qr, { className: "h-5 w-5" }),
                          }),
                        ],
                      }),
                      l.jsxs("div", {
                        className: "p-3",
                        children: [
                          l.jsx("div", {
                            className: "text-xs text-slate-600",
                            children: a
                              ? "Admin workspace"
                              : "Customer workspace",
                          }),
                          l.jsx("div", {
                            className:
                              "mt-1 text-base font-extrabold text-slate-900 truncate",
                            children: ii(s),
                          }),
                        ],
                      }),
                      l.jsx("nav", {
                        className: "px-3 pb-3 space-y-1 overflow-y-auto",
                        children: ue.map((N) =>
                          l.jsx(je, { item: N, dense: !0 }, N.id),
                        ),
                      }),
                      l.jsxs("div", {
                        className: "mt-auto p-3 border-t border-slate-200/70",
                        children: [
                          l.jsx("div", {
                            className: "text-slate-600 text-xs mb-2",
                            children: a
                              ? "Signed in as admin"
                              : (R == null ? void 0 : R.companyName) ||
                                "Signed in",
                          }),
                          l.jsxs(nt, {
                            type: "button",
                            variant: "secondary",
                            className:
                              "w-full flex items-center justify-center gap-2",
                            onClick: () => n(),
                            children: [
                              l.jsx(Ks, { className: "h-4 w-4" }),
                              "Sign Out",
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            l.jsx("main", {
              className: "min-w-0 px-3 sm:px-4 md:px-0",
              children: l.jsx("div", {
                className: "w-full md:pr-4",
                children: l.jsx("div", {
                  className: "py-4 md:py-6 md:pt-6",
                  children: l.jsx("div", {
                    className:
                      "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1",
                    children: u,
                  }),
                }),
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
const Zi = x.createContext(void 0),
  ws = () => {
    const s = x.useContext(Zi);
    if (!s) throw new Error("useToast must be used within a ToastProvider");
    return s;
  },
  sa = ({ children: s }) => {
    const [e, t] = x.useState([]),
      r = x.useCallback((p) => {
        t((y) => y.filter((b) => b.id !== p));
      }, []),
      i = x.useCallback(
        (p) => {
          const y = Math.random().toString(36).substr(2, 9),
            b = { ...p, id: y };
          t((I) => [...I, b]);
          const k = p.duration || 5e3;
          setTimeout(() => r(y), k);
        },
        [r],
      ),
      n = x.useCallback(
        (p, y) => {
          i({ type: "error", title: p, message: y, duration: 7e3 });
        },
        [i],
      ),
      o = x.useCallback(
        (p, y) => {
          i({ type: "warning", title: p, message: y, duration: 6e3 });
        },
        [i],
      ),
      a = x.useCallback(
        (p, y) => {
          i({ type: "success", title: p, message: y, duration: 4e3 });
        },
        [i],
      ),
      c = x.useCallback(
        (p, y) => {
          i({ type: "info", title: p, message: y, duration: 4e3 });
        },
        [i],
      ),
      u = (p) => {
        switch (p) {
          case "success":
            return l.jsx("svg", {
              className: "w-5 h-5 text-green-400",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              children: l.jsx("path", {
                fillRule: "evenodd",
                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                clipRule: "evenodd",
              }),
            });
          case "error":
            return l.jsx("svg", {
              className: "w-5 h-5 text-red-400",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              children: l.jsx("path", {
                fillRule: "evenodd",
                d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                clipRule: "evenodd",
              }),
            });
          case "warning":
            return l.jsx("svg", {
              className: "w-5 h-5 text-yellow-400",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              children: l.jsx("path", {
                fillRule: "evenodd",
                d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
                clipRule: "evenodd",
              }),
            });
          case "info":
            return l.jsx("svg", {
              className: "w-5 h-5 text-blue-400",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              children: l.jsx("path", {
                fillRule: "evenodd",
                d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                clipRule: "evenodd",
              }),
            });
        }
      },
      h = (p) => {
        switch (p) {
          case "success":
            return "bg-green-50 border-green-200 text-green-800";
          case "error":
            return "bg-red-50 border-red-200 text-red-800";
          case "warning":
            return "bg-yellow-50 border-yellow-200 text-yellow-800";
          case "info":
            return "bg-blue-50 border-blue-200 text-blue-800";
        }
      };
    return l.jsxs(Zi.Provider, {
      value: {
        showToast: i,
        showError: n,
        showWarning: o,
        showSuccess: a,
        showInfo: c,
      },
      children: [
        s,
        l.jsx("div", {
          className:
            "fixed z-[100] pointer-events-none flex flex-col items-end gap-3",
          style: {
            top: "calc(env(safe-area-inset-top, 0px) + 1rem)",
            right: "calc(env(safe-area-inset-right, 0px) + 1rem)",
            left: "calc(env(safe-area-inset-left, 0px) + var(--app-toast-left, 0px) + 1rem)",
          },
          children: e.map((p) =>
            l.jsx(
              "div",
              {
                className: `${h(p.type)} pointer-events-auto border rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-in-out animate-slide-in-right`,
                style: { width: "min(24rem, 100%)" },
                children: l.jsxs("div", {
                  className: "flex items-start",
                  children: [
                    l.jsx("div", {
                      className: "flex-shrink-0",
                      children: u(p.type),
                    }),
                    l.jsxs("div", {
                      className: "ml-3 flex-1",
                      children: [
                        l.jsx("h3", {
                          className: "text-sm font-medium",
                          children: p.title,
                        }),
                        l.jsx("div", {
                          className: "mt-1 text-xs",
                          children: p.message,
                        }),
                      ],
                    }),
                    l.jsx("div", {
                      className: "ml-4 flex-shrink-0 flex",
                      children: l.jsxs("button", {
                        onClick: () => r(p.id),
                        className:
                          "inline-flex text-gray-400 hover:text-gray-500 focus:outline-none",
                        children: [
                          l.jsx("span", {
                            className: "sr-only",
                            children: "Close",
                          }),
                          l.jsx("svg", {
                            className: "h-4 w-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: l.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M6 18L18 6M6 6l12 12",
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              },
              p.id,
            ),
          ),
        }),
        l.jsx("style", {
          children: `
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `,
        }),
      ],
    });
  },
  ia = (s) => {
    let e;
    return (
      s
        ? (e = s)
        : typeof fetch > "u"
          ? (e = (...t) =>
              ze(
                async () => {
                  const { default: r } = await Promise.resolve().then(() => er);
                  return { default: r };
                },
                void 0,
              ).then(({ default: r }) => r(...t)))
          : (e = fetch),
      (...t) => e(...t)
    );
  };
class _s extends Error {
  constructor(e, t = "FunctionsError", r) {
    (super(e), (this.name = t), (this.context = r));
  }
}
class na extends _s {
  constructor(e) {
    super(
      "Failed to send a request to the Edge Function",
      "FunctionsFetchError",
      e,
    );
  }
}
class oi extends _s {
  constructor(e) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", e);
  }
}
class ai extends _s {
  constructor(e) {
    super(
      "Edge Function returned a non-2xx status code",
      "FunctionsHttpError",
      e,
    );
  }
}
var us;
(function (s) {
  ((s.Any = "any"),
    (s.ApNortheast1 = "ap-northeast-1"),
    (s.ApNortheast2 = "ap-northeast-2"),
    (s.ApSouth1 = "ap-south-1"),
    (s.ApSoutheast1 = "ap-southeast-1"),
    (s.ApSoutheast2 = "ap-southeast-2"),
    (s.CaCentral1 = "ca-central-1"),
    (s.EuCentral1 = "eu-central-1"),
    (s.EuWest1 = "eu-west-1"),
    (s.EuWest2 = "eu-west-2"),
    (s.EuWest3 = "eu-west-3"),
    (s.SaEast1 = "sa-east-1"),
    (s.UsEast1 = "us-east-1"),
    (s.UsWest1 = "us-west-1"),
    (s.UsWest2 = "us-west-2"));
})(us || (us = {}));
var oa = function (s, e, t, r) {
  function i(n) {
    return n instanceof t
      ? n
      : new t(function (o) {
          o(n);
        });
  }
  return new (t || (t = Promise))(function (n, o) {
    function a(h) {
      try {
        u(r.next(h));
      } catch (p) {
        o(p);
      }
    }
    function c(h) {
      try {
        u(r.throw(h));
      } catch (p) {
        o(p);
      }
    }
    function u(h) {
      h.done ? n(h.value) : i(h.value).then(a, c);
    }
    u((r = r.apply(s, e || [])).next());
  });
};
class aa {
  constructor(e, { headers: t = {}, customFetch: r, region: i = us.Any } = {}) {
    ((this.url = e),
      (this.headers = t),
      (this.region = i),
      (this.fetch = ia(r)));
  }
  setAuth(e) {
    this.headers.Authorization = `Bearer ${e}`;
  }
  invoke(e, t = {}) {
    var r;
    return oa(this, void 0, void 0, function* () {
      try {
        const { headers: i, method: n, body: o } = t;
        let a = {},
          { region: c } = t;
        c || (c = this.region);
        const u = new URL(`${this.url}/${e}`);
        c &&
          c !== "any" &&
          ((a["x-region"] = c), u.searchParams.set("forceFunctionRegion", c));
        let h;
        o &&
          ((i && !Object.prototype.hasOwnProperty.call(i, "Content-Type")) ||
            !i) &&
          ((typeof Blob < "u" && o instanceof Blob) || o instanceof ArrayBuffer
            ? ((a["Content-Type"] = "application/octet-stream"), (h = o))
            : typeof o == "string"
              ? ((a["Content-Type"] = "text/plain"), (h = o))
              : typeof FormData < "u" && o instanceof FormData
                ? (h = o)
                : ((a["Content-Type"] = "application/json"),
                  (h = JSON.stringify(o))));
        const p = yield this.fetch(u.toString(), {
            method: n || "POST",
            headers: Object.assign(
              Object.assign(Object.assign({}, a), this.headers),
              i,
            ),
            body: h,
          }).catch((I) => {
            throw new na(I);
          }),
          y = p.headers.get("x-relay-error");
        if (y && y === "true") throw new oi(p);
        if (!p.ok) throw new ai(p);
        let b = (
            (r = p.headers.get("Content-Type")) !== null && r !== void 0
              ? r
              : "text/plain"
          )
            .split(";")[0]
            .trim(),
          k;
        return (
          b === "application/json"
            ? (k = yield p.json())
            : b === "application/octet-stream"
              ? (k = yield p.blob())
              : b === "text/event-stream"
                ? (k = p)
                : b === "multipart/form-data"
                  ? (k = yield p.formData())
                  : (k = yield p.text()),
          { data: k, error: null, response: p }
        );
      } catch (i) {
        return {
          data: null,
          error: i,
          response: i instanceof ai || i instanceof oi ? i.context : void 0,
        };
      }
    });
  }
}
var Ie = {},
  jt = {},
  Nt = {},
  At = {},
  Dt = {},
  Rt = {},
  la = function () {
    if (typeof self < "u") return self;
    if (typeof window < "u") return window;
    if (typeof global < "u") return global;
    throw new Error("unable to locate global object");
  },
  Yt = la();
const ca = Yt.fetch,
  en = Yt.fetch.bind(Yt),
  tn = Yt.Headers,
  da = Yt.Request,
  ua = Yt.Response,
  er = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        Headers: tn,
        Request: da,
        Response: ua,
        default: en,
        fetch: ca,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  ha = so(er);
var Or = {},
  li;
function rn() {
  if (li) return Or;
  ((li = 1), Object.defineProperty(Or, "__esModule", { value: !0 }));
  class s extends Error {
    constructor(t) {
      (super(t.message),
        (this.name = "PostgrestError"),
        (this.details = t.details),
        (this.hint = t.hint),
        (this.code = t.code));
    }
  }
  return ((Or.default = s), Or);
}
var ci;
function sn() {
  if (ci) return Rt;
  ci = 1;
  var s =
    (Rt && Rt.__importDefault) ||
    function (i) {
      return i && i.__esModule ? i : { default: i };
    };
  Object.defineProperty(Rt, "__esModule", { value: !0 });
  const e = s(ha),
    t = s(rn());
  class r {
    constructor(n) {
      ((this.shouldThrowOnError = !1),
        (this.method = n.method),
        (this.url = n.url),
        (this.headers = n.headers),
        (this.schema = n.schema),
        (this.body = n.body),
        (this.shouldThrowOnError = n.shouldThrowOnError),
        (this.signal = n.signal),
        (this.isMaybeSingle = n.isMaybeSingle),
        n.fetch
          ? (this.fetch = n.fetch)
          : typeof fetch > "u"
            ? (this.fetch = e.default)
            : (this.fetch = fetch));
    }
    throwOnError() {
      return ((this.shouldThrowOnError = !0), this);
    }
    setHeader(n, o) {
      return (
        (this.headers = Object.assign({}, this.headers)),
        (this.headers[n] = o),
        this
      );
    }
    then(n, o) {
      (this.schema === void 0 ||
        (["GET", "HEAD"].includes(this.method)
          ? (this.headers["Accept-Profile"] = this.schema)
          : (this.headers["Content-Profile"] = this.schema)),
        this.method !== "GET" &&
          this.method !== "HEAD" &&
          (this.headers["Content-Type"] = "application/json"));
      const a = this.fetch;
      let c = a(this.url.toString(), {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify(this.body),
        signal: this.signal,
      }).then(async (u) => {
        var h, p, y;
        let b = null,
          k = null,
          I = null,
          P = u.status,
          L = u.statusText;
        if (u.ok) {
          if (this.method !== "HEAD") {
            const H = await u.text();
            H === "" ||
              (this.headers.Accept === "text/csv" ||
              (this.headers.Accept &&
                this.headers.Accept.includes("application/vnd.pgrst.plan+text"))
                ? (k = H)
                : (k = JSON.parse(H)));
          }
          const O =
              (h = this.headers.Prefer) === null || h === void 0
                ? void 0
                : h.match(/count=(exact|planned|estimated)/),
            A =
              (p = u.headers.get("content-range")) === null || p === void 0
                ? void 0
                : p.split("/");
          (O && A && A.length > 1 && (I = parseInt(A[1])),
            this.isMaybeSingle &&
              this.method === "GET" &&
              Array.isArray(k) &&
              (k.length > 1
                ? ((b = {
                    code: "PGRST116",
                    details: `Results contain ${k.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                    hint: null,
                    message:
                      "JSON object requested, multiple (or no) rows returned",
                  }),
                  (k = null),
                  (I = null),
                  (P = 406),
                  (L = "Not Acceptable"))
                : k.length === 1
                  ? (k = k[0])
                  : (k = null)));
        } else {
          const O = await u.text();
          try {
            ((b = JSON.parse(O)),
              Array.isArray(b) &&
                u.status === 404 &&
                ((k = []), (b = null), (P = 200), (L = "OK")));
          } catch {
            u.status === 404 && O === ""
              ? ((P = 204), (L = "No Content"))
              : (b = { message: O });
          }
          if (
            (b &&
              this.isMaybeSingle &&
              !(
                (y = b == null ? void 0 : b.details) === null || y === void 0
              ) &&
              y.includes("0 rows") &&
              ((b = null), (P = 200), (L = "OK")),
            b && this.shouldThrowOnError)
          )
            throw new t.default(b);
        }
        return { error: b, data: k, count: I, status: P, statusText: L };
      });
      return (
        this.shouldThrowOnError ||
          (c = c.catch((u) => {
            var h, p, y;
            return {
              error: {
                message: `${(h = u == null ? void 0 : u.name) !== null && h !== void 0 ? h : "FetchError"}: ${u == null ? void 0 : u.message}`,
                details: `${(p = u == null ? void 0 : u.stack) !== null && p !== void 0 ? p : ""}`,
                hint: "",
                code: `${(y = u == null ? void 0 : u.code) !== null && y !== void 0 ? y : ""}`,
              },
              data: null,
              count: null,
              status: 0,
              statusText: "",
            };
          })),
        c.then(n, o)
      );
    }
    returns() {
      return this;
    }
    overrideTypes() {
      return this;
    }
  }
  return ((Rt.default = r), Rt);
}
var di;
function nn() {
  if (di) return Dt;
  di = 1;
  var s =
    (Dt && Dt.__importDefault) ||
    function (r) {
      return r && r.__esModule ? r : { default: r };
    };
  Object.defineProperty(Dt, "__esModule", { value: !0 });
  const e = s(sn());
  class t extends e.default {
    select(i) {
      let n = !1;
      const o = (i ?? "*")
        .split("")
        .map((a) => (/\s/.test(a) && !n ? "" : (a === '"' && (n = !n), a)))
        .join("");
      return (
        this.url.searchParams.set("select", o),
        this.headers.Prefer && (this.headers.Prefer += ","),
        (this.headers.Prefer += "return=representation"),
        this
      );
    }
    order(
      i,
      {
        ascending: n = !0,
        nullsFirst: o,
        foreignTable: a,
        referencedTable: c = a,
      } = {},
    ) {
      const u = c ? `${c}.order` : "order",
        h = this.url.searchParams.get(u);
      return (
        this.url.searchParams.set(
          u,
          `${h ? `${h},` : ""}${i}.${n ? "asc" : "desc"}${o === void 0 ? "" : o ? ".nullsfirst" : ".nullslast"}`,
        ),
        this
      );
    }
    limit(i, { foreignTable: n, referencedTable: o = n } = {}) {
      const a = typeof o > "u" ? "limit" : `${o}.limit`;
      return (this.url.searchParams.set(a, `${i}`), this);
    }
    range(i, n, { foreignTable: o, referencedTable: a = o } = {}) {
      const c = typeof a > "u" ? "offset" : `${a}.offset`,
        u = typeof a > "u" ? "limit" : `${a}.limit`;
      return (
        this.url.searchParams.set(c, `${i}`),
        this.url.searchParams.set(u, `${n - i + 1}`),
        this
      );
    }
    abortSignal(i) {
      return ((this.signal = i), this);
    }
    single() {
      return (
        (this.headers.Accept = "application/vnd.pgrst.object+json"),
        this
      );
    }
    maybeSingle() {
      return (
        this.method === "GET"
          ? (this.headers.Accept = "application/json")
          : (this.headers.Accept = "application/vnd.pgrst.object+json"),
        (this.isMaybeSingle = !0),
        this
      );
    }
    csv() {
      return ((this.headers.Accept = "text/csv"), this);
    }
    geojson() {
      return ((this.headers.Accept = "application/geo+json"), this);
    }
    explain({
      analyze: i = !1,
      verbose: n = !1,
      settings: o = !1,
      buffers: a = !1,
      wal: c = !1,
      format: u = "text",
    } = {}) {
      var h;
      const p = [
          i ? "analyze" : null,
          n ? "verbose" : null,
          o ? "settings" : null,
          a ? "buffers" : null,
          c ? "wal" : null,
        ]
          .filter(Boolean)
          .join("|"),
        y =
          (h = this.headers.Accept) !== null && h !== void 0
            ? h
            : "application/json";
      return (
        (this.headers.Accept = `application/vnd.pgrst.plan+${u}; for="${y}"; options=${p};`),
        u === "json" ? this : this
      );
    }
    rollback() {
      var i;
      return (
        ((i = this.headers.Prefer) !== null && i !== void 0 ? i : "").trim()
          .length > 0
          ? (this.headers.Prefer += ",tx=rollback")
          : (this.headers.Prefer = "tx=rollback"),
        this
      );
    }
    returns() {
      return this;
    }
  }
  return ((Dt.default = t), Dt);
}
var ui;
function xs() {
  if (ui) return At;
  ui = 1;
  var s =
    (At && At.__importDefault) ||
    function (r) {
      return r && r.__esModule ? r : { default: r };
    };
  Object.defineProperty(At, "__esModule", { value: !0 });
  const e = s(nn());
  class t extends e.default {
    eq(i, n) {
      return (this.url.searchParams.append(i, `eq.${n}`), this);
    }
    neq(i, n) {
      return (this.url.searchParams.append(i, `neq.${n}`), this);
    }
    gt(i, n) {
      return (this.url.searchParams.append(i, `gt.${n}`), this);
    }
    gte(i, n) {
      return (this.url.searchParams.append(i, `gte.${n}`), this);
    }
    lt(i, n) {
      return (this.url.searchParams.append(i, `lt.${n}`), this);
    }
    lte(i, n) {
      return (this.url.searchParams.append(i, `lte.${n}`), this);
    }
    like(i, n) {
      return (this.url.searchParams.append(i, `like.${n}`), this);
    }
    likeAllOf(i, n) {
      return (
        this.url.searchParams.append(i, `like(all).{${n.join(",")}}`),
        this
      );
    }
    likeAnyOf(i, n) {
      return (
        this.url.searchParams.append(i, `like(any).{${n.join(",")}}`),
        this
      );
    }
    ilike(i, n) {
      return (this.url.searchParams.append(i, `ilike.${n}`), this);
    }
    ilikeAllOf(i, n) {
      return (
        this.url.searchParams.append(i, `ilike(all).{${n.join(",")}}`),
        this
      );
    }
    ilikeAnyOf(i, n) {
      return (
        this.url.searchParams.append(i, `ilike(any).{${n.join(",")}}`),
        this
      );
    }
    is(i, n) {
      return (this.url.searchParams.append(i, `is.${n}`), this);
    }
    in(i, n) {
      const o = Array.from(new Set(n))
        .map((a) =>
          typeof a == "string" && new RegExp("[,()]").test(a)
            ? `"${a}"`
            : `${a}`,
        )
        .join(",");
      return (this.url.searchParams.append(i, `in.(${o})`), this);
    }
    contains(i, n) {
      return (
        typeof n == "string"
          ? this.url.searchParams.append(i, `cs.${n}`)
          : Array.isArray(n)
            ? this.url.searchParams.append(i, `cs.{${n.join(",")}}`)
            : this.url.searchParams.append(i, `cs.${JSON.stringify(n)}`),
        this
      );
    }
    containedBy(i, n) {
      return (
        typeof n == "string"
          ? this.url.searchParams.append(i, `cd.${n}`)
          : Array.isArray(n)
            ? this.url.searchParams.append(i, `cd.{${n.join(",")}}`)
            : this.url.searchParams.append(i, `cd.${JSON.stringify(n)}`),
        this
      );
    }
    rangeGt(i, n) {
      return (this.url.searchParams.append(i, `sr.${n}`), this);
    }
    rangeGte(i, n) {
      return (this.url.searchParams.append(i, `nxl.${n}`), this);
    }
    rangeLt(i, n) {
      return (this.url.searchParams.append(i, `sl.${n}`), this);
    }
    rangeLte(i, n) {
      return (this.url.searchParams.append(i, `nxr.${n}`), this);
    }
    rangeAdjacent(i, n) {
      return (this.url.searchParams.append(i, `adj.${n}`), this);
    }
    overlaps(i, n) {
      return (
        typeof n == "string"
          ? this.url.searchParams.append(i, `ov.${n}`)
          : this.url.searchParams.append(i, `ov.{${n.join(",")}}`),
        this
      );
    }
    textSearch(i, n, { config: o, type: a } = {}) {
      let c = "";
      a === "plain"
        ? (c = "pl")
        : a === "phrase"
          ? (c = "ph")
          : a === "websearch" && (c = "w");
      const u = o === void 0 ? "" : `(${o})`;
      return (this.url.searchParams.append(i, `${c}fts${u}.${n}`), this);
    }
    match(i) {
      return (
        Object.entries(i).forEach(([n, o]) => {
          this.url.searchParams.append(n, `eq.${o}`);
        }),
        this
      );
    }
    not(i, n, o) {
      return (this.url.searchParams.append(i, `not.${n}.${o}`), this);
    }
    or(i, { foreignTable: n, referencedTable: o = n } = {}) {
      const a = o ? `${o}.or` : "or";
      return (this.url.searchParams.append(a, `(${i})`), this);
    }
    filter(i, n, o) {
      return (this.url.searchParams.append(i, `${n}.${o}`), this);
    }
  }
  return ((At.default = t), At);
}
var hi;
function on() {
  if (hi) return Nt;
  hi = 1;
  var s =
    (Nt && Nt.__importDefault) ||
    function (r) {
      return r && r.__esModule ? r : { default: r };
    };
  Object.defineProperty(Nt, "__esModule", { value: !0 });
  const e = s(xs());
  class t {
    constructor(i, { headers: n = {}, schema: o, fetch: a }) {
      ((this.url = i), (this.headers = n), (this.schema = o), (this.fetch = a));
    }
    select(i, { head: n = !1, count: o } = {}) {
      const a = n ? "HEAD" : "GET";
      let c = !1;
      const u = (i ?? "*")
        .split("")
        .map((h) => (/\s/.test(h) && !c ? "" : (h === '"' && (c = !c), h)))
        .join("");
      return (
        this.url.searchParams.set("select", u),
        o && (this.headers.Prefer = `count=${o}`),
        new e.default({
          method: a,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch,
          allowEmpty: !1,
        })
      );
    }
    insert(i, { count: n, defaultToNull: o = !0 } = {}) {
      const a = "POST",
        c = [];
      if (
        (this.headers.Prefer && c.push(this.headers.Prefer),
        n && c.push(`count=${n}`),
        o || c.push("missing=default"),
        (this.headers.Prefer = c.join(",")),
        Array.isArray(i))
      ) {
        const u = i.reduce((h, p) => h.concat(Object.keys(p)), []);
        if (u.length > 0) {
          const h = [...new Set(u)].map((p) => `"${p}"`);
          this.url.searchParams.set("columns", h.join(","));
        }
      }
      return new e.default({
        method: a,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        body: i,
        fetch: this.fetch,
        allowEmpty: !1,
      });
    }
    upsert(
      i,
      {
        onConflict: n,
        ignoreDuplicates: o = !1,
        count: a,
        defaultToNull: c = !0,
      } = {},
    ) {
      const u = "POST",
        h = [`resolution=${o ? "ignore" : "merge"}-duplicates`];
      if (
        (n !== void 0 && this.url.searchParams.set("on_conflict", n),
        this.headers.Prefer && h.push(this.headers.Prefer),
        a && h.push(`count=${a}`),
        c || h.push("missing=default"),
        (this.headers.Prefer = h.join(",")),
        Array.isArray(i))
      ) {
        const p = i.reduce((y, b) => y.concat(Object.keys(b)), []);
        if (p.length > 0) {
          const y = [...new Set(p)].map((b) => `"${b}"`);
          this.url.searchParams.set("columns", y.join(","));
        }
      }
      return new e.default({
        method: u,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        body: i,
        fetch: this.fetch,
        allowEmpty: !1,
      });
    }
    update(i, { count: n } = {}) {
      const o = "PATCH",
        a = [];
      return (
        this.headers.Prefer && a.push(this.headers.Prefer),
        n && a.push(`count=${n}`),
        (this.headers.Prefer = a.join(",")),
        new e.default({
          method: o,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: i,
          fetch: this.fetch,
          allowEmpty: !1,
        })
      );
    }
    delete({ count: i } = {}) {
      const n = "DELETE",
        o = [];
      return (
        i && o.push(`count=${i}`),
        this.headers.Prefer && o.unshift(this.headers.Prefer),
        (this.headers.Prefer = o.join(",")),
        new e.default({
          method: n,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch,
          allowEmpty: !1,
        })
      );
    }
  }
  return ((Nt.default = t), Nt);
}
var or = {},
  ar = {},
  mi;
function ma() {
  return (
    mi ||
      ((mi = 1),
      Object.defineProperty(ar, "__esModule", { value: !0 }),
      (ar.version = void 0),
      (ar.version = "0.0.0-automated")),
    ar
  );
}
var fi;
function fa() {
  if (fi) return or;
  ((fi = 1),
    Object.defineProperty(or, "__esModule", { value: !0 }),
    (or.DEFAULT_HEADERS = void 0));
  const s = ma();
  return (
    (or.DEFAULT_HEADERS = { "X-Client-Info": `postgrest-js/${s.version}` }),
    or
  );
}
var pi;
function pa() {
  if (pi) return jt;
  pi = 1;
  var s =
    (jt && jt.__importDefault) ||
    function (n) {
      return n && n.__esModule ? n : { default: n };
    };
  Object.defineProperty(jt, "__esModule", { value: !0 });
  const e = s(on()),
    t = s(xs()),
    r = fa();
  class i {
    constructor(o, { headers: a = {}, schema: c, fetch: u } = {}) {
      ((this.url = o),
        (this.headers = Object.assign(Object.assign({}, r.DEFAULT_HEADERS), a)),
        (this.schemaName = c),
        (this.fetch = u));
    }
    from(o) {
      const a = new URL(`${this.url}/${o}`);
      return new e.default(a, {
        headers: Object.assign({}, this.headers),
        schema: this.schemaName,
        fetch: this.fetch,
      });
    }
    schema(o) {
      return new i(this.url, {
        headers: this.headers,
        schema: o,
        fetch: this.fetch,
      });
    }
    rpc(o, a = {}, { head: c = !1, get: u = !1, count: h } = {}) {
      let p;
      const y = new URL(`${this.url}/rpc/${o}`);
      let b;
      c || u
        ? ((p = c ? "HEAD" : "GET"),
          Object.entries(a)
            .filter(([I, P]) => P !== void 0)
            .map(([I, P]) => [
              I,
              Array.isArray(P) ? `{${P.join(",")}}` : `${P}`,
            ])
            .forEach(([I, P]) => {
              y.searchParams.append(I, P);
            }))
        : ((p = "POST"), (b = a));
      const k = Object.assign({}, this.headers);
      return (
        h && (k.Prefer = `count=${h}`),
        new t.default({
          method: p,
          url: y,
          headers: k,
          schema: this.schemaName,
          body: b,
          fetch: this.fetch,
          allowEmpty: !1,
        })
      );
    }
  }
  return ((jt.default = i), jt);
}
var gi;
function ga() {
  if (gi) return Ie;
  gi = 1;
  var s =
    (Ie && Ie.__importDefault) ||
    function (a) {
      return a && a.__esModule ? a : { default: a };
    };
  (Object.defineProperty(Ie, "__esModule", { value: !0 }),
    (Ie.PostgrestError =
      Ie.PostgrestBuilder =
      Ie.PostgrestTransformBuilder =
      Ie.PostgrestFilterBuilder =
      Ie.PostgrestQueryBuilder =
      Ie.PostgrestClient =
        void 0));
  const e = s(pa());
  Ie.PostgrestClient = e.default;
  const t = s(on());
  Ie.PostgrestQueryBuilder = t.default;
  const r = s(xs());
  Ie.PostgrestFilterBuilder = r.default;
  const i = s(nn());
  Ie.PostgrestTransformBuilder = i.default;
  const n = s(sn());
  Ie.PostgrestBuilder = n.default;
  const o = s(rn());
  return (
    (Ie.PostgrestError = o.default),
    (Ie.default = {
      PostgrestClient: e.default,
      PostgrestQueryBuilder: t.default,
      PostgrestFilterBuilder: r.default,
      PostgrestTransformBuilder: i.default,
      PostgrestBuilder: n.default,
      PostgrestError: o.default,
    }),
    Ie
  );
}
var ya = ga();
const va = io(ya),
  {
    PostgrestClient: ba,
    PostgrestQueryBuilder: Fc,
    PostgrestFilterBuilder: Uc,
    PostgrestTransformBuilder: Bc,
    PostgrestBuilder: qc,
    PostgrestError: Vc,
  } = va;
function wa() {
  if (typeof WebSocket < "u") return WebSocket;
  if (typeof global.WebSocket < "u") return global.WebSocket;
  if (typeof window.WebSocket < "u") return window.WebSocket;
  if (typeof self.WebSocket < "u") return self.WebSocket;
  throw new Error("`WebSocket` is not supported in this environment");
}
const _a = wa(),
  xa = "2.11.15",
  Sa = `realtime-js/${xa}`,
  Ca = "1.0.0",
  an = 1e4,
  ka = 1e3;
var ur;
(function (s) {
  ((s[(s.connecting = 0)] = "connecting"),
    (s[(s.open = 1)] = "open"),
    (s[(s.closing = 2)] = "closing"),
    (s[(s.closed = 3)] = "closed"));
})(ur || (ur = {}));
var De;
(function (s) {
  ((s.closed = "closed"),
    (s.errored = "errored"),
    (s.joined = "joined"),
    (s.joining = "joining"),
    (s.leaving = "leaving"));
})(De || (De = {}));
var Xe;
(function (s) {
  ((s.close = "phx_close"),
    (s.error = "phx_error"),
    (s.join = "phx_join"),
    (s.reply = "phx_reply"),
    (s.leave = "phx_leave"),
    (s.access_token = "access_token"));
})(Xe || (Xe = {}));
var hs;
(function (s) {
  s.websocket = "websocket";
})(hs || (hs = {}));
var kt;
(function (s) {
  ((s.Connecting = "connecting"),
    (s.Open = "open"),
    (s.Closing = "closing"),
    (s.Closed = "closed"));
})(kt || (kt = {}));
class Ta {
  constructor() {
    this.HEADER_LENGTH = 1;
  }
  decode(e, t) {
    return e.constructor === ArrayBuffer
      ? t(this._binaryDecode(e))
      : t(typeof e == "string" ? JSON.parse(e) : {});
  }
  _binaryDecode(e) {
    const t = new DataView(e),
      r = new TextDecoder();
    return this._decodeBroadcast(e, t, r);
  }
  _decodeBroadcast(e, t, r) {
    const i = t.getUint8(1),
      n = t.getUint8(2);
    let o = this.HEADER_LENGTH + 2;
    const a = r.decode(e.slice(o, o + i));
    o = o + i;
    const c = r.decode(e.slice(o, o + n));
    o = o + n;
    const u = JSON.parse(r.decode(e.slice(o, e.byteLength)));
    return { ref: null, topic: a, event: c, payload: u };
  }
}
class ln {
  constructor(e, t) {
    ((this.callback = e),
      (this.timerCalc = t),
      (this.timer = void 0),
      (this.tries = 0),
      (this.callback = e),
      (this.timerCalc = t));
  }
  reset() {
    ((this.tries = 0), clearTimeout(this.timer));
  }
  scheduleTimeout() {
    (clearTimeout(this.timer),
      (this.timer = setTimeout(
        () => {
          ((this.tries = this.tries + 1), this.callback());
        },
        this.timerCalc(this.tries + 1),
      )));
  }
}
var me;
(function (s) {
  ((s.abstime = "abstime"),
    (s.bool = "bool"),
    (s.date = "date"),
    (s.daterange = "daterange"),
    (s.float4 = "float4"),
    (s.float8 = "float8"),
    (s.int2 = "int2"),
    (s.int4 = "int4"),
    (s.int4range = "int4range"),
    (s.int8 = "int8"),
    (s.int8range = "int8range"),
    (s.json = "json"),
    (s.jsonb = "jsonb"),
    (s.money = "money"),
    (s.numeric = "numeric"),
    (s.oid = "oid"),
    (s.reltime = "reltime"),
    (s.text = "text"),
    (s.time = "time"),
    (s.timestamp = "timestamp"),
    (s.timestamptz = "timestamptz"),
    (s.timetz = "timetz"),
    (s.tsrange = "tsrange"),
    (s.tstzrange = "tstzrange"));
})(me || (me = {}));
const yi = (s, e, t = {}) => {
    var r;
    const i = (r = t.skipTypes) !== null && r !== void 0 ? r : [];
    return Object.keys(e).reduce((n, o) => ((n[o] = Ea(o, s, e, i)), n), {});
  },
  Ea = (s, e, t, r) => {
    const i = e.find((a) => a.name === s),
      n = i == null ? void 0 : i.type,
      o = t[s];
    return n && !r.includes(n) ? cn(n, o) : ms(o);
  },
  cn = (s, e) => {
    if (s.charAt(0) === "_") {
      const t = s.slice(1, s.length);
      return ja(e, t);
    }
    switch (s) {
      case me.bool:
        return Ia(e);
      case me.float4:
      case me.float8:
      case me.int2:
      case me.int4:
      case me.int8:
      case me.numeric:
      case me.oid:
        return Oa(e);
      case me.json:
      case me.jsonb:
        return Pa(e);
      case me.timestamp:
        return Na(e);
      case me.abstime:
      case me.date:
      case me.daterange:
      case me.int4range:
      case me.int8range:
      case me.money:
      case me.reltime:
      case me.text:
      case me.time:
      case me.timestamptz:
      case me.timetz:
      case me.tsrange:
      case me.tstzrange:
        return ms(e);
      default:
        return ms(e);
    }
  },
  ms = (s) => s,
  Ia = (s) => {
    switch (s) {
      case "t":
        return !0;
      case "f":
        return !1;
      default:
        return s;
    }
  },
  Oa = (s) => {
    if (typeof s == "string") {
      const e = parseFloat(s);
      if (!Number.isNaN(e)) return e;
    }
    return s;
  },
  Pa = (s) => {
    if (typeof s == "string")
      try {
        return JSON.parse(s);
      } catch (e) {
        return (console.log(`JSON parse error: ${e}`), s);
      }
    return s;
  },
  ja = (s, e) => {
    if (typeof s != "string") return s;
    const t = s.length - 1,
      r = s[t];
    if (s[0] === "{" && r === "}") {
      let n;
      const o = s.slice(1, t);
      try {
        n = JSON.parse("[" + o + "]");
      } catch {
        n = o ? o.split(",") : [];
      }
      return n.map((a) => cn(e, a));
    }
    return s;
  },
  Na = (s) => (typeof s == "string" ? s.replace(" ", "T") : s),
  dn = (s) => {
    let e = s;
    return (
      (e = e.replace(/^ws/i, "http")),
      (e = e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, "")),
      e.replace(/\/+$/, "")
    );
  };
class ts {
  constructor(e, t, r = {}, i = an) {
    ((this.channel = e),
      (this.event = t),
      (this.payload = r),
      (this.timeout = i),
      (this.sent = !1),
      (this.timeoutTimer = void 0),
      (this.ref = ""),
      (this.receivedResp = null),
      (this.recHooks = []),
      (this.refEvent = null));
  }
  resend(e) {
    ((this.timeout = e),
      this._cancelRefEvent(),
      (this.ref = ""),
      (this.refEvent = null),
      (this.receivedResp = null),
      (this.sent = !1),
      this.send());
  }
  send() {
    this._hasReceived("timeout") ||
      (this.startTimeout(),
      (this.sent = !0),
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload,
        ref: this.ref,
        join_ref: this.channel._joinRef(),
      }));
  }
  updatePayload(e) {
    this.payload = Object.assign(Object.assign({}, this.payload), e);
  }
  receive(e, t) {
    var r;
    return (
      this._hasReceived(e) &&
        t(
          (r = this.receivedResp) === null || r === void 0
            ? void 0
            : r.response,
        ),
      this.recHooks.push({ status: e, callback: t }),
      this
    );
  }
  startTimeout() {
    if (this.timeoutTimer) return;
    ((this.ref = this.channel.socket._makeRef()),
      (this.refEvent = this.channel._replyEventName(this.ref)));
    const e = (t) => {
      (this._cancelRefEvent(),
        this._cancelTimeout(),
        (this.receivedResp = t),
        this._matchReceive(t));
    };
    (this.channel._on(this.refEvent, {}, e),
      (this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout)));
  }
  trigger(e, t) {
    this.refEvent &&
      this.channel._trigger(this.refEvent, { status: e, response: t });
  }
  destroy() {
    (this._cancelRefEvent(), this._cancelTimeout());
  }
  _cancelRefEvent() {
    this.refEvent && this.channel._off(this.refEvent, {});
  }
  _cancelTimeout() {
    (clearTimeout(this.timeoutTimer), (this.timeoutTimer = void 0));
  }
  _matchReceive({ status: e, response: t }) {
    this.recHooks.filter((r) => r.status === e).forEach((r) => r.callback(t));
  }
  _hasReceived(e) {
    return this.receivedResp && this.receivedResp.status === e;
  }
}
var vi;
(function (s) {
  ((s.SYNC = "sync"), (s.JOIN = "join"), (s.LEAVE = "leave"));
})(vi || (vi = {}));
class hr {
  constructor(e, t) {
    ((this.channel = e),
      (this.state = {}),
      (this.pendingDiffs = []),
      (this.joinRef = null),
      (this.caller = {
        onJoin: () => {},
        onLeave: () => {},
        onSync: () => {},
      }));
    const r = (t == null ? void 0 : t.events) || {
      state: "presence_state",
      diff: "presence_diff",
    };
    (this.channel._on(r.state, {}, (i) => {
      const { onJoin: n, onLeave: o, onSync: a } = this.caller;
      ((this.joinRef = this.channel._joinRef()),
        (this.state = hr.syncState(this.state, i, n, o)),
        this.pendingDiffs.forEach((c) => {
          this.state = hr.syncDiff(this.state, c, n, o);
        }),
        (this.pendingDiffs = []),
        a());
    }),
      this.channel._on(r.diff, {}, (i) => {
        const { onJoin: n, onLeave: o, onSync: a } = this.caller;
        this.inPendingSyncState()
          ? this.pendingDiffs.push(i)
          : ((this.state = hr.syncDiff(this.state, i, n, o)), a());
      }),
      this.onJoin((i, n, o) => {
        this.channel._trigger("presence", {
          event: "join",
          key: i,
          currentPresences: n,
          newPresences: o,
        });
      }),
      this.onLeave((i, n, o) => {
        this.channel._trigger("presence", {
          event: "leave",
          key: i,
          currentPresences: n,
          leftPresences: o,
        });
      }),
      this.onSync(() => {
        this.channel._trigger("presence", { event: "sync" });
      }));
  }
  static syncState(e, t, r, i) {
    const n = this.cloneDeep(e),
      o = this.transformState(t),
      a = {},
      c = {};
    return (
      this.map(n, (u, h) => {
        o[u] || (c[u] = h);
      }),
      this.map(o, (u, h) => {
        const p = n[u];
        if (p) {
          const y = h.map((P) => P.presence_ref),
            b = p.map((P) => P.presence_ref),
            k = h.filter((P) => b.indexOf(P.presence_ref) < 0),
            I = p.filter((P) => y.indexOf(P.presence_ref) < 0);
          (k.length > 0 && (a[u] = k), I.length > 0 && (c[u] = I));
        } else a[u] = h;
      }),
      this.syncDiff(n, { joins: a, leaves: c }, r, i)
    );
  }
  static syncDiff(e, t, r, i) {
    const { joins: n, leaves: o } = {
      joins: this.transformState(t.joins),
      leaves: this.transformState(t.leaves),
    };
    return (
      r || (r = () => {}),
      i || (i = () => {}),
      this.map(n, (a, c) => {
        var u;
        const h = (u = e[a]) !== null && u !== void 0 ? u : [];
        if (((e[a] = this.cloneDeep(c)), h.length > 0)) {
          const p = e[a].map((b) => b.presence_ref),
            y = h.filter((b) => p.indexOf(b.presence_ref) < 0);
          e[a].unshift(...y);
        }
        r(a, h, c);
      }),
      this.map(o, (a, c) => {
        let u = e[a];
        if (!u) return;
        const h = c.map((p) => p.presence_ref);
        ((u = u.filter((p) => h.indexOf(p.presence_ref) < 0)),
          (e[a] = u),
          i(a, u, c),
          u.length === 0 && delete e[a]);
      }),
      e
    );
  }
  static map(e, t) {
    return Object.getOwnPropertyNames(e).map((r) => t(r, e[r]));
  }
  static transformState(e) {
    return (
      (e = this.cloneDeep(e)),
      Object.getOwnPropertyNames(e).reduce((t, r) => {
        const i = e[r];
        return (
          "metas" in i
            ? (t[r] = i.metas.map(
                (n) => (
                  (n.presence_ref = n.phx_ref),
                  delete n.phx_ref,
                  delete n.phx_ref_prev,
                  n
                ),
              ))
            : (t[r] = i),
          t
        );
      }, {})
    );
  }
  static cloneDeep(e) {
    return JSON.parse(JSON.stringify(e));
  }
  onJoin(e) {
    this.caller.onJoin = e;
  }
  onLeave(e) {
    this.caller.onLeave = e;
  }
  onSync(e) {
    this.caller.onSync = e;
  }
  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel._joinRef();
  }
}
var bi;
(function (s) {
  ((s.ALL = "*"),
    (s.INSERT = "INSERT"),
    (s.UPDATE = "UPDATE"),
    (s.DELETE = "DELETE"));
})(bi || (bi = {}));
var wi;
(function (s) {
  ((s.BROADCAST = "broadcast"),
    (s.PRESENCE = "presence"),
    (s.POSTGRES_CHANGES = "postgres_changes"),
    (s.SYSTEM = "system"));
})(wi || (wi = {}));
var ht;
(function (s) {
  ((s.SUBSCRIBED = "SUBSCRIBED"),
    (s.TIMED_OUT = "TIMED_OUT"),
    (s.CLOSED = "CLOSED"),
    (s.CHANNEL_ERROR = "CHANNEL_ERROR"));
})(ht || (ht = {}));
class Ss {
  constructor(e, t = { config: {} }, r) {
    ((this.topic = e),
      (this.params = t),
      (this.socket = r),
      (this.bindings = {}),
      (this.state = De.closed),
      (this.joinedOnce = !1),
      (this.pushBuffer = []),
      (this.subTopic = e.replace(/^realtime:/i, "")),
      (this.params.config = Object.assign(
        {
          broadcast: { ack: !1, self: !1 },
          presence: { key: "" },
          private: !1,
        },
        t.config,
      )),
      (this.timeout = this.socket.timeout),
      (this.joinPush = new ts(this, Xe.join, this.params, this.timeout)),
      (this.rejoinTimer = new ln(
        () => this._rejoinUntilConnected(),
        this.socket.reconnectAfterMs,
      )),
      this.joinPush.receive("ok", () => {
        ((this.state = De.joined),
          this.rejoinTimer.reset(),
          this.pushBuffer.forEach((i) => i.send()),
          (this.pushBuffer = []));
      }),
      this._onClose(() => {
        (this.rejoinTimer.reset(),
          this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`),
          (this.state = De.closed),
          this.socket._remove(this));
      }),
      this._onError((i) => {
        this._isLeaving() ||
          this._isClosed() ||
          (this.socket.log("channel", `error ${this.topic}`, i),
          (this.state = De.errored),
          this.rejoinTimer.scheduleTimeout());
      }),
      this.joinPush.receive("timeout", () => {
        this._isJoining() &&
          (this.socket.log(
            "channel",
            `timeout ${this.topic}`,
            this.joinPush.timeout,
          ),
          (this.state = De.errored),
          this.rejoinTimer.scheduleTimeout());
      }),
      this._on(Xe.reply, {}, (i, n) => {
        this._trigger(this._replyEventName(n), i);
      }),
      (this.presence = new hr(this)),
      (this.broadcastEndpointURL = dn(this.socket.endPoint) + "/api/broadcast"),
      (this.private = this.params.config.private || !1));
  }
  subscribe(e, t = this.timeout) {
    var r, i;
    if (
      (this.socket.isConnected() || this.socket.connect(),
      this.state == De.closed)
    ) {
      const {
        config: { broadcast: n, presence: o, private: a },
      } = this.params;
      (this._onError((h) => (e == null ? void 0 : e(ht.CHANNEL_ERROR, h))),
        this._onClose(() => (e == null ? void 0 : e(ht.CLOSED))));
      const c = {},
        u = {
          broadcast: n,
          presence: o,
          postgres_changes:
            (i =
              (r = this.bindings.postgres_changes) === null || r === void 0
                ? void 0
                : r.map((h) => h.filter)) !== null && i !== void 0
              ? i
              : [],
          private: a,
        };
      (this.socket.accessTokenValue &&
        (c.access_token = this.socket.accessTokenValue),
        this.updateJoinPayload(Object.assign({ config: u }, c)),
        (this.joinedOnce = !0),
        this._rejoin(t),
        this.joinPush
          .receive("ok", async ({ postgres_changes: h }) => {
            var p;
            if ((this.socket.setAuth(), h === void 0)) {
              e == null || e(ht.SUBSCRIBED);
              return;
            } else {
              const y = this.bindings.postgres_changes,
                b =
                  (p = y == null ? void 0 : y.length) !== null && p !== void 0
                    ? p
                    : 0,
                k = [];
              for (let I = 0; I < b; I++) {
                const P = y[I],
                  {
                    filter: { event: L, schema: G, table: O, filter: A },
                  } = P,
                  H = h && h[I];
                if (
                  H &&
                  H.event === L &&
                  H.schema === G &&
                  H.table === O &&
                  H.filter === A
                )
                  k.push(Object.assign(Object.assign({}, P), { id: H.id }));
                else {
                  (this.unsubscribe(),
                    (this.state = De.errored),
                    e == null ||
                      e(
                        ht.CHANNEL_ERROR,
                        new Error(
                          "mismatch between server and client bindings for postgres changes",
                        ),
                      ));
                  return;
                }
              }
              ((this.bindings.postgres_changes = k), e && e(ht.SUBSCRIBED));
              return;
            }
          })
          .receive("error", (h) => {
            ((this.state = De.errored),
              e == null ||
                e(
                  ht.CHANNEL_ERROR,
                  new Error(
                    JSON.stringify(Object.values(h).join(", ") || "error"),
                  ),
                ));
          })
          .receive("timeout", () => {
            e == null || e(ht.TIMED_OUT);
          }));
    }
    return this;
  }
  presenceState() {
    return this.presence.state;
  }
  async track(e, t = {}) {
    return await this.send(
      { type: "presence", event: "track", payload: e },
      t.timeout || this.timeout,
    );
  }
  async untrack(e = {}) {
    return await this.send({ type: "presence", event: "untrack" }, e);
  }
  on(e, t, r) {
    return this._on(e, t, r);
  }
  async send(e, t = {}) {
    var r, i;
    if (!this._canPush() && e.type === "broadcast") {
      const { event: n, payload: o } = e,
        c = {
          method: "POST",
          headers: {
            Authorization: this.socket.accessTokenValue
              ? `Bearer ${this.socket.accessTokenValue}`
              : "",
            apikey: this.socket.apiKey ? this.socket.apiKey : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                topic: this.subTopic,
                event: n,
                payload: o,
                private: this.private,
              },
            ],
          }),
        };
      try {
        const u = await this._fetchWithTimeout(
          this.broadcastEndpointURL,
          c,
          (r = t.timeout) !== null && r !== void 0 ? r : this.timeout,
        );
        return (
          await ((i = u.body) === null || i === void 0 ? void 0 : i.cancel()),
          u.ok ? "ok" : "error"
        );
      } catch (u) {
        return u.name === "AbortError" ? "timed out" : "error";
      }
    } else
      return new Promise((n) => {
        var o, a, c;
        const u = this._push(e.type, e, t.timeout || this.timeout);
        (e.type === "broadcast" &&
          !(
            !(
              (c =
                (a =
                  (o = this.params) === null || o === void 0
                    ? void 0
                    : o.config) === null || a === void 0
                  ? void 0
                  : a.broadcast) === null || c === void 0
            ) && c.ack
          ) &&
          n("ok"),
          u.receive("ok", () => n("ok")),
          u.receive("error", () => n("error")),
          u.receive("timeout", () => n("timed out")));
      });
  }
  updateJoinPayload(e) {
    this.joinPush.updatePayload(e);
  }
  unsubscribe(e = this.timeout) {
    this.state = De.leaving;
    const t = () => {
      (this.socket.log("channel", `leave ${this.topic}`),
        this._trigger(Xe.close, "leave", this._joinRef()));
    };
    this.joinPush.destroy();
    let r = null;
    return new Promise((i) => {
      ((r = new ts(this, Xe.leave, {}, e)),
        r
          .receive("ok", () => {
            (t(), i("ok"));
          })
          .receive("timeout", () => {
            (t(), i("timed out"));
          })
          .receive("error", () => {
            i("error");
          }),
        r.send(),
        this._canPush() || r.trigger("ok", {}));
    }).finally(() => {
      r == null || r.destroy();
    });
  }
  teardown() {
    (this.pushBuffer.forEach((e) => e.destroy()),
      this.rejoinTimer && clearTimeout(this.rejoinTimer.timer),
      this.joinPush.destroy());
  }
  async _fetchWithTimeout(e, t, r) {
    const i = new AbortController(),
      n = setTimeout(() => i.abort(), r),
      o = await this.socket.fetch(
        e,
        Object.assign(Object.assign({}, t), { signal: i.signal }),
      );
    return (clearTimeout(n), o);
  }
  _push(e, t, r = this.timeout) {
    if (!this.joinedOnce)
      throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    let i = new ts(this, e, t, r);
    return (
      this._canPush() ? i.send() : (i.startTimeout(), this.pushBuffer.push(i)),
      i
    );
  }
  _onMessage(e, t, r) {
    return t;
  }
  _isMember(e) {
    return this.topic === e;
  }
  _joinRef() {
    return this.joinPush.ref;
  }
  _trigger(e, t, r) {
    var i, n;
    const o = e.toLocaleLowerCase(),
      { close: a, error: c, leave: u, join: h } = Xe;
    if (r && [a, c, u, h].indexOf(o) >= 0 && r !== this._joinRef()) return;
    let y = this._onMessage(o, t, r);
    if (t && !y)
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    ["insert", "update", "delete"].includes(o)
      ? (i = this.bindings.postgres_changes) === null ||
        i === void 0 ||
        i
          .filter((b) => {
            var k, I, P;
            return (
              ((k = b.filter) === null || k === void 0 ? void 0 : k.event) ===
                "*" ||
              ((P =
                (I = b.filter) === null || I === void 0 ? void 0 : I.event) ===
                null || P === void 0
                ? void 0
                : P.toLocaleLowerCase()) === o
            );
          })
          .map((b) => b.callback(y, r))
      : (n = this.bindings[o]) === null ||
        n === void 0 ||
        n
          .filter((b) => {
            var k, I, P, L, G, O;
            if (["broadcast", "presence", "postgres_changes"].includes(o))
              if ("id" in b) {
                const A = b.id,
                  H =
                    (k = b.filter) === null || k === void 0 ? void 0 : k.event;
                return (
                  A &&
                  ((I = t.ids) === null || I === void 0
                    ? void 0
                    : I.includes(A)) &&
                  (H === "*" ||
                    (H == null ? void 0 : H.toLocaleLowerCase()) ===
                      ((P = t.data) === null || P === void 0
                        ? void 0
                        : P.type.toLocaleLowerCase()))
                );
              } else {
                const A =
                  (G =
                    (L = b == null ? void 0 : b.filter) === null || L === void 0
                      ? void 0
                      : L.event) === null || G === void 0
                    ? void 0
                    : G.toLocaleLowerCase();
                return (
                  A === "*" ||
                  A ===
                    ((O = t == null ? void 0 : t.event) === null || O === void 0
                      ? void 0
                      : O.toLocaleLowerCase())
                );
              }
            else return b.type.toLocaleLowerCase() === o;
          })
          .map((b) => {
            if (typeof y == "object" && "ids" in y) {
              const k = y.data,
                {
                  schema: I,
                  table: P,
                  commit_timestamp: L,
                  type: G,
                  errors: O,
                } = k;
              y = Object.assign(
                Object.assign(
                  {},
                  {
                    schema: I,
                    table: P,
                    commit_timestamp: L,
                    eventType: G,
                    new: {},
                    old: {},
                    errors: O,
                  },
                ),
                this._getPayloadRecords(k),
              );
            }
            b.callback(y, r);
          });
  }
  _isClosed() {
    return this.state === De.closed;
  }
  _isJoined() {
    return this.state === De.joined;
  }
  _isJoining() {
    return this.state === De.joining;
  }
  _isLeaving() {
    return this.state === De.leaving;
  }
  _replyEventName(e) {
    return `chan_reply_${e}`;
  }
  _on(e, t, r) {
    const i = e.toLocaleLowerCase(),
      n = { type: i, filter: t, callback: r };
    return (
      this.bindings[i] ? this.bindings[i].push(n) : (this.bindings[i] = [n]),
      this
    );
  }
  _off(e, t) {
    const r = e.toLocaleLowerCase();
    return (
      (this.bindings[r] = this.bindings[r].filter((i) => {
        var n;
        return !(
          ((n = i.type) === null || n === void 0
            ? void 0
            : n.toLocaleLowerCase()) === r && Ss.isEqual(i.filter, t)
        );
      })),
      this
    );
  }
  static isEqual(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const r in e) if (e[r] !== t[r]) return !1;
    return !0;
  }
  _rejoinUntilConnected() {
    (this.rejoinTimer.scheduleTimeout(),
      this.socket.isConnected() && this._rejoin());
  }
  _onClose(e) {
    this._on(Xe.close, {}, e);
  }
  _onError(e) {
    this._on(Xe.error, {}, (t) => e(t));
  }
  _canPush() {
    return this.socket.isConnected() && this._isJoined();
  }
  _rejoin(e = this.timeout) {
    this._isLeaving() ||
      (this.socket._leaveOpenTopic(this.topic),
      (this.state = De.joining),
      this.joinPush.resend(e));
  }
  _getPayloadRecords(e) {
    const t = { new: {}, old: {} };
    return (
      (e.type === "INSERT" || e.type === "UPDATE") &&
        (t.new = yi(e.columns, e.record)),
      (e.type === "UPDATE" || e.type === "DELETE") &&
        (t.old = yi(e.columns, e.old_record)),
      t
    );
  }
}
const _i = () => {},
  Aa = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
class Da {
  constructor(e, t) {
    var r;
    ((this.accessTokenValue = null),
      (this.apiKey = null),
      (this.channels = new Array()),
      (this.endPoint = ""),
      (this.httpEndpoint = ""),
      (this.headers = {}),
      (this.params = {}),
      (this.timeout = an),
      (this.heartbeatIntervalMs = 25e3),
      (this.heartbeatTimer = void 0),
      (this.pendingHeartbeatRef = null),
      (this.heartbeatCallback = _i),
      (this.ref = 0),
      (this.logger = _i),
      (this.conn = null),
      (this.sendBuffer = []),
      (this.serializer = new Ta()),
      (this.stateChangeCallbacks = {
        open: [],
        close: [],
        error: [],
        message: [],
      }),
      (this.accessToken = null),
      (this._resolveFetch = (n) => {
        let o;
        return (
          n
            ? (o = n)
            : typeof fetch > "u"
              ? (o = (...a) =>
                  ze(
                    async () => {
                      const { default: c } = await Promise.resolve().then(
                        () => er,
                      );
                      return { default: c };
                    },
                    void 0,
                  ).then(({ default: c }) => c(...a)))
              : (o = fetch),
          (...a) => o(...a)
        );
      }),
      (this.endPoint = `${e}/${hs.websocket}`),
      (this.httpEndpoint = dn(e)),
      t != null && t.transport
        ? (this.transport = t.transport)
        : (this.transport = null),
      t != null && t.params && (this.params = t.params),
      t != null && t.timeout && (this.timeout = t.timeout),
      t != null && t.logger && (this.logger = t.logger),
      ((t != null && t.logLevel) || (t != null && t.log_level)) &&
        ((this.logLevel = t.logLevel || t.log_level),
        (this.params = Object.assign(Object.assign({}, this.params), {
          log_level: this.logLevel,
        }))),
      t != null &&
        t.heartbeatIntervalMs &&
        (this.heartbeatIntervalMs = t.heartbeatIntervalMs));
    const i =
      (r = t == null ? void 0 : t.params) === null || r === void 0
        ? void 0
        : r.apikey;
    if (
      (i && ((this.accessTokenValue = i), (this.apiKey = i)),
      (this.reconnectAfterMs =
        t != null && t.reconnectAfterMs
          ? t.reconnectAfterMs
          : (n) => [1e3, 2e3, 5e3, 1e4][n - 1] || 1e4),
      (this.encode =
        t != null && t.encode ? t.encode : (n, o) => o(JSON.stringify(n))),
      (this.decode =
        t != null && t.decode
          ? t.decode
          : this.serializer.decode.bind(this.serializer)),
      (this.reconnectTimer = new ln(async () => {
        (this.disconnect(), this.connect());
      }, this.reconnectAfterMs)),
      (this.fetch = this._resolveFetch(t == null ? void 0 : t.fetch)),
      t != null && t.worker)
    ) {
      if (typeof window < "u" && !window.Worker)
        throw new Error("Web Worker is not supported");
      ((this.worker = (t == null ? void 0 : t.worker) || !1),
        (this.workerUrl = t == null ? void 0 : t.workerUrl));
    }
    this.accessToken = (t == null ? void 0 : t.accessToken) || null;
  }
  connect() {
    if (!this.conn) {
      if ((this.transport || (this.transport = _a), !this.transport))
        throw new Error("No transport provided");
      ((this.conn = new this.transport(this.endpointURL())),
        this.setupConnection());
    }
  }
  endpointURL() {
    return this._appendParams(
      this.endPoint,
      Object.assign({}, this.params, { vsn: Ca }),
    );
  }
  disconnect(e, t) {
    this.conn &&
      ((this.conn.onclose = function () {}),
      e ? this.conn.close(e, t ?? "") : this.conn.close(),
      (this.conn = null),
      this.heartbeatTimer && clearInterval(this.heartbeatTimer),
      this.reconnectTimer.reset(),
      this.channels.forEach((r) => r.teardown()));
  }
  getChannels() {
    return this.channels;
  }
  async removeChannel(e) {
    const t = await e.unsubscribe();
    return (this.channels.length === 0 && this.disconnect(), t);
  }
  async removeAllChannels() {
    const e = await Promise.all(this.channels.map((t) => t.unsubscribe()));
    return ((this.channels = []), this.disconnect(), e);
  }
  log(e, t, r) {
    this.logger(e, t, r);
  }
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case ur.connecting:
        return kt.Connecting;
      case ur.open:
        return kt.Open;
      case ur.closing:
        return kt.Closing;
      default:
        return kt.Closed;
    }
  }
  isConnected() {
    return this.connectionState() === kt.Open;
  }
  channel(e, t = { config: {} }) {
    const r = `realtime:${e}`,
      i = this.getChannels().find((n) => n.topic === r);
    if (i) return i;
    {
      const n = new Ss(`realtime:${e}`, t, this);
      return (this.channels.push(n), n);
    }
  }
  push(e) {
    const { topic: t, event: r, payload: i, ref: n } = e,
      o = () => {
        this.encode(e, (a) => {
          var c;
          (c = this.conn) === null || c === void 0 || c.send(a);
        });
      };
    (this.log("push", `${t} ${r} (${n})`, i),
      this.isConnected() ? o() : this.sendBuffer.push(o));
  }
  async setAuth(e = null) {
    let t =
      e ||
      (this.accessToken && (await this.accessToken())) ||
      this.accessTokenValue;
    this.accessTokenValue != t &&
      ((this.accessTokenValue = t),
      this.channels.forEach((r) => {
        const i = { access_token: t, version: Sa };
        (t && r.updateJoinPayload(i),
          r.joinedOnce &&
            r._isJoined() &&
            r._push(Xe.access_token, { access_token: t }));
      }));
  }
  async sendHeartbeat() {
    var e;
    if (!this.isConnected()) {
      this.heartbeatCallback("disconnected");
      return;
    }
    if (this.pendingHeartbeatRef) {
      ((this.pendingHeartbeatRef = null),
        this.log(
          "transport",
          "heartbeat timeout. Attempting to re-establish connection",
        ),
        this.heartbeatCallback("timeout"),
        (e = this.conn) === null ||
          e === void 0 ||
          e.close(ka, "hearbeat timeout"));
      return;
    }
    ((this.pendingHeartbeatRef = this._makeRef()),
      this.push({
        topic: "phoenix",
        event: "heartbeat",
        payload: {},
        ref: this.pendingHeartbeatRef,
      }),
      this.heartbeatCallback("sent"),
      await this.setAuth());
  }
  onHeartbeat(e) {
    this.heartbeatCallback = e;
  }
  flushSendBuffer() {
    this.isConnected() &&
      this.sendBuffer.length > 0 &&
      (this.sendBuffer.forEach((e) => e()), (this.sendBuffer = []));
  }
  _makeRef() {
    let e = this.ref + 1;
    return (
      e === this.ref ? (this.ref = 0) : (this.ref = e),
      this.ref.toString()
    );
  }
  _leaveOpenTopic(e) {
    let t = this.channels.find(
      (r) => r.topic === e && (r._isJoined() || r._isJoining()),
    );
    t &&
      (this.log("transport", `leaving duplicate topic "${e}"`),
      t.unsubscribe());
  }
  _remove(e) {
    this.channels = this.channels.filter((t) => t.topic !== e.topic);
  }
  setupConnection() {
    this.conn &&
      ((this.conn.binaryType = "arraybuffer"),
      (this.conn.onopen = () => this._onConnOpen()),
      (this.conn.onerror = (e) => this._onConnError(e)),
      (this.conn.onmessage = (e) => this._onConnMessage(e)),
      (this.conn.onclose = (e) => this._onConnClose(e)));
  }
  _onConnMessage(e) {
    this.decode(e.data, (t) => {
      let { topic: r, event: i, payload: n, ref: o } = t;
      (r === "phoenix" &&
        i === "phx_reply" &&
        this.heartbeatCallback(t.payload.status == "ok" ? "ok" : "error"),
        o &&
          o === this.pendingHeartbeatRef &&
          (this.pendingHeartbeatRef = null),
        this.log(
          "receive",
          `${n.status || ""} ${r} ${i} ${(o && "(" + o + ")") || ""}`,
          n,
        ),
        Array.from(this.channels)
          .filter((a) => a._isMember(r))
          .forEach((a) => a._trigger(i, n, o)),
        this.stateChangeCallbacks.message.forEach((a) => a(t)));
    });
  }
  _onConnOpen() {
    (this.log("transport", `connected to ${this.endpointURL()}`),
      this.flushSendBuffer(),
      this.reconnectTimer.reset(),
      this.worker
        ? this.workerRef || this._startWorkerHeartbeat()
        : this._startHeartbeat(),
      this.stateChangeCallbacks.open.forEach((e) => e()));
  }
  _startHeartbeat() {
    (this.heartbeatTimer && clearInterval(this.heartbeatTimer),
      (this.heartbeatTimer = setInterval(
        () => this.sendHeartbeat(),
        this.heartbeatIntervalMs,
      )));
  }
  _startWorkerHeartbeat() {
    this.workerUrl
      ? this.log("worker", `starting worker for from ${this.workerUrl}`)
      : this.log("worker", "starting default worker");
    const e = this._workerObjectUrl(this.workerUrl);
    ((this.workerRef = new Worker(e)),
      (this.workerRef.onerror = (t) => {
        (this.log("worker", "worker error", t.message),
          this.workerRef.terminate());
      }),
      (this.workerRef.onmessage = (t) => {
        t.data.event === "keepAlive" && this.sendHeartbeat();
      }),
      this.workerRef.postMessage({
        event: "start",
        interval: this.heartbeatIntervalMs,
      }));
  }
  _onConnClose(e) {
    (this.log("transport", "close", e),
      this._triggerChanError(),
      this.heartbeatTimer && clearInterval(this.heartbeatTimer),
      this.reconnectTimer.scheduleTimeout(),
      this.stateChangeCallbacks.close.forEach((t) => t(e)));
  }
  _onConnError(e) {
    (this.log("transport", `${e}`),
      this._triggerChanError(),
      this.stateChangeCallbacks.error.forEach((t) => t(e)));
  }
  _triggerChanError() {
    this.channels.forEach((e) => e._trigger(Xe.error));
  }
  _appendParams(e, t) {
    if (Object.keys(t).length === 0) return e;
    const r = e.match(/\?/) ? "&" : "?",
      i = new URLSearchParams(t);
    return `${e}${r}${i}`;
  }
  _workerObjectUrl(e) {
    let t;
    if (e) t = e;
    else {
      const r = new Blob([Aa], { type: "application/javascript" });
      t = URL.createObjectURL(r);
    }
    return t;
  }
}
class Cs extends Error {
  constructor(e) {
    (super(e), (this.__isStorageError = !0), (this.name = "StorageError"));
  }
}
function Pe(s) {
  return typeof s == "object" && s !== null && "__isStorageError" in s;
}
class Ra extends Cs {
  constructor(e, t) {
    (super(e), (this.name = "StorageApiError"), (this.status = t));
  }
  toJSON() {
    return { name: this.name, message: this.message, status: this.status };
  }
}
class fs extends Cs {
  constructor(e, t) {
    (super(e), (this.name = "StorageUnknownError"), (this.originalError = t));
  }
}
var $a = function (s, e, t, r) {
  function i(n) {
    return n instanceof t
      ? n
      : new t(function (o) {
          o(n);
        });
  }
  return new (t || (t = Promise))(function (n, o) {
    function a(h) {
      try {
        u(r.next(h));
      } catch (p) {
        o(p);
      }
    }
    function c(h) {
      try {
        u(r.throw(h));
      } catch (p) {
        o(p);
      }
    }
    function u(h) {
      h.done ? n(h.value) : i(h.value).then(a, c);
    }
    u((r = r.apply(s, e || [])).next());
  });
};
const un = (s) => {
    let e;
    return (
      s
        ? (e = s)
        : typeof fetch > "u"
          ? (e = (...t) =>
              ze(
                async () => {
                  const { default: r } = await Promise.resolve().then(() => er);
                  return { default: r };
                },
                void 0,
              ).then(({ default: r }) => r(...t)))
          : (e = fetch),
      (...t) => e(...t)
    );
  },
  Ma = () =>
    $a(void 0, void 0, void 0, function* () {
      return typeof Response > "u"
        ? (yield ze(() => Promise.resolve().then(() => er), void 0)).Response
        : Response;
    }),
  ps = (s) => {
    if (Array.isArray(s)) return s.map((t) => ps(t));
    if (typeof s == "function" || s !== Object(s)) return s;
    const e = {};
    return (
      Object.entries(s).forEach(([t, r]) => {
        const i = t.replace(/([-_][a-z])/gi, (n) =>
          n.toUpperCase().replace(/[-_]/g, ""),
        );
        e[i] = ps(r);
      }),
      e
    );
  };
var Tt = function (s, e, t, r) {
  function i(n) {
    return n instanceof t
      ? n
      : new t(function (o) {
          o(n);
        });
  }
  return new (t || (t = Promise))(function (n, o) {
    function a(h) {
      try {
        u(r.next(h));
      } catch (p) {
        o(p);
      }
    }
    function c(h) {
      try {
        u(r.throw(h));
      } catch (p) {
        o(p);
      }
    }
    function u(h) {
      h.done ? n(h.value) : i(h.value).then(a, c);
    }
    u((r = r.apply(s, e || [])).next());
  });
};
const rs = (s) =>
    s.msg || s.message || s.error_description || s.error || JSON.stringify(s),
  La = (s, e, t) =>
    Tt(void 0, void 0, void 0, function* () {
      const r = yield Ma();
      s instanceof r && !(t != null && t.noResolveJson)
        ? s
            .json()
            .then((i) => {
              e(new Ra(rs(i), s.status || 500));
            })
            .catch((i) => {
              e(new fs(rs(i), i));
            })
        : e(new fs(rs(s), s));
    }),
  Fa = (s, e, t, r) => {
    const i = { method: s, headers: (e == null ? void 0 : e.headers) || {} };
    return s === "GET"
      ? i
      : ((i.headers = Object.assign(
          { "Content-Type": "application/json" },
          e == null ? void 0 : e.headers,
        )),
        r && (i.body = JSON.stringify(r)),
        Object.assign(Object.assign({}, i), t));
  };
function yr(s, e, t, r, i, n) {
  return Tt(this, void 0, void 0, function* () {
    return new Promise((o, a) => {
      s(t, Fa(e, r, i, n))
        .then((c) => {
          if (!c.ok) throw c;
          return r != null && r.noResolveJson ? c : c.json();
        })
        .then((c) => o(c))
        .catch((c) => La(c, a, r));
    });
  });
}
function Mr(s, e, t, r) {
  return Tt(this, void 0, void 0, function* () {
    return yr(s, "GET", e, t, r);
  });
}
function pt(s, e, t, r, i) {
  return Tt(this, void 0, void 0, function* () {
    return yr(s, "POST", e, r, i, t);
  });
}
function Ua(s, e, t, r, i) {
  return Tt(this, void 0, void 0, function* () {
    return yr(s, "PUT", e, r, i, t);
  });
}
function Ba(s, e, t, r) {
  return Tt(this, void 0, void 0, function* () {
    return yr(
      s,
      "HEAD",
      e,
      Object.assign(Object.assign({}, t), { noResolveJson: !0 }),
      r,
    );
  });
}
function hn(s, e, t, r, i) {
  return Tt(this, void 0, void 0, function* () {
    return yr(s, "DELETE", e, r, i, t);
  });
}
var Be = function (s, e, t, r) {
  function i(n) {
    return n instanceof t
      ? n
      : new t(function (o) {
          o(n);
        });
  }
  return new (t || (t = Promise))(function (n, o) {
    function a(h) {
      try {
        u(r.next(h));
      } catch (p) {
        o(p);
      }
    }
    function c(h) {
      try {
        u(r.throw(h));
      } catch (p) {
        o(p);
      }
    }
    function u(h) {
      h.done ? n(h.value) : i(h.value).then(a, c);
    }
    u((r = r.apply(s, e || [])).next());
  });
};
const qa = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } },
  xi = {
    cacheControl: "3600",
    contentType: "text/plain;charset=UTF-8",
    upsert: !1,
  };
class Va {
  constructor(e, t = {}, r, i) {
    ((this.url = e),
      (this.headers = t),
      (this.bucketId = r),
      (this.fetch = un(i)));
  }
  uploadOrUpdate(e, t, r, i) {
    return Be(this, void 0, void 0, function* () {
      try {
        let n;
        const o = Object.assign(Object.assign({}, xi), i);
        let a = Object.assign(
          Object.assign({}, this.headers),
          e === "POST" && { "x-upsert": String(o.upsert) },
        );
        const c = o.metadata;
        (typeof Blob < "u" && r instanceof Blob
          ? ((n = new FormData()),
            n.append("cacheControl", o.cacheControl),
            c && n.append("metadata", this.encodeMetadata(c)),
            n.append("", r))
          : typeof FormData < "u" && r instanceof FormData
            ? ((n = r),
              n.append("cacheControl", o.cacheControl),
              c && n.append("metadata", this.encodeMetadata(c)))
            : ((n = r),
              (a["cache-control"] = `max-age=${o.cacheControl}`),
              (a["content-type"] = o.contentType),
              c && (a["x-metadata"] = this.toBase64(this.encodeMetadata(c)))),
          i != null &&
            i.headers &&
            (a = Object.assign(Object.assign({}, a), i.headers)));
        const u = this._removeEmptyFolders(t),
          h = this._getFinalPath(u),
          p = yield this.fetch(
            `${this.url}/object/${h}`,
            Object.assign(
              { method: e, body: n, headers: a },
              o != null && o.duplex ? { duplex: o.duplex } : {},
            ),
          ),
          y = yield p.json();
        return p.ok
          ? { data: { path: u, id: y.Id, fullPath: y.Key }, error: null }
          : { data: null, error: y };
      } catch (n) {
        if (Pe(n)) return { data: null, error: n };
        throw n;
      }
    });
  }
  upload(e, t, r) {
    return Be(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", e, t, r);
    });
  }
  uploadToSignedUrl(e, t, r, i) {
    return Be(this, void 0, void 0, function* () {
      const n = this._removeEmptyFolders(e),
        o = this._getFinalPath(n),
        a = new URL(this.url + `/object/upload/sign/${o}`);
      a.searchParams.set("token", t);
      try {
        let c;
        const u = Object.assign({ upsert: xi.upsert }, i),
          h = Object.assign(Object.assign({}, this.headers), {
            "x-upsert": String(u.upsert),
          });
        typeof Blob < "u" && r instanceof Blob
          ? ((c = new FormData()),
            c.append("cacheControl", u.cacheControl),
            c.append("", r))
          : typeof FormData < "u" && r instanceof FormData
            ? ((c = r), c.append("cacheControl", u.cacheControl))
            : ((c = r),
              (h["cache-control"] = `max-age=${u.cacheControl}`),
              (h["content-type"] = u.contentType));
        const p = yield this.fetch(a.toString(), {
            method: "PUT",
            body: c,
            headers: h,
          }),
          y = yield p.json();
        return p.ok
          ? { data: { path: n, fullPath: y.Key }, error: null }
          : { data: null, error: y };
      } catch (c) {
        if (Pe(c)) return { data: null, error: c };
        throw c;
      }
    });
  }
  createSignedUploadUrl(e, t) {
    return Be(this, void 0, void 0, function* () {
      try {
        let r = this._getFinalPath(e);
        const i = Object.assign({}, this.headers);
        t != null && t.upsert && (i["x-upsert"] = "true");
        const n = yield pt(
            this.fetch,
            `${this.url}/object/upload/sign/${r}`,
            {},
            { headers: i },
          ),
          o = new URL(this.url + n.url),
          a = o.searchParams.get("token");
        if (!a) throw new Cs("No token returned by API");
        return {
          data: { signedUrl: o.toString(), path: e, token: a },
          error: null,
        };
      } catch (r) {
        if (Pe(r)) return { data: null, error: r };
        throw r;
      }
    });
  }
  update(e, t, r) {
    return Be(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("PUT", e, t, r);
    });
  }
  move(e, t, r) {
    return Be(this, void 0, void 0, function* () {
      try {
        return {
          data: yield pt(
            this.fetch,
            `${this.url}/object/move`,
            {
              bucketId: this.bucketId,
              sourceKey: e,
              destinationKey: t,
              destinationBucket: r == null ? void 0 : r.destinationBucket,
            },
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (i) {
        if (Pe(i)) return { data: null, error: i };
        throw i;
      }
    });
  }
  copy(e, t, r) {
    return Be(this, void 0, void 0, function* () {
      try {
        return {
          data: {
            path: (yield pt(
              this.fetch,
              `${this.url}/object/copy`,
              {
                bucketId: this.bucketId,
                sourceKey: e,
                destinationKey: t,
                destinationBucket: r == null ? void 0 : r.destinationBucket,
              },
              { headers: this.headers },
            )).Key,
          },
          error: null,
        };
      } catch (i) {
        if (Pe(i)) return { data: null, error: i };
        throw i;
      }
    });
  }
  createSignedUrl(e, t, r) {
    return Be(this, void 0, void 0, function* () {
      try {
        let i = this._getFinalPath(e),
          n = yield pt(
            this.fetch,
            `${this.url}/object/sign/${i}`,
            Object.assign(
              { expiresIn: t },
              r != null && r.transform ? { transform: r.transform } : {},
            ),
            { headers: this.headers },
          );
        const o =
          r != null && r.download
            ? `&download=${r.download === !0 ? "" : r.download}`
            : "";
        return (
          (n = { signedUrl: encodeURI(`${this.url}${n.signedURL}${o}`) }),
          { data: n, error: null }
        );
      } catch (i) {
        if (Pe(i)) return { data: null, error: i };
        throw i;
      }
    });
  }
  createSignedUrls(e, t, r) {
    return Be(this, void 0, void 0, function* () {
      try {
        const i = yield pt(
            this.fetch,
            `${this.url}/object/sign/${this.bucketId}`,
            { expiresIn: t, paths: e },
            { headers: this.headers },
          ),
          n =
            r != null && r.download
              ? `&download=${r.download === !0 ? "" : r.download}`
              : "";
        return {
          data: i.map((o) =>
            Object.assign(Object.assign({}, o), {
              signedUrl: o.signedURL
                ? encodeURI(`${this.url}${o.signedURL}${n}`)
                : null,
            }),
          ),
          error: null,
        };
      } catch (i) {
        if (Pe(i)) return { data: null, error: i };
        throw i;
      }
    });
  }
  download(e, t) {
    return Be(this, void 0, void 0, function* () {
      const i =
          typeof (t == null ? void 0 : t.transform) < "u"
            ? "render/image/authenticated"
            : "object",
        n = this.transformOptsToQueryString(
          (t == null ? void 0 : t.transform) || {},
        ),
        o = n ? `?${n}` : "";
      try {
        const a = this._getFinalPath(e);
        return {
          data: yield (yield Mr(this.fetch, `${this.url}/${i}/${a}${o}`, {
            headers: this.headers,
            noResolveJson: !0,
          })).blob(),
          error: null,
        };
      } catch (a) {
        if (Pe(a)) return { data: null, error: a };
        throw a;
      }
    });
  }
  info(e) {
    return Be(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        const r = yield Mr(this.fetch, `${this.url}/object/info/${t}`, {
          headers: this.headers,
        });
        return { data: ps(r), error: null };
      } catch (r) {
        if (Pe(r)) return { data: null, error: r };
        throw r;
      }
    });
  }
  exists(e) {
    return Be(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        return (
          yield Ba(this.fetch, `${this.url}/object/${t}`, {
            headers: this.headers,
          }),
          { data: !0, error: null }
        );
      } catch (r) {
        if (Pe(r) && r instanceof fs) {
          const i = r.originalError;
          if ([400, 404].includes(i == null ? void 0 : i.status))
            return { data: !1, error: r };
        }
        throw r;
      }
    });
  }
  getPublicUrl(e, t) {
    const r = this._getFinalPath(e),
      i = [],
      n =
        t != null && t.download
          ? `download=${t.download === !0 ? "" : t.download}`
          : "";
    n !== "" && i.push(n);
    const a =
        typeof (t == null ? void 0 : t.transform) < "u"
          ? "render/image"
          : "object",
      c = this.transformOptsToQueryString(
        (t == null ? void 0 : t.transform) || {},
      );
    c !== "" && i.push(c);
    let u = i.join("&");
    return (
      u !== "" && (u = `?${u}`),
      { data: { publicUrl: encodeURI(`${this.url}/${a}/public/${r}${u}`) } }
    );
  }
  remove(e) {
    return Be(this, void 0, void 0, function* () {
      try {
        return {
          data: yield hn(
            this.fetch,
            `${this.url}/object/${this.bucketId}`,
            { prefixes: e },
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (t) {
        if (Pe(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  list(e, t, r) {
    return Be(this, void 0, void 0, function* () {
      try {
        const i = Object.assign(Object.assign(Object.assign({}, qa), t), {
          prefix: e || "",
        });
        return {
          data: yield pt(
            this.fetch,
            `${this.url}/object/list/${this.bucketId}`,
            i,
            { headers: this.headers },
            r,
          ),
          error: null,
        };
      } catch (i) {
        if (Pe(i)) return { data: null, error: i };
        throw i;
      }
    });
  }
  encodeMetadata(e) {
    return JSON.stringify(e);
  }
  toBase64(e) {
    return typeof Buffer < "u" ? Buffer.from(e).toString("base64") : btoa(e);
  }
  _getFinalPath(e) {
    return `${this.bucketId}/${e}`;
  }
  _removeEmptyFolders(e) {
    return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
  transformOptsToQueryString(e) {
    const t = [];
    return (
      e.width && t.push(`width=${e.width}`),
      e.height && t.push(`height=${e.height}`),
      e.resize && t.push(`resize=${e.resize}`),
      e.format && t.push(`format=${e.format}`),
      e.quality && t.push(`quality=${e.quality}`),
      t.join("&")
    );
  }
}
const Ha = "2.7.1",
  za = { "X-Client-Info": `storage-js/${Ha}` };
var $t = function (s, e, t, r) {
  function i(n) {
    return n instanceof t
      ? n
      : new t(function (o) {
          o(n);
        });
  }
  return new (t || (t = Promise))(function (n, o) {
    function a(h) {
      try {
        u(r.next(h));
      } catch (p) {
        o(p);
      }
    }
    function c(h) {
      try {
        u(r.throw(h));
      } catch (p) {
        o(p);
      }
    }
    function u(h) {
      h.done ? n(h.value) : i(h.value).then(a, c);
    }
    u((r = r.apply(s, e || [])).next());
  });
};
class Ga {
  constructor(e, t = {}, r) {
    ((this.url = e),
      (this.headers = Object.assign(Object.assign({}, za), t)),
      (this.fetch = un(r)));
  }
  listBuckets() {
    return $t(this, void 0, void 0, function* () {
      try {
        return {
          data: yield Mr(this.fetch, `${this.url}/bucket`, {
            headers: this.headers,
          }),
          error: null,
        };
      } catch (e) {
        if (Pe(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  getBucket(e) {
    return $t(this, void 0, void 0, function* () {
      try {
        return {
          data: yield Mr(this.fetch, `${this.url}/bucket/${e}`, {
            headers: this.headers,
          }),
          error: null,
        };
      } catch (t) {
        if (Pe(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  createBucket(e, t = { public: !1 }) {
    return $t(this, void 0, void 0, function* () {
      try {
        return {
          data: yield pt(
            this.fetch,
            `${this.url}/bucket`,
            {
              id: e,
              name: e,
              public: t.public,
              file_size_limit: t.fileSizeLimit,
              allowed_mime_types: t.allowedMimeTypes,
            },
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (r) {
        if (Pe(r)) return { data: null, error: r };
        throw r;
      }
    });
  }
  updateBucket(e, t) {
    return $t(this, void 0, void 0, function* () {
      try {
        return {
          data: yield Ua(
            this.fetch,
            `${this.url}/bucket/${e}`,
            {
              id: e,
              name: e,
              public: t.public,
              file_size_limit: t.fileSizeLimit,
              allowed_mime_types: t.allowedMimeTypes,
            },
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (r) {
        if (Pe(r)) return { data: null, error: r };
        throw r;
      }
    });
  }
  emptyBucket(e) {
    return $t(this, void 0, void 0, function* () {
      try {
        return {
          data: yield pt(
            this.fetch,
            `${this.url}/bucket/${e}/empty`,
            {},
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (t) {
        if (Pe(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  deleteBucket(e) {
    return $t(this, void 0, void 0, function* () {
      try {
        return {
          data: yield hn(
            this.fetch,
            `${this.url}/bucket/${e}`,
            {},
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (t) {
        if (Pe(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
}
class Wa extends Ga {
  constructor(e, t = {}, r) {
    super(e, t, r);
  }
  from(e) {
    return new Va(this.url, this.headers, e, this.fetch);
  }
}
const Ka = "2.50.5";
let cr = "";
typeof Deno < "u"
  ? (cr = "deno")
  : typeof document < "u"
    ? (cr = "web")
    : typeof navigator < "u" && navigator.product === "ReactNative"
      ? (cr = "react-native")
      : (cr = "node");
const Ja = { "X-Client-Info": `supabase-js-${cr}/${Ka}` },
  Qa = { headers: Ja },
  Ya = { schema: "public" },
  Xa = {
    autoRefreshToken: !0,
    persistSession: !0,
    detectSessionInUrl: !0,
    flowType: "implicit",
  },
  Za = {};
var el = function (s, e, t, r) {
  function i(n) {
    return n instanceof t
      ? n
      : new t(function (o) {
          o(n);
        });
  }
  return new (t || (t = Promise))(function (n, o) {
    function a(h) {
      try {
        u(r.next(h));
      } catch (p) {
        o(p);
      }
    }
    function c(h) {
      try {
        u(r.throw(h));
      } catch (p) {
        o(p);
      }
    }
    function u(h) {
      h.done ? n(h.value) : i(h.value).then(a, c);
    }
    u((r = r.apply(s, e || [])).next());
  });
};
const tl = (s) => {
    let e;
    return (
      s ? (e = s) : typeof fetch > "u" ? (e = en) : (e = fetch),
      (...t) => e(...t)
    );
  },
  rl = () => (typeof Headers > "u" ? tn : Headers),
  sl = (s, e, t) => {
    const r = tl(t),
      i = rl();
    return (n, o) =>
      el(void 0, void 0, void 0, function* () {
        var a;
        const c = (a = yield e()) !== null && a !== void 0 ? a : s;
        let u = new i(o == null ? void 0 : o.headers);
        return (
          u.has("apikey") || u.set("apikey", s),
          u.has("Authorization") || u.set("Authorization", `Bearer ${c}`),
          r(n, Object.assign(Object.assign({}, o), { headers: u }))
        );
      });
  };
var il = function (s, e, t, r) {
  function i(n) {
    return n instanceof t
      ? n
      : new t(function (o) {
          o(n);
        });
  }
  return new (t || (t = Promise))(function (n, o) {
    function a(h) {
      try {
        u(r.next(h));
      } catch (p) {
        o(p);
      }
    }
    function c(h) {
      try {
        u(r.throw(h));
      } catch (p) {
        o(p);
      }
    }
    function u(h) {
      h.done ? n(h.value) : i(h.value).then(a, c);
    }
    u((r = r.apply(s, e || [])).next());
  });
};
function nl(s) {
  return s.endsWith("/") ? s : s + "/";
}
function ol(s, e) {
  var t, r;
  const { db: i, auth: n, realtime: o, global: a } = s,
    { db: c, auth: u, realtime: h, global: p } = e,
    y = {
      db: Object.assign(Object.assign({}, c), i),
      auth: Object.assign(Object.assign({}, u), n),
      realtime: Object.assign(Object.assign({}, h), o),
      global: Object.assign(Object.assign(Object.assign({}, p), a), {
        headers: Object.assign(
          Object.assign(
            {},
            (t = p == null ? void 0 : p.headers) !== null && t !== void 0
              ? t
              : {},
          ),
          (r = a == null ? void 0 : a.headers) !== null && r !== void 0
            ? r
            : {},
        ),
      }),
      accessToken: () =>
        il(this, void 0, void 0, function* () {
          return "";
        }),
    };
  return (
    s.accessToken ? (y.accessToken = s.accessToken) : delete y.accessToken,
    y
  );
}
const mn = "2.70.0",
  Bt = 30 * 1e3,
  gs = 3,
  ss = gs * Bt,
  al = "http://localhost:9999",
  ll = "supabase.auth.token",
  cl = { "X-Client-Info": `gotrue-js/${mn}` },
  ys = "X-Supabase-Api-Version",
  fn = {
    "2024-01-01": {
      timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
      name: "2024-01-01",
    },
  },
  dl = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,
  ul = 6e5;
class ks extends Error {
  constructor(e, t, r) {
    (super(e),
      (this.__isAuthError = !0),
      (this.name = "AuthError"),
      (this.status = t),
      (this.code = r));
  }
}
function re(s) {
  return typeof s == "object" && s !== null && "__isAuthError" in s;
}
class hl extends ks {
  constructor(e, t, r) {
    (super(e, t, r),
      (this.name = "AuthApiError"),
      (this.status = t),
      (this.code = r));
  }
}
function ml(s) {
  return re(s) && s.name === "AuthApiError";
}
class pn extends ks {
  constructor(e, t) {
    (super(e), (this.name = "AuthUnknownError"), (this.originalError = t));
  }
}
class vt extends ks {
  constructor(e, t, r, i) {
    (super(e, r, i), (this.name = t), (this.status = r));
  }
}
class ft extends vt {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
  }
}
function fl(s) {
  return re(s) && s.name === "AuthSessionMissingError";
}
class Pr extends vt {
  constructor() {
    super(
      "Auth session or user missing",
      "AuthInvalidTokenResponseError",
      500,
      void 0,
    );
  }
}
class jr extends vt {
  constructor(e) {
    super(e, "AuthInvalidCredentialsError", 400, void 0);
  }
}
class Nr extends vt {
  constructor(e, t = null) {
    (super(e, "AuthImplicitGrantRedirectError", 500, void 0),
      (this.details = null),
      (this.details = t));
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details,
    };
  }
}
function pl(s) {
  return re(s) && s.name === "AuthImplicitGrantRedirectError";
}
class Si extends vt {
  constructor(e, t = null) {
    (super(e, "AuthPKCEGrantCodeExchangeError", 500, void 0),
      (this.details = null),
      (this.details = t));
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details,
    };
  }
}
class vs extends vt {
  constructor(e, t) {
    super(e, "AuthRetryableFetchError", t, void 0);
  }
}
function is(s) {
  return re(s) && s.name === "AuthRetryableFetchError";
}
class Ci extends vt {
  constructor(e, t, r) {
    (super(e, "AuthWeakPasswordError", t, "weak_password"), (this.reasons = r));
  }
}
class mr extends vt {
  constructor(e) {
    super(e, "AuthInvalidJwtError", 400, "invalid_jwt");
  }
}
const Lr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(
      "",
    ),
  ki = ` 	
\r=`.split(""),
  gl = (() => {
    const s = new Array(128);
    for (let e = 0; e < s.length; e += 1) s[e] = -1;
    for (let e = 0; e < ki.length; e += 1) s[ki[e].charCodeAt(0)] = -2;
    for (let e = 0; e < Lr.length; e += 1) s[Lr[e].charCodeAt(0)] = e;
    return s;
  })();
function Ti(s, e, t) {
  if (s !== null)
    for (e.queue = (e.queue << 8) | s, e.queuedBits += 8; e.queuedBits >= 6; ) {
      const r = (e.queue >> (e.queuedBits - 6)) & 63;
      (t(Lr[r]), (e.queuedBits -= 6));
    }
  else if (e.queuedBits > 0)
    for (
      e.queue = e.queue << (6 - e.queuedBits), e.queuedBits = 6;
      e.queuedBits >= 6;
    ) {
      const r = (e.queue >> (e.queuedBits - 6)) & 63;
      (t(Lr[r]), (e.queuedBits -= 6));
    }
}
function gn(s, e, t) {
  const r = gl[s];
  if (r > -1)
    for (e.queue = (e.queue << 6) | r, e.queuedBits += 6; e.queuedBits >= 8; )
      (t((e.queue >> (e.queuedBits - 8)) & 255), (e.queuedBits -= 8));
  else {
    if (r === -2) return;
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(s)}"`);
  }
}
function Ei(s) {
  const e = [],
    t = (o) => {
      e.push(String.fromCodePoint(o));
    },
    r = { utf8seq: 0, codepoint: 0 },
    i = { queue: 0, queuedBits: 0 },
    n = (o) => {
      bl(o, r, t);
    };
  for (let o = 0; o < s.length; o += 1) gn(s.charCodeAt(o), i, n);
  return e.join("");
}
function yl(s, e) {
  if (s <= 127) {
    e(s);
    return;
  } else if (s <= 2047) {
    (e(192 | (s >> 6)), e(128 | (s & 63)));
    return;
  } else if (s <= 65535) {
    (e(224 | (s >> 12)), e(128 | ((s >> 6) & 63)), e(128 | (s & 63)));
    return;
  } else if (s <= 1114111) {
    (e(240 | (s >> 18)),
      e(128 | ((s >> 12) & 63)),
      e(128 | ((s >> 6) & 63)),
      e(128 | (s & 63)));
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${s.toString(16)}`);
}
function vl(s, e) {
  for (let t = 0; t < s.length; t += 1) {
    let r = s.charCodeAt(t);
    if (r > 55295 && r <= 56319) {
      const i = ((r - 55296) * 1024) & 65535;
      ((r = (((s.charCodeAt(t + 1) - 56320) & 65535) | i) + 65536), (t += 1));
    }
    yl(r, e);
  }
}
function bl(s, e, t) {
  if (e.utf8seq === 0) {
    if (s <= 127) {
      t(s);
      return;
    }
    for (let r = 1; r < 6; r += 1)
      if (((s >> (7 - r)) & 1) === 0) {
        e.utf8seq = r;
        break;
      }
    if (e.utf8seq === 2) e.codepoint = s & 31;
    else if (e.utf8seq === 3) e.codepoint = s & 15;
    else if (e.utf8seq === 4) e.codepoint = s & 7;
    else throw new Error("Invalid UTF-8 sequence");
    e.utf8seq -= 1;
  } else if (e.utf8seq > 0) {
    if (s <= 127) throw new Error("Invalid UTF-8 sequence");
    ((e.codepoint = (e.codepoint << 6) | (s & 63)),
      (e.utf8seq -= 1),
      e.utf8seq === 0 && t(e.codepoint));
  }
}
function wl(s) {
  const e = [],
    t = { queue: 0, queuedBits: 0 },
    r = (i) => {
      e.push(i);
    };
  for (let i = 0; i < s.length; i += 1) gn(s.charCodeAt(i), t, r);
  return new Uint8Array(e);
}
function _l(s) {
  const e = [];
  return (vl(s, (t) => e.push(t)), new Uint8Array(e));
}
function xl(s) {
  const e = [],
    t = { queue: 0, queuedBits: 0 },
    r = (i) => {
      e.push(i);
    };
  return (s.forEach((i) => Ti(i, t, r)), Ti(null, t, r), e.join(""));
}
function Sl(s) {
  return Math.round(Date.now() / 1e3) + s;
}
function Cl() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (s) {
    const e = (Math.random() * 16) | 0;
    return (s == "x" ? e : (e & 3) | 8).toString(16);
  });
}
const Ye = () => typeof window < "u" && typeof document < "u",
  xt = { tested: !1, writable: !1 },
  fr = () => {
    if (!Ye()) return !1;
    try {
      if (typeof globalThis.localStorage != "object") return !1;
    } catch {
      return !1;
    }
    if (xt.tested) return xt.writable;
    const s = `lswt-${Math.random()}${Math.random()}`;
    try {
      (globalThis.localStorage.setItem(s, s),
        globalThis.localStorage.removeItem(s),
        (xt.tested = !0),
        (xt.writable = !0));
    } catch {
      ((xt.tested = !0), (xt.writable = !1));
    }
    return xt.writable;
  };
function kl(s) {
  const e = {},
    t = new URL(s);
  if (t.hash && t.hash[0] === "#")
    try {
      new URLSearchParams(t.hash.substring(1)).forEach((i, n) => {
        e[n] = i;
      });
    } catch {}
  return (
    t.searchParams.forEach((r, i) => {
      e[i] = r;
    }),
    e
  );
}
const yn = (s) => {
    let e;
    return (
      s
        ? (e = s)
        : typeof fetch > "u"
          ? (e = (...t) =>
              ze(
                async () => {
                  const { default: r } = await Promise.resolve().then(() => er);
                  return { default: r };
                },
                void 0,
              ).then(({ default: r }) => r(...t)))
          : (e = fetch),
      (...t) => e(...t)
    );
  },
  Tl = (s) =>
    typeof s == "object" &&
    s !== null &&
    "status" in s &&
    "ok" in s &&
    "json" in s &&
    typeof s.json == "function",
  vn = async (s, e, t) => {
    await s.setItem(e, JSON.stringify(t));
  },
  Ar = async (s, e) => {
    const t = await s.getItem(e);
    if (!t) return null;
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
  },
  Dr = async (s, e) => {
    await s.removeItem(e);
  };
class Fr {
  constructor() {
    this.promise = new Fr.promiseConstructor((e, t) => {
      ((this.resolve = e), (this.reject = t));
    });
  }
}
Fr.promiseConstructor = Promise;
function ns(s) {
  const e = s.split(".");
  if (e.length !== 3) throw new mr("Invalid JWT structure");
  for (let r = 0; r < e.length; r++)
    if (!dl.test(e[r])) throw new mr("JWT not in base64url format");
  return {
    header: JSON.parse(Ei(e[0])),
    payload: JSON.parse(Ei(e[1])),
    signature: wl(e[2]),
    raw: { header: e[0], payload: e[1] },
  };
}
async function El(s) {
  return await new Promise((e) => {
    setTimeout(() => e(null), s);
  });
}
function Il(s, e) {
  return new Promise((r, i) => {
    (async () => {
      for (let n = 0; n < 1 / 0; n++)
        try {
          const o = await s(n);
          if (!e(n, null, o)) {
            r(o);
            return;
          }
        } catch (o) {
          if (!e(n, o)) {
            i(o);
            return;
          }
        }
    })();
  });
}
function Ol(s) {
  return ("0" + s.toString(16)).substr(-2);
}
function Pl() {
  const e = new Uint32Array(56);
  if (typeof crypto > "u") {
    const t =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",
      r = t.length;
    let i = "";
    for (let n = 0; n < 56; n++) i += t.charAt(Math.floor(Math.random() * r));
    return i;
  }
  return (crypto.getRandomValues(e), Array.from(e, Ol).join(""));
}
async function jl(s) {
  const t = new TextEncoder().encode(s),
    r = await crypto.subtle.digest("SHA-256", t),
    i = new Uint8Array(r);
  return Array.from(i)
    .map((n) => String.fromCharCode(n))
    .join("");
}
async function Nl(s) {
  if (
    !(
      typeof crypto < "u" &&
      typeof crypto.subtle < "u" &&
      typeof TextEncoder < "u"
    )
  )
    return (
      console.warn(
        "WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.",
      ),
      s
    );
  const t = await jl(s);
  return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function Mt(s, e, t = !1) {
  const r = Pl();
  let i = r;
  (t && (i += "/PASSWORD_RECOVERY"), await vn(s, `${e}-code-verifier`, i));
  const n = await Nl(r);
  return [n, r === n ? "plain" : "s256"];
}
const Al = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function Dl(s) {
  const e = s.headers.get(ys);
  if (!e || !e.match(Al)) return null;
  try {
    return new Date(`${e}T00:00:00.0Z`);
  } catch {
    return null;
  }
}
function Rl(s) {
  if (!s) throw new Error("Missing exp claim");
  const e = Math.floor(Date.now() / 1e3);
  if (s <= e) throw new Error("JWT has expired");
}
function $l(s) {
  switch (s) {
    case "RS256":
      return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
    case "ES256":
      return { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } };
    default:
      throw new Error("Invalid alg claim");
  }
}
const Ml = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function Lt(s) {
  if (!Ml.test(s))
    throw new Error(
      "@supabase/auth-js: Expected parameter to be UUID but is not",
    );
}
var Ll = function (s, e) {
  var t = {};
  for (var r in s)
    Object.prototype.hasOwnProperty.call(s, r) &&
      e.indexOf(r) < 0 &&
      (t[r] = s[r]);
  if (s != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(s); i < r.length; i++)
      e.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, r[i]) &&
        (t[r[i]] = s[r[i]]);
  return t;
};
const Ct = (s) =>
    s.msg || s.message || s.error_description || s.error || JSON.stringify(s),
  Fl = [502, 503, 504];
async function Ii(s) {
  var e;
  if (!Tl(s)) throw new vs(Ct(s), 0);
  if (Fl.includes(s.status)) throw new vs(Ct(s), s.status);
  let t;
  try {
    t = await s.json();
  } catch (n) {
    throw new pn(Ct(n), n);
  }
  let r;
  const i = Dl(s);
  if (
    (i &&
    i.getTime() >= fn["2024-01-01"].timestamp &&
    typeof t == "object" &&
    t &&
    typeof t.code == "string"
      ? (r = t.code)
      : typeof t == "object" &&
        t &&
        typeof t.error_code == "string" &&
        (r = t.error_code),
    r)
  ) {
    if (r === "weak_password")
      throw new Ci(
        Ct(t),
        s.status,
        ((e = t.weak_password) === null || e === void 0 ? void 0 : e.reasons) ||
          [],
      );
    if (r === "session_not_found") throw new ft();
  } else if (
    typeof t == "object" &&
    t &&
    typeof t.weak_password == "object" &&
    t.weak_password &&
    Array.isArray(t.weak_password.reasons) &&
    t.weak_password.reasons.length &&
    t.weak_password.reasons.reduce((n, o) => n && typeof o == "string", !0)
  )
    throw new Ci(Ct(t), s.status, t.weak_password.reasons);
  throw new hl(Ct(t), s.status || 500, r);
}
const Ul = (s, e, t, r) => {
  const i = { method: s, headers: (e == null ? void 0 : e.headers) || {} };
  return s === "GET"
    ? i
    : ((i.headers = Object.assign(
        { "Content-Type": "application/json;charset=UTF-8" },
        e == null ? void 0 : e.headers,
      )),
      (i.body = JSON.stringify(r)),
      Object.assign(Object.assign({}, i), t));
};
async function ae(s, e, t, r) {
  var i;
  const n = Object.assign({}, r == null ? void 0 : r.headers);
  (n[ys] || (n[ys] = fn["2024-01-01"].name),
    r != null && r.jwt && (n.Authorization = `Bearer ${r.jwt}`));
  const o =
    (i = r == null ? void 0 : r.query) !== null && i !== void 0 ? i : {};
  r != null && r.redirectTo && (o.redirect_to = r.redirectTo);
  const a = Object.keys(o).length
      ? "?" + new URLSearchParams(o).toString()
      : "",
    c = await Bl(
      s,
      e,
      t + a,
      { headers: n, noResolveJson: r == null ? void 0 : r.noResolveJson },
      {},
      r == null ? void 0 : r.body,
    );
  return r != null && r.xform
    ? r == null
      ? void 0
      : r.xform(c)
    : { data: Object.assign({}, c), error: null };
}
async function Bl(s, e, t, r, i, n) {
  const o = Ul(e, r, i, n);
  let a;
  try {
    a = await s(t, Object.assign({}, o));
  } catch (c) {
    throw (console.error(c), new vs(Ct(c), 0));
  }
  if ((a.ok || (await Ii(a)), r != null && r.noResolveJson)) return a;
  try {
    return await a.json();
  } catch (c) {
    await Ii(c);
  }
}
function ut(s) {
  var e;
  let t = null;
  zl(s) &&
    ((t = Object.assign({}, s)),
    s.expires_at || (t.expires_at = Sl(s.expires_in)));
  const r = (e = s.user) !== null && e !== void 0 ? e : s;
  return { data: { session: t, user: r }, error: null };
}
function Oi(s) {
  const e = ut(s);
  return (
    !e.error &&
      s.weak_password &&
      typeof s.weak_password == "object" &&
      Array.isArray(s.weak_password.reasons) &&
      s.weak_password.reasons.length &&
      s.weak_password.message &&
      typeof s.weak_password.message == "string" &&
      s.weak_password.reasons.reduce((t, r) => t && typeof r == "string", !0) &&
      (e.data.weak_password = s.weak_password),
    e
  );
}
function gt(s) {
  var e;
  return {
    data: { user: (e = s.user) !== null && e !== void 0 ? e : s },
    error: null,
  };
}
function ql(s) {
  return { data: s, error: null };
}
function Vl(s) {
  const {
      action_link: e,
      email_otp: t,
      hashed_token: r,
      redirect_to: i,
      verification_type: n,
    } = s,
    o = Ll(s, [
      "action_link",
      "email_otp",
      "hashed_token",
      "redirect_to",
      "verification_type",
    ]),
    a = {
      action_link: e,
      email_otp: t,
      hashed_token: r,
      redirect_to: i,
      verification_type: n,
    },
    c = Object.assign({}, o);
  return { data: { properties: a, user: c }, error: null };
}
function Hl(s) {
  return s;
}
function zl(s) {
  return s.access_token && s.refresh_token && s.expires_in;
}
const os = ["global", "local", "others"];
var Gl = function (s, e) {
  var t = {};
  for (var r in s)
    Object.prototype.hasOwnProperty.call(s, r) &&
      e.indexOf(r) < 0 &&
      (t[r] = s[r]);
  if (s != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(s); i < r.length; i++)
      e.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, r[i]) &&
        (t[r[i]] = s[r[i]]);
  return t;
};
class Wl {
  constructor({ url: e = "", headers: t = {}, fetch: r }) {
    ((this.url = e),
      (this.headers = t),
      (this.fetch = yn(r)),
      (this.mfa = {
        listFactors: this._listFactors.bind(this),
        deleteFactor: this._deleteFactor.bind(this),
      }));
  }
  async signOut(e, t = os[0]) {
    if (os.indexOf(t) < 0)
      throw new Error(
        `@supabase/auth-js: Parameter scope must be one of ${os.join(", ")}`,
      );
    try {
      return (
        await ae(this.fetch, "POST", `${this.url}/logout?scope=${t}`, {
          headers: this.headers,
          jwt: e,
          noResolveJson: !0,
        }),
        { data: null, error: null }
      );
    } catch (r) {
      if (re(r)) return { data: null, error: r };
      throw r;
    }
  }
  async inviteUserByEmail(e, t = {}) {
    try {
      return await ae(this.fetch, "POST", `${this.url}/invite`, {
        body: { email: e, data: t.data },
        headers: this.headers,
        redirectTo: t.redirectTo,
        xform: gt,
      });
    } catch (r) {
      if (re(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async generateLink(e) {
    try {
      const { options: t } = e,
        r = Gl(e, ["options"]),
        i = Object.assign(Object.assign({}, r), t);
      return (
        "newEmail" in r &&
          ((i.new_email = r == null ? void 0 : r.newEmail), delete i.newEmail),
        await ae(this.fetch, "POST", `${this.url}/admin/generate_link`, {
          body: i,
          headers: this.headers,
          xform: Vl,
          redirectTo: t == null ? void 0 : t.redirectTo,
        })
      );
    } catch (t) {
      if (re(t)) return { data: { properties: null, user: null }, error: t };
      throw t;
    }
  }
  async createUser(e) {
    try {
      return await ae(this.fetch, "POST", `${this.url}/admin/users`, {
        body: e,
        headers: this.headers,
        xform: gt,
      });
    } catch (t) {
      if (re(t)) return { data: { user: null }, error: t };
      throw t;
    }
  }
  async listUsers(e) {
    var t, r, i, n, o, a, c;
    try {
      const u = { nextPage: null, lastPage: 0, total: 0 },
        h = await ae(this.fetch, "GET", `${this.url}/admin/users`, {
          headers: this.headers,
          noResolveJson: !0,
          query: {
            page:
              (r =
                (t = e == null ? void 0 : e.page) === null || t === void 0
                  ? void 0
                  : t.toString()) !== null && r !== void 0
                ? r
                : "",
            per_page:
              (n =
                (i = e == null ? void 0 : e.perPage) === null || i === void 0
                  ? void 0
                  : i.toString()) !== null && n !== void 0
                ? n
                : "",
          },
          xform: Hl,
        });
      if (h.error) throw h.error;
      const p = await h.json(),
        y =
          (o = h.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0,
        b =
          (c =
            (a = h.headers.get("link")) === null || a === void 0
              ? void 0
              : a.split(",")) !== null && c !== void 0
            ? c
            : [];
      return (
        b.length > 0 &&
          (b.forEach((k) => {
            const I = parseInt(k.split(";")[0].split("=")[1].substring(0, 1)),
              P = JSON.parse(k.split(";")[1].split("=")[1]);
            u[`${P}Page`] = I;
          }),
          (u.total = parseInt(y))),
        { data: Object.assign(Object.assign({}, p), u), error: null }
      );
    } catch (u) {
      if (re(u)) return { data: { users: [] }, error: u };
      throw u;
    }
  }
  async getUserById(e) {
    Lt(e);
    try {
      return await ae(this.fetch, "GET", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        xform: gt,
      });
    } catch (t) {
      if (re(t)) return { data: { user: null }, error: t };
      throw t;
    }
  }
  async updateUserById(e, t) {
    Lt(e);
    try {
      return await ae(this.fetch, "PUT", `${this.url}/admin/users/${e}`, {
        body: t,
        headers: this.headers,
        xform: gt,
      });
    } catch (r) {
      if (re(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async deleteUser(e, t = !1) {
    Lt(e);
    try {
      return await ae(this.fetch, "DELETE", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        body: { should_soft_delete: t },
        xform: gt,
      });
    } catch (r) {
      if (re(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async _listFactors(e) {
    Lt(e.userId);
    try {
      const { data: t, error: r } = await ae(
        this.fetch,
        "GET",
        `${this.url}/admin/users/${e.userId}/factors`,
        {
          headers: this.headers,
          xform: (i) => ({ data: { factors: i }, error: null }),
        },
      );
      return { data: t, error: r };
    } catch (t) {
      if (re(t)) return { data: null, error: t };
      throw t;
    }
  }
  async _deleteFactor(e) {
    (Lt(e.userId), Lt(e.id));
    try {
      return {
        data: await ae(
          this.fetch,
          "DELETE",
          `${this.url}/admin/users/${e.userId}/factors/${e.id}`,
          { headers: this.headers },
        ),
        error: null,
      };
    } catch (t) {
      if (re(t)) return { data: null, error: t };
      throw t;
    }
  }
}
const Kl = {
  getItem: (s) => (fr() ? globalThis.localStorage.getItem(s) : null),
  setItem: (s, e) => {
    fr() && globalThis.localStorage.setItem(s, e);
  },
  removeItem: (s) => {
    fr() && globalThis.localStorage.removeItem(s);
  },
};
function Pi(s = {}) {
  return {
    getItem: (e) => s[e] || null,
    setItem: (e, t) => {
      s[e] = t;
    },
    removeItem: (e) => {
      delete s[e];
    },
  };
}
function Jl() {
  if (typeof globalThis != "object")
    try {
      (Object.defineProperty(Object.prototype, "__magic__", {
        get: function () {
          return this;
        },
        configurable: !0,
      }),
        (__magic__.globalThis = __magic__),
        delete Object.prototype.__magic__);
    } catch {
      typeof self < "u" && (self.globalThis = self);
    }
}
const Ft = {
  debug: !!(
    globalThis &&
    fr() &&
    globalThis.localStorage &&
    globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true"
  ),
};
class bn extends Error {
  constructor(e) {
    (super(e), (this.isAcquireTimeout = !0));
  }
}
class Ql extends bn {}
async function Yl(s, e, t) {
  Ft.debug &&
    console.log("@supabase/gotrue-js: navigatorLock: acquire lock", s, e);
  const r = new globalThis.AbortController();
  return (
    e > 0 &&
      setTimeout(() => {
        (r.abort(),
          Ft.debug &&
            console.log(
              "@supabase/gotrue-js: navigatorLock acquire timed out",
              s,
            ));
      }, e),
    await Promise.resolve().then(() =>
      globalThis.navigator.locks.request(
        s,
        e === 0
          ? { mode: "exclusive", ifAvailable: !0 }
          : { mode: "exclusive", signal: r.signal },
        async (i) => {
          if (i) {
            Ft.debug &&
              console.log(
                "@supabase/gotrue-js: navigatorLock: acquired",
                s,
                i.name,
              );
            try {
              return await t();
            } finally {
              Ft.debug &&
                console.log(
                  "@supabase/gotrue-js: navigatorLock: released",
                  s,
                  i.name,
                );
            }
          } else {
            if (e === 0)
              throw (
                Ft.debug &&
                  console.log(
                    "@supabase/gotrue-js: navigatorLock: not immediately available",
                    s,
                  ),
                new Ql(
                  `Acquiring an exclusive Navigator LockManager lock "${s}" immediately failed`,
                )
              );
            if (Ft.debug)
              try {
                const n = await globalThis.navigator.locks.query();
                console.log(
                  "@supabase/gotrue-js: Navigator LockManager state",
                  JSON.stringify(n, null, "  "),
                );
              } catch (n) {
                console.warn(
                  "@supabase/gotrue-js: Error when querying Navigator LockManager state",
                  n,
                );
              }
            return (
              console.warn(
                "@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request",
              ),
              await t()
            );
          }
        },
      ),
    )
  );
}
Jl();
const Xl = {
  url: al,
  storageKey: ll,
  autoRefreshToken: !0,
  persistSession: !0,
  detectSessionInUrl: !0,
  headers: cl,
  flowType: "implicit",
  debug: !1,
  hasCustomAuthorizationHeader: !1,
};
async function ji(s, e, t) {
  return await t();
}
class pr {
  constructor(e) {
    var t, r;
    ((this.memoryStorage = null),
      (this.stateChangeEmitters = new Map()),
      (this.autoRefreshTicker = null),
      (this.visibilityChangedCallback = null),
      (this.refreshingDeferred = null),
      (this.initializePromise = null),
      (this.detectSessionInUrl = !0),
      (this.hasCustomAuthorizationHeader = !1),
      (this.suppressGetSessionWarning = !1),
      (this.lockAcquired = !1),
      (this.pendingInLock = []),
      (this.broadcastChannel = null),
      (this.logger = console.log),
      (this.instanceID = pr.nextInstanceID),
      (pr.nextInstanceID += 1),
      this.instanceID > 0 &&
        Ye() &&
        console.warn(
          "Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.",
        ));
    const i = Object.assign(Object.assign({}, Xl), e);
    if (
      ((this.logDebugMessages = !!i.debug),
      typeof i.debug == "function" && (this.logger = i.debug),
      (this.persistSession = i.persistSession),
      (this.storageKey = i.storageKey),
      (this.autoRefreshToken = i.autoRefreshToken),
      (this.admin = new Wl({ url: i.url, headers: i.headers, fetch: i.fetch })),
      (this.url = i.url),
      (this.headers = i.headers),
      (this.fetch = yn(i.fetch)),
      (this.lock = i.lock || ji),
      (this.detectSessionInUrl = i.detectSessionInUrl),
      (this.flowType = i.flowType),
      (this.hasCustomAuthorizationHeader = i.hasCustomAuthorizationHeader),
      i.lock
        ? (this.lock = i.lock)
        : Ye() &&
            !(
              (t = globalThis == null ? void 0 : globalThis.navigator) ===
                null || t === void 0
            ) &&
            t.locks
          ? (this.lock = Yl)
          : (this.lock = ji),
      (this.jwks = { keys: [] }),
      (this.jwks_cached_at = Number.MIN_SAFE_INTEGER),
      (this.mfa = {
        verify: this._verify.bind(this),
        enroll: this._enroll.bind(this),
        unenroll: this._unenroll.bind(this),
        challenge: this._challenge.bind(this),
        listFactors: this._listFactors.bind(this),
        challengeAndVerify: this._challengeAndVerify.bind(this),
        getAuthenticatorAssuranceLevel:
          this._getAuthenticatorAssuranceLevel.bind(this),
      }),
      this.persistSession
        ? i.storage
          ? (this.storage = i.storage)
          : fr()
            ? (this.storage = Kl)
            : ((this.memoryStorage = {}),
              (this.storage = Pi(this.memoryStorage)))
        : ((this.memoryStorage = {}), (this.storage = Pi(this.memoryStorage))),
      Ye() &&
        globalThis.BroadcastChannel &&
        this.persistSession &&
        this.storageKey)
    ) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(
          this.storageKey,
        );
      } catch (n) {
        console.error(
          "Failed to create a new BroadcastChannel, multi-tab state changes will not be available",
          n,
        );
      }
      (r = this.broadcastChannel) === null ||
        r === void 0 ||
        r.addEventListener("message", async (n) => {
          (this._debug(
            "received broadcast notification from other tab or client",
            n,
          ),
            await this._notifyAllSubscribers(n.data.event, n.data.session, !1));
        });
    }
    this.initialize();
  }
  _debug(...e) {
    return (
      this.logDebugMessages &&
        this.logger(
          `GoTrueClient@${this.instanceID} (${mn}) ${new Date().toISOString()}`,
          ...e,
        ),
      this
    );
  }
  async initialize() {
    return this.initializePromise
      ? await this.initializePromise
      : ((this.initializePromise = (async () =>
          await this._acquireLock(-1, async () => await this._initialize()))()),
        await this.initializePromise);
  }
  async _initialize() {
    var e;
    try {
      const t = kl(window.location.href);
      let r = "none";
      if (
        (this._isImplicitGrantCallback(t)
          ? (r = "implicit")
          : (await this._isPKCECallback(t)) && (r = "pkce"),
        Ye() && this.detectSessionInUrl && r !== "none")
      ) {
        const { data: i, error: n } = await this._getSessionFromURL(t, r);
        if (n) {
          if (
            (this._debug(
              "#_initialize()",
              "error detecting session from URL",
              n,
            ),
            pl(n))
          ) {
            const c =
              (e = n.details) === null || e === void 0 ? void 0 : e.code;
            if (
              c === "identity_already_exists" ||
              c === "identity_not_found" ||
              c === "single_identity_not_deletable"
            )
              return { error: n };
          }
          return (await this._removeSession(), { error: n });
        }
        const { session: o, redirectType: a } = i;
        return (
          this._debug(
            "#_initialize()",
            "detected session in URL",
            o,
            "redirect type",
            a,
          ),
          await this._saveSession(o),
          setTimeout(async () => {
            a === "recovery"
              ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", o)
              : await this._notifyAllSubscribers("SIGNED_IN", o);
          }, 0),
          { error: null }
        );
      }
      return (await this._recoverAndRefresh(), { error: null });
    } catch (t) {
      return re(t)
        ? { error: t }
        : { error: new pn("Unexpected error during initialization", t) };
    } finally {
      (await this._handleVisibilityChange(),
        this._debug("#_initialize()", "end"));
    }
  }
  async signInAnonymously(e) {
    var t, r, i;
    try {
      const n = await ae(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            data:
              (r =
                (t = e == null ? void 0 : e.options) === null || t === void 0
                  ? void 0
                  : t.data) !== null && r !== void 0
                ? r
                : {},
            gotrue_meta_security: {
              captcha_token:
                (i = e == null ? void 0 : e.options) === null || i === void 0
                  ? void 0
                  : i.captchaToken,
            },
          },
          xform: ut,
        }),
        { data: o, error: a } = n;
      if (a || !o) return { data: { user: null, session: null }, error: a };
      const c = o.session,
        u = o.user;
      return (
        o.session &&
          (await this._saveSession(o.session),
          await this._notifyAllSubscribers("SIGNED_IN", c)),
        { data: { user: u, session: c }, error: null }
      );
    } catch (n) {
      if (re(n)) return { data: { user: null, session: null }, error: n };
      throw n;
    }
  }
  async signUp(e) {
    var t, r, i;
    try {
      let n;
      if ("email" in e) {
        const { email: h, password: p, options: y } = e;
        let b = null,
          k = null;
        (this.flowType === "pkce" &&
          ([b, k] = await Mt(this.storage, this.storageKey)),
          (n = await ae(this.fetch, "POST", `${this.url}/signup`, {
            headers: this.headers,
            redirectTo: y == null ? void 0 : y.emailRedirectTo,
            body: {
              email: h,
              password: p,
              data:
                (t = y == null ? void 0 : y.data) !== null && t !== void 0
                  ? t
                  : {},
              gotrue_meta_security: {
                captcha_token: y == null ? void 0 : y.captchaToken,
              },
              code_challenge: b,
              code_challenge_method: k,
            },
            xform: ut,
          })));
      } else if ("phone" in e) {
        const { phone: h, password: p, options: y } = e;
        n = await ae(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone: h,
            password: p,
            data:
              (r = y == null ? void 0 : y.data) !== null && r !== void 0
                ? r
                : {},
            channel:
              (i = y == null ? void 0 : y.channel) !== null && i !== void 0
                ? i
                : "sms",
            gotrue_meta_security: {
              captcha_token: y == null ? void 0 : y.captchaToken,
            },
          },
          xform: ut,
        });
      } else
        throw new jr(
          "You must provide either an email or phone number and a password",
        );
      const { data: o, error: a } = n;
      if (a || !o) return { data: { user: null, session: null }, error: a };
      const c = o.session,
        u = o.user;
      return (
        o.session &&
          (await this._saveSession(o.session),
          await this._notifyAllSubscribers("SIGNED_IN", c)),
        { data: { user: u, session: c }, error: null }
      );
    } catch (n) {
      if (re(n)) return { data: { user: null, session: null }, error: n };
      throw n;
    }
  }
  async signInWithPassword(e) {
    try {
      let t;
      if ("email" in e) {
        const { email: n, password: o, options: a } = e;
        t = await ae(
          this.fetch,
          "POST",
          `${this.url}/token?grant_type=password`,
          {
            headers: this.headers,
            body: {
              email: n,
              password: o,
              gotrue_meta_security: {
                captcha_token: a == null ? void 0 : a.captchaToken,
              },
            },
            xform: Oi,
          },
        );
      } else if ("phone" in e) {
        const { phone: n, password: o, options: a } = e;
        t = await ae(
          this.fetch,
          "POST",
          `${this.url}/token?grant_type=password`,
          {
            headers: this.headers,
            body: {
              phone: n,
              password: o,
              gotrue_meta_security: {
                captcha_token: a == null ? void 0 : a.captchaToken,
              },
            },
            xform: Oi,
          },
        );
      } else
        throw new jr(
          "You must provide either an email or phone number and a password",
        );
      const { data: r, error: i } = t;
      return i
        ? { data: { user: null, session: null }, error: i }
        : !r || !r.session || !r.user
          ? { data: { user: null, session: null }, error: new Pr() }
          : (r.session &&
              (await this._saveSession(r.session),
              await this._notifyAllSubscribers("SIGNED_IN", r.session)),
            {
              data: Object.assign(
                { user: r.user, session: r.session },
                r.weak_password ? { weakPassword: r.weak_password } : null,
              ),
              error: i,
            });
    } catch (t) {
      if (re(t)) return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  async signInWithOAuth(e) {
    var t, r, i, n;
    return await this._handleProviderSignIn(e.provider, {
      redirectTo:
        (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo,
      scopes: (r = e.options) === null || r === void 0 ? void 0 : r.scopes,
      queryParams:
        (i = e.options) === null || i === void 0 ? void 0 : i.queryParams,
      skipBrowserRedirect:
        (n = e.options) === null || n === void 0
          ? void 0
          : n.skipBrowserRedirect,
    });
  }
  async exchangeCodeForSession(e) {
    return (
      await this.initializePromise,
      this._acquireLock(-1, async () => this._exchangeCodeForSession(e))
    );
  }
  async signInWithWeb3(e) {
    const { chain: t } = e;
    if (t === "solana") return await this.signInWithSolana(e);
    throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`);
  }
  async signInWithSolana(e) {
    var t, r, i, n, o, a, c, u, h, p, y, b;
    let k, I;
    if ("message" in e) ((k = e.message), (I = e.signature));
    else {
      const { chain: P, wallet: L, statement: G, options: O } = e;
      let A;
      if (Ye())
        if (typeof L == "object") A = L;
        else {
          const J = window;
          if (
            "solana" in J &&
            typeof J.solana == "object" &&
            (("signIn" in J.solana && typeof J.solana.signIn == "function") ||
              ("signMessage" in J.solana &&
                typeof J.solana.signMessage == "function"))
          )
            A = J.solana;
          else
            throw new Error(
              "@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.",
            );
        }
      else {
        if (typeof L != "object" || !(O != null && O.url))
          throw new Error(
            "@supabase/auth-js: Both wallet and url must be specified in non-browser environments.",
          );
        A = L;
      }
      const H = new URL(
        (t = O == null ? void 0 : O.url) !== null && t !== void 0
          ? t
          : window.location.href,
      );
      if ("signIn" in A && A.signIn) {
        const J = await A.signIn(
          Object.assign(
            Object.assign(
              Object.assign(
                { issuedAt: new Date().toISOString() },
                O == null ? void 0 : O.signInWithSolana,
              ),
              { version: "1", domain: H.host, uri: H.href },
            ),
            G ? { statement: G } : null,
          ),
        );
        let te;
        if (Array.isArray(J) && J[0] && typeof J[0] == "object") te = J[0];
        else if (
          J &&
          typeof J == "object" &&
          "signedMessage" in J &&
          "signature" in J
        )
          te = J;
        else
          throw new Error(
            "@supabase/auth-js: Wallet method signIn() returned unrecognized value",
          );
        if (
          "signedMessage" in te &&
          "signature" in te &&
          (typeof te.signedMessage == "string" ||
            te.signedMessage instanceof Uint8Array) &&
          te.signature instanceof Uint8Array
        )
          ((k =
            typeof te.signedMessage == "string"
              ? te.signedMessage
              : new TextDecoder().decode(te.signedMessage)),
            (I = te.signature));
        else
          throw new Error(
            "@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields",
          );
      } else {
        if (
          !("signMessage" in A) ||
          typeof A.signMessage != "function" ||
          !("publicKey" in A) ||
          typeof A != "object" ||
          !A.publicKey ||
          !("toBase58" in A.publicKey) ||
          typeof A.publicKey.toBase58 != "function"
        )
          throw new Error(
            "@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API",
          );
        k = [
          `${H.host} wants you to sign in with your Solana account:`,
          A.publicKey.toBase58(),
          ...(G ? ["", G, ""] : [""]),
          "Version: 1",
          `URI: ${H.href}`,
          `Issued At: ${(i = (r = O == null ? void 0 : O.signInWithSolana) === null || r === void 0 ? void 0 : r.issuedAt) !== null && i !== void 0 ? i : new Date().toISOString()}`,
          ...(!(
            (n = O == null ? void 0 : O.signInWithSolana) === null ||
            n === void 0
          ) && n.notBefore
            ? [`Not Before: ${O.signInWithSolana.notBefore}`]
            : []),
          ...(!(
            (o = O == null ? void 0 : O.signInWithSolana) === null ||
            o === void 0
          ) && o.expirationTime
            ? [`Expiration Time: ${O.signInWithSolana.expirationTime}`]
            : []),
          ...(!(
            (a = O == null ? void 0 : O.signInWithSolana) === null ||
            a === void 0
          ) && a.chainId
            ? [`Chain ID: ${O.signInWithSolana.chainId}`]
            : []),
          ...(!(
            (c = O == null ? void 0 : O.signInWithSolana) === null ||
            c === void 0
          ) && c.nonce
            ? [`Nonce: ${O.signInWithSolana.nonce}`]
            : []),
          ...(!(
            (u = O == null ? void 0 : O.signInWithSolana) === null ||
            u === void 0
          ) && u.requestId
            ? [`Request ID: ${O.signInWithSolana.requestId}`]
            : []),
          ...(!(
            (p =
              (h = O == null ? void 0 : O.signInWithSolana) === null ||
              h === void 0
                ? void 0
                : h.resources) === null || p === void 0
          ) && p.length
            ? [
                "Resources",
                ...O.signInWithSolana.resources.map((te) => `- ${te}`),
              ]
            : []),
        ].join(`
`);
        const J = await A.signMessage(new TextEncoder().encode(k), "utf8");
        if (!J || !(J instanceof Uint8Array))
          throw new Error(
            "@supabase/auth-js: Wallet signMessage() API returned an recognized value",
          );
        I = J;
      }
    }
    try {
      const { data: P, error: L } = await ae(
        this.fetch,
        "POST",
        `${this.url}/token?grant_type=web3`,
        {
          headers: this.headers,
          body: Object.assign(
            { chain: "solana", message: k, signature: xl(I) },
            !((y = e.options) === null || y === void 0) && y.captchaToken
              ? {
                  gotrue_meta_security: {
                    captcha_token:
                      (b = e.options) === null || b === void 0
                        ? void 0
                        : b.captchaToken,
                  },
                }
              : null,
          ),
          xform: ut,
        },
      );
      if (L) throw L;
      return !P || !P.session || !P.user
        ? { data: { user: null, session: null }, error: new Pr() }
        : (P.session &&
            (await this._saveSession(P.session),
            await this._notifyAllSubscribers("SIGNED_IN", P.session)),
          { data: Object.assign({}, P), error: L });
    } catch (P) {
      if (re(P)) return { data: { user: null, session: null }, error: P };
      throw P;
    }
  }
  async _exchangeCodeForSession(e) {
    const t = await Ar(this.storage, `${this.storageKey}-code-verifier`),
      [r, i] = (t ?? "").split("/");
    try {
      const { data: n, error: o } = await ae(
        this.fetch,
        "POST",
        `${this.url}/token?grant_type=pkce`,
        {
          headers: this.headers,
          body: { auth_code: e, code_verifier: r },
          xform: ut,
        },
      );
      if ((await Dr(this.storage, `${this.storageKey}-code-verifier`), o))
        throw o;
      return !n || !n.session || !n.user
        ? {
            data: { user: null, session: null, redirectType: null },
            error: new Pr(),
          }
        : (n.session &&
            (await this._saveSession(n.session),
            await this._notifyAllSubscribers("SIGNED_IN", n.session)),
          {
            data: Object.assign(Object.assign({}, n), {
              redirectType: i ?? null,
            }),
            error: o,
          });
    } catch (n) {
      if (re(n))
        return {
          data: { user: null, session: null, redirectType: null },
          error: n,
        };
      throw n;
    }
  }
  async signInWithIdToken(e) {
    try {
      const {
          options: t,
          provider: r,
          token: i,
          access_token: n,
          nonce: o,
        } = e,
        a = await ae(
          this.fetch,
          "POST",
          `${this.url}/token?grant_type=id_token`,
          {
            headers: this.headers,
            body: {
              provider: r,
              id_token: i,
              access_token: n,
              nonce: o,
              gotrue_meta_security: {
                captcha_token: t == null ? void 0 : t.captchaToken,
              },
            },
            xform: ut,
          },
        ),
        { data: c, error: u } = a;
      return u
        ? { data: { user: null, session: null }, error: u }
        : !c || !c.session || !c.user
          ? { data: { user: null, session: null }, error: new Pr() }
          : (c.session &&
              (await this._saveSession(c.session),
              await this._notifyAllSubscribers("SIGNED_IN", c.session)),
            { data: c, error: u });
    } catch (t) {
      if (re(t)) return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  async signInWithOtp(e) {
    var t, r, i, n, o;
    try {
      if ("email" in e) {
        const { email: a, options: c } = e;
        let u = null,
          h = null;
        this.flowType === "pkce" &&
          ([u, h] = await Mt(this.storage, this.storageKey));
        const { error: p } = await ae(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            email: a,
            data:
              (t = c == null ? void 0 : c.data) !== null && t !== void 0
                ? t
                : {},
            create_user:
              (r = c == null ? void 0 : c.shouldCreateUser) !== null &&
              r !== void 0
                ? r
                : !0,
            gotrue_meta_security: {
              captcha_token: c == null ? void 0 : c.captchaToken,
            },
            code_challenge: u,
            code_challenge_method: h,
          },
          redirectTo: c == null ? void 0 : c.emailRedirectTo,
        });
        return { data: { user: null, session: null }, error: p };
      }
      if ("phone" in e) {
        const { phone: a, options: c } = e,
          { data: u, error: h } = await ae(
            this.fetch,
            "POST",
            `${this.url}/otp`,
            {
              headers: this.headers,
              body: {
                phone: a,
                data:
                  (i = c == null ? void 0 : c.data) !== null && i !== void 0
                    ? i
                    : {},
                create_user:
                  (n = c == null ? void 0 : c.shouldCreateUser) !== null &&
                  n !== void 0
                    ? n
                    : !0,
                gotrue_meta_security: {
                  captcha_token: c == null ? void 0 : c.captchaToken,
                },
                channel:
                  (o = c == null ? void 0 : c.channel) !== null && o !== void 0
                    ? o
                    : "sms",
              },
            },
          );
        return {
          data: {
            user: null,
            session: null,
            messageId: u == null ? void 0 : u.message_id,
          },
          error: h,
        };
      }
      throw new jr("You must provide either an email or phone number.");
    } catch (a) {
      if (re(a)) return { data: { user: null, session: null }, error: a };
      throw a;
    }
  }
  async verifyOtp(e) {
    var t, r;
    try {
      let i, n;
      "options" in e &&
        ((i = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo),
        (n =
          (r = e.options) === null || r === void 0 ? void 0 : r.captchaToken));
      const { data: o, error: a } = await ae(
        this.fetch,
        "POST",
        `${this.url}/verify`,
        {
          headers: this.headers,
          body: Object.assign(Object.assign({}, e), {
            gotrue_meta_security: { captcha_token: n },
          }),
          redirectTo: i,
          xform: ut,
        },
      );
      if (a) throw a;
      if (!o) throw new Error("An error occurred on token verification.");
      const c = o.session,
        u = o.user;
      return (
        c != null &&
          c.access_token &&
          (await this._saveSession(c),
          await this._notifyAllSubscribers(
            e.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN",
            c,
          )),
        { data: { user: u, session: c }, error: null }
      );
    } catch (i) {
      if (re(i)) return { data: { user: null, session: null }, error: i };
      throw i;
    }
  }
  async signInWithSSO(e) {
    var t, r, i;
    try {
      let n = null,
        o = null;
      return (
        this.flowType === "pkce" &&
          ([n, o] = await Mt(this.storage, this.storageKey)),
        await ae(this.fetch, "POST", `${this.url}/sso`, {
          body: Object.assign(
            Object.assign(
              Object.assign(
                Object.assign(
                  Object.assign(
                    {},
                    "providerId" in e ? { provider_id: e.providerId } : null,
                  ),
                  "domain" in e ? { domain: e.domain } : null,
                ),
                {
                  redirect_to:
                    (r =
                      (t = e.options) === null || t === void 0
                        ? void 0
                        : t.redirectTo) !== null && r !== void 0
                      ? r
                      : void 0,
                },
              ),
              !(
                (i = e == null ? void 0 : e.options) === null || i === void 0
              ) && i.captchaToken
                ? {
                    gotrue_meta_security: {
                      captcha_token: e.options.captchaToken,
                    },
                  }
                : null,
            ),
            {
              skip_http_redirect: !0,
              code_challenge: n,
              code_challenge_method: o,
            },
          ),
          headers: this.headers,
          xform: ql,
        })
      );
    } catch (n) {
      if (re(n)) return { data: null, error: n };
      throw n;
    }
  }
  async reauthenticate() {
    return (
      await this.initializePromise,
      await this._acquireLock(-1, async () => await this._reauthenticate())
    );
  }
  async _reauthenticate() {
    try {
      return await this._useSession(async (e) => {
        const {
          data: { session: t },
          error: r,
        } = e;
        if (r) throw r;
        if (!t) throw new ft();
        const { error: i } = await ae(
          this.fetch,
          "GET",
          `${this.url}/reauthenticate`,
          { headers: this.headers, jwt: t.access_token },
        );
        return { data: { user: null, session: null }, error: i };
      });
    } catch (e) {
      if (re(e)) return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  async resend(e) {
    try {
      const t = `${this.url}/resend`;
      if ("email" in e) {
        const { email: r, type: i, options: n } = e,
          { error: o } = await ae(this.fetch, "POST", t, {
            headers: this.headers,
            body: {
              email: r,
              type: i,
              gotrue_meta_security: {
                captcha_token: n == null ? void 0 : n.captchaToken,
              },
            },
            redirectTo: n == null ? void 0 : n.emailRedirectTo,
          });
        return { data: { user: null, session: null }, error: o };
      } else if ("phone" in e) {
        const { phone: r, type: i, options: n } = e,
          { data: o, error: a } = await ae(this.fetch, "POST", t, {
            headers: this.headers,
            body: {
              phone: r,
              type: i,
              gotrue_meta_security: {
                captcha_token: n == null ? void 0 : n.captchaToken,
              },
            },
          });
        return {
          data: {
            user: null,
            session: null,
            messageId: o == null ? void 0 : o.message_id,
          },
          error: a,
        };
      }
      throw new jr(
        "You must provide either an email or phone number and a type",
      );
    } catch (t) {
      if (re(t)) return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  async getSession() {
    return (
      await this.initializePromise,
      await this._acquireLock(-1, async () => this._useSession(async (t) => t))
    );
  }
  async _acquireLock(e, t) {
    this._debug("#_acquireLock", "begin", e);
    try {
      if (this.lockAcquired) {
        const r = this.pendingInLock.length
            ? this.pendingInLock[this.pendingInLock.length - 1]
            : Promise.resolve(),
          i = (async () => (await r, await t()))();
        return (
          this.pendingInLock.push(
            (async () => {
              try {
                await i;
              } catch {}
            })(),
          ),
          i
        );
      }
      return await this.lock(`lock:${this.storageKey}`, e, async () => {
        this._debug(
          "#_acquireLock",
          "lock acquired for storage key",
          this.storageKey,
        );
        try {
          this.lockAcquired = !0;
          const r = t();
          for (
            this.pendingInLock.push(
              (async () => {
                try {
                  await r;
                } catch {}
              })(),
            ),
              await r;
            this.pendingInLock.length;
          ) {
            const i = [...this.pendingInLock];
            (await Promise.all(i), this.pendingInLock.splice(0, i.length));
          }
          return await r;
        } finally {
          (this._debug(
            "#_acquireLock",
            "lock released for storage key",
            this.storageKey,
          ),
            (this.lockAcquired = !1));
        }
      });
    } finally {
      this._debug("#_acquireLock", "end");
    }
  }
  async _useSession(e) {
    this._debug("#_useSession", "begin");
    try {
      const t = await this.__loadSession();
      return await e(t);
    } finally {
      this._debug("#_useSession", "end");
    }
  }
  async __loadSession() {
    (this._debug("#__loadSession()", "begin"),
      this.lockAcquired ||
        this._debug(
          "#__loadSession()",
          "used outside of an acquired lock!",
          new Error().stack,
        ));
    try {
      let e = null;
      const t = await Ar(this.storage, this.storageKey);
      if (
        (this._debug("#getSession()", "session from storage", t),
        t !== null &&
          (this._isValidSession(t)
            ? (e = t)
            : (this._debug(
                "#getSession()",
                "session from storage is not valid",
              ),
              await this._removeSession())),
        !e)
      )
        return { data: { session: null }, error: null };
      const r = e.expires_at ? e.expires_at * 1e3 - Date.now() < ss : !1;
      if (
        (this._debug(
          "#__loadSession()",
          `session has${r ? "" : " not"} expired`,
          "expires_at",
          e.expires_at,
        ),
        !r)
      ) {
        if (this.storage.isServer) {
          let o = this.suppressGetSessionWarning;
          e = new Proxy(e, {
            get: (c, u, h) => (
              !o &&
                u === "user" &&
                (console.warn(
                  "Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.",
                ),
                (o = !0),
                (this.suppressGetSessionWarning = !0)),
              Reflect.get(c, u, h)
            ),
          });
        }
        return { data: { session: e }, error: null };
      }
      const { session: i, error: n } = await this._callRefreshToken(
        e.refresh_token,
      );
      return n
        ? { data: { session: null }, error: n }
        : { data: { session: i }, error: null };
    } finally {
      this._debug("#__loadSession()", "end");
    }
  }
  async getUser(e) {
    return e
      ? await this._getUser(e)
      : (await this.initializePromise,
        await this._acquireLock(-1, async () => await this._getUser()));
  }
  async _getUser(e) {
    try {
      return e
        ? await ae(this.fetch, "GET", `${this.url}/user`, {
            headers: this.headers,
            jwt: e,
            xform: gt,
          })
        : await this._useSession(async (t) => {
            var r, i, n;
            const { data: o, error: a } = t;
            if (a) throw a;
            return !(
              !((r = o.session) === null || r === void 0) && r.access_token
            ) && !this.hasCustomAuthorizationHeader
              ? { data: { user: null }, error: new ft() }
              : await ae(this.fetch, "GET", `${this.url}/user`, {
                  headers: this.headers,
                  jwt:
                    (n =
                      (i = o.session) === null || i === void 0
                        ? void 0
                        : i.access_token) !== null && n !== void 0
                      ? n
                      : void 0,
                  xform: gt,
                });
          });
    } catch (t) {
      if (re(t))
        return (
          fl(t) &&
            (await this._removeSession(),
            await Dr(this.storage, `${this.storageKey}-code-verifier`)),
          { data: { user: null }, error: t }
        );
      throw t;
    }
  }
  async updateUser(e, t = {}) {
    return (
      await this.initializePromise,
      await this._acquireLock(-1, async () => await this._updateUser(e, t))
    );
  }
  async _updateUser(e, t = {}) {
    try {
      return await this._useSession(async (r) => {
        const { data: i, error: n } = r;
        if (n) throw n;
        if (!i.session) throw new ft();
        const o = i.session;
        let a = null,
          c = null;
        this.flowType === "pkce" &&
          e.email != null &&
          ([a, c] = await Mt(this.storage, this.storageKey));
        const { data: u, error: h } = await ae(
          this.fetch,
          "PUT",
          `${this.url}/user`,
          {
            headers: this.headers,
            redirectTo: t == null ? void 0 : t.emailRedirectTo,
            body: Object.assign(Object.assign({}, e), {
              code_challenge: a,
              code_challenge_method: c,
            }),
            jwt: o.access_token,
            xform: gt,
          },
        );
        if (h) throw h;
        return (
          (o.user = u.user),
          await this._saveSession(o),
          await this._notifyAllSubscribers("USER_UPDATED", o),
          { data: { user: o.user }, error: null }
        );
      });
    } catch (r) {
      if (re(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async setSession(e) {
    return (
      await this.initializePromise,
      await this._acquireLock(-1, async () => await this._setSession(e))
    );
  }
  async _setSession(e) {
    try {
      if (!e.access_token || !e.refresh_token) throw new ft();
      const t = Date.now() / 1e3;
      let r = t,
        i = !0,
        n = null;
      const { payload: o } = ns(e.access_token);
      if ((o.exp && ((r = o.exp), (i = r <= t)), i)) {
        const { session: a, error: c } = await this._callRefreshToken(
          e.refresh_token,
        );
        if (c) return { data: { user: null, session: null }, error: c };
        if (!a) return { data: { user: null, session: null }, error: null };
        n = a;
      } else {
        const { data: a, error: c } = await this._getUser(e.access_token);
        if (c) throw c;
        ((n = {
          access_token: e.access_token,
          refresh_token: e.refresh_token,
          user: a.user,
          token_type: "bearer",
          expires_in: r - t,
          expires_at: r,
        }),
          await this._saveSession(n),
          await this._notifyAllSubscribers("SIGNED_IN", n));
      }
      return { data: { user: n.user, session: n }, error: null };
    } catch (t) {
      if (re(t)) return { data: { session: null, user: null }, error: t };
      throw t;
    }
  }
  async refreshSession(e) {
    return (
      await this.initializePromise,
      await this._acquireLock(-1, async () => await this._refreshSession(e))
    );
  }
  async _refreshSession(e) {
    try {
      return await this._useSession(async (t) => {
        var r;
        if (!e) {
          const { data: o, error: a } = t;
          if (a) throw a;
          e = (r = o.session) !== null && r !== void 0 ? r : void 0;
        }
        if (!(e != null && e.refresh_token)) throw new ft();
        const { session: i, error: n } = await this._callRefreshToken(
          e.refresh_token,
        );
        return n
          ? { data: { user: null, session: null }, error: n }
          : i
            ? { data: { user: i.user, session: i }, error: null }
            : { data: { user: null, session: null }, error: null };
      });
    } catch (t) {
      if (re(t)) return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  async _getSessionFromURL(e, t) {
    try {
      if (!Ye()) throw new Nr("No browser detected.");
      if (e.error || e.error_description || e.error_code)
        throw new Nr(
          e.error_description ||
            "Error in URL with unspecified error_description",
          {
            error: e.error || "unspecified_error",
            code: e.error_code || "unspecified_code",
          },
        );
      switch (t) {
        case "implicit":
          if (this.flowType === "pkce")
            throw new Si("Not a valid PKCE flow url.");
          break;
        case "pkce":
          if (this.flowType === "implicit")
            throw new Nr("Not a valid implicit grant flow url.");
          break;
        default:
      }
      if (t === "pkce") {
        if (
          (this._debug("#_initialize()", "begin", "is PKCE flow", !0), !e.code)
        )
          throw new Si("No code detected.");
        const { data: G, error: O } = await this._exchangeCodeForSession(
          e.code,
        );
        if (O) throw O;
        const A = new URL(window.location.href);
        return (
          A.searchParams.delete("code"),
          window.history.replaceState(window.history.state, "", A.toString()),
          { data: { session: G.session, redirectType: null }, error: null }
        );
      }
      const {
        provider_token: r,
        provider_refresh_token: i,
        access_token: n,
        refresh_token: o,
        expires_in: a,
        expires_at: c,
        token_type: u,
      } = e;
      if (!n || !a || !o || !u) throw new Nr("No session defined in URL");
      const h = Math.round(Date.now() / 1e3),
        p = parseInt(a);
      let y = h + p;
      c && (y = parseInt(c));
      const b = y - h;
      b * 1e3 <= Bt &&
        console.warn(
          `@supabase/gotrue-js: Session as retrieved from URL expires in ${b}s, should have been closer to ${p}s`,
        );
      const k = y - p;
      h - k >= 120
        ? console.warn(
            "@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",
            k,
            y,
            h,
          )
        : h - k < 0 &&
          console.warn(
            "@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",
            k,
            y,
            h,
          );
      const { data: I, error: P } = await this._getUser(n);
      if (P) throw P;
      const L = {
        provider_token: r,
        provider_refresh_token: i,
        access_token: n,
        expires_in: p,
        expires_at: y,
        refresh_token: o,
        token_type: u,
        user: I.user,
      };
      return (
        (window.location.hash = ""),
        this._debug("#_getSessionFromURL()", "clearing window.location.hash"),
        { data: { session: L, redirectType: e.type }, error: null }
      );
    } catch (r) {
      if (re(r))
        return { data: { session: null, redirectType: null }, error: r };
      throw r;
    }
  }
  _isImplicitGrantCallback(e) {
    return !!(e.access_token || e.error_description);
  }
  async _isPKCECallback(e) {
    const t = await Ar(this.storage, `${this.storageKey}-code-verifier`);
    return !!(e.code && t);
  }
  async signOut(e = { scope: "global" }) {
    return (
      await this.initializePromise,
      await this._acquireLock(-1, async () => await this._signOut(e))
    );
  }
  async _signOut({ scope: e } = { scope: "global" }) {
    return await this._useSession(async (t) => {
      var r;
      const { data: i, error: n } = t;
      if (n) return { error: n };
      const o =
        (r = i.session) === null || r === void 0 ? void 0 : r.access_token;
      if (o) {
        const { error: a } = await this.admin.signOut(o, e);
        if (
          a &&
          !(ml(a) && (a.status === 404 || a.status === 401 || a.status === 403))
        )
          return { error: a };
      }
      return (
        e !== "others" &&
          (await this._removeSession(),
          await Dr(this.storage, `${this.storageKey}-code-verifier`)),
        { error: null }
      );
    });
  }
  onAuthStateChange(e) {
    const t = Cl(),
      r = {
        id: t,
        callback: e,
        unsubscribe: () => {
          (this._debug(
            "#unsubscribe()",
            "state change callback with id removed",
            t,
          ),
            this.stateChangeEmitters.delete(t));
        },
      };
    return (
      this._debug("#onAuthStateChange()", "registered callback with id", t),
      this.stateChangeEmitters.set(t, r),
      (async () => (
        await this.initializePromise,
        await this._acquireLock(-1, async () => {
          this._emitInitialSession(t);
        })
      ))(),
      { data: { subscription: r } }
    );
  }
  async _emitInitialSession(e) {
    return await this._useSession(async (t) => {
      var r, i;
      try {
        const {
          data: { session: n },
          error: o,
        } = t;
        if (o) throw o;
        (await ((r = this.stateChangeEmitters.get(e)) === null || r === void 0
          ? void 0
          : r.callback("INITIAL_SESSION", n)),
          this._debug("INITIAL_SESSION", "callback id", e, "session", n));
      } catch (n) {
        (await ((i = this.stateChangeEmitters.get(e)) === null || i === void 0
          ? void 0
          : i.callback("INITIAL_SESSION", null)),
          this._debug("INITIAL_SESSION", "callback id", e, "error", n),
          console.error(n));
      }
    });
  }
  async resetPasswordForEmail(e, t = {}) {
    let r = null,
      i = null;
    this.flowType === "pkce" &&
      ([r, i] = await Mt(this.storage, this.storageKey, !0));
    try {
      return await ae(this.fetch, "POST", `${this.url}/recover`, {
        body: {
          email: e,
          code_challenge: r,
          code_challenge_method: i,
          gotrue_meta_security: { captcha_token: t.captchaToken },
        },
        headers: this.headers,
        redirectTo: t.redirectTo,
      });
    } catch (n) {
      if (re(n)) return { data: null, error: n };
      throw n;
    }
  }
  async getUserIdentities() {
    var e;
    try {
      const { data: t, error: r } = await this.getUser();
      if (r) throw r;
      return {
        data: {
          identities: (e = t.user.identities) !== null && e !== void 0 ? e : [],
        },
        error: null,
      };
    } catch (t) {
      if (re(t)) return { data: null, error: t };
      throw t;
    }
  }
  async linkIdentity(e) {
    var t;
    try {
      const { data: r, error: i } = await this._useSession(async (n) => {
        var o, a, c, u, h;
        const { data: p, error: y } = n;
        if (y) throw y;
        const b = await this._getUrlForProvider(
          `${this.url}/user/identities/authorize`,
          e.provider,
          {
            redirectTo:
              (o = e.options) === null || o === void 0 ? void 0 : o.redirectTo,
            scopes:
              (a = e.options) === null || a === void 0 ? void 0 : a.scopes,
            queryParams:
              (c = e.options) === null || c === void 0 ? void 0 : c.queryParams,
            skipBrowserRedirect: !0,
          },
        );
        return await ae(this.fetch, "GET", b, {
          headers: this.headers,
          jwt:
            (h =
              (u = p.session) === null || u === void 0
                ? void 0
                : u.access_token) !== null && h !== void 0
              ? h
              : void 0,
        });
      });
      if (i) throw i;
      return (
        Ye() &&
          !(
            !((t = e.options) === null || t === void 0) && t.skipBrowserRedirect
          ) &&
          window.location.assign(r == null ? void 0 : r.url),
        {
          data: { provider: e.provider, url: r == null ? void 0 : r.url },
          error: null,
        }
      );
    } catch (r) {
      if (re(r)) return { data: { provider: e.provider, url: null }, error: r };
      throw r;
    }
  }
  async unlinkIdentity(e) {
    try {
      return await this._useSession(async (t) => {
        var r, i;
        const { data: n, error: o } = t;
        if (o) throw o;
        return await ae(
          this.fetch,
          "DELETE",
          `${this.url}/user/identities/${e.identity_id}`,
          {
            headers: this.headers,
            jwt:
              (i =
                (r = n.session) === null || r === void 0
                  ? void 0
                  : r.access_token) !== null && i !== void 0
                ? i
                : void 0,
          },
        );
      });
    } catch (t) {
      if (re(t)) return { data: null, error: t };
      throw t;
    }
  }
  async _refreshAccessToken(e) {
    const t = `#_refreshAccessToken(${e.substring(0, 5)}...)`;
    this._debug(t, "begin");
    try {
      const r = Date.now();
      return await Il(
        async (i) => (
          i > 0 && (await El(200 * Math.pow(2, i - 1))),
          this._debug(t, "refreshing attempt", i),
          await ae(
            this.fetch,
            "POST",
            `${this.url}/token?grant_type=refresh_token`,
            { body: { refresh_token: e }, headers: this.headers, xform: ut },
          )
        ),
        (i, n) => {
          const o = 200 * Math.pow(2, i);
          return n && is(n) && Date.now() + o - r < Bt;
        },
      );
    } catch (r) {
      if ((this._debug(t, "error", r), re(r)))
        return { data: { session: null, user: null }, error: r };
      throw r;
    } finally {
      this._debug(t, "end");
    }
  }
  _isValidSession(e) {
    return (
      typeof e == "object" &&
      e !== null &&
      "access_token" in e &&
      "refresh_token" in e &&
      "expires_at" in e
    );
  }
  async _handleProviderSignIn(e, t) {
    const r = await this._getUrlForProvider(`${this.url}/authorize`, e, {
      redirectTo: t.redirectTo,
      scopes: t.scopes,
      queryParams: t.queryParams,
    });
    return (
      this._debug(
        "#_handleProviderSignIn()",
        "provider",
        e,
        "options",
        t,
        "url",
        r,
      ),
      Ye() && !t.skipBrowserRedirect && window.location.assign(r),
      { data: { provider: e, url: r }, error: null }
    );
  }
  async _recoverAndRefresh() {
    var e;
    const t = "#_recoverAndRefresh()";
    this._debug(t, "begin");
    try {
      const r = await Ar(this.storage, this.storageKey);
      if (
        (this._debug(t, "session from storage", r), !this._isValidSession(r))
      ) {
        (this._debug(t, "session is not valid"),
          r !== null && (await this._removeSession()));
        return;
      }
      const i =
        ((e = r.expires_at) !== null && e !== void 0 ? e : 1 / 0) * 1e3 -
          Date.now() <
        ss;
      if (
        (this._debug(
          t,
          `session has${i ? "" : " not"} expired with margin of ${ss}s`,
        ),
        i)
      ) {
        if (this.autoRefreshToken && r.refresh_token) {
          const { error: n } = await this._callRefreshToken(r.refresh_token);
          n &&
            (console.error(n),
            is(n) ||
              (this._debug(
                t,
                "refresh failed with a non-retryable error, removing the session",
                n,
              ),
              await this._removeSession()));
        }
      } else await this._notifyAllSubscribers("SIGNED_IN", r);
    } catch (r) {
      (this._debug(t, "error", r), console.error(r));
      return;
    } finally {
      this._debug(t, "end");
    }
  }
  async _callRefreshToken(e) {
    var t, r;
    if (!e) throw new ft();
    if (this.refreshingDeferred) return this.refreshingDeferred.promise;
    const i = `#_callRefreshToken(${e.substring(0, 5)}...)`;
    this._debug(i, "begin");
    try {
      this.refreshingDeferred = new Fr();
      const { data: n, error: o } = await this._refreshAccessToken(e);
      if (o) throw o;
      if (!n.session) throw new ft();
      (await this._saveSession(n.session),
        await this._notifyAllSubscribers("TOKEN_REFRESHED", n.session));
      const a = { session: n.session, error: null };
      return (this.refreshingDeferred.resolve(a), a);
    } catch (n) {
      if ((this._debug(i, "error", n), re(n))) {
        const o = { session: null, error: n };
        return (
          is(n) || (await this._removeSession()),
          (t = this.refreshingDeferred) === null ||
            t === void 0 ||
            t.resolve(o),
          o
        );
      }
      throw (
        (r = this.refreshingDeferred) === null || r === void 0 || r.reject(n),
        n
      );
    } finally {
      ((this.refreshingDeferred = null), this._debug(i, "end"));
    }
  }
  async _notifyAllSubscribers(e, t, r = !0) {
    const i = `#_notifyAllSubscribers(${e})`;
    this._debug(i, "begin", t, `broadcast = ${r}`);
    try {
      this.broadcastChannel &&
        r &&
        this.broadcastChannel.postMessage({ event: e, session: t });
      const n = [],
        o = Array.from(this.stateChangeEmitters.values()).map(async (a) => {
          try {
            await a.callback(e, t);
          } catch (c) {
            n.push(c);
          }
        });
      if ((await Promise.all(o), n.length > 0)) {
        for (let a = 0; a < n.length; a += 1) console.error(n[a]);
        throw n[0];
      }
    } finally {
      this._debug(i, "end");
    }
  }
  async _saveSession(e) {
    (this._debug("#_saveSession()", e),
      (this.suppressGetSessionWarning = !0),
      await vn(this.storage, this.storageKey, e));
  }
  async _removeSession() {
    (this._debug("#_removeSession()"),
      await Dr(this.storage, this.storageKey),
      await this._notifyAllSubscribers("SIGNED_OUT", null));
  }
  _removeVisibilityChangedCallback() {
    this._debug("#_removeVisibilityChangedCallback()");
    const e = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      e &&
        Ye() &&
        window != null &&
        window.removeEventListener &&
        window.removeEventListener("visibilitychange", e);
    } catch (t) {
      console.error("removing visibilitychange callback failed", t);
    }
  }
  async _startAutoRefresh() {
    (await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()"));
    const e = setInterval(() => this._autoRefreshTokenTick(), Bt);
    ((this.autoRefreshTicker = e),
      e && typeof e == "object" && typeof e.unref == "function"
        ? e.unref()
        : typeof Deno < "u" &&
          typeof Deno.unrefTimer == "function" &&
          Deno.unrefTimer(e),
      setTimeout(async () => {
        (await this.initializePromise, await this._autoRefreshTokenTick());
      }, 0));
  }
  async _stopAutoRefresh() {
    this._debug("#_stopAutoRefresh()");
    const e = this.autoRefreshTicker;
    ((this.autoRefreshTicker = null), e && clearInterval(e));
  }
  async startAutoRefresh() {
    (this._removeVisibilityChangedCallback(), await this._startAutoRefresh());
  }
  async stopAutoRefresh() {
    (this._removeVisibilityChangedCallback(), await this._stopAutoRefresh());
  }
  async _autoRefreshTokenTick() {
    this._debug("#_autoRefreshTokenTick()", "begin");
    try {
      await this._acquireLock(0, async () => {
        try {
          const e = Date.now();
          try {
            return await this._useSession(async (t) => {
              const {
                data: { session: r },
              } = t;
              if (!r || !r.refresh_token || !r.expires_at) {
                this._debug("#_autoRefreshTokenTick()", "no session");
                return;
              }
              const i = Math.floor((r.expires_at * 1e3 - e) / Bt);
              (this._debug(
                "#_autoRefreshTokenTick()",
                `access token expires in ${i} ticks, a tick lasts ${Bt}ms, refresh threshold is ${gs} ticks`,
              ),
                i <= gs && (await this._callRefreshToken(r.refresh_token)));
            });
          } catch (t) {
            console.error(
              "Auto refresh tick failed with error. This is likely a transient error.",
              t,
            );
          }
        } finally {
          this._debug("#_autoRefreshTokenTick()", "end");
        }
      });
    } catch (e) {
      if (e.isAcquireTimeout || e instanceof bn)
        this._debug("auto refresh token tick lock not available");
      else throw e;
    }
  }
  async _handleVisibilityChange() {
    if (
      (this._debug("#_handleVisibilityChange()"),
      !Ye() || !(window != null && window.addEventListener))
    )
      return (this.autoRefreshToken && this.startAutoRefresh(), !1);
    try {
      ((this.visibilityChangedCallback = async () =>
        await this._onVisibilityChanged(!1)),
        window == null ||
          window.addEventListener(
            "visibilitychange",
            this.visibilityChangedCallback,
          ),
        await this._onVisibilityChanged(!0));
    } catch (e) {
      console.error("_handleVisibilityChange", e);
    }
  }
  async _onVisibilityChanged(e) {
    const t = `#_onVisibilityChanged(${e})`;
    (this._debug(t, "visibilityState", document.visibilityState),
      document.visibilityState === "visible"
        ? (this.autoRefreshToken && this._startAutoRefresh(),
          e ||
            (await this.initializePromise,
            await this._acquireLock(-1, async () => {
              if (document.visibilityState !== "visible") {
                this._debug(
                  t,
                  "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting",
                );
                return;
              }
              await this._recoverAndRefresh();
            })))
        : document.visibilityState === "hidden" &&
          this.autoRefreshToken &&
          this._stopAutoRefresh());
  }
  async _getUrlForProvider(e, t, r) {
    const i = [`provider=${encodeURIComponent(t)}`];
    if (
      (r != null &&
        r.redirectTo &&
        i.push(`redirect_to=${encodeURIComponent(r.redirectTo)}`),
      r != null && r.scopes && i.push(`scopes=${encodeURIComponent(r.scopes)}`),
      this.flowType === "pkce")
    ) {
      const [n, o] = await Mt(this.storage, this.storageKey),
        a = new URLSearchParams({
          code_challenge: `${encodeURIComponent(n)}`,
          code_challenge_method: `${encodeURIComponent(o)}`,
        });
      i.push(a.toString());
    }
    if (r != null && r.queryParams) {
      const n = new URLSearchParams(r.queryParams);
      i.push(n.toString());
    }
    return (
      r != null &&
        r.skipBrowserRedirect &&
        i.push(`skip_http_redirect=${r.skipBrowserRedirect}`),
      `${e}?${i.join("&")}`
    );
  }
  async _unenroll(e) {
    try {
      return await this._useSession(async (t) => {
        var r;
        const { data: i, error: n } = t;
        return n
          ? { data: null, error: n }
          : await ae(
              this.fetch,
              "DELETE",
              `${this.url}/factors/${e.factorId}`,
              {
                headers: this.headers,
                jwt:
                  (r = i == null ? void 0 : i.session) === null || r === void 0
                    ? void 0
                    : r.access_token,
              },
            );
      });
    } catch (t) {
      if (re(t)) return { data: null, error: t };
      throw t;
    }
  }
  async _enroll(e) {
    try {
      return await this._useSession(async (t) => {
        var r, i;
        const { data: n, error: o } = t;
        if (o) return { data: null, error: o };
        const a = Object.assign(
            { friendly_name: e.friendlyName, factor_type: e.factorType },
            e.factorType === "phone"
              ? { phone: e.phone }
              : { issuer: e.issuer },
          ),
          { data: c, error: u } = await ae(
            this.fetch,
            "POST",
            `${this.url}/factors`,
            {
              body: a,
              headers: this.headers,
              jwt:
                (r = n == null ? void 0 : n.session) === null || r === void 0
                  ? void 0
                  : r.access_token,
            },
          );
        return u
          ? { data: null, error: u }
          : (e.factorType === "totp" &&
              !((i = c == null ? void 0 : c.totp) === null || i === void 0) &&
              i.qr_code &&
              (c.totp.qr_code = `data:image/svg+xml;utf-8,${c.totp.qr_code}`),
            { data: c, error: null });
      });
    } catch (t) {
      if (re(t)) return { data: null, error: t };
      throw t;
    }
  }
  async _verify(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var r;
          const { data: i, error: n } = t;
          if (n) return { data: null, error: n };
          const { data: o, error: a } = await ae(
            this.fetch,
            "POST",
            `${this.url}/factors/${e.factorId}/verify`,
            {
              body: { code: e.code, challenge_id: e.challengeId },
              headers: this.headers,
              jwt:
                (r = i == null ? void 0 : i.session) === null || r === void 0
                  ? void 0
                  : r.access_token,
            },
          );
          return a
            ? { data: null, error: a }
            : (await this._saveSession(
                Object.assign(
                  { expires_at: Math.round(Date.now() / 1e3) + o.expires_in },
                  o,
                ),
              ),
              await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", o),
              { data: o, error: a });
        });
      } catch (t) {
        if (re(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  async _challenge(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var r;
          const { data: i, error: n } = t;
          return n
            ? { data: null, error: n }
            : await ae(
                this.fetch,
                "POST",
                `${this.url}/factors/${e.factorId}/challenge`,
                {
                  body: { channel: e.channel },
                  headers: this.headers,
                  jwt:
                    (r = i == null ? void 0 : i.session) === null ||
                    r === void 0
                      ? void 0
                      : r.access_token,
                },
              );
        });
      } catch (t) {
        if (re(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  async _challengeAndVerify(e) {
    const { data: t, error: r } = await this._challenge({
      factorId: e.factorId,
    });
    return r
      ? { data: null, error: r }
      : await this._verify({
          factorId: e.factorId,
          challengeId: t.id,
          code: e.code,
        });
  }
  async _listFactors() {
    const {
      data: { user: e },
      error: t,
    } = await this.getUser();
    if (t) return { data: null, error: t };
    const r = (e == null ? void 0 : e.factors) || [],
      i = r.filter((o) => o.factor_type === "totp" && o.status === "verified"),
      n = r.filter((o) => o.factor_type === "phone" && o.status === "verified");
    return { data: { all: r, totp: i, phone: n }, error: null };
  }
  async _getAuthenticatorAssuranceLevel() {
    return this._acquireLock(
      -1,
      async () =>
        await this._useSession(async (e) => {
          var t, r;
          const {
            data: { session: i },
            error: n,
          } = e;
          if (n) return { data: null, error: n };
          if (!i)
            return {
              data: {
                currentLevel: null,
                nextLevel: null,
                currentAuthenticationMethods: [],
              },
              error: null,
            };
          const { payload: o } = ns(i.access_token);
          let a = null;
          o.aal && (a = o.aal);
          let c = a;
          ((r =
            (t = i.user.factors) === null || t === void 0
              ? void 0
              : t.filter((p) => p.status === "verified")) !== null &&
          r !== void 0
            ? r
            : []
          ).length > 0 && (c = "aal2");
          const h = o.amr || [];
          return {
            data: {
              currentLevel: a,
              nextLevel: c,
              currentAuthenticationMethods: h,
            },
            error: null,
          };
        }),
    );
  }
  async fetchJwk(e, t = { keys: [] }) {
    let r = t.keys.find((o) => o.kid === e);
    if (
      r ||
      ((r = this.jwks.keys.find((o) => o.kid === e)),
      r && this.jwks_cached_at + ul > Date.now())
    )
      return r;
    const { data: i, error: n } = await ae(
      this.fetch,
      "GET",
      `${this.url}/.well-known/jwks.json`,
      { headers: this.headers },
    );
    if (n) throw n;
    if (!i.keys || i.keys.length === 0) throw new mr("JWKS is empty");
    if (
      ((this.jwks = i),
      (this.jwks_cached_at = Date.now()),
      (r = i.keys.find((o) => o.kid === e)),
      !r)
    )
      throw new mr("No matching signing key found in JWKS");
    return r;
  }
  async getClaims(e, t = { keys: [] }) {
    try {
      let r = e;
      if (!r) {
        const { data: b, error: k } = await this.getSession();
        if (k || !b.session) return { data: null, error: k };
        r = b.session.access_token;
      }
      const {
        header: i,
        payload: n,
        signature: o,
        raw: { header: a, payload: c },
      } = ns(r);
      if (
        (Rl(n.exp),
        !i.kid ||
          i.alg === "HS256" ||
          !("crypto" in globalThis && "subtle" in globalThis.crypto))
      ) {
        const { error: b } = await this.getUser(r);
        if (b) throw b;
        return { data: { claims: n, header: i, signature: o }, error: null };
      }
      const u = $l(i.alg),
        h = await this.fetchJwk(i.kid, t),
        p = await crypto.subtle.importKey("jwk", h, u, !0, ["verify"]);
      if (!(await crypto.subtle.verify(u, p, o, _l(`${a}.${c}`))))
        throw new mr("Invalid JWT signature");
      return { data: { claims: n, header: i, signature: o }, error: null };
    } catch (r) {
      if (re(r)) return { data: null, error: r };
      throw r;
    }
  }
}
pr.nextInstanceID = 0;
const Zl = pr;
class ec extends Zl {
  constructor(e) {
    super(e);
  }
}
var tc = function (s, e, t, r) {
  function i(n) {
    return n instanceof t
      ? n
      : new t(function (o) {
          o(n);
        });
  }
  return new (t || (t = Promise))(function (n, o) {
    function a(h) {
      try {
        u(r.next(h));
      } catch (p) {
        o(p);
      }
    }
    function c(h) {
      try {
        u(r.throw(h));
      } catch (p) {
        o(p);
      }
    }
    function u(h) {
      h.done ? n(h.value) : i(h.value).then(a, c);
    }
    u((r = r.apply(s, e || [])).next());
  });
};
class rc {
  constructor(e, t, r) {
    var i, n, o;
    if (((this.supabaseUrl = e), (this.supabaseKey = t), !e))
      throw new Error("supabaseUrl is required.");
    if (!t) throw new Error("supabaseKey is required.");
    const a = nl(e),
      c = new URL(a);
    ((this.realtimeUrl = new URL("realtime/v1", c)),
      (this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace(
        "http",
        "ws",
      )),
      (this.authUrl = new URL("auth/v1", c)),
      (this.storageUrl = new URL("storage/v1", c)),
      (this.functionsUrl = new URL("functions/v1", c)));
    const u = `sb-${c.hostname.split(".")[0]}-auth-token`,
      h = {
        db: Ya,
        realtime: Za,
        auth: Object.assign(Object.assign({}, Xa), { storageKey: u }),
        global: Qa,
      },
      p = ol(r ?? {}, h);
    ((this.storageKey =
      (i = p.auth.storageKey) !== null && i !== void 0 ? i : ""),
      (this.headers = (n = p.global.headers) !== null && n !== void 0 ? n : {}),
      p.accessToken
        ? ((this.accessToken = p.accessToken),
          (this.auth = new Proxy(
            {},
            {
              get: (y, b) => {
                throw new Error(
                  `@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(b)} is not possible`,
                );
              },
            },
          )))
        : (this.auth = this._initSupabaseAuthClient(
            (o = p.auth) !== null && o !== void 0 ? o : {},
            this.headers,
            p.global.fetch,
          )),
      (this.fetch = sl(t, this._getAccessToken.bind(this), p.global.fetch)),
      (this.realtime = this._initRealtimeClient(
        Object.assign(
          {
            headers: this.headers,
            accessToken: this._getAccessToken.bind(this),
          },
          p.realtime,
        ),
      )),
      (this.rest = new ba(new URL("rest/v1", c).href, {
        headers: this.headers,
        schema: p.db.schema,
        fetch: this.fetch,
      })),
      p.accessToken || this._listenForAuthEvents());
  }
  get functions() {
    return new aa(this.functionsUrl.href, {
      headers: this.headers,
      customFetch: this.fetch,
    });
  }
  get storage() {
    return new Wa(this.storageUrl.href, this.headers, this.fetch);
  }
  from(e) {
    return this.rest.from(e);
  }
  schema(e) {
    return this.rest.schema(e);
  }
  rpc(e, t = {}, r = {}) {
    return this.rest.rpc(e, t, r);
  }
  channel(e, t = { config: {} }) {
    return this.realtime.channel(e, t);
  }
  getChannels() {
    return this.realtime.getChannels();
  }
  removeChannel(e) {
    return this.realtime.removeChannel(e);
  }
  removeAllChannels() {
    return this.realtime.removeAllChannels();
  }
  _getAccessToken() {
    var e, t;
    return tc(this, void 0, void 0, function* () {
      if (this.accessToken) return yield this.accessToken();
      const { data: r } = yield this.auth.getSession();
      return (t =
        (e = r.session) === null || e === void 0 ? void 0 : e.access_token) !==
        null && t !== void 0
        ? t
        : null;
    });
  }
  _initSupabaseAuthClient(
    {
      autoRefreshToken: e,
      persistSession: t,
      detectSessionInUrl: r,
      storage: i,
      storageKey: n,
      flowType: o,
      lock: a,
      debug: c,
    },
    u,
    h,
  ) {
    const p = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`,
    };
    return new ec({
      url: this.authUrl.href,
      headers: Object.assign(Object.assign({}, p), u),
      storageKey: n,
      autoRefreshToken: e,
      persistSession: t,
      detectSessionInUrl: r,
      storage: i,
      flowType: o,
      lock: a,
      debug: c,
      fetch: h,
      hasCustomAuthorizationHeader: "Authorization" in this.headers,
    });
  }
  _initRealtimeClient(e) {
    return new Da(
      this.realtimeUrl.href,
      Object.assign(Object.assign({}, e), {
        params: Object.assign(
          { apikey: this.supabaseKey },
          e == null ? void 0 : e.params,
        ),
      }),
    );
  }
  _listenForAuthEvents() {
    return this.auth.onAuthStateChange((t, r) => {
      this._handleTokenChanged(
        t,
        "CLIENT",
        r == null ? void 0 : r.access_token,
      );
    });
  }
  _handleTokenChanged(e, t, r) {
    (e === "TOKEN_REFRESHED" || e === "SIGNED_IN") &&
    this.changedAccessToken !== r
      ? (this.changedAccessToken = r)
      : e === "SIGNED_OUT" &&
        (this.realtime.setAuth(),
        t == "STORAGE" && this.auth.signOut(),
        (this.changedAccessToken = void 0));
  }
}
const sc = (s, e, t) => new rc(s, e, t),
  ic = "https://fbpemdlnlsgqkovnatro.supabase.co",
  nc =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicGVtZGxubHNncWtvdm5hdHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTQwOTksImV4cCI6MjA2Nzk5MDA5OX0.qJvBiB29BxSOMBCYtdcqMUOepSQecdtvpdglNrIZEhY",
  oc = ic,
  ac = nc,
  _ = sc(oc, ac);
class qt {
  constructor() {
    this.pendingNotifications = new Set();
  }
  static getInstance() {
    return (qt.instance || (qt.instance = new qt()), qt.instance);
  }
  async createNotification(e) {
    try {
      const {
          userId: t = null,
          message: r,
          importance: i = K.Medium,
          linkToPage: n,
          linkToId: o,
          eventType: a,
          relatedEntityType: c,
          relatedEntityId: u,
          targetAudience: h = "customer",
        } = e,
        p = this.createDeduplicationKey(t, a, c, u, r);
      if (this.pendingNotifications.has(p))
        return (console.log("Notification already pending:", p), null);
      this.pendingNotifications.add(p);
      try {
        if (await this.findDuplicate(t, a, c, u, r))
          return (console.log("Duplicate notification prevented:", p), null);
        const k = {
          ...{
            user_id: t,
            message: r,
            importance: i.toLowerCase(),
            is_read: !1,
            timestamp: new Date().toISOString(),
            link_to_page: n,
            link_to_id: o,
          },
        };
        try {
          (a && (k.event_type = a),
            c && (k.related_entity_type = c),
            u && (k.related_entity_id = u),
            h && (k.target_audience = h),
            (a || c || u || h) &&
              (k.metadata = {
                event_type: a,
                related_entity_type: c,
                related_entity_id: u,
                target_audience: h,
              }));
        } catch {
          console.warn(
            "Extended notification fields not available, using base fields only",
          );
        }
        const { data: I, error: P } = await _.from("notifications")
          .insert(k)
          .select()
          .single();
        return P
          ? (console.error("Error creating notification:", P), null)
          : this.mapToNotificationItem(I);
      } finally {
        setTimeout(() => {
          this.pendingNotifications.delete(p);
        }, 1e3);
      }
    } catch (t) {
      return (
        console.error("Unexpected error creating notification:", t),
        null
      );
    }
  }
  async createCustomerNotification(e, t, r = {}) {
    return this.createNotification({
      userId: e,
      message: t,
      targetAudience: "customer",
      ...r,
    });
  }
  async createAdminNotification(e, t = {}) {
    try {
      const { data: r, error: i } = await _.from("customers")
        .select("id")
        .eq("role", "admin");
      if (i) return (console.error("Error fetching admin users:", i), []);
      if (!r || r.length === 0)
        return (
          console.warn("No admin users found for admin notification"),
          []
        );
      const n = [];
      for (const o of r) {
        const a = await this.createNotification({
          userId: o.id,
          message: e,
          targetAudience: "admin",
          importance: K.Medium,
          ...t,
        });
        a && n.push(a);
      }
      return n;
    } catch (r) {
      return (console.error("Error creating admin notifications:", r), []);
    }
  }
  async createSystemNotification(e, t = {}) {
    try {
      const { data: r, error: i } = await _.from("customers")
        .select("id")
        .eq("role", "admin");
      if (i)
        return (
          console.error(
            "Error fetching admin users for system notification:",
            i,
          ),
          []
        );
      if (!r || r.length === 0)
        return (
          console.warn("No admin users found for system notification"),
          []
        );
      console.log(
        `[DEBUG] Creating system notification for ${r.length} admin users:`,
        { message: e, adminUserIds: r.map((o) => o.id) },
      );
      const n = [];
      for (const o of r) {
        const a = await this.createNotification({
          userId: o.id,
          message: e,
          targetAudience: "system",
          importance: K.Medium,
          eventType: "system_announcement",
          relatedEntityType: "system",
          relatedEntityId: "global",
          ...t,
        });
        a
          ? (n.push(a),
            console.log(
              `[DEBUG] Created system notification for admin ${o.id}:`,
              a.id,
            ))
          : console.log(
              `[DEBUG] Failed to create system notification for admin ${o.id}`,
            );
      }
      return (
        console.log(
          `[DEBUG] System notification creation complete: ${n.length} notifications created`,
        ),
        n
      );
    } catch (r) {
      return (console.error("Error creating system notifications:", r), []);
    }
  }
  async createOrderStatusNotification(e, t, r, i, n) {
    const o = `Order "${n}" status changed from ${t} to ${r}`;
    return i
      ? this.createCustomerNotification(i, o, {
          importance: this.getStatusImportance(r),
          linkToPage: "orders",
          linkToId: e,
          eventType: "order_status_change",
          relatedEntityType: "order",
          relatedEntityId: e,
        })
      : null;
  }
  getStatusImportance(e) {
    const t = ["Cancelled", "OnHold"],
      r = ["Delivered", "Completed", "OutForDelivery"],
      i = ["InTransit", "AtDestinationPort", "CustomsClearance"];
    return t.includes(e)
      ? K.Critical
      : r.includes(e)
        ? K.High
        : i.includes(e)
          ? K.Medium
          : K.Low;
  }
  async createAdminExceptionNotification(e, t = {}) {
    return this.createNotification({
      userId: null,
      message: e,
      targetAudience: "admin",
      importance: K.High,
      ...t,
    });
  }
  async createAdminSummaryNotification(e, t = {}) {
    return this.createNotification({
      userId: null,
      message: e,
      targetAudience: "admin",
      importance: K.Medium,
      eventType: "admin_summary",
      ...t,
    });
  }
  async createConsolidationStatusNotification(e, t, r, i, n) {
    const o = `Consolidation "${n}" status changed from ${t} to ${r}`,
      a = `${t}_to_${r}`;
    return i
      ? this.createCustomerNotification(i, o, {
          importance: this.getStatusImportance(r),
          linkToPage: "consolidations",
          linkToId: e,
          eventType: "consolidation_status_change",
          relatedEntityType: "consolidation_status_transition",
          relatedEntityId: `${e}_${a}`,
        })
      : null;
  }
  async createShipmentNotification(e, t, r, i, n) {
    const o = `Shipment "${i}" status updated to ${n}`;
    return await this.createSystemNotification(o, {
      importance: K.Medium,
      linkToPage: "shipments",
      linkToId: e,
      eventType: "shipment_status_change",
      relatedEntityType: "shipment",
      relatedEntityId: e,
    });
  }
  async createPaymentNotification(e, t, r, i, n) {
    const o = `Payment ${r.toLowerCase()}: $${Math.abs(t).toFixed(2)} - ${i}`;
    return this.createCustomerNotification(e, o, {
      importance: K.High,
      linkToPage: "payments",
      linkToId: n,
      eventType: "payment",
      relatedEntityType: r === "Payment" ? "payment" : "fee",
      relatedEntityId: n,
    });
  }
  async markAsRead(e) {
    try {
      const { error: t } = await _.from("notifications")
        .update({ is_read: !0 })
        .eq("id", e);
      return !t;
    } catch (t) {
      return (console.error("Error marking notification as read:", t), !1);
    }
  }
  async markAllAsRead(e = null, t = !1) {
    try {
      if (t) {
        const { error: r } = await _.from("notifications")
          .update({ is_read: !0 })
          .or(`user_id.is.null,user_id.eq."${e}"`)
          .eq("is_read", !1);
        return !r;
      } else {
        if (!e || e.trim() === "")
          return (
            console.error("Invalid userId provided for markAllAsRead"),
            !1
          );
        const { error: r } = await _.from("notifications")
          .update({ is_read: !0 })
          .or(`user_id.eq."${e}",user_id.is.null`)
          .eq("is_read", !1);
        return !r;
      }
    } catch (r) {
      return (console.error("Error marking all notifications as read:", r), !1);
    }
  }
  async getNotificationsForUser(e, t = !1, r = 50) {
    try {
      let i = _.from("notifications")
        .select("*")
        .order("timestamp", { ascending: !1 })
        .limit(r);
      t || (i = i.or(`user_id.eq."${e}",user_id.is.null`));
      const { data: n, error: o } = await i;
      return o
        ? (console.error("Error fetching notifications:", o), [])
        : (n || []).map(this.mapToNotificationItem);
    } catch (i) {
      return (console.error("Unexpected error fetching notifications:", i), []);
    }
  }
  async getNotificationsForAdmin(e = 50) {
    try {
      const { data: t, error: r } = await _.from("notifications")
        .select("*")
        .order("timestamp", { ascending: !1 })
        .limit(e);
      return r
        ? (console.error("Error fetching admin notifications:", r), [])
        : (t || []).map(this.mapToNotificationItem);
    } catch (t) {
      return (
        console.error("Unexpected error fetching admin notifications:", t),
        []
      );
    }
  }
  async getUnreadCount(e, t = !1) {
    try {
      let r = _.from("notifications")
        .select("*", { count: "exact", head: !0 })
        .eq("is_read", !1);
      t
        ? ((r = r.is("user_id", null)),
          console.log(
            "Getting unread count for admin - filter: user_id IS NULL",
          ))
        : ((r = r.or(`user_id.eq."${e}",user_id.is.null`)),
          console.log(
            `Getting unread count for customer ${e} - filter: user_id.eq."${e}",user_id.is.null`,
          ));
      const { count: i, error: n } = await r;
      return n
        ? (console.error("Error getting unread count:", n), 0)
        : (console.log(
            `Unread count result for ${t ? "admin" : "customer " + e}: ${i}`,
          ),
          i || 0);
    } catch (r) {
      return (console.error("Unexpected error getting unread count:", r), 0);
    }
  }
  createDeduplicationKey(e, t, r, i, n) {
    return [
      e || "system",
      t || "general",
      r || "unknown",
      i || "unknown",
      n || "no-message",
    ].join("|");
  }
  async findDuplicate(e, t, r, i, n) {
    try {
      if (!t || !r || !i) return !1;
      const o = new Date();
      o.setHours(o.getHours() - 24);
      let a = _.from("notifications")
        .select("id")
        .gte("timestamp", o.toISOString());
      (e ? (a = a.eq("user_id", e)) : (a = a.is("user_id", null)),
        (a = a.contains("metadata", {
          event_type: t,
          related_entity_type: r,
          related_entity_id: i,
        })),
        n && (a = a.eq("message", n)));
      const { data: c, error: u } = await a.limit(1);
      return u
        ? (console.error("Error checking for duplicate notifications:", u), !1)
        : (c || []).length > 0;
    } catch (o) {
      return (
        console.error("Unexpected error checking for duplicates:", o),
        !1
      );
    }
  }
  mapToNotificationItem(e) {
    return {
      id: e.id,
      message: e.message,
      timestamp: new Date(e.timestamp),
      userId: e.user_id,
      isRead: e.is_read,
      linkToPage: e.link_to_page,
      linkToId: e.link_to_id,
      importance: this.mapImportance(e.importance),
      eventType: e.event_type || null,
      relatedEntityType: e.related_entity_type || null,
      relatedEntityId: e.related_entity_id || null,
    };
  }
  mapImportance(e) {
    switch (e == null ? void 0 : e.toLowerCase()) {
      case "low":
        return K.Low;
      case "medium":
        return K.Medium;
      case "high":
        return K.High;
      case "critical":
        return K.Critical;
      default:
        return K.Medium;
    }
  }
}
const ie = qt.getInstance(),
  lc = async () => {
    try {
      const { data: s, error: e } = await _.from("notifications")
        .select("*")
        .limit(1);
      return !e;
    } catch {
      return !1;
    }
  },
  cc = async () => {
    try {
      const s = ["notifications", "customers", "orders", "consolidations"];
      return !(
        (
          await Promise.all(
            s.map(async (r) => {
              const { data: i, error: n } = await _.from(r)
                .select("*")
                .limit(1);
              return n
                ? { table: r, exists: !1, error: n }
                : { table: r, exists: !0, data: i };
            }),
          )
        ).filter((r) => !r.exists).length > 0
      );
    } catch {
      return !1;
    }
  },
  wn = x.createContext(void 0),
  _n = () => {
    const s = x.useContext(wn);
    if (s === void 0)
      throw new Error("useAuth must be used within an AuthProvider");
    return s;
  },
  dc = ({ children: s }) => {
    const [e, t] = x.useState(null),
      [r, i] = x.useState(!0),
      n = () => {
        if (!(typeof window > "u"))
          return `${window.location.origin}/dashboard/`;
      },
      o = (b) => {
        const k = b;
        return !!(b.email_confirmed_at || k.confirmed_at);
      };
    x.useEffect(() => {
      a();
      const {
        data: { subscription: b },
      } = _.auth.onAuthStateChange((k, I) => {
        if (I != null && I.user) {
          if (!o(I.user)) {
            (_.auth.signOut(), t(null));
            return;
          }
          c(I.user).catch((P) => {
            (console.error("Error setting user from auth session:", P),
              t(null));
          });
        } else t(null);
      });
      return () => b.unsubscribe();
    }, []);
    const a = async () => {
        try {
          const {
            data: { session: b },
          } = await _.auth.getSession();
          if (b != null && b.user) {
            if (!o(b.user)) {
              (await _.auth.signOut(), t(null));
              return;
            }
            await c(b.user);
          }
        } catch (b) {
          console.error("Error getting session:", b);
        } finally {
          i(!1);
        }
      },
      c = async (b) => {
        var L, G, O;
        if (!o(b))
          throw new Error(
            "Please confirm your email address before signing in.",
          );
        let k = "customer",
          I = null;
        try {
          const { data: A, error: H } = await _.from("customers")
            .select("*")
            .eq("id", b.id)
            .single();
          if (!H && A != null && A.role) ((k = A.role), (I = A.name));
          else {
            console.log("No customer record found, creating one...");
            const J =
                ((L = b.user_metadata) == null ? void 0 : L.name) ||
                "New Customer",
              { error: te } = await _.from("customers").insert([
                {
                  id: b.id,
                  name: J,
                  email: b.email,
                  company_name:
                    ((G = b.user_metadata) == null ? void 0 : G.company_name) ||
                    "Default Company",
                  role: "customer",
                  phone: "",
                  address: "",
                  notes: "",
                  contract_type_id: "trial",
                  has_used_trial_fee: !1,
                },
              ]);
            if (te)
              throw (
                console.error("Error creating customer record:", te),
                new Error(
                  "Failed to create user record. Please contact support.",
                )
              );
            ((k = "customer"), (I = J));
          }
        } catch (A) {
          throw (console.error("Error in setUserFromSession:", A), A);
        }
        const P = {
          id: b.id,
          name: I || ((O = b.user_metadata) == null ? void 0 : O.name) || null,
          email: b.email,
          role: k,
        };
        return (t(P), P);
      },
      y = {
        user: e,
        isAuthenticated: !!e,
        loading: r,
        login: async (b, k) => {
          const { data: I, error: P } = await _.auth.signInWithPassword({
            email: b,
            password: k,
          });
          if (P) throw P;
          if (!I.user) throw new Error("Failed to login");
          if (!o(I.user))
            throw (
              await _.auth.signOut(),
              new Error(
                "Please confirm your email before signing in. Check your inbox for the confirmation link.",
              )
            );
          return await c(I.user);
        },
        logout: async () => {
          const { error: I } = await _.auth.signOut();
          if (I) {
            console.warn(
              "Global sign-out failed, forcing local auth cleanup:",
              I,
            );
            try {
              if (typeof window < "u" && window.localStorage) {
                const P =
                  _.auth && typeof _.auth.storageKey == "string"
                    ? _.auth.storageKey
                    : null;
                P &&
                  (window.localStorage.removeItem(P),
                  window.localStorage.removeItem(`${P}-code-verifier`));
                Object.keys(window.localStorage).forEach((L) => {
                  (L.startsWith("sb-") && L.endsWith("-auth-token")) ||
                  L === "supabase.auth.token"
                    ? window.localStorage.removeItem(L)
                    : null;
                });
              }
              await _.auth.signOut({ scope: "local" });
            } catch (P) {
              console.warn("Local auth cleanup fallback failed:", P);
            }
          }
          t(null);
        },
        signUp: async (b, k, I, P, L, G, O) => {
          const A = n(),
            { data: H, error: J } = await _.auth.signUp({
              email: b,
              password: k,
              options: {
                emailRedirectTo: A,
                data: {
                  name: I,
                  company_name: P,
                  phone: L,
                  address: G,
                  privacy_consent_accepted: !!O,
                  privacy_consent_accepted_at:
                    O == null ? void 0 : O.acceptedAt,
                  privacy_consent_version: O == null ? void 0 : O.version,
                },
              },
            });
          if (J) throw J;
          if (!H.user) throw new Error("Failed to create user");
          H.session && (await _.auth.signOut());
          const { error: te } = await _.from("customers").insert([
            {
              id: H.user.id,
              name: I || "New Customer",
              email: H.user.email,
              company_name: P || "Default Company",
              phone: L || "",
              address: G || "",
              notes: "",
              contract_type_id: "trial",
              has_used_trial_fee: !1,
              role: "customer",
            },
          ]);
          te && console.error("Error creating customer record:", te);
          const { error: z } = await _.auth.resend({
            type: "signup",
            email: b,
            options: { emailRedirectTo: A },
          });
          return (
            z &&
              console.warn(
                "Could not resend signup confirmation email:",
                z.message,
              ),
            {
              id: H.user.id,
              name: I || null,
              email: H.user.email,
              role: "customer",
            }
          );
        },
      };
    return r
      ? l.jsx("div", {
          className: "min-h-screen flex items-center justify-center",
          children: l.jsx("div", {
            className:
              "animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600",
          }),
        })
      : l.jsx(wn.Provider, { value: y, children: s });
  };
var Oe = {};
class Vt {
  constructor() {
    this.config = {
      costVarianceNotificationThreshold: 10,
      costVarianceHighAlertThreshold: 25,
      serviceFees: {
        trial: { flatFee: 499 },
        growth: { percentageRate: 0.02 },
        corporate: { percentageRate: 0.015 },
      },
      defaultCostDistributionMethod: "volume_proportional",
      defaultFixedRatePerM3: 100,
      allowMultipleShippingCostTransactions: !0,
      enableShippingCostUpdates: !0,
    };
  }
  static getInstance() {
    return (Vt.instance || (Vt.instance = new Vt()), Vt.instance);
  }
  getConfig() {
    return { ...this.config };
  }
  updateConfig(e) {
    this.config = { ...this.config, ...e };
  }
  getCostVarianceNotificationThreshold() {
    return this.config.costVarianceNotificationThreshold;
  }
  getCostVarianceHighAlertThreshold() {
    return this.config.costVarianceHighAlertThreshold;
  }
  shouldNotifyForCostVariance(e) {
    return Math.abs(e) > this.config.costVarianceNotificationThreshold;
  }
  isHighPriorityCostVariance(e) {
    return Math.abs(e) > this.config.costVarianceHighAlertThreshold;
  }
  getServiceFee(e, t) {
    const r = this.config.serviceFees;
    switch (e) {
      case "trial":
        return r.trial.flatFee;
      case "growth":
        return t ? t * r.growth.percentageRate : 0;
      case "corporate":
        return t ? t * r.corporate.percentageRate : 0;
      default:
        return 0;
    }
  }
  getDefaultCostDistributionMethod() {
    return this.config.defaultCostDistributionMethod;
  }
  getDefaultFixedRatePerM3() {
    return this.config.defaultFixedRatePerM3;
  }
  allowsMultipleShippingCostTransactions() {
    return this.config.allowMultipleShippingCostTransactions;
  }
  enablesShippingCostUpdates() {
    return this.config.enableShippingCostUpdates;
  }
  loadFromEnvironment() {
    if (
      (Oe.COST_VARIANCE_NOTIFICATION_THRESHOLD &&
        (this.config.costVarianceNotificationThreshold = parseFloat(
          Oe.COST_VARIANCE_NOTIFICATION_THRESHOLD,
        )),
      Oe.COST_VARIANCE_HIGH_ALERT_THRESHOLD &&
        (this.config.costVarianceHighAlertThreshold = parseFloat(
          Oe.COST_VARIANCE_HIGH_ALERT_THRESHOLD,
        )),
      Oe.TRIAL_SERVICE_FEE &&
        (this.config.serviceFees.trial.flatFee = parseFloat(
          Oe.TRIAL_SERVICE_FEE,
        )),
      Oe.GROWTH_SERVICE_FEE_RATE &&
        (this.config.serviceFees.growth.percentageRate = parseFloat(
          Oe.GROWTH_SERVICE_FEE_RATE,
        )),
      Oe.CORPORATE_SERVICE_FEE_RATE &&
        (this.config.serviceFees.corporate.percentageRate = parseFloat(
          Oe.CORPORATE_SERVICE_FEE_RATE,
        )),
      Oe.DEFAULT_COST_DISTRIBUTION_METHOD)
    ) {
      const e = Oe.DEFAULT_COST_DISTRIBUTION_METHOD,
        t = e === "proportional" ? "volume_proportional" : e;
      (t === "volume_proportional" || t === "fixed_rate_m3") &&
        (this.config.defaultCostDistributionMethod = t);
    }
    (Oe.DEFAULT_FIXED_RATE_PER_M3 &&
      (this.config.defaultFixedRatePerM3 = parseFloat(
        Oe.DEFAULT_FIXED_RATE_PER_M3,
      )),
      Oe.ALLOW_MULTIPLE_SHIPPING_COST_TRANSACTIONS &&
        (this.config.allowMultipleShippingCostTransactions =
          Oe.ALLOW_MULTIPLE_SHIPPING_COST_TRANSACTIONS === "true"),
      Oe.ENABLE_SHIPPING_COST_UPDATES &&
        (this.config.enableShippingCostUpdates =
          Oe.ENABLE_SHIPPING_COST_UPDATES === "true"));
  }
  saveToEnvironmentFile() {
    return `
# Financial Configuration Settings
COST_VARIANCE_NOTIFICATION_THRESHOLD=${this.config.costVarianceNotificationThreshold}
COST_VARIANCE_HIGH_ALERT_THRESHOLD=${this.config.costVarianceHighAlertThreshold}

# Service Fee Settings
TRIAL_SERVICE_FEE=${this.config.serviceFees.trial.flatFee}
GROWTH_SERVICE_FEE_RATE=${this.config.serviceFees.growth.percentageRate}
CORPORATE_SERVICE_FEE_RATE=${this.config.serviceFees.corporate.percentageRate}

# Cost Distribution Settings
DEFAULT_COST_DISTRIBUTION_METHOD=${this.config.defaultCostDistributionMethod}
DEFAULT_FIXED_RATE_PER_M3=${this.config.defaultFixedRatePerM3}

# Transaction Settings
ALLOW_MULTIPLE_SHIPPING_COST_TRANSACTIONS=${this.config.allowMultipleShippingCostTransactions}
ENABLE_SHIPPING_COST_UPDATES=${this.config.enableShippingCostUpdates}
`.trim();
  }
}
const gr = Vt.getInstance();
gr.loadFromEnvironment();
class Ut {
  static calculateCostVariance(e, t) {
    const r = t - e,
      i = e > 0 ? (r / e) * 100 : 0;
    return { costVariance: r, costVariancePercentage: i };
  }
  static calculateProportionalDistribution(e, t) {
    if (!e || e.length === 0)
      throw new Error(
        "Cannot calculate proportional distribution: no orders provided",
      );
    if (t < 0)
      throw new Error(
        "Cannot calculate proportional distribution: shipping cost cannot be negative",
      );
    const r = e.filter((o) =>
      o.customerId
        ? o.value < 0
          ? (console.warn(
              `Order ${o.id} has negative value (${o.value}), skipping from distribution`,
            ),
            !1)
          : o.value > 0
        : (console.warn(
            `Order ${o.id} has no customer ID, skipping from distribution`,
          ),
          !1),
    );
    if (r.length === 0)
      throw new Error(
        "Cannot calculate proportional distribution: no valid orders with positive values",
      );
    const i = r.reduce((o, a) => o + a.value, 0),
      n = new Map();
    console.log("PROPORTIONAL DISTRIBUTION DEBUG:", {
      totalShippingCost: t,
      totalValue: i,
      orderDetails: r.map((o) => ({
        customerId: o.customerId,
        orderValue: o.value,
        volumeM3: o.volumeM3,
        description: o.description,
      })),
    });
    for (const o of r) {
      const a = o.value / i,
        c = t * a;
      (console.log(
        `Customer ${o.customerId}: orderValue=${o.value}, share=${(a * 100).toFixed(2)}%, cost=${c.toFixed(2)}`,
      ),
        n.set(o.customerId, (n.get(o.customerId) || 0) + c));
    }
    return (console.log("FINAL DISTRIBUTION:", Object.fromEntries(n)), n);
  }
  static calculateFixedRateDistribution(e, t) {
    const r = new Map();
    for (const i of e) {
      const n = i.volumeM3 * t;
      r.set(i.customerId, (r.get(i.customerId) || 0) + n);
    }
    return r;
  }
  static calculateVolumeProportionalDistribution(e, t) {
    if (!e || e.length === 0)
      throw new Error(
        "Cannot calculate volume distribution: no orders provided",
      );
    if (t < 0)
      throw new Error(
        "Cannot calculate volume distribution: shipping cost cannot be negative",
      );
    const r = e
      .map((o) => {
        if (!o.customerId)
          return (
            console.warn(
              `Order ${o.id} has no customer ID, skipping from distribution`,
            ),
            null
          );
        const a = Number(o.volumeM3 || 0),
          c = Number(o.weightKG || 0),
          u = Math.max(a, c / 1e3);
        return !Number.isFinite(u) || u <= 0
          ? (console.warn(
              `Order ${o.id} has no positive chargeable units (volume=${o.volumeM3}, weight=${o.weightKG}), skipping from distribution`,
            ),
            null)
          : { order: o, chargeableUnits: u };
      })
      .filter((o) => o !== null);
    if (r.length === 0)
      throw new Error(
        "Cannot calculate volume distribution: no valid orders with positive chargeable units",
      );
    const i = r.reduce((o, a) => o + a.chargeableUnits, 0),
      n = new Map();
    console.log("VOLUME-BASED DISTRIBUTION DEBUG:", {
      totalShippingCost: t,
      totalChargeableUnits: i,
      orderDetails: r.map(({ order: o, chargeableUnits: a }) => ({
        customerId: o.customerId,
        volumeM3: o.volumeM3,
        weightKG: o.weightKG,
        chargeableUnits: a,
        orderValue: o.value,
        description: o.description,
      })),
    });
    for (const { order: o, chargeableUnits: a } of r) {
      const c = a / i,
        u = t * c;
      (console.log(
        `Customer ${o.customerId}: chargeableUnits=${a.toFixed(3)}, share=${(c * 100).toFixed(2)}%, cost=${u.toFixed(2)}`,
      ),
        n.set(o.customerId, (n.get(o.customerId) || 0) + u));
    }
    return (
      console.log("FINAL VOLUME DISTRIBUTION:", Object.fromEntries(n)),
      n
    );
  }
  static calculateContainerUtilization(e, t) {
    const r = $r.find((c) => c.id === t);
    if (!r) return { spacePercentage: 0, weightPercentage: 0 };
    const i = e.reduce((c, u) => c + u.volumeM3, 0),
      n = e.reduce((c, u) => c + u.weightKG, 0),
      o = (i / r.maxVolumeM3) * 100,
      a = (n / r.maxWeightKG) * 100;
    return {
      spacePercentage: Math.min(o, 100),
      weightPercentage: Math.min(a, 100),
    };
  }
  static calculateTotalOrderValue(e) {
    return e.reduce((t, r) => t + r.value, 0);
  }
  static calculateTotalVolume(e) {
    return e.reduce((t, r) => t + r.volumeM3, 0);
  }
  static calculateTotalWeight(e) {
    return e.reduce((t, r) => t + r.weightKG, 0);
  }
  static calculateEstimatedShippingCost(e, t, r = 500) {
    const i = t || gr.getDefaultFixedRatePerM3(),
      o = this.calculateTotalVolume(e) * i;
    return Math.max(o, r);
  }
  static calculateServiceFee(e, t) {
    return gr.getServiceFee(t, e);
  }
  static calculateCostPerUnit(e, t) {
    const r = this.calculateTotalVolume(t),
      i = this.calculateTotalWeight(t),
      n = this.calculateTotalOrderValue(t);
    return {
      costPerM3: r > 0 ? e / r : 0,
      costPerKG: i > 0 ? e / i : 0,
      costPerDollar: n > 0 ? e / n : 0,
    };
  }
  static validateContainerCapacity(e, t) {
    const r = $r.find((c) => c.id === t);
    if (!r) return { isValid: !1, volumeExcess: 0, weightExcess: 0 };
    const i = this.calculateTotalVolume(e),
      n = this.calculateTotalWeight(e),
      o = Math.max(0, i - r.maxVolumeM3),
      a = Math.max(0, n - r.maxWeightKG);
    return { isValid: o === 0 && a === 0, volumeExcess: o, weightExcess: a };
  }
  static calculateConsolidationSavings(e, t) {
    const r = t.reduce((o, a) => o + a, 0),
      i = r - e,
      n = r > 0 ? (i / r) * 100 : 0;
    return { totalSavings: i, savingsPercentage: n };
  }
}
var ot = ((s) => (
  (s.COST_DISTRIBUTION_CALCULATED = "cost_distribution_calculated"),
  (s.COST_DISTRIBUTION_RESET = "cost_distribution_reset"),
  (s.COST_DISTRIBUTION_REDISTRIBUTED = "cost_distribution_redistributed"),
  (s.PAYMENT_TRANSACTION_CREATED = "payment_transaction_created"),
  (s.PAYMENT_TRANSACTION_UPDATED = "payment_transaction_updated"),
  (s.PAYMENT_TRANSACTION_DELETED = "payment_transaction_deleted"),
  (s.CONSOLIDATION_SHIPPING_COST_UPDATED =
    "consolidation_shipping_cost_updated"),
  (s.CONSOLIDATION_METHOD_CHANGED = "consolidation_method_changed"),
  (s.CONSOLIDATION_ORDERS_UPDATED = "consolidation_orders_updated"),
  (s.CONSOLIDATION_STATUS_UPDATED = "consolidation_status_updated"),
  (s.CONSOLIDATION_DETAILS_UPDATED = "consolidation_details_updated"),
  (s.ORDER_DETAILS_UPDATED = "order_details_updated"),
  (s.ORDER_STATUS_UPDATED = "order_status_updated"),
  (s.SHIPMENT_CREATED = "shipment_created"),
  (s.SHIPMENT_TRACKING_UPDATED = "shipment_tracking_updated"),
  (s.SHIPMENT_STATUS_UPDATED = "shipment_status_updated"),
  (s.SHIPMENT_DETAILS_UPDATED = "shipment_details_updated"),
  (s.CONFIG_UPDATED = "config_updated"),
  (s.INVALID_ORDER_ADDITION_BLOCKED = "invalid_order_addition_blocked"),
  (s.UNAUTHORIZED_ACCESS_BLOCKED = "unauthorized_access_blocked"),
  s
))(ot || {});
class Ht {
  constructor() {
    ((this.auditLogs = []), (this.maxLogSize = 1e4));
  }
  static getInstance() {
    return (Ht.instance || (Ht.instance = new Ht()), Ht.instance);
  }
  async logAction(e, t, r, i = {}) {
    const n = {
      id: this.generateId(),
      timestamp: new Date(),
      action: e,
      entityType: t,
      entityId: r,
      ...i,
    };
    return (
      this.auditLogs.push(n),
      this.auditLogs.length > this.maxLogSize &&
        (this.auditLogs = this.auditLogs.slice(-this.maxLogSize)),
      await this.persistToDatabase(n),
      n.id
    );
  }
  async logCostDistribution(e, t, r, i, n) {
    return this.logAction("cost_distribution_calculated", "consolidation", e, {
      userId: n,
      metadata: {
        distributionMethod: t,
        totalShippingCost: r,
        customerShares: Object.fromEntries(i),
        distributionTimestamp: new Date().toISOString(),
      },
    });
  }
  async logCostDistributionReset(e, t, r) {
    return this.logAction("cost_distribution_reset", "consolidation", e, {
      userId: r,
      reason: t,
      metadata: { resetTimestamp: new Date().toISOString() },
    });
  }
  async logCostRedistribution(e, t, r, i, n, o) {
    const a = [{ field: "shippingCost", previousValue: t, newValue: r }];
    return this.logAction(
      "cost_distribution_redistributed",
      "consolidation",
      e,
      {
        userId: o,
        changes: a,
        metadata: {
          previousDistribution: Object.fromEntries(i),
          newDistribution: Object.fromEntries(n),
          redistributionTimestamp: new Date().toISOString(),
        },
      },
    );
  }
  async logPaymentTransaction(e, t, r, i) {
    return this.logAction(e, "payment_transaction", t, {
      userId: i,
      newState: r,
      metadata: {
        transactionType: r == null ? void 0 : r.type,
        amount: r == null ? void 0 : r.amount,
        customerId: r == null ? void 0 : r.customer_id,
        consolidationId: r == null ? void 0 : r.related_consolidation_id,
      },
    });
  }
  async logConfigChange(e, t, r) {
    const i = [];
    for (const n in t)
      e[n] !== t[n] &&
        i.push({ field: n, previousValue: e[n], newValue: t[n] });
    return this.logAction("config_updated", "config", "system", {
      userId: r,
      previousState: e,
      newState: t,
      changes: i,
    });
  }
  async logSecurityViolation(e, t, r, i) {
    return this.logAction(e, "order", t, {
      userId: i,
      metadata: {
        ...r,
        violationTimestamp: new Date().toISOString(),
        severity: "high",
      },
    });
  }
  getAuditLogsForEntity(e, t) {
    return this.auditLogs
      .filter((r) => r.entityType === e && r.entityId === t)
      .sort((r, i) => i.timestamp.getTime() - r.timestamp.getTime());
  }
  getAuditLogsByAction(e) {
    return this.auditLogs
      .filter((t) => t.action === e)
      .sort((t, r) => r.timestamp.getTime() - t.timestamp.getTime());
  }
  getRecentAuditLogs(e = 100) {
    return this.auditLogs
      .sort((t, r) => r.timestamp.getTime() - t.timestamp.getTime())
      .slice(0, e);
  }
  searchAuditLogs(e) {
    return this.auditLogs
      .filter(
        (t) =>
          !(
            (e.entityType && t.entityType !== e.entityType) ||
            (e.entityId && t.entityId !== e.entityId) ||
            (e.action && t.action !== e.action) ||
            (e.userId && t.userId !== e.userId) ||
            (e.fromDate && t.timestamp < e.fromDate) ||
            (e.toDate && t.timestamp > e.toDate)
          ),
      )
      .sort((t, r) => r.timestamp.getTime() - t.timestamp.getTime());
  }
  exportAuditLogs(e) {
    const t = e ? this.searchAuditLogs(e) : this.auditLogs;
    return JSON.stringify(t, null, 2);
  }
  generateId() {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  async persistToDatabase(e) {}
}
const $e = Ht.getInstance(),
  as = {
    customer: "C",
    order: "O",
    consolidation: "CON",
    payment: "P",
    supplier: "S",
    shipment: "SH",
  },
  Se = (s, e, t = 6) => {
    if (!s || typeof s != "string") return `#${as[e]}-N/A`;
    try {
      const i = s.replace(/-/g, "").toUpperCase().slice(-t);
      return `#${as[e]}-${i}`;
    } catch (r) {
      return (console.warn("Error formatting UUID:", r), `#${as[e]}-ERROR`);
    }
  },
  Hc = async (s, e) => {
    if (!s) return !1;
    try {
      return (await navigator.clipboard.writeText(s), !0);
    } catch (t) {
      console.warn("Failed to copy ID to clipboard:", t);
      try {
        const r = document.createElement("textarea");
        return (
          (r.value = s),
          document.body.appendChild(r),
          r.select(),
          document.execCommand("copy"),
          document.body.removeChild(r),
          !0
        );
      } catch (r) {
        return (console.error("Clipboard copy failed:", r), !1);
      }
    }
  };
class zt {
  constructor() {
    this.transformDatabaseTransaction = (e) => ({
      id: e.id,
      customerId: e.customer_id,
      date: e.date,
      type: this.normalizeTransactionType(e.type),
      description: e.description,
      amount: e.amount,
      relatedOrderId: e.related_order_id,
      relatedConsolidationId: e.related_consolidation_id,
      relatedShipmentId: e.related_shipment_id,
      idempotencyKey: e.idempotency_key,
      isAdjustment: e.is_adjustment,
      adjustmentReason: e.adjustment_reason,
    });
  }
  static getInstance() {
    return (zt.instance || (zt.instance = new zt()), zt.instance);
  }
  async createTransaction(e, t = !1, r) {
    if (e.type === ee.ShippingCost && e.amount > 0)
      throw new Error(
        `Invalid shipping cost amount: ${e.amount}. Shipping costs must be negative or zero values (charges to customers).`,
      );
    if (e.type === ee.IncomingPayment && e.amount <= 0)
      throw new Error(
        `Invalid payment amount: ${e.amount}. Payments must be positive values.`,
      );
    if (
      e.type === ee.ShippingCost &&
      !e.relatedConsolidationId &&
      !e.relatedOrderId
    )
      throw new Error(
        "Shipping cost transactions must have either a related consolidation ID or order ID.",
      );
    if (
      e.type === ee.ShippingCost &&
      e.relatedConsolidationId &&
      !t &&
      !e.idempotencyKey
    ) {
      const o = await this.findDuplicateShippingTransaction(e);
      if (o.length > 0)
        return (
          console.log("Duplicate transaction detected, skipping:", e),
          o[0]
        );
    }
    const i = { ...e, id: crypto.randomUUID(), date: new Date().toISOString() };
    console.log("💰 CREATING TRANSACTION:", {
      type: i.type,
      amount: i.amount,
      customerId: i.customerId,
      consolidationId: i.relatedConsolidationId,
      shipmentId: i.relatedShipmentId,
      description: i.description,
      isAdjustment: t,
      adjustmentReason: r,
    });
    const { error: n } = await _.from("payment_transactions").insert([
      {
        id: i.id,
        customer_id: i.customerId,
        amount: i.amount,
        description: i.description,
        type: i.type,
        date: i.date,
        related_order_id: i.relatedOrderId,
        related_consolidation_id: i.relatedConsolidationId,
        related_shipment_id: i.relatedShipmentId,
        idempotency_key: i.idempotencyKey || null,
        is_adjustment: t,
        adjustment_reason: r,
      },
    ]);
    if (n) {
      if (e.idempotencyKey && this.isIdempotencyConflict(n)) {
        const o = await this.findTransactionByIdempotencyKey(e.idempotencyKey);
        if (o) return o;
      }
      throw (
        console.error("Error saving transaction:", n),
        new Error("Failed to save transaction: " + n.message)
      );
    }
    await this.createTransactionNotification(i);
    try {
      await $e.logPaymentTransaction(ot.PAYMENT_TRANSACTION_CREATED, i.id, {
        id: i.id,
        customer_id: i.customerId,
        amount: i.amount,
        description: i.description,
        type: i.type,
        date: i.date,
        related_order_id: i.relatedOrderId,
        related_consolidation_id: i.relatedConsolidationId,
        related_shipment_id: i.relatedShipmentId,
      });
    } catch (o) {
      console.warn("Audit log failed (non-fatal):", o);
    }
    return i;
  }
  normalizeTransactionType(e) {
    const t = String(e || "");
    return t === "Payment"
      ? ee.IncomingPayment
      : t === "Fee"
        ? ee.ServiceFee
        : t === "Refund"
          ? ee.RefundPayout
          : Object.values(ee).includes(t)
            ? t
            : ee.MiscellaneousCost;
  }
  async distributeShippingCost(e, t, r, i, n, o = !1, a) {
    console.log("🚨🚨🚨 UPDATED CODE IS RUNNING - NEW VERSION! 🚨🚨🚨");
    const { data: c, error: u } = await _.from("consolidations")
      .select("*")
      .eq("id", e)
      .single();
    if (u || !c)
      throw (
        console.error("❌ Failed to fetch fresh consolidation data:", u),
        new Error("Failed to fetch consolidation data for distribution")
      );
    const h = {
        ...r,
        costDistributionMethod: c.cost_distribution_method,
        fixedRatePerM3: c.fixed_rate_per_m3,
        shippingCostDistributed: c.shipping_cost_distributed,
      },
      p = i.filter((y) => r.orderIds.includes(y.id));
    if (
      (p.reduce((y, b) => y + b.value, 0),
      console.log("🚨🚨🚨 DISTRIBUTION METHOD DEBUG (FRESH DATA) 🚨🚨🚨:", {
        consolidationId: e,
        oldMethod: r.costDistributionMethod,
        freshMethod: h.costDistributionMethod,
        costDistributionMethodType: typeof h.costDistributionMethod,
        fixedRatePerM3: h.fixedRatePerM3,
        consolidationName: h.name,
        whichPathWillTake:
          h.costDistributionMethod === "fixed_rate_m3"
            ? "FIXED_RATE"
            : h.costDistributionMethod === "proportional"
              ? "LEGACY_PROPORTIONAL_CONVERTED_TO_VOLUME"
              : h.costDistributionMethod === "volume_proportional"
                ? "VOLUME_BASED"
                : "UNKNOWN",
      }),
      h.costDistributionMethod === "fixed_rate_m3" && h.fixedRatePerM3)
    ) {
      const y = Ut.calculateFixedRateDistribution(p, h.fixedRatePerM3);
      (await $e.logCostDistribution(e, "fixed_rate_m3", t, y),
        await this.distributeFixedRateShipping(e, t, h, p, n, o, a));
    } else if (h.costDistributionMethod === "proportional") {
      console.log(
        "⚠️ LEGACY PROPORTIONAL METHOD DETECTED - Converting to volume-based distribution",
      );
      const y = Ut.calculateVolumeProportionalDistribution(p, t);
      (await $e.logCostDistribution(e, "volume_proportional", t, y),
        await this.distributeVolumeProportionalShipping(e, t, h, p, n, o, a));
    } else if (h.costDistributionMethod === "volume_proportional") {
      (console.log("✅ USING VOLUME-BASED DISTRIBUTION!"),
        console.log(
          "📦 ORDERS FOR VOLUME CALCULATION:",
          p.map((b) => ({
            id: b.id,
            customerId: b.customerId,
            description: b.description,
            volumeM3: b.volumeM3,
            value: b.value,
          })),
        ));
      const y = Ut.calculateVolumeProportionalDistribution(p, t);
      (await $e.logCostDistribution(e, "volume_proportional", t, y),
        await this.distributeVolumeProportionalShipping(e, t, h, p, n, o, a));
    } else {
      console.log(
        "🚨 UNKNOWN METHOD, DEFAULTING TO VOLUME-BASED:",
        h.costDistributionMethod,
      );
      const y = Ut.calculateVolumeProportionalDistribution(p, t);
      (await $e.logCostDistribution(e, "volume_proportional", t, y),
        await this.distributeVolumeProportionalShipping(e, t, h, p, n, o, a));
    }
  }
  async createSingleCustomerShippingCost(e, t, r, i, n) {
    return await this.createTransaction({
      customerId: r,
      type: ee.ShippingCost,
      description: `Shipping cost for consolidation: ${Se(e, "consolidation")}`,
      amount: -Math.abs(t),
      relatedConsolidationId: e,
      relatedShipmentId: n,
      idempotencyKey: this.buildShippingChargeIdempotencyKey({
        consolidationId: e,
        shipmentId: n,
        customerId: r,
        distributionMethod: "single_customer",
        amount: t,
      }),
    });
  }
  calculateCostVariance(e, t) {
    const r = t - e,
      i = e > 0 ? (r / e) * 100 : 0;
    return { costVariance: r, costVariancePercentage: i };
  }
  async createIncomingPayment(e, t, r) {
    return await this.createTransaction({
      customerId: e,
      type: ee.IncomingPayment,
      description: r,
      amount: Math.abs(t),
    });
  }
  async createRefundPayout(e, t, r) {
    return await this.createTransaction({
      customerId: e,
      type: ee.RefundPayout,
      description: r,
      amount: -Math.abs(t),
    });
  }
  async createMiscellaneousCost(e, t, r, i, n) {
    return await this.createTransaction({
      customerId: e,
      type: ee.MiscellaneousCost,
      description: r,
      amount: -Math.abs(t),
      relatedOrderId: i,
      relatedConsolidationId: n,
    });
  }
  async fetchAllTransactions() {
    const { data: e, error: t } = await _.from("payment_transactions")
      .select("*")
      .order("date", { ascending: !1 });
    if (t)
      throw (
        console.error("Error fetching transactions:", t),
        new Error("Failed to fetch transactions")
      );
    return (e || []).map(this.transformDatabaseTransaction);
  }
  async fetchPage(e) {
    const {
        page: t,
        pageSize: r,
        customerId: i = null,
        isAdmin: n = !1,
        searchTerm: o = "",
        type: a = "all",
      } = e,
      c = Math.max(1, t),
      u = Math.max(1, Math.min(100, r)),
      h = (c - 1) * u,
      p = h + u - 1;
    let y = _.from("payment_transactions")
      .select("*", { count: "exact" })
      .order("date", { ascending: !1 })
      .range(h, p);
    if (n) i && (y = y.eq("customer_id", i));
    else {
      if (!i) return { transactions: [], totalCount: 0 };
      y = y.eq("customer_id", i);
    }
    const b = String(o || "").trim();
    if (b) {
      const k = b.replace(/[%_,]/g, "\\$&"),
        I = [`description.ilike.%${k}%`, `type.ilike.%${k}%`];
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        b,
      ) &&
        I.push(
          `id.eq.${b}`,
          `customer_id.eq.${b}`,
          `related_order_id.eq.${b}`,
          `related_consolidation_id.eq.${b}`,
          `related_shipment_id.eq.${b}`,
        );
      y = y.or(I.join(","));
    }
    a && a !== "all" && (y = y.eq("type", a));
    const { data: k, error: I, count: P } = await y;
    if (I)
      throw (
        console.error("Error fetching paginated transactions:", I),
        new Error("Failed to fetch paginated transactions")
      );
    return {
      transactions: (k || []).map(this.transformDatabaseTransaction),
      totalCount: P || 0,
    };
  }
  async getByCustomerId(e) {
    if (!e) return [];
    const { data: t, error: r } = await _.from("payment_transactions")
      .select("*")
      .eq("customer_id", e)
      .order("date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching customer transactions:", r),
        new Error("Failed to fetch customer transactions")
      );
    return (t || []).map(this.transformDatabaseTransaction);
  }
  async deleteTransaction(e) {
    const { error: t } = await _.from("payment_transactions")
      .delete()
      .eq("id", e);
    if (t)
      throw (
        console.error("Error deleting transaction:", t),
        new Error("Failed to delete transaction")
      );
    try {
      await $e.logPaymentTransaction(ot.PAYMENT_TRANSACTION_DELETED, e, {
        id: e,
      });
    } catch (r) {
      console.warn("Audit log failed (non-fatal):", r);
    }
  }
  async findDuplicateShippingTransaction(e) {
    const { data: t, error: r } = await _.from("payment_transactions")
      .select("*")
      .eq("customer_id", e.customerId)
      .eq("related_consolidation_id", e.relatedConsolidationId)
      .eq("type", ee.ShippingCost)
      .eq("amount", e.amount)
      .gte("date", new Date(Date.now() - 6e4).toISOString());
    return r
      ? (console.error("Error checking for duplicates:", r), [])
      : (t || []).map(this.transformDatabaseTransaction);
  }
  isIdempotencyConflict(e) {
    const t = String((e == null ? void 0 : e.message) || "").toLowerCase(),
      r = String((e == null ? void 0 : e.details) || "").toLowerCase();
    return (
      (e == null ? void 0 : e.code) === "23505" &&
      (t.includes("idempotency") ||
        r.includes("idempotency") ||
        t.includes("uniq_payment_transactions_idempotency_key"))
    );
  }
  async findTransactionByIdempotencyKey(e) {
    const { data: t, error: r } = await _.from("payment_transactions")
      .select("*")
      .eq("idempotency_key", e)
      .maybeSingle();
    return r || !t ? null : this.transformDatabaseTransaction(t);
  }
  buildShippingChargeIdempotencyKey(e) {
    const t = e.shipmentId
        ? `shipment:${e.shipmentId}`
        : `consolidation:${e.consolidationId}`,
      r = e.isAdjustment ? "adjustment" : "initial",
      i = Math.abs(e.amount).toFixed(2);
    return `shipping-charge:${t}:${e.distributionMethod}:${e.customerId}:${r}:${i}`;
  }
  async distributeFixedRateShipping(e, t, r, i, n, o = !1, a) {
    const c = new Map();
    let u = 0;
    for (const p of i) {
      const y = p.volumeM3 * (r.fixedRatePerM3 || 0);
      (c.set(p.customerId, (c.get(p.customerId) || 0) + y), (u += y));
    }
    for (const [p, y] of c)
      y > 0 &&
        (await this.createTransaction(
          {
            customerId: p,
            type: ee.ShippingCost,
            description: `Fixed rate shipping cost for consolidation: ${Se(r.id, "consolidation")}`,
            amount: -Math.abs(y),
            relatedConsolidationId: e,
            relatedShipmentId: n,
            idempotencyKey: this.buildShippingChargeIdempotencyKey({
              consolidationId: e,
              shipmentId: n,
              customerId: p,
              distributionMethod: "fixed_rate_m3",
              amount: y,
              isAdjustment: o,
            }),
          },
          o,
          a,
        ));
    if (u > 0) {
      console.log(
        `💰 Updating consolidation ${e} with total_billed_amount: ${u}`,
      );
      const { error: p } = await _.from("consolidations")
        .update({ total_billed_amount: u })
        .eq("id", e);
      p
        ? console.error("Error updating total_billed_amount:", p)
        : console.log(
            `✅ Successfully updated total_billed_amount for consolidation ${e}`,
          );
    }
    const h = Number((u - Math.abs(t || 0)).toFixed(2));
    Math.abs(h) > 0.009 &&
      (await this.createTransaction(
        {
          customerId: null,
          type: ee.MiscellaneousCost,
          description: `Fixed-rate shipping variance for consolidation ${Se(r.id, "consolidation")} (billed $${u.toFixed(2)} vs actual $${Math.abs(t || 0).toFixed(2)})`,
          amount: h,
          relatedConsolidationId: e,
          relatedShipmentId: n,
          idempotencyKey: `shipping-variance:shipment:${n || "none"}:consolidation:${e}`,
        },
        o,
        a,
      ));
  }
  async distributeProportionalShipping(e, t, r, i, n) {
    try {
      const o = Ut.calculateProportionalDistribution(i, t);
      for (const [a, c] of o) {
        const u = -Math.abs(c);
        u < 0 &&
          (await this.createTransaction({
            customerId: a,
            type: ee.ShippingCost,
            description: `Proportional shipping cost for consolidation: ${Se(r.id, "consolidation")}`,
            amount: u,
            relatedConsolidationId: e,
            idempotencyKey: this.buildShippingChargeIdempotencyKey({
              consolidationId: e,
              customerId: a,
              distributionMethod: "legacy_proportional",
              amount: c,
            }),
          }));
      }
    } catch (o) {
      throw (
        console.error(
          `Error distributing proportional shipping cost for consolidation ${e}:`,
          o,
        ),
        o
      );
    }
  }
  async distributeVolumeProportionalShipping(e, t, r, i, n, o = !1, a) {
    try {
      const c = Ut.calculateVolumeProportionalDistribution(i, t);
      for (const [u, h] of c) {
        const p = -Math.abs(h);
        p < 0 &&
          (await this.createTransaction(
            {
              customerId: u,
              type: ee.ShippingCost,
              description: `Volume-based shipping cost for consolidation: ${Se(r.id, "consolidation")}`,
              amount: p,
              relatedConsolidationId: e,
              relatedShipmentId: n,
              idempotencyKey: this.buildShippingChargeIdempotencyKey({
                consolidationId: e,
                shipmentId: n,
                customerId: u,
                distributionMethod: "volume_proportional",
                amount: h,
                isAdjustment: o,
              }),
            },
            o,
            a,
          ));
      }
    } catch (c) {
      throw (
        console.error(
          `Error distributing volume-based shipping cost for consolidation ${e}:`,
          c,
        ),
        c
      );
    }
  }
  async createTransactionNotification(e) {
    if (!e.customerId) return;
    let t = "Fee";
    (e.type === ee.ShippingCost
      ? (t = "Shipping Cost")
      : e.type === ee.OrderCostReversal ||
          e.type === ee.ServiceFeeReversal ||
          e.type === ee.ShippingCostReversal
        ? (t = "Reversal")
        : e.type === ee.RefundPayout
          ? (t = "Refund")
          : e.type === ee.ServiceFee
            ? (t = "Service Fee")
            : e.type === ee.OrderCost
              ? (t = "Order Cost")
              : e.type === ee.IncomingPayment && (t = "Payment"),
      await ie.createPaymentNotification(
        e.customerId,
        e.amount,
        t,
        e.description,
        e.id,
      ));
  }
}
const He = zt.getInstance();
class Gt {
  constructor() {
    this.transformDatabaseShipment = (e) => ({
      id: e.id,
      type: e.type,
      relatedId: e.related_id,
      shippingDate: e.shipped_date,
      carrier: e.carrier,
      trackingUrl: e.tracking_url,
      estimatedDelivery: e.estimated_delivery,
      actualDelivery: e.actual_delivery,
      description: e.description,
      status: e.status,
      customerId: e.customer_id,
      involvedCustomerIds: e.involved_customer_ids || [],
      isMixed: e.is_mixed,
      origin: e.origin,
      destination: e.destination,
      orderId: e.order_id,
      consolidationId: e.consolidation_id,
    });
  }
  static getInstance() {
    return (Gt.instance || (Gt.instance = new Gt()), Gt.instance);
  }
  async fetchAll() {
    const { data: e, error: t } = await _.from("shipments")
      .select("*")
      .order("shipped_date", { ascending: !1 });
    if (t)
      throw (
        console.error("Error fetching shipments:", t),
        new Error("Failed to fetch shipments")
      );
    return (e || []).map(this.transformDatabaseShipment);
  }
  async fetchPage(e) {
    const {
        page: t,
        pageSize: r,
        currentCustomerId: i = null,
        isAdmin: n = !1,
        query: o = "",
        type: a = "all",
        customerFilterId: c = null,
      } = e,
      u = Math.max(1, t),
      h = Math.max(1, Math.min(100, r)),
      p = (u - 1) * h,
      y = p + h - 1;
    let b = _.from("shipments")
      .select("*", { count: "exact" })
      .order("shipped_date", { ascending: !1 })
      .range(p, y);
    if (!n) {
      if (!i) return { shipments: [], totalCount: 0 };
      b = b.or(`customer_id.eq.${i},involved_customer_ids.cs.{${i}}`);
    } else
      c &&
        c !== "all" &&
        (b = b.or(`customer_id.eq.${c},involved_customer_ids.cs.{${c}}`));
    a && a !== "all" && (b = b.eq("type", a));
    const k = String(o || "").trim();
    if (k) {
      const I = k.replace(/[%_,]/g, "\\$&");
      b = b.ilike("description", `%${I}%`);
    }
    const { data: I, error: P, count: L } = await b;
    if (P)
      throw (
        console.error("Error fetching paginated shipments:", P),
        new Error("Failed to fetch paginated shipments")
      );
    return {
      shipments: (I || []).map(this.transformDatabaseShipment),
      totalCount: L || 0,
    };
  }
  async create(e) {
    const t = {
        type: e.type,
        related_id: e.relatedId,
        shipped_date: new Date().toISOString(),
        carrier: e.carrier,
        tracking_url: e.trackingUrl,
        estimated_delivery: e.estimatedDelivery
          ? new Date(e.estimatedDelivery).toISOString()
          : null,
        actual_delivery: e.actualDelivery
          ? new Date(e.actualDelivery).toISOString()
          : null,
        description: e.description,
        status: e.status,
        customer_id: e.customerId,
        involved_customer_ids: e.involvedCustomerIds,
        is_mixed: e.isMixed,
        origin: e.origin,
        destination: e.destination,
        consolidation_id: e.type === "consolidation" ? e.relatedId : null,
        order_id: e.type === "individual" ? e.relatedId : null,
        idempotency_key: e.idempotencyKey || null,
      },
      { data: r, error: i } = await _.from("shipments")
        .insert([t])
        .select()
        .single();
    if (i)
      throw (
        console.error("Error creating shipment:", i),
        new Error("Failed to create shipment")
      );
    const n = this.transformDatabaseShipment(r);
    return (
      await this.createShipmentNotifications(
        n.id,
        n.customerId,
        n.involvedCustomerIds,
        n.description,
        String(n.status),
      ),
      n
    );
  }
  async notifyShipmentCreated(e) {
    await this.createShipmentNotifications(
      e.id,
      e.customerId,
      e.involvedCustomerIds,
      e.description,
      String(e.status),
    );
  }
  async update(e, t) {
    const r = {};
    (t.carrier !== void 0 && (r.carrier = t.carrier),
      t.trackingUrl !== void 0 && (r.tracking_url = t.trackingUrl),
      t.status !== void 0 && (r.status = t.status),
      t.description !== void 0 && (r.description = t.description),
      t.origin !== void 0 && (r.origin = t.origin),
      t.destination !== void 0 && (r.destination = t.destination),
      t.estimatedDelivery !== void 0 &&
        (r.estimated_delivery = t.estimatedDelivery
          ? new Date(t.estimatedDelivery).toISOString()
          : null),
      t.actualDelivery !== void 0 &&
        (r.actual_delivery = t.actualDelivery
          ? new Date(t.actualDelivery).toISOString()
          : null));
    const { data: i, error: n } = await _.from("shipments")
      .update(r)
      .eq("id", e)
      .select()
      .single();
    if (n)
      throw (
        console.error("Error updating shipment:", n),
        new Error("Failed to update shipment")
      );
    return this.transformDatabaseShipment(i);
  }
  async updateStatus(e, t, r) {
    const i = r.status;
    console.log("Updating shipment status:", {
      shipmentId: e,
      oldStatus: i,
      newStatus: t,
    });
    const n = String(t),
      o =
        n === String(d.Delivered) ||
        n === String(m.Delivered) ||
        n === String(d.Completed) ||
        n === String(m.Completed);
    (await this.update(e, {
      status: t,
      ...(o ? { actualDelivery: new Date().toISOString() } : {}),
    }),
      await this.createShipmentNotifications(
        e,
        r.customerId,
        r.involvedCustomerIds,
        r.description,
        String(t),
      ),
      console.log(`[DEBUG] Shipment ${e} status updated: ${i} → ${t}`));
  }
  async updateTracking(e, t, r) {
    await this.update(e, { carrier: t, trackingUrl: r });
    const i = await this.getById(e);
    i &&
      (await this.createShipmentNotifications(
        e,
        i.customerId,
        i.involvedCustomerIds,
        `Tracking updated for ${i.description}`,
        `Carrier: ${t}`,
      ));
  }
  async getById(e) {
    const { data: t, error: r } = await _.from("shipments")
      .select("*")
      .eq("id", e)
      .single();
    return r
      ? (console.error("Error fetching shipment:", r), null)
      : t
        ? this.transformDatabaseShipment(t)
        : null;
  }
  async getByCustomerId(e) {
    const { data: t, error: r } = await _.from("shipments")
      .select("*")
      .or(`customer_id.eq.${e},involved_customer_ids.cs.{${e}}`)
      .order("shipped_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching shipments by customer:", r),
        new Error("Failed to fetch shipments by customer")
      );
    return (t || []).map(this.transformDatabaseShipment);
  }
  async getByOrderId(e) {
    const { data: t, error: r } = await _.from("shipments")
      .select("*")
      .eq("order_id", e)
      .order("shipped_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching shipments by order:", r),
        new Error("Failed to fetch shipments by order")
      );
    return (t || []).map(this.transformDatabaseShipment);
  }
  async getByConsolidationId(e) {
    const { data: t, error: r } = await _.from("shipments")
      .select("*")
      .eq("consolidation_id", e)
      .order("shipped_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching shipments by consolidation:", r),
        new Error("Failed to fetch shipments by consolidation")
      );
    return (t || []).map(this.transformDatabaseShipment);
  }
  async getByType(e) {
    const { data: t, error: r } = await _.from("shipments")
      .select("*")
      .eq("type", e)
      .order("shipped_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching shipments by type:", r),
        new Error("Failed to fetch shipments by type")
      );
    return (t || []).map(this.transformDatabaseShipment);
  }
  async getByStatus(e) {
    const { data: t, error: r } = await _.from("shipments")
      .select("*")
      .eq("status", e)
      .order("shipped_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching shipments by status:", r),
        new Error("Failed to fetch shipments by status")
      );
    return (t || []).map(this.transformDatabaseShipment);
  }
  async getInTransit() {
    const e = [
        m.InTransit,
        m.AtOriginPort,
        m.InTransitSea,
        m.AtDestinationPort,
        m.CustomsClearance,
        m.AwaitingDelivery,
        m.OutForDelivery,
        "InTransit",
        "AtOriginPort",
        "InTransitSea",
        "AtDestinationPort",
        "CustomsClearance",
        "AwaitingDelivery",
        "OutForDelivery",
      ],
      { data: t, error: r } = await _.from("shipments")
        .select("*")
        .in("status", e)
        .order("shipped_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching shipments in transit:", r),
        new Error("Failed to fetch shipments in transit")
      );
    return (t || []).map(this.transformDatabaseShipment);
  }
  async getDelivered() {
    const e = [d.Delivered, m.Delivered, m.Completed],
      { data: t, error: r } = await _.from("shipments")
        .select("*")
        .in("status", e)
        .order("shipped_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching delivered shipments:", r),
        new Error("Failed to fetch delivered shipments")
      );
    return (t || []).map(this.transformDatabaseShipment);
  }
  async delete(e) {
    const { error: t } = await _.from("shipments").delete().eq("id", e);
    if (t)
      throw (
        console.error("Error deleting shipment:", t),
        new Error("Failed to delete shipment")
      );
    await ie.createAdminNotification("Shipment has been deleted", {
      importance: K.Low,
      linkToPage: "shipments",
    });
  }
  async existsForRelatedId(e, t) {
    const { data: r, error: i } = await _.from("shipments")
      .select("id")
      .eq("related_id", e)
      .eq("type", t)
      .limit(1);
    return i
      ? (console.error("Error checking shipment existence:", i), !1)
      : (r || []).length > 0;
  }
  async getStatistics() {
    const [e, t, r, i, n] = await Promise.all([
      this.fetchAll(),
      this.getInTransit(),
      this.getDelivered(),
      this.getByType("individual"),
      this.getByType("consolidation"),
    ]);
    return {
      total: e.length,
      inTransit: t.length,
      delivered: r.length,
      individual: i.length,
      consolidation: n.length,
    };
  }
  async createShipmentNotifications(e, t, r, i, n) {
    const o = await ie.createShipmentNotification(e, t, r, i, n);
    console.log(`Created ${o.length} shipment notifications`);
  }
}
const yt = Gt.getInstance();
class Wt {
  constructor() {
    this.transformDatabaseOrder = (e) => ({
      id: e.id,
      description: e.description,
      value: e.value,
      supplierId: e.supplier_id,
      volumeM3: e.volume_m3,
      weightKG: e.weight_kg,
      customerId: e.customer_id,
      status: e.status,
      notes: e.notes,
      creationDate: e.creation_date,
    });
  }
  static getInstance() {
    return (Wt.instance || (Wt.instance = new Wt()), Wt.instance);
  }
  async fetchAll() {
    const { data: e, error: t } = await _.from("orders")
      .select("*")
      .order("creation_date", { ascending: !1 });
    if (t)
      throw (
        console.error("Error fetching orders:", t),
        new Error("Failed to fetch orders")
      );
    return (e || []).map(this.transformDatabaseOrder);
  }
  async fetchPage(e) {
    const {
        page: t,
        pageSize: r,
        searchTerm: i = "",
        supplierId: s = null,
        status: n = "",
        customerId: o = null,
        isAdmin: a = !1,
      } = e,
      c = Math.max(1, t),
      u = Math.max(1, Math.min(100, r)),
      h = (c - 1) * u,
      p = h + u - 1;
    let y = _.from("orders")
      .select("*", { count: "exact" })
      .order("creation_date", { ascending: !1 })
      .range(h, p);
    (o && (y = y.eq("customer_id", o)),
      s && (y = y.eq("supplier_id", s)),
      n && (y = y.eq("status", n)));
    const b = i.trim();
    if (b) {
      const L = b.replace(/[%_,]/g, "\\$&");
      y = y.ilike("description", `%${L}%`);
    }
    const { data: k, error: I, count: P } = await y;
    if (I)
      throw (
        console.error("Error fetching paginated orders:", I),
        new Error("Failed to fetch paginated orders")
      );
    return {
      orders: (k || []).map(this.transformDatabaseOrder),
      totalCount: P || 0,
    };
  }
  async create(e) {
    const t = {
        description: e.description,
        value: e.value,
        supplier_id: e.supplierId,
        volume_m3: e.volumeM3,
        weight_kg: e.weightKG,
        customer_id: e.customerId,
        status: e.status,
        notes: e.notes,
        creation_date: new Date().toISOString(),
      },
      { data: r, error: i } = await _.from("orders")
        .insert([t])
        .select()
        .single();
    if (i)
      throw (
        console.error("Error creating order:", i),
        new Error("Failed to create order")
      );
    const n = this.transformDatabaseOrder(r);
    return (
      await ie.createCustomerNotification(
        e.customerId,
        `New order "${e.description}" has been created`,
        { importance: K.Medium, linkToPage: "orders", linkToId: n.id },
      ),
      await ie.createAdminNotification(
        `New order "${e.description}" created for customer`,
        { importance: K.Low, linkToPage: "orders", linkToId: n.id },
      ),
      n
    );
  }
  async update(e, t) {
    const r = {};
    (t.description !== void 0 && (r.description = t.description),
      t.value !== void 0 && (r.value = t.value),
      t.supplierId !== void 0 && (r.supplier_id = t.supplierId),
      t.volumeM3 !== void 0 && (r.volume_m3 = t.volumeM3),
      t.weightKG !== void 0 && (r.weight_kg = t.weightKG),
      t.customerId !== void 0 && (r.customer_id = t.customerId),
      t.status !== void 0 && (r.status = t.status),
      t.notes !== void 0 && (r.notes = t.notes));
    const { data: i, error: n } = await _.from("orders")
      .update(r)
      .eq("id", e)
      .select()
      .single();
    if (n)
      throw (
        console.error("Error updating order:", n),
        new Error("Failed to update order")
      );
    return this.transformDatabaseOrder(i);
  }
  async updateStatus(e, t, r, i, n) {
    (await this.update(e, { status: t }),
      await ie.createOrderStatusNotification(e, String(r), String(t), n, i),
      await ie.createSystemNotification(
        `Order "${i}" status changed to ${String(t)}`,
        { linkToPage: "orders", linkToId: e },
      ));
  }
  async createIndividualShipment(e, t, r, i, n, o, a, c) {
    const u = await yt.create({
      type: "individual",
      relatedId: e,
      carrier: r,
      trackingUrl: i,
      estimatedDelivery: c,
      description: `Individual Order: ${Se(n.id, "order")}`,
      status: d.InTransit,
      customerId: n.customerId,
      involvedCustomerIds: [n.customerId],
      isMixed: !1,
      origin: o,
      destination: a,
      consolidationId: null,
      orderId: e,
    });
    (await this.update(e, { status: d.InTransit }),
      t > 0 &&
        (await He.createTransaction({
          customerId: n.customerId,
          type: "ShippingCost",
          description: `Individual shipping cost for order: ${Se(n.id, "order")}`,
          amount: -Math.abs(t),
          relatedOrderId: e,
          relatedShipmentId: u.id,
          idempotencyKey: `shipping-charge:shipment:${u.id}:individual_order:${n.customerId}:${Math.abs(t).toFixed(2)}`,
        })),
      await this.updateStatus(
        e,
        d.InTransit,
        n.status,
        n.description,
        n.customerId,
      ));
  }
  async delete(e) {
    const { error: t } = await _.from("orders").delete().eq("id", e);
    if (t)
      throw (
        console.error("Error deleting order:", t),
        new Error("Failed to delete order")
      );
    await ie.createAdminNotification("Order has been deleted", {
      importance: K.Low,
      linkToPage: "orders",
    });
  }
  async getByCustomerId(e) {
    const { data: t, error: r } = await _.from("orders")
      .select("*")
      .eq("customer_id", e)
      .order("creation_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching orders by customer:", r),
        new Error("Failed to fetch orders by customer")
      );
    return (t || []).map(this.transformDatabaseOrder);
  }
  async getBySupplierId(e) {
    const { data: t, error: r } = await _.from("orders")
      .select("*")
      .eq("supplier_id", e)
      .order("creation_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching orders by supplier:", r),
        new Error("Failed to fetch orders by supplier")
      );
    return (t || []).map(this.transformDatabaseOrder);
  }
  async getByStatus(e) {
    const { data: t, error: r } = await _.from("orders")
      .select("*")
      .eq("status", e)
      .order("creation_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching orders by status:", r),
        new Error("Failed to fetch orders by status")
      );
    return (t || []).map(this.transformDatabaseOrder);
  }
  async getReadyForConsolidation() {
    return this.getByStatus(d.Processing);
  }
  calculateTotalValue(e) {
    return e.reduce((t, r) => t + r.value, 0);
  }
  calculateTotalVolume(e) {
    return e.reduce((t, r) => t + r.volumeM3, 0);
  }
  calculateTotalWeight(e) {
    return e.reduce((t, r) => t + r.weightKG, 0);
  }
  validateOrder(e) {
    const t = [];
    return (
      (!e.description || e.description.trim() === "") &&
        t.push("Order description is required"),
      (!e.value || e.value <= 0) &&
        t.push("Order value must be greater than 0"),
      (!e.volumeM3 || e.volumeM3 <= 0) &&
        t.push("Volume must be greater than 0"),
      (!e.weightKG || e.weightKG <= 0) &&
        t.push("Weight must be greater than 0"),
      e.customerId || t.push("Customer is required"),
      e.supplierId || t.push("Supplier is required"),
      { isValid: t.length === 0, errors: t }
    );
  }
  validateOrderForConsolidation(e, t) {
    const r = [];
    return (
      ti.includes(e.status) ||
        r.push(
          `Order cannot be added to consolidation: status '${e.status}' is not eligible. Orders must be in ${ti.join(", ")} status.`,
        ),
      { isValid: r.length === 0, errors: r }
    );
  }
  async getOrdersEligibleForConsolidation() {
    return (await this.fetchAll()).filter(
      (t) => this.validateOrderForConsolidation(t).isValid,
    );
  }
}
const Rr = Wt.getInstance();
class Kt {
  constructor() {
    this.transformDatabaseConsolidation = (e) => ({
      id: e.id,
      name: e.name,
      route: e.route,
      departureDate: e.departure_date,
      creationDate: e.creation_date,
      orderIds: e.order_ids || [],
      containerTypeId: e.container_type_id,
      containerSpaceFilledPercentage: e.container_space_filled_percentage || 0,
      containerWeightFilledPercentage:
        e.container_weight_filled_percentage || 0,
      shippingCost: e.shipping_cost,
      estimatedShippingCost: e.estimated_shipping_cost ?? void 0,
      costVariance: e.cost_variance ?? void 0,
      costVariancePercentage: e.cost_variance_percentage ?? void 0,
      status: e.status,
      isMixed: e.is_mixed,
      customerId: e.customer_id,
      involvedCustomerIds: e.involved_customer_ids || [],
      shippingCostDistributed: e.shipping_cost_distributed,
      costDistributionMethod: e.cost_distribution_method,
      fixedRatePerM3: e.fixed_rate_per_m3,
      totalBilledAmount: e.total_billed_amount,
      notes: e.notes,
    });
  }
  static getInstance() {
    return (Kt.instance || (Kt.instance = new Kt()), Kt.instance);
  }
  async fetchAll() {
    const { data: e, error: t } = await _.from("consolidations_with_orders")
      .select("*")
      .order("creation_date", { ascending: !1 });
    if (t)
      throw (
        console.error("Error fetching consolidations:", t),
        new Error("Failed to fetch consolidations")
      );
    return (e || []).map(this.transformDatabaseConsolidation);
  }
  async getByCustomerId(e) {
    if (!e) return [];
    const { data: t, error: r } = await _.from("consolidations_with_orders")
      .select("*")
      .or(`customer_id.eq.${e},involved_customer_ids.cs.{${e}}`)
      .order("creation_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching customer consolidations:", r),
        new Error("Failed to fetch customer consolidations")
      );
    return (t || []).map(this.transformDatabaseConsolidation);
  }
  async create(e, t, r, i, n, o) {
    console.log("🏗️ CREATING CONSOLIDATION:", {
      name: e.name,
      estimatedShippingCost: t,
      estimatedShippingCostType: typeof t,
      isMixed: i,
      customerId: r,
      costDistributionMethod: n,
    });
    const a = {
        name: e.name,
        route: e.route,
        departure_date: e.departureDate,
        creation_date: new Date().toISOString(),
        container_type_id: e.containerTypeId,
        estimated_shipping_cost: t > 0 ? t : null,
        status: m.Planning,
        is_mixed: i,
        customer_id: r,
        involved_customer_ids: i ? [] : r ? [r] : [],
        shipping_cost_distributed: !1,
        cost_distribution_method: n || "volume_proportional",
        fixed_rate_per_m3: o,
        notes: e.notes,
      },
      { data: c, error: u } = await _.from("consolidations")
        .insert([a])
        .select()
        .single();
    if (u)
      throw (
        console.error("Error creating consolidation:", u),
        new Error("Failed to create consolidation")
      );
    const h = this.transformDatabaseConsolidation(c);
    return (
      !i &&
        r &&
        (await ie.createCustomerNotification(
          r,
          `New consolidation "${e.name}" has been created for your orders`,
          {
            importance: K.Medium,
            linkToPage: "consolidations",
            linkToId: h.id,
          },
        )),
      await ie.createAdminNotification(
        `New ${i ? "mixed" : "single-customer"} consolidation "${e.name}" created`,
        { importance: K.Low, linkToPage: "consolidations", linkToId: h.id },
      ),
      h
    );
  }
  async update(e, t) {
    const r = {};
    if (
      (t.name !== void 0 && (r.name = t.name),
      t.route !== void 0 && (r.route = t.route),
      t.departureDate !== void 0 && (r.departure_date = t.departureDate),
      t.containerTypeId !== void 0 && (r.container_type_id = t.containerTypeId),
      t.status !== void 0 && (r.status = t.status),
      t.notes !== void 0 && (r.notes = t.notes),
      t.shippingCost !== void 0 &&
        ((r.shipping_cost = t.shippingCost),
        t.estimatedShippingCost !== void 0))
    )
      if (t.estimatedShippingCost > 0) {
        const { costVariance: o, costVariancePercentage: a } =
          He.calculateCostVariance(t.estimatedShippingCost, t.shippingCost);
        ((r.cost_variance = o), (r.cost_variance_percentage = a));
      } else ((r.cost_variance = null), (r.cost_variance_percentage = null));
    (t.estimatedShippingCost !== void 0 &&
      ((r.estimated_shipping_cost =
        t.estimatedShippingCost > 0 ? t.estimatedShippingCost : null),
      t.estimatedShippingCost <= 0 &&
        ((r.cost_variance = null), (r.cost_variance_percentage = null))),
      t.costVariance !== void 0 && (r.cost_variance = t.costVariance),
      t.costVariancePercentage !== void 0 &&
        (r.cost_variance_percentage = t.costVariancePercentage),
      t.isMixed !== void 0 && (r.is_mixed = t.isMixed),
      t.customerId !== void 0 && (r.customer_id = t.customerId),
      t.shippingCostDistributed !== void 0 &&
        (r.shipping_cost_distributed = t.shippingCostDistributed),
      t.costDistributionMethod !== void 0 &&
        (r.cost_distribution_method = t.costDistributionMethod),
      t.fixedRatePerM3 !== void 0 && (r.fixed_rate_per_m3 = t.fixedRatePerM3),
      t.totalBilledAmount !== void 0 &&
        (r.total_billed_amount = t.totalBilledAmount));
    const { data: i, error: n } = await _.from("consolidations")
      .update(r)
      .eq("id", e)
      .select()
      .single();
    if (n)
      throw (
        console.error("Error updating consolidation:", n),
        new Error("Failed to update consolidation")
      );
    return this.transformDatabaseConsolidation(i);
  }
  async updateStatus(e, t, r) {
    const i = r.status;
    await this.update(e, { status: t });
    for (const n of r.involvedCustomerIds)
      await ie.createConsolidationStatusNotification(
        e,
        String(i),
        String(t),
        n,
        r.name,
      );
  }
  async updateOrders(e, t, r, i, n) {
    const o = r.orderIds,
      a = t.filter((h) => !o.includes(h)),
      c = o.filter((h) => !t.includes(h));
    if (a.length > 0) {
      const h = i.filter((p) => a.includes(p.id));
      for (const p of h) {
        const y = Rr.validateOrderForConsolidation(p, e);
        if (!y.isValid)
          throw new Error(
            `Cannot add order "${p.description}": ${y.errors.join(", ")}`,
          );
      }
    }
    const { error: u } = await _.from("consolidations")
      .update({ order_ids: t })
      .eq("id", e);
    if (u)
      throw (
        console.error("Error updating consolidation orders:", u),
        new Error("Failed to update consolidation orders")
      );
    (a.length > 0 && (await this.notifyOrdersAdded(e, a, r, i, n)),
      c.length > 0 && (await this.notifyOrdersRemoved(e, c, r, i, n)));
  }
  async resetShippingCostDistribution(e, t = "Manual reset") {
    const { error: r } = await _.from("consolidations")
      .update({ shipping_cost_distributed: !1 })
      .eq("id", e);
    if (r)
      throw (
        console.error("Error resetting shipping cost distribution flag:", r),
        new Error("Failed to reset shipping cost distribution flag")
      );
    (await $e.logCostDistributionReset(e, t),
      await ie.createAdminNotification(
        `Shipping cost distribution flag reset for consolidation (ID: ${e})`,
        { importance: K.Medium, linkToPage: "consolidations", linkToId: e },
      ));
  }
  async redistributeShippingCosts(e, t, r, i) {
    const n = r.shippingCost,
      o = r.shippingCostDistributed,
      { data: a, error: c } = await _.from("payment_transactions")
        .select("*")
        .eq("related_consolidation_id", e)
        .eq("type", "ShippingCost");
    if (c) throw new Error("Failed to fetch existing transactions for backup");
    const { data: u, error: h } = await _.from("payment_transactions")
      .select("*")
      .eq("related_consolidation_id", e)
      .eq("type", "MiscellaneousCost")
      .ilike("description", "Fixed-rate shipping variance for consolidation%");
    if (h)
      throw new Error(
        "Failed to fetch existing variance transactions for backup",
      );
    const p = [...(a || []), ...(u || [])];
    try {
      (await this.resetShippingCostDistribution(
        e,
        "Redistribution in progress",
      ),
        await this.update(e, { shippingCost: t, shippingCostDistributed: !1 }));
      const { error: y } = await _.from("payment_transactions")
        .delete()
        .eq("related_consolidation_id", e)
        .eq("type", "ShippingCost");
      if (y)
        throw new Error("Failed to delete existing shipping cost transactions");
      const { error: b } = await _.from("payment_transactions")
        .delete()
        .eq("related_consolidation_id", e)
        .eq("type", "MiscellaneousCost")
        .ilike(
          "description",
          "Fixed-rate shipping variance for consolidation%",
        );
      if (b)
        throw new Error(
          "Failed to delete existing fixed-rate variance transactions",
        );
      const { data: k } = await _.from("shipments")
          .select("id")
          .eq("consolidation_id", e)
          .single(),
        I = k == null ? void 0 : k.id,
        P = `Shipping cost updated from $${n || 0} to $${t}`;
      (r.isMixed
        ? await He.distributeShippingCost(e, t, r, i, I, !0, P)
        : r.customerId &&
          t > 0 &&
          (await He.createTransaction(
            {
              customerId: r.customerId,
              type: "ShippingCost",
              description: `Shipping cost for consolidation: ${Se(r.id, "consolidation")}`,
              amount: -Math.abs(t),
              relatedConsolidationId: e,
              relatedShipmentId: I,
              idempotencyKey: `shipping-charge:shipment:${I || "none"}:single_customer:${r.customerId}:adjustment:${Math.abs(t).toFixed(2)}`,
            },
            !0,
            P,
          )),
        await this.update(e, { shippingCostDistributed: !0 }),
        await $e.logCostRedistribution(e, n || 0, t, new Map(), new Map()));
    } catch (y) {
      throw (
        console.error("Redistribution failed, rolling back:", y),
        await this.rollbackCostDistribution(e, n, o, p),
        y
      );
    }
  }
  async rollbackCostDistribution(e, t, r, i) {
    try {
      if (
        (await this.update(e, { shippingCost: t, shippingCostDistributed: r }),
        await _.from("payment_transactions")
          .delete()
          .eq("related_consolidation_id", e)
          .eq("type", "ShippingCost"),
        await _.from("payment_transactions")
          .delete()
          .eq("related_consolidation_id", e)
          .eq("type", "MiscellaneousCost")
          .ilike(
            "description",
            "Fixed-rate shipping variance for consolidation%",
          ),
        i.length > 0)
      ) {
        const { error: n } = await _.from("payment_transactions").insert(i);
        n &&
          (console.error("Failed to restore original transactions:", n),
          await ie.createAdminNotification(
            `CRITICAL: Failed to rollback cost distribution for consolidation ${e}. Manual intervention required.`,
            { importance: K.High, linkToPage: "consolidations", linkToId: e },
          ));
      }
      (await $e.logAction(ot.COST_DISTRIBUTION_RESET, "consolidation", e, {
        reason: "Rollback due to redistribution failure",
        metadata: {
          rollbackTimestamp: new Date().toISOString(),
          originalShippingCost: t,
          originalDistributedFlag: r,
          restoredTransactionCount: i.length,
        },
      }),
        console.log(
          `Successfully rolled back cost distribution for consolidation ${e}`,
        ));
    } catch (n) {
      (console.error("CRITICAL: Rollback failed:", n),
        await ie.createAdminNotification(
          `CRITICAL SYSTEM ERROR: Cost distribution rollback failed for consolidation ${e}. Database may be in inconsistent state. Immediate manual intervention required.`,
          { importance: K.High, linkToPage: "consolidations", linkToId: e },
        ),
        await $e.logAction(ot.COST_DISTRIBUTION_RESET, "consolidation", e, {
          reason: "CRITICAL: Rollback failure",
          metadata: {
            rollbackError: n instanceof Error ? n.message : String(n),
            timestamp: new Date().toISOString(),
            severity: "critical",
          },
        }));
    }
  }
  async createShipment(e, t, r, i, n, o, a, c, u) {
    var Me, Ee;
    console.log("🚢 CREATE SHIPMENT CALLED:", {
      consolidationId: e,
      consolidationName: c.name,
      actualShippingCost: t,
      estimatedShippingCostFromParam: c.estimatedShippingCost,
      consolidationObject: {
        id: c.id,
        name: c.name,
        estimatedShippingCost: c.estimatedShippingCost,
        shippingCost: c.shippingCost,
        shippingCostDistributed: c.shippingCostDistributed,
      },
    });
    const h = c.estimatedShippingCost || 0,
      p = h > 0,
      y = p ? t - h : null,
      b = p ? ((t - h) / h) * 100 : null,
      k = c.shippingCost && c.shippingCost > 0,
      I = (h > 0 && Math.abs(y || 0) > 0.01) || (h === 0 && t > 0 && !k),
      P = I
        ? h > 0
          ? `Actual shipping cost differs from estimate: $${h} → $${t}`
          : `Shipping cost assigned: $${t} (estimated cost was not provided during consolidation creation)`
        : void 0;
    console.log("🔍 ADJUSTMENT DETECTION DEBUG:", {
      consolidationId: e,
      consolidationName: c.name,
      estimatedCost: h,
      actualShippingCost: t,
      hasExistingShippingCost: k,
      costVariance: y,
      costVariancePercentage: b,
      isAdjustment: I,
      adjustmentReason: P,
      mathAbsCostVariance: Math.abs(y || 0),
      threshold: 0.01,
      logicUsed: h > 0 ? "estimated_vs_actual" : "first_time_assignment",
    });
    let L = (c.involvedCustomerIds || []).filter(Boolean),
      G = c.customerId,
      O = c.isMixed;
    if (O) {
      if (L.length === 0) {
        const R = (c.orderIds || []).filter(Boolean);
        R.length > 0 &&
          (L = Array.from(
            new Set(
              u
                .filter((q) => R.includes(q.id))
                .map((q) => q.customerId)
                .filter(Boolean),
            ),
          ));
      }
      if (L.length === 0) {
        const { data: R, error: ue } = await _.from(
          "consolidations_with_orders",
        )
          .select("order_ids")
          .eq("id", e)
          .single();
        if (!ue) {
          const q = (R == null ? void 0 : R.order_ids) || [];
          if (q.length > 0) {
            const { data: oe } = await _.from("orders")
              .select("customer_id")
              .in("id", q);
            L = Array.from(
              new Set((oe || []).map((ye) => ye.customer_id).filter(Boolean)),
            );
          }
        }
      }
      L.length <= 1
        ? ((O = !1), (G = L[0] || G), (L = G ? [G] : []))
        : (G = null);
    } else {
      if (!G) {
        const R = (c.orderIds || []).filter(Boolean);
        G =
          ((Me = u.find((q) => R.includes(q.id))) == null
            ? void 0
            : Me.customerId) ||
          ((Ee = c.involvedCustomerIds) == null ? void 0 : Ee[0]) ||
          null;
      }
      ((L = G ? [G] : L), (O = !1));
    }
    try {
      (c.customerId !== G ||
        c.isMixed !== O ||
        (c.involvedCustomerIds || []).length !== L.length) &&
        (await _.from("consolidations")
          .update({ customer_id: G, is_mixed: O, involved_customer_ids: L })
          .eq("id", e));
    } catch (R) {
      console.warn(
        "Failed to patch consolidation customer attribution; continuing shipment creation.",
        R,
      );
    }
    const A = `consolidation-shipment:${e}`,
      { data: H, error: J } = await _.rpc(
        "create_consolidation_shipment_core",
        {
          p_consolidation_id: e,
          p_shipping_cost: t,
          p_cost_variance: y,
          p_cost_variance_percentage: b,
          p_carrier: r,
          p_tracking_url: i,
          p_estimated_delivery: a ? new Date(a).toISOString() : null,
          p_description: `Consolidation: ${Se(c.id, "consolidation")}`,
          p_status: m.InTransit,
          p_customer_id: G,
          p_involved_customer_ids: L,
          p_is_mixed: O,
          p_origin: n,
          p_destination: o,
          p_idempotency_key: A,
        },
      );
    if (J)
      throw (
        console.error(
          "Error creating consolidation shipment core transaction:",
          J,
        ),
        new Error("Failed to create consolidation shipment")
      );
    const te = Array.isArray(H) ? H[0] : H,
      z = te == null ? void 0 : te.shipment_id,
      he = !!(te != null && te.created);
    if (!z)
      throw new Error("Shipment core transaction did not return a shipment ID");
    const ce = await yt.getById(z);
    if (!ce) throw new Error("Shipment was created but could not be loaded");
    he && (await yt.notifyShipmentCreated(ce));
    const { data: ge, error: Ne } = await _.from("consolidations")
      .select("shipping_cost_distributed")
      .eq("id", e)
      .single();
    if (Ne)
      throw new Error(
        "Failed to verify consolidation shipping distribution state",
      );
    const Re = (ge == null ? void 0 : ge.shipping_cost_distributed) === !0;
    try {
      (t > 0 &&
        !Re &&
        (c.isMixed
          ? await He.distributeShippingCost(e, t, c, u, ce.id, I, P)
          : c.customerId &&
            (await He.createTransaction(
              {
                customerId: c.customerId,
                type: "ShippingCost",
                description: `Shipping cost for consolidation: ${Se(c.id, "consolidation")}`,
                amount: -Math.abs(t),
                relatedConsolidationId: e,
                relatedShipmentId: ce.id,
                idempotencyKey: `shipping-charge:shipment:${ce.id}:single_customer:${c.customerId}:initial:${Math.abs(t).toFixed(2)}`,
              },
              I,
              P,
            ))),
        Re || (await this.update(e, { shippingCostDistributed: !0 })));
    } catch (R) {
      if (he) {
        const { error: ue } = await _.from("payment_transactions")
          .delete()
          .eq("related_shipment_id", ce.id);
        (ue &&
          console.error(
            "Failed to rollback payment transactions for shipment:",
            ue,
          ),
          await _.from("shipments").delete().eq("id", ce.id),
          await this.update(e, {
            status: c.status,
            shippingCost: c.shippingCost,
            costVariance: c.costVariance,
            costVariancePercentage: c.costVariancePercentage,
            shippingCostDistributed: c.shippingCostDistributed,
          }));
      }
      throw R;
    }
    if (b !== null && gr.shouldNotifyForCostVariance(b)) {
      const R = (y || 0) > 0 ? "over" : "under",
        ue = gr.isHighPriorityCostVariance(b) ? K.High : K.Medium;
      await ie.createAdminNotification(
        `Consolidation "${c.name}" shipping cost ${R} budget by ${Math.abs(b).toFixed(1)}%`,
        { importance: ue, linkToPage: "consolidations", linkToId: e },
      );
    }
  }
  async notifyOrdersAdded(e, t, r, i, n) {
    const o = i.filter((a) => t.includes(a.id));
    for (const a of o)
      n.find((u) => u.id === a.customerId) &&
        (await ie.createCustomerNotification(
          a.customerId,
          `Your order "${Se(a.id, "order")}" has been added to consolidation "${Se(r.id, "consolidation")}"`,
          { importance: K.Medium, linkToPage: "consolidations", linkToId: e },
        ));
  }
  async notifyOrdersRemoved(e, t, r, i, n) {
    const o = i.filter((a) => t.includes(a.id));
    for (const a of o)
      n.find((u) => u.id === a.customerId) &&
        (await ie.createCustomerNotification(
          a.customerId,
          `Your order "${Se(a.id, "order")}" has been removed from consolidation "${Se(r.id, "consolidation")}"`,
          { importance: K.Medium, linkToPage: "orders", linkToId: a.id },
        ));
  }
}
const lr = Kt.getInstance();
class Jt {
  constructor() {
    ((this.transformDatabaseCustomer = (e) => ({
      id: e.id,
      companyName: e.company_name,
      contactPerson: e.name,
      email: e.email,
      phone: e.phone,
      address: e.address,
      contractType: e.contract_type_id,
      notes: e.notes,
      role: e.role,
      hasUsedTrialFee: e.has_used_trial_fee,
    })),
      (this.transformDatabaseOrder = (e) => ({
        id: e.id,
        description: e.description,
        value: e.value,
        supplierId: e.supplier_id,
        volumeM3: e.volume_m3,
        weightKG: e.weight_kg,
        customerId: e.customer_id,
        status: e.status,
        notes: e.notes,
        creationDate: e.creation_date,
      })),
      (this.transformDatabaseShipment = (e) => ({
        id: e.id,
        type: e.type,
        relatedId: e.related_id,
        shippingDate: e.shipping_date,
        carrier: e.carrier,
        trackingUrl: e.tracking_url,
        description: e.description,
        status: e.status,
        customerId: e.customer_id,
        involvedCustomerIds: e.involved_customer_ids || [],
        isMixed: e.is_mixed,
        origin: e.origin,
        destination: e.destination,
      })),
      (this.transformDatabaseTransaction = (e) => ({
        id: e.id,
        customerId: e.customer_id,
        date: e.date,
        type: e.type,
        description: e.description,
        amount: e.amount,
        relatedOrderId: e.related_order_id,
        relatedConsolidationId: e.related_consolidation_id,
        relatedShipmentId: e.related_shipment_id,
        isAdjustment: e.is_adjustment,
        adjustmentReason: e.adjustment_reason,
      })));
  }
  static getInstance() {
    return (Jt.instance || (Jt.instance = new Jt()), Jt.instance);
  }
  async fetchAll() {
    const { data: e, error: t } = await _.from("customers")
      .select("*")
      .order("company_name", { ascending: !0 });
    if (t)
      throw (
        console.error("Error fetching customers:", t),
        new Error("Failed to fetch customers")
      );
    return (e || []).map(this.transformDatabaseCustomer);
  }
  async create(e) {
    const t = {
        company_name: e.companyName,
        name: e.contactPerson,
        email: e.email,
        phone: e.phone,
        address: e.address,
        contract_type_id: e.contractType,
        notes: e.notes,
        role: e.role,
        has_used_trial_fee: e.hasUsedTrialFee || !1,
      },
      { data: r, error: i } = await _.from("customers")
        .insert([t])
        .select()
        .single();
    if (i)
      throw (
        console.error("Error creating customer:", i),
        new Error("Failed to create customer")
      );
    const n = this.transformDatabaseCustomer(r);
    return (
      await ie.createCustomerNotification(
        n.id,
        `Welcome to our logistics platform! Your ${n.contractType} account has been set up.`,
        { importance: K.High, linkToPage: "customers" },
      ),
      await ie.createAdminNotification(
        `New customer "${n.companyName}" has been created`,
        { importance: K.Medium, linkToPage: "customers", linkToId: n.id },
      ),
      n
    );
  }
  async update(e, t) {
    const r = {};
    (t.companyName !== void 0 && (r.company_name = t.companyName),
      t.contactPerson !== void 0 && (r.name = t.contactPerson),
      t.email !== void 0 && (r.email = t.email),
      t.phone !== void 0 && (r.phone = t.phone),
      t.address !== void 0 && (r.address = t.address),
      t.contractType !== void 0 && (r.contract_type_id = t.contractType),
      t.notes !== void 0 && (r.notes = t.notes),
      t.role !== void 0 && (r.role = t.role),
      t.hasUsedTrialFee !== void 0 &&
        (r.has_used_trial_fee = t.hasUsedTrialFee));
    const { data: i, error: n } = await _.from("customers")
      .update(r)
      .eq("id", e)
      .select()
      .single();
    if (n)
      throw (
        console.error("Error updating customer:", n),
        new Error("Failed to update customer")
      );
    const o = this.transformDatabaseCustomer(i);
    return (
      t.contractType &&
        (await ie.createCustomerNotification(
          e,
          `Your contract type has been updated to ${t.contractType}`,
          { importance: K.High, linkToPage: "customers" },
        )),
      o
    );
  }
  async getById(e) {
    const { data: t, error: r } = await _.from("customers")
      .select("*")
      .eq("id", e)
      .single();
    return r
      ? (console.error("Error fetching customer:", r), null)
      : t
        ? this.transformDatabaseCustomer(t)
        : null;
  }
  async getByEmail(e) {
    const { data: t, error: r } = await _.from("customers")
      .select("*")
      .eq("email", e)
      .single();
    return r
      ? (console.error("Error fetching customer by email:", r), null)
      : t
        ? this.transformDatabaseCustomer(t)
        : null;
  }
  async getByContractType(e) {
    const { data: t, error: r } = await _.from("customers")
      .select("*")
      .eq("contract_type_id", e)
      .order("company_name", { ascending: !0 });
    if (r)
      throw (
        console.error("Error fetching customers by contract type:", r),
        new Error("Failed to fetch customers by contract type")
      );
    return (t || []).map(this.transformDatabaseCustomer);
  }
  async calculateBalance(e, t) {
    return t
      .filter((i) => i.customerId === e)
      .reduce((i, n) => i + n.amount, 0);
  }
  async getStatistics(e) {
    const [t, r, i] = await Promise.all([
        this.getCustomerOrders(e),
        He.fetchAllTransactions(),
        this.getCustomerShipments(e),
      ]),
      o = r
        .filter((u) => u.customerId === e)
        .filter((u) => u.amount < 0)
        .reduce((u, h) => u + Math.abs(h.amount), 0),
      a = i.filter(
        (u) =>
          !["Delivered", "Completed", "Cancelled"].includes(String(u.status)),
      ).length,
      c = t.filter((u) => u.status === "Delivered").length;
    return {
      totalOrders: t.length,
      totalSpent: o,
      activeShipments: a,
      completedOrders: c,
    };
  }
  async getCustomerOrders(e) {
    const { data: t, error: r } = await _.from("orders")
      .select("*")
      .eq("customer_id", e)
      .order("creation_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching customer orders:", r),
        new Error("Failed to fetch customer orders")
      );
    return (t || []).map(this.transformDatabaseOrder);
  }
  async getCustomerShipments(e) {
    const { data: t, error: r } = await _.from("shipments")
      .select("*")
      .or(`customer_id.eq.${e},involved_customer_ids.cs.{${e}}`)
      .order("shipped_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching customer shipments:", r),
        new Error("Failed to fetch customer shipments")
      );
    return (t || []).map(this.transformDatabaseShipment);
  }
  async getCustomerTransactions(e) {
    const { data: t, error: r } = await _.from("payment_transactions")
      .select("*")
      .eq("customer_id", e)
      .order("date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching customer transactions:", r),
        new Error("Failed to fetch customer transactions")
      );
    return (t || []).map(this.transformDatabaseTransaction);
  }
  async delete(e) {
    const [t, r] = await Promise.all([
      this.getCustomerOrders(e),
      this.getCustomerTransactions(e),
    ]);
    if (t.length > 0 || r.length > 0)
      throw new Error(
        "Cannot delete customer with existing orders or transactions",
      );
    const { error: i } = await _.from("customers").delete().eq("id", e);
    if (i)
      throw (
        console.error("Error deleting customer:", i),
        new Error("Failed to delete customer")
      );
    await ie.createAdminNotification("Customer account has been deleted", {
      importance: K.Medium,
      linkToPage: "customers",
    });
  }
  validateCustomer(e) {
    const t = [];
    return (
      (!e.companyName || e.companyName.trim() === "") &&
        t.push("Company name is required"),
      (!e.contactPerson || e.contactPerson.trim() === "") &&
        t.push("Contact person is required"),
      !e.email || e.email.trim() === ""
        ? t.push("Email is required")
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email) ||
          t.push("Invalid email format"),
      (!e.phone || e.phone.trim() === "") && t.push("Phone number is required"),
      e.contractType || t.push("Contract type is required"),
      { isValid: t.length === 0, errors: t }
    );
  }
  async search(e) {
    const { data: t, error: r } = await _.from("customers")
      .select("*")
      .or(`company_name.ilike.%${e}%,name.ilike.%${e}%,email.ilike.%${e}%`)
      .order("company_name", { ascending: !0 });
    if (r)
      throw (
        console.error("Error searching customers:", r),
        new Error("Failed to search customers")
      );
    return (t || []).map(this.transformDatabaseCustomer);
  }
}
const uc = Jt.getInstance();
class Qt {
  constructor() {
    ((this.transformDatabaseSupplier = (e) => ({
      id: e.id,
      name: e.name,
      companyLocation: e.company_location,
      phoneNumber: e.phone_number,
      contactPerson: e.contact_person,
      rating: e.rating,
    })),
      (this.transformDatabaseOrder = (e) => ({
        id: e.id,
        description: e.description,
        value: e.value,
        supplierId: e.supplier_id,
        volumeM3: e.volume_m3,
        weightKG: e.weight_kg,
        customerId: e.customer_id,
        status: e.status,
        notes: e.notes,
        creationDate: e.creation_date,
      })));
  }
  static getInstance() {
    return (Qt.instance || (Qt.instance = new Qt()), Qt.instance);
  }
  async fetchAll() {
    const { data: e, error: t } = await _.from("suppliers")
      .select("*")
      .order("name", { ascending: !0 });
    if (t)
      throw (
        console.error("Error fetching suppliers:", t),
        new Error("Failed to fetch suppliers")
      );
    return (e || []).map(this.transformDatabaseSupplier);
  }
  async create(e) {
    const t = {
        name: e.name,
        company_location: e.companyLocation,
        phone_number: e.phoneNumber,
        contact_person: e.contactPerson,
        rating: e.rating,
      },
      { data: r, error: i } = await _.from("suppliers")
        .insert([t])
        .select()
        .single();
    if (i)
      throw (
        console.error("Error creating supplier:", i),
        new Error("Failed to create supplier")
      );
    const n = this.transformDatabaseSupplier(r);
    return (
      await ie.createAdminNotification(
        `New supplier "${n.name}" has been added`,
        { importance: K.Low, linkToPage: "suppliers", linkToId: n.id },
      ),
      n
    );
  }
  async update(e, t) {
    const r = {};
    (t.name !== void 0 && (r.name = t.name),
      t.companyLocation !== void 0 && (r.company_location = t.companyLocation),
      t.phoneNumber !== void 0 && (r.phone_number = t.phoneNumber),
      t.contactPerson !== void 0 && (r.contact_person = t.contactPerson),
      t.rating !== void 0 && (r.rating = t.rating));
    const { data: i, error: n } = await _.from("suppliers")
      .update(r)
      .eq("id", e)
      .select()
      .single();
    if (n)
      throw (
        console.error("Error updating supplier:", n),
        new Error("Failed to update supplier")
      );
    const o = this.transformDatabaseSupplier(i);
    return (
      t.rating &&
        t.rating !== o.rating &&
        (await ie.createAdminNotification(
          `Supplier "${o.name}" rating updated to ${t.rating}`,
          { importance: K.Low, linkToPage: "suppliers", linkToId: e },
        )),
      o
    );
  }
  async getById(e) {
    const { data: t, error: r } = await _.from("suppliers")
      .select("*")
      .eq("id", e)
      .single();
    return r
      ? (console.error("Error fetching supplier:", r), null)
      : t
        ? this.transformDatabaseSupplier(t)
        : null;
  }
  async getByLocation(e) {
    const { data: t, error: r } = await _.from("suppliers")
      .select("*")
      .ilike("company_location", `%${e}%`)
      .order("name", { ascending: !0 });
    if (r)
      throw (
        console.error("Error fetching suppliers by location:", r),
        new Error("Failed to fetch suppliers by location")
      );
    return (t || []).map(this.transformDatabaseSupplier);
  }
  async getByRatingRange(e, t) {
    const { data: r, error: i } = await _.from("suppliers")
      .select("*")
      .gte("rating", e)
      .lte("rating", t)
      .order("rating", { ascending: !1 });
    if (i)
      throw (
        console.error("Error fetching suppliers by rating:", i),
        new Error("Failed to fetch suppliers by rating")
      );
    return (r || []).map(this.transformDatabaseSupplier);
  }
  async getTopRated(e = 10) {
    const { data: t, error: r } = await _.from("suppliers")
      .select("*")
      .order("rating", { ascending: !1 })
      .limit(e);
    if (r)
      throw (
        console.error("Error fetching top rated suppliers:", r),
        new Error("Failed to fetch top rated suppliers")
      );
    return (t || []).map(this.transformDatabaseSupplier);
  }
  async getSupplierOrders(e) {
    const { data: t, error: r } = await _.from("orders")
      .select("*")
      .eq("supplier_id", e)
      .order("creation_date", { ascending: !1 });
    if (r)
      throw (
        console.error("Error fetching supplier orders:", r),
        new Error("Failed to fetch supplier orders")
      );
    return (t || []).map(this.transformDatabaseOrder);
  }
  async getStatistics(e) {
    const t = await this.getSupplierOrders(e),
      r = t.reduce((a, c) => a + c.value, 0),
      i = t.length > 0 ? r / t.length : 0,
      n = new Date();
    n.setDate(n.getDate() - 30);
    const o = t.filter((a) => new Date(a.creationDate) >= n).length;
    return {
      totalOrders: t.length,
      totalValue: r,
      averageOrderValue: i,
      recentOrders: o,
    };
  }
  async updateRating(e, t) {
    if (t < 1 || t > 10) throw new Error("Rating must be between 1 and 10");
    await this.update(e, { rating: t });
  }
  async delete(e) {
    if ((await this.getSupplierOrders(e)).length > 0)
      throw new Error("Cannot delete supplier with existing orders");
    const { error: r } = await _.from("suppliers").delete().eq("id", e);
    if (r)
      throw (
        console.error("Error deleting supplier:", r),
        new Error("Failed to delete supplier")
      );
    await ie.createAdminNotification("Supplier has been deleted", {
      importance: K.Low,
      linkToPage: "suppliers",
    });
  }
  async search(e) {
    const { data: t, error: r } = await _.from("suppliers")
      .select("*")
      .or(
        `name.ilike.%${e}%,company_location.ilike.%${e}%,contact_person.ilike.%${e}%`,
      )
      .order("name", { ascending: !0 });
    if (r)
      throw (
        console.error("Error searching suppliers:", r),
        new Error("Failed to search suppliers")
      );
    return (t || []).map(this.transformDatabaseSupplier);
  }
  validateSupplier(e) {
    const t = [];
    return (
      (!e.name || e.name.trim() === "") && t.push("Supplier name is required"),
      (!e.companyLocation || e.companyLocation.trim() === "") &&
        t.push("Company location is required"),
      (!e.phoneNumber || e.phoneNumber.trim() === "") &&
        t.push("Phone number is required"),
      (!e.contactPerson || e.contactPerson.trim() === "") &&
        t.push("Contact person is required"),
      e.rating !== void 0 &&
        (e.rating < 1 || e.rating > 10) &&
        t.push("Rating must be between 1 and 10"),
      { isValid: t.length === 0, errors: t }
    );
  }
  async getPerformanceMetrics(e) {
    const t = await this.getById(e);
    if (!t) throw new Error("Supplier not found");
    const r = await this.getSupplierOrders(e),
      i = r.reduce((c, u) => c + u.value, 0),
      n = r.length > 0 ? i / r.length : 0,
      o = r.filter((c) => c.status === "Delivered"),
      a = r.length > 0 ? (o.length / r.length) * 100 : 0;
    return {
      orderCount: r.length,
      totalValue: i,
      averageOrderValue: n,
      onTimeDeliveryRate: a,
      rating: t.rating || 0,
    };
  }
  async getSummary() {
    const [e, t] = await Promise.all([this.fetchAll(), this.getTopRated(5)]),
      r = new Date();
    r.setDate(r.getDate() - 30);
    const i = e.slice(0, 5),
      n = e.filter((a) => a.rating !== void 0),
      o =
        n.length > 0
          ? n.reduce((a, c) => a + (c.rating || 0), 0) / n.length
          : 0;
    return {
      totalSuppliers: e.length,
      topRatedSuppliers: t,
      recentlyAdded: i,
      averageRating: o,
    };
  }
}
const hc = Qt.getInstance(),
  Ni = "2026-02-18",
  mc = () => {
    const [s, e] = x.useState(""),
      [t, r] = x.useState(""),
      [i, n] = x.useState(!1),
      [o, a] = x.useState(null),
      [c, u] = x.useState(null),
      [h, p] = x.useState(!1),
      [y, b] = x.useState(!1),
      [k, I] = x.useState(!1),
      [P, L] = x.useState(null),
      [G, O] = x.useState(null),
      [A, H] = x.useState(""),
      [J, te] = x.useState(""),
      [z, he] = x.useState(""),
      [ce, ge] = x.useState(""),
      [Ne, Re] = x.useState(!1),
      { login: Me, signUp: Ee } = _n(),
      R = x.useMemo(
        () =>
          "w-full h-11 px-4 rounded-2xl border border-slate-900/10 bg-white/70 backdrop-blur shadow-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40",
        [],
      ),
      ue = async (oe) => {
        if ((oe.preventDefault(), !i)) {
          (n(!0), a(null), u(null), L(null), O(null));
          try {
            if (y) {
              if (!Ne)
                throw new Error(
                  "Please read and accept the Privacy Policy and Terms of Service.",
                );
              (await Ee(s, t, A, J, z, ce, {
                acceptedAt: new Date().toISOString(),
                version: Ni,
              }),
                u(
                  "Account created. Check your email to confirm, then sign in.",
                ),
                b(!1),
                Re(!1));
            } else await Me(s, t);
          } catch (Ce) {
            a(Ce.message);
          } finally {
            n(!1);
          }
        }
      },
      q = async () => {
        (L(null), O(null));
        const oe = s.trim();
        if (!oe) {
          O("Enter your email address first.");
          return;
        }
        I(!0);
        try {
          const Ce = `${window.location.origin}/dashboard/reset-password`,
            { error: ye } = await _.auth.resetPasswordForEmail(oe, {
              redirectTo: Ce,
            });
          if (ye) throw ye;
          L("Password reset email sent. Check your inbox (and spam).");
        } catch (Ce) {
          O(
            (Ce == null ? void 0 : Ce.message) || "Failed to send reset email.",
          );
        } finally {
          I(!1);
        }
      };
    return l.jsxs("div", {
      className:
        "min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden",
      children: [
        l.jsx("div", {
          className:
            "absolute inset-0 pointer-events-none opacity-70 bg-[radial-gradient(900px_circle_at_25%_20%,rgba(59,130,246,0.10),transparent_55%),radial-gradient(700px_circle_at_70%_50%,rgba(52,211,153,0.10),transparent_55%)]",
        }),
        l.jsx("div", {
          className:
            "absolute top-24 left-10 w-72 h-72 rounded-full blur-3xl opacity-25 bg-gradient-to-r from-emerald-200 to-blue-200 pointer-events-none",
        }),
        l.jsx("div", {
          className:
            "absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-r from-blue-200 to-indigo-200 pointer-events-none",
        }),
        l.jsxs("div", {
          className: "relative px-4 sm:px-6 py-10 sm:py-12 mx-auto max-w-6xl",
          children: [
            l.jsxs("div", {
              className: "flex items-center justify-between",
              children: [
                l.jsx("a", {
                  href:
                    window.location.hostname === "localhost"
                      ? "http://localhost:8080/"
                      : "/",
                  className:
                    "text-sm font-semibold text-slate-700 hover:text-slate-950",
                  children: "Back",
                }),
                l.jsx("a", {
                  href: "/",
                  className: "flex items-center gap-2",
                  children: l.jsx(dr, {
                    size: "xxs",
                    showText: !0,
                    markClassName: "w-8 h-8",
                    textClassName: "text-base",
                  }),
                }),
                l.jsx("div", { className: "w-[44px]" }),
              ],
            }),
            l.jsxs("div", {
              className:
                "mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start",
              children: [
                l.jsxs("div", {
                  className: "hidden lg:block pt-3",
                  children: [
                    l.jsx("div", {
                      className:
                        "inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 backdrop-blur px-4 py-2 text-xs font-bold text-slate-700 shadow-sm",
                      children: "Admin and customer access",
                    }),
                    l.jsx("h1", {
                      className:
                        "mt-5 text-4xl font-extrabold tracking-tight text-slate-950",
                      children: "Sign in to the Bundleist dashboard.",
                    }),
                    l.jsx("p", {
                      className:
                        "mt-4 text-base text-slate-700 leading-relaxed max-w-md",
                      children:
                        "Track orders, consolidations, shipments, and the ledger in one workspace.",
                    }),
                    l.jsx("div", {
                      className: "mt-6 grid grid-cols-1 gap-3 max-w-md",
                      children: [
                        {
                          k: "Relationships",
                          v: "Order -> consolidation -> shipment is visible",
                        },
                        {
                          k: "Exceptions",
                          v: "Ops inbox flags what needs action",
                        },
                        {
                          k: "Audit trail",
                          v: "Know who changed what and when",
                        },
                      ].map((oe) =>
                        l.jsxs(
                          "div",
                          {
                            className:
                              "rounded-3xl border border-slate-900/10 bg-white/70 backdrop-blur px-5 py-4 shadow-sm",
                            children: [
                              l.jsx("div", {
                                className: "text-sm font-bold text-slate-950",
                                children: oe.k,
                              }),
                              l.jsx("div", {
                                className:
                                  "mt-1 text-sm text-slate-700 leading-relaxed",
                                children: oe.v,
                              }),
                            ],
                          },
                          oe.k,
                        ),
                      ),
                    }),
                  ],
                }),
                l.jsx("div", {
                  className: "lg:justify-self-end w-full",
                  children: l.jsxs("form", {
                    onSubmit: ue,
                    className:
                      "rounded-[2rem] border border-slate-900/10 bg-white/80 backdrop-blur-xl shadow-[0_26px_90px_-55px_rgba(15,23,42,0.55)] overflow-hidden",
                    children: [
                      l.jsx("div", {
                        className:
                          "px-6 sm:px-7 pt-6 pb-4 border-b border-slate-900/10 bg-white/70",
                        children: l.jsxs("div", {
                          className: "flex items-center justify-between gap-4",
                          children: [
                            l.jsxs("div", {
                              children: [
                                l.jsx("div", {
                                  className: "text-sm font-bold text-slate-950",
                                  children: y
                                    ? "Create account"
                                    : "Welcome back",
                                }),
                                l.jsx("div", {
                                  className: "mt-1 text-sm text-slate-600",
                                  children: y
                                    ? "Create an account to continue."
                                    : "Sign in to continue.",
                                }),
                              ],
                            }),
                            l.jsx(dr, {
                              size: "xxs",
                              showText: !1,
                              markClassName: "w-9 h-9",
                            }),
                          ],
                        }),
                      }),
                      l.jsxs("div", {
                        className: "p-6 sm:p-7",
                        children: [
                          l.jsxs("div", {
                            className: "flex items-center gap-2 mb-4",
                            children: [
                              l.jsx("button", {
                                type: "button",
                                onClick: () => b(!1),
                                className: [
                                  "flex-1 h-10 rounded-2xl border text-sm font-semibold transition-colors",
                                  y
                                    ? "bg-white text-slate-700 border-slate-900/10 hover:bg-slate-50"
                                    : "bg-slate-900 text-white border-slate-900",
                                ].join(" "),
                                children: "Sign in",
                              }),
                              l.jsx("button", {
                                type: "button",
                                onClick: () => b(!0),
                                className: [
                                  "flex-1 h-10 rounded-2xl border text-sm font-semibold transition-colors",
                                  y
                                    ? "bg-slate-900 text-white border-slate-900"
                                    : "bg-white text-slate-700 border-slate-900/10 hover:bg-slate-50",
                                ].join(" "),
                                children: "Sign up",
                              }),
                            ],
                          }),
                          o &&
                            l.jsx("div", {
                              className:
                                "mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 font-semibold",
                              children: o,
                            }),
                          c &&
                            l.jsx("div", {
                              className:
                                "mb-4 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 font-semibold",
                              children: c,
                            }),
                          P &&
                            l.jsx("div", {
                              className:
                                "mb-4 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 font-semibold",
                              children: P,
                            }),
                          G &&
                            l.jsx("div", {
                              className:
                                "mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 font-semibold",
                              children: G,
                            }),
                          y &&
                            l.jsxs(l.Fragment, {
                              children: [
                                l.jsxs("div", {
                                  children: [
                                    l.jsx("label", {
                                      htmlFor: "name",
                                      className:
                                        "block text-sm font-semibold text-slate-800 mb-2",
                                      children: "Full name",
                                    }),
                                    l.jsx("input", {
                                      type: "text",
                                      id: "name",
                                      placeholder: "Jane Doe",
                                      value: A,
                                      onChange: (oe) => H(oe.target.value),
                                      className: R,
                                      required: y,
                                      autoComplete: "name",
                                    }),
                                  ],
                                }),
                                l.jsxs("div", {
                                  children: [
                                    l.jsx("label", {
                                      htmlFor: "companyName",
                                      className:
                                        "block text-sm font-semibold text-slate-800 mb-2",
                                      children: "Company",
                                    }),
                                    l.jsx("input", {
                                      type: "text",
                                      id: "companyName",
                                      placeholder: "Acme Imports",
                                      value: J,
                                      onChange: (oe) => te(oe.target.value),
                                      className: R,
                                      required: y,
                                      autoComplete: "organization",
                                    }),
                                  ],
                                }),
                                l.jsxs("div", {
                                  children: [
                                    l.jsx("label", {
                                      htmlFor: "phone",
                                      className:
                                        "block text-sm font-semibold text-slate-800 mb-2",
                                      children: "Phone",
                                    }),
                                    l.jsx("input", {
                                      type: "tel",
                                      id: "phone",
                                      placeholder: "+1 555 000 0000",
                                      value: z,
                                      onChange: (oe) => he(oe.target.value),
                                      className: R,
                                      required: y,
                                      autoComplete: "tel",
                                    }),
                                  ],
                                }),
                                l.jsxs("div", {
                                  children: [
                                    l.jsx("label", {
                                      htmlFor: "address",
                                      className:
                                        "block text-sm font-semibold text-slate-800 mb-2",
                                      children: "Business address",
                                    }),
                                    l.jsx("textarea", {
                                      id: "address",
                                      placeholder: "Street, city, country",
                                      value: ce,
                                      onChange: (oe) => ge(oe.target.value),
                                      rows: 2,
                                      className: [
                                        R,
                                        "h-auto py-3 resize-none",
                                      ].join(" "),
                                      required: y,
                                      autoComplete: "street-address",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          l.jsxs("div", {
                            children: [
                              l.jsx("label", {
                                htmlFor: "email",
                                className:
                                  "block text-sm font-semibold text-slate-800 mb-2",
                                children: "Email",
                              }),
                              l.jsx("input", {
                                type: "email",
                                id: "email",
                                placeholder: "you@company.com",
                                value: s,
                                onChange: (oe) => e(oe.target.value),
                                className: R,
                                required: !0,
                                autoComplete: "email",
                              }),
                            ],
                          }),
                          l.jsxs("div", {
                            children: [
                              l.jsx("label", {
                                htmlFor: "password",
                                className:
                                  "block text-sm font-semibold text-slate-800 mb-2",
                                children: "Password",
                              }),
                              l.jsxs("div", {
                                className: "relative",
                                children: [
                                  l.jsx("input", {
                                    type: h ? "text" : "password",
                                    id: "password",
                                    placeholder: y
                                      ? "Create a password"
                                      : "Your password",
                                    value: t,
                                    onChange: (oe) => r(oe.target.value),
                                    className: [R, "pr-12"].join(" "),
                                    required: !0,
                                    autoComplete: y
                                      ? "new-password"
                                      : "current-password",
                                  }),
                                  l.jsx("button", {
                                    type: "button",
                                    onClick: () => p((oe) => !oe),
                                    className:
                                      "absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl border border-slate-900/10 bg-white hover:bg-slate-50 inline-flex items-center justify-center text-slate-600",
                                    "aria-label": h
                                      ? "Hide password"
                                      : "Show password",
                                    children: h
                                      ? l.jsx(eo, { className: "h-4 w-4" })
                                      : l.jsx(to, { className: "h-4 w-4" }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          y &&
                            l.jsxs("div", {
                              className:
                                "rounded-2xl border border-slate-900/10 bg-slate-50/80 p-4",
                              children: [
                                l.jsx("div", {
                                  className: "text-sm font-bold text-slate-900",
                                  children:
                                    "Privacy and terms consent (required)",
                                }),
                                l.jsx("p", {
                                  className:
                                    "mt-2 text-xs text-slate-700 leading-relaxed",
                                  children:
                                    "By creating an account, you authorize Bundleist to process account and operational data for procurement coordination, consolidation, shipment management, settlement workflows, and compliance operations.",
                                }),
                                l.jsxs("p", {
                                  className:
                                    "mt-2 text-xs text-slate-700 leading-relaxed",
                                  children: [
                                    "Review: ",
                                    l.jsx("a", {
                                      href: "/privacy",
                                      target: "_blank",
                                      rel: "noreferrer",
                                      className:
                                        "font-semibold text-slate-900 underline underline-offset-4 hover:text-emerald-700",
                                      children: "Privacy Policy",
                                    }),
                                    " and",
                                    " ",
                                    l.jsx("a", {
                                      href: "/terms",
                                      target: "_blank",
                                      rel: "noreferrer",
                                      className:
                                        "font-semibold text-slate-900 underline underline-offset-4 hover:text-emerald-700",
                                      children: "Terms of Service",
                                    }),
                                    ".",
                                  ],
                                }),
                                l.jsxs("label", {
                                  htmlFor: "privacyConsent",
                                  className:
                                    "mt-3 flex items-start gap-3 cursor-pointer",
                                  children: [
                                    l.jsx("input", {
                                      id: "privacyConsent",
                                      type: "checkbox",
                                      checked: Ne,
                                      onChange: (oe) => Re(oe.target.checked),
                                      className:
                                        "mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-emerald-500",
                                      required: y,
                                    }),
                                    l.jsxs("span", {
                                      className:
                                        "text-xs text-slate-800 leading-relaxed",
                                      children: [
                                        "I accept the Privacy Policy and Terms of Service (version ",
                                        Ni,
                                        ").",
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          !y &&
                            l.jsx("div", {
                              className: "flex items-center justify-between",
                              children: l.jsx("button", {
                                type: "button",
                                onClick: q,
                                disabled: k,
                                className:
                                  "text-sm text-slate-700 hover:text-emerald-700 font-semibold disabled:opacity-50",
                                children: k
                                  ? "Sending..."
                                  : "Forgot your password?",
                              }),
                            }),
                          l.jsxs(nt, {
                            type: "submit",
                            className:
                              "w-full rounded-2xl h-11 bg-slate-900 hover:bg-slate-800 text-white",
                            disabled: i || (y && !Ne),
                            children: [
                              i
                                ? l.jsx(ro, {
                                    className: "h-4 w-4 mr-2 animate-spin",
                                  })
                                : null,
                              y ? "Create account" : "Sign in",
                            ],
                          }),
                          l.jsxs("div", {
                            className:
                              "mt-4 text-xs text-slate-500 leading-relaxed",
                            children: [
                              "By continuing, you agree to our",
                              " ",
                              l.jsx("a", {
                                href: "/terms",
                                target: "_blank",
                                rel: "noreferrer",
                                className:
                                  "font-semibold text-slate-700 underline underline-offset-4 hover:text-emerald-700",
                                children: "Terms of Service",
                              }),
                              " ",
                              "and acknowledge our",
                              " ",
                              l.jsx("a", {
                                href: "/privacy",
                                target: "_blank",
                                rel: "noreferrer",
                                className:
                                  "font-semibold text-slate-700 underline underline-offset-4 hover:text-emerald-700",
                                children: "Privacy Policy",
                              }),
                              ".",
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  fc = x.lazy(() =>
    ze(() => import("./dashboardpage.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5])),
  ),
  pc = x.lazy(() =>
    ze(
      () => import("./orderspage.js"),
      __vite__mapDeps([6, 1, 2, 7, 3, 8, 9, 10, 11, 4, 5]),
    ),
  ),
  gc = x.lazy(() =>
    ze(
      () => import("./consolidationspage.js"),
      __vite__mapDeps([12, 1, 2, 7, 3, 8, 9, 10, 11, 4, 5]),
    ).then((s) => ({ default: s.ConsolidationsPage })),
  ),
  yc = x.lazy(() =>
    ze(
      () => import("./supplierspage.js"),
      __vite__mapDeps([13, 1, 2, 7, 3, 4, 5]),
    ),
  ),
  vc = x.lazy(() =>
    ze(
      () => import("./customerspage.js"),
      __vite__mapDeps([14, 1, 2, 7, 3, 11, 4, 5]),
    ),
  ),
  bc = x.lazy(() =>
    ze(
      () => import("./paymentspage.js"),
      __vite__mapDeps([15, 1, 2, 7, 3, 8, 9, 11, 4, 5]),
    ),
  ),
  wc = x.lazy(() =>
    ze(
      () => import("./shipmentspage.js"),
      __vite__mapDeps([16, 1, 2, 3, 10, 9, 11, 4, 5]),
    ),
  ),
  Ai = () =>
    l.jsx("div", {
      className: "min-h-[240px] flex items-center justify-center",
      children: l.jsxs("div", {
        className: "text-center",
        children: [
          l.jsx("div", {
            className:
              "animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto",
          }),
          l.jsx("p", {
            className: "mt-3 text-sm text-gray-600",
            children: "Loading page...",
          }),
        ],
      }),
    }),
  _c = () => {
    const { showError: s, showSuccess: e } = ws(),
      [t, r] = x.useState(""),
      [i, n] = x.useState(""),
      [o, a] = x.useState(!1),
      [c, u] = x.useState(!1);
    x.useEffect(() => {
      _.auth
        .getSession()
        .then(() => u(!0))
        .catch(() => u(!0));
    }, []);
    const h = async (p) => {
      if ((p.preventDefault(), !o)) {
        if (!t || t.length < 6) {
          s("Invalid Password", "Password must be at least 6 characters.");
          return;
        }
        if (t !== i) {
          s("Mismatch", "Passwords do not match.");
          return;
        }
        a(!0);
        try {
          const { error: y } = await _.auth.updateUser({ password: t });
          if (y) throw y;
          (e("Password Updated", "You can now sign in with your new password."),
            (window.location.href = "/dashboard/"));
        } catch (y) {
          s(
            "Reset Failed",
            (y == null ? void 0 : y.message) || "Failed to update password.",
          );
        } finally {
          a(!1);
        }
      }
    };
    return l.jsx("div", {
      className:
        "min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-100 px-4",
      children: l.jsxs("form", {
        onSubmit: h,
        className:
          "bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-gray-100",
        children: [
          l.jsx("h2", {
            className: "text-2xl font-bold text-center text-emerald-700",
            children: "Reset Password",
          }),
          c
            ? l.jsxs(l.Fragment, {
                children: [
                  l.jsxs("div", {
                    children: [
                      l.jsx("label", {
                        className:
                          "block text-sm font-medium text-gray-700 mb-1",
                        htmlFor: "newPassword",
                        children: "New Password",
                      }),
                      l.jsx("input", {
                        id: "newPassword",
                        type: "password",
                        value: t,
                        onChange: (p) => r(p.target.value),
                        className:
                          "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 text-gray-900",
                        autoComplete: "new-password",
                        required: !0,
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    children: [
                      l.jsx("label", {
                        className:
                          "block text-sm font-medium text-gray-700 mb-1",
                        htmlFor: "confirmPassword",
                        children: "Confirm Password",
                      }),
                      l.jsx("input", {
                        id: "confirmPassword",
                        type: "password",
                        value: i,
                        onChange: (p) => n(p.target.value),
                        className:
                          "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 text-gray-900",
                        autoComplete: "new-password",
                        required: !0,
                      }),
                    ],
                  }),
                  l.jsx("button", {
                    type: "submit",
                    disabled: o,
                    className:
                      "w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-emerald-700 transition-all duration-150 disabled:opacity-50",
                    children: o ? "Updating..." : "Update Password",
                  }),
                ],
              })
            : l.jsx("div", {
                className: "text-center text-sm text-gray-600",
                children: "Loading...",
              }),
          l.jsx("div", {
            className: "mt-2 pt-4 border-t border-gray-200 text-center",
            children: l.jsx("button", {
              type: "button",
              onClick: () => {
                if (window.location.hostname === "localhost") {
                  window.location.href = "http://localhost:8080/";
                  return;
                }
                window.location.href = "/";
              },
              className:
                "inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium transition-colors",
              children: "Back to Homepage",
            }),
          }),
        ],
      }),
    });
  },
  Di = ({ order: s, onClose: e, onSave: t }) => {
    const [r, i] = x.useState(""),
      [n, o] = x.useState(""),
      [a, c] = x.useState(""),
      [u, h] = x.useState("China"),
      [p, y] = x.useState("USA"),
      [b, k] = x.useState(""),
      [I, P] = x.useState(!1),
      { showError: L } = ws();
    x.useEffect(() => {
      const O = new Date();
      (O.setDate(O.getDate() + 30), k(O.toISOString().split("T")[0]));
    }, []);
    const G = async () => {
      if (I) return;
      const O = parseFloat(r);
      if (!r.trim() || isNaN(O) || O <= 0) {
        L(
          "Invalid Shipping Cost",
          "Shipping cost is required and must be greater than 0.",
        );
        return;
      }
      if (!n.trim()) {
        L("Missing Carrier", "Please enter a carrier name.");
        return;
      }
      if (!u.trim() || !p.trim()) {
        L("Missing Route", "Please enter both origin and destination.");
        return;
      }
      if (!b) {
        L("Missing ETA", "Please select an estimated delivery date.");
        return;
      }
      const A = new Date(b),
        H = new Date();
      if ((H.setHours(0, 0, 0, 0), A < H)) {
        L(
          "Invalid ETA",
          "Estimated delivery date must be today or in the future.",
        );
        return;
      }
      P(!0);
      try {
        await t(s.id, O, n, a, u, p, b);
      } catch (J) {
        (console.error("Error saving shipment:", J), P(!1));
      }
    };
    return l.jsx("div", {
      className:
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
      children: l.jsxs("div", {
        className:
          "bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto",
        children: [
          l.jsx("div", {
            className:
              "p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50",
            children: l.jsxs("div", {
              className: "flex items-center justify-between",
              children: [
                l.jsxs("div", {
                  children: [
                    l.jsx("h2", {
                      className: "text-xl sm:text-2xl font-bold text-gray-900",
                      children: "Create Individual Shipment",
                    }),
                    l.jsxs("p", {
                      className: "text-sm text-gray-600 mt-1",
                      children: ["Order: ", s.description],
                    }),
                    l.jsx("div", {
                      className: "mt-2",
                      children: l.jsx("span", {
                        className:
                          "inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800",
                        children: "Moving to InTransit Status",
                      }),
                    }),
                  ],
                }),
                l.jsx("button", {
                  onClick: e,
                  className:
                    "p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors",
                  children: l.jsx("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: l.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M6 18L18 6M6 6l12 12",
                    }),
                  }),
                }),
              ],
            }),
          }),
          l.jsxs("div", {
            className: "p-4 sm:p-6 space-y-6",
            children: [
              l.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: [
                  l.jsxs("div", {
                    children: [
                      l.jsx("label", {
                        htmlFor: "shipOrigin",
                        className:
                          "block text-sm font-semibold text-gray-700 mb-2",
                        children: "Origin Location",
                      }),
                      l.jsx("input", {
                        type: "text",
                        id: "shipOrigin",
                        value: u,
                        onChange: (O) => h(O.target.value),
                        className:
                          "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                        placeholder: "e.g., Shanghai, China",
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    children: [
                      l.jsx("label", {
                        htmlFor: "shipDestination",
                        className:
                          "block text-sm font-semibold text-gray-700 mb-2",
                        children: "Destination Location",
                      }),
                      l.jsx("input", {
                        type: "text",
                        id: "shipDestination",
                        value: p,
                        onChange: (O) => y(O.target.value),
                        className:
                          "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                        placeholder: "e.g., Los Angeles, USA",
                      }),
                    ],
                  }),
                ],
              }),
              l.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: [
                  l.jsxs("div", {
                    children: [
                      l.jsx("label", {
                        htmlFor: "shipCarrier",
                        className:
                          "block text-sm font-semibold text-gray-700 mb-2",
                        children: "Shipping Carrier",
                      }),
                      l.jsx("input", {
                        type: "text",
                        id: "shipCarrier",
                        value: n,
                        onChange: (O) => o(O.target.value),
                        className:
                          "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                        placeholder: "e.g., DHL, FedEx, UPS",
                        required: !0,
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    children: [
                      l.jsxs("label", {
                        htmlFor: "shipCost",
                        className:
                          "block text-sm font-semibold text-gray-700 mb-2",
                        children: [
                          "Shipping Cost (USD) ",
                          l.jsx("span", {
                            className: "text-red-500",
                            children: "*",
                          }),
                        ],
                      }),
                      l.jsxs("div", {
                        className: "relative",
                        children: [
                          l.jsx("span", {
                            className:
                              "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500",
                            children: "$",
                          }),
                          l.jsx("input", {
                            type: "number",
                            id: "shipCost",
                            value: r,
                            onChange: (O) => i(O.target.value),
                            className:
                              "w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                            min: "0.01",
                            step: "0.01",
                            placeholder: "Required (e.g., 125.50)",
                            required: !0,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              l.jsxs("div", {
                children: [
                  l.jsx("label", {
                    htmlFor: "shipTrackingUrl",
                    className: "block text-sm font-semibold text-gray-700 mb-2",
                    children: "Tracking URL (Optional)",
                  }),
                  l.jsx("input", {
                    type: "url",
                    id: "shipTrackingUrl",
                    value: a,
                    onChange: (O) => c(O.target.value),
                    className:
                      "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                    placeholder: "https://tracking.carrier.com/...",
                  }),
                ],
              }),
              l.jsxs("div", {
                children: [
                  l.jsx("label", {
                    htmlFor: "estimatedDelivery",
                    className: "block text-sm font-semibold text-gray-700 mb-2",
                    children: "Estimated Delivery Date",
                  }),
                  l.jsx("input", {
                    type: "date",
                    id: "estimatedDelivery",
                    value: b,
                    onChange: (O) => k(O.target.value),
                    className:
                      "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                    min: new Date().toISOString().split("T")[0],
                    required: !0,
                  }),
                ],
              }),
              l.jsx("div", {
                className: "bg-blue-50 border border-blue-200 rounded-xl p-4",
                children: l.jsxs("div", {
                  className: "flex items-center space-x-2",
                  children: [
                    l.jsx("svg", {
                      className: "w-5 h-5 text-blue-600",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: l.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                      }),
                    }),
                    l.jsxs("div", {
                      className: "text-sm text-blue-800",
                      children: [
                        l.jsx("p", {
                          className: "font-medium",
                          children: "This will create an individual shipment",
                        }),
                        l.jsx("p", {
                          className: "text-blue-600",
                          children:
                            "The order status will change to InTransit and appear on the Shipments page for tracking.",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          l.jsx("div", {
            className:
              "px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl",
            children: l.jsxs("div", {
              className:
                "flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3",
              children: [
                l.jsx("button", {
                  onClick: e,
                  className:
                    "px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 transition-colors",
                  children: "Cancel",
                }),
                l.jsx("button", {
                  onClick: G,
                  disabled: I,
                  className: `px-6 py-3 rounded-xl text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 ${I ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
                  children: I
                    ? l.jsxs("div", {
                        className: "flex items-center space-x-2",
                        children: [
                          l.jsxs("svg", {
                            className: "animate-spin w-4 h-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            children: [
                              l.jsx("circle", {
                                className: "opacity-25",
                                cx: "12",
                                cy: "12",
                                r: "10",
                                stroke: "currentColor",
                                strokeWidth: "4",
                              }),
                              l.jsx("path", {
                                className: "opacity-75",
                                fill: "currentColor",
                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                              }),
                            ],
                          }),
                          l.jsx("span", { children: "Creating Shipment..." }),
                        ],
                      })
                    : l.jsxs("div", {
                        className: "flex items-center space-x-2",
                        children: [
                          l.jsx("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: l.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M5 13l4 4L19 7",
                            }),
                          }),
                          l.jsx("span", { children: "Create Shipment" }),
                        ],
                      }),
                }),
              ],
            }),
          }),
        ],
      }),
    });
  },
  Ri = ({ shipment: s, onClose: e, onSave: t }) => {
    const [r, i] = x.useState(s.carrier || ""),
      [n, o] = x.useState(s.trackingUrl || ""),
      a = () => {
        t(s.id, r, n);
      };
    return l.jsx("div", {
      className:
        "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4",
      children: l.jsxs("div", {
        className:
          "bg-white p-5 sm:p-8 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto",
        children: [
          l.jsxs("h2", {
            className: "text-xl sm:text-2xl font-semibold text-gray-800 mb-6",
            children: ["Edit Tracking Info for Shipment: ", s.id],
          }),
          l.jsxs("div", {
            className: "space-y-4",
            children: [
              l.jsxs("div", {
                children: [
                  l.jsx("label", {
                    htmlFor: "editCarrier",
                    className: "block text-sm font-medium text-gray-700",
                    children: "Carrier",
                  }),
                  l.jsx("input", {
                    type: "text",
                    id: "editCarrier",
                    value: r,
                    onChange: (c) => i(c.target.value),
                    className:
                      "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900",
                    placeholder: "e.g., DHL, FedEx",
                  }),
                ],
              }),
              l.jsxs("div", {
                children: [
                  l.jsx("label", {
                    htmlFor: "editTrackingUrl",
                    className: "block text-sm font-medium text-gray-700",
                    children: "Tracking URL",
                  }),
                  l.jsx("input", {
                    type: "url",
                    id: "editTrackingUrl",
                    value: n,
                    onChange: (c) => o(c.target.value),
                    className:
                      "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900",
                    placeholder: "https://...",
                  }),
                ],
              }),
            ],
          }),
          l.jsxs("div", {
            className:
              "mt-8 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3",
            children: [
              l.jsx("button", {
                onClick: e,
                className:
                  "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50",
                children: "Cancel",
              }),
              l.jsx("button", {
                onClick: a,
                className:
                  "px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700",
                children: "Save Changes",
              }),
            ],
          }),
        ],
      }),
    });
  },
  xc = () => {
    const { user: s, loading: e, logout: t } = _n(),
      { showError: r, showSuccess: i, showWarning: n } = ws(),
      a = (
        typeof window < "u" ? window.location.pathname.replace(/\/+$/, "") : ""
      ).endsWith("/reset-password"),
      [c, u] = x.useState(!1),
      [h, p] = x.useState([]),
      [y, b] = x.useState(!1),
      [k, I] = x.useState([]),
      [P, L] = x.useState(!1),
      [G, O] = x.useState(null),
      [A, H] = x.useState([]),
      [J, te] = x.useState(!1),
      [z, he] = x.useState(null),
      [ce, ge] = x.useState([]),
      [Ne, Re] = x.useState(!1),
      [Me, Ee] = x.useState(null),
      [R, ue] = x.useState([]),
      [q, oe] = x.useState(!1),
      [Ce, ye] = x.useState(null),
      [Ze, we] = x.useState([]),
      [je, et] = x.useState(!1),
      [Et, N] = x.useState(null),
      [le, W] = x.useState([]),
      [Z, _e] = x.useState([]),
      [Le, Cc] = x.useState(!1),
      [kc, Tc] = x.useState(null),
      Ts = 50,
      [Es, Is] = x.useState({}),
      [xn, Os] = x.useState(!1),
      [Ps, js] = x.useState(!1),
      [vr, Sn] = x.useState({
        totalSuppliers: 0,
        totalOrders: 0,
        totalActiveConsolidations: 0,
        totalShipments: 0,
      }),
      [Cn, kn] = x.useState({
        pendingOrders: 0,
        inProgressOrders: 0,
        readyOrders: 0,
        shipments: 0,
      }),
      [Tn, En] = x.useState({
        departingSoon: 0,
        capacityRisk: 0,
        missingTracking: 0,
        missingShipment: 0,
        negativeBalances: 0,
      }),
      [Ns, In] = x.useState(!1),
      [Fe, br] = x.useState("orders"),
      [On, Ur] = x.useState(null),
      [wr, tr] = x.useState(null),
      [_r, xr] = x.useState(null),
      Sr = async (f, g = !1, v) => {
        try {
          const w = await He.createTransaction(f, g, v);
          return (w && ue((C) => [...C, w]), w);
        } catch (w) {
          return (r("Save Error", "Error saving transaction: " + w), null);
        }
      },
      Br = x.useCallback(
        (f, g) =>
          g.filter((v) => v.customerId === f).reduce((v, w) => v + w.amount, 0),
        [],
      ),
      bt = (f, g) => {
        if (g)
          try {
            if (f === "shipments") {
              qr(g);
              return;
            }
            f === "orders"
              ? localStorage.setItem(
                  "bundleist_nav_intent",
                  JSON.stringify({ page: "orders", orderId: g }),
                )
              : f === "consolidations"
                ? localStorage.setItem(
                    "bundleist_nav_intent",
                    JSON.stringify({
                      page: "consolidations",
                      consolidationId: g,
                    }),
                  )
                : f === "payments" &&
                  localStorage.setItem(
                    "bundleist_nav_intent",
                    JSON.stringify({ page: "payments", transactionId: g }),
                  );
          } catch {}
        (f !== "shipments" && Ur(null), br(f));
      },
      Pn = async (f, g) => {
        try {
          const v = ce.find((C) => C.id === f);
          if (!v) {
            r("Not Found", "Consolidation not found in memory.");
            return;
          }
          let w = Number(g || v.shippingCost || 0);
          if (!w || w <= 0) {
            const C = R.filter(
              (M) =>
                M.relatedConsolidationId === f && M.type === ee.ShippingCost,
            ).reduce((M, E) => M + Math.abs(Number(E.amount || 0)), 0);
            C > 0.01 && (w = C);
          }
          if (!w || w <= 0) {
            r(
              "Missing Cost",
              "No shipping cost is set on the consolidation, and there are no ShippingCost transactions to infer it from. Set an actual shipping cost first.",
            );
            return;
          }
          (await lr.redistributeShippingCosts(f, w, v, A),
            await Promise.allSettled([at(), Ke()]));
        } catch (v) {
          const w = v instanceof Error ? v.message : String(v);
          r("Recalculate Failed", w);
        }
      },
      qr = (f) => {
        (Ur(f), br("shipments"));
      },
      As = x.useCallback(async () => {
        b(!0);
        try {
          if (!(s != null && s.id)) {
            p([]);
            return;
          }
          const f = await uc.getById(s.id);
          if (!f) {
            p([]);
            return;
          }
          if (f.role === "admin") {
            const g = await uc.fetchAll();
            p(g);
          } else p([f]);
        } catch (f) {
          (console.error("Error fetching customers:", f),
            setCustomersError(
              f instanceof Error ? f.message : "Failed to fetch customers",
            ));
        } finally {
          b(!1);
        }
      }, [s == null ? void 0 : s.id]),
      at = x.useCallback(async (f = null) => {
        (oe(!0), ye(null));
        try {
          const g = f
            ? await He.getByCustomerId(f)
            : await He.fetchAllTransactions();
          ue(g);
        } catch (g) {
          (console.error("Exception fetching payment transactions:", g),
            ye(
              g instanceof Error
                ? g.message
                : "Failed to fetch payment transactions",
            ));
        }
        oe(!1);
      }, []),
      Ds = x.useCallback(
        async (f) => {
          await at(f);
        },
        [at],
      );
    x.useEffect(() => {
      s && As();
    }, [s, As]);
    const jn = async (f) => {
        try {
          const { data: g, error: v } = await _.auth.signUp({
            email: f.email,
            password: f.password,
            options: {
              data: { name: f.contactPerson, company_name: f.companyName },
            },
          });
          if (v) {
            r(
              "Account Creation Failed",
              "Error creating user account: " + v.message,
            );
            return;
          }
          if (!g.user) {
            r("Account Creation Failed", "Failed to create user account");
            return;
          }
          const { data: w, error: C } = await _.from("customers")
            .select("*")
            .eq("id", g.user.id)
            .single();
          if (C && C.code !== "PGRST116") {
            r(
              "Database Error",
              "Error checking for auto-created customer: " + C.message,
            );
            return;
          }
          let M;
          if (w) {
            const { data: D, error: S } = await _.from("customers")
              .update({
                name: f.contactPerson,
                company_name: f.companyName,
                phone: f.phone || "",
                address: f.address || "",
                notes: f.notes || "",
                contract_type_id: f.contractType,
                role: St.Customer,
              })
              .eq("id", g.user.id)
              .select();
            if (S) {
              r("Update Error", "Error updating customer: " + S.message);
              return;
            }
            M = D;
          } else {
            const { data: D, error: S } = await _.from("customers")
              .insert([
                {
                  id: g.user.id,
                  name: f.contactPerson,
                  email: f.email,
                  company_name: f.companyName,
                  phone: f.phone || "",
                  address: f.address || "",
                  notes: f.notes || "",
                  contract_type_id: f.contractType,
                  has_used_trial_fee: !1,
                  role: St.Customer,
                },
              ])
              .select();
            if (S) {
              try {
                const { data: E } = await _.auth.getSession(),
                  T = E == null ? void 0 : E.session,
                  I = T == null ? void 0 : T.access_token;
                I &&
                  (await fetch("/.netlify/functions/admin-delete-user", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${I}`,
                    },
                    body: JSON.stringify({ userId: g.user.id }),
                  }));
              } catch (E) {
                console.error(
                  "Could not rollback auth user after customer insert error:",
                  E,
                );
              }
              r("Database Error", "Error adding customer: " + S.message);
              return;
            }
            M = D;
          }
          const E = (M || []).map((D) => ({
            id: D.id,
            contactPerson: D.name,
            email: D.email,
            companyName: D.company_name,
            contractType: D.contract_type_id,
            hasUsedTrialFee: D.has_used_trial_fee,
            role: D.role || St.Customer,
            phone: D.phone || "",
            address: D.address || "",
            notes: D.notes,
          }));
          (p((D) => [...D, ...E]),
            i(
              "Customer Created",
              `Customer created successfully! The customer can now log in with email: ${f.email}`,
            ));
        } catch (g) {
          r("Creation Error", "Error creating customer: " + g.message);
        }
      },
      Vr = async (f, g) => {
        const v = {};
        (g.contactPerson !== void 0 && (v.name = g.contactPerson),
          g.email !== void 0 && (v.email = g.email),
          g.companyName !== void 0 && (v.company_name = g.companyName),
          g.phone !== void 0 && (v.phone = g.phone),
          g.address !== void 0 && (v.address = g.address),
          g.notes !== void 0 && (v.notes = g.notes),
          g.contractType !== void 0 && (v.contract_type_id = g.contractType),
          g.hasUsedTrialFee !== void 0 &&
            (v.has_used_trial_fee = g.hasUsedTrialFee),
          g.role !== void 0 && (v.role = g.role));
        const { data: w, error: C } = await _.from("customers")
          .update(v)
          .eq("id", f)
          .select();
        if (C) r("Update Error", "Error updating customer: " + C.message);
        else {
          const M = (w || []).map((E) => ({
            id: E.id,
            contactPerson: E.name,
            email: E.email,
            companyName: E.company_name,
            contractType: E.contract_type_id,
            hasUsedTrialFee: E.has_used_trial_fee,
            role: E.role || St.Customer,
            phone: E.phone || "",
            address: E.address || "",
            notes: E.notes,
          }));
          p((E) => E.map((D) => (D.id === f ? M[0] : D)));
        }
      },
      Rs = async () => {
        u(!0);
        try {
          if (
            (await t(),
            window.location.hostname === "localhost" &&
              window.location.port === "3001")
          ) {
            window.location.replace("http://localhost:8080/");
            return;
          }
          window.location.replace("/");
        } catch (f) {
          (console.error("Error during logout:", f), u(!1));
        }
      },
      It = x.useCallback(async (f = null) => {
        (L(!0), O(null));
        try {
          if (f) {
            const g = await Rr.getByCustomerId(f),
              v = [...new Set(g.map((w) => w.supplierId).filter(Boolean))];
            if (v.length === 0) {
              I([]);
              return;
            }
            const { data: w, error: C } = await _.from("suppliers")
              .select("*")
              .in("id", v);
            if (C) throw C;
            I(
              (w || []).map((M) => ({
                id: M.id,
                name: M.name,
                companyLocation: M.company_location,
                phoneNumber: M.phone_number,
                contactPerson: M.contact_person,
                rating: M.rating,
              })),
            );
            return;
          }
          const g = await hc.fetchAll();
          I(g);
        } catch (g) {
          (console.error("Error fetching suppliers:", g),
            O(g instanceof Error ? g.message : "Failed to fetch suppliers"));
        } finally {
          L(!1);
        }
      }, []),
      Nn = async (f) => {
        const { data: g, error: v } = await _.from("suppliers")
          .insert([
            {
              name: f.name,
              company_location: f.companyLocation,
              phone_number: f.phoneNumber,
              contact_person: f.contactPerson,
              rating: f.rating,
            },
          ])
          .select();
        if (v) r("Database Error", "Error adding supplier: " + v.message);
        else {
          const w = (g || []).map((C) => ({
            id: C.id,
            name: C.name,
            companyLocation: C.company_location,
            phoneNumber: C.phone_number,
            contactPerson: C.contact_person,
            rating: C.rating,
          }));
          I((C) => [...C, ...w]);
        }
      },
      An = async (f, g) => {
        const v = {};
        (g.name !== void 0 && (v.name = g.name),
          g.companyLocation !== void 0 &&
            (v.company_location = g.companyLocation),
          g.phoneNumber !== void 0 && (v.phone_number = g.phoneNumber),
          g.contactPerson !== void 0 && (v.contact_person = g.contactPerson),
          g.rating !== void 0 && (v.rating = g.rating));
        const { data: w, error: C } = await _.from("suppliers")
          .update(v)
          .eq("id", f)
          .select();
        if (C) r("Update Error", "Error updating supplier: " + C.message);
        else {
          const M = (w || []).map((E) => ({
            id: E.id,
            name: E.name,
            companyLocation: E.company_location,
            phoneNumber: E.phone_number,
            contactPerson: E.contact_person,
            rating: E.rating,
          }));
          I((E) => E.map((D) => (D.id === f ? M[0] : D)));
        }
      },
      Dn = async (f) => {
        const { error: g } = await _.from("suppliers").delete().eq("id", f);
        g
          ? r("Delete Error", "Error deleting supplier: " + g.message)
          : I((v) => v.filter((w) => w.id !== f));
      },
      tt = x.useCallback(async (f = null) => {
        (te(!0), he(null));
        try {
          const g = f ? await Rr.getByCustomerId(f) : await Rr.fetchAll();
          H(g);
        } catch (g) {
          (console.error("Error fetching orders:", g),
            he(g instanceof Error ? g.message : "Failed to fetch orders"));
        } finally {
          te(!1);
        }
      }, []),
      $s = async (f, g) => {
        var D;
        const { data: v, error: w } = await _.from("orders")
          .insert([
            {
              description: f.description,
              value: f.value,
              supplier_id: f.supplierId,
              volume_m3: f.volumeM3,
              weight_kg: f.weightKG,
              customer_id: g,
              status: d.Pending,
              notes: f.notes,
            },
          ])
          .select();
        if (w) {
          r("Database Error", "Error adding order: " + w.message);
          return;
        }
        const C = (v || []).map((S) => ({
          id: S.id,
          description: S.description,
          value: S.value,
          supplierId: S.supplier_id,
          volumeM3: S.volume_m3,
          weightKG: S.weight_kg,
          customerId: S.customer_id,
          status: S.status,
          notes: S.notes,
          creationDate: S.creation_date,
        }));
        H((S) => [...S, ...C]);
        const M = C[0];
        if (M)
          try {
            await ie.createCustomerNotification(
              g,
              `New order "${M.description}" created`,
              {
                importance: K.Medium,
                linkToPage: "orders",
                linkToId: M.id,
                eventType: "order_created",
                relatedEntityType: "order",
                relatedEntityId: M.id,
              },
            );
            const S =
                ((D = h.find((T) => T.id === g)) == null
                  ? void 0
                  : D.contactPerson) || "Customer",
              $ = pe
                ? `New order "${M.description}" created by Admin for ${S}`
                : `New order "${M.description}" created by ${S}`;
            (await ie.createAdminNotification($, {
              importance: K.Medium,
              linkToPage: "orders",
              linkToId: M.id,
              eventType: "order_created",
              relatedEntityType: "order",
              relatedEntityId: M.id,
            }),
              await st());
          } catch (S) {
            console.error("Error creating notification:", S);
          }
        const E = C[0];
        E &&
          (await ie.createNotification({
            userId: g,
            message: `Order "${E.description}" has been created and is pending confirmation`,
            linkToPage: "orders",
            linkToId: E.id,
            importance: K.Medium,
          }));
      },
      We = async (f, g, v = !1) => {
        const w = A.find((D) => D.id === f);
        if (!w) return;
        if (
          !v &&
          [
            d.InTransit,
            d.AtOriginPort,
            d.InTransitSea,
            d.AtDestinationPort,
            d.CustomsClearance,
            d.AwaitingDelivery,
            d.OutForDelivery,
            d.Delivered,
            d.Cancelled,
          ].includes(w.status)
        ) {
          const $ = [
            d.InTransit,
            d.AtOriginPort,
            d.InTransitSea,
            d.AtDestinationPort,
            d.CustomsClearance,
            d.AwaitingDelivery,
            d.OutForDelivery,
            d.Completed,
          ].includes(w.status)
            ? "This order is locked because it is currently being shipped. Order details for shipped orders cannot be modified for audit and tracking purposes. Changes must be managed through the Shipments page."
            : "This order is locked because it has already been delivered or cancelled. For audit and business reasons, delivered/cancelled orders cannot be edited. If you need to make an exception, please contact an administrator.";
          n("Order Locked", $);
          return;
        }
        const C = {};
        (g.description !== void 0 && (C.description = g.description),
          g.value !== void 0 && (C.value = g.value),
          g.supplierId !== void 0 && (C.supplier_id = g.supplierId),
          g.volumeM3 !== void 0 && (C.volume_m3 = g.volumeM3),
          g.weightKG !== void 0 && (C.weight_kg = g.weightKG),
          g.customerId !== void 0 && (C.customer_id = g.customerId),
          g.status !== void 0 && (C.status = g.status),
          g.notes !== void 0 && (C.notes = g.notes));
        const { data: M, error: E } = await _.from("orders")
          .update(C)
          .eq("id", f)
          .select();
        if (E) r("Update Error", "Error updating order: " + E.message);
        else {
          const D = (M || []).map((S) => ({
            id: S.id,
            description: S.description,
            value: S.value,
            supplierId: S.supplier_id,
            volumeM3: S.volume_m3,
            weightKG: S.weight_kg,
            customerId: S.customer_id,
            status: S.status,
            notes: S.notes,
            creationDate: S.creation_date,
          }));
          if (D[0]) {
            try {
              const S = D[0],
                $ = Object.keys(g || {}).map((T) => ({
                  field: T,
                  previousValue: w[T],
                  newValue: S[T],
                }));
              await $e.logAction(ot.ORDER_DETAILS_UPDATED, "order", f, {
                userId: s == null ? void 0 : s.id,
                previousState: w,
                newState: S,
                changes: $,
              });
            } catch (S) {
              console.warn("Audit log failed (non-fatal):", S);
            }
            H((S) => S.map(($) => ($.id === f ? D[0] : $)));
          } else
            console.error(
              "updateOrderDetails: No transformed data returned from database update",
            );
        }
      },
      Rn = async (f) => {
        const g = A.find((v) => v.id === f);
        if (!g) {
          r("Order Not Found", "Order not found for deletion");
          return;
        }
        if (g.status === d.Pending) {
          const { error: v } = await _.from("orders").delete().eq("id", f);
          v
            ? r("Delete Error", "Error deleting pending order: " + v.message)
            : (H((w) => w.filter((C) => C.id !== f)),
              await ie.createNotification({
                userId: g.customerId,
                message: `${g.status} order "${g.description}" has been deleted`,
                linkToPage: "orders",
                importance: K.Medium,
              }));
        } else
          r(
            "Cannot Delete Confirmed Order",
            `This order cannot be deleted because it has been confirmed and charges have been applied. Current status: ${g.status}. Please contact an administrator if you need to cancel this order.`,
          );
      },
      [$n, Cr] = x.useState(new Set()),
      Hr = async (f) => {
        if (
          (console.log(`[DEBUG] confirmOrder called for order ${f}`), $n.has(f))
        ) {
          (console.log(
            `[DEBUG] Order ${f} is already being charged, skipping duplicate charge application`,
          ),
            n(
              "Charges In Progress",
              "This order is currently being charged. Please wait for the process to complete.",
            ));
          return;
        }
        const g = A.find((T) => T.id === f);
        if (!g) {
          r("Order Not Found", "Order not found for confirmation");
          return;
        }
        (console.log(
          `[DEBUG] Order found: ${g.description} - Status: ${g.status}`,
        ),
          console.log(
            `[DEBUG] Total payment transactions in memory: ${R.length}`,
          ));
        const v = R.filter(
            (T) => T.relatedOrderId === f && T.type === ee.OrderCost,
          ).reduce((T, B) => T + Math.abs(B.amount), 0),
          w = R.filter(
            (T) => T.relatedOrderId === f && T.type === ee.ServiceFee,
          ).reduce((T, B) => T + Math.abs(B.amount), 0),
          C = R.filter(
            (T) => T.relatedOrderId === f && T.type === ee.OrderCostReversal,
          ).reduce((T, B) => T + Math.abs(B.amount), 0),
          M = R.filter(
            (T) => T.relatedOrderId === f && T.type === ee.ServiceFeeReversal,
          ).reduce((T, B) => T + Math.abs(B.amount), 0),
          E = Math.max(0, v - C),
          D = Math.max(0, w - M),
          S = E > 0.01 || D > 0.01;
        if (
          (console.log(
            `[DEBUG] Checking for existing charges for order ${f}...`,
          ),
          console.log("[DEBUG] Charge state:", {
            chargedOrderCost: v,
            chargedServiceFee: w,
            reversedOrderCost: C,
            reversedServiceFee: M,
            remainingOrderCost: E,
            remainingServiceFee: D,
            hasActiveCharges: S,
          }),
          S)
        ) {
          (console.log(
            `[DEBUG] Found existing charges for order ${f}, skipping duplicate charge application`,
          ),
            n(
              "Charges Already Applied",
              "This order has already been charged (net of reversals). Order cost and service fees cannot be applied multiple times.",
            ));
          return;
        }
        Cr((T) => new Set([...T, f]));
        const $ = h.find((T) => T.id === g.customerId);
        if (!$) {
          (Cr((T) => {
            const B = new Set(T);
            return (B.delete(f), B);
          }),
            r(
              "Customer Not Found",
              "Customer not found for order confirmation",
            ));
          return;
        }
        try {
          if (
            ($.contractType === qe.Trial &&
              $.hasUsedTrialFee &&
              (await Vr(g.customerId, { contractType: qe.Growth }),
              p((j) =>
                j.map((de) =>
                  de.id === g.customerId
                    ? { ...de, contractType: qe.Growth }
                    : de,
                ),
              ),
              ($.contractType = qe.Growth)),
            !(await Sr({
              customerId: g.customerId,
              amount: -Math.abs(g.value),
              description: `Order cost for ${g.description}`,
              type: ee.OrderCost,
              relatedOrderId: g.id,
              idempotencyKey: `order-charge:${g.id}:order-cost`,
            })))
          )
            throw new Error("Failed to persist order cost transaction");
          const B = Yi[$.contractType];
          let Q = 0;
          if (
            (B.oneTimeFee && !$.hasUsedTrialFee && $.contractType === qe.Trial
              ? ((Q = B.oneTimeFee),
                await Vr(g.customerId, {
                  hasUsedTrialFee: !0,
                  contractType: qe.Growth,
                }),
                ($.hasUsedTrialFee = !0),
                ($.contractType = qe.Growth))
              : B.percentageFee && (Q = g.value * B.percentageFee),
            Q > 0 &&
              !(await Sr({
                customerId: g.customerId,
                amount: -Math.abs(Q),
                description: `Service fee for order ${Se(g.id, "order")} (${B.name} contract)`,
                type: ee.ServiceFee,
                relatedOrderId: g.id,
                idempotencyKey: `order-charge:${g.id}:service-fee`,
              })))
          )
            throw new Error("Failed to persist service fee transaction");
          try {
            await We(f, { chargesApplied: !0 });
          } catch (j) {
            if (j instanceof Error && j.message.includes("charges_applied"))
              console.log(
                "[DEBUG] chargesApplied column not yet added to database - using transaction-based duplicate detection",
              );
            else throw j;
          }
          (await ie.createNotification({
            userId: g.customerId,
            message: `Order "${g.description}" has been confirmed. Order cost: $${g.value.toFixed(2)}${Q > 0 ? `, Service fee: $${Q.toFixed(2)}` : ""}`,
            linkToPage: "orders",
            linkToId: g.id,
            importance: K.High,
          }),
            Cr((j) => {
              const de = new Set(j);
              return (de.delete(f), de);
            }),
            console.log(
              `[DEBUG] Successfully charged order ${f}, clearing charging flag`,
            ));
        } catch (T) {
          (console.error("Error confirming order:", T),
            Cr((Q) => {
              const j = new Set(Q);
              return (j.delete(f), j);
            }));
          const B = T instanceof Error ? T.message : "Unknown error occurred";
          throw (
            r(
              "Confirmation Error",
              "Failed to confirm order and apply charges: " + B,
            ),
            T
          );
        }
      },
      Ms = async (f, g) => {
        const v = A.find((T) => T.id === f);
        if (!v) return;
        const w = ce.find((T) => T.orderIds.includes(f));
        if (w) {
          n(
            "Order In Consolidation",
            `This order is currently in consolidation "${w.name}" and its status is managed automatically by the consolidation. Manual status updates are not allowed. To change this order's status, manage it through the consolidation or remove it from the consolidation first.`,
          );
          return;
        }
        const C = le.some((T) => T.relatedId === f && T.type === "individual"),
          M = ce.some(
            (T) =>
              T.orderIds.includes(f) &&
              [m.InTransit, m.Delivered, m.Completed].includes(T.status),
          ),
          E = [
            d.InTransit,
            d.AtOriginPort,
            d.InTransitSea,
            d.AtDestinationPort,
            d.CustomsClearance,
            d.AwaitingDelivery,
            d.OutForDelivery,
            d.Delivered,
            d.Completed,
          ],
          D = v.status === d.Cancelled && (C || M);
        if (E.includes(v.status) || D) {
          const B = [
            d.InTransit,
            d.AtOriginPort,
            d.InTransitSea,
            d.AtDestinationPort,
            d.CustomsClearance,
            d.AwaitingDelivery,
            d.OutForDelivery,
          ].includes(v.status)
            ? "This order is locked because it is currently being shipped. Status changes for shipped orders must be managed through the Shipments page for proper tracking and audit purposes."
            : "This order is locked because it has already been delivered or has shipment activity. For audit and business reasons, these orders cannot be edited. If you need to make an exception, please contact an administrator.";
          n("Order Locked", B);
          return;
        }
        if (g === d.InTransit) {
          tr(v);
          return;
        }
        let S = !1;
        if (
          (v.status === d.Pending &&
            g === d.Processing &&
            (await Hr(f), (S = !0)),
          g === d.Processing && !S)
        ) {
          const T = R.filter(
              (X) => X.relatedOrderId === f && X.type === ee.OrderCost,
            ).reduce((X, V) => X + Math.abs(V.amount), 0),
            B = R.filter(
              (X) => X.relatedOrderId === f && X.type === ee.ServiceFee,
            ).reduce((X, V) => X + Math.abs(V.amount), 0),
            Q = R.filter(
              (X) => X.relatedOrderId === f && X.type === ee.OrderCostReversal,
            ).reduce((X, V) => X + Math.abs(V.amount), 0),
            j = R.filter(
              (X) => X.relatedOrderId === f && X.type === ee.ServiceFeeReversal,
            ).reduce((X, V) => X + Math.abs(V.amount), 0),
            de = Math.max(0, T - Q),
            se = Math.max(0, B - j);
          de > 0.01 || se > 0.01 || (await Hr(f));
        }
        const $ = v.status;
        await We(f, { status: g }, !0);
        try {
          await $e.logAction(ot.ORDER_STATUS_UPDATED, "order", f, {
            userId: s == null ? void 0 : s.id,
            changes: [{ field: "status", previousValue: $, newValue: g }],
            metadata: { previousStatus: $, newStatus: g },
          });
        } catch (T) {
          console.warn("Audit log failed (non-fatal):", T);
        }
        if (g === d.Cancelled) {
          const T = R.filter(
              (Y) => Y.relatedOrderId === f && Y.type === ee.OrderCost,
            ).reduce((Y, X) => Y + Math.abs(X.amount), 0),
            B = R.filter(
              (Y) => Y.relatedOrderId === f && Y.type === ee.ServiceFee,
            ).reduce((Y, X) => Y + Math.abs(X.amount), 0),
            Q = R.filter(
              (Y) => Y.relatedOrderId === f && Y.type === ee.OrderCostReversal,
            ).reduce((Y, X) => Y + Math.abs(X.amount), 0),
            j = R.filter(
              (Y) => Y.relatedOrderId === f && Y.type === ee.ServiceFeeReversal,
            ).reduce((Y, X) => Y + Math.abs(X.amount), 0),
            de = Math.max(0, T - Q),
            se = Math.max(0, B - j);
          (de > 0.01 &&
            (await Sr({
              customerId: v.customerId,
              amount: Math.abs(de),
              description: `Order cost reversal for cancelled order ${Se(v.id, "order")}`,
              type: ee.OrderCostReversal,
              relatedOrderId: v.id,
            })),
            se > 0.01 &&
              (await Sr({
                customerId: v.customerId,
                amount: Math.abs(se),
                description: `Service fee reversal for cancelled order ${Se(v.id, "order")}`,
                type: ee.ServiceFeeReversal,
                relatedOrderId: v.id,
              })));
        }
        (await ie.createOrderStatusNotification(
          f,
          String($ || ""),
          String(g),
          v.customerId || "",
          v.description || "",
        ),
          await st());
      },
      Ls = async (f, g, v, w, C, M, E) => {
        if (le.find((S) => S.relatedId === f && S.type === "individual")) {
          (n(
            "Shipment Exists",
            "A shipment already exists for this order. Please check the Shipments page.",
          ),
            tr(null));
          return;
        }
        try {
          const S = A.find(($) => $.id === f);
          if (!S) throw new Error("Order not found");
          (await Rr.createIndividualShipment(f, g, v, w, S, C, M, E),
            await tt(),
            await Ge(),
            await at(),
            await st());
        } catch (S) {
          r("Creation Error", "Error creating shipment: " + S);
        } finally {
          tr(null);
        }
      },
      Ge = x.useCallback(async (f = null) => {
        try {
          const g = f ? await yt.getByCustomerId(f) : await yt.fetchAll();
          W(g);
        } catch (g) {
          (console.error("Error fetching shipments:", g),
            r("Fetch Error", "Error fetching shipments: " + g));
        }
      }, [r]),
      Mn = async (f, g, v, w, C, M, E) => {
        if (le.find((T) => T.relatedId === f && T.type === "consolidation")) {
          n(
            "Shipment Exists",
            "A shipment already exists for this consolidation. Please check the Shipments page.",
          );
          return;
        }
        const S = ce.find((T) => T.id === f);
        if (S != null && S.shippingCostDistributed) {
          n(
            "Already Distributed",
            "Shipping costs have already been distributed for this consolidation.",
          );
          return;
        }
        if (await yt.existsForRelatedId(f, "consolidation")) {
          n(
            "Shipment Exists",
            "A shipment already exists for this consolidation. Please check the Shipments page.",
          );
          return;
        }
        if (!S) {
          r(
            "Consolidation Not Found",
            "Could not find the consolidation to create shipment for.",
          );
          return;
        }
        try {
          (await lr.createShipment(f, g, v, w, C, M, E, S, A),
            await Ge(),
            await Ke(),
            await at(),
            await st());
        } catch (T) {
          const B = T instanceof Error ? T.message : String(T);
          if (
            B.includes("Duplicate shipment") ||
            B.includes("idempotency_key")
          ) {
            n(
              "Shipment Exists",
              "A shipment already exists for this consolidation. Please check the Shipments page.",
            );
            return;
          }
          r("Creation Error", "Error creating consolidation shipment: " + B);
        }
      },
      Fs = async (f, g, v) => {
        try {
          const w = le.find((C) => C.id === f) || null;
          (await yt.updateTracking(f, g, v), xr(null), await Ge());
          try {
            await $e.logAction(ot.SHIPMENT_TRACKING_UPDATED, "shipment", f, {
              userId: s == null ? void 0 : s.id,
              previousState: w || void 0,
              newState: { ...(w || {}), carrier: g, trackingUrl: v },
              changes: [
                {
                  field: "carrier",
                  previousValue: w == null ? void 0 : w.carrier,
                  newValue: g,
                },
                {
                  field: "trackingUrl",
                  previousValue: w == null ? void 0 : w.trackingUrl,
                  newValue: v,
                },
              ],
            });
          } catch (C) {
            console.warn("Audit log failed (non-fatal):", C);
          }
        } catch (w) {
          (console.error("Error updating shipment tracking:", w),
            r("Update Error", "Error updating shipment tracking: " + w));
        }
      },
      Us = async (f, g, v = !1) => {
        const w = le.find((M) => M.id === f);
        if (!w) return;
        const C = w.status;
        try {
          if (
            (W((M) => M.map((E) => (E.id === f ? { ...E, status: g } : E))),
            w.type === "consolidation" && !v)
          ) {
            const E = {
              [m.InTransit]: m.InTransit,
              [m.AtOriginPort]: m.AtOriginPort,
              [m.InTransitSea]: m.InTransitSea,
              [m.AtDestinationPort]: m.AtDestinationPort,
              [m.CustomsClearance]: m.CustomsClearance,
              [m.AwaitingDelivery]: m.AwaitingDelivery,
              [m.OutForDelivery]: m.OutForDelivery,
              [m.Delivered]: m.Delivered,
              [m.Completed]: m.Completed,
              [m.Cancelled]: m.Cancelled,
              [m.OnHold]: m.OnHold,
            }[g];
            E &&
              (ge((D) =>
                D.map((S) => (S.id === w.relatedId ? { ...S, status: E } : S)),
              ),
              Bs(w.relatedId, E, !0));
          }
          if (w.type === "individual") {
            const E = {
              InTransit: d.InTransit,
              AtOriginPort: d.AtOriginPort,
              InTransitSea: d.InTransitSea,
              AtDestinationPort: d.AtDestinationPort,
              CustomsClearance: d.CustomsClearance,
              AwaitingDelivery: d.AwaitingDelivery,
              OutForDelivery: d.OutForDelivery,
              Delivered: d.Delivered,
              Completed: d.Delivered,
              Cancelled: d.Cancelled,
              OnHold: d.OnHold,
            }[g];
            if (E) {
              (H((S) =>
                S.map(($) => ($.id === w.relatedId ? { ...$, status: E } : $)),
              ),
                We(w.relatedId, { status: E }, !0));
              const D = A.find((S) => S.id === w.relatedId);
              D &&
                ie.createOrderStatusNotification(
                  w.relatedId,
                  String(D.status),
                  String(E),
                  D.customerId || "",
                  D.description || "",
                );
            }
          }
          await yt.updateStatus(f, g, w);
          try {
            await $e.logAction(ot.SHIPMENT_STATUS_UPDATED, "shipment", f, {
              userId: s == null ? void 0 : s.id,
              changes: [{ field: "status", previousValue: C, newValue: g }],
              metadata: {
                previousStatus: C,
                newStatus: g,
                skipConsolidationSync: v,
              },
            });
          } catch (M) {
            console.warn("Audit log failed (non-fatal):", M);
          }
          st();
        } catch (M) {
          (console.error("Error updating shipment status:", M),
            r("Update Error", "Error updating shipment status: " + M),
            Ge(),
            tt());
        }
      },
      Ke = x.useCallback(async (f = null) => {
        (Re(!0), Ee(null));
        try {
          const g = f ? await lr.getByCustomerId(f) : await lr.fetchAll();
          ge(g);
        } catch (g) {
          (console.error("Error fetching consolidations:", g),
            Ee(
              g instanceof Error ? g.message : "Failed to fetch consolidations",
            ));
        } finally {
          Re(!1);
        }
      }, []),
      Ln = async (f, g, v, w, C, M) => {
        try {
          console.log("ğŸ–¥ï¸ UI CALLING consolidationService.create:", {
            consolidationName: f.name,
            estimatedShippingCost: g,
            estimatedShippingCostType: typeof g,
            isMixed: w,
            costDistributionMethod: C,
          });
          const E = await lr.create(f, g, v, w, C, M);
          return (ge((D) => [...D, E]), E);
        } catch (E) {
          return (
            r("Creation Error", "Error creating consolidation: " + E),
            null
          );
        }
      },
      Fn = async (f, g) => {
        const v = ce.find((S) => S.id === f),
          w = {};
        (g.name !== void 0 && (w.name = g.name),
          g.route !== void 0 && (w.route = g.route),
          g.departureDate !== void 0 && (w.departure_date = g.departureDate),
          g.containerTypeId !== void 0 &&
            (w.container_type_id = g.containerTypeId),
          g.shippingCost !== void 0 && (w.shipping_cost = g.shippingCost),
          g.estimatedShippingCost !== void 0 &&
            (w.estimated_shipping_cost =
              g.estimatedShippingCost > 0 ? g.estimatedShippingCost : null),
          g.status !== void 0 && (w.status = g.status));
        const C =
            g.estimatedShippingCost !== void 0
              ? g.estimatedShippingCost
              : ((v == null ? void 0 : v.estimatedShippingCost) ?? 0),
          M =
            g.shippingCost !== void 0
              ? g.shippingCost
              : ((v == null ? void 0 : v.shippingCost) ?? 0);
        if (g.shippingCost !== void 0 || g.estimatedShippingCost !== void 0)
          if (C > 0 && M > 0) {
            const S = M - C,
              $ = (S / C) * 100;
            ((w.cost_variance = S), (w.cost_variance_percentage = $));
          } else
            ((w.cost_variance = null), (w.cost_variance_percentage = null));
        if (
          (g.isMixed !== void 0 && (w.is_mixed = g.isMixed),
          g.customerId !== void 0 && (w.customer_id = g.customerId),
          g.shippingCostDistributed !== void 0 &&
            (w.shipping_cost_distributed = g.shippingCostDistributed),
          g.costDistributionMethod !== void 0 &&
            (w.cost_distribution_method = g.costDistributionMethod),
          g.fixedRatePerM3 !== void 0 &&
            (w.fixed_rate_per_m3 = g.fixedRatePerM3),
          g.totalBilledAmount !== void 0 &&
            (w.total_billed_amount = g.totalBilledAmount),
          g.notes !== void 0 && (w.notes = g.notes),
          g.containerTypeId !== void 0)
        ) {
          const S = ce.find((T) => T.id === f),
            $ = $r.find((T) => T.id === g.containerTypeId);
          if (S && $) {
            const T = A.filter((se) => S.orderIds.includes(se.id)),
              B = T.reduce((se, Y) => se + Y.volumeM3, 0),
              Q = T.reduce((se, Y) => se + Y.weightKG, 0),
              j = Math.min((B / $.maxVolumeM3) * 100, 100),
              de = Math.min((Q / $.maxWeightKG) * 100, 100);
            ((w.container_space_filled_percentage = j),
              (w.container_weight_filled_percentage = de));
          }
        }
        const { data: E, error: D } = await _.from("consolidations")
          .update(w)
          .eq("id", f)
          .select();
        if (D) r("Update Error", "Error updating consolidation: " + D.message);
        else {
          const { data: S, error: $ } = await _.from(
            "consolidations_with_orders",
          )
            .select("*")
            .eq("id", f)
            .single();
          if ($)
            r(
              "Fetch Error",
              "Error fetching updated consolidation: " + $.message,
            );
          else {
            const T = {
              id: S.id,
              name: S.name,
              route: S.route,
              departureDate: S.departure_date,
              creationDate: S.creation_date,
              orderIds: S.order_ids || [],
              containerTypeId: S.container_type_id,
              containerSpaceFilledPercentage:
                S.container_space_filled_percentage || 0,
              containerWeightFilledPercentage:
                S.container_weight_filled_percentage || 0,
              shippingCost: S.shipping_cost,
              estimatedShippingCost: S.estimated_shipping_cost ?? void 0,
              costVariance: S.cost_variance ?? void 0,
              costVariancePercentage: S.cost_variance_percentage ?? void 0,
              status: S.status,
              isMixed: S.is_mixed,
              customerId: S.customer_id,
              involvedCustomerIds: S.involved_customer_ids || [],
              shippingCostDistributed: S.shipping_cost_distributed,
              costDistributionMethod: S.cost_distribution_method,
              fixedRatePerM3: S.fixed_rate_per_m3,
              totalBilledAmount: S.total_billed_amount,
              notes: S.notes,
            };
            if (
              (ge((B) => B.map((Q) => (Q.id === f ? T : Q))),
              T.status === m.Cancelled)
            )
              for (const B of T.orderIds)
                await We(B, { status: d.ReadyToShip }, !0);
            else {
              const Q =
                {
                  [m.Planning]: d.Processing,
                  [m.OrderCollection]: d.Processing,
                  [m.DocumentPreparation]: d.Processing,
                  [m.Loading]: d.QualityCheck,
                  [m.QualityCheck]: d.QualityCheck,
                  [m.ReadyToShip]: d.ReadyToShip,
                  [m.InTransit]: d.InTransit,
                  [m.AtOriginPort]: d.AtOriginPort,
                  [m.InTransitSea]: d.InTransitSea,
                  [m.AtDestinationPort]: d.AtDestinationPort,
                  [m.CustomsClearance]: d.CustomsClearance,
                  [m.AwaitingDelivery]: d.AwaitingDelivery,
                  [m.OutForDelivery]: d.OutForDelivery,
                  [m.Delivered]: d.Delivered,
                  [m.Completed]: d.Delivered,
                  [m.OnHold]: d.OnHold,
                  [m.Cancelled]: d.ReadyToShip,
                }[T.status] || d.Processing;
              for (const j of T.orderIds) await We(j, { status: Q }, !0);
            }
          }
        }
      },
      Bs = async (f, g, v = !1) => {
        const w = ce.find((E) => E.id === f);
        if (!w) return;
        if (
          w.orderIds
            .map((E) => A.find((D) => D.id === E))
            .filter((E) => E && [d.Delivered, d.Cancelled].includes(E.status))
            .length > 0
        ) {
          n(
            "Consolidation Locked",
            "This consolidation cannot be updated because one or more related orders are locked (shipped, delivered, or cancelled). For audit and business reasons, shipped/delivered/cancelled orders and their consolidations cannot be changed. If you need to make an exception, please contact an administrator.",
          );
          return;
        }
        if (
          le.find((E) => E.type === "consolidation" && E.relatedId === f) &&
          !v
        ) {
          n(
            "Consolidation Locked",
            'This consolidation status cannot be changed directly because it has an associated shipment. Please manage the status through the Shipments page instead. Once a consolidation becomes "In Transit" and creates a shipment, all status changes must be done through shipment management for audit and tracking purposes.',
          );
          return;
        }
        try {
          const E = w.status;
          (await lr.updateStatus(f, g, w),
            ge(($) => $.map((T) => (T.id === f ? { ...T, status: g } : T))));
          const D = le.find(
            ($) => $.type === "consolidation" && $.relatedId === f,
          );
          if (D && !v) {
            const T = {
              [m.InTransit]: m.InTransit,
              [m.AtOriginPort]: m.AtOriginPort,
              [m.InTransitSea]: m.InTransitSea,
              [m.AtDestinationPort]: m.AtDestinationPort,
              [m.CustomsClearance]: m.CustomsClearance,
              [m.AwaitingDelivery]: m.AwaitingDelivery,
              [m.OutForDelivery]: m.OutForDelivery,
              [m.Delivered]: m.Delivered,
              [m.Completed]: m.Completed,
              [m.Cancelled]: m.Cancelled,
              [m.OnHold]: m.OnHold,
              [m.Planning]: m.Planning,
              [m.OrderCollection]: m.OrderCollection,
              [m.DocumentPreparation]: m.DocumentPreparation,
              [m.Loading]: m.Loading,
              [m.QualityCheck]: m.QualityCheck,
              [m.ReadyToShip]: m.ReadyToShip,
            }[g];
            T && (await Us(D.id, T, !0));
          }
          const S = A.filter(($) => w.orderIds.includes($.id));
          if (g === m.Cancelled) {
            for (const $ of S)
              (await We($.id, { status: d.ReadyToShip }, !0),
                await ie.createNotification({
                  userId: $.customerId,
                  message: `Consolidation "${w.name}" has been cancelled. Your order "${$.description}" is now ready for individual shipping or will be included in a new consolidation.`,
                  linkToPage: "orders",
                  linkToId: $.id,
                  importance: K.High,
                }));
            (await qs(w.id, []),
              await ie.createSystemNotification(
                `Consolidation "${w.name}" cancelled. ${S.length} orders returned to available pool.`,
                { linkToPage: "consolidations", linkToId: w.id },
              ));
          } else {
            const T = {
                [m.Planning]: d.Processing,
                [m.OrderCollection]: d.Processing,
                [m.DocumentPreparation]: d.Processing,
                [m.Loading]: d.QualityCheck,
                [m.QualityCheck]: d.QualityCheck,
                [m.ReadyToShip]: d.ReadyToShip,
                [m.InTransit]: d.InTransit,
                [m.AtOriginPort]: d.AtOriginPort,
                [m.InTransitSea]: d.InTransitSea,
                [m.AtDestinationPort]: d.AtDestinationPort,
                [m.CustomsClearance]: d.CustomsClearance,
                [m.AwaitingDelivery]: d.AwaitingDelivery,
                [m.OutForDelivery]: d.OutForDelivery,
                [m.Delivered]: d.Delivered,
                [m.Completed]: d.Delivered,
                [m.OnHold]: d.OnHold,
                [m.Cancelled]: d.ReadyToShip,
              }[g],
              B = {
                [d.Pending]: 2,
                [d.Processing]: 3,
                [d.QualityCheck]: 4,
                [d.ReadyToShip]: 5,
                [d.InConsolidation]: 5,
                [d.InTransit]: 6,
                [d.AtOriginPort]: 7,
                [d.InTransitSea]: 8,
                [d.AtDestinationPort]: 9,
                [d.CustomsClearance]: 10,
                [d.AwaitingDelivery]: 11,
                [d.OutForDelivery]: 12,
                [d.Delivered]: 13,
                [d.Completed]: 13,
                [d.OnHold]: 0,
                [d.Cancelled]: 0,
              };
            for (const Q of S) {
              const j = B[Q.status] || 0;
              if ((B[T] || 0) > j) {
                const Y = Q.status;
                (await We(Q.id, { status: T }, !0),
                  await ie.createOrderStatusNotification(
                    Q.id,
                    String(Y),
                    String(T),
                    Q.customerId,
                    Q.description,
                  ));
              }
            }
          }
          (await ie.createSystemNotification(
            `Consolidation "${w.name}" status changed from ${E} to ${g}`,
            {
              linkToPage: "consolidations",
              linkToId: w.id,
              importance: K.Medium,
            },
          ),
            await st());
        } catch (E) {
          r("Update Error", "Error updating consolidation status: " + E);
        }
      },
      qs = async (f, g) => {
        const v = ce.find((V) => V.id === f),
          w = $r.find((V) => V.id === (v == null ? void 0 : v.containerTypeId));
        if (!v || !w) {
          r("Not Found", "Error: Consolidation or container type not found.");
          return;
        }
        const C = v.orderIds || [],
          M = g.filter((V) => !C.includes(V)),
          E = C.filter((V) => !g.includes(V));
        for (const V of M) {
          const be = A.find((fe) => fe.id === V);
          (be == null ? void 0 : be.status) === d.Pending && (await Hr(V));
        }
        const D = A.filter((V) => g.includes(V.id)),
          S = D.reduce((V, be) => V + be.volumeM3, 0),
          $ = D.reduce((V, be) => V + be.weightKG, 0),
          T = [...new Set(D.map((V) => V.customerId).filter(Boolean))],
          B = T.length > 1,
          Q = B ? null : (T[0] ?? null);
        console.log(`Updating consolidation ${f} - involved customer IDs:`, T);
        const j = Math.min((S / w.maxVolumeM3) * 100, 100),
          de = Math.min(($ / w.maxWeightKG) * 100, 100);
        if (E.length > 0) {
          const { error: V } = await _.from("consolidation_orders")
            .delete()
            .eq("consolidation_id", f)
            .in("order_id", E);
          if (V) {
            r("Delete Error", "Error removing selected orders: " + V.message);
            return;
          }
        }
        if (M.length > 0) {
          const V = M.map((fe) => ({ consolidation_id: f, order_id: fe })),
            { error: be } = await _.from("consolidation_orders").upsert(V, {
              onConflict: "consolidation_id,order_id",
              ignoreDuplicates: !0,
            });
          if (be) {
            r("Database Error", "Error adding selected orders: " + be.message);
            return;
          }
        }
        const se = {};
        T.length > 0 && ((se.is_mixed = B), (se.customer_id = Q));
        const { data: Y, error: X } = await _.from("consolidations")
          .update({
            container_space_filled_percentage: j,
            container_weight_filled_percentage: de,
            involved_customer_ids: T,
            ...se,
          })
          .eq("id", f)
          .select();
        if (X)
          r(
            "Update Error",
            "Error updating consolidation percentages: " + X.message,
          );
        else {
          const { data: V, error: be } = await _.from(
            "consolidations_with_orders",
          )
            .select("*")
            .eq("id", f)
            .single();
          if (be)
            r(
              "Fetch Error",
              "Error fetching updated consolidation: " + be.message,
            );
          else {
            const fe = {
              id: V.id,
              name: V.name,
              route: V.route,
              departureDate: V.departure_date,
              creationDate: V.creation_date,
              orderIds: V.order_ids || [],
              containerTypeId: V.container_type_id,
              containerSpaceFilledPercentage:
                V.container_space_filled_percentage || 0,
              containerWeightFilledPercentage:
                V.container_weight_filled_percentage || 0,
              shippingCost: V.shipping_cost,
              status: V.status,
              isMixed: V.is_mixed,
              customerId: V.customer_id,
              involvedCustomerIds: V.involved_customer_ids || [],
              shippingCostDistributed: V.shipping_cost_distributed,
              costDistributionMethod: V.cost_distribution_method,
              fixedRatePerM3: V.fixed_rate_per_m3,
              totalBilledAmount: V.total_billed_amount,
              notes: V.notes,
            };
            ge((ke) => ke.map((ve) => (ve.id === f ? fe : ve)));
            try {
              await $e.logAction(
                ot.CONSOLIDATION_ORDERS_UPDATED,
                "consolidation",
                f,
                {
                  userId: s == null ? void 0 : s.id,
                  previousState: { ...v, orderIds: C },
                  newState: fe,
                  metadata: {
                    addedOrderIds: M,
                    removedOrderIds: E,
                    involvedCustomerIds: T,
                  },
                  changes: [
                    { field: "orderIds", previousValue: C, newValue: g },
                    {
                      field: "involvedCustomerIds",
                      previousValue: v.involvedCustomerIds || [],
                      newValue: T,
                    },
                  ],
                },
              );
            } catch (ke) {
              console.warn("Audit log failed (non-fatal):", ke);
            }
            if (M.length > 0) {
              const ke = [
                  m.Planning,
                  m.OrderCollection,
                  m.DocumentPreparation,
                ].includes(fe.status),
                xe =
                  {
                    [m.Planning]: d.InConsolidation,
                    [m.OrderCollection]: d.InConsolidation,
                    [m.DocumentPreparation]: d.InConsolidation,
                    [m.Loading]: d.QualityCheck,
                    [m.QualityCheck]: d.QualityCheck,
                    [m.ReadyToShip]: d.ReadyToShip,
                    [m.InTransit]: d.InTransit,
                    [m.AtOriginPort]: d.AtOriginPort,
                    [m.InTransitSea]: d.InTransitSea,
                    [m.AtDestinationPort]: d.AtDestinationPort,
                    [m.CustomsClearance]: d.CustomsClearance,
                    [m.AwaitingDelivery]: d.AwaitingDelivery,
                    [m.OutForDelivery]: d.OutForDelivery,
                    [m.Delivered]: d.Delivered,
                    [m.Completed]: d.Delivered,
                    [m.OnHold]: d.OnHold,
                    [m.Cancelled]: d.ReadyToShip,
                  }[fe.status] || d.InConsolidation,
                Ue = {
                  [d.Pending]: 2,
                  [d.Processing]: 3,
                  [d.QualityCheck]: 4,
                  [d.ReadyToShip]: 5,
                  [d.InConsolidation]: 5,
                  [d.InTransit]: 6,
                  [d.AtOriginPort]: 7,
                  [d.InTransitSea]: 8,
                  [d.AtDestinationPort]: 9,
                  [d.CustomsClearance]: 10,
                  [d.AwaitingDelivery]: 11,
                  [d.OutForDelivery]: 12,
                  [d.Delivered]: 13,
                  [d.Completed]: 13,
                  [d.OnHold]: 0,
                  [d.Cancelled]: 0,
                };
              for (const Ae of M) {
                const Ve = A.find((Qe) => Qe.id === Ae);
                if (Ve) {
                  let Qe;
                  if (ke) {
                    const lt = Ue[Ve.status] || 0,
                      ct = Ue[d.QualityCheck] || 0;
                    (lt >= ct,
                      (Qe = d.InConsolidation),
                      console.log(`[DEBUG] Planning phase - Order ${Ae}:`, {
                        orderStatus: Ve.status,
                        currentOrderLevel: lt,
                        preservedReadiness: lt >= ct,
                        newStatus: Qe,
                        consolidationPhase: fe.status,
                      }));
                  } else {
                    const lt = Ue[Ve.status] || 0,
                      ct = Ue[xe] || 0;
                    (console.log(`[DEBUG] Operational phase - Order ${Ae}:`, {
                      orderStatus: Ve.status,
                      currentOrderLevel: lt,
                      consolidationStatus: fe.status,
                      consolidationMappedStatus: xe,
                      consolidationLevel: ct,
                      willAdvance: ct > lt,
                    }),
                      (Qe = ct > lt ? xe : Ve.status));
                  }
                  const Tr = Ve.status;
                  (Tr !== Qe &&
                    (await We(Ae, { status: Qe }, !0),
                    await ie.createOrderStatusNotification(
                      Ae,
                      String(Tr),
                      String(Qe),
                      Ve.customerId,
                      Ve.description,
                    )),
                    await ie.createNotification({
                      userId: Ve.customerId,
                      message: `Order "${Ve.description}" has been added to consolidation "${v.name}"`,
                      linkToPage: "consolidations",
                      linkToId: f,
                      importance: K.High,
                    }));
                }
              }
            }
            if (E.length > 0)
              for (const ke of E) {
                const ve = A.find((xe) => xe.id === ke);
                if (ve) {
                  const xe = ve.status;
                  (await We(ke, { status: d.ReadyToShip }, !0),
                    xe !== d.ReadyToShip &&
                      (await ie.createOrderStatusNotification(
                        ke,
                        String(xe),
                        String(d.ReadyToShip),
                        ve.customerId,
                        ve.description,
                      )),
                    await ie.createNotification({
                      userId: ve.customerId,
                      message: `Order "${ve.description}" has been removed from consolidation "${v.name}"`,
                      linkToPage: "consolidations",
                      linkToId: f,
                      importance: K.High,
                    }));
                }
              }
            let Je;
            fe.status === m.Cancelled
              ? (Je = d.ReadyToShip)
              : ([
                  m.Planning,
                  m.OrderCollection,
                  m.DocumentPreparation,
                ].includes(fe.status),
                (Je =
                  {
                    [m.Planning]: d.InConsolidation,
                    [m.OrderCollection]: d.InConsolidation,
                    [m.DocumentPreparation]: d.InConsolidation,
                    [m.Loading]: d.QualityCheck,
                    [m.QualityCheck]: d.QualityCheck,
                    [m.ReadyToShip]: d.ReadyToShip,
                    [m.InTransit]: d.InTransit,
                    [m.AtOriginPort]: d.AtOriginPort,
                    [m.InTransitSea]: d.InTransitSea,
                    [m.AtDestinationPort]: d.AtDestinationPort,
                    [m.CustomsClearance]: d.CustomsClearance,
                    [m.AwaitingDelivery]: d.AwaitingDelivery,
                    [m.OutForDelivery]: d.OutForDelivery,
                    [m.Delivered]: d.Delivered,
                    [m.Completed]: d.Delivered,
                    [m.OnHold]: d.OnHold,
                    [m.Cancelled]: d.ReadyToShip,
                  }[fe.status] || d.InConsolidation));
            const ir = [
                m.Planning,
                m.OrderCollection,
                m.DocumentPreparation,
              ].includes(fe.status),
              wt = {
                [d.Pending]: 2,
                [d.Processing]: 3,
                [d.QualityCheck]: 4,
                [d.ReadyToShip]: 5,
                [d.InConsolidation]: 5,
                [d.InTransit]: 6,
                [d.AtOriginPort]: 7,
                [d.InTransitSea]: 8,
                [d.AtDestinationPort]: 9,
                [d.CustomsClearance]: 10,
                [d.AwaitingDelivery]: 11,
                [d.OutForDelivery]: 12,
                [d.Delivered]: 13,
                [d.Completed]: 13,
                [d.OnHold]: 0,
                [d.Cancelled]: 0,
              };
            for (const ke of fe.orderIds) {
              const ve = A.find((xe) => xe.id === ke);
              if (ve) {
                let xe;
                const Ue = wt[ve.status] || 0;
                if (ir) {
                  const Ae = wt[d.QualityCheck] || 0;
                  (Ue >= Ae || Ue < wt[d.InConsolidation]
                    ? (xe = d.InConsolidation)
                    : (xe = ve.status),
                    console.log(`[DEBUG] Planning phase sync - Order ${ke}:`, {
                      orderStatus: ve.status,
                      currentOrderLevel: Ue,
                      preservedReadiness: Ue >= Ae,
                      newStatus: xe,
                      consolidationPhase: fe.status,
                    }));
                } else {
                  const Ae = wt[Je] || 0;
                  (console.log(
                    `[DEBUG] Operational phase sync - Order ${ke}:`,
                    {
                      orderStatus: ve.status,
                      currentOrderLevel: Ue,
                      consolidationStatus: fe.status,
                      consolidationMappedStatus: Je,
                      consolidationLevel: Ae,
                      willAdvance: Ae > Ue,
                    },
                  ),
                    (xe = Ae > Ue ? Je : ve.status));
                }
                if (ve.status !== xe) {
                  const Ae = ve.status;
                  (await We(ke, { status: xe }, !0),
                    await ie.createOrderStatusNotification(
                      ke,
                      String(Ae),
                      String(xe),
                      ve.customerId,
                      ve.description,
                    ));
                }
              }
            }
            await st();
          }
        }
      },
      Un = async (f, g, v) => {
        try {
          const w = await He.createIncomingPayment(f, g, v);
          return w
            ? (ue((C) => [...C, w]),
              i(
                "Payment Added",
                `Payment of $${g.toLocaleString()} has been successfully recorded!`,
              ),
              !0)
            : !1;
        } catch (w) {
          return (r("Database Error", "Error adding payment: " + w), !1);
        }
      },
      Bn = async (f, g, v) => {
        try {
          const w = await He.createRefundPayout(f, g, v);
          return w
            ? (ue((C) => [...C, w]),
              i(
                "Refund Recorded",
                `Refund payout of $${g.toLocaleString()} has been successfully recorded!`,
              ),
              !0)
            : !1;
        } catch (w) {
          return (r("Database Error", "Error recording refund: " + w), !1);
        }
      },
      qn = async (f, g, v, w, C, M) => {
        try {
          if (!M && f === null && C) {
            const D = ce.find((S) => S.id === C);
            if (D && D.isMixed && D.involvedCustomerIds.length > 0) {
              const S = A.filter((T) => D.orderIds.includes(T.id)),
                $ = S.reduce((T, B) => T + B.volumeM3, 0);
              if ($ > 0) {
                const T = [],
                  B = new Map();
                for (const Q of S) {
                  const j = B.get(Q.customerId) || 0;
                  B.set(Q.customerId, j + Q.volumeM3);
                }
                for (const [Q, j] of B) {
                  const de = (j / $) * g;
                  if (de > 0) {
                    const se = await He.createMiscellaneousCost(
                      Q,
                      de,
                      `${v} (Mixed Consolidation: ${D.name})`,
                      void 0,
                      C,
                    );
                    se && T.push(se);
                  }
                }
                if (T.length > 0)
                  return (
                    ue((Q) => [...Q, ...T]),
                    i(
                      "Cost Distributed",
                      `Miscellaneous cost of $${g.toLocaleString()} has been distributed among ${T.length} customers based on volume usage!`,
                    ),
                    !0
                  );
              }
              n(
                "Distribution Failed",
                "Could not distribute cost to customers. Creating as system cost.",
              );
            }
          }
          const E = await He.createMiscellaneousCost(f, g, v, w, C);
          return E
            ? (ue((S) => [...S, E]),
              i(
                "Cost Added",
                `Miscellaneous ${f ? "customer-specific" : "system"} cost of $${g.toLocaleString()} has been successfully recorded!`,
              ),
              !0)
            : !1;
        } catch (E) {
          return (
            r("Database Error", "Error adding miscellaneous cost: " + E),
            !1
          );
        }
      },
      zr = async (f) => {
        const { data: g, error: v } = await _.from("notifications")
          .update({ is_read: !0 })
          .eq("id", f)
          .select();
        v
          ? r(
              "Update Error",
              "Error marking notification as read: " + v.message,
            )
          : we((w) => w.map((C) => (C.id === f ? { ...C, isRead: !0 } : C)));
      },
      Gr = x.useCallback(
        (f) => ({
          id: f.id,
          name: f.name,
          route: f.route,
          departureDate: f.departure_date,
          creationDate: f.creation_date,
          orderIds: f.order_ids || [],
          containerTypeId: f.container_type_id,
          containerSpaceFilledPercentage:
            f.container_space_filled_percentage || 0,
          containerWeightFilledPercentage:
            f.container_weight_filled_percentage || 0,
          shippingCost: f.shipping_cost,
          estimatedShippingCost: f.estimated_shipping_cost ?? void 0,
          costVariance: f.cost_variance ?? void 0,
          costVariancePercentage: f.cost_variance_percentage ?? void 0,
          status: f.status,
          isMixed: f.is_mixed,
          customerId: f.customer_id,
          involvedCustomerIds: f.involved_customer_ids || [],
          shippingCostDistributed: f.shipping_cost_distributed,
          costDistributionMethod: f.cost_distribution_method,
          fixedRatePerM3: f.fixed_rate_per_m3,
          totalBilledAmount: f.total_billed_amount,
          notes: f.notes,
        }),
        [],
      ),
      Vs = x.useCallback(
        async (f, g) => {
          const v = !Ps;
          v && Os(!0);
          try {
            const w = [
              m.Planning,
              m.OrderCollection,
              m.DocumentPreparation,
              m.Loading,
              m.QualityCheck,
              m.ReadyToShip,
              m.InTransit,
              m.AtOriginPort,
              m.InTransitSea,
              m.AtDestinationPort,
              m.CustomsClearance,
              m.AwaitingDelivery,
              m.OutForDelivery,
              m.OnHold,
            ];
            if (g) {
              const C = _.rpc("admin_dashboard_metrics", {
                  window_days: 7,
                  balance_threshold: 500,
                }),
                [M, E, D, S] = await Promise.all([
                  C,
                  (async () => {
                    const j = (se) => {
                      const Y = String(
                        (se == null ? void 0 : se.message) || "",
                      );
                      return (
                        String((se == null ? void 0 : se.code) || "") ===
                          "22P02" ||
                        Y.toLowerCase().includes(
                          "invalid input value for enum",
                        ) ||
                        (Y.toLowerCase().includes("enum") &&
                          Y.toLowerCase().includes("invalid"))
                      );
                    };
                    return _.from("orders")
                      .select(
                        "id,description,value,supplier_id,volume_m3,weight_kg,customer_id,status,notes,creation_date",
                      )
                      .order("creation_date", { ascending: !1 })
                      .limit(20)
                      .in("status", [d.Pending, d.Processing]);
                  })(),
                  _.from("consolidations_with_orders")
                    .select(
                      "id,name,route,departure_date,creation_date,order_ids,container_type_id,container_space_filled_percentage,container_weight_filled_percentage,shipping_cost,estimated_shipping_cost,cost_variance,cost_variance_percentage,status,is_mixed,customer_id,involved_customer_ids,shipping_cost_distributed,cost_distribution_method,fixed_rate_per_m3,total_billed_amount,notes",
                    )
                    .in("status", w)
                    .order("creation_date", { ascending: !1 })
                    .limit(12),
                  _.from("shipments")
                    .select(
                      "id,type,related_id,shipped_date,carrier,tracking_url,estimated_delivery,actual_delivery,description,status,customer_id,involved_customer_ids,is_mixed,origin,destination,order_id,consolidation_id",
                    )
                    .order("shipped_date", { ascending: !1 })
                    .limit(20),
                ]);
              (E.error &&
                console.error(
                  "Error fetching attention orders for dashboard:",
                  E.error,
                ),
                D.error &&
                  console.error(
                    "Error fetching consolidations for dashboard:",
                    D.error,
                  ),
                S.error &&
                  console.error(
                    "Error fetching recent shipments for dashboard:",
                    S.error,
                  ));
              const $ = (j) => {
                (Sn({
                  totalSuppliers: Number(j.total_suppliers || 0),
                  totalOrders: Number(j.total_orders || 0),
                  totalActiveConsolidations: Number(
                    j.total_active_consolidations || 0,
                  ),
                  totalShipments: Number(j.total_shipments || 0),
                }),
                  kn({
                    pendingOrders: Number(j.pending_orders || 0),
                    inProgressOrders: Number(j.in_progress_orders || 0),
                    readyOrders: Number(j.ready_orders || 0),
                    shipments: Number(j.total_shipments || 0),
                  }),
                  En({
                    departingSoon: Number(j.departing_soon || 0),
                    capacityRisk: Number(j.capacity_risk || 0),
                    missingTracking: Number(j.missing_tracking || 0),
                    missingShipment: Number(j.missing_shipment || 0),
                    negativeBalances: Number(j.negative_balances || 0),
                  }));
              };
              let T = !1;
              if (!M.error && M.data) {
                const j = M.data,
                  de = Array.isArray(j) ? (j[0] ?? null) : j;
                de
                  ? ($(de), (T = !0))
                  : console.warn(
                      "admin_dashboard_metrics returned no rows; computing metrics via fallback queries.",
                    );
              }
              if (!T) {
                console.warn(
                  "admin_dashboard_metrics RPC unavailable; computing dashboard metrics via fallback queries.",
                  M.error,
                );
                const j = new Date(),
                  de = j.toISOString().slice(0, 10),
                  se = new Date(j);
                se.setDate(se.getDate() + 7);
                const Y = se.toISOString().slice(0, 10),
                  X = '("Delivered","Completed","Cancelled")',
                  [V, be, fe, Je, ir, wt, ke, ve, xe, Ue, Ae, Ve, Qe] =
                    await Promise.all([
                      _.from("suppliers").select("*", {
                        count: "exact",
                        head: !0,
                      }),
                      _.from("orders").select("*", {
                        count: "exact",
                        head: !0,
                      }),
                      _.from("shipments").select("*", {
                        count: "exact",
                        head: !0,
                      }),
                      _.from("consolidations")
                        .select("*", { count: "exact", head: !0 })
                        .not("status", "in", X),
                      _.from("orders")
                        .select("*", { count: "exact", head: !0 })
                        .eq("status", d.Pending),
                      _.from("orders")
                        .select("*", { count: "exact", head: !0 })
                        .in("status", [d.Processing, d.QualityCheck]),
                      _.from("orders")
                        .select("*", { count: "exact", head: !0 })
                        .eq("status", d.ReadyToShip),
                      _.from("consolidations")
                        .select("*", { count: "exact", head: !0 })
                        .not("status", "in", X)
                        .gte("departure_date", de)
                        .lte("departure_date", Y),
                      _.from("consolidations")
                        .select("*", { count: "exact", head: !0 })
                        .not("status", "in", X)
                        .or(
                          "container_space_filled_percentage.gte.85,container_weight_filled_percentage.gte.85",
                        ),
                      _.from("shipments")
                        .select("*", { count: "exact", head: !0 })
                        .not("status", "in", '("Completed","Delivered")')
                        .or(
                          "carrier.is.null,carrier.eq.,tracking_url.is.null,tracking_url.eq.",
                        ),
                      _.from("consolidations")
                        .select("id")
                        .eq("status", m.ReadyToShip),
                      _.from("shipments")
                        .select("related_id")
                        .eq("type", "consolidation"),
                      _.from("payment_transactions").select(
                        "customer_id,amount",
                      ),
                    ]),
                  Tr = new Set((Ae.data || []).map((it) => it.id)),
                  lt = new Set(
                    (Ve.data || []).map((it) => it.related_id).filter(Boolean),
                  );
                let ct = 0;
                for (const it of Tr) lt.has(it) || (ct += 1);
                const Vn = 500,
                  Kr = new Map();
                for (const it of Qe.data || []) {
                  const Jr = it.customer_id;
                  if (!Jr) continue;
                  const Hn = Number(it.amount || 0);
                  Kr.set(Jr, (Kr.get(Jr) || 0) + Hn);
                }
                let Gs = 0;
                for (const [, it] of Kr) it < -Vn && (Gs += 1);
                $({
                  total_suppliers: V.count || 0,
                  total_orders: be.count || 0,
                  total_shipments: fe.count || 0,
                  total_active_consolidations: Je.count || 0,
                  pending_orders: ir.count || 0,
                  in_progress_orders: wt.count || 0,
                  ready_orders: ke.count || 0,
                  departing_soon: ve.count || 0,
                  capacity_risk: xe.count || 0,
                  missing_tracking: Ue.count || 0,
                  missing_shipment: ct,
                  negative_balances: Gs,
                });
              }
              const B = E.error ? [] : E.data || [];
              (H(
                B.map((j) => ({
                  id: j.id,
                  description: j.description,
                  value: j.value,
                  supplierId: j.supplier_id,
                  volumeM3: j.volume_m3,
                  weightKG: j.weight_kg,
                  customerId: j.customer_id,
                  status: j.status,
                  notes: j.notes,
                  creationDate: j.creation_date,
                })),
              ),
                D.error ? ge([]) : ge((D.data || []).map(Gr)),
                S.error
                  ? _e([])
                  : _e(
                      (S.data || []).map((j) => ({
                        id: j.id,
                        type: j.type,
                        relatedId: j.related_id,
                        shippingDate: j.shipped_date,
                        carrier: j.carrier,
                        trackingUrl: j.tracking_url,
                        estimatedDelivery: j.estimated_delivery,
                        actualDelivery: j.actual_delivery,
                        description: j.description,
                        status: j.status,
                        customerId: j.customer_id,
                        involvedCustomerIds: j.involved_customer_ids || [],
                        isMixed: j.is_mixed,
                        origin: j.origin,
                        destination: j.destination,
                        orderId: j.order_id,
                        consolidationId: j.consolidation_id,
                      })),
                    ));
              const Q = [
                ...new Set(B.map((j) => j.supplier_id).filter(Boolean)),
              ];
              Q.length > 0
                ? (async () => {
                    try {
                      const { data: j, error: de } = await _.from("suppliers")
                        .select(
                          "id,name,company_location,phone_number,contact_person,rating",
                        )
                        .in("id", Q);
                      if (de) throw de;
                      I(
                        (j || []).map((se) => ({
                          id: se.id,
                          name: se.name,
                          companyLocation: se.company_location,
                          phoneNumber: se.phone_number,
                          contactPerson: se.contact_person,
                          rating: se.rating,
                        })),
                      );
                    } catch (j) {
                      (console.error(
                        "Error fetching suppliers for dashboard:",
                        j,
                      ),
                        I([]));
                    }
                  })()
                : I([]);
            } else {
              const C = Ds(f),
                [M, E, D] = await Promise.all([
                  Rr.getByCustomerId(f),
                  yt.getByCustomerId(f),
                  _.from("consolidations_with_orders")
                    .select("*")
                    .or(`customer_id.eq.${f},involved_customer_ids.cs.{${f}}`)
                    .in("status", w)
                    .order("creation_date", { ascending: !1 }),
                ]);
              if ((await C, D.error)) throw D.error;
              const S = [
                ...new Set(M.map(($) => $.supplierId).filter(Boolean)),
              ];
              if (S.length > 0) {
                const { data: $, error: T } = await _.from("suppliers")
                  .select("*")
                  .in("id", S);
                if (T) throw T;
                I(
                  ($ || []).map((B) => ({
                    id: B.id,
                    name: B.name,
                    companyLocation: B.company_location,
                    phoneNumber: B.phone_number,
                    contactPerson: B.contact_person,
                    rating: B.rating,
                  })),
                );
              } else I([]);
              (H(M), W(E), ge((D.data || []).map(Gr)));
            }
          } finally {
            (v && Os(!1), js(!0));
          }
        },
        [Ps, Ds, Gr],
      );
    (x.useEffect(() => {
      s != null &&
        s.id &&
        (Is({}), js(!1), H([]), ge([]), W([]), I([]), ue([]));
    }, [s == null ? void 0 : s.id]),
      x.useEffect(() => {
        if (!(s != null && s.id) || h.length === 0 || Es[Fe]) return;
        const f = h.find((w) => w.id === s.id),
          g = (f == null ? void 0 : f.role) === "admin";
        if (!f) return;
        (async () => {
          try {
            if (Fe === "dashboard")
              g
                ? (await Vs(s.id, !0),
                  await Promise.allSettled([tt(), It(), Ke(), Ge(), at()]))
                : await Vs(s.id, !1);
            else if (g)
              Fe === "orders"
                ? await Promise.all([tt(), It(), Ke(), Ge(), at()])
                : Fe === "consolidations"
                  ? await Promise.all([Ke(), tt(), It(), Ge(), at()])
                  : Fe === "suppliers"
                    ? await Promise.all([It(), tt()])
                    : Fe === "customers"
                      ? await Promise.all([tt(), It(), Ge(), Ke(), at()])
                      : Fe === "payments"
                        ? await Promise.all([tt(), Ke(), at()])
                        : Fe === "shipments" &&
                          (await Promise.all([Ge(), tt(), Ke()]));
            else
              Fe === "orders"
                ? await Promise.all([
                    tt(s.id),
                    It(s.id),
                    Ke(s.id),
                    Ge(s.id),
                    at(s.id),
                  ])
                : Fe === "consolidations"
                  ? await Promise.all([
                      Ke(s.id),
                      tt(s.id),
                      It(s.id),
                      Ge(s.id),
                      at(s.id),
                    ])
                  : Fe === "suppliers"
                    ? await Promise.all([It(s.id), tt(s.id)])
                    : Fe === "customers"
                      ? await Promise.all([
                          tt(s.id),
                          It(s.id),
                          Ge(s.id),
                          Ke(s.id),
                          at(s.id),
                        ])
                      : Fe === "payments"
                        ? await Promise.all([tt(s.id), Ke(s.id), at(s.id)])
                        : Fe === "shipments" &&
                          (await Promise.all([
                            Ge(s.id),
                            tt(s.id),
                            Ke(s.id),
                            at(s.id),
                          ]));
            Is((w) => ({ ...w, [Fe]: !0 }));
          } catch (w) {
            console.error(`Error loading data for page "${Fe}":`, w);
          }
        })();
      }, [s == null ? void 0 : s.id, h, Fe, Es, Vs, tt, It, Ke, Ge, at]),
      x.useEffect(() => {
        if (!(s != null && s.id) || h.length === 0) return;
        const f = h.find((v) => v.id === s.id);
        (f == null ? void 0 : f.role) === "admin" &&
          ze(
            () => import("./dashboardpage.js"),
            __vite__mapDeps([0, 1, 2, 3, 4, 5]),
          );
      }, [s == null ? void 0 : s.id, h]));
    const rt = h.find((f) => f.id === (s == null ? void 0 : s.id)),
      pe = (rt == null ? void 0 : rt.role) === "admin",
      Hs = x.useMemo(() => {
        var g;
        if (!pe) return [];
        const f = [];
        for (const v of A)
          f.push({
            kind: "order",
            id: v.id,
            title: `${Se(v.id, "order")} ${v.description}`,
            subtitle: `Value $${Number(v.value || 0).toLocaleString()} • ${String(v.status)}`,
            pageId: "orders",
            itemId: v.id,
          });
        for (const v of ce)
          f.push({
            kind: "consolidation",
            id: v.id,
            title: `${Se(v.id, "consolidation")} ${v.name}`,
            subtitle: `${String(v.status)} • ${v.isMixed ? "Mixed" : "Regular"} • Orders ${((g = v.orderIds) == null ? void 0 : g.length) || 0}`,
            pageId: "consolidations",
            itemId: v.id,
          });
        for (const v of le)
          f.push({
            kind: "shipment",
            id: v.id,
            title: `${Se(v.id, "shipment")} ${v.description}`,
            subtitle: `${v.type} • ${String(v.status)} • ${v.carrier || "Carrier N/A"}`,
            pageId: "shipments",
            itemId: v.id,
          });
        for (const v of R)
          f.push({
            kind: "payment",
            id: v.id,
            title: `${Se(v.id, "payment")} ${String(v.type)}`,
            subtitle: `${v.amount < 0 ? "-" : "+"}$${Math.abs(Number(v.amount || 0)).toLocaleString()} • ${(v.description || "").slice(0, 64)}`,
            pageId: "payments",
            itemId: v.id,
          });
        return f;
      }, [pe, A, ce, le, R]),
      st = x.useCallback(async () => {
        const f = h.find((v) => v.id === (s == null ? void 0 : s.id)),
          g = (f == null ? void 0 : f.role) === "admin";
        (et(!0), N(null));
        try {
          let v = _.from("notifications")
            .select(
              "id,user_id,message,timestamp,is_read,importance,link_to_page,link_to_id",
            )
            .order("timestamp", { ascending: !1 })
            .range(0, Ts - 1);
          if (g) v = v.or(`user_id.is.null,user_id.eq."${s.id}"`);
          else if (s != null && s.id)
            v = v.or(`user_id.eq."${s.id}",user_id.is.null`);
          else {
            (we([]), et(!1));
            return;
          }
          const { data: w, error: C } = await v;
          if (C)
            (console.error("ğŸ”” Error fetching notifications:", C),
              N(C.message));
          else {
            const M = (w || []).map((E) => ({
              id: E.id,
              userId: E.user_id || E.userId,
              message: E.message,
              timestamp: E.timestamp,
              isRead: E.is_read ?? E.isRead ?? !1,
              importance: E.importance
                ? E.importance === "low"
                  ? K.Low
                  : E.importance === "medium"
                    ? K.Medium
                    : E.importance === "high"
                      ? K.High
                      : E.importance === "critical"
                        ? K.Critical
                        : K.Medium
                : K.Medium,
              linkToPage: E.link_to_page || E.linkToPage,
              linkToId: E.link_to_id || E.linkToId,
            }));
            we(M);
          }
        } catch (v) {
          (console.error("Exception fetching notifications:", v),
            N("Failed to fetch notifications"));
        }
        et(!1);
      }, [s == null ? void 0 : s.id, h, Ts]);
    x.useEffect(() => {
      s &&
        h.length > 0 &&
        (Promise.all([lc(), cc()]).then(([f, g]) => {
          (!f || !g) &&
            console.error(
              "âŒ Database schema or setup check failed. Notifications will not be created.",
            );
        }),
        st());
    }, [s, h.length, st]);
    const rr = pe
        ? R
        : R.filter((f) => f.customerId === (s == null ? void 0 : s.id)),
      Ot = pe
        ? A
        : A.filter((f) => f.customerId === (s == null ? void 0 : s.id)),
      sr = pe
        ? ce
        : ce.filter(
            (f) =>
              f.customerId === (s == null ? void 0 : s.id) ||
              f.involvedCustomerIds.includes((s == null ? void 0 : s.id) || ""),
          ),
      Wr = pe ? k : k.filter((f) => Ot.some((g) => g.supplierId === f.id)),
      kr = pe
        ? le
        : le.filter(
            (f) =>
              f.customerId === (s == null ? void 0 : s.id) ||
              f.involvedCustomerIds.includes((s == null ? void 0 : s.id) || ""),
          );
    x.useEffect(() => {
      if (!(s != null && s.id) || h.length === 0) return;
      const f = h.find((v) => v.id === s.id);
      !((f == null ? void 0 : f.role) === "admin") ||
        Ns ||
        (In(!0),
        (async () => {
          try {
            const v = new Set(h.map(($) => $.id)),
              { data: w, error: C } = await _.from("shipments")
                .select(
                  "id,type,related_id,customer_id,involved_customer_ids,is_mixed",
                )
                .or("customer_id.is.null,is_mixed.eq.true")
                .order("shipped_date", { ascending: !1 })
                .limit(5e3);
            if (C) throw C;
            const M = (w || []).filter(($) => {
              const T =
                  !$.involved_customer_ids ||
                  $.involved_customer_ids.length === 0,
                B = !$.customer_id || !v.has($.customer_id);
              return T && B;
            });
            if (M.length === 0) return;
            const E = M.filter(($) => $.type === "individual"),
              D = M.filter(($) => $.type === "consolidation");
            let S = 0;
            if (E.length > 0) {
              const $ = E.map((Q) => Q.related_id).filter(Boolean),
                { data: T, error: B } = await _.from("orders")
                  .select("id,customer_id")
                  .in("id", $);
              if (!B) {
                const Q = new Map();
                for (const j of T || [])
                  j.id && j.customer_id && Q.set(j.id, j.customer_id);
                for (const j of E) {
                  const de = Q.get(j.related_id);
                  if (!de) continue;
                  const { error: se } = await _.from("shipments")
                    .update({
                      customer_id: de,
                      is_mixed: !1,
                      involved_customer_ids: [],
                    })
                    .eq("id", j.id);
                  se || (S += 1);
                }
              }
            }
            if (D.length > 0) {
              const $ = D.map((Q) => Q.related_id).filter(Boolean),
                { data: T, error: B } = await _.from(
                  "consolidations_with_orders",
                )
                  .select(
                    "id,customer_id,is_mixed,involved_customer_ids,order_ids",
                  )
                  .in("id", $);
              if (!B) {
                const Q = new Map((T || []).map((Y) => [Y.id, Y])),
                  j = Array.from(
                    new Set((T || []).flatMap((Y) => Y.order_ids || [])),
                  ),
                  { data: de } = j.length
                    ? await _.from("orders")
                        .select("id,customer_id")
                        .in("id", j)
                    : { data: [] },
                  se = new Map();
                for (const Y of de || [])
                  Y.id && Y.customer_id && se.set(Y.id, Y.customer_id);
                for (const Y of D) {
                  const X = Q.get(Y.related_id);
                  if (!X) continue;
                  let V = X.involved_customer_ids || [];
                  V.length === 0 &&
                    (V = Array.from(
                      new Set(
                        (X.order_ids || [])
                          .map((ke) => se.get(ke))
                          .filter(Boolean),
                      ),
                    ));
                  const be = V.length > 1 || X.is_mixed === !0,
                    fe = be ? null : X.customer_id || V[0] || null,
                    Je = be ? V : fe ? [fe] : [];
                  (X.customer_id !== fe ||
                    X.is_mixed !== be ||
                    ((X.involved_customer_ids || []).length === 0 &&
                      Je.length > 0)) &&
                    (await _.from("consolidations")
                      .update({
                        customer_id: fe,
                        is_mixed: be,
                        involved_customer_ids: Je,
                      })
                      .eq("id", X.id));
                  const { error: ir } = await _.from("shipments")
                    .update({
                      customer_id: fe,
                      is_mixed: be,
                      involved_customer_ids: be ? Je : [],
                    })
                    .eq("id", Y.id);
                  ir || (S += 1);
                }
              }
            }
            S > 0 &&
              (console.warn(
                `Repaired ${S} orphan shipment(s) missing customer attribution.`,
              ),
              await Promise.allSettled([Ge(), Ke()]));
          } catch (v) {
            console.warn("Orphan shipment repair skipped/failed:", v);
          }
        })());
    }, [s == null ? void 0 : s.id, h, Ns, Ge, Ke]);
    const zs = () => {
      const f = {
          allCustomers: h,
          allSuppliers: Wr,
          allOrders: Ot,
          allConsolidations: sr,
          currentCustomerId: s == null ? void 0 : s.id,
        },
        g = (w) => {
          var C;
          return (
            ((C = k.find((M) => M.id === w)) == null ? void 0 : C.name) ||
            "Unknown Supplier"
          );
        },
        v = (w) => {
          var C;
          return (
            ((C = h.find((M) => M.id === w)) == null
              ? void 0
              : C.companyName) || "Unknown Customer"
          );
        };
      switch (Fe) {
        case "dashboard":
          const w = s ? (h.find((C) => C.id === s.id) ?? null) : null;
          return l.jsx(fc, {
            ...f,
            isAdmin: pe,
            currentCustomerId: s == null ? void 0 : s.id,
            addOrder: $s,
            updateOrderStatus: Ms,
            adminActiveConsolidations: ce.filter(
              (C) =>
                ![m.Delivered, m.Completed, m.Cancelled].includes(C.status),
            ),
            adminOrdersNeedingAttention: A.filter((C) =>
              [d.Pending, d.Processing].includes(C.status),
            ).slice(0, 10),
            customerActiveConsolidations: sr.filter(
              (C) =>
                ![m.Delivered, m.Completed, m.Cancelled].includes(C.status),
            ),
            customerOrdersAwaitingConsolidation: Ot.filter(
              (C) =>
                [
                  d.Pending,
                  d.Processing,
                  d.QualityCheck,
                  d.ReadyToShip,
                ].includes(C.status) && C.status !== d.InConsolidation,
            ),
            customerOrdersInProgressCount: Ot.filter(
              (C) =>
                ![d.Delivered, d.Completed, d.Cancelled].includes(C.status),
            ).length,
            suppliersForCustomerView: Wr,
            shipmentsForDashboard: pe ? Z : kr,
            notifications: Ze,
            totalSuppliers: pe ? vr.totalSuppliers : k.length,
            totalOrders: pe ? vr.totalOrders : A.length,
            totalActiveConsolidations: pe
              ? vr.totalActiveConsolidations
              : ce.filter((C) => ![m.Completed, m.Cancelled].includes(C.status))
                  .length,
            totalCustomers: h.length,
            totalShipments: pe ? vr.totalShipments : le.length,
            adminFlowSnapshotCounts: pe ? Cn : void 0,
            adminExceptionCounts: pe ? Tn : void 0,
            currentCustomerDetails: w,
            calculateCustomerBalance: Br,
            paymentTransactions: R,
            customerTransactions: rr,
            onNavigate: bt,
            markNotificationAsRead: zr,
            onRefresh: st,
            dashboardLoading: xn,
          });
        case "orders":
          return l.jsx(pc, {
            ...f,
            isAdmin: pe,
            currentCustomerId: s == null ? void 0 : s.id,
            orders: Ot,
            transactions: rr,
            addOrder: $s,
            updateOrderStatus: Ms,
            updateOrderDetails: We,
            deleteOrder: Rn,
            ordersLoading: J,
            ordersError: z,
            consolidations: sr,
            shipments: kr,
            onNavigate: bt,
            onNavigateToShipment: qr,
          });
        case "consolidations":
          return l.jsx(gc, {
            ...f,
            isAdmin: pe,
            currentCustomerId: s == null ? void 0 : s.id,
            consolidations: sr,
            transactions: rr,
            onRecalculateDistribution: Pn,
            addConsolidation: Ln,
            updateConsolidationDetails: Fn,
            updateConsolidationStatus: Bs,
            createShipmentFromConsolidation: Mn,
            consolidationsLoading: Ne,
            consolidationsError: Me,
            updateConsolidationOrders: qs,
            activeConsolidationId: null,
            setActiveConsolidationId: () => {},
            shipments: kr,
            onNavigate: bt,
            onNavigateToShipment: qr,
          });
        case "suppliers":
          return l.jsx(yc, {
            ...f,
            suppliers: Wr,
            orders: Ot,
            addSupplier: Nn,
            updateSupplier: An,
            deleteSupplier: Dn,
            suppliersLoading: P,
            suppliersError: G,
            isAdmin: pe,
            currentCustomerId: s == null ? void 0 : s.id,
            onNavigate: br,
          });
        case "customers":
          return l.jsx(vc, {
            ...f,
            isAdmin: pe,
            currentCustomerId: s == null ? void 0 : s.id,
            customers: h,
            addCustomer: jn,
            paymentTransactions: R,
            calculateCustomerBalance: Br,
            updateCustomer: Vr,
            shipments: le,
            orders: A,
            consolidations: ce,
            suppliers: k,
            getSupplierName: g,
            getCustomerName: v,
            onNavigate: br,
          });
        case "payments":
          return l.jsx(bc, {
            ...f,
            isAdmin: pe,
            currentCustomerId: s == null ? void 0 : s.id,
            transactions: rr,
            allTransactions: R,
            addIncomingPayment: Un,
            addRefundPayout: Bn,
            addMiscellaneousCost: qn,
            calculateCustomerBalance: Br,
            onNavigate: bt,
          });
        case "shipments":
          return l.jsx(wc, {
            ...f,
            shipments: kr,
            transactions: rr,
            onEditTracking: xr,
            updateShipmentStatus: Us,
            isAdmin: pe,
            consolidations: sr,
            onNavigate: bt,
            highlightShipmentId: On,
            onHighlightHandled: () => Ur(null),
          });
        default:
          return l.jsx("div", { children: "Page not found" });
      }
    };
    return a
      ? l.jsx(_c, {})
      : e
        ? l.jsx("div", {
            className: "min-h-screen flex items-center justify-center",
            children: l.jsxs("div", {
              className: "text-center",
              children: [
                l.jsx("div", {
                  className:
                    "animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto",
                }),
                l.jsx("div", {
                  className: "mt-4 text-lg font-semibold text-gray-700",
                  children: "Loading...",
                }),
              ],
            }),
          })
        : c
          ? l.jsx("div", {
              className: "min-h-screen flex items-center justify-center",
              children: l.jsxs("div", {
                className: "text-center",
                children: [
                  l.jsx("div", {
                    className:
                      "animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto",
                  }),
                  l.jsx("div", {
                    className: "mt-4 text-sm font-medium text-gray-700",
                    children: "Signing out...",
                  }),
                ],
              }),
            })
          : s
            ? y
              ? l.jsx("div", {
                  className:
                    "min-h-screen bg-slate-100 flex items-center justify-center",
                  children: l.jsxs("div", {
                    className: "text-center",
                    children: [
                      l.jsx("div", {
                        className: "text-lg font-semibold text-gray-700 mb-2",
                        children: "Loading your data...",
                      }),
                      l.jsx("div", {
                        className: "text-sm text-gray-500",
                        children: "Please wait while we fetch your information",
                      }),
                    ],
                  }),
                })
              : !rt && !y
                ? l.jsx("div", {
                    className:
                      "min-h-screen flex items-center justify-center text-red-600 font-bold",
                    children: "No user record found. Please contact support.",
                  })
                : (rt == null ? void 0 : rt.role) === St.Admin
                  ? l.jsxs(ni, {
                      activePageId: Fe,
                      onNavigate: bt,
                      customers: h,
                      notifications: Ze,
                      markNotificationAsRead: zr,
                      onSignOut: Rs,
                      user: s,
                      currentUserId: s == null ? void 0 : s.id,
                      isAdmin: pe,
                      globalSearchItems: Hs,
                      children: [
                        l.jsx(x.Suspense, {
                          fallback: l.jsx(Ai, {}),
                          children: zs(),
                        }),
                        wr &&
                          l.jsx(Di, {
                            order: wr,
                            onClose: () => tr(null),
                            onSave: Ls,
                          }),
                        _r &&
                          l.jsx(Ri, {
                            shipment: _r,
                            onClose: () => xr(null),
                            onSave: Fs,
                          }),
                      ],
                    })
                  : (rt == null ? void 0 : rt.role) === St.Customer
                    ? l.jsxs(ni, {
                        activePageId: Fe,
                        onNavigate: bt,
                        customers: h,
                        notifications: Ze,
                        markNotificationAsRead: zr,
                        onSignOut: Rs,
                        user: s,
                        currentUserId: s == null ? void 0 : s.id,
                        isAdmin: pe,
                        globalSearchItems: Hs,
                        children: [
                          l.jsx(x.Suspense, {
                            fallback: l.jsx(Ai, {}),
                            children: zs(),
                          }),
                          wr &&
                            l.jsx(Di, {
                              order: wr,
                              onClose: () => tr(null),
                              onSave: Ls,
                            }),
                          _r &&
                            l.jsx(Ri, {
                              shipment: _r,
                              onClose: () => xr(null),
                              onSave: Fs,
                            }),
                        ],
                      })
                    : l.jsx("div", {
                        className:
                          "min-h-screen flex items-center justify-center text-red-600 font-bold",
                        children: "Unknown user role. Please contact support.",
                      })
            : l.jsx(mc, {});
  },
  Sc = () => l.jsx(dc, { children: l.jsx(sa, { children: l.jsx(xc, {}) }) }),
  zc = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Sc },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  );
export {
  $e as A,
  Zr as B,
  m as C,
  zc as D,
  d as O,
  ee as T,
  St as U,
  ta as a,
  Yi as b,
  nt as c,
  zo as d,
  ws as e,
  Se as f,
  Vo as g,
  Rc as h,
  Go as i,
  Nc as j,
  Dc as k,
  $c as l,
  Ac as m,
  Ho as n,
  Rr as o,
  Hc as p,
  $r as q,
  Mc as r,
  Ut as s,
  Lc as t,
  jc as u,
  ti as v,
  qe as w,
  He as x,
  Qo as y,
  yt as z,
};
