import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, locale, source_page } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: dbError } = await supabase.from('leads').insert([
      {
        name,
        email,
        phone: phone ?? null,
        service: service ?? null,
        message,
        locale: locale ?? 'en',
        source_page: source_page ?? null,
      },
    ]);

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'noreply@martinezautorepair.com',
      to: process.env.RESEND_TO_EMAIL ?? 'carlos@martinezautorepair.com',
      subject: `New Contact Form Submission — Martinez Auto Repair`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone ?? 'N/A'}`,
        `Service: ${service ?? 'N/A'}`,
        `Message: ${message}`,
        `Locale: ${locale ?? 'en'}`,
        `Source: ${source_page ?? 'N/A'}`,
      ].join('\n'),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
