import { j as e } from "./query.js";
import { f as s, r as a, L as o } from "./react.js";
import { c as r, e as n, B as l } from "./app.js";
import "./supabase.js";
import "./radix.js";
import "./i18n.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const i = r("House", [
    [
      "path",
      { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" },
    ],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        key: "1d0kgt",
      },
    ],
  ]),
  p = () => {
    const t = s();
    return (
      a.useEffect(() => {
        console.error(
          "404 Error: User attempted to access non-existent route:",
          t.pathname,
        );
      }, [t.pathname]),
      e.jsxs(e.Fragment, {
        children: [
          e.jsx(n, {
            title: "Page Not Found | Bundleist",
            description:
              "The page you're looking for doesn't exist. Return to Bundleist's Turkish export consolidation platform.",
            noindex: !0,
          }),
          e.jsx("div", {
            className:
              "min-h-screen flex items-center justify-center bg-gray-50 px-4",
            children: e.jsxs("div", {
              className: "text-center max-w-md",
              children: [
                e.jsx("h1", {
                  className: "text-9xl font-bold text-gray-200 mb-6",
                  children: "404",
                }),
                e.jsxs("div", {
                  className: "mb-8",
                  children: [
                    e.jsx("h2", {
                      className: "text-2xl font-bold mb-2",
                      children: "Page Not Found",
                    }),
                    e.jsx("p", {
                      className: "text-gray-600",
                      children:
                        "Sorry, we couldn't find the page you're looking for. The page might have been moved or deleted.",
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className: "space-y-3",
                  children: [
                    e.jsx(l, {
                      asChild: !0,
                      className: "w-full",
                      size: "lg",
                      children: e.jsxs(o, {
                        to: "/",
                        children: [
                          e.jsx(i, { className: "mr-2 h-4 w-4" }),
                          "Back to Home",
                        ],
                      }),
                    }),
                    e.jsxs("div", {
                      className: "text-sm text-gray-500",
                      children: [
                        e.jsx("span", { children: "Need help? " }),
                        e.jsx("button", {
                          className: "text-blue-600 hover:text-blue-800",
                          children: "Contact Support",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      })
    );
  };
export { p as default };
