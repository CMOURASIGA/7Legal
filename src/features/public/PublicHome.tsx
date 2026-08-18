import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Briefcase, Activity } from "lucide-react";

export function PublicHome() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--background)]">
      {/* Header */}
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 md:px-16 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center font-bold text-xl text-white">7</div>
          <span className="font-bold text-2xl tracking-tight text-slate-800">7Legal</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <a href="#noticias" className="hover:text-blue-600 transition-colors">Notícias</a>
          <a href="#institucional" className="hover:text-blue-600 transition-colors">Institucional</a>
          <a href="#contato" className="hover:text-blue-600 transition-colors">Contato</a>
        </nav>
        
        <Link 
          to="/login" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm flex items-center gap-2"
        >
          Área Privada
          <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center bg-slate-900 text-white px-8 md:px-16 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Gestão Jurídica <br />
            <span className="text-blue-400">Inteligente e Integrada</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Uma plataforma completa para acompanhamento de processos, controle de documentos e gestão do relacionamento com seus clientes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-bold transition-colors shadow-lg shadow-blue-900/20 flex items-center gap-2"
            >
              Acessar minha conta
            </Link>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-colors border border-white/10">
              Conhecer a plataforma
            </button>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 px-8 md:px-16 bg-white" id="institucional">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Tudo que você precisa em um só lugar</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Nossa plataforma oferece as ferramentas necessárias para simplificar e acelerar a rotina do seu escritório e o atendimento aos seus clientes.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Gestão de Processos</h3>
              <p className="text-slate-600">Acompanhamento completo do ciclo de vida dos processos, com controle de prazos e integrações.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Gestor de Documentos</h3>
              <p className="text-slate-600">Centralize procurações, petições e contratos em um cofre digital seguro e organizado.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Movimentações</h3>
              <p className="text-slate-600">Receba atualizações automáticas sobre os andamentos dos tribunais diretamente no sistema.</p>
            </div>
          </div>
        </div>
      </section>

      {/* News Carousel Placeholder */}
      <section className="py-24 px-8 md:px-16 bg-slate-50 border-t border-slate-200" id="noticias">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Últimas Notícias e Atualizações</h2>
            <button className="text-blue-600 font-bold hover:underline">Ver todas</button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-shadow">
                <div className="h-40 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase mb-2">Informativo</span>
                  <h3 className="font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">Nova funcionalidade de IA liberada para análise de contratos</h3>
                  <p className="text-sm text-slate-500 line-clamp-3 mt-auto">Agora nossos clientes podem utilizar inteligência artificial para revisar minutas e encontrar riscos...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-8 md:px-16 border-t border-white/10" id="contato">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center font-bold text-sm text-white">7</div>
            <span className="font-bold text-white tracking-tight">7Legal</span>
          </div>
          
          <div className="text-sm text-center md:text-right">
            <p>&copy; 2026 Consult Services Tecnologia. Todos os direitos reservados.</p>
            <p className="mt-1">contato@consultservices.com.br</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
