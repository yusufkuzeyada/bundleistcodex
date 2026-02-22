import { r, j as e } from "./radix.js";
import {
  q as Ne,
  e as Ue,
  c as S,
  C as f,
  r as tt,
  T as st,
  s as Kt,
  f as he,
  p as ut,
  t as zt,
  v as Gt,
  O as Ut,
} from "./app.js";
import {
  F as qt,
  a as Ht,
  b as Ge,
  c as Ce,
  d as Jt,
} from "./formerrorboundary.js";
import { P as Yt } from "./pageheader.js";
import { D as Qt } from "./datafreshnesspill.js";
import { A as Xt } from "./activitytimeline.js";
import { B as Zt, f as es, A as ts } from "./audittrailpanel.js";
import { R as ss } from "./relatedpanel.js";
import "./react.js";
import "./supabase.js";
import "./icons.js";
const as = ({
    id: s,
    value: j,
    onChange: F,
    placeholder: y,
    className: q,
    disabled: k = !1,
    min: X,
    step: T,
    required: _ = !1,
  }) => {
    const B = r.useRef(null);
    r.useEffect(() => {
      B.current && B.current.value !== j && (B.current.value = j);
    }, [j]);
    const D = (x) => {
        try {
          const $ = x.target.value;
          ($ === "" || /^\d*\.?\d*$/.test($)) &&
            setTimeout(() => {
              try {
                F($);
              } catch (M) {
                console.error(
                  "SafeNumericInput: Error in onChange callback:",
                  M,
                );
              }
            }, 0);
        } catch ($) {
          console.error("SafeNumericInput: Error in handleChange:", $);
        }
      },
      I = (x) => {
        try {
          if (
            [8, 9, 27, 13, 46].indexOf(x.keyCode) !== -1 ||
            (x.keyCode === 65 && x.ctrlKey === !0) ||
            (x.keyCode === 67 && x.ctrlKey === !0) ||
            (x.keyCode === 86 && x.ctrlKey === !0) ||
            (x.keyCode === 88 && x.ctrlKey === !0) ||
            (x.keyCode >= 35 && x.keyCode <= 39)
          )
            return;
          (x.shiftKey || x.keyCode < 48 || x.keyCode > 57) &&
            (x.keyCode < 96 || x.keyCode > 105) &&
            x.keyCode !== 190 &&
            x.keyCode !== 110 &&
            x.preventDefault();
        } catch ($) {
          console.error("SafeNumericInput: Error in handleKeyDown:", $);
        }
      };
    return e.jsx("input", {
      ref: B,
      type: "text",
      id: s,
      defaultValue: j,
      onChange: D,
      onKeyDown: I,
      placeholder: y,
      className: q,
      disabled: k,
      required: _,
      pattern: "[0-9]*\\.?[0-9]*",
      inputMode: "decimal",
      "aria-label": y,
      "aria-describedby": s ? `${s}-description` : void 0,
    });
  },
  is = ({
    isOpen: s,
    onClose: j,
    onSubmit: F,
    allCustomers: y,
    isAdmin: q,
    currentCustomerId: k,
  }) => {
    const [X, T] = r.useState(""),
      [_, B] = r.useState(""),
      [D, I] = r.useState(""),
      [x, $] = r.useState(Ne.length > 0 ? Ne[0].id : ""),
      [M, A] = r.useState(""),
      [b, Z] = r.useState(!1),
      [d, O] = r.useState(!1),
      [N, W] = r.useState(""),
      [P, v] = r.useState("volume_proportional"),
      [pe, ee] = r.useState(""),
      { showError: C } = Ue();
    r.useEffect(() => {
      s &&
        (T(""),
        B(""),
        I(""),
        $(Ne.length > 0 ? Ne[0].id : ""),
        A(""),
        Z(!1),
        O(!1),
        W(q && y.length > 0 ? y[0].id : k || ""),
        v("volume_proportional"),
        ee(""));
    }, [s, q, y, k]);
    const E = (h) => {
        (O(h),
          h
            ? W("")
            : (N === "" && (q && y.length > 0 ? W(y[0].id) : W(k || "")),
              v("volume_proportional"),
              ee("")));
      },
      oe = (h) => {
        h.preventDefault();
        const Y = d ? null : q ? N : k;
        if (!X.trim() || !_.trim() || !D.trim() || !x) {
          C(
            "Missing Fields",
            "Please fill in Name, Route, Departure Date, and Container Type.",
          );
          return;
        }
        if (!d && !Y) {
          C(
            "Missing Customer",
            "Please select a customer for this consolidation.",
          );
          return;
        }
        if (d && !P) {
          C(
            "Missing Distribution Method",
            "Please select a cost distribution method for the mixed consolidation.",
          );
          return;
        }
        const ae = new Date();
        ae.setHours(0, 0, 0, 0);
        const le = D.split("-"),
          be = parseInt(le[0], 10),
          de = parseInt(le[1], 10) - 1,
          m = parseInt(le[2], 10),
          R = new Date(be, de, m);
        if ((R.setHours(0, 0, 0, 0), R < ae)) {
          C("Invalid Date", "Departure date cannot be in the past.");
          return;
        }
        const H = parseFloat(M) || 0;
        if (H < 0) {
          C("Invalid Cost", "Estimated shipping cost cannot be negative.");
          return;
        }
        if (!b && H <= 0) {
          C(
            "Missing Estimate",
            'Enter an estimated shipping cost, or check "No estimate yet" to create without variance tracking.',
          );
          return;
        }
        const ce = parseFloat(pe) || 0;
        if (d && P === "fixed_rate_m3" && ce <= 0) {
          C(
            "Invalid Rate",
            "Fixed rate per M3 must be a positive number for this distribution method.",
          );
          return;
        }
        (F(
          { name: X, route: _, departureDate: D, containerTypeId: x },
          b ? 0 : H,
          Y,
          d,
          d ? P : void 0,
          d && P === "fixed_rate_m3" ? ce : void 0,
        ),
          j());
      },
      K = () => {
        j();
      };
    return e.jsx(qt, {
      children: e.jsx(Ht, {
        isOpen: s,
        onClose: K,
        title: "Create New Consolidation",
        subtitle: "Set up a new consolidation for efficient shipping",
        maxWidth: "xl",
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
            d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
          }),
        }),
        children: e.jsxs("form", {
          onSubmit: oe,
          className: "ui-form-skin",
          children: [
            e.jsx(Ge, {
              title: "Consolidation Type",
              description:
                "Choose whether this consolidation is for a single customer or multiple customers",
              className: "bg-gradient-to-r from-blue-50 to-indigo-50",
              children: e.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                  e.jsxs("label", {
                    className:
                      "flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-emerald-300 cursor-pointer transition-all duration-200 hover:shadow-md",
                    children: [
                      e.jsx("input", {
                        type: "radio",
                        name: "consolidationType",
                        value: "regular",
                        checked: !d,
                        onChange: () => E(!1),
                        className:
                          "h-5 w-5 text-emerald-600 border-gray-300 focus:ring-emerald-500 mr-3",
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("span", {
                            className: "text-sm font-semibold text-gray-900",
                            children: "Regular (Single Customer)",
                          }),
                          e.jsx("p", {
                            className: "text-xs text-gray-600 mt-1",
                            children: "Consolidation for one customer only",
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs("label", {
                    className:
                      "flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-indigo-300 cursor-pointer transition-all duration-200 hover:shadow-md",
                    children: [
                      e.jsx("input", {
                        type: "radio",
                        name: "consolidationType",
                        value: "mixed",
                        checked: d,
                        onChange: () => E(!0),
                        className:
                          "h-5 w-5 text-emerald-600 border-gray-300 focus:ring-emerald-500 mr-3",
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("span", {
                            className: "text-sm font-semibold text-gray-900",
                            children: "Mixed (Multiple Customers)",
                          }),
                          e.jsx("p", {
                            className: "text-xs text-gray-600 mt-1",
                            children: "Consolidation for multiple customers",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            !d &&
              e.jsx(Ge, {
                title: "Customer Selection",
                description: "Select the customer for this consolidation",
                className: "bg-gradient-to-r from-emerald-50 to-green-50",
                children: e.jsx("div", {
                  className: "max-w-md",
                  children: e.jsx(Ce, {
                    label: "Customer",
                    required: !0,
                    error:
                      y.length === 0 ? "Please add a customer first" : void 0,
                    children: e.jsxs("select", {
                      value: N,
                      onChange: (h) => W(h.target.value),
                      className: "ui-field",
                      required: !d,
                      disabled: y.length === 0,
                      children: [
                        e.jsx("option", {
                          value: "",
                          disabled: !0,
                          children:
                            y.length === 0
                              ? "Add customer first"
                              : "Select customer",
                        }),
                        y.map((h) =>
                          e.jsxs(
                            "option",
                            {
                              value: h.id,
                              children: [
                                h.contactPerson,
                                " (",
                                h.companyName,
                                ")",
                              ],
                            },
                            h.id,
                          ),
                        ),
                      ],
                    }),
                  }),
                }),
              }),
            d &&
              e.jsx(Ge, {
                title: "Mixed Consolidation Settings",
                description:
                  "Configure cost distribution for multiple customers",
                className: "bg-gradient-to-r from-indigo-50 to-purple-50",
                children: e.jsxs("div", {
                  className: "space-y-4",
                  children: [
                    e.jsx(Ce, {
                      label: "Shipping Cost Distribution Method",
                      required: !0,
                      help: "Choose how shipping costs will be distributed among customers",
                      children: e.jsxs("select", {
                        value: P,
                        onChange: (h) => v(h.target.value),
                        className: "ui-field",
                        children: [
                          e.jsx("option", {
                            value: "volume_proportional",
                            children: "Volume proportional (based on m3 usage)",
                          }),
                          e.jsx("option", {
                            value: "fixed_rate_m3",
                            children: "Fixed rate per m3",
                          }),
                        ],
                      }),
                    }),
                    P === "fixed_rate_m3" &&
                      e.jsx(Ce, {
                        label: "Fixed Rate per M³",
                        required: !0,
                        help: "Rate in USD charged per cubic meter",
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
                              value: pe,
                              onChange: (h) => ee(h.target.value),
                              className: "ui-field pl-8 pr-4",
                              placeholder: "100.00",
                              min: "0.01",
                              step: "0.01",
                              required: d && P === "fixed_rate_m3",
                            }),
                            e.jsx("span", {
                              className:
                                "absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium",
                              children: "/m³",
                            }),
                          ],
                        }),
                      }),
                    e.jsx("div", {
                      className:
                        "bg-blue-50 border border-blue-200 rounded-xl p-4",
                      children: e.jsxs("p", {
                        className: "text-sm text-blue-700",
                        children: [
                          e.jsx("svg", {
                            className: "w-4 h-4 inline mr-2",
                            fill: "currentColor",
                            viewBox: "0 0 20 20",
                            children: e.jsx("path", {
                              fillRule: "evenodd",
                              d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                              clipRule: "evenodd",
                            }),
                          }),
                          "For proportional distribution, ensure the estimated shipping cost is entered below. Costs will be distributed when status is set to 'In Transit'.",
                        ],
                      }),
                    }),
                  ],
                }),
              }),
            e.jsxs(Ge, {
              title: "Core Details",
              description: "Enter the basic information for this consolidation",
              children: [
                e.jsxs("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                  children: [
                    e.jsx(Ce, {
                      label: "Consolidation Name",
                      required: !0,
                      help: "A descriptive name for this consolidation",
                      children: e.jsx("input", {
                        type: "text",
                        value: X,
                        onChange: (h) => T(h.target.value),
                        className:
                          "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
                        placeholder: "e.g., May Shipment Batch 1",
                        required: !0,
                      }),
                    }),
                    e.jsx(Ce, {
                      label: "Route",
                      required: !0,
                      help: "Origin to destination route",
                      children: e.jsx("input", {
                        type: "text",
                        value: _,
                        onChange: (h) => B(h.target.value),
                        className:
                          "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
                        placeholder:
                          "e.g., Istanbul Warehouse → Matadi Port, DRC",
                        required: !0,
                      }),
                    }),
                    e.jsx(Ce, {
                      label: "Departure Date",
                      required: !0,
                      help: "When the consolidation will ship",
                      children: e.jsx("input", {
                        type: "date",
                        value: D,
                        onChange: (h) => I(h.target.value),
                        className:
                          "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
                        required: !0,
                      }),
                    }),
                    e.jsx(Ce, {
                      label: "Container Type",
                      required: !0,
                      help: "Select the container size and type",
                      children: e.jsx("select", {
                        value: x,
                        onChange: (h) => $(h.target.value),
                        className:
                          "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
                        required: !0,
                        children: Ne.map((h) =>
                          e.jsxs(
                            "option",
                            {
                              value: h.id,
                              children: [
                                h.name,
                                " (Max Vol: ",
                                h.maxVolumeM3,
                                "m³, Max Wt: ",
                                h.maxWeightKG,
                                "kg)",
                              ],
                            },
                            h.id,
                          ),
                        ),
                      }),
                    }),
                  ],
                }),
                e.jsx("div", {
                  className: "mt-6",
                  children: e.jsxs(Ce, {
                    label: "Estimated Shipping Cost",
                    help: "Initial cost estimate for planning and cost tracking (USD)",
                    children: [
                      e.jsxs("div", {
                        className: "relative",
                        children: [
                          e.jsx("span", {
                            className:
                              "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium",
                            children: "$",
                          }),
                          e.jsx("input", {
                            type: "number",
                            value: M,
                            onChange: (h) => A(h.target.value),
                            disabled: b,
                            className:
                              "w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200",
                            placeholder: "2500.00",
                            min: "0",
                            step: "0.01",
                          }),
                        ],
                      }),
                      e.jsxs("label", {
                        className:
                          "mt-2 inline-flex items-center gap-2 text-xs text-slate-700",
                        children: [
                          e.jsx("input", {
                            type: "checkbox",
                            checked: b,
                            onChange: (h) => {
                              const Y = h.target.checked;
                              (Z(Y), Y && A(""));
                            },
                            className:
                              "h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500",
                          }),
                          "No estimate yet (skip variance tracking until you add an estimate)",
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
            e.jsxs(Jt, {
              children: [
                e.jsx(S, {
                  type: "button",
                  variant: "outline",
                  onClick: K,
                  className: "w-full sm:w-auto",
                  children: "Cancel",
                }),
                e.jsx(S, {
                  type: "submit",
                  variant: "default",
                  className: "w-full sm:w-auto",
                  disabled: y.length === 0 && !d,
                  children: "Create Consolidation",
                }),
              ],
            }),
          ],
        }),
      }),
    });
  },
  rs = ({
    consolidation: s,
    isOpen: j,
    onClose: F,
    onSave: y,
    allCustomers: q,
  }) => {
    var h, Y, ae, le, be, de;
    const [k, X] = r.useState(s.name),
      [T, _] = r.useState(s.route),
      [B, D] = r.useState(s.departureDate),
      [I, x] = r.useState(s.containerTypeId),
      [$, M] = r.useState(
        ((h = s.shippingCost) == null ? void 0 : h.toString()) || "",
      ),
      [A, b] = r.useState(
        ((Y = s.estimatedShippingCost) == null ? void 0 : Y.toString()) || "",
      ),
      Z = r.useRef(null),
      d = r.useRef(null),
      [O, N] = r.useState(s.costDistributionMethod || "volume_proportional"),
      [W, P] = r.useState(
        ((ae = s.fixedRatePerM3) == null ? void 0 : ae.toString()) || "",
      ),
      [v, pe] = r.useState(s.customerId || ""),
      [ee, C] = r.useState(s.notes || ""),
      { showError: E } = Ue();
    if (
      (r.useEffect(() => {
        var z, i, u;
        if (!j) return;
        (X(s.name), _(s.route));
        let m = s.departureDate;
        if (s.departureDate)
          if (s.departureDate.includes("T")) m = s.departureDate.split("T")[0];
          else if (s.departureDate.match(/^\d{4}-\d{2}-\d{2}$/))
            m = s.departureDate;
          else
            try {
              const G = new Date(s.departureDate);
              isNaN(G.getTime()) || (m = G.toISOString().split("T")[0]);
            } catch (G) {
              (console.error("Error parsing departure date:", G), (m = ""));
            }
        (D(m),
          x(s.containerTypeId),
          M(((z = s.shippingCost) == null ? void 0 : z.toString()) || ""));
        const R =
          ((i = s.estimatedShippingCost) == null ? void 0 : i.toString()) || "";
        (b(R),
          Z.current && (Z.current.value = R),
          N(s.costDistributionMethod || (s.isMixed, "volume_proportional")));
        const H =
          ((u = s.fixedRatePerM3) == null ? void 0 : u.toString()) || "";
        (P(H), d.current && (d.current.value = H));
        const ce = s.customerId || "";
        (pe(ce), C(s.notes || ""));
      }, [s.id, j]),
      !j)
    )
      return null;
    const oe = () => {
        var Pe, Me;
        if (!k.trim()) {
          E("Missing Name", "Consolidation name is required.");
          return;
        }
        if (!T.trim()) {
          E("Missing Route", "Route is required.");
          return;
        }
        if (!B.trim()) {
          E("Missing Date", "Departure date is required.");
          return;
        }
        if (!I) {
          E("Missing Container Type", "Container type is required.");
          return;
        }
        if (!s.isMixed && (!v || v.trim() === "")) {
          E(
            "Missing Customer",
            "Customer is required for regular consolidations.",
          );
          return;
        }
        if (s.isMixed && !O) {
          E(
            "Missing Distribution Method",
            "Cost distribution method is required for mixed consolidations.",
          );
          return;
        }
        const m = new Date();
        m.setHours(0, 0, 0, 0);
        const R = B.split("-"),
          H = parseInt(R[0], 10),
          ce = parseInt(R[1], 10) - 1,
          z = parseInt(R[2], 10),
          i = new Date(H, ce, z);
        if ((i.setHours(0, 0, 0, 0), i < m)) {
          E("Invalid Departure Date", "Departure date cannot be in the past.");
          return;
        }
        const u = parseFloat($) || 0;
        if (u < 0) {
          E(
            "Invalid Shipping Cost",
            "Actual shipping cost cannot be negative.",
          );
          return;
        }
        const G = (
            ((Pe = Z.current) == null ? void 0 : Pe.value) ??
            A ??
            ""
          ).trim(),
          ie = G === "" ? null : parseFloat(G) || 0;
        if (ie !== null && ie < 0) {
          E(
            "Invalid Estimated Cost",
            "Estimated shipping cost cannot be negative.",
          );
          return;
        }
        const Re =
          parseFloat(((Me = d.current) == null ? void 0 : Me.value) || W) || 0;
        if (O === "fixed_rate_m3" && Re <= 0) {
          E(
            "Invalid Rate",
            "Fixed rate per M3 must be a positive number for this distribution method.",
          );
          return;
        }
        const ke = {
          name: k,
          route: T,
          departureDate: B,
          containerTypeId: I,
          shippingCost: u > 0 ? u : void 0,
          customerId: s.isMixed ? null : v,
          notes: ee.trim() ? ee : void 0,
        };
        (ie !== null && (ke.estimatedShippingCost = ie > 0 ? ie : 0),
          s.isMixed &&
            ((ke.costDistributionMethod = O),
            O === "fixed_rate_m3"
              ? (ke.fixedRatePerM3 = Re)
              : (ke.fixedRatePerM3 = void 0)),
          y(s.id, ke),
          s.status !== f.InTransit &&
            s.status !== f.Delivered &&
            s.status !== f.Completed &&
            (s.status, f.Cancelled),
          F());
      },
      K = s.shippingCostDistributed;
    return e.jsx("div", {
      className:
        "fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4",
      onClick: F,
      children: e.jsxs("div", {
        className:
          "bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto",
        onClick: (m) => m.stopPropagation(),
        children: [
          e.jsx("div", {
            className: "p-6 border-b border-gray-100",
            children: e.jsxs("div", {
              className: "flex items-center justify-between",
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsx("h2", {
                      className: "text-xl font-bold text-gray-900",
                      children: "Edit Consolidation",
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2 mt-1",
                      children: [
                        e.jsx("p", {
                          className: "text-sm text-blue-600 font-medium",
                          children: he(s.id, "consolidation"),
                        }),
                        e.jsx("button", {
                          onClick: () => ut(s.id),
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
                  className:
                    "text-gray-400 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors",
                  onClick: F,
                  title: "Close",
                  children: e.jsx("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    viewBox: "0 0 24 24",
                    children: e.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M6 18L18 6M6 6l12 12",
                    }),
                  }),
                }),
              ],
            }),
          }),
          e.jsx("div", {
            className: "p-4 sm:p-6",
            children: e.jsxs("div", {
              className: "space-y-4 sm:space-y-6",
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsxs("label", {
                      htmlFor: "editConsName",
                      className:
                        "block text-sm font-semibold text-gray-700 mb-2",
                      children: [
                        "Consolidation Name ",
                        e.jsx("span", {
                          className: "text-red-500",
                          children: "*",
                        }),
                      ],
                    }),
                    e.jsx("input", {
                      type: "text",
                      id: "editConsName",
                      value: k,
                      onChange: (m) => X(m.target.value),
                      className: "ui-field",
                      placeholder: "Enter consolidation name",
                    }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("label", {
                      htmlFor: "editConsRoute",
                      className:
                        "block text-sm font-semibold text-gray-700 mb-2",
                      children: [
                        "Route ",
                        e.jsx("span", {
                          className: "text-red-500",
                          children: "*",
                        }),
                      ],
                    }),
                    e.jsx("input", {
                      type: "text",
                      id: "editConsRoute",
                      value: T,
                      onChange: (m) => _(m.target.value),
                      className: "ui-field",
                      placeholder: "e.g., China to USA",
                    }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("label", {
                      htmlFor: "editConsDepDate",
                      className:
                        "block text-sm font-semibold text-gray-700 mb-2",
                      children: [
                        "Departure Date ",
                        e.jsx("span", {
                          className: "text-red-500",
                          children: "*",
                        }),
                      ],
                    }),
                    e.jsx("input", {
                      type: "date",
                      id: "editConsDepDate",
                      value: B,
                      onChange: (m) => D(m.target.value),
                      className: "ui-field",
                    }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("label", {
                      htmlFor: "editConsContType",
                      className:
                        "block text-sm font-semibold text-gray-700 mb-2",
                      children: [
                        "Container Type ",
                        e.jsx("span", {
                          className: "text-red-500",
                          children: "*",
                        }),
                      ],
                    }),
                    e.jsx("select", {
                      id: "editConsContType",
                      value: I,
                      onChange: (m) => x(m.target.value),
                      className: "ui-field",
                      children: Ne.map((m) =>
                        e.jsx(
                          "option",
                          { value: m.id, children: m.name },
                          m.id,
                        ),
                      ),
                    }),
                  ],
                }),
                !s.isMixed &&
                  e.jsxs("div", {
                    children: [
                      e.jsxs("label", {
                        htmlFor: "editConsCustomer",
                        className:
                          "block text-sm font-semibold text-gray-700 mb-2",
                        children: [
                          "Customer ",
                          e.jsx("span", {
                            className: "text-red-500",
                            children: "*",
                          }),
                        ],
                      }),
                      e.jsxs("select", {
                        id: "editConsCustomer",
                        value: v,
                        onChange: (m) => pe(m.target.value),
                        className: "ui-field",
                        children: [
                          e.jsx("option", {
                            value: "",
                            disabled: !0,
                            children: "Select a customer",
                          }),
                          q.map((m) =>
                            e.jsxs(
                              "option",
                              {
                                value: m.id,
                                children: [
                                  m.companyName,
                                  " (",
                                  m.contactPerson,
                                  ")",
                                ],
                              },
                              m.id,
                            ),
                          ),
                        ],
                      }),
                      !v &&
                        e.jsx("p", {
                          className: "text-xs text-red-500 mt-1",
                          children:
                            "Please select a customer for this consolidation.",
                        }),
                    ],
                  }),
                e.jsxs("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6",
                  children: [
                    e.jsxs("div", {
                      children: [
                        e.jsx("label", {
                          htmlFor: "editConsEstimatedCost",
                          className:
                            "block text-sm font-semibold text-gray-700 mb-2",
                          children: "Estimated Cost (USD)",
                        }),
                        e.jsx("input", {
                          type: "text",
                          id: "editConsEstimatedCost",
                          ref: Z,
                          defaultValue: A,
                          onChange: (m) => {
                            const R = m.target.value;
                            b(R);
                          },
                          className: "ui-field",
                          placeholder: "Planning estimate",
                        }),
                        e.jsx("p", {
                          className: "text-xs text-gray-500 mt-1",
                          children: "Initial cost estimate for planning",
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("label", {
                          htmlFor: "editConsShipCost",
                          className:
                            "block text-sm font-semibold text-gray-700 mb-2",
                          children: "Actual Cost (USD)",
                        }),
                        e.jsx(as, {
                          id: "editConsShipCost",
                          value: $,
                          onChange: M,
                          disabled:
                            (K && s.isMixed) ||
                            s.status === f.InTransit ||
                            s.status === f.Delivered ||
                            s.status === f.Completed ||
                            s.status === f.Cancelled,
                          className: `w-full px-4 py-3 border rounded-xl shadow-sm text-gray-900 transition-colors ${(K && s.isMixed) || s.status === f.InTransit || s.status === f.Delivered || s.status === f.Completed || s.status === f.Cancelled ? "border-gray-200 bg-gray-100 cursor-not-allowed" : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}`,
                          placeholder: "Final actual cost",
                        }),
                        K &&
                          s.isMixed &&
                          e.jsx("p", {
                            className: "text-xs text-gray-500 mt-1",
                            children:
                              "Revert status to 'Loading' or 'Planning' to edit.",
                          }),
                        (s.status === f.InTransit ||
                          s.status === f.Delivered ||
                          s.status === f.Completed) &&
                          e.jsx("p", {
                            className: "text-xs text-red-500 mt-1",
                            children:
                              "Shipping charges are posted when the shipment is created. Use the Payments page for any manual adjustments/refunds.",
                          }),
                      ],
                    }),
                  ],
                }),
                (s.estimatedShippingCost || 0) > 0 &&
                s.costVariance !== void 0 &&
                s.costVariance !== null
                  ? e.jsxs("div", {
                      className: `p-3 rounded-lg border ${s.costVariance >= 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`,
                      children: [
                        e.jsxs("div", {
                          className: "flex items-center justify-between",
                          children: [
                            e.jsx("span", {
                              className: "text-sm font-medium text-gray-700",
                              children: "Cost Variance:",
                            }),
                            e.jsxs("div", {
                              className: "text-right",
                              children: [
                                e.jsxs("span", {
                                  className: `text-sm font-bold ${s.costVariance >= 0 ? "text-red-600" : "text-green-600"}`,
                                  children: [
                                    s.costVariance >= 0 ? "+" : "",
                                    "$",
                                    (le = s.costVariance) == null
                                      ? void 0
                                      : le.toFixed(2),
                                  ],
                                }),
                                e.jsxs("span", {
                                  className: `text-xs ml-2 ${s.costVariance >= 0 ? "text-red-500" : "text-green-500"}`,
                                  children: [
                                    "(",
                                    s.costVariancePercentage !== void 0 &&
                                    s.costVariancePercentage >= 0
                                      ? "+"
                                      : "",
                                    ((be = s.costVariancePercentage) == null
                                      ? void 0
                                      : be.toFixed(1)) || "0.0",
                                    "%)",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        e.jsxs("p", {
                          className: "text-xs text-gray-600 mt-1",
                          children: [
                            s.costVariance >= 0
                              ? "Over budget"
                              : "Under budget",
                            " compared to estimate",
                          ],
                        }),
                      ],
                    })
                  : s.shippingCost &&
                    s.shippingCost > 0 &&
                    e.jsxs("div", {
                      className:
                        "p-3 rounded-lg border bg-slate-50 border-slate-200",
                      children: [
                        e.jsx("div", {
                          className: "text-sm font-medium text-slate-800",
                          children: "Variance not available",
                        }),
                        e.jsxs("div", {
                          className: "text-xs text-slate-600 mt-1",
                          children: [
                            "Add an estimated shipping cost to enable over/under budget tracking. (Current actual: $",
                            s.shippingCost.toFixed(2),
                            ")",
                          ],
                        }),
                      ],
                    }),
                s.costDistributionMethod === "fixed_rate_m3" &&
                  s.totalBilledAmount !== void 0 &&
                  s.totalBilledAmount !== null &&
                  s.totalBilledAmount > 0 &&
                  e.jsxs("div", {
                    className:
                      "p-3 rounded-lg border bg-blue-50 border-blue-200",
                    children: [
                      e.jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [
                          e.jsx("span", {
                            className: "text-sm font-medium text-gray-700",
                            children: "Total Billed Amount:",
                          }),
                          e.jsxs("div", {
                            className: "text-right",
                            children: [
                              e.jsxs("span", {
                                className: "text-sm font-bold text-blue-600",
                                children: ["$", s.totalBilledAmount.toFixed(2)],
                              }),
                              e.jsxs("span", {
                                className: "text-xs ml-2 text-blue-500",
                                children: [
                                  "($",
                                  (de = s.fixedRatePerM3) == null
                                    ? void 0
                                    : de.toFixed(2),
                                  "/m3)",
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsx("p", {
                        className: "text-xs text-gray-600 mt-1",
                        children:
                          "Total revenue from fixed-rate billing to customers",
                      }),
                      s.shippingCost &&
                        s.shippingCost > 0 &&
                        e.jsxs("p", {
                          className: "text-xs text-gray-600 mt-1",
                          children: [
                            "Profit/Loss: ",
                            e.jsxs("span", {
                              className: `font-medium ${s.totalBilledAmount - s.shippingCost >= 0 ? "text-green-600" : "text-red-600"}`,
                              children: [
                                "$",
                                (s.totalBilledAmount - s.shippingCost).toFixed(
                                  2,
                                ),
                              ],
                            }),
                          ],
                        }),
                    ],
                  }),
                s.isMixed &&
                  e.jsxs(e.Fragment, {
                    children: [
                      e.jsxs("div", {
                        children: [
                          e.jsx("label", {
                            className:
                              "block text-sm font-semibold text-gray-700 mb-2",
                            children: "Cost Distribution Method",
                          }),
                          e.jsxs("select", {
                            value: O,
                            onChange: (m) => N(m.target.value),
                            disabled: K,
                            className: `w-full px-4 py-3 border rounded-xl shadow-sm text-gray-900 transition-colors ${K ? "border-gray-200 bg-gray-100 cursor-not-allowed" : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}`,
                            children: [
                              e.jsx("option", {
                                value: "volume_proportional",
                                children: "Volume Proportional",
                              }),
                              e.jsx("option", {
                                value: "fixed_rate_m3",
                                children: "Fixed Rate per M3",
                              }),
                            ],
                          }),
                          K &&
                            e.jsx("p", {
                              className: "text-xs text-gray-500 mt-1",
                              children:
                                "Revert status to 'Loading' or 'Planning' to edit.",
                            }),
                        ],
                      }),
                      O === "fixed_rate_m3" &&
                        e.jsxs("div", {
                          children: [
                            e.jsx("label", {
                              htmlFor: "editConsFixedRate",
                              className:
                                "block text-sm font-semibold text-gray-700 mb-2",
                              children: "Fixed Rate per M3 (USD)",
                            }),
                            e.jsx("input", {
                              type: "text",
                              id: "editConsFixedRate",
                              ref: d,
                              defaultValue: W,
                              onChange: (m) => {
                                const R = m.target.value;
                                (R === "" || /^\d*\.?\d*$/.test(R)) && P(R);
                              },
                              disabled: K,
                              className: `w-full px-4 py-3 border rounded-xl shadow-sm text-gray-900 transition-colors ${K ? "border-gray-200 bg-gray-100 cursor-not-allowed" : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}`,
                              placeholder: "e.g., 25.00",
                            }),
                            K &&
                              e.jsx("p", {
                                className: "text-xs text-gray-500 mt-1",
                                children:
                                  "Revert status to 'Loading' or 'Planning' to edit.",
                              }),
                          ],
                        }),
                    ],
                  }),
                e.jsxs("div", {
                  children: [
                    e.jsx("label", {
                      htmlFor: "editConsNotes",
                      className:
                        "block text-sm font-semibold text-gray-700 mb-2",
                      children: "Admin Notes",
                    }),
                    e.jsx("textarea", {
                      id: "editConsNotes",
                      value: ee,
                      onChange: (m) => C(m.target.value),
                      rows: 3,
                      className: "ui-field resize-none",
                      placeholder: "Internal notes for this consolidation...",
                    }),
                  ],
                }),
                e.jsx("div", {
                  className: "border-t border-gray-100 pt-4 mt-6",
                  children: e.jsxs("div", {
                    className: "flex flex-col sm:flex-row justify-end gap-3",
                    children: [
                      e.jsx(S, {
                        type: "button",
                        variant: "outline",
                        onClick: F,
                        className: "w-full sm:w-auto",
                        children: "Cancel",
                      }),
                      e.jsx(S, {
                        type: "button",
                        onClick: oe,
                        className: "w-full sm:w-auto",
                        children: "Save Changes",
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
    });
  },
  ls = ({ consolidation: s, isOpen: j, onClose: F, onSave: y }) => {
    const [q, k] = r.useState("0"),
      [X, T] = r.useState(""),
      [_, B] = r.useState(""),
      [D, I] = r.useState("China"),
      [x, $] = r.useState("USA"),
      [M, A] = r.useState(""),
      { showError: b } = Ue();
    if (
      (r.useEffect(() => {
        if (j) {
          (k("0"), T(""), B(""), I("China"), $("USA"));
          const d = new Date();
          (d.setDate(d.getDate() + 30), A(d.toISOString().split("T")[0]));
        }
      }, [j]),
      !j)
    )
      return null;
    const Z = () => {
      if (!X.trim()) {
        b("Missing Carrier", "Please enter a carrier name.");
        return;
      }
      if (!D.trim()) {
        b("Missing Origin", "Please enter the origin location.");
        return;
      }
      if (!x.trim()) {
        b("Missing Destination", "Please enter the destination location.");
        return;
      }
      if (!M) {
        b("Missing ETA", "Please select an estimated delivery date.");
        return;
      }
      const d = new Date(M),
        O = new Date();
      if ((O.setHours(0, 0, 0, 0), d < O)) {
        b(
          "Invalid ETA",
          "Estimated delivery date must be today or in the future.",
        );
        return;
      }
      const N = parseFloat(q);
      if (isNaN(N) || N < 0) {
        b(
          "Invalid Shipping Cost",
          "Please enter a valid, non-negative shipping cost.",
        );
        return;
      }
      (y(s.id, N, X, _, D, x, M), F());
    };
    return e.jsx("div", {
      className:
        "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4",
      children: e.jsxs("div", {
        className: "bg-white p-6 rounded-lg shadow-xl w-full max-w-md",
        children: [
          e.jsxs("h2", {
            className: "text-xl font-semibold text-gray-800 mb-4",
            children: ["Start Shipment - ", s.name],
          }),
          e.jsx("p", {
            className: "text-sm text-gray-600 mb-4",
            children:
              'This will move the consolidation to "In Transit" status and create a shipment record for tracking.',
          }),
          e.jsxs("div", {
            className: "space-y-4",
            children: [
              e.jsxs("div", {
                children: [
                  e.jsx("label", {
                    htmlFor: "shippingCost",
                    className: "block text-sm font-medium text-gray-700 mb-1",
                    children: "Actual Shipping Cost (USD)",
                  }),
                  e.jsx("input", {
                    type: "number",
                    id: "shippingCost",
                    value: q,
                    onChange: (d) => k(d.target.value),
                    className:
                      "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900",
                    placeholder: "0.00",
                    min: "0",
                    step: "0.01",
                  }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsxs("label", {
                    htmlFor: "carrier",
                    className: "block text-sm font-medium text-gray-700 mb-1",
                    children: [
                      "Carrier ",
                      e.jsx("span", {
                        className: "text-red-500",
                        children: "*",
                      }),
                    ],
                  }),
                  e.jsx("input", {
                    type: "text",
                    id: "carrier",
                    value: X,
                    onChange: (d) => T(d.target.value),
                    className:
                      "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900",
                    placeholder: "e.g., Maersk, MSC, CMA CGM",
                    required: !0,
                  }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("label", {
                    htmlFor: "trackingUrl",
                    className: "block text-sm font-medium text-gray-700 mb-1",
                    children: "Tracking URL (Optional)",
                  }),
                  e.jsx("input", {
                    type: "url",
                    id: "trackingUrl",
                    value: _,
                    onChange: (d) => B(d.target.value),
                    className:
                      "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900",
                    placeholder: "https://tracking.example.com/...",
                  }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsxs("label", {
                    htmlFor: "origin",
                    className: "block text-sm font-medium text-gray-700 mb-1",
                    children: [
                      "Origin ",
                      e.jsx("span", {
                        className: "text-red-500",
                        children: "*",
                      }),
                    ],
                  }),
                  e.jsx("input", {
                    type: "text",
                    id: "origin",
                    value: D,
                    onChange: (d) => I(d.target.value),
                    className:
                      "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900",
                    placeholder: "e.g., China, Shanghai, Guangzhou",
                    required: !0,
                  }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsxs("label", {
                    htmlFor: "destination",
                    className: "block text-sm font-medium text-gray-700 mb-1",
                    children: [
                      "Destination ",
                      e.jsx("span", {
                        className: "text-red-500",
                        children: "*",
                      }),
                    ],
                  }),
                  e.jsx("input", {
                    type: "text",
                    id: "destination",
                    value: x,
                    onChange: (d) => $(d.target.value),
                    className:
                      "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900",
                    placeholder: "e.g., USA, New York, Los Angeles",
                    required: !0,
                  }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsxs("label", {
                    htmlFor: "estimatedDelivery",
                    className: "block text-sm font-medium text-gray-700 mb-1",
                    children: [
                      "Estimated Delivery Date ",
                      e.jsx("span", {
                        className: "text-red-500",
                        children: "*",
                      }),
                    ],
                  }),
                  e.jsx("input", {
                    type: "date",
                    id: "estimatedDelivery",
                    value: M,
                    onChange: (d) => A(d.target.value),
                    className: "ui-field",
                    min: new Date().toISOString().split("T")[0],
                    required: !0,
                  }),
                ],
              }),
            ],
          }),
          e.jsxs("div", {
            className: "mt-6 flex justify-end space-x-3",
            children: [
              e.jsx(S, { variant: "outline", onClick: F, children: "Cancel" }),
              e.jsx(S, { onClick: Z, children: "Save & Ship" }),
            ],
          }),
        ],
      }),
    });
  },
  ns = ({
    consolidation: s,
    ordersIn: j,
    availableOrders: F,
    canEditOrders: y,
    onClose: q,
    onAddOrder: k,
    onRemoveOrder: X,
    getCustomerName: T,
  }) => {
    const [_, B] = r.useState("in"),
      [D, I] = r.useState(null),
      [x, $] = r.useState(null),
      [M, A] = r.useState(null),
      [b, Z] = r.useState(""),
      [d, O] = r.useState(""),
      N = j.reduce((i, u) => i + u.volumeM3, 0),
      W = j.reduce((i, u) => i + u.weightKG, 0),
      P = j.reduce((i, u) => i + u.value, 0),
      v = Ne.find((i) => i.id === s.containerTypeId),
      pe = (i) =>
        i >= 100
          ? "text-red-700"
          : i >= 90
            ? "text-orange-700"
            : i >= 70
              ? "text-amber-700"
              : "text-emerald-700",
      ee = (i) =>
        i >= 100
          ? "bg-red-500"
          : i >= 90
            ? "bg-orange-500"
            : i >= 70
              ? "bg-amber-500"
              : "bg-emerald-500",
      C = j.find((i) => i.id === D) || F.find((i) => i.id === D) || null,
      E = r.useMemo(() => {
        const i = b.trim().toLowerCase();
        return i
          ? j.filter((u) =>
              `${u.description} ${T(u.customerId)} ${String(u.status)} ${u.value} ${u.volumeM3} ${u.weightKG}`
                .toLowerCase()
                .includes(i),
            )
          : j;
      }, [j, b, T]),
      oe = r.useMemo(() => {
        const i = d.trim().toLowerCase();
        return i
          ? F.filter((u) =>
              `${u.description} ${T(u.customerId)} ${String(u.status)} ${u.value} ${u.volumeM3} ${u.weightKG}`
                .toLowerCase()
                .includes(i),
            )
          : F;
      }, [F, d, T]),
      K =
        M === "in" && x === "available" && C
          ? N + C.volumeM3
          : M === "available" && x === "in" && C
            ? Math.max(0, N - C.volumeM3)
            : N,
      h =
        M === "in" && x === "available" && C
          ? W + C.weightKG
          : M === "available" && x === "in" && C
            ? Math.max(0, W - C.weightKG)
            : W,
      Y = v ? Math.round((N / v.maxVolumeM3) * 100) : 0,
      ae = v ? Math.round((W / v.maxWeightKG) * 100) : 0,
      le = v ? Math.round((K / v.maxVolumeM3) * 100) : 0,
      be = v ? Math.round((h / v.maxWeightKG) * 100) : 0,
      de = !!(
        v &&
        M === "in" &&
        x === "available" &&
        (K > v.maxVolumeM3 || h > v.maxWeightKG)
      ),
      m = () => {
        (I(null), $(null), A(null));
      },
      R = (i, u) => {
        y && (I(i.id), $(u));
      },
      H = () => {
        if (!y || !D || x !== "available") {
          m();
          return;
        }
        if (de) {
          m();
          return;
        }
        (k(D), m());
      },
      ce = () => {
        if (!y || !D || x !== "in") {
          m();
          return;
        }
        (X(D), m());
      },
      z = ({ order: i, isInConsolidation: u, canEdit: G }) => {
        const ie = N > 0 ? (i.volumeM3 / N) * 100 : 0;
        return e.jsx("div", {
          className: `group relative border rounded-lg p-3 transition-all duration-200 hover:shadow-sm ${u ? "bg-emerald-50 border-emerald-200" : "bg-blue-50 border-blue-200"}`,
          draggable: G,
          onDragStart: () => R(i, u ? "in" : "available"),
          onDragEnd: m,
          children: e.jsxs("div", {
            className:
              "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
            children: [
              e.jsxs("div", {
                className: "flex-1 min-w-0",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center space-x-3 mb-2",
                    children: [
                      e.jsx("div", {
                        className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${u ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`,
                        children: u ? "IN" : "+",
                      }),
                      e.jsxs("div", {
                        className: "truncate",
                        children: [
                          e.jsx("h4", {
                            className:
                              "font-medium text-gray-900 text-sm truncate",
                            children: i.description,
                          }),
                          e.jsx("p", {
                            className: "text-xs text-gray-500 truncate",
                            children: T(i.customerId),
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs",
                    children: [
                      e.jsxs("div", {
                        className: "bg-white/70 rounded px-2 py-1",
                        children: [
                          e.jsxs("div", {
                            className: "font-semibold text-emerald-700",
                            children: [i.volumeM3, "m3"],
                          }),
                          u &&
                            e.jsxs("div", {
                              className: "text-emerald-600",
                              children: [ie.toFixed(1), "%"],
                            }),
                        ],
                      }),
                      e.jsx("div", {
                        className: "bg-white/70 rounded px-2 py-1",
                        children: e.jsxs("div", {
                          className: "font-semibold text-orange-700",
                          children: [i.weightKG, "kg"],
                        }),
                      }),
                      e.jsx("div", {
                        className: "bg-white/70 rounded px-2 py-1",
                        children: e.jsxs("div", {
                          className: "font-semibold text-purple-700",
                          children: ["$", i.value.toLocaleString()],
                        }),
                      }),
                      e.jsx("div", {
                        className: "bg-white/70 rounded px-2 py-1",
                        children: e.jsx("div", {
                          className: "font-semibold text-gray-700",
                          children: i.status,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              G &&
                e.jsx("button", {
                  className: `w-full sm:w-auto sm:ml-2 px-2 py-1 text-xs font-medium rounded transition-colors ${u ? "text-red-600 hover:bg-red-100 border border-red-200" : "text-blue-600 hover:bg-blue-100 border border-blue-200"}`,
                  onClick: () => (u ? X(i.id) : k(i.id)),
                  children: u ? "Remove" : "Add",
                }),
            ],
          }),
        });
      };
    return e.jsx("div", {
      className:
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4",
      onClick: q,
      children: e.jsxs("div", {
        className:
          "bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden",
        onClick: (i) => i.stopPropagation(),
        children: [
          e.jsxs("div", {
            className:
              "bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 flex items-center justify-between",
            children: [
              e.jsxs("div", {
                className: "flex items-center space-x-3",
                children: [
                  e.jsx("div", {
                    className:
                      "w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center",
                    children: e.jsx("svg", {
                      className: "w-4 h-4 text-white",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: e.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2",
                      }),
                    }),
                  }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("h2", {
                        className: "text-lg font-semibold text-white",
                        children: "Manage Orders",
                      }),
                      e.jsx("p", {
                        className: "text-sm text-slate-300",
                        children: s.name,
                      }),
                    ],
                  }),
                ],
              }),
              e.jsx("button", {
                className:
                  "text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors",
                onClick: q,
                children: e.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: e.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M6 18L18 6M6 6l12 12",
                  }),
                }),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "p-4 overflow-y-auto max-h-[calc(90vh-80px)]",
            children: [
              e.jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4",
                children: [
                  e.jsxs("div", {
                    className: "bg-emerald-50 rounded-lg p-3 text-center",
                    children: [
                      e.jsx("div", {
                        className: "text-xl font-bold text-emerald-700",
                        children: N.toFixed(1),
                      }),
                      e.jsx("div", {
                        className: "text-xs text-emerald-600",
                        children: "m3 Volume",
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "bg-orange-50 rounded-lg p-3 text-center",
                    children: [
                      e.jsx("div", {
                        className: "text-xl font-bold text-orange-700",
                        children: W.toFixed(0),
                      }),
                      e.jsx("div", {
                        className: "text-xs text-orange-600",
                        children: "KG Weight",
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "bg-purple-50 rounded-lg p-3 text-center",
                    children: [
                      e.jsxs("div", {
                        className: "text-xl font-bold text-purple-700",
                        children: ["$", P.toLocaleString()],
                      }),
                      e.jsx("div", {
                        className: "text-xs text-purple-600",
                        children: "Total Value",
                      }),
                    ],
                  }),
                ],
              }),
              v &&
                e.jsxs("div", {
                  className:
                    "mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3",
                  children: [
                    e.jsxs("div", {
                      className:
                        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3",
                      children: [
                        e.jsx("div", {
                          className: "text-sm font-semibold text-slate-900",
                          children: "Container Capacity",
                        }),
                        e.jsx("div", {
                          className: "text-xs text-slate-600",
                          children: v.name,
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                      children: [
                        e.jsxs("div", {
                          className:
                            "rounded-lg bg-white border border-slate-200 p-3",
                          children: [
                            e.jsxs("div", {
                              className:
                                "flex items-center justify-between text-xs mb-1",
                              children: [
                                e.jsx("span", {
                                  className: "text-slate-600",
                                  children: "Volume",
                                }),
                                e.jsxs("span", {
                                  className: `font-semibold ${pe(Y)}`,
                                  children: [Y, "%"],
                                }),
                              ],
                            }),
                            e.jsx("div", {
                              className:
                                "h-2 rounded-full bg-slate-100 overflow-hidden",
                              children: e.jsx("div", {
                                className: `h-full ${ee(Y)}`,
                                style: {
                                  width: `${Math.min(100, Math.max(0, Y))}%`,
                                },
                              }),
                            }),
                            e.jsxs("div", {
                              className: "mt-1 text-[11px] text-slate-600",
                              children: [
                                N.toFixed(2),
                                " / ",
                                v.maxVolumeM3.toFixed(2),
                                " m3",
                              ],
                            }),
                          ],
                        }),
                        e.jsxs("div", {
                          className:
                            "rounded-lg bg-white border border-slate-200 p-3",
                          children: [
                            e.jsxs("div", {
                              className:
                                "flex items-center justify-between text-xs mb-1",
                              children: [
                                e.jsx("span", {
                                  className: "text-slate-600",
                                  children: "Weight",
                                }),
                                e.jsxs("span", {
                                  className: `font-semibold ${pe(ae)}`,
                                  children: [ae, "%"],
                                }),
                              ],
                            }),
                            e.jsx("div", {
                              className:
                                "h-2 rounded-full bg-slate-100 overflow-hidden",
                              children: e.jsx("div", {
                                className: `h-full ${ee(ae)}`,
                                style: {
                                  width: `${Math.min(100, Math.max(0, ae))}%`,
                                },
                              }),
                            }),
                            e.jsxs("div", {
                              className: "mt-1 text-[11px] text-slate-600",
                              children: [
                                W.toFixed(0),
                                " / ",
                                v.maxWeightKG.toFixed(0),
                                " KG",
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    C &&
                      e.jsxs("div", {
                        className:
                          "mt-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-900",
                        children: [
                          "Projected after drop: ",
                          e.jsxs("span", {
                            className: "font-semibold",
                            children: [le, "% volume"],
                          }),
                          " / ",
                          e.jsxs("span", {
                            className: "font-semibold",
                            children: [be, "% weight"],
                          }),
                          de &&
                            e.jsx("div", {
                              className: "mt-1 font-semibold text-red-700",
                              children:
                                "Drop blocked: capacity would exceed container limits.",
                            }),
                        ],
                      }),
                  ],
                }),
              e.jsx("div", {
                className:
                  "mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3",
                children: e.jsxs("div", {
                  className: "flex items-center space-x-2",
                  children: [
                    e.jsx("svg", {
                      className: "w-4 h-4 text-blue-600",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: e.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                      }),
                    }),
                    e.jsxs("div", {
                      className: "text-sm",
                      children: [
                        e.jsx("span", {
                          className: "font-medium text-blue-900",
                          children: "Volume-Based Distribution:",
                        }),
                        e.jsx("span", {
                          className: "text-blue-700 ml-1",
                          children:
                            "Shipping costs allocated by m3 space usage",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              !y &&
                e.jsx("div", {
                  className:
                    "mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3",
                  children: e.jsxs("div", {
                    className: "flex items-center space-x-2",
                    children: [
                      e.jsx("svg", {
                        className: "w-4 h-4 text-amber-600",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: e.jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z",
                        }),
                      }),
                      e.jsx("span", {
                        className: "text-sm font-medium text-amber-800",
                        children:
                          "Orders locked. Revert to 'Planning' or 'Loading' to edit.",
                      }),
                    ],
                  }),
                }),
              e.jsx("div", {
                className: "sm:hidden mb-4",
                children: e.jsxs("div", {
                  className:
                    "grid grid-cols-2 gap-2 bg-gray-100 rounded-lg p-1",
                  children: [
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => B("in"),
                      className: `px-3 py-2 text-xs font-semibold rounded-md transition-colors ${_ === "in" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-600"}`,
                      children: ["In (", E.length, "/", j.length, ")"],
                    }),
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => B("available"),
                      className: `px-3 py-2 text-xs font-semibold rounded-md transition-colors ${_ === "available" ? "bg-white text-blue-700 shadow-sm" : "text-gray-600"}`,
                      children: ["Available (", oe.length, "/", F.length, ")"],
                    }),
                  ],
                }),
              }),
              e.jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: [
                  e.jsxs("div", {
                    className: `${_ === "in" ? "block" : "hidden"} sm:block`,
                    onDragOver: (i) => {
                      !y || x !== "available" || (i.preventDefault(), A("in"));
                    },
                    onDragLeave: () => A((i) => (i === "in" ? null : i)),
                    onDrop: (i) => {
                      (i.preventDefault(), H());
                    },
                    children: [
                      e.jsxs("div", {
                        className:
                          "flex items-center justify-between gap-3 mb-3",
                        children: [
                          e.jsxs("h3", {
                            className:
                              "text-sm font-semibold text-gray-900 flex items-center",
                            children: [
                              e.jsx("svg", {
                                className: "w-4 h-4 text-emerald-600 mr-2",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: e.jsx("path", {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: "2",
                                  d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                                }),
                              }),
                              "In Consolidation (",
                              E.length,
                              b.trim() ? `/${j.length}` : "",
                              ")",
                            ],
                          }),
                          e.jsx("input", {
                            value: b,
                            onChange: (i) => Z(i.target.value),
                            placeholder: "Search...",
                            className: "ui-field ui-field--sm w-44",
                          }),
                        ],
                      }),
                      e.jsx("div", {
                        className: `space-y-2 max-h-64 overflow-y-auto rounded-lg transition-colors ${M === "in" ? "bg-emerald-50/50" : ""}`,
                        children:
                          E.length === 0
                            ? e.jsxs("div", {
                                className:
                                  "text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300",
                                children: [
                                  e.jsx("svg", {
                                    className:
                                      "w-8 h-8 text-gray-400 mx-auto mb-2",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: "2",
                                      d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2",
                                    }),
                                  }),
                                  e.jsx("p", {
                                    className: "text-xs text-gray-500",
                                    children: b.trim()
                                      ? "No matching orders."
                                      : "No orders added yet",
                                  }),
                                ],
                              })
                            : E.map((i) =>
                                e.jsx(
                                  z,
                                  {
                                    order: i,
                                    isInConsolidation: !0,
                                    canEdit: y,
                                  },
                                  i.id,
                                ),
                              ),
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: `${_ === "available" ? "block" : "hidden"} sm:block`,
                    onDragOver: (i) => {
                      !y || x !== "in" || (i.preventDefault(), A("available"));
                    },
                    onDragLeave: () => A((i) => (i === "available" ? null : i)),
                    onDrop: (i) => {
                      (i.preventDefault(), ce());
                    },
                    children: [
                      e.jsxs("div", {
                        className:
                          "flex items-center justify-between gap-3 mb-3",
                        children: [
                          e.jsxs("h3", {
                            className:
                              "text-sm font-semibold text-gray-900 flex items-center",
                            children: [
                              e.jsx("svg", {
                                className: "w-4 h-4 text-blue-600 mr-2",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: e.jsx("path", {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: "2",
                                  d: "M12 6v6m0 0v6m0-6h6m-6 0H6",
                                }),
                              }),
                              "Available Orders (",
                              oe.length,
                              d.trim() ? `/${F.length}` : "",
                              ")",
                            ],
                          }),
                          e.jsx("input", {
                            value: d,
                            onChange: (i) => O(i.target.value),
                            placeholder: "Search...",
                            className: "ui-field ui-field--sm w-44",
                          }),
                        ],
                      }),
                      e.jsx("div", {
                        className: `space-y-2 max-h-64 overflow-y-auto rounded-lg transition-colors ${M === "available" ? "bg-blue-50/50" : ""}`,
                        children:
                          oe.length === 0
                            ? e.jsxs("div", {
                                className:
                                  "text-center py-8 bg-blue-50 rounded-lg border-2 border-dashed border-blue-300",
                                children: [
                                  e.jsx("svg", {
                                    className:
                                      "w-8 h-8 text-blue-400 mx-auto mb-2",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: "2",
                                      d: "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                                    }),
                                  }),
                                  e.jsx("p", {
                                    className: "text-xs text-blue-600",
                                    children: d.trim()
                                      ? "No matching orders."
                                      : "No orders available",
                                  }),
                                ],
                              })
                            : oe.map((i) =>
                                e.jsx(
                                  z,
                                  {
                                    order: i,
                                    isInConsolidation: !1,
                                    canEdit: y,
                                  },
                                  i.id,
                                ),
                              ),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          e.jsx("div", {
            className: "border-t border-gray-200 px-4 py-3 bg-gray-50",
            children: e.jsxs("div", {
              className:
                "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3",
              children: [
                e.jsxs("div", {
                  className:
                    "text-xs sm:text-sm text-gray-600 flex flex-wrap items-center gap-x-2 gap-y-1",
                  children: [
                    "Total: ",
                    e.jsxs("span", {
                      className: "font-semibold",
                      children: [j.length, " orders"],
                    }),
                    " -",
                    e.jsxs("span", {
                      className: "font-semibold",
                      children: [N.toFixed(2), " m3"],
                    }),
                    " -",
                    e.jsxs("span", {
                      className: "font-semibold",
                      children: [W.toFixed(1), " KG"],
                    }),
                  ],
                }),
                e.jsx("button", {
                  className:
                    "px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors duration-200",
                  onClick: q,
                  children: "Close",
                }),
              ],
            }),
          }),
        ],
      }),
    });
  },
  ys = ({
    consolidations: s,
    transactions: j,
    onRecalculateDistribution: F,
    addConsolidation: y,
    updateConsolidationDetails: q,
    allOrders: k,
    allSuppliers: X,
    allCustomers: T,
    updateConsolidationOrders: _,
    activeConsolidationId: B,
    setActiveConsolidationId: D,
    currentCustomerId: I,
    updateConsolidationStatus: x,
    createShipmentFromConsolidation: $,
    consolidationsLoading: M,
    consolidationsError: A,
    isAdmin: b,
    shipments: Z,
    onNavigate: d,
    onNavigateToShipment: O,
  }) => {
    const { showError: N, showWarning: W } = Ue(),
      [P, v] = r.useState(null),
      [pe, ee] = r.useState(!1),
      [C, E] = r.useState(!1),
      [oe, K] = r.useState(!1),
      [h, Y] = r.useState(null),
      [ae, le] = r.useState(!1),
      [be, de] = r.useState(null),
      [m, R] = r.useState(!1),
      [H, ce] = r.useState(null),
      [z, i] = r.useState(1),
      [u] = r.useState(6),
      [G, ie] = r.useState(null),
      [Re, ke] = r.useState(null),
      Pe = 85,
      Me = (t) =>
        t >= 100
          ? "bg-red-500"
          : t >= 90
            ? "bg-orange-500"
            : t >= Pe
              ? "bg-amber-500"
              : "bg-emerald-500",
      at = (t) =>
        t >= 100
          ? "text-red-700"
          : t >= 90
            ? "text-orange-700"
            : t >= Pe
              ? "text-amber-700"
              : "text-slate-900",
      ht = (t, a, n, p, o, V) => {
        (y(t, a, n, p, o, V), ee(!1));
      },
      it = (t) => {
        var a;
        return (
          ((a = Ne.find((n) => n.id === t)) == null ? void 0 : a.name) ||
          "Unknown Container"
        );
      },
      Ie = (t) => {
        if (!t) return "N/A (Mixed)";
        const a = T.find((n) => n.id === t);
        return a ? `${a.contactPerson} (${a.companyName})` : "Unknown Customer";
      },
      rt = (t) =>
        t
          .map((a) => {
            var n;
            return (
              ((n = T.find((p) => p.id === a)) == null
                ? void 0
                : n.companyName) || "Unknown Co."
            );
          })
          .join(", "),
      Le = (t) => k.filter((a) => t.orderIds.includes(a.id)),
      pt = (t) =>
        k.filter((a) => {
          const n = t.orderIds.includes(a.id),
            p = Gt.includes(a.status),
            o = !s.some((V) => V.id !== t.id && V.orderIds.includes(a.id));
          return t.isMixed
            ? !n && p && o
            : !n && a.customerId === t.customerId && p && o;
        }),
      gt = (t, a) => {
        const n = s.find((w) => w.id === t),
          p = k.find((w) => w.id === a),
          o = Ne.find((w) => w.id === (n == null ? void 0 : n.containerTypeId));
        if (!n || !p || !o) {
          N(
            "Missing Information",
            "Consolidation, order, or container type not found.",
          );
          return;
        }
        if (p.status === Ut.Pending) {
          N(
            "Order Not Confirmed",
            "This order is still Pending. Confirm it (Pending → Processing) so charges are applied before adding it to a consolidation.",
          );
          return;
        }
        if (!n.isMixed && p.customerId !== n.customerId) {
          N(
            "Customer Mismatch",
            "Order belongs to a different customer than the consolidation.",
          );
          return;
        }
        if (
          n.status === f.InTransit ||
          n.status === f.Delivered ||
          n.status === f.Completed ||
          n.status === f.Cancelled
        ) {
          N(
            "Invalid Status",
            `Cannot add orders to a consolidation with status: ${n.status}.`,
          );
          return;
        }
        if (n.shippingCostDistributed) {
          W(
            "Shipping Costs Distributed",
            "Cannot add orders: shipping costs already distributed. Revert status to 'Loading' or 'Planning' if changes are necessary (this requires manual review of financial transactions).",
          );
          return;
        }
        const V = Le(n),
          J = V.reduce((w, xe) => w + xe.volumeM3, 0),
          L = V.reduce((w, xe) => w + xe.weightKG, 0);
        if (J + p.volumeM3 > o.maxVolumeM3) {
          const w = J + p.volumeM3,
            xe = w - o.maxVolumeM3;
          N(
            "Volume Limit Exceeded",
            `Cannot add order. Would exceed container volume limit by ${xe.toFixed(2)} m3.

Container: ${o.name} (${o.maxVolumeM3.toFixed(2)} m3 max)
Current usage: ${J.toFixed(2)} m3
Adding: ${p.volumeM3.toFixed(2)} m3
Total would be: ${w.toFixed(2)} m3`,
          );
          return;
        }
        if (L + p.weightKG > o.maxWeightKG) {
          const w = L + p.weightKG,
            xe = w - o.maxWeightKG;
          N(
            "Weight Limit Exceeded",
            `Cannot add order. Would exceed container weight limit by ${xe.toFixed(2)} KG.

Container: ${o.name} (${o.maxWeightKG.toFixed(2)} KG max)
Current usage: ${L.toFixed(2)} KG
Adding: ${p.weightKG.toFixed(2)} KG
Total would be: ${w.toFixed(2)} KG`,
          );
          return;
        }
        _(t, [...n.orderIds, a]);
      },
      ft = (t, a) => {
        const n = s.find((p) => p.id === t);
        if (n) {
          if (
            n.status === f.InTransit ||
            n.status === f.Delivered ||
            n.status === f.Completed ||
            n.status === f.Cancelled
          ) {
            N(
              "Invalid Status",
              `Cannot remove orders from a consolidation with status: ${n.status}.`,
            );
            return;
          }
          if (n.shippingCostDistributed) {
            W(
              "Shipping Costs Distributed",
              "Cannot remove orders: shipping costs already distributed. Revert status to 'Loading' or 'Planning' if changes are necessary (this requires manual review of financial transactions).",
            );
            return;
          }
          _(
            t,
            n.orderIds.filter((p) => p !== a),
          );
        }
      },
      bt = (t) => {
        (v(t), t && D(t));
      },
      vt = (t) => {
        (Y(t), K(!0));
      },
      jt = () => {
        (Y(null), K(!1));
      },
      Nt = (t, a) => {
        q(t, a);
      },
      yt = (t, a, n, p, o, V, J) => {
        const L = s.find((w) => w.id === t);
        if (L) {
          if (!L.orderIds || L.orderIds.length === 0) {
            N(
              "No Orders",
              "Cannot ship a consolidation with no orders. Please add at least one order before shipping.",
            );
            return;
          }
          ($(t, a, n, p, o, V, J), le(!1), de(null));
        }
      };
    r.useEffect(() => {
      (P && !s.find((t) => t.id === P) && v(null),
        I !== null && !b && P !== null && !C && v(null),
        C && E(!1));
    }, [I, B, s, P, C, b]);
    const lt = (t) =>
        Z.some(
          (a) =>
            a.type === "consolidation" &&
            (a.relatedId === t || a.consolidationId === t),
        ),
      Be = (t) =>
        Z.find(
          (a) =>
            a.type === "consolidation" &&
            (a.relatedId === t || a.consolidationId === t),
        ),
      wt = (t, a) => {
        if (a === f.InTransit) {
          const n = s.find((p) => p.id === t);
          n && (de(n), le(!0));
        } else x(t, a);
      },
      Ct = (t) => {
        (console.log(
          "[DEBUG] Status update clicked for:",
          t.name,
          "Status:",
          t.status,
        ),
          ce(t),
          R(!0));
      },
      kt = async (t) => {
        H && (await wt(H.id, t), R(!1), ce(null));
      },
      Mt = (t) =>
        t.status !== f.InTransit &&
        t.status !== f.Delivered &&
        t.status !== f.Completed &&
        t.status !== f.Cancelled &&
        !t.shippingCostDistributed,
      St = (t) => t.status !== f.Cancelled,
      Oe = s,
      [os, ds] = r.useState([]),
      qe = r.useCallback(() => {
        (E(!0), v(null));
      }, []);
    r.useEffect(() => {
      const t = (a) => {
        a.key === "Escape" && P && qe();
      };
      return (
        document.addEventListener("keydown", t),
        () => document.removeEventListener("keydown", t)
      );
    }, [P, qe]);
    const Q = P ? s.find((t) => t.id === P) : null,
      Dt = Q ? Le(Q) : [],
      It = Q ? pt(Q) : [],
      Lt = Q
        ? Q.status !== f.InTransit &&
          Q.status !== f.Delivered &&
          Q.status !== f.Completed &&
          Q.status !== f.Cancelled &&
          !Q.shippingCostDistributed
        : !1,
      Ft = (t) => {
        Q && gt(Q.id, t);
      },
      Tt = (t) => {
        Q && ft(Q.id, t);
      },
      [me, He] = r.useState(""),
      [ve, Je] = r.useState(""),
      [Fe, Ye] = r.useState(!1),
      [ge, nt] = r.useState(!1);
    (r.useEffect(() => {
      try {
        const t = localStorage.getItem("bundleist_consolidations_state");
        if (!t) return;
        const a = JSON.parse(t);
        (a && typeof a.searchTerm == "string" && He(a.searchTerm),
          a && typeof a.statusFilter == "string" && Je(a.statusFilter),
          a && typeof a.activeOnly == "boolean" && Ye(a.activeOnly),
          a &&
            typeof a.currentPage == "number" &&
            i(Math.max(1, a.currentPage)),
          a &&
            typeof a.selectedConsolidationId == "string" &&
            ie(a.selectedConsolidationId),
          a && typeof a.detailsExpanded == "boolean" && nt(a.detailsExpanded));
      } catch {}
    }, []),
      r.useEffect(() => {
        try {
          localStorage.setItem(
            "bundleist_consolidations_state",
            JSON.stringify({
              searchTerm: me,
              statusFilter: ve,
              activeOnly: Fe,
              currentPage: z,
              selectedConsolidationId: G,
              detailsExpanded: ge,
            }),
          );
        } catch {}
      }, [me, ve, Fe, z, G, ge]),
      r.useEffect(() => {
        try {
          const t = localStorage.getItem("bundleist_nav_intent");
          if (!t) return;
          const a = JSON.parse(t);
          if (!a || a.page !== "consolidations") return;
          (typeof a.searchTerm == "string" && He(a.searchTerm),
            typeof a.statusFilter == "string" && Je(a.statusFilter),
            typeof a.activeOnly == "boolean" && Ye(a.activeOnly),
            typeof a.consolidationId == "string" && ie(a.consolidationId),
            localStorage.removeItem("bundleist_nav_intent"));
        } catch {}
      }, []),
      r.useEffect(() => {
        i(1);
      }, [me, ve, Fe]));
    const ot = r.useMemo(
        () => new Map(k.map((t) => [t.id, t.customerId])),
        [k],
      ),
      We = r.useMemo(() => {
        const t = new Map();
        for (const a of Oe) {
          const n = new Set();
          for (const p of a.orderIds || []) {
            const o = ot.get(p);
            o && n.add(o);
          }
          t.set(a.id, [...n]);
        }
        return t;
      }, [Oe, ot]),
      dt = r.useCallback(
        (t) => {
          const a = We.get(t.id) || [];
          return a.length > 0 ? a : t.involvedCustomerIds || [];
        },
        [We],
      ),
      Ve = r.useCallback(
        (t) => (t.isMixed ? !0 : (We.get(t.id) || []).length > 1),
        [We],
      ),
      ne = Oe.filter((t) => {
        const a = Ve(t),
          n = dt(t),
          p = b || !I || (a ? n.includes(I) : t.customerId === I || n[0] === I),
          o = new Set([
            "intransit",
            "atoriginport",
            "intransitsea",
            "atdestinationport",
            "customsclearance",
            "awaitingdelivery",
            "outfordelivery",
            "delivered",
            "completed",
            "cancelled",
            "canceled",
            "onhold",
          ]),
          V = String(t.status || "")
            .trim()
            .toLowerCase(),
          J = Fe ? !o.has(V) : !0,
          L =
            me === "" ||
            t.name.toLowerCase().includes(me.toLowerCase()) ||
            t.route.toLowerCase().includes(me.toLowerCase()) ||
            (t.notes && t.notes.toLowerCase().includes(me.toLowerCase())),
          w = ve === "" || t.status === ve;
        return p && J && L && w;
      });
    r.useEffect(() => {
      ke(new Date());
    }, [Oe, Z, j, me, ve, Fe, z]);
    const _e = Math.ceil(ne.length / u),
      ct = (z - 1) * u,
      $t = ct + u,
      Te = ne.slice(ct, $t),
      Se = Te.find((t) => t.id === G) || (Te[0] ?? null);
    r.useEffect(() => {
      if (!Se) {
        ie(null);
        return;
      }
      (!G || !Te.some((t) => t.id === G)) && ie(Se.id);
    }, [me, ve, z, M, ne.length]);
    const Pt = ne.length,
      Et = ne.filter(
        (t) =>
          !new Set([
            "intransit",
            "atoriginport",
            "intransitsea",
            "atdestinationport",
            "customsclearance",
            "awaitingdelivery",
            "outfordelivery",
            "delivered",
            "completed",
            "cancelled",
            "canceled",
            "onhold",
          ]).has(
            String(t.status || "")
              .trim()
              .toLowerCase(),
          ),
      ).length,
      Rt = ne.filter((t) => Ve(t)).length,
      Bt = ne.filter((t) => !!Be(t.id)).length,
      [Qe, mt] = r.useState(null),
      [Ot, Ae] = r.useState(!1);
    return e.jsx(e.Fragment, {
      children: e.jsx("div", {
        className: "ui-page",
        children: e.jsxs("div", {
          className: "px-4 sm:px-6 lg:px-8 py-6 space-y-6 sm:space-y-8",
          children: [
            M
              ? e.jsx("div", {
                  className: "flex justify-center items-center min-h-screen",
                  children: e.jsxs("div", {
                    className: "relative",
                    children: [
                      e.jsx("div", {
                        className:
                          "animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600",
                      }),
                      e.jsx("div", {
                        className: "mt-4 text-center text-gray-600 font-medium",
                        children: "Loading consolidations...",
                      }),
                    ],
                  }),
                })
              : A
                ? e.jsx("div", {
                    className:
                      "bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-800 px-6 py-4 rounded-xl shadow-lg",
                    role: "alert",
                    children: e.jsxs("div", {
                      className: "flex items-center",
                      children: [
                        e.jsx("div", {
                          className: "flex-shrink-0",
                          children: e.jsx("svg", {
                            className: "h-5 w-5 text-red-600",
                            viewBox: "0 0 20 20",
                            fill: "currentColor",
                            children: e.jsx("path", {
                              fillRule: "evenodd",
                              d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                              clipRule: "evenodd",
                            }),
                          }),
                        }),
                        e.jsxs("div", {
                          className: "ml-3",
                          children: [
                            e.jsx("h3", {
                              className: "text-sm font-semibold text-red-800",
                              children: "Error Loading Consolidations",
                            }),
                            e.jsx("div", {
                              className: "mt-1 text-sm text-red-700",
                              children: A,
                            }),
                          ],
                        }),
                      ],
                    }),
                  })
                : e.jsxs(e.Fragment, {
                    children: [
                      e.jsx(is, {
                        isOpen: pe,
                        onClose: () => ee(!1),
                        onSubmit: ht,
                        allCustomers: T,
                        isAdmin: b,
                        currentCustomerId: I,
                      }),
                      e.jsx(Yt, {
                        title: "Consolidations",
                        subtitle: b
                          ? "Plan, load, and ship consolidations with clear capacity visibility."
                          : "Track your consolidations and shipment linkage.",
                        icon: e.jsx("svg", {
                          className: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: e.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
                          }),
                        }),
                        right: e.jsx(Qt, { asOf: Re }),
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
                                children: "Total",
                              }),
                              e.jsx("div", {
                                className:
                                  "text-xl font-extrabold text-slate-900",
                                children: Pt,
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className:
                              "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3",
                            children: [
                              e.jsx("div", {
                                className: "ui-kicker text-emerald-700",
                                children: "Active",
                              }),
                              e.jsx("div", {
                                className:
                                  "text-xl font-extrabold text-emerald-900",
                                children: Et,
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className:
                              "rounded-xl border border-amber-200 bg-amber-50 px-4 py-3",
                            children: [
                              e.jsx("div", {
                                className: "ui-kicker text-amber-700",
                                children: "Mixed",
                              }),
                              e.jsx("div", {
                                className:
                                  "text-xl font-extrabold text-amber-900",
                                children: Rt,
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className:
                              "rounded-xl border border-blue-200 bg-blue-50 px-4 py-3",
                            children: [
                              e.jsx("div", {
                                className: "ui-kicker text-blue-700",
                                children: "With Shipment",
                              }),
                              e.jsx("div", {
                                className:
                                  "text-xl font-extrabold text-blue-900",
                                children: Bt,
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "ui-surface-solid p-6 sm:p-8",
                        children: [
                          e.jsxs("div", {
                            className:
                              "mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
                            children: [
                              e.jsxs("div", {
                                className: "text-sm text-slate-600",
                                children: [
                                  "Showing: ",
                                  ne.length,
                                  " consolidation",
                                  ne.length === 1 ? "" : "s",
                                ],
                              }),
                              b &&
                                e.jsx(S, {
                                  type: "button",
                                  onClick: () => ee(!0),
                                  variant: "default",
                                  children: "Create Consolidation",
                                }),
                            ],
                          }),
                          e.jsxs("div", {
                            className: "flex flex-col md:flex-row gap-4 mb-4",
                            children: [
                              e.jsx("input", {
                                type: "text",
                                placeholder: "Search by name, route, notes...",
                                value: me,
                                onChange: (t) => He(t.target.value),
                                className:
                                  "ui-field w-full md:w-1/3 ui-field--sm",
                              }),
                              e.jsxs("select", {
                                value: ve,
                                onChange: (t) => Je(t.target.value),
                                className:
                                  "ui-field w-full md:w-48 ui-field--sm",
                                children: [
                                  e.jsx("option", {
                                    value: "",
                                    children: "All Statuses",
                                  }),
                                  Object.values(f).map((t) =>
                                    e.jsx(
                                      "option",
                                      { value: t, children: t },
                                      t,
                                    ),
                                  ),
                                ],
                              }),
                              e.jsxs("label", {
                                className:
                                  "inline-flex items-center gap-2 text-sm font-semibold text-gray-700 select-none",
                                title:
                                  "Shows only pre-shipment consolidations (hides InTransit/ports/customs/delivery + Delivered/Completed/Cancelled/OnHold)",
                                children: [
                                  e.jsx("input", {
                                    type: "checkbox",
                                    checked: Fe,
                                    onChange: (t) => Ye(t.target.checked),
                                  }),
                                  "Active only",
                                ],
                              }),
                            ],
                          }),
                          ne.length === 0
                            ? e.jsxs("div", {
                                className:
                                  "text-center py-12 bg-gray-50 rounded-xl border border-gray-200",
                                children: [
                                  e.jsx("div", {
                                    className:
                                      "mx-auto mb-4 w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center",
                                    children: e.jsx("svg", {
                                      className: "w-8 h-8 text-gray-400",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24",
                                      children: e.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
                                      }),
                                    }),
                                  }),
                                  e.jsx("h3", {
                                    className:
                                      "text-xl font-semibold text-gray-900 mb-2",
                                    children: "No Consolidations Found",
                                  }),
                                  e.jsx("p", {
                                    className: "text-gray-600 max-w-md mx-auto",
                                    children:
                                      me || ve
                                        ? "No consolidations match your search criteria."
                                        : "No consolidations have been created yet.",
                                  }),
                                ],
                              })
                            : e.jsxs(e.Fragment, {
                                children: [
                                  e.jsxs("div", {
                                    className:
                                      "hidden lg:grid grid-cols-12 gap-4",
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
                                                    children: "Consolidations",
                                                  }),
                                                  e.jsxs("div", {
                                                    className:
                                                      "text-xs text-slate-600",
                                                    children: [
                                                      Te.length,
                                                      " on this page",
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "max-h-[62vh] overflow-auto divide-y divide-slate-100",
                                              children: Te.map((t) => {
                                                const a = Le(t),
                                                  n =
                                                    new Set(
                                                      a.map(
                                                        (w) => w.customerId,
                                                      ),
                                                    ).size > 1,
                                                  p = !!(t.isMixed || n),
                                                  o = Be(t.id),
                                                  V = Math.round(
                                                    t.containerSpaceFilledPercentage ??
                                                      0,
                                                  ),
                                                  J = Math.round(
                                                    t.containerWeightFilledPercentage ??
                                                      0,
                                                  ),
                                                  L =
                                                    (Se == null
                                                      ? void 0
                                                      : Se.id) === t.id;
                                                return e.jsx(
                                                  "button",
                                                  {
                                                    type: "button",
                                                    onClick: () => ie(t.id),
                                                    className: [
                                                      "w-full text-left px-4 py-3 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/10",
                                                      L
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
                                                                  className: `px-2 py-0.5 text-[11px] font-semibold rounded-full ${tt[t.status]}`,
                                                                  children:
                                                                    t.status,
                                                                }),
                                                                e.jsx("span", {
                                                                  className: `px-2 py-0.5 text-[11px] font-semibold rounded-full ${p ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-800"}`,
                                                                  children: p
                                                                    ? "Mixed"
                                                                    : "Regular",
                                                                }),
                                                                o
                                                                  ? e.jsx(
                                                                      "span",
                                                                      {
                                                                        className:
                                                                          "px-2 py-0.5 text-[11px] font-semibold rounded-full bg-blue-50 text-blue-700",
                                                                        children:
                                                                          "Has shipment",
                                                                      },
                                                                    )
                                                                  : e.jsx(
                                                                      "span",
                                                                      {
                                                                        className:
                                                                          "px-2 py-0.5 text-[11px] font-semibold rounded-full bg-slate-100 text-slate-700",
                                                                        children:
                                                                          "No shipment",
                                                                      },
                                                                    ),
                                                              ],
                                                            }),
                                                            e.jsx("div", {
                                                              className:
                                                                "font-semibold text-slate-900 truncate",
                                                              children: t.name,
                                                            }),
                                                            e.jsxs("div", {
                                                              className:
                                                                "mt-1 text-xs text-slate-600 flex flex-wrap gap-x-3 gap-y-1",
                                                              children: [
                                                                e.jsx("span", {
                                                                  children:
                                                                    t.route,
                                                                }),
                                                                e.jsx("span", {
                                                                  children:
                                                                    t.departureDate,
                                                                }),
                                                                e.jsxs("span", {
                                                                  children: [
                                                                    a.length,
                                                                    " orders",
                                                                  ],
                                                                }),
                                                              ],
                                                            }),
                                                            e.jsxs("div", {
                                                              className:
                                                                "mt-2 grid grid-cols-2 gap-2",
                                                              children: [
                                                                e.jsxs("div", {
                                                                  className:
                                                                    "rounded-lg border border-slate-200/70 bg-white px-2 py-1",
                                                                  children: [
                                                                    e.jsx(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "ui-kicker",
                                                                        children:
                                                                          "Volume",
                                                                      },
                                                                    ),
                                                                    e.jsxs(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "text-xs font-semibold text-slate-900",
                                                                        children:
                                                                          [
                                                                            V,
                                                                            "%",
                                                                          ],
                                                                      },
                                                                    ),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className:
                                                                    "rounded-lg border border-slate-200/70 bg-white px-2 py-1",
                                                                  children: [
                                                                    e.jsx(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "ui-kicker",
                                                                        children:
                                                                          "Weight",
                                                                      },
                                                                    ),
                                                                    e.jsxs(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "text-xs font-semibold text-slate-900",
                                                                        children:
                                                                          [
                                                                            J,
                                                                            "%",
                                                                          ],
                                                                      },
                                                                    ),
                                                                  ],
                                                                }),
                                                              ],
                                                            }),
                                                          ],
                                                        }),
                                                        e.jsx("div", {
                                                          className:
                                                            "shrink-0 pt-1",
                                                          children: e.jsx(
                                                            "svg",
                                                            {
                                                              className: `w-5 h-5 ${L ? "text-emerald-700" : "text-slate-300"}`,
                                                              fill: "none",
                                                              stroke:
                                                                "currentColor",
                                                              viewBox:
                                                                "0 0 24 24",
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
                                                            },
                                                          ),
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
                                          children: Se
                                            ? e.jsx("div", {
                                                className: "p-5",
                                                children: (function () {
                                                  const t = Se,
                                                    a = Le(t),
                                                    n =
                                                      new Set(
                                                        a.map(
                                                          (l) => l.customerId,
                                                        ),
                                                      ).size > 1,
                                                    p = !!(t.isMixed || n),
                                                    o = Be(t.id),
                                                    V = it(t.containerTypeId),
                                                    J = p
                                                      ? rt(
                                                          t.involvedCustomerIds,
                                                        )
                                                      : Ie(t.customerId),
                                                    L = Math.round(
                                                      t.containerSpaceFilledPercentage ??
                                                        0,
                                                    ),
                                                    w = Math.round(
                                                      t.containerWeightFilledPercentage ??
                                                        0,
                                                    ),
                                                    xe = b && St(t),
                                                    Xe = b && Mt(t),
                                                    fe = (j || []).filter(
                                                      (l) =>
                                                        l.relatedConsolidationId ===
                                                        t.id,
                                                    ),
                                                    $e = fe.reduce(
                                                      (l, g) =>
                                                        l + (g.amount || 0),
                                                      0,
                                                    ),
                                                    je = fe.filter(
                                                      (l) =>
                                                        l.type ===
                                                        st.ShippingCost,
                                                    ),
                                                    U = (() => {
                                                      const l = new Map();
                                                      for (const g of je) {
                                                        const c =
                                                            g.customerId ||
                                                            "unknown",
                                                          re = Math.abs(
                                                            Number(
                                                              g.amount || 0,
                                                            ),
                                                          ),
                                                          ue = l.get(c) || {
                                                            count: 0,
                                                            billed: 0,
                                                          };
                                                        l.set(c, {
                                                          count: ue.count + 1,
                                                          billed:
                                                            ue.billed + re,
                                                        });
                                                      }
                                                      return l;
                                                    })(),
                                                    ye = [...U.values()].reduce(
                                                      (l, g) => l + g.billed,
                                                      0,
                                                    ),
                                                    De =
                                                      t.costDistributionMethod ||
                                                      "volume_proportional",
                                                    Ze = (() => {
                                                      try {
                                                        if (
                                                          De ===
                                                            "fixed_rate_m3" &&
                                                          t.fixedRatePerM3
                                                        )
                                                          return Kt.calculateFixedRateDistribution(
                                                            a,
                                                            t.fixedRatePerM3,
                                                          );
                                                        const l = Math.max(
                                                            0,
                                                            Number(
                                                              t.shippingCost ||
                                                                0,
                                                            ),
                                                          ),
                                                          g = new Map(),
                                                          c = a.filter(
                                                            (te) =>
                                                              !!te.customerId &&
                                                              Number(
                                                                te.volumeM3 ||
                                                                  0,
                                                              ) > 0,
                                                          ),
                                                          re = c.reduce(
                                                            (te, we) =>
                                                              te +
                                                              Number(
                                                                we.volumeM3 ||
                                                                  0,
                                                              ),
                                                            0,
                                                          );
                                                        if (re <= 0 || l <= 0)
                                                          return g;
                                                        const ue = new Map();
                                                        for (const te of c)
                                                          ue.set(
                                                            te.customerId,
                                                            (ue.get(
                                                              te.customerId,
                                                            ) || 0) +
                                                              Number(
                                                                te.volumeM3 ||
                                                                  0,
                                                              ),
                                                          );
                                                        for (const [
                                                          te,
                                                          we,
                                                        ] of ue)
                                                          g.set(
                                                            te,
                                                            l * (we / re),
                                                          );
                                                        return g;
                                                      } catch {
                                                        return new Map();
                                                      }
                                                    })(),
                                                    Wt = (() => {
                                                      if (
                                                        De ===
                                                          "fixed_rate_m3" &&
                                                        t.fixedRatePerM3
                                                      ) {
                                                        let l = 0;
                                                        for (const g of Ze.values())
                                                          l += Number(g || 0);
                                                        return l;
                                                      }
                                                      return Math.max(
                                                        0,
                                                        Number(
                                                          t.shippingCost || 0,
                                                        ),
                                                      );
                                                    })(),
                                                    xt = (() => {
                                                      const l = new Map();
                                                      for (const g of a) {
                                                        const c =
                                                          g.customerId ||
                                                          "unknown";
                                                        l.set(
                                                          c,
                                                          (l.get(c) || 0) +
                                                            Number(
                                                              g.volumeM3 || 0,
                                                            ),
                                                        );
                                                      }
                                                      return l;
                                                    })(),
                                                    Ke =
                                                      je.length > 0
                                                        ? ye - Wt
                                                        : 0,
                                                    Vt = (() => {
                                                      const l = [...U.values()]
                                                        .map((c) =>
                                                          Number(c.billed || 0),
                                                        )
                                                        .filter((c) => c > 0);
                                                      if (l.length < 2)
                                                        return !1;
                                                      const g = l[0];
                                                      return l.every(
                                                        (c) =>
                                                          Math.abs(c - g) <
                                                          0.01,
                                                      );
                                                    })(),
                                                    et = (() => {
                                                      const l = [];
                                                      (t.creationDate &&
                                                        l.push(t.creationDate),
                                                        o != null &&
                                                          o.shippingDate &&
                                                          l.push(
                                                            o.shippingDate,
                                                          ));
                                                      for (const c of fe)
                                                        c.date &&
                                                          l.push(c.date);
                                                      const g = l
                                                        .map((c) =>
                                                          new Date(c).getTime(),
                                                        )
                                                        .filter(
                                                          (c) =>
                                                            !Number.isNaN(c),
                                                        )
                                                        .reduce(
                                                          (c, re) =>
                                                            Math.max(c, re),
                                                          0,
                                                        );
                                                      return g
                                                        ? new Date(g)
                                                        : null;
                                                    })(),
                                                    _t = (() => {
                                                      const l = [];
                                                      (t.creationDate &&
                                                        l.push({
                                                          at: t.creationDate,
                                                          title:
                                                            "Consolidation created",
                                                          subtitle: t.name,
                                                          tone: "neutral",
                                                        }),
                                                        t.departureDate &&
                                                          l.push({
                                                            at: t.departureDate,
                                                            title:
                                                              "Departure scheduled",
                                                            subtitle: t.route,
                                                            tone: "neutral",
                                                          }),
                                                        o != null &&
                                                          o.shippingDate &&
                                                          l.push({
                                                            at: o.shippingDate,
                                                            title: `Shipment ${he(o.id, "shipment")}`,
                                                            subtitle: String(
                                                              o.status,
                                                            ),
                                                            tone: "good",
                                                            onClick: () =>
                                                              O(o.id),
                                                          }));
                                                      for (const g of fe)
                                                        l.push({
                                                          at: g.date,
                                                          title: `${g.type} ${g.amount >= 0 ? "+" : ""}${g.amount.toLocaleString()}`,
                                                          subtitle:
                                                            g.description,
                                                          tone:
                                                            g.amount >= 0
                                                              ? "good"
                                                              : "warn",
                                                          onClick: () => {
                                                            try {
                                                              localStorage.setItem(
                                                                "bundleist_nav_intent",
                                                                JSON.stringify({
                                                                  page: "payments",
                                                                  transactionId:
                                                                    g.id,
                                                                }),
                                                              );
                                                            } catch {}
                                                            d("payments");
                                                          },
                                                        });
                                                      return l
                                                        .filter(
                                                          (g) =>
                                                            !Number.isNaN(
                                                              new Date(
                                                                g.at,
                                                              ).getTime(),
                                                            ),
                                                        )
                                                        .sort(
                                                          (g, c) =>
                                                            new Date(
                                                              c.at,
                                                            ).getTime() -
                                                            new Date(
                                                              g.at,
                                                            ).getTime(),
                                                        );
                                                    })(),
                                                    At = (() => {
                                                      const l = [
                                                        {
                                                          label:
                                                            "Consolidations",
                                                          onClick: () =>
                                                            d("consolidations"),
                                                        },
                                                      ];
                                                      return (
                                                        l.push({
                                                          label: he(
                                                            t.id,
                                                            "consolidation",
                                                          ),
                                                          title: t.id,
                                                        }),
                                                        o &&
                                                          l.push({
                                                            label: he(
                                                              o.id,
                                                              "shipment",
                                                            ),
                                                            title: o.id,
                                                            onClick: () =>
                                                              O(o.id),
                                                          }),
                                                        l
                                                      );
                                                    })(),
                                                    ze = (() => {
                                                      const l = a.map((se) => ({
                                                          id: se.id,
                                                          label: he(
                                                            se.id,
                                                            "order",
                                                          ),
                                                          subtitle:
                                                            se.description,
                                                          onClick: () =>
                                                            d("orders", se.id),
                                                        })),
                                                        g = [
                                                          {
                                                            id: t.id,
                                                            label: he(
                                                              t.id,
                                                              "consolidation",
                                                            ),
                                                            subtitle: `${t.name} (${t.status})`,
                                                            onClick: () =>
                                                              d(
                                                                "consolidations",
                                                                t.id,
                                                              ),
                                                          },
                                                        ],
                                                        c = o
                                                          ? [
                                                              {
                                                                id: o.id,
                                                                label: he(
                                                                  o.id,
                                                                  "shipment",
                                                                ),
                                                                subtitle: `${o.type} (${String(o.status)})`,
                                                                onClick: () =>
                                                                  O(o.id),
                                                              },
                                                            ]
                                                          : [],
                                                        re = je.reduce(
                                                          (se, Ee) =>
                                                            se +
                                                            Math.abs(
                                                              Number(
                                                                Ee.amount || 0,
                                                              ),
                                                            ),
                                                          0,
                                                        ),
                                                        ue = fe
                                                          .filter(
                                                            (se) =>
                                                              se.type ===
                                                              st.IncomingPayment,
                                                          )
                                                          .reduce(
                                                            (se, Ee) =>
                                                              se +
                                                              Math.abs(
                                                                Number(
                                                                  Ee.amount ||
                                                                    0,
                                                                ),
                                                              ),
                                                            0,
                                                          ),
                                                        te = fe
                                                          .filter(
                                                            (se) =>
                                                              se.type ===
                                                              st.MiscellaneousCost,
                                                          )
                                                          .reduce(
                                                            (se, Ee) =>
                                                              se +
                                                              Math.abs(
                                                                Number(
                                                                  Ee.amount ||
                                                                    0,
                                                                ),
                                                              ),
                                                            0,
                                                          ),
                                                        we = [
                                                          {
                                                            label:
                                                              "Shipping billed",
                                                            value: `$${re.toLocaleString()}`,
                                                          },
                                                          {
                                                            label: "Incoming",
                                                            value: `$${ue.toLocaleString()}`,
                                                          },
                                                          {
                                                            label: "Misc costs",
                                                            value: `$${te.toLocaleString()}`,
                                                          },
                                                          {
                                                            label: "Tx count",
                                                            value: String(
                                                              fe.length,
                                                            ),
                                                          },
                                                        ];
                                                      return {
                                                        orders: l,
                                                        consolidations: g,
                                                        shipments: c,
                                                        ledger: {
                                                          net: $e,
                                                          summary: we,
                                                          onViewPayments:
                                                            () => {
                                                              try {
                                                                localStorage.setItem(
                                                                  "bundleist_nav_intent",
                                                                  JSON.stringify(
                                                                    {
                                                                      page: "payments",
                                                                      relatedConsolidationId:
                                                                        t.id,
                                                                    },
                                                                  ),
                                                                );
                                                              } catch {}
                                                              d("payments");
                                                            },
                                                        },
                                                      };
                                                    })();
                                                  return e.jsxs("div", {
                                                    children: [
                                                      e.jsx(Zt, {
                                                        items: At,
                                                        className: "mb-3",
                                                      }),
                                                      e.jsxs("div", {
                                                        className:
                                                          "flex items-start justify-between gap-4",
                                                        children: [
                                                          e.jsxs("div", {
                                                            className:
                                                              "min-w-0",
                                                            children: [
                                                              e.jsx("div", {
                                                                className:
                                                                  "text-xs text-slate-500 mb-1",
                                                                children:
                                                                  "Consolidation",
                                                              }),
                                                              e.jsx("div", {
                                                                className:
                                                                  "text-lg font-extrabold tracking-tight text-slate-900 truncate",
                                                                children:
                                                                  t.name,
                                                              }),
                                                              e.jsxs("div", {
                                                                className:
                                                                  "mt-2 flex flex-wrap items-center gap-2",
                                                                children: [
                                                                  e.jsxs(
                                                                    "div",
                                                                    {
                                                                      className:
                                                                        "flex items-center gap-1 bg-blue-50 px-2 py-1 rounded",
                                                                      children:
                                                                        [
                                                                          e.jsx(
                                                                            "span",
                                                                            {
                                                                              className:
                                                                                "text-xs font-medium text-blue-700",
                                                                              children:
                                                                                he(
                                                                                  t.id,
                                                                                  "consolidation",
                                                                                ),
                                                                            },
                                                                          ),
                                                                          e.jsx(
                                                                            S,
                                                                            {
                                                                              onClick:
                                                                                () =>
                                                                                  ut(
                                                                                    t.id,
                                                                                  ),
                                                                              variant:
                                                                                "ghost",
                                                                              size: "icon",
                                                                              className:
                                                                                "h-7 w-7 text-blue-700 hover:bg-blue-100/60",
                                                                              title:
                                                                                "Copy full ID",
                                                                              children:
                                                                                e.jsx(
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
                                                                            },
                                                                          ),
                                                                        ],
                                                                    },
                                                                  ),
                                                                  et &&
                                                                    e.jsxs(
                                                                      "span",
                                                                      {
                                                                        className:
                                                                          "px-2 py-1 rounded-full bg-white border border-slate-200/70 text-[11px] font-semibold text-slate-700",
                                                                        title:
                                                                          et.toLocaleString(),
                                                                        children:
                                                                          [
                                                                            "Last activity: ",
                                                                            es(
                                                                              et,
                                                                            ),
                                                                          ],
                                                                      },
                                                                    ),
                                                                ],
                                                              }),
                                                              e.jsxs("div", {
                                                                className:
                                                                  "mt-2 flex flex-wrap items-center gap-2",
                                                                children: [
                                                                  e.jsx(
                                                                    "span",
                                                                    {
                                                                      className: `px-2 py-0.5 text-xs font-semibold rounded-full ${tt[t.status]}`,
                                                                      children:
                                                                        t.status,
                                                                    },
                                                                  ),
                                                                  e.jsx(
                                                                    "span",
                                                                    {
                                                                      className: `px-2 py-0.5 text-xs font-semibold rounded-full ${p ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-800"}`,
                                                                      children:
                                                                        p
                                                                          ? "Mixed"
                                                                          : "Regular",
                                                                    },
                                                                  ),
                                                                ],
                                                              }),
                                                              e.jsxs("div", {
                                                                className:
                                                                  "mt-3 flex flex-wrap gap-2",
                                                                children: [
                                                                  o
                                                                    ? e.jsxs(
                                                                        S,
                                                                        {
                                                                          variant:
                                                                            "outline",
                                                                          size: "sm",
                                                                          className:
                                                                            "h-8 px-3 rounded-full",
                                                                          onClick:
                                                                            () =>
                                                                              O(
                                                                                o.id,
                                                                              ),
                                                                          children:
                                                                            [
                                                                              "Shipment ",
                                                                              he(
                                                                                o.id,
                                                                                "shipment",
                                                                              ),
                                                                              " (",
                                                                              String(
                                                                                o.status,
                                                                              ),
                                                                              ")",
                                                                            ],
                                                                        },
                                                                      )
                                                                    : e.jsx(
                                                                        "span",
                                                                        {
                                                                          className:
                                                                            "px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-50 border border-slate-200/70 text-slate-600",
                                                                          children:
                                                                            "No shipment yet",
                                                                        },
                                                                      ),
                                                                  e.jsxs(S, {
                                                                    variant:
                                                                      "secondary",
                                                                    size: "sm",
                                                                    className:
                                                                      "h-8 px-3 rounded-full",
                                                                    onClick:
                                                                      () => {
                                                                        try {
                                                                          localStorage.setItem(
                                                                            "bundleist_nav_intent",
                                                                            JSON.stringify(
                                                                              {
                                                                                page: "payments",
                                                                                relatedConsolidationId:
                                                                                  t.id,
                                                                              },
                                                                            ),
                                                                          );
                                                                        } catch {}
                                                                        d(
                                                                          "payments",
                                                                        );
                                                                      },
                                                                    title:
                                                                      "Open payments filtered to this consolidation",
                                                                    children: [
                                                                      "Payments (",
                                                                      fe.length,
                                                                      ", ",
                                                                      $e >= 0
                                                                        ? "+"
                                                                        : "",
                                                                      $e.toLocaleString(),
                                                                      ")",
                                                                    ],
                                                                  }),
                                                                ],
                                                              }),
                                                            ],
                                                          }),
                                                          e.jsxs("div", {
                                                            className:
                                                              "shrink-0 flex flex-wrap gap-2 justify-end",
                                                            children: [
                                                              e.jsx(S, {
                                                                type: "button",
                                                                variant:
                                                                  "outline",
                                                                size: "xs",
                                                                className:
                                                                  "h-8 px-3 rounded-full",
                                                                onClick: () =>
                                                                  nt((l) => !l),
                                                                title: ge
                                                                  ? "Collapse detail panels"
                                                                  : "Expand detail panels",
                                                                children: ge
                                                                  ? "Show less"
                                                                  : "Show more",
                                                              }),
                                                              e.jsx(S, {
                                                                variant:
                                                                  "outline",
                                                                size: "xs",
                                                                onClick: () => {
                                                                  (mt(t),
                                                                    Ae(!0));
                                                                },
                                                                children:
                                                                  "Open Details",
                                                              }),
                                                              o &&
                                                                e.jsx(S, {
                                                                  variant:
                                                                    "outline",
                                                                  size: "xs",
                                                                  onClick: () =>
                                                                    O(o.id),
                                                                  children:
                                                                    "View Shipment",
                                                                }),
                                                            ],
                                                          }),
                                                        ],
                                                      }),
                                                      b &&
                                                        (je.length > 0 ||
                                                          De ===
                                                            "fixed_rate_m3" ||
                                                          De ===
                                                            "volume_proportional") &&
                                                        e.jsxs("div", {
                                                          className:
                                                            "mt-4 rounded-xl border border-slate-200/70 bg-white p-3",
                                                          children: [
                                                            e.jsxs("div", {
                                                              className:
                                                                "flex items-start justify-between gap-3",
                                                              children: [
                                                                e.jsxs("div", {
                                                                  children: [
                                                                    e.jsx(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "ui-kicker",
                                                                        children:
                                                                          "Cost Distribution",
                                                                      },
                                                                    ),
                                                                    e.jsxs(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "mt-1 text-sm text-slate-700",
                                                                        children:
                                                                          [
                                                                            "Method: ",
                                                                            e.jsx(
                                                                              "span",
                                                                              {
                                                                                className:
                                                                                  "font-semibold text-slate-900",
                                                                                children:
                                                                                  De,
                                                                              },
                                                                            ),
                                                                            De ===
                                                                              "fixed_rate_m3" &&
                                                                            t.fixedRatePerM3
                                                                              ? e.jsxs(
                                                                                  "span",
                                                                                  {
                                                                                    className:
                                                                                      "text-slate-600",
                                                                                    children:
                                                                                      [
                                                                                        " (rate ",
                                                                                        t.fixedRatePerM3,
                                                                                        "/m3)",
                                                                                      ],
                                                                                  },
                                                                                )
                                                                              : null,
                                                                          ],
                                                                      },
                                                                    ),
                                                                  ],
                                                                }),
                                                                je.length > 0 &&
                                                                  e.jsx(
                                                                    "span",
                                                                    {
                                                                      className:
                                                                        [
                                                                          "px-2 py-1 rounded-full text-[11px] font-semibold border",
                                                                          Math.abs(
                                                                            Ke,
                                                                          ) >
                                                                          0.05
                                                                            ? "bg-amber-50 text-amber-800 border-amber-200"
                                                                            : "bg-emerald-50 text-emerald-800 border-emerald-200",
                                                                        ].join(
                                                                          " ",
                                                                        ),
                                                                      title:
                                                                        Math.abs(
                                                                          Ke,
                                                                        ) > 0.05
                                                                          ? "Billed total differs from expected for this method."
                                                                          : "Billed total matches expected for this method.",
                                                                      children:
                                                                        Math.abs(
                                                                          Ke,
                                                                        ) > 0.05
                                                                          ? "Check mismatch"
                                                                          : "OK",
                                                                    },
                                                                  ),
                                                              ],
                                                            }),
                                                            ge &&
                                                              b &&
                                                              Math.abs(Ke) >
                                                                0.05 &&
                                                              typeof F ==
                                                                "function" &&
                                                              e.jsx("div", {
                                                                className:
                                                                  "mt-3",
                                                                children: e.jsx(
                                                                  S,
                                                                  {
                                                                    variant:
                                                                      "outline",
                                                                    size: "xs",
                                                                    onClick:
                                                                      () => {
                                                                        if (
                                                                          !window.confirm(
                                                                            "This will delete existing ShippingCost transactions for this consolidation and re-create them using the current orders/volumes. Continue?",
                                                                          )
                                                                        )
                                                                          return;
                                                                        const g =
                                                                            Math.max(
                                                                              0,
                                                                              Number(
                                                                                t.shippingCost ||
                                                                                  0,
                                                                              ),
                                                                            ),
                                                                          c =
                                                                            ye >
                                                                            0.01
                                                                              ? ye
                                                                              : g;
                                                                        F(
                                                                          t.id,
                                                                          c,
                                                                        );
                                                                      },
                                                                    title:
                                                                      "Replace existing shipping cost charges with a recalculated distribution",
                                                                    children:
                                                                      "Recalculate Distribution",
                                                                  },
                                                                ),
                                                              }),
                                                            e.jsxs("div", {
                                                              className:
                                                                "mt-3 grid grid-cols-2 gap-3",
                                                              children: [
                                                                e.jsxs("div", {
                                                                  className:
                                                                    "rounded-lg border border-slate-200/70 bg-slate-50 p-3",
                                                                  children: [
                                                                    e.jsx(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "ui-kicker",
                                                                        children:
                                                                          "Actual shipping cost",
                                                                      },
                                                                    ),
                                                                    e.jsx(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "text-sm font-semibold text-slate-900",
                                                                        children:
                                                                          typeof t.shippingCost ==
                                                                          "number"
                                                                            ? `$${t.shippingCost.toLocaleString()}`
                                                                            : "Not set",
                                                                      },
                                                                    ),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className:
                                                                    "rounded-lg border border-slate-200/70 bg-slate-50 p-3",
                                                                  children: [
                                                                    e.jsx(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "ui-kicker",
                                                                        children:
                                                                          "Billed to customers",
                                                                      },
                                                                    ),
                                                                    e.jsxs(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "text-sm font-semibold text-slate-900",
                                                                        children:
                                                                          [
                                                                            "$",
                                                                            ye.toLocaleString(
                                                                              void 0,
                                                                              {
                                                                                maximumFractionDigits: 2,
                                                                              },
                                                                            ),
                                                                          ],
                                                                      },
                                                                    ),
                                                                    Vt &&
                                                                      e.jsx(
                                                                        "div",
                                                                        {
                                                                          className:
                                                                            "mt-1 text-[11px] font-semibold text-slate-600",
                                                                          children:
                                                                            "Equal split detected",
                                                                        },
                                                                      ),
                                                                  ],
                                                                }),
                                                              ],
                                                            }),
                                                            ge
                                                              ? null
                                                              : e.jsx("div", {
                                                                  className:
                                                                    "mt-2 text-[11px] text-slate-600",
                                                                  children:
                                                                    "Expand details to see the per-customer breakdown and expected vs actual comparisons.",
                                                                }),
                                                            ge &&
                                                              je.length > 0 &&
                                                              e.jsxs("div", {
                                                                className:
                                                                  "mt-3",
                                                                children: [
                                                                  e.jsx("div", {
                                                                    className:
                                                                      "ui-kicker",
                                                                    children:
                                                                      "Per customer (billed)",
                                                                  }),
                                                                  e.jsxs(
                                                                    "div",
                                                                    {
                                                                      className:
                                                                        "mt-2 flex flex-wrap gap-2",
                                                                      children:
                                                                        [
                                                                          [
                                                                            ...U.entries(),
                                                                          ]
                                                                            .slice(
                                                                              0,
                                                                              8,
                                                                            )
                                                                            .map(
                                                                              ([
                                                                                l,
                                                                                g,
                                                                              ]) =>
                                                                                e.jsxs(
                                                                                  "span",
                                                                                  {
                                                                                    className:
                                                                                      "px-3 py-1.5 rounded-full bg-white border border-slate-200/70 text-xs font-semibold text-slate-700",
                                                                                    children:
                                                                                      [
                                                                                        Ie(
                                                                                          l,
                                                                                        ),
                                                                                        ": $",
                                                                                        g.billed.toLocaleString(
                                                                                          void 0,
                                                                                          {
                                                                                            maximumFractionDigits: 2,
                                                                                          },
                                                                                        ),
                                                                                      ],
                                                                                  },
                                                                                  l,
                                                                                ),
                                                                            ),
                                                                          U.size >
                                                                            8 &&
                                                                            e.jsxs(
                                                                              "span",
                                                                              {
                                                                                className:
                                                                                  "px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-600",
                                                                                children:
                                                                                  [
                                                                                    "+",
                                                                                    U.size -
                                                                                      8,
                                                                                    " more",
                                                                                  ],
                                                                              },
                                                                            ),
                                                                        ],
                                                                    },
                                                                  ),
                                                                  e.jsxs(
                                                                    "div",
                                                                    {
                                                                      className:
                                                                        "mt-3 rounded-lg border border-slate-200/70 bg-white p-3",
                                                                      children:
                                                                        [
                                                                          e.jsx(
                                                                            "div",
                                                                            {
                                                                              className:
                                                                                "ui-kicker",
                                                                              children:
                                                                                "Expected vs actual (by customer)",
                                                                            },
                                                                          ),
                                                                          e.jsx(
                                                                            "div",
                                                                            {
                                                                              className:
                                                                                "mt-2 space-y-2",
                                                                              children:
                                                                                (() => {
                                                                                  const l =
                                                                                    new Set();
                                                                                  for (const c of U.keys())
                                                                                    l.add(
                                                                                      c,
                                                                                    );
                                                                                  for (const c of Ze.keys())
                                                                                    l.add(
                                                                                      c,
                                                                                    );
                                                                                  for (const c of xt.keys())
                                                                                    l.add(
                                                                                      c,
                                                                                    );
                                                                                  return [
                                                                                    ...l,
                                                                                  ]
                                                                                    .map(
                                                                                      (
                                                                                        c,
                                                                                      ) => {
                                                                                        var we;
                                                                                        const re =
                                                                                            ((we =
                                                                                              U.get(
                                                                                                c,
                                                                                              )) ==
                                                                                            null
                                                                                              ? void 0
                                                                                              : we.billed) ||
                                                                                            0,
                                                                                          ue =
                                                                                            Number(
                                                                                              Ze.get(
                                                                                                c,
                                                                                              ) ||
                                                                                                0,
                                                                                            ),
                                                                                          te =
                                                                                            Number(
                                                                                              xt.get(
                                                                                                c,
                                                                                              ) ||
                                                                                                0,
                                                                                            );
                                                                                        return {
                                                                                          cid: c,
                                                                                          vol: te,
                                                                                          expected:
                                                                                            ue,
                                                                                          actual:
                                                                                            re,
                                                                                          delta:
                                                                                            re -
                                                                                            ue,
                                                                                        };
                                                                                      },
                                                                                    )
                                                                                    .sort(
                                                                                      (
                                                                                        c,
                                                                                        re,
                                                                                      ) =>
                                                                                        re.actual -
                                                                                        c.actual,
                                                                                    )
                                                                                    .slice(
                                                                                      0,
                                                                                      12,
                                                                                    )
                                                                                    .map(
                                                                                      (
                                                                                        c,
                                                                                      ) =>
                                                                                        e.jsxs(
                                                                                          "div",
                                                                                          {
                                                                                            className:
                                                                                              "flex items-center justify-between gap-3 text-xs",
                                                                                            children:
                                                                                              [
                                                                                                e.jsxs(
                                                                                                  "div",
                                                                                                  {
                                                                                                    className:
                                                                                                      "min-w-0",
                                                                                                    children:
                                                                                                      [
                                                                                                        e.jsx(
                                                                                                          "div",
                                                                                                          {
                                                                                                            className:
                                                                                                              "font-semibold text-slate-900 truncate",
                                                                                                            children:
                                                                                                              Ie(
                                                                                                                c.cid,
                                                                                                              ),
                                                                                                          },
                                                                                                        ),
                                                                                                        e.jsxs(
                                                                                                          "div",
                                                                                                          {
                                                                                                            className:
                                                                                                              "text-[11px] text-slate-600",
                                                                                                            children:
                                                                                                              [
                                                                                                                "Volume: ",
                                                                                                                c.vol.toFixed(
                                                                                                                  2,
                                                                                                                ),
                                                                                                                " m3",
                                                                                                              ],
                                                                                                          },
                                                                                                        ),
                                                                                                      ],
                                                                                                  },
                                                                                                ),
                                                                                                e.jsxs(
                                                                                                  "div",
                                                                                                  {
                                                                                                    className:
                                                                                                      "shrink-0 text-right",
                                                                                                    children:
                                                                                                      [
                                                                                                        e.jsxs(
                                                                                                          "div",
                                                                                                          {
                                                                                                            className:
                                                                                                              "font-semibold text-slate-900",
                                                                                                            children:
                                                                                                              [
                                                                                                                "Actual $",
                                                                                                                c.actual.toLocaleString(
                                                                                                                  void 0,
                                                                                                                  {
                                                                                                                    maximumFractionDigits: 2,
                                                                                                                  },
                                                                                                                ),
                                                                                                              ],
                                                                                                          },
                                                                                                        ),
                                                                                                        e.jsxs(
                                                                                                          "div",
                                                                                                          {
                                                                                                            className:
                                                                                                              "text-[11px] text-slate-600",
                                                                                                            children:
                                                                                                              [
                                                                                                                "Expected $",
                                                                                                                c.expected.toLocaleString(
                                                                                                                  void 0,
                                                                                                                  {
                                                                                                                    maximumFractionDigits: 2,
                                                                                                                  },
                                                                                                                ),
                                                                                                                " ",
                                                                                                                e.jsxs(
                                                                                                                  "span",
                                                                                                                  {
                                                                                                                    className:
                                                                                                                      Math.abs(
                                                                                                                        c.delta,
                                                                                                                      ) >
                                                                                                                      0.05
                                                                                                                        ? "text-amber-700 font-semibold"
                                                                                                                        : "text-emerald-700 font-semibold",
                                                                                                                    children:
                                                                                                                      [
                                                                                                                        "(",
                                                                                                                        c.delta >=
                                                                                                                        0
                                                                                                                          ? "+"
                                                                                                                          : "",
                                                                                                                        c.delta.toLocaleString(
                                                                                                                          void 0,
                                                                                                                          {
                                                                                                                            maximumFractionDigits: 2,
                                                                                                                          },
                                                                                                                        ),
                                                                                                                        ")",
                                                                                                                      ],
                                                                                                                  },
                                                                                                                ),
                                                                                                              ],
                                                                                                          },
                                                                                                        ),
                                                                                                      ],
                                                                                                  },
                                                                                                ),
                                                                                              ],
                                                                                          },
                                                                                          c.cid,
                                                                                        ),
                                                                                    );
                                                                                })(),
                                                                            },
                                                                          ),
                                                                          e.jsx(
                                                                            "div",
                                                                            {
                                                                              className:
                                                                                "mt-2 text-[11px] text-slate-600",
                                                                              children:
                                                                                "If expected differs from actual, either distribution was done with different order volumes at the time, or there is a distribution bug.",
                                                                            },
                                                                          ),
                                                                        ],
                                                                    },
                                                                  ),
                                                                  De ===
                                                                    "fixed_rate_m3" &&
                                                                    typeof t.shippingCost ==
                                                                      "number" &&
                                                                    e.jsx(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "mt-2 text-[11px] text-slate-600",
                                                                        children:
                                                                          "Fixed-rate billing can differ from the actual shipping cost. Expected billed total is based on m3 volume times the fixed rate.",
                                                                      },
                                                                    ),
                                                                ],
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
                                                                className:
                                                                  "ui-kicker",
                                                                children:
                                                                  "Route",
                                                              }),
                                                              e.jsx("div", {
                                                                className:
                                                                  "font-semibold text-slate-900 truncate",
                                                                title: t.route,
                                                                children:
                                                                  t.route,
                                                              }),
                                                            ],
                                                          }),
                                                          e.jsxs("div", {
                                                            className:
                                                              "rounded-xl border border-slate-200/70 bg-slate-50 p-3",
                                                            children: [
                                                              e.jsx("div", {
                                                                className:
                                                                  "ui-kicker",
                                                                children:
                                                                  "Departure",
                                                              }),
                                                              e.jsx("div", {
                                                                className:
                                                                  "font-semibold text-slate-900",
                                                                children:
                                                                  t.departureDate,
                                                              }),
                                                            ],
                                                          }),
                                                          e.jsxs("div", {
                                                            className:
                                                              "rounded-xl border border-slate-200/70 bg-slate-50 p-3",
                                                            children: [
                                                              e.jsx("div", {
                                                                className:
                                                                  "ui-kicker",
                                                                children:
                                                                  "Container",
                                                              }),
                                                              e.jsx("div", {
                                                                className:
                                                                  "font-semibold text-slate-900 truncate",
                                                                title: V,
                                                                children: V,
                                                              }),
                                                            ],
                                                          }),
                                                          e.jsxs("div", {
                                                            className:
                                                              "rounded-xl border border-slate-200/70 bg-slate-50 p-3",
                                                            children: [
                                                              e.jsx("div", {
                                                                className:
                                                                  "ui-kicker",
                                                                children:
                                                                  "Customer",
                                                              }),
                                                              e.jsx("div", {
                                                                className:
                                                                  "font-semibold text-slate-900 truncate",
                                                                title: J,
                                                                children: J,
                                                              }),
                                                            ],
                                                          }),
                                                        ],
                                                      }),
                                                      e.jsxs("div", {
                                                        className:
                                                          "mt-4 grid grid-cols-2 gap-3",
                                                        children: [
                                                          e.jsxs("div", {
                                                            className:
                                                              "rounded-xl border border-slate-200/70 bg-white p-3",
                                                            children: [
                                                              e.jsx("div", {
                                                                className:
                                                                  "ui-kicker",
                                                                children:
                                                                  "Volume filled",
                                                              }),
                                                              e.jsxs("div", {
                                                                className:
                                                                  "mt-1 flex items-center gap-2",
                                                                children: [
                                                                  e.jsx("div", {
                                                                    className:
                                                                      "h-2 flex-1 rounded-full bg-slate-100 overflow-hidden",
                                                                    children:
                                                                      e.jsx(
                                                                        "div",
                                                                        {
                                                                          className: `h-full ${Me(L)}`,
                                                                          style:
                                                                            {
                                                                              width: `${Math.min(100, Math.max(0, L))}%`,
                                                                            },
                                                                        },
                                                                      ),
                                                                  }),
                                                                  e.jsxs(
                                                                    "div",
                                                                    {
                                                                      className: `text-sm font-semibold ${at(L)}`,
                                                                      children:
                                                                        [
                                                                          L,
                                                                          "%",
                                                                        ],
                                                                    },
                                                                  ),
                                                                ],
                                                              }),
                                                            ],
                                                          }),
                                                          e.jsxs("div", {
                                                            className:
                                                              "rounded-xl border border-slate-200/70 bg-white p-3",
                                                            children: [
                                                              e.jsx("div", {
                                                                className:
                                                                  "ui-kicker",
                                                                children:
                                                                  "Weight filled",
                                                              }),
                                                              e.jsxs("div", {
                                                                className:
                                                                  "mt-1 flex items-center gap-2",
                                                                children: [
                                                                  e.jsx("div", {
                                                                    className:
                                                                      "h-2 flex-1 rounded-full bg-slate-100 overflow-hidden",
                                                                    children:
                                                                      e.jsx(
                                                                        "div",
                                                                        {
                                                                          className: `h-full ${Me(w)}`,
                                                                          style:
                                                                            {
                                                                              width: `${Math.min(100, Math.max(0, w))}%`,
                                                                            },
                                                                        },
                                                                      ),
                                                                  }),
                                                                  e.jsxs(
                                                                    "div",
                                                                    {
                                                                      className: `text-sm font-semibold ${at(w)}`,
                                                                      children:
                                                                        [
                                                                          w,
                                                                          "%",
                                                                        ],
                                                                    },
                                                                  ),
                                                                ],
                                                              }),
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
                                                            children: "Orders",
                                                          }),
                                                          e.jsxs("div", {
                                                            className:
                                                              "text-sm text-slate-700",
                                                            children: [
                                                              a.length,
                                                              " order(s) included",
                                                            ],
                                                          }),
                                                          ge &&
                                                            a.length > 0 &&
                                                            e.jsxs("div", {
                                                              className:
                                                                "mt-3 flex flex-wrap gap-2",
                                                              children: [
                                                                a
                                                                  .slice(0, 8)
                                                                  .map((l) =>
                                                                    e.jsx(
                                                                      S,
                                                                      {
                                                                        type: "button",
                                                                        variant:
                                                                          "secondary",
                                                                        size: "sm",
                                                                        className:
                                                                          "h-8 px-3 rounded-full",
                                                                        onClick:
                                                                          () =>
                                                                            d(
                                                                              "orders",
                                                                              l.id,
                                                                            ),
                                                                        title:
                                                                          l.description,
                                                                        children:
                                                                          he(
                                                                            l.id,
                                                                            "order",
                                                                          ),
                                                                      },
                                                                      l.id,
                                                                    ),
                                                                  ),
                                                                a.length > 8 &&
                                                                  e.jsxs(
                                                                    "span",
                                                                    {
                                                                      className:
                                                                        "px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-50 border border-slate-200/70 text-slate-600",
                                                                      children:
                                                                        [
                                                                          "+",
                                                                          a.length -
                                                                            8,
                                                                          " more",
                                                                        ],
                                                                    },
                                                                  ),
                                                              ],
                                                            }),
                                                          ge
                                                            ? null
                                                            : e.jsx("div", {
                                                                className:
                                                                  "mt-2 text-[11px] text-slate-600",
                                                                children:
                                                                  "Expand details to view order chips, activity, related links, and audit trail.",
                                                              }),
                                                        ],
                                                      }),
                                                      ge
                                                        ? e.jsxs(e.Fragment, {
                                                            children: [
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
                                                                    className:
                                                                      "mt-2",
                                                                    children:
                                                                      e.jsx(
                                                                        Xt,
                                                                        {
                                                                          items:
                                                                            _t.slice(
                                                                              0,
                                                                              12,
                                                                            ),
                                                                          emptyText:
                                                                            "No activity for this consolidation yet.",
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
                                                                    children:
                                                                      "Related",
                                                                  }),
                                                                  e.jsx("div", {
                                                                    className:
                                                                      "mt-2",
                                                                    children:
                                                                      e.jsx(
                                                                        ss,
                                                                        {
                                                                          orders:
                                                                            ze.orders,
                                                                          consolidations:
                                                                            ze.consolidations,
                                                                          shipments:
                                                                            ze.shipments,
                                                                          ledger:
                                                                            ze.ledger,
                                                                        },
                                                                      ),
                                                                  }),
                                                                ],
                                                              }),
                                                              e.jsx(ts, {
                                                                entityType:
                                                                  "consolidation",
                                                                entityId: t.id,
                                                                className:
                                                                  "mt-4",
                                                              }),
                                                            ],
                                                          })
                                                        : null,
                                                      b &&
                                                        e.jsxs("div", {
                                                          className:
                                                            "mt-4 flex flex-wrap gap-2",
                                                          children: [
                                                            Xe &&
                                                              e.jsx(S, {
                                                                variant:
                                                                  "outline",
                                                                size: "xs",
                                                                onClick: () =>
                                                                  bt(t.id),
                                                                children:
                                                                  "Manage Orders",
                                                              }),
                                                            e.jsx(S, {
                                                              variant:
                                                                "outline",
                                                              size: "xs",
                                                              onClick: () =>
                                                                Ct(t),
                                                              disabled: lt(
                                                                t.id,
                                                              ),
                                                              title: lt(t.id)
                                                                ? "Cannot update status: consolidation has an associated shipment"
                                                                : "Update Status",
                                                              children:
                                                                "Update Status",
                                                            }),
                                                            xe &&
                                                              e.jsx(S, {
                                                                variant:
                                                                  "secondary",
                                                                size: "xs",
                                                                onClick: () =>
                                                                  vt(t),
                                                                children:
                                                                  "Edit",
                                                              }),
                                                          ],
                                                        }),
                                                    ],
                                                  });
                                                })(),
                                              })
                                            : e.jsx("div", {
                                                className:
                                                  "p-8 text-center text-slate-600",
                                                children:
                                                  "Select a consolidation to view details.",
                                              }),
                                        }),
                                      }),
                                    ],
                                  }),
                                  e.jsx("div", {
                                    className:
                                      "lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4",
                                    children: Te.map((t) => {
                                      const a = Le(t),
                                        n = Ve(t),
                                        p = Be(t.id),
                                        o = Math.round(
                                          t.containerSpaceFilledPercentage ?? 0,
                                        ),
                                        V = Math.round(
                                          t.containerWeightFilledPercentage ??
                                            0,
                                        );
                                      return e.jsxs(
                                        "button",
                                        {
                                          type: "button",
                                          onClick: () => {
                                            (mt(t), Ae(!0));
                                          },
                                          className:
                                            "text-left rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm hover:shadow-md transition-shadow",
                                          children: [
                                            e.jsxs("div", {
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
                                                          className: `px-2 py-0.5 text-[11px] font-semibold rounded-full ${tt[t.status]}`,
                                                          children: t.status,
                                                        }),
                                                        e.jsx("span", {
                                                          className: `px-2 py-0.5 text-[11px] font-semibold rounded-full ${n ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-800"}`,
                                                          children: n
                                                            ? "Mixed"
                                                            : "Regular",
                                                        }),
                                                        p
                                                          ? e.jsx("span", {
                                                              className:
                                                                "px-2 py-0.5 text-[11px] font-semibold rounded-full bg-blue-50 text-blue-700",
                                                              children:
                                                                "Has shipment",
                                                            })
                                                          : e.jsx("span", {
                                                              className:
                                                                "px-2 py-0.5 text-[11px] font-semibold rounded-full bg-slate-100 text-slate-700",
                                                              children:
                                                                "No shipment",
                                                            }),
                                                      ],
                                                    }),
                                                    e.jsx("div", {
                                                      className:
                                                        "font-semibold text-slate-900 truncate",
                                                      children: t.name,
                                                    }),
                                                    e.jsxs("div", {
                                                      className:
                                                        "mt-1 text-xs text-slate-600 flex flex-wrap gap-x-3 gap-y-1",
                                                      children: [
                                                        e.jsx("span", {
                                                          children: t.route,
                                                        }),
                                                        e.jsx("span", {
                                                          children:
                                                            t.departureDate,
                                                        }),
                                                        e.jsxs("span", {
                                                          children: [
                                                            a.length,
                                                            " orders",
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                                e.jsx("div", {
                                                  className: "shrink-0 pt-1",
                                                  children: e.jsx("svg", {
                                                    className:
                                                      "w-5 h-5 text-slate-300",
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
                                            e.jsxs("div", {
                                              className:
                                                "mt-3 grid grid-cols-2 gap-2",
                                              children: [
                                                e.jsxs("div", {
                                                  className:
                                                    "rounded-xl border border-slate-200/70 bg-slate-50 p-2",
                                                  children: [
                                                    e.jsx("div", {
                                                      className: "ui-kicker",
                                                      children: "Volume",
                                                    }),
                                                    e.jsxs("div", {
                                                      className:
                                                        "text-sm font-extrabold text-slate-900",
                                                      children: [o, "%"],
                                                    }),
                                                  ],
                                                }),
                                                e.jsxs("div", {
                                                  className:
                                                    "rounded-xl border border-slate-200/70 bg-slate-50 p-2",
                                                  children: [
                                                    e.jsx("div", {
                                                      className: "ui-kicker",
                                                      children: "Weight",
                                                    }),
                                                    e.jsxs("div", {
                                                      className:
                                                        "text-sm font-extrabold text-slate-900",
                                                      children: [V, "%"],
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
                                  _e > 1 &&
                                    e.jsxs("div", {
                                      className:
                                        "flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 rounded-b-2xl",
                                      children: [
                                        e.jsx("div", {
                                          className:
                                            "flex items-center text-sm text-gray-700",
                                          children: e.jsxs("span", {
                                            children: [
                                              "Showing ",
                                              (z - 1) * u + 1,
                                              " to ",
                                              Math.min(z * u, ne.length),
                                              " of ",
                                              ne.length,
                                              " consolidations",
                                            ],
                                          }),
                                        }),
                                        e.jsxs("div", {
                                          className:
                                            "flex items-center space-x-2",
                                          children: [
                                            e.jsx(S, {
                                              variant: "outline",
                                              size: "sm",
                                              onClick: () =>
                                                i((t) => Math.max(t - 1, 1)),
                                              disabled: z === 1,
                                              children: "Previous",
                                            }),
                                            e.jsx("div", {
                                              className: "flex space-x-1",
                                              children: Array.from(
                                                { length: _e },
                                                (t, a) => a + 1,
                                              ).map((t) =>
                                                e.jsx(
                                                  S,
                                                  {
                                                    onClick: () => i(t),
                                                    variant:
                                                      z === t
                                                        ? "default"
                                                        : "outline",
                                                    size: "sm",
                                                    children: t,
                                                  },
                                                  t,
                                                ),
                                              ),
                                            }),
                                            e.jsx(S, {
                                              variant: "outline",
                                              size: "sm",
                                              onClick: () =>
                                                i((t) => Math.min(t + 1, _e)),
                                              disabled: z === _e,
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
            h &&
              oe &&
              b &&
              e.jsx(rs, {
                consolidation: h,
                isOpen: oe,
                onClose: jt,
                onSave: Nt,
                allCustomers: T,
              }),
            be &&
              ae &&
              e.jsx(ls, {
                consolidation: be,
                isOpen: ae,
                onClose: () => {
                  (le(!1), de(null));
                },
                onSave: yt,
              }),
            H &&
              m &&
              e.jsx("div", {
                className:
                  "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
                children: e.jsxs("div", {
                  className: "bg-white rounded-lg p-6 max-w-md w-full mx-4",
                  children: [
                    e.jsx("h3", {
                      className: "text-lg font-semibold text-gray-900 mb-4",
                      children: "Update Consolidation Status",
                    }),
                    e.jsx("p", {
                      className: "text-sm text-gray-600 mb-2",
                      children: e.jsx("span", {
                        className: "font-medium",
                        children: H.name,
                      }),
                    }),
                    e.jsxs("p", {
                      className: "text-sm text-gray-600 mb-4",
                      children: [
                        "Current status: ",
                        e.jsx("span", {
                          className: "font-medium",
                          children: H.status,
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "space-y-2",
                      children: [
                        zt(H.status).map((t) =>
                          e.jsxs(
                            S,
                            {
                              onClick: () => kt(t),
                              variant: "outline",
                              className: "w-full justify-start",
                              children: ["Move to: ", t],
                            },
                            t,
                          ),
                        ),
                        e.jsx(S, {
                          onClick: () => R(!1),
                          variant: "secondary",
                          className: "w-full",
                          children: "Cancel",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            Q &&
              e.jsx(ns, {
                consolidation: Q,
                ordersIn: Dt,
                availableOrders: It,
                canEditOrders: Lt,
                onClose: qe,
                onAddOrder: Ft,
                onRemoveOrder: Tt,
                getCustomerName: Ie,
              }),
            Qe &&
              Ot &&
              e.jsx("div", {
                className:
                  "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40",
                onClick: () => Ae(!1),
                children: e.jsxs("div", {
                  className:
                    "bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative",
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    e.jsxs("div", {
                      className:
                        "flex justify-between items-center mb-4 pb-4 border-b border-gray-200",
                      children: [
                        e.jsxs("h2", {
                          className: "text-xl font-bold text-gray-900",
                          children: ["Consolidation Details: ", Qe.name],
                        }),
                        e.jsx("button", {
                          className:
                            "text-gray-400 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors",
                          onClick: () => Ae(!1),
                          title: "Close",
                          children: e.jsx("svg", {
                            className: "w-6 h-6",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            viewBox: "0 0 24 24",
                            children: e.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              d: "M6 18L18 6M6 6l12 12",
                            }),
                          }),
                        }),
                      ],
                    }),
                    (function () {
                      var je;
                      const t = Qe,
                        a = Le(t),
                        n = Ve(t),
                        p = dt(t),
                        o = it(t.containerTypeId),
                        V = n ? rt(p) : Ie(t.customerId),
                        J = Math.round(t.containerSpaceFilledPercentage ?? 0),
                        L = Math.round(t.containerWeightFilledPercentage ?? 0),
                        w = a.reduce((U, ye) => U + ye.volumeM3, 0).toFixed(2),
                        xe = a.reduce((U, ye) => U + ye.weightKG, 0).toFixed(0),
                        Xe =
                          t.status === f.Completed
                            ? "completed"
                            : t.status === f.Cancelled
                              ? "cancelled"
                              : "active",
                        fe = {
                          active: { iconWrap: "bg-blue-50" },
                          completed: { iconWrap: "bg-emerald-50" },
                          cancelled: { iconWrap: "bg-red-50" },
                        }[Xe],
                        $e = n
                          ? {
                              pill: "bg-purple-100 text-purple-700",
                              label: "Mixed",
                            }
                          : {
                              pill: "bg-emerald-100 text-emerald-800",
                              label: "Regular",
                            };
                      return e.jsxs("div", {
                        children: [
                          e.jsxs("div", {
                            className: "flex items-center gap-3 mb-2",
                            children: [
                              e.jsx("span", {
                                className: `inline-flex items-center justify-center rounded-full ${fe.iconWrap} p-2 shadow-sm`,
                                children:
                                  t.status === f.Completed
                                    ? e.jsx("svg", {
                                        className: "w-5 h-5 text-emerald-600",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        viewBox: "0 0 24 24",
                                        children: e.jsx("path", {
                                          strokeLinecap: "round",
                                          strokeLinejoin: "round",
                                          d: "M5 13l4 4L19 7",
                                        }),
                                      })
                                    : t.status === f.Cancelled
                                      ? e.jsx("svg", {
                                          className: "w-5 h-5 text-red-600",
                                          fill: "none",
                                          stroke: "currentColor",
                                          strokeWidth: "2",
                                          viewBox: "0 0 24 24",
                                          children: e.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "M6 18L18 6M6 6l12 12",
                                          }),
                                        })
                                      : e.jsxs("svg", {
                                          className: "w-5 h-5 text-blue-600",
                                          fill: "none",
                                          stroke: "currentColor",
                                          strokeWidth: "2",
                                          viewBox: "0 0 24 24",
                                          children: [
                                            e.jsx("circle", {
                                              cx: "12",
                                              cy: "12",
                                              r: "10",
                                            }),
                                            e.jsx("path", {
                                              strokeLinecap: "round",
                                              strokeLinejoin: "round",
                                              d: "M12 6v6l4 2",
                                            }),
                                          ],
                                        }),
                              }),
                              e.jsx("span", {
                                className:
                                  "truncate font-extrabold text-lg text-gray-900",
                                title: t.name,
                                children: t.name,
                              }),
                              e.jsxs("span", {
                                className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${$e.pill} font-semibold text-xs ml-1`,
                                children: [
                                  n
                                    ? e.jsxs("svg", {
                                        className: "w-5 h-5 text-purple-600",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        viewBox: "0 0 24 24",
                                        children: [
                                          e.jsx("circle", {
                                            cx: "12",
                                            cy: "12",
                                            r: "10",
                                          }),
                                          e.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "M8 12h8M12 8v8",
                                          }),
                                        ],
                                      })
                                    : e.jsxs("svg", {
                                        className: "w-5 h-5 text-emerald-700",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        viewBox: "0 0 24 24",
                                        children: [
                                          e.jsx("circle", {
                                            cx: "12",
                                            cy: "12",
                                            r: "10",
                                          }),
                                          e.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "M12 8v8",
                                          }),
                                        ],
                                      }),
                                  $e.label,
                                ],
                              }),
                              n &&
                                t.costDistributionMethod ===
                                  "volume_proportional" &&
                                e.jsx("span", {
                                  className:
                                    "text-xs px-2 py-0.5 rounded-full ml-1 bg-blue-100 text-blue-700 font-semibold",
                                  children: "Volume Proportional",
                                }),
                              n &&
                                t.costDistributionMethod === "fixed_rate_m3" &&
                                e.jsx("span", {
                                  className:
                                    "text-xs px-2 py-0.5 rounded-full ml-1 bg-orange-100 text-orange-700 font-semibold",
                                  children: "Fixed Rate/m3",
                                }),
                            ],
                          }),
                          e.jsxs("div", {
                            className:
                              "flex flex-wrap gap-2 text-xs text-gray-500 mb-2",
                            children: [
                              e.jsxs("span", {
                                className: "flex items-center gap-1",
                                children: [
                                  e.jsxs("svg", {
                                    className: "w-4 h-4 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    viewBox: "0 0 24 24",
                                    children: [
                                      e.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2",
                                      }),
                                      e.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M12 12v.01",
                                      }),
                                    ],
                                  }),
                                  " ",
                                  o,
                                ],
                              }),
                              e.jsxs("span", {
                                className: "flex items-center gap-1",
                                children: [
                                  e.jsx("svg", {
                                    className: "w-4 h-4 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      d: "M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6",
                                    }),
                                  }),
                                  " ",
                                  t.route,
                                ],
                              }),
                              e.jsxs("span", {
                                className: "flex items-center gap-1",
                                children: [
                                  e.jsx("svg", {
                                    className: "w-4 h-4 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      d: "M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z",
                                    }),
                                  }),
                                  " ",
                                  t.departureDate,
                                ],
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className:
                              "flex flex-wrap gap-2 text-xs text-gray-500 mb-2",
                            children: [
                              e.jsxs("span", {
                                className: "flex items-center gap-1",
                                children: [
                                  e.jsx("svg", {
                                    className: "w-4 h-4 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      d: "M5 13l4 4L19 7",
                                    }),
                                  }),
                                  " ",
                                  V,
                                ],
                              }),
                              e.jsxs("span", {
                                className: "flex items-center gap-1",
                                children: [
                                  e.jsxs("svg", {
                                    className: "w-4 h-4 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    viewBox: "0 0 24 24",
                                    children: [
                                      e.jsx("circle", {
                                        cx: "12",
                                        cy: "12",
                                        r: "10",
                                      }),
                                      e.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M12 8v8",
                                      }),
                                    ],
                                  }),
                                  " ",
                                  a.length,
                                  " order",
                                  a.length !== 1 ? "s" : "",
                                ],
                              }),
                              e.jsxs("span", {
                                className: "flex items-center gap-1",
                                children: [
                                  e.jsxs("svg", {
                                    className: "w-4 h-4 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    viewBox: "0 0 24 24",
                                    children: [
                                      e.jsx("rect", {
                                        x: "3",
                                        y: "3",
                                        width: "18",
                                        height: "18",
                                        rx: "2",
                                      }),
                                      e.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M3 9h18M9 21V9",
                                      }),
                                    ],
                                  }),
                                  " ",
                                  w,
                                  " m3",
                                ],
                              }),
                              e.jsxs("span", {
                                className: "flex items-center gap-1",
                                children: [
                                  e.jsxs("svg", {
                                    className: "w-4 h-4 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    viewBox: "0 0 24 24",
                                    children: [
                                      e.jsx("rect", {
                                        x: "3",
                                        y: "3",
                                        width: "18",
                                        height: "18",
                                        rx: "2",
                                      }),
                                      e.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M3 15h18M15 21V15",
                                      }),
                                    ],
                                  }),
                                  " ",
                                  xe,
                                  " kg",
                                ],
                              }),
                              e.jsxs("span", {
                                className: "flex items-center gap-1",
                                children: [
                                  e.jsx("svg", {
                                    className: "w-4 h-4 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      d: "M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z",
                                    }),
                                  }),
                                  " $",
                                  ((je = t.shippingCost) == null
                                    ? void 0
                                    : je.toLocaleString()) || "-",
                                ],
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className: "flex items-center gap-4 mb-2",
                            children: [
                              e.jsxs("div", {
                                className: "flex-1",
                                children: [
                                  e.jsxs("div", {
                                    className: "flex justify-between mb-1",
                                    children: [
                                      e.jsxs("span", {
                                        className:
                                          "text-[11px] text-gray-600 flex items-center gap-1",
                                        children: [
                                          e.jsx("svg", {
                                            className: "w-3 h-3 text-blue-400",
                                            fill: "currentColor",
                                            viewBox: "0 0 20 20",
                                            children: e.jsx("circle", {
                                              cx: "10",
                                              cy: "10",
                                              r: "10",
                                            }),
                                          }),
                                          "Volume",
                                        ],
                                      }),
                                      e.jsxs("span", {
                                        className: "text-[11px] text-gray-600",
                                        children: [J, "%"],
                                      }),
                                    ],
                                  }),
                                  e.jsx("div", {
                                    className:
                                      "w-full bg-gray-200 rounded h-3 overflow-hidden",
                                    children: e.jsx("div", {
                                      className: `${Me(J)} h-3 rounded transition-all duration-500`,
                                      style: {
                                        width: `${Math.min(100, Math.max(0, J))}%`,
                                      },
                                      title: `Volume filled: ${J}%`,
                                    }),
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className: "flex-1",
                                children: [
                                  e.jsxs("div", {
                                    className: "flex justify-between mb-1",
                                    children: [
                                      e.jsxs("span", {
                                        className:
                                          "text-[11px] text-gray-600 flex items-center gap-1",
                                        children: [
                                          e.jsx("svg", {
                                            className:
                                              "w-3 h-3 text-emerald-400",
                                            fill: "currentColor",
                                            viewBox: "0 0 20 20",
                                            children: e.jsx("circle", {
                                              cx: "10",
                                              cy: "10",
                                              r: "10",
                                            }),
                                          }),
                                          "Weight",
                                        ],
                                      }),
                                      e.jsxs("span", {
                                        className: "text-[11px] text-gray-600",
                                        children: [L, "%"],
                                      }),
                                    ],
                                  }),
                                  e.jsx("div", {
                                    className:
                                      "w-full bg-gray-200 rounded h-3 overflow-hidden",
                                    children: e.jsx("div", {
                                      className: `${Me(L)} h-3 rounded transition-all duration-500`,
                                      style: {
                                        width: `${Math.min(100, Math.max(0, L))}%`,
                                      },
                                      title: `Weight filled: ${L}%`,
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          t.notes &&
                            e.jsxs("div", {
                              className:
                                "mb-3 p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg",
                              children: [
                                e.jsxs("div", {
                                  className:
                                    "text-xs font-semibold text-yellow-800 mb-1 flex items-center gap-1",
                                  children: [
                                    e.jsx("svg", {
                                      className: "w-4 h-4 text-yellow-500",
                                      fill: "none",
                                      stroke: "currentColor",
                                      strokeWidth: "2",
                                      viewBox: "0 0 24 24",
                                      children: e.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z",
                                      }),
                                    }),
                                    "Admin Notes:",
                                  ],
                                }),
                                e.jsx("div", {
                                  className: "text-sm text-yellow-900",
                                  children: t.notes,
                                }),
                              ],
                            }),
                          a.length > 0 &&
                            e.jsxs("details", {
                              className: "mt-2 group",
                              tabIndex: -1,
                              open: !0,
                              children: [
                                e.jsx("summary", {
                                  className:
                                    "cursor-pointer text-xs text-gray-700 font-semibold select-none focus:outline-none focus:underline",
                                  children: "Orders in this Consolidation",
                                }),
                                e.jsx("ul", {
                                  className:
                                    "divide-y divide-gray-100 bg-gray-50 rounded-lg mt-2",
                                  children: a.map((U) =>
                                    e.jsxs(
                                      "li",
                                      {
                                        className:
                                          "py-2 px-3 flex flex-wrap justify-between items-center",
                                        children: [
                                          e.jsxs("div", {
                                            children: [
                                              e.jsx("span", {
                                                className:
                                                  "font-medium text-gray-900",
                                                children: U.description,
                                              }),
                                              e.jsx("span", {
                                                className:
                                                  "ml-2 text-xs text-blue-600 font-medium",
                                                children: he(U.id, "order"),
                                              }),
                                              e.jsx("span", {
                                                className:
                                                  "ml-2 text-xs text-gray-400 italic",
                                                children: Ie(U.customerId),
                                              }),
                                            ],
                                          }),
                                          e.jsxs("div", {
                                            className: "text-xs text-gray-600",
                                            children: [
                                              U.volumeM3,
                                              " m3, ",
                                              U.weightKG,
                                              " kg",
                                            ],
                                          }),
                                        ],
                                      },
                                      U.id,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                        ],
                      });
                    })(),
                  ],
                }),
              }),
          ],
        }),
      }),
    });
  };
export { ys as ConsolidationsPage };
