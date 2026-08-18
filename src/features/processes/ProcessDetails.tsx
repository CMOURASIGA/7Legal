import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { StorageService } from "@/lib/storage";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ChevronLeft, FileText, Activity, Users, FileSignature, Clock, Building, Scale, AlertCircle } from "lucide-react";

export function ProcessDetails() {
  const { id } = useParams<{ id: string }>();
  const { user, tenant } = useAuth();
  const [activeTab, setActiveTab] = React.useState<"overview" | "movements" | "documents">("overview");

  if (!user || !tenant || !id) return null;

  const process = StorageService.getProcess(id);
  const movements = StorageService.getAllMovements(tenant.id, user.id, user.role).filter(m => m.processId === id);
  const documents = StorageService.getAllDocuments(tenant.id, user.id, user.role).filter(d => d.processId === id);
  const client = process ? StorageService.getClient(process.clientId) : null;

  if (!process) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Processo não encontrado</h2>
        <Link to="/processes" className="text-[var(--brand-primary)] hover:underline mt-4 inline-block">Voltar para processos</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Back Link */}
      <div>
        <Link to="/processes" className="inline-flex items-center text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Voltar para listagem
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">{process.number}</h1>
              <Badge variant={process.status === "ACTIVE" ? "success" : process.status === "PENDING" ? "warning" : "neutral"}>
                {process.status}
              </Badge>
            </div>
            <p className="text-[var(--text-secondary)] font-medium text-lg">{process.title}</p>
          </div>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[var(--surface)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold rounded-lg text-sm shadow-sm hover:bg-[var(--surface-secondary)] transition-colors">
              Atualizar Andamento
            </button>
            <button className="px-4 py-2 bg-[var(--brand-primary)] text-[var(--brand-secondary)] font-bold rounded-lg text-sm shadow-sm hover:bg-[var(--brand-primary)]/90 transition-colors">
              Novo Documento
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--border-color)] flex space-x-8 overflow-x-auto whitespace-nowrap hide-scrollbar pb-1">
        <button 
          onClick={() => setActiveTab("overview")}
          className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === "overview" ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`}
        >
          Visão Geral
          {activeTab === "overview" && <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--brand-primary)] rounded-t-full"></span>}
        </button>
        <button 
          onClick={() => setActiveTab("movements")}
          className={`pb-4 text-sm font-bold transition-colors relative flex items-center gap-2 ${activeTab === "movements" ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`}
        >
          Movimentações
          <span className="bg-[var(--surface-secondary)] text-[var(--text-secondary)] py-0.5 px-2 rounded-full text-[10px]">{movements.length}</span>
          {activeTab === "movements" && <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--brand-primary)] rounded-t-full"></span>}
        </button>
        <button 
          onClick={() => setActiveTab("documents")}
          className={`pb-4 text-sm font-bold transition-colors relative flex items-center gap-2 ${activeTab === "documents" ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`}
        >
          Documentos
          <span className="bg-[var(--surface-secondary)] text-[var(--text-secondary)] py-0.5 px-2 rounded-full text-[10px]">{documents.length}</span>
          {activeTab === "documents" && <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--brand-primary)] rounded-t-full"></span>}
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="p-6 border-b border-[var(--border-color)]">
                  <h3 className="font-bold text-[var(--text-primary)] mb-4">Detalhes do Processo</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <span className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Ação</span>
                      <span className="text-[var(--text-primary)] font-medium">{process.title}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Assunto</span>
                      <span className="text-[var(--text-primary)]">{process.description || "Não especificado"}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Data de Distribuição</span>
                      <span className="text-[var(--text-primary)]">{new Date(process.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Última Atualização</span>
                      <span className="text-[var(--text-primary)]">{new Date(process.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-[var(--surface-secondary)]">
                  <h3 className="font-bold text-[var(--text-primary)] mb-4 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-[var(--warning)]" />
                    Resumo do Caso
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Trata-se de ação cível buscando reparação de danos decorrentes de descumprimento contratual. 
                    A petição inicial já foi protocolada e estamos no aguardo da citação da parte contrária para apresentação de defesa.
                    Existe risco moderado e os documentos probatórios já foram anexados em sua maioria.
                  </p>
                </div>
              </Card>

              {/* Latest Move snippet */}
              {movements.length > 0 && (
                <Card>
                  <div className="p-6 flex items-start gap-4">
                    <div className="bg-[var(--brand-primary)]/10 p-3 rounded-full">
                      <Activity className="w-5 h-5 text-[var(--brand-primary)]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-1">Última Movimentação</h4>
                      <p className="font-bold text-[var(--text-primary)]">{movements[0].title}</p>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">{movements[0].description}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-2">{new Date(movements[0].date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
            
            <div className="space-y-6">
              <Card>
                <div className="p-5 border-b border-[var(--border-color)]">
                  <h3 className="font-bold text-[var(--text-primary)]">Envolvidos</h3>
                </div>
                <div className="p-5 space-y-5">
                  <div>
                    <span className="flex items-center text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      <Users className="w-3 h-3 mr-1" /> Cliente
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[var(--surface-secondary)] flex items-center justify-center font-bold text-[var(--text-secondary)] text-xs">
                        {client?.name.charAt(0) || "C"}
                      </div>
                      <div>
                        <p className="font-bold text-[var(--text-primary)] text-sm">{client?.name || "Não definido"}</p>
                        <p className="text-xs text-[var(--text-muted)] font-mono">{client?.document}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-[var(--border-color)]">
                    <span className="flex items-center text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      <Scale className="w-3 h-3 mr-1" /> Advogado Responsável
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[var(--brand-primary)]/10 flex items-center justify-center font-bold text-[var(--brand-primary)] text-xs">
                        Dr
                      </div>
                      <div>
                        <p className="font-bold text-[var(--text-primary)] text-sm">Dr. Carlos Eduardo</p>
                        <p className="text-xs text-[var(--text-muted)]">OAB/SP 123.456</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-5 border-b border-[var(--border-color)]">
                  <h3 className="font-bold text-[var(--text-primary)]">Informações do Juízo</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="w-4 h-4 text-[var(--text-muted)] mt-0.5" />
                    <div>
                      <p className="font-medium text-[var(--text-primary)] text-sm">2ª Vara Cível</p>
                      <p className="text-xs text-[var(--text-secondary)]">Foro Central Cível - SP</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[var(--text-muted)] mt-0.5" />
                    <div>
                      <p className="font-medium text-[var(--text-primary)] text-sm">Valor da Causa</p>
                      <p className="text-xs text-[var(--text-secondary)]">R$ 50.000,00</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "movements" && (
          <div className="bg-white rounded-xl shadow-sm border border-[var(--border-color)]">
             <div className="p-6 relative">
              <div className="absolute left-9 top-10 bottom-10 w-px bg-[var(--border-color)]"></div>
              <div className="space-y-8">
                {movements.map((mov, i) => (
                  <div key={mov.id} className="flex gap-6 relative">
                    <div className="w-6 h-6 rounded-full border-2 border-[var(--brand-primary)] bg-[var(--surface)] z-10 flex-shrink-0 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-[var(--brand-primary)]"></div>
                    </div>
                    <div className="flex-1 bg-[var(--surface-secondary)] p-4 rounded-lg border border-[var(--border-color)]">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-[var(--text-primary)]">{mov.title}</h4>
                        <span className="text-xs font-medium text-[var(--text-muted)] bg-[var(--surface)] px-2 py-1 rounded">
                          {new Date(mov.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{mov.description}</p>
                      <div className="mt-3 flex gap-2">
                        <Badge variant="neutral">{mov.type}</Badge>
                        <span className="text-xs text-[var(--text-muted)] self-center flex items-center">
                          <Users className="w-3 h-3 mr-1" /> {mov.responsible}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {movements.length === 0 && (
                  <div className="text-center py-12 text-[var(--text-muted)]">Nenhuma movimentação registrada.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[var(--surface-secondary)] text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-color)]">
                  <tr>
                    <th className="px-5 py-3">Documento</th>
                    <th className="px-5 py-3">Categoria</th>
                    <th className="px-5 py-3">Data</th>
                    <th className="px-5 py-3 text-right">Tamanho</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-[var(--border-color)]">
                  {documents.map(doc => (
                    <tr key={doc.id} className="hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer group">
                      <td className="px-5 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-[var(--brand-primary)]/10 rounded group-hover:bg-[var(--brand-primary)]/20 transition-colors">
                            <FileSignature className="w-5 h-5 text-[var(--brand-primary)]" />
                          </div>
                          <div>
                            <span className="font-bold text-[var(--text-primary)] block group-hover:text-[var(--brand-primary)] transition-colors">{doc.title}</span>
                            {doc.status === "NEW" && <span className="text-[10px] text-[var(--warning)] font-bold uppercase tracking-wider">Novo • Não Lido</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[var(--text-secondary)]">{doc.category}</td>
                      <td className="px-5 py-4 text-[var(--text-secondary)]">{new Date(doc.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4 text-[var(--text-muted)] font-mono text-xs text-right">2.4 MB</td>
                    </tr>
                  ))}
                  {documents.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-[var(--text-muted)]">Nenhum documento anexado a este processo.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
