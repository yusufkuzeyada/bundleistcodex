import { j as e } from "./query.js";
import { L as a } from "./react.js";
import { u as r } from "./i18n.js";
const c = () => {
  const { t } = r();
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
            children: t("termsOfService"),
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
                  ["#acceptance", "1. Acceptance"],
                  ["#services", "2. Services and Role"],
                  ["#accounts", "3. Accounts and Access"],
                  ["#orders", "4. Orders and Instructions"],
                  ["#fees", "5. Fees and Payment"],
                  ["#third-parties", "6. Third-Party Providers"],
                  ["#compliance", "7. Trade Compliance"],
                  ["#confidentiality", "8. Confidentiality and Data"],
                  ["#ip", "9. Intellectual Property"],
                  ["#warranties", "10. Disclaimers"],
                  ["#liability", "11. Limitation of Liability"],
                  ["#termination", "12. Suspension and Termination"],
                  ["#law", "13. Governing Law and Disputes"],
                  ["#contact", "14. Contact"],
                ].map(([s, i]) =>
                  e.jsx(
                    "a",
                    {
                      href: s,
                      className:
                        "text-slate-700 hover:text-emerald-700 font-semibold",
                      children: i,
                    },
                    s,
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
                id: "acceptance",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "1. Acceptance",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children: `These Terms of Service ("Terms") govern your access to and use of Bundleist's platform and operations services. By accessing or using the Services, you agree to these Terms.`,
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "If you use the Services on behalf of an entity, you represent that you have authority to bind that entity.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "services",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "2. Services and Role",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Bundleist provides a software-enabled operations layer for procurement coordination, supplier workflow management, consolidation planning, shipment documentation support, and financial workflow visibility.",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Unless explicitly stated in a signed Order Form or services agreement, Bundleist is not acting as the legal importer of record, exporter of record, customs broker, insurer, common carrier, or freight forwarder.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "accounts",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "3. Accounts and Access",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "You are responsible for account credentials, user access controls, and all activity under your account. You must promptly notify us of unauthorized access or suspected security incidents.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "orders",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "4. Orders, Data, and Instructions",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "You are responsible for the accuracy and completeness of orders, product specifications, commercial terms, destination requirements, and supplier instructions entered or approved in the Services.",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Bundleist may rely on data and instructions provided by you or your authorized users and partners.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "fees",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "5. Fees and Payment",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Fees, billing cadence, and payment terms are defined in the applicable commercial plan, proposal, or signed Order Form. You remain responsible for taxes, duties, and third-party charges unless otherwise agreed in writing.",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "If payments are overdue, we may suspend non-essential features or Services until balances are settled.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "third-parties",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "6. Third-Party Providers",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Execution of procurement and logistics workflows may involve third parties such as suppliers, carriers, banks, warehouses, and customs-related providers. Delivery times, costs, and outcomes may depend on those parties.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "compliance",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "7. Trade Compliance and Restricted Activity",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "You agree to comply with applicable import/export laws, sanctions, anti-bribery rules, and product-level legal requirements in origin, transit, and destination countries.",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "You may not use the Services for unlawful trade, restricted goods, sanctions evasion, or any activity prohibited by applicable law.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "confidentiality",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "8. Confidentiality and Data",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Each party will protect the other party's confidential information and use it only for performance of the Services relationship. Privacy handling is described in the Privacy Policy, which forms part of these Terms.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "ip",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "9. Intellectual Property",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Bundleist retains all rights in the Services, software, workflows, designs, and documentation. You retain rights in your data and grant Bundleist a limited license to process that data for service delivery, security, support, and legal compliance.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "warranties",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "10. Disclaimers",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      'Services are provided on an "as is" and "as available" basis. To the extent permitted by law, Bundleist disclaims implied warranties including merchantability, fitness for a particular purpose, and non-infringement.',
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Bundleist does not guarantee uninterrupted availability, specific transit outcomes, customs release timing, or third-party performance unless expressly agreed in writing.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "liability",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "11. Limitation of Liability",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "To the maximum extent permitted by law, Bundleist is not liable for indirect, incidental, consequential, special, exemplary, or punitive damages, or for loss of profits, goodwill, data, or business interruption.",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Bundleist's aggregate liability for claims arising from or related to the Services will not exceed the amount paid by you to Bundleist for the Services during the 12 months preceding the claim event.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "termination",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "12. Suspension and Termination",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "We may suspend or terminate access for material breach, non-payment, legal risk, security risk, or prohibited use. You may terminate according to the applicable commercial agreement.",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Rights and obligations that by nature should survive termination (including payment obligations, liability limits, confidentiality, and dispute terms) will survive.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "law",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "13. Governing Law and Disputes",
                  }),
                  e.jsx("p", {
                    className: "mt-2",
                    children:
                      "Unless otherwise specified in a signed Order Form, these Terms are governed by the laws of the Republic of Turkiye. Courts of Istanbul shall have exclusive jurisdiction for disputes arising from these Terms.",
                  }),
                ],
              }),
              e.jsxs("section", {
                id: "contact",
                children: [
                  e.jsx("h2", {
                    className: "text-lg sm:text-xl font-bold text-slate-950",
                    children: "14. Contact",
                  }),
                  e.jsxs("p", {
                    className: "mt-2",
                    children: [
                      "For contractual questions, billing clarifications, or dispute notices, contact",
                      " ",
                      e.jsx("a", {
                        href: "mailto:bundleist@gmail.com",
                        className:
                          "font-semibold text-emerald-700 hover:text-emerald-800",
                        children: t("contactEmail"),
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
          e.jsx(a, {
            to: "/",
            className:
              "inline-flex mt-8 items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700",
            children: t("backToHome"),
          }),
        ],
      }),
    }),
  });
};
export { c as default };
