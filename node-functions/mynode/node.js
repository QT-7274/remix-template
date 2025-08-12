export async function onRequest({ request }) {
  console.log("Hello World");
  const body = await request.text();
  return new Response(body || "ok", { headers: { "content-type": "text/plain; charset=utf-8" } });
}