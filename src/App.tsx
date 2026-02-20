/// <reference types="vite/client" />

import { useState, useEffect } from "react";
import { createClient, User } from "@supabase/supabase-js";

// ================= SUPABASE =================

const supabaseUrl =
  (import.meta as any)?.env?.VITE_SUPABASE_URL ?? "";

const supabaseAnonKey =
  (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY ?? "";

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// ================= APP =================

export default function PauloGrowthIA() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "ai" | "automation">("dashboard");
  const [plan, setPlan] = useState<"Free" | "Pro">("Free");

  useEffect(() => {
    if (!supabase) return;

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

  async function handleLogin() {
    if (!supabase) return;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
  }

  async function handleRegister() {
    if (!supabase) return;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) alert(error.message);
  }

  async function handleLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  if (!supabase) {
    return <h2>Configure variáveis da Vercel</h2>;
  }

  if (!user) {
    return (
      <div style={center}>
        <div style={card}>
          <h1>Growth OS</h1>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Entrar</button>
          <button onClick={handleRegister}>Criar Conta</button>
        </div>
      </div>
    );
  }

  return (
    <div style={layout}>
      <div style={sidebar}>
        <h2>Growth OS</h2>
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveTab("ai")}>IA Estratégica</button>
        <button onClick={() => setActiveTab("automation")}>Automação</button>
        <p>Plano: {plan}</p>
        <button onClick={handleLogout}>Sair</button>
      </div>

      <div style={content}>
        {activeTab === "dashboard" && (
          <>
            <h1>Dashboard</h1>
            <p>Bem-vindo, {user.email}</p>
            {plan === "Free" && (
              <button onClick={() => setPlan("Pro")}>
                Simular Upgrade Pro
              </button>
            )}
          </>
        )}

        {activeTab === "ai" && (
          <>
            <h1>IA Estratégica</h1>
            <p>Geração de estratégia aqui.</p>
          </>
        )}

        {activeTab === "automation" && (
          <>
            <h1>Automação</h1>
            {plan === "Free"
              ? "Disponível apenas no plano Pro"
              : "Automação ativa"}
          </>
        )}
      </div>
    </div>
  );
}

// ================= STYLES =================

const layout: React.CSSProperties = {
  display: "flex",
  minHeight: "100vh",
};

const sidebar: React.CSSProperties = {
  width: 220,
  padding: 20,
  background: "#111827",
  color: "white",
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const content: React.CSSProperties = {
  flex: 1,
  padding: 40,
};

const center: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
};

const card: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  width: 300,
};