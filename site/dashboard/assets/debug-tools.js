const DEBUG_STORAGE_KEY = "bundleist:dashboard:debug";
const DEBUG_QUERY_PARAM = "dashboard_debug";

let cachedDebugEnabled = null;

function readSearchParamFlag() {
  if (typeof window === "undefined" || !window.location) {
    return null;
  }
  try {
    const params = new URLSearchParams(window.location.search || "");
    if (!params.has(DEBUG_QUERY_PARAM)) {
      return null;
    }
    const raw = String(params.get(DEBUG_QUERY_PARAM) || "")
      .trim()
      .toLowerCase();
    return raw === "1" || raw === "true" || raw === "yes" || raw === "on";
  } catch {
    return null;
  }
}

function readStoredFlag() {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(DEBUG_STORAGE_KEY);
    if (raw == null) {
      return null;
    }
    return String(raw).toLowerCase() === "1";
  } catch {
    return null;
  }
}

function persistDebugFlag(enabled) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(DEBUG_STORAGE_KEY, enabled ? "1" : "0");
  } catch {
    // Ignore storage write failures (private browsing / locked storage).
  }
}

function resolveDebugFlag() {
  const fromQuery = readSearchParamFlag();
  if (fromQuery !== null) {
    persistDebugFlag(fromQuery);
    return fromQuery;
  }
  const fromStorage = readStoredFlag();
  return fromStorage === null ? false : fromStorage;
}

function isDashboardDebugEnabled() {
  if (cachedDebugEnabled === null) {
    cachedDebugEnabled = resolveDebugFlag();
  }
  return cachedDebugEnabled;
}

function setDashboardDebugEnabled(enabled) {
  cachedDebugEnabled = !!enabled;
  persistDebugFlag(cachedDebugEnabled);
}

function debugLog(...args) {
  if (!isDashboardDebugEnabled()) {
    return;
  }
  console.log(...args);
}

export { debugLog, isDashboardDebugEnabled, setDashboardDebugEnabled };
