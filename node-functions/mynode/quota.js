let count = 0;
export async function onRequest(event, context) {
  count++;
  console.log("[quota] called", { count });
  // 简单模拟调用超限：当短时间内调用次数超过 3 次即返回 429
  if (count > 3) {
    return new Response(JSON.stringify({ ok: false, type: "quota", message: "Too Many Requests", count }), {
      status: 429,
      headers: { "content-type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ ok: true, type: "quota", count }), {
    headers: { "content-type": "application/json" },
  });
}

