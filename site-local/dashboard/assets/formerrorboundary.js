import { j as e, r as m } from "./radix.js";
import { c as n } from "./app.js";
const u = ({
    isOpen: t,
    onClose: s,
    title: r,
    subtitle: a,
    icon: l,
    children: o,
    maxWidth: i = "lg",
    gradientFrom: c = "from-blue-50",
    gradientTo: d = "to-indigo-50",
  }) => {
    if (!t) return null;
    const x = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
      "2xl": "max-w-6xl",
    };
    return e.jsx("div", {
      className:
        "fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4",
      children: e.jsxs("div", {
        className: `bg-white rounded-3xl shadow-2xl w-full ${x[i]} max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col border border-slate-200/70`,
        children: [
          e.jsx("div", {
            className: `px-6 py-5 border-b border-slate-200/70 bg-gradient-to-r ${c} ${d} flex-shrink-0`,
            children: e.jsxs("div", {
              className: "flex items-center justify-between",
              children: [
                e.jsxs("div", {
                  className: "flex items-center space-x-4",
                  children: [
                    l &&
                      e.jsx("div", {
                        className:
                          "p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60",
                        children: l,
                      }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("h2", {
                          className:
                            "text-xl sm:text-2xl font-semibold tracking-tight text-slate-900",
                          children: r,
                        }),
                        a &&
                          e.jsx("p", {
                            className: "text-sm text-slate-600 mt-1 max-w-2xl",
                            children: a,
                          }),
                      ],
                    }),
                  ],
                }),
                e.jsx(n, {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  onClick: s,
                  className:
                    "text-slate-500 hover:text-slate-900 hover:bg-white/70",
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
          e.jsx("div", {
            className: "overflow-y-auto flex-1 min-h-0 ui-form-skin",
            children: o,
          }),
        ],
      }),
    });
  },
  f = ({ title: t, description: s, children: r, className: a = "" }) =>
    e.jsxs("div", {
      className: `p-6 ${a}`,
      children: [
        (t || s) &&
          e.jsxs("div", {
            className: "mb-6 pb-3 border-b border-slate-100",
            children: [
              t &&
                e.jsx("h3", {
                  className:
                    "text-lg font-semibold tracking-tight text-slate-900 mb-1",
                  children: t,
                }),
              s &&
                e.jsx("p", {
                  className: "text-sm text-slate-600",
                  children: s,
                }),
            ],
          }),
        r,
      ],
    }),
  b = ({
    label: t,
    required: s = !1,
    error: r,
    help: a,
    children: l,
    className: o = "",
  }) =>
    e.jsxs("div", {
      className: `space-y-2.5 ${o}`,
      children: [
        e.jsxs("label", {
          className:
            "block text-sm font-semibold tracking-tight text-slate-700",
          children: [
            t,
            s &&
              e.jsx("span", { className: "text-rose-500 ml-1", children: "*" }),
          ],
        }),
        l,
        r &&
          e.jsxs("p", {
            className: "text-xs text-rose-600 flex items-center font-medium",
            children: [
              e.jsx("svg", {
                className: "w-3 h-3 mr-1",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: e.jsx("path", {
                  fillRule: "evenodd",
                  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
                  clipRule: "evenodd",
                }),
              }),
              r,
            ],
          }),
        a &&
          !r &&
          e.jsx("p", {
            className: "text-xs text-slate-500 leading-relaxed",
            children: a,
          }),
      ],
    }),
  j = ({ children: t, className: s = "" }) =>
    e.jsx("div", {
      className: `px-6 py-5 sm:py-4 bg-gradient-to-r from-slate-50 to-white border-t border-slate-200/70 flex flex-col sm:flex-row justify-end gap-4 sm:gap-3 flex-shrink-0 ${s}`,
      children: t,
    });
class g extends m.Component {
  constructor(s) {
    (super(s),
      (this.handleRetry = () => {
        this.setState({ hasError: !1, error: void 0 });
      }),
      (this.state = { hasError: !1 }));
  }
  static getDerivedStateFromError(s) {
    return { hasError: !0, error: s };
  }
  componentDidCatch(s, r) {
    (console.error("Form Error Boundary caught an error:", s, r),
      this.props.onError && this.props.onError(s, r),
      console.group("Form Error Details"),
      console.error("Error:", s.message),
      console.error("Stack:", s.stack),
      console.error("Component Stack:", r.componentStack),
      console.groupEnd());
  }
  render() {
    return this.state.hasError
      ? this.props.fallback
        ? this.props.fallback
        : e.jsx("div", {
            className:
              "min-h-[200px] flex items-center justify-center p-6 bg-red-50 border border-red-200 rounded-xl",
            children: e.jsxs("div", {
              className: "text-center max-w-md",
              children: [
                e.jsx("div", {
                  className:
                    "w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center",
                  children: e.jsx("svg", {
                    className: "w-6 h-6 text-red-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: e.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 15.5c-.77.833.192 2.5 1.732 2.5z",
                    }),
                  }),
                }),
                e.jsx("h3", {
                  className: "text-lg font-semibold text-gray-900 mb-2",
                  children: "Form Error Occurred",
                }),
                e.jsx("p", {
                  className: "text-sm text-gray-600 mb-4",
                  children:
                    "There was an unexpected error with this form. This has been logged for investigation.",
                }),
                !1,
                e.jsxs("div", {
                  className: "flex flex-col sm:flex-row gap-3 justify-center",
                  children: [
                    e.jsx(n, {
                      type: "button",
                      variant: "destructive",
                      onClick: this.handleRetry,
                      children: "Try Again",
                    }),
                    e.jsx(n, {
                      type: "button",
                      variant: "outline",
                      onClick: () => window.location.reload(),
                      children: "Refresh Page",
                    }),
                  ],
                }),
                e.jsx("p", {
                  className: "text-xs text-gray-500 mt-4",
                  children:
                    "If this problem persists, please contact support with the error details above.",
                }),
              ],
            }),
          })
      : this.props.children;
  }
}
export { g as F, u as a, f as b, b as c, j as d };
