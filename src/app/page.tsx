"use client"
import { useState } from "react";


type Method = "github-api" | "git-cli";


export default function Home() {
    const [form, setForm] = useState({ username: "", token: "", owner: "", repo: "" });
    const [method, setMethod] = useState<Method>("github-api");
    const [status, setStatus] = useState<string | null>(null);


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("Processing...");
        try {
            const endpoint = method === "github-api" ? "/api/update-readme-github" : "/api/update-readme";
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Unknown error");
            setStatus("✅ " + (data.message ?? "Done"));
        } catch (err: any) {
            setStatus("❌ " + String(err.message || err));
        }
    }


    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Git Robot: Update README</h2>


            <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="form-help">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                    <input id="username" required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
                        className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>


                <div>
                    <label htmlFor="token" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Personal Access Token</label>
                    <input id="token" type="password" required value={form.token} onChange={e => setForm({ ...form, token: e.target.value })}
                        className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>


                <div>
                    <label htmlFor="owner" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Owner (org/user)</label>
                    <input id="owner" required value={form.owner} onChange={e => setForm({ ...form, owner: e.target.value })}
                        className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>


                <div>
                    <label htmlFor="repo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Repo name</label>
                    <input id="repo" required value={form.repo} onChange={e => setForm({ ...form, repo: e.target.value })}
                        className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>


                <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">Method</legend>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="method" checked={method === "github-api"} onChange={() => setMethod("github-api")} />
                            <span>GitHub API (recommended)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="method" checked={method === "git-cli"} onChange={() => setMethod("git-cli")} />
                            <span>Git CLI (exec)</span>
                        </label>
                    </div>
                </fieldset>


                <button type="submit" className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Update README</button>
            </form>


            {status && <div role="status" aria-live="polite" className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-100">{status}</div>}


            <p id="form-help" className="mt-2 text-xs text-gray-500 dark:text-gray-400">Your token is used only for this request and not stored.</p>

        </div>
    );
}