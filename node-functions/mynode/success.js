export async function onRequest(event, context) {
  console.log("[success] called", { ts: Date.now() });
  return {
    ok: true,
    type: "success",
    ts: Date.now(),
  };
}

