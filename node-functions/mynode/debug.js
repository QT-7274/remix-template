export async function onRequest(event, context) {
  console.log("[debug] break here - simulating debug pause");
  // 模拟调试中断：等待 10 秒（可在平台开启断点调试时手动中断/查看调用栈）
  await new Promise((r) => setTimeout(r, 10000));
  return new Response(JSON.stringify({ ok: true, type: "debug", waitedMs: 10000 }), {
    headers: { "content-type": "application/json" },
  });
}

