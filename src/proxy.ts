import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const english = url.pathname === "/en" || url.pathname.startsWith("/en/");
  const headers = new Headers(request.headers);
  headers.set("x-tfl-locale", english ? "en" : "es");
  headers.set(
    "x-tfl-path",
    english ? url.pathname.replace(/^\/en/, "") || "/" : url.pathname,
  );
  if (english) {
    url.pathname = url.pathname.replace(/^\/en/, "") || "/";
    return NextResponse.rewrite(url, { request: { headers } });
  }
  return NextResponse.next({ request: { headers } });
}
export const config = {
  matcher: [
    "/((?!api|_next|images|icons|licenses|robots\\.txt|sitemap\\.xml|icon\\.png).*)",
  ],
};
