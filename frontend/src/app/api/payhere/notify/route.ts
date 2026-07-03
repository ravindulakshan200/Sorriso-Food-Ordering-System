import { NextResponse } from 'next/server';
import { processPayHereNotification } from '@/lib/payhere';

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    await processPayHereNotification(data);

    // Always formally return 200 OK so PayHere doesn't keep retrying Webhook
    return new NextResponse('OK', { status: 200 });
  } catch {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
