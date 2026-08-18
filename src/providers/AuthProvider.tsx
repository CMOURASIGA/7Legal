import React, { createContext, useContext, useEffect, useState } from "react";
import { StorageService } from "@/lib/storage";
import { User, Tenant } from "@/types";

interface AuthContextData {
  user: User | null;
  tenant: Tenant | null;
  login: (email: string) => void;
  logout: () => void;
  switchTenant: (tenantId: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    StorageService.init();
    const sessionId = StorageService.getSession();
    if (sessionId) {
      const loggedUser = StorageService.getUser(sessionId);
      if (loggedUser) {
        setUser(loggedUser);
        const storedTenantId = localStorage.getItem("current_tenant_id");
        if (storedTenantId && (loggedUser.role === "SUPERADMIN" || loggedUser.tenantId === storedTenantId)) {
          setTenant(StorageService.getTenant(storedTenantId) || StorageService.getTenants()[0]);
        } else if (loggedUser.tenantId) {
          setTenant(StorageService.getTenant(loggedUser.tenantId));
          localStorage.setItem("current_tenant_id", loggedUser.tenantId);
        } else {
          // Superadmin defaults to first tenant for demo purposes
          const firstTenant = StorageService.getTenants()[0];
          setTenant(firstTenant);
          localStorage.setItem("current_tenant_id", firstTenant.id);
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string) => {
    const loggedUser = StorageService.getUserByEmail(email);
    if (loggedUser) {
      StorageService.setSession(loggedUser.id);
      setUser(loggedUser);
      if (loggedUser.tenantId) {
        const t = StorageService.getTenant(loggedUser.tenantId);
        setTenant(t);
        if (t) localStorage.setItem("current_tenant_id", t.id);
      } else {
        const firstTenant = StorageService.getTenants()[0];
        setTenant(firstTenant);
        localStorage.setItem("current_tenant_id", firstTenant.id);
      }
    } else {
      throw new Error("Usuário não encontrado.");
    }
  };

  const logout = () => {
    StorageService.clearSession();
    localStorage.removeItem("current_tenant_id");
    setUser(null);
    setTenant(null);
  };
  
  const switchTenant = (tenantId: string) => {
    if (user?.role === "SUPERADMIN") {
      const t = StorageService.getTenant(tenantId);
      if (t) {
        setTenant(t);
        localStorage.setItem("current_tenant_id", t.id);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, tenant, login, logout, switchTenant, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
