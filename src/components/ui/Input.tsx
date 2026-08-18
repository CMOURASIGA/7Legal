import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-[var(--text-primary)]">
            {label}
            {props.required && <span className="text-[var(--danger)] ml-1">*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] transition-colors",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-[var(--text-muted)]",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand-primary)] focus-visible:border-[var(--brand-primary)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-[var(--danger)] focus-visible:ring-[var(--danger)]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
        {helperText && !error && <p className="text-xs text-[var(--text-secondary)]">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
