import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

// Mantém a shell aprovada da branch demo e força o pipeline de preview a reconstruir esta revisão.
export function AppShell() {
  const { user, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">Carregando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)] font-sans text-[var(--text-primary)]">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden w-full">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
