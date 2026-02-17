import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// =====================================
// PAULO GROWTH IA — SaaS INTERNATIONAL VERSION 6.0
// PREMIUM UI + AUTH + PRICING + AUTHORITY
// =====================================

// 🔐 SUPABASE CONFIG (coloque depois suas chaves reais)
const supabaseUrl = "https://ayxhucqunkkribwakhpb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5eGh1Y3F1bmtrcmlid2FraHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyOTE5NjksImV4cCI6MjA4Njg2Nzk2OX0.A9QG1qkaFe-o0yySTwBxMk_Be6KWqf8MnUswI_1ULOc";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PauloGrowthIA() {
  const [page, setPage] = useState<
    "home" | "demo" | "dashboard" | "login"
  >("home");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_user, setUser] = useState<any>(null);


  const [_lead, setLead] = useState({ name: "", email: "", company: "" });

  // =============================
  // AUTH LISTENER
  // =============================
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // =============================
  // LOGIN
  // =============================
  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      setPage("dashboard");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setPage("home");
  }

  // =============================
  // LOGIN PAGE
  // =============================
  if (page === "login") {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center text-white">
        <div className="bg-gradient-to-br from-gray-900 to-black p-12 rounded-3xl border border-gray-800 w-full max-w-md shadow-2xl">
          <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
            Client Portal
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl bg-gray-800 border border-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 rounded-xl bg-gray-800 border border-gray-700"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black py-3 rounded-2xl font-semibold"
          >
            Login
          </button>

          <button
            onClick={() => setPage("home")}
            className="mt-6 text-cyan-400 text-sm"
          >
            ← Voltar
          </button>
        </div>
      </div>
    );
  }

  // =============================
  // DASHBOARD
  // =============================
  if (page === "dashboard") {
    return (
      <div className="min-h-screen bg-[#0A0F1C] text-white p-10">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-cyan-400">
            Executive Growth Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {[
            { label: "MRR", value: "R$ 18.400" },
            { label: "CAC", value: "R$ 120" },
            { label: "LTV", value: "R$ 1.280" },
            { label: "ROAS", value: "4.8x" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl border border-gray-700 shadow-xl"
            >
              <h3 className="text-gray-400 text-sm mb-3 uppercase">
                {item.label}
              </h3>
              <p className="text-3xl font-bold text-cyan-400">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-3xl p-10 border border-gray-800 shadow-xl">
          <h2 className="text-xl text-cyan-400 mb-6">
            AI Revenue Forecast
          </h2>
          <div className="h-52 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-end justify-around p-4">
            {[30, 45, 60, 70, 85, 95].map((v, i) => (
              <div
                key={i}
                className="w-8 bg-cyan-400 rounded-t-lg"
                style={{ height: `${v}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =============================
  // HOME
  // =============================
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      <header className="flex justify-between items-center px-10 py-6 border-b border-gray-800 fixed w-full bg-[#0A0F1C]/95 backdrop-blur z-50">
        <h1 className="text-2xl font-bold text-cyan-400 tracking-wide">
          PAULO GROWTH IA
        </h1>
        <nav className="flex gap-8 text-sm text-gray-300">
          <button onClick={() => setPage("login")}>
            Login
          </button>
          <a href="#pricing">Planos</a>
          <a href="#authority">Sobre</a>
        </nav>
      </header>

            <section className="text-center px-6 pt-48 pb-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-6xl font-bold mb-8 leading-tight">
            Arquitetura Estratégica de Growth
            <br />
            <span className="text-cyan-400">Dados. Automação. IA.</span>
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto mb-12 text-xl leading-relaxed">
            Estruturamos inteligência de dados, automação avançada e modelos de IA
            para transformar marketing em previsibilidade e crescimento escalável.
            
            Não vendemos ferramentas.
            
            Construímos arquitetura de crescimento sob medida.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-black px-8 py-4 rounded-2xl font-semibold shadow-xl">
              Agendar Diagnóstico Estratégico Gratuito
            </button>

            <button
              onClick={() => setPage("demo")}
              className="border border-cyan-400 text-cyan-400 px-8 py-4 rounded-2xl hover:bg-cyan-400 hover:text-black transition"
            >
              Ver Demonstração
            </button>
          </div>

          <div className="mt-12 text-gray-500 text-sm">
            BI • n8n • Supabase • IA Preditiva • Growth Performance
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="px-10 py-24 bg-[#111827] text-center">
        <h3 className="text-3xl font-bold text-cyan-400 mb-12">
          Como Funciona
        </h3>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Diagnóstico", desc: "Análise profunda da maturidade de dados e funil." },
            { title: "Arquitetura", desc: "Definição da estrutura ideal de BI + Automação + IA." },
            { title: "Implementação", desc: "Execução técnica com integração total." },
            { title: "Otimização", desc: "Evolução contínua baseada em performance." },
          ].map((step, i) => (
            <div key={i} className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-xl">
              <h4 className="text-xl font-bold text-cyan-400 mb-4">
                {step.title}
              </h4>
              <p className="text-gray-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* AUTHORITY */}
      <section
        id="authority"
        className="px-10 py-32 bg-[#111827] text-center"
      >
        <h3 className="text-4xl font-bold mb-12 text-cyan-400">
          Founder & Authority
        </h3>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed">
          Especialista em Performance Marketing, Business Intelligence e
          Inteligência Artificial aplicada a Growth. Pós-graduado em Ciência
          de Dados, com experiência prática em mídia paga, e-commerce e
          arquitetura de automação com n8n, CRM e IA.
          <br />
          <br />
          Foco em transformar dados em previsibilidade, escala e crescimento
          estruturado.
        </p>
      </section>

            {/* ARCHITECTURE MODEL */}
      <section id="pricing" className="px-10 py-32 text-center">
        <h3 className="text-4xl font-bold mb-10 text-cyan-400">
          Arquitetura Modular de Growth
        </h3>

        <p className="text-gray-400 max-w-3xl mx-auto mb-16 text-lg">
          Cada empresa possui nível diferente de maturidade em dados e marketing.
          Estruturamos soluções sob demanda combinando BI, Automação e IA conforme
          o porte e os objetivos estratégicos do negócio.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto text-left">

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-3xl border border-gray-700 shadow-xl">
            <h4 className="text-2xl font-bold text-cyan-400 mb-6">
              📊 Business Intelligence
            </h4>
            <ul className="text-gray-400 space-y-3">
              <li>• Dashboards executivos personalizados</li>
              <li>• Integração GA4 / Google Ads / Meta / CRM</li>
              <li>• KPIs estratégicos para decisão</li>
              <li>• Relatórios automatizados</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-3xl border border-gray-700 shadow-xl">
            <h4 className="text-2xl font-bold text-cyan-400 mb-6">
              🤖 Automação & Integração (n8n / CRM / WhatsApp)
            </h4>
            <ul className="text-gray-400 space-y-3">
              <li>• Fluxos automáticos de leads</li>
              <li>• Integração entre sistemas</li>
              <li>• WhatsApp automatizado</li>
              <li>• Relatórios e alertas inteligentes</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-3xl border border-gray-700 shadow-xl">
            <h4 className="text-2xl font-bold text-cyan-400 mb-6">
              🧠 Inteligência Artificial Aplicada
            </h4>
            <ul className="text-gray-400 space-y-3">
              <li>• Previsão de vendas</li>
              <li>• Lead Scoring</li>
              <li>• Análise de churn</li>
              <li>• Modelos preditivos personalizados</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-3xl border border-gray-700 shadow-xl">
            <h4 className="text-2xl font-bold text-cyan-400 mb-6">
              📈 Growth & Performance
            </h4>
            <ul className="text-gray-400 space-y-3">
              <li>• Auditoria de mídia paga</li>
              <li>• Estruturação de funil</li>
              <li>• CRO e otimização</li>
              <li>• Estratégia de escala</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 bg-[#111827] p-12 rounded-3xl border border-gray-800 max-w-4xl mx-auto shadow-xl">
          <h4 className="text-2xl font-bold text-cyan-400 mb-6">
            Modelo de Parceria
          </h4>
          <p className="text-gray-400 mb-6">
            1. Diagnóstico Estratégico Gratuito
            <br />
            2. Definição da Arquitetura Ideal
            <br />
            3. Implementação sob medida
            <br />
            4. Otimização contínua
          </p>

          <p className="text-gray-500 text-sm">
            Estrutura flexível adaptada para empresas pequenas, médias ou grandes.
            Valores definidos conforme complexidade, integrações e nível de maturidade digital.
          </p>
        </div>
      </section>

      <footer className="text-center py-10 border-t border-gray-800 text-gray-500 text-sm">
        © 2026 Paulo Growth IA — International SaaS Structure
      </footer>
    </div>
  );
}
