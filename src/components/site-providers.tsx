"use client";
import { ThemeProvider, useTheme } from "next-themes";
import { MotionConfig } from "motion/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";
import type { ReactNode } from "react";
function Notifications() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      theme={resolvedTheme === "light" ? "light" : "dark"}
      position="bottom-right"
      closeButton
      richColors
      toastOptions={{ className: "site-toast" }}
    />
  );
}
export function SiteProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="tfl-theme"
      disableTransitionOnChange
    >
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <Tooltip.Provider delayDuration={350}>
          {children}
          <Notifications />
        </Tooltip.Provider>
      </MotionConfig>
    </ThemeProvider>
  );
}
