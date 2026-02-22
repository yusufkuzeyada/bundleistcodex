import { j as e } from "./radix.js";
import { c as d } from "./app.js";
const c = ({ title: t, subtitle: i, icon: l, actions: a = [], right: r }) =>
  e.jsx("div", {
    className: "ui-surface-solid overflow-hidden",
    children: e.jsx("div", {
      className: "ui-section-header",
      children: e.jsxs("div", {
        className:
          "flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
        children: [
          e.jsxs("div", {
            className: "flex min-w-0 flex-1 items-start gap-3",
            children: [
              l &&
                e.jsx("div", {
                  className:
                    "h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm shrink-0",
                  children: l,
                }),
              e.jsxs("div", {
                className: "min-w-0 flex-1",
                children: [
                  e.jsx("div", {
                    className: "ui-h1 break-words sm:truncate",
                    children: t,
                  }),
                  i &&
                    e.jsx("div", {
                      className: "ui-subtitle mt-1 max-w-prose",
                      children: i,
                    }),
                ],
              }),
            ],
          }),
          (a.length > 0 || r) &&
            e.jsxs("div", {
              className:
                "flex flex-wrap items-center gap-2 sm:justify-end sm:shrink-0",
              children: [
                a.map((s) =>
                  e.jsx(
                    d,
                    {
                      type: "button",
                      variant: s.variant || "outline",
                      size: "sm",
                      onClick: s.onClick,
                      disabled: s.disabled,
                      children: s.label,
                    },
                    s.label,
                  ),
                ),
                r,
              ],
            }),
        ],
      }),
    }),
  });
export { c as P };
