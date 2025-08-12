import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export default function Index() {
  const [loadingPath, setLoadingPath] = useState<string | null>(null);
  const [result, setResult] = useState("");

  async function call(path: string, init?: RequestInit) {
    setLoadingPath(path);
    const started = Date.now();
    try {
      const res = await fetch(path, { method: "POST", ...init });
      const text = await res.text().catch(() => "<no body>");
      setResult(`[${path}] ${res.status} ${res.statusText} (${Date.now() - started}ms)\n${text}`);
    } catch (e) {
      setResult(`[${path}] Error (${Date.now() - started}ms)\n${String(e)}`);
    } finally {
      setLoadingPath(null);
    }
  }

  function Btn({ path, label }: { path: string; label: string }) {
    const busy = loadingPath === path;
    return (
      <button
        onClick={() => call(path)}
        className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
        disabled={!!loadingPath}
      >
        {busy ? `调用中... ${label}` : label}
      </button>
    );
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

      <div className="mt-6 space-y-3">
        <h2 className="text-xl">Node 函数测试</h2>
        <div className="flex flex-wrap gap-2">
          <Btn path="/mynode/success" label="成功 /mynode/success" />
          <Btn path="/mynode/fail" label="失败 /mynode/fail" />
          <Btn path="/mynode/retry" label="重试 /mynode/retry" />
          <Btn path="/mynode/debug" label="调试中断 /mynode/debug (~10s)" />
          <Btn path="/mynode/timeout" label="调用超时 /mynode/timeout (~15s)" />
          <Btn path="/mynode/quota" label="调用超限 /mynode/quota" />
          <Btn path="/mynode/exception" label="代码异常 /mynode/exception" />
          <Btn path="/mynode/node" label="代码异常(旧用例) /mynode/node" />
        </div>

        <pre className="mt-2 whitespace-pre-wrap text-sm">{result}</pre>
      </div>
    </div>
  );
}
