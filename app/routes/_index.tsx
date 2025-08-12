import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function callNode() {
    setLoading(true);
    try {
      const res = await fetch("/mynode/node", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hello: "world" }),
      });
      const text = await res.text();
      setResult(`${res.status} ${res.statusText}\n${text}`);
    } catch (e) {
      setResult(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/quickstart"
            rel="noreferrer"
          >
            5m Quick Start
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/tutorial"
            rel="noreferrer"
          >
            30m Tutorial
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer"
          >
            Remix Docs
          </a>
        </li>
      </ul>

      <div className="mt-6">
        <button
          onClick={callNode}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          {loading ? "调用中..." : "调用 Node 函数 (/mynode/node)"}
        </button>
        <pre className="mt-2 whitespace-pre-wrap text-sm">{result}</pre>
      </div>
    </div>
  );
}
