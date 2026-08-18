import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "neutral";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "bg-[var(--brand-primary)] text-[var(--brand-secondary)]": variant === "default",
          "bg-[var(--success)]/10 text-[var(--success)]": variant === "success",
          "bg-[var(--warning)]/10 text-[var(--warning)]": variant === "warning",
          "bg-[var(--danger)]/10 text-[var(--danger)]": variant === "danger",
          "bg-[var(--info)]/10 text-[var(--info)]": variant === "info",
          "bg-[var(--surface-secondary)] text-[var(--text-secondary)]": variant === "neutral",
        },
        className
      )}
      {...props}
    />
  );
}
