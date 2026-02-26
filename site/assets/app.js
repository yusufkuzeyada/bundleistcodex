const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/bloglist.js",
      "assets/query.js",
      "assets/react.js",
      "assets/i18n.js",
      "assets/arrow-left.js",
      "assets/supabase.js",
      "assets/radix.js",
      "assets/blogpost.js",
      "assets/blogadmin.js",
      "assets/eye.js",
      "assets/auth.js",
      "assets/contact.js",
      "assets/privacy.js",
      "assets/terms.js",
      "assets/notfound.js",
    ]),
) => i.map((i) => d[i]);
import { c as us, _ as de } from "./supabase.js";
import { j as t, Q as ps, a as xs } from "./query.js";
import {
  r as u,
  e as x,
  G as hs,
  u as gs,
  L as me,
  B as bs,
  b as fs,
  d as X,
  N as We,
  f as vs,
} from "./react.js";
import {
  V as gt,
  R as bt,
  A as ft,
  C as vt,
  T as yt,
  D as wt,
  P as ys,
  a as jt,
  b as ws,
  S as js,
  c as Nt,
  d as kt,
  e as Ns,
  f as Ct,
  I as St,
  g as _t,
  h as Tt,
  i as Mt,
  L as Et,
  j as At,
  k as ks,
  l as Cs,
} from "./radix.js";
import { u as ee } from "./i18n.js";
const Ss = 1,
  _s = 1e6;
let Ve = 0;
function Ts() {
  return ((Ve = (Ve + 1) % Number.MAX_SAFE_INTEGER), Ve.toString());
}
const qe = new Map(),
  nt = (e) => {
    if (qe.has(e)) return;
    const s = setTimeout(() => {
      (qe.delete(e), Ce({ type: "REMOVE_TOAST", toastId: e }));
    }, _s);
    qe.set(e, s);
  },
  Ms = (e, s) => {
    switch (s.type) {
      case "ADD_TOAST":
        return { ...e, toasts: [s.toast, ...e.toasts].slice(0, Ss) };
      case "UPDATE_TOAST":
        return {
          ...e,
          toasts: e.toasts.map((r) =>
            r.id === s.toast.id ? { ...r, ...s.toast } : r,
          ),
        };
      case "DISMISS_TOAST": {
        const { toastId: r } = s;
        return (
          r
            ? nt(r)
            : e.toasts.forEach((a) => {
                nt(a.id);
              }),
          {
            ...e,
            toasts: e.toasts.map((a) =>
              a.id === r || r === void 0 ? { ...a, open: !1 } : a,
            ),
          }
        );
      }
      case "REMOVE_TOAST":
        return s.toastId === void 0
          ? { ...e, toasts: [] }
          : { ...e, toasts: e.toasts.filter((r) => r.id !== s.toastId) };
    }
  },
  Ee = [];
let Ae = { toasts: [] };
function Ce(e) {
  ((Ae = Ms(Ae, e)),
    Ee.forEach((s) => {
      s(Ae);
    }));
}
function Es({ ...e }) {
  const s = Ts(),
    r = (l) => Ce({ type: "UPDATE_TOAST", toast: { ...l, id: s } }),
    a = () => Ce({ type: "DISMISS_TOAST", toastId: s });
  return (
    Ce({
      type: "ADD_TOAST",
      toast: {
        ...e,
        id: s,
        open: !0,
        onOpenChange: (l) => {
          l || a();
        },
      },
    }),
    { id: s, dismiss: a, update: r }
  );
}
function As() {
  const [e, s] = u.useState(Ae);
  return (
    u.useEffect(
      () => (
        Ee.push(s),
        () => {
          const r = Ee.indexOf(s);
          r > -1 && Ee.splice(r, 1);
        }
      ),
      [e],
    ),
    {
      ...e,
      toast: Es,
      dismiss: (r) => Ce({ type: "DISMISS_TOAST", toastId: r }),
    }
  );
}
function zt(e) {
  var s,
    r,
    a = "";
  if (typeof e == "string" || typeof e == "number") a += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var l = e.length;
      for (s = 0; s < l; s++)
        e[s] && (r = zt(e[s])) && (a && (a += " "), (a += r));
    } else for (r in e) e[r] && (a && (a += " "), (a += r));
  return a;
}
function It() {
  for (var e, s, r = 0, a = "", l = arguments.length; r < l; r++)
    (e = arguments[r]) && (s = zt(e)) && (a && (a += " "), (a += s));
  return a;
}
const it = (e) => (typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e),
  lt = It,
  Rt = (e, s) => (r) => {
    var a;
    if ((s == null ? void 0 : s.variants) == null)
      return lt(
        e,
        r == null ? void 0 : r.class,
        r == null ? void 0 : r.className,
      );
    const { variants: l, defaultVariants: n } = s,
      i = Object.keys(l).map((c) => {
        const h = r == null ? void 0 : r[c],
          g = n == null ? void 0 : n[c];
        if (h === null) return null;
        const o = it(h) || it(g);
        return l[c][o];
      }),
      d =
        r &&
        Object.entries(r).reduce((c, h) => {
          let [g, o] = h;
          return (o === void 0 || (c[g] = o), c);
        }, {}),
      m =
        s == null || (a = s.compoundVariants) === null || a === void 0
          ? void 0
          : a.reduce((c, h) => {
              let { class: g, className: o, ...p } = h;
              return Object.entries(p).every((w) => {
                let [b, f] = w;
                return Array.isArray(f)
                  ? f.includes({ ...n, ...d }[b])
                  : { ...n, ...d }[b] === f;
              })
                ? [...c, g, o]
                : c;
            }, []);
    return lt(
      e,
      i,
      m,
      r == null ? void 0 : r.class,
      r == null ? void 0 : r.className,
    );
  };
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zs = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  Pt = (...e) =>
    e
      .filter((s, r, a) => !!s && s.trim() !== "" && a.indexOf(s) === r)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Is = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Rs = u.forwardRef(
  (
    {
      color: e = "currentColor",
      size: s = 24,
      strokeWidth: r = 2,
      absoluteStrokeWidth: a,
      className: l = "",
      children: n,
      iconNode: i,
      ...d
    },
    m,
  ) =>
    u.createElement(
      "svg",
      {
        ref: m,
        ...Is,
        width: s,
        height: s,
        stroke: e,
        strokeWidth: a ? (Number(r) * 24) / Number(s) : r,
        className: Pt("lucide", l),
        ...d,
      },
      [
        ...i.map(([c, h]) => u.createElement(c, h)),
        ...(Array.isArray(n) ? n : [n]),
      ],
    ),
);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _ = (e, s) => {
  const r = u.forwardRef(({ className: a, ...l }, n) =>
    u.createElement(Rs, {
      ref: n,
      iconNode: s,
      className: Pt(`lucide-${zs(e)}`, a),
      ...l,
    }),
  );
  return ((r.displayName = `${e}`), r);
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ze = _("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ps = _("Bell", [
  ["path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", key: "1qo2s2" }],
  ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0", key: "qgo35s" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ls = _("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Bs = _("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Se = _("CircleCheck", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ds = _("Circle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Os = _("ClipboardCheck", [
  [
    "rect",
    {
      width: "8",
      height: "4",
      x: "8",
      y: "2",
      rx: "1",
      ry: "1",
      key: "tgr4d6",
    },
  ],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196",
    },
  ],
  ["path", { d: "m9 14 2 2 4-4", key: "df797q" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Lt = _("CreditCard", [
  [
    "rect",
    { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" },
  ],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Vs = _("DollarSign", [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  [
    "path",
    { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" },
  ],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Re = _("FileText", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7",
    },
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Bt = _("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  [
    "path",
    { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" },
  ],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $e = _("Layers", [
  [
    "path",
    {
      d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",
      key: "8b97xw",
    },
  ],
  [
    "path",
    { d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65", key: "dd6zsq" },
  ],
  [
    "path",
    { d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65", key: "ep9fru" },
  ],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qs = _("Mail", [
  [
    "rect",
    { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" },
  ],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $s = _("MapPin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z",
    },
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Hs = _("Menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Gs = _("MessageSquare", [
  [
    "path",
    {
      d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
      key: "1lielz",
    },
  ],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Fs = _("PackageCheck", [
  ["path", { d: "m16 16 2 2 4-4", key: "gfu2re" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h",
    },
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ws = _("PackagePlus", [
  ["path", { d: "M16 16h6", key: "100bgy" }],
  ["path", { d: "M19 13v6", key: "85cyf1" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h",
    },
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ie = _("Package", [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw",
    },
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["path", { d: "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7", key: "yx3hmr" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ue = _("Receipt", [
  [
    "path",
    {
      d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
      key: "q3az6g",
    },
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Us = _("Ruler", [
  [
    "path",
    {
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
      key: "icamh8",
    },
  ],
  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Dt = _("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ot = _("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ys = _("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ks = _("Ship", [
  ["path", { d: "M12 10.189V14", key: "1p8cqu" }],
  ["path", { d: "M12 2v3", key: "qbqxhf" }],
  ["path", { d: "M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6", key: "qpkstq" }],
  [
    "path",
    {
      d: "M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76",
      key: "7tigtc",
    },
  ],
  [
    "path",
    {
      d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "1924j5",
    },
  ],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Js = _("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx",
    },
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Qs = _("Timer", [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const dt = _("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq",
    },
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ye = _("Truck", [
  [
    "path",
    {
      d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",
      key: "wrbu53",
    },
  ],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i",
    },
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ke = _("X", [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ]),
  Ze = "-",
  Zs = (e) => {
    const s = er(e),
      { conflictingClassGroups: r, conflictingClassGroupModifiers: a } = e;
    return {
      getClassGroupId: (i) => {
        const d = i.split(Ze);
        return (d[0] === "" && d.length !== 1 && d.shift(), Vt(d, s) || Xs(i));
      },
      getConflictingClassGroupIds: (i, d) => {
        const m = r[i] || [];
        return d && a[i] ? [...m, ...a[i]] : m;
      },
    };
  },
  Vt = (e, s) => {
    var i;
    if (e.length === 0) return s.classGroupId;
    const r = e[0],
      a = s.nextPart.get(r),
      l = a ? Vt(e.slice(1), a) : void 0;
    if (l) return l;
    if (s.validators.length === 0) return;
    const n = e.join(Ze);
    return (i = s.validators.find(({ validator: d }) => d(n))) == null
      ? void 0
      : i.classGroupId;
  },
  ct = /^\[(.+)\]$/,
  Xs = (e) => {
    if (ct.test(e)) {
      const s = ct.exec(e)[1],
        r = s == null ? void 0 : s.substring(0, s.indexOf(":"));
      if (r) return "arbitrary.." + r;
    }
  },
  er = (e) => {
    const { theme: s, prefix: r } = e,
      a = { nextPart: new Map(), validators: [] };
    return (
      sr(Object.entries(e.classGroups), r).forEach(([n, i]) => {
        Je(i, a, n, s);
      }),
      a
    );
  },
  Je = (e, s, r, a) => {
    e.forEach((l) => {
      if (typeof l == "string") {
        const n = l === "" ? s : mt(s, l);
        n.classGroupId = r;
        return;
      }
      if (typeof l == "function") {
        if (tr(l)) {
          Je(l(a), s, r, a);
          return;
        }
        s.validators.push({ validator: l, classGroupId: r });
        return;
      }
      Object.entries(l).forEach(([n, i]) => {
        Je(i, mt(s, n), r, a);
      });
    });
  },
  mt = (e, s) => {
    let r = e;
    return (
      s.split(Ze).forEach((a) => {
        (r.nextPart.has(a) ||
          r.nextPart.set(a, { nextPart: new Map(), validators: [] }),
          (r = r.nextPart.get(a)));
      }),
      r
    );
  },
  tr = (e) => e.isThemeGetter,
  sr = (e, s) =>
    s
      ? e.map(([r, a]) => {
          const l = a.map((n) =>
            typeof n == "string"
              ? s + n
              : typeof n == "object"
                ? Object.fromEntries(
                    Object.entries(n).map(([i, d]) => [s + i, d]),
                  )
                : n,
          );
          return [r, l];
        })
      : e,
  rr = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let s = 0,
      r = new Map(),
      a = new Map();
    const l = (n, i) => {
      (r.set(n, i), s++, s > e && ((s = 0), (a = r), (r = new Map())));
    };
    return {
      get(n) {
        let i = r.get(n);
        if (i !== void 0) return i;
        if ((i = a.get(n)) !== void 0) return (l(n, i), i);
      },
      set(n, i) {
        r.has(n) ? r.set(n, i) : l(n, i);
      },
    };
  },
  qt = "!",
  ar = (e) => {
    const { separator: s, experimentalParseClassName: r } = e,
      a = s.length === 1,
      l = s[0],
      n = s.length,
      i = (d) => {
        const m = [];
        let c = 0,
          h = 0,
          g;
        for (let f = 0; f < d.length; f++) {
          let N = d[f];
          if (c === 0) {
            if (N === l && (a || d.slice(f, f + n) === s)) {
              (m.push(d.slice(h, f)), (h = f + n));
              continue;
            }
            if (N === "/") {
              g = f;
              continue;
            }
          }
          N === "[" ? c++ : N === "]" && c--;
        }
        const o = m.length === 0 ? d : d.substring(h),
          p = o.startsWith(qt),
          w = p ? o.substring(1) : o,
          b = g && g > h ? g - h : void 0;
        return {
          modifiers: m,
          hasImportantModifier: p,
          baseClassName: w,
          maybePostfixModifierPosition: b,
        };
      };
    return r ? (d) => r({ className: d, parseClassName: i }) : i;
  },
  or = (e) => {
    if (e.length <= 1) return e;
    const s = [];
    let r = [];
    return (
      e.forEach((a) => {
        a[0] === "[" ? (s.push(...r.sort(), a), (r = [])) : r.push(a);
      }),
      s.push(...r.sort()),
      s
    );
  },
  nr = (e) => ({ cache: rr(e.cacheSize), parseClassName: ar(e), ...Zs(e) }),
  ir = /\s+/,
  lr = (e, s) => {
    const {
        parseClassName: r,
        getClassGroupId: a,
        getConflictingClassGroupIds: l,
      } = s,
      n = [],
      i = e.trim().split(ir);
    let d = "";
    for (let m = i.length - 1; m >= 0; m -= 1) {
      const c = i[m],
        {
          modifiers: h,
          hasImportantModifier: g,
          baseClassName: o,
          maybePostfixModifierPosition: p,
        } = r(c);
      let w = !!p,
        b = a(w ? o.substring(0, p) : o);
      if (!b) {
        if (!w) {
          d = c + (d.length > 0 ? " " + d : d);
          continue;
        }
        if (((b = a(o)), !b)) {
          d = c + (d.length > 0 ? " " + d : d);
          continue;
        }
        w = !1;
      }
      const f = or(h).join(":"),
        N = g ? f + qt : f,
        S = N + b;
      if (n.includes(S)) continue;
      n.push(S);
      const R = l(b, w);
      for (let M = 0; M < R.length; ++M) {
        const T = R[M];
        n.push(N + T);
      }
      d = c + (d.length > 0 ? " " + d : d);
    }
    return d;
  };
function dr() {
  let e = 0,
    s,
    r,
    a = "";
  for (; e < arguments.length; )
    (s = arguments[e++]) && (r = $t(s)) && (a && (a += " "), (a += r));
  return a;
}
const $t = (e) => {
  if (typeof e == "string") return e;
  let s,
    r = "";
  for (let a = 0; a < e.length; a++)
    e[a] && (s = $t(e[a])) && (r && (r += " "), (r += s));
  return r;
};
function cr(e, ...s) {
  let r,
    a,
    l,
    n = i;
  function i(m) {
    const c = s.reduce((h, g) => g(h), e());
    return ((r = nr(c)), (a = r.cache.get), (l = r.cache.set), (n = d), d(m));
  }
  function d(m) {
    const c = a(m);
    if (c) return c;
    const h = lr(m, r);
    return (l(m, h), h);
  }
  return function () {
    return n(dr.apply(null, arguments));
  };
}
const I = (e) => {
    const s = (r) => r[e] || [];
    return ((s.isThemeGetter = !0), s);
  },
  Ht = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  mr = /^\d+\/\d+$/,
  ur = new Set(["px", "full", "screen"]),
  pr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  xr =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  hr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  gr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  br =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  re = (e) => fe(e) || ur.has(e) || mr.test(e),
  ie = (e) => ve(e, "length", Cr),
  fe = (e) => !!e && !Number.isNaN(Number(e)),
  He = (e) => ve(e, "number", fe),
  Ne = (e) => !!e && Number.isInteger(Number(e)),
  fr = (e) => e.endsWith("%") && fe(e.slice(0, -1)),
  y = (e) => Ht.test(e),
  le = (e) => pr.test(e),
  vr = new Set(["length", "size", "percentage"]),
  yr = (e) => ve(e, vr, Gt),
  wr = (e) => ve(e, "position", Gt),
  jr = new Set(["image", "url"]),
  Nr = (e) => ve(e, jr, _r),
  kr = (e) => ve(e, "", Sr),
  ke = () => !0,
  ve = (e, s, r) => {
    const a = Ht.exec(e);
    return a
      ? a[1]
        ? typeof s == "string"
          ? a[1] === s
          : s.has(a[1])
        : r(a[2])
      : !1;
  },
  Cr = (e) => xr.test(e) && !hr.test(e),
  Gt = () => !1,
  Sr = (e) => gr.test(e),
  _r = (e) => br.test(e),
  Tr = () => {
    const e = I("colors"),
      s = I("spacing"),
      r = I("blur"),
      a = I("brightness"),
      l = I("borderColor"),
      n = I("borderRadius"),
      i = I("borderSpacing"),
      d = I("borderWidth"),
      m = I("contrast"),
      c = I("grayscale"),
      h = I("hueRotate"),
      g = I("invert"),
      o = I("gap"),
      p = I("gradientColorStops"),
      w = I("gradientColorStopPositions"),
      b = I("inset"),
      f = I("margin"),
      N = I("opacity"),
      S = I("padding"),
      R = I("saturate"),
      M = I("scale"),
      T = I("sepia"),
      B = I("skew"),
      D = I("space"),
      K = I("translate"),
      G = () => ["auto", "contain", "none"],
      te = () => ["auto", "hidden", "clip", "visible", "scroll"],
      V = () => ["auto", y, s],
      C = () => [y, s],
      F = () => ["", re, ie],
      ae = () => ["auto", fe, y],
      se = () => [
        "bottom",
        "center",
        "left",
        "left-bottom",
        "left-top",
        "right",
        "right-bottom",
        "right-top",
        "top",
      ],
      H = () => ["solid", "dashed", "dotted", "double", "none"],
      oe = () => [
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
      k = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
      ],
      O = () => ["", "0", y],
      pe = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      j = () => [fe, y];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [ke],
        spacing: [re, ie],
        blur: ["none", "", le, y],
        brightness: j(),
        borderColor: [e],
        borderRadius: ["none", "", "full", le, y],
        borderSpacing: C(),
        borderWidth: F(),
        contrast: j(),
        grayscale: O(),
        hueRotate: j(),
        invert: O(),
        gap: C(),
        gradientColorStops: [e],
        gradientColorStopPositions: [fr, ie],
        inset: V(),
        margin: V(),
        opacity: j(),
        padding: C(),
        saturate: j(),
        scale: j(),
        sepia: O(),
        skew: j(),
        space: C(),
        translate: C(),
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", "video", y] }],
        container: ["container"],
        columns: [{ columns: [le] }],
        "break-after": [{ "break-after": pe() }],
        "break-before": [{ "break-before": pe() }],
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
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: [...se(), y] }],
        overflow: [{ overflow: te() }],
        "overflow-x": [{ "overflow-x": te() }],
        "overflow-y": [{ "overflow-y": te() }],
        overscroll: [{ overscroll: G() }],
        "overscroll-x": [{ "overscroll-x": G() }],
        "overscroll-y": [{ "overscroll-y": G() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: [b] }],
        "inset-x": [{ "inset-x": [b] }],
        "inset-y": [{ "inset-y": [b] }],
        start: [{ start: [b] }],
        end: [{ end: [b] }],
        top: [{ top: [b] }],
        right: [{ right: [b] }],
        bottom: [{ bottom: [b] }],
        left: [{ left: [b] }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: ["auto", Ne, y] }],
        basis: [{ basis: V() }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
        flex: [{ flex: ["1", "auto", "initial", "none", y] }],
        grow: [{ grow: O() }],
        shrink: [{ shrink: O() }],
        order: [{ order: ["first", "last", "none", Ne, y] }],
        "grid-cols": [{ "grid-cols": [ke] }],
        "col-start-end": [{ col: ["auto", { span: ["full", Ne, y] }, y] }],
        "col-start": [{ "col-start": ae() }],
        "col-end": [{ "col-end": ae() }],
        "grid-rows": [{ "grid-rows": [ke] }],
        "row-start-end": [{ row: ["auto", { span: [Ne, y] }, y] }],
        "row-start": [{ "row-start": ae() }],
        "row-end": [{ "row-end": ae() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", y] }],
        "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", y] }],
        gap: [{ gap: [o] }],
        "gap-x": [{ "gap-x": [o] }],
        "gap-y": [{ "gap-y": [o] }],
        "justify-content": [{ justify: ["normal", ...k()] }],
        "justify-items": [
          { "justify-items": ["start", "end", "center", "stretch"] },
        ],
        "justify-self": [
          { "justify-self": ["auto", "start", "end", "center", "stretch"] },
        ],
        "align-content": [{ content: ["normal", ...k(), "baseline"] }],
        "align-items": [
          { items: ["start", "end", "center", "baseline", "stretch"] },
        ],
        "align-self": [
          { self: ["auto", "start", "end", "center", "stretch", "baseline"] },
        ],
        "place-content": [{ "place-content": [...k(), "baseline"] }],
        "place-items": [
          { "place-items": ["start", "end", "center", "baseline", "stretch"] },
        ],
        "place-self": [
          { "place-self": ["auto", "start", "end", "center", "stretch"] },
        ],
        p: [{ p: [S] }],
        px: [{ px: [S] }],
        py: [{ py: [S] }],
        ps: [{ ps: [S] }],
        pe: [{ pe: [S] }],
        pt: [{ pt: [S] }],
        pr: [{ pr: [S] }],
        pb: [{ pb: [S] }],
        pl: [{ pl: [S] }],
        m: [{ m: [f] }],
        mx: [{ mx: [f] }],
        my: [{ my: [f] }],
        ms: [{ ms: [f] }],
        me: [{ me: [f] }],
        mt: [{ mt: [f] }],
        mr: [{ mr: [f] }],
        mb: [{ mb: [f] }],
        ml: [{ ml: [f] }],
        "space-x": [{ "space-x": [D] }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": [D] }],
        "space-y-reverse": ["space-y-reverse"],
        w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", y, s] }],
        "min-w": [{ "min-w": [y, s, "min", "max", "fit"] }],
        "max-w": [
          {
            "max-w": [
              y,
              s,
              "none",
              "full",
              "min",
              "max",
              "fit",
              "prose",
              { screen: [le] },
              le,
            ],
          },
        ],
        h: [{ h: [y, s, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
        "min-h": [
          { "min-h": [y, s, "min", "max", "fit", "svh", "lvh", "dvh"] },
        ],
        "max-h": [
          { "max-h": [y, s, "min", "max", "fit", "svh", "lvh", "dvh"] },
        ],
        size: [{ size: [y, s, "auto", "min", "max", "fit"] }],
        "font-size": [{ text: ["base", le, ie] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [
          {
            font: [
              "thin",
              "extralight",
              "light",
              "normal",
              "medium",
              "semibold",
              "bold",
              "extrabold",
              "black",
              He,
            ],
          },
        ],
        "font-family": [{ font: [ke] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
        tracking: [
          {
            tracking: [
              "tighter",
              "tight",
              "normal",
              "wide",
              "wider",
              "widest",
              y,
            ],
          },
        ],
        "line-clamp": [{ "line-clamp": ["none", fe, He] }],
        leading: [
          {
            leading: [
              "none",
              "tight",
              "snug",
              "normal",
              "relaxed",
              "loose",
              re,
              y,
            ],
          },
        ],
        "list-image": [{ "list-image": ["none", y] }],
        "list-style-type": [{ list: ["none", "disc", "decimal", y] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "placeholder-color": [{ placeholder: [e] }],
        "placeholder-opacity": [{ "placeholder-opacity": [N] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "text-color": [{ text: [e] }],
        "text-opacity": [{ "text-opacity": [N] }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...H(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: ["auto", "from-font", re, ie] },
        ],
        "underline-offset": [{ "underline-offset": ["auto", re, y] }],
        "text-decoration-color": [{ decoration: [e] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: C() }],
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
              y,
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
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", y] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-opacity": [{ "bg-opacity": [N] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: [...se(), wr] }],
        "bg-repeat": [
          { bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] },
        ],
        "bg-size": [{ bg: ["auto", "cover", "contain", yr] }],
        "bg-image": [
          {
            bg: [
              "none",
              { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
              Nr,
            ],
          },
        ],
        "bg-color": [{ bg: [e] }],
        "gradient-from-pos": [{ from: [w] }],
        "gradient-via-pos": [{ via: [w] }],
        "gradient-to-pos": [{ to: [w] }],
        "gradient-from": [{ from: [p] }],
        "gradient-via": [{ via: [p] }],
        "gradient-to": [{ to: [p] }],
        rounded: [{ rounded: [n] }],
        "rounded-s": [{ "rounded-s": [n] }],
        "rounded-e": [{ "rounded-e": [n] }],
        "rounded-t": [{ "rounded-t": [n] }],
        "rounded-r": [{ "rounded-r": [n] }],
        "rounded-b": [{ "rounded-b": [n] }],
        "rounded-l": [{ "rounded-l": [n] }],
        "rounded-ss": [{ "rounded-ss": [n] }],
        "rounded-se": [{ "rounded-se": [n] }],
        "rounded-ee": [{ "rounded-ee": [n] }],
        "rounded-es": [{ "rounded-es": [n] }],
        "rounded-tl": [{ "rounded-tl": [n] }],
        "rounded-tr": [{ "rounded-tr": [n] }],
        "rounded-br": [{ "rounded-br": [n] }],
        "rounded-bl": [{ "rounded-bl": [n] }],
        "border-w": [{ border: [d] }],
        "border-w-x": [{ "border-x": [d] }],
        "border-w-y": [{ "border-y": [d] }],
        "border-w-s": [{ "border-s": [d] }],
        "border-w-e": [{ "border-e": [d] }],
        "border-w-t": [{ "border-t": [d] }],
        "border-w-r": [{ "border-r": [d] }],
        "border-w-b": [{ "border-b": [d] }],
        "border-w-l": [{ "border-l": [d] }],
        "border-opacity": [{ "border-opacity": [N] }],
        "border-style": [{ border: [...H(), "hidden"] }],
        "divide-x": [{ "divide-x": [d] }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": [d] }],
        "divide-y-reverse": ["divide-y-reverse"],
        "divide-opacity": [{ "divide-opacity": [N] }],
        "divide-style": [{ divide: H() }],
        "border-color": [{ border: [l] }],
        "border-color-x": [{ "border-x": [l] }],
        "border-color-y": [{ "border-y": [l] }],
        "border-color-s": [{ "border-s": [l] }],
        "border-color-e": [{ "border-e": [l] }],
        "border-color-t": [{ "border-t": [l] }],
        "border-color-r": [{ "border-r": [l] }],
        "border-color-b": [{ "border-b": [l] }],
        "border-color-l": [{ "border-l": [l] }],
        "divide-color": [{ divide: [l] }],
        "outline-style": [{ outline: ["", ...H()] }],
        "outline-offset": [{ "outline-offset": [re, y] }],
        "outline-w": [{ outline: [re, ie] }],
        "outline-color": [{ outline: [e] }],
        "ring-w": [{ ring: F() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: [e] }],
        "ring-opacity": [{ "ring-opacity": [N] }],
        "ring-offset-w": [{ "ring-offset": [re, ie] }],
        "ring-offset-color": [{ "ring-offset": [e] }],
        shadow: [{ shadow: ["", "inner", "none", le, kr] }],
        "shadow-color": [{ shadow: [ke] }],
        opacity: [{ opacity: [N] }],
        "mix-blend": [
          { "mix-blend": [...oe(), "plus-lighter", "plus-darker"] },
        ],
        "bg-blend": [{ "bg-blend": oe() }],
        filter: [{ filter: ["", "none"] }],
        blur: [{ blur: [r] }],
        brightness: [{ brightness: [a] }],
        contrast: [{ contrast: [m] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", le, y] }],
        grayscale: [{ grayscale: [c] }],
        "hue-rotate": [{ "hue-rotate": [h] }],
        invert: [{ invert: [g] }],
        saturate: [{ saturate: [R] }],
        sepia: [{ sepia: [T] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
        "backdrop-blur": [{ "backdrop-blur": [r] }],
        "backdrop-brightness": [{ "backdrop-brightness": [a] }],
        "backdrop-contrast": [{ "backdrop-contrast": [m] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": [c] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [h] }],
        "backdrop-invert": [{ "backdrop-invert": [g] }],
        "backdrop-opacity": [{ "backdrop-opacity": [N] }],
        "backdrop-saturate": [{ "backdrop-saturate": [R] }],
        "backdrop-sepia": [{ "backdrop-sepia": [T] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": [i] }],
        "border-spacing-x": [{ "border-spacing-x": [i] }],
        "border-spacing-y": [{ "border-spacing-y": [i] }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "none",
              "all",
              "",
              "colors",
              "opacity",
              "shadow",
              "transform",
              y,
            ],
          },
        ],
        duration: [{ duration: j() }],
        ease: [{ ease: ["linear", "in", "out", "in-out", y] }],
        delay: [{ delay: j() }],
        animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", y] }],
        transform: [{ transform: ["", "gpu", "none"] }],
        scale: [{ scale: [M] }],
        "scale-x": [{ "scale-x": [M] }],
        "scale-y": [{ "scale-y": [M] }],
        rotate: [{ rotate: [Ne, y] }],
        "translate-x": [{ "translate-x": [K] }],
        "translate-y": [{ "translate-y": [K] }],
        "skew-x": [{ "skew-x": [B] }],
        "skew-y": [{ "skew-y": [B] }],
        "transform-origin": [
          {
            origin: [
              "center",
              "top",
              "top-right",
              "right",
              "bottom-right",
              "bottom",
              "bottom-left",
              "left",
              "top-left",
              y,
            ],
          },
        ],
        accent: [{ accent: ["auto", e] }],
        appearance: [{ appearance: ["none", "auto"] }],
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
              y,
            ],
          },
        ],
        "caret-color": [{ caret: [e] }],
        "pointer-events": [{ "pointer-events": ["none", "auto"] }],
        resize: [{ resize: ["none", "y", "x", ""] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": C() }],
        "scroll-mx": [{ "scroll-mx": C() }],
        "scroll-my": [{ "scroll-my": C() }],
        "scroll-ms": [{ "scroll-ms": C() }],
        "scroll-me": [{ "scroll-me": C() }],
        "scroll-mt": [{ "scroll-mt": C() }],
        "scroll-mr": [{ "scroll-mr": C() }],
        "scroll-mb": [{ "scroll-mb": C() }],
        "scroll-ml": [{ "scroll-ml": C() }],
        "scroll-p": [{ "scroll-p": C() }],
        "scroll-px": [{ "scroll-px": C() }],
        "scroll-py": [{ "scroll-py": C() }],
        "scroll-ps": [{ "scroll-ps": C() }],
        "scroll-pe": [{ "scroll-pe": C() }],
        "scroll-pt": [{ "scroll-pt": C() }],
        "scroll-pr": [{ "scroll-pr": C() }],
        "scroll-pb": [{ "scroll-pb": C() }],
        "scroll-pl": [{ "scroll-pl": C() }],
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
          { "will-change": ["auto", "scroll", "contents", "transform", y] },
        ],
        fill: [{ fill: [e, "none"] }],
        "stroke-w": [{ stroke: [re, ie, He] }],
        stroke: [{ stroke: [e, "none"] }],
        sr: ["sr-only", "not-sr-only"],
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
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
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
    };
  },
  Mr = cr(Tr);
function $(...e) {
  return Mr(It(e));
}
const Er = ys,
  Ft = u.forwardRef(({ className: e, ...s }, r) =>
    t.jsx(gt, {
      ref: r,
      className: $(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        e,
      ),
      ...s,
    }),
  );
Ft.displayName = gt.displayName;
const Ar = Rt(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
      variants: {
        variant: {
          default: "border bg-background text-foreground",
          destructive:
            "destructive group border-destructive bg-destructive text-destructive-foreground",
        },
      },
      defaultVariants: { variant: "default" },
    },
  ),
  Wt = u.forwardRef(({ className: e, variant: s, ...r }, a) =>
    t.jsx(bt, { ref: a, className: $(Ar({ variant: s }), e), ...r }),
  );
Wt.displayName = bt.displayName;
const zr = u.forwardRef(({ className: e, ...s }, r) =>
  t.jsx(ft, {
    ref: r,
    className: $(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      e,
    ),
    ...s,
  }),
);
zr.displayName = ft.displayName;
const Ut = u.forwardRef(({ className: e, ...s }, r) =>
  t.jsx(vt, {
    ref: r,
    className: $(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      e,
    ),
    "toast-close": "",
    ...s,
    children: t.jsx(Ke, { className: "h-4 w-4" }),
  }),
);
Ut.displayName = vt.displayName;
const Yt = u.forwardRef(({ className: e, ...s }, r) =>
  t.jsx(yt, { ref: r, className: $("text-sm font-semibold", e), ...s }),
);
Yt.displayName = yt.displayName;
const Kt = u.forwardRef(({ className: e, ...s }, r) =>
  t.jsx(wt, { ref: r, className: $("text-sm opacity-90", e), ...s }),
);
Kt.displayName = wt.displayName;
function Ir() {
  const { toasts: e } = As();
  return t.jsxs(Er, {
    children: [
      e.map(function ({ id: s, title: r, description: a, action: l, ...n }) {
        return t.jsxs(
          Wt,
          {
            ...n,
            children: [
              t.jsxs("div", {
                className: "grid gap-1",
                children: [
                  r && t.jsx(Yt, { children: r }),
                  a && t.jsx(Kt, { children: a }),
                ],
              }),
              l,
              t.jsx(Ut, {}),
            ],
          },
          s,
        );
      }),
      t.jsx(Ft, {}),
    ],
  });
}
var Rr = (e, s, r, a, l, n, i, d) => {
    let m = document.documentElement,
      c = ["light", "dark"];
    function h(p) {
      ((Array.isArray(e) ? e : [e]).forEach((w) => {
        let b = w === "class",
          f = b && n ? l.map((N) => n[N] || N) : l;
        b
          ? (m.classList.remove(...f), m.classList.add(n && n[p] ? n[p] : p))
          : m.setAttribute(w, p);
      }),
        g(p));
    }
    function g(p) {
      d && c.includes(p) && (m.style.colorScheme = p);
    }
    function o() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    if (a) h(a);
    else
      try {
        let p = localStorage.getItem(s) || r,
          w = i && p === "system" ? o() : p;
        h(w);
      } catch {}
  },
  Pr = u.createContext(void 0),
  Lr = { setTheme: (e) => {}, themes: [] },
  Br = () => {
    var e;
    return (e = u.useContext(Pr)) != null ? e : Lr;
  };
u.memo(
  ({
    forcedTheme: e,
    storageKey: s,
    attribute: r,
    enableSystem: a,
    enableColorScheme: l,
    defaultTheme: n,
    value: i,
    themes: d,
    nonce: m,
    scriptProps: c,
  }) => {
    let h = JSON.stringify([r, s, n, e, d, i, a, l]).slice(1, -1);
    return u.createElement("script", {
      ...c,
      suppressHydrationWarning: !0,
      nonce: typeof window > "u" ? m : "",
      dangerouslySetInnerHTML: { __html: `(${Rr.toString()})(${h})` },
    });
  },
);
var Dr = (e) => {
    switch (e) {
      case "success":
        return qr;
      case "info":
        return Hr;
      case "warning":
        return $r;
      case "error":
        return Gr;
      default:
        return null;
    }
  },
  Or = Array(12).fill(0),
  Vr = ({ visible: e }) =>
    x.createElement(
      "div",
      { className: "sonner-loading-wrapper", "data-visible": e },
      x.createElement(
        "div",
        { className: "sonner-spinner" },
        Or.map((s, r) =>
          x.createElement("div", {
            className: "sonner-loading-bar",
            key: `spinner-bar-${r}`,
          }),
        ),
      ),
    ),
  qr = x.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    x.createElement("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      clipRule: "evenodd",
    }),
  ),
  $r = x.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    x.createElement("path", {
      fillRule: "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
      clipRule: "evenodd",
    }),
  ),
  Hr = x.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    x.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
      clipRule: "evenodd",
    }),
  ),
  Gr = x.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    x.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
      clipRule: "evenodd",
    }),
  ),
  Fr = () => {
    let [e, s] = x.useState(document.hidden);
    return (
      x.useEffect(() => {
        let r = () => {
          s(document.hidden);
        };
        return (
          document.addEventListener("visibilitychange", r),
          () => window.removeEventListener("visibilitychange", r)
        );
      }, []),
      e
    );
  },
  Qe = 1,
  Wr = class {
    constructor() {
      ((this.subscribe = (e) => (
        this.subscribers.push(e),
        () => {
          let s = this.subscribers.indexOf(e);
          this.subscribers.splice(s, 1);
        }
      )),
        (this.publish = (e) => {
          this.subscribers.forEach((s) => s(e));
        }),
        (this.addToast = (e) => {
          (this.publish(e), (this.toasts = [...this.toasts, e]));
        }),
        (this.create = (e) => {
          var s;
          let { message: r, ...a } = e,
            l =
              typeof (e == null ? void 0 : e.id) == "number" ||
              ((s = e.id) == null ? void 0 : s.length) > 0
                ? e.id
                : Qe++,
            n = this.toasts.find((d) => d.id === l),
            i = e.dismissible === void 0 ? !0 : e.dismissible;
          return (
            n
              ? (this.toasts = this.toasts.map((d) =>
                  d.id === l
                    ? (this.publish({ ...d, ...e, id: l, title: r }),
                      { ...d, ...e, id: l, dismissible: i, title: r })
                    : d,
                ))
              : this.addToast({ title: r, ...a, dismissible: i, id: l }),
            l
          );
        }),
        (this.dismiss = (e) => (
          e ||
            this.toasts.forEach((s) => {
              this.subscribers.forEach((r) => r({ id: s.id, dismiss: !0 }));
            }),
          this.subscribers.forEach((s) => s({ id: e, dismiss: !0 })),
          e
        )),
        (this.message = (e, s) => this.create({ ...s, message: e })),
        (this.error = (e, s) =>
          this.create({ ...s, message: e, type: "error" })),
        (this.success = (e, s) =>
          this.create({ ...s, type: "success", message: e })),
        (this.info = (e, s) => this.create({ ...s, type: "info", message: e })),
        (this.warning = (e, s) =>
          this.create({ ...s, type: "warning", message: e })),
        (this.loading = (e, s) =>
          this.create({ ...s, type: "loading", message: e })),
        (this.promise = (e, s) => {
          if (!s) return;
          let r;
          s.loading !== void 0 &&
            (r = this.create({
              ...s,
              promise: e,
              type: "loading",
              message: s.loading,
              description:
                typeof s.description != "function" ? s.description : void 0,
            }));
          let a = e instanceof Promise ? e : e(),
            l = r !== void 0;
          return (
            a
              .then(async (n) => {
                if (Yr(n) && !n.ok) {
                  l = !1;
                  let i =
                      typeof s.error == "function"
                        ? await s.error(`HTTP error! status: ${n.status}`)
                        : s.error,
                    d =
                      typeof s.description == "function"
                        ? await s.description(`HTTP error! status: ${n.status}`)
                        : s.description;
                  this.create({
                    id: r,
                    type: "error",
                    message: i,
                    description: d,
                  });
                } else if (s.success !== void 0) {
                  l = !1;
                  let i =
                      typeof s.success == "function"
                        ? await s.success(n)
                        : s.success,
                    d =
                      typeof s.description == "function"
                        ? await s.description(n)
                        : s.description;
                  this.create({
                    id: r,
                    type: "success",
                    message: i,
                    description: d,
                  });
                }
              })
              .catch(async (n) => {
                if (s.error !== void 0) {
                  l = !1;
                  let i =
                      typeof s.error == "function" ? await s.error(n) : s.error,
                    d =
                      typeof s.description == "function"
                        ? await s.description(n)
                        : s.description;
                  this.create({
                    id: r,
                    type: "error",
                    message: i,
                    description: d,
                  });
                }
              })
              .finally(() => {
                var n;
                (l && (this.dismiss(r), (r = void 0)),
                  (n = s.finally) == null || n.call(s));
              }),
            r
          );
        }),
        (this.custom = (e, s) => {
          let r = (s == null ? void 0 : s.id) || Qe++;
          return (this.create({ jsx: e(r), id: r, ...s }), r);
        }),
        (this.subscribers = []),
        (this.toasts = []));
    }
  },
  W = new Wr(),
  Ur = (e, s) => {
    let r = (s == null ? void 0 : s.id) || Qe++;
    return (W.addToast({ title: e, ...s, id: r }), r);
  },
  Yr = (e) =>
    e &&
    typeof e == "object" &&
    "ok" in e &&
    typeof e.ok == "boolean" &&
    "status" in e &&
    typeof e.status == "number",
  Kr = Ur,
  Jr = () => W.toasts;
Object.assign(
  Kr,
  {
    success: W.success,
    info: W.info,
    warning: W.warning,
    error: W.error,
    custom: W.custom,
    message: W.message,
    promise: W.promise,
    dismiss: W.dismiss,
    loading: W.loading,
  },
  { getHistory: Jr },
);
function Qr(e, { insertAt: s } = {}) {
  if (typeof document > "u") return;
  let r = document.head || document.getElementsByTagName("head")[0],
    a = document.createElement("style");
  ((a.type = "text/css"),
    s === "top" && r.firstChild
      ? r.insertBefore(a, r.firstChild)
      : r.appendChild(a),
    a.styleSheet
      ? (a.styleSheet.cssText = e)
      : a.appendChild(document.createTextNode(e)));
}
Qr(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999}:where([data-sonner-toaster][data-x-position="right"]){right:max(var(--offset),env(safe-area-inset-right))}:where([data-sonner-toaster][data-x-position="left"]){left:max(var(--offset),env(safe-area-inset-left))}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:max(var(--offset),env(safe-area-inset-top))}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:max(var(--offset),env(safe-area-inset-bottom))}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;background:var(--gray1);color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:0;right:0;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation:swipe-out .2s ease-out forwards}@keyframes swipe-out{0%{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount)));opacity:1}to{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount) + var(--lift) * -100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset: 16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position=bottom]{bottom:20px}[data-sonner-toaster][data-y-position=top]{top:20px}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function Me(e) {
  return e.label !== void 0;
}
var Zr = 3,
  Xr = "32px",
  ea = 4e3,
  ta = 356,
  sa = 14,
  ra = 20,
  aa = 200;
function oa(...e) {
  return e.filter(Boolean).join(" ");
}
var na = (e) => {
  var s, r, a, l, n, i, d, m, c, h;
  let {
      invert: g,
      toast: o,
      unstyled: p,
      interacting: w,
      setHeights: b,
      visibleToasts: f,
      heights: N,
      index: S,
      toasts: R,
      expanded: M,
      removeToast: T,
      defaultRichColors: B,
      closeButton: D,
      style: K,
      cancelButtonStyle: G,
      actionButtonStyle: te,
      className: V = "",
      descriptionClassName: C = "",
      duration: F,
      position: ae,
      gap: se,
      loadingIcon: H,
      expandByDefault: oe,
      classNames: k,
      icons: O,
      closeButtonAriaLabel: pe = "Close toast",
      pauseWhenPageIsHidden: j,
      cn: A,
    } = e,
    [P, J] = x.useState(!1),
    [ce, L] = x.useState(!1),
    [Le, ye] = x.useState(!1),
    [we, je] = x.useState(!1),
    [ts, Be] = x.useState(0),
    [ss, Xe] = x.useState(0),
    et = x.useRef(null),
    xe = x.useRef(null),
    rs = S === 0,
    as = S + 1 <= f,
    U = o.type,
    he = o.dismissible !== !1,
    os = o.className || "",
    ns = o.descriptionClassName || "",
    _e = x.useMemo(
      () => N.findIndex((v) => v.toastId === o.id) || 0,
      [N, o.id],
    ),
    is = x.useMemo(() => {
      var v;
      return (v = o.closeButton) != null ? v : D;
    }, [o.closeButton, D]),
    tt = x.useMemo(() => o.duration || F || ea, [o.duration, F]),
    De = x.useRef(0),
    ge = x.useRef(0),
    st = x.useRef(0),
    be = x.useRef(null),
    [rt, ls] = ae.split("-"),
    at = x.useMemo(
      () => N.reduce((v, z, E) => (E >= _e ? v : v + z.height), 0),
      [N, _e],
    ),
    ot = Fr(),
    ds = o.invert || g,
    Oe = U === "loading";
  ((ge.current = x.useMemo(() => _e * se + at, [_e, at])),
    x.useEffect(() => {
      J(!0);
    }, []),
    x.useLayoutEffect(() => {
      if (!P) return;
      let v = xe.current,
        z = v.style.height;
      v.style.height = "auto";
      let E = v.getBoundingClientRect().height;
      ((v.style.height = z),
        Xe(E),
        b((Q) =>
          Q.find((Z) => Z.toastId === o.id)
            ? Q.map((Z) => (Z.toastId === o.id ? { ...Z, height: E } : Z))
            : [{ toastId: o.id, height: E, position: o.position }, ...Q],
        ));
    }, [P, o.title, o.description, b, o.id]));
  let ne = x.useCallback(() => {
    (L(!0),
      Be(ge.current),
      b((v) => v.filter((z) => z.toastId !== o.id)),
      setTimeout(() => {
        T(o);
      }, aa));
  }, [o, T, b, ge]);
  (x.useEffect(() => {
    if (
      (o.promise && U === "loading") ||
      o.duration === 1 / 0 ||
      o.type === "loading"
    )
      return;
    let v,
      z = tt;
    return (
      M || w || (j && ot)
        ? (() => {
            if (st.current < De.current) {
              let E = new Date().getTime() - De.current;
              z = z - E;
            }
            st.current = new Date().getTime();
          })()
        : z !== 1 / 0 &&
          ((De.current = new Date().getTime()),
          (v = setTimeout(() => {
            var E;
            ((E = o.onAutoClose) == null || E.call(o, o), ne());
          }, z))),
      () => clearTimeout(v)
    );
  }, [M, w, oe, o, tt, ne, o.promise, U, j, ot]),
    x.useEffect(() => {
      let v = xe.current;
      if (v) {
        let z = v.getBoundingClientRect().height;
        return (
          Xe(z),
          b((E) => [{ toastId: o.id, height: z, position: o.position }, ...E]),
          () => b((E) => E.filter((Q) => Q.toastId !== o.id))
        );
      }
    }, [b, o.id]),
    x.useEffect(() => {
      o.delete && ne();
    }, [ne, o.delete]));
  function cs() {
    return O != null && O.loading
      ? x.createElement(
          "div",
          { className: "sonner-loader", "data-visible": U === "loading" },
          O.loading,
        )
      : H
        ? x.createElement(
            "div",
            { className: "sonner-loader", "data-visible": U === "loading" },
            H,
          )
        : x.createElement(Vr, { visible: U === "loading" });
  }
  return x.createElement(
    "li",
    {
      "aria-live": o.important ? "assertive" : "polite",
      "aria-atomic": "true",
      role: "status",
      tabIndex: 0,
      ref: xe,
      className: A(
        V,
        os,
        k == null ? void 0 : k.toast,
        (s = o == null ? void 0 : o.classNames) == null ? void 0 : s.toast,
        k == null ? void 0 : k.default,
        k == null ? void 0 : k[U],
        (r = o == null ? void 0 : o.classNames) == null ? void 0 : r[U],
      ),
      "data-sonner-toast": "",
      "data-rich-colors": (a = o.richColors) != null ? a : B,
      "data-styled": !(o.jsx || o.unstyled || p),
      "data-mounted": P,
      "data-promise": !!o.promise,
      "data-removed": ce,
      "data-visible": as,
      "data-y-position": rt,
      "data-x-position": ls,
      "data-index": S,
      "data-front": rs,
      "data-swiping": Le,
      "data-dismissible": he,
      "data-type": U,
      "data-invert": ds,
      "data-swipe-out": we,
      "data-expanded": !!(M || (oe && P)),
      style: {
        "--index": S,
        "--toasts-before": S,
        "--z-index": R.length - S,
        "--offset": `${ce ? ts : ge.current}px`,
        "--initial-height": oe ? "auto" : `${ss}px`,
        ...K,
        ...o.style,
      },
      onPointerDown: (v) => {
        Oe ||
          !he ||
          ((et.current = new Date()),
          Be(ge.current),
          v.target.setPointerCapture(v.pointerId),
          v.target.tagName !== "BUTTON" &&
            (ye(!0), (be.current = { x: v.clientX, y: v.clientY })));
      },
      onPointerUp: () => {
        var v, z, E, Q;
        if (we || !he) return;
        be.current = null;
        let Z = Number(
            ((v = xe.current) == null
              ? void 0
              : v.style.getPropertyValue("--swipe-amount").replace("px", "")) ||
              0,
          ),
          Te =
            new Date().getTime() -
            ((z = et.current) == null ? void 0 : z.getTime()),
          ms = Math.abs(Z) / Te;
        if (Math.abs(Z) >= ra || ms > 0.11) {
          (Be(ge.current),
            (E = o.onDismiss) == null || E.call(o, o),
            ne(),
            je(!0));
          return;
        }
        ((Q = xe.current) == null ||
          Q.style.setProperty("--swipe-amount", "0px"),
          ye(!1));
      },
      onPointerMove: (v) => {
        var z;
        if (!be.current || !he) return;
        let E = v.clientY - be.current.y,
          Q = v.clientX - be.current.x,
          Z = (rt === "top" ? Math.min : Math.max)(0, E),
          Te = v.pointerType === "touch" ? 10 : 2;
        Math.abs(Z) > Te
          ? (z = xe.current) == null ||
            z.style.setProperty("--swipe-amount", `${E}px`)
          : Math.abs(Q) > Te && (be.current = null);
      },
    },
    is && !o.jsx
      ? x.createElement(
          "button",
          {
            "aria-label": pe,
            "data-disabled": Oe,
            "data-close-button": !0,
            onClick:
              Oe || !he
                ? () => {}
                : () => {
                    var v;
                    (ne(), (v = o.onDismiss) == null || v.call(o, o));
                  },
            className: A(
              k == null ? void 0 : k.closeButton,
              (l = o == null ? void 0 : o.classNames) == null
                ? void 0
                : l.closeButton,
            ),
          },
          x.createElement(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "12",
              height: "12",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            },
            x.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            x.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
          ),
        )
      : null,
    o.jsx || x.isValidElement(o.title)
      ? o.jsx || o.title
      : x.createElement(
          x.Fragment,
          null,
          U || o.icon || o.promise
            ? x.createElement(
                "div",
                {
                  "data-icon": "",
                  className: A(
                    k == null ? void 0 : k.icon,
                    (n = o == null ? void 0 : o.classNames) == null
                      ? void 0
                      : n.icon,
                  ),
                },
                o.promise || (o.type === "loading" && !o.icon)
                  ? o.icon || cs()
                  : null,
                o.type !== "loading"
                  ? o.icon || (O == null ? void 0 : O[U]) || Dr(U)
                  : null,
              )
            : null,
          x.createElement(
            "div",
            {
              "data-content": "",
              className: A(
                k == null ? void 0 : k.content,
                (i = o == null ? void 0 : o.classNames) == null
                  ? void 0
                  : i.content,
              ),
            },
            x.createElement(
              "div",
              {
                "data-title": "",
                className: A(
                  k == null ? void 0 : k.title,
                  (d = o == null ? void 0 : o.classNames) == null
                    ? void 0
                    : d.title,
                ),
              },
              o.title,
            ),
            o.description
              ? x.createElement(
                  "div",
                  {
                    "data-description": "",
                    className: A(
                      C,
                      ns,
                      k == null ? void 0 : k.description,
                      (m = o == null ? void 0 : o.classNames) == null
                        ? void 0
                        : m.description,
                    ),
                  },
                  o.description,
                )
              : null,
          ),
          x.isValidElement(o.cancel)
            ? o.cancel
            : o.cancel && Me(o.cancel)
              ? x.createElement(
                  "button",
                  {
                    "data-button": !0,
                    "data-cancel": !0,
                    style: o.cancelButtonStyle || G,
                    onClick: (v) => {
                      var z, E;
                      Me(o.cancel) &&
                        he &&
                        ((E = (z = o.cancel).onClick) == null || E.call(z, v),
                        ne());
                    },
                    className: A(
                      k == null ? void 0 : k.cancelButton,
                      (c = o == null ? void 0 : o.classNames) == null
                        ? void 0
                        : c.cancelButton,
                    ),
                  },
                  o.cancel.label,
                )
              : null,
          x.isValidElement(o.action)
            ? o.action
            : o.action && Me(o.action)
              ? x.createElement(
                  "button",
                  {
                    "data-button": !0,
                    "data-action": !0,
                    style: o.actionButtonStyle || te,
                    onClick: (v) => {
                      var z, E;
                      Me(o.action) &&
                        (v.defaultPrevented ||
                          ((E = (z = o.action).onClick) == null || E.call(z, v),
                          ne()));
                    },
                    className: A(
                      k == null ? void 0 : k.actionButton,
                      (h = o == null ? void 0 : o.classNames) == null
                        ? void 0
                        : h.actionButton,
                    ),
                  },
                  o.action.label,
                )
              : null,
        ),
  );
};
function ut() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  let e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e
    ? window.getComputedStyle(document.documentElement).direction
    : e;
}
var ia = (e) => {
  let {
      invert: s,
      position: r = "bottom-right",
      hotkey: a = ["altKey", "KeyT"],
      expand: l,
      closeButton: n,
      className: i,
      offset: d,
      theme: m = "light",
      richColors: c,
      duration: h,
      style: g,
      visibleToasts: o = Zr,
      toastOptions: p,
      dir: w = ut(),
      gap: b = sa,
      loadingIcon: f,
      icons: N,
      containerAriaLabel: S = "Notifications",
      pauseWhenPageIsHidden: R,
      cn: M = oa,
    } = e,
    [T, B] = x.useState([]),
    D = x.useMemo(
      () =>
        Array.from(
          new Set(
            [r].concat(T.filter((j) => j.position).map((j) => j.position)),
          ),
        ),
      [T, r],
    ),
    [K, G] = x.useState([]),
    [te, V] = x.useState(!1),
    [C, F] = x.useState(!1),
    [ae, se] = x.useState(
      m !== "system"
        ? m
        : typeof window < "u" &&
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
    ),
    H = x.useRef(null),
    oe = a.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
    k = x.useRef(null),
    O = x.useRef(!1),
    pe = x.useCallback(
      (j) => {
        var A;
        (((A = T.find((P) => P.id === j.id)) != null && A.delete) ||
          W.dismiss(j.id),
          B((P) => P.filter(({ id: J }) => J !== j.id)));
      },
      [T],
    );
  return (
    x.useEffect(
      () =>
        W.subscribe((j) => {
          if (j.dismiss) {
            B((A) => A.map((P) => (P.id === j.id ? { ...P, delete: !0 } : P)));
            return;
          }
          setTimeout(() => {
            hs.flushSync(() => {
              B((A) => {
                let P = A.findIndex((J) => J.id === j.id);
                return P !== -1
                  ? [...A.slice(0, P), { ...A[P], ...j }, ...A.slice(P + 1)]
                  : [j, ...A];
              });
            });
          });
        }),
      [],
    ),
    x.useEffect(() => {
      if (m !== "system") {
        se(m);
        return;
      }
      (m === "system" &&
        (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? se("dark")
          : se("light")),
        typeof window < "u" &&
          window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", ({ matches: j }) => {
              se(j ? "dark" : "light");
            }));
    }, [m]),
    x.useEffect(() => {
      T.length <= 1 && V(!1);
    }, [T]),
    x.useEffect(() => {
      let j = (A) => {
        var P, J;
        (a.every((ce) => A[ce] || A.code === ce) &&
          (V(!0), (P = H.current) == null || P.focus()),
          A.code === "Escape" &&
            (document.activeElement === H.current ||
              ((J = H.current) != null &&
                J.contains(document.activeElement))) &&
            V(!1));
      };
      return (
        document.addEventListener("keydown", j),
        () => document.removeEventListener("keydown", j)
      );
    }, [a]),
    x.useEffect(() => {
      if (H.current)
        return () => {
          k.current &&
            (k.current.focus({ preventScroll: !0 }),
            (k.current = null),
            (O.current = !1));
        };
    }, [H.current]),
    T.length
      ? x.createElement(
          "section",
          { "aria-label": `${S} ${oe}`, tabIndex: -1 },
          D.map((j, A) => {
            var P;
            let [J, ce] = j.split("-");
            return x.createElement(
              "ol",
              {
                key: j,
                dir: w === "auto" ? ut() : w,
                tabIndex: -1,
                ref: H,
                className: i,
                "data-sonner-toaster": !0,
                "data-theme": ae,
                "data-y-position": J,
                "data-x-position": ce,
                style: {
                  "--front-toast-height": `${((P = K[0]) == null ? void 0 : P.height) || 0}px`,
                  "--offset": typeof d == "number" ? `${d}px` : d || Xr,
                  "--width": `${ta}px`,
                  "--gap": `${b}px`,
                  ...g,
                },
                onBlur: (L) => {
                  O.current &&
                    !L.currentTarget.contains(L.relatedTarget) &&
                    ((O.current = !1),
                    k.current &&
                      (k.current.focus({ preventScroll: !0 }),
                      (k.current = null)));
                },
                onFocus: (L) => {
                  (L.target instanceof HTMLElement &&
                    L.target.dataset.dismissible === "false") ||
                    O.current ||
                    ((O.current = !0), (k.current = L.relatedTarget));
                },
                onMouseEnter: () => V(!0),
                onMouseMove: () => V(!0),
                onMouseLeave: () => {
                  C || V(!1);
                },
                onPointerDown: (L) => {
                  (L.target instanceof HTMLElement &&
                    L.target.dataset.dismissible === "false") ||
                    F(!0);
                },
                onPointerUp: () => F(!1),
              },
              T.filter((L) => (!L.position && A === 0) || L.position === j).map(
                (L, Le) => {
                  var ye, we;
                  return x.createElement(na, {
                    key: L.id,
                    icons: N,
                    index: Le,
                    toast: L,
                    defaultRichColors: c,
                    duration:
                      (ye = p == null ? void 0 : p.duration) != null ? ye : h,
                    className: p == null ? void 0 : p.className,
                    descriptionClassName:
                      p == null ? void 0 : p.descriptionClassName,
                    invert: s,
                    visibleToasts: o,
                    closeButton:
                      (we = p == null ? void 0 : p.closeButton) != null
                        ? we
                        : n,
                    interacting: C,
                    position: j,
                    style: p == null ? void 0 : p.style,
                    unstyled: p == null ? void 0 : p.unstyled,
                    classNames: p == null ? void 0 : p.classNames,
                    cancelButtonStyle: p == null ? void 0 : p.cancelButtonStyle,
                    actionButtonStyle: p == null ? void 0 : p.actionButtonStyle,
                    removeToast: pe,
                    toasts: T.filter((je) => je.position == L.position),
                    heights: K.filter((je) => je.position == L.position),
                    setHeights: G,
                    expandByDefault: l,
                    gap: b,
                    loadingIcon: f,
                    expanded: te,
                    pauseWhenPageIsHidden: R,
                    cn: M,
                  });
                },
              ),
            );
          }),
        )
      : null
  );
};
const la = ({ ...e }) => {
    const { theme: s = "system" } = Br();
    return t.jsx(ia, {
      theme: s,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      },
      ...e,
    });
  },
  da = ws,
  ca = u.forwardRef(({ className: e, sideOffset: s = 4, ...r }, a) =>
    t.jsx(jt, {
      ref: a,
      sideOffset: s,
      className: $(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        e,
      ),
      ...r,
    }),
  );
ca.displayName = jt.displayName;
const ma = "https://fbpemdlnlsgqkovnatro.supabase.co",
  ua =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicGVtZGxubHNncWtvdm5hdHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTQwOTksImV4cCI6MjA2Nzk5MDA5OX0.qJvBiB29BxSOMBCYtdcqMUOepSQecdtvpdglNrIZEhY",
  q = us(ma, ua),
  Jt = u.createContext(void 0),
  Qt = () => {
    const e = u.useContext(Jt);
    if (e === void 0)
      throw new Error("useAuth must be used within an AuthProvider");
    return e;
  },
  pa = ({ children: e }) => {
    const [s, r] = u.useState(null),
      [a, l] = u.useState(!0),
      n = u.useCallback(() => {
        if (!(typeof window > "u")) return `${window.location.origin}/auth`;
      }, []),
      i = u.useCallback((p) => {
        const w = p;
        return !!(p.email_confirmed_at || w.confirmed_at);
      }, []),
      d = u.useCallback(
        async (p) => {
          var N, S, R;
          if (!i(p))
            throw new Error(
              "Please confirm your email address before signing in.",
            );
          let w = "customer",
            b = null;
          try {
            const { data: M, error: T } = await q
              .from("customers")
              .select("role, name, company_name")
              .eq("id", p.id)
              .single();
            if (!T && M != null && M.role) ((w = M.role), (b = M.name));
            else {
              const B =
                  ((N = p.user_metadata) == null ? void 0 : N.name) ||
                  "New Customer",
                { error: D } = await q.from("customers").insert([
                  {
                    id: p.id,
                    name: B,
                    email: p.email,
                    company_name:
                      ((S = p.user_metadata) == null
                        ? void 0
                        : S.company_name) || "Default Company",
                    role: "customer",
                  },
                ]);
              if (D)
                throw (
                  console.error("Error creating customer record:", D),
                  new Error(
                    "Failed to create user record. Please contact support.",
                  )
                );
              ((w = "customer"), (b = B));
            }
          } catch (M) {
            throw (console.error("Error in setUserFromSession:", M), M);
          }
          const f = {
            id: p.id,
            name:
              b || ((R = p.user_metadata) == null ? void 0 : R.name) || null,
            email: p.email,
            role: w,
          };
          return (r(f), f);
        },
        [i],
      ),
      m = u.useCallback(async () => {
        try {
          const {
            data: { session: p },
          } = await q.auth.getSession();
          if (p != null && p.user) {
            if (!i(p.user)) {
              (await q.auth.signOut(), r(null));
              return;
            }
            await d(p.user);
          }
        } catch (p) {
          console.error("Error getting session:", p);
        } finally {
          l(!1);
        }
      }, [i, d]);
    u.useEffect(() => {
      m();
      const {
        data: { subscription: p },
      } = q.auth.onAuthStateChange((w, b) => {
        if (b != null && b.user) {
          if (!i(b.user)) {
            (q.auth.signOut(), r(null));
            return;
          }
          d(b.user).catch((f) => {
            console.error("Error handling auth state change:", f);
          });
        } else r(null);
      });
      return () => p.unsubscribe();
    }, [m, i, d]);
    const o = {
      user: s,
      isAuthenticated: !!s,
      loading: a,
      login: async (p, w) => {
        const { data: b, error: f } = await q.auth.signInWithPassword({
          email: p,
          password: w,
        });
        if (f) throw f;
        if (!b.user) throw new Error("Failed to login");
        if (!i(b.user))
          throw (
            await q.auth.signOut(),
            new Error(
              "Please confirm your email before signing in. Check your inbox for the confirmation link.",
            )
          );
        return await d(b.user);
      },
      logout: async () => {
        const { error: p } = await q.auth.signOut();
        if (p) {
          console.warn(
            "Global sign-out failed, forcing local auth cleanup:",
            p,
          );
          try {
            if (typeof window < "u" && window.localStorage) {
              const w =
                q.auth && typeof q.auth.storageKey == "string"
                  ? q.auth.storageKey
                  : null;
              w &&
                (window.localStorage.removeItem(w),
                window.localStorage.removeItem(`${w}-code-verifier`));
              Object.keys(window.localStorage).forEach((b) => {
                (b.startsWith("sb-") && b.endsWith("-auth-token")) ||
                b === "supabase.auth.token"
                  ? window.localStorage.removeItem(b)
                  : null;
              });
            }
            await q.auth.signOut({ scope: "local" });
          } catch (w) {
            console.warn("Local auth cleanup fallback failed:", w);
          }
        }
        r(null);
      },
      signUp: async (p, w, b, f, N, S, R) => {
        const M = n(),
          { data: T, error: B } = await q.auth.signUp({
            email: p,
            password: w,
            options: {
              emailRedirectTo: M,
              data: {
                name: b,
                company_name: f,
                phone: N,
                address: S,
                privacy_consent_accepted: !!R,
                privacy_consent_accepted_at: R == null ? void 0 : R.acceptedAt,
                privacy_consent_version: R == null ? void 0 : R.version,
              },
            },
          });
        if (B) throw B;
        if (!T.user) throw new Error("Failed to create user");
        T.session && (await q.auth.signOut());
        const { error: D } = await q.from("customers").insert([
          {
            id: T.user.id,
            name: b || "New Customer",
            email: T.user.email,
            company_name: f || "Default Company",
            phone: N || "",
            address: S || "",
            role: "customer",
          },
        ]);
        if (D)
          throw (
            console.error("Error creating customer record:", D),
            new Error("Failed to create customer record: " + D.message)
          );
        const { error: K } = await q.auth.resend({
          type: "signup",
          email: p,
          options: { emailRedirectTo: M },
        });
        return (
          K &&
            console.warn(
              "Could not resend signup confirmation email:",
              K.message,
            ),
          {
            id: T.user.id,
            name: b || null,
            email: T.user.email,
            role: "customer",
          }
        );
      },
    };
    return t.jsx(Jt.Provider, { value: o, children: e });
  },
  xa = () => {
    const [e, s] = u.useState(!1),
      l = `https://wa.me/+905533684250?text=${encodeURIComponent("Hello, I'd like to inquire about your shipping consolidation services.")}`;
    return t.jsxs("a", {
      href: l,
      target: "_blank",
      rel: "noopener noreferrer",
      className: `fixed bottom-6 right-6 z-50 flex items-center gap-2 p-3 rounded-full ${e ? "bg-green-600 pr-4" : "bg-green-500"} text-white shadow-lg transition-all duration-300 hover:shadow-xl`,
      onMouseEnter: () => s(!0),
      onMouseLeave: () => s(!1),
      children: [
        t.jsx("div", {
          className: "flex items-center justify-center w-10 h-10",
          children: t.jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 448 512",
            className: "w-6 h-6 fill-current",
            children: t.jsx("path", {
              d: "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z",
            }),
          }),
        }),
        e &&
          t.jsx("span", {
            className: "whitespace-nowrap text-sm font-medium",
            children: "Chat with us on WhatsApp",
          }),
      ],
    });
  },
  ha = Rt(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline:
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    },
  ),
  ue = u.forwardRef(
    ({ className: e, variant: s, size: r, asChild: a = !1, ...l }, n) => {
      const i = a ? js : "button";
      return t.jsx(i, {
        className: $(ha({ variant: s, size: r, className: e })),
        ref: n,
        ...l,
      });
    },
  );
ue.displayName = "Button";
const Pe = ({
    size: e = "md",
    className: s = "",
    showText: r = !0,
    markClassName: a = "",
    textClassName: l = "",
  }) => {
    const n = {
        xxs: "w-6 h-6",
        xs: "w-10 h-10",
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32",
      },
      i = {
        xxs: "text-xs",
        xs: "text-sm",
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-4xl",
      },
      d = a.trim() ? a : n[e],
      m = l.trim() ? l : i[e];
    return t.jsxs("div", {
      className: `flex items-center gap-2 ${s}`,
      role: "img",
      "aria-label": "Bundleist",
      children: [
        t.jsx("div", {
          className: [
            d,
            "rounded-2xl bg-gradient-to-br from-slate-950 to-slate-800",
            "ring-1 ring-white/10 shadow-sm",
            "flex items-center justify-center",
          ].join(" "),
          children: t.jsx("svg", {
            width: "100%",
            height: "100%",
            xmlns: "http://www.w3.org/2000/svg",
            className: "w-[78%] h-[78%]",
            viewBox: "0 0 64 64",
            "aria-hidden": "true",
            focusable: "false",
            children: t.jsx("path", {
              d: "M22 16v32M22 16h16a10 10 0 0 1 0 20H22M22 36h18a10 10 0 0 1 0 20H22",
              fill: "none",
              stroke: "#34d399",
              strokeWidth: "7.5",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }),
          }),
        }),
        r &&
          t.jsx("div", {
            className: `${m} leading-none`,
            children: t.jsxs("span", {
              className: "font-semibold tracking-tight text-slate-900",
              style: {
                fontFamily:
                  '"Space Grotesk", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
              },
              children: [
                t.jsx("span", { className: l, children: "Bundle" }),
                t.jsx("span", {
                  className: ["text-emerald-600", l].join(" "),
                  children: "ist",
                }),
              ],
            }),
          }),
      ],
    });
  },
  ga = ks,
  ba = Cs,
  fa = u.forwardRef(({ className: e, inset: s, children: r, ...a }, l) =>
    t.jsxs(Nt, {
      ref: l,
      className: $(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        s && "pl-8",
        e,
      ),
      ...a,
      children: [r, t.jsx(Bs, { className: "ml-auto h-4 w-4" })],
    }),
  );
fa.displayName = Nt.displayName;
const va = u.forwardRef(({ className: e, ...s }, r) =>
  t.jsx(kt, {
    ref: r,
    className: $(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e,
    ),
    ...s,
  }),
);
va.displayName = kt.displayName;
const Zt = u.forwardRef(({ className: e, sideOffset: s = 4, ...r }, a) =>
  t.jsx(Ns, {
    children: t.jsx(Ct, {
      ref: a,
      sideOffset: s,
      className: $(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        e,
      ),
      ...r,
    }),
  }),
);
Zt.displayName = Ct.displayName;
const Xt = u.forwardRef(({ className: e, inset: s, ...r }, a) =>
  t.jsx(St, {
    ref: a,
    className: $(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      s && "pl-8",
      e,
    ),
    ...r,
  }),
);
Xt.displayName = St.displayName;
const ya = u.forwardRef(({ className: e, children: s, checked: r, ...a }, l) =>
  t.jsxs(_t, {
    ref: l,
    className: $(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e,
    ),
    checked: r,
    ...a,
    children: [
      t.jsx("span", {
        className:
          "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: t.jsx(Tt, { children: t.jsx(Ls, { className: "h-4 w-4" }) }),
      }),
      s,
    ],
  }),
);
ya.displayName = _t.displayName;
const wa = u.forwardRef(({ className: e, children: s, ...r }, a) =>
  t.jsxs(Mt, {
    ref: a,
    className: $(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e,
    ),
    ...r,
    children: [
      t.jsx("span", {
        className:
          "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: t.jsx(Tt, {
          children: t.jsx(Ds, { className: "h-2 w-2 fill-current" }),
        }),
      }),
      s,
    ],
  }),
);
wa.displayName = Mt.displayName;
const ja = u.forwardRef(({ className: e, inset: s, ...r }, a) =>
  t.jsx(Et, {
    ref: a,
    className: $("px-2 py-1.5 text-sm font-semibold", s && "pl-8", e),
    ...r,
  }),
);
ja.displayName = Et.displayName;
const Na = u.forwardRef(({ className: e, ...s }, r) =>
  t.jsx(At, { ref: r, className: $("-mx-1 my-1 h-px bg-muted", e), ...s }),
);
Na.displayName = At.displayName;
const Ge = "bundleist_language_mode",
  pt = (e) => {
    const s = (e || "en").toLowerCase();
    return s.startsWith("tr")
      ? "tr"
      : s.startsWith("fr")
        ? "fr"
        : s.startsWith("ar")
          ? "ar"
          : "en";
  },
  xt = () => {
    const { i18n: e } = ee(),
      s = [
        { code: "auto", name: "Browser default", short: "AUTO" },
        { code: "en", name: "English", short: "EN" },
        { code: "tr", name: "Turkish", short: "TR" },
        { code: "fr", name: "French", short: "FR" },
        { code: "ar", name: "Arabic", short: "AR" },
      ],
      r = pt(e.resolvedLanguage || e.language || "en"),
      l =
        (typeof window < "u" ? window.localStorage.getItem(Ge) : "auto") !==
        "manual",
      n = pt(
        e.resolvedLanguage ||
          e.language ||
          (typeof navigator < "u" ? navigator.language : "en"),
      ),
      i = l ? "auto" : r,
      d =
        i === "auto"
          ? {
              code: "auto",
              name: `Browser (${n.toUpperCase()})`,
              short: "AUTO",
            }
          : s.find((c) => c.code === i) || s[1],
      m = (c) => {
        if (c === "auto") {
          (typeof window < "u" &&
            (window.localStorage.setItem(Ge, "auto"),
            window.localStorage.removeItem("i18nextLng")),
            e.changeLanguage(n));
          return;
        }
        (typeof window < "u" && window.localStorage.setItem(Ge, "manual"),
          e.changeLanguage(c));
      };
    return t.jsxs(ga, {
      children: [
        t.jsx(ba, {
          asChild: !0,
          children: t.jsxs(ue, {
            variant: "ghost",
            size: "sm",
            className: "flex items-center gap-2",
            children: [
              t.jsx(Bt, { className: "h-4 w-4" }),
              t.jsxs("span", {
                className: "hidden sm:inline",
                children: [d.short, " ", d.name],
              }),
              t.jsx("span", { className: "sm:hidden", children: d.short }),
            ],
          }),
        }),
        t.jsx(Zt, {
          align: "end",
          children: s.map((c) =>
            t.jsxs(
              Xt,
              {
                onClick: () => m(c.code),
                className: `flex items-center gap-2 ${i === c.code ? "bg-blue-50 text-blue-700" : ""}`,
                children: [
                  t.jsx("span", { children: c.short }),
                  t.jsx("span", { children: c.name }),
                ],
              },
              c.code,
            ),
          ),
        }),
      ],
    });
  },
  ka = () => {
    const { user: e } = Qt(),
      { t: s } = ee(),
      [r, a] = u.useState(!1),
      [l, n] = u.useState(!1),
      i = gs();
    u.useEffect(() => {
      const g = () => {
        a(window.scrollY > 10);
      };
      return (
        window.addEventListener("scroll", g),
        () => window.removeEventListener("scroll", g)
      );
    }, []);
    const d = (g) => {
        (n(!1),
          window.location.pathname === "/"
            ? setTimeout(() => {
                const o = document.getElementById(g);
                o && o.scrollIntoView({ behavior: "smooth" });
              }, 100)
            : i(`/#${g}`));
      },
      m = (g) => {
        (n(!1), i(g));
      },
      c = () => "/dashboard/",
      h = u.useMemo(
        () => [
          {
            id: "features",
            label: s("features"),
            onClick: () => d("features"),
          },
          {
            id: "how-it-works",
            label: s("howItWorks"),
            onClick: () => d("how-it-works"),
          },
          { id: "pricing", label: s("pricing"), onClick: () => d("pricing") },
          { id: "blog", label: s("blog"), onClick: () => m("/blog") },
        ],
        [s],
      );
    return t.jsxs("header", {
      className: "fixed top-0 left-0 right-0 z-50",
      children: [
        t.jsx("div", {
          className: [
            "transition-all duration-300",
            r
              ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-900/10"
              : "bg-white/20 backdrop-blur",
          ].join(" "),
          children: t.jsx("div", {
            className: "mx-auto max-w-7xl px-4 sm:px-6",
            children: t.jsxs("nav", {
              className: [
                "flex items-center justify-between",
                r ? "py-2.5" : "py-4",
              ].join(" "),
              children: [
                t.jsx(me, {
                  to: "/",
                  className: "flex items-center gap-2",
                  children: t.jsx(Pe, {
                    size: "sm",
                    showText: !0,
                    markClassName: "w-9 h-9 sm:w-10 sm:h-10",
                    textClassName: "text-base sm:text-lg",
                  }),
                }),
                t.jsx("div", {
                  className:
                    "hidden md:flex items-center gap-1 rounded-full border border-white/30 bg-white/30 backdrop-blur px-2 py-1",
                  children: h.map((g) =>
                    t.jsx(
                      "button",
                      {
                        onClick: g.onClick,
                        className:
                          "px-3 py-2 text-sm font-semibold text-slate-800 hover:text-emerald-700 hover:bg-white/70 rounded-full transition-colors",
                        children: g.label,
                      },
                      g.id,
                    ),
                  ),
                }),
                t.jsxs("div", {
                  className: "hidden md:flex items-center gap-3",
                  children: [
                    t.jsx(xt, {}),
                    t.jsx(ue, {
                      className:
                        "bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5",
                      onClick: () => {
                        window.location.href = c();
                      },
                      children: s(e ? "dashboardHome" : "getStarted"),
                    }),
                  ],
                }),
                t.jsx("button", {
                  onClick: () => n((g) => !g),
                  className:
                    "md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/40 bg-white/30 backdrop-blur hover:bg-white/60 transition-colors",
                  "aria-label": s(l ? "closeMenu" : "openMenu"),
                  "aria-expanded": l,
                  children: l
                    ? t.jsx(Ke, { className: "w-5 h-5 text-slate-800" })
                    : t.jsx(Hs, { className: "w-5 h-5 text-slate-800" }),
                }),
              ],
            }),
          }),
        }),
        l &&
          t.jsxs("div", {
            className: "md:hidden fixed inset-0 z-[60]",
            children: [
              t.jsx("div", {
                className: "absolute inset-0 bg-slate-900/30",
                onClick: () => n(!1),
              }),
              t.jsxs("div", {
                className:
                  "absolute top-3 left-3 right-3 rounded-3xl border border-white/30 bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden",
                children: [
                  t.jsxs("div", {
                    className:
                      "px-5 py-4 flex items-center justify-between border-b border-slate-900/10",
                    children: [
                      t.jsx(Pe, {
                        size: "sm",
                        showText: !0,
                        markClassName: "w-9 h-9",
                        textClassName: "text-base",
                      }),
                      t.jsx("button", {
                        type: "button",
                        className:
                          "h-10 w-10 rounded-full border border-slate-900/10 bg-white hover:bg-slate-50 inline-flex items-center justify-center",
                        onClick: () => n(!1),
                        "aria-label": s("closeMenu"),
                        children: t.jsx(Ke, {
                          className: "w-5 h-5 text-slate-800",
                        }),
                      }),
                    ],
                  }),
                  t.jsxs("div", {
                    className: "p-4",
                    children: [
                      t.jsx("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: h.map((g) =>
                          t.jsx(
                            "button",
                            {
                              onClick: g.onClick,
                              className:
                                "text-left px-4 py-3 rounded-2xl border border-slate-900/10 bg-white hover:bg-slate-50 text-sm font-semibold text-slate-900",
                              children: g.label,
                            },
                            g.id,
                          ),
                        ),
                      }),
                      t.jsxs("div", {
                        className:
                          "mt-4 pt-4 border-t border-slate-900/10 flex items-center justify-between",
                        children: [
                          t.jsx(xt, {}),
                          t.jsx(ue, {
                            className:
                              "bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5",
                            onClick: () => {
                              window.location.href = c();
                            },
                            children: s(e ? "dashboardHome" : "getStarted"),
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
    });
  },
  Ca = () => {
    const { t: e } = ee(),
      [s, r] = u.useState(!1);
    u.useEffect(() => {
      const n = setTimeout(() => r(!0), 80);
      return () => clearTimeout(n);
    }, []);
    const a = u.useMemo(() => "/dashboard/", []),
      l = u.useMemo(
        () =>
          (e("heroDescription") || "")
            .split(
              `
`,
            )
            .map((i) => i.trim())
            .filter(Boolean),
        [e],
      );
    return t.jsxs("section", {
      className:
        "pt-20 pb-10 sm:pt-28 sm:pb-14 lg:pt-32 overflow-hidden relative bg-gradient-to-br from-slate-50 via-white to-blue-50",
      children: [
        t.jsx("div", {
          className:
            "absolute inset-0 opacity-60 pointer-events-none bg-[radial-gradient(900px_circle_at_30%_20%,rgba(59,130,246,0.14),transparent_55%),radial-gradient(700px_circle_at_70%_40%,rgba(52,211,153,0.10),transparent_55%)]",
        }),
        t.jsx("div", {
          className:
            "absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-blue-200/70 to-lavender-200/60 rounded-full blur-3xl opacity-30 animate-float pointer-events-none",
        }),
        t.jsx("div", {
          className:
            "absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-100/70 to-blue-100/70 rounded-full blur-3xl opacity-20 animate-float pointer-events-none",
          style: { animationDelay: "2s" },
        }),
        t.jsx("div", {
          className: "mx-auto max-w-7xl px-4 sm:px-6 relative",
          children: t.jsxs("div", {
            className:
              "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center",
            children: [
              t.jsxs("div", {
                className: [
                  "transition-all duration-700",
                  s ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" "),
                children: [
                  t.jsxs("div", {
                    className:
                      "inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-blue-900 shadow-sm",
                    children: [
                      t.jsx(Js, { className: "h-4 w-4 text-blue-700" }),
                      t.jsx("span", {
                        children: e("smartExportConsolidation"),
                      }),
                    ],
                  }),
                  t.jsx("h1", {
                    className:
                      "mt-4 sm:mt-6 text-3xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-slate-950",
                    children: t.jsx("span", {
                      className:
                        "block bg-gradient-to-r from-slate-950 via-blue-900 to-indigo-900 bg-clip-text text-transparent",
                      children: e("heroTitle"),
                    }),
                  }),
                  t.jsx("div", {
                    className: "mt-4 sm:mt-6 max-w-xl",
                    children: t.jsx("div", {
                      className:
                        "pl-4 sm:pl-5 border-l border-slate-900/10 space-y-2",
                      children: l.map((n, i) => {
                        const d = i <= 2 ? "" : "hidden sm:block",
                          m =
                            i === 0
                              ? "text-[17px] sm:text-xl font-semibold text-slate-800 leading-snug"
                              : i === 2
                                ? "text-[13px] sm:text-sm text-slate-500 leading-relaxed"
                                : "text-base sm:text-lg text-slate-600 leading-relaxed";
                        return t.jsx(
                          "p",
                          { className: [d, m].join(" ").trim(), children: n },
                          i,
                        );
                      }),
                    }),
                  }),
                  t.jsx("div", {
                    className:
                      "mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm",
                    children: [
                      {
                        label: e("consolidateEveryPurchase"),
                        tone: "text-emerald-800 bg-emerald-50 border-emerald-200",
                      },
                      {
                        label: e("onePaymentContract"),
                        tone: "text-blue-800 bg-blue-50 border-blue-200",
                      },
                      {
                        label: e("maximumEfficiencyStreamlined"),
                        tone: "text-indigo-800 bg-indigo-50 border-indigo-200",
                      },
                    ].map((n, i) =>
                      t.jsx(
                        "div",
                        {
                          className: [
                            "rounded-2xl border px-3 py-2.5 sm:px-4 sm:py-3 shadow-sm",
                            i === 2 ? "hidden sm:block" : "",
                            n.tone,
                          ].join(" "),
                          children: t.jsxs("div", {
                            className: "flex items-start gap-2",
                            children: [
                              t.jsx(Se, {
                                className: "h-4 w-4 mt-0.5 flex-none",
                              }),
                              t.jsx("span", {
                                className: "font-semibold leading-snug",
                                children: n.label,
                              }),
                            ],
                          }),
                        },
                        i,
                      ),
                    ),
                  }),
                  t.jsxs("div", {
                    className: "mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3",
                    children: [
                      t.jsx(ue, {
                        asChild: !0,
                        className:
                          "bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 h-10 sm:h-11",
                        children: t.jsxs("a", {
                          href: "/contact",
                          children: [
                            t.jsx(Gs, { className: "mr-2 h-4 w-4" }),
                            e("talkToOurTeam"),
                          ],
                        }),
                      }),
                      t.jsx(ue, {
                        asChild: !0,
                        variant: "outline",
                        className:
                          "rounded-full px-6 h-10 sm:h-11 bg-white/70 hover:bg-white border-slate-900/15",
                        children: t.jsx("a", {
                          href: a,
                          children: e("getStarted"),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              t.jsxs("div", {
                className: [
                  "relative transition-all duration-700 mx-auto w-full max-w-[560px] lg:mx-0 lg:justify-self-end lg:max-w-[560px] xl:max-w-[620px] 2xl:max-w-[680px] lg:scale-[0.94] xl:scale-[0.97] 2xl:scale-100 origin-top",
                  s ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                ].join(" "),
                children: [
                  t.jsx("div", {
                    className:
                      "absolute -inset-5 sm:-inset-10 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(59,130,246,0.25),transparent),radial-gradient(closest-side,rgba(52,211,153,0.20),transparent)] blur-2xl opacity-65",
                  }),
                  t.jsx("div", {
                    className:
                      "relative rounded-[2rem] p-[1px] bg-[linear-gradient(110deg,rgba(16,185,129,0.55),rgba(59,130,246,0.55),rgba(99,102,241,0.45))] animate-gradient-x shadow-[0_18px_60px_-42px_rgba(15,23,42,0.55)] sm:shadow-[0_28px_90px_-40px_rgba(15,23,42,0.55)]",
                    children: t.jsxs("div", {
                      className:
                        "relative rounded-[2rem] border border-slate-900/10 bg-white/75 backdrop-blur-xl overflow-hidden",
                      children: [
                        t.jsxs("div", {
                          className:
                            "flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-900/10 bg-white/70",
                          children: [
                            t.jsxs("div", {
                              className: "flex items-center gap-3 min-w-0",
                              children: [
                                t.jsxs("div", {
                                  className:
                                    "hidden sm:flex items-center gap-1.5",
                                  children: [
                                    t.jsx("span", {
                                      className:
                                        "h-2.5 w-2.5 rounded-full bg-red-400",
                                    }),
                                    t.jsx("span", {
                                      className:
                                        "h-2.5 w-2.5 rounded-full bg-yellow-400",
                                    }),
                                    t.jsx("span", {
                                      className:
                                        "h-2.5 w-2.5 rounded-full bg-green-400",
                                    }),
                                  ],
                                }),
                                t.jsx(Pe, {
                                  size: "xxs",
                                  showText: !1,
                                  markClassName: "w-8 h-8",
                                }),
                                t.jsx("div", {
                                  className:
                                    "truncate text-sm font-semibold text-slate-950",
                                  children: e("heroOpsConsole"),
                                }),
                                t.jsxs("div", {
                                  className:
                                    "hidden sm:flex items-center gap-2 ml-2 px-3 h-8 rounded-full border border-slate-900/10 bg-white text-xs text-slate-700",
                                  children: [
                                    t.jsx(Dt, {
                                      className: "h-3.5 w-3.5 text-slate-400",
                                    }),
                                    e("heroSearchId"),
                                  ],
                                }),
                              ],
                            }),
                            t.jsxs("div", {
                              className:
                                "flex items-center gap-2 text-slate-700",
                              children: [
                                t.jsxs("div", {
                                  className: "relative",
                                  children: [
                                    t.jsx(Ps, { className: "h-4 w-4" }),
                                    t.jsx("span", {
                                      className:
                                        "absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500",
                                    }),
                                  ],
                                }),
                                t.jsx("div", {
                                  className:
                                    "h-7 w-7 rounded-full bg-slate-950 text-white text-xs font-bold grid place-items-center",
                                  children: "JD",
                                }),
                              ],
                            }),
                          ],
                        }),
                        t.jsxs("div", {
                          className: "grid grid-cols-1 sm:grid-cols-[56px_1fr]",
                          children: [
                            t.jsx("div", {
                              className:
                                "hidden sm:block border-r border-slate-900/10 bg-white/50 p-2",
                              children: t.jsx("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                  {
                                    icon: $e,
                                    active: !0,
                                    title: e("heroNavRelationships"),
                                  },
                                  {
                                    icon: Ye,
                                    active: !1,
                                    title: e("heroNavShipments"),
                                  },
                                  {
                                    icon: Ue,
                                    active: !1,
                                    title: e("heroNavLedger"),
                                  },
                                ].map((n, i) =>
                                  t.jsx(
                                    "div",
                                    {
                                      title: n.title,
                                      className: [
                                        "h-10 w-10 rounded-xl grid place-items-center border shadow-sm",
                                        n.active
                                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                          : "bg-white border-slate-900/10 text-slate-700",
                                      ].join(" "),
                                      children: t.jsx(n.icon, {
                                        className: "h-4 w-4",
                                      }),
                                    },
                                    i,
                                  ),
                                ),
                              }),
                            }),
                            t.jsxs("div", {
                              className: "p-3 sm:p-5",
                              role: "img",
                              "aria-label": e("dashboardAlt"),
                              children: [
                                t.jsxs("div", {
                                  className:
                                    "flex items-start justify-between gap-3",
                                  children: [
                                    t.jsxs("div", {
                                      className: "min-w-0",
                                      children: [
                                        t.jsx("div", {
                                          className:
                                            "text-[11px] sm:text-xs font-semibold text-slate-600",
                                          children: e("dashboardQuickSummary"),
                                        }),
                                        t.jsx("div", {
                                          className:
                                            "mt-1 text-base sm:text-xl font-bold text-slate-950",
                                          children: e("heroMockTitle"),
                                        }),
                                        t.jsx("div", {
                                          className:
                                            "mt-0.5 text-[11px] sm:text-sm text-slate-700",
                                          children: e("heroMockSubtitle"),
                                        }),
                                      ],
                                    }),
                                    t.jsx("div", {
                                      className:
                                        "hidden sm:flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-800",
                                      children: e("dashboardGrowth"),
                                    }),
                                  ],
                                }),
                                t.jsxs("div", {
                                  className:
                                    "mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-3",
                                  children: [
                                    t.jsxs("div", {
                                      className:
                                        "rounded-xl sm:rounded-2xl border border-slate-900/10 bg-white p-2.5 sm:p-3 shadow-sm",
                                      children: [
                                        t.jsxs("div", {
                                          className:
                                            "flex items-center justify-between text-[11px] sm:text-xs font-semibold text-slate-600",
                                          children: [
                                            t.jsx("span", {
                                              children: e("dashboardOrders"),
                                            }),
                                            t.jsx(Us, {
                                              className:
                                                "h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400",
                                            }),
                                          ],
                                        }),
                                        t.jsx("div", {
                                          className:
                                            "mt-0.5 text-base sm:text-lg font-extrabold text-slate-950",
                                          children: "12",
                                        }),
                                        t.jsx("div", {
                                          className:
                                            "mt-0.5 text-[10px] sm:text-[11px] text-slate-600",
                                          children: e("heroOrdersMeta"),
                                        }),
                                      ],
                                    }),
                                    t.jsxs("div", {
                                      className:
                                        "rounded-xl sm:rounded-2xl border border-slate-900/10 bg-white p-2.5 sm:p-3 shadow-sm",
                                      children: [
                                        t.jsxs("div", {
                                          className:
                                            "flex items-center justify-between text-[11px] sm:text-xs font-semibold text-slate-600",
                                          children: [
                                            t.jsx("span", {
                                              children: e("heroCustomers"),
                                            }),
                                            t.jsx(Ie, {
                                              className:
                                                "h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400",
                                            }),
                                          ],
                                        }),
                                        t.jsx("div", {
                                          className:
                                            "mt-0.5 text-base sm:text-lg font-extrabold text-slate-950",
                                          children: "4",
                                        }),
                                        t.jsx("div", {
                                          className:
                                            "mt-0.5 text-[10px] sm:text-[11px] text-slate-600",
                                          children: e("heroCustomersMeta"),
                                        }),
                                      ],
                                    }),
                                    t.jsxs("div", {
                                      className:
                                        "hidden sm:block rounded-2xl border border-slate-900/10 bg-white p-3 shadow-sm",
                                      children: [
                                        t.jsxs("div", {
                                          className:
                                            "flex items-center justify-between text-xs font-semibold text-slate-600",
                                          children: [
                                            t.jsx("span", {
                                              children: e(
                                                "dashboardConsolidations",
                                              ),
                                            }),
                                            t.jsx($e, {
                                              className:
                                                "h-4 w-4 text-slate-400",
                                            }),
                                          ],
                                        }),
                                        t.jsx("div", {
                                          className:
                                            "mt-1 text-lg font-extrabold text-slate-950",
                                          children: "3",
                                        }),
                                        t.jsx("div", {
                                          className:
                                            "mt-1 text-[11px] text-slate-600",
                                          children: e("heroConsolidationMeta"),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                t.jsxs("div", {
                                  className:
                                    "mt-3 sm:mt-4 rounded-2xl sm:rounded-3xl border border-slate-900/10 bg-white shadow-sm overflow-hidden",
                                  children: [
                                    t.jsx("div", {
                                      className:
                                        "px-3 sm:px-4 py-2.5 sm:py-3 border-b border-slate-900/10 bg-slate-50/60",
                                      children: t.jsxs("div", {
                                        className:
                                          "flex flex-wrap items-center justify-between gap-2",
                                        children: [
                                          t.jsx("div", {
                                            className:
                                              "text-xs sm:text-sm font-bold text-slate-950",
                                            children: e("heroRelationshipFlow"),
                                          }),
                                          t.jsxs("div", {
                                            className:
                                              "flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold text-slate-700",
                                            children: [
                                              t.jsx("span", {
                                                className:
                                                  "px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800",
                                                children: e(
                                                  "heroVolumeProportional",
                                                ),
                                              }),
                                              t.jsx("span", {
                                                className:
                                                  "px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800",
                                                children: e(
                                                  "heroNeedsActualCost",
                                                ),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    }),
                                    t.jsxs("div", {
                                      className: "p-2.5 sm:p-4",
                                      children: [
                                        t.jsxs("div", {
                                          className:
                                            "grid grid-cols-2 gap-1.5 sm:hidden text-[10px] font-semibold",
                                          children: [
                                            t.jsxs("div", {
                                              className:
                                                "rounded-xl border border-slate-900/10 bg-slate-50 px-2 py-1.5 text-slate-900",
                                              children: [
                                                t.jsx("div", {
                                                  className: "font-bold",
                                                  children: e("heroOrderIdA"),
                                                }),
                                                t.jsx("div", {
                                                  className: "text-slate-600",
                                                  children:
                                                    e("heroOrderVolumeA"),
                                                }),
                                              ],
                                            }),
                                            t.jsxs("div", {
                                              className:
                                                "rounded-xl border border-slate-900/10 bg-slate-50 px-2 py-1.5 text-slate-900",
                                              children: [
                                                t.jsx("div", {
                                                  className: "font-bold",
                                                  children: e("heroOrderIdB"),
                                                }),
                                                t.jsx("div", {
                                                  className: "text-slate-600",
                                                  children:
                                                    e("heroOrderVolumeB"),
                                                }),
                                              ],
                                            }),
                                            t.jsxs("div", {
                                              className:
                                                "rounded-xl border border-blue-200 bg-blue-50 px-2 py-1.5 text-blue-900",
                                              children: [
                                                t.jsx("div", {
                                                  className: "font-bold",
                                                  children: e(
                                                    "heroConsolidationCode",
                                                  ),
                                                }),
                                                t.jsx("div", {
                                                  className: "text-blue-700",
                                                  children:
                                                    e("heroCustomersCount"),
                                                }),
                                              ],
                                            }),
                                            t.jsxs("div", {
                                              className:
                                                "rounded-xl border border-emerald-200 bg-emerald-50 px-2 py-1.5 text-emerald-900",
                                              children: [
                                                t.jsx("div", {
                                                  className: "font-bold",
                                                  children:
                                                    e("heroShipmentCode"),
                                                }),
                                                t.jsx("div", {
                                                  className: "text-emerald-700",
                                                  children: e(
                                                    "heroShipmentInTransit",
                                                  ),
                                                }),
                                              ],
                                            }),
                                            t.jsx("div", {
                                              className:
                                                "col-span-2 rounded-xl border border-slate-900/10 bg-white px-2 py-1.5 text-slate-900",
                                              children: t.jsx("div", {
                                                className: "font-bold",
                                                children: e("heroLedgerNet"),
                                              }),
                                            }),
                                          ],
                                        }),
                                        t.jsxs("div", {
                                          className:
                                            "hidden sm:flex flex-wrap items-center gap-2 text-[11px] sm:text-sm min-w-0",
                                          children: [
                                            t.jsxs("span", {
                                              className:
                                                "inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl bg-slate-50 border border-slate-900/10 font-semibold text-slate-900",
                                              children: [
                                                t.jsx(Ie, {
                                                  className:
                                                    "h-4 w-4 text-slate-600",
                                                }),
                                                e("heroOrderIdA"),
                                                t.jsx("span", {
                                                  className:
                                                    "text-slate-600 font-semibold",
                                                  children:
                                                    e("heroOrderVolumeA"),
                                                }),
                                              ],
                                            }),
                                            t.jsxs("span", {
                                              className:
                                                "inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl bg-slate-50 border border-slate-900/10 font-semibold text-slate-900",
                                              children: [
                                                t.jsx(Ie, {
                                                  className:
                                                    "h-4 w-4 text-slate-600",
                                                }),
                                                e("heroOrderIdB"),
                                                t.jsx("span", {
                                                  className:
                                                    "text-slate-600 font-semibold",
                                                  children:
                                                    e("heroOrderVolumeB"),
                                                }),
                                              ],
                                            }),
                                            t.jsx(ze, {
                                              className:
                                                "hidden sm:block h-4 w-4 text-slate-400",
                                            }),
                                            t.jsxs("span", {
                                              className:
                                                "inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl bg-blue-50 border border-blue-200 font-semibold text-blue-900",
                                              children: [
                                                t.jsx($e, {
                                                  className:
                                                    "h-4 w-4 text-blue-700",
                                                }),
                                                e("heroConsolidationCode"),
                                                t.jsx("span", {
                                                  className:
                                                    "text-blue-800 font-semibold",
                                                  children:
                                                    e("heroCustomersCount"),
                                                }),
                                              ],
                                            }),
                                            t.jsx(ze, {
                                              className:
                                                "hidden sm:block h-4 w-4 text-slate-400",
                                            }),
                                            t.jsxs("span", {
                                              className:
                                                "inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl bg-emerald-50 border border-emerald-200 font-semibold text-emerald-900",
                                              children: [
                                                t.jsx(Ye, {
                                                  className:
                                                    "h-4 w-4 text-emerald-700",
                                                }),
                                                e("heroShipmentCode"),
                                                " (",
                                                e("heroShipmentInTransit"),
                                                ")",
                                              ],
                                            }),
                                            t.jsx(ze, {
                                              className:
                                                "hidden sm:block h-4 w-4 text-slate-400",
                                            }),
                                            t.jsxs("span", {
                                              className:
                                                "inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl bg-white border border-slate-900/10 font-semibold text-slate-900",
                                              children: [
                                                t.jsx(Ue, {
                                                  className:
                                                    "h-4 w-4 text-slate-700",
                                                }),
                                                e("heroLedgerNet"),
                                              ],
                                            }),
                                          ],
                                        }),
                                        t.jsxs("div", {
                                          className:
                                            "mt-3 hidden sm:grid grid-cols-2 gap-2 text-xs",
                                          children: [
                                            t.jsxs("div", {
                                              className:
                                                "rounded-2xl border border-slate-900/10 bg-white px-3 py-2",
                                              children: [
                                                t.jsx("div", {
                                                  className:
                                                    "text-slate-600 font-semibold",
                                                  children: e("heroCapacity"),
                                                }),
                                                t.jsxs("div", {
                                                  className:
                                                    "mt-0.5 flex items-center gap-2",
                                                  children: [
                                                    t.jsx("div", {
                                                      className:
                                                        "h-2 w-full rounded-full bg-slate-100 overflow-hidden",
                                                      children: t.jsx("div", {
                                                        className:
                                                          "h-full w-[42%] bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full",
                                                      }),
                                                    }),
                                                    t.jsx("div", {
                                                      className:
                                                        "font-extrabold text-slate-950",
                                                      children: "42%",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            t.jsxs("div", {
                                              className:
                                                "rounded-2xl border border-slate-900/10 bg-white px-3 py-2",
                                              children: [
                                                t.jsx("div", {
                                                  className:
                                                    "text-slate-600 font-semibold",
                                                  children: e("heroExceptions"),
                                                }),
                                                t.jsxs("div", {
                                                  className:
                                                    "mt-0.5 flex items-center gap-2",
                                                  children: [
                                                    t.jsx(dt, {
                                                      className:
                                                        "h-4 w-4 text-amber-600",
                                                    }),
                                                    t.jsx("div", {
                                                      className:
                                                        "font-extrabold text-slate-950",
                                                      children: "2",
                                                    }),
                                                    t.jsx("div", {
                                                      className:
                                                        "text-slate-600 font-semibold",
                                                      children:
                                                        e("heroNeedAction"),
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        t.jsx("div", {
                                          className: "mt-3 hidden sm:block",
                                          children: t.jsxs("div", {
                                            className:
                                              "grid grid-cols-1 sm:grid-cols-[1fr_92px] gap-2 text-xs",
                                            children: [
                                              t.jsxs("div", {
                                                className:
                                                  "rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900 font-semibold flex items-center gap-2",
                                                children: [
                                                  t.jsx(dt, {
                                                    className: "h-4 w-4",
                                                  }),
                                                  e(
                                                    "heroMissingActualShippingCost",
                                                  ),
                                                ],
                                              }),
                                              t.jsx("div", {
                                                className:
                                                  "hidden sm:block rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-slate-700 font-semibold text-right",
                                                children: "3d",
                                              }),
                                              t.jsxs("div", {
                                                className:
                                                  "rounded-2xl border border-blue-200 bg-blue-50 px-3 py-2 text-blue-900 font-semibold flex items-center gap-2",
                                                children: [
                                                  t.jsx(Se, {
                                                    className:
                                                      "h-4 w-4 text-blue-700",
                                                  }),
                                                  e(
                                                    "heroDistributionReadyAfterCostSet",
                                                  ),
                                                ],
                                              }),
                                              t.jsx("div", {
                                                className:
                                                  "hidden sm:block rounded-2xl border border-slate-900/10 bg-white px-3 py-2 text-slate-700 font-semibold text-right",
                                                children: "1h",
                                              }),
                                            ],
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
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  },
  Sa = () => {
    const { t: e, i18n: s } = ee(),
      r = u.useRef(null),
      [a, l] = u.useState(!1),
      n = u.useMemo(
        () => [
          {
            icon: Ie,
            title: e("consolidatedShipping"),
            desc: e("consolidatedShippingDesc"),
            tone: "from-blue-50 to-indigo-50 border-blue-200/70",
            iconTone: "bg-blue-600",
          },
          {
            icon: Ye,
            title: e("singleBillOfLadingTitle"),
            desc: e("singleBillOfLadingDesc"),
            tone: "from-emerald-50 to-blue-50 border-emerald-200/70",
            iconTone: "bg-emerald-600",
          },
          {
            icon: Lt,
            title: e("centralizedPayments"),
            desc: e("centralizedPaymentsDesc"),
            tone: "from-violet-50 to-pink-50 border-violet-200/70",
            iconTone: "bg-violet-600",
          },
          {
            icon: Re,
            title: e("simplifiedDocumentation"),
            desc: e("simplifiedDocumentationDesc"),
            tone: "from-amber-50 to-orange-50 border-amber-200/70",
            iconTone: "bg-amber-600",
          },
          {
            icon: Bt,
            title: e("globalCompliance"),
            desc: e("globalComplianceDesc"),
            tone: "from-cyan-50 to-sky-50 border-cyan-200/70",
            iconTone: "bg-cyan-600",
          },
          {
            icon: Ot,
            title: e("deliveryGuarantee"),
            desc: e("deliveryGuaranteeDesc"),
            tone: "from-indigo-50 to-slate-50 border-indigo-200/70",
            iconTone: "bg-indigo-600",
          },
        ],
        [e],
      ),
      i = u.useMemo(
        () => [
          e("singleConsolidatedShipment"),
          e("securePaymentHandling"),
          e("fasterProcess"),
        ],
        [e],
      ),
      d = u.useMemo(
        () => [e("fasterDocumentation"), e("costReduction"), e("timeSavings")],
        [e],
      );
    return (
      u.useEffect(() => {
        const m = r.current;
        if (!m) return;
        const c = new IntersectionObserver(
          (h) => {
            h[0].isIntersecting && l(!0);
          },
          { threshold: 0.12 },
        );
        return (c.observe(m), () => c.disconnect());
      }, []),
      t.jsxs(
        "section",
        {
          id: "features",
          className: "py-12 sm:py-16 bg-slate-50 relative overflow-hidden",
          children: [
            t.jsx("div", {
              className:
                "absolute inset-0 pointer-events-none bg-[radial-gradient(780px_circle_at_10%_15%,rgba(59,130,246,0.09),transparent_55%),radial-gradient(720px_circle_at_80%_5%,rgba(16,185,129,0.08),transparent_55%)]",
            }),
            t.jsxs("div", {
              className: "mx-auto max-w-7xl px-4 sm:px-6 relative",
              children: [
                t.jsxs("div", {
                  ref: r,
                  className: [
                    "max-w-3xl mx-auto text-center transition-all duration-700",
                    a ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                  ].join(" "),
                  children: [
                    t.jsx("div", {
                      className:
                        "inline-flex items-center rounded-full border border-slate-900/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-600 shadow-sm",
                      children: e("features"),
                    }),
                    t.jsxs("div", {
                      className: "mt-4 md:mt-5 text-center",
                      children: [
                        t.jsx("h2", {
                          className:
                            "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-950 text-balance",
                          children: t.jsx("span", {
                            className:
                              "bg-gradient-to-r from-slate-950 via-blue-900 to-indigo-900 bg-clip-text text-transparent",
                            children: e("featuresHeadline"),
                          }),
                        }),
                        t.jsx("p", {
                          className:
                            "mt-4 text-sm sm:text-base leading-relaxed text-slate-700 max-w-3xl mx-auto",
                          children: e("featuresSubtext"),
                        }),
                        t.jsx("div", {
                          className: "mt-5 flex flex-wrap justify-center gap-2",
                          children: d.map((m, c) =>
                            t.jsx(
                              "div",
                              {
                                className:
                                  "px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-sm",
                                children: m,
                              },
                              c,
                            ),
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
                t.jsx("div", {
                  className:
                    "mt-8 rounded-[2rem] border border-slate-200 bg-white p-4 sm:p-6 shadow-sm",
                  children: t.jsxs("div", {
                    className: "grid gap-4 lg:grid-cols-[1fr_1.8fr]",
                    children: [
                      t.jsx("div", {
                        className: [
                          "transition-all duration-700",
                          a
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-3",
                        ].join(" "),
                        children: t.jsxs("div", {
                          className:
                            "h-full rounded-[1.5rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-blue-50 p-5 sm:p-6",
                          children: [
                            t.jsx("div", {
                              className:
                                "inline-flex items-center rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700",
                              children: e("importConsolidation"),
                            }),
                            t.jsx("p", {
                              className:
                                "mt-3 text-sm leading-relaxed text-slate-700",
                              children: e("importConsolidationDesc"),
                            }),
                            t.jsx("div", {
                              className: "mt-4 space-y-2.5",
                              children: i.map((m, c) =>
                                t.jsxs(
                                  "div",
                                  {
                                    className:
                                      "flex items-start gap-2.5 rounded-xl border border-white/80 bg-white/70 px-3 py-2.5",
                                    children: [
                                      t.jsx("div", {
                                        className:
                                          "h-5 w-5 rounded-full bg-emerald-600 text-[11px] font-bold text-white grid place-items-center mt-0.5 flex-none",
                                        children: c + 1,
                                      }),
                                      t.jsx("div", {
                                        className:
                                          "text-sm font-semibold leading-relaxed text-slate-800",
                                        children: m,
                                      }),
                                    ],
                                  },
                                  c,
                                ),
                              ),
                            }),
                          ],
                        }),
                      }),
                      t.jsx("div", {
                        className:
                          "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4",
                        children: n.map((m, c) => {
                          const h = m.icon,
                            g = Math.min(6, c) * 60;
                          return t.jsxs(
                            "div",
                            {
                              className: [
                                "rounded-[1.25rem] border bg-gradient-to-br shadow-sm hover:shadow-md transition-all",
                                "p-4 sm:p-5",
                                m.tone,
                                a
                                  ? "opacity-100 translate-y-0"
                                  : "opacity-0 translate-y-3",
                              ].join(" "),
                              style: { transitionDelay: `${g}ms` },
                              children: [
                                t.jsxs("div", {
                                  className:
                                    "flex items-start justify-between gap-3",
                                  children: [
                                    t.jsx("div", {
                                      className: [
                                        "h-10 w-10 rounded-xl grid place-items-center shadow-sm text-white",
                                        m.iconTone,
                                      ].join(" "),
                                      children: t.jsx(h, {
                                        className: "h-5 w-5",
                                      }),
                                    }),
                                    t.jsx("div", {
                                      className:
                                        "px-2 py-0.5 rounded-full border border-white/70 bg-white/70 text-[11px] font-bold text-slate-600",
                                      children: c + 1,
                                    }),
                                  ],
                                }),
                                t.jsx("div", {
                                  className:
                                    "mt-3 text-sm sm:text-base font-extrabold text-slate-950",
                                  children: m.title,
                                }),
                                t.jsx("div", {
                                  className:
                                    "mt-1.5 text-sm text-slate-700 leading-relaxed line-clamp-3 sm:line-clamp-none",
                                  children: m.desc,
                                }),
                              ],
                            },
                            c,
                          );
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        },
        `features-${s.language}`,
      )
    );
  },
  _a = () => {
    const { t: e, i18n: s } = ee(),
      r = u.useRef(null),
      [a, l] = u.useState(!1),
      n = u.useMemo(
        () => [
          {
            icon: Dt,
            title: e("findSuppliers"),
            description: e("findSuppliersDesc"),
            tone: "border-blue-200/70 bg-gradient-to-br from-blue-50 to-indigo-50",
            iconTone: "bg-blue-600",
          },
          {
            icon: Ot,
            title: e("supplierVerification"),
            description: e("supplierVerificationDesc"),
            tone: "border-emerald-200/70 bg-gradient-to-br from-emerald-50 to-blue-50",
            iconTone: "bg-emerald-600",
          },
          {
            icon: Lt,
            title: e("paymentProcessing"),
            description: e("paymentProcessingDesc"),
            tone: "border-violet-200/70 bg-gradient-to-br from-violet-50 to-pink-50",
            iconTone: "bg-violet-600",
          },
          {
            icon: Ws,
            title: e("orderConsolidation"),
            description: e("orderConsolidationDesc"),
            tone: "border-amber-200/70 bg-gradient-to-br from-amber-50 to-orange-50",
            iconTone: "bg-amber-600",
          },
          {
            icon: Os,
            title: e("documentationSimplified"),
            description: e("documentationSimplifiedDesc"),
            tone: "border-indigo-200/70 bg-gradient-to-br from-indigo-50 to-slate-50",
            iconTone: "bg-indigo-600",
          },
          {
            icon: Ks,
            title: e("easyDelivery"),
            description: e("easyDeliveryDesc"),
            tone: "border-cyan-200/70 bg-gradient-to-br from-cyan-50 to-sky-50",
            iconTone: "bg-cyan-600",
          },
        ],
        [e],
      ),
      i = u.useMemo(
        () => [
          e("singleConsolidatedShipment"),
          e("securePaymentHandling"),
          e("fasterProcess"),
        ],
        [e],
      ),
      d = u.useMemo(
        () => [e("fasterDocumentation"), e("costReduction"), e("timeSavings")],
        [e],
      );
    return (
      u.useEffect(() => {
        const m = r.current;
        if (!m) return;
        const c = new IntersectionObserver(
          (h) => {
            h[0].isIntersecting && l(!0);
          },
          { threshold: 0.12 },
        );
        return (c.observe(m), () => c.disconnect());
      }, []),
      t.jsxs(
        "section",
        {
          id: "how-it-works",
          className: "py-12 sm:py-16 bg-white relative overflow-hidden",
          children: [
            t.jsx("div", {
              className:
                "absolute inset-0 pointer-events-none bg-[radial-gradient(900px_circle_at_12%_12%,rgba(59,130,246,0.11),transparent_55%),radial-gradient(760px_circle_at_88%_12%,rgba(16,185,129,0.10),transparent_55%)]",
            }),
            t.jsx("div", {
              className:
                "absolute inset-0 pointer-events-none opacity-25 [background-image:linear-gradient(to_right,rgba(148,163,184,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.2)_1px,transparent_1px)] [background-size:40px_40px]",
            }),
            t.jsxs("div", {
              className: "relative mx-auto max-w-7xl px-4 sm:px-6",
              children: [
                t.jsxs("div", {
                  ref: r,
                  className: [
                    "max-w-3xl mx-auto text-center transition-all duration-700",
                    a ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                  ].join(" "),
                  children: [
                    t.jsx("div", {
                      className:
                        "inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-700 shadow-sm",
                      children: e("simpleProcess"),
                    }),
                    t.jsx("h2", {
                      className:
                        "mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-950 text-balance",
                      children: t.jsx("span", {
                        className:
                          "bg-gradient-to-r from-slate-950 via-blue-900 to-emerald-800 bg-clip-text text-transparent",
                        children: e("howItWorks"),
                      }),
                    }),
                    t.jsx("p", {
                      className:
                        "mt-3 text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl mx-auto",
                      children: e("howItWorksDesc"),
                    }),
                  ],
                }),
                t.jsxs("div", {
                  className: "mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.65fr]",
                  children: [
                    t.jsx("div", {
                      className: [
                        "transition-all duration-700",
                        a
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-3",
                      ].join(" "),
                      children: t.jsxs("div", {
                        className:
                          "h-full rounded-[1.75rem] border border-slate-200 bg-white p-5 sm:p-6 shadow-sm",
                        children: [
                          t.jsx("div", {
                            className:
                              "inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700",
                            children: e("bundleistSolution"),
                          }),
                          t.jsx("h3", {
                            className:
                              "mt-3 text-lg sm:text-xl font-extrabold tracking-tight text-slate-950",
                            children: e("smartConsolidated"),
                          }),
                          t.jsx("p", {
                            className:
                              "mt-2 text-sm leading-relaxed text-slate-700",
                            children: e("featuresSubtext"),
                          }),
                          t.jsx("div", {
                            className: "mt-5 space-y-2.5",
                            children: i.map((m, c) =>
                              t.jsxs(
                                "div",
                                {
                                  className:
                                    "flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5",
                                  children: [
                                    t.jsx(Se, {
                                      className:
                                        "h-4 w-4 mt-0.5 flex-none text-emerald-600",
                                    }),
                                    t.jsx("div", {
                                      className:
                                        "text-sm font-semibold leading-relaxed text-slate-800",
                                      children: m,
                                    }),
                                  ],
                                },
                                c,
                              ),
                            ),
                          }),
                          t.jsx("div", {
                            className: "mt-5 flex flex-wrap gap-2",
                            children: d.map((m, c) =>
                              t.jsx(
                                "div",
                                {
                                  className:
                                    "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm",
                                  children: m,
                                },
                                c,
                              ),
                            ),
                          }),
                        ],
                      }),
                    }),
                    t.jsx("div", {
                      className:
                        "rounded-[1.75rem] border border-slate-200 bg-white p-4 sm:p-5 shadow-sm",
                      children: t.jsx("ol", {
                        className: "space-y-3 sm:space-y-4",
                        children: n.map((m, c) => {
                          const h = m.icon,
                            g = Math.min(6, c) * 70,
                            o = c === 0,
                            p = c === n.length - 1;
                          return t.jsxs(
                            "li",
                            {
                              className: "relative pl-11 sm:pl-14",
                              children: [
                                t.jsx("div", {
                                  className:
                                    "absolute left-0 top-2.5 h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-slate-300 bg-white grid place-items-center text-xs sm:text-sm font-extrabold text-slate-800 shadow-sm",
                                  children: c + 1,
                                }),
                                p
                                  ? null
                                  : t.jsx("div", {
                                      className:
                                        "absolute left-[15px] sm:left-[19px] top-12 sm:top-14 bottom-[-16px] w-px bg-slate-200",
                                    }),
                                t.jsxs("article", {
                                  className: [
                                    "rounded-[1.25rem] border p-4 sm:p-5 shadow-sm transition-all",
                                    m.tone,
                                    a
                                      ? "opacity-100 translate-y-0"
                                      : "opacity-0 translate-y-3",
                                  ].join(" "),
                                  style: { transitionDelay: `${g}ms` },
                                  children: [
                                    o || p
                                      ? t.jsx("div", {
                                          className: "flex items-center gap-2",
                                          children: t.jsx("div", {
                                            className:
                                              "inline-flex items-center rounded-full border border-white/90 bg-white/85 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600",
                                            children: e(o ? "start" : "done"),
                                          }),
                                        })
                                      : null,
                                    t.jsxs("div", {
                                      className:
                                        "mt-3 flex items-start gap-3 sm:gap-4",
                                      children: [
                                        t.jsx("div", {
                                          className: [
                                            "h-10 w-10 sm:h-11 sm:w-11 rounded-xl grid place-items-center shadow-sm text-white flex-none",
                                            m.iconTone,
                                          ].join(" "),
                                          children: t.jsx(h, {
                                            className: "h-5 w-5",
                                          }),
                                        }),
                                        t.jsxs("div", {
                                          className: "min-w-0",
                                          children: [
                                            t.jsx("h3", {
                                              className:
                                                "text-base sm:text-lg font-extrabold text-slate-950",
                                              children: m.title,
                                            }),
                                            t.jsx("p", {
                                              className:
                                                "mt-1.5 text-sm text-slate-700 leading-relaxed",
                                              children: m.description,
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            c,
                          );
                        }),
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
        `how-it-works-${s.language}`,
      )
    );
  },
  Ta = {
    "weekly-procurement-rhythm-prevents-last-minute-air-freight": {
      tr: {
        title: "Son Dakika Hava Navlununu Önleyen Haftalık Satın Alma Ritmi",
        excerpt:
          "Küçük ithalat ekiplerinin yangın söndürmeyi azaltmak, navlun maliyetini kontrol etmek ve tedarikçi sorumluluğunu artırmak için uygulayabileceği basit haftalık rutin.",
      },
      ar: {
        title: "إيقاع مشتريات أسبوعي يمنع الشحن الجوي في اللحظة الأخيرة",
        excerpt:
          "روتين أسبوعي بسيط يمكن لفرق الاستيراد الصغيرة تطبيقه لتقليل العمل الطارئ وضبط تكلفة الشحن وتعزيز مساءلة الموردين.",
      },
    },
    "cut-customs-delays-by-fixing-documents-before-cargo-moves": {
      tr: {
        title:
          "Yük Hareket Etmeden Evrakı Düzelterek Gümrük Gecikmelerini Azaltmak",
        excerpt:
          "Gümrük gecikmeleri genellikle yük çıkmadan önce başlar. Bu kontrol listesi sorunları erken yakalamanıza yardım eder.",
      },
      ar: {
        title: "قلّل تأخيرات الجمارك بإصلاح المستندات قبل تحرّك الشحنة",
        excerpt:
          "تأخيرات الجمارك تبدأ غالبا قبل مغادرة الشحنة. تساعدك هذه القائمة على اكتشاف مشاكل المستندات مبكرا.",
      },
    },
    "what-a-healthy-shipment-update-looks-like": {
      tr: {
        title:
          "Sağlıklı Bir Sevkiyat Güncellemesi Nasıl Olur (ve Neden Güven Oluşturur)",
        excerpt:
          "Belirsiz güncellemeler baskıyı artırır. Bu format, müşterinin harekete geçebildiği net sevkiyat güncellemeleri göndermenize yardım eder.",
      },
      ar: {
        title: "كيف يبدو تحديث شحنة صحي (ولماذا يبني الثقة)",
        excerpt:
          "التحديثات المبهمة تزيد الضغط. يساعدك هذا النموذج على إرسال تحديثات واضحة يمكن للعميل اتخاذ إجراء بناء عليها.",
      },
    },
    "7 advantages of shipping consolidation for growing teams": {
      tr: {
        title: "Buyuyen Ekipler Icin Gonderi Konsolidasyonunun 7 Avantaji",
        excerpt:
          "Konsolidasyon sadece navlun tasarrufu degildir. Operasyonunuz buyudukce planlama, gorunurluk, nakit akisi ve musteri deneyimini iyilestirir.",
      },
      ar: {
        title: "7 مزايا لتجميع الشحن للفرق المتنامية",
        excerpt:
          "التجميع ليس فقط لتوفير تكاليف الشحن. فهو يحسن التخطيط والرؤية والتدفق النقدي وتجربة العملاء مع توسع عملياتك.",
      },
      fr: {
        title:
          "7 avantages de la consolidation des expeditions pour les equipes en croissance",
        excerpt:
          "La consolidation ne se limite pas aux economies de fret. Elle ameliore la planification, la visibilite, la tresorerie et l'experience client a mesure que vos operations se developpent.",
      },
    },
  },
  es = (e) => {
    const s = (e || "en").toLowerCase();
    return s.startsWith("tr")
      ? "tr"
      : s.startsWith("fr")
        ? "fr"
        : s.startsWith("ar")
          ? "ar"
          : "en";
  },
  Y = (e, s, r) => (s && s.trim()) || (r && r.trim()) || e || "",
  ht = (e) => (e || "").trim().toLowerCase().replace(/\s+/g, " "),
  Ma = (e, s) => {
    const r = [ht(e.slug), ht(e.title)];
    for (const a of r) {
      if (!a) continue;
      const l = Ta[a];
      if (l != null && l[s]) return l[s] || null;
    }
    return null;
  },
  Ea = (e, s) => {
    const r = es(s),
      a = Ma(e, r),
      l =
        r === "tr"
          ? Y(e.title, e.title_tr, e.title_en)
          : r === "fr"
            ? Y(e.title, e.title_fr, e.title_en)
            : Y(e.title, e.title_en, e.title_en),
      n =
        r === "tr"
          ? Y(e.excerpt, e.excerpt_tr, e.excerpt_en)
          : r === "fr"
            ? Y(e.excerpt, e.excerpt_fr, e.excerpt_en)
            : Y(e.excerpt, e.excerpt_en, e.excerpt_en);
    return {
      title: (a == null ? void 0 : a.title) || l,
      excerpt: (a == null ? void 0 : a.excerpt) || n || null,
    };
  },
  eo = (e, s) => {
    const r = es(s),
      a =
        r === "tr"
          ? Y(e.title, e.title_tr, e.title_en)
          : r === "fr"
            ? Y(e.title, e.title_fr, e.title_en)
            : Y(e.title, e.title_en, e.title_en),
      l =
        r === "tr"
          ? Y(e.content, e.content_tr, e.content_en)
          : r === "fr"
            ? Y(e.content, e.content_fr, e.content_en)
            : Y(e.content, e.content_en, e.content_en);
    return { title: a, content: l };
  },
  Aa = () => {
    const { t: e, i18n: s } = ee(),
      [r, a] = u.useState([]),
      [l, n] = u.useState(!0);
    return (
      u.useEffect(() => {
        (async () => {
          const d =
              "id, slug, title, title_en, title_tr, title_fr, excerpt, excerpt_en, excerpt_tr, excerpt_fr, image_url, created_at, published",
            m = "id, title, excerpt, image_url, created_at, published";
          let { data: c, error: h } = await q
            .from("blog_posts")
            .select(d)
            .eq("published", !0)
            .order("created_at", { ascending: !1 })
            .limit(8);
          (h &&
            /does not exist/i.test(h.message) &&
            ({ data: c, error: h } = await q
              .from("blog_posts")
              .select(m)
              .eq("published", !0)
              .order("created_at", { ascending: !1 })
              .limit(8)),
            !h && c && a(c),
            n(!1));
        })();
      }, []),
      l || r.length === 0
        ? null
        : t.jsx("section", {
            className: "py-14 bg-gradient-to-b from-white to-slate-50",
            children: t.jsxs("div", {
              className: "mx-auto max-w-7xl px-4 sm:px-6",
              children: [
                t.jsxs("div", {
                  className: "flex items-end justify-between gap-4 mb-8",
                  children: [
                    t.jsxs("div", {
                      children: [
                        t.jsx("div", {
                          className:
                            "text-xs font-bold uppercase tracking-wide text-slate-600",
                          children: e("latestInsights"),
                        }),
                        t.jsx("h2", {
                          className:
                            "mt-2 text-2xl md:text-3xl font-bold tracking-tight text-slate-950",
                          children: e("fromTheBlog"),
                        }),
                      ],
                    }),
                    t.jsx(me, {
                      to: "/blog",
                      className:
                        "text-sm font-bold text-emerald-700 hover:text-emerald-800",
                      children: e("viewAllArticles"),
                    }),
                  ],
                }),
                t.jsx("div", {
                  className: "overflow-x-auto hide-scrollbar pb-2",
                  children: t.jsx("div", {
                    className: "flex gap-6 min-w-0",
                    children: r.map((i) =>
                      (() => {
                        const d = Ea(i, s.language);
                        return t.jsxs(
                          me,
                          {
                            to: `/blog/${i.id}`,
                            className:
                              "group block flex-none w-full md:w-[22rem] rounded-[1.75rem] border border-slate-900/10 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden",
                            children: [
                              t.jsx("div", {
                                className: "bg-slate-100",
                                children: i.image_url
                                  ? t.jsx("img", {
                                      src: i.image_url,
                                      alt: d.title,
                                      className:
                                        "w-full h-44 object-cover group-hover:scale-[1.02] transition-transform duration-500",
                                      loading: "lazy",
                                    })
                                  : t.jsx("div", {
                                      className:
                                        "w-full h-44 bg-gradient-to-br from-slate-100 to-slate-200",
                                    }),
                              }),
                              t.jsxs("div", {
                                className: "p-5",
                                children: [
                                  t.jsx("div", {
                                    className:
                                      "flex items-center gap-2 text-xs text-slate-600",
                                    children: t.jsx("span", {
                                      className:
                                        "px-3 py-1 rounded-full bg-white border border-slate-900/10 font-semibold",
                                      children: new Date(
                                        i.created_at,
                                      ).toLocaleDateString(s.language),
                                    }),
                                  }),
                                  t.jsx("h3", {
                                    className:
                                      "mt-3 text-lg font-bold tracking-tight text-slate-950 group-hover:text-emerald-700 transition-colors line-clamp-2",
                                    children: d.title,
                                  }),
                                  d.excerpt &&
                                    t.jsx("p", {
                                      className:
                                        "mt-2 text-sm text-slate-700 leading-relaxed line-clamp-3",
                                      children: d.excerpt,
                                    }),
                                  t.jsx("div", {
                                    className:
                                      "mt-4 text-sm font-bold text-emerald-700 group-hover:text-emerald-800",
                                    children: e("readMore"),
                                  }),
                                ],
                              }),
                            ],
                          },
                          i.id,
                        );
                      })(),
                    ),
                  }),
                }),
              ],
            }),
          })
    );
  },
  za = () => {
    const { t: e } = ee(),
      s = u.useMemo(() => new Date().getFullYear(), []),
      [r, a] = u.useState(""),
      [l, n] = u.useState(!1),
      [i, d] = u.useState(""),
      [m, c] = u.useState(!1),
      h = async (g) => {
        if ((g.preventDefault(), !m)) {
          if ((d(""), n(!1), !r || !r.includes("@"))) {
            d(e("invalidEmailAddress"));
            return;
          }
          c(!0);
          try {
            const o = await fetch("/.netlify/functions/newsletter-subscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: r }),
            });
            let p = null;
            try {
              p = await o.json();
            } catch {}
            if (!o.ok) {
              if ((p == null ? void 0 : p.code) === "already_subscribed") {
                d(e("emailAlreadySubscribed"));
                return;
              }
              if ((p == null ? void 0 : p.code) === "invalid_email") {
                d(e("invalidEmailAddress"));
                return;
              }
              d(e("genericTryAgain"));
              return;
            }
            (n(!0), a(""));
          } catch {
            d(e("genericTryAgain"));
          } finally {
            c(!1);
          }
        }
      };
    return t.jsxs("footer", {
      className:
        "relative overflow-hidden border-t border-slate-900/10 bg-gradient-to-b from-white to-slate-50",
      children: [
        t.jsx("div", {
          className:
            "absolute inset-0 pointer-events-none bg-[radial-gradient(800px_circle_at_20%_20%,rgba(16,185,129,0.08),transparent_55%),radial-gradient(700px_circle_at_80%_30%,rgba(59,130,246,0.08),transparent_55%)]",
        }),
        t.jsx("div", {
          className: "mx-auto max-w-7xl px-4 sm:px-6 relative",
          children: t.jsxs("div", {
            className: "py-12 sm:py-16",
            children: [
              t.jsxs("div", {
                className: "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12",
                children: [
                  t.jsxs("div", {
                    className: "lg:col-span-5",
                    children: [
                      t.jsx(Pe, {
                        size: "sm",
                        showText: !0,
                        markClassName: "w-11 h-11 sm:w-12 sm:h-12",
                        textClassName: "text-base sm:text-lg",
                      }),
                      t.jsx("p", {
                        className:
                          "mt-4 text-slate-700 leading-relaxed max-w-md",
                        children: e("brandDesc"),
                      }),
                      t.jsxs("div", {
                        className: "mt-6 space-y-3",
                        children: [
                          t.jsxs("div", {
                            className: "flex items-center gap-3 text-slate-700",
                            children: [
                              t.jsx("span", {
                                className:
                                  "h-10 w-10 rounded-2xl border border-slate-900/10 bg-white shadow-sm grid place-items-center",
                                children: t.jsx(qs, {
                                  className: "h-4 w-4 text-emerald-700",
                                }),
                              }),
                              t.jsx("a", {
                                className:
                                  "font-semibold hover:text-emerald-700",
                                href: "mailto:bundleist@gmail.com",
                                children: e("contactEmail"),
                              }),
                            ],
                          }),
                          t.jsxs("div", {
                            className: "flex items-center gap-3 text-slate-700",
                            children: [
                              t.jsx("span", {
                                className:
                                  "h-10 w-10 rounded-2xl border border-slate-900/10 bg-white shadow-sm grid place-items-center",
                                children: t.jsx($s, {
                                  className: "h-4 w-4 text-blue-700",
                                }),
                              }),
                              t.jsx("span", {
                                className: "font-semibold",
                                children: e("locationIstanbul"),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  t.jsx("div", {
                    className: "lg:col-span-7",
                    children: t.jsxs("div", {
                      className:
                        "rounded-[2rem] border border-slate-900/10 bg-white/80 backdrop-blur shadow-sm p-5 sm:p-6",
                      children: [
                        t.jsxs("div", {
                          className:
                            "flex flex-col sm:flex-row sm:items-end gap-4",
                          children: [
                            t.jsxs("div", {
                              className: "min-w-0",
                              children: [
                                t.jsx("div", {
                                  className:
                                    "text-xs font-bold uppercase tracking-wide text-slate-600",
                                  children: e("stayUpdated"),
                                }),
                                t.jsx("h3", {
                                  className:
                                    "mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950",
                                  children: e("stayUpdatedDesc"),
                                }),
                                t.jsx("p", {
                                  className: "mt-3 text-sm text-slate-700",
                                  children: e("newsletterNoSpam"),
                                }),
                              ],
                            }),
                            t.jsx("div", { className: "flex-1" }),
                          ],
                        }),
                        t.jsxs("form", {
                          onSubmit: h,
                          className: "mt-6",
                          children: [
                            t.jsxs("div", {
                              className:
                                "grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3",
                              children: [
                                t.jsxs("div", {
                                  className: "relative",
                                  children: [
                                    t.jsx("input", {
                                      type: "email",
                                      value: r,
                                      onChange: (g) => a(g.target.value),
                                      placeholder: e(
                                        "newsletterEmailPlaceholder",
                                      ),
                                      className:
                                        "w-full h-11 rounded-2xl border border-slate-900/10 bg-white px-4 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
                                      required: !0,
                                    }),
                                    t.jsx(ze, {
                                      className:
                                        "absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400",
                                    }),
                                  ],
                                }),
                                t.jsx(ue, {
                                  type: "submit",
                                  disabled: m,
                                  className:
                                    "h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white px-5 font-semibold",
                                  children: e(
                                    l ? "subscribed" : "subscribeNewsletter",
                                  ),
                                }),
                              ],
                            }),
                            i
                              ? t.jsx("div", {
                                  className:
                                    "mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-3",
                                  children: i,
                                })
                              : null,
                            l
                              ? t.jsx("div", {
                                  className:
                                    "mt-3 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3",
                                  children: e("newsletterThanks"),
                                })
                              : null,
                          ],
                        }),
                        t.jsxs("div", {
                          className:
                            "mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-t border-slate-900/10 pt-5",
                          children: [
                            t.jsxs("div", {
                              className: "flex flex-wrap items-center gap-3",
                              children: [
                                t.jsx(me, {
                                  to: "/contact",
                                  className:
                                    "text-sm font-semibold text-slate-700 hover:text-emerald-700",
                                  children: e("footerContact"),
                                }),
                                t.jsx(me, {
                                  to: "/blog",
                                  className:
                                    "text-sm font-semibold text-slate-700 hover:text-emerald-700",
                                  children: e("blog"),
                                }),
                              ],
                            }),
                            t.jsxs("div", {
                              className: "flex items-center gap-3",
                              children: [
                                t.jsxs(me, {
                                  to: "/privacy",
                                  className:
                                    "inline-flex items-center gap-2 h-9 px-3 rounded-full border border-slate-900/10 bg-white text-sm font-semibold text-slate-700 hover:text-emerald-700",
                                  children: [
                                    t.jsx(Ys, { className: "h-4 w-4" }),
                                    e("privacyPolicy"),
                                  ],
                                }),
                                t.jsxs(me, {
                                  to: "/terms",
                                  className:
                                    "inline-flex items-center gap-2 h-9 px-3 rounded-full border border-slate-900/10 bg-white text-sm font-semibold text-slate-700 hover:text-emerald-700",
                                  children: [
                                    t.jsx(Re, { className: "h-4 w-4" }),
                                    e("termsOfService"),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              t.jsxs("div", {
                className:
                  "mt-12 border-t border-slate-900/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3",
                children: [
                  t.jsxs("div", {
                    className: "text-sm text-slate-600",
                    children: [
                      "© ",
                      s,
                      " Bundleist Ltd. ",
                      e("allRightsReserved"),
                    ],
                  }),
                  t.jsx("div", {
                    className: "text-xs text-slate-500",
                    children: e("footerBuiltFor"),
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  },
  Ia = ({
    title: e,
    description: s,
    keywords: r,
    ogImage: a = "/og-image.png",
    canonical: l,
    noindex: n = !1,
  }) => {
    const { i18n: i } = ee(),
      d =
        "Bundleist - Turkish Export Consolidation | Simplify Supply Chain Management",
      m =
        "Revolutionize your Turkish supply chain with Bundleist's AI-powered export consolidation platform. Reduce shipping costs by 65%, streamline documentation 15x faster, save 80% time.",
      c =
        "Turkish export consolidation, supply chain management Turkey, Turkish suppliers platform, export logistics Turkey, shipping consolidation, supplier management software, Turkey B2B marketplace, export documentation, freight consolidation, Turkish trade platform, Istanbul suppliers, supply chain optimization, export streamlining, consolidation services Turkey, Turkish manufacturer sourcing",
      h = e ? `${e} | Bundleist` : d,
      g = s || m,
      o = r || c;
    return (
      u.useEffect(() => {
        document.title = h;
        const p = document.querySelector('meta[name="description"]');
        p && p.setAttribute("content", g);
        const w = document.querySelector('meta[name="keywords"]');
        w && w.setAttribute("content", o);
        const b = document.querySelector('meta[name="robots"]');
        b &&
          b.setAttribute(
            "content",
            n
              ? "noindex, nofollow"
              : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
          );
        let f = document.querySelector('link[rel="canonical"]');
        (f ||
          ((f = document.createElement("link")),
          (f.rel = "canonical"),
          document.head.appendChild(f)),
          (f.href = l || window.location.href));
        const N = document.querySelector('meta[property="og:title"]');
        N && N.setAttribute("content", h);
        const S = document.querySelector('meta[property="og:description"]');
        S && S.setAttribute("content", g);
        const R = document.querySelector('meta[property="og:image"]');
        R && R.setAttribute("content", `${window.location.origin}${a}`);
        const M = document.querySelector('meta[property="og:url"]');
        M && M.setAttribute("content", window.location.href);
        const T = document.querySelector('meta[property="twitter:title"]');
        T && T.setAttribute("content", h);
        const B = document.querySelector(
          'meta[property="twitter:description"]',
        );
        B && B.setAttribute("content", g);
        const D = document.querySelector('meta[property="twitter:image"]');
        (D && D.setAttribute("content", `${window.location.origin}${a}`),
          (() => {
            const G = window.location.origin,
              te = [
                { lang: "en", url: `${G}/en` },
                { lang: "tr", url: `${G}/tr` },
                { lang: "fr", url: `${G}/fr` },
                { lang: "x-default", url: G },
              ];
            (document
              .querySelectorAll("link[hreflang]")
              .forEach((V) => V.remove()),
              te.forEach(({ lang: V, url: C }) => {
                const F = document.createElement("link");
                ((F.rel = "alternate"),
                  (F.hreflang = V),
                  (F.href = C),
                  document.head.appendChild(F));
              }));
          })());
      }, [h, g, o, a, l, n, i.language]),
      null
    );
  },
  Ra = ({ type: e = "Organization", data: s = {}, pageType: r = "home" }) => {
    const { i18n: a } = ee();
    return (
      u.useEffect(() => {
        const l = window.location.origin,
          n = {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Bundleist",
            description:
              "AI-powered Turkish export consolidation platform for seamless supply chain management",
            url: l,
            logo: `${l}/logo.png`,
            foundingDate: "2024",
            industry: "Supply Chain Management",
            services: [
              "Export Consolidation",
              "Supplier Management",
              "Logistics Optimization",
              "Documentation Services",
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                email: "bundleist@gmail.com",
                contactType: "customer service",
                availableLanguage: ["English", "Turkish", "French"],
              },
            ],
            address: {
              "@type": "PostalAddress",
              addressCountry: "TR",
              addressLocality: "Istanbul",
              addressRegion: "Istanbul",
            },
            areaServed: { "@type": "Country", name: "Turkey" },
            knowsAbout: [
              "Turkish Export",
              "Supply Chain Consolidation",
              "Logistics Management",
              "B2B Marketplace",
            ],
            sameAs: [
              "https://linkedin.com/company/bundleist",
              "https://twitter.com/bundleist",
            ],
            ...s,
          },
          i = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Bundleist",
            url: l,
            description:
              "Turkish export consolidation platform for efficient supply chain management",
            inLanguage: ["en", "tr", "fr"],
            potentialAction: {
              "@type": "SearchAction",
              target: `${l}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          },
          d = {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Turkish Export Consolidation",
            description:
              "Comprehensive export consolidation services for Turkish suppliers and international buyers",
            provider: { "@type": "Organization", name: "Bundleist" },
            serviceType: "Supply Chain Management",
            areaServed: { "@type": "Country", name: "Turkey" },
            offers: {
              "@type": "Offer",
              description:
                "Export consolidation platform with transparent pricing",
              category: "Business Service",
            },
          },
          m = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is export consolidation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Export consolidation is the process of combining multiple smaller shipments from different suppliers into a single, larger shipment to reduce shipping costs and improve efficiency.",
                },
              },
              {
                "@type": "Question",
                name: "How much can I save with Bundleist?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bundleist customers typically save 65% on shipping costs, reduce documentation time by 15x, and save 80% of their time managing Turkish suppliers.",
                },
              },
              {
                "@type": "Question",
                name: "What types of products can be consolidated?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We consolidate various products including textiles, machinery, automotive parts, chemicals, and other manufactured goods from Turkish suppliers.",
                },
              },
            ],
          },
          c = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: l },
            ],
          },
          h = [n, i, d];
        (r === "home" && h.push(m),
          h.push(c),
          document
            .querySelectorAll('script[type="application/ld+json"]')
            .forEach((g) => {
              var o;
              (o = g.textContent) != null &&
                o.includes('"@context": "https://schema.org"') &&
                g.remove();
            }),
          h.forEach((g) => {
            const o = document.createElement("script");
            ((o.type = "application/ld+json"),
              (o.textContent = JSON.stringify(g)),
              document.head.appendChild(o));
          }));
      }, [e, s, r, a.language]),
      null
    );
  },
  Fe = 768;
function Pa() {
  const [e, s] = u.useState(void 0);
  return (
    u.useEffect(() => {
      const r = window.matchMedia(`(max-width: ${Fe - 1}px)`),
        a = () => {
          s(window.innerWidth < Fe);
        };
      return (
        r.addEventListener("change", a),
        s(window.innerWidth < Fe),
        () => r.removeEventListener("change", a)
      );
    }, []),
    !!e
  );
}
const La = () => {
    const e = Pa(),
      { t: s, i18n: r } = ee();
    u.useEffect(() => {
      if (!window.location.hash) return;
      const i = window.location.hash.substring(1),
        d = document.getElementById(i);
      d && d.scrollIntoView({ behavior: "smooth" });
    }, []);
    const a = u.useMemo(
        () => [
          {
            tier: "Starter - Pilot Consolidation",
            name: "Starter",
            price: "$349",
            period: "service fee",
            description:
              "Ideal for first-time importers who want to manage suppliers, payments, and shipping more smoothly.",
            commercial:
              "After your first shipment, continue with Starter or upgrade to Standard for better rates, full dashboard access, and priority scheduling.",
            model: "Includes",
            icon: Fs,
            iconColor: "text-emerald-700",
            iconBg: "bg-emerald-100",
            borderColor: "border-emerald-300/90",
            tierTone: "border-emerald-200 bg-emerald-50 text-emerald-700",
            featured: !1,
            features: [
              "Guided first consolidation from supplier pickup to dispatch",
              "Supplier payment coordination",
              "Single bill of lading",
              "Basic tracking",
            ],
          },
          {
            tier: "Standard - Core Plan (Most Popular)",
            name: "Standard",
            price: "$350 minimum or 1.5%",
            period: "of order value (whichever is higher)",
            description: "Designed for growing businesses importing regularly.",
            commercial:
              "Service fee is separated from freight, duties, and bank charges for transparent cost control.",
            model: "Includes",
            icon: Re,
            iconColor: "text-blue-600",
            iconBg: "bg-blue-100",
            borderColor: "border-blue-300/90",
            tierTone: "border-blue-200 bg-blue-50 text-blue-700",
            featured: !0,
            features: [
              "Multi-supplier consolidation",
              "Real-time dashboard tracking",
              "Document management",
              "Shipment status updates",
              "Reliable consolidation scheduling",
            ],
          },
          {
            tier: "Enterprise - Volume and Priority",
            name: "Enterprise",
            price: "$750 minimum or 1%",
            period: "service fee (whichever is higher)",
            description:
              "Built for high-volume importers who need speed, priority, and cost optimization.",
            commercial:
              "Best for teams that need faster dispatch, strategic support, and predictable priority capacity.",
            model: "Includes",
            icon: Ue,
            iconColor: "text-violet-700",
            iconBg: "bg-violet-100",
            borderColor: "border-violet-300/90",
            tierTone: "border-violet-200 bg-violet-50 text-violet-700",
            featured: !1,
            features: [
              "Priority consolidation and faster dispatch",
              "Dedicated operations manager",
              "Preferential freight rates",
              "FX optimization support",
              "Advanced analytics and reporting",
              "Reserved consolidation capacity during peak periods",
            ],
          },
        ],
        [],
      ),
      l = u.useMemo(
        () => [
          {
            icon: Re,
            tone: "from-blue-50 to-indigo-50 border-blue-200/60",
            iconTone: "bg-blue-600",
            value: s("resultsFreightValue"),
            title: s("fasterDocumentation"),
            subtitle: s("singleBillOfLading"),
          },
          {
            icon: Vs,
            tone: "from-emerald-50 to-blue-50 border-emerald-200/60",
            iconTone: "bg-emerald-600",
            value: s("resultsPaymentValue"),
            title: s("costReduction"),
            subtitle: s("lowerShippingCosts"),
          },
          {
            icon: Qs,
            tone: "from-violet-50 to-pink-50 border-violet-200/60",
            iconTone: "bg-violet-600",
            value: s("resultsExceptionsValue"),
            title: s("timeSavings"),
            subtitle: s("streamlinedProcess"),
          },
        ],
        [s],
      ),
      n = u.useMemo(
        () => ({
          traditional: [
            s("multipleShipments"),
            s("complexDocumentation"),
            s("paymentRisks"),
            s("responseRate"),
            s("delays"),
          ],
          bundleist: [
            s("singleConsolidatedShipment"),
            s("streamlinedDocumentation"),
            s("securePaymentHandling"),
            s("fasterProcess"),
            s("costSavings"),
          ],
        }),
        [s],
      );
    return t.jsxs(t.Fragment, {
      children: [
        t.jsx(Ia, {
          title: s("homeSeoTitle"),
          description: s("homeSeoDescription"),
          keywords: s("homeSeoKeywords"),
        }),
        t.jsx(Ra, { pageType: "home" }),
        t.jsxs(
          "div",
          {
            className: "min-h-screen bg-white flex flex-col",
            children: [
              t.jsx(ka, {}),
              t.jsxs("main", {
                className: "flex-grow",
                children: [
                  t.jsx(Ca, {}, r.language),
                  t.jsx("section", {
                    className: "py-10 sm:py-14 bg-white",
                    children: t.jsxs("div", {
                      className: "mx-auto max-w-7xl px-4 sm:px-6",
                      children: [
                        t.jsxs("div", {
                          className: "max-w-4xl",
                          children: [
                            t.jsx("h2", {
                              className:
                                "text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-balance",
                              children: t.jsx("span", {
                                className:
                                  "bg-gradient-to-r from-slate-950 via-emerald-900 to-blue-900 bg-clip-text text-transparent",
                                children: s("statisticsTitle"),
                              }),
                            }),
                            t.jsx("p", {
                              className:
                                "mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl",
                              children: s("statisticsSubtitle"),
                            }),
                          ],
                        }),
                        t.jsx("div", {
                          className:
                            "mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6",
                          children: l.map((i, d) => {
                            const m = i.icon,
                              c = d === l.length - 1;
                            return t.jsxs(
                              "div",
                              {
                                className: [
                                  "rounded-[1.5rem] sm:rounded-[1.75rem] border bg-gradient-to-br shadow-sm",
                                  "p-3.5 sm:p-6",
                                  c ? "col-span-2 sm:col-span-1" : "",
                                  i.tone,
                                ].join(" "),
                                children: [
                                  t.jsxs("div", {
                                    className:
                                      "flex items-start justify-between gap-3",
                                    children: [
                                      t.jsx("div", {
                                        className: "min-w-0 flex-1",
                                        children: t.jsx("div", {
                                          className:
                                            "text-lg sm:text-4xl font-extrabold tracking-tight leading-tight text-slate-950 break-words",
                                          children: i.value,
                                        }),
                                      }),
                                      t.jsx("div", {
                                        className: [
                                          "h-10 w-10 sm:h-11 sm:w-11 rounded-2xl grid place-items-center shadow-sm text-white flex-none",
                                          i.iconTone,
                                        ].join(" "),
                                        children: t.jsx(m, {
                                          className: "h-5 w-5",
                                        }),
                                      }),
                                    ],
                                  }),
                                  t.jsx("div", {
                                    className:
                                      "mt-2 sm:mt-3 text-xs sm:text-sm font-bold text-slate-950",
                                    children: i.title,
                                  }),
                                  t.jsx("div", {
                                    className:
                                      "mt-1 text-[13px] sm:text-sm text-slate-700 leading-relaxed line-clamp-3 sm:line-clamp-none",
                                    children: i.subtitle,
                                  }),
                                ],
                              },
                              d,
                            );
                          }),
                        }),
                      ],
                    }),
                  }),
                  t.jsxs("section", {
                    className:
                      "py-12 sm:py-16 bg-slate-50 relative overflow-hidden",
                    children: [
                      t.jsx("div", {
                        className:
                          "absolute inset-0 pointer-events-none bg-[radial-gradient(820px_circle_at_15%_20%,rgba(59,130,246,0.12),transparent_55%),radial-gradient(760px_circle_at_85%_15%,rgba(16,185,129,0.10),transparent_55%)]",
                      }),
                      t.jsx("div", {
                        className:
                          "absolute inset-0 pointer-events-none opacity-25 [background-image:linear-gradient(to_right,rgba(148,163,184,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.25)_1px,transparent_1px)] [background-size:44px_44px]",
                      }),
                      t.jsxs("div", {
                        className: "relative mx-auto max-w-7xl px-4 sm:px-6",
                        children: [
                          t.jsxs("div", {
                            className: "max-w-4xl",
                            children: [
                              t.jsx("div", {
                                className:
                                  "inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-600 shadow-sm",
                                children: s("comparisonBadge"),
                              }),
                              t.jsx("h2", {
                                className:
                                  "mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-balance",
                                children: t.jsx("span", {
                                  className:
                                    "bg-gradient-to-r from-slate-950 via-blue-900 to-emerald-800 bg-clip-text text-transparent",
                                  children: s("comparisonTitle"),
                                }),
                              }),
                              t.jsx("p", {
                                className:
                                  "mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-700",
                                children: s("comparisonSubtitle"),
                              }),
                            ],
                          }),
                          t.jsxs("div", {
                            className:
                              "mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.8fr]",
                            children: [
                              t.jsxs("div", {
                                className:
                                  "rounded-[1.75rem] border border-rose-200 bg-white p-5 sm:p-6 shadow-sm",
                                children: [
                                  t.jsx("div", {
                                    className:
                                      "text-xs font-bold uppercase tracking-wider text-rose-700",
                                    children: s("traditionalImports"),
                                  }),
                                  t.jsx("div", {
                                    className: "mt-1 text-sm text-rose-700/80",
                                    children: s("fragmentedComplex"),
                                  }),
                                  t.jsx("div", {
                                    className: "mt-4 space-y-2.5",
                                    children: n.traditional
                                      .slice(0, 3)
                                      .map((i, d) =>
                                        t.jsx(
                                          "div",
                                          {
                                            className:
                                              "rounded-2xl border border-rose-100 bg-rose-50/70 px-3 py-2.5 text-sm font-semibold text-slate-800",
                                            children: i,
                                          },
                                          d,
                                        ),
                                      ),
                                  }),
                                ],
                              }),
                              t.jsxs("div", {
                                className:
                                  "rounded-[1.75rem] border border-emerald-200 bg-white p-5 sm:p-6 shadow-sm",
                                children: [
                                  t.jsx("div", {
                                    className:
                                      "text-xs font-bold uppercase tracking-wider text-emerald-700",
                                    children: s("bundleistSolution"),
                                  }),
                                  t.jsx("div", {
                                    className:
                                      "mt-1 text-sm text-emerald-700/85",
                                    children: s("smartConsolidated"),
                                  }),
                                  t.jsx("div", {
                                    className:
                                      "mt-4 grid gap-2.5 sm:grid-cols-2",
                                    children: n.bundleist.map((i, d) =>
                                      t.jsxs(
                                        "div",
                                        {
                                          className:
                                            "flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5",
                                          children: [
                                            t.jsx(Se, {
                                              className:
                                                "mt-0.5 h-4 w-4 flex-none text-emerald-600",
                                            }),
                                            t.jsx("div", {
                                              className:
                                                "text-sm font-semibold leading-relaxed text-slate-800",
                                              children: i,
                                            }),
                                          ],
                                        },
                                        d,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          t.jsx("p", {
                            className: "mt-5 text-xs sm:text-sm text-slate-500",
                            children: s("comparisonDisclaimer"),
                          }),
                        ],
                      }),
                    ],
                  }),
                  t.jsx(Sa, {}),
                  t.jsx(_a, {}),
                  t.jsx("section", {
                    id: "pricing",
                    className: "py-8 sm:py-10 bg-slate-50",
                    children: t.jsxs("div", {
                      className: "mx-auto max-w-7xl px-4 sm:px-6",
                      children: [
                        t.jsxs("div", {
                          className: "text-center max-w-4xl mx-auto",
                          children: [
                            t.jsx("h2", {
                              className:
                                "text-2xl sm:text-3xl font-bold tracking-tight text-slate-950",
                              children: "Pricing",
                            }),
                            t.jsx("p", {
                              className:
                                "mt-2 text-sm sm:text-base text-slate-700 leading-relaxed",
                              children:
                                "Transparent. Scalable. Built for Importers.",
                            }),
                            t.jsx("p", {
                              className:
                                "mt-2 text-sm sm:text-base text-slate-700 leading-relaxed",
                              children:
                                "Bundleist charges a service fee for consolidation and operational coordination. Freight, duties, and banking costs are passed through transparently with no hidden markups.",
                            }),
                            t.jsx("p", {
                              className:
                                "mt-2 text-sm sm:text-base text-slate-700 leading-relaxed",
                              children:
                                "Start with a pilot shipment and scale seamlessly as your import volume grows.",
                            }),
                          ],
                        }),
                        t.jsx("div", {
                          className:
                            "mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4",
                          children: a.map((i, d) => {
                            const m = i.icon,
                              c = i.featured,
                              h = i.features;
                            return t.jsx(
                              "div",
                              {
                                className: [
                                  "rounded-2xl border bg-white shadow-sm overflow-hidden",
                                  i.borderColor,
                                  c ? "ring-2 ring-blue-500/20" : "",
                                ].join(" "),
                                children: t.jsxs("div", {
                                  className: "p-4 sm:p-5",
                                  children: [
                                    t.jsxs("div", {
                                      className:
                                        "flex items-center justify-between gap-2",
                                      children: [
                                        t.jsx("div", {
                                          className: [
                                            "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
                                            i.tierTone,
                                          ].join(" "),
                                          children: i.tier,
                                        }),
                                        c
                                          ? t.jsx("div", {
                                              className:
                                                "shrink-0 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wide",
                                              children: "Most Popular",
                                            })
                                          : null,
                                      ],
                                    }),
                                    t.jsxs("div", {
                                      className: "mt-3 flex items-start gap-3",
                                      children: [
                                        t.jsx("div", {
                                          className: [
                                            "h-10 w-10 rounded-xl grid place-items-center",
                                            i.iconBg,
                                          ].join(" "),
                                          children: t.jsx(m, {
                                            className: [
                                              "h-5 w-5",
                                              i.iconColor,
                                            ].join(" "),
                                          }),
                                        }),
                                        t.jsxs("div", {
                                          className: "min-w-0",
                                          children: [
                                            t.jsx("div", {
                                              className:
                                                "text-base sm:text-lg font-extrabold leading-tight text-slate-950",
                                              children: i.name,
                                            }),
                                            t.jsx("div", {
                                              className:
                                                "mt-0.5 text-xs sm:text-sm text-slate-700 leading-relaxed",
                                              children: i.description,
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    t.jsxs("div", {
                                      className: "mt-3 flex items-end gap-2",
                                      children: [
                                        t.jsx("div", {
                                          className:
                                            "text-3xl sm:text-[2rem] font-extrabold tracking-tight text-slate-950",
                                          children: i.price,
                                        }),
                                        t.jsx("div", {
                                          className:
                                            "text-xs text-slate-600 font-semibold pb-1",
                                          children: i.period,
                                        }),
                                      ],
                                    }),
                                    t.jsx("div", {
                                      className:
                                        "mt-2 text-xs text-slate-600 leading-relaxed",
                                      children: i.model,
                                    }),
                                    t.jsx("div", {
                                      className:
                                        "mt-1 text-xs text-slate-500 leading-relaxed",
                                      children: i.commercial,
                                    }),
                                    t.jsx("div", {
                                      className:
                                        "mt-3 border-t border-slate-900/10 pt-3",
                                      children: t.jsx("div", {
                                        className: "grid gap-1.5",
                                        children: h.map((g, o) =>
                                          t.jsxs(
                                            "div",
                                            {
                                              className:
                                                "flex items-start gap-2 text-sm text-slate-700",
                                              children: [
                                                t.jsx(Se, {
                                                  className:
                                                    "h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-none",
                                                }),
                                                t.jsx("span", {
                                                  className: "leading-relaxed",
                                                  children: g,
                                                }),
                                              ],
                                            },
                                            o,
                                          ),
                                        ),
                                      }),
                                    }),
                                  ],
                                }),
                              },
                              d,
                            );
                          }),
                        }),
                        t.jsxs("div", {
                          className: "mt-6 grid gap-4 sm:grid-cols-2",
                          children: [
                            t.jsxs("div", {
                              className:
                                "h-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm",
                              children: [
                                t.jsx("h3", {
                                  className: "text-lg font-bold text-slate-900",
                                  children: "How Pricing Works",
                                }),
                                t.jsx("p", {
                                  className:
                                    "mt-2 text-sm text-slate-700 leading-relaxed",
                                  children:
                                    "Bundleist separates service fees from pass-through costs to ensure full transparency and cost control.",
                                }),
                                t.jsxs("div", {
                                  className:
                                    "mt-3 space-y-1.5 text-sm text-slate-700",
                                  children: [
                                    t.jsx("div", {
                                      children:
                                        "Service Fee: Bundleist operational fee.",
                                    }),
                                    t.jsx("div", {
                                      children:
                                        "Freight and Duties: charged at actual carrier rates.",
                                    }),
                                    t.jsx("div", {
                                      children:
                                        "Bank Fees: passed through at cost, with no markup.",
                                    }),
                                  ],
                                }),
                                t.jsx("p", {
                                  className:
                                    "mt-3 text-sm font-semibold text-slate-900",
                                  children:
                                    "No hidden fees. No surprises. Full cost visibility.",
                                }),
                              ],
                            }),
                            t.jsxs("div", {
                              className:
                                "h-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm",
                              children: [
                                t.jsx("h3", {
                                  className: "text-lg font-bold text-slate-900",
                                  children: "Scaling With You",
                                }),
                                t.jsx("p", {
                                  className:
                                    "mt-2 text-sm text-slate-700 leading-relaxed",
                                  children:
                                    "Many customers start with a pilot shipment and naturally move to Standard as their import volume grows.",
                                }),
                                t.jsx("p", {
                                  className:
                                    "mt-2 text-sm text-slate-700 leading-relaxed",
                                  children:
                                    "Enterprise is designed for high-volume importers who require priority handling, cost optimization, and dedicated support.",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  t.jsx(Aa, {}),
                  t.jsx(za, {}),
                ],
              }),
            ],
          },
          r.language,
        ),
      ],
    });
  },
  Ba = u.lazy(() =>
    de(() => import("./bloglist.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6])),
  ),
  Da = u.lazy(() =>
    de(() => import("./blogpost.js"), __vite__mapDeps([7, 1, 2, 3, 4, 5, 6])),
  ),
  Oa = u.lazy(() =>
    de(
      () => import("./blogadmin.js"),
      __vite__mapDeps([8, 1, 2, 4, 9, 5, 6, 3]),
    ),
  ),
  Va = u.lazy(() =>
    de(() => import("./auth.js"), __vite__mapDeps([10, 1, 2, 6, 4, 9, 5, 3])),
  ),
  qa = u.lazy(() =>
    de(() => import("./contact.js"), __vite__mapDeps([11, 1, 2, 5, 6, 3])),
  ),
  $a = u.lazy(() =>
    de(() => import("./privacy.js"), __vite__mapDeps([12, 1, 2, 3])),
  ),
  Ha = u.lazy(() =>
    de(() => import("./terms.js"), __vite__mapDeps([13, 1, 2, 3])),
  ),
  Ga = u.lazy(() =>
    de(() => import("./notfound.js"), __vite__mapDeps([14, 1, 2, 5, 6, 3])),
  ),
  Fa = new ps(),
  Wa = ({ children: e }) => {
    const { user: s, loading: r } = Qt(),
      a = vs();
    if (r)
      return t.jsx("div", {
        className:
          "min-h-screen flex items-center justify-center text-sm text-gray-500",
        children: "Loading...",
      });
    if (!s) {
      const l = encodeURIComponent(a.pathname + a.search);
      return t.jsx(We, { to: `/auth?redirect=${l}`, replace: !0 });
    }
    return s.role !== "admin"
      ? t.jsx(We, { to: "/blog", replace: !0 })
      : t.jsx(t.Fragment, { children: e });
  },
  Ua = () =>
    t.jsx(u.Suspense, {
      fallback: t.jsx("div", {
        className:
          "min-h-screen flex items-center justify-center text-sm text-gray-500",
        children: "Loading...",
      }),
      children: t.jsxs(fs, {
        children: [
          t.jsx(X, { path: "/", element: t.jsx(La, {}) }),
          t.jsx(X, { path: "/blog", element: t.jsx(Ba, {}) }),
          t.jsx(X, {
            path: "/blog/admin",
            element: t.jsx(Wa, { children: t.jsx(Oa, {}) }),
          }),
          t.jsx(X, { path: "/blog/:id", element: t.jsx(Da, {}) }),
          t.jsx(X, { path: "/auth", element: t.jsx(Va, {}) }),
          t.jsx(X, { path: "/contact", element: t.jsx(qa, {}) }),
          t.jsx(X, { path: "/privacy", element: t.jsx($a, {}) }),
          t.jsx(X, { path: "/terms", element: t.jsx(Ha, {}) }),
          t.jsx(X, {
            path: "/admin",
            element: t.jsx(We, { to: "/auth", replace: !0 }),
          }),
          t.jsx(X, { path: "*", element: t.jsx(Ga, {}) }),
        ],
      }),
    }),
  Ya = () =>
    t.jsx(xs, {
      client: Fa,
      children: t.jsx(bs, {
        children: t.jsx(pa, {
          children: t.jsxs(da, {
            children: [
              t.jsx(Ir, {}),
              t.jsx(la, {}),
              t.jsx(Ua, {}),
              t.jsx(xa, {}),
            ],
          }),
        }),
      }),
    }),
  to = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Ya },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  );
export {
  to as A,
  ue as B,
  za as F,
  ka as H,
  Gs as M,
  Dt as S,
  eo as a,
  $ as b,
  _ as c,
  Pe as d,
  Ia as e,
  Ea as l,
  q as s,
  Qt as u,
};
