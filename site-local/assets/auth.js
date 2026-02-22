import { j as e } from "./query.js";
import { r as t, u as ee, f as se, L as n } from "./react.js";
import { c as I, b as g, u as te, d as q, B } from "./app.js";
import { m as D, n as U, o as V, p as ae } from "./radix.js";
import { A as le } from "./arrow-left.js";
import { E as M } from "./eye.js";
import "./supabase.js";
import "./i18n.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const R = I("EyeOff", [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f",
    },
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a",
    },
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const O = I("LoaderCircle", [
    ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }],
  ]),
  re = ae,
  H = t.forwardRef(({ className: a, ...r }, l) =>
    e.jsx(D, {
      ref: l,
      className: g(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        a,
      ),
      ...r,
    }),
  );
H.displayName = D.displayName;
const p = t.forwardRef(({ className: a, ...r }, l) =>
  e.jsx(U, {
    ref: l,
    className: g(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      a,
    ),
    ...r,
  }),
);
p.displayName = U.displayName;
const b = t.forwardRef(({ className: a, ...r }, l) =>
  e.jsx(V, {
    ref: l,
    className: g(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      a,
    ),
    ...r,
  }),
);
b.displayName = V.displayName;
const z = "2026-02-18",
  he = () => {
    const [a, r] = t.useState(""),
      [l, f] = t.useState(""),
      [v, W] = t.useState(""),
      [j, Y] = t.useState(""),
      [N, G] = t.useState(""),
      [w, J] = t.useState(""),
      [c, y] = t.useState(!1),
      [k, C] = t.useState(null),
      [S, P] = t.useState(null),
      [o, E] = t.useState(!1),
      [x, Q] = t.useState(!1),
      [K, L] = t.useState("signin"),
      u = ee(),
      m = se(),
      { user: _, signUp: X, login: Z, loading: $ } = te(),
      h = t.useMemo(() => {
        const d = new URLSearchParams(m.search).get("redirect");
        return !d || !d.startsWith("/") ? "/" : d;
      }, [m.search]),
      T = t.useMemo(
        () =>
          new URLSearchParams(m.search).get("mode") === "signup"
            ? "signup"
            : "signin",
        [m.search],
      );
    t.useEffect(() => {
      L(T);
    }, [T]);
    const i =
      "w-full h-11 px-4 rounded-2xl border border-slate-900/10 bg-white/70 backdrop-blur shadow-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40";
    t.useEffect(() => {
      _ && u(h);
    }, [_, u, h]);
    const F = async (s, d) => {
      (s.preventDefault(), y(!0), C(null), P(null));
      try {
        if (d === "signup") {
          if (!x)
            throw new Error(
              "Please review and accept the Privacy Policy and Terms of Service.",
            );
          (await X(a, l, v, j, N, w, {
            acceptedAt: new Date().toISOString(),
            version: z,
          }),
            P("Check your email to confirm your account, then sign in."));
        } else (await Z(a, l), u(h));
      } catch (A) {
        C(A instanceof Error ? A.message : "An error occurred");
      } finally {
        y(!1);
      }
    };
    return $
      ? e.jsx("div", {
          className:
            "min-h-screen grid place-items-center bg-gradient-to-br from-slate-50 via-white to-blue-50",
          children: e.jsx("div", {
            className: "text-sm text-slate-600",
            children: "Loading...",
          }),
        })
      : e.jsxs("div", {
          className:
            "min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden",
          children: [
            e.jsx("div", {
              className:
                "absolute inset-0 pointer-events-none opacity-70 bg-[radial-gradient(900px_circle_at_25%_20%,rgba(59,130,246,0.10),transparent_55%),radial-gradient(700px_circle_at_70%_50%,rgba(52,211,153,0.10),transparent_55%)]",
            }),
            e.jsx("div", {
              className:
                "absolute top-24 left-10 w-72 h-72 rounded-full blur-3xl opacity-25 bg-gradient-to-r from-emerald-200 to-blue-200 pointer-events-none",
            }),
            e.jsx("div", {
              className:
                "absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-r from-blue-200 to-indigo-200 pointer-events-none",
            }),
            e.jsxs("div", {
              className:
                "relative mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12",
              children: [
                e.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    e.jsxs(n, {
                      to: "/",
                      className:
                        "inline-flex items-center gap-2 text-slate-700 hover:text-slate-950",
                      children: [
                        e.jsx(le, { className: "h-4 w-4" }),
                        e.jsx("span", {
                          className: "text-sm font-semibold",
                          children: "Back",
                        }),
                      ],
                    }),
                    e.jsx(n, {
                      to: "/",
                      className: "flex items-center gap-2",
                      children: e.jsx(q, {
                        size: "xxs",
                        showText: !0,
                        markClassName: "w-8 h-8",
                        textClassName: "text-base",
                      }),
                    }),
                    e.jsx("div", { className: "w-[56px]" }),
                  ],
                }),
                e.jsxs("div", {
                  className:
                    "mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start",
                  children: [
                    e.jsxs("div", {
                      className: "hidden lg:block pt-4",
                      children: [
                        e.jsx("div", {
                          className:
                            "inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 backdrop-blur px-4 py-2 text-xs font-bold text-slate-700 shadow-sm",
                          children: "Customer portal access",
                        }),
                        e.jsx("h1", {
                          className:
                            "mt-5 text-4xl font-extrabold tracking-tight text-slate-950",
                          children:
                            "One place to track orders, consolidations, and shipments.",
                        }),
                        e.jsx("p", {
                          className:
                            "mt-4 text-base text-slate-700 leading-relaxed max-w-md",
                          children:
                            "Sign in to see real statuses, costs, and next actions. No chasing suppliers. No guessing.",
                        }),
                        e.jsx("div", {
                          className: "mt-6 grid grid-cols-1 gap-3 max-w-md",
                          children: [
                            {
                              k: "Visibility",
                              v: "Order -> consolidation -> shipment relationships are obvious",
                            },
                            {
                              k: "Ledger",
                              v: "Payments, costs, and net balance in one view",
                            },
                            {
                              k: "Exceptions",
                              v: "Flag what's missing and act fast",
                            },
                          ].map((s) =>
                            e.jsxs(
                              "div",
                              {
                                className:
                                  "rounded-3xl border border-slate-900/10 bg-white/70 backdrop-blur px-5 py-4 shadow-sm",
                                children: [
                                  e.jsx("div", {
                                    className:
                                      "text-sm font-bold text-slate-950",
                                    children: s.k,
                                  }),
                                  e.jsx("div", {
                                    className:
                                      "mt-1 text-sm text-slate-700 leading-relaxed",
                                    children: s.v,
                                  }),
                                ],
                              },
                              s.k,
                            ),
                          ),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "lg:justify-self-end w-full",
                      children: [
                        e.jsxs("div", {
                          className:
                            "rounded-[2rem] border border-slate-900/10 bg-white/80 backdrop-blur-xl shadow-[0_26px_90px_-55px_rgba(15,23,42,0.55)] overflow-hidden",
                          children: [
                            e.jsx("div", {
                              className:
                                "px-6 sm:px-7 pt-6 pb-4 border-b border-slate-900/10 bg-white/70",
                              children: e.jsxs("div", {
                                className:
                                  "flex items-center justify-between gap-4",
                                children: [
                                  e.jsxs("div", {
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-sm font-bold text-slate-950",
                                        children: "Welcome back",
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "mt-1 text-sm text-slate-600",
                                        children:
                                          "Sign in or create an account to continue.",
                                      }),
                                    ],
                                  }),
                                  e.jsx(q, {
                                    size: "xxs",
                                    showText: !1,
                                    markClassName: "w-9 h-9",
                                  }),
                                ],
                              }),
                            }),
                            e.jsxs("div", {
                              className: "p-6 sm:p-7",
                              children: [
                                k &&
                                  e.jsx("div", {
                                    className:
                                      "mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 font-semibold",
                                    children: k,
                                  }),
                                S &&
                                  e.jsx("div", {
                                    className:
                                      "mb-4 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 font-semibold",
                                    children: S,
                                  }),
                                e.jsxs(re, {
                                  value: K,
                                  onValueChange: (s) =>
                                    L(s === "signup" ? "signup" : "signin"),
                                  className: "w-full",
                                  children: [
                                    e.jsxs(H, {
                                      className:
                                        "grid grid-cols-2 w-full rounded-2xl",
                                      children: [
                                        e.jsx(p, {
                                          value: "signin",
                                          className: "rounded-2xl",
                                          children: "Sign in",
                                        }),
                                        e.jsx(p, {
                                          value: "signup",
                                          className: "rounded-2xl",
                                          children: "Sign up",
                                        }),
                                      ],
                                    }),
                                    e.jsx(b, {
                                      value: "signin",
                                      className: "mt-5",
                                      children: e.jsxs("form", {
                                        onSubmit: (s) => F(s, "signin"),
                                        className: "space-y-4",
                                        children: [
                                          e.jsxs("div", {
                                            children: [
                                              e.jsx("label", {
                                                htmlFor: "email",
                                                className:
                                                  "block text-sm font-semibold text-slate-800 mb-2",
                                                children: "Email",
                                              }),
                                              e.jsx("input", {
                                                type: "email",
                                                id: "email",
                                                placeholder: "you@company.com",
                                                value: a,
                                                onChange: (s) =>
                                                  r(s.target.value),
                                                className: i,
                                                required: !0,
                                                autoComplete: "email",
                                              }),
                                            ],
                                          }),
                                          e.jsxs("div", {
                                            children: [
                                              e.jsx("label", {
                                                htmlFor: "password",
                                                className:
                                                  "block text-sm font-semibold text-slate-800 mb-2",
                                                children: "Password",
                                              }),
                                              e.jsxs("div", {
                                                className: "relative",
                                                children: [
                                                  e.jsx("input", {
                                                    type: o
                                                      ? "text"
                                                      : "password",
                                                    id: "password",
                                                    placeholder:
                                                      "Your password",
                                                    value: l,
                                                    onChange: (s) =>
                                                      f(s.target.value),
                                                    className: [
                                                      i,
                                                      "pr-12",
                                                    ].join(" "),
                                                    required: !0,
                                                    autoComplete:
                                                      "current-password",
                                                  }),
                                                  e.jsx("button", {
                                                    type: "button",
                                                    onClick: () => E((s) => !s),
                                                    className:
                                                      "absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl border border-slate-900/10 bg-white hover:bg-slate-50 inline-flex items-center justify-center text-slate-600",
                                                    "aria-label": o
                                                      ? "Hide password"
                                                      : "Show password",
                                                    children: o
                                                      ? e.jsx(R, {
                                                          className: "h-4 w-4",
                                                        })
                                                      : e.jsx(M, {
                                                          className: "h-4 w-4",
                                                        }),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          e.jsxs(B, {
                                            type: "submit",
                                            className:
                                              "w-full rounded-2xl h-11 bg-slate-900 hover:bg-slate-800 text-white",
                                            disabled: c,
                                            children: [
                                              c
                                                ? e.jsx(O, {
                                                    className:
                                                      "h-4 w-4 mr-2 animate-spin",
                                                  })
                                                : null,
                                              "Sign in",
                                            ],
                                          }),
                                          e.jsxs("div", {
                                            className:
                                              "text-xs text-slate-500 leading-relaxed",
                                            children: [
                                              "By continuing, you agree to our",
                                              " ",
                                              e.jsx(n, {
                                                to: "/terms",
                                                className:
                                                  "font-semibold text-slate-700 underline underline-offset-4 hover:text-emerald-700",
                                                children: "Terms of Service",
                                              }),
                                              " ",
                                              "and acknowledge our",
                                              " ",
                                              e.jsx(n, {
                                                to: "/privacy",
                                                className:
                                                  "font-semibold text-slate-700 underline underline-offset-4 hover:text-emerald-700",
                                                children: "Privacy Policy",
                                              }),
                                              ".",
                                            ],
                                          }),
                                        ],
                                      }),
                                    }),
                                    e.jsx(b, {
                                      value: "signup",
                                      className: "mt-5",
                                      children: e.jsxs("form", {
                                        onSubmit: (s) => F(s, "signup"),
                                        className: "space-y-4",
                                        children: [
                                          e.jsxs("div", {
                                            className:
                                              "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                            children: [
                                              e.jsxs("div", {
                                                children: [
                                                  e.jsx("label", {
                                                    htmlFor: "name",
                                                    className:
                                                      "block text-sm font-semibold text-slate-800 mb-2",
                                                    children: "Full name",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    id: "name",
                                                    placeholder: "Jane Doe",
                                                    value: v,
                                                    onChange: (s) =>
                                                      W(s.target.value),
                                                    className: i,
                                                    required: !0,
                                                    autoComplete: "name",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                children: [
                                                  e.jsx("label", {
                                                    htmlFor: "companyName",
                                                    className:
                                                      "block text-sm font-semibold text-slate-800 mb-2",
                                                    children: "Company",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    id: "companyName",
                                                    placeholder: "Acme Imports",
                                                    value: j,
                                                    onChange: (s) =>
                                                      Y(s.target.value),
                                                    className: i,
                                                    required: !0,
                                                    autoComplete:
                                                      "organization",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          e.jsxs("div", {
                                            className:
                                              "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                            children: [
                                              e.jsxs("div", {
                                                children: [
                                                  e.jsx("label", {
                                                    htmlFor: "phone",
                                                    className:
                                                      "block text-sm font-semibold text-slate-800 mb-2",
                                                    children: "Phone",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "tel",
                                                    id: "phone",
                                                    placeholder:
                                                      "+1 555 000 0000",
                                                    value: N,
                                                    onChange: (s) =>
                                                      G(s.target.value),
                                                    className: i,
                                                    required: !0,
                                                    autoComplete: "tel",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                children: [
                                                  e.jsx("label", {
                                                    htmlFor: "email2",
                                                    className:
                                                      "block text-sm font-semibold text-slate-800 mb-2",
                                                    children: "Email",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "email",
                                                    id: "email2",
                                                    placeholder:
                                                      "you@company.com",
                                                    value: a,
                                                    onChange: (s) =>
                                                      r(s.target.value),
                                                    className: i,
                                                    required: !0,
                                                    autoComplete: "email",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          e.jsxs("div", {
                                            children: [
                                              e.jsx("label", {
                                                htmlFor: "address",
                                                className:
                                                  "block text-sm font-semibold text-slate-800 mb-2",
                                                children: "Business address",
                                              }),
                                              e.jsx("textarea", {
                                                id: "address",
                                                placeholder:
                                                  "Street, city, country",
                                                value: w,
                                                onChange: (s) =>
                                                  J(s.target.value),
                                                rows: 2,
                                                className: [
                                                  i,
                                                  "h-auto py-3 resize-none",
                                                ].join(" "),
                                                required: !0,
                                                autoComplete: "street-address",
                                              }),
                                            ],
                                          }),
                                          e.jsxs("div", {
                                            children: [
                                              e.jsx("label", {
                                                htmlFor: "password2",
                                                className:
                                                  "block text-sm font-semibold text-slate-800 mb-2",
                                                children: "Password",
                                              }),
                                              e.jsxs("div", {
                                                className: "relative",
                                                children: [
                                                  e.jsx("input", {
                                                    type: o
                                                      ? "text"
                                                      : "password",
                                                    id: "password2",
                                                    placeholder:
                                                      "Create a password",
                                                    value: l,
                                                    onChange: (s) =>
                                                      f(s.target.value),
                                                    className: [
                                                      i,
                                                      "pr-12",
                                                    ].join(" "),
                                                    required: !0,
                                                    autoComplete:
                                                      "new-password",
                                                  }),
                                                  e.jsx("button", {
                                                    type: "button",
                                                    onClick: () => E((s) => !s),
                                                    className:
                                                      "absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl border border-slate-900/10 bg-white hover:bg-slate-50 inline-flex items-center justify-center text-slate-600",
                                                    "aria-label": o
                                                      ? "Hide password"
                                                      : "Show password",
                                                    children: o
                                                      ? e.jsx(R, {
                                                          className: "h-4 w-4",
                                                        })
                                                      : e.jsx(M, {
                                                          className: "h-4 w-4",
                                                        }),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          e.jsxs("div", {
                                            className:
                                              "rounded-2xl border border-slate-900/10 bg-slate-50/80 p-4",
                                            children: [
                                              e.jsx("div", {
                                                className:
                                                  "text-sm font-bold text-slate-900",
                                                children:
                                                  "Privacy and terms consent (required)",
                                              }),
                                              e.jsx("p", {
                                                className:
                                                  "mt-2 text-xs text-slate-700 leading-relaxed",
                                                children:
                                                  "By creating an account, you authorize Bundleist to process your account and operational data for procurement coordination, consolidation planning, shipment management, settlement workflows, and compliance operations.",
                                              }),
                                              e.jsxs("p", {
                                                className:
                                                  "mt-2 text-xs text-slate-700 leading-relaxed",
                                                children: [
                                                  "This includes your contact details, company profile, order and shipment activity, and payment records. Processing is described in our",
                                                  " ",
                                                  e.jsx(n, {
                                                    to: "/privacy",
                                                    className:
                                                      "font-semibold text-slate-900 underline underline-offset-4 hover:text-emerald-700",
                                                    children: "Privacy Policy",
                                                  }),
                                                  " ",
                                                  "and",
                                                  " ",
                                                  e.jsx(n, {
                                                    to: "/terms",
                                                    className:
                                                      "font-semibold text-slate-900 underline underline-offset-4 hover:text-emerald-700",
                                                    children:
                                                      "Terms of Service",
                                                  }),
                                                  ".",
                                                ],
                                              }),
                                              e.jsxs("label", {
                                                htmlFor: "privacyConsent",
                                                className:
                                                  "mt-3 flex items-start gap-3 cursor-pointer",
                                                children: [
                                                  e.jsx("input", {
                                                    id: "privacyConsent",
                                                    type: "checkbox",
                                                    checked: x,
                                                    onChange: (s) =>
                                                      Q(s.target.checked),
                                                    className:
                                                      "mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-emerald-500",
                                                    required: !0,
                                                  }),
                                                  e.jsxs("span", {
                                                    className:
                                                      "text-xs text-slate-800 leading-relaxed",
                                                    children: [
                                                      "I accept the Privacy Policy and Terms of Service (version ",
                                                      z,
                                                      ").",
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          e.jsxs(B, {
                                            type: "submit",
                                            className:
                                              "w-full rounded-2xl h-11 bg-slate-900 hover:bg-slate-800 text-white",
                                            disabled: c || !x,
                                            children: [
                                              c
                                                ? e.jsx(O, {
                                                    className:
                                                      "h-4 w-4 mr-2 animate-spin",
                                                  })
                                                : null,
                                              "Create account",
                                            ],
                                          }),
                                          e.jsx("div", {
                                            className:
                                              "text-xs text-slate-500 leading-relaxed",
                                            children:
                                              "You'll receive an email confirmation link after signup.",
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
                        e.jsxs("div", {
                          className: "mt-5 text-center text-xs text-slate-500",
                          children: [
                            "Need help? ",
                            e.jsx(n, {
                              to: "/contact",
                              className:
                                "font-semibold text-slate-700 hover:text-emerald-700",
                              children: "Contact us",
                            }),
                            ".",
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
  };
export { he as default };
