import { j as s, R as m, r as x } from "./radix.js";
import { A as h } from "./app.js";
const j = (e) => {
    const a = e instanceof Date ? e : new Date(e);
    return Number.isNaN(a.getTime()) ? "-" : a.toLocaleString();
  },
  f = (e, a = new Date()) => {
    const n = e instanceof Date ? e : new Date(e);
    if (Number.isNaN(n.getTime())) return "-";
    const i = a.getTime() - n.getTime(),
      o = Math.abs(i),
      r = i >= 0,
      t = Math.round(o / 1e3);
    if (t < 10) return "just now";
    if (t < 60) return r ? `${t}s ago` : `in ${t}s`;
    const l = Math.round(t / 60);
    if (l < 60) return r ? `${l}m ago` : `in ${l}m`;
    const c = Math.round(l / 60);
    if (c < 24) return r ? `${c}h ago` : `in ${c}h`;
    const d = Math.round(c / 24);
    return r ? `${d}d ago` : `in ${d}d`;
  },
  N = ({ items: e, className: a = "" }) =>
    !e || e.length === 0
      ? null
      : s.jsx("div", {
          className: [
            "flex flex-wrap items-center gap-1 text-xs text-slate-600",
            a,
          ].join(" "),
          children: e.map((n, i) => {
            const o = typeof n.onClick == "function",
              r = s.jsx("span", {
                className: [
                  "max-w-[22ch] sm:max-w-[40ch] truncate",
                  o
                    ? "text-slate-700 hover:text-slate-950 cursor-pointer font-semibold"
                    : "text-slate-500 font-medium",
                ].join(" "),
                title: n.title || n.label,
                children: n.label,
              });
            return s.jsxs(
              m.Fragment,
              {
                children: [
                  i > 0
                    ? s.jsx("span", {
                        className: "text-slate-300 px-1",
                        children: "/",
                      })
                    : null,
                  o
                    ? s.jsx("button", {
                        type: "button",
                        onClick: n.onClick,
                        className: "inline-flex",
                        children: r,
                      })
                    : r,
                ],
              },
              `${n.label}-${i}`,
            );
          }),
        }),
  u = (e) => {
    if (e === null) return "null";
    if (e === void 0) return "undefined";
    if (typeof e == "string") return e;
    if (typeof e == "number" || typeof e == "boolean") return String(e);
    try {
      return JSON.stringify(e);
    } catch {
      return String(e);
    }
  },
  b = ({
    entityType: e,
    entityId: a,
    title: n = "Audit Trail",
    limit: i = 12,
    className: o = "",
  }) => {
    const r = x.useMemo(
      () => h.getAuditLogsForEntity(e, a).slice(0, i),
      [e, a, i],
    );
    return r.length
      ? s.jsxs("div", {
          className: [
            "rounded-xl border border-slate-200/70 bg-white p-3",
            o,
          ].join(" "),
          children: [
            s.jsx("div", { className: "ui-kicker", children: n }),
            s.jsx("div", {
              className: "mt-2 space-y-2",
              children: r.map((t) =>
                s.jsxs(
                  "div",
                  {
                    className:
                      "rounded-lg border border-slate-200/70 bg-slate-50 px-3 py-2",
                    children: [
                      s.jsxs("div", {
                        className: "flex items-center justify-between gap-2",
                        children: [
                          s.jsx("div", {
                            className:
                              "text-xs font-semibold text-slate-900 truncate",
                            children: t.action,
                          }),
                          s.jsx("div", {
                            className: "text-[11px] text-slate-600 shrink-0",
                            children: f(t.timestamp.toISOString()),
                          }),
                        ],
                      }),
                      t.reason
                        ? s.jsxs("div", {
                            className: "mt-1 text-xs text-slate-700",
                            children: ["Reason: ", t.reason],
                          })
                        : null,
                      t.userId
                        ? s.jsxs("div", {
                            className: "mt-1 text-[11px] text-slate-500",
                            children: ["User: ", t.userId],
                          })
                        : null,
                      Array.isArray(t.changes) && t.changes.length
                        ? s.jsx("div", {
                            className: "mt-1 text-[11px] text-slate-600",
                            children: t.changes.slice(0, 3).map((l, c) =>
                              s.jsxs(
                                "div",
                                {
                                  className: "truncate",
                                  children: [
                                    l.field,
                                    ": ",
                                    u(l.previousValue),
                                    " → ",
                                    u(l.newValue),
                                  ],
                                },
                                c,
                              ),
                            ),
                          })
                        : null,
                    ],
                  },
                  t.id,
                ),
              ),
            }),
            s.jsx("div", {
              className: "mt-2 text-[11px] text-slate-500",
              children:
                "Note: currently shows in-session audit events (not persisted historically).",
            }),
          ],
        })
      : null;
  };
export { b as A, N as B, j as a, f };
