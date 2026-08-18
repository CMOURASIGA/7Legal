import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { StorageService } from "@/lib/storage";
import { Card } from "@/components/ui/Card";
import { Activity } from "lucide-react";

export function Movements() {
  const { user, tenant } = useAuth();
  if (!user || !tenant) return null;

  const movements = StorageService.getAllMovements(tenant.id, user.id, user.role);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Movimentações</h2>
        <p className="text-[var(--text-secondary)]">Histórico de movimentações dos seus processos.</p>
      </div>
      
      <div className="grid gap-4">
        {movements.map(mov => {
          const process = StorageService.getProcess(mov.processId);
          return (
            <Card key={mov.id}>
              <div className="p-5 flex items-start space-x-4">
                <div className="bg-[var(--brand-primary)]/10 p-3 rounded-full mt-1">
                  <Activity className="h-5 w-5 text-[var(--brand-primary)]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{mov.title}</h3>
                    <span className="text-sm font-medium text-[var(--text-muted)] bg-[var(--surface-secondary)] px-2 py-1 rounded">
                      {new Date(mov.date).toLocaleDateString()} às {new Date(mov.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] mb-3">{mov.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[var(--border-color)]">
                    <div className="text-xs text-[var(--text-muted)]">
                      <span className="uppercase font-bold tracking-wider opacity-70 mr-1">Processo:</span> 
                      <span className="font-mono text-[var(--text-primary)]">{process?.number || mov.processId}</span>
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      <span className="uppercase font-bold tracking-wider opacity-70 mr-1">Tipo:</span> 
                      <span className="text-[var(--text-primary)]">{mov.type}</span>
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      <span className="uppercase font-bold tracking-wider opacity-70 mr-1">Responsável:</span> 
                      <span className="text-[var(--text-primary)]">{mov.responsible}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
        {movements.length === 0 && (
          <Card>
            <div className="p-12 text-center text-[var(--text-muted)]">Nenhuma movimentação recente.</div>
          </Card>
        )}
      </div>
    </div>
  );
}
