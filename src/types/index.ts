export type Role = "SUPERADMIN" | "ADMIN" | "LAWYER" | "CLIENT";

export interface BrandingConfig {
  tenantId: string;
  companyName: string;
  tradeName?: string;
  logoUrl?: string;
  logoCompactUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  loginBackgroundUrl?: string;
  loginTitle?: string;
  loginSubtitle?: string;
  websiteUrl?: string;
  supportEmail?: string;
  supportPhone?: string;
}

export interface Tenant {
  id: string;
  legalName: string;
  tradeName: string;
  document?: string;
  status: "ACTIVE" | "SUSPENDED" | "INACTIVE";
  branding: BrandingConfig;
  connectorId?: string;
  createdAt: string;
}

export interface User {
  id: string;
  tenantId: string | null; // null for superadmins that can see all
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface Client {
  id: string;
  tenantId: string;
  name: string;
  document: string; // CPF/CNPJ
  email: string;
  phone: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

export interface Process {
  id: string;
  tenantId: string;
  clientId: string;
  lawyerId: string; // Simplified for V0: 1 lawyer per process
  number: string;
  title: string;
  description?: string;
  status: "ACTIVE" | "PENDING" | "CLOSED" | "SUSPENDED";
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  tenantId: string;
  processId: string;
  title: string;
  category: string;
  status: "NEW" | "READ" | "APPROVED";
  createdAt: string;
  url?: string;
}

export interface Movement {
  id: string;
  tenantId: string;
  processId: string;
  type: string;
  title: string;
  description: string;
  date: string;
  responsible: string;
}

export interface Notification {
  id: string;
  tenantId: string;
  userId: string;
  type: "NEW_DOCUMENT" | "PROCESS_UPDATE" | "PROCESS_ASSIGNED" | "DOCUMENT_UPDATED" | "ANNOUNCEMENT";
  title: string;
  message: string;
  read: boolean;
  referenceId?: string; // e.g. processId
  createdAt: string;
}
