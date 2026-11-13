import type { Release } from "./release-model";
export type ReleaseSummary = Pick<
  Release,
  "name" | "tag" | "date" | "channel" | "inconsistent"
> & { excerpt: string };
export function summarizeRelease(release: Release): ReleaseSummary {
  const { name, tag, date, channel, inconsistent } = release;
  return {
    name,
    tag,
    date,
    channel,
    inconsistent,
    excerpt:
      release.body.slice(0, 260) + (release.body.length > 260 ? "…" : ""),
  };
}
export function historyState(
  params: Pick<URLSearchParams, "get">,
  releases: ReleaseSummary[],
) {
  const requested = params.get("channel");
  const filter =
    requested === "stable" || requested === "beta" ? requested : "all";
  const filtered = releases.filter(
    (release) => filter === "all" || release.channel === filter,
  );
  const count = Math.max(1, Math.ceil(filtered.length / 12));
  const value = params.get("page") || "1";
  const page = /^[1-9]\d{0,5}$/.test(value)
    ? Math.min(count, Number(value))
    : 1;
  return { filter, filtered, count, page };
}
export function historyQuery(
  params: URLSearchParams,
  filter: string,
  page: number,
) {
  const next = new URLSearchParams(params);
  if (filter === "all") next.delete("channel");
  else next.set("channel", filter);
  if (page <= 1) next.delete("page");
  else next.set("page", String(page));
  return next.toString();
}
