import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export function safeMarkdownUrl(value: string) {
  try {
    const u = new URL(value, "https://github.com");
    return ["https:", "http:"].includes(u.protocol) ? u.href : "";
  } catch {
    return "";
  }
}
export function Markdown({ body }: { body: string }) {
  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        urlTransform={safeMarkdownUrl}
        components={{
          img: ({ src, alt }) => (
            <a href={typeof src === "string" ? src : undefined}>
              Imagen: {alt || "ver recurso original"}
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
