import { Tenant, User, Process, Document, Movement, Notification, Client } from "@/types";
import { MOCK_TENANTS, MOCK_USERS, MOCK_PROCESSES, MOCK_DOCUMENTS, MOCK_MOVEMENTS, MOCK_NOTIFICATIONS, MOCK_CLIENTS } from "./mock-data";

const STORAGE_KEYS = {
  SESSION: "7legal:session", // user id
  TENANTS: "7legal:tenants",
  BRANDING: (tenantId: string) => `7legal:branding:${tenantId}`,
  USERS: "7legal:users",
  CLIENTS: "7legal:clients",
  PROCESSES: "7legal:processes",
  DOCUMENTS: "7legal:documents",
  MOVEMENTS: "7legal:movements",
  NOTIFICATIONS: "7legal:notifications",
  INITIALIZED: "7legal:initialized"
};

export const StorageService = {
  init() {
    if (localStorage.getItem(STORAGE_KEYS.INITIALIZED)) return;
    
    localStorage.setItem(STORAGE_KEYS.TENANTS, JSON.stringify(MOCK_TENANTS));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MOCK_USERS));
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(MOCK_CLIENTS));
    localStorage.setItem(STORAGE_KEYS.PROCESSES, JSON.stringify(MOCK_PROCESSES));
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(MOCK_DOCUMENTS));
    localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(MOCK_MOVEMENTS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(MOCK_NOTIFICATIONS));
    
    // Set branding per tenant
    MOCK_TENANTS.forEach(t => {
      localStorage.setItem(STORAGE_KEYS.BRANDING(t.id), JSON.stringify(t.branding));
    });
    
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
  },

  // Auth
  setSession(userId: string) { localStorage.setItem(STORAGE_KEYS.SESSION, userId); },
  getSession(): string | null { return localStorage.getItem(STORAGE_KEYS.SESSION); },
  clearSession() { localStorage.removeItem(STORAGE_KEYS.SESSION); },
  
  getUser(userId: string): User | null {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]") as User[];
    return users.find(u => u.id === userId) || null;
  },
  
  getUserByEmail(email: string): User | null {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]") as User[];
    return users.find(u => u.email === email) || null;
  },

  // Tenant / Branding
  getTenants(): Tenant[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TENANTS) || "[]") as Tenant[];
  },
  
  getTenant(tenantId: string): Tenant | null {
    return this.getTenants().find(t => t.id === tenantId) || null;
  },
  
  getBranding(tenantId: string) {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BRANDING(tenantId));
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  
  saveBranding(tenantId: string, branding: Tenant["branding"]) {
    try {
      localStorage.setItem(STORAGE_KEYS.BRANDING(tenantId), JSON.stringify(branding));
      const tenants = this.getTenants();
      const updated = tenants.map(t => t.id === tenantId ? { ...t, branding } : t);
      localStorage.setItem(STORAGE_KEYS.TENANTS, JSON.stringify(updated));
      return { ok: true, message: "Identidade visual salva neste ambiente." };
    } catch {
      return {
        ok: false,
        message: "Não foi possível salvar a identidade. Use uma imagem menor e tente novamente."
      };
    }
  },

  // Data
  getProcesses(tenantId: string, userId: string, role: string): Process[] {
    let processes = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROCESSES) || "[]") as Process[];
    processes = processes.filter(p => p.tenantId === tenantId);
    
    if (role === "CLIENT") {
      const client = this.getClientByUserId(userId);
      if (client) processes = processes.filter(p => p.clientId === client.id);
      else return [];
    } else if (role === "LAWYER") {
      processes = processes.filter(p => p.lawyerId === userId);
    }
    return processes;
  },
  
  getProcess(id: string): Process | null {
    const processes = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROCESSES) || "[]") as Process[];
    return processes.find(p => p.id === id) || null;
  },

  getClients(tenantId: string, userId: string, role: string): Client[] {
    let clients = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || "[]") as Client[];
    clients = clients.filter(c => c.tenantId === tenantId);
    
    if (role === "LAWYER") {
      const processes = this.getProcesses(tenantId, userId, role);
      const clientIds = processes.map(p => p.clientId);
      clients = clients.filter(c => clientIds.includes(c.id));
    } else if (role === "CLIENT") {
      const client = this.getClientByUserId(userId);
      if (client) clients = [client];
      else clients = [];
    }
    return clients;
  },

  getAllDocuments(tenantId: string, userId: string, role: string): Document[] {
    const processes = this.getProcesses(tenantId, userId, role);
    const processIds = processes.map(p => p.id);
    const docs = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCUMENTS) || "[]") as Document[];
    return docs.filter(d => processIds.includes(d.processId));
  },

  getAllMovements(tenantId: string, userId: string, role: string): Movement[] {
    const processes = this.getProcesses(tenantId, userId, role);
    const processIds = processes.map(p => p.id);
    const movs = JSON.parse(localStorage.getItem(STORAGE_KEYS.MOVEMENTS) || "[]") as Movement[];
    return movs.filter(m => processIds.includes(m.processId));
  },

  getClient(id: string): Client | null {
    const clients = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || "[]") as Client[];
    return clients.find(c => c.id === id) || null;
  },
  
  getClientByUserId(userId: string): Client | null {
    // simplified: matching mock user email to client email
    const user = this.getUser(userId);
    if (!user) return null;
    const clients = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || "[]") as Client[];
    return clients.find(c => c.email === user.email) || null;
  },

  getDocuments(processId: string): Document[] {
    const docs = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCUMENTS) || "[]") as Document[];
    return docs.filter(d => d.processId === processId);
  },

  getMovements(processId: string): Movement[] {
    const movs = JSON.parse(localStorage.getItem(STORAGE_KEYS.MOVEMENTS) || "[]") as Movement[];
    return movs.filter(m => m.processId === processId);
  },

  getNotifications(tenantId: string, userId: string): Notification[] {
    const notifs = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || "[]") as Notification[];
    return notifs.filter(n => n.tenantId === tenantId && n.userId === userId);
  }
};
