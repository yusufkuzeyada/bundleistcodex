import { j as e } from "./query.js";
import { L as i } from "./react.js";
import { u as n } from "./i18n.js";
const c = () => {
  const { t: s } = n();
  return e.jsx("main", {
    className: "min-h-screen bg-slate-50",
    children: e.jsx("div", {
      className: "mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16",
      children: e.jsxs("div", {
        className:
          "rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm",
        children: [
          e.jsx("h1", {
            className:
              "text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950",
            children: s("privacyPolicy"),
          }),
          e.jsx("p", {
            className: "mt-2 text-sm text-slate-600",
            children: "Last updated: February 18, 2026",
          }),
          e.jsxs("div", {
            className:
              "mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4",
            children: [
              e.jsx("div", {
                className:
                  "text-xs font-bold uppercase tracking-wide text-slate-600",
                children: "Contents",
              }),
              e.jsx("div", {
                className:
                  "mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm",
                children: [
                  ["#scope", "1. Scope"],
                  ["#data-we-collect", "2. Data We Collect"],
                  ["#how-we-use-data", "3. How We Use Data"],
                  ["#legal-bases", "4. Legal Bases"],
                  ["#sharing", "5. Sharing and Disclosure"],
                  ["#transfers", "6. Cross-Border Transfers"],
                  ["#retention", "7. Data Retention"],
                  ["#security", "8. Security"],
                  ["#rights", "9. Your Rights"],
                  ["#cookies", "10. Cookies and Analytics"],
                  ["#changes", "11. Policy Updates"],
                  ["#contact", "12. Contact"],
                ].map(([t, a]) =>
                  e.jsx(
                    "a",
                    {
                      href: t,
                      className:
                        "text-slate-700 hover:text-emerald-700 font-semibold",
                      children: a,
                    },
                    t,
                  ),
                ),
              }),
            ],
          }),
          e.jsxs("div", {
            className:
              "mt-6 space-y-7 text-sm sm:text-base text-slate-700 leading-relaxed",
            children: [
              e.jsxs("section", {
                id: "scope",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "1. Scope",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      'This Privacy Policy explains how Bundleist Ltd. ("Bundleist", "we", "our", "us") collects, uses, shares, and protects personal and business information when you use our procurement coordination, consolidation, settlement, documentation, and shipment operations platform (the "Services").',
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "This Policy applies to website visitors, customer users, supplier-facing communications handled through our workflow, and individuals who contact us for support, sales, or operations.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "data-we-collect",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "2. Data We Collect",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "We collect data you provide directly, data generated through service usage, and limited technical data.",
                  }),
                  e.jsxs("ul", {
                    className: "mt-2 list-disc pl-5 space-y-1",
                    children: [
                      e.jsx("li", {
                        children:
                          "Account and identity data: name, business email, phone, company details, role, login credentials.",
                      }),
                      e.jsx("li", {
                        children:
                          "Operational data: orders, supplier details, consolidation plans, shipment milestones, documentation records.",
                      }),
                      e.jsx("li", {
                        children:
                          "Financial workflow data: settlement records, transaction metadata, invoice references, reconciliation notes.",
                      }),
                      e.jsx("li", {
                        children:
                          "Support and communications: messages, tickets, call notes, and operational instructions.",
                      }),
                      e.jsx("li", {
                        children:
                          "Technical data: IP address, browser/device information, log events, and basic usage analytics.",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "how-we-use-data",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "3. How We Use Data",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "We use data to deliver and improve sector-specific operations services, including to:",
                  }),
                  e.jsxs("ul", {
                    className: "mt-2 list-disc pl-5 space-y-1",
                    children: [
                      e.jsx("li", {
                        children:
                          "create and manage customer accounts and access control;",
                      }),
                      e.jsx("li", {
                        children:
                          "coordinate procurement, supplier validation, consolidation, documentation, and shipment workflows;",
                      }),
                      e.jsx("li", {
                        children:
                          "process settlement and ledger operations, including audit trail integrity;",
                      }),
                      e.jsx("li", {
                        children:
                          "provide customer support, service notices, and incident communication;",
                      }),
                      e.jsx("li", {
                        children:
                          "prevent fraud, abuse, unauthorized access, and policy violations;",
                      }),
                      e.jsx("li", {
                        children:
                          "meet legal, regulatory, sanctions-screening, tax, and record-keeping obligations.",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "legal-bases",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "4. Legal Bases for Processing",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Depending on your jurisdiction, we process data under one or more of the following bases:",
                  }),
                  e.jsxs("ul", {
                    className: "mt-2 list-disc pl-5 space-y-1",
                    children: [
                      e.jsx("li", {
                        children:
                          "performance of a contract or pre-contractual steps;",
                      }),
                      e.jsx("li", {
                        children: "compliance with legal obligations;",
                      }),
                      e.jsx("li", {
                        children:
                          "legitimate interests in secure and efficient operations; and",
                      }),
                      e.jsx("li", {
                        children: "consent, where required by law.",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "sharing",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "5. Sharing and Disclosure",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "We do not sell personal data. We may share data with:",
                  }),
                  e.jsxs("ul", {
                    className: "mt-2 list-disc pl-5 space-y-1",
                    children: [
                      e.jsx("li", {
                        children:
                          "cloud infrastructure, authentication, analytics, and communications providers;",
                      }),
                      e.jsx("li", {
                        children:
                          "payment, banking, accounting, and reconciliation service providers;",
                      }),
                      e.jsx("li", {
                        children:
                          "carriers, freight forwarders, warehouses, customs agents, and other logistics partners when required for execution;",
                      }),
                      e.jsx("li", {
                        children:
                          "professional advisors and auditors under confidentiality obligations;",
                      }),
                      e.jsx("li", {
                        children:
                          "competent authorities when legally required.",
                      }),
                    ],
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Access is limited to what is necessary for the relevant function, and we apply contractual and technical controls where appropriate.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "transfers",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "6. Cross-Border Transfers",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Because procurement and logistics are cross-border by nature, your data may be processed in multiple countries. Where required, we implement transfer safeguards such as contractual protections and risk-based security controls.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "retention",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "7. Data Retention",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "We retain data for as long as needed to deliver Services, maintain auditability of operational and financial events, resolve disputes, and comply with legal obligations. Retention periods vary by data type, contract terms, and jurisdictional requirements.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "security",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "8. Security",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "We maintain administrative, technical, and organizational measures designed to protect confidentiality, integrity, and availability of data, including role-based access controls, logging, and secure transmission practices. No system is absolutely secure, but we continuously improve controls based on risk.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "rights",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "9. Your Rights",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Subject to applicable law, you may request to access, correct, delete, or restrict certain personal data.",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Where applicable, you may also object to processing, request portability, or withdraw consent. We may need to verify identity and retain specific records where legally required.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "cookies",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "10. Cookies and Analytics",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "We use cookies and similar technologies for authentication, session continuity, security, language preferences, and product analytics. You can manage cookie settings through your browser; however, disabling certain cookies may affect functionality.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "changes",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "11. Policy Updates",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      'We may update this Policy from time to time. The "Last updated" date reflects the latest version. Material changes will be communicated through appropriate channels, such as in-product notices or email.',
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "contact",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "12. Contact",
                  }),
                  e.jsxs("p", {
                    className: "mt-2",
                    children: [
                      "For privacy requests or questions, contact us at",
                      " ",
                      e.jsx("a", {
                        href: "mailto:bundleist@gmail.com",
                        className:
                          "font-semibold text-emerald-700 hover:text-emerald-800",
                        children: s("contactEmail"),
                      }),
                      ".",
                    ],
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children: "Bundleist Ltd., Istanbul, Turkiye.",
                  }),
                ],
              }),
            ],
          }),
          e.jsx(i, {
            to: "/",
            className:
              "inline-flex mt-8 items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700",
            children: s("backToHome"),
          }),
        ],
      }),
    }),
  });
};
export { c as default };
