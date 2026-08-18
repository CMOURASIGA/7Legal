import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { StorageService } from "@/lib/storage";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FileText, Download, Eye } from "lucide-react";

export function Documents() {
  const { user, tenant } = useAuth();
  if (!user || !tenant) return null;

  const documents = StorageService.getAllDocuments(tenant.id, user.id, user.role);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Documentos</h2>
        <p className="text-[var(--text-secondary)]">Documentos anexados aos seus processos.</p>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--surface-secondary)] text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-color)]">
              <tr>
                <th className="px-5 py-3">Documento</th>
                <th className="px-5 py-3">Categoria</th>
                <th className="px-5 py-3">Data</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[var(--border-color)]">
              {documents.map(doc => (
                <tr key={doc.id} className="hover:bg-[var(--surface-secondary)] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-[var(--brand-accent)]" />
                      <span className="font-medium text-[var(--text-primary)]">{doc.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[var(--text-secondary)]">{doc.category}</td>
                  <td className="px-5 py-4 text-[var(--text-secondary)]">{new Date(doc.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <Badge variant={doc.status === "NEW" ? "warning" : doc.status === "APPROVED" ? "success" : "neutral"}>
                      {doc.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right space-x-2">
                    <button className="p-1.5 hover:bg-[var(--border-color)] rounded text-[var(--text-muted)] hover:text-[var(--brand-primary)]" title="Visualizar">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-[var(--border-color)] rounded text-[var(--text-muted)] hover:text-[var(--brand-primary)]" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {documents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-[var(--text-muted)]">Nenhum documento encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
