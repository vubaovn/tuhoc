// _worker.js - Cloudflare Pages / Workers Backend cho https://tuhoc.vubao.workers.dev/
// Hỗ trợ lưu trữ đồng bộ đa thiết bị (PC Windows 11, Điện thoại, Máy tính bảng) qua:
// 1. Cloudflare KV (nếu gắn biến môi trường KV tên là TUHOC_DB trong Settings -> Bindings)
// 2. Bộ nhớ toàn cục trên Edge Worker (Memory Cache) + File tĩnh tuhoc_database.json

let MEMORY_DB_CACHE = null;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === "/api/db") {
      if (request.method === "GET") {
        let dataStr = null;
        if (env && env.TUHOC_DB) {
          dataStr = await env.TUHOC_DB.get("tuhoc_database_v23");
        }
        if (!dataStr && MEMORY_DB_CACHE) {
          dataStr = JSON.stringify(MEMORY_DB_CACHE);
        }
        if (!dataStr && env && env.ASSETS) {
          try {
            const assetRes = await env.ASSETS.fetch(new URL("/tuhoc_database.json", request.url));
            if (assetRes.ok) {
              dataStr = await assetRes.text();
            }
          } catch (e) {}
        }
        return new Response(dataStr || JSON.stringify({ status: "empty" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
        });
      }

      if (request.method === "POST") {
        try {
          const payload = await request.json();
          if (payload && Array.isArray(payload.teacherAccounts)) {
            MEMORY_DB_CACHE = payload;
            const hasKV = Boolean(env && env.TUHOC_DB);
            if (hasKV) {
              await env.TUHOC_DB.put("tuhoc_database_v23", JSON.stringify(payload));
            }
            return new Response(JSON.stringify({
              status: "ok",
              storage: hasKV ? "cloudflare_kv" : "worker_edge_memory",
              updatedAt: payload.updatedAt || new Date().toISOString()
            }), {
              status: 200,
              headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
            });
          }
        } catch (err) {
          return new Response(JSON.stringify({ status: "error", message: err.message }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
          });
        }
      }
    }

    if (env && env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response("TDO-TUHOC v2.3 Worker API Ready", { status: 200 });
  }
};
