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
import { Clients } from "./features/clients/Clients";
import { Documents } from "./features/documents/Documents";
import { Movements } from "./features/movements/Movements";
import { Notifications } from "./features/notifications/Notifications";
import { AdminWhitelabel } from "./features/admin/AdminWhitelabel";
import { NotFound } from "./components/layout/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BrandingProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<AppShell />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="processes" element={<Processes />} />
              <Route path="clients" element={<Clients />} />
              <Route path="documents" element={<Documents />} />
              <Route path="movements" element={<Movements />} />
              <Route path="notifications" element={<Notifications />} />
              
              {/* Admin Routes */}
              <Route path="admin/whitelabel" element={<AdminWhitelabel />} />
              
              {/* Fallback for unbuilt pages */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrandingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

