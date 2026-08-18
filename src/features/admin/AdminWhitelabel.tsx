import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useBranding } from "@/providers/BrandingProvider";
import { StorageService } from "@/lib/storage";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function AdminWhitelabel() {
  const { tenant } = useAuth();
  const { branding, setBrandingDraft } = useBranding();

  if (!branding || !tenant) return null;

  const handleColorChange = (key: keyof typeof branding, value: string) => {
    setBrandingDraft({ ...branding, [key]: value });
  };

  const handleSave = () => {
    StorageService.saveBranding(tenant.id, branding);
    alert("Identidade visual salva com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Identidade Visual</h2>
        <p className="text-[var(--text-secondary)]">
          Personalize as cores e a marca da plataforma para este ambiente.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cores Principais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <input 
                  type="color" 
                  value={branding.primaryColor} 
                  onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <Input 
                  label="Cor Primária" 
                  value={branding.primaryColor}
                  onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <input 
                  type="color" 
                  value={branding.secondaryColor} 
                  onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <Input 
                  label="Cor Secundária" 
                  value={branding.secondaryColor}
                  onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <input 
                  type="color" 
                  value={branding.accentColor} 
                  onChange={(e) => handleColorChange("accentColor", e.target.value)}
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <Input 
                  label="Cor de Destaque" 
                  value={branding.accentColor}
                  onChange={(e) => handleColorChange("accentColor", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Marca</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                label="Nome da Empresa" 
                value={branding.companyName}
                onChange={(e) => handleColorChange("companyName", e.target.value)}
              />
            </CardContent>
          </Card>
          
          <Button onClick={handleSave} size="lg" className="w-full">
            Salvar Configurações
          </Button>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-[var(--border-color)] rounded-md overflow-hidden bg-[var(--background)] p-4 flex flex-col items-center justify-center min-h-[400px]">
                {/* Simulated Login Box */}
                <div className="w-full max-w-sm bg-[var(--surface)] p-6 rounded-lg shadow-sm border border-[var(--border-color)] text-center">
                  <h1 className="text-xl font-bold text-[var(--brand-primary)] mb-6">{branding.companyName}</h1>
                  <Input placeholder="E-mail" className="mb-4" />
                  <Button variant="primary" className="w-full">Entrar</Button>
                </div>
                
                <div className="mt-8 flex space-x-4">
                   <span className="px-3 py-1 bg-[var(--brand-primary)] text-[var(--brand-secondary)] rounded text-sm">Badge Primary</span>
                   <span className="px-3 py-1 border border-[var(--brand-primary)] text-[var(--brand-primary)] rounded text-sm">Outline</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
