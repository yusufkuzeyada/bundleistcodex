import { r as v, g } from "./react.js";
var y = { exports: {} },
  d = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _;
function h() {
  if (_) return d;
  _ = 1;
  var e = v(),
    t = Symbol.for("react.element"),
    o = Symbol.for("react.fragment"),
    n = Object.prototype.hasOwnProperty,
    r = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(u, s, f) {
    var c,
      p = {},
      m = null,
      R = null;
    (f !== void 0 && (m = "" + f),
      s.key !== void 0 && (m = "" + s.key),
      s.ref !== void 0 && (R = s.ref));
    for (c in s) n.call(s, c) && !i.hasOwnProperty(c) && (p[c] = s[c]);
    if (u && u.defaultProps)
      for (c in ((s = u.defaultProps), s)) p[c] === void 0 && (p[c] = s[c]);
    return {
      $$typeof: t,
      type: u,
      key: m,
      ref: R,
      props: p,
      _owner: r.current,
    };
  }
  return ((d.Fragment = o), (d.jsx = a), (d.jsxs = a), d);
}
var x;
function C() {
  return (x || ((x = 1), (y.exports = h())), y.exports);
}
var E = C(),
  l = v();
const D = g(l);
function S(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function O(...e) {
  return (t) => {
    let o = !1;
    const n = e.map((r) => {
      const i = S(r, t);
      return (!o && typeof i == "function" && (o = !0), i);
    });
    if (o)
      return () => {
        for (let r = 0; r < n.length; r++) {
          const i = n[r];
          typeof i == "function" ? i() : S(e[r], null);
        }
      };
  };
}
function j(e) {
  const t = b(e),
    o = l.forwardRef((n, r) => {
      const { children: i, ...a } = n,
        u = l.Children.toArray(i),
        s = u.find(I);
      if (s) {
        const f = s.props.children,
          c = u.map((p) =>
            p === s
              ? l.Children.count(f) > 1
                ? l.Children.only(null)
                : l.isValidElement(f)
                  ? f.props.children
                  : null
              : p,
          );
        return E.jsx(t, {
          ...a,
          ref: r,
          children: l.isValidElement(f) ? l.cloneElement(f, void 0, c) : null,
        });
      }
      return E.jsx(t, { ...a, ref: r, children: i });
    });
  return ((o.displayName = `${e}.Slot`), o);
}
var T = j("Slot");
function b(e) {
  const t = l.forwardRef((o, n) => {
    const { children: r, ...i } = o;
    if (l.isValidElement(r)) {
      const a = N(r),
        u = w(i, r.props);
      return (
        r.type !== l.Fragment && (u.ref = n ? O(n, a) : a),
        l.cloneElement(r, u)
      );
    }
    return l.Children.count(r) > 1 ? l.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var P = Symbol("radix.slottable");
function I(e) {
  return (
    l.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === P
  );
}
function w(e, t) {
  const o = { ...t };
  for (const n in t) {
    const r = e[n],
      i = t[n];
    /^on[A-Z]/.test(n)
      ? r && i
        ? (o[n] = (...u) => {
            const s = i(...u);
            return (r(...u), s);
          })
        : r && (o[n] = r)
      : n === "style"
        ? (o[n] = { ...r, ...i })
        : n === "className" && (o[n] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...o };
}
function N(e) {
  var n, r;
  let t =
      (n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
        ? void 0
        : n.get,
    o = t && "isReactWarning" in t && t.isReactWarning;
  return o
    ? e.ref
    : ((t =
        (r = Object.getOwnPropertyDescriptor(e, "ref")) == null
          ? void 0
          : r.get),
      (o = t && "isReactWarning" in t && t.isReactWarning),
      o ? e.props.ref : e.props.ref || e.ref);
}
export { D as R, T as S, E as j, l as r };
