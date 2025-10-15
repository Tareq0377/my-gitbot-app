"use client";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<string>("");

  async function handleExecute(e: React.FormEvent) {
    e.preventDefault();
    setLog("");
    setRunning(true);

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, token, owner, repo }),
      });

      const reader = res.body?.getReader();
      if (!reader) {
        const json = await res.json();
        setLog(JSON.stringify(json, null, 2));
        setRunning(false);
        return;
      }

      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (value) {
          setLog((prev) => prev + decoder.decode(value));
        }
        done = streamDone;
      }
    } catch (err: any) {
      setLog((prev) => prev + `\n[client error] ${String(err)}\n`);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div
      className={"max-w-2xl mx-auto mt-8 p-6 bg-gray-700 border-2 border-gray-900 rounded-2xl text-gray-50 dark:bg-gray-50 dark:text-gray-900"}
    >
      <div className="p-6">
        <form
          onSubmit={handleExecute}
          className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block mb-1">Username:</label>
            <input
              className="w-full p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="block mt-3 mb-1">Token:</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
            <label className="block mt-3 mb-1">Owner:</label>
            <input
              className="w-full p-2 border rounded"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              required
            />
            <label className="block mt-3 mb-1">Repository:</label>
            <input
              className="w-full p-2 border rounded"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              disabled={running}
              className="mt-4 bg-blue-600 text-white py-2 rounded"
            >
              {running ? "Running..." : "Execute"}
            </button>
            <div className="flex-1 p-4  bg-gray-700 text-gray-50 dark:bg-gray-50 dark:text-gray-800 overflow-auto">
              {username && owner && repo && token && (
                <pre className=" text-sm">
                  {`
git clone https://${username}:${token}@github.com/${owner}/${repo}.git
cd ${repo}
git checkout -b update-readme
echo "## This is the System" >> README.md
echo "Successfully connected!" >> README.md
git add README.md
git commit -m "Update README.md: Add new section"
git push origin update-readme
gh pr create --title "Update README.md" --body "Added a new section to the README"
    `}
                </pre>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
