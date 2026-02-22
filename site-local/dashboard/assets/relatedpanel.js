import { j as e } from "./radix.js";
import { c as o } from "./app.js";
const j = ({
  orders: a,
  consolidations: i,
  shipments: n,
  ledger: s,
  className: x = "",
}) => {
  const d = ({ c: t }) => {
      const l = typeof t.onClick == "function";
      return e.jsxs("button", {
        type: "button",
        onClick: t.onClick,
        disabled: !l,
        className: [
          "text-left rounded-xl border px-3 py-2 w-full",
          l
            ? "border-slate-200 bg-white hover:bg-slate-50"
            : "border-slate-200/60 bg-slate-50 text-slate-500 cursor-default",
        ].join(" "),
        title: t.id,
        children: [
          e.jsx("div", {
            className: "text-xs font-semibold text-slate-900 truncate",
            children: t.label,
          }),
          t.subtitle
            ? e.jsx("div", {
                className: "text-[11px] text-slate-600 truncate",
                children: t.subtitle,
              })
            : null,
        ],
      });
    },
    r = ({ title: t, count: l, children: c }) =>
      e.jsxs("div", {
        className: "rounded-xl border border-slate-200/70 bg-white p-3",
        children: [
          e.jsxs("div", {
            className: "flex items-center justify-between gap-2",
            children: [
              e.jsx("div", { className: "ui-kicker", children: t }),
              e.jsx("div", {
                className: "text-[11px] font-semibold text-slate-600",
                children: l,
              }),
            ],
          }),
          e.jsx("div", { className: "mt-2 space-y-2", children: c }),
        ],
      });
  return e.jsxs("div", {
    className: ["space-y-3", x].join(" "),
    children: [
      e.jsx(r, {
        title: "Orders",
        count: a.length,
        children: a.length
          ? a.map((t) => e.jsx(d, { c: t }, t.id))
          : e.jsx("div", {
              className: "text-xs text-slate-500",
              children: "No related orders.",
            }),
      }),
      e.jsx(r, {
        title: "Consolidations",
        count: i.length,
        children: i.length
          ? i.map((t) => e.jsx(d, { c: t }, t.id))
          : e.jsx("div", {
              className: "text-xs text-slate-500",
              children: "No related consolidations.",
            }),
      }),
      e.jsx(r, {
        title: "Shipments",
        count: n.length,
        children: n.length
          ? n.map((t) => e.jsx(d, { c: t }, t.id))
          : e.jsx("div", {
              className: "text-xs text-slate-500",
              children: "No related shipments.",
            }),
      }),
      e.jsxs("div", {
        className: "rounded-xl border border-slate-200/70 bg-white p-3",
        children: [
          e.jsxs("div", {
            className: "flex items-start justify-between gap-3",
            children: [
              e.jsxs("div", {
                children: [
                  e.jsx("div", { className: "ui-kicker", children: "Ledger" }),
                  e.jsxs("div", {
                    className: "mt-1 text-sm font-extrabold text-slate-900",
                    children: [
                      "Net: ",
                      e.jsxs("span", {
                        className:
                          s.net >= 0 ? "text-emerald-700" : "text-rose-700",
                        children: ["$", Math.abs(s.net).toLocaleString()],
                      }),
                      e.jsx("span", {
                        className: "text-slate-500 font-semibold ml-1",
                        children: s.net >= 0 ? "credit" : "due",
                      }),
                    ],
                  }),
                ],
              }),
              s.onViewPayments
                ? e.jsx(o, {
                    variant: "outline",
                    size: "sm",
                    onClick: s.onViewPayments,
                    children: "View In Payments",
                  })
                : null,
            ],
          }),
          e.jsx("div", {
            className: "mt-3 grid grid-cols-2 gap-2",
            children: (s.summary || []).slice(0, 6).map((t) =>
              e.jsxs(
                "div",
                {
                  className:
                    "rounded-lg border border-slate-200/70 bg-slate-50 px-3 py-2",
                  children: [
                    e.jsx("div", {
                      className:
                        "text-[11px] text-slate-500 font-semibold uppercase tracking-wide",
                      children: t.label,
                    }),
                    e.jsx("div", {
                      className:
                        "text-xs font-semibold text-slate-900 truncate",
                      children: t.value,
                    }),
                  ],
                },
                t.label,
              ),
            ),
          }),
        ],
      }),
    ],
  });
};
export { j as R };
