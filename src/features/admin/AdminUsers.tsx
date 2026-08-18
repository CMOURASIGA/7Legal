import React from "react";
import { Card } from "@/components/ui/Card";

export function AdminUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Usuários</h2>
        <p className="text-[var(--text-secondary)]">Gestão de acessos da plataforma.</p>
      </div>
      
      <Card>
        <div className="p-12 text-center text-[var(--text-muted)]">
          Listagem de usuários em construção para o protótipo.
        </div>
      </Card>
    </div>
  );
}
