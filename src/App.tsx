import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      alert("Diagnóstico solicitado com sucesso!");
      setFormData({ nome: "", email: "", empresa: "", mensagem: "" });
    } catch (error) {
      alert("Erro ao enviar. Verifique o backend.");
    }
  };

  return (
    <div style={{ background: "black", color: "white", minHeight: "100vh", padding: 40 }}>
      <h1 style={{ color: "#22d3ee" }}>PAULO GROWTH IA</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 40, display: "grid", gap: 16 }}>
        <input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="empresa" placeholder="Empresa" value={formData.empresa} onChange={handleChange} />
        <textarea name="mensagem" placeholder="Mensagem" value={formData.mensagem} onChange={handleChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
