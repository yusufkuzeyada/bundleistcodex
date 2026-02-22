import { j as e } from "./query.js";
import { r, L as i } from "./react.js";
import { u as w, s as p, l as b, H as _, B as y, S, F as L } from "./app.js";
import { u as k } from "./i18n.js";
import { A as B } from "./arrow-left.js";
import "./supabase.js";
import "./radix.js";
const P = () => {
  const { user: n } = w(),
    { i18n: o, t: f } = k(),
    [d, m] = r.useState([]),
    [j, x] = r.useState(!0),
    [h, g] = r.useState(null),
    [c, v] = r.useState("");
  r.useEffect(() => {
    N();
  }, []);
  const N = async () => {
      (x(!0), g(null));
      const s =
          "id, slug, title, title_en, title_tr, title_fr, excerpt, excerpt_en, excerpt_tr, excerpt_fr, image_url, created_at, published",
        a = "id, title, excerpt, image_url, created_at, published";
      let { data: t, error: l } = await p
        .from("blog_posts")
        .select(s)
        .eq("published", !0)
        .order("created_at", { ascending: !1 });
      (l &&
        /does not exist/i.test(l.message) &&
        ({ data: t, error: l } = await p
          .from("blog_posts")
          .select(a)
          .eq("published", !0)
          .order("created_at", { ascending: !1 })),
        l ? (g(l.message), m([])) : m(t ?? []),
        x(!1));
    },
    u = r.useMemo(() => {
      const s = c.trim().toLowerCase();
      return s
        ? d.filter((a) => {
            const t = b(a, o.language);
            return `${t.title} ${t.excerpt || ""}`.toLowerCase().includes(s);
          })
        : d;
    }, [d, c, o.language]);
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(_, {}),
      e.jsxs("main", {
        className: "min-h-screen bg-gradient-to-b from-white to-slate-50",
        children: [
          e.jsxs("section", {
            className: "pt-28 pb-10 relative overflow-hidden",
            children: [
              e.jsx("div", {
                className:
                  "absolute inset-0 pointer-events-none bg-[radial-gradient(900px_circle_at_30%_20%,rgba(16,185,129,0.12),transparent_55%),radial-gradient(800px_circle_at_70%_30%,rgba(59,130,246,0.12),transparent_55%)]",
              }),
              e.jsxs("div", {
                className: "mx-auto max-w-7xl px-4 sm:px-6 relative",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center gap-3 text-sm",
                    children: [
                      e.jsxs(i, {
                        to: "/",
                        className:
                          "inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 font-semibold",
                        children: [
                          e.jsx(B, { className: "h-4 w-4" }),
                          "Back to Home",
                        ],
                      }),
                      e.jsx("div", { className: "flex-1" }),
                      (n == null ? void 0 : n.role) === "admin"
                        ? e.jsx(y, {
                            asChild: !0,
                            variant: "outline",
                            className: "rounded-full h-9",
                            children: e.jsx(i, {
                              to: "/blog/admin",
                              children: "Manage posts",
                            }),
                          })
                        : e.jsx(i, {
                            to: "/auth?redirect=%2Fblog%2Fadmin",
                            className:
                              "text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4",
                            children: "Staff login",
                          }),
                    ],
                  }),
                  e.jsxs("div", {
                    className:
                      "mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end",
                    children: [
                      e.jsxs("div", {
                        className: "lg:col-span-7",
                        children: [
                          e.jsx("div", {
                            className:
                              "inline-flex items-center rounded-full border border-slate-900/10 bg-white/70 backdrop-blur px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm",
                            children: "Insights on cross-border commerce",
                          }),
                          e.jsx("h1", {
                            className:
                              "mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-slate-950",
                            children: "The Bundleist Blog",
                          }),
                          e.jsx("p", {
                            className:
                              "mt-4 text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed",
                            children:
                              "Expert analysis, industry trends, and practical tips for international trade, logistics, and procurement.",
                          }),
                        ],
                      }),
                      e.jsx("div", {
                        className: "lg:col-span-5",
                        children: e.jsxs("div", {
                          className:
                            "rounded-3xl border border-slate-900/10 bg-white/80 backdrop-blur shadow-sm p-4",
                          children: [
                            e.jsx("label", {
                              className:
                                "text-xs font-bold text-slate-700 uppercase tracking-wide",
                              children: "Search",
                            }),
                            e.jsxs("div", {
                              className: "mt-2 relative",
                              children: [
                                e.jsx(S, {
                                  className:
                                    "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2",
                                }),
                                e.jsx("input", {
                                  type: "text",
                                  value: c,
                                  onChange: (s) => v(s.target.value),
                                  placeholder: "Search by title or excerpt...",
                                  className:
                                    "w-full h-11 rounded-2xl border border-slate-900/10 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "mt-2 text-xs text-slate-600",
                              children: [d.length, " published posts"],
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
          e.jsx("div", {
            className: "mx-auto max-w-7xl px-4 sm:px-6 pb-16",
            children: j
              ? e.jsxs("div", {
                  className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
                  children: [
                    e.jsxs("div", {
                      className:
                        "lg:col-span-7 rounded-3xl border border-slate-900/10 bg-white p-5 shadow-sm",
                      children: [
                        e.jsx("div", {
                          className: "h-56 w-full bg-slate-100 rounded-2xl",
                        }),
                        e.jsx("div", {
                          className: "mt-4 h-7 w-3/4 bg-slate-100 rounded",
                        }),
                        e.jsx("div", {
                          className: "mt-2 h-4 w-1/2 bg-slate-100 rounded",
                        }),
                        e.jsx("div", {
                          className: "mt-6 h-4 w-full bg-slate-100 rounded",
                        }),
                        e.jsx("div", {
                          className: "mt-2 h-4 w-11/12 bg-slate-100 rounded",
                        }),
                      ],
                    }),
                    e.jsx("div", {
                      className:
                        "lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6",
                      children: Array.from({ length: 3 }).map((s, a) =>
                        e.jsxs(
                          "div",
                          {
                            className:
                              "rounded-3xl border border-slate-900/10 bg-white p-5 shadow-sm",
                            children: [
                              e.jsx("div", {
                                className:
                                  "h-36 w-full bg-slate-100 rounded-2xl",
                              }),
                              e.jsx("div", {
                                className:
                                  "mt-4 h-5 w-5/6 bg-slate-100 rounded",
                              }),
                              e.jsx("div", {
                                className:
                                  "mt-2 h-4 w-2/3 bg-slate-100 rounded",
                              }),
                            ],
                          },
                          a,
                        ),
                      ),
                    }),
                  ],
                })
              : h
                ? e.jsxs("div", {
                    className:
                      "text-red-700 bg-red-50 border border-red-200 p-4 rounded-2xl",
                    children: ["Failed to load blog posts: ", h],
                  })
                : d.length === 0
                  ? e.jsx("div", {
                      className:
                        "rounded-3xl border border-slate-900/10 bg-white p-8 shadow-sm text-center text-slate-700",
                      children: "No blog posts published yet.",
                    })
                  : u.length === 0
                    ? e.jsx("div", {
                        className:
                          "rounded-3xl border border-slate-900/10 bg-white p-8 shadow-sm text-center text-slate-700",
                        children: "No posts match your search.",
                      })
                    : e.jsx("div", {
                        className: "overflow-x-auto hide-scrollbar pb-2",
                        children: e.jsx("div", {
                          className: "flex gap-6 min-w-0",
                          children: u.map((s, a) => {
                            const t = b(s, o.language);
                            return e.jsxs(
                              i,
                              {
                                to: `/blog/${s.id}`,
                                className: [
                                  "group block flex-none rounded-[1.75rem] border border-slate-900/10 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden",
                                  a === 0
                                    ? "w-full md:w-[26rem]"
                                    : "w-full md:w-[22rem]",
                                ].join(" "),
                                children: [
                                  e.jsx("div", {
                                    className: "bg-slate-100",
                                    children: s.image_url
                                      ? e.jsx("img", {
                                          src: s.image_url,
                                          alt: t.title,
                                          className:
                                            "w-full h-48 object-cover group-hover:scale-[1.02] transition-transform duration-500",
                                          loading: "lazy",
                                        })
                                      : e.jsx("div", {
                                          className:
                                            "w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200",
                                        }),
                                  }),
                                  e.jsxs("div", {
                                    className: "p-5",
                                    children: [
                                      e.jsxs("div", {
                                        className:
                                          "flex items-center gap-2 text-xs text-slate-600",
                                        children: [
                                          a === 0 &&
                                            e.jsx("span", {
                                              className:
                                                "px-3 py-1 rounded-full bg-slate-100 border border-slate-900/10 font-semibold",
                                              children: "Featured",
                                            }),
                                          e.jsx("span", {
                                            className:
                                              "px-3 py-1 rounded-full bg-white border border-slate-900/10 font-semibold",
                                            children: new Date(
                                              s.created_at,
                                            ).toLocaleDateString(o.language),
                                          }),
                                        ],
                                      }),
                                      e.jsx("h2", {
                                        className:
                                          "mt-3 text-xl font-bold tracking-tight text-slate-950 group-hover:text-emerald-700 transition-colors line-clamp-2",
                                        children: t.title,
                                      }),
                                      t.excerpt &&
                                        e.jsx("p", {
                                          className:
                                            "mt-2 text-sm text-slate-700 leading-relaxed line-clamp-3",
                                          children: t.excerpt,
                                        }),
                                      e.jsx("div", {
                                        className:
                                          "mt-4 text-sm font-bold text-emerald-700 group-hover:text-emerald-800",
                                        children: f("readArticle"),
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              s.id,
                            );
                          }),
                        }),
                      }),
          }),
        ],
      }),
      e.jsx(L, {}),
    ],
  });
};
export { P as default };
