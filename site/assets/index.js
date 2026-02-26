const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/app.js",
      "assets/supabase.js",
      "assets/react.js",
      "assets/query.js",
      "assets/radix.js",
      "assets/i18n.js",
    ]),
) => i.map((i) => d[i]);
var E = Object.defineProperty;
var O = (e, i, t) =>
  i in e
    ? E(e, i, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (e[i] = t);
var c = (e, i, t) => O(e, typeof i != "symbol" ? i + "" : i, t);
import { _ as I } from "./supabase.js";
import { j as a } from "./query.js";
import { a as M, r as F, e as f } from "./react.js";
import { i as l, B as R, a as L } from "./i18n.js";
(function () {
  const i = document.createElement("link").relList;
  if (i && i.supports && i.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) o(r);
  new MutationObserver((r) => {
    for (const n of r)
      if (n.type === "childList")
        for (const d of n.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && o(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(r) {
    const n = {};
    return (
      r.integrity && (n.integrity = r.integrity),
      r.referrerPolicy && (n.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : r.crossOrigin === "anonymous"
          ? (n.credentials = "omit")
          : (n.credentials = "same-origin"),
      n
    );
  }
  function o(r) {
    if (r.ep) return;
    r.ep = !0;
    const n = t(r);
    fetch(r.href, n);
  }
})();
var v,
  m = M;
((v = m.createRoot), m.hydrateRoot);
const S = /(?:\u00C3.|\u00C4.|\u00C5.|\u00D8.|\u00D9.|\u00D0.|\u00D1.|\u00E2.)/,
  C = "�",
  p = "bundleist_language_mode",
  D = new Map([
    [8364, 128],
    [8218, 130],
    [402, 131],
    [8222, 132],
    [8230, 133],
    [8224, 134],
    [8225, 135],
    [710, 136],
    [8240, 137],
    [352, 138],
    [8249, 139],
    [338, 140],
    [381, 142],
    [8216, 145],
    [8217, 146],
    [8220, 147],
    [8221, 148],
    [8226, 149],
    [8211, 150],
    [8212, 151],
    [732, 152],
    [8482, 153],
    [353, 154],
    [8250, 155],
    [339, 156],
    [382, 158],
    [376, 159],
  ]),
  T = (e) => {
    const i = (e || "en").toLowerCase();
    return i.startsWith("tr")
      ? "tr"
      : i.startsWith("fr")
        ? "fr"
        : i.startsWith("ar")
          ? "ar"
          : "en";
  },
  V = (e) => {
    const i = (e.match(/\?/g) || []).length;
    return i < 3
      ? !1
      : /\?{3,}/.test(e)
        ? !0
        : i / Math.max(1, e.length) > 0.12;
  },
  G = (e) => e.includes(C) || S.test(e),
  w = (e) => G(e) || V(e),
  q = (e) => {
    for (const i of e) {
      const t = i.codePointAt(0);
      if (t !== void 0 && !(t <= 255) && !D.has(t)) return !1;
    }
    return !0;
  },
  H = (e) => {
    const i = [];
    for (const t of e) {
      const o = t.codePointAt(0);
      if (o === void 0) continue;
      if (o <= 255) {
        i.push(o);
        continue;
      }
      const r = D.get(o);
      if (r !== void 0) {
        i.push(r);
        continue;
      }
      i.push(63);
    }
    return Uint8Array.from(i);
  },
  h = (e) => {
    var i, t, o;
    return (
      (((i = e.match(S)) == null ? void 0 : i.length) || 0) +
      (((t = e.match(new RegExp(C, "g"))) == null ? void 0 : t.length) || 0) *
        4 +
      (((o = e.match(/\?/g)) == null ? void 0 : o.length) || 0) * 2
    );
  },
  U = (e) => {
    if (!w(e)) return e;
    let i = e,
      t = h(i);
    for (let o = 0; o < 4; o += 1)
      try {
        if (!q(i)) break;
        const r = new TextDecoder("utf-8").decode(H(i));
        if (!r || r === i) break;
        const n = h(r);
        if (n > t) break;
        ((i = r), (t = n));
      } catch {
        break;
      }
    return i.replace(/\u00c2(?=\s|[.,!?;:])/g, "").replace(/\u00a0/g, " ");
  },
  P = (e) => {
    const i = {};
    return (
      Object.entries(e).forEach(([t, o]) => {
        i[t] = typeof o == "string" ? U(o) : P(o);
      }),
      i
    );
  },
  z = (e, i) => {
    const t = {};
    return (
      Object.entries(e).forEach(([o, r]) => {
        const n = i[o];
        if (typeof r == "string") {
          w(r) && typeof n == "string" ? (t[o] = n) : (t[o] = r);
          return;
        }
        if (r && typeof r == "object") {
          t[o] = z(r, n || {});
          return;
        }
        t[o] = r;
      }),
      t
    );
  },
  A = (e) => {
    if (typeof document > "u") return;
    const i = T(e),
      t = i === "ar" ? "rtl" : "ltr";
    ((document.documentElement.lang = i), (document.documentElement.dir = t));
  },
  W = {
    en: {
      translation: {
        features: "Features",
        howItWorks: "How It Works",
        pricing: "Pricing",
        blog: "Blog",
        getStarted: "Get Started",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        smartExportConsolidation: "Turkish supplier consolidation, end to end",
        turkishSupplyChain: "Turkish Supply Chain",
        complexity: "Complexity,",
        heroDescription: `See every order, consolidation, and shipment in one place.
Real statuses, costs, and next actions from procurement to delivery.
No need to build an in-house ops team just to buy from Turkey.`,
        talkToOurTeam: "Talk to Our Team",
        heroTitle: "Stop chasing Turkish suppliers.",
        heroSubtitle:
          "Transform fragmented imports into intelligent consolidation. Reduce costs by 65% and accelerate documentation by 15x with our AI-powered platform.",
        heroButton: "Start Your Journey",
        heroSecondaryButton: "Watch Demo",
        complexityTransformed: "Complexity Transformed",
        efficiencyDelivered: "Efficiency Delivered",
        readyToStreamline: "Ready to streamline your supply chain?",
        masterTurkishProcurement:
          "Master Turkish Procurement Like Never Before",
        whyJuggleSuppliers:
          "Why juggle dozens of suppliers when you can orchestrate them all?",
        consolidateEveryPurchase:
          "Consolidate every Turkish purchase into one powerful shipment",
        onePaymentContract: "One payment, one contract, one Bill of Lading",
        maximumEfficiencyStreamlined:
          "Maximum efficiency with streamlined operations",
        statisticsTitle: "Cost Advantages You Can Actually Measure",
        statisticsSubtitle:
          "Track the levers that impact landed cost, cash leakage, and shipment risk.",
        resultsFreightValue: "Freight/unit",
        resultsPaymentValue: "Fee load",
        resultsExceptionsValue: "Exceptions",
        fasterDocumentation: "Freight Efficiency",
        singleBillOfLading:
          "Consolidation is designed to lower shipping cost per unit through better load utilization.",
        costReduction: "Payment Overhead",
        lowerShippingCosts:
          "One managed payment flow reduces repeated transfer fees and reconciliation friction.",
        timeSavings: "Exception Control",
        streamlinedProcess:
          "A unified tracking view catches delays and document gaps before they become expensive.",
        homeSeoTitle:
          "Turkish Supplier Consolidation & Export Operations | Bundleist",
        homeSeoDescription:
          "Bundleist coordinates supplier validation, managed settlements, Istanbul warehouse consolidation, and export documentation in one accountable workflow.",
        homeSeoKeywords:
          "turkish supplier consolidation, export operations turkey, import consolidation workflow, istanbul consolidation warehouse, supplier settlement workflow, export documentation management, b2b procurement turkey, freight consolidation service",
        comparisonTitle: "Cut Import Waste. Keep Control.",
        comparisonSubtitle:
          "No miracle percentages. We fix the cost leaks you can actually control.",
        comparisonBadge: "No hype. Operational truth.",
        comparisonDisclaimer:
          "Outcomes depend on supplier readiness, order mix, and destination lane. We focus on controllable process improvements.",
        traditionalImports: "Leak points",
        fragmentedComplex: "The avoidable cost and risk stack",
        multipleShipments:
          "Separate supplier legs inflate freight and handling",
        multipleShipmentsDesc: "",
        complexDocumentation:
          "Scattered payments increase bank fees and reconciliation effort",
        complexDocumentationDesc: "",
        paymentRisks: "Asynchronous documents create customs and release risk",
        paymentRisksDesc: "",
        responseRate: "When issues appear, accountability is fragmented",
        delays: "Updates live across threads instead of one operational source",
        protection: "",
        bundleistSolution: "Bundleist control layer",
        smartConsolidated: "Practical, accountable operations",
        recommended: "RECOMMENDED",
        singleConsolidatedShipment:
          "Inbound orders are received in Istanbul before outbound planning",
        singleConsolidatedShipmentDesc: "",
        streamlinedDocumentation:
          "Verification, packing checks, and documents follow one checklist",
        streamlinedDocumentationDesc: "",
        securePaymentHandling:
          "Supplier settlements run through one controlled payment workflow",
        securePaymentHandlingDesc: "",
        fasterProcess:
          "Documents and shipment milestones are tracked in one shared view",
        costSavings:
          "One operations owner handles exceptions through final dispatch",
        protected: "",
        choosePlan: "Simple, Transparent Pricing",
        transparentPricing:
          "Select the plan that fits your shipment volume. Service fees are clear and predictable.",
        starter: "Trial",
        growth: "Growth",
        enterprise: "Corporate",
        starterDesc: "Run one full consolidation and validate the process.",
        growthDesc: "For recurring monthly consolidations across suppliers.",
        enterpriseDesc:
          "For high-volume lanes with priority operations support.",
        oneTimeFee: "per consolidation",
        totalOrderValue: "of managed order value",
        after5Consolidations: "after 5+ monthly consolidations",
        bankTransferFees:
          "Freight, duties, and destination charges billed at actual cost.",
        volumeDiscounting:
          "Rate adjusted by lane stability and monthly volume.",
        singleConsolidatedShipmentFeature: "One managed consolidation cycle",
        supplierPaymentHandling: "Controlled supplier settlement workflow",
        singleBillOfLadingFeature:
          "Unified export documentation and bill of lading",
        documentationSupport: "Pre-dispatch verification and document checks",
        multipleConsolidatedShipments:
          "Recurring consolidations across suppliers",
        digitalProcurementDashboard:
          "Shared dashboard for statuses, costs, and blockers",
        realTimeTracking: "Milestone tracking from intake to delivery",
        preferredShippingRates: "Lane-based planning and carrier coordination",
        paymentHandlingProtection: "Reconciled ledger with payment proof trail",
        volumeDiscountPricing: "Lower blended service rate at sustained volume",
        priorityConsolidation: "Priority handling on time-critical dispatches",
        customizedShippingSchedule: "Custom dispatch cadence by lane",
        advancedAnalyticsReporting:
          "Performance, exception, and cost reporting",
        warehouseStorageOptions: "Flexible Istanbul staging windows",
        strategicSourcingAssistance: "Supplier network expansion support",
        pricingOperatingModel: "Commercial Framework",
        pricingAllPlansInclude: "Every Plan Includes",
        pricingAllPlansIncludeDesc:
          "Core execution controls remain consistent across plans; cadence and service depth scale with your operation.",
        pricingInclusionVerification: "Supplier and commercial term validation",
        pricingInclusionSettlement:
          "Managed settlement workflow with payment proof",
        pricingInclusionDocumentation:
          "Export document pack with checklist governance",
        pricingInclusionTracking:
          "Milestone visibility and exception ownership",
        pricingCommercialGuardrail:
          "No lock-in contract. Start with a pilot run, then move to volume pricing once your import cadence stabilizes.",
        pricingEngagementModel: "Engagement Model",
        pricingBestFor: "Best For",
        pricingStarterModel: "Single end-to-end run",
        pricingGrowthModel: "Recurring monthly coverage",
        pricingEnterpriseModel: "Dedicated high-volume lane",
        pricingStarterFit:
          "Importers testing process fit with limited initial volume",
        pricingGrowthFit:
          "Teams managing repeated orders across multiple Turkish suppliers",
        pricingEnterpriseFit:
          "Companies running steady high-volume lanes with tighter SLA requirements",
        pricingTierStarter: "Trial",
        pricingTierGrowth: "Growth",
        pricingTierEnterprise: "Corporate",
        featuresHeadline: "Operational Control Across Every Turkish Order",
        featuresSubtext:
          "Bundleist sits between suppliers, warehouse, and shipment so your team can see what is ready, blocked, and next.",
        importConsolidation: "One Control Layer",
        importConsolidationDesc:
          "From supplier pickups to final dispatch, Bundleist runs one coordinated operational flow.",
        consolidatedShipping: "Warehouse Intake & Consolidation",
        consolidatedShippingDesc:
          "Orders are received in Istanbul, checked, and grouped before outbound planning.",
        singleBillOfLadingTitle: "Lane-Based Dispatch Planning",
        singleBillOfLadingDesc:
          "Shipments are planned by lane, load profile, and destination constraints.",
        centralizedPayments: "Controlled Supplier Settlements",
        centralizedPaymentsDesc:
          "One managed payment workflow replaces fragmented transfers and confirmation threads.",
        simplifiedDocumentation: "Export Document Pack",
        simplifiedDocumentationDesc:
          "Commercial invoice, packing details, and shipment documents are prepared in one process.",
        globalCompliance: "Milestone Visibility",
        globalComplianceDesc:
          "Track readiness, exceptions, and shipment milestones in a single operational view.",
        supplierManagement: "Supplier Context in One Place",
        supplierManagementDesc:
          "Supplier terms, statuses, and pending actions stay visible without chasing chat history.",
        deliveryGuarantee: "Exception Ownership",
        deliveryGuaranteeDesc:
          "One accountable operations team handles blockers through final dispatch.",
        latestInsights: "Latest Insights",
        fromTheBlog: "From the blog",
        stayUpdatedWithTrends:
          "Stay updated with the latest trends in global procurement",
        viewAllArticles: "View All Articles",
        readMore: "Read More",
        publishedOn: "Published on",
        blogNotFound: "Blog post not found",
        backToBlog: "Back to Blog",
        ourBlog: "Our Blog",
        insightsAndNews: "Insights & News",
        insightsOnCrossBorderCommerce: "Insights on Cross-Border Commerce",
        expertAnalysisDesc:
          "Expert analysis, industry trends, and practical tips for optimizing your Turkish supply chain.",
        createNewPost: "Create New Post",
        createNewContent: "Create New Content",
        allPosts: "All Posts",
        noBlogPostsYet: "No blog posts published yet.",
        noNewsYet: "No news articles yet",
        createFirstPost: "Create First Post",
        createFirstNews: "Create First News",
        readArticle: "Read Article",
        edit: "Edit",
        contentType: "Content Type",
        blogPost: "Blog Post",
        industryNews: "Industry News",
        blogPosts: "Blog Posts",
        wantToStayUpdated: "Want to stay updated with our latest insights?",
        exclusiveInsightsDesc:
          "Get exclusive insights, industry trends, and expert analysis delivered directly to your inbox.",
        subscribeToNewsletterBtn: "Subscribe to Our Newsletter",
        loadingBlogPosts: "Loading blog posts...",
        share: "Share",
        postNotFound: "Post Not Found",
        blogPostNotExist: "The blog post you're looking for doesn't exist.",
        General: "General",
        "Supply Chain": "Supply Chain",
        "E-commerce": "E-commerce",
        Logistics: "Logistics",
        "International Trade": "International Trade",
        "Sourcing from TÃƒÂ¼rkiye": "Sourcing from TÃƒÂ¼rkiye",
        "Cross Border Procurement": "Cross Border Procurement",
        minRead: "min read",
        navigation: "Navigation",
        stayUpdated: "Stay Updated",
        stayUpdatedDesc:
          "Get the latest updates on supply chain optimization and international trade insights.",
        newsletterNoSpam:
          "No spam. Product updates and export consolidation insights only.",
        newsletterEmailPlaceholder: "you@company.com",
        subscribed: "Subscribed",
        newsletterThanks: "Thank you for subscribing.",
        invalidEmailAddress: "Please enter a valid email address.",
        genericTryAgain: "Something went wrong. Please try again.",
        footerContact: "Contact",
        footerBuiltFor:
          "Built for procurement teams, forwarders, and operators.",
        subscribeNewsletter: "Subscribe to Newsletter",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        allRightsReserved: "All rights reserved.",
        madeWith: "Made with",
        inIstanbul: "in Istanbul",
        brandTagline: "Simplifying Cross Border Procurement",
        brandDesc:
          "Transform your Turkish supply chain with intelligent consolidation services. Reduce costs, optimize logistics, and scale your international business with confidence.",
        contactEmail: "bundleist@gmail.com",
        locationIstanbul: "Istanbul, Turkey",
        dashboardAlt: "Bundleist Dashboard Interface",
        findSuppliers: "Share Your Purchase Plan",
        findSuppliersDesc:
          "Send approved proforma invoices or item requirements. If needed, we can source vetted Turkish supplier options aligned to your specs and budget.",
        supplierVerification: "Supplier & Terms Validation",
        supplierVerificationDesc:
          "Before funds move, we validate supplier identity, banking details, lead times, and agreed commercial terms.",
        paymentProcessing: "Managed Supplier Settlements",
        paymentProcessingDesc:
          "You fund one controlled payment flow. We execute supplier settlements, provide proof of payment, and keep a reconciled ledger.",
        orderConsolidation: "Warehouse Intake & Consolidation",
        orderConsolidationDesc:
          "Goods arrive at our Istanbul facility, are checked against packing details, and grouped into the most efficient outbound plan.",
        documentationSimplified: "Export Documentation Pack",
        documentationSimplifiedDesc:
          "Commercial invoices, packing details, and shipping documents are prepared through one checklist to reduce customs risk.",
        globalShipping: "Global Shipping",
        globalShippingDesc:
          "Your consolidated order is shipped to your destination with real-time tracking and updates.",
        easyDelivery: "Dispatch, Tracking & Delivery",
        easyDeliveryDesc:
          "Your consolidated shipment is dispatched with milestone updates and coordinated exception handling through final delivery.",
        saveShippingCosts: "Save up to 40% on shipping costs",
        reduceDocumentation: "Reduces documentation by 70%",
        onePaymentAllSuppliers: "One payment for all suppliers",
        digitalFirstApproach: "Digital-first approach",
        countriesSupported: "150+ countries supported",
        unlimitedSupplierNetwork: "Unlimited supplier network",
        onTimeDeliveryRate: "99.5% on-time delivery rate",
        mostPopularFeature: "Most Popular Feature",
        essentialFeature: "Essential Feature",
        premiumSupportIncluded: "Premium Support Included",
        simpleProcess: "Execution Blueprint",
        howItWorksDesc:
          "Bundleist becomes your operating layer between Turkish suppliers, warehouse intake, and outbound shipment. One accountable workflow from purchase confirmation to delivery.",
        start: "START",
        done: "DONE",
        fullName: "Full Name",
        businessEmail: "Business Email",
        company: "Company",
        companyOptional: "Company (Optional)",
        whyInterested: "Why are you interested in Bundleist?",
        whatInterests: "What interests you most about Bundleist?",
        tellUsAboutNeeds:
          "Tell us about your business needs and how Bundleist can help...",
        tellUsInterests:
          "Tell us what aspects of our supply chain solutions interest you most...",
        submitting: "Submitting...",
        requestEarlyAccess: "Request Early Access",
        subscribe: "Subscribe",
        backToHome: "Back to home",
        subscribeToOurNewsletter: "Subscribe to Our Newsletter",
        getStartedPage: "Get Started",
        getStartedDesc:
          "Get started with Bundleist's innovative supply chain solutions and streamline your Turkish supplier management.",
        newsletterDesc:
          "Stay updated with the latest news and updates from Bundleist's innovative supply chain solutions.",
        neverShareEmail: "We'll never share your email with anyone else.",
        requestSubmittedSuccess: "Request submitted successfully!",
        newsletterSubscriptionSuccess: "Newsletter subscription successful!",
        thankYouInterest:
          "Thank you for your interest in Bundleist. We'll be in touch soon.",
        successfullySubscribed:
          "Successfully subscribed to our newsletter! We'll keep you updated.",
        submissionError: "Submission Error",
        failedToSubmit: "Failed to submit your request. Please try again.",
        emailAlreadyRegistered:
          "This email has already been registered for early access.",
        emailAlreadySubscribed:
          "This email is already subscribed to our newsletter.",
        heroOpsConsole: "Ops console",
        heroSearchId: "Search ID",
        heroNavRelationships: "Relationships",
        heroNavShipments: "Shipments",
        heroNavLedger: "Ledger",
        heroMockTitle: "Mixed consolidation, one ledger",
        heroMockSubtitle:
          "Orders and customers roll up into one container shipment. Costs are distributed with audit trail.",
        heroOrdersMeta: "8 ready, 4 in QC",
        heroCustomers: "Customers",
        heroCustomersMeta: "Mixed consolidation",
        heroConsolidationMeta: "2 mixed, 1 in transit",
        heroOrderIdA: "ORD-2847",
        heroOrderVolumeA: "2.10 m3",
        heroOrderIdB: "ORD-2910",
        heroOrderVolumeB: "1.40 m3",
        heroConsolidationCode: "CON-ATLAS (Mixed)",
        heroShipmentCode: "SHP-HMB",
        heroDelta: "Delta",
        heroActualVsBilled: "Actual vs billed",
        heroRelationshipFlow: "Relationship flow",
        heroVolumeProportional: "Volume proportional",
        heroNeedsActualCost: "Awaiting final cost",
        heroCustomersCount: "4 customers",
        heroShipmentInTransit: "In transit",
        heroLedgerNet: "Ledger net +$12,340",
        heroCapacity: "Capacity",
        heroExceptions: "Exceptions",
        heroNeedAction: "need action",
        heroMissingActualShippingCost: "Missing actual shipping cost",
        heroDistributionReadyAfterCostSet: "Distribution ready after cost set",
        dashboardHome: "Dashboard",
        dashboardOrders: "Orders",
        dashboardConsolidations: "Consolidations",
        dashboardShipments: "Shipments",
        dashboardSuppliers: "Suppliers",
        dashboardPayments: "Payments",
        dashboardWelcome: "Welcome, {{name}}",
        dashboardGrowth: "Standard",
        dashboardQuickSummary: "Here's a quick summary of your account",
        dashboardBalance: "Balance",
        dashboardOrdersInProgress: "Orders in Progress",
        dashboardActiveConsolidations: "Active Consolidations",
        dashboardActiveConsolidation: "Active Consolidation",
        dashboardPlanning: "Planning",
        dashboardConsolidationName: "atlas-europe",
        dashboardLocationHamburg: "ist-hamburg",
        dashboardVolume: "Volume",
        dashboardWeight: "Weight",
        dashboardDeparts: "Departs",
        dashboardContainer: "Container",
        dashboardLiveActivity: "Live Activity",
        dashboardActivityPayment:
          "Ã¢â‚¬Â¢ Payment processed for Order {{order}} - {{amount}}",
        dashboardActivityConsolidationCapacity:
          "Ã¢â‚¬Â¢ Consolidation '{{consolidation}}' capacity updated to 42%",
        dashboardOrdersAwaiting: "Orders Awaiting Consolidation",
        dashboardOrderItem: "industrial machinery",
        dashboardOrderReady: "Ready",
        dashboardSupplier: "Supplier",
        dashboardSupplierAtlas: "atlas manufacturing",
        dashboardSupplierEuro: "euro automotive",
        dashboardOrderValue: "Value",
        dashboardYourShipments: "Your Shipments",
        dashboardConsolidation: "Consolidation",
        dashboardConsolidationPhoenix: "phoenix",
        dashboardConsolidationDelivered: "Delivered",
        dashboardCarrier: "Carrier",
        dashboardCarrierGlobal: "global express",
        dashboardShipped: "Shipped",
        dashboardConsolidationDelta: "delta",
        dashboardConsolidationInTransit: "In Transit",
        dashboardCarrierMaritime: "maritime logistics",
        dashboardActivityNewSupplierInquiry:
          "Ã¢â‚¬Â¢ New supplier inquiry from '{{supplier}}'",
      },
    },
    fr: {
      translation: {
        dashboardWelcome: "Bienvenue, {{name}}",
        dashboardGrowth: "Croissance",
        dashboardQuickSummary: "Voici un rÃƒÂ©sumÃƒÂ© rapide de votre compte",
        dashboardBalance: "Solde",
        dashboardOrdersInProgress: "Commandes en Cours",
        dashboardActiveConsolidations: "Consolidations Actives",
        dashboardActiveConsolidation: "Consolidation Active",
        dashboardPlanning: "Planification",
        dashboardConsolidationName: "atlas-europe",
        dashboardLocationHamburg: "ist-hambourg",
        dashboardVolume: "Volume",
        dashboardWeight: "Poids",
        dashboardDeparts: "DÃƒÂ©part",
        dashboardContainer: "Conteneur",
        dashboardLiveActivity: "ActivitÃƒÂ© en Direct",
        dashboardActivityPayment:
          "Ã¢â‚¬Â¢ Paiement traitÃƒÂ© pour la commande {{order}} - {{amount}}",
        dashboardActivityConsolidationCapacity:
          "Ã¢â‚¬Â¢ CapacitÃƒÂ© de consolidation '{{consolidation}}' mise ÃƒÂ  jour ÃƒÂ  42%",
        dashboardOrdersAwaiting: "Commandes en attente de consolidation",
        dashboardOrderItem: "machines industrielles",
        dashboardOrderReady: "PrÃƒÂªt",
        dashboardSupplier: "Fournisseur",
        dashboardSupplierAtlas: "atlas manufacturing",
        dashboardSupplierEuro: "euro automotive",
        dashboardOrderValue: "Valeur",
        dashboardYourShipments: "Vos ExpÃƒÂ©ditions",
        dashboardConsolidation: "Consolidation",
        dashboardConsolidationPhoenix: "phoenix",
        dashboardConsolidationDelivered: "LivrÃƒÂ©",
        dashboardCarrier: "Transporteur",
        dashboardCarrierGlobal: "global express",
        dashboardShipped: "ExpÃƒÂ©diÃƒÂ©",
        dashboardConsolidationDelta: "delta",
        dashboardConsolidationInTransit: "En Transit",
        dashboardCarrierMaritime: "logistique maritime",
        dashboardActivityNewSupplierInquiry:
          "Ã¢â‚¬Â¢ Nouvelle demande de fournisseur de '{{supplier}}'",
        dashboardHome: "Tableau de bord",
        dashboardOrders: "Commandes",
        dashboardConsolidations: "Consolidations",
        dashboardShipments: "Expeditions",
        dashboardSuppliers: "Fournisseurs",
        dashboardPayments: "Paiements",
        features: "FonctionnalitÃƒÂ©s",
        howItWorks: "Comment ÃƒÂ§a marche",
        pricing: "Tarifs",
        blog: "Blog",
        getStarted: "Commencer",
        openMenu: "Ouvrir le menu",
        closeMenu: "Fermer le menu",
        smartExportConsolidation:
          "Consolidation des fournisseurs turcs, de bout en bout",
        turkishSupplyChain: "ChaÃƒÂ®ne d'Approvisionnement Turque",
        complexity: "ComplexitÃƒÂ©,",
        heroDescription: `Visualisez chaque commande, consolidation et expedition au meme endroit.
Statuts reels, couts et prochaines actions de l'approvisionnement a la livraison.
Pas besoin de constituer une equipe operations interne juste pour acheter en Turquie.`,
        talkToOurTeam: "Parlez ÃƒÂ  Notre Ãƒâ€°quipe",
        heroTitle: "Arretez de courir apres les fournisseurs turcs.",
        heroSubtitle:
          "Transformez les importations fragmentÃƒÂ©es en consolidation intelligente. RÃƒÂ©duisez les coÃƒÂ»ts de 65% et accÃƒÂ©lÃƒÂ©rez la documentation de 15x avec notre plateforme IA.",
        heroButton: "Commencez Votre Parcours",
        heroSecondaryButton: "Voir la DÃƒÂ©mo",
        complexityTransformed: "ComplexitÃƒÂ© TransformÃƒÂ©e",
        efficiencyDelivered: "EfficacitÃƒÂ© LivrÃƒÂ©e",
        readyToStreamline:
          "PrÃƒÂªt ÃƒÂ  rationaliser votre chaÃƒÂ®ne d'approvisionnement?",
        masterTurkishProcurement:
          "MaÃƒÂ®trisez l'Approvisionnement Turc Comme Jamais Auparavant",
        whyJuggleSuppliers:
          "Pourquoi jongler avec des dizaines de fournisseurs quand vous pouvez tous les orchestrer?",
        consolidateEveryPurchase:
          "Consolidez tous vos achats turcs en une seule expÃƒÂ©dition puissante",
        onePaymentContract: "Un paiement, un contrat, un connaissement",
        maximumEfficiencyStreamlined:
          "EfficacitÃƒÂ© maximale avec des opÃƒÂ©rations rationalisÃƒÂ©es",
        statisticsTitle: "Des RÃƒÂ©sultats Qui Parlent d'Eux-MÃƒÂªmes",
        statisticsSubtitle:
          "DÃƒÂ©couvrez comment notre plateforme de consolidation transforme votre efficacitÃƒÂ© d'approvisionnement",
        fasterDocumentation: "Documentation Plus Rapide",
        singleBillOfLading:
          "Connaissement unique au lieu de plusieurs documents",
        costReduction: "RÃƒÂ©duction des CoÃƒÂ»ts",
        lowerShippingCosts:
          "CoÃƒÂ»ts d'expÃƒÂ©dition rÃƒÂ©duits grÃƒÂ¢ce ÃƒÂ  la consolidation intelligente",
        timeSavings: "Gain de Temps",
        streamlinedProcess:
          "Gestion rationalisÃƒÂ©e du processus d'approvisionnement",
        comparisonTitle:
          "Pourquoi la plupart des gens luttent (et pourquoi pas nous)",
        comparisonSubtitle:
          "DÃƒÂ©couvrez comment Bundleist transforme les processus d'importation fragmentÃƒÂ©s en consolidation rationalisÃƒÂ©e",
        traditionalImports: "L'Ancienne MÃƒÂ©thode :",
        fragmentedComplex: "FragmentÃƒÂ© et Complexe",
        multipleShipments:
          "Chaque fournisseur expÃƒÂ©die sÃƒÂ©parÃƒÂ©ment (cher et lent)",
        multipleShipmentsDesc: "",
        complexDocumentation:
          "Paiements multiples ÃƒÂ  diffÃƒÂ©rents comptes bancaires (risquÃƒÂ©)",
        complexDocumentationDesc: "",
        paymentRisks: "Pile de documents diffÃƒÂ©rents pour la douane (confus)",
        paymentRisksDesc: "",
        responseRate: "Personne n'est responsable si quelque chose tourne mal",
        delays: "",
        protection: "",
        bundleistSolution: "Notre MÃƒÂ©thode :",
        smartConsolidated: "Intelligent et ConsolidÃƒÂ©",
        recommended: "RECOMMANDÃƒâ€°",
        singleConsolidatedShipment:
          "Tout arrive d'abord ÃƒÂ  notre entrepÃƒÂ´t d'Istanbul",
        singleConsolidatedShipmentDesc: "",
        streamlinedDocumentation:
          "Nous vÃƒÂ©rifions, consolidons et expÃƒÂ©dions en une seule unitÃƒÂ©",
        streamlinedDocumentationDesc: "",
        securePaymentHandling:
          "Paiement unique ÃƒÂ  nous, nous gÃƒÂ©rons tous les paiements fournisseurs",
        securePaymentHandlingDesc: "",
        fasterProcess:
          "Un seul point de contact, un seul ensemble de documents",
        costSavings: "Nous sommes responsables de l'ensemble du processus",
        protected: "",
        choosePlan: "Nos Tarifs (Pas de Frais CachÃƒÂ©s)",
        transparentPricing:
          "Tarification transparente qui ÃƒÂ©volue avec les besoins de votre entreprise.",
        starter: "Essai",
        growth: "Croissance",
        enterprise: "Entreprise",
        starterDesc:
          "Parfait pour un essai. Un envoi consolidÃƒÂ©, tous services inclus.",
        growthDesc:
          "Pour les importateurs rÃƒÂ©guliers. Inclut le tableau de bord, le suivi et les tarifs d'expÃƒÂ©dition prÃƒÂ©fÃƒÂ©rentiels.",
        enterpriseDesc:
          "Tarification au volume pour les importateurs sÃƒÂ©rieux. Traitement prioritaire et rapports personnalisÃƒÂ©s.",
        oneTimeFee: "par consolidation",
        totalOrderValue: "de la valeur de commande geree",
        after5Consolidations: "apres 5+ consolidations mensuelles",
        bankTransferFees:
          "Fret, droits et frais destination factures au cout reel.",
        volumeDiscounting:
          "Tarif ajuste selon la stabilite de la lane et le volume mensuel.",
        singleConsolidatedShipmentFeature: "ExpÃƒÂ©dition consolidÃƒÂ©e unique",
        supplierPaymentHandling: "Gestion des paiements fournisseurs",
        singleBillOfLadingFeature: "Connaissement unique",
        documentationSupport: "Support documentation",
        multipleConsolidatedShipments:
          "ExpÃƒÂ©ditions consolidÃƒÂ©es multiples",
        digitalProcurementDashboard:
          "Tableau de bord d'approvisionnement numÃƒÂ©rique",
        realTimeTracking: "Suivi en temps rÃƒÂ©el",
        preferredShippingRates: "Tarifs d'expÃƒÂ©dition prÃƒÂ©fÃƒÂ©rentiels",
        paymentHandlingProtection: "Gestion et protection des paiements",
        volumeDiscountPricing: "Tarification ÃƒÂ  remise sur volume",
        priorityConsolidation: "Consolidation prioritaire",
        customizedShippingSchedule:
          "Calendrier d'expÃƒÂ©dition personnalisÃƒÂ©",
        advancedAnalyticsReporting: "Analyses et rapports avancÃƒÂ©s",
        warehouseStorageOptions: "Options de stockage d'entrepÃƒÂ´t",
        strategicSourcingAssistance:
          "Assistance ÃƒÂ  l'approvisionnement stratÃƒÂ©gique",
        pricingOperatingModel: "Cadre Commercial",
        pricingAllPlansInclude: "Chaque formule inclut",
        pricingAllPlansIncludeDesc:
          "Les controles d'execution restent constants; le rythme et la profondeur de service evoluent avec votre operation.",
        pricingInclusionVerification:
          "Validation du fournisseur et des conditions commerciales",
        pricingInclusionSettlement:
          "Flux de reglement gere avec preuve de paiement",
        pricingInclusionDocumentation:
          "Pack documentaire export avec gouvernance par checklist",
        pricingInclusionTracking:
          "Visibilite des jalons et gestion des exceptions",
        pricingCommercialGuardrail:
          "Sans contrat bloquant. Commencez par un pilote, puis passez au tarif volume quand le rythme est stable.",
        pricingEngagementModel: "Modele d'engagement",
        pricingBestFor: "Ideal pour",
        pricingStarterModel: "Un cycle complet de bout en bout",
        pricingGrowthModel: "Couverture mensuelle recurrente",
        pricingEnterpriseModel: "Lane dediee a fort volume",
        pricingStarterFit:
          "Importateurs qui valident l'adequation du process avec un volume initial limite",
        pricingGrowthFit:
          "Equipes gerant des commandes recurrentes aupres de plusieurs fournisseurs turcs",
        pricingEnterpriseFit:
          "Entreprises operant des lanes stables a fort volume avec exigences SLA plus strictes",
        pricingTierStarter: "Essai",
        pricingTierGrowth: "Croissance",
        pricingTierEnterprise: "Entreprise",
        featuresHeadline:
          "Ne vous demandez plus jamais oÃƒÂ¹ sont vos commandes",
        featuresSubtext:
          'Un tableau de bord qui vous montre vraiment tout. Des dÃƒÂ©tails rÃƒÂ©els, pas de bÃƒÂªtises de "traitement". Fini les e-mails aux fournisseurs ou les interrogations sur les paiements. Connectez-vous et voyez tout en un seul endroit.',
        importConsolidation: "Consolidation d'Importation Turque SimplifiÃƒÂ©e",
        importConsolidationDesc:
          "Regroupez plusieurs commandes de fournisseurs turcs en une seule expÃƒÂ©dition avec un paiement et une documentation uniques.",
        consolidatedShipping: "ExpÃƒÂ©dition ConsolidÃƒÂ©e",
        consolidatedShippingDesc:
          "Combinez plusieurs achats de divers fournisseurs en une seule expÃƒÂ©dition.",
        singleBillOfLadingTitle: "Connaissement Unique",
        singleBillOfLadingDesc:
          "Nous gÃƒÂ©rons la dÃƒÂ©claration d'exportation et crÃƒÂ©ons un connaissement unique.",
        centralizedPayments: "Paiements CentralisÃƒÂ©s",
        centralizedPaymentsDesc:
          "Effectuez un seul paiement au lieu de multiples virements internationaux.",
        simplifiedDocumentation: "Documentation SimplifiÃƒÂ©e",
        simplifiedDocumentationDesc:
          "Nous gÃƒÂ©rons toute la documentation complexe requise.",
        globalCompliance: "ConformitÃƒÂ© Mondiale",
        globalComplianceDesc:
          "Notre plateforme assure la conformitÃƒÂ© avec les rÃƒÂ©glementations commerciales.",
        supplierManagement: "Gestion des Fournisseurs",
        supplierManagementDesc:
          "GÃƒÂ©rez facilement tous vos fournisseurs turcs en un seul endroit.",
        deliveryGuarantee: "Garantie de Livraison",
        deliveryGuaranteeDesc:
          "Nous garantissons que vous recevez tous les biens comme spÃƒÂ©cifiÃƒÂ©.",
        latestInsights: "DerniÃƒÂ¨res Perspectives & Articles de Blog",
        stayUpdatedWithTrends:
          "Restez ÃƒÂ  jour avec les derniÃƒÂ¨res tendances de l'approvisionnement mondial",
        viewAllArticles: "Voir Tous les Articles",
        readMore: "Lire Plus",
        publishedOn: "PubliÃƒÂ© le",
        blogNotFound: "Article de blog non trouvÃƒÂ©",
        backToBlog: "Retour au Blog",
        ourBlog: "Notre Blog",
        insightsAndNews: "Analyses et Actualites",
        createNewContent: "Creer un Nouveau Contenu",
        noNewsYet: "Aucun article d'actualite pour le moment",
        createFirstNews: "Creer la Premiere Actualite",
        contentType: "Type de Contenu",
        blogPost: "Article de Blog",
        industryNews: "Actualites Sectorielles",
        blogPosts: "Articles de Blog",
        insightsOnCrossBorderCommerce:
          "Perspectives sur le Commerce Transfrontalier",
        expertAnalysisDesc:
          "Analyses d'experts, tendances de l'industrie et conseils pratiques pour optimiser votre chaÃƒÂ®ne d'approvisionnement turque.",
        createNewPost: "CrÃƒÂ©er un Nouveau Post",
        allPosts: "Tous les Posts",
        noBlogPostsYet: "Aucun article de blog publiÃƒÂ© pour le moment.",
        createFirstPost: "CrÃƒÂ©er le Premier Post",
        readArticle: "Lire l'Article",
        edit: "Modifier",
        wantToStayUpdated:
          "Vous voulez rester ÃƒÂ  jour avec nos derniÃƒÂ¨res perspectives?",
        exclusiveInsightsDesc:
          "Obtenez des insights exclusifs, les tendances de l'industrie et des analyses d'experts livrÃƒÂ©es directement dans votre boÃƒÂ®te de rÃƒÂ©ception.",
        subscribeToNewsletterBtn: "S'abonner ÃƒÂ  Notre Newsletter",
        loadingBlogPosts: "Chargement des articles de blog...",
        share: "Partager",
        postNotFound: "Post Non TrouvÃƒÂ©",
        blogPostNotExist: "L'article de blog que vous recherchez n'existe pas.",
        General: "GÃƒÂ©nÃƒÂ©ral",
        "Supply Chain": "ChaÃƒÂ®ne d'Approvisionnement",
        "E-commerce": "E-commerce",
        Logistics: "Logistique",
        "International Trade": "Commerce International",
        "Sourcing from TÃƒÂ¼rkiye": "Approvisionnement depuis la TÃƒÂ¼rkiye",
        "Cross Border Procurement": "Approvisionnement Transfrontalier",
        minRead: "min de lecture",
        navigation: "Navigation",
        stayUpdated: "Restez InformÃƒÂ©",
        stayUpdatedDesc:
          "Recevez les derniÃƒÂ¨res mises ÃƒÂ  jour sur l'optimisation de la chaÃƒÂ®ne d'approvisionnement et les insights du commerce international.",
        subscribeNewsletter: "S'abonner ÃƒÂ  la Newsletter",
        privacyPolicy: "Politique de ConfidentialitÃƒÂ©",
        termsOfService: "Conditions d'Utilisation",
        allRightsReserved: "Tous droits rÃƒÂ©servÃƒÂ©s.",
        madeWith: "Fait avec",
        inIstanbul: "ÃƒÂ  Istanbul",
        brandTagline: "Simplification des Achats Transfrontaliers",
        brandDesc:
          "Transformez votre chaÃƒÂ®ne d'approvisionnement turque avec des services de consolidation intelligents. RÃƒÂ©duisez les coÃƒÂ»ts, optimisez la logistique et dÃƒÂ©veloppez votre entreprise internationale en toute confiance.",
        contactEmail: "bundleist@gmail.com",
        locationIstanbul: "Istanbul, Turquie",
        dashboardAlt: "Interface du tableau de bord Bundleist",
        findSuppliers: "Envoyez-nous Vos Commandes",
        findSuppliersDesc:
          "TransfÃƒÂ©rez vos factures proforma de tous les fournisseurs turcs. Vous n'avez pas de fournisseurs ? Nous vous enverrons 3 options ÃƒÂ  choisir.",
        supplierVerification: "VÃƒÂ©rification des Fournisseurs",
        supplierVerificationDesc:
          "Notre ÃƒÂ©quipe vÃƒÂ©rifiera vos fournisseurs et aprÃƒÂ¨s confirmation, nous signerons un contrat cadre pour agir en votre nom.",
        paymentProcessing: "Traitement des Paiements",
        paymentProcessingDesc:
          "Nous gÃƒÂ©rerons tous vos paiements de commandes en votre nom ÃƒÂ  partir de votre solde de compte avec une transparence complÃƒÂ¨te.",
        orderConsolidation: "Consolidation des Commandes",
        orderConsolidationDesc:
          "Notre ÃƒÂ©quipe recevra et vÃƒÂ©rifiera toutes vos commandes, puis les combinera en un seul envoi optimisÃƒÂ©.",
        documentationSimplified: "Documentation SimplifiÃƒÂ©e",
        documentationSimplifiedDesc:
          "Nous gÃƒÂ©rons toute la paperasse d'exportation, les formulaires douaniers et crÃƒÂ©ons un seul connaissement pour votre envoi consolidÃƒÂ©.",
        globalShipping: "ExpÃƒÂ©dition Mondiale",
        globalShippingDesc:
          "Votre commande consolidÃƒÂ©e est expÃƒÂ©diÃƒÂ©e vers votre destination avec suivi en temps rÃƒÂ©el et mises ÃƒÂ  jour.",
        easyDelivery: "Livraison Facile",
        easyDeliveryDesc:
          "Recevez vos multiples commandes comme un seul envoi, ÃƒÂ©conomisant du temps et rÃƒÂ©duisant la complexitÃƒÂ© douaniÃƒÂ¨re.",
        saveShippingCosts:
          "Ãƒâ€°conomisez jusqu'ÃƒÂ  40% sur les coÃƒÂ»ts d'expÃƒÂ©dition",
        reduceDocumentation: "RÃƒÂ©duit la documentation de 70%",
        onePaymentAllSuppliers: "Un paiement pour tous les fournisseurs",
        digitalFirstApproach: "Approche numÃƒÂ©rique prioritaire",
        countriesSupported: "150+ pays supportÃƒÂ©s",
        unlimitedSupplierNetwork: "RÃƒÂ©seau de fournisseurs illimitÃƒÂ©",
        onTimeDeliveryRate: "99,5% de taux de livraison ÃƒÂ  temps",
        mostPopularFeature: "FonctionnalitÃƒÂ© la Plus Populaire",
        essentialFeature: "FonctionnalitÃƒÂ© Essentielle",
        premiumSupportIncluded: "Support Premium Inclus",
        simpleProcess: "Processus Simple",
        howItWorksDesc:
          "Notre processus rationalisÃƒÂ© rend l'approvisionnement et l'expÃƒÂ©dition depuis la Turquie simples grÃƒÂ¢ce ÃƒÂ  une technologie de pointe et un support expert.",
        start: "DÃƒâ€°BUT",
        done: "FINI",
        fullName: "Nom Complet",
        businessEmail: "E-mail Professionnel",
        company: "Entreprise",
        companyOptional: "Entreprise (Optionnel)",
        whyInterested: "Pourquoi ÃƒÂªtes-vous intÃƒÂ©ressÃƒÂ© par Bundleist?",
        whatInterests:
          "Qu'est-ce qui vous intÃƒÂ©resse le plus chez Bundleist?",
        tellUsAboutNeeds:
          "Parlez-nous de vos besoins commerciaux et comment Bundleist peut vous aider...",
        tellUsInterests:
          "Dites-nous quels aspects de nos solutions de chaÃƒÂ®ne d'approvisionnement vous intÃƒÂ©ressent le plus...",
        submitting: "Envoi en cours...",
        requestEarlyAccess: "Demander l'AccÃƒÂ¨s AnticipÃƒÂ©",
        subscribe: "S'abonner",
        backToHome: "Retour ÃƒÂ  l'accueil",
        subscribeToOurNewsletter: "S'abonner ÃƒÂ  Notre Newsletter",
        getStartedPage: "Commencer",
        getStartedDesc:
          "Commencez avec les solutions innovantes de chaÃƒÂ®ne d'approvisionnement de Bundleist et rationalisez votre gestion des fournisseurs turcs.",
        newsletterDesc:
          "Restez informÃƒÂ© des derniÃƒÂ¨res nouvelles et mises ÃƒÂ  jour des solutions innovantes de chaÃƒÂ®ne d'approvisionnement de Bundleist.",
        neverShareEmail:
          "Nous ne partagerons jamais votre email avec qui que ce soit.",
        requestSubmittedSuccess: "Demande soumise avec succÃƒÂ¨s!",
        newsletterSubscriptionSuccess:
          "Abonnement ÃƒÂ  la newsletter rÃƒÂ©ussi!",
        thankYouInterest:
          "Merci pour votre intÃƒÂ©rÃƒÂªt envers Bundleist. Nous vous contacterons bientÃƒÂ´t.",
        successfullySubscribed:
          "AbonnÃƒÂ© avec succÃƒÂ¨s ÃƒÂ  notre newsletter! Nous vous tiendrons informÃƒÂ©.",
        submissionError: "Erreur de Soumission",
        failedToSubmit:
          "Ãƒâ€°chec de la soumission de votre demande. Veuillez rÃƒÂ©essayer.",
        emailAlreadyRegistered:
          "Cet email a dÃƒÂ©jÃƒÂ  ÃƒÂ©tÃƒÂ© enregistrÃƒÂ© pour l'accÃƒÂ¨s anticipÃƒÂ©.",
        emailAlreadySubscribed:
          "Cet email est dÃƒÂ©jÃƒÂ  abonnÃƒÂ© ÃƒÂ  notre newsletter.",
        resultsFreightValue: "Fret/unite",
        resultsPaymentValue: "Charge frais",
        resultsExceptionsValue: "Exceptions",
        homeSeoTitle:
          "Consolidation fournisseurs turcs et operations export | Bundleist",
        homeSeoDescription:
          "Bundleist coordinates supplier validation, managed settlements, Istanbul warehouse consolidation, and export documentation in one accountable workflow.",
        homeSeoKeywords:
          "turkish supplier consolidation, export operations turkey, import consolidation workflow, istanbul consolidation warehouse, supplier settlement workflow, export documentation management, b2b procurement turkey, freight consolidation service",
        comparisonBadge: "Sans hype. Realite operationnelle.",
        comparisonDisclaimer:
          "Les resultats dependent de la preparation fournisseur, du mix de commandes et de la destination.",
        fromTheBlog: "Depuis le blog",
        newsletterNoSpam:
          "No spam. Product updates and export consolidation insights only.",
        newsletterEmailPlaceholder: "vous@entreprise.com",
        subscribed: "Abonne",
        newsletterThanks: "Merci pour votre abonnement.",
        invalidEmailAddress: "Veuillez saisir une adresse e-mail valide.",
        genericTryAgain: "Un probleme est survenu. Veuillez reessayer.",
        footerContact: "Contact",
        footerBuiltFor:
          "Concu pour les equipes achats, transitaires et operations.",
        heroOpsConsole: "Console ops",
        heroSearchId: "Rechercher ID",
        heroNavRelationships: "Relations",
        heroNavShipments: "Shipments",
        heroNavLedger: "Ledger",
        heroMockTitle: "Mixed consolidation, one ledger",
        heroMockSubtitle:
          "Orders and customers roll up into one container shipment. Costs are distributed with audit trail.",
        heroOrdersMeta: "8 ready, 4 in QC",
        heroCustomers: "Clients",
        heroCustomersMeta: "Mixed consolidation",
        heroConsolidationMeta: "2 mixtes, 1 en transit",
        heroOrderIdA: "ORD-2847",
        heroOrderVolumeA: "2.10 m3",
        heroOrderIdB: "ORD-2910",
        heroOrderVolumeB: "1.40 m3",
        heroConsolidationCode: "CON-ATLAS (Mixte)",
        heroShipmentCode: "SHP-HMB",
        heroDelta: "Ecart",
        heroActualVsBilled: "Actual vs billed",
        heroRelationshipFlow: "Relationship flow",
        heroVolumeProportional: "Volume proportional",
        heroNeedsActualCost: "Awaiting final cost",
        heroCustomersCount: "4 customers",
        heroShipmentInTransit: "In transit",
        heroLedgerNet: "Ledger net +$12,340",
        heroCapacity: "Capacity",
        heroExceptions: "Exceptions",
        heroNeedAction: "action requise",
        heroMissingActualShippingCost: "Missing actual shipping cost",
        heroDistributionReadyAfterCostSet: "Distribution ready after cost set",
      },
    },
    ar: {
      translation: {
        dashboardWelcome: "Ã˜Â£Ã™â€¡Ã™â€Ã˜Â§Ã™â€¹ Ã˜Â¨Ã™Æ’Ã˜Å’ {{name}}",
        dashboardGrowth: "Ã™â€ Ã™â€¦Ã™Ë†",
        dashboardQuickSummary:
          "Ã™â€¡Ã™â€ Ã˜Â§ Ã™â€¦Ã™â€Ã˜Â®Ã˜Âµ Ã˜Â³Ã˜Â±Ã™Å Ã˜Â¹ Ã™â€Ã˜Â­Ã˜Â³Ã˜Â§Ã˜Â¨Ã™Æ’",
        dashboardBalance: "Ã˜Â§Ã™â€Ã˜Â±Ã˜ÂµÃ™Å Ã˜Â¯",
        dashboardOrdersInProgress:
          "Ã˜Â·Ã™â€Ã˜Â¨Ã˜Â§Ã˜Âª Ã™â€šÃ™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜ÂªÃ™â€ Ã™ÂÃ™Å Ã˜Â°",
        dashboardActiveConsolidations:
          "Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã™â€ Ã˜Â´Ã˜Â·Ã˜Â©",
        dashboardActiveConsolidation:
          "Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã™â€ Ã˜Â´Ã˜Â·",
        dashboardPlanning: "Ã˜ÂªÃ˜Â®Ã˜Â·Ã™Å Ã˜Â·",
        dashboardConsolidationName: "Ã˜Â£Ã˜Â·Ã™â€Ã˜Â³-Ã˜Â£Ã™Ë†Ã˜Â±Ã™Ë†Ã˜Â¨Ã˜Â§",
        dashboardLocationHamburg:
          "Ã˜Â§Ã˜Â³Ã˜Â·Ã™â€ Ã˜Â¨Ã™Ë†Ã™â€-Ã™â€¡Ã˜Â§Ã™â€¦Ã˜Â¨Ã™Ë†Ã˜Â±Ã˜Âº",
        dashboardVolume: "Ã˜Â§Ã™â€Ã˜Â­Ã˜Â¬Ã™â€¦",
        dashboardWeight: "Ã˜Â§Ã™â€Ã™Ë†Ã˜Â²Ã™â€ ",
        dashboardDeparts: "Ã™Å Ã˜ÂºÃ˜Â§Ã˜Â¯Ã˜Â±",
        dashboardContainer: "Ã˜Â­Ã˜Â§Ã™Ë†Ã™Å Ã˜Â©",
        dashboardLiveActivity:
          "Ã˜Â§Ã™â€Ã™â€ Ã˜Â´Ã˜Â§Ã˜Â· Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¨Ã˜Â§Ã˜Â´Ã˜Â±",
        dashboardActivityPayment:
          "Ã¢â‚¬Â¢ Ã˜ÂªÃ™â€¦Ã˜Âª Ã™â€¦Ã˜Â¹Ã˜Â§Ã™â€Ã˜Â¬Ã˜Â© Ã˜Â§Ã™â€Ã˜Â¯Ã™ÂÃ˜Â¹ Ã™â€Ã™â€Ã˜Â·Ã™â€Ã˜Â¨ {{order}} - {{amount}}",
        dashboardActivityConsolidationCapacity:
          "Ã¢â‚¬Â¢ Ã˜ÂªÃ™â€¦ Ã˜ÂªÃ˜Â­Ã˜Â¯Ã™Å Ã˜Â« Ã˜Â³Ã˜Â¹Ã˜Â© Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ '{{consolidation}}' Ã˜Â¥Ã™â€Ã™â€° 42%",
        dashboardOrdersAwaiting:
          "Ã˜Â·Ã™â€Ã˜Â¨Ã˜Â§Ã˜Âª Ã˜ÂªÃ™â€ Ã˜ÂªÃ˜Â¸Ã˜Â± Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯",
        dashboardOrderItem: "Ã˜Â¢Ã™â€Ã˜Â§Ã˜Âª Ã˜ÂµÃ™â€ Ã˜Â§Ã˜Â¹Ã™Å Ã˜Â©",
        dashboardOrderReady: "Ã˜Â¬Ã˜Â§Ã™â€¡Ã˜Â²",
        dashboardSupplier: "Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯",
        dashboardSupplierAtlas:
          "Ã˜Â£Ã˜Â·Ã™â€Ã˜Â³ Ã™â€Ã™â€Ã˜ÂªÃ˜ÂµÃ™â€ Ã™Å Ã˜Â¹",
        dashboardSupplierEuro:
          "Ã™Å Ã™Ë†Ã˜Â±Ã™Ë† Ã™â€Ã™â€Ã˜Â³Ã™Å Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª",
        dashboardOrderValue: "Ã˜Â§Ã™â€Ã™â€šÃ™Å Ã™â€¦Ã˜Â©",
        dashboardYourShipments: "Ã˜Â´Ã˜Â­Ã™â€ Ã˜Â§Ã˜ÂªÃ™Æ’",
        dashboardConsolidation: "Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯",
        dashboardConsolidationPhoenix: "Ã™ÂÃ™Å Ã™â€ Ã™Å Ã™Æ’Ã˜Â³",
        dashboardConsolidationDelivered:
          "Ã˜ÂªÃ™â€¦ Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜ÂµÃ™Å Ã™â€",
        dashboardCarrier: "Ã˜Â§Ã™â€Ã™â€ Ã˜Â§Ã™â€šÃ™â€",
        dashboardCarrierGlobal:
          "Ã˜Â¬Ã™â€Ã™Ë†Ã˜Â¨Ã˜Â§Ã™â€ Ã˜Â¥Ã™Æ’Ã˜Â³Ã˜Â¨Ã˜Â±Ã™Å Ã˜Â³",
        dashboardShipped: "Ã˜ÂªÃ™â€¦ Ã˜Â§Ã™â€Ã˜Â´Ã˜Â­Ã™â€ ",
        dashboardConsolidationDelta: "Ã˜Â¯Ã™â€Ã˜ÂªÃ˜Â§",
        dashboardConsolidationInTransit: "Ã™â€šÃ™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã™â€ Ã™â€šÃ™â€",
        dashboardCarrierMaritime:
          "Ã˜Â§Ã™â€Ã™â€Ã™Ë†Ã˜Â¬Ã˜Â³Ã˜ÂªÃ™Å Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã˜Â¨Ã˜Â­Ã˜Â±Ã™Å Ã˜Â©",
        dashboardActivityNewSupplierInquiry:
          "Ã¢â‚¬Â¢ Ã˜Â§Ã˜Â³Ã˜ÂªÃ™ÂÃ˜Â³Ã˜Â§Ã˜Â± Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯ Ã˜Â¬Ã˜Â¯Ã™Å Ã˜Â¯ Ã™â€¦Ã™â€  '{{supplier}}'",
        dashboardHome: "Ã™â€Ã™Ë†Ã˜Â­Ã˜Â© Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â­Ã™Æ’Ã™â€¦",
        dashboardOrders: "Ã˜Â§Ã™â€Ã˜Â·Ã™â€Ã˜Â¨Ã˜Â§Ã˜Âª",
        dashboardConsolidations: "Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯Ã˜Â§Ã˜Âª",
        dashboardShipments: "Ã˜Â§Ã™â€Ã˜Â´Ã˜Â­Ã™â€ Ã˜Â§Ã˜Âª",
        dashboardSuppliers: "Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Ë†Ã™â€ ",
        dashboardPayments: "Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¯Ã™ÂÃ™Ë†Ã˜Â¹Ã˜Â§Ã˜Âª",
        features: "Ã˜Â§Ã™â€Ã™â€¦Ã™Å Ã˜Â²Ã˜Â§Ã˜Âª",
        howItWorks: "Ã™Æ’Ã™Å Ã™Â Ã™â€ Ã˜Â¹Ã™â€¦Ã™â€",
        pricing: "Ã˜Â§Ã™â€Ã˜Â£Ã˜Â³Ã˜Â¹Ã˜Â§Ã˜Â±",
        blog: "Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¯Ã™Ë†Ã™â€ Ã˜Â©",
        getStarted: "Ã˜Â§Ã˜Â¨Ã˜Â¯Ã˜Â£",
        smartExportConsolidation:
          "Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€  Ã˜Â§Ã™â€Ã˜Â£Ã˜ÂªÃ˜Â±Ã˜Â§Ã™Æ’ Ã™â€¦Ã™â€  Ã˜Â§Ã™â€Ã˜Â¨Ã˜Â¯Ã˜Â§Ã™Å Ã˜Â© Ã˜Â¥Ã™â€Ã™â€° Ã˜Â§Ã™â€Ã™â€ Ã™â€¡Ã˜Â§Ã™Å Ã˜Â©",
        turkishSupplyChain:
          "Ã˜Â³Ã™â€Ã˜Â³Ã™â€Ã˜Â© Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â±Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â±Ã™Æ’Ã™Å Ã˜Â©",
        complexity: "Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â¹Ã™â€šÃ™Å Ã˜Â¯Ã˜Å’",
        heroDescription: `Ã˜Â´Ã˜Â§Ã™â€¡Ã˜Â¯ Ã™Æ’Ã™â€ Ã˜Â·Ã™â€Ã˜Â¨ Ã™Ë†Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ Ã™Ë†Ã˜Â´Ã˜Â­Ã™â€ Ã˜Â© Ã™ÂÃ™Å  Ã™â€¦Ã™Æ’Ã˜Â§Ã™â€  Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯.
Ã˜Â­Ã˜Â§Ã™â€Ã˜Â§Ã˜Âª Ã™ÂÃ˜Â¹Ã™â€Ã™Å Ã˜Â© Ã™Ë†Ã˜ÂªÃ™Æ’Ã˜Â§Ã™â€Ã™Å Ã™Â Ã™Ë†Ã˜Â§Ã™â€Ã˜Â¥Ã˜Â¬Ã˜Â±Ã˜Â§Ã˜Â¡Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â§Ã™â€Ã™Å Ã˜Â© Ã™â€¦Ã™â€  Ã˜Â§Ã™â€Ã˜Â´Ã˜Â±Ã˜Â§Ã˜Â¡ Ã˜Â­Ã˜ÂªÃ™â€° Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â³Ã™â€Ã™Å Ã™â€¦.
Ã™â€Ã˜Â§ Ã˜Â­Ã˜Â§Ã˜Â¬Ã˜Â© Ã™â€Ã˜Â¨Ã™â€ Ã˜Â§Ã˜Â¡ Ã™ÂÃ˜Â±Ã™Å Ã™â€š Ã˜Â¹Ã™â€¦Ã™â€Ã™Å Ã˜Â§Ã˜Âª Ã˜Â¯Ã˜Â§Ã˜Â®Ã™â€Ã™Å  Ã™ÂÃ™â€šÃ˜Â· Ã™â€Ã™â€Ã˜Â´Ã˜Â±Ã˜Â§Ã˜Â¡ Ã™â€¦Ã™â€  Ã˜ÂªÃ˜Â±Ã™Æ’Ã™Å Ã˜Â§.`,
        talkToOurTeam:
          "Ã˜ÂªÃ˜Â­Ã˜Â¯Ã˜Â« Ã˜Â¥Ã™â€Ã™â€° Ã™ÂÃ˜Â±Ã™Å Ã™â€šÃ™â€ Ã˜Â§",
        heroTitle:
          "Ã˜ÂªÃ™Ë†Ã™â€šÃ™Â Ã˜Â¹Ã™â€  Ã™â€¦Ã™â€Ã˜Â§Ã˜Â­Ã™â€šÃ˜Â© Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€  Ã˜Â§Ã™â€Ã˜Â£Ã˜ÂªÃ˜Â±Ã˜Â§Ã™Æ’.",
        heroSubtitle:
          "Ã˜Â­Ã™Ë†Ã™â€˜Ã™â€ Ã˜Â§Ã™â€Ã™Ë†Ã˜Â§Ã˜Â±Ã˜Â¯Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¬Ã˜Â²Ã˜Â£Ã˜Â© Ã˜Â¥Ã™â€Ã™â€° Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ Ã˜Â°Ã™Æ’Ã™Å . Ã™â€šÃ™â€Ã™â€ Ã˜Â§Ã™â€Ã˜ÂªÃ™Æ’Ã˜Â§Ã™â€Ã™Å Ã™Â Ã˜Â¨Ã™â€ Ã˜Â³Ã˜Â¨Ã˜Â© 65% Ã™Ë†Ã˜Â³Ã˜Â±Ã™â€˜Ã˜Â¹ Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â«Ã™Å Ã™â€š 15 Ã™â€¦Ã˜Â±Ã˜Â© Ã˜Â¨Ã˜Â§Ã˜Â³Ã˜ÂªÃ˜Â®Ã˜Â¯Ã˜Â§Ã™â€¦ Ã™â€¦Ã™â€ Ã˜ÂµÃ˜ÂªÃ™â€ Ã˜Â§ Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¯Ã˜Â¹Ã™Ë†Ã™â€¦Ã˜Â© Ã˜Â¨Ã˜Â§Ã™â€Ã˜Â°Ã™Æ’Ã˜Â§Ã˜Â¡ Ã˜Â§Ã™â€Ã˜Â§Ã˜ÂµÃ˜Â·Ã™â€ Ã˜Â§Ã˜Â¹Ã™Å .",
        heroButton: "Ã˜Â§Ã˜Â¨Ã˜Â¯Ã˜Â£ Ã˜Â±Ã˜Â­Ã™â€Ã˜ÂªÃ™Æ’",
        heroSecondaryButton:
          "Ã˜Â´Ã˜Â§Ã™â€¡Ã˜Â¯ Ã˜Â§Ã™â€Ã˜Â¹Ã˜Â±Ã˜Â¶ Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â¶Ã™Å Ã˜Â­Ã™Å ",
        complexityTransformed:
          "Ã˜ÂªÃ˜Â­Ã™Ë†Ã™Å Ã™â€ Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â¹Ã™â€šÃ™Å Ã˜Â¯",
        efficiencyDelivered:
          "Ã˜ÂªÃ˜Â­Ã™â€šÃ™Å Ã™â€š Ã˜Â§Ã™â€Ã™Æ’Ã™ÂÃ˜Â§Ã˜Â¡Ã˜Â©",
        readyToStreamline:
          "Ã™â€¡Ã™â€ Ã˜Â£Ã™â€ Ã˜Âª Ã™â€¦Ã˜Â³Ã˜ÂªÃ˜Â¹Ã˜Â¯ Ã™â€Ã˜ÂªÃ˜Â¨Ã˜Â³Ã™Å Ã˜Â· Ã˜Â³Ã™â€Ã˜Â³Ã™â€Ã˜Â© Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â±Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜Â®Ã˜Â§Ã˜ÂµÃ˜Â© Ã˜Â¨Ã™Æ’Ã˜Å¸",
        masterTurkishProcurement:
          "Ã˜Â£Ã˜ÂªÃ™â€šÃ™â€  Ã˜Â§Ã™â€Ã™â€¦Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Å Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â±Ã™Æ’Ã™Å Ã˜Â© Ã™Æ’Ã™â€¦Ã˜Â§ Ã™â€Ã™â€¦ Ã™Å Ã˜Â­Ã˜Â¯Ã˜Â« Ã™â€¦Ã™â€  Ã™â€šÃ˜Â¨Ã™â€",
        whyJuggleSuppliers:
          "Ã™â€Ã™â€¦Ã˜Â§Ã˜Â°Ã˜Â§ Ã˜ÂªÃ˜ÂªÃ˜Â¹Ã˜Â§Ã™â€¦Ã™â€ Ã™â€¦Ã˜Â¹ Ã˜Â¹Ã˜Â´Ã˜Â±Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€  Ã˜Â¨Ã™Å Ã™â€ Ã™â€¦Ã˜Â§ Ã™Å Ã™â€¦Ã™Æ’Ã™â€ Ã™Æ’ Ã˜ÂªÃ™â€ Ã˜Â³Ã™Å Ã™â€šÃ™â€¡Ã™â€¦ Ã˜Â¬Ã™â€¦Ã™Å Ã˜Â¹Ã™â€¹Ã˜Â§Ã˜Å¸",
        consolidateEveryPurchase:
          "Ã™â€šÃ™â€¦ Ã˜Â¨Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ Ã™Æ’Ã™â€ Ã™â€¦Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’ Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â±Ã™Æ’Ã™Å Ã˜Â© Ã™ÂÃ™Å  Ã˜Â´Ã˜Â­Ã™â€ Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â© Ã™â€šÃ™Ë†Ã™Å Ã˜Â©",
        onePaymentContract:
          "Ã˜Â¯Ã™ÂÃ˜Â¹Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â©Ã˜Å’ Ã˜Â¹Ã™â€šÃ˜Â¯ Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Å’ Ã˜Â¨Ã™Ë†Ã™â€Ã™Å Ã˜ÂµÃ˜Â© Ã˜Â´Ã˜Â­Ã™â€  Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â©",
        maximumEfficiencyStreamlined:
          "Ã˜Â£Ã™â€šÃ˜ÂµÃ™â€° Ã™â€šÃ˜Â¯Ã˜Â± Ã™â€¦Ã™â€  Ã˜Â§Ã™â€Ã™Æ’Ã™ÂÃ˜Â§Ã˜Â¡Ã˜Â© Ã™â€¦Ã˜Â¹ Ã˜Â§Ã™â€Ã˜Â¹Ã™â€¦Ã™â€Ã™Å Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¨Ã˜Â³Ã˜Â·Ã˜Â©",
        statisticsTitle:
          "Ã˜Â§Ã™â€Ã™â€ Ã˜ÂªÃ˜Â§Ã˜Â¦Ã˜Â¬ Ã˜ÂªÃ˜ÂªÃ˜Â­Ã˜Â¯Ã˜Â« Ã˜Â¹Ã™â€  Ã™â€ Ã™ÂÃ˜Â³Ã™â€¡Ã˜Â§",
        statisticsSubtitle:
          "Ã˜Â´Ã˜Â§Ã™â€¡Ã˜Â¯ Ã™Æ’Ã™Å Ã™Â Ã˜ÂªÃ˜Â­Ã™Ë†Ã™â€ Ã™â€¦Ã™â€ Ã˜ÂµÃ˜Â© Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ Ã™â€Ã˜Â¯Ã™Å Ã™â€ Ã˜Â§ Ã™Æ’Ã™ÂÃ˜Â§Ã˜Â¡Ã˜Â© Ã™â€¦Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’",
        fasterDocumentation: "Ã˜ÂªÃ™Ë†Ã˜Â«Ã™Å Ã™â€š Ã˜Â£Ã˜Â³Ã˜Â±Ã˜Â¹",
        singleBillOfLading:
          "Ã˜Â¨Ã™Ë†Ã™â€Ã™Å Ã˜ÂµÃ˜Â© Ã˜Â´Ã˜Â­Ã™â€  Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â© Ã˜Â¨Ã˜Â¯Ã™â€Ã˜Â§Ã™â€¹ Ã™â€¦Ã™â€  Ã™â€¦Ã˜Â³Ã˜ÂªÃ™â€ Ã˜Â¯Ã˜Â§Ã˜Âª Ã™â€¦Ã˜ÂªÃ˜Â¹Ã˜Â¯Ã˜Â¯Ã˜Â©",
        costReduction: "Ã˜ÂªÃ˜Â®Ã™ÂÃ™Å Ã˜Â¶ Ã˜Â§Ã™â€Ã˜ÂªÃ™Æ’Ã˜Â§Ã™â€Ã™Å Ã™Â",
        lowerShippingCosts:
          "Ã˜Â§Ã™â€ Ã˜Â®Ã™ÂÃ˜Â§Ã˜Â¶ Ã˜ÂªÃ™Æ’Ã˜Â§Ã™â€Ã™Å Ã™Â Ã˜Â§Ã™â€Ã˜Â´Ã˜Â­Ã™â€  Ã™â€¦Ã™â€  Ã˜Â®Ã™â€Ã˜Â§Ã™â€ Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜Â°Ã™Æ’Ã™Å ",
        timeSavings: "Ã˜ÂªÃ™Ë†Ã™ÂÃ™Å Ã˜Â± Ã˜Â§Ã™â€Ã™Ë†Ã™â€šÃ˜Âª",
        streamlinedProcess:
          "Ã˜Â¥Ã˜Â¯Ã˜Â§Ã˜Â±Ã˜Â© Ã™â€¦Ã˜Â¨Ã˜Â³Ã˜Â·Ã˜Â© Ã™â€Ã˜Â¹Ã™â€¦Ã™â€Ã™Å Ã˜Â© Ã˜Â§Ã™â€Ã˜Â´Ã˜Â±Ã˜Â§Ã˜Â¡",
        comparisonTitle:
          "Ã™â€Ã™â€¦Ã˜Â§Ã˜Â°Ã˜Â§ Ã™Å Ã˜Â¹Ã˜Â§Ã™â€ Ã™Å  Ã™â€¦Ã˜Â¹Ã˜Â¸Ã™â€¦ Ã˜Â§Ã™â€Ã™â€ Ã˜Â§Ã˜Â³ (Ã™Ë†Ã™â€Ã™â€¦Ã˜Â§Ã˜Â°Ã˜Â§ Ã™â€Ã˜Â§ Ã™â€ Ã˜Â¹Ã˜Â§Ã™â€ Ã™Å  Ã™â€ Ã˜Â­Ã™â€ )",
        comparisonSubtitle:
          "Ã˜Â´Ã˜Â§Ã™â€¡Ã˜Â¯ Ã™Æ’Ã™Å Ã™Â Ã™Å Ã˜Â­Ã™Ë†Ã™â€ Bundleist Ã˜Â¹Ã™â€¦Ã™â€Ã™Å Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã˜Â§Ã˜Â³Ã˜ÂªÃ™Å Ã˜Â±Ã˜Â§Ã˜Â¯ Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¬Ã˜Â²Ã˜Â£Ã˜Â© Ã˜Â¥Ã™â€Ã™â€° Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ Ã™â€¦Ã˜Â¨Ã˜Â³Ã˜Â·",
        traditionalImports:
          "Ã˜Â§Ã™â€Ã˜Â·Ã˜Â±Ã™Å Ã™â€šÃ˜Â© Ã˜Â§Ã™â€Ã™â€šÃ˜Â¯Ã™Å Ã™â€¦Ã˜Â©:",
        fragmentedComplex: "Ã™â€¦Ã˜Â¬Ã˜Â²Ã˜Â£Ã˜Â© Ã™Ë†Ã™â€¦Ã˜Â¹Ã™â€šÃ˜Â¯Ã˜Â©",
        multipleShipments:
          "Ã™Å Ã˜Â´Ã˜Â­Ã™â€  Ã™Æ’Ã™â€ Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯ Ã˜Â¹Ã™â€Ã™â€° Ã˜Â­Ã˜Â¯Ã˜Â© (Ã™â€¦Ã™Æ’Ã™â€Ã™Â Ã™Ë†Ã˜Â¨Ã˜Â·Ã™Å Ã˜Â¡)",
        multipleShipmentsDesc: "",
        complexDocumentation:
          "Ã™â€¦Ã˜Â¯Ã™ÂÃ™Ë†Ã˜Â¹Ã˜Â§Ã˜Âª Ã™â€¦Ã˜ÂªÃ˜Â¹Ã˜Â¯Ã˜Â¯Ã˜Â© Ã™â€Ã˜Â­Ã˜Â³Ã˜Â§Ã˜Â¨Ã˜Â§Ã˜Âª Ã˜Â¨Ã™â€ Ã™Æ’Ã™Å Ã˜Â© Ã™â€¦Ã˜Â®Ã˜ÂªÃ™â€Ã™ÂÃ˜Â© (Ã™â€¦Ã˜Â­Ã™ÂÃ™Ë†Ã™ÂÃ˜Â© Ã˜Â¨Ã˜Â§Ã™â€Ã™â€¦Ã˜Â®Ã˜Â§Ã˜Â·Ã˜Â±)",
        complexDocumentationDesc: "",
        paymentRisks:
          "Ã™Æ’Ã™Ë†Ã™â€¦Ã˜Â© Ã™â€¦Ã™â€  Ã˜Â§Ã™â€Ã™â€¦Ã˜Â³Ã˜ÂªÃ™â€ Ã˜Â¯Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã™â€¦Ã˜Â®Ã˜ÂªÃ™â€Ã™ÂÃ˜Â© Ã™â€Ã™â€Ã˜Â¬Ã™â€¦Ã˜Â§Ã˜Â±Ã™Æ’ (Ã™â€¦Ã˜Â±Ã˜Â¨Ã™Æ’Ã˜Â©)",
        paymentRisksDesc: "",
        responseRate:
          "Ã™â€Ã˜Â§ Ã˜Â£Ã˜Â­Ã˜Â¯ Ã™â€¦Ã˜Â³Ã˜Â¤Ã™Ë†Ã™â€ Ã˜Â¥Ã˜Â°Ã˜Â§ Ã˜Â­Ã˜Â¯Ã˜Â« Ã˜Â®Ã˜Â·Ã˜Â£ Ã™â€¦Ã˜Â§",
        delays: "",
        protection: "",
        bundleistSolution: "Ã˜Â·Ã˜Â±Ã™Å Ã™â€šÃ˜ÂªÃ™â€ Ã˜Â§:",
        smartConsolidated: "Ã˜Â°Ã™Æ’Ã™Å  Ã™Ë†Ã™â€¦Ã™Ë†Ã˜Â­Ã˜Â¯",
        recommended: "Ã™â€¦Ã™Ë†Ã˜ÂµÃ™â€° Ã˜Â¨Ã™â€¡",
        singleConsolidatedShipment:
          "Ã™Å Ã˜ÂµÃ™â€ Ã™Æ’Ã™â€ Ã˜Â´Ã™Å Ã˜Â¡ Ã˜Â¥Ã™â€Ã™â€° Ã™â€¦Ã˜Â³Ã˜ÂªÃ™Ë†Ã˜Â¯Ã˜Â¹Ã˜Â§Ã˜ÂªÃ™â€ Ã˜Â§ Ã™ÂÃ™Å  Ã˜Â§Ã˜Â³Ã˜Â·Ã™â€ Ã˜Â¨Ã™Ë†Ã™â€ Ã˜Â£Ã™Ë†Ã™â€Ã˜Â§Ã™â€¹",
        singleConsolidatedShipmentDesc: "",
        streamlinedDocumentation:
          "Ã™â€ Ã™â€šÃ™Ë†Ã™â€¦ Ã˜Â¨Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â­Ã™â€šÃ™â€š Ã™Ë†Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ Ã™Ë†Ã˜Â§Ã™â€Ã˜Â´Ã˜Â­Ã™â€  Ã™Æ’Ã™Ë†Ã˜Â­Ã˜Â¯Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â©",
        streamlinedDocumentationDesc: "",
        securePaymentHandling:
          "Ã˜Â¯Ã™ÂÃ˜Â¹Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â© Ã™â€Ã™â€ Ã˜Â§Ã˜Å’ Ã™Ë†Ã™â€ Ã˜ÂªÃ˜Â¹Ã˜Â§Ã™â€¦Ã™â€ Ã™â€¦Ã˜Â¹ Ã˜Â¬Ã™â€¦Ã™Å Ã˜Â¹ Ã™â€¦Ã˜Â¯Ã™ÂÃ™Ë†Ã˜Â¹Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€ ",
        securePaymentHandlingDesc: "",
        fasterProcess:
          "Ã™â€ Ã™â€šÃ˜Â·Ã˜Â© Ã˜Â§Ã˜ÂªÃ˜ÂµÃ˜Â§Ã™â€ Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â©Ã˜Å’ Ã™â€¦Ã˜Â¬Ã™â€¦Ã™Ë†Ã˜Â¹Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â© Ã™â€¦Ã™â€  Ã˜Â§Ã™â€Ã™â€¦Ã˜Â³Ã˜ÂªÃ™â€ Ã˜Â¯Ã˜Â§Ã˜Âª",
        costSavings:
          "Ã™â€ Ã˜Â­Ã™â€  Ã™â€¦Ã˜Â³Ã˜Â¤Ã™Ë†Ã™â€Ã™Ë†Ã™â€  Ã˜Â¹Ã™â€  Ã˜Â§Ã™â€Ã˜Â¹Ã™â€¦Ã™â€Ã™Å Ã˜Â© Ã˜Â¨Ã˜Â£Ã™Æ’Ã™â€¦Ã™â€Ã™â€¡Ã˜Â§",
        protected: "",
        choosePlan:
          "Ã˜Â£Ã˜Â³Ã˜Â¹Ã˜Â§Ã˜Â±Ã™â€ Ã˜Â§ (Ã™â€Ã˜Â§ Ã˜ÂªÃ™Ë†Ã˜Â¬Ã˜Â¯ Ã˜Â±Ã˜Â³Ã™Ë†Ã™â€¦ Ã˜Â®Ã™ÂÃ™Å Ã˜Â©)",
        transparentPricing:
          "Ã˜Â£Ã˜Â³Ã˜Â¹Ã˜Â§Ã˜Â± Ã˜Â´Ã™ÂÃ˜Â§Ã™ÂÃ˜Â© Ã˜ÂªÃ˜ÂªÃ™â€ Ã˜Â§Ã˜Â³Ã˜Â¨ Ã™â€¦Ã˜Â¹ Ã˜Â§Ã˜Â­Ã˜ÂªÃ™Å Ã˜Â§Ã˜Â¬Ã˜Â§Ã˜Âª Ã˜Â¹Ã™â€¦Ã™â€Ã™Æ’.",
        starter: "ØªØ¬Ø±ÙŠØ¨ÙŠ",
        growth: "Ø§Ù„Ù†Ù…Ùˆ",
        enterprise: "Ø§Ù„Ø´Ø±ÙƒØ§Øª",
        starterDesc:
          "Ã™â€¦Ã˜Â«Ã˜Â§Ã™â€Ã™Å  Ã™â€Ã™â€Ã˜ÂªÃ˜Â¬Ã˜Â±Ã˜Â¨Ã˜Â©. Ã˜Â´Ã˜Â­Ã™â€ Ã˜Â© Ã™â€¦Ã™Ë†Ã˜Â­Ã˜Â¯Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â©Ã˜Å’ Ã˜Â¬Ã™â€¦Ã™Å Ã˜Â¹ Ã˜Â§Ã™â€Ã˜Â®Ã˜Â¯Ã™â€¦Ã˜Â§Ã˜Âª Ã™â€¦Ã˜ÂªÃ˜Â¶Ã™â€¦Ã™â€ Ã˜Â©.",
        growthDesc:
          "Ã™â€Ã™â€Ã™â€¦Ã˜Â³Ã˜ÂªÃ™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€  Ã˜Â§Ã™â€Ã™â€¦Ã™â€ Ã˜ÂªÃ˜Â¸Ã™â€¦Ã™Å Ã™â€ . Ã˜ÂªÃ˜ÂªÃ˜Â¶Ã™â€¦Ã™â€  Ã™â€Ã™Ë†Ã˜Â­Ã˜Â© Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â­Ã™Æ’Ã™â€¦Ã˜Å’ Ã˜Â§Ã™â€Ã˜ÂªÃ˜ÂªÃ˜Â¨Ã˜Â¹Ã˜Å’ Ã™Ë†Ã˜Â£Ã˜Â³Ã˜Â¹Ã˜Â§Ã˜Â± Ã˜Â§Ã™â€Ã˜Â´Ã˜Â­Ã™â€  Ã˜Â§Ã™â€Ã™â€¦Ã™ÂÃ˜Â¶Ã™â€Ã˜Â©.",
        enterpriseDesc:
          "Ã˜ÂªÃ˜Â³Ã˜Â¹Ã™Å Ã˜Â± Ã˜Â­Ã˜Â³Ã˜Â¨ Ã˜Â§Ã™â€Ã˜Â­Ã˜Â¬Ã™â€¦ Ã™â€Ã™â€Ã™â€¦Ã˜Â³Ã˜ÂªÃ™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€  Ã˜Â§Ã™â€Ã˜Â¬Ã˜Â§Ã˜Â¯Ã™Å Ã™â€ . Ã™â€¦Ã˜Â¹Ã˜Â§Ã™â€Ã˜Â¬Ã˜Â© Ã˜Â°Ã˜Â§Ã˜Âª Ã˜Â£Ã™Ë†Ã™â€Ã™Ë†Ã™Å Ã˜Â© Ã™Ë†Ã˜ÂªÃ™â€šÃ˜Â§Ã˜Â±Ã™Å Ã˜Â± Ã™â€¦Ã˜Â®Ã˜ÂµÃ˜ÂµÃ˜Â©.",
        oneTimeFee: "per consolidation",
        totalOrderValue: "of managed order value",
        after5Consolidations: "after 5+ monthly consolidations",
        bankTransferFees:
          "Freight, duties, and destination charges billed at actual cost.",
        volumeDiscounting:
          "Rate adjusted by lane stability and monthly volume.",
        singleConsolidatedShipmentFeature:
          "Ã˜Â´Ã˜Â­Ã™â€ Ã˜Â© Ã™â€¦Ã™Ë†Ã˜Â­Ã˜Â¯Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â©",
        supplierPaymentHandling:
          "Ã™â€¦Ã˜Â¹Ã˜Â§Ã™â€Ã˜Â¬Ã˜Â© Ã™â€¦Ã˜Â¯Ã™ÂÃ™Ë†Ã˜Â¹Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€ ",
        singleBillOfLadingFeature:
          "Ã˜Â¨Ã™Ë†Ã™â€Ã™Å Ã˜ÂµÃ˜Â© Ã˜Â´Ã˜Â­Ã™â€  Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â©",
        documentationSupport: "Ã˜Â¯Ã˜Â¹Ã™â€¦ Ã˜Â§Ã™â€Ã™Ë†Ã˜Â«Ã˜Â§Ã˜Â¦Ã™â€š",
        multipleConsolidatedShipments:
          "Ã˜Â´Ã˜Â­Ã™â€ Ã˜Â§Ã˜Âª Ã™â€¦Ã™Ë†Ã˜Â­Ã˜Â¯Ã˜Â© Ã™â€¦Ã˜ÂªÃ˜Â¹Ã˜Â¯Ã˜Â¯Ã˜Â©",
        digitalProcurementDashboard:
          "Ã™â€Ã™Ë†Ã˜Â­Ã˜Â© Ã˜ÂªÃ˜Â­Ã™Æ’Ã™â€¦ Ã˜Â§Ã™â€Ã™â€¦Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Å Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã˜Â±Ã™â€šÃ™â€¦Ã™Å Ã˜Â©",
        realTimeTracking:
          "Ã˜ÂªÃ˜ÂªÃ˜Â¨Ã˜Â¹ Ã™ÂÃ™Å  Ã˜Â§Ã™â€Ã™Ë†Ã™â€šÃ˜Âª Ã˜Â§Ã™â€Ã˜Â­Ã™â€šÃ™Å Ã™â€šÃ™Å ",
        preferredShippingRates:
          "Ã˜Â£Ã˜Â³Ã˜Â¹Ã˜Â§Ã˜Â± Ã˜Â´Ã˜Â­Ã™â€  Ã˜ÂªÃ™ÂÃ˜Â¶Ã™Å Ã™â€Ã™Å Ã˜Â©",
        paymentHandlingProtection:
          "Ã™â€¦Ã˜Â¹Ã˜Â§Ã™â€Ã˜Â¬Ã˜Â© Ã™Ë†Ã˜Â­Ã™â€¦Ã˜Â§Ã™Å Ã˜Â© Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¯Ã™ÂÃ™Ë†Ã˜Â¹Ã˜Â§Ã˜Âª",
        volumeDiscountPricing:
          "Ã˜ÂªÃ˜Â³Ã˜Â¹Ã™Å Ã˜Â± Ã˜Â¨Ã˜Â®Ã˜ÂµÃ™â€¦ Ã˜Â¹Ã™â€Ã™â€° Ã˜Â§Ã™â€Ã˜Â­Ã˜Â¬Ã™â€¦",
        priorityConsolidation:
          "Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ Ã˜Â°Ã™Ë† Ã˜Â£Ã™Ë†Ã™â€Ã™Ë†Ã™Å Ã˜Â©",
        customizedShippingSchedule:
          "Ã˜Â¬Ã˜Â¯Ã™Ë†Ã™â€ Ã˜Â´Ã˜Â­Ã™â€  Ã™â€¦Ã˜Â®Ã˜ÂµÃ˜Âµ",
        advancedAnalyticsReporting:
          "Ã˜ÂªÃ˜Â­Ã™â€Ã™Å Ã™â€Ã˜Â§Ã˜Âª Ã™Ë†Ã˜ÂªÃ™â€šÃ˜Â§Ã˜Â±Ã™Å Ã˜Â± Ã™â€¦Ã˜ÂªÃ™â€šÃ˜Â¯Ã™â€¦Ã˜Â©",
        warehouseStorageOptions:
          "Ã˜Â®Ã™Å Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª Ã˜ÂªÃ˜Â®Ã˜Â²Ã™Å Ã™â€  Ã˜Â§Ã™â€Ã™â€¦Ã˜Â³Ã˜ÂªÃ™Ë†Ã˜Â¯Ã˜Â¹Ã˜Â§Ã˜Âª",
        strategicSourcingAssistance:
          "Ã™â€¦Ã˜Â³Ã˜Â§Ã˜Â¹Ã˜Â¯Ã˜Â© Ã™ÂÃ™Å  Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â±Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜Â§Ã˜Â³Ã˜ÂªÃ˜Â±Ã˜Â§Ã˜ÂªÃ™Å Ã˜Â¬Ã™Å ",
        pricingOperatingModel: "Commercial Framework",
        pricingAllPlansInclude: "Every Plan Includes",
        pricingAllPlansIncludeDesc:
          "Core execution controls remain consistent across plans; cadence and service depth scale with your operation.",
        pricingInclusionVerification: "Supplier and commercial term validation",
        pricingInclusionSettlement:
          "Managed settlement workflow with payment proof",
        pricingInclusionDocumentation:
          "Export document pack with checklist governance",
        pricingInclusionTracking:
          "Milestone visibility and exception ownership",
        pricingCommercialGuardrail:
          "No lock-in contract. Start with a pilot run, then move to volume pricing once your import cadence stabilizes.",
        pricingEngagementModel: "Engagement Model",
        pricingBestFor: "Best For",
        pricingStarterModel: "Single end-to-end run",
        pricingGrowthModel: "Recurring monthly coverage",
        pricingEnterpriseModel: "Dedicated high-volume lane",
        pricingStarterFit:
          "Importers testing process fit with limited initial volume",
        pricingGrowthFit:
          "Teams managing repeated orders across multiple Turkish suppliers",
        pricingEnterpriseFit:
          "Companies running steady high-volume lanes with tighter SLA requirements",
        pricingTierStarter: "ØªØ¬Ø±ÙŠØ¨ÙŠ",
        pricingTierGrowth: "Ø§Ù„Ù†Ù…Ùˆ",
        pricingTierEnterprise: "Ø§Ù„Ø´Ø±ÙƒØ§Øª",
        featuresHeadline:
          "Ã™â€Ã˜Â§ Ã˜ÂªÃ˜ÂªÃ˜Â³Ã˜Â§Ã˜Â¡Ã™â€ Ã˜Â£Ã˜Â¨Ã˜Â¯Ã™â€¹Ã˜Â§ Ã˜Â¹Ã™â€  Ã™â€¦Ã™Æ’Ã˜Â§Ã™â€  Ã˜Â·Ã™â€Ã˜Â¨Ã˜Â§Ã˜ÂªÃ™Æ’",
        featuresSubtext:
          'Ã™â€Ã™Ë†Ã˜Â­Ã˜Â© Ã˜ÂªÃ˜Â­Ã™Æ’Ã™â€¦ Ã˜ÂªÃ˜Â¹Ã˜Â±Ã˜Â¶ Ã™â€Ã™Æ’ Ã™Æ’Ã™â€ Ã˜Â´Ã™Å Ã˜Â¡ Ã˜Â¨Ã˜Â§Ã™â€Ã™ÂÃ˜Â¹Ã™â€. Ã˜ÂªÃ™ÂÃ˜Â§Ã˜ÂµÃ™Å Ã™â€ Ã˜Â­Ã™â€šÃ™Å Ã™â€šÃ™Å Ã˜Â©Ã˜Å’ Ã™Ë†Ã™â€Ã™Å Ã˜Â³Ã˜Âª Ã™â€¡Ã˜Â±Ã˜Â§Ã˜Â¡ "Ã™â€šÃ™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¹Ã˜Â§Ã™â€Ã˜Â¬Ã˜Â©". Ã™â€Ã˜Â§ Ã™â€¦Ã˜Â²Ã™Å Ã˜Â¯ Ã™â€¦Ã™â€  Ã˜Â¥Ã˜Â±Ã˜Â³Ã˜Â§Ã™â€ Ã˜Â±Ã˜Â³Ã˜Â§Ã˜Â¦Ã™â€ Ã˜Â¨Ã˜Â±Ã™Å Ã˜Â¯ Ã˜Â¥Ã™â€Ã™Æ’Ã˜ÂªÃ˜Â±Ã™Ë†Ã™â€ Ã™Å  Ã˜Â¥Ã™â€Ã™â€° Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€  Ã˜Â£Ã™Ë† Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â³Ã˜Â§Ã˜Â¤Ã™â€ Ã˜Â¹Ã™â€  Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¯Ã™ÂÃ™Ë†Ã˜Â¹Ã˜Â§Ã˜Âª. Ã™â€šÃ™â€¦ Ã˜Â¨Ã˜ÂªÃ˜Â³Ã˜Â¬Ã™Å Ã™â€ Ã˜Â§Ã™â€Ã˜Â¯Ã˜Â®Ã™Ë†Ã™â€ Ã™Ë†Ã˜Â´Ã˜Â§Ã™â€¡Ã˜Â¯ Ã™Æ’Ã™â€ Ã˜Â´Ã™Å Ã˜Â¡ Ã™ÂÃ™Å  Ã™â€¦Ã™Æ’Ã˜Â§Ã™â€  Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯.',
        importConsolidation:
          "Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜Â§Ã˜Â³Ã˜ÂªÃ™Å Ã˜Â±Ã˜Â§Ã˜Â¯ Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â±Ã™Æ’Ã™Å  Ã˜Â£Ã˜ÂµÃ˜Â¨Ã˜Â­ Ã˜Â¨Ã˜Â³Ã™Å Ã˜Â·Ã™â€¹Ã˜Â§",
        importConsolidationDesc:
          "Ã˜Â§Ã˜Â¬Ã™â€¦Ã˜Â¹ Ã˜Â·Ã™â€Ã˜Â¨Ã˜Â§Ã˜Âª Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€  Ã˜Â£Ã˜ÂªÃ˜Â±Ã˜Â§Ã™Æ’ Ã™â€¦Ã˜ÂªÃ˜Â¹Ã˜Â¯Ã˜Â¯Ã™Å Ã™â€  Ã™ÂÃ™Å  Ã˜Â´Ã˜Â­Ã™â€ Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â© Ã™â€¦Ã˜Â¹ Ã˜Â¯Ã™ÂÃ˜Â¹Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â© Ã™Ë†Ã™Ë†Ã˜Â«Ã˜Â§Ã˜Â¦Ã™â€š Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â©.",
        consolidatedShipping: "Ã˜Â´Ã˜Â­Ã™â€  Ã™â€¦Ã™Ë†Ã˜Â­Ã˜Â¯",
        consolidatedShippingDesc:
          "Ã˜Â§Ã˜Â¬Ã™â€¦Ã˜Â¹ Ã™â€¦Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Å Ã˜Â§Ã˜Âª Ã™â€¦Ã˜ÂªÃ˜Â¹Ã˜Â¯Ã˜Â¯Ã˜Â© Ã™â€¦Ã™â€  Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€  Ã™â€¦Ã˜Â®Ã˜ÂªÃ™â€Ã™ÂÃ™Å Ã™â€  Ã™ÂÃ™Å  Ã˜Â´Ã˜Â­Ã™â€ Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â©.",
        singleBillOfLadingTitle:
          "Ã˜Â¨Ã™Ë†Ã™â€Ã™Å Ã˜ÂµÃ˜Â© Ã˜Â´Ã˜Â­Ã™â€  Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â©",
        singleBillOfLadingDesc:
          "Ã™â€ Ã˜ÂªÃ˜Â¹Ã˜Â§Ã™â€¦Ã™â€ Ã™â€¦Ã˜Â¹ Ã˜Â¥Ã˜Â¹Ã™â€Ã˜Â§Ã™â€  Ã˜Â§Ã™â€Ã˜ÂªÃ˜ÂµÃ˜Â¯Ã™Å Ã˜Â± Ã™Ë†Ã™â€ Ã™â€ Ã˜Â´Ã˜Â¦ Ã˜Â¨Ã™Ë†Ã™â€Ã™Å Ã˜ÂµÃ˜Â© Ã˜Â´Ã˜Â­Ã™â€  Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â©.",
        centralizedPayments:
          "Ã™â€¦Ã˜Â¯Ã™ÂÃ™Ë†Ã˜Â¹Ã˜Â§Ã˜Âª Ã™â€¦Ã˜Â±Ã™Æ’Ã˜Â²Ã™Å Ã˜Â©",
        centralizedPaymentsDesc:
          "Ã™â€šÃ™â€¦ Ã˜Â¨Ã˜Â¯Ã™ÂÃ˜Â¹Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â© Ã˜Â¨Ã˜Â¯Ã™â€Ã˜Â§Ã™â€¹ Ã™â€¦Ã™â€  Ã˜ÂªÃ˜Â­Ã™Ë†Ã™Å Ã™â€Ã˜Â§Ã˜Âª Ã˜Â¯Ã™Ë†Ã™â€Ã™Å Ã˜Â© Ã™â€¦Ã˜ÂªÃ˜Â¹Ã˜Â¯Ã˜Â¯Ã˜Â©.",
        simplifiedDocumentation: "Ã™Ë†Ã˜Â«Ã˜Â§Ã˜Â¦Ã™â€š Ã™â€¦Ã˜Â¨Ã˜Â³Ã˜Â·Ã˜Â©",
        simplifiedDocumentationDesc:
          "Ã™â€ Ã˜ÂªÃ˜Â¹Ã˜Â§Ã™â€¦Ã™â€ Ã™â€¦Ã˜Â¹ Ã˜Â¬Ã™â€¦Ã™Å Ã˜Â¹ Ã˜Â§Ã™â€Ã™Ë†Ã˜Â«Ã˜Â§Ã˜Â¦Ã™â€š Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¹Ã™â€šÃ˜Â¯Ã˜Â© Ã˜Â§Ã™â€Ã™â€¦Ã˜Â·Ã™â€Ã™Ë†Ã˜Â¨Ã˜Â©.",
        globalCompliance: "Ã˜Â§Ã™â€¦Ã˜ÂªÃ˜Â«Ã˜Â§Ã™â€ Ã˜Â¹Ã˜Â§Ã™â€Ã™â€¦Ã™Å ",
        globalComplianceDesc:
          "Ã˜ÂªÃ˜Â¶Ã™â€¦Ã™â€  Ã™â€¦Ã™â€ Ã˜ÂµÃ˜ÂªÃ™â€ Ã˜Â§ Ã˜Â§Ã™â€Ã˜Â§Ã™â€¦Ã˜ÂªÃ˜Â«Ã˜Â§Ã™â€ Ã™â€Ã™â€Ã™Ë†Ã˜Â§Ã˜Â¦Ã˜Â­ Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â¬Ã˜Â§Ã˜Â±Ã™Å Ã˜Â©.",
        supplierManagement:
          "Ã˜Â¥Ã˜Â¯Ã˜Â§Ã˜Â±Ã˜Â© Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€ ",
        supplierManagementDesc:
          "Ã˜Â£Ã˜Â¯Ã˜Â± Ã˜Â¬Ã™â€¦Ã™Å Ã˜Â¹ Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™Æ’ Ã˜Â§Ã™â€Ã˜Â£Ã˜ÂªÃ˜Â±Ã˜Â§Ã™Æ’ Ã˜Â¨Ã˜Â³Ã™â€¡Ã™Ë†Ã™â€Ã˜Â© Ã™ÂÃ™Å  Ã™â€¦Ã™Æ’Ã˜Â§Ã™â€  Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯.",
        deliveryGuarantee: "Ã˜Â¶Ã™â€¦Ã˜Â§Ã™â€  Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â³Ã™â€Ã™Å Ã™â€¦",
        deliveryGuaranteeDesc:
          "Ã™â€ Ã˜Â¶Ã™â€¦Ã™â€  Ã˜Â§Ã˜Â³Ã˜ÂªÃ™â€Ã˜Â§Ã™â€¦Ã™Æ’ Ã™â€Ã˜Â¬Ã™â€¦Ã™Å Ã˜Â¹ Ã˜Â§Ã™â€Ã˜Â¨Ã˜Â¶Ã˜Â§Ã˜Â¦Ã˜Â¹ Ã™Æ’Ã™â€¦Ã˜Â§ Ã™â€¡Ã™Ë† Ã™â€¦Ã˜Â­Ã˜Â¯Ã˜Â¯.",
        latestInsights:
          "Ã˜Â£Ã˜Â­Ã˜Â¯Ã˜Â« Ã˜Â§Ã™â€Ã˜Â£Ã™ÂÃ™Æ’Ã˜Â§Ã˜Â± Ã™Ë†Ã˜Â§Ã™â€Ã™â€¦Ã™â€šÃ˜Â§Ã™â€Ã˜Â§Ã˜Âª",
        stayUpdatedWithTrends:
          "Ã˜Â§Ã˜Â¨Ã™â€š Ã˜Â¹Ã™â€Ã™â€° Ã˜Â§Ã˜Â·Ã™â€Ã˜Â§Ã˜Â¹ Ã˜Â¨Ã˜Â£Ã˜Â­Ã˜Â¯Ã˜Â« Ã˜Â§Ã™â€Ã˜Â§Ã˜ÂªÃ˜Â¬Ã˜Â§Ã™â€¡Ã˜Â§Ã˜Âª Ã™ÂÃ™Å  Ã˜Â§Ã™â€Ã™â€¦Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Å Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã˜Â¹Ã˜Â§Ã™â€Ã™â€¦Ã™Å Ã˜Â©",
        viewAllArticles:
          "Ã˜Â¹Ã˜Â±Ã˜Â¶ Ã˜Â¬Ã™â€¦Ã™Å Ã˜Â¹ Ã˜Â§Ã™â€Ã™â€¦Ã™â€šÃ˜Â§Ã™â€Ã˜Â§Ã˜Âª",
        readMore: "Ã˜Â§Ã™â€šÃ˜Â±Ã˜Â£ Ã˜Â§Ã™â€Ã™â€¦Ã˜Â²Ã™Å Ã˜Â¯",
        publishedOn: "Ã™â€ Ã˜Â´Ã˜Â± Ã™ÂÃ™Å ",
        blogNotFound:
          "Ã™â€Ã™â€¦ Ã™Å Ã˜ÂªÃ™â€¦ Ã˜Â§Ã™â€Ã˜Â¹Ã˜Â«Ã™Ë†Ã˜Â± Ã˜Â¹Ã™â€Ã™â€° Ã™â€¦Ã™â€ Ã˜Â´Ã™Ë†Ã˜Â± Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¯Ã™Ë†Ã™â€ Ã˜Â©",
        backToBlog:
          "Ã˜Â§Ã™â€Ã˜Â¹Ã™Ë†Ã˜Â¯Ã˜Â© Ã˜Â¥Ã™â€Ã™â€° Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¯Ã™Ë†Ã™â€ Ã˜Â©",
        ourBlog: "Ã™â€¦Ã˜Â¯Ã™Ë†Ã™â€ Ã˜ÂªÃ™â€ Ã˜Â§",
        insightsAndNews: "Insights & News",
        createNewContent: "Create New Content",
        noNewsYet: "No news articles yet",
        createFirstNews: "Create First News",
        contentType: "Content Type",
        blogPost: "Blog Post",
        industryNews: "Industry News",
        blogPosts: "Blog Posts",
        insightsOnCrossBorderCommerce:
          "Ã˜Â±Ã˜Â¤Ã™â€° Ã˜Â­Ã™Ë†Ã™â€ Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â¬Ã˜Â§Ã˜Â±Ã˜Â© Ã˜Â¹Ã˜Â¨Ã˜Â± Ã˜Â§Ã™â€Ã˜Â­Ã˜Â¯Ã™Ë†Ã˜Â¯",
        expertAnalysisDesc:
          "Ã˜ÂªÃ˜Â­Ã™â€Ã™Å Ã™â€Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã˜Â®Ã˜Â¨Ã˜Â±Ã˜Â§Ã˜Â¡ Ã™Ë†Ã˜Â§Ã˜ÂªÃ˜Â¬Ã˜Â§Ã™â€¡Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã˜ÂµÃ™â€ Ã˜Â§Ã˜Â¹Ã˜Â© Ã™Ë†Ã™â€ Ã˜ÂµÃ˜Â§Ã˜Â¦Ã˜Â­ Ã˜Â¹Ã™â€¦Ã™â€Ã™Å Ã˜Â© Ã™â€Ã˜ÂªÃ˜Â­Ã˜Â³Ã™Å Ã™â€  Ã˜Â³Ã™â€Ã˜Â³Ã™â€Ã˜Â© Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â±Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â±Ã™Æ’Ã™Å Ã˜Â© Ã˜Â§Ã™â€Ã˜Â®Ã˜Â§Ã˜ÂµÃ˜Â© Ã˜Â¨Ã™Æ’.",
        createNewPost:
          "Ã˜Â¥Ã™â€ Ã˜Â´Ã˜Â§Ã˜Â¡ Ã™â€¦Ã™â€ Ã˜Â´Ã™Ë†Ã˜Â± Ã˜Â¬Ã˜Â¯Ã™Å Ã˜Â¯",
        allPosts: "Ã™Æ’Ã™â€ Ã˜Â§Ã™â€Ã™â€¦Ã˜Â´Ã˜Â§Ã˜Â±Ã™Æ’Ã˜Â§Ã˜Âª",
        noBlogPostsYet:
          "Ã™â€Ã™â€¦ Ã™Å Ã˜ÂªÃ™â€¦ Ã™â€ Ã˜Â´Ã˜Â± Ã˜Â£Ã™Å  Ã™â€¦Ã˜Â´Ã˜Â§Ã˜Â±Ã™Æ’Ã˜Â§Ã˜Âª Ã™â€¦Ã˜Â¯Ã™Ë†Ã™â€ Ã˜Â© Ã˜Â­Ã˜ÂªÃ™â€° Ã˜Â§Ã™â€Ã˜Â¢Ã™â€ .",
        createFirstPost:
          "Ã˜Â¥Ã™â€ Ã˜Â´Ã˜Â§Ã˜Â¡ Ã˜Â£Ã™Ë†Ã™â€ Ã™â€¦Ã™â€ Ã˜Â´Ã™Ë†Ã˜Â±",
        readArticle: "Ã˜Â§Ã™â€šÃ˜Â±Ã˜Â£ Ã˜Â§Ã™â€Ã™â€¦Ã™â€šÃ˜Â§Ã™â€",
        edit: "Ã˜ÂªÃ˜Â¹Ã˜Â¯Ã™Å Ã™â€",
        wantToStayUpdated:
          "Ã™â€¡Ã™â€ Ã˜ÂªÃ˜Â±Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜Â¨Ã™â€šÃ˜Â§Ã˜Â¡ Ã˜Â¹Ã™â€Ã™â€° Ã˜Â§Ã˜Â·Ã™â€Ã˜Â§Ã˜Â¹ Ã˜Â¨Ã˜Â¢Ã˜Â®Ã˜Â± Ã˜Â±Ã˜Â¤Ã™â€°Ã™â€ Ã˜Â§Ã˜Å¸",
        exclusiveInsightsDesc:
          "Ã˜Â§Ã˜Â­Ã˜ÂµÃ™â€ Ã˜Â¹Ã™â€Ã™â€° Ã˜Â±Ã˜Â¤Ã™â€° Ã˜Â­Ã˜ÂµÃ˜Â±Ã™Å Ã˜Â© Ã™Ë†Ã˜Â§Ã˜ÂªÃ˜Â¬Ã˜Â§Ã™â€¡Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã˜ÂµÃ™â€ Ã˜Â§Ã˜Â¹Ã˜Â© Ã™Ë†Ã˜ÂªÃ˜Â­Ã™â€Ã™Å Ã™â€Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã˜Â®Ã˜Â¨Ã˜Â±Ã˜Â§Ã˜Â¡ Ã™â€¦Ã˜Â¨Ã˜Â§Ã˜Â´Ã˜Â±Ã˜Â© Ã™ÂÃ™Å  Ã˜Â¨Ã˜Â±Ã™Å Ã˜Â¯Ã™Æ’ Ã˜Â§Ã™â€Ã™Ë†Ã˜Â§Ã˜Â±Ã˜Â¯.",
        subscribeToNewsletterBtn:
          "Ã˜Â§Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Æ’ Ã™ÂÃ™Å  Ã™â€ Ã˜Â´Ã˜Â±Ã˜ÂªÃ™â€ Ã˜Â§ Ã˜Â§Ã™â€Ã˜Â¥Ã˜Â®Ã˜Â¨Ã˜Â§Ã˜Â±Ã™Å Ã˜Â©",
        loadingBlogPosts:
          "Ã˜Â¬Ã˜Â§Ã˜Â±Ã™Å  Ã˜ÂªÃ˜Â­Ã™â€¦Ã™Å Ã™â€ Ã™â€¦Ã˜Â´Ã˜Â§Ã˜Â±Ã™Æ’Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¯Ã™Ë†Ã™â€ Ã˜Â©...",
        share: "Ã˜Â´Ã˜Â§Ã˜Â±Ã™Æ’",
        postNotFound:
          "Ã™â€Ã™â€¦ Ã™Å Ã˜ÂªÃ™â€¦ Ã˜Â§Ã™â€Ã˜Â¹Ã˜Â«Ã™Ë†Ã˜Â± Ã˜Â¹Ã™â€Ã™â€° Ã˜Â§Ã™â€Ã™â€¦Ã™â€ Ã˜Â´Ã™Ë†Ã˜Â±",
        blogPostNotExist:
          "Ã™â€¦Ã™â€ Ã˜Â´Ã™Ë†Ã˜Â± Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¯Ã™Ë†Ã™â€ Ã˜Â© Ã˜Â§Ã™â€Ã˜Â°Ã™Å  Ã˜ÂªÃ˜Â¨Ã˜Â­Ã˜Â« Ã˜Â¹Ã™â€ Ã™â€¡ Ã˜ÂºÃ™Å Ã˜Â± Ã™â€¦Ã™Ë†Ã˜Â¬Ã™Ë†Ã˜Â¯.",
        General: "Ã˜Â¹Ã˜Â§Ã™â€¦",
        "Supply Chain": "Ã˜Â³Ã™â€Ã˜Â³Ã™â€Ã˜Â© Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â±Ã™Å Ã˜Â¯",
        "E-commerce":
          "Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â¬Ã˜Â§Ã˜Â±Ã˜Â© Ã˜Â§Ã™â€Ã˜Â¥Ã™â€Ã™Æ’Ã˜ÂªÃ˜Â±Ã™Ë†Ã™â€ Ã™Å Ã˜Â©",
        Logistics:
          "Ã˜Â§Ã™â€Ã˜Â®Ã˜Â¯Ã™â€¦Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã™â€Ã™Ë†Ã˜Â¬Ã˜Â³Ã˜ÂªÃ™Å Ã˜Â©",
        "International Trade":
          "Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â¬Ã˜Â§Ã˜Â±Ã˜Â© Ã˜Â§Ã™â€Ã˜Â¯Ã™Ë†Ã™â€Ã™Å Ã˜Â©",
        "Sourcing from TÃƒÂ¼rkiye":
          "Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â±Ã™Å Ã˜Â¯ Ã™â€¦Ã™â€  Ã˜ÂªÃ˜Â±Ã™Æ’Ã™Å Ã˜Â§",
        "Cross Border Procurement":
          "Ã˜Â§Ã™â€Ã™â€¦Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Å Ã˜Â§Ã˜Âª Ã˜Â¹Ã˜Â¨Ã˜Â± Ã˜Â§Ã™â€Ã˜Â­Ã˜Â¯Ã™Ë†Ã˜Â¯",
        minRead: "Ã˜Â¯Ã™â€šÃ™Å Ã™â€šÃ˜Â© Ã™â€šÃ˜Â±Ã˜Â§Ã˜Â¡Ã˜Â©",
        navigation: "Ã˜Â§Ã™â€Ã˜ÂªÃ™â€ Ã™â€šÃ™â€",
        stayUpdated: "Ã˜Â§Ã˜Â¨Ã™â€š Ã˜Â¹Ã™â€Ã™â€° Ã˜Â§Ã˜Â·Ã™â€Ã˜Â§Ã˜Â¹",
        stayUpdatedDesc:
          "Ã˜Â§Ã˜Â­Ã˜ÂµÃ™â€ Ã˜Â¹Ã™â€Ã™â€° Ã˜Â¢Ã˜Â®Ã˜Â± Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â­Ã˜Â¯Ã™Å Ã˜Â«Ã˜Â§Ã˜Âª Ã˜Â­Ã™Ë†Ã™â€ Ã˜ÂªÃ˜Â­Ã˜Â³Ã™Å Ã™â€  Ã˜Â³Ã™â€Ã˜Â³Ã™â€Ã˜Â© Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â±Ã™Å Ã˜Â¯ Ã™Ë†Ã˜Â±Ã˜Â¤Ã™â€° Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â¬Ã˜Â§Ã˜Â±Ã˜Â© Ã˜Â§Ã™â€Ã˜Â¯Ã™Ë†Ã™â€Ã™Å Ã˜Â©.",
        subscribeNewsletter:
          "Ã˜Â§Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Æ’ Ã™ÂÃ™Å  Ã˜Â§Ã™â€Ã™â€ Ã˜Â´Ã˜Â±Ã˜Â© Ã˜Â§Ã™â€Ã˜Â¥Ã˜Â®Ã˜Â¨Ã˜Â§Ã˜Â±Ã™Å Ã˜Â©",
        privacyPolicy: "Ã˜Â³Ã™Å Ã˜Â§Ã˜Â³Ã˜Â© Ã˜Â§Ã™â€Ã˜Â®Ã˜ÂµÃ™Ë†Ã˜ÂµÃ™Å Ã˜Â©",
        termsOfService: "Ã˜Â´Ã˜Â±Ã™Ë†Ã˜Â· Ã˜Â§Ã™â€Ã˜Â®Ã˜Â¯Ã™â€¦Ã˜Â©",
        allRightsReserved:
          "Ã™Æ’Ã™â€ Ã˜Â§Ã™â€Ã˜Â­Ã™â€šÃ™Ë†Ã™â€š Ã™â€¦Ã˜Â­Ã™ÂÃ™Ë†Ã˜Â¸Ã˜Â©.",
        madeWith: "Ã˜ÂµÃ™â€ Ã˜Â¹ Ã˜Â¨Ã™â‚¬",
        inIstanbul: "Ã™ÂÃ™Å  Ã˜Â§Ã˜Â³Ã˜Â·Ã™â€ Ã˜Â¨Ã™Ë†Ã™â€",
        brandTagline:
          "Ã˜ÂªÃ˜Â¨Ã˜Â³Ã™Å Ã˜Â· Ã˜Â§Ã™â€Ã™â€¦Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Å Ã˜Â§Ã˜Âª Ã˜Â¹Ã˜Â¨Ã˜Â± Ã˜Â§Ã™â€Ã˜Â­Ã˜Â¯Ã™Ë†Ã˜Â¯",
        brandDesc:
          "Ã˜Â­Ã™Ë†Ã™â€˜Ã™â€ Ã˜Â³Ã™â€Ã˜Â³Ã™â€Ã˜Â© Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â±Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â±Ã™Æ’Ã™Å Ã˜Â© Ã˜Â§Ã™â€Ã˜Â®Ã˜Â§Ã˜ÂµÃ˜Â© Ã˜Â¨Ã™Æ’ Ã™â€¦Ã˜Â¹ Ã˜Â®Ã˜Â¯Ã™â€¦Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜Â°Ã™Æ’Ã™Å Ã˜Â©. Ã™â€šÃ™â€Ã™â€ Ã˜Â§Ã™â€Ã˜ÂªÃ™Æ’Ã˜Â§Ã™â€Ã™Å Ã™ÂÃ˜Å’ Ã™Ë†Ã˜Â­Ã˜Â³Ã™â€˜Ã™â€  Ã˜Â§Ã™â€Ã˜Â®Ã˜Â¯Ã™â€¦Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€Ã™â€Ã™Ë†Ã˜Â¬Ã˜Â³Ã˜ÂªÃ™Å Ã˜Â©Ã˜Å’ Ã™Ë†Ã™Ë†Ã˜Â³Ã™â€˜Ã˜Â¹ Ã™â€ Ã˜Â·Ã˜Â§Ã™â€š Ã˜Â¹Ã™â€¦Ã™â€Ã™Æ’ Ã˜Â§Ã™â€Ã˜Â¯Ã™Ë†Ã™â€Ã™Å  Ã˜Â¨Ã˜Â«Ã™â€šÃ˜Â©.",
        contactEmail: "bundleist@gmail.com",
        locationIstanbul:
          "Ã˜Â§Ã˜Â³Ã˜Â·Ã™â€ Ã˜Â¨Ã™Ë†Ã™â€Ã˜Å’ Ã˜ÂªÃ˜Â±Ã™Æ’Ã™Å Ã˜Â§",
        dashboardAlt:
          "Ã™Ë†Ã˜Â§Ã˜Â¬Ã™â€¡Ã˜Â© Ã™â€Ã™Ë†Ã˜Â­Ã˜Â© Ã˜ÂªÃ˜Â­Ã™Æ’Ã™â€¦ Bundleist",
        findSuppliers:
          "Ã˜Â£Ã˜Â±Ã˜Â³Ã™â€ Ã™â€Ã™â€ Ã˜Â§ Ã˜Â·Ã™â€Ã˜Â¨Ã˜Â§Ã˜ÂªÃ™Æ’",
        findSuppliersDesc:
          "Ã˜Â£Ã˜Â±Ã˜Â³Ã™â€ Ã™ÂÃ™Ë†Ã˜Â§Ã˜ÂªÃ™Å Ã˜Â±Ã™Æ’ Ã˜Â§Ã™â€Ã˜Â£Ã™Ë†Ã™â€Ã™Å Ã˜Â© Ã™â€¦Ã™â€  Ã˜Â£Ã™Å  Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€  Ã˜Â£Ã˜ÂªÃ˜Â±Ã˜Â§Ã™Æ’. Ã™â€Ã™Å Ã˜Â³ Ã™â€Ã˜Â¯Ã™Å Ã™Æ’ Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€ Ã˜Å¸ Ã˜Â³Ã™â€ Ã˜Â±Ã˜Â³Ã™â€ Ã™â€Ã™Æ’ 3 Ã˜Â®Ã™Å Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª Ã™â€Ã™â€Ã˜Â§Ã˜Â®Ã˜ÂªÃ™Å Ã˜Â§Ã˜Â± Ã™â€¦Ã™â€  Ã˜Â¨Ã™Å Ã™â€ Ã™â€¡Ã˜Â§.",
        supplierVerification:
          "Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â­Ã™â€šÃ™â€š Ã™â€¦Ã™â€  Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯",
        supplierVerificationDesc:
          "Ã˜Â³Ã™Å Ã˜ÂªÃ˜Â­Ã™â€šÃ™â€š Ã™ÂÃ˜Â±Ã™Å Ã™â€šÃ™â€ Ã˜Â§ Ã™â€¦Ã™â€  Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™Æ’ Ã™Ë†Ã˜Â¨Ã˜Â¹Ã˜Â¯ Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â£Ã™Æ’Ã™Å Ã˜Â¯ Ã˜Â³Ã™â€ Ã™Ë†Ã™â€šÃ˜Â¹ Ã˜Â¹Ã™â€šÃ˜Â¯Ã™â€¹Ã˜Â§ Ã˜Â±Ã˜Â¦Ã™Å Ã˜Â³Ã™Å Ã™â€¹Ã˜Â§ Ã™â€Ã™â€Ã˜Â¹Ã™â€¦Ã™â€ Ã™â€ Ã™Å Ã˜Â§Ã˜Â¨Ã˜Â© Ã˜Â¹Ã™â€ Ã™Æ’.",
        paymentProcessing: "Ã™â€¦Ã˜Â¹Ã˜Â§Ã™â€Ã˜Â¬Ã˜Â© Ã˜Â§Ã™â€Ã˜Â¯Ã™ÂÃ˜Â¹",
        paymentProcessingDesc:
          "Ã˜Â³Ã™â€ Ã˜ÂªÃ˜Â¹Ã˜Â§Ã™â€¦Ã™â€ Ã™â€¦Ã˜Â¹ Ã˜Â¬Ã™â€¦Ã™Å Ã˜Â¹ Ã™â€¦Ã˜Â¯Ã™ÂÃ™Ë†Ã˜Â¹Ã˜Â§Ã˜Âª Ã˜Â·Ã™â€Ã˜Â¨Ã˜Â§Ã˜ÂªÃ™Æ’ Ã™â€ Ã™Å Ã˜Â§Ã˜Â¨Ã˜Â© Ã˜Â¹Ã™â€ Ã™Æ’ Ã™â€¦Ã™â€  Ã˜Â±Ã˜ÂµÃ™Å Ã˜Â¯ Ã˜Â­Ã˜Â³Ã˜Â§Ã˜Â¨Ã™Æ’ Ã˜Â¨Ã˜Â´Ã™ÂÃ˜Â§Ã™ÂÃ™Å Ã˜Â© Ã˜ÂªÃ˜Â§Ã™â€¦Ã˜Â©.",
        orderConsolidation: "Ã˜ÂªÃ™Ë†Ã˜Â­Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜Â·Ã™â€Ã˜Â¨Ã˜Â§Ã˜Âª",
        orderConsolidationDesc:
          "Ã˜Â³Ã™Å Ã˜ÂªÃ™â€Ã™â€šÃ™â€° Ã™ÂÃ˜Â±Ã™Å Ã™â€šÃ™â€ Ã˜Â§ Ã™Ë†Ã™Å Ã˜ÂªÃ˜Â­Ã™â€šÃ™â€š Ã™â€¦Ã™â€  Ã˜Â¬Ã™â€¦Ã™Å Ã˜Â¹ Ã˜Â·Ã™â€Ã˜Â¨Ã˜Â§Ã˜ÂªÃ™Æ’Ã˜Å’ Ã˜Â«Ã™â€¦ Ã™Å Ã˜Â¬Ã™â€¦Ã˜Â¹Ã™â€¡Ã˜Â§ Ã™ÂÃ™Å  Ã˜Â´Ã˜Â­Ã™â€ Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â© Ã™â€¦Ã˜Â­Ã˜Â³Ã™â€˜Ã™â€ Ã˜Â©.",
        documentationSimplified:
          "Ã˜ÂªÃ˜Â¨Ã˜Â³Ã™Å Ã˜Â· Ã˜Â§Ã™â€Ã™Ë†Ã˜Â«Ã˜Â§Ã˜Â¦Ã™â€š",
        documentationSimplifiedDesc:
          "Ã™â€ Ã˜ÂªÃ˜Â¹Ã˜Â§Ã™â€¦Ã™â€ Ã™â€¦Ã˜Â¹ Ã˜Â¬Ã™â€¦Ã™Å Ã˜Â¹ Ã˜Â£Ã™Ë†Ã˜Â±Ã˜Â§Ã™â€š Ã˜Â§Ã™â€Ã˜ÂªÃ˜ÂµÃ˜Â¯Ã™Å Ã˜Â± Ã™Ë†Ã˜Â§Ã™â€Ã™â€ Ã™â€¦Ã˜Â§Ã˜Â°Ã˜Â¬ Ã˜Â§Ã™â€Ã˜Â¬Ã™â€¦Ã˜Â±Ã™Æ’Ã™Å Ã˜Â© Ã™Ë†Ã™â€ Ã™â€ Ã˜Â´Ã˜Â¦ Ã˜Â¨Ã™Ë†Ã™â€Ã™Å Ã˜ÂµÃ˜Â© Ã˜Â´Ã˜Â­Ã™â€  Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â© Ã™â€Ã˜Â´Ã˜Â­Ã™â€ Ã˜ÂªÃ™Æ’ Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â­Ã˜Â¯Ã˜Â©.",
        globalShipping: "Ã˜Â´Ã˜Â­Ã™â€  Ã˜Â¹Ã˜Â§Ã™â€Ã™â€¦Ã™Å ",
        globalShippingDesc:
          "Ã™Å Ã˜ÂªÃ™â€¦ Ã˜Â´Ã˜Â­Ã™â€  Ã˜Â·Ã™â€Ã˜Â¨Ã™Æ’ Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â­Ã˜Â¯ Ã˜Â¥Ã™â€Ã™â€° Ã™Ë†Ã˜Â¬Ã™â€¡Ã˜ÂªÃ™Æ’ Ã™â€¦Ã˜Â¹ Ã˜ÂªÃ˜ÂªÃ˜Â¨Ã˜Â¹ Ã™Ë†Ã˜ÂªÃ˜Â­Ã˜Â¯Ã™Å Ã˜Â«Ã˜Â§Ã˜Âª Ã™ÂÃ™Å  Ã˜Â§Ã™â€Ã™Ë†Ã™â€šÃ˜Âª Ã˜Â§Ã™â€Ã™ÂÃ˜Â¹Ã™â€Ã™Å .",
        easyDelivery: "Ã˜ÂªÃ™Ë†Ã˜ÂµÃ™Å Ã™â€ Ã˜Â³Ã™â€¡Ã™â€",
        easyDeliveryDesc:
          "Ã˜Â§Ã˜Â³Ã˜ÂªÃ™â€Ã™â€¦ Ã˜Â·Ã™â€Ã˜Â¨Ã˜Â§Ã˜ÂªÃ™Æ’ Ã˜Â§Ã™â€Ã™â€¦Ã˜ÂªÃ˜Â¹Ã˜Â¯Ã˜Â¯Ã˜Â© Ã™Æ’Ã˜Â´Ã˜Â­Ã™â€ Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â©Ã˜Å’ Ã™â€¦Ã™â€¦Ã˜Â§ Ã™Å Ã™Ë†Ã™ÂÃ˜Â± Ã˜Â§Ã™â€Ã™Ë†Ã™â€šÃ˜Âª Ã™Ë†Ã™Å Ã™â€šÃ™â€Ã™â€ Ã™â€¦Ã™â€  Ã˜ÂªÃ˜Â¹Ã™â€šÃ™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜Â¬Ã™â€¦Ã˜Â§Ã˜Â±Ã™Æ’.",
        saveShippingCosts:
          "Ã™Ë†Ã™ÂÃ˜Â± Ã˜Â­Ã˜ÂªÃ™â€° 40% Ã™â€¦Ã™â€  Ã˜ÂªÃ™Æ’Ã˜Â§Ã™â€Ã™Å Ã™Â Ã˜Â§Ã™â€Ã˜Â´Ã˜Â­Ã™â€ ",
        reduceDocumentation:
          "Ã™Å Ã™â€šÃ™â€Ã™â€ Ã˜Â§Ã™â€Ã™Ë†Ã˜Â«Ã˜Â§Ã˜Â¦Ã™â€š Ã˜Â¨Ã™â€ Ã˜Â³Ã˜Â¨Ã˜Â© 70%",
        onePaymentAllSuppliers:
          "Ã˜Â¯Ã™ÂÃ˜Â¹Ã˜Â© Ã™Ë†Ã˜Â§Ã˜Â­Ã˜Â¯Ã˜Â© Ã™â€Ã˜Â¬Ã™â€¦Ã™Å Ã˜Â¹ Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€ ",
        digitalFirstApproach:
          "Ã™â€ Ã™â€¡Ã˜Â¬ Ã˜Â±Ã™â€šÃ™â€¦Ã™Å  Ã˜Â£Ã™Ë†Ã™â€Ã˜Â§Ã™â€¹",
        countriesSupported: "150+ Ã˜Â¯Ã™Ë†Ã™â€Ã˜Â© Ã™â€¦Ã˜Â¯Ã˜Â¹Ã™Ë†Ã™â€¦Ã˜Â©",
        unlimitedSupplierNetwork:
          "Ã˜Â´Ã˜Â¨Ã™Æ’Ã˜Â© Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€  Ã˜ÂºÃ™Å Ã˜Â± Ã™â€¦Ã˜Â­Ã˜Â¯Ã™Ë†Ã˜Â¯Ã˜Â©",
        onTimeDeliveryRate:
          "Ã™â€¦Ã˜Â¹Ã˜Â¯Ã™â€ Ã˜ÂªÃ˜Â³Ã™â€Ã™Å Ã™â€¦ Ã™ÂÃ™Å  Ã˜Â§Ã™â€Ã™Ë†Ã™â€šÃ˜Âª Ã˜Â§Ã™â€Ã™â€¦Ã˜Â­Ã˜Â¯Ã˜Â¯ Ã˜Â¨Ã™â€ Ã˜Â³Ã˜Â¨Ã˜Â© 99.5%",
        mostPopularFeature:
          "Ã˜Â§Ã™â€Ã™â€¦Ã™Å Ã˜Â²Ã˜Â© Ã˜Â§Ã™â€Ã˜Â£Ã™Æ’Ã˜Â«Ã˜Â± Ã˜Â´Ã™Å Ã™Ë†Ã˜Â¹Ã™â€¹Ã˜Â§",
        essentialFeature: "Ã™â€¦Ã™Å Ã˜Â²Ã˜Â© Ã˜Â£Ã˜Â³Ã˜Â§Ã˜Â³Ã™Å Ã˜Â©",
        premiumSupportIncluded:
          "Ã˜Â¯Ã˜Â¹Ã™â€¦ Ã™â€¦Ã™â€¦Ã™Å Ã˜Â² Ã™â€¦Ã˜Â¶Ã™â€¦Ã™â€ ",
        simpleProcess: "Ã˜Â¹Ã™â€¦Ã™â€Ã™Å Ã˜Â© Ã˜Â¨Ã˜Â³Ã™Å Ã˜Â·Ã˜Â©",
        howItWorksDesc:
          "Ã˜Â¹Ã™â€¦Ã™â€Ã™Å Ã˜ÂªÃ™â€ Ã˜Â§ Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¨Ã˜Â³Ã˜Â·Ã˜Â© Ã˜ÂªÃ˜Â¬Ã˜Â¹Ã™â€ Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â±Ã™Å Ã˜Â¯ Ã™Ë†Ã˜Â§Ã™â€Ã˜Â´Ã˜Â­Ã™â€  Ã™â€¦Ã™â€  Ã˜ÂªÃ˜Â±Ã™Æ’Ã™Å Ã˜Â§ Ã˜Â³Ã™â€¡Ã™â€Ã˜Â§Ã™â€¹ Ã˜Â¨Ã™ÂÃ˜Â¶Ã™â€ Ã˜Â§Ã™â€Ã˜ÂªÃ™Æ’Ã™â€ Ã™Ë†Ã™â€Ã™Ë†Ã˜Â¬Ã™Å Ã˜Â§ Ã˜Â§Ã™â€Ã™â€¦Ã˜ÂªÃ˜Â·Ã™Ë†Ã˜Â±Ã˜Â© Ã™Ë†Ã˜Â§Ã™â€Ã˜Â¯Ã˜Â¹Ã™â€¦ Ã˜Â§Ã™â€Ã˜Â®Ã˜Â¨Ã™Å Ã˜Â±.",
        start: "Ã˜Â§Ã˜Â¨Ã˜Â¯Ã˜Â£",
        done: "Ã˜ÂªÃ™â€¦",
        fullName: "Ã˜Â§Ã™â€Ã˜Â§Ã˜Â³Ã™â€¦ Ã˜Â§Ã™â€Ã™Æ’Ã˜Â§Ã™â€¦Ã™â€",
        businessEmail:
          "Ã˜Â§Ã™â€Ã˜Â¨Ã˜Â±Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜Â¥Ã™â€Ã™Æ’Ã˜ÂªÃ˜Â±Ã™Ë†Ã™â€ Ã™Å  Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â¬Ã˜Â§Ã˜Â±Ã™Å ",
        company: "Ã˜Â§Ã™â€Ã˜Â´Ã˜Â±Ã™Æ’Ã˜Â©",
        companyOptional:
          "Ã˜Â§Ã™â€Ã˜Â´Ã˜Â±Ã™Æ’Ã˜Â© (Ã˜Â§Ã˜Â®Ã˜ÂªÃ™Å Ã˜Â§Ã˜Â±Ã™Å )",
        whyInterested:
          "Ã™â€Ã™â€¦Ã˜Â§Ã˜Â°Ã˜Â§ Ã˜Â£Ã™â€ Ã˜Âª Ã™â€¦Ã™â€¡Ã˜ÂªÃ™â€¦ Ã˜Â¨Ã™â‚¬ BundleistÃ˜Å¸",
        whatInterests:
          "Ã™â€¦Ã˜Â§ Ã˜Â§Ã™â€Ã˜Â°Ã™Å  Ã™Å Ã˜Â«Ã™Å Ã˜Â± Ã˜Â§Ã™â€¡Ã˜ÂªÃ™â€¦Ã˜Â§Ã™â€¦Ã™Æ’ Ã˜Â£Ã™Æ’Ã˜Â«Ã˜Â± Ã™ÂÃ™Å  BundleistÃ˜Å¸",
        tellUsAboutNeeds:
          "Ã˜Â£Ã˜Â®Ã˜Â¨Ã˜Â±Ã™â€ Ã˜Â§ Ã˜Â¹Ã™â€  Ã˜Â§Ã˜Â­Ã˜ÂªÃ™Å Ã˜Â§Ã˜Â¬Ã˜Â§Ã˜Âª Ã˜Â¹Ã™â€¦Ã™â€Ã™Æ’ Ã™Ë†Ã™Æ’Ã™Å Ã™Â Ã™Å Ã™â€¦Ã™Æ’Ã™â€  Ã™â€Ã™â‚¬ Bundleist Ã˜Â§Ã™â€Ã™â€¦Ã˜Â³Ã˜Â§Ã˜Â¹Ã˜Â¯Ã˜Â©...",
        tellUsInterests:
          "Ã˜Â£Ã˜Â®Ã˜Â¨Ã˜Â±Ã™â€ Ã˜Â§ Ã™â€¦Ã˜Â§ Ã™â€¡Ã™Å  Ã˜Â¬Ã™Ë†Ã˜Â§Ã™â€ Ã˜Â¨ Ã˜Â­Ã™â€Ã™Ë†Ã™â€ Ã˜Â³Ã™â€Ã˜Â³Ã™â€Ã˜Â© Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â±Ã™Å Ã˜Â¯ Ã™â€Ã˜Â¯Ã™Å Ã™â€ Ã˜Â§ Ã˜Â§Ã™â€Ã˜ÂªÃ™Å  Ã˜ÂªÃ™â€¡Ã™â€¦Ã™Æ’ Ã˜Â£Ã™Æ’Ã˜Â«Ã˜Â±...",
        submitting: "Ã˜Â¬Ã˜Â§Ã˜Â±Ã™Â Ã˜Â§Ã™â€Ã˜Â¥Ã˜Â±Ã˜Â³Ã˜Â§Ã™â€...",
        requestEarlyAccess:
          "Ã˜Â§Ã˜Â·Ã™â€Ã˜Â¨ Ã˜Â§Ã™â€Ã™Ë†Ã˜ÂµÃ™Ë†Ã™â€ Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¨Ã™Æ’Ã˜Â±",
        subscribe: "Ã˜Â§Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Æ’",
        backToHome:
          "Ã˜Â§Ã™â€Ã˜Â¹Ã™Ë†Ã˜Â¯Ã˜Â© Ã˜Â¥Ã™â€Ã™â€° Ã˜Â§Ã™â€Ã˜ÂµÃ™ÂÃ˜Â­Ã˜Â© Ã˜Â§Ã™â€Ã˜Â±Ã˜Â¦Ã™Å Ã˜Â³Ã™Å Ã˜Â©",
        subscribeToOurNewsletter:
          "Ã˜Â§Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Æ’ Ã™ÂÃ™Å  Ã™â€ Ã˜Â´Ã˜Â±Ã˜ÂªÃ™â€ Ã˜Â§ Ã˜Â§Ã™â€Ã˜Â¥Ã˜Â®Ã˜Â¨Ã˜Â§Ã˜Â±Ã™Å Ã˜Â©",
        getStartedPage: "Ã˜Â§Ã˜Â¨Ã˜Â¯Ã˜Â£",
        getStartedDesc:
          "Ã˜Â§Ã˜Â¨Ã˜Â¯Ã˜Â£ Ã™â€¦Ã˜Â¹ Ã˜Â­Ã™â€Ã™Ë†Ã™â€ Ã˜Â³Ã™â€Ã˜Â³Ã™â€Ã˜Â© Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â±Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¨Ã˜ÂªÃ™Æ’Ã˜Â±Ã˜Â© Ã™â€¦Ã™â€  Bundleist Ã™Ë†Ã™â€šÃ™â€¦ Ã˜Â¨Ã˜ÂªÃ˜Â¨Ã˜Â³Ã™Å Ã˜Â· Ã˜Â¥Ã˜Â¯Ã˜Â§Ã˜Â±Ã˜Â© Ã˜Â§Ã™â€Ã™â€¦Ã™Ë†Ã˜Â±Ã˜Â¯Ã™Å Ã™â€  Ã˜Â§Ã™â€Ã˜Â£Ã˜ÂªÃ˜Â±Ã˜Â§Ã™Æ’.",
        newsletterDesc:
          "Ã˜Â§Ã˜Â¨Ã™â€š Ã˜Â¹Ã™â€Ã™â€° Ã˜Â§Ã˜Â·Ã™â€Ã˜Â§Ã˜Â¹ Ã˜Â¨Ã˜Â¢Ã˜Â®Ã˜Â± Ã˜Â§Ã™â€Ã˜Â£Ã˜Â®Ã˜Â¨Ã˜Â§Ã˜Â± Ã™Ë†Ã˜Â§Ã™â€Ã˜ÂªÃ˜Â­Ã˜Â¯Ã™Å Ã˜Â«Ã˜Â§Ã˜Âª Ã™â€¦Ã™â€  Ã˜Â­Ã™â€Ã™Ë†Ã™â€ Ã˜Â³Ã™â€Ã˜Â³Ã™â€Ã˜Â© Ã˜Â§Ã™â€Ã˜ÂªÃ™Ë†Ã˜Â±Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¨Ã˜ÂªÃ™Æ’Ã˜Â±Ã˜Â© Ã™â€¦Ã™â€  Bundleist.",
        neverShareEmail:
          "Ã™â€Ã™â€  Ã™â€ Ã˜Â´Ã˜Â§Ã˜Â±Ã™Æ’ Ã˜Â¨Ã˜Â±Ã™Å Ã˜Â¯Ã™Æ’ Ã˜Â§Ã™â€Ã˜Â¥Ã™â€Ã™Æ’Ã˜ÂªÃ˜Â±Ã™Ë†Ã™â€ Ã™Å  Ã™â€¦Ã˜Â¹ Ã˜Â£Ã™Å  Ã˜Â´Ã˜Â®Ã˜Âµ Ã˜Â¢Ã˜Â®Ã˜Â±.",
        requestSubmittedSuccess:
          "Ã˜ÂªÃ™â€¦ Ã˜Â¥Ã˜Â±Ã˜Â³Ã˜Â§Ã™â€ Ã˜Â§Ã™â€Ã˜Â·Ã™â€Ã˜Â¨ Ã˜Â¨Ã™â€ Ã˜Â¬Ã˜Â§Ã˜Â­!",
        newsletterSubscriptionSuccess:
          "Ã˜ÂªÃ™â€¦ Ã˜Â§Ã™â€Ã˜Â§Ã˜Â´Ã˜ÂªÃ˜Â±Ã˜Â§Ã™Æ’ Ã™ÂÃ™Å  Ã˜Â§Ã™â€Ã™â€ Ã˜Â´Ã˜Â±Ã˜Â© Ã˜Â§Ã™â€Ã˜Â¥Ã˜Â®Ã˜Â¨Ã˜Â§Ã˜Â±Ã™Å Ã˜Â© Ã˜Â¨Ã™â€ Ã˜Â¬Ã˜Â§Ã˜Â­!",
        thankYouInterest:
          "Ã˜Â´Ã™Æ’Ã˜Â±Ã™â€¹Ã˜Â§ Ã™â€Ã˜Â§Ã™â€¡Ã˜ÂªÃ™â€¦Ã˜Â§Ã™â€¦Ã™Æ’ Ã˜Â¨Ã™â‚¬ Bundleist. Ã˜Â³Ã™â€ Ã˜ÂªÃ™Ë†Ã˜Â§Ã˜ÂµÃ™â€ Ã™â€¦Ã˜Â¹Ã™Æ’ Ã™â€šÃ˜Â±Ã™Å Ã˜Â¨Ã™â€¹Ã˜Â§.",
        successfullySubscribed:
          "Ã˜ÂªÃ™â€¦ Ã˜Â§Ã™â€Ã˜Â§Ã˜Â´Ã˜ÂªÃ˜Â±Ã˜Â§Ã™Æ’ Ã˜Â¨Ã™â€ Ã˜Â¬Ã˜Â§Ã˜Â­ Ã™ÂÃ™Å  Ã™â€ Ã˜Â´Ã˜Â±Ã˜ÂªÃ™â€ Ã˜Â§ Ã˜Â§Ã™â€Ã˜Â¥Ã˜Â®Ã˜Â¨Ã˜Â§Ã˜Â±Ã™Å Ã˜Â©! Ã˜Â³Ã™â€ Ã˜Â¨Ã™â€šÃ™Å Ã™Æ’ Ã˜Â¹Ã™â€Ã™â€° Ã˜Â§Ã˜Â·Ã™â€Ã˜Â§Ã˜Â¹.",
        submissionError: "Ã˜Â®Ã˜Â·Ã˜Â£ Ã™ÂÃ™Å  Ã˜Â§Ã™â€Ã˜Â¥Ã˜Â±Ã˜Â³Ã˜Â§Ã™â€",
        failedToSubmit:
          "Ã™ÂÃ˜Â´Ã™â€ Ã˜Â¥Ã˜Â±Ã˜Â³Ã˜Â§Ã™â€ Ã˜Â·Ã™â€Ã˜Â¨Ã™Æ’. Ã™Å Ã˜Â±Ã˜Â¬Ã™â€° Ã˜Â§Ã™â€Ã™â€¦Ã˜Â­Ã˜Â§Ã™Ë†Ã™â€Ã˜Â© Ã™â€¦Ã˜Â±Ã˜Â© Ã˜Â£Ã˜Â®Ã˜Â±Ã™â€°.",
        emailAlreadyRegistered:
          "Ã™â€¡Ã˜Â°Ã˜Â§ Ã˜Â§Ã™â€Ã˜Â¨Ã˜Â±Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜Â¥Ã™â€Ã™Æ’Ã˜ÂªÃ˜Â±Ã™Ë†Ã™â€ Ã™Å  Ã™â€¦Ã˜Â³Ã˜Â¬Ã™â€ Ã˜Â¨Ã˜Â§Ã™â€Ã™ÂÃ˜Â¹Ã™â€ Ã™â€Ã™â€Ã™Ë†Ã˜ÂµÃ™Ë†Ã™â€ Ã˜Â§Ã™â€Ã™â€¦Ã˜Â¨Ã™Æ’Ã˜Â±.",
        emailAlreadySubscribed:
          "Ã™â€¡Ã˜Â°Ã˜Â§ Ã˜Â§Ã™â€Ã˜Â¨Ã˜Â±Ã™Å Ã˜Â¯ Ã˜Â§Ã™â€Ã˜Â¥Ã™â€Ã™Æ’Ã˜ÂªÃ˜Â±Ã™Ë†Ã™â€ Ã™Å  Ã™â€¦Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Æ’ Ã˜Â¨Ã˜Â§Ã™â€Ã™ÂÃ˜Â¹Ã™â€ Ã™ÂÃ™Å  Ã™â€ Ã˜Â´Ã˜Â±Ã˜ÂªÃ™â€ Ã˜Â§ Ã˜Â§Ã™â€Ã˜Â¥Ã˜Â®Ã˜Â¨Ã˜Â§Ã˜Â±Ã™Å Ã˜Â©.",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        resultsFreightValue: "Freight/unit",
        resultsPaymentValue: "Fee load",
        resultsExceptionsValue: "Exceptions",
        homeSeoTitle:
          "Turkish Supplier Consolidation & Export Operations | Bundleist",
        homeSeoDescription:
          "Bundleist coordinates supplier validation, managed settlements, Istanbul warehouse consolidation, and export documentation in one accountable workflow.",
        homeSeoKeywords:
          "turkish supplier consolidation, export operations turkey, import consolidation workflow, istanbul consolidation warehouse, supplier settlement workflow, export documentation management, b2b procurement turkey, freight consolidation service",
        comparisonBadge: "No hype. Operational truth.",
        comparisonDisclaimer:
          "Outcomes depend on supplier readiness, order mix, and destination lane. We focus on controllable process improvements.",
        fromTheBlog: "From the blog",
        newsletterNoSpam:
          "No spam. Product updates and export consolidation insights only.",
        newsletterEmailPlaceholder: "you@company.com",
        subscribed: "Subscribed",
        newsletterThanks: "Thank you for subscribing.",
        invalidEmailAddress: "Please enter a valid email address.",
        genericTryAgain: "Something went wrong. Please try again.",
        footerContact: "Contact",
        footerBuiltFor:
          "Built for procurement teams, forwarders, and operators.",
        heroOpsConsole: "Ops console",
        heroSearchId: "Search ID",
        heroNavRelationships: "Relationships",
        heroNavShipments: "Shipments",
        heroNavLedger: "Ledger",
        heroMockTitle: "Mixed consolidation, one ledger",
        heroMockSubtitle:
          "Orders and customers roll up into one container shipment. Costs are distributed with audit trail.",
        heroOrdersMeta: "8 ready, 4 in QC",
        heroCustomers: "Customers",
        heroCustomersMeta: "Mixed consolidation",
        heroConsolidationMeta: "2 mixed, 1 in transit",
        heroOrderIdA: "ORD-2847",
        heroOrderVolumeA: "2.10 m3",
        heroOrderIdB: "ORD-2910",
        heroOrderVolumeB: "1.40 m3",
        heroConsolidationCode: "CON-ATLAS (Mixed)",
        heroShipmentCode: "SHP-HMB",
        heroDelta: "Delta",
        heroActualVsBilled: "Actual vs billed",
        heroRelationshipFlow: "Relationship flow",
        heroVolumeProportional: "Volume proportional",
        heroNeedsActualCost: "Awaiting final cost",
        heroCustomersCount: "4 customers",
        heroShipmentInTransit: "In transit",
        heroLedgerNet: "Ledger net +$12,340",
        heroCapacity: "Capacity",
        heroExceptions: "Exceptions",
        heroNeedAction: "need action",
        heroMissingActualShippingCost: "Missing actual shipping cost",
        heroDistributionReadyAfterCostSet: "Distribution ready after cost set",
      },
    },
    tr: {
      translation: {
        dashboardWelcome: "HoÃ…Å¸geldin, {{name}}",
        dashboardGrowth: "BÃƒÂ¼yÃƒÂ¼me",
        dashboardQuickSummary: "HesabÃ„Â±nÃ„Â±zÃ„Â±n hÃ„Â±zlÃ„Â± bir ÃƒÂ¶zeti",
        dashboardBalance: "Bakiye",
        dashboardOrdersInProgress: "Devam Eden SipariÃ…Å¸ler",
        dashboardActiveConsolidations: "Aktif Konsolidasyonlar",
        dashboardActiveConsolidation: "Aktif Konsolidasyon",
        dashboardPlanning: "Planlama",
        dashboardConsolidationName: "atlas-avrupa",
        dashboardLocationHamburg: "ist-hamburg",
        dashboardVolume: "Hacim",
        dashboardWeight: "AÃ„Å¸Ã„Â±rlÃ„Â±k",
        dashboardDeparts: "KalkÃ„Â±Ã…Å¸",
        dashboardContainer: "Konteyner",
        dashboardLiveActivity: "CanlÃ„Â± Aktivite",
        dashboardActivityPayment:
          "Ã¢â‚¬Â¢ SipariÃ…Å¸ {{order}} iÃƒÂ§in ÃƒÂ¶deme iÃ…Å¸lendi - {{amount}}",
        dashboardActivityConsolidationCapacity:
          "Ã¢â‚¬Â¢ Konsolidasyon '{{consolidation}}' kapasitesi %42'ye gÃƒÂ¼ncellendi",
        dashboardOrdersAwaiting: "Konsolidasyon Bekleyen SipariÃ…Å¸ler",
        dashboardOrderItem: "endÃƒÂ¼striyel makine",
        dashboardOrderReady: "HazÃ„Â±r",
        dashboardSupplier: "TedarikÃƒÂ§i",
        dashboardSupplierAtlas: "atlas imalat",
        dashboardSupplierEuro: "euro otomotiv",
        dashboardOrderValue: "DeÃ„Å¸er",
        dashboardYourShipments: "GÃƒÂ¶nderileriniz",
        dashboardConsolidation: "Konsolidasyon",
        dashboardConsolidationPhoenix: "feniks",
        dashboardConsolidationDelivered: "Teslim edildi",
        dashboardCarrier: "TaÃ…Å¸Ã„Â±yÃ„Â±cÃ„Â±",
        dashboardCarrierGlobal: "kÃƒÂ¼resel ekspres",
        dashboardShipped: "GÃƒÂ¶nderildi",
        dashboardConsolidationDelta: "delta",
        dashboardConsolidationInTransit: "Transit",
        dashboardCarrierMaritime: "denizcilik lojistiÃ„Å¸i",
        dashboardActivityNewSupplierInquiry:
          "Ã¢â‚¬Â¢ '{{supplier}}'den yeni tedarikÃƒÂ§i sorgusu",
        dashboardHome: "GÃƒÂ¶sterge Paneli",
        dashboardOrders: "SipariÃ…Å¸ler",
        dashboardConsolidations: "Konsolidasyonlar",
        dashboardShipments: "Sevkiyatlar",
        dashboardSuppliers: "TedarikÃƒÂ§iler",
        dashboardPayments: "Ãƒâ€“demeler",
        features: "Ãƒâ€“zellikler",
        howItWorks: "NasÃ„Â±l Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r",
        pricing: "FiyatlandÃ„Â±rma",
        blog: "Blog",
        getStarted: "BaÃ…Å¸layÃ„Â±n",
        smartExportConsolidation:
          "UÃƒÂ§tan uca TÃƒÂ¼rk tedarikÃƒÂ§i konsolidasyonu",
        turkishSupplyChain: "TÃƒÂ¼rk Tedarik Zinciri",
        complexity: "KarmaÃ…Å¸Ã„Â±klÃ„Â±Ã„Å¸Ã„Â±,",
        heroDescription: `Her sipariÃ…Å¸i, konsolidasyonu ve sevkiyatÃ„Â± tek yerde gÃƒÂ¶rÃƒÂ¼n.
SatÃ„Â±n almadan teslimata kadar gerÃƒÂ§ek durumlar, maliyetler ve sonraki aksiyonlar.
Sadece TÃƒÂ¼rkiye'den alÃ„Â±m yapmak iÃƒÂ§in Ã…Å¸irket iÃƒÂ§i bir operasyon ekibi kurmanÃ„Â±za gerek yok.`,
        talkToOurTeam: "Ekibimizle KonuÃ…Å¸un",
        heroTitle:
          "TÃƒÂ¼rk tedarikÃƒÂ§ilerin peÃ…Å¸inden koÃ…Å¸mayÃ„Â± bÃ„Â±rakÃ„Â±n.",
        heroSubtitle:
          "ParÃƒÂ§alanmÃ„Â±Ã…Å¸ ithalatlarÃ„Â± akÃ„Â±llÃ„Â± konsolidasyona dÃƒÂ¶nÃƒÂ¼Ã…Å¸tÃƒÂ¼rÃƒÂ¼n. AI destekli platformumuzla maliyetleri %65 azaltÃ„Â±n ve belgelendirmeyi 15 kat hÃ„Â±zlandÃ„Â±rÃ„Â±n.",
        heroButton: "YolculuÃ„Å¸unuza BaÃ…Å¸layÃ„Â±n",
        heroSecondaryButton: "Demo Ã„Â°zleyin",
        complexityTransformed:
          "KarmaÃ…Å¸Ã„Â±klÃ„Â±k DÃƒÂ¶nÃƒÂ¼Ã…Å¸tÃƒÂ¼rÃƒÂ¼ldÃƒÂ¼",
        efficiencyDelivered: "Verimlilik Teslim Edildi",
        readyToStreamline:
          "Tedarik zincirinizi dÃƒÂ¼zenlemeye hazÃ„Â±r mÃ„Â±sÃ„Â±nÃ„Â±z?",
        masterTurkishProcurement:
          "TÃƒÂ¼rkiye TedariÃ„Å¸inde Daha Ãƒâ€“nce GÃƒÂ¶rÃƒÂ¼lmemiÃ…Å¸ UstalÃ„Â±k",
        whyJuggleSuppliers:
          "Neden onlarca tedarikÃƒÂ§iyle ayrÃ„Â± ayrÃ„Â± uÃ„Å¸raÃ…Å¸asÃ„Â±nÃ„Â±z ki?",
        consolidateEveryPurchase:
          "TÃƒÂ¼m TÃƒÂ¼rk alÃ„Â±mlarÃ„Â±nÃ„Â±zÃ„Â± tek bir gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ sevkiyatta birleÃ…Å¸tirin",
        onePaymentContract:
          "Tek ÃƒÂ¶deme, tek sÃƒÂ¶zleÃ…Å¸me, tek konÃ…Å¸imento",
        maximumEfficiencyStreamlined:
          "AkÃ„Â±cÃ„Â± operasyonlarla maksimum verimlilik",
        statisticsTitle: "Kendi Kendini Anlatan SonuÃƒÂ§lar",
        statisticsSubtitle:
          "Konsolidasyon platformumuzun tedarik verimliliÃ„Å¸inizi nasÃ„Â±l dÃƒÂ¶nÃƒÂ¼Ã…Å¸tÃƒÂ¼rdÃƒÂ¼Ã„Å¸ÃƒÂ¼nÃƒÂ¼ gÃƒÂ¶rÃƒÂ¼n",
        fasterDocumentation: "Daha HÃ„Â±zlÃ„Â± Belgelendirme",
        singleBillOfLading: "Birden fazla belge yerine tek KonÃ…Å¸imento",
        costReduction: "Maliyet Azaltma",
        lowerShippingCosts:
          "AkÃ„Â±llÃ„Â± konsolidasyon ile daha dÃƒÂ¼Ã…Å¸ÃƒÂ¼k nakliye maliyetleri",
        timeSavings: "Zaman Tasarrufu",
        streamlinedProcess: "DÃƒÂ¼zenlenmiÃ…Å¸ tedarik sÃƒÂ¼reci yÃƒÂ¶netimi",
        comparisonTitle:
          "Ãƒâ€¡oÃ„Å¸u Ã„Â°nsan Neden ZorlanÃ„Â±r (Ve Biz Neden ZorlanmayÃ„Â±z)",
        comparisonSubtitle:
          "Bundleist'in parÃƒÂ§alanmÃ„Â±Ã…Å¸ ithalat sÃƒÂ¼reÃƒÂ§lerini nasÃ„Â±l dÃƒÂ¼zenli konsolidasyona dÃƒÂ¶nÃƒÂ¼Ã…Å¸tÃƒÂ¼rdÃƒÂ¼Ã„Å¸ÃƒÂ¼nÃƒÂ¼ gÃƒÂ¶rÃƒÂ¼n",
        traditionalImports: "Eski YÃƒÂ¶ntem:",
        fragmentedComplex: "ParÃƒÂ§alanmÃ„Â±Ã…Å¸ ve KarmaÃ…Å¸Ã„Â±k",
        multipleShipments:
          "Her tedarikÃƒÂ§i ayrÃ„Â± ayrÃ„Â± gÃƒÂ¶nderir (pahalÃ„Â± ve yavaÃ…Å¸)",
        multipleShipmentsDesc: "",
        complexDocumentation:
          "FarklÃ„Â± banka hesaplarÃ„Â±na birden fazla ÃƒÂ¶deme (riskli)",
        complexDocumentationDesc: "",
        paymentRisks:
          "GÃƒÂ¼mrÃƒÂ¼k iÃƒÂ§in farklÃ„Â± belgeler yÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± (kafa karÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±cÃ„Â±)",
        paymentRisksDesc: "",
        responseRate: "Bir Ã…Å¸eyler ters giderse kimse sorumlu deÃ„Å¸il",
        delays: "",
        protection: "",
        bundleistSolution: "Bizim YÃƒÂ¶ntemimiz:",
        smartConsolidated: "AkÃ„Â±llÃ„Â± ve Konsolide",
        recommended: "Ãƒâ€“NERÃ„Â°LEN",
        singleConsolidatedShipment:
          "Her Ã…Å¸ey ÃƒÂ¶nce Ã„Â°stanbul depomuza gelir",
        singleConsolidatedShipmentDesc: "",
        streamlinedDocumentation:
          "DoÃ„Å¸rular, konsolide eder ve tek bir birim olarak gÃƒÂ¶ndeririz",
        streamlinedDocumentationDesc: "",
        securePaymentHandling:
          "Tek ÃƒÂ¶deme bize yapÃ„Â±lÃ„Â±r, tÃƒÂ¼m tedarikÃƒÂ§i ÃƒÂ¶demelerini biz hallederiz",
        securePaymentHandlingDesc: "",
        fasterProcess: "Tek iletiÃ…Å¸im noktasÃ„Â±, tek belge seti",
        costSavings: "TÃƒÂ¼m sÃƒÂ¼reÃƒÂ§ten biz sorumluyuz",
        protected: "",
        choosePlan: "FiyatlandÃ„Â±rmamÃ„Â±z (Gizli ÃƒÅ“cret Yok)",
        transparentPricing:
          "Ã„Â°Ã…Å¸ ihtiyaÃƒÂ§larÃ„Â±nÃ„Â±zla birlikte ÃƒÂ¶lÃƒÂ§eklenen Ã…Å¸effaf fiyatlandÃ„Â±rma.",
        starter: "Deneme",
        growth: "BÃ¼yÃ¼me",
        enterprise: "Kurumsal",
        starterDesc:
          "Deneme kullanÃ„Â±mÃ„Â± iÃƒÂ§in ideal. Tek konsolide sevkiyat, tÃƒÂ¼m hizmetler dahil.",
        growthDesc:
          "DÃƒÂ¼zenli ithalatÃƒÂ§Ã„Â±lar iÃƒÂ§in. Kontrol paneli, takip ve tercihli nakliye oranlarÃ„Â± iÃƒÂ§erir.",
        enterpriseDesc:
          "Ciddi ithalatÃƒÂ§Ã„Â±lar iÃƒÂ§in hacim fiyatlandÃ„Â±rmasÃ„Â±. Ãƒâ€“ncelikli iÃ…Å¸lem ve ÃƒÂ¶zel raporlama.",
        oneTimeFee: "konsolidasyon baÃ…Å¸Ã„Â±na",
        totalOrderValue: "yÃƒÂ¶netilen sipariÃ…Å¸ deÃ„Å¸erinin",
        after5Consolidations: "aylÃ„Â±k 5+ konsolidasyon sonrasÃ„Â±",
        bankTransferFees:
          "Navlun, vergiler ve varÃ„Â±Ã…Å¸ masraflarÃ„Â± gerÃƒÂ§ekleÃ…Å¸en maliyet ÃƒÂ¼zerinden yansÃ„Â±tÃ„Â±lÃ„Â±r.",
        volumeDiscounting:
          "Fiyat, hat istikrarÃ„Â± ve aylÃ„Â±k hacme gÃƒÂ¶re gÃƒÂ¼ncellenir.",
        singleConsolidatedShipmentFeature: "Tek konsolide sevkiyat",
        supplierPaymentHandling: "TedarikÃƒÂ§i ÃƒÂ¶deme yÃƒÂ¶netimi",
        singleBillOfLadingFeature: "Tek konÃ…Å¸imento",
        documentationSupport: "DokÃƒÂ¼mantasyon desteÃ„Å¸i",
        multipleConsolidatedShipments: "Ãƒâ€¡oklu konsolide sevkiyatlar",
        digitalProcurementDashboard: "Dijital tedarik paneli",
        realTimeTracking: "GerÃƒÂ§ek zamanlÃ„Â± takip",
        preferredShippingRates: "Tercihli nakliye oranlarÃ„Â±",
        paymentHandlingProtection: "Ãƒâ€“deme yÃƒÂ¶netimi ve koruma",
        volumeDiscountPricing: "Hacim indirim fiyatlandÃ„Â±rmasÃ„Â±",
        priorityConsolidation: "Ãƒâ€“ncelikli konsolidasyon",
        customizedShippingSchedule:
          "Ãƒâ€“zelleÃ…Å¸tirilmiÃ…Å¸ nakliye programÃ„Â±",
        advancedAnalyticsReporting: "GeliÃ…Å¸miÃ…Å¸ analitik ve raporlama",
        warehouseStorageOptions: "Depo depolama seÃƒÂ§enekleri",
        strategicSourcingAssistance: "Stratejik tedarik yardÃ„Â±mÃ„Â±",
        pricingOperatingModel: "Ticari Ãƒâ€¡erÃƒÂ§eve",
        pricingAllPlansInclude: "Her Plan Ã…ÂunlarÃ„Â± Ã„Â°ÃƒÂ§erir",
        pricingAllPlansIncludeDesc:
          "Temel yÃƒÂ¼rÃƒÂ¼tme kontrolleri tÃƒÂ¼m planlarda aynÃ„Â±dÃ„Â±r; operasyon ritmi ve hizmet derinliÃ„Å¸i ihtiyaca gÃƒÂ¶re ÃƒÂ¶lÃƒÂ§eklenir.",
        pricingInclusionVerification:
          "TedarikÃƒÂ§i ve ticari koÃ…Å¸ul doÃ„Å¸rulamasÃ„Â±",
        pricingInclusionSettlement:
          "Ãƒâ€“deme kanÃ„Â±tÃ„Â± ile yÃƒÂ¶netilen mutabakat akÃ„Â±Ã…Å¸Ã„Â±",
        pricingInclusionDocumentation:
          "Kontrol listesi yÃƒÂ¶netiÃ…Å¸imi ile ihracat belge paketi",
        pricingInclusionTracking:
          "Kilometre taÃ…Å¸Ã„Â± gÃƒÂ¶rÃƒÂ¼nÃƒÂ¼rlÃƒÂ¼Ã„Å¸ÃƒÂ¼ ve istisna sahipliÃ„Å¸i",
        pricingCommercialGuardrail:
          "BaÃ„Å¸layÃ„Â±cÃ„Â± sÃƒÂ¶zleÃ…Å¸me yok. Ãƒâ€“nce pilotla baÃ…Å¸layÃ„Â±n, ritim oturunca hacim fiyatÃ„Â±na geÃƒÂ§in.",
        pricingEngagementModel: "Ãƒâ€¡alÃ„Â±Ã…Å¸ma Modeli",
        pricingBestFor: "Uygun OlduÃ„Å¸u Durum",
        pricingStarterModel: "UÃƒÂ§tan uca tek dÃƒÂ¶ngÃƒÂ¼",
        pricingGrowthModel: "Tekrarlayan aylÃ„Â±k kapsam",
        pricingEnterpriseModel: "YÃƒÂ¼ksek hacim iÃƒÂ§in ÃƒÂ¶zel hat",
        pricingStarterFit:
          "SÃ„Â±nÃ„Â±rlÃ„Â± baÃ…Å¸langÃ„Â±ÃƒÂ§ hacmiyle sÃƒÂ¼reÃƒÂ§ uyumunu test eden ithalatÃƒÂ§Ã„Â±lar",
        pricingGrowthFit:
          "Birden fazla TÃƒÂ¼rk tedarikÃƒÂ§iyle tekrarlayan sipariÃ…Å¸ yÃƒÂ¶neten ekipler",
        pricingEnterpriseFit:
          "Daha sÃ„Â±kÃ„Â± SLA gereksinimleriyle stabil yÃƒÂ¼ksek hacimli hat yÃƒÂ¶neten Ã…Å¸irketler",
        pricingTierStarter: "Deneme",
        pricingTierGrowth: "BÃ¼yÃ¼me",
        pricingTierEnterprise: "Kurumsal",
        featuresHeadline:
          "SipariÃ…Å¸lerinizin Nerede OlduÃ„Å¸unu Asla Merak Etmeyin",
        featuresSubtext:
          'Size gerÃƒÂ§ekten her Ã…Å¸eyi gÃƒÂ¶steren bir gÃƒÂ¶sterge paneli. GerÃƒÂ§ek ayrÃ„Â±ntÃ„Â±lar, "iÃ…Å¸leniyor" saÃƒÂ§malÃ„Â±Ã„Å¸Ã„Â± deÃ„Å¸il. ArtÃ„Â±k tedarikÃƒÂ§ilere e-posta gÃƒÂ¶ndermek veya ÃƒÂ¶demeler hakkÃ„Â±nda merak etmek yok. GiriÃ…Å¸ yapÃ„Â±n ve hepsini tek bir yerde gÃƒÂ¶rÃƒÂ¼n.',
        importConsolidation:
          "TÃƒÂ¼rk Ã„Â°thalat Konsolidasyonu BasitleÃ…Å¸tirildi",
        importConsolidationDesc:
          "Birden fazla TÃƒÂ¼rk tedarikÃƒÂ§i sipariÃ…Å¸ini tek ÃƒÂ¶deme ve belgelerle tek sevkiyatta birleÃ…Å¸tirin.",
        consolidatedShipping: "Konsolide Nakliye",
        consolidatedShippingDesc:
          "Ãƒâ€¡eÃ…Å¸itli tedarikÃƒÂ§ilerden birden fazla satÃ„Â±n alma iÃ…Å¸lemini tek sevkiyatta birleÃ…Å¸tirin.",
        singleBillOfLadingTitle: "Tek KonÃ…Å¸imento",
        singleBillOfLadingDesc:
          "Ã„Â°hracat beyannamesini iÃ…Å¸ler ve tÃƒÂ¼m sevkiyatlarÃ„Â±nÃ„Â±z iÃƒÂ§in tek konÃ…Å¸imento oluÃ…Å¸tururuz.",
        centralizedPayments: "Merkezi Ãƒâ€“demeler",
        centralizedPaymentsDesc:
          "FarklÃ„Â± tedarikÃƒÂ§ilere birden fazla uluslararasÃ„Â± transfer yerine tek ÃƒÂ¶deme yapÃ„Â±n.",
        simplifiedDocumentation: "BasitleÃ…Å¸tirilmiÃ…Å¸ Belgelendirme",
        simplifiedDocumentationDesc:
          "UluslararasÃ„Â± nakliye iÃƒÂ§in gerekli tÃƒÂ¼m karmaÃ…Å¸Ã„Â±k belgeleri yÃƒÂ¶netiriz.",
        globalCompliance: "KÃƒÂ¼resel Uyumluluk",
        globalComplianceDesc:
          "Platformumuz tÃƒÂ¼m sevkiyatlarÃ„Â±n ticaret dÃƒÂ¼zenlemelerine uygun olmasÃ„Â±nÃ„Â± saÃ„Å¸lar.",
        supplierManagement: "TedarikÃƒÂ§i YÃƒÂ¶netimi",
        supplierManagementDesc:
          "TÃƒÂ¼m TÃƒÂ¼rk tedarikÃƒÂ§ilerinizi tek yerde kolayca yÃƒÂ¶netin.",
        deliveryGuarantee: "Teslimat Garantisi",
        deliveryGuaranteeDesc:
          "BelirtildiÃ„Å¸i gibi tÃƒÂ¼m mallarÃ„Â± almanÃ„Â±zÃ„Â± garanti ediyoruz.",
        latestInsights: "Son GÃƒÂ¶rÃƒÂ¼Ã…Å¸ler & Blog YazÃ„Â±larÃ„Â±",
        stayUpdatedWithTrends:
          "KÃƒÂ¼resel tedarik alanÃ„Â±ndaki en son trendler hakkÃ„Â±nda gÃƒÂ¼ncel kalÃ„Â±n",
        viewAllArticles: "TÃƒÂ¼m Makaleleri GÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼le",
        readMore: "DevamÃ„Â±nÃ„Â± Oku",
        publishedOn: "YayÃ„Â±n tarihi",
        blogNotFound: "Blog yazÃ„Â±sÃ„Â± bulunamadÃ„Â±",
        backToBlog: "Blog'a DÃƒÂ¶n",
        ourBlog: "Bizim Blog",
        insightsAndNews: "Icgoruler ve Haberler",
        createNewContent: "Yeni Icerik Olustur",
        noNewsYet: "Henuz haber yayinlanmadi",
        createFirstNews: "Ilk Haberi Olustur",
        contentType: "Icerik Turu",
        blogPost: "Blog Yazisi",
        industryNews: "Sektor Haberleri",
        blogPosts: "Blog Yazilari",
        insightsOnCrossBorderCommerce:
          "SÃ„Â±nÃ„Â±r Ãƒâ€“tesi Ticaret ÃƒÅ“zerine Ã„Â°ÃƒÂ§gÃƒÂ¶rÃƒÂ¼ler",
        expertAnalysisDesc:
          "Uzman analizleri, endÃƒÂ¼stri trendleri ve TÃƒÂ¼rk tedarik zincirinizi optimize etmek iÃƒÂ§in pratik ipuÃƒÂ§larÃ„Â±.",
        createNewPost: "Yeni YazÃ„Â± OluÃ…Å¸tur",
        allPosts: "TÃƒÂ¼m YazÃ„Â±lar",
        noBlogPostsYet: "HenÃƒÂ¼z yayÃ„Â±nlanmÃ„Â±Ã…Å¸ blog yazÃ„Â±sÃ„Â± yok.",
        createFirstPost: "Ã„Â°lk YazÃ„Â±yÃ„Â± OluÃ…Å¸tur",
        readArticle: "Makaleyi Oku",
        edit: "DÃƒÂ¼zenle",
        wantToStayUpdated:
          "En son gÃƒÂ¶rÃƒÂ¼Ã…Å¸lerimizle gÃƒÂ¼ncel kalmak ister misiniz?",
        exclusiveInsightsDesc:
          "Ãƒâ€“zel gÃƒÂ¶rÃƒÂ¼Ã…Å¸ler, endÃƒÂ¼stri trendleri ve uzman analizlerini doÃ„Å¸rudan gelen kutunuza teslim edin.",
        subscribeToNewsletterBtn: "BÃƒÂ¼ltenimize Abone Olun",
        loadingBlogPosts: "Blog yazÃ„Â±larÃ„Â± yÃƒÂ¼kleniyor...",
        share: "PaylaÃ…Å¸",
        postNotFound: "YazÃ„Â± BulunamadÃ„Â±",
        blogPostNotExist:
          "AradÃ„Â±Ã„Å¸Ã„Â±nÃ„Â±z blog yazÃ„Â±sÃ„Â± mevcut deÃ„Å¸il.",
        General: "Genel",
        "Supply Chain": "Tedarik Zinciri",
        "E-commerce": "E-ticaret",
        Logistics: "Lojistik",
        "International Trade": "UluslararasÃ„Â± Ticaret",
        "Sourcing from TÃƒÂ¼rkiye": "TÃƒÂ¼rkiye'den Tedarik",
        "Cross Border Procurement": "SÃ„Â±nÃ„Â±r Ãƒâ€“tesi Tedarik",
        minRead: "dk okuma",
        navigation: "Navigasyon",
        stayUpdated: "GÃƒÂ¼ncel KalÃ„Â±n",
        stayUpdatedDesc:
          "Tedarik zinciri optimizasyonu ve uluslararasÃ„Â± ticaret iÃƒÂ§gÃƒÂ¶rÃƒÂ¼leri hakkÃ„Â±nda en son gÃƒÂ¼ncellemeleri alÃ„Â±n.",
        subscribeNewsletter: "BÃƒÂ¼ltene Abone Ol",
        privacyPolicy: "Gizlilik PolitikasÃ„Â±",
        termsOfService: "Hizmet Ã…ÂartlarÃ„Â±",
        allRightsReserved: "TÃƒÂ¼m haklarÃ„Â± saklÃ„Â±dÃ„Â±r.",
        madeWith: "Ã„Â°le yapÃ„Â±ldÃ„Â±",
        inIstanbul: "Ã„Â°stanbul'da",
        brandTagline: "SÃ„Â±nÃ„Â±r Ãƒâ€“tesi Tedariki BasitleÃ…Å¸tirme",
        brandDesc:
          "AkÃ„Â±llÃ„Â± konsolidasyon hizmetleriyle TÃƒÂ¼rk tedarik zincirinizi dÃƒÂ¶nÃƒÂ¼Ã…Å¸tÃƒÂ¼rÃƒÂ¼n. Maliyetleri azaltÃ„Â±n, lojistiÃ„Å¸i optimize edin ve uluslararasÃ„Â± iÃ…Å¸inizi gÃƒÂ¼venle bÃƒÂ¼yÃƒÂ¼tÃƒÂ¼n.",
        contactEmail: "bundleist@gmail.com",
        locationIstanbul: "Ã„Â°stanbul, TÃƒÂ¼rkiye",
        dashboardAlt: "Bundleist GÃƒÂ¶sterge Paneli ArayÃƒÂ¼zÃƒÂ¼",
        findSuppliers: "SipariÃ…Å¸lerinizi Bize GÃƒÂ¶nderin",
        findSuppliersDesc:
          "TÃƒÂ¼rk tedarikÃƒÂ§ilerinizden aldÃ„Â±Ã„Å¸Ã„Â±nÃ„Â±z proforma faturalarÃ„Â±nÃ„Â±zÃ„Â± bize iletin. TedarikÃƒÂ§iniz yok mu? Size 3 seÃƒÂ§enek sunacaÃ„Å¸Ã„Â±z.",
        supplierVerification: "TedarikÃƒÂ§i DoÃ„Å¸rulamasÃ„Â±",
        supplierVerificationDesc:
          "Ekibimiz tedarikÃƒÂ§ilerinizi doÃ„Å¸rulayacak ve onaydan sonra sizin adÃ„Â±nÃ„Â±za hareket etmek iÃƒÂ§in ana sÃƒÂ¶zleÃ…Å¸me imzalayacaÃ„Å¸Ã„Â±z.",
        paymentProcessing: "Ãƒâ€“deme Ã„Â°Ã…Å¸lemleri",
        paymentProcessingDesc:
          "Hesap bakiyenizden tÃƒÂ¼m sipariÃ…Å¸ ÃƒÂ¶demelerinizi sizin adÃ„Â±nÃ„Â±za tam Ã…Å¸effaflÃ„Â±kla yÃƒÂ¶neteceÃ„Å¸iz.",
        orderConsolidation: "SipariÃ…Å¸ Konsolidasyonu",
        orderConsolidationDesc:
          "Ekibimiz tÃƒÂ¼m sipariÃ…Å¸lerinizi alacak ve doÃ„Å¸rulayacak, ardÃ„Â±ndan bunlarÃ„Â± tek optimize edilmiÃ…Å¸ sevkiyatta birleÃ…Å¸tirecek.",
        documentationSimplified: "BasitleÃ…Å¸tirilmiÃ…Å¸ DokÃƒÂ¼mantasyon",
        documentationSimplifiedDesc:
          "TÃƒÂ¼m ihracat evraklarÃ„Â±nÃ„Â±, gÃƒÂ¼mrÃƒÂ¼k formlarÃ„Â±nÃ„Â± yÃƒÂ¶netiriz ve konsolide sevkiyatÃ„Â±nÃ„Â±z iÃƒÂ§in tek konÃ…Å¸imento oluÃ…Å¸tururuz.",
        globalShipping: "KÃƒÂ¼resel Nakliye",
        globalShippingDesc:
          "Konsolide sipariÃ…Å¸iniz gerÃƒÂ§ek zamanlÃ„Â± takip ve gÃƒÂ¼ncellemelerle hedefinize sevk edilir.",
        easyDelivery: "Kolay Teslimat",
        easyDeliveryDesc:
          "Birden fazla sipariÃ…Å¸inizi tek sevkiyat olarak alÃ„Â±n, zaman tasarrufu yapÃ„Â±n ve gÃƒÂ¼mrÃƒÂ¼k karmaÃ…Å¸Ã„Â±klÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± azaltÃ„Â±n.",
        saveShippingCosts: "Nakliye maliyetlerinde %40'a kadar tasarruf",
        reduceDocumentation: "Belgelendirmeyi %70 azaltÃ„Â±r",
        onePaymentAllSuppliers: "TÃƒÂ¼m tedarikÃƒÂ§iler iÃƒÂ§in tek ÃƒÂ¶deme",
        digitalFirstApproach: "Dijital ÃƒÂ¶ncelikli yaklaÃ…Å¸Ã„Â±m",
        countriesSupported: "150+ ÃƒÂ¼lke desteklenir",
        unlimitedSupplierNetwork: "SÃ„Â±nÃ„Â±rsÃ„Â±z tedarikÃƒÂ§i aÃ„Å¸Ã„Â±",
        onTimeDeliveryRate: "%99,5 zamanÃ„Â±nda teslimat oranÃ„Â±",
        mostPopularFeature: "En PopÃƒÂ¼ler Ãƒâ€“zellik",
        essentialFeature: "Temel Ãƒâ€“zellik",
        premiumSupportIncluded: "Premium Destek Dahil",
        simpleProcess: "Basit SÃƒÂ¼reÃƒÂ§",
        howItWorksDesc:
          "Modern teknolojimiz ve uzman desteÃ„Å¸imizle TÃƒÂ¼rkiye'den kaynak bulma ve nakliye sÃƒÂ¼recimiz zahmetsizdir.",
        start: "BAÃ…ÂLA",
        done: "BÃ„Â°TTÃ„Â°",
        fullName: "Ad Soyad",
        businessEmail: "Ã„Â°Ã…Å¸ E-postasÃ„Â±",
        company: "Ã…Âirket",
        companyOptional: "Ã…Âirket (Ã„Â°steÃ„Å¸e BaÃ„Å¸lÃ„Â±)",
        whyInterested: "Bundleist'e neden ilgi duyuyorsunuz?",
        whatInterests: "Bundleist'te sizi en ÃƒÂ§ok ne ilgilendiriyor?",
        tellUsAboutNeeds:
          "Ã„Â°Ã…Å¸ ihtiyaÃƒÂ§larÃ„Â±nÃ„Â±zdan ve Bundleist'in nasÃ„Â±l yardÃ„Â±mcÃ„Â± olabileceÃ„Å¸inden bahsedin...",
        tellUsInterests:
          "Tedarik zinciri ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mlerimizin hangi yÃƒÂ¶nlerinin sizi en ÃƒÂ§ok ilgilendirdiÃ„Å¸ini sÃƒÂ¶yleyin...",
        submitting: "GÃƒÂ¶nderiliyor...",
        requestEarlyAccess: "Erken EriÃ…Å¸im Talep Et",
        subscribe: "Abone Ol",
        backToHome: "Ana sayfaya dÃƒÂ¶n",
        subscribeToOurNewsletter: "BÃƒÂ¼ltenimize Abone Olun",
        getStartedPage: "BaÃ…Å¸layÃ„Â±n",
        getStartedDesc:
          "Bundleist'in yenilikÃƒÂ§i tedarik zinciri ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mleriyle baÃ…Å¸layÃ„Â±n ve TÃƒÂ¼rk tedarikÃƒÂ§i yÃƒÂ¶netiminizi kolaylaÃ…Å¸tÃ„Â±rÃ„Â±n.",
        newsletterDesc:
          "Bundleist'in yenilikÃƒÂ§i tedarik zinciri ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mlerinden en son haberler ve gÃƒÂ¼ncellemelerle gÃƒÂ¼ncel kalÃ„Â±n.",
        neverShareEmail:
          "E-postanÃ„Â±zÃ„Â± asla baÃ…Å¸kalarÃ„Â±yla paylaÃ…Å¸mayacaÃ„Å¸Ã„Â±z.",
        requestSubmittedSuccess: "Talep baÃ…Å¸arÃ„Â±yla gÃƒÂ¶nderildi!",
        newsletterSubscriptionSuccess:
          "BÃƒÂ¼lten aboneliÃ„Å¸i baÃ…Å¸arÃ„Â±lÃ„Â±!",
        thankYouInterest:
          "Bundleist'e olan ilginiz iÃƒÂ§in teÃ…Å¸ekkÃƒÂ¼r ederiz. YakÃ„Â±nda sizinle iletiÃ…Å¸ime geÃƒÂ§eceÃ„Å¸iz.",
        successfullySubscribed:
          "BÃƒÂ¼ltenimize baÃ…Å¸arÃ„Â±yla abone oldunuz! Sizi bilgilendirmeye devam edeceÃ„Å¸iz.",
        submissionError: "GÃƒÂ¶nderim HatasÃ„Â±",
        failedToSubmit:
          "Talebinizi gÃƒÂ¶ndermekte baÃ…Å¸arÃ„Â±sÃ„Â±z olduk. LÃƒÂ¼tfen tekrar deneyin.",
        emailAlreadyRegistered:
          "Bu e-posta zaten erken eriÃ…Å¸im iÃƒÂ§in kayÃ„Â±tlÃ„Â±.",
        emailAlreadySubscribed: "Bu e-posta zaten bÃƒÂ¼ltenimize abone.",
        openMenu: "MenÃƒÂ¼yÃƒÂ¼ aÃƒÂ§",
        closeMenu: "MenÃƒÂ¼yÃƒÂ¼ kapat",
        resultsFreightValue: "Navlun/birim",
        resultsPaymentValue: "Masraf yükü",
        resultsExceptionsValue: "Ã„Â°stisnalar",
        homeSeoTitle:
          "TÃƒÂ¼rk TedarikÃƒÂ§i Konsolidasyonu ve Ã„Â°hracat OperasyonlarÃ„Â± | Bundleist",
        homeSeoDescription:
          "Bundleist, tedarikÃƒÂ§i doÃ„Å¸rulama, yÃƒÂ¶netilen ÃƒÂ¶demeler, Ã„Â°stanbul konsolidasyonu ve ihracat dokÃƒÂ¼mantasyonunu tek sorumlu akÃ„Â±Ã…Å¸ta yÃƒÂ¶netir.",
        homeSeoKeywords:
          "tÃƒÂ¼rk tedarikÃƒÂ§i konsolidasyonu, tÃƒÂ¼rkiye ihracat operasyonlarÃ„Â±, ithalat konsolidasyon sÃƒÂ¼reci, istanbul konsolidasyon deposu, tedarikÃƒÂ§i ÃƒÂ¶deme yÃƒÂ¶netimi, ihracat dokÃƒÂ¼man yÃƒÂ¶netimi, b2b satÃ„Â±n alma tÃƒÂ¼rkiye, navlun konsolidasyon hizmeti",
        comparisonBadge: "AbartÃ„Â± yok. Operasyonel gerÃƒÂ§ek.",
        comparisonDisclaimer:
          "SonuÃƒÂ§lar tedarikÃƒÂ§i hazÃ„Â±rlÃ„Â±Ã„Å¸Ã„Â±, sipariÃ…Å¸ karmasÃ„Â± ve hedef hatta baÃ„Å¸lÃ„Â±dÃ„Â±r. Kontrol edilebilir iyileÃ…Å¸tirmelere odaklanÃ„Â±rÃ„Â±z.",
        fromTheBlog: "Blogdan",
        newsletterNoSpam:
          "Spam yok. Sadece ÃƒÂ¼rÃƒÂ¼n gÃƒÂ¼ncellemeleri ve ihracat konsolidasyon iÃƒÂ§gÃƒÂ¶rÃƒÂ¼leri.",
        newsletterEmailPlaceholder: "siz@sirket.com",
        subscribed: "Abone olundu",
        newsletterThanks: "Abone olduÃ„Å¸unuz iÃƒÂ§in teÃ…Å¸ekkÃƒÂ¼rler.",
        invalidEmailAddress: "LÃƒÂ¼tfen geÃƒÂ§erli bir e-posta girin.",
        genericTryAgain: "Bir sorun oluÃ…Å¸tu. LÃƒÂ¼tfen tekrar deneyin.",
        footerContact: "Ã„Â°letiÃ…Å¸im",
        footerBuiltFor:
          "SatÃ„Â±n alma ekipleri, forwarderlar ve operasyon ekipleri iÃƒÂ§in.",
        heroOpsConsole: "Operasyon paneli",
        heroSearchId: "ID Ara",
        heroNavRelationships: "Ã„Â°liÃ…Å¸kiler",
        heroNavShipments: "Sevkiyatlar",
        heroNavLedger: "Defter",
        heroMockTitle: "Karma konsolidasyon, tek defter",
        heroMockSubtitle:
          "SipariÃ…Å¸ler ve mÃƒÂ¼Ã…Å¸teriler tek konteyner sevkiyatÃ„Â±nda birleÃ…Å¸ir. Maliyetler denetim izi ile daÃ„Å¸Ã„Â±tÃ„Â±lÃ„Â±r.",
        heroOrdersMeta: "8 hazÃ„Â±r, 4 kalite kontrolde",
        heroCustomers: "MÃƒÂ¼Ã…Å¸teriler",
        heroCustomersMeta: "Karma konsolidasyon",
        heroConsolidationMeta: "2 karma, 1 transit",
        heroOrderIdA: "ORD-2847",
        heroOrderVolumeA: "2.10 m3",
        heroOrderIdB: "ORD-2910",
        heroOrderVolumeB: "1.40 m3",
        heroConsolidationCode: "CON-ATLAS (Karma)",
        heroShipmentCode: "SHP-HMB",
        heroDelta: "Fark",
        heroActualVsBilled: "GerÃƒÂ§ekleÃ…Å¸en vs faturalanan",
        heroRelationshipFlow: "Ã„Â°liÃ…Å¸ki akÃ„Â±Ã…Å¸Ã„Â±",
        heroVolumeProportional: "Hacme orantÃ„Â±lÃ„Â±",
        heroNeedsActualCost: "GerÃƒÂ§ek maliyet gerekli",
        heroCustomersCount: "4 mÃƒÂ¼Ã…Å¸teri",
        heroShipmentInTransit: "Transit",
        heroLedgerNet: "Defter net +$12,340",
        heroCapacity: "Kapasite",
        heroExceptions: "Ã„Â°stisnalar",
        heroNeedAction: "aksiyon gerekli",
        heroMissingActualShippingCost: "GerÃƒÂ§ek nakliye maliyeti eksik",
        heroDistributionReadyAfterCostSet:
          "Maliyet girilince daÃ„Å¸Ã„Â±tÃ„Â±m hazÃ„Â±r",
      },
    },
  },
  s = P(W);
var y;
const g = (y = s.en) == null ? void 0 : y.translation;
["tr", "ar"].forEach((e) => {
  var t;
  const i = (t = s[e]) == null ? void 0 : t.translation;
  !i || !g || (s[e].translation = z(i, g));
});
const K = {
    oneTimeFee: "لكل عملية تجميع",
    totalOrderValue: "من قيمة الطلبات المدارة",
    after5Consolidations: "بعد 5+ عمليات تجميع شهرية",
    resultsFreightValue: "الشحن/وحدة",
    resultsPaymentValue: "عبء الرسوم",
    resultsExceptionsValue: "الاستثناءات",
    comparisonBadge: "بدون مبالغة. حقيقة تشغيلية.",
    heroOpsConsole: "لوحة العمليات",
    heroSearchId: "ابحث بالمعرف",
    heroNavRelationships: "العلاقات",
    heroNavShipments: "الشحنات",
    heroNavLedger: "دفتر الحسابات",
    heroMockTitle: "دمج مختلط، دفتر واحد",
    heroMockSubtitle:
      "تتجمع الطلبات والعملاء في شحنة حاوية واحدة. توزع التكاليف مع سجل تدقيق.",
    heroOrdersMeta: "8 جاهزة، 4 في فحص الجودة",
    heroCustomers: "العملاء",
    heroCustomersMeta: "دمج مختلط",
    heroConsolidationMeta: "2 مختلطة، 1 قيد النقل",
    heroDelta: "الفرق",
    heroActualVsBilled: "الفعلي مقابل المفوتر",
    heroRelationshipFlow: "تدفق العلاقات",
    heroVolumeProportional: "متناسب مع الحجم",
    heroNeedsActualCost: "يتطلب تكلفة فعلية",
    heroCustomersCount: "4 عملاء",
    heroShipmentInTransit: "قيد النقل",
    heroLedgerNet: "صافي الدفتر +$12,340",
    heroCapacity: "السعة",
    heroExceptions: "الاستثناءات",
    heroNeedAction: "بحاجة لإجراء",
    heroMissingActualShippingCost: "تكلفة الشحن الفعلية مفقودة",
    heroDistributionReadyAfterCostSet: "التوزيع جاهز بعد إدخال التكلفة",
  },
  j = { resultsPaymentValue: "Masraf yükü" };
var b;
(b = s.ar) != null &&
  b.translation &&
  (s.ar.translation = { ...s.ar.translation, ...K });
var k;
(k = s.tr) != null &&
  k.translation &&
  (s.tr.translation = { ...s.tr.translation, ...j });
if (typeof window < "u") {
  const e = window.localStorage.getItem(p);
  (e || window.localStorage.setItem(p, "auto"),
    e === "auto" && window.localStorage.removeItem("i18nextLng"));
}
l.use(R)
  .use(L)
  .init({
    resources: s,
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      caches: ["localStorage"],
      excludeCacheFor: ["cimode"],
      convertDetectedLanguage: (e) => T(e),
    },
    supportedLngs: ["en", "fr", "tr", "ar"],
    interpolation: { escapeValue: !1 },
  });
A(l.resolvedLanguage || l.language || "en");
l.on("languageChanged", A);
function B({ error: e }) {
  const i =
      e instanceof Error
        ? e.message
        : typeof e == "string"
          ? e
          : "Unknown error",
    t = e instanceof Error ? e.stack : "";
  return a.jsxs("div", {
    style: {
      padding: 24,
      fontFamily: "ui-sans-serif, system-ui, -apple-system",
    },
    children: [
      a.jsx("h1", {
        style: { fontSize: 18, fontWeight: 700, marginBottom: 8 },
        children: "App failed to start",
      }),
      a.jsx("p", {
        style: { color: "#b91c1c", marginBottom: 12 },
        children: i,
      }),
      a.jsx("pre", {
        style: {
          whiteSpace: "pre-wrap",
          background: "#0b1020",
          color: "#e5e7eb",
          padding: 12,
          borderRadius: 8,
          fontSize: 12,
          lineHeight: 1.4,
          maxWidth: 1e3,
        },
        children: t,
      }),
      a.jsx("p", {
        style: { marginTop: 12, color: "#374151" },
        children:
          "If this keeps happening, it is usually a missing env var (Supabase), or a network/RLS issue.",
      }),
    ],
  });
}
class Y extends F.Component {
  constructor() {
    super(...arguments);
    c(this, "state", { error: null });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  componentDidCatch(t) {
    console.error("App render error:", t);
  }
  render() {
    return this.state.error
      ? a.jsx(B, { error: this.state.error })
      : this.props.children;
  }
}
const x = document.getElementById("root");
if (!x) throw new Error("Could not find root element to mount to");
const N = v(x),
  u = (e) => {
    N.render(a.jsx(f.StrictMode, { children: a.jsx(B, { error: e }) }));
  };
window.addEventListener("error", (e) => {
  const i = e;
  u(i.error || i.message);
});
window.addEventListener("unhandledrejection", (e) => u(e.reason));
(async () => {
  try {
    const i = (
      await I(
        () => import("./app.js").then((t) => t.A),
        __vite__mapDeps([0, 1, 2, 3, 4, 5]),
      )
    ).default;
    N.render(
      a.jsx(f.StrictMode, { children: a.jsx(Y, { children: a.jsx(i, {}) }) }),
    );
  } catch (e) {
    u(e);
  }
})();
