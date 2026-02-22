import { j as e } from "./query.js";
import { e as r } from "./app.js";
import "./react.js";
import "./supabase.js";
import "./radix.js";
import "./i18n.js";
const t = "https://cal.com/yusuf-bicer-8ytuyg",
  c = () =>
    e.jsxs(e.Fragment, {
      children: [
        e.jsx(r, {
          title: "Bundleist.inc",
          description: "Contact Bundleist to book a call with our team.",
        }),
        e.jsx("div", {
          className: "min-h-screen bg-slate-50",
          children: e.jsxs("div", {
            className: "relative w-full h-[100vh]",
            children: [
              e.jsx("a", {
                href: t,
                target: "_blank",
                rel: "noopener noreferrer",
                className:
                  "absolute top-4 right-4 z-10 inline-flex items-center px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow",
                children: "Open in new tab",
              }),
              e.jsx("iframe", {
                title: "Bundleist booking",
                src: t,
                className: "w-full h-full",
                loading: "lazy",
                referrerPolicy: "no-referrer",
              }),
            ],
          }),
        }),
      ],
    });
export { c as default };
