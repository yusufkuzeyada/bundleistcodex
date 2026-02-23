import { j as e } from "./query.js";
import { r as a, L as y } from "./react.js";
import { c as k, u as D, s as o, H as A, B as p, F as M } from "./app.js";
import { A as T } from "./arrow-left.js";
import { E as q } from "./eye.js";
import "./supabase.js";
import "./radix.js";
import "./i18n.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const B = k("Pencil", [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu",
    },
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const H = k("Trash2", [
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
    ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
    ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
    ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
  ]),
  _ = { title: "", excerpt: "", image_url: "", content: "", published: !1 },
  O = () => {
    const { user: r } = D(),
      [d, g] = a.useState([]),
      [E, f] = a.useState(!0),
      [j, N] = a.useState(!1),
      [v, i] = a.useState(null),
      [n, w] = a.useState(null),
      [s, c] = a.useState(_),
      m = a.useMemo(() => d.find((t) => t.id === n) ?? null, [d, n]);
    a.useEffect(() => {
      h();
    }, []);
    const h = async () => {
        (f(!0), i(null));
        const { data: t, error: l } = await o
          .from("blog_posts")
          .select(
            "id, title, excerpt, image_url, created_at, content, published",
          )
          .order("created_at", { ascending: !1 });
        (l ? (i(l.message), g([])) : g(t ?? []), f(!1));
      },
      b = () => {
        (w(null), c(_));
      },
      S = (t) => {
        (w(t.id),
          c({
            title: t.title,
            excerpt: t.excerpt ?? "",
            image_url: t.image_url ?? "",
            content: t.content,
            published: !!t.published,
          }));
      },
      x = (t) => {
        c((l) => ({ ...l, [t.target.name]: t.target.value }));
      },
      F = () => {
        c((t) => ({ ...t, published: !t.published }));
      },
      P = async (t) => {
        if (
          (t.preventDefault(), i(null), !s.title.trim() || !s.content.trim())
        ) {
          i("Title and content are required.");
          return;
        }
        N(!0);
        try {
          if (n) {
            const { error: l } = await o
              .from("blog_posts")
              .update({
                title: s.title.trim(),
                excerpt: s.excerpt.trim() || null,
                image_url: s.image_url.trim() || null,
                content: s.content,
                published: s.published,
              })
              .eq("id", n);
            if (l) throw l;
          } else {
            const l = {
              title: s.title.trim(),
              excerpt: s.excerpt.trim() || null,
              image_url: s.image_url.trim() || null,
              content: s.content,
              published: s.published,
            };
            r != null && r.id && (l.author_id = r.id);
            let { error: u } = await o.from("blog_posts").insert([l]);
            if (u && "author_id" in l) {
              const { author_id: I, ...C } = l;
              ({ error: u } = await o.from("blog_posts").insert([C]));
            }
            if (u) throw u;
          }
          (b(), await h());
        } catch (l) {
          i(l instanceof Error ? l.message : "Failed to save blog post.");
        } finally {
          N(!1);
        }
      },
      L = async (t) => {
        if (!window.confirm("Delete this post?")) return;
        i(null);
        const { error: l } = await o.from("blog_posts").delete().eq("id", t);
        if (l) {
          i(l.message);
          return;
        }
        (n === t && b(), await h());
      };
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx(A, {}),
        e.jsx("main", {
          className: "min-h-screen bg-gradient-to-b from-white to-slate-50",
          children: e.jsxs("div", {
            className: "mx-auto max-w-7xl px-4 sm:px-6 pt-28 pb-16",
            children: [
              e.jsx("section", {
                className: "pb-6",
                children: e.jsxs("div", {
                  className: "flex flex-col sm:flex-row sm:items-end gap-4",
                  children: [
                    e.jsxs("div", {
                      children: [
                        e.jsxs(y, {
                          to: "/blog",
                          className:
                            "inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700",
                          children: [
                            e.jsx(T, { className: "h-4 w-4" }),
                            "Back to blog",
                          ],
                        }),
                        e.jsx("h1", {
                          className:
                            "mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-950",
                          children: "Blog Admin",
                        }),
                        e.jsx("p", {
                          className:
                            "text-slate-700 mt-2 text-sm md:text-base max-w-2xl",
                          children:
                            "Create, edit, publish, and delete posts. Public users can read published posts without logging in.",
                        }),
                      ],
                    }),
                    e.jsx("div", { className: "flex-1" }),
                    e.jsxs("div", {
                      className: "text-xs text-slate-600",
                      children: [
                        "Signed in as ",
                        e.jsx("span", {
                          className: "font-semibold text-slate-900",
                          children: (r == null ? void 0 : r.email) || "staff",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              v &&
                e.jsx("div", {
                  className:
                    "mb-4 text-red-700 bg-red-50 border border-red-200 p-4 rounded-2xl",
                  children: v,
                }),
              e.jsxs("div", {
                className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
                children: [
                  e.jsxs("section", {
                    className:
                      "lg:col-span-8 rounded-3xl border border-slate-900/10 bg-white shadow-sm p-5 sm:p-6",
                    children: [
                      e.jsxs("div", {
                        className: "flex items-center gap-3 mb-4",
                        children: [
                          e.jsx("h2", {
                            className: "font-bold text-slate-950",
                            children: m ? `Editing: ${m.title}` : "New post",
                          }),
                          e.jsx("div", { className: "flex-1" }),
                          m &&
                            e.jsx(p, {
                              type: "button",
                              variant: "outline",
                              className: "rounded-full h-9",
                              onClick: b,
                              children: "Cancel edit",
                            }),
                        ],
                      }),
                      e.jsxs("form", {
                        onSubmit: P,
                        className: "space-y-4",
                        children: [
                          e.jsxs("div", {
                            children: [
                              e.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                htmlFor: "title",
                                children: "Title",
                              }),
                              e.jsx("input", {
                                id: "title",
                                name: "title",
                                value: s.title,
                                onChange: x,
                                className:
                                  "w-full h-11 px-4 border border-slate-900/10 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
                                required: !0,
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            children: [
                              e.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                htmlFor: "excerpt",
                                children: "Excerpt (optional)",
                              }),
                              e.jsx("textarea", {
                                id: "excerpt",
                                name: "excerpt",
                                value: s.excerpt,
                                onChange: x,
                                rows: 2,
                                className:
                                  "w-full px-4 py-3 border border-slate-900/10 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            children: [
                              e.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                htmlFor: "image_url",
                                children: "Image URL (optional)",
                              }),
                              e.jsx("input", {
                                id: "image_url",
                                name: "image_url",
                                value: s.image_url,
                                onChange: x,
                                className:
                                  "w-full h-11 px-4 border border-slate-900/10 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
                              }),
                              s.image_url.trim()
                                ? e.jsx("div", {
                                    className:
                                      "mt-3 overflow-hidden rounded-2xl border border-slate-900/10 bg-slate-100",
                                    children: e.jsx("img", {
                                      src: s.image_url.trim(),
                                      alt: "Preview",
                                      className: "w-full max-h-60 object-cover",
                                    }),
                                  })
                                : null,
                            ],
                          }),
                          e.jsxs("div", {
                            children: [
                              e.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                htmlFor: "content",
                                children: "Content (HTML allowed)",
                              }),
                              e.jsx("textarea", {
                                id: "content",
                                name: "content",
                                value: s.content,
                                onChange: x,
                                rows: 10,
                                className:
                                  "w-full px-4 py-3 border border-slate-900/10 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 font-mono text-sm",
                                required: !0,
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className: "flex items-center gap-3",
                            children: [
                              e.jsxs("label", {
                                className:
                                  "inline-flex items-center gap-2 text-sm text-gray-700",
                                children: [
                                  e.jsx("input", {
                                    type: "checkbox",
                                    checked: s.published,
                                    onChange: F,
                                  }),
                                  "Published",
                                ],
                              }),
                              e.jsx("div", { className: "flex-1" }),
                              e.jsx("button", {
                                type: "submit",
                                disabled: j,
                                className:
                                  "px-5 h-10 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors disabled:opacity-50 font-semibold",
                                children: j
                                  ? "Saving..."
                                  : m
                                    ? "Save changes"
                                    : "Create post",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs("section", {
                    className:
                      "lg:col-span-4 rounded-3xl border border-slate-900/10 bg-white shadow-sm p-5 sm:p-6",
                    children: [
                      e.jsx("h2", {
                        className: "font-bold text-slate-950 mb-3",
                        children: "Posts",
                      }),
                      E
                        ? e.jsx("div", {
                            className: "text-sm text-slate-600",
                            children: "Loading...",
                          })
                        : d.length === 0
                          ? e.jsx("div", {
                              className: "text-sm text-slate-600",
                              children: "No posts yet.",
                            })
                          : e.jsx("div", {
                              className: "space-y-3",
                              children: d.map((t) =>
                                e.jsxs(
                                  "div",
                                  {
                                    className:
                                      "border border-slate-900/10 rounded-2xl p-4 hover:bg-slate-50 transition-colors",
                                    children: [
                                      e.jsxs("div", {
                                        className: "flex items-start gap-3",
                                        children: [
                                          e.jsxs("div", {
                                            className: "min-w-0",
                                            children: [
                                              e.jsx("div", {
                                                className:
                                                  "font-bold text-sm text-slate-950 truncate",
                                                children: t.title,
                                              }),
                                              e.jsxs("div", {
                                                className:
                                                  "mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600",
                                                children: [
                                                  e.jsx("span", {
                                                    className:
                                                      "px-2 py-0.5 rounded-full bg-white border border-slate-900/10 font-semibold",
                                                    children: new Date(
                                                      t.created_at,
                                                    ).toLocaleDateString(),
                                                  }),
                                                  e.jsx("span", {
                                                    className: [
                                                      "px-2 py-0.5 rounded-full border font-semibold",
                                                      t.published
                                                        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                                                        : "bg-slate-100 border-slate-900/10 text-slate-700",
                                                    ].join(" "),
                                                    children: t.published
                                                      ? "Published"
                                                      : "Draft",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          e.jsx("div", { className: "flex-1" }),
                                        ],
                                      }),
                                      e.jsxs("div", {
                                        className:
                                          "flex items-center gap-2 mt-3",
                                        children: [
                                          e.jsxs(p, {
                                            type: "button",
                                            variant: "outline",
                                            className: "rounded-full h-9 px-3",
                                            onClick: () => S(t),
                                            children: [
                                              e.jsx(B, {
                                                className: "h-4 w-4 mr-2",
                                              }),
                                              "Edit",
                                            ],
                                          }),
                                          e.jsxs(y, {
                                            to: `/blog/${t.id}`,
                                            className:
                                              "inline-flex items-center text-sm font-semibold text-slate-700 hover:text-emerald-700 px-3 h-9 rounded-full border border-slate-900/10 bg-white",
                                            children: [
                                              e.jsx(q, {
                                                className: "h-4 w-4 mr-2",
                                              }),
                                              "View",
                                            ],
                                          }),
                                          e.jsx("div", { className: "flex-1" }),
                                          e.jsxs(p, {
                                            type: "button",
                                            variant: "outline",
                                            className:
                                              "rounded-full h-9 px-3 text-red-700 hover:text-red-800",
                                            onClick: () => L(t.id),
                                            children: [
                                              e.jsx(H, {
                                                className: "h-4 w-4 mr-2",
                                              }),
                                              "Delete",
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  t.id,
                                ),
                              ),
                            }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        e.jsx(M, {}),
      ],
    });
  };
export { O as default };
