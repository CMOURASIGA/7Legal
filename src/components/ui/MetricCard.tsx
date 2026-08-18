import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ElementType;
  helper?: string;
}

export function MetricCard({ title, value, icon: Icon, helper }: MetricCardProps) {
  return (
    <div className="bg-[var(--surface)] p-4 rounded-xl shadow-sm border border-[var(--border-color)] flex items-center justify-between">
      <div>
        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">{title}</p>
        <p className="text-2xl font-black text-[var(--text-primary)]">{value}</p>
      </div>
      <div className="w-10 h-10 bg-[var(--surface-secondary)] rounded-lg flex items-center justify-center text-[var(--brand-primary)] font-bold">
        {helper ? helper : Icon ? <Icon className="w-5 h-5" /> : null}
      </div>
    </div>
  );
}
