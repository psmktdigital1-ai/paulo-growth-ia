/// <reference types="vite/client" />

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const env = (import.meta as any).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || "";

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export default function PauloGrowthIA() {
  const [status, setStatus] = useState<"idle" | "connected" | "error">("idle");

  useEffect(() => {
    if (!supabase) {
      setStatus("error");
      return;
    }

    supabase.auth
      .getSession()
      .then(() => setStatus("connected"))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0A0F1C",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <h1 style={{ fontSize: 28, color: "#22d3ee" }}>
          Paulo Growth IA
        </h1>

        <p style={{ color: "#9ca3af" }}>
          Build seguro para Vercel.
        </p>

        {!supabase && (
          <p style={{ color: "#f87171" }}>
            Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nas variáveis de ambiente da Vercel.
          </p>
        )}

        {supabase && status === "connected" && (
          <p style={{ color: "#4ade80" }}>
            Supabase conectado com sucesso.
          </p>
        )}

        {supabase && status === "error" && (
          <p style={{ color: "#facc15" }}>
            Supabase inicializado, mas sem sessão ativa.
          </p>
        )}
      </div>
    </div>
  );
}
