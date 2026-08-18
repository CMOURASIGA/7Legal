import React, { createContext, useContext, useEffect, useState } from "react";
import { StorageService } from "@/lib/storage";
import { User, Tenant } from "@/types";

interface AuthContextData {
  user: User | null;
  tenant: Tenant | null;
  login: (email: string) => void;
  logout: () => void;
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
        if (loggedUser.tenantId) {
          setTenant(StorageService.getTenant(loggedUser.tenantId));
        } else {
          // Superadmin defaults to first tenant for demo purposes
          setTenant(StorageService.getTenants()[0]);
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
        setTenant(StorageService.getTenant(loggedUser.tenantId));
      } else {
        setTenant(StorageService.getTenants()[0]);
      }
    } else {
      throw new Error("Usuário não encontrado.");
    }
  };

  const logout = () => {
    StorageService.clearSession();
    setUser(null);
    setTenant(null);
  };

  return (
    <AuthContext.Provider value={{ user, tenant, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
