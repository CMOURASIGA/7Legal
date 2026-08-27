import React, { useEffect, useRef, useState } from "react";
import { Bell, Search, Menu, ChevronDown, CheckCircle2, LogOut } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useLocation, Link } from "react-router-dom";
import { StorageService } from "@/lib/storage";

const PAGE_TITLES: Record<string, string> = {
  dashboard: "Visão Geral", clients: "Meus Clientes", processes: "Processos", documents: "Documentos", movements: "Movimentações", notifications: "Notificações", admin: "Configurações",
};
const ROLE_LABELS: Record<string, string> = { SUPERADMIN: "Super Admin", ADMIN: "Administrador", LAWYER: "Advogado", CLIENT: "Cliente" };

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, tenant, switchTenant, logout } = useAuth();
  const location = useLocation();
  const [showTenants, setShowTenants] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  if (!user || !tenant) return null;

  const tenants = StorageService.getTenants();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const pageTitle = PAGE_TITLES[pathParts[0] || "dashboard"] || "7Legal";
  const initials = user.name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "US";

  useEffect(() => { const handleOutsideClick = (event: MouseEvent) => { if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setShowUserMenu(false); }; document.addEventListener("mousedown", handleOutsideClick); return () => document.removeEventListener("mousedown", handleOutsideClick); }, []);
  const handleSimulateNotification = () => { setShowToast(true); setTimeout(() => setShowToast(false), 5000); };

  return <>
    <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-4 border-b border-[var(--border-color)] bg-[var(--surface)]/95 px-4 py-2 backdrop-blur md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button onClick={onMenuClick} className="rounded-xl border border-[var(--border-color)] p-2 text-[var(--text-secondary)] md:hidden" aria-label="Abrir menu"><Menu className="h-5 w-5" /></button>
        <div className="min-w-0"><p className="truncate text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-accent)]">Gestão jurídica</p><h1 className="truncate text-base font-semibold text-[var(--text-primary)]">{pageTitle}</h1></div>
        {user.role === "SUPERADMIN" && <div className="relative ml-2 hidden lg:block"><button onClick={() => setShowTenants(!showTenants)} className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--surface-secondary)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]"><span className="max-w-[150px] truncate">{tenant.tradeName}</span><ChevronDown className="h-3 w-3 text-[var(--text-muted)]" /></button>{showTenants && <div className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-[var(--border-color)] bg-white shadow-xl"><div className="border-b border-[var(--border-color)] bg-[var(--surface-secondary)] px-3 py-2"><span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Mudar tenant ativo</span></div><div className="max-h-64 overflow-y-auto py-1">{tenants.map((currentTenant) => <button key={currentTenant.id} onClick={() => { switchTenant(currentTenant.id); setShowTenants(false); window.location.reload(); }} className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-[var(--surface-secondary)] ${currentTenant.id === tenant.id ? "bg-[var(--brand-primary)]/5 font-bold text-[var(--brand-primary)]" : "text-[var(--text-primary)]"}`}>{currentTenant.tradeName}{currentTenant.id === tenant.id && <CheckCircle2 className="h-4 w-4 text-[var(--brand-primary)]" />}</button>)}</div></div>}</div>}
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <button onClick={handleSimulateNotification} className="hidden rounded-full border border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/10 px-3 py-1.5 text-[11px] font-semibold text-[var(--brand-primary)] lg:inline-flex">Simular notificação</button>
        <div className="relative hidden xl:block"><input type="text" placeholder="Pesquisar..." className="w-56 rounded-full bg-[var(--surface-secondary)] py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20" /><Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-muted)]" /></div>
        <span className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[12px] font-semibold text-emerald-700 sm:inline-flex"><span className="h-2 w-2 rounded-full bg-emerald-500" />Sistema online</span>
        <Link to="/notifications" className="relative rounded-full p-2 text-[var(--text-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--brand-primary)]"><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-[var(--surface)] bg-[var(--danger)]" /></Link>
        <div ref={userMenuRef} className="relative"><button type="button" onClick={() => setShowUserMenu((current) => !current)} className="flex items-center gap-2 rounded-xl px-1.5 py-1 transition hover:bg-[var(--surface-secondary)] sm:px-2" aria-expanded={showUserMenu} aria-haspopup="menu"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand-accent)] text-xs font-bold text-slate-950">{initials}</span><span className="hidden min-w-0 text-left md:block"><span className="block max-w-40 truncate text-sm font-semibold text-[var(--text-primary)]">{user.name}</span><span className="block text-[10px] uppercase tracking-wide text-[var(--text-muted)]">{ROLE_LABELS[user.role] || user.role}</span></span><ChevronDown className="hidden h-4 w-4 text-[var(--text-muted)] md:block" /></button>{showUserMenu && <div role="menu" className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-white shadow-xl"><div className="border-b border-[var(--border-color)] px-4 py-4"><p className="truncate text-sm font-semibold text-[var(--text-primary)]">{user.name}</p><p className="mt-1 text-[11px] uppercase tracking-wide text-[var(--text-muted)]">{ROLE_LABELS[user.role] || user.role}</p></div><div className="p-2"><button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"><LogOut className="h-4 w-4" />Sair</button></div></div>}</div>
      </div>
    </header>
    {showToast && <div className="fixed right-6 top-20 z-50 animate-in fade-in slide-in-from-top-5 duration-300"><div className="flex w-80 gap-4 rounded-xl border border-[var(--border-color)] bg-white p-4 shadow-xl"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] shadow-inner"><Bell className="h-5 w-5 text-white" /></div><div><h4 className="text-sm font-bold leading-tight text-[var(--text-primary)]">Novo documento disponível</h4><p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">Foi disponibilizado um novo documento no processo 0001234-XX.2026...</p><Link to="/processes/p-1" onClick={() => setShowToast(false)} className="mt-2 inline-flex text-[11px] font-bold text-[var(--brand-primary)] hover:underline">Visualizar processo</Link></div></div></div>}
  </>;
}
