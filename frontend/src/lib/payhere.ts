import crypto from "node:crypto";
import { createClient } from "@/lib/supabase/client";

function getPayHereCredentials() {
  const merchant_id = (
    process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID ||
    process.env.PAYHERE_MERCHANT_ID ||
    "1222956"
  ).trim();
  const merchant_secret = (
    process.env.PAYHERE_SECRET ||
    process.env.NEXT_PUBLIC_PAYHERE_SECRET ||
    ""
  ).trim();

  if (!merchant_id || !merchant_secret) {
    throw new Error("PayHere credentials are not configured.");
  }

  return { merchant_id, merchant_secret };
}

export function generatePayHereHash(
  order_id: string,
  amount: string,
  currency: string
): string {
  const { merchant_id, merchant_secret } = getPayHereCredentials();

  const normalizedOrderId = String(order_id || "").trim();
  const normalizedCurrency = String(currency || "").trim().toUpperCase();
  const numericAmount = Number(amount);

  if (!normalizedOrderId || !normalizedCurrency || !Number.isFinite(numericAmount) || numericAmount < 0) {
    throw new Error("Invalid PayHere request data.");
  }

  const hashedSecret = crypto
    .createHash("md5")
    .update(merchant_secret)
    .digest("hex")
    .toUpperCase();

  const amountFormatted = numericAmount.toFixed(2);
  const hashString = merchant_id + normalizedOrderId + amountFormatted + normalizedCurrency + hashedSecret;
  const hash = crypto.createHash("md5").update(hashString).digest("hex").toUpperCase();

  return hash;
}

export async function processPayHereNotification(data: FormData): Promise<void> {
  const merchant_id = data.get("merchant_id") as string;
  const order_id = data.get("order_id") as string;
  const payhere_amount = data.get("payhere_amount") as string;
  const payhere_currency = data.get("payhere_currency") as string;
  const status_code = data.get("status_code") as string;
  const md5sig = data.get("md5sig") as string;

  const merchant_secret = process.env.PAYHERE_SECRET || "";

  const hashedSecret = crypto
    .createHash("md5")
    .update(merchant_secret)
    .digest("hex")
    .toUpperCase();
  const hashString = merchant_id + order_id + payhere_amount + payhere_currency + status_code + hashedSecret;
  const localMd5sig = crypto.createHash("md5").update(hashString).digest("hex").toUpperCase();

  if (localMd5sig === md5sig) {
    const supabase = createClient();

    if (status_code === "2") {
      await supabase.from("orders").update({ payment_status: "paid" }).eq("id", order_id);
    } else if (status_code === "-1" || status_code === "-2") {
      await supabase.from("orders").update({ payment_status: "failed" }).eq("id", order_id);
    }
  }
}
