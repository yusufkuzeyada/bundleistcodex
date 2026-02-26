import { r as n, j as e } from "./radix.js";
import {
  w as N,
  e as Ct,
  c as I,
  b as v,
  B as be,
  a as fe,
  f as re,
  p as at,
  T as B,
  O as nt,
  U as St,
} from "./app.js";
import {
  F as ot,
  a as it,
  b as ae,
  c as f,
  d as lt,
} from "./formerrorboundary.js";
import { P as kt } from "./pageheader.js";
import { R as Tt } from "./relatedpanel.js";
import "./react.js";
import "./supabase.js";
import "./icons.js";
const $t = ({
  customers: ye,
  addCustomer: ct,
  paymentTransactions: R,
  calculateCustomerBalance: ve,
  updateCustomer: je,
  isAdmin: u,
  currentCustomerId: dt,
  shipments: Ne = [],
  orders: K = [],
  consolidations: U = [],
  suppliers: It = [],
  getSupplierName: Dt = (q) => "Unknown Supplier",
  getCustomerName: Mt = (q) => "Unknown Customer",
  onNavigate: w = () => {},
  createCustomerMagicLink: wt = async () => "",
}) => {
  var et, tt, st, rt;
  const [q, we] = n.useState(""),
    [W, Ce] = n.useState(""),
    [ne, Se] = n.useState(""),
    [oe, ke] = n.useState(""),
    [ie, Te] = n.useState(""),
    [Ie, De] = n.useState(""),
    [H, Me] = n.useState(""),
    [C, Pe] = n.useState(N.Growth),
    [mt, G] = n.useState(!1),
    [ut, V] = n.useState(!1),
    [le, _e] = n.useState(""),
    [Y, Ee] = n.useState(""),
    [ce, Fe] = n.useState(""),
    [de, Oe] = n.useState(""),
    [me, Le] = n.useState(""),
    [Be, qe] = n.useState(""),
    [ue, $e] = n.useState(N.Growth),
    [Ae, Z] = n.useState(null),
    [ze, Je] = n.useState(null),
    isAdminRecord = (t) => (t.role || St.Customer) === St.Admin,
    { showError: M, showSuccess: gt } = Ct(),
    xt = (t) => {
      if (
        (t.preventDefault(),
        !q.trim() ||
          !W.trim() ||
          !ne.trim() ||
          !oe.trim() ||
          !ie.trim() ||
          !H.trim() ||
          !C)
      ) {
        M(
          "Missing Fields",
          "Please fill in all required fields: Name, Email, Company Name, Phone, Address, Password, and select a Plan.",
        );
        return;
      }
      if (!/\S+@\S+\.\S+/.test(W)) {
        M("Invalid Email", "Please enter a valid email address.");
        return;
      }
      if (H.length < 6) {
        M("Password Too Short", "Password must be at least 6 characters long.");
        return;
      }
      (ct({
        contactPerson: q,
        email: W,
        companyName: ne,
        phone: oe,
        address: ie,
        notes: Ie,
        contractType: C,
        role: St.Customer,
        password: H,
      }),
        we(""),
        Ce(""),
        Se(""),
        ke(""),
        Te(""),
        De(""),
        Me(""),
        Pe(N.Growth),
        G(!1));
    },
    pt = (t) => {
      if (
        (t.preventDefault(),
        !le.trim() ||
          !Y.trim() ||
          !ce.trim() ||
          !de.trim() ||
          !me.trim() ||
          !ue)
      ) {
        M(
          "Missing Fields",
          "Please fill in all required fields: Name, Email, Company Name, Phone, Address, and Plan.",
        );
        return;
      }
      if (!/\S+@\S+\.\S+/.test(Y)) {
        M("Invalid Email", "Please enter a valid email address.");
        return;
      }
      if (!Ae) {
        M("No Selection", "No customer selected for editing.");
        return;
      }
      (je(Ae, {
        contactPerson: le,
        email: Y,
        companyName: ce,
        phone: de,
        address: me,
        notes: Be,
        contractType: ue,
      }),
        V(!1),
        Z(null));
    },
    [$, Re] = n.useState(""),
    [roleScope, setRoleScope] = n.useState("customers"),
    D = u
      ? ye.filter((t) => {
          const s =
            (t.role || St.Customer) === St.Admin ? "admins" : "customers";
          return roleScope === "all" ? !0 : s === roleScope;
        })
      : ye.filter((t) => t.id === dt),
    [F, Ke] = n.useState("all"),
    [O, Ue] = n.useState("all"),
    [S, We] = n.useState("all"),
    [P, He] = n.useState("company"),
    [A, Ge] = n.useState("asc"),
    [Q, _] = n.useState(1),
    ge = 18,
    [L, Ve] = n.useState(null),
    [ht, X] = n.useState(!1),
    [magicLinkByCustomer, setMagicLinkByCustomer] = n.useState({}),
    [magicLinkLoadingId, setMagicLinkLoadingId] = n.useState(null);
  (n.useEffect(() => {
    try {
      const t = localStorage.getItem("bundleist_customers_state");
      if (!t) return;
      const s = JSON.parse(t);
      (s && typeof s.search == "string" && Re(s.search),
        s &&
          typeof s.roleScope == "string" &&
          setRoleScope(
            ["customers", "admins", "all"].includes(s.roleScope)
              ? s.roleScope
              : "customers",
          ),
        s && typeof s.contractFilter == "string" && Ke(s.contractFilter),
        s && typeof s.balanceFilter == "string" && Ue(s.balanceFilter),
        s && typeof s.exceptionFilter == "string" && We(s.exceptionFilter),
        s && typeof s.sortKey == "string" && He(s.sortKey),
        s && typeof s.sortDir == "string" && Ge(s.sortDir),
        s && typeof s.page == "number" && _(Math.max(1, s.page)),
        s &&
          typeof s.selectedCustomerId == "string" &&
          Ve(s.selectedCustomerId));
    } catch {}
  }, []),
    n.useEffect(() => {
      try {
        localStorage.setItem(
          "bundleist_customers_state",
          JSON.stringify({
            search: $,
            roleScope,
            contractFilter: F,
            balanceFilter: O,
            exceptionFilter: S,
            sortKey: P,
            sortDir: A,
            page: Q,
            selectedCustomerId: L,
          }),
        );
      } catch {}
    }, [$, roleScope, F, O, S, P, A, Q, L]),
    n.useEffect(() => {
      roleScope === "admins" && (Ke("all"), Ue("all"), We("all"));
    }, [roleScope]));
  const z = n.useMemo(() => {
      var o;
      if (!u) return new Map();
      const t = new Map(),
        s = new Map(K.map((a) => [a.id, a])),
        m = new Map(U.map((a) => [a.id, a]));
      for (const a of Ne || []) {
        const d = new Set();
        a.customerId && d.add(a.customerId);
        for (const b of a.involvedCustomerIds || []) d.add(b);
        if (d.size === 0) {
          if (a.type === "individual") {
            const b = a.orderId || a.relatedId,
              i = s.get(b);
            i != null && i.customerId && d.add(i.customerId);
          } else if (a.type === "consolidation") {
            const b = a.consolidationId || a.relatedId,
              i = m.get(b);
            i != null && i.customerId && d.add(i.customerId);
            for (const k of (i == null ? void 0 : i.involvedCustomerIds) || [])
              d.add(k);
            if (
              d.size === 0 &&
              (o = i == null ? void 0 : i.orderIds) != null &&
              o.length
            )
              for (const k of i.orderIds) {
                const j = s.get(k);
                j != null && j.customerId && d.add(j.customerId);
              }
          }
        }
        for (const b of d) {
          const i = t.get(b) || [];
          (i.push(a), t.set(b, i));
        }
      }
      return t;
    }, [u, Ne, K, U]),
    Rt = n.useMemo(() => {
      const t = new Map();
      for (const s of R || []) {
        const m = s.relatedOrderId;
        if (!m) continue;
        if (!t.has(m))
          t.set(m, {
            orderCost: 0,
            orderCostReversal: 0,
            serviceFee: 0,
            serviceFeeReversal: 0,
            hasActiveOrderCost: !1,
            hasActiveServiceFee: !1,
            hadServiceFeeActivity: !1,
          });
        const o = t.get(m),
          a = Math.abs(Number(s.amount || 0));
        if (!o || !Number.isFinite(a) || a <= 0) continue;
        switch (s.type) {
          case B.OrderCost:
            o.orderCost += a;
            break;
          case B.OrderCostReversal:
            o.orderCostReversal += a;
            break;
          case B.ServiceFee:
            o.serviceFee += a;
            break;
          case B.ServiceFeeReversal:
            o.serviceFeeReversal += a;
            break;
        }
      }
      for (const s of t.values()) {
        const m = Math.max(0, s.orderCost - s.orderCostReversal),
          o = Math.max(0, s.serviceFee - s.serviceFeeReversal);
        (s.hasActiveOrderCost = m > 0.01),
          (s.hasActiveServiceFee = o > 0.01),
          (s.hadServiceFeeActivity =
            s.serviceFee > 0.01 || s.serviceFeeReversal > 0.01);
      }
      return t;
    }, [R]),
    ee = n.useMemo(() => {
      if (!u) return new Map();
      const t = new Map();
      for (const s of D) t.set(s.id, ve(s.id, R));
      return t;
    }, [u, D, ve, R]),
    J = n.useMemo(() => {
      const t = new Map();
      for (const s of K || []) {
        const m = s.customerId;
        if (!m) continue;
        const o = t.get(m) || [];
        (o.push(s), t.set(m, o));
      }
      return t;
    }, [K]),
    xe = n.useMemo(() => {
      const t = new Map();
      for (const s of U || []) {
        const m = new Set();
        s.customerId && m.add(s.customerId);
        for (const o of s.involvedCustomerIds || []) m.add(o);
        for (const o of m) {
          const a = t.get(o) || [];
          (a.push(s), t.set(o, a));
        }
      }
      return t;
    }, [U]),
    Ye = n.useMemo(() => {
      const t = new Map();
      for (const s of R || []) {
        const m = s.customerId;
        if (!m) continue;
        const o = t.get(m) || { totals: {}, lastTxAt: null };
        if (
          ((o.totals[s.type] = (o.totals[s.type] || 0) + Number(s.amount || 0)),
          s.date)
        ) {
          const a = new Date(s.date);
          Number.isNaN(a.getTime()) ||
            (o.lastTxAt = o.lastTxAt ? (a > o.lastTxAt ? a : o.lastTxAt) : a);
        }
        t.set(m, o);
      }
      return t;
    }, [R]),
    Ze = n.useMemo(() => {
      const t = new Map(),
        s = Date.now(),
        m = (o) => {
          const a = String(o.status || "").trim();
          return !(
            a === String(nt.Pending) ||
            a === "Pending" ||
            a === "Draft" ||
            a === "Submitted" ||
            a === String(nt.Cancelled) ||
            a === "Cancelled" ||
            a === "Canceled"
          );
        },
        o = (a) => {
          const d = a.status;
          if (d !== nt.Processing && d !== nt.QualityCheck) return !1;
          const b = new Date(a.creationDate || "").getTime();
          return !b || Number.isNaN(b)
            ? !1
            : (s - b) / (1e3 * 60 * 60 * 24) >= 14;
        };
      for (const a of D) {
        const d = a.id,
          b = ee.get(d) || 0,
          i = z.get(d) || [],
          k = J.get(d) || [],
          j = i.filter((p) => {
            const g = String(p.status || "");
            return g === "Delivered" || g === "Completed" || !!p.actualDelivery
              ? !1
              : !String(p.trackingUrl || "").trim();
          }).length,
          se = k.filter(
            (p) => Number(p.volumeM3 || 0) <= 0 || Number(p.weightKG || 0) <= 0,
          ).length,
          c = k.filter((p) => {
            if (!m(p)) return !1;
            const g = Rt.get(p.id);
            if (g)
              return (
                !g.hasActiveOrderCost ||
                (g.hadServiceFeeActivity && !g.hasActiveServiceFee)
              );
            return p.chargesApplied !== !0;
          }).length,
          l = k.filter(o).length;
        t.set(d, {
          negativeBalance: b < 0,
          missingTracking: j,
          missingDims: se,
          chargesNotApplied: c,
          stuckOrders: l,
        });
      }
      return t;
    }, [D, ee, z, J, Rt]),
    y = n.useMemo(() => {
      if (!u) return { rows: [], total: 0, totalPages: 1, page: 1, all: [] };
      const t = (c) => c.toLowerCase(),
        s = t($.trim()),
        o = D.map((c) => {
          const p = ee.get(c.id) || 0,
            g = z.get(c.id) || [],
            l = J.get(c.id) || [],
            E = xe.get(c.id) || [],
            ft = Ze.get(c.id) || {
              negativeBalance: !1,
              missingTracking: 0,
              missingDims: 0,
              chargesNotApplied: 0,
              stuckOrders: 0,
            },
            pe = Ye.get(c.id) || { totals: {}, lastTxAt: null },
            yt = (h) => {
              const x = String(h.status || "").trim();
              return !!(
                x === "Delivered" ||
                x === "Completed" ||
                x === "Cancelled" ||
                x === "Canceled" ||
                h.actualDelivery
              );
            },
            vt = (h) => {
              const x = String(h.status || "").trim();
              return !!(
                x === "Delivered" ||
                x === "Completed" ||
                h.actualDelivery
              );
            },
            jt = g.filter((h) => !yt(h)).length,
            Nt = g.filter((h) => vt(h)).length,
            wt = (() => {
              const h = [];
              pe.lastTxAt && h.push(pe.lastTxAt);
              for (const x of g) {
                const T = x.actualDelivery ? new Date(x.actualDelivery) : null,
                  he = x.shippingDate ? new Date(x.shippingDate) : null;
                (T && !Number.isNaN(T.getTime()) && h.push(T),
                  he && !Number.isNaN(he.getTime()) && h.push(he));
              }
              for (const x of l) {
                const T = x.creationDate ? new Date(x.creationDate) : null;
                T && !Number.isNaN(T.getTime()) && h.push(T);
              }
              return h.length
                ? h.reduce((x, T) => (T > x ? T : x), h[0])
                : null;
            })();
          return {
            customer: c,
            balance: p,
            openShipments: jt,
            deliveredShipments: Nt,
            shipmentsTotal: g.length,
            ordersTotal: l.length,
            consolidationsTotal: E.length,
            exceptions: ft,
            txTotals: pe.totals,
            lastActivityAt: wt,
          };
        }).filter((c) => {
          const p = isAdminRecord(c.customer);
          if (
            !p &&
            ((F !== "all" && c.customer.contractType !== F) ||
              (O === "due" && c.balance >= 0) ||
              (O === "credit" && c.balance < 0))
          )
            return !1;
          if (!p && S !== "all") {
            const g = c.exceptions;
            if (
              (S === "negative_balance" && !g.negativeBalance) ||
              (S === "missing_tracking" && g.missingTracking <= 0) ||
              (S === "missing_dims" && g.missingDims <= 0) ||
              (S === "charges_not_applied" && g.chargesNotApplied <= 0) ||
              (S === "stuck" && g.stuckOrders <= 0)
            )
              return !1;
          }
          return s
            ? [
                c.customer.companyName,
                c.customer.contactPerson,
                c.customer.email,
                c.customer.phone || "",
                c.customer.id,
              ]
                .map(t)
                .join(" ")
                .includes(s)
            : !0;
        }),
        a = A === "asc" ? 1 : -1,
        d = [...o].sort((c, p) => {
          const g = c.customer,
            l = p.customer;
          return P === "balance"
            ? (c.balance - p.balance) * a
            : P === "shipments"
              ? (c.shipmentsTotal - p.shipmentsTotal) * a
              : P === "contact"
                ? g.contactPerson.localeCompare(l.contactPerson) * a
                : g.companyName.localeCompare(l.companyName) * a;
        }),
        b = d.length,
        i = Math.max(1, Math.ceil(b / ge)),
        k = Math.max(1, Math.min(i, Q)),
        j = (k - 1) * ge;
      return {
        rows: d.slice(j, j + ge),
        total: b,
        totalPages: i,
        page: k,
        all: d,
      };
    }, [u, D, ee, z, J, xe, Ze, Ye, F, O, S, $, P, A, Q]),
    te = n.useMemo(() => {
      var t;
      return u
        ? L && D.some((s) => s.id === L)
          ? L
          : ((t = y.all[0]) == null ? void 0 : t.customer.id) || null
        : null;
    }, [u, L, D, y.all]),
    r = n.useMemo(
      () =>
        !u || !te ? null : y.all.find((t) => t.customer.id === te) || null,
      [u, y.all, te],
    ),
    bt = (t) => {
      (Ve(t), X(!0));
    },
    Qe = (t) => {
      (_e(t.contactPerson),
        Ee(t.email),
        Fe(t.companyName),
        Oe(t.phone || ""),
        Le(t.address || ""),
        qe(t.notes || ""),
        $e(t.contractType),
        Z(t.id),
        V(!0));
    },
    Xe = async (t, s) => {
      var m;
      if (t != null && t.id && t.contractType !== s) {
        Je(t.id);
        try {
          (await Promise.resolve(je(t.id, { contractType: s })),
            gt(
              "Contract Updated",
              `${t.companyName} is now on ${((m = v[s]) == null ? void 0 : m.name) || s}.`,
            ));
        } catch (o) {
          const a = o instanceof Error ? o.message : String(o);
          M("Update Failed", `Could not change plan: ${a}`);
        } finally {
          Je(null);
        }
      }
    },
    lr = async (t) => {
      if (!u || !(t != null && t.id)) return;
      setMagicLinkLoadingId(t.id);
      try {
        const s = await Promise.resolve(wt(t.id));
        if (!s || !String(s).trim())
          throw new Error("Magic link was not returned.");
        const m = String(s).trim(),
          o = await at(m);
        (setMagicLinkByCustomer((a) => ({ ...a, [t.id]: m })),
          o
            ? gt(
                "Magic Link Ready",
                `Magic link for ${t.companyName} copied to clipboard.`,
              )
            : gt(
                "Magic Link Ready",
                "Link generated. Use Copy Magic Link to copy it manually.",
              ));
      } catch (s) {
        const m = s instanceof Error ? s.message : String(s);
        M("Magic Link Error", m || "Failed to generate magic link.");
      } finally {
        setMagicLinkLoadingId(null);
      }
    },
    Pr = async (t) => {
      const s = magicLinkByCustomer[t];
      if (!s) return;
      const m = await at(s);
      m
        ? gt("Copied", "Magic link copied to clipboard.")
        : M("Copy Failed", "Could not copy magic link automatically.");
    };
  return u
    ? u
      ? e.jsx("div", {
          className:
            "min-h-screen bg-[radial-gradient(1200px_circle_at_10%_10%,rgba(16,185,129,0.10),transparent_50%),radial-gradient(900px_circle_at_90%_0%,rgba(14,165,233,0.12),transparent_45%),linear-gradient(to_bottom,#f8fafc,#f3f4f6)]",
          children: e.jsxs("div", {
            className: "px-4 sm:px-6 lg:px-8 py-6 space-y-6",
            children: [
              e.jsx(kt, {
                title: "Customers",
                subtitle: "Manage customer accounts, contracts, and balances.",
                icon: e.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: e.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
                  }),
                }),
              }),
              e.jsxs("div", {
                className:
                  "bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-200 overflow-hidden",
                children: [
                  e.jsxs("div", {
                    className:
                      "p-5 border-b border-gray-200 bg-gradient-to-r from-white to-slate-50",
                    children: [
                      e.jsxs("div", {
                        className:
                          "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3",
                        children: [
                          e.jsxs("div", {
                            children: [
                              e.jsx("h2", {
                                className:
                                  "text-2xl font-black tracking-tight text-gray-900",
                                children: "Browse Customers",
                              }),
                              e.jsx("p", {
                                className: "text-sm text-gray-600",
                                children:
                                  "Search, filter, and open details without losing your place.",
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className: "flex items-center gap-3",
                            children: [
                              e.jsxs("div", {
                                className: "text-sm text-gray-500",
                                children: [
                                  "Showing: ",
                                  y.total,
                                  " ",
                                  roleScope === "admins"
                                    ? "admins"
                                    : roleScope === "all"
                                      ? "records"
                                      : "customers",
                                ],
                              }),
                              e.jsx(I, {
                                type: "button",
                                onClick: () => G(!0),
                                variant: "default",
                                children: "Add Customer",
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className:
                          "mt-4 grid grid-cols-1 lg:grid-cols-12 gap-3",
                        children: [
                          e.jsx("div", {
                            className: "lg:col-span-5",
                            children: e.jsxs("div", {
                              className: "relative",
                              children: [
                                e.jsx("input", {
                                  value: $,
                                  onChange: (t) => {
                                    (Re(t.target.value), _(1));
                                  },
                                  className:
                                    "w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none",
                                  placeholder:
                                    "Search name, company, email, phone...",
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
                              "lg:col-span-7 grid grid-cols-2 sm:grid-cols-6 gap-2",
                            children: [
                              e.jsxs("select", {
                                value: roleScope,
                                onChange: (t) => {
                                  const s = t.target.value;
                                  (setRoleScope(s),
                                    s === "admins" &&
                                      (Ke("all"), Ue("all"), We("all")),
                                    _(1));
                                },
                                className:
                                  "px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800",
                                children: [
                                  e.jsx("option", {
                                    value: "customers",
                                    children: "Customers",
                                  }),
                                  e.jsx("option", {
                                    value: "admins",
                                    children: "Admins",
                                  }),
                                  e.jsx("option", {
                                    value: "all",
                                    children: "All Roles",
                                  }),
                                ],
                              }),
                              e.jsxs("select", {
                                value: F,
                                onChange: (t) => {
                                  (Ke(t.target.value), _(1));
                                },
                                disabled: roleScope === "admins",
                                className:
                                  "px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800",
                                children: [
                                  e.jsx("option", {
                                    value: "all",
                                    children: "All Contracts",
                                  }),
                                  Object.values(N).map((t) =>
                                    e.jsx(
                                      "option",
                                      { value: t, children: v[t].name },
                                      t,
                                    ),
                                  ),
                                ],
                              }),
                              e.jsxs("select", {
                                value: O,
                                onChange: (t) => {
                                  (Ue(t.target.value), _(1));
                                },
                                disabled: roleScope === "admins",
                                className:
                                  "px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800",
                                children: [
                                  e.jsx("option", {
                                    value: "all",
                                    children: "All Balances",
                                  }),
                                  e.jsx("option", {
                                    value: "due",
                                    children: "Balance Due",
                                  }),
                                  e.jsx("option", {
                                    value: "credit",
                                    children: "In Credit",
                                  }),
                                ],
                              }),
                              e.jsxs("select", {
                                value: S,
                                onChange: (t) => {
                                  (We(t.target.value), _(1));
                                },
                                disabled: roleScope === "admins",
                                className:
                                  "px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800",
                                title: "Exceptions",
                                children: [
                                  e.jsx("option", {
                                    value: "all",
                                    children: "All customers",
                                  }),
                                  e.jsx("option", {
                                    value: "negative_balance",
                                    children: "Negative balance",
                                  }),
                                  e.jsx("option", {
                                    value: "missing_tracking",
                                    children: "Missing tracking",
                                  }),
                                  e.jsx("option", {
                                    value: "missing_dims",
                                    children: "Missing volume/weight",
                                  }),
                                  e.jsx("option", {
                                    value: "charges_not_applied",
                                    children: "Charges not applied",
                                  }),
                                  e.jsx("option", {
                                    value: "stuck",
                                    children: "Stuck status (14d+)",
                                  }),
                                ],
                              }),
                              e.jsxs("select", {
                                value: P,
                                onChange: (t) => He(t.target.value),
                                className:
                                  "px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800",
                                children: [
                                  e.jsx("option", {
                                    value: "company",
                                    children: "Sort: Company",
                                  }),
                                  e.jsx("option", {
                                    value: "contact",
                                    children: "Sort: Contact",
                                  }),
                                  e.jsx("option", {
                                    value: "balance",
                                    children: "Sort: Balance",
                                  }),
                                  e.jsx("option", {
                                    value: "shipments",
                                    children: "Sort: Shipments",
                                  }),
                                ],
                              }),
                              e.jsx("button", {
                                type: "button",
                                onClick: () =>
                                  Ge((t) => (t === "asc" ? "desc" : "asc")),
                                className:
                                  "px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 hover:bg-gray-50",
                                title: "Toggle sort direction",
                                children: A === "asc" ? "Asc" : "Desc",
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
                            y.rows.length === 0
                              ? e.jsxs("div", {
                                  className: "p-8 text-center text-gray-600",
                                  children: [
                                    e.jsx("div", {
                                      className:
                                        "text-sm font-semibold text-gray-900",
                                      children:
                                        roleScope === "admins"
                                          ? "No admins match these filters."
                                          : roleScope === "all"
                                            ? "No records match these filters."
                                            : "No customers match these filters.",
                                    }),
                                    e.jsx("div", {
                                      className: "text-xs text-gray-500 mt-1",
                                      children:
                                        "Try clearing filters or adjusting your search.",
                                    }),
                                  ],
                                })
                              : e.jsx("div", {
                                  className: "space-y-2",
                                  children: y.rows.map((t) => {
                                    var d;
                                    const s = t.customer,
                                      m = te === s.id,
                                      o = t.balance,
                                      a = t.exceptions,
                                      p = isAdminRecord(s);
                                    return e.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        onClick: () => bt(s.id),
                                        className: `w-full text-left p-3 rounded-xl border transition-colors ${m ? "border-emerald-300 bg-emerald-50" : "border-gray-200 bg-white hover:bg-gray-50"}`,
                                        children: e.jsxs("div", {
                                          className:
                                            "flex items-start justify-between gap-3",
                                          children: [
                                            e.jsxs("div", {
                                              className: "min-w-0",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "text-sm font-black text-gray-900 truncate",
                                                  children: s.companyName,
                                                }),
                                                e.jsxs("div", {
                                                  className:
                                                    "text-xs text-gray-600 truncate",
                                                  children: [
                                                    s.contactPerson,
                                                    " Â· ",
                                                    s.email,
                                                  ],
                                                }),
                                                s.phone &&
                                                  e.jsx("div", {
                                                    className:
                                                      "text-[11px] text-gray-500 truncate",
                                                    children: s.phone,
                                                  }),
                                                e.jsxs("div", {
                                                  className:
                                                    "mt-2 flex flex-wrap gap-2 items-center",
                                                  children: [
                                                    p
                                                      ? e.jsx(be, {
                                                          className:
                                                            "px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-slate-200 text-slate-800",
                                                          children: "Admin",
                                                        })
                                                      : e.jsx(be, {
                                                          className: `${fe[s.contractType]} px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide`,
                                                          children:
                                                            ((d =
                                                              v[s.contractType]) ==
                                                            null
                                                              ? void 0
                                                              : d.name) ||
                                                            s.contractType,
                                                        }),
                                                    p
                                                      ? e.jsx("span", {
                                                          className:
                                                            "text-[11px] font-semibold text-slate-600",
                                                          children:
                                                            "Platform administrator",
                                                        })
                                                      : e.jsxs("span", {
                                                          className: `text-[11px] font-bold ${o < 0 ? "text-red-700" : "text-emerald-700"}`,
                                                          children: [
                                                            o < 0
                                                              ? "Due"
                                                              : "Credit",
                                                            " $",
                                                            Math.abs(o).toFixed(
                                                              0,
                                                            ),
                                                          ],
                                                        }),
                                                    !p &&
                                                      e.jsxs("span", {
                                                        className:
                                                          "text-[11px] font-semibold text-gray-600",
                                                        children: [
                                                          "Open shipments: ",
                                                          t.openShipments,
                                                        ],
                                                      }),
                                                    !p &&
                                                    u &&
                                                    (a == null
                                                      ? void 0
                                                      : a.missingTracking) > 0
                                                      ? e.jsxs("span", {
                                                          className:
                                                            "text-[11px] font-semibold text-orange-800 bg-orange-50 border border-orange-200 rounded-full px-2 py-0.5",
                                                          children: [
                                                            "Missing tracking: ",
                                                            a.missingTracking,
                                                          ],
                                                        })
                                                      : null,
                                                    !p &&
                                                    u &&
                                                    (a == null
                                                      ? void 0
                                                      : a.chargesNotApplied) > 0
                                                      ? e.jsxs("span", {
                                                          className:
                                                            "text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5",
                                                          children: [
                                                            "Charges not applied: ",
                                                            a.chargesNotApplied,
                                                          ],
                                                        })
                                                      : null,
                                                    !p &&
                                                    u &&
                                                    (a == null
                                                      ? void 0
                                                      : a.missingDims) > 0
                                                      ? e.jsxs("span", {
                                                          className:
                                                            "text-[11px] font-semibold text-sky-800 bg-sky-50 border border-sky-200 rounded-full px-2 py-0.5",
                                                          children: [
                                                            "Missing dims: ",
                                                            a.missingDims,
                                                          ],
                                                        })
                                                      : null,
                                                    !p &&
                                                    u &&
                                                    (a == null
                                                      ? void 0
                                                      : a.stuckOrders) > 0
                                                      ? e.jsxs("span", {
                                                          className:
                                                            "text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 rounded-full px-2 py-0.5",
                                                          children: [
                                                            "Stuck: ",
                                                            a.stuckOrders,
                                                          ],
                                                        })
                                                      : null,
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsxs("div", {
                                              className:
                                                "flex flex-col items-end gap-2 flex-shrink-0",
                                              children: [
                                                e.jsx("span", {
                                                  className:
                                                    "text-[10px] font-semibold text-gray-500",
                                                  children: "ID",
                                                }),
                                                e.jsx("span", {
                                                  className:
                                                    "text-[11px] font-bold text-gray-900",
                                                  children: re(
                                                    s.id,
                                                    "customer",
                                                  ),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      },
                                      s.id,
                                    );
                                  }),
                                }),
                            y.totalPages > 1 &&
                              e.jsxs("div", {
                                className:
                                  "mt-4 flex items-center justify-between",
                                children: [
                                  e.jsx("button", {
                                    type: "button",
                                    onClick: () => _((t) => Math.max(1, t - 1)),
                                    className:
                                      "px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-50",
                                    disabled: y.page <= 1,
                                    children: "Prev",
                                  }),
                                  e.jsxs("div", {
                                    className:
                                      "text-xs font-semibold text-gray-600",
                                    children: [
                                      "Page ",
                                      y.page,
                                      " of ",
                                      y.totalPages,
                                    ],
                                  }),
                                  e.jsx("button", {
                                    type: "button",
                                    onClick: () =>
                                      _((t) => Math.min(y.totalPages, t + 1)),
                                    className:
                                      "px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-50",
                                    disabled: y.page >= y.totalPages,
                                    children: "Next",
                                  }),
                                ],
                              }),
                          ],
                        }),
                      }),
                      e.jsx("div", {
                        className: "hidden lg:block lg:col-span-7 p-5",
                        children: r
                          ? e.jsxs("div", {
                              className:
                                "bg-white rounded-2xl border border-gray-200 shadow-sm p-5",
                              children: [
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
                                          children:
                                            (r.customer.role ||
                                              St.Customer) === St.Admin
                                              ? "Admin Account"
                                              : "Customer",
                                        }),
                                        e.jsx("div", {
                                          className:
                                            "text-2xl font-black text-gray-900 truncate",
                                          children: r.customer.companyName,
                                        }),
                                        e.jsx("div", {
                                          className: "text-sm text-gray-700",
                                          children: r.customer.contactPerson,
                                        }),
                                        e.jsx("div", {
                                          className: "text-sm text-gray-600",
                                          children: r.customer.email,
                                        }),
                                        r.customer.phone &&
                                          e.jsx("div", {
                                            className: "text-sm text-gray-600",
                                            children: r.customer.phone,
                                          }),
                                        r.customer.address &&
                                          e.jsx("div", {
                                            className:
                                              "text-xs text-gray-500 mt-2 whitespace-pre-wrap",
                                            children: r.customer.address,
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className:
                                        "flex flex-col items-end gap-2",
                                      children: [
                                        (r.customer.role || St.Customer) ===
                                        St.Admin
                                          ? e.jsx(be, {
                                              className:
                                                "px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-slate-200 text-slate-800",
                                              children: "Admin",
                                            })
                                          : e.jsx(be, {
                                              className: `${fe[r.customer.contractType]} px-3 py-1 rounded-full text-xs font-semibold tracking-wide`,
                                              children:
                                                ((et =
                                                  v[r.customer.contractType]) ==
                                                null
                                                  ? void 0
                                                  : et.name) ||
                                                r.customer.contractType,
                                            }),
                                        (r.customer.role || St.Customer) ===
                                          St.Customer &&
                                          e.jsxs("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                              e.jsx("label", {
                                                htmlFor:
                                                  "quickContractTypeDesktop",
                                                className:
                                                  "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                                children: "Plan",
                                              }),
                                              e.jsx("select", {
                                                id: "quickContractTypeDesktop",
                                                value: r.customer.contractType,
                                                onChange: (t) => {
                                                  Xe(
                                                    r.customer,
                                                    t.target.value,
                                                  );
                                                },
                                                disabled: ze === r.customer.id,
                                                className:
                                                  "h-8 rounded-lg border border-gray-200 bg-white px-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:opacity-60",
                                                children: Object.values(
                                                  N,
                                                ).map((t) =>
                                                  e.jsx(
                                                    "option",
                                                    {
                                                      value: t,
                                                      children: v[t].name,
                                                    },
                                                    t,
                                                  ),
                                                ),
                                              }),
                                            ],
                                          }),
                                        e.jsx("button", {
                                          type: "button",
                                          onClick: () => at(r.customer.id),
                                          className:
                                            "px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50",
                                          title: "Copy full ID",
                                          children: "Copy ID",
                                        }),
                                        (r.customer.role || St.Customer) ===
                                          St.Customer &&
                                          e.jsx("button", {
                                            type: "button",
                                            onClick: () => lr(r.customer),
                                            disabled:
                                              magicLinkLoadingId ===
                                              r.customer.id,
                                            className:
                                              "px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 disabled:opacity-60",
                                            children:
                                              magicLinkLoadingId ===
                                              r.customer.id
                                                ? "Generating..."
                                                : "Create Magic Link",
                                          }),
                                      ],
                                    }),
                                  ],
                                }),
                                magicLinkByCustomer[r.customer.id] &&
                                  e.jsxs("div", {
                                    className:
                                      "mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-[11px] font-semibold text-emerald-800 uppercase tracking-wide",
                                        children: "Latest Magic Link",
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "mt-1 text-xs text-emerald-900 break-all",
                                        children:
                                          magicLinkByCustomer[r.customer.id],
                                      }),
                                      e.jsx("div", {
                                        className: "mt-2",
                                        children: e.jsx("button", {
                                          type: "button",
                                          onClick: () => Pr(r.customer.id),
                                          className:
                                            "px-3 py-1.5 rounded-lg border border-emerald-300 bg-white text-xs font-semibold text-emerald-800 hover:bg-emerald-100",
                                          children: "Copy Magic Link",
                                        }),
                                      }),
                                    ],
                                  }),
                                e.jsxs("div", {
                                  className: "mt-5 grid grid-cols-2 gap-3",
                                  children: [
                                    e.jsxs("div", {
                                      className:
                                        "p-3 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-slate-50",
                                      children: [
                                        e.jsx("div", {
                                          className:
                                            "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                          children:
                                            (r.customer.role ||
                                              St.Customer) === St.Admin
                                              ? "Role"
                                              : "Balance",
                                        }),
                                        (r.customer.role || St.Customer) ===
                                        St.Admin
                                          ? e.jsx("div", {
                                              className:
                                                "text-sm sm:text-lg font-black leading-tight text-slate-800",
                                              children: "Administrator",
                                            })
                                          : e.jsxs("div", {
                                              className: `text-sm sm:text-lg font-black leading-tight break-all [overflow-wrap:anywhere] ${r.balance < 0 ? "text-red-700" : "text-emerald-700"}`,
                                              children: [
                                                r.balance < 0 ? "-" : "+",
                                                "$",
                                                Math.abs(
                                                  r.balance,
                                                ).toLocaleString(void 0, {
                                                  minimumFractionDigits: 2,
                                                  maximumFractionDigits: 2,
                                                }),
                                              ],
                                            }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className:
                                        "p-3 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-slate-50",
                                      children: [
                                        e.jsx("div", {
                                          className:
                                            "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                          children:
                                            (r.customer.role ||
                                              St.Customer) === St.Admin
                                              ? "Scope"
                                              : "Shipments",
                                        }),
                                        (r.customer.role || St.Customer) ===
                                        St.Admin
                                          ? e.jsx("div", {
                                              className:
                                                "text-lg font-black text-gray-900",
                                              children: "Platform Access",
                                            })
                                          : e.jsx("div", {
                                              className:
                                                "text-lg font-black text-gray-900",
                                              children: r.shipmentsTotal,
                                            }),
                                        (r.customer.role || St.Customer) ===
                                        St.Admin
                                          ? e.jsx("div", {
                                              className: "text-xs text-gray-600",
                                              children:
                                                "Customer shipment metrics are hidden for admins.",
                                            })
                                          : e.jsxs("div", {
                                              className: "text-xs text-gray-600",
                                              children: [
                                                "Open: ",
                                                r.openShipments,
                                                " Â· Delivered: ",
                                                r.deliveredShipments,
                                              ],
                                            }),
                                      ],
                                    }),
                                  ],
                                }),
                                e.jsxs("div", {
                                  className: "mt-3 grid grid-cols-2 gap-3",
                                  children: [
                                    e.jsxs("div", {
                                      className:
                                        "p-3 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-slate-50",
                                      children: [
                                        e.jsx("div", {
                                          className:
                                            "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                          children:
                                            (r.customer.role ||
                                              St.Customer) === St.Admin
                                              ? "Customer Data"
                                              : "Orders",
                                        }),
                                        (r.customer.role || St.Customer) ===
                                        St.Admin
                                          ? e.jsx("div", {
                                              className:
                                                "text-sm font-semibold text-gray-700",
                                              children:
                                                "Not applicable for admin accounts",
                                            })
                                          : e.jsx("div", {
                                              className:
                                                "text-lg font-black text-gray-900",
                                              children: r.ordersTotal,
                                            }),
                                        (r.customer.role || St.Customer) ===
                                        St.Admin
                                          ? e.jsx("div", {
                                              className: "text-xs text-gray-600",
                                              children:
                                                "Billing and operational metrics are customer-only.",
                                            })
                                          : ((tt = r.exceptions) == null
                                                ? void 0
                                                : tt.chargesNotApplied) > 0
                                            ? e.jsxs("div", {
                                                className:
                                                  "text-xs text-amber-800 font-semibold",
                                                children: [
                                                  "Charges not applied: ",
                                                  r.exceptions
                                                    .chargesNotApplied,
                                                ],
                                              })
                                            : e.jsx("div", {
                                                className:
                                                  "text-xs text-gray-600",
                                                children: "OK",
                                              }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className:
                                        "p-3 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-slate-50",
                                      children: [
                                        e.jsx("div", {
                                          className:
                                            "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                          children:
                                            (r.customer.role ||
                                              St.Customer) === St.Admin
                                              ? "Status"
                                              : "Consolidations",
                                        }),
                                        (r.customer.role || St.Customer) ===
                                        St.Admin
                                          ? e.jsx("div", {
                                              className:
                                                "text-lg font-black text-gray-900",
                                              children: "Active",
                                            })
                                          : e.jsx("div", {
                                              className:
                                                "text-lg font-black text-gray-900",
                                              children:
                                                r.consolidationsTotal,
                                            }),
                                        (r.customer.role || St.Customer) ===
                                        St.Admin
                                          ? e.jsx("div", {
                                              className: "text-xs text-gray-600",
                                              children:
                                                "Admin records are separated from customer billing views.",
                                            })
                                          : ((st = r.exceptions) == null
                                                ? void 0
                                                : st.missingTracking) > 0
                                            ? e.jsxs("div", {
                                                className:
                                                  "text-xs text-orange-800 font-semibold",
                                                children: [
                                                  "Missing tracking: ",
                                                  r.exceptions.missingTracking,
                                                ],
                                              })
                                            : e.jsx("div", {
                                                className:
                                                  "text-xs text-gray-600",
                                                children: "OK",
                                              }),
                                      ],
                                    }),
                                  ],
                                }),
                                u &&
                                  (r.customer.role || St.Customer) ===
                                    St.Customer &&
                                  e.jsxs("div", {
                                    className: "mt-4 flex flex-wrap gap-2",
                                    children: [
                                      e.jsx(I, {
                                        type: "button",
                                        variant: "outline",
                                        size: "sm",
                                        onClick: () => {
                                          try {
                                            localStorage.setItem(
                                              "bundleist_nav_intent",
                                              JSON.stringify({
                                                page: "payments",
                                                adminCustomerFilter:
                                                  r.customer.id,
                                                forceCustomerLens: !0,
                                                resetFilters: !0,
                                              }),
                                            );
                                          } catch {}
                                          w("payments");
                                        },
                                        children: "Payments",
                                      }),
                                      e.jsx(I, {
                                        type: "button",
                                        variant: "outline",
                                        size: "sm",
                                        onClick: () => {
                                          try {
                                            localStorage.setItem(
                                              "bundleist_nav_intent",
                                              JSON.stringify({
                                                page: "orders",
                                                adminCustomerFilter:
                                                  r.customer.id,
                                                searchTerm: "",
                                                statusFilter: "",
                                              }),
                                            );
                                          } catch {}
                                          w("orders");
                                        },
                                        children: "Orders",
                                      }),
                                      e.jsx(I, {
                                        type: "button",
                                        variant: "outline",
                                        size: "sm",
                                        onClick: () => {
                                          try {
                                            localStorage.setItem(
                                              "bundleist_nav_intent",
                                              JSON.stringify({
                                                page: "shipments",
                                                customerId: r.customer.id,
                                              }),
                                            );
                                          } catch {}
                                          w("shipments");
                                        },
                                        children: "Shipments",
                                      }),
                                      e.jsx(I, {
                                        type: "button",
                                        variant: "outline",
                                        size: "sm",
                                        onClick: () => {
                                          try {
                                            localStorage.setItem(
                                              "bundleist_nav_intent",
                                              JSON.stringify({
                                                page: "consolidations",
                                                adminCustomerFilter:
                                                  r.customer.id,
                                                searchTerm: "",
                                                statusFilter: "",
                                              }),
                                            );
                                          } catch {}
                                          w("consolidations");
                                        },
                                        children: "Consolidations",
                                      }),
                                    ],
                                  }),
                                u &&
                                  (r.customer.role || St.Customer) ===
                                    St.Customer &&
                                  e.jsx("div", {
                                    className: "mt-4",
                                    children: (() => {
                                      const t = r.customer.id,
                                        s = (J.get(t) || [])
                                          .slice()
                                          .sort(
                                            (l, E) =>
                                              new Date(
                                                E.creationDate,
                                              ).getTime() -
                                              new Date(
                                                l.creationDate,
                                              ).getTime(),
                                          )
                                          .slice(0, 8),
                                        m = (xe.get(t) || [])
                                          .slice()
                                          .sort(
                                            (l, E) =>
                                              new Date(
                                                E.creationDate,
                                              ).getTime() -
                                              new Date(
                                                l.creationDate,
                                              ).getTime(),
                                          )
                                          .slice(0, 6),
                                        o = (z.get(t) || [])
                                          .slice()
                                          .sort(
                                            (l, E) =>
                                              new Date(
                                                E.shippingDate,
                                              ).getTime() -
                                              new Date(
                                                l.shippingDate,
                                              ).getTime(),
                                          )
                                          .slice(0, 6),
                                        a = s.map((l) => ({
                                          id: l.id,
                                          label: re(l.id, "order"),
                                          subtitle: `${l.status} Â· $${Math.round(Number(l.value || 0)).toLocaleString()}`,
                                          onClick: () => {
                                            try {
                                              localStorage.setItem(
                                                "bundleist_nav_intent",
                                                JSON.stringify({
                                                  page: "orders",
                                                  orderId: l.id,
                                                }),
                                              );
                                            } catch {}
                                            w("orders");
                                          },
                                        })),
                                        d = m.map((l) => ({
                                          id: l.id,
                                          label: re(l.id, "consolidation"),
                                          subtitle: `${l.status} Â· ${l.route}`,
                                          onClick: () => {
                                            try {
                                              localStorage.setItem(
                                                "bundleist_nav_intent",
                                                JSON.stringify({
                                                  page: "consolidations",
                                                  consolidationId: l.id,
                                                }),
                                              );
                                            } catch {}
                                            w("consolidations");
                                          },
                                        })),
                                        b = o.map((l) => ({
                                          id: l.id,
                                          label: re(l.id, "shipment"),
                                          subtitle: `${l.type} Â· ${String(l.status)}`,
                                          onClick: () => {
                                            try {
                                              localStorage.setItem(
                                                "bundleist_nav_intent",
                                                JSON.stringify({
                                                  page: "shipments",
                                                  shipmentId: l.id,
                                                }),
                                              );
                                            } catch {}
                                            w("shipments");
                                          },
                                        })),
                                        i = r.txTotals || {},
                                        k = Math.abs(
                                          Number(i[B.IncomingPayment] || 0),
                                        ),
                                        j = Math.abs(
                                          Number(i[B.RefundPayout] || 0),
                                        ),
                                        se = Math.abs(
                                          Number(i[B.OrderCost] || 0),
                                        ),
                                        c = Math.abs(
                                          Number(i[B.ServiceFee] || 0),
                                        ),
                                        p = Math.abs(
                                          Number(i[B.ShippingCost] || 0),
                                        ),
                                        g = Math.abs(
                                          Number(i[B.MiscellaneousCost] || 0),
                                        );
                                      return e.jsx(Tt, {
                                        orders: a,
                                        consolidations: d,
                                        shipments: b,
                                        ledger: {
                                          net: Number(r.balance || 0),
                                          summary: [
                                            {
                                              label: "Incoming",
                                              value: `$${k.toLocaleString(void 0, { maximumFractionDigits: 2 })}`,
                                            },
                                            {
                                              label: "Order cost",
                                              value: `$${se.toLocaleString(void 0, { maximumFractionDigits: 2 })}`,
                                            },
                                            {
                                              label: "Service fee",
                                              value: `$${c.toLocaleString(void 0, { maximumFractionDigits: 2 })}`,
                                            },
                                            {
                                              label: "Shipping",
                                              value: `$${p.toLocaleString(void 0, { maximumFractionDigits: 2 })}`,
                                            },
                                            {
                                              label: "Misc",
                                              value: `$${g.toLocaleString(void 0, { maximumFractionDigits: 2 })}`,
                                            },
                                            {
                                              label: "Refunds",
                                              value: `$${j.toLocaleString(void 0, { maximumFractionDigits: 2 })}`,
                                            },
                                          ],
                                          onViewPayments: () => {
                                            try {
                                              localStorage.setItem(
                                                "bundleist_nav_intent",
                                                JSON.stringify({
                                                  page: "payments",
                                                  adminCustomerFilter: t,
                                                  forceCustomerLens: !0,
                                                  resetFilters: !0,
                                                }),
                                              );
                                            } catch {}
                                            w("payments");
                                          },
                                        },
                                      });
                                    })(),
                                  }),
                                r.customer.notes &&
                                  e.jsxs("div", {
                                    className:
                                      "mt-4 p-3 rounded-xl border border-amber-200 bg-amber-50",
                                    children: [
                                      e.jsx("div", {
                                        className:
                                          "text-[11px] font-semibold text-amber-800 uppercase tracking-wide",
                                        children: "Internal Notes",
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "text-sm text-amber-900 mt-1 whitespace-pre-wrap",
                                        children: r.customer.notes,
                                      }),
                                    ],
                                  }),
                                e.jsx("div", {
                                  className: "mt-5 flex flex-wrap gap-2",
                                  children: e.jsx(I, {
                                    type: "button",
                                    size: "xs",
                                    variant: "default",
                                    onClick: () => Qe(r.customer),
                                    children: "Edit",
                                  }),
                                }),
                              ],
                            })
                          : e.jsx("div", {
                              className: "p-10 text-center text-gray-600",
                              children: "Select a customer to see details.",
                            }),
                      }),
                    ],
                  }),
                ],
              }),
              ht &&
                r &&
                e.jsxs("div", {
                  className: "fixed inset-0 z-50 lg:hidden",
                  children: [
                    e.jsx("div", {
                      className: "absolute inset-0 bg-black/30",
                      onClick: () => X(!1),
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
                                  children:
                                    (r.customer.role || St.Customer) ===
                                    St.Admin
                                      ? "Admin Account"
                                      : "Customer",
                                }),
                                e.jsx("div", {
                                  className:
                                    "text-lg font-black text-gray-900 truncate",
                                  children: r.customer.companyName,
                                }),
                                e.jsx("div", {
                                  className: "text-sm text-gray-700 truncate",
                                  children: r.customer.contactPerson,
                                }),
                              ],
                            }),
                            e.jsx("button", {
                              type: "button",
                              onClick: () => X(!1),
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
                              className: "flex flex-wrap gap-2 items-center",
                              children: [
                                (r.customer.role || St.Customer) === St.Admin
                                  ? e.jsx(be, {
                                      className:
                                        "px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-slate-200 text-slate-800",
                                      children: "Admin",
                                    })
                                  : e.jsx(be, {
                                      className: `${fe[r.customer.contractType]} px-3 py-1 rounded-full text-xs font-semibold tracking-wide`,
                                      children:
                                        ((rt = v[r.customer.contractType]) ==
                                        null
                                          ? void 0
                                          : rt.name) || r.customer.contractType,
                                    }),
                                (r.customer.role || St.Customer) ===
                                  St.Customer &&
                                  e.jsx("select", {
                                    value: r.customer.contractType,
                                    onChange: (t) => {
                                      Xe(r.customer, t.target.value);
                                    },
                                    disabled: ze === r.customer.id,
                                    className:
                                      "h-8 rounded-lg border border-gray-200 bg-white px-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:opacity-60",
                                    "aria-label": "Change plan",
                                    children: Object.values(N).map((t) =>
                                      e.jsx(
                                        "option",
                                        { value: t, children: v[t].name },
                                        t,
                                      ),
                                    ),
                                  }),
                                e.jsx("button", {
                                  type: "button",
                                  onClick: () => at(r.customer.id),
                                  className:
                                    "px-3 py-1 rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-700",
                                  children: "Copy ID",
                                }),
                                (r.customer.role || St.Customer) ===
                                  St.Customer &&
                                  e.jsx("button", {
                                    type: "button",
                                    onClick: () => lr(r.customer),
                                    disabled:
                                      magicLinkLoadingId === r.customer.id,
                                    className:
                                      "px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-800 disabled:opacity-60",
                                    children:
                                      magicLinkLoadingId === r.customer.id
                                        ? "Generating..."
                                        : "Magic Link",
                                  }),
                              ],
                            }),
                            magicLinkByCustomer[r.customer.id] &&
                              e.jsxs("div", {
                                className:
                                  "rounded-xl border border-emerald-200 bg-emerald-50/70 p-3",
                                children: [
                                  e.jsx("div", {
                                    className:
                                      "text-[11px] font-semibold text-emerald-800 uppercase tracking-wide",
                                    children: "Latest Magic Link",
                                  }),
                                  e.jsx("div", {
                                    className:
                                      "mt-1 text-xs text-emerald-900 break-all",
                                    children: magicLinkByCustomer[r.customer.id],
                                  }),
                                  e.jsx("div", {
                                    className: "mt-2",
                                    children: e.jsx("button", {
                                      type: "button",
                                      onClick: () => Pr(r.customer.id),
                                      className:
                                        "px-3 py-1.5 rounded-lg border border-emerald-300 bg-white text-xs font-semibold text-emerald-800",
                                      children: "Copy Magic Link",
                                    }),
                                  }),
                                ],
                              }),
                            e.jsx("div", {
                              className: "text-sm text-gray-600",
                              children: r.customer.email,
                            }),
                            r.customer.phone &&
                              e.jsx("div", {
                                className: "text-sm text-gray-600",
                                children: r.customer.phone,
                              }),
                            r.customer.address &&
                              e.jsx("div", {
                                className:
                                  "text-xs text-gray-500 whitespace-pre-wrap",
                                children: r.customer.address,
                              }),
                            e.jsxs("div", {
                              className: "grid grid-cols-2 gap-2",
                              children: [
                                e.jsxs("div", {
                                  className:
                                    "p-3 rounded-xl border border-gray-200 bg-gray-50",
                                  children: [
                                    e.jsx("div", {
                                      className:
                                        "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                      children:
                                        (r.customer.role || St.Customer) ===
                                        St.Admin
                                          ? "Role"
                                          : "Balance",
                                    }),
                                    (r.customer.role || St.Customer) ===
                                    St.Admin
                                      ? e.jsx("div", {
                                          className:
                                            "text-sm font-black leading-tight text-slate-800",
                                          children: "Administrator",
                                        })
                                      : e.jsxs("div", {
                                          className: `text-sm font-black leading-tight break-all [overflow-wrap:anywhere] ${r.balance < 0 ? "text-red-700" : "text-emerald-700"}`,
                                          children: [
                                            r.balance < 0 ? "-" : "+",
                                            "$",
                                            Math.abs(r.balance).toLocaleString(
                                              void 0,
                                              {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                              },
                                            ),
                                          ],
                                        }),
                                  ],
                                }),
                                e.jsxs("div", {
                                  className:
                                    "p-3 rounded-xl border border-gray-200 bg-gray-50",
                                  children: [
                                    e.jsx("div", {
                                      className:
                                        "text-[11px] font-semibold text-gray-500 uppercase tracking-wide",
                                      children:
                                        (r.customer.role || St.Customer) ===
                                        St.Admin
                                          ? "Scope"
                                          : "Open Shipments",
                                    }),
                                    (r.customer.role || St.Customer) ===
                                    St.Admin
                                      ? e.jsx("div", {
                                          className:
                                            "text-base font-black text-gray-900",
                                          children: "Platform Access",
                                        })
                                      : e.jsx("div", {
                                          className:
                                            "text-base font-black text-gray-900",
                                          children: r.openShipments,
                                        }),
                                  ],
                                }),
                              ],
                            }),
                            r.customer.notes &&
                              e.jsxs("div", {
                                className:
                                  "p-3 rounded-xl border border-amber-200 bg-amber-50",
                                children: [
                                  e.jsx("div", {
                                    className:
                                      "text-[11px] font-semibold text-amber-800 uppercase tracking-wide",
                                    children: "Internal Notes",
                                  }),
                                  e.jsx("div", {
                                    className:
                                      "text-sm text-amber-900 mt-1 whitespace-pre-wrap",
                                    children: r.customer.notes,
                                  }),
                                ],
                              }),
                            e.jsxs("div", {
                              className: "flex flex-col gap-2",
                              children: [
                                e.jsx(I, {
                                  type: "button",
                                  size: "xs",
                                  variant: "default",
                                  onClick: () => Qe(r.customer),
                                  className: "w-full",
                                  children: "Edit Customer",
                                }),
                                (r.customer.role || St.Customer) ===
                                  St.Customer &&
                                  e.jsx(I, {
                                    type: "button",
                                    variant: "outline",
                                    size: "xs",
                                    onClick: () => {
                                      try {
                                        localStorage.setItem(
                                          "bundleist_nav_intent",
                                          JSON.stringify({
                                            page: "payments",
                                            adminCustomerFilter: r.customer.id,
                                            forceCustomerLens: !0,
                                            resetFilters: !0,
                                          }),
                                        );
                                      } catch {}
                                      (X(!1), w("payments"));
                                    },
                                    className: "w-full",
                                    children: "Payments",
                                  }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              e.jsx(ot, {
                children: e.jsx(it, {
                  isOpen: ut,
                  onClose: () => {
                    (V(!1), Z(null));
                  },
                  title: "Edit Customer",
                  subtitle: "Update customer profile and contract details",
                  maxWidth: "2xl",
                  gradientFrom: "from-emerald-50",
                  gradientTo: "to-sky-50",
                  icon: e.jsx("svg", {
                    className: "w-6 h-6 text-emerald-700",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: e.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M11 5h2m-1-1v2m-7 4h14M6 21h12a2 2 0 002-2V9a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z",
                    }),
                  }),
                  children: e.jsxs("form", {
                    onSubmit: pt,
                    className: "ui-form-skin",
                    children: [
                      e.jsxs(ae, {
                        title: "Customer Information",
                        description:
                          "Keep contact info current for shipping and billing.",
                        children: [
                          e.jsxs("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                            children: [
                              e.jsx(f, {
                                label: "Contact Person Name",
                                required: !0,
                                children: e.jsx("input", {
                                  type: "text",
                                  value: le,
                                  onChange: (t) => _e(t.target.value),
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200",
                                  required: !0,
                                }),
                              }),
                              e.jsx(f, {
                                label: "Email Address",
                                required: !0,
                                children: e.jsx("input", {
                                  type: "email",
                                  value: Y,
                                  onChange: (t) => Ee(t.target.value),
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200",
                                  required: !0,
                                }),
                              }),
                              e.jsx(f, {
                                label: "Company Name",
                                required: !0,
                                children: e.jsx("input", {
                                  type: "text",
                                  value: ce,
                                  onChange: (t) => Fe(t.target.value),
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200",
                                  required: !0,
                                }),
                              }),
                              e.jsx(f, {
                                label: "Phone Number",
                                required: !0,
                                children: e.jsx("input", {
                                  type: "tel",
                                  value: de,
                                  onChange: (t) => Oe(t.target.value),
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200",
                                  required: !0,
                                }),
                              }),
                            ],
                          }),
                          e.jsx("div", {
                            className: "mt-6",
                            children: e.jsx(f, {
                              label: "Business Address",
                              required: !0,
                              children: e.jsx("textarea", {
                                value: me,
                                onChange: (t) => Le(t.target.value),
                                rows: 3,
                                className:
                                  "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 resize-none",
                                required: !0,
                              }),
                            }),
                          }),
                        ],
                      }),
                      e.jsx(ae, {
                        title: "Plan and Notes",
                        description: "Plan selection and internal context.",
                        className: "bg-gradient-to-r from-gray-50 to-slate-50",
                        children: e.jsxs("div", {
                          className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                          children: [
                            e.jsx(f, {
                              label: "Plan",
                              required: !0,
                              children: e.jsx("select", {
                                value: ue,
                                onChange: (t) => $e(t.target.value),
                                className:
                                  "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200",
                                required: !0,
                                children: Object.values(N).map((t) =>
                                  e.jsx(
                                    "option",
                                    { value: t, children: v[t].name },
                                    t,
                                  ),
                                ),
                              }),
                            }),
                            e.jsx(f, {
                              label: "Internal Notes",
                              help: "Visible to admins only.",
                              children: e.jsx("textarea", {
                                value: Be,
                                onChange: (t) => qe(t.target.value),
                                rows: 3,
                                className:
                                  "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 resize-none",
                                placeholder: "Add internal notes...",
                              }),
                            }),
                          ],
                        }),
                      }),
                      e.jsx(lt, {
                        onCancel: () => {
                          (V(!1), Z(null));
                        },
                        submitLabel: "Save Changes",
                        cancelLabel: "Cancel",
                        submitColor: "emerald",
                      }),
                    ],
                  }),
                }),
              }),
              e.jsx(ot, {
                children: e.jsx(it, {
                  isOpen: mt,
                  onClose: () => G(!1),
                  title: "Create Customer",
                  subtitle:
                    "Enter profile, contract, and account access details.",
                  maxWidth: "2xl",
                  gradientFrom: "from-blue-50",
                  gradientTo: "to-indigo-50",
                  icon: e.jsx("svg", {
                    className: "w-6 h-6 text-blue-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: e.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
                    }),
                  }),
                  children: e.jsxs("form", {
                    onSubmit: xt,
                    className: "ui-form-skin",
                    children: [
                      e.jsxs(ae, {
                        title: "Customer Information",
                        description:
                          "Enter the basic details for the new customer",
                        children: [
                          e.jsxs("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                            children: [
                              e.jsx(f, {
                                label: "Contact Person Name",
                                required: !0,
                                help: "The primary contact person for this customer",
                                children: e.jsx("input", {
                                  type: "text",
                                  value: q,
                                  onChange: (t) => we(t.target.value),
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
                                  placeholder: "e.g., John Smith",
                                  required: !0,
                                }),
                              }),
                              e.jsx(f, {
                                label: "Email Address",
                                required: !0,
                                help: "Email address for login and communication",
                                children: e.jsx("input", {
                                  type: "email",
                                  value: W,
                                  onChange: (t) => Ce(t.target.value),
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
                                  placeholder: "e.g., john@company.com",
                                  autoComplete: "new-password",
                                  required: !0,
                                }),
                              }),
                              e.jsx(f, {
                                label: "Company Name",
                                required: !0,
                                help: "The name of the customer's company",
                                children: e.jsx("input", {
                                  type: "text",
                                  value: ne,
                                  onChange: (t) => Se(t.target.value),
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
                                  placeholder: "e.g., ABC Trading Company",
                                  required: !0,
                                }),
                              }),
                              e.jsx(f, {
                                label: "Phone Number",
                                required: !0,
                                help: "Contact phone number",
                                children: e.jsx("input", {
                                  type: "tel",
                                  value: oe,
                                  onChange: (t) => ke(t.target.value),
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
                                  placeholder: "e.g., +1-555-123-4567",
                                  required: !0,
                                }),
                              }),
                            ],
                          }),
                          e.jsx("div", {
                            className: "mt-6",
                            children: e.jsx(f, {
                              label: "Business Address",
                              required: !0,
                              help: "Primary business address for shipping and documentation",
                              children: e.jsx("input", {
                                type: "text",
                                value: ie,
                                onChange: (t) => Te(t.target.value),
                                className:
                                  "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
                                placeholder:
                                  "e.g., 123 Business St, City, State, ZIP",
                                required: !0,
                              }),
                            }),
                          }),
                        ],
                      }),
                      e.jsxs(ae, {
                        title: "Account Settings",
                        description:
                          "Configure login credentials and contract terms",
                        className: "bg-gradient-to-r from-gray-50 to-slate-50",
                        children: [
                          e.jsxs("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                            children: [
                              e.jsx(f, {
                                label: "Password",
                                required: !0,
                                help: "Temporary password for customer login (minimum 6 characters)",
                                children: e.jsx("input", {
                                  type: "password",
                                  value: H,
                                  onChange: (t) => Me(t.target.value),
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
                                  placeholder: "Enter temporary password",
                                  autoComplete: "new-password",
                                  minLength: 6,
                                  required: !0,
                                }),
                              }),
                              e.jsx(f, {
                                label: "Plan",
                                required: !0,
                                help: "Select the pricing and service plan for this customer",
                                children: e.jsx("select", {
                                  value: C,
                                  onChange: (t) => Pe(t.target.value),
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
                                  required: !0,
                                  children: Object.values(N).map((t) =>
                                    e.jsx(
                                      "option",
                                      { value: t, children: v[t].name },
                                      t,
                                    ),
                                  ),
                                }),
                              }),
                              e.jsxs("div", {
                                className:
                                  "mt-3 p-4 bg-blue-50 rounded-xl border border-blue-200",
                                children: [
                                  e.jsxs("h4", {
                                    className:
                                      "text-sm font-semibold text-blue-900 mb-2",
                                    children: [v[C].name, " Plan Details"],
                                  }),
                                  e.jsxs("div", {
                                    className:
                                      "space-y-2 text-sm text-blue-700",
                                    children: [
                                      C === N.Trial &&
                                        e.jsxs("p", {
                                          children: [
                                            e.jsx("strong", {
                                              children: "Service fee:",
                                            }),
                                            " $",
                                            v[C].oneTimeFee,
                                            " per pilot consolidation",
                                            e.jsx("br", {}),
                                            e.jsx("span", {
                                              className: "text-blue-600",
                                              children:
                                                "Ideal for first-time importers running a pilot consolidation.",
                                            }),
                                          ],
                                        }),
                                      C === N.Growth &&
                                        e.jsxs("p", {
                                          children: [
                                            e.jsx("strong", {
                                              children: "Service fee:",
                                            }),
                                            " ",
                                            "$",
                                            v[C].minimumFee,
                                            " minimum or ",
                                            (v[C].percentageFee || 0) * 100,
                                            "% of order value (whichever is higher)",
                                            e.jsx("br", {}),
                                            e.jsx("span", {
                                              className: "text-blue-600",
                                              children:
                                                "Designed for growing businesses importing regularly.",
                                            }),
                                          ],
                                        }),
                                      C === N.Corporate &&
                                        e.jsxs("p", {
                                          children: [
                                            e.jsx("strong", {
                                              children: "Service fee:",
                                            }),
                                            " ",
                                            "$",
                                            v[C].minimumFee,
                                            " minimum or ",
                                            (v[C].percentageFee || 0) * 100,
                                            "% of order value (whichever is higher)",
                                            e.jsx("br", {}),
                                            e.jsx("span", {
                                              className: "text-blue-600",
                                              children:
                                                "Built for high-volume importers needing priority handling and optimization.",
                                            }),
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          e.jsx("div", {
                            className: "mt-6",
                            children: e.jsx(f, {
                              label: "Additional Notes",
                              help: "Optional notes about this customer or special requirements",
                              children: e.jsx("textarea", {
                                value: Ie,
                                onChange: (t) => De(t.target.value),
                                className:
                                  "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
                                placeholder:
                                  "Enter any additional notes or special requirements...",
                                rows: 3,
                              }),
                            }),
                          }),
                        ],
                      }),
                      e.jsxs(lt, {
                        children: [
                          e.jsx(I, {
                            type: "button",
                            variant: "outline",
                            onClick: () => G(!1),
                            className: "w-full sm:w-auto",
                            children: "Cancel",
                          }),
                          e.jsxs(I, {
                            type: "submit",
                            className: "w-full sm:w-auto",
                            children: [
                              e.jsx("svg", {
                                className: "w-5 h-5 inline mr-2",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: e.jsx("path", {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: 2,
                                  d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
                                }),
                              }),
                              "Create Customer",
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
            ],
          }),
        })
      : (console.log("RENDERING FINAL FALLBACK"),
        e.jsx("div", {
          className:
            "min-h-screen flex items-center justify-center text-red-600 font-bold",
          children: "No user record found or insufficient permissions.",
        }))
    : (w("dashboard"),
      e.jsx("div", {
        className:
          "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100",
        children: e.jsxs("div", {
          className: "text-center",
          children: [
            e.jsx("div", {
              className: "text-blue-600 mb-4",
              children: e.jsx("svg", {
                className: "w-12 h-12 mx-auto",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: e.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                }),
              }),
            }),
            e.jsx("h2", {
              className: "text-xl font-semibold text-gray-800 mb-2",
              children: "Redirecting to Dashboard",
            }),
            e.jsx("p", {
              className: "text-gray-600",
              children:
                "You don't have access to this page. Taking you to your dashboard...",
            }),
          ],
        }),
      }));
};
export { $t as default };
