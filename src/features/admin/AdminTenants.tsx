import React from "react";
import { Card } from "@/components/ui/Card";
import { StorageService } from "@/lib/storage";

export function AdminTenants() {
  const tenants = StorageService.getTenants();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Empresas (Tenants)</h2>
        <p className="text-[var(--text-secondary)]">Gerenciamento multi-tenant da plataforma.</p>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-[var(--surface-secondary)] text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b border-[var(--border-color)]">Nome</th>
                <th className="p-4 border-b border-[var(--border-color)]">Status</th>
                <th className="p-4 border-b border-[var(--border-color)]">Criado em</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {tenants.map(t => (
                <tr key={t.id} className="text-sm hover:bg-[var(--surface-secondary)]">
                  <td className="p-4 font-bold text-[var(--text-primary)]">{t.tradeName}</td>
                  <td className="p-4 text-[var(--success)] font-medium">{t.status}</td>
                  <td className="p-4 text-[var(--text-secondary)]">{new Date(t.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
