import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { MetricCard } from "@/components/ui/MetricCard";
import { Folder, FileText, Activity, Users as UsersIcon, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StorageService } from "@/lib/storage";

export function Dashboard() {
  const { user, tenant } = useAuth();

  if (!user || !tenant) return null;

  const processes = StorageService.getProcesses(tenant.id, user.id, user.role);
  const activeProcesses = processes.filter(p => p.status === "ACTIVE").length;
  
  return (
    <div className="grid grid-cols-12 gap-6 p-2">
      <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Processos Ativos" 
          value={activeProcesses}
          icon={Folder}
          helper="+12"
        />
        <MetricCard 
          title="Documentos Recentes" 
          value={user.role === "CLIENT" ? "2" : "5"}
          icon={FileText}
          helper="!!"
        />
        <MetricCard 
          title="Movimentações" 
          value="42"
          icon={Activity}
          helper="W"
        />
        {user.role === "LAWYER" ? (
          <MetricCard 
            title="Meus Clientes" 
            value="12"
            icon={UsersIcon}
            helper="T"
          />
        ) : (
          <MetricCard 
            title="Prazos (24h)" 
            value="05"
            icon={Activity}
            helper="T"
          />
        )}
      </div>

      <div className="col-span-12 lg:col-span-8 space-y-6">
        <Card className="flex flex-col h-[460px] overflow-hidden p-0">
          <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center justify-between bg-white">
            <h2 className="font-bold text-[var(--text-primary)]">Últimos Processos Atualizados</h2>
            <button className="text-[var(--brand-primary)] text-xs font-bold hover:underline">Ver todos</button>
          </div>
          <div className="flex-1 overflow-x-auto bg-white">
            <table className="w-full text-left border-collapse whitespace-nowrap md:whitespace-normal">
              <thead className="bg-[var(--surface-secondary)] text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                <tr>
                  <th className="px-5 py-3 border-b border-[var(--border-color)]">Processo</th>
                  <th className="px-5 py-3 border-b border-[var(--border-color)]">Cliente</th>
                  <th className="px-5 py-3 border-b border-[var(--border-color)]">Status</th>
                  <th className="px-5 py-3 border-b border-[var(--border-color)]">Ações</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-[var(--border-color)]">
                {processes.slice(0, 4).map(p => (
                  <tr key={p.id} className="hover:bg-[var(--surface-secondary)] transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-bold text-[var(--text-primary)]">{p.number}</p>
                      <p className="text-[11px] text-[var(--text-muted)]">{p.title}</p>
                    </td>
                    <td className="px-5 py-4 font-medium text-[var(--text-secondary)]">
                      {p.clientId === 'c-1' ? 'João Cliente (Alfa)' : p.clientId === 'c-2' ? 'Empresa X' : p.clientId}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${p.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button className="p-1.5 hover:bg-[var(--border-color)] rounded text-[var(--text-muted)]">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="col-span-12 lg:col-span-4 space-y-6 flex flex-col">
        <Card className="flex flex-col h-[218px] bg-white">
          <h2 className="font-bold text-[var(--text-primary)] mb-4 flex items-center justify-between">
            <span>Linha do Tempo</span>
            <Activity className="w-4 h-4 text-[var(--text-muted)]" />
          </h2>
          <div className="space-y-4 overflow-auto pr-2">
            <div className="flex gap-3 relative">
              <div className="w-px bg-[var(--border-color)] absolute left-2 top-4 bottom-0"></div>
              <div className="w-4 h-4 rounded-full border-2 border-[var(--brand-primary)] bg-[var(--surface)] z-10 flex-shrink-0"></div>
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">Petição Protocolada</p>
                <p className="text-[10px] text-[var(--text-muted)]">Há 2 horas • Proc. 5003412-10</p>
              </div>
            </div>
            <div className="flex gap-3 relative">
              <div className="w-px bg-[var(--border-color)] absolute left-2 top-4 bottom-0"></div>
              <div className="w-4 h-4 rounded-full border-2 border-[var(--success)] bg-[var(--surface)] z-10 flex-shrink-0"></div>
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">Novo Documento Anexado</p>
                <p className="text-[10px] text-[var(--text-muted)]">Há 5 horas</p>
              </div>
            </div>
            <div className="flex gap-3 relative">
              <div className="w-4 h-4 rounded-full border-2 border-[var(--border-strong)] bg-[var(--surface)] z-10 flex-shrink-0"></div>
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">Movimentação Detectada</p>
                <p className="text-[10px] text-[var(--text-muted)]">Há 1 dia • Justiça Estadual</p>
              </div>
            </div>
          </div>
        </Card>

        {user.role === 'SUPERADMIN' && (
          <div className="bg-[var(--brand-primary)] text-[var(--brand-secondary)] rounded-xl shadow-sm border border-[var(--border-color)] p-5 flex-1 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-bold text-sm mb-1">Espaço Whitelabel</h2>
              <p className="text-[10px] opacity-60 mb-4">Configuração Dinâmica do Tenant</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] opacity-60 uppercase font-bold tracking-wider">Cor Primária</span>
                  <div className="w-8 h-4 rounded bg-[var(--brand-primary)] border border-white/20"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] opacity-60 uppercase font-bold tracking-wider">Cor Secundária</span>
                  <div className="w-8 h-4 rounded bg-[var(--text-primary)] border border-white/20"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] opacity-60 uppercase font-bold tracking-wider">Sincronização</span>
                  <span className="text-[10px] font-mono text-green-400">Gateway OK</span>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg py-2 text-xs font-bold transition-colors">
                Preview Customização
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        )}
      </div>
    </div>
  );
}
