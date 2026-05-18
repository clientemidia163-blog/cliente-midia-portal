import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  let email = "";
  let source = "unknown";

  if (contentType.includes("application/json")) {
    const body = await req.json();
    email = (body.email || "").toString().trim().toLowerCase();
    source = (body.source || "unknown").toString();
  } else {
    const form = await req.formData();
    email = ((form.get("email") as string) || "").trim().toLowerCase();
    source = ((form.get("source") as string) || "unknown");
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("leads")
    .upsert(
      { email, source, captured_at: new Date().toISOString() },
      { onConflict: "email" }
    );

  if (error) {
    console.error("supabase_error", error);
    return NextResponse.json({ ok: false, error: "store_failed" }, { status: 500 });
  }

  // TODO: Disparar entrega do relatório via Resend quando o PDF estiver pronto.

  return NextResponse.redirect(new URL("/obrigado", req.url), 303);
}
