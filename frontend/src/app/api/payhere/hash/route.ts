import { NextResponse } from "next/server";
import { generatePayHereHash } from "@/lib/payhere";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { order_id, amount, currency } = body as {
      order_id?: unknown;
      amount?: unknown;
      currency?: unknown;
    };

    if (typeof order_id !== "string" || typeof amount !== "string" && typeof amount !== "number" || typeof currency !== "string") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const hash = generatePayHereHash(String(order_id), String(amount), String(currency));

    return NextResponse.json({ hash });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to generate PayHere hash";
    const status = message === "PayHere credentials are not configured." ? 200 : 500;

    console.error("PayHere hash error:", error);

    return NextResponse.json({ error: message }, { status });
  }
}