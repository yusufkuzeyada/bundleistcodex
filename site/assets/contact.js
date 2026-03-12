import { j as e } from "./query.js";
import { r as o } from "./react.js";
import { e as a } from "./app.js";
import { u as n } from "./i18n.js";
import "./supabase.js";
import "./radix.js";

const t = "https://cal.com/yusuf-bicer-8ytuyg";
const i = "sourcevia.inc@gmail.com";
const r = `mailto:${i}`;

const u = () => {
  const { t: c } = n();
  const [l, d] = o.useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });
  const [m, p] = o.useState(false);
  const [h, g] = o.useState("");
  const [f, y] = o.useState("");

  const N = (w) => {
    const { name: v, value: b } = w.target;
    d((C) => ({ ...C, [v]: b }));
  };

  const x = async (w) => {
    w.preventDefault();
    g("");
    y("");

    if (!l.fullName.trim() || !l.email.trim() || !l.message.trim()) {
      g(c("failedToSubmit"));
      return;
    }

    p(true);

    try {
      const v = {
        name: l.fullName,
        email: l.email,
        company: l.company,
        message: l.message,
        source: "contact-form",
      };
      const b = await fetch("/.netlify/functions/contact-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(v),
      });
      const C = await b.json().catch(() => null);

      if (!b.ok || !(C && C.ok)) {
        throw new Error("contact_submit_failed");
      }

      y(
        C && C.usedFallback
          ? "Your message was received and routed to the Sourcevia team."
          : "Your message was sent to Sourcevia.",
      );
      d({
        fullName: "",
        email: "",
        company: "",
        message: "",
      });
    } catch {
      g(
        `We hit a temporary delivery issue. Please email ${i} directly and we will reply manually.`,
      );
    } finally {
      p(false);
    }
  };

  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(a, {
        title: "Talk to us | Sourcevia",
        description: "Reach Sourcevia by email, contact form, or book a call.",
      }),
      e.jsx("main", {
        className:
          "min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#ffffff_48%,#f8fafc_100%)]",
        children: e.jsxs("div", {
          className: "mx-auto max-w-[84rem] px-4 py-10 sm:px-6 sm:py-14",
          children: [
            e.jsxs("div", {
              className: "grid gap-6",
              children: [
                e.jsx("a", {
                  href: "/",
                  className:
                    "inline-flex w-fit items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700",
                  children: "Back to home",
                }),
                e.jsxs("section", {
                  className:
                    "rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8",
                  children: [
                    e.jsx("div", {
                      className:
                        "inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-800",
                      children: "Sourcevia",
                    }),
                    e.jsx("h1", {
                      className:
                        "mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl",
                      children: "Talk to us",
                    }),
                    e.jsx("p", {
                      className:
                        "mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg",
                      children:
                        "Use email for a direct introduction, the form for sourcing details, or cal.com when you want to book time immediately.",
                    }),
                    e.jsxs("div", {
                      className: "mt-8 grid gap-4 sm:grid-cols-2",
                      children: [
                        e.jsxs("div", {
                          className:
                            "rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-5 shadow-sm",
                          children: [
                            e.jsx("div", {
                              className:
                                "text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500",
                              children: "Email",
                            }),
                            e.jsx("div", {
                              className:
                                "mt-3 text-xl font-bold tracking-tight text-slate-950 break-all",
                              children: i,
                            }),
                            e.jsx("p", {
                              className: "mt-3 text-sm leading-relaxed text-slate-600",
                              children:
                                "Best for supplier lists, product briefs, and anything you want to document clearly from the start.",
                            }),
                            e.jsx("a", {
                              href: r,
                              className:
                                "mt-5 inline-flex h-11 items-center rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 transition hover:border-emerald-300 hover:text-emerald-700",
                              children: "Email Sourcevia",
                            }),
                          ],
                        }),
                        e.jsxs("div", {
                          className:
                            "rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-5 shadow-sm",
                          children: [
                            e.jsx("div", {
                              className:
                                "text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500",
                              children: "Book a call",
                            }),
                            e.jsx("div", {
                              className:
                                "mt-3 text-xl font-bold tracking-tight text-slate-950",
                              children: "Open cal.com in a new tab",
                            }),
                            e.jsx("p", {
                              className: "mt-3 text-sm leading-relaxed text-slate-600",
                              children:
                                "Use this when you want a faster working session around supplier validation, production follow-up, or shipment planning.",
                            }),
                            e.jsx("a", {
                              href: t,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className:
                                "mt-5 inline-flex h-11 items-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800",
                              children: "Open cal.com",
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className:
                        "mt-5 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm",
                      children: [
                        e.jsx("div", {
                          className:
                            "text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500",
                          children: "Best use",
                        }),
                        e.jsx("p", {
                          className: "mt-3 text-sm leading-relaxed text-slate-700",
                          children:
                            "If you already have SKUs, proforma invoices, lead times, target quantities, or shipping constraints, the form is the fastest path because it lands as a structured inquiry.",
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs("section", {
                  id: "contact-form",
                  className:
                    "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.35)] sm:p-8",
                  children: [
                    e.jsx("div", {
                      className:
                        "text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500",
                      children: "Contact form",
                    }),
                    e.jsx("h2", {
                      className:
                        "mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-4xl",
                      children: "Share your sourcing needs",
                    }),
                    e.jsx("p", {
                      className: "mt-3 max-w-2xl text-sm leading-relaxed text-slate-700",
                      children:
                        "This form sends your brief directly to Sourcevia. Include product details, supplier context, timing, or shipment constraints if you have them.",
                    }),
                    e.jsxs("div", {
                      className:
                        "mt-5 flex flex-wrap items-center gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700",
                      children: [
                        e.jsx("span", {
                          className:
                            "inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm",
                          children: "Direct inbox",
                        }),
                        e.jsx("a", {
                          href: r,
                          className: "font-semibold text-emerald-700 hover:text-emerald-800",
                          children: i,
                        }),
                      ],
                    }),
                    e.jsxs("form", {
                      onSubmit: x,
                      className: "mt-6 space-y-5",
                      children: [
                        e.jsxs("div", {
                          className: "grid gap-4 sm:grid-cols-2",
                          children: [
                            e.jsxs("label", {
                              className: "grid gap-2",
                              children: [
                                e.jsx("span", {
                                  className: "text-sm font-semibold text-slate-800",
                                  children: c("fullName"),
                                }),
                                e.jsx("input", {
                                  name: "fullName",
                                  value: l.fullName,
                                  onChange: N,
                                  className:
                                    "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10",
                                  required: true,
                                }),
                              ],
                            }),
                            e.jsxs("label", {
                              className: "grid gap-2",
                              children: [
                                e.jsx("span", {
                                  className: "text-sm font-semibold text-slate-800",
                                  children: c("businessEmail"),
                                }),
                                e.jsx("input", {
                                  type: "email",
                                  name: "email",
                                  value: l.email,
                                  onChange: N,
                                  className:
                                    "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10",
                                  required: true,
                                }),
                              ],
                            }),
                          ],
                        }),
                        e.jsxs("label", {
                          className: "grid gap-2",
                          children: [
                            e.jsx("span", {
                              className: "text-sm font-semibold text-slate-800",
                              children: c("companyOptional"),
                            }),
                            e.jsx("input", {
                              name: "company",
                              value: l.company,
                              onChange: N,
                              className:
                                "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10",
                            }),
                          ],
                        }),
                        e.jsxs("label", {
                          className: "grid gap-2",
                          children: [
                            e.jsx("span", {
                              className: "text-sm font-semibold text-slate-800",
                              children: "Message",
                            }),
                            e.jsx("textarea", {
                              name: "message",
                              value: l.message,
                              onChange: N,
                              placeholder: c("tellUsAboutNeeds"),
                              className:
                                "min-h-[200px] w-full rounded-[1.75rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-900 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10",
                              style: { minHeight: 320 },
                              required: true,
                            }),
                          ],
                        }),
                        h
                          ? e.jsx("div", {
                              className:
                                "rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900",
                              children: h,
                            })
                          : null,
                        f
                          ? e.jsx("div", {
                              className:
                                "rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800",
                              children: f,
                            })
                          : null,
                        e.jsxs("div", {
                          className:
                            "flex justify-end border-t border-slate-200 pt-5",
                          children: [
                            e.jsx("button", {
                              type: "submit",
                              disabled: m,
                              className:
                                "inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60",
                              children: m ? c("submitting") : "Send message",
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
      }),
    ],
  });
};

export { u as default };
