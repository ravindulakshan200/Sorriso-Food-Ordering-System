import { NextResponse } from "next/server";
import { generatePayHereHash } from "@/lib/payhere";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { order_id, amount, currency } = body;

    if (!order_id || !amount || !currency) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const hash = generatePayHereHash(order_id, amount, currency);

    return NextResponse.json({ hash });
  } catch (error) {
    console.error("PayHere hash error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to generate PayHere hash",
      },
      { status: 500 }
    );
  }
}