import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function AdminAudit() {
  const MOCK_AUDIT_LOGS = [
    { id: 1, date: "2026-08-18T14:31:00Z", user: "João Cliente (Alfa)", action: "Visualizou documento", resource: "Contrato_2026.pdf", type: "VIEW_DOCUMENT" },
    { id: 2, date: "2026-08-18T14:28:00Z", user: "Dr. Carlos (Alfa)", action: "Visualizou processo", resource: "0001234-56.2026.8.26.0000", type: "VIEW_PROCESS" },
    { id: 3, date: "2026-08-18T14:02:00Z", user: "Admin Alfa", action: "Alterou identidade visual", resource: "Cores da Empresa", type: "CHANGE_BRANDING" },
    { id: 4, date: "2026-08-17T11:45:00Z", user: "Dr. Carlos (Alfa)", action: "Baixou documento", resource: "Petição Inicial.pdf", type: "DOWNLOAD_DOCUMENT" },
    { id: 5, date: "2026-08-17T09:12:00Z", user: "João Cliente (Alfa)", action: "Realizou login", resource: "Sistema", type: "LOGIN" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Auditoria de Acessos</h2>
        <p className="text-[var(--text-secondary)]">Registro imutável de todas as ações realizadas no sistema.</p>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-[var(--surface-secondary)] text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-color)]">
              <tr>
                <th className="p-4">Data/Hora</th>
                <th className="p-4">Usuário</th>
                <th className="p-4">Ação Realizada</th>
                <th className="p-4">Recurso Afetado</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[var(--border-color)]">
              {MOCK_AUDIT_LOGS.map(log => (
                <tr key={log.id} className="hover:bg-[var(--surface-secondary)] transition-colors">
                  <td className="p-4 text-[var(--text-secondary)] font-mono text-xs whitespace-nowrap">
                    {new Date(log.date).toLocaleDateString()} {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-4 font-bold text-[var(--text-primary)]">{log.user}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="neutral" className="text-[10px] px-1.5 py-0.5">{log.type}</Badge>
                      <span className="text-[var(--text-secondary)]">{log.action}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[var(--text-primary)] font-medium">{log.resource}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
