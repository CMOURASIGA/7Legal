import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { StorageService } from "@/lib/storage";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

export function Processes() {
  const { user, tenant } = useAuth();
  
  if (!user || !tenant) return null;

  const processes = StorageService.getProcesses(tenant.id, user.id, user.role);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Processos</h2>
          <p className="text-[var(--text-secondary)]">
            Acompanhe os processos vinculados à sua conta.
          </p>
        </div>
        <div className="flex space-x-2">
          <Input placeholder="Pesquisar processo..." className="w-64" />
          <Button variant="outline">Filtrar</Button>
        </div>
      </div>

      <div className="grid gap-4">
        {processes.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-[var(--text-secondary)]">
              Nenhum processo encontrado.
            </CardContent>
          </Card>
        ) : (
          processes.map((process) => (
            <Card key={process.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg text-[var(--brand-primary)]">{process.number}</h3>
                    <Badge variant={process.status === "ACTIVE" ? "success" : "warning"}>
                      {process.status}
                    </Badge>
                  </div>
                  <p className="text-[var(--text-primary)] font-medium">{process.title}</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Última atualização: {new Date(process.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Button variant="primary">Visualizar Detalhes</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
