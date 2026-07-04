import { NextResponse } from 'next/server';
import { generatePayHereHash } from '@/lib/payhere';

export async function POST(req: Request) {
  try {
    const { order_id, amount, currency } = await req.json();
    const hash = generatePayHereHash(order_id, amount, currency);
    return NextResponse.json({ hash });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to generate PayHere hash.";
    const status = message === "PayHere credentials are not configured." ? 200 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
