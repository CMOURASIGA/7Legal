/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { BrandingProvider } from "./providers/BrandingProvider";
import { AppShell } from "./components/layout/AppShell";
import { Login } from "./features/auth/Login";
import { Dashboard } from "./features/dashboard/Dashboard";
import { Processes } from "./features/processes/Processes";
import { ProcessDetails } from "./features/processes/ProcessDetails";
import { Clients } from "./features/clients/Clients";
import { Documents } from "./features/documents/Documents";
import { Movements } from "./features/movements/Movements";
import { Notifications } from "./features/notifications/Notifications";
import { AdminWhitelabel } from "./features/admin/AdminWhitelabel";
import { AdminTenants } from "./features/admin/AdminTenants";
import { AdminUsers } from "./features/admin/AdminUsers";
import { AdminIntegrations } from "./features/admin/AdminIntegrations";
import { AdminAudit } from "./features/admin/AdminAudit";
import { NotFound } from "./components/layout/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BrandingProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            <Route element={<AppShell />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/processes" element={<Processes />} />
              <Route path="/processes/:id" element={<ProcessDetails />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/movements" element={<Movements />} />
              <Route path="/notifications" element={<Notifications />} />
              
              {/* Admin Routes */}
              <Route path="/admin/tenants" element={<AdminTenants />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/integrations" element={<AdminIntegrations />} />
              <Route path="/admin/audit" element={<AdminAudit />} />
              <Route path="/admin/whitelabel" element={<AdminWhitelabel />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrandingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

