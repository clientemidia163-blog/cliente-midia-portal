import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { generateNewsletter } from "@/lib/pipeline/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}

async function handle(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const authHeader = req.headers.get("authorization");

  const authorized =
    (cronSecret && key === cronSecret) ||
    (cronSecret && authHeader === `Bearer ${cronSecret}`);

  if (!authorized) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // 1. Busca assinantes da newsletter no Supabase
  const { data: leads, error: dbError } = await supabaseAdmin
    .from("leads")
    .select("email")
    .like("source", "newsletter%");

  if (dbError) {
    return NextResponse.json({ ok: false, error: dbError.message }, { status: 500 });
  }

  const emails = (leads ?? []).map((l: { email: string }) => l.email).filter(Boolean);

  if (emails.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, message: "Nenhum assinante ainda" });
  }

  // 2. Gera conteúdo com Groq
  const content = await generateNewsletter();

  // 3. Monta HTML do email
  const html = buildEmailHtml(content);
  const subject = `Inteligência Cliente Mídia™ · ${content.semana}`;

  // 4. Envia para cada assinante
  let sent = 0;
  let errors = 0;

  for (const email of emails) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject,
        html,
      });
      sent++;
    } catch {
      errors++;
    }
  }

  return NextResponse.json({ ok: true, sent, errors, semana: content.semana });
}

function buildEmailHtml(content: Awaited<ReturnType<typeof generateNewsletter>>): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Inteligência Cliente Mídia™</title>
</head>
<body style="margin:0;padding:0;background:#0B0B0B;font-family:'Georgia',serif;color:#E8E0D4;">

  <!-- WRAPPER -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0B0B;">
    <tr><td align="center" style="padding:40px 20px;">

      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="border-bottom:1px solid #2A2520;padding-bottom:24px;margin-bottom:24px;">
            <p style="margin:0 0 4px 0;font-family:'Helvetica Neue',sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#C9A35A;">
              Inteligência Cliente Mídia™
            </p>
            <p style="margin:0;font-family:'Helvetica Neue',sans-serif;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#5A5248;">
              ${content.semana}
            </p>
          </td>
        </tr>

        <!-- SPACER -->
        <tr><td style="height:32px;"></td></tr>

        <!-- DADO DA SEMANA -->
        <tr>
          <td style="border:1px solid #2A2520;padding:32px;">
            <p style="margin:0 0 16px 0;font-family:'Helvetica Neue',sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#C9A35A;">
              O dado da semana
            </p>
            <p style="margin:0 0 8px 0;font-family:'Georgia',serif;font-size:52px;font-weight:normal;color:#C9A35A;line-height:1;">
              ${content.dado.numero}
            </p>
            <p style="margin:0 0 16px 0;font-family:'Helvetica Neue',sans-serif;font-size:14px;color:#9A9088;line-height:1.6;">
              ${content.dado.contexto}
            </p>
            <p style="margin:0;font-family:'Georgia',serif;font-size:16px;font-style:italic;color:#E8E0D4;line-height:1.6;border-left:2px solid #C9A35A;padding-left:16px;">
              ${content.dado.impacto}
            </p>
          </td>
        </tr>

        <!-- SPACER -->
        <tr><td style="height:24px;"></td></tr>

        <!-- INSIGHT DA SEMANA -->
        <tr>
          <td style="padding:32px 0;">
            <p style="margin:0 0 16px 0;font-family:'Helvetica Neue',sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#C9A35A;">
              O insight da semana
            </p>
            <p style="margin:0 0 16px 0;font-family:'Georgia',serif;font-size:26px;font-weight:normal;color:#E8E0D4;line-height:1.3;">
              ${content.insight.titulo}
            </p>
            <div style="font-family:'Helvetica Neue',sans-serif;font-size:15px;color:#9A9088;line-height:1.8;">
              ${content.insight.texto.split("\n\n").map(p => `<p style="margin:0 0 16px 0;">${p}</p>`).join("")}
            </div>
          </td>
        </tr>

        <!-- DIVIDER -->
        <tr><td style="border-top:1px solid #2A2520;"></td></tr>

        <!-- PERGUNTA DA SEMANA -->
        <tr>
          <td style="padding:32px;background:#141210;">
            <p style="margin:0 0 16px 0;font-family:'Helvetica Neue',sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#C9A35A;">
              A pergunta da semana
            </p>
            <p style="margin:0;font-family:'Georgia',serif;font-size:20px;font-style:italic;color:#E8E0D4;line-height:1.6;">
              &ldquo;${content.pergunta}&rdquo;
            </p>
          </td>
        </tr>

        <!-- SPACER -->
        <tr><td style="height:32px;"></td></tr>

        <!-- CTA -->
        <tr>
          <td align="center" style="padding:32px;border:1px solid #2A2520;">
            <p style="margin:0 0 16px 0;font-family:'Helvetica Neue',sans-serif;font-size:13px;color:#9A9088;">
              Veja quanto o modelo vale na sua loja
            </p>
            <a href="https://clientemidia.com.br/simulador"
               style="display:inline-block;background:#C9A35A;color:#0B0B0B;padding:12px 28px;font-family:'Helvetica Neue',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;">
              ✦ Simular impacto →
            </a>
          </td>
        </tr>

        <!-- SPACER -->
        <tr><td style="height:32px;"></td></tr>

        <!-- FOOTER -->
        <tr>
          <td style="border-top:1px solid #2A2520;padding-top:24px;">
            <p style="margin:0 0 8px 0;font-family:'Helvetica Neue',sans-serif;font-size:11px;color:#5A5248;line-height:1.6;">
              <strong style="color:#C9A35A;">Cliente Mídia™</strong> · Centro de Autoridade ·
              <a href="https://clientemidia.com.br" style="color:#9A9088;text-decoration:none;">clientemidia.com.br</a>
            </p>
            <p style="margin:0;font-family:'Helvetica Neue',sans-serif;font-size:10px;color:#3A3530;line-height:1.6;">
              Você recebe esta newsletter porque se inscreveu em clientemidia.com.br.
              Para cancelar, responda este email com o assunto "Cancelar".
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}
