import React from "react";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/providers/AuthProvider";

export function AdminIntegrations() {
  const { tenant } = useAuth();
  
  // Fake state to demonstrate differences
  const isAlfa = tenant?.id === "tenant-alfa";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Integrações de Sistema</h2>
        <p className="text-[var(--text-secondary)]">Gerencie o gateway de integração com o ERP/Software Jurídico principal.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)]/20 shadow-md">
          <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1">Conector Principal</h3>
              <p className="text-sm text-[var(--text-secondary)]">Responsável por sincronizar processos, clientes e documentos.</p>
            </div>
            <Badge variant="success" className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Conectado
            </Badge>
          </div>
          
          <div className="p-6 space-y-5">
            <div>
              <span className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Sistema Conectado</span>
              <span className="text-[var(--text-primary)] font-bold text-lg flex items-center">
                {isAlfa ? "Legal One" : "API Proprietária (REST)"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Tipo de Conector</span>
                <span className="text-[var(--text-secondary)] font-mono text-xs">
                  {isAlfa ? "LegalOneConnector_v2" : "GenericRestConnector_v1"}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Ambiente</span>
                <span className="text-[var(--text-secondary)] text-sm">Homologação</span>
              </div>
            </div>
            
            <div>
              <span className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Última Sincronização</span>
              <span className="text-[var(--text-secondary)] text-sm flex items-center">
                <RefreshCw className="w-3 h-3 mr-2 text-[var(--text-muted)]" />
                {new Date().toLocaleDateString()} às {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          
          <div className="p-4 bg-[var(--surface-secondary)] border-t border-[var(--border-color)] flex justify-end gap-3 rounded-b-xl">
            <button className="px-4 py-2 text-sm font-bold text-[var(--text-primary)] bg-white border border-[var(--border-color)] rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
              Testar Conexão
            </button>
            <button className="px-4 py-2 text-sm font-bold text-white bg-[var(--brand-primary)] rounded-lg shadow-sm hover:bg-[var(--brand-primary)]/90 transition-colors">
              Configurar
            </button>
          </div>
        </Card>
        
        <Card>
          <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1">Webhook Events</h3>
              <p className="text-sm text-[var(--text-secondary)]">Disparo de eventos para sistemas externos.</p>
            </div>
            <Badge variant="warning" className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Não Configurado
            </Badge>
          </div>
          <div className="p-12 text-center text-[var(--text-muted)]">
            Configure uma URL de destino para receber eventos em tempo real (Notificações Push, Atualizações de Status).
          </div>
        </Card>
      </div>
    </div>
  );
}
