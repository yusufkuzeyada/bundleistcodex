import { j as e } from "./query.js";
import { L as i } from "./react.js";
import { u as n } from "./i18n.js";

const l = [
  ["scope", "1. Scope"],
  ["controller", "2. Data Controller"],
  ["collect", "3. Data We Collect"],
  ["use", "4. How We Use Data"],
  ["basis", "5. Legal Bases"],
  ["sharing", "6. Sharing and Disclosure"],
  ["transfers", "7. Cross-Border Transfers"],
  ["retention", "8. Data Retention"],
  ["security", "9. Security"],
  ["rights", "10. Your Rights"],
  ["cookies", "11. Cookies and Analytics"],
  ["updates", "12. Policy Updates"],
  ["contact", "13. Contact"],
];

const o = [
  {
    title: "Controller",
    body: "Sourcevia Inc. acts as the data controller for website, contact, and platform data processed for its own business operations.",
  },
  {
    title: "Focus",
    body: "This policy covers account data, sourcing workflows, logistics records, service communications, and basic technical usage data.",
  },
  {
    title: "Contact",
    body: "Privacy questions and rights requests can be directed to sourcevia.inc@gmail.com.",
  },
];

const c = [
  {
    id: "scope",
    title: "1. Scope",
    paragraphs: [
      'This Privacy Policy explains how Sourcevia Inc. ("Sourcevia", "we", "our", "us") collects, uses, shares, and protects personal and business-related information when you use our website, contact forms, dashboards, and sourcing operations services (the "Services").',
      "This Policy applies to site visitors, customer users, supplier-facing contacts processed through our workflows, and people who communicate with Sourcevia for sales, support, or operations.",
    ],
  },
  {
    id: "controller",
    title: "2. Data Controller",
    paragraphs: [
      "Sourcevia Inc., based in Istanbul, T\u00fcrkiye, is the controller for personal data processed for its own platform, website, customer relationship, and operational administration purposes.",
      "Where specific transactions involve third parties such as carriers, payment partners, suppliers, or customs agents, those parties may also act as independent controllers for the data they process within their own legal roles.",
    ],
  },
  {
    id: "collect",
    title: "3. Data We Collect",
    paragraphs: [
      "We collect data you provide directly, data generated through use of the Services, and limited technical data required for security and product operation.",
    ],
    bullets: [
      "Identity and account data, such as name, business email, role, company, and login-related information.",
      "Operational data, such as orders, supplier references, shipment milestones, consolidation records, and documentation logs.",
      "Financial workflow data, such as invoice references, reconciliation metadata, payment status records, and ledger notes.",
      "Communications data, such as support messages, contact forms, meeting notes, and service-related correspondence.",
      "Technical data, such as IP address, browser or device information, session logs, and basic analytics events.",
    ],
  },
  {
    id: "use",
    title: "4. How We Use Data",
    paragraphs: [
      "We use personal data to operate, secure, support, and improve Sourcevia's services.",
    ],
    bullets: [
      "To create and manage accounts, permissions, and access control.",
      "To coordinate sourcing, supplier validation, shipment planning, documentation, and customer communications.",
      "To maintain auditability of operational and financial workflow events.",
      "To provide support, answer enquiries, and send important service-related notices.",
      "To prevent fraud, abuse, unauthorized access, and violations of our policies or applicable law.",
      "To satisfy legal, tax, sanctions-screening, record-keeping, and compliance obligations.",
    ],
  },
  {
    id: "basis",
    title: "5. Legal Bases",
    paragraphs: [
      "Depending on your relationship with Sourcevia and the jurisdiction involved, we may rely on one or more of the following legal bases:",
    ],
    bullets: [
      "Performance of a contract or steps taken before entering into a contract.",
      "Compliance with legal obligations.",
      "Legitimate interests in operating secure, efficient, and accountable sourcing workflows.",
      "Consent, where consent is required by applicable law.",
    ],
  },
  {
    id: "sharing",
    title: "6. Sharing and Disclosure",
    paragraphs: [
      "We do not sell personal data. We may share data where necessary with carefully selected service providers and operational counterparties.",
    ],
    bullets: [
      "Cloud hosting, authentication, communications, analytics, and productivity providers.",
      "Payment, banking, accounting, invoicing, or reconciliation service providers.",
      "Suppliers, carriers, warehouses, freight partners, customs agents, or similar operational counterparties where needed for execution.",
      "Professional advisers, auditors, or legal counsel subject to confidentiality obligations.",
      "Public authorities or regulators where disclosure is legally required.",
    ],
  },
  {
    id: "transfers",
    title: "7. Cross-Border Transfers",
    paragraphs: [
      "Because sourcing and logistics are cross-border by nature, personal data may be processed in more than one country.",
      "Where required, we use contractual, organizational, and security measures designed to protect data during cross-border processing and transfers.",
    ],
  },
  {
    id: "retention",
    title: "8. Data Retention",
    paragraphs: [
      "We retain data for as long as reasonably necessary to provide the Services, preserve operational and financial audit trails, resolve disputes, enforce agreements, and meet legal obligations.",
      "Retention periods vary depending on the data type, contract terms, operational necessity, and applicable legal requirements.",
    ],
  },
  {
    id: "security",
    title: "9. Security",
    paragraphs: [
      "We maintain administrative, technical, and organizational measures designed to protect the confidentiality, integrity, and availability of personal data.",
      "These measures may include role-based access control, credential protection, logging, secure transmission practices, and risk-based operational controls. No system is perfectly secure, but we continuously review and improve our controls.",
    ],
  },
  {
    id: "rights",
    title: "10. Your Rights",
    paragraphs: [
      "Subject to applicable law, you may have the right to request access, correction, deletion, restriction, objection, portability, or withdrawal of consent for certain processing activities.",
      "We may need to verify your identity before acting on a request and may retain certain records where legally required. You may also have the right to lodge a complaint with the competent data protection authority, including the Ki\u015fisel Verileri Koruma Kurumu in T\u00fcrkiye where applicable.",
    ],
  },
  {
    id: "cookies",
    title: "11. Cookies and Analytics",
    paragraphs: [
      "We use cookies and similar technologies for security, authentication, session continuity, language preference, and product analytics.",
      "You can manage cookie settings through your browser, but disabling some cookies may affect platform functionality or session stability.",
    ],
  },
  {
    id: "updates",
    title: "12. Policy Updates",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect legal, operational, or product changes.",
      'The "Last updated" date reflects the current version. Where appropriate, material changes will be communicated through the website, product notices, or email.',
    ],
  },
  {
    id: "contact",
    title: "13. Contact",
    paragraphs: [
      "For privacy questions, data rights requests, or concerns about this Policy, contact Sourcevia at sourcevia.inc@gmail.com.",
      "Sourcevia Inc. operates from Istanbul, T\u00fcrkiye.",
    ],
  },
];

const s = () => {
  const { t } = n();

  return e.jsx("main", {
    className:
      "min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#ffffff_48%,#f8fafc_100%)]",
    children: e.jsxs("div", {
      className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
      children: [
        e.jsxs("section", {
          className:
            "rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8",
          children: [
            e.jsx("div", {
              className:
                "inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-800",
              children: "Privacy",
            }),
            e.jsx("h1", {
              className:
                "mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl",
              children: t("privacyPolicy"),
            }),
            e.jsx("p", {
              className: "mt-3 text-sm font-medium text-slate-500 sm:text-base",
              children: "Last updated: March 12, 2026",
            }),
            e.jsx("p", {
              className:
                "mt-4 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg",
              children:
                "This Policy explains what personal data Sourcevia handles, why it is processed, who it may be shared with, and how people can exercise their rights.",
            }),
            e.jsx("div", {
              className: "mt-8 grid gap-4 md:grid-cols-3",
              children: o.map((a) =>
                e.jsxs(
                  "div",
                  {
                    className:
                      "rounded-[1.5rem] border border-slate-200 bg-slate-50/85 p-5 shadow-sm",
                    children: [
                      e.jsx("div", {
                        className:
                          "text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500",
                        children: a.title,
                      }),
                      e.jsx("p", {
                        className:
                          "mt-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]",
                        children: a.body,
                      }),
                    ],
                  },
                  a.title,
                ),
              ),
            }),
          ],
        }),
        e.jsxs("section", {
          className:
            "mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.28)] sm:p-8",
          children: [
            e.jsx("div", {
              className:
                "text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500",
              children: "Contents",
            }),
            e.jsx("div", {
              className: "mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
              children: l.map(([a, r]) =>
                e.jsx(
                  "a",
                  {
                    href: `#${a}`,
                    className:
                      "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700",
                    children: r,
                  },
                  a,
                ),
              ),
            }),
          ],
        }),
        e.jsx("div", {
          className: "mt-6 space-y-4",
          children: c.map((a) =>
            e.jsxs(
              "section",
              {
                id: a.id,
                className:
                  "rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7",
                children: [
                  e.jsx("h2", {
                    className:
                      "text-lg font-bold tracking-tight text-slate-950 sm:text-xl",
                    children: a.title,
                  }),
                  e.jsx("div", {
                    className:
                      "mt-3 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base",
                    children: a.paragraphs.map((r, n) =>
                      e.jsx("p", { children: r }, `${a.id}-p-${n}`),
                    ),
                  }),
                  a.bullets
                    ? e.jsx("ul", {
                        className:
                          "mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 sm:text-base",
                        children: a.bullets.map((r, n) =>
                          e.jsx("li", { children: r }, `${a.id}-b-${n}`),
                        ),
                      })
                    : null,
                ],
              },
              a.id,
            ),
          ),
        }),
        e.jsxs("div", {
          className: "mt-8 flex flex-wrap items-center gap-3",
          children: [
            e.jsx(i, {
              to: "/",
              className:
                "inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700",
              children: t("backToHome"),
            }),
            e.jsx("a", {
              href: "mailto:sourcevia.inc@gmail.com",
              className:
                "inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800",
              children: "Contact privacy",
            }),
          ],
        }),
      ],
    }),
  });
};

export { s as default };
