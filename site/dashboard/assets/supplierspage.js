import { r as i, j as e } from "./radix.js";
import { e as Le, O as m, c as x, f as xe, p as pe } from "./app.js";
import { F as G, a as X, b as Y, d as Z, c as g } from "./formerrorboundary.js";
import { P as Re } from "./pageheader.js";
import "./react.js";
import "./supabase.js";
import "./icons.js";
const Ie = ({
  suppliers: F,
  orders: j,
  addSupplier: me,
  updateSupplier: ge,
  deleteSupplier: he,
  suppliersLoading: fe,
  suppliersError: A,
  currentCustomerId: Pe,
  isAdmin: d,
  onNavigate: D,
}) => {
  const [q, ee] = i.useState(""),
    [T, te] = i.useState(""),
    [$, re] = i.useState(""),
    [_, se] = i.useState(""),
    [I, ae] = i.useState(""),
    { showError: le } = Le(),
    [be, k] = i.useState(!1),
    [ye, B] = i.useState(!1),
    [ne, z] = i.useState(null),
    [p, L] = i.useState({
      name: "",
      companyLocation: "",
      phoneNumber: "",
      contactPerson: "",
      rating: "",
    }),
    ve = (t) => {
      if (
        (t.preventDefault(), !q.trim() || !T.trim() || !$.trim() || !_.trim())
      ) {
        le(
          "Missing Fields",
          "Please fill in all required supplier fields (Name, Location, Phone, Contact Person). Rating is optional.",
        );
        return;
      }
      let r;
      if (
        I.trim() !== "" &&
        ((r = parseFloat(I)), isNaN(r) || r < 1 || r > 10)
      ) {
        le(
          "Invalid Rating",
          "Rating must be a number between 1.0 and 10.0, or left empty.",
        );
        return;
      }
      (me({
        name: q,
        companyLocation: T,
        phoneNumber: $,
        contactPerson: _,
        rating: r,
      }),
        ee(""),
        te(""),
        re(""),
        se(""),
        ae(""),
        k(!1));
    },
    je = (t) => {
      (z(t.id),
        L({
          name: t.name,
          companyLocation: t.companyLocation,
          phoneNumber: t.phoneNumber,
          contactPerson: t.contactPerson,
          rating:
            t.rating !== void 0 && t.rating !== null ? t.rating.toString() : "",
        }));
    },
    C = (t, r) => {
      L((c) => ({ ...c, [t]: r }));
    },
    Ne = () => {
      if (!ne) return;
      const t = {
        name: p.name,
        companyLocation: p.companyLocation,
        phoneNumber: p.phoneNumber,
        contactPerson: p.contactPerson,
        rating: p.rating !== "" ? parseFloat(p.rating) : void 0,
      };
      (ge(ne, t),
        z(null),
        B(!1),
        L({
          name: "",
          companyLocation: "",
          phoneNumber: "",
          contactPerson: "",
          rating: "",
        }));
    },
    ie = () => {
      (z(null),
        B(!1),
        L({
          name: "",
          companyLocation: "",
          phoneNumber: "",
          contactPerson: "",
          rating: "",
        }));
    },
    we = (t) => {
      const r = j.filter((s) => s.supplierId === t),
        c = r.length,
        u = r.filter((s) => s.status === m.Delivered).length,
        o = r.filter((s) => s.status === m.Cancelled).length,
        b = r.reduce((s, l) => s + (l.value || 0), 0);
      return {
        totalOrders: c,
        deliveredOrders: u,
        cancelledOrders: o,
        totalValue: b,
      };
    },
    R = [...F]
      .map((t) => {
        const r = we(t.id),
          c = r.deliveredOrders + r.cancelledOrders,
          u = c > 0 ? r.deliveredOrders / c : 0,
          o = c > 0 ? Math.max(1, Math.min(10, 5 + (u - 0.5) * 10)) : 0,
          b = (t.rating ?? 0) > 0 ? t.rating : o,
          s =
            Math.round(b * 1e3) +
            r.deliveredOrders * 10 +
            r.totalOrders +
            Math.round(r.totalValue / 1e3);
        return {
          supplier: t,
          score: s,
          effectiveRating: b,
          hasManualRating: t.rating !== void 0 && t.rating !== null,
          stats: r,
        };
      })
      .sort((t, r) =>
        r.score !== t.score
          ? r.score - t.score
          : r.effectiveRating !== t.effectiveRating
            ? r.effectiveRating - t.effectiveRating
            : r.stats.deliveredOrders !== t.stats.deliveredOrders
              ? r.stats.deliveredOrders - t.stats.deliveredOrders
              : r.stats.totalValue !== t.stats.totalValue
                ? r.stats.totalValue - t.stats.totalValue
                : t.supplier.name.localeCompare(r.supplier.name),
      ),
    [S, H] = i.useState(""),
    [w, W] = i.useState("all"),
    [y, K] = i.useState("rank"),
    [O, J] = i.useState("desc"),
    [M, oe] = i.useState(null),
    [ke, P] = i.useState(!1),
    [h, Q] = i.useState("all"),
    [Ce, V] = i.useState(!1),
    [f, E] = i.useState(null);
  (i.useEffect(() => {
    try {
      const t = localStorage.getItem("bundleist_suppliers_state");
      if (!t) return;
      const r = JSON.parse(t);
      (r && typeof r.query == "string" && H(r.query),
        r && typeof r.minRating == "string" && W(r.minRating),
        r && typeof r.sortKey == "string" && K(r.sortKey),
        r && typeof r.sortDir == "string" && J(r.sortDir),
        r &&
          typeof r.selectedSupplierId == "string" &&
          oe(r.selectedSupplierId),
        r && typeof r.exceptionFilter == "string" && Q(r.exceptionFilter));
    } catch {}
  }, []),
    i.useEffect(() => {
      try {
        localStorage.setItem(
          "bundleist_suppliers_state",
          JSON.stringify({
            query: S,
            minRating: w,
            sortKey: y,
            sortDir: O,
            selectedSupplierId: M,
            exceptionFilter: h,
          }),
        );
      } catch {}
    }, [S, w, y, O, M, h]));
  const U = i.useMemo(() => {
      const t = new Map();
      for (const r of F) {
        const c = j.filter((N) => N.supplierId === r.id),
          u = c.length,
          o = c.filter((N) => N.status === m.Cancelled).length,
          b = c.filter(
            (N) =>
              N.status !== m.Delivered &&
              N.status !== m.Cancelled &&
              N.status !== m.Completed,
          ).length,
          s = u > 0 ? o / u : 0,
          l =
            !String(r.phoneNumber || "").trim() ||
            !String(r.contactPerson || "").trim() ||
            !String(r.companyLocation || "").trim(),
          ue = typeof r.rating == "number" && r.rating > 0 && r.rating < 6,
          Me = u >= 5 && s >= 0.2,
          De = b >= 6;
        t.set(r.id, {
          missingContact: l,
          manyPending: De,
          highCancel: Me,
          lowRating: ue,
        });
      }
      return t;
    }, [F, j]),
    v = i.useMemo(() => {
      const t = S.trim().toLowerCase(),
        r = w === "all" ? null : Number(w),
        u = R.filter((s) => {
          const l = s.supplier;
          return r !== null && s.effectiveRating < r
            ? !1
            : t
              ? `${l.name} ${l.companyLocation} ${l.phoneNumber} ${l.contactPerson}`
                  .toLowerCase()
                  .includes(t)
              : !0;
        }).filter((s) => {
          if (!d || h === "all") return !0;
          const l = U.get(s.supplier.id);
          return l
            ? h === "missing_contact"
              ? l.missingContact
              : h === "many_pending"
                ? l.manyPending
                : h === "high_cancel"
                  ? l.highCancel
                  : h === "low_rating"
                    ? l.lowRating
                    : !0
            : !0;
        }),
        o = O === "asc" ? 1 : -1;
      return [...u]
        .sort((s, l) =>
          y === "name"
            ? s.supplier.name.localeCompare(l.supplier.name) * o
            : y === "rating"
              ? (s.effectiveRating - l.effectiveRating) * o
              : y === "orders"
                ? (s.stats.totalOrders - l.stats.totalOrders) * o
                : y === "value"
                  ? (s.stats.totalValue - l.stats.totalValue) * o
                  : (R.indexOf(s) - R.indexOf(l)) * o,
        )
        .map((s, l) => ({ ...s, rank: l + 1 }));
    }, [R, S, w, y, O, d, h, U]),
    a = i.useMemo(() => {
      if (v.length === 0) return null;
      if (M) {
        const t = v.find((r) => r.supplier.id === M);
        if (t) return t;
      }
      return v[0];
    }, [v, M]),
    Se = (t) => {
      (oe(t),
        (typeof window < "u" &&
          typeof window.matchMedia == "function" &&
          window.matchMedia("(min-width: 1024px)").matches) ||
          P(!0));
    },
    de = (t) => {
      (je(t), B(!0));
    },
    ce = (t) => {
      (E(t), V(!0));
    },
    n = i.useMemo(() => {
      if (!f) return null;
      const t = j.filter((s) => s.supplierId === f.id),
        r = t.filter((s) => s.status === m.Delivered).length,
        c = t.filter((s) => s.status === m.Cancelled).length,
        u = t.filter(
          (s) =>
            s.status !== m.Delivered &&
            s.status !== m.Cancelled &&
            s.status !== m.Completed,
        ).length,
        o = t.reduce((s, l) => s + Number(l.value || 0), 0),
        b = [...t]
          .filter((s) => !!s.creationDate)
          .sort(
            (s, l) =>
              new Date(l.creationDate).getTime() -
              new Date(s.creationDate).getTime(),
          )
          .slice(0, 8);
      return {
        linkedCount: t.length,
        delivered: r,
        cancelled: c,
        open: u,
        totalValue: o,
        recent: b,
      };
    }, [f, j]),
    Oe = () => {
      f &&
        (((n == null ? void 0 : n.linkedCount) || 0) > 0 ||
          (he(f.id), V(!1), E(null)));
    };
  return e.jsx("div", {
    className: "ui-page",
    children: e.jsxs("div", {
      className: `px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 ${d ? "pb-28" : ""}`,
      children: [
        e.jsx(Re, {
          title: "Suppliers",
          subtitle: d
            ? "Maintain supplier records and inspect linked order activity."
            : "View suppliers associated with your orders.",
          icon: e.jsx("svg", {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: e.jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
            }),
          }),
        }),
        d &&
          e.jsx(G, {
            children: e.jsx(X, {
              isOpen: Ce,
              onClose: () => {
                (V(!1), E(null));
              },
              title: "Delete Supplier",
              subtitle: "Suppliers with linked orders cannot be deleted.",
              gradientFrom: "from-rose-50",
              gradientTo: "to-orange-50",
              icon: e.jsx("svg", {
                className: "w-6 h-6 text-rose-700",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: e.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-1 0v12a2 2 0 01-2 2H10a2 2 0 01-2-2V7h8z",
                }),
              }),
              maxWidth: "lg",
              children: e.jsxs("div", {
                className: "ui-form-skin",
                children: [
                  e.jsx(Y, {
                    title: "Impact",
                    description:
                      "Review what will be affected before deleting.",
                    children: f
                      ? e.jsxs("div", {
                          className: "space-y-3",
                          children: [
                            e.jsxs("div", {
                              className:
                                "rounded-xl border border-slate-200/70 bg-white p-3",
                              children: [
                                e.jsx("div", {
                                  className:
                                    "text-xs font-semibold text-slate-500 uppercase tracking-wider",
                                  children: "Supplier",
                                }),
                                e.jsx("div", {
                                  className:
                                    "text-lg font-extrabold text-slate-900",
                                  children: f.name,
                                }),
                                e.jsx("div", {
                                  className: "text-sm text-slate-600",
                                  children: f.companyLocation,
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "grid grid-cols-2 gap-3",
                              children: [
                                e.jsxs("div", {
                                  className:
                                    "rounded-xl border border-slate-200/70 bg-slate-50 p-3",
                                  children: [
                                    e.jsx("div", {
                                      className: "ui-kicker",
                                      children: "Linked orders",
                                    }),
                                    e.jsx("div", {
                                      className:
                                        "text-xl font-extrabold text-slate-900",
                                      children:
                                        (n == null ? void 0 : n.linkedCount) ||
                                        0,
                                    }),
                                    e.jsxs("div", {
                                      className: "text-xs text-slate-600",
                                      children: [
                                        "Open ",
                                        (n == null ? void 0 : n.open) || 0,
                                        " · Delivered ",
                                        (n == null ? void 0 : n.delivered) || 0,
                                      ],
                                    }),
                                  ],
                                }),
                                e.jsxs("div", {
                                  className:
                                    "rounded-xl border border-slate-200/70 bg-slate-50 p-3",
                                  children: [
                                    e.jsx("div", {
                                      className: "ui-kicker",
                                      children: "Total value",
                                    }),
                                    e.jsxs("div", {
                                      className:
                                        "text-xl font-extrabold text-slate-900",
                                      children: [
                                        "$",
                                        Math.round(
                                          (n == null ? void 0 : n.totalValue) ||
                                            0,
                                        ).toLocaleString(),
                                      ],
                                    }),
                                    e.jsx("div", {
                                      className: "text-xs text-slate-600",
                                      children: "Across linked orders",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            ((n == null ? void 0 : n.linkedCount) || 0) > 0
                              ? e.jsx("div", {
                                  className:
                                    "rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900",
                                  children:
                                    "This supplier has linked orders. Delete is disabled to protect historical records.",
                                })
                              : e.jsx("div", {
                                  className:
                                    "rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900",
                                  children:
                                    "No linked orders found. Deletion is allowed.",
                                }),
                          ],
                        })
                      : e.jsx("div", {
                          className: "text-sm text-slate-600",
                          children: "No supplier selected.",
                        }),
                  }),
                  e.jsxs(Z, {
                    children: [
                      e.jsx(x, {
                        type: "button",
                        variant: "outline",
                        onClick: () => {
                          (V(!1), E(null));
                        },
                        className: "w-full sm:w-auto",
                        children: "Cancel",
                      }),
                      e.jsx(x, {
                        type: "button",
                        variant: "destructive",
                        disabled:
                          !f || ((n == null ? void 0 : n.linkedCount) || 0) > 0,
                        onClick: Oe,
                        className: "w-full sm:w-auto",
                        title:
                          ((n == null ? void 0 : n.linkedCount) || 0) > 0
                            ? "Cannot delete suppliers with linked orders"
                            : "Delete supplier",
                        children: "Delete Supplier",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        e.jsx(G, {
          children: e.jsx(X, {
            isOpen: be,
            onClose: () => k(!1),
            title: "Add New Supplier",
            subtitle: "Register a new supplier for your business operations",
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
                d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
              }),
            }),
            children: e.jsxs("form", {
              onSubmit: ve,
              className: "ui-form-skin",
              children: [
                e.jsxs(Y, {
                  title: "Supplier Information",
                  description: "Enter the basic details for this supplier",
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                      children: [
                        e.jsx(g, {
                          label: "Supplier Name",
                          required: !0,
                          help: "The official name of the supplier company",
                          children: e.jsx("input", {
                            type: "text",
                            value: q,
                            onChange: (t) => ee(t.target.value),
                            className:
                              "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200",
                            placeholder: "Enter supplier name",
                            required: !0,
                          }),
                        }),
                        e.jsx(g, {
                          label: "Contact Person",
                          required: !0,
                          help: "Main point of contact at the supplier",
                          children: e.jsx("input", {
                            type: "text",
                            value: _,
                            onChange: (t) => se(t.target.value),
                            className:
                              "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200",
                            placeholder: "e.g., John Doe",
                            required: !0,
                          }),
                        }),
                        e.jsx(g, {
                          label: "Company Location",
                          required: !0,
                          help: "Where the supplier is located",
                          children: e.jsx("input", {
                            type: "text",
                            value: T,
                            onChange: (t) => te(t.target.value),
                            className:
                              "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200",
                            placeholder: "e.g., Istanbul, Turkey",
                            required: !0,
                          }),
                        }),
                        e.jsx(g, {
                          label: "Phone Number",
                          required: !0,
                          help: "Contact phone number for the supplier",
                          children: e.jsx("input", {
                            type: "tel",
                            value: $,
                            onChange: (t) => re(t.target.value),
                            className:
                              "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200",
                            placeholder: "e.g., +90-555-123-4567",
                            required: !0,
                          }),
                        }),
                      ],
                    }),
                    e.jsx("div", {
                      className: "mt-6",
                      children: e.jsx(g, {
                        label: "Performance Rating",
                        help: "Optional rating from 1.0 to 10.0 based on past performance",
                        children: e.jsxs("div", {
                          className: "relative max-w-xs",
                          children: [
                            e.jsx("input", {
                              type: "number",
                              value: I,
                              onChange: (t) => ae(t.target.value),
                              className:
                                "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200",
                              placeholder: "8.5",
                              min: "1",
                              max: "10",
                              step: "0.1",
                            }),
                            e.jsx("span", {
                              className:
                                "absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm",
                              children: "/10",
                            }),
                          ],
                        }),
                      }),
                    }),
                  ],
                }),
                e.jsxs(Z, {
                  children: [
                    e.jsx(x, {
                      type: "button",
                      variant: "outline",
                      onClick: () => k(!1),
                      className: "w-full sm:w-auto",
                      children: "Cancel",
                    }),
                    e.jsx(x, {
                      type: "submit",
                      variant: "default",
                      className: "w-full sm:w-auto",
                      children: "Add Supplier",
                    }),
                  ],
                }),
              ],
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
                          children: "Browse Suppliers",
                        }),
                        e.jsx("p", {
                          className: "text-sm text-gray-600",
                          children:
                            "Search and open details without losing your place.",
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className:
                        "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3",
                      children: [
                        e.jsxs("div", {
                          className: "text-sm text-gray-500",
                          children: [
                            "Showing: ",
                            v.length,
                            " supplier",
                            v.length === 1 ? "" : "s",
                          ],
                        }),
                        d &&
                          e.jsx(x, {
                            type: "button",
                            onClick: () => k(!0),
                            variant: "default",
                            title: "Add a new supplier",
                            children: "Add Supplier",
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
                            value: S,
                            onChange: (t) => H(t.target.value),
                            className:
                              "w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none",
                            placeholder:
                              "Search supplier, location, phone, contact...",
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
                        "lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2",
                      children: [
                        d &&
                          e.jsxs("select", {
                            value: h,
                            onChange: (t) => Q(t.target.value),
                            className:
                              "px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800",
                            title: "Exceptions",
                            children: [
                              e.jsx("option", {
                                value: "all",
                                children: "All suppliers",
                              }),
                              e.jsx("option", {
                                value: "missing_contact",
                                children: "Missing contact data",
                              }),
                              e.jsx("option", {
                                value: "many_pending",
                                children: "Many open orders",
                              }),
                              e.jsx("option", {
                                value: "high_cancel",
                                children: "High cancel rate",
                              }),
                              e.jsx("option", {
                                value: "low_rating",
                                children: "Low rating",
                              }),
                            ],
                          }),
                        e.jsxs("select", {
                          value: w,
                          onChange: (t) => W(t.target.value),
                          className:
                            "px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800",
                          title: "Minimum rating",
                          children: [
                            e.jsx("option", {
                              value: "all",
                              children: "All Ratings",
                            }),
                            e.jsx("option", {
                              value: "8",
                              children: "8+ rating",
                            }),
                            e.jsx("option", {
                              value: "6",
                              children: "6+ rating",
                            }),
                            e.jsx("option", {
                              value: "4",
                              children: "4+ rating",
                            }),
                          ],
                        }),
                        e.jsxs("select", {
                          value: y,
                          onChange: (t) => K(t.target.value),
                          className:
                            "px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800",
                          title: "Sort",
                          children: [
                            e.jsx("option", {
                              value: "rank",
                              children: "Sort: Rank",
                            }),
                            e.jsx("option", {
                              value: "name",
                              children: "Sort: Name",
                            }),
                            e.jsx("option", {
                              value: "rating",
                              children: "Sort: Rating",
                            }),
                            e.jsx("option", {
                              value: "orders",
                              children: "Sort: Orders",
                            }),
                            e.jsx("option", {
                              value: "value",
                              children: "Sort: Value",
                            }),
                          ],
                        }),
                        e.jsx("button", {
                          type: "button",
                          onClick: () =>
                            J((t) => (t === "asc" ? "desc" : "asc")),
                          className:
                            "px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 hover:bg-gray-50",
                          title: "Toggle sort direction",
                          children: O === "asc" ? "Asc" : "Desc",
                        }),
                        e.jsx("button", {
                          type: "button",
                          onClick: () => {
                            (H(""), W("all"), K("rank"), J("desc"), Q("all"));
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
                  children: e.jsx("div", {
                    className: "p-3",
                    children: fe
                      ? e.jsx("div", {
                          className: "p-8 text-center text-gray-600",
                          children: "Loading suppliers...",
                        })
                      : A
                        ? e.jsx("div", {
                            className:
                              "p-8 text-center text-red-700 font-semibold",
                            children: A,
                          })
                        : v.length === 0
                          ? e.jsxs("div", {
                              className: "p-8 text-center text-gray-600",
                              children: [
                                e.jsx("div", {
                                  className:
                                    "text-sm font-semibold text-gray-900",
                                  children: "No suppliers match.",
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
                              children: v.map((t) => {
                                const r = t.supplier,
                                  c =
                                    (a == null ? void 0 : a.supplier.id) ===
                                    r.id,
                                  u =
                                    t.effectiveRating > 0
                                      ? `${t.effectiveRating.toFixed(1)}/10`
                                      : "N/A",
                                  o = U.get(r.id);
                                return e.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => Se(r.id),
                                    className: `w-full text-left p-3 rounded-xl border transition-colors ${c ? "border-emerald-300 bg-emerald-50" : "border-gray-200 bg-white hover:bg-gray-50"}`,
                                    children: e.jsxs("div", {
                                      className:
                                        "flex items-start justify-between gap-3",
                                      children: [
                                        e.jsxs("div", {
                                          className: "min-w-0",
                                          children: [
                                            e.jsxs("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                e.jsxs("span", {
                                                  className:
                                                    "text-xs font-bold text-gray-600 bg-gray-100 border border-gray-200 rounded-md px-2 py-0.5",
                                                  children: ["#", t.rank],
                                                }),
                                                e.jsx("div", {
                                                  className:
                                                    "text-sm font-black text-gray-900 truncate",
                                                  children: r.name,
                                                }),
                                              ],
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-xs text-gray-600 mt-1 truncate",
                                              children: r.companyLocation,
                                            }),
                                            e.jsxs("div", {
                                              className:
                                                "mt-2 flex flex-wrap gap-2 items-center",
                                              children: [
                                                e.jsx("span", {
                                                  className:
                                                    "px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-100 text-sky-800 border border-sky-200",
                                                  children: u,
                                                }),
                                                e.jsxs("span", {
                                                  className:
                                                    "text-[11px] font-semibold text-gray-600",
                                                  children: [
                                                    "Orders: ",
                                                    t.stats.totalOrders,
                                                  ],
                                                }),
                                                e.jsxs("span", {
                                                  className:
                                                    "text-[11px] font-semibold text-gray-600",
                                                  children: [
                                                    "Value: $",
                                                    Math.round(
                                                      t.stats.totalValue,
                                                    ).toLocaleString(),
                                                  ],
                                                }),
                                                d &&
                                                o != null &&
                                                o.missingContact
                                                  ? e.jsx("span", {
                                                      className:
                                                        "text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5",
                                                      children:
                                                        "Missing contact",
                                                    })
                                                  : null,
                                                d && o != null && o.manyPending
                                                  ? e.jsx("span", {
                                                      className:
                                                        "text-[11px] font-semibold text-orange-800 bg-orange-50 border border-orange-200 rounded-full px-2 py-0.5",
                                                      children: "Many open",
                                                    })
                                                  : null,
                                                d && o != null && o.highCancel
                                                  ? e.jsx("span", {
                                                      className:
                                                        "text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 rounded-full px-2 py-0.5",
                                                      children: "High cancel",
                                                    })
                                                  : null,
                                              ],
                                            }),
                                          ],
                                        }),
                                        d &&
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
                                                children: xe(r.id, "supplier"),
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                  },
                                  r.id,
                                );
                              }),
                            }),
                  }),
                }),
                e.jsx("div", {
                  className: "hidden lg:block lg:col-span-7 p-5",
                  children: a
                    ? e.jsxs("div", {
                        className:
                          "bg-white rounded-2xl border border-gray-200 shadow-sm p-5",
                        children: [
                          e.jsxs("div", {
                            className: "flex items-start justify-between gap-3",
                            children: [
                              e.jsxs("div", {
                                className: "min-w-0",
                                children: [
                                  e.jsx("div", {
                                    className:
                                      "text-xs font-semibold text-gray-500 uppercase tracking-wider",
                                    children: "Supplier",
                                  }),
                                  e.jsx("div", {
                                    className:
                                      "text-2xl font-black text-gray-900 truncate",
                                    children: a.supplier.name,
                                  }),
                                  e.jsxs("div", {
                                    className: "text-sm text-gray-700 mt-1",
                                    children: [
                                      "Contact: ",
                                      a.supplier.contactPerson,
                                    ],
                                  }),
                                  e.jsx("div", {
                                    className: "text-sm text-gray-600",
                                    children: a.supplier.companyLocation,
                                  }),
                                  e.jsx("div", {
                                    className: "text-sm text-gray-600 mt-1",
                                    children: e.jsx("a", {
                                      href: `tel:${a.supplier.phoneNumber}`,
                                      className:
                                        "text-sky-700 hover:text-sky-900 font-semibold",
                                      children: a.supplier.phoneNumber,
                                    }),
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className: "flex flex-col items-end gap-2",
                                children: [
                                  e.jsx("span", {
                                    className:
                                      "px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200",
                                    children:
                                      a.effectiveRating > 0
                                        ? `${a.effectiveRating.toFixed(1)}/10`
                                        : "N/A",
                                  }),
                                  d &&
                                    e.jsx("button", {
                                      type: "button",
                                      onClick: () => pe(a.supplier.id),
                                      className:
                                        "px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50",
                                      children: "Copy ID",
                                    }),
                                ],
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
                                    children: "Orders",
                                  }),
                                  e.jsx("div", {
                                    className:
                                      "text-lg font-black text-gray-900",
                                    children: a.stats.totalOrders,
                                  }),
                                  e.jsxs("div", {
                                    className: "text-xs text-gray-600",
                                    children: [
                                      "Delivered: ",
                                      a.stats.deliveredOrders,
                                      " · Cancelled: ",
                                      a.stats.cancelledOrders,
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
                                    children: "Total Value",
                                  }),
                                  e.jsxs("div", {
                                    className:
                                      "text-lg font-black text-gray-900",
                                    children: [
                                      "$",
                                      Math.round(
                                        a.stats.totalValue,
                                      ).toLocaleString(),
                                    ],
                                  }),
                                  e.jsx("div", {
                                    className: "text-xs text-gray-600",
                                    children: "Across all orders",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          d &&
                            e.jsxs("div", {
                              className:
                                "mt-5 rounded-2xl border border-gray-200 bg-white p-4",
                              children: [
                                e.jsx("div", {
                                  className:
                                    "text-xs font-semibold text-gray-500 uppercase tracking-wider",
                                  children: "Recent Orders",
                                }),
                                e.jsxs("div", {
                                  className: "mt-2 space-y-2",
                                  children: [
                                    j
                                      .filter(
                                        (t) => t.supplierId === a.supplier.id,
                                      )
                                      .filter((t) => !!t.creationDate)
                                      .sort(
                                        (t, r) =>
                                          new Date(r.creationDate).getTime() -
                                          new Date(t.creationDate).getTime(),
                                      )
                                      .slice(0, 10)
                                      .map((t) =>
                                        e.jsxs(
                                          "div",
                                          {
                                            className:
                                              "flex items-center justify-between gap-3 rounded-xl border border-slate-200/70 bg-slate-50 px-3 py-2",
                                            children: [
                                              e.jsxs("div", {
                                                className: "min-w-0",
                                                children: [
                                                  e.jsx("div", {
                                                    className:
                                                      "text-sm font-semibold text-slate-900 truncate",
                                                    children: xe(t.id, "order"),
                                                  }),
                                                  e.jsx("div", {
                                                    className:
                                                      "text-xs text-slate-600 truncate",
                                                    children: t.description,
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className:
                                                  "shrink-0 text-right",
                                                children: [
                                                  e.jsx("div", {
                                                    className:
                                                      "text-xs font-semibold text-slate-700",
                                                    children: String(t.status),
                                                  }),
                                                  e.jsxs("div", {
                                                    className:
                                                      "text-xs text-slate-600",
                                                    children: [
                                                      "$",
                                                      Math.round(
                                                        Number(t.value || 0),
                                                      ).toLocaleString(),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          },
                                          t.id,
                                        ),
                                      ),
                                    j.filter(
                                      (t) => t.supplierId === a.supplier.id,
                                    ).length === 0
                                      ? e.jsx("div", {
                                          className: "text-sm text-slate-600",
                                          children:
                                            "No orders linked to this supplier yet.",
                                        })
                                      : null,
                                  ],
                                }),
                                e.jsx("div", {
                                  className: "mt-3 flex flex-wrap gap-2",
                                  children: e.jsx(x, {
                                    type: "button",
                                    variant: "outline",
                                    size: "sm",
                                    disabled: !D,
                                    onClick: () => {
                                      if (D) {
                                        try {
                                          localStorage.setItem(
                                            "bundleist_nav_intent",
                                            JSON.stringify({
                                              page: "orders",
                                              supplierId: a.supplier.id,
                                              searchTerm: "",
                                              statusFilter: "",
                                            }),
                                          );
                                        } catch {}
                                        D("orders");
                                      }
                                    },
                                    title: D
                                      ? "Open Orders filtered to this supplier"
                                      : "Navigation not available here",
                                    children: "Open Orders",
                                  }),
                                }),
                              ],
                            }),
                          d &&
                            e.jsxs("div", {
                              className: "mt-5 flex flex-wrap gap-2",
                              children: [
                                e.jsx(x, {
                                  type: "button",
                                  size: "xs",
                                  variant: "default",
                                  onClick: () => de(a.supplier),
                                  children: "Edit",
                                }),
                                e.jsx(x, {
                                  type: "button",
                                  size: "xs",
                                  variant: "destructive",
                                  onClick: () => ce(a.supplier),
                                  children: "Delete",
                                }),
                              ],
                            }),
                        ],
                      })
                    : e.jsx("div", {
                        className: "p-10 text-center text-gray-600",
                        children: "Select a supplier to see details.",
                      }),
                }),
              ],
            }),
          ],
        }),
        ke &&
          a &&
          e.jsxs("div", {
            className: "fixed inset-0 z-50 lg:hidden",
            children: [
              e.jsx("div", {
                className: "absolute inset-0 bg-black/30",
                onClick: () => P(!1),
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
                            children: "Supplier",
                          }),
                          e.jsx("div", {
                            className:
                              "text-lg font-black text-gray-900 truncate",
                            children: a.supplier.name,
                          }),
                          e.jsx("div", {
                            className: "text-sm text-gray-700 truncate",
                            children: a.supplier.contactPerson,
                          }),
                        ],
                      }),
                      e.jsx("button", {
                        type: "button",
                        onClick: () => P(!1),
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
                          e.jsx("span", {
                            className:
                              "px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200",
                            children:
                              a.effectiveRating > 0
                                ? `${a.effectiveRating.toFixed(1)}/10`
                                : "N/A",
                          }),
                          d &&
                            e.jsx("button", {
                              type: "button",
                              onClick: () => pe(a.supplier.id),
                              className:
                                "px-3 py-1 rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-700",
                              children: "Copy ID",
                            }),
                        ],
                      }),
                      e.jsx("div", {
                        className: "text-sm text-gray-600",
                        children: a.supplier.companyLocation,
                      }),
                      e.jsx("div", {
                        className: "text-sm text-gray-600",
                        children: e.jsx("a", {
                          href: `tel:${a.supplier.phoneNumber}`,
                          className:
                            "text-sky-700 hover:text-sky-900 font-semibold",
                          children: a.supplier.phoneNumber,
                        }),
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
                                children: "Orders",
                              }),
                              e.jsx("div", {
                                className: "text-base font-black text-gray-900",
                                children: a.stats.totalOrders,
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
                                children: "Value",
                              }),
                              e.jsxs("div", {
                                className: "text-base font-black text-gray-900",
                                children: [
                                  "$",
                                  Math.round(
                                    a.stats.totalValue,
                                  ).toLocaleString(),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      d &&
                        e.jsxs("div", {
                          className: "flex flex-col gap-2",
                          children: [
                            e.jsx(x, {
                              type: "button",
                              size: "xs",
                              variant: "default",
                              onClick: () => de(a.supplier),
                              className: "w-full",
                              children: "Edit Supplier",
                            }),
                            e.jsx(x, {
                              type: "button",
                              size: "xs",
                              variant: "destructive",
                              onClick: () => ce(a.supplier),
                              className: "w-full",
                              children: "Delete",
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        d &&
          e.jsx(G, {
            children: e.jsx(X, {
              isOpen: ye,
              onClose: () => ie(),
              title: "Edit Supplier",
              subtitle: "Update supplier profile details",
              gradientFrom: "from-emerald-50",
              gradientTo: "to-sky-50",
              icon: e.jsx("svg", {
                className: "w-6 h-6 text-emerald-600",
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
                className: "ui-form-skin",
                onSubmit: (t) => {
                  (t.preventDefault(), Ne());
                },
                children: [
                  e.jsxs(Y, {
                    title: "Supplier Information",
                    description:
                      "Keep contact and performance details current.",
                    children: [
                      e.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                        children: [
                          e.jsx(g, {
                            label: "Supplier Name",
                            required: !0,
                            children: e.jsx("input", {
                              type: "text",
                              value: p.name,
                              onChange: (t) => C("name", t.target.value),
                              className:
                                "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200",
                              required: !0,
                            }),
                          }),
                          e.jsx(g, {
                            label: "Contact Person",
                            required: !0,
                            children: e.jsx("input", {
                              type: "text",
                              value: p.contactPerson,
                              onChange: (t) =>
                                C("contactPerson", t.target.value),
                              className:
                                "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200",
                              required: !0,
                            }),
                          }),
                          e.jsx(g, {
                            label: "Company Location",
                            required: !0,
                            children: e.jsx("input", {
                              type: "text",
                              value: p.companyLocation,
                              onChange: (t) =>
                                C("companyLocation", t.target.value),
                              className:
                                "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200",
                              required: !0,
                            }),
                          }),
                          e.jsx(g, {
                            label: "Phone Number",
                            required: !0,
                            children: e.jsx("input", {
                              type: "tel",
                              value: p.phoneNumber,
                              onChange: (t) => C("phoneNumber", t.target.value),
                              className:
                                "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200",
                              required: !0,
                            }),
                          }),
                        ],
                      }),
                      e.jsx("div", {
                        className: "mt-6",
                        children: e.jsx(g, {
                          label: "Performance Rating",
                          help: "Optional rating from 1.0 to 10.0",
                          children: e.jsxs("div", {
                            className: "relative max-w-xs",
                            children: [
                              e.jsx("input", {
                                type: "number",
                                value: p.rating,
                                onChange: (t) => C("rating", t.target.value),
                                className:
                                  "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200",
                                min: "1",
                                max: "10",
                                step: "0.1",
                              }),
                              e.jsx("span", {
                                className:
                                  "absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm",
                                children: "/10",
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                  e.jsxs(Z, {
                    children: [
                      e.jsx(x, {
                        type: "button",
                        variant: "outline",
                        onClick: ie,
                        className: "w-full sm:w-auto",
                        children: "Cancel",
                      }),
                      e.jsx(x, {
                        type: "submit",
                        variant: "default",
                        className: "w-full sm:w-auto",
                        children: "Save Changes",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        d &&
          e.jsx("div", {
            className: "fixed inset-x-0 bottom-0 z-40 lg:hidden",
            children: e.jsx("div", {
              className: "mx-auto max-w-3xl px-3 pb-3",
              children: e.jsx("div", {
                className:
                  "rounded-2xl border border-gray-200 bg-white/95 backdrop-blur shadow-xl p-3",
                children: e.jsx(x, {
                  type: "button",
                  variant: "default",
                  onClick: () => k(!0),
                  className: "w-full h-11",
                  children: "Add Supplier",
                }),
              }),
            }),
          }),
      ],
    }),
  });
};
export { Ie as default };
