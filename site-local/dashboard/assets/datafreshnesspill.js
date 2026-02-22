import { j as r } from "./radix.js";
import { f as d, a as i } from "./audittrailpanel.js";
const x = ({
  asOf: e,
  staleAfterMs: o = 5 * 60 * 1e3,
  label: t = "Updated",
}) => {
  const s = new Date();
  if (!e)
    return r.jsxs("div", {
      className:
        "px-3 py-1.5 rounded-full border border-slate-200/70 bg-white text-xs font-semibold text-slate-600",
      children: [t, ": -"],
    });
  const a = Date.now() - e.getTime() > o;
  return r.jsxs("div", {
    className: [
      "px-3 py-1.5 rounded-full border text-xs font-semibold",
      a
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : "border-emerald-200 bg-emerald-50 text-emerald-800",
    ].join(" "),
    title: `As of ${i(e)}`,
    children: [t, ": ", d(e, s)],
  });
};
export { x as D };
