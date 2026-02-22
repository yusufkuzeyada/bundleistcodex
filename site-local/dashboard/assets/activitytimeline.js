import { j as e } from "./radix.js";
import { a as c } from "./audittrailpanel.js";
const m = {
    neutral: "bg-slate-400",
    good: "bg-emerald-500",
    warn: "bg-amber-500",
    bad: "bg-rose-500",
  },
  u = ({ items: a, emptyText: i = "No recent activity." }) =>
    a.length
      ? e.jsx("div", {
          className: "space-y-3",
          children: a.map((t, o) => {
            const s = t.at instanceof Date ? t.at : new Date(t.at),
              l = Number.isNaN(s.getTime()) ? "-" : s.toLocaleString(),
              r = t.tone ?? "neutral",
              n = !!t.onClick;
            return e.jsxs(
              "div",
              {
                className: "flex min-w-0 items-start gap-3",
                children: [
                  e.jsx("div", {
                    className: "pt-1.5",
                    children: e.jsx("div", {
                      className: `h-2.5 w-2.5 rounded-full ${m[r]}`,
                    }),
                  }),
                  e.jsxs("button", {
                    type: "button",
                    onClick: t.onClick,
                    disabled: !n,
                    className: [
                      "flex-1 min-w-0 text-left rounded-lg px-2 py-1 -mx-2 -my-1",
                      n
                        ? "hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/10"
                        : "cursor-default",
                    ].join(" "),
                    title: Number.isNaN(s.getTime()) ? void 0 : `At ${c(s)}`,
                    children: [
                      e.jsxs("div", {
                        className: "flex items-baseline justify-between gap-3",
                        children: [
                          e.jsx("div", {
                            className:
                              "min-w-0 text-sm font-semibold text-slate-900 [overflow-wrap:anywhere]",
                            children: t.title,
                          }),
                          e.jsx("div", {
                            className:
                              "text-[11px] font-semibold text-slate-500 shrink-0",
                            children: l,
                          }),
                        ],
                      }),
                      t.subtitle &&
                        e.jsx("div", {
                          className:
                            "mt-0.5 text-xs text-slate-600 [overflow-wrap:anywhere]",
                          children: t.subtitle,
                        }),
                    ],
                  }),
                ],
              },
              `${l}-${o}`,
            );
          }),
        })
      : e.jsx("div", { className: "text-sm text-slate-600", children: i });
export { u as A };
