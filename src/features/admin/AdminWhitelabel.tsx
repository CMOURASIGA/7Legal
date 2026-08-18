import React, { useRef } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useBranding } from "@/providers/BrandingProvider";
import { StorageService } from "@/lib/storage";
import { MOCK_TENANTS } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Upload, Wand2, RotateCcw } from "lucide-react";

export function AdminWhitelabel() {
  const { tenant } = useAuth();
  const { branding, setBrandingDraft } = useBranding();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!branding || !tenant) return null;

  const handleColorChange = (key: keyof typeof branding, value: string) => {
    setBrandingDraft({ ...branding, [key]: value });
  };

  const handleSave = () => {
    StorageService.saveBranding(tenant.id, branding);
    window.location.reload(); // To force refresh everywhere
  };

  const handleReset = () => {
    const defaultTenant = MOCK_TENANTS.find(t => t.id === tenant.id);
    if (defaultTenant && defaultTenant.branding) {
      setBrandingDraft(defaultTenant.branding);
      StorageService.saveBranding(tenant.id, defaultTenant.branding);
      window.location.reload();
    }
  };

  const extractColors = (dataUrl: string) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // In case it's a remote URL
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Scale down for performance
      canvas.width = 100;
      canvas.height = 100 * (img.height / img.width);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      
      const buckets: Record<string, number> = {};
      let maxCount = 0;
      let dominantColor = { r: 0, g: 0, b: 0 };
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        const a = data[i+3];
        
        // Ignore transparent and nearly white pixels
        if (a < 128 || (r > 240 && g > 240 && b > 240)) continue;
        
        // Quantize by 24 for better grouping
        const qR = Math.floor(r / 24) * 24;
        const qG = Math.floor(g / 24) * 24;
        const qB = Math.floor(b / 24) * 24;
        
        const key = `${qR},${qG},${qB}`;
        buckets[key] = (buckets[key] || 0) + 1;
        
        if (buckets[key] > maxCount) {
          maxCount = buckets[key];
          dominantColor = { r: Math.min(255, qR + 12), g: Math.min(255, qG + 12), b: Math.min(255, qB + 12) };
        }
      }
      
      if (maxCount > 0) {
        const toHex = (n: number) => n.toString(16).padStart(2, '0');
        const hex = `#${toHex(dominantColor.r)}${toHex(dominantColor.g)}${toHex(dominantColor.b)}`;
        
        // Simple logic for secondary and accent
        setBrandingDraft({
          ...branding,
          primaryColor: hex,
          logoUrl: dataUrl
        });
      } else {
        setBrandingDraft({ ...branding, logoUrl: dataUrl });
      }
    };
    img.src = dataUrl;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          // Immediately show logo and attempt to extract colors
          extractColors(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Identidade Visual</h2>
        <p className="text-[var(--text-secondary)]">
          Faça upload da sua logo e a inteligência ajustará as cores automaticamente.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo da Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[var(--border-color)] rounded-xl bg-[var(--surface-secondary)]">
                {branding.logoUrl ? (
                  <div className="flex flex-col items-center">
                    <img src={branding.logoUrl} alt="Logo" className="h-16 object-contain mb-4" />
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                      Trocar Logo
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[var(--brand-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-[var(--brand-primary)]" />
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">Envie a logo para extração automática de cores</p>
                    <Button onClick={() => fileInputRef.current?.click()}>Fazer Upload</Button>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/png, image/jpeg, image/svg+xml"
                  onChange={handleFileUpload}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Cores Principais</CardTitle>
              <Wand2 className="w-4 h-4 text-[var(--brand-primary)]" title="Cores extraídas automaticamente" />
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
              <CardTitle>Textos do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                label="Nome da Empresa" 
                value={branding.companyName || ""}
                onChange={(e) => handleColorChange("companyName", e.target.value)}
              />
              <Input 
                label="Título da Tela de Login" 
                value={branding.loginTitle || ""}
                onChange={(e) => handleColorChange("loginTitle", e.target.value)}
              />
              <Input 
                label="Subtítulo da Tela de Login" 
                value={branding.loginSubtitle || ""}
                onChange={(e) => handleColorChange("loginSubtitle", e.target.value)}
              />
            </CardContent>
          </Card>
          
          <div className="flex gap-4">
            <Button onClick={handleReset} variant="outline" size="lg" className="w-1/3 flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Restaurar Padrão
            </Button>
            <Button onClick={handleSave} size="lg" className="flex-1">
              Salvar Configurações
            </Button>
          </div>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Preview em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-[var(--border-color)] rounded-md overflow-hidden bg-[var(--background)] p-4 flex flex-col items-center justify-center min-h-[400px]">
                {/* Simulated Login Box */}
                <div className="w-full max-w-sm bg-[var(--surface)] p-6 rounded-lg shadow-sm border border-[var(--border-color)] text-center flex flex-col items-center">
                  {branding.logoUrl ? (
                    <img src={branding.logoUrl} alt="Logo" className="h-10 object-contain mb-4" />
                  ) : (
                    <div className="w-10 h-10 rounded bg-[var(--brand-primary)] text-[var(--brand-secondary)] flex items-center justify-center font-bold text-lg mb-4">
                      {branding.companyName?.charAt(0) || "7"}
                    </div>
                  )}
                  
                  <h1 className="text-xl font-bold text-slate-800 mb-1">
                    {branding.loginTitle || branding.companyName || "7Legal"}
                  </h1>
                  <p className="text-xs text-slate-500 mb-6">{branding.loginSubtitle || "Acesse sua conta"}</p>
                  
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
