import React, { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { StorageService } from "@/lib/storage";
import { Tenant } from "@/types";

export function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [activeTenant, setActiveTenant] = useState<Tenant | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Try to determine the tenant context, maybe from URL or previous session.
    // For prototype, we'll just pick the first one or a specific one based on a fake subdomain check.
    const tenants = StorageService.getTenants();
    const storedTenantId = localStorage.getItem("current_tenant_id");
    if (storedTenantId) {
      setActiveTenant(tenants.find(t => t.id === storedTenantId) || tenants[0]);
    } else {
      setActiveTenant(tenants[0]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      login(email);
      navigate("/dashboard");
    } catch (err) {
      setError("Usuário não encontrado. Use os e-mails de demonstração.");
    }
  };

  const branding = activeTenant?.branding;
  const primaryColor = branding?.primaryColor || "#002B49";

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: branding?.loginBackgroundUrl ? 'transparent' : '#F4F7F9', backgroundImage: branding?.loginBackgroundUrl ? `url(${branding.loginBackgroundUrl})` : 'none', backgroundSize: 'cover' }}>
      <Card className="w-full max-w-md shadow-2xl overflow-hidden border-0">
        <div className="h-2 w-full" style={{ backgroundColor: primaryColor }}></div>
        <CardContent className="pt-8 pb-8 px-8 bg-white">
          <div className="text-center mb-8 flex flex-col items-center">
            {branding?.logoUrl ? (
              <img src={branding.logoUrl} alt={branding.companyName} className="h-16 object-contain mb-4" />
            ) : (
              <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-3xl mb-4 text-white" style={{ backgroundColor: primaryColor }}>
                {branding?.companyName?.charAt(0) || "7"}
              </div>
            )}
            
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              {branding?.loginTitle || "7Legal"}
            </h1>
            <p className="text-slate-500 text-sm">
              {branding?.loginSubtitle || "Acesse sua conta"}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="E-mail" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: cliente@demo.com"
              required
            />
            <Input 
              label="Senha" 
              type="password" 
              placeholder="demo123"
              value="demo123"
              readOnly
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            <Button type="submit" className="w-full mt-4" size="lg" style={{ backgroundColor: primaryColor, color: branding?.secondaryColor || "#fff", borderColor: primaryColor }}>
              Entrar
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400">
            <p className="font-medium mb-2 text-slate-500">Usuários de Demonstração:</p>
            <ul className="space-y-1">
              <li>• <button onClick={() => setEmail("superadmin@demo.com")} className="hover:text-blue-500">superadmin@demo.com</button> (Consult Services)</li>
              <li>• <button onClick={() => setEmail("admin@demo.com")} className="hover:text-blue-500">admin@demo.com</button> (Escritório Alfa)</li>
              <li>• <button onClick={() => setEmail("advogado@demo.com")} className="hover:text-blue-500">advogado@demo.com</button> (Escritório Alfa)</li>
              <li>• <button onClick={() => setEmail("cliente@demo.com")} className="hover:text-blue-500">cliente@demo.com</button> (Escritório Alfa)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
