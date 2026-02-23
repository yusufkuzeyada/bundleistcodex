import { j as e } from "./query.js";
import { h as S, r as o, L as j } from "./react.js";
import {
  c as q,
  a as A,
  H as B,
  B as g,
  M as T,
  F as $,
  s as w,
} from "./app.js";
import { u as H } from "./i18n.js";
import { A as F } from "./arrow-left.js";
import "./supabase.js";
import "./radix.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const I = q("Link2", [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }],
  ]),
  Q = () => {
    const { id: c } = S(),
      { i18n: m } = H(),
      [a, N] = o.useState(null),
      [v, p] = o.useState(!0),
      [y, b] = o.useState(!1);
    o.useEffect(() => {
      (async () => {
        p(!0);
        const n =
            "id, title, title_en, title_tr, title_fr, content, content_en, content_tr, content_fr, image_url, created_at",
          l = "id, title, content, image_url, created_at";
        let { data: i, error: r } = await w
          .from("blog_posts")
          .select(n)
          .eq("id", c)
          .eq("published", !0)
          .single();
        (r &&
          /does not exist/i.test(r.message) &&
          ({ data: i, error: r } = await w
            .from("blog_posts")
            .select(l)
            .eq("id", c)
            .eq("published", !0)
            .single()),
          !r && i && N(i),
          p(!1));
      })();
    }, [c]);
    const t = o.useMemo(() => (a ? A(a, m.language) : null), [a, m.language]),
      { toc: f, readingMinutes: k } = o.useMemo(() => {
        var n;
        const s = (t == null ? void 0 : t.content) || "";
        if (!s) return { toc: [], readingMinutes: 1 };
        try {
          const l = new DOMParser().parseFromString(s, "text/html"),
            r = Array.from(l.querySelectorAll("h2, h3, h4"))
              .map((C, L) => {
                const u = (C.textContent || "").trim();
                return u
                  ? {
                      id: `h2-${L}-${u
                        .toLowerCase()
                        .replace(/[^\p{L}\p{N}]+/gu, "-")
                        .replace(/(^-|-$)/g, "")}`,
                      text: u,
                    }
                  : null;
              })
              .filter(Boolean),
            d = (((n = l.body) == null ? void 0 : n.textContent) || "")
              .replace(/\s+/g, " ")
              .trim(),
            h = d ? d.split(" ").length : 0,
            x = Math.max(1, Math.round(h / 220));
          return { toc: r, readingMinutes: x };
        } catch {
          return { toc: [], readingMinutes: 1 };
        }
      }, [t == null ? void 0 : t.content]),
      M = o.useMemo(() => {
        var n;
        const s = (t == null ? void 0 : t.content) || "";
        if (!s) return "";
        try {
          const l = new DOMParser().parseFromString(s, "text/html");
          return (
            Array.from(l.querySelectorAll("h2, h3, h4")).forEach((r, d) => {
              const h = (r.textContent || "").trim(),
                x = `h2-${d}-${h
                  .toLowerCase()
                  .replace(/[^\p{L}\p{N}]+/gu, "-")
                  .replace(/(^-|-$)/g, "")}`;
              r.setAttribute("id", x);
            }),
            ((n = l.body) == null ? void 0 : n.innerHTML) || s
          );
        } catch {
          return s;
        }
      }, [t == null ? void 0 : t.content]),
      _ = async () => {
        try {
          (await navigator.clipboard.writeText(window.location.href),
            b(!0),
            window.setTimeout(() => b(!1), 1200));
        } catch {}
      };
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx(B, {}),
        e.jsx("main", {
          className: "min-h-screen bg-gradient-to-b from-white to-slate-50",
          children: e.jsx("div", {
            className: "mx-auto max-w-6xl px-4 sm:px-6 pt-28 pb-16",
            children: v
              ? e.jsxs("div", {
                  className:
                    "rounded-3xl border border-slate-900/10 bg-white p-6 shadow-sm",
                  children: [
                    e.jsx("div", {
                      className: "h-8 w-2/3 bg-slate-100 rounded-lg",
                    }),
                    e.jsx("div", {
                      className: "mt-4 h-4 w-1/3 bg-slate-100 rounded",
                    }),
                    e.jsxs("div", {
                      className: "mt-8 space-y-3",
                      children: [
                        e.jsx("div", {
                          className: "h-4 w-full bg-slate-100 rounded",
                        }),
                        e.jsx("div", {
                          className: "h-4 w-11/12 bg-slate-100 rounded",
                        }),
                        e.jsx("div", {
                          className: "h-4 w-10/12 bg-slate-100 rounded",
                        }),
                      ],
                    }),
                  ],
                })
              : a
                ? e.jsxs("div", {
                    className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
                    children: [
                      e.jsxs("div", {
                        className: "lg:col-span-8",
                        children: [
                          e.jsxs("div", {
                            className: "flex items-center gap-3 text-sm",
                            children: [
                              e.jsxs(j, {
                                to: "/blog",
                                className:
                                  "inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 font-semibold",
                                children: [
                                  e.jsx(F, { className: "h-4 w-4" }),
                                  "Back to blog",
                                ],
                              }),
                              e.jsx("div", { className: "flex-1" }),
                              e.jsxs(g, {
                                type: "button",
                                variant: "outline",
                                className: "rounded-full h-9 px-4",
                                onClick: _,
                                title: "Copy link",
                                children: [
                                  e.jsx(I, { className: "h-4 w-4 mr-2" }),
                                  y ? "Copied" : "Copy link",
                                ],
                              }),
                            ],
                          }),
                          e.jsxs("header", {
                            className: "mt-6",
                            children: [
                              e.jsx("h1", {
                                className:
                                  "text-4xl sm:text-5xl font-bold tracking-tight text-slate-950",
                                children:
                                  (t == null ? void 0 : t.title) || a.title,
                              }),
                              e.jsxs("div", {
                                className:
                                  "mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600",
                                children: [
                                  e.jsx("span", {
                                    className:
                                      "px-3 py-1 rounded-full bg-slate-100 border border-slate-900/10 font-semibold",
                                    children: new Date(
                                      a.created_at,
                                    ).toLocaleDateString(m.language),
                                  }),
                                  e.jsxs("span", {
                                    className:
                                      "px-3 py-1 rounded-full bg-white border border-slate-900/10 font-semibold",
                                    children: [k, " min read"],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          a.image_url &&
                            e.jsx("div", {
                              className:
                                "mt-8 overflow-hidden rounded-3xl border border-slate-900/10 bg-white shadow-sm",
                              children: e.jsx("img", {
                                src: a.image_url,
                                alt: (t == null ? void 0 : t.title) || a.title,
                                className: "w-full max-h-[420px] object-cover",
                                loading: "lazy",
                              }),
                            }),
                          e.jsx("div", {
                            className:
                              "mt-10 rounded-3xl border border-slate-900/10 bg-white shadow-sm",
                            children: e.jsx("div", {
                              className: "p-6 sm:p-8",
                              children: e.jsx("div", {
                                className: "blog-prose",
                                dangerouslySetInnerHTML: { __html: M },
                              }),
                            }),
                          }),
                        ],
                      }),
                      e.jsx("aside", {
                        className: "lg:col-span-4",
                        children: e.jsxs("div", {
                          className: "lg:sticky lg:top-28 space-y-4",
                          children: [
                            f.length > 0 &&
                              e.jsxs("div", {
                                className:
                                  "rounded-3xl border border-slate-900/10 bg-white shadow-sm p-5",
                                children: [
                                  e.jsx("div", {
                                    className:
                                      "text-sm font-bold text-slate-950",
                                    children: "On this page",
                                  }),
                                  e.jsx("div", {
                                    className: "mt-3 space-y-2",
                                    children: f.map((s) =>
                                      e.jsx(
                                        "a",
                                        {
                                          href: `#${s.id}`,
                                          className:
                                            "block text-sm font-semibold text-slate-700 hover:text-emerald-700",
                                          children: s.text,
                                        },
                                        s.id,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                            e.jsxs("div", {
                              className:
                                "rounded-3xl border border-slate-900/10 bg-gradient-to-br from-emerald-50 to-white shadow-sm p-5",
                              children: [
                                e.jsx("div", {
                                  className: "text-sm font-bold text-slate-950",
                                  children: "Talk to our team",
                                }),
                                e.jsx("div", {
                                  className: "mt-2 text-sm text-slate-700",
                                  children:
                                    "If you want to consolidate procurement and shipping into one workflow, we can help.",
                                }),
                                e.jsx("div", {
                                  className: "mt-4",
                                  children: e.jsx(g, {
                                    asChild: !0,
                                    className:
                                      "rounded-full bg-slate-900 hover:bg-slate-800 text-white w-full h-10",
                                    children: e.jsxs("a", {
                                      href: "/contact",
                                      children: [
                                        e.jsx(T, { className: "mr-2 h-4 w-4" }),
                                        "Contact",
                                      ],
                                    }),
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  })
                : e.jsxs("div", {
                    className:
                      "rounded-3xl border border-slate-900/10 bg-white p-8 shadow-sm text-center",
                    children: [
                      e.jsx("div", {
                        className: "text-lg font-bold text-slate-950",
                        children: "Post not found",
                      }),
                      e.jsx("div", {
                        className: "mt-2 text-sm text-slate-600",
                        children:
                          "This post may be unpublished or the link is incorrect.",
                      }),
                      e.jsx("div", {
                        className: "mt-6",
                        children: e.jsx(g, {
                          asChild: !0,
                          variant: "outline",
                          className: "rounded-full",
                          children: e.jsx(j, {
                            to: "/blog",
                            children: "Back to blog",
                          }),
                        }),
                      }),
                    ],
                  }),
          }),
        }),
        e.jsx($, {}),
      ],
    });
  };
export { Q as default };
