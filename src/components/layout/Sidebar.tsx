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
  LogOut,
  Palette,
  X
} from "lucide-react";
import { useBranding } from "@/providers/BrandingProvider";

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const { user, logout } = useAuth();
  const { branding } = useBranding();
  const location = useLocation();
  
  if (!user) return null;

  const routes = [
    { label: "Visão Geral", route: "/dashboard", icon: LayoutDashboard, roles: ["CLIENT", "LAWYER", "ADMIN", "SUPERADMIN"], group: "Principal" },
    { label: "Meus Clientes", route: "/clients", icon: Users, roles: ["LAWYER"], group: "Principal" },
    { label: "Processos", route: "/processes", icon: Briefcase, roles: ["CLIENT", "LAWYER", "ADMIN"], group: "Principal" },
    { label: "Documentos", route: "/documents", icon: FileText, roles: ["CLIENT", "LAWYER", "ADMIN"], group: "Principal" },
    { label: "Movimentações", route: "/movements", icon: Activity, roles: ["CLIENT", "LAWYER", "ADMIN"], group: "Principal" },
    { label: "Notificações", route: "/notifications", icon: Bell, roles: ["CLIENT", "LAWYER", "ADMIN", "SUPERADMIN"], group: "Principal" },
    
    // Admin routes
    { label: "Empresas", route: "/admin/tenants", icon: Building, roles: ["SUPERADMIN"], group: "Configurações" },
    { label: "Usuários", route: "/admin/users", icon: Users, roles: ["ADMIN", "SUPERADMIN"], group: "Configurações" },
    { label: "Integrações", route: "/admin/integrations", icon: Settings, roles: ["ADMIN", "SUPERADMIN"], group: "Configurações" },
    { label: "Whitelabel", route: "/admin/whitelabel", icon: Palette, roles: ["SUPERADMIN", "ADMIN"], group: "Configurações" },
  ];

  const visibleRoutes = routes.filter(r => r.roles.includes(user.role));
  
  const principalRoutes = visibleRoutes.filter(r => r.group === "Principal");
  const configRoutes = visibleRoutes.filter(r => r.group === "Configurações");

  const roleMap: Record<string, string> = {
    SUPERADMIN: "SUPER ADMIN",
    ADMIN: "ADMINISTRADOR",
    LAWYER: "ADVOGADO",
    CLIENT: "CLIENTE"
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        "w-64 bg-[var(--brand-primary)] text-[var(--brand-secondary)] flex flex-col flex-shrink-0 z-50 h-full transition-transform duration-300",
        "fixed md:relative top-0 left-0 bottom-0",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Close button on mobile */}
        {isOpen && (
          <button 
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 z-50 p-2 bg-black/20 text-white rounded-full hover:bg-black/40"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        
        <div className="flex flex-col shrink-0 relative">
          <div className="bg-white rounded-b-[2rem] shadow-lg relative z-10 w-full overflow-hidden flex items-center justify-center p-4">
            <img 
              src={branding?.logoUrl || "https://i.imgur.com/gxXnYsA.png"} 
              alt={branding?.companyName || "Consult Services Tecnologia"} 
              className="w-full h-auto object-contain max-h-[120px] scale-[1.02]"
            />
          </div>
        
        <div className="px-6 pt-6 pb-2 flex flex-col gap-1 border-b border-white/10">
          <span className="text-[10px] font-bold tracking-[0.15em] text-[var(--brand-secondary)] uppercase">
            7LEGAL
          </span>
          <span className="text-sm font-bold text-[var(--brand-secondary)] leading-tight mt-1">
            Gestão Jurídica e operações
          </span>
          <span className="text-[10px] text-[var(--brand-secondary)]/70 mt-1 mb-2">
            Uma plataforma Consult Services Tecnologia
          </span>
          <div className="mt-1 mb-2 inline-flex border border-[var(--brand-secondary)]/30 rounded-full px-3 py-1 items-center justify-center w-max">
            <span className="text-[9px] font-bold tracking-widest text-[var(--brand-secondary)] uppercase">
              PERFIL: {roleMap[user.role] || user.role}
            </span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        {principalRoutes.length > 0 && (
          <>
            <div className="px-6 mb-2 text-[10px] uppercase opacity-40 font-bold tracking-wider">Principal</div>
            {principalRoutes.map((route) => {
              const active = location.pathname.startsWith(route.route);
              const Icon = route.icon;
              return (
                <Link
                  key={route.route}
                  to={route.route}
                  className={cn(
                    "flex items-center px-6 py-2.5 text-sm font-medium transition-colors",
                    active 
                      ? "bg-white/10 border-r-4 border-[var(--brand-secondary)] text-[var(--brand-secondary)]" 
                      : "opacity-70 hover:opacity-100 hover:bg-white/5 text-[var(--brand-secondary)]"
                  )}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {route.label}
                </Link>
              );
            })}
          </>
        )}
        
        {configRoutes.length > 0 && (
          <>
            <div className="px-6 mt-6 mb-2 text-[10px] uppercase opacity-40 font-bold tracking-wider">Configurações</div>
            {configRoutes.map((route) => {
              const active = location.pathname.startsWith(route.route);
              const Icon = route.icon;
              return (
                <Link
                  key={route.route}
                  to={route.route}
                  className={cn(
                    "flex items-center px-6 py-2.5 text-sm font-medium transition-colors",
                    active 
                      ? "bg-white/10 border-r-4 border-[var(--brand-secondary)] text-[var(--brand-secondary)]" 
                      : "opacity-70 hover:opacity-100 hover:bg-white/5 text-[var(--brand-secondary)]"
                  )}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {route.label}
                </Link>
              );
            })}
          </>
        )}
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="bg-black/20 rounded-lg p-3 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--brand-accent)] flex-shrink-0 flex items-center justify-center font-bold text-white text-xs">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-semibold truncate">{user.name}</p>
              <p className="text-[10px] opacity-50 truncate">{user.role}</p>
            </div>
            <button onClick={logout} className="p-1 hover:bg-white/10 rounded text-white/70 hover:text-white" title="Sair">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}
