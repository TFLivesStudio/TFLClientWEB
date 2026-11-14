import type { Release } from "./release-model";

/** A plain editorial preview; full Markdown is only rendered in the article. */
export function releaseExcerpt(body: string, limit = 260) {
  const inlineCode: string[] = [];
  const plain = body
    .replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, "")
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block
      .replace(/(`+)([^`]*?)\1/g, (_, _delimiter, content: string) => {
        inlineCode.push(content);
        return `\u0000${inlineCode.length - 1}\u0000`;
      })
      .split(/\r?\n/)
      .filter((line) => !/^\s*(#{1,6}\s|\*\*(?:Canal|Channel):?\*\*|<!--)/i.test(line))
      .join(" ")
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/<[^>]*>/g, "")
      .replace(/(?:^|\s)(?:[-+*]|\d+\.)\s+/g, " ")
      .replace(/\*\*([^*]+)\*\*|__([^_]+)__|~~([^~]+)~~/g, (_, bold, underline, strike) => bold ?? underline ?? strike)
      .replace(/(^|\s)\*([^*]+)\*(?=\W|$)/g, "$1$2")
      .replace(/(^|\s)_([^_]+)_(?=\W|$)/g, "$1$2")
      .replace(/\u0000(\d+)\u0000/g, (_, i) => inlineCode[Number(i)])
      .replace(/\s+/g, " ").trim())
    .find(Boolean) || "";
  if (plain.length <= limit) return plain;
  const head = plain.slice(0, limit);
  const boundary = head.lastIndexOf(" ");
  const complete = /\s/.test(plain[limit]) || /\s$/.test(head);
  return (complete ? head.trimEnd() : boundary > 0 ? head.slice(0, boundary) : head) + "…";
}
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
    excerpt: releaseExcerpt(release.body),
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
