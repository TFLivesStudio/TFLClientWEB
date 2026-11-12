"use client";
import { useT } from "@/i18n/provider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export function safeMarkdownUrl(value: string) {
  try {
    const u = new URL(value, "https://github.com");
    return ["https:", "http:"].includes(u.protocol) &&
      (u.hostname !== "github.com" ||
        u.pathname === "/TFLivesStudio/TFLClient" ||
        u.pathname.startsWith("/TFLivesStudio/TFLClient/"))
      ? u.href
      : "";
  } catch {
    return "";
  }
}
export function Markdown({ body }: { body: string }) {
  const tr = useT();
  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        urlTransform={safeMarkdownUrl}
        components={{
          img: ({ src, alt }) => (
            <a href={typeof src === "string" ? src : undefined}>
              {tr("Imagen:")} {alt || tr("ver recurso original")}
            </a>
          ),
          a: ({ href, children }) => (
            <a href={href} rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
