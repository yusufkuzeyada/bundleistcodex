import { r as i, j as e } from "./radix.js";
import { e as ht, f as m, c as p, T as gt, p as Qe, x as ft } from "./app.js";
import {
  F as be,
  a as ye,
  b as Y,
  c as h,
  d as ve,
} from "./formerrorboundary.js";
import { P as bt } from "./pageheader.js";
import { D as yt } from "./datafreshnesspill.js";
import { B as vt, A as jt } from "./audittrailpanel.js";
import { R as Nt } from "./relatedpanel.js";
import "./react.js";
import "./supabase.js";
import "./icons.js";
const V = 20,
  Lt = ({
    transactions: J,
    allTransactions: I,
    allCustomers: o,
    addIncomingPayment: Ge,
    addRefundPayout: Ke,
    currentCustomerId: R,
    calculateCustomerBalance: v,
    addMiscellaneousCost: Ze,
    allOrders: je,
    allConsolidations: g,
    isAdmin: l,
    onNavigate: x = () => {},
  }) => {
    const [Xe, Ne] = i.useState(null),
      [et, tt] = i.useState(0),
      [j, st] = i.useState(""),
      [Se, we] = i.useState(""),
      [U, Ce] = i.useState(""),
      [Q, Ie] = i.useState(null),
      [rt, L] = i.useState(!1),
      [G, ke] = i.useState(!1),
      [k, it] = i.useState(""),
      [Me, De] = i.useState(""),
      [K, Pe] = i.useState(""),
      [Z, Fe] = i.useState(null),
      [at, B] = i.useState(!1),
      [X, Oe] = i.useState(!1),
      { showError: N } = ht(),
      [c, q] = i.useState(""),
      [Re, Le] = i.useState(""),
      [ee, Ee] = i.useState(""),
      [te, se] = i.useState(""),
      [u, $e] = i.useState(""),
      [re, _e] = i.useState(null),
      [nt, E] = i.useState(!1),
      [ie, A] = i.useState(!1),
      [Te, ot] = i.useState(!0),
      [b, f] = i.useState(1),
      [ae, Be] = i.useState([]),
      [qe, Ae] = i.useState(0),
      [ne, oe] = i.useState(!1),
      [He, le] = i.useState(null),
      [S, ze] = i.useState(() => {
        try {
          return localStorage.getItem("bundleist_payments_lens") === "entity"
            ? "entity"
            : "customer";
        } catch {
          return "customer";
        }
      }),
      [H, We] = i.useState("order"),
      [de, ce] = i.useState("");
    i.useEffect(() => {
      try {
        localStorage.setItem("bundleist_payments_lens", S);
      } catch {}
    }, [S]);
    const [$, w] = i.useState(""),
      [M, ue] = i.useState("all"),
      [D, P] = i.useState(""),
      [y, _] = i.useState(null),
      [lt, me] = i.useState(!1);
    (i.useEffect(() => {
      try {
        const t = localStorage.getItem("bundleist_payments_state");
        if (!t) return;
        const r = JSON.parse(t);
        (r && typeof r.query == "string" && w(r.query),
          r && typeof r.typeFilter == "string" && ue(r.typeFilter),
          r &&
            typeof r.adminCustomerFilter == "string" &&
            P(r.adminCustomerFilter),
          r &&
            typeof r.currentPage == "number" &&
            f(Math.max(1, r.currentPage)),
          r && typeof r.selectedTxId == "string" && _(r.selectedTxId));
      } catch {}
    }, []),
      i.useEffect(() => {
        try {
          localStorage.setItem(
            "bundleist_payments_state",
            JSON.stringify({
              query: $,
              typeFilter: M,
              adminCustomerFilter: D,
              currentPage: b,
              selectedTxId: y,
            }),
          );
        } catch {}
      }, [$, M, D, b, y]),
      i.useEffect(() => {
        try {
          const t = localStorage.getItem("bundleist_nav_intent");
          if (!t) return;
          const r = JSON.parse(t);
          if (!r || r.page !== "payments") return;
          (typeof r.adminCustomerFilter == "string"
            ? P(r.adminCustomerFilter)
            : typeof r.customerId == "string" && P(r.customerId),
            typeof r.transactionId == "string"
              ? (_(r.transactionId), w(r.transactionId))
              : typeof r.relatedOrderId == "string"
                ? w(r.relatedOrderId)
                : typeof r.relatedConsolidationId == "string"
                  ? w(r.relatedConsolidationId)
                  : typeof r.relatedShipmentId == "string" &&
                    w(r.relatedShipmentId),
            localStorage.removeItem("bundleist_nav_intent"),
            f(1));
        } catch {}
      }, []));
    const [Ye, Ve] = i.useState([]),
      [Je, Ue] = i.useState([]),
      [St, xe] = i.useState(!1);
    (i.useEffect(() => {
      f(1);
    }, [l, R, D]),
      i.useEffect(() => {
        if (j && j !== "SYSTEM_COST") {
          const t = v(j, I);
          Ie(t);
        } else Ie(null);
      }, [j, I, v]),
      i.useEffect(() => {
        if (k) {
          const t = v(k, I);
          Fe(t);
        } else Fe(null);
      }, [k, I, v]),
      i.useEffect(() => {
        const t = g.find((r) => r.id === u);
        if (
          (t
            ? t.isMixed
              ? (xe(!1), c === "" || t.involvedCustomerIds.includes(c))
              : (q(t.customerId || ""), xe(!0))
            : (xe(!1), c === "SYSTEM_COST" && q("")),
          c && c !== "SYSTEM_COST")
        ) {
          const r = v(c, I);
          _e(r);
          let a = je.filter((n) => n.customerId === c);
          if (u) {
            const n = g.find((O) => O.id === u);
            n && (a = a.filter((O) => n.orderIds.includes(O.id)));
          }
          (Ve(a),
            Ue(
              g.filter(
                (n) =>
                  n.customerId === c ||
                  (n.isMixed && n.involvedCustomerIds.includes(c)),
              ),
            ));
        } else (_e(null), Ve([]), Ue(g.filter((r) => r.isMixed)));
        (Ye.find((r) => r.id === te) || se(""),
          Je.find((r) => r.id === u) ||
            c !== "SYSTEM_COST" ||
            g.find((r) => r.id === u && r.isMixed));
      }, [c, u, g, je, I, v]),
      i.useEffect(() => {
        (async () => {
          if (l && S === "entity") {
            const r = de.trim(),
              a = (J || []).filter((d) =>
                r
                  ? H === "order"
                    ? String(d.relatedOrderId || "").includes(r) ||
                      String(d.description || "").includes(r) ||
                      String(d.id).includes(r)
                    : H === "consolidation"
                      ? String(d.relatedConsolidationId || "").includes(r) ||
                        String(d.description || "").includes(r) ||
                        String(d.id).includes(r)
                      : String(d.relatedShipmentId || "").includes(r) ||
                        String(d.description || "").includes(r) ||
                        String(d.id).includes(r)
                  : !0,
              ),
              n = a.length,
              fe = (Math.max(1, b) - 1) * V,
              W = a.slice(fe, fe + V);
            (Be(W), Ae(n), Ne(new Date()), oe(!1), le(null));
            return;
          }
          (oe(!0), le(null));
          try {
            const r = await ft.fetchPage({
              page: b,
              pageSize: V,
              customerId: l ? D || null : R,
              isAdmin: l,
            });
            (Be(r.transactions), Ae(r.totalCount), Ne(new Date()));
          } catch (r) {
            const a =
              r instanceof Error ? r.message : "Failed to load transactions";
            le(a);
          } finally {
            oe(!1);
          }
        })();
      }, [b, l, R, D, et, S, H, de, J]));
    const T = (t) => t.replace(/([A-Z])/g, " $1").trim(),
      F = i.useMemo(() => {
        const t = $.trim().toLowerCase();
        return ae.filter((r) =>
          M !== "all" && r.type !== M
            ? !1
            : t
              ? `${r.id} ${r.description} ${r.type} ${r.customerId ?? ""} ${r.relatedOrderId ?? ""} ${r.relatedConsolidationId ?? ""} ${r.relatedShipmentId ?? ""}`
                  .toLowerCase()
                  .includes(t)
              : !0,
        );
      }, [ae, $, M]),
      s = i.useMemo(
        () =>
          F.length === 0
            ? null
            : (y ? F.find((r) => r.id === y) : null) || F[0],
        [F, y],
      ),
      dt = i.useMemo(() => {
        if (!s) return [];
        const t = [{ label: "Payments", onClick: () => x("payments") }];
        return (
          t.push({ label: m(s.id, "payment"), title: s.id }),
          s.relatedOrderId &&
            t.push({
              label: m(s.relatedOrderId, "order"),
              title: s.relatedOrderId,
              onClick: () => x("orders", s.relatedOrderId),
            }),
          s.relatedConsolidationId &&
            t.push({
              label: m(s.relatedConsolidationId, "consolidation"),
              title: s.relatedConsolidationId,
              onClick: () => x("consolidations", s.relatedConsolidationId),
            }),
          s.relatedShipmentId &&
            t.push({
              label: m(s.relatedShipmentId, "shipment"),
              title: s.relatedShipmentId,
              onClick: () => {
                try {
                  localStorage.setItem(
                    "bundleist_nav_intent",
                    JSON.stringify({
                      page: "shipments",
                      shipmentId: s.relatedShipmentId,
                    }),
                  );
                } catch {}
                x("shipments", s.relatedShipmentId);
              },
            }),
          t
        );
      }, [
        s == null ? void 0 : s.id,
        s == null ? void 0 : s.relatedOrderId,
        s == null ? void 0 : s.relatedConsolidationId,
        s == null ? void 0 : s.relatedShipmentId,
        x,
      ]),
      z = i.useMemo(() => {
        if (!s)
          return {
            orders: [],
            consolidations: [],
            shipments: [],
            ledger: { net: 0, summary: [] },
          };
        const t = s.relatedOrderId
            ? [
                {
                  id: s.relatedOrderId,
                  label: m(s.relatedOrderId, "order"),
                  onClick: () => x("orders", s.relatedOrderId),
                },
              ]
            : [],
          r = s.relatedConsolidationId
            ? [
                {
                  id: s.relatedConsolidationId,
                  label: m(s.relatedConsolidationId, "consolidation"),
                  onClick: () => x("consolidations", s.relatedConsolidationId),
                },
              ]
            : [],
          a = s.relatedShipmentId
            ? [
                {
                  id: s.relatedShipmentId,
                  label: m(s.relatedShipmentId, "shipment"),
                  onClick: () => x("shipments", s.relatedShipmentId),
                },
              ]
            : [],
          n = [
            { label: "Type", value: T(s.type) },
            { label: "Date", value: new Date(s.date).toLocaleString() },
            { label: "Customer", value: C(s.customerId) },
            {
              label: "Amount",
              value: `${s.amount < 0 ? "-" : "+"}$${Math.abs(s.amount).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            },
          ];
        return {
          orders: t,
          consolidations: r,
          shipments: a,
          ledger: { net: s.amount, summary: n },
        };
      }, [
        s == null ? void 0 : s.id,
        s == null ? void 0 : s.relatedOrderId,
        s == null ? void 0 : s.relatedConsolidationId,
        s == null ? void 0 : s.relatedShipmentId,
        s == null ? void 0 : s.type,
        s == null ? void 0 : s.date,
        s == null ? void 0 : s.amount,
        s == null ? void 0 : s.customerId,
        x,
        o,
      ]);
    i.useEffect(() => {
      if (!s) {
        y && _(null);
        return;
      }
      y !== s.id && _(s.id);
    }, [s, y]);
    const ct = async (t) => {
        if ((t.preventDefault(), G)) return;
        const r = parseFloat(Se);
        if (!j || isNaN(r) || r <= 0 || !U.trim()) {
          N(
            "Invalid Payment",
            "Please select a customer, enter a valid positive amount, and provide a description for the payment.",
          );
          return;
        }
        try {
          (ke(!0), (await Ge(j, r, U)) && (we(""), Ce(""), L(!1)));
        } catch (a) {
          (console.error("Error adding incoming payment:", a),
            N(
              "Payment Error",
              "An unexpected error occurred while recording the payment. Please try again.",
            ));
        } finally {
          ke(!1);
        }
      },
      ut = async (t) => {
        if ((t.preventDefault(), X)) return;
        const r = parseFloat(Me);
        if (!k || isNaN(r) || r <= 0 || !K.trim()) {
          N(
            "Invalid Refund",
            "Please select a customer, enter a valid positive amount, and provide a description for the refund.",
          );
          return;
        }
        try {
          (Oe(!0), (await Ke(k, r, K)) && (De(""), Pe(""), B(!1)));
        } catch (a) {
          (console.error("Error recording refund payout:", a),
            N(
              "Refund Error",
              "An unexpected error occurred while recording the refund. Please try again.",
            ));
        } finally {
          Oe(!1);
        }
      },
      mt = async (t) => {
        var W;
        if ((t.preventDefault(), ie)) return;
        A(!0);
        const r = parseFloat(Re),
          a = g.find((d) => d.id === u);
        let n;
        a && a.isMixed ? (n = null) : (n = c === "SYSTEM_COST" ? null : c);
        const O = (a == null ? void 0 : a.isMixed) && Te;
        if (!(n || O || u) || r <= 0 || !ee.trim()) {
          (N(
            "Invalid Cost",
            "Please select a customer (or link to a mixed consolidation), enter a valid positive amount, and provide a description.",
          ),
            A(!1));
          return;
        }
        if (
          n === null &&
          u &&
          !((W = g.find((d) => d.id === u)) != null && W.isMixed)
        ) {
          (N(
            "Invalid Link",
            "System operational costs can only be linked to Mixed Consolidations.",
          ),
            A(!1));
          return;
        }
        try {
          (await Ze(n, r, ee, te || void 0, u || void 0)) &&
            (Le(""), Ee(""), q(""), se(""), $e(""), ot(!0), E(!1));
        } catch (d) {
          (console.error("Error adding miscellaneous cost:", d),
            N(
              "Cost Error",
              "An unexpected error occurred while adding the miscellaneous cost.",
            ));
        } finally {
          A(!1);
        }
      };
    function C(t) {
      if (!t) return "System Transaction";
      const r = o.find((a) => a.id === t);
      return r ? `${r.companyName} (${r.contactPerson})` : "Unknown Customer";
    }
    const xt = "Payments",
      pe = R ? v(R, J) : null,
      he = Math.max(1, Math.ceil(qe / V)),
      ge = g.find((t) => t.id === u);
    ge && ge.isMixed && o.filter((t) => ge.involvedCustomerIds.includes(t.id));
    const pt = (t) => {
      (_(t),
        typeof window < "u" &&
          typeof window.matchMedia == "function" &&
          (window.matchMedia("(min-width: 1024px)").matches || me(!0)));
    };
    return e.jsx("div", {
      className: "ui-page",
      children: e.jsxs("div", {
        className: `px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 ${l ? "pb-28" : ""}`,
        children: [
          e.jsx(bt, {
            title: xt,
            subtitle: l
              ? "Review and record transactions across all customers."
              : "Review your transaction history and current balance.",
            icon: e.jsx("svg", {
              className: "w-5 h-5",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: e.jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
              }),
            }),
            actions: [
              {
                label: "Refresh",
                onClick: () => tt((t) => t + 1),
                variant: "outline",
              },
            ],
            right: e.jsxs("div", {
              className: "flex items-center gap-2",
              children: [
                e.jsx(yt, { asOf: Xe }),
                pe !== null && !l
                  ? e.jsxs("div", {
                      className:
                        "text-right px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70",
                      children: [
                        e.jsx("div", {
                          className: "ui-kicker",
                          children: "Balance",
                        }),
                        e.jsxs("div", {
                          className: `text-lg font-extrabold ${pe >= 0 ? "text-emerald-700" : "text-rose-700"}`,
                          children: [
                            "$",
                            pe.toLocaleString(void 0, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }),
                          ],
                        }),
                      ],
                    })
                  : null,
              ],
            }),
          }),
          e.jsxs("div", {
            className: "ui-surface overflow-hidden",
            children: [
              e.jsxs("div", {
                className: "ui-section-header flex-col items-stretch",
                children: [
                  e.jsxs("div", {
                    className:
                      "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 w-full",
                    children: [
                      e.jsx("div", {
                        className: "flex items-center gap-3",
                        children: e.jsxs("div", {
                          children: [
                            e.jsx("div", {
                              className:
                                "text-base font-semibold tracking-tight text-slate-900",
                              children: "Transactions",
                            }),
                            e.jsx("div", {
                              className: "ui-subtitle mt-1",
                              children: "Quick filters + a detail panel.",
                            }),
                          ],
                        }),
                      }),
                      e.jsxs("div", {
                        className:
                          "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3",
                        children: [
                          e.jsxs("div", {
                            className: "text-sm text-gray-500",
                            children: ["Total: ", qe],
                          }),
                          l &&
                            e.jsx("div", {
                              className: "flex items-center gap-2",
                              children: e.jsxs("div", {
                                className:
                                  "inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm",
                                children: [
                                  e.jsx("button", {
                                    type: "button",
                                    onClick: () => {
                                      (ze("customer"), ce(""));
                                    },
                                    className: [
                                      "px-3 py-1.5 rounded-xl text-xs font-semibold",
                                      S === "customer"
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-700 hover:bg-slate-50",
                                    ].join(" "),
                                    children: "By customer",
                                  }),
                                  e.jsx("button", {
                                    type: "button",
                                    onClick: () => {
                                      (ze("entity"), P(""), f(1));
                                    },
                                    className: [
                                      "px-3 py-1.5 rounded-xl text-xs font-semibold",
                                      S === "entity"
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-700 hover:bg-slate-50",
                                    ].join(" "),
                                    children: "By entity",
                                  }),
                                ],
                              }),
                            }),
                          l &&
                            e.jsxs("div", {
                              className:
                                "flex flex-col sm:flex-row gap-2 sm:gap-3",
                              children: [
                                e.jsx(p, {
                                  type: "button",
                                  onClick: () => L(!0),
                                  variant: "default",
                                  title: "Record an incoming payment",
                                  children: "Record Payment",
                                }),
                                e.jsx(p, {
                                  type: "button",
                                  onClick: () => B(!0),
                                  variant: "destructive",
                                  title: "Record a refund payout (cash out)",
                                  children: "Record Refund",
                                }),
                                e.jsx(p, {
                                  type: "button",
                                  onClick: () => E(!0),
                                  variant: "outline",
                                  className:
                                    "border-amber-300 text-amber-900 hover:bg-amber-50",
                                  title: "Record a miscellaneous cost",
                                  children: "Record Cost",
                                }),
                              ],
                            }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "mt-4 grid grid-cols-1 lg:grid-cols-12 gap-3",
                    children: [
                      e.jsx("div", {
                        className: "lg:col-span-5",
                        children: e.jsxs("div", {
                          className: "relative",
                          children: [
                            e.jsx("input", {
                              value: $,
                              onChange: (t) => w(t.target.value),
                              className: "ui-field ui-field--sm pl-10 pr-3",
                              placeholder: "Search description, type...",
                            }),
                            e.jsx("svg", {
                              className:
                                "w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              children: e.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z",
                              }),
                            }),
                          ],
                        }),
                      }),
                      e.jsxs("div", {
                        className:
                          "lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2",
                        children: [
                          l
                            ? S === "customer"
                              ? e.jsxs("select", {
                                  value: D,
                                  onChange: (t) => {
                                    (P(t.target.value), f(1));
                                  },
                                  className:
                                    "ui-field ui-field--sm text-sm font-semibold text-slate-800",
                                  title: "Filter by customer",
                                  children: [
                                    e.jsx("option", {
                                      value: "",
                                      children: "All Customers",
                                    }),
                                    o.map((t) =>
                                      e.jsx(
                                        "option",
                                        {
                                          value: t.id,
                                          children: t.companyName,
                                        },
                                        t.id,
                                      ),
                                    ),
                                  ],
                                })
                              : e.jsxs("div", {
                                  className:
                                    "grid grid-cols-2 gap-2 col-span-2 sm:col-span-1",
                                  children: [
                                    e.jsxs("select", {
                                      value: H,
                                      onChange: (t) => {
                                        (We(t.target.value), f(1));
                                      },
                                      className:
                                        "ui-field ui-field--sm text-sm font-semibold text-slate-800",
                                      title: "Entity type",
                                      children: [
                                        e.jsx("option", {
                                          value: "order",
                                          children: "Order",
                                        }),
                                        e.jsx("option", {
                                          value: "consolidation",
                                          children: "Consolidation",
                                        }),
                                        e.jsx("option", {
                                          value: "shipment",
                                          children: "Shipment",
                                        }),
                                      ],
                                    }),
                                    e.jsx("input", {
                                      value: de,
                                      onChange: (t) => {
                                        (ce(t.target.value), f(1));
                                      },
                                      className: "ui-field ui-field--sm",
                                      placeholder: "Paste ID...",
                                      title: "Entity id (full or partial)",
                                    }),
                                  ],
                                })
                            : e.jsx("div", { className: "hidden sm:block" }),
                          e.jsxs("select", {
                            value: M,
                            onChange: (t) => ue(t.target.value),
                            className:
                              "px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800",
                            title: "Filter by type",
                            children: [
                              e.jsx("option", {
                                value: "all",
                                children: "All Types",
                              }),
                              Object.values(gt).map((t) =>
                                e.jsx(
                                  "option",
                                  { value: t, children: T(t) },
                                  t,
                                ),
                              ),
                            ],
                          }),
                          e.jsx("button", {
                            type: "button",
                            onClick: () => {
                              (w(""),
                                ue("all"),
                                l && (P(""), ce(""), We("order")));
                            },
                            className:
                              "px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 hover:bg-gray-50",
                            title: "Clear filters",
                            children: "Clear",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "grid grid-cols-1 lg:grid-cols-12",
                children: [
                  e.jsx("div", {
                    className: "lg:col-span-5 border-r border-gray-200",
                    children: e.jsxs("div", {
                      className: "p-3",
                      children: [
                        ne && ae.length === 0
                          ? e.jsx("div", {
                              className: "p-8 text-center text-gray-600",
                              children: "Loading transactions...",
                            })
                          : He
                            ? e.jsx("div", {
                                className:
                                  "p-8 text-center text-red-700 font-semibold",
                                children: He,
                              })
                            : F.length === 0
                              ? e.jsxs("div", {
                                  className: "p-8 text-center text-gray-600",
                                  children: [
                                    e.jsx("div", {
                                      className:
                                        "text-sm font-semibold text-gray-900",
                                      children: "No transactions match.",
                                    }),
                                    e.jsx("div", {
                                      className: "text-xs text-gray-500 mt-1",
                                      children:
                                        "Try clearing filters or going to another page.",
                                    }),
                                  ],
                                })
                              : e.jsx("div", {
                                  className: "space-y-2",
                                  children: F.map((t) => {
                                    const r =
                                      (s == null ? void 0 : s.id) === t.id;
                                    return e.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        onClick: () => pt(t.id),
                                        className: `w-full text-left p-3 rounded-xl border transition-colors ${r ? "border-emerald-300 bg-emerald-50" : "border-gray-200 bg-white hover:bg-gray-50"}`,
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
                                                    e.jsx("span", {
                                                      className:
                                                        "text-xs font-semibold text-gray-500",
                                                      children: new Date(
                                                        t.date,
                                                      ).toLocaleDateString(),
                                                    }),
                                                    e.jsx("span", {
                                                      className:
                                                        "px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-800 border border-gray-200",
                                                      children: T(t.type),
                                                    }),
                                                  ],
                                                }),
                                                l &&
                                                  e.jsx("div", {
                                                    className:
                                                      "text-xs text-gray-600 mt-1 truncate",
                                                    children: C(t.customerId),
                                                  }),
                                                e.jsx("div", {
                                                  className:
                                                    "text-sm font-semibold text-gray-900 mt-1",
                                                  children: t.description,
                                                }),
                                              ],
                                            }),
                                            e.jsxs("div", {
                                              className: `text-sm font-black whitespace-nowrap ${t.amount >= 0 ? "text-emerald-700" : "text-red-700"}`,
                                              children: [
                                                t.amount < 0 ? "-" : "+",
                                                "$",
                                                Math.abs(
                                                  t.amount,
                                                ).toLocaleString(void 0, {
                                                  minimumFractionDigits: 2,
                                                  maximumFractionDigits: 2,
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      },
                                      t.id,
                                    );
                                  }),
                                }),
                        e.jsxs("div", {
                          className:
                            "mt-4 flex items-center justify-between border-t border-gray-100 pt-4",
                          children: [
                            e.jsxs("div", {
                              className: "text-xs font-semibold text-gray-600",
                              children: ["Page ", b, " of ", he],
                            }),
                            e.jsxs("div", {
                              className: "flex items-center gap-2",
                              children: [
                                e.jsx("button", {
                                  type: "button",
                                  onClick: () => f((t) => Math.max(1, t - 1)),
                                  disabled: b <= 1 || ne,
                                  className:
                                    "px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-50",
                                  children: "Prev",
                                }),
                                e.jsx("button", {
                                  type: "button",
                                  onClick: () => f((t) => Math.min(he, t + 1)),
                                  disabled: b >= he || ne,
                                  className:
                                    "px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-50",
                                  children: "Next",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  e.jsx("div", {
                    className: "hidden lg:block lg:col-span-7 p-5",
                    children: s
                      ? e.jsxs("div", {
                          className:
                            "bg-white rounded-2xl border border-gray-200 shadow-sm p-5",
                          children: [
                            e.jsx(vt, { items: dt, className: "mb-3" }),
                            e.jsxs("div", {
                              className:
                                "flex items-start justify-between gap-3",
                              children: [
                                e.jsxs("div", {
                                  className: "min-w-0",
                                  children: [
                                    e.jsx("div", {
                                      className:
                                        "text-xs font-semibold text-gray-500 uppercase tracking-wider",
                                      children: "Transaction",
                                    }),
                                    e.jsx("div", {
                                      className:
                                        "text-lg font-black text-gray-900 mt-1",
                                      children: T(s.type),
                                    }),
                                    e.jsx("div", {
                                      className: "text-sm text-gray-600 mt-1",
                                      children: new Date(
                                        s.date,
                                      ).toLocaleString(),
                                    }),
                                    l &&
                                      e.jsx("div", {
                                        className: "text-sm text-gray-700 mt-1",
                                        children: C(s.customerId),
                                      }),
                                  ],
                                }),
                                e.jsxs("div", {
                                  className: `text-xl font-black ${s.amount >= 0 ? "text-emerald-700" : "text-red-700"}`,
                                  children: [
                                    s.amount < 0 ? "-" : "+",
                                    "$",
                                    Math.abs(s.amount).toLocaleString(void 0, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className:
                                "mt-4 p-3 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-slate-50",
                              children: [
                                e.jsx("div", {
                                  className:
                                    "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                  children: "Description",
                                }),
                                e.jsx("div", {
                                  className:
                                    "text-sm text-gray-900 mt-1 whitespace-pre-wrap",
                                  children: s.description,
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "mt-4 grid grid-cols-2 gap-3",
                              children: [
                                e.jsxs("div", {
                                  className:
                                    "p-3 rounded-xl border border-gray-200 bg-white",
                                  children: [
                                    e.jsx("div", {
                                      className:
                                        "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                      children: "Transaction ID",
                                    }),
                                    e.jsxs("div", {
                                      className: "mt-1 flex items-center gap-2",
                                      children: [
                                        e.jsx("span", {
                                          className:
                                            "text-xs font-bold text-gray-900",
                                          children: m(s.id, "payment"),
                                        }),
                                        e.jsx("button", {
                                          type: "button",
                                          onClick: () => Qe(s.id),
                                          className:
                                            "text-gray-400 hover:text-gray-700",
                                          title: "Copy full ID",
                                          children: e.jsx("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: e.jsx("path", {
                                              strokeLinecap: "round",
                                              strokeLinejoin: "round",
                                              strokeWidth: 2,
                                              d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
                                            }),
                                          }),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                e.jsxs("div", {
                                  className:
                                    "p-3 rounded-xl border border-gray-200 bg-white",
                                  children: [
                                    e.jsx("div", {
                                      className:
                                        "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                      children: "Quick Links",
                                    }),
                                    e.jsxs("div", {
                                      className: "mt-2 flex flex-wrap gap-2",
                                      children: [
                                        s.relatedOrderId
                                          ? e.jsxs(p, {
                                              variant: "outline",
                                              size: "sm",
                                              onClick: () =>
                                                x("orders", s.relatedOrderId),
                                              children: [
                                                "Order ",
                                                m(s.relatedOrderId, "order"),
                                              ],
                                            })
                                          : e.jsx("span", {
                                              className:
                                                "text-xs text-gray-500",
                                              children: "No order",
                                            }),
                                        s.relatedConsolidationId
                                          ? e.jsxs(p, {
                                              variant: "outline",
                                              size: "sm",
                                              onClick: () =>
                                                x(
                                                  "consolidations",
                                                  s.relatedConsolidationId,
                                                ),
                                              children: [
                                                "Consolidation ",
                                                m(
                                                  s.relatedConsolidationId,
                                                  "consolidation",
                                                ),
                                              ],
                                            })
                                          : null,
                                        s.relatedShipmentId
                                          ? e.jsxs(p, {
                                              variant: "outline",
                                              size: "sm",
                                              onClick: () => {
                                                try {
                                                  localStorage.setItem(
                                                    "bundleist_nav_intent",
                                                    JSON.stringify({
                                                      page: "shipments",
                                                      shipmentId:
                                                        s.relatedShipmentId,
                                                    }),
                                                  );
                                                } catch {}
                                                x(
                                                  "shipments",
                                                  s.relatedShipmentId,
                                                );
                                              },
                                              children: [
                                                "Shipment ",
                                                m(
                                                  s.relatedShipmentId,
                                                  "shipment",
                                                ),
                                              ],
                                            })
                                          : null,
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "mt-4",
                              children: [
                                e.jsx("div", {
                                  className: "ui-kicker",
                                  children: "Related",
                                }),
                                e.jsx("div", {
                                  className: "mt-2",
                                  children: e.jsx(Nt, {
                                    orders: z.orders,
                                    consolidations: z.consolidations,
                                    shipments: z.shipments,
                                    ledger: z.ledger,
                                  }),
                                }),
                              ],
                            }),
                            e.jsx("div", {
                              className: "mt-4",
                              children: e.jsx(jt, {
                                entityType: "payment_transaction",
                                entityId: s.id,
                              }),
                            }),
                          ],
                        })
                      : e.jsx("div", {
                          className: "p-10 text-center text-gray-600",
                          children: "Select a transaction to see details.",
                        }),
                  }),
                ],
              }),
            ],
          }),
          lt &&
            s &&
            e.jsxs("div", {
              className: "fixed inset-0 z-50 lg:hidden",
              children: [
                e.jsx("div", {
                  className: "absolute inset-0 bg-black/30",
                  onClick: () => me(!1),
                }),
                e.jsxs("div", {
                  className:
                    "absolute inset-x-0 bottom-0 bg-white rounded-t-3xl border-t border-gray-200 shadow-2xl max-h-[85vh] overflow-y-auto",
                  children: [
                    e.jsxs("div", {
                      className:
                        "p-4 border-b border-gray-100 flex items-start justify-between gap-3",
                      children: [
                        e.jsxs("div", {
                          className: "min-w-0",
                          children: [
                            e.jsx("div", {
                              className:
                                "text-xs font-semibold text-gray-500 uppercase tracking-wider",
                              children: "Transaction",
                            }),
                            e.jsx("div", {
                              className:
                                "text-lg font-black text-gray-900 truncate",
                              children: T(s.type),
                            }),
                            e.jsx("div", {
                              className: "text-sm text-gray-600",
                              children: new Date(s.date).toLocaleString(),
                            }),
                          ],
                        }),
                        e.jsx("button", {
                          type: "button",
                          onClick: () => me(!1),
                          className:
                            "px-3 py-2 text-sm font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700",
                          children: "Close",
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "p-4 space-y-3",
                      children: [
                        e.jsxs("div", {
                          className: `text-2xl font-black ${s.amount >= 0 ? "text-emerald-700" : "text-red-700"}`,
                          children: [
                            s.amount < 0 ? "-" : "+",
                            "$",
                            Math.abs(s.amount).toLocaleString(void 0, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }),
                          ],
                        }),
                        l &&
                          e.jsx("div", {
                            className: "text-sm text-gray-700",
                            children: C(s.customerId),
                          }),
                        e.jsxs("div", {
                          className:
                            "p-3 rounded-xl border border-gray-200 bg-gray-50",
                          children: [
                            e.jsx("div", {
                              className:
                                "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                              children: "Description",
                            }),
                            e.jsx("div", {
                              className:
                                "text-sm text-gray-900 mt-1 whitespace-pre-wrap",
                              children: s.description,
                            }),
                          ],
                        }),
                        e.jsxs("div", {
                          className:
                            "p-3 rounded-xl border border-gray-200 bg-white",
                          children: [
                            e.jsx("div", {
                              className:
                                "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                              children: "Transaction ID",
                            }),
                            e.jsxs("div", {
                              className: "mt-1 flex items-center gap-2",
                              children: [
                                e.jsx("span", {
                                  className: "text-xs font-bold text-gray-900",
                                  children: m(s.id, "payment"),
                                }),
                                e.jsx("button", {
                                  type: "button",
                                  onClick: () => Qe(s.id),
                                  className:
                                    "text-gray-400 hover:text-gray-700",
                                  title: "Copy full ID",
                                  children: e.jsx("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: 2,
                                      d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
                                    }),
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          e.jsx(be, {
            children: e.jsx(ye, {
              isOpen: rt,
              onClose: () => L(!1),
              title: "Record Incoming Payment",
              subtitle: "Add a new payment received from a customer",
              gradientFrom: "from-emerald-50",
              gradientTo: "to-green-50",
              icon: e.jsx("svg", {
                className: "w-6 h-6 text-emerald-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: e.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
                }),
              }),
              children: e.jsxs("form", {
                onSubmit: ct,
                className: "ui-form-skin",
                children: [
                  e.jsxs(Y, {
                    title: "Payment Details",
                    description:
                      "Enter the payment information received from the customer",
                    children: [
                      e.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                        children: [
                          e.jsxs(h, {
                            label: "Customer",
                            required: !0,
                            error:
                              o.length === 0
                                ? "Please add a customer first"
                                : void 0,
                            children: [
                              e.jsxs("select", {
                                value: j,
                                onChange: (t) => st(t.target.value),
                                className:
                                  "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200",
                                required: !0,
                                disabled: o.length === 0,
                                children: [
                                  e.jsx("option", {
                                    value: "",
                                    disabled: !0,
                                    children:
                                      o.length === 0
                                        ? "Add customer first"
                                        : "Select customer",
                                  }),
                                  o.map((t) =>
                                    e.jsx(
                                      "option",
                                      { value: t.id, children: C(t.id) },
                                      t.id,
                                    ),
                                  ),
                                ],
                              }),
                              Q !== null &&
                                e.jsx("div", {
                                  className:
                                    "mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200",
                                  children: e.jsxs("p", {
                                    className: "text-sm text-gray-600",
                                    children: [
                                      "Current Balance: ",
                                      e.jsxs("span", {
                                        className: `font-semibold ${Q >= 0 ? "text-emerald-600" : "text-red-600"}`,
                                        children: [
                                          "$",
                                          Q.toLocaleString(void 0, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                            ],
                          }),
                          e.jsx(h, {
                            label: "Payment Amount",
                            required: !0,
                            help: "Amount received in USD",
                            children: e.jsxs("div", {
                              className: "relative",
                              children: [
                                e.jsx("span", {
                                  className:
                                    "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium",
                                  children: "$",
                                }),
                                e.jsx("input", {
                                  type: "number",
                                  value: Se,
                                  onChange: (t) => we(t.target.value),
                                  className:
                                    "w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200",
                                  placeholder: "0.00",
                                  min: "0.01",
                                  step: "0.01",
                                  required: !0,
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      e.jsx("div", {
                        className: "mt-6",
                        children: e.jsx(h, {
                          label: "Payment Description",
                          required: !0,
                          help: "Brief description of what this payment is for",
                          children: e.jsx("input", {
                            type: "text",
                            value: U,
                            onChange: (t) => Ce(t.target.value),
                            className:
                              "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200",
                            placeholder: "e.g., Advance payment for Order #123",
                            required: !0,
                          }),
                        }),
                      }),
                    ],
                  }),
                  e.jsxs(ve, {
                    children: [
                      e.jsx(p, {
                        type: "button",
                        variant: "outline",
                        onClick: () => L(!1),
                        className: "w-full sm:w-auto",
                        children: "Cancel",
                      }),
                      e.jsx(p, {
                        type: "submit",
                        variant: "default",
                        className: "w-full sm:w-auto",
                        disabled: o.length === 0 || G,
                        children: G ? "Recording…" : "Record Payment",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          e.jsx(be, {
            children: e.jsx(ye, {
              isOpen: at,
              onClose: () => B(!1),
              title: "Record Refund Payout",
              subtitle:
                "Record money paid out to a customer (reduces their credit)",
              gradientFrom: "from-rose-50",
              gradientTo: "to-orange-50",
              icon: e.jsx("svg", {
                className: "w-6 h-6 text-rose-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: e.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M20 12H4m0 0l4-4m-4 4l4 4",
                }),
              }),
              children: e.jsxs("form", {
                onSubmit: ut,
                className: "ui-form-skin",
                children: [
                  e.jsxs(Y, {
                    title: "Refund Details",
                    description: "Select the customer and refund payout amount",
                    children: [
                      e.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                        children: [
                          e.jsxs(h, {
                            label: "Customer",
                            required: !0,
                            error:
                              o.length === 0
                                ? "Please add a customer first"
                                : void 0,
                            children: [
                              e.jsxs("select", {
                                value: k,
                                onChange: (t) => it(t.target.value),
                                className:
                                  "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200",
                                required: !0,
                                disabled: o.length === 0,
                                children: [
                                  e.jsx("option", {
                                    value: "",
                                    disabled: !0,
                                    children:
                                      o.length === 0
                                        ? "Add customer first"
                                        : "Select customer",
                                  }),
                                  o.map((t) =>
                                    e.jsx(
                                      "option",
                                      { value: t.id, children: C(t.id) },
                                      t.id,
                                    ),
                                  ),
                                ],
                              }),
                              Z !== null &&
                                e.jsx("div", {
                                  className:
                                    "mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200",
                                  children: e.jsxs("p", {
                                    className: "text-sm text-gray-600",
                                    children: [
                                      "Current Balance: ",
                                      e.jsxs("span", {
                                        className: `font-semibold ${Z >= 0 ? "text-emerald-600" : "text-red-600"}`,
                                        children: [
                                          "$",
                                          Z.toLocaleString(void 0, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                            ],
                          }),
                          e.jsx(h, {
                            label: "Refund Amount",
                            required: !0,
                            help: "Amount paid out in USD",
                            children: e.jsxs("div", {
                              className: "relative",
                              children: [
                                e.jsx("span", {
                                  className:
                                    "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium",
                                  children: "$",
                                }),
                                e.jsx("input", {
                                  type: "number",
                                  value: Me,
                                  onChange: (t) => De(t.target.value),
                                  className:
                                    "w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200",
                                  placeholder: "0.00",
                                  min: "0.01",
                                  step: "0.01",
                                  required: !0,
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      e.jsx("div", {
                        className: "mt-6",
                        children: e.jsx(h, {
                          label: "Refund Description",
                          required: !0,
                          help: "Why the refund payout was issued",
                          children: e.jsx("input", {
                            type: "text",
                            value: K,
                            onChange: (t) => Pe(t.target.value),
                            className:
                              "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200",
                            placeholder: "e.g., Refund for cancelled order",
                            required: !0,
                          }),
                        }),
                      }),
                    ],
                  }),
                  e.jsxs(ve, {
                    children: [
                      e.jsx("button", {
                        type: "button",
                        onClick: () => B(!1),
                        className:
                          "w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200",
                        children: "Cancel",
                      }),
                      e.jsx("button", {
                        type: "submit",
                        className:
                          "w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-rose-600 to-orange-600 text-white font-semibold rounded-xl hover:from-rose-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed",
                        disabled: o.length === 0 || X,
                        children: X ? "Recording…" : "Record Refund",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          e.jsx(be, {
            children: e.jsx(ye, {
              isOpen: nt,
              onClose: () => E(!1),
              title: "Record Miscellaneous Cost",
              subtitle: "Add operational costs, fees, and business expenses",
              maxWidth: "2xl",
              gradientFrom: "from-orange-50",
              gradientTo: "to-red-50",
              icon: e.jsx("svg", {
                className: "w-6 h-6 text-orange-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: e.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
                }),
              }),
              children: e.jsxs("form", {
                onSubmit: mt,
                className: "ui-form-skin",
                children: [
                  e.jsxs(Y, {
                    title: "Cost Information",
                    description:
                      "Enter details about the operational cost or business expense",
                    children: [
                      e.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                        children: [
                          e.jsxs(h, {
                            label: "Assign to Customer",
                            help: "Choose a customer to charge this cost to, or select 'System Cost' for general expenses",
                            children: [
                              e.jsxs("select", {
                                value: c,
                                onChange: (t) => q(t.target.value),
                                className:
                                  "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200",
                                required: !0,
                                children: [
                                  e.jsx("option", {
                                    value: "",
                                    disabled: !0,
                                    children: "Select assignment",
                                  }),
                                  e.jsx("option", {
                                    value: "SYSTEM_COST",
                                    children:
                                      "System Cost (General Business Expense)",
                                  }),
                                  o.map((t) =>
                                    e.jsx(
                                      "option",
                                      { value: t.id, children: C(t.id) },
                                      t.id,
                                    ),
                                  ),
                                ],
                              }),
                              re !== null &&
                                e.jsx("div", {
                                  className:
                                    "mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200",
                                  children: e.jsxs("p", {
                                    className: "text-sm text-gray-600",
                                    children: [
                                      "Current Balance: ",
                                      e.jsxs("span", {
                                        className: `font-semibold ${re >= 0 ? "text-emerald-600" : "text-red-600"}`,
                                        children: [
                                          "$",
                                          re.toLocaleString(void 0, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                            ],
                          }),
                          e.jsx(h, {
                            label: "Cost Amount",
                            required: !0,
                            help: "Amount of the expense in USD",
                            children: e.jsxs("div", {
                              className: "relative",
                              children: [
                                e.jsx("span", {
                                  className:
                                    "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium",
                                  children: "$",
                                }),
                                e.jsx("input", {
                                  type: "number",
                                  value: Re,
                                  onChange: (t) => Le(t.target.value),
                                  className:
                                    "w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200",
                                  placeholder: "0.00",
                                  min: "0.01",
                                  step: "0.01",
                                  required: !0,
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      e.jsx("div", {
                        className: "mt-6",
                        children: e.jsx(h, {
                          label: "Cost Description",
                          required: !0,
                          help: "Brief description of what this cost is for",
                          children: e.jsx("input", {
                            type: "text",
                            value: ee,
                            onChange: (t) => Ee(t.target.value),
                            className:
                              "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200",
                            placeholder:
                              "e.g., Port handling fees, Storage costs, Transportation",
                            required: !0,
                          }),
                        }),
                      }),
                    ],
                  }),
                  e.jsx(Y, {
                    title: "Optional Linking",
                    description:
                      "Link this cost to specific orders or consolidations for better tracking",
                    className: "bg-gradient-to-r from-gray-50 to-slate-50",
                    children: e.jsxs("div", {
                      className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                      children: [
                        e.jsx(h, {
                          label: "Related Consolidation",
                          help: "Link this cost to a specific consolidation",
                          children: e.jsxs("select", {
                            value: u,
                            onChange: (t) => $e(t.target.value),
                            className:
                              "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200",
                            children: [
                              e.jsx("option", {
                                value: "",
                                children: "No consolidation link",
                              }),
                              Je.map((t) =>
                                e.jsxs(
                                  "option",
                                  {
                                    value: t.id,
                                    children: [t.name, " (", t.route, ")"],
                                  },
                                  t.id,
                                ),
                              ),
                            ],
                          }),
                        }),
                        e.jsx(h, {
                          label: "Related Order",
                          help: "Link this cost to a specific order",
                          children: e.jsxs("select", {
                            value: te,
                            onChange: (t) => se(t.target.value),
                            className:
                              "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200",
                            children: [
                              e.jsx("option", {
                                value: "",
                                children: "No order link",
                              }),
                              Ye.map((t) =>
                                e.jsxs(
                                  "option",
                                  {
                                    value: t.id,
                                    children: [
                                      m(t.id, "order"),
                                      " - ",
                                      t.productName,
                                    ],
                                  },
                                  t.id,
                                ),
                              ),
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
                  e.jsxs(ve, {
                    children: [
                      e.jsx(p, {
                        type: "button",
                        variant: "outline",
                        onClick: () => E(!1),
                        className: "w-full sm:w-auto",
                        children: "Cancel",
                      }),
                      e.jsx(p, {
                        type: "submit",
                        variant: "outline",
                        className:
                          "w-full sm:w-auto border-amber-300 text-amber-900 hover:bg-amber-50",
                        disabled: ie,
                        children: ie ? "Recording..." : "Record Cost",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          l &&
            e.jsx("div", {
              className: "fixed inset-x-0 bottom-0 z-40 lg:hidden",
              children: e.jsx("div", {
                className: "mx-auto max-w-3xl px-3 pb-3",
                children: e.jsx("div", {
                  className:
                    "rounded-2xl border border-gray-200 bg-white/95 backdrop-blur shadow-xl p-3",
                  children: e.jsxs("div", {
                    className: "grid grid-cols-2 gap-2",
                    children: [
                      e.jsx(p, {
                        type: "button",
                        onClick: () => L(!0),
                        variant: "default",
                        className: "h-11",
                        children: "Record Payment",
                      }),
                      e.jsx(p, {
                        type: "button",
                        onClick: () => E(!0),
                        variant: "outline",
                        className:
                          "h-11 border-amber-300 text-amber-900 hover:bg-amber-50",
                        children: "Record Cost",
                      }),
                    ],
                  }),
                }),
              }),
            }),
        ],
      }),
    });
  };
export { Lt as default };
