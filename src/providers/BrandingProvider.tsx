import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { BrandingConfig } from "@/types";
import { StorageService } from "@/lib/storage";

interface BrandingContextData {
  branding: BrandingConfig | null;
  setBrandingDraft: (branding: BrandingConfig) => void;
  saveBranding: () => { ok: boolean; message: string };
  resetBranding: () => void;
}

const BrandingContext = createContext<BrandingContextData>({} as BrandingContextData);

function readableTextColor(hex: string) {
  const normalized = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return "#ffffff";
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? "#0f172a" : "#ffffff";
}

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  const { tenant } = useAuth();
  const [branding, setBranding] = useState<BrandingConfig | null>(null);

  useEffect(() => {
    if (tenant) {
      const savedBranding = StorageService.getBranding(tenant.id) || tenant.branding;
      setBranding(savedBranding);
      applyBranding(savedBranding);
    } else {
      document.documentElement.style.removeProperty("--brand-primary");
      document.documentElement.style.removeProperty("--brand-secondary");
      document.documentElement.style.removeProperty("--brand-accent");
      document.documentElement.style.removeProperty("--brand-on-primary");
    }
  }, [tenant]);

  useEffect(() => {
    const refreshBranding = () => {
      if (!tenant) return;
      const savedBranding = StorageService.getBranding(tenant.id) || tenant.branding;
      setBranding(savedBranding);
      applyBranding(savedBranding);
    };

    window.addEventListener("7legal-brand-updated", refreshBranding);
    return () => window.removeEventListener("7legal-brand-updated", refreshBranding);
  }, [tenant]);

  const applyBranding = (config: BrandingConfig) => {
    document.documentElement.style.setProperty("--brand-primary", config.primaryColor);
    document.documentElement.style.setProperty("--brand-secondary", config.secondaryColor);
    document.documentElement.style.setProperty("--brand-accent", config.accentColor);
    document.documentElement.style.setProperty("--brand-on-primary", readableTextColor(config.primaryColor));
  };

  const setBrandingDraft = (newBranding: BrandingConfig) => {
    setBranding(newBranding);
    applyBranding(newBranding);
  };

  const saveBranding = () => {
    if (!tenant || !branding) return { ok: false, message: "Não foi possível identificar a empresa ativa." };
    const result = StorageService.saveBranding(tenant.id, branding);
    if (result.ok) window.dispatchEvent(new CustomEvent("7legal-brand-updated", { detail: branding }));
    return result;
  };

  const resetBranding = () => {
    if (tenant) setBrandingDraft(tenant.branding);
  };

  return (
    <BrandingContext.Provider value={{ branding, setBrandingDraft, saveBranding, resetBranding }}>
      {children}
    </BrandingContext.Provider>
  );
}

export const useBranding = () => useContext(BrandingContext);
