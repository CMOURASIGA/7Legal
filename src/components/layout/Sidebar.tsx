import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Activity,
  Bell,
  Settings,
  Building,
  Palette,
  X,
} from "lucide-react";
import { useBranding } from "@/providers/BrandingProvider";

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const { user } = useAuth();
  const { branding } = useBranding();
  const location = useLocation();
  const defaultLogoUrl = "https://i.imgur.com/gxXnYsA.png";
  const logoUrl = branding?.logoUrl || defaultLogoUrl;

  if (!user) return null;

  const routes = [
    { label: "Visão Geral", route: "/dashboard", icon: LayoutDashboard, roles: ["CLIENT", "LAWYER", "ADMIN", "SUPERADMIN"], group: "Principal" },
    { label: "Meus Clientes", route: "/clients", icon: Users, roles: ["LAWYER"], group: "Principal" },
    { label: "Processos", route: "/processes", icon: Briefcase, roles: ["CLIENT", "LAWYER", "ADMIN"], group: "Principal" },
    { label: "Documentos", route: "/documents", icon: FileText, roles: ["CLIENT", "LAWYER", "ADMIN"], group: "Principal" },
    { label: "Movimentações", route: "/movements", icon: Activity, roles: ["CLIENT", "LAWYER", "ADMIN"], group: "Principal" },
    { label: "Notificações", route: "/notifications", icon: Bell, roles: ["CLIENT", "LAWYER", "ADMIN", "SUPERADMIN"], group: "Principal" },
    { label: "Empresas", route: "/admin/tenants", icon: Building, roles: ["SUPERADMIN"], group: "Configurações" },
    { label: "Usuários", route: "/admin/users", icon: Users, roles: ["ADMIN", "SUPERADMIN"], group: "Configurações" },
    { label: "Integrações", route: "/admin/integrations", icon: Settings, roles: ["ADMIN", "SUPERADMIN"], group: "Configurações" },
    { label: "Whitelabel", route: "/admin/whitelabel", icon: Palette, roles: ["SUPERADMIN", "ADMIN"], group: "Configurações" },
  ];

  const visibleRoutes = routes.filter((route) => route.roles.includes(user.role));
  const groups = Array.from(new Set(visibleRoutes.map((route) => route.group)));

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-slate-950/45 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[256px] flex-col overflow-hidden bg-[var(--brand-primary)] text-white transition-transform duration-300 md:relative md:min-h-screen md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="relative px-4 pb-6 pt-4 border-b border-white/15">
          <div className="flex h-[144px] w-full items-center justify-center overflow-hidden rounded-xl bg-white px-1 py-1 shadow-sm">
            <img
              src={logoUrl}
              alt={branding?.companyName || "Consult Services Tecnologia"}
              className="max-h-[132px] w-[99%] object-contain object-center"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 md:hidden"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mt-6">
            <div className="flex items-center gap-2">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--brand-accent)]">7LEGAL</p>
              <span className="rounded-md border border-amber-300/50 bg-amber-300/15 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-amber-200">Demo</span>
            </div>
            <p className="mt-1.5 text-sm font-semibold leading-5 text-white">Gestão jurídica e operações</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {groups.map((group) => (
            <div key={group} className="mb-5">
              <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.16em] text-white/60">{group}</p>
              <div className="space-y-1">
                {visibleRoutes
                  .filter((route) => route.group === group)
                  .map((route) => {
                    const active = location.pathname === route.route || location.pathname.startsWith(`${route.route}/`);
                    const Icon = route.icon;
                    return (
                      <Link
                        key={route.route}
                        to={route.route}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-[var(--brand-accent)] text-slate-950 shadow-sm"
                            : "text-slate-100 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{route.label}</span>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
