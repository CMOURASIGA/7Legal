import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { StorageService } from "@/lib/storage";
import { Card } from "@/components/ui/Card";
import { Bell, Info } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function Notifications() {
  const { user, tenant } = useAuth();
  if (!user || !tenant) return null;

  const notifications = StorageService.getNotifications(tenant.id, user.id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Notificações</h2>
        <p className="text-[var(--text-secondary)]">Fique por dentro das novidades da sua conta.</p>
      </div>
      
      <Card>
        <div className="divide-y divide-[var(--border-color)]">
          {notifications.map(notif => (
            <div key={notif.id} className={`p-5 flex items-start space-x-4 transition-colors ${!notif.read ? 'bg-blue-50/50' : 'hover:bg-[var(--surface-secondary)]'}`}>
              <div className={`p-2 rounded-full mt-1 ${!notif.read ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--surface-secondary)] text-[var(--text-muted)]'}`}>
                <Bell className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-sm font-bold ${!notif.read ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs text-[var(--text-muted)] ml-4 shrink-0">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className={`text-sm ${!notif.read ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]'}`}>
                  {notif.message}
                </p>
                {!notif.read && (
                  <div className="mt-3">
                    <Badge variant="info">Nova</Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="p-12 text-center text-[var(--text-muted)] flex flex-col items-center">
              <Info className="w-8 h-8 mb-3 opacity-20" />
              Você não possui notificações.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
