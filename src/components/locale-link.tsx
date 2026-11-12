"use client";
import NextLink from "next/link";
import { useLocale } from "@/i18n/provider";
import { localizedPath } from "@/i18n/shared";
export default function LocaleLink(
  props: React.ComponentProps<typeof NextLink>,
) {
  const locale = useLocale();
  const href =
    typeof props.href === "string" &&
    props.href.startsWith("/") &&
    !props.href.startsWith("//")
      ? localizedPath(props.href, locale)
      : props.href;
  return <NextLink {...props} href={href} />;
}
