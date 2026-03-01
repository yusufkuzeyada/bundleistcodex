export function getProjectRefFromSupabaseUrl(supabaseUrl) {
  if (!supabaseUrl) {
    throw new Error("supabaseUrl is required.");
  }
  return new URL(supabaseUrl).hostname.split(".")[0];
}

export function createSupabaseProjectQueryRunner({
  projectRef,
  accessToken,
  defaultExcerptMax = 400,
} = {}) {
  if (!projectRef) {
    throw new Error("projectRef is required.");
  }
  if (!accessToken) {
    throw new Error("accessToken is required.");
  }

  return async function runQuery(
    query,
    { readOnly = false, excerptMax = defaultExcerptMax } = {},
  ) {
    const endpoint = `https://api.supabase.com/v1/projects/${projectRef}/database/query${readOnly ? "/read-only" : ""}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const text = await response.text();
    if (!response.ok) {
      const excerpt =
        text.length > excerptMax ? `${text.slice(0, excerptMax)}...` : text;
      throw new Error(
        `Supabase query failed (${response.status} ${response.statusText}): ${excerpt}`,
      );
    }

    return text ? JSON.parse(text) : [];
  };
}
