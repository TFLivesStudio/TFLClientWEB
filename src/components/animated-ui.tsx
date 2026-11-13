"use client";
import { useMotionPreference } from "./motion-preference";
// Individual adaptations of Animate UI's Radix primitives (MIT + Commons Clause), with TFL tokens.
import * as Tabs from "@radix-ui/react-tabs";
import * as Accordion from "@radix-ui/react-accordion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion, useScroll } from "motion/react";
import { ChevronDown, Copy } from "lucide-react";
import { useId, type ReactNode } from "react";
import { toast } from "sonner";
import { useT } from "@/i18n/provider";
export function AnimatedTabs({
  value,
  onValueChange,
  label,
  items,
  children,
  className = "filter-bar",
}: {
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  items: { value: string; label: ReactNode }[];
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <Tabs.Root value={value} onValueChange={onValueChange}>
      <Tabs.List aria-label={label} className={`${className} animated-tabs`}>
        {items.map((item) => (
          <Tabs.Trigger
            key={item.value}
            value={item.value}
            data-value={item.value}
            className="animated-tab"
          >
            {value === item.value && (
              <motion.span
                layoutId={`tab-${id}`}
                className="tab-indicator"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <span className="tab-label">{item.label}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content key={value} value={value} className="tab-panel">
        {children}
      </Tabs.Content>
    </Tabs.Root>
  );
}
export function AnimatedAccordion({
  items,
  headingLevel = 3,
}: {
  items: { title: string; content: ReactNode }[];
  headingLevel?: 2 | 3;
}) {
  return (
    <Accordion.Root
      type="multiple"
      defaultValue={headingLevel === 2 ? items.map((_, i) => String(i)) : []}
      className="animated-accordion"
    >
      {items.map((item, i) => (
        <Accordion.Item
          key={item.title}
          value={String(i)}
          className="accordion-item"
        >
          <Accordion.Header asChild>
            {headingLevel === 2 ? (
              <h2>
                <Accordion.Trigger>
                  {item.title}
                  <ChevronDown size={18} />
                </Accordion.Trigger>
              </h2>
            ) : (
              <h3>
                <Accordion.Trigger>
                  {item.title}
                  <ChevronDown size={18} />
                </Accordion.Trigger>
              </h3>
            )}
          </Accordion.Header>
          <Accordion.Content className="accordion-content">
            <div>{item.content}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
export function Hint({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const { reduced: reduce } = useMotionPreference();
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="tooltip-content" sideOffset={9} asChild>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {label}
            <Tooltip.Arrow className="tooltip-arrow" />
          </motion.div>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
// Adapted from Magic UI ScrollProgress (MIT). Progress is linear for accurate reading position.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
export function CopyLink() {
  const tr = useT();
  return (
    <Hint label={tr("Copiar enlace de esta página")}>
      <button
        className="button secondary copy-link"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(location.href);
            toast.success(tr("Enlace copiado"));
          } catch {
            toast.error(
              tr(
                "No se pudo copiar el enlace. Cópialo desde la barra de direcciones.",
              ),
            );
          }
        }}
      >
        <Copy size={16} />
        {tr("Copiar enlace")}
      </button>
    </Hint>
  );
}
export function AnimatedResults({
  children,
  resultKey,
}: {
  children: ReactNode;
  resultKey: string;
}) {
  // Replace results immediately so an exiting card can never receive a stale click.
  return (
    <motion.div
      key={resultKey}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16 }}
    >
      {children}
    </motion.div>
  );
}
