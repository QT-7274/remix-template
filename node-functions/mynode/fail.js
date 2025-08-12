export async function onRequest(event, context) {
  console.log("[fail] called");
  // 模拟业务失败：返回非 2xx 状态或约定错误对象
  return new Response(JSON.stringify({ ok: false, type: "fail", message: "business failed" }), {
    status: 400,
    headers: { "content-type": "application/json" },
  });
}

