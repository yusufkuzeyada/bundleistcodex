import { r as a, j as e } from "./radix.js";
import {
  c as k,
  e as xe,
  O as Z,
  h as le,
  C as X,
  f as O,
  j as ne,
  k as Te,
  l as we,
  m as ze,
  o as We,
  p as Ce,
} from "./app.js";
import {
  F as Oe,
  a as Me,
  b as Be,
  c as Y,
  d as Re,
} from "./formerrorboundary.js";
import { P as _e } from "./pageheader.js";
import { D as Ge } from "./datafreshnesspill.js";
import { A as Ke } from "./activitytimeline.js";
import { B as Ue, f as He, A as qe } from "./audittrailpanel.js";
import { R as Ae } from "./relatedpanel.js";
import "./react.js";
import "./supabase.js";
import "./icons.js";
function Je({ title: t, titleId: o, ...m }, u) {
  return a.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: u,
        "aria-labelledby": o,
      },
      m,
    ),
    t ? a.createElement("title", { id: o }, t) : null,
    a.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "m19.5 8.25-7.5 7.5-7.5-7.5",
    }),
  );
}
const Ze = a.forwardRef(Je);
function Qe({ title: t, titleId: o, ...m }, u) {
  return a.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: u,
        "aria-labelledby": o,
      },
      m,
    ),
    t ? a.createElement("title", { id: o }, t) : null,
    a.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z",
    }),
  );
}
const Xe = a.forwardRef(Qe);
function Ye({ title: t, titleId: o, ...m }, u) {
  return a.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: u,
        "aria-labelledby": o,
      },
      m,
    ),
    t ? a.createElement("title", { id: o }, t) : null,
    a.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125",
    }),
  );
}
const et = a.forwardRef(Ye);
function tt({ title: t, titleId: o, ...m }, u) {
  return a.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: u,
        "aria-labelledby": o,
      },
      m,
    ),
    t ? a.createElement("title", { id: o }, t) : null,
    a.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0",
    }),
  );
}
const st = a.forwardRef(tt),
  at = ({
    title: t,
    subtitle: o,
    icon: m,
    actionLabel: u,
    onAction: M,
    isExpanded: z = !1,
    children: w,
    gradientFrom: W = "from-gray-50",
    gradientTo: I = "to-white",
    actionColor: f = "emerald",
  }) => {
    var b, S;
    const L = {
        emerald: { variant: "default" },
        blue: { variant: "secondary" },
        purple: { variant: "secondary" },
        orange: { variant: "outline" },
        red: { variant: "destructive" },
      },
      h = (b = L[f]) == null ? void 0 : b.variant,
      v = h
        ? (S = L[f]) == null
          ? void 0
          : S.className
        : typeof f == "string"
          ? f
          : void 0;
    return e.jsxs("div", {
      className: "ui-surface-solid overflow-hidden",
      children: [
        e.jsx("div", {
          className: `p-6 border-b border-slate-200/70 bg-gradient-to-r ${W} ${I}`,
          children: e.jsxs("div", {
            className:
              "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
            children: [
              e.jsxs("div", {
                className: "flex items-center space-x-4",
                children: [
                  m &&
                    e.jsx("div", {
                      className:
                        "p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60",
                      children: m,
                    }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("h2", {
                        className:
                          "text-xl sm:text-2xl font-semibold tracking-tight text-slate-900",
                        children: t,
                      }),
                      o &&
                        e.jsx("p", {
                          className: "text-sm text-slate-600 mt-1",
                          children: o,
                        }),
                    ],
                  }),
                ],
              }),
              h
                ? e.jsx(k, {
                    type: "button",
                    onClick: M,
                    variant: h,
                    className: "w-full sm:w-auto px-6 py-2.5",
                    children: u,
                  })
                : e.jsx(k, {
                    type: "button",
                    onClick: M,
                    variant: "default",
                    className: `w-full sm:w-auto px-6 py-2.5 ${v || ""}`,
                    children: u,
                  }),
            ],
          }),
        }),
        z &&
          w &&
          e.jsx("div", {
            className: "animate-in slide-in-from-top-2 fade-in duration-200",
            children: w,
          }),
      ],
    });
  },
  se = ({
    suffix: t,
    containerClassName: o = "",
    inputClassName: m = "",
    suffixClassName: u = "",
    ...M
  }) =>
    e.jsxs("div", {
      className: ["relative", o].join(" "),
      children: [
        e.jsx("input", { ...M, className: ["ui-field pr-14", m].join(" ") }),
        e.jsx("div", {
          className: [
            "pointer-events-none absolute inset-y-0 right-3 flex items-center",
            "text-xs font-semibold text-slate-500",
            u,
          ].join(" "),
          children: t,
        }),
      ],
    }),
  it = ({
    order: t,
    isOpen: o,
    onClose: m,
    onSave: u,
    allSuppliers: M,
    lockValue: z = !1,
    lockLogistics: w = !1,
    lockReasonValue: W,
    lockReasonLogistics: I,
  }) => {
    const [f, L] = a.useState(t.description),
      [h, v] = a.useState(t.value.toString()),
      [b, S] = a.useState(t.volumeM3.toString()),
      [F, K] = a.useState(t.weightKG.toString()),
      [D, E] = a.useState(t.supplierId),
      [n, r] = a.useState(t.notes || ""),
      { showError: d } = xe();
    if (
      (a.useEffect(() => {
        o &&
          (L(t.description),
          v(t.value.toString()),
          S(t.volumeM3.toString()),
          K(t.weightKG.toString()),
          E(t.supplierId),
          r(t.notes || ""));
      }, [t, o]),
      !o)
    )
      return null;
    const U = () => {
      if (!f.trim() || !h.trim() || !b.trim() || !F.trim() || !D) {
        d(
          "Missing Fields",
          "Please fill in all fields: Description, Value, Volume, Weight, and Supplier.",
        );
        return;
      }
      const x = z ? t.value : parseFloat(h),
        C = w ? t.volumeM3 : parseFloat(b),
        B = w ? t.weightKG : parseFloat(F);
      if (isNaN(x) || x <= 0) {
        d("Invalid Value", "Order value must be positive.");
        return;
      }
      if (isNaN(C) || C <= 0) {
        d("Invalid Volume", "Order volume must be positive.");
        return;
      }
      if (isNaN(B) || B <= 0) {
        d("Invalid Weight", "Order weight must be positive.");
        return;
      }
      (u(t.id, {
        description: f,
        value: x,
        volumeM3: C,
        weightKG: B,
        supplierId: D,
        notes: n,
      }),
        m());
    };
    return e.jsx("div", {
      className:
        "fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4",
      children: e.jsxs("div", {
        className:
          "bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto",
        children: [
          e.jsx("div", {
            className:
              "p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white",
            children: e.jsxs("div", {
              className: "flex items-center justify-between",
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsx("h2", {
                      className: "text-xl sm:text-2xl font-bold text-gray-900",
                      children: "Edit Order",
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2 mt-1",
                      children: [
                        e.jsx("p", {
                          className: "text-sm text-blue-600 font-medium",
                          children: O(t.id, "order"),
                        }),
                        e.jsx("button", {
                          onClick: () => Ce(t.id),
                          className:
                            "text-gray-400 hover:text-gray-600 transition-colors",
                          title: "Copy full ID",
                          children: e.jsx("svg", {
                            className: "w-3 h-3",
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
                e.jsx("button", {
                  onClick: m,
                  className:
                    "p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors",
                  children: e.jsx("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: e.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M6 18L18 6M6 6l12 12",
                    }),
                  }),
                }),
              ],
            }),
          }),
          e.jsxs("div", {
            className: "p-4 sm:p-6 space-y-4 sm:space-y-6",
            children: [
              (z || w) &&
                e.jsxs("div", {
                  className:
                    "rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900",
                  children: [
                    e.jsx("div", {
                      className: "font-semibold",
                      children: "Some fields are locked",
                    }),
                    e.jsxs("div", {
                      className: "mt-1 text-xs text-amber-800",
                      children: [
                        z &&
                          e.jsxs("div", {
                            children: [
                              "Value: ",
                              W ||
                                "Locked because charges have already been applied on the ledger.",
                            ],
                          }),
                        w &&
                          e.jsxs("div", {
                            children: [
                              "Volume/Weight: ",
                              I ||
                                "Locked because shipping costs were already distributed for the consolidation.",
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
              e.jsxs("div", {
                children: [
                  e.jsx("label", {
                    htmlFor: "editOrderDesc",
                    className: "block text-sm font-semibold text-gray-700 mb-2",
                    children: "Description",
                  }),
                  e.jsx("input", {
                    type: "text",
                    id: "editOrderDesc",
                    value: f,
                    onChange: (x) => L(x.target.value),
                    className: "ui-field",
                  }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("label", {
                    htmlFor: "editOrderSupplier",
                    className: "block text-sm font-semibold text-gray-700 mb-2",
                    children: "Supplier",
                  }),
                  e.jsx("select", {
                    id: "editOrderSupplier",
                    value: D,
                    onChange: (x) => E(x.target.value),
                    className: "ui-field",
                    children: M.map((x) =>
                      e.jsx("option", { value: x.id, children: x.name }, x.id),
                    ),
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsx("label", {
                        htmlFor: "editOrderValue",
                        className:
                          "block text-sm font-semibold text-gray-700 mb-2",
                        children: "Value ($)",
                      }),
                      e.jsx(se, {
                        type: "number",
                        id: "editOrderValue",
                        value: h,
                        onChange: (x) => v(x.target.value),
                        disabled: z,
                        min: "0.01",
                        step: "0.01",
                        suffix: "USD",
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("label", {
                        htmlFor: "editOrderVolume",
                        className:
                          "block text-sm font-semibold text-gray-700 mb-2",
                        children: "Volume (m3)",
                      }),
                      e.jsx(se, {
                        type: "number",
                        id: "editOrderVolume",
                        value: b,
                        onChange: (x) => S(x.target.value),
                        disabled: w,
                        min: "0.001",
                        step: "0.001",
                        suffix: "m3",
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("label", {
                        htmlFor: "editOrderWeight",
                        className:
                          "block text-sm font-semibold text-gray-700 mb-2",
                        children: "Weight (KG)",
                      }),
                      e.jsx(se, {
                        type: "number",
                        id: "editOrderWeight",
                        value: F,
                        onChange: (x) => K(x.target.value),
                        disabled: w,
                        min: "0.001",
                        step: "0.001",
                        suffix: "kg",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("label", {
                    htmlFor: "editOrderNotes",
                    className: "block text-sm font-semibold text-gray-700 mb-2",
                    children: "Notes",
                  }),
                  e.jsx("textarea", {
                    id: "editOrderNotes",
                    value: n,
                    onChange: (x) => r(x.target.value),
                    rows: 3,
                    className: "ui-field",
                    placeholder: "Internal notes for this order...",
                  }),
                ],
              }),
            ],
          }),
          e.jsxs("div", {
            className:
              "p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3",
            children: [
              e.jsx("button", {
                onClick: m,
                className:
                  "w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors",
                children: "Cancel",
              }),
              e.jsx(k, {
                type: "button",
                onClick: U,
                className: "w-full sm:w-auto",
                children: "Save Changes",
              }),
            ],
          }),
        ],
      }),
    });
  },
  ke = 24,
  rt = ({
    addOrder: t,
    allSuppliers: o,
    allCustomers: m,
    isAdmin: u,
    currentCustomerId: M,
    mode: z = "modalTrigger",
    onDone: w,
  }) => {
    const [W, I] = a.useState(""),
      [f, L] = a.useState(""),
      [h, v] = a.useState(""),
      [b, S] = a.useState(""),
      [F, K] = a.useState(""),
      [D, E] = a.useState(o.length > 0 ? o[0].id : ""),
      [n, r] = a.useState(u ? (m.length > 0 ? m[0].id : "") : M || ""),
      [d, U] = a.useState(!1),
      [x, C] = a.useState(!1),
      { showError: B } = xe();
    a.useEffect(() => {
      (!D && o.length > 0 && E(o[0].id),
        u && !n && m.length > 0 && r(m[0].id),
        !u && M && n !== M && r(M));
    }, [o, m, D, n]);
    const V = () => {
        (I(""),
          L(""),
          v(""),
          S(""),
          K(""),
          E(o.length > 0 ? o[0].id : ""),
          r(u ? (m.length > 0 ? m[0].id : "") : M || ""));
      },
      P = () => {
        (U(!1), V(), w == null || w());
      },
      j = async (c) => {
        if ((c.preventDefault(), x)) return;
        const ee = u ? n : M || "";
        if (!W.trim() || !f.trim() || !h.trim() || !b.trim() || !D || !ee) {
          B("Missing Fields", "Please fill in all fields.");
          return;
        }
        C(!0);
        try {
          (await Promise.resolve(
            t(
              {
                description: W,
                value: parseFloat(f),
                volumeM3: parseFloat(h),
                weightKG: parseFloat(b),
                supplierId: D,
                notes: F,
              },
              ee,
            ),
          ),
            P());
        } finally {
          C(!1);
        }
      },
      A = e.jsxs("form", {
        onSubmit: j,
        className: "ui-form-skin",
        children: [
          e.jsxs(Be, {
            title: "Order Details",
            description: "Enter the basic information for this order",
            children: [
              e.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: [
                  u &&
                    e.jsx(Y, {
                      label: "Customer",
                      required: !0,
                      error:
                        m.length === 0 ? "Please add a customer first" : void 0,
                      children: e.jsx("select", {
                        value: n,
                        onChange: (c) => r(c.target.value),
                        className: "ui-field",
                        disabled: m.length === 0,
                        required: !0,
                        children:
                          m.length === 0
                            ? e.jsx("option", {
                                children: "Please add a customer first",
                              })
                            : m.map((c) =>
                                e.jsxs(
                                  "option",
                                  {
                                    value: c.id,
                                    children: [
                                      c.companyName,
                                      " (",
                                      c.contactPerson,
                                      ")",
                                    ],
                                  },
                                  c.id,
                                ),
                              ),
                      }),
                    }),
                  e.jsx(Y, {
                    label: "Supplier",
                    required: !0,
                    error:
                      o.length === 0 ? "Please add a supplier first" : void 0,
                    children: e.jsx("select", {
                      value: D,
                      onChange: (c) => E(c.target.value),
                      className: "ui-field",
                      disabled: o.length === 0,
                      required: !0,
                      children:
                        o.length === 0
                          ? e.jsx("option", {
                              children: "Please add a supplier first",
                            })
                          : o.map((c) =>
                              e.jsx(
                                "option",
                                { value: c.id, children: c.name },
                                c.id,
                              ),
                            ),
                    }),
                  }),
                ],
              }),
              e.jsx("div", {
                className: "mt-6",
                children: e.jsx(Y, {
                  label: "Description",
                  required: !0,
                  help: "Brief description of the order items",
                  children: e.jsx("input", {
                    type: "text",
                    value: W,
                    onChange: (c) => I(c.target.value),
                    className: "ui-field",
                    placeholder: "e.g., 1000 units of Premium T-shirts",
                    required: !0,
                  }),
                }),
              }),
              e.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-6",
                children: [
                  e.jsx(Y, {
                    label: "Order Value",
                    required: !0,
                    help: "Total value in USD",
                    children: e.jsx(se, {
                      type: "number",
                      value: f,
                      onChange: (c) => L(c.target.value),
                      placeholder: "25000.00",
                      required: !0,
                      min: "0.01",
                      step: "0.01",
                      suffix: "USD",
                    }),
                  }),
                  e.jsx(Y, {
                    label: "Volume",
                    required: !0,
                    help: "Cubic meters",
                    children: e.jsx(se, {
                      type: "number",
                      value: h,
                      onChange: (c) => v(c.target.value),
                      placeholder: "15.5",
                      required: !0,
                      min: "0.001",
                      step: "0.001",
                      suffix: "m3",
                    }),
                  }),
                  e.jsx(Y, {
                    label: "Weight",
                    required: !0,
                    help: "Kilograms",
                    children: e.jsx(se, {
                      type: "number",
                      value: b,
                      onChange: (c) => S(c.target.value),
                      placeholder: "3000",
                      required: !0,
                      min: "0.001",
                      step: "0.001",
                      suffix: "kg",
                    }),
                  }),
                ],
              }),
              e.jsx("div", {
                className: "mt-6",
                children: e.jsx(Y, {
                  label: "Notes",
                  help: "Additional information or special instructions (optional)",
                  children: e.jsx("textarea", {
                    value: F,
                    onChange: (c) => K(c.target.value),
                    rows: 3,
                    className: "ui-field resize-none",
                    placeholder:
                      "Special handling instructions, delivery notes, etc.",
                  }),
                }),
              }),
            ],
          }),
          e.jsxs(Re, {
            children: [
              e.jsx(k, {
                type: "button",
                variant: "secondary",
                onClick: P,
                children: "Cancel",
              }),
              e.jsx(k, {
                type: "submit",
                disabled:
                  x || (u && m.length === 0) || o.length === 0 || (!u && !M),
                children: x ? "Creating..." : "Create Order",
              }),
            ],
          }),
        ],
      });
    return z === "inline"
      ? A
      : e.jsxs(e.Fragment, {
          children: [
            e.jsx(at, {
              title: "Create New Order",
              subtitle: "Add a new order to the system",
              actionLabel: "Create Order",
              onAction: () => U(!0),
              gradientFrom: "from-emerald-50",
              gradientTo: "to-green-50",
              actionColor: "emerald",
              icon: e.jsx("svg", {
                className: "w-6 h-6 text-emerald-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: e.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                }),
              }),
            }),
            e.jsx(Oe, {
              children: e.jsx(Me, {
                isOpen: d,
                onClose: P,
                title: "Create New Order",
                subtitle: "Add a new order to the system",
                maxWidth: "xl",
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
                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                  }),
                }),
                children: A,
              }),
            }),
          ],
        });
  },
  Se = ({
    order: t,
    isAdmin: o,
    getSupplierName: m,
    getCustomerName: u,
    updateOrderStatus: M,
    openEditModal: z,
    handleDeleteOrder: w,
    handleStatusUpdateClick: W,
    consolidations: I,
    shipments: f,
    transactions: L,
    onNavigate: h,
    onNavigateToShipment: v,
    defaultExpanded: b = !1,
  }) => {
    const S = (i) =>
        String(i || "")
          .replace(/_/g, " ")
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .trim(),
      [F, K] = a.useState(b),
      D = I.some((i) => i.orderIds.includes(t.id) && i.status !== X.Cancelled),
      E = f.some((i) => i.relatedId === t.id && i.type === "individual"),
      n = f.find((i) => i.relatedId === t.id && i.type === "individual"),
      r = I.find((i) => i.orderIds.includes(t.id) && i.status !== X.Cancelled),
      d = r
        ? f.find((i) => i.type === "consolidation" && i.relatedId === r.id)
        : void 0,
      U = I.some(
        (i) =>
          i.orderIds.includes(t.id) &&
          [X.InTransit, X.Delivered, X.Completed].includes(i.status),
      ),
      x = E || U,
      C =
        [Z.Delivered, Z.Completed].includes(t.status) ||
        (t.status === Z.Cancelled && x),
      B = le(t.status) === "shipments",
      V = D && [Z.Processing, Z.QualityCheck].includes(t.status),
      P = C || B || V,
      j = a.useMemo(
        () => (L || []).filter((i) => i.relatedOrderId === t.id),
        [L, t.id],
      ),
      A = a.useMemo(() => j.reduce((i, g) => i + (g.amount || 0), 0), [j]),
      c = a.useMemo(() => {
        const i = [];
        (t.creationDate && i.push(t.creationDate),
          n != null && n.shippingDate && i.push(n.shippingDate),
          r != null && r.creationDate && i.push(r.creationDate),
          d != null && d.shippingDate && i.push(d.shippingDate));
        for (const y of j) y.date && i.push(y.date);
        const g = i
          .map((y) => new Date(y).getTime())
          .filter((y) => !Number.isNaN(y))
          .reduce((y, R) => Math.max(y, R), 0);
        return g ? new Date(g) : null;
      }, [
        t.creationDate,
        n == null ? void 0 : n.shippingDate,
        r == null ? void 0 : r.creationDate,
        d == null ? void 0 : d.shippingDate,
        j,
      ]),
      ee = a.useMemo(() => {
        const i = [];
        (t.creationDate &&
          i.push({
            at: t.creationDate,
            title: "Order created",
            subtitle: t.description,
            tone: "neutral",
          }),
          r != null &&
            r.creationDate &&
            i.push({
              at: r.creationDate,
              title: `Added to consolidation ${O(r.id, "consolidation")}`,
              subtitle: `${r.name} (${S(String(r.status))})`,
              tone: "good",
              onClick: () => h("consolidations", r.id),
            }),
          n != null &&
            n.shippingDate &&
            i.push({
              at: n.shippingDate,
              title: `Individual shipment ${O(n.id, "shipment")}`,
              subtitle: S(String(n.status)),
              tone: "good",
              onClick: () => v(n.id),
            }),
          d != null &&
            d.shippingDate &&
            i.push({
              at: d.shippingDate,
              title: `Consolidation shipment ${O(d.id, "shipment")}`,
              subtitle: S(String(d.status)),
              tone: "good",
              onClick: () => v(d.id),
            }));
        for (const g of j)
          i.push({
            at: g.date,
            title: `${g.type} ${g.amount >= 0 ? "+" : ""}${g.amount.toLocaleString()}`,
            subtitle: g.description,
            tone: g.amount >= 0 ? "good" : "warn",
            onClick: () => {
              try {
                localStorage.setItem(
                  "bundleist_nav_intent",
                  JSON.stringify({ page: "payments", transactionId: g.id }),
                );
              } catch {}
              h("payments");
            },
          });
        return i
          .filter((g) => !Number.isNaN(new Date(g.at).getTime()))
          .sort((g, y) => new Date(y.at).getTime() - new Date(g.at).getTime());
      }, [t.creationDate, t.description, r, n, d, j, h, v]);
    let H = null;
    B
      ? (H = "Order status managed on Shipments page.")
      : C
        ? (H = "Status is final.")
        : V &&
          (H = "Order is in consolidation - manage on Consolidations page.");
    const re = a.useMemo(() => {
        const i = [{ label: "Orders", onClick: () => h("orders") }];
        return (
          i.push({ label: O(t.id, "order"), title: t.id }),
          r &&
            i.push({
              label: O(r.id, "consolidation"),
              title: r.id,
              onClick: () => h("consolidations", r.id),
            }),
          d
            ? i.push({
                label: O(d.id, "shipment"),
                title: d.id,
                onClick: () => v(d.id),
              })
            : n &&
              i.push({
                label: O(n.id, "shipment"),
                title: n.id,
                onClick: () => v(n.id),
              }),
          i
        );
      }, [
        t.id,
        t.description,
        r == null ? void 0 : r.id,
        d == null ? void 0 : d.id,
        n == null ? void 0 : n.id,
        h,
        v,
      ]),
      te = a.useMemo(() => {
        const i = [
            {
              id: t.id,
              label: O(t.id, "order"),
              subtitle: t.description,
              onClick: () => h("orders", t.id),
            },
          ],
          g = r
            ? [
                {
                  id: r.id,
                  label: O(r.id, "consolidation"),
                  subtitle: `${r.name} (${r.status})`,
                  onClick: () => h("consolidations", r.id),
                },
              ]
            : [],
          y = [];
        (n &&
          y.push({
            id: n.id,
            label: O(n.id, "shipment"),
            subtitle: `Individual (${n.status})`,
            onClick: () => v(n.id),
          }),
          d &&
            y.push({
              id: d.id,
              label: O(d.id, "shipment"),
              subtitle: `Consolidation (${d.status})`,
              onClick: () => v(d.id),
            }));
        const R = [
          {
            label: "Order cost",
            value: `$${j
              .filter((N) => N.type === "OrderCost")
              .reduce((N, T) => N + Math.abs(Number(T.amount || 0)), 0)
              .toLocaleString()}`,
          },
          {
            label: "Service fee",
            value: `$${j
              .filter((N) => N.type === "ServiceFee")
              .reduce((N, T) => N + Math.abs(Number(T.amount || 0)), 0)
              .toLocaleString()}`,
          },
          {
            label: "Shipping",
            value: `$${j
              .filter((N) => N.type === "ShippingCost")
              .reduce((N, T) => N + Math.abs(Number(T.amount || 0)), 0)
              .toLocaleString()}`,
          },
          {
            label: "Payments",
            value: `$${j
              .filter((N) => N.type === "IncomingPayment")
              .reduce((N, T) => N + Math.abs(Number(T.amount || 0)), 0)
              .toLocaleString()}`,
          },
        ];
        return {
          orders: i,
          consolidations: g,
          shipments: y,
          ledger: {
            net: A,
            summary: R,
            onViewPayments: () => {
              try {
                localStorage.setItem(
                  "bundleist_nav_intent",
                  JSON.stringify({ page: "payments", relatedOrderId: t.id }),
                );
              } catch {}
              h("payments");
            },
          },
        };
      }, [t.id, t.description, j, A, r, n, d, h, v]);
    return e.jsxs("div", {
      className: "ui-surface overflow-hidden",
      children: [
        e.jsxs("div", {
          className: "p-4 border-b border-gray-100",
          children: [
            e.jsx(Ue, { items: re, className: "mb-2" }),
            e.jsxs("div", {
              className:
                "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
              children: [
                e.jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [
                    e.jsxs("div", {
                      className: "flex flex-wrap items-center gap-2 mb-1",
                      children: [
                        e.jsxs("div", {
                          className:
                            "flex items-center gap-1 bg-blue-50 px-2 py-1 rounded",
                          children: [
                            e.jsx("span", {
                              className: "text-xs font-medium text-blue-600",
                              children: O(t.id, "order"),
                            }),
                            e.jsx(k, {
                              onClick: () => Ce(t.id),
                              variant: "ghost",
                              size: "icon",
                              className:
                                "h-7 w-7 text-blue-600 hover:bg-blue-100/60",
                              title: "Copy full ID",
                              children: e.jsx("svg", {
                                className: "w-3 h-3",
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
                        e.jsx("span", {
                          className: `px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${ne[t.status]}`,
                          children: t.status,
                        }),
                      ],
                    }),
                    e.jsx("h3", {
                      className:
                        "text-sm font-semibold text-gray-900 break-words",
                      children: t.description,
                    }),
                    e.jsx("p", {
                      className: "text-xs text-gray-500 mt-1",
                      children: m(t.supplierId),
                    }),
                    e.jsxs("div", {
                      className:
                        "mt-2 flex flex-wrap gap-x-2 gap-y-1 text-[11px] font-semibold text-slate-700",
                      children: [
                        o
                          ? e.jsxs("span", {
                              className:
                                "max-w-full truncate px-2 py-0.5 rounded-full bg-slate-100",
                              children: ["Customer: ", u(t.customerId)],
                            })
                          : null,
                        e.jsxs("span", {
                          className:
                            "px-2 py-0.5 rounded-full bg-slate-100 whitespace-nowrap",
                          children: [
                            "Vol: ",
                            Number(t.volumeM3 || 0).toFixed(2),
                            " m3",
                          ],
                        }),
                        e.jsxs("span", {
                          className:
                            "px-2 py-0.5 rounded-full bg-slate-100 whitespace-nowrap",
                          children: [
                            "Wt: ",
                            Number(t.weightKG || 0).toFixed(1),
                            " kg",
                          ],
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className:
                        "mt-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-700",
                      children: [
                        e.jsxs("span", {
                          className:
                            "px-2 py-0.5 rounded-full bg-slate-100 whitespace-nowrap",
                          children: [
                            "Tx: ",
                            j.length,
                            " (",
                            A >= 0 ? "+" : "",
                            A.toLocaleString(),
                            ")",
                          ],
                        }),
                        (() => {
                          const i = j
                              .filter((p) => p.type === "OrderCost")
                              .reduce(
                                (p, G) => p + Math.abs(Number(G.amount || 0)),
                                0,
                              ),
                            g = j
                              .filter((p) => p.type === "ServiceFee")
                              .reduce(
                                (p, G) => p + Math.abs(Number(G.amount || 0)),
                                0,
                              ),
                            y = j
                              .filter((p) => p.type === "OrderCostReversal")
                              .reduce(
                                (p, G) => p + Math.abs(Number(G.amount || 0)),
                                0,
                              ),
                            R = j
                              .filter((p) => p.type === "ServiceFeeReversal")
                              .reduce(
                                (p, G) => p + Math.abs(Number(G.amount || 0)),
                                0,
                              ),
                            J = Math.max(0, i - y),
                            N = Math.max(0, g - R),
                            T = J > 0.01 || N > 0.01,
                            ae =
                              i > 0.01 ||
                              g > 0.01 ||
                              y > 0.01 ||
                              R > 0.01 ||
                              !!t.chargesApplied,
                            de = T
                              ? "Applied"
                              : ae
                                ? "Reversed"
                                : "Not applied",
                            oe = T
                              ? "bg-emerald-50 text-emerald-700"
                              : ae
                                ? "bg-slate-100 text-slate-700"
                                : "bg-amber-50 text-amber-800",
                            ie = T
                              ? `Active charges on ledger. OrderCost remaining: ${J.toFixed(2)}, ServiceFee remaining: ${N.toFixed(2)}`
                              : ae
                                ? "Charges were applied but fully reversed on the ledger."
                                : "No order cost/service fee transactions found for this order.";
                          return e.jsxs("span", {
                            className: `px-2 py-0.5 rounded-full whitespace-nowrap ${oe}`,
                            title: ie,
                            children: ["Charges: ", de],
                          });
                        })(),
                        c &&
                          e.jsxs("span", {
                            className:
                              "px-2 py-0.5 rounded-full bg-white border border-slate-200/70 text-slate-700 whitespace-nowrap",
                            title: c.toLocaleString(),
                            children: ["Last activity: ", He(c)],
                          }),
                      ],
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className:
                    "flex w-full items-center justify-between gap-2 sm:ml-4 sm:w-auto sm:justify-end",
                  children: [
                    e.jsxs("div", {
                      className: "text-left sm:text-right",
                      children: [
                        e.jsxs("div", {
                          className: "text-lg font-bold text-gray-900",
                          children: ["$", t.value.toLocaleString()],
                        }),
                        e.jsx("div", {
                          className: "text-xs text-gray-500",
                          children: new Date(
                            t.creationDate,
                          ).toLocaleDateString(),
                        }),
                      ],
                    }),
                    e.jsxs(k, {
                      onClick: () => K(!F),
                      variant: "ghost",
                      size: "xs",
                      className: "text-slate-700 gap-1.5 shrink-0",
                      children: [
                        e.jsx("span", {
                          className: "font-semibold text-xs whitespace-nowrap",
                          children: F ? "Show less" : "Show more",
                        }),
                        e.jsx(Ze, {
                          className: `w-4 h-4 transition-transform duration-200 ${F ? "rotate-180" : ""}`,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        F &&
          e.jsxs("div", {
            className: "p-4 space-y-4",
            children: [
              e.jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: [
                  o &&
                    e.jsxs("div", {
                      className: "sm:col-span-2",
                      children: [
                        e.jsx("label", {
                          className:
                            "text-xs font-semibold text-gray-600 uppercase tracking-wider",
                          children: "Customer",
                        }),
                        e.jsx("p", {
                          className: "text-sm font-medium text-gray-900 mt-1",
                          children: u(t.customerId),
                        }),
                      ],
                    }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("label", {
                        className:
                          "text-xs font-semibold text-gray-600 uppercase tracking-wider",
                        children: "Volume",
                      }),
                      e.jsxs("p", {
                        className: "text-sm font-medium text-gray-900 mt-1",
                        children: [t.volumeM3, " m3"],
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("label", {
                        className:
                          "text-xs font-semibold text-gray-600 uppercase tracking-wider",
                        children: "Weight",
                      }),
                      e.jsxs("p", {
                        className: "text-sm font-medium text-gray-900 mt-1",
                        children: [t.weightKG, " KG"],
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("label", {
                    className:
                      "text-xs font-semibold text-gray-600 uppercase tracking-wider",
                    children: "Connected To",
                  }),
                  e.jsx("div", {
                    className: "mt-2 space-y-2",
                    children: e.jsxs("div", {
                      className: "flex min-w-0 flex-wrap gap-2",
                      children: [
                        r
                          ? e.jsxs(e.Fragment, {
                              children: [
                                e.jsx(k, {
                                  type: "button",
                                  variant: "outline",
                                  size: "sm",
                                  onClick: () => h("consolidations", r.id),
                                  className: "h-8 max-w-full px-3 rounded-full",
                                  title: "Open consolidation",
                                  children: e.jsxs("span", {
                                    className: "truncate",
                                    children: [
                                      "Consolidation ",
                                      O(r.id, "consolidation"),
                                    ],
                                  }),
                                }),
                                e.jsx("span", {
                                  className:
                                    "max-w-full px-3 py-1.5 text-xs font-semibold rounded-full bg-blue-50 border border-blue-200 text-blue-700 [overflow-wrap:anywhere]",
                                  children: S(String(r.status)),
                                }),
                              ],
                            })
                          : e.jsx("span", {
                              className:
                                "px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-50 border border-slate-200/70 text-slate-600",
                              children: "No consolidation",
                            }),
                        n
                          ? e.jsxs(e.Fragment, {
                              children: [
                                e.jsx(k, {
                                  type: "button",
                                  variant: "outline",
                                  size: "sm",
                                  onClick: () => v(n.id),
                                  className: "h-8 max-w-full px-3 rounded-full",
                                  title: "Open individual shipment",
                                  children: e.jsxs("span", {
                                    className: "truncate",
                                    children: [
                                      "Shipment ",
                                      O(n.id, "shipment"),
                                    ],
                                  }),
                                }),
                                e.jsx("span", {
                                  className:
                                    "max-w-full px-3 py-1.5 text-xs font-semibold rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 [overflow-wrap:anywhere]",
                                  children: S(String(n.status)),
                                }),
                              ],
                            })
                          : e.jsx("span", {
                              className:
                                "px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-50 border border-slate-200/70 text-slate-600",
                              children: "No individual shipment",
                            }),
                        d &&
                          e.jsxs(e.Fragment, {
                            children: [
                              e.jsx(k, {
                                type: "button",
                                variant: "outline",
                                size: "sm",
                                onClick: () => v(d.id),
                                className: "h-8 max-w-full px-3 rounded-full",
                                title: "Open consolidation shipment",
                                children: e.jsxs("span", {
                                  className: "truncate",
                                  children: [
                                    "Consolidation shipment ",
                                    O(d.id, "shipment"),
                                  ],
                                }),
                              }),
                              e.jsx("span", {
                                className:
                                  "max-w-full px-3 py-1.5 text-xs font-semibold rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 [overflow-wrap:anywhere]",
                                children: S(String(d.status)),
                              }),
                            ],
                          }),
                        e.jsxs(k, {
                          type: "button",
                          variant: "secondary",
                          size: "sm",
                          onClick: () => {
                            try {
                              localStorage.setItem(
                                "bundleist_nav_intent",
                                JSON.stringify({
                                  page: "payments",
                                  relatedOrderId: t.id,
                                }),
                              );
                            } catch {}
                            h("payments");
                          },
                          className: "h-8 px-3 rounded-full",
                          title: "Open payments filtered to this order",
                          children: ["Payments (", j.length, ")"],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("label", {
                    className:
                      "text-xs font-semibold text-gray-600 uppercase tracking-wider",
                    children: "Activity",
                  }),
                  e.jsx("div", {
                    className: "mt-2",
                    children: e.jsx(Ke, {
                      items: ee.slice(0, 12),
                      emptyText: "No activity for this order yet.",
                    }),
                  }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("label", {
                    className:
                      "text-xs font-semibold text-gray-600 uppercase tracking-wider",
                    children: "Related",
                  }),
                  e.jsx("div", {
                    className: "mt-2",
                    children: e.jsx(Ae, {
                      orders: te.orders,
                      consolidations: te.consolidations,
                      shipments: te.shipments,
                      ledger: te.ledger,
                    }),
                  }),
                ],
              }),
              e.jsx(qe, { entityType: "order", entityId: t.id }),
              t.notes &&
                e.jsxs("div", {
                  children: [
                    e.jsx("label", {
                      className:
                        "text-xs font-semibold text-gray-600 uppercase tracking-wider",
                      children: "Notes",
                    }),
                    e.jsx("div", {
                      className: "mt-2 p-3 bg-gray-50 rounded-lg",
                      children: e.jsx("p", {
                        className: "text-sm text-gray-700 whitespace-pre-wrap",
                        children: t.notes,
                      }),
                    }),
                  ],
                }),
              o &&
                e.jsxs("div", {
                  className: "border-t border-gray-100 pt-4",
                  children: [
                    e.jsx("label", {
                      className:
                        "text-xs font-semibold text-gray-600 uppercase tracking-wider",
                      children: "Status Management",
                    }),
                    e.jsxs("div", {
                      className:
                        "flex items-center justify-end gap-2 mt-2 flex-wrap",
                      children: [
                        e.jsx(k, {
                          onClick: () => W(t),
                          disabled: P,
                          variant: P ? "outline" : "default",
                          size: "xs",
                          className: "h-8",
                          "aria-label": `Update status for order ${t.id}`,
                          children: P ? "Status Locked" : "Update Status",
                        }),
                        H &&
                          e.jsxs("div", {
                            className: "relative group",
                            children: [
                              e.jsx(k, {
                                type: "button",
                                variant: "ghost",
                                size: "iconSm",
                                className: "text-slate-700",
                                tabIndex: 0,
                                "aria-label": "Show status info",
                                children: e.jsx(Xe, { className: "w-4 h-4" }),
                              }),
                              e.jsx("div", {
                                className:
                                  "absolute left-1/2 z-50 -translate-x-1/2 bottom-full mb-2 w-48 rounded bg-gray-800 text-white text-xs px-2 py-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity whitespace-normal break-words shadow-xl border border-gray-700",
                                children: H,
                              }),
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
              o &&
                !C &&
                e.jsx("div", {
                  className: "border-t border-gray-100 pt-4",
                  children: e.jsxs("div", {
                    className: "flex items-center justify-end gap-2 flex-wrap",
                    children: [
                      e.jsxs(k, {
                        onClick: () => z(t),
                        variant: "outline",
                        size: "xs",
                        className: "h-8 justify-center gap-2",
                        children: [
                          e.jsx(et, { className: "w-4 h-4 shrink-0" }),
                          "Edit",
                        ],
                      }),
                      e.jsxs(k, {
                        onClick: () => w(t.id),
                        disabled: t.status !== Z.Pending,
                        variant: "destructive",
                        size: "xs",
                        className: "h-8 justify-center gap-2",
                        title:
                          t.status !== Z.Pending
                            ? "Can only delete pending orders"
                            : "Delete order",
                        children: [
                          e.jsx(st, { className: "w-4 h-4 shrink-0" }),
                          "Delete",
                        ],
                      }),
                    ],
                  }),
                }),
            ],
          }),
      ],
    });
  },
  bt = ({
    orders: t,
    transactions: o,
    addOrder: m,
    updateOrderStatus: u,
    updateOrderDetails: M,
    deleteOrder: z,
    allSuppliers: w,
    allCustomers: W,
    currentCustomerId: I,
    consolidations: f,
    shipments: L,
    ordersLoading: h,
    ordersError: v,
    isAdmin: b,
    onNavigate: S,
    onNavigateToShipment: F,
  }) => {
    var je;
    const [K, D] = a.useState(!1),
      [E, n] = a.useState(null),
      [r, d] = a.useState(""),
      [U, x] = a.useState(""),
      [C, B] = a.useState(""),
      [V, P] = a.useState(1),
      [j, A] = a.useState([]),
      [c, ee] = a.useState(0),
      [H, re] = a.useState(!1),
      [te, i] = a.useState(null),
      [g, y] = a.useState(!1),
      [R, J] = a.useState(null),
      [N, T] = a.useState(null),
      [ae, de] = a.useState(0),
      [oe, ie] = a.useState(!1),
      [p, G] = a.useState(null),
      { showError: lt } = xe();
    (a.useEffect(() => {
      try {
        const s = localStorage.getItem("bundleist_orders_state");
        if (!s) return;
        const l = JSON.parse(s);
        (l && typeof l.searchTerm == "string" && d(l.searchTerm),
          l && typeof l.statusFilter == "string" && B(l.statusFilter),
          l &&
            typeof l.currentPage == "number" &&
            P(Math.max(1, l.currentPage)),
          l && typeof l.selectedOrderId == "string" && J(l.selectedOrderId));
      } catch {}
    }, []),
      a.useEffect(() => {
        try {
          localStorage.setItem(
            "bundleist_orders_state",
            JSON.stringify({
              searchTerm: r,
              statusFilter: C,
              currentPage: V,
              selectedOrderId: R,
            }),
          );
        } catch {}
      }, [r, C, V, R]),
      a.useEffect(() => {
        try {
          const s = localStorage.getItem("bundleist_nav_intent");
          if (!s) return;
          const l = JSON.parse(s);
          if (!l || l.page !== "orders") return;
          (typeof l.searchTerm == "string" && d(l.searchTerm),
            typeof l.statusFilter == "string" && B(l.statusFilter),
            typeof l.orderId == "string" && J(l.orderId),
            P(1),
            localStorage.removeItem("bundleist_nav_intent"));
        } catch {}
      }, []));
    const he = (s) => {
        (n(s), D(!0));
      },
      pe = () => {
        (n(null), D(!1));
      },
      Ie = (s, l) => {
        (M(s, l), pe());
      },
      ge = (s) => {
        window.confirm(
          `Are you sure you want to delete order ${s}? This cannot be undone.`,
        ) && z(s);
      },
      fe = (s) => {
        (G(s), ie(!0));
      },
      Le = async (s) => {
        p && (await u(p.id, s), ie(!1), G(null));
      },
      Fe = () => {
        (ie(!1), G(null));
      };
    (a.useEffect(() => {
      const s = setTimeout(() => {
        (x(r.trim()), P(1));
      }, 300);
      return () => clearTimeout(s);
    }, [r]),
      a.useEffect(() => {
        P(1);
      }, [C]),
      a.useEffect(() => {
        (async () => {
          (re(!0), i(null));
          try {
            const l = await We.fetchPage({
              page: V,
              pageSize: ke,
              searchTerm: U,
              status: C,
              customerId: I,
              isAdmin: b,
            });
            (A(l.orders), ee(l.totalCount), T(new Date()));
          } catch (l) {
            const $ = l instanceof Error ? l.message : "Failed to load orders";
            i($);
          } finally {
            re(!1);
          }
        })();
      }, [V, U, C, I, b, t, ae]));
    const _ = j,
      Q = _.find((s) => s.id === R) || (_[0] ?? null),
      ce = Math.max(1, Math.ceil(c / ke)),
      De = H || (h && _.length === 0),
      be = te || v;
    a.useEffect(() => {
      if (!Q) {
        J(null);
        return;
      }
      (!R || !_.some((s) => s.id === R)) && J(Q.id);
    }, [V, U, C, H, c]);
    const Ee = "Orders",
      me = (s) => {
        var l;
        return (
          ((l = w.find(($) => $.id === s)) == null ? void 0 : l.name) ||
          "Unknown"
        );
      },
      ue = (s) => {
        var l;
        return (
          ((l = W.find(($) => $.id === s)) == null ? void 0 : l.companyName) ||
          "Unknown"
        );
      },
      ve = _.filter((s) => s.status === Z.Pending).length,
      Pe = _.filter((s) => le(s.status) === "shipments").length,
      $e = _.filter((s) =>
        f.some((l) => l.status !== X.Cancelled && l.orderIds.includes(s.id)),
      ).length,
      Ve = _.reduce((s, l) => s + (l.value || 0), 0);
    return e.jsxs("div", {
      className: "ui-page",
      children: [
        e.jsxs("div", {
          className: "px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6",
          children: [
            e.jsx(_e, {
              title: Ee,
              subtitle: b
                ? "Search, update, and progress orders through the workflow."
                : "Search and track your orders by status.",
              icon: e.jsx("svg", {
                className: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: e.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                }),
              }),
              actions: [
                {
                  label: "Refresh",
                  onClick: () => de((s) => s + 1),
                  variant: "outline",
                },
              ],
              right: e.jsx(Ge, { asOf: N }),
            }),
            e.jsx(Oe, {
              children: e.jsx(Me, {
                isOpen: g,
                onClose: () => y(!1),
                title: "Create Order",
                subtitle: b
                  ? "Enter order details and assign customer/supplier."
                  : "Enter order details.",
                gradientFrom: "from-emerald-50",
                gradientTo: "to-slate-50",
                icon: e.jsx("svg", {
                  className: "w-6 h-6 text-emerald-700",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: e.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                  }),
                }),
                children: e.jsx(rt, {
                  mode: "inline",
                  addOrder: m,
                  allSuppliers: w,
                  allCustomers: W,
                  isAdmin: b,
                  currentCustomerId: I,
                  onDone: () => y(!1),
                }),
              }),
            }),
            e.jsxs("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-3",
              children: [
                e.jsxs("div", {
                  className:
                    "rounded-xl border border-slate-200/70 bg-white px-4 py-3",
                  children: [
                    e.jsx("div", {
                      className: "ui-kicker",
                      children: "Matching",
                    }),
                    e.jsx("div", {
                      className: "text-xl font-extrabold text-slate-900",
                      children: c,
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className:
                    "rounded-xl border border-amber-200 bg-amber-50 px-4 py-3",
                  children: [
                    e.jsx("div", {
                      className: "ui-kicker text-amber-700",
                      children: "Pending",
                    }),
                    e.jsx("div", {
                      className: "text-xl font-extrabold text-amber-900",
                      children: ve,
                    }),
                    e.jsx("div", {
                      className:
                        "mt-1 text-[11px] font-semibold text-amber-800/70",
                      children: "Shown on this page",
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className:
                    "rounded-xl border border-blue-200 bg-blue-50 px-4 py-3",
                  children: [
                    e.jsx("div", {
                      className: "ui-kicker text-blue-700",
                      children: "Needs Shipping",
                    }),
                    e.jsx("div", {
                      className: "text-xl font-extrabold text-blue-900",
                      children: Pe,
                    }),
                    e.jsx("div", {
                      className:
                        "mt-1 text-[11px] font-semibold text-blue-800/70",
                      children: "Shown on this page",
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className:
                    "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3",
                  children: [
                    e.jsx("div", {
                      className: "ui-kicker text-emerald-700",
                      children: "Value",
                    }),
                    e.jsxs("div", {
                      className: "text-xl font-extrabold text-emerald-900",
                      children: ["$", Ve.toLocaleString()],
                    }),
                    e.jsx("div", {
                      className:
                        "mt-1 text-[11px] font-semibold text-emerald-800/70",
                      children: "Shown on this page",
                    }),
                  ],
                }),
              ],
            }),
            e.jsxs("div", {
              className: "ui-surface overflow-hidden",
              children: [
                e.jsx("div", {
                  className:
                    "p-4 sm:p-6 border-b border-slate-200/70 bg-white/60 backdrop-blur",
                  children: e.jsxs("div", {
                    className:
                      "flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between",
                    children: [
                      e.jsxs("div", {
                        className:
                          "flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3",
                        children: [
                          e.jsxs("div", {
                            className: "relative",
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
                                type: "text",
                                placeholder: "Search description...",
                                value: r,
                                onChange: (s) => d(s.target.value),
                                className: "ui-field ui-field--sm pl-10 pr-3",
                              }),
                            ],
                          }),
                          e.jsxs("select", {
                            value: C,
                            onChange: (s) => B(s.target.value),
                            className: "ui-field ui-field--sm",
                            children: [
                              e.jsx("option", {
                                value: "",
                                children: "All statuses",
                              }),
                              Object.values(Z).map((s) =>
                                e.jsx("option", { value: s, children: s }, s),
                              ),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "flex flex-wrap gap-2 lg:justify-end",
                        children: [
                          e.jsx(k, {
                            type: "button",
                            onClick: () => y(!0),
                            variant: "default",
                            title: "Create a new order",
                            disabled: !b && !I,
                            children: "Create Order",
                          }),
                          e.jsxs("div", {
                            className:
                              "px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700",
                            children: [
                              "Total: ",
                              e.jsx("span", {
                                className: "font-semibold text-slate-900",
                                children: c,
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className:
                              "px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700",
                            children: [
                              "Pending: ",
                              e.jsx("span", {
                                className: "font-semibold text-slate-900",
                                children: ve,
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className:
                              "px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700",
                            children: [
                              "In consolidation: ",
                              e.jsx("span", {
                                className: "font-semibold text-slate-900",
                                children: $e,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                De
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
                          "Loading orders...",
                        ],
                      }),
                    })
                  : be
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
                            be,
                          ],
                        }),
                      })
                    : _.length === 0
                      ? e.jsxs("div", {
                          className: "text-center py-12",
                          children: [
                            e.jsx("div", {
                              className:
                                "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",
                              children: e.jsx("svg", {
                                className: "w-8 h-8 text-gray-400",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: e.jsx("path", {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: 2,
                                  d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                                }),
                              }),
                            }),
                            e.jsx("p", {
                              className: "text-gray-500 text-lg",
                              children: "No orders match your criteria.",
                            }),
                          ],
                        })
                      : e.jsxs(e.Fragment, {
                          children: [
                            e.jsx("div", {
                              className: "lg:hidden p-4 sm:p-6",
                              children: e.jsx("div", {
                                className:
                                  "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6",
                                children: _.map((s) =>
                                  e.jsx(
                                    Se,
                                    {
                                      order: s,
                                      isAdmin: b,
                                      getSupplierName: me,
                                      getCustomerName: ue,
                                      updateOrderStatus: u,
                                      openEditModal: he,
                                      handleDeleteOrder: ge,
                                      handleStatusUpdateClick: fe,
                                      consolidations: f,
                                      shipments: L,
                                      transactions: o,
                                      onNavigate: S,
                                      onNavigateToShipment: F,
                                    },
                                    s.id,
                                  ),
                                ),
                              }),
                            }),
                            e.jsxs("div", {
                              className:
                                "hidden lg:grid grid-cols-12 gap-4 p-6",
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
                                              children: "Orders",
                                            }),
                                            e.jsxs("div", {
                                              className:
                                                "text-xs text-slate-600",
                                              children: [
                                                _.length,
                                                " on this page",
                                              ],
                                            }),
                                          ],
                                        }),
                                      }),
                                      e.jsx("div", {
                                        className:
                                          "max-h-[62vh] overflow-auto divide-y divide-slate-100",
                                        children: _.map((s) => {
                                          const l =
                                            (Q == null ? void 0 : Q.id) ===
                                            s.id;
                                          return e.jsx(
                                            "button",
                                            {
                                              type: "button",
                                              onClick: () => J(s.id),
                                              className: [
                                                "group w-full text-left px-4 py-3 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/10",
                                                l
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
                                                            className:
                                                              "px-2 py-0.5 text-[11px] font-semibold rounded-full bg-slate-100 text-slate-700",
                                                            children: O(
                                                              s.id,
                                                              "order",
                                                            ),
                                                          }),
                                                          e.jsx("span", {
                                                            className: `px-2 py-0.5 text-[11px] font-semibold rounded-full ${ne[s.status]}`,
                                                            children: s.status,
                                                          }),
                                                          f.some(
                                                            ($) =>
                                                              $.status !==
                                                                X.Cancelled &&
                                                              $.orderIds.includes(
                                                                s.id,
                                                              ),
                                                          ) &&
                                                            e.jsx("span", {
                                                              className:
                                                                "px-2 py-0.5 text-[11px] font-semibold rounded-full bg-blue-50 text-blue-700",
                                                              children:
                                                                "In consolidation",
                                                            }),
                                                          L.some(
                                                            ($) =>
                                                              $.relatedId ===
                                                                s.id &&
                                                              $.type ===
                                                                "individual",
                                                          ) &&
                                                            e.jsx("span", {
                                                              className:
                                                                "px-2 py-0.5 text-[11px] font-semibold rounded-full bg-emerald-50 text-emerald-700",
                                                              children:
                                                                "Has shipment",
                                                            }),
                                                        ],
                                                      }),
                                                      e.jsx("div", {
                                                        className:
                                                          "font-semibold text-slate-900 break-words",
                                                        children: s.description,
                                                      }),
                                                      e.jsxs("div", {
                                                        className:
                                                          "mt-1 text-xs text-slate-600 flex flex-wrap gap-x-3 gap-y-1",
                                                        children: [
                                                          e.jsx("span", {
                                                            children: me(
                                                              s.supplierId,
                                                            ),
                                                          }),
                                                          b
                                                            ? e.jsx("span", {
                                                                children: ue(
                                                                  s.customerId,
                                                                ),
                                                              })
                                                            : null,
                                                          e.jsxs("span", {
                                                            children: [
                                                              "$",
                                                              s.value.toLocaleString(),
                                                            ],
                                                          }),
                                                          l
                                                            ? e.jsxs(
                                                                e.Fragment,
                                                                {
                                                                  children: [
                                                                    e.jsxs(
                                                                      "span",
                                                                      {
                                                                        className:
                                                                          "text-slate-500",
                                                                        children:
                                                                          [
                                                                            Number(
                                                                              s.volumeM3 ||
                                                                                0,
                                                                            ).toFixed(
                                                                              2,
                                                                            ),
                                                                            " m3",
                                                                          ],
                                                                      },
                                                                    ),
                                                                    e.jsxs(
                                                                      "span",
                                                                      {
                                                                        className:
                                                                          "text-slate-500",
                                                                        children:
                                                                          [
                                                                            Number(
                                                                              s.weightKG ||
                                                                                0,
                                                                            ).toFixed(
                                                                              1,
                                                                            ),
                                                                            " kg",
                                                                          ],
                                                                      },
                                                                    ),
                                                                    e.jsx(
                                                                      "span",
                                                                      {
                                                                        className:
                                                                          "text-slate-500",
                                                                        children:
                                                                          new Date(
                                                                            s.creationDate,
                                                                          ).toLocaleDateString(),
                                                                      },
                                                                    ),
                                                                  ],
                                                                },
                                                              )
                                                            : null,
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                  e.jsx("div", {
                                                    className: "shrink-0 pt-1",
                                                    children: e.jsx("svg", {
                                                      className: `w-5 h-5 ${l ? "text-emerald-700" : "text-slate-300"}`,
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
                                            s.id,
                                          );
                                        }),
                                      }),
                                    ],
                                  }),
                                }),
                                e.jsx("div", {
                                  className: "col-span-7",
                                  children: e.jsx("div", {
                                    className: "sticky top-24",
                                    children: Q
                                      ? e.jsx(
                                          Se,
                                          {
                                            order: Q,
                                            defaultExpanded: !1,
                                            isAdmin: b,
                                            getSupplierName: me,
                                            getCustomerName: ue,
                                            updateOrderStatus: u,
                                            openEditModal: he,
                                            handleDeleteOrder: ge,
                                            handleStatusUpdateClick: fe,
                                            consolidations: f,
                                            shipments: L,
                                            transactions: o,
                                            onNavigate: S,
                                            onNavigateToShipment: F,
                                          },
                                          Q.id,
                                        )
                                      : e.jsx("div", {
                                          className:
                                            "rounded-2xl border border-slate-200/70 bg-white p-8 text-center text-slate-600",
                                          children:
                                            "Select an order to view details.",
                                        }),
                                  }),
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className:
                                "mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-gray-100 pt-4",
                              children: [
                                e.jsxs("p", {
                                  className: "text-sm text-gray-600",
                                  children: [
                                    "Showing page ",
                                    V,
                                    " of ",
                                    ce,
                                    " (",
                                    c,
                                    " total)",
                                  ],
                                }),
                                e.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    e.jsx(k, {
                                      type: "button",
                                      variant: "outline",
                                      onClick: () =>
                                        P((s) => Math.max(1, s - 1)),
                                      disabled: V <= 1 || H,
                                      children: "Previous",
                                    }),
                                    e.jsx(k, {
                                      type: "button",
                                      variant: "outline",
                                      onClick: () =>
                                        P((s) => Math.min(ce, s + 1)),
                                      disabled: V >= ce || H,
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
          ],
        }),
        E &&
          K &&
          (() => {
            const $ =
                (o || [])
                  .filter((q) => q.relatedOrderId === E.id)
                  .some(
                    (q) =>
                      q.type === "OrderCost" ||
                      q.type === "ServiceFee" ||
                      q.type === "OrderCostReversal" ||
                      q.type === "ServiceFeeReversal",
                  ) || !!E.chargesApplied,
              ye = f.find(
                (q) =>
                  q.status !== X.Cancelled &&
                  q.orderIds.includes(E.id) &&
                  q.shippingCostDistributed,
              ),
              Ne = !!ye;
            return e.jsx(it, {
              order: E,
              isOpen: K,
              onClose: pe,
              onSave: Ie,
              allSuppliers: w,
              lockValue: $,
              lockLogistics: Ne,
              lockReasonValue: $
                ? "Locked because OrderCost/ServiceFee ledger entries exist for this order."
                : void 0,
              lockReasonLogistics: Ne
                ? `Locked because consolidation ${O(ye.id, "consolidation")} already distributed shipping costs.`
                : void 0,
            });
          })(),
        p &&
          oe &&
          e.jsx("div", {
            className:
              "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
            children: e.jsxs("div", {
              className:
                "bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto",
              children: [
                e.jsx("h3", {
                  className: "text-lg font-semibold text-gray-900 mb-2",
                  children: "Update Order Status",
                }),
                e.jsxs("div", {
                  className: "mb-4",
                  children: [
                    e.jsxs("p", {
                      className: "text-sm text-gray-600 mb-2",
                      children: [
                        "Current status: ",
                        e.jsx("span", {
                          className: `inline-flex px-2 py-1 text-xs font-medium rounded-full ${ne[p.status]}`,
                          children: p.status,
                        }),
                      ],
                    }),
                    e.jsxs("p", {
                      className: "text-xs text-gray-500",
                      children: [
                        "Phase: ",
                        ((je = Object.entries(Te).find(([s, l]) =>
                          l.includes(p.status),
                        )) == null
                          ? void 0
                          : je[0]) || "Unknown",
                      ],
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className: "space-y-3 mb-6",
                  children: [
                    we(p.status).map((s) => {
                      const l = le(s) === "shipments";
                      return e.jsx(
                        "button",
                        {
                          onClick: () => Le(s),
                          className: `w-full px-4 py-3 text-left rounded-lg border-2 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${ne[s]} border-transparent`,
                          children: e.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [
                              e.jsxs("div", {
                                className: "flex-1",
                                children: [
                                  e.jsxs("div", {
                                    className: "font-medium text-sm",
                                    children: ["Move to: ", s],
                                  }),
                                  e.jsx("div", {
                                    className: "text-xs opacity-75 mt-1",
                                    children: ze[s],
                                  }),
                                  l &&
                                    e.jsx("div", {
                                      className:
                                        "text-xs text-blue-700 font-medium mt-2",
                                      children:
                                        "Note: shipment lifecycle is managed on the Shipments page after this.",
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
                        s,
                      );
                    }),
                    we(p.status).length === 0 &&
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
                            className: "text-sm",
                            children: "No status changes available",
                          }),
                          e.jsx("div", {
                            className: "text-xs mt-1",
                            children:
                              le(p.status) === "shipments"
                                ? "This order is managed on the Shipments page"
                                : "This order is in a final state",
                          }),
                        ],
                      }),
                  ],
                }),
                e.jsx(k, {
                  type: "button",
                  onClick: Fe,
                  variant: "secondary",
                  className: "w-full",
                  children: "Cancel",
                }),
              ],
            }),
          }),
      ],
    });
  };
export { bt as default };
