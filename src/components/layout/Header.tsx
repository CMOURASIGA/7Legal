import React from "react";
import { Bell, Search, Menu } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useLocation } from "react-router-dom";

export function Header() {
  const { user } = useAuth();
  const location = useLocation();
  
  // Basic translation for header title
  const pathParts = location.pathname.split("/").filter(Boolean);
  const title = pathParts[0] ? pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1) : "Dashboard";
  
  return (
    <header className="h-16 bg-[var(--surface)] border-b border-[var(--border-color)] flex items-center px-8 justify-between flex-shrink-0 z-10">
      <div className="flex items-center gap-4">
        <button className="md:hidden mr-4 text-[var(--text-secondary)]">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
          {title === 'Admin' ? 'Configurações' : title} 
          <span className="text-[var(--text-muted)] font-normal ml-2 hidden sm:inline">Visão Geral</span>
        </h1>
        <div className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 uppercase tracking-wider hidden md:block">Ativo</div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block group">
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            className="bg-[var(--surface-secondary)] border-none rounded-full py-2 px-10 text-sm focus:ring-2 focus:ring-[var(--brand-primary)]/20 w-64 text-[var(--text-primary)] outline-none"
          />
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[var(--text-muted)]" />
        </div>
        
        <button className="relative text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[var(--danger)] border-2 border-[var(--surface)]"></span>
        </button>
        
        <div className="h-8 w-px bg-[var(--border-color)] hidden sm:block"></div>
        <div className="hidden sm:flex items-center justify-center h-8 w-8 rounded bg-[var(--brand-primary)] text-[var(--brand-secondary)] font-bold text-xs border border-[var(--border-color)]">
          {user?.name?.charAt(0) || "U"}
        </div>
      </div>
    </header>
  );
}
