import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { BrandingConfig } from "@/types";
import { StorageService } from "@/lib/storage";

interface BrandingContextData {
  branding: BrandingConfig | null;
  setBrandingDraft: (branding: BrandingConfig) => void;
  resetBranding: () => void;
}

const BrandingContext = createContext<BrandingContextData>({} as BrandingContextData);

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  const { tenant } = useAuth();
  const [branding, setBranding] = useState<BrandingConfig | null>(null);

  useEffect(() => {
    if (tenant) {
      const savedBranding = StorageService.getBranding(tenant.id) || tenant.branding;
      setBranding(savedBranding);
      applyBranding(savedBranding);
    } else {
      // Apply defaults if no tenant
      document.documentElement.style.removeProperty("--brand-primary");
      document.documentElement.style.removeProperty("--brand-secondary");
      document.documentElement.style.removeProperty("--brand-accent");
    }
  }, [tenant]);

  const applyBranding = (config: BrandingConfig) => {
    document.documentElement.style.setProperty("--brand-primary", config.primaryColor);
    document.documentElement.style.setProperty("--brand-secondary", config.secondaryColor);
    document.documentElement.style.setProperty("--brand-accent", config.accentColor);
    // You can apply logos and other things to custom state or properties
  };

  const setBrandingDraft = (newBranding: BrandingConfig) => {
    setBranding(newBranding);
    applyBranding(newBranding);
  };

  const resetBranding = () => {
    if (tenant) {
      setBrandingDraft(tenant.branding); // original from tenant
    }
  };

  return (
    <BrandingContext.Provider value={{ branding, setBrandingDraft, resetBranding }}>
      {children}
    </BrandingContext.Provider>
  );
}

export const useBranding = () => useContext(BrandingContext);
