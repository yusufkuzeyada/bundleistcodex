const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/app.js",
      "assets/supabase.js",
      "assets/radix.js",
      "assets/react.js",
      "assets/icons.js",
    ]),
) => i.map((i) => d[i]);
import { _ as p } from "./supabase.js";
import { j as r, R as u } from "./radix.js";
import { a as h, g as y } from "./react.js";
(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) d(t);
  new MutationObserver((t) => {
    for (const o of t)
      if (o.type === "childList")
        for (const c of o.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && d(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(t) {
    const o = {};
    return (
      t.integrity && (o.integrity = t.integrity),
      t.referrerPolicy && (o.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : t.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function d(t) {
    if (t.ep) return;
    t.ep = !0;
    const o = s(t);
    fetch(t.href, o);
  }
})();
var i = {},
  l;
function g() {
  if (l) return i;
  l = 1;
  var e = h();
  return ((i.createRoot = e.createRoot), (i.hydrateRoot = e.hydrateRoot), i);
}
var E = g();
const x = y(E),
  m = document.getElementById("root");
if (!m) throw new Error("Could not find root element to mount to");
const f = x.createRoot(m),
  j = ({ error: e }) => {
    const n =
        e instanceof Error
          ? e.message
          : typeof e == "string"
            ? e
            : "Unknown error",
      s = e instanceof Error ? e.stack : "";
    return r.jsxs("div", {
      style: {
        padding: 24,
        fontFamily: "ui-sans-serif, system-ui, -apple-system",
      },
      children: [
        r.jsx("h1", {
          style: { fontSize: 18, fontWeight: 700, marginBottom: 8 },
          children: "Dashboard failed to start",
        }),
        r.jsx("p", {
          style: { color: "#b91c1c", marginBottom: 12 },
          children: n,
        }),
        r.jsx("pre", {
          style: {
            whiteSpace: "pre-wrap",
            background: "#0b1020",
            color: "#e5e7eb",
            padding: 12,
            borderRadius: 8,
            fontSize: 12,
            lineHeight: 1.4,
            maxWidth: 1e3,
          },
          children: s,
        }),
        r.jsxs("p", {
          style: { marginTop: 12, color: "#374151" },
          children: [
            "Common causes: missing ",
            r.jsx("code", { children: "VITE_SUPABASE_URL" }),
            "/",
            r.jsx("code", { children: "VITE_SUPABASE_ANON_KEY" }),
            ", or an RLS policy blocking the ",
            r.jsx("code", { children: "customers" }),
            " bootstrap query.",
          ],
        }),
      ],
    });
  },
  a = (e) => {
    f.render(r.jsx(u.StrictMode, { children: r.jsx(j, { error: e }) }));
  };
window.addEventListener("error", (e) => a(e.error || e.message));
window.addEventListener("unhandledrejection", (e) => a(e.reason));
(async () => {
  try {
    const n = (
      await p(
        () => import("./app.js").then((s) => s.D),
        __vite__mapDeps([0, 1, 2, 3, 4]),
      )
    ).default;
    f.render(r.jsx(u.StrictMode, { children: r.jsx(n, {}) }));
  } catch (e) {
    a(e);
  }
})();
