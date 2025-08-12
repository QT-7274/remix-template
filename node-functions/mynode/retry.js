let hit = 0;
export async function onRequest(event, context) {
  hit++;
  console.log("[retry] called", { hit });
  // 前两次返回 500，第三次返回 200，用于测试平台重试
  if (hit <= 2) {
    return new Response(JSON.stringify({ ok: false, type: "retry", hit }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ ok: true, type: "retry", hit }), {
    headers: { "content-type": "application/json" },
  });
}

