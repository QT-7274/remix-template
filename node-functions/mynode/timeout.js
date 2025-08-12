export async function onRequest(event, context) {
  console.log("[timeout] called - start long job");
  // 故意超时：例如平台超时时间是 5s，我们睡 15s
  await new Promise((r) => setTimeout(r, 15000));
  return new Response(JSON.stringify({ ok: true, type: "timeout", finished: true }), {
    headers: { "content-type": "application/json" },
  });
}

