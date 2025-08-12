// 故意制造异常：平台传入的 event 没有 request.text 方法
export async function onRequest(event, context) {
  console.log("[node] exception style - calling event.request.text()");
  // 绝大多数情况下 event.request 不存在，这里会抛出 TypeError
  // 用于验证“代码异常”的情况（你截图里的 /mynode/node 路由）
  // @ts-ignore
  return await event.request.text();
}

