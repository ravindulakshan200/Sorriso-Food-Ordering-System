import { NextResponse } from 'next/server';
import { generatePayHereHash } from '@/lib/payhere';

export async function POST(req: Request) {
  try {
    const { order_id, amount, currency } = await req.json();
    const hash = generatePayHereHash(order_id, amount, currency);
    return NextResponse.json({ hash });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
