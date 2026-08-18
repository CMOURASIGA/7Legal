import React, { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      login(email);
      navigate("/dashboard");
    } catch (err) {
      setError("Usuário não encontrado. Use os e-mails de demonstração.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8 px-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[var(--brand-primary)] mb-2">7Legal</h1>
            <p className="text-[var(--text-secondary)]">Acesse sua conta</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="E-mail" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: cliente@demo.com"
              required
            />
            <Input 
              label="Senha" 
              type="password" 
              placeholder="demo123"
              value="demo123"
              readOnly
            />
            {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
            
            <Button type="submit" className="w-full mt-4" size="lg">
              Entrar
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--border-color)] text-sm text-[var(--text-secondary)]">
            <p className="font-medium mb-2">Usuários de Demonstração:</p>
            <ul className="space-y-1">
              <li>• superadmin@demo.com</li>
              <li>• admin@demo.com</li>
              <li>• advogado@demo.com</li>
              <li>• cliente@demo.com</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
