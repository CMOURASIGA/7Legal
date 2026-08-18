import React, { useState } from "react";
import { Bell, Search, Menu, ChevronDown, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useLocation, Link } from "react-router-dom";
import { StorageService } from "@/lib/storage";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, tenant, switchTenant } = useAuth();
  const location = useLocation();
  const [showTenants, setShowTenants] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  if (!user || !tenant) return null;

  const tenants = StorageService.getTenants();
  
  const pathParts = location.pathname.split("/").filter(Boolean);
  const title = pathParts[0] ? pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1) : "Dashboard";
  
  const handleSimulateNotification = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };
  
  return (
    <>
      <header className="h-16 bg-[var(--surface)] border-b border-[var(--border-color)] flex items-center px-4 md:px-8 justify-between flex-shrink-0 z-10 relative">
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={onMenuClick} className="md:hidden text-[var(--text-secondary)] p-1 hover:bg-[var(--surface-secondary)] rounded">
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight hidden sm:block">
              {title === 'Admin' ? 'Configurações' : title} 
            </h1>
            
            {user.role === "SUPERADMIN" && (
              <div className="relative ml-4">
                <button 
                  onClick={() => setShowTenants(!showTenants)}
                  className="flex items-center gap-2 bg-[var(--surface-secondary)] hover:bg-[var(--border-color)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-xs font-bold"
                >
                  <span className="text-[var(--text-primary)] truncate max-w-[150px]">
                    {tenant.tradeName}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
                </button>
                
                {showTenants && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden z-50">
                    <div className="px-3 py-2 bg-[var(--surface-secondary)] border-b border-[var(--border-color)]">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Mudar Tenant Ativo</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto py-1">
                      {tenants.map(t => (
                        <button
                          key={t.id}
                          onClick={() => { switchTenant(t.id); setShowTenants(false); window.location.reload(); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--surface-secondary)] transition-colors flex items-center justify-between ${t.id === tenant.id ? 'font-bold text-[var(--brand-primary)] bg-[var(--brand-primary)]/5' : 'text-[var(--text-primary)]'}`}
                        >
                          {t.tradeName}
                          {t.id === tenant.id && <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={handleSimulateNotification}
            className="text-xs font-bold bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] px-3 py-1.5 rounded-lg hover:bg-[var(--brand-primary)]/20 transition-colors hidden md:block border border-[var(--brand-primary)]/20 shadow-sm"
          >
            Simular Notificação
          </button>
        
          <div className="relative hidden md:block group">
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="bg-[var(--surface-secondary)] border-none rounded-full py-2 px-10 text-sm focus:ring-2 focus:ring-[var(--brand-primary)]/20 w-64 text-[var(--text-primary)] outline-none"
            />
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[var(--text-muted)]" />
          </div>
          
          <Link to="/notifications" className="relative text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[var(--danger)] border-2 border-[var(--surface)]"></span>
          </Link>
          
          <div className="h-8 w-px bg-[var(--border-color)] hidden sm:block"></div>
          <div className="hidden sm:flex items-center justify-center h-8 w-8 rounded bg-[var(--brand-primary)] text-[var(--brand-secondary)] font-bold text-xs border border-[var(--border-color)]">
            {user?.name?.charAt(0) || "U"}
          </div>
        </div>
      </header>
      
      {showToast && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
          <div className="bg-white border border-[var(--border-color)] shadow-xl rounded-xl p-4 w-80 flex gap-4">
            <div className="bg-[var(--brand-primary)] rounded-full w-10 h-10 flex items-center justify-center shrink-0 shadow-inner">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[var(--text-primary)] leading-tight">Novo documento disponível</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">Foi disponibilizado um novo documento no processo 0001234-XX.2026...</p>
              <Link to="/processes/p-1" onClick={() => setShowToast(false)} className="mt-2 text-[11px] font-bold text-[var(--brand-primary)] hover:underline inline-flex">
                Visualizar Processo
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
