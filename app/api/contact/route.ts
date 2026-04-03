import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(req: Request) {
  const { name, email, phone, service, message, locale } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  await supabase.from('contact_submissions').insert([
    { name, email, phone, service, message, locale, created_at: new Date().toISOString() }
  ]);

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'noreply@martinez-auto.com',
    to: process.env.NOTIFICATION_EMAIL ?? 'info@martinez-auto.com',
    subject: `New Contact: ${name} — ${service}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`
  });

  return NextResponse.json({ success: true });
}
