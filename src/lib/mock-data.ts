import { Tenant, User, Process, Document, Movement, Notification, Client } from "@/types";

export const MOCK_TENANTS: Tenant[] = [
  {
    id: "tenant-cs",
    legalName: "Consult Services Oficial",
    tradeName: "Consult Services",
    status: "ACTIVE",
    createdAt: "2026-01-01T00:00:00Z",
    branding: {
      tenantId: "tenant-cs",
      companyName: "Consult Services",
      primaryColor: "#002B49", // High density default blue
      secondaryColor: "#ffffff",
      accentColor: "#3b82f6",
    }
  },
  {
    id: "tenant-alfa",
    legalName: "Escritório Jurídico Alfa Ltda",
    tradeName: "Jurídico Alfa",
    status: "ACTIVE",
    createdAt: "2026-02-01T00:00:00Z",
    branding: {
      tenantId: "tenant-alfa",
      companyName: "Jurídico Alfa",
      primaryColor: "#4f46e5", // Indigo
      secondaryColor: "#ffffff",
      accentColor: "#6366f1",
    }
  },
  {
    id: "tenant-beta",
    legalName: "Beta Corporativo Jurídico",
    tradeName: "Beta Corporativo",
    status: "ACTIVE",
    createdAt: "2026-03-01T00:00:00Z",
    branding: {
      tenantId: "tenant-beta",
      companyName: "Beta Corporativo",
      primaryColor: "#059669", // Emerald
      secondaryColor: "#ffffff",
      accentColor: "#10b981",
    }
  }
];

export const MOCK_USERS: User[] = [
  { id: "u-super", tenantId: null, name: "Super Admin", email: "superadmin@demo.com", role: "SUPERADMIN" },
  { id: "u-admin-alfa", tenantId: "tenant-alfa", name: "Admin Alfa", email: "admin@demo.com", role: "ADMIN" },
  { id: "u-lawyer-alfa", tenantId: "tenant-alfa", name: "Dr. Carlos (Alfa)", email: "advogado@demo.com", role: "LAWYER" },
  { id: "u-client-alfa", tenantId: "tenant-alfa", name: "João Cliente (Alfa)", email: "cliente@demo.com", role: "CLIENT" },
  { id: "u-admin-beta", tenantId: "tenant-beta", name: "Admin Beta", email: "admin-beta@demo.com", role: "ADMIN" },
];

export const MOCK_CLIENTS: Client[] = [
  { id: "c-1", tenantId: "tenant-alfa", name: "João Cliente (Alfa)", document: "123.456.789-00", email: "cliente@demo.com", phone: "(11) 99999-9999", status: "ACTIVE", createdAt: "2026-04-01T00:00:00Z" },
  { id: "c-2", tenantId: "tenant-alfa", name: "Empresa X", document: "12.345.678/0001-90", email: "contato@empresax.com", phone: "(11) 88888-8888", status: "ACTIVE", createdAt: "2026-04-02T00:00:00Z" },
];

export const MOCK_PROCESSES: Process[] = [
  { id: "p-1", tenantId: "tenant-alfa", clientId: "c-1", lawyerId: "u-lawyer-alfa", number: "0001234-56.2026.8.26.0000", title: "Ação de Indenização", description: "Danos morais", status: "ACTIVE", createdAt: "2026-05-01T00:00:00Z", updatedAt: "2026-08-10T10:00:00Z" },
  { id: "p-2", tenantId: "tenant-alfa", clientId: "c-1", lawyerId: "u-lawyer-alfa", number: "0005678-12.2025.8.26.0001", title: "Revisão Contratual", status: "PENDING", createdAt: "2025-10-01T00:00:00Z", updatedAt: "2026-07-20T10:00:00Z" },
  { id: "p-3", tenantId: "tenant-alfa", clientId: "c-2", lawyerId: "u-lawyer-alfa", number: "1009988-77.2026.8.26.0002", title: "Cobrança de Títulos", status: "ACTIVE", createdAt: "2026-06-15T00:00:00Z", updatedAt: "2026-08-15T14:00:00Z" }
];

export const MOCK_DOCUMENTS: Document[] = [
  { id: "d-1", tenantId: "tenant-alfa", processId: "p-1", title: "Petição Inicial.pdf", category: "Petição", status: "READ", createdAt: "2026-05-01T10:00:00Z" },
  { id: "d-2", tenantId: "tenant-alfa", processId: "p-1", title: "Contestação.pdf", category: "Defesa", status: "NEW", createdAt: "2026-08-01T14:30:00Z" },
  { id: "d-3", tenantId: "tenant-alfa", processId: "p-3", title: "Contrato Assinado.pdf", category: "Prova", status: "READ", createdAt: "2026-06-16T09:15:00Z" }
];

export const MOCK_MOVEMENTS: Movement[] = [
  { id: "m-1", tenantId: "tenant-alfa", processId: "p-1", type: "Juntada", title: "Juntada de Petição de Contestação", description: "Protocolo 12345/2026", date: "2026-08-01T14:00:00Z", responsible: "Tribunal" },
  { id: "m-2", tenantId: "tenant-alfa", processId: "p-1", type: "Despacho", title: "Mero Expediente", description: "Aguardando prazo para réplica", date: "2026-08-10T10:00:00Z", responsible: "Juiz de Direito" }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n-1", tenantId: "tenant-alfa", userId: "u-client-alfa", type: "NEW_DOCUMENT", title: "Novo documento disponível", message: "Existe um novo documento relacionado ao processo 0001234-56.2026.8.26.0000.", read: false, referenceId: "p-1", createdAt: "2026-08-01T15:00:00Z" },
  { id: "n-2", tenantId: "tenant-alfa", userId: "u-lawyer-alfa", type: "PROCESS_UPDATE", title: "Nova movimentação", message: "O processo 0001234-56.2026.8.26.0000 teve uma nova movimentação.", read: true, referenceId: "p-1", createdAt: "2026-08-10T10:05:00Z" },
];
