import { r, j as e } from "./radix.js";
import {
  C as L,
  O as E,
  f,
  y as he,
  r as M,
  j as P,
  c as d,
  p as Ie,
  t as ve,
  l as ge,
  z as Te,
} from "./app.js";
import { P as Le } from "./pageheader.js";
import { A as Ee } from "./activitytimeline.js";
import { B as Me, f as Pe, A as $e } from "./audittrailpanel.js";
import { R as ze } from "./relatedpanel.js";
import "./react.js";
import "./supabase.js";
import "./icons.js";
const F = 20,
  Ze = ({
    shipments: v,
    transactions: H,
    onEditTracking: ee,
    currentCustomerId: R,
    allCustomers: V,
    updateShipmentStatus: je,
    isAdmin: u,
    consolidations: W,
    allOrders: J,
    onNavigate: o,
    highlightShipmentId: n = null,
    onHighlightHandled: $,
  }) => {
    const [x, te] = r.useState(null),
      [ye, q] = r.useState(!1),
      [p, g] = r.useState(1),
      [Q, se] = r.useState([]),
      [G, ae] = r.useState(0),
      [D, le] = r.useState(!1),
      [ie, re] = r.useState(null),
      [ne, de] = r.useState(null),
      [S, z] = r.useState(""),
      [I, O] = r.useState("all"),
      [b, Y] = r.useState("all"),
      [j, y] = r.useState(null),
      [A, oe] = r.useState(!1),
      [Oe, Ae] = r.useState(null),
      [Ue, Be] = r.useState(0);
    (r.useEffect(() => {
      try {
        const t = localStorage.getItem("bundleist_shipments_state");
        if (!t) return;
        const a = JSON.parse(t);
        (a && typeof a.query == "string" && z(a.query),
          a && typeof a.typeFilter == "string" && O(a.typeFilter),
          a && typeof a.customerFilterId == "string" && Y(a.customerFilterId),
          a &&
            typeof a.currentPage == "number" &&
            g(Math.max(1, a.currentPage)),
          a &&
            typeof a.selectedShipmentId == "string" &&
            y(a.selectedShipmentId),
          a && typeof a.detailsExpanded == "boolean" && oe(a.detailsExpanded));
      } catch {}
    }, []),
      r.useEffect(() => {
        try {
          localStorage.setItem(
            "bundleist_shipments_state",
            JSON.stringify({
              query: S,
              typeFilter: I,
              customerFilterId: b,
              currentPage: p,
              selectedShipmentId: j,
              detailsExpanded: A,
            }),
          );
        } catch {}
      }, [S, I, b, p, j, A]),
      r.useEffect(() => {
        try {
          const t = localStorage.getItem("bundleist_nav_intent");
          if (!t) return;
          const a = JSON.parse(t);
          if (!a || a.page !== "shipments") return;
          (typeof a.query == "string" && z(a.query),
            typeof a.typeFilter == "string" && O(a.typeFilter),
            typeof a.customerId == "string" && Y(a.customerId),
            typeof a.shipmentId == "string" && y(a.shipmentId),
            g(1),
            localStorage.removeItem("bundleist_nav_intent"));
        } catch {}
      }, []));
    const U = Q,
      m = U,
      w = Math.max(1, Math.ceil(G / F)),
      be = D && m.length === 0,
      Ne = m.filter(
        (t) => t.status === L.InTransit || t.status === E.InTransit,
      ).length,
      we = m.filter(
        (t) => t.status === L.Delivered || t.status === E.Delivered,
      ).length,
      ke = m.filter((t) => !t.trackingUrl).length,
      Z = !!(n && v.some((t) => t.id === n)),
      K = !!(n && m.some((t) => t.id === n)),
      ce = !!(n && Z && !K),
      s = m.find((t) => t.id === j) || (ce ? null : (m[0] ?? null)),
      h = r.useMemo(
        () => (s ? (H || []).filter((t) => t.relatedShipmentId === s.id) : []),
        [H, s == null ? void 0 : s.id],
      ),
      k = r.useMemo(() => h.reduce((t, a) => t + (a.amount || 0), 0), [h]),
      X = r.useMemo(() => {
        if (!s) return null;
        const t = [];
        (s.shippingDate && t.push(s.shippingDate),
          s.estimatedDelivery && t.push(s.estimatedDelivery),
          s.actualDelivery && t.push(s.actualDelivery));
        for (const l of h) l.date && t.push(l.date);
        const a = t
          .map((l) => new Date(l).getTime())
          .filter((l) => !Number.isNaN(l))
          .reduce((l, i) => Math.max(l, i), 0);
        return a ? new Date(a) : null;
      }, [s, h]),
      Ce = r.useMemo(() => {
        if (!s) return [];
        const t = [];
        (s.shippingDate &&
          t.push({
            at: s.shippingDate,
            title: "Shipped",
            subtitle: `${s.origin} -> ${s.destination}`,
            tone: "neutral",
          }),
          s.estimatedDelivery &&
            t.push({
              at: s.estimatedDelivery,
              title: "ETA",
              subtitle: "Estimated delivery date",
              tone: "neutral",
            }),
          s.actualDelivery &&
            t.push({
              at: s.actualDelivery,
              title: "Delivered",
              subtitle: "Actual delivery recorded",
              tone: "good",
            }));
        const a = C(s),
          l = T(s);
        (a &&
          s.shippingDate &&
          t.push({
            at: s.shippingDate,
            title: `Related consolidation ${f(a.id, "consolidation")}`,
            subtitle: a.name,
            tone: "good",
            onClick: () => o("consolidations", a.id),
          }),
          l &&
            s.shippingDate &&
            t.push({
              at: s.shippingDate,
              title: `Related order ${f(l.id, "order")}`,
              subtitle: l.description,
              tone: "good",
              onClick: () => o("orders", l.id),
            }));
        for (const i of h)
          t.push({
            at: i.date,
            title: `${i.type} ${i.amount >= 0 ? "+" : ""}${i.amount.toLocaleString()}`,
            subtitle: i.description,
            tone: i.amount >= 0 ? "good" : "warn",
            onClick: () => {
              try {
                localStorage.setItem(
                  "bundleist_nav_intent",
                  JSON.stringify({ page: "payments", transactionId: i.id }),
                );
              } catch {}
              o("payments");
            },
          });
        return t
          .filter((i) => !Number.isNaN(new Date(i.at).getTime()))
          .sort((i, c) => new Date(c.at).getTime() - new Date(i.at).getTime());
      }, [s, h, o]);
    (r.useEffect(() => {
      if (n && Z) {
        j ? K && j !== n && y(n) : y(n);
        return;
      }
      if (m.length === 0) {
        y(null);
        return;
      }
      (!j || !m.some((t) => t.id === j)) && y(m[0].id);
    }, [n, Z, K, j, m]),
      r.useEffect(() => {
        n && (z(""), O("all"));
      }, [n]));
    const xe = (t) => {
        if (!t) return "N/A";
        const a = V.find((l) => l.id === t);
        return a ? a.companyName : "Unknown";
      },
      me = (t) => {
        if (!t || t.length === 0) return "N/A";
        const a = t.map((l) => {
          var i;
          return (
            ((i = V.find((c) => c.id === l)) == null
              ? void 0
              : i.companyName) || "Unknown"
          );
        });
        return a.length > 2
          ? `${a.slice(0, 2).join(", ")} & ${a.length - 2} more`
          : a.join(", ");
      },
      shipmentPrimaryLabel = (t) => `Shipment ${f(t.id, "shipment")}`,
      shipmentSecondaryLabel = (t) => {
        const a = C(t),
          l = T(t);
        return a
          ? `Consolidation ${f(a.id, "consolidation")}`
          : l
            ? `Order ${f(l.id, "order")}`
            : t.description || "";
      };
    function C(t) {
      if (t.type !== "consolidation") return null;
      const a = t.relatedId || t.consolidationId;
      if (!a) return null;
      const l = W.find((i) => i.id === a);
      return l
        ? { name: l.name, id: l.id }
        : { name: f(a, "consolidation"), id: a };
    }
    function T(t) {
      if (t.type !== "individual") return null;
      const a = t.relatedId || t.orderId;
      if (!a) return null;
      const l = J.find((i) => i.id === a);
      return l
        ? { description: l.description, id: l.id }
        : { description: f(a, "order"), id: a };
    }
    const N = (t) => {
        var i;
        if (t.type !== "consolidation") return [];
        const a = t.relatedId || t.consolidationId,
          l = W.find((c) => c.id === a);
        if (!((i = l == null ? void 0 : l.orderIds) != null && i.length))
          return [];
        const c = new Map(J.map((_) => [_.id, _]));
        return l.orderIds.map((_) => c.get(_)).filter(Boolean);
      },
      De = r.useMemo(() => {
        if (!s) return [];
        const t = [{ label: "Shipments", onClick: () => o("shipments") }];
        t.push({ label: f(s.id, "shipment"), title: s.id });
        const a = C(s),
          l = T(s);
        return (
          a
            ? t.push({
                label: f(a.id, "consolidation"),
                title: a.id,
                onClick: () => o("consolidations", a.id),
              })
            : l &&
              t.push({
                label: f(l.id, "order"),
                title: l.id,
                onClick: () => o("orders", l.id),
              }),
          t
        );
      }, [
        s == null ? void 0 : s.id,
        s == null ? void 0 : s.type,
        s == null ? void 0 : s.relatedId,
        s == null ? void 0 : s.consolidationId,
        s == null ? void 0 : s.orderId,
        o,
      ]),
      B = r.useMemo(() => {
        if (!s)
          return {
            orders: [],
            consolidations: [],
            shipments: [],
            ledger: { net: 0, summary: [] },
          };
        const t = [],
          a = [],
          l = [
            {
              id: s.id,
              label: f(s.id, "shipment"),
              subtitle: `${s.type} (${String(s.status)})`,
            },
          ],
          i = C(s),
          c = T(s);
        if (i) {
          a.push({
            id: i.id,
            label: f(i.id, "consolidation"),
            subtitle: i.name,
            onClick: () => o("consolidations", i.id),
          });
          for (const _ of N(s))
            t.push({
              id: _.id,
              label: f(_.id, "order"),
              subtitle: _.description,
              onClick: () => o("orders", _.id),
            });
        } else
          c &&
            t.push({
              id: c.id,
              label: f(c.id, "order"),
              subtitle: c.description,
              onClick: () => o("orders", c.id),
            });
        const Se = [
          { label: "Tx count", value: String(h.length) },
          { label: "Net", value: `${k >= 0 ? "+" : ""}${k.toLocaleString()}` },
          { label: "Carrier", value: s.carrier || "N/A" },
          {
            label: "ETA",
            value: s.estimatedDelivery
              ? new Date(s.estimatedDelivery).toLocaleDateString()
              : "Not set",
          },
        ];
        return {
          orders: t,
          consolidations: a,
          shipments: l,
          ledger: {
            net: k,
            summary: Se,
            onViewPayments: () => {
              try {
                localStorage.setItem(
                  "bundleist_nav_intent",
                  JSON.stringify({ page: "payments", relatedShipmentId: s.id }),
                );
              } catch {}
              o("payments");
            },
          },
        };
      }, [
        s == null ? void 0 : s.id,
        s == null ? void 0 : s.type,
        s == null ? void 0 : s.relatedId,
        s == null ? void 0 : s.consolidationId,
        s == null ? void 0 : s.orderId,
        s == null ? void 0 : s.status,
        s == null ? void 0 : s.carrier,
        s == null ? void 0 : s.estimatedDelivery,
        h,
        k,
        o,
        W,
        J,
      ]),
      ue = (t) => {
        (te(t), q(!0));
      },
      pe = async (t) => {
        x && (je(x.id, t), q(!1), te(null));
      },
      fe = (t) =>
        t.type === "consolidation"
          ? ve(t.status).length > 0
          : ge(t.status).length > 0;
    return (
      r.useEffect(() => {
        g(1);
      }, [R, u, S, I, b]),
      r.useEffect(() => {
        if (!n || v.length === 0) return;
        const a = [...v]
          .sort(
            (i, c) =>
              new Date(c.shippingDate).getTime() -
              new Date(i.shippingDate).getTime(),
          )
          .findIndex((i) => i.id === n);
        if (a === -1) return;
        y(n);
        const l = Math.floor(a / F) + 1;
        l !== p && g(l);
      }, [n, v, p]),
      r.useEffect(() => {
        (async () => {
          (le(!0), re(null));
          try {
            const a = await Te.fetchPage({
                page: p,
                pageSize: F,
                currentCustomerId: R,
                isAdmin: u,
                query: S,
                type: I,
                customerFilterId: u ? b : null,
              }),
              l = a.totalCount ?? 0,
              i = Math.max(1, Math.ceil(l / F));
            if (l > 0 && a.shipments.length === 0 && p > i) {
              (ae(l), g(i));
              return;
            }
            (se(a.shipments), ae(l));
          } catch (a) {
            const l =
              a instanceof Error ? a.message : "Failed to load shipments";
            re(l);
          } finally {
            le(!1);
          }
        })();
      }, [p, R, u, S, I, b]),
      r.useEffect(() => {
        if (!v || v.length === 0 || Q.length === 0) return;
        const t = new Map(v.map((a) => [a.id, a]));
        se((a) => a.map((l) => t.get(l.id) ?? l));
      }, [v, Q.length]),
      r.useEffect(() => {
        if (!n || D || U.length === 0 || !U.some((l) => l.id === n)) return;
        const a =
          document.getElementById(`shipment-row-${n}`) ||
          document.getElementById(`shipment-card-${n}`);
        if (a) {
          (a.scrollIntoView({ behavior: "smooth", block: "center" }),
            de(n),
            $ == null || $());
          const l = setTimeout(() => de(null), 2500);
          return () => clearTimeout(l);
        }
      }, [n, D, U, $]),
      r.useEffect(() => {
        p > w && g(w);
      }, [p, w]),
      e.jsx("div", {
        className: "ui-page",
        children: e.jsxs("div", {
          className: "px-4 sm:px-6 lg:px-8 py-6 space-y-6",
          children: [
            e.jsx(Le, {
              title: "Shipments",
              subtitle: u
                ? "Track and update shipment status across all customers."
                : "Track your shipments and delivery progress.",
              icon: e.jsx(he, { className: "h-5 w-5" }),
            }),
            e.jsxs("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-3",
              children: [
                e.jsxs("div", {
                  className:
                    "rounded-xl border border-slate-200/70 bg-white px-4 py-3",
                  children: [
                    e.jsx("div", { className: "ui-kicker", children: "Shown" }),
                    e.jsx("div", {
                      className: "text-xl font-extrabold text-slate-900",
                      children: m.length,
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className:
                    "rounded-xl border border-blue-200 bg-blue-50 px-4 py-3",
                  children: [
                    e.jsx("div", {
                      className: "ui-kicker text-blue-700",
                      children: "In Transit",
                    }),
                    e.jsx("div", {
                      className: "text-xl font-extrabold text-blue-900",
                      children: Ne,
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className:
                    "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3",
                  children: [
                    e.jsx("div", {
                      className: "ui-kicker text-emerald-700",
                      children: "Delivered",
                    }),
                    e.jsx("div", {
                      className: "text-xl font-extrabold text-emerald-900",
                      children: we,
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className:
                    "rounded-xl border border-orange-200 bg-orange-50 px-4 py-3",
                  children: [
                    e.jsx("div", {
                      className: "ui-kicker text-orange-700",
                      children: "Missing Tracking",
                    }),
                    e.jsx("div", {
                      className: "text-xl font-extrabold text-orange-900",
                      children: ke,
                    }),
                  ],
                }),
              ],
            }),
            e.jsx("div", {
              className: "ui-surface overflow-hidden",
              children: e.jsxs("div", {
                className: "ui-card-pad",
                children: [
                  e.jsxs("div", {
                    className:
                      "mb-5 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between",
                    children: [
                      e.jsxs("div", {
                        className: "relative flex-1 max-w-xl",
                        children: [
                          e.jsx("svg", {
                            className:
                              "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: e.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                            }),
                          }),
                          e.jsx("input", {
                            value: S,
                            onChange: (t) => z(t.target.value),
                            className: "ui-field ui-field--sm pl-10 pr-3",
                            placeholder: "Search shipments...",
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "flex flex-col sm:flex-row gap-2",
                        children: [
                          e.jsxs("select", {
                            value: I,
                            onChange: (t) => O(t.target.value),
                            className: "ui-field ui-field--sm sm:w-56",
                            title: "Filter by type",
                            children: [
                              e.jsx("option", {
                                value: "all",
                                children: "All types",
                              }),
                              e.jsx("option", {
                                value: "individual",
                                children: "Individual",
                              }),
                              e.jsx("option", {
                                value: "consolidation",
                                children: "Consolidation",
                              }),
                            ],
                          }),
                          u &&
                            e.jsxs("select", {
                              value: b,
                              onChange: (t) => Y(t.target.value),
                              className: "ui-field ui-field--sm sm:w-64",
                              title: "Filter by customer",
                              children: [
                                e.jsx("option", {
                                  value: "all",
                                  children: "All customers",
                                }),
                                V.map((t) =>
                                  e.jsx(
                                    "option",
                                    { value: t.id, children: t.companyName },
                                    t.id,
                                  ),
                                ),
                              ],
                            }),
                        ],
                      }),
                      e.jsxs("div", {
                        className:
                          "px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700",
                        children: [
                          "Total records: ",
                          e.jsx("span", {
                            className: "font-semibold text-slate-900",
                            children: G,
                          }),
                        ],
                      }),
                    ],
                  }),
                  be
                    ? e.jsx("div", {
                        className: "text-center py-12",
                        children: e.jsxs("div", {
                          className:
                            "inline-flex items-center px-4 py-2 font-semibold leading-6 text-gray-600",
                          children: [
                            e.jsxs("svg", {
                              className:
                                "animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600",
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              children: [
                                e.jsx("circle", {
                                  className: "opacity-25",
                                  cx: "12",
                                  cy: "12",
                                  r: "10",
                                  stroke: "currentColor",
                                  strokeWidth: "4",
                                }),
                                e.jsx("path", {
                                  className: "opacity-75",
                                  fill: "currentColor",
                                  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                                }),
                              ],
                            }),
                            "Loading shipments...",
                          ],
                        }),
                      })
                    : ie
                      ? e.jsx("div", {
                          className: "text-center py-12",
                          children: e.jsxs("div", {
                            className:
                              "inline-flex items-center px-4 py-2 font-semibold leading-6 text-red-600",
                            children: [
                              e.jsx("svg", {
                                className: "w-5 h-5 mr-2",
                                fill: "currentColor",
                                viewBox: "0 0 20 20",
                                children: e.jsx("path", {
                                  fillRule: "evenodd",
                                  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
                                  clipRule: "evenodd",
                                }),
                              }),
                              ie,
                            ],
                          }),
                        })
                      : m.length === 0
                        ? e.jsxs("div", {
                            className: "text-center py-12",
                            children: [
                              e.jsx("div", {
                                className:
                                  "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",
                                children: e.jsx(he, {
                                  className: "w-8 h-8 text-gray-400",
                                }),
                              }),
                              e.jsx("p", {
                                className: "text-gray-500 text-lg",
                                children: u
                                  ? "No shipments have been recorded yet."
                                  : "You have no shipments yet.",
                              }),
                            ],
                          })
                        : e.jsxs(e.Fragment, {
                            children: [
                              e.jsxs("div", {
                                className: "hidden lg:grid grid-cols-12 gap-4",
                                children: [
                                  e.jsx("div", {
                                    className: "col-span-5",
                                    children: e.jsxs("div", {
                                      className:
                                        "rounded-2xl border border-slate-200/70 bg-white overflow-hidden",
                                      children: [
                                        e.jsx("div", {
                                          className:
                                            "px-4 py-3 border-b border-slate-200/70 bg-slate-50/60",
                                          children: e.jsxs("div", {
                                            className:
                                              "flex items-center justify-between",
                                            children: [
                                              e.jsx("div", {
                                                className:
                                                  "text-sm font-semibold text-slate-900",
                                                children: "Shipments",
                                              }),
                                              e.jsxs("div", {
                                                className:
                                                  "text-xs text-slate-600",
                                                children: [
                                                  m.length,
                                                  " on this page",
                                                ],
                                              }),
                                            ],
                                          }),
                                        }),
                                        e.jsx("div", {
                                          className:
                                            "max-h-[60vh] overflow-auto divide-y divide-slate-100",
                                          children: m.map((t) => {
                                            const a =
                                                t.type === "consolidation"
                                                  ? M[t.status]
                                                  : P[t.status],
                                              l =
                                                (s == null ? void 0 : s.id) ===
                                                t.id,
                                              i = shipmentSecondaryLabel(t);
                                            return e.jsx(
                                              "button",
                                              {
                                                id: `shipment-row-${t.id}`,
                                                type: "button",
                                                onClick: () => y(t.id),
                                                className: [
                                                  "w-full text-left px-4 py-3 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/10",
                                                  ne === t.id
                                                    ? "bg-yellow-50"
                                                    : l
                                                      ? "bg-emerald-50/50"
                                                      : "hover:bg-slate-50",
                                                ].join(" "),
                                                children: e.jsxs("div", {
                                                  className:
                                                    "flex items-start justify-between gap-3",
                                                  children: [
                                                    e.jsxs("div", {
                                                      className: "min-w-0",
                                                      children: [
                                                        e.jsxs("div", {
                                                          className:
                                                            "flex flex-wrap items-center gap-2 mb-1",
                                                          children: [
                                                            e.jsx("span", {
                                                              className: `px-2 py-0.5 text-[11px] font-semibold rounded-full ${t.type === "consolidation" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"}`,
                                                              children:
                                                                t.type ===
                                                                "consolidation"
                                                                  ? "Consolidated"
                                                                  : "Individual",
                                                            }),
                                                            e.jsx("span", {
                                                              className: `px-2 py-0.5 text-[11px] font-semibold rounded-full ${a || "bg-gray-100 text-gray-800"}`,
                                                              children:
                                                                t.status,
                                                            }),
                                                            t.trackingUrl
                                                              ? e.jsx("span", {
                                                                  className:
                                                                    "px-2 py-0.5 text-[11px] font-semibold rounded-full bg-slate-100 text-slate-700",
                                                                  children:
                                                                    "Tracking",
                                                                })
                                                              : e.jsx("span", {
                                                                  className:
                                                                    "px-2 py-0.5 text-[11px] font-semibold rounded-full bg-orange-50 text-orange-700",
                                                                  children:
                                                                    "No tracking",
                                                                }),
                                                          ],
                                                        }),
                                                        e.jsx("div", {
                                                          className:
                                                            "font-semibold text-slate-900 break-words",
                                                          children:
                                                            shipmentPrimaryLabel(
                                                              t,
                                                            ),
                                                        }),
                                                        e.jsxs("div", {
                                                          className:
                                                            "mt-1 text-xs text-slate-600 flex flex-wrap gap-x-3 gap-y-1",
                                                          children: [
                                                            i &&
                                                              e.jsx("span", {
                                                                className:
                                                                  "text-slate-700",
                                                                children: i,
                                                              }),
                                                            e.jsx("span", {
                                                              children:
                                                                new Date(
                                                                  t.shippingDate,
                                                                ).toLocaleDateString(),
                                                            }),
                                                            e.jsx("span", {
                                                              children:
                                                                t.carrier ||
                                                                "Carrier N/A",
                                                            }),
                                                            t.type ===
                                                              "consolidation" &&
                                                              e.jsxs("span", {
                                                                className:
                                                                  "text-slate-700",
                                                                children: [
                                                                  "Contains: ",
                                                                  N(t).length,
                                                                  " orders",
                                                                ],
                                                              }),
                                                            t.estimatedDelivery
                                                              ? e.jsxs("span", {
                                                                  className:
                                                                    "text-orange-700",
                                                                  children: [
                                                                    "ETA ",
                                                                    new Date(
                                                                      t.estimatedDelivery,
                                                                    ).toLocaleDateString(),
                                                                  ],
                                                                })
                                                              : e.jsx("span", {
                                                                  className:
                                                                    "text-slate-500",
                                                                  children:
                                                                    "ETA not set",
                                                                }),
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                    e.jsx("div", {
                                                      className:
                                                        "shrink-0 pt-1",
                                                      children: e.jsx("svg", {
                                                        className: `w-5 h-5 ${l ? "text-emerald-700" : "text-slate-300"}`,
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: e.jsx(
                                                          "path",
                                                          {
                                                            strokeLinecap:
                                                              "round",
                                                            strokeLinejoin:
                                                              "round",
                                                            strokeWidth: 2,
                                                            d: "M9 5l7 7-7 7",
                                                          },
                                                        ),
                                                      }),
                                                    }),
                                                  ],
                                                }),
                                              },
                                              t.id,
                                            );
                                          }),
                                        }),
                                      ],
                                    }),
                                  }),
                                  e.jsx("div", {
                                    className: "col-span-7",
                                    children: e.jsx("div", {
                                      className:
                                        "rounded-2xl border border-slate-200/70 bg-white overflow-hidden sticky top-24",
                                      children: s
                                        ? e.jsxs("div", {
                                            className: "p-5",
                                            children: [
                                              e.jsx(Me, {
                                                items: De,
                                                className: "mb-3",
                                              }),
                                              e.jsxs("div", {
                                                className:
                                                  "flex items-start justify-between gap-4",
                                                children: [
                                                  e.jsxs("div", {
                                                    className: "min-w-0",
                                                    children: [
                                                      e.jsx("div", {
                                                        className:
                                                          "text-xs text-slate-500 mb-1",
                                                        children: "Shipment",
                                                      }),
                                                      e.jsx("div", {
                                                        className:
                                                          "text-lg font-extrabold tracking-tight text-slate-900 break-words",
                                                        children:
                                                          shipmentPrimaryLabel(
                                                            s,
                                                          ),
                                                      }),
                                                      e.jsx("div", {
                                                        className:
                                                          "mt-1 text-sm text-slate-600",
                                                        children:
                                                          shipmentSecondaryLabel(
                                                            s,
                                                          ),
                                                      }),
                                                      e.jsxs("div", {
                                                        className:
                                                          "mt-2 flex flex-wrap items-center gap-2",
                                                        children: [
                                                          e.jsxs("div", {
                                                            className:
                                                              "flex items-center gap-1 bg-blue-50 px-2 py-1 rounded",
                                                            children: [
                                                              e.jsx("span", {
                                                                className:
                                                                  "text-xs font-medium text-blue-700",
                                                                children: f(
                                                                  s.id,
                                                                  "shipment",
                                                                ),
                                                              }),
                                                              e.jsx(d, {
                                                                onClick: () =>
                                                                  Ie(s.id),
                                                                variant:
                                                                  "ghost",
                                                                size: "icon",
                                                                className:
                                                                  "h-7 w-7 text-blue-700 hover:bg-blue-100/60",
                                                                title:
                                                                  "Copy full ID",
                                                                children: e.jsx(
                                                                  "svg",
                                                                  {
                                                                    className:
                                                                      "w-3 h-3",
                                                                    fill: "none",
                                                                    stroke:
                                                                      "currentColor",
                                                                    viewBox:
                                                                      "0 0 24 24",
                                                                    children:
                                                                      e.jsx(
                                                                        "path",
                                                                        {
                                                                          strokeLinecap:
                                                                            "round",
                                                                          strokeLinejoin:
                                                                            "round",
                                                                          strokeWidth: 2,
                                                                          d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
                                                                        },
                                                                      ),
                                                                  },
                                                                ),
                                                              }),
                                                            ],
                                                          }),
                                                          X &&
                                                            e.jsxs("span", {
                                                              className:
                                                                "px-2 py-1 rounded-full bg-white border border-slate-200/70 text-[11px] font-semibold text-slate-700",
                                                              title:
                                                                X.toLocaleString(),
                                                              children: [
                                                                "Last activity: ",
                                                                Pe(X),
                                                              ],
                                                            }),
                                                        ],
                                                      }),
                                                      e.jsxs("div", {
                                                        className:
                                                          "mt-2 flex flex-wrap items-center gap-2",
                                                        children: [
                                                          e.jsx("span", {
                                                            className: `px-2 py-0.5 text-xs font-semibold rounded-full ${s.type === "consolidation" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"}`,
                                                            children:
                                                              s.type ===
                                                              "consolidation"
                                                                ? "Consolidation shipment"
                                                                : "Individual shipment",
                                                          }),
                                                          e.jsx("span", {
                                                            className: `px-2 py-0.5 text-xs font-semibold rounded-full ${s.type === "consolidation" ? M[s.status] : P[s.status]}`,
                                                            children: s.status,
                                                          }),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                  e.jsxs("div", {
                                                    className:
                                                      "shrink-0 flex gap-2",
                                                    children: [
                                                      e.jsx(d, {
                                                        asChild: !0,
                                                        variant: "outline",
                                                        size: "xs",
                                                        disabled:
                                                          !s.trackingUrl,
                                                        title: s.trackingUrl
                                                          ? "Open tracking"
                                                          : "No tracking URL available",
                                                        children: e.jsx("a", {
                                                          href:
                                                            s.trackingUrl ||
                                                            "#",
                                                          target: "_blank",
                                                          rel: "noopener noreferrer",
                                                          children: "Track",
                                                        }),
                                                      }),
                                                      u &&
                                                        e.jsx(d, {
                                                          variant: "secondary",
                                                          size: "xs",
                                                          onClick: () => ee(s),
                                                          children:
                                                            "Edit Tracking",
                                                        }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className:
                                                  "mt-4 flex items-center justify-between gap-3",
                                                children: [
                                                  e.jsx("div", {
                                                    className:
                                                      "text-xs font-semibold text-slate-600",
                                                    children: "Details",
                                                  }),
                                                  e.jsx(d, {
                                                    type: "button",
                                                    variant: "outline",
                                                    size: "sm",
                                                    className:
                                                      "h-8 px-3 rounded-full",
                                                    onClick: () =>
                                                      oe((t) => !t),
                                                    children: A
                                                      ? "Show less"
                                                      : "Show more",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className:
                                                  "mt-5 grid grid-cols-2 gap-3",
                                                children: [
                                                  e.jsxs("div", {
                                                    className:
                                                      "rounded-xl border border-slate-200/70 bg-slate-50 p-3",
                                                    children: [
                                                      e.jsx("div", {
                                                        className: "ui-kicker",
                                                        children:
                                                          "Shipping date",
                                                      }),
                                                      e.jsx("div", {
                                                        className:
                                                          "font-semibold text-slate-900",
                                                        children: new Date(
                                                          s.shippingDate,
                                                        ).toLocaleDateString(),
                                                      }),
                                                    ],
                                                  }),
                                                  e.jsxs("div", {
                                                    className:
                                                      "rounded-xl border border-slate-200/70 bg-slate-50 p-3",
                                                    children: [
                                                      e.jsx("div", {
                                                        className: "ui-kicker",
                                                        children: "Carrier",
                                                      }),
                                                      e.jsx("div", {
                                                        className:
                                                          "font-semibold text-slate-900",
                                                        children:
                                                          s.carrier || "N/A",
                                                      }),
                                                    ],
                                                  }),
                                                  e.jsxs("div", {
                                                    className:
                                                      "rounded-xl border border-slate-200/70 bg-slate-50 p-3",
                                                    children: [
                                                      e.jsx("div", {
                                                        className: "ui-kicker",
                                                        children:
                                                          "Estimated delivery",
                                                      }),
                                                      e.jsx("div", {
                                                        className:
                                                          "font-semibold text-slate-900",
                                                        children:
                                                          s.estimatedDelivery
                                                            ? new Date(
                                                                s.estimatedDelivery,
                                                              ).toLocaleDateString()
                                                            : "Not set",
                                                      }),
                                                    ],
                                                  }),
                                                  e.jsxs("div", {
                                                    className:
                                                      "rounded-xl border border-slate-200/70 bg-slate-50 p-3",
                                                    children: [
                                                      e.jsx("div", {
                                                        className: "ui-kicker",
                                                        children:
                                                          "Actual delivery",
                                                      }),
                                                      e.jsx("div", {
                                                        className:
                                                          "font-semibold text-slate-900",
                                                        children:
                                                          s.actualDelivery
                                                            ? new Date(
                                                                s.actualDelivery,
                                                              ).toLocaleDateString()
                                                            : "Not delivered",
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              u &&
                                                e.jsxs("div", {
                                                  className:
                                                    "mt-4 rounded-xl border border-slate-200/70 bg-white p-3",
                                                  children: [
                                                    e.jsx("div", {
                                                      className: "ui-kicker",
                                                      children: "Customer",
                                                    }),
                                                    e.jsx("div", {
                                                      className:
                                                        "text-sm text-slate-900 font-semibold",
                                                      children:
                                                        s.customerId === null
                                                          ? me(
                                                              s.involvedCustomerIds,
                                                            )
                                                          : xe(s.customerId),
                                                    }),
                                                  ],
                                                }),
                                              e.jsxs("div", {
                                                className:
                                                  "mt-4 flex flex-wrap gap-2",
                                                children: [
                                                  (() => {
                                                    const t = C(s),
                                                      a = T(s);
                                                    return t
                                                      ? e.jsx(d, {
                                                          variant: "outline",
                                                          onClick: () =>
                                                            o(
                                                              "consolidations",
                                                              t.id,
                                                            ),
                                                          children:
                                                            "Open Consolidation",
                                                        })
                                                      : a
                                                        ? e.jsx(d, {
                                                            variant: "outline",
                                                            onClick: () =>
                                                              o("orders", a.id),
                                                            children:
                                                              "Open Order",
                                                          })
                                                        : null;
                                                  })(),
                                                  e.jsxs(d, {
                                                    variant: "secondary",
                                                    size: "xs",
                                                    onClick: () => {
                                                      try {
                                                        localStorage.setItem(
                                                          "bundleist_nav_intent",
                                                          JSON.stringify({
                                                            page: "payments",
                                                            relatedShipmentId:
                                                              s.id,
                                                          }),
                                                        );
                                                      } catch {}
                                                      o("payments");
                                                    },
                                                    title:
                                                      "Open payments filtered to this shipment",
                                                    children: [
                                                      "Payments (",
                                                      h.length,
                                                      ", ",
                                                      k >= 0 ? "+" : "",
                                                      k.toLocaleString(),
                                                      ")",
                                                    ],
                                                  }),
                                                  u &&
                                                    fe(s) &&
                                                    e.jsx(d, {
                                                      size: "xs",
                                                      onClick: () => ue(s),
                                                      children: "Update Status",
                                                    }),
                                                ],
                                              }),
                                              A
                                                ? e.jsxs(e.Fragment, {
                                                    children: [
                                                      s.type ===
                                                        "consolidation" &&
                                                        e.jsxs("div", {
                                                          className:
                                                            "mt-4 rounded-xl border border-slate-200/70 bg-white p-3",
                                                          children: [
                                                            e.jsxs("div", {
                                                              className:
                                                                "flex items-center justify-between gap-3",
                                                              children: [
                                                                e.jsxs("div", {
                                                                  children: [
                                                                    e.jsx(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "ui-kicker",
                                                                        children:
                                                                          "Contents",
                                                                      },
                                                                    ),
                                                                    e.jsxs(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "text-sm text-slate-700",
                                                                        children:
                                                                          [
                                                                            "Orders inside: ",
                                                                            e.jsx(
                                                                              "span",
                                                                              {
                                                                                className:
                                                                                  "font-semibold text-slate-900",
                                                                                children:
                                                                                  N(
                                                                                    s,
                                                                                  )
                                                                                    .length,
                                                                              },
                                                                            ),
                                                                          ],
                                                                      },
                                                                    ),
                                                                  ],
                                                                }),
                                                                (() => {
                                                                  const t =
                                                                    C(s);
                                                                  return t
                                                                    ? e.jsx(d, {
                                                                        variant:
                                                                          "outline",
                                                                        size: "sm",
                                                                        onClick:
                                                                          () =>
                                                                            o(
                                                                              "consolidations",
                                                                              t.id,
                                                                            ),
                                                                        children:
                                                                          "View Consolidation",
                                                                      })
                                                                    : null;
                                                                })(),
                                                              ],
                                                            }),
                                                            e.jsxs("div", {
                                                              className:
                                                                "mt-3 flex flex-wrap gap-2",
                                                              children: [
                                                                N(s)
                                                                  .slice(0, 10)
                                                                  .map((t) =>
                                                                    e.jsx(
                                                                      d,
                                                                      {
                                                                        type: "button",
                                                                        variant:
                                                                          "secondary",
                                                                        size: "sm",
                                                                        className:
                                                                          "h-8 px-3 rounded-full",
                                                                        onClick:
                                                                          () =>
                                                                            o(
                                                                              "orders",
                                                                              t.id,
                                                                            ),
                                                                        title:
                                                                          t.description,
                                                                        children:
                                                                          f(
                                                                            t.id,
                                                                            "order",
                                                                          ),
                                                                      },
                                                                      t.id,
                                                                    ),
                                                                  ),
                                                                N(s).length >
                                                                  10 &&
                                                                  e.jsxs(
                                                                    "span",
                                                                    {
                                                                      className:
                                                                        "px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-50 border border-slate-200/70 text-slate-600",
                                                                      children:
                                                                        [
                                                                          "+",
                                                                          N(s)
                                                                            .length -
                                                                            10,
                                                                          " more",
                                                                        ],
                                                                    },
                                                                  ),
                                                              ],
                                                            }),
                                                          ],
                                                        }),
                                                      e.jsxs("div", {
                                                        className:
                                                          "mt-4 rounded-xl border border-slate-200/70 bg-white p-3",
                                                        children: [
                                                          e.jsx("div", {
                                                            className:
                                                              "ui-kicker",
                                                            children:
                                                              "Activity",
                                                          }),
                                                          e.jsx("div", {
                                                            className: "mt-2",
                                                            children: e.jsx(
                                                              Ee,
                                                              {
                                                                items: Ce.slice(
                                                                  0,
                                                                  12,
                                                                ),
                                                                emptyText:
                                                                  "No activity for this shipment yet.",
                                                              },
                                                            ),
                                                          }),
                                                        ],
                                                      }),
                                                      e.jsxs("div", {
                                                        className:
                                                          "mt-4 rounded-xl border border-slate-200/70 bg-white p-3",
                                                        children: [
                                                          e.jsx("div", {
                                                            className:
                                                              "ui-kicker",
                                                            children: "Related",
                                                          }),
                                                          e.jsx("div", {
                                                            className: "mt-2",
                                                            children: e.jsx(
                                                              ze,
                                                              {
                                                                orders:
                                                                  B.orders,
                                                                consolidations:
                                                                  B.consolidations,
                                                                shipments:
                                                                  B.shipments,
                                                                ledger:
                                                                  B.ledger,
                                                              },
                                                            ),
                                                          }),
                                                        ],
                                                      }),
                                                      e.jsx($e, {
                                                        entityType: "shipment",
                                                        entityId: s.id,
                                                        className: "mt-4",
                                                      }),
                                                    ],
                                                  })
                                                : e.jsx("div", {
                                                    className:
                                                      "mt-4 rounded-xl border border-slate-200/70 bg-slate-50 p-3 text-sm text-slate-700",
                                                    children:
                                                      'Heavy panels (contents, activity, related, audit) are hidden for easier scanning. Click "Show more" to expand.',
                                                  }),
                                            ],
                                          })
                                        : ce
                                          ? e.jsxs("div", {
                                              className: "p-8",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "text-sm font-semibold text-slate-900",
                                                  children: "Loading shipment…",
                                                }),
                                                e.jsx("div", {
                                                  className:
                                                    "mt-1 text-sm text-slate-600",
                                                  children:
                                                    "Jumping to the shipment linked to your consolidation.",
                                                }),
                                              ],
                                            })
                                          : e.jsx("div", {
                                              className:
                                                "p-8 text-center text-slate-600",
                                              children:
                                                "Select a shipment to view details.",
                                            }),
                                    }),
                                  }),
                                ],
                              }),
                              e.jsx("div", {
                                className: "lg:hidden space-y-4",
                                children: m.map((t) => {
                                  const a =
                                    t.type === "consolidation"
                                      ? M[t.status]
                                      : P[t.status];
                                  return e.jsxs(
                                    "div",
                                    {
                                      id: `shipment-card-${t.id}`,
                                      className: `${ne === t.id ? "bg-yellow-50 border-yellow-300 ring-2 ring-yellow-300" : "bg-white border-gray-200"} rounded-xl border shadow-sm hover:shadow-md transition-shadow p-4`,
                                      children: [
                                        e.jsxs("div", {
                                          className:
                                            "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3",
                                          children: [
                                            e.jsxs("div", {
                                              className:
                                                "flex items-center space-x-2 mb-2 sm:mb-0",
                                              children: [
                                                e.jsx("span", {
                                                  className: `px-2 py-1 text-xs font-semibold rounded-full ${t.type === "consolidation" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"}`,
                                                  children:
                                                    t.type === "consolidation"
                                                      ? "Consolidated"
                                                      : "Individual",
                                                }),
                                                e.jsx("span", {
                                                  className: `px-2 py-1 text-xs font-semibold rounded-full ${a || "bg-gray-100 text-gray-800"}`,
                                                  children: t.status,
                                                }),
                                              ],
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-sm text-gray-500",
                                              children: new Date(
                                                t.shippingDate,
                                              ).toLocaleDateString(),
                                            }),
                                          ],
                                        }),
                                        e.jsxs("div", {
                                          className: "mb-3",
                                          children: [
                                            e.jsx("h3", {
                                              className:
                                                "text-sm font-medium text-gray-900 leading-5",
                                              children:
                                                shipmentPrimaryLabel(t),
                                            }),
                                            shipmentSecondaryLabel(t) &&
                                              e.jsx("div", {
                                                className:
                                                  "mt-1 text-xs text-gray-600",
                                                children:
                                                  shipmentSecondaryLabel(t),
                                              }),
                                            t.type === "consolidation" &&
                                              e.jsxs("div", {
                                                className:
                                                  "mt-1 text-xs font-semibold text-slate-700",
                                                children: [
                                                  "Orders inside: ",
                                                  N(t).length,
                                                ],
                                              }),
                                          ],
                                        }),
                                        e.jsxs("div", {
                                          className: "mb-3",
                                          children: [
                                            e.jsx("div", {
                                              className:
                                                "text-xs text-gray-500 mb-1",
                                              children: "Related To",
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-sm text-gray-700",
                                              children: (() => {
                                                const l = C(t),
                                                  i = T(t);
                                                return l
                                                  ? e.jsxs(d, {
                                                      variant: "outline",
                                                      size: "sm",
                                                      onClick: () =>
                                                        o(
                                                          "consolidations",
                                                          l.id,
                                                        ),
                                                      className:
                                                        "h-8 px-3 rounded-full",
                                                      children: [
                                                        "Consolidation: ",
                                                        l.name,
                                                      ],
                                                    })
                                                  : i
                                                    ? e.jsxs(d, {
                                                        variant: "outline",
                                                        size: "sm",
                                                        onClick: () =>
                                                          o("orders", i.id),
                                                        className:
                                                          "h-8 px-3 rounded-full",
                                                        children: [
                                                          "Order: ",
                                                          i.description.length >
                                                          25
                                                            ? `${i.description.substring(0, 25)}...`
                                                            : i.description,
                                                        ],
                                                      })
                                                    : e.jsx("span", {
                                                        className:
                                                          "px-3 py-1 text-xs text-gray-400 bg-gray-50 rounded-lg",
                                                        children: "No relation",
                                                      });
                                              })(),
                                            }),
                                          ],
                                        }),
                                        u &&
                                          e.jsxs("div", {
                                            className:
                                              "mb-3 p-2 bg-gray-50 rounded-lg",
                                            children: [
                                              e.jsx("div", {
                                                className:
                                                  "text-xs text-gray-500 mb-1",
                                                children: "Customer",
                                              }),
                                              e.jsx("div", {
                                                className:
                                                  "text-sm text-gray-700",
                                                children:
                                                  t.customerId === null
                                                    ? me(t.involvedCustomerIds)
                                                    : xe(t.customerId),
                                              }),
                                            ],
                                          }),
                                        e.jsxs("div", {
                                          className: "mb-4",
                                          children: [
                                            e.jsx("div", {
                                              className:
                                                "text-xs text-gray-500 mb-1",
                                              children: "Carrier",
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-sm text-gray-700",
                                              children: t.carrier || "N/A",
                                            }),
                                          ],
                                        }),
                                        e.jsxs("div", {
                                          className: "mb-4",
                                          children: [
                                            e.jsx("div", {
                                              className:
                                                "text-xs text-gray-500 mb-1",
                                              children: "Estimated Delivery",
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-sm text-gray-700",
                                              children: t.estimatedDelivery
                                                ? e.jsx("span", {
                                                    className:
                                                      "text-orange-600 font-medium",
                                                    children: new Date(
                                                      t.estimatedDelivery,
                                                    ).toLocaleDateString(),
                                                  })
                                                : e.jsx("span", {
                                                    className: "text-gray-400",
                                                    children: "Not Set",
                                                  }),
                                            }),
                                          ],
                                        }),
                                        e.jsxs("div", {
                                          className: "mb-4",
                                          children: [
                                            e.jsx("div", {
                                              className:
                                                "text-xs text-gray-500 mb-1",
                                              children: "Actual Delivery",
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-sm text-gray-700",
                                              children: t.actualDelivery
                                                ? e.jsx("span", {
                                                    className:
                                                      "text-green-600 font-medium",
                                                    children: new Date(
                                                      t.actualDelivery,
                                                    ).toLocaleDateString(),
                                                  })
                                                : e.jsx("span", {
                                                    className: "text-gray-400",
                                                    children: "Not Delivered",
                                                  }),
                                            }),
                                          ],
                                        }),
                                        e.jsxs("div", {
                                          className:
                                            "flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-100",
                                          children: [
                                            e.jsx("div", {
                                              className: "flex-1",
                                              children: t.trackingUrl
                                                ? e.jsx(d, {
                                                    asChild: !0,
                                                    variant: "outline",
                                                    size: "xs",
                                                    className: "w-full",
                                                    children: e.jsx("a", {
                                                      href: t.trackingUrl,
                                                      target: "_blank",
                                                      rel: "noopener noreferrer",
                                                      children:
                                                        "Track Shipment",
                                                    }),
                                                  })
                                                : e.jsx(d, {
                                                    variant: "outline",
                                                    size: "xs",
                                                    className: "w-full",
                                                    disabled: !0,
                                                    children:
                                                      "No Tracking Available",
                                                  }),
                                            }),
                                            u &&
                                              e.jsxs("div", {
                                                className: "flex gap-2",
                                                children: [
                                                  fe(t) &&
                                                    e.jsx(d, {
                                                      size: "xs",
                                                      onClick: () => ue(t),
                                                      className:
                                                        "flex-1 sm:flex-none",
                                                      title: "Update Status",
                                                      children: "Update Status",
                                                    }),
                                                  e.jsx(d, {
                                                    size: "xs",
                                                    variant: "secondary",
                                                    onClick: () => ee(t),
                                                    className:
                                                      "flex-1 sm:flex-none",
                                                    children: "Edit Tracking",
                                                  }),
                                                ],
                                              }),
                                          ],
                                        }),
                                      ],
                                    },
                                    t.id,
                                  );
                                }),
                              }),
                              e.jsxs("div", {
                                className:
                                  "mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-gray-100 pt-4",
                                children: [
                                  e.jsxs("p", {
                                    className: "text-sm text-gray-600",
                                    children: [
                                      "Showing page ",
                                      p,
                                      " of ",
                                      w,
                                      " (",
                                      G,
                                      " total)",
                                    ],
                                  }),
                                  e.jsxs("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      e.jsx(d, {
                                        type: "button",
                                        variant: "outline",
                                        onClick: () =>
                                          g((t) => Math.max(1, t - 1)),
                                        disabled: p <= 1 || D,
                                        children: "Previous",
                                      }),
                                      e.jsx(d, {
                                        type: "button",
                                        variant: "outline",
                                        onClick: () =>
                                          g((t) => Math.min(w, t + 1)),
                                        disabled: p >= w || D,
                                        children: "Next",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                ],
              }),
            }),
            ye &&
              x &&
              e.jsx("div", {
                className:
                  "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
                children: e.jsxs("div", {
                  className:
                    "bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto",
                  children: [
                    e.jsx("h3", {
                      className: "text-lg font-semibold text-gray-900 mb-2",
                      children: "Update Shipment Status",
                    }),
                    e.jsxs("div", {
                      className: "mb-4",
                      children: [
                        e.jsx("p", {
                          className: "text-sm text-gray-600 mb-2",
                          children: e.jsx("span", {
                            className: "font-medium",
                            children: shipmentPrimaryLabel(x),
                          }),
                        }),
                        e.jsxs("p", {
                          className: "text-sm text-gray-600 mb-2",
                          children: [
                            "Current status: ",
                            e.jsx("span", {
                              className: `inline-flex px-2 py-1 text-xs font-medium rounded-full ${x.type === "consolidation" ? M[x.status] : P[x.status]}`,
                              children: x.status,
                            }),
                          ],
                        }),
                        e.jsxs("p", {
                          className: "text-xs text-gray-500",
                          children: [
                            "Type: ",
                            x.type === "consolidation"
                              ? "Consolidation Shipment"
                              : "Individual Order Shipment",
                          ],
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "space-y-3 mb-6",
                      children: [
                        x.type === "consolidation" &&
                          ve(x.status).map((t) =>
                            e.jsx(
                              d,
                              {
                                onClick: () => pe(t),
                                variant: "outline",
                                className: `w-full justify-start h-auto px-4 py-3 text-left border-2 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50 ${M[t]}`,
                                children: e.jsxs("div", {
                                  className:
                                    "flex items-center justify-between",
                                  children: [
                                    e.jsxs("div", {
                                      className: "flex-1",
                                      children: [
                                        e.jsxs("div", {
                                          className: "font-medium text-sm",
                                          children: ["Move to: ", t],
                                        }),
                                        e.jsx("div", {
                                          className: "text-xs opacity-75 mt-1",
                                          children:
                                            "Continue shipment progress",
                                        }),
                                      ],
                                    }),
                                    e.jsx("div", {
                                      className: "ml-3",
                                      children: e.jsx("svg", {
                                        className: "w-5 h-5 opacity-60",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: e.jsx("path", {
                                          strokeLinecap: "round",
                                          strokeLinejoin: "round",
                                          strokeWidth: "2",
                                          d: "M9 5l7 7-7 7",
                                        }),
                                      }),
                                    }),
                                  ],
                                }),
                              },
                              t,
                            ),
                          ),
                        x.type === "individual" &&
                          ge(x.status).map((t) =>
                            e.jsx(
                              d,
                              {
                                onClick: () => pe(t),
                                variant: "outline",
                                className: `w-full justify-start h-auto px-4 py-3 text-left border-2 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50 ${P[t]}`,
                                children: e.jsxs("div", {
                                  className:
                                    "flex items-center justify-between",
                                  children: [
                                    e.jsxs("div", {
                                      className: "flex-1",
                                      children: [
                                        e.jsxs("div", {
                                          className: "font-medium text-sm",
                                          children: ["Move to: ", t],
                                        }),
                                        e.jsx("div", {
                                          className: "text-xs opacity-75 mt-1",
                                          children:
                                            "Update order shipment status",
                                        }),
                                      ],
                                    }),
                                    e.jsx("div", {
                                      className: "ml-3",
                                      children: e.jsx("svg", {
                                        className: "w-5 h-5 opacity-60",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: e.jsx("path", {
                                          strokeLinecap: "round",
                                          strokeLinejoin: "round",
                                          strokeWidth: "2",
                                          d: "M9 5l7 7-7 7",
                                        }),
                                      }),
                                    }),
                                  ],
                                }),
                              },
                              t,
                            ),
                          ),
                        ((x.type === "consolidation" &&
                          ve(x.status).length === 0) ||
                          (x.type === "individual" &&
                            ge(x.status).length === 0)) &&
                          e.jsxs("div", {
                            className: "text-center py-8 text-gray-500",
                            children: [
                              e.jsx("div", {
                                className:
                                  "mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3",
                                children: e.jsxs("svg", {
                                  className: "w-6 h-6 text-gray-400",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  children: [
                                    e.jsx("path", {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: 2,
                                      d: "M12 11c0 1.657-1.343 3-3 3S6 12.657 6 11s1.343-3 3-3 3 1.343 3 3z",
                                    }),
                                    e.jsx("path", {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: 2,
                                      d: "M18 11a6 6 0 00-12 0v4a2 2 0 002 2h8a2 2 0 002-2v-4z",
                                    }),
                                  ],
                                }),
                              }),
                              e.jsx("div", {
                                className: "text-sm font-semibold",
                                children: "No status changes available",
                              }),
                              e.jsx("div", {
                                className: "text-xs mt-1",
                                children: "This shipment is in a final state",
                              }),
                            ],
                          }),
                      ],
                    }),
                    e.jsx(d, {
                      onClick: () => q(!1),
                      variant: "secondary",
                      className: "w-full",
                      children: "Cancel",
                    }),
                  ],
                }),
              }),
          ],
        }),
      })
    );
  };
export { Ze as default };
