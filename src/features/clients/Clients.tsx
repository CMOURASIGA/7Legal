import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { StorageService } from "@/lib/storage";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function Clients() {
  const { user, tenant } = useAuth();
  if (!user || !tenant) return null;

  const clients = StorageService.getClients(tenant.id, user.id, user.role);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Meus Clientes</h2>
        <p className="text-[var(--text-secondary)]">Gerencie seus clientes vinculados.</p>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--surface-secondary)] text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-color)]">
              <tr>
                <th className="px-5 py-3">Nome</th>
                <th className="px-5 py-3">Documento</th>
                <th className="px-5 py-3">Contato</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[var(--border-color)]">
              {clients.map(client => (
                <tr key={client.id} className="hover:bg-[var(--surface-secondary)] transition-colors">
                  <td className="px-5 py-4 font-bold text-[var(--text-primary)]">{client.name}</td>
                  <td className="px-5 py-4 text-[var(--text-secondary)] font-mono text-xs">{client.document}</td>
                  <td className="px-5 py-4 text-[var(--text-secondary)]">
                    <div>{client.email}</div>
                    <div className="text-xs">{client.phone}</div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={client.status === "ACTIVE" ? "success" : "neutral"}>{client.status}</Badge>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-[var(--text-muted)]">Nenhum cliente encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
