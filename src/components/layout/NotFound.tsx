import React from "react";
import { Navigate } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">404</h2>
      <p className="text-[var(--text-secondary)] mb-6">Página não encontrada ou em desenvolvimento.</p>
    </div>
  );
}
