import { r as j, j as e } from "./radix.js";
import {
  u as Xe,
  O as m,
  C as k,
  f as h,
  T as Ze,
  B as De,
  a as et,
  b as tt,
  c as $e,
  g as st,
  i as it,
  n as at,
  d as rt,
} from "./app.js";
import { P as me } from "./pageheader.js";
import "./react.js";
import "./supabase.js";
import "./icons.js";
const ht = ({
  adminActiveConsolidations: Ce,
  adminOrdersNeedingAttention: Me,
  customerActiveConsolidations: ge,
  customerOrdersAwaitingConsolidation: Pe,
  customerOrdersInProgressCount: Te,
  suppliersForCustomerView: Ae,
  shipmentsForDashboard: M,
  allOrders: O,
  allConsolidations: z,
  paymentTransactions: I,
  notifications: Oe,
  allCustomers: re,
  allSuppliers: Ie,
  totalSuppliers: Le,
  totalOrders: _e,
  totalCustomers: Re,
  totalActiveConsolidations: Be,
  totalShipments: he,
  adminFlowSnapshotCounts: ze,
  adminExceptionCounts: Fe,
  currentCustomerDetails: $,
  calculateCustomerBalance: G,
  currentCustomerId: b,
  customerTransactions: R,
  onNavigate: w,
  markNotificationAsRead: We,
  onRefresh: ue,
  isAdmin: F,
  dashboardLoading: ne = !1,
  addOrder: nt,
  updateOrderStatus: lt,
}) => {
  var we;
  const { openActivityCenter: Ue } = Xe(),
    U = {
      admin: { consolidations: 6, ordersAttention: 4, shipments: 4 },
      customer: { consolidations: 4, ordersAwaiting: 4, shipments: 4 },
    };
  (Ce.slice(0, U.admin.consolidations),
    Me.slice(0, U.admin.ordersAttention),
    M.slice(0, U.admin.shipments),
    ge.slice(0, U.customer.consolidations),
    Pe.slice(0, U.customer.ordersAwaiting),
    M.slice(0, U.customer.shipments));
  const le = (t) => {
      if (!t) return "N/A";
      const i = re.find((r) => r.id === t);
      return i ? i.companyName : "Unknown";
    },
    pe = (t) => {
      const i = Ie.find((r) => r.id === t);
      return i ? i.name : "Unknown";
    },
    P = ({ title: t, value: i, subtitle: r, tone: l = "neutral", icon: g }) => {
      const s = {
        neutral: {
          iconWrap: "bg-slate-100 text-slate-700 border-slate-200",
          bar: "from-slate-300 to-slate-100",
        },
        info: {
          iconWrap: "bg-sky-100 text-sky-700 border-sky-200",
          bar: "from-sky-400 to-sky-100",
        },
        good: {
          iconWrap: "bg-emerald-100 text-emerald-800 border-emerald-200",
          bar: "from-emerald-400 to-emerald-100",
        },
        warn: {
          iconWrap: "bg-amber-100 text-amber-800 border-amber-200",
          bar: "from-amber-400 to-amber-100",
        },
        bad: {
          iconWrap: "bg-rose-100 text-rose-800 border-rose-200",
          bar: "from-rose-400 to-rose-100",
        },
      }[l];
      return e.jsxs("div", {
        className:
          "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur shadow-sm p-4 hover:shadow-md transition-shadow",
        children: [
          e.jsxs("div", {
            className: "flex items-start justify-between gap-3",
            children: [
              e.jsxs("div", {
                className: "min-w-0",
                children: [
                  e.jsx("div", {
                    className:
                      "text-[11px] font-semibold uppercase tracking-wider text-slate-500 truncate",
                    children: t,
                  }),
                  e.jsx("div", {
                    className:
                      "mt-1 text-2xl font-extrabold tracking-tight text-slate-900",
                    children: i,
                  }),
                  r
                    ? e.jsx("div", {
                        className: "mt-1 text-xs text-slate-600 truncate",
                        children: r,
                      })
                    : null,
                ],
              }),
              g
                ? e.jsx("div", {
                    className: `shrink-0 h-11 w-11 rounded-2xl border flex items-center justify-center ${s.iconWrap}`,
                    children: e.jsx("div", {
                      className: "h-5 w-5",
                      children: g,
                    }),
                  })
                : null,
            ],
          }),
          e.jsx("div", {
            className: `absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${s.bar}`,
          }),
        ],
      });
    },
    oe = ({ rows: t = 3 }) =>
      e.jsx("div", {
        className: "space-y-3",
        children: Array.from({ length: t }).map((i, r) =>
          e.jsxs(
            "div",
            {
              className:
                "border border-gray-200 rounded-lg p-3 bg-white animate-pulse",
              children: [
                e.jsx("div", {
                  className: "h-4 bg-gray-200 rounded w-2/3 mb-2",
                }),
                e.jsx("div", {
                  className: "h-3 bg-gray-100 rounded w-1/2 mb-2",
                }),
                e.jsx("div", { className: "h-3 bg-gray-100 rounded w-5/6" }),
              ],
            },
            r,
          ),
        ),
      }),
    L = $ ? G($.id, I) : 0,
    T = j.useMemo(() => new Date(), []),
    J = 1e3 * 60 * 60 * 24,
    X = (t) => {
      const i = new Date(t);
      return Math.floor((T.getTime() - i.getTime()) / J);
    },
    _ = (t) => {
      const r = new Date(t).getTime() - T.getTime(),
        l = r / J;
      return r >= 0 ? Math.ceil(l) : Math.floor(l);
    },
    He = ({ values: t, strokeClassName: i = "stroke-slate-900" }) => {
      if (!t || t.length === 0)
        return e.jsx("svg", {
          width: 140,
          height: 40,
          viewBox: "0 0 140 40",
          "aria-hidden": "true",
          children: e.jsx("rect", {
            x: "0",
            y: "0",
            width: 140,
            height: 40,
            rx: "8",
            className: "fill-slate-50",
          }),
        });
      const d = Math.max(...t, 1),
        s = Math.min(...t, 0),
        c = Math.max(1, d - s),
        x = t.length <= 1 ? 0 : (140 - 3 * 2) / (t.length - 1),
        o = t
          .map((n, v) => {
            const ae = 3 + v * x,
              Y = 37 - ((n - s) / c) * (40 - 3 * 2);
            return `${ae.toFixed(2)},${Y.toFixed(2)}`;
          })
          .join(" ");
      return e.jsxs("svg", {
        width: 140,
        height: 40,
        viewBox: "0 0 140 40",
        "aria-hidden": "true",
        children: [
          e.jsx("rect", {
            x: "0",
            y: "0",
            width: 140,
            height: 40,
            rx: "10",
            className: "fill-slate-50",
          }),
          e.jsx("polyline", {
            points: o,
            fill: "none",
            className: `${i} stroke-[2.5]`,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
        ],
      });
    },
    Z = { critical: 4, high: 3, medium: 2, low: 1 },
    Ve = ({ severity: t }) => {
      const i =
        t === "critical"
          ? "bg-red-100 text-red-800 border-red-200"
          : t === "high"
            ? "bg-orange-100 text-orange-800 border-orange-200"
            : t === "medium"
              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
              : "bg-gray-100 text-gray-700 border-gray-200";
      return e.jsx("span", {
        className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${i}`,
        children: t.toUpperCase(),
      });
    },
    [f, A] = j.useState("all"),
    [Ee, be] = j.useState(!1),
    [Qe, Ke] = j.useState(""),
    [Ye, qe] = j.useState(null),
    a = ({ label: t, value: i }) =>
      e.jsxs("div", {
        className: "rounded-xl border border-slate-200/70 bg-white px-4 py-3",
        children: [
          e.jsx("div", {
            className:
              "text-[11px] font-semibold uppercase tracking-wide text-slate-500",
            children: t,
          }),
          e.jsx("div", {
            className: "mt-1 text-sm font-semibold text-slate-900 break-words",
            children: i,
          }),
        ],
      }),
    S = ({ title: t, children: i }) =>
      e.jsxs("div", {
        children: [
          e.jsx("div", {
            className:
              "text-xs font-bold text-slate-700 uppercase tracking-wider mb-2",
            children: t,
          }),
          e.jsx("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
            children: i,
          }),
        ],
      }),
    ye = (t) => {
      switch (t) {
        case "all":
          return "All";
        case "pending_orders":
          return "Pending orders";
        case "departing_soon":
          return "Departing soon";
        case "missing_shipment":
          return "Missing shipment";
        case "missing_tracking":
          return "Missing tracking";
        case "capacity_risk":
          return "Capacity risk";
        case "negative_balance":
          return "Negative balances";
        case "distribution_mismatch":
          return "Distribution mismatch";
        case "ledger_mismatch":
          return "Ledger mismatch";
        case "stuck_status":
          return "Stuck status";
        default:
          return String(t);
      }
    },
    u = (t, i) => {
      (Ke(t), qe(i), be(!0));
    },
    ve = () => {
      be(!1);
    },
    je = () =>
      Ee
        ? e.jsxs("div", {
            className: "fixed inset-0 z-50",
            children: [
              e.jsx("div", {
                className: "absolute inset-0 bg-black/30",
                onClick: ve,
              }),
              e.jsxs("div", {
                className:
                  "absolute right-0 top-0 h-full w-full sm:w-[560px] bg-white shadow-2xl border-l border-slate-200 overflow-y-auto",
                children: [
                  e.jsx("div", {
                    className:
                      "sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur",
                    children: e.jsxs("div", {
                      className: "p-4 flex items-start justify-between gap-3",
                      children: [
                        e.jsxs("div", {
                          className: "min-w-0",
                          children: [
                            e.jsx("div", {
                              className:
                                "text-[11px] text-slate-500 font-semibold uppercase tracking-wider",
                              children: F ? "Ops inbox details" : "Details",
                            }),
                            e.jsx("div", {
                              className:
                                "text-lg font-extrabold text-slate-900 truncate",
                              children: Qe,
                            }),
                          ],
                        }),
                        e.jsx("button", {
                          type: "button",
                          onClick: ve,
                          className:
                            "shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
                          "aria-label": "Close",
                          title: "Close",
                          children: e.jsx("svg", {
                            className: "h-5 w-5",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            children: e.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M6 6l12 12M18 6l-12 12",
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                  e.jsx("div", {
                    className: "p-4 bg-slate-50 min-h-full",
                    children: e.jsx("div", {
                      className:
                        "rounded-2xl border border-slate-200/70 bg-white p-4",
                      children: Ye,
                    }),
                  }),
                ],
              }),
            ],
          })
        : null,
    fe = ({ title: t }) => {
      const i = st(Oe, b, F).slice(0, 5),
        r = i.filter((l) => !l.isRead).length;
      return e.jsxs("div", {
        className:
          "bg-white border border-gray-200 rounded-2xl overflow-hidden",
        children: [
          e.jsxs("div", {
            className:
              "px-4 py-3 border-b border-gray-100 flex items-center justify-between",
            children: [
              e.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  e.jsx("div", {
                    className: "text-sm font-semibold text-gray-800",
                    children: t,
                  }),
                  r > 0
                    ? e.jsx("span", {
                        className:
                          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white",
                        children: r,
                      })
                    : null,
                ],
              }),
              e.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  ue &&
                    e.jsx("button", {
                      type: "button",
                      onClick: () => ue(),
                      className:
                        "text-xs font-semibold text-gray-500 hover:text-gray-700",
                      title: "Refresh activity",
                      children: "Refresh",
                    }),
                  e.jsx("button", {
                    type: "button",
                    onClick: () => Ue(),
                    className:
                      "text-xs font-semibold text-gray-700 hover:text-gray-900",
                    title: "Open Activity Center",
                    children: "Open",
                  }),
                ],
              }),
            ],
          }),
          e.jsx("div", {
            className: "p-4",
            children:
              i.length === 0
                ? e.jsx("div", {
                    className:
                      "p-5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm",
                    children: "No activity yet.",
                  })
                : e.jsx("div", {
                    className: "space-y-2",
                    children: i.map((l) => {
                      const g = it(String(l.importance)),
                        d = new Date(l.timestamp),
                        s = !l.isRead;
                      return e.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            (s && We(l.id),
                              l.linkToPage && w(l.linkToPage, l.linkToId));
                          },
                          className: [
                            "w-full text-left p-3 rounded-xl border hover:bg-gray-50 transition-colors",
                            s
                              ? "border-emerald-200 bg-emerald-50/40"
                              : "border-gray-200 bg-white",
                          ].join(" "),
                          children: e.jsxs("div", {
                            className: "flex items-start justify-between gap-3",
                            children: [
                              e.jsxs("div", {
                                className: "min-w-0",
                                children: [
                                  e.jsxs("div", {
                                    className:
                                      "flex items-center gap-2 flex-wrap",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-sm font-semibold text-gray-900 truncate",
                                        children: at(l.message),
                                      }),
                                      e.jsx("span", {
                                        className: `inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${g.cls}`,
                                        children: g.label,
                                      }),
                                      s
                                        ? e.jsx("span", {
                                            className:
                                              "inline-flex items-center text-[11px] font-bold text-emerald-700",
                                            children: "New",
                                          })
                                        : null,
                                    ],
                                  }),
                                  e.jsx("div", {
                                    className:
                                      "mt-1 text-xs text-gray-600 line-clamp-2",
                                    children: l.message,
                                  }),
                                  l.linkToPage || l.linkToId
                                    ? e.jsxs("div", {
                                        className:
                                          "mt-2 text-[11px] font-semibold text-gray-500",
                                        children: [
                                          l.linkToPage ? l.linkToPage : "",
                                          l.linkToId ? ` • ${l.linkToId}` : "",
                                        ],
                                      })
                                    : null,
                                ],
                              }),
                              e.jsx("div", {
                                className:
                                  "shrink-0 text-xs font-semibold text-gray-500",
                                children: rt(d),
                              }),
                            ],
                          }),
                        },
                        l.id,
                      );
                    }),
                  }),
          }),
        ],
      });
    },
    H = (t) =>
      u(
        `Order ${h(t.id, "order")}`,
        e.jsxs("div", {
          className: "space-y-4",
          children: [
            e.jsxs(S, {
              title: "Summary",
              children: [
                e.jsx(a, { label: "Order", value: h(t.id, "order") }),
                e.jsx(a, { label: "Status", value: String(t.status) }),
                e.jsx(a, { label: "Supplier", value: pe(t.supplierId) }),
                e.jsx(a, {
                  label: "Value",
                  value: `$${t.value.toLocaleString()}`,
                }),
                e.jsx(a, { label: "Volume", value: `${t.volumeM3} m3` }),
                e.jsx(a, { label: "Weight", value: `${t.weightKG} kg` }),
              ],
            }),
            t.notes
              ? e.jsx("div", {
                  className:
                    "rounded-xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-sm text-slate-700 whitespace-pre-wrap",
                  children: t.notes,
                })
              : null,
            e.jsx("div", {
              className:
                "rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-700",
              children: t.description,
            }),
          ],
        }),
      ),
    de = (t) =>
      u(
        `Consolidation ${t.name}`,
        e.jsx("div", {
          className: "space-y-4",
          children: e.jsxs(S, {
            title: "Summary",
            children: [
              e.jsx(a, { label: "Consolidation", value: t.name }),
              e.jsx(a, { label: "Status", value: String(t.status) }),
              e.jsx(a, { label: "Route", value: t.route }),
              e.jsx(a, {
                label: "Departure",
                value: new Date(t.departureDate).toLocaleDateString(),
              }),
              e.jsx(a, { label: "Orders", value: t.orderIds.length }),
              e.jsx(a, {
                label: "Utilization",
                value: `Space ${Math.round(t.containerSpaceFilledPercentage || 0)}% | Weight ${Math.round(t.containerWeightFilledPercentage || 0)}%`,
              }),
            ],
          }),
        }),
      ),
    Q = (t) =>
      u(
        `Shipment ${h(t.id, "shipment")}`,
        e.jsxs("div", {
          className: "space-y-4",
          children: [
            e.jsxs(S, {
              title: "Summary",
              children: [
                e.jsx(a, { label: "Shipment", value: h(t.id, "shipment") }),
                e.jsx(a, { label: "Status", value: String(t.status) }),
                e.jsx(a, {
                  label: "Route",
                  value: `${t.origin} to ${t.destination}`,
                }),
                e.jsx(a, { label: "Carrier", value: t.carrier || "TBD" }),
                e.jsx(a, {
                  label: "Shipped",
                  value: new Date(t.shippingDate).toLocaleDateString(),
                }),
                e.jsx(a, {
                  label: "Tracking",
                  value: t.trackingUrl
                    ? e.jsx("a", {
                        className: "text-blue-700 underline",
                        href: t.trackingUrl,
                        target: "_blank",
                        rel: "noreferrer",
                        children: "Open tracking",
                      })
                    : "Pending",
                }),
              ],
            }),
            e.jsx("div", {
              className:
                "rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-700",
              children: t.description,
            }),
          ],
        }),
      ),
    Ne = (t) =>
      u(
        "Transaction",
        e.jsx("div", {
          className: "space-y-4",
          children: e.jsxs(S, {
            title: "Summary",
            children: [
              e.jsx(a, {
                label: "Date",
                value: new Date(t.date).toLocaleString(),
              }),
              e.jsx(a, { label: "Type", value: String(t.type) }),
              e.jsx(a, {
                label: "Amount",
                value: e.jsxs("span", {
                  className:
                    t.amount < 0 ? "text-rose-700" : "text-emerald-700",
                  children: [
                    t.amount < 0 ? "-" : "+",
                    "$",
                    Math.abs(t.amount).toFixed(2),
                  ],
                }),
              }),
              e.jsx(a, { label: "Description", value: t.description }),
              e.jsx(a, {
                label: "Order",
                value: t.relatedOrderId ? h(t.relatedOrderId, "order") : "-",
              }),
              e.jsx(a, {
                label: "Consolidation",
                value: t.relatedConsolidationId
                  ? h(t.relatedConsolidationId, "consolidation")
                  : "-",
              }),
            ],
          }),
        }),
      ),
    V = j.useMemo(() => {
      if (!F) return null;
      const t = 30,
        i = new Date(T);
      (i.setHours(0, 0, 0, 0), i.setDate(i.getDate() - (t - 1)));
      const r = Array.from({ length: t }, () => 0);
      for (const g of M) {
        const d = new Date(g.shippingDate);
        if (Number.isNaN(d.getTime()) || d < i || d > T) continue;
        const s = Math.floor((d.getTime() - i.getTime()) / J);
        s >= 0 && s < r.length && (r[s] += 1);
      }
      return { total: r.reduce((g, d) => g + d, 0), daily: r };
    }, [F, M, T]),
    N = j.useMemo(() => {
      const t = O.filter((n) => n.status === m.Pending),
        i = O.filter(
          (n) => n.status === m.Processing || n.status === m.QualityCheck,
        ),
        r = O.filter((n) => n.status === m.ReadyToShip),
        l = z.filter(
          (n) => ![k.Delivered, k.Completed, k.Cancelled].includes(n.status),
        ),
        g = l
          .filter((n) => {
            const v = _(n.departureDate);
            return v >= 0 && v <= 7;
          })
          .sort((n, v) => _(n.departureDate) - _(v.departureDate)),
        d = l
          .filter(
            (n) =>
              (n.containerSpaceFilledPercentage || 0) >= 85 ||
              (n.containerWeightFilledPercentage || 0) >= 85,
          )
          .sort(
            (n, v) =>
              Math.max(
                v.containerSpaceFilledPercentage || 0,
                v.containerWeightFilledPercentage || 0,
              ) -
              Math.max(
                n.containerSpaceFilledPercentage || 0,
                n.containerWeightFilledPercentage || 0,
              ),
          ),
        s = (n) =>
          M.some((v) => v.type === "consolidation" && v.relatedId === n),
        c = l
          .filter((n) => n.status === k.ReadyToShip && !s(n.id))
          .sort((n, v) => _(n.departureDate) - _(v.departureDate)),
        x = M.filter(
          (n) => n.status !== k.Completed && n.status !== m.Delivered,
        ).filter((n) => !n.carrier || !n.trackingUrl),
        o = re
          .map((n) => ({ customer: n, balance: G(n.id, I) }))
          .filter((n) => n.balance < -500)
          .sort((n, v) => n.balance - v.balance);
      return {
        counts: {
          pendingOrders: t.length,
          inProgressOrders: i.length,
          readyOrders: r.length,
          departingSoon: g.length,
          capacityRisk: d.length,
          missingShipment: c.length,
          missingTracking: x.length,
          negativeBalances: o.length,
        },
        pendingOrders: t,
        inProgressOrders: i,
        readyOrders: r,
        departingSoon: g,
        capacityRisk: d,
        missingShipment: c,
        missingTracking: x,
        negativeBalances: o,
      };
    }, [O, z, M, re, I, G, T]),
    E = j.useMemo(() => {
      if (!F) return [];
      const t = [],
        i = N.pendingOrders
          .map((s) => ({ order: s, ageDays: X(s.creationDate) }))
          .filter((s) => s.ageDays >= 1)
          .sort((s, c) => c.ageDays - s.ageDays)
          .slice(0, 8);
      for (const { order: s, ageDays: c } of i)
        t.push({
          id: `pending:${s.id}`,
          severity: c >= 3 ? "high" : "medium",
          category: "pending_orders",
          title: `Confirm pending order ${h(s.id, "order")}`,
          subtitle: `${s.description} | ${le(s.customerId)} | ${c}d pending`,
          entityType: "order",
          entityId: s.id,
          dueInDays: 0,
          primaryActionLabel: "Open Orders",
          onPrimaryAction: () => w("orders"),
          secondaryActionLabel: "Details",
          onSecondaryAction: () =>
            u(
              `Order ${h(s.id, "order")}`,
              e.jsxs("div", {
                className: "space-y-4",
                children: [
                  e.jsxs(S, {
                    title: "Summary",
                    children: [
                      e.jsx(a, { label: "Order", value: h(s.id, "order") }),
                      e.jsx(a, { label: "Status", value: String(s.status) }),
                      e.jsx(a, { label: "Customer", value: le(s.customerId) }),
                      e.jsx(a, { label: "Supplier", value: pe(s.supplierId) }),
                      e.jsx(a, {
                        label: "Value",
                        value: `$${s.value.toLocaleString()}`,
                      }),
                      e.jsx(a, {
                        label: "Placed",
                        value: new Date(s.creationDate).toLocaleDateString(),
                      }),
                    ],
                  }),
                  e.jsx("div", {
                    className:
                      "rounded-xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-sm text-slate-700",
                    children: s.description,
                  }),
                ],
              }),
            ),
        });
      for (const s of N.departingSoon.slice(0, 8)) {
        const c = _(s.departureDate),
          x = c <= 3 ? "critical" : c <= 7 ? "high" : "medium";
        t.push({
          id: `depart:${s.id}`,
          severity: x,
          category: "departing_soon",
          title: `Departure in ${Math.max(0, c)} day${Math.max(0, c) === 1 ? "" : "s"}: ${s.name}`,
          subtitle: `${s.route} | ${s.orderIds.length} orders | ${s.isMixed ? "Mixed" : "Single customer"}`,
          dueInDays: c,
          entityType: "consolidation",
          entityId: s.id,
          primaryActionLabel: "Open Consolidations",
          onPrimaryAction: () => w("consolidations"),
          secondaryActionLabel: "Details",
          onSecondaryAction: () =>
            u(
              `Consolidation ${s.name}`,
              e.jsx("div", {
                className: "space-y-4",
                children: e.jsxs(S, {
                  title: "Summary",
                  children: [
                    e.jsx(a, { label: "Consolidation", value: s.name }),
                    e.jsx(a, { label: "Status", value: String(s.status) }),
                    e.jsx(a, { label: "Route", value: s.route }),
                    e.jsx(a, {
                      label: "Departure",
                      value: `${new Date(s.departureDate).toLocaleDateString()} (${c}d)`,
                    }),
                    e.jsx(a, { label: "Orders", value: s.orderIds.length }),
                    e.jsx(a, {
                      label: "Utilization",
                      value: `Space ${Math.round(s.containerSpaceFilledPercentage || 0)}% | Weight ${Math.round(s.containerWeightFilledPercentage || 0)}%`,
                    }),
                  ],
                }),
              }),
            ),
        });
      }
      for (const s of N.capacityRisk.slice(0, 10)) {
        const c = Math.max(
            s.containerSpaceFilledPercentage || 0,
            s.containerWeightFilledPercentage || 0,
          ),
          x = c >= 95 ? "critical" : c >= 90 ? "high" : "medium";
        t.push({
          id: `capacity:${s.id}`,
          severity: x,
          category: "capacity_risk",
          title: `Capacity risk: ${s.name}`,
          subtitle: `${s.route} | Space ${Math.round(s.containerSpaceFilledPercentage || 0)}% | Weight ${Math.round(s.containerWeightFilledPercentage || 0)}%`,
          entityType: "consolidation",
          entityId: s.id,
          primaryActionLabel: "Open Consolidations",
          onPrimaryAction: () => w("consolidations"),
          secondaryActionLabel: "Details",
          onSecondaryAction: () =>
            u(
              `Capacity Risk: ${s.name}`,
              e.jsxs("div", {
                className: "space-y-4",
                children: [
                  e.jsxs(S, {
                    title: "Summary",
                    children: [
                      e.jsx(a, { label: "Consolidation", value: s.name }),
                      e.jsx(a, { label: "Status", value: String(s.status) }),
                      e.jsx(a, { label: "Route", value: s.route }),
                      e.jsx(a, {
                        label: "Departure",
                        value: new Date(s.departureDate).toLocaleDateString(),
                      }),
                      e.jsx(a, {
                        label: "Space",
                        value: `${Math.round(s.containerSpaceFilledPercentage || 0)}%`,
                      }),
                      e.jsx(a, {
                        label: "Weight",
                        value: `${Math.round(s.containerWeightFilledPercentage || 0)}%`,
                      }),
                    ],
                  }),
                  e.jsx("div", {
                    className:
                      "rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-900",
                    children:
                      "This consolidation is close to (or over) capacity. Consider moving orders, splitting the load, or changing container type.",
                  }),
                ],
              }),
            ),
        });
      }
      for (const s of N.missingShipment.slice(0, 8))
        t.push({
          id: `missing-shipment:${s.id}`,
          severity: "high",
          category: "missing_shipment",
          title: `Create shipment for consolidation: ${s.name}`,
          subtitle: `Status: ReadyToShip | ${s.orderIds.length} orders | ${new Date(s.departureDate).toLocaleDateString()}`,
          entityType: "consolidation",
          entityId: s.id,
          primaryActionLabel: "Open Consolidations",
          onPrimaryAction: () => w("consolidations"),
          secondaryActionLabel: "Details",
          onSecondaryAction: () =>
            u(
              `Missing Shipment: ${s.name}`,
              e.jsxs("div", {
                className: "space-y-4",
                children: [
                  e.jsxs(S, {
                    title: "Summary",
                    children: [
                      e.jsx(a, { label: "Consolidation", value: s.name }),
                      e.jsx(a, { label: "Status", value: String(s.status) }),
                      e.jsx(a, { label: "Route", value: s.route }),
                      e.jsx(a, {
                        label: "Departure",
                        value: new Date(s.departureDate).toLocaleDateString(),
                      }),
                      e.jsx(a, { label: "Orders", value: s.orderIds.length }),
                      e.jsx(a, { label: "Shipment", value: "Missing" }),
                    ],
                  }),
                  e.jsx("div", {
                    className:
                      "rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900",
                    children:
                      "No shipment record exists yet for this ReadyToShip consolidation.",
                  }),
                ],
              }),
            ),
        });
      for (const s of N.missingTracking.slice(0, 10)) {
        const c = !s.carrier && !s.trackingUrl ? "high" : "medium";
        t.push({
          id: `tracking:${s.id}`,
          severity: c,
          category: "missing_tracking",
          title: `Add tracking: ${h(s.id, "shipment")}`,
          subtitle: `${s.description} | ${s.type === "consolidation" ? "Consolidation" : "Individual"} | ${s.origin} -> ${s.destination}`,
          entityType: "shipment",
          entityId: s.id,
          primaryActionLabel: "Go to Shipment",
          onPrimaryAction: () => w("shipments", s.id),
          secondaryActionLabel: "Details",
          onSecondaryAction: () =>
            u(
              `Shipment ${h(s.id, "shipment")}`,
              e.jsxs("div", {
                className: "space-y-4",
                children: [
                  e.jsxs(S, {
                    title: "Summary",
                    children: [
                      e.jsx(a, {
                        label: "Shipment",
                        value: h(s.id, "shipment"),
                      }),
                      e.jsx(a, {
                        label: "Type",
                        value:
                          s.type === "consolidation"
                            ? "Consolidation"
                            : "Individual",
                      }),
                      e.jsx(a, { label: "Status", value: String(s.status) }),
                      e.jsx(a, {
                        label: "Route",
                        value: `${s.origin} -> ${s.destination}`,
                      }),
                      e.jsx(a, {
                        label: "Carrier",
                        value: s.carrier || "Missing",
                      }),
                      e.jsx(a, {
                        label: "Tracking URL",
                        value: s.trackingUrl ? "Present" : "Missing",
                      }),
                    ],
                  }),
                  e.jsx("div", {
                    className:
                      "rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-900",
                    children:
                      "Add carrier + tracking URL so customers can self-serve shipment status.",
                  }),
                ],
              }),
            ),
        });
      }
      for (const s of N.negativeBalances.slice(0, 8))
        t.push({
          id: `balance:${s.customer.id}`,
          severity: s.balance < -2500 ? "high" : "medium",
          category: "negative_balance",
          title: `Customer balance: ${s.customer.companyName}`,
          subtitle: `Balance: $${s.balance.toFixed(2)} | ${s.customer.email}`,
          entityType: "customer",
          entityId: s.customer.id,
          primaryActionLabel: "Open Payments",
          onPrimaryAction: () => w("payments"),
          secondaryActionLabel: "Details",
          onSecondaryAction: () =>
            u(
              `Customer: ${s.customer.companyName}`,
              e.jsxs("div", {
                className: "space-y-4",
                children: [
                  e.jsxs(S, {
                    title: "Summary",
                    children: [
                      e.jsx(a, {
                        label: "Customer",
                        value: s.customer.companyName,
                      }),
                      e.jsx(a, {
                        label: "Contact",
                        value: s.customer.contactPerson,
                      }),
                      e.jsx(a, { label: "Email", value: s.customer.email }),
                      e.jsx(a, {
                        label: "Balance",
                        value: `$${s.balance.toFixed(2)}`,
                      }),
                    ],
                  }),
                  e.jsx("div", {
                    className:
                      "rounded-xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-sm text-slate-700",
                    children:
                      "Threshold: balances less than -$500 are flagged.",
                  }),
                ],
              }),
            ),
        });
      const r = new Map(O.map((s) => [s.id, s])),
        l = new Map();
      for (const s of I) {
        const c = s.relatedConsolidationId;
        if (!c) continue;
        const x = l.get(c) || [];
        (x.push(s), l.set(c, x));
      }
      for (const s of z) {
        const x = (l.get(s.id) || []).filter((p) => p.type === Ze.ShippingCost);
        if (x.length === 0) continue;
        const o = x.reduce((p, B) => p + Math.abs(Number(B.amount || 0)), 0),
          n = Number(s.shippingCost || 0) > 0 ? Number(s.shippingCost || 0) : o,
          ae = (s.orderIds || [])
            .map((p) => r.get(p))
            .filter(Boolean)
            .filter((p) => !!p.customerId && Number(p.volumeM3 || 0) > 0),
          ce = ae.reduce((p, B) => p + Number(B.volumeM3 || 0), 0);
        if (ce <= 0) continue;
        const Y = new Map();
        for (const p of ae)
          Y.set(
            p.customerId,
            (Y.get(p.customerId) || 0) + Number(p.volumeM3 || 0),
          );
        const xe = new Map();
        for (const p of x) {
          const B = p.customerId || "unknown";
          xe.set(B, (xe.get(B) || 0) + Math.abs(Number(p.amount || 0)));
        }
        let q = 0;
        for (const [p, B] of Y) {
          const Ge = n * (B / ce),
            Je = xe.get(p) || 0;
          q = Math.max(q, Math.abs(Je - Ge));
        }
        if (q > 0.5) {
          const p = q > 50 ? "high" : "medium";
          t.push({
            id: `dist-mismatch:${s.id}`,
            severity: p,
            category: "distribution_mismatch",
            title: `Distribution mismatch: ${s.name}`,
            subtitle: `${h(s.id, "consolidation")} | delta ~$${q.toFixed(2)} | method ${s.costDistributionMethod || "volume_proportional"}`,
            entityType: "consolidation",
            entityId: s.id,
            primaryActionLabel: "Open Consolidation",
            onPrimaryAction: () => w("consolidations", s.id),
            secondaryActionLabel: "Details",
            onSecondaryAction: () =>
              u(
                `Distribution mismatch: ${s.name}`,
                e.jsxs("div", {
                  className: "space-y-4",
                  children: [
                    e.jsxs(S, {
                      title: "Summary",
                      children: [
                        e.jsx(a, { label: "Consolidation", value: s.name }),
                        e.jsx(a, {
                          label: "ID",
                          value: h(s.id, "consolidation"),
                        }),
                        e.jsx(a, {
                          label: "Method",
                          value: String(
                            s.costDistributionMethod || "volume_proportional",
                          ),
                        }),
                        e.jsx(a, {
                          label: "Actual shipping cost",
                          value: `$${Number(n || 0).toFixed(2)}`,
                        }),
                        e.jsx(a, {
                          label: "Billed total",
                          value: `$${Number(o || 0).toFixed(2)}`,
                        }),
                      ],
                    }),
                    e.jsx("div", {
                      className:
                        "rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900",
                      children:
                        "Expected shares (by volume) do not match billed ShippingCost transactions. Use the consolidation Reconciliation section to inspect and recalculate.",
                    }),
                  ],
                }),
              ),
          });
        }
        const ke = !!s.shippingCostDistributed,
          Se = x.length > 0;
        (ke &&
          !Se &&
          t.push({
            id: `ledger-mismatch-flag:${s.id}`,
            severity: "high",
            category: "ledger_mismatch",
            title: `Ledger mismatch: flag set but no charges (${s.name})`,
            subtitle: `${h(s.id, "consolidation")} | shippingCostDistributed=true but no ShippingCost transactions`,
            entityType: "consolidation",
            entityId: s.id,
            primaryActionLabel: "Open Consolidation",
            onPrimaryAction: () => w("consolidations", s.id),
          }),
          !ke &&
            Se &&
            t.push({
              id: `ledger-mismatch-ledger:${s.id}`,
              severity: "medium",
              category: "ledger_mismatch",
              title: `Ledger mismatch: charges exist but flag is off (${s.name})`,
              subtitle: `${h(s.id, "consolidation")} | ShippingCost transactions exist but shippingCostDistributed=false`,
              entityType: "consolidation",
              entityId: s.id,
              primaryActionLabel: "Open Consolidation",
              onPrimaryAction: () => w("consolidations", s.id),
            }));
      }
      const g = O.map((s) => ({ o: s, age: X(s.creationDate) }))
        .filter(
          (s) =>
            [m.Processing, m.QualityCheck].includes(s.o.status) && s.age >= 14,
        )
        .sort((s, c) => c.age - s.age)
        .slice(0, 8);
      for (const s of g)
        t.push({
          id: `stuck-order:${s.o.id}`,
          severity: s.age >= 30 ? "high" : "medium",
          category: "stuck_status",
          title: `Order stuck in progress: ${h(s.o.id, "order")}`,
          subtitle: `${s.o.description} | ${le(s.o.customerId)} | ${s.age}d in ${String(s.o.status)}`,
          entityType: "order",
          entityId: s.o.id,
          primaryActionLabel: "Open Order",
          onPrimaryAction: () => w("orders", s.o.id),
        });
      const d = z
        .map((s) => ({ c: s, age: X(s.creationDate) }))
        .filter(
          (s) => [k.Planning, k.Loading].includes(s.c.status) && s.age >= 30,
        )
        .sort((s, c) => c.age - s.age)
        .slice(0, 8);
      for (const s of d)
        t.push({
          id: `stuck-con:${s.c.id}`,
          severity: s.age >= 60 ? "high" : "medium",
          category: "stuck_status",
          title: `Consolidation stuck: ${s.c.name}`,
          subtitle: `${h(s.c.id, "consolidation")} | ${s.age}d in ${String(s.c.status)}`,
          entityType: "consolidation",
          entityId: s.c.id,
          primaryActionLabel: "Open Consolidation",
          onPrimaryAction: () => w("consolidations", s.c.id),
        });
      return (
        t.sort((s, c) => {
          if (Z[c.severity] !== Z[s.severity])
            return Z[c.severity] - Z[s.severity];
          const x = s.dueInDays ?? 999,
            o = c.dueInDays ?? 999;
          return x !== o ? x - o : s.title.localeCompare(c.title);
        }),
        t.slice(0, 24)
      );
    }, [F, N, w, T, O, z, I, G]),
    ee = j.useMemo(
      () => (f === "all" ? E : E.filter((t) => t.category === f)),
      [E, f],
    ),
    D = j.useMemo(() => (b ? O.filter((t) => t.customerId === b) : []), [O, b]),
    W = j.useMemo(
      () =>
        b
          ? z.filter(
              (t) =>
                t.customerId === b || (t.involvedCustomerIds || []).includes(b),
            )
          : [],
      [z, b],
    ),
    C = j.useMemo(
      () =>
        b
          ? M.filter(
              (t) =>
                t.customerId === b || (t.involvedCustomerIds || []).includes(b),
            )
          : [],
      [M, b],
    ),
    te = j.useMemo(
      () =>
        [...(R && R.length > 0 ? R : I.filter((i) => i.customerId === b))]
          .sort(
            (i, r) => new Date(r.date).getTime() - new Date(i.date).getTime(),
          )
          .slice(0, 5),
      [R, I, b],
    ),
    y = j.useMemo(() => {
      if (!b)
        return {
          payments: 0,
          charges: 0,
          delivered30d: 0,
          openShipments: 0,
          nextDepartureDays: null,
          nextDepartureDate: null,
        };
      const t = new Date(T.getTime() - 30 * J),
        r = (
          R && R.length > 0 ? R : I.filter((o) => o.customerId === b)
        ).filter((o) => new Date(o.date).getTime() >= t.getTime()),
        l = r
          .filter((o) => (o.amount || 0) > 0)
          .reduce((o, n) => o + (n.amount || 0), 0),
        g = r
          .filter((o) => (o.amount || 0) < 0)
          .reduce((o, n) => o + Math.abs(n.amount || 0), 0),
        d = C.filter(
          (o) =>
            o.actualDelivery &&
            new Date(o.actualDelivery).getTime() >= t.getTime(),
        ).length,
        s = C.filter((o) => !o.actualDelivery).filter(
          (o) => o.status !== k.Completed && o.status !== m.Delivered,
        ).length,
        c = W.filter((o) => ![k.Completed, k.Cancelled].includes(o.status))
          .filter((o) => _(o.departureDate) >= 0)
          .map((o) => ({ date: o.departureDate, days: _(o.departureDate) }))
          .sort((o, n) => o.days - n.days),
        x = c.length > 0 ? c[0] : null;
      return {
        payments: l,
        charges: g,
        delivered30d: d,
        openShipments: s,
        nextDepartureDays: (x == null ? void 0 : x.days) ?? null,
        nextDepartureDate: (x == null ? void 0 : x.date) ?? null,
      };
    }, [b, T, R, I, C, W]),
    se = j.useMemo(() => {
      if (!b) return [];
      const t = [];
      L < 0 &&
        t.push({
          id: "balance",
          severity: L < -500 ? "high" : "medium",
          title: "Balance due",
          subtitle: `Current balance: $${L.toFixed(2)}`,
          actionLabel: "Details",
          onAction: () =>
            u(
              "Balance due",
              e.jsxs("div", {
                className: "space-y-4",
                children: [
                  e.jsxs(S, {
                    title: "Summary",
                    children: [
                      e.jsx(a, {
                        label: "Balance",
                        value: `$${L.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                      }),
                      e.jsx(a, {
                        label: "Status",
                        value: L < 0 ? "Payment needed" : "OK",
                      }),
                    ],
                  }),
                  e.jsx("div", {
                    className:
                      "rounded-xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-sm text-slate-700",
                    children:
                      "This is your net balance. If it is negative, there are charges outstanding.",
                  }),
                ],
              }),
            ),
        });
      const i = D.map((d) => ({ order: d, ageDays: X(d.creationDate) }))
        .filter((d) => d.order.status === m.Pending && d.ageDays >= 1)
        .sort((d, s) => s.ageDays - d.ageDays)[0];
      i &&
        t.push({
          id: `pending:${i.order.id}`,
          severity: i.ageDays >= 3 ? "high" : "medium",
          title: "Pending order needs confirmation",
          subtitle: `${i.order.description} | ${i.ageDays} day(s) pending`,
          actionLabel: "Details",
          onAction: () => H(i.order),
        });
      const l = W.filter((d) => ![k.Completed, k.Cancelled].includes(d.status))
        .map((d) => ({ con: d, d: _(d.departureDate) }))
        .filter((d) => d.d >= 0 && d.d <= 7)
        .sort((d, s) => d.d - s.d)[0];
      l &&
        t.push({
          id: `depart:${l.con.id}`,
          severity: l.d <= 3 ? "high" : "medium",
          title: "Consolidation departing soon",
          subtitle: `${l.con.name} | departs in ${Math.max(0, l.d)} day(s)`,
          actionLabel: "Details",
          onAction: () => de(l.con),
        });
      const g = C.find((d) => !d.trackingUrl);
      return (
        g &&
          t.push({
            id: `tracking:${g.id}`,
            severity: "low",
            title: "Shipment tracking pending",
            subtitle: `${g.description} | ${g.origin} -> ${g.destination}`,
            actionLabel: "Details",
            onAction: () => Q(g),
          }),
        t.slice(0, 7)
      );
    }, [b, L, D, W, C, u, H, de, Q, T]),
    K = j.useMemo(() => {
      const t = D,
        i = (r) => t.filter((l) => l.status === r).length;
      return {
        pending: i(m.Pending),
        processing: i(m.Processing),
        qualityCheck: i(m.QualityCheck),
        readyToShip: i(m.ReadyToShip),
        inConsolidation: i(m.InConsolidation),
        delivered: i(m.Delivered),
      };
    }, [D]),
    ie = j.useMemo(() => {
      const t = C.filter(
          (r) => r.status !== m.Delivered && r.status !== k.Completed,
        ).sort(
          (r, l) =>
            new Date(l.shippingDate).getTime() -
            new Date(r.shippingDate).getTime(),
        ),
        i = C.filter((r) => r.actualDelivery).sort(
          (r, l) =>
            new Date(l.actualDelivery).getTime() -
            new Date(r.actualDelivery).getTime(),
        );
      return [...t, ...i].slice(0, 6);
    }, [C]);
  if (F) {
    const t = ze,
      i = Fe;
    return e.jsxs("div", {
      className: "relative z-0 ui-page",
      children: [
        e.jsx(je, {}),
        e.jsxs("div", {
          className: "px-4 sm:px-6 lg:px-8 py-6",
          children: [
            e.jsx("div", {
              className: "mb-6",
              children: e.jsx(me, {
                title: "Dashboard",
                subtitle: "Operations overview and exception monitoring.",
                icon: e.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: e.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3h8v6h-8V3zM3 21h8v-6H3v6z",
                  }),
                }),
              }),
            }),
            e.jsxs("div", {
              className:
                "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8",
              children: [
                e.jsx(P, {
                  title: "Customers",
                  value: Re,
                  subtitle: "All accounts",
                  tone: "neutral",
                  icon: e.jsx("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    children: e.jsx("path", {
                      d: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z",
                    }),
                  }),
                }),
                e.jsx(P, {
                  title: "Suppliers",
                  value: Le,
                  subtitle: "In network",
                  tone: "info",
                  icon: e.jsx("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    children: e.jsx("path", {
                      fillRule: "evenodd",
                      d: "M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z",
                      clipRule: "evenodd",
                    }),
                  }),
                }),
                e.jsx(P, {
                  title: "Orders",
                  value: _e,
                  subtitle: "Total orders",
                  tone: "neutral",
                  icon: e.jsx("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    children: e.jsx("path", {
                      fillRule: "evenodd",
                      d: "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
                      clipRule: "evenodd",
                    }),
                  }),
                }),
                e.jsx(P, {
                  title: "Consolidations",
                  value: Be,
                  subtitle: "Active",
                  tone: "good",
                  icon: e.jsx("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    children: e.jsx("path", {
                      d: "M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z",
                    }),
                  }),
                }),
                e.jsx(P, {
                  title: "Shipments",
                  value: he,
                  subtitle: "All shipments",
                  tone: "info",
                  icon: e.jsxs("svg", {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    children: [
                      e.jsx("path", {
                        d: "M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
                      }),
                      e.jsx("path", {
                        d: "M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z",
                      }),
                    ],
                  }),
                }),
              ],
            }),
            e.jsx("div", {
              className: "mb-8",
              children: e.jsxs("div", {
                className:
                  "bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden",
                children: [
                  e.jsx("div", {
                    className:
                      "p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white",
                    children: e.jsxs("div", {
                      className:
                        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
                      children: [
                        e.jsxs("div", {
                          children: [
                            e.jsx("h2", {
                              className: "text-xl font-bold text-gray-900",
                              children: "Command Center",
                            }),
                            e.jsx("p", {
                              className: "text-sm text-gray-600",
                              children:
                                "Prioritized actions and operational risks",
                            }),
                          ],
                        }),
                        e.jsxs("div", {
                          className: "flex items-center gap-2",
                          children: [
                            e.jsxs("div", {
                              className: "text-xs font-semibold text-gray-500",
                              children: [
                                "Inbox filter: ",
                                e.jsx("span", {
                                  className: "text-gray-800",
                                  children: ye(f),
                                }),
                              ],
                            }),
                            f !== "all" &&
                              e.jsx("button", {
                                type: "button",
                                onClick: () => A("all"),
                                className:
                                  "px-3 py-2 text-xs font-semibold rounded-lg bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors",
                                children: "Clear",
                              }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  e.jsxs("div", {
                    className: "p-5",
                    children: [
                      e.jsxs("div", {
                        className:
                          "flex items-center gap-2 overflow-x-auto pb-2",
                        children: [
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => A("pending_orders"),
                            className: `flex-shrink-0 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors ${f === "pending_orders" ? "bg-yellow-100 border-yellow-200 text-yellow-900" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`,
                            title:
                              "Pending orders need confirmation so charges get applied",
                            children: [
                              "Pending Orders: ",
                              e.jsx("span", {
                                className: "font-bold",
                                children:
                                  (t == null ? void 0 : t.pendingOrders) ??
                                  N.counts.pendingOrders,
                              }),
                            ],
                          }),
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => A("departing_soon"),
                            className: `flex-shrink-0 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors ${f === "departing_soon" ? "bg-red-100 border-red-200 text-red-900" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`,
                            title: "Departures within 7 days",
                            children: [
                              "Departing Soon: ",
                              e.jsx("span", {
                                className: "font-bold",
                                children:
                                  (i == null ? void 0 : i.departingSoon) ??
                                  N.counts.departingSoon,
                              }),
                            ],
                          }),
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => A("missing_shipment"),
                            className: `flex-shrink-0 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors ${f === "missing_shipment" ? "bg-orange-100 border-orange-200 text-orange-900" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`,
                            title:
                              "Ready-to-ship consolidations missing shipment records",
                            children: [
                              "Missing Shipment: ",
                              e.jsx("span", {
                                className: "font-bold",
                                children:
                                  (i == null ? void 0 : i.missingShipment) ??
                                  N.counts.missingShipment,
                              }),
                            ],
                          }),
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => A("missing_tracking"),
                            className: `flex-shrink-0 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors ${f === "missing_tracking" ? "bg-indigo-100 border-indigo-200 text-indigo-900" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`,
                            title: "Shipments missing carrier or tracking URL",
                            children: [
                              "Missing Tracking: ",
                              e.jsx("span", {
                                className: "font-bold",
                                children:
                                  (i == null ? void 0 : i.missingTracking) ??
                                  N.counts.missingTracking,
                              }),
                            ],
                          }),
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => A("capacity_risk"),
                            className: `flex-shrink-0 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors ${f === "capacity_risk" ? "bg-purple-100 border-purple-200 text-purple-900" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`,
                            title: "Consolidations over 85% space or weight",
                            children: [
                              "Capacity Risk: ",
                              e.jsx("span", {
                                className: "font-bold",
                                children:
                                  (i == null ? void 0 : i.capacityRisk) ??
                                  N.counts.capacityRisk,
                              }),
                            ],
                          }),
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => A("negative_balance"),
                            className: `flex-shrink-0 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors ${f === "negative_balance" ? "bg-gray-900 border-gray-900 text-white" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`,
                            title: "Customers owing more than $500",
                            children: [
                              "Negative Balances: ",
                              e.jsx("span", {
                                className: "font-bold",
                                children:
                                  (i == null ? void 0 : i.negativeBalances) ??
                                  N.counts.negativeBalances,
                              }),
                            ],
                          }),
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => A("distribution_mismatch"),
                            className: `flex-shrink-0 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors ${f === "distribution_mismatch" ? "bg-amber-100 border-amber-200 text-amber-900" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`,
                            title:
                              "Consolidations where expected distribution does not match billed ShippingCost transactions",
                            children: [
                              "Distribution Mismatch: ",
                              e.jsx("span", {
                                className: "font-bold",
                                children: E.filter(
                                  (r) => r.category === "distribution_mismatch",
                                ).length,
                              }),
                            ],
                          }),
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => A("ledger_mismatch"),
                            className: `flex-shrink-0 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors ${f === "ledger_mismatch" ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`,
                            title:
                              "Consolidations where distribution flags and ledger rows disagree",
                            children: [
                              "Ledger Mismatch: ",
                              e.jsx("span", {
                                className: "font-bold",
                                children: E.filter(
                                  (r) => r.category === "ledger_mismatch",
                                ).length,
                              }),
                            ],
                          }),
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => A("stuck_status"),
                            className: `flex-shrink-0 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors ${f === "stuck_status" ? "bg-teal-100 border-teal-200 text-teal-900" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`,
                            title:
                              "Orders or consolidations that have not progressed for a long time",
                            children: [
                              "Stuck Status: ",
                              e.jsx("span", {
                                className: "font-bold",
                                children: E.filter(
                                  (r) => r.category === "stuck_status",
                                ).length,
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4",
                        children: [
                          e.jsxs("div", {
                            className: "lg:col-span-2",
                            children: [
                              e.jsxs("div", {
                                className:
                                  "flex items-center justify-between mb-2",
                                children: [
                                  e.jsxs("div", {
                                    className:
                                      "text-sm font-semibold text-gray-700",
                                    children: [
                                      "Ops Inbox ",
                                      f === "all" ? "" : `(${ye(f)})`,
                                    ],
                                  }),
                                  e.jsxs("div", {
                                    className:
                                      "text-xs text-gray-500 font-medium",
                                    children: [
                                      "Showing ",
                                      ee.length,
                                      " item",
                                      ee.length === 1 ? "" : "s",
                                    ],
                                  }),
                                ],
                              }),
                              ee.length === 0
                                ? e.jsx("div", {
                                    className:
                                      "p-6 bg-gray-50 border border-gray-200 rounded-xl text-center text-gray-600",
                                    children:
                                      "No actionable items in this view.",
                                  })
                                : e.jsx("div", {
                                    className: "space-y-2",
                                    children: ee.map((r) =>
                                      e.jsx(
                                        "button",
                                        {
                                          type: "button",
                                          onClick: () =>
                                            r.onSecondaryAction
                                              ? r.onSecondaryAction()
                                              : r.onPrimaryAction(),
                                          className:
                                            "w-full text-left bg-white border border-gray-200 rounded-xl p-3 hover:shadow-sm transition-shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/10",
                                          title: "Open details",
                                          children: e.jsxs("div", {
                                            className:
                                              "flex items-start justify-between gap-3",
                                            children: [
                                              e.jsxs("div", {
                                                className: "min-w-0",
                                                children: [
                                                  e.jsxs("div", {
                                                    className:
                                                      "flex items-center gap-2 flex-wrap",
                                                    children: [
                                                      e.jsx(Ve, {
                                                        severity: r.severity,
                                                      }),
                                                      e.jsx("div", {
                                                        className:
                                                          "text-sm font-semibold text-gray-900 truncate",
                                                        children: r.title,
                                                      }),
                                                      typeof r.dueInDays ==
                                                        "number" &&
                                                        e.jsx("span", {
                                                          className:
                                                            "text-xs font-semibold text-gray-500",
                                                          children:
                                                            r.dueInDays <= 0
                                                              ? "due now"
                                                              : `due in ${r.dueInDays}d`,
                                                        }),
                                                    ],
                                                  }),
                                                  r.subtitle &&
                                                    e.jsx("div", {
                                                      className:
                                                        "text-xs text-gray-600 mt-1",
                                                      children: r.subtitle,
                                                    }),
                                                ],
                                              }),
                                              e.jsx("div", {
                                                className:
                                                  "flex-shrink-0 pt-1 text-gray-400",
                                                children: e.jsx("svg", {
                                                  className: "h-5 w-5",
                                                  fill: "none",
                                                  stroke: "currentColor",
                                                  viewBox: "0 0 24 24",
                                                  children: e.jsx("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M9 5l7 7-7 7",
                                                  }),
                                                }),
                                              }),
                                            ],
                                          }),
                                        },
                                        r.id,
                                      ),
                                    ),
                                  }),
                            ],
                          }),
                          e.jsxs("div", {
                            className:
                              "bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-4",
                            children: [
                              e.jsx("div", {
                                className:
                                  "text-sm font-bold text-gray-900 mb-2",
                                children: "Flow Snapshot",
                              }),
                              e.jsxs("div", {
                                className: "grid grid-cols-2 gap-3",
                                children: [
                                  e.jsxs("div", {
                                    className:
                                      "p-3 rounded-xl bg-white border border-gray-200",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-xs text-gray-500 font-semibold uppercase",
                                        children: "Orders pending",
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "text-2xl font-bold text-gray-900",
                                        children:
                                          (t == null
                                            ? void 0
                                            : t.pendingOrders) ??
                                          N.counts.pendingOrders,
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "mt-1 text-[11px] text-gray-500",
                                        children: "Status: Pending",
                                      }),
                                    ],
                                  }),
                                  e.jsxs("div", {
                                    className:
                                      "p-3 rounded-xl bg-white border border-gray-200",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-xs text-gray-500 font-semibold uppercase",
                                        children: "Orders in progress",
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "text-2xl font-bold text-gray-900",
                                        children:
                                          (t == null
                                            ? void 0
                                            : t.inProgressOrders) ??
                                          N.counts.inProgressOrders,
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "mt-1 text-[11px] text-gray-500",
                                        children:
                                          "Status: Processing, QualityCheck",
                                      }),
                                    ],
                                  }),
                                  e.jsxs("div", {
                                    className:
                                      "p-3 rounded-xl bg-white border border-gray-200",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-xs text-gray-500 font-semibold uppercase",
                                        children: "Orders ready",
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "text-2xl font-bold text-gray-900",
                                        children:
                                          (t == null
                                            ? void 0
                                            : t.readyOrders) ??
                                          N.counts.readyOrders,
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "mt-1 text-[11px] text-gray-500",
                                        children: "Status: ReadyToShip",
                                      }),
                                    ],
                                  }),
                                  e.jsxs("div", {
                                    className:
                                      "p-3 rounded-xl bg-white border border-gray-200",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-xs text-gray-500 font-semibold uppercase",
                                        children: "Shipments",
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "text-2xl font-bold text-gray-900",
                                        children:
                                          (t == null ? void 0 : t.shipments) ??
                                          he,
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "mt-1 text-[11px] text-gray-500",
                                        children: "All shipments in system",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              e.jsx("div", {
                                className:
                                  "mt-4 rounded-2xl border border-gray-200 bg-white p-3",
                                children: e.jsxs("div", {
                                  className:
                                    "flex items-start justify-between gap-3",
                                  children: [
                                    e.jsxs("div", {
                                      className: "min-w-0",
                                      children: [
                                        e.jsx("div", {
                                          className:
                                            "text-xs font-semibold uppercase tracking-wide text-gray-500",
                                          children: "Exports (last 30 days)",
                                        }),
                                        e.jsxs("div", {
                                          className:
                                            "mt-1 flex items-baseline gap-2",
                                          children: [
                                            e.jsx("div", {
                                              className:
                                                "text-2xl font-extrabold text-gray-900",
                                              children:
                                                (V == null
                                                  ? void 0
                                                  : V.total) ?? 0,
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-xs font-semibold text-gray-500",
                                              children: "shipments",
                                            }),
                                          ],
                                        }),
                                        e.jsx("div", {
                                          className:
                                            "mt-1 text-[11px] text-gray-500",
                                          children:
                                            "Daily shipped count (last 30 days)",
                                        }),
                                      ],
                                    }),
                                    e.jsx("div", {
                                      className: "shrink-0",
                                      children: e.jsx(He, {
                                        values:
                                          (V == null ? void 0 : V.daily) ?? [],
                                        strokeClassName: "stroke-emerald-700",
                                      }),
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsx("div", {
                        className: "mt-6",
                        children: e.jsx(fe, { title: "Recent activity" }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    });
  }
  return b !== null
    ? e.jsxs("div", {
        className: "ui-page",
        children: [
          e.jsx(je, {}),
          e.jsxs("div", {
            className: "px-4 sm:px-6 lg:px-8 py-6 space-y-6",
            children: [
              e.jsx(me, {
                title: `Welcome, ${($ == null ? void 0 : $.contactPerson) || "Customer"}`,
                subtitle: "Here's your account summary.",
                icon: e.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: e.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M3 7h18M3 12h18M3 17h18",
                  }),
                }),
                right:
                  $ != null && $.contractType
                    ? e.jsx(De, {
                        className: `${et[$.contractType]} px-3 py-1.5 rounded-full text-xs sm:text-sm tracking-wide uppercase`,
                        children: e.jsxs("span", {
                          className: "flex items-center gap-1.5",
                          children: [
                            e.jsx("div", {
                              className:
                                "w-2 h-2 rounded-full bg-current opacity-60",
                            }),
                            ((we = tt[$.contractType]) == null
                              ? void 0
                              : we.name) || $.contractType,
                          ],
                        }),
                      })
                    : null,
              }),
              e.jsxs("div", {
                className:
                  "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8",
                children: [
                  e.jsx(P, {
                    title: "Balance",
                    value: `$${L.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    subtitle: L < 0 ? "Payment needed" : "In good standing",
                    tone: L < 0 ? "bad" : "good",
                  }),
                  e.jsx(P, {
                    title: "Shipments",
                    value: M.length,
                    subtitle:
                      y.openShipments > 0
                        ? `${y.openShipments} open`
                        : "No open shipments",
                    tone: y.openShipments > 0 ? "info" : "neutral",
                  }),
                  e.jsx(P, {
                    title: "Orders",
                    value: Te,
                    subtitle: "In progress",
                    tone: "neutral",
                  }),
                  e.jsx(P, {
                    title: "Consolidations",
                    value: ge.length,
                    subtitle:
                      y.nextDepartureDays !== null
                        ? `Next departs in ${Math.max(0, y.nextDepartureDays)}d`
                        : "No upcoming departure",
                    tone:
                      y.nextDepartureDays !== null && y.nextDepartureDays <= 7
                        ? "warn"
                        : "info",
                  }),
                  e.jsx(P, {
                    title: "Suppliers",
                    value: Ae.length,
                    subtitle: "Worked with",
                    tone: "neutral",
                  }),
                ],
              }),
              e.jsx("div", {
                className: "mb-6 sm:mb-8",
                children: e.jsxs("div", {
                  className:
                    "bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden",
                  children: [
                    e.jsx("div", {
                      className:
                        "p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white",
                      children: e.jsxs("div", {
                        className:
                          "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
                        children: [
                          e.jsxs("div", {
                            children: [
                              e.jsx("h2", {
                                className: "text-xl font-bold text-gray-900",
                                children: "Account Overview",
                              }),
                              e.jsx("p", {
                                className: "text-sm text-gray-600",
                                children:
                                  "Quick context for payments, shipments, and what is next",
                              }),
                            ],
                          }),
                          y.payments > 0 ||
                          y.charges > 0 ||
                          y.openShipments > 0 ||
                          y.delivered30d > 0 ||
                          y.nextDepartureDate
                            ? e.jsxs("div", {
                                className:
                                  "grid grid-cols-2 sm:grid-cols-4 gap-2",
                                children: [
                                  e.jsxs("div", {
                                    className:
                                      "px-3 py-2 rounded-xl border border-gray-200 bg-white",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                        children: "Payments 30d",
                                      }),
                                      e.jsxs("div", {
                                        className:
                                          "text-sm font-bold text-emerald-700",
                                        children: ["$", y.payments.toFixed(0)],
                                      }),
                                    ],
                                  }),
                                  e.jsxs("div", {
                                    className:
                                      "px-3 py-2 rounded-xl border border-gray-200 bg-white",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                        children: "Charges 30d",
                                      }),
                                      e.jsxs("div", {
                                        className:
                                          "text-sm font-bold text-gray-900",
                                        children: ["$", y.charges.toFixed(0)],
                                      }),
                                    ],
                                  }),
                                  e.jsxs("div", {
                                    className:
                                      "px-3 py-2 rounded-xl border border-gray-200 bg-white",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                        children: "Open Shipments",
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "text-sm font-bold text-gray-900",
                                        children: y.openShipments,
                                      }),
                                    ],
                                  }),
                                  e.jsxs("div", {
                                    className:
                                      "px-3 py-2 rounded-xl border border-gray-200 bg-white",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                        children: "Next Departure",
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "text-sm font-bold text-gray-900",
                                        children: y.nextDepartureDate
                                          ? `${new Date(y.nextDepartureDate).toLocaleDateString()}${typeof y.nextDepartureDays == "number" ? ` (${y.nextDepartureDays}d)` : ""}`
                                          : "-",
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : e.jsx("div", {
                                className: "text-xs text-gray-500 font-medium",
                                children:
                                  "No account activity in the last 30 days.",
                              }),
                        ],
                      }),
                    }),
                    e.jsx("div", {
                      className: "p-5",
                      children: e.jsxs("div", {
                        className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
                        children: [
                          e.jsxs("div", {
                            className: "space-y-4",
                            children: [
                              e.jsxs("div", {
                                className:
                                  "bg-white border border-gray-200 rounded-2xl overflow-hidden",
                                children: [
                                  e.jsxs("div", {
                                    className:
                                      "px-4 py-3 border-b border-gray-100 flex items-center justify-between",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-sm font-semibold text-gray-800",
                                        children: "My action list",
                                      }),
                                      e.jsxs("div", {
                                        className:
                                          "text-xs text-gray-500 font-medium",
                                        children: [
                                          se.length,
                                          " item",
                                          se.length === 1 ? "" : "s",
                                        ],
                                      }),
                                    ],
                                  }),
                                  e.jsx("div", {
                                    className: "p-4",
                                    children: ne
                                      ? e.jsx(oe, { rows: 3 })
                                      : se.length === 0
                                        ? e.jsx("div", {
                                            className:
                                              "p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-sm",
                                            children:
                                              "You are all set. No urgent actions right now.",
                                          })
                                        : e.jsx("div", {
                                            className: "space-y-2",
                                            children: se.map((t) =>
                                              e.jsxs(
                                                "div",
                                                {
                                                  className:
                                                    "flex items-start justify-between gap-3 p-3 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow",
                                                  children: [
                                                    e.jsxs("div", {
                                                      className: "min-w-0",
                                                      children: [
                                                        e.jsxs("div", {
                                                          className:
                                                            "flex items-center gap-2 flex-wrap",
                                                          children: [
                                                            e.jsx("span", {
                                                              className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${t.severity === "high" ? "bg-red-100 text-red-800 border-red-200" : t.severity === "medium" ? "bg-yellow-100 text-yellow-800 border-yellow-200" : "bg-gray-100 text-gray-700 border-gray-200"}`,
                                                              children:
                                                                t.severity.toUpperCase(),
                                                            }),
                                                            e.jsx("div", {
                                                              className:
                                                                "text-sm font-semibold text-gray-900 truncate",
                                                              children: t.title,
                                                            }),
                                                          ],
                                                        }),
                                                        t.subtitle &&
                                                          e.jsx("div", {
                                                            className:
                                                              "text-xs text-gray-600 mt-1",
                                                            children:
                                                              t.subtitle,
                                                          }),
                                                      ],
                                                    }),
                                                    e.jsx($e, {
                                                      type: "button",
                                                      variant: "outline",
                                                      size: "sm",
                                                      onClick: t.onAction,
                                                      className:
                                                        "flex-shrink-0",
                                                      children: t.actionLabel,
                                                    }),
                                                  ],
                                                },
                                                t.id,
                                              ),
                                            ),
                                          }),
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className:
                                  "bg-white border border-gray-200 rounded-2xl overflow-hidden",
                                children: [
                                  e.jsx("div", {
                                    className:
                                      "px-4 py-3 border-b border-gray-100",
                                    children: e.jsx("div", {
                                      className:
                                        "text-sm font-semibold text-gray-800",
                                      children: "In-progress snapshot",
                                    }),
                                  }),
                                  e.jsx("div", {
                                    className: "p-4",
                                    children: e.jsxs("div", {
                                      className:
                                        "grid grid-cols-2 sm:grid-cols-3 gap-2",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () =>
                                            u(
                                              "Pending orders",
                                              e.jsxs("div", {
                                                className: "space-y-3",
                                                children: [
                                                  D.filter(
                                                    (t) =>
                                                      t.status === m.Pending,
                                                  )
                                                    .slice(0, 12)
                                                    .map((t) =>
                                                      e.jsxs(
                                                        "button",
                                                        {
                                                          type: "button",
                                                          onClick: () => H(t),
                                                          className:
                                                            "w-full text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                                          children: [
                                                            e.jsx("div", {
                                                              className:
                                                                "text-sm font-semibold text-gray-900 truncate",
                                                              children:
                                                                t.description,
                                                            }),
                                                            e.jsxs("div", {
                                                              className:
                                                                "text-xs text-gray-600 mt-1",
                                                              children: [
                                                                h(
                                                                  t.id,
                                                                  "order",
                                                                ),
                                                                " | Pending",
                                                              ],
                                                            }),
                                                          ],
                                                        },
                                                        t.id,
                                                      ),
                                                    ),
                                                  D.filter(
                                                    (t) =>
                                                      t.status === m.Pending,
                                                  ).length === 0
                                                    ? e.jsx("div", {
                                                        className:
                                                          "p-5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm",
                                                        children:
                                                          "No pending orders.",
                                                      })
                                                    : null,
                                                ],
                                              }),
                                            ),
                                          className:
                                            "text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                          children: [
                                            e.jsx("div", {
                                              className:
                                                "text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                              children: "Pending",
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-lg font-bold text-gray-900",
                                              children: K.pending,
                                            }),
                                          ],
                                        }),
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () =>
                                            u(
                                              "Processing orders",
                                              e.jsxs("div", {
                                                className: "space-y-3",
                                                children: [
                                                  D.filter(
                                                    (t) =>
                                                      t.status ===
                                                        m.Processing ||
                                                      t.status ===
                                                        m.QualityCheck,
                                                  )
                                                    .slice(0, 12)
                                                    .map((t) =>
                                                      e.jsxs(
                                                        "button",
                                                        {
                                                          type: "button",
                                                          onClick: () => H(t),
                                                          className:
                                                            "w-full text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                                          children: [
                                                            e.jsx("div", {
                                                              className:
                                                                "text-sm font-semibold text-gray-900 truncate",
                                                              children:
                                                                t.description,
                                                            }),
                                                            e.jsxs("div", {
                                                              className:
                                                                "text-xs text-gray-600 mt-1",
                                                              children: [
                                                                h(
                                                                  t.id,
                                                                  "order",
                                                                ),
                                                                " | ",
                                                                String(
                                                                  t.status,
                                                                ),
                                                              ],
                                                            }),
                                                          ],
                                                        },
                                                        t.id,
                                                      ),
                                                    ),
                                                  D.filter(
                                                    (t) =>
                                                      t.status ===
                                                        m.Processing ||
                                                      t.status ===
                                                        m.QualityCheck,
                                                  ).length === 0
                                                    ? e.jsx("div", {
                                                        className:
                                                          "p-5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm",
                                                        children:
                                                          "No processing orders.",
                                                      })
                                                    : null,
                                                ],
                                              }),
                                            ),
                                          className:
                                            "text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                          children: [
                                            e.jsx("div", {
                                              className:
                                                "text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                              children: "Processing",
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-lg font-bold text-gray-900",
                                              children:
                                                K.processing + K.qualityCheck,
                                            }),
                                          ],
                                        }),
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () =>
                                            u(
                                              "Ready to ship",
                                              e.jsxs("div", {
                                                className: "space-y-3",
                                                children: [
                                                  D.filter(
                                                    (t) =>
                                                      t.status ===
                                                      m.ReadyToShip,
                                                  )
                                                    .slice(0, 12)
                                                    .map((t) =>
                                                      e.jsxs(
                                                        "button",
                                                        {
                                                          type: "button",
                                                          onClick: () => H(t),
                                                          className:
                                                            "w-full text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                                          children: [
                                                            e.jsx("div", {
                                                              className:
                                                                "text-sm font-semibold text-gray-900 truncate",
                                                              children:
                                                                t.description,
                                                            }),
                                                            e.jsxs("div", {
                                                              className:
                                                                "text-xs text-gray-600 mt-1",
                                                              children: [
                                                                h(
                                                                  t.id,
                                                                  "order",
                                                                ),
                                                                " | Ready",
                                                              ],
                                                            }),
                                                          ],
                                                        },
                                                        t.id,
                                                      ),
                                                    ),
                                                  D.filter(
                                                    (t) =>
                                                      t.status ===
                                                      m.ReadyToShip,
                                                  ).length === 0
                                                    ? e.jsx("div", {
                                                        className:
                                                          "p-5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm",
                                                        children:
                                                          "No ready orders.",
                                                      })
                                                    : null,
                                                ],
                                              }),
                                            ),
                                          className:
                                            "text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                          children: [
                                            e.jsx("div", {
                                              className:
                                                "text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                              children: "Ready",
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-lg font-bold text-gray-900",
                                              children: K.readyToShip,
                                            }),
                                          ],
                                        }),
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () =>
                                            u(
                                              "In consolidation",
                                              e.jsxs("div", {
                                                className: "space-y-3",
                                                children: [
                                                  D.filter(
                                                    (t) =>
                                                      t.status ===
                                                      m.InConsolidation,
                                                  )
                                                    .slice(0, 12)
                                                    .map((t) =>
                                                      e.jsxs(
                                                        "button",
                                                        {
                                                          type: "button",
                                                          onClick: () => H(t),
                                                          className:
                                                            "w-full text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                                          children: [
                                                            e.jsx("div", {
                                                              className:
                                                                "text-sm font-semibold text-gray-900 truncate",
                                                              children:
                                                                t.description,
                                                            }),
                                                            e.jsxs("div", {
                                                              className:
                                                                "text-xs text-gray-600 mt-1",
                                                              children: [
                                                                h(
                                                                  t.id,
                                                                  "order",
                                                                ),
                                                                " | In consolidation",
                                                              ],
                                                            }),
                                                          ],
                                                        },
                                                        t.id,
                                                      ),
                                                    ),
                                                  D.filter(
                                                    (t) =>
                                                      t.status ===
                                                      m.InConsolidation,
                                                  ).length === 0
                                                    ? e.jsx("div", {
                                                        className:
                                                          "p-5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm",
                                                        children:
                                                          "No orders in consolidation.",
                                                      })
                                                    : null,
                                                ],
                                              }),
                                            ),
                                          className:
                                            "text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                          children: [
                                            e.jsx("div", {
                                              className:
                                                "text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                              children: "In consolidation",
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-lg font-bold text-gray-900",
                                              children: K.inConsolidation,
                                            }),
                                          ],
                                        }),
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () =>
                                            u(
                                              "Shipments",
                                              e.jsxs("div", {
                                                className: "space-y-3",
                                                children: [
                                                  C.slice(0, 12).map((t) =>
                                                    e.jsxs(
                                                      "button",
                                                      {
                                                        type: "button",
                                                        onClick: () => Q(t),
                                                        className:
                                                          "w-full text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                                        children: [
                                                          e.jsx("div", {
                                                            className:
                                                              "text-sm font-semibold text-gray-900 truncate",
                                                            children:
                                                              t.description,
                                                          }),
                                                          e.jsxs("div", {
                                                            className:
                                                              "text-xs text-gray-600 mt-1",
                                                            children: [
                                                              h(
                                                                t.id,
                                                                "shipment",
                                                              ),
                                                              " | ",
                                                              String(t.status),
                                                            ],
                                                          }),
                                                        ],
                                                      },
                                                      t.id,
                                                    ),
                                                  ),
                                                  C.length === 0
                                                    ? e.jsx("div", {
                                                        className:
                                                          "p-5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm",
                                                        children:
                                                          "No shipments yet.",
                                                      })
                                                    : null,
                                                ],
                                              }),
                                            ),
                                          className:
                                            "text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                          children: [
                                            e.jsx("div", {
                                              className:
                                                "text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                              children: "Shipments",
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-lg font-bold text-gray-900",
                                              children: C.length,
                                            }),
                                          ],
                                        }),
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () =>
                                            u(
                                              "Consolidations",
                                              e.jsxs("div", {
                                                className: "space-y-3",
                                                children: [
                                                  W.slice(0, 12).map((t) =>
                                                    e.jsxs(
                                                      "button",
                                                      {
                                                        type: "button",
                                                        onClick: () => de(t),
                                                        className:
                                                          "w-full text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                                        children: [
                                                          e.jsx("div", {
                                                            className:
                                                              "text-sm font-semibold text-gray-900 truncate",
                                                            children: t.name,
                                                          }),
                                                          e.jsxs("div", {
                                                            className:
                                                              "text-xs text-gray-600 mt-1",
                                                            children: [
                                                              h(
                                                                t.id,
                                                                "consolidation",
                                                              ),
                                                              " | ",
                                                              String(t.status),
                                                            ],
                                                          }),
                                                        ],
                                                      },
                                                      t.id,
                                                    ),
                                                  ),
                                                  W.length === 0
                                                    ? e.jsx("div", {
                                                        className:
                                                          "p-5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm",
                                                        children:
                                                          "No consolidations yet.",
                                                      })
                                                    : null,
                                                ],
                                              }),
                                            ),
                                          className:
                                            "text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                          children: [
                                            e.jsx("div", {
                                              className:
                                                "text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                              children: "Consolidations",
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-lg font-bold text-gray-900",
                                              children: W.length,
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className: "space-y-4",
                            children: [
                              e.jsxs("div", {
                                className:
                                  "bg-white border border-gray-200 rounded-2xl overflow-hidden",
                                children: [
                                  e.jsxs("div", {
                                    className:
                                      "px-4 py-3 border-b border-gray-100 flex items-center justify-between",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-sm font-semibold text-gray-800",
                                        children: "Shipment timeline",
                                      }),
                                      e.jsx("button", {
                                        type: "button",
                                        onClick: () =>
                                          u(
                                            "Shipment timeline",
                                            e.jsxs("div", {
                                              className: "space-y-3",
                                              children: [
                                                ie.map((t) =>
                                                  e.jsxs(
                                                    "button",
                                                    {
                                                      type: "button",
                                                      onClick: () => Q(t),
                                                      className:
                                                        "w-full text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                                      children: [
                                                        e.jsx("div", {
                                                          className:
                                                            "text-sm font-semibold text-gray-900 truncate",
                                                          children:
                                                            t.description,
                                                        }),
                                                        e.jsxs("div", {
                                                          className:
                                                            "text-xs text-gray-600 mt-1",
                                                          children: [
                                                            String(t.status),
                                                            " | ",
                                                            t.origin,
                                                            " to ",
                                                            t.destination,
                                                          ],
                                                        }),
                                                      ],
                                                    },
                                                    t.id,
                                                  ),
                                                ),
                                                ie.length === 0
                                                  ? e.jsx("div", {
                                                      className:
                                                        "p-5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm",
                                                      children:
                                                        "No shipment updates yet.",
                                                    })
                                                  : null,
                                              ],
                                            }),
                                          ),
                                        className:
                                          "text-xs font-semibold text-gray-500 hover:text-gray-700",
                                        children: "Details",
                                      }),
                                    ],
                                  }),
                                  e.jsx("div", {
                                    className: "p-4",
                                    children: ne
                                      ? e.jsx(oe, { rows: 3 })
                                      : ie.length === 0
                                        ? e.jsx("div", {
                                            className:
                                              "p-5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm",
                                            children:
                                              "No shipment updates yet.",
                                          })
                                        : e.jsx("div", {
                                            className: "space-y-2",
                                            children: ie.map((t) => {
                                              const i = t.trackingUrl
                                                ? t.actualDelivery
                                                  ? `Delivered ${new Date(t.actualDelivery).toLocaleDateString()}`
                                                  : t.estimatedDelivery
                                                    ? `Est. delivery ${new Date(t.estimatedDelivery).toLocaleDateString()}`
                                                    : "In transit"
                                                : "Tracking pending";
                                              return e.jsxs(
                                                "div",
                                                {
                                                  className:
                                                    "flex items-start justify-between gap-3 p-3 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow",
                                                  children: [
                                                    e.jsxs("div", {
                                                      className: "min-w-0",
                                                      children: [
                                                        e.jsxs("div", {
                                                          className:
                                                            "flex items-center gap-2 flex-wrap",
                                                          children: [
                                                            e.jsx(De, {
                                                              variant:
                                                                "outline",
                                                              children: String(
                                                                t.status,
                                                              ),
                                                            }),
                                                            e.jsx("div", {
                                                              className:
                                                                "text-sm font-semibold text-gray-900 truncate",
                                                              children:
                                                                t.description,
                                                            }),
                                                          ],
                                                        }),
                                                        e.jsxs("div", {
                                                          className:
                                                            "text-xs text-gray-600 mt-1",
                                                          children: [
                                                            t.origin,
                                                            " to ",
                                                            t.destination,
                                                            " | ",
                                                            i,
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                    e.jsx($e, {
                                                      type: "button",
                                                      variant: "outline",
                                                      size: "sm",
                                                      onClick: () => Q(t),
                                                      className:
                                                        "flex-shrink-0",
                                                      children: "Details",
                                                    }),
                                                  ],
                                                },
                                                t.id,
                                              );
                                            }),
                                          }),
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className:
                                  "bg-white border border-gray-200 rounded-2xl overflow-hidden",
                                children: [
                                  e.jsxs("div", {
                                    className:
                                      "px-4 py-3 border-b border-gray-100 flex items-center justify-between",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-sm font-semibold text-gray-800",
                                        children: "Recent charges",
                                      }),
                                      e.jsx("button", {
                                        type: "button",
                                        onClick: () =>
                                          u(
                                            "Recent charges",
                                            e.jsxs("div", {
                                              className: "space-y-3",
                                              children: [
                                                te.slice(0, 20).map((t) =>
                                                  e.jsxs(
                                                    "button",
                                                    {
                                                      type: "button",
                                                      onClick: () => Ne(t),
                                                      className:
                                                        "w-full text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50",
                                                      children: [
                                                        e.jsx("div", {
                                                          className:
                                                            "text-sm font-semibold text-gray-900 truncate",
                                                          children:
                                                            t.description,
                                                        }),
                                                        e.jsxs("div", {
                                                          className:
                                                            "text-xs text-gray-600 mt-1",
                                                          children: [
                                                            new Date(
                                                              t.date,
                                                            ).toLocaleDateString(),
                                                            " ",
                                                            String(t.type),
                                                          ],
                                                        }),
                                                      ],
                                                    },
                                                    t.id,
                                                  ),
                                                ),
                                                te.length === 0
                                                  ? e.jsx("div", {
                                                      className:
                                                        "p-5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm",
                                                      children:
                                                        "No transactions yet.",
                                                    })
                                                  : null,
                                              ],
                                            }),
                                          ),
                                        className:
                                          "text-xs font-semibold text-gray-500 hover:text-gray-700",
                                        children: "Details",
                                      }),
                                    ],
                                  }),
                                  e.jsx("div", {
                                    className: "p-4",
                                    children: ne
                                      ? e.jsx(oe, { rows: 3 })
                                      : te.length === 0
                                        ? e.jsx("div", {
                                            className:
                                              "p-5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm",
                                            children: "No transactions yet.",
                                          })
                                        : e.jsx("div", {
                                            className: "space-y-2",
                                            children: te.map((t) => {
                                              const i =
                                                t.amount < 0
                                                  ? "text-red-700"
                                                  : "text-emerald-700";
                                              return e.jsxs(
                                                "div",
                                                {
                                                  className:
                                                    "flex items-start justify-between gap-3 p-3 border border-gray-200 rounded-xl",
                                                  children: [
                                                    e.jsxs("div", {
                                                      className: "min-w-0",
                                                      children: [
                                                        e.jsx("div", {
                                                          className:
                                                            "text-sm font-semibold text-gray-900 truncate",
                                                          children:
                                                            t.description,
                                                        }),
                                                        e.jsxs("div", {
                                                          className:
                                                            "text-xs text-gray-600 mt-1",
                                                          children: [
                                                            new Date(
                                                              t.date,
                                                            ).toLocaleDateString(),
                                                            " ",
                                                            String(t.type),
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                    e.jsxs("div", {
                                                      className:
                                                        "flex items-center gap-2",
                                                      children: [
                                                        e.jsxs("div", {
                                                          className: `text-sm font-bold ${i}`,
                                                          children: [
                                                            t.amount < 0
                                                              ? "-"
                                                              : "+",
                                                            "$",
                                                            Math.abs(
                                                              t.amount,
                                                            ).toFixed(2),
                                                          ],
                                                        }),
                                                        e.jsx("button", {
                                                          type: "button",
                                                          onClick: () => Ne(t),
                                                          className:
                                                            "px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-700",
                                                          children: "Details",
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                },
                                                t.id,
                                              );
                                            }),
                                          }),
                                  }),
                                ],
                              }),
                              e.jsx(fe, { title: "Updates" }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      })
    : e.jsx("div", {
        className: "ui-page",
        children: e.jsx("div", {
          className: "px-4 sm:px-6 lg:px-8 py-10",
          children: e.jsx("div", {
            className: "max-w-xl mx-auto",
            children: e.jsx(me, {
              title: "Dashboard",
              subtitle: "Please log in to view your dashboard.",
              icon: e.jsx("svg", {
                className: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: e.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-10h8V3h-8v8z",
                }),
              }),
            }),
          }),
        }),
      });
};
export { ht as default };
