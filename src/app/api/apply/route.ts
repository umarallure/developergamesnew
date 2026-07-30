import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EXPERIENCE_OPTIONS } from "@/lib/constants";
import { MAX_CV_BYTES, applicationSchema } from "@/lib/validation";

export const runtime = "nodejs";

function formatMegabytes(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function POST(request: Request): Promise<NextResponse> {
  // Reject oversized bodies before request.formData() buffers them into
  // memory — the CV cap plus a small allowance for the other fields.
  const declaredLength = Number(request.headers.get("content-length"));
  if (declaredLength > MAX_CV_BYTES + 64 * 1024) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 413 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Drop silently.
  const honeypot = formData.get("extra_field");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = applicationSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    experience: formData.get("experience"),
    skills: formData
      .getAll("skills")
      .filter((entry): entry is string => typeof entry === "string"),
    cv: formData.get("cv"),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const port = Number.parseInt(process.env.SMTP_PORT ?? "587", 10) || 587;
  const secure =
    process.env.SMTP_SECURE === "true" ? true : port === 465;
  const to = process.env.APPLICATIONS_TO ?? "contact@accidentpayments.com";
  const from = process.env.APPLICATIONS_FROM ?? user;

  const { fullName, email, phone, experience, skills, cv } = parsed.data;

  const experienceLabel =
    EXPERIENCE_OPTIONS.find((option) => option.value === experience)?.label ??
    experience;

  const text = [
    "New application — The Developer Games",
    "",
    `Name:       ${fullName}`,
    `Email:      ${email}`,
    `Phone:      ${phone}`,
    `Experience: ${experienceLabel}`,
    `Skills:     ${skills.join(", ")}`,
    `CV:         ${cv.name} (${formatMegabytes(cv.size)})`,
    "",
  ].join("\n");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      to,
      from: `"The Developer Games" <${from}>`,
      replyTo: email,
      subject: `Developer Games application — ${fullName} (${experienceLabel})`,
      text,
      attachments: [
        {
          filename: cv.name,
          content: Buffer.from(await cv.arrayBuffer()),
        },
      ],
    });
  } catch (error) {
    console.error("Application email failed to send:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
