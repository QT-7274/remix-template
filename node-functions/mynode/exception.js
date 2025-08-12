export async function onRequest(event, context) {
  console.log("[exception] called - going to throw");
  // 故意引用未定义变量制造代码异常
  // @ts-ignore
  return notDefined.x + 1;
}

