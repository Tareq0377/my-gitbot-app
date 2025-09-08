// pages/index.tsx
'use client'
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ username: "", token: "", owner: "", repo: "" });
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Processing...");
    try {
      const res = await fetch("/api/update-readme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Unknown error");
      setStatus("Success: " + (data.message ?? "Readme updated"));
    } catch (err: any) {
      setStatus("Error: " + String(err.message || err));
    }
  }

  return (
    <>
    <div>
      <h2>Git Robot: Update README</h2>
      <form onSubmit={handleSubmit}>
        <label>Username<input required value={form.username} onChange={e => setForm({...form, username: e.target.value})} /></label>
        <label>Personal Access Token<input required value={form.token} onChange={e => setForm({...form, token: e.target.value})} /></label>
        <label>Owner (org/user)<input required value={form.owner} onChange={e => setForm({...form, owner: e.target.value})} /></label>
        <label>Repo name<input required value={form.repo} onChange={e => setForm({...form, repo: e.target.value})} /></label>
        <button type="submit">Update README</button>
      </form>
      {status && <div role="status">{status}</div>}
    </div>
    </>
    
  );
}
