import { r as c, e as me, a as Gt, G as es, R as ts } from "./react.js";
import { j as w } from "./query.js";
function M(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (o) {
    if ((e == null || e(o), n === !1 || !o.defaultPrevented))
      return t == null ? void 0 : t(o);
  };
}
function ns(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function st(...e) {
  return (t) => e.forEach((n) => ns(n, t));
}
function W(...e) {
  return c.useCallback(st(...e), e);
}
function rs(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = c.createContext(i),
      l = n.length;
    n = [...n, i];
    function u(d) {
      const { scope: p, children: v, ...h } = d,
        m = (p == null ? void 0 : p[e][l]) || a,
        g = c.useMemo(() => h, Object.values(h));
      return w.jsx(m.Provider, { value: g, children: v });
    }
    function f(d, p) {
      const v = (p == null ? void 0 : p[e][l]) || a,
        h = c.useContext(v);
      if (h) return h;
      if (i !== void 0) return i;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return ((u.displayName = s + "Provider"), [u, f]);
  }
  const o = () => {
    const s = n.map((i) => c.createContext(i));
    return function (a) {
      const l = (a == null ? void 0 : a[e]) || s;
      return c.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: l } }), [a, l]);
    };
  };
  return ((o.scopeName = e), [r, os(o, ...t)]);
}
function os(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (s) {
      const i = r.reduce((a, { useScope: l, scopeName: u }) => {
        const d = l(s)[`__scope${u}`];
        return { ...a, ...d };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
var Oe = c.forwardRef((e, t) => {
  const { children: n, ...r } = e,
    o = c.Children.toArray(n),
    s = o.find(ss);
  if (s) {
    const i = s.props.children,
      a = o.map((l) =>
        l === s
          ? c.Children.count(i) > 1
            ? c.Children.only(null)
            : c.isValidElement(i)
              ? i.props.children
              : null
          : l,
      );
    return w.jsx(Nt, {
      ...r,
      ref: t,
      children: c.isValidElement(i) ? c.cloneElement(i, void 0, a) : null,
    });
  }
  return w.jsx(Nt, { ...r, ref: t, children: n });
});
Oe.displayName = "Slot";
var Nt = c.forwardRef((e, t) => {
  const { children: n, ...r } = e;
  if (c.isValidElement(n)) {
    const o = as(n);
    return c.cloneElement(n, { ...is(r, n.props), ref: t ? st(t, o) : o });
  }
  return c.Children.count(n) > 1 ? c.Children.only(null) : null;
});
Nt.displayName = "SlotClone";
var Gn = ({ children: e }) => w.jsx(w.Fragment, { children: e });
function ss(e) {
  return c.isValidElement(e) && e.type === Gn;
}
function is(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r],
      s = t[r];
    /^on[A-Z]/.test(r)
      ? o && s
        ? (n[r] = (...a) => {
            (s(...a), o(...a));
          })
        : o && (n[r] = o)
      : r === "style"
        ? (n[r] = { ...o, ...s })
        : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function as(e) {
  var r, o;
  let t =
      (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
        ? void 0
        : r.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t =
        (o = Object.getOwnPropertyDescriptor(e, "ref")) == null
          ? void 0
          : o.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function Yt(e) {
  const t = e + "CollectionProvider",
    [n, r] = rs(t),
    [o, s] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    i = (v) => {
      const { scope: h, children: m } = v,
        g = me.useRef(null),
        x = me.useRef(new Map()).current;
      return w.jsx(o, { scope: h, itemMap: x, collectionRef: g, children: m });
    };
  i.displayName = t;
  const a = e + "CollectionSlot",
    l = me.forwardRef((v, h) => {
      const { scope: m, children: g } = v,
        x = s(a, m),
        y = W(h, x.collectionRef);
      return w.jsx(Oe, { ref: y, children: g });
    });
  l.displayName = a;
  const u = e + "CollectionItemSlot",
    f = "data-radix-collection-item",
    d = me.forwardRef((v, h) => {
      const { scope: m, children: g, ...x } = v,
        y = me.useRef(null),
        b = W(h, y),
        E = s(u, m);
      return (
        me.useEffect(
          () => (
            E.itemMap.set(y, { ref: y, ...x }),
            () => void E.itemMap.delete(y)
          ),
        ),
        w.jsx(Oe, { [f]: "", ref: b, children: g })
      );
    });
  d.displayName = u;
  function p(v) {
    const h = s(e + "CollectionConsumer", v);
    return me.useCallback(() => {
      const g = h.collectionRef.current;
      if (!g) return [];
      const x = Array.from(g.querySelectorAll(`[${f}]`));
      return Array.from(h.itemMap.values()).sort(
        (E, C) => x.indexOf(E.ref.current) - x.indexOf(C.ref.current),
      );
    }, [h.collectionRef, h.itemMap]);
  }
  return [{ Provider: i, Slot: l, ItemSlot: d }, p, r];
}
function Fe(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = c.createContext(i),
      l = n.length;
    n = [...n, i];
    const u = (d) => {
      var x;
      const { scope: p, children: v, ...h } = d,
        m = ((x = p == null ? void 0 : p[e]) == null ? void 0 : x[l]) || a,
        g = c.useMemo(() => h, Object.values(h));
      return w.jsx(m.Provider, { value: g, children: v });
    };
    u.displayName = s + "Provider";
    function f(d, p) {
      var m;
      const v = ((m = p == null ? void 0 : p[e]) == null ? void 0 : m[l]) || a,
        h = c.useContext(v);
      if (h) return h;
      if (i !== void 0) return i;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [u, f];
  }
  const o = () => {
    const s = n.map((i) => c.createContext(i));
    return function (a) {
      const l = (a == null ? void 0 : a[e]) || s;
      return c.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: l } }), [a, l]);
    };
  };
  return ((o.scopeName = e), [r, cs(o, ...t)]);
}
function cs(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (s) {
      const i = r.reduce((a, { useScope: l, scopeName: u }) => {
        const d = l(s)[`__scope${u}`];
        return { ...a, ...d };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
var us = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "span",
    "svg",
    "ul",
  ],
  j = us.reduce((e, t) => {
    const n = c.forwardRef((r, o) => {
      const { asChild: s, ...i } = r,
        a = s ? Oe : t;
      return (
        typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
        w.jsx(a, { ...i, ref: o })
      );
    });
    return ((n.displayName = `Primitive.${t}`), { ...e, [t]: n });
  }, {});
function Xt(e, t) {
  e && Gt.flushSync(() => e.dispatchEvent(t));
}
function V(e) {
  const t = c.useRef(e);
  return (
    c.useEffect(() => {
      t.current = e;
    }),
    c.useMemo(
      () =>
        (...n) => {
          var r;
          return (r = t.current) == null ? void 0 : r.call(t, ...n);
        },
      [],
    )
  );
}
function ls(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = V(e);
  c.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return (
      t.addEventListener("keydown", r, { capture: !0 }),
      () => t.removeEventListener("keydown", r, { capture: !0 })
    );
  }, [n, t]);
}
var ds = "DismissableLayer",
  Dt = "dismissableLayer.update",
  fs = "dismissableLayer.pointerDownOutside",
  ps = "dismissableLayer.focusOutside",
  Cn,
  Yn = c.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  it = c.forwardRef((e, t) => {
    const {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: r,
        onPointerDownOutside: o,
        onFocusOutside: s,
        onInteractOutside: i,
        onDismiss: a,
        ...l
      } = e,
      u = c.useContext(Yn),
      [f, d] = c.useState(null),
      p =
        (f == null ? void 0 : f.ownerDocument) ??
        (globalThis == null ? void 0 : globalThis.document),
      [, v] = c.useState({}),
      h = W(t, (S) => d(S)),
      m = Array.from(u.layers),
      [g] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1),
      x = m.indexOf(g),
      y = f ? m.indexOf(f) : -1,
      b = u.layersWithOutsidePointerEventsDisabled.size > 0,
      E = y >= x,
      C = vs((S) => {
        const A = S.target,
          I = [...u.branches].some((N) => N.contains(A));
        !E ||
          I ||
          (o == null || o(S),
          i == null || i(S),
          S.defaultPrevented || a == null || a());
      }, p),
      P = hs((S) => {
        const A = S.target;
        [...u.branches].some((N) => N.contains(A)) ||
          (s == null || s(S),
          i == null || i(S),
          S.defaultPrevented || a == null || a());
      }, p);
    return (
      ls((S) => {
        y === u.layers.size - 1 &&
          (r == null || r(S),
          !S.defaultPrevented && a && (S.preventDefault(), a()));
      }, p),
      c.useEffect(() => {
        if (f)
          return (
            n &&
              (u.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Cn = p.body.style.pointerEvents),
                (p.body.style.pointerEvents = "none")),
              u.layersWithOutsidePointerEventsDisabled.add(f)),
            u.layers.add(f),
            Rn(),
            () => {
              n &&
                u.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (p.body.style.pointerEvents = Cn);
            }
          );
      }, [f, p, n, u]),
      c.useEffect(
        () => () => {
          f &&
            (u.layers.delete(f),
            u.layersWithOutsidePointerEventsDisabled.delete(f),
            Rn());
        },
        [f, u],
      ),
      c.useEffect(() => {
        const S = () => v({});
        return (
          document.addEventListener(Dt, S),
          () => document.removeEventListener(Dt, S)
        );
      }, []),
      w.jsx(j.div, {
        ...l,
        ref: h,
        style: {
          pointerEvents: b ? (E ? "auto" : "none") : void 0,
          ...e.style,
        },
        onFocusCapture: M(e.onFocusCapture, P.onFocusCapture),
        onBlurCapture: M(e.onBlurCapture, P.onBlurCapture),
        onPointerDownCapture: M(e.onPointerDownCapture, C.onPointerDownCapture),
      })
    );
  });
it.displayName = ds;
var ms = "DismissableLayerBranch",
  Xn = c.forwardRef((e, t) => {
    const n = c.useContext(Yn),
      r = c.useRef(null),
      o = W(t, r);
    return (
      c.useEffect(() => {
        const s = r.current;
        if (s)
          return (
            n.branches.add(s),
            () => {
              n.branches.delete(s);
            }
          );
      }, [n.branches]),
      w.jsx(j.div, { ...e, ref: o })
    );
  });
Xn.displayName = ms;
function vs(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = V(e),
    r = c.useRef(!1),
    o = c.useRef(() => {});
  return (
    c.useEffect(() => {
      const s = (a) => {
          if (a.target && !r.current) {
            let l = function () {
              zn(fs, n, u, { discrete: !0 });
            };
            const u = { originalEvent: a };
            a.pointerType === "touch"
              ? (t.removeEventListener("click", o.current),
                (o.current = l),
                t.addEventListener("click", o.current, { once: !0 }))
              : l();
          } else t.removeEventListener("click", o.current);
          r.current = !1;
        },
        i = window.setTimeout(() => {
          t.addEventListener("pointerdown", s);
        }, 0);
      return () => {
        (window.clearTimeout(i),
          t.removeEventListener("pointerdown", s),
          t.removeEventListener("click", o.current));
      };
    }, [t, n]),
    { onPointerDownCapture: () => (r.current = !0) }
  );
}
function hs(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = V(e),
    r = c.useRef(!1);
  return (
    c.useEffect(() => {
      const o = (s) => {
        s.target &&
          !r.current &&
          zn(ps, n, { originalEvent: s }, { discrete: !1 });
      };
      return (
        t.addEventListener("focusin", o),
        () => t.removeEventListener("focusin", o)
      );
    }, [t, n]),
    {
      onFocusCapture: () => (r.current = !0),
      onBlurCapture: () => (r.current = !1),
    }
  );
}
function Rn() {
  const e = new CustomEvent(Dt);
  document.dispatchEvent(e);
}
function zn(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target,
    s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && o.addEventListener(e, t, { once: !0 }),
    r ? Xt(o, s) : o.dispatchEvent(s));
}
var gs = it,
  ws = Xn,
  ae = globalThis != null && globalThis.document ? c.useLayoutEffect : () => {},
  xs = "Portal",
  zt = c.forwardRef((e, t) => {
    var a;
    const { container: n, ...r } = e,
      [o, s] = c.useState(!1);
    ae(() => s(!0), []);
    const i =
      n ||
      (o &&
        ((a = globalThis == null ? void 0 : globalThis.document) == null
          ? void 0
          : a.body));
    return i ? es.createPortal(w.jsx(j.div, { ...r, ref: t }), i) : null;
  });
zt.displayName = xs;
function ys(e, t) {
  return c.useReducer((n, r) => t[n][r] ?? n, e);
}
var fe = (e) => {
  const { present: t, children: n } = e,
    r = bs(t),
    o =
      typeof n == "function" ? n({ present: r.isPresent }) : c.Children.only(n),
    s = W(r.ref, Es(o));
  return typeof n == "function" || r.isPresent
    ? c.cloneElement(o, { ref: s })
    : null;
};
fe.displayName = "Presence";
function bs(e) {
  const [t, n] = c.useState(),
    r = c.useRef({}),
    o = c.useRef(e),
    s = c.useRef("none"),
    i = e ? "mounted" : "unmounted",
    [a, l] = ys(i, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    c.useEffect(() => {
      const u = Ke(r.current);
      s.current = a === "mounted" ? u : "none";
    }, [a]),
    ae(() => {
      const u = r.current,
        f = o.current;
      if (f !== e) {
        const p = s.current,
          v = Ke(u);
        (e
          ? l("MOUNT")
          : v === "none" || (u == null ? void 0 : u.display) === "none"
            ? l("UNMOUNT")
            : l(f && p !== v ? "ANIMATION_OUT" : "UNMOUNT"),
          (o.current = e));
      }
    }, [e, l]),
    ae(() => {
      if (t) {
        let u;
        const f = t.ownerDocument.defaultView ?? window,
          d = (v) => {
            const m = Ke(r.current).includes(v.animationName);
            if (v.target === t && m && (l("ANIMATION_END"), !o.current)) {
              const g = t.style.animationFillMode;
              ((t.style.animationFillMode = "forwards"),
                (u = f.setTimeout(() => {
                  t.style.animationFillMode === "forwards" &&
                    (t.style.animationFillMode = g);
                })));
            }
          },
          p = (v) => {
            v.target === t && (s.current = Ke(r.current));
          };
        return (
          t.addEventListener("animationstart", p),
          t.addEventListener("animationcancel", d),
          t.addEventListener("animationend", d),
          () => {
            (f.clearTimeout(u),
              t.removeEventListener("animationstart", p),
              t.removeEventListener("animationcancel", d),
              t.removeEventListener("animationend", d));
          }
        );
      } else l("ANIMATION_END");
    }, [t, l]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(a),
      ref: c.useCallback((u) => {
        (u && (r.current = getComputedStyle(u)), n(u));
      }, []),
    }
  );
}
function Ke(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Es(e) {
  var r, o;
  let t =
      (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
        ? void 0
        : r.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t =
        (o = Object.getOwnPropertyDescriptor(e, "ref")) == null
          ? void 0
          : o.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function at({ prop: e, defaultProp: t, onChange: n = () => {} }) {
  const [r, o] = Cs({ defaultProp: t, onChange: n }),
    s = e !== void 0,
    i = s ? e : r,
    a = V(n),
    l = c.useCallback(
      (u) => {
        if (s) {
          const d = typeof u == "function" ? u(e) : u;
          d !== e && a(d);
        } else o(u);
      },
      [s, e, o, a],
    );
  return [i, l];
}
function Cs({ defaultProp: e, onChange: t }) {
  const n = c.useState(e),
    [r] = n,
    o = c.useRef(r),
    s = V(t);
  return (
    c.useEffect(() => {
      o.current !== r && (s(r), (o.current = r));
    }, [r, o, s]),
    n
  );
}
var Rs = "VisuallyHidden",
  ct = c.forwardRef((e, t) =>
    w.jsx(j.span, {
      ...e,
      ref: t,
      style: {
        position: "absolute",
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal",
        ...e.style,
      },
    }),
  );
ct.displayName = Rs;
var Ts = ct,
  qt = "ToastProvider",
  [Zt, Ss, Ps] = Yt("Toast"),
  [qn, Ou] = Fe("Toast", [Ps]),
  [Ms, ut] = qn(qt),
  Zn = (e) => {
    const {
        __scopeToast: t,
        label: n = "Notification",
        duration: r = 5e3,
        swipeDirection: o = "right",
        swipeThreshold: s = 50,
        children: i,
      } = e,
      [a, l] = c.useState(null),
      [u, f] = c.useState(0),
      d = c.useRef(!1),
      p = c.useRef(!1);
    return (
      n.trim() ||
        console.error(
          `Invalid prop \`label\` supplied to \`${qt}\`. Expected non-empty \`string\`.`,
        ),
      w.jsx(Zt.Provider, {
        scope: t,
        children: w.jsx(Ms, {
          scope: t,
          label: n,
          duration: r,
          swipeDirection: o,
          swipeThreshold: s,
          toastCount: u,
          viewport: a,
          onViewportChange: l,
          onToastAdd: c.useCallback(() => f((v) => v + 1), []),
          onToastRemove: c.useCallback(() => f((v) => v - 1), []),
          isFocusedToastEscapeKeyDownRef: d,
          isClosePausedRef: p,
          children: i,
        }),
      })
    );
  };
Zn.displayName = qt;
var Qn = "ToastViewport",
  As = ["F8"],
  Lt = "toast.viewportPause",
  Ft = "toast.viewportResume",
  Jn = c.forwardRef((e, t) => {
    const {
        __scopeToast: n,
        hotkey: r = As,
        label: o = "Notifications ({hotkey})",
        ...s
      } = e,
      i = ut(Qn, n),
      a = Ss(n),
      l = c.useRef(null),
      u = c.useRef(null),
      f = c.useRef(null),
      d = c.useRef(null),
      p = W(t, d, i.onViewportChange),
      v = r.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
      h = i.toastCount > 0;
    (c.useEffect(() => {
      const g = (x) => {
        var b;
        r.length !== 0 &&
          r.every((E) => x[E] || x.code === E) &&
          ((b = d.current) == null || b.focus());
      };
      return (
        document.addEventListener("keydown", g),
        () => document.removeEventListener("keydown", g)
      );
    }, [r]),
      c.useEffect(() => {
        const g = l.current,
          x = d.current;
        if (h && g && x) {
          const y = () => {
              if (!i.isClosePausedRef.current) {
                const P = new CustomEvent(Lt);
                (x.dispatchEvent(P), (i.isClosePausedRef.current = !0));
              }
            },
            b = () => {
              if (i.isClosePausedRef.current) {
                const P = new CustomEvent(Ft);
                (x.dispatchEvent(P), (i.isClosePausedRef.current = !1));
              }
            },
            E = (P) => {
              !g.contains(P.relatedTarget) && b();
            },
            C = () => {
              g.contains(document.activeElement) || b();
            };
          return (
            g.addEventListener("focusin", y),
            g.addEventListener("focusout", E),
            g.addEventListener("pointermove", y),
            g.addEventListener("pointerleave", C),
            window.addEventListener("blur", y),
            window.addEventListener("focus", b),
            () => {
              (g.removeEventListener("focusin", y),
                g.removeEventListener("focusout", E),
                g.removeEventListener("pointermove", y),
                g.removeEventListener("pointerleave", C),
                window.removeEventListener("blur", y),
                window.removeEventListener("focus", b));
            }
          );
        }
      }, [h, i.isClosePausedRef]));
    const m = c.useCallback(
      ({ tabbingDirection: g }) => {
        const y = a().map((b) => {
          const E = b.ref.current,
            C = [E, ...Ks(E)];
          return g === "forwards" ? C : C.reverse();
        });
        return (g === "forwards" ? y.reverse() : y).flat();
      },
      [a],
    );
    return (
      c.useEffect(() => {
        const g = d.current;
        if (g) {
          const x = (y) => {
            var C, P, S;
            const b = y.altKey || y.ctrlKey || y.metaKey;
            if (y.key === "Tab" && !b) {
              const A = document.activeElement,
                I = y.shiftKey;
              if (y.target === g && I) {
                (C = u.current) == null || C.focus();
                return;
              }
              const D = m({ tabbingDirection: I ? "backwards" : "forwards" }),
                L = D.findIndex((R) => R === A);
              Et(D.slice(L + 1))
                ? y.preventDefault()
                : I
                  ? (P = u.current) == null || P.focus()
                  : (S = f.current) == null || S.focus();
            }
          };
          return (
            g.addEventListener("keydown", x),
            () => g.removeEventListener("keydown", x)
          );
        }
      }, [a, m]),
      w.jsxs(ws, {
        ref: l,
        role: "region",
        "aria-label": o.replace("{hotkey}", v),
        tabIndex: -1,
        style: { pointerEvents: h ? void 0 : "none" },
        children: [
          h &&
            w.jsx(kt, {
              ref: u,
              onFocusFromOutsideViewport: () => {
                const g = m({ tabbingDirection: "forwards" });
                Et(g);
              },
            }),
          w.jsx(Zt.Slot, {
            scope: n,
            children: w.jsx(j.ol, { tabIndex: -1, ...s, ref: p }),
          }),
          h &&
            w.jsx(kt, {
              ref: f,
              onFocusFromOutsideViewport: () => {
                const g = m({ tabbingDirection: "backwards" });
                Et(g);
              },
            }),
        ],
      })
    );
  });
Jn.displayName = Qn;
var er = "ToastFocusProxy",
  kt = c.forwardRef((e, t) => {
    const { __scopeToast: n, onFocusFromOutsideViewport: r, ...o } = e,
      s = ut(er, n);
    return w.jsx(ct, {
      "aria-hidden": !0,
      tabIndex: 0,
      ...o,
      ref: t,
      style: { position: "fixed" },
      onFocus: (i) => {
        var u;
        const a = i.relatedTarget;
        !((u = s.viewport) != null && u.contains(a)) && r();
      },
    });
  });
kt.displayName = er;
var lt = "Toast",
  _s = "toast.swipeStart",
  Os = "toast.swipeMove",
  Is = "toast.swipeCancel",
  Ns = "toast.swipeEnd",
  tr = c.forwardRef((e, t) => {
    const { forceMount: n, open: r, defaultOpen: o, onOpenChange: s, ...i } = e,
      [a = !0, l] = at({ prop: r, defaultProp: o, onChange: s });
    return w.jsx(fe, {
      present: n || a,
      children: w.jsx(Fs, {
        open: a,
        ...i,
        ref: t,
        onClose: () => l(!1),
        onPause: V(e.onPause),
        onResume: V(e.onResume),
        onSwipeStart: M(e.onSwipeStart, (u) => {
          u.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: M(e.onSwipeMove, (u) => {
          const { x: f, y: d } = u.detail.delta;
          (u.currentTarget.setAttribute("data-swipe", "move"),
            u.currentTarget.style.setProperty(
              "--radix-toast-swipe-move-x",
              `${f}px`,
            ),
            u.currentTarget.style.setProperty(
              "--radix-toast-swipe-move-y",
              `${d}px`,
            ));
        }),
        onSwipeCancel: M(e.onSwipeCancel, (u) => {
          (u.currentTarget.setAttribute("data-swipe", "cancel"),
            u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
            u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
            u.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),
            u.currentTarget.style.removeProperty("--radix-toast-swipe-end-y"));
        }),
        onSwipeEnd: M(e.onSwipeEnd, (u) => {
          const { x: f, y: d } = u.detail.delta;
          (u.currentTarget.setAttribute("data-swipe", "end"),
            u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
            u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
            u.currentTarget.style.setProperty(
              "--radix-toast-swipe-end-x",
              `${f}px`,
            ),
            u.currentTarget.style.setProperty(
              "--radix-toast-swipe-end-y",
              `${d}px`,
            ),
            l(!1));
        }),
      }),
    });
  });
tr.displayName = lt;
var [Ds, Ls] = qn(lt, { onClose() {} }),
  Fs = c.forwardRef((e, t) => {
    const {
        __scopeToast: n,
        type: r = "foreground",
        duration: o,
        open: s,
        onClose: i,
        onEscapeKeyDown: a,
        onPause: l,
        onResume: u,
        onSwipeStart: f,
        onSwipeMove: d,
        onSwipeCancel: p,
        onSwipeEnd: v,
        ...h
      } = e,
      m = ut(lt, n),
      [g, x] = c.useState(null),
      y = W(t, (R) => x(R)),
      b = c.useRef(null),
      E = c.useRef(null),
      C = o || m.duration,
      P = c.useRef(0),
      S = c.useRef(C),
      A = c.useRef(0),
      { onToastAdd: I, onToastRemove: N } = m,
      k = V(() => {
        var F;
        ((g == null ? void 0 : g.contains(document.activeElement)) &&
          ((F = m.viewport) == null || F.focus()),
          i());
      }),
      D = c.useCallback(
        (R) => {
          !R ||
            R === 1 / 0 ||
            (window.clearTimeout(A.current),
            (P.current = new Date().getTime()),
            (A.current = window.setTimeout(k, R)));
        },
        [k],
      );
    (c.useEffect(() => {
      const R = m.viewport;
      if (R) {
        const F = () => {
            (D(S.current), u == null || u());
          },
          O = () => {
            const $ = new Date().getTime() - P.current;
            ((S.current = S.current - $),
              window.clearTimeout(A.current),
              l == null || l());
          };
        return (
          R.addEventListener(Lt, O),
          R.addEventListener(Ft, F),
          () => {
            (R.removeEventListener(Lt, O), R.removeEventListener(Ft, F));
          }
        );
      }
    }, [m.viewport, C, l, u, D]),
      c.useEffect(() => {
        s && !m.isClosePausedRef.current && D(C);
      }, [s, C, m.isClosePausedRef, D]),
      c.useEffect(() => (I(), () => N()), [I, N]));
    const L = c.useMemo(() => (g ? cr(g) : null), [g]);
    return m.viewport
      ? w.jsxs(w.Fragment, {
          children: [
            L &&
              w.jsx(ks, {
                __scopeToast: n,
                role: "status",
                "aria-live": r === "foreground" ? "assertive" : "polite",
                "aria-atomic": !0,
                children: L,
              }),
            w.jsx(Ds, {
              scope: n,
              onClose: k,
              children: Gt.createPortal(
                w.jsx(Zt.ItemSlot, {
                  scope: n,
                  children: w.jsx(gs, {
                    asChild: !0,
                    onEscapeKeyDown: M(a, () => {
                      (m.isFocusedToastEscapeKeyDownRef.current || k(),
                        (m.isFocusedToastEscapeKeyDownRef.current = !1));
                    }),
                    children: w.jsx(j.li, {
                      role: "status",
                      "aria-live": "off",
                      "aria-atomic": !0,
                      tabIndex: 0,
                      "data-state": s ? "open" : "closed",
                      "data-swipe-direction": m.swipeDirection,
                      ...h,
                      ref: y,
                      style: {
                        userSelect: "none",
                        touchAction: "none",
                        ...e.style,
                      },
                      onKeyDown: M(e.onKeyDown, (R) => {
                        R.key === "Escape" &&
                          (a == null || a(R.nativeEvent),
                          R.nativeEvent.defaultPrevented ||
                            ((m.isFocusedToastEscapeKeyDownRef.current = !0),
                            k()));
                      }),
                      onPointerDown: M(e.onPointerDown, (R) => {
                        R.button === 0 &&
                          (b.current = { x: R.clientX, y: R.clientY });
                      }),
                      onPointerMove: M(e.onPointerMove, (R) => {
                        if (!b.current) return;
                        const F = R.clientX - b.current.x,
                          O = R.clientY - b.current.y,
                          $ = !!E.current,
                          _ = ["left", "right"].includes(m.swipeDirection),
                          T = ["left", "up"].includes(m.swipeDirection)
                            ? Math.min
                            : Math.max,
                          B = _ ? T(0, F) : 0,
                          K = _ ? 0 : T(0, O),
                          H = R.pointerType === "touch" ? 10 : 2,
                          Q = { x: B, y: K },
                          se = { originalEvent: R, delta: Q };
                        $
                          ? ((E.current = Q), Ve(Os, d, se, { discrete: !1 }))
                          : Tn(Q, m.swipeDirection, H)
                            ? ((E.current = Q),
                              Ve(_s, f, se, { discrete: !1 }),
                              R.target.setPointerCapture(R.pointerId))
                            : (Math.abs(F) > H || Math.abs(O) > H) &&
                              (b.current = null);
                      }),
                      onPointerUp: M(e.onPointerUp, (R) => {
                        const F = E.current,
                          O = R.target;
                        if (
                          (O.hasPointerCapture(R.pointerId) &&
                            O.releasePointerCapture(R.pointerId),
                          (E.current = null),
                          (b.current = null),
                          F)
                        ) {
                          const $ = R.currentTarget,
                            _ = { originalEvent: R, delta: F };
                          (Tn(F, m.swipeDirection, m.swipeThreshold)
                            ? Ve(Ns, v, _, { discrete: !0 })
                            : Ve(Is, p, _, { discrete: !0 }),
                            $.addEventListener(
                              "click",
                              (T) => T.preventDefault(),
                              { once: !0 },
                            ));
                        }
                      }),
                    }),
                  }),
                }),
                m.viewport,
              ),
            }),
          ],
        })
      : null;
  }),
  ks = (e) => {
    const { __scopeToast: t, children: n, ...r } = e,
      o = ut(lt, t),
      [s, i] = c.useState(!1),
      [a, l] = c.useState(!1);
    return (
      Bs(() => i(!0)),
      c.useEffect(() => {
        const u = window.setTimeout(() => l(!0), 1e3);
        return () => window.clearTimeout(u);
      }, []),
      a
        ? null
        : w.jsx(zt, {
            asChild: !0,
            children: w.jsx(ct, {
              ...r,
              children:
                s && w.jsxs(w.Fragment, { children: [o.label, " ", n] }),
            }),
          })
    );
  },
  js = "ToastTitle",
  nr = c.forwardRef((e, t) => {
    const { __scopeToast: n, ...r } = e;
    return w.jsx(j.div, { ...r, ref: t });
  });
nr.displayName = js;
var $s = "ToastDescription",
  rr = c.forwardRef((e, t) => {
    const { __scopeToast: n, ...r } = e;
    return w.jsx(j.div, { ...r, ref: t });
  });
rr.displayName = $s;
var or = "ToastAction",
  sr = c.forwardRef((e, t) => {
    const { altText: n, ...r } = e;
    return n.trim()
      ? w.jsx(ar, {
          altText: n,
          asChild: !0,
          children: w.jsx(Qt, { ...r, ref: t }),
        })
      : (console.error(
          `Invalid prop \`altText\` supplied to \`${or}\`. Expected non-empty \`string\`.`,
        ),
        null);
  });
sr.displayName = or;
var ir = "ToastClose",
  Qt = c.forwardRef((e, t) => {
    const { __scopeToast: n, ...r } = e,
      o = Ls(ir, n);
    return w.jsx(ar, {
      asChild: !0,
      children: w.jsx(j.button, {
        type: "button",
        ...r,
        ref: t,
        onClick: M(e.onClick, o.onClose),
      }),
    });
  });
Qt.displayName = ir;
var ar = c.forwardRef((e, t) => {
  const { __scopeToast: n, altText: r, ...o } = e;
  return w.jsx(j.div, {
    "data-radix-toast-announce-exclude": "",
    "data-radix-toast-announce-alt": r || void 0,
    ...o,
    ref: t,
  });
});
function cr(e) {
  const t = [];
  return (
    Array.from(e.childNodes).forEach((r) => {
      if (
        (r.nodeType === r.TEXT_NODE && r.textContent && t.push(r.textContent),
        Ws(r))
      ) {
        const o = r.ariaHidden || r.hidden || r.style.display === "none",
          s = r.dataset.radixToastAnnounceExclude === "";
        if (!o)
          if (s) {
            const i = r.dataset.radixToastAnnounceAlt;
            i && t.push(i);
          } else t.push(...cr(r));
      }
    }),
    t
  );
}
function Ve(e, t, n, { discrete: r }) {
  const o = n.originalEvent.currentTarget,
    s = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: n });
  (t && o.addEventListener(e, t, { once: !0 }),
    r ? Xt(o, s) : o.dispatchEvent(s));
}
var Tn = (e, t, n = 0) => {
  const r = Math.abs(e.x),
    o = Math.abs(e.y),
    s = r > o;
  return t === "left" || t === "right" ? s && r > n : !s && o > n;
};
function Bs(e = () => {}) {
  const t = V(e);
  ae(() => {
    let n = 0,
      r = 0;
    return (
      (n = window.requestAnimationFrame(
        () => (r = window.requestAnimationFrame(t)),
      )),
      () => {
        (window.cancelAnimationFrame(n), window.cancelAnimationFrame(r));
      }
    );
  }, [t]);
}
function Ws(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function Ks(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const o = r.tagName === "INPUT" && r.type === "hidden";
        return r.disabled || r.hidden || o
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Et(e) {
  const t = document.activeElement;
  return e.some((n) =>
    n === t ? !0 : (n.focus(), document.activeElement !== t),
  );
}
var Iu = Zn,
  Nu = Jn,
  Du = tr,
  Lu = nr,
  Fu = rr,
  ku = sr,
  ju = Qt,
  Vs = ts.useId || (() => {}),
  Us = 0;
function Qe(e) {
  const [t, n] = c.useState(Vs());
  return (
    ae(() => {
      e || n((r) => r ?? String(Us++));
    }, [e]),
    e || (t ? `radix-${t}` : "")
  );
}
const Hs = ["top", "right", "bottom", "left"],
  ce = Math.min,
  G = Math.max,
  Je = Math.round,
  Ue = Math.floor,
  ue = (e) => ({ x: e, y: e }),
  Gs = { left: "right", right: "left", bottom: "top", top: "bottom" },
  Ys = { start: "end", end: "start" };
function jt(e, t, n) {
  return G(e, ce(t, n));
}
function re(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function oe(e) {
  return e.split("-")[0];
}
function Te(e) {
  return e.split("-")[1];
}
function Jt(e) {
  return e === "x" ? "y" : "x";
}
function en(e) {
  return e === "y" ? "height" : "width";
}
function le(e) {
  return ["top", "bottom"].includes(oe(e)) ? "y" : "x";
}
function tn(e) {
  return Jt(le(e));
}
function Xs(e, t, n) {
  n === void 0 && (n = !1);
  const r = Te(e),
    o = tn(e),
    s = en(o);
  let i =
    o === "x"
      ? r === (n ? "end" : "start")
        ? "right"
        : "left"
      : r === "start"
        ? "bottom"
        : "top";
  return (t.reference[s] > t.floating[s] && (i = et(i)), [i, et(i)]);
}
function zs(e) {
  const t = et(e);
  return [$t(e), t, $t(t)];
}
function $t(e) {
  return e.replace(/start|end/g, (t) => Ys[t]);
}
function qs(e, t, n) {
  const r = ["left", "right"],
    o = ["right", "left"],
    s = ["top", "bottom"],
    i = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? o : r) : t ? r : o;
    case "left":
    case "right":
      return t ? s : i;
    default:
      return [];
  }
}
function Zs(e, t, n, r) {
  const o = Te(e);
  let s = qs(oe(e), n === "start", r);
  return (
    o && ((s = s.map((i) => i + "-" + o)), t && (s = s.concat(s.map($t)))),
    s
  );
}
function et(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Gs[t]);
}
function Qs(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function ur(e) {
  return typeof e != "number"
    ? Qs(e)
    : { top: e, right: e, bottom: e, left: e };
}
function tt(e) {
  const { x: t, y: n, width: r, height: o } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n,
  };
}
function Sn(e, t, n) {
  let { reference: r, floating: o } = e;
  const s = le(t),
    i = tn(t),
    a = en(i),
    l = oe(t),
    u = s === "y",
    f = r.x + r.width / 2 - o.width / 2,
    d = r.y + r.height / 2 - o.height / 2,
    p = r[a] / 2 - o[a] / 2;
  let v;
  switch (l) {
    case "top":
      v = { x: f, y: r.y - o.height };
      break;
    case "bottom":
      v = { x: f, y: r.y + r.height };
      break;
    case "right":
      v = { x: r.x + r.width, y: d };
      break;
    case "left":
      v = { x: r.x - o.width, y: d };
      break;
    default:
      v = { x: r.x, y: r.y };
  }
  switch (Te(t)) {
    case "start":
      v[i] -= p * (n && u ? -1 : 1);
      break;
    case "end":
      v[i] += p * (n && u ? -1 : 1);
      break;
  }
  return v;
}
const Js = async (e, t, n) => {
  const {
      placement: r = "bottom",
      strategy: o = "absolute",
      middleware: s = [],
      platform: i,
    } = n,
    a = s.filter(Boolean),
    l = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let u = await i.getElementRects({ reference: e, floating: t, strategy: o }),
    { x: f, y: d } = Sn(u, r, l),
    p = r,
    v = {},
    h = 0;
  for (let m = 0; m < a.length; m++) {
    const { name: g, fn: x } = a[m],
      {
        x: y,
        y: b,
        data: E,
        reset: C,
      } = await x({
        x: f,
        y: d,
        initialPlacement: r,
        placement: p,
        strategy: o,
        middlewareData: v,
        rects: u,
        platform: i,
        elements: { reference: e, floating: t },
      });
    ((f = y ?? f),
      (d = b ?? d),
      (v = { ...v, [g]: { ...v[g], ...E } }),
      C &&
        h <= 50 &&
        (h++,
        typeof C == "object" &&
          (C.placement && (p = C.placement),
          C.rects &&
            (u =
              C.rects === !0
                ? await i.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: o,
                  })
                : C.rects),
          ({ x: f, y: d } = Sn(u, p, l))),
        (m = -1)));
  }
  return { x: f, y: d, placement: p, strategy: o, middlewareData: v };
};
async function Ie(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: o, platform: s, rects: i, elements: a, strategy: l } = e,
    {
      boundary: u = "clippingAncestors",
      rootBoundary: f = "viewport",
      elementContext: d = "floating",
      altBoundary: p = !1,
      padding: v = 0,
    } = re(t, e),
    h = ur(v),
    g = a[p ? (d === "floating" ? "reference" : "floating") : d],
    x = tt(
      await s.getClippingRect({
        element:
          (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null ||
          n
            ? g
            : g.contextElement ||
              (await (s.getDocumentElement == null
                ? void 0
                : s.getDocumentElement(a.floating))),
        boundary: u,
        rootBoundary: f,
        strategy: l,
      }),
    ),
    y =
      d === "floating"
        ? { x: r, y: o, width: i.floating.width, height: i.floating.height }
        : i.reference,
    b = await (s.getOffsetParent == null
      ? void 0
      : s.getOffsetParent(a.floating)),
    E = (await (s.isElement == null ? void 0 : s.isElement(b)))
      ? (await (s.getScale == null ? void 0 : s.getScale(b))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    C = tt(
      s.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: a,
            rect: y,
            offsetParent: b,
            strategy: l,
          })
        : y,
    );
  return {
    top: (x.top - C.top + h.top) / E.y,
    bottom: (C.bottom - x.bottom + h.bottom) / E.y,
    left: (x.left - C.left + h.left) / E.x,
    right: (C.right - x.right + h.right) / E.x,
  };
}
const ei = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const {
          x: n,
          y: r,
          placement: o,
          rects: s,
          platform: i,
          elements: a,
          middlewareData: l,
        } = t,
        { element: u, padding: f = 0 } = re(e, t) || {};
      if (u == null) return {};
      const d = ur(f),
        p = { x: n, y: r },
        v = tn(o),
        h = en(v),
        m = await i.getDimensions(u),
        g = v === "y",
        x = g ? "top" : "left",
        y = g ? "bottom" : "right",
        b = g ? "clientHeight" : "clientWidth",
        E = s.reference[h] + s.reference[v] - p[v] - s.floating[h],
        C = p[v] - s.reference[v],
        P = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(u));
      let S = P ? P[b] : 0;
      (!S || !(await (i.isElement == null ? void 0 : i.isElement(P)))) &&
        (S = a.floating[b] || s.floating[h]);
      const A = E / 2 - C / 2,
        I = S / 2 - m[h] / 2 - 1,
        N = ce(d[x], I),
        k = ce(d[y], I),
        D = N,
        L = S - m[h] - k,
        R = S / 2 - m[h] / 2 + A,
        F = jt(D, R, L),
        O =
          !l.arrow &&
          Te(o) != null &&
          R !== F &&
          s.reference[h] / 2 - (R < D ? N : k) - m[h] / 2 < 0,
        $ = O ? (R < D ? R - D : R - L) : 0;
      return {
        [v]: p[v] + $,
        data: {
          [v]: F,
          centerOffset: R - F - $,
          ...(O && { alignmentOffset: $ }),
        },
        reset: O,
      };
    },
  }),
  ti = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n, r;
          const {
              placement: o,
              middlewareData: s,
              rects: i,
              initialPlacement: a,
              platform: l,
              elements: u,
            } = t,
            {
              mainAxis: f = !0,
              crossAxis: d = !0,
              fallbackPlacements: p,
              fallbackStrategy: v = "bestFit",
              fallbackAxisSideDirection: h = "none",
              flipAlignment: m = !0,
              ...g
            } = re(e, t);
          if ((n = s.arrow) != null && n.alignmentOffset) return {};
          const x = oe(o),
            y = le(a),
            b = oe(a) === a,
            E = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)),
            C = p || (b || !m ? [et(a)] : zs(a)),
            P = h !== "none";
          !p && P && C.push(...Zs(a, m, h, E));
          const S = [a, ...C],
            A = await Ie(t, g),
            I = [];
          let N = ((r = s.flip) == null ? void 0 : r.overflows) || [];
          if ((f && I.push(A[x]), d)) {
            const R = Xs(o, i, E);
            I.push(A[R[0]], A[R[1]]);
          }
          if (
            ((N = [...N, { placement: o, overflows: I }]),
            !I.every((R) => R <= 0))
          ) {
            var k, D;
            const R = (((k = s.flip) == null ? void 0 : k.index) || 0) + 1,
              F = S[R];
            if (F)
              return {
                data: { index: R, overflows: N },
                reset: { placement: F },
              };
            let O =
              (D = N.filter(($) => $.overflows[0] <= 0).sort(
                ($, _) => $.overflows[1] - _.overflows[1],
              )[0]) == null
                ? void 0
                : D.placement;
            if (!O)
              switch (v) {
                case "bestFit": {
                  var L;
                  const $ =
                    (L = N.filter((_) => {
                      if (P) {
                        const T = le(_.placement);
                        return T === y || T === "y";
                      }
                      return !0;
                    })
                      .map((_) => [
                        _.placement,
                        _.overflows
                          .filter((T) => T > 0)
                          .reduce((T, B) => T + B, 0),
                      ])
                      .sort((_, T) => _[1] - T[1])[0]) == null
                      ? void 0
                      : L[0];
                  $ && (O = $);
                  break;
                }
                case "initialPlacement":
                  O = a;
                  break;
              }
            if (o !== O) return { reset: { placement: O } };
          }
          return {};
        },
      }
    );
  };
function Pn(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function Mn(e) {
  return Hs.some((t) => e[t] >= 0);
}
const ni = function (e) {
  return (
    e === void 0 && (e = {}),
    {
      name: "hide",
      options: e,
      async fn(t) {
        const { rects: n } = t,
          { strategy: r = "referenceHidden", ...o } = re(e, t);
        switch (r) {
          case "referenceHidden": {
            const s = await Ie(t, { ...o, elementContext: "reference" }),
              i = Pn(s, n.reference);
            return {
              data: { referenceHiddenOffsets: i, referenceHidden: Mn(i) },
            };
          }
          case "escaped": {
            const s = await Ie(t, { ...o, altBoundary: !0 }),
              i = Pn(s, n.floating);
            return { data: { escapedOffsets: i, escaped: Mn(i) } };
          }
          default:
            return {};
        }
      },
    }
  );
};
async function ri(e, t) {
  const { placement: n, platform: r, elements: o } = e,
    s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)),
    i = oe(n),
    a = Te(n),
    l = le(n) === "y",
    u = ["left", "top"].includes(i) ? -1 : 1,
    f = s && l ? -1 : 1,
    d = re(t, e);
  let {
    mainAxis: p,
    crossAxis: v,
    alignmentAxis: h,
  } = typeof d == "number"
    ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: d.mainAxis || 0,
        crossAxis: d.crossAxis || 0,
        alignmentAxis: d.alignmentAxis,
      };
  return (
    a && typeof h == "number" && (v = a === "end" ? h * -1 : h),
    l ? { x: v * f, y: p * u } : { x: p * u, y: v * f }
  );
}
const oi = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var n, r;
          const { x: o, y: s, placement: i, middlewareData: a } = t,
            l = await ri(t, e);
          return i === ((n = a.offset) == null ? void 0 : n.placement) &&
            (r = a.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: o + l.x, y: s + l.y, data: { ...l, placement: i } };
        },
      }
    );
  },
  si = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: o } = t,
            {
              mainAxis: s = !0,
              crossAxis: i = !1,
              limiter: a = {
                fn: (g) => {
                  let { x, y } = g;
                  return { x, y };
                },
              },
              ...l
            } = re(e, t),
            u = { x: n, y: r },
            f = await Ie(t, l),
            d = le(oe(o)),
            p = Jt(d);
          let v = u[p],
            h = u[d];
          if (s) {
            const g = p === "y" ? "top" : "left",
              x = p === "y" ? "bottom" : "right",
              y = v + f[g],
              b = v - f[x];
            v = jt(y, v, b);
          }
          if (i) {
            const g = d === "y" ? "top" : "left",
              x = d === "y" ? "bottom" : "right",
              y = h + f[g],
              b = h - f[x];
            h = jt(y, h, b);
          }
          const m = a.fn({ ...t, [p]: v, [d]: h });
          return {
            ...m,
            data: { x: m.x - n, y: m.y - r, enabled: { [p]: s, [d]: i } },
          };
        },
      }
    );
  },
  ii = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: r, placement: o, rects: s, middlewareData: i } = t,
            { offset: a = 0, mainAxis: l = !0, crossAxis: u = !0 } = re(e, t),
            f = { x: n, y: r },
            d = le(o),
            p = Jt(d);
          let v = f[p],
            h = f[d];
          const m = re(a, t),
            g =
              typeof m == "number"
                ? { mainAxis: m, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...m };
          if (l) {
            const b = p === "y" ? "height" : "width",
              E = s.reference[p] - s.floating[b] + g.mainAxis,
              C = s.reference[p] + s.reference[b] - g.mainAxis;
            v < E ? (v = E) : v > C && (v = C);
          }
          if (u) {
            var x, y;
            const b = p === "y" ? "width" : "height",
              E = ["top", "left"].includes(oe(o)),
              C =
                s.reference[d] -
                s.floating[b] +
                ((E && ((x = i.offset) == null ? void 0 : x[d])) || 0) +
                (E ? 0 : g.crossAxis),
              P =
                s.reference[d] +
                s.reference[b] +
                (E ? 0 : ((y = i.offset) == null ? void 0 : y[d]) || 0) -
                (E ? g.crossAxis : 0);
            h < C ? (h = C) : h > P && (h = P);
          }
          return { [p]: v, [d]: h };
        },
      }
    );
  },
  ai = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(t) {
          var n, r;
          const { placement: o, rects: s, platform: i, elements: a } = t,
            { apply: l = () => {}, ...u } = re(e, t),
            f = await Ie(t, u),
            d = oe(o),
            p = Te(o),
            v = le(o) === "y",
            { width: h, height: m } = s.floating;
          let g, x;
          d === "top" || d === "bottom"
            ? ((g = d),
              (x =
                p ===
                ((await (i.isRTL == null ? void 0 : i.isRTL(a.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((x = d), (g = p === "end" ? "top" : "bottom"));
          const y = m - f.top - f.bottom,
            b = h - f.left - f.right,
            E = ce(m - f[g], y),
            C = ce(h - f[x], b),
            P = !t.middlewareData.shift;
          let S = E,
            A = C;
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (A = b),
            (r = t.middlewareData.shift) != null && r.enabled.y && (S = y),
            P && !p)
          ) {
            const N = G(f.left, 0),
              k = G(f.right, 0),
              D = G(f.top, 0),
              L = G(f.bottom, 0);
            v
              ? (A = h - 2 * (N !== 0 || k !== 0 ? N + k : G(f.left, f.right)))
              : (S = m - 2 * (D !== 0 || L !== 0 ? D + L : G(f.top, f.bottom)));
          }
          await l({ ...t, availableWidth: A, availableHeight: S });
          const I = await i.getDimensions(a.floating);
          return h !== I.width || m !== I.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function dt() {
  return typeof window < "u";
}
function Se(e) {
  return lr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Y(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function te(e) {
  var t;
  return (t = (lr(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function lr(e) {
  return dt() ? e instanceof Node || e instanceof Y(e).Node : !1;
}
function q(e) {
  return dt() ? e instanceof Element || e instanceof Y(e).Element : !1;
}
function ee(e) {
  return dt() ? e instanceof HTMLElement || e instanceof Y(e).HTMLElement : !1;
}
function An(e) {
  return !dt() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof Y(e).ShadowRoot;
}
function ke(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: o } = Z(e);
  return (
    /auto|scroll|overlay|hidden|clip/.test(t + r + n) &&
    !["inline", "contents"].includes(o)
  );
}
function ci(e) {
  return ["table", "td", "th"].includes(Se(e));
}
function ft(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function nn(e) {
  const t = rn(),
    n = q(e) ? Z(e) : e;
  return (
    n.transform !== "none" ||
    n.perspective !== "none" ||
    (n.containerType ? n.containerType !== "normal" : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== "none" : !1)) ||
    (!t && (n.filter ? n.filter !== "none" : !1)) ||
    ["transform", "perspective", "filter"].some((r) =>
      (n.willChange || "").includes(r),
    ) ||
    ["paint", "layout", "strict", "content"].some((r) =>
      (n.contain || "").includes(r),
    )
  );
}
function ui(e) {
  let t = de(e);
  for (; ee(t) && !Ce(t); ) {
    if (nn(t)) return t;
    if (ft(t)) return null;
    t = de(t);
  }
  return null;
}
function rn() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
function Ce(e) {
  return ["html", "body", "#document"].includes(Se(e));
}
function Z(e) {
  return Y(e).getComputedStyle(e);
}
function pt(e) {
  return q(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function de(e) {
  if (Se(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (An(e) && e.host) || te(e);
  return An(t) ? t.host : t;
}
function dr(e) {
  const t = de(e);
  return Ce(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : ee(t) && ke(t)
      ? t
      : dr(t);
}
function Ne(e, t, n) {
  var r;
  (t === void 0 && (t = []), n === void 0 && (n = !0));
  const o = dr(e),
    s = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
    i = Y(o);
  if (s) {
    const a = Bt(i);
    return t.concat(
      i,
      i.visualViewport || [],
      ke(o) ? o : [],
      a && n ? Ne(a) : [],
    );
  }
  return t.concat(o, Ne(o, [], n));
}
function Bt(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function fr(e) {
  const t = Z(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const o = ee(e),
    s = o ? e.offsetWidth : n,
    i = o ? e.offsetHeight : r,
    a = Je(n) !== s || Je(r) !== i;
  return (a && ((n = s), (r = i)), { width: n, height: r, $: a });
}
function on(e) {
  return q(e) ? e : e.contextElement;
}
function be(e) {
  const t = on(e);
  if (!ee(t)) return ue(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: o, $: s } = fr(t);
  let i = (s ? Je(n.width) : n.width) / r,
    a = (s ? Je(n.height) : n.height) / o;
  return (
    (!i || !Number.isFinite(i)) && (i = 1),
    (!a || !Number.isFinite(a)) && (a = 1),
    { x: i, y: a }
  );
}
const li = ue(0);
function pr(e) {
  const t = Y(e);
  return !rn() || !t.visualViewport
    ? li
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function di(e, t, n) {
  return (t === void 0 && (t = !1), !n || (t && n !== Y(e)) ? !1 : t);
}
function ve(e, t, n, r) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  const o = e.getBoundingClientRect(),
    s = on(e);
  let i = ue(1);
  t && (r ? q(r) && (i = be(r)) : (i = be(e)));
  const a = di(s, n, r) ? pr(s) : ue(0);
  let l = (o.left + a.x) / i.x,
    u = (o.top + a.y) / i.y,
    f = o.width / i.x,
    d = o.height / i.y;
  if (s) {
    const p = Y(s),
      v = r && q(r) ? Y(r) : r;
    let h = p,
      m = Bt(h);
    for (; m && r && v !== h; ) {
      const g = be(m),
        x = m.getBoundingClientRect(),
        y = Z(m),
        b = x.left + (m.clientLeft + parseFloat(y.paddingLeft)) * g.x,
        E = x.top + (m.clientTop + parseFloat(y.paddingTop)) * g.y;
      ((l *= g.x),
        (u *= g.y),
        (f *= g.x),
        (d *= g.y),
        (l += b),
        (u += E),
        (h = Y(m)),
        (m = Bt(h)));
    }
  }
  return tt({ width: f, height: d, x: l, y: u });
}
function fi(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: o } = e;
  const s = o === "fixed",
    i = te(r),
    a = t ? ft(t.floating) : !1;
  if (r === i || (a && s)) return n;
  let l = { scrollLeft: 0, scrollTop: 0 },
    u = ue(1);
  const f = ue(0),
    d = ee(r);
  if (
    (d || (!d && !s)) &&
    ((Se(r) !== "body" || ke(i)) && (l = pt(r)), ee(r))
  ) {
    const p = ve(r);
    ((u = be(r)), (f.x = p.x + r.clientLeft), (f.y = p.y + r.clientTop));
  }
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - l.scrollLeft * u.x + f.x,
    y: n.y * u.y - l.scrollTop * u.y + f.y,
  };
}
function pi(e) {
  return Array.from(e.getClientRects());
}
function Wt(e, t) {
  const n = pt(e).scrollLeft;
  return t ? t.left + n : ve(te(e)).left + n;
}
function mi(e) {
  const t = te(e),
    n = pt(e),
    r = e.ownerDocument.body,
    o = G(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    s = G(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + Wt(e);
  const a = -n.scrollTop;
  return (
    Z(r).direction === "rtl" && (i += G(t.clientWidth, r.clientWidth) - o),
    { width: o, height: s, x: i, y: a }
  );
}
function vi(e, t) {
  const n = Y(e),
    r = te(e),
    o = n.visualViewport;
  let s = r.clientWidth,
    i = r.clientHeight,
    a = 0,
    l = 0;
  if (o) {
    ((s = o.width), (i = o.height));
    const u = rn();
    (!u || (u && t === "fixed")) && ((a = o.offsetLeft), (l = o.offsetTop));
  }
  return { width: s, height: i, x: a, y: l };
}
function hi(e, t) {
  const n = ve(e, !0, t === "fixed"),
    r = n.top + e.clientTop,
    o = n.left + e.clientLeft,
    s = ee(e) ? be(e) : ue(1),
    i = e.clientWidth * s.x,
    a = e.clientHeight * s.y,
    l = o * s.x,
    u = r * s.y;
  return { width: i, height: a, x: l, y: u };
}
function _n(e, t, n) {
  let r;
  if (t === "viewport") r = vi(e, n);
  else if (t === "document") r = mi(te(e));
  else if (q(t)) r = hi(t, n);
  else {
    const o = pr(e);
    r = { ...t, x: t.x - o.x, y: t.y - o.y };
  }
  return tt(r);
}
function mr(e, t) {
  const n = de(e);
  return n === t || !q(n) || Ce(n) ? !1 : Z(n).position === "fixed" || mr(n, t);
}
function gi(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = Ne(e, [], !1).filter((a) => q(a) && Se(a) !== "body"),
    o = null;
  const s = Z(e).position === "fixed";
  let i = s ? de(e) : e;
  for (; q(i) && !Ce(i); ) {
    const a = Z(i),
      l = nn(i);
    (!l && a.position === "fixed" && (o = null),
      (
        s
          ? !l && !o
          : (!l &&
              a.position === "static" &&
              !!o &&
              ["absolute", "fixed"].includes(o.position)) ||
            (ke(i) && !l && mr(e, i))
      )
        ? (r = r.filter((f) => f !== i))
        : (o = a),
      (i = de(i)));
  }
  return (t.set(e, r), r);
}
function wi(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: o } = e;
  const i = [
      ...(n === "clippingAncestors"
        ? ft(t)
          ? []
          : gi(t, this._c)
        : [].concat(n)),
      r,
    ],
    a = i[0],
    l = i.reduce(
      (u, f) => {
        const d = _n(t, f, o);
        return (
          (u.top = G(d.top, u.top)),
          (u.right = ce(d.right, u.right)),
          (u.bottom = ce(d.bottom, u.bottom)),
          (u.left = G(d.left, u.left)),
          u
        );
      },
      _n(t, a, o),
    );
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top,
  };
}
function xi(e) {
  const { width: t, height: n } = fr(e);
  return { width: t, height: n };
}
function yi(e, t, n) {
  const r = ee(t),
    o = te(t),
    s = n === "fixed",
    i = ve(e, !0, s, t);
  let a = { scrollLeft: 0, scrollTop: 0 };
  const l = ue(0);
  if (r || (!r && !s))
    if (((Se(t) !== "body" || ke(o)) && (a = pt(t)), r)) {
      const v = ve(t, !0, s, t);
      ((l.x = v.x + t.clientLeft), (l.y = v.y + t.clientTop));
    } else o && (l.x = Wt(o));
  let u = 0,
    f = 0;
  if (o && !r && !s) {
    const v = o.getBoundingClientRect();
    ((f = v.top + a.scrollTop), (u = v.left + a.scrollLeft - Wt(o, v)));
  }
  const d = i.left + a.scrollLeft - l.x - u,
    p = i.top + a.scrollTop - l.y - f;
  return { x: d, y: p, width: i.width, height: i.height };
}
function Ct(e) {
  return Z(e).position === "static";
}
function On(e, t) {
  if (!ee(e) || Z(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (te(e) === n && (n = n.ownerDocument.body), n);
}
function vr(e, t) {
  const n = Y(e);
  if (ft(e)) return n;
  if (!ee(e)) {
    let o = de(e);
    for (; o && !Ce(o); ) {
      if (q(o) && !Ct(o)) return o;
      o = de(o);
    }
    return n;
  }
  let r = On(e, t);
  for (; r && ci(r) && Ct(r); ) r = On(r, t);
  return r && Ce(r) && Ct(r) && !nn(r) ? n : r || ui(e) || n;
}
const bi = async function (e) {
  const t = this.getOffsetParent || vr,
    n = this.getDimensions,
    r = await n(e.floating);
  return {
    reference: yi(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function Ei(e) {
  return Z(e).direction === "rtl";
}
const Ci = {
  convertOffsetParentRelativeRectToViewportRelativeRect: fi,
  getDocumentElement: te,
  getClippingRect: wi,
  getOffsetParent: vr,
  getElementRects: bi,
  getClientRects: pi,
  getDimensions: xi,
  getScale: be,
  isElement: q,
  isRTL: Ei,
};
function Ri(e, t) {
  let n = null,
    r;
  const o = te(e);
  function s() {
    var a;
    (clearTimeout(r), (a = n) == null || a.disconnect(), (n = null));
  }
  function i(a, l) {
    (a === void 0 && (a = !1), l === void 0 && (l = 1), s());
    const { left: u, top: f, width: d, height: p } = e.getBoundingClientRect();
    if ((a || t(), !d || !p)) return;
    const v = Ue(f),
      h = Ue(o.clientWidth - (u + d)),
      m = Ue(o.clientHeight - (f + p)),
      g = Ue(u),
      y = {
        rootMargin: -v + "px " + -h + "px " + -m + "px " + -g + "px",
        threshold: G(0, ce(1, l)) || 1,
      };
    let b = !0;
    function E(C) {
      const P = C[0].intersectionRatio;
      if (P !== l) {
        if (!b) return i();
        P
          ? i(!1, P)
          : (r = setTimeout(() => {
              i(!1, 1e-7);
            }, 1e3));
      }
      b = !1;
    }
    try {
      n = new IntersectionObserver(E, { ...y, root: o.ownerDocument });
    } catch {
      n = new IntersectionObserver(E, y);
    }
    n.observe(e);
  }
  return (i(!0), s);
}
function Ti(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: o = !0,
      ancestorResize: s = !0,
      elementResize: i = typeof ResizeObserver == "function",
      layoutShift: a = typeof IntersectionObserver == "function",
      animationFrame: l = !1,
    } = r,
    u = on(e),
    f = o || s ? [...(u ? Ne(u) : []), ...Ne(t)] : [];
  f.forEach((x) => {
    (o && x.addEventListener("scroll", n, { passive: !0 }),
      s && x.addEventListener("resize", n));
  });
  const d = u && a ? Ri(u, n) : null;
  let p = -1,
    v = null;
  i &&
    ((v = new ResizeObserver((x) => {
      let [y] = x;
      (y &&
        y.target === u &&
        v &&
        (v.unobserve(t),
        cancelAnimationFrame(p),
        (p = requestAnimationFrame(() => {
          var b;
          (b = v) == null || b.observe(t);
        }))),
        n());
    })),
    u && !l && v.observe(u),
    v.observe(t));
  let h,
    m = l ? ve(e) : null;
  l && g();
  function g() {
    const x = ve(e);
    (m &&
      (x.x !== m.x ||
        x.y !== m.y ||
        x.width !== m.width ||
        x.height !== m.height) &&
      n(),
      (m = x),
      (h = requestAnimationFrame(g)));
  }
  return (
    n(),
    () => {
      var x;
      (f.forEach((y) => {
        (o && y.removeEventListener("scroll", n),
          s && y.removeEventListener("resize", n));
      }),
        d == null || d(),
        (x = v) == null || x.disconnect(),
        (v = null),
        l && cancelAnimationFrame(h));
    }
  );
}
const Si = oi,
  Pi = si,
  Mi = ti,
  Ai = ai,
  _i = ni,
  In = ei,
  Oi = ii,
  Ii = (e, t, n) => {
    const r = new Map(),
      o = { platform: Ci, ...n },
      s = { ...o.platform, _c: r };
    return Js(e, t, { ...o, platform: s });
  };
var ze = typeof document < "u" ? c.useLayoutEffect : c.useEffect;
function nt(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == "function" && e.toString() === t.toString()) return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!nt(e[r], t[r])) return !1;
      return !0;
    }
    if (((o = Object.keys(e)), (n = o.length), n !== Object.keys(t).length))
      return !1;
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, o[r])) return !1;
    for (r = n; r-- !== 0; ) {
      const s = o[r];
      if (!(s === "_owner" && e.$$typeof) && !nt(e[s], t[s])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function hr(e) {
  return typeof window > "u"
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Nn(e, t) {
  const n = hr(e);
  return Math.round(t * n) / n;
}
function Rt(e) {
  const t = c.useRef(e);
  return (
    ze(() => {
      t.current = e;
    }),
    t
  );
}
function Ni(e) {
  e === void 0 && (e = {});
  const {
      placement: t = "bottom",
      strategy: n = "absolute",
      middleware: r = [],
      platform: o,
      elements: { reference: s, floating: i } = {},
      transform: a = !0,
      whileElementsMounted: l,
      open: u,
    } = e,
    [f, d] = c.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [p, v] = c.useState(r);
  nt(p, r) || v(r);
  const [h, m] = c.useState(null),
    [g, x] = c.useState(null),
    y = c.useCallback((_) => {
      _ !== P.current && ((P.current = _), m(_));
    }, []),
    b = c.useCallback((_) => {
      _ !== S.current && ((S.current = _), x(_));
    }, []),
    E = s || h,
    C = i || g,
    P = c.useRef(null),
    S = c.useRef(null),
    A = c.useRef(f),
    I = l != null,
    N = Rt(l),
    k = Rt(o),
    D = Rt(u),
    L = c.useCallback(() => {
      if (!P.current || !S.current) return;
      const _ = { placement: t, strategy: n, middleware: p };
      (k.current && (_.platform = k.current),
        Ii(P.current, S.current, _).then((T) => {
          const B = { ...T, isPositioned: D.current !== !1 };
          R.current &&
            !nt(A.current, B) &&
            ((A.current = B),
            Gt.flushSync(() => {
              d(B);
            }));
        }));
    }, [p, t, n, k, D]);
  ze(() => {
    u === !1 &&
      A.current.isPositioned &&
      ((A.current.isPositioned = !1), d((_) => ({ ..._, isPositioned: !1 })));
  }, [u]);
  const R = c.useRef(!1);
  (ze(
    () => (
      (R.current = !0),
      () => {
        R.current = !1;
      }
    ),
    [],
  ),
    ze(() => {
      if ((E && (P.current = E), C && (S.current = C), E && C)) {
        if (N.current) return N.current(E, C, L);
        L();
      }
    }, [E, C, L, N, I]));
  const F = c.useMemo(
      () => ({ reference: P, floating: S, setReference: y, setFloating: b }),
      [y, b],
    ),
    O = c.useMemo(() => ({ reference: E, floating: C }), [E, C]),
    $ = c.useMemo(() => {
      const _ = { position: n, left: 0, top: 0 };
      if (!O.floating) return _;
      const T = Nn(O.floating, f.x),
        B = Nn(O.floating, f.y);
      return a
        ? {
            ..._,
            transform: "translate(" + T + "px, " + B + "px)",
            ...(hr(O.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: n, left: T, top: B };
    }, [n, a, O.floating, f.x, f.y]);
  return c.useMemo(
    () => ({ ...f, update: L, refs: F, elements: O, floatingStyles: $ }),
    [f, L, F, O, $],
  );
}
const Di = (e) => {
    function t(n) {
      return {}.hasOwnProperty.call(n, "current");
    }
    return {
      name: "arrow",
      options: e,
      fn(n) {
        const { element: r, padding: o } = typeof e == "function" ? e(n) : e;
        return r && t(r)
          ? r.current != null
            ? In({ element: r.current, padding: o }).fn(n)
            : {}
          : r
            ? In({ element: r, padding: o }).fn(n)
            : {};
      },
    };
  },
  Li = (e, t) => ({ ...Si(e), options: [e, t] }),
  Fi = (e, t) => ({ ...Pi(e), options: [e, t] }),
  ki = (e, t) => ({ ...Oi(e), options: [e, t] }),
  ji = (e, t) => ({ ...Mi(e), options: [e, t] }),
  $i = (e, t) => ({ ...Ai(e), options: [e, t] }),
  Bi = (e, t) => ({ ..._i(e), options: [e, t] }),
  Wi = (e, t) => ({ ...Di(e), options: [e, t] });
var Ki = "Arrow",
  gr = c.forwardRef((e, t) => {
    const { children: n, width: r = 10, height: o = 5, ...s } = e;
    return w.jsx(j.svg, {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : w.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
gr.displayName = Ki;
var Vi = gr;
function Ui(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = c.createContext(i),
      l = n.length;
    n = [...n, i];
    function u(d) {
      const { scope: p, children: v, ...h } = d,
        m = (p == null ? void 0 : p[e][l]) || a,
        g = c.useMemo(() => h, Object.values(h));
      return w.jsx(m.Provider, { value: g, children: v });
    }
    function f(d, p) {
      const v = (p == null ? void 0 : p[e][l]) || a,
        h = c.useContext(v);
      if (h) return h;
      if (i !== void 0) return i;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return ((u.displayName = s + "Provider"), [u, f]);
  }
  const o = () => {
    const s = n.map((i) => c.createContext(i));
    return function (a) {
      const l = (a == null ? void 0 : a[e]) || s;
      return c.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: l } }), [a, l]);
    };
  };
  return ((o.scopeName = e), [r, Hi(o, ...t)]);
}
function Hi(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (s) {
      const i = r.reduce((a, { useScope: l, scopeName: u }) => {
        const d = l(s)[`__scope${u}`];
        return { ...a, ...d };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
function Gi(e) {
  const [t, n] = c.useState(void 0);
  return (
    ae(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        const r = new ResizeObserver((o) => {
          if (!Array.isArray(o) || !o.length) return;
          const s = o[0];
          let i, a;
          if ("borderBoxSize" in s) {
            const l = s.borderBoxSize,
              u = Array.isArray(l) ? l[0] : l;
            ((i = u.inlineSize), (a = u.blockSize));
          } else ((i = e.offsetWidth), (a = e.offsetHeight));
          n({ width: i, height: a });
        });
        return (r.observe(e, { box: "border-box" }), () => r.unobserve(e));
      } else n(void 0);
    }, [e]),
    t
  );
}
var sn = "Popper",
  [wr, mt] = Ui(sn),
  [Yi, xr] = wr(sn),
  yr = (e) => {
    const { __scopePopper: t, children: n } = e,
      [r, o] = c.useState(null);
    return w.jsx(Yi, { scope: t, anchor: r, onAnchorChange: o, children: n });
  };
yr.displayName = sn;
var br = "PopperAnchor",
  Er = c.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e,
      s = xr(br, n),
      i = c.useRef(null),
      a = W(t, i);
    return (
      c.useEffect(() => {
        s.onAnchorChange((r == null ? void 0 : r.current) || i.current);
      }),
      r ? null : w.jsx(j.div, { ...o, ref: a })
    );
  });
Er.displayName = br;
var an = "PopperContent",
  [Xi, zi] = wr(an),
  Cr = c.forwardRef((e, t) => {
    var ne, Pe, X, Me, yn, bn;
    const {
        __scopePopper: n,
        side: r = "bottom",
        sideOffset: o = 0,
        align: s = "center",
        alignOffset: i = 0,
        arrowPadding: a = 0,
        avoidCollisions: l = !0,
        collisionBoundary: u = [],
        collisionPadding: f = 0,
        sticky: d = "partial",
        hideWhenDetached: p = !1,
        updatePositionStrategy: v = "optimized",
        onPlaced: h,
        ...m
      } = e,
      g = xr(an, n),
      [x, y] = c.useState(null),
      b = W(t, (Ae) => y(Ae)),
      [E, C] = c.useState(null),
      P = Gi(E),
      S = (P == null ? void 0 : P.width) ?? 0,
      A = (P == null ? void 0 : P.height) ?? 0,
      I = r + (s !== "center" ? "-" + s : ""),
      N =
        typeof f == "number"
          ? f
          : { top: 0, right: 0, bottom: 0, left: 0, ...f },
      k = Array.isArray(u) ? u : [u],
      D = k.length > 0,
      L = { padding: N, boundary: k.filter(Zi), altBoundary: D },
      {
        refs: R,
        floatingStyles: F,
        placement: O,
        isPositioned: $,
        middlewareData: _,
      } = Ni({
        strategy: "fixed",
        placement: I,
        whileElementsMounted: (...Ae) =>
          Ti(...Ae, { animationFrame: v === "always" }),
        elements: { reference: g.anchor },
        middleware: [
          Li({ mainAxis: o + A, alignmentAxis: i }),
          l &&
            Fi({
              mainAxis: !0,
              crossAxis: !1,
              limiter: d === "partial" ? ki() : void 0,
              ...L,
            }),
          l && ji({ ...L }),
          $i({
            ...L,
            apply: ({
              elements: Ae,
              rects: En,
              availableWidth: qo,
              availableHeight: Zo,
            }) => {
              const { width: Qo, height: Jo } = En.reference,
                We = Ae.floating.style;
              (We.setProperty("--radix-popper-available-width", `${qo}px`),
                We.setProperty("--radix-popper-available-height", `${Zo}px`),
                We.setProperty("--radix-popper-anchor-width", `${Qo}px`),
                We.setProperty("--radix-popper-anchor-height", `${Jo}px`));
            },
          }),
          E && Wi({ element: E, padding: a }),
          Qi({ arrowWidth: S, arrowHeight: A }),
          p && Bi({ strategy: "referenceHidden", ...L }),
        ],
      }),
      [T, B] = Sr(O),
      K = V(h);
    ae(() => {
      $ && (K == null || K());
    }, [$, K]);
    const H = (ne = _.arrow) == null ? void 0 : ne.x,
      Q = (Pe = _.arrow) == null ? void 0 : Pe.y,
      se = ((X = _.arrow) == null ? void 0 : X.centerOffset) !== 0,
      [Be, pe] = c.useState();
    return (
      ae(() => {
        x && pe(window.getComputedStyle(x).zIndex);
      }, [x]),
      w.jsx("div", {
        ref: R.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...F,
          transform: $ ? F.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: Be,
          "--radix-popper-transform-origin": [
            (Me = _.transformOrigin) == null ? void 0 : Me.x,
            (yn = _.transformOrigin) == null ? void 0 : yn.y,
          ].join(" "),
          ...(((bn = _.hide) == null ? void 0 : bn.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: e.dir,
        children: w.jsx(Xi, {
          scope: n,
          placedSide: T,
          onArrowChange: C,
          arrowX: H,
          arrowY: Q,
          shouldHideArrow: se,
          children: w.jsx(j.div, {
            "data-side": T,
            "data-align": B,
            ...m,
            ref: b,
            style: { ...m.style, animation: $ ? void 0 : "none" },
          }),
        }),
      })
    );
  });
Cr.displayName = an;
var Rr = "PopperArrow",
  qi = { top: "bottom", right: "left", bottom: "top", left: "right" },
  Tr = c.forwardRef(function (t, n) {
    const { __scopePopper: r, ...o } = t,
      s = zi(Rr, r),
      i = qi[s.placedSide];
    return w.jsx("span", {
      ref: s.onArrowChange,
      style: {
        position: "absolute",
        left: s.arrowX,
        top: s.arrowY,
        [i]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[s.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[s.placedSide],
        visibility: s.shouldHideArrow ? "hidden" : void 0,
      },
      children: w.jsx(Vi, {
        ...o,
        ref: n,
        style: { ...o.style, display: "block" },
      }),
    });
  });
Tr.displayName = Rr;
function Zi(e) {
  return e !== null;
}
var Qi = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var g, x, y;
    const { placement: n, rects: r, middlewareData: o } = t,
      i = ((g = o.arrow) == null ? void 0 : g.centerOffset) !== 0,
      a = i ? 0 : e.arrowWidth,
      l = i ? 0 : e.arrowHeight,
      [u, f] = Sr(n),
      d = { start: "0%", center: "50%", end: "100%" }[f],
      p = (((x = o.arrow) == null ? void 0 : x.x) ?? 0) + a / 2,
      v = (((y = o.arrow) == null ? void 0 : y.y) ?? 0) + l / 2;
    let h = "",
      m = "";
    return (
      u === "bottom"
        ? ((h = i ? d : `${p}px`), (m = `${-l}px`))
        : u === "top"
          ? ((h = i ? d : `${p}px`), (m = `${r.floating.height + l}px`))
          : u === "right"
            ? ((h = `${-l}px`), (m = i ? d : `${v}px`))
            : u === "left" &&
              ((h = `${r.floating.width + l}px`), (m = i ? d : `${v}px`)),
      { data: { x: h, y: m } }
    );
  },
});
function Sr(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Ji = yr,
  Pr = Er,
  Mr = Cr,
  Ar = Tr,
  [vt, $u] = Fe("Tooltip", [mt]),
  cn = mt(),
  _r = "TooltipProvider",
  ea = 700,
  Dn = "tooltip.open",
  [ta, Or] = vt(_r),
  Ir = (e) => {
    const {
        __scopeTooltip: t,
        delayDuration: n = ea,
        skipDelayDuration: r = 300,
        disableHoverableContent: o = !1,
        children: s,
      } = e,
      [i, a] = c.useState(!0),
      l = c.useRef(!1),
      u = c.useRef(0);
    return (
      c.useEffect(() => {
        const f = u.current;
        return () => window.clearTimeout(f);
      }, []),
      w.jsx(ta, {
        scope: t,
        isOpenDelayed: i,
        delayDuration: n,
        onOpen: c.useCallback(() => {
          (window.clearTimeout(u.current), a(!1));
        }, []),
        onClose: c.useCallback(() => {
          (window.clearTimeout(u.current),
            (u.current = window.setTimeout(() => a(!0), r)));
        }, [r]),
        isPointerInTransitRef: l,
        onPointerInTransitChange: c.useCallback((f) => {
          l.current = f;
        }, []),
        disableHoverableContent: o,
        children: s,
      })
    );
  };
Ir.displayName = _r;
var Nr = "Tooltip",
  [Bu, ht] = vt(Nr),
  Kt = "TooltipTrigger",
  na = c.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...r } = e,
      o = ht(Kt, n),
      s = Or(Kt, n),
      i = cn(n),
      a = c.useRef(null),
      l = W(t, a, o.onTriggerChange),
      u = c.useRef(!1),
      f = c.useRef(!1),
      d = c.useCallback(() => (u.current = !1), []);
    return (
      c.useEffect(
        () => () => document.removeEventListener("pointerup", d),
        [d],
      ),
      w.jsx(Pr, {
        asChild: !0,
        ...i,
        children: w.jsx(j.button, {
          "aria-describedby": o.open ? o.contentId : void 0,
          "data-state": o.stateAttribute,
          ...r,
          ref: l,
          onPointerMove: M(e.onPointerMove, (p) => {
            p.pointerType !== "touch" &&
              !f.current &&
              !s.isPointerInTransitRef.current &&
              (o.onTriggerEnter(), (f.current = !0));
          }),
          onPointerLeave: M(e.onPointerLeave, () => {
            (o.onTriggerLeave(), (f.current = !1));
          }),
          onPointerDown: M(e.onPointerDown, () => {
            ((u.current = !0),
              document.addEventListener("pointerup", d, { once: !0 }));
          }),
          onFocus: M(e.onFocus, () => {
            u.current || o.onOpen();
          }),
          onBlur: M(e.onBlur, o.onClose),
          onClick: M(e.onClick, o.onClose),
        }),
      })
    );
  });
na.displayName = Kt;
var ra = "TooltipPortal",
  [Wu, oa] = vt(ra, { forceMount: void 0 }),
  Re = "TooltipContent",
  Dr = c.forwardRef((e, t) => {
    const n = oa(Re, e.__scopeTooltip),
      { forceMount: r = n.forceMount, side: o = "top", ...s } = e,
      i = ht(Re, e.__scopeTooltip);
    return w.jsx(fe, {
      present: r || i.open,
      children: i.disableHoverableContent
        ? w.jsx(Lr, { side: o, ...s, ref: t })
        : w.jsx(sa, { side: o, ...s, ref: t }),
    });
  }),
  sa = c.forwardRef((e, t) => {
    const n = ht(Re, e.__scopeTooltip),
      r = Or(Re, e.__scopeTooltip),
      o = c.useRef(null),
      s = W(t, o),
      [i, a] = c.useState(null),
      { trigger: l, onClose: u } = n,
      f = o.current,
      { onPointerInTransitChange: d } = r,
      p = c.useCallback(() => {
        (a(null), d(!1));
      }, [d]),
      v = c.useCallback(
        (h, m) => {
          const g = h.currentTarget,
            x = { x: h.clientX, y: h.clientY },
            y = ua(x, g.getBoundingClientRect()),
            b = la(x, y),
            E = da(m.getBoundingClientRect()),
            C = pa([...b, ...E]);
          (a(C), d(!0));
        },
        [d],
      );
    return (
      c.useEffect(() => () => p(), [p]),
      c.useEffect(() => {
        if (l && f) {
          const h = (g) => v(g, f),
            m = (g) => v(g, l);
          return (
            l.addEventListener("pointerleave", h),
            f.addEventListener("pointerleave", m),
            () => {
              (l.removeEventListener("pointerleave", h),
                f.removeEventListener("pointerleave", m));
            }
          );
        }
      }, [l, f, v, p]),
      c.useEffect(() => {
        if (i) {
          const h = (m) => {
            const g = m.target,
              x = { x: m.clientX, y: m.clientY },
              y =
                (l == null ? void 0 : l.contains(g)) ||
                (f == null ? void 0 : f.contains(g)),
              b = !fa(x, i);
            y ? p() : b && (p(), u());
          };
          return (
            document.addEventListener("pointermove", h),
            () => document.removeEventListener("pointermove", h)
          );
        }
      }, [l, f, i, u, p]),
      w.jsx(Lr, { ...e, ref: s })
    );
  }),
  [ia, aa] = vt(Nr, { isInside: !1 }),
  Lr = c.forwardRef((e, t) => {
    const {
        __scopeTooltip: n,
        children: r,
        "aria-label": o,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        ...a
      } = e,
      l = ht(Re, n),
      u = cn(n),
      { onClose: f } = l;
    return (
      c.useEffect(
        () => (
          document.addEventListener(Dn, f),
          () => document.removeEventListener(Dn, f)
        ),
        [f],
      ),
      c.useEffect(() => {
        if (l.trigger) {
          const d = (p) => {
            const v = p.target;
            v != null && v.contains(l.trigger) && f();
          };
          return (
            window.addEventListener("scroll", d, { capture: !0 }),
            () => window.removeEventListener("scroll", d, { capture: !0 })
          );
        }
      }, [l.trigger, f]),
      w.jsx(it, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: f,
        children: w.jsxs(Mr, {
          "data-state": l.stateAttribute,
          ...u,
          ...a,
          ref: t,
          style: {
            ...a.style,
            "--radix-tooltip-content-transform-origin":
              "var(--radix-popper-transform-origin)",
            "--radix-tooltip-content-available-width":
              "var(--radix-popper-available-width)",
            "--radix-tooltip-content-available-height":
              "var(--radix-popper-available-height)",
            "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-tooltip-trigger-height":
              "var(--radix-popper-anchor-height)",
          },
          children: [
            w.jsx(Gn, { children: r }),
            w.jsx(ia, {
              scope: n,
              isInside: !0,
              children: w.jsx(Ts, {
                id: l.contentId,
                role: "tooltip",
                children: o || r,
              }),
            }),
          ],
        }),
      })
    );
  });
Dr.displayName = Re;
var Fr = "TooltipArrow",
  ca = c.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...r } = e,
      o = cn(n);
    return aa(Fr, n).isInside ? null : w.jsx(Ar, { ...o, ...r, ref: t });
  });
ca.displayName = Fr;
function ua(e, t) {
  const n = Math.abs(t.top - e.y),
    r = Math.abs(t.bottom - e.y),
    o = Math.abs(t.right - e.x),
    s = Math.abs(t.left - e.x);
  switch (Math.min(n, r, o, s)) {
    case s:
      return "left";
    case o:
      return "right";
    case n:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function la(e, t, n = 5) {
  const r = [];
  switch (t) {
    case "top":
      r.push({ x: e.x - n, y: e.y + n }, { x: e.x + n, y: e.y + n });
      break;
    case "bottom":
      r.push({ x: e.x - n, y: e.y - n }, { x: e.x + n, y: e.y - n });
      break;
    case "left":
      r.push({ x: e.x + n, y: e.y - n }, { x: e.x + n, y: e.y + n });
      break;
    case "right":
      r.push({ x: e.x - n, y: e.y - n }, { x: e.x - n, y: e.y + n });
      break;
  }
  return r;
}
function da(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r },
  ];
}
function fa(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s].x,
      l = t[s].y,
      u = t[i].x,
      f = t[i].y;
    l > r != f > r && n < ((u - a) * (r - l)) / (f - l) + a && (o = !o);
  }
  return o;
}
function pa(e) {
  const t = e.slice();
  return (
    t.sort((n, r) =>
      n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0,
    ),
    ma(t)
  );
}
function ma(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (; t.length >= 2; ) {
      const s = t[t.length - 1],
        i = t[t.length - 2];
      if ((s.x - i.x) * (o.y - i.y) >= (s.y - i.y) * (o.x - i.x)) t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    for (; n.length >= 2; ) {
      const s = n[n.length - 1],
        i = n[n.length - 2];
      if ((s.x - i.x) * (o.y - i.y) >= (s.y - i.y) * (o.x - i.x)) n.pop();
      else break;
    }
    n.push(o);
  }
  return (
    n.pop(),
    t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y
      ? t
      : t.concat(n)
  );
}
var Ku = Ir,
  Vu = Dr,
  va = c.createContext(void 0);
function un(e) {
  const t = c.useContext(va);
  return e || t || "ltr";
}
var Tt = 0;
function ha() {
  c.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", e[0] ?? Ln()),
      document.body.insertAdjacentElement("beforeend", e[1] ?? Ln()),
      Tt++,
      () => {
        (Tt === 1 &&
          document
            .querySelectorAll("[data-radix-focus-guard]")
            .forEach((t) => t.remove()),
          Tt--);
      }
    );
  }, []);
}
function Ln() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.outline = "none"),
    (e.style.opacity = "0"),
    (e.style.position = "fixed"),
    (e.style.pointerEvents = "none"),
    e
  );
}
var St = "focusScope.autoFocusOnMount",
  Pt = "focusScope.autoFocusOnUnmount",
  Fn = { bubbles: !1, cancelable: !0 },
  ga = "FocusScope",
  kr = c.forwardRef((e, t) => {
    const {
        loop: n = !1,
        trapped: r = !1,
        onMountAutoFocus: o,
        onUnmountAutoFocus: s,
        ...i
      } = e,
      [a, l] = c.useState(null),
      u = V(o),
      f = V(s),
      d = c.useRef(null),
      p = W(t, (m) => l(m)),
      v = c.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (c.useEffect(() => {
      if (r) {
        let m = function (b) {
            if (v.paused || !a) return;
            const E = b.target;
            a.contains(E) ? (d.current = E) : ie(d.current, { select: !0 });
          },
          g = function (b) {
            if (v.paused || !a) return;
            const E = b.relatedTarget;
            E !== null && (a.contains(E) || ie(d.current, { select: !0 }));
          },
          x = function (b) {
            if (document.activeElement === document.body)
              for (const C of b) C.removedNodes.length > 0 && ie(a);
          };
        (document.addEventListener("focusin", m),
          document.addEventListener("focusout", g));
        const y = new MutationObserver(x);
        return (
          a && y.observe(a, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener("focusin", m),
              document.removeEventListener("focusout", g),
              y.disconnect());
          }
        );
      }
    }, [r, a, v.paused]),
      c.useEffect(() => {
        if (a) {
          jn.add(v);
          const m = document.activeElement;
          if (!a.contains(m)) {
            const x = new CustomEvent(St, Fn);
            (a.addEventListener(St, u),
              a.dispatchEvent(x),
              x.defaultPrevented ||
                (wa(Ca(jr(a)), { select: !0 }),
                document.activeElement === m && ie(a)));
          }
          return () => {
            (a.removeEventListener(St, u),
              setTimeout(() => {
                const x = new CustomEvent(Pt, Fn);
                (a.addEventListener(Pt, f),
                  a.dispatchEvent(x),
                  x.defaultPrevented || ie(m ?? document.body, { select: !0 }),
                  a.removeEventListener(Pt, f),
                  jn.remove(v));
              }, 0));
          };
        }
      }, [a, u, f, v]));
    const h = c.useCallback(
      (m) => {
        if ((!n && !r) || v.paused) return;
        const g = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey,
          x = document.activeElement;
        if (g && x) {
          const y = m.currentTarget,
            [b, E] = xa(y);
          b && E
            ? !m.shiftKey && x === E
              ? (m.preventDefault(), n && ie(b, { select: !0 }))
              : m.shiftKey &&
                x === b &&
                (m.preventDefault(), n && ie(E, { select: !0 }))
            : x === y && m.preventDefault();
        }
      },
      [n, r, v.paused],
    );
    return w.jsx(j.div, { tabIndex: -1, ...i, ref: p, onKeyDown: h });
  });
kr.displayName = ga;
function wa(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if ((ie(r, { select: t }), document.activeElement !== n)) return;
}
function xa(e) {
  const t = jr(e),
    n = kn(t, e),
    r = kn(t.reverse(), e);
  return [n, r];
}
function jr(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const o = r.tagName === "INPUT" && r.type === "hidden";
        return r.disabled || r.hidden || o
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function kn(e, t) {
  for (const n of e) if (!ya(n, { upTo: t })) return n;
}
function ya(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function ba(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function ie(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && ba(e) && t && e.select());
  }
}
var jn = Ea();
function Ea() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      (t !== n && (n == null || n.pause()), (e = $n(e, t)), e.unshift(t));
    },
    remove(t) {
      var n;
      ((e = $n(e, t)), (n = e[0]) == null || n.resume());
    },
  };
}
function $n(e, t) {
  const n = [...e],
    r = n.indexOf(t);
  return (r !== -1 && n.splice(r, 1), n);
}
function Ca(e) {
  return e.filter((t) => t.tagName !== "A");
}
function Ra(e, t = []) {
  let n = [];
  function r(s, i) {
    const a = c.createContext(i),
      l = n.length;
    n = [...n, i];
    function u(d) {
      const { scope: p, children: v, ...h } = d,
        m = (p == null ? void 0 : p[e][l]) || a,
        g = c.useMemo(() => h, Object.values(h));
      return w.jsx(m.Provider, { value: g, children: v });
    }
    function f(d, p) {
      const v = (p == null ? void 0 : p[e][l]) || a,
        h = c.useContext(v);
      if (h) return h;
      if (i !== void 0) return i;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return ((u.displayName = s + "Provider"), [u, f]);
  }
  const o = () => {
    const s = n.map((i) => c.createContext(i));
    return function (a) {
      const l = (a == null ? void 0 : a[e]) || s;
      return c.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: l } }), [a, l]);
    };
  };
  return ((o.scopeName = e), [r, Ta(o, ...t)]);
}
function Ta(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (s) {
      const i = r.reduce((a, { useScope: l, scopeName: u }) => {
        const d = l(s)[`__scope${u}`];
        return { ...a, ...d };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
var Mt = "rovingFocusGroup.onEntryFocus",
  Sa = { bubbles: !1, cancelable: !0 },
  gt = "RovingFocusGroup",
  [Vt, $r, Pa] = Yt(gt),
  [Ma, wt] = Ra(gt, [Pa]),
  [Aa, _a] = Ma(gt),
  Br = c.forwardRef((e, t) =>
    w.jsx(Vt.Provider, {
      scope: e.__scopeRovingFocusGroup,
      children: w.jsx(Vt.Slot, {
        scope: e.__scopeRovingFocusGroup,
        children: w.jsx(Oa, { ...e, ref: t }),
      }),
    }),
  );
Br.displayName = gt;
var Oa = c.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        orientation: r,
        loop: o = !1,
        dir: s,
        currentTabStopId: i,
        defaultCurrentTabStopId: a,
        onCurrentTabStopIdChange: l,
        onEntryFocus: u,
        preventScrollOnEntryFocus: f = !1,
        ...d
      } = e,
      p = c.useRef(null),
      v = W(t, p),
      h = un(s),
      [m = null, g] = at({ prop: i, defaultProp: a, onChange: l }),
      [x, y] = c.useState(!1),
      b = V(u),
      E = $r(n),
      C = c.useRef(!1),
      [P, S] = c.useState(0);
    return (
      c.useEffect(() => {
        const A = p.current;
        if (A)
          return (
            A.addEventListener(Mt, b),
            () => A.removeEventListener(Mt, b)
          );
      }, [b]),
      w.jsx(Aa, {
        scope: n,
        orientation: r,
        dir: h,
        loop: o,
        currentTabStopId: m,
        onItemFocus: c.useCallback((A) => g(A), [g]),
        onItemShiftTab: c.useCallback(() => y(!0), []),
        onFocusableItemAdd: c.useCallback(() => S((A) => A + 1), []),
        onFocusableItemRemove: c.useCallback(() => S((A) => A - 1), []),
        children: w.jsx(j.div, {
          tabIndex: x || P === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: v,
          style: { outline: "none", ...e.style },
          onMouseDown: M(e.onMouseDown, () => {
            C.current = !0;
          }),
          onFocus: M(e.onFocus, (A) => {
            const I = !C.current;
            if (A.target === A.currentTarget && I && !x) {
              const N = new CustomEvent(Mt, Sa);
              if ((A.currentTarget.dispatchEvent(N), !N.defaultPrevented)) {
                const k = E().filter((O) => O.focusable),
                  D = k.find((O) => O.active),
                  L = k.find((O) => O.id === m),
                  F = [D, L, ...k].filter(Boolean).map((O) => O.ref.current);
                Vr(F, f);
              }
            }
            C.current = !1;
          }),
          onBlur: M(e.onBlur, () => y(!1)),
        }),
      })
    );
  }),
  Wr = "RovingFocusGroupItem",
  Kr = c.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        focusable: r = !0,
        active: o = !1,
        tabStopId: s,
        ...i
      } = e,
      a = Qe(),
      l = s || a,
      u = _a(Wr, n),
      f = u.currentTabStopId === l,
      d = $r(n),
      { onFocusableItemAdd: p, onFocusableItemRemove: v } = u;
    return (
      c.useEffect(() => {
        if (r) return (p(), () => v());
      }, [r, p, v]),
      w.jsx(Vt.ItemSlot, {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: w.jsx(j.span, {
          tabIndex: f ? 0 : -1,
          "data-orientation": u.orientation,
          ...i,
          ref: t,
          onMouseDown: M(e.onMouseDown, (h) => {
            r ? u.onItemFocus(l) : h.preventDefault();
          }),
          onFocus: M(e.onFocus, () => u.onItemFocus(l)),
          onKeyDown: M(e.onKeyDown, (h) => {
            if (h.key === "Tab" && h.shiftKey) {
              u.onItemShiftTab();
              return;
            }
            if (h.target !== h.currentTarget) return;
            const m = Da(h, u.orientation, u.dir);
            if (m !== void 0) {
              if (h.metaKey || h.ctrlKey || h.altKey || h.shiftKey) return;
              h.preventDefault();
              let x = d()
                .filter((y) => y.focusable)
                .map((y) => y.ref.current);
              if (m === "last") x.reverse();
              else if (m === "prev" || m === "next") {
                m === "prev" && x.reverse();
                const y = x.indexOf(h.currentTarget);
                x = u.loop ? La(x, y + 1) : x.slice(y + 1);
              }
              setTimeout(() => Vr(x));
            }
          }),
        }),
      })
    );
  });
Kr.displayName = Wr;
var Ia = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last",
};
function Na(e, t) {
  return t !== "rtl"
    ? e
    : e === "ArrowLeft"
      ? "ArrowRight"
      : e === "ArrowRight"
        ? "ArrowLeft"
        : e;
}
function Da(e, t, n) {
  const r = Na(e.key, n);
  if (
    !(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) &&
    !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))
  )
    return Ia[r];
}
function Vr(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (
      r === n ||
      (r.focus({ preventScroll: t }), document.activeElement !== n)
    )
      return;
}
function La(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Ur = Br,
  Hr = Kr,
  Fa = function (e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  we = new WeakMap(),
  He = new WeakMap(),
  Ge = {},
  At = 0,
  Gr = function (e) {
    return e && (e.host || Gr(e.parentNode));
  },
  ka = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n;
        var r = Gr(n);
        return r && e.contains(r)
          ? r
          : (console.error(
              "aria-hidden",
              n,
              "in not contained inside",
              e,
              ". Doing nothing",
            ),
            null);
      })
      .filter(function (n) {
        return !!n;
      });
  },
  ja = function (e, t, n, r) {
    var o = ka(t, Array.isArray(e) ? e : [e]);
    Ge[n] || (Ge[n] = new WeakMap());
    var s = Ge[n],
      i = [],
      a = new Set(),
      l = new Set(o),
      u = function (d) {
        !d || a.has(d) || (a.add(d), u(d.parentNode));
      };
    o.forEach(u);
    var f = function (d) {
      !d ||
        l.has(d) ||
        Array.prototype.forEach.call(d.children, function (p) {
          if (a.has(p)) f(p);
          else
            try {
              var v = p.getAttribute(r),
                h = v !== null && v !== "false",
                m = (we.get(p) || 0) + 1,
                g = (s.get(p) || 0) + 1;
              (we.set(p, m),
                s.set(p, g),
                i.push(p),
                m === 1 && h && He.set(p, !0),
                g === 1 && p.setAttribute(n, "true"),
                h || p.setAttribute(r, "true"));
            } catch (x) {
              console.error("aria-hidden: cannot operate on ", p, x);
            }
        });
    };
    return (
      f(t),
      a.clear(),
      At++,
      function () {
        (i.forEach(function (d) {
          var p = we.get(d) - 1,
            v = s.get(d) - 1;
          (we.set(d, p),
            s.set(d, v),
            p || (He.has(d) || d.removeAttribute(r), He.delete(d)),
            v || d.removeAttribute(n));
        }),
          At--,
          At ||
            ((we = new WeakMap()),
            (we = new WeakMap()),
            (He = new WeakMap()),
            (Ge = {})));
      }
    );
  },
  $a = function (e, t, n) {
    n === void 0 && (n = "data-aria-hidden");
    var r = Array.from(Array.isArray(e) ? e : [e]),
      o = Fa(e);
    return o
      ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))),
        ja(r, o, n, "aria-hidden"))
      : function () {
          return null;
        };
  },
  J = function () {
    return (
      (J =
        Object.assign ||
        function (t) {
          for (var n, r = 1, o = arguments.length; r < o; r++) {
            n = arguments[r];
            for (var s in n)
              Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
          }
          return t;
        }),
      J.apply(this, arguments)
    );
  };
function Yr(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
        (n[r[o]] = e[r[o]]);
  return n;
}
function Ba(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, s; r < o; r++)
      (s || !(r in t)) &&
        (s || (s = Array.prototype.slice.call(t, 0, r)), (s[r] = t[r]));
  return e.concat(s || Array.prototype.slice.call(t));
}
var qe = "right-scroll-bar-position",
  Ze = "width-before-scroll-bar",
  Wa = "with-scroll-bars-hidden",
  Ka = "--removed-body-scroll-bar-size";
function _t(e, t) {
  return (typeof e == "function" ? e(t) : e && (e.current = t), e);
}
function Va(e, t) {
  var n = c.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && ((n.value = r), n.callback(r, o));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var Ua = typeof window < "u" ? c.useLayoutEffect : c.useEffect,
  Bn = new WeakMap();
function Ha(e, t) {
  var n = Va(null, function (r) {
    return e.forEach(function (o) {
      return _t(o, r);
    });
  });
  return (
    Ua(
      function () {
        var r = Bn.get(n);
        if (r) {
          var o = new Set(r),
            s = new Set(e),
            i = n.current;
          (o.forEach(function (a) {
            s.has(a) || _t(a, null);
          }),
            s.forEach(function (a) {
              o.has(a) || _t(a, i);
            }));
        }
        Bn.set(n, e);
      },
      [e],
    ),
    n
  );
}
function Ga(e) {
  return e;
}
function Ya(e, t) {
  t === void 0 && (t = Ga);
  var n = [],
    r = !1,
    o = {
      read: function () {
        if (r)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
          );
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (s) {
        var i = t(s, r);
        return (
          n.push(i),
          function () {
            n = n.filter(function (a) {
              return a !== i;
            });
          }
        );
      },
      assignSyncMedium: function (s) {
        for (r = !0; n.length; ) {
          var i = n;
          ((n = []), i.forEach(s));
        }
        n = {
          push: function (a) {
            return s(a);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (s) {
        r = !0;
        var i = [];
        if (n.length) {
          var a = n;
          ((n = []), a.forEach(s), (i = n));
        }
        var l = function () {
            var f = i;
            ((i = []), f.forEach(s));
          },
          u = function () {
            return Promise.resolve().then(l);
          };
        (u(),
          (n = {
            push: function (f) {
              (i.push(f), u());
            },
            filter: function (f) {
              return ((i = i.filter(f)), n);
            },
          }));
      },
    };
  return o;
}
function Xa(e) {
  e === void 0 && (e = {});
  var t = Ya(null);
  return ((t.options = J({ async: !0, ssr: !1 }, e)), t);
}
var Xr = function (e) {
  var t = e.sideCar,
    n = Yr(e, ["sideCar"]);
  if (!t)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car",
    );
  var r = t.read();
  if (!r) throw new Error("Sidecar medium not found");
  return c.createElement(r, J({}, n));
};
Xr.isSideCarExport = !0;
function za(e, t) {
  return (e.useMedium(t), Xr);
}
var zr = Xa(),
  Ot = function () {},
  xt = c.forwardRef(function (e, t) {
    var n = c.useRef(null),
      r = c.useState({
        onScrollCapture: Ot,
        onWheelCapture: Ot,
        onTouchMoveCapture: Ot,
      }),
      o = r[0],
      s = r[1],
      i = e.forwardProps,
      a = e.children,
      l = e.className,
      u = e.removeScrollBar,
      f = e.enabled,
      d = e.shards,
      p = e.sideCar,
      v = e.noIsolation,
      h = e.inert,
      m = e.allowPinchZoom,
      g = e.as,
      x = g === void 0 ? "div" : g,
      y = e.gapMode,
      b = Yr(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      E = p,
      C = Ha([n, t]),
      P = J(J({}, b), o);
    return c.createElement(
      c.Fragment,
      null,
      f &&
        c.createElement(E, {
          sideCar: zr,
          removeScrollBar: u,
          shards: d,
          noIsolation: v,
          inert: h,
          setCallbacks: s,
          allowPinchZoom: !!m,
          lockRef: n,
          gapMode: y,
        }),
      i
        ? c.cloneElement(c.Children.only(a), J(J({}, P), { ref: C }))
        : c.createElement(x, J({}, P, { className: l, ref: C }), a),
    );
  });
xt.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
xt.classNames = { fullWidth: Ze, zeroRight: qe };
var qa = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function Za() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = qa();
  return (t && e.setAttribute("nonce", t), e);
}
function Qa(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function Ja(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var ec = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = Za()) && (Qa(t, n), Ja(t)), e++);
      },
      remove: function () {
        (e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  tc = function () {
    var e = ec();
    return function (t, n) {
      c.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n],
      );
    };
  },
  qr = function () {
    var e = tc(),
      t = function (n) {
        var r = n.styles,
          o = n.dynamic;
        return (e(r, o), null);
      };
    return t;
  },
  nc = { left: 0, top: 0, right: 0, gap: 0 },
  It = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  rc = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      r = t[e === "padding" ? "paddingTop" : "marginTop"],
      o = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [It(n), It(r), It(o)];
  },
  oc = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return nc;
    var t = rc(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, r - n + t[2] - t[0]),
    };
  },
  sc = qr(),
  Ee = "data-scroll-locked",
  ic = function (e, t, n, r) {
    var o = e.left,
      s = e.top,
      i = e.right,
      a = e.gap;
    return (
      n === void 0 && (n = "margin"),
      `
  .`
        .concat(
          Wa,
          ` {
   overflow: hidden `,
        )
        .concat(
          r,
          `;
   padding-right: `,
        )
        .concat(a, "px ")
        .concat(
          r,
          `;
  }
  body[`,
        )
        .concat(
          Ee,
          `] {
    overflow: hidden `,
        )
        .concat(
          r,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            t && "position: relative ".concat(r, ";"),
            n === "margin" &&
              `
    padding-left: `
                .concat(
                  o,
                  `px;
    padding-top: `,
                )
                .concat(
                  s,
                  `px;
    padding-right: `,
                )
                .concat(
                  i,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(a, "px ")
                .concat(
                  r,
                  `;
    `,
                ),
            n === "padding" &&
              "padding-right: ".concat(a, "px ").concat(r, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`,
        )
        .concat(
          qe,
          ` {
    right: `,
        )
        .concat(a, "px ")
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(
          Ze,
          ` {
    margin-right: `,
        )
        .concat(a, "px ")
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(qe, " .")
        .concat(
          qe,
          ` {
    right: 0 `,
        )
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(Ze, " .")
        .concat(
          Ze,
          ` {
    margin-right: 0 `,
        )
        .concat(
          r,
          `;
  }
  
  body[`,
        )
        .concat(
          Ee,
          `] {
    `,
        )
        .concat(Ka, ": ")
        .concat(
          a,
          `px;
  }
`,
        )
    );
  },
  Wn = function () {
    var e = parseInt(document.body.getAttribute(Ee) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  ac = function () {
    c.useEffect(function () {
      return (
        document.body.setAttribute(Ee, (Wn() + 1).toString()),
        function () {
          var e = Wn() - 1;
          e <= 0
            ? document.body.removeAttribute(Ee)
            : document.body.setAttribute(Ee, e.toString());
        }
      );
    }, []);
  },
  cc = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      o = r === void 0 ? "margin" : r;
    ac();
    var s = c.useMemo(
      function () {
        return oc(o);
      },
      [o],
    );
    return c.createElement(sc, { styles: ic(s, !t, o, n ? "" : "!important") });
  },
  Ut = !1;
if (typeof window < "u")
  try {
    var Ye = Object.defineProperty({}, "passive", {
      get: function () {
        return ((Ut = !0), !0);
      },
    });
    (window.addEventListener("test", Ye, Ye),
      window.removeEventListener("test", Ye, Ye));
  } catch {
    Ut = !1;
  }
var xe = Ut ? { passive: !1 } : !1,
  uc = function (e) {
    return e.tagName === "TEXTAREA";
  },
  Zr = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return (
      n[t] !== "hidden" &&
      !(n.overflowY === n.overflowX && !uc(e) && n[t] === "visible")
    );
  },
  lc = function (e) {
    return Zr(e, "overflowY");
  },
  dc = function (e) {
    return Zr(e, "overflowX");
  },
  Kn = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
      var o = Qr(e, r);
      if (o) {
        var s = Jr(e, r),
          i = s[1],
          a = s[2];
        if (i > a) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  fc = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight;
    return [t, n, r];
  },
  pc = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth;
    return [t, n, r];
  },
  Qr = function (e, t) {
    return e === "v" ? lc(t) : dc(t);
  },
  Jr = function (e, t) {
    return e === "v" ? fc(t) : pc(t);
  },
  mc = function (e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  },
  vc = function (e, t, n, r, o) {
    var s = mc(e, window.getComputedStyle(t).direction),
      i = s * r,
      a = n.target,
      l = t.contains(a),
      u = !1,
      f = i > 0,
      d = 0,
      p = 0;
    do {
      var v = Jr(e, a),
        h = v[0],
        m = v[1],
        g = v[2],
        x = m - g - s * h;
      ((h || x) && Qr(e, a) && ((d += x), (p += h)),
        a instanceof ShadowRoot ? (a = a.host) : (a = a.parentNode));
    } while ((!l && a !== document.body) || (l && (t.contains(a) || t === a)));
    return (
      ((f && (Math.abs(d) < 1 || !o)) || (!f && (Math.abs(p) < 1 || !o))) &&
        (u = !0),
      u
    );
  },
  Xe = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  Vn = function (e) {
    return [e.deltaX, e.deltaY];
  },
  Un = function (e) {
    return e && "current" in e ? e.current : e;
  },
  hc = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  gc = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      );
  },
  wc = 0,
  ye = [];
function xc(e) {
  var t = c.useRef([]),
    n = c.useRef([0, 0]),
    r = c.useRef(),
    o = c.useState(wc++)[0],
    s = c.useState(qr)[0],
    i = c.useRef(e);
  (c.useEffect(
    function () {
      i.current = e;
    },
    [e],
  ),
    c.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(o));
          var m = Ba([e.lockRef.current], (e.shards || []).map(Un), !0).filter(
            Boolean,
          );
          return (
            m.forEach(function (g) {
              return g.classList.add("allow-interactivity-".concat(o));
            }),
            function () {
              (document.body.classList.remove("block-interactivity-".concat(o)),
                m.forEach(function (g) {
                  return g.classList.remove("allow-interactivity-".concat(o));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var a = c.useCallback(function (m, g) {
      if (
        ("touches" in m && m.touches.length === 2) ||
        (m.type === "wheel" && m.ctrlKey)
      )
        return !i.current.allowPinchZoom;
      var x = Xe(m),
        y = n.current,
        b = "deltaX" in m ? m.deltaX : y[0] - x[0],
        E = "deltaY" in m ? m.deltaY : y[1] - x[1],
        C,
        P = m.target,
        S = Math.abs(b) > Math.abs(E) ? "h" : "v";
      if ("touches" in m && S === "h" && P.type === "range") return !1;
      var A = Kn(S, P);
      if (!A) return !0;
      if ((A ? (C = S) : ((C = S === "v" ? "h" : "v"), (A = Kn(S, P))), !A))
        return !1;
      if (
        (!r.current && "changedTouches" in m && (b || E) && (r.current = C), !C)
      )
        return !0;
      var I = r.current || C;
      return vc(I, g, m, I === "h" ? b : E, !0);
    }, []),
    l = c.useCallback(function (m) {
      var g = m;
      if (!(!ye.length || ye[ye.length - 1] !== s)) {
        var x = "deltaY" in g ? Vn(g) : Xe(g),
          y = t.current.filter(function (C) {
            return (
              C.name === g.type &&
              (C.target === g.target || g.target === C.shadowParent) &&
              hc(C.delta, x)
            );
          })[0];
        if (y && y.should) {
          g.cancelable && g.preventDefault();
          return;
        }
        if (!y) {
          var b = (i.current.shards || [])
              .map(Un)
              .filter(Boolean)
              .filter(function (C) {
                return C.contains(g.target);
              }),
            E = b.length > 0 ? a(g, b[0]) : !i.current.noIsolation;
          E && g.cancelable && g.preventDefault();
        }
      }
    }, []),
    u = c.useCallback(function (m, g, x, y) {
      var b = { name: m, delta: g, target: x, should: y, shadowParent: yc(x) };
      (t.current.push(b),
        setTimeout(function () {
          t.current = t.current.filter(function (E) {
            return E !== b;
          });
        }, 1));
    }, []),
    f = c.useCallback(function (m) {
      ((n.current = Xe(m)), (r.current = void 0));
    }, []),
    d = c.useCallback(function (m) {
      u(m.type, Vn(m), m.target, a(m, e.lockRef.current));
    }, []),
    p = c.useCallback(function (m) {
      u(m.type, Xe(m), m.target, a(m, e.lockRef.current));
    }, []);
  c.useEffect(function () {
    return (
      ye.push(s),
      e.setCallbacks({
        onScrollCapture: d,
        onWheelCapture: d,
        onTouchMoveCapture: p,
      }),
      document.addEventListener("wheel", l, xe),
      document.addEventListener("touchmove", l, xe),
      document.addEventListener("touchstart", f, xe),
      function () {
        ((ye = ye.filter(function (m) {
          return m !== s;
        })),
          document.removeEventListener("wheel", l, xe),
          document.removeEventListener("touchmove", l, xe),
          document.removeEventListener("touchstart", f, xe));
      }
    );
  }, []);
  var v = e.removeScrollBar,
    h = e.inert;
  return c.createElement(
    c.Fragment,
    null,
    h ? c.createElement(s, { styles: gc(o) }) : null,
    v ? c.createElement(cc, { gapMode: e.gapMode }) : null,
  );
}
function yc(e) {
  for (var t = null; e !== null; )
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)),
      (e = e.parentNode));
  return t;
}
const bc = za(zr, xc);
var eo = c.forwardRef(function (e, t) {
  return c.createElement(xt, J({}, e, { ref: t, sideCar: bc }));
});
eo.classNames = xt.classNames;
var Ht = ["Enter", " "],
  Ec = ["ArrowDown", "PageUp", "Home"],
  to = ["ArrowUp", "PageDown", "End"],
  Cc = [...Ec, ...to],
  Rc = { ltr: [...Ht, "ArrowRight"], rtl: [...Ht, "ArrowLeft"] },
  Tc = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
  je = "Menu",
  [De, Sc, Pc] = Yt(je),
  [he, no] = Fe(je, [Pc, mt, wt]),
  yt = mt(),
  ro = wt(),
  [Mc, ge] = he(je),
  [Ac, $e] = he(je),
  oo = (e) => {
    const {
        __scopeMenu: t,
        open: n = !1,
        children: r,
        dir: o,
        onOpenChange: s,
        modal: i = !0,
      } = e,
      a = yt(t),
      [l, u] = c.useState(null),
      f = c.useRef(!1),
      d = V(s),
      p = un(o);
    return (
      c.useEffect(() => {
        const v = () => {
            ((f.current = !0),
              document.addEventListener("pointerdown", h, {
                capture: !0,
                once: !0,
              }),
              document.addEventListener("pointermove", h, {
                capture: !0,
                once: !0,
              }));
          },
          h = () => (f.current = !1);
        return (
          document.addEventListener("keydown", v, { capture: !0 }),
          () => {
            (document.removeEventListener("keydown", v, { capture: !0 }),
              document.removeEventListener("pointerdown", h, { capture: !0 }),
              document.removeEventListener("pointermove", h, { capture: !0 }));
          }
        );
      }, []),
      w.jsx(Ji, {
        ...a,
        children: w.jsx(Mc, {
          scope: t,
          open: n,
          onOpenChange: d,
          content: l,
          onContentChange: u,
          children: w.jsx(Ac, {
            scope: t,
            onClose: c.useCallback(() => d(!1), [d]),
            isUsingKeyboardRef: f,
            dir: p,
            modal: i,
            children: r,
          }),
        }),
      })
    );
  };
oo.displayName = je;
var _c = "MenuAnchor",
  ln = c.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      o = yt(n);
    return w.jsx(Pr, { ...o, ...r, ref: t });
  });
ln.displayName = _c;
var dn = "MenuPortal",
  [Oc, so] = he(dn, { forceMount: void 0 }),
  io = (e) => {
    const { __scopeMenu: t, forceMount: n, children: r, container: o } = e,
      s = ge(dn, t);
    return w.jsx(Oc, {
      scope: t,
      forceMount: n,
      children: w.jsx(fe, {
        present: n || s.open,
        children: w.jsx(zt, { asChild: !0, container: o, children: r }),
      }),
    });
  };
io.displayName = dn;
var z = "MenuContent",
  [Ic, fn] = he(z),
  ao = c.forwardRef((e, t) => {
    const n = so(z, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...o } = e,
      s = ge(z, e.__scopeMenu),
      i = $e(z, e.__scopeMenu);
    return w.jsx(De.Provider, {
      scope: e.__scopeMenu,
      children: w.jsx(fe, {
        present: r || s.open,
        children: w.jsx(De.Slot, {
          scope: e.__scopeMenu,
          children: i.modal
            ? w.jsx(Nc, { ...o, ref: t })
            : w.jsx(Dc, { ...o, ref: t }),
        }),
      }),
    });
  }),
  Nc = c.forwardRef((e, t) => {
    const n = ge(z, e.__scopeMenu),
      r = c.useRef(null),
      o = W(t, r);
    return (
      c.useEffect(() => {
        const s = r.current;
        if (s) return $a(s);
      }, []),
      w.jsx(pn, {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: M(e.onFocusOutside, (s) => s.preventDefault(), {
          checkForDefaultPrevented: !1,
        }),
        onDismiss: () => n.onOpenChange(!1),
      })
    );
  }),
  Dc = c.forwardRef((e, t) => {
    const n = ge(z, e.__scopeMenu);
    return w.jsx(pn, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1),
    });
  }),
  pn = c.forwardRef((e, t) => {
    const {
        __scopeMenu: n,
        loop: r = !1,
        trapFocus: o,
        onOpenAutoFocus: s,
        onCloseAutoFocus: i,
        disableOutsidePointerEvents: a,
        onEntryFocus: l,
        onEscapeKeyDown: u,
        onPointerDownOutside: f,
        onFocusOutside: d,
        onInteractOutside: p,
        onDismiss: v,
        disableOutsideScroll: h,
        ...m
      } = e,
      g = ge(z, n),
      x = $e(z, n),
      y = yt(n),
      b = ro(n),
      E = Sc(n),
      [C, P] = c.useState(null),
      S = c.useRef(null),
      A = W(t, S, g.onContentChange),
      I = c.useRef(0),
      N = c.useRef(""),
      k = c.useRef(0),
      D = c.useRef(null),
      L = c.useRef("right"),
      R = c.useRef(0),
      F = h ? eo : c.Fragment,
      O = h ? { as: Oe, allowPinchZoom: !0 } : void 0,
      $ = (T) => {
        var ne, Pe;
        const B = N.current + T,
          K = E().filter((X) => !X.disabled),
          H = document.activeElement,
          Q =
            (ne = K.find((X) => X.ref.current === H)) == null
              ? void 0
              : ne.textValue,
          se = K.map((X) => X.textValue),
          Be = Gc(se, B, Q),
          pe =
            (Pe = K.find((X) => X.textValue === Be)) == null
              ? void 0
              : Pe.ref.current;
        ((function X(Me) {
          ((N.current = Me),
            window.clearTimeout(I.current),
            Me !== "" && (I.current = window.setTimeout(() => X(""), 1e3)));
        })(B),
          pe && setTimeout(() => pe.focus()));
      };
    (c.useEffect(() => () => window.clearTimeout(I.current), []), ha());
    const _ = c.useCallback((T) => {
      var K, H;
      return (
        L.current === ((K = D.current) == null ? void 0 : K.side) &&
        Xc(T, (H = D.current) == null ? void 0 : H.area)
      );
    }, []);
    return w.jsx(Ic, {
      scope: n,
      searchRef: N,
      onItemEnter: c.useCallback(
        (T) => {
          _(T) && T.preventDefault();
        },
        [_],
      ),
      onItemLeave: c.useCallback(
        (T) => {
          var B;
          _(T) || ((B = S.current) == null || B.focus(), P(null));
        },
        [_],
      ),
      onTriggerLeave: c.useCallback(
        (T) => {
          _(T) && T.preventDefault();
        },
        [_],
      ),
      pointerGraceTimerRef: k,
      onPointerGraceIntentChange: c.useCallback((T) => {
        D.current = T;
      }, []),
      children: w.jsx(F, {
        ...O,
        children: w.jsx(kr, {
          asChild: !0,
          trapped: o,
          onMountAutoFocus: M(s, (T) => {
            var B;
            (T.preventDefault(),
              (B = S.current) == null || B.focus({ preventScroll: !0 }));
          }),
          onUnmountAutoFocus: i,
          children: w.jsx(it, {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onEscapeKeyDown: u,
            onPointerDownOutside: f,
            onFocusOutside: d,
            onInteractOutside: p,
            onDismiss: v,
            children: w.jsx(Ur, {
              asChild: !0,
              ...b,
              dir: x.dir,
              orientation: "vertical",
              loop: r,
              currentTabStopId: C,
              onCurrentTabStopIdChange: P,
              onEntryFocus: M(l, (T) => {
                x.isUsingKeyboardRef.current || T.preventDefault();
              }),
              preventScrollOnEntryFocus: !0,
              children: w.jsx(Mr, {
                role: "menu",
                "aria-orientation": "vertical",
                "data-state": Ro(g.open),
                "data-radix-menu-content": "",
                dir: x.dir,
                ...y,
                ...m,
                ref: A,
                style: { outline: "none", ...m.style },
                onKeyDown: M(m.onKeyDown, (T) => {
                  const K =
                      T.target.closest("[data-radix-menu-content]") ===
                      T.currentTarget,
                    H = T.ctrlKey || T.altKey || T.metaKey,
                    Q = T.key.length === 1;
                  K &&
                    (T.key === "Tab" && T.preventDefault(),
                    !H && Q && $(T.key));
                  const se = S.current;
                  if (T.target !== se || !Cc.includes(T.key)) return;
                  T.preventDefault();
                  const pe = E()
                    .filter((ne) => !ne.disabled)
                    .map((ne) => ne.ref.current);
                  (to.includes(T.key) && pe.reverse(), Uc(pe));
                }),
                onBlur: M(e.onBlur, (T) => {
                  T.currentTarget.contains(T.target) ||
                    (window.clearTimeout(I.current), (N.current = ""));
                }),
                onPointerMove: M(
                  e.onPointerMove,
                  Le((T) => {
                    const B = T.target,
                      K = R.current !== T.clientX;
                    if (T.currentTarget.contains(B) && K) {
                      const H = T.clientX > R.current ? "right" : "left";
                      ((L.current = H), (R.current = T.clientX));
                    }
                  }),
                ),
              }),
            }),
          }),
        }),
      }),
    });
  });
ao.displayName = z;
var Lc = "MenuGroup",
  mn = c.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return w.jsx(j.div, { role: "group", ...r, ref: t });
  });
mn.displayName = Lc;
var Fc = "MenuLabel",
  co = c.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return w.jsx(j.div, { ...r, ref: t });
  });
co.displayName = Fc;
var rt = "MenuItem",
  Hn = "menu.itemSelect",
  bt = c.forwardRef((e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e,
      s = c.useRef(null),
      i = $e(rt, e.__scopeMenu),
      a = fn(rt, e.__scopeMenu),
      l = W(t, s),
      u = c.useRef(!1),
      f = () => {
        const d = s.current;
        if (!n && d) {
          const p = new CustomEvent(Hn, { bubbles: !0, cancelable: !0 });
          (d.addEventListener(Hn, (v) => (r == null ? void 0 : r(v)), {
            once: !0,
          }),
            Xt(d, p),
            p.defaultPrevented ? (u.current = !1) : i.onClose());
        }
      };
    return w.jsx(uo, {
      ...o,
      ref: l,
      disabled: n,
      onClick: M(e.onClick, f),
      onPointerDown: (d) => {
        var p;
        ((p = e.onPointerDown) == null || p.call(e, d), (u.current = !0));
      },
      onPointerUp: M(e.onPointerUp, (d) => {
        var p;
        u.current || (p = d.currentTarget) == null || p.click();
      }),
      onKeyDown: M(e.onKeyDown, (d) => {
        const p = a.searchRef.current !== "";
        n ||
          (p && d.key === " ") ||
          (Ht.includes(d.key) && (d.currentTarget.click(), d.preventDefault()));
      }),
    });
  });
bt.displayName = rt;
var uo = c.forwardRef((e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...s } = e,
      i = fn(rt, n),
      a = ro(n),
      l = c.useRef(null),
      u = W(t, l),
      [f, d] = c.useState(!1),
      [p, v] = c.useState("");
    return (
      c.useEffect(() => {
        const h = l.current;
        h && v((h.textContent ?? "").trim());
      }, [s.children]),
      w.jsx(De.ItemSlot, {
        scope: n,
        disabled: r,
        textValue: o ?? p,
        children: w.jsx(Hr, {
          asChild: !0,
          ...a,
          focusable: !r,
          children: w.jsx(j.div, {
            role: "menuitem",
            "data-highlighted": f ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: u,
            onPointerMove: M(
              e.onPointerMove,
              Le((h) => {
                r
                  ? i.onItemLeave(h)
                  : (i.onItemEnter(h),
                    h.defaultPrevented ||
                      h.currentTarget.focus({ preventScroll: !0 }));
              }),
            ),
            onPointerLeave: M(
              e.onPointerLeave,
              Le((h) => i.onItemLeave(h)),
            ),
            onFocus: M(e.onFocus, () => d(!0)),
            onBlur: M(e.onBlur, () => d(!1)),
          }),
        }),
      })
    );
  }),
  kc = "MenuCheckboxItem",
  lo = c.forwardRef((e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return w.jsx(ho, {
      scope: e.__scopeMenu,
      checked: n,
      children: w.jsx(bt, {
        role: "menuitemcheckbox",
        "aria-checked": ot(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": hn(n),
        onSelect: M(
          o.onSelect,
          () => (r == null ? void 0 : r(ot(n) ? !0 : !n)),
          { checkForDefaultPrevented: !1 },
        ),
      }),
    });
  });
lo.displayName = kc;
var fo = "MenuRadioGroup",
  [jc, $c] = he(fo, { value: void 0, onValueChange: () => {} }),
  po = c.forwardRef((e, t) => {
    const { value: n, onValueChange: r, ...o } = e,
      s = V(r);
    return w.jsx(jc, {
      scope: e.__scopeMenu,
      value: n,
      onValueChange: s,
      children: w.jsx(mn, { ...o, ref: t }),
    });
  });
po.displayName = fo;
var mo = "MenuRadioItem",
  vo = c.forwardRef((e, t) => {
    const { value: n, ...r } = e,
      o = $c(mo, e.__scopeMenu),
      s = n === o.value;
    return w.jsx(ho, {
      scope: e.__scopeMenu,
      checked: s,
      children: w.jsx(bt, {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: t,
        "data-state": hn(s),
        onSelect: M(
          r.onSelect,
          () => {
            var i;
            return (i = o.onValueChange) == null ? void 0 : i.call(o, n);
          },
          { checkForDefaultPrevented: !1 },
        ),
      }),
    });
  });
vo.displayName = mo;
var vn = "MenuItemIndicator",
  [ho, Bc] = he(vn, { checked: !1 }),
  go = c.forwardRef((e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e,
      s = Bc(vn, n);
    return w.jsx(fe, {
      present: r || ot(s.checked) || s.checked === !0,
      children: w.jsx(j.span, { ...o, ref: t, "data-state": hn(s.checked) }),
    });
  });
go.displayName = vn;
var Wc = "MenuSeparator",
  wo = c.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return w.jsx(j.div, {
      role: "separator",
      "aria-orientation": "horizontal",
      ...r,
      ref: t,
    });
  });
wo.displayName = Wc;
var Kc = "MenuArrow",
  xo = c.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      o = yt(n);
    return w.jsx(Ar, { ...o, ...r, ref: t });
  });
xo.displayName = Kc;
var Vc = "MenuSub",
  [Uu, yo] = he(Vc),
  _e = "MenuSubTrigger",
  bo = c.forwardRef((e, t) => {
    const n = ge(_e, e.__scopeMenu),
      r = $e(_e, e.__scopeMenu),
      o = yo(_e, e.__scopeMenu),
      s = fn(_e, e.__scopeMenu),
      i = c.useRef(null),
      { pointerGraceTimerRef: a, onPointerGraceIntentChange: l } = s,
      u = { __scopeMenu: e.__scopeMenu },
      f = c.useCallback(() => {
        (i.current && window.clearTimeout(i.current), (i.current = null));
      }, []);
    return (
      c.useEffect(() => f, [f]),
      c.useEffect(() => {
        const d = a.current;
        return () => {
          (window.clearTimeout(d), l(null));
        };
      }, [a, l]),
      w.jsx(ln, {
        asChild: !0,
        ...u,
        children: w.jsx(uo, {
          id: o.triggerId,
          "aria-haspopup": "menu",
          "aria-expanded": n.open,
          "aria-controls": o.contentId,
          "data-state": Ro(n.open),
          ...e,
          ref: st(t, o.onTriggerChange),
          onClick: (d) => {
            var p;
            ((p = e.onClick) == null || p.call(e, d),
              !(e.disabled || d.defaultPrevented) &&
                (d.currentTarget.focus(), n.open || n.onOpenChange(!0)));
          },
          onPointerMove: M(
            e.onPointerMove,
            Le((d) => {
              (s.onItemEnter(d),
                !d.defaultPrevented &&
                  !e.disabled &&
                  !n.open &&
                  !i.current &&
                  (s.onPointerGraceIntentChange(null),
                  (i.current = window.setTimeout(() => {
                    (n.onOpenChange(!0), f());
                  }, 100))));
            }),
          ),
          onPointerLeave: M(
            e.onPointerLeave,
            Le((d) => {
              var v, h;
              f();
              const p =
                (v = n.content) == null ? void 0 : v.getBoundingClientRect();
              if (p) {
                const m = (h = n.content) == null ? void 0 : h.dataset.side,
                  g = m === "right",
                  x = g ? -5 : 5,
                  y = p[g ? "left" : "right"],
                  b = p[g ? "right" : "left"];
                (s.onPointerGraceIntentChange({
                  area: [
                    { x: d.clientX + x, y: d.clientY },
                    { x: y, y: p.top },
                    { x: b, y: p.top },
                    { x: b, y: p.bottom },
                    { x: y, y: p.bottom },
                  ],
                  side: m,
                }),
                  window.clearTimeout(a.current),
                  (a.current = window.setTimeout(
                    () => s.onPointerGraceIntentChange(null),
                    300,
                  )));
              } else {
                if ((s.onTriggerLeave(d), d.defaultPrevented)) return;
                s.onPointerGraceIntentChange(null);
              }
            }),
          ),
          onKeyDown: M(e.onKeyDown, (d) => {
            var v;
            const p = s.searchRef.current !== "";
            e.disabled ||
              (p && d.key === " ") ||
              (Rc[r.dir].includes(d.key) &&
                (n.onOpenChange(!0),
                (v = n.content) == null || v.focus(),
                d.preventDefault()));
          }),
        }),
      })
    );
  });
bo.displayName = _e;
var Eo = "MenuSubContent",
  Co = c.forwardRef((e, t) => {
    const n = so(z, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...o } = e,
      s = ge(z, e.__scopeMenu),
      i = $e(z, e.__scopeMenu),
      a = yo(Eo, e.__scopeMenu),
      l = c.useRef(null),
      u = W(t, l);
    return w.jsx(De.Provider, {
      scope: e.__scopeMenu,
      children: w.jsx(fe, {
        present: r || s.open,
        children: w.jsx(De.Slot, {
          scope: e.__scopeMenu,
          children: w.jsx(pn, {
            id: a.contentId,
            "aria-labelledby": a.triggerId,
            ...o,
            ref: u,
            align: "start",
            side: i.dir === "rtl" ? "left" : "right",
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (f) => {
              var d;
              (i.isUsingKeyboardRef.current &&
                ((d = l.current) == null || d.focus()),
                f.preventDefault());
            },
            onCloseAutoFocus: (f) => f.preventDefault(),
            onFocusOutside: M(e.onFocusOutside, (f) => {
              f.target !== a.trigger && s.onOpenChange(!1);
            }),
            onEscapeKeyDown: M(e.onEscapeKeyDown, (f) => {
              (i.onClose(), f.preventDefault());
            }),
            onKeyDown: M(e.onKeyDown, (f) => {
              var v;
              const d = f.currentTarget.contains(f.target),
                p = Tc[i.dir].includes(f.key);
              d &&
                p &&
                (s.onOpenChange(!1),
                (v = a.trigger) == null || v.focus(),
                f.preventDefault());
            }),
          }),
        }),
      }),
    });
  });
Co.displayName = Eo;
function Ro(e) {
  return e ? "open" : "closed";
}
function ot(e) {
  return e === "indeterminate";
}
function hn(e) {
  return ot(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Uc(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Hc(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function Gc(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t,
    s = n ? e.indexOf(n) : -1;
  let i = Hc(e, Math.max(s, 0));
  o.length === 1 && (i = i.filter((u) => u !== n));
  const l = i.find((u) => u.toLowerCase().startsWith(o.toLowerCase()));
  return l !== n ? l : void 0;
}
function Yc(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const a = t[s].x,
      l = t[s].y,
      u = t[i].x,
      f = t[i].y;
    l > r != f > r && n < ((u - a) * (r - l)) / (f - l) + a && (o = !o);
  }
  return o;
}
function Xc(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Yc(n, t);
}
function Le(e) {
  return (t) => (t.pointerType === "mouse" ? e(t) : void 0);
}
var zc = oo,
  qc = ln,
  Zc = io,
  Qc = ao,
  Jc = mn,
  eu = co,
  tu = bt,
  nu = lo,
  ru = po,
  ou = vo,
  su = go,
  iu = wo,
  au = xo,
  cu = bo,
  uu = Co,
  gn = "DropdownMenu",
  [lu, Hu] = Fe(gn, [no]),
  U = no(),
  [du, To] = lu(gn),
  So = (e) => {
    const {
        __scopeDropdownMenu: t,
        children: n,
        dir: r,
        open: o,
        defaultOpen: s,
        onOpenChange: i,
        modal: a = !0,
      } = e,
      l = U(t),
      u = c.useRef(null),
      [f = !1, d] = at({ prop: o, defaultProp: s, onChange: i });
    return w.jsx(du, {
      scope: t,
      triggerId: Qe(),
      triggerRef: u,
      contentId: Qe(),
      open: f,
      onOpenChange: d,
      onOpenToggle: c.useCallback(() => d((p) => !p), [d]),
      modal: a,
      children: w.jsx(zc, {
        ...l,
        open: f,
        onOpenChange: d,
        dir: r,
        modal: a,
        children: n,
      }),
    });
  };
So.displayName = gn;
var Po = "DropdownMenuTrigger",
  Mo = c.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e,
      s = To(Po, n),
      i = U(n);
    return w.jsx(qc, {
      asChild: !0,
      ...i,
      children: w.jsx(j.button, {
        type: "button",
        id: s.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": s.open,
        "aria-controls": s.open ? s.contentId : void 0,
        "data-state": s.open ? "open" : "closed",
        "data-disabled": r ? "" : void 0,
        disabled: r,
        ...o,
        ref: st(t, s.triggerRef),
        onPointerDown: M(e.onPointerDown, (a) => {
          !r &&
            a.button === 0 &&
            a.ctrlKey === !1 &&
            (s.onOpenToggle(), s.open || a.preventDefault());
        }),
        onKeyDown: M(e.onKeyDown, (a) => {
          r ||
            (["Enter", " "].includes(a.key) && s.onOpenToggle(),
            a.key === "ArrowDown" && s.onOpenChange(!0),
            ["Enter", " ", "ArrowDown"].includes(a.key) && a.preventDefault());
        }),
      }),
    });
  });
Mo.displayName = Po;
var fu = "DropdownMenuPortal",
  Ao = (e) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = U(t);
    return w.jsx(Zc, { ...r, ...n });
  };
Ao.displayName = fu;
var _o = "DropdownMenuContent",
  Oo = c.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = To(_o, n),
      s = U(n),
      i = c.useRef(!1);
    return w.jsx(Qc, {
      id: o.contentId,
      "aria-labelledby": o.triggerId,
      ...s,
      ...r,
      ref: t,
      onCloseAutoFocus: M(e.onCloseAutoFocus, (a) => {
        var l;
        (i.current || (l = o.triggerRef.current) == null || l.focus(),
          (i.current = !1),
          a.preventDefault());
      }),
      onInteractOutside: M(e.onInteractOutside, (a) => {
        const l = a.detail.originalEvent,
          u = l.button === 0 && l.ctrlKey === !0,
          f = l.button === 2 || u;
        (!o.modal || f) && (i.current = !0);
      }),
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
Oo.displayName = _o;
var pu = "DropdownMenuGroup",
  mu = c.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = U(n);
    return w.jsx(Jc, { ...o, ...r, ref: t });
  });
mu.displayName = pu;
var vu = "DropdownMenuLabel",
  Io = c.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = U(n);
    return w.jsx(eu, { ...o, ...r, ref: t });
  });
Io.displayName = vu;
var hu = "DropdownMenuItem",
  No = c.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = U(n);
    return w.jsx(tu, { ...o, ...r, ref: t });
  });
No.displayName = hu;
var gu = "DropdownMenuCheckboxItem",
  Do = c.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = U(n);
    return w.jsx(nu, { ...o, ...r, ref: t });
  });
Do.displayName = gu;
var wu = "DropdownMenuRadioGroup",
  xu = c.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = U(n);
    return w.jsx(ru, { ...o, ...r, ref: t });
  });
xu.displayName = wu;
var yu = "DropdownMenuRadioItem",
  Lo = c.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = U(n);
    return w.jsx(ou, { ...o, ...r, ref: t });
  });
Lo.displayName = yu;
var bu = "DropdownMenuItemIndicator",
  Fo = c.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = U(n);
    return w.jsx(su, { ...o, ...r, ref: t });
  });
Fo.displayName = bu;
var Eu = "DropdownMenuSeparator",
  ko = c.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = U(n);
    return w.jsx(iu, { ...o, ...r, ref: t });
  });
ko.displayName = Eu;
var Cu = "DropdownMenuArrow",
  Ru = c.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = U(n);
    return w.jsx(au, { ...o, ...r, ref: t });
  });
Ru.displayName = Cu;
var Tu = "DropdownMenuSubTrigger",
  jo = c.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = U(n);
    return w.jsx(cu, { ...o, ...r, ref: t });
  });
jo.displayName = Tu;
var Su = "DropdownMenuSubContent",
  $o = c.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = U(n);
    return w.jsx(uu, {
      ...o,
      ...r,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
$o.displayName = Su;
var Gu = So,
  Yu = Mo,
  Xu = Ao,
  zu = Oo,
  qu = Io,
  Zu = No,
  Qu = Do,
  Ju = Lo,
  el = Fo,
  tl = ko,
  nl = jo,
  rl = $o,
  wn = "Tabs",
  [Pu, ol] = Fe(wn, [wt]),
  Bo = wt(),
  [Mu, xn] = Pu(wn),
  Wo = c.forwardRef((e, t) => {
    const {
        __scopeTabs: n,
        value: r,
        onValueChange: o,
        defaultValue: s,
        orientation: i = "horizontal",
        dir: a,
        activationMode: l = "automatic",
        ...u
      } = e,
      f = un(a),
      [d, p] = at({ prop: r, onChange: o, defaultProp: s });
    return w.jsx(Mu, {
      scope: n,
      baseId: Qe(),
      value: d,
      onValueChange: p,
      orientation: i,
      dir: f,
      activationMode: l,
      children: w.jsx(j.div, { dir: f, "data-orientation": i, ...u, ref: t }),
    });
  });
Wo.displayName = wn;
var Ko = "TabsList",
  Vo = c.forwardRef((e, t) => {
    const { __scopeTabs: n, loop: r = !0, ...o } = e,
      s = xn(Ko, n),
      i = Bo(n);
    return w.jsx(Ur, {
      asChild: !0,
      ...i,
      orientation: s.orientation,
      dir: s.dir,
      loop: r,
      children: w.jsx(j.div, {
        role: "tablist",
        "aria-orientation": s.orientation,
        ...o,
        ref: t,
      }),
    });
  });
Vo.displayName = Ko;
var Uo = "TabsTrigger",
  Ho = c.forwardRef((e, t) => {
    const { __scopeTabs: n, value: r, disabled: o = !1, ...s } = e,
      i = xn(Uo, n),
      a = Bo(n),
      l = Xo(i.baseId, r),
      u = zo(i.baseId, r),
      f = r === i.value;
    return w.jsx(Hr, {
      asChild: !0,
      ...a,
      focusable: !o,
      active: f,
      children: w.jsx(j.button, {
        type: "button",
        role: "tab",
        "aria-selected": f,
        "aria-controls": u,
        "data-state": f ? "active" : "inactive",
        "data-disabled": o ? "" : void 0,
        disabled: o,
        id: l,
        ...s,
        ref: t,
        onMouseDown: M(e.onMouseDown, (d) => {
          !o && d.button === 0 && d.ctrlKey === !1
            ? i.onValueChange(r)
            : d.preventDefault();
        }),
        onKeyDown: M(e.onKeyDown, (d) => {
          [" ", "Enter"].includes(d.key) && i.onValueChange(r);
        }),
        onFocus: M(e.onFocus, () => {
          const d = i.activationMode !== "manual";
          !f && !o && d && i.onValueChange(r);
        }),
      }),
    });
  });
Ho.displayName = Uo;
var Go = "TabsContent",
  Yo = c.forwardRef((e, t) => {
    const { __scopeTabs: n, value: r, forceMount: o, children: s, ...i } = e,
      a = xn(Go, n),
      l = Xo(a.baseId, r),
      u = zo(a.baseId, r),
      f = r === a.value,
      d = c.useRef(f);
    return (
      c.useEffect(() => {
        const p = requestAnimationFrame(() => (d.current = !1));
        return () => cancelAnimationFrame(p);
      }, []),
      w.jsx(fe, {
        present: o || f,
        children: ({ present: p }) =>
          w.jsx(j.div, {
            "data-state": f ? "active" : "inactive",
            "data-orientation": a.orientation,
            role: "tabpanel",
            "aria-labelledby": l,
            hidden: !p,
            id: u,
            tabIndex: 0,
            ...i,
            ref: t,
            style: { ...e.style, animationDuration: d.current ? "0s" : void 0 },
            children: p && s,
          }),
      })
    );
  });
Yo.displayName = Go;
function Xo(e, t) {
  return `${e}-trigger-${t}`;
}
function zo(e, t) {
  return `${e}-content-${t}`;
}
var sl = Wo,
  il = Vo,
  al = Ho,
  cl = Yo;
export {
  ku as A,
  ju as C,
  Fu as D,
  Zu as I,
  qu as L,
  Iu as P,
  Du as R,
  Oe as S,
  Lu as T,
  Nu as V,
  Vu as a,
  Ku as b,
  nl as c,
  rl as d,
  Xu as e,
  zu as f,
  Qu as g,
  el as h,
  Ju as i,
  tl as j,
  Gu as k,
  Yu as l,
  il as m,
  al as n,
  cl as o,
  sl as p,
};
