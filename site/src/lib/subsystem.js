// Shared formatting for domain/target subsystem ids (e.g. "rites of war",
// "vanguard-scoring") so the same id renders identically wherever it
// appears — the set-detail page and the compatibility overview must agree
// on both the anchor slug and the display label.

export function subsystemSlug(id) {
  return id.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function subsystemLabel(id) {
  return id
    .replace(/-/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}
