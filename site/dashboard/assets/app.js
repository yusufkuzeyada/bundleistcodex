const _t = (
  i,
  e = _t,
  t = e.f ||
    (e.f = [
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
) => i.map((r) => t[r]);
import { _ as ot } from "./supabase.js";
import { j as d, r as E, S as Ln } from "./radix.js";
import {
  L as Un,
  C as qn,
  B as Bn,
  T as zn,
  a as Vn,
  W as Hn,
  U as Gn,
  M as Kn,
  b as vs,
  c as _s,
  X as xi,
  E as Wn,
  d as Jn,
  e as Qn,
} from "./icons.js";
import { b as Yn, g as Xn } from "./react.js";
import { debugLog as Z } from "./debug-tools.js";
function xs(i) {
  var e,
    t,
    r = "";
  if (typeof i == "string" || typeof i == "number") r += i;
  else if (typeof i == "object")
    if (Array.isArray(i)) {
      var s = i.length;
      for (e = 0; e < s; e++)
        i[e] && (t = xs(i[e])) && (r && (r += " "), (r += t));
    } else for (t in i) i[t] && (r && (r += " "), (r += t));
  return r;
}
function Cs() {
  for (var i, e, t = 0, r = "", s = arguments.length; t < s; t++)
    (i = arguments[t]) && (e = xs(i)) && (r && (r += " "), (r += e));
  return r;
}
const Ss = (i) => (typeof i == "boolean" ? `${i}` : i === 0 ? "0" : i),
  ks = Cs,
  Is = (i, e) => (t) => {
    var r;
    if (e?.variants == null) return ks(i, t?.class, t?.className);
    const { variants: s, defaultVariants: o } = e,
      n = Object.keys(s).map((c) => {
        const m = t?.[c],
          f = o?.[c];
        if (m === null) return null;
        const p = Ss(m) || Ss(f);
        return s[c][p];
      }),
      a =
        t &&
        Object.entries(t).reduce((c, m) => {
          let [f, p] = m;
          return (p === void 0 || (c[f] = p), c);
        }, {}),
      l =
        e == null || (r = e.compoundVariants) === null || r === void 0
          ? void 0
          : r.reduce((c, m) => {
              let { class: f, className: p, ...v } = m;
              return Object.entries(v).every((T) => {
                let [P, N] = T;
                return Array.isArray(N)
                  ? N.includes({ ...o, ...a }[P])
                  : { ...o, ...a }[P] === N;
              })
                ? [...c, f, p]
                : c;
            }, []);
    return ks(i, n, l, t?.class, t?.className);
  },
  Zn = (i) => {
    const e = ta(i),
      { conflictingClassGroups: t, conflictingClassGroupModifiers: r } = i;
    return {
      getClassGroupId: (s) => {
        const o = s.split("-");
        return (o[0] === "" && o.length !== 1 && o.shift(), Ts(o, e) || ea(s));
      },
      getConflictingClassGroupIds: (s, o) => {
        const n = t[s] || [];
        return o && r[s] ? [...n, ...r[s]] : n;
      },
    };
  },
  Ts = (i, e) => {
    var t;
    if (i.length === 0) return e.classGroupId;
    const r = i[0],
      s = e.nextPart.get(r),
      o = s ? Ts(i.slice(1), s) : void 0;
    if (o) return o;
    if (e.validators.length === 0) return;
    const n = i.join("-");
    return (t = e.validators.find(({ validator: a }) => a(n))) == null
      ? void 0
      : t.classGroupId;
  },
  Es = /^\[(.+)\]$/,
  ea = (i) => {
    if (Es.test(i)) {
      const e = Es.exec(i)[1],
        t = e?.substring(0, e.indexOf(":"));
      if (t) return "arbitrary.." + t;
    }
  },
  ta = (i) => {
    const { theme: e, classGroups: t } = i,
      r = { nextPart: new Map(), validators: [] };
    for (const s in t) Ci(t[s], r, s, e);
    return r;
  },
  Ci = (i, e, t, r) => {
    i.forEach((s) => {
      if (typeof s != "string")
        return typeof s == "function"
          ? ra(s)
            ? void Ci(s(r), e, t, r)
            : void e.validators.push({ validator: s, classGroupId: t })
          : void Object.entries(s).forEach(([o, n]) => {
              Ci(n, js(e, o), t, r);
            });
      (s === "" ? e : js(e, s)).classGroupId = t;
    });
  },
  js = (i, e) => {
    let t = i;
    return (
      e.split("-").forEach((r) => {
        (t.nextPart.has(r) ||
          t.nextPart.set(r, { nextPart: new Map(), validators: [] }),
          (t = t.nextPart.get(r)));
      }),
      t
    );
  },
  ra = (i) => i.isThemeGetter,
  ia = (i) => {
    if (i < 1) return { get: () => {}, set: () => {} };
    let e = 0,
      t = new Map(),
      r = new Map();
    const s = (o, n) => {
      (t.set(o, n), e++, e > i && ((e = 0), (r = t), (t = new Map())));
    };
    return {
      get(o) {
        let n = t.get(o);
        return n !== void 0
          ? n
          : (n = r.get(o)) !== void 0
            ? (s(o, n), n)
            : void 0;
      },
      set(o, n) {
        t.has(o) ? t.set(o, n) : s(o, n);
      },
    };
  },
  sa = (i) => {
    const { prefix: e, experimentalParseClassName: t } = i;
    let r = (s) => {
      const o = [];
      let n,
        a = 0,
        l = 0,
        c = 0;
      for (let p = 0; p < s.length; p++) {
        let v = s[p];
        if (a === 0 && l === 0) {
          if (v === ":") {
            (o.push(s.slice(c, p)), (c = p + 1));
            continue;
          }
          if (v === "/") {
            n = p;
            continue;
          }
        }
        v === "[" ? a++ : v === "]" ? a-- : v === "(" ? l++ : v === ")" && l--;
      }
      const m = o.length === 0 ? s : s.substring(c),
        f = oa(m);
      return {
        modifiers: o,
        hasImportantModifier: f !== m,
        baseClassName: f,
        maybePostfixModifierPosition: n && n > c ? n - c : void 0,
      };
    };
    if (e) {
      const s = e + ":",
        o = r;
      r = (n) =>
        n.startsWith(s)
          ? o(n.substring(s.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: n,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (t) {
      const s = r;
      r = (o) => t({ className: o, parseClassName: s });
    }
    return r;
  },
  oa = (i) =>
    i.endsWith("!")
      ? i.substring(0, i.length - 1)
      : i.startsWith("!")
        ? i.substring(1)
        : i,
  na = (i) => {
    const e = Object.fromEntries(i.orderSensitiveModifiers.map((t) => [t, !0]));
    return (t) => {
      if (t.length <= 1) return t;
      const r = [];
      let s = [];
      return (
        t.forEach((o) => {
          o[0] === "[" || e[o] ? (r.push(...s.sort(), o), (s = [])) : s.push(o);
        }),
        r.push(...s.sort()),
        r
      );
    };
  },
  aa = /\s+/;
function la() {
  let i,
    e,
    t = 0,
    r = "";
  for (; t < arguments.length; )
    (i = arguments[t++]) && (e = Ns(i)) && (r && (r += " "), (r += e));
  return r;
}
const Ns = (i) => {
    if (typeof i == "string") return i;
    let e,
      t = "";
    for (let r = 0; r < i.length; r++)
      i[r] && (e = Ns(i[r])) && (t && (t += " "), (t += e));
    return t;
  },
  Me = (i) => {
    const e = (t) => t[i] || [];
    return ((e.isThemeGetter = !0), e);
  },
  Os = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Ps = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  da = /^\d+\/\d+$/,
  ca = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  ua =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  ha = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  ma = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  pa =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Ht = (i) => da.test(i),
  he = (i) => !!i && !Number.isNaN(Number(i)),
  jt = (i) => !!i && Number.isInteger(Number(i)),
  Si = (i) => i.endsWith("%") && he(i.slice(0, -1)),
  xt = (i) => ca.test(i),
  ga = () => !0,
  fa = (i) => ua.test(i) && !ha.test(i),
  Ds = () => !1,
  ya = (i) => ma.test(i),
  ba = (i) => pa.test(i),
  wa = (i) => !V(i) && !H(i),
  va = (i) => Gt(i, Fs, Ds),
  V = (i) => Os.test(i),
  Rt = (i) => Gt(i, Ls, fa),
  ki = (i) => Gt(i, ka, he),
  As = (i) => Gt(i, Rs, Ds),
  _a = (i) => Gt(i, Ms, ba),
  zr = (i) => Gt(i, Us, ya),
  H = (i) => Ps.test(i),
  br = (i) => Kt(i, Ls),
  xa = (i) => Kt(i, Ia),
  $s = (i) => Kt(i, Rs),
  Ca = (i) => Kt(i, Fs),
  Sa = (i) => Kt(i, Ms),
  Vr = (i) => Kt(i, Us, !0),
  Gt = (i, e, t) => {
    const r = Os.exec(i);
    return !!r && (r[1] ? e(r[1]) : t(r[2]));
  },
  Kt = (i, e, t = !1) => {
    const r = Ps.exec(i);
    return !!r && (r[1] ? e(r[1]) : t);
  },
  Rs = (i) => i === "position" || i === "percentage",
  Ms = (i) => i === "image" || i === "url",
  Fs = (i) => i === "length" || i === "size" || i === "bg-size",
  Ls = (i) => i === "length",
  ka = (i) => i === "number",
  Ia = (i) => i === "family-name",
  Us = (i) => i === "shadow",
  Ta = (function (i, ...e) {
    let t,
      r,
      s,
      o = function (a) {
        const l = e.reduce((c, m) => m(c), i());
        return (
          (t = ((c) => ({
            cache: ia(c.cacheSize),
            parseClassName: sa(c),
            sortModifiers: na(c),
            ...Zn(c),
          }))(l)),
          (r = t.cache.get),
          (s = t.cache.set),
          (o = n),
          n(a)
        );
      };
    function n(a) {
      const l = r(a);
      if (l) return l;
      const c = ((m, f) => {
        const {
            parseClassName: p,
            getClassGroupId: v,
            getConflictingClassGroupIds: T,
            sortModifiers: P,
          } = f,
          N = [],
          D = m.trim().split(aa);
        let A = "";
        for (let O = D.length - 1; O >= 0; O -= 1) {
          const j = D[O],
            {
              isExternal: W,
              modifiers: ee,
              hasImportantModifier: ie,
              baseClassName: ge,
              maybePostfixModifierPosition: ue,
            } = p(j);
          if (W) {
            A = j + (A.length > 0 ? " " + A : A);
            continue;
          }
          let ne = !!ue,
            ye = v(ne ? ge.substring(0, ue) : ge);
          if (!ye) {
            if (!ne) {
              A = j + (A.length > 0 ? " " + A : A);
              continue;
            }
            if (((ye = v(ge)), !ye)) {
              A = j + (A.length > 0 ? " " + A : A);
              continue;
            }
            ne = !1;
          }
          const U = P(ee).join(":"),
            De = ie ? U + "!" : U,
            Fe = De + ye;
          if (N.includes(Fe)) continue;
          N.push(Fe);
          const ae = T(ye, ne);
          for (let z = 0; z < ae.length; ++z) {
            const B = ae[z];
            N.push(De + B);
          }
          A = j + (A.length > 0 ? " " + A : A);
        }
        return A;
      })(a, t);
      return (s(a, c), c);
    }
    return function () {
      return o(la.apply(null, arguments));
    };
  })(() => {
    const i = Me("color"),
      e = Me("font"),
      t = Me("text"),
      r = Me("font-weight"),
      s = Me("tracking"),
      o = Me("leading"),
      n = Me("breakpoint"),
      a = Me("container"),
      l = Me("spacing"),
      c = Me("radius"),
      m = Me("shadow"),
      f = Me("inset-shadow"),
      p = Me("text-shadow"),
      v = Me("drop-shadow"),
      T = Me("blur"),
      P = Me("perspective"),
      N = Me("aspect"),
      D = Me("ease"),
      A = Me("animate"),
      O = () => [
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
        H,
        V,
      ],
      j = () => [H, V, l],
      W = () => [Ht, "full", "auto", ...j()],
      ee = () => [jt, "none", "subgrid", H, V],
      ie = () => ["auto", { span: ["full", jt, H, V] }, jt, H, V],
      ge = () => [jt, "auto", H, V],
      ue = () => ["auto", "min", "max", "fr", H, V],
      ne = () => ["auto", ...j()],
      ye = () => [
        Ht,
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
        ...j(),
      ],
      U = () => [i, H, V],
      De = () => [
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
        $s,
        As,
        { position: [H, V] },
      ],
      Fe = () => ["auto", "cover", "contain", Ca, va, { size: [H, V] }],
      ae = () => [Si, br, Rt],
      z = () => ["", "none", "full", c, H, V],
      B = () => ["", he, br, Rt],
      se = () => [he, Si, $s, As],
      Le = () => ["", "none", T, H, V],
      Oe = () => ["none", he, H, V],
      Qe = () => ["none", he, H, V],
      Ie = () => [he, H, V],
      nt = () => [Ht, "full", ...j()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [xt],
        breakpoint: [xt],
        color: [ga],
        container: [xt],
        "drop-shadow": [xt],
        ease: ["in", "out", "in-out"],
        font: [wa],
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
        "inset-shadow": [xt],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [xt],
        shadow: [xt],
        spacing: ["px", he],
        text: [xt],
        "text-shadow": [xt],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", Ht, V, H, N] }],
        container: ["container"],
        columns: [{ columns: [he, V, H, a] }],
        "break-after": [
          {
            "break-after": [
              "auto",
              "avoid",
              "all",
              "avoid-page",
              "page",
              "left",
              "right",
              "column",
            ],
          },
        ],
        "break-before": [
          {
            "break-before": [
              "auto",
              "avoid",
              "all",
              "avoid-page",
              "page",
              "left",
              "right",
              "column",
            ],
          },
        ],
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
        "object-position": [{ object: O() }],
        overflow: [
          { overflow: ["auto", "hidden", "clip", "visible", "scroll"] },
        ],
        "overflow-x": [
          { "overflow-x": ["auto", "hidden", "clip", "visible", "scroll"] },
        ],
        "overflow-y": [
          { "overflow-y": ["auto", "hidden", "clip", "visible", "scroll"] },
        ],
        overscroll: [{ overscroll: ["auto", "contain", "none"] }],
        "overscroll-x": [{ "overscroll-x": ["auto", "contain", "none"] }],
        "overscroll-y": [{ "overscroll-y": ["auto", "contain", "none"] }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: W() }],
        "inset-x": [{ "inset-x": W() }],
        "inset-y": [{ "inset-y": W() }],
        start: [{ start: W() }],
        end: [{ end: W() }],
        top: [{ top: W() }],
        right: [{ right: W() }],
        bottom: [{ bottom: W() }],
        left: [{ left: W() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [jt, "auto", H, V] }],
        basis: [{ basis: [Ht, "full", "auto", a, ...j()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [he, Ht, "auto", "initial", "none", V] }],
        grow: [{ grow: ["", he, H, V] }],
        shrink: [{ shrink: ["", he, H, V] }],
        order: [{ order: [jt, "first", "last", "none", H, V] }],
        "grid-cols": [{ "grid-cols": ee() }],
        "col-start-end": [{ col: ie() }],
        "col-start": [{ "col-start": ge() }],
        "col-end": [{ "col-end": ge() }],
        "grid-rows": [{ "grid-rows": ee() }],
        "row-start-end": [{ row: ie() }],
        "row-start": [{ "row-start": ge() }],
        "row-end": [{ "row-end": ge() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": ue() }],
        "auto-rows": [{ "auto-rows": ue() }],
        gap: [{ gap: j() }],
        "gap-x": [{ "gap-x": j() }],
        "gap-y": [{ "gap-y": j() }],
        "justify-content": [
          {
            justify: [
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
              "normal",
            ],
          },
        ],
        "justify-items": [
          {
            "justify-items": [
              "start",
              "end",
              "center",
              "stretch",
              "center-safe",
              "end-safe",
              "normal",
            ],
          },
        ],
        "justify-self": [
          {
            "justify-self": [
              "auto",
              "start",
              "end",
              "center",
              "stretch",
              "center-safe",
              "end-safe",
            ],
          },
        ],
        "align-content": [
          {
            content: [
              "normal",
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
          },
        ],
        "align-items": [
          {
            items: [
              "start",
              "end",
              "center",
              "stretch",
              "center-safe",
              "end-safe",
              { baseline: ["", "last"] },
            ],
          },
        ],
        "align-self": [
          {
            self: [
              "auto",
              "start",
              "end",
              "center",
              "stretch",
              "center-safe",
              "end-safe",
              { baseline: ["", "last"] },
            ],
          },
        ],
        "place-content": [
          {
            "place-content": [
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
          },
        ],
        "place-items": [
          {
            "place-items": [
              "start",
              "end",
              "center",
              "stretch",
              "center-safe",
              "end-safe",
              "baseline",
            ],
          },
        ],
        "place-self": [
          {
            "place-self": [
              "auto",
              "start",
              "end",
              "center",
              "stretch",
              "center-safe",
              "end-safe",
            ],
          },
        ],
        p: [{ p: j() }],
        px: [{ px: j() }],
        py: [{ py: j() }],
        ps: [{ ps: j() }],
        pe: [{ pe: j() }],
        pt: [{ pt: j() }],
        pr: [{ pr: j() }],
        pb: [{ pb: j() }],
        pl: [{ pl: j() }],
        m: [{ m: ne() }],
        mx: [{ mx: ne() }],
        my: [{ my: ne() }],
        ms: [{ ms: ne() }],
        me: [{ me: ne() }],
        mt: [{ mt: ne() }],
        mr: [{ mr: ne() }],
        mb: [{ mb: ne() }],
        ml: [{ ml: ne() }],
        "space-x": [{ "space-x": j() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": j() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: ye() }],
        w: [{ w: [a, "screen", ...ye()] }],
        "min-w": [{ "min-w": [a, "screen", "none", ...ye()] }],
        "max-w": [
          { "max-w": [a, "screen", "none", "prose", { screen: [n] }, ...ye()] },
        ],
        h: [{ h: ["screen", "lh", ...ye()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...ye()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...ye()] }],
        "font-size": [{ text: ["base", t, br, Rt] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [r, H, ki] }],
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
              Si,
              V,
            ],
          },
        ],
        "font-family": [{ font: [xa, V, e] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [s, H, V] }],
        "line-clamp": [{ "line-clamp": [he, "none", H, ki] }],
        leading: [{ leading: [o, ...j()] }],
        "list-image": [{ "list-image": ["none", H, V] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", H, V] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: U() }],
        "text-color": [{ text: U() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [
          { decoration: ["solid", "dashed", "dotted", "double", "wavy"] },
        ],
        "text-decoration-thickness": [
          { decoration: [he, "from-font", "auto", H, Rt] },
        ],
        "text-decoration-color": [{ decoration: U() }],
        "underline-offset": [{ "underline-offset": [he, "auto", H, V] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: j() }],
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
              H,
              V,
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
        content: [{ content: ["none", H, V] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: De() }],
        "bg-repeat": [
          { bg: ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }] },
        ],
        "bg-size": [{ bg: Fe() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  jt,
                  H,
                  V,
                ],
                radial: ["", H, V],
                conic: [jt, H, V],
              },
              Sa,
              _a,
            ],
          },
        ],
        "bg-color": [{ bg: U() }],
        "gradient-from-pos": [{ from: ae() }],
        "gradient-via-pos": [{ via: ae() }],
        "gradient-to-pos": [{ to: ae() }],
        "gradient-from": [{ from: U() }],
        "gradient-via": [{ via: U() }],
        "gradient-to": [{ to: U() }],
        rounded: [{ rounded: z() }],
        "rounded-s": [{ "rounded-s": z() }],
        "rounded-e": [{ "rounded-e": z() }],
        "rounded-t": [{ "rounded-t": z() }],
        "rounded-r": [{ "rounded-r": z() }],
        "rounded-b": [{ "rounded-b": z() }],
        "rounded-l": [{ "rounded-l": z() }],
        "rounded-ss": [{ "rounded-ss": z() }],
        "rounded-se": [{ "rounded-se": z() }],
        "rounded-ee": [{ "rounded-ee": z() }],
        "rounded-es": [{ "rounded-es": z() }],
        "rounded-tl": [{ "rounded-tl": z() }],
        "rounded-tr": [{ "rounded-tr": z() }],
        "rounded-br": [{ "rounded-br": z() }],
        "rounded-bl": [{ "rounded-bl": z() }],
        "border-w": [{ border: B() }],
        "border-w-x": [{ "border-x": B() }],
        "border-w-y": [{ "border-y": B() }],
        "border-w-s": [{ "border-s": B() }],
        "border-w-e": [{ "border-e": B() }],
        "border-w-t": [{ "border-t": B() }],
        "border-w-r": [{ "border-r": B() }],
        "border-w-b": [{ "border-b": B() }],
        "border-w-l": [{ "border-l": B() }],
        "divide-x": [{ "divide-x": B() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": B() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [
          { border: ["solid", "dashed", "dotted", "double", "hidden", "none"] },
        ],
        "divide-style": [
          { divide: ["solid", "dashed", "dotted", "double", "hidden", "none"] },
        ],
        "border-color": [{ border: U() }],
        "border-color-x": [{ "border-x": U() }],
        "border-color-y": [{ "border-y": U() }],
        "border-color-s": [{ "border-s": U() }],
        "border-color-e": [{ "border-e": U() }],
        "border-color-t": [{ "border-t": U() }],
        "border-color-r": [{ "border-r": U() }],
        "border-color-b": [{ "border-b": U() }],
        "border-color-l": [{ "border-l": U() }],
        "divide-color": [{ divide: U() }],
        "outline-style": [
          {
            outline: ["solid", "dashed", "dotted", "double", "none", "hidden"],
          },
        ],
        "outline-offset": [{ "outline-offset": [he, H, V] }],
        "outline-w": [{ outline: ["", he, br, Rt] }],
        "outline-color": [{ outline: U() }],
        shadow: [{ shadow: ["", "none", m, Vr, zr] }],
        "shadow-color": [{ shadow: U() }],
        "inset-shadow": [{ "inset-shadow": ["none", f, Vr, zr] }],
        "inset-shadow-color": [{ "inset-shadow": U() }],
        "ring-w": [{ ring: B() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: U() }],
        "ring-offset-w": [{ "ring-offset": [he, Rt] }],
        "ring-offset-color": [{ "ring-offset": U() }],
        "inset-ring-w": [{ "inset-ring": B() }],
        "inset-ring-color": [{ "inset-ring": U() }],
        "text-shadow": [{ "text-shadow": ["none", p, Vr, zr] }],
        "text-shadow-color": [{ "text-shadow": U() }],
        opacity: [{ opacity: [he, H, V] }],
        "mix-blend": [
          {
            "mix-blend": [
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
              "plus-darker",
              "plus-lighter",
            ],
          },
        ],
        "bg-blend": [
          {
            "bg-blend": [
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
          },
        ],
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
        "mask-image-linear-pos": [{ "mask-linear": [he] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": se() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": se() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": U() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": U() }],
        "mask-image-t-from-pos": [{ "mask-t-from": se() }],
        "mask-image-t-to-pos": [{ "mask-t-to": se() }],
        "mask-image-t-from-color": [{ "mask-t-from": U() }],
        "mask-image-t-to-color": [{ "mask-t-to": U() }],
        "mask-image-r-from-pos": [{ "mask-r-from": se() }],
        "mask-image-r-to-pos": [{ "mask-r-to": se() }],
        "mask-image-r-from-color": [{ "mask-r-from": U() }],
        "mask-image-r-to-color": [{ "mask-r-to": U() }],
        "mask-image-b-from-pos": [{ "mask-b-from": se() }],
        "mask-image-b-to-pos": [{ "mask-b-to": se() }],
        "mask-image-b-from-color": [{ "mask-b-from": U() }],
        "mask-image-b-to-color": [{ "mask-b-to": U() }],
        "mask-image-l-from-pos": [{ "mask-l-from": se() }],
        "mask-image-l-to-pos": [{ "mask-l-to": se() }],
        "mask-image-l-from-color": [{ "mask-l-from": U() }],
        "mask-image-l-to-color": [{ "mask-l-to": U() }],
        "mask-image-x-from-pos": [{ "mask-x-from": se() }],
        "mask-image-x-to-pos": [{ "mask-x-to": se() }],
        "mask-image-x-from-color": [{ "mask-x-from": U() }],
        "mask-image-x-to-color": [{ "mask-x-to": U() }],
        "mask-image-y-from-pos": [{ "mask-y-from": se() }],
        "mask-image-y-to-pos": [{ "mask-y-to": se() }],
        "mask-image-y-from-color": [{ "mask-y-from": U() }],
        "mask-image-y-to-color": [{ "mask-y-to": U() }],
        "mask-image-radial": [{ "mask-radial": [H, V] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": se() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": se() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": U() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": U() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [
          {
            "mask-radial-at": [
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
          },
        ],
        "mask-image-conic-pos": [{ "mask-conic": [he] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": se() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": se() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": U() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": U() }],
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
        "mask-position": [{ mask: De() }],
        "mask-repeat": [
          { mask: ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }] },
        ],
        "mask-size": [{ mask: Fe() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", H, V] }],
        filter: [{ filter: ["", "none", H, V] }],
        blur: [{ blur: Le() }],
        brightness: [{ brightness: [he, H, V] }],
        contrast: [{ contrast: [he, H, V] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", v, Vr, zr] }],
        "drop-shadow-color": [{ "drop-shadow": U() }],
        grayscale: [{ grayscale: ["", he, H, V] }],
        "hue-rotate": [{ "hue-rotate": [he, H, V] }],
        invert: [{ invert: ["", he, H, V] }],
        saturate: [{ saturate: [he, H, V] }],
        sepia: [{ sepia: ["", he, H, V] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", H, V] }],
        "backdrop-blur": [{ "backdrop-blur": Le() }],
        "backdrop-brightness": [{ "backdrop-brightness": [he, H, V] }],
        "backdrop-contrast": [{ "backdrop-contrast": [he, H, V] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", he, H, V] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [he, H, V] }],
        "backdrop-invert": [{ "backdrop-invert": ["", he, H, V] }],
        "backdrop-opacity": [{ "backdrop-opacity": [he, H, V] }],
        "backdrop-saturate": [{ "backdrop-saturate": [he, H, V] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", he, H, V] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": j() }],
        "border-spacing-x": [{ "border-spacing-x": j() }],
        "border-spacing-y": [{ "border-spacing-y": j() }],
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
              H,
              V,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [he, "initial", H, V] }],
        ease: [{ ease: ["linear", "initial", D, H, V] }],
        delay: [{ delay: [he, H, V] }],
        animate: [{ animate: ["none", A, H, V] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [P, H, V] }],
        "perspective-origin": [{ "perspective-origin": O() }],
        rotate: [{ rotate: Oe() }],
        "rotate-x": [{ "rotate-x": Oe() }],
        "rotate-y": [{ "rotate-y": Oe() }],
        "rotate-z": [{ "rotate-z": Oe() }],
        scale: [{ scale: Qe() }],
        "scale-x": [{ "scale-x": Qe() }],
        "scale-y": [{ "scale-y": Qe() }],
        "scale-z": [{ "scale-z": Qe() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: Ie() }],
        "skew-x": [{ "skew-x": Ie() }],
        "skew-y": [{ "skew-y": Ie() }],
        transform: [{ transform: [H, V, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: O() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: nt() }],
        "translate-x": [{ "translate-x": nt() }],
        "translate-y": [{ "translate-y": nt() }],
        "translate-z": [{ "translate-z": nt() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: U() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: U() }],
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
              H,
              V,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": j() }],
        "scroll-mx": [{ "scroll-mx": j() }],
        "scroll-my": [{ "scroll-my": j() }],
        "scroll-ms": [{ "scroll-ms": j() }],
        "scroll-me": [{ "scroll-me": j() }],
        "scroll-mt": [{ "scroll-mt": j() }],
        "scroll-mr": [{ "scroll-mr": j() }],
        "scroll-mb": [{ "scroll-mb": j() }],
        "scroll-ml": [{ "scroll-ml": j() }],
        "scroll-p": [{ "scroll-p": j() }],
        "scroll-px": [{ "scroll-px": j() }],
        "scroll-py": [{ "scroll-py": j() }],
        "scroll-ps": [{ "scroll-ps": j() }],
        "scroll-pe": [{ "scroll-pe": j() }],
        "scroll-pt": [{ "scroll-pt": j() }],
        "scroll-pr": [{ "scroll-pr": j() }],
        "scroll-pb": [{ "scroll-pb": j() }],
        "scroll-pl": [{ "scroll-pl": j() }],
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
          { "will-change": ["auto", "scroll", "contents", "transform", H, V] },
        ],
        fill: [{ fill: ["none", ...U()] }],
        "stroke-w": [{ stroke: [he, br, Rt, ki] }],
        stroke: [{ stroke: ["none", ...U()] }],
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
  });
function qs(...i) {
  return Ta(Cs(i));
}
const Ea = Is(
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
function Hr({ className: i, variant: e, ...t }) {
  return d.jsx("div", { className: qs(Ea({ variant: e }), i), ...t });
}
const ja = Is(
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
  ht = E.forwardRef(
    ({ className: i, variant: e, size: t, asChild: r = !1, ...s }, o) => {
      const n = r ? Ln : "button";
      return d.jsx(n, {
        className: qs(ja({ variant: e, size: t, className: i })),
        ref: o,
        ...s,
      });
    },
  );
ht.displayName = "Button";
const wr = ({
    size: i = "md",
    className: e = "",
    showText: t = !0,
    markClassName: r = "",
    textClassName: s = "",
    caption: o = "",
    detail: n = "",
  }) => {
    const a = r.trim()
        ? r
        : {
            xxs: "w-6 h-6",
            xs: "w-10 h-10",
            sm: "w-16 h-16",
            md: "w-24 h-24",
            lg: "w-32 h-32",
          }[i],
      l = s.trim()
        ? s
        : {
            xxs: "text-sm",
            xs: "text-base",
            sm: "text-xl",
            md: "text-3xl",
            lg: "text-5xl",
          }[i],
      c = String(o || "").trim(),
      m = String(n || "").trim();
    return d.jsxs("div", {
      className: `inline-flex items-center gap-4 ${e}`.trim(),
      role: "img",
      "aria-label": c ? `Sourcevia. ${c}` : "Sourcevia",
      children: [
        d.jsx("div", {
          className: [
            a,
            "shrink-0",
            "rounded-2xl bg-gradient-to-br from-slate-950 to-slate-800",
            "ring-1 ring-white/10 shadow-sm",
            "flex items-center justify-center",
          ].join(" "),
          children: d.jsxs("svg", {
            width: "100%",
            height: "100%",
            xmlns: "http://www.w3.org/2000/svg",
            className: "w-[84%] h-[84%]",
            viewBox: "0 0 64 64",
            "aria-hidden": "true",
            focusable: "false",
            children: [
              d.jsx("path", {
                d: "M46 18c-3.5-4-9-6-14.5-6-8.5 0-15 4.2-15 10.3 0 14.2 30 6.7 30 22 0 6-5.8 9.7-14.2 9.7-6 0-11.8-2.2-15.8-6.1",
                fill: "none",
                stroke: "#34d399",
                strokeWidth: "6.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }),
              d.jsx("circle", { cx: "46", cy: "18", r: "4", fill: "#0f172a" }),
              d.jsx("circle", {
                cx: "16.5",
                cy: "47.8",
                r: "4",
                fill: "#c9a66b",
              }),
            ],
          }),
        }),
        t &&
          d.jsxs("div", {
            className: "min-w-0 flex flex-col justify-center",
            children: [
              d.jsxs("div", {
                className:
                  "block leading-none font-bold tracking-tight text-slate-900",
                style: {
                  fontFamily:
                    '"Space Grotesk", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
                },
                children: [
                  d.jsx("span", {
                    className: [l, "text-slate-900"].join(" "),
                    children: "Source",
                  }),
                  d.jsx("span", {
                    className: [l, "text-emerald-600"].join(" "),
                    children: "via",
                  }),
                ],
              }),
              c
                ? d.jsx("div", {
                    className:
                      "mt-1 block text-[11px] sm:text-[12px] font-medium tracking-[0.08em] text-slate-500",
                    style: {
                      fontFamily:
                        '"Manrope", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
                    },
                    children: c,
                  })
                : null,
              m
                ? d.jsx("div", {
                    className: "mt-1 text-xs text-slate-600",
                    children: m,
                  })
                : null,
            ],
          }),
      ],
    });
  },
  Bs = E.createContext(null);
function Na({ value: i, children: e }) {
  return d.jsx(Bs.Provider, { value: i, children: e });
}
function Oa() {
  const i = E.useContext(Bs);
  if (!i) throw new Error("useAppShell must be used within <AppShellProvider>");
  return i;
}
function zs(i, e, t) {
  const r = i
    .filter((s) =>
      t
        ? s.userId === null || s.userId === e
        : s.userId === e || s.userId === null,
    )
    .reduce((s, o) => {
      const n =
        o.eventType && o.relatedEntityId
          ? `${o.eventType}-${o.relatedEntityId}`
          : `${o.linkToPage}-${o.linkToId}-${o.message.substring(0, 50)}`;
      return (
        (!s[n] || new Date(o.timestamp) > new Date(s[n].timestamp)) &&
          (s[n] = o),
        s
      );
    }, {});
  return Object.values(r).sort(
    (s, o) => new Date(o.timestamp).getTime() - new Date(s.timestamp).getTime(),
  );
}
function Vs(i) {
  if (i.includes("status changed")) {
    const e = i.match(/^(.*?)\s+status changed/);
    return e ? e[1] : "Status update";
  }
  return i.toLowerCase().includes("payment")
    ? "Payment update"
    : i.toLowerCase().includes("consolidation")
      ? "Consolidation update"
      : i.toLowerCase().includes("shipment")
        ? "Shipment update"
        : i.toLowerCase().includes("order")
          ? "Order update"
          : i.length > 44
            ? i.substring(0, 44) + "..."
            : i;
}
function Hs(i) {
  const e = Math.floor((new Date().getTime() - i.getTime()) / 1e3);
  return e < 60
    ? "now"
    : e < 3600
      ? `${Math.floor(e / 60)}m`
      : e < 86400
        ? `${Math.floor(e / 3600)}h`
        : e < 604800
          ? `${Math.floor(e / 86400)}d`
          : i.toLocaleDateString();
}
function Gs(i) {
  const e = (i || "medium").toLowerCase();
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
var Ii,
  et = (((Ii = et || {}).Admin = "admin"), (Ii.Customer = "customer"), Ii),
  lt = ((i) => (
    (i.Trial = "trial"),
    (i.Growth = "growth"),
    (i.Corporate = "corporate"),
    i
  ))(lt || {}),
  g = ((i) => (
    (i.Draft = "Draft"),
    (i.Submitted = "Submitted"),
    (i.Pending = "Pending"),
    (i.Processing = "Processing"),
    (i.QualityCheck = "QualityCheck"),
    (i.ReadyToShip = "ReadyToShip"),
    (i.InConsolidation = "InConsolidation"),
    (i.InTransit = "InTransit"),
    (i.CustomsClearance = "CustomsClearance"),
    (i.OutForDelivery = "OutForDelivery"),
    (i.Delivered = "Delivered"),
    (i.Completed = "Completed"),
    (i.Cancelled = "Cancelled"),
    (i.OnHold = "OnHold"),
    i
  ))(g || {});
const vr = [
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
var _ = ((i) => (
    (i.Planning = "Planning"),
    (i.OrderCollection = "OrderCollection"),
    (i.DocumentPreparation = "DocumentPreparation"),
    (i.Loading = "Loading"),
    (i.QualityCheck = "QualityCheck"),
    (i.ReadyToShip = "ReadyToShip"),
    (i.InTransit = "InTransit"),
    (i.CustomsClearance = "CustomsClearance"),
    (i.OutForDelivery = "OutForDelivery"),
    (i.Delivered = "Delivered"),
    (i.Completed = "Completed"),
    (i.Cancelled = "Cancelled"),
    (i.OnHold = "OnHold"),
    i
  ))(_ || {}),
  Y = ((i) => (
    (i.IncomingPayment = "IncomingPayment"),
    (i.RefundPayout = "RefundPayout"),
    (i.OrderCost = "OrderCost"),
    (i.ServiceFee = "ServiceFee"),
    (i.ShippingCost = "ShippingCost"),
    (i.MiscellaneousCost = "MiscellaneousCost"),
    (i.OrderCostAdjustment = "OrderCostAdjustment"),
    (i.ServiceFeeAdjustment = "ServiceFeeAdjustment"),
    (i.OrderCostReversal = "OrderCostReversal"),
    (i.ServiceFeeReversal = "ServiceFeeReversal"),
    (i.ShippingCostReversal = "ShippingCostReversal"),
    i
  ))(Y || {}),
  X = ((i) => (
    (i.Low = "low"),
    (i.Medium = "medium"),
    (i.High = "high"),
    (i.Critical = "critical"),
    i
  ))(X || {});
const Ti = ["Processing", "QualityCheck", "ReadyToShip"],
  Ks = (i) => d.jsx(zn, { ...i }),
  Pa = (i) => d.jsx(Gn, { ...i }),
  Ws = (i) =>
    d.jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "w-6 h-6",
      ...i,
      children: d.jsx("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0",
      }),
    }),
  mt = {
    [lt.Trial]: { name: "Starter", oneTimeFee: 349, minimumFee: 349 },
    [lt.Growth]: { name: "Standard", minimumFee: 350, percentageFee: 0.015 },
    [lt.Corporate]: {
      name: "Enterprise",
      minimumFee: 750,
      percentageFee: 0.01,
    },
  },
  Da = {
    [g.Draft]: "bg-slate-100 text-slate-800",
    [g.Submitted]: "bg-cyan-100 text-cyan-800",
    [g.Pending]: "bg-yellow-100 text-yellow-800",
    [g.Processing]: "bg-blue-100 text-blue-800",
    [g.QualityCheck]: "bg-indigo-100 text-indigo-800",
    [g.ReadyToShip]: "bg-purple-100 text-purple-800",
    [g.InConsolidation]: "bg-violet-100 text-violet-800",
    [g.InTransit]: "bg-teal-100 text-teal-800",
    [g.CustomsClearance]: "bg-orange-100 text-orange-800",
    [g.OutForDelivery]: "bg-emerald-100 text-emerald-800",
    [g.Delivered]: "bg-green-100 text-green-800",
    [g.Completed]: "bg-green-100 text-green-800",
    [g.Cancelled]: "bg-red-100 text-red-800",
    [g.OnHold]: "bg-gray-100 text-gray-800",
  },
  Aa = {
    [g.Draft]: [g.Submitted, g.Cancelled],
    [g.Submitted]: [g.Draft, g.Pending, g.OnHold, g.Cancelled],
    [g.Pending]: [g.Processing, g.OnHold, g.Cancelled],
    [g.Processing]: [g.QualityCheck, g.ReadyToShip, g.OnHold, g.Cancelled],
    [g.QualityCheck]: [g.ReadyToShip, g.Processing, g.OnHold, g.Cancelled],
    [g.ReadyToShip]: [g.InTransit, g.OnHold, g.Cancelled],
    [g.InConsolidation]: [g.ReadyToShip, g.OnHold, g.Cancelled],
    [g.InTransit]: [
      g.CustomsClearance,
      g.OutForDelivery,
      g.Delivered,
      g.OnHold,
    ],
    [g.CustomsClearance]: [g.OutForDelivery, g.Delivered, g.OnHold],
    [g.OutForDelivery]: [g.Delivered, g.OnHold],
    [g.Delivered]: [g.Completed],
    [g.Completed]: [],
    [g.Cancelled]: [],
    [g.OnHold]: [
      g.Processing,
      g.QualityCheck,
      g.ReadyToShip,
      g.InTransit,
      g.CustomsClearance,
      g.OutForDelivery,
      g.Cancelled,
    ],
  },
  $a = {
    [g.Draft]:
      "Customer draft saved. Order can be edited before submission for admin review",
    [g.Submitted]: "Draft submitted by customer and waiting for admin approval",
    [g.Pending]:
      "Order received and awaiting confirmation - No charges applied yet",
    [g.Processing]:
      "Order confirmed and order cost applied - Service fee is posted when shipment is created",
    [g.QualityCheck]: "Order undergoes quality verification before shipping",
    [g.ReadyToShip]: "Order packed and ready for shipping arrangement",
    [g.InConsolidation]:
      "Order is in a consolidation - Status follows consolidation progress",
    [g.InTransit]: "Order shipped and in transit to destination",
    [g.CustomsClearance]: "Order undergoing customs clearance process",
    [g.OutForDelivery]: "Order out for delivery to customer",
    [g.Delivered]: "Order successfully delivered to customer",
    [g.Completed]:
      "Order closed after delivery confirmation and post-delivery reconciliation",
    [g.Cancelled]: "Order has been cancelled",
    [g.OnHold]: "Order temporarily on hold awaiting resolution",
  },
  Ra = {
    Preparation: [
      g.Draft,
      g.Submitted,
      g.Pending,
      g.Processing,
      g.QualityCheck,
      g.ReadyToShip,
      g.InConsolidation,
    ],
    Shipping: [g.InTransit, g.CustomsClearance, g.OutForDelivery],
    Final: [g.Delivered, g.Completed, g.Cancelled, g.OnHold],
  },
  Ma = (i) =>
    [
      g.InTransit,
      g.CustomsClearance,
      g.OutForDelivery,
      g.Delivered,
      g.Completed,
    ].includes(i)
      ? "shipments"
      : "orders",
  Ei = (i) => Aa[i] || [],
  Fa = {
    [_.Planning]: "bg-gray-100 text-gray-800",
    [_.OrderCollection]: "bg-amber-100 text-amber-800",
    [_.DocumentPreparation]: "bg-orange-100 text-orange-800",
    [_.Loading]: "bg-sky-100 text-sky-800",
    [_.QualityCheck]: "bg-indigo-100 text-indigo-800",
    [_.ReadyToShip]: "bg-blue-100 text-blue-800",
    [_.InTransit]: "bg-teal-100 text-teal-800",
    [_.CustomsClearance]: "bg-violet-100 text-violet-800",
    [_.OutForDelivery]: "bg-rose-100 text-rose-800",
    [_.Delivered]: "bg-lime-100 text-lime-800",
    [_.Completed]: "bg-emerald-100 text-emerald-800",
    [_.Cancelled]: "bg-red-100 text-red-800",
    [_.OnHold]: "bg-yellow-100 text-yellow-800",
  },
  Js = {
    [lt.Trial]:
      "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border border-orange-200 shadow-sm font-medium",
    [lt.Growth]:
      "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm font-medium",
    [lt.Corporate]:
      "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border border-slate-200 shadow-sm font-medium",
  };
(_.Planning,
  _.OrderCollection,
  _.DocumentPreparation,
  _.Loading,
  _.QualityCheck,
  _.ReadyToShip,
  _.InTransit,
  _.CustomsClearance,
  _.OutForDelivery,
  _.Delivered,
  _.Completed,
  _.Cancelled,
  _.OnHold);
const La = {
  [_.Planning]: [_.Loading, _.OnHold, _.Cancelled],
  [_.OrderCollection]: [_.Loading, _.Planning, _.OnHold, _.Cancelled],
  [_.DocumentPreparation]: [_.Loading, _.Planning, _.OnHold, _.Cancelled],
  [_.Loading]: [_.ReadyToShip, _.Planning, _.OnHold, _.Cancelled],
  [_.QualityCheck]: [_.ReadyToShip, _.Loading, _.OnHold, _.Cancelled],
  [_.ReadyToShip]: [_.InTransit, _.OnHold, _.Cancelled],
  [_.InTransit]: [_.CustomsClearance, _.OutForDelivery, _.Delivered, _.OnHold],
  [_.CustomsClearance]: [_.OutForDelivery, _.Delivered, _.OnHold],
  [_.OutForDelivery]: [_.Delivered, _.OnHold],
  [_.Delivered]: [_.Completed],
  [_.Completed]: [],
  [_.Cancelled]: [],
  [_.OnHold]: [
    _.Planning,
    _.Loading,
    _.ReadyToShip,
    _.InTransit,
    _.CustomsClearance,
    _.OutForDelivery,
    _.Cancelled,
  ],
};
(_.Planning,
  _.OrderCollection,
  _.DocumentPreparation,
  _.Loading,
  _.QualityCheck,
  _.ReadyToShip,
  _.InTransit,
  _.CustomsClearance,
  _.OutForDelivery,
  _.Delivered,
  _.Completed,
  _.Cancelled,
  _.OnHold);
const Ua = new Set([
    _.Planning,
    _.OrderCollection,
    _.DocumentPreparation,
    _.Loading,
    _.QualityCheck,
    _.ReadyToShip,
  ]),
  ji = (i) => Ua.has(i),
  qa = new Set([
    _.Loading,
    _.QualityCheck,
    _.ReadyToShip,
    _.InTransit,
    _.CustomsClearance,
    _.OutForDelivery,
    _.Delivered,
    _.Completed,
  ]),
  Gr = (i, { preShipmentStatus: e = g.InConsolidation } = {}) =>
    i === _.Cancelled
      ? g.ReadyToShip
      : i === _.OnHold
        ? g.OnHold
        : i === _.Completed
          ? g.Completed
          : i === _.Delivered
            ? g.Delivered
            : i === _.OutForDelivery
              ? g.OutForDelivery
              : i === _.CustomsClearance
                ? g.CustomsClearance
                : i === _.InTransit
                  ? g.InTransit
                  : (ji(i), e),
  Ba = Object.freeze({
    [_.InTransit]: _.InTransit,
    [_.CustomsClearance]: _.CustomsClearance,
    [_.OutForDelivery]: _.OutForDelivery,
    [_.Delivered]: _.Delivered,
    [_.Completed]: _.Completed,
    [_.Cancelled]: _.Cancelled,
    [_.OnHold]: _.OnHold,
  }),
  za = Object.freeze({
    [_.InTransit]: _.InTransit,
    [_.CustomsClearance]: _.CustomsClearance,
    [_.OutForDelivery]: _.OutForDelivery,
    [_.Delivered]: _.Delivered,
    [_.Completed]: _.Completed,
    [_.Cancelled]: _.Cancelled,
    [_.OnHold]: _.OnHold,
  }),
  Kr = (i) =>
    i === g.Delivered ||
    i === g.Completed ||
    i === _.Delivered ||
    i === _.Completed ||
    i === "Delivered" ||
    i === "Completed",
  Ni = (i) => La[i] || [],
  Oi = (i, e, t) => {
    const r = String(i || "").trim(),
      s = String(e || "").trim();
    if (!r || !s) return !1;
    if (r === s) return !0;
    const o = t(r) || [];
    return Array.isArray(o) && o.includes(s);
  },
  Qs = [
    { id: "dashboard", label: "Dashboard", icon: (i) => d.jsx(Un, { ...i }) },
    { id: "orders", label: "Orders", icon: (i) => d.jsx(qn, { ...i }) },
    {
      id: "consolidations",
      label: "Consolidations",
      icon: (i) => d.jsx(Bn, { ...i }),
    },
    { id: "shipments", label: "Shipments", icon: Ks },
    { id: "suppliers", label: "Suppliers", icon: (i) => d.jsx(Vn, { ...i }) },
    { id: "payments", label: "Payments", icon: (i) => d.jsx(Hn, { ...i }) },
  ],
  Ys = (i) => {
    const e = new Date(i),
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
  Va = (i) => {
    var e;
    return (
      ((e = Qs.find((t) => t.id === i)) == null ? void 0 : e.label) ||
      (i === "customers" ? "Customers" : i.charAt(0).toUpperCase() + i.slice(1))
    );
  };
function Xs({
  activePageId: i,
  onNavigate: e,
  customers: t,
  notifications: r,
  markNotificationAsRead: s,
  markAllNotificationsAsRead: o,
  hasMoreNotifications: n = !1,
  loadingMoreNotifications: a = !1,
  onLoadMoreNotifications: l = null,
  notificationPageSize: c = 50,
  onSignOut: m,
  currentUserId: f,
  isAdmin: p,
  globalSearchItems: v = [],
  children: T,
}) {
  var P;
  const [N, D] = E.useState(!1),
    [A, O] = E.useState(!1),
    [j, W] = E.useState(!1),
    [ee, ie] = E.useState(!1),
    [ge, ue] = E.useState("all"),
    [ne, ye] = E.useState(""),
    [U, De] = E.useState(""),
    [Fe, ae] = E.useState(!1),
    z = E.useRef(null),
    B = E.useRef(null),
    se = E.useRef(null),
    Le = E.useRef(null),
    Oe = E.useRef(null),
    Qe = E.useRef(null),
    Ie = E.useMemo(() => t.find((M) => M.id === f), [t, f]),
    nt = E.useMemo(() => {
      const M = [...Qs];
      return (
        p && M.push({ id: "customers", label: "Customers", icon: Pa }),
        M
      );
    }, [p]);
  (E.useEffect(() => {
    const M = (me) => {
      const ce = me.target,
        re = se.current && se.current.contains(ce),
        vt = Le.current && Le.current.contains(ce);
      (!re && !vt && O(!1),
        Oe.current && !Oe.current.contains(ce) && W(!1),
        Qe.current && !Qe.current.contains(ce) && D((At) => At && !1));
    };
    return (
      document.addEventListener("mousedown", M),
      () => document.removeEventListener("mousedown", M)
    );
  }, []),
    E.useEffect(() => {
      const M = (me) => {
        !p ||
          !v.length ||
          (!me.ctrlKey && !me.metaKey) ||
          String(me.key).toLowerCase() !== "k" ||
          (me.preventDefault(),
          D(!1),
          O(!1),
          W(!1),
          ae(!0),
          setTimeout(() => {
            var ce;
            (ce =
              typeof window < "u" && window.innerWidth < 768
                ? B.current
                : z.current) == null || ce.focus();
          }, 0));
      };
      return (
        document.addEventListener("keydown", M),
        () => document.removeEventListener("keydown", M)
      );
    }, [v.length, p]));
  const It = E.useMemo(() => {
      if (!p) return [];
      const M = U.trim().toLowerCase();
      return !M || M.length < 3
        ? []
        : (v || [])
            .map((me) => ({
              it: me,
              score:
                (`${me.kind} ${me.id} ${me.title} ${me.subtitle || ""}`
                  .toLowerCase()
                  .includes(M)
                  ? 10
                  : 0) +
                (String(me.id).toLowerCase().includes(M) ? 5 : 0) +
                (String(me.title).toLowerCase().includes(M) ? 3 : 0),
            }))
            .filter((me) => me.score > 0)
            .sort((me, ce) => ce.score - me.score)
            .slice(0, 10)
            .map((me) => me.it);
    }, [U, v, p]),
    rt = (M) => {
      if (!p || !v.length) return null;
      const me = Fe,
        ce =
          M === "mobile"
            ? "mt-2 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
            : "absolute z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden";
      return d.jsxs("div", {
        className: "relative",
        children: [
          d.jsxs("div", {
            className: "relative flex items-center gap-2",
            children: [
              d.jsx("input", {
                ref: M === "mobile" ? B : z,
                value: U,
                onChange: (re) => {
                  (De(re.target.value), ae(!0));
                },
                onFocus: () => ae(!0),
                onBlur:
                  M === "sidebar"
                    ? () => setTimeout(() => ae(!1), 120)
                    : void 0,
                placeholder: "Search ID or keyword",
                className: [
                  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm outline-none",
                  M === "mobile" ? "h-11 text-base" : "",
                ].join(" "),
              }),
              M === "mobile" &&
                d.jsx(ht, {
                  type: "button",
                  variant: "outline",
                  size: "iconSm",
                  onMouseDown: (re) => re.preventDefault(),
                  onClick: () => {
                    (ae(!1), De(""));
                  },
                  "aria-label": "Close search",
                  title: "Close search",
                  children: d.jsx(xi, { className: "h-4 w-4" }),
                }),
            ],
          }),
          me &&
            It.length > 0 &&
            d.jsxs("div", {
              className: ce,
              children: [
                d.jsx("div", {
                  className:
                    "px-4 py-2 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200",
                  children: d.jsx("div", {
                    className:
                      "text-[11px] font-semibold uppercase tracking-wider text-slate-500",
                    children: "Jump to",
                  }),
                }),
                d.jsx("div", {
                  className: "max-h-[320px] overflow-y-auto",
                  children: It.map((re) =>
                    d.jsxs(
                      "button",
                      {
                        type: "button",
                        className:
                          "w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0",
                        onMouseDown: (vt) => vt.preventDefault(),
                        onClick: () => {
                          (ae(!1), De(""), e(re.pageId, re.itemId || re.id));
                        },
                        children: [
                          d.jsxs("div", {
                            className:
                              "flex items-center justify-between gap-2",
                            children: [
                              d.jsx("div", {
                                className:
                                  "text-sm font-semibold text-slate-900 truncate",
                                children: re.title,
                              }),
                              d.jsx("div", {
                                className:
                                  "text-[11px] font-semibold text-slate-500 shrink-0",
                                children: re.kind,
                              }),
                            ],
                          }),
                          d.jsx("div", {
                            className: "mt-0.5 text-xs text-slate-600 truncate",
                            children: re.subtitle || re.id,
                          }),
                        ],
                      },
                      `${re.kind}-${re.id}`,
                    ),
                  ),
                }),
              ],
            }),
          me &&
            U.trim().length > 0 &&
            U.trim().length < 3 &&
            d.jsx("div", {
              className: ce,
              children: d.jsxs("div", {
                className: "px-4 py-3 text-xs font-semibold text-slate-500",
                children: ["Type at least ", 3, " characters"],
              }),
            }),
        ],
      });
    },
    be = E.useMemo(() => zs(r, f, p), [r, p, f]),
    we = E.useMemo(() => be.filter((M) => !M.isRead).length, [be]),
    Re = (M) => {
      (s(M.id), M.linkToPage && e(M.linkToPage, M.linkToId), O(!1));
    },
    Ze = E.useCallback(async () => {
      typeof o == "function" && (await o()) !== !1 && ue("all");
    }, [o]),
    at = ({ item: M, dense: me }) => {
      const ce = M.id === i,
        re = M.icon;
      return d.jsxs("button", {
        type: "button",
        onClick: () => {
          (e(M.id), D(!1));
        },
        "aria-current": ce ? "page" : void 0,
        className: [
          "group w-full flex items-center gap-3 rounded-2xl border text-left",
          me ? "px-3 py-2.5" : "px-4 py-3",
          ce
            ? "border-slate-900/10 bg-white shadow-sm"
            : "border-transparent hover:border-slate-900/10 hover:bg-white/70",
          "transition-colors",
        ].join(" "),
        children: [
          d.jsx("span", {
            className: [
              "h-10 w-10 rounded-2xl flex items-center justify-center shrink-0",
              ce
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white",
              "transition-colors",
            ].join(" "),
            "aria-hidden": "true",
            children: d.jsx(re, { className: "h-5 w-5" }),
          }),
          d.jsxs("span", {
            className: "min-w-0 flex-1",
            children: [
              d.jsx("span", {
                className:
                  "block text-sm font-semibold text-slate-900 truncate",
                children: M.label,
              }),
              d.jsx("span", {
                className: "block text-[11px] text-slate-500 truncate",
                children: ce ? "Active" : "Go to page",
              }),
            ],
          }),
        ],
      });
    };
  return d.jsx(Na, {
    value: {
      openActivityCenter: () => ie(!0),
      closeActivityCenter: () => ie(!1),
    },
    children: d.jsxs("div", {
      className:
        "min-h-screen app-shell-bg [--app-toast-left:0px] md:[--app-toast-left:calc(18rem+1.5rem)]",
      children: [
        d.jsx(() => {
          if (!ee) return null;
          const M = ne.trim().toLowerCase(),
            me = be.filter(
              (re) =>
                !(
                  (ge === "unread" && re.isRead) ||
                  (ge === "high" &&
                    !["high", "critical"].includes(
                      String(re.importance || "").toLowerCase(),
                    ))
                ) &&
                (!M ||
                  re.message.toLowerCase().includes(M) ||
                  (re.linkToPage || "").toLowerCase().includes(M) ||
                  (re.linkToId || "").toLowerCase().includes(M)),
            ),
            ce = typeof l == "function";
          return d.jsxs("div", {
            className: "fixed inset-0 z-[70]",
            children: [
              d.jsx("div", {
                className: "absolute inset-0 bg-black/35",
                onClick: () => ie(!1),
              }),
              d.jsxs("div", {
                className:
                  "absolute right-0 top-0 h-full w-full sm:w-[520px] bg-white shadow-2xl border-l border-slate-200 overflow-y-auto",
                children: [
                  d.jsxs("div", {
                    className:
                      "sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur",
                    children: [
                      d.jsxs("div", {
                        className: "p-4 flex items-start justify-between gap-3",
                        children: [
                          d.jsxs("div", {
                            className: "min-w-0",
                            children: [
                              d.jsx("div", {
                                className:
                                  "text-[11px] text-slate-500 font-semibold uppercase tracking-wider",
                                children: "Activity Center",
                              }),
                              d.jsx("div", {
                                className:
                                  "text-lg font-extrabold text-slate-900 truncate",
                                children: p ? "Ops activity" : "Your updates",
                              }),
                            ],
                          }),
                          d.jsx("button", {
                            type: "button",
                            onClick: () => ie(!1),
                            className:
                              "shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
                            "aria-label": "Close",
                            title: "Close",
                            children: d.jsx(xi, { className: "h-5 w-5" }),
                          }),
                        ],
                      }),
                      d.jsxs("div", {
                        className: "px-4 pb-4 space-y-3",
                        children: [
                          d.jsxs("div", {
                            className:
                              "flex items-center justify-between gap-2",
                            children: [
                              d.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  d.jsx("button", {
                                    type: "button",
                                    onClick: () => ue("all"),
                                    className: [
                                      "px-3 py-1.5 rounded-full text-xs font-semibold border",
                                      ge === "all"
                                        ? "bg-slate-900 text-white border-slate-900"
                                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                                    ].join(" "),
                                    children: "All",
                                  }),
                                  d.jsx("button", {
                                    type: "button",
                                    onClick: () => ue("unread"),
                                    className: [
                                      "px-3 py-1.5 rounded-full text-xs font-semibold border",
                                      ge === "unread"
                                        ? "bg-slate-900 text-white border-slate-900"
                                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                                    ].join(" "),
                                    children: "Unread",
                                  }),
                                  d.jsx("button", {
                                    type: "button",
                                    onClick: () => ue("high"),
                                    className: [
                                      "px-3 py-1.5 rounded-full text-xs font-semibold border",
                                      ge === "high"
                                        ? "bg-slate-900 text-white border-slate-900"
                                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                                    ].join(" "),
                                    children: "High",
                                  }),
                                ],
                              }),
                              d.jsx("button", {
                                type: "button",
                                onClick: () => {
                                  Ze();
                                },
                                disabled: we === 0,
                                className: [
                                  "px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors",
                                  we === 0
                                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                                ].join(" "),
                                children: "Mark all read",
                              }),
                            ],
                          }),
                          d.jsx("div", {
                            className: "relative",
                            children: d.jsx("input", {
                              type: "search",
                              value: ne,
                              onChange: (re) => ye(re.target.value),
                              placeholder:
                                "Search activity (message, page, id)...",
                              className:
                                "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm outline-none",
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  d.jsxs("div", {
                    className: "p-4 bg-slate-50 min-h-full",
                    children: [
                      me.length === 0
                        ? d.jsx("div", {
                            className:
                              "rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600",
                            children: "No activity matches your filters.",
                          })
                        : d.jsx("div", {
                            className: "space-y-2",
                            children: me.map((re) => {
                              const vt = new Date(re.timestamp),
                                At = Gs(String(re.importance)),
                                Dr = !re.isRead;
                              return d.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => {
                                    (Dr && s(re.id),
                                      re.linkToPage &&
                                        e(re.linkToPage, re.linkToId),
                                      ie(!1));
                                  },
                                  className: [
                                    "w-full text-left rounded-2xl border px-4 py-3 bg-white hover:bg-slate-50 transition-colors",
                                    Dr
                                      ? "border-emerald-200 shadow-sm"
                                      : "border-slate-200",
                                  ].join(" "),
                                  children: d.jsxs("div", {
                                    className:
                                      "flex items-start justify-between gap-3",
                                    children: [
                                      d.jsxs("div", {
                                        className: "min-w-0",
                                        children: [
                                          d.jsxs("div", {
                                            className:
                                              "flex items-center gap-2 flex-wrap",
                                            children: [
                                              d.jsx("div", {
                                                className:
                                                  "text-sm font-extrabold text-slate-900 truncate",
                                                children: Vs(re.message),
                                              }),
                                              d.jsx("span", {
                                                className: `inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${At.cls}`,
                                                children: At.label,
                                              }),
                                              Dr
                                                ? d.jsx("span", {
                                                    className:
                                                      "inline-flex items-center text-[11px] font-bold text-emerald-700",
                                                    children: "New",
                                                  })
                                                : null,
                                            ],
                                          }),
                                          d.jsx("div", {
                                            className:
                                              "mt-1 text-xs text-slate-600 line-clamp-2",
                                            children: re.message,
                                          }),
                                          re.linkToPage || re.linkToId
                                            ? d.jsxs("div", {
                                                className:
                                                  "mt-2 text-[11px] font-semibold text-slate-500",
                                                children: [
                                                  re.linkToPage
                                                    ? re.linkToPage
                                                    : "",
                                                  re.linkToId
                                                    ? ` \xE2\u20AC\xA2 ${re.linkToId}`
                                                    : "",
                                                ],
                                              })
                                            : null,
                                        ],
                                      }),
                                      d.jsx("div", {
                                        className:
                                          "shrink-0 text-xs text-slate-500 font-semibold",
                                        children: Hs(vt),
                                      }),
                                    ],
                                  }),
                                },
                                re.id,
                              );
                            }),
                          }),
                      d.jsxs("div", {
                        className: "mt-4 space-y-3",
                        children: [
                          d.jsxs("div", {
                            className: "text-[11px] text-slate-500",
                            children: [
                              "Showing ",
                              me.length,
                              " loaded item",
                              me.length === 1 ? "" : "s",
                              ".",
                            ],
                          }),
                          ce &&
                            (n || a) &&
                            d.jsx("button", {
                              type: "button",
                              onClick: () => {
                                l();
                              },
                              disabled: a,
                              className: [
                                "w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors",
                                a
                                  ? "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
                              ].join(" "),
                              children: a
                                ? "Loading older activity..."
                                : `Load older activity (${c})`,
                            }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        }, {}),
        d.jsxs("div", {
          className:
            "md:hidden sticky top-0 z-50 border-b border-slate-900/10 bg-white/75 backdrop-blur",
          children: [
            d.jsxs("div", {
              className: "px-4 py-2 flex items-center justify-between gap-2",
              children: [
                d.jsxs("div", {
                  className: "flex items-center gap-2 shrink-0",
                  children: [
                    d.jsx(ht, {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      onClick: () => D(!0),
                      "aria-label": "Open navigation",
                      children: d.jsx(Kn, { className: "h-5 w-5" }),
                    }),
                    d.jsx("a", {
                      href: "/",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "hover:opacity-80",
                      children: d.jsx(wr, {
                        size: "sm",
                        showText: !0,
                        markClassName: "w-10 h-10 sm:w-11 sm:h-11",
                        textClassName: "text-xl sm:text-2xl",
                      }),
                    }),
                  ],
                }),
                d.jsxs("div", {
                  className: "relative z-10 flex items-center gap-1 shrink-0",
                  children: [
                    p &&
                      v.length > 0 &&
                      d.jsx(ht, {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        onClick: () => {
                          (O(!1),
                            Fe
                              ? (ae(!1), De(""))
                              : (ae(!0),
                                setTimeout(() => {
                                  var M;
                                  return (M = B.current) == null
                                    ? void 0
                                    : M.focus();
                                }, 0)));
                        },
                        "aria-label": "Search",
                        title: "Search",
                        children: d.jsx("svg", {
                          className: "h-5 w-5",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          children: d.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z",
                          }),
                        }),
                      }),
                    d.jsxs("div", {
                      className: "relative",
                      ref: se,
                      children: [
                        d.jsxs(ht, {
                          type: "button",
                          variant: "ghost",
                          size: "icon",
                          onClick: () => O((M) => !M),
                          "aria-label": "View notifications",
                          "aria-expanded": A,
                          "aria-haspopup": "true",
                          className: "relative",
                          children: [
                            d.jsx(vs, { className: "h-5 w-5" }),
                            we > 0 &&
                              d.jsx(Hr, {
                                variant: "destructive",
                                className:
                                  "absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]",
                                children: we > 9 ? "9+" : we,
                              }),
                          ],
                        }),
                        A &&
                          d.jsxs("div", {
                            className:
                              "absolute right-0 mt-2 w-[320px] max-w-[90vw] rounded-2xl shadow-xl bg-white ring-1 ring-black/5 z-50 overflow-hidden border border-slate-200",
                            role: "menu",
                            children: [
                              d.jsxs("div", {
                                className:
                                  "px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white",
                                children: [
                                  d.jsx("div", {
                                    className:
                                      "text-xs font-semibold uppercase tracking-wider text-slate-500",
                                    children: "Notifications",
                                  }),
                                  d.jsx("div", {
                                    className:
                                      "text-sm font-extrabold text-slate-900",
                                    children:
                                      we > 0 ? `${we} unread` : "All caught up",
                                  }),
                                ],
                              }),
                              d.jsx("div", {
                                className: "max-h-[60vh] overflow-y-auto",
                                children:
                                  be.length === 0
                                    ? d.jsxs("div", {
                                        className:
                                          "px-4 py-10 text-center text-sm text-slate-600",
                                        children: [
                                          d.jsx(Ws, {
                                            className:
                                              "h-8 w-8 mx-auto opacity-40",
                                          }),
                                          d.jsx("div", {
                                            className: "mt-2",
                                            children: "No new notifications.",
                                          }),
                                        ],
                                      })
                                    : be
                                        .slice(0, 10)
                                        .map((M) =>
                                          d.jsxs(
                                            "button",
                                            {
                                              onClick: () => Re(M),
                                              className: [
                                                "w-full text-left px-4 py-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors",
                                                M.isRead
                                                  ? "bg-white"
                                                  : "bg-emerald-50/70",
                                              ].join(" "),
                                              role: "menuitem",
                                              children: [
                                                d.jsx("div", {
                                                  className: [
                                                    "text-sm font-semibold leading-snug",
                                                    M.isRead
                                                      ? "text-slate-900"
                                                      : "text-emerald-800",
                                                  ].join(" "),
                                                  children: M.message,
                                                }),
                                                d.jsx("div", {
                                                  className:
                                                    "mt-1 text-xs text-slate-500",
                                                  children: Ys(M.timestamp),
                                                }),
                                              ],
                                            },
                                            M.id,
                                          ),
                                        ),
                              }),
                              d.jsx("div", {
                                className:
                                  "p-2 border-t border-slate-200 bg-white",
                                children: d.jsx("button", {
                                  type: "button",
                                  onClick: () => {
                                    (O(!1), ie(!0));
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
            p &&
              v.length > 0 &&
              Fe &&
              d.jsx("div", {
                className: "border-t border-slate-200/70 bg-white/95 px-4 py-3",
                children: rt("mobile"),
              }),
          ],
        }),
        d.jsxs("div", {
          className: "md:grid md:grid-cols-[18rem_1fr] md:gap-6",
          children: [
            d.jsx("aside", {
              className:
                "hidden md:flex md:flex-col md:sticky md:top-0 md:h-screen md:px-4 md:py-5",
              children: d.jsxs("div", {
                className:
                  "app-sidebar-surface rounded-3xl border border-slate-200/70 overflow-hidden h-full flex flex-col shadow-sm",
                children: [
                  d.jsxs("div", {
                    className: "px-5 py-4 border-b border-slate-200/70",
                    children: [
                      d.jsx("a", {
                        href: "/",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className:
                          "inline-flex items-start gap-2 hover:opacity-90",
                        children: d.jsx(wr, {
                          size: "sm",
                          showText: !0,
                          markClassName: "w-10 h-10 sm:w-11 sm:h-11",
                          textClassName: "text-xl sm:text-2xl",
                        }),
                      }),
                      d.jsx("div", {
                        className:
                          "mt-3 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500",
                        children: p ? "Admin workspace" : "Customer workspace",
                      }),
                      d.jsx("div", {
                        className: "mt-3",
                        children: rt("sidebar"),
                      }),
                    ],
                  }),
                  d.jsx("nav", {
                    className: "p-3 space-y-1 overflow-y-auto",
                    children: nt.map((M) => d.jsx(at, { item: M }, M.id)),
                  }),
                  d.jsxs("div", {
                    className: "mt-auto p-3 border-t border-slate-200/70",
                    children: [
                      d.jsxs("div", {
                        className: "relative mb-2",
                        ref: Le,
                        children: [
                          d.jsxs(ht, {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            onClick: () => O((M) => !M),
                            "aria-label": "View notifications",
                            "aria-expanded": A,
                            "aria-haspopup": "true",
                            className: "w-full justify-between",
                            children: [
                              d.jsxs("span", {
                                className: "inline-flex items-center",
                                children: [
                                  d.jsx(vs, { className: "h-4 w-4 mr-2" }),
                                  "Alerts",
                                ],
                              }),
                              we > 0 &&
                                d.jsx(Hr, {
                                  variant: "destructive",
                                  className:
                                    "h-5 px-2 flex items-center justify-center text-[11px]",
                                  children: we > 99 ? "99+" : we,
                                }),
                            ],
                          }),
                          A &&
                            d.jsxs("div", {
                              className:
                                "origin-bottom-left absolute left-0 right-0 bottom-[2.8rem] rounded-2xl shadow-xl bg-white ring-1 ring-black/5 z-50 overflow-hidden border border-slate-200",
                              role: "menu",
                              children: [
                                d.jsxs("div", {
                                  className:
                                    "px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white",
                                  children: [
                                    d.jsx("div", {
                                      className:
                                        "text-xs font-semibold uppercase tracking-wider text-slate-500",
                                      children: "Notifications",
                                    }),
                                    d.jsx("div", {
                                      className:
                                        "text-sm font-extrabold text-slate-900",
                                      children:
                                        we > 0
                                          ? `${we} unread`
                                          : "All caught up",
                                    }),
                                  ],
                                }),
                                d.jsx("div", {
                                  className: "max-h-[420px] overflow-y-auto",
                                  children:
                                    be.length === 0
                                      ? d.jsxs("div", {
                                          className:
                                            "px-4 py-10 text-center text-sm text-slate-600",
                                          children: [
                                            d.jsx(Ws, {
                                              className:
                                                "h-8 w-8 mx-auto opacity-40",
                                            }),
                                            d.jsx("div", {
                                              className: "mt-2",
                                              children: "No new notifications.",
                                            }),
                                          ],
                                        })
                                      : be
                                          .slice(0, 10)
                                          .map((M) =>
                                            d.jsxs(
                                              "button",
                                              {
                                                onClick: () => Re(M),
                                                className: [
                                                  "w-full text-left px-4 py-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors",
                                                  M.isRead
                                                    ? "bg-white"
                                                    : "bg-emerald-50/70",
                                                ].join(" "),
                                                role: "menuitem",
                                                children: [
                                                  d.jsx("div", {
                                                    className: [
                                                      "text-sm font-semibold leading-snug",
                                                      M.isRead
                                                        ? "text-slate-900"
                                                        : "text-emerald-800",
                                                    ].join(" "),
                                                    children: M.message,
                                                  }),
                                                  d.jsx("div", {
                                                    className:
                                                      "mt-1 text-xs text-slate-500",
                                                    children: Ys(M.timestamp),
                                                  }),
                                                ],
                                              },
                                              M.id,
                                            ),
                                          ),
                                }),
                                d.jsx("div", {
                                  className:
                                    "p-2 border-t border-slate-200 bg-white",
                                  children: d.jsx("button", {
                                    type: "button",
                                    onClick: () => {
                                      (O(!1), ie(!0));
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
                      d.jsxs("div", {
                        className: "relative",
                        ref: Oe,
                        children: [
                          d.jsx(() => {
                            var M, me;
                            const ce = p
                                ? "A"
                                : ((me =
                                    (M = Ie?.contactPerson) == null
                                      ? void 0
                                      : M.charAt(0)) == null
                                    ? void 0
                                    : me.toUpperCase()) || "U",
                              re = p
                                ? "Administrator"
                                : Ie?.companyName || "Customer";
                            return d.jsxs("button", {
                              type: "button",
                              onClick: () => W((vt) => !vt),
                              className:
                                "w-full flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/70 hover:bg-white px-3 py-2.5 shadow-sm transition-colors",
                              "aria-haspopup": "true",
                              "aria-expanded": j,
                              children: [
                                d.jsx("span", {
                                  className:
                                    "h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold",
                                  children: ce,
                                }),
                                d.jsxs("span", {
                                  className: "min-w-0 flex-1 text-left",
                                  children: [
                                    d.jsx("span", {
                                      className:
                                        "block text-sm font-semibold text-slate-900 truncate",
                                      children: p
                                        ? "Admin"
                                        : Ie?.contactPerson || "User",
                                    }),
                                    d.jsx("span", {
                                      className:
                                        "block text-xs text-slate-500 truncate",
                                      children: re,
                                    }),
                                  ],
                                }),
                              ],
                            });
                          }, {}),
                          j &&
                            d.jsxs("div", {
                              className:
                                "absolute left-0 right-0 bottom-[3.25rem] rounded-2xl shadow-2xl bg-white border border-slate-200 overflow-hidden",
                              children: [
                                d.jsxs("div", {
                                  className:
                                    "px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white",
                                  children: [
                                    d.jsx("div", {
                                      className:
                                        "text-xs font-semibold uppercase tracking-wider text-slate-500",
                                      children: p ? "Admin" : "Company",
                                    }),
                                    d.jsx("div", {
                                      className:
                                        "text-sm font-extrabold text-slate-900 truncate",
                                      children: p
                                        ? "Administrator"
                                        : Ie?.companyName || "Customer",
                                    }),
                                  ],
                                }),
                                d.jsxs("div", {
                                  className:
                                    "px-4 py-3 text-sm text-slate-700 space-y-2",
                                  children: [
                                    !p &&
                                      Ie &&
                                      d.jsxs(d.Fragment, {
                                        children: [
                                          d.jsxs("div", {
                                            children: [
                                              d.jsx("span", {
                                                className:
                                                  "text-xs font-semibold uppercase tracking-wider text-slate-500",
                                                children: "Contact",
                                              }),
                                              d.jsx("div", {
                                                className:
                                                  "font-semibold text-slate-900",
                                                children: Ie.contactPerson,
                                              }),
                                            ],
                                          }),
                                          d.jsxs("div", {
                                            children: [
                                              d.jsx("span", {
                                                className:
                                                  "text-xs font-semibold uppercase tracking-wider text-slate-500",
                                                children: "Email",
                                              }),
                                              d.jsx("div", {
                                                className:
                                                  "font-semibold text-slate-900",
                                                children: Ie.email,
                                              }),
                                            ],
                                          }),
                                          d.jsxs("div", {
                                            className:
                                              "flex items-center justify-between gap-2",
                                            children: [
                                              d.jsxs("div", {
                                                children: [
                                                  d.jsx("span", {
                                                    className:
                                                      "text-xs font-semibold uppercase tracking-wider text-slate-500",
                                                    children: "Contract",
                                                  }),
                                                  d.jsx("div", {
                                                    className:
                                                      "text-xs text-slate-600 mt-0.5",
                                                    children:
                                                      ((P =
                                                        mt[Ie.contractType]) ==
                                                      null
                                                        ? void 0
                                                        : P.name) ||
                                                      Ie.contractType,
                                                  }),
                                                ],
                                              }),
                                              d.jsx(Hr, {
                                                className: [
                                                  Js[Ie.contractType],
                                                  "px-2 py-1 rounded-xl text-xs font-semibold tracking-wide",
                                                ].join(" "),
                                                children:
                                                  ((P = mt[Ie.contractType]) ==
                                                  null
                                                    ? void 0
                                                    : P.name) ||
                                                  String(Ie.contractType),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    d.jsxs(ht, {
                                      type: "button",
                                      variant: "outline",
                                      className:
                                        "w-full flex items-center justify-center gap-2",
                                      onClick: () => {
                                        (W(!1), m());
                                      },
                                      children: [
                                        d.jsx(_s, { className: "h-4 w-4" }),
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
            N &&
              d.jsxs("div", {
                className: "md:hidden fixed inset-0 z-[60]",
                children: [
                  d.jsx("div", {
                    className: "absolute inset-0 bg-black/40",
                    onClick: () => D(!1),
                  }),
                  d.jsxs("div", {
                    ref: Qe,
                    className:
                      "absolute left-0 top-0 h-full w-[88vw] max-w-[360px] app-sidebar-surface border-r border-slate-200/70 shadow-2xl",
                    children: [
                      d.jsxs("div", {
                        className:
                          "px-4 py-3 border-b border-slate-200/70 flex items-center justify-between",
                        children: [
                          d.jsx("a", {
                            href: "/",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "hover:opacity-90",
                            children: d.jsx(wr, {
                              size: "sm",
                              showText: !0,
                              markClassName: "w-10 h-10 sm:w-11 sm:h-11",
                              textClassName: "text-xl sm:text-2xl",
                            }),
                          }),
                          d.jsx(ht, {
                            type: "button",
                            variant: "ghost",
                            size: "icon",
                            onClick: () => D(!1),
                            "aria-label": "Close navigation",
                            className: "text-slate-900 hover:bg-slate-100",
                            children: d.jsx(xi, { className: "h-5 w-5" }),
                          }),
                        ],
                      }),
                      d.jsxs("div", {
                        className: "p-3",
                        children: [
                          d.jsx("div", {
                            className: "text-xs text-slate-600",
                            children: p
                              ? "Admin workspace"
                              : "Customer workspace",
                          }),
                          d.jsx("div", {
                            className:
                              "mt-1 text-base font-extrabold text-slate-900 truncate",
                            children: Va(i),
                          }),
                        ],
                      }),
                      d.jsx("nav", {
                        className: "px-3 pb-3 space-y-1 overflow-y-auto",
                        children: nt.map((M) =>
                          d.jsx(at, { item: M, dense: !0 }, M.id),
                        ),
                      }),
                      d.jsxs("div", {
                        className: "mt-auto p-3 border-t border-slate-200/70",
                        children: [
                          d.jsx("div", {
                            className: "text-slate-600 text-xs mb-2",
                            children: p
                              ? "Signed in as admin"
                              : Ie?.companyName || "Signed in",
                          }),
                          d.jsxs(ht, {
                            type: "button",
                            variant: "secondary",
                            className:
                              "w-full flex items-center justify-center gap-2",
                            onClick: () => m(),
                            children: [
                              d.jsx(_s, { className: "h-4 w-4" }),
                              "Sign Out",
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            d.jsx("main", {
              className: "min-w-0 px-3 sm:px-4 md:px-0",
              children: d.jsx("div", {
                className: "w-full md:pr-4",
                children: d.jsx("div", {
                  className: "py-4 md:py-6 md:pt-6",
                  children: d.jsx("div", {
                    className:
                      "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1",
                    children: T,
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
const Zs = E.createContext(void 0),
  Wr = () => {
    const i = E.useContext(Zs);
    if (!i) throw new Error("useToast must be used within a ToastProvider");
    return i;
  },
  Ha = ({ children: i }) => {
    const [e, t] = E.useState([]),
      r = E.useCallback((f) => {
        t((p) => p.filter((v) => v.id !== f));
      }, []),
      s = E.useCallback(
        (f) => {
          const p = Math.random().toString(36).substr(2, 9),
            v = { ...f, id: p };
          t((P) => [...P, v]);
          const T = f.duration || 5e3;
          setTimeout(() => r(p), T);
        },
        [r],
      ),
      o = E.useCallback(
        (f, p) => {
          s({ type: "error", title: f, message: p, duration: 7e3 });
        },
        [s],
      ),
      n = E.useCallback(
        (f, p) => {
          s({ type: "warning", title: f, message: p, duration: 6e3 });
        },
        [s],
      ),
      a = E.useCallback(
        (f, p) => {
          s({ type: "success", title: f, message: p, duration: 4e3 });
        },
        [s],
      ),
      l = E.useCallback(
        (f, p) => {
          s({ type: "info", title: f, message: p, duration: 4e3 });
        },
        [s],
      ),
      c = (f) => {
        switch (f) {
          case "success":
            return d.jsx("svg", {
              className: "w-5 h-5 text-green-400",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              children: d.jsx("path", {
                fillRule: "evenodd",
                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                clipRule: "evenodd",
              }),
            });
          case "error":
            return d.jsx("svg", {
              className: "w-5 h-5 text-red-400",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              children: d.jsx("path", {
                fillRule: "evenodd",
                d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                clipRule: "evenodd",
              }),
            });
          case "warning":
            return d.jsx("svg", {
              className: "w-5 h-5 text-yellow-400",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              children: d.jsx("path", {
                fillRule: "evenodd",
                d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
                clipRule: "evenodd",
              }),
            });
          case "info":
            return d.jsx("svg", {
              className: "w-5 h-5 text-blue-400",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              children: d.jsx("path", {
                fillRule: "evenodd",
                d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                clipRule: "evenodd",
              }),
            });
        }
      },
      m = (f) => {
        switch (f) {
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
    return d.jsxs(Zs.Provider, {
      value: {
        showToast: s,
        showError: o,
        showWarning: n,
        showSuccess: a,
        showInfo: l,
      },
      children: [
        i,
        d.jsx("div", {
          className:
            "fixed z-[100] pointer-events-none flex flex-col items-end gap-3",
          style: {
            top: "calc(env(safe-area-inset-top, 0px) + 1rem)",
            right: "calc(env(safe-area-inset-right, 0px) + 1rem)",
            left: "calc(env(safe-area-inset-left, 0px) + var(--app-toast-left, 0px) + 1rem)",
          },
          children: e.map((f) =>
            d.jsx(
              "div",
              {
                className: `${m(f.type)} pointer-events-auto border rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-in-out animate-slide-in-right`,
                style: { width: "min(24rem, 100%)" },
                children: d.jsxs("div", {
                  className: "flex items-start",
                  children: [
                    d.jsx("div", {
                      className: "flex-shrink-0",
                      children: c(f.type),
                    }),
                    d.jsxs("div", {
                      className: "ml-3 flex-1",
                      children: [
                        d.jsx("h3", {
                          className: "text-sm font-medium",
                          children: f.title,
                        }),
                        d.jsx("div", {
                          className: "mt-1 text-xs",
                          children: f.message,
                        }),
                      ],
                    }),
                    d.jsx("div", {
                      className: "ml-4 flex-shrink-0 flex",
                      children: d.jsxs("button", {
                        onClick: () => r(f.id),
                        className:
                          "inline-flex text-gray-400 hover:text-gray-500 focus:outline-none",
                        children: [
                          d.jsx("span", {
                            className: "sr-only",
                            children: "Close",
                          }),
                          d.jsx("svg", {
                            className: "h-4 w-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: d.jsx("path", {
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
              f.id,
            ),
          ),
        }),
        d.jsx("style", {
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
  };
class Pi extends Error {
  constructor(e, t = "FunctionsError", r) {
    (super(e), (this.name = t), (this.context = r));
  }
}
class Ga extends Pi {
  constructor(e) {
    super(
      "Failed to send a request to the Edge Function",
      "FunctionsFetchError",
      e,
    );
  }
}
class eo extends Pi {
  constructor(e) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", e);
  }
}
class to extends Pi {
  constructor(e) {
    super(
      "Edge Function returned a non-2xx status code",
      "FunctionsHttpError",
      e,
    );
  }
}
var Di;
(function (i) {
  ((i.Any = "any"),
    (i.ApNortheast1 = "ap-northeast-1"),
    (i.ApNortheast2 = "ap-northeast-2"),
    (i.ApSouth1 = "ap-south-1"),
    (i.ApSoutheast1 = "ap-southeast-1"),
    (i.ApSoutheast2 = "ap-southeast-2"),
    (i.CaCentral1 = "ca-central-1"),
    (i.EuCentral1 = "eu-central-1"),
    (i.EuWest1 = "eu-west-1"),
    (i.EuWest2 = "eu-west-2"),
    (i.EuWest3 = "eu-west-3"),
    (i.SaEast1 = "sa-east-1"),
    (i.UsEast1 = "us-east-1"),
    (i.UsWest1 = "us-west-1"),
    (i.UsWest2 = "us-west-2"));
})(Di || (Di = {}));
class Ka {
  constructor(e, { headers: t = {}, customFetch: r, region: s = Di.Any } = {}) {
    ((this.url = e),
      (this.headers = t),
      (this.region = s),
      (this.fetch = ((o) => {
        let n;
        return (
          (n =
            o ||
            (typeof fetch > "u"
              ? (...a) =>
                  ot(
                    async () => {
                      const { default: l } = await Promise.resolve().then(
                        () => er,
                      );
                      return { default: l };
                    },
                    void 0,
                  ).then(({ default: l }) => l(...a))
              : fetch)),
          (...a) => n(...a)
        );
      })(r)));
  }
  setAuth(e) {
    this.headers.Authorization = `Bearer ${e}`;
  }
  invoke(e, t = {}) {
    var r;
    return (function (s, o, n, a) {
      return new (n || (n = Promise))(function (l, c) {
        function m(v) {
          try {
            p(a.next(v));
          } catch (T) {
            c(T);
          }
        }
        function f(v) {
          try {
            p(a.throw(v));
          } catch (T) {
            c(T);
          }
        }
        function p(v) {
          v.done
            ? l(v.value)
            : (function (T) {
                return T instanceof n
                  ? T
                  : new n(function (P) {
                      P(T);
                    });
              })(v.value).then(m, f);
        }
        p((a = a.apply(s, o || [])).next());
      });
    })(this, void 0, void 0, function* () {
      try {
        const { headers: s, method: o, body: n } = t;
        let a = {},
          { region: l } = t;
        l || (l = this.region);
        const c = new URL(`${this.url}/${e}`);
        let m;
        (l &&
          l !== "any" &&
          ((a["x-region"] = l), c.searchParams.set("forceFunctionRegion", l)),
          n &&
            ((s && !Object.prototype.hasOwnProperty.call(s, "Content-Type")) ||
              !s) &&
            ((typeof Blob < "u" && n instanceof Blob) ||
            n instanceof ArrayBuffer
              ? ((a["Content-Type"] = "application/octet-stream"), (m = n))
              : typeof n == "string"
                ? ((a["Content-Type"] = "text/plain"), (m = n))
                : typeof FormData < "u" && n instanceof FormData
                  ? (m = n)
                  : ((a["Content-Type"] = "application/json"),
                    (m = JSON.stringify(n)))));
        const f = yield this.fetch(c.toString(), {
            method: o || "POST",
            headers: Object.assign(
              Object.assign(Object.assign({}, a), this.headers),
              s,
            ),
            body: m,
          }).catch((P) => {
            throw new Ga(P);
          }),
          p = f.headers.get("x-relay-error");
        if (p && p === "true") throw new eo(f);
        if (!f.ok) throw new to(f);
        let v,
          T = (
            (r = f.headers.get("Content-Type")) !== null && r !== void 0
              ? r
              : "text/plain"
          )
            .split(";")[0]
            .trim();
        return (
          (v =
            T === "application/json"
              ? yield f.json()
              : T === "application/octet-stream"
                ? yield f.blob()
                : T === "text/event-stream"
                  ? f
                  : T === "multipart/form-data"
                    ? yield f.formData()
                    : yield f.text()),
          { data: v, error: null, response: f }
        );
      } catch (s) {
        return {
          data: null,
          error: s,
          response: s instanceof to || s instanceof eo ? s.context : void 0,
        };
      }
    });
  }
}
var qe = {},
  Wt = {},
  Jt = {},
  Qt = {},
  Yt = {},
  Xt = {},
  Zt = (function () {
    if (typeof self < "u") return self;
    if (typeof window < "u") return window;
    if (typeof global < "u") return global;
    throw new Error("unable to locate global object");
  })();
const Wa = Zt.fetch,
  ro = Zt.fetch.bind(Zt),
  io = Zt.Headers,
  Ja = Zt.Request,
  Qa = Zt.Response,
  er = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        Headers: io,
        Request: Ja,
        Response: Qa,
        default: ro,
        fetch: Wa,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Ya = Yn(er);
var so,
  oo,
  no,
  ao,
  lo,
  Jr = {};
function co() {
  if (so) return Jr;
  ((so = 1), Object.defineProperty(Jr, "__esModule", { value: !0 }));
  class i extends Error {
    constructor(t) {
      (super(t.message),
        (this.name = "PostgrestError"),
        (this.details = t.details),
        (this.hint = t.hint),
        (this.code = t.code));
    }
  }
  return ((Jr.default = i), Jr);
}
function uo() {
  if (oo) return Xt;
  oo = 1;
  var i =
    (Xt && Xt.__importDefault) ||
    function (r) {
      return r && r.__esModule ? r : { default: r };
    };
  Object.defineProperty(Xt, "__esModule", { value: !0 });
  const e = i(Ya),
    t = i(co());
  return (
    (Xt.default = class {
      constructor(r) {
        ((this.shouldThrowOnError = !1),
          (this.method = r.method),
          (this.url = r.url),
          (this.headers = r.headers),
          (this.schema = r.schema),
          (this.body = r.body),
          (this.shouldThrowOnError = r.shouldThrowOnError),
          (this.signal = r.signal),
          (this.isMaybeSingle = r.isMaybeSingle),
          r.fetch
            ? (this.fetch = r.fetch)
            : typeof fetch > "u"
              ? (this.fetch = e.default)
              : (this.fetch = fetch));
      }
      throwOnError() {
        return ((this.shouldThrowOnError = !0), this);
      }
      setHeader(r, s) {
        return (
          (this.headers = Object.assign({}, this.headers)),
          (this.headers[r] = s),
          this
        );
      }
      then(r, s) {
        (this.schema === void 0 ||
          (["GET", "HEAD"].includes(this.method)
            ? (this.headers["Accept-Profile"] = this.schema)
            : (this.headers["Content-Profile"] = this.schema)),
          this.method !== "GET" &&
            this.method !== "HEAD" &&
            (this.headers["Content-Type"] = "application/json"));
        let o = (0, this.fetch)(this.url.toString(), {
          method: this.method,
          headers: this.headers,
          body: JSON.stringify(this.body),
          signal: this.signal,
        }).then(async (n) => {
          var a, l, c;
          let m = null,
            f = null,
            p = null,
            v = n.status,
            T = n.statusText;
          if (n.ok) {
            if (this.method !== "HEAD") {
              const D = await n.text();
              D === "" ||
                (f =
                  this.headers.Accept === "text/csv" ||
                  (this.headers.Accept &&
                    this.headers.Accept.includes(
                      "application/vnd.pgrst.plan+text",
                    ))
                    ? D
                    : JSON.parse(D));
            }
            const P =
                (a = this.headers.Prefer) === null || a === void 0
                  ? void 0
                  : a.match(/count=(exact|planned|estimated)/),
              N =
                (l = n.headers.get("content-range")) === null || l === void 0
                  ? void 0
                  : l.split("/");
            (P && N && N.length > 1 && (p = parseInt(N[1])),
              this.isMaybeSingle &&
                this.method === "GET" &&
                Array.isArray(f) &&
                (f.length > 1
                  ? ((m = {
                      code: "PGRST116",
                      details: `Results contain ${f.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                      hint: null,
                      message:
                        "JSON object requested, multiple (or no) rows returned",
                    }),
                    (f = null),
                    (p = null),
                    (v = 406),
                    (T = "Not Acceptable"))
                  : (f = f.length === 1 ? f[0] : null)));
          } else {
            const P = await n.text();
            try {
              ((m = JSON.parse(P)),
                Array.isArray(m) &&
                  n.status === 404 &&
                  ((f = []), (m = null), (v = 200), (T = "OK")));
            } catch {
              n.status === 404 && P === ""
                ? ((v = 204), (T = "No Content"))
                : (m = { message: P });
            }
            if (
              (m &&
                this.isMaybeSingle &&
                !((c = m?.details) === null || c === void 0) &&
                c.includes("0 rows") &&
                ((m = null), (v = 200), (T = "OK")),
              m && this.shouldThrowOnError)
            )
              throw new t.default(m);
          }
          return { error: m, data: f, count: p, status: v, statusText: T };
        });
        return (
          this.shouldThrowOnError ||
            (o = o.catch((n) => {
              var a, l, c;
              return {
                error: {
                  message: `${(a = n?.name) !== null && a !== void 0 ? a : "FetchError"}: ${n?.message}`,
                  details: `${(l = n?.stack) !== null && l !== void 0 ? l : ""}`,
                  hint: "",
                  code: `${(c = n?.code) !== null && c !== void 0 ? c : ""}`,
                },
                data: null,
                count: null,
                status: 0,
                statusText: "",
              };
            })),
          o.then(r, s)
        );
      }
      returns() {
        return this;
      }
      overrideTypes() {
        return this;
      }
    }),
    Xt
  );
}
function ho() {
  if (no) return Yt;
  no = 1;
  var i =
    (Yt && Yt.__importDefault) ||
    function (r) {
      return r && r.__esModule ? r : { default: r };
    };
  Object.defineProperty(Yt, "__esModule", { value: !0 });
  const e = i(uo());
  class t extends e.default {
    select(s) {
      let o = !1;
      const n = (s ?? "*")
        .split("")
        .map((a) => (/\s/.test(a) && !o ? "" : (a === '"' && (o = !o), a)))
        .join("");
      return (
        this.url.searchParams.set("select", n),
        this.headers.Prefer && (this.headers.Prefer += ","),
        (this.headers.Prefer += "return=representation"),
        this
      );
    }
    order(
      s,
      {
        ascending: o = !0,
        nullsFirst: n,
        foreignTable: a,
        referencedTable: l = a,
      } = {},
    ) {
      const c = l ? `${l}.order` : "order",
        m = this.url.searchParams.get(c);
      return (
        this.url.searchParams.set(
          c,
          `${m ? `${m},` : ""}${s}.${o ? "asc" : "desc"}${n === void 0 ? "" : n ? ".nullsfirst" : ".nullslast"}`,
        ),
        this
      );
    }
    limit(s, { foreignTable: o, referencedTable: n = o } = {}) {
      const a = typeof n > "u" ? "limit" : `${n}.limit`;
      return (this.url.searchParams.set(a, `${s}`), this);
    }
    range(s, o, { foreignTable: n, referencedTable: a = n } = {}) {
      const l = typeof a > "u" ? "offset" : `${a}.offset`,
        c = typeof a > "u" ? "limit" : `${a}.limit`;
      return (
        this.url.searchParams.set(l, `${s}`),
        this.url.searchParams.set(c, "" + (o - s + 1)),
        this
      );
    }
    abortSignal(s) {
      return ((this.signal = s), this);
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
      analyze: s = !1,
      verbose: o = !1,
      settings: n = !1,
      buffers: a = !1,
      wal: l = !1,
      format: c = "text",
    } = {}) {
      var m;
      const f = [
          s ? "analyze" : null,
          o ? "verbose" : null,
          n ? "settings" : null,
          a ? "buffers" : null,
          l ? "wal" : null,
        ]
          .filter(Boolean)
          .join("|"),
        p =
          (m = this.headers.Accept) !== null && m !== void 0
            ? m
            : "application/json";
      return (
        (this.headers.Accept = `application/vnd.pgrst.plan+${c}; for="${p}"; options=${f};`),
        this
      );
    }
    rollback() {
      var s;
      return (
        ((s = this.headers.Prefer) !== null && s !== void 0 ? s : "").trim()
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
  return ((Yt.default = t), Yt);
}
function Ai() {
  if (ao) return Qt;
  ao = 1;
  var i =
    (Qt && Qt.__importDefault) ||
    function (r) {
      return r && r.__esModule ? r : { default: r };
    };
  Object.defineProperty(Qt, "__esModule", { value: !0 });
  const e = i(ho());
  class t extends e.default {
    eq(s, o) {
      return (this.url.searchParams.append(s, `eq.${o}`), this);
    }
    neq(s, o) {
      return (this.url.searchParams.append(s, `neq.${o}`), this);
    }
    gt(s, o) {
      return (this.url.searchParams.append(s, `gt.${o}`), this);
    }
    gte(s, o) {
      return (this.url.searchParams.append(s, `gte.${o}`), this);
    }
    lt(s, o) {
      return (this.url.searchParams.append(s, `lt.${o}`), this);
    }
    lte(s, o) {
      return (this.url.searchParams.append(s, `lte.${o}`), this);
    }
    like(s, o) {
      return (this.url.searchParams.append(s, `like.${o}`), this);
    }
    likeAllOf(s, o) {
      return (
        this.url.searchParams.append(s, `like(all).{${o.join(",")}}`),
        this
      );
    }
    likeAnyOf(s, o) {
      return (
        this.url.searchParams.append(s, `like(any).{${o.join(",")}}`),
        this
      );
    }
    ilike(s, o) {
      return (this.url.searchParams.append(s, `ilike.${o}`), this);
    }
    ilikeAllOf(s, o) {
      return (
        this.url.searchParams.append(s, `ilike(all).{${o.join(",")}}`),
        this
      );
    }
    ilikeAnyOf(s, o) {
      return (
        this.url.searchParams.append(s, `ilike(any).{${o.join(",")}}`),
        this
      );
    }
    is(s, o) {
      return (this.url.searchParams.append(s, `is.${o}`), this);
    }
    in(s, o) {
      const n = Array.from(new Set(o))
        .map((a) =>
          typeof a == "string" && new RegExp("[,()]").test(a)
            ? `"${a}"`
            : `${a}`,
        )
        .join(",");
      return (this.url.searchParams.append(s, `in.(${n})`), this);
    }
    contains(s, o) {
      return (
        typeof o == "string"
          ? this.url.searchParams.append(s, `cs.${o}`)
          : Array.isArray(o)
            ? this.url.searchParams.append(s, `cs.{${o.join(",")}}`)
            : this.url.searchParams.append(s, `cs.${JSON.stringify(o)}`),
        this
      );
    }
    containedBy(s, o) {
      return (
        typeof o == "string"
          ? this.url.searchParams.append(s, `cd.${o}`)
          : Array.isArray(o)
            ? this.url.searchParams.append(s, `cd.{${o.join(",")}}`)
            : this.url.searchParams.append(s, `cd.${JSON.stringify(o)}`),
        this
      );
    }
    rangeGt(s, o) {
      return (this.url.searchParams.append(s, `sr.${o}`), this);
    }
    rangeGte(s, o) {
      return (this.url.searchParams.append(s, `nxl.${o}`), this);
    }
    rangeLt(s, o) {
      return (this.url.searchParams.append(s, `sl.${o}`), this);
    }
    rangeLte(s, o) {
      return (this.url.searchParams.append(s, `nxr.${o}`), this);
    }
    rangeAdjacent(s, o) {
      return (this.url.searchParams.append(s, `adj.${o}`), this);
    }
    overlaps(s, o) {
      return (
        typeof o == "string"
          ? this.url.searchParams.append(s, `ov.${o}`)
          : this.url.searchParams.append(s, `ov.{${o.join(",")}}`),
        this
      );
    }
    textSearch(s, o, { config: n, type: a } = {}) {
      let l = "";
      a === "plain"
        ? (l = "pl")
        : a === "phrase"
          ? (l = "ph")
          : a === "websearch" && (l = "w");
      const c = n === void 0 ? "" : `(${n})`;
      return (this.url.searchParams.append(s, `${l}fts${c}.${o}`), this);
    }
    match(s) {
      return (
        Object.entries(s).forEach(([o, n]) => {
          this.url.searchParams.append(o, `eq.${n}`);
        }),
        this
      );
    }
    not(s, o, n) {
      return (this.url.searchParams.append(s, `not.${o}.${n}`), this);
    }
    or(s, { foreignTable: o, referencedTable: n = o } = {}) {
      const a = n ? `${n}.or` : "or";
      return (this.url.searchParams.append(a, `(${s})`), this);
    }
    filter(s, o, n) {
      return (this.url.searchParams.append(s, `${o}.${n}`), this);
    }
  }
  return ((Qt.default = t), Qt);
}
function mo() {
  if (lo) return Jt;
  lo = 1;
  var i =
    (Jt && Jt.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
  Object.defineProperty(Jt, "__esModule", { value: !0 });
  const e = i(Ai());
  return (
    (Jt.default = class {
      constructor(t, { headers: r = {}, schema: s, fetch: o }) {
        ((this.url = t),
          (this.headers = r),
          (this.schema = s),
          (this.fetch = o));
      }
      select(t, { head: r = !1, count: s } = {}) {
        const o = r ? "HEAD" : "GET";
        let n = !1;
        const a = (t ?? "*")
          .split("")
          .map((l) => (/\s/.test(l) && !n ? "" : (l === '"' && (n = !n), l)))
          .join("");
        return (
          this.url.searchParams.set("select", a),
          s && (this.headers.Prefer = `count=${s}`),
          new e.default({
            method: o,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: !1,
          })
        );
      }
      insert(t, { count: r, defaultToNull: s = !0 } = {}) {
        const o = [];
        if (
          (this.headers.Prefer && o.push(this.headers.Prefer),
          r && o.push(`count=${r}`),
          s || o.push("missing=default"),
          (this.headers.Prefer = o.join(",")),
          Array.isArray(t))
        ) {
          const n = t.reduce((a, l) => a.concat(Object.keys(l)), []);
          if (n.length > 0) {
            const a = [...new Set(n)].map((l) => `"${l}"`);
            this.url.searchParams.set("columns", a.join(","));
          }
        }
        return new e.default({
          method: "POST",
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: t,
          fetch: this.fetch,
          allowEmpty: !1,
        });
      }
      upsert(
        t,
        {
          onConflict: r,
          ignoreDuplicates: s = !1,
          count: o,
          defaultToNull: n = !0,
        } = {},
      ) {
        const a = [`resolution=${s ? "ignore" : "merge"}-duplicates`];
        if (
          (r !== void 0 && this.url.searchParams.set("on_conflict", r),
          this.headers.Prefer && a.push(this.headers.Prefer),
          o && a.push(`count=${o}`),
          n || a.push("missing=default"),
          (this.headers.Prefer = a.join(",")),
          Array.isArray(t))
        ) {
          const l = t.reduce((c, m) => c.concat(Object.keys(m)), []);
          if (l.length > 0) {
            const c = [...new Set(l)].map((m) => `"${m}"`);
            this.url.searchParams.set("columns", c.join(","));
          }
        }
        return new e.default({
          method: "POST",
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: t,
          fetch: this.fetch,
          allowEmpty: !1,
        });
      }
      update(t, { count: r } = {}) {
        const s = [];
        return (
          this.headers.Prefer && s.push(this.headers.Prefer),
          r && s.push(`count=${r}`),
          (this.headers.Prefer = s.join(",")),
          new e.default({
            method: "PATCH",
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: t,
            fetch: this.fetch,
            allowEmpty: !1,
          })
        );
      }
      delete({ count: t } = {}) {
        const r = [];
        return (
          t && r.push(`count=${t}`),
          this.headers.Prefer && r.unshift(this.headers.Prefer),
          (this.headers.Prefer = r.join(",")),
          new e.default({
            method: "DELETE",
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: !1,
          })
        );
      }
    }),
    Jt
  );
}
var po,
  go,
  fo,
  yo,
  _r = {},
  Qr = {},
  Xa = (function () {
    if (yo) return qe;
    yo = 1;
    var i =
      (qe && qe.__importDefault) ||
      function (a) {
        return a && a.__esModule ? a : { default: a };
      };
    (Object.defineProperty(qe, "__esModule", { value: !0 }),
      (qe.PostgrestError =
        qe.PostgrestBuilder =
        qe.PostgrestTransformBuilder =
        qe.PostgrestFilterBuilder =
        qe.PostgrestQueryBuilder =
        qe.PostgrestClient =
          void 0));
    const e = i(
      (function () {
        if (fo) return Wt;
        fo = 1;
        var a =
          (Wt && Wt.__importDefault) ||
          function (p) {
            return p && p.__esModule ? p : { default: p };
          };
        Object.defineProperty(Wt, "__esModule", { value: !0 });
        const l = a(mo()),
          c = a(Ai()),
          m = (function () {
            if (go) return _r;
            ((go = 1),
              Object.defineProperty(_r, "__esModule", { value: !0 }),
              (_r.DEFAULT_HEADERS = void 0));
            const p =
              (po ||
                ((po = 1),
                Object.defineProperty(Qr, "__esModule", { value: !0 }),
                (Qr.version = void 0),
                (Qr.version = "0.0.0-automated")),
              Qr);
            return (
              (_r.DEFAULT_HEADERS = {
                "X-Client-Info": `postgrest-js/${p.version}`,
              }),
              _r
            );
          })();
        class f {
          constructor(v, { headers: T = {}, schema: P, fetch: N } = {}) {
            ((this.url = v),
              (this.headers = Object.assign(
                Object.assign({}, m.DEFAULT_HEADERS),
                T,
              )),
              (this.schemaName = P),
              (this.fetch = N));
          }
          from(v) {
            const T = new URL(`${this.url}/${v}`);
            return new l.default(T, {
              headers: Object.assign({}, this.headers),
              schema: this.schemaName,
              fetch: this.fetch,
            });
          }
          schema(v) {
            return new f(this.url, {
              headers: this.headers,
              schema: v,
              fetch: this.fetch,
            });
          }
          rpc(v, T = {}, { head: P = !1, get: N = !1, count: D } = {}) {
            let A;
            const O = new URL(`${this.url}/rpc/${v}`);
            let j;
            P || N
              ? ((A = P ? "HEAD" : "GET"),
                Object.entries(T)
                  .filter(([ee, ie]) => ie !== void 0)
                  .map(([ee, ie]) => [
                    ee,
                    Array.isArray(ie) ? `{${ie.join(",")}}` : `${ie}`,
                  ])
                  .forEach(([ee, ie]) => {
                    O.searchParams.append(ee, ie);
                  }))
              : ((A = "POST"), (j = T));
            const W = Object.assign({}, this.headers);
            return (
              D && (W.Prefer = `count=${D}`),
              new c.default({
                method: A,
                url: O,
                headers: W,
                schema: this.schemaName,
                body: j,
                fetch: this.fetch,
                allowEmpty: !1,
              })
            );
          }
        }
        return ((Wt.default = f), Wt);
      })(),
    );
    qe.PostgrestClient = e.default;
    const t = i(mo());
    qe.PostgrestQueryBuilder = t.default;
    const r = i(Ai());
    qe.PostgrestFilterBuilder = r.default;
    const s = i(ho());
    qe.PostgrestTransformBuilder = s.default;
    const o = i(uo());
    qe.PostgrestBuilder = o.default;
    const n = i(co());
    return (
      (qe.PostgrestError = n.default),
      (qe.default = {
        PostgrestClient: e.default,
        PostgrestQueryBuilder: t.default,
        PostgrestFilterBuilder: r.default,
        PostgrestTransformBuilder: s.default,
        PostgrestBuilder: o.default,
        PostgrestError: n.default,
      }),
      qe
    );
  })();
const Za = Xn(Xa),
  {
    PostgrestClient: el,
    PostgrestQueryBuilder: yd,
    PostgrestFilterBuilder: bd,
    PostgrestTransformBuilder: wd,
    PostgrestBuilder: vd,
    PostgrestError: _d,
  } = Za,
  tl = (function () {
    if (typeof WebSocket < "u") return WebSocket;
    if (typeof global.WebSocket < "u") return global.WebSocket;
    if (typeof window.WebSocket < "u") return window.WebSocket;
    if (typeof self.WebSocket < "u") return self.WebSocket;
    throw new Error("`WebSocket` is not supported in this environment");
  })();
var xr, We, pt, $i, Mt, Se;
((function (i) {
  ((i[(i.connecting = 0)] = "connecting"),
    (i[(i.open = 1)] = "open"),
    (i[(i.closing = 2)] = "closing"),
    (i[(i.closed = 3)] = "closed"));
})(xr || (xr = {})),
  (function (i) {
    ((i.closed = "closed"),
      (i.errored = "errored"),
      (i.joined = "joined"),
      (i.joining = "joining"),
      (i.leaving = "leaving"));
  })(We || (We = {})),
  (function (i) {
    ((i.close = "phx_close"),
      (i.error = "phx_error"),
      (i.join = "phx_join"),
      (i.reply = "phx_reply"),
      (i.leave = "phx_leave"),
      (i.access_token = "access_token"));
  })(pt || (pt = {})),
  (($i || ($i = {})).websocket = "websocket"),
  (function (i) {
    ((i.Connecting = "connecting"),
      (i.Open = "open"),
      (i.Closing = "closing"),
      (i.Closed = "closed"));
  })(Mt || (Mt = {})));
class rl {
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
    const s = t.getUint8(1),
      o = t.getUint8(2);
    let n = this.HEADER_LENGTH + 2;
    const a = r.decode(e.slice(n, n + s));
    n += s;
    const l = r.decode(e.slice(n, n + o));
    return (
      (n += o),
      {
        ref: null,
        topic: a,
        event: l,
        payload: JSON.parse(r.decode(e.slice(n, e.byteLength))),
      }
    );
  }
}
class bo {
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
(function (i) {
  ((i.abstime = "abstime"),
    (i.bool = "bool"),
    (i.date = "date"),
    (i.daterange = "daterange"),
    (i.float4 = "float4"),
    (i.float8 = "float8"),
    (i.int2 = "int2"),
    (i.int4 = "int4"),
    (i.int4range = "int4range"),
    (i.int8 = "int8"),
    (i.int8range = "int8range"),
    (i.json = "json"),
    (i.jsonb = "jsonb"),
    (i.money = "money"),
    (i.numeric = "numeric"),
    (i.oid = "oid"),
    (i.reltime = "reltime"),
    (i.text = "text"),
    (i.time = "time"),
    (i.timestamp = "timestamp"),
    (i.timestamptz = "timestamptz"),
    (i.timetz = "timetz"),
    (i.tsrange = "tsrange"),
    (i.tstzrange = "tstzrange"));
})(Se || (Se = {}));
const wo = (i, e, t = {}) => {
    var r;
    const s = (r = t.skipTypes) !== null && r !== void 0 ? r : [];
    return Object.keys(e).reduce((o, n) => ((o[n] = il(n, i, e, s)), o), {});
  },
  il = (i, e, t, r) => {
    const s = e.find((a) => a.name === i),
      o = s?.type,
      n = t[i];
    return o && !r.includes(o) ? vo(o, n) : _o(n);
  },
  vo = (i, e) => {
    if (i.charAt(0) === "_") {
      const t = i.slice(1, i.length);
      return al(e, t);
    }
    switch (i) {
      case Se.bool:
        return sl(e);
      case Se.float4:
      case Se.float8:
      case Se.int2:
      case Se.int4:
      case Se.int8:
      case Se.numeric:
      case Se.oid:
        return ol(e);
      case Se.json:
      case Se.jsonb:
        return nl(e);
      case Se.timestamp:
        return ll(e);
      case Se.abstime:
      case Se.date:
      case Se.daterange:
      case Se.int4range:
      case Se.int8range:
      case Se.money:
      case Se.reltime:
      case Se.text:
      case Se.time:
      case Se.timestamptz:
      case Se.timetz:
      case Se.tsrange:
      case Se.tstzrange:
      default:
        return _o(e);
    }
  },
  _o = (i) => i,
  sl = (i) => {
    switch (i) {
      case "t":
        return !0;
      case "f":
        return !1;
      default:
        return i;
    }
  },
  ol = (i) => {
    if (typeof i == "string") {
      const e = parseFloat(i);
      if (!Number.isNaN(e)) return e;
    }
    return i;
  },
  nl = (i) => {
    if (typeof i == "string")
      try {
        return JSON.parse(i);
      } catch (e) {
        return (Z(`JSON parse error: ${e}`), i);
      }
    return i;
  },
  al = (i, e) => {
    if (typeof i != "string") return i;
    const t = i.length - 1,
      r = i[t];
    if (i[0] === "{" && r === "}") {
      let s;
      const o = i.slice(1, t);
      try {
        s = JSON.parse("[" + o + "]");
      } catch {
        s = o ? o.split(",") : [];
      }
      return s.map((n) => vo(e, n));
    }
    return i;
  },
  ll = (i) => (typeof i == "string" ? i.replace(" ", "T") : i),
  xo = (i) => {
    let e = i;
    return (
      (e = e.replace(/^ws/i, "http")),
      (e = e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, "")),
      e.replace(/\/+$/, "")
    );
  };
class Ri {
  constructor(e, t, r = {}, s = 1e4) {
    ((this.channel = e),
      (this.event = t),
      (this.payload = r),
      (this.timeout = s),
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
    this.timeoutTimer ||
      ((this.ref = this.channel.socket._makeRef()),
      (this.refEvent = this.channel._replyEventName(this.ref)),
      this.channel._on(this.refEvent, {}, (e) => {
        (this._cancelRefEvent(),
          this._cancelTimeout(),
          (this.receivedResp = e),
          this._matchReceive(e));
      }),
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
var Co, So, ko, Ct;
(function (i) {
  ((i.SYNC = "sync"), (i.JOIN = "join"), (i.LEAVE = "leave"));
})(Co || (Co = {}));
class Or {
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
    const r = t?.events || { state: "presence_state", diff: "presence_diff" };
    (this.channel._on(r.state, {}, (s) => {
      const { onJoin: o, onLeave: n, onSync: a } = this.caller;
      ((this.joinRef = this.channel._joinRef()),
        (this.state = Or.syncState(this.state, s, o, n)),
        this.pendingDiffs.forEach((l) => {
          this.state = Or.syncDiff(this.state, l, o, n);
        }),
        (this.pendingDiffs = []),
        a());
    }),
      this.channel._on(r.diff, {}, (s) => {
        const { onJoin: o, onLeave: n, onSync: a } = this.caller;
        this.inPendingSyncState()
          ? this.pendingDiffs.push(s)
          : ((this.state = Or.syncDiff(this.state, s, o, n)), a());
      }),
      this.onJoin((s, o, n) => {
        this.channel._trigger("presence", {
          event: "join",
          key: s,
          currentPresences: o,
          newPresences: n,
        });
      }),
      this.onLeave((s, o, n) => {
        this.channel._trigger("presence", {
          event: "leave",
          key: s,
          currentPresences: o,
          leftPresences: n,
        });
      }),
      this.onSync(() => {
        this.channel._trigger("presence", { event: "sync" });
      }));
  }
  static syncState(e, t, r, s) {
    const o = this.cloneDeep(e),
      n = this.transformState(t),
      a = {},
      l = {};
    return (
      this.map(o, (c, m) => {
        n[c] || (l[c] = m);
      }),
      this.map(n, (c, m) => {
        const f = o[c];
        if (f) {
          const p = m.map((N) => N.presence_ref),
            v = f.map((N) => N.presence_ref),
            T = m.filter((N) => v.indexOf(N.presence_ref) < 0),
            P = f.filter((N) => p.indexOf(N.presence_ref) < 0);
          (T.length > 0 && (a[c] = T), P.length > 0 && (l[c] = P));
        } else a[c] = m;
      }),
      this.syncDiff(o, { joins: a, leaves: l }, r, s)
    );
  }
  static syncDiff(e, t, r, s) {
    const { joins: o, leaves: n } = {
      joins: this.transformState(t.joins),
      leaves: this.transformState(t.leaves),
    };
    return (
      r || (r = () => {}),
      s || (s = () => {}),
      this.map(o, (a, l) => {
        var c;
        const m = (c = e[a]) !== null && c !== void 0 ? c : [];
        if (((e[a] = this.cloneDeep(l)), m.length > 0)) {
          const f = e[a].map((v) => v.presence_ref),
            p = m.filter((v) => f.indexOf(v.presence_ref) < 0);
          e[a].unshift(...p);
        }
        r(a, m, l);
      }),
      this.map(n, (a, l) => {
        let c = e[a];
        if (!c) return;
        const m = l.map((f) => f.presence_ref);
        ((c = c.filter((f) => m.indexOf(f.presence_ref) < 0)),
          (e[a] = c),
          s(a, c, l),
          c.length === 0 && delete e[a]);
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
        const s = e[r];
        return (
          (t[r] =
            "metas" in s
              ? s.metas.map(
                  (o) => (
                    (o.presence_ref = o.phx_ref),
                    delete o.phx_ref,
                    delete o.phx_ref_prev,
                    o
                  ),
                )
              : s),
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
((function (i) {
  ((i.ALL = "*"),
    (i.INSERT = "INSERT"),
    (i.UPDATE = "UPDATE"),
    (i.DELETE = "DELETE"));
})(So || (So = {})),
  (function (i) {
    ((i.BROADCAST = "broadcast"),
      (i.PRESENCE = "presence"),
      (i.POSTGRES_CHANGES = "postgres_changes"),
      (i.SYSTEM = "system"));
  })(ko || (ko = {})),
  (function (i) {
    ((i.SUBSCRIBED = "SUBSCRIBED"),
      (i.TIMED_OUT = "TIMED_OUT"),
      (i.CLOSED = "CLOSED"),
      (i.CHANNEL_ERROR = "CHANNEL_ERROR"));
  })(Ct || (Ct = {})));
class Qi {
  constructor(e, t = { config: {} }, r) {
    ((this.topic = e),
      (this.params = t),
      (this.socket = r),
      (this.bindings = {}),
      (this.state = We.closed),
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
      (this.joinPush = new Ri(this, pt.join, this.params, this.timeout)),
      (this.rejoinTimer = new bo(
        () => this._rejoinUntilConnected(),
        this.socket.reconnectAfterMs,
      )),
      this.joinPush.receive("ok", () => {
        ((this.state = We.joined),
          this.rejoinTimer.reset(),
          this.pushBuffer.forEach((s) => s.send()),
          (this.pushBuffer = []));
      }),
      this._onClose(() => {
        (this.rejoinTimer.reset(),
          this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`),
          (this.state = We.closed),
          this.socket._remove(this));
      }),
      this._onError((s) => {
        this._isLeaving() ||
          this._isClosed() ||
          (this.socket.log("channel", `error ${this.topic}`, s),
          (this.state = We.errored),
          this.rejoinTimer.scheduleTimeout());
      }),
      this.joinPush.receive("timeout", () => {
        this._isJoining() &&
          (this.socket.log(
            "channel",
            `timeout ${this.topic}`,
            this.joinPush.timeout,
          ),
          (this.state = We.errored),
          this.rejoinTimer.scheduleTimeout());
      }),
      this._on(pt.reply, {}, (s, o) => {
        this._trigger(this._replyEventName(o), s);
      }),
      (this.presence = new Or(this)),
      (this.broadcastEndpointURL = xo(this.socket.endPoint) + "/api/broadcast"),
      (this.private = this.params.config.private || !1));
  }
  subscribe(e, t = this.timeout) {
    var r, s;
    if (
      (this.socket.isConnected() || this.socket.connect(),
      this.state == We.closed)
    ) {
      const {
        config: { broadcast: o, presence: n, private: a },
      } = this.params;
      (this._onError((m) => e?.(Ct.CHANNEL_ERROR, m)),
        this._onClose(() => e?.(Ct.CLOSED)));
      const l = {},
        c = {
          broadcast: o,
          presence: n,
          postgres_changes:
            (s =
              (r = this.bindings.postgres_changes) === null || r === void 0
                ? void 0
                : r.map((m) => m.filter)) !== null && s !== void 0
              ? s
              : [],
          private: a,
        };
      (this.socket.accessTokenValue &&
        (l.access_token = this.socket.accessTokenValue),
        this.updateJoinPayload(Object.assign({ config: c }, l)),
        (this.joinedOnce = !0),
        this._rejoin(t),
        this.joinPush
          .receive("ok", async ({ postgres_changes: m }) => {
            var f;
            if ((this.socket.setAuth(), m !== void 0)) {
              const p = this.bindings.postgres_changes,
                v = (f = p?.length) !== null && f !== void 0 ? f : 0,
                T = [];
              for (let P = 0; P < v; P++) {
                const N = p[P],
                  {
                    filter: { event: D, schema: A, table: O, filter: j },
                  } = N,
                  W = m && m[P];
                if (
                  !W ||
                  W.event !== D ||
                  W.schema !== A ||
                  W.table !== O ||
                  W.filter !== j
                )
                  return (
                    this.unsubscribe(),
                    (this.state = We.errored),
                    void e?.(
                      Ct.CHANNEL_ERROR,
                      new Error(
                        "mismatch between server and client bindings for postgres changes",
                      ),
                    )
                  );
                T.push(Object.assign(Object.assign({}, N), { id: W.id }));
              }
              return (
                (this.bindings.postgres_changes = T),
                void (e && e(Ct.SUBSCRIBED))
              );
            }
            e?.(Ct.SUBSCRIBED);
          })
          .receive("error", (m) => {
            ((this.state = We.errored),
              e?.(
                Ct.CHANNEL_ERROR,
                new Error(
                  JSON.stringify(Object.values(m).join(", ") || "error"),
                ),
              ));
          })
          .receive("timeout", () => {
            e?.(Ct.TIMED_OUT);
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
    var r, s;
    if (this._canPush() || e.type !== "broadcast")
      return new Promise((o) => {
        var n, a, l;
        const c = this._push(e.type, e, t.timeout || this.timeout);
        (e.type === "broadcast" &&
          !(
            (l =
              (a =
                (n = this.params) === null || n === void 0
                  ? void 0
                  : n.config) === null || a === void 0
                ? void 0
                : a.broadcast) !== null &&
            l !== void 0 &&
            l.ack
          ) &&
          o("ok"),
          c.receive("ok", () => o("ok")),
          c.receive("error", () => o("error")),
          c.receive("timeout", () => o("timed out")));
      });
    {
      const { event: o, payload: n } = e,
        a = {
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
                event: o,
                payload: n,
                private: this.private,
              },
            ],
          }),
        };
      try {
        const l = await this._fetchWithTimeout(
          this.broadcastEndpointURL,
          a,
          (r = t.timeout) !== null && r !== void 0 ? r : this.timeout,
        );
        return (
          await ((s = l.body) === null || s === void 0 ? void 0 : s.cancel()),
          l.ok ? "ok" : "error"
        );
      } catch (l) {
        return l.name === "AbortError" ? "timed out" : "error";
      }
    }
  }
  updateJoinPayload(e) {
    this.joinPush.updatePayload(e);
  }
  unsubscribe(e = this.timeout) {
    this.state = We.leaving;
    const t = () => {
      (this.socket.log("channel", `leave ${this.topic}`),
        this._trigger(pt.close, "leave", this._joinRef()));
    };
    this.joinPush.destroy();
    let r = null;
    return new Promise((s) => {
      ((r = new Ri(this, pt.leave, {}, e)),
        r
          .receive("ok", () => {
            (t(), s("ok"));
          })
          .receive("timeout", () => {
            (t(), s("timed out"));
          })
          .receive("error", () => {
            s("error");
          }),
        r.send(),
        this._canPush() || r.trigger("ok", {}));
    }).finally(() => {
      r?.destroy();
    });
  }
  teardown() {
    (this.pushBuffer.forEach((e) => e.destroy()),
      this.rejoinTimer && clearTimeout(this.rejoinTimer.timer),
      this.joinPush.destroy());
  }
  async _fetchWithTimeout(e, t, r) {
    const s = new AbortController(),
      o = setTimeout(() => s.abort(), r),
      n = await this.socket.fetch(
        e,
        Object.assign(Object.assign({}, t), { signal: s.signal }),
      );
    return (clearTimeout(o), n);
  }
  _push(e, t, r = this.timeout) {
    if (!this.joinedOnce)
      throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    let s = new Ri(this, e, t, r);
    return (
      this._canPush() ? s.send() : (s.startTimeout(), this.pushBuffer.push(s)),
      s
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
    var s, o;
    const n = e.toLocaleLowerCase(),
      { close: a, error: l, leave: c, join: m } = pt;
    if (r && [a, l, c, m].indexOf(n) >= 0 && r !== this._joinRef()) return;
    let f = this._onMessage(n, t, r);
    if (t && !f)
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    ["insert", "update", "delete"].includes(n)
      ? (s = this.bindings.postgres_changes) === null ||
        s === void 0 ||
        s
          .filter((p) => {
            var v, T, P;
            return (
              ((v = p.filter) === null || v === void 0 ? void 0 : v.event) ===
                "*" ||
              ((P =
                (T = p.filter) === null || T === void 0 ? void 0 : T.event) ===
                null || P === void 0
                ? void 0
                : P.toLocaleLowerCase()) === n
            );
          })
          .map((p) => p.callback(f, r))
      : (o = this.bindings[n]) === null ||
        o === void 0 ||
        o
          .filter((p) => {
            var v, T, P, N, D, A;
            if (["broadcast", "presence", "postgres_changes"].includes(n)) {
              if ("id" in p) {
                const O = p.id,
                  j =
                    (v = p.filter) === null || v === void 0 ? void 0 : v.event;
                return (
                  O &&
                  ((T = t.ids) === null || T === void 0
                    ? void 0
                    : T.includes(O)) &&
                  (j === "*" ||
                    j?.toLocaleLowerCase() ===
                      ((P = t.data) === null || P === void 0
                        ? void 0
                        : P.type.toLocaleLowerCase()))
                );
              }
              {
                const O =
                  (D =
                    (N = p?.filter) === null || N === void 0
                      ? void 0
                      : N.event) === null || D === void 0
                    ? void 0
                    : D.toLocaleLowerCase();
                return (
                  O === "*" ||
                  O ===
                    ((A = t?.event) === null || A === void 0
                      ? void 0
                      : A.toLocaleLowerCase())
                );
              }
            }
            return p.type.toLocaleLowerCase() === n;
          })
          .map((p) => {
            if (typeof f == "object" && "ids" in f) {
              const v = f.data,
                {
                  schema: T,
                  table: P,
                  commit_timestamp: N,
                  type: D,
                  errors: A,
                } = v;
              f = Object.assign(
                Object.assign(
                  {},
                  {
                    schema: T,
                    table: P,
                    commit_timestamp: N,
                    eventType: D,
                    new: {},
                    old: {},
                    errors: A,
                  },
                ),
                this._getPayloadRecords(v),
              );
            }
            p.callback(f, r);
          });
  }
  _isClosed() {
    return this.state === We.closed;
  }
  _isJoined() {
    return this.state === We.joined;
  }
  _isJoining() {
    return this.state === We.joining;
  }
  _isLeaving() {
    return this.state === We.leaving;
  }
  _replyEventName(e) {
    return `chan_reply_${e}`;
  }
  _on(e, t, r) {
    const s = e.toLocaleLowerCase(),
      o = { type: s, filter: t, callback: r };
    return (
      this.bindings[s] ? this.bindings[s].push(o) : (this.bindings[s] = [o]),
      this
    );
  }
  _off(e, t) {
    const r = e.toLocaleLowerCase();
    return (
      (this.bindings[r] = this.bindings[r].filter((s) => {
        var o;
        return !(
          ((o = s.type) === null || o === void 0
            ? void 0
            : o.toLocaleLowerCase()) === r && Qi.isEqual(s.filter, t)
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
    this._on(pt.close, {}, e);
  }
  _onError(e) {
    this._on(pt.error, {}, (t) => e(t));
  }
  _canPush() {
    return this.socket.isConnected() && this._isJoined();
  }
  _rejoin(e = this.timeout) {
    this._isLeaving() ||
      (this.socket._leaveOpenTopic(this.topic),
      (this.state = We.joining),
      this.joinPush.resend(e));
  }
  _getPayloadRecords(e) {
    const t = { new: {}, old: {} };
    return (
      (e.type === "INSERT" || e.type === "UPDATE") &&
        (t.new = wo(e.columns, e.record)),
      (e.type === "UPDATE" || e.type === "DELETE") &&
        (t.old = wo(e.columns, e.old_record)),
      t
    );
  }
}
const Io = () => {};
class dl {
  constructor(e, t) {
    var r;
    ((this.accessTokenValue = null),
      (this.apiKey = null),
      (this.channels = new Array()),
      (this.endPoint = ""),
      (this.httpEndpoint = ""),
      (this.headers = {}),
      (this.params = {}),
      (this.timeout = 1e4),
      (this.heartbeatIntervalMs = 25e3),
      (this.heartbeatTimer = void 0),
      (this.pendingHeartbeatRef = null),
      (this.heartbeatCallback = Io),
      (this.ref = 0),
      (this.logger = Io),
      (this.conn = null),
      (this.sendBuffer = []),
      (this.serializer = new rl()),
      (this.stateChangeCallbacks = {
        open: [],
        close: [],
        error: [],
        message: [],
      }),
      (this.accessToken = null),
      (this._resolveFetch = (o) => {
        let n;
        return (
          (n =
            o ||
            (typeof fetch > "u"
              ? (...a) =>
                  ot(
                    async () => {
                      const { default: l } = await Promise.resolve().then(
                        () => er,
                      );
                      return { default: l };
                    },
                    void 0,
                  ).then(({ default: l }) => l(...a))
              : fetch)),
          (...a) => n(...a)
        );
      }),
      (this.endPoint = `${e}/${$i.websocket}`),
      (this.httpEndpoint = xo(e)),
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
    const s = (r = t?.params) === null || r === void 0 ? void 0 : r.apikey;
    if (
      (s && ((this.accessTokenValue = s), (this.apiKey = s)),
      (this.reconnectAfterMs =
        t != null && t.reconnectAfterMs
          ? t.reconnectAfterMs
          : (o) => [1e3, 2e3, 5e3, 1e4][o - 1] || 1e4),
      (this.encode =
        t != null && t.encode ? t.encode : (o, n) => n(JSON.stringify(o))),
      (this.decode =
        t != null && t.decode
          ? t.decode
          : this.serializer.decode.bind(this.serializer)),
      (this.reconnectTimer = new bo(async () => {
        (this.disconnect(), this.connect());
      }, this.reconnectAfterMs)),
      (this.fetch = this._resolveFetch(t?.fetch)),
      t != null && t.worker)
    ) {
      if (typeof window < "u" && !window.Worker)
        throw new Error("Web Worker is not supported");
      ((this.worker = t?.worker || !1), (this.workerUrl = t?.workerUrl));
    }
    this.accessToken = t?.accessToken || null;
  }
  connect() {
    if (!this.conn) {
      if ((this.transport || (this.transport = tl), !this.transport))
        throw new Error("No transport provided");
      ((this.conn = new this.transport(this.endpointURL())),
        this.setupConnection());
    }
  }
  endpointURL() {
    return this._appendParams(
      this.endPoint,
      Object.assign({}, this.params, { vsn: "1.0.0" }),
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
      case xr.connecting:
        return Mt.Connecting;
      case xr.open:
        return Mt.Open;
      case xr.closing:
        return Mt.Closing;
      default:
        return Mt.Closed;
    }
  }
  isConnected() {
    return this.connectionState() === Mt.Open;
  }
  channel(e, t = { config: {} }) {
    const r = `realtime:${e}`,
      s = this.getChannels().find((o) => o.topic === r);
    if (s) return s;
    {
      const o = new Qi(`realtime:${e}`, t, this);
      return (this.channels.push(o), o);
    }
  }
  push(e) {
    const { topic: t, event: r, payload: s, ref: o } = e,
      n = () => {
        this.encode(e, (a) => {
          var l;
          (l = this.conn) === null || l === void 0 || l.send(a);
        });
      };
    (this.log("push", `${t} ${r} (${o})`, s),
      this.isConnected() ? n() : this.sendBuffer.push(n));
  }
  async setAuth(e = null) {
    let t =
      e ||
      (this.accessToken && (await this.accessToken())) ||
      this.accessTokenValue;
    this.accessTokenValue != t &&
      ((this.accessTokenValue = t),
      this.channels.forEach((r) => {
        const s = { access_token: t, version: "realtime-js/2.11.15" };
        (t && r.updateJoinPayload(s),
          r.joinedOnce &&
            r._isJoined() &&
            r._push(pt.access_token, { access_token: t }));
      }));
  }
  async sendHeartbeat() {
    var e;
    if (this.isConnected())
      return this.pendingHeartbeatRef
        ? ((this.pendingHeartbeatRef = null),
          this.log(
            "transport",
            "heartbeat timeout. Attempting to re-establish connection",
          ),
          this.heartbeatCallback("timeout"),
          void (
            (e = this.conn) === null ||
            e === void 0 ||
            e.close(1e3, "hearbeat timeout")
          ))
        : ((this.pendingHeartbeatRef = this._makeRef()),
          this.push({
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref: this.pendingHeartbeatRef,
          }),
          this.heartbeatCallback("sent"),
          void (await this.setAuth()));
    this.heartbeatCallback("disconnected");
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
      let { topic: r, event: s, payload: o, ref: n } = t;
      (r === "phoenix" &&
        s === "phx_reply" &&
        this.heartbeatCallback(t.payload.status == "ok" ? "ok" : "error"),
        n &&
          n === this.pendingHeartbeatRef &&
          (this.pendingHeartbeatRef = null),
        this.log(
          "receive",
          `${o.status || ""} ${r} ${s} ${(n && "(" + n + ")") || ""}`,
          o,
        ),
        Array.from(this.channels)
          .filter((a) => a._isMember(r))
          .forEach((a) => a._trigger(s, o, n)),
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
    this.channels.forEach((e) => e._trigger(pt.error));
  }
  _appendParams(e, t) {
    if (Object.keys(t).length === 0) return e;
    const r = e.match(/\?/) ? "&" : "?";
    return `${e}${r}${new URLSearchParams(t)}`;
  }
  _workerObjectUrl(e) {
    let t;
    if (e) t = e;
    else {
      const r = new Blob(
        [
          `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`,
        ],
        { type: "application/javascript" },
      );
      t = URL.createObjectURL(r);
    }
    return t;
  }
}
class Mi extends Error {
  constructor(e) {
    (super(e), (this.__isStorageError = !0), (this.name = "StorageError"));
  }
}
function Be(i) {
  return typeof i == "object" && i !== null && "__isStorageError" in i;
}
class cl extends Mi {
  constructor(e, t) {
    (super(e), (this.name = "StorageApiError"), (this.status = t));
  }
  toJSON() {
    return { name: this.name, message: this.message, status: this.status };
  }
}
class Fi extends Mi {
  constructor(e, t) {
    (super(e), (this.name = "StorageUnknownError"), (this.originalError = t));
  }
}
const To = (i) => {
    let e;
    return (
      (e =
        i ||
        (typeof fetch > "u"
          ? (...t) =>
              ot(
                async () => {
                  const { default: r } = await Promise.resolve().then(() => er);
                  return { default: r };
                },
                void 0,
              ).then(({ default: r }) => r(...t))
          : fetch)),
      (...t) => e(...t)
    );
  },
  Li = (i) => {
    if (Array.isArray(i)) return i.map((t) => Li(t));
    if (typeof i == "function" || i !== Object(i)) return i;
    const e = {};
    return (
      Object.entries(i).forEach(([t, r]) => {
        const s = t.replace(/([-_][a-z])/gi, (o) =>
          o.toUpperCase().replace(/[-_]/g, ""),
        );
        e[s] = Li(r);
      }),
      e
    );
  };
var Ft = function (i, e, t, r) {
  return new (t || (t = Promise))(function (s, o) {
    function n(c) {
      try {
        l(r.next(c));
      } catch (m) {
        o(m);
      }
    }
    function a(c) {
      try {
        l(r.throw(c));
      } catch (m) {
        o(m);
      }
    }
    function l(c) {
      c.done
        ? s(c.value)
        : (function (m) {
            return m instanceof t
              ? m
              : new t(function (f) {
                  f(m);
                });
          })(c.value).then(n, a);
    }
    l((r = r.apply(i, e || [])).next());
  });
};
const Ui = (i) =>
    i.msg || i.message || i.error_description || i.error || JSON.stringify(i),
  ul = (i, e, t) =>
    Ft(void 0, void 0, void 0, function* () {
      const r = yield (function (s, o, n, a) {
        return new (n || (n = Promise))(function (l, c) {
          function m(v) {
            try {
              p(a.next(v));
            } catch (T) {
              c(T);
            }
          }
          function f(v) {
            try {
              p(a.throw(v));
            } catch (T) {
              c(T);
            }
          }
          function p(v) {
            v.done
              ? l(v.value)
              : (function (T) {
                  return T instanceof n
                    ? T
                    : new n(function (P) {
                        P(T);
                      });
                })(v.value).then(m, f);
          }
          p((a = a.apply(s, o || [])).next());
        });
      })(void 0, void 0, void 0, function* () {
        return typeof Response > "u"
          ? (yield ot(() => Promise.resolve().then(() => er), void 0)).Response
          : Response;
      });
      i instanceof r && (t == null || !t.noResolveJson)
        ? i
            .json()
            .then((s) => {
              e(new cl(Ui(s), i.status || 500));
            })
            .catch((s) => {
              e(new Fi(Ui(s), s));
            })
        : e(new Fi(Ui(i), i));
    });
function Cr(i, e, t, r, s, o) {
  return Ft(this, void 0, void 0, function* () {
    return new Promise((n, a) => {
      i(
        t,
        ((l, c, m, f) => {
          const p = { method: l, headers: c?.headers || {} };
          return l === "GET"
            ? p
            : ((p.headers = Object.assign(
                { "Content-Type": "application/json" },
                c?.headers,
              )),
              f && (p.body = JSON.stringify(f)),
              Object.assign(Object.assign({}, p), m));
        })(e, r, s, o),
      )
        .then((l) => {
          if (!l.ok) throw l;
          return r != null && r.noResolveJson ? l : l.json();
        })
        .then((l) => n(l))
        .catch((l) => ul(l, a, r));
    });
  });
}
function Yr(i, e, t, r) {
  return Ft(this, void 0, void 0, function* () {
    return Cr(i, "GET", e, t, r);
  });
}
function Nt(i, e, t, r, s) {
  return Ft(this, void 0, void 0, function* () {
    return Cr(i, "POST", e, r, s, t);
  });
}
function hl(i, e, t, r, s) {
  return Ft(this, void 0, void 0, function* () {
    return Cr(i, "PUT", e, r, s, t);
  });
}
function Eo(i, e, t, r, s) {
  return Ft(this, void 0, void 0, function* () {
    return Cr(i, "DELETE", e, r, s, t);
  });
}
var tt = function (i, e, t, r) {
  return new (t || (t = Promise))(function (s, o) {
    function n(c) {
      try {
        l(r.next(c));
      } catch (m) {
        o(m);
      }
    }
    function a(c) {
      try {
        l(r.throw(c));
      } catch (m) {
        o(m);
      }
    }
    function l(c) {
      c.done
        ? s(c.value)
        : (function (m) {
            return m instanceof t
              ? m
              : new t(function (f) {
                  f(m);
                });
          })(c.value).then(n, a);
    }
    l((r = r.apply(i, e || [])).next());
  });
};
const ml = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } },
  jo = {
    cacheControl: "3600",
    contentType: "text/plain;charset=UTF-8",
    upsert: !1,
  };
class pl {
  constructor(e, t = {}, r, s) {
    ((this.url = e),
      (this.headers = t),
      (this.bucketId = r),
      (this.fetch = To(s)));
  }
  uploadOrUpdate(e, t, r, s) {
    return tt(this, void 0, void 0, function* () {
      try {
        let o;
        const n = Object.assign(Object.assign({}, jo), s);
        let a = Object.assign(
          Object.assign({}, this.headers),
          e === "POST" && { "x-upsert": String(n.upsert) },
        );
        const l = n.metadata;
        (typeof Blob < "u" && r instanceof Blob
          ? ((o = new FormData()),
            o.append("cacheControl", n.cacheControl),
            l && o.append("metadata", this.encodeMetadata(l)),
            o.append("", r))
          : typeof FormData < "u" && r instanceof FormData
            ? ((o = r),
              o.append("cacheControl", n.cacheControl),
              l && o.append("metadata", this.encodeMetadata(l)))
            : ((o = r),
              (a["cache-control"] = `max-age=${n.cacheControl}`),
              (a["content-type"] = n.contentType),
              l && (a["x-metadata"] = this.toBase64(this.encodeMetadata(l)))),
          s != null &&
            s.headers &&
            (a = Object.assign(Object.assign({}, a), s.headers)));
        const c = this._removeEmptyFolders(t),
          m = this._getFinalPath(c),
          f = yield this.fetch(
            `${this.url}/object/${m}`,
            Object.assign(
              { method: e, body: o, headers: a },
              n != null && n.duplex ? { duplex: n.duplex } : {},
            ),
          ),
          p = yield f.json();
        return f.ok
          ? { data: { path: c, id: p.Id, fullPath: p.Key }, error: null }
          : { data: null, error: p };
      } catch (o) {
        if (Be(o)) return { data: null, error: o };
        throw o;
      }
    });
  }
  upload(e, t, r) {
    return tt(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", e, t, r);
    });
  }
  uploadToSignedUrl(e, t, r, s) {
    return tt(this, void 0, void 0, function* () {
      const o = this._removeEmptyFolders(e),
        n = this._getFinalPath(o),
        a = new URL(this.url + `/object/upload/sign/${n}`);
      a.searchParams.set("token", t);
      try {
        let l;
        const c = Object.assign({ upsert: jo.upsert }, s),
          m = Object.assign(Object.assign({}, this.headers), {
            "x-upsert": String(c.upsert),
          });
        typeof Blob < "u" && r instanceof Blob
          ? ((l = new FormData()),
            l.append("cacheControl", c.cacheControl),
            l.append("", r))
          : typeof FormData < "u" && r instanceof FormData
            ? ((l = r), l.append("cacheControl", c.cacheControl))
            : ((l = r),
              (m["cache-control"] = `max-age=${c.cacheControl}`),
              (m["content-type"] = c.contentType));
        const f = yield this.fetch(a.toString(), {
            method: "PUT",
            body: l,
            headers: m,
          }),
          p = yield f.json();
        return f.ok
          ? { data: { path: o, fullPath: p.Key }, error: null }
          : { data: null, error: p };
      } catch (l) {
        if (Be(l)) return { data: null, error: l };
        throw l;
      }
    });
  }
  createSignedUploadUrl(e, t) {
    return tt(this, void 0, void 0, function* () {
      try {
        let r = this._getFinalPath(e);
        const s = Object.assign({}, this.headers);
        t != null && t.upsert && (s["x-upsert"] = "true");
        const o = yield Nt(
            this.fetch,
            `${this.url}/object/upload/sign/${r}`,
            {},
            { headers: s },
          ),
          n = new URL(this.url + o.url),
          a = n.searchParams.get("token");
        if (!a) throw new Mi("No token returned by API");
        return {
          data: { signedUrl: n.toString(), path: e, token: a },
          error: null,
        };
      } catch (r) {
        if (Be(r)) return { data: null, error: r };
        throw r;
      }
    });
  }
  update(e, t, r) {
    return tt(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("PUT", e, t, r);
    });
  }
  move(e, t, r) {
    return tt(this, void 0, void 0, function* () {
      try {
        return {
          data: yield Nt(
            this.fetch,
            `${this.url}/object/move`,
            {
              bucketId: this.bucketId,
              sourceKey: e,
              destinationKey: t,
              destinationBucket: r?.destinationBucket,
            },
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (s) {
        if (Be(s)) return { data: null, error: s };
        throw s;
      }
    });
  }
  copy(e, t, r) {
    return tt(this, void 0, void 0, function* () {
      try {
        return {
          data: {
            path: (yield Nt(
              this.fetch,
              `${this.url}/object/copy`,
              {
                bucketId: this.bucketId,
                sourceKey: e,
                destinationKey: t,
                destinationBucket: r?.destinationBucket,
              },
              { headers: this.headers },
            )).Key,
          },
          error: null,
        };
      } catch (s) {
        if (Be(s)) return { data: null, error: s };
        throw s;
      }
    });
  }
  createSignedUrl(e, t, r) {
    return tt(this, void 0, void 0, function* () {
      try {
        let s = this._getFinalPath(e),
          o = yield Nt(
            this.fetch,
            `${this.url}/object/sign/${s}`,
            Object.assign(
              { expiresIn: t },
              r != null && r.transform ? { transform: r.transform } : {},
            ),
            { headers: this.headers },
          );
        const n =
          r != null && r.download
            ? `&download=${r.download === !0 ? "" : r.download}`
            : "";
        return (
          (o = { signedUrl: encodeURI(`${this.url}${o.signedURL}${n}`) }),
          { data: o, error: null }
        );
      } catch (s) {
        if (Be(s)) return { data: null, error: s };
        throw s;
      }
    });
  }
  createSignedUrls(e, t, r) {
    return tt(this, void 0, void 0, function* () {
      try {
        const s = yield Nt(
            this.fetch,
            `${this.url}/object/sign/${this.bucketId}`,
            { expiresIn: t, paths: e },
            { headers: this.headers },
          ),
          o =
            r != null && r.download
              ? `&download=${r.download === !0 ? "" : r.download}`
              : "";
        return {
          data: s.map((n) =>
            Object.assign(Object.assign({}, n), {
              signedUrl: n.signedURL
                ? encodeURI(`${this.url}${n.signedURL}${o}`)
                : null,
            }),
          ),
          error: null,
        };
      } catch (s) {
        if (Be(s)) return { data: null, error: s };
        throw s;
      }
    });
  }
  download(e, t) {
    return tt(this, void 0, void 0, function* () {
      const r =
          typeof t?.transform < "u" ? "render/image/authenticated" : "object",
        s = this.transformOptsToQueryString(t?.transform || {}),
        o = s ? `?${s}` : "";
      try {
        const n = this._getFinalPath(e);
        return {
          data: yield (yield Yr(this.fetch, `${this.url}/${r}/${n}${o}`, {
            headers: this.headers,
            noResolveJson: !0,
          })).blob(),
          error: null,
        };
      } catch (n) {
        if (Be(n)) return { data: null, error: n };
        throw n;
      }
    });
  }
  info(e) {
    return tt(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        const r = yield Yr(this.fetch, `${this.url}/object/info/${t}`, {
          headers: this.headers,
        });
        return { data: Li(r), error: null };
      } catch (r) {
        if (Be(r)) return { data: null, error: r };
        throw r;
      }
    });
  }
  exists(e) {
    return tt(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        return (
          yield (function (r, s, o) {
            return Ft(this, void 0, void 0, function* () {
              return Cr(
                r,
                "HEAD",
                s,
                Object.assign(Object.assign({}, o), { noResolveJson: !0 }),
                void 0,
              );
            });
          })(this.fetch, `${this.url}/object/${t}`, { headers: this.headers }),
          { data: !0, error: null }
        );
      } catch (r) {
        if (Be(r) && r instanceof Fi) {
          const s = r.originalError;
          if ([400, 404].includes(s?.status)) return { data: !1, error: r };
        }
        throw r;
      }
    });
  }
  getPublicUrl(e, t) {
    const r = this._getFinalPath(e),
      s = [],
      o =
        t != null && t.download
          ? `download=${t.download === !0 ? "" : t.download}`
          : "";
    o !== "" && s.push(o);
    const n = typeof t?.transform < "u" ? "render/image" : "object",
      a = this.transformOptsToQueryString(t?.transform || {});
    a !== "" && s.push(a);
    let l = s.join("&");
    return (
      l !== "" && (l = `?${l}`),
      { data: { publicUrl: encodeURI(`${this.url}/${n}/public/${r}${l}`) } }
    );
  }
  remove(e) {
    return tt(this, void 0, void 0, function* () {
      try {
        return {
          data: yield Eo(
            this.fetch,
            `${this.url}/object/${this.bucketId}`,
            { prefixes: e },
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (t) {
        if (Be(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  list(e, t, r) {
    return tt(this, void 0, void 0, function* () {
      try {
        const s = Object.assign(Object.assign(Object.assign({}, ml), t), {
          prefix: e || "",
        });
        return {
          data: yield Nt(
            this.fetch,
            `${this.url}/object/list/${this.bucketId}`,
            s,
            { headers: this.headers },
            r,
          ),
          error: null,
        };
      } catch (s) {
        if (Be(s)) return { data: null, error: s };
        throw s;
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
const gl = { "X-Client-Info": "storage-js/2.7.1" };
var tr = function (i, e, t, r) {
  return new (t || (t = Promise))(function (s, o) {
    function n(c) {
      try {
        l(r.next(c));
      } catch (m) {
        o(m);
      }
    }
    function a(c) {
      try {
        l(r.throw(c));
      } catch (m) {
        o(m);
      }
    }
    function l(c) {
      c.done
        ? s(c.value)
        : (function (m) {
            return m instanceof t
              ? m
              : new t(function (f) {
                  f(m);
                });
          })(c.value).then(n, a);
    }
    l((r = r.apply(i, e || [])).next());
  });
};
class fl {
  constructor(e, t = {}, r) {
    ((this.url = e),
      (this.headers = Object.assign(Object.assign({}, gl), t)),
      (this.fetch = To(r)));
  }
  listBuckets() {
    return tr(this, void 0, void 0, function* () {
      try {
        return {
          data: yield Yr(this.fetch, `${this.url}/bucket`, {
            headers: this.headers,
          }),
          error: null,
        };
      } catch (e) {
        if (Be(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  getBucket(e) {
    return tr(this, void 0, void 0, function* () {
      try {
        return {
          data: yield Yr(this.fetch, `${this.url}/bucket/${e}`, {
            headers: this.headers,
          }),
          error: null,
        };
      } catch (t) {
        if (Be(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  createBucket(e, t = { public: !1 }) {
    return tr(this, void 0, void 0, function* () {
      try {
        return {
          data: yield Nt(
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
        if (Be(r)) return { data: null, error: r };
        throw r;
      }
    });
  }
  updateBucket(e, t) {
    return tr(this, void 0, void 0, function* () {
      try {
        return {
          data: yield hl(
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
        if (Be(r)) return { data: null, error: r };
        throw r;
      }
    });
  }
  emptyBucket(e) {
    return tr(this, void 0, void 0, function* () {
      try {
        return {
          data: yield Nt(
            this.fetch,
            `${this.url}/bucket/${e}/empty`,
            {},
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (t) {
        if (Be(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  deleteBucket(e) {
    return tr(this, void 0, void 0, function* () {
      try {
        return {
          data: yield Eo(
            this.fetch,
            `${this.url}/bucket/${e}`,
            {},
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (t) {
        if (Be(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
}
class yl extends fl {
  constructor(e, t = {}, r) {
    super(e, t, r);
  }
  from(e) {
    return new pl(this.url, this.headers, e, this.fetch);
  }
}
let No = "";
No =
  typeof Deno < "u"
    ? "deno"
    : typeof document < "u"
      ? "web"
      : typeof navigator < "u" && navigator.product === "ReactNative"
        ? "react-native"
        : "node";
const bl = { headers: { "X-Client-Info": `supabase-js-${No}/2.50.5` } },
  wl = { schema: "public" },
  vl = {
    autoRefreshToken: !0,
    persistSession: !0,
    detectSessionInUrl: !0,
    flowType: "implicit",
  },
  _l = {},
  xl = (i, e, t) => {
    const r = ((o) => {
        let n;
        return (
          (n = o || (typeof fetch > "u" ? ro : fetch)),
          (...a) => n(...a)
        );
      })(t),
      s = typeof Headers > "u" ? io : Headers;
    return (o, n) =>
      (function (a, l, c, m) {
        return new (c || (c = Promise))(function (f, p) {
          function v(N) {
            try {
              P(m.next(N));
            } catch (D) {
              p(D);
            }
          }
          function T(N) {
            try {
              P(m.throw(N));
            } catch (D) {
              p(D);
            }
          }
          function P(N) {
            N.done
              ? f(N.value)
              : (function (D) {
                  return D instanceof c
                    ? D
                    : new c(function (A) {
                        A(D);
                      });
                })(N.value).then(v, T);
          }
          P((m = m.apply(a, l || [])).next());
        });
      })(void 0, void 0, void 0, function* () {
        var a;
        const l = (a = yield e()) !== null && a !== void 0 ? a : i;
        let c = new s(n?.headers);
        return (
          c.has("apikey") || c.set("apikey", i),
          c.has("Authorization") || c.set("Authorization", `Bearer ${l}`),
          r(o, Object.assign(Object.assign({}, n), { headers: c }))
        );
      });
  },
  Oo = "2.70.0",
  Sr = 3e4,
  Po = 3 * Sr,
  Cl = { "X-Client-Info": `gotrue-js/${Oo}` },
  qi = "X-Supabase-Api-Version",
  Sl = Date.parse("2024-01-01T00:00:00.0Z"),
  kl = "2024-01-01",
  Il = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
class Bi extends Error {
  constructor(e, t, r) {
    (super(e),
      (this.__isAuthError = !0),
      (this.name = "AuthError"),
      (this.status = t),
      (this.code = r));
  }
}
function le(i) {
  return typeof i == "object" && i !== null && "__isAuthError" in i;
}
class Tl extends Bi {
  constructor(e, t, r) {
    (super(e, t, r),
      (this.name = "AuthApiError"),
      (this.status = t),
      (this.code = r));
  }
}
class Do extends Bi {
  constructor(e, t) {
    (super(e), (this.name = "AuthUnknownError"), (this.originalError = t));
  }
}
class Ot extends Bi {
  constructor(e, t, r, s) {
    (super(e, r, s), (this.name = t), (this.status = r));
  }
}
class Pt extends Ot {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
  }
}
class Xr extends Ot {
  constructor() {
    super(
      "Auth session or user missing",
      "AuthInvalidTokenResponseError",
      500,
      void 0,
    );
  }
}
class Zr extends Ot {
  constructor(e) {
    super(e, "AuthInvalidCredentialsError", 400, void 0);
  }
}
class ei extends Ot {
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
class Ao extends Ot {
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
class zi extends Ot {
  constructor(e, t) {
    super(e, "AuthRetryableFetchError", t, void 0);
  }
}
function Vi(i) {
  return le(i) && i.name === "AuthRetryableFetchError";
}
class $o extends Ot {
  constructor(e, t, r) {
    (super(e, "AuthWeakPasswordError", t, "weak_password"), (this.reasons = r));
  }
}
class kr extends Ot {
  constructor(e) {
    super(e, "AuthInvalidJwtError", 400, "invalid_jwt");
  }
}
const ti =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(
      "",
    ),
  Ro = ` 	
\r=`.split(""),
  El = (() => {
    const i = new Array(128);
    for (let e = 0; e < i.length; e += 1) i[e] = -1;
    for (let e = 0; e < Ro.length; e += 1) i[Ro[e].charCodeAt(0)] = -2;
    for (let e = 0; e < ti.length; e += 1) i[ti[e].charCodeAt(0)] = e;
    return i;
  })();
function Mo(i, e, t) {
  if (i !== null)
    for (e.queue = (e.queue << 8) | i, e.queuedBits += 8; e.queuedBits >= 6; ) {
      const r = (e.queue >> (e.queuedBits - 6)) & 63;
      (t(ti[r]), (e.queuedBits -= 6));
    }
  else if (e.queuedBits > 0)
    for (
      e.queue = e.queue << (6 - e.queuedBits), e.queuedBits = 6;
      e.queuedBits >= 6;
    ) {
      const r = (e.queue >> (e.queuedBits - 6)) & 63;
      (t(ti[r]), (e.queuedBits -= 6));
    }
}
function Fo(i, e, t) {
  const r = El[i];
  if (!(r > -1)) {
    if (r === -2) return;
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(i)}"`);
  }
  for (e.queue = (e.queue << 6) | r, e.queuedBits += 6; e.queuedBits >= 8; )
    (t((e.queue >> (e.queuedBits - 8)) & 255), (e.queuedBits -= 8));
}
function Lo(i) {
  const e = [],
    t = (n) => {
      e.push(String.fromCodePoint(n));
    },
    r = { utf8seq: 0, codepoint: 0 },
    s = { queue: 0, queuedBits: 0 },
    o = (n) => {
      (function (a, l, c) {
        if (l.utf8seq === 0) {
          if (a <= 127) return void c(a);
          for (let m = 1; m < 6; m += 1)
            if (!((a >> (7 - m)) & 1)) {
              l.utf8seq = m;
              break;
            }
          if (l.utf8seq === 2) l.codepoint = 31 & a;
          else if (l.utf8seq === 3) l.codepoint = 15 & a;
          else {
            if (l.utf8seq !== 4) throw new Error("Invalid UTF-8 sequence");
            l.codepoint = 7 & a;
          }
          l.utf8seq -= 1;
        } else if (l.utf8seq > 0) {
          if (a <= 127) throw new Error("Invalid UTF-8 sequence");
          ((l.codepoint = (l.codepoint << 6) | (63 & a)),
            (l.utf8seq -= 1),
            l.utf8seq === 0 && c(l.codepoint));
        }
      })(n, r, t);
    };
  for (let n = 0; n < i.length; n += 1) Fo(i.charCodeAt(n), s, o);
  return e.join("");
}
function jl(i, e) {
  if (!(i <= 127)) {
    if (i <= 2047) return (e(192 | (i >> 6)), void e(128 | (63 & i)));
    if (i <= 65535)
      return (
        e(224 | (i >> 12)),
        e(128 | ((i >> 6) & 63)),
        void e(128 | (63 & i))
      );
    if (i <= 1114111)
      return (
        e(240 | (i >> 18)),
        e(128 | ((i >> 12) & 63)),
        e(128 | ((i >> 6) & 63)),
        void e(128 | (63 & i))
      );
    throw new Error(`Unrecognized Unicode codepoint: ${i.toString(16)}`);
  }
  e(i);
}
function Nl(i) {
  const e = [],
    t = { queue: 0, queuedBits: 0 },
    r = (s) => {
      e.push(s);
    };
  for (let s = 0; s < i.length; s += 1) Fo(i.charCodeAt(s), t, r);
  return new Uint8Array(e);
}
function Ol(i) {
  const e = [],
    t = { queue: 0, queuedBits: 0 },
    r = (s) => {
      e.push(s);
    };
  return (i.forEach((s) => Mo(s, t, r)), Mo(null, t, r), e.join(""));
}
const gt = () => typeof window < "u" && typeof document < "u",
  Lt = { tested: !1, writable: !1 },
  Ir = () => {
    if (!gt()) return !1;
    try {
      if (typeof globalThis.localStorage != "object") return !1;
    } catch {
      return !1;
    }
    if (Lt.tested) return Lt.writable;
    const i = `lswt-${Math.random()}${Math.random()}`;
    try {
      (globalThis.localStorage.setItem(i, i),
        globalThis.localStorage.removeItem(i),
        (Lt.tested = !0),
        (Lt.writable = !0));
    } catch {
      ((Lt.tested = !0), (Lt.writable = !1));
    }
    return Lt.writable;
  },
  Uo = (i) => {
    let e;
    return (
      (e =
        i ||
        (typeof fetch > "u"
          ? (...t) =>
              ot(
                async () => {
                  const { default: r } = await Promise.resolve().then(() => er);
                  return { default: r };
                },
                void 0,
              ).then(({ default: r }) => r(...t))
          : fetch)),
      (...t) => e(...t)
    );
  },
  qo = async (i, e, t) => {
    await i.setItem(e, JSON.stringify(t));
  },
  ri = async (i, e) => {
    const t = await i.getItem(e);
    if (!t) return null;
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
  },
  ii = async (i, e) => {
    await i.removeItem(e);
  };
class ni {
  constructor() {
    this.promise = new ni.promiseConstructor((e, t) => {
      ((this.resolve = e), (this.reject = t));
    });
  }
}
function Hi(i) {
  const e = i.split(".");
  if (e.length !== 3) throw new kr("Invalid JWT structure");
  for (let t = 0; t < e.length; t++)
    if (!Il.test(e[t])) throw new kr("JWT not in base64url format");
  return {
    header: JSON.parse(Lo(e[0])),
    payload: JSON.parse(Lo(e[1])),
    signature: Nl(e[2]),
    raw: { header: e[0], payload: e[1] },
  };
}
function Pl(i) {
  return ("0" + i.toString(16)).substr(-2);
}
async function rr(i, e, t = !1) {
  const r = (function () {
    const n = new Uint32Array(56);
    if (typeof crypto > "u") {
      const a =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",
        l = a.length;
      let c = "";
      for (let m = 0; m < 56; m++) c += a.charAt(Math.floor(Math.random() * l));
      return c;
    }
    return (crypto.getRandomValues(n), Array.from(n, Pl).join(""));
  })();
  let s = r;
  (t && (s += "/PASSWORD_RECOVERY"), await qo(i, `${e}-code-verifier`, s));
  const o = await (async function (n) {
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
        n
      );
    const a = await (async function (l) {
      const c = new TextEncoder().encode(l),
        m = await crypto.subtle.digest("SHA-256", c),
        f = new Uint8Array(m);
      return Array.from(f)
        .map((p) => String.fromCharCode(p))
        .join("");
    })(n);
    return btoa(a).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  })(r);
  return [o, r === o ? "plain" : "s256"];
}
ni.promiseConstructor = Promise;
const Dl = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i,
  Al = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function ir(i) {
  if (!Al.test(i))
    throw new Error(
      "@supabase/auth-js: Expected parameter to be UUID but is not",
    );
}
const Ut = (i) =>
    i.msg || i.message || i.error_description || i.error || JSON.stringify(i),
  $l = [502, 503, 504];
async function Bo(i) {
  var e;
  if (
    !((o) =>
      typeof o == "object" &&
      o !== null &&
      "status" in o &&
      "ok" in o &&
      "json" in o &&
      typeof o.json == "function")(i)
  )
    throw new zi(Ut(i), 0);
  if ($l.includes(i.status)) throw new zi(Ut(i), i.status);
  let t, r;
  try {
    t = await i.json();
  } catch (o) {
    throw new Do(Ut(o), o);
  }
  const s = (function (o) {
    const n = o.headers.get(qi);
    if (!n || !n.match(Dl)) return null;
    try {
      return new Date(`${n}T00:00:00.0Z`);
    } catch {
      return null;
    }
  })(i);
  if (
    (s &&
    s.getTime() >= Sl &&
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
      throw new $o(
        Ut(t),
        i.status,
        ((e = t.weak_password) === null || e === void 0 ? void 0 : e.reasons) ||
          [],
      );
    if (r === "session_not_found") throw new Pt();
  } else if (
    typeof t == "object" &&
    t &&
    typeof t.weak_password == "object" &&
    t.weak_password &&
    Array.isArray(t.weak_password.reasons) &&
    t.weak_password.reasons.length &&
    t.weak_password.reasons.reduce((o, n) => o && typeof n == "string", !0)
  )
    throw new $o(Ut(t), i.status, t.weak_password.reasons);
  throw new Tl(Ut(t), i.status || 500, r);
}
async function pe(i, e, t, r) {
  var s;
  const o = Object.assign({}, r?.headers);
  (o[qi] || (o[qi] = kl),
    r != null && r.jwt && (o.Authorization = `Bearer ${r.jwt}`));
  const n = (s = r?.query) !== null && s !== void 0 ? s : {};
  r != null && r.redirectTo && (n.redirect_to = r.redirectTo);
  const a = Object.keys(n).length
      ? "?" + new URLSearchParams(n).toString()
      : "",
    l = await (async function (c, m, f, p, v, T) {
      const P = ((D, A, O, j) => {
        const W = { method: D, headers: A?.headers || {} };
        return D === "GET"
          ? W
          : ((W.headers = Object.assign(
              { "Content-Type": "application/json;charset=UTF-8" },
              A?.headers,
            )),
            (W.body = JSON.stringify(j)),
            Object.assign(Object.assign({}, W), O));
      })(m, p, {}, T);
      let N;
      try {
        N = await c(f, Object.assign({}, P));
      } catch (D) {
        throw (console.error(D), new zi(Ut(D), 0));
      }
      if ((N.ok || (await Bo(N)), p != null && p.noResolveJson)) return N;
      try {
        return await N.json();
      } catch (D) {
        await Bo(D);
      }
    })(
      i,
      e,
      t + a,
      { headers: o, noResolveJson: r?.noResolveJson },
      0,
      r?.body,
    );
  return r != null && r.xform
    ? r?.xform(l)
    : { data: Object.assign({}, l), error: null };
}
function St(i) {
  var e;
  let t = null;
  return (
    (function (r) {
      return r.access_token && r.refresh_token && r.expires_in;
    })(i) &&
      ((t = Object.assign({}, i)),
      i.expires_at ||
        (t.expires_at = (function (r) {
          return Math.round(Date.now() / 1e3) + r;
        })(i.expires_in))),
    {
      data: { session: t, user: (e = i.user) !== null && e !== void 0 ? e : i },
      error: null,
    }
  );
}
function zo(i) {
  const e = St(i);
  return (
    !e.error &&
      i.weak_password &&
      typeof i.weak_password == "object" &&
      Array.isArray(i.weak_password.reasons) &&
      i.weak_password.reasons.length &&
      i.weak_password.message &&
      typeof i.weak_password.message == "string" &&
      i.weak_password.reasons.reduce((t, r) => t && typeof r == "string", !0) &&
      (e.data.weak_password = i.weak_password),
    e
  );
}
function Dt(i) {
  var e;
  return {
    data: { user: (e = i.user) !== null && e !== void 0 ? e : i },
    error: null,
  };
}
function Rl(i) {
  return { data: i, error: null };
}
function Ml(i) {
  const {
      action_link: e,
      email_otp: t,
      hashed_token: r,
      redirect_to: s,
      verification_type: o,
    } = i,
    n = (function (a, l) {
      var c = {};
      for (var m in a)
        Object.prototype.hasOwnProperty.call(a, m) &&
          l.indexOf(m) < 0 &&
          (c[m] = a[m]);
      if (a != null && typeof Object.getOwnPropertySymbols == "function") {
        var f = 0;
        for (m = Object.getOwnPropertySymbols(a); f < m.length; f++)
          l.indexOf(m[f]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(a, m[f]) &&
            (c[m[f]] = a[m[f]]);
      }
      return c;
    })(i, [
      "action_link",
      "email_otp",
      "hashed_token",
      "redirect_to",
      "verification_type",
    ]);
  return {
    data: {
      properties: {
        action_link: e,
        email_otp: t,
        hashed_token: r,
        redirect_to: s,
        verification_type: o,
      },
      user: Object.assign({}, n),
    },
    error: null,
  };
}
function Fl(i) {
  return i;
}
const Gi = ["global", "local", "others"];
class Ll {
  constructor({ url: e = "", headers: t = {}, fetch: r }) {
    ((this.url = e),
      (this.headers = t),
      (this.fetch = Uo(r)),
      (this.mfa = {
        listFactors: this._listFactors.bind(this),
        deleteFactor: this._deleteFactor.bind(this),
      }));
  }
  async signOut(e, t = Gi[0]) {
    if (Gi.indexOf(t) < 0)
      throw new Error(
        `@supabase/auth-js: Parameter scope must be one of ${Gi.join(", ")}`,
      );
    try {
      return (
        await pe(this.fetch, "POST", `${this.url}/logout?scope=${t}`, {
          headers: this.headers,
          jwt: e,
          noResolveJson: !0,
        }),
        { data: null, error: null }
      );
    } catch (r) {
      if (le(r)) return { data: null, error: r };
      throw r;
    }
  }
  async inviteUserByEmail(e, t = {}) {
    try {
      return await pe(this.fetch, "POST", `${this.url}/invite`, {
        body: { email: e, data: t.data },
        headers: this.headers,
        redirectTo: t.redirectTo,
        xform: Dt,
      });
    } catch (r) {
      if (le(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async generateLink(e) {
    try {
      const { options: t } = e,
        r = (function (o, n) {
          var a = {};
          for (var l in o)
            Object.prototype.hasOwnProperty.call(o, l) &&
              n.indexOf(l) < 0 &&
              (a[l] = o[l]);
          if (o != null && typeof Object.getOwnPropertySymbols == "function") {
            var c = 0;
            for (l = Object.getOwnPropertySymbols(o); c < l.length; c++)
              n.indexOf(l[c]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(o, l[c]) &&
                (a[l[c]] = o[l[c]]);
          }
          return a;
        })(e, ["options"]),
        s = Object.assign(Object.assign({}, r), t);
      return (
        "newEmail" in r && ((s.new_email = r?.newEmail), delete s.newEmail),
        await pe(this.fetch, "POST", `${this.url}/admin/generate_link`, {
          body: s,
          headers: this.headers,
          xform: Ml,
          redirectTo: t?.redirectTo,
        })
      );
    } catch (t) {
      if (le(t)) return { data: { properties: null, user: null }, error: t };
      throw t;
    }
  }
  async createUser(e) {
    try {
      return await pe(this.fetch, "POST", `${this.url}/admin/users`, {
        body: e,
        headers: this.headers,
        xform: Dt,
      });
    } catch (t) {
      if (le(t)) return { data: { user: null }, error: t };
      throw t;
    }
  }
  async listUsers(e) {
    var t, r, s, o, n, a, l;
    try {
      const c = { nextPage: null, lastPage: 0, total: 0 },
        m = await pe(this.fetch, "GET", `${this.url}/admin/users`, {
          headers: this.headers,
          noResolveJson: !0,
          query: {
            page:
              (r =
                (t = e?.page) === null || t === void 0
                  ? void 0
                  : t.toString()) !== null && r !== void 0
                ? r
                : "",
            per_page:
              (o =
                (s = e?.perPage) === null || s === void 0
                  ? void 0
                  : s.toString()) !== null && o !== void 0
                ? o
                : "",
          },
          xform: Fl,
        });
      if (m.error) throw m.error;
      const f = await m.json(),
        p =
          (n = m.headers.get("x-total-count")) !== null && n !== void 0 ? n : 0,
        v =
          (l =
            (a = m.headers.get("link")) === null || a === void 0
              ? void 0
              : a.split(",")) !== null && l !== void 0
            ? l
            : [];
      return (
        v.length > 0 &&
          (v.forEach((T) => {
            const P = parseInt(T.split(";")[0].split("=")[1].substring(0, 1)),
              N = JSON.parse(T.split(";")[1].split("=")[1]);
            c[`${N}Page`] = P;
          }),
          (c.total = parseInt(p))),
        { data: Object.assign(Object.assign({}, f), c), error: null }
      );
    } catch (c) {
      if (le(c)) return { data: { users: [] }, error: c };
      throw c;
    }
  }
  async getUserById(e) {
    ir(e);
    try {
      return await pe(this.fetch, "GET", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        xform: Dt,
      });
    } catch (t) {
      if (le(t)) return { data: { user: null }, error: t };
      throw t;
    }
  }
  async updateUserById(e, t) {
    ir(e);
    try {
      return await pe(this.fetch, "PUT", `${this.url}/admin/users/${e}`, {
        body: t,
        headers: this.headers,
        xform: Dt,
      });
    } catch (r) {
      if (le(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async deleteUser(e, t = !1) {
    ir(e);
    try {
      return await pe(this.fetch, "DELETE", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        body: { should_soft_delete: t },
        xform: Dt,
      });
    } catch (r) {
      if (le(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async _listFactors(e) {
    ir(e.userId);
    try {
      const { data: t, error: r } = await pe(
        this.fetch,
        "GET",
        `${this.url}/admin/users/${e.userId}/factors`,
        {
          headers: this.headers,
          xform: (s) => ({ data: { factors: s }, error: null }),
        },
      );
      return { data: t, error: r };
    } catch (t) {
      if (le(t)) return { data: null, error: t };
      throw t;
    }
  }
  async _deleteFactor(e) {
    (ir(e.userId), ir(e.id));
    try {
      return {
        data: await pe(
          this.fetch,
          "DELETE",
          `${this.url}/admin/users/${e.userId}/factors/${e.id}`,
          { headers: this.headers },
        ),
        error: null,
      };
    } catch (t) {
      if (le(t)) return { data: null, error: t };
      throw t;
    }
  }
}
const Ul = {
  getItem: (i) => (Ir() ? globalThis.localStorage.getItem(i) : null),
  setItem: (i, e) => {
    Ir() && globalThis.localStorage.setItem(i, e);
  },
  removeItem: (i) => {
    Ir() && globalThis.localStorage.removeItem(i);
  },
};
function Vo(i = {}) {
  return {
    getItem: (e) => i[e] || null,
    setItem: (e, t) => {
      i[e] = t;
    },
    removeItem: (e) => {
      delete i[e];
    },
  };
}
const sr = !!(
  globalThis &&
  Ir() &&
  globalThis.localStorage &&
  globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true"
);
class Ho extends Error {
  constructor(e) {
    (super(e), (this.isAcquireTimeout = !0));
  }
}
class ql extends Ho {}
async function Bl(i, e, t) {
  sr && Z("@supabase/gotrue-js: navigatorLock: acquire lock", i, e);
  const r = new globalThis.AbortController();
  return (
    e > 0 &&
      setTimeout(() => {
        (r.abort(),
          sr && Z("@supabase/gotrue-js: navigatorLock acquire timed out", i));
      }, e),
    await Promise.resolve().then(() =>
      globalThis.navigator.locks.request(
        i,
        e === 0
          ? { mode: "exclusive", ifAvailable: !0 }
          : { mode: "exclusive", signal: r.signal },
        async (s) => {
          if (!s) {
            if (e === 0)
              throw (
                sr &&
                  Z(
                    "@supabase/gotrue-js: navigatorLock: not immediately available",
                    i,
                  ),
                new ql(
                  `Acquiring an exclusive Navigator LockManager lock "${i}" immediately failed`,
                )
              );
            if (sr)
              try {
                const o = await globalThis.navigator.locks.query();
                Z(
                  "@supabase/gotrue-js: Navigator LockManager state",
                  JSON.stringify(o, null, "  "),
                );
              } catch (o) {
                console.warn(
                  "@supabase/gotrue-js: Error when querying Navigator LockManager state",
                  o,
                );
              }
            return (
              console.warn(
                "@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request",
              ),
              await t()
            );
          }
          sr && Z("@supabase/gotrue-js: navigatorLock: acquired", i, s.name);
          try {
            return await t();
          } finally {
            sr && Z("@supabase/gotrue-js: navigatorLock: released", i, s.name);
          }
        },
      ),
    )
  );
}
(function () {
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
})();
const zl = {
  url: "http://localhost:9999",
  storageKey: "supabase.auth.token",
  autoRefreshToken: !0,
  persistSession: !0,
  detectSessionInUrl: !0,
  headers: Cl,
  flowType: "implicit",
  debug: !1,
  hasCustomAuthorizationHeader: !1,
};
async function Go(i, e, t) {
  return await t();
}
class Pr {
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
      (this.instanceID = Pr.nextInstanceID),
      (Pr.nextInstanceID += 1),
      this.instanceID > 0 &&
        gt() &&
        console.warn(
          "Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.",
        ));
    const s = Object.assign(Object.assign({}, zl), e);
    if (
      ((this.logDebugMessages = !!s.debug),
      typeof s.debug == "function" && (this.logger = s.debug),
      (this.persistSession = s.persistSession),
      (this.storageKey = s.storageKey),
      (this.autoRefreshToken = s.autoRefreshToken),
      (this.admin = new Ll({ url: s.url, headers: s.headers, fetch: s.fetch })),
      (this.url = s.url),
      (this.headers = s.headers),
      (this.fetch = Uo(s.fetch)),
      (this.lock = s.lock || Go),
      (this.detectSessionInUrl = s.detectSessionInUrl),
      (this.flowType = s.flowType),
      (this.hasCustomAuthorizationHeader = s.hasCustomAuthorizationHeader),
      s.lock
        ? (this.lock = s.lock)
        : gt() &&
            (t = globalThis?.navigator) !== null &&
            t !== void 0 &&
            t.locks
          ? (this.lock = Bl)
          : (this.lock = Go),
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
        ? s.storage
          ? (this.storage = s.storage)
          : Ir()
            ? (this.storage = Ul)
            : ((this.memoryStorage = {}),
              (this.storage = Vo(this.memoryStorage)))
        : ((this.memoryStorage = {}), (this.storage = Vo(this.memoryStorage))),
      gt() &&
        globalThis.BroadcastChannel &&
        this.persistSession &&
        this.storageKey)
    ) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(
          this.storageKey,
        );
      } catch (o) {
        console.error(
          "Failed to create a new BroadcastChannel, multi-tab state changes will not be available",
          o,
        );
      }
      (r = this.broadcastChannel) === null ||
        r === void 0 ||
        r.addEventListener("message", async (o) => {
          (this._debug(
            "received broadcast notification from other tab or client",
            o,
          ),
            await this._notifyAllSubscribers(o.data.event, o.data.session, !1));
        });
    }
    this.initialize();
  }
  _debug(...e) {
    return (
      this.logDebugMessages &&
        this.logger(
          `GoTrueClient@${this.instanceID} (${Oo}) ${new Date().toISOString()}`,
          ...e,
        ),
      this
    );
  }
  async initialize() {
    return (
      this.initializePromise ||
        (this.initializePromise = (async () =>
          await this._acquireLock(-1, async () => await this._initialize()))()),
      await this.initializePromise
    );
  }
  async _initialize() {
    var e;
    try {
      const t = (function (s) {
        const o = {},
          n = new URL(s);
        if (n.hash && n.hash[0] === "#")
          try {
            new URLSearchParams(n.hash.substring(1)).forEach((a, l) => {
              o[l] = a;
            });
          } catch {}
        return (
          n.searchParams.forEach((a, l) => {
            o[l] = a;
          }),
          o
        );
      })(window.location.href);
      let r = "none";
      if (
        (this._isImplicitGrantCallback(t)
          ? (r = "implicit")
          : (await this._isPKCECallback(t)) && (r = "pkce"),
        gt() && this.detectSessionInUrl && r !== "none")
      ) {
        const { data: s, error: o } = await this._getSessionFromURL(t, r);
        if (o) {
          if (
            (this._debug(
              "#_initialize()",
              "error detecting session from URL",
              o,
            ),
            (function (l) {
              return le(l) && l.name === "AuthImplicitGrantRedirectError";
            })(o))
          ) {
            const l =
              (e = o.details) === null || e === void 0 ? void 0 : e.code;
            if (
              l === "identity_already_exists" ||
              l === "identity_not_found" ||
              l === "single_identity_not_deletable"
            )
              return { error: o };
          }
          return (await this._removeSession(), { error: o });
        }
        const { session: n, redirectType: a } = s;
        return (
          this._debug(
            "#_initialize()",
            "detected session in URL",
            n,
            "redirect type",
            a,
          ),
          await this._saveSession(n),
          setTimeout(async () => {
            a === "recovery"
              ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", n)
              : await this._notifyAllSubscribers("SIGNED_IN", n);
          }, 0),
          { error: null }
        );
      }
      return (await this._recoverAndRefresh(), { error: null });
    } catch (t) {
      return le(t)
        ? { error: t }
        : { error: new Do("Unexpected error during initialization", t) };
    } finally {
      (await this._handleVisibilityChange(),
        this._debug("#_initialize()", "end"));
    }
  }
  async signInAnonymously(e) {
    var t, r, s;
    try {
      const o = await pe(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            data:
              (r =
                (t = e?.options) === null || t === void 0 ? void 0 : t.data) !==
                null && r !== void 0
                ? r
                : {},
            gotrue_meta_security: {
              captcha_token:
                (s = e?.options) === null || s === void 0
                  ? void 0
                  : s.captchaToken,
            },
          },
          xform: St,
        }),
        { data: n, error: a } = o;
      if (a || !n) return { data: { user: null, session: null }, error: a };
      const l = n.session,
        c = n.user;
      return (
        n.session &&
          (await this._saveSession(n.session),
          await this._notifyAllSubscribers("SIGNED_IN", l)),
        { data: { user: c, session: l }, error: null }
      );
    } catch (o) {
      if (le(o)) return { data: { user: null, session: null }, error: o };
      throw o;
    }
  }
  async signUp(e) {
    var t, r, s;
    try {
      let o;
      if ("email" in e) {
        const { email: m, password: f, options: p } = e;
        let v = null,
          T = null;
        (this.flowType === "pkce" &&
          ([v, T] = await rr(this.storage, this.storageKey)),
          (o = await pe(this.fetch, "POST", `${this.url}/signup`, {
            headers: this.headers,
            redirectTo: p?.emailRedirectTo,
            body: {
              email: m,
              password: f,
              data: (t = p?.data) !== null && t !== void 0 ? t : {},
              gotrue_meta_security: { captcha_token: p?.captchaToken },
              code_challenge: v,
              code_challenge_method: T,
            },
            xform: St,
          })));
      } else {
        if (!("phone" in e))
          throw new Zr(
            "You must provide either an email or phone number and a password",
          );
        {
          const { phone: m, password: f, options: p } = e;
          o = await pe(this.fetch, "POST", `${this.url}/signup`, {
            headers: this.headers,
            body: {
              phone: m,
              password: f,
              data: (r = p?.data) !== null && r !== void 0 ? r : {},
              channel: (s = p?.channel) !== null && s !== void 0 ? s : "sms",
              gotrue_meta_security: { captcha_token: p?.captchaToken },
            },
            xform: St,
          });
        }
      }
      const { data: n, error: a } = o;
      if (a || !n) return { data: { user: null, session: null }, error: a };
      const l = n.session,
        c = n.user;
      return (
        n.session &&
          (await this._saveSession(n.session),
          await this._notifyAllSubscribers("SIGNED_IN", l)),
        { data: { user: c, session: l }, error: null }
      );
    } catch (o) {
      if (le(o)) return { data: { user: null, session: null }, error: o };
      throw o;
    }
  }
  async signInWithPassword(e) {
    try {
      let t;
      if ("email" in e) {
        const { email: o, password: n, options: a } = e;
        t = await pe(
          this.fetch,
          "POST",
          `${this.url}/token?grant_type=password`,
          {
            headers: this.headers,
            body: {
              email: o,
              password: n,
              gotrue_meta_security: { captcha_token: a?.captchaToken },
            },
            xform: zo,
          },
        );
      } else {
        if (!("phone" in e))
          throw new Zr(
            "You must provide either an email or phone number and a password",
          );
        {
          const { phone: o, password: n, options: a } = e;
          t = await pe(
            this.fetch,
            "POST",
            `${this.url}/token?grant_type=password`,
            {
              headers: this.headers,
              body: {
                phone: o,
                password: n,
                gotrue_meta_security: { captcha_token: a?.captchaToken },
              },
              xform: zo,
            },
          );
        }
      }
      const { data: r, error: s } = t;
      return s
        ? { data: { user: null, session: null }, error: s }
        : r && r.session && r.user
          ? (r.session &&
              (await this._saveSession(r.session),
              await this._notifyAllSubscribers("SIGNED_IN", r.session)),
            {
              data: Object.assign(
                { user: r.user, session: r.session },
                r.weak_password ? { weakPassword: r.weak_password } : null,
              ),
              error: s,
            })
          : { data: { user: null, session: null }, error: new Xr() };
    } catch (t) {
      if (le(t)) return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  async signInWithOAuth(e) {
    var t, r, s, o;
    return await this._handleProviderSignIn(e.provider, {
      redirectTo:
        (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo,
      scopes: (r = e.options) === null || r === void 0 ? void 0 : r.scopes,
      queryParams:
        (s = e.options) === null || s === void 0 ? void 0 : s.queryParams,
      skipBrowserRedirect:
        (o = e.options) === null || o === void 0
          ? void 0
          : o.skipBrowserRedirect,
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
    var t, r, s, o, n, a, l, c, m, f, p, v;
    let T, P;
    if ("message" in e) ((T = e.message), (P = e.signature));
    else {
      const { chain: N, wallet: D, statement: A, options: O } = e;
      let j;
      if (gt())
        if (typeof D == "object") j = D;
        else {
          const ee = window;
          if (
            !("solana" in ee) ||
            typeof ee.solana != "object" ||
            !(
              ("signIn" in ee.solana &&
                typeof ee.solana.signIn == "function") ||
              ("signMessage" in ee.solana &&
                typeof ee.solana.signMessage == "function")
            )
          )
            throw new Error(
              "@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.",
            );
          j = ee.solana;
        }
      else {
        if (typeof D != "object" || O == null || !O.url)
          throw new Error(
            "@supabase/auth-js: Both wallet and url must be specified in non-browser environments.",
          );
        j = D;
      }
      const W = new URL(
        (t = O?.url) !== null && t !== void 0 ? t : window.location.href,
      );
      if ("signIn" in j && j.signIn) {
        const ee = await j.signIn(
          Object.assign(
            Object.assign(
              Object.assign(
                { issuedAt: new Date().toISOString() },
                O?.signInWithSolana,
              ),
              { version: "1", domain: W.host, uri: W.href },
            ),
            A ? { statement: A } : null,
          ),
        );
        let ie;
        if (Array.isArray(ee) && ee[0] && typeof ee[0] == "object") ie = ee[0];
        else {
          if (
            !(
              ee &&
              typeof ee == "object" &&
              "signedMessage" in ee &&
              "signature" in ee
            )
          )
            throw new Error(
              "@supabase/auth-js: Wallet method signIn() returned unrecognized value",
            );
          ie = ee;
        }
        if (
          !(
            "signedMessage" in ie &&
            "signature" in ie &&
            (typeof ie.signedMessage == "string" ||
              ie.signedMessage instanceof Uint8Array) &&
            ie.signature instanceof Uint8Array
          )
        )
          throw new Error(
            "@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields",
          );
        ((T =
          typeof ie.signedMessage == "string"
            ? ie.signedMessage
            : new TextDecoder().decode(ie.signedMessage)),
          (P = ie.signature));
      } else {
        if (
          !(
            "signMessage" in j &&
            typeof j.signMessage == "function" &&
            "publicKey" in j &&
            typeof j == "object" &&
            j.publicKey &&
            "toBase58" in j.publicKey &&
            typeof j.publicKey.toBase58 == "function"
          )
        )
          throw new Error(
            "@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API",
          );
        T = [
          `${W.host} wants you to sign in with your Solana account:`,
          j.publicKey.toBase58(),
          ...(A ? ["", A, ""] : [""]),
          "Version: 1",
          `URI: ${W.href}`,
          `Issued At: ${(s = (r = O?.signInWithSolana) === null || r === void 0 ? void 0 : r.issuedAt) !== null && s !== void 0 ? s : new Date().toISOString()}`,
          ...((o = O?.signInWithSolana) !== null && o !== void 0 && o.notBefore
            ? [`Not Before: ${O.signInWithSolana.notBefore}`]
            : []),
          ...((n = O?.signInWithSolana) !== null &&
          n !== void 0 &&
          n.expirationTime
            ? [`Expiration Time: ${O.signInWithSolana.expirationTime}`]
            : []),
          ...((a = O?.signInWithSolana) !== null && a !== void 0 && a.chainId
            ? [`Chain ID: ${O.signInWithSolana.chainId}`]
            : []),
          ...((l = O?.signInWithSolana) !== null && l !== void 0 && l.nonce
            ? [`Nonce: ${O.signInWithSolana.nonce}`]
            : []),
          ...((c = O?.signInWithSolana) !== null && c !== void 0 && c.requestId
            ? [`Request ID: ${O.signInWithSolana.requestId}`]
            : []),
          ...((f =
            (m = O?.signInWithSolana) === null || m === void 0
              ? void 0
              : m.resources) !== null &&
          f !== void 0 &&
          f.length
            ? [
                "Resources",
                ...O.signInWithSolana.resources.map((ie) => `- ${ie}`),
              ]
            : []),
        ].join(`
`);
        const ee = await j.signMessage(new TextEncoder().encode(T), "utf8");
        if (!(ee && ee instanceof Uint8Array))
          throw new Error(
            "@supabase/auth-js: Wallet signMessage() API returned an recognized value",
          );
        P = ee;
      }
    }
    try {
      const { data: N, error: D } = await pe(
        this.fetch,
        "POST",
        `${this.url}/token?grant_type=web3`,
        {
          headers: this.headers,
          body: Object.assign(
            { chain: "solana", message: T, signature: Ol(P) },
            (p = e.options) !== null && p !== void 0 && p.captchaToken
              ? {
                  gotrue_meta_security: {
                    captcha_token:
                      (v = e.options) === null || v === void 0
                        ? void 0
                        : v.captchaToken,
                  },
                }
              : null,
          ),
          xform: St,
        },
      );
      if (D) throw D;
      return N && N.session && N.user
        ? (N.session &&
            (await this._saveSession(N.session),
            await this._notifyAllSubscribers("SIGNED_IN", N.session)),
          { data: Object.assign({}, N), error: D })
        : { data: { user: null, session: null }, error: new Xr() };
    } catch (N) {
      if (le(N)) return { data: { user: null, session: null }, error: N };
      throw N;
    }
  }
  async _exchangeCodeForSession(e) {
    const t = await ri(this.storage, `${this.storageKey}-code-verifier`),
      [r, s] = (t ?? "").split("/");
    try {
      const { data: o, error: n } = await pe(
        this.fetch,
        "POST",
        `${this.url}/token?grant_type=pkce`,
        {
          headers: this.headers,
          body: { auth_code: e, code_verifier: r },
          xform: St,
        },
      );
      if ((await ii(this.storage, `${this.storageKey}-code-verifier`), n))
        throw n;
      return o && o.session && o.user
        ? (o.session &&
            (await this._saveSession(o.session),
            await this._notifyAllSubscribers("SIGNED_IN", o.session)),
          {
            data: Object.assign(Object.assign({}, o), {
              redirectType: s ?? null,
            }),
            error: n,
          })
        : {
            data: { user: null, session: null, redirectType: null },
            error: new Xr(),
          };
    } catch (o) {
      if (le(o))
        return {
          data: { user: null, session: null, redirectType: null },
          error: o,
        };
      throw o;
    }
  }
  async signInWithIdToken(e) {
    try {
      const {
          options: t,
          provider: r,
          token: s,
          access_token: o,
          nonce: n,
        } = e,
        a = await pe(
          this.fetch,
          "POST",
          `${this.url}/token?grant_type=id_token`,
          {
            headers: this.headers,
            body: {
              provider: r,
              id_token: s,
              access_token: o,
              nonce: n,
              gotrue_meta_security: { captcha_token: t?.captchaToken },
            },
            xform: St,
          },
        ),
        { data: l, error: c } = a;
      return c
        ? { data: { user: null, session: null }, error: c }
        : l && l.session && l.user
          ? (l.session &&
              (await this._saveSession(l.session),
              await this._notifyAllSubscribers("SIGNED_IN", l.session)),
            { data: l, error: c })
          : { data: { user: null, session: null }, error: new Xr() };
    } catch (t) {
      if (le(t)) return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  async signInWithOtp(e) {
    var t, r, s, o, n;
    try {
      if ("email" in e) {
        const { email: a, options: l } = e;
        let c = null,
          m = null;
        this.flowType === "pkce" &&
          ([c, m] = await rr(this.storage, this.storageKey));
        const { error: f } = await pe(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            email: a,
            data: (t = l?.data) !== null && t !== void 0 ? t : {},
            create_user:
              (r = l?.shouldCreateUser) === null || r === void 0 || r,
            gotrue_meta_security: { captcha_token: l?.captchaToken },
            code_challenge: c,
            code_challenge_method: m,
          },
          redirectTo: l?.emailRedirectTo,
        });
        return { data: { user: null, session: null }, error: f };
      }
      if ("phone" in e) {
        const { phone: a, options: l } = e,
          { data: c, error: m } = await pe(
            this.fetch,
            "POST",
            `${this.url}/otp`,
            {
              headers: this.headers,
              body: {
                phone: a,
                data: (s = l?.data) !== null && s !== void 0 ? s : {},
                create_user:
                  (o = l?.shouldCreateUser) === null || o === void 0 || o,
                gotrue_meta_security: { captcha_token: l?.captchaToken },
                channel: (n = l?.channel) !== null && n !== void 0 ? n : "sms",
              },
            },
          );
        return {
          data: { user: null, session: null, messageId: c?.message_id },
          error: m,
        };
      }
      throw new Zr("You must provide either an email or phone number.");
    } catch (a) {
      if (le(a)) return { data: { user: null, session: null }, error: a };
      throw a;
    }
  }
  async verifyOtp(e) {
    var t, r;
    try {
      let s, o;
      "options" in e &&
        ((s = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo),
        (o =
          (r = e.options) === null || r === void 0 ? void 0 : r.captchaToken));
      const { data: n, error: a } = await pe(
        this.fetch,
        "POST",
        `${this.url}/verify`,
        {
          headers: this.headers,
          body: Object.assign(Object.assign({}, e), {
            gotrue_meta_security: { captcha_token: o },
          }),
          redirectTo: s,
          xform: St,
        },
      );
      if (a) throw a;
      if (!n) throw new Error("An error occurred on token verification.");
      const l = n.session,
        c = n.user;
      return (
        l != null &&
          l.access_token &&
          (await this._saveSession(l),
          await this._notifyAllSubscribers(
            e.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN",
            l,
          )),
        { data: { user: c, session: l }, error: null }
      );
    } catch (s) {
      if (le(s)) return { data: { user: null, session: null }, error: s };
      throw s;
    }
  }
  async signInWithSSO(e) {
    var t, r, s;
    try {
      let o = null,
        n = null;
      return (
        this.flowType === "pkce" &&
          ([o, n] = await rr(this.storage, this.storageKey)),
        await pe(this.fetch, "POST", `${this.url}/sso`, {
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
              (s = e?.options) !== null && s !== void 0 && s.captchaToken
                ? {
                    gotrue_meta_security: {
                      captcha_token: e.options.captchaToken,
                    },
                  }
                : null,
            ),
            {
              skip_http_redirect: !0,
              code_challenge: o,
              code_challenge_method: n,
            },
          ),
          headers: this.headers,
          xform: Rl,
        })
      );
    } catch (o) {
      if (le(o)) return { data: null, error: o };
      throw o;
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
        if (!t) throw new Pt();
        const { error: s } = await pe(
          this.fetch,
          "GET",
          `${this.url}/reauthenticate`,
          { headers: this.headers, jwt: t.access_token },
        );
        return { data: { user: null, session: null }, error: s };
      });
    } catch (e) {
      if (le(e)) return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  async resend(e) {
    try {
      const t = `${this.url}/resend`;
      if ("email" in e) {
        const { email: r, type: s, options: o } = e,
          { error: n } = await pe(this.fetch, "POST", t, {
            headers: this.headers,
            body: {
              email: r,
              type: s,
              gotrue_meta_security: { captcha_token: o?.captchaToken },
            },
            redirectTo: o?.emailRedirectTo,
          });
        return { data: { user: null, session: null }, error: n };
      }
      if ("phone" in e) {
        const { phone: r, type: s, options: o } = e,
          { data: n, error: a } = await pe(this.fetch, "POST", t, {
            headers: this.headers,
            body: {
              phone: r,
              type: s,
              gotrue_meta_security: { captcha_token: o?.captchaToken },
            },
          });
        return {
          data: { user: null, session: null, messageId: n?.message_id },
          error: a,
        };
      }
      throw new Zr(
        "You must provide either an email or phone number and a type",
      );
    } catch (t) {
      if (le(t)) return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  async getSession() {
    return (
      await this.initializePromise,
      await this._acquireLock(-1, async () => this._useSession(async (e) => e))
    );
  }
  async _acquireLock(e, t) {
    this._debug("#_acquireLock", "begin", e);
    try {
      if (this.lockAcquired) {
        const r = this.pendingInLock.length
            ? this.pendingInLock[this.pendingInLock.length - 1]
            : Promise.resolve(),
          s = (async () => (await r, await t()))();
        return (
          this.pendingInLock.push(
            (async () => {
              try {
                await s;
              } catch {}
            })(),
          ),
          s
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
            const s = [...this.pendingInLock];
            (await Promise.all(s), this.pendingInLock.splice(0, s.length));
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
      const t = await ri(this.storage, this.storageKey);
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
      const r = !!e.expires_at && 1e3 * e.expires_at - Date.now() < Po;
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
          let n = this.suppressGetSessionWarning;
          e = new Proxy(e, {
            get: (a, l, c) => (
              !n &&
                l === "user" &&
                (console.warn(
                  "Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.",
                ),
                (n = !0),
                (this.suppressGetSessionWarning = !0)),
              Reflect.get(a, l, c)
            ),
          });
        }
        return { data: { session: e }, error: null };
      }
      const { session: s, error: o } = await this._callRefreshToken(
        e.refresh_token,
      );
      return o
        ? { data: { session: null }, error: o }
        : { data: { session: s }, error: null };
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
        ? await pe(this.fetch, "GET", `${this.url}/user`, {
            headers: this.headers,
            jwt: e,
            xform: Dt,
          })
        : await this._useSession(async (t) => {
            var r, s, o;
            const { data: n, error: a } = t;
            if (a) throw a;
            return ((r = n.session) !== null &&
              r !== void 0 &&
              r.access_token) ||
              this.hasCustomAuthorizationHeader
              ? await pe(this.fetch, "GET", `${this.url}/user`, {
                  headers: this.headers,
                  jwt:
                    (o =
                      (s = n.session) === null || s === void 0
                        ? void 0
                        : s.access_token) !== null && o !== void 0
                      ? o
                      : void 0,
                  xform: Dt,
                })
              : { data: { user: null }, error: new Pt() };
          });
    } catch (t) {
      if (le(t))
        return (
          (function (r) {
            return le(r) && r.name === "AuthSessionMissingError";
          })(t) &&
            (await this._removeSession(),
            await ii(this.storage, `${this.storageKey}-code-verifier`)),
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
        const { data: s, error: o } = r;
        if (o) throw o;
        if (!s.session) throw new Pt();
        const n = s.session;
        let a = null,
          l = null;
        this.flowType === "pkce" &&
          e.email != null &&
          ([a, l] = await rr(this.storage, this.storageKey));
        const { data: c, error: m } = await pe(
          this.fetch,
          "PUT",
          `${this.url}/user`,
          {
            headers: this.headers,
            redirectTo: t?.emailRedirectTo,
            body: Object.assign(Object.assign({}, e), {
              code_challenge: a,
              code_challenge_method: l,
            }),
            jwt: n.access_token,
            xform: Dt,
          },
        );
        if (m) throw m;
        return (
          (n.user = c.user),
          await this._saveSession(n),
          await this._notifyAllSubscribers("USER_UPDATED", n),
          { data: { user: n.user }, error: null }
        );
      });
    } catch (r) {
      if (le(r)) return { data: { user: null }, error: r };
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
      if (!e.access_token || !e.refresh_token) throw new Pt();
      const t = Date.now() / 1e3;
      let r = t,
        s = !0,
        o = null;
      const { payload: n } = Hi(e.access_token);
      if ((n.exp && ((r = n.exp), (s = r <= t)), s)) {
        const { session: a, error: l } = await this._callRefreshToken(
          e.refresh_token,
        );
        if (l) return { data: { user: null, session: null }, error: l };
        if (!a) return { data: { user: null, session: null }, error: null };
        o = a;
      } else {
        const { data: a, error: l } = await this._getUser(e.access_token);
        if (l) throw l;
        ((o = {
          access_token: e.access_token,
          refresh_token: e.refresh_token,
          user: a.user,
          token_type: "bearer",
          expires_in: r - t,
          expires_at: r,
        }),
          await this._saveSession(o),
          await this._notifyAllSubscribers("SIGNED_IN", o));
      }
      return { data: { user: o.user, session: o }, error: null };
    } catch (t) {
      if (le(t)) return { data: { session: null, user: null }, error: t };
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
          const { data: n, error: a } = t;
          if (a) throw a;
          e = (r = n.session) !== null && r !== void 0 ? r : void 0;
        }
        if (e == null || !e.refresh_token) throw new Pt();
        const { session: s, error: o } = await this._callRefreshToken(
          e.refresh_token,
        );
        return o
          ? { data: { user: null, session: null }, error: o }
          : s
            ? { data: { user: s.user, session: s }, error: null }
            : { data: { user: null, session: null }, error: null };
      });
    } catch (t) {
      if (le(t)) return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  async _getSessionFromURL(e, t) {
    try {
      if (!gt()) throw new ei("No browser detected.");
      if (e.error || e.error_description || e.error_code)
        throw new ei(
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
            throw new Ao("Not a valid PKCE flow url.");
          break;
        case "pkce":
          if (this.flowType === "implicit")
            throw new ei("Not a valid implicit grant flow url.");
      }
      if (t === "pkce") {
        if (
          (this._debug("#_initialize()", "begin", "is PKCE flow", !0), !e.code)
        )
          throw new Ao("No code detected.");
        const { data: A, error: O } = await this._exchangeCodeForSession(
          e.code,
        );
        if (O) throw O;
        const j = new URL(window.location.href);
        return (
          j.searchParams.delete("code"),
          window.history.replaceState(window.history.state, "", j.toString()),
          { data: { session: A.session, redirectType: null }, error: null }
        );
      }
      const {
        provider_token: r,
        provider_refresh_token: s,
        access_token: o,
        refresh_token: n,
        expires_in: a,
        expires_at: l,
        token_type: c,
      } = e;
      if (!(o && a && n && c)) throw new ei("No session defined in URL");
      const m = Math.round(Date.now() / 1e3),
        f = parseInt(a);
      let p = m + f;
      l && (p = parseInt(l));
      const v = p - m;
      1e3 * v <= Sr &&
        console.warn(
          `@supabase/gotrue-js: Session as retrieved from URL expires in ${v}s, should have been closer to ${f}s`,
        );
      const T = p - f;
      m - T >= 120
        ? console.warn(
            "@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",
            T,
            p,
            m,
          )
        : m - T < 0 &&
          console.warn(
            "@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",
            T,
            p,
            m,
          );
      const { data: P, error: N } = await this._getUser(o);
      if (N) throw N;
      const D = {
        provider_token: r,
        provider_refresh_token: s,
        access_token: o,
        expires_in: f,
        expires_at: p,
        refresh_token: n,
        token_type: c,
        user: P.user,
      };
      return (
        (window.location.hash = ""),
        this._debug("#_getSessionFromURL()", "clearing window.location.hash"),
        { data: { session: D, redirectType: e.type }, error: null }
      );
    } catch (r) {
      if (le(r))
        return { data: { session: null, redirectType: null }, error: r };
      throw r;
    }
  }
  _isImplicitGrantCallback(e) {
    return !(!e.access_token && !e.error_description);
  }
  async _isPKCECallback(e) {
    const t = await ri(this.storage, `${this.storageKey}-code-verifier`);
    return !(!e.code || !t);
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
      const { data: s, error: o } = t;
      if (o) return { error: o };
      const n =
        (r = s.session) === null || r === void 0 ? void 0 : r.access_token;
      if (n) {
        const { error: a } = await this.admin.signOut(n, e);
        if (
          a &&
          (!(function (l) {
            return le(l) && l.name === "AuthApiError";
          })(a) ||
            (a.status !== 404 && a.status !== 401 && a.status !== 403))
        )
          return { error: a };
      }
      return (
        e !== "others" &&
          (await this._removeSession(),
          await ii(this.storage, `${this.storageKey}-code-verifier`)),
        { error: null }
      );
    });
  }
  onAuthStateChange(e) {
    const t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (s) {
          const o = (16 * Math.random()) | 0;
          return (s == "x" ? o : (3 & o) | 8).toString(16);
        },
      ),
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
      var r, s;
      try {
        const {
          data: { session: o },
          error: n,
        } = t;
        if (n) throw n;
        (await ((r = this.stateChangeEmitters.get(e)) === null || r === void 0
          ? void 0
          : r.callback("INITIAL_SESSION", o)),
          this._debug("INITIAL_SESSION", "callback id", e, "session", o));
      } catch (o) {
        (await ((s = this.stateChangeEmitters.get(e)) === null || s === void 0
          ? void 0
          : s.callback("INITIAL_SESSION", null)),
          this._debug("INITIAL_SESSION", "callback id", e, "error", o),
          console.error(o));
      }
    });
  }
  async resetPasswordForEmail(e, t = {}) {
    let r = null,
      s = null;
    this.flowType === "pkce" &&
      ([r, s] = await rr(this.storage, this.storageKey, !0));
    try {
      return await pe(this.fetch, "POST", `${this.url}/recover`, {
        body: {
          email: e,
          code_challenge: r,
          code_challenge_method: s,
          gotrue_meta_security: { captcha_token: t.captchaToken },
        },
        headers: this.headers,
        redirectTo: t.redirectTo,
      });
    } catch (o) {
      if (le(o)) return { data: null, error: o };
      throw o;
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
      if (le(t)) return { data: null, error: t };
      throw t;
    }
  }
  async linkIdentity(e) {
    var t;
    try {
      const { data: r, error: s } = await this._useSession(async (o) => {
        var n, a, l, c, m;
        const { data: f, error: p } = o;
        if (p) throw p;
        const v = await this._getUrlForProvider(
          `${this.url}/user/identities/authorize`,
          e.provider,
          {
            redirectTo:
              (n = e.options) === null || n === void 0 ? void 0 : n.redirectTo,
            scopes:
              (a = e.options) === null || a === void 0 ? void 0 : a.scopes,
            queryParams:
              (l = e.options) === null || l === void 0 ? void 0 : l.queryParams,
            skipBrowserRedirect: !0,
          },
        );
        return await pe(this.fetch, "GET", v, {
          headers: this.headers,
          jwt:
            (m =
              (c = f.session) === null || c === void 0
                ? void 0
                : c.access_token) !== null && m !== void 0
              ? m
              : void 0,
        });
      });
      if (s) throw s;
      return (
        gt() &&
          !(
            (t = e.options) !== null &&
            t !== void 0 &&
            t.skipBrowserRedirect
          ) &&
          window.location.assign(r?.url),
        { data: { provider: e.provider, url: r?.url }, error: null }
      );
    } catch (r) {
      if (le(r)) return { data: { provider: e.provider, url: null }, error: r };
      throw r;
    }
  }
  async unlinkIdentity(e) {
    try {
      return await this._useSession(async (t) => {
        var r, s;
        const { data: o, error: n } = t;
        if (n) throw n;
        return await pe(
          this.fetch,
          "DELETE",
          `${this.url}/user/identities/${e.identity_id}`,
          {
            headers: this.headers,
            jwt:
              (s =
                (r = o.session) === null || r === void 0
                  ? void 0
                  : r.access_token) !== null && s !== void 0
                ? s
                : void 0,
          },
        );
      });
    } catch (t) {
      if (le(t)) return { data: null, error: t };
      throw t;
    }
  }
  async _refreshAccessToken(e) {
    const t = `#_refreshAccessToken(${e.substring(0, 5)}...)`;
    this._debug(t, "begin");
    try {
      const r = Date.now();
      return await (function (s, o) {
        return new Promise((n, a) => {
          (async () => {
            for (let l = 0; l < 1 / 0; l++)
              try {
                const c = await s(l);
                if (!o(l, null)) return void n(c);
              } catch (c) {
                if (!o(l, c)) return void a(c);
              }
          })();
        });
      })(
        async (s) => (
          s > 0 &&
            (await (async function (o) {
              return await new Promise((n) => {
                setTimeout(() => n(null), o);
              });
            })(200 * Math.pow(2, s - 1))),
          this._debug(t, "refreshing attempt", s),
          await pe(
            this.fetch,
            "POST",
            `${this.url}/token?grant_type=refresh_token`,
            { body: { refresh_token: e }, headers: this.headers, xform: St },
          )
        ),
        (s, o) => {
          const n = 200 * Math.pow(2, s);
          return o && Vi(o) && Date.now() + n - r < Sr;
        },
      );
    } catch (r) {
      if ((this._debug(t, "error", r), le(r)))
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
      gt() && !t.skipBrowserRedirect && window.location.assign(r),
      { data: { provider: e, url: r }, error: null }
    );
  }
  async _recoverAndRefresh() {
    var e;
    const t = "#_recoverAndRefresh()";
    this._debug(t, "begin");
    try {
      const r = await ri(this.storage, this.storageKey);
      if ((this._debug(t, "session from storage", r), !this._isValidSession(r)))
        return (
          this._debug(t, "session is not valid"),
          void (r !== null && (await this._removeSession()))
        );
      const s =
        1e3 * ((e = r.expires_at) !== null && e !== void 0 ? e : 1 / 0) -
          Date.now() <
        Po;
      if (
        (this._debug(
          t,
          `session has${s ? "" : " not"} expired with margin of 90000s`,
        ),
        s)
      ) {
        if (this.autoRefreshToken && r.refresh_token) {
          const { error: o } = await this._callRefreshToken(r.refresh_token);
          o &&
            (console.error(o),
            Vi(o) ||
              (this._debug(
                t,
                "refresh failed with a non-retryable error, removing the session",
                o,
              ),
              await this._removeSession()));
        }
      } else await this._notifyAllSubscribers("SIGNED_IN", r);
    } catch (r) {
      return (this._debug(t, "error", r), void console.error(r));
    } finally {
      this._debug(t, "end");
    }
  }
  async _callRefreshToken(e) {
    var t, r;
    if (!e) throw new Pt();
    if (this.refreshingDeferred) return this.refreshingDeferred.promise;
    const s = `#_callRefreshToken(${e.substring(0, 5)}...)`;
    this._debug(s, "begin");
    try {
      this.refreshingDeferred = new ni();
      const { data: o, error: n } = await this._refreshAccessToken(e);
      if (n) throw n;
      if (!o.session) throw new Pt();
      (await this._saveSession(o.session),
        await this._notifyAllSubscribers("TOKEN_REFRESHED", o.session));
      const a = { session: o.session, error: null };
      return (this.refreshingDeferred.resolve(a), a);
    } catch (o) {
      if ((this._debug(s, "error", o), le(o))) {
        const n = { session: null, error: o };
        return (
          Vi(o) || (await this._removeSession()),
          (t = this.refreshingDeferred) === null ||
            t === void 0 ||
            t.resolve(n),
          n
        );
      }
      throw (
        (r = this.refreshingDeferred) === null || r === void 0 || r.reject(o),
        o
      );
    } finally {
      ((this.refreshingDeferred = null), this._debug(s, "end"));
    }
  }
  async _notifyAllSubscribers(e, t, r = !0) {
    const s = `#_notifyAllSubscribers(${e})`;
    this._debug(s, "begin", t, `broadcast = ${r}`);
    try {
      this.broadcastChannel &&
        r &&
        this.broadcastChannel.postMessage({ event: e, session: t });
      const o = [],
        n = Array.from(this.stateChangeEmitters.values()).map(async (a) => {
          try {
            await a.callback(e, t);
          } catch (l) {
            o.push(l);
          }
        });
      if ((await Promise.all(n), o.length > 0)) {
        for (let a = 0; a < o.length; a += 1) console.error(o[a]);
        throw o[0];
      }
    } finally {
      this._debug(s, "end");
    }
  }
  async _saveSession(e) {
    (this._debug("#_saveSession()", e),
      (this.suppressGetSessionWarning = !0),
      await qo(this.storage, this.storageKey, e));
  }
  async _removeSession() {
    (this._debug("#_removeSession()"),
      await ii(this.storage, this.storageKey),
      await this._notifyAllSubscribers("SIGNED_OUT", null));
  }
  _removeVisibilityChangedCallback() {
    this._debug("#_removeVisibilityChangedCallback()");
    const e = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      e &&
        gt() &&
        window != null &&
        window.removeEventListener &&
        window.removeEventListener("visibilitychange", e);
    } catch (t) {
      console.error("removing visibilitychange callback failed", t);
    }
  }
  async _startAutoRefresh() {
    (await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()"));
    const e = setInterval(() => this._autoRefreshTokenTick(), Sr);
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
              if (!r || !r.refresh_token || !r.expires_at)
                return void this._debug(
                  "#_autoRefreshTokenTick()",
                  "no session",
                );
              const s = Math.floor((1e3 * r.expires_at - e) / Sr);
              (this._debug(
                "#_autoRefreshTokenTick()",
                `access token expires in ${s} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`,
              ),
                s <= 3 && (await this._callRefreshToken(r.refresh_token)));
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
      if (!(e.isAcquireTimeout || e instanceof Ho)) throw e;
      this._debug("auto refresh token tick lock not available");
    }
  }
  async _handleVisibilityChange() {
    if (
      (this._debug("#_handleVisibilityChange()"),
      !gt() || window == null || !window.addEventListener)
    )
      return (this.autoRefreshToken && this.startAutoRefresh(), !1);
    try {
      ((this.visibilityChangedCallback = async () =>
        await this._onVisibilityChanged(!1)),
        window?.addEventListener(
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
              document.visibilityState === "visible"
                ? await this._recoverAndRefresh()
                : this._debug(
                    t,
                    "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting",
                  );
            })))
        : document.visibilityState === "hidden" &&
          this.autoRefreshToken &&
          this._stopAutoRefresh());
  }
  async _getUrlForProvider(e, t, r) {
    const s = [`provider=${encodeURIComponent(t)}`];
    if (
      (r != null &&
        r.redirectTo &&
        s.push(`redirect_to=${encodeURIComponent(r.redirectTo)}`),
      r != null && r.scopes && s.push(`scopes=${encodeURIComponent(r.scopes)}`),
      this.flowType === "pkce")
    ) {
      const [o, n] = await rr(this.storage, this.storageKey),
        a = new URLSearchParams({
          code_challenge: `${encodeURIComponent(o)}`,
          code_challenge_method: `${encodeURIComponent(n)}`,
        });
      s.push(a.toString());
    }
    if (r != null && r.queryParams) {
      const o = new URLSearchParams(r.queryParams);
      s.push(o.toString());
    }
    return (
      r != null &&
        r.skipBrowserRedirect &&
        s.push(`skip_http_redirect=${r.skipBrowserRedirect}`),
      `${e}?${s.join("&")}`
    );
  }
  async _unenroll(e) {
    try {
      return await this._useSession(async (t) => {
        var r;
        const { data: s, error: o } = t;
        return o
          ? { data: null, error: o }
          : await pe(
              this.fetch,
              "DELETE",
              `${this.url}/factors/${e.factorId}`,
              {
                headers: this.headers,
                jwt:
                  (r = s?.session) === null || r === void 0
                    ? void 0
                    : r.access_token,
              },
            );
      });
    } catch (t) {
      if (le(t)) return { data: null, error: t };
      throw t;
    }
  }
  async _enroll(e) {
    try {
      return await this._useSession(async (t) => {
        var r, s;
        const { data: o, error: n } = t;
        if (n) return { data: null, error: n };
        const a = Object.assign(
            { friendly_name: e.friendlyName, factor_type: e.factorType },
            e.factorType === "phone"
              ? { phone: e.phone }
              : { issuer: e.issuer },
          ),
          { data: l, error: c } = await pe(
            this.fetch,
            "POST",
            `${this.url}/factors`,
            {
              body: a,
              headers: this.headers,
              jwt:
                (r = o?.session) === null || r === void 0
                  ? void 0
                  : r.access_token,
            },
          );
        return c
          ? { data: null, error: c }
          : (e.factorType === "totp" &&
              !((s = l?.totp) === null || s === void 0) &&
              s.qr_code &&
              (l.totp.qr_code = `data:image/svg+xml;utf-8,${l.totp.qr_code}`),
            { data: l, error: null });
      });
    } catch (t) {
      if (le(t)) return { data: null, error: t };
      throw t;
    }
  }
  async _verify(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var r;
          const { data: s, error: o } = t;
          if (o) return { data: null, error: o };
          const { data: n, error: a } = await pe(
            this.fetch,
            "POST",
            `${this.url}/factors/${e.factorId}/verify`,
            {
              body: { code: e.code, challenge_id: e.challengeId },
              headers: this.headers,
              jwt:
                (r = s?.session) === null || r === void 0
                  ? void 0
                  : r.access_token,
            },
          );
          return a
            ? { data: null, error: a }
            : (await this._saveSession(
                Object.assign(
                  { expires_at: Math.round(Date.now() / 1e3) + n.expires_in },
                  n,
                ),
              ),
              await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", n),
              { data: n, error: a });
        });
      } catch (t) {
        if (le(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  async _challenge(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var r;
          const { data: s, error: o } = t;
          return o
            ? { data: null, error: o }
            : await pe(
                this.fetch,
                "POST",
                `${this.url}/factors/${e.factorId}/challenge`,
                {
                  body: { channel: e.channel },
                  headers: this.headers,
                  jwt:
                    (r = s?.session) === null || r === void 0
                      ? void 0
                      : r.access_token,
                },
              );
        });
      } catch (t) {
        if (le(t)) return { data: null, error: t };
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
    const r = e?.factors || [],
      s = r.filter((n) => n.factor_type === "totp" && n.status === "verified"),
      o = r.filter((n) => n.factor_type === "phone" && n.status === "verified");
    return { data: { all: r, totp: s, phone: o }, error: null };
  }
  async _getAuthenticatorAssuranceLevel() {
    return this._acquireLock(
      -1,
      async () =>
        await this._useSession(async (e) => {
          var t, r;
          const {
            data: { session: s },
            error: o,
          } = e;
          if (o) return { data: null, error: o };
          if (!s)
            return {
              data: {
                currentLevel: null,
                nextLevel: null,
                currentAuthenticationMethods: [],
              },
              error: null,
            };
          const { payload: n } = Hi(s.access_token);
          let a = null;
          n.aal && (a = n.aal);
          let l = a;
          return (
            ((r =
              (t = s.user.factors) === null || t === void 0
                ? void 0
                : t.filter((c) => c.status === "verified")) !== null &&
            r !== void 0
              ? r
              : []
            ).length > 0 && (l = "aal2"),
            {
              data: {
                currentLevel: a,
                nextLevel: l,
                currentAuthenticationMethods: n.amr || [],
              },
              error: null,
            }
          );
        }),
    );
  }
  async fetchJwk(e, t = { keys: [] }) {
    let r = t.keys.find((n) => n.kid === e);
    if (
      r ||
      ((r = this.jwks.keys.find((n) => n.kid === e)),
      r && this.jwks_cached_at + 6e5 > Date.now())
    )
      return r;
    const { data: s, error: o } = await pe(
      this.fetch,
      "GET",
      `${this.url}/.well-known/jwks.json`,
      { headers: this.headers },
    );
    if (o) throw o;
    if (!s.keys || s.keys.length === 0) throw new kr("JWKS is empty");
    if (
      ((this.jwks = s),
      (this.jwks_cached_at = Date.now()),
      (r = s.keys.find((n) => n.kid === e)),
      !r)
    )
      throw new kr("No matching signing key found in JWKS");
    return r;
  }
  async getClaims(e, t = { keys: [] }) {
    try {
      let r = e;
      if (!r) {
        const { data: p, error: v } = await this.getSession();
        if (v || !p.session) return { data: null, error: v };
        r = p.session.access_token;
      }
      const {
        header: s,
        payload: o,
        signature: n,
        raw: { header: a, payload: l },
      } = Hi(r);
      if (
        ((function (p) {
          if (!p) throw new Error("Missing exp claim");
          if (p <= Math.floor(Date.now() / 1e3))
            throw new Error("JWT has expired");
        })(o.exp),
        !s.kid ||
          s.alg === "HS256" ||
          !("crypto" in globalThis) ||
          !("subtle" in globalThis.crypto))
      ) {
        const { error: p } = await this.getUser(r);
        if (p) throw p;
        return { data: { claims: o, header: s, signature: n }, error: null };
      }
      const c = (function (p) {
          switch (p) {
            case "RS256":
              return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
            case "ES256":
              return {
                name: "ECDSA",
                namedCurve: "P-256",
                hash: { name: "SHA-256" },
              };
            default:
              throw new Error("Invalid alg claim");
          }
        })(s.alg),
        m = await this.fetchJwk(s.kid, t),
        f = await crypto.subtle.importKey("jwk", m, c, !0, ["verify"]);
      if (
        !(await crypto.subtle.verify(
          c,
          f,
          n,
          (function (p) {
            const v = [];
            return (
              (function (T, P) {
                for (let N = 0; N < T.length; N += 1) {
                  let D = T.charCodeAt(N);
                  if (D > 55295 && D <= 56319) {
                    const A = (1024 * (D - 55296)) & 65535;
                    ((D =
                      65536 + (((T.charCodeAt(N + 1) - 56320) & 65535) | A)),
                      (N += 1));
                  }
                  jl(D, P);
                }
              })(p, (T) => v.push(T)),
              new Uint8Array(v)
            );
          })(`${a}.${l}`),
        ))
      )
        throw new kr("Invalid JWT signature");
      return { data: { claims: o, header: s, signature: n }, error: null };
    } catch (r) {
      if (le(r)) return { data: null, error: r };
      throw r;
    }
  }
}
Pr.nextInstanceID = 0;
const Vl = Pr;
class Hl extends Vl {
  constructor(e) {
    super(e);
  }
}
class Gl {
  constructor(e, t, r) {
    var s, o, n;
    if (((this.supabaseUrl = e), (this.supabaseKey = t), !e))
      throw new Error("supabaseUrl is required.");
    if (!t) throw new Error("supabaseKey is required.");
    const a = (function (f) {
        return f.endsWith("/") ? f : f + "/";
      })(e),
      l = new URL(a);
    ((this.realtimeUrl = new URL("realtime/v1", l)),
      (this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace(
        "http",
        "ws",
      )),
      (this.authUrl = new URL("auth/v1", l)),
      (this.storageUrl = new URL("storage/v1", l)),
      (this.functionsUrl = new URL("functions/v1", l)));
    const c = `sb-${l.hostname.split(".")[0]}-auth-token`,
      m = (function (f, p) {
        var v, T;
        const { db: P, auth: N, realtime: D, global: A } = f,
          { db: O, auth: j, realtime: W, global: ee } = p,
          ie = {
            db: Object.assign(Object.assign({}, O), P),
            auth: Object.assign(Object.assign({}, j), N),
            realtime: Object.assign(Object.assign({}, W), D),
            global: Object.assign(Object.assign(Object.assign({}, ee), A), {
              headers: Object.assign(
                Object.assign(
                  {},
                  (v = ee?.headers) !== null && v !== void 0 ? v : {},
                ),
                (T = A?.headers) !== null && T !== void 0 ? T : {},
              ),
            }),
            accessToken: () =>
              (function (ge, ue, ne, ye) {
                return new (ne || (ne = Promise))(function (U, De) {
                  function Fe(B) {
                    try {
                      z(ye.next(B));
                    } catch (se) {
                      De(se);
                    }
                  }
                  function ae(B) {
                    try {
                      z(ye.throw(B));
                    } catch (se) {
                      De(se);
                    }
                  }
                  function z(B) {
                    B.done
                      ? U(B.value)
                      : (function (se) {
                          return se instanceof ne
                            ? se
                            : new ne(function (Le) {
                                Le(se);
                              });
                        })(B.value).then(Fe, ae);
                  }
                  z((ye = ye.apply(ge, ue || [])).next());
                });
              })(this, void 0, void 0, function* () {
                return "";
              }),
          };
        return (
          f.accessToken
            ? (ie.accessToken = f.accessToken)
            : delete ie.accessToken,
          ie
        );
      })(r ?? {}, {
        db: wl,
        realtime: _l,
        auth: Object.assign(Object.assign({}, vl), { storageKey: c }),
        global: bl,
      });
    ((this.storageKey =
      (s = m.auth.storageKey) !== null && s !== void 0 ? s : ""),
      (this.headers = (o = m.global.headers) !== null && o !== void 0 ? o : {}),
      m.accessToken
        ? ((this.accessToken = m.accessToken),
          (this.auth = new Proxy(
            {},
            {
              get: (f, p) => {
                throw new Error(
                  `@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(p)} is not possible`,
                );
              },
            },
          )))
        : (this.auth = this._initSupabaseAuthClient(
            (n = m.auth) !== null && n !== void 0 ? n : {},
            this.headers,
            m.global.fetch,
          )),
      (this.fetch = xl(t, this._getAccessToken.bind(this), m.global.fetch)),
      (this.realtime = this._initRealtimeClient(
        Object.assign(
          {
            headers: this.headers,
            accessToken: this._getAccessToken.bind(this),
          },
          m.realtime,
        ),
      )),
      (this.rest = new el(new URL("rest/v1", l).href, {
        headers: this.headers,
        schema: m.db.schema,
        fetch: this.fetch,
      })),
      m.accessToken || this._listenForAuthEvents());
  }
  get functions() {
    return new Ka(this.functionsUrl.href, {
      headers: this.headers,
      customFetch: this.fetch,
    });
  }
  get storage() {
    return new yl(this.storageUrl.href, this.headers, this.fetch);
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
    return (function (r, s, o, n) {
      return new (o || (o = Promise))(function (a, l) {
        function c(p) {
          try {
            f(n.next(p));
          } catch (v) {
            l(v);
          }
        }
        function m(p) {
          try {
            f(n.throw(p));
          } catch (v) {
            l(v);
          }
        }
        function f(p) {
          p.done
            ? a(p.value)
            : (function (v) {
                return v instanceof o
                  ? v
                  : new o(function (T) {
                      T(v);
                    });
              })(p.value).then(c, m);
        }
        f((n = n.apply(r, s || [])).next());
      });
    })(this, void 0, void 0, function* () {
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
      storage: s,
      storageKey: o,
      flowType: n,
      lock: a,
      debug: l,
    },
    c,
    m,
  ) {
    const f = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`,
    };
    return new Hl({
      url: this.authUrl.href,
      headers: Object.assign(Object.assign({}, f), c),
      storageKey: o,
      autoRefreshToken: e,
      persistSession: t,
      detectSessionInUrl: r,
      storage: s,
      flowType: n,
      lock: a,
      debug: l,
      fetch: m,
      hasCustomAuthorizationHeader: "Authorization" in this.headers,
    });
  }
  _initRealtimeClient(e) {
    return new dl(
      this.realtimeUrl.href,
      Object.assign(Object.assign({}, e), {
        params: Object.assign({ apikey: this.supabaseKey }, e?.params),
      }),
    );
  }
  _listenForAuthEvents() {
    return this.auth.onAuthStateChange((e, t) => {
      this._handleTokenChanged(e, "CLIENT", t?.access_token);
    });
  }
  _handleTokenChanged(e, t, r) {
    (e !== "TOKEN_REFRESHED" && e !== "SIGNED_IN") ||
    this.changedAccessToken === r
      ? e === "SIGNED_OUT" &&
        (this.realtime.setAuth(),
        t == "STORAGE" && this.auth.signOut(),
        (this.changedAccessToken = void 0))
      : (this.changedAccessToken = r);
  }
}
const x = new Gl(
    "https://fbpemdlnlsgqkovnatro.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicGVtZGxubHNncWtvdm5hdHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTQwOTksImV4cCI6MjA2Nzk5MDA5OX0.qJvBiB29BxSOMBCYtdcqMUOepSQecdtvpdglNrIZEhY",
    void 0,
  ),
  Tr = "user_id",
  Ki = "customer_id";
let Wi = Tr;
const Ne = () => Wi,
  Ko = (i) =>
    typeof i == "string"
      ? i.toLowerCase()
      : `${i?.message || ""}`.toLowerCase(),
  Wo = (i) =>
    typeof i == "object" && i !== null && i?.code
      ? String(i.code).toLowerCase()
      : "",
  Jo = (i, e) => {
    const t = String(e || "").toLowerCase();
    return (
      i.includes(`column notifications.${t} does not exist`) ||
      i.includes(`column ${t} does not exist`) ||
      i.includes(`could not find the '${t}' column`) ||
      i.includes(`could not find the "${t}" column`) ||
      (i.includes("schema cache") && i.includes(t))
    );
  },
  qt = (i) =>
    !!((e, t = Ne()) => {
      if (t !== Tr) return !1;
      const r = Ko(e),
        s = Wo(e);
      return (
        !r.includes(`or${Tr}`) &&
        (s === "42703" || s === "pgrst204" || r.includes("does not exist")) &&
        Jo(r, Tr)
      );
    })(i) &&
    ((Wi = Ki),
    console.warn(
      "notifications.user_id missing; using notifications.customer_id fallback",
    ),
    !0),
  Er = (i) =>
    !!((e, t = Ne()) => {
      if (t !== Ki) return !1;
      const r = Ko(e),
        s = Wo(e);
      return (
        (s === "42703" || s === "pgrst204" || r.includes("does not exist")) &&
        Jo(r, Ki)
      );
    })(i) &&
    ((Wi = Tr),
    console.warn(
      "notifications.customer_id missing; reverting to notifications.user_id",
    ),
    !0),
  or = (i, e = !1, t = Ne()) =>
    e ? `${t}.is.null,${t}.eq."${i}"` : `${t}.eq."${i}",${t}.is.null`,
  Qo = (i, e = Ne()) =>
    i ? (i[e] ?? i.user_id ?? i.customer_id ?? i.userId ?? null) : null;
class nr {
  constructor() {
    this.pendingNotifications = new Set();
  }
  static getInstance() {
    return (nr.instance || (nr.instance = new nr()), nr.instance);
  }
  async createNotification(e) {
    try {
      const {
          userId: t = null,
          message: r,
          importance: s = X.Medium,
          linkToPage: o,
          linkToId: n,
          eventType: a,
          relatedEntityType: l,
          relatedEntityId: c,
          targetAudience: m = "customer",
        } = e,
        f = this.createDeduplicationKey(t, a, l, c, r);
      if (this.pendingNotifications.has(f))
        return (Z("Notification already pending:", f), null);
      this.pendingNotifications.add(f);
      try {
        if (await this.findDuplicate(t, a, l, c, r))
          return (Z("Duplicate notification prevented:", f), null);
        const p = {
          message: r,
          importance: s.toLowerCase(),
          is_read: !1,
          timestamp: new Date().toISOString(),
          link_to_page: o,
          link_to_id: n,
        };
        try {
          (a && (p.event_type = a),
            l && (p.related_entity_type = l),
            c && (p.related_entity_id = c),
            m && (p.target_audience = m),
            (a || l || c || m) &&
              (p.metadata = {
                event_type: a,
                related_entity_type: l,
                related_entity_id: c,
                target_audience: m,
              }));
        } catch {
          console.warn(
            "Extended notification fields not available, using base fields only",
          );
        }
        const v = async (D) =>
          await x
            .from("notifications")
            .insert({ ...p, [D]: t })
            .select()
            .single();
        let T = Ne(),
          { data: P, error: N } = await v(T);
        return (
          N && qt(N) && ((T = Ne()), ({ data: P, error: N } = await v(T))),
          N
            ? (console.error("Error creating notification:", N), null)
            : this.mapToNotificationItem(P)
        );
      } finally {
        setTimeout(() => {
          this.pendingNotifications.delete(f);
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
      const { data: r, error: s } = await x
        .from("customers")
        .select("id")
        .eq("role", "admin");
      if (s) return (console.error("Error fetching admin users:", s), []);
      if (!r || r.length === 0)
        return (
          console.warn("No admin users found for admin notification"),
          []
        );
      const o = [];
      for (const n of r) {
        const a = await this.createNotification({
          userId: n.id,
          message: e,
          targetAudience: "admin",
          importance: X.Medium,
          ...t,
        });
        a && o.push(a);
      }
      return o;
    } catch (r) {
      return (console.error("Error creating admin notifications:", r), []);
    }
  }
  async createSystemNotification(e, t = {}) {
    try {
      const { data: r, error: s } = await x
        .from("customers")
        .select("id")
        .eq("role", "admin");
      if (s)
        return (
          console.error(
            "Error fetching admin users for system notification:",
            s,
          ),
          []
        );
      if (!r || r.length === 0)
        return (
          console.warn("No admin users found for system notification"),
          []
        );
      Z(`[DEBUG] Creating system notification for ${r.length} admin users:`, {
        message: e,
        adminUserIds: r.map((n) => n.id),
      });
      const o = [];
      for (const n of r) {
        const a = await this.createNotification({
          userId: n.id,
          message: e,
          targetAudience: "system",
          importance: X.Medium,
          eventType: "system_announcement",
          relatedEntityType: "system",
          relatedEntityId: "global",
          ...t,
        });
        a
          ? (o.push(a),
            Z(`[DEBUG] Created system notification for admin ${n.id}:`, a.id))
          : Z(`[DEBUG] Failed to create system notification for admin ${n.id}`);
      }
      return (
        Z(
          `[DEBUG] System notification creation complete: ${o.length} notifications created`,
        ),
        o
      );
    } catch (r) {
      return (console.error("Error creating system notifications:", r), []);
    }
  }
  async createOrderStatusNotification(e, t, r, s, o) {
    const n = `Order "${o}" status changed from ${t} to ${r}`;
    return s
      ? this.createCustomerNotification(s, n, {
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
    return ["Cancelled", "OnHold"].includes(e)
      ? X.Critical
      : ["Delivered", "Completed", "OutForDelivery"].includes(e)
        ? X.High
        : ["InTransit", "CustomsClearance"].includes(e)
          ? X.Medium
          : X.Low;
  }
  async createAdminExceptionNotification(e, t = {}) {
    return this.createNotification({
      userId: null,
      message: e,
      targetAudience: "admin",
      importance: X.High,
      ...t,
    });
  }
  async createAdminSummaryNotification(e, t = {}) {
    return this.createNotification({
      userId: null,
      message: e,
      targetAudience: "admin",
      importance: X.Medium,
      eventType: "admin_summary",
      ...t,
    });
  }
  async createConsolidationStatusNotification(e, t, r, s, o) {
    const n = `Consolidation "${o}" status changed from ${t} to ${r}`,
      a = `${t}_to_${r}`;
    return s
      ? this.createCustomerNotification(s, n, {
          importance: this.getStatusImportance(r),
          linkToPage: "consolidations",
          linkToId: e,
          eventType: "consolidation_status_change",
          relatedEntityType: "consolidation_status_transition",
          relatedEntityId: `${e}_${a}`,
        })
      : null;
  }
  async createShipmentNotification(e, t, r, s, o) {
    const n = `Shipment "${s}" status updated to ${o}`;
    return await this.createSystemNotification(n, {
      importance: X.Medium,
      linkToPage: "shipments",
      linkToId: e,
      eventType: "shipment_status_change",
      relatedEntityType: "shipment",
      relatedEntityId: e,
    });
  }
  async createPaymentNotification(e, t, r, s, o) {
    const n = `Payment ${r.toLowerCase()}: $${Math.abs(t).toFixed(2)} - ${s}`;
    return this.createCustomerNotification(e, n, {
      importance: X.High,
      linkToPage: "payments",
      linkToId: o,
      eventType: "payment",
      relatedEntityType: r === "Payment" ? "payment" : "fee",
      relatedEntityId: o,
    });
  }
  async markAsRead(e) {
    try {
      const { error: t } = await x
        .from("notifications")
        .update({ is_read: !0 })
        .eq("id", e);
      return !t;
    } catch (t) {
      return (console.error("Error marking notification as read:", t), !1);
    }
  }
  async markAllAsRead(e = null, t = !1) {
    try {
      if (!(t || (e && e.trim() !== "")))
        return (console.error("Invalid userId provided for markAllAsRead"), !1);
      const r = async (n) => {
        const { data: a, error: l } = await x
          .from("notifications")
          .select("id")
          .eq("is_read", !1)
          .or(or(e, t, n))
          .limit(5e3);
        if (l || a == null || !a.length) return { data: a, error: l };
        const c = a.map((m) => m.id).filter(Boolean);
        return c.length === 0
          ? { data: [], error: null }
          : await x
              .from("notifications")
              .update({ is_read: !0 })
              .in("id", c)
              .eq("is_read", !1)
              .select("id");
      };
      let s = Ne(),
        { error: o } = await r(s);
      return (
        o && qt(o) && ((s = Ne()), ({ error: o } = await r(s))),
        o && Er(o) && ((s = Ne()), ({ error: o } = await r(s))),
        !o
      );
    } catch (r) {
      return (console.error("Error marking all notifications as read:", r), !1);
    }
  }
  async getNotificationsForUser(e, t = !1, r = 50) {
    try {
      const s = async (l) => {
        let c = x
          .from("notifications")
          .select("*")
          .order("timestamp", { ascending: !1 })
          .limit(r);
        return (t || (c = c.or(or(e, !1, l))), await c);
      };
      let o = Ne(),
        { data: n, error: a } = await s(o);
      return (
        a && !t && qt(a) && ((o = Ne()), ({ data: n, error: a } = await s(o))),
        a && !t && Er(a) && ((o = Ne()), ({ data: n, error: a } = await s(o))),
        a
          ? (console.error("Error fetching notifications:", a), [])
          : (n || []).map(this.mapToNotificationItem)
      );
    } catch (s) {
      return (console.error("Unexpected error fetching notifications:", s), []);
    }
  }
  async getNotificationsForAdmin(e = 100) {
    try {
      const { data: t, error: r } = await x
        .from("notifications")
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
      const r = async (a) => {
        let l = x
          .from("notifications")
          .select("*", { count: "exact", head: !0 })
          .eq("is_read", !1);
        return (
          t
            ? ((l = l.is(a, null)),
              Z(`Getting unread count for admin - filter: ${a} IS NULL`))
            : ((l = l.or(or(e, !1, a))),
              Z(
                `Getting unread count for customer ${e} - filter: ${or(e, !1, a)}`,
              )),
          await l
        );
      };
      let s = Ne(),
        { count: o, error: n } = await r(s);
      return (
        n && qt(n) && ((s = Ne()), ({ count: o, error: n } = await r(s))),
        n && Er(n) && ((s = Ne()), ({ count: o, error: n } = await r(s))),
        n
          ? (console.error("Error getting unread count:", n), 0)
          : (Z(
              `Unread count result for ${t ? "admin" : "customer " + e}: ${o}`,
            ),
            o || 0)
      );
    } catch (r) {
      return (console.error("Unexpected error getting unread count:", r), 0);
    }
  }
  createDeduplicationKey(e, t, r, s, o) {
    return [
      e || "system",
      t || "general",
      r || "unknown",
      s || "unknown",
      o || "no-message",
    ].join("|");
  }
  async findDuplicate(e, t, r, s, o) {
    try {
      if (!t || !r || !s) return !1;
      const n = new Date();
      n.setHours(n.getHours() - 24);
      const a = async (f) => {
        let p = x
          .from("notifications")
          .select("id")
          .gte("timestamp", n.toISOString());
        return (
          (p = e ? p.eq(f, e) : p.is(f, null)),
          (p = p.contains("metadata", {
            event_type: t,
            related_entity_type: r,
            related_entity_id: s,
          })),
          o && (p = p.eq("message", o)),
          await p.limit(1)
        );
      };
      let l = Ne(),
        { data: c, error: m } = await a(l);
      return (
        m && qt(m) && ((l = Ne()), ({ data: c, error: m } = await a(l))),
        m
          ? (console.error("Error checking for duplicate notifications:", m),
            !1)
          : (c || []).length > 0
      );
    } catch (n) {
      return (
        console.error("Unexpected error checking for duplicates:", n),
        !1
      );
    }
  }
  mapToNotificationItem(e) {
    return {
      id: e.id,
      message: e.message,
      timestamp: new Date(e.timestamp),
      userId: Qo(e),
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
    switch (e?.toLowerCase()) {
      case "low":
        return X.Low;
      case "medium":
      default:
        return X.Medium;
      case "high":
        return X.High;
      case "critical":
        return X.Critical;
    }
  }
}
const de = nr.getInstance(),
  Kl = async () => {
    try {
      const { data: i, error: e } = await x
        .from("notifications")
        .select("*")
        .limit(1);
      return !e;
    } catch {
      return !1;
    }
  },
  Wl = async () => {
    try {
      const i = ["notifications", "customers", "orders", "consolidations"];
      return !(
        (
          await Promise.all(
            i.map(async (e) => {
              const { data: t, error: r } = await x
                .from(e)
                .select("*")
                .limit(1);
              return r
                ? { table: e, exists: !1, error: r }
                : { table: e, exists: !0, data: t };
            }),
          )
        ).filter((e) => !e.exists).length > 0
      );
    } catch {
      return !1;
    }
  },
  Yo = E.createContext(void 0),
  Xo = () => {
    const i = E.useContext(Yo);
    if (i === void 0)
      throw new Error("useAuth must be used within an AuthProvider");
    return i;
  },
  Jl = ({ children: i }) => {
    const [e, t] = E.useState(null),
      [r, s] = E.useState(!0),
      o = (c) => {
        const m = c;
        return !(!c.email_confirmed_at && !m.confirmed_at);
      };
    E.useEffect(() => {
      n();
      const {
        data: { subscription: c },
      } = x.auth.onAuthStateChange((m, f) => {
        if (f != null && f.user) {
          if (!o(f.user)) return (x.auth.signOut(), void t(null));
          a(f.user).catch((p) => {
            (console.error("Error setting user from auth session:", p),
              t(null));
          });
        } else t(null);
      });
      return () => c.unsubscribe();
    }, []);
    const n = async () => {
        try {
          const {
            data: { session: c },
          } = await x.auth.getSession();
          if (c != null && c.user) {
            if (!o(c.user)) return (await x.auth.signOut(), void t(null));
            await a(c.user);
          }
        } catch (c) {
          console.error("Error getting session:", c);
        } finally {
          s(!1);
        }
      },
      a = async (c) => {
        var m, f, p;
        if (!o(c))
          throw new Error(
            "Please confirm your email address before signing in.",
          );
        let v = "customer",
          T = null;
        try {
          const { data: N, error: D } = await x
            .from("customers")
            .select("*")
            .eq("id", c.id)
            .single();
          if (!D && N != null && N.role) ((v = N.role), (T = N.name));
          else {
            Z("No customer record found, creating one...");
            const A =
                ((m = c.user_metadata) == null ? void 0 : m.name) ||
                "New Customer",
              { error: O } = await x
                .from("customers")
                .insert([
                  {
                    id: c.id,
                    name: A,
                    email: c.email,
                    company_name:
                      ((f = c.user_metadata) == null
                        ? void 0
                        : f.company_name) || "Default Company",
                    role: "customer",
                    phone: "",
                    address: "",
                    notes: "",
                    contract_type_id: "growth",
                    has_used_trial_fee: !0,
                  },
                ]);
            if (O)
              throw (
                console.error("Error creating customer record:", O),
                new Error(
                  "Failed to create user record. Please contact support.",
                )
              );
            ((v = "customer"), (T = A));
          }
        } catch (N) {
          throw (console.error("Error in setUserFromSession:", N), N);
        }
        const P = {
          id: c.id,
          name: T || ((p = c.user_metadata) == null ? void 0 : p.name) || null,
          email: c.email,
          role: v,
        };
        return (t(P), P);
      },
      l = {
        user: e,
        isAuthenticated: !!e,
        loading: r,
        login: async (c, m) => {
          const { data: f, error: p } = await x.auth.signInWithPassword({
            email: c,
            password: m,
          });
          if (p) throw p;
          if (!f.user) throw new Error("Failed to login");
          if (!o(f.user))
            throw (
              await x.auth.signOut(),
              new Error(
                "Please confirm your email before signing in. Check your inbox for the confirmation link.",
              )
            );
          return await a(f.user);
        },
        logout: async () => {
          const { error: c } = await x.auth.signOut();
          if (c) {
            console.warn(
              "Global sign-out failed, forcing local auth cleanup:",
              c,
            );
            try {
              if (typeof window < "u" && window.localStorage) {
                const m =
                  x.auth && typeof x.auth.storageKey == "string"
                    ? x.auth.storageKey
                    : null;
                (m &&
                  (window.localStorage.removeItem(m),
                  window.localStorage.removeItem(`${m}-code-verifier`)),
                  Object.keys(window.localStorage).forEach((f) => {
                    ((f.startsWith("sb-") && f.endsWith("-auth-token")) ||
                      f === "supabase.auth.token") &&
                      window.localStorage.removeItem(f);
                  }));
              }
              await x.auth.signOut({ scope: "local" });
            } catch (m) {
              console.warn("Local auth cleanup fallback failed:", m);
            }
          }
          t(null);
        },
        signUp: async (c, m, f, p, v, T, P) => {
          const N = (() => {
              if (!(typeof window > "u"))
                return `${window.location.origin}/dashboard/`;
            })(),
            { data: D, error: A } = await x.auth.signUp({
              email: c,
              password: m,
              options: {
                emailRedirectTo: N,
                data: {
                  name: f,
                  company_name: p,
                  phone: v,
                  address: T,
                  privacy_consent_accepted: !!P,
                  privacy_consent_accepted_at: P?.acceptedAt,
                  privacy_consent_version: P?.version,
                },
              },
            });
          if (A) throw A;
          if (!D.user) throw new Error("Failed to create user");
          D.session && (await x.auth.signOut());
          const { error: O } = await x
            .from("customers")
            .insert([
              {
                id: D.user.id,
                name: f || "New Customer",
                email: D.user.email,
                company_name: p || "Default Company",
                phone: v || "",
                address: T || "",
                notes: "",
                contract_type_id: "growth",
                has_used_trial_fee: !0,
                role: "customer",
              },
            ]);
          O && console.error("Error creating customer record:", O);
          const { error: j } = await x.auth.resend({
            type: "signup",
            email: c,
            options: { emailRedirectTo: N },
          });
          return (
            j &&
              console.warn(
                "Could not resend signup confirmation email:",
                j.message,
              ),
            {
              id: D.user.id,
              name: f || null,
              email: D.user.email,
              role: "customer",
            }
          );
        },
      };
    return r
      ? d.jsx("div", {
          className: "min-h-screen flex items-center justify-center",
          children: d.jsx("div", {
            className:
              "animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600",
          }),
        })
      : d.jsx(Yo.Provider, { value: l, children: i });
  };
var _e = {};
class ar {
  constructor() {
    this.config = {
      costVarianceNotificationThreshold: 10,
      costVarianceHighAlertThreshold: 25,
      serviceFees: {
        trial: { flatFee: 349 },
        growth: { minimumFee: 350, percentageRate: 0.015 },
        corporate: { minimumFee: 750, percentageRate: 0.01 },
      },
      defaultCostDistributionMethod: "volume_proportional",
      defaultFixedRatePerM3: 100,
      allowMultipleShippingCostTransactions: !0,
      enableShippingCostUpdates: !0,
    };
  }
  static getInstance() {
    return (ar.instance || (ar.instance = new ar()), ar.instance);
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
      case "growth": {
        const s = Number(t || 0);
        return Math.max(r.growth.minimumFee, s * r.growth.percentageRate);
      }
      case "corporate": {
        const s = Number(t || 0);
        return Math.max(r.corporate.minimumFee, s * r.corporate.percentageRate);
      }
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
      (_e.COST_VARIANCE_NOTIFICATION_THRESHOLD &&
        (this.config.costVarianceNotificationThreshold = parseFloat(
          _e.COST_VARIANCE_NOTIFICATION_THRESHOLD,
        )),
      _e.COST_VARIANCE_HIGH_ALERT_THRESHOLD &&
        (this.config.costVarianceHighAlertThreshold = parseFloat(
          _e.COST_VARIANCE_HIGH_ALERT_THRESHOLD,
        )),
      (_e.STARTER_SERVICE_FEE || _e.TRIAL_SERVICE_FEE) &&
        (this.config.serviceFees.trial.flatFee = parseFloat(
          _e.STARTER_SERVICE_FEE || _e.TRIAL_SERVICE_FEE,
        )),
      _e.STANDARD_SERVICE_FEE_MINIMUM &&
        (this.config.serviceFees.growth.minimumFee = parseFloat(
          _e.STANDARD_SERVICE_FEE_MINIMUM,
        )),
      (_e.STANDARD_SERVICE_FEE_RATE || _e.GROWTH_SERVICE_FEE_RATE) &&
        (this.config.serviceFees.growth.percentageRate = parseFloat(
          _e.STANDARD_SERVICE_FEE_RATE || _e.GROWTH_SERVICE_FEE_RATE,
        )),
      _e.ENTERPRISE_SERVICE_FEE_MINIMUM &&
        (this.config.serviceFees.corporate.minimumFee = parseFloat(
          _e.ENTERPRISE_SERVICE_FEE_MINIMUM,
        )),
      (_e.ENTERPRISE_SERVICE_FEE_RATE || _e.CORPORATE_SERVICE_FEE_RATE) &&
        (this.config.serviceFees.corporate.percentageRate = parseFloat(
          _e.ENTERPRISE_SERVICE_FEE_RATE || _e.CORPORATE_SERVICE_FEE_RATE,
        )),
      _e.DEFAULT_COST_DISTRIBUTION_METHOD)
    ) {
      const e = _e.DEFAULT_COST_DISTRIBUTION_METHOD,
        t = e === "proportional" ? "volume_proportional" : e;
      (t === "volume_proportional" || t === "fixed_rate_m3") &&
        (this.config.defaultCostDistributionMethod = t);
    }
    (_e.DEFAULT_FIXED_RATE_PER_M3 &&
      (this.config.defaultFixedRatePerM3 = parseFloat(
        _e.DEFAULT_FIXED_RATE_PER_M3,
      )),
      _e.ALLOW_MULTIPLE_SHIPPING_COST_TRANSACTIONS &&
        (this.config.allowMultipleShippingCostTransactions =
          _e.ALLOW_MULTIPLE_SHIPPING_COST_TRANSACTIONS === "true"),
      _e.ENABLE_SHIPPING_COST_UPDATES &&
        (this.config.enableShippingCostUpdates =
          _e.ENABLE_SHIPPING_COST_UPDATES === "true"));
  }
  saveToEnvironmentFile() {
    return `
# Financial Configuration Settings
COST_VARIANCE_NOTIFICATION_THRESHOLD=${this.config.costVarianceNotificationThreshold}
COST_VARIANCE_HIGH_ALERT_THRESHOLD=${this.config.costVarianceHighAlertThreshold}

# Service Fee Settings
STARTER_SERVICE_FEE=${this.config.serviceFees.trial.flatFee}
STANDARD_SERVICE_FEE_MINIMUM=${this.config.serviceFees.growth.minimumFee}
STANDARD_SERVICE_FEE_RATE=${this.config.serviceFees.growth.percentageRate}
ENTERPRISE_SERVICE_FEE_MINIMUM=${this.config.serviceFees.corporate.minimumFee}
ENTERPRISE_SERVICE_FEE_RATE=${this.config.serviceFees.corporate.percentageRate}

# Cost Distribution Settings
DEFAULT_COST_DISTRIBUTION_METHOD=${this.config.defaultCostDistributionMethod}
DEFAULT_FIXED_RATE_PER_M3=${this.config.defaultFixedRatePerM3}

# Transaction Settings
ALLOW_MULTIPLE_SHIPPING_COST_TRANSACTIONS=${this.config.allowMultipleShippingCostTransactions}
ENABLE_SHIPPING_COST_UPDATES=${this.config.enableShippingCostUpdates}
`.trim();
  }
}
const jr = ar.getInstance();
jr.loadFromEnvironment();
class kt {
  static calculateCostVariance(e, t) {
    const r = t - e;
    return {
      costVariance: r,
      costVariancePercentage: e > 0 ? (r / e) * 100 : 0,
    };
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
    const r = e.filter((n) =>
      n.customerId
        ? n.value < 0
          ? (console.warn(
              `Order ${n.id} has negative value (${n.value}), skipping from distribution`,
            ),
            !1)
          : n.value > 0
        : (console.warn(
            `Order ${n.id} has no customer ID, skipping from distribution`,
          ),
          !1),
    );
    if (r.length === 0)
      throw new Error(
        "Cannot calculate proportional distribution: no valid orders with positive values",
      );
    const s = r.reduce((n, a) => n + a.value, 0),
      o = new Map();
    Z("PROPORTIONAL DISTRIBUTION DEBUG:", {
      totalShippingCost: t,
      totalValue: s,
      orderDetails: r.map((n) => ({
        customerId: n.customerId,
        orderValue: n.value,
        volumeM3: n.volumeM3,
        description: n.description,
      })),
    });
    for (const n of r) {
      const a = n.value / s,
        l = t * a;
      (Z(
        `Customer ${n.customerId}: orderValue=${n.value}, share=${(100 * a).toFixed(2)}%, cost=${l.toFixed(2)}`,
      ),
        o.set(n.customerId, (o.get(n.customerId) || 0) + l));
    }
    return (Z("FINAL DISTRIBUTION:", Object.fromEntries(o)), o);
  }
  static calculateFixedRateDistribution(e, t) {
    const r = new Map();
    for (const s of e) {
      const o = s.volumeM3 * t;
      r.set(s.customerId, (r.get(s.customerId) || 0) + o);
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
      .map((n) => {
        if (!n.customerId)
          return (
            console.warn(
              `Order ${n.id} has no customer ID, skipping from distribution`,
            ),
            null
          );
        const a = Number(n.volumeM3 || 0),
          l = Number(n.weightKG || 0),
          c = Math.max(a, l / 1e3);
        return !Number.isFinite(c) || c <= 0
          ? (console.warn(
              `Order ${n.id} has no positive chargeable units (volume=${n.volumeM3}, weight=${n.weightKG}), skipping from distribution`,
            ),
            null)
          : { order: n, chargeableUnits: c };
      })
      .filter((n) => n !== null);
    if (r.length === 0)
      throw new Error(
        "Cannot calculate volume distribution: no valid orders with positive chargeable units",
      );
    const s = r.reduce((n, a) => n + a.chargeableUnits, 0),
      o = new Map();
    Z("VOLUME-BASED DISTRIBUTION DEBUG:", {
      totalShippingCost: t,
      totalChargeableUnits: s,
      orderDetails: r.map(({ order: n, chargeableUnits: a }) => ({
        customerId: n.customerId,
        volumeM3: n.volumeM3,
        weightKG: n.weightKG,
        chargeableUnits: a,
        orderValue: n.value,
        description: n.description,
      })),
    });
    for (const { order: n, chargeableUnits: a } of r) {
      const l = a / s,
        c = t * l;
      (Z(
        `Customer ${n.customerId}: chargeableUnits=${a.toFixed(3)}, share=${(100 * l).toFixed(2)}%, cost=${c.toFixed(2)}`,
      ),
        o.set(n.customerId, (o.get(n.customerId) || 0) + c));
    }
    return (Z("FINAL VOLUME DISTRIBUTION:", Object.fromEntries(o)), o);
  }
  static calculateContainerUtilization(e, t) {
    const r = vr.find((l) => l.id === t);
    if (!r) return { spacePercentage: 0, weightPercentage: 0 };
    const s = e.reduce((l, c) => l + c.volumeM3, 0),
      o = e.reduce((l, c) => l + c.weightKG, 0),
      n = (s / r.maxVolumeM3) * 100,
      a = (o / r.maxWeightKG) * 100;
    return {
      spacePercentage: Math.min(n, 100),
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
    const s = t || jr.getDefaultFixedRatePerM3(),
      o = this.calculateTotalVolume(e) * s;
    return Math.max(o, r);
  }
  static calculateServiceFee(e, t) {
    return jr.getServiceFee(t, e);
  }
  static calculateCostPerUnit(e, t) {
    const r = this.calculateTotalVolume(t),
      s = this.calculateTotalWeight(t),
      o = this.calculateTotalOrderValue(t);
    return {
      costPerM3: r > 0 ? e / r : 0,
      costPerKG: s > 0 ? e / s : 0,
      costPerDollar: o > 0 ? e / o : 0,
    };
  }
  static validateContainerCapacity(e, t) {
    const r = vr.find((l) => l.id === t);
    if (!r) return { isValid: !1, volumeExcess: 0, weightExcess: 0 };
    const s = this.calculateTotalVolume(e),
      o = this.calculateTotalWeight(e),
      n = Math.max(0, s - r.maxVolumeM3),
      a = Math.max(0, o - r.maxWeightKG);
    return { isValid: n === 0 && a === 0, volumeExcess: n, weightExcess: a };
  }
  static calculateConsolidationSavings(e, t) {
    const r = t.reduce((o, n) => o + n, 0),
      s = r - e;
    return { totalSavings: s, savingsPercentage: r > 0 ? (s / r) * 100 : 0 };
  }
}
var bt = ((i) => (
  (i.COST_DISTRIBUTION_CALCULATED = "cost_distribution_calculated"),
  (i.COST_DISTRIBUTION_RESET = "cost_distribution_reset"),
  (i.COST_DISTRIBUTION_REDISTRIBUTED = "cost_distribution_redistributed"),
  (i.PAYMENT_TRANSACTION_CREATED = "payment_transaction_created"),
  (i.PAYMENT_TRANSACTION_UPDATED = "payment_transaction_updated"),
  (i.PAYMENT_TRANSACTION_DELETED = "payment_transaction_deleted"),
  (i.CONSOLIDATION_SHIPPING_COST_UPDATED =
    "consolidation_shipping_cost_updated"),
  (i.CONSOLIDATION_METHOD_CHANGED = "consolidation_method_changed"),
  (i.CONSOLIDATION_ORDERS_UPDATED = "consolidation_orders_updated"),
  (i.CONSOLIDATION_STATUS_UPDATED = "consolidation_status_updated"),
  (i.CONSOLIDATION_DETAILS_UPDATED = "consolidation_details_updated"),
  (i.ORDER_DETAILS_UPDATED = "order_details_updated"),
  (i.ORDER_STATUS_UPDATED = "order_status_updated"),
  (i.SHIPMENT_CREATED = "shipment_created"),
  (i.SHIPMENT_TRACKING_UPDATED = "shipment_tracking_updated"),
  (i.SHIPMENT_STATUS_UPDATED = "shipment_status_updated"),
  (i.SHIPMENT_DETAILS_UPDATED = "shipment_details_updated"),
  (i.CONFIG_UPDATED = "config_updated"),
  (i.INVALID_ORDER_ADDITION_BLOCKED = "invalid_order_addition_blocked"),
  (i.UNAUTHORIZED_ACCESS_BLOCKED = "unauthorized_access_blocked"),
  i
))(bt || {});
class lr {
  constructor() {
    ((this.auditLogs = []), (this.maxLogSize = 1e4));
  }
  static getInstance() {
    return (lr.instance || (lr.instance = new lr()), lr.instance);
  }
  async logAction(e, t, r, s = {}) {
    const o = {
      id: this.generateId(),
      timestamp: new Date(),
      action: e,
      entityType: t,
      entityId: r,
      ...s,
    };
    return (
      this.auditLogs.push(o),
      this.auditLogs.length > this.maxLogSize &&
        (this.auditLogs = this.auditLogs.slice(-this.maxLogSize)),
      await this.persistToDatabase(o),
      o.id
    );
  }
  async logCostDistribution(e, t, r, s, o) {
    return this.logAction("cost_distribution_calculated", "consolidation", e, {
      userId: o,
      metadata: {
        distributionMethod: t,
        totalShippingCost: r,
        customerShares: Object.fromEntries(s),
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
  async logCostRedistribution(e, t, r, s, o, n) {
    const a = [{ field: "shippingCost", previousValue: t, newValue: r }];
    return this.logAction(
      "cost_distribution_redistributed",
      "consolidation",
      e,
      {
        userId: n,
        changes: a,
        metadata: {
          previousDistribution: Object.fromEntries(s),
          newDistribution: Object.fromEntries(o),
          redistributionTimestamp: new Date().toISOString(),
        },
      },
    );
  }
  async logPaymentTransaction(e, t, r, s) {
    return this.logAction(e, "payment_transaction", t, {
      userId: s,
      newState: r,
      metadata: {
        transactionType: r?.type,
        amount: r?.amount,
        customerId: r?.customer_id,
        consolidationId: r?.related_consolidation_id,
      },
    });
  }
  async logConfigChange(e, t, r) {
    const s = [];
    for (const o in t)
      e[o] !== t[o] &&
        s.push({ field: o, previousValue: e[o], newValue: t[o] });
    return this.logAction("config_updated", "config", "system", {
      userId: r,
      previousState: e,
      newState: t,
      changes: s,
    });
  }
  async logSecurityViolation(e, t, r, s) {
    return this.logAction(e, "order", t, {
      userId: s,
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
      .sort((r, s) => s.timestamp.getTime() - r.timestamp.getTime());
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
const Je = lr.getInstance(),
  Ji = {
    customer: "C",
    order: "O",
    consolidation: "CON",
    payment: "P",
    supplier: "S",
    shipment: "SH",
  },
  Zo = { order: new Map(), consolidation: new Map() },
  si = (i) =>
    typeof i == "string" && i.trim() !== "" ? i.trim().toUpperCase() : null,
  oi = (i, e, t) => {
    if (!i || !e || !t) return;
    const r = Zo[i];
    r && r.set(String(e), t);
  },
  je = (i, e, t = 6) => {
    if (!i || typeof i != "string") return `#${Ji[e]}-N/A`;
    try {
      const r = ((o, n) => {
        if (!o || !n) return null;
        const a = Zo[o];
        return (a && a.get(String(n))) || null;
      })(e, i);
      if (r) return `#${r}`;
      if (/^[A-Z]{3,4}-\d{6}-\d{4,}$/i.test(i)) return `#${i.toUpperCase()}`;
      const s = i.replace(/-/g, "").toUpperCase().slice(-t);
      return `#${Ji[e]}-${s}`;
    } catch (r) {
      return (console.warn("Error formatting UUID:", r), `#${Ji[e]}-ERROR`);
    }
  },
  Ql = async (i, e) => {
    if (!i) return !1;
    try {
      return (await navigator.clipboard.writeText(i), !0);
    } catch (t) {
      console.warn("Failed to copy ID to clipboard:", t);
      try {
        const r = document.createElement("textarea");
        return (
          (r.value = i),
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
  },
  oe = (i) =>
    String(i ?? "")
      .replace(/\s+/g, " ")
      .trim(),
  K = (i) => ((e) => oe(e).toLowerCase())(i) !== "",
  Nr = (i) => {
    const e = [];
    (K(i.originCity) && e.push(oe(i.originCity)),
      K(i.originCountry) && e.push(oe(i.originCountry)));
    const t = [];
    (K(i.destinationCity) && t.push(oe(i.destinationCity)),
      K(i.destinationPort) && t.push(`${oe(i.destinationPort)} Port`),
      K(i.destinationCountry) && t.push(oe(i.destinationCountry)));
    const r = e.join(", "),
      s = t.join(", ");
    return r || s ? `${r || "Origin TBD"} -> ${s || "Destination TBD"}` : "";
  };
class dr {
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
    return (dr.instance || (dr.instance = new dr()), dr.instance);
  }
  async createTransaction(e, t = !1, r) {
    if (e.type === Y.ShippingCost && e.amount > 0)
      throw new Error(
        `Invalid shipping cost amount: ${e.amount}. Shipping costs must be negative or zero values (charges to customers).`,
      );
    if (e.type === Y.IncomingPayment && e.amount <= 0)
      throw new Error(
        `Invalid payment amount: ${e.amount}. Payments must be positive values.`,
      );
    if (
      e.type === Y.ShippingCost &&
      !e.relatedConsolidationId &&
      !e.relatedOrderId
    )
      throw new Error(
        "Shipping cost transactions must have either a related consolidation ID or order ID.",
      );
    if (
      e.type === Y.ShippingCost &&
      e.relatedConsolidationId &&
      !t &&
      !e.idempotencyKey
    ) {
      const n = await this.findDuplicateShippingTransaction(e);
      if (n.length > 0)
        return (Z("Duplicate transaction detected, skipping:", e), n[0]);
    }
    const s = { ...e, id: crypto.randomUUID(), date: new Date().toISOString() };
    Z("[DEBUG] Creating transaction:", {
      type: s.type,
      amount: s.amount,
      customerId: s.customerId,
      consolidationId: s.relatedConsolidationId,
      shipmentId: s.relatedShipmentId,
      description: s.description,
      isAdjustment: t,
      adjustmentReason: r,
    });
    const { error: o } = await x
      .from("payment_transactions")
      .insert([
        {
          id: s.id,
          customer_id: s.customerId,
          amount: s.amount,
          description: s.description,
          type: s.type,
          date: s.date,
          related_order_id: s.relatedOrderId,
          related_consolidation_id: s.relatedConsolidationId,
          related_shipment_id: s.relatedShipmentId,
          idempotency_key: s.idempotencyKey || null,
          is_adjustment: t,
          adjustment_reason: r,
        },
      ]);
    if (o) {
      if (e.idempotencyKey && this.isIdempotencyConflict(o)) {
        const n = await this.findTransactionByIdempotencyKey(e.idempotencyKey);
        if (n) return n;
      }
      throw (
        console.error("Error saving transaction:", o),
        new Error("Failed to save transaction: " + o.message)
      );
    }
    await this.createTransactionNotification(s);
    try {
      await Je.logPaymentTransaction(bt.PAYMENT_TRANSACTION_CREATED, s.id, {
        id: s.id,
        customer_id: s.customerId,
        amount: s.amount,
        description: s.description,
        type: s.type,
        date: s.date,
        related_order_id: s.relatedOrderId,
        related_consolidation_id: s.relatedConsolidationId,
        related_shipment_id: s.relatedShipmentId,
      });
    } catch (n) {
      console.warn("Audit log failed (non-fatal):", n);
    }
    return s;
  }
  normalizeTransactionType(e) {
    const t = String(e || "");
    return t === "Payment"
      ? Y.IncomingPayment
      : t === "Fee"
        ? Y.ServiceFee
        : t === "Refund"
          ? Y.RefundPayout
          : Object.values(Y).includes(t)
            ? t
            : Y.MiscellaneousCost;
  }
  async distributeShippingCost(e, t, r, s, o, n = !1, a) {
    Z("[DEBUG] Distribution code path reached");
    const { data: l, error: c } = await x
      .from("consolidations")
      .select("*")
      .eq("id", e)
      .single();
    if (c || !l)
      throw (
        console.error(
          "\xE2\x9D\u0152 Failed to fetch fresh consolidation data:",
          c,
        ),
        new Error("Failed to fetch consolidation data for distribution")
      );
    const m = {
        ...r,
        costDistributionMethod: l.cost_distribution_method,
        fixedRatePerM3: l.fixed_rate_per_m3,
        shippingCostDistributed: l.shipping_cost_distributed,
      },
      f = s.filter((p) => r.orderIds.includes(p.id));
    if (
      (f.reduce((p, v) => p + v.value, 0),
      Z("[DEBUG] Distribution method selection:", {
        consolidationId: e,
        oldMethod: r.costDistributionMethod,
        freshMethod: m.costDistributionMethod,
        costDistributionMethodType: typeof m.costDistributionMethod,
        fixedRatePerM3: m.fixedRatePerM3,
        consolidationName: m.name,
        whichPathWillTake:
          m.costDistributionMethod === "fixed_rate_m3"
            ? "FIXED_RATE"
            : m.costDistributionMethod === "proportional"
              ? "LEGACY_PROPORTIONAL_CONVERTED_TO_VOLUME"
              : m.costDistributionMethod === "volume_proportional"
                ? "VOLUME_BASED"
                : "UNKNOWN",
      }),
      m.costDistributionMethod === "fixed_rate_m3" && m.fixedRatePerM3)
    ) {
      const p = kt.calculateFixedRateDistribution(f, m.fixedRatePerM3);
      (await Je.logCostDistribution(e, "fixed_rate_m3", t, p),
        await this.distributeFixedRateShipping(e, t, m, f, o, n, a));
    } else if (m.costDistributionMethod === "proportional") {
      Z(
        "[DEBUG] Legacy proportional method detected; using volume-based distribution",
      );
      const p = kt.calculateVolumeProportionalDistribution(f, t);
      (await Je.logCostDistribution(e, "volume_proportional", t, p),
        await this.distributeVolumeProportionalShipping(e, t, m, f, o, n, a));
    } else if (m.costDistributionMethod === "volume_proportional") {
      (Z("[DEBUG] Using volume-based distribution"),
        Z(
          "[DEBUG] Orders for volume calculation:",
          f.map((v) => ({
            id: v.id,
            customerId: v.customerId,
            description: v.description,
            volumeM3: v.volumeM3,
            value: v.value,
          })),
        ));
      const p = kt.calculateVolumeProportionalDistribution(f, t);
      (await Je.logCostDistribution(e, "volume_proportional", t, p),
        await this.distributeVolumeProportionalShipping(e, t, m, f, o, n, a));
    } else {
      console.warn(
        "[WARN] Unknown distribution method, defaulting to volume-based:",
        m.costDistributionMethod,
      );
      const p = kt.calculateVolumeProportionalDistribution(f, t);
      (await Je.logCostDistribution(e, "volume_proportional", t, p),
        await this.distributeVolumeProportionalShipping(e, t, m, f, o, n, a));
    }
  }
  async createSingleCustomerShippingCost(e, t, r, s, o) {
    return await this.createTransaction({
      customerId: r,
      type: Y.ShippingCost,
      description: `Shipping cost for consolidation: ${je(e, "consolidation")}`,
      amount: -Math.abs(t),
      relatedConsolidationId: e,
      relatedShipmentId: o,
      idempotencyKey: this.buildShippingChargeIdempotencyKey({
        consolidationId: e,
        shipmentId: o,
        customerId: r,
        distributionMethod: "single_customer",
        amount: t,
      }),
    });
  }
  calculateCostVariance(e, t) {
    const r = t - e;
    return {
      costVariance: r,
      costVariancePercentage: e > 0 ? (r / e) * 100 : 0,
    };
  }
  async createIncomingPayment(e, t, r) {
    return await this.createTransaction({
      customerId: e,
      type: Y.IncomingPayment,
      description: r,
      amount: Math.abs(t),
    });
  }
  async createRefundPayout(e, t, r) {
    return await this.createTransaction({
      customerId: e,
      type: Y.RefundPayout,
      description: r,
      amount: -Math.abs(t),
    });
  }
  async createMiscellaneousCost(e, t, r, s, o) {
    return await this.createTransaction({
      customerId: e,
      type: Y.MiscellaneousCost,
      description: r,
      amount: -Math.abs(t),
      relatedOrderId: s,
      relatedConsolidationId: o,
    });
  }
  async fetchAllTransactions() {
    const { data: e, error: t } = await x
      .from("payment_transactions")
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
        customerId: s = null,
        isAdmin: o = !1,
        searchTerm: n = "",
        type: a = "all",
      } = e,
      l = Math.max(1, t),
      c = Math.max(1, Math.min(100, r)),
      m = (l - 1) * c,
      f = m + c - 1,
      p = String(n || "").trim();
    if (p) {
      let D = x
        .from("payment_transactions")
        .select("*")
        .order("date", { ascending: !1 });
      if (o) s && (D = D.eq("customer_id", s));
      else {
        if (!s) return { transactions: [], totalCount: 0 };
        D = D.eq("customer_id", s);
      }
      a && a !== "all" && (D = D.eq("type", a));
      const { data: A, error: O } = await D;
      if (O)
        throw (
          console.error("Error fetching paginated transactions:", O),
          new Error("Failed to fetch paginated transactions")
        );
      const j = p.toLowerCase(),
        W = Object.values(Y).filter((ge) => ge.toLowerCase().includes(j)),
        ee =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            p,
          ),
        ie = (A || []).filter((ge) => {
          const ue = String(ge.description || "")
              .toLowerCase()
              .includes(j),
            ne = W.includes(String(ge.type || "")),
            ye =
              ee &&
              [
                ge.id,
                ge.customer_id,
                ge.related_order_id,
                ge.related_consolidation_id,
                ge.related_shipment_id,
              ].some((U) => String(U || "").toLowerCase() === j);
          return ue || ne || ye;
        });
      return {
        transactions: ie.slice(m, f + 1).map(this.transformDatabaseTransaction),
        totalCount: ie.length,
      };
    }
    let v = x
      .from("payment_transactions")
      .select("*", { count: "exact" })
      .order("date", { ascending: !1 })
      .range(m, f);
    if (o) s && (v = v.eq("customer_id", s));
    else {
      if (!s) return { transactions: [], totalCount: 0 };
      v = v.eq("customer_id", s);
    }
    a && a !== "all" && (v = v.eq("type", a));
    const { data: T, error: P, count: N } = await v;
    if (P)
      throw (
        console.error("Error fetching paginated transactions:", P),
        new Error("Failed to fetch paginated transactions")
      );
    return {
      transactions: (T || []).map(this.transformDatabaseTransaction),
      totalCount: N || 0,
    };
  }
  async getByCustomerId(e) {
    if (!e) return [];
    const { data: t, error: r } = await x
      .from("payment_transactions")
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
    const { error: t } = await x
      .from("payment_transactions")
      .delete()
      .eq("id", e);
    if (t)
      throw (
        console.error("Error deleting transaction:", t),
        new Error("Failed to delete transaction")
      );
    try {
      await Je.logPaymentTransaction(bt.PAYMENT_TRANSACTION_DELETED, e, {
        id: e,
      });
    } catch (r) {
      console.warn("Audit log failed (non-fatal):", r);
    }
  }
  async findDuplicateShippingTransaction(e) {
    const { data: t, error: r } = await x
      .from("payment_transactions")
      .select("*")
      .eq("customer_id", e.customerId)
      .eq("related_consolidation_id", e.relatedConsolidationId)
      .eq("type", Y.ShippingCost)
      .eq("amount", e.amount)
      .gte("date", new Date(Date.now() - 6e4).toISOString());
    return r
      ? (console.error("Error checking for duplicates:", r), [])
      : (t || []).map(this.transformDatabaseTransaction);
  }
  isIdempotencyConflict(e) {
    const t = String(e?.message || "").toLowerCase(),
      r = String(e?.details || "").toLowerCase();
    return (
      e?.code === "23505" &&
      (t.includes("idempotency") ||
        r.includes("idempotency") ||
        t.includes("uniq_payment_transactions_idempotency_key"))
    );
  }
  async findTransactionByIdempotencyKey(e) {
    const { data: t, error: r } = await x
      .from("payment_transactions")
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
      s = Math.abs(e.amount).toFixed(2);
    return `shipping-charge:${t}:${e.distributionMethod}:${e.customerId}:${r}:${s}`;
  }
  async distributeFixedRateShipping(e, t, r, s, o, n = !1, a) {
    const l = new Map();
    let c = 0;
    for (const f of s) {
      const p = f.volumeM3 * (r.fixedRatePerM3 || 0);
      (l.set(f.customerId, (l.get(f.customerId) || 0) + p), (c += p));
    }
    for (const [f, p] of l)
      p > 0 &&
        (await this.createTransaction(
          {
            customerId: f,
            type: Y.ShippingCost,
            description: `Fixed rate shipping cost for consolidation: ${je(r.id, "consolidation")}`,
            amount: -Math.abs(p),
            relatedConsolidationId: e,
            relatedShipmentId: o,
            idempotencyKey: this.buildShippingChargeIdempotencyKey({
              consolidationId: e,
              shipmentId: o,
              customerId: f,
              distributionMethod: "fixed_rate_m3",
              amount: p,
              isAdjustment: n,
            }),
          },
          n,
          a,
        ));
    if (c > 0) {
      Z(`[DEBUG] Updating consolidation ${e} with total_billed_amount: ${c}`);
      const { error: f } = await x
        .from("consolidations")
        .update({ total_billed_amount: c })
        .eq("id", e);
      f
        ? console.error("Error updating total_billed_amount:", f)
        : Z(`[DEBUG] Updated total_billed_amount for consolidation ${e}`);
    }
    const m = Number((c - Math.abs(t || 0)).toFixed(2));
    Math.abs(m) > 0.009 &&
      (await this.createTransaction(
        {
          customerId: null,
          type: Y.MiscellaneousCost,
          description: `Fixed-rate shipping variance for consolidation ${je(r.id, "consolidation")} (billed $${c.toFixed(2)} vs actual $${Math.abs(t || 0).toFixed(2)})`,
          amount: m,
          relatedConsolidationId: e,
          relatedShipmentId: o,
          idempotencyKey: `shipping-variance:shipment:${o || "none"}:consolidation:${e}`,
        },
        n,
        a,
      ));
  }
  async distributeProportionalShipping(e, t, r, s, o) {
    try {
      const n = kt.calculateProportionalDistribution(s, t);
      for (const [a, l] of n) {
        const c = -Math.abs(l);
        c < 0 &&
          (await this.createTransaction({
            customerId: a,
            type: Y.ShippingCost,
            description: `Proportional shipping cost for consolidation: ${je(r.id, "consolidation")}`,
            amount: c,
            relatedConsolidationId: e,
            idempotencyKey: this.buildShippingChargeIdempotencyKey({
              consolidationId: e,
              customerId: a,
              distributionMethod: "legacy_proportional",
              amount: l,
            }),
          }));
      }
    } catch (n) {
      throw (
        console.error(
          `Error distributing proportional shipping cost for consolidation ${e}:`,
          n,
        ),
        n
      );
    }
  }
  async distributeVolumeProportionalShipping(e, t, r, s, o, n = !1, a) {
    try {
      const l = kt.calculateVolumeProportionalDistribution(s, t);
      for (const [c, m] of l) {
        const f = -Math.abs(m);
        f < 0 &&
          (await this.createTransaction(
            {
              customerId: c,
              type: Y.ShippingCost,
              description: `Volume-based shipping cost for consolidation: ${je(r.id, "consolidation")}`,
              amount: f,
              relatedConsolidationId: e,
              relatedShipmentId: o,
              idempotencyKey: this.buildShippingChargeIdempotencyKey({
                consolidationId: e,
                shipmentId: o,
                customerId: c,
                distributionMethod: "volume_proportional",
                amount: m,
                isAdjustment: n,
              }),
            },
            n,
            a,
          ));
      }
    } catch (l) {
      throw (
        console.error(
          `Error distributing volume-based shipping cost for consolidation ${e}:`,
          l,
        ),
        l
      );
    }
  }
  async createTransactionNotification(e) {
    if (!e.customerId) return;
    let t = "Fee";
    (e.type === Y.ShippingCost
      ? (t = "Shipping Cost")
      : e.type === Y.OrderCostReversal ||
          e.type === Y.ServiceFeeReversal ||
          e.type === Y.ShippingCostReversal
        ? (t = "Reversal")
        : e.type === Y.RefundPayout
          ? (t = "Refund")
          : e.type === Y.ServiceFee
            ? (t = "Service Fee")
            : e.type === Y.OrderCost
              ? (t = "Order Cost")
              : e.type === Y.IncomingPayment && (t = "Payment"),
      await de.createPaymentNotification(
        e.customerId,
        e.amount,
        t,
        e.description,
        e.id,
      ));
  }
}
const ze = dr.getInstance();
class cr {
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
    return (cr.instance || (cr.instance = new cr()), cr.instance);
  }
  async fetchAll() {
    const { data: e, error: t } = await x
      .from("shipments")
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
        currentCustomerId: s = null,
        isAdmin: o = !1,
        query: n = "",
        type: a = "all",
        customerFilterId: l = null,
      } = e,
      c = Math.max(1, t),
      m = Math.max(1, Math.min(100, r)),
      f = (c - 1) * m,
      p = f + m - 1;
    let v = x
      .from("shipments")
      .select("*", { count: "exact" })
      .order("shipped_date", { ascending: !1 })
      .range(f, p);
    if (o)
      l &&
        l !== "all" &&
        (v = v.or(`customer_id.eq.${l},involved_customer_ids.cs.{${l}}`));
    else {
      if (!s) return { shipments: [], totalCount: 0 };
      v = v.or(`customer_id.eq.${s},involved_customer_ids.cs.{${s}}`);
    }
    a && a !== "all" && (v = v.eq("type", a));
    const T = String(n || "").trim();
    if (T) {
      const A = T.replace(/[%_,]/g, "\\$&");
      v = v.ilike("description", `%${A}%`);
    }
    const { data: P, error: N, count: D } = await v;
    if (N)
      throw (
        console.error("Error fetching paginated shipments:", N),
        new Error("Failed to fetch paginated shipments")
      );
    return {
      shipments: (P || []).map(this.transformDatabaseShipment),
      totalCount: D || 0,
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
      { data: r, error: s } = await x
        .from("shipments")
        .insert([t])
        .select()
        .single();
    if (s)
      throw (
        console.error("Error creating shipment:", s),
        new Error("Failed to create shipment")
      );
    const o = this.transformDatabaseShipment(r);
    return (
      await this.createShipmentNotifications(
        o.id,
        o.customerId,
        o.involvedCustomerIds,
        o.description,
        String(o.status),
      ),
      o
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
    const { data: s, error: o } = await x
      .from("shipments")
      .update(r)
      .eq("id", e)
      .select()
      .single();
    if (o)
      throw (
        console.error("Error updating shipment:", o),
        new Error("Failed to update shipment")
      );
    return this.transformDatabaseShipment(s);
  }
  async updateStatus(e, t, r) {
    const s = r.status,
      o = String(t),
      n = String(s || ""),
      a = String(r?.type || "individual");
    if (
      !((m, f, p) =>
        Oi(f, p, (v) =>
          ((T, P) => (T === "consolidation" ? Ni(P) : Ei(P)))(m, v),
        ))(a, n, o)
    )
      throw new Error(
        `Invalid shipment status transition for ${a}: ${n} -> ${o}`,
      );
    Z("Updating shipment status:", {
      shipmentId: e,
      oldStatus: s,
      newStatus: t,
    });
    const l = Kr(t) || Kr(o),
      c = await this.update(e, {
        status: t,
        ...(l ? { actualDelivery: new Date().toISOString() } : {}),
      });
    return (
      c &&
        (await this.createShipmentNotifications(
          e,
          r.customerId,
          r.involvedCustomerIds,
          r.description,
          String(t),
        )),
      Z(`[DEBUG] Shipment ${e} status updated: ${s} -> ${t}`),
      c
    );
  }
  async updateTracking(e, t, r) {
    await this.update(e, { carrier: t, trackingUrl: r });
    const s = await this.getById(e);
    s &&
      (await this.createShipmentNotifications(
        e,
        s.customerId,
        s.involvedCustomerIds,
        `Tracking updated for ${s.description}`,
        `Carrier: ${t}`,
      ));
  }
  async getById(e) {
    const { data: t, error: r } = await x
      .from("shipments")
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
    const { data: t, error: r } = await x
      .from("shipments")
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
    const { data: t, error: r } = await x
      .from("shipments")
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
    const { data: t, error: r } = await x
      .from("shipments")
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
    const { data: t, error: r } = await x
      .from("shipments")
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
    const { data: t, error: r } = await x
      .from("shipments")
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
        _.InTransit,
        _.CustomsClearance,
        _.OutForDelivery,
        "InTransit",
        "CustomsClearance",
        "OutForDelivery",
      ],
      { data: t, error: r } = await x
        .from("shipments")
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
    const e = [g.Delivered, g.Completed, _.Delivered, _.Completed],
      { data: t, error: r } = await x
        .from("shipments")
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
    const { error: t } = await x.from("shipments").delete().eq("id", e);
    if (t)
      throw (
        console.error("Error deleting shipment:", t),
        new Error("Failed to delete shipment")
      );
    await de.createAdminNotification("Shipment has been deleted", {
      importance: X.Low,
      linkToPage: "shipments",
    });
  }
  async existsForRelatedId(e, t) {
    let r = x.from("shipments").select("id").eq("type", t).limit(1);
    r =
      t === "consolidation"
        ? r.or(`related_id.eq.${e},consolidation_id.eq.${e}`)
        : t === "individual"
          ? r.or(`related_id.eq.${e},order_id.eq.${e}`)
          : r.eq("related_id", e);
    const { data: s, error: o } = await r;
    return o
      ? (console.error("Error checking shipment existence:", o), !1)
      : (s || []).length > 0;
  }
  async getStatistics() {
    const [e, t, r, s, o] = await Promise.all([
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
      individual: s.length,
      consolidation: o.length,
    };
  }
  async createShipmentNotifications(e, t, r, s, o) {
    const n = await de.createShipmentNotification(e, t, r, s, o);
    Z(`Created ${n.length} shipment notifications`);
  }
}
const wt = cr.getInstance();
class ur {
  constructor() {
    this.transformDatabaseOrder = (e) => {
      const t = si(e.order_code);
      return (
        t && oi("order", e.id, t),
        {
          id: e.id,
          code: t,
          description: e.description,
          value: e.value,
          supplierId: e.supplier_id,
          volumeM3: e.volume_m3,
          weightKG: e.weight_kg,
          customerId: e.customer_id,
          status: e.status,
          notes: e.notes,
          requestedSupplierName: e.requested_supplier_name || "",
          creationDate: e.creation_date,
          originCountry: e.origin_country || "",
          originCity: e.origin_city || "",
          destinationCountry: e.destination_country || "",
          destinationCity: e.destination_city || "",
          destinationPort: e.destination_port || "",
          readyDate: e.ready_date || "",
          chargesApplied: !!e.charges_applied,
        }
      );
    };
  }
  static getInstance() {
    return (ur.instance || (ur.instance = new ur()), ur.instance);
  }
  async fetchAll() {
    const { data: e, error: t } = await x
      .from("orders")
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
        searchTerm: s = "",
        supplierId: o = null,
        status: n = "",
        customerId: a = null,
        isAdmin: l = !1,
      } = e,
      c = Math.max(1, t),
      m = Math.max(1, Math.min(100, r)),
      f = (c - 1) * m,
      p = f + m - 1;
    let v = x
      .from("orders")
      .select("*", { count: "exact" })
      .order("creation_date", { ascending: !1 })
      .range(f, p);
    (a && (v = v.eq("customer_id", a)),
      o && (v = v.eq("supplier_id", o)),
      n && (v = v.eq("status", n)));
    const T = s.trim();
    if (T) {
      const A = T.replace(/[%_,]/g, "\\$&");
      v = v.ilike("description", `%${A}%`);
    }
    const { data: P, error: N, count: D } = await v;
    if (N)
      throw (
        console.error("Error fetching paginated orders:", N),
        new Error("Failed to fetch paginated orders")
      );
    return {
      orders: (P || []).map(this.transformDatabaseOrder),
      totalCount: D || 0,
    };
  }
  async create(e) {
    const t = {
        description: e.description,
        value: e.value,
        supplier_id: e.supplierId,
        requested_supplier_name: K(e.requestedSupplierName)
          ? String(e.requestedSupplierName).trim()
          : null,
        volume_m3: e.volumeM3,
        weight_kg: e.weightKG,
        customer_id: e.customerId,
        status: e.status,
        notes: e.notes,
        origin_country: K(e.originCountry) ? oe(e.originCountry) : null,
        origin_city: K(e.originCity) ? oe(e.originCity) : null,
        destination_country: K(e.destinationCountry)
          ? oe(e.destinationCountry)
          : null,
        destination_city: K(e.destinationCity) ? oe(e.destinationCity) : null,
        destination_port: K(e.destinationPort) ? oe(e.destinationPort) : null,
        ready_date: K(e.readyDate) ? e.readyDate : null,
        creation_date: new Date().toISOString(),
      },
      { data: r, error: s } = await x
        .from("orders")
        .insert([t])
        .select()
        .single();
    if (s)
      throw (
        console.error("Error creating order:", s),
        new Error("Failed to create order")
      );
    const o = this.transformDatabaseOrder(r);
    return (
      await de.createCustomerNotification(
        e.customerId,
        `New order "${e.description}" has been created`,
        { importance: X.Medium, linkToPage: "orders", linkToId: o.id },
      ),
      await de.createAdminNotification(
        `New order "${e.description}" created for customer`,
        { importance: X.Low, linkToPage: "orders", linkToId: o.id },
      ),
      o
    );
  }
  async update(e, t) {
    const r = {};
    (t.description !== void 0 && (r.description = t.description),
      t.value !== void 0 && (r.value = t.value),
      t.supplierId !== void 0 && (r.supplier_id = t.supplierId),
      t.requestedSupplierName !== void 0 &&
        (r.requested_supplier_name = K(t.requestedSupplierName)
          ? String(t.requestedSupplierName).trim()
          : null),
      t.volumeM3 !== void 0 && (r.volume_m3 = t.volumeM3),
      t.weightKG !== void 0 && (r.weight_kg = t.weightKG),
      t.customerId !== void 0 && (r.customer_id = t.customerId),
      t.status !== void 0 && (r.status = t.status),
      t.notes !== void 0 && (r.notes = t.notes),
      t.originCountry !== void 0 &&
        (r.origin_country = K(t.originCountry) ? oe(t.originCountry) : null),
      t.originCity !== void 0 &&
        (r.origin_city = K(t.originCity) ? oe(t.originCity) : null),
      t.destinationCountry !== void 0 &&
        (r.destination_country = K(t.destinationCountry)
          ? oe(t.destinationCountry)
          : null),
      t.destinationCity !== void 0 &&
        (r.destination_city = K(t.destinationCity)
          ? oe(t.destinationCity)
          : null),
      t.destinationPort !== void 0 &&
        (r.destination_port = K(t.destinationPort)
          ? oe(t.destinationPort)
          : null),
      t.readyDate !== void 0 &&
        (r.ready_date = K(t.readyDate) ? t.readyDate : null));
    const { data: s, error: o } = await x
      .from("orders")
      .update(r)
      .eq("id", e)
      .select()
      .single();
    if (o)
      throw (
        console.error("Error updating order:", o),
        new Error("Failed to update order")
      );
    return this.transformDatabaseOrder(s);
  }
  async updateStatus(e, t, r, s, o) {
    const n = String(r || "").trim(),
      a = String(t || "").trim();
    if (!((l, c) => Oi(l, c, Ei))(n, a))
      throw new Error(`Invalid order status transition: ${n} -> ${a}`);
    (await this.update(e, { status: t }),
      await de.createOrderStatusNotification(e, String(r), String(t), o, s),
      await de.createSystemNotification(
        `Order "${s}" status changed to ${String(t)}`,
        { linkToPage: "orders", linkToId: e },
      ));
  }
  async createIndividualShipment(e, t, r, s, o, n, a, l) {
    const c = await wt.create({
      type: "individual",
      relatedId: e,
      carrier: r,
      trackingUrl: s,
      estimatedDelivery: l,
      description: `Individual Order: ${je(o.id, "order")}`,
      status: g.InTransit,
      customerId: o.customerId,
      involvedCustomerIds: [o.customerId],
      isMixed: !1,
      origin: n,
      destination: a,
      consolidationId: null,
      orderId: e,
    });
    (await this.update(e, { status: g.InTransit }),
      t > 0 &&
        (await ze.createTransaction({
          customerId: o.customerId,
          type: "ShippingCost",
          description: `Individual shipping cost for order: ${je(o.id, "order")}`,
          amount: -Math.abs(t),
          relatedOrderId: e,
          relatedShipmentId: c.id,
          idempotencyKey: `shipping-charge:shipment:${c.id}:individual_order:${o.customerId}:${Math.abs(t).toFixed(2)}`,
        })));
    try {
      const { data: m, error: f } = await x
        .from("customers")
        .select("contract_type_id, has_used_trial_fee")
        .eq("id", o.customerId)
        .single();
      if (f) throw f;
      const p = String(m?.contract_type_id || lt.Growth),
        v =
          ((mt[p] == null ? void 0 : mt[p].name) || String(p)).trim() ||
          "Standard",
        { data: T, error: P } = await x
          .from("payment_transactions")
          .select("type,amount")
          .eq("related_order_id", e)
          .in("type", [Y.ServiceFee, Y.ServiceFeeReversal]);
      if (P) throw P;
      const N = (T || []).reduce(
          (W, ee) =>
            ee.type === Y.ServiceFee ? W + Math.abs(Number(ee.amount || 0)) : W,
          0,
        ),
        D = (T || []).reduce(
          (W, ee) =>
            ee.type === Y.ServiceFeeReversal
              ? W + Math.abs(Number(ee.amount || 0))
              : W,
          0,
        ),
        A = Math.max(0, N - D);
      let O = Number(kt.calculateServiceFee(o.value, p) || 0);
      (Number.isFinite(O) || (O = 0), (O = Math.max(0, O)));
      const j = Math.max(0, O - A);
      (j > 0.01 &&
        (await ze.createTransaction({
          customerId: o.customerId,
          type: Y.ServiceFee,
          description: `Service fee for order ${je(o.id, "order")} (${v} plan)`,
          amount: -Math.abs(j),
          relatedOrderId: e,
          relatedShipmentId: c.id,
          idempotencyKey: `service-fee:shipment:${c.id}:order:${e}:${Math.abs(j).toFixed(2)}`,
        })),
        p === lt.Trial &&
          (m == null || !m.has_used_trial_fee) &&
          (await x
            .from("customers")
            .update({ has_used_trial_fee: !0 })
            .eq("id", o.customerId)));
    } catch (m) {
      console.warn(
        "Non-fatal: failed to apply deferred service fee for individual shipment",
        m,
      );
    }
    return (
      await this.updateStatus(
        e,
        g.InTransit,
        o.status,
        o.description,
        o.customerId,
      ),
      c
    );
  }
  async delete(e) {
    const { error: t } = await x.from("orders").delete().eq("id", e);
    if (t)
      throw (
        console.error("Error deleting order:", t),
        new Error("Failed to delete order")
      );
    await de.createAdminNotification("Order has been deleted", {
      importance: X.Low,
      linkToPage: "orders",
    });
  }
  async getByCustomerId(e) {
    const { data: t, error: r } = await x
      .from("orders")
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
    const { data: t, error: r } = await x
      .from("orders")
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
    const { data: t, error: r } = await x
      .from("orders")
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
    return this.getByStatus(g.Processing);
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
    const t = [],
      r = String(e == null ? void 0 : e.status || "");
    return (
      e.customerId || t.push("Customer is required"),
      (!e.description || e.description.trim() === "") &&
        t.push("Order description is required"),
      !e.supplierId &&
        !K(e.requestedSupplierName) &&
        t.push("Supplier is required"),
      r !== g.Draft &&
        ((!e.value || e.value <= 0) &&
          t.push("Order value must be greater than 0"),
        (!e.volumeM3 || e.volumeM3 <= 0) &&
          t.push("Volume must be greater than 0"),
        (!e.weightKG || e.weightKG <= 0) &&
          t.push("Weight must be greater than 0")),
      r === g.Submitted &&
        (!K(e.destinationCountry) || !K(e.destinationCity)) &&
        t.push("Destination country/city are required for submitted orders"),
      { isValid: t.length === 0, errors: t }
    );
  }
  validateOrderForConsolidation(e, t) {
    const r = [];
    return (
      Ti.includes(e.status) ||
        r.push(
          `Order cannot be added to consolidation: status '${e.status}' is not eligible. Orders must be in ${Ti.join(", ")} status.`,
        ),
      { isValid: r.length === 0, errors: r }
    );
  }
  async getOrdersEligibleForConsolidation() {
    return (await this.fetchAll()).filter(
      (e) => this.validateOrderForConsolidation(e).isValid,
    );
  }
}
const Bt = ur.getInstance();
class hr {
  constructor() {
    this.transformDatabaseConsolidation = (e) => {
      const t = si(e.consolidation_code),
        r = typeof e.name == "string" ? e.name.trim() : "",
        s = r || "Consolidation";
      return (
        t && oi("consolidation", e.id, t),
        {
          id: e.id,
          code: t,
          manualName: r,
          name: s,
          route:
            e.route ||
            Nr({
              originCountry: e.origin_country,
              originCity: e.origin_city,
              destinationCountry: e.destination_country,
              destinationCity: e.destination_city,
              destinationPort: e.destination_port,
            }),
          originCountry: e.origin_country || "",
          originCity: e.origin_city || "",
          destinationCountry: e.destination_country || "",
          destinationCity: e.destination_city || "",
          destinationPort: e.destination_port || "",
          departureDate: e.departure_date,
          creationDate: e.creation_date,
          orderIds: e.order_ids || [],
          containerTypeId: e.container_type_id,
          containerSpaceFilledPercentage:
            e.container_space_filled_percentage || 0,
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
        }
      );
    };
  }
  static getInstance() {
    return (hr.instance || (hr.instance = new hr()), hr.instance);
  }
  async fetchAll() {
    const { data: e, error: t } = await x
      .from("consolidations_with_orders")
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
    const { data: t, error: r } = await x
      .from("consolidations_with_orders")
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
  async create(e, t, r, s, o, n) {
    Z("[DEBUG] Creating consolidation:", {
      name: e.name,
      estimatedShippingCost: t,
      estimatedShippingCostType: typeof t,
      isMixed: s,
      customerId: r,
      costDistributionMethod: o,
    });
    const a = Nr(e),
      l = {
        name: typeof e.name == "string" ? e.name.trim() : "",
        route: e.route || a,
        origin_country: K(e.originCountry) ? oe(e.originCountry) : null,
        origin_city: K(e.originCity) ? oe(e.originCity) : null,
        destination_country: K(e.destinationCountry)
          ? oe(e.destinationCountry)
          : null,
        destination_city: K(e.destinationCity) ? oe(e.destinationCity) : null,
        destination_port: K(e.destinationPort) ? oe(e.destinationPort) : null,
        departure_date: e.departureDate,
        creation_date: new Date().toISOString(),
        container_type_id: e.containerTypeId,
        estimated_shipping_cost: t > 0 ? t : null,
        status: _.Planning,
        is_mixed: s,
        customer_id: r,
        involved_customer_ids: s ? [] : r ? [r] : [],
        shipping_cost_distributed: !1,
        cost_distribution_method: o || "volume_proportional",
        fixed_rate_per_m3: n,
        notes: e.notes,
      },
      { data: c, error: m } = await x
        .from("consolidations")
        .insert([l])
        .select()
        .single();
    if (m)
      throw (
        console.error("Error creating consolidation:", m),
        new Error("Failed to create consolidation")
      );
    const f = this.transformDatabaseConsolidation(c);
    return (
      !s &&
        r &&
        (await de.createCustomerNotification(
          r,
          `New consolidation "${f.name}" has been created for your orders`,
          {
            importance: X.Medium,
            linkToPage: "consolidations",
            linkToId: f.id,
          },
        )),
      await de.createAdminNotification(
        `New ${s ? "mixed" : "single-customer"} consolidation "${f.name}" created`,
        { importance: X.Low, linkToPage: "consolidations", linkToId: f.id },
      ),
      f
    );
  }
  async update(e, t) {
    const r = {};
    if (
      (t.name !== void 0 &&
        (r.name = typeof t.name == "string" ? t.name.trim() : ""),
      t.route !== void 0 && (r.route = t.route),
      t.originCountry !== void 0 &&
        (r.origin_country = K(t.originCountry) ? oe(t.originCountry) : null),
      t.originCity !== void 0 &&
        (r.origin_city = K(t.originCity) ? oe(t.originCity) : null),
      t.destinationCountry !== void 0 &&
        (r.destination_country = K(t.destinationCountry)
          ? oe(t.destinationCountry)
          : null),
      t.destinationCity !== void 0 &&
        (r.destination_city = K(t.destinationCity)
          ? oe(t.destinationCity)
          : null),
      t.destinationPort !== void 0 &&
        (r.destination_port = K(t.destinationPort)
          ? oe(t.destinationPort)
          : null),
      t.departureDate !== void 0 && (r.departure_date = t.departureDate),
      t.containerTypeId !== void 0 && (r.container_type_id = t.containerTypeId),
      t.status !== void 0 && (r.status = t.status),
      t.notes !== void 0 && (r.notes = t.notes),
      t.shippingCost !== void 0 &&
        ((r.shipping_cost = t.shippingCost),
        t.estimatedShippingCost !== void 0))
    )
      if (t.estimatedShippingCost > 0) {
        const { costVariance: n, costVariancePercentage: a } =
          ze.calculateCostVariance(t.estimatedShippingCost, t.shippingCost);
        ((r.cost_variance = n), (r.cost_variance_percentage = a));
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
    const { data: s, error: o } = await x
      .from("consolidations")
      .update(r)
      .eq("id", e)
      .select()
      .single();
    if (o)
      throw (
        console.error("Error updating consolidation:", o),
        new Error("Failed to update consolidation")
      );
    return this.transformDatabaseConsolidation(s);
  }
  async updateStatus(e, t, r) {
    const s = String(r.status || "").trim(),
      o = String(t || "").trim();
    if (!((n, a) => Oi(n, a, Ni))(s, o))
      throw new Error(`Invalid consolidation status transition: ${s} -> ${o}`);
    await this.update(e, { status: t });
    for (const n of r.involvedCustomerIds)
      await de.createConsolidationStatusNotification(
        e,
        String(s),
        String(t),
        n,
        r.name,
      );
  }
  async delete(e) {
    const { error: t } = await x
      .from("consolidation_orders")
      .delete()
      .eq("consolidation_id", e);
    if (t)
      throw (
        console.error("Error deleting consolidation order links:", t),
        new Error("Failed to delete consolidation order links")
      );
    const { error: r } = await x.from("consolidations").delete().eq("id", e);
    if (r)
      throw (
        console.error("Error deleting consolidation:", r),
        new Error("Failed to delete consolidation")
      );
  }
  async updateOrders(e, t, r, s, o) {
    const n = r.orderIds,
      a = t.filter((m) => !n.includes(m)),
      l = n.filter((m) => !t.includes(m));
    if (a.length > 0) {
      const m = s.filter((f) => a.includes(f.id));
      for (const f of m) {
        const p = Bt.validateOrderForConsolidation(f, e);
        if (!p.isValid)
          throw new Error(
            `Cannot add order "${f.description}": ${p.errors.join(", ")}`,
          );
      }
    }
    const { error: c } = await x
      .from("consolidations")
      .update({ order_ids: t })
      .eq("id", e);
    if (c)
      throw (
        console.error("Error updating consolidation orders:", c),
        new Error("Failed to update consolidation orders")
      );
    (a.length > 0 && (await this.notifyOrdersAdded(e, a, r, s, o)),
      l.length > 0 && (await this.notifyOrdersRemoved(e, l, r, s, o)));
  }
  async resetShippingCostDistribution(e, t = "Manual reset") {
    const { error: r } = await x
      .from("consolidations")
      .update({ shipping_cost_distributed: !1 })
      .eq("id", e);
    if (r)
      throw (
        console.error("Error resetting shipping cost distribution flag:", r),
        new Error("Failed to reset shipping cost distribution flag")
      );
    (await Je.logCostDistributionReset(e, t),
      await de.createAdminNotification(
        `Shipping cost distribution flag reset for consolidation (ID: ${e})`,
        { importance: X.Medium, linkToPage: "consolidations", linkToId: e },
      ));
  }
  async redistributeShippingCosts(e, t, r, s) {
    const o = r.shippingCost,
      n = r.shippingCostDistributed,
      { data: a, error: l } = await x
        .from("payment_transactions")
        .select("*")
        .eq("related_consolidation_id", e)
        .eq("type", "ShippingCost");
    if (l) throw new Error("Failed to fetch existing transactions for backup");
    const { data: c, error: m } = await x
      .from("payment_transactions")
      .select("*")
      .eq("related_consolidation_id", e)
      .eq("type", "MiscellaneousCost")
      .ilike("description", "Fixed-rate shipping variance for consolidation%");
    if (m)
      throw new Error(
        "Failed to fetch existing variance transactions for backup",
      );
    const f = [...(a || []), ...(c || [])];
    try {
      (await this.resetShippingCostDistribution(
        e,
        "Redistribution in progress",
      ),
        await this.update(e, { shippingCost: t, shippingCostDistributed: !1 }));
      const { error: p } = await x
        .from("payment_transactions")
        .delete()
        .eq("related_consolidation_id", e)
        .eq("type", "ShippingCost");
      if (p)
        throw new Error("Failed to delete existing shipping cost transactions");
      const { error: v } = await x
        .from("payment_transactions")
        .delete()
        .eq("related_consolidation_id", e)
        .eq("type", "MiscellaneousCost")
        .ilike(
          "description",
          "Fixed-rate shipping variance for consolidation%",
        );
      if (v)
        throw new Error(
          "Failed to delete existing fixed-rate variance transactions",
        );
      const { data: T } = await x
          .from("shipments")
          .select("id")
          .eq("consolidation_id", e)
          .single(),
        P = T?.id,
        N = `Shipping cost updated from $${o || 0} to $${t}`;
      let D = !1;
      const A =
        r.customerId ||
        ((r.involvedCustomerIds || []).filter(Boolean).length === 1
          ? (r.involvedCustomerIds || []).filter(Boolean)[0]
          : null);
      (t > 0 &&
        (r.isMixed
          ? (await ze.distributeShippingCost(e, t, r, s, P, !0, N), (D = !0))
          : A &&
            (await ze.createTransaction(
              {
                customerId: A,
                type: "ShippingCost",
                description: `Shipping cost for consolidation: ${je(r.id, "consolidation")}`,
                amount: -Math.abs(t),
                relatedConsolidationId: e,
                relatedShipmentId: P,
                idempotencyKey: `shipping-charge:shipment:${P || "none"}:single_customer:${A}:adjustment:${Math.abs(t).toFixed(2)}`,
              },
              !0,
              N,
            ),
            (D = !0))),
        D && (await this.update(e, { shippingCostDistributed: !0 })),
        await Je.logCostRedistribution(e, o || 0, t, new Map(), new Map()));
    } catch (p) {
      throw (
        console.error("Redistribution failed, rolling back:", p),
        await this.rollbackCostDistribution(e, o, n, f),
        p
      );
    }
  }
  async rollbackCostDistribution(e, t, r, s) {
    try {
      if (
        (await this.update(e, { shippingCost: t, shippingCostDistributed: r }),
        await x
          .from("payment_transactions")
          .delete()
          .eq("related_consolidation_id", e)
          .eq("type", "ShippingCost"),
        await x
          .from("payment_transactions")
          .delete()
          .eq("related_consolidation_id", e)
          .eq("type", "MiscellaneousCost")
          .ilike(
            "description",
            "Fixed-rate shipping variance for consolidation%",
          ),
        s.length > 0)
      ) {
        const { error: o } = await x.from("payment_transactions").insert(s);
        o &&
          (console.error("Failed to restore original transactions:", o),
          await de.createAdminNotification(
            `CRITICAL: Failed to rollback cost distribution for consolidation ${e}. Manual intervention required.`,
            { importance: X.High, linkToPage: "consolidations", linkToId: e },
          ));
      }
      (await Je.logAction(bt.COST_DISTRIBUTION_RESET, "consolidation", e, {
        reason: "Rollback due to redistribution failure",
        metadata: {
          rollbackTimestamp: new Date().toISOString(),
          originalShippingCost: t,
          originalDistributedFlag: r,
          restoredTransactionCount: s.length,
        },
      }),
        Z(`Successfully rolled back cost distribution for consolidation ${e}`));
    } catch (o) {
      (console.error("CRITICAL: Rollback failed:", o),
        await de.createAdminNotification(
          `CRITICAL SYSTEM ERROR: Cost distribution rollback failed for consolidation ${e}. Database may be in inconsistent state. Immediate manual intervention required.`,
          { importance: X.High, linkToPage: "consolidations", linkToId: e },
        ),
        await Je.logAction(bt.COST_DISTRIBUTION_RESET, "consolidation", e, {
          reason: "CRITICAL: Rollback failure",
          metadata: {
            rollbackError: o instanceof Error ? o.message : String(o),
            timestamp: new Date().toISOString(),
            severity: "critical",
          },
        }));
    }
  }
  async createShipment(e, t, r, s, o, n, a, l, c) {
    var m, f;
    Z("[DEBUG] createShipment called:", {
      consolidationId: e,
      consolidationName: l.name,
      actualShippingCost: t,
      estimatedShippingCostFromParam: l.estimatedShippingCost,
      consolidationObject: {
        id: l.id,
        name: l.name,
        estimatedShippingCost: l.estimatedShippingCost,
        shippingCost: l.shippingCost,
        shippingCostDistributed: l.shippingCostDistributed,
      },
    });
    const p = l.estimatedShippingCost || 0,
      v = p > 0,
      T = v ? t - p : null,
      P = v ? ((t - p) / p) * 100 : null,
      N = l.shippingCost && l.shippingCost > 0,
      D = (p > 0 && Math.abs(T || 0) > 0.01) || (p === 0 && t > 0 && !N),
      A = D
        ? p > 0
          ? `Actual shipping cost differs from estimate: $${p} \xE2\u2020\u2019 $${t}`
          : `Shipping cost assigned: $${t} (estimated cost was not provided during consolidation creation)`
        : void 0;
    Z("[DEBUG] Adjustment detection:", {
      consolidationId: e,
      consolidationName: l.name,
      estimatedCost: p,
      actualShippingCost: t,
      hasExistingShippingCost: N,
      costVariance: T,
      costVariancePercentage: P,
      isAdjustment: D,
      adjustmentReason: A,
      mathAbsCostVariance: Math.abs(T || 0),
      threshold: 0.01,
      logicUsed: p > 0 ? "estimated_vs_actual" : "first_time_assignment",
    });
    let O = (l.involvedCustomerIds || []).filter(Boolean),
      j = l.customerId,
      W = l.isMixed;
    if (W) {
      if (O.length === 0) {
        const z = (l.orderIds || []).filter(Boolean);
        z.length > 0 &&
          (O = Array.from(
            new Set(
              c
                .filter((B) => z.includes(B.id))
                .map((B) => B.customerId)
                .filter(Boolean),
            ),
          ));
      }
      if (O.length === 0) {
        const { data: z, error: B } = await x
          .from("consolidations_with_orders")
          .select("order_ids")
          .eq("id", e)
          .single();
        if (!B) {
          const se = z?.order_ids || [];
          if (se.length > 0) {
            const { data: Le } = await x
              .from("orders")
              .select("customer_id")
              .in("id", se);
            O = Array.from(
              new Set((Le || []).map((Oe) => Oe.customer_id).filter(Boolean)),
            );
          }
        }
      }
      O.length <= 1
        ? ((W = !1), (j = O[0] || j), (O = j ? [j] : []))
        : (j = null);
    } else {
      if (!j) {
        const z = (l.orderIds || []).filter(Boolean);
        j =
          ((m = c.find((B) => z.includes(B.id))) == null
            ? void 0
            : m.customerId) ||
          ((f = l.involvedCustomerIds) == null ? void 0 : f[0]) ||
          null;
      }
      ((O = j ? [j] : O), (W = !1));
    }
    try {
      (l.customerId !== j ||
        l.isMixed !== W ||
        (l.involvedCustomerIds || []).length !== O.length) &&
        (await x
          .from("consolidations")
          .update({ customer_id: j, is_mixed: W, involved_customer_ids: O })
          .eq("id", e));
    } catch (z) {
      console.warn(
        "Failed to patch consolidation customer attribution; continuing shipment creation.",
        z,
      );
    }
    const ee = `consolidation-shipment:${e}`,
      { data: ie, error: ge } = await x.rpc(
        "create_consolidation_shipment_core",
        {
          p_consolidation_id: e,
          p_shipping_cost: t,
          p_cost_variance: T,
          p_cost_variance_percentage: P,
          p_carrier: r,
          p_tracking_url: s,
          p_estimated_delivery: a ? new Date(a).toISOString() : null,
          p_description: `Consolidation: ${je(l.id, "consolidation")}`,
          p_status: _.InTransit,
          p_customer_id: j,
          p_involved_customer_ids: O,
          p_is_mixed: W,
          p_origin: o,
          p_destination: n,
          p_idempotency_key: ee,
        },
      );
    if (ge)
      throw (
        console.error(
          "Error creating consolidation shipment core transaction:",
          ge,
        ),
        new Error("Failed to create consolidation shipment")
      );
    const ue = Array.isArray(ie) ? ie[0] : ie,
      ne = ue?.shipment_id,
      ye = !(ue == null || !ue.created);
    if (!ne)
      throw new Error("Shipment core transaction did not return a shipment ID");
    const U = await wt.getById(ne);
    if (!U) throw new Error("Shipment was created but could not be loaded");
    ye && (await wt.notifyShipmentCreated(U));
    const { data: De, error: Fe } = await x
      .from("consolidations")
      .select("shipping_cost_distributed")
      .eq("id", e)
      .single();
    if (Fe)
      throw new Error(
        "Failed to verify consolidation shipping distribution state",
      );
    const ae = De?.shipping_cost_distributed === !0;
    try {
      let z = ae;
      (t > 0 &&
        !ae &&
        (W
          ? (await ze.distributeShippingCost(e, t, l, c, U.id, D, A), (z = !0))
          : j &&
            (await ze.createTransaction(
              {
                customerId: j,
                type: "ShippingCost",
                description: `Shipping cost for consolidation: ${je(l.id, "consolidation")}`,
                amount: -Math.abs(t),
                relatedConsolidationId: e,
                relatedShipmentId: U.id,
                idempotencyKey: `shipping-charge:shipment:${U.id}:single_customer:${j}:initial:${Math.abs(t).toFixed(2)}`,
              },
              D,
              A,
            ),
            (z = !0))),
        !ae && z && (await this.update(e, { shippingCostDistributed: !0 })));
    } catch (z) {
      if (ye) {
        const { error: B } = await x
          .from("payment_transactions")
          .delete()
          .eq("related_shipment_id", U.id);
        (B &&
          console.error(
            "Failed to rollback payment transactions for shipment:",
            B,
          ),
          await x.from("shipments").delete().eq("id", U.id),
          await this.update(e, {
            status: l.status,
            shippingCost: l.shippingCost,
            costVariance: l.costVariance,
            costVariancePercentage: l.costVariancePercentage,
            shippingCostDistributed: l.shippingCostDistributed,
          }));
      }
      throw z;
    }
    try {
      const z = (l.orderIds || []).filter(Boolean),
        B = c.filter((Oe) => z.includes(Oe.id) && Oe.customerId),
        se = new Map();
      for (const Oe of B)
        se.set(
          Oe.customerId,
          (se.get(Oe.customerId) || 0) + Math.max(0, Number(Oe.value || 0)),
        );
      const Le = Array.from(se.keys()).filter(Boolean);
      if (Le.length > 0) {
        const { data: Oe, error: Qe } = await x
          .from("customers")
          .select("id,contract_type_id,has_used_trial_fee")
          .in("id", Le);
        if (Qe) throw Qe;
        const Ie = new Map((Oe || []).map((be) => [be.id, be])),
          { data: nt, error: It } = await x
            .from("payment_transactions")
            .select("customer_id,type,amount")
            .eq("related_consolidation_id", e)
            .in("type", [Y.ServiceFee, Y.ServiceFeeReversal]);
        if (It) throw It;
        const rt = new Map();
        for (const be of nt || []) {
          const we = be.customer_id;
          if (!we) continue;
          const Re = Math.abs(Number(be.amount || 0));
          be.type === Y.ServiceFee
            ? rt.set(we, (rt.get(we) || 0) + Re)
            : be.type === Y.ServiceFeeReversal &&
              rt.set(we, (rt.get(we) || 0) - Re);
        }
        if (z.length > 0) {
          const { data: be, error: we } = await x
            .from("payment_transactions")
            .select("customer_id,type,amount")
            .in("related_order_id", z)
            .in("type", [Y.ServiceFee, Y.ServiceFeeReversal]);
          if (we) throw we;
          for (const Re of be || []) {
            const Ze = Re.customer_id;
            if (!Ze) continue;
            const at = Math.abs(Number(Re.amount || 0));
            Re.type === Y.ServiceFee
              ? rt.set(Ze, (rt.get(Ze) || 0) + at)
              : Re.type === Y.ServiceFeeReversal &&
                rt.set(Ze, (rt.get(Ze) || 0) - at);
          }
        }
        for (const be of Le) {
          const we = Ie.get(be),
            Re = String(we?.contract_type_id || lt.Growth),
            Ze =
              ((mt[Re] == null ? void 0 : mt[Re].name) || String(Re)).trim() ||
              "Standard",
            at = Math.max(0, Number(se.get(be) || 0));
          let M = Number(kt.calculateServiceFee(at, Re) || 0);
          (Number.isFinite(M) || (M = 0), (M = Math.max(0, M)));
          const me = Math.max(0, Number(rt.get(be) || 0)),
            ce = Math.max(0, M - me);
          (ce > 0.01 &&
            (await ze.createTransaction({
              customerId: be,
              type: Y.ServiceFee,
              description: `Service fee for consolidation ${je(l.id, "consolidation")} (${Ze} plan)`,
              amount: -Math.abs(ce),
              relatedConsolidationId: e,
              relatedShipmentId: U.id,
              idempotencyKey: `service-fee:shipment:${U.id}:consolidation:${e}:customer:${be}:${Math.abs(ce).toFixed(2)}`,
            })),
            Re === lt.Trial &&
              (we == null || !we.has_used_trial_fee) &&
              (await x
                .from("customers")
                .update({ has_used_trial_fee: !0 })
                .eq("id", be)));
        }
      }
    } catch (z) {
      console.warn(
        "Non-fatal: failed to apply deferred service fee for consolidation shipment",
        z,
      );
    }
    if (P !== null && jr.shouldNotifyForCostVariance(P)) {
      const z = (T || 0) > 0 ? "over" : "under",
        B = jr.isHighPriorityCostVariance(P) ? X.High : X.Medium;
      await de.createAdminNotification(
        `Consolidation "${l.name}" shipping cost ${z} budget by ${Math.abs(P).toFixed(1)}%`,
        { importance: B, linkToPage: "consolidations", linkToId: e },
      );
    }
    return U;
  }
  async notifyOrdersAdded(e, t, r, s, o) {
    const n = s.filter((a) => t.includes(a.id));
    for (const a of n)
      o.find((l) => l.id === a.customerId) &&
        (await de.createCustomerNotification(
          a.customerId,
          `Your order "${je(a.id, "order")}" has been added to consolidation "${je(r.id, "consolidation")}"`,
          { importance: X.Medium, linkToPage: "consolidations", linkToId: e },
        ));
  }
  async notifyOrdersRemoved(e, t, r, s, o) {
    const n = s.filter((a) => t.includes(a.id));
    for (const a of n)
      o.find((l) => l.id === a.customerId) &&
        (await de.createCustomerNotification(
          a.customerId,
          `Your order "${je(a.id, "order")}" has been removed from consolidation "${je(r.id, "consolidation")}"`,
          { importance: X.Medium, linkToPage: "orders", linkToId: a.id },
        ));
  }
}
const zt = hr.getInstance();
class mr {
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
      (this.transformDatabaseOrder = (e) => {
        const t = si(e.order_code);
        return (
          t && oi("order", e.id, t),
          {
            id: e.id,
            code: t,
            description: e.description,
            value: e.value,
            supplierId: e.supplier_id,
            volumeM3: e.volume_m3,
            weightKG: e.weight_kg,
            customerId: e.customer_id,
            status: e.status,
            notes: e.notes,
            requestedSupplierName: e.requested_supplier_name || "",
            creationDate: e.creation_date,
            originCountry: e.origin_country || "",
            originCity: e.origin_city || "",
            destinationCountry: e.destination_country || "",
            destinationCity: e.destination_city || "",
            destinationPort: e.destination_port || "",
            readyDate: e.ready_date || "",
            chargesApplied: !!e.charges_applied,
          }
        );
      }),
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
    return (mr.instance || (mr.instance = new mr()), mr.instance);
  }
  async fetchAll() {
    const { data: e, error: t } = await x
      .from("customers")
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
      { data: r, error: s } = await x
        .from("customers")
        .insert([t])
        .select()
        .single();
    if (s)
      throw (
        console.error("Error creating customer:", s),
        new Error("Failed to create customer")
      );
    const o = this.transformDatabaseCustomer(r),
      n = (mt[o.contractType] && mt[o.contractType].name) || o.contractType;
    return (
      await de.createCustomerNotification(
        o.id,
        `Welcome to our logistics platform! Your ${n} plan has been set up.`,
        { importance: X.High, linkToPage: "customers" },
      ),
      await de.createAdminNotification(
        `New customer "${o.companyName}" has been created`,
        { importance: X.Medium, linkToPage: "customers", linkToId: o.id },
      ),
      o
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
    const { data: s, error: o } = await x
      .from("customers")
      .update(r)
      .eq("id", e)
      .select()
      .single();
    if (o)
      throw (
        console.error("Error updating customer:", o),
        new Error("Failed to update customer")
      );
    const n = this.transformDatabaseCustomer(s);
    return (
      t.contractType &&
        (await de.createCustomerNotification(
          e,
          `Your plan has been updated to ${(mt[t.contractType] && mt[t.contractType].name) || t.contractType}`,
          { importance: X.High, linkToPage: "customers" },
        )),
      n
    );
  }
  async getById(e) {
    const { data: t, error: r } = await x
      .from("customers")
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
    const { data: t, error: r } = await x
      .from("customers")
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
    const { data: t, error: r } = await x
      .from("customers")
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
      .filter((r) => r.customerId === e)
      .reduce((r, s) => r + s.amount, 0);
  }
  async getStatistics(e) {
    const [t, r, s] = await Promise.all([
        this.getCustomerOrders(e),
        ze.fetchAllTransactions(),
        this.getCustomerShipments(e),
      ]),
      o = r
        .filter((l) => l.customerId === e)
        .filter((l) => l.amount < 0)
        .reduce((l, c) => l + Math.abs(c.amount), 0),
      n = s.filter(
        (l) =>
          !["Delivered", "Completed", "Cancelled"].includes(String(l.status)),
      ).length,
      a = t.filter((l) => l.status === "Delivered").length;
    return {
      totalOrders: t.length,
      totalSpent: o,
      activeShipments: n,
      completedOrders: a,
    };
  }
  async getCustomerOrders(e) {
    const { data: t, error: r } = await x
      .from("orders")
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
    const { data: t, error: r } = await x
      .from("shipments")
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
    const { data: t, error: r } = await x
      .from("payment_transactions")
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
    const { error: s } = await x.from("customers").delete().eq("id", e);
    if (s)
      throw (
        console.error("Error deleting customer:", s),
        new Error("Failed to delete customer")
      );
    await de.createAdminNotification("Customer account has been deleted", {
      importance: X.Medium,
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
      e.email && e.email.trim() !== ""
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email) ||
          t.push("Invalid email format")
        : t.push("Email is required"),
      (!e.phone || e.phone.trim() === "") && t.push("Phone number is required"),
      e.contractType || t.push("Contract type is required"),
      { isValid: t.length === 0, errors: t }
    );
  }
  async search(e) {
    const { data: t, error: r } = await x
      .from("customers")
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
const en = mr.getInstance();
class pr {
  constructor() {
    ((this.transformDatabaseSupplier = (e) => ({
      id: e.id,
      name: e.name,
      companyLocation: e.company_location,
      phoneNumber: e.phone_number,
      contactPerson: e.contact_person,
      rating: e.rating,
    })),
      (this.transformDatabaseOrder = (e) => {
        const t = si(e.order_code);
        return (
          t && oi("order", e.id, t),
          {
            id: e.id,
            code: t,
            description: e.description,
            value: e.value,
            supplierId: e.supplier_id,
            volumeM3: e.volume_m3,
            weightKG: e.weight_kg,
            customerId: e.customer_id,
            status: e.status,
            notes: e.notes,
            requestedSupplierName: e.requested_supplier_name || "",
            creationDate: e.creation_date,
            originCountry: e.origin_country || "",
            originCity: e.origin_city || "",
            destinationCountry: e.destination_country || "",
            destinationCity: e.destination_city || "",
            destinationPort: e.destination_port || "",
            readyDate: e.ready_date || "",
            chargesApplied: !!e.charges_applied,
          }
        );
      }));
  }
  static getInstance() {
    return (pr.instance || (pr.instance = new pr()), pr.instance);
  }
  async fetchAll() {
    const { data: e, error: t } = await x
      .from("suppliers")
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
      { data: r, error: s } = await x
        .from("suppliers")
        .insert([t])
        .select()
        .single();
    if (s)
      throw (
        console.error("Error creating supplier:", s),
        new Error("Failed to create supplier")
      );
    const o = this.transformDatabaseSupplier(r);
    return (
      await de.createAdminNotification(
        `New supplier "${o.name}" has been added`,
        { importance: X.Low, linkToPage: "suppliers", linkToId: o.id },
      ),
      o
    );
  }
  async update(e, t) {
    const r = {};
    (t.name !== void 0 && (r.name = t.name),
      t.companyLocation !== void 0 && (r.company_location = t.companyLocation),
      t.phoneNumber !== void 0 && (r.phone_number = t.phoneNumber),
      t.contactPerson !== void 0 && (r.contact_person = t.contactPerson),
      t.rating !== void 0 && (r.rating = t.rating));
    const { data: s, error: o } = await x
      .from("suppliers")
      .update(r)
      .eq("id", e)
      .select()
      .single();
    if (o)
      throw (
        console.error("Error updating supplier:", o),
        new Error("Failed to update supplier")
      );
    const n = this.transformDatabaseSupplier(s);
    return (
      t.rating &&
        t.rating !== n.rating &&
        (await de.createAdminNotification(
          `Supplier "${n.name}" rating updated to ${t.rating}`,
          { importance: X.Low, linkToPage: "suppliers", linkToId: e },
        )),
      n
    );
  }
  async getById(e) {
    const { data: t, error: r } = await x
      .from("suppliers")
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
    const { data: t, error: r } = await x
      .from("suppliers")
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
    const { data: r, error: s } = await x
      .from("suppliers")
      .select("*")
      .gte("rating", e)
      .lte("rating", t)
      .order("rating", { ascending: !1 });
    if (s)
      throw (
        console.error("Error fetching suppliers by rating:", s),
        new Error("Failed to fetch suppliers by rating")
      );
    return (r || []).map(this.transformDatabaseSupplier);
  }
  async getTopRated(e = 10) {
    const { data: t, error: r } = await x
      .from("suppliers")
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
    const { data: t, error: r } = await x
      .from("orders")
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
      r = t.reduce((a, l) => a + l.value, 0),
      s = t.length > 0 ? r / t.length : 0,
      o = new Date();
    o.setDate(o.getDate() - 30);
    const n = t.filter((a) => new Date(a.creationDate) >= o).length;
    return {
      totalOrders: t.length,
      totalValue: r,
      averageOrderValue: s,
      recentOrders: n,
    };
  }
  async updateRating(e, t) {
    if (t < 1 || t > 10) throw new Error("Rating must be between 1 and 10");
    await this.update(e, { rating: t });
  }
  async delete(e) {
    if ((await this.getSupplierOrders(e)).length > 0)
      throw new Error("Cannot delete supplier with existing orders");
    const { error: t } = await x.from("suppliers").delete().eq("id", e);
    if (t)
      throw (
        console.error("Error deleting supplier:", t),
        new Error("Failed to delete supplier")
      );
    await de.createAdminNotification("Supplier has been deleted", {
      importance: X.Low,
      linkToPage: "suppliers",
    });
  }
  async search(e) {
    const { data: t, error: r } = await x
      .from("suppliers")
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
      s = r.reduce((l, c) => l + c.value, 0),
      o = r.length > 0 ? s / r.length : 0,
      n = r.filter((l) => l.status === "Delivered"),
      a = r.length > 0 ? (n.length / r.length) * 100 : 0;
    return {
      orderCount: r.length,
      totalValue: s,
      averageOrderValue: o,
      onTimeDeliveryRate: a,
      rating: t.rating || 0,
    };
  }
  async getSummary() {
    const [e, t] = await Promise.all([this.fetchAll(), this.getTopRated(5)]),
      r = new Date();
    r.setDate(r.getDate() - 30);
    const s = e.slice(0, 5),
      o = e.filter((a) => a.rating !== void 0),
      n =
        o.length > 0
          ? o.reduce((a, l) => a + (l.rating || 0), 0) / o.length
          : 0;
    return {
      totalSuppliers: e.length,
      topRatedSuppliers: t,
      recentlyAdded: s,
      averageRating: n,
    };
  }
}
const Yl = pr.getInstance(),
  tn = "2026-02-18",
  Xl = () => {
    const [i, e] = E.useState(""),
      [t, r] = E.useState(""),
      [s, o] = E.useState(!1),
      [n, a] = E.useState(null),
      [l, c] = E.useState(null),
      [m, f] = E.useState(!1),
      [p, v] = E.useState(!1),
      [T, P] = E.useState(!1),
      [N, D] = E.useState(null),
      [A, O] = E.useState(null),
      [j, W] = E.useState(""),
      [ee, ie] = E.useState(""),
      [ge, ue] = E.useState(""),
      [ne, ye] = E.useState(""),
      [U, De] = E.useState(!1),
      { login: Fe, signUp: ae } = Xo(),
      z = E.useMemo(
        () =>
          "w-full h-11 px-4 rounded-2xl border border-slate-900/10 bg-white/70 backdrop-blur shadow-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40",
        [],
      );
    return d.jsxs("div", {
      className:
        "min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden",
      children: [
        d.jsx("div", {
          className:
            "absolute inset-0 pointer-events-none opacity-70 bg-[radial-gradient(900px_circle_at_25%_20%,rgba(59,130,246,0.10),transparent_55%),radial-gradient(700px_circle_at_70%_50%,rgba(52,211,153,0.10),transparent_55%)]",
        }),
        d.jsx("div", {
          className:
            "absolute top-24 left-10 w-72 h-72 rounded-full blur-3xl opacity-25 bg-gradient-to-r from-emerald-200 to-blue-200 pointer-events-none",
        }),
        d.jsx("div", {
          className:
            "absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-r from-blue-200 to-indigo-200 pointer-events-none",
        }),
        d.jsxs("div", {
          className: "relative px-4 sm:px-6 py-10 sm:py-12 mx-auto max-w-6xl",
          children: [
            d.jsxs("div", {
              className: "flex items-center justify-between",
              children: [
                d.jsx("a", {
                  href:
                    window.location.hostname === "localhost"
                      ? "http://localhost:8080/"
                      : "/",
                  className:
                    "text-sm font-semibold text-slate-700 hover:text-slate-950",
                  children: "Back",
                }),
                d.jsx("a", {
                  href: "/",
                  className: "flex items-center gap-2",
                  children: d.jsx(wr, {
                    size: "sm",
                    showText: !0,
                    markClassName: "w-10 h-10 sm:w-11 sm:h-11",
                    textClassName: "text-xl sm:text-2xl",
                  }),
                }),
                d.jsx("div", { className: "w-[44px]" }),
              ],
            }),
            d.jsxs("div", {
              className:
                "mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start",
              children: [
                d.jsxs("div", {
                  className: "hidden lg:block pt-3",
                  children: [
                    d.jsx("div", {
                      className:
                        "inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 backdrop-blur px-4 py-2 text-xs font-bold text-slate-700 shadow-sm",
                      children: "Admin and customer access",
                    }),
                    d.jsx("h1", {
                      className:
                        "mt-5 text-4xl font-extrabold tracking-tight text-slate-950",
                      children: "Sign in to the Sourcevia dashboard.",
                    }),
                    d.jsx("p", {
                      className:
                        "mt-4 text-base text-slate-700 leading-relaxed max-w-md",
                      children:
                        "Track orders, consolidations, shipments, and the ledger in one workspace.",
                    }),
                    d.jsx("div", {
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
                      ].map((B) =>
                        d.jsxs(
                          "div",
                          {
                            className:
                              "rounded-3xl border border-slate-900/10 bg-white/70 backdrop-blur px-5 py-4 shadow-sm",
                            children: [
                              d.jsx("div", {
                                className: "text-sm font-bold text-slate-950",
                                children: B.k,
                              }),
                              d.jsx("div", {
                                className:
                                  "mt-1 text-sm text-slate-700 leading-relaxed",
                                children: B.v,
                              }),
                            ],
                          },
                          B.k,
                        ),
                      ),
                    }),
                  ],
                }),
                d.jsx("div", {
                  className: "lg:justify-self-end w-full",
                  children: d.jsxs("form", {
                    onSubmit: async (B) => {
                      if ((B.preventDefault(), !s)) {
                        (o(!0), a(null), c(null), D(null), O(null));
                        try {
                          if (p) {
                            if (!U)
                              throw new Error(
                                "Please read and accept the Privacy Policy and Terms of Service.",
                              );
                            (await ae(i, t, j, ee, ge, ne, {
                              acceptedAt: new Date().toISOString(),
                              version: tn,
                            }),
                              c(
                                "Account created. Check your email to confirm, then sign in.",
                              ),
                              v(!1),
                              De(!1));
                          } else await Fe(i, t);
                        } catch (se) {
                          a(se.message);
                        } finally {
                          o(!1);
                        }
                      }
                    },
                    className:
                      "rounded-[2rem] border border-slate-900/10 bg-white/80 backdrop-blur-xl shadow-[0_26px_90px_-55px_rgba(15,23,42,0.55)] overflow-hidden",
                    children: [
                      d.jsx("div", {
                        className:
                          "px-6 sm:px-7 pt-6 pb-4 border-b border-slate-900/10 bg-white/70",
                        children: d.jsxs("div", {
                          className: "flex items-center justify-between gap-4",
                          children: [
                            d.jsxs("div", {
                              children: [
                                d.jsx("div", {
                                  className: "text-sm font-bold text-slate-950",
                                  children: p
                                    ? "Create account"
                                    : "Welcome back",
                                }),
                                d.jsx("div", {
                                  className: "mt-1 text-sm text-slate-600",
                                  children: p
                                    ? "Create an account to continue."
                                    : "Sign in to continue.",
                                }),
                              ],
                            }),
                            d.jsx(wr, {
                              size: "xxs",
                              showText: !1,
                              markClassName: "w-10 h-10",
                            }),
                          ],
                        }),
                      }),
                      d.jsxs("div", {
                        className: "p-6 sm:p-7",
                        children: [
                          d.jsxs("div", {
                            className: "flex items-center gap-2 mb-4",
                            children: [
                              d.jsx("button", {
                                type: "button",
                                onClick: () => v(!1),
                                className: [
                                  "flex-1 h-10 rounded-2xl border text-sm font-semibold transition-colors",
                                  p
                                    ? "bg-white text-slate-700 border-slate-900/10 hover:bg-slate-50"
                                    : "bg-slate-900 text-white border-slate-900",
                                ].join(" "),
                                children: "Sign in",
                              }),
                              d.jsx("button", {
                                type: "button",
                                onClick: () => v(!0),
                                className: [
                                  "flex-1 h-10 rounded-2xl border text-sm font-semibold transition-colors",
                                  p
                                    ? "bg-slate-900 text-white border-slate-900"
                                    : "bg-white text-slate-700 border-slate-900/10 hover:bg-slate-50",
                                ].join(" "),
                                children: "Sign up",
                              }),
                            ],
                          }),
                          n &&
                            d.jsx("div", {
                              className:
                                "mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 font-semibold",
                              children: n,
                            }),
                          l &&
                            d.jsx("div", {
                              className:
                                "mb-4 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 font-semibold",
                              children: l,
                            }),
                          N &&
                            d.jsx("div", {
                              className:
                                "mb-4 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 font-semibold",
                              children: N,
                            }),
                          A &&
                            d.jsx("div", {
                              className:
                                "mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 font-semibold",
                              children: A,
                            }),
                          p &&
                            d.jsxs(d.Fragment, {
                              children: [
                                d.jsxs("div", {
                                  children: [
                                    d.jsx("label", {
                                      htmlFor: "name",
                                      className:
                                        "block text-sm font-semibold text-slate-800 mb-2",
                                      children: "Full name",
                                    }),
                                    d.jsx("input", {
                                      type: "text",
                                      id: "name",
                                      placeholder: "Jane Doe",
                                      value: j,
                                      onChange: (B) => W(B.target.value),
                                      className: z,
                                      required: p,
                                      autoComplete: "name",
                                    }),
                                  ],
                                }),
                                d.jsxs("div", {
                                  children: [
                                    d.jsx("label", {
                                      htmlFor: "companyName",
                                      className:
                                        "block text-sm font-semibold text-slate-800 mb-2",
                                      children: "Company",
                                    }),
                                    d.jsx("input", {
                                      type: "text",
                                      id: "companyName",
                                      placeholder: "Acme Imports",
                                      value: ee,
                                      onChange: (B) => ie(B.target.value),
                                      className: z,
                                      required: p,
                                      autoComplete: "organization",
                                    }),
                                  ],
                                }),
                                d.jsxs("div", {
                                  children: [
                                    d.jsx("label", {
                                      htmlFor: "phone",
                                      className:
                                        "block text-sm font-semibold text-slate-800 mb-2",
                                      children: "Phone",
                                    }),
                                    d.jsx("input", {
                                      type: "tel",
                                      id: "phone",
                                      placeholder: "+1 555 000 0000",
                                      value: ge,
                                      onChange: (B) => ue(B.target.value),
                                      className: z,
                                      required: p,
                                      autoComplete: "tel",
                                    }),
                                  ],
                                }),
                                d.jsxs("div", {
                                  children: [
                                    d.jsx("label", {
                                      htmlFor: "address",
                                      className:
                                        "block text-sm font-semibold text-slate-800 mb-2",
                                      children: "Business address",
                                    }),
                                    d.jsx("textarea", {
                                      id: "address",
                                      placeholder: "Street, city, country",
                                      value: ne,
                                      onChange: (B) => ye(B.target.value),
                                      rows: 2,
                                      className: [
                                        z,
                                        "h-auto py-3 resize-none",
                                      ].join(" "),
                                      required: p,
                                      autoComplete: "street-address",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          d.jsxs("div", {
                            children: [
                              d.jsx("label", {
                                htmlFor: "email",
                                className:
                                  "block text-sm font-semibold text-slate-800 mb-2",
                                children: "Email",
                              }),
                              d.jsx("input", {
                                type: "email",
                                id: "email",
                                placeholder: "you@company.com",
                                value: i,
                                onChange: (B) => e(B.target.value),
                                className: z,
                                required: !0,
                                autoComplete: "email",
                              }),
                            ],
                          }),
                          d.jsxs("div", {
                            children: [
                              d.jsx("label", {
                                htmlFor: "password",
                                className:
                                  "block text-sm font-semibold text-slate-800 mb-2",
                                children: "Password",
                              }),
                              d.jsxs("div", {
                                className: "relative",
                                children: [
                                  d.jsx("input", {
                                    type: m ? "text" : "password",
                                    id: "password",
                                    placeholder: p
                                      ? "Create a password"
                                      : "Your password",
                                    value: t,
                                    onChange: (B) => r(B.target.value),
                                    className: [z, "pr-12"].join(" "),
                                    required: !0,
                                    autoComplete: p
                                      ? "new-password"
                                      : "current-password",
                                  }),
                                  d.jsx("button", {
                                    type: "button",
                                    onClick: () => f((B) => !B),
                                    className:
                                      "absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl border border-slate-900/10 bg-white hover:bg-slate-50 inline-flex items-center justify-center text-slate-600",
                                    "aria-label": m
                                      ? "Hide password"
                                      : "Show password",
                                    children: m
                                      ? d.jsx(Wn, { className: "h-4 w-4" })
                                      : d.jsx(Jn, { className: "h-4 w-4" }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          p &&
                            d.jsxs("div", {
                              className:
                                "rounded-2xl border border-slate-900/10 bg-slate-50/80 p-4",
                              children: [
                                d.jsx("div", {
                                  className: "text-sm font-bold text-slate-900",
                                  children:
                                    "Privacy and terms consent (required)",
                                }),
                                d.jsx("p", {
                                  className:
                                    "mt-2 text-xs text-slate-700 leading-relaxed",
                                  children:
                                    "By creating an account, you authorize Sourcevia to process account and operational data for procurement coordination, consolidation, shipment management, settlement workflows, and compliance operations.",
                                }),
                                d.jsxs("p", {
                                  className:
                                    "mt-2 text-xs text-slate-700 leading-relaxed",
                                  children: [
                                    "Review: ",
                                    d.jsx("a", {
                                      href: "/privacy",
                                      target: "_blank",
                                      rel: "noreferrer",
                                      className:
                                        "font-semibold text-slate-900 underline underline-offset-4 hover:text-emerald-700",
                                      children: "Privacy Policy",
                                    }),
                                    " and",
                                    " ",
                                    d.jsx("a", {
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
                                d.jsxs("label", {
                                  htmlFor: "privacyConsent",
                                  className:
                                    "mt-3 flex items-start gap-3 cursor-pointer",
                                  children: [
                                    d.jsx("input", {
                                      id: "privacyConsent",
                                      type: "checkbox",
                                      checked: U,
                                      onChange: (B) => De(B.target.checked),
                                      className:
                                        "mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-emerald-500",
                                      required: p,
                                    }),
                                    d.jsxs("span", {
                                      className:
                                        "text-xs text-slate-800 leading-relaxed",
                                      children: [
                                        "I accept the Privacy Policy and Terms of Service (version ",
                                        tn,
                                        ").",
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          !p &&
                            d.jsx("div", {
                              className: "flex items-center justify-between",
                              children: d.jsx("button", {
                                type: "button",
                                onClick: async () => {
                                  (D(null), O(null));
                                  const B = i.trim();
                                  if (B) {
                                    P(!0);
                                    try {
                                      const se = `${window.location.origin}/dashboard/reset-password`,
                                        { error: Le } =
                                          await x.auth.resetPasswordForEmail(
                                            B,
                                            { redirectTo: se },
                                          );
                                      if (Le) throw Le;
                                      D(
                                        "Password reset email sent. Check your inbox (and spam).",
                                      );
                                    } catch (se) {
                                      O(
                                        se?.message ||
                                          "Failed to send reset email.",
                                      );
                                    } finally {
                                      P(!1);
                                    }
                                  } else O("Enter your email address first.");
                                },
                                disabled: T,
                                className:
                                  "text-sm text-slate-700 hover:text-emerald-700 font-semibold disabled:opacity-50",
                                children: T
                                  ? "Sending..."
                                  : "Forgot your password?",
                              }),
                            }),
                          d.jsxs(ht, {
                            type: "submit",
                            className:
                              "w-full rounded-2xl h-11 bg-slate-900 hover:bg-slate-800 text-white",
                            disabled: s || (p && !U),
                            children: [
                              s
                                ? d.jsx(Qn, {
                                    className: "h-4 w-4 mr-2 animate-spin",
                                  })
                                : null,
                              p ? "Create account" : "Sign in",
                            ],
                          }),
                          d.jsxs("div", {
                            className:
                              "mt-4 text-xs text-slate-500 leading-relaxed",
                            children: [
                              "By continuing, you agree to our",
                              " ",
                              d.jsx("a", {
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
                              d.jsx("a", {
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
  Zl = E.lazy(() =>
    ot(() => import("./dashboardpage.js?v=20260312i"), _t([0, 1, 2, 3, 4, 5])),
  ),
  ed = E.lazy(() =>
    ot(
      () => import("./orderspage.js?v=20260312i"),
      _t([6, 1, 2, 7, 3, 8, 9, 10, 11, 4, 5]),
    ),
  ),
  td = E.lazy(() =>
    ot(
      () => import("./consolidationspage.js?v=20260312i"),
      _t([12, 1, 2, 7, 3, 8, 9, 10, 11, 4, 5]),
    ).then((i) => ({ default: i.ConsolidationsPage })),
  ),
  rd = E.lazy(() =>
    ot(() => import("./supplierspage.js?v=20260312i"), _t([13, 1, 2, 7, 3, 4, 5])),
  ),
  id = E.lazy(() =>
    ot(
      () => import("./customerspage.js?v=20260312i"),
      _t([14, 1, 2, 7, 3, 11, 4, 5]),
    ),
  ),
  sd = E.lazy(() =>
    ot(() => import("./paymentspage.js?v=20260312i"), _t([15, 1, 2, 7, 3, 8, 9, 11, 4, 5])),
  ),
  od = E.lazy(() =>
    ot(() => import("./shipmentspage.js?v=20260312i"), _t([16, 1, 2, 3, 10, 9, 11, 4, 5])),
  ),
  rn = () =>
    d.jsx("div", {
      className: "min-h-[240px] flex items-center justify-center",
      children: d.jsxs("div", {
        className: "text-center",
        children: [
          d.jsx("div", {
            className:
              "animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto",
          }),
          d.jsx("p", {
            className: "mt-3 text-sm text-gray-600",
            children: "Loading page...",
          }),
        ],
      }),
    }),
  nd = () => {
    const { showError: i, showSuccess: e } = Wr(),
      [t, r] = E.useState(""),
      [s, o] = E.useState(""),
      [n, a] = E.useState(!1),
      [l, c] = E.useState(!1);
    return (
      E.useEffect(() => {
        x.auth
          .getSession()
          .then(() => c(!0))
          .catch(() => c(!0));
      }, []),
      d.jsx("div", {
        className:
          "min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-100 px-4",
        children: d.jsxs("form", {
          onSubmit: async (m) => {
            if ((m.preventDefault(), !n)) {
              if (!t || t.length < 6)
                return void i(
                  "Invalid Password",
                  "Password must be at least 6 characters.",
                );
              if (t !== s) return void i("Mismatch", "Passwords do not match.");
              a(!0);
              try {
                const { error: f } = await x.auth.updateUser({ password: t });
                if (f) throw f;
                (e(
                  "Password Updated",
                  "You can now sign in with your new password.",
                ),
                  (window.location.href = "/dashboard/"));
              } catch (f) {
                i("Reset Failed", f?.message || "Failed to update password.");
              } finally {
                a(!1);
              }
            }
          },
          className:
            "bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-gray-100",
          children: [
            d.jsx("h2", {
              className: "text-2xl font-bold text-center text-emerald-700",
              children: "Reset Password",
            }),
            l
              ? d.jsxs(d.Fragment, {
                  children: [
                    d.jsxs("div", {
                      children: [
                        d.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          htmlFor: "newPassword",
                          children: "New Password",
                        }),
                        d.jsx("input", {
                          id: "newPassword",
                          type: "password",
                          value: t,
                          onChange: (m) => r(m.target.value),
                          className:
                            "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 text-gray-900",
                          autoComplete: "new-password",
                          required: !0,
                        }),
                      ],
                    }),
                    d.jsxs("div", {
                      children: [
                        d.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          htmlFor: "confirmPassword",
                          children: "Confirm Password",
                        }),
                        d.jsx("input", {
                          id: "confirmPassword",
                          type: "password",
                          value: s,
                          onChange: (m) => o(m.target.value),
                          className:
                            "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 text-gray-900",
                          autoComplete: "new-password",
                          required: !0,
                        }),
                      ],
                    }),
                    d.jsx("button", {
                      type: "submit",
                      disabled: n,
                      className:
                        "w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-emerald-700 transition-all duration-150 disabled:opacity-50",
                      children: n ? "Updating..." : "Update Password",
                    }),
                  ],
                })
              : d.jsx("div", {
                  className: "text-center text-sm text-gray-600",
                  children: "Loading...",
                }),
            d.jsx("div", {
              className: "mt-2 pt-4 border-t border-gray-200 text-center",
              children: d.jsx("button", {
                type: "button",
                onClick: () => {
                  window.location.hostname !== "localhost"
                    ? (window.location.href = "/")
                    : (window.location.href = "http://localhost:8080/");
                },
                className:
                  "inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium transition-colors",
                children: "Back to Homepage",
              }),
            }),
          ],
        }),
      })
    );
  },
  sn = (i) => {
    const e = [];
    return (
      K(i.originCity) && e.push(oe(i.originCity)),
      K(i.originCountry) && e.push(oe(i.originCountry)),
      e.join(", ")
    );
  },
  on = (i) => {
    const e = [];
    return (
      K(i.destinationCity) && e.push(oe(i.destinationCity)),
      K(i.destinationPort) && e.push(`${oe(i.destinationPort)} Port`),
      K(i.destinationCountry) && e.push(oe(i.destinationCountry)),
      e.join(", ")
    );
  },
  nn = ({ order: i, onClose: e, onSave: t }) => {
    const [r, s] = E.useState(""),
      [o, n] = E.useState(""),
      [a, l] = E.useState(""),
      [c, m] = E.useState(() => sn(i)),
      [f, p] = E.useState(() => on(i)),
      [v, T] = E.useState(""),
      [P, N] = E.useState(!1),
      { showError: D } = Wr();
    return (
      E.useEffect(() => {
        (m(sn(i)), p(on(i)));
        const A = new Date();
        (A.setDate(A.getDate() + 30), T(A.toISOString().split("T")[0]));
      }, [i.id]),
      d.jsx("div", {
        className:
          "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
        children: d.jsxs("div", {
          className:
            "bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto",
          children: [
            d.jsx("div", {
              className:
                "p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50",
              children: d.jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  d.jsxs("div", {
                    children: [
                      d.jsx("h2", {
                        className:
                          "text-xl sm:text-2xl font-bold text-gray-900",
                        children: "Create Individual Shipment",
                      }),
                      d.jsxs("p", {
                        className: "text-sm text-gray-600 mt-1",
                        children: ["Order: ", i.description],
                      }),
                      d.jsx("div", {
                        className: "mt-2",
                        children: d.jsx("span", {
                          className:
                            "inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800",
                          children: "Moving to InTransit Status",
                        }),
                      }),
                    ],
                  }),
                  d.jsx("button", {
                    onClick: e,
                    className:
                      "p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors",
                    children: d.jsx("svg", {
                      className: "w-6 h-6",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: d.jsx("path", {
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
            d.jsxs("div", {
              className: "p-4 sm:p-6 space-y-6",
              children: [
                d.jsxs("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                  children: [
                    d.jsxs("div", {
                      children: [
                        d.jsx("label", {
                          htmlFor: "shipOrigin",
                          className:
                            "block text-sm font-semibold text-gray-700 mb-2",
                          children: "Origin Location",
                        }),
                        d.jsx("input", {
                          type: "text",
                          id: "shipOrigin",
                          value: c,
                          onChange: (A) => m(A.target.value),
                          className:
                            "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                          placeholder: "e.g., Istanbul, T\xFCrkiye",
                        }),
                      ],
                    }),
                    d.jsxs("div", {
                      children: [
                        d.jsx("label", {
                          htmlFor: "shipDestination",
                          className:
                            "block text-sm font-semibold text-gray-700 mb-2",
                          children: "Destination Location",
                        }),
                        d.jsx("input", {
                          type: "text",
                          id: "shipDestination",
                          value: f,
                          onChange: (A) => p(A.target.value),
                          className:
                            "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                          placeholder: "e.g., Matadi Port, DR Congo",
                        }),
                      ],
                    }),
                  ],
                }),
                d.jsxs("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                  children: [
                    d.jsxs("div", {
                      children: [
                        d.jsx("label", {
                          htmlFor: "shipCarrier",
                          className:
                            "block text-sm font-semibold text-gray-700 mb-2",
                          children: "Shipping Carrier",
                        }),
                        d.jsx("input", {
                          type: "text",
                          id: "shipCarrier",
                          value: o,
                          onChange: (A) => n(A.target.value),
                          className:
                            "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                          placeholder: "e.g., DHL, FedEx, UPS",
                          required: !0,
                        }),
                      ],
                    }),
                    d.jsxs("div", {
                      children: [
                        d.jsxs("label", {
                          htmlFor: "shipCost",
                          className:
                            "block text-sm font-semibold text-gray-700 mb-2",
                          children: [
                            "Shipping Cost (USD) ",
                            d.jsx("span", {
                              className: "text-red-500",
                              children: "*",
                            }),
                          ],
                        }),
                        d.jsxs("div", {
                          className: "relative",
                          children: [
                            d.jsx("span", {
                              className:
                                "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500",
                              children: "$",
                            }),
                            d.jsx("input", {
                              type: "number",
                              id: "shipCost",
                              value: r,
                              onChange: (A) => s(A.target.value),
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
                d.jsxs("div", {
                  children: [
                    d.jsx("label", {
                      htmlFor: "shipTrackingUrl",
                      className:
                        "block text-sm font-semibold text-gray-700 mb-2",
                      children: "Tracking URL (Optional)",
                    }),
                    d.jsx("input", {
                      type: "url",
                      id: "shipTrackingUrl",
                      value: a,
                      onChange: (A) => l(A.target.value),
                      className:
                        "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                      placeholder: "https://tracking.carrier.com/...",
                    }),
                  ],
                }),
                d.jsxs("div", {
                  children: [
                    d.jsx("label", {
                      htmlFor: "estimatedDelivery",
                      className:
                        "block text-sm font-semibold text-gray-700 mb-2",
                      children: "Estimated Delivery Date",
                    }),
                    d.jsx("input", {
                      type: "date",
                      id: "estimatedDelivery",
                      value: v,
                      onChange: (A) => T(A.target.value),
                      className:
                        "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                      min: new Date().toISOString().split("T")[0],
                      required: !0,
                    }),
                  ],
                }),
                d.jsx("div", {
                  className: "bg-blue-50 border border-blue-200 rounded-xl p-4",
                  children: d.jsxs("div", {
                    className: "flex items-center space-x-2",
                    children: [
                      d.jsx("svg", {
                        className: "w-5 h-5 text-blue-600",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: d.jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                        }),
                      }),
                      d.jsxs("div", {
                        className: "text-sm text-blue-800",
                        children: [
                          d.jsx("p", {
                            className: "font-medium",
                            children: "This will create an individual shipment",
                          }),
                          d.jsx("p", {
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
            d.jsx("div", {
              className:
                "px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl",
              children: d.jsxs("div", {
                className:
                  "flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3",
                children: [
                  d.jsx("button", {
                    onClick: e,
                    className:
                      "px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 transition-colors",
                    children: "Cancel",
                  }),
                  d.jsx("button", {
                    onClick: async () => {
                      if (P) return;
                      const A = parseFloat(r);
                      if (!r.trim() || isNaN(A) || A <= 0)
                        return void D(
                          "Invalid Shipping Cost",
                          "Shipping cost is required and must be greater than 0.",
                        );
                      if (!o.trim())
                        return void D(
                          "Missing Carrier",
                          "Please enter a carrier name.",
                        );
                      if (!c.trim() || !f.trim())
                        return void D(
                          "Missing Route",
                          "Please enter both origin and destination.",
                        );
                      if (!v)
                        return void D(
                          "Missing ETA",
                          "Please select an estimated delivery date.",
                        );
                      const O = new Date(v),
                        j = new Date();
                      if ((j.setHours(0, 0, 0, 0), O < j))
                        D(
                          "Invalid ETA",
                          "Estimated delivery date must be today or in the future.",
                        );
                      else {
                        N(!0);
                        try {
                          await t(i.id, A, o, a, c, f, v);
                        } catch (W) {
                          (console.error("Error saving shipment:", W), N(!1));
                        }
                      }
                    },
                    disabled: P,
                    className:
                      "px-6 py-3 rounded-xl text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 " +
                      (P
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"),
                    children: P
                      ? d.jsxs("div", {
                          className: "flex items-center space-x-2",
                          children: [
                            d.jsxs("svg", {
                              className: "animate-spin w-4 h-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              children: [
                                d.jsx("circle", {
                                  className: "opacity-25",
                                  cx: "12",
                                  cy: "12",
                                  r: "10",
                                  stroke: "currentColor",
                                  strokeWidth: "4",
                                }),
                                d.jsx("path", {
                                  className: "opacity-75",
                                  fill: "currentColor",
                                  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                                }),
                              ],
                            }),
                            d.jsx("span", { children: "Creating Shipment..." }),
                          ],
                        })
                      : d.jsxs("div", {
                          className: "flex items-center space-x-2",
                          children: [
                            d.jsx("svg", {
                              className: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              children: d.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                d: "M5 13l4 4L19 7",
                              }),
                            }),
                            d.jsx("span", { children: "Create Shipment" }),
                          ],
                        }),
                  }),
                ],
              }),
            }),
          ],
        }),
      })
    );
  },
  an = ({ shipment: i, onClose: e, onSave: t }) => {
    const [r, s] = E.useState(i.carrier || ""),
      [o, n] = E.useState(i.trackingUrl || "");
    return d.jsx("div", {
      className:
        "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4",
      children: d.jsxs("div", {
        className:
          "bg-white p-5 sm:p-8 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto",
        children: [
          d.jsxs("h2", {
            className: "text-xl sm:text-2xl font-semibold text-gray-800 mb-6",
            children: ["Edit Tracking Info for Shipment: ", i.id],
          }),
          d.jsxs("div", {
            className: "space-y-4",
            children: [
              d.jsxs("div", {
                children: [
                  d.jsx("label", {
                    htmlFor: "editCarrier",
                    className: "block text-sm font-medium text-gray-700",
                    children: "Carrier",
                  }),
                  d.jsx("input", {
                    type: "text",
                    id: "editCarrier",
                    value: r,
                    onChange: (a) => s(a.target.value),
                    className:
                      "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900",
                    placeholder: "e.g., DHL, FedEx",
                  }),
                ],
              }),
              d.jsxs("div", {
                children: [
                  d.jsx("label", {
                    htmlFor: "editTrackingUrl",
                    className: "block text-sm font-medium text-gray-700",
                    children: "Tracking URL",
                  }),
                  d.jsx("input", {
                    type: "url",
                    id: "editTrackingUrl",
                    value: o,
                    onChange: (a) => n(a.target.value),
                    className:
                      "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900",
                    placeholder: "https://...",
                  }),
                ],
              }),
            ],
          }),
          d.jsxs("div", {
            className:
              "mt-8 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3",
            children: [
              d.jsx("button", {
                onClick: e,
                className:
                  "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50",
                children: "Cancel",
              }),
              d.jsx("button", {
                onClick: () => {
                  t(i.id, r, o);
                },
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
  ad = () => {
    const { user: i, loading: e, logout: t } = Xo(),
      { showError: r, showSuccess: s, showWarning: o } = Wr(),
      n = (
        typeof window < "u" ? window.location.pathname.replace(/\/+$/, "") : ""
      ).endsWith("/reset-password"),
      [a, l] = E.useState(!1),
      [c, m] = E.useState([]),
      [f, p] = E.useState(!1),
      [v, T] = E.useState([]),
      [P, N] = E.useState(!1),
      [D, A] = E.useState(null),
      [O, j] = E.useState([]),
      [W, ee] = E.useState(!1),
      [ie, ge] = E.useState(null),
      [ue, ne] = E.useState([]),
      [ye, U] = E.useState(!1),
      [De, Fe] = E.useState(null),
      [ae, z] = E.useState([]),
      [B, se] = E.useState(!1),
      [Le, Oe] = E.useState(null),
      [Qe, Ie] = E.useState([]),
      [nt, It] = E.useState(!1),
      [rt, be] = E.useState(null),
      [we, Re] = E.useState(0),
      [Ze, at] = E.useState(!1),
      [M, me] = E.useState(!1),
      [ce, re] = E.useState([]),
      [vt, At] = E.useState([]),
      [Dr, dd] = E.useState(!1),
      [cd, ud] = E.useState(null),
      Yi = Object.freeze({
        customer: {
          pageSize: 50,
          readRetentionDays: 21,
          unreadRetentionDays: 75,
        },
        admin: {
          pageSize: 100,
          readRetentionDays: 21,
          unreadRetentionDays: 75,
        },
      }),
      ai = Yi.admin.pageSize,
      li = Yi.customer.pageSize,
      [Xi, Zi] = E.useState({}),
      [ln, es] = E.useState(!1),
      [ts, rs] = E.useState(!1),
      [Ar, dn] = E.useState({
        totalSuppliers: 0,
        totalOrders: 0,
        totalActiveConsolidations: 0,
        totalShipments: 0,
      }),
      [cn, un] = E.useState({
        pendingOrders: 0,
        inProgressOrders: 0,
        readyOrders: 0,
        shipments: 0,
      }),
      [hn, mn] = E.useState({
        departingSoon: 0,
        capacityRisk: 0,
        highVarianceRisk: 0,
        missingTracking: 0,
        missingShipment: 0,
        negativeBalances: 0,
      }),
      [is, pn] = E.useState(!1),
      [Ae, $r] = E.useState("orders"),
      [gn, di] = E.useState(null),
      [Rr, gr] = E.useState(null),
      [Mr, Fr] = E.useState(null),
      ci = (h) =>
        (c.find((u) => u.id === h)?.role || i?.role || et.Customer) ===
        et.Admin,
      ui = async (h, u = !1, y) => {
        try {
          const b = await ze.createTransaction(h, u, y);
          return (b && z((S) => [...S, b]), b);
        } catch (b) {
          return (r("Save Error", "Error saving transaction: " + b), null);
        }
      },
      hi = E.useCallback(
        (h, u) =>
          u.filter((y) => y.customerId === h).reduce((y, b) => y + b.amount, 0),
        [],
      ),
      $t = (h, u) => {
        if (u)
          try {
            if (h === "shipments") return void mi(u);
            h === "orders"
              ? localStorage.setItem(
                  "sourcevia_nav_intent",
                  JSON.stringify({ page: "orders", orderId: u }),
                )
              : h === "consolidations"
                ? localStorage.setItem(
                    "sourcevia_nav_intent",
                    JSON.stringify({
                      page: "consolidations",
                      consolidationId: u,
                    }),
                  )
                : h === "payments" &&
                  localStorage.setItem(
                    "sourcevia_nav_intent",
                    JSON.stringify({ page: "payments", transactionId: u }),
                  );
          } catch {}
        (h !== "shipments" && di(null), $r(h));
      },
      fn = async (h, u) => {
        try {
          const y = ue.find((S) => S.id === h);
          if (!y)
            return void r("Not Found", "Consolidation not found in memory.");
          let b = Number(u || y.shippingCost || 0);
          if (!b || b <= 0) {
            const S = ae
              .filter(
                ($) =>
                  $.relatedConsolidationId === h && $.type === Y.ShippingCost,
              )
              .reduce(($, k) => $ + Math.abs(Number(k.amount || 0)), 0);
            S > 0.01 && (b = S);
          }
          if (!b || b <= 0)
            return void r(
              "Missing Cost",
              "No shipping cost is set on the consolidation, and there are no ShippingCost transactions to infer it from. Set an actual shipping cost first.",
            );
          (await zt.redistributeShippingCosts(h, b, y, O),
            await Promise.allSettled([Ve(), Ke()]));
        } catch (y) {
          const b = y instanceof Error ? y.message : String(y);
          r("Recalculate Failed", b);
        }
      },
      mi = (h) => {
        (di(h), $r("shipments"));
      },
      ss = E.useCallback(async () => {
        p(!0);
        try {
          if (i == null || !i.id) return void m([]);
          const h = await en.getById(i.id);
          if (!h) return void m([]);
          if (h.role === "admin") {
            const u = await en.fetchAll();
            m(u);
          } else m([h]);
        } catch (h) {
          (console.error("Error fetching customers:", h),
            setCustomersError(
              h instanceof Error ? h.message : "Failed to fetch customers",
            ));
        } finally {
          p(!1);
        }
      }, [i?.id]),
      Ve = E.useCallback(async (h = null) => {
        (se(!0), Oe(null));
        try {
          const u = h
            ? await ze.getByCustomerId(h)
            : await ze.fetchAllTransactions();
          z(u);
        } catch (u) {
          (console.error("Exception fetching payment transactions:", u),
            Oe(
              u instanceof Error
                ? u.message
                : "Failed to fetch payment transactions",
            ));
        }
        se(!1);
      }, []),
      os = E.useCallback(
        async (h) => {
          await Ve(h);
        },
        [Ve],
      );
    E.useEffect(() => {
      i && ss();
    }, [i, ss]);
    const yn = async (h) => {
        try {
          const { data: u, error: y } = await x.auth.signUp({
            email: h.email,
            password: h.password,
            options: {
              data: { name: h.contactPerson, company_name: h.companyName },
            },
          });
          if (y)
            return void r(
              "Account Creation Failed",
              "Error creating user account: " + y.message,
            );
          if (!u.user)
            return void r(
              "Account Creation Failed",
              "Failed to create user account",
            );
          const { data: b, error: S } = await x
            .from("customers")
            .select("*")
            .eq("id", u.user.id)
            .single();
          if (S && S.code !== "PGRST116")
            return void r(
              "Database Error",
              "Error checking for auto-created customer: " + S.message,
            );
          let $;
          if (b) {
            const { data: C, error: w } = await x
              .from("customers")
              .update({
                name: h.contactPerson,
                company_name: h.companyName,
                phone: h.phone || "",
                address: h.address || "",
                notes: h.notes || "",
                contract_type_id: h.contractType,
                role: et.Customer,
              })
              .eq("id", u.user.id)
              .select();
            if (w)
              return void r(
                "Update Error",
                "Error updating customer: " + w.message,
              );
            $ = C;
          } else {
            const { data: C, error: w } = await x
              .from("customers")
              .insert([
                {
                  id: u.user.id,
                  name: h.contactPerson,
                  email: h.email,
                  company_name: h.companyName,
                  phone: h.phone || "",
                  address: h.address || "",
                  notes: h.notes || "",
                  contract_type_id: h.contractType,
                  has_used_trial_fee: !1,
                  role: et.Customer,
                },
              ])
              .select();
            if (w) {
              try {
                const { data: F } = await x.auth.getSession(),
                  L = F?.session,
                  J = L?.access_token;
                J &&
                  (await fetch("/.netlify/functions/admin-delete-user", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${J}`,
                    },
                    body: JSON.stringify({ userId: u.user.id }),
                  }));
              } catch (F) {
                console.error(
                  "Could not rollback auth user after customer insert error:",
                  F,
                );
              }
              return void r(
                "Database Error",
                "Error adding customer: " + w.message,
              );
            }
            $ = C;
          }
          const k = ($ || []).map((C) => ({
            id: C.id,
            contactPerson: C.name,
            email: C.email,
            companyName: C.company_name,
            contractType: C.contract_type_id,
            hasUsedTrialFee: C.has_used_trial_fee,
            role: C.role || et.Customer,
            phone: C.phone || "",
            address: C.address || "",
            notes: C.notes,
          }));
          (m((C) => [...C, ...k]),
            s(
              "Customer Created",
              `Customer created successfully! The customer can now log in with email: ${h.email}`,
            ));
        } catch (u) {
          r("Creation Error", "Error creating customer: " + u.message);
        }
      },
      bn = async (h, u) => {
        const y = {};
        (u.contactPerson !== void 0 && (y.name = u.contactPerson),
          u.email !== void 0 && (y.email = u.email),
          u.companyName !== void 0 && (y.company_name = u.companyName),
          u.phone !== void 0 && (y.phone = u.phone),
          u.address !== void 0 && (y.address = u.address),
          u.notes !== void 0 && (y.notes = u.notes),
          u.contractType !== void 0 && (y.contract_type_id = u.contractType),
          u.hasUsedTrialFee !== void 0 &&
            (y.has_used_trial_fee = u.hasUsedTrialFee),
          u.role !== void 0 && (y.role = u.role));
        const { data: b, error: S } = await x
          .from("customers")
          .update(y)
          .eq("id", h)
          .select();
        if (S) r("Update Error", "Error updating customer: " + S.message);
        else {
          const $ = (b || []).map((k) => ({
            id: k.id,
            contactPerson: k.name,
            email: k.email,
            companyName: k.company_name,
            contractType: k.contract_type_id,
            hasUsedTrialFee: k.has_used_trial_fee,
            role: k.role || et.Customer,
            phone: k.phone || "",
            address: k.address || "",
            notes: k.notes,
          }));
          m((k) => k.map((C) => (C.id === h ? $[0] : C)));
        }
      },
      wn = async (h) => {
        if (!h) throw new Error("Customer ID is required.");
        const { data: u, error: y } = await x.auth.getSession();
        if (y) throw new Error(y.message || "Could not read current session.");
        const b = u?.session,
          S = b?.access_token;
        if (!S) throw new Error("Missing session token. Please sign in again.");
        const $ = (() => {
            try {
              return new URL("/dashboard/", window.location.origin).toString();
            } catch {
              return "";
            }
          })(),
          k = [
            "/.netlify/functions/admin-generate-magic-link",
            "/netlify/functions/admin-generate-magic-link",
          ];
        let C = null,
          w = null,
          F = null;
        for (const Q of k) {
          const G = await fetch(Q, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${S}`,
              },
              body: JSON.stringify(
                $ ? { userId: h, redirectTo: $ } : { userId: h },
              ),
            }),
            I = await G.clone()
              .json()
              .catch(() => null),
            q =
              I &&
              typeof I == "object" &&
              typeof I.code == "string" &&
              I.code.trim() !== "";
          if (G.status !== 404 || q || Q === k[k.length - 1]) {
            ((C = G), (w = Q), (F = I && typeof I == "object" ? I : null));
            break;
          }
        }
        const L = F || (await C?.json().catch(() => ({})));
        if (C == null || !C.ok) {
          const Q = String(L?.code || "").trim();
          if (C?.status === 404 && !Q)
            throw new Error(
              `Magic link endpoint not found (${w || "/.netlify/functions/admin-generate-magic-link"}). If local, run a Netlify functions runtime. If deployed, redeploy the site with latest functions.`,
            );
          const G = String(L?.message || "").trim();
          throw new Error(
            Q === "forbidden"
              ? "Only admins can generate magic links."
              : Q === "target_not_found"
                ? "Customer not found."
                : Q === "target_missing_email"
                  ? "Customer does not have an email address."
                  : Q === "target_not_customer"
                    ? "Magic links can only be generated for customer accounts."
                    : Q === "missing_auth"
                      ? "Authentication required. Please sign in again."
                      : Q === "invalid_user_id"
                        ? "Invalid customer id."
                        : Q === "generate_link_failed" && G
                          ? `Failed to generate magic link: ${G}`
                          : "Failed to generate magic link.",
          );
        }
        const J = String(L?.actionLink || "").trim();
        if (!J)
          throw new Error(
            "Magic link was generated but no link was returned by the server.",
          );
        return J;
      },
      Lr = "order-draft-temp",
      vn = new Set([
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/webp",
      ]),
      _n = async (h) => {
        const u = String(h || "").trim();
        if (!u) throw new Error("Invalid order id.");
        const { data: y, error: b } = await x.storage
          .from(Lr)
          .list(u, {
            limit: 100,
            sortBy: { column: "created_at", order: "desc" },
          });
        if (b) throw new Error(b.message || "Failed to list draft documents.");
        return (y || [])
          .filter((S) => S && typeof S.name == "string" && S.name.trim() !== "")
          .map((S) => {
            var $, k;
            const C = String(S.name || ""),
              w = C.replace(/^\d{13}-[a-z0-9]+-/i, ""),
              F = Number(($ = S.metadata) == null ? void 0 : $.size) || 0,
              L = String(
                ((k = S.metadata) == null ? void 0 : k.mimetype) ||
                  "application/octet-stream",
              ).toLowerCase();
            return {
              path: `${u}/${C}`,
              storedName: C,
              name: w || C,
              size: F,
              mimeType: L,
              createdAt: S.created_at || S.updated_at || "",
              updatedAt: S.updated_at || "",
            };
          });
      },
      xn = async (h, u) => {
        const y = String(h || "").trim();
        if (!y) throw new Error("Invalid order id.");
        if (!(u instanceof File))
          throw new Error("Please choose a valid file.");
        if (!u.size || u.size <= 0) throw new Error("File is empty.");
        if (u.size > 10485760) throw new Error("File exceeds 10 MB limit.");
        const b = String(u.type || "")
          .toLowerCase()
          .trim();
        if (!vn.has(b))
          throw new Error("Only PDF, JPG, PNG, and WEBP files are allowed.");
        const S = ((w) =>
            String(w || "")
              .replace(/[/\\?%*:|"<>]/g, "-")
              .replace(/\s+/g, "-")
              .replace(/[^a-zA-Z0-9._-]/g, "")
              .replace(/-+/g, "-")
              .replace(/^\.+/, "")
              .trim() || "document")(u.name),
          $ = Math.random().toString(36).slice(2, 10),
          k = `${y}/${Date.now()}-${$}-${S}`,
          { error: C } = await x.storage
            .from(Lr)
            .upload(k, u, {
              upsert: !1,
              cacheControl: "3600",
              contentType: b || "application/octet-stream",
            });
        if (C) {
          const w = String(C.message || "").toLowerCase();
          throw new Error(
            w.includes("row-level security")
              ? "You do not have permission to upload files for this order."
              : w.includes("maximum allowed size")
                ? "File exceeds 10 MB limit."
                : C.message || "Failed to upload document.",
          );
        }
        return {
          path: k,
          name: S,
          size: u.size,
          mimeType: b || "application/octet-stream",
        };
      },
      Cn = async (h, u) => {
        const y = String(h || "").trim(),
          b = String(u || "").trim();
        if (!y || !b || !b.startsWith(`${y}/`))
          throw new Error("Invalid document path.");
        const { error: S } = await x.storage.from(Lr).remove([b]);
        if (S) throw new Error(S.message || "Failed to delete document.");
        return !0;
      },
      Sn = async (h, u) => {
        const y = String(h || "").trim(),
          b = String(u || "").trim();
        if (!y || !b || !b.startsWith(`${y}/`))
          throw new Error("Invalid document path.");
        const { data: S, error: $ } = await x.storage
          .from(Lr)
          .createSignedUrl(b, 1800);
        if ($) throw new Error($.message || "Failed to create document link.");
        const k = String(S?.signedUrl || "").trim();
        if (!k) throw new Error("Could not create a temporary document link.");
        return k;
      },
      ns = async () => {
        l(!0);
        try {
          if (
            (await t(),
            window.location.hostname === "localhost" &&
              window.location.port === "3001")
          )
            return void window.location.replace("http://localhost:8080/");
          window.location.replace("/");
        } catch (h) {
          (console.error("Error during logout:", h), l(!1));
        }
      },
      ft = E.useCallback(async (h = null) => {
        (N(!0), A(null));
        try {
          if (h) {
            const y = await Bt.getByCustomerId(h),
              b = [...new Set(y.map((k) => k.supplierId).filter(Boolean))];
            if (b.length === 0) return void T([]);
            const { data: S, error: $ } = await x
              .from("suppliers")
              .select("*")
              .in("id", b);
            if ($) throw $;
            return void T(
              (S || []).map((k) => ({
                id: k.id,
                name: k.name,
                companyLocation: k.company_location,
                phoneNumber: k.phone_number,
                contactPerson: k.contact_person,
                rating: k.rating,
              })),
            );
          }
          const u = await Yl.fetchAll();
          T(u);
        } catch (u) {
          (console.error("Error fetching suppliers:", u),
            A(u instanceof Error ? u.message : "Failed to fetch suppliers"));
        } finally {
          N(!1);
        }
      }, []),
      kn = async (h) => {
        const { data: u, error: y } = await x
          .from("suppliers")
          .insert([
            {
              name: h.name,
              company_location: h.companyLocation,
              phone_number: h.phoneNumber,
              contact_person: h.contactPerson,
              rating: h.rating,
            },
          ])
          .select();
        if (y) r("Database Error", "Error adding supplier: " + y.message);
        else {
          const b = (u || []).map((S) => ({
            id: S.id,
            name: S.name,
            companyLocation: S.company_location,
            phoneNumber: S.phone_number,
            contactPerson: S.contact_person,
            rating: S.rating,
          }));
          T((S) => [...S, ...b]);
        }
      },
      In = async (h, u) => {
        const y = {};
        (u.name !== void 0 && (y.name = u.name),
          u.companyLocation !== void 0 &&
            (y.company_location = u.companyLocation),
          u.phoneNumber !== void 0 && (y.phone_number = u.phoneNumber),
          u.contactPerson !== void 0 && (y.contact_person = u.contactPerson),
          u.rating !== void 0 && (y.rating = u.rating));
        const { data: b, error: S } = await x
          .from("suppliers")
          .update(y)
          .eq("id", h)
          .select();
        if (S) r("Update Error", "Error updating supplier: " + S.message);
        else {
          const $ = (b || []).map((k) => ({
            id: k.id,
            name: k.name,
            companyLocation: k.company_location,
            phoneNumber: k.phone_number,
            contactPerson: k.contact_person,
            rating: k.rating,
          }));
          T((k) => k.map((C) => (C.id === h ? $[0] : C)));
        }
      },
      Tn = async (h) => {
        const { error: u } = await x.from("suppliers").delete().eq("id", h);
        u
          ? r("Delete Error", "Error deleting supplier: " + u.message)
          : T((y) => y.filter((b) => b.id !== h));
      },
      He = E.useCallback(async (h = null) => {
        (ee(!0), ge(null));
        try {
          const u = h ? await Bt.getByCustomerId(h) : await Bt.fetchAll();
          j(u);
        } catch (u) {
          (console.error("Error fetching orders:", u),
            ge(u instanceof Error ? u.message : "Failed to fetch orders"));
        } finally {
          ee(!1);
        }
      }, []),
      as = async (h, u, y = {}) => {
        var b;
        const S = String(y?.intent || "").toLowerCase(),
          $ = !!xe,
          k = K(h.requestedSupplierName)
            ? String(h.requestedSupplierName).trim()
            : "",
          C = h.supplierId || null;
        let w = $ ? g.Pending : g.Draft;
        if (
          (S === "submitted" && (w = g.Submitted),
          $ && S === "draft" && (w = g.Draft),
          $ && !C)
        )
          return void r(
            "Missing Supplier",
            "Admin orders must have a supplier selected.",
          );
        if (!$ && !C && !k)
          return void r(
            "Missing Supplier",
            "Select an existing supplier or enter a supplier name.",
          );
        const F = {
          description: h.description,
          value: h.value,
          supplier_id: C,
          requested_supplier_name: C ? null : k || null,
          volume_m3: h.volumeM3,
          weight_kg: h.weightKG,
          customer_id: u,
          status: w,
          notes: h.notes,
          origin_country: K(h.originCountry) ? oe(h.originCountry) : null,
          origin_city: K(h.originCity) ? oe(h.originCity) : null,
          destination_country: K(h.destinationCountry)
            ? oe(h.destinationCountry)
            : null,
          destination_city: K(h.destinationCity) ? oe(h.destinationCity) : null,
          destination_port: K(h.destinationPort) ? oe(h.destinationPort) : null,
          ready_date: K(h.readyDate) ? h.readyDate : null,
        };
        let L = null,
          J = null;
        if (
          (({ data: L, error: J } = await x
            .from("orders")
            .insert([F])
            .select()),
          J)
        ) {
          const q = String(J.message || "");
          if (
            String(J.code || "") !== "42703" &&
            !q.toLowerCase().includes("requested_supplier_name")
          )
            return void r("Database Error", "Error adding order: " + J.message);
          const te = {
            ...F,
            notes: [
              F.notes || "",
              !F.supplier_id && k ? `[Requested Supplier] ${k}` : "",
            ].filter(Boolean).join(`
`),
          };
          delete te.requested_supplier_name;
          const { data: ve, error: Te } = await x
            .from("orders")
            .insert([te])
            .select();
          if (Te)
            return void r(
              "Database Error",
              "Error adding order: " + Te.message,
            );
          L = ve || [];
        }
        const Q = (L || []).map((q) => ({
          id: q.id,
          description: q.description,
          value: q.value,
          supplierId: q.supplier_id,
          volumeM3: q.volume_m3,
          weightKG: q.weight_kg,
          customerId: q.customer_id,
          status: q.status,
          notes: q.notes,
          requestedSupplierName:
            q.requested_supplier_name || (q.supplier_id ? "" : k),
          creationDate: q.creation_date,
          originCountry: q.origin_country || "",
          originCity: q.origin_city || "",
          destinationCountry: q.destination_country || "",
          destinationCity: q.destination_city || "",
          destinationPort: q.destination_port || "",
          readyDate: q.ready_date || "",
          chargesApplied: !!q.charges_applied,
        }));
        j((q) => [...q, ...Q]);
        const G = Q[0];
        if (G)
          try {
            const q =
              G.status === g.Draft
                ? `Draft order "${G.description}" saved`
                : G.status === g.Submitted
                  ? `Order "${G.description}" submitted for approval`
                  : `New order "${G.description}" created`;
            await de.createCustomerNotification(u, q, {
              importance: G.status === g.Submitted ? X.High : X.Medium,
              linkToPage: "orders",
              linkToId: G.id,
              eventType: "order_created",
              relatedEntityType: "order",
              relatedEntityId: G.id,
            });
            const te =
                ((b = c.find((Pe) => Pe.id === u)) == null
                  ? void 0
                  : b.contactPerson) || "Customer",
              ve = $
                ? `New order "${G.description}" created by Admin for ${te}`
                : G.status === g.Submitted
                  ? `Order "${G.description}" submitted for approval by ${te}`
                  : `Draft order "${G.description}" saved by ${te}`,
              Te = G.status === g.Submitted ? X.High : X.Medium;
            (await de.createAdminNotification(ve, {
              importance: Te,
              linkToPage: "orders",
              linkToId: G.id,
              eventType: "order_created",
              relatedEntityType: "order",
              relatedEntityId: G.id,
            }),
              await it());
          } catch (q) {
            console.error("Error creating notification:", q);
          }
        const I = Q[0];
        I &&
          (await de.createNotification({
            userId: u,
            message:
              I.status === g.Draft
                ? `Draft order "${I.description}" has been saved`
                : I.status === g.Submitted
                  ? `Order "${I.description}" has been submitted for admin approval`
                  : `Order "${I.description}" has been created and is pending confirmation`,
            linkToPage: "orders",
            linkToId: I.id,
            importance: I.status === g.Submitted ? X.High : X.Medium,
          }));
      },
      dt = async (h, u, y = !1) => {
        const b = O.find((C) => C.id === h);
        if (!b) return;
        if (
          !y &&
          [
            g.InTransit,
            g.CustomsClearance,
            g.OutForDelivery,
            g.Delivered,
            g.Cancelled,
          ].includes(b.status)
        ) {
          const C = [
            g.InTransit,
            g.CustomsClearance,
            g.OutForDelivery,
            g.Completed,
          ].includes(b.status)
            ? "This order is locked because it is currently being shipped. Order details for shipped orders cannot be modified for audit and tracking purposes. Changes must be managed through the Shipments page."
            : "This order is locked because it has already been delivered or cancelled. For audit and business reasons, delivered/cancelled orders cannot be edited. If you need to make an exception, please contact an administrator.";
          return void o("Order Locked", C);
        }
        const S = {};
        (u.description !== void 0 && (S.description = u.description),
          u.value !== void 0 && (S.value = u.value),
          u.supplierId !== void 0 && (S.supplier_id = u.supplierId),
          u.requestedSupplierName !== void 0 &&
            (S.requested_supplier_name = K(u.requestedSupplierName)
              ? String(u.requestedSupplierName).trim()
              : null),
          u.volumeM3 !== void 0 && (S.volume_m3 = u.volumeM3),
          u.weightKG !== void 0 && (S.weight_kg = u.weightKG),
          u.customerId !== void 0 && (S.customer_id = u.customerId),
          u.status !== void 0 && (S.status = u.status),
          u.notes !== void 0 && (S.notes = u.notes),
          u.originCountry !== void 0 &&
            (S.origin_country = K(u.originCountry)
              ? oe(u.originCountry)
              : null),
          u.originCity !== void 0 &&
            (S.origin_city = K(u.originCity) ? oe(u.originCity) : null),
          u.destinationCountry !== void 0 &&
            (S.destination_country = K(u.destinationCountry)
              ? oe(u.destinationCountry)
              : null),
          u.destinationCity !== void 0 &&
            (S.destination_city = K(u.destinationCity)
              ? oe(u.destinationCity)
              : null),
          u.destinationPort !== void 0 &&
            (S.destination_port = K(u.destinationPort)
              ? oe(u.destinationPort)
              : null),
          u.readyDate !== void 0 &&
            (S.ready_date = K(u.readyDate) ? u.readyDate : null));
        let $ = null,
          k = null;
        if (
          (({ data: $, error: k } = await x
            .from("orders")
            .update(S)
            .eq("id", h)
            .select()),
          k &&
            S.requested_supplier_name !== void 0 &&
            (String(k.code || "") === "42703" ||
              String(k.message || "")
                .toLowerCase()
                .includes("requested_supplier_name")))
        ) {
          const C = { ...S };
          if (
            (delete C.requested_supplier_name,
            u.requestedSupplierName !== void 0 && u.notes === void 0)
          ) {
            const w = K(u.requestedSupplierName)
                ? `[Requested Supplier] ${String(u.requestedSupplierName).trim()}`
                : "",
              F = String(b.notes || "")
                .split(/\r?\n/)
                .filter((L) => !String(L).startsWith("[Requested Supplier]"))
                .join(
                  `
`,
                )
                .trim();
            C.notes = [F, w].filter(Boolean).join(`
`);
          }
          ({ data: $, error: k } = await x
            .from("orders")
            .update(C)
            .eq("id", h)
            .select());
        }
        if (k) r("Update Error", "Error updating order: " + k.message);
        else {
          const C = ($ || []).map((w) => ({
            id: w.id,
            description: w.description,
            value: w.value,
            supplierId: w.supplier_id,
            volumeM3: w.volume_m3,
            weightKG: w.weight_kg,
            customerId: w.customer_id,
            status: w.status,
            notes: w.notes,
            requestedSupplierName: w.requested_supplier_name || "",
            creationDate: w.creation_date,
            originCountry: w.origin_country || "",
            originCity: w.origin_city || "",
            destinationCountry: w.destination_country || "",
            destinationCity: w.destination_city || "",
            destinationPort: w.destination_port || "",
            readyDate: w.ready_date || "",
            chargesApplied: !!w.charges_applied,
          }));
          if (C[0]) {
            try {
              const w = C[0],
                F = Object.keys(u || {}).map((L) => ({
                  field: L,
                  previousValue: b[L],
                  newValue: w[L],
                }));
              await Je.logAction(bt.ORDER_DETAILS_UPDATED, "order", h, {
                userId: i?.id,
                previousState: b,
                newState: w,
                changes: F,
              });
            } catch (w) {
              console.warn("Audit log failed (non-fatal):", w);
            }
            j((w) => w.map((F) => (F.id === h ? C[0] : F)));
          } else
            console.error(
              "updateOrderDetails: No transformed data returned from database update",
            );
        }
      },
      En = async (h) => {
        const u = O.find((y) => y.id === h);
        if (u)
          if ([g.Draft, g.Submitted, g.Pending].includes(u.status)) {
            const { error: y } = await x.from("orders").delete().eq("id", h);
            y
              ? r("Delete Error", "Error deleting order: " + y.message)
              : (j((b) => b.filter((S) => S.id !== h)),
                await de.createNotification({
                  userId: u.customerId,
                  message: `${u.status} order "${u.description}" has been deleted`,
                  linkToPage: "orders",
                  importance: X.Medium,
                }));
          } else
            r(
              "Cannot Delete Confirmed Order",
              `This order cannot be deleted because it has been confirmed and charges have been applied. Current status: ${u.status}. Please contact an administrator if you need to cancel this order.`,
            );
        else r("Order Not Found", "Order not found for deletion");
      },
      [jn, Ur] = E.useState(new Set()),
      pi = async (h) => {
        if ((Z(`[DEBUG] confirmOrder called for order ${h}`), jn.has(h)))
          return (
            Z(
              `[DEBUG] Order ${h} is already being charged, skipping duplicate charge application`,
            ),
            void o(
              "Charges In Progress",
              "This order is currently being charged. Please wait for the process to complete.",
            )
          );
        const u = O.find((k) => k.id === h);
        if (!u)
          return void r("Order Not Found", "Order not found for confirmation");
        (Z(`[DEBUG] Order found: ${u.description} - Status: ${u.status}`),
          Z(`[DEBUG] Total payment transactions in memory: ${ae.length}`));
        const y = ae
            .filter((k) => k.relatedOrderId === h && k.type === Y.OrderCost)
            .reduce((k, C) => k + Math.abs(C.amount), 0),
          b = ae
            .filter(
              (k) => k.relatedOrderId === h && k.type === Y.OrderCostReversal,
            )
            .reduce((k, C) => k + Math.abs(C.amount), 0),
          S = Math.max(0, y - b),
          $ = S > 0.01;
        if (
          (Z(`[DEBUG] Checking for existing charges for order ${h}...`),
          Z("[DEBUG] Charge state:", {
            chargedOrderCost: y,
            reversedOrderCost: b,
            remainingOrderCost: S,
            hasActiveCharges: $,
          }),
          $)
        )
          return (
            Z(
              `[DEBUG] Found existing charges for order ${h}, skipping duplicate charge application`,
            ),
            void o(
              "Charges Already Applied",
              "This order already has active order-cost charges.",
            )
          );
        if (
          (Ur((k) => new Set([...k, h])), !c.find((k) => k.id === u.customerId))
        )
          return (
            Ur((k) => {
              const C = new Set(k);
              return (C.delete(h), C);
            }),
            void r(
              "Customer Not Found",
              "Customer not found for order confirmation",
            )
          );
        try {
          if (
            !(await ui({
              customerId: u.customerId,
              amount: -Math.abs(u.value),
              description: `Order cost for ${u.description}`,
              type: Y.OrderCost,
              relatedOrderId: u.id,
              idempotencyKey: `order-charge:${u.id}:order-cost`,
            }))
          )
            throw new Error("Failed to persist order cost transaction");
          try {
            await dt(h, { chargesApplied: !0 });
          } catch (k) {
            if (!(k instanceof Error && k.message.includes("charges_applied")))
              throw k;
            Z(
              "[DEBUG] chargesApplied column not yet added to database - using transaction-based duplicate detection",
            );
          }
          (await de.createNotification({
            userId: u.customerId,
            message: `Order "${u.description}" has been confirmed. Order cost: $${u.value.toFixed(2)}. Service fee will be applied when shipment is created.`,
            linkToPage: "orders",
            linkToId: u.id,
            importance: X.High,
          }),
            Ur((k) => {
              const C = new Set(k);
              return (C.delete(h), C);
            }),
            Z(
              `[DEBUG] Successfully charged order ${h}, clearing charging flag`,
            ));
        } catch (k) {
          (console.error("Error confirming order:", k),
            Ur((w) => {
              const F = new Set(w);
              return (F.delete(h), F);
            }));
          const C = k instanceof Error ? k.message : "Unknown error occurred";
          throw (
            r(
              "Confirmation Error",
              "Failed to confirm order and apply charges: " + C,
            ),
            k
          );
        }
      },
      ls = async (h, u) => {
        const y = O.find((I) => I.id === h);
        if (!y) return;
        const b = String(y.status || ""),
          S = String(u || ""),
          $ =
            !xe &&
            !(i == null || !i.id) &&
            String(y.customerId || "") === String(i?.id),
          k = {
            [g.Draft]: [g.Submitted, g.Cancelled],
            [g.Submitted]: [g.Draft, g.Cancelled],
          };
        if (!xe && !$)
          return void o(
            "Not Allowed",
            "You can only update statuses for your own draft orders.",
          );
        if ($) {
          if (b === S) return;
          if (!(k[b] || []).includes(S))
            return void o(
              "Not Allowed",
              "Customers can only move draft orders between Draft, Submitted, and Cancelled.",
            );
        }
        if (u === g.Submitted) {
          const I = [];
          if (
            ((!y.description || String(y.description).trim() === "") &&
              I.push("description"),
            !K(y.destinationCountry) && I.push("destination country"),
            !K(y.destinationCity) && I.push("destination city"),
            !y.supplierId && !K(y.requestedSupplierName) && I.push("supplier"),
            I.length > 0)
          )
            return void o(
              "Missing Required Fields",
              `Before submission, fill: ${I.join(", ")}.`,
            );
        }
        if (u === g.Pending) {
          const I = [];
          if (
            ((!y.description || String(y.description).trim() === "") &&
              I.push("description"),
            (!y.value || Number(y.value) <= 0) && I.push("value"),
            (!y.volumeM3 || Number(y.volumeM3) <= 0) && I.push("volume"),
            (!y.weightKG || Number(y.weightKG) <= 0) && I.push("weight"),
            !K(y.destinationCountry) && I.push("destination country"),
            !K(y.destinationCity) && I.push("destination city"),
            I.length > 0)
          )
            return void o(
              "Missing Required Fields",
              `Before approving to Pending, fill: ${I.join(", ")}.`,
            );
        }
        const C = ue.find((I) => I.orderIds.includes(h));
        if (C)
          return void o(
            "Order In Consolidation",
            `This order is currently in consolidation "${C.name}" and its status is managed automatically by the consolidation. Manual status updates are not allowed. To change this order's status, manage it through the consolidation or remove it from the consolidation first.`,
          );
        const w = ce.some((I) => I.relatedId === h && I.type === "individual"),
          F = ue.some(
            (I) =>
              I.orderIds.includes(h) &&
              [_.InTransit, _.Delivered, _.Completed].includes(I.status),
          ),
          L = [
            g.InTransit,
            g.CustomsClearance,
            g.OutForDelivery,
            g.Delivered,
            g.Completed,
          ],
          J = y.status === g.Cancelled && (w || F);
        if (L.includes(y.status) || J) {
          const I = [
            g.InTransit,
            g.CustomsClearance,
            g.OutForDelivery,
          ].includes(y.status)
            ? "This order is locked because it is currently being shipped. Status changes for shipped orders must be managed through the Shipments page for proper tracking and audit purposes."
            : "This order is locked because it has already been delivered or has shipment activity. For audit and business reasons, these orders cannot be edited. If you need to make an exception, please contact an administrator.";
          return void o("Order Locked", I);
        }
        if (
          [
            g.Pending,
            g.Processing,
            g.QualityCheck,
            g.ReadyToShip,
            g.InConsolidation,
            g.InTransit,
            g.CustomsClearance,
            g.OutForDelivery,
            g.Delivered,
            g.Completed,
          ].includes(u) &&
          !y.supplierId
        )
          return void o(
            "Supplier Required",
            "Assign a supplier before approving this order to operational statuses.",
          );
        if (u === g.InTransit) return void gr(y);
        let Q = !1;
        if (
          (y.status === g.Pending &&
            u === g.Processing &&
            (await pi(h), (Q = !0)),
          u === g.Processing && !Q)
        ) {
          const I = ae
              .filter(
                (te) => te.relatedOrderId === h && te.type === Y.OrderCost,
              )
              .reduce((te, ve) => te + Math.abs(ve.amount), 0),
            q = ae
              .filter(
                (te) =>
                  te.relatedOrderId === h && te.type === Y.OrderCostReversal,
              )
              .reduce((te, ve) => te + Math.abs(ve.amount), 0);
          Math.max(0, I - q) > 0.01 || (await pi(h));
        }
        const G = y.status;
        if ((await dt(h, { status: u }, !0), u === g.Processing))
          try {
            await (async (I) => {
              if (!I) return null;
              const { data: q, error: te } = await x.auth.getSession();
              if (te)
                throw new Error(
                  te.message || "Could not read current session.",
                );
              const ve = q?.session,
                Te = ve?.access_token;
              if (!Te)
                throw new Error("Missing session token. Please sign in again.");
              const Pe = [
                "/.netlify/functions/order-draft-docs-cleanup",
                "/netlify/functions/order-draft-docs-cleanup",
              ];
              let R = null,
                Ce = null,
                Ue = null;
              for (const Ye of Pe) {
                const st = await fetch(Ye, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${Te}`,
                    },
                    body: JSON.stringify({ orderId: I }),
                  }),
                  ke = await st
                    .clone()
                    .json()
                    .catch(() => null),
                  fe =
                    ke &&
                    typeof ke == "object" &&
                    typeof ke.code == "string" &&
                    ke.code.trim() !== "";
                if (st.status !== 404 || fe || Ye === Pe[Pe.length - 1]) {
                  ((R = st),
                    (Ce = Ye),
                    (Ue = ke && typeof ke == "object" ? ke : null));
                  break;
                }
              }
              const ct = Ue || (await R?.json().catch(() => ({})));
              if (R == null || !R.ok) {
                const Ye = String(ct?.code || "").trim();
                if (R?.status === 404 && !Ye)
                  throw new Error(
                    `Draft docs cleanup endpoint not found (${Ce || "/.netlify/functions/order-draft-docs-cleanup"}). If local, run a Netlify functions runtime. If deployed, redeploy the site with latest functions.`,
                  );
                const st = String(ct?.message || "").trim();
                throw new Error(
                  Ye === "forbidden"
                    ? "Only admins can clean draft temp documents."
                    : Ye === "missing_auth"
                      ? "Authentication required. Please sign in again."
                      : Ye === "invalid_order_id"
                        ? "Invalid order id for draft document cleanup."
                        : Ye === "order_not_found"
                          ? "Order not found for draft document cleanup."
                          : Ye === "order_not_processing"
                            ? "Order must be in Processing before temp draft documents can be cleaned."
                            : Ye === "cleanup_failed" && st
                              ? `Draft docs cleanup failed: ${st}`
                              : "Draft docs cleanup failed.",
                );
              }
              return ct || null;
            })(h);
          } catch (I) {
            (console.warn("Draft temp docs cleanup failed (non-fatal):", I),
              o(
                "Draft Document Cleanup",
                I instanceof Error && I.message
                  ? I.message
                  : "Could not clean temporary draft documents.",
              ));
          }
        try {
          await Je.logAction(bt.ORDER_STATUS_UPDATED, "order", h, {
            userId: i?.id,
            changes: [{ field: "status", previousValue: G, newValue: u }],
            metadata: { previousStatus: G, newStatus: u },
          });
        } catch (I) {
          console.warn("Audit log failed (non-fatal):", I);
        }
        if (u === g.Cancelled) {
          const I = ae
              .filter((R) => R.relatedOrderId === h && R.type === Y.OrderCost)
              .reduce((R, Ce) => R + Math.abs(Ce.amount), 0),
            q = ae
              .filter((R) => R.relatedOrderId === h && R.type === Y.ServiceFee)
              .reduce((R, Ce) => R + Math.abs(Ce.amount), 0),
            te = ae
              .filter(
                (R) => R.relatedOrderId === h && R.type === Y.OrderCostReversal,
              )
              .reduce((R, Ce) => R + Math.abs(Ce.amount), 0),
            ve = ae
              .filter(
                (R) =>
                  R.relatedOrderId === h && R.type === Y.ServiceFeeReversal,
              )
              .reduce((R, Ce) => R + Math.abs(Ce.amount), 0),
            Te = Math.max(0, I - te),
            Pe = Math.max(0, q - ve);
          (Te > 0.01 &&
            (await ui({
              customerId: y.customerId,
              amount: Math.abs(Te),
              description: `Order cost reversal for cancelled order ${je(y.id, "order")}`,
              type: Y.OrderCostReversal,
              relatedOrderId: y.id,
            })),
            Pe > 0.01 &&
              (await ui({
                customerId: y.customerId,
                amount: Math.abs(Pe),
                description: `Service fee reversal for cancelled order ${je(y.id, "order")}`,
                type: Y.ServiceFeeReversal,
                relatedOrderId: y.id,
              })));
        }
        (await de.createOrderStatusNotification(
          h,
          String(G || ""),
          String(u),
          y.customerId || "",
          y.description || "",
        ),
          await it());
      },
      ds = async (h, u, y, b, S, $, k) => {
        if (ce.find((C) => C.relatedId === h && C.type === "individual"))
          return (
            o(
              "Shipment Exists",
              "A shipment already exists for this order. Please check the Shipments page.",
            ),
            void gr(null)
          );
        try {
          const C = O.find((w) => w.id === h);
          if (!C) throw new Error("Order not found");
          (await Bt.createIndividualShipment(h, u, y, b, C, S, $, k),
            await He(),
            await Ge(),
            await Ve(),
            await it());
        } catch (C) {
          r("Creation Error", "Error creating shipment: " + C);
        } finally {
          gr(null);
        }
      },
      Ge = E.useCallback(
        async (h = null) => {
          try {
            const u = h ? await wt.getByCustomerId(h) : await wt.fetchAll();
            re(u);
          } catch (u) {
            (console.error("Error fetching shipments:", u),
              r("Fetch Error", "Error fetching shipments: " + u));
          }
        },
        [r],
      ),
      Nn = async (h, u, y, b, S, $, k) => {
        if (ce.find((w) => w.relatedId === h && w.type === "consolidation"))
          return void o(
            "Shipment Exists",
            "A shipment already exists for this consolidation. Please check the Shipments page.",
          );
        const C = ue.find((w) => w.id === h);
        if (C != null && C.shippingCostDistributed)
          o(
            "Already Distributed",
            "Shipping costs have already been distributed for this consolidation.",
          );
        else if (await wt.existsForRelatedId(h, "consolidation"))
          o(
            "Shipment Exists",
            "A shipment already exists for this consolidation. Please check the Shipments page.",
          );
        else if (C)
          try {
            (await zt.createShipment(h, u, y, b, S, $, k, C, O),
              await Ge(),
              await Ke(),
              await Ve(),
              await it());
          } catch (w) {
            const F = w instanceof Error ? w.message : String(w);
            if (
              F.includes("Duplicate shipment") ||
              F.includes("idempotency_key")
            )
              return void o(
                "Shipment Exists",
                "A shipment already exists for this consolidation. Please check the Shipments page.",
              );
            r("Creation Error", "Error creating consolidation shipment: " + F);
          }
        else
          r(
            "Consolidation Not Found",
            "Could not find the consolidation to create shipment for.",
          );
      },
      cs = async (h, u, y) => {
        try {
          const b = ce.find((S) => S.id === h) || null;
          (await wt.updateTracking(h, u, y), Fr(null), await Ge());
          try {
            await Je.logAction(bt.SHIPMENT_TRACKING_UPDATED, "shipment", h, {
              userId: i?.id,
              previousState: b || void 0,
              newState: { ...(b || {}), carrier: u, trackingUrl: y },
              changes: [
                { field: "carrier", previousValue: b?.carrier, newValue: u },
                {
                  field: "trackingUrl",
                  previousValue: b?.trackingUrl,
                  newValue: y,
                },
              ],
            });
          } catch (S) {
            console.warn("Audit log failed (non-fatal):", S);
          }
        } catch (b) {
          (console.error("Error updating shipment tracking:", b),
            r("Update Error", "Error updating shipment tracking: " + b));
        }
      },
      us = async (h, u, y = !1) => {
        const b = ce.find((k) => k.id === h);
        if (!b) return;
        if (String(u) === _.Completed && b.type === "consolidation") {
          const k = b.relatedId || b.consolidationId,
            C = k ? ue.find((w) => w.id === k) : null;
          if (C && !C.shippingCostDistributed)
            return void o(
              "Finalize Costs First",
              "Set and distribute actual shipping cost before marking this consolidation shipment as completed.",
            );
        }
        if (Kr(u) && !String(b.trackingUrl || "").trim())
          return void o(
            "Tracking Required",
            "Add a tracking URL before marking this shipment as delivered.",
          );
        const S = b.status,
          $ =
            Kr(u) && !b.actualDelivery
              ? new Date().toISOString()
              : b.actualDelivery;
        try {
          if (
            (re((C) =>
              C.map((w) =>
                w.id === h
                  ? {
                      ...w,
                      status: u,
                      ...($ !== void 0 ? { actualDelivery: $ } : {}),
                    }
                  : w,
              ),
            ),
            b.type === "consolidation" && !y)
          ) {
            const C = ((w) => Ba[String(w) || ""] || null)(u);
            C &&
              (ne((w) =>
                w.map((F) => (F.id === b.relatedId ? { ...F, status: C } : F)),
              ),
              hs(b.relatedId, C, !0));
          }
          if (b.type === "individual") {
            const C = ((w) =>
              w === "Completed"
                ? g.Completed
                : w === "Delivered"
                  ? g.Delivered
                  : w === "Cancelled"
                    ? g.Cancelled
                    : w === "OnHold"
                      ? g.OnHold
                      : w === "OutForDelivery"
                        ? g.OutForDelivery
                        : w === "CustomsClearance"
                          ? g.CustomsClearance
                          : w === "InTransit"
                            ? g.InTransit
                            : null)(String(u));
            if (C) {
              (j((F) =>
                F.map((L) => (L.id === b.relatedId ? { ...L, status: C } : L)),
              ),
                dt(b.relatedId, { status: C }, !0));
              const w = O.find((F) => F.id === b.relatedId);
              w &&
                de.createOrderStatusNotification(
                  b.relatedId,
                  String(w.status),
                  String(C),
                  w.customerId || "",
                  w.description || "",
                );
            }
          }
          const k = await wt.updateStatus(h, u, b);
          k && re((C) => C.map((w) => (w.id === h ? k : w)));
          try {
            await Je.logAction(bt.SHIPMENT_STATUS_UPDATED, "shipment", h, {
              userId: i?.id,
              changes: [{ field: "status", previousValue: S, newValue: u }],
              metadata: {
                previousStatus: S,
                newStatus: u,
                skipConsolidationSync: y,
              },
            });
          } catch (C) {
            console.warn("Audit log failed (non-fatal):", C);
          }
          it();
        } catch (k) {
          (console.error("Error updating shipment status:", k),
            r("Update Error", "Error updating shipment status: " + k),
            Ge(),
            He());
        }
      },
      Ke = E.useCallback(async (h = null) => {
        (U(!0), Fe(null));
        try {
          const u = h ? await zt.getByCustomerId(h) : await zt.fetchAll();
          ne(u);
        } catch (u) {
          (console.error("Error fetching consolidations:", u),
            Fe(
              u instanceof Error ? u.message : "Failed to fetch consolidations",
            ));
        } finally {
          U(!1);
        }
      }, []),
      On = async (h, u, y, b, S, $) => {
        try {
          Z("[DEBUG] UI calling consolidationService.create:", {
            consolidationName: h.name,
            estimatedShippingCost: u,
            estimatedShippingCostType: typeof u,
            isMixed: b,
            costDistributionMethod: S,
          });
          const k = await zt.create(h, u, y, b, S, $);
          return (ne((C) => [...C, k]), k);
        } catch (k) {
          return (
            r("Creation Error", "Error creating consolidation: " + k),
            null
          );
        }
      },
      Pn = async (h) => {
        const u = ue.find((y) => y.id === h);
        if (u)
          if ((u.orderIds || []).length > 0)
            o(
              "Cannot Delete Consolidation",
              "This consolidation still has orders. Remove all orders first, then delete.",
            );
          else if (
            ce.find(
              (y) =>
                y.type === "consolidation" &&
                (y.relatedId === h || y.consolidationId === h),
            )
          )
            o(
              "Cannot Delete Consolidation",
              "A shipment is linked to this consolidation. Delete/cancel shipment flow first.",
            );
          else if (u.shippingCostDistributed)
            o(
              "Cannot Delete Consolidation",
              "Shipping cost has already been distributed for this consolidation.",
            );
          else if (ae.some((y) => y.relatedConsolidationId === h))
            o(
              "Cannot Delete Consolidation",
              "Payment transactions are linked to this consolidation.",
            );
          else
            try {
              (await zt.delete(h),
                ne((y) => y.filter((b) => b.id !== h)),
                await de.createSystemNotification(
                  `Consolidation "${u.name}" deleted`,
                  { importance: X.Medium, linkToPage: "consolidations" },
                ),
                await it());
            } catch (y) {
              r(
                "Delete Error",
                "Error deleting consolidation: " +
                  (y instanceof Error ? y.message : String(y)),
              );
            }
        else
          r(
            "Consolidation Not Found",
            "Could not find the consolidation to delete.",
          );
      },
      Dn = async (h, u) => {
        const y = ue.find((w) => w.id === h),
          b = {};
        (u.name !== void 0 && (b.name = u.name),
          u.route !== void 0 && (b.route = u.route),
          u.originCountry !== void 0 &&
            (b.origin_country = K(u.originCountry)
              ? oe(u.originCountry)
              : null),
          u.originCity !== void 0 &&
            (b.origin_city = K(u.originCity) ? oe(u.originCity) : null),
          u.destinationCountry !== void 0 &&
            (b.destination_country = K(u.destinationCountry)
              ? oe(u.destinationCountry)
              : null),
          u.destinationCity !== void 0 &&
            (b.destination_city = K(u.destinationCity)
              ? oe(u.destinationCity)
              : null),
          u.destinationPort !== void 0 &&
            (b.destination_port = K(u.destinationPort)
              ? oe(u.destinationPort)
              : null),
          u.departureDate !== void 0 && (b.departure_date = u.departureDate),
          u.containerTypeId !== void 0 &&
            (b.container_type_id = u.containerTypeId),
          u.shippingCost !== void 0 && (b.shipping_cost = u.shippingCost),
          u.estimatedShippingCost !== void 0 &&
            (b.estimated_shipping_cost =
              u.estimatedShippingCost > 0 ? u.estimatedShippingCost : null),
          u.status !== void 0 && (b.status = u.status));
        const S =
            u.estimatedShippingCost !== void 0
              ? u.estimatedShippingCost
              : (y?.estimatedShippingCost ?? 0),
          $ =
            u.shippingCost !== void 0 ? u.shippingCost : (y?.shippingCost ?? 0);
        if (u.shippingCost !== void 0 || u.estimatedShippingCost !== void 0)
          if (S > 0 && $ > 0) {
            const w = $ - S,
              F = (w / S) * 100;
            ((b.cost_variance = w), (b.cost_variance_percentage = F));
          } else
            ((b.cost_variance = null), (b.cost_variance_percentage = null));
        if (
          (u.isMixed !== void 0 && (b.is_mixed = u.isMixed),
          u.customerId !== void 0 && (b.customer_id = u.customerId),
          u.shippingCostDistributed !== void 0 &&
            (b.shipping_cost_distributed = u.shippingCostDistributed),
          u.costDistributionMethod !== void 0 &&
            (b.cost_distribution_method = u.costDistributionMethod),
          u.fixedRatePerM3 !== void 0 &&
            (b.fixed_rate_per_m3 = u.fixedRatePerM3),
          u.totalBilledAmount !== void 0 &&
            (b.total_billed_amount = u.totalBilledAmount),
          u.notes !== void 0 && (b.notes = u.notes),
          u.containerTypeId !== void 0)
        ) {
          const w = ue.find((L) => L.id === h),
            F = vr.find((L) => L.id === u.containerTypeId);
          if (w && F) {
            const L = O.filter((q) => w.orderIds.includes(q.id)),
              J = L.reduce((q, te) => q + te.volumeM3, 0),
              Q = L.reduce((q, te) => q + te.weightKG, 0),
              G = Math.min((J / F.maxVolumeM3) * 100, 100),
              I = Math.min((Q / F.maxWeightKG) * 100, 100);
            ((b.container_space_filled_percentage = G),
              (b.container_weight_filled_percentage = I));
          }
        }
        const { data: k, error: C } = await x
          .from("consolidations")
          .update(b)
          .eq("id", h)
          .select();
        if (C) r("Update Error", "Error updating consolidation: " + C.message);
        else {
          const { data: w, error: F } = await x
            .from("consolidations_with_orders")
            .select("*")
            .eq("id", h)
            .single();
          if (F)
            r(
              "Fetch Error",
              "Error fetching updated consolidation: " + F.message,
            );
          else {
            const L = {
              id: w.id,
              name: w.name,
              route:
                w.route ||
                Nr({
                  originCountry: w.origin_country,
                  originCity: w.origin_city,
                  destinationCountry: w.destination_country,
                  destinationCity: w.destination_city,
                  destinationPort: w.destination_port,
                }),
              originCountry: w.origin_country || "",
              originCity: w.origin_city || "",
              destinationCountry: w.destination_country || "",
              destinationCity: w.destination_city || "",
              destinationPort: w.destination_port || "",
              departureDate: w.departure_date,
              creationDate: w.creation_date,
              orderIds: w.order_ids || [],
              containerTypeId: w.container_type_id,
              containerSpaceFilledPercentage:
                w.container_space_filled_percentage || 0,
              containerWeightFilledPercentage:
                w.container_weight_filled_percentage || 0,
              shippingCost: w.shipping_cost,
              estimatedShippingCost: w.estimated_shipping_cost ?? void 0,
              costVariance: w.cost_variance ?? void 0,
              costVariancePercentage: w.cost_variance_percentage ?? void 0,
              status: w.status,
              isMixed: w.is_mixed,
              customerId: w.customer_id,
              involvedCustomerIds: w.involved_customer_ids || [],
              shippingCostDistributed: w.shipping_cost_distributed,
              costDistributionMethod: w.cost_distribution_method,
              fixedRatePerM3: w.fixed_rate_per_m3,
              totalBilledAmount: w.total_billed_amount,
              notes: w.notes,
            };
            if (
              (ne((J) => J.map((Q) => (Q.id === h ? L : Q))),
              L.status === _.Cancelled)
            )
              for (const J of L.orderIds)
                await dt(J, { status: g.ReadyToShip }, !0);
            else {
              const J = Gr(L.status);
              for (const Q of L.orderIds) await dt(Q, { status: J }, !0);
            }
          }
        }
      },
      hs = async (h, u, y = !1) => {
        const b = ue.find(($) => $.id === h);
        if (!b) return;
        const S = (b.orderIds || []).filter(Boolean).length;
        if ((($) => qa.has($))(u) && S === 0)
          o(
            "No Orders",
            `Cannot move this consolidation to "${u}" because it has no orders. Add at least one order before advancing consolidation status.`,
          );
        else if (
          !y &&
          b.orderIds
            .map(($) => O.find((k) => k.id === $))
            .filter(
              ($) =>
                $ && [g.Delivered, g.Completed, g.Cancelled].includes($.status),
            ).length > 0
        )
          o(
            "Consolidation Locked",
            "This consolidation cannot be updated because one or more related orders are locked (shipped, delivered, completed, or cancelled). For audit and business reasons, these orders and their consolidations cannot be changed directly. If you need to make an exception, please contact an administrator.",
          );
        else if (
          !ce.find(($) => $.type === "consolidation" && $.relatedId === h) ||
          y
        )
          try {
            const $ = b.status;
            (await zt.updateStatus(h, u, b),
              ne((w) => w.map((F) => (F.id === h ? { ...F, status: u } : F))));
            const k = ce.find(
              (w) => w.type === "consolidation" && w.relatedId === h,
            );
            if (k && !y) {
              const w = ((F) => za[String(F) || ""] || null)(u);
              w && (await us(k.id, w, !0));
            }
            const C = O.filter((w) => b.orderIds.includes(w.id));
            if (u === _.Cancelled) {
              for (const w of C)
                (await dt(w.id, { status: g.ReadyToShip }, !0),
                  await de.createNotification({
                    userId: w.customerId,
                    message: `Consolidation "${b.name}" has been cancelled. Your order "${w.description}" is now ready for individual shipping or will be included in a new consolidation.`,
                    linkToPage: "orders",
                    linkToId: w.id,
                    importance: X.High,
                  }));
              (await ms(b.id, [], !0),
                await de.createSystemNotification(
                  `Consolidation "${b.name}" cancelled. ${C.length} orders returned to available pool.`,
                  { linkToPage: "consolidations", linkToId: b.id },
                ));
            } else {
              const w = Gr(u),
                F = {
                  [g.Pending]: 2,
                  [g.Processing]: 3,
                  [g.QualityCheck]: 4,
                  [g.ReadyToShip]: 5,
                  [g.InConsolidation]: 5,
                  [g.InTransit]: 6,
                  [g.CustomsClearance]: 7,
                  [g.OutForDelivery]: 8,
                  [g.Delivered]: 9,
                  [g.Completed]: 9,
                  [g.OnHold]: 0,
                  [g.Cancelled]: 0,
                };
              for (const L of C) {
                const J = F[L.status] || 0;
                if (
                  (F[w] || 0) > J ||
                  (w === g.Completed && L.status === g.Delivered)
                ) {
                  const Q = L.status;
                  (await dt(L.id, { status: w }, !0),
                    await de.createOrderStatusNotification(
                      L.id,
                      String(Q),
                      String(w),
                      L.customerId,
                      L.description,
                    ));
                }
              }
            }
            (await de.createSystemNotification(
              `Consolidation "${b.name}" status changed from ${$} to ${u}`,
              {
                linkToPage: "consolidations",
                linkToId: b.id,
                importance: X.Medium,
              },
            ),
              await it());
          } catch ($) {
            r("Update Error", "Error updating consolidation status: " + $);
          }
        else
          o(
            "Consolidation Locked",
            'This consolidation status cannot be changed directly because it has an associated shipment. Please manage the status through the Shipments page instead. Once a consolidation becomes "In Transit" and creates a shipment, all status changes must be done through shipment management for audit and tracking purposes.',
          );
      },
      ms = async (h, u, y = !1) => {
        const b = ue.find((R) => R.id === h),
          S = vr.find((R) => R.id === b?.containerTypeId);
        if (!b || !S)
          return void r(
            "Not Found",
            "Error: Consolidation or container type not found.",
          );
        const $ = new Set([
          _.InTransit,
          _.CustomsClearance,
          _.OutForDelivery,
          _.Delivered,
          _.Completed,
          _.Cancelled,
        ]);
        if (!y && $.has(b.status))
          return void o(
            "Invalid Status",
            `Cannot modify orders while consolidation status is "${b.status}".`,
          );
        if (!y && b.shippingCostDistributed)
          return void o(
            "Shipping Costs Distributed",
            "Cannot modify orders: shipping costs already distributed. Revert status to Planning or Loading first if manual review approves changes.",
          );
        const k = b.orderIds || [],
          C = u.filter((R) => !k.includes(R)),
          w = k.filter((R) => !u.includes(R));
        for (const R of C)
          O.find((Ce) => Ce.id === R)?.status === g.Pending && (await pi(R));
        const F = O.filter((R) => u.includes(R.id)),
          L = F.reduce((R, Ce) => R + Ce.volumeM3, 0),
          J = F.reduce((R, Ce) => R + Ce.weightKG, 0),
          Q = [...new Set(F.map((R) => R.customerId).filter(Boolean))],
          G = Q.length > 1,
          I = G ? null : (Q[0] ?? null);
        Z(`Updating consolidation ${h} - involved customer IDs:`, Q);
        const q = Math.min((L / S.maxVolumeM3) * 100, 100),
          te = Math.min((J / S.maxWeightKG) * 100, 100);
        if (w.length > 0) {
          const { error: R } = await x
            .from("consolidation_orders")
            .delete()
            .eq("consolidation_id", h)
            .in("order_id", w);
          if (R)
            return void r(
              "Delete Error",
              "Error removing selected orders: " + R.message,
            );
        }
        if (C.length > 0) {
          const R = C.map((Ue) => ({ consolidation_id: h, order_id: Ue })),
            { error: Ce } = await x
              .from("consolidation_orders")
              .upsert(R, {
                onConflict: "consolidation_id,order_id",
                ignoreDuplicates: !0,
              });
          if (Ce)
            return void r(
              "Database Error",
              "Error adding selected orders: " + Ce.message,
            );
        }
        const ve = {};
        Q.length > 0 && ((ve.is_mixed = G), (ve.customer_id = I));
        const { data: Te, error: Pe } = await x
          .from("consolidations")
          .update({
            container_space_filled_percentage: q,
            container_weight_filled_percentage: te,
            involved_customer_ids: Q,
            ...ve,
          })
          .eq("id", h)
          .select();
        if (Pe)
          r(
            "Update Error",
            "Error updating consolidation percentages: " + Pe.message,
          );
        else {
          const { data: R, error: Ce } = await x
            .from("consolidations_with_orders")
            .select("*")
            .eq("id", h)
            .single();
          if (Ce)
            r(
              "Fetch Error",
              "Error fetching updated consolidation: " + Ce.message,
            );
          else {
            const Ue = {
              id: R.id,
              name: R.name,
              route:
                R.route ||
                Nr({
                  originCountry: R.origin_country,
                  originCity: R.origin_city,
                  destinationCountry: R.destination_country,
                  destinationCity: R.destination_city,
                  destinationPort: R.destination_port,
                }),
              originCountry: R.origin_country || "",
              originCity: R.origin_city || "",
              destinationCountry: R.destination_country || "",
              destinationCity: R.destination_city || "",
              destinationPort: R.destination_port || "",
              departureDate: R.departure_date,
              creationDate: R.creation_date,
              orderIds: R.order_ids || [],
              containerTypeId: R.container_type_id,
              containerSpaceFilledPercentage:
                R.container_space_filled_percentage || 0,
              containerWeightFilledPercentage:
                R.container_weight_filled_percentage || 0,
              shippingCost: R.shipping_cost,
              status: R.status,
              isMixed: R.is_mixed,
              customerId: R.customer_id,
              involvedCustomerIds: R.involved_customer_ids || [],
              shippingCostDistributed: R.shipping_cost_distributed,
              costDistributionMethod: R.cost_distribution_method,
              fixedRatePerM3: R.fixed_rate_per_m3,
              totalBilledAmount: R.total_billed_amount,
              notes: R.notes,
            };
            ne((ke) => ke.map((fe) => (fe.id === h ? Ue : fe)));
            try {
              await Je.logAction(
                bt.CONSOLIDATION_ORDERS_UPDATED,
                "consolidation",
                h,
                {
                  userId: i?.id,
                  previousState: { ...b, orderIds: k },
                  newState: Ue,
                  metadata: {
                    addedOrderIds: C,
                    removedOrderIds: w,
                    involvedCustomerIds: Q,
                  },
                  changes: [
                    { field: "orderIds", previousValue: k, newValue: u },
                    {
                      field: "involvedCustomerIds",
                      previousValue: b.involvedCustomerIds || [],
                      newValue: Q,
                    },
                  ],
                },
              );
            } catch (ke) {
              console.warn("Audit log failed (non-fatal):", ke);
            }
            if (C.length > 0) {
              const ke = ji(Ue.status),
                fe = Gr(Ue.status),
                $e = {
                  [g.Pending]: 2,
                  [g.Processing]: 3,
                  [g.QualityCheck]: 4,
                  [g.ReadyToShip]: 5,
                  [g.InConsolidation]: 5,
                  [g.InTransit]: 6,
                  [g.CustomsClearance]: 7,
                  [g.OutForDelivery]: 8,
                  [g.Delivered]: 9,
                  [g.Completed]: 9,
                  [g.OnHold]: 0,
                  [g.Cancelled]: 0,
                };
              for (const Xe of C) {
                const Ee = O.find((yt) => yt.id === Xe);
                if (Ee) {
                  let yt;
                  if (ke) {
                    const Tt = $e[Ee.status] || 0,
                      Et = $e[g.QualityCheck] || 0;
                    ((yt = g.InConsolidation),
                      Z(`[DEBUG] Planning phase - Order ${Xe}:`, {
                        orderStatus: Ee.status,
                        currentOrderLevel: Tt,
                        preservedReadiness: Tt >= Et,
                        newStatus: yt,
                        consolidationPhase: Ue.status,
                      }));
                  } else {
                    const Tt = $e[Ee.status] || 0,
                      Et = $e[fe] || 0;
                    (Z(`[DEBUG] Operational phase - Order ${Xe}:`, {
                      orderStatus: Ee.status,
                      currentOrderLevel: Tt,
                      consolidationStatus: Ue.status,
                      consolidationMappedStatus: fe,
                      consolidationLevel: Et,
                      willAdvance:
                        Et > Tt ||
                        (fe === g.Completed && Ee.status === g.Delivered),
                    }),
                      (yt =
                        Et > Tt ||
                        (fe === g.Completed && Ee.status === g.Delivered)
                          ? fe
                          : Ee.status));
                  }
                  const Br = Ee.status;
                  (Br !== yt &&
                    (await dt(Xe, { status: yt }, !0),
                    await de.createOrderStatusNotification(
                      Xe,
                      String(Br),
                      String(yt),
                      Ee.customerId,
                      Ee.description,
                    )),
                    await de.createNotification({
                      userId: Ee.customerId,
                      message: `Order "${Ee.description}" has been added to consolidation "${b.name}"`,
                      linkToPage: "consolidations",
                      linkToId: h,
                      importance: X.High,
                    }));
                }
              }
            }
            if (w.length > 0)
              for (const ke of w) {
                const fe = O.find(($e) => $e.id === ke);
                if (fe) {
                  const $e = fe.status;
                  (await dt(ke, { status: g.ReadyToShip }, !0),
                    $e !== g.ReadyToShip &&
                      (await de.createOrderStatusNotification(
                        ke,
                        String($e),
                        String(g.ReadyToShip),
                        fe.customerId,
                        fe.description,
                      )),
                    await de.createNotification({
                      userId: fe.customerId,
                      message: `Order "${fe.description}" has been removed from consolidation "${b.name}"`,
                      linkToPage: "consolidations",
                      linkToId: h,
                      importance: X.High,
                    }));
                }
              }
            const ct = Gr(Ue.status),
              Ye = ji(Ue.status),
              st = {
                [g.Pending]: 2,
                [g.Processing]: 3,
                [g.QualityCheck]: 4,
                [g.ReadyToShip]: 5,
                [g.InConsolidation]: 5,
                [g.InTransit]: 6,
                [g.CustomsClearance]: 7,
                [g.OutForDelivery]: 8,
                [g.Delivered]: 9,
                [g.Completed]: 9,
                [g.OnHold]: 0,
                [g.Cancelled]: 0,
              };
            for (const ke of Ue.orderIds) {
              const fe = O.find(($e) => $e.id === ke);
              if (fe) {
                let $e;
                const Xe = st[fe.status] || 0;
                if (Ye) {
                  const Ee = st[g.QualityCheck] || 0;
                  (($e =
                    Xe >= Ee || Xe < st[g.InConsolidation]
                      ? g.InConsolidation
                      : fe.status),
                    Z(`[DEBUG] Planning phase sync - Order ${ke}:`, {
                      orderStatus: fe.status,
                      currentOrderLevel: Xe,
                      preservedReadiness: Xe >= Ee,
                      newStatus: $e,
                      consolidationPhase: Ue.status,
                    }));
                } else {
                  const Ee = st[ct] || 0;
                  (Z(`[DEBUG] Operational phase sync - Order ${ke}:`, {
                    orderStatus: fe.status,
                    currentOrderLevel: Xe,
                    consolidationStatus: Ue.status,
                    consolidationMappedStatus: ct,
                    consolidationLevel: Ee,
                    willAdvance:
                      Ee > Xe ||
                      (ct === g.Completed && fe.status === g.Delivered),
                  }),
                    ($e =
                      Ee > Xe ||
                      (ct === g.Completed && fe.status === g.Delivered)
                        ? ct
                        : fe.status));
                }
                if (fe.status !== $e) {
                  const Ee = fe.status;
                  (await dt(ke, { status: $e }, !0),
                    await de.createOrderStatusNotification(
                      ke,
                      String(Ee),
                      String($e),
                      fe.customerId,
                      fe.description,
                    ));
                }
              }
            }
            await it();
          }
        }
      },
      An = async (h, u, y) => {
        try {
          const b = await ze.createIncomingPayment(h, u, y);
          return (
            !!b &&
            (z((S) => [...S, b]),
            s(
              "Payment Added",
              `Payment of $${u.toLocaleString()} has been successfully recorded!`,
            ),
            !0)
          );
        } catch (b) {
          return (r("Database Error", "Error adding payment: " + b), !1);
        }
      },
      $n = async (h, u, y) => {
        try {
          const b = await ze.createRefundPayout(h, u, y);
          return (
            !!b &&
            (z((S) => [...S, b]),
            s(
              "Refund Recorded",
              `Refund payout of $${u.toLocaleString()} has been successfully recorded!`,
            ),
            !0)
          );
        } catch (b) {
          return (r("Database Error", "Error recording refund: " + b), !1);
        }
      },
      Rn = async (h, u, y, b, S, $) => {
        try {
          if (!$ && h === null && S) {
            const C = ue.find((w) => w.id === S);
            if (C && C.isMixed && C.involvedCustomerIds.length > 0) {
              const w = O.filter((L) => C.orderIds.includes(L.id)),
                F = w.reduce((L, J) => L + J.volumeM3, 0);
              if (F > 0) {
                const L = [],
                  J = new Map();
                for (const Q of w) {
                  const G = J.get(Q.customerId) || 0;
                  J.set(Q.customerId, G + Q.volumeM3);
                }
                for (const [Q, G] of J) {
                  const I = (G / F) * u;
                  if (I > 0) {
                    const q = await ze.createMiscellaneousCost(
                      Q,
                      I,
                      `${y} (Mixed Consolidation: ${C.name})`,
                      void 0,
                      S,
                    );
                    q && L.push(q);
                  }
                }
                if (L.length > 0)
                  return (
                    z((Q) => [...Q, ...L]),
                    s(
                      "Cost Distributed",
                      `Miscellaneous cost of $${u.toLocaleString()} has been distributed among ${L.length} customers based on volume usage!`,
                    ),
                    !0
                  );
              }
              o(
                "Distribution Failed",
                "Could not distribute cost to customers. Creating as system cost.",
              );
            }
          }
          const k = await ze.createMiscellaneousCost(h, u, y, b, S);
          return (
            !!k &&
            (z((C) => [...C, k]),
            s(
              "Cost Added",
              `Miscellaneous ${h ? "customer-specific" : "system"} cost of $${u.toLocaleString()} has been successfully recorded!`,
            ),
            !0)
          );
        } catch (k) {
          return (
            r("Database Error", "Error adding miscellaneous cost: " + k),
            !1
          );
        }
      },
      gi = async (h) => {
        const { data: u, error: y } = await x
          .from("notifications")
          .update({ is_read: !0 })
          .eq("id", h)
          .select();
        y
          ? r(
              "Update Error",
              "Error marking notification as read: " + y.message,
            )
          : Ie((b) => b.map((S) => (S.id === h ? { ...S, isRead: !0 } : S)));
      },
      ps = async () => {
        if (i == null || !i.id) return !1;
        const h = async ($) => {
          const { data: k, error: C } = await x
            .from("notifications")
            .select("id")
            .eq("is_read", !1)
            .or(or(i.id, xe, $))
            .limit(5e3);
          if (C || k == null || !k.length) return { data: k, error: C };
          const w = k.map((F) => F.id).filter(Boolean);
          return w.length === 0
            ? { data: [], error: null }
            : await x
                .from("notifications")
                .update({ is_read: !0 })
                .in("id", w)
                .eq("is_read", !1)
                .select("id");
        };
        let u = Ne(),
          { data: y, error: b } = await h(u);
        if (
          (b && qt(b) && ((u = Ne()), ({ data: y, error: b } = await h(u))),
          b && Er(b) && ((u = Ne()), ({ data: y, error: b } = await h(u))),
          b)
        )
          return (
            r(
              "Update Error",
              "Error marking all notifications as read: " + b.message,
            ),
            !1
          );
        if (!y || y.length === 0) return !0;
        const S = new Set(y.map(($) => $.id));
        return (
          Ie(($) => $.map((k) => (S.has(k.id) ? { ...k, isRead: !0 } : k))),
          !0
        );
      },
      fi = E.useCallback(
        (h) => ({
          id: h.id,
          name: h.name,
          route:
            h.route ||
            Nr({
              originCountry: h.origin_country,
              originCity: h.origin_city,
              destinationCountry: h.destination_country,
              destinationCity: h.destination_city,
              destinationPort: h.destination_port,
            }),
          originCountry: h.origin_country || "",
          originCity: h.origin_city || "",
          destinationCountry: h.destination_country || "",
          destinationCity: h.destination_city || "",
          destinationPort: h.destination_port || "",
          departureDate: h.departure_date,
          creationDate: h.creation_date,
          orderIds: h.order_ids || [],
          containerTypeId: h.container_type_id,
          containerSpaceFilledPercentage:
            h.container_space_filled_percentage || 0,
          containerWeightFilledPercentage:
            h.container_weight_filled_percentage || 0,
          shippingCost: h.shipping_cost,
          estimatedShippingCost: h.estimated_shipping_cost ?? void 0,
          costVariance: h.cost_variance ?? void 0,
          costVariancePercentage: h.cost_variance_percentage ?? void 0,
          status: h.status,
          isMixed: h.is_mixed,
          customerId: h.customer_id,
          involvedCustomerIds: h.involved_customer_ids || [],
          shippingCostDistributed: h.shipping_cost_distributed,
          costDistributionMethod: h.cost_distribution_method,
          fixedRatePerM3: h.fixed_rate_per_m3,
          totalBilledAmount: h.total_billed_amount,
          notes: h.notes,
        }),
        [],
      ),
      yi = E.useCallback(
        async (h, u) => {
          const y = !ts;
          y && es(!0);
          try {
            const b = [
              _.Planning,
              _.OrderCollection,
              _.DocumentPreparation,
              _.Loading,
              _.QualityCheck,
              _.ReadyToShip,
              _.InTransit,
              _.CustomsClearance,
              _.OutForDelivery,
              _.OnHold,
            ];
            if (u) {
              const S = x.rpc("admin_dashboard_metrics", {
                  window_days: 7,
                  balance_threshold: 500,
                }),
                [$, k, C, w] = await Promise.all([
                  S,
                  (async () =>
                    x
                      .from("orders")
                      .select(
                        "id,description,value,supplier_id,volume_m3,weight_kg,customer_id,status,notes,creation_date",
                      )
                      .order("creation_date", { ascending: !1 })
                      .limit(5e3)
                      .in("status", [
                        g.Submitted,
                        g.Pending,
                        g.Processing,
                        g.QualityCheck,
                        g.ReadyToShip,
                      ]))(),
                  x
                    .from("consolidations_with_orders")
                    .select(
                      "id,name,route,departure_date,creation_date,order_ids,container_type_id,container_space_filled_percentage,container_weight_filled_percentage,shipping_cost,estimated_shipping_cost,cost_variance,cost_variance_percentage,status,is_mixed,customer_id,involved_customer_ids,shipping_cost_distributed,cost_distribution_method,fixed_rate_per_m3,total_billed_amount,notes",
                    )
                    .in("status", b)
                    .order("creation_date", { ascending: !1 })
                    .limit(5e3),
                  x
                    .from("shipments")
                    .select(
                      "id,type,related_id,shipped_date,carrier,tracking_url,estimated_delivery,actual_delivery,description,status,customer_id,involved_customer_ids,is_mixed,origin,destination,order_id,consolidation_id",
                    )
                    .order("shipped_date", { ascending: !1 })
                    .limit(5e3),
                ]);
              (k.error &&
                console.error(
                  "Error fetching attention orders for dashboard:",
                  k.error,
                ),
                C.error &&
                  console.error(
                    "Error fetching consolidations for dashboard:",
                    C.error,
                  ),
                w.error &&
                  console.error(
                    "Error fetching recent shipments for dashboard:",
                    w.error,
                  ));
              const F = (() => {
                  if (C.error) return 0;
                  const I = C.data || [];
                  let q = 0;
                  for (const te of I) {
                    const ve = Number(te.estimated_shipping_cost || 0);
                    if (!(ve > 0)) continue;
                    const Te = Number(te.cost_variance_percentage);
                    let Pe = Number.isFinite(Te) ? Math.abs(Te) : Number.NaN;
                    if (!Number.isFinite(Pe)) {
                      const R = Number(te.shipping_cost || 0);
                      if (!(R > 0)) continue;
                      Pe = Math.abs(((R - ve) / ve) * 100);
                    }
                    Pe >= 25 && (q += 1);
                  }
                  return q;
                })(),
                L = (I) => {
                  (dn({
                    totalSuppliers: Number(I.total_suppliers || 0),
                    totalOrders: Number(I.total_orders || 0),
                    totalActiveConsolidations: Number(
                      I.total_active_consolidations || 0,
                    ),
                    totalShipments: Number(I.total_shipments || 0),
                  }),
                    un({
                      pendingOrders: Number(I.pending_orders || 0),
                      inProgressOrders: Number(I.in_progress_orders || 0),
                      readyOrders: Number(I.ready_orders || 0),
                      shipments: Number(I.total_shipments || 0),
                    }),
                    mn({
                      departingSoon: Number(I.departing_soon || 0),
                      capacityRisk: Number(I.capacity_risk || 0),
                      highVarianceRisk: C.error
                        ? Number(I.high_variance_risk || 0)
                        : F,
                      missingTracking: Number(I.missing_tracking || 0),
                      missingShipment: Number(I.missing_shipment || 0),
                      negativeBalances: Number(I.negative_balances || 0),
                    }));
                };
              let J = !1;
              if (!$.error && $.data) {
                const I = $.data,
                  q = Array.isArray(I) ? (I[0] ?? null) : I;
                q
                  ? (L(q), (J = !0))
                  : console.warn(
                      "admin_dashboard_metrics returned no rows; computing metrics via fallback queries.",
                    );
              }
              if (!J) {
                console.warn(
                  "admin_dashboard_metrics RPC unavailable; computing dashboard metrics via fallback queries.",
                  $.error,
                );
                const I = new Date(),
                  q = I.toISOString().slice(0, 10),
                  te = new Date(I);
                te.setDate(te.getDate() + 7);
                const ve = te.toISOString().slice(0, 10),
                  Te = '("Delivered","Completed","Cancelled")',
                  [Pe, R, Ce, Ue, ct, Ye, st, ke, fe, $e, Xe, Ee, yt] =
                    await Promise.all([
                      x
                        .from("suppliers")
                        .select("*", { count: "exact", head: !0 }),
                      x
                        .from("orders")
                        .select("*", { count: "exact", head: !0 }),
                      x
                        .from("shipments")
                        .select("*", { count: "exact", head: !0 }),
                      x
                        .from("consolidations")
                        .select("*", { count: "exact", head: !0 })
                        .not("status", "in", Te),
                      x
                        .from("orders")
                        .select("*", { count: "exact", head: !0 })
                        .eq("status", g.Pending),
                      x
                        .from("orders")
                        .select("*", { count: "exact", head: !0 })
                        .in("status", [g.Processing, g.QualityCheck]),
                      x
                        .from("orders")
                        .select("*", { count: "exact", head: !0 })
                        .eq("status", g.ReadyToShip),
                      x
                        .from("consolidations")
                        .select("*", { count: "exact", head: !0 })
                        .not("status", "in", Te)
                        .gte("departure_date", q)
                        .lte("departure_date", ve),
                      x
                        .from("consolidations")
                        .select("*", { count: "exact", head: !0 })
                        .not("status", "in", Te)
                        .or(
                          "container_space_filled_percentage.gte.85,container_weight_filled_percentage.gte.85",
                        ),
                      x
                        .from("shipments")
                        .select("*", { count: "exact", head: !0 })
                        .not("status", "in", '("Completed","Delivered")')
                        .or(
                          "carrier.is.null,carrier.eq.,tracking_url.is.null,tracking_url.eq.",
                        ),
                      x
                        .from("consolidations")
                        .select("id")
                        .eq("status", _.ReadyToShip),
                      x
                        .from("shipments")
                        .select("related_id,consolidation_id")
                        .eq("type", "consolidation"),
                      x
                        .from("payment_transactions")
                        .select("customer_id,amount"),
                    ]),
                  Br = new Set((Xe.data || []).map((ut) => ut.id)),
                  Tt = new Set(
                    (Ee.data || [])
                      .map((ut) => ut.related_id || ut.consolidation_id)
                      .filter(Boolean),
                  );
                let Et = 0;
                for (const ut of Br) Tt.has(ut) || (Et += 1);
                const Mn = 500,
                  vi = new Map();
                for (const ut of yt.data || []) {
                  const _i = ut.customer_id;
                  if (!_i) continue;
                  const Fn = Number(ut.amount || 0);
                  vi.set(_i, (vi.get(_i) || 0) + Fn);
                }
                let ws = 0;
                for (const [, ut] of vi) ut < -Mn && (ws += 1);
                L({
                  total_suppliers: Pe.count || 0,
                  total_orders: R.count || 0,
                  total_shipments: Ce.count || 0,
                  total_active_consolidations: Ue.count || 0,
                  pending_orders: ct.count || 0,
                  in_progress_orders: Ye.count || 0,
                  ready_orders: st.count || 0,
                  departing_soon: ke.count || 0,
                  capacity_risk: fe.count || 0,
                  missing_tracking: $e.count || 0,
                  missing_shipment: Et,
                  negative_balances: ws,
                });
              }
              const Q = k.error ? [] : k.data || [];
              (j(
                Q.map((I) => ({
                  id: I.id,
                  description: I.description,
                  value: I.value,
                  supplierId: I.supplier_id,
                  volumeM3: I.volume_m3,
                  weightKG: I.weight_kg,
                  customerId: I.customer_id,
                  status: I.status,
                  notes: I.notes,
                  requestedSupplierName: I.requested_supplier_name || "",
                  creationDate: I.creation_date,
                  originCountry: I.origin_country || "",
                  originCity: I.origin_city || "",
                  destinationCountry: I.destination_country || "",
                  destinationCity: I.destination_city || "",
                  destinationPort: I.destination_port || "",
                  readyDate: I.ready_date || "",
                  chargesApplied: !!I.charges_applied,
                })),
              ),
                C.error ? ne([]) : ne((C.data || []).map(fi)),
                w.error
                  ? At([])
                  : At(
                      (w.data || []).map((I) => ({
                        id: I.id,
                        type: I.type,
                        relatedId: I.related_id,
                        shippingDate: I.shipped_date,
                        carrier: I.carrier,
                        trackingUrl: I.tracking_url,
                        estimatedDelivery: I.estimated_delivery,
                        actualDelivery: I.actual_delivery,
                        description: I.description,
                        status: I.status,
                        customerId: I.customer_id,
                        involvedCustomerIds: I.involved_customer_ids || [],
                        isMixed: I.is_mixed,
                        origin: I.origin,
                        destination: I.destination,
                        orderId: I.order_id,
                        consolidationId: I.consolidation_id,
                      })),
                    ));
              const G = [
                ...new Set(Q.map((I) => I.supplier_id).filter(Boolean)),
              ];
              G.length > 0
                ? (async () => {
                    try {
                      const { data: I, error: q } = await x
                        .from("suppliers")
                        .select(
                          "id,name,company_location,phone_number,contact_person,rating",
                        )
                        .in("id", G);
                      if (q) throw q;
                      T(
                        (I || []).map((te) => ({
                          id: te.id,
                          name: te.name,
                          companyLocation: te.company_location,
                          phoneNumber: te.phone_number,
                          contactPerson: te.contact_person,
                          rating: te.rating,
                        })),
                      );
                    } catch (I) {
                      (console.error(
                        "Error fetching suppliers for dashboard:",
                        I,
                      ),
                        T([]));
                    }
                  })()
                : T([]);
            } else {
              const S = os(h),
                [$, k, C] = await Promise.all([
                  Bt.getByCustomerId(h),
                  wt.getByCustomerId(h),
                  x
                    .from("consolidations_with_orders")
                    .select("*")
                    .or(`customer_id.eq.${h},involved_customer_ids.cs.{${h}}`)
                    .in("status", b)
                    .order("creation_date", { ascending: !1 }),
                ]);
              if ((await S, C.error)) throw C.error;
              const w = [
                ...new Set($.map((F) => F.supplierId).filter(Boolean)),
              ];
              if (w.length > 0) {
                const { data: F, error: L } = await x
                  .from("suppliers")
                  .select("*")
                  .in("id", w);
                if (L) throw L;
                T(
                  (F || []).map((J) => ({
                    id: J.id,
                    name: J.name,
                    companyLocation: J.company_location,
                    phoneNumber: J.phone_number,
                    contactPerson: J.contact_person,
                    rating: J.rating,
                  })),
                );
              } else T([]);
              (j($), re(k), ne((C.data || []).map(fi)));
            }
          } finally {
            (y && es(!1), rs(!0));
          }
        },
        [ts, os, fi],
      );
    (E.useEffect(() => {
      i != null &&
        i.id &&
        (Zi({}), rs(!1), j([]), ne([]), re([]), T([]), z([]));
    }, [i?.id]),
      E.useEffect(() => {
        if (i == null || !i.id || Xi[Ae]) return;
        const h = ci(i.id);
        (async () => {
          try {
            (Ae === "dashboard"
              ? h
                ? (await yi(i.id, !0),
                  await Promise.allSettled([He(), ft(), Ke(), Ge(), Ve()]))
                : await yi(i.id, !1)
              : h
                ? Ae === "orders"
                  ? await Promise.all([He(), ft(), Ke(), Ge(), Ve()])
                  : Ae === "consolidations"
                    ? await Promise.all([Ke(), He(), ft(), Ge(), Ve()])
                    : Ae === "suppliers"
                      ? await Promise.all([ft(), He()])
                      : Ae === "customers"
                        ? await Promise.all([He(), ft(), Ge(), Ke(), Ve()])
                        : Ae === "payments"
                          ? await Promise.all([He(), Ke(), Ve()])
                          : Ae === "shipments" &&
                            (await Promise.all([Ge(), He(), Ke()]))
                : Ae === "orders"
                  ? await Promise.all([
                      He(i.id),
                      ft(i.id),
                      Ke(i.id),
                      Ge(i.id),
                      Ve(i.id),
                    ])
                  : Ae === "consolidations"
                    ? await Promise.all([
                        Ke(i.id),
                        He(i.id),
                        ft(i.id),
                        Ge(i.id),
                        Ve(i.id),
                      ])
                    : Ae === "suppliers"
                      ? await Promise.all([ft(i.id), He(i.id)])
                      : Ae === "customers"
                        ? await Promise.all([
                            He(i.id),
                            ft(i.id),
                            Ge(i.id),
                            Ke(i.id),
                            Ve(i.id),
                          ])
                        : Ae === "payments"
                          ? await Promise.all([He(i.id), Ke(i.id), Ve(i.id)])
                          : Ae === "shipments" &&
                            (await Promise.all([
                              Ge(i.id),
                              He(i.id),
                              Ke(i.id),
                              Ve(i.id),
                            ])),
              Zi((u) => ({ ...u, [Ae]: !0 })));
          } catch (u) {
            console.error(`Error loading data for page "${Ae}":`, u);
          }
        })();
      }, [i?.id, i?.role, c, Ae, Xi, yi, He, ft, Ke, Ge, Ve]),
      E.useEffect(() => {
        i != null &&
          i.id &&
          ci(i.id) &&
          ot(
            () => import("./dashboardpage.js?v=20260312i"),
            _t([0, 1, 2, 3, 4, 5]),
          );
      }, [i?.id, i?.role, c]));
    const gs = c.find((h) => h.id === i?.id),
      bi = gs?.role || i?.role || et.Customer,
      xe = bi === et.Admin,
      fs = E.useMemo(() => {
        var h;
        if (!xe) return [];
        const u = [];
        for (const y of O)
          u.push({
            kind: "order",
            id: y.id,
            title: `${je(y.id, "order")} ${y.description}`,
            subtitle: `Value $${Number(y.value || 0).toLocaleString()} \xE2\u20AC\xA2 ${String(y.status)}`,
            pageId: "orders",
            itemId: y.id,
          });
        for (const y of ue)
          u.push({
            kind: "consolidation",
            id: y.id,
            title: y.manualName
              ? `${je(y.id, "consolidation")} ${y.manualName}`
              : je(y.id, "consolidation"),
            subtitle: `${String(y.status)} \xE2\u20AC\xA2 ${y.isMixed ? "Mixed" : "Regular"} \xE2\u20AC\xA2 Orders ${((h = y.orderIds) == null ? void 0 : h.length) || 0}`,
            pageId: "consolidations",
            itemId: y.id,
          });
        for (const y of ce)
          u.push({
            kind: "shipment",
            id: y.id,
            title: `${je(y.id, "shipment")} ${y.description}`,
            subtitle: `${y.type} \xE2\u20AC\xA2 ${String(y.status)} \xE2\u20AC\xA2 ${y.carrier || "Carrier N/A"}`,
            pageId: "shipments",
            itemId: y.id,
          });
        for (const y of ae)
          u.push({
            kind: "payment",
            id: y.id,
            title: `${je(y.id, "payment")} ${String(y.type)}`,
            subtitle: `${y.amount < 0 ? "-" : "+"}$${Math.abs(Number(y.amount || 0)).toLocaleString()} \xE2\u20AC\xA2 ${(y.description || "").slice(0, 64)}`,
            pageId: "payments",
            itemId: y.id,
          });
        return u;
      }, [xe, O, ue, ce, ae]),
      it = E.useCallback(
        async ({ append: h = !1, offsetOverride: u = null } = {}) => {
          const y = c.find((S) => S.id === i?.id),
            b = (y?.role || i?.role || et.Customer) === et.Admin;
          h ? me(!0) : (It(!0), be(null));
          try {
            if (i == null || !i.id) return (Ie([]), Re(0), void at(!1));
            const S = b ? ai : li,
              $ = u !== null ? u : 0,
              k = $ + S - 1,
              C = async (J) => {
                let Q = x
                  .from("notifications")
                  .select(
                    `id,${J},message,timestamp,is_read,importance,link_to_page,link_to_id`,
                  )
                  .order("timestamp", { ascending: !1 })
                  .range($, k);
                return ((Q = Q.or(or(i.id, b, J))), await Q);
              };
            let w = Ne(),
              { data: F, error: L } = await C(w);
            if (
              (L && qt(L) && ((w = Ne()), ({ data: F, error: L } = await C(w))),
              L && Er(L) && ((w = Ne()), ({ data: F, error: L } = await C(w))),
              L)
            )
              (console.error("Error fetching notifications:", L),
                be(L.message),
                h || at(!1));
            else {
              const J = (F || []).map((G) => ({
                  id: G.id,
                  userId: Qo(G, w),
                  message: G.message,
                  timestamp: G.timestamp,
                  isRead: G.is_read ?? G.isRead ?? !1,
                  importance: G.importance
                    ? G.importance === "low"
                      ? X.Low
                      : G.importance === "medium"
                        ? X.Medium
                        : G.importance === "high"
                          ? X.High
                          : G.importance === "critical"
                            ? X.Critical
                            : X.Medium
                    : X.Medium,
                  linkToPage: G.link_to_page || G.linkToPage,
                  linkToId: G.link_to_id || G.linkToId,
                })),
                Q = J.length;
              (Ie((G) => {
                if (!h) return J;
                const I = new Set(G.map((te) => te.id)),
                  q = J.filter((te) => !I.has(te.id));
                return [...G, ...q];
              }),
                Re($ + Q),
                at(Q === S));
            }
          } catch (S) {
            (console.error("Exception fetching notifications:", S),
              be("Failed to fetch notifications"),
              h || at(!1));
          }
          h ? me(!1) : It(!1);
        },
        [i?.id, i?.role, c, ai, li],
      ),
      ys = E.useCallback(async () => {
        M || nt || !Ze || (await it({ append: !0, offsetOverride: we }));
      }, [M, nt, Ze, we, it]);
    E.useEffect(() => {
      i &&
        c.length > 0 &&
        (Promise.all([Kl(), Wl()]).then(([h, u]) => {
          (!h || !u) &&
            console.error(
              "\xC3\xA2\xC2\x9D\xC5\u2019 Database schema or setup check failed. Notifications will not be created.",
            );
        }),
        it({ append: !1 }));
    }, [i, c.length, it]);
    const fr = xe ? ae : ae.filter((h) => h.customerId === i?.id),
      Vt = xe ? O : O.filter((h) => h.customerId === i?.id),
      yr = xe
        ? ue
        : ue.filter(
            (h) =>
              h.customerId === i?.id ||
              h.involvedCustomerIds.includes(i?.id || ""),
          ),
      wi = xe ? v : v.filter((h) => Vt.some((u) => u.supplierId === h.id)),
      qr = xe
        ? ce
        : ce.filter(
            (h) =>
              h.customerId === i?.id ||
              h.involvedCustomerIds.includes(i?.id || ""),
          );
    E.useEffect(() => {
      i != null &&
        i.id &&
        (!ci(i.id) ||
          is ||
          (pn(!0),
          (async () => {
            try {
              const h = new Set(c.map((C) => C.id)),
                { data: u, error: y } = await x
                  .from("shipments")
                  .select(
                    "id,type,related_id,customer_id,involved_customer_ids,is_mixed",
                  )
                  .or("customer_id.is.null,is_mixed.eq.true")
                  .order("shipped_date", { ascending: !1 })
                  .limit(5e3);
              if (y) throw y;
              const b = (u || []).filter((C) => {
                const w =
                    !C.involved_customer_ids ||
                    C.involved_customer_ids.length === 0,
                  F = !C.customer_id || !h.has(C.customer_id);
                return w && F;
              });
              if (b.length === 0) return;
              const S = b.filter((C) => C.type === "individual"),
                $ = b.filter((C) => C.type === "consolidation");
              let k = 0;
              if (S.length > 0) {
                const C = S.map((L) => L.related_id).filter(Boolean),
                  { data: w, error: F } = await x
                    .from("orders")
                    .select("id,customer_id")
                    .in("id", C);
                if (!F) {
                  const L = new Map();
                  for (const J of w || [])
                    J.id && J.customer_id && L.set(J.id, J.customer_id);
                  for (const J of S) {
                    const Q = L.get(J.related_id);
                    if (!Q) continue;
                    const { error: G } = await x
                      .from("shipments")
                      .update({
                        customer_id: Q,
                        is_mixed: !1,
                        involved_customer_ids: [],
                      })
                      .eq("id", J.id);
                    G || (k += 1);
                  }
                }
              }
              if ($.length > 0) {
                const C = $.map((L) => L.related_id).filter(Boolean),
                  { data: w, error: F } = await x
                    .from("consolidations_with_orders")
                    .select(
                      "id,customer_id,is_mixed,involved_customer_ids,order_ids",
                    )
                    .in("id", C);
                if (!F) {
                  const L = new Map((w || []).map((I) => [I.id, I])),
                    J = Array.from(
                      new Set((w || []).flatMap((I) => I.order_ids || [])),
                    ),
                    { data: Q } = J.length
                      ? await x
                          .from("orders")
                          .select("id,customer_id")
                          .in("id", J)
                      : { data: [] },
                    G = new Map();
                  for (const I of Q || [])
                    I.id && I.customer_id && G.set(I.id, I.customer_id);
                  for (const I of $) {
                    const q = L.get(I.related_id);
                    if (!q) continue;
                    let te = q.involved_customer_ids || [];
                    te.length === 0 &&
                      (te = Array.from(
                        new Set(
                          (q.order_ids || [])
                            .map((Ce) => G.get(Ce))
                            .filter(Boolean),
                        ),
                      ));
                    const ve = te.length > 1 || q.is_mixed === !0,
                      Te = ve ? null : q.customer_id || te[0] || null,
                      Pe = ve ? te : Te ? [Te] : [];
                    (q.customer_id !== Te ||
                      q.is_mixed !== ve ||
                      ((q.involved_customer_ids || []).length === 0 &&
                        Pe.length > 0)) &&
                      (await x
                        .from("consolidations")
                        .update({
                          customer_id: Te,
                          is_mixed: ve,
                          involved_customer_ids: Pe,
                        })
                        .eq("id", q.id));
                    const { error: R } = await x
                      .from("shipments")
                      .update({
                        customer_id: Te,
                        is_mixed: ve,
                        involved_customer_ids: ve ? Pe : [],
                      })
                      .eq("id", I.id);
                    R || (k += 1);
                  }
                }
              }
              k > 0 &&
                (console.warn(
                  `Repaired ${k} orphan shipment(s) missing customer attribution.`,
                ),
                await Promise.allSettled([Ge(), Ke()]));
            } catch (h) {
              console.warn("Orphan shipment repair skipped/failed:", h);
            }
          })()));
    }, [i?.id, i?.role, c, is, Ge, Ke]);
    const bs = () => {
      const h = {
          allCustomers: c,
          allSuppliers: wi,
          allOrders: Vt,
          allConsolidations: yr,
          currentCustomerId: i?.id,
        },
        u = (b) => {
          var S;
          return (
            ((S = v.find(($) => $.id === b)) == null ? void 0 : S.name) ||
            "Unknown Supplier"
          );
        },
        y = (b) => {
          var S;
          return (
            ((S = c.find(($) => $.id === b)) == null
              ? void 0
              : S.companyName) || "Unknown Customer"
          );
        };
      switch (Ae) {
        case "dashboard":
          const b = i ? (c.find((S) => S.id === i.id) ?? null) : null;
          return d.jsx(Zl, {
            ...h,
            isAdmin: xe,
            currentCustomerId: i?.id,
            addOrder: as,
            updateOrderStatus: ls,
            adminActiveConsolidations: ue.filter(
              (S) =>
                ![_.Delivered, _.Completed, _.Cancelled].includes(S.status),
            ),
            adminOrdersNeedingAttention: O.filter((S) =>
              [g.Submitted, g.Pending, g.Processing].includes(S.status),
            ).slice(0, 10),
            customerActiveConsolidations: yr.filter(
              (S) =>
                ![_.Delivered, _.Completed, _.Cancelled].includes(S.status),
            ),
            customerOrdersAwaitingConsolidation: Vt.filter(
              (S) =>
                [
                  g.Pending,
                  g.Processing,
                  g.QualityCheck,
                  g.ReadyToShip,
                ].includes(S.status) && S.status !== g.InConsolidation,
            ),
            customerOrdersInProgressCount: Vt.filter(
              (S) =>
                ![g.Delivered, g.Completed, g.Cancelled].includes(S.status),
            ).length,
            suppliersForCustomerView: wi,
            shipmentsForDashboard: xe ? vt : qr,
            notifications: Qe,
            totalSuppliers: xe ? Ar.totalSuppliers : v.length,
            totalOrders: xe ? Ar.totalOrders : O.length,
            totalActiveConsolidations: xe
              ? Ar.totalActiveConsolidations
              : ue.filter((S) => ![_.Completed, _.Cancelled].includes(S.status))
                  .length,
            totalCustomers: c.length,
            totalShipments: xe ? Ar.totalShipments : ce.length,
            adminFlowSnapshotCounts: xe ? cn : void 0,
            adminExceptionCounts: xe ? hn : void 0,
            currentCustomerDetails: b,
            calculateCustomerBalance: hi,
            paymentTransactions: ae,
            customerTransactions: fr,
            onNavigate: $t,
            markNotificationAsRead: gi,
            onRefresh: it,
            dashboardLoading: ln,
          });
        case "orders":
          return d.jsx(ed, {
            ...h,
            isAdmin: xe,
            currentCustomerId: i?.id,
            orders: Vt,
            transactions: fr,
            addOrder: as,
            updateOrderStatus: ls,
            updateOrderDetails: dt,
            deleteOrder: En,
            ordersLoading: W,
            ordersError: ie,
            consolidations: yr,
            shipments: qr,
            listOrderDraftDocuments: _n,
            uploadOrderDraftDocument: xn,
            deleteOrderDraftDocument: Cn,
            getOrderDraftDocumentSignedUrl: Sn,
            onNavigate: $t,
            onNavigateToShipment: mi,
          });
        case "consolidations":
          return d.jsx(td, {
            ...h,
            isAdmin: xe,
            currentCustomerId: i?.id,
            consolidations: yr,
            transactions: fr,
            onRecalculateDistribution: fn,
            addConsolidation: On,
            updateConsolidationDetails: Dn,
            deleteConsolidation: Pn,
            updateConsolidationStatus: hs,
            createShipmentFromConsolidation: Nn,
            consolidationsLoading: ye,
            consolidationsError: De,
            updateConsolidationOrders: ms,
            activeConsolidationId: null,
            setActiveConsolidationId: () => {},
            shipments: qr,
            onNavigate: $t,
            onNavigateToShipment: mi,
          });
        case "suppliers":
          return d.jsx(rd, {
            ...h,
            suppliers: wi,
            orders: Vt,
            addSupplier: kn,
            updateSupplier: In,
            deleteSupplier: Tn,
            suppliersLoading: P,
            suppliersError: D,
            isAdmin: xe,
            currentCustomerId: i?.id,
            onNavigate: $r,
          });
        case "customers":
          return d.jsx(id, {
            ...h,
            isAdmin: xe,
            currentCustomerId: i?.id,
            customers: c,
            addCustomer: yn,
            createCustomerMagicLink: wn,
            paymentTransactions: ae,
            calculateCustomerBalance: hi,
            updateCustomer: bn,
            shipments: ce,
            orders: O,
            consolidations: ue,
            suppliers: v,
            getSupplierName: u,
            getCustomerName: y,
            onNavigate: $r,
          });
        case "payments":
          return d.jsx(sd, {
            ...h,
            isAdmin: xe,
            currentCustomerId: i?.id,
            transactions: fr,
            allTransactions: ae,
            addIncomingPayment: An,
            addRefundPayout: $n,
            addMiscellaneousCost: Rn,
            calculateCustomerBalance: hi,
            onNavigate: $t,
          });
        case "shipments":
          return d.jsx(od, {
            ...h,
            shipments: qr,
            transactions: fr,
            onEditTracking: Fr,
            updateShipmentStatus: us,
            isAdmin: xe,
            consolidations: yr,
            onNavigate: $t,
            highlightShipmentId: gn,
            onHighlightHandled: () => di(null),
          });
        default:
          return d.jsx("div", { children: "Page not found" });
      }
    };
    return n
      ? d.jsx(nd, {})
      : e
        ? d.jsx("div", {
            className: "min-h-screen flex items-center justify-center",
            children: d.jsxs("div", {
              className: "text-center",
              children: [
                d.jsx("div", {
                  className:
                    "animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto",
                }),
                d.jsx("div", {
                  className: "mt-4 text-lg font-semibold text-gray-700",
                  children: "Loading...",
                }),
              ],
            }),
          })
        : a
          ? d.jsx("div", {
              className: "min-h-screen flex items-center justify-center",
              children: d.jsxs("div", {
                className: "text-center",
                children: [
                  d.jsx("div", {
                    className:
                      "animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto",
                  }),
                  d.jsx("div", {
                    className: "mt-4 text-sm font-medium text-gray-700",
                    children: "Signing out...",
                  }),
                ],
              }),
            })
          : i
            ? f
              ? d.jsx("div", {
                  className:
                    "min-h-screen bg-slate-100 flex items-center justify-center",
                  children: d.jsxs("div", {
                    className: "text-center",
                    children: [
                      d.jsx("div", {
                        className: "text-lg font-semibold text-gray-700 mb-2",
                        children: "Loading your data...",
                      }),
                      d.jsx("div", {
                        className: "text-sm text-gray-500",
                        children: "Please wait while we fetch your information",
                      }),
                    ],
                  }),
                })
              : gs || f || (i != null && i.role)
                ? bi === et.Admin
                  ? d.jsxs(Xs, {
                      activePageId: Ae,
                      onNavigate: $t,
                      customers: c,
                      notifications: Qe,
                      markNotificationAsRead: gi,
                      markAllNotificationsAsRead: ps,
                      hasMoreNotifications: Ze,
                      loadingMoreNotifications: M,
                      onLoadMoreNotifications: ys,
                      notificationPageSize: ai,
                      onSignOut: ns,
                      user: i,
                      currentUserId: i?.id,
                      isAdmin: xe,
                      globalSearchItems: fs,
                      children: [
                        d.jsx(E.Suspense, {
                          fallback: d.jsx(rn, {}),
                          children: bs(),
                        }),
                        Rr &&
                          d.jsx(nn, {
                            order: Rr,
                            onClose: () => gr(null),
                            onSave: ds,
                          }),
                        Mr &&
                          d.jsx(an, {
                            shipment: Mr,
                            onClose: () => Fr(null),
                            onSave: cs,
                          }),
                      ],
                    })
                  : bi === et.Customer
                    ? d.jsxs(Xs, {
                        activePageId: Ae,
                        onNavigate: $t,
                        customers: c,
                        notifications: Qe,
                        markNotificationAsRead: gi,
                        markAllNotificationsAsRead: ps,
                        hasMoreNotifications: Ze,
                        loadingMoreNotifications: M,
                        onLoadMoreNotifications: ys,
                        notificationPageSize: li,
                        onSignOut: ns,
                        user: i,
                        currentUserId: i?.id,
                        isAdmin: xe,
                        globalSearchItems: fs,
                        children: [
                          d.jsx(E.Suspense, {
                            fallback: d.jsx(rn, {}),
                            children: bs(),
                          }),
                          Rr &&
                            d.jsx(nn, {
                              order: Rr,
                              onClose: () => gr(null),
                              onSave: ds,
                            }),
                          Mr &&
                            d.jsx(an, {
                              shipment: Mr,
                              onClose: () => Fr(null),
                              onSave: cs,
                            }),
                        ],
                      })
                    : d.jsx("div", {
                        className:
                          "min-h-screen flex items-center justify-center text-red-600 font-bold",
                        children: "Unknown user role. Please contact support.",
                      })
                : d.jsx("div", {
                    className:
                      "min-h-screen flex items-center justify-center text-red-600 font-bold",
                    children: "No user record found. Please contact support.",
                  })
            : d.jsx(Xl, {});
  },
  ld = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: () =>
          d.jsx(Jl, { children: d.jsx(Ha, { children: d.jsx(ad, {}) }) }),
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  );
export {
  Je as A,
  Hr as B,
  _ as C,
  ld as D,
  g as O,
  Y as T,
  et as U,
  Js as a,
  mt as b,
  ht as c,
  Hs as d,
  Wr as e,
  je as f,
  zs as g,
  Ma as h,
  Gs as i,
  Da as j,
  Ra as k,
  Ei as l,
  $a as m,
  Vs as n,
  Bt as o,
  Ql as p,
  vr as q,
  Fa as r,
  kt as s,
  Ni as t,
  Oa as u,
  Ti as v,
  lt as w,
  ze as x,
  Ks as y,
  wt as z,
};
